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
            /**
             * Danove priznani
             *
             * @author tkares
             * @since 484.1.0.69
             */
            let GSeznamUkazatele = class GSeznamUkazatele extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    // grid se senamem
                    //private $grid: JQuery<HTMLElement>;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                    //private cols: Gordic.Uct.Interface.GEkocskoDto[];
                    //private condFormats: Gordic.Components.Grid.CondFormats.CondFormat[]; // podminene formatovani
                    this.loadingData = false; // atribut nacitani dat
                    this.private /*profilName*/ = "userProfile"; // jmeno profilu
                }
                // nastaveni id a titulku okna
                // title = "jres:30250085"; //RC 30250085 : Daňová evidence
                onContentReady() {
                    var that = this;
                    this.actions.add({
                        name: "editovatAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:30250163", //RC 30250163 : Editovat
                        run: function (ev, ctx) {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var row = grid.ggrid("activeRow");
                            //that.showUkazatel(row);
                            //return;
                            if (row === null)
                                return;
                            //that.$grid.ggrid("activeCellAddress");
                            ////var column = that.$grid.ggrid("activeCellAddress").col;
                            that.showUkazatel(row);
                        }
                    });
                    this.actions.add({
                        name: "historieAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:30250164", //RC 30250164 : Historie
                        run: function (ev, ctx) {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var row = grid.ggrid("activeRow");
                            if (row === null)
                                return;
                            that.showHistory(row);
                        }
                    });
                    this.actions.add({
                        name: "poznamkyAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:30250165", //RC 30250165 : Poznámky
                        run: (ev, ctx) => {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var row = grid.ggrid("activeRow");
                            if (row === null)
                                return;
                            that.showNotes(row);
                        }
                    });
                    this.actions.add(GAction.createPrintAction({
                        name: "printAct",
                        tema: "inu_ptm_prizdph,inu_ptm_dandolo,inu_ptm_dphsest",
                        enabled: false,
                        parentContent: this,
                        //reportGeneratorType: "Gordic.Ucr.WebClient.GSeznamEkoZaznamuGenerator",
                        serverParameterMethod: "Gordic.Ucr.WebClient.GUcrPrintParameters:ServerParameterMethodTiskDanovaPriznani",
                        reportStarting: function (rep) {
                            // zjisteni filtru
                            var filter = that.getFilter().gfilterpanel('getCurrentData');
                            // naplneni filtru
                            rep.customDto = { MesicDPH: filter.mesic, Ucs: filter.ucs, Uus: filter.uus };
                        }
                    }));
                    this.menuBar([
                        //{ action: that.actions.printAct, favorite: true }
                        { action: that.actions.editovatAct, favorite: true },
                        { action: that.actions.historieAct, favorite: true },
                        { action: that.actions.poznamkyAct, favorite: true }
                    ]);
                    // vytvoreni fitru panelu
                    this.createFilterPanel(this);
                    let provider = new Gordic.Data.Provider(() => {
                        that.loadingData = true;
                        return that.loadData();
                    });
                    let view = new Gordic.Data.View([], { processors: { provider: provider } });
                    var sloupce = that.createGridFormat();
                    const grid = $.newDiv(this.classGrid)
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: view,
                        columns: sloupce,
                        //defaultProfile: { columns: sloupce.columns }, 
                        selection: function (ev, info) {
                            var rows = info.getSelection();
                            //that.clearControls();
                            if (rows.length > 0) {
                                //that.previewController.enable(true);
                                //that.previewController.show({ currentRow: rows[0], viewMode: true, cols: that.cols });
                            }
                            //else
                            //    that.previewController.enable(false);
                        },
                        //defaultProfile: { name: "default", columnList: /*that.getColsByRozpad(that.getRozpad()) +*/ "radek_dph,nazev,c_akt_2,c_akt_1,c_akt_3,c_akt_4" } ,
                        //profiles: [
                        //    { name: that.profilName, columnList: /*that.getColsByRozpad(that.getRozpad()) +*/ "radek_dph,nazev,c_akt_2,c_akt_1,c_akt_3,c_akt_4" } ,                        
                        //],
                        defaultAction: new GAction({
                            name: "gridZobzaZapisyAct",
                            run: function (ev, ctx) {
                                let data;
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                if (ctx.cellInfo && ctx.cellInfo.data)
                                    data = ctx.cellInfo.data;
                                else
                                    data = grid.ggrid("getSelection")[0];
                                //zobrazeni detailu
                                //that.showZapisy(data, ctx.cellInfo.column.field)
                                ;
                            }
                        }),
                        //profileVisible: true,
                    });
                    grid.ggridserverfilter({});
                    //#region Preview v sidebaru
                    //this.element.gsidebar("option", "right", { userSettings: this.userSettings!, width: 500, visible: true, pinned: false });
                    /*
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, {
                        useSubtask: false,
                        panelOptions: {
                            caption: "jres:30250097", //RC 30250097 : Náhled detailu daňové evidence
                            side: "right"
                        },
                        tabs: [{
                            caption: "jres:30250097", //RC 30250097 : Náhled detailu daňové evidence
                            customLoad: (tab, dto) => {
                                let elm = $("<div>").gcontent(Gordic.Ucr.WebClient.GDetailDanoveEvidence, { parentContent: this }); //Nutne pro spravne spojeni s kontextem hlavniho contentu
                                //let tabSettings = dto.tabSettings;
                                //delete dto.tabSettings;
                                //debugger;
                                $.content<Gordic.Ucr.WebClient.GDetailDanoveEvidence>(elm).init(dto);
        
                                $(tab).empty().append(elm);
                            }
                        }]
                    });
                    */
                    //#endregion
                    //#region Kl. zkratky
                    this.element.gshortcut({
                        key: "INSERT",
                        description: "jres:31100226", //RC 31100226 : Načtení dat
                        group: Gordic.Shortcuts.Groups.Task,
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        action: new GAction({
                            name: "LoadDataAct",
                            run: (ev, ctx) => {
                                //this.loadData();
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                grid.ggrid("getView").requestData(undefined);
                            }
                        }),
                    });
                    //this.element.gshortcut({
                    //    key: "DELETE",
                    //    description: "jres:31100181", //RC 31100181 : Vyčistit
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: new GAction({
                    //        name: "clearFilterRowAct",
                    //        caption: "jres:31100267", //RC 31100267 : Vyčistit filtr seznamu
                    //        icon: "gi-bin",
                    //        run: (ev, ctx) => {
                    //            that.loadingData = true;
                    //            this.$filterPanel.gfilterpanel("clear");
                    //            that.loadingData = false;
                    //    }}),
                    //});
                    //this.element.gshortcut({
                    //    key: "0",
                    //    description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: new GAction({
                    //        name: "clearAndFilterAct",
                    //        run:(ev, ctx) => {
                    //            this.$filterPanel.gfilterpanel("clear");
                    //            that.$grid.ggrid("getView").requestData(undefined);
                    //    }}),
                    //});
                    grid.gshortcut({
                        key: "ctrl+shift+lclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "jres:31100229", //RC 31100229 : Přenesení hodnoty do filtru.
                        action: new GAction({
                            name: "selFilterAct",
                            run: (ev, ctx) => {
                                this.dispatchFillServerGridEvent(ev);
                            }
                        }),
                    });
                    grid.gshortcut({
                        key: "ctrl+lclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "jres:31100235", //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                        action: new GAction({
                            name: "selFilterAndSearchAct",
                            run: (ev, ctx) => {
                                this.dispatchFillServerGridEvent(ev);
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                grid.ggrid("getView").requestData(undefined);
                                //this.loadData();
                            }
                        }),
                    });
                    //}
                    //#endregion
                    // nastaveni viditelnych sloupcu
                    //this.$grid.ggrid<Gordic.Uct.Interface.GEkoSeznamDphFilterDto>("useProfile", { name: that.profilName, columnList: that.getColsByRozpad(that.getRozpad()) + "radek_dph,nazev,c_akt_2,c_akt_1,c_akt_3,c_akt_4" });
                    //// nastaveni hodnot uus, pokud je Rezim DPH = uus, pak je problem a nic se neozbrazi
                    //if (that.Globals.Params?.RezimDPH == Gordic.Uct.Interface.GUcrRezimDph.Uus)
                    //    that.findFields("uus").gfield("setValue", { uus: that.Globals.EkoParams?.UUS });
                    //this.setVisibleColumns();
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
                 * Prevedeni kliku na bunku do filtru a nacteni
                 * @param ev
                 */
                dispatchFillServerGridEvent(ev) {
                    var $col = $(ev.target);
                    if (!ev.ctrlKey || !$col.hasClass("cell") || $col.hasClass("js-cfu-cell"))
                        return;
                    let selection = document.getSelection();
                    if (ev.shiftKey && selection)
                        selection.empty(); //Pokud se vybira pres kl. zkratku ctrl+shift+lclick, tak at se neoznacuje text
                    var colIndex = $col.attr("data-column-index");
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    var colDef = grid.ggrid("trueColumns", false)[colIndex];
                    if (colDef.serverFilter) {
                        let value = $col.text();
                        if (!value)
                            return; //NOTE: Pokud neni hodnota, tak asi neni co resit. Resi hlavne bug s textovou hodnotou v ciselnych sloupcich
                        let sel = grid.ggrid("getSelection", false)[0];
                        //NOTE: Tohle je spatny zpusob, cele by to chtelo prepsat, aby se neslo po stringu z bunky, ale po datech. 
                        //      Poptat se Skalice, jestli exituje nejaky lepsi zpusob...
                        if (colDef.columnType === "datetime")
                            value = sel[colDef.name];
                        else if (colDef.columnType === "currency")
                            value = sel[colDef.name];
                        var $filterFrmBox = grid.ggridserverfilter("findFields", colDef.name);
                        $filterFrmBox.gfield("setValue", value, { valid: false });
                    }
                }
                /**
                 * Zobrazeni detailu ukazatele
                 * @param radek
                 */
                showUkazatel(radek) {
                    var that = this;
                    that.dialogs.showModalWindow(Gordic.Ucr.WebClient.GDetailUkazatel, { currentRow: radek, typUlohy: that.TypUlohy }, "jres:30250175", 800, 600, true) //RC 30250175 : Editace hodnoty ukazatele
                        .on("close", function (res) {
                        //if (typeof res !== "undefined" && res === true) {
                        //    that.$grid.ggrid("getView").requestData(undefined);                        
                        //}
                    })
                        .on("contentclose", function (ev, ctx) {
                        debugger;
                        if (typeof ctx.refresh !== "undefined" && ctx.refresh === true) {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggrid("getView").requestData(undefined);
                        }
                    });
                }
                /**
                 * Zobrazeni detailu ukazatele
                 * @param radek
                 */
                showHistory(radek) {
                    var that = this;
                    that.beginOperation("jres:30250191"); //RC 30250191 : Probíhá načítání
                    that.isl.Ukazatel.listHistory({
                        ixsEvp: radek.ixs_evp
                    })
                        .getData()
                        .then((result) => {
                        that.dialogs.showModalWindow(Gordic.Ucr.WebClient.GHistorieUkazatele, { data: result, notes: false }, "jres:30250190".format(radek.nazev), 800, 600, true) //RC 30250190 : Historie k ukazateli {0}
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
                        that.endOperation();
                    }).always(() => { that.endOperation(); });
                }
                /**
                 * Zobrazeni detailu ukazatele
                 * @param radek
                 */
                showNotes(radek) {
                    var that = this;
                    that.beginOperation("jres:30250191"); //RC 30250191 : Probíhá načítání
                    that.isl.Ukazatel.listPoznamky({
                        ixsEvp: radek.ixs_evp
                    })
                        .getData()
                        .then((result) => {
                        that.dialogs.showModalWindow(Gordic.Ucr.WebClient.GHistorieUkazatele, { data: result, notes: true, row: radek }, "jres:30250192".format(radek.nazev), 800, 600, true) //RC 30250192 : Poznámky k ukazateli {0}
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
                        that.endOperation();
                    }).always(() => { that.endOperation(); });
                }
                /**
                 * Uprava viditelnosti akci
                 *
                 * */
                setActions(pocetRadku) {
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    // pokud neni grid, nic nedelej
                    if (this.closed)
                        return;
                    var dataFound = pocetRadku > 0;
                    var tooltip = dataFound ? "" : "jres:30250174"; //RC 30250174 : Záznamy nenalezeny
                    this.actions.poznamkyAct.update({ enabled: dataFound, tooltip: tooltip });
                    this.actions.historieAct.update({ enabled: dataFound, tooltip: tooltip });
                    this.actions.printAct.update({ enabled: dataFound, tooltip: tooltip });
                    if (dataFound)
                        this.actions.editovatAct.updatePermission(this.editovatPermit);
                    else
                        this.actions.editovatAct.update({ enabled: dataFound, tooltip: tooltip });
                    //this.actions.editovatAct!.update({ enabled: true});
                }
                /**
                 * Vytvoreni filtrovaciho panelu
                 * @param that
                 */
                createFilterPanel(that) {
                    this.$filterPanel = $.newDiv("js-filtr")
                        .appendTo(this.element)
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
                        apply: function (event, obj) {
                            console.log("filterForm.apply", obj);
                            that.log.trace("filterForm.apply", obj);
                            if (that.loadingData)
                                return;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var view = grid.ggrid("getView");
                            view.requestData(obj.filter);
                        },
                        reset: (ev, data) => {
                            that.loadingData = true;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggridserverfilter("clear");
                            //this.$filterPanel.gfilterpanel("clear");
                            that.loadingData = false;
                        }
                    });
                }
                /**
                 * Vraci objekt filtru
                 * @param {GContent} content
                 * @returns
                 */
                getFilter() {
                    //debugger;
                    if (Gordic.Utils.WidgetExists("gfilterpanel", this.$filterPanel))
                        return this.$filterPanel;
                    else
                        throw "Nenalezen filtr";
                    //return content?.element.find(".js-filtr.gfilterpanel");
                    //return $(".js-filtr");
                }
                /**
                 *  Nacteni dat
                 */
                loadData() {
                    var that = this;
                    var def = $.Deferred();
                    //            var view = new Gordic.Isl.View(Gordic.Isl.UcrPozadavek.list({ filters: { ixs_ses: typMsk } }));
                    var maska = {};
                    //var filterDto: Gordic.Uct.Interface.GEkoSeznamDphFilterDto = {};
                    //if (!filter) {
                    //var _filter = that.GetFilter();
                    //var filter = _filter.gfilterpanel('getCurrentData');
                    //}
                    //maska.ico = { start: filter.ico, end: filter.ico };
                    //maska.ucs = { start: filter.ucs, end: filter.ucs };
                    //maska.uus = { start: filter.uus, end: filter.uus };
                    //console.log("loaddata.filter", filter);
                    let grid = that.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    grid.ggridserverfilter("collect", maska)
                        .then((filterServer) => {
                        maska = filterServer;
                        maska.vl = that.TypUlohy == 14 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.StrednedobyVyhled */;
                        //let filtr: Gordic.Uct.Interface.GUctUkazatelListRequestDto = {
                        //    Maska: maska, Limit: 0
                        //}           
                        debugger;
                        let myfiltr = filterServer;
                        that.isl.Ukazatel.list({ filters: myfiltr })
                            .get()
                            .then(function (result) {
                            debugger;
                            //at.setActions(result.ListValues?.length as any);
                            that.loadingData = false;
                            that.setActions(result.data.length);
                            return def.resolve(result);
                        })
                            .always(function () { that.loadingData = false; });
                        return def.promise();
                    });
                    return def.promise();
                }
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 * @param colDefinition
                 */
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
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "nazev" }),
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
            };
            GSeznamUkazatele = __decorate([
                Decorators.gcontent
            ], GSeznamUkazatele);
            WebClient.GSeznamUkazatele = GSeznamUkazatele;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVVrYXphdGVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1Va2F6YXRlbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXV5QmY7QUF2eUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXV5Qm5CO0lBdnlCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBdXlCN0I7UUF2eUJvQixXQUFBLFNBQVM7WUFDMUI7Ozs7O2VBS0c7WUFFSCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFBbEQ7O29CQVVJLGtCQUFrQjtvQkFDbEIscUNBQXFDO29CQUNyQzs7dUJBRUc7b0JBQ08sY0FBUyxHQUFXLGNBQWMsQ0FBQztvQkFjN0MsbURBQW1EO29CQUNuRCxnR0FBZ0c7b0JBQ3hGLGdCQUFXLEdBQVksS0FBSyxDQUFDLENBQUMsdUJBQXVCO29CQUM3RCxZQUFPLENBQUMsY0FBYyxHQUFXLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQjtnQkE4dkJwRSxDQUFDO2dCQTd2QkcsOEJBQThCO2dCQUMvQiwyREFBMkQ7Z0JBQzFELGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDYixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSx3QkFBd0I7d0JBQ2xELEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7Z0NBQUUsT0FBTzs0QkFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs0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QjVCLENBQUE7UUFDTCxDQUFDLEVBdnlCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBdXlCN0I7SUFBRCxDQUFDLEVBdnlCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdXlCbkI7QUFBRCxDQUFDLEVBdnlCUyxNQUFNLEtBQU4sTUFBTSxRQXV5QmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEYW5vdmUgcHJpem5hbmlcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0a2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODQuMS4wLjY5XHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVVrYXphdGVsZSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZWtvUGFyYW1zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWtvUGFyYW1zRHRvO1xyXG4gICAgICAgIC8vIHNlem5hbSBtZXNpY3UsIHByZXMga3RlcmUgbHplIHZ5YnJhdFxyXG4gICAgICAgIHByaXZhdGUgbGlzdE1vbnRoOiBudW1iZXJbXTtcclxuICAgICAgICAvLyBwb3NsYW55IHRleHQgcmV6aW11IGRwaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgcHJpdmF0ZSByZXppbURQSHR4dDogc3RyaW5nO1xyXG4gICAgICAgIGZpbHRlck9wdGlvbnM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HRmlsdGVyT3B0aW9uc0R0bztcclxuICAgICAgICAvLyBmaWx0cm92YWNpIHBhbmVsXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICAvLyBncmlkIHNlIHNlbmFtZW1cclxuICAgICAgICAvL3ByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdHJpZGEgZ3JpZHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2xhc3NHcmlkOiBzdHJpbmcgPSBcImpzLWdyaWQtYmFzZVwiO1xyXG4gICAgICAgIC8vIHR5cCB1bG9oeVxyXG4gICAgICAgIHByaXZhdGUgVHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGU7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQb3ZvbGVuaSBlZGl0YWNlXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgZWRpdG92YXRQZXJtaXQ6IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdQZXJtaXNzaW9uO1xyXG4gICAgICAgIEF2b2lkVXVzOiBib29sZWFuO1xyXG4gICAgICAgIEF2b2lkTmtzOiBib29sZWFuO1xyXG4gICAgICAgIEF2b2lkRXh0OiBib29sZWFuO1xyXG4gICAgICAgIC8vIGtvbnRyb2xlciBwcm8gcHJldmllIG9rbm9cclxuICAgICAgICAvL3ByaXZhdGUgcHJldmlld0NvbnRyb2xsZXI6IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXI7XHJcbiAgICAgICAgLy8gTmFzdGF2ZW5pXHJcbiAgICAgICAgcHJpdmF0ZSBHbG9iYWxzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyR2xvYmFsRHRvOyBcclxuICAgICAgICAvL3ByaXZhdGUgY29sczogR29yZGljLlVjdC5JbnRlcmZhY2UuR0Vrb2Nza29EdG9bXTtcclxuICAgICAgICAvL3ByaXZhdGUgY29uZEZvcm1hdHM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdOyAvLyBwb2RtaW5lbmUgZm9ybWF0b3ZhbmlcclxuICAgICAgICBwcml2YXRlIGxvYWRpbmdEYXRhOiBib29sZWFuID0gZmFsc2U7IC8vIGF0cmlidXQgbmFjaXRhbmkgZGF0XHJcbiAgICAgICAgcHJpdmF0ZSAvKnByb2ZpbE5hbWUqLzogc3RyaW5nID0gXCJ1c2VyUHJvZmlsZVwiOyAvLyBqbWVubyBwcm9maWx1XHJcbiAgICAgICAgLy8gbmFzdGF2ZW5pIGlkIGEgdGl0dWxrdSBva25hXHJcbiAgICAgICAvLyB0aXRsZSA9IFwianJlczozMDI1MDA4NVwiOyAvL1JDIDMwMjUwMDg1IDogRGHFiG92w6EgZXZpZGVuY2VcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImVkaXRvdmF0QWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTYzXCIsIC8vUkMgMzAyNTAxNjMgOiBFZGl0b3ZhdFxyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93VWthemF0ZWwocm93KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGdyaWQuZ2dyaWQoXCJhY3RpdmVDZWxsQWRkcmVzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLy8vdmFyIGNvbHVtbiA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJhY3RpdmVDZWxsQWRkcmVzc1wiKS5jb2w7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93VWthemF0ZWwocm93KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaGlzdG9yaWVBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNjRcIiwgLy9SQyAzMDI1MDE2NCA6IEhpc3RvcmllXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47ICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93SGlzdG9yeShyb3cpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta3lBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNjVcIiwgLy9SQyAzMDI1MDE2NSA6IFBvem7DoW1reVxyXG4gICAgICAgICAgICAgICAgcnVuOiAgKGV2LCBjdHgpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd05vdGVzKHJvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZChHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbnRBY3RcIixcclxuICAgICAgICAgICAgICAgIHRlbWE6IFwiaW51X3B0bV9wcml6ZHBoLGludV9wdG1fZGFuZG9sbyxpbnVfcHRtX2RwaHNlc3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgLy9yZXBvcnRHZW5lcmF0b3JUeXBlOiBcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1Fa29aYXpuYW11R2VuZXJhdG9yXCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlVjci5XZWJDbGllbnQuR1VjclByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RUaXNrRGFub3ZhUHJpem5hbmlcIixcclxuICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyB6amlzdGVuaSBmaWx0cnVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyID0gdGhhdC5nZXRGaWx0ZXIoKS5nZmlsdGVycGFuZWwoJ2dldEN1cnJlbnREYXRhJyk7ICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXBsbmVuaSBmaWx0cnVcclxuICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBNZXNpY0RQSDogZmlsdGVyLm1lc2ljLCBVY3M6IGZpbHRlci51Y3MsIFV1czogZmlsdGVyLnV1c307XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KSkgYXMgR1ByaW50QWN0aW9uVHlwZTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGF0LmFjdGlvbnMucHJpbnRBY3QsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuZWRpdG92YXRBY3QsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICwgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5oaXN0b3JpZUFjdCwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICAgICAgLCB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLnBvem5hbWt5QWN0LCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b3JlbmkgZml0cnUgcGFuZWx1XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyUGFuZWwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXIgPSBuZXcgR29yZGljLkRhdGEuUHJvdmlkZXI8YW55LCBhbnksIGFueT4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcgPCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvU2V6bmFtRHBoRHRvPiAoW10sIHsgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIgfSB9KTtcclxuICAgICAgICAgICAgdmFyIHNsb3VwY2UgPSB0aGF0LmNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9ICQubmV3RGl2KHRoaXMuY2xhc3NHcmlkKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogc2xvdXBjZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRQcm9maWxlOiB7IGNvbHVtbnM6IHNsb3VwY2UuY29sdW1ucyB9LCBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IGluZm8uZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5jbGVhckNvbnRyb2xzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3coeyBjdXJyZW50Um93OiByb3dzWzBdLCB2aWV3TW9kZTogdHJ1ZSwgY29sczogdGhhdC5jb2xzIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRQcm9maWxlOiB7IG5hbWU6IFwiZGVmYXVsdFwiLCBjb2x1bW5MaXN0OiAvKnRoYXQuZ2V0Q29sc0J5Um96cGFkKHRoYXQuZ2V0Um96cGFkKCkpICsqLyBcInJhZGVrX2RwaCxuYXpldixjX2FrdF8yLGNfYWt0XzEsY19ha3RfMyxjX2FrdF80XCIgfSAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wcm9maWxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHsgbmFtZTogdGhhdC5wcm9maWxOYW1lLCBjb2x1bW5MaXN0OiAvKnRoYXQuZ2V0Q29sc0J5Um96cGFkKHRoYXQuZ2V0Um96cGFkKCkpICsqLyBcInJhZGVrX2RwaCxuYXpldixjX2FrdF8yLGNfYWt0XzEsY19ha3RfMyxjX2FrdF80XCIgfSAsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9dLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkWm9iemFaYXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE6IGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICYmIGN0eC5jZWxsSW5mby5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy96b2JyYXplbmkgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3daYXBpc3koZGF0YSwgY3R4LmNlbGxJbmZvLmNvbHVtbi5maWVsZClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3Byb2ZpbGVWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoe30pO1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gUHJldmlldyB2IHNpZGViYXJ1XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuZWxlbWVudC5nc2lkZWJhcihcIm9wdGlvblwiLCBcInJpZ2h0XCIsIHsgdXNlclNldHRpbmdzOiB0aGlzLnVzZXJTZXR0aW5ncyEsIHdpZHRoOiA1MDAsIHZpc2libGU6IHRydWUsIHBpbm5lZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIgPSBuZXcgR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcih0aGlzLmVsZW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIHVzZVN1YnRhc2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcGFuZWxPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDk3XCIsIC8vUkMgMzAyNTAwOTcgOiBOw6FobGVkIGRldGFpbHUgZGHFiG92w6kgZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgICAgICBzaWRlOiBcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA5N1wiLCAvL1JDIDMwMjUwMDk3IDogTsOhaGxlZCBkZXRhaWx1IGRhxYhvdsOpIGV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogKHRhYiwgZHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbG0gPSAkKFwiPGRpdj5cIikuZ2NvbnRlbnQoR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbERhbm92ZUV2aWRlbmNlLCB7IHBhcmVudENvbnRlbnQ6IHRoaXMgfSk7IC8vTnV0bmUgcHJvIHNwcmF2bmUgc3BvamVuaSBzIGtvbnRleHRlbSBobGF2bmlobyBjb250ZW50dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB0YWJTZXR0aW5ncyA9IGR0by50YWJTZXR0aW5ncztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgZHRvLnRhYlNldHRpbmdzOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQ8R29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbERhbm92ZUV2aWRlbmNlPihlbG0pLmluaXQoZHRvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGFiKS5lbXB0eSgpLmFwcGVuZChlbG0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gS2wuIHprcmF0a3lcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIklOU0VSVFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyNlwiLCAvL1JDIDMxMTAwMjI2IDogTmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkxvYWREYXRhQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgIGtleTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDE4MVwiLCAvL1JDIDMxMTAwMTgxIDogVnnEjWlzdGl0XHJcbiAgICAgICAgICAgIC8vICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgLy8gICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJjbGVhckZpbHRlclJvd0FjdFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY3XCIsIC8vUkMgMzExMDAyNjcgOiBWecSNaXN0aXQgZmlsdHIgc2V6bmFtdVxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWNvbjogXCJnaS1iaW5cIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIH19KSxcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAvLyAgICBrZXk6IFwiMFwiLFxyXG4gICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIsIC8vUkMgMzExMDAyMjggOiBWecSNaXN0aXQgYSBuYcSNw61zdFxyXG4gICAgICAgICAgICAvLyAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgIC8vICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAvLyAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwiY2xlYXJBbmRGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHJ1bjooZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgIH19KSxcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJjdHJsK3NoaWZ0K2xjbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI5XCIsIC8vUkMgMzExMDAyMjkgOiBQxZllbmVzZW7DrSBob2Rub3R5IGRvIGZpbHRydS5cclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gfSksXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJjdHJsK2xjbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjM1XCIsIC8vUkMgMzExMDAyMzUgOiBQxZllbmVzZW7DrSBob2Rub3R5IGRvIGZpbHRydSBhIHZ5aGxlZMOhbsOtLlxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWxGaWx0ZXJBbmRTZWFyY2hBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hGaWxsU2VydmVyR3JpZEV2ZW50KGV2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIHZpZGl0ZWxueWNoIHNsb3VwY3VcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy4kZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvU2V6bmFtRHBoRmlsdGVyRHRvPihcInVzZVByb2ZpbGVcIiwgeyBuYW1lOiB0aGF0LnByb2ZpbE5hbWUsIGNvbHVtbkxpc3Q6IHRoYXQuZ2V0Q29sc0J5Um96cGFkKHRoYXQuZ2V0Um96cGFkKCkpICsgXCJyYWRla19kcGgsbmF6ZXYsY19ha3RfMixjX2FrdF8xLGNfYWt0XzMsY19ha3RfNFwiIH0pO1xyXG4gICAgICAgICAgICAvLy8vIG5hc3RhdmVuaSBob2Rub3QgdXVzLCBwb2t1ZCBqZSBSZXppbSBEUEggPSB1dXMsIHBhayBqZSBwcm9ibGVtIGEgbmljIHNlIG5lb3picmF6aVxyXG4gICAgICAgICAgICAvL2lmICh0aGF0Lkdsb2JhbHMuUGFyYW1zPy5SZXppbURQSCA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1EcGguVXVzKVxyXG4gICAgICAgICAgICAvLyAgICB0aGF0LmZpbmRGaWVsZHMoXCJ1dXNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyB1dXM6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlVVUyB9KTtcclxuICAgICAgICAgICAgLy90aGlzLnNldFZpc2libGVDb2x1bW5zKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlwiICsgdGhpcy5jbGFzc0dyaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcmV2ZWRlbmkga2xpa3UgbmEgYnVua3UgZG8gZmlsdHJ1IGEgbmFjdGVuaVxyXG4gICAgICAgICAqIEBwYXJhbSBldlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZGlzcGF0Y2hGaWxsU2VydmVyR3JpZEV2ZW50KGV2OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgJGNvbCA9ICQoZXYudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZXYuY3RybEtleSB8fCAhJGNvbC5oYXNDbGFzcyhcImNlbGxcIikgfHwgJGNvbC5oYXNDbGFzcyhcImpzLWNmdS1jZWxsXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAoZXYuc2hpZnRLZXkgJiYgc2VsZWN0aW9uKSBzZWxlY3Rpb24uZW1wdHkoKTsgLy9Qb2t1ZCBzZSB2eWJpcmEgcHJlcyBrbC4gemtyYXRrdSBjdHJsK3NoaWZ0K2xjbGljaywgdGFrIGF0IHNlIG5lb3puYWN1amUgdGV4dFxyXG5cclxuICAgICAgICAgICAgdmFyIGNvbEluZGV4ID0gJGNvbC5hdHRyKFwiZGF0YS1jb2x1bW4taW5kZXhcIikhO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBjb2xEZWYgPSBncmlkLmdncmlkKFwidHJ1ZUNvbHVtbnNcIiwgZmFsc2UpW2NvbEluZGV4XSBhcyBHR3JpZENvbHVtbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xEZWYuc2VydmVyRmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IGFueSA9ICRjb2wudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybjsgLy9OT1RFOiBQb2t1ZCBuZW5pIGhvZG5vdGEsIHRhayBhc2kgbmVuaSBjbyByZXNpdC4gUmVzaSBobGF2bmUgYnVnIHMgdGV4dG92b3UgaG9kbm90b3UgdiBjaXNlbG55Y2ggc2xvdXBjaWNoXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNlbCA9IGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vTk9URTogVG9obGUgamUgc3BhdG55IHpwdXNvYiwgY2VsZSBieSB0byBjaHRlbG8gcHJlcHNhdCwgYWJ5IHNlIG5lc2xvIHBvIHN0cmluZ3UgeiBidW5reSwgYWxlIHBvIGRhdGVjaC4gXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgIFBvcHRhdCBzZSBTa2FsaWNlLCBqZXN0bGkgZXhpdHVqZSBuZWpha3kgbGVwc2kgenB1c29iLi4uXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChjb2xEZWYuY29sdW1uVHlwZSA9PT0gXCJkYXRldGltZVwiKSB2YWx1ZSA9IHNlbFtjb2xEZWYubmFtZSFdO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sRGVmLmNvbHVtblR5cGUgPT09IFwiY3VycmVuY3lcIikgdmFsdWUgPSBzZWxbY29sRGVmLm5hbWUhXTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICRmaWx0ZXJGcm1Cb3ggPSBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiZmluZEZpZWxkc1wiLCBjb2xEZWYubmFtZSEpO1xyXG4gICAgICAgICAgICAgICAgJGZpbHRlckZybUJveC5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2YWx1ZSwgeyB2YWxpZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBkZXRhaWx1IHVrYXphdGVsZVxyXG4gICAgICAgICAqIEBwYXJhbSByYWRla1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2hvd1VrYXphdGVsKHJhZGVrOiBVY3QuSW50ZXJmYWNlLkdFa29hdWthRHRvKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsVWthemF0ZWwsIHsgY3VycmVudFJvdzogcmFkZWssIHR5cFVsb2h5OiB0aGF0LlR5cFVsb2h5IH0sIFwianJlczozMDI1MDE3NVwiLCA4MDAsIDYwMCwgdHJ1ZSkgLy9SQyAzMDI1MDE3NSA6IEVkaXRhY2UgaG9kbm90eSB1a2F6YXRlbGVcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHR5cGVvZiByZXMgIT09IFwidW5kZWZpbmVkXCIgJiYgcmVzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEodW5kZWZpbmVkKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjb250ZW50Y2xvc2VcIiwgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN0eC5yZWZyZXNoICE9PSBcInVuZGVmaW5lZFwiICYmIGN0eC5yZWZyZXNoID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBkZXRhaWx1IHVrYXphdGVsZVxyXG4gICAgICAgICAqIEBwYXJhbSByYWRla1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2hvd0hpc3RvcnkocmFkZWs6IFVjdC5JbnRlcmZhY2UuR0Vrb2F1a2FEdG8pIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDE5MVwiKTsgLy9SQyAzMDI1MDE5MSA6IFByb2LDrWjDoSBuYcSNw610w6Fuw61cclxuICAgICAgICAgICAgdGhhdC5pc2wuVWthemF0ZWwubGlzdEhpc3Rvcnkoe1xyXG4gICAgICAgICAgICAgICAgaXhzRXZwOiByYWRlay5peHNfZXZwIGFzIHN0cmluZ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuVWNyLldlYkNsaWVudC5HSGlzdG9yaWVVa2F6YXRlbGUsIHsgZGF0YTogcmVzdWx0LG5vdGVzOmZhbHNlIH0sIFwianJlczozMDI1MDE5MFwiLmZvcm1hdChyYWRlay5uYXpldiBhcyBzdHJpbmcpLCA4MDAsIDYwMCwgdHJ1ZSkgLy9SQyAzMDI1MDE5MCA6IEhpc3RvcmllIGsgdWthemF0ZWxpIHswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIHJlcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiByZXMgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNvbnRlbnRjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHR5cGVvZiBjdHgucmVmcmVzaCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjdHgucmVmcmVzaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIChqcVhIUiwgdHlwZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgZGV0YWlsdSB1a2F6YXRlbGVcclxuICAgICAgICAgKiBAcGFyYW0gcmFkZWtcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNob3dOb3RlcyhyYWRlazogVWN0LkludGVyZmFjZS5HRWtvYXVrYUR0bykge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMTkxXCIpOyAvL1JDIDMwMjUwMTkxIDogUHJvYsOtaMOhIG5hxI3DrXTDoW7DrVxyXG4gICAgICAgICAgICB0aGF0LmlzbC5Va2F6YXRlbC5saXN0UG96bmFta3koe1xyXG4gICAgICAgICAgICAgICAgaXhzRXZwOiByYWRlay5peHNfZXZwIGFzIHN0cmluZ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuVWNyLldlYkNsaWVudC5HSGlzdG9yaWVVa2F6YXRlbGUsIHsgZGF0YTogcmVzdWx0LCBub3RlczogdHJ1ZSxyb3c6IHJhZGVrIH0sIFwianJlczozMDI1MDE5MlwiLmZvcm1hdChyYWRlay5uYXpldiBhcyBzdHJpbmcpLCA4MDAsIDYwMCwgdHJ1ZSkgLy9SQyAzMDI1MDE5MiA6IFBvem7DoW1reSBrIHVrYXphdGVsaSB7MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHR5cGVvZiByZXMgIT09IFwidW5kZWZpbmVkXCIgJiYgcmVzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEodW5kZWZpbmVkKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjb250ZW50Y2xvc2VcIiwgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0eXBlb2YgY3R4LnJlZnJlc2ggIT09IFwidW5kZWZpbmVkXCIgJiYgY3R4LnJlZnJlc2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAoanFYSFIsIHR5cGUsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwcmF2YSB2aWRpdGVsbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRBY3Rpb25zKHBvY2V0UmFka3U6IG51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgZ3JpZCwgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkICkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgZGF0YUZvdW5kID0gcG9jZXRSYWRrdSA+IDA7XHJcbiAgICAgICAgICAgIHZhciB0b29sdGlwID0gZGF0YUZvdW5kID8gXCJcIiA6IFwianJlczozMDI1MDE3NFwiOyAvL1JDIDMwMjUwMTc0IDogWsOhem5hbXkgbmVuYWxlemVueVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMucG96bmFta3lBY3QhLnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuaGlzdG9yaWVBY3QhLnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnByaW50QWN0IS51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhRm91bmQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuZWRpdG92YXRBY3QhLnVwZGF0ZVBlcm1pc3Npb24odGhpcy5lZGl0b3ZhdFBlcm1pdCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5lZGl0b3ZhdEFjdCEudXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kLCB0b29sdGlwOiB0b29sdGlwIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuZWRpdG92YXRBY3QhLnVwZGF0ZSh7IGVuYWJsZWQ6IHRydWV9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZmlsdHJvdmFjaWhvIHBhbmVsdVxyXG4gICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJQYW5lbCh0aGF0OiB0aGlzKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQubmV3RGl2KFwianMtZmlsdHJcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDdXN0b21pemVyOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9sU29ydCA9IGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5uYW1lID49IGIubmFtZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb2xTb3J0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtdLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLkRldGFpbC8qLCBGaWx0ZXJWaWV3TW9kZS5Ob3JtYWwqL10sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlQXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3VzZXJEZWZhdWx0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDAxLjAzLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5haHJhemVuw60gb2Jzb2xldGUgcGFyYW1ldHLFry5cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2ltcGxlTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5QnV0dG9uQmVoYXZpb3VyOiBcIkFsd2F5c1ByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJGaWx0ZXJCdXR0b25WaXNpYmxlOiBcIkFsd2F5c1Zpc2libGVcIixcclxuICAgICAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVySGVscGVySXRlbVRlbXBsYXRlOiBcIjxiPntuYXpldn08L2I+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZXh0SXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICBhcHBseTogZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9nLnRyYWNlKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5sb2FkaW5nRGF0YSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEob2JqLmZpbHRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByZXNldDogKGV2LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZmlsdHJ1XHJcbiAgICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXIoKTogYW55IHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZmlsdGVycGFuZWxcIiwgdGhpcy4kZmlsdGVyUGFuZWwpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGZpbHRlclBhbmVsO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBcIk5lbmFsZXplbiBmaWx0clwiO1xyXG4gICAgICAgICAgICAvL3JldHVybiBjb250ZW50Py5lbGVtZW50LmZpbmQoXCIuanMtZmlsdHIuZ2ZpbHRlcnBhbmVsXCIpO1xyXG4gICAgICAgICAgICAvL3JldHVybiAkKFwiLmpzLWZpbHRyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgTmFjdGVuaSBkYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWREYXRhKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXcoR29yZGljLklzbC5VY3JQb3phZGF2ZWsubGlzdCh7IGZpbHRlcnM6IHsgaXhzX3NlczogdHlwTXNrIH0gfSkpO1xyXG4gICAgICAgICAgICB2YXIgbWFza2E6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JVa2F6YXRlbEZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAvL3ZhciBmaWx0ZXJEdG86IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29TZXpuYW1EcGhGaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgLy9pZiAoIWZpbHRlcikge1xyXG4gICAgICAgICAgICAvL3ZhciBfZmlsdGVyID0gdGhhdC5HZXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgLy92YXIgZmlsdGVyID0gX2ZpbHRlci5nZmlsdGVycGFuZWwoJ2dldEN1cnJlbnREYXRhJyk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL21hc2thLmljbyA9IHsgc3RhcnQ6IGZpbHRlci5pY28sIGVuZDogZmlsdGVyLmljbyB9O1xyXG4gICAgICAgICAgICAvL21hc2thLnVjcyA9IHsgc3RhcnQ6IGZpbHRlci51Y3MsIGVuZDogZmlsdGVyLnVjcyB9O1xyXG4gICAgICAgICAgICAvL21hc2thLnV1cyA9IHsgc3RhcnQ6IGZpbHRlci51dXMsIGVuZDogZmlsdGVyLnV1cyB9O1xyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImxvYWRkYXRhLmZpbHRlclwiLCBmaWx0ZXIpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcjxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVWthemF0ZWxGaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBtYXNrYSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChmaWx0ZXJTZXJ2ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrYSA9IGZpbHRlclNlcnZlcjtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrYS52bCA9IHRoYXQuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TdHJlZG5lZG9ieVZ5aGxlZDtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBmaWx0cjogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFVrYXphdGVsTGlzdFJlcXVlc3REdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgTWFza2E6IG1hc2thLCBMaW1pdDogMFxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG15ZmlsdHI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JVa2F6YXRlbEZpbHRlckR0byA9IGZpbHRlclNlcnZlciBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVWthemF0ZWwubGlzdCh7IGZpbHRlcnM6IG15ZmlsdHIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hdC5zZXRBY3Rpb25zKHJlc3VsdC5MaXN0VmFsdWVzPy5sZW5ndGggYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0QWN0aW9ucyhyZXN1bHQuZGF0YS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHsgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGdyaWRmb3JtYXR1IGRsZSBwcmVkbG9oeVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBjb2xEZWZpbml0aW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICB2YXIgbXlHcmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkdsb2JhbHMuUGFyYW1zIS5SZXppbVByb3ZvenUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5OS1M6IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlVDUzpcclxuICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py4gdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LklDTzpcclxuICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5pY28sIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3Mub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5jYXB0aW9uLCBuYW1lOiBcInVjc1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidWNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkVXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5pY28sIHVjczogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy51Y3MsIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuY2FwdGlvbiwgbmFtZTogXCJ1dXNcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1dXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkTmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246IHRoaXMudGV4dHkuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlNPUjpcclxuICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246IHRoaXMudGV4dHkuSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJpY29cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogdGhpcy5HbG9iYWxzLlBhcmFtcyEuRXh0ZXJuaVN1bWFyaXphY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gR29yZGljLkVrby5GaWx0ZXJzLnJhckludGVydmFsKHsgbW9kZWw6IFwiaWNvXCIsIG9ubHlBY3RpdmU6IGZhbHNlLCBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uSWNvIGFzIGFueSwgZGlzYWJsZWQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IEdvcmRpYy5Fa28uRmlsdGVycy5pY29JbnRlcnZhbCh7IG1vZGVsOiBcImljb1wiLCBvbmx5QWN0aXZlOiBmYWxzZSwgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LkljbyBhcyBhbnksIGRpc2FibGVkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5Bdm9pZEV4dCB8fCB0aGlzLkdsb2JhbHMuUGFyYW1zIS5UeXBTdW1hcml6YWNlICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU3VtYXJpemFjZS5FeHRlcm5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5UZXh0eT8uVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudWNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5pY28sIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuY2FwdGlvbiwgbmFtZTogXCJ1Y3NcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1Y3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZFV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5UZXh0eT8uVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmljbywgdWNzOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLnVjcywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuY2FwdGlvbiwgbmFtZTogXCJ1dXNcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWROa3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLkdsb2JhbHMuVGV4dHk/Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuR2xvYmFscy5QYXJhbXM/LkRwaF9SZXppbSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1EcGguSWNvKSB7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG9ubHlBY3RpdmU6IGZhbHNlLCBkaWFsb2dPcHRpb25zOiB1bmRlZmluZWQsIGRpc2FibGVkOiBmYWxzZSwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBuYW1lOiBcInV1c1wiLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcInVjc1wiLCBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzIGFzIGFueSwgbWF4TGVuZ3RoOiAxMCwgYWt0UHJvaGw6IDEwMCwgaWNvOiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gYXMgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCwgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG9ubHlBY3RpdmU6IGZhbHNlLCBkaWFsb2dPcHRpb25zOiB1bmRlZmluZWQsIGRpc2FibGVkOiBmYWxzZSwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBuYW1lOiBcInV1c1wiLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcInV1c1wiLCBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzIGFzIGFueSwgbWF4TGVuZ3RoOiAxMCwgYWt0UHJvaGw6IDEwMCwgaWNvOiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gYXMgYW55LCB1Y3M6IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LlVDUyBhcyBhbnlcclxuICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLkdsb2JhbHMuUGFyYW1zPy5EcGhfUmV6aW0gPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltRHBoLlVjcykge1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBvbmx5QWN0aXZlOiBmYWxzZSwgZGlhbG9nT3B0aW9uczogdW5kZWZpbmVkLCBkaXNhYmxlZDogZmFsc2UsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgbmFtZTogXCJ1dXNcIiwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBtb2RlbDogXCJ1dXNcIiwgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlV1cyBhcyBhbnksIG1heExlbmd0aDogMTAsIGFrdFByb2hsOiAxMDAsIGljbzogdGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPIGFzIGFueSwgdWNzOiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5VQ1MgYXMgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNjZcIiwgLy9SQyAzMDI1MDE2NiA6IFVrYXphdGVsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcIm5hemV2XCIgfSksXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlN0cmVkbmVkb2J5VnlobGVkKVxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNjdcIiwgLy9SQyAzMDI1MDE2NyA6IFJva1xyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbW9kZWw6IFwicm9rXCIgfSksXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTY4XCIsIC8vUkMgMzAyNTAxNjggOiBBUyBwxZnDrWpteVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBcIiB9KSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTY5XCIsIC8vUkMgMzAyNTAxNjkgOiBBUyB2w71kYWplXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQWt0dWFsbmlPYmRvYmkpIHtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMF9wb2NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNzBcIiwgLy9SQyAzMDI1MDE3MCA6IFBTIHDFmcOtam15XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBfcG9jXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxX3BvY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE3MVwiLCAvL1JDIDMwMjUwMTcxIDogUFMgdsO9ZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxX3BvY1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMF9yelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE3MlwiLCAvL1JDIDMwMjUwMTcyIDogw5pwcmF2YSAtIHDFmcOtam15XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBfcnpcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFfcnpcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNzNcIiwgLy9SQyAzMDI1MDE3MyA6IMOacHJhdmEgLSB2w71kYWplXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzFfcnpcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbXlHcmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==