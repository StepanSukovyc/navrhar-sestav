"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPrehledKontrol.ts                     </Name>
//    <Description> Okno přehledu (seznamu) kontrol                             </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2021-11-22                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * PŘEHLED KONTROL
             * Okno se seznamem kontrol
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2021-12-06
             * @lastModified 2025-03-21
             */
            //TODO: Přesunout akce do samostatného souboru a umožnit jejich volání z více míst (např. detail případu > záložka Kontroly)
            let GPrehledKontrol = class GPrehledKontrol extends Gordic.GContentBase {
                /** Hlaví metoda pro nastavení Contentu */
                onContentReady() {
                    const that = this;
                    this.taskId = "actGPrehledKontrol";
                    this.title = "Přehled kontrol";
                    that.createActions();
                    that.createMenu();
                    that.createFilter();
                    that.createGrid();
                    //this.nactiTypPhl()        
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                }
                /**
                 * Vytvoří tlačítka  nad seznamem kontrol
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actGSeznamKontrolyNova: {
                            name: "actGSeznamKontrolyNova",
                            //icon: "gi-star",
                            caption: "Nová kontrola",
                            tooltip: "Okno s vytvořením kontroly",
                            run: function () {
                                var row = that.grid.ggrid("getSelection")[0];
                                if (row == undefined) {
                                    that.showFlash("Není vybrán žádný záznam!", "error");
                                    return;
                                }
                                WebClient.Common.Kontroly.NovaKontrola(that, row.ixp).done(function (ret) {
                                    if (ret)
                                        that.view.requestData();
                                });
                            }
                        },
                        actGSeznamKontrolyDetail: {
                            name: "actGSeznamKontrolyDetail",
                            //icon: "gi-star",
                            caption: "Detail", // "Nastavení"
                            tooltip: "Okno s editací kontroly",
                            run: function () {
                                var row = that.grid.ggrid("getSelection")[0];
                                if (row == undefined) {
                                    that.showFlash("Není vybrán žádný záznam!", "error");
                                    return;
                                }
                                WebClient.Common.Kontroly.DetailKontroly(that, row.ixp, row.dat_kontr).done(function (ret) {
                                    if (ret)
                                        that.view.requestData();
                                });
                            }
                        },
                        actGSezanmKontrolyObnovit: {
                            name: "actGSezanmKontrolyObnovit",
                            //icon: "gi-refresh",
                            caption: "Obnovit",
                            tooltip: "Nastaví kontrolu jako aktivní",
                            run: function () {
                                var selection = that.grid.ggrid("getSelection"); //Seznam zaškrtnutých řádků lze přečíst metodou getSelection()
                                if (selection.length == 0) {
                                    that.dialogs.error("Vyberte položky", "Vyberte kontroly k obnovení");
                                    return;
                                }
                                else {
                                    that.beginOperation({ id: "opGSezanmKontrolyObnovit", text: "Nastavuji kontroly..." });
                                    var _task;
                                    if (selection.length == 1) {
                                        _task = WebClient.Common.Kontroly.ObnovitKontrolu(that, selection[0]);
                                    }
                                    else {
                                        _task = WebClient.Common.Kontroly.ObnovitKontroly(that, selection);
                                    }
                                    _task.always((ret) => {
                                        that.endOperation("opGSezanmKontrolyObnovit");
                                        that.view.requestData();
                                    });
                                    //.done((ret) => {
                                    //    def.resolve(ret);
                                    //})
                                    //.fail((ret, type, obj) => {
                                    //    def.reject(ret, type, obj);
                                    //})
                                    //...
                                    //let chybnaKontrola: boolean = false;
                                    //selection.forEach(function (item) {
                                    //    if (item.aktivita != 900) {
                                    //        chybnaKontrola = true
                                    //    };
                                    //    Common.Kontroly.ObnovitKontrolu(that, item);
                                    //    //rq.ixp = item.ixp;
                                    //    //rq.dat_kontr = item.dat_kontr;
                                    //    //that.isl.PrehledKontrol.obnovPripady(item) //TODO - forEach by měl být na serveru
                                    //    //    .get()
                                    //    //    .done(function (ret) {
                                    //    //        //that.showFlash("Změny úspěšně uloženy", "success");
                                    //    //        that.notification("showToast", { id: "ulozeniPredpisu", title: "Úspěšné uložení", content: "Změny úspěšně uloženy" });
                                    //    //        //that.ziskejData(that.o_filtr);
                                    //    //        that.view.requestData()
                                    //    //    })
                                    //    //    .fail(function (xhr, type, vobj) {
                                    //    //        if (type === "exception") {
                                    //    //            if (vobj.baseType === "Gordic.General.GArgumentException") {
                                    //    //                vobj.handled = true;
                                    //    //                that.showFlash(vobj.baseMessage, "error");
                                    //    //                //that.showFlash("Něco se nepovedlo", "g-state-error");
                                    //    //            }
                                    //    //        }
                                    //    //    });
                                    //})
                                    //if (chybnaKontrola != false) {
                                    //    that.dialogs.warning("Upozornění", "Některé kontroly nebyli obnoveny")
                                    //}
                                }
                            }
                        },
                        actGSeznamKontrolyStorno: {
                            name: "actGSeznamKontrolyStorno",
                            //icon: "fa-times",
                            caption: "Zrušit",
                            tooltip: "Nastaví kontrolu jako zrušenou",
                            run: function () {
                                var selection = that.grid.ggrid("getSelection");
                                if (selection.length == 0) {
                                    that.dialogs.error("Vyberte položky", "Vyberte kontroly, které chcete zrušit.");
                                    return;
                                }
                                else {
                                    that.beginOperation({ id: "opGSeznamKontrolyStorno", text: "Nastavuji kontroly..." });
                                    var _task;
                                    if (selection.length == 1) {
                                        _task = WebClient.Common.Kontroly.ZrusitKontrolu(that, selection[0]);
                                    }
                                    else {
                                        _task = WebClient.Common.Kontroly.ZrusitKontroly(that, selection);
                                    }
                                    _task.always((ret) => {
                                        that.endOperation("opGSeznamKontrolyStorno");
                                        that.view.requestData();
                                    });
                                    //.done((ret) => {
                                    //    def.resolve(ret);
                                    //})
                                    //.fail((ret, type, obj) => {
                                    //    def.reject(ret, type, obj);
                                    //})
                                    //...
                                    //let chybnaKontrola: boolean = false;
                                    //selection.forEach(function (item) { //TODO - forEach by měl být na serveru
                                    //    if (item.aktivita != 100) {
                                    //        chybnaKontrola = true
                                    //    };
                                    //    Common.Kontroly.ZrusitKontrolu(that, item);
                                    //    //rq.ixp = item.ixp;
                                    //    //rq.dat_kontr = item.dat_kontr;
                                    //    //that.isl.PrehledKontrol.zrusKontroly(item)
                                    //    //    .get() // volám skrze interface serverovou metodu smazKontrolu, dávám jí dto a volám na ní get
                                    //    //    .done(function (ret) {
                                    //    //        that.showFlash("Změny úspěšně uloženy", "success");
                                    //    //        //that.ziskejData(that.o_filtr);
                                    //    //        that.view.requestData()
                                    //    //        return;
                                    //    //    })
                                    //    //    .fail(function (xhr, type, vobj) {
                                    //    //        if (type === "exception") {
                                    //    //            if (vobj.baseType === "Gordic.General.GArgumentException") {
                                    //    //                vobj.handled = true;
                                    //    //                that.showFlash(vobj.baseMessage, "error");
                                    //    //                //that.showFlash("Něco se nepovedlo", "g-state-error");
                                    //    //            }
                                    //    //        }
                                    //    //    });
                                    //})
                                    //if (chybnaKontrola != false) {
                                    //    that.dialogs.warning("Upozornění", "Některé kontroly nebyli zrušeny")
                                    //}
                                }
                            }
                        },
                        actGSeznamKontrolyHotovo: {
                            name: "actGSeznamKontrolyHotovo",
                            //icon: "gi-vyrizeno",
                            caption: "Provést",
                            tooltip: "Nastaví kontrolu jako provedenou",
                            run: function () {
                                var selection = that.grid.ggrid("getSelection");
                                if (selection.length == 0) {
                                    return that.dialogs.error("Vyberte položky", "Vyberte kontroly k provedení");
                                }
                                var _task;
                                that.beginOperation({ id: "opGSeznamKontrolyHotovo", text: "Nastavuji kontroly..." });
                                if (selection.length == 1) {
                                    _task = WebClient.Common.Kontroly.ProvestKontrolu(that, selection[0]);
                                }
                                else {
                                    _task = WebClient.Common.Kontroly.ProvestKontroly(that, selection);
                                }
                                _task.always((ret) => {
                                    that.endOperation("opGSeznamKontrolyHotovo");
                                    that.view.requestData();
                                });
                                //.done((ret) => {
                                //    def.resolve(ret);
                                //})
                                //.fail((ret, type, obj) => {
                                //    def.reject(ret, type, obj);
                                //})
                                ;
                            }
                        },
                        actGSeznamKontrolyNeniHotovo: {
                            name: "actGSeznamKontrolyNeniHotovo",
                            //icon: "gi-vyrizeno",
                            caption: "Zrušit provedení",
                            tooltip: "Nastaví kontrolu jako neprovedenou",
                            run: function () {
                                var selection = that.grid.ggrid("getSelection");
                                if (selection.length == 0) {
                                    that.dialogs.error("Vyberte položky", "Vyberte kontroly ke zrušení provedení");
                                    return;
                                }
                                that.dialogs.prompt("Zadej důvod zrušení provedení kontrol")
                                    .on("ok", function (ev, duvod) {
                                    if (duvod && (duvod.trim() != "")) { // mám důvod
                                        that.beginOperation({ id: "opGSeznamKontrolyNeniHotovo0", text: "Zpracovávám..." });
                                        selection.forEach(function (item) {
                                            item.duvod_zruseni = duvod;
                                            //Common.Kontroly.ZrusitProvedeniKontroly(that, item);
                                            //that.isl.PrehledKontrol.oznacJakoNeprovedene(item)
                                            //    .get()
                                            //    .done(function (ret) {
                                            //        that.showFlash("Změny úspěšně uloženy", "success");
                                            //        //that.ziskejData(that.o_filtr);
                                            //        that.view.requestData();
                                            //    })
                                            //    .fail(function (xhr, type, vobj) {
                                            //        if (type === "exception") {
                                            //            if (vobj.baseType === "Gordic.General.GArgumentException") {
                                            //                vobj.handled = true;
                                            //                that.showFlash(vobj.baseMessage, "error");
                                            //            }
                                            //        }
                                            //    });
                                        });
                                        that.endOperation("opGSeznamKontrolyNeniHotovo0");
                                        var _task;
                                        that.beginOperation({ id: "opGSeznamKontrolyNeniHotovo", text: "Nastavuji kontroly..." });
                                        if (selection.length == 1) {
                                            _task = WebClient.Common.Kontroly.ZrusitProvedeniKontroly(that, selection[0]);
                                        }
                                        else {
                                            _task = WebClient.Common.Kontroly.ZrusitProvedeniKontrol(that, selection);
                                        }
                                        _task.always((ret) => {
                                            that.endOperation("opGSeznamKontrolyNeniHotovo");
                                            that.view.requestData();
                                        });
                                        //.done((ret) => {
                                        //    def.resolve(ret);
                                        //})
                                        //.fail((ret, type, obj) => {
                                        //    def.reject(ret, type, obj);
                                        //})
                                    }
                                    ;
                                });
                            }
                        },
                        actDetailPripadu: {
                            name: "actDetailPripadu",
                            caption: "Detail případu",
                            icon: "gi-detail",
                            tooltip: "Zobrazení detailu případu DDP",
                            enabled: true,
                            run: () => {
                                var selection = that.grid.ggrid("activeRow");
                                if (selection != null) {
                                    WebClient.Common.Pripady.openPripadDetail(this, selection.ixp); //, row.typ_phl); 
                                    //that.navigate(
                                    //    "Gordic.Ddp.WebClient.GPripadDetail",
                                    //    {
                                    //        ID: "DDPGPripadDetail#",
                                    //        Ixp: selection.ixp,
                                    //        TypPhl: selection.typ_phl,
                                    //    }
                                    //);
                                }
                            }
                        },
                        //actGSeznamKontrolyDetail: { //! tlačítko pro editaci kontroly - T16359 https://phabricator.gordic.cz/T16359
                        //    name: "Editace_kontroly",
                        //    caption: "Detail",
                        //    tooltip: "Okno s editací kontroly",
                        //    run: function () {
                        //        that.detailKontroly() //TODO!...
                        //    }
                        //},
                        //actGSeznamKontrolyNova: {
                        //    name: "Nova_kontrola",
                        //    caption: "Nová kontrola",
                        //    tooltip: "Okno s vytvořením kontroly",
                        //    run: function () {
                        //        that.novaKontrola() // TODO!...
                        //    }
                        //},               
                    });
                }
                /**
                 * Vytvoří menu  nad seznamem kontrol
                 */
                createMenu() {
                    const that = this;
                    this.menuBar([
                        { action: that.actions.actGSeznamKontrolyDetail, favorite: true },
                        { action: that.actions.actGSezanmKontrolyObnovit, favorite: true },
                        { action: that.actions.actGSeznamKontrolyHotovo, favorite: true },
                        { action: that.actions.actGSeznamKontrolyStorno, favorite: true },
                        { action: that.actions.actGSeznamKontrolyNeniHotovo, favorite: true },
                        { action: that.actions.actDetailPripadu, favorite: true, align: "opposite" },
                        //{ action: this.actions.actGSeznamKontrolyNova, favorite: true },
                        //!Akce nová kontorla odstraněna -> Nová kontrola pouze nad detailem případu
                    ]);
                }
                /**
                 * Vytvoří filtr FORM pro seznam kontrol
                 */
                createFilterForm() {
                    const that = this;
                    that.headerForm = new Gordic.Forms.Form({ name: "ddpPrehledKontrolFilter", layoutDescriptor: "L4M3S1" })
                        .addSection("Filtry")
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                        name: "typ_phl",
                        model: "model.typ_phl=value.typ_phl",
                        initialValue: { typ_phl: this.typ_phl },
                        //TODO: Přidat do seznamu možnost pro výběr všech pohledávek
                        //[{ typ_phl: 0, nazev: "Všechny typy pohledávek" }]
                        serverFilters: {
                            pridejVolbuVsechny: true,
                        },
                        itemTemplate: (data) => {
                            if (data?.typ_phl == "ALL")
                                return `${data?.nazev}`;
                            else
                                return `${data?.typ_phl} - ${data?.nazev}`;
                        }
                    })
                        .addRow("Typ kontroly")
                        .addField("gselectbox", Gordic.Prefabs.Select.typKontroly(), {
                        name: "typ_kont",
                        model: "model.typ_kont=value.typ_kont",
                        defaultValue: { typ_kont: 9999, typ_kont_txt: "Všechny kontroly" },
                        serverFilters: {
                            pridejVolbuVsechny: true,
                        }
                    })
                        .addRow("Identifikátor")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                    })
                        .addRow("VS")
                        .addField("gstringbox", {
                        name: "vs",
                        allowedChars: "0123456789*",
                    })
                        .addRow("Poznámka")
                        .addField("gstringbox", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "="], userOperators: [] }), {
                        name: "poznamka",
                    })
                        .addRow("Zobrazit pouze")
                        .addField("gcheck", "w-4", {
                        name: "aktivni", label: "Aktivní", tooltip: "Aktivní", //initialValue: true,
                        change: function (ev, input) {
                            if (input.value == true)
                                that.findForms().findFields("neaktivni").gfield("setValue", false);
                            //form.findFields("rb_popl_pl").gfield<Boolean>("setValue", false);
                        }
                    })
                        .addField("gcheck", "w-4", {
                        name: "neaktivni", label: "Neaktivní", tooltip: "Neaktivní",
                        change: function (ev, input) {
                            if (input.value == true)
                                that.findForms().findFields("aktivni").gfield("setValue", false);
                            //form.findFields("rb_popl_pl").gfield<Boolean>("setValue", false);
                        }
                    })
                        .addField("gcheck", "w-4", { name: "vlastni", label: "Vlastní", tooltip: "Vlastní" })
                        //.addRow("Stav kontroly")
                        //.addField("gselectbox", {
                        //    name: "stav_kontrola",
                        //    model: "model.stav_kontrola=value.id",
                        //    multi: false,
                        //    initialValue: { id: 2, popis: "Bez rozlišení"},
                        //    itemTemplate: "{popis}",
                        //    data: [
                        //        { id: 2, popis: "Bez rozlišení"},
                        //        { id: 1, popis: "Provedeno" },
                        //        { id: 0, popis: "Neprovedeno" }
                        //    ]
                        //})
                        .addRow("Stav kontroly")
                        .addField("gradio", {
                        name: "stav_kontrola",
                        initialValue: 2,
                        itemClass: "w-4",
                        radios: [
                            { value: 2, label: "Bez rozlišení" },
                            { value: 1, label: "Provedeno" },
                            { value: 0, label: "Neprovedeno" }
                        ]
                    })
                        .addRow("Dat. kontroly od - do")
                        .addField("gintervalbox", { name: "dat_kontrola" });
                    ;
                    return that.headerForm;
                }
                /**
                 * Vytvoří filtr pro seznam kontrol
                 */
                createFilter() {
                    const that = this;
                    that.filter = $.newDiv("filterFormPrehledKontrol").appendTo(that.element).
                        gfilterpanel({
                        forms: [that.createFilterForm()],
                        filterViewMode: FilterViewMode.Simple,
                        apply: (event, obj) => {
                            that.ziskejData(obj.filter);
                        }
                    });
                }
                /**
                 * Vytvoří samotný grid/seznam kontrol
                 */
                createGrid() {
                    const that = this;
                    that.grid = $.newDiv("gridPrehledKontrol").appendTo(that.element)
                        .css("height", "100%")
                        .gautofit()
                        .ggrid({
                        //data: [],//that.ziskejData(),   // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        defaultAction: this.actions.actGSeznamKontrolyDetail,
                        multi: true, //! zašktávací pollížka ggridu -> getSelection()
                        rowNumbers: false,
                        columns: WebClient.Common.GridFormats.PrehledKontrol(), // this.createGridFormat(),
                        profiles: [{
                                name: "default", _locked: true, _default: true,
                                columnList: "stav_kontroly, ixp, dat_kontr, vs, typ_phl, typ_kont, esu_txt, poznamka, aktivita",
                                condFormats: [
                                    { description: "Neaktivní", formula: 'NOT(EQUALS(@aktivita, 100))', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray, text: Gordic.Components.Grid.CondFormats.CondFormatText.gray },
                                ]
                            }]
                    });
                }
                /**
                 * Funkce pro získání filtrovaných dat
                 */
                ziskejData(filter) {
                    const that = this;
                    //if (!that.view) {
                    that.view = new Gordic.Isl.View(that.isl.PripadKontrola.list(rq => {
                        return {
                            filters: filter,
                            fragments: ["Default", "Extended", "Extended2"]
                        };
                    }));
                    that.grid.ggrid("setData", that.view);
                    //} else {
                    //    that.view.requestData()
                    //}
                    //that.beginOperation("Načítání přehledu kontrol");
                    //that.isl.PrehledKontrol.list
                    //    (
                    //        rq => {
                    //            return {
                    //                filters: filter
                    //            }
                    //        }
                    //    ).get().done(function (dto) {
                    //        var view = new Gordic.Data.View(dto.data, { key: "ixp" });
                    //        that.grid.ggrid("setData", view);
                    //        that.endOperation();
                    //    });
                }
            }; //endOfClass GPrehledKontrol
            GPrehledKontrol = __decorate([
                Decorators.gcontent
            ], GPrehledKontrol);
            WebClient.GPrehledKontrol = GPrehledKontrol;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {})); //endOfNamespace
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByZWhsZWRLb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1ByZWhsZWRLb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBMmtCZjtBQTNrQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMmtCbkI7SUEza0JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0Eya0I3QjtRQTNrQm9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7OztlQU9HO1lBQ0gsNEhBQTRIO1lBRTVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxZQUFZO2dCQWU3QywwQ0FBMEM7Z0JBQzFDLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDO29CQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO29CQUUvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUNwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWxCLDRCQUE0QjtvQkFFNUIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUVuRSxDQUFDO2dCQUNEOzttQkFFRztnQkFDSyxhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixzQkFBc0IsRUFB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QyxJQUFJLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUNqRCxFQUFFLENBQUMsRUFBRTt3QkFDRCxPQUFPOzRCQUNILE9BQU8sRUFBRSxNQUFNOzRCQUNmLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDO3lCQUNsRCxDQUFBO29CQUNMLENBQUMsQ0FFSixDQUFDLENBQUE7b0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDMUMsVUFBVTtvQkFDViw2QkFBNkI7b0JBQzdCLEdBQUc7b0JBRUgsbURBQW1EO29CQUNuRCw4QkFBOEI7b0JBQzlCLE9BQU87b0JBQ1AsaUJBQWlCO29CQUNqQixzQkFBc0I7b0JBQ3RCLGlDQUFpQztvQkFDakMsZUFBZTtvQkFDZixXQUFXO29CQUNYLG1DQUFtQztvQkFDbkMsb0VBQW9FO29CQUNwRSwyQ0FBMkM7b0JBQzNDLDhCQUE4QjtvQkFDOUIsU0FBUztnQkFDYixDQUFDO2FBdURKLENBQUEsQ0FBQyw0QkFBNEI7WUE5akJqQixlQUFlO2dCQUQzQixVQUFVLENBQUMsUUFBUTtlQUNQLGVBQWUsQ0E4akIzQjtZQTlqQlkseUJBQWUsa0JBOGpCM0IsQ0FBQTtRQUVMLENBQUMsRUEza0JvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEya0I3QjtJQUFELENBQUMsRUEza0JnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEya0JuQjtBQUFELENBQUMsRUEza0JTLE1BQU0sS0FBTixNQUFNLFFBMmtCZixDQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJlaGxlZEtvbnRyb2wudHMgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBwxZllaGxlZHUgKHNlem5hbXUpIGtvbnRyb2wgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDIyICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjEtMTEtMjIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFDFmEVITEVEIEtPTlRST0wgXHJcbiAgICAgKiBPa25vIHNlIHNlem5hbWVtIGtvbnRyb2xcclxuICAgICAqIEBhdXRob3IgTWFydGluIEhhbnXFoVxyXG4gICAgICogQGNvcHlyaWdodCDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjZcclxuICAgICAqIEBjcmVhdGVkIDIwMjEtMTItMDZcclxuICAgICAqIEBsYXN0TW9kaWZpZWQgMjAyNS0wMy0yMSAgICAgIFxyXG4gICAgICovXHJcbiAgICAvL1RPRE86IFDFmWVzdW5vdXQgYWtjZSBkbyBzYW1vc3RhdG7DqWhvIHNvdWJvcnUgYSB1bW/Fvm5pdCBqZWppY2ggdm9sw6Fuw60geiB2w61jZSBtw61zdCAobmFwxZkuIGRldGFpbCBwxZnDrXBhZHUgPiB6w6Fsb8W+a2EgS29udHJvbHkpXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcmVobGVkS29udHJvbCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICB0eXBfcGhsOiBzdHJpbmc7XHJcbiAgICAgICAgcm9rOiBudW1iZXI7ICAgIFxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHB1YmxpYyBoZWFkZXJGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuXHJcbiAgICAgICAgLyoqIElTTCBWaWV3IHBybyBLb250cm9seSBAdHlwZSB7SXNsLlZpZXc8Pn0gKi9cclxuICAgICAgICBwcml2YXRlIHZpZXc6IElzbC5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkS29udHJvbGFEdG8+O1xyXG4gICAgICAgIC8qKiBHcmlkIHBybyBLb250cm9seSBAdHlwZSB7SlF1ZXJ5PD59ICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICAvKiogVGV4dCB2csOhY2Vuw70gcG8gaW5pdHUgS25paHkgYSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIEluaXRFcnJvclRleHQ6IHN0cmluZyB8IG51bGw7XHJcblxyXG4gICAgICAgIC8qKiBIbGF2w60gbWV0b2RhIHBybyBuYXN0YXZlbsOtIENvbnRlbnR1ICovXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzOyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudGFza0lkID0gXCJhY3RHUHJlaGxlZEtvbnRyb2xcIjtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiUMWZZWhsZWQga29udHJvbFwiO1xyXG4gICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlTWVudSgpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlcigpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5uYWN0aVR5cFBobCgpICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIERkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2UuRGRwRWtvSW5pdCh0aGF0LCB0aGF0LkluaXRFcnJvclRleHQpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSB0bGHEjcOtdGthICBuYWQgc2V6bmFtZW0ga29udHJvbCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0R1Nlem5hbUtvbnRyb2x5Tm92YToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1Nlem5hbUtvbnRyb2x5Tm92YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1zdGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDoSBrb250cm9sYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiT2tubyBzIHZ5dHZvxZllbsOtbSBrb250cm9seVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIk5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gesOhem5hbSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uS29udHJvbHkuTm92YUtvbnRyb2xhKHRoYXQsIHJvdy5peHAhKS5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQpIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0R1Nlem5hbUtvbnRyb2x5RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU2V6bmFtS29udHJvbHlEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktc3RhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsIC8vIFwiTmFzdGF2ZW7DrVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPa25vIHMgZWRpdGFjw60ga29udHJvbHlcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIk5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gesOhem5hbSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uS29udHJvbHkuRGV0YWlsS29udHJvbHkodGhhdCwgcm93Lml4cCEsIHJvdy5kYXRfa29udHIhKS5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQpIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFjdEdTZXphbm1Lb250cm9seU9ibm92aXQ6IHsgIC8vISB0bGHEjcOtdGtvIHBybyBvYm5vdnUga29udHJvbHkgLSBUMTYzNDggaHR0cHM6Ly9waGFicmljYXRvci5nb3JkaWMuY3ovVDE2MzQ4XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU2V6YW5tS29udHJvbHlPYm5vdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLXJlZnJlc2hcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ibm92aXRcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk5hc3RhdsOtIGtvbnRyb2x1IGpha28gYWt0aXZuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvPihcImdldFNlbGVjdGlvblwiKTsgLy9TZXpuYW0gemHFoWtydG51dMO9Y2ggxZnDoWRrxa8gbHplIHDFmWXEjcOtc3QgbWV0b2RvdSBnZXRTZWxlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIHBvbG/Fvmt5XCIsIFwiVnliZXJ0ZSBrb250cm9seSBrIG9ibm92ZW7DrVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJvcEdTZXphbm1Lb250cm9seU9ibm92aXRcIiwgdGV4dDogXCJOYXN0YXZ1amkga29udHJvbHkuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGFzazogYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90YXNrID0gQ29tbW9uLktvbnRyb2x5Lk9ibm92aXRLb250cm9sdSh0aGF0LCBzZWxlY3Rpb25bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Rhc2sgPSBDb21tb24uS29udHJvbHkuT2Jub3ZpdEtvbnRyb2x5KHRoYXQsIHNlbGVjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGFzay5hbHdheXMoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKFwib3BHU2V6YW5tS29udHJvbHlPYm5vdml0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmRvbmUoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZGVmLnJlc29sdmUocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmZhaWwoKHJldCwgdHlwZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZWYucmVqZWN0KHJldCwgdHlwZSwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBjaHlibmFLb250cm9sYTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGl0ZW0uYWt0aXZpdGEgIT0gOTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY2h5Ym5hS29udHJvbGEgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgQ29tbW9uLktvbnRyb2x5Lk9ibm92aXRLb250cm9sdSh0aGF0LCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vcnEuaXhwID0gaXRlbS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3JxLmRhdF9rb250ciA9IGl0ZW0uZGF0X2tvbnRyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy90aGF0LmlzbC5QcmVobGVkS29udHJvbC5vYm5vdlByaXBhZHkoaXRlbSkgLy9UT0RPIC0gZm9yRWFjaCBieSBtxJtsIGLDvXQgbmEgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgLy90aGF0LnNob3dGbGFzaChcIlptxJtueSDDunNwxJvFoW7EmyB1bG/FvmVueVwiLCBcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgdGhhdC5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwgeyBpZDogXCJ1bG96ZW5pUHJlZHBpc3VcIiwgdGl0bGU6IFwiw5pzcMSbxaFuw6kgdWxvxb5lbsOtXCIsIGNvbnRlbnQ6IFwiWm3Em255IMO6c3DEm8WhbsSbIHVsb8W+ZW55XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgLy90aGF0Lnppc2tlakRhdGEodGhhdC5vX2ZpbHRyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgICAgICBpZiAodHlwZSA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgICAgICBpZiAodm9iai5iYXNlVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HQXJndW1lbnRFeGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHZvYmouYmFzZU1lc3NhZ2UsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgICAgICAgICAvL3RoYXQuc2hvd0ZsYXNoKFwiTsSbY28gc2UgbmVwb3ZlZGxvXCIsIFwiZy1zdGF0ZS1lcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoY2h5Ym5hS29udHJvbGEgIT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiVXBvem9ybsSbbsOtXCIsIFwiTsSba3RlcsOpIGtvbnRyb2x5IG5lYnlsaSBvYm5vdmVueVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0R1Nlem5hbUtvbnRyb2x5U3Rvcm5vOiB7IC8vISB0bGHEjcOtdGtvIHBybyB6cnXFoWVuw60ga29udHJvbHkgLSBUMTYzNDYgaHR0cHM6Ly9waGFicmljYXRvci5nb3JkaWMuY3ovVDE2MzQ2XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHU2V6bmFtS29udHJvbHlTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZmEtdGltZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXRcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk5hc3RhdsOtIGtvbnRyb2x1IGpha28genJ1xaFlbm91XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRLb250cm9sYUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgcG9sb8W+a3lcIiwgXCJWeWJlcnRlIGtvbnRyb2x5LCBrdGVyw6kgY2hjZXRlIHpydcWhaXQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcIm9wR1Nlem5hbUtvbnRyb2x5U3Rvcm5vXCIsIHRleHQ6IFwiTmFzdGF2dWppIGtvbnRyb2x5Li4uXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3Rhc2s6IGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGFzayA9IENvbW1vbi5Lb250cm9seS5acnVzaXRLb250cm9sdSh0aGF0LCBzZWxlY3Rpb25bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Rhc2sgPSBDb21tb24uS29udHJvbHkuWnJ1c2l0S29udHJvbHkodGhhdCwgc2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90YXNrLmFsd2F5cygocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oXCJvcEdTZXpuYW1Lb250cm9seVN0b3Jub1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uZG9uZSgocmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZWYucmVzb2x2ZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uZmFpbCgocmV0LCB0eXBlLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGRlZi5yZWplY3QocmV0LCB0eXBlLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGNoeWJuYUtvbnRyb2xhOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vVE9ETyAtIGZvckVhY2ggYnkgbcSbbCBiw710IG5hIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChpdGVtLmFrdGl2aXRhICE9IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGNoeWJuYUtvbnRyb2xhID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIENvbW1vbi5Lb250cm9seS5acnVzaXRLb250cm9sdSh0aGF0LCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vcnEuaXhwID0gaXRlbS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3JxLmRhdF9rb250ciA9IGl0ZW0uZGF0X2tvbnRyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy90aGF0LmlzbC5QcmVobGVkS29udHJvbC56cnVzS29udHJvbHkoaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIC5nZXQoKSAvLyB2b2zDoW0gc2tyemUgaW50ZXJmYWNlIHNlcnZlcm92b3UgbWV0b2R1IHNtYXpLb250cm9sdSwgZMOhdsOhbSBqw60gZHRvIGEgdm9sw6FtIG5hIG7DrSBnZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgICAgICB0aGF0LnNob3dGbGFzaChcIlptxJtueSDDunNwxJvFoW7EmyB1bG/FvmVueVwiLCBcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgLy90aGF0Lnppc2tlakRhdGEodGhhdC5vX2ZpbHRyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAgICAgaWYgKHZvYmouYmFzZVR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0FyZ3VtZW50RXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh2b2JqLmJhc2VNZXNzYWdlLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcIk7Em2NvIHNlIG5lcG92ZWRsb1wiLCBcImctc3RhdGUtZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGNoeWJuYUtvbnRyb2xhICE9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmRpYWxvZ3Mud2FybmluZyhcIlVwb3pvcm7Em27DrVwiLCBcIk7Em2t0ZXLDqSBrb250cm9seSBuZWJ5bGkgenJ1xaFlbnlcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEdTZXpuYW1Lb250cm9seUhvdG92bzogeyAvLyEgdGxhxI3DrXRrbyBwcm8gcHJvdmVkZW7DrSBrb250cm9seSAtIFQxNjM1MyBodHRwczovL3BoYWJyaWNhdG9yLmdvcmRpYy5jei9UMTYzNTNcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdTZXpuYW1Lb250cm9seUhvdG92b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS12eXJpemVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUHJvdsOpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk5hc3RhdsOtIGtvbnRyb2x1IGpha28gcHJvdmVkZW5vdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkS29udHJvbGFEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5lcnJvcihcIlZ5YmVydGUgcG9sb8W+a3lcIiwgXCJWeWJlcnRlIGtvbnRyb2x5IGsgcHJvdmVkZW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGFzazogYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwib3BHU2V6bmFtS29udHJvbHlIb3Rvdm9cIiwgdGV4dDogXCJOYXN0YXZ1amkga29udHJvbHkuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Rhc2sgPSBDb21tb24uS29udHJvbHkuUHJvdmVzdEtvbnRyb2x1KHRoYXQsIHNlbGVjdGlvblswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGFzayA9IENvbW1vbi5Lb250cm9seS5Qcm92ZXN0S29udHJvbHkodGhhdCwgc2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGFzay5hbHdheXMoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oXCJvcEdTZXpuYW1Lb250cm9seUhvdG92b1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy5kb25lKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZGVmLnJlc29sdmUocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy5mYWlsKChyZXQsIHR5cGUsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZWYucmVqZWN0KHJldCwgdHlwZSwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEdTZXpuYW1Lb250cm9seU5lbmlIb3Rvdm86IHsgLy8hIHRsYcSNw610a28gcHJvIHpydcWhZW7DrSBwcm92ZWRlbsOtIGtvbnRyb2x5IC0gVDE2MzU1IGh0dHBzOi8vcGhhYnJpY2F0b3IuZ29yZGljLmN6L1QxNjM1NVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1Nlem5hbUtvbnRyb2x5TmVuaUhvdG92b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS12eXJpemVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdCBwcm92ZWRlbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJOYXN0YXbDrSBrb250cm9sdSBqYWtvIG5lcHJvdmVkZW5vdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkS29udHJvbGFEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJWeWJlcnRlIHBvbG/Fvmt5XCIsIFwiVnliZXJ0ZSBrb250cm9seSBrZSB6cnXFoWVuw60gcHJvdmVkZW7DrVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MucHJvbXB0KFwiWmFkZWogZMWvdm9kIHpydcWhZW7DrSBwcm92ZWRlbsOtIGtvbnRyb2xcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcIm9rXCIsIGZ1bmN0aW9uIChldiwgZHV2b2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHV2b2QgJiYgKGR1dm9kLnRyaW0oKSAhPSBcIlwiKSkgeyAvLyBtw6FtIGTFr3ZvZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwib3BHU2V6bmFtS29udHJvbHlOZW5pSG90b3ZvMFwiLCB0ZXh0OiBcIlpwcmFjb3bDoXbDoW0uLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy9UT0RPIC0gZm9yRWFjaCBieSBtxJtsIGLDvXQgbmEgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kdXZvZF96cnVzZW5pID0gZHV2b2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvbW1vbi5Lb250cm9seS5acnVzaXRQcm92ZWRlbmlLb250cm9seSh0aGF0LCBpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5pc2wuUHJlaGxlZEtvbnRyb2wub3puYWNKYWtvTmVwcm92ZWRlbmUoaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiWm3Em255IMO6c3DEm8WhbsSbIHVsb8W+ZW55XCIsIFwic3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQuemlza2VqRGF0YSh0aGF0Lm9fZmlsdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAodHlwZSA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAodm9iai5iYXNlVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HQXJndW1lbnRFeGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHZvYmouYmFzZU1lc3NhZ2UsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKFwib3BHU2V6bmFtS29udHJvbHlOZW5pSG90b3ZvMFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF90YXNrOiBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJvcEdTZXpuYW1Lb250cm9seU5lbmlIb3Rvdm9cIiwgdGV4dDogXCJOYXN0YXZ1amkga29udHJvbHkuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Rhc2sgPSBDb21tb24uS29udHJvbHkuWnJ1c2l0UHJvdmVkZW5pS29udHJvbHkodGhhdCwgc2VsZWN0aW9uWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90YXNrID0gQ29tbW9uLktvbnRyb2x5LlpydXNpdFByb3ZlZGVuaUtvbnRyb2wodGhhdCwgc2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGFzay5hbHdheXMoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oXCJvcEdTZXpuYW1Lb250cm9seU5lbmlIb3Rvdm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5kb25lKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZGVmLnJlc29sdmUocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5mYWlsKChyZXQsIHR5cGUsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZWYucmVqZWN0KHJldCwgdHlwZSwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWxQcmlwYWR1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxQcmlwYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWwgcMWZw61wYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhemVuw60gZGV0YWlsdSBwxZnDrXBhZHUgRERQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uUHJpcGFkeS5vcGVuUHJpcGFkRGV0YWlsKHRoaXMsIHNlbGVjdGlvbi5peHApOyAvLywgcm93LnR5cF9waGwpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIElEOiBcIkREUEdQcmlwYWREZXRhaWwjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgSXhwOiBzZWxlY3Rpb24uaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIFR5cFBobDogc2VsZWN0aW9uLnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy9hY3RHU2V6bmFtS29udHJvbHlEZXRhaWw6IHsgLy8hIHRsYcSNw610a28gcHJvIGVkaXRhY2kga29udHJvbHkgLSBUMTYzNTkgaHR0cHM6Ly9waGFicmljYXRvci5nb3JkaWMuY3ovVDE2MzU5XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIkVkaXRhY2Vfa29udHJvbHlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB0b29sdGlwOiBcIk9rbm8gcyBlZGl0YWPDrSBrb250cm9seVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5kZXRhaWxLb250cm9seSgpIC8vVE9ETyEuLi5cclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vYWN0R1Nlem5hbUtvbnRyb2x5Tm92YToge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJOb3ZhX2tvbnRyb2xhXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIk5vdsOhIGtvbnRyb2xhXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB0b29sdGlwOiBcIk9rbm8gcyB2eXR2b8WZZW7DrW0ga29udHJvbHlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQubm92YUtvbnRyb2xhKCkgLy8gVE9ETyEuLi5cclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSwgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBWeXR2b8WZw60gbWVudSAgbmFkIHNlem5hbWVtIGtvbnRyb2wgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEdTZXpuYW1Lb250cm9seURldGFpbCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0R1NlemFubUtvbnRyb2x5T2Jub3ZpdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0R1Nlem5hbUtvbnRyb2x5SG90b3ZvLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RHU2V6bmFtS29udHJvbHlTdG9ybm8sIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEdTZXpuYW1Lb250cm9seU5lbmlIb3Rvdm8sIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbFByaXBhZHUsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0R1Nlem5hbUtvbnRyb2x5Tm92YSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIC8vIUFrY2Ugbm92w6Ega29udG9ybGEgb2RzdHJhbsSbbmEgLT4gTm92w6Ega29udHJvbGEgcG91emUgbmFkIGRldGFpbGVtIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBmaWx0ciBGT1JNIHBybyBzZXpuYW0ga29udHJvbCBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5oZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJkZHBQcmVobGVkS29udHJvbEZpbHRlclwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkZpbHRyeVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBwb2hsZWTDoXZreVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC50eXBQb2hsZWRhdmt5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfcGhsPXZhbHVlLnR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdHlwX3BobDogdGhpcy50eXBfcGhsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBQxZlpZGF0IGRvIHNlem5hbXUgbW/Fvm5vc3QgcHJvIHbDvWLEm3IgdsWhZWNoIHBvaGxlZMOhdmVrXHJcbiAgICAgICAgICAgICAgICAgICAgLy9beyB0eXBfcGhsOiAwLCBuYXpldjogXCJWxaFlY2hueSB0eXB5IHBvaGxlZMOhdmVrXCIgfV1cclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWRlalZvbGJ1VnNlY2hueTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGE/LnR5cF9waGwgPT0gXCJBTExcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtkYXRhPy5uYXpldn1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBgJHtkYXRhPy50eXBfcGhsfSAtICR7ZGF0YT8ubmF6ZXZ9YDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBrb250cm9seVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC50eXBLb250cm9seSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfa29udFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF9rb250PXZhbHVlLnR5cF9rb250XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB7IHR5cF9rb250OiA5OTk5LCB0eXBfa29udF90eHQ6IFwiVsWhZWNobnkga29udHJvbHlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpZGVqVm9sYnVWc2VjaG55OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLml4cyh0cnVlKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlZTXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODkqXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvem7DoW1rYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBQcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKHsgZGVmYXVsdE9wZXJhdG9yOiBcIkxJS0VcIiwgb3BlcmF0b3JzOiBbXCJMSUtFXCIsIFwiPVwiXSwgdXNlck9wZXJhdG9yczogW10gfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpvYnJheml0IHBvdXplXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZuaVwiLCBsYWJlbDogXCJBa3Rpdm7DrVwiLCB0b29sdGlwOiBcIkFrdGl2bsOtXCIsIC8vaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcIm5lYWt0aXZuaVwiKS5nZmllbGQ8Qm9vbGVhbj4oXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm0uZmluZEZpZWxkcyhcInJiX3BvcGxfcGxcIikuZ2ZpZWxkPEJvb2xlYW4+KFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5lYWt0aXZuaVwiLCBsYWJlbDogXCJOZWFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiTmVha3Rpdm7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbnB1dC52YWx1ZSA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiYWt0aXZuaVwiKS5nZmllbGQ8Qm9vbGVhbj4oXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm0uZmluZEZpZWxkcyhcInJiX3BvcGxfcGxcIikuZ2ZpZWxkPEJvb2xlYW4+KFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy00XCIsIHsgbmFtZTogXCJ2bGFzdG5pXCIsIGxhYmVsOiBcIlZsYXN0bsOtXCIsIHRvb2x0aXA6IFwiVmxhc3Ruw61cIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiU3RhdiBrb250cm9seVwiKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwic3Rhdl9rb250cm9sYVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwibW9kZWwuc3Rhdl9rb250cm9sYT12YWx1ZS5pZFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgaW5pdGlhbFZhbHVlOiB7IGlkOiAyLCBwb3BpczogXCJCZXogcm96bGnFoWVuw61cIn0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpdGVtVGVtcGxhdGU6IFwie3BvcGlzfVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGF0YTogW1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHsgaWQ6IDIsIHBvcGlzOiBcIkJleiByb3psacWhZW7DrVwifSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB7IGlkOiAxLCBwb3BpczogXCJQcm92ZWRlbm9cIiB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHsgaWQ6IDAsIHBvcGlzOiBcIk5lcHJvdmVkZW5vXCIgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgXVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYga29udHJvbHlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X2tvbnRyb2xhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDIsIGxhYmVsOiBcIkJleiByb3psacWhZW7DrVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiBcIlByb3ZlZGVub1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiBcIk5lcHJvdmVkZW5vXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0LiBrb250cm9seSBvZCAtIGRvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnaW50ZXJ2YWxib3hcIiwgeyBuYW1lOiBcImRhdF9rb250cm9sYVwiIH0pO1xyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmhlYWRlckZvcm07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBWeXR2b8WZw60gZmlsdHIgcHJvIHNlem5hbSBrb250cm9sIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5maWx0ZXIgPSAkLm5ld0RpdihcImZpbHRlckZvcm1QcmVobGVkS29udHJvbFwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLlxyXG4gICAgICAgICAgICAgICAgZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW3RoYXQuY3JlYXRlRmlsdGVyRm9ybSgpXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiAoZXZlbnQsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEob2JqLmZpbHRlcilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIFZ5dHZvxZnDrSBzYW1vdG7DvSBncmlkL3Nlem5hbSBrb250cm9sIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZCA9ICQubmV3RGl2KFwiZ3JpZFByZWhsZWRLb250cm9sXCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RhdGE6IFtdLC8vdGhhdC56aXNrZWpEYXRhKCksICAgLy8gdGhpcy5tb2RlbFBvbG96a3lbMF0gICAvL3phdGltIG5lbWFtIHphZG5hIGRhdGEsIG5hc3RhdmltIHByYXpkbmUgcG9sZS4gViBtb21lbnRlIG5hY3RlbmkgamUgbmFzdGF2aW0gcHJlcyBvcHRpb25zIChtZXRvZGEgbG9hZEpzR3JpZClcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0R1Nlem5hbUtvbnRyb2x5RGV0YWlsLCBcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSwgLy8hIHphxaFrdMOhdmFjw60gcG9sbMOtxb5rYSBnZ3JpZHUgLT4gZ2V0U2VsZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuUHJlaGxlZEtvbnRyb2woKSwgLy8gdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVmYXVsdFwiLCBfbG9ja2VkOiB0cnVlLCBfZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJzdGF2X2tvbnRyb2x5LCBpeHAsIGRhdF9rb250ciwgdnMsIHR5cF9waGwsIHR5cF9rb250LCBlc3VfdHh0LCBwb3puYW1rYSwgYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwiTmVha3Rpdm7DrVwiLCBmb3JtdWxhOiAnTk9UKEVRVUFMUyhAYWt0aXZpdGEsIDEwMCkpJywgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmxpZ2h0Z3JheSwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmF5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogRnVua2NlIHBybyB6w61za8OhbsOtIGZpbHRyb3ZhbsO9Y2ggZGF0IFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YShmaWx0ZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKCF0aGF0LnZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBJc2wuVmlldyh0aGF0LmlzbC5QcmlwYWRLb250cm9sYS5saXN0KFxyXG4gICAgICAgICAgICAgICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wiRGVmYXVsdFwiLCBcIkV4dGVuZGVkXCIsIFwiRXh0ZW5kZWQyXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICAgICAgLy99IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKVxyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5iZWdpbk9wZXJhdGlvbihcIk5hxI3DrXTDoW7DrSBwxZllaGxlZHUga29udHJvbFwiKTtcclxuICAgICAgICAgICAgLy90aGF0LmlzbC5QcmVobGVkS29udHJvbC5saXN0XHJcbiAgICAgICAgICAgIC8vICAgIChcclxuICAgICAgICAgICAgLy8gICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhLCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyoqIFxyXG4gICAgICAgIC8vICogRnVua2NlIHZvbMOhasOtY2kgZWRpdGFjaSBleGlzdHVqw61jw60ga29udHJvbHkgXHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgZGV0YWlsS29udHJvbHkoKTogdm9pZCB7ICBcclxuICAgICAgICAvLyAgICAvL1RPRE86IFDFmWVzdW5vdXQgYWtjaSBkbyBzYW1vc3RhdG7DqWhvIHNvdWJvcnUgYSB1bW/Fvm5pdCBqZWppY2ggdm9sw6Fuw60geiB2w61jZSBtw61zdCAobmFwxZkuZGV0YWlsIHDFmcOtcGFkdSA+IHrDoWxvxb5rYSBLb250cm9seSlcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gICAgdmFyIHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuXHJcbiAgICAgICAgLy8gICAgaWYgKHJvdyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IHrDoXpuYW0hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgIC8vICAgIHZhciB3aW5kb3dPcHRpb24gPSB7IHRpdGxlOiBcIk5hc3RhdmVuw60ga29udHJvbHlcIiwgd2lkdGg6IDYwMCwgaGVpZ2h0OiA0ODAgfTsgLy90b2RvIFVwcmF2aXQgdmVsaWtvc3Qgb2tuYVxyXG4gICAgICAgIC8vICAgIHZhciBQYXJhbXNKU09OID0geyBJRDogXCJERFBHRGV0YWlsS29udHJvbHkjXCIsIEl4cDogcm93Lml4cCwgRGF0X2tvbnRyOiByb3cuZGF0X2tvbnRyLCBFZGl0OiBmYWxzZSB9O1xyXG4gICAgICAgIC8vICAgIEdEbGcuc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbEtvbnRyb2x5XCIsIFBhcmFtc0pTT04sIHdpbmRvd09wdGlvbilcclxuICAgICAgICAvLyAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2KSB7IC8vIHBvdMOpIGNvIHNlIG9rbm8gemF2xZllXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy90aGF0Lnppc2tlakRhdGEodGhhdC5vX2ZpbHRyKTtcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy8vKiogXHJcbiAgICAgICAgLy8gKiBGdW5rY2Ugdm9sw6Fqw61jaSB6YWxvxb5lbsOtIG5vdsOpIGtvbnRyb2x5IFxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIG5vdmFLb250cm9sYSgpOiB2b2lkIHtcclxuICAgICAgICAvLyAgICAvL1RPRE86IFDFmWVzdW5vdXQgYWtjaSBkbyBzYW1vc3RhdG7DqWhvIHNvdWJvcnUgYSB1bW/Fvm5pdCBqZWppY2ggdm9sw6Fuw60geiB2w61jZSBtw61zdCAobmFwxZkuZGV0YWlsIHDFmcOtcGFkdSA+IHrDoWxvxb5rYSBLb250cm9seSlcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gICAgdmFyIHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZEtvbnRyb2xhRHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuXHJcbiAgICAgICAgLy8gICAgaWYgKHJvdyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IHrDoXpuYW0hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgIC8vICAgIHZhciB3aW5kb3dPcHRpb24gPSB7IHRpdGxlOiBcIk5vdsOhIGtvbnRyb2xhXCIsIHdpZHRoOiA2MDAsIGhlaWdodDogNDgwIH07IC8vdG9kbyBVcHJhdml0IHZlbGlrb3N0IG9rbmFcclxuICAgICAgICAvLyAgICB2YXIgUGFyYW1zSlNPTiA9IHsgSVM6IFwiRERQR0RldGFpbEtvbnRyb2x5I1wiLCBJeHA6IHJvdy5peHAsIERhdF9rb250cjogbnVsbCwgRWRpdDogdHJ1ZSwgQWt0aXZpdGFaYXpuYW11OiAxMDAgfTtcclxuICAgICAgICAvLyAgICBHRGxnLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxLb250cm9seVwiLCBQYXJhbXNKU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgLy8gICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldikgeyAvLyBwb3TDqSBjbyBzZSBva25vIHphdsWZZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL3RoYXQuemlza2VqRGF0YSh0aGF0Lm9fZmlsdHIpO1xyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogRnVua2NlIHBybyBuYcSNdGVuw60gdHlwdSBwb2hsZWTDoXZreVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIG5hY3RpVHlwUGhsKCk6IHZvaWQge1xyXG4gICAgICAgIC8vICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiZGRwUHJlaGxlZEtvbnRyb2xGaWx0ZXJcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyB0eXBfcGhsOiB0aGF0LnR5cF9waGwgfSk7XHJcbiAgICAgICAgLy8gICAgdGhpcy5maWx0ZXIuZmluZEZvcm1zKFwiZGRwUHJlaGxlZEtvbnRyb2xGaWx0ZXJcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyB0eXBfcGhsOiB0aGF0LnR5cF9waGwgfSk7XHJcbiAgICAgICAgLy8gICAgdGhpcy5maWx0ZXIuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyB0eXBfcGhsOiB0aGF0LnR5cF9waGwgfSk7XHJcbiAgICAgICAgLy99XHJcbiAgICB9IC8vZW5kT2ZDbGFzcyBHUHJlaGxlZEtvbnRyb2xcclxuXHJcbn0gLy9lbmRPZk5hbWVzcGFjZSJdfQ==