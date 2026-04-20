"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * Predek IISSP kontentu
             *
             * @author tkares
             * @since 484.1.0.69
            */
            class GSeznamIISSPBase {
                /**
                 * Konstruktor
                 *
                 * @param content - parent content
                 */
                constructor(content) {
                    // grid se senamem
                    //protected $grid: JQuery<HTMLElement>;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                    this.loadingData = false; // atribut nacitani dat
                    this.islViewUse = false; // pouziti isl view        
                    this.multiSelect = false; // multi vyber na gridu
                    this.sumRow = true; // zobrazeni souctoveho radku
                    // klicove sloupce na seznamu
                    this.myKeys = undefined;
                    // ulozeni spustene ulohy
                    content?.parentContent?.userSettings.set("lastAction", content.taskId);
                    //super();            
                    this.parentCnt = content;
                    this.TypUlohy = content.TypUlohy;
                    this.globalParams = content.globalParams;
                    this.Globals = content.Globals;
                    this.filterOptions = content.filterOptions;
                    this.debug = content.debug;
                    this.autoReload = content.autoReload;
                    this.aktDatum = content.aktDatum;
                }
                // nastaveni id a titulku okna
                //taskId = "seznamStavyKonsolidace";
                onContentReady() {
                    this.islViewUse = (typeof this.taskList !== "undefined");
                    //let that = this;
                    //that.uid = "seznamStavyKon";
                    this.createActions();
                    this.CreateMenuBar();
                    // vytvoreni fitru panelu
                    this.createFilterPanel(this);
                    this.createGrid();
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    grid.ggridserverfilter({});
                    // vytvoreni klavesovych zkratek
                    this.createShortCut();
                    this.nastaveniAkci();
                }
                /**
                 * Definice menubaru
                 *
                 * */
                CreateMenuBar() {
                    this.parentCnt.menuBar(this.DefineMenuBar());
                }
                /**
                 * Definice menubaru
                 *
                 * */
                DefineMenuBar() {
                    throw Error("neimplementovano");
                }
                /**
                 * Vytvoreni klavesovych zkratek
                 *
                 * */
                createShortCut() {
                    let that = this;
                    this.parentCnt.element.gshortcut({
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
                                    that.nastaveniAkci();
                                });
                            }
                        }),
                    });
                    this.parentCnt.element.gshortcut({
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
                    this.parentCnt.element.gshortcut({
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
                                    that.nastaveniAkci();
                                });
                            }
                        }),
                    });
                    let grid = this.getGrid();
                    if (!this.multiSelect) {
                        if (grid == null)
                            return;
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
                                        that.nastaveniAkci();
                                    });
                                    //this.loadData();
                                }
                            }),
                        });
                    }
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createActions() {
                    throw Error("neimplementovano");
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci() {
                    let that = this.parentCnt;
                    // pokud neni grid, nic nedelej
                    if (that.closed || !that.$grid)
                        return;
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    var view = grid.ggrid("getView");
                    let pocet = view.getCount();
                    // prepocet
                    that.actions.actPrepocet?.update({
                        enabled: (this.globalParams.Rad_Risre >= 2 /* Gordic.Uct.Interface.GUcrZobrazeniRisre.AnoEditace */) || this.debug,
                        visible: this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */,
                        ToolTip: "jres:30250374".format(this.Globals.EkoParams?.ICO, this.Globals.EkoParams?.Rok, this.Globals.Zkratky?.Ico) //RC 30250374 : Přepočet za aktuální účetní období a {2} ({1} a {0})
                    });
                    // uplny prepocet
                    that.actions.actPrepocetUplny?.update({
                        enabled: (this.globalParams.Rad_Risre >= 2 /* Gordic.Uct.Interface.GUcrZobrazeniRisre.AnoEditace */),
                        visible: this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */ && this.debug
                    });
                    // actVytvorit
                    that.actions.actVytvorit?.update({
                        enabled: (this.globalParams.Rad_Risre === 2 /* Gordic.Uct.Interface.GUcrZobrazeniRisre.AnoEditace */) || this.globalParams.Rad_Risre === 4 /* Gordic.Uct.Interface.GUcrZobrazeniRisre.AnoEditaceJenSD */,
                        visible: this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                    });
                    // zapisy
                    that.actions.actZapisy?.update({
                        enabled: pocet > 0,
                        visible: this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                    });
                }
                /**
                 * Zobrazeni zapisu
                 *
                 * */
                showZapisy() {
                    throw Error("neimplementovano");
                }
                /**
                 *  Vytvoreni gridu
                 *
                 * */
                createGrid() {
                    let that = this.parentCnt;
                    let myThat = this;
                    ;
                    if (!this.islViewUse) {
                        let provider = new Gordic.Data.Provider(() => {
                            that.loadingData = true;
                            return this.loadData();
                        });
                        let view = new Gordic.Data.View([], {
                            processors: { provider: provider },
                            key: "ico,rok,mesden,sk_vl,bu_vl,id_hdr_ris,radek_hdr,xfimuz,ucs,uus"
                        });
                        var sloupce = this.createGridFormat();
                        //var defaultProfile = sloupce.columns;//sloupce.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1)
                        /*const grid = */ $.newDiv(this.classGrid)
                            .appendTo(that.element)
                            .gautofit()
                            .ggrid({
                            columnMode: "full",
                            data: view,
                            columns: sloupce,
                            defaultProfile: { name: "default", columnList: sloupce.columns.map((c) => c.name).join(",") },
                            profiles: [
                                { name: "userProfile", columnList: sloupce.columns.map((c) => c.name).join(",") },
                            ],
                            profileVisible: false,
                        }).ggridrowscalc();
                    }
                    else {
                        let islView = this.createListView();
                        let sloupce = this.createGridFormat();
                        //var defaultProfile = sloupce.columns;//sloupce.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1)
                        let sumCols = undefined;
                        // souctove sloupce
                        sumCols = sloupce.columns.filter(c => (c.columnType == "currency" || c.columnType == "number") && (c.caption.indexOf("%") == -1) && ("radek_hdr,denmes".indexOf(c.name)) == -1).map(e => e.name);
                        const grid = $.newDiv(this.classGrid)
                            .appendTo(this.parentCnt.element)
                            .gautofit()
                            .ggrid({
                            columnMode: "full",
                            data: islView,
                            multi: this.multiSelect,
                            columns: sloupce,
                            defaultProfile: { name: "default", columnList: sloupce.columns.map((c) => c.name).join(",") },
                            profiles: [
                                { name: "userProfile", columnList: sloupce.columns.map((c) => c.name).join(",") },
                            ],
                            profileVisible: true,
                            defaultAction: new GAction({
                                name: "gridRowSelectedAct",
                                run: (ev, ctx) => this.Detail()
                            }),
                            selection: function (ev, info) {
                                myThat.nastaveniAkci();
                            },
                        })
                            .ggridrowscalc();
                        if (this.sumRow)
                            grid.ggrideko({
                                // součtový řádek
                                summaryRowAllowed: true,
                                summaryRowColumns: sumCols,
                                longListModel: "Global.Ucr.AppSettings",
                                // dlouhý seznam
                                longListAllowed: true,
                                //longListModifyRqMethod: (rq) => that.allowedList(rq),
                                longListCountMethod: (rq) => myThat.getCallCount(),
                            });
                    }
                }
                /**
                 * Vraci ISL metodu pro zjisteni poctu zaznamu
                 *
                 * */
                getCallCount() {
                    this.parentCnt.log.trace("Start GSeznamIISSPStavyStavyRezervaci.getCallCount");
                    let that = this;
                    return that.taskCount
                        .use((req, next, ctx) => {
                        //return that.getFilterData(that, req, next) as any;
                        return that.getFilterData(req, next)
                            .then((result) => next(result));
                    })
                        .get();
                }
                Detail() {
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.parentCnt.element.find("." + this.classGrid);
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
                        debugger;
                        if (colDef.columnType === "datetime")
                            value = sel[colDef.name];
                        else if (colDef.columnType === "currency")
                            value = sel[colDef.name];
                        if (colDef.name === "typ_ag")
                            value = { typ_ag: sel.typ_ag, zkr_ag: sel.typ_ag_txt };
                        else if (colDef.name === "esu_txt")
                            value = { esu_txt: sel.esu_txt, ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "esu_ico")
                            value = { esu_ico: sel.esu_ico, ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "esu_rc")
                            value = { esu_rc: sel.esu_rc, ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "ixs_esu")
                            value = { ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "s_vyriz_rezsp")
                            value = { s_vyriz_rezsp: sel.s_vyriz_rezsp, s_vyriz_rezsp_txt: sel.s_vyriz_rezsp_txt };
                        var $filterFrmBox = grid.ggridserverfilter("findFields", colDef.name);
                        $filterFrmBox.gfield("setValue", value, { valid: false });
                    }
                }
                /**
                * function CreateFilterZalozka
                *
                * Obecna zalozka
                * @returns {any}
                */
                createFilterZalozka() {
                    return void 0;
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
                            debugger;
                            var polSort = data.sort(function (a, b) { return a.name <= b.name; });
                            return polSort;
                        },
                        forms: [that.createFilterZalozka()],
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
                            that.parentCnt.log.trace("filterForm.apply", obj);
                            if (that.islViewUse)
                                return;
                            if (that.loadingData)
                                return;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var view = grid.ggrid("getView");
                            view.requestData(obj.filter);
                            view.getLoadingPromise().always(() => {
                                that.loadingData = false;
                                that.nastaveniAkci();
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
                 * @returns
                 */
                getFilter() {
                    //debugger;
                    if (Gordic.Utils.WidgetExists("gfilterpanel", this.$filterPanel))
                        return this.$filterPanel;
                    else
                        throw new GError("Filtr nenalezen");
                    //return content?.element.find(".js-filtr.gfilterpanel");
                    //return $(".js-filtr");
                }
                /**
                 * Vrat muj sestaveny filtr
                 *
                 * @returns
                 */
                getMyFilter(filterServer, filter) {
                    return void 0;
                }
                /**
                 * Nacteni Isl sluzby pro list
                 */
                loadISLList(rq) {
                    throw new GError("Neimplementovano");
                }
                /**
                 *  Nacteni dat
                 */
                loadData() {
                    const that = this;
                    // kontrola gridu
                    let grid = this.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    let filter = that.getFilter().gfilterpanel('getCurrentData');
                    console.log("loaddata.filter", filter);
                    let maska = {};
                    return grid.ggridserverfilter("collect", maska)
                        .then((filterServer) => {
                        const request = that.getMyFilter(filterServer, filter);
                        if (typeof request === "undefined")
                            return;
                        return that.loadISLList(request)
                            .get()
                            .then(function (result) {
                            debugger;
                            that.nastaveniAkci();
                            return result;
                        })
                            .always(function () {
                        });
                        ;
                    });
                }
                /**
                 * Vytvoreni view pro list
                 *
                 * */
                createListView() {
                    let that = this;
                    this.parentCnt.log.trace("Start createListView GSeznamEkoZaznamuBase");
                    if (!that.taskList)
                        throw Error("ISL sluzba nenastavena");
                    return new Gordic.Isl.View(that.taskList.use((req, next, ctx) => {
                        if (that.parentCnt.closed)
                            return $.Deferred().reject().promise();
                        // volani udalosti pred vlastnim nactenim
                        if (!that.beforeLoading())
                            return $.Deferred().reject().promise();
                        this.parentCnt.log.trace("taskList.use req:", req);
                        let result = that.getFilterData(req, next)
                            .then((result) => next(result));
                        result
                            .then((data) => {
                            // aktualizace pristupnosti akci dle nactenych dat
                            this.nastaveniAkci();
                        });
                        return result;
                    }), {
                        filterPanel: that.getFilter(),
                        key: that.myKeys,
                        startEmpty: true,
                        //processors: {
                        //    sumare: that.sumare_processor
                        //}
                    });
                }
                /**
                   * Nacti filtry
                   * @param that
                   * @param req
                   * @param next
                   */
                getFilterData(req, next) {
                    this.parentCnt.log.trace("Start getFilterData");
                    return this.getFilterGrid()
                        .then((newFilter) => {
                        var newRequest = $.extend(true, {}, req);
                        newRequest["filters"] = newFilter;
                        return newRequest;
                    });
                }
                /**
                 * Vracifiltry na gridu
                 * @returns
                 */
                getFilterGrid() {
                    this.parentCnt.log.trace("Start getFilter ");
                    var filterDto = {};
                    let grid = this.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    return grid.ggridserverfilter("collect", filterDto)
                        .then((d) => {
                        this.parentCnt.log.trace("filter", d);
                        return d;
                    });
                }
                /**
                 * Udalost pred vlstnim nacteni. Lze zrusit nacteni
                 * @returns
                 */
                beforeLoading() {
                    return true;
                }
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 *
                 */
                createGridFormat() {
                    throw Error("Neimplementovano");
                }
                /**
                 * Znovunacteni dat
                 *
                 * */
                reload() {
                    let that = this;
                    let deferrer = $.Deferred();
                    let grid = this.getGrid();
                    if (grid == null)
                        return deferrer.reject().promise();
                    var view = grid.ggrid("getView");
                    view.requestData();
                    view.getLoadingPromise().always(() => {
                        that.loadingData = false;
                        that.nastaveniAkci();
                        return deferrer.resolve();
                    });
                    return deferrer.promise();
                }
            }
            WebClient.GSeznamIISSPBase = GSeznamIISSPBase;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1JSVNTUEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTJwQmY7QUEzcEJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTJwQm5CO0lBM3BCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMnBCN0I7UUEzcEJvQixXQUFBLFNBQVM7WUFDMUI7Ozs7O2NBS0U7WUFDRixNQUFhLGdCQUFnQjtnQkF5Q3pCOzs7O21CQUlHO2dCQUNILFlBQVksT0FBZ0M7b0JBbkM1QyxrQkFBa0I7b0JBQ2xCLHVDQUF1QztvQkFDdkM7O3VCQUVHO29CQUNPLGNBQVMsR0FBVyxjQUFjLENBQUM7b0JBS25DLGdCQUFXLEdBQVksS0FBSyxDQUFDLENBQUMsdUJBQXVCO29CQUl2RCxlQUFVLEdBQUcsS0FBSyxDQUFDLENBQUEsMkJBQTJCO29CQUM1QyxnQkFBVyxHQUFHLEtBQUssQ0FBQyxDQUFBLHVCQUF1QjtvQkFDM0MsV0FBTSxHQUFHLElBQUksQ0FBQyxDQUFDLDZCQUE2QjtvQkFDdEQsNkJBQTZCO29CQUNuQixXQUFNLEdBQXVCLFNBQVMsQ0FBQztvQkFrQjdDLHlCQUF5QjtvQkFDekIsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hFLHNCQUFzQjtvQkFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztvQkFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO29CQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFB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QkFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDckIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzlCLENBQUMsQ0FBQyxDQUFDO29CQUNILE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUM3QixDQUFDO2FBQ0o7WUFucEJZLDBCQUFnQixtQkFtcEI1QixDQUFBO1FBQ0wsQ0FBQyxFQTNwQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTJwQjdCO0lBQUQsQ0FBQyxFQTNwQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTJwQm5CO0FBQUQsQ0FBQyxFQTNwQlMsTUFBTSxLQUFOLE1BQU0sUUEycEJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogUHJlZGVrIElJU1NQIGtvbnRlbnR1XHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC42OVxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtSUlTU1BCYXNlIGltcGxlbWVudHMgSUdTZXpuYW1JSVNTUEJhc2Uge1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgZWtvUGFyYW1zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWtvUGFyYW1zRHRvO1xyXG4gICAgICAgIC8vcHJpdmF0ZSB0ZW1hOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8vIHBhcmFtZXRyeVxyXG4gICAgICAgIHByb3RlY3RlZCBnbG9iYWxQYXJhbXM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQYXJhbXNEdG87XHJcbiAgICAgICAgcHJvdGVjdGVkIGZpbHRlck9wdGlvbnM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HRmlsdGVyT3B0aW9uc0R0bztcclxuICAgICAgICBwcm90ZWN0ZWQgZGVidWc6IGJvb2xlYW4gICAgICAvLyBkZWJ1ZyBtb2RlXHJcbiAgICAgICAgLy8gZmlsdHJvdmFjaSBwYW5lbFxyXG4gICAgICAgIHByb3RlY3RlZCAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICAvLyBncmlkIHNlIHNlbmFtZW1cclxuICAgICAgICAvL3Byb3RlY3RlZCAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB0cmlkYSBncmlkdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjbGFzc0dyaWQ6IHN0cmluZyA9IFwianMtZ3JpZC1iYXNlXCI7XHJcbiAgICAgICAgLy8gTmFzdGF2ZW5pXHJcbiAgICAgICAgcHJvdGVjdGVkIEdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JHbG9iYWxEdG87XHJcbiAgICAgICAgcHJvdGVjdGVkIFR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlO1xyXG4gICAgICAgIHByb3RlY3RlZCBWb2xhbm9aVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGU7IC8vIHZvbGFubyB6IHVsb2h5XHJcbiAgICAgICAgcHJvdGVjdGVkIGxvYWRpbmdEYXRhOiBib29sZWFuID0gZmFsc2U7IC8vIGF0cmlidXQgbmFjaXRhbmkgZGF0XHJcbiAgICAgICAgcHJvdGVjdGVkIHBhcmVudENudDogR1Nlem5hbUlJU1NQQmFzZUNvbnRlbnQ7XHJcbiAgICAgICAgcHJvdGVjdGVkIGFrdERhdHVtOiBEYXRlO1xyXG4gICAgICAgIHB1YmxpYyBhdXRvUmVsb2FkOiBib29sZWFuOyAvLyBhdHJpYnV0IGF1dG9tYXRpY2tlaG8gbmFjaXRhbmlcclxuICAgICAgICBwcml2YXRlIGlzbFZpZXdVc2UgPSBmYWxzZTsvLyBwb3V6aXRpIGlzbCB2aWV3ICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgbXVsdGlTZWxlY3QgPSBmYWxzZTsvLyBtdWx0aSB2eWJlciBuYSBncmlkdVxyXG4gICAgICAgIHByb3RlY3RlZCBzdW1Sb3cgPSB0cnVlOyAvLyB6b2JyYXplbmkgc291Y3RvdmVobyByYWRrdVxyXG4gICAgICAgIC8vIGtsaWNvdmUgc2xvdXBjZSBuYSBzZXpuYW11XHJcbiAgICAgICAgcHJvdGVjdGVkIG15S2V5czogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIC8vcHJvdGVjdGVkIHN1bWFyZV9wcm9jZXNzb3I6IEdvcmRpYy5EYXRhLkJhc2VQcm9jZXNzb3I8SUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncz47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRhc2sgcHJvIHBvY2V0XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgdGFza0NvdW50OiBJc2wuX1Rhc2s8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG51bWJlcj47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdGFzayBwcm8gc2V6bmFtXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgdGFza0xpc3Q6IElzbC5fVGFzazxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtvbnN0cnVrdG9yXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnQgLSBwYXJlbnQgY29udGVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEdTZXpuYW1JSVNTUEJhc2VDb250ZW50KSB7XHJcbiAgICAgICAgICAgIC8vIHVsb3plbmkgc3B1c3RlbmUgdWxvaHlcclxuICAgICAgICAgICAgY29udGVudD8ucGFyZW50Q29udGVudD8udXNlclNldHRpbmdzIS5zZXQoXCJsYXN0QWN0aW9uXCIsIGNvbnRlbnQudGFza0lkKTtcclxuICAgICAgICAgICAgLy9zdXBlcigpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwVWxvaHkgPSBjb250ZW50LlR5cFVsb2h5O1xyXG4gICAgICAgICAgICB0aGlzLmdsb2JhbFBhcmFtcyA9IGNvbnRlbnQuZ2xvYmFsUGFyYW1zOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLkdsb2JhbHMgPSBjb250ZW50Lkdsb2JhbHM7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IGNvbnRlbnQuZmlsdGVyT3B0aW9ucztcclxuICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IGNvbnRlbnQuZGVidWc7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b1JlbG9hZCA9IGNvbnRlbnQuYXV0b1JlbG9hZDtcclxuICAgICAgICAgICAgdGhpcy5ha3REYXR1bSA9IGNvbnRlbnQuYWt0RGF0dW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG5hc3RhdmVuaSBpZCBhIHRpdHVsa3Ugb2tuYVxyXG4gICAgICAgIC8vdGFza0lkID0gXCJzZXpuYW1TdGF2eUtvbnNvbGlkYWNlXCI7XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmlzbFZpZXdVc2UgPSAodHlwZW9mIHRoaXMudGFza0xpc3QgIT09IFwidW5kZWZpbmVkXCIpO1xyXG4gICAgICAgICAgICAvL2xldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy90aGF0LnVpZCA9IFwic2V6bmFtU3RhdnlLb25cIjtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZU1lbnVCYXIoKVxyXG5cclxuICAgICAgICAgICAgLy8gdnl0dm9yZW5pIGZpdHJ1IHBhbmVsdVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZpbHRlclBhbmVsKHRoaXMpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoe30pO1xyXG4gICAgICAgICAgICAvLyB2eXR2b3Jlbmkga2xhdmVzb3Z5Y2ggemtyYXRla1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNob3J0Q3V0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmaW5pY2UgbWVudWJhcnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBDcmVhdGVNZW51QmFyKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250Lm1lbnVCYXIodGhpcy5EZWZpbmVNZW51QmFyKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBtZW51YmFydVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIERlZmluZU1lbnVCYXIoKTogTWVudVBhcmFtc1tde1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIm5laW1wbGVtZW50b3Zhbm9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBrbGF2ZXNvdnljaCB6a3JhdGVrXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlU2hvcnRDdXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIklOU0VSVFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyNlwiLCAvL1JDIDMxMTAwMjI2IDogTmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkxvYWREYXRhQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMTgxXCIsIC8vUkMgMzExMDAxODEgOiBWecSNaXN0aXRcclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbGVhckZpbHRlclJvd0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDI2N1wiLCAvL1JDIDMxMTAwMjY3IDogVnnEjWlzdGl0IGZpbHRyIHNlem5hbXVcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWJpblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIsIC8vUkMgMzExMDAyMjggOiBWecSNaXN0aXQgYSBuYcSNw61zdFxyXG4gICAgICAgICAgICAgICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNsZWFyQW5kRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpU2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcImN0cmwrc2hpZnQrbGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOVwiLCAvL1JDIDMxMTAwMjI5IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUuXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hGaWxsU2VydmVyR3JpZEV2ZW50KGV2KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcImN0cmwrbGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIzNVwiLCAvL1JDIDMxMTAwMjM1IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUgYSB2eWhsZWTDoW7DrS5cclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWxGaWx0ZXJBbmRTZWFyY2hBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIm5laW1wbGVtZW50b3Zhbm9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcy5wYXJlbnRDbnQ7XHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgZ3JpZCwgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkIHx8ICF0aGF0LiRncmlkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgbGV0IHBvY2V0ICA9IHZpZXcuZ2V0Q291bnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHByZXBvY2V0XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmVwb2NldD8udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGlzLmdsb2JhbFBhcmFtcy5SYWRfUmlzcmUhID49IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Jab2JyYXplbmlSaXNyZS5Bbm9FZGl0YWNlKSB8fCB0aGlzLmRlYnVnXHJcbiAgICAgICAgICAgICAgICAsIHZpc2libGU6IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3Zhbmlfc3RhdnlcclxuICAgICAgICAgICAgICAgICwgVG9vbFRpcDogIFwianJlczozMDI1MDM3NFwiLmZvcm1hdCh0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gYXMgc3RyaW5nLCB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgYXMgbnVtYmVyLCB0aGlzLkdsb2JhbHMuWmtyYXRreT8uSWNvKSAvL1JDIDMwMjUwMzc0IDogUMWZZXBvxI1ldCB6YSBha3R1w6FsbsOtIMO6xI1ldG7DrSBvYmRvYsOtIGEgezJ9ICh7MX0gYSB7MH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB1cGxueSBwcmVwb2NldFxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJlcG9jZXRVcGxueT8udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGlzLmdsb2JhbFBhcmFtcy5SYWRfUmlzcmUhID49IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Jab2JyYXplbmlSaXNyZS5Bbm9FZGl0YWNlKSBcclxuICAgICAgICAgICAgICAgICwgdmlzaWJsZTogdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eSAmJiAgdGhpcy5kZWJ1Z1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gYWN0Vnl0dm9yaXRcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFZ5dHZvcml0Py51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogKHRoaXMuZ2xvYmFsUGFyYW1zLlJhZF9SaXNyZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVJpc3JlLkFub0VkaXRhY2UpIHx8IHRoaXMuZ2xvYmFsUGFyYW1zLlJhZF9SaXNyZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVJpc3JlLkFub0VkaXRhY2VKZW5TRFxyXG4gICAgICAgICAgICAgICAgLCB2aXNpYmxlOiB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB6YXBpc3lcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFphcGlzeT8udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHBvY2V0PjBcclxuICAgICAgICAgICAgICAgICwgdmlzaWJsZTogdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSB6YXBpc3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBzaG93WmFwaXN5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJuZWltcGxlbWVudG92YW5vXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgVnl0dm9yZW5pIGdyaWR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzLnBhcmVudENudDtcclxuICAgICAgICAgICAgbGV0IG15VGhhdCA9IHRoaXM7O1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNsVmlld1VzZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPGFueSwgYW55LCBhbnk+KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Rhc3BzRHRvPihbXSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHsgcHJvdmlkZXI6IHByb3ZpZGVyIH1cclxuICAgICAgICAgICAgICAgICAgICAsIGtleTogXCJpY28scm9rLG1lc2Rlbixza192bCxidV92bCxpZF9oZHJfcmlzLHJhZGVrX2hkcix4ZmltdXosdWNzLHV1c1wiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHZhciBzbG91cGNlID0gdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIC8vdmFyIGRlZmF1bHRQcm9maWxlID0gc2xvdXBjZS5jb2x1bW5zOy8vc2xvdXBjZS5jb2x1bW5zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5uYW1lPy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJ2bGFzdG5vc3RcIikgPT09IC0xKVxyXG5cclxuICAgICAgICAgICAgLypjb25zdCBncmlkID0gKi8kLm5ld0Rpdih0aGlzLmNsYXNzR3JpZClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHNsb3VwY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7IG5hbWU6IFwiZGVmYXVsdFwiLCBjb2x1bW5MaXN0OiBzbG91cGNlLmNvbHVtbnMubWFwKChjKSA9PiBjLm5hbWUpLmpvaW4oXCIsXCIpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwidXNlclByb2ZpbGVcIiwgY29sdW1uTGlzdDogc2xvdXBjZS5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZ2dyaWRyb3dzY2FsYygpXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzbFZpZXcgPSB0aGlzLmNyZWF0ZUxpc3RWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdXBjZSA9IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgZGVmYXVsdFByb2ZpbGUgPSBzbG91cGNlLmNvbHVtbnM7Ly9zbG91cGNlLmNvbHVtbnMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLm5hbWU/LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInZsYXN0bm9zdFwiKSA9PT0gLTEpXHJcbiAgICAgICAgICAgICAgICBsZXQgc3VtQ29sczogc3RyaW5nW10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAvLyBzb3VjdG92ZSBzbG91cGNlXHJcbiAgICAgICAgICAgICAgICBzdW1Db2xzID0gc2xvdXBjZS5jb2x1bW5zLmZpbHRlcihjID0+IChjLmNvbHVtblR5cGUgPT0gXCJjdXJyZW5jeVwiIHx8IGMuY29sdW1uVHlwZSA9PSBcIm51bWJlclwiKSAmJiAoYy5jYXB0aW9uIS5pbmRleE9mKFwiJVwiKSA9PSAtMSkgJiYgKFwicmFkZWtfaGRyLGRlbm1lc1wiLmluZGV4T2YoYy5uYW1lISkpID09IC0xKS5tYXAoZSA9PiBlLm5hbWUpIGFzIHN0cmluZ1tdO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQ9ICQubmV3RGl2KHRoaXMuY2xhc3NHcmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLnBhcmVudENudC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGlzbFZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpOiB0aGlzLm11bHRpU2VsZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBzbG91cGNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogeyBuYW1lOiBcImRlZmF1bHRcIiwgY29sdW1uTGlzdDogc2xvdXBjZS5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcInVzZXJQcm9maWxlXCIsIGNvbHVtbkxpc3Q6IHNsb3VwY2UuY29sdW1ucy5tYXAoKGMpID0+IGMubmFtZSkuam9pbihcIixcIikgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZVZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRGV0YWlsKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteVRoYXQubmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdncmlkcm93c2NhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN1bVJvdylcclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkZWtvKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3XEjXRvdsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0NvbHVtbnM6IHN1bUNvbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdE1vZGVsOiBcIkdsb2JhbC5VY3IuQXBwU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRsb3Vow70gc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdEFsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xvbmdMaXN0TW9kaWZ5UnFNZXRob2Q6IChycSkgPT4gdGhhdC5hbGxvd2VkTGlzdChycSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdENvdW50TWV0aG9kOiAocnEpID0+IG15VGhhdC5nZXRDYWxsQ291bnQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIElTTCBtZXRvZHUgcHJvIHpqaXN0ZW5pIHBvY3R1IHphem5hbXVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRDYWxsQ291bnQoKTogSlF1ZXJ5UHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVJlemVydmFjaS5nZXRDYWxsQ291bnRcIik7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQudGFza0NvdW50XHJcbiAgICAgICAgICAgICAgICAudXNlKChyZXEsIG5leHQsIGN0eCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiB0aGF0LmdldEZpbHRlckRhdGEodGhhdCwgcmVxLCBuZXh0KSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ2V0RmlsdGVyRGF0YShyZXEsIG5leHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IG5leHQocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgRGV0YWlsKCk6IHZvaWQge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGdyaWR1XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRHcmlkKCk6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCBudWxsIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLnBhcmVudENudC5lbGVtZW50LmZpbmQoXCIuXCIgKyB0aGlzLmNsYXNzR3JpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJldmVkZW5pIGtsaWt1IG5hIGJ1bmt1IGRvIGZpbHRydSBhIG5hY3RlbmlcclxuICAgICAgICAgKiBAcGFyYW0gZXZcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZGlzcGF0Y2hGaWxsU2VydmVyR3JpZEV2ZW50KGV2OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgJGNvbCA9ICQoZXYudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZXYuY3RybEtleSB8fCAhJGNvbC5oYXNDbGFzcyhcImNlbGxcIikgfHwgJGNvbC5oYXNDbGFzcyhcImpzLWNmdS1jZWxsXCIpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAoZXYuc2hpZnRLZXkgJiYgc2VsZWN0aW9uKSBzZWxlY3Rpb24uZW1wdHkoKTsgLy9Qb2t1ZCBzZSB2eWJpcmEgcHJlcyBrbC4gemtyYXRrdSBjdHJsK3NoaWZ0K2xjbGljaywgdGFrIGF0IHNlIG5lb3puYWN1amUgdGV4dFxyXG5cclxuICAgICAgICAgICAgdmFyIGNvbEluZGV4ID0gJGNvbC5hdHRyKFwiZGF0YS1jb2x1bW4taW5kZXhcIikhO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBjb2xEZWYgPSBncmlkLmdncmlkKFwidHJ1ZUNvbHVtbnNcIiwgZmFsc2UpW2NvbEluZGV4XSBhcyBHR3JpZENvbHVtbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2xEZWYuc2VydmVyRmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IGFueSA9ICRjb2wudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybjsgLy9OT1RFOiBQb2t1ZCBuZW5pIGhvZG5vdGEsIHRhayBhc2kgbmVuaSBjbyByZXNpdC4gUmVzaSBobGF2bmUgYnVnIHMgdGV4dG92b3UgaG9kbm90b3UgdiBjaXNlbG55Y2ggc2xvdXBjaWNoXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNlbCA9IGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vTk9URTogVG9obGUgamUgc3BhdG55IHpwdXNvYiwgY2VsZSBieSB0byBjaHRlbG8gcHJlcHNhdCwgYWJ5IHNlIG5lc2xvIHBvIHN0cmluZ3UgeiBidW5reSwgYWxlIHBvIGRhdGVjaC4gXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgIFBvcHRhdCBzZSBTa2FsaWNlLCBqZXN0bGkgZXhpdHVqZSBuZWpha3kgbGVwc2kgenB1c29iLi4uXHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIGlmIChjb2xEZWYuY29sdW1uVHlwZSA9PT0gXCJkYXRldGltZVwiKSB2YWx1ZSA9IHNlbFtjb2xEZWYubmFtZSFdO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sRGVmLmNvbHVtblR5cGUgPT09IFwiY3VycmVuY3lcIikgdmFsdWUgPSBzZWxbY29sRGVmLm5hbWUhXTtcclxuICAgICAgICAgICAgICAgIGlmIChjb2xEZWYubmFtZSA9PT0gXCJ0eXBfYWdcIikgdmFsdWUgPSB7IHR5cF9hZzogc2VsLnR5cF9hZywgemtyX2FnOiBzZWwudHlwX2FnX3R4dCB9O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sRGVmLm5hbWUgPT09IFwiZXN1X3R4dFwiKSB2YWx1ZSA9IHsgZXN1X3R4dDogc2VsLmVzdV90eHQsIGl4c19lc3U6IHNlbC5peHNfZXN1IH07XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2xEZWYubmFtZSA9PT0gXCJlc3VfaWNvXCIpIHZhbHVlID0geyBlc3VfaWNvOiBzZWwuZXN1X2ljbywgaXhzX2VzdTogc2VsLml4c19lc3UgfTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbERlZi5uYW1lID09PSBcImVzdV9yY1wiKSB2YWx1ZSA9IHsgZXN1X3JjOiBzZWwuZXN1X3JjLCBpeHNfZXN1OiBzZWwuaXhzX2VzdSB9O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sRGVmLm5hbWUgPT09IFwiaXhzX2VzdVwiKSB2YWx1ZSA9IHsgaXhzX2VzdTogc2VsLml4c19lc3UgfTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbERlZi5uYW1lID09PSBcInNfdnlyaXpfcmV6c3BcIilcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHsgc192eXJpel9yZXpzcDogc2VsLnNfdnlyaXpfcmV6c3AsIHNfdnlyaXpfcmV6c3BfdHh0OiBzZWwuc192eXJpel9yZXpzcF90eHQgfTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICRmaWx0ZXJGcm1Cb3ggPSBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiZmluZEZpZWxkc1wiLCBjb2xEZWYubmFtZSEpO1xyXG4gICAgICAgICAgICAgICAgJGZpbHRlckZybUJveC5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2YWx1ZSwgeyB2YWxpZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGZ1bmN0aW9uIENyZWF0ZUZpbHRlclphbG96a2FcclxuICAgICAgICAqICAgICAgXHJcbiAgICAgICAgKiBPYmVjbmEgemFsb3prYVxyXG4gICAgICAgICogQHJldHVybnMge2FueX1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyAgY3JlYXRlRmlsdGVyWmFsb3prYSgpOiBhbnkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZmlsdHJvdmFjaWhvIHBhbmVsdVxyXG4gICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUZpbHRlclBhbmVsKHRoYXQ6IHRoaXMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsID0gJC5uZXdEaXYoXCJqcy1maWx0clwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMucGFyZW50Q250LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDdXN0b21pemVyOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvbFNvcnQgPSBkYXRhLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEubmFtZSA8PSBiLm5hbWU7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9sU29ydDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmb3JtczogW3RoYXQuY3JlYXRlRmlsdGVyWmFsb3prYSgpXVxyXG4gICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxIEwxMi0xMi0wIE0tMTItMTItMCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2Zhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjpcIkwxTTFTMSBMMTItMTItMCBNLTEyLTEyLTAgUy0xMi0xMi0wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLlN0b3JlKCksICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLkRldGFpbC8qLCBGaWx0ZXJWaWV3TW9kZS5Ob3JtYWwqL10sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlQXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3VzZXJEZWZhdWx0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDAxLjAzLjIwMjEgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5haHJhemVuw60gb2Jzb2xldGUgcGFyYW1ldHLFry5cclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2ltcGxlTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5QnV0dG9uQmVoYXZpb3VyOiBcIkFsd2F5c1ByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2Zhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZpbHRlckJ1dHRvblZpc2libGU6IFwiQWx3YXlzVmlzaWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYXV0b0xvYWRBZnRlckNob3NlRmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDcmVhdGVQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hdXRvTG9hZEFmdGVyQ2xlYXJGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJIZWxwZXJJdGVtVGVtcGxhdGU6IFwiPGI+e25hemV2fTwvYj5cIixcclxuICAgICAgICAgICAgICAgICAgICAvL3RleHRJdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbHRlckZvcm0uYXBwbHlcIiwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQubG9nLnRyYWNlKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5pc2xWaWV3VXNlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5yZXF1ZXN0RGF0YShvYmouZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQ6IChldiwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiY2xlYXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBmaWx0cnVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXRGaWx0ZXIoKTogSlF1ZXJ5IHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZmlsdGVycGFuZWxcIiwgdGhpcy4kZmlsdGVyUGFuZWwpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGZpbHRlclBhbmVsO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwiRmlsdHIgbmVuYWxlemVuXCIpO1xyXG4gICAgICAgICAgICAvL3JldHVybiBjb250ZW50Py5lbGVtZW50LmZpbmQoXCIuanMtZmlsdHIuZ2ZpbHRlcnBhbmVsXCIpO1xyXG4gICAgICAgICAgICAvL3JldHVybiAkKFwiLmpzLWZpbHRyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmF0IG11aiBzZXN0YXZlbnkgZmlsdHJcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRNeUZpbHRlcihmaWx0ZXJTZXJ2ZXI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvLCBmaWx0ZXI6IGFueSk6IHsgbWFza2E6IHt9LCBmaWx0ZXI6IHsgZmlsdGVyczoge30gfSB9IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZvaWQgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hY3RlbmkgSXNsIHNsdXpieSBwcm8gbGlzdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBsb2FkSVNMTGlzdChycTp7IG1hc2thOiB7IH0sIGZpbHRlcjogeyBmaWx0ZXJzOiB7IH0gfSB9KTogSXNsLl9UYXNrPGFueSwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcIk5laW1wbGVtZW50b3Zhbm9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBOYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBsb2FkRGF0YSgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpczsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2xhIGdyaWR1XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpbHRlciA9IHRoYXQuZ2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRkYXRhLmZpbHRlclwiLCBmaWx0ZXIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG1hc2thOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUHJldWN0b3ZhbmlTdGF2TGlzdEZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcjxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUHJldWN0b3ZhbmlTdGF2TGlzdEZpbHRlckR0bz4oXCJjb2xsZWN0XCIsIG1hc2thKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGZpbHRlclNlcnZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSB0aGF0LmdldE15RmlsdGVyKGZpbHRlclNlcnZlciwgZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubG9hZElTTExpc3QocmVxdWVzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy5jYXRjaCgoZXJyb3I6IEdFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhyb3cgbmV3IEdFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgIDsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIHZpZXcgcHJvIGxpc3RcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVMaXN0VmlldygpOiBHb3JkaWMuSXNsLlZpZXcge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IGNyZWF0ZUxpc3RWaWV3IEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGF0LnRhc2tMaXN0KVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJJU0wgc2x1emJhIG5lbmFzdGF2ZW5hXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuSXNsLlZpZXc8SUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncz4oXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRhc2tMaXN0LnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wYXJlbnRDbnQuY2xvc2VkKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2b2xhbmkgdWRhbG9zdGkgcHJlZCB2bGFzdG5pbSBuYWN0ZW5pbVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5iZWZvcmVMb2FkaW5nKCkpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJ0YXNrTGlzdC51c2UgcmVxOlwiLCByZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGF0LmdldEZpbHRlckRhdGEocmVxLCBuZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiBuZXh0KHJlc3VsdCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHByaXN0dXBub3N0aSBha2NpIGRsZSBuYWN0ZW55Y2ggZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyUGFuZWw6IHRoYXQuZ2V0RmlsdGVyKCksXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiB0aGF0Lm15S2V5cyxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHN1bWFyZTogdGhhdC5zdW1hcmVfcHJvY2Vzc29yXHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTmFjdGkgZmlsdHJ5XHJcbiAgICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAgICogQHBhcmFtIHJlcVxyXG4gICAgICAgICAgICogQHBhcmFtIG5leHRcclxuICAgICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRGaWx0ZXJEYXRhKHJlcTogSXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG5leHQ6IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PiB8IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG51bWJlcj4pOiBKUXVlcnlQcm9taXNlPElzbC5HU2VydmljZUxpc3RSZXF1ZXN0PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IGdldEZpbHRlckRhdGFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbHRlckdyaWQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKG5ld0ZpbHRlcjogVWN0LkludGVyZmFjZS5HUmlzcmVJSXNzcEZpbHRlckR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdSZXF1ZXN0ID0gJC5leHRlbmQodHJ1ZSwge30sIHJlcSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UmVxdWVzdFtcImZpbHRlcnNcIl0gPSBuZXdGaWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpZmlsdHJ5IG5hIGdyaWR1XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RmlsdGVyR3JpZCgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBnZXRGaWx0ZXIgXCIpO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImNvbGxlY3RcIiwgZmlsdGVyRHRvKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJmaWx0ZXJcIiwgZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVkYWxvc3QgcHJlZCB2bHN0bmltIG5hY3RlbmkuIEx6ZSB6cnVzaXQgbmFjdGVuaVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGJlZm9yZUxvYWRpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZ3JpZGZvcm1hdHUgZGxlIHByZWRsb2h5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PGFueT4ge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIk5laW1wbGVtZW50b3Zhbm9cIik7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabm92dW5hY3RlbmkgZGF0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgcmVsb2FkKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB2YXIgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==