"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoUkazatele extends WebClient.GSeznamEkoZaznamuBase {
                constructor(content) {
                    super(content);
                    this.logOptions = { name: "GSeznamEkoUkazatele", authorCode: 302, file: "GSeznamEkoUkazatele.ts" };
                    this.pouzivanStrukPopis = false;
                    this.povolenNahled = false;
                    this.rememberHistory = true;
                    this.souctovyRadekAtomaticky = false;
                    //this.Zapisova = false;
                    // definice isl sluzeb pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.Ukazatel.list();
                    this.taskCount = this.parentCnt.isl.Ukazatel.count();
                }
                /**
                  * Nacti filtry
                  * @param that
                  * @param req
                  * @param next
                  */
                getFilterData(that, req, next) {
                    var maska = {};
                    const grid = this.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    return grid.ggridserverfilter("collect", maska)
                        .then((filterServer) => {
                        maska = filterServer;
                        maska.vl = that.TypUlohy == 14 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.StrednedobyVyhled */;
                        //let filtr: Gordic.Uct.Interface.GUctUkazatelListRequestDto = {
                        //    Maska: maska, Limit: 0
                        //}           
                        debugger;
                        let myfiltr = filterServer;
                        if (that.addFilterToHistory) {
                            if (that.currFilterHistoryIndex !== that.filterHistory.length - 1)
                                that.filterHistory.splice(that.currFilterHistoryIndex + 1);
                            let save = { filter: myfiltr };
                            that.filterHistory.push(save);
                            that.currFilterHistoryIndex++;
                        }
                        that.addFilterToHistory = true;
                        that.parentCnt.actions["nextFilterAct"]?.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                        that.parentCnt.actions["prevFilterAct"]?.enabled(that.currFilterHistoryIndex > 0);
                        var newRequest = $.extend(true, {}, req);
                        newRequest["filters"] = myfiltr;
                        return next(newRequest);
                    });
                    //return that.getFilter(that.$filterPanel.gfilterpanel("getCurrentData"))
                    //    .then((newFilter) => {
                    //        if (that.addFilterToHistory) {
                    //            if (that.currFilterHistoryIndex !== that.filterHistory.length - 1)
                    //                that.filterHistory.splice(that.currFilterHistoryIndex + 1);
                    //            that.filterHistory.push(newFilter);
                    //            that.currFilterHistoryIndex++;
                    //        }
                    //        that.addFilterToHistory = true;
                    //        that.parentCnt.actions["nextFilterAct"]?.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                    //        that.parentCnt.actions["prevFilterAct"]?.enabled(that.currFilterHistoryIndex > 0);
                    //        var newRequest = $.extend(true, {}, req);
                    //        if (that.TypUlohy !== Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis) {
                    //            let rq = {
                    //                RadekStavu: that.CurrentRow,
                    //                Maska: newFilter.filter
                    //                , Maska2: newFilter.filter
                    //                , TypUlohy: that.TypUlohy
                    //                , Elementy: newFilter.elementy
                    //                , FilterStrPopis: newFilter.filterStrPopis
                    //                , logovatGdpr: true
                    //                , StrPopisKeys: that.addStrPopisColumns
                    //                , maxRecords: -1
                    //                , Limit: 0
                    //            };
                    //            let maska = newFilter.filter;
                    //            for (var name in newFilter.filter?.cfu) {
                    //                maska![name] = newFilter.filter?.cfu[name];
                    //            }
                    //            rq.Maska = maska;
                    //            newRequest["filters"] = rq;
                    //        }
                    //        else
                    //            newRequest["filters"] = { Maska: newFilter.filter, Elementy: ((newFilter!.elementy!) as any).filters, Limit: 0, TypUlohy: that.TypUlohy };
                    //        return next(newRequest);
                    //    }
                    //    )
                    //    ;
                }
                /**
                 * Definice menu
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    let menu = new Array();
                    menu.push({ action: this.parentCnt.actions.editovatAct, favorite: true });
                    menu.push({ action: this.parentCnt.actions.historieAct, favorite: true });
                    menu.push({ action: this.parentCnt.actions.poznamkyAct, favorite: true });
                    menu.push({ action: this.parentCnt.actions.prevFilterAct, favorite: true, align: "opposite" });
                    menu.push({ action: this.parentCnt.actions.nextFilterAct, favorite: true, align: "opposite" });
                    //menu.push({ action: this.zapisyAct, favorite: true });
                    if (this.printAct)
                        menu.push({ action: this.printAct, favorite: true });
                    menu.push({ action: this.clearFilterRowAct });
                    menu.push({
                        type: "static",
                        caption: "jres:31100268", //RC 31100268 : Rychlé akce
                        children: [
                            { action: this.parentCnt.actions.insAct, icon: "gi-refresh", caption: "jres:31100226" }, //RC 31100226 : Načtení dat
                            { action: this.parentCnt.actions.clearAndFilterAct, caption: "jres:31100228" }, //RC 31100228 : Vyčistit a načíst
                        ]
                    });
                    return menu;
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    // pokud neni grid, nic nedelej
                    //const grid = this.getGrid();
                    //if (grid == null) return;
                    if (this.parentCnt.closed)
                        return;
                    //var dataFound = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid) > 0;
                    var dataFound = pocetRadku > 0;
                    var tooltip = dataFound ? "" : "jres:30250174"; //RC 30250174 : Záznamy nenalezeny
                    this.parentCnt.actions.poznamkyAct.update({ enabled: dataFound, tooltip: tooltip });
                    this.parentCnt.actions.historieAct.update({ enabled: dataFound, tooltip: tooltip });
                    this.parentCnt.actions.printAct.update({ enabled: dataFound, tooltip: tooltip });
                    if (dataFound)
                        this.parentCnt.actions.editovatAct.updatePermission(this.parentCnt["editovatPermit"]);
                    else
                        this.parentCnt.actions.editovatAct.update({ enabled: dataFound, tooltip: tooltip });
                }
                /**
                * Vytvoreni klavesovych zkratek
                *
                * */
                createShortCut() {
                    super.createShortCut();
                }
                createGridFormat() {
                    var myGridFormat = new Gordic.Data.GridFormat();
                    switch (this.Globals.Params.RezimProvozu) {
                        case 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */: break;
                        case 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */:
                            myGridFormat.addTextColumn({
                                name: "nks",
                                caption: this.Globals.Zkratky?.Nks,
                                //description: this.Globals.Zkratky?. this.texty.Nks,
                                width: 60,
                                //group: topoGroup,
                                serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                            });
                            break;
                        case 30 /* Gordic.Uct.Interface.GUcrRezimProvozu.ICO */:
                            myGridFormat.addTextColumn({
                                name: "ucs",
                                caption: this.Globals.Zkratky?.Ucs,
                                //description: this.texty.Ucs,
                                width: 60,
                                //group: topoGroup,
                                aggregate: Gordic.Data.Aggregates.first("ucs"),
                                //serverFilter: Gordic.Eko.Filters.ucsInterval(this.filterOptions.ucs)
                                serverFilter: Gordic.Eko.Filters.ucsInterval({
                                    ico: this.filterOptions.ucs.ico, aktProhl: this.filterOptions.ucs.aktProhl,
                                    onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: undefined, secondField: undefined,
                                    model: "ucs",
                                    disabled: false
                                })
                            });
                            if (!this.AvoidUus)
                                myGridFormat.addTextColumn({
                                    name: "uus",
                                    caption: this.Globals.Zkratky?.Uus,
                                    //description: this.texty.Uus,
                                    width: 60,
                                    //group: topoGroup,
                                    //serverFilter: Gordic.Eko.Filters.uusInterval(this.filterOptions.uus)
                                    serverFilter: Gordic.Eko.Filters.uusInterval({
                                        ico: this.filterOptions.uus.ico, ucs: this.filterOptions.uus.ucs, aktProhl: this.filterOptions.uus.aktProhl,
                                        onlyActive: this.filterOptions.uus.onlyActive, caption: this.filterOptions.uus.caption, name: "uus", firstField: undefined, secondField: undefined,
                                        model: "uus",
                                        disabled: false
                                    })
                                });
                            if (!this.AvoidNks)
                                myGridFormat.addTextColumn({
                                    name: "nks",
                                    caption: this.Globals.Zkratky?.Nks,
                                    //description: this.texty.Nks,
                                    width: 60,
                                    //group: topoGroup,
                                    serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                                });
                            break;
                        case 40 /* Gordic.Uct.Interface.GUcrRezimProvozu.SOR */:
                            myGridFormat.addTextColumn({
                                name: "ico",
                                caption: this.Globals.Zkratky?.Ico,
                                //description: this.texty.Ico,
                                width: 60,
                                //group: topoGroup
                                aggregate: Gordic.Data.Aggregates.first("ico"),
                                serverFilter: this.Globals.Params.ExterniSumarizace
                                    ? Gordic.Eko.Filters.rarInterval({ model: "ico", onlyActive: false, caption: this.Globals.Zkratky?.Ico, disabled: false })
                                    : Gordic.Eko.Filters.icoInterval({ model: "ico", onlyActive: false, caption: this.Globals.Zkratky?.Ico, disabled: false })
                            });
                            if (this.AvoidExt || this.Globals.Params.TypSumarizace !== 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */) {
                                myGridFormat.addTextColumn({
                                    name: "ucs",
                                    caption: this.Globals.Zkratky?.Ucs,
                                    description: this.Globals.Texty?.Ucs,
                                    width: 60,
                                    //group: topoGroup,
                                    aggregate: Gordic.Data.Aggregates.first("ucs"),
                                    //serverFilter: Gordic.Eko.Filters.ucsInterval(this.filterOptions.ucs)
                                    serverFilter: Gordic.Eko.Filters.ucsInterval({
                                        ico: this.filterOptions.ucs.ico, aktProhl: this.filterOptions.ucs.aktProhl,
                                        onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: undefined, secondField: undefined,
                                        model: "ucs"
                                        //, disabled: !!(this.Radek_DPH) && !!this.Filter.ucs
                                    })
                                });
                                if (!this.AvoidUus)
                                    myGridFormat.addTextColumn({
                                        name: "uus",
                                        caption: this.Globals.Zkratky?.Uus,
                                        description: this.Globals.Texty?.Uus,
                                        width: 60,
                                        //group: topoGroup,
                                        //serverFilter: Gordic.Eko.Filters.uusInterval(this.filterOptions.uus)
                                        serverFilter: Gordic.Eko.Filters.uusInterval({
                                            ico: this.filterOptions.uus.ico, ucs: this.filterOptions.uus.ucs, aktProhl: this.filterOptions.uus.aktProhl,
                                            onlyActive: this.filterOptions.uus.onlyActive, caption: this.filterOptions.uus.caption, name: "uus", firstField: undefined, secondField: undefined,
                                            model: "uus",
                                            disabled: false
                                        })
                                    });
                                if (!this.AvoidNks)
                                    myGridFormat.addTextColumn({
                                        name: "nks",
                                        caption: this.Globals.Zkratky?.Nks,
                                        description: this.Globals.Texty?.Nks,
                                        width: 60,
                                        //group: topoGroup,
                                        serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                                    });
                            }
                            break;
                    }
                    if (this.Globals.Params?.Dph_Rezim == 0 /* Gordic.Uct.Interface.GUcrRezimDph.Ico */) {
                        myGridFormat.addTextColumn({
                            name: "ucs",
                            caption: this.Globals.Zkratky?.Ucs,
                            description: this.Globals.Zkratky?.Ucs,
                            width: 70,
                            //group: topoGroup,
                            aggregate: Gordic.Data.Aggregates.first("ucs"),
                            //serverFilter: Gordic.Eko.Filters.ucsInterval({
                            //    onlyActive: false, dialogOptions: undefined, disabled: false, firstField: undefined, name: "uus", secondField: undefined,
                            //    model: "ucs", caption: this.Globals.Zkratky?.Uus as any, maxLength: 10, aktProhl: 100, ico: this.Globals.EkoParams?.ICO as any
                            //})
                        });
                        myGridFormat.addTextColumn({
                            name: "uus",
                            caption: this.Globals.Zkratky?.Uus,
                            description: this.Globals.Zkratky?.Uus,
                            width: 60,
                            //group: topoGroup,
                            //serverFilter: Gordic.Eko.Filters.uusInterval({
                            //    onlyActive: false, dialogOptions: undefined, disabled: false, firstField: undefined, name: "uus", secondField: undefined,
                            //    model: "uus", caption: this.Globals.Zkratky?.Uus as any, maxLength: 10, aktProhl: 100, ico: this.Globals.EkoParams?.ICO as any, ucs: this.Globals.EkoParams?.UCS as any
                            //})
                        });
                    }
                    else if (this.Globals.Params?.Dph_Rezim == 1 /* Gordic.Uct.Interface.GUcrRezimDph.Ucs */) {
                        myGridFormat.addTextColumn({
                            name: "uus",
                            caption: this.Globals.Zkratky?.Uus,
                            description: this.Globals.Zkratky?.Uus,
                            width: 60,
                            //group: topoGroup,
                            //serverFilter: Gordic.Eko.Filters.uusInterval({
                            //    onlyActive: false, dialogOptions: undefined, disabled: false, firstField: undefined, name: "uus", secondField: undefined,
                            //    model: "uus", caption: this.Globals.Zkratky?.Uus as any, maxLength: 10, aktProhl: 100, ico: this.Globals.EkoParams?.ICO as any, ucs: this.Globals.EkoParams?.UCS as any
                            //})
                        });
                    }
                    myGridFormat.addTextColumn({
                        name: "nazev",
                        caption: "jres:30250166", //RC 30250166 : Ukazatel
                        serverFilter: Gordic.Eko.Filters.stringSingle({ model: "nazev", caption: "jres:30250166" }),
                        width: 80,
                    });
                    if (this.TypUlohy == 14 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.StrednedobyVyhled */)
                        myGridFormat.addNumberColumn({
                            name: "rok",
                            caption: "jres:30250167", //RC 30250167 : Rok
                            serverFilter: Gordic.Eko.Filters.integerInterval({ model: "rok" }),
                            width: 50,
                        });
                    myGridFormat.addCurrencyColumn({
                        name: "c0",
                        caption: "jres:30250168", //RC 30250168 : AS příjmy
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0" }),
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c1",
                        caption: "jres:30250169", //RC 30250169 : AS výdaje
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1" }),
                        width: 120,
                    });
                    if (this.TypUlohy == 15 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.AktualniObdobi */) {
                        myGridFormat.addCurrencyColumn({
                            name: "c0_poc",
                            caption: "jres:30250170", //RC 30250170 : PS příjmy
                            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0_poc" }),
                            width: 120,
                        });
                        myGridFormat.addCurrencyColumn({
                            name: "c1_poc",
                            caption: "jres:30250171", //RC 30250171 : PS výdaje
                            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1_poc" }),
                            width: 120,
                        });
                        myGridFormat.addCurrencyColumn({
                            name: "c0_rz",
                            caption: "jres:30250172", //RC 30250172 : Úprava - příjmy
                            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0_rz" }),
                            width: 120,
                        });
                        myGridFormat.addCurrencyColumn({
                            name: "c1_rz",
                            caption: "jres:30250173", //RC 30250173 : Úprava - výdaje
                            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1_rz" }),
                            width: 120,
                        });
                    }
                    return myGridFormat;
                }
                createProfiles(gf) {
                    let profiles = {
                        default: { name: "jres:31100232", columns: {} } //RC 31100232 : Výchozí
                    };
                    gf.columns.filter((c) => { return !c.hidden; })
                        .forEach((c) => { profiles.default.columns[c.name] = { hidden: false }; });
                    return profiles;
                }
                /**
                 * Vytvoreni filtrovaciho panelu
                 * @param that
                 */
                createFilterPanel(that) {
                    this.$filterPanel = $.newDiv("js-filtr")
                        .appendTo(this.parentCnt.element)
                        .gfilterpanel({
                        helperCustomizer: function (data) {
                            var polSort = data.sort(function (a, b) { return a.name >= b.name; });
                            return polSort;
                        },
                        forms: [],
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        filterViewModeUserSettings: [FilterViewMode.Detail /*, FilterViewMode.Normal*/],
                        //simpleModeAutoLoadAfterCreatePanel: false,
                        //userDefaultFilter: true,
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        primaryButtonBehaviour: "AlwaysPrimary",
                        favoriteLayoutDescriptor: "L4M3S1",
                        clearFilterButtonVisible: "AlwaysVisible",
                        autoLoadAfterChoseFilter: false,
                        //filterHelperItemTemplate: "<b>{nazev}</b>",
                        //textItemTemplate: "{nazev}",
                        //apply: function (event, obj) {
                        //    //console.log("filterForm.apply", obj);
                        //    //that.log.trace("filterForm.apply", obj);
                        //    if (that.loadingData) return;
                        //    var view = that.$grid.ggrid("getView");
                        //    view.requestData(obj.filter)
                        //        ;
                        //},
                        reset: (ev, data) => {
                            that.loadingData = true;
                            const grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggridserverfilter("clear");
                            //this.$filterPanel.gfilterpanel("clear");
                            //that.loadingData = false;
                        }
                    });
                }
                createActions() {
                    super.createActions();
                    let that = this;
                    this.parentCnt.actions.add({
                        name: "editovatAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:30250163", //RC 30250163 : Editovat
                        run: function (ev, ctx) {
                            const grid = that.getGrid();
                            if (grid == null)
                                return;
                            let row = grid.ggrid("activeRow");
                            //that.showUkazatel(row);
                            //return;
                            if (row === null)
                                return;
                            //that.$grid.ggrid("activeCellAddress");
                            ////var column = that.$grid.ggrid("activeCellAddress").col;
                            that.showUkazatel(row);
                        }
                    });
                    this.parentCnt.actions.add({
                        name: "historieAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:30250164", //RC 30250164 : Historie
                        run: function (ev, ctx) {
                            const grid = that.getGrid();
                            if (grid == null)
                                return;
                            var row = grid.ggrid("activeRow");
                            if (row === null)
                                return;
                            that.showHistory(row);
                        }
                    });
                    this.parentCnt.actions.add({
                        name: "poznamkyAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:30250165", //RC 30250165 : Poznámky
                        run: function (ev, ctx) {
                            const grid = that.getGrid();
                            if (grid == null)
                                return;
                            var row = grid.ggrid("activeRow");
                            if (row === null)
                                return;
                            that.showNotes(row);
                        }
                    });
                    this.parentCnt.actions.add(GAction.createPrintAction({
                        name: "printAct",
                        tema: "inu_ptm_prizdph,inu_ptm_dandolo,inu_ptm_dphsest",
                        enabled: false,
                        parentContent: this.parentCnt,
                        //reportGeneratorType: "Gordic.Ucr.WebClient.GSeznamEkoZaznamuGenerator",
                        serverParameterMethod: "Gordic.Ucr.WebClient.GUcrPrintParameters:ServerParameterMethodTiskDanovaPriznani",
                        reportStarting: function (rep) {
                            // zjisteni filtru
                            var filter = that.$filterPanel.gfilterpanel("getCurrentData"); //that.getFilter().gfilterpanel('getCurrentData');
                            // naplneni filtru
                            rep.customDto = { MesicDPH: filter.mesic, Ucs: filter.ucs, Uus: filter.uus };
                        }
                    }));
                }
                /**
                 * Defaultni akce na gridu
                 *
                 *
                 * @param row
                 */
                defaultAction(row) {
                    this.parentCnt.log.trace("Start defaultAction GSeznamEkoUkazatele");
                    this.showUkazatel(row);
                }
                /**
                 * Zobrazeni detailu ukazatele
                 * @param radek
                 */
                showUkazatel(radek) {
                    var that = this;
                    if (!radek) {
                        let grid = this.getGrid();
                        if (grid == null)
                            return;
                        var sel = grid.ggrid("getSelection");
                        if (sel.length === 0)
                            return;
                        radek = sel[0];
                    }
                    ;
                    that.parentCnt.dialogs.showModalWindow(Gordic.Ucr.WebClient.GDetailUkazatel, { currentRow: radek, typUlohy: that.TypUlohy }, "jres:30250175", 800, 600, true) //RC 30250175 : Editace hodnoty ukazatele
                        .on("close", function (res) {
                        //if (typeof res !== "undefined" && res === true) {
                        //    that.$grid.ggrid("getView").requestData(undefined);                        
                        //}
                    })
                        .on("contentclose", function (ev, ctx) {
                        debugger;
                        if (typeof ctx.refresh !== "undefined" && ctx.refresh === true) {
                            //that.$grid.ggrid("getView").requestData(undefined);
                            that.reload();
                        }
                    });
                }
                /**
                 * Zobrazeni detailu ukazatele
                 * @param radek
                 */
                showHistory(radek) {
                    var that = this;
                    that.parentCnt.beginOperation("jres:30250191"); //RC 30250191 : Probíhá načítání
                    that.parentCnt.isl.Ukazatel.listHistory({
                        ixsEvp: radek.ixs_evp
                    })
                        .getData()
                        .then((result) => {
                        that.parentCnt.dialogs.showModalWindow(Gordic.Ucr.WebClient.GHistorieUkazatele, { data: result, notes: false }, "jres:30250190".format(radek.nazev), 800, 600, true) //RC 30250190 : Historie k ukazateli {0}
                            .on("close", function (res) {
                            //if (typeof res !== "undefined" && res === true) {
                            //    that.$grid.ggrid("getView").requestData(undefined);                        
                            //}
                        })
                            .on("contentclose", function (ev, ctx) {
                            debugger;
                            //if (typeof ctx.refresh !== "undefined" && ctx.refresh === true) {
                            //    that.$grid.ggrid("getView").requestData(undefined);
                            //}
                        });
                    }, (jqXHR, type, obj) => {
                        //debugger;
                        that.parentCnt.endOperation();
                    }).always(() => { that.parentCnt.endOperation(); });
                }
                /**
                 * Zobrazeni detailu ukazatele
                 * @param radek
                 */
                showNotes(radek) {
                    var that = this;
                    that.parentCnt.beginOperation("jres:30250191"); //RC 30250191 : Probíhá načítání
                    that.parentCnt.isl.Ukazatel.listPoznamky({
                        ixsEvp: radek.ixs_evp
                    })
                        .getData()
                        .then((result) => {
                        that.parentCnt.dialogs.showModalWindow(Gordic.Ucr.WebClient.GHistorieUkazatele, { data: result, notes: true, row: radek }, "jres:30250192".format(radek.nazev), 800, 600, true) //RC 30250192 : Poznámky k ukazateli {0}
                            .on("close", function (res) {
                            //if (typeof res !== "undefined" && res === true) {
                            //    that.$grid.ggrid("getView").requestData(undefined);                        
                            //}
                        })
                            .on("contentclose", function (ev, ctx) {
                            debugger;
                            //if (typeof ctx.refresh !== "undefined" && ctx.refresh === true) {
                            //    that.$grid.ggrid("getView").requestData(undefined);
                            //}
                        });
                    }, (jqXHR, type, obj) => {
                        //debugger;
                        that.parentCnt.endOperation();
                    }).always(() => { that.parentCnt.endOperation(); });
                }
            }
            WebClient.GSeznamEkoUkazatele = GSeznamEkoUkazatele;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1VrYXphdGVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1Fa29Va2F6YXRlbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQXluQmY7QUF6bkJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXluQm5CO0lBem5CZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBeW5CN0I7UUF6bkJvQixXQUFBLFNBQVM7WUFFMUIsTUFBYSxtQkFBb0IsU0FBUSxVQUFBLHFCQUFxQjtnQkFhMUQsWUFBWSxPQUFxQztvQkFDN0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUZuQixlQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQztvQkFHMUYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO29CQUM1QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFBO29CQUNwQyx3QkFBd0I7b0JBQ3hCLGlEQUFpRDtvQkFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ25ELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN6RCxDQUFDO2dCQUVEOzs7OztvQkFLSTtnQkFDTSxhQUFhLENBQUMsSUFBVSxFQUFFLEdBQTRCLEVBQUUsSUFBd0k7b0JBQ3RNLElBQUksS0FBSyxHQUErQyxFQUFFLENBQUM7b0JBQzNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxP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Q0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDakMsUUFBUSxDQUFDOzRCQUNULG1FQUFtRTs0QkFDbkUseURBQXlEOzRCQUN6RCxHQUFHO3dCQUNQLENBQUMsQ0FBQyxDQUFDO29CQUVYLENBQUMsRUFJRCxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7d0JBQ2pCLFdBQVc7d0JBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDbEMsQ0FBQyxDQUNKLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFHM0QsQ0FBQzthQUVKO1lBam5CWSw2QkFBbUIsc0JBaW5CL0IsQ0FBQTtRQU1MLENBQUMsRUF6bkJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF5bkI3QjtJQUFELENBQUMsRUF6bkJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF5bkJuQjtBQUFELENBQUMsRUF6bkJTLE1BQU0sS0FBTixNQUFNLFFBeW5CZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1Fa29Va2F6YXRlbGUgZXh0ZW5kcyBHU2V6bmFtRWtvWmF6bmFtdUJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIC8qKiBHbG9iYWxuaSBtb2R1bG92ZSBwYXJhbWV0cnkgdiBKUyAqL1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBvdm9sZW5pIGVkaXRhY2VcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBlZGl0b3ZhdFBlcm1pdDogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR1Blcm1pc3Npb247XHJcblxyXG5cclxuXHJcbiAgICAgICAgLyoqIExpbWl0IHBvY3R1IG5hY2l0YW55Y2ggemF6bmFtdSwgcG9rdWQgbmVkb2pkZSBrIHBvdHZyemVuaSwgemUgdXppdmF0ZWwgY2hjZSBqaXQgcHJlcyBsaW1pdCAqL1xyXG4gICAgICAgIHN1bUxpbWl0OiBudW1iZXI7XHJcbiAgICAgICAgbG9nT3B0aW9ucyA9IHsgbmFtZTogXCJHU2V6bmFtRWtvVWthemF0ZWxlXCIsIGF1dGhvckNvZGU6IDMwMiwgZmlsZTogXCJHU2V6bmFtRWtvVWthemF0ZWxlLnRzXCIgfTtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBHU2V6bmFtRWtvWmF6bmFtdUJhc2VDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBvdXppdmFuU3RydWtQb3BpcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBvdm9sZW5OYWhsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZW1lbWJlckhpc3RvcnkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNvdWN0b3Z5UmFkZWtBdG9tYXRpY2t5ID0gZmFsc2VcclxuICAgICAgICAgICAgLy90aGlzLlphcGlzb3ZhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIGlzbCBzbHV6ZWIgcHJvIHNlem5hbSBhIG5hY3RlbmkgcG9jdHVcclxuICAgICAgICAgICAgdGhpcy50YXNrTGlzdCA9IHRoaXMucGFyZW50Q250LmlzbC5Va2F6YXRlbC5saXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0NvdW50ID0gdGhpcy5wYXJlbnRDbnQuaXNsLlVrYXphdGVsLmNvdW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICogTmFjdGkgZmlsdHJ5XHJcbiAgICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICAqIEBwYXJhbSByZXFcclxuICAgICAgICAgICogQHBhcmFtIG5leHRcclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEZpbHRlckRhdGEodGhhdDogdGhpcywgcmVxOiBJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbmV4dDogSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHwgSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbnVtYmVyPik6IElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+IHwgSlF1ZXJ5UHJvbWlzZTxJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8YW55Pj4gfCBKUXVlcnlQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgICAgICB2YXIgbWFza2E6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JVa2F6YXRlbEZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXI8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclVrYXphdGVsRmlsdGVyRHRvPihcImNvbGxlY3RcIiwgbWFza2EpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZmlsdGVyU2VydmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFza2EgPSBmaWx0ZXJTZXJ2ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFza2EudmwgPSB0aGF0LlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU3RyZWRuZWRvYnlWeWhsZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgZmlsdHI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RVa2F6YXRlbExpc3RSZXF1ZXN0RHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIE1hc2thOiBtYXNrYSwgTGltaXQ6IDBcclxuICAgICAgICAgICAgICAgICAgICAvL30gICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBteWZpbHRyOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVWthemF0ZWxGaWx0ZXJEdG8gPSBmaWx0ZXJTZXJ2ZXIgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmFkZEZpbHRlclRvSGlzdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICE9PSB0aGF0LmZpbHRlckhpc3RvcnkubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVySGlzdG9yeS5zcGxpY2UodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzYXZlID0geyBmaWx0ZXI6IG15ZmlsdHIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckhpc3RvcnkucHVzaChzYXZlIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZEZpbHRlclRvSGlzdG9yeSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnNbXCJuZXh0RmlsdGVyQWN0XCJdPy5lbmFibGVkKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCA8IHRoYXQuZmlsdGVySGlzdG9yeS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zW1wicHJldkZpbHRlckFjdFwiXT8uZW5hYmxlZCh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggPiAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1JlcXVlc3QgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcmVxKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdSZXF1ZXN0W1wiZmlsdGVyc1wiXSA9IG15ZmlsdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQobmV3UmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gdGhhdC5nZXRGaWx0ZXIodGhhdC4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikpXHJcbiAgICAgICAgICAgIC8vICAgIC50aGVuKChuZXdGaWx0ZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGlmICh0aGF0LmFkZEZpbHRlclRvSGlzdG9yeSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggIT09IHRoYXQuZmlsdGVySGlzdG9yeS5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckhpc3Rvcnkuc3BsaWNlKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCArIDEpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmZpbHRlckhpc3RvcnkucHVzaChuZXdGaWx0ZXIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCsrO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhhdC5hZGRGaWx0ZXJUb0hpc3RvcnkgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnNbXCJuZXh0RmlsdGVyQWN0XCJdPy5lbmFibGVkKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCA8IHRoYXQuZmlsdGVySGlzdG9yeS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnNbXCJwcmV2RmlsdGVyQWN0XCJdPy5lbmFibGVkKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCA+IDApO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIHZhciBuZXdSZXF1ZXN0ID0gJC5leHRlbmQodHJ1ZSwge30sIHJlcSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAodGhhdC5UeXBVbG9oeSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5WaWNlbGV0ZUZpbmFuY292YW5pWmFwaXMpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgcnEgPSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIFJhZGVrU3RhdnU6IHRoYXQuQ3VycmVudFJvdyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgTWFza2E6IG5ld0ZpbHRlci5maWx0ZXJcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLCBNYXNrYTI6IG5ld0ZpbHRlci5maWx0ZXJcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLCBUeXBVbG9oeTogdGhhdC5UeXBVbG9oeVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAsIEVsZW1lbnR5OiBuZXdGaWx0ZXIuZWxlbWVudHlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLCBGaWx0ZXJTdHJQb3BpczogbmV3RmlsdGVyLmZpbHRlclN0clBvcGlzXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICwgbG9nb3ZhdEdkcHI6IHRydWVcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLCBTdHJQb3Bpc0tleXM6IHRoYXQuYWRkU3RyUG9waXNDb2x1bW5zXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICwgbWF4UmVjb3JkczogLTFcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLCBMaW1pdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbGV0IG1hc2thID0gbmV3RmlsdGVyLmZpbHRlcjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIG5ld0ZpbHRlci5maWx0ZXI/LmNmdSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBtYXNrYSFbbmFtZV0gPSBuZXdGaWx0ZXIuZmlsdGVyPy5jZnVbbmFtZV07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJxLk1hc2thID0gbWFza2E7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbmV3UmVxdWVzdFtcImZpbHRlcnNcIl0gPSBycTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBuZXdSZXF1ZXN0W1wiZmlsdGVyc1wiXSA9IHsgTWFza2E6IG5ld0ZpbHRlci5maWx0ZXIsIEVsZW1lbnR5OiAoKG5ld0ZpbHRlciEuZWxlbWVudHkhKSBhcyBhbnkpLmZpbHRlcnMsIExpbWl0OiAwLCBUeXBVbG9oeTogdGhhdC5UeXBVbG9oeSB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIG5leHQobmV3UmVxdWVzdCk7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8gICAgKVxyXG4gICAgICAgICAgICAvLyAgICA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBtZW51XHJcbiAgICAgICAgICogQHBhcmFtIHR5cFVsb2h5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIERlZmluZU1lbnVCYXIodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICBsZXQgbWVudSA9IG5ldyBBcnJheTxNZW51UGFyYW1zPigpO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmVkaXRvdmF0QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmhpc3RvcmllQWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnBvem5hbWt5QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByZXZGaWx0ZXJBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMubmV4dEZpbHRlckFjdCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSk7XHJcbiAgICAgICAgICAgIC8vbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnphcGlzeUFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByaW50QWN0KVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnByaW50QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3QgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY4XCIsIC8vUkMgMzExMDAyNjggOiBSeWNobMOpIGFrY2VcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuaW5zQWN0LCBpY29uOiBcImdpLXJlZnJlc2hcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIgfSwgLy9SQyAzMTEwMDIyNiA6IE5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5jbGVhckFuZEZpbHRlckFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIgfSwgLy9SQyAzMTEwMDIyOCA6IFZ5xI1pc3RpdCBhIG5hxI3DrXN0XHJcblxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBuYXN0YXZlbmlBa2NpKGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHBvY2V0UmFka3U6IG51bWJlcikge1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIGdyaWQsIG5pYyBuZWRlbGVqXHJcbiAgICAgICAgICAgIC8vY29uc3QgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAvL2lmIChncmlkID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5jbG9zZWQgKSByZXR1cm47XHJcbiAgICAgICAgICAgIC8vdmFyIGRhdGFGb3VuZCA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdShncmlkKSA+IDA7XHJcbiAgICAgICAgICAgIHZhciBkYXRhRm91bmQgPSBwb2NldFJhZGt1ID4gMDtcclxuICAgICAgICAgICAgdmFyIHRvb2x0aXAgPSBkYXRhRm91bmQgPyBcIlwiIDogXCJqcmVzOjMwMjUwMTc0XCI7IC8vUkMgMzAyNTAxNzQgOiBaw6F6bmFteSBuZW5hbGV6ZW55XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMucG96bmFta3lBY3QhLnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5oaXN0b3JpZUFjdCEudXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kLCB0b29sdGlwOiB0b29sdGlwIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByaW50QWN0IS51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhRm91bmQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmVkaXRvdmF0QWN0IS51cGRhdGVQZXJtaXNzaW9uKHRoaXMucGFyZW50Q250W1wiZWRpdG92YXRQZXJtaXRcIl0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmVkaXRvdmF0QWN0IS51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVnl0dm9yZW5pIGtsYXZlc292eWNoIHprcmF0ZWtcclxuICAgICAgICAqIFxyXG4gICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlU2hvcnRDdXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZVNob3J0Q3V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0byAvKiYgR1Nlem5hbVphcGlzdVN0YXZ1RHRvKi8+IHtcclxuICAgICAgICAgICAgdmFyIG15R3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5HbG9iYWxzLlBhcmFtcyEuUmV6aW1Qcm92b3p1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuTktTOiBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5VQ1M6XHJcbiAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uIHRoaXMudGV4dHkuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5JQ086XHJcbiAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInVjc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudWNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuaWNvLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuY2FwdGlvbiwgbmFtZTogXCJ1Y3NcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInVjc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZFV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuaWNvLCB1Y3M6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMudWNzLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmNhcHRpb24sIG5hbWU6IFwidXVzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZE5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiB0aGlzLnRleHR5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5TT1I6XHJcbiAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiB0aGlzLnRleHR5LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwiaWNvXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHRoaXMuR2xvYmFscy5QYXJhbXMhLkV4dGVybmlTdW1hcml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEdvcmRpYy5Fa28uRmlsdGVycy5yYXJJbnRlcnZhbCh7IG1vZGVsOiBcImljb1wiLCBvbmx5QWN0aXZlOiBmYWxzZSwgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LkljbyBhcyBhbnksIGRpc2FibGVkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBHb3JkaWMuRWtvLkZpbHRlcnMuaWNvSW50ZXJ2YWwoeyBtb2RlbDogXCJpY29cIiwgb25seUFjdGl2ZTogZmFsc2UsIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5JY28gYXMgYW55LCBkaXNhYmxlZDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuQXZvaWRFeHQgfHwgdGhpcy5HbG9iYWxzLlBhcmFtcyEuVHlwU3VtYXJpemFjZSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFN1bWFyaXphY2UuRXh0ZXJuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLkdsb2JhbHMuVGV4dHk/LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInVjc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnVjcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuaWNvLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmNhcHRpb24sIG5hbWU6IFwidWNzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidWNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLywgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWRVdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLkdsb2JhbHMuVGV4dHk/LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5pY28sIHVjczogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy51Y3MsIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmNhcHRpb24sIG5hbWU6IFwidXVzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInV1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkTmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlRleHR5Py5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkdsb2JhbHMuUGFyYW1zPy5EcGhfUmV6aW0gPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltRHBoLkljbykge1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInVjc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBvbmx5QWN0aXZlOiBmYWxzZSwgZGlhbG9nT3B0aW9uczogdW5kZWZpbmVkLCBkaXNhYmxlZDogZmFsc2UsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgbmFtZTogXCJ1dXNcIiwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBtb2RlbDogXCJ1Y3NcIiwgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlV1cyBhcyBhbnksIG1heExlbmd0aDogMTAsIGFrdFByb2hsOiAxMDAsIGljbzogdGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPIGFzIGFueVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG9ubHlBY3RpdmU6IGZhbHNlLCBkaWFsb2dPcHRpb25zOiB1bmRlZmluZWQsIGRpc2FibGVkOiBmYWxzZSwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBuYW1lOiBcInV1c1wiLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcInV1c1wiLCBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzIGFzIGFueSwgbWF4TGVuZ3RoOiAxMCwgYWt0UHJvaGw6IDEwMCwgaWNvOiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gYXMgYW55LCB1Y3M6IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LlVDUyBhcyBhbnlcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLkdsb2JhbHMuUGFyYW1zPy5EcGhfUmV6aW0gPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltRHBoLlVjcykge1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG9ubHlBY3RpdmU6IGZhbHNlLCBkaWFsb2dPcHRpb25zOiB1bmRlZmluZWQsIGRpc2FibGVkOiBmYWxzZSwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBuYW1lOiBcInV1c1wiLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcInV1c1wiLCBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzIGFzIGFueSwgbWF4TGVuZ3RoOiAxMCwgYWt0UHJvaGw6IDEwMCwgaWNvOiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gYXMgYW55LCB1Y3M6IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LlVDUyBhcyBhbnlcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE2NlwiLCAvL1JDIDMwMjUwMTY2IDogVWthemF0ZWxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBcIm5hemV2XCIsIGNhcHRpb246XCJqcmVzOjMwMjUwMTY2XCIgfSksXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlN0cmVkbmVkb2J5VnlobGVkKVxyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNjdcIiwgLy9SQyAzMDI1MDE2NyA6IFJva1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG1vZGVsOiBcInJva1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTY4XCIsIC8vUkMgMzAyNTAxNjggOiBBUyBwxZnDrWpteVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBcIiB9KSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTY5XCIsIC8vUkMgMzAyNTAxNjkgOiBBUyB2w71kYWplXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQWt0dWFsbmlPYmRvYmkpIHtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMF9wb2NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNzBcIiwgLy9SQyAzMDI1MDE3MCA6IFBTIHDFmcOtam15XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBfcG9jXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxX3BvY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE3MVwiLCAvL1JDIDMwMjUwMTcxIDogUFMgdsO9ZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxX3BvY1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMF9yelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE3MlwiLCAvL1JDIDMwMjUwMTcyIDogw5pwcmF2YSAtIHDFmcOtam15XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBfcnpcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFfcnpcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNzNcIiwgLy9SQyAzMDI1MDE3MyA6IMOacHJhdmEgLSB2w71kYWplXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzFfcnpcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG15R3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVQcm9maWxlcyhnZjogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8gLyomIEdTZXpuYW1aYXBpc3VTdGF2dUR0byovPik6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMge1xyXG4gICAgICAgICAgICBsZXQgcHJvZmlsZXM6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7IG5hbWU6IFwianJlczozMTEwMDIzMlwiLCBjb2x1bW5zOiB7fSB9IC8vUkMgMzExMDAyMzIgOiBWw71jaG96w61cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2YuY29sdW1ucy5maWx0ZXIoKGMpID0+IHsgcmV0dXJuICFjLmhpZGRlbjsgfSlcclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChjKSA9PiB7IHByb2ZpbGVzLmRlZmF1bHQuY29sdW1ucyFbYy5uYW1lIV0gPSB7IGhpZGRlbjogZmFsc2UgfSB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9maWxlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBmaWx0cm92YWNpaG8gcGFuZWx1XHJcbiAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlRmlsdGVyUGFuZWwodGhhdDogdGhpcyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdihcImpzLWZpbHRyXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckN1c3RvbWl6ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2xTb3J0ID0gZGF0YS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLm5hbWUgPj0gYi5uYW1lOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvbFNvcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW10sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0b3JhZ2VTZXJ2aWNlOiBuZXcgR29yZGljLkdpbi5GaWx0ZXJTdG9yYWdlU2VydmljZS5TdG9yZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBbRmlsdGVyVmlld01vZGUuRGV0YWlsLyosIEZpbHRlclZpZXdNb2RlLk5vcm1hbCovXSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGVBdXRvTG9hZEFmdGVyQ3JlYXRlUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlckRlZmF1bHRGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMDEuMDMuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFocmF6ZW7DrSBvYnNvbGV0ZSBwYXJhbWV0csWvLlxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlCdXR0b25CZWhhdmlvdXI6IFwiQWx3YXlzUHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZpbHRlckJ1dHRvblZpc2libGU6IFwiQWx3YXlzVmlzaWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDaG9zZUZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJIZWxwZXJJdGVtVGVtcGxhdGU6IFwiPGI+e25hemV2fTwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHRJdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYXBwbHk6IGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9jb25zb2xlLmxvZyhcImZpbHRlckZvcm0uYXBwbHlcIiwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3RoYXQubG9nLnRyYWNlKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB2aWV3LnJlcXVlc3REYXRhKG9iai5maWx0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0OiAoZXYsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQ9dGhpcztcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJlZGl0b3ZhdEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE2M1wiLCAvL1JDIDMwMjUwMTYzIDogRWRpdG92YXRcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdFa29hdWthRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2hvd1VrYXphdGVsKHJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkLmdncmlkKFwiYWN0aXZlQ2VsbEFkZHJlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8vL3ZhciBjb2x1bW4gPSB0aGF0LiRncmlkLmdncmlkKFwiYWN0aXZlQ2VsbEFkZHJlc3NcIikuY29sO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd1VrYXphdGVsKHJvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJoaXN0b3JpZUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE2NFwiLCAvL1JDIDMwMjUwMTY0IDogSGlzdG9yaWVcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dIaXN0b3J5KHJvdyk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta3lBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNjVcIiwgLy9SQyAzMDI1MDE2NSA6IFBvem7DoW1reVxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd05vdGVzKHJvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByaW50QWN0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcImludV9wdG1fcHJpemRwaCxpbnVfcHRtX2RhbmRvbG8saW51X3B0bV9kcGhzZXN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMucGFyZW50Q250LFxyXG4gICAgICAgICAgICAgICAgLy9yZXBvcnRHZW5lcmF0b3JUeXBlOiBcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1Fa29aYXpuYW11R2VuZXJhdG9yXCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlVjci5XZWJDbGllbnQuR1VjclByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RUaXNrRGFub3ZhUHJpem5hbmlcIixcclxuICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gemppc3RlbmkgZmlsdHJ1XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlciA9IHRoYXQuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpLy90aGF0LmdldEZpbHRlcigpLmdmaWx0ZXJwYW5lbCgnZ2V0Q3VycmVudERhdGEnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXBsbmVuaSBmaWx0cnVcclxuICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBNZXNpY0RQSDogZmlsdGVyLm1lc2ljLCBVY3M6IGZpbHRlci51Y3MsIFV1czogZmlsdGVyLnV1cyB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSkgYXMgR1ByaW50QWN0aW9uVHlwZTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZhdWx0bmkgYWtjZSBuYSBncmlkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZGVmYXVsdEFjdGlvbihyb3c/OiBVY3QuSW50ZXJmYWNlLkdFa29hdWthRHRvKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IGRlZmF1bHRBY3Rpb24gR1Nlem5hbUVrb1VrYXphdGVsZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VWthemF0ZWwocm93KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIGRldGFpbHUgdWthemF0ZWxlXHJcbiAgICAgICAgICogQHBhcmFtIHJhZGVrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93VWthemF0ZWwocmFkZWs/OiBVY3QuSW50ZXJmYWNlLkdFa29hdWthRHRvKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFyYWRlaykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHZhciBzZWwgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR0Vrb2F1a2FEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgcmFkZWsgPSBzZWxbMF07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxVa2F6YXRlbCwgeyBjdXJyZW50Um93OiByYWRlaywgdHlwVWxvaHk6IHRoYXQuVHlwVWxvaHkgfSwgXCJqcmVzOjMwMjUwMTc1XCIsIDgwMCwgNjAwLCB0cnVlKSAvL1JDIDMwMjUwMTc1IDogRWRpdGFjZSBob2Rub3R5IHVrYXphdGVsZVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIHJlcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXMgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNvbnRlbnRjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY3R4LnJlZnJlc2ggIT09IFwidW5kZWZpbmVkXCIgJiYgY3R4LnJlZnJlc2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBkZXRhaWx1IHVrYXphdGVsZVxyXG4gICAgICAgICAqIEBwYXJhbSByYWRla1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2hvd0hpc3RvcnkocmFkZWs6IFVjdC5JbnRlcmZhY2UuR0Vrb2F1a2FEdG8pIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAxOTFcIik7IC8vUkMgMzAyNTAxOTEgOiBQcm9iw61ow6EgbmHEjcOtdMOhbsOtXHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmlzbC5Va2F6YXRlbC5saXN0SGlzdG9yeSh7XHJcbiAgICAgICAgICAgICAgICBpeHNFdnA6IHJhZGVrLml4c19ldnAgYXMgc3RyaW5nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuVWNyLldlYkNsaWVudC5HSGlzdG9yaWVVa2F6YXRlbGUsIHsgZGF0YTogcmVzdWx0LCBub3RlczogZmFsc2UgfSwgXCJqcmVzOjMwMjUwMTkwXCIuZm9ybWF0KHJhZGVrLm5hemV2IGFzIHN0cmluZyksIDgwMCwgNjAwLCB0cnVlKSAvL1JDIDMwMjUwMTkwIDogSGlzdG9yaWUgayB1a2F6YXRlbGkgezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0eXBlb2YgcmVzICE9PSBcInVuZGVmaW5lZFwiICYmIHJlcyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY29udGVudGNsb3NlXCIsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIGN0eC5yZWZyZXNoICE9PSBcInVuZGVmaW5lZFwiICYmIGN0eC5yZWZyZXNoID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKGpxWEhSLCB0eXBlLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5hbHdheXMoKCkgPT4geyB0aGF0LnBhcmVudENudC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIGRldGFpbHUgdWthemF0ZWxlXHJcbiAgICAgICAgICogQHBhcmFtIHJhZGVrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93Tm90ZXMocmFkZWs6IFVjdC5JbnRlcmZhY2UuR0Vrb2F1a2FEdG8pIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAxOTFcIik7IC8vUkMgMzAyNTAxOTEgOiBQcm9iw61ow6EgbmHEjcOtdMOhbsOtXHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmlzbC5Va2F6YXRlbC5saXN0UG96bmFta3koe1xyXG4gICAgICAgICAgICAgICAgaXhzRXZwOiByYWRlay5peHNfZXZwIGFzIHN0cmluZ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coR29yZGljLlVjci5XZWJDbGllbnQuR0hpc3RvcmllVWthemF0ZWxlLCB7IGRhdGE6IHJlc3VsdCwgbm90ZXM6IHRydWUsIHJvdzogcmFkZWsgfSwgXCJqcmVzOjMwMjUwMTkyXCIuZm9ybWF0KHJhZGVrLm5hemV2IGFzIHN0cmluZyksIDgwMCwgNjAwLCB0cnVlKSAvL1JDIDMwMjUwMTkyIDogUG96bsOhbWt5IGsgdWthemF0ZWxpIHswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIHJlcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXMgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNvbnRlbnRjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHR5cGVvZiBjdHgucmVmcmVzaCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjdHgucmVmcmVzaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIChqcVhIUiwgdHlwZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuYWx3YXlzKCgpID0+IHsgdGhhdC5wYXJlbnRDbnQuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG59Il19