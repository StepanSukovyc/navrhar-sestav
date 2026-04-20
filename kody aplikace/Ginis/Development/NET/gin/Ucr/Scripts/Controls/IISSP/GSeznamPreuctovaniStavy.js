"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
             * Stavy konsolidace
             *
             * @author tkares
             * @since 484.1.0.69
             */
            var GSeznamPreuctovaniStavy = /** @class */ (function (_super) {
                __extends(GSeznamPreuctovaniStavy, _super);
                function GSeznamPreuctovaniStavy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.loadingData = false; // atribut nacitani dat
                    return _this;
                }
                // nastaveni id a titulku okna
                //taskId = "seznamStavyKonsolidace";
                GSeznamPreuctovaniStavy.prototype.onContentReady = function () {
                    var _this = this;
                    var that = this;
                    //that.uid = "seznamStavyKon";
                    that.createActions();
                    this.menuBar([
                        { action: that.actions.actPrepocet, favorite: true }
                    ]);
                    // vytvoreni fitru panelu
                    this.createFilterPanel(this);
                    that.createGrid();
                    this.$grid.ggridserverfilter({});
                    //#region Kl. zkratky
                    this.element.gshortcut({
                        key: "INSERT",
                        description: "jres:31100226",
                        group: Gordic.Shortcuts.Groups.Task,
                        canExecute: function (ev) { return ev.target.tagName !== "INPUT"; },
                        action: new GAction({
                            name: "LoadDataAct",
                            run: function (ev, ctx) {
                                //this.loadData();
                                var view = that.$grid.ggrid("getView");
                                view.requestData(undefined);
                                view.getLoadingPromise().always(function () {
                                    that.loadingData = false;
                                });
                            }
                        }),
                    });
                    this.element.gshortcut({
                        key: "DELETE",
                        description: "jres:31100181",
                        canExecute: function (ev) { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: new GAction({
                            name: "clearFilterRowAct",
                            caption: "jres:31100267",
                            icon: "gi-bin",
                            run: function (ev, ctx) {
                                that.loadingData = true;
                                _this.$filterPanel.gfilterpanel("clear");
                                that.loadingData = false;
                            }
                        }),
                    });
                    this.element.gshortcut({
                        key: "0",
                        description: "jres:31100228",
                        canExecute: function (ev) { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: new GAction({
                            name: "clearAndFilterAct",
                            run: function (ev, ctx) {
                                _this.$filterPanel.gfilterpanel("clear");
                                var view = that.$grid.ggrid("getView");
                                view.requestData(undefined);
                                view.getLoadingPromise().always(function () {
                                    that.loadingData = false;
                                });
                            }
                        }),
                    });
                    this.$grid.gshortcut({
                        key: "ctrl+shift+lclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "jres:31100229",
                        action: new GAction({
                            name: "selFilterAct",
                            run: function (ev, ctx) {
                                _this.dispatchFillServerGridEvent(ev);
                            }
                        }),
                    });
                    this.$grid.gshortcut({
                        key: "ctrl+lclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "jres:31100235",
                        action: new GAction({
                            name: "selFilterAndSearchAct",
                            run: function (ev, ctx) {
                                _this.dispatchFillServerGridEvent(ev);
                                var view = that.$grid.ggrid("getView");
                                view.requestData(undefined);
                                view.getLoadingPromise().always(function () {
                                    that.loadingData = false;
                                });
                                //this.loadData();
                            }
                        }),
                    });
                    this.$grid.gshortcut();
                    //}
                    //#endregion
                    if (this.selectedMonth > 0)
                        this.findFields("Mesic").gfield("setValue", { mesic: this.selectedMonth }, false);
                };
                /**
                 * Vytovreni akci
                 *
                 * */
                GSeznamPreuctovaniStavy.prototype.createActions = function () {
                    var that = this;
                    this.actions.addRange({
                        actPrepocet: {
                            name: "actPrepocet",
                            //icon: "gi-list",
                            enabled: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* AnoEditace */,
                            visible: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* AnoEditace */,
                            caption: "jres:30250315",
                            run: function (ev, ctx) {
                                that.Recalculation();
                            }
                        },
                    });
                };
                /**
                 *  Vytvoreni gridu
                 *
                 * */
                GSeznamPreuctovaniStavy.prototype.createGrid = function () {
                    var that = this;
                    var provider = new Gordic.Data.Provider(function () {
                        that.loadingData = true;
                        return that.loadData();
                    });
                    var view = new Gordic.Data.View([], {
                        processors: { provider: provider },
                        key: "ico,ucs,uea_reg,ueb_reg,uex_reg,ktg_ueab"
                    });
                    var sloupce = that.createGridFormat();
                    //var defaultProfile = sloupce.columns;//sloupce.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1)
                    this.$grid = $("<div>")
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: view,
                        columns: sloupce,
                        //defaultProfile: {
                        //    //columnList: defaultProfile.map((c) => c.name).join(","),
                        //    condFormats: condFormats
                        //},
                        //defaultProfile: { columns: sloupce.columns }, 
                        //rowsClass: function (metarow) {
                        //    var styl = "";
                        //    if (typeof metarow.data.h == "undefined" || metarow.data.h == null || metarow.data.h= "")
                        //        styl = "normal";
                        //    return styl;
                        //},
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
                        //profileVisible: true,
                    });
                };
                /**
                 * Prevedeni kliku na bunku do filtru a nacteni
                 * @param ev
                 */
                GSeznamPreuctovaniStavy.prototype.dispatchFillServerGridEvent = function (ev) {
                    var $col = $(ev.target);
                    if (!ev.ctrlKey || !$col.hasClass("cell") || $col.hasClass("js-cfu-cell"))
                        return;
                    var selection = document.getSelection();
                    if (ev.shiftKey && selection)
                        selection.empty(); //Pokud se vybira pres kl. zkratku ctrl+shift+lclick, tak at se neoznacuje text
                    var colIndex = $col.attr("data-column-index");
                    var colDef = this.$grid.ggrid("trueColumns", false)[colIndex];
                    if (colDef.serverFilter) {
                        var value = $col.text();
                        if (!value)
                            return; //NOTE: Pokud neni hodnota, tak asi neni co resit. Resi hlavne bug s textovou hodnotou v ciselnych sloupcich
                        var sel = this.$grid.ggrid("getSelection", false)[0];
                        //NOTE: Tohle je spatny zpusob, cele by to chtelo prepsat, aby se neslo po stringu z bunky, ale po datech. 
                        //      Poptat se Skalice, jestli exituje nejaky lepsi zpusob...
                        if (colDef.columnType === "datetime")
                            value = sel[colDef.name];
                        else if (colDef.columnType === "currency")
                            value = sel[colDef.name];
                        var $filterFrmBox = this.$grid.ggridserverfilter("findFields", colDef.name);
                        $filterFrmBox.gfield("setValue", value, { valid: false });
                    }
                };
                /**
                 * Prepocet
                 * */
                GSeznamPreuctovaniStavy.prototype.Recalculation = function () {
                    var that = this;
                    that.beginOperation("jres:30250316"); //RC 30250316 : Probíhá přepočet...
                    Gordic.Isl.UcrKonsolidaceStavy.recalculation()
                        .get()
                        .done(function () {
                        that.showFlash({ label: "jres:30250317", state: "success" }); //RC 30250317 : Přepočet úspěšně proveden
                    })
                        .always(function () { return that.endOperation(); });
                };
                /**
                 * Uprava viditelnosti akci
                 *
                 * */
                GSeznamPreuctovaniStavy.prototype.setActions = function (pocetRadku) {
                    // pokud neni grid, nic nedelej
                    if (this.closed || !this.$grid)
                        return;
                    //this.actions.actZapisy!.update({ enabled: pocetRadku > 0 });
                    //this.actions.actPrint!.update({ enabled: pocetRadku > 0 });
                    this.actions.actPrepocet.update({ enabled: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* AnoEditace */ });
                };
                /**
                * function CreateFilterZalozka
                *
                * Obecna zalozka
                * @param {GContent} content
                * @returns {any}
                */
                GSeznamPreuctovaniStavy.prototype.CreateFilterZalozka = function () {
                    var _a;
                    var that = this;
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                        .addSection()
                        .addRow({ label: "jres:30250124" }) //RC 30250124 : Měsíc
                        .addField("gselectbox", Gordic.Prefabs.Select.ucrMesic(), {
                        name: "Mesic",
                        //customClass: "w-4",
                        model: "model.Mesic=value.mesic",
                        emptyValue: { mesic: null, mesic_txt: " " },
                        serverFilters: { rok: (_a = that.Globals.EkoParams) === null || _a === void 0 ? void 0 : _a.Rok, mesic: "< 13", pseudo: false /*new Gordic.Forms.Dependency("Rok", "rok", true) */ },
                        dropdown: true,
                        change: function (ev, ctx) {
                            //    this.onObdobiChanged();
                            if (that.loading)
                                return;
                            if (ctx.flags.valid) {
                                var view = that.$grid.ggrid("getView");
                                view.requestData();
                                view.getLoadingPromise().always(function () {
                                    that.loadingData = false;
                                });
                            }
                        },
                        flag: Gordic.Prefabs.Field.Flags.required
                    });
                    return filterFormDef;
                };
                /**
                 * Vytvoreni filtrovaciho panelu
                 * @param that
                 */
                GSeznamPreuctovaniStavy.prototype.createFilterPanel = function (that) {
                    this.$filterPanel = $("<div class='js-filtr'>")
                        .appendTo(this.element)
                        .gfilterpanel({
                        helperCustomizer: function (data) {
                            var polSort = data.sort(function (a, b) { return a.name <= b.name; });
                            return polSort;
                        },
                        forms: [that.CreateFilterZalozka()],
                        favoriteLayoutDescriptor: "L4M3S1 L12-12-0 M-12-12-0 S-12-12-0",
                        //favoriteLayoutDescriptor:"L1M1S1 L12-12-0 M-12-12-0 S-12-12-0",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        filterViewModeUserSettings: [FilterViewMode.Detail /*, FilterViewMode.Normal*/],
                        //simpleModeAutoLoadAfterCreatePanel: false,
                        //userDefaultFilter: true,
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        primaryButtonBehaviour: "AlwaysPrimary",
                        //favoriteLayoutDescriptor: "L4M3S1",
                        clearFilterButtonVisible: "AlwaysVisible",
                        //autoLoadAfterChoseFilter: true,
                        autoLoadAfterCreatePanel: false,
                        //autoLoadAfterClearFilter: true,
                        //filterHelperItemTemplate: "<b>{nazev}</b>",
                        //textItemTemplate: "{nazev}",
                        apply: function (event, obj) {
                            console.log("filterForm.apply", obj);
                            that.log.trace("filterForm.apply", obj);
                            if (that.loadingData)
                                return;
                            var view = that.$grid.ggrid("getView");
                            view.requestData(obj.filter);
                            view.getLoadingPromise().always(function () {
                                that.loadingData = false;
                            });
                        },
                        reset: function (ev, data) {
                            that.loadingData = true;
                            that.$grid.ggridserverfilter("clear");
                            //this.$filterPanel.gfilterpanel("clear");
                            that.loadingData = false;
                        }
                    });
                };
                /**
                 * Vraci objekt filtru
                 * @param {GContent} content
                 * @returns
                 */
                GSeznamPreuctovaniStavy.prototype.GetFilter = function () {
                    //debugger;
                    if (Gordic.Utils.WidgetExists("gfilterpanel", this.$filterPanel))
                        return this.$filterPanel;
                    else
                        throw "Filtr nenalezen";
                    //return content?.element.find(".js-filtr.gfilterpanel");
                    //return $(".js-filtr");
                };
                ///**
                // * Zjisteni mesice
                // * */
                //private getMesic(): number {
                //    var filter = this.GetFilter().gfilterpanel('getCurrentData');
                //    if (filter.Mesic === null)
                //        return -1;
                //    return filter.Mesic;
                //}
                /**
                 *  Nacteni dat
                 */
                GSeznamPreuctovaniStavy.prototype.loadData = function () {
                    var that = this;
                    var def = $.Deferred();
                    var maska = {};
                    var filter = that.GetFilter().gfilterpanel('getCurrentData');
                    console.log("loaddata.filter", filter);
                    //let view = this.$grid.ggrid("getView");
                    this.$grid.ggridserverfilter("collect", maska)
                        .then(function (filterServer) {
                        var _a, _b;
                        maska = filterServer;
                        if (filter.Mesic === null)
                            filter.Mesic = -1;
                        debugger;
                        var myfiltr = { rok: { o: "=", v: (_a = that.Globals.EkoParams) === null || _a === void 0 ? void 0 : _a.Rok }, ico: { o: "=", v: (_b = that.Globals.EkoParams) === null || _b === void 0 ? void 0 : _b.ICO }, mesic: { o: "<=", v: filter.Mesic } };
                        Gordic.Isl.UcrKonsolidaceStavy.list({ rq: { Maska: maska }, filter: { filters: myfiltr } })
                            .get()
                            .done(function (result) {
                            debugger;
                            //at.setActions(result.ListValues?.length as any);
                            //that.loadingData = false;
                            that.setActions(result.data.length);
                            return def.resolve(result);
                        })
                            .always(function () {
                            //that.loadingData = false;
                        });
                        return def.promise();
                    });
                    return def.promise();
                };
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 *
                 */
                GSeznamPreuctovaniStavy.prototype.createGridFormat = function () {
                    var _a, _b;
                    var myGridFormat = new Gordic.Data.GridFormat();
                    myGridFormat.addTextColumn({
                        name: "ico_kons",
                        caption: "jres:30250312",
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "ico_kons", caption: "jres:30250312" }),
                        width: 150,
                    });
                    myGridFormat.addTextColumn({
                        name: "id_kons",
                        caption: "jres:30250314",
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "id_kons", caption: "jres:30250314" }),
                        width: 150,
                    });
                    myGridFormat.addTextColumn({
                        name: "ucs",
                        caption: (_a = this.Globals.Zkratky) === null || _a === void 0 ? void 0 : _a.Ucs,
                        description: (_b = this.Globals.Texty) === null || _b === void 0 ? void 0 : _b.Ucs,
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
                    myGridFormat.addCurrencyColumn({
                        name: "c0_kons",
                        caption: "jres:30250211",
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0_kons", caption: "jres:30250211" }) //RC 30250211 : MD
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c1_kons",
                        caption: "jres:30250212",
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1_kons", caption: "jres:30250212" }) //RC 30250212 : Dal
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c0c1_kons",
                        caption: "jres:30250213",
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1_kons", caption: "jres:30250213" }) //RC 30250213 : MD - Dal
                    });
                    return myGridFormat;
                };
                GSeznamPreuctovaniStavy = __decorate([
                    Decorators.gcontent
                ], GSeznamPreuctovaniStavy);
                return GSeznamPreuctovaniStavy;
            }(Gordic.GContentBase));
            WebClient.GSeznamPreuctovaniStavy = GSeznamPreuctovaniStavy;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GSeznamPreuctovaniStavy.js.map