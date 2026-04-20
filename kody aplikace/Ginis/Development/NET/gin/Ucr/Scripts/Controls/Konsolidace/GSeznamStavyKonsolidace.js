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
             * Stavy konsolidace
             *
             * @author tkares
             * @since 484.1.0.69
             */
            let GSeznamStavyKonsolidace = class GSeznamStavyKonsolidace extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    // grid se seznamem
                    //private $grid: JQuery<HTMLElement>;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                    this.loadingData = false; // atribut nacitani dat
                }
                // nastaveni id a titulku okna
                //taskId = "seznamStavyKonsolidace";
                onContentReady() {
                    var that = this;
                    //that.uid = "seznamStavyKon";
                    that.createActions();
                    this.menuBar([
                        { action: that.actions.actPrepocet, favorite: true }
                    ]);
                    // vytvoreni fitru panelu
                    this.createFilterPanel(this);
                    that.createGrid();
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    grid.ggridserverfilter({});
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
                                let view = grid.ggrid("getView");
                                view.requestData(undefined);
                                view.getLoadingPromise().always(() => {
                                    that.loadingData = false;
                                });
                            }
                        }),
                    });
                    this.element.gshortcut({
                        key: "DELETE",
                        description: "jres:31100181", //RC 31100181 : Vyčistit
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: new GAction({
                            name: "clearFilterRowAct",
                            caption: "jres:31100267", //RC 31100267 : Vyčistit filtr seznamu
                            icon: "gi-bin",
                            run: (ev, ctx) => {
                                that.loadingData = true;
                                this.$filterPanel.gfilterpanel("clear");
                                that.loadingData = false;
                            }
                        }),
                    });
                    this.element.gshortcut({
                        key: "0",
                        description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: new GAction({
                            name: "clearAndFilterAct",
                            run: (ev, ctx) => {
                                this.$filterPanel.gfilterpanel("clear");
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                let view = grid.ggrid("getView");
                                view.requestData(undefined);
                                view.getLoadingPromise().always(() => {
                                    that.loadingData = false;
                                });
                            }
                        }),
                    });
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
                                let view = grid.ggrid("getView");
                                view.requestData(undefined);
                                view.getLoadingPromise().always(() => {
                                    that.loadingData = false;
                                });
                                //this.loadData();
                            }
                        }),
                    });
                    //}
                    //#endregion
                    if (this.selectedMonth > 0)
                        this.findFields("Mesic").gfield("setValue", { mesic: this.selectedMonth }, false);
                }
                /**
                 * Vytovreni akci
                 *
                 * */
                createActions() {
                    let that = this;
                    this.actions.addRange({
                        actPrepocet: {
                            name: "actPrepocet",
                            //icon: "gi-list",
                            enabled: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                            visible: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                            caption: "jres:30250315", //RC 30250315 : Přepočet úplný
                            run: function (ev, ctx) {
                                that.Recalculation();
                            }
                        },
                    });
                }
                /**
                 *  Vytvoreni gridu
                 *
                 * */
                createGrid() {
                    let that = this;
                    let provider = new Gordic.Data.Provider(() => {
                        that.loadingData = true;
                        return that.loadData();
                    });
                    let view = new Gordic.Data.View([], {
                        processors: { provider: provider },
                        key: "ico,ucs,uea_reg,ueb_reg,uex_reg,ktg_ueab"
                    });
                    var sloupce = that.createGridFormat();
                    //var defaultProfile = sloupce.columns;//sloupce.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1)
                    const grid = $.newDiv(this.classGrid)
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
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.element.find("." + this.classGrid);
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Prepocet
                 * */
                Recalculation() {
                    let that = this;
                    that.beginOperation("jres:30250316"); //RC 30250316 : Probíhá přepočet...
                    that.isl.UcrKonsolidaceStavy.recalculation()
                        .get()
                        .then(() => {
                        that.showFlash({ label: "jres:30250317", state: "success" }); //RC 30250317 : Přepočet úspěšně proveden
                        return;
                    })
                        .always(() => that.endOperation());
                }
                /**
                 * Uprava viditelnosti akci
                 *
                 * */
                setActions(pocetRadku) {
                    // pokud neni grid, nic nedelej
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    if (this.closed)
                        return;
                    //this.actions.actZapisy!.update({ enabled: pocetRadku > 0 });
                    //this.actions.actPrint!.update({ enabled: pocetRadku > 0 });
                    this.actions.actPrepocet.update({ enabled: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */ });
                }
                /**
                * function CreateFilterZalozka
                *
                * Obecna zalozka
                * @param {GContent} content
                * @returns {any}
                */
                CreateFilterZalozka() {
                    var that = this;
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                        .addSection()
                        .addRow({ label: "jres:30250124" }) //RC 30250124 : Měsíc
                        .addField("gselectbox", Gordic.Prefabs.Select.ucrMesic(), {
                        name: "Mesic",
                        //customClass: "w-4",
                        model: "model.Mesic=value.mesic",
                        emptyValue: { mesic: null, mesic_txt: " " },
                        serverFilters: { rok: that.Globals.EkoParams?.Rok, mesic: "< 13", pseudo: false /*new Gordic.Forms.Dependency("Rok", "rok", true) */ },
                        dropdown: true,
                        change: (ev, ctx) => {
                            //    this.onObdobiChanged();
                            if (that.loading)
                                return;
                            if (ctx.flags.valid) {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                let view = grid.ggrid("getView");
                                view.requestData();
                                view.getLoadingPromise().always(() => {
                                    that.loadingData = false;
                                });
                            }
                        },
                        flag: Gordic.Prefabs.Field.Flags.required
                    });
                    return filterFormDef;
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
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var view = grid.ggrid("getView");
                            view.requestData(obj.filter);
                            view.getLoadingPromise().always(() => {
                                that.loadingData = false;
                            });
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
                GetFilter() {
                    //debugger;
                    if (Gordic.Utils.WidgetExists("gfilterpanel", this.$filterPanel))
                        return this.$filterPanel;
                    else
                        throw "Filtr nenalezen";
                    //return content?.element.find(".js-filtr.gfilterpanel");
                    //return $(".js-filtr");
                }
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
                loadData() {
                    var that = this;
                    var def = $.Deferred();
                    var maska = {};
                    var filter = that.GetFilter().gfilterpanel('getCurrentData');
                    console.log("loaddata.filter", filter);
                    //let view = this.$grid.ggrid("getView");
                    let grid = that.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    grid.ggridserverfilter("collect", maska)
                        .then((filterServer) => {
                        maska = filterServer;
                        if (filter.Mesic === null)
                            filter.Mesic = -1;
                        debugger;
                        let myfiltr = { rok: { o: "=", v: that.Globals.EkoParams?.Rok }, ico: { o: "=", v: that.Globals.EkoParams?.ICO }, mesic: { o: "<=", v: filter.Mesic } };
                        that.isl.UcrKonsolidaceStavy.listData({ rq: { Maska: maska }, filter: { filters: myfiltr } })
                            .get()
                            .then(function (result) {
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
                }
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 *
                 */
                createGridFormat() {
                    var myGridFormat = new Gordic.Data.GridFormat();
                    myGridFormat.addTextColumn({
                        name: "ico_kons",
                        caption: "jres:30250312", //RC 30250312 : Partner
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "ico_kons", caption: "jres:30250312" }), //RC 30250312 : Partner
                        width: 150,
                    });
                    myGridFormat.addTextColumn({
                        name: "id_kons",
                        caption: "jres:30250314", //RC 30250314 : Okruh
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "id_kons", caption: "jres:30250314" }), //RC 30250314 : Okruh
                        width: 150,
                    });
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
                            model: "ucs",
                            disabled: false
                        })
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c0_kons",
                        caption: "jres:30250211", //RC 30250211 : MD                
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0_kons", caption: "jres:30250211" }) //RC 30250211 : MD
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c1_kons",
                        caption: "jres:30250212", //RC 30250212 : Dal                
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1_kons", caption: "jres:30250212" }) //RC 30250212 : Dal
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c0c1_kons",
                        caption: "jres:30250213", //RC 30250213 : MD - Dal
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1_kons", caption: "jres:30250213" }) //RC 30250213 : MD - Dal
                    });
                    return myGridFormat;
                }
            };
            GSeznamStavyKonsolidace = __decorate([
                Decorators.gcontent
            ], GSeznamStavyKonsolidace);
            WebClient.GSeznamStavyKonsolidace = GSeznamStavyKonsolidace;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVN0YXZ5S29uc29saWRhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtU3RhdnlLb25zb2xpZGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBOGlCZjtBQTlpQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBOGlCbkI7SUE5aUJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E4aUI3QjtRQTlpQm9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7ZUFLRztZQUVILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsT0FBQSxZQUFZO2dCQUF6RDs7b0JBWUksbUJBQW1CO29CQUNuQixxQ0FBcUM7b0JBQ3JDOzt1QkFFRztvQkFDTyxjQUFTLEdBQVcsY0FBYyxDQUFDO29CQUlyQyxnQkFBVyxHQUFZLEtBQUssQ0FBQyxDQUFDLHVCQUF1QjtnQkFnaEJqRSxDQUFDO2dCQS9nQkcsOEJBQThCO2dCQUM5QixvQ0FBb0M7Z0JBQ3BDLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQiw4QkFBOEI7b0JBQzlCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFFckIsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDVCxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO3FCQUN2RCxDQUFDLENBQUM7b0JBR0gseUJBQXlCO29CQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO3dCQUFFLE9BQU87b0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFM0IscUJBQXFCO29CQUVyQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzt3QkFDbkIsR0FBRyxFQUFFLFFBQVE7d0JBQ2IsV0FBVyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7d0JBQ3pELEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJO3dCQUNuQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUNoQixJQUFJLEVBQUUsYUFBYTs0QkFDbkIsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLGtCQUFrQjtnQ0FDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO29DQUFFLE9BQU87Z0NBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7b0NBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFBO2dDQUM1QixDQUFDLENBQUMsQ0FBQzs0QkFFUCxDQUFDO3lCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFDO29CQUVILElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO3dCQUNuQixHQUFHLEVBQUUsUUFBUTt3QkFDYixXQUFXLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjt3QkFDdEQsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQzdELEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJO3dCQUNuQyxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ2hCLElBQUksRUFBRSxtQkFBbUI7NEJBQ3pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0NBQXNDOzRCQUNoRSxJQUFJLEVBQUUsUUFBUTs0QkFDZCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0NBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs0QkFDakMsQ0FBQzt5QkFBQyxDQUFDO3FCQUNOLENBQUMsQ0FBQztvQkFHSCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzt3QkFDbkIsR0FBRyxFQUFFLEdBQUc7d0JBQ1IsV0FBVyxFQUFFLGVBQWUsRUFBRSxpQ0FBaUM7d0JBQy9ELFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUM3RCxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSTt3QkFDbkMsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUNoQixJQUFJLEVBQUUsbUJBQW1COzRCQUN6QixHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQ3hDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQ0FDMUIsSUFBSSxJQUFJLElBQUksSUFBSTtvQ0FBRSxPQUFPO2dDQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dDQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUM1QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO29DQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtnQ0FDNUIsQ0FBQyxDQUFDLENBQUM7NEJBRVgsQ0FBQzt5QkFBQyxDQUFDO3FCQUNOLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUNYLEdBQUcsRUFBRSxtQkFBbUI7d0JBQ3hCLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJO3dCQUNuQyxXQUFXLEVBQUUsZUFBZSxFQUFFLDRDQUE0Qzt3QkFDMUUsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUNoQixJQUFJLEVBQUUsY0FBYzs0QkFDcEIsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFFekMsQ0FBQzt5QkFBRSxDQUFDO3FCQUVYLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUNYLEdBQUcsRUFBRSxhQUFhO3dCQUNsQixLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSTt3QkFDbkMsV0FBVyxFQUFFLGVBQWUsRUFBRSx3REFBd0Q7d0JBQ3RGLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQzs0QkFDaEIsSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO29DQUFFLE9BQU87Z0NBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7Z0NBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7b0NBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFBO2dDQUM1QixDQUFDLENBQUMsQ0FBQztnQ0FFSCxrQkFBa0I7NEJBQ3RCLENBQUM7eUJBQ0osQ0FBQztxQkFDTCxDQUFDLENBQUM7b0JBSUgsR0FBRztvQkFFSCxZQUFZO29CQUlaLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBQyxDQUFDO3dCQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUN2RixDQUFDO2dCQUVEOzs7cUJBR0s7Z0JBQ0csYUFBYTtvQkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsV0FBVyxFQUFFOzRCQUNULElBQUksRUFBRSxhQUFhOzRCQUNuQixrQkFBa0I7NEJBQ2xCLE9BQU8sRUFBRSxJQUFBLE9BQU8sQ0FBQyxXQUFXLENBQUMsZUFBZSw2REFBcUQ7NEJBQ2pHLE9BQU8sRUFBRSxJQUFBLE9BQU8sQ0FBQyxXQUFXLENBQUMsZUFBZSw2REFBcUQ7NEJBQ2pHLE9BQU8sRUFBRSxlQUFlLEVBQUUsOEJBQThCOzRCQUN4RCxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUN6QixDQUFDO3lCQUNKO3FCQUdKLENBQ0EsQ0FBQztnQkFDTixDQUFDO2dCQUVEOzs7cUJBR0s7Z0JBQ0csVUFBVTtvQkFDZCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQWdCLEdBQUcsRUFBRTt3QkFDeEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7d0JBQ3hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUMzQixDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFxQyxFQUFFLEVBQUU7d0JBQ3BFLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7d0JBQ2hDLEdBQUcsRUFBRSwwQ0FBMEM7cUJBQ3BELENBQUMsQ0FBQztvQkFDSCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDdEMsK0hBQStIO29CQUUvSCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7eUJBQ2hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFDO3dCQUNILFVBQVUsRUFBRSxNQUFNO3dCQUNsQixJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsbUJBQW1CO3dCQUNuQixnRUFBZ0U7d0JBQ2hFLDhCQUE4Qjt3QkFDOUIsSUFBSTt3QkFDSixnREFBZ0Q7d0JBQ2hELGlDQUFpQzt3QkFDakMsb0JBQW9CO3dCQUNwQiwrRkFBK0Y7d0JBQy9GLDBCQUEwQjt3QkFFMUIsa0JBQWtCO3dCQUNsQixJQUFJO3dCQUNKLFNBQVMsRUFBRSxVQUFVLEVBQUUsRUFBRSxJQUFJOzRCQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7NEJBQy9CLHVCQUF1Qjs0QkFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO2dDQUVsQixzQ0FBc0M7Z0NBQ3RDLHdGQUF3Rjs0QkFFNUYsQ0FBQzs0QkFDRCxNQUFNOzRCQUNOLDJDQUEyQzt3QkFHL0MsQ0FBQzt3QkFHRCx1QkFBdUI7cUJBQzFCLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ0ssMkJBQTJCLENBQUMsRUFBcUI7b0JBQ3JELElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRXhCLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQzt3QkFDckUsT0FBTztvQkFFWCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hDLElBQUksRUFBRSxDQUFDLFFBQVEsSUFBSSxTQUFTO3dCQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLCtFQUErRTtvQkFFaEksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBRSxDQUFDO29CQUMvQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7d0JBQUUsT0FBTztvQkFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFnQixDQUFDO29CQUV2RSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDdEIsSUFBSSxLQUFLLEdBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUU3QixJQUFJLENBQUMsS0FBSzs0QkFBRSxPQUFPLENBQUMsNEdBQTRHO3dCQUVoSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFL0MsMkdBQTJHO3dCQUMzRyxnRUFBZ0U7d0JBRWhFLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVOzRCQUFFLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUssQ0FBQyxDQUFDOzZCQUMzRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssVUFBVTs0QkFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFLLENBQUMsQ0FBQzt3QkFHckUsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsSUFBSyxDQUFDLENBQUM7d0JBQ3ZFLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29CQUM5RCxDQUFDO2dCQUNMLENBQUM7Z0JBQ0Q7OztrQkFHRTtnQkFDUSxPQUFPO29CQUNiLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztnQkFFRDs7cUJBRUs7Z0JBQ0csYUFBYTtvQkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsbUNBQW1DO29CQUN6RSxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRTt5QkFDdkMsR0FBRyxFQUFFO3lCQUNMLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyx5Q0FBeUM7d0JBQ3ZHLE9BQU87b0JBQ1gsQ0FBQyxDQUFDO3lCQUNELE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FDakM7Z0JBQ1QsQ0FBQztnQkFDRDs7O3FCQUdLO2dCQUNHLFVBQVUsQ0FBQyxVQUFrQjtvQkFDakMsK0JBQStCO29CQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7d0JBQUUsT0FBTztvQkFDekIsSUFBSSxJQUFJLENBQUMsTUFBTTt3QkFBRSxPQUFPO29CQUV4Qiw4REFBOEQ7b0JBQzlELDZEQUE2RDtvQkFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxlQUFlLDZEQUFxRCxFQUFFLENBQUMsQ0FBQztnQkFDNUksQ0FBQztnQkFLRDs7Ozs7O2tCQU1FO2dCQUNNLG1CQUFtQjtvQkFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSwwQ0FBMEMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBRSxxQkFBcUI7eUJBRXRLLFVBQVUsRUFBRTt5QkFDWixNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7eUJBQ3hELFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ3RELElBQUksRUFBRSxPQUFPO3dCQUViLHFCQUFxQjt3QkFDckIsS0FBSyxFQUFFLHlCQUF5Qjt3QkFDaEMsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO3dCQUMzQyxhQUFhLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQSxvREFBb0QsRUFBRTt3QkFDckksUUFBUSxFQUFFLElBQUk7d0JBQ2QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNoQiw2QkFBNkI7NEJBQzdCLElBQUksSUFBSSxDQUFDLE9BQU87Z0NBQUUsT0FBTzs0QkFDekIsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dDQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7b0NBQUUsT0FBTztnQ0FDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQ0FDakMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dDQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO29DQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtnQ0FDNUIsQ0FBQyxDQUFDLENBQUM7NEJBQ1AsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTtxQkFDNUMsQ0FDQSxDQUVBO29CQUdMLE9BQU8sYUFBYSxDQUFDO2dCQUN6QixDQUFDO2dCQUlEOzs7bUJBR0c7Z0JBQ0ssaUJBQWlCLENBQUMsSUFBVTtvQkFFaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzt5QkFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFlBQVksQ0FBQzt3QkFDVixnQkFBZ0IsRUFBRSxVQUFVLElBQUk7NEJBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3RFLE9BQU8sT0FBTyxDQUFDO3dCQUNuQixDQUFDO3dCQUVDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO3dCQUNyQyx3QkFBd0IsRUFBRSxxQ0FBcUM7d0JBQy9ELGlFQUFpRTt3QkFDakUsb0JBQW9CLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRTt3QkFDakUsMEJBQTBCLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFBLDJCQUEyQixDQUFDO3dCQUM5RSw0Q0FBNEM7d0JBQzVDLDBCQUEwQjt3QkFDMUIscUJBQXFCO3dCQUNyQixnQ0FBZ0M7d0JBQ2hDLGNBQWMsRUFBRSxjQUFjLENBQUMsTUFBTTt3QkFDckMsbUJBQW1CO3dCQUNuQixzQkFBc0IsRUFBRSxlQUFlO3dCQUN2QyxxQ0FBcUM7d0JBQ3JDLHdCQUF3QixFQUFFLGVBQWU7d0JBQ3pDLGlDQUFpQzt3QkFDakMsd0JBQXdCLEVBQUUsS0FBSzt3QkFDL0IsaUNBQWlDO3dCQUNqQyw2Q0FBNkM7d0JBQzdDLDhCQUE4Qjt3QkFDOUIsS0FBSyxFQUFFLFVBQVUsS0FBSyxFQUFFLEdBQUc7NEJBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDOzRCQUN4QyxJQUFJLElBQUksQ0FBQyxXQUFXO2dDQUFFLE9BQU87NEJBQzdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDMUIsSUFBSSxJQUFJLElBQUksSUFBSTtnQ0FBRSxPQUFPOzRCQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDN0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQ0FDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUE7NEJBQzVCLENBQUMsQ0FBQyxDQUFDO3dCQUVQLENBQUM7d0JBQ0QsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFOzRCQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzs0QkFDeEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO2dDQUFFLE9BQU87NEJBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQTs0QkFDL0IsMENBQTBDOzRCQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzt3QkFFN0IsQ0FBQztxQkFDSixDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSyxTQUFTO29CQUNiLFdBQVc7b0JBQ1gsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzt3QkFDNUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDOzt3QkFFekIsTUFBTSxpQkFBaUIsQ0FBQztvQkFDNUIseURBQXlEO29CQUN6RCx3QkFBd0I7Z0JBQzVCLENBQUM7Z0JBQ0QsS0FBSztnQkFDTCxvQkFBb0I7Z0JBQ3BCLE9BQU87Z0JBQ1AsOEJBQThCO2dCQUM5QixtRUFBbUU7Z0JBQ25FLGdDQUFnQztnQkFDaEMsb0JBQW9CO2dCQUNwQiwwQkFBMEI7Z0JBQzFCLEdBQUc7Z0JBQ0g7O21CQUVHO2dCQUNLLFFBQVE7b0JBQ1osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZCLElBQUksS0FBSyxHQUEyRCxFQUFFLENBQUM7b0JBRXZFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFFN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDdkMseUNBQXlDO29CQUN6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7d0JBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBRXpELElBQUksQ0FBQyxpQkFBaUIsQ0FBeUQsU0FBUyxFQUFFLEtBQUssQ0FBQzt5QkFDM0YsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7d0JBQ25CLEtBQUssR0FBRyxZQUFZLENBQUM7d0JBR3JCLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJOzRCQUNyQixNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUV0QixRQUFRLENBQUM7d0JBRVQsSUFBSSxPQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQVMsQ0FBQzt3QkFDL0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUM7NkJBQ3hGLEdBQUcsRUFBRTs2QkFDTCxJQUFJLENBQUMsVUFBVSxNQUFNOzRCQUNsQixRQUFRLENBQUM7NEJBQ1Qsa0RBQWtEOzRCQUNsRCwyQkFBMkI7NEJBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDcEMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUUvQixDQUFDLENBQUM7NkJBQ0QsTUFBTSxDQUFDOzRCQUNKLDJCQUEyQjt3QkFFL0IsQ0FBQyxDQUFDLENBQ0Q7d0JBQ0wsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBRXpCLENBQUMsQ0FDSixDQUFDO29CQUdGLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUdEOzs7O21CQUlHO2dCQUNLLGdCQUFnQjtvQkFDcEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBc0MsQ0FBQztvQkFFcEYsWUFBWSxDQUFDLGFBQWEsQ0FBQzt3QkFDdkIsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsdUJBQXVCO3dCQUNqRCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSx1QkFBdUI7d0JBQ3pILEtBQUssRUFBRSxHQUFHO3FCQUNiLENBQUMsQ0FBQztvQkFDSCxZQUFZLENBQUMsYUFBYSxDQUFDO3dCQUN2QixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjt3QkFDL0MsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLEVBQUUscUJBQXFCO3dCQUN0SCxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUM7b0JBQ0gsWUFBWSxDQUFDLGFBQWEsQ0FBQzt3QkFDdkIsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUc7d0JBQ2xDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHO3dCQUNwQyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxtQkFBbUI7d0JBQ25CLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUM5QyxzRUFBc0U7d0JBQ3RFLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7NEJBQ3pDLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVE7NEJBQ3hFLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVM7NEJBQ2xKLEtBQUssRUFBRSxLQUFLOzRCQUNaLFFBQVEsRUFBRSxLQUFLO3lCQUNwQixDQUFDO3FCQUNMLENBQUMsQ0FBQztvQkFNSCxZQUFZLENBQUMsaUJBQWlCLENBQUM7d0JBQzNCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0NBQWtDO3dCQUM1RCxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxrQkFBa0I7cUJBQ3RILENBQUMsQ0FBQztvQkFDSCxZQUFZLENBQUMsaUJBQWlCLENBQUM7d0JBQzNCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUNBQW1DO3dCQUM3RCxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxtQkFBbUI7cUJBQ3ZILENBQUMsQ0FBQztvQkFDSCxZQUFZLENBQUMsaUJBQWlCLENBQUM7d0JBQzNCLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjt3QkFDbEQsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsd0JBQXdCO3FCQUM5SCxDQUFDLENBQUM7b0JBS0gsT0FBTyxZQUFZLENBQUM7Z0JBQ3hCLENBQUM7YUFDSixDQUFBO1lBcmlCWSx1QkFBdUI7Z0JBRG5DLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsdUJBQXVCLENBcWlCbkM7WUFyaUJZLGlDQUF1QiwwQkFxaUJuQyxDQUFBO1FBQ0wsQ0FBQyxFQTlpQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQThpQjdCO0lBQUQsQ0FBQyxFQTlpQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQThpQm5CO0FBQUQsQ0FBQyxFQTlpQlMsTUFBTSxLQUFOLE1BQU0sUUE4aUJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogU3Rhdnkga29uc29saWRhY2VcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0a2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODQuMS4wLjY5XHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVN0YXZ5S29uc29saWRhY2UgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgZWtvUGFyYW1zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWtvUGFyYW1zRHRvO1xyXG4gICAgICAgIC8vcHJpdmF0ZSB0ZW1hOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBzZWxlY3RlZE1vbnRoOiBudW1iZXI7XHJcbiAgICAgICAgLy8gcGFyYW1ldHJ5XHJcbiAgICAgICAgZ2xvYmFsUGFyYW1zOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUGFyYW1zRHRvO1xyXG4gICAgICAgIGZpbHRlck9wdGlvbnM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HRmlsdGVyT3B0aW9uc0R0bztcclxuXHJcblxyXG4gICAgICAgIC8vIGZpbHRyb3ZhY2kgcGFuZWxcclxuICAgICAgICBwcml2YXRlICRmaWx0ZXJQYW5lbDogSlF1ZXJ5O1xyXG4gICAgICAgIC8vIGdyaWQgc2Ugc2V6bmFtZW1cclxuICAgICAgICAvL3ByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdHJpZGEgZ3JpZHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2xhc3NHcmlkOiBzdHJpbmcgPSBcImpzLWdyaWQtYmFzZVwiO1xyXG4gICAgICAgIC8vIE5hc3RhdmVuaVxyXG4gICAgICAgIHByaXZhdGUgR2xvYmFsczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Vjckdsb2JhbER0bzsgXHJcblxyXG4gICAgICAgIHByaXZhdGUgbG9hZGluZ0RhdGE6IGJvb2xlYW4gPSBmYWxzZTsgLy8gYXRyaWJ1dCBuYWNpdGFuaSBkYXRcclxuICAgICAgICAvLyBuYXN0YXZlbmkgaWQgYSB0aXR1bGt1IG9rbmFcclxuICAgICAgICAvL3Rhc2tJZCA9IFwic2V6bmFtU3RhdnlLb25zb2xpZGFjZVwiO1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vdGhhdC51aWQgPSBcInNlem5hbVN0YXZ5S29uXCI7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFByZXBvY2V0LCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBmaXRydSBwYW5lbHVcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCh0aGlzKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKHt9KTtcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBLbC4gemtyYXRreVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiSU5TRVJUXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIsIC8vUkMgMzExMDAyMjYgOiBOYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiTG9hZERhdGFBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDE4MVwiLCAvL1JDIDMxMTAwMTgxIDogVnnEjWlzdGl0XHJcbiAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2xlYXJGaWx0ZXJSb3dBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyNjdcIiwgLy9SQyAzMTEwMDI2NyA6IFZ5xI1pc3RpdCBmaWx0ciBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1iaW5cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfX0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIsIC8vUkMgMzExMDAyMjggOiBWecSNaXN0aXQgYSBuYcSNw61zdFxyXG4gICAgICAgICAgICAgICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsZWFyQW5kRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOihldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmdldExvYWRpbmdQcm9taXNlKCkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH19KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiY3RybCtzaGlmdCtsY2xpY2tcIixcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOVwiLCAvL1JDIDMxMTAwMjI5IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUuXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlbEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9IH0pLFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiY3RybCtsY2xpY2tcIixcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIzNVwiLCAvL1JDIDMxMTAwMjM1IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUgYSB2eWhsZWTDoW7DrS5cclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsRmlsdGVyQW5kU2VhcmNoQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZE1vbnRoPjApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJNZXNpY1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IG1lc2ljOnRoaXMuc2VsZWN0ZWRNb250aCB9LGZhbHNlKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0b3ZyZW5pIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0UHJlcG9jZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByZXBvY2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBHbG9iYWxzLkdVY3JHbG9iYWxzLlJhZF9Lb25zb2xpZGFjZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVZkdS5Bbm9FZGl0YWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IEdsb2JhbHMuR1Vjckdsb2JhbHMuUmFkX0tvbnNvbGlkYWNlID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyWm9icmF6ZW5pVmR1LkFub0VkaXRhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzE1XCIsIC8vUkMgMzAyNTAzMTUgOiBQxZllcG/EjWV0IMO6cGxuw71cclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUmVjYWxjdWxhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIFZ5dHZvcmVuaSBncmlkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBEdG8+KFtdLCB7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzb3JzOiB7IHByb3ZpZGVyOiBwcm92aWRlciB9XHJcbiAgICAgICAgICAgICAgICAsIGtleTogXCJpY28sdWNzLHVlYV9yZWcsdWViX3JlZyx1ZXhfcmVnLGt0Z191ZWFiXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBzbG91cGNlID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIC8vdmFyIGRlZmF1bHRQcm9maWxlID0gc2xvdXBjZS5jb2x1bW5zOy8vc2xvdXBjZS5jb2x1bW5zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5uYW1lPy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJ2bGFzdG5vc3RcIikgPT09IC0xKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9ICQubmV3RGl2KHRoaXMuY2xhc3NHcmlkKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogc2xvdXBjZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9jb2x1bW5MaXN0OiBkZWZhdWx0UHJvZmlsZS5tYXAoKGMpID0+IGMubmFtZSkuam9pbihcIixcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgY29uZEZvcm1hdHM6IGNvbmRGb3JtYXRzXHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdFByb2ZpbGU6IHsgY29sdW1uczogc2xvdXBjZS5jb2x1bW5zIH0sIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vcm93c0NsYXNzOiBmdW5jdGlvbiAobWV0YXJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciBzdHlsID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodHlwZW9mIG1ldGFyb3cuZGF0YS5oID09IFwidW5kZWZpbmVkXCIgfHwgbWV0YXJvdy5kYXRhLmggPT0gbnVsbCB8fCBtZXRhcm93LmRhdGEuaD0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgc3R5bCA9IFwibm9ybWFsXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBzdHlsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IGluZm8uZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5jbGVhckNvbnRyb2xzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3coeyBjdXJyZW50Um93OiByb3dzWzBdLCB2aWV3TW9kZTogdHJ1ZSwgY29sczogdGhhdC5jb2xzIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vcHJvZmlsZVZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByZXZlZGVuaSBrbGlrdSBuYSBidW5rdSBkbyBmaWx0cnUgYSBuYWN0ZW5pXHJcbiAgICAgICAgICogQHBhcmFtIGV2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXY6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciAkY29sID0gJChldi50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFldi5jdHJsS2V5IHx8ICEkY29sLmhhc0NsYXNzKFwiY2VsbFwiKSB8fCAkY29sLmhhc0NsYXNzKFwianMtY2Z1LWNlbGxcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChldi5zaGlmdEtleSAmJiBzZWxlY3Rpb24pIHNlbGVjdGlvbi5lbXB0eSgpOyAvL1Bva3VkIHNlIHZ5YmlyYSBwcmVzIGtsLiB6a3JhdGt1IGN0cmwrc2hpZnQrbGNsaWNrLCB0YWsgYXQgc2UgbmVvem5hY3VqZSB0ZXh0XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sSW5kZXggPSAkY29sLmF0dHIoXCJkYXRhLWNvbHVtbi1pbmRleFwiKSE7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGNvbERlZiA9IGdyaWQuZ2dyaWQoXCJ0cnVlQ29sdW1uc1wiLCBmYWxzZSlbY29sSW5kZXhdIGFzIEdHcmlkQ29sdW1uO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbERlZi5zZXJ2ZXJGaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogYW55ID0gJGNvbC50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuOyAvL05PVEU6IFBva3VkIG5lbmkgaG9kbm90YSwgdGFrIGFzaSBuZW5pIGNvIHJlc2l0LiBSZXNpIGhsYXZuZSBidWcgcyB0ZXh0b3ZvdSBob2Rub3RvdSB2IGNpc2VsbnljaCBzbG91cGNpY2hcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsID0gZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiLCBmYWxzZSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy9OT1RFOiBUb2hsZSBqZSBzcGF0bnkgenB1c29iLCBjZWxlIGJ5IHRvIGNodGVsbyBwcmVwc2F0LCBhYnkgc2UgbmVzbG8gcG8gc3RyaW5ndSB6IGJ1bmt5LCBhbGUgcG8gZGF0ZWNoLiBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgUG9wdGF0IHNlIFNrYWxpY2UsIGplc3RsaSBleGl0dWplIG5lamFreSBsZXBzaSB6cHVzb2IuLi5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbERlZi5jb2x1bW5UeXBlID09PSBcImRhdGV0aW1lXCIpIHZhbHVlID0gc2VsW2NvbERlZi5uYW1lIV07XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2xEZWYuY29sdW1uVHlwZSA9PT0gXCJjdXJyZW5jeVwiKSB2YWx1ZSA9IHNlbFtjb2xEZWYubmFtZSFdO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgJGZpbHRlckZybUJveCA9IGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJmaW5kRmllbGRzXCIsIGNvbERlZi5uYW1lISk7XHJcbiAgICAgICAgICAgICAgICAkZmlsdGVyRnJtQm94LmdmaWVsZChcInNldFZhbHVlXCIsIHZhbHVlLCB7IHZhbGlkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlwiICsgdGhpcy5jbGFzc0dyaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcmVwb2NldFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBSZWNhbGN1bGF0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMzE2XCIpOyAvL1JDIDMwMjUwMzE2IDogUHJvYsOtaMOhIHDFmWVwb8SNZXQuLi5cclxuICAgICAgICAgICAgdGhhdC5pc2wuVWNyS29uc29saWRhY2VTdGF2eS5yZWNhbGN1bGF0aW9uKClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDMxN1wiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSk7IC8vUkMgMzAyNTAzMTcgOiBQxZllcG/EjWV0IMO6c3DEm8WhbsSbIHByb3ZlZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4gdGhhdC5lbmRPcGVyYXRpb24oKSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXByYXZhIHZpZGl0ZWxub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHNldEFjdGlvbnMocG9jZXRSYWRrdTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgZ3JpZCwgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFjdFphcGlzeSEudXBkYXRlKHsgZW5hYmxlZDogcG9jZXRSYWRrdSA+IDAgfSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFjdFByaW50IS51cGRhdGUoeyBlbmFibGVkOiBwb2NldFJhZGt1ID4gMCB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFByZXBvY2V0IS51cGRhdGUoeyBlbmFibGVkOiBHbG9iYWxzLkdVY3JHbG9iYWxzLlJhZF9Lb25zb2xpZGFjZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVZkdS5Bbm9FZGl0YWNlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBDcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogT2JlY25hIHphbG96a2FcclxuICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIENyZWF0ZUZpbHRlclphbG96a2EoKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBvcGVuZWQ6IHRydWUsIGxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxMiwgTC0xMi0xMi0wLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLCB0YWJMYWJlbDogXCJqcmVzOjMwMjUwMDUyXCIgfSkgIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMTI0XCIgfSkgLy9SQyAzMDI1MDEyNCA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnVjck1lc2ljKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIk1lc2ljXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidy00XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuTWVzaWM9dmFsdWUubWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiB7IG1lc2ljOiBudWxsLCBtZXNpY190eHQ6IFwiIFwiIH0sICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IHJvazogdGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rLCBtZXNpYzogXCI8IDEzXCIsIHBzZXVkbzogZmFsc2UvKm5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcIlJva1wiLCBcInJva1wiLCB0cnVlKSAqLyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5vbk9iZG9iaUNoYW5nZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubG9hZGluZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmZsYWdzLnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGb3JtRGVmO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZmlsdHJvdmFjaWhvIHBhbmVsdVxyXG4gICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJQYW5lbCh0aGF0OiB0aGlzKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQubmV3RGl2KFwianMtZmlsdHJcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDdXN0b21pemVyOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9sU29ydCA9IGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5uYW1lIDw9IGIubmFtZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb2xTb3J0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAsIGZvcm1zOiBbdGhhdC5DcmVhdGVGaWx0ZXJaYWxvemthKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzEgTDEyLTEyLTAgTS0xMi0xMi0wIFMtMTItMTItMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOlwiTDFNMVMxIEwxMi0xMi0wIE0tMTItMTItMCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBbRmlsdGVyVmlld01vZGUuRGV0YWlsLyosIEZpbHRlclZpZXdNb2RlLk5vcm1hbCovXSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGVBdXRvTG9hZEFmdGVyQ3JlYXRlUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlckRlZmF1bHRGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMDEuMDMuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFocmF6ZW7DrSBvYnNvbGV0ZSBwYXJhbWV0csWvLlxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlCdXR0b25CZWhhdmlvdXI6IFwiQWx3YXlzUHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyRmlsdGVyQnV0dG9uVmlzaWJsZTogXCJBbHdheXNWaXNpYmxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2F1dG9Mb2FkQWZ0ZXJDbGVhckZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbHRlckhlbHBlckl0ZW1UZW1wbGF0ZTogXCI8Yj57bmF6ZXZ9PC9iPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dEl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcImZpbHRlckZvcm0uYXBwbHlcIiwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubG9hZGluZ0RhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKG9iai5maWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmdldExvYWRpbmdQcm9taXNlKCkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICByZXNldDogKGV2LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGZpbHRydVxyXG4gICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgR2V0RmlsdGVyKCk6IEpRdWVyeSB7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGlmIChHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKFwiZ2ZpbHRlcnBhbmVsXCIsIHRoaXMuJGZpbHRlclBhbmVsKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRmaWx0ZXJQYW5lbDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJGaWx0ciBuZW5hbGV6ZW5cIjtcclxuICAgICAgICAgICAgLy9yZXR1cm4gY29udGVudD8uZWxlbWVudC5maW5kKFwiLmpzLWZpbHRyLmdmaWx0ZXJwYW5lbFwiKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gJChcIi5qcy1maWx0clwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIFpqaXN0ZW5pIG1lc2ljZVxyXG4gICAgICAgIC8vICogKi9cclxuICAgICAgICAvL3ByaXZhdGUgZ2V0TWVzaWMoKTogbnVtYmVyIHtcclxuICAgICAgICAvLyAgICB2YXIgZmlsdGVyID0gdGhpcy5HZXRGaWx0ZXIoKS5nZmlsdGVycGFuZWwoJ2dldEN1cnJlbnREYXRhJyk7XHJcbiAgICAgICAgLy8gICAgaWYgKGZpbHRlci5NZXNpYyA9PT0gbnVsbClcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIC8vICAgIHJldHVybiBmaWx0ZXIuTWVzaWM7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIE5hY3RlbmkgZGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRGF0YSgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHZhciBtYXNrYTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjcktvbnNvbGlkYWNlU3RhdnlMaXN0RmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZpbHRlciA9IHRoYXQuR2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkZGF0YS5maWx0ZXJcIiwgZmlsdGVyKTtcclxuICAgICAgICAgICAgLy9sZXQgdmlldyA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXI8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjcktvbnNvbGlkYWNlU3RhdnlMaXN0RmlsdGVyRHRvPihcImNvbGxlY3RcIiwgbWFza2EpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZmlsdGVyU2VydmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFza2EgPSBmaWx0ZXJTZXJ2ZXI7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLk1lc2ljID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuTWVzaWMgPSAtMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBteWZpbHRyID0geyByb2s6IHsgbzogXCI9XCIsIHY6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayB9LCBpY286IHsgbzogXCI9XCIsIHY6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LklDTyB9LCBtZXNpYzogeyBvOiBcIjw9XCIsIHY6IGZpbHRlci5NZXNpYyB9IH0gYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlVjcktvbnNvbGlkYWNlU3RhdnkubGlzdERhdGEoeyBycTogeyBNYXNrYTogbWFza2EgfSwgZmlsdGVyOiB7IGZpbHRlcnM6IG15ZmlsdHIgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2F0LnNldEFjdGlvbnMocmVzdWx0Lkxpc3RWYWx1ZXM/Lmxlbmd0aCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEFjdGlvbnMocmVzdWx0LmRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGdyaWRmb3JtYXR1IGRsZSBwcmVkbG9oeVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBEdG8+IHtcclxuICAgICAgICAgICAgdmFyIG15R3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSZWdpc3RyWlBEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImljb19rb25zXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMTJcIiwgLy9SQyAzMDI1MDMxMiA6IFBhcnRuZXJcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaWNvX2tvbnNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzEyXCIgfSksIC8vUkMgMzAyNTAzMTIgOiBQYXJ0bmVyXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpZF9rb25zXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMTRcIiwgLy9SQyAzMDI1MDMxNCA6IE9rcnVoXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlkX2tvbnNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzE0XCIgfSksIC8vUkMgMzAyNTAzMTQgOiBPa3J1aFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVWNzLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5UZXh0eT8uVWNzLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudWNzKVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5pY28sIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuY2FwdGlvbiwgbmFtZTogXCJ1Y3NcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1Y3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMF9rb25zXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMTFcIiwgLy9SQyAzMDI1MDIxMSA6IE1EICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwX2tvbnNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjExXCIgfSkgLy9SQyAzMDI1MDIxMSA6IE1EXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMV9rb25zXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMTJcIiwgLy9SQyAzMDI1MDIxMiA6IERhbCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMV9rb25zXCIsIGNhcHRpb246IFwianJlczozMDI1MDIxMlwiIH0pIC8vUkMgMzAyNTAyMTIgOiBEYWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMwYzFfa29uc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjEzXCIsIC8vUkMgMzAyNTAyMTMgOiBNRCAtIERhbFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwYzFfa29uc1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMTNcIiB9KSAvL1JDIDMwMjUwMjEzIDogTUQgLSBEYWxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbXlHcmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==