"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * Predek sezanmu kontentu
             *
             * @author tkares
             * @since 484.1.0.69
            */
            class GSeznamEkoZaznamuBase {
                /**
                 * Konstruktor
                 *
                 * @param content - parent content
                 */
                constructor(content) {
                    //super();         
                    // klicove sloupce na seznamu
                    this.myKeys = undefined;
                    this.loadingData = false; // atribut nacitani dat
                    this.filterHistory = [];
                    this.currFilterHistoryIndex = -1;
                    this.addFilterToHistory = true;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                    /**
                     * Pouzivat texty z rozvrhu
                     *
                     */
                    this.useTextyZRozvrhu = false;
                    /**
                     * Pouzivat PAP radky
                     *
                     */
                    this.usePapRows = false;
                    /**
                     * Pamatovani historie
                     *
                     */
                    this.rememberHistory = false;
                    // povoleni nahledu
                    this.povolenNahled = false;
                    // pouziva se strukt. popis
                    this.pouzivanStrukPopis = false;
                    // Soucty ve status baru gridu
                    this.soucetVeStatusBaru = true;
                    // Automaticky souctovy radek
                    this.souctovyRadekAtomaticky = true;
                    // Serverovy filtr nad gridem
                    this.serverovyFilterNadGridem = true;
                    this.loading = false;
                    /**
                     * Zobrazit data z ESU
                     */
                    this.showEsu = false;
                    /**
                     * Zobrazit data z ESU - stara hodnota
                     */
                    this.showEsuOld = false;
                    /**
                     * Zobrazit strukturovany popis
                     */
                    this.showPopisStrukt = false;
                    /**
                     * Zobrazit strukturovany popis - stara hodnota
                     */
                    this.showPopisStruktOld = false;
                    /**
                     * Zobrazit vybrane polozky strukturovaneho popisu
                     */
                    this.showPopisStruktPolozky = false;
                    /**
                     * nacitani bez PAP radku
                     */
                    this.filterPap = false;
                    /**
                     * Zobrazit vybrane polozky strukturovaneho popisu - stara hodnota
                     */
                    this.showPopisStruktPolozkyOld = false;
                    /**
                     * Atribut 1. nacteni
                     */
                    this.firstLoad = true;
                    content.logOptions = { name: "GSeznamEkoZaznamuBase", authorCode: 302, file: "GSeznamEkoZaznamuBase.ts" };
                    this.parentCnt = content;
                    this.parentCnt.log.trace("Start constructor GSeznamEkoZaznamuBase");
                    this.Zapisova = content.Zapisova;
                    this.globalParams = content.globalParams;
                    this.Globals = content.Globals;
                    this.filterOptions = content.filterOptions;
                    this.Filter = content.Filter;
                    this.debug = content.debug;
                    this.ExterniSumarizace = content.ExterniSumarizace;
                    this.CurrentRow = content.CurrentRow;
                    this.filterStrPopis = content.filterStrPopis;
                    this.addStrPopisColumns = content.addStrPopisColumns;
                    this.Rows = content.Rows;
                    this.Radek_DPH = content.Radek_DPH;
                    this.StrictFilter = content.StrictFilter;
                    this.AutoLoadData = content.AutoLoadData;
                    this.Dic = content.Dic;
                    this.AvoidUus = content.AvoidUus;
                    this.AvoidNks = content.AvoidNks;
                    this.AvoidExt = content.AvoidExt;
                    //this.Rozpocet = content.Rozpocet;
                    //this.Ucetnictvi = content.Ucetnictvi;
                    this.Rozpocet = content["Rozpocet"] ?? false; // pokud neni nastavene, tak je false
                    this.Ucetnictvi = content["Ucetnictvi"] ?? false; // pokud neni nastavene, tak je false
                    this.tema = content.tema;
                    this.typSestavy = content.typSestavy;
                    this.TypUlohy = content.TypUlohy;
                    this.detailInf = content.detailInf; // dodatecne informace ve statusbaru
                    this.PrizIissp = content.PrizIissp;
                    this.globals = Gordic.Ucr.Globals.GUcrGlobals;
                    this.zkratky = Gordic.Ucr.Globals.GZkr;
                    this.texty = Gordic.Ucr.Globals.GTxt;
                    this.ixsRoz = content["ixsRoz"];
                    this.ixsSax = content["ixsSax"];
                    this.showPopisStruktPolozky = (content.userSettings?.get("rozsirenyPopisAutoAddGridColumns") ?? false);
                    this.showPopisStrukt = (content.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") ?? false);
                    this.showEsu = (content.userSettings?.get("esuAddGridColumns") ?? false);
                    this.addStrPopisColumns = (content.userSettings?.get("rozsirenyPopisShowGridColumns"));
                    //this.columnsPopisStrukt = content.userSettings?.get("rozsirenyPopisShowGridColumns"); 
                    this.cfuSetSorted = content.cfuSetSorted;
                }
                // nastaveni id a titulku okna
                //taskId = "seznamStavyKonsolidace";
                onContentReady() {
                    this.parentCnt.log.trace("Start onContentReady GSeznamEkoZaznamuBase");
                    var that = this;
                    this.createActions();
                    this.CreateMenuBar();
                    // nastaveni status baru
                    if (typeof this.detailInf !== "undefined" && this.detailInf.trim() != "")
                        this.parentCnt.statusBar([{ type: "static", caption: this.detailInf }]);
                    //this.parentCnt.menuBar(this.createMenubarDef(this.parentCnt.TypUlohy));
                    if (typeof this.detailInf !== "undefined" && this.detailInf.trim() != "")
                        this.parentCnt.statusBar([{ type: "static", caption: this.detailInf }]);
                    this.createFilterPanel(this);
                    if (this.pouzivanStrukPopis)
                        if (this.showPopisStrukt)
                            this.addStrPopisColumns = this.parentCnt.userSettings?.get("rozsirenyPopisShowGridColumns");
                    that.sumare_processor = new Gordic.Data.BaseProcessor({
                        tiers: { view: { order: 1 } },
                        process: (tiers, data, ctx) => {
                            var sum = data.find((r) => {
                                return ((r._isSummary) && (r._isSummary == true));
                            });
                            this.nastavSumacniRadek(sum);
                            return data;
                        }
                    });
                    // vytvoreni gridu
                    this.createGrid();
                    this.islView.on("change", (obj) => {
                        if (that.parentCnt.closed)
                            return;
                        if (obj.loadingState > 0 && that.autoLoadTextyZRozvrhu() && that.useTextyZRozvrhu) {
                            that.loadTextyZRozvrhu();
                        }
                    });
                    //#region Kl. zkratky
                    this.createShortCut();
                    if (this.povolenNahled) {
                        if (this.parentCnt.closed)
                            return;
                        this.parentCnt.element.gsidebar("option", "right", { userSettings: this.parentCnt.userSettings, width: 500, visible: false, /* pinned: false, leafsAutoHide: false*/ });
                        this.previewController = new Gordic.Previews.GPreviewController(this.parentCnt.element, {
                            useSubtask: false,
                            panelOptions: {
                                caption: "jres:31100217", //RC 31100217 : Náhled detailu
                                side: "right"
                            },
                            tabs: [{
                                    caption: "jres:31100217", //RC 31100217 : Náhled detailu
                                    customLoad: (tab, dto) => {
                                        let elm = $.newDiv().gcontent(Gordic.Ucr.WebClient.GDetailStavZapisRadku, { parentContent: this.parentCnt }); //Nutne pro spravne spojeni s kontextem hlavniho contentu
                                        let tabSettings = dto.tabSettings;
                                        delete dto.tabSettings;
                                        $(tab).empty().append(elm);
                                        $.content(elm).init({
                                            typUlohy: that.TypUlohy,
                                            gridFormat: this.createGridFormat("Detail"),
                                            filter: this.getZapisFilter(),
                                            row: dto,
                                            viewMode: "preview",
                                            tabSettings: tabSettings,
                                            cfuSetSorted: this.cfuSetSorted,
                                        });
                                    }
                                }]
                        });
                    }
                    if (this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */) {
                        let grid = this.getGrid();
                        if (grid !== null)
                            grid.ggridserverfilter("apply", {
                                ucs: { start: this.Globals.EkoParams?.UCS, end: this.Globals.EkoParams?.UCS },
                            });
                    }
                    if (this.AutoLoadData)
                        that.reload();
                    this.parentCnt.log.trace("Konec onContentReady GSeznamEkoZaznamuBase");
                }
                /**
                 * Souctove radky
                 *
                 * */
                nastavSumacniRadek(sumRow) {
                    let grid = this.getGrid();
                    if (!this.soucetVeStatusBaru || grid === null || typeof this.islView === "undefined")
                        return;
                    this.parentCnt.log.trace("Start nastavSumacniRadek GSeznamEkoZaznamuBase");
                    //let view = this.$grid.ggrid<Gordic.Uct.Interface.GUctSeznamZapisuStavuDto>("getView");
                    //let sumRow = this.islView.getDataRows(true).find((r) => {
                    //    return ((r._isSummary) && (r._isSummary == true));
                    //});
                    if (typeof sumRow === "undefined") {
                        if ($(grid).hasClass("ggrid"))
                            grid.ggrid("statusWidget", "ucrsuma-panel").empty();
                        return;
                    }
                    var $souctySpn = $.newSpan();
                    $souctySpn.append("jres:31100242"); //RC 31100242 : Součty:
                    this.setSumBar(sumRow, $souctySpn);
                    if ($(grid).hasClass("ggrid"))
                        grid.ggrid("statusWidget", "ucrsuma-panel").empty().append($souctySpn);
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.parentCnt.element.find(".ggrid." + this.classGrid);
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Nastaveni sumacniho radku
                 * @param sumRow
                 * @param $souctySpn
                 */
                setSumBar(sumRow, $souctySpn) {
                    this.parentCnt.log.trace("Start setSumBar GSeznamEkoZaznamuBase");
                    this.parentCnt.log.debug("Zapisova: ", this.Zapisova);
                    if (this.Zapisova) {
                        this.formatSumy("jres:31100056", sumRow.data?.c0, $souctySpn, ", "); //RC 31100056 : MD
                        this.formatSumy("jres:31100057", sumRow.data?.c1, $souctySpn, ", "); //RC 31100057 : Dal
                        if (typeof sumRow.data?.c0c1 !== "undefined")
                            this.formatSumy("jres:31100058", sumRow.data?.c0c1, $souctySpn, ""); //RC 31100058 : MD - Dal
                    }
                    else {
                        this.formatSumy("jres:31100059", sumRow.data?.c0, $souctySpn, ", "); //RC 31100059 : MO MD
                        this.formatSumy("jres:31100060", sumRow.data?.c1, $souctySpn, ", "); //RC 31100060 : MO Dal
                        if (typeof sumRow.data?.c0c1 !== "undefined")
                            this.formatSumy("jres:31100061", sumRow.data?.c0c1, $souctySpn, "; "); //RC 31100061 : MO MD - Dal
                        this.formatSumy("jres:31100062", sumRow.data?.c0_as, $souctySpn, ", "); //RC 31100062 : AS MD
                        this.formatSumy("jres:31100063", sumRow.data?.c1_as, $souctySpn, ", "); //RC 31100063 : AS Dal
                        this.formatSumy("jres:31100064", sumRow.data?.c0c1_as, $souctySpn);
                    }
                }
                formatSumy(caption, value, $spn, separator) {
                    this.parentCnt.log.trace("Start formatSumy GSeznamEkoZaznamuBase");
                    $spn.append(caption + "=");
                    if (typeof value === "undefined") { } //$spn.append($("<span>", { text: Gordic.Templates.Formatters.number(parseDecimal(0), "C" /*"C2"*/), style: "font-weight: 700" }));
                    else
                        $spn.append($("<span>", { text: Gordic.Templates.Formatters.number(parseDecimal(value), "C" /*"C2"*/), style: "font-weight: 700" }));
                    if (separator)
                        $spn.append(separator);
                }
                /**
                 * Definice menubaru
                 *
                 * */
                CreateMenuBar() {
                    this.parentCnt.log.trace("Start CreateMenuBar GSeznamEkoZaznamuBase");
                    this.parentCnt.menuBar(this.DefineMenuBar(this.TypUlohy));
                }
                /**
                 * Definice menu baru
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    this.parentCnt.log.trace("Start DefineMenuBar GSeznamEkoZaznamuBase");
                    let menu = new Array();
                    if (typeof this.parentCnt.actions.detailAct !== "undefined")
                        menu.push({ action: this.parentCnt.actions.detailAct, favorite: true });
                    //if (typUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis) {
                    //    menu.push({ action: this.parentCnt.actions.doklaZauctAct, favorite: true });
                    //    menu.push({ action: this.parentCnt.actions.zobrazitStuktPopisAct, favorite: true, align: "opposite" });
                    //    menu.push({ action: this.parentCnt.actions.zobrazitStuktPopisPolAct, favorite: true, align: "opposite" });
                    //    menu.push({ action: this.parentCnt.actions.zobrazitESUAct, favorite: true, align: "opposite" });
                    //}
                    if (this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */) {
                        menu.push({ action: this.parentCnt.actions.zobrazitESUAct, favorite: true, align: "opposite" });
                    }
                    // akci pro nacitani bez PHP radku
                    if (this.showPapAction()) {
                        menu.push({ action: this.parentCnt.actions.bezPapAct, favorite: true, align: "opposite" });
                    }
                    if (this.rememberHistory) {
                        menu.push({ action: this.parentCnt.actions.prevFilterAct, favorite: true, align: "opposite" });
                        menu.push({ action: this.parentCnt.actions.nextFilterAct, favorite: true, align: "opposite" });
                    }
                    if (this.printAct)
                        menu.push({ action: this.printAct, favorite: true });
                    if (typUlohy === 2 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviStav */
                        || typUlohy === 0 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetStav */
                        || typUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */
                        || typUlohy === 9 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis */)
                        menu.push({ action: this.parentCnt.actions.zapisyAct, favorite: true });
                    //if (typUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto)
                    //    menu.push({ action: this.parentCnt.actions.zapisyAllAct, favorite: true });
                    if (typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                        || typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || typUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                        || typUlohy == 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */
                        || typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */)
                        if (typeof this.parentCnt.actions.dokladAct !== "undefined")
                            menu.push({ action: this.parentCnt.actions.dokladAct, favorite: true });
                    // textu z rozvrhu
                    if (typeof this.parentCnt.actions.textRozvrhAct !== "undefined")
                        menu.push({ action: this.parentCnt.actions.textRozvrhAct, favorite: true });
                    if (typUlohy === 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */
                        || typUlohy === 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                        //menu.push({ action: this.primdokladAct, favorite: true });
                        menu.push({ action: this.parentCnt.actions.dokladROAct, favorite: true });
                        menu.push({ action: this.parentCnt.actions.dokladBLKAct, favorite: true });
                    }
                    if (typUlohy === 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */
                        || typUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */
                        || typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                        || typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || typUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                        || typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */
                        || typUlohy === 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */
                        || typUlohy === 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */
                        || typUlohy === 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */) {
                        menu.push({ action: this.parentCnt.actions.primdokladAct, favorite: true });
                        if (typeof this.parentCnt.actions.primdokladExtAct !== "undefined")
                            menu.push({ action: this.parentCnt.actions.primdokladExtAct, favorite: true });
                        //if (typeof this.parentCnt.actions.smlDetailAct !== "undefined")
                        //    menu.push({ action: this.parentCnt.actions.smlDetailAct, favorite: true });
                    }
                    if (typeof this.parentCnt.actions.zatriditAct !== "undefined")
                        menu.push({ action: this.parentCnt.actions.zatriditAct, favorite: true });
                    menu.push({ action: this.clearFilterRowAct });
                    menu.push({
                        type: "static",
                        caption: "jres:31100268", //RC 31100268 : Rychlé akce
                        children: [
                            { action: this.parentCnt.actions.insAct, icon: "gi-refresh", caption: "jres:31100226" }, //RC 31100226 : Načtení dat
                            { action: this.parentCnt.actions.clearAndFilterAct, caption: "jres:31100228" }, //RC 31100228 :  Vyčistit a načíst
                            (this.serverovyFilterNadGridem ? { action: this.parentCnt.actions.copyFilterAct, caption: "jres:30250642" } //RC 30250642 : Kopírovat podmínky
                                : { action: this.parentCnt.actions.emptyAct }),
                            (this.serverovyFilterNadGridem ? { action: this.parentCnt.actions.pasteFilterAct, caption: "jres:30250644" } //RC 30250644 : Vložit podmínky
                                : { action: this.parentCnt.actions.emptyAct }),
                            //NOTE: Tyto dve akce budou vzdy fungovat pouze z klavesnice
                            //{ action: this.selFilterAct, caption: "jres:31100229" }, //RC 31100229 : Přenesení hodnoty do filtru.
                            //{ action: this.selFilterAndSearchAct, caption: "jres:31100235" }, //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                            this.typSestavy !== 20 /* Gordic.Uct.Interface.GUcrTypSestavy.Stavova */ ?
                                {
                                    action: this.dotAct,
                                    caption: "jres:30250620", //RC 30250620 : Filtrovat dle dokladu
                                    tooltip: "jres:31100227"
                                } : { action: this.parentCnt.actions.emptyAct }, //RC 31100227 : Zobrazení všech zápisů dokladů (celý doklad) nad označeným zápisem.
                            this.typSestavy !== 20 /* Gordic.Uct.Interface.GUcrTypSestavy.Stavova */
                                && this.typSestavy !== 100 /* Gordic.Uct.Interface.GUcrTypSestavy.Financovani */
                                ?
                                    { action: this.parentCnt.actions.filterPidAct, caption: "jres:31100280" } //RC 31100280 : Filtrovat dle PID
                                : { action: this.parentCnt.actions.emptyAct },
                            this.typSestavy !== 20 /* Gordic.Uct.Interface.GUcrTypSestavy.Stavova */
                                && this.typSestavy !== 100 /* Gordic.Uct.Interface.GUcrTypSestavy.Financovani */
                                ?
                                    { action: this.parentCnt.actions.shDokladyAct, caption: "jres:31100231" } //RC 31100231 : Doklady
                                : { action: this.parentCnt.actions.emptyAct },
                            this.typSestavy !== 20 /* Gordic.Uct.Interface.GUcrTypSestavy.Stavova */
                                && this.typSestavy !== 100 /* Gordic.Uct.Interface.GUcrTypSestavy.Financovani */
                                ?
                                    { action: this.parentCnt.actions.shZapisyAct, caption: "jres:31100124" } //RC 31100124 : Zápisy
                                : { action: this.parentCnt.actions.emptyAct }
                        ]
                    });
                    return menu;
                }
                /**
                 * Vytvoreni klavesovych zkratek
                 *
                 * */
                createShortCut() {
                    let that = this;
                    this.parentCnt.log.trace("Start createShortCut GSeznamEkoZaznamuBase");
                    if (typeof that.parentCnt.actions.insAct != "undefined")
                        this.parentCnt.element.gshortcut({
                            key: "INSERT",
                            description: "jres:31100226", //RC 31100226 : Načtení dat
                            group: Gordic.Shortcuts.Groups.Task,
                            canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                            action: this.parentCnt.actions.insAct
                        });
                    //this.parentCnt.element.gshortcut({
                    //    key: "INSERT",
                    //    description: "jres:31100226", //RC 31100226 : Načtení dat
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    action: new GAction({
                    //        name: "LoadDataAct",
                    //        run: (ev, ctx) => {
                    //            this.loadData();
                    //        }
                    //    }),
                    //});
                    if (typeof this.clearFilterRowAct != "undefined")
                        this.parentCnt.element.gshortcut({
                            key: "DELETE",
                            description: "jres:31100181", //RC 31100181 : Vyčistit
                            canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                            group: Gordic.Shortcuts.Groups.Task,
                            action: this.clearFilterRowAct
                        });
                    //this.parentCnt.element.gshortcut({
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
                    //        }
                    //    }),
                    //});
                    if (typeof that.parentCnt.actions.clearAndFilterAct != "undefined")
                        this.parentCnt.element.gshortcut({
                            key: "0",
                            description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                            canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                            group: Gordic.Shortcuts.Groups.Task,
                            action: that.parentCnt.actions.clearAndFilterAct
                        });
                    //this.parentCnt.element.gshortcut({
                    //    key: "0",
                    //    description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: new GAction({
                    //        name: "clearAndFilterAct",
                    //        run: (ev, ctx) => {
                    //            that.loadingData = true;
                    //            this.$filterPanel.gfilterpanel("clear");
                    //            that.reload();
                    //            //let view = that.$grid.ggrid("getView")
                    //            //view.requestData(undefined);
                    //            //view.getLoadingPromise().always(() => {
                    //            //    that.loadingData = false;
                    //            //    that.nastaveniAkci();
                    //            //});
                    //        }
                    //    }),
                    //});
                    const grid = this.getGrid();
                    if (grid !== null) {
                        //if (typeof that.parentCnt.actions.copyFilterAct !== "undefined")
                        //grid.gshortcut({
                        //    key: "ctrl+C",
                        //    group: Gordic.Shortcuts.Groups.Grid,
                        //    description: that.parentCnt.actions.copyFilterAct.caption,
                        //    action: that.parentCnt.actions.copyFilterAct,
                        //});
                        //if (typeof that.parentCnt.actions.pasteFilterAct !== "undefined")
                        //grid.gshortcut({
                        //    key: "ctrl+V",
                        //    group: Gordic.Shortcuts.Groups.Grid,
                        //    description: that.parentCnt.actions.pasteFilterAct.caption,
                        //    action: that.parentCnt.actions.pasteFilterAct,
                        //});
                        if (typeof this.parentCnt.actions.selFilterAct !== "undefined")
                            grid.gshortcut({
                                key: "ctrl+shift+lclick",
                                group: Gordic.Shortcuts.Groups.Grid,
                                description: "jres:31100229", //RC 31100229 : Přenesení hodnoty do filtru.
                                action: this.parentCnt.actions.selFilterAct
                            });
                        //grid.gshortcut({
                        //    key: "ctrl+shift+lclick",
                        //    group: Gordic.Shortcuts.Groups.Grid,
                        //    description: "jres:31100229", //RC 31100229 : Přenesení hodnoty do filtru.
                        //    action: new GAction({
                        //        name: "selFilterAct",
                        //        run: (ev, ctx) => {
                        //            this.dispatchFillServerGridEvent(ev);
                        //        }
                        //    }),
                        //});
                        if (typeof this.parentCnt.actions.selFilterAndSearchAct !== "undefined")
                            grid.gshortcut({
                                key: "ctrl+lclick",
                                group: Gordic.Shortcuts.Groups.Grid,
                                description: "jres:31100235", //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                                action: this.parentCnt.actions.selFilterAndSearchAct //this.selFilterAndSearchAct
                            });
                        //grid.gshortcut({
                        //    key: "ctrl+lclick",
                        //    group: Gordic.Shortcuts.Groups.Grid,
                        //    description: "jres:31100235", //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                        //    action: new GAction({
                        //        name: "selFilterAndSearchAct",
                        //        run: (ev, ctx) => {
                        //            this.dispatchFillServerGridEvent(ev);
                        //            //let view = that.$grid.ggrid("getView")
                        //            //view.requestData(undefined);
                        //            //view.getLoadingPromise().always(() => {
                        //            //    that.loadingData = false;
                        //            //    that.nastaveniAkci();
                        //            //});
                        //            this.loadData();
                        //        }
                        //    }),
                        //});
                        if (typeof this.dotAct !== "undefined")
                            grid.gshortcut({
                                key: [".", ","],
                                //NOTE: Description opsano z napovedy k TK UCR
                                description: "jres:31100227", //RC 31100227 : Zobrazení všech zápisů dokladů (celý doklad) nad označeným zápisem.
                                canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                                group: Gordic.Shortcuts.Groups.Grid,
                                action: this.dotAct
                            });
                    }
                    if (that.rememberHistory) {
                        if (typeof that.parentCnt.actions.prevFilterAct != "undefined")
                            this.parentCnt.element.gshortcut({
                                key: "1",
                                description: "jres:31100218", //RC 31100218 : Předchozí filtr
                                canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                                group: Gordic.Shortcuts.Groups.Task,
                                action: that.parentCnt.actions.prevFilterAct
                            });
                        //this.parentCnt.element.gshortcut({
                        //    key: "1",
                        //    description: "jres:31100218", //RC 31100218 : Předchozí filtr
                        //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        //    group: Gordic.Shortcuts.Groups.Task,
                        //    action: that.parentCnt.actions.prevFilterAct
                        //});
                    }
                    //this.$grid.gshortcut();
                }
                createProfiles(gf) {
                    this.parentCnt.log.trace("Start createProfiles GSeznamEkoZaznamuBase");
                    let profiles = {
                        default: { name: "jres:31100232", columns: {} } //RC 31100232 : Výchozí
                    };
                    gf.columns.filter((c) => { return (!c.hidden); })
                        .forEach((c) => { profiles.default.columns[c.name] = { hidden: false }; });
                    if (this.Zapisova) {
                        profiles.default.name = "jres:31100241"; //RC 31100241 : Zápisy (výchozí)
                        profiles.doklady = { name: "jres:31100231", columns: {}, grouping: "doklady" }; //RC 31100231 : Doklady
                        profiles.doklady.columns = $.extend({
                            doklady: { hidden: false },
                            pdok: { hidden: false }
                        }, profiles.default.columns);
                    }
                    return profiles;
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createActions() {
                    let that = this;
                    this.parentCnt.log.trace("Start createActions GSeznamEkoZaznamuBase");
                    // prazdna akce pro technicke ucely
                    this.parentCnt.actions.add({
                        name: "emptyAct",
                        enabled: false,
                        visible: false,
                        caption: "",
                        captionVisible: "never",
                        run: (ev, ctx) => { }
                    });
                    if (that.rememberHistory) {
                        this.parentCnt.actions.add({
                            name: "prevFilterAct",
                            icon: "gi-arrow gi-rot180",
                            enabled: false,
                            caption: "jres:31100218", //RC 31100218 : Předchozí filtr
                            captionVisible: "never",
                            tooltip: "jres:31100220", //RC 31100220 : Návrat k předchozí hodnotě filtru a vyhledání.
                            run: (ev, ctx) => { this.prevFilter(); }
                        });
                        this.parentCnt.actions.add({
                            name: "nextFilterAct",
                            icon: "gi-arrow",
                            enabled: false,
                            caption: "jres:31100219", //RC 31100219 : Následující filtr
                            captionVisible: "never",
                            tooltip: "jres:31100221", //RC 31100221 : Vyplnění následujícího filtru a vyhledání.
                            run: (ev, ctx) => { this.nextFilter(); }
                        });
                    }
                    this.clearFilterRowAct = this.parentCnt.actions.add({
                        name: "clearFilterRowAct",
                        caption: "jres:31100267", //RC 31100267 : Vyčistit filtr seznamu
                        icon: "gi-bin",
                        run: (ev, ctx) => { this.$filterPanel.gfilterpanel("clear"); }
                    });
                    this.parentCnt.actions.add({
                        name: "clearAndFilterAct",
                        run: (ev, ctx) => {
                            this.$filterPanel.gfilterpanel("clear");
                            this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                                .then(() => { this.doFilterClick(); });
                        }
                    });
                    if (this.serverovyFilterNadGridem) {
                        this.parentCnt.actions.add({
                            name: "selFilterAct",
                            run: (ev, ctx) => { this.dispatchFillServerGridEvent(ev); }
                        });
                        this.parentCnt.actions.add({
                            name: "selFilterAndSearchAct",
                            run: (ev, ctx) => {
                                this.dispatchFillServerGridEvent(ev);
                                this.doFilterClick();
                            }
                        });
                        // pouze, kdyz je serverovy filter nad gridem
                        // kopirovat filtr nad gridem
                        this.parentCnt.actions.add({
                            name: "copyFilterAct",
                            caption: "jres:30250642", //RC 30250642 : Kopírovat podmínky
                            icon: "fa-clone",
                            run: (ev, ctx) => {
                                this.getFilterGrid()
                                    .then((result) => {
                                    this.setFilterStack(result);
                                    this._nastaveniAkci();
                                    //that.parentCnt.dialogs.alert(JSON.stringify(result));
                                });
                            }
                        });
                        // vlozit podminky na filtr nad gridem
                        this.parentCnt.actions.add({
                            name: "pasteFilterAct",
                            icon: "fa-clipboard",
                            caption: "jres:31100228", //RC 31100228 :  Vyčistit a načíst
                            run: (ev, ctx) => {
                                let filter = this.getFilterStack();
                                if (filter) {
                                    let grid = this.getGrid();
                                    if (grid == null)
                                        return;
                                    grid.ggridserverfilter("apply", filter);
                                }
                            }
                        });
                    }
                    this.parentCnt.actions.add({
                        name: "insAct",
                        run: (ev, ctx) => {
                            this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                                .then(() => { this.doFilterClick(); });
                        }
                    });
                    if (this.tema !== "")
                        this.printAct = this.parentCnt.actions.add(GAction.createPrintAction({
                            name: "printAct",
                            tema: this.tema,
                            parentContent: this.parentCnt,
                            //async: false,
                            reportGeneratorType: "Gordic.Ucr.WebClient.GSeznamEkoZaznamuGenerator",
                            reportStarting: (rep) => { return this.reportStarting(rep).then(() => { return rep; }); }
                        }));
                    this.dotAct = this.parentCnt.actions.add({
                        name: "dotAct",
                        enabled: false,
                        run: (ev, ctx) => {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            if (!grid.ggrid("getSelection", false)[0])
                                return;
                            grid
                                .ggridserverfilter("clear")
                                .ggridserverfilter("apply", that.getZapisFilter());
                            this.doFilterClick();
                        }
                    });
                    if (that.displayTextyZRozvrhu()) {
                        /**
                         * texty z rozvrhu
                         *
                         */
                        this.parentCnt.actions.add({
                            name: "textRozvrhAct",
                            caption: "jres:30250619", //RC 30250619 : Texty z rozvrhu
                            tooltip: "jres:30250597", //RC 30250597 : Načtení textů z rozvrhu k slovům účetní věty
                            icon: "gi-refresh",
                            enabled: false,
                            run: function () {
                                //let view = that.$grid.ggrid<GSeznamZapisuStavuDto>("getView");
                                //if (typeof view !== "undefined") {
                                this.setPending(that.loadTextyZRozvrhu());
                                //    that.parentCnt.beginOperation("jres:30250602"); //RC 30250602 : Načítání...
                                //    that.getUroven()
                                //        .then((uroven) => {
                                //            this.setPending(
                                //                Gordic.Widget.GMagicBaseManager.GMagicBaseManager.fillTextToDataSentence(view as any, {
                                //                    cfuId: that.ixsSax!, idRozvrhu: that.ixsRoz!
                                //                    , ico: that.Globals.EkoParams?.ICO as string
                                //                    , rok: that.Globals.EkoParams?.Rok as number
                                //                    , textWithValue: that.parentCnt.globalSettings?.get("Global.Ucr.AppSettings.UctSettingsForm.wordWithNumber")
                                //                    , uroven: uroven
                                //                }
                                //                ).always(() => that.parentCnt.endOperation())
                                //            )
                                //        }).fail(() => that.parentCnt.endOperation())
                                //        ;
                                //}
                            }
                        });
                    }
                    if (that.showPapAction())
                        this.parentCnt.actions.add({
                            name: "bezPapAct",
                            caption: "jres:30250636", //RC 30250636 : Bez PAP
                            tooltip: "jres:30250637", //RC 30250637 : Seznam s/bez PAP řádků
                            icon: "gi-uncheck",
                            checked: false,
                            enabled: true,
                            run: () => {
                                let checked = that.parentCnt.actions.bezPapAct?.checked();
                                checked = !(typeof checked == "undefined" ? false : checked);
                                that.parentCnt.actions.bezPapAct?.checked(checked);
                                that.parentCnt.actions.bezPapAct?.update({ icon: (checked ? "gi-check" : "gi-uncheck") });
                                that.filterPap = checked;
                                //this.manuallyStarted = true;
                                that.reload();
                            }
                        });
                    if (typeof this.parentCnt.actions.detailAct === "undefined")
                        this.parentCnt.actions.add({
                            name: "detailAct",
                            caption: "jres:31100266", //RC 31100266 : Zobrazit detail
                            icon: "gi-detail",
                            enabled: false,
                            visible: (this.parentCnt.TypUlohy != 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ && this.parentCnt.TypUlohy != 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */ && this.parentCnt.TypUlohy != 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */),
                            run: (ev, ctx) => { this.showDetail(); }
                        });
                }
                /**
                 * Nacteni textu z rozvrhu
                 * @param view
                 * @returns
                 */
                loadTextyZRozvrhu() {
                    if (this.loading)
                        return $.Deferred().reject().promise();
                    this.parentCnt.log.trace("Start loadTextyZRozvrhu GSeznamEkoZaznamuBase");
                    let that = this;
                    let grid = this.getGrid();
                    if (grid === null)
                        return $.Deferred().reject().promise();
                    //if (typeof that.$grid === "undefined") return $.Deferred().reject().promise();
                    let view = grid.ggrid("getView");
                    if (typeof view === "undefined")
                        return $.Deferred().reject().promise();
                    this.loading = true;
                    that.parentCnt.beginOperation("jres:30250602"); //RC 30250602 : Načítání...
                    return that.getUroven()
                        .then((uroven) => {
                        return Gordic.Widget.GMagicBaseManager.GMagicBaseManager.fillTextToDataSentence(view, {
                            cfuId: that.ixsSax, idRozvrhu: that.ixsRoz,
                            ico: that.Globals.EkoParams?.ICO,
                            rok: that.Globals.EkoParams?.Rok,
                            textWithValue: that.parentCnt.globalSettings?.get("Global.Ucr.AppSettings.UctSettingsForm.wordWithNumber"),
                            uroven: uroven
                        }).always(() => { that.parentCnt.endOperation(); that.loading = false; });
                    }).fail(() => { that.parentCnt.endOperation(); that.loading = false; });
                }
                doFilterClick() {
                    this.parentCnt.log.trace("Start doFilterClick GSeznamEkoZaznamuBase");
                    //NOTE (BM): Zadny jiny spolehlivy zpusob, krome tohoto, nefunguje.
                    this.$filterPanel.find(".js-butVyhledat").trigger("click");
                }
                getZapisFilter() {
                    this.parentCnt.log.trace("Start getZapisFilter GSeznamEkoZaznamuBase");
                    let grid = this.getGrid();
                    if (grid == null)
                        return {};
                    var sel = grid.ggrid("getSelection", false)[0];
                    if (this.parentCnt.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */)
                        return {
                            ucs: { start: sel.ucs, end: sel.ucs },
                            mesic: { start: sel.mesic, end: sel.mesic },
                            ac: { start: sel.ac, end: sel.ac }
                        };
                    return {
                        ucs: { start: sel.ucs, end: sel.ucs },
                        drd_msk: sel.drd.toString(),
                        mesic: { start: sel.mesic, end: sel.mesic },
                        ac: { start: sel.ac, end: sel.ac }
                    };
                }
                /**
                 * Priprava pro generovani sestavy
                 * @param ri
                 */
                reportStarting(ri) {
                    this.parentCnt.log.trace("Start reportStarting GSeznamEkoZaznamuBase");
                    return this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                        .then((f) => {
                        ri.customDto = {
                            typUlohy: this.parentCnt.TypUlohy,
                            filter: f.filter,
                            elementy: f.elementy,
                            pap: this.usePapRows ? { v: this.getCheckedPap() ? 0 : 1 } : undefined,
                            filterStrPopis: f.filterStrPopis
                        };
                    });
                }
                /**
                 * Nastaveni akci
                 * */
                _nastaveniAkci() {
                    this.parentCnt.log.trace("Start _nastaveniAkci GSeznamEkoZaznamuBase");
                    const that = this.parentCnt;
                    const grid = this.getGrid();
                    // pokud neni grid, nic nedelej
                    if (grid == null)
                        return;
                    // pokud je content zavreny, pak nic nedelej
                    if (that.closed)
                        return;
                    this.nastaveniAkci(grid, Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid));
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    this.parentCnt.log.trace("Start nastaveniAkci GSeznamEkoZaznamuBase");
                    const that = this.parentCnt;
                    //            const grid = this.getGrid();
                    // pokud neni grid, nic nedelej
                    //          if (grid == null) return false;
                    // pokud je content zavreny, pak nic nedelej
                    //        if (that.closed ) return false;
                    //const pocetZapisu = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid);
                    var enable = pocetRadku > 0;
                    // pristupnost akci dle nactenych dat
                    if (typeof that.actions.detailAct !== "undefined")
                        that.actions.detailAct?.enabled(enable);
                    if (typeof that.actions.zapisyAct !== "undefined")
                        that.actions.zapisyAct?.enabled(enable);
                    if (typeof that.actions.dotAct !== "undefined")
                        that.actions.dotAct?.enabled(enable);
                    if (typeof this.previewController !== "undefined")
                        this.previewController?.enable(enable);
                    // pristupnost akci dle nactenych dat
                    if (typeof that.actions.filterPidAct !== "undefined")
                        that.actions.filterPidAct.enabled(enable);
                    if (typeof that.actions.primdokladAct !== "undefined")
                        that.actions.primdokladAct?.enabled(enable);
                    if (typeof that.actions.primdokladExtAct !== "undefined")
                        that.actions.primdokladExtAct?.enabled(enable);
                    if (typeof that.actions.dokladBLKAct !== "undefined")
                        that.actions.dokladBLKAct?.enabled(enable);
                    if (typeof that.actions.dokladROAct !== "undefined")
                        that.actions.dokladROAct.enabled(enable);
                    if (typeof that.actions.shDokladyAct !== "undefined")
                        that.actions.shDokladyAct.enabled(enable);
                    if (typeof that.actions.zapisyAllAct !== "undefined")
                        that.actions.zapisyAllAct.enabled(enable);
                    if (typeof that.actions.shZapisyAct !== "undefined")
                        that.actions.shZapisyAct.enabled(enable);
                    if (typeof that.actions.textRozvrhAct !== "undefined")
                        that.actions.textRozvrhAct.enabled(enable);
                    if (typeof that.actions.pasteFilterAct !== "undefined") {
                        let stack = this.getFilterStack();
                        that.actions.pasteFilterAct.update({ enabled: stack !== null });
                        //}
                    }
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
                    this.parentCnt.log.trace("Start createGrid GSeznamEkoZaznamuBase");
                    let that = this;
                    let gridFormat = this.createGridFormat();
                    // spolecne sloupce
                    this.addCommonCols(gridFormat);
                    this.profiles = this.createProfiles(gridFormat);
                    let profilesArr = [this.profiles.default];
                    if (this.profiles.doklady)
                        profilesArr.push(this.profiles.doklady);
                    this.islView = this.createListView();
                    //that.islView.process({ summaryRow: that.sumare_processor });
                    this.islView.on("change", function (ev, ctx) {
                        if (that.parentCnt.closed)
                            return;
                        that.parentCnt.log.trace("Start change GSeznamEkoZaznamuBase");
                        if (!that.loading)
                            that._nastaveniAkci();
                        that.parentCnt.log.trace("Konec change GSeznamEkoZaznamuBase");
                        //that.nastavSumacniRadek();
                    });
                    let sumCols = undefined;
                    if (that.souctovyRadekAtomaticky)
                        sumCols = gridFormat.columns.filter(c => (c.columnType == "currency" || c.columnType == "number") && (c.caption.indexOf("%") == -1) && ("status,drd,mesic,den,rok,pripraveno,s_prep,rok_uej,mesic_uej,rok_sml,cislo_sml".indexOf(c.name)) == -1).map(e => e.name);
                    let grid = $.newDiv(this.classGrid)
                        .appendTo(this.parentCnt.element)
                        .css("height", "100%")
                        .gautofit()
                        .ggrid({
                        //rowHeight: 32,
                        columnMode: "full", // fit (defaultne by melo byt toto), full
                        data: this.islView,
                        defaultAction: typeof that.defaultGridAction == "undefined" ?
                            new GAction({
                                name: "gridRowSelectedAct",
                                run: function (ev, ctx) {
                                    //that.showDetail(ctx.cellInfo.data);
                                    that.defaultAction(ctx.cellInfo.data);
                                }
                            })
                            : that.defaultGridAction,
                        //searchColumns: ["popis", "ac"], //sloupce, podle kterych se vyhledava v searchboxu                    
                        columns: gridFormat, //this.createGridFormat() as any,
                        defaultProfile: this.profiles.default, //skryte sloupce resit pres column.hidden + columnList - uzivateli jsou skryte, muze si je volitelne zapnout
                        profiles: profilesArr,
                        contextMenu: [
                            { action: this.clearFilterRowAct }
                        ],
                        selection: (ev, sel) => {
                            //previewSidebar.empty().append("<div>" + sel.getSelection(false)[0].ixp + "</div>");
                            that._nastaveniAkci();
                            let s = sel.getSelection(false);
                            this.dotAct.enabled(s.length > 0);
                            // Vyvolani udalosti pro zmenu focusu na radku 
                            this.changeSelect(s.length === 0 ? null : s[0]);
                            if (s.length === 0)
                                return;
                            // vyvolani udalosti pro potomky
                            //if (this.previewController && typeof this.previewController !== "undefined")
                            if (that.povolenNahled)
                                this.previewController?.show(s[0]);
                        },
                        searchColumns: gridFormat.columns.filter(c => c.columnType !== "datetime" && c.columnType !== "currency").map(e => "*" + e.name),
                    })
                        .ggrideko({
                        // součtový řádek
                        summaryRowAllowed: this.souctovyRadekAtomaticky,
                        summaryRowColumns: sumCols,
                        longListModel: "Global.Ucr.AppSettings",
                        // dlouhý seznam
                        longListAllowed: typeof that.taskCount !== "undefined",
                        longListModifyRqMethod: (rq) => that.allowedList(rq),
                        longListCountMethod: (rq) => that.taskCount ? that.getCallCount() : $.Deferred().resolve(10)
                    })
                        .ggridrowscalc();
                    if (this.serverovyFilterNadGridem)
                        grid
                            .ggridserverfilter({
                            //invalidValueChanged: function (ev) { that.loadData(); },
                            //defaultData: { nks: { start: "000004", end: "000004" } }
                            defaultData: this.Filter
                        });
                    grid
                        .on("gcfufilterinvalidvalueset", function (ev) {
                        that.reload();
                    });
                }
                /**
                 * Zmena focusu radku
                 *
                 */
                changeSelect(newRow) {
                }
                /**
                 * Pridani spolecnych sloupcu
                 * @param gridFormat
                 */
                addCommonCols(gridFormat) {
                    this.parentCnt.log.trace("Start addCommonCols GSeznamEkoZaznamuBase");
                    // textu z rozvrhu
                    if (this.displayTextyZRozvrhu()) {
                        // zjisteni prednastavenych slov rozvrhu
                        let slovaRozvrhu = this.parentCnt.userSettings?.get("selectedWordsShowGridColumns");
                        // prevzeti sloupcu    
                        slovaRozvrhu.forEach(function (sloupec) {
                            gridFormat.addTextColumn({
                                name: sloupec.hodnota + "_txt",
                                caption: "jres:30250594".format(sloupec.klic), //RC 30250594 : {0} - popis
                                sortable: true,
                                width: 200,
                                //serverFilter: Gordic.Eko.Filters.stringSingle({ model: sloupec.hodnota!, caption: "jres:31100097" }) //RC 31100097 : Změnu provedl
                            });
                        });
                    }
                }
                /**
                 * Metoda povoleni nacteni seznamu
                 * @param rq
                 */
                allowedList(rq) {
                    this.parentCnt.log.trace("Start allowedList GSeznamEkoZaznamuBase");
                    return true;
                }
                /**
                 * Vraci ISL metodu pro zjisteni poctu zaznamu
                 *
                 * */
                getCallCount() {
                    this.parentCnt.log.trace("Start getCallCount GSeznamEkoZaznamuBase");
                    let that = this;
                    if (!that.taskCount)
                        throw Error("neimplementovano");
                    return that.taskCount
                        .use((req, next, ctx) => {
                        that.addFilterToHistory = false;
                        return that.getFilterData(that, req, next);
                    })
                        .get();
                }
                /**
                 * Udalost pred vlstnim nacteni. Lze zrusit nacteni
                 * @returns
                 */
                beforeLoading() {
                    return true;
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
                        //this.parentCnt.log.trace("taskList.use next:", next);
                        return this.getFilterData(that, req, next);
                        //return next(req);
                    }), {
                        filterPanel: that.$filterPanel,
                        key: that.myKeys,
                        startEmpty: true,
                        processors: {
                            sumare: that.sumare_processor
                        }
                    });
                }
                /**
                  * Nacti filtry
                  * @param that
                  * @param req
                  * @param next
                  */
                getFilterData(that, req, next) {
                    this.parentCnt.log.trace("Start getFilterData GSeznamEkoZaznamuBase");
                    return that.getFilter(that.$filterPanel.gfilterpanel("getCurrentData"))
                        .then((newFilter) => {
                        that.addFilterIntoHistory($.extend(true, {}, newFilter));
                        var newRequest = $.extend(true, {}, req);
                        //maska2.cfu["uef"] = undefined;
                        if (that.TypUlohy !== 9 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis */) {
                            let rq = {
                                RadekStavu: that.CurrentRow,
                                Maska: newFilter.filter,
                                Maska2: newFilter.filter,
                                TypUlohy: that.TypUlohy,
                                Elementy: newFilter.elementy
                                //, Elementy: newFilter.filters
                                ,
                                FilterStrPopis: newFilter.filterStrPopis,
                                logovatGdpr: true,
                                StrPopisKeys: that.addStrPopisColumns,
                                maxRecords: -1,
                                Limit: 0,
                                LoadEsu: that.showEsu,
                                LoadPopisDokladu: that.showPopisStrukt
                                // podminka na PAP ucty
                                ,
                                Pap: that.usePapRows ? { v: that.getCheckedPap() ? 0 : 1 } : undefined
                            };
                            let maska = newFilter.filter;
                            for (var name in newFilter.filter?.cfu) {
                                maska[name] = newFilter.filter?.cfu[name];
                            }
                            rq.Maska = maska;
                            newRequest["filters"] = rq;
                        }
                        else
                            ////newRequest["filters"] = { Maska: newFilter.filter, Elementy: newFilter.elementy==null?void 0: ((newFilter!.elementy!) as any).filters, Limit: 0, TypUlohy: that.TypUlohy };
                            newRequest["filters"] = { Maska: newFilter.filter, Elementy: newFilter.elementy == null ? void 0 : (newFilter.elementy).filters, Limit: 0, TypUlohy: that.TypUlohy };
                        //newRequest["filters"] = { Maska: newFilter.filter, Elementy: newFilter.elementy == null ? void 0 : newFilter!.elementy!, Limit: 0, TypUlohy: that.TypUlohy };
                        //newRequest["filters"] = { Maska: newFilter.filter, Elementy: newFilter == null ? void 0 : (newFilter! as any).filters!, Limit: 0, TypUlohy: that.TypUlohy };
                        return next(newRequest);
                    });
                }
                /**
                 * Zobrazeni detailu
                 * @param row
                 */
                showDetail(row) {
                    this.parentCnt.log.trace("Start showDetail GSeznamEkoZaznamuBase");
                    if (!row) {
                        let grid = this.getGrid();
                        if (grid == null)
                            return;
                        var sel = grid.ggrid("getSelection");
                        if (sel.length === 0)
                            return;
                        row = sel[0];
                    }
                    ;
                    let typUlohy = this.parentCnt.TypUlohy;
                    if (this.parentCnt.TypUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */) {
                        if (row.priz_ur != 0)
                            typUlohy = 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */;
                        else
                            typUlohy = 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */;
                    }
                    let options = {
                        typUlohy: typUlohy, //this.TypUlohy,
                        gridFormat: this.createGridFormat("Detail"),
                        filter: this.getZapisFilter(),
                        row: row,
                        globals: this.globals,
                        viewMode: "full",
                        cfuSetSorted: this.cfuSetSorted
                    };
                    let that = this;
                    let cnt = this.parentCnt.navigate(Gordic.Ucr.WebClient.GDetailStavZapisRadku, options);
                    cnt.on("close", (ev, resultValue) => {
                        debugger;
                        if (resultValue && resultValue.result) {
                            // nutne aktualizovat seznam
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            let view = Gordic.Eko.WebClient.Common.GetView(grid);
                            let radek = resultValue.result;
                            //let rq: Gordic.Uct.Interface.GUctZapisListRequestDto = {
                            //    RadekStavu: {
                            //        ico: radek.ico,
                            //        mesic: radek.mesic,
                            //        lic: radek.lic,
                            //        ucs: radek.ucs,
                            //        rok: radek.rok,
                            //        ac: radek.ac,
                            //        radek_z: radek.radek_z
                            //    }
                            //    , Maska: {
                            //        ico: { start: radek.ico!, end: radek.ico! },
                            //        ac: { start: radek.ac, end: radek.ac } ,
                            //        mesic: { start: radek.mesic, end: radek.mesic },
                            //        rok: { start: radek.rok!, end: radek.rok! },
                            //        //lic: { start: radek.lic, end: radek.lic },
                            //        ucs: { start: radek.ucs, end: radek.ucs },
                            //        radek_z: { start: radek.radek_z, end: radek.radek_z },
                            //    }, Maska2: {}
                            //};
                            ////that.taskList({})
                            //that.parentCnt.isl.UcrUcetniZapis.list(
                            //     rq
                            //)
                            //    .getData()
                            //    .then((result) => {
                            //        debugger;
                            //        view.updateData(result, "update");
                            //    });
                            //view.updateDataRaw(radek)
                            //view.updateData(radek, "refresh")
                            view.updateData(radek, "update");
                        }
                    });
                }
                /**
                 * Defaultni akce na gridu
                 *
                 * V potomku lze predefinovat
                 *
                 * @param row
                 */
                defaultAction(row) {
                    this.parentCnt.log.trace("Start defaultAction GSeznamEkoZaznamuBase");
                    this.showDetail(row);
                }
                /**
                 * Prevedeni kliku na bunku do filtru a nacteni
                 * @param ev
                 */
                dispatchFillServerGridEvent(ev) {
                    this.parentCnt.log.trace("Start dispatchFillServerGridEvent GSeznamEkoZaznamuBase");
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
                        //      Poptat se Skalice, jestli existuje nejaky lepsi zpusob...
                        if (colDef.columnType === "datetime")
                            value = sel[colDef.name];
                        else if (colDef.columnType === "currency")
                            value = sel[colDef.name];
                        //NOTE: Toto je taky spatne, protoze se opira o model, ktery je soucasti v prefabu uvnitr. Jiny zpusob asi zatim neni :-(
                        if (colDef.name === "typ_ag_txt" || colDef.name === "typ_ag")
                            value = { typ_ag: sel.typ_ag, zkr_ag: sel.typ_ag_txt };
                        else if (colDef.name === "ixs_typ" || colDef.name === "ixs_typ_txt")
                            value = { ixs_typ: sel.ixs_typ, ixs_typ_txt: sel.ixs_typ_txt };
                        else if (colDef.name === "esu_txt")
                            value = { esu_txt: sel.esu_txt, ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "esu_ico")
                            value = { esu_ico: sel.esu_ico, ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "esu_rc")
                            value = { esu_rc: sel.esu_rc, ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "ixs_esu")
                            value = { ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "priz_blok")
                            value = { priz_blok: sel["priz_blok"] };
                        var $filterFrmBox = grid.ggridserverfilter("findFields", colDef.name);
                        $filterFrmBox.gfield("setValue", value, { valid: false });
                    }
                }
                /**
                * function createFilterZalozka
                *
                * Obecna zalozka
                * @param {GContent} content
                * @returns {any}
                */
                createFilterZalozka() {
                    throw Error("neimplementovano");
                }
                /**
                 * Vytvoreni filtrovaciho panelu
                 * @param that
                 */
                createFilterPanel(that) {
                    this.parentCnt.log.trace("Start createFilterPanel GSeznamEkoZaznamuBase");
                    var that = this;
                    //let cfuSet = Gordic.Eko.CfuUtils.getCfuSetServerFilters(this.parentCnt, {
                    //    isRoz: this.Rozpocet,
                    //    isUct: this.Ucetnictvi,
                    //    checkUete: this.parentCnt.ekoParams.CheckUete,
                    //    ixsRoz: this.parentCnt.ekoParams.IxsRoz || undefined
                    //});
                    let cfuSet = this.getCfuSetServerFilters(false);
                    var gf = Gordic.Ucr.WebClient.GElementUtils.createElementsGridFormat({
                        ekoParams: this.parentCnt.ekoParams,
                        globals: this.globals,
                        typSestavy: this.typSestavy,
                        cfuSet: cfuSet,
                        filterOptions: this.filterOptions,
                        filterParams: this.parentCnt.filterParams
                    });
                    var elmRowOpts = { label: "Elementy" };
                    elmRowOpts["favoriteRowLayoutDescriptor"] = "w-L-9 w-M-8 w-S-12";
                    //let fpForm: Gordic.Forms.Form;
                    let fpForm = new Gordic.Forms.Form({ tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                        .addSection()
                        .addRow(elmRowOpts)
                        .addField("gselectbox", Gordic.Eko.Prefabs.cfuElements({
                        name: "elementy",
                        //name: "filters",
                        id: this.parentCnt.taskId ? this.parentCnt.taskId + "_elementyField#" : undefined,
                        model: "model.elementy.filters=value",
                        modelValueTransform: {
                            apply: (modelValue) => { return modelValue; },
                            collect: (fieldValue) => { return fieldValue; }
                        },
                        change: function (ev, obj) { that.parentCnt.log.trace("elementy", $(this).gfield("getValue")); },
                        gridFormat: gf,
                        checkUete: this.parentCnt.ekoParams.CheckUete,
                        canAddNewRecords: true,
                        canRemoveRecords: true,
                        createNewRecord: WebClient.GElementUtils.createNewElementFunc(this.globals.RezimProvozu, this.parentCnt.ekoParams),
                        clearRecord: WebClient.GElementUtils.createClearElementFunc(this.globals.RezimProvozu),
                        formatElementValueOptions: { skip: WebClient.GElementUtils.getElementValueSkipColumns(this.globals.RezimProvozu), nameColumn: "nazev" },
                    }));
                    //if (that.showPopisStruktPolozky) {
                    // 18.7.2025: Opraveno TK
                    if (that.pouzivanStrukPopis) {
                        const initialValue = $.extend(true, [], this.filterStrPopis ?? []);
                        fpForm.addRow("jres:31100223") //RC 31100223 : Filtr dle str. popisu
                            .addField("gselectbox", Gordic.Ucr.WebClient.Prefabs.strukturovanyPopisFilter({
                            name: "filterStrPopis",
                            initialValue: initialValue,
                            emptyValue: initialValue, //Optimalizace, abych nemusel delat dalsi request
                            change: (ev, v) => {
                                //Setnuti hodnoty str. popisu z policka ve filterpanelu do policka, kt. je soucasi ggridserverfilter
                                if (!this.addStrPopisColumns || !v.value)
                                    return;
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                for (var i = 0; i < v.value.length; i++) {
                                    let val = v.value[i];
                                    if (this.addStrPopisColumns.indexOf(val.klic) > -1) {
                                        let vv = {};
                                        vv[val.klic] = val.hodnota;
                                        grid.ggridserverfilter("findFields", val.klic).gfield("setValue", vv, { triggerChange: false });
                                    }
                                }
                            }
                        }));
                    }
                    this.$filterPanel = $.newDiv()
                        .appendTo(this.parentCnt.element)
                        .gfilterpanel({
                        forms: [fpForm],
                        favorites: ["md"],
                        favoriteLayoutDescriptor: "L5M3S1 L-12-12-0 M-12-12-0 S-12-12-0",
                        searchButtonOnMainRow: true,
                        saveOptionsForm: WebClient.GUcrMaskaDetail.getForm(gf), //TODO: Dat spravny typ gridformatu!
                        filterStorageService: new WebClient.GUcrMaskaService({ typSestavy: this.typSestavy, parentContent: that.parentCnt, fragments: "*,elementy" }),
                        autoLoadAfterChoseFilter: false,
                        //apply: (ev, data) => { this.loadDataOld(data.filter); },
                        reset: (ev, data) => {
                            let grid = that.getGrid();
                            if (grid == null)
                                return {};
                            grid.ggridserverfilter("clear");
                        },
                        primaryButtonBehaviour: "AlwaysPrimary",
                        clearFilterButtonVisible: "AlwaysVisible",
                        poVyhledaniZobrazit: "OblibenePodminky",
                        filterViewMode: FilterViewMode.Detail,
                        filterViewModeUserSettings: [FilterViewMode.Detail, FilterViewMode.Normal, FilterViewMode.Simple],
                        poVyhledaniZobrazitUserSettings: "Deny" //NOTE: Zakazuje prepinani po vyhledani - pokud se nekdo pokousel vymazat filtr v tomto rezimu, tak musel kliknout na vyhledat, viz T3987
                    });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    this.parentCnt.log.trace("Start closing GSeznamEkoZaznamuBase");
                    return $.Deferred().resolve().promise();
                }
                /**
                 * Vraci objekt filtru
                 * @param {GContent} content
                 * @returns
                 */
                getFilter(fPanelData) {
                    this.parentCnt.log.trace("Start getFilter GSeznamEkoZaznamuBase");
                    var filterDto = fPanelData || {};
                    let elementy = null; //TODO: Po vyberu varianty otypovat!!!
                    let filterStrPopis = [];
                    if (fPanelData) {
                        if (fPanelData.elementy && $.isPlainObject(fPanelData.elementy))
                            elementy = fPanelData.elementy;
                        //if (fPanelData.filters )
                        //    elementy = fPanelData.filters;
                        if (fPanelData.filterStrPopis && fPanelData.filterStrPopis instanceof Array)
                            filterStrPopis = fPanelData.filterStrPopis;
                    }
                    let grid = this.getGrid();
                    if (grid == null)
                        throw $.Deferred().reject().promise();
                    return grid.ggridserverfilter("collect", filterDto)
                        .then((d) => {
                        this.parentCnt.log.trace("filter", d);
                        this.parentCnt.log.trace("elementy", JSON.stringify(elementy));
                        this.parentCnt.log.trace("filterStrPopis", filterStrPopis);
                        this.parentCnt.log.trace("strPopisKeys", this.parentCnt.addStrPopisColumns);
                        if (elementy && elementy.filters && elementy.filters.length > 0) {
                            // kopirovani cfu
                            for (var i = 0; i < elementy.filters.length; i++) {
                                this.copyCfuToObject(elementy.filters[i]["cfu"], elementy.filters[i]);
                            }
                        }
                        // prekopirovani vety
                        this.copyCfuToObject(d["cfu"], d);
                        return { filter: d, elementy: elementy, filterStrPopis: filterStrPopis, skipSumLimit: false, strPopisKeys: this.parentCnt.addStrPopisColumns };
                    });
                }
                /**
                 * Vraci filtr nad gridem
                 * @returns
                 */
                getFilterGrid() {
                    let filterDto = {};
                    let grid = this.getGrid();
                    if (grid == null || !grid.hasClass("ggridserverfilter"))
                        return $.Deferred().resolve().promise();
                    return grid.ggridserverfilter("collect", filterDto)
                        .then((d) => {
                        this.parentCnt.log.trace("filter nad gridem", d);
                        return d;
                    });
                }
                /**
                 * Ulozeni filtru do zasobniku
                 * @param filter
                 */
                setFilterStack(filter) {
                    $.content("main").prop("ulozeneFiltryGrid", filter);
                    //window["_ucrEkoClipboardFilter"] = filter;
                    //this.parentCnt.prop("ulozeneFiltryGrid", filter);            
                }
                /**
                 * Vyber filtru ze zasobniku
                 * @param filter
                 */
                getFilterStack() {
                    return $.content("main").prop("ulozeneFiltryGrid") ?? null;
                    //return window["_ucrEkoClipboardFilter"] as Gordic.Uct.Interface.GEkoFilterDto ?? null;
                    //return this.parentCnt.prop("ulozeneFiltryGrid");            
                }
                /**
                 * Kopie cfu do objektu
                 * @param source
                 * @param destination
                 * @returns
                 */
                copyCfuToObject(source, destination) {
                    this.parentCnt.log.trace("Start copyCfuToObject GSeznamEkoZaznamuBase");
                    if (!source || typeof source["uea"] === "undefined")
                        return;
                    destination.uea = source.uea;
                    destination.ueb = source.ueb;
                    destination.uec = source.uec;
                    destination.ued = source.ued;
                    destination.uee = source.uee;
                    destination.uef = source.uef;
                    destination.ueg = source.ueg;
                    destination.ueh = source.ueh;
                    destination.uei = source.uei;
                    destination.uej = source.uej;
                    destination.te0 = source.te0;
                    destination.te1 = source.te1;
                    destination.te2 = source.te2;
                    destination.te3 = source.te3;
                    destination.te4 = source.te4;
                    if (!source || typeof source.te5 === "undefined")
                        return;
                    destination.uek = source.uek;
                    destination.uel = source.uel;
                    destination.uem = source.uem;
                    destination.uen = source.uen;
                    destination.te5 = source.te5;
                    destination.te6 = source.te6;
                    destination.te7 = source.te7;
                    destination.te8 = source.te8;
                    destination.te9 = source.te9;
                    this.parentCnt.log.trace("Konec copyCfuToObject GSeznamEkoZaznamuBase");
                }
                /**
                 *  Nacteni dat
                 */
                loadData() {
                    this.parentCnt.log.trace("Start loadData GSeznamEkoZaznamuBase");
                    this.reload();
                    this.parentCnt.log.trace("Konec loadData GSeznamEkoZaznamuBase");
                    //throw Error("Neimplementovano");
                }
                /**
                 * Znovunacteni
                 * @returns
                 */
                reload() {
                    this.parentCnt.log.trace("Start reload GSeznamEkoZaznamuBase");
                    let that = this;
                    if (that.loadingData)
                        return;
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    that.loadingData = true;
                    if (that.firstLoad) {
                        that.firstLoad = false;
                        if (that.$filterPanel)
                            that.$filterPanel.gfilterpanel("applyFilter");
                    }
                    that.islView.requestData(undefined)
                        //view.requestData()
                        .always(() => {
                        that.loadingData = false;
                        if (that.parentCnt.closed)
                            return;
                        that._nastaveniAkci();
                        this.parentCnt.log.trace("Reload -> requestData [GSeznamEkoZaznamuBase]");
                    });
                    this.parentCnt.log.trace("Konec reload GSeznamEkoZaznamuBase");
                    //view.getLoadingPromise().always(() => {
                    //    debugger;
                    //    that.loadingData = false;
                    //    that.nastaveniAkci();
                    //});
                }
                /**
                 * Prechazejici fasledujici
                 *
                 */
                prevFilter() {
                    this.parentCnt.log.trace("Start prevFilter GSeznamEkoZaznamuBase");
                    --this.currFilterHistoryIndex;
                    if (this.filterHistory.length > 0 && this.filterHistory.length > this.currFilterHistoryIndex && this.currFilterHistoryIndex > -1) {
                        this.moveFilter(this.filterHistory[this.currFilterHistoryIndex]);
                    }
                    else {
                        ++this.currFilterHistoryIndex;
                    }
                }
                /**
                 *
                 * Nalsedujici filtr
                 *
                 */
                nextFilter() {
                    this.parentCnt.log.trace("Start nextFilter GSeznamEkoZaznamuBase");
                    ++this.currFilterHistoryIndex;
                    if (this.filterHistory.length > 0 && this.filterHistory.length > this.currFilterHistoryIndex && this.currFilterHistoryIndex > -1) {
                        this.moveFilter(this.filterHistory[this.currFilterHistoryIndex]);
                    }
                    else {
                        --this.currFilterHistoryIndex;
                    }
                }
                moveFilter(currFilter) {
                    this.parentCnt.log.trace("Start moveFilter GSeznamEkoZaznamuBase");
                    this.addFilterToHistory = false;
                    if (typeof currFilter != undefined && typeof currFilter["filter"] != undefined) {
                        let grid = this.getGrid();
                        if (grid == null)
                            return;
                        grid.ggridserverfilter("apply", currFilter.filter);
                        //NOTE: Toto zatim nebude fungovat, zalezi na variante elmentu, ktera vyhraje
                        //this.element.find(".gfilterpanel").gfilterpanel("applyFilter", currFilter.elementy.filters);
                        this.doFilterClick();
                    }
                }
                /**
                 * Pridani podminky do historie filtru
                 * @param newFilter
                 */
                addFilterIntoHistory(newFilter) {
                    this.parentCnt.log.trace("Start addFilterIntoHistory GSeznamEkoZaznamuBase");
                    let that = this;
                    if (that.rememberHistory === false)
                        return;
                    if (that.addFilterToHistory) {
                        if (that.currFilterHistoryIndex !== that.filterHistory.length - 1)
                            that.filterHistory.splice(that.currFilterHistoryIndex + 1);
                        that.filterHistory.push(newFilter);
                        that.currFilterHistoryIndex++;
                    }
                    that.addFilterToHistory = true;
                    that.parentCnt.actions["nextFilterAct"]?.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                    that.parentCnt.actions["prevFilterAct"]?.enabled(that.currFilterHistoryIndex > 0);
                }
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 *
                 */
                createGridFormat(typeZapis) {
                    throw Error("Neimplementovano");
                }
                /**
                 * Zobrazeni prim. dokladu
                 * @param row
                 */
                showPrimDoklad(row, typ = "") {
                    this.parentCnt.log.trace("Start showPrimDoklad GSeznamEkoZaznamuBase");
                    if (!row) {
                        //let grid = this.getGrid();
                        //if (grid == null) return;
                        //let currentRow = grid.ggrid<Uct.Interface.GSeznamZapisuStavuDto>("activeRow",true);
                        //if (!currentRow) return;
                        //if (currentRow?._isVirtual)
                        //    row = currentRow["structure"].rows[0].data as Uct.Interface.GSeznamZapisuStavuDto;
                        //else
                        //    row = currentRow.data as Uct.Interface.GSeznamZapisuStavuDto;
                        let rowi = this.getCurrentRow();
                        if (rowi === null)
                            return;
                        row = rowi;
                    }
                    ;
                    debugger;
                    let ixp = (typ === "PRI") ? row.ixp_prim : row.ixp;
                    //if (typ === "PRI")
                    //    ixp = row.ixp_prim;
                    //let typAg = row.typ_ag;
                    // typ agendy se dohleda automaticky
                    let typAg = null;
                    // doklad blk
                    if (typ == "BLK") {
                        //doklad blk
                        //typAg = null;
                        if (this.parentCnt.TypUlohy == 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ || this.parentCnt.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                            // Doklad BLK
                            if (typeof row.ixp_prim === "undefined" || row.ixp_prim == null)
                                return;
                            ixp = row.ixp_prim;
                        }
                    }
                    // doklad sml
                    else if (typ == "SML") {
                        ixp = row.ixp_sml;
                    }
                    // Rozpoctove opatreni
                    else if (typ == "RO") {
                        //typAg = null;
                        // Specialitka pro strednedoby vyhled
                        if (this.parentCnt.TypUlohy == 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ || this.parentCnt.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                            // Doklad RO
                            if (typeof row.ixp_roz === "undefined" || row.ixp_roz == null)
                                return;
                            typAg = 50;
                            ixp = row.ixp_roz;
                        }
                    }
                    if (typAg !== null && ![40, 50, 70, 80, 100, 110, 120, 180, 230, 510, 580, 620, 330].concat(row.typ_ag))
                        return;
                    // test na vyplnenini ixp
                    if (typeof ixp === "undefined" || ixp === null)
                        return;
                    //Wfl.Dialogs.DetailDokumentuSpisu(this.parentCnt, { SimpleMode: true, DetailDto: { ixp: ixp } }, Global.Enums.ModOtevreni.auto);
                    //return;
                    Gordic.WebApp.Utility.openApp({
                        ixx1: ixp, // id cílového objektu v nově otevírané záložce
                        //ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //typAg: typAg,  // typ agendy cílového objektu (nepovinné)
                        //faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                        banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                        noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                    }, "OpenDetail" // název metody spuštěné po otevření nové záložky
                    ).catch(() => {
                        Gordic.Wfl.Dialogs.DetailDokumentuSpisu(this.parentCnt, { SimpleMode: false, /*IxpInitProVazbuSouvisejicich: ixp!,*/ DetailDto: { ixp: ixp } }, Gordic.Global.Enums.ModOtevreni.auto);
                    });
                }
                toggleGrouping(profileName) {
                    this.parentCnt.log.trace("Start toggleGrouping GSeznamEkoZaznamuBase");
                    GDlg.alert("jres:30250596"); //RC 30250596 : Pro přepnutí zobrazení mezi 'Doklady' a 'Zápisy' použijte profily gridu.
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    let currProfile = grid.ggrid("getCurrentProfile");
                    profileName = profileName || (currProfile.name !== this.profiles.doklady.name ? this.profiles.doklady.name : this.profiles.default.name);
                    if (currProfile.name === profileName)
                        return;
                    grid.ggrid("useProfile", profileName);
                }
                /**
                 * Nacteni urovne ze slov ucetni vety
                 *
                 * @returns
                 */
                getUroven() {
                    let that = this;
                    this.parentCnt.log.trace("Start getUroven GSeznamEkoZaznamuBase");
                    let slovRozvrhu = this.parentCnt.userSettings?.get("selectedWordsShowGridColumns");
                    if (!slovRozvrhu)
                        return $.Deferred().resolve(15).promise();
                    let slova = "";
                    slovRozvrhu.forEach((item) => { slova += item.hodnota + ","; });
                    this.parentCnt.log.debug("Slova z rozrvurhu: ", slovRozvrhu);
                    return this.parentCnt.call("GetUroven", { slova })
                        .then(function (result) {
                        that.parentCnt.log.debug("Uroven: ", result);
                        return result;
                    });
                }
                /**
                 * Zobrazit texty z rovrhu
                 *
                 * @returns
                 */
                autoLoadTextyZRozvrhu() {
                    this.parentCnt.log.trace("Start autoLoadTextyZRozvrhu GSeznamEkoZaznamuBase");
                    let result = (this.parentCnt.globalSettings?.get("Global.Ucr.AppSettings.UctSettingsForm.autoLoadTextyZRozvrhuColumns") ?? false);
                    this.parentCnt.log.debug("Automaticke nacitani textu z rozvrhu: ", result);
                    return result;
                }
                /**
                 * Zobrazit texty z rovrhu
                 *
                 * @returns
                 */
                displayTextyZRozvrhu() {
                    this.parentCnt.log.trace("Start displayTextyZRozvrhu GSeznamEkoZaznamuBase");
                    //content.globalSettings!.get("Global.Ucr.AppSettings.UctSettingsForm.EvidenceAkce");
                    if (!this.useTextyZRozvrhu)
                        return false;
                    // zjisteni prednastavenych slov rozvrhu
                    let slovRozvrhu = this.parentCnt.userSettings?.get("selectedWordsShowGridColumns");
                    if (!slovRozvrhu) {
                        this.parentCnt.log.debug("Zobrazit texty z rozvrhu: nejsou prednastavena slova");
                        return false;
                    }
                    //pokud neni vybrano zadne slovo, neni co zobrazovat
                    let result = (this.parentCnt.globalSettings?.get("Global.Ucr.AppSettings.UctSettingsForm.showTextyZRozvrhuColumns") ?? false) && slovRozvrhu.length > 0;
                    this.parentCnt.log.debug("Zobrazit texty z rozvrhu ", result);
                    return result;
                }
                /**
                 * Zobrazit akci bez PAP
                 *
                 * @returns
                 */
                showPapAction() {
                    this.parentCnt.log.trace("Start usePap GSeznamEkoZaznamuBase");
                    //content.globalSettings!.get("Global.Ucr.AppSettings.UctSettingsForm.EvidenceAkce");
                    if (!this.usePapRows)
                        return false;
                    //pokud neni vybrano zadne slovo, neni co zobrazovat
                    let result = (this.parentCnt.globalSettings?.get("Global.Ucr.AppSettings.UctSettingsForm.readWithoutPap") ?? false);
                    this.parentCnt.log.debug("Zobrazit akci bez PAP ", !result);
                    return !result;
                }
                /**
                 * Stav vyberu PAP zapisu
                 *
                 * @returns
                 */
                getCheckedPap() {
                    if (this.usePapRows) {
                        let checked = this.parentCnt.actions.bezPapAct?.checked();
                        return (typeof checked == "undefined" ? false : checked);
                    }
                    else
                        return false;
                }
                /**
                 * Nacte cfu set (z gcontentu nebo primo z argumentu) a jednotlivym sloupcum vytvori propertu 'serverFilter' pro CFU.
                 * @param delegateIntervalOptionsUse {boolean} true bude pouzit delegat pro pripadnou upravu options cfuIntervalu pred jeho vytvorenim
                 */
                getCfuSetServerFilters(delegateIntervalOptionsUse) {
                    return Gordic.Eko.CfuUtils.getCfuSetServerFilters(this.parentCnt, this.getCfuIntervalOptions(delegateIntervalOptionsUse));
                }
                /**
                 * Ziskani nastaveni pro infetval cfu
                 * @param delegateIntervalOptionsUse {boolean} true bude pouzit delegat pro pripadnou upravu options cfuIntervalu pred jeho vytvorenim
                 * @returns
                 */
                getCfuIntervalOptions(delegateIntervalOptionsUse) {
                    return {
                        isRoz: this.Rozpocet,
                        isUct: this.Ucetnictvi,
                        checkUete: this.parentCnt.ekoParams.CheckUete,
                        wildcard: this.parentCnt.Globals.Others?.Wildcard,
                        ixsRoz: this.parentCnt.ekoParams.IxsRoz || undefined,
                        /** Delegat pro pripadnou upravu options cfuIntervalu pred jeho vytvorenim */
                        getIntervalOptions: delegateIntervalOptionsUse ? ((dto, opts) => {
                            if (!this.Filter || !this.StrictFilter)
                                return opts;
                            opts.disabled = !!!this.Filter[dto.name];
                            return opts;
                        }) : undefined
                    };
                }
                /**
                 * Zjisteni aktualniho radku
                 *
                 *  @returns
                 */
                getCurrentRow(grid) {
                    grid = typeof grid === "undefined" || grid === null ? this.getGrid() : grid;
                    // pokud neni grid, nic nedelej
                    if (grid == null)
                        return null;
                    const that = this.parentCnt;
                    // pokud je content zavreny, pak nic nedelej
                    if (that.closed)
                        return null;
                    let currentRow = grid.ggrid("activeRow", true);
                    if (!currentRow)
                        return null;
                    // zjisteni aktualniho radku
                    return (currentRow?._isVirtual) ? (currentRow["structure"] ? currentRow["structure"].rows[0].data : null)
                        : currentRow.data;
                }
            }
            WebClient.GSeznamEkoZaznamuBase = GSeznamEkoZaznamuBase;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1phem5hbXVCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUVrb1phem5hbXVCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FtK0RmO0FBbitERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FtK0RuQjtJQW4rRGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW0rRDdCO1FBbitEb0IsV0FBQSxTQUFTO1lBQzFCOzs7OztjQUtFO1lBQ0YsTUFBYSxxQkFBcUI7Z0JBd0o5Qjs7OzttQkFJRztnQkFDSCxZQUFZLE9BQXFDO29CQUM3QyxtQkFBbUI7b0JBL0h2Qiw2QkFBNkI7b0JBQ25CLFdBQU0sR0FBdUIsU0FBUyxDQUFDO29CQU92QyxnQkFBVyxHQUFZLEtBQUssQ0FBQyxDQUFDLHVCQUF1QjtvQkFJckQsa0JBQWEsR0FBdUcsRUFBRSxDQUFDO29CQUN2SCwyQkFBc0IsR0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO29CQWdCN0M7O3VCQUVHO29CQUNPLGNBQVMsR0FBVyxjQUFjLENBQUM7b0JBVzdDOzs7dUJBR0c7b0JBQ08scUJBQWdCLEdBQUcsS0FBSyxDQUFDO29CQUNuQzs7O3VCQUdHO29CQUNPLGVBQVUsR0FBRyxLQUFLLENBQUM7b0JBQzdCOzs7dUJBR0c7b0JBQ08sb0JBQWUsR0FBRyxLQUFLLENBQUM7b0JBRWxDLG1CQUFtQjtvQkFDVCxrQkFBYSxHQUFZLEtBQUssQ0FBQztvQkFDekMsMkJBQTJCO29CQUNqQix1QkFBa0IsR0FBWSxLQUFLLENBQUM7b0JBQzlDLDhCQUE4QjtvQkFDcEIsdUJBQWtCLEdBQVksSUFBSSxDQUFDO29CQUk3Qyw2QkFBNkI7b0JBQ25CLDRCQUF1QixHQUFZLElBQUksQ0FBQztvQkFDbEQsNkJBQTZCO29CQUNuQiw2QkFBd0IsR0FBWSxJQUFJLENBQUM7b0JBU3pDLFlBQU8sR0FBWSxL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LENBQUM7b0JBRTdCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQXNDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDcEYsSUFBSSxDQUFDLFVBQVU7d0JBQUUsT0FBTyxJQUFJLENBQUM7b0JBQzdCLDRCQUE0QjtvQkFDNUIsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBMkMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDO3dCQUN6SSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQTJDLENBQUM7Z0JBQ2pFLENBQUM7YUFFSjtZQXQ5RFksK0JBQXFCLHdCQXM5RGpDLENBQUE7UUFNTCxDQUFDLEVBbitEb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBbStEN0I7SUFBRCxDQUFDLEVBbitEZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbStEbkI7QUFBRCxDQUFDLEVBbitEUyxNQUFNLEtBQU4sTUFBTSxRQW0rRGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVkZWsgc2V6YW5tdSBrb250ZW50dVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHRrYXJlc1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuNjlcclxuICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUVrb1phem5hbXVCYXNlIGltcGxlbWVudHMgSUdTZXpuYW1Fa29aYXpuYW11QmFzZSB7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBla29QYXJhbXM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdFa29QYXJhbXNEdG87XHJcbiAgICAgICAgLy9wcml2YXRlIHRlbWE6IHN0cmluZztcclxuXHJcbiAgICAgICAgLy8gcGFyYW1ldHJ5IGFwbGlrYWNlXHJcbiAgICAgICAgcHJvdGVjdGVkIGdsb2JhbFBhcmFtczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclBhcmFtc0R0bztcclxuICAgICAgICBwcm90ZWN0ZWQgZmlsdGVyT3B0aW9uczogR29yZGljLlVjci5XZWJDbGllbnQuRHRvLkdGaWx0ZXJPcHRpb25zRHRvO1xyXG4gICAgICAgIHByb3RlY3RlZCBGaWx0ZXI6IEdFa29GaWx0ZXJEdG87IC8vTXV6ZSBieXQgcHJlZHZ5cGxuZW5vIHogdmVua3VcclxuICAgICAgICBwcm90ZWN0ZWQgRXh0ZXJuaVN1bWFyaXphY2U6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIEN1cnJlbnRSb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bzsgLy8gYWt0dWFsbmkgdnlicmFueSByYWRlayB6ZSBzZXpuYW11XHJcbiAgICAgICAgcHJvdGVjdGVkIGZpbHRlclN0clBvcGlzPzogR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdO1xyXG4gICAgICAgIHByb3RlY3RlZCBhZGRTdHJQb3Bpc0NvbHVtbnM/OiBzdHJpbmdbXTsgICAvL1Nlem5hbSBzbG91cGN1IHN0ci4gcG9waXN1LCBrdGVyZSBieSBtZWx5IGJ5dCBwcmlkYW55IGRvIGdyaWR1IChwb3V6ZSBwcm8gWmFwaXN5VWNldG5pY3R2aSkgKClcclxuICAgICAgICBwcm90ZWN0ZWQgUm93czogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvW107IC8vIGFrdHVhbG5pIHZ5YnJhbnkgcmFkZWsgemUgc2V6bmFtdVxyXG4gICAgICAgIHByb3RlY3RlZCBSYWRla19EUEg6IHN0cmluZzsgLy9NdXplIGJ5dCBwcmVkdnlwbG5lbm8geiB2ZW5rdVxyXG4gICAgICAgIHByb3RlY3RlZCBTdHJpY3RGaWx0ZXI6IGJvb2xlYW47IC8vTXV6ZSBieXQgcHJlZHZ5cGxuZW5vIHogdmVua3VcclxuICAgICAgICBwcm90ZWN0ZWQgQXV0b0xvYWREYXRhOiBib29sZWFuOyAvL011emUgYnl0IHByZWR2eXBsbmVubyB6IHZlbmt1XHJcbiAgICAgICAgcHJvdGVjdGVkIEVjZGQ6IHN0cmluZzsgLy9NdXplIGJ5dCBwcmVkdnlwbG5lbm8geiB2ZW5rdVxyXG4gICAgICAgIHByb3RlY3RlZCBEaWM6IHN0cmluZzsgLy9NdXplIGJ5dCBwcmVkdnlwbG5lbm8geiB2ZW5rdVxyXG4gICAgICAgIHByb3RlY3RlZCBaYXBpc292YTogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgZGVidWc6IGJvb2xlYW4gICAgICAvLyBkZWJ1ZyBtb2RlXHJcbiAgICAgICAgcHJvdGVjdGVkIEF2b2lkVXVzOiBib29sZWFuO1xyXG4gICAgICAgIHByb3RlY3RlZCBBdm9pZE5rczogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgQXZvaWRFeHQ6IGJvb2xlYW47XHJcbiAgICAgICAgLy9aYXBpc292YTogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgUm96cG9jZXQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIFVjZXRuaWN0dmk6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIHR5cFNlc3Rhdnk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JUeXBTZXN0YXZ5XHJcbiAgICAgICAgcHJvdGVjdGVkIHRlbWE6IHN0cmluZztcclxuICAgICAgICAvLyBmaWx0cm92YWNpIHBhbmVsXHJcbiAgICAgICAgcHJvdGVjdGVkICRmaWx0ZXJQYW5lbDogSlF1ZXJ5O1xyXG4gICAgICAgIC8vIGtsaWNvdmUgc2xvdXBjZSBuYSBzZXpuYW11XHJcbiAgICAgICAgcHJvdGVjdGVkIG15S2V5czogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIC8vIGdyaWQgc2Ugc2VuYW1lbVxyXG4gICAgICAgIC8vcHJvdGVjdGVkICRncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8vIE5hc3RhdmVuaVxyXG4gICAgICAgIHByb3RlY3RlZCBHbG9iYWxzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyR2xvYmFsRHRvO1xyXG4gICAgICAgIC8vcHJvdGVjdGVkIFR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlO1xyXG4gICAgICAgIHByb3RlY3RlZCBWb2xhbm9aVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGU7IC8vIHZvbGFubyB6IHVsb2h5XHJcbiAgICAgICAgcHJvdGVjdGVkIGxvYWRpbmdEYXRhOiBib29sZWFuID0gZmFsc2U7IC8vIGF0cmlidXQgbmFjaXRhbmkgZGF0XHJcbiAgICAgICAgcHJvdGVjdGVkIFR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlOyAvLyB0eXAgdWxvaHlcclxuICAgICAgICBwcm90ZWN0ZWQgcGFyZW50Q250OiBHU2V6bmFtRWtvWmF6bmFtdUJhc2VDb250ZW50O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZmlsdGVySGlzdG9yeTogQXJyYXk8R1Nlem5hbUVrb1phem5hbXVHZXREYXRhRmlsdGVyRHRvPiAmIEFycmF5PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pTdGF2eUFhdExpc3RSZXF1ZXN0RHRvPiAgPSBbXTtcclxuICAgICAgICBwcm90ZWN0ZWQgY3VyckZpbHRlckhpc3RvcnlJbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICAgICAgcHJvdGVjdGVkIGFkZEZpbHRlclRvSGlzdG9yeTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgcHJvdGVjdGVkIHByZXZpZXdDb250cm9sbGVyOiBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyPElHU2V6bmFtWmFwaXN1U3RhdnVEdG9XaXRoVGFiU2V0dGluZ3M+O1xyXG4gICAgICAgIHByb3RlY3RlZCBwcm9maWxlczogSUdTZXpuYW1aYXBpc3VQcm9maWxlcztcclxuICAgICAgICBwcm90ZWN0ZWQgZGV0YWlsSW5mOiBzdHJpbmc7IC8vIGRvZGF0ZWNuZSBpbmZvcm1hY2UgdmUgc3RhdHVzYmFydVxyXG4gICAgICAgIHByb3RlY3RlZCBQcml6SWlzc3A6IGJvb2xlYW47XHJcbiAgICAgICAgLy8gYWtjZSB0ZWNrYVxyXG4gICAgICAgIHByb3RlY3RlZCBkb3RBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJvdGVjdGVkIGNsZWFyRmlsdGVyUm93QWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByb3RlY3RlZCBwcmludEFjdDogR1ByaW50QWN0aW9uVHlwZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQYXJhbXNEdG87XHJcbiAgICAgICAgcHJvdGVjdGVkIHprcmF0a3k6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HVWNyWmtyRHRvO1xyXG4gICAgICAgIHByb3RlY3RlZCB0ZXh0eTogR29yZGljLlVjci5XZWJDbGllbnQuRHRvLkdVY3Jaa3JEdG87XHJcblxyXG4gICAgICAgIC8vIGNmdXNldFxyXG4gICAgICAgIHByb3RlY3RlZCBjZnVTZXRTb3J0ZWQ6IEd1aS5XZWJBcHAuR0dyaWRGb3JtYXREdG87XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdHJpZGEgZ3JpZHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2xhc3NHcmlkOiBzdHJpbmcgPSBcImpzLWdyaWQtYmFzZVwiO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGlkZW50aWZpa2F0b3IgdWNldG5paG8gcm96dnJodVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBpeHNSb3o6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBpZGVudGlmaWthdG9yIFNheFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBpeHNTYXg6IHN0cmluZztcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBvdXppdmF0IHRleHR5IHogcm96dnJodVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCB1c2VUZXh0eVpSb3p2cmh1ID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG91eml2YXQgUEFQIHJhZGt5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHVzZVBhcFJvd3MgPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYW1hdG92YW5pIGhpc3RvcmllXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlbWVtYmVySGlzdG9yeSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBwb3ZvbGVuaSBuYWhsZWR1XHJcbiAgICAgICAgcHJvdGVjdGVkIHBvdm9sZW5OYWhsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvLyBwb3V6aXZhIHNlIHN0cnVrdC4gcG9waXNcclxuICAgICAgICBwcm90ZWN0ZWQgcG91eml2YW5TdHJ1a1BvcGlzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLy8gU291Y3R5IHZlIHN0YXR1cyBiYXJ1IGdyaWR1XHJcbiAgICAgICAgcHJvdGVjdGVkIHNvdWNldFZlU3RhdHVzQmFydTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgLy8gSXNsIHZpZXcgXHJcbiAgICAgICAgcHJvdGVjdGVkIGlzbFZpZXc6IEdvcmRpYy5Jc2wuVmlldzxJR1Nlem5hbVphcGlzdVN0YXZ1RHRvV2l0aFRhYlNldHRpbmdzPjtcclxuICAgICAgICBwcm90ZWN0ZWQgc3VtYXJlX3Byb2Nlc3NvcjogR29yZGljLkRhdGEuQmFzZVByb2Nlc3NvcjxJR1Nlem5hbVphcGlzdVN0YXZ1RHRvV2l0aFRhYlNldHRpbmdzPjtcclxuICAgICAgICAvLyBBdXRvbWF0aWNreSBzb3VjdG92eSByYWRla1xyXG4gICAgICAgIHByb3RlY3RlZCBzb3VjdG92eVJhZGVrQXRvbWF0aWNreTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgLy8gU2VydmVyb3Z5IGZpbHRyIG5hZCBncmlkZW1cclxuICAgICAgICBwcm90ZWN0ZWQgc2VydmVyb3Z5RmlsdGVyTmFkR3JpZGVtOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB0YXNrIHBybyBwb2NldFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHRhc2tDb3VudDogSXNsLl9UYXNrPElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBudW1iZXI+O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRhc2sgcHJvIHNlem5hbVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHRhc2tMaXN0OiBJc2wuX1Rhc2s8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PjtcclxuICAgICAgICBwcm90ZWN0ZWQgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJheml0IGRhdGEgeiBFU1VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgc2hvd0VzdTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJheml0IGRhdGEgeiBFU1UgLSBzdGFyYSBob2Rub3RhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHNob3dFc3VPbGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6aXQgc3RydWt0dXJvdmFueSBwb3Bpc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBzaG93UG9waXNTdHJ1a3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXppdCBzdHJ1a3R1cm92YW55IHBvcGlzIC0gc3RhcmEgaG9kbm90YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBzaG93UG9waXNTdHJ1a3RPbGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6aXQgdnlicmFuZSBwb2xvemt5IHN0cnVrdHVyb3ZhbmVobyBwb3Bpc3VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgc2hvd1BvcGlzU3RydWt0UG9sb3preTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG5hY2l0YW5pIGJleiBQQVAgcmFka3VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZmlsdGVyUGFwOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJheml0IHZ5YnJhbmUgcG9sb3preSBzdHJ1a3R1cm92YW5laG8gcG9waXN1IC0gc3RhcmEgaG9kbm90YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBzaG93UG9waXNTdHJ1a3RQb2xvemt5T2xkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQXRyaWJ1dCAxLiBuYWN0ZW5pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGZpcnN0TG9hZCA9IHRydWU7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmYWlsdG5pIGFrY2UgbmEgZ3JpZHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZGVmYXVsdEdyaWRBY3Rpb246IEdBY3Rpb247XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29uc3RydWt0b3JcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gY29udGVudCAtIHBhcmVudCBjb250ZW50XHJcbiAgICAgICAgICovICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBHU2V6bmFtRWtvWmF6bmFtdUJhc2VDb250ZW50KSB7XHJcbiAgICAgICAgICAgIC8vc3VwZXIoKTsgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnRlbnQubG9nT3B0aW9ucyA9IHsgbmFtZTogXCJHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIiwgYXV0aG9yQ29kZTogMzAyLCBmaWxlOiBcIkdTZXpuYW1Fa29aYXpuYW11QmFzZS50c1wiIH07XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250ID0gY29udGVudDtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgY29uc3RydWN0b3IgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5aYXBpc292YSA9IGNvbnRlbnQuWmFwaXNvdmE7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsUGFyYW1zID0gY29udGVudC5nbG9iYWxQYXJhbXM7XHJcbiAgICAgICAgICAgIHRoaXMuR2xvYmFscyA9IGNvbnRlbnQuR2xvYmFscztcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0gY29udGVudC5maWx0ZXJPcHRpb25zO1xyXG4gICAgICAgICAgICB0aGlzLkZpbHRlciA9IGNvbnRlbnQuRmlsdGVyO1xyXG4gICAgICAgICAgICB0aGlzLmRlYnVnID0gY29udGVudC5kZWJ1ZztcclxuICAgICAgICAgICAgdGhpcy5FeHRlcm5pU3VtYXJpemFjZSA9IGNvbnRlbnQuRXh0ZXJuaVN1bWFyaXphY2U7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VycmVudFJvdyA9IGNvbnRlbnQuQ3VycmVudFJvdztcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJTdHJQb3BpcyA9IGNvbnRlbnQuZmlsdGVyU3RyUG9waXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3RyUG9waXNDb2x1bW5zID0gY29udGVudC5hZGRTdHJQb3Bpc0NvbHVtbnM7XHJcbiAgICAgICAgICAgIHRoaXMuUm93cyA9IGNvbnRlbnQuUm93cztcclxuICAgICAgICAgICAgdGhpcy5SYWRla19EUEggPSBjb250ZW50LlJhZGVrX0RQSDtcclxuICAgICAgICAgICAgdGhpcy5TdHJpY3RGaWx0ZXIgPSBjb250ZW50LlN0cmljdEZpbHRlcjtcclxuICAgICAgICAgICAgdGhpcy5BdXRvTG9hZERhdGEgPSBjb250ZW50LkF1dG9Mb2FkRGF0YTtcclxuICAgICAgICAgICAgdGhpcy5EaWMgPSBjb250ZW50LkRpYztcclxuICAgICAgICAgICAgdGhpcy5Bdm9pZFV1cyA9IGNvbnRlbnQuQXZvaWRVdXM7XHJcbiAgICAgICAgICAgIHRoaXMuQXZvaWROa3MgPSBjb250ZW50LkF2b2lkTmtzO1xyXG4gICAgICAgICAgICB0aGlzLkF2b2lkRXh0ID0gY29udGVudC5Bdm9pZEV4dDtcclxuICAgICAgICAgICAgLy90aGlzLlJvenBvY2V0ID0gY29udGVudC5Sb3pwb2NldDtcclxuICAgICAgICAgICAgLy90aGlzLlVjZXRuaWN0dmkgPSBjb250ZW50LlVjZXRuaWN0dmk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlJvenBvY2V0ID0gY29udGVudFtcIlJvenBvY2V0XCJdID8/IGZhbHNlOyAvLyBwb2t1ZCBuZW5pIG5hc3RhdmVuZSwgdGFrIGplIGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuVWNldG5pY3R2aSA9IGNvbnRlbnRbXCJVY2V0bmljdHZpXCJdID8/IGZhbHNlOyAvLyBwb2t1ZCBuZW5pIG5hc3RhdmVuZSwgdGFrIGplIGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMudGVtYSA9IGNvbnRlbnQudGVtYTtcclxuICAgICAgICAgICAgdGhpcy50eXBTZXN0YXZ5ID0gY29udGVudC50eXBTZXN0YXZ5O1xyXG4gICAgICAgICAgICB0aGlzLlR5cFVsb2h5ID0gY29udGVudC5UeXBVbG9oeTtcclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxJbmYgPSBjb250ZW50LmRldGFpbEluZjsgLy8gZG9kYXRlY25lIGluZm9ybWFjZSB2ZSBzdGF0dXNiYXJ1XHJcbiAgICAgICAgICAgIHRoaXMuUHJpeklpc3NwID0gY29udGVudC5Qcml6SWlzc3A7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFscyA9IEdvcmRpYy5VY3IuR2xvYmFscy5HVWNyR2xvYmFscztcclxuICAgICAgICAgICAgdGhpcy56a3JhdGt5ID0gR29yZGljLlVjci5HbG9iYWxzLkdaa3I7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dHkgPSBHb3JkaWMuVWNyLkdsb2JhbHMuR1R4dDtcclxuICAgICAgICAgICAgdGhpcy5peHNSb3ogPSBjb250ZW50W1wiaXhzUm96XCJdO1xyXG4gICAgICAgICAgICB0aGlzLml4c1NheCA9IGNvbnRlbnRbXCJpeHNTYXhcIl07XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BvcGlzU3RydWt0UG9sb3preSA9IChjb250ZW50LnVzZXJTZXR0aW5ncz8uZ2V0KFwicm96c2lyZW55UG9waXNBdXRvQWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1BvcGlzU3RydWt0ID0gKGNvbnRlbnQudXNlclNldHRpbmdzPy5nZXQoXCJzdHJ1a3R1cm92YW55UG9waXNEb2tsYWR1QXV0b0FkZEdyaWRDb2x1bW5zXCIpIGFzIGJvb2xlYW4gPz8gZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dFc3UgPSAoY29udGVudC51c2VyU2V0dGluZ3M/LmdldChcImVzdUFkZEdyaWRDb2x1bW5zXCIpIGFzIGJvb2xlYW4gPz8gZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN0clBvcGlzQ29sdW1ucyA9IChjb250ZW50LnVzZXJTZXR0aW5ncz8uZ2V0KFwicm96c2lyZW55UG9waXNTaG93R3JpZENvbHVtbnNcIikpO1xyXG4gICAgICAgICAgICAvL3RoaXMuY29sdW1uc1BvcGlzU3RydWt0ID0gY29udGVudC51c2VyU2V0dGluZ3M/LmdldChcInJvenNpcmVueVBvcGlzU2hvd0dyaWRDb2x1bW5zXCIpOyBcclxuICAgICAgICAgICAgdGhpcy5jZnVTZXRTb3J0ZWQgPSBjb250ZW50LmNmdVNldFNvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbmFzdGF2ZW5pIGlkIGEgdGl0dWxrdSBva25hXHJcbiAgICAgICAgLy90YXNrSWQgPSBcInNlem5hbVN0YXZ5S29uc29saWRhY2VcIjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IG9uQ29udGVudFJlYWR5IEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLkNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIHN0YXR1cyBiYXJ1XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5kZXRhaWxJbmYgIT09IFwidW5kZWZpbmVkXCIgJiYgdGhpcy5kZXRhaWxJbmYudHJpbSgpICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5zdGF0dXNCYXIoW3sgdHlwZTogXCJzdGF0aWNcIiwgY2FwdGlvbjogdGhpcy5kZXRhaWxJbmYgfV0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5tZW51QmFyKHRoaXMuY3JlYXRlTWVudWJhckRlZih0aGlzLnBhcmVudENudC5UeXBVbG9oeSkpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGV0YWlsSW5mICE9PSBcInVuZGVmaW5lZFwiICYmIHRoaXMuZGV0YWlsSW5mLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuc3RhdHVzQmFyKFt7IHR5cGU6IFwic3RhdGljXCIsIGNhcHRpb246IHRoaXMuZGV0YWlsSW5mIH1dKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCh0aGlzKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucG91eml2YW5TdHJ1a1BvcGlzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1BvcGlzU3RydWt0KSBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFN0clBvcGlzQ29sdW1ucyA9IHRoaXMucGFyZW50Q250LnVzZXJTZXR0aW5ncz8uZ2V0KFwicm96c2lyZW55UG9waXNTaG93R3JpZENvbHVtbnNcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoYXQuc3VtYXJlX3Byb2Nlc3NvciA9IG5ldyBHb3JkaWMuRGF0YS5CYXNlUHJvY2Vzc29yKHtcclxuICAgICAgICAgICAgICAgIHRpZXJzOiB7IHZpZXc6IHsgb3JkZXI6IDEgfSB9LFxyXG4gICAgICAgICAgICAgICAgcHJvY2VzczogKHRpZXJzLCBkYXRhLCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VtID0gZGF0YS5maW5kKChyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoKHIuX2lzU3VtbWFyeSkgJiYgKHIuX2lzU3VtbWFyeSA9PSB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXN0YXZTdW1hY25pUmFkZWsoc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBncmlkdVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5pc2xWaWV3Lm9uKFwiY2hhbmdlXCIsIChvYmopID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmVudENudC5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoubG9hZGluZ1N0YXRlID4gMCAmJiB0aGF0LmF1dG9Mb2FkVGV4dHlaUm96dnJodSgpICYmIHRoYXQudXNlVGV4dHlaUm96dnJodSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZFRleHR5WlJvenZyaHUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEtsLiB6a3JhdGt5XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU2hvcnRDdXQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBvdm9sZW5OYWhsZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmVsZW1lbnQuZ3NpZGViYXIoXCJvcHRpb25cIiwgXCJyaWdodFwiLCB7IHVzZXJTZXR0aW5nczogdGhpcy5wYXJlbnRDbnQudXNlclNldHRpbmdzISwgd2lkdGg6IDUwMCwgdmlzaWJsZTogZmFsc2UsLyogcGlubmVkOiBmYWxzZSwgbGVhZnNBdXRvSGlkZTogZmFsc2UqLyB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIgPSBuZXcgR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjxJR1Nlem5hbVphcGlzdVN0YXZ1RHRvV2l0aFRhYlNldHRpbmdzPih0aGlzLnBhcmVudENudC5lbGVtZW50LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlU3VidGFzazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZWxPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIxN1wiLCAvL1JDIDMxMTAwMjE3IDogTsOhaGxlZCBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGU6IFwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjE3XCIsIC8vUkMgMzExMDAyMTcgOiBOw6FobGVkIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogKHRhYiwgZHRvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxtID0gJC5uZXdEaXYoKS5nY29udGVudChHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsU3RhdlphcGlzUmFka3UsIHsgcGFyZW50Q29udGVudDogdGhpcy5wYXJlbnRDbnQgfSk7IC8vTnV0bmUgcHJvIHNwcmF2bmUgc3BvamVuaSBzIGtvbnRleHRlbSBobGF2bmlobyBjb250ZW50dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhYlNldHRpbmdzID0gZHRvLnRhYlNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGR0by50YWJTZXR0aW5ncztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRhYikuZW1wdHkoKS5hcHBlbmQoZWxtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQ8R0RldGFpbFN0YXZaYXBpc1JhZGt1PihlbG0pLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5OiB0aGF0LlR5cFVsb2h5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdChcIkRldGFpbFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IHRoaXMuZ2V0WmFwaXNGaWx0ZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IGR0byxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3TW9kZTogXCJwcmV2aWV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiU2V0dGluZ3M6IHRhYlNldHRpbmdzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmdVNldFNvcnRlZDogdGhpcy5jZnVTZXRTb3J0ZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChncmlkIT09bnVsbClcclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHRoaXMuR2xvYmFscy5Fa29QYXJhbXM/LlVDUywgZW5kOiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5VQ1MgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5BdXRvTG9hZERhdGEpXHJcbiAgICAgICAgICAgICAgICB0aGF0LnJlbG9hZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiS29uZWMgb25Db250ZW50UmVhZHkgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU291Y3RvdmUgcmFka3lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBuYXN0YXZTdW1hY25pUmFkZWsoc3VtUm93OiBNZXRhUm93PElHU2V6bmFtWmFwaXN1U3RhdnVEdG9XaXRoVGFiU2V0dGluZ3M+IHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc291Y2V0VmVTdGF0dXNCYXJ1IHx8IGdyaWQgPT09IG51bGwgfHwgdHlwZW9mIHRoaXMuaXNsVmlldyA9PT1cInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBuYXN0YXZTdW1hY25pUmFkZWsgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICAvL2xldCB2aWV3ID0gdGhpcy4kZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0Vmlld1wiKTtcclxuXHJcbiAgICAgICAgICAgIC8vbGV0IHN1bVJvdyA9IHRoaXMuaXNsVmlldy5nZXREYXRhUm93cyh0cnVlKS5maW5kKChyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiAoKHIuX2lzU3VtbWFyeSkgJiYgKHIuX2lzU3VtbWFyeSA9PSB0cnVlKSk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3VtUm93ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChncmlkKS5oYXNDbGFzcyhcImdncmlkXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJzdGF0dXNXaWRnZXRcIiwgXCJ1Y3JzdW1hLXBhbmVsXCIpLmVtcHR5KClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgJHNvdWN0eVNwbiA9ICQubmV3U3BhbigpO1xyXG4gICAgICAgICAgICAkc291Y3R5U3BuLmFwcGVuZChcImpyZXM6MzExMDAyNDJcIik7IC8vUkMgMzExMDAyNDIgOiBTb3XEjXR5OlxyXG4gICAgICAgICAgICB0aGlzLnNldFN1bUJhcihzdW1Sb3csICRzb3VjdHlTcG4pO1xyXG4gICAgICAgICAgICBpZiAoJChncmlkKS5oYXNDbGFzcyhcImdncmlkXCIpKVxyXG4gICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcInN0YXR1c1dpZGdldFwiLCBcInVjcnN1bWEtcGFuZWxcIikuZW1wdHkoKS5hcHBlbmQoJHNvdWN0eVNwbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBncmlkdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5maW5kKFwiLmdncmlkLlwiK3RoaXMuY2xhc3NHcmlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIChkYXRhLmxlbmd0aCA9PSAwID8gbnVsbCA6IGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgc3VtYWNuaWhvIHJhZGt1XHJcbiAgICAgICAgICogQHBhcmFtIHN1bVJvd1xyXG4gICAgICAgICAqIEBwYXJhbSAkc291Y3R5U3BuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHNldFN1bUJhcihzdW1Sb3c6IE1ldGFSb3c8SUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncz4sICRzb3VjdHlTcG46IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgc2V0U3VtQmFyIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLmRlYnVnKFwiWmFwaXNvdmE6IFwiLCB0aGlzLlphcGlzb3ZhKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDU2XCIsIHN1bVJvdy5kYXRhPy5jMCEsICRzb3VjdHlTcG4sIFwiLCBcIik7IC8vUkMgMzExMDAwNTYgOiBNRFxyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMTEwMDA1N1wiLCBzdW1Sb3cuZGF0YT8uYzEhLCAkc291Y3R5U3BuLCBcIiwgXCIpOyAvL1JDIDMxMTAwMDU3IDogRGFsXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN1bVJvdy5kYXRhPy5jMGMxICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNThcIiwgc3VtUm93LmRhdGE/LmMwYzEhLCAkc291Y3R5U3BuLCBcIlwiKTsgLy9SQyAzMTEwMDA1OCA6IE1EIC0gRGFsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDU5XCIsIHN1bVJvdy5kYXRhPy5jMCEsICRzb3VjdHlTcG4sIFwiLCBcIik7IC8vUkMgMzExMDAwNTkgOiBNTyBNRFxyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMTEwMDA2MFwiLCBzdW1Sb3cuZGF0YT8uYzEhLCAkc291Y3R5U3BuLCBcIiwgXCIpOyAvL1JDIDMxMTAwMDYwIDogTU8gRGFsXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN1bVJvdy5kYXRhPy5jMGMxICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMTEwMDA2MVwiLCBzdW1Sb3cuZGF0YT8uYzBjMSEsICRzb3VjdHlTcG4sIFwiOyBcIik7IC8vUkMgMzExMDAwNjEgOiBNTyBNRCAtIERhbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMTEwMDA2MlwiLCBzdW1Sb3cuZGF0YT8uYzBfYXMhLCAkc291Y3R5U3BuLCBcIiwgXCIpOyAvL1JDIDMxMTAwMDYyIDogQVMgTURcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNjNcIiwgc3VtUm93LmRhdGE/LmMxX2FzISwgJHNvdWN0eVNwbiwgXCIsIFwiKTsgLy9SQyAzMTEwMDA2MyA6IEFTIERhbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMTEwMDA2NFwiLCBzdW1Sb3cuZGF0YT8uYzBjMV9hcyEsICRzb3VjdHlTcG4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBmb3JtYXRTdW15KGNhcHRpb246IHN0cmluZywgdmFsdWU6IEpzb25EZWNpbWFsLCAkc3BuOiBKUXVlcnksIHNlcGFyYXRvcj86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBmb3JtYXRTdW15IEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgJHNwbi5hcHBlbmQoY2FwdGlvbiArIFwiPVwiKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgeyB9Ly8kc3BuLmFwcGVuZCgkKFwiPHNwYW4+XCIsIHsgdGV4dDogR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihwYXJzZURlY2ltYWwoMCksIFwiQ1wiIC8qXCJDMlwiKi8pLCBzdHlsZTogXCJmb250LXdlaWdodDogNzAwXCIgfSkpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAkc3BuLmFwcGVuZCgkKFwiPHNwYW4+XCIsIHsgdGV4dDogR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihwYXJzZURlY2ltYWwodmFsdWUpLCBcIkNcIiAvKlwiQzJcIiovKSwgc3R5bGU6IFwiZm9udC13ZWlnaHQ6IDcwMFwiIH0pKTtcclxuICAgICAgICAgICAgaWYgKHNlcGFyYXRvcilcclxuICAgICAgICAgICAgICAgICRzcG4uYXBwZW5kKHNlcGFyYXRvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnViYXJ1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgQ3JlYXRlTWVudUJhcigpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgQ3JlYXRlTWVudUJhciBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250Lm1lbnVCYXIodGhpcy5EZWZpbmVNZW51QmFyKHRoaXMuVHlwVWxvaHkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmaW5pY2UgbWVudSBiYXJ1XHJcbiAgICAgICAgICogQHBhcmFtIHR5cFVsb2h5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIERlZmluZU1lbnVCYXIodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBEZWZpbmVNZW51QmFyIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgbGV0IG1lbnUgPSBuZXcgQXJyYXk8TWVudVBhcmFtcz4oKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRldGFpbEFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5kZXRhaWxBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAvL2lmICh0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXMpIHtcclxuICAgICAgICAgICAgLy8gICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRva2xhWmF1Y3RBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAvLyAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgLy8gICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc1BvbEFjdCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSk7XHJcbiAgICAgICAgICAgIC8vICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy56b2JyYXppdEVTVUFjdCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeSkge1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0RVNVQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gYWtjaSBwcm8gbmFjaXRhbmkgYmV6IFBIUCByYWRrdVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93UGFwQWN0aW9uKCkpIHtcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5iZXpQYXBBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlbWVtYmVySGlzdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByZXZGaWx0ZXJBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLm5leHRGaWx0ZXJBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByaW50QWN0KVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnByaW50QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpU3RhdlxyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRTdGF2XHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5WaWNlbGV0ZUZpbmFuY292YW5pWmFwaXNcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnphcGlzeUFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIC8vaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pXHJcbiAgICAgICAgICAgIC8vICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy56YXBpc3lBbGxBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkRhbm92YUV2aWRlbmNlWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXMpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGFyZW50Q250LmFjdGlvbnMuZG9rbGFkQWN0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRva2xhZEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyB0ZXh0dSB6IHJvenZyaHVcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnRleHRSb3p2cmhBY3QgIT09IFwidW5kZWZpbmVkXCIpIFxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnRleHRSb3p2cmhBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlByaW1hcm5pUG96YWRhdmt5WmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkJhbGFuY292YW5pWmFwaXMpIHtcclxuICAgICAgICAgICAgICAgIC8vbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnByaW1kb2tsYWRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRva2xhZFJPQWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5kb2tsYWRCTEtBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5QcmltYXJuaVBvemFkYXZreVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5GaW5hbmNvdmFuaVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5XHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eVxyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcyBcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpcyBcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2VcclxuICAgICAgICAgICAgKSB7IFxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByaW1kb2tsYWRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByaW1kb2tsYWRFeHRBY3QgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByaW1kb2tsYWRFeHRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIHRoaXMucGFyZW50Q250LmFjdGlvbnMuc21sRGV0YWlsQWN0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnNtbERldGFpbEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnphdHJpZGl0QWN0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnphdHJpZGl0QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3QgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY4XCIsIC8vUkMgMzExMDAyNjggOiBSeWNobMOpIGFrY2VcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuaW5zQWN0LCBpY29uOiBcImdpLXJlZnJlc2hcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIgfSwgLy9SQyAzMTEwMDIyNiA6IE5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5jbGVhckFuZEZpbHRlckFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIgfSwgLy9SQyAzMTEwMDIyOCA6ICBWecSNaXN0aXQgYSBuYcSNw61zdFxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnNlcnZlcm92eUZpbHRlck5hZEdyaWRlbSA/IHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmNvcHlGaWx0ZXJBY3QsIGNhcHRpb246IFwianJlczozMDI1MDY0MlwiIH0gLy9SQyAzMDI1MDY0MiA6IEtvcMOtcm92YXQgcG9kbcOtbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDp7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5lbXB0eUFjdCB9KSwgXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuc2VydmVyb3Z5RmlsdGVyTmFkR3JpZGVtID8geyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMucGFzdGVGaWx0ZXJBY3QsIGNhcHRpb246IFwianJlczozMDI1MDY0NFwiIH0gLy9SQyAzMDI1MDY0NCA6IFZsb8W+aXQgcG9kbcOtbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuZW1wdHlBY3QgfSksIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vTk9URTogVHl0byBkdmUgYWtjZSBidWRvdSB2emR5IGZ1bmdvdmF0IHBvdXplIHoga2xhdmVzbmljZVxyXG4gICAgICAgICAgICAgICAgICAgIC8veyBhY3Rpb246IHRoaXMuc2VsRmlsdGVyQWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMjlcIiB9LCAvL1JDIDMxMTAwMjI5IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUuXHJcbiAgICAgICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhpcy5zZWxGaWx0ZXJBbmRTZWFyY2hBY3QsIGNhcHRpb246IFwianJlczozMTEwMDIzNVwiIH0sIC8vUkMgMzExMDAyMzUgOiBQxZllbmVzZW7DrSBob2Rub3R5IGRvIGZpbHRydSBhIHZ5aGxlZMOhbsOtLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwU2VzdGF2eSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFNlc3RhdnkuU3Rhdm92YSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5kb3RBY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2MjBcIiwgLy9SQyAzMDI1MDYyMCA6IEZpbHRyb3ZhdCBkbGUgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMxMTAwMjI3XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSA6IHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmVtcHR5QWN0IH0sIC8vUkMgMzExMDAyMjcgOiBab2JyYXplbsOtIHbFoWVjaCB6w6FwaXPFryBkb2tsYWTFryAoY2Vsw70gZG9rbGFkKSBuYWQgb3puYcSNZW7DvW0gesOhcGlzZW0uXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBTZXN0YXZ5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU2VzdGF2eS5TdGF2b3ZhXHJcbiAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMudHlwU2VzdGF2eSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFNlc3RhdnkuRmluYW5jb3ZhbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5maWx0ZXJQaWRBY3QsIGNhcHRpb246IFwianJlczozMTEwMDI4MFwiIH0gLy9SQyAzMTEwMDI4MCA6IEZpbHRyb3ZhdCBkbGUgUElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuZW1wdHlBY3QgfSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cFNlc3RhdnkgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JUeXBTZXN0YXZ5LlN0YXZvdmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy50eXBTZXN0YXZ5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU2VzdGF2eS5GaW5hbmNvdmFuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnNoRG9rbGFkeUFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjMxXCIgfSAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmVtcHR5QWN0IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBTZXN0YXZ5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU2VzdGF2eS5TdGF2b3ZhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMudHlwU2VzdGF2eSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFNlc3RhdnkuRmluYW5jb3ZhbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5zaFphcGlzeUFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTI0XCIgfSAvL1JDIDMxMTAwMTI0IDogWsOhcGlzeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmVtcHR5QWN0IH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBrbGF2ZXNvdnljaCB6a3JhdGVrXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlU2hvcnRDdXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgY3JlYXRlU2hvcnRDdXQgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LnBhcmVudENudC5hY3Rpb25zLmluc0FjdCAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJJTlNFUlRcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIsIC8vUkMgMzExMDAyMjYgOiBOYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5pbnNBY3RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgIGtleTogXCJJTlNFUlRcIixcclxuICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyNlwiLCAvL1JDIDMxMTAwMjI2IDogTmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAvLyAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgLy8gICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAvLyAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwiTG9hZERhdGFBY3RcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pLFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNsZWFyRmlsdGVyUm93QWN0ICE9IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAxODFcIiwgLy9SQyAzMTEwMDE4MSA6IFZ5xI1pc3RpdFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgIGtleTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDE4MVwiLCAvL1JDIDMxMTAwMTgxIDogVnnEjWlzdGl0XHJcbiAgICAgICAgICAgIC8vICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgLy8gICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJjbGVhckZpbHRlclJvd0FjdFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY3XCIsIC8vUkMgMzExMDAyNjcgOiBWecSNaXN0aXQgZmlsdHIgc2V6bmFtdVxyXG4gICAgICAgICAgICAvLyAgICAgICAgaWNvbjogXCJnaS1iaW5cIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pLFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy5jbGVhckFuZEZpbHRlckFjdCAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOFwiLCAvL1JDIDMxMTAwMjI4IDogVnnEjWlzdGl0IGEgbmHEjcOtc3RcclxuICAgICAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LnBhcmVudENudC5hY3Rpb25zLmNsZWFyQW5kRmlsdGVyQWN0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgIGtleTogXCIwXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjhcIiwgLy9SQyAzMTEwMDIyOCA6IFZ5xI1pc3RpdCBhIG5hxI3DrXN0XHJcbiAgICAgICAgICAgIC8vICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgLy8gICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJjbGVhckFuZEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vbGV0IHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdmlldy5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIHRoYXQubmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KSxcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIHRoYXQucGFyZW50Q250LmFjdGlvbnMuY29weUZpbHRlckFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIC8vZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAga2V5OiBcImN0cmwrQ1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy5jb3B5RmlsdGVyQWN0LmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoYXQucGFyZW50Q250LmFjdGlvbnMuY29weUZpbHRlckFjdCxcclxuXHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIHRoYXQucGFyZW50Q250LmFjdGlvbnMucGFzdGVGaWx0ZXJBY3QgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAvL2dyaWQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGtleTogXCJjdHJsK1ZcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IHRoYXQucGFyZW50Q250LmFjdGlvbnMucGFzdGVGaWx0ZXJBY3QuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgIC8vICAgIGFjdGlvbjogdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy5wYXN0ZUZpbHRlckFjdCxcclxuXHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5zZWxGaWx0ZXJBY3QgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiY3RybCtzaGlmdCtsY2xpY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjlcIiwgLy9SQyAzMTEwMDIyOSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuc2VsRmlsdGVyQWN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9ncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBrZXk6IFwiY3RybCtzaGlmdCtsY2xpY2tcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOVwiLCAvL1JDIDMxMTAwMjI5IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUuXHJcbiAgICAgICAgICAgICAgICAvLyAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInNlbEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXYpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5zZWxGaWx0ZXJBbmRTZWFyY2hBY3QgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiY3RybCtsY2xpY2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMzVcIiwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5zZWxGaWx0ZXJBbmRTZWFyY2hBY3QvL3RoaXMuc2VsRmlsdGVyQW5kU2VhcmNoQWN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9ncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBrZXk6IFwiY3RybCtsY2xpY2tcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIzNVwiLCAvL1JDIDMxMTAwMjM1IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUgYSB2eWhsZWTDoW7DrS5cclxuICAgICAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwic2VsRmlsdGVyQW5kU2VhcmNoQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL2xldCB2aWV3ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIilcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy92aWV3LnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gICAgdGhhdC5uYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfSksXHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRvdEFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogW1wiLlwiLCBcIixcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTk9URTogRGVzY3JpcHRpb24gb3BzYW5vIHogbmFwb3ZlZHkgayBUSyBVQ1JcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyN1wiLCAvL1JDIDMxMTAwMjI3IDogWm9icmF6ZW7DrSB2xaFlY2ggesOhcGlzxa8gZG9rbGFkxa8gKGNlbMO9IGRva2xhZCkgbmFkIG96bmHEjWVuw71tIHrDoXBpc2VtLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuZG90QWN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoYXQucmVtZW1iZXJIaXN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQucGFyZW50Q250LmFjdGlvbnMucHJldkZpbHRlckFjdCAhPSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcIjFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIxOFwiLCAvL1JDIDMxMTAwMjE4IDogUMWZZWRjaG96w60gZmlsdHJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LnBhcmVudENudC5hY3Rpb25zLnByZXZGaWx0ZXJBY3RcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAga2V5OiBcIjFcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMThcIiwgLy9SQyAzMTEwMDIxOCA6IFDFmWVkY2hvesOtIGZpbHRyXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgICAgIC8vICAgIGFjdGlvbjogdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy5wcmV2RmlsdGVyQWN0XHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy90aGlzLiRncmlkLmdzaG9ydGN1dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlUHJvZmlsZXMoZ2Y6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvIC8qJiBVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0byovPik6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBjcmVhdGVQcm9maWxlcyBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIGxldCBwcm9maWxlczogSUdTZXpuYW1aYXBpc3VQcm9maWxlcyA9IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHsgbmFtZTogXCJqcmVzOjMxMTAwMjMyXCIsIGNvbHVtbnM6IHt9IH0gLy9SQyAzMTEwMDIzMiA6IFbDvWNob3rDrVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZi5jb2x1bW5zLmZpbHRlcigoYykgPT4geyByZXR1cm4gKCFjLmhpZGRlbiApOyB9KVxyXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGMpID0+IHsgcHJvZmlsZXMuZGVmYXVsdC5jb2x1bW5zIVtjLm5hbWUhXSA9IHsgaGlkZGVuOiBmYWxzZSB9IH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVzLmRlZmF1bHQubmFtZSA9IFwianJlczozMTEwMDI0MVwiOyAvL1JDIDMxMTAwMjQxIDogWsOhcGlzeSAodsO9Y2hvesOtKVxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZXMuZG9rbGFkeSA9IHsgbmFtZTogXCJqcmVzOjMxMTAwMjMxXCIsIGNvbHVtbnM6IHt9LCBncm91cGluZzogXCJkb2tsYWR5XCIgfTsgLy9SQyAzMTEwMDIzMSA6IERva2xhZHlcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVzLmRva2xhZHkuY29sdW1ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBkb2tsYWR5OiB7IGhpZGRlbjogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICBwZG9rOiB7IGhpZGRlbjogZmFsc2UgfVxyXG4gICAgICAgICAgICAgICAgfSwgcHJvZmlsZXMuZGVmYXVsdC5jb2x1bW5zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb2ZpbGVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IGNyZWF0ZUFjdGlvbnMgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gcHJhemRuYSBha2NlIHBybyB0ZWNobmlja2UgdWNlbHlcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJlbXB0eUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LnJlbWVtYmVySGlzdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJldkZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYXJyb3cgZ2ktcm90MTgwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjE4XCIsIC8vUkMgMzExMDAyMTggOiBQxZllZGNob3rDrSBmaWx0clxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMxMTAwMjIwXCIsIC8vUkMgMzExMDAyMjAgOiBOw6F2cmF0IGsgcMWZZWRjaG96w60gaG9kbm90xJsgZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnByZXZGaWx0ZXIoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmV4dEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYXJyb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyMTlcIiwgLy9SQyAzMTEwMDIxOSA6IE7DoXNsZWR1asOtY8OtIGZpbHRyXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzExMDAyMjFcIiwgLy9SQyAzMTEwMDIyMSA6IFZ5cGxuxJtuw60gbsOhc2xlZHVqw61jw61obyBmaWx0cnUgYSB2eWhsZWTDoW7DrS5cclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMubmV4dEZpbHRlcigpOyB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jbGVhckZpbHRlclJvd0FjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY2xlYXJGaWx0ZXJSb3dBY3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDI2N1wiLCAvL1JDIDMxMTAwMjY3IDogVnnEjWlzdGl0IGZpbHRyIHNlem5hbXVcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYmluXCIsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImNsZWFyXCIpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNsZWFyQW5kRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXIodGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyB0aGlzLmRvRmlsdGVyQ2xpY2soKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VydmVyb3Z5RmlsdGVyTmFkR3JpZGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLmRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldik7IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlbEZpbHRlckFuZFNlYXJjaEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHBvdXplLCBrZHl6IGplIHNlcnZlcm92eSBmaWx0ZXIgbmFkIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgLy8ga29waXJvdmF0IGZpbHRyIG5hZCBncmlkZW1cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNvcHlGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2NDJcIiwgLy9SQyAzMDI1MDY0MiA6IEtvcMOtcm92YXQgcG9kbcOtbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jbG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXJHcmlkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZpbHRlclN0YWNrKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5wYXJlbnRDbnQuZGlhbG9ncy5hbGVydChKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gdmxveml0IHBvZG1pbmt5IG5hIGZpbHRyIG5hZCBncmlkZW1cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhc3RlRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jbGlwYm9hcmRcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIsIC8vUkMgMzExMDAyMjggOiAgVnnEjWlzdGl0IGEgbmHEjcOtc3RcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXIgPSB0aGlzLmdldEZpbHRlclN0YWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImFwcGx5XCIsIGZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImluc0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyKHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldENvbmZpcm1lZERhdGFcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHsgdGhpcy5kb0ZpbHRlckNsaWNrKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVtYSAhPT0gXCJcIilcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpbnRBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZChHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaW50QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogdGhpcy50ZW1hLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMucGFyZW50Q250LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydEdlbmVyYXRvclR5cGU6IFwiR29yZGljLlVjci5XZWJDbGllbnQuR1Nlem5hbUVrb1phem5hbXVHZW5lcmF0b3JcIixcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogKHJlcCkgPT4geyByZXR1cm4gdGhpcy5yZXBvcnRTdGFydGluZyhyZXApLnRoZW4oKCkgPT4geyByZXR1cm4gcmVwOyB9KTsgfVxyXG4gICAgICAgICAgICAgICAgfSkpIGFzIEdQcmludEFjdGlvblR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuZG90QWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkb3RBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKVswXSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKFwiY2xlYXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgdGhhdC5nZXRaYXBpc0ZpbHRlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhhdC5kaXNwbGF5VGV4dHlaUm96dnJodSgpKSB7XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIHRleHR5IHogcm96dnJodVxyXG4gICAgICAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRleHRSb3p2cmhBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2MTlcIiwgLy9SQyAzMDI1MDYxOSA6IFRleHR5IHogcm96dnJodVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDU5N1wiLCAvL1JDIDMwMjUwNTk3IDogTmHEjXRlbsOtIHRleHTFryB6IHJvenZyaHUgayBzbG92xa9tIMO6xI1ldG7DrSB2xJt0eVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcmVmcmVzaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB2aWV3ID0gdGhhdC4kZ3JpZC5nZ3JpZDxHU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0Vmlld1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHR5cGVvZiB2aWV3ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5sb2FkVGV4dHlaUm96dnJodSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5wYXJlbnRDbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwNjAyXCIpOyAvL1JDIDMwMjUwNjAyIDogTmHEjcOtdMOhbsOtLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuZ2V0VXJvdmVuKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC50aGVuKCh1cm92ZW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIEdvcmRpYy5XaWRnZXQuR01hZ2ljQmFzZU1hbmFnZXIuR01hZ2ljQmFzZU1hbmFnZXIuZmlsbFRleHRUb0RhdGFTZW50ZW5jZSh2aWV3IGFzIGFueSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgY2Z1SWQ6IHRoYXQuaXhzU2F4ISwgaWRSb3p2cmh1OiB0aGF0Lml4c1JveiFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICwgaWNvOiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gYXMgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAsIHJvazogdGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rIGFzIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLCB0ZXh0V2l0aFZhbHVlOiB0aGF0LnBhcmVudENudC5nbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLlVjci5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0ud29yZFdpdGhOdW1iZXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICwgdXJvdmVuOiB1cm92ZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICApLmFsd2F5cygoKSA9PiB0aGF0LnBhcmVudENudC5lbmRPcGVyYXRpb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KS5mYWlsKCgpID0+IHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoYXQuc2hvd1BhcEFjdGlvbigpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYmV6UGFwQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjM2XCIsIC8vUkMgMzAyNTA2MzYgOiBCZXogUEFQXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwNjM3XCIsIC8vUkMgMzAyNTA2MzcgOiBTZXpuYW0gcy9iZXogUEFQIMWZw6Fka8WvXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS11bmNoZWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNrZWQgPSB0aGF0LnBhcmVudENudC5hY3Rpb25zLmJlelBhcEFjdD8uY2hlY2tlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkID0gISh0eXBlb2YgY2hlY2tlZCA9PSBcInVuZGVmaW5lZFwiID8gZmFsc2UgOiBjaGVja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy5iZXpQYXBBY3Q/LmNoZWNrZWQoY2hlY2tlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnMuYmV6UGFwQWN0Py51cGRhdGUoeyBpY29uOiAoY2hlY2tlZCA/IFwiZ2ktY2hlY2tcIiA6IFwiZ2ktdW5jaGVja1wiKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJQYXAgPSBjaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubWFudWFsbHlTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRldGFpbEFjdCA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRldGFpbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDI2NlwiLCAvL1JDIDMxMTAwMjY2IDogWm9icmF6aXQgZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgIT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5QcmltYXJuaVBvemFkYXZreVphcGlzICYmIHRoaXMucGFyZW50Q250LlR5cFVsb2h5ICE9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcyAmJiB0aGlzLnBhcmVudENudC5UeXBVbG9oeSAhPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93RGV0YWlsKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWN0ZW5pIHRleHR1IHogcm96dnJodVxyXG4gICAgICAgICAqIEBwYXJhbSB2aWV3XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRUZXh0eVpSb3p2cmh1KCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2FkaW5nKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IGxvYWRUZXh0eVpSb3p2cmh1IEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIC8vaWYgKHR5cGVvZiB0aGF0LiRncmlkID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFZpZXdcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZpZXcgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA2MDJcIik7IC8vUkMgMzAyNTA2MDIgOiBOYcSNw610w6Fuw60uLi5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ2V0VXJvdmVuKClcclxuICAgICAgICAgICAgICAgIC50aGVuKCh1cm92ZW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLldpZGdldC5HTWFnaWNCYXNlTWFuYWdlci5HTWFnaWNCYXNlTWFuYWdlci5maWxsVGV4dFRvRGF0YVNlbnRlbmNlKHZpZXcgYXMgYW55LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNmdUlkOiB0aGF0Lml4c1NheCEsIGlkUm96dnJodTogdGhhdC5peHNSb3ohXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgaWNvOiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gYXMgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgcm9rOiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgYXMgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgdGV4dFdpdGhWYWx1ZTogdGhhdC5wYXJlbnRDbnQuZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5VY3IuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLndvcmRXaXRoTnVtYmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgdXJvdmVuOiB1cm92ZW5cclxuICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGF0LnBhcmVudENudC5lbmRPcGVyYXRpb24oKTsgdGhhdC5sb2FkaW5nID0gZmFsc2U7IH0pXHJcbiAgICAgICAgICAgICAgICB9KS5mYWlsKCgpID0+IHsgdGhhdC5wYXJlbnRDbnQuZW5kT3BlcmF0aW9uKCk7IHRoYXQubG9hZGluZyA9IGZhbHNlOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBkb0ZpbHRlckNsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBkb0ZpbHRlckNsaWNrIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vTk9URSAoQk0pOiBaYWRueSBqaW55IHNwb2xlaGxpdnkgenB1c29iLCBrcm9tZSB0b2hvdG8sIG5lZnVuZ3VqZS5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZmluZChcIi5qcy1idXRWeWhsZWRhdFwiKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0WmFwaXNGaWx0ZXIoKTogR0Vrb0ZpbHRlckR0byB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IGdldFphcGlzRmlsdGVyIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICB2YXIgc2VsID0gZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiLCBmYWxzZSlbMF0gYXMgVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG87XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc2ljOiB7IHN0YXJ0OiBzZWwubWVzaWMsIGVuZDogc2VsLm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWM6IHsgc3RhcnQ6IHNlbC5hYywgZW5kOiBzZWwuYWMgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgICAgICAgICAgZHJkX21zazogc2VsIS5kcmQhLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBtZXNpYzogeyBzdGFydDogc2VsLm1lc2ljLCBlbmQ6IHNlbC5tZXNpYyB9LFxyXG4gICAgICAgICAgICAgICAgYWM6IHsgc3RhcnQ6IHNlbC5hYywgZW5kOiBzZWwuYWMgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJpcHJhdmEgcHJvIGdlbmVyb3Zhbmkgc2VzdGF2eVxyXG4gICAgICAgICAqIEBwYXJhbSByaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCByZXBvcnRTdGFydGluZyhyaTogSUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdTZXpuYW1Fa29aYXpuYW11R2VuZXJhdG9yRHRvPik6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCByZXBvcnRTdGFydGluZyBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbHRlcih0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByaS5jdXN0b21EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5OiB0aGlzLnBhcmVudENudC5UeXBVbG9oeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBmLmZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHk6IGYuZWxlbWVudHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcDogdGhpcy51c2VQYXBSb3dzID8geyB2OiB0aGlzLmdldENoZWNrZWRQYXAoKSA/IDAgOiAxIH0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclN0clBvcGlzOiBmLmZpbHRlclN0clBvcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgYWtjaSAgICAgICAgXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgX25hc3RhdmVuaUFrY2koKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IF9uYXN0YXZlbmlBa2NpIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXMucGFyZW50Q250O1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgZ3JpZCwgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIDtcclxuICAgICAgICAgICAgLy8gcG9rdWQgamUgY29udGVudCB6YXZyZW55LCBwYWsgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm4gO1xyXG4gICAgICAgICAgICB0aGlzLm5hc3RhdmVuaUFrY2koZ3JpZCwgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkNlbGtvdnlQb2NldFJhZGt1KGdyaWQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgbmFzdGF2ZW5pQWtjaShncmlkOkpRdWVyeTxIVE1MRWxlbWVudD4scG9jZXRSYWRrdTpudW1iZXIpOiB2b2lkICB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IG5hc3RhdmVuaUFrY2kgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcy5wYXJlbnRDbnQ7XHJcbi8vICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIGdyaWQsIG5pYyBuZWRlbGVqXHJcbiAgLy8gICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBqZSBjb250ZW50IHphdnJlbnksIHBhayBuaWMgbmVkZWxlalxyXG4gICAgLy8gICAgICAgIGlmICh0aGF0LmNsb3NlZCApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgLy9jb25zdCBwb2NldFphcGlzdSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdShncmlkKTtcclxuICAgICAgICAgICAgdmFyIGVuYWJsZSA9IHBvY2V0UmFka3UgPiAwO1xyXG4gICAgICAgICAgICAvLyBwcmlzdHVwbm9zdCBha2NpIGRsZSBuYWN0ZW55Y2ggZGF0XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5hY3Rpb25zLmRldGFpbEFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5kZXRhaWxBY3Q/LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LmFjdGlvbnMuemFwaXN5QWN0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLnphcGlzeUFjdD8uZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuYWN0aW9ucy5kb3RBY3QgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuZG90QWN0Py5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcmV2aWV3Q29udHJvbGxlciAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlcj8uZW5hYmxlKGVuYWJsZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBwcmlzdHVwbm9zdCBha2NpIGRsZSBuYWN0ZW55Y2ggZGF0XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5hY3Rpb25zLmZpbHRlclBpZEFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5maWx0ZXJQaWRBY3QhLmVuYWJsZWQoZW5hYmxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5hY3Rpb25zLnByaW1kb2tsYWRBY3QgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMucHJpbWRva2xhZEFjdD8uZW5hYmxlZChlbmFibGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LmFjdGlvbnMucHJpbWRva2xhZEV4dEFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5wcmltZG9rbGFkRXh0QWN0Py5lbmFibGVkKGVuYWJsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuYWN0aW9ucy5kb2tsYWRCTEtBY3QgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuZG9rbGFkQkxLQWN0Py5lbmFibGVkKGVuYWJsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuYWN0aW9ucy5kb2tsYWRST0FjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5kb2tsYWRST0FjdC5lbmFibGVkKGVuYWJsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoYXQuYWN0aW9ucy5zaERva2xhZHlBY3QgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuc2hEb2tsYWR5QWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5hY3Rpb25zLnphcGlzeUFsbEFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy56YXBpc3lBbGxBY3QuZW5hYmxlZChlbmFibGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LmFjdGlvbnMuc2haYXBpc3lBY3QgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuc2haYXBpc3lBY3QuZW5hYmxlZChlbmFibGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LmFjdGlvbnMudGV4dFJvenZyaEFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy50ZXh0Um96dnJoQWN0IS5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5hY3Rpb25zLnBhc3RlRmlsdGVyQWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhY2sgPSB0aGlzLmdldEZpbHRlclN0YWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMucGFzdGVGaWx0ZXJBY3QudXBkYXRlKHsgZW5hYmxlZDogc3RhY2sgIT09IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIHphcGlzdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIHNob3daYXBpc3koKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIm5laW1wbGVtZW50b3Zhbm9cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBWeXR2b3JlbmkgZ3JpZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgY3JlYXRlR3JpZCBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWRGb3JtYXQgPSB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgLy8gc3BvbGVjbmUgc2xvdXBjZVxyXG4gICAgICAgICAgICB0aGlzLmFkZENvbW1vbkNvbHMoZ3JpZEZvcm1hdCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZXMgPSB0aGlzLmNyZWF0ZVByb2ZpbGVzKGdyaWRGb3JtYXQpO1xyXG4gICAgICAgICAgICBsZXQgcHJvZmlsZXNBcnIgPSBbdGhpcy5wcm9maWxlcy5kZWZhdWx0XTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZmlsZXMuZG9rbGFkeSkgcHJvZmlsZXNBcnIucHVzaCh0aGlzLnByb2ZpbGVzLmRva2xhZHkpO1xyXG4gICAgICAgICAgICB0aGlzLmlzbFZpZXcgPSB0aGlzLmNyZWF0ZUxpc3RWaWV3KCk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy90aGF0LmlzbFZpZXcucHJvY2Vzcyh7IHN1bW1hcnlSb3c6IHRoYXQuc3VtYXJlX3Byb2Nlc3NvciB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNsVmlldy5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQucGFyZW50Q250LmNsb3NlZCkgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgY2hhbmdlIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhhdC5sb2FkaW5nKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5fbmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQubG9nLnRyYWNlKFwiS29uZWMgY2hhbmdlIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5uYXN0YXZTdW1hY25pUmFkZWsoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgbGV0IHN1bUNvbHM6IHN0cmluZ1tdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5zb3VjdG92eVJhZGVrQXRvbWF0aWNreSlcclxuICAgICAgICAgICAgICAgIHN1bUNvbHMgPSBncmlkRm9ybWF0LmNvbHVtbnMuZmlsdGVyKGMgPT4gKGMuY29sdW1uVHlwZSA9PSBcImN1cnJlbmN5XCIgfHwgYy5jb2x1bW5UeXBlID09IFwibnVtYmVyXCIpICYmIChjLmNhcHRpb24hLmluZGV4T2YoXCIlXCIpID09IC0xKSAmJiAoXCJzdGF0dXMsZHJkLG1lc2ljLGRlbixyb2sscHJpcHJhdmVubyxzX3ByZXAscm9rX3VlaixtZXNpY191ZWoscm9rX3NtbCxjaXNsb19zbWxcIi5pbmRleE9mKGMubmFtZSEpKSA9PSAtMSkubWFwKGUgPT4gZS5uYW1lKSBhcyBzdHJpbmdbXTtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSAkLm5ld0Rpdih0aGlzLmNsYXNzR3JpZClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLnBhcmVudENudC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcm93SGVpZ2h0OiAzMixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgIC8vIGZpdCAoZGVmYXVsdG5lIGJ5IG1lbG8gYnl0IHRvdG8pLCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5pc2xWaWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHR5cGVvZiB0aGF0LmRlZmF1bHRHcmlkQWN0aW9uID09IFwidW5kZWZpbmVkXCIgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7ICAgICAvL29ic2x1em5hIGFrY2UsIGt0ZXJhIHNlIHNwb3VzdGkgZGJsIGNsaWNrZW0gbmFkIHJhZGtlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2hvd0RldGFpbChjdHguY2VsbEluZm8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRBY3Rpb24oY3R4LmNlbGxJbmZvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgOiB0aGF0LmRlZmF1bHRHcmlkQWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wicG9waXNcIiwgXCJhY1wiXSwgLy9zbG91cGNlLCBwb2RsZSBrdGVyeWNoIHNlIHZ5aGxlZGF2YSB2IHNlYXJjaGJveHUgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGdyaWRGb3JtYXQsLy90aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSBhcyBhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHRoaXMucHJvZmlsZXMuZGVmYXVsdCwgLy9za3J5dGUgc2xvdXBjZSByZXNpdCBwcmVzIGNvbHVtbi5oaWRkZW4gKyBjb2x1bW5MaXN0IC0gdXppdmF0ZWxpIGpzb3Ugc2tyeXRlLCBtdXplIHNpIGplIHZvbGl0ZWxuZSB6YXBub3V0XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IHByb2ZpbGVzQXJyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmNsZWFyRmlsdGVyUm93QWN0IH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogKGV2LCBzZWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wcmV2aWV3U2lkZWJhci5lbXB0eSgpLmFwcGVuZChcIjxkaXY+XCIgKyBzZWwuZ2V0U2VsZWN0aW9uKGZhbHNlKVswXS5peHAgKyBcIjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fbmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcyA9IHNlbC5nZXRTZWxlY3Rpb24oZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3RBY3QuZW5hYmxlZChzLmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXZvbGFuaSB1ZGFsb3N0aSBwcm8gem1lbnUgZm9jdXN1IG5hIHJhZGt1IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNlbGVjdChzLmxlbmd0aCA9PT0gMD9udWxsOnNbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eXZvbGFuaSB1ZGFsb3N0aSBwcm8gcG90b21reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhpcy5wcmV2aWV3Q29udHJvbGxlciAmJiB0eXBlb2YgdGhpcy5wcmV2aWV3Q29udHJvbGxlciAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucG92b2xlbk5haGxlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXI/LnNob3coc1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBncmlkRm9ybWF0LmNvbHVtbnMuZmlsdGVyKGMgPT4gYy5jb2x1bW5UeXBlICE9PSBcImRhdGV0aW1lXCIgJiYgYy5jb2x1bW5UeXBlICE9PSBcImN1cnJlbmN5XCIpLm1hcChlID0+IFwiKlwiICsgZS5uYW1lKSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRla28oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3XEjXRvdsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0FsbG93ZWQ6IHRoaXMuc291Y3RvdnlSYWRla0F0b21hdGlja3ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dDb2x1bW5zOiBzdW1Db2xzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdE1vZGVsOiBcIkdsb2JhbC5VY3IuQXBwU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGxvdWjDvSBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RBbGxvd2VkOiB0eXBlb2YgdGhhdC50YXNrQ291bnQgIT09IFwidW5kZWZpbmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0TW9kaWZ5UnFNZXRob2Q6IChycSkgPT4gdGhhdC5hbGxvd2VkTGlzdChycSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0Q291bnRNZXRob2Q6IChycSkgPT4gdGhhdC50YXNrQ291bnQgPyB0aGF0LmdldENhbGxDb3VudCgpIDogJC5EZWZlcnJlZCgpLnJlc29sdmUoMTApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRyb3dzY2FsYygpXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VydmVyb3Z5RmlsdGVyTmFkR3JpZGVtKVxyXG4gICAgICAgICAgICAgICAgZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZHNlcnZlcmZpbHRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW52YWxpZFZhbHVlQ2hhbmdlZDogZnVuY3Rpb24gKGV2KSB7IHRoYXQubG9hZERhdGEoKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0RGF0YTogeyBua3M6IHsgc3RhcnQ6IFwiMDAwMDA0XCIsIGVuZDogXCIwMDAwMDRcIiB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdERhdGE6IHRoaXMuRmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdyaWRcclxuICAgICAgICAgICAgICAgIC5vbihcImdjZnVmaWx0ZXJpbnZhbGlkdmFsdWVzZXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm1lbmEgZm9jdXN1IHJhZGt1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGNoYW5nZVNlbGVjdChuZXdSb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0byB8IG51bGwpOnZvaWQge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJpZGFuaSBzcG9sZWNueWNoIHNsb3VwY3VcclxuICAgICAgICAgKiBAcGFyYW0gZ3JpZEZvcm1hdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBhZGRDb21tb25Db2xzKGdyaWRGb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvIC8qJiBHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4pIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgYWRkQ29tbW9uQ29scyBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIC8vIHRleHR1IHogcm96dnJodVxyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5VGV4dHlaUm96dnJodSgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB6amlzdGVuaSBwcmVkbmFzdGF2ZW55Y2ggc2xvdiByb3p2cmh1XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xvdmFSb3p2cmh1ID0gdGhpcy5wYXJlbnRDbnQudXNlclNldHRpbmdzPy5nZXQoXCJzZWxlY3RlZFdvcmRzU2hvd0dyaWRDb2x1bW5zXCIpIGFzIEdTbG92YVJvenZyaEZpbHRlckR0b1tdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHByZXZ6ZXRpIHNsb3VwY3UgICAgXHJcbiAgICAgICAgICAgICAgICBzbG92YVJvenZyaHUuZm9yRWFjaChmdW5jdGlvbiAoc2xvdXBlYykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHNsb3VwZWMuaG9kbm90YSEgKyBcIl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTk0XCIuZm9ybWF0KHNsb3VwZWMua2xpYyEpLCAvL1JDIDMwMjUwNTk0IDogezB9IC0gcG9waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IHNsb3VwZWMuaG9kbm90YSEsIGNhcHRpb246IFwianJlczozMTEwMDA5N1wiIH0pIC8vUkMgMzExMDAwOTcgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBvdm9sZW5pIG5hY3Rlbmkgc2V6bmFtdVxyXG4gICAgICAgICAqIEBwYXJhbSBycVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhbGxvd2VkTGlzdChycTogSXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgYWxsb3dlZExpc3QgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgSVNMIG1ldG9kdSBwcm8gemppc3RlbmkgcG9jdHUgemF6bmFtdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldENhbGxDb3VudCgpOiBKUXVlcnlQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBnZXRDYWxsQ291bnQgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghdGhhdC50YXNrQ291bnQpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIm5laW1wbGVtZW50b3Zhbm9cIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC50YXNrQ291bnRcclxuICAgICAgICAgICAgICAgIC51c2UoKHJlcSwgbmV4dCwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGRGaWx0ZXJUb0hpc3RvcnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZXRGaWx0ZXJEYXRhKHRoYXQsIHJlcSwgbmV4dCkgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVkYWxvc3QgcHJlZCB2bHN0bmltIG5hY3RlbmkuIEx6ZSB6cnVzaXQgbmFjdGVuaVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGJlZm9yZUxvYWRpbmcoKTpib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSB2aWV3IHBybyBsaXN0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlTGlzdFZpZXcoKTogR29yZGljLklzbC5WaWV3IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBjcmVhdGVMaXN0VmlldyBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIGlmKCF0aGF0LnRhc2tMaXN0KVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJJU0wgc2x1emJhIG5lbmFzdGF2ZW5hXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuSXNsLlZpZXc8SUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncz4oXHJcbiAgICAgICAgICAgICAgICB0aGF0LnRhc2tMaXN0LnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wYXJlbnRDbnQuY2xvc2VkKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2b2xhbmkgdWRhbG9zdGkgcHJlZCB2bGFzdG5pbSBuYWN0ZW5pbVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5iZWZvcmVMb2FkaW5nKCkpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJ0YXNrTGlzdC51c2UgcmVxOlwiLCByZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwidGFza0xpc3QudXNlIG5leHQ6XCIsIG5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbHRlckRhdGEodGhhdCwgcmVxLCBuZXh0KSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gbmV4dChyZXEpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhhdC4kZmlsdGVyUGFuZWwsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiB0aGF0Lm15S2V5cyxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtYXJlOiB0aGF0LnN1bWFyZV9wcm9jZXNzb3JcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAqIE5hY3RpIGZpbHRyeVxyXG4gICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAgKiBAcGFyYW0gcmVxXHJcbiAgICAgICAgICAqIEBwYXJhbSBuZXh0XHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRGaWx0ZXJEYXRhKHRoYXQ6IHRoaXMsIHJlcTogSXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG5leHQ6IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PiB8IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG51bWJlcj4pOiBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8YW55PiB8IEpRdWVyeVByb21pc2U8SXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHwgSlF1ZXJ5UHJvbWlzZTxudW1iZXI+IHwgSlF1ZXJ5UHJvbWlzZTxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdD4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBnZXRGaWx0ZXJEYXRhIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ2V0RmlsdGVyKHRoYXQuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKG5ld0ZpbHRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkRmlsdGVySW50b0hpc3RvcnkoJC5leHRlbmQodHJ1ZSwge30sIG5ld0ZpbHRlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdSZXF1ZXN0ID0gJC5leHRlbmQodHJ1ZSwge30sIHJlcSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tYXNrYTIuY2Z1W1widWVmXCJdID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlR5cFVsb2h5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlZpY2VsZXRlRmluYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcnEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSYWRla1N0YXZ1OiB0aGF0LkN1cnJlbnRSb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXNrYTogbmV3RmlsdGVyLmZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBNYXNrYTI6IG5ld0ZpbHRlci5maWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgVHlwVWxvaHk6IHRoYXQuVHlwVWxvaHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgRWxlbWVudHk6IG5ld0ZpbHRlci5lbGVtZW50eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8sIEVsZW1lbnR5OiBuZXdGaWx0ZXIuZmlsdGVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBGaWx0ZXJTdHJQb3BpczogbmV3RmlsdGVyLmZpbHRlclN0clBvcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGxvZ292YXRHZHByOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIFN0clBvcGlzS2V5czogdGhhdC5hZGRTdHJQb3Bpc0NvbHVtbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbWF4UmVjb3JkczogLTFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgTGltaXQ6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgTG9hZEVzdTogdGhhdC5zaG93RXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIExvYWRQb3Bpc0Rva2xhZHU6IHRoYXQuc2hvd1BvcGlzU3RydWt0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2RtaW5rYSBuYSBQQVAgdWN0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBQYXA6IHRoYXQudXNlUGFwUm93cyA/IHsgdjogdGhhdC5nZXRDaGVja2VkUGFwKCkgPyAwIDogMSB9IDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXNrYSA9IG5ld0ZpbHRlci5maWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gbmV3RmlsdGVyLmZpbHRlcj8uY2Z1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrYSFbbmFtZV0gPSBuZXdGaWx0ZXIuZmlsdGVyPy5jZnVbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnEuTWFza2EgPSBtYXNrYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmVxdWVzdFtcImZpbHRlcnNcIl0gPSBycTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vbmV3UmVxdWVzdFtcImZpbHRlcnNcIl0gPSB7IE1hc2thOiBuZXdGaWx0ZXIuZmlsdGVyLCBFbGVtZW50eTogbmV3RmlsdGVyLmVsZW1lbnR5PT1udWxsP3ZvaWQgMDogKChuZXdGaWx0ZXIhLmVsZW1lbnR5ISkgYXMgYW55KS5maWx0ZXJzLCBMaW1pdDogMCwgVHlwVWxvaHk6IHRoYXQuVHlwVWxvaHkgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UmVxdWVzdFtcImZpbHRlcnNcIl0gPSB7IE1hc2thOiBuZXdGaWx0ZXIuZmlsdGVyLCBFbGVtZW50eTogbmV3RmlsdGVyLmVsZW1lbnR5ID09IG51bGwgPyB2b2lkIDAgOiAoKG5ld0ZpbHRlciEuZWxlbWVudHkhKSBhcyBhbnkpLmZpbHRlcnMsIExpbWl0OiAwLCBUeXBVbG9oeTogdGhhdC5UeXBVbG9oeSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3UmVxdWVzdFtcImZpbHRlcnNcIl0gPSB7IE1hc2thOiBuZXdGaWx0ZXIuZmlsdGVyLCBFbGVtZW50eTogbmV3RmlsdGVyLmVsZW1lbnR5ID09IG51bGwgPyB2b2lkIDAgOiBuZXdGaWx0ZXIhLmVsZW1lbnR5ISwgTGltaXQ6IDAsIFR5cFVsb2h5OiB0aGF0LlR5cFVsb2h5IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV3UmVxdWVzdFtcImZpbHRlcnNcIl0gPSB7IE1hc2thOiBuZXdGaWx0ZXIuZmlsdGVyLCBFbGVtZW50eTogbmV3RmlsdGVyID09IG51bGwgPyB2b2lkIDAgOiAobmV3RmlsdGVyISBhcyBhbnkpLmZpbHRlcnMhLCBMaW1pdDogMCwgVHlwVWxvaHk6IHRoYXQuVHlwVWxvaHkgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dChuZXdSZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIGRldGFpbHVcclxuICAgICAgICAgKiBAcGFyYW0gcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHNob3dEZXRhaWwocm93PzogVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgc2hvd0RldGFpbCBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIGlmICghcm93KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIDtcclxuICAgICAgICAgICAgICAgIHZhciBzZWwgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHJvdyA9IHNlbFswXTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGV0IHR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlID0gdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5GaW5hbmNvdmFuaVphcGlzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93LnByaXpfdXIgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zOiBJR0RldGFpbFN0YXZaYXBpc1JhZGt1T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHR5cFVsb2h5OiB0eXBVbG9oeSwvL3RoaXMuVHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoXCJEZXRhaWxcIiksXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IHRoaXMuZ2V0WmFwaXNGaWx0ZXIoKSxcclxuICAgICAgICAgICAgICAgIHJvdzogcm93LFxyXG4gICAgICAgICAgICAgICAgZ2xvYmFsczogdGhpcy5nbG9iYWxzLFxyXG4gICAgICAgICAgICAgICAgdmlld01vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgY2Z1U2V0U29ydGVkOiB0aGlzLmNmdVNldFNvcnRlZFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBjbnQgPSB0aGlzLnBhcmVudENudC5uYXZpZ2F0ZShHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsU3RhdlphcGlzUmFka3UsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjbnQub24oXCJjbG9zZVwiLCAoZXYsIHJlc3VsdFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRWYWx1ZSAmJiByZXN1bHRWYWx1ZS5yZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBudXRuZSBha3R1YWxpem92YXQgc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0VmlldyhncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkZWs6IFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvID0gcmVzdWx0VmFsdWUucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0WmFwaXNMaXN0UmVxdWVzdER0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBSYWRla1N0YXZ1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGljbzogcmFkZWsuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtZXNpYzogcmFkZWsubWVzaWMsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGxpYzogcmFkZWsubGljLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB1Y3M6IHJhZGVrLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcm9rOiByYWRlay5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGFjOiByYWRlay5hYyxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmFkZWtfejogcmFkZWsucmFkZWtfelxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAsIE1hc2thOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGljbzogeyBzdGFydDogcmFkZWsuaWNvISwgZW5kOiByYWRlay5pY28hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGFjOiB7IHN0YXJ0OiByYWRlay5hYywgZW5kOiByYWRlay5hYyB9ICxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbWVzaWM6IHsgc3RhcnQ6IHJhZGVrLm1lc2ljLCBlbmQ6IHJhZGVrLm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJvazogeyBzdGFydDogcmFkZWsucm9rISwgZW5kOiByYWRlay5yb2shIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vbGljOiB7IHN0YXJ0OiByYWRlay5saWMsIGVuZDogcmFkZWsubGljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHVjczogeyBzdGFydDogcmFkZWsudWNzLCBlbmQ6IHJhZGVrLnVjcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByYWRla196OiB7IHN0YXJ0OiByYWRlay5yYWRla196LCBlbmQ6IHJhZGVrLnJhZGVrX3ogfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9LCBNYXNrYTI6IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vLy90aGF0LnRhc2tMaXN0KHt9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5wYXJlbnRDbnQuaXNsLlVjclVjZXRuaVphcGlzLmxpc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJxXHJcbiAgICAgICAgICAgICAgICAgICAgLy8pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZpZXcudXBkYXRlRGF0YShyZXN1bHQsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmlldy51cGRhdGVEYXRhUmF3KHJhZGVrKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmlldy51cGRhdGVEYXRhKHJhZGVrLCBcInJlZnJlc2hcIilcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEocmFkZWssIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmYXVsdG5pIGFrY2UgbmEgZ3JpZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBWIHBvdG9ta3UgbHplIHByZWRlZmlub3ZhdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZGVmYXVsdEFjdGlvbihyb3c/OiBVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0byk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBkZWZhdWx0QWN0aW9uIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93RGV0YWlsKHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByZXZlZGVuaSBrbGlrdSBuYSBidW5rdSBkbyBmaWx0cnUgYSBuYWN0ZW5pXHJcbiAgICAgICAgICogQHBhcmFtIGV2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldjogSlF1ZXJ5RXZlbnRPYmplY3QpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IGRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudCBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIHZhciAkY29sID0gJChldi50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFldi5jdHJsS2V5IHx8ICEkY29sLmhhc0NsYXNzKFwiY2VsbFwiKSB8fCAkY29sLmhhc0NsYXNzKFwianMtY2Z1LWNlbGxcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChldi5zaGlmdEtleSAmJiBzZWxlY3Rpb24pIHNlbGVjdGlvbi5lbXB0eSgpOyAvL1Bva3VkIHNlIHZ5YmlyYSBwcmVzIGtsLiB6a3JhdGt1IGN0cmwrc2hpZnQrbGNsaWNrLCB0YWsgYXQgc2UgbmVvem5hY3VqZSB0ZXh0XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sSW5kZXggPSAkY29sLmF0dHIoXCJkYXRhLWNvbHVtbi1pbmRleFwiKSE7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiA7XHJcbiAgICAgICAgICAgIHZhciBjb2xEZWYgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcInRydWVDb2x1bW5zXCIsIGZhbHNlKVtjb2xJbmRleF0gYXMgR0dyaWRDb2x1bW48VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+O1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbERlZi5zZXJ2ZXJGaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogYW55ID0gJGNvbC50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuOyAvL05PVEU6IFBva3VkIG5lbmkgaG9kbm90YSwgdGFrIGFzaSBuZW5pIGNvIHJlc2l0LiBSZXNpIGhsYXZuZSBidWcgcyB0ZXh0b3ZvdSBob2Rub3RvdSB2IGNpc2VsbnljaCBzbG91cGNpY2hcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsID0gZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vTk9URTogVG9obGUgamUgc3BhdG55IHpwdXNvYiwgY2VsZSBieSB0byBjaHRlbG8gcHJlcHNhdCwgYWJ5IHNlIG5lc2xvIHBvIHN0cmluZ3UgeiBidW5reSwgYWxlIHBvIGRhdGVjaC4gXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgIFBvcHRhdCBzZSBTa2FsaWNlLCBqZXN0bGkgZXhpc3R1amUgbmVqYWt5IGxlcHNpIHpwdXNvYi4uLlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbERlZi5jb2x1bW5UeXBlID09PSBcImRhdGV0aW1lXCIpIHZhbHVlID0gc2VsW2NvbERlZi5uYW1lIV07XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2xEZWYuY29sdW1uVHlwZSA9PT0gXCJjdXJyZW5jeVwiKSB2YWx1ZSA9IHNlbFtjb2xEZWYubmFtZSFdO1xyXG4gICAgICAgICAgICAgICAgLy9OT1RFOiBUb3RvIGplIHRha3kgc3BhdG5lLCBwcm90b3plIHNlIG9waXJhIG8gbW9kZWwsIGt0ZXJ5IGplIHNvdWNhc3RpIHYgcHJlZmFidSB1dm5pdHIuIEppbnkgenB1c29iIGFzaSB6YXRpbSBuZW5pIDotKFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbERlZi5uYW1lID09PSBcInR5cF9hZ190eHRcIiB8fCBjb2xEZWYubmFtZSA9PT0gXCJ0eXBfYWdcIikgdmFsdWUgPSB7IHR5cF9hZzogc2VsLnR5cF9hZywgemtyX2FnOiBzZWwudHlwX2FnX3R4dCB9O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sRGVmLm5hbWUgPT09IFwiaXhzX3R5cFwiIHx8IGNvbERlZi5uYW1lID09PSBcIml4c190eXBfdHh0XCIpIHZhbHVlID0geyBpeHNfdHlwOiBzZWwuaXhzX3R5cCwgaXhzX3R5cF90eHQ6IHNlbC5peHNfdHlwX3R4dCB9O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sRGVmLm5hbWUgPT09IFwiZXN1X3R4dFwiKSB2YWx1ZSA9IHsgZXN1X3R4dDogc2VsLmVzdV90eHQsIGl4c19lc3U6IHNlbC5peHNfZXN1IH07IFxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sRGVmLm5hbWUgPT09IFwiZXN1X2ljb1wiKSB2YWx1ZSA9IHsgZXN1X2ljbzogc2VsLmVzdV9pY28sIGl4c19lc3U6IHNlbC5peHNfZXN1IH07XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2xEZWYubmFtZSA9PT0gXCJlc3VfcmNcIikgdmFsdWUgPSB7IGVzdV9yYzogc2VsLmVzdV9yYywgaXhzX2VzdTogc2VsLml4c19lc3UgfTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbERlZi5uYW1lID09PSBcIml4c19lc3VcIikgdmFsdWUgPSB7IGl4c19lc3U6IHNlbC5peHNfZXN1IH07XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2xEZWYubmFtZSA9PT0gXCJwcml6X2Jsb2tcIikgdmFsdWUgPSB7IHByaXpfYmxvazogc2VsW1wicHJpel9ibG9rXCJdIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyICRmaWx0ZXJGcm1Cb3ggPSBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiZmluZEZpZWxkc1wiLCBjb2xEZWYubmFtZSEpO1xyXG4gICAgICAgICAgICAgICAgJGZpbHRlckZybUJveC5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2YWx1ZSwgeyB2YWxpZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogZnVuY3Rpb24gY3JlYXRlRmlsdGVyWmFsb3prYVxyXG4gICAgICAgICogICAgICBcclxuICAgICAgICAqIE9iZWNuYSB6YWxvemthXHJcbiAgICAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50XHJcbiAgICAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHVibGljICBjcmVhdGVGaWx0ZXJaYWxvemthKCk6IGFueSB7XHJcblxyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIm5laW1wbGVtZW50b3Zhbm9cIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGZpbHRyb3ZhY2lobyBwYW5lbHVcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVGaWx0ZXJQYW5lbCh0aGF0OiB0aGlzKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBjcmVhdGVGaWx0ZXJQYW5lbCBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vbGV0IGNmdVNldCA9IEdvcmRpYy5Fa28uQ2Z1VXRpbHMuZ2V0Q2Z1U2V0U2VydmVyRmlsdGVycyh0aGlzLnBhcmVudENudCwge1xyXG4gICAgICAgICAgICAvLyAgICBpc1JvejogdGhpcy5Sb3pwb2NldCxcclxuICAgICAgICAgICAgLy8gICAgaXNVY3Q6IHRoaXMuVWNldG5pY3R2aSxcclxuICAgICAgICAgICAgLy8gICAgY2hlY2tVZXRlOiB0aGlzLnBhcmVudENudC5la29QYXJhbXMuQ2hlY2tVZXRlLFxyXG4gICAgICAgICAgICAvLyAgICBpeHNSb3o6IHRoaXMucGFyZW50Q250LmVrb1BhcmFtcy5JeHNSb3ogfHwgdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIGxldCBjZnVTZXQgPSB0aGlzLmdldENmdVNldFNlcnZlckZpbHRlcnMoZmFsc2UpO1xyXG4gICAgICAgICAgICB2YXIgZ2YgPSBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWxlbWVudFV0aWxzLmNyZWF0ZUVsZW1lbnRzR3JpZEZvcm1hdCh7XHJcbiAgICAgICAgICAgICAgICBla29QYXJhbXM6IHRoaXMucGFyZW50Q250LmVrb1BhcmFtcyxcclxuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHRoaXMuZ2xvYmFscyxcclxuICAgICAgICAgICAgICAgIHR5cFNlc3Rhdnk6IHRoaXMudHlwU2VzdGF2eSxcclxuICAgICAgICAgICAgICAgIGNmdVNldDogY2Z1U2V0LFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyT3B0aW9uczogdGhpcy5maWx0ZXJPcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyUGFyYW1zOiB0aGlzLnBhcmVudENudC5maWx0ZXJQYXJhbXNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZWxtUm93T3B0cyA9IHsgbGFiZWw6IFwiRWxlbWVudHlcIiB9O1xyXG4gICAgICAgICAgICBlbG1Sb3dPcHRzW1wiZmF2b3JpdGVSb3dMYXlvdXREZXNjcmlwdG9yXCJdID0gXCJ3LUwtOSB3LU0tOCB3LVMtMTJcIjtcclxuICAgICAgICAgICAgLy9sZXQgZnBGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICAgICAgbGV0IGZwRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcImpyZXM6MzAyNTAwNTJcIiB9KSAvL1JDIDMwMjUwMDUyIDogRmlsdHJcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coZWxtUm93T3B0cylcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkVrby5QcmVmYWJzLmNmdUVsZW1lbnRzKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVsZW1lbnR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYW1lOiBcImZpbHRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5wYXJlbnRDbnQudGFza0lkID8gdGhpcy5wYXJlbnRDbnQudGFza0lkICsgXCJfZWxlbWVudHlGaWVsZCNcIiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5lbGVtZW50eS5maWx0ZXJzPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogKG1vZGVsVmFsdWUpID0+IHsgcmV0dXJuIG1vZGVsVmFsdWU7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IChmaWVsZFZhbHVlOmFueSkgPT4geyByZXR1cm4gZmllbGRWYWx1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikgeyB0aGF0LnBhcmVudENudC5sb2cudHJhY2UoXCJlbGVtZW50eVwiLCAkKHRoaXMpLmdmaWVsZChcImdldFZhbHVlXCIpKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBnZixcclxuICAgICAgICAgICAgICAgICAgICBjaGVja1VldGU6IHRoaXMucGFyZW50Q250LmVrb1BhcmFtcy5DaGVja1VldGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuQWRkTmV3UmVjb3JkczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5SZW1vdmVSZWNvcmRzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5ld1JlY29yZDogR0VsZW1lbnRVdGlscy5jcmVhdGVOZXdFbGVtZW50RnVuYyh0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1ISwgdGhpcy5wYXJlbnRDbnQuZWtvUGFyYW1zKSxcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclJlY29yZDogR0VsZW1lbnRVdGlscy5jcmVhdGVDbGVhckVsZW1lbnRGdW5jKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUhKSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRFbGVtZW50VmFsdWVPcHRpb25zOiB7IHNraXA6IEdFbGVtZW50VXRpbHMuZ2V0RWxlbWVudFZhbHVlU2tpcENvbHVtbnModGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSEpLCBuYW1lQ29sdW1uOiBcIm5hemV2XCIgfSxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgLy9pZiAodGhhdC5zaG93UG9waXNTdHJ1a3RQb2xvemt5KSB7XHJcbiAgICAgICAgICAgIC8vIDE4LjcuMjAyNTogT3ByYXZlbm8gVEtcclxuICAgICAgICAgICAgaWYgKHRoYXQucG91eml2YW5TdHJ1a1BvcGlzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSAkLmV4dGVuZCh0cnVlLCBbXSwgdGhpcy5maWx0ZXJTdHJQb3BpcyA/PyBbXSk7XHJcbiAgICAgICAgICAgICAgICBmcEZvcm0uYWRkUm93KFwianJlczozMTEwMDIyM1wiKSAvL1JDIDMxMTAwMjIzIDogRmlsdHIgZGxlIHN0ci4gcG9waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuVWNyLldlYkNsaWVudC5QcmVmYWJzLnN0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsdGVyU3RyUG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBpbml0aWFsVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IGluaXRpYWxWYWx1ZSwgLy9PcHRpbWFsaXphY2UsIGFieWNoIG5lbXVzZWwgZGVsYXQgZGFsc2kgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgdikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXRudXRpIGhvZG5vdHkgc3RyLiBwb3Bpc3UgeiBwb2xpY2thIHZlIGZpbHRlcnBhbmVsdSBkbyBwb2xpY2thLCBrdC4gamUgc291Y2FzaSBnZ3JpZHNlcnZlcmZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFkZFN0clBvcGlzQ29sdW1ucyB8fCAhdi52YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHYudmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gdi52YWx1ZVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGRTdHJQb3Bpc0NvbHVtbnMuaW5kZXhPZih2YWwua2xpYyEpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZ2ID0ge30gYXMgT2JqZWN0TGl0ZXJhbDxzdHJpbmc+O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dlt2YWwua2xpYyFdID0gdmFsLmhvZG5vdGEhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiZmluZEZpZWxkc1wiLCB2YWwua2xpYyEpLmdmaWVsZChcInNldFZhbHVlXCIsIHZ2LCB7IHRyaWdnZXJDaGFuZ2U6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLnBhcmVudENudC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtmcEZvcm1dLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW1wibWRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw1TTNTMSBMLTEyLTEyLTAgTS0xMi0xMi0wIFMtMTItMTItMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEJ1dHRvbk9uTWFpblJvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzYXZlT3B0aW9uc0Zvcm06IEdVY3JNYXNrYURldGFpbC5nZXRGb3JtKGdmIGFzIGFueSksIC8vVE9ETzogRGF0IHNwcmF2bnkgdHlwIGdyaWRmb3JtYXR1IVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclN0b3JhZ2VTZXJ2aWNlOiBuZXcgR1Vjck1hc2thU2VydmljZSh7IHR5cFNlc3Rhdnk6IHRoaXMudHlwU2VzdGF2eSwgcGFyZW50Q29udGVudDogdGhhdC5wYXJlbnRDbnQsIGZyYWdtZW50cyA6XCIqLGVsZW1lbnR5XCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNob3NlRmlsdGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2FwcGx5OiAoZXYsIGRhdGEpID0+IHsgdGhpcy5sb2FkRGF0YU9sZChkYXRhLmZpbHRlcik7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQ6IChldiwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlCdXR0b25CZWhhdmlvdXI6IFwiQWx3YXlzUHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyRmlsdGVyQnV0dG9uVmlzaWJsZTogXCJBbHdheXNWaXNpYmxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9WeWhsZWRhbmlab2JyYXppdDogXCJPYmxpYmVuZVBvZG1pbmt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLkRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLkRldGFpbCwgRmlsdGVyVmlld01vZGUuTm9ybWFsLCBGaWx0ZXJWaWV3TW9kZS5TaW1wbGVdLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXRVc2VyU2V0dGluZ3M6IFwiRGVueVwiIC8vTk9URTogWmFrYXp1amUgcHJlcGluYW5pIHBvIHZ5aGxlZGFuaSAtIHBva3VkIHNlIG5la2RvIHBva291c2VsIHZ5bWF6YXQgZmlsdHIgdiB0b210byByZXppbXUsIHRhayBtdXNlbCBrbGlrbm91dCBuYSB2eWhsZWRhdCwgdml6IFQzOTg3XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFV6YXZpcmFuaSBva25hXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBjbG9zaW5nIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZmlsdHJ1XHJcbiAgICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGdldEZpbHRlcihmUGFuZWxEYXRhPzogYW55KTogSlF1ZXJ5UHJvbWlzZTxHU2V6bmFtRWtvWmF6bmFtdUdldERhdGFGaWx0ZXJEdG8+IHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgZ2V0RmlsdGVyIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgdmFyIGZpbHRlckR0byA9IGZQYW5lbERhdGEgfHwge307XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50eTogYW55ID0gbnVsbDsgLy9UT0RPOiBQbyB2eWJlcnUgdmFyaWFudHkgb3R5cG92YXQhISFcclxuICAgICAgICAgICAgbGV0IGZpbHRlclN0clBvcGlzOiBHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyRHRvW10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKGZQYW5lbERhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmUGFuZWxEYXRhLmVsZW1lbnR5ICYmICQuaXNQbGFpbk9iamVjdChmUGFuZWxEYXRhLmVsZW1lbnR5KSlcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50eSA9IGZQYW5lbERhdGEuZWxlbWVudHk7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChmUGFuZWxEYXRhLmZpbHRlcnMgKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgZWxlbWVudHkgPSBmUGFuZWxEYXRhLmZpbHRlcnM7XHJcbiAgICAgICAgICAgICAgICBpZiAoZlBhbmVsRGF0YS5maWx0ZXJTdHJQb3BpcyAmJiBmUGFuZWxEYXRhLmZpbHRlclN0clBvcGlzIGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyUG9waXMgPSBmUGFuZWxEYXRhLmZpbHRlclN0clBvcGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHRocm93ICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBncmlkLmdncmlkc2VydmVyZmlsdGVyPEdFa29GaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBmaWx0ZXJEdG8pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJmaWx0ZXJcIiwgZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiZWxlbWVudHlcIiwgSlNPTi5zdHJpbmdpZnkoZWxlbWVudHkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJmaWx0ZXJTdHJQb3Bpc1wiLCBmaWx0ZXJTdHJQb3Bpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwic3RyUG9waXNLZXlzXCIsIHRoaXMucGFyZW50Q250LmFkZFN0clBvcGlzQ29sdW1ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnR5ICYmIGVsZW1lbnR5LmZpbHRlcnMgJiYgZWxlbWVudHkuZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtvcGlyb3ZhbmkgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudHkuZmlsdGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3B5Q2Z1VG9PYmplY3QoZWxlbWVudHkuZmlsdGVyc1tpXVtcImNmdVwiXSwgZWxlbWVudHkuZmlsdGVyc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJla29waXJvdmFuaSB2ZXR5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3B5Q2Z1VG9PYmplY3QoZFtcImNmdVwiXSwgZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZmlsdGVyOiBkLCBlbGVtZW50eTogZWxlbWVudHksIGZpbHRlclN0clBvcGlzOiBmaWx0ZXJTdHJQb3Bpcywgc2tpcFN1bUxpbWl0OiBmYWxzZSwgc3RyUG9waXNLZXlzOiB0aGlzLnBhcmVudENudC5hZGRTdHJQb3Bpc0NvbHVtbnMgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgZmlsdHIgbmFkIGdyaWRlbVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEZpbHRlckdyaWQoKTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyRmlsdGVyRHRvPiAge1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyRHRvOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyRmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwgfHwgIWdyaWQuaGFzQ2xhc3MoXCJnZ3JpZHNlcnZlcmZpbHRlclwiKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkLmdncmlkc2VydmVyZmlsdGVyPEdFa29GaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBmaWx0ZXJEdG8pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcImZpbHRlciBuYWQgZ3JpZGVtXCIsIGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVsb3plbmkgZmlsdHJ1IGRvIHphc29ibmlrdVxyXG4gICAgICAgICAqIEBwYXJhbSBmaWx0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgc2V0RmlsdGVyU3RhY2soZmlsdGVyOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyRmlsdGVyRHRvKSB7XHJcbiAgICAgICAgICAgICQuY29udGVudChcIm1haW5cIikucHJvcChcInVsb3plbmVGaWx0cnlHcmlkXCIsIGZpbHRlcik7XHJcbiAgICAgICAgICAgIC8vd2luZG93W1wiX3VjckVrb0NsaXBib2FyZEZpbHRlclwiXSA9IGZpbHRlcjtcclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5wcm9wKFwidWxvemVuZUZpbHRyeUdyaWRcIiwgZmlsdGVyKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnliZXIgZmlsdHJ1IHplIHphc29ibmlrdVxyXG4gICAgICAgICAqIEBwYXJhbSBmaWx0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RmlsdGVyU3RhY2soKTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjckZpbHRlckR0byB8IG51bGwge1xyXG4gICAgICAgICAgICByZXR1cm4gJC5jb250ZW50KFwibWFpblwiKS5wcm9wKFwidWxvemVuZUZpbHRyeUdyaWRcIikgYXMgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjckZpbHRlckR0byA/PyBudWxsO1xyXG4gICAgICAgICAgICAvL3JldHVybiB3aW5kb3dbXCJfdWNyRWtvQ2xpcGJvYXJkRmlsdGVyXCJdIGFzIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29GaWx0ZXJEdG8gPz8gbnVsbDtcclxuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5wYXJlbnRDbnQucHJvcChcInVsb3plbmVGaWx0cnlHcmlkXCIpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29waWUgY2Z1IGRvIG9iamVrdHVcclxuICAgICAgICAgKiBAcGFyYW0gc291cmNlXHJcbiAgICAgICAgICogQHBhcmFtIGRlc3RpbmF0aW9uXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY29weUNmdVRvT2JqZWN0KHNvdXJjZTogYW55LCBkZXN0aW5hdGlvbjogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IGNvcHlDZnVUb09iamVjdCBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2VbXCJ1ZWFcIl0gPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVhID0gc291cmNlLnVlYTtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWViID0gc291cmNlLnVlYjtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVjID0gc291cmNlLnVlYztcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVkID0gc291cmNlLnVlZDtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVlID0gc291cmNlLnVlZTtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVmID0gc291cmNlLnVlZjtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVnID0gc291cmNlLnVlZztcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVoID0gc291cmNlLnVlaDtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVpID0gc291cmNlLnVlaTtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVqID0gc291cmNlLnVlajtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udGUwID0gc291cmNlLnRlMDtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udGUxID0gc291cmNlLnRlMTtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udGUyID0gc291cmNlLnRlMjtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udGUzID0gc291cmNlLnRlMztcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udGU0ID0gc291cmNlLnRlNDtcclxuICAgICAgICAgICAgaWYgKCFzb3VyY2UgfHwgdHlwZW9mIHNvdXJjZS50ZTUgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVrID0gc291cmNlLnVlaztcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVsID0gc291cmNlLnVlbDtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVtID0gc291cmNlLnVlbTtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udWVuID0gc291cmNlLnVlbjtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udGU1ID0gc291cmNlLnRlNTtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udGU2ID0gc291cmNlLnRlNjtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udGU3ID0gc291cmNlLnRlNztcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udGU4ID0gc291cmNlLnRlODtcclxuICAgICAgICAgICAgZGVzdGluYXRpb24udGU5ID0gc291cmNlLnRlOTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiS29uZWMgY29weUNmdVRvT2JqZWN0IEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIE5hY3RlbmkgZGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGxvYWREYXRhKCk6IHZvaWQvKjogSlF1ZXJ5UHJvbWlzZTxhbnk+Ki8ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBsb2FkRGF0YSBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIktvbmVjIGxvYWREYXRhIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgLy90aHJvdyBFcnJvcihcIk5laW1wbGVtZW50b3Zhbm9cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabm92dW5hY3RlbmkgXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgcmVsb2FkKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCByZWxvYWQgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5maXJzdExvYWQpIHsgXHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuJGZpbHRlclBhbmVsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuaXNsVmlldy5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3ZpZXcucmVxdWVzdERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucGFyZW50Q250LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX25hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJSZWxvYWQgLT4gcmVxdWVzdERhdGEgW0dTZXpuYW1Fa29aYXpuYW11QmFzZV1cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIktvbmVjIHJlbG9hZCBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIC8vdmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvLyAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQubmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJlY2hhemVqaWNpIGZhc2xlZHVqaWNpIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBwcmV2RmlsdGVyKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBwcmV2RmlsdGVyIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgLS10aGlzLmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXg7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlckhpc3RvcnkubGVuZ3RoID4gMCAmJiB0aGlzLmZpbHRlckhpc3RvcnkubGVuZ3RoID4gdGhpcy5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICYmIHRoaXMuY3VyckZpbHRlckhpc3RvcnlJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVGaWx0ZXIodGhpcy5maWx0ZXJIaXN0b3J5W3RoaXMuY3VyckZpbHRlckhpc3RvcnlJbmRleF0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIE5hbHNlZHVqaWNpIGZpbHRyXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG5leHRGaWx0ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IG5leHRGaWx0ZXIgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICArK3RoaXMuY3VyckZpbHRlckhpc3RvcnlJbmRleDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVySGlzdG9yeS5sZW5ndGggPiAwICYmIHRoaXMuZmlsdGVySGlzdG9yeS5sZW5ndGggPiB0aGlzLmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggJiYgdGhpcy5jdXJyRmlsdGVySGlzdG9yeUluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUZpbHRlcih0aGlzLmZpbHRlckhpc3RvcnlbdGhpcy5jdXJyRmlsdGVySGlzdG9yeUluZGV4XSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuY3VyckZpbHRlckhpc3RvcnlJbmRleDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBtb3ZlRmlsdGVyKGN1cnJGaWx0ZXI6IEdTZXpuYW1Fa29aYXpuYW11R2V0RGF0YUZpbHRlckR0byk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBtb3ZlRmlsdGVyIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRGaWx0ZXJUb0hpc3RvcnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjdXJyRmlsdGVyICE9IHVuZGVmaW5lZCAmJiB0eXBlb2YgY3VyckZpbHRlcltcImZpbHRlclwiXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gO1xyXG4gICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImFwcGx5XCIsIGN1cnJGaWx0ZXIuZmlsdGVyISk7XHJcbiAgICAgICAgICAgICAgICAvL05PVEU6IFRvdG8gemF0aW0gbmVidWRlIGZ1bmdvdmF0LCB6YWxlemkgbmEgdmFyaWFudGUgZWxtZW50dSwga3RlcmEgdnlocmFqZVxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZChcIi5nZmlsdGVycGFuZWxcIikuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIiwgY3VyckZpbHRlci5lbGVtZW50eS5maWx0ZXJzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXJDbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByaWRhbmkgcG9kbWlua3kgZG8gaGlzdG9yaWUgZmlsdHJ1XHJcbiAgICAgICAgICogQHBhcmFtIG5ld0ZpbHRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBhZGRGaWx0ZXJJbnRvSGlzdG9yeShuZXdGaWx0ZXI6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBhZGRGaWx0ZXJJbnRvSGlzdG9yeSBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoYXQucmVtZW1iZXJIaXN0b3J5ID09PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5hZGRGaWx0ZXJUb0hpc3RvcnkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggIT09IHRoYXQuZmlsdGVySGlzdG9yeS5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVySGlzdG9yeS5zcGxpY2UodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICsgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJIaXN0b3J5LnB1c2gobmV3RmlsdGVyKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuYWRkRmlsdGVyVG9IaXN0b3J5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYWN0aW9uc1tcIm5leHRGaWx0ZXJBY3RcIl0/LmVuYWJsZWQodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4IDwgdGhhdC5maWx0ZXJIaXN0b3J5Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zW1wicHJldkZpbHRlckFjdFwiXT8uZW5hYmxlZCh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggPiAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGdyaWRmb3JtYXR1IGRsZSBwcmVkbG9oeVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KHR5cGVaYXBpcz86XCJEZXRhaWxcIik6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8YW55PiB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiTmVpbXBsZW1lbnRvdmFub1wiKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIHByaW0uIGRva2xhZHVcclxuICAgICAgICAgKiBAcGFyYW0gcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHNob3dQcmltRG9rbGFkKHJvdz86IFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvLCB0eXA6IFwiUFJJXCIgfCBcIkJMS1wiIHwgXCJTTUxcIiB8XCJST1wifFwiXCIgPSBcIlwiKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IHNob3dQcmltRG9rbGFkIEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgaWYgKCFyb3cpIHtcclxuICAgICAgICAgICAgICAgIC8vbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vbGV0IGN1cnJlbnRSb3cgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImFjdGl2ZVJvd1wiLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy9pZiAoIWN1cnJlbnRSb3cpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIC8vaWYgKGN1cnJlbnRSb3c/Ll9pc1ZpcnR1YWwpXHJcbiAgICAgICAgICAgICAgICAvLyAgICByb3cgPSBjdXJyZW50Um93W1wic3RydWN0dXJlXCJdLnJvd3NbMF0uZGF0YSBhcyBVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bztcclxuICAgICAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgcm93ID0gY3VycmVudFJvdy5kYXRhIGFzIFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByb3dpID0gdGhpcy5nZXRDdXJyZW50Um93KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93aSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgcm93ID0gcm93aTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBsZXQgaXhwID0gKHR5cCA9PT0gXCJQUklcIikgPyByb3cuaXhwX3ByaW06cm93Lml4cDtcclxuICAgICAgICAgICAgLy9pZiAodHlwID09PSBcIlBSSVwiKVxyXG4gICAgICAgICAgICAvLyAgICBpeHAgPSByb3cuaXhwX3ByaW07XHJcbiAgICAgICAgICAgIC8vbGV0IHR5cEFnID0gcm93LnR5cF9hZztcclxuICAgICAgICAgICAgLy8gdHlwIGFnZW5keSBzZSBkb2hsZWRhIGF1dG9tYXRpY2t5XHJcbiAgICAgICAgICAgIGxldCB0eXBBZzogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vIGRva2xhZCBibGtcclxuICAgICAgICAgICAgaWYgKHR5cCA9PSBcIkJMS1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvL2Rva2xhZCBibGtcclxuICAgICAgICAgICAgICAgIC8vdHlwQWcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpcyB8fCB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkJhbGFuY292YW5pWmFwaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBEb2tsYWQgQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByb3cuaXhwX3ByaW0gPT09IFwidW5kZWZpbmVkXCIgfHwgcm93Lml4cF9wcmltID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaXhwID0gcm93Lml4cF9wcmltO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGRva2xhZCBzbWxcclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwID09IFwiU01MXCIpIHtcclxuICAgICAgICAgICAgICAgIGl4cCA9IHJvdy5peHBfc21sO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFJvenBvY3RvdmUgb3BhdHJlbmlcclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwID09IFwiUk9cIikge1xyXG4gICAgICAgICAgICAgICAgLy90eXBBZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAvLyBTcGVjaWFsaXRrYSBwcm8gc3RyZWRuZWRvYnkgdnlobGVkXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5QcmltYXJuaVBvemFkYXZreVphcGlzIHx8IHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERva2xhZCBST1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygcm93Lml4cF9yb3ogPT09IFwidW5kZWZpbmVkXCIgfHwgcm93Lml4cF9yb3ogPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cEFnID0gNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwID0gcm93Lml4cF9yb3o7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cEFnICE9PSBudWxsICYmICFbNDAsIDUwLCA3MCwgODAsIDEwMCwgMTEwLCAxMjAsIDE4MCwgMjMwLCA1MTAsIDU4MCwgNjIwLCAzMzBdLmNvbmNhdChyb3cudHlwX2FnIGFzIG51bWJlcikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIHRlc3QgbmEgdnlwbG5lbmluaSBpeHBcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpeHAgPT09IFwidW5kZWZpbmVkXCIgfHwgaXhwID09PSBudWxsKSByZXR1cm5cclxuXHJcbiAgICAgICAgICAgIC8vV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodGhpcy5wYXJlbnRDbnQsIHsgU2ltcGxlTW9kZTogdHJ1ZSwgRGV0YWlsRHRvOiB7IGl4cDogaXhwIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4eDE6IGl4cCwgLy8gaWQgY8OtbG92w6lobyBvYmpla3R1IHYgbm92xJsgb3RldsOtcmFuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9peHgyOiBudWxsLCAgLy8gZHJ1aMOpIGlkIGPDrWxvdsOpaG8gb2JqZWt0dSB2IHDFmcOtcGFkxJsgc2xvxb5lbsOpaG8ga2zDrcSNZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICAvL2l4eDM6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdHlwQWc6IHR5cEFnLCAgLy8gdHlwIGFnZW5keSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mYXplOiBudWxsLCAgLy8gZsOhemUgcG/FvmFkb3ZhbsOhIHBybyBvdGV2xZllbsOtIGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiB0cnVlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICBub0FwcEZhaWw6IGZhbHNlICAvLyBwxZnDrXpuYWsgdnl2b2zDoW7DrSB2w71qaW1reSBwxZlpIG5lbmFsZXplbsOtIGPDrWxvdsOpIGbDoXplIChuZXBvdmlubsOpKSBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcIk9wZW5EZXRhaWxcIiAgICAgICAgICAgIC8vIG7DoXpldiBtZXRvZHkgc3B1xaF0xJtuw6kgcG8gb3RldsWZZW7DrSBub3bDqSB6w6Fsb8W+a3lcclxuICAgICAgICAgICAgKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBXZmwuRGlhbG9ncy5EZXRhaWxEb2t1bWVudHVTcGlzdSh0aGlzLnBhcmVudENudCwgeyBTaW1wbGVNb2RlOiBmYWxzZSwgLypJeHBJbml0UHJvVmF6YnVTb3V2aXNlamljaWNoOiBpeHAhLCovIERldGFpbER0bzogeyBpeHA6IGl4cCEgfSB9LCBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuYXV0byk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB0b2dnbGVHcm91cGluZyhwcm9maWxlTmFtZT86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCB0b2dnbGVHcm91cGluZyBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIEdEbGcuYWxlcnQoXCJqcmVzOjMwMjUwNTk2XCIpOyAvL1JDIDMwMjUwNTk2IDogUHJvIHDFmWVwbnV0w60gem9icmF6ZW7DrSBtZXppICdEb2tsYWR5JyBhICdaw6FwaXN5JyBwb3XFvmlqdGUgcHJvZmlseSBncmlkdS5cclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIDtcclxuICAgICAgICAgICAgbGV0IGN1cnJQcm9maWxlID0gZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRDdXJyZW50UHJvZmlsZVwiKTtcclxuICAgICAgICAgICAgcHJvZmlsZU5hbWUgPSBwcm9maWxlTmFtZSB8fCAoY3VyclByb2ZpbGUubmFtZSAhPT0gdGhpcy5wcm9maWxlcy5kb2tsYWR5IS5uYW1lID8gdGhpcy5wcm9maWxlcy5kb2tsYWR5IS5uYW1lIDogdGhpcy5wcm9maWxlcy5kZWZhdWx0Lm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJQcm9maWxlLm5hbWUgPT09IHByb2ZpbGVOYW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJ1c2VQcm9maWxlXCIsIHByb2ZpbGVOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hY3RlbmkgdXJvdm5lIHplIHNsb3YgdWNldG5pIHZldHlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRVcm92ZW4oKTogSlF1ZXJ5UHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBnZXRVcm92ZW4gR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICBsZXQgc2xvdlJvenZyaHUgPSB0aGlzLnBhcmVudENudC51c2VyU2V0dGluZ3M/LmdldChcInNlbGVjdGVkV29yZHNTaG93R3JpZENvbHVtbnNcIikgYXMgR1Nsb3ZhUm96dnJoRmlsdGVyRHRvW107XHJcbiAgICAgICAgICAgIGlmICghc2xvdlJvenZyaHUpIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgxNSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBsZXQgc2xvdmEgPSBcIlwiO1xyXG4gICAgICAgICAgICBzbG92Um96dnJodS5mb3JFYWNoKChpdGVtKSA9PiB7IHNsb3ZhICs9IGl0ZW0uaG9kbm90YSArIFwiLFwiIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cuZGVidWcoXCJTbG92YSB6IHJvenJ2dXJodTogXCIsIHNsb3ZSb3p2cmh1ICk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudENudC5jYWxsKFwiR2V0VXJvdmVuXCIsIHsgc2xvdmEgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmxvZy5kZWJ1ZyhcIlVyb3ZlbjogXCIsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXppdCB0ZXh0eSB6IHJvdnJodVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGF1dG9Mb2FkVGV4dHlaUm96dnJodSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgYXV0b0xvYWRUZXh0eVpSb3p2cmh1IEdTZXpuYW1Fa29aYXpuYW11QmFzZVwiKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICh0aGlzLnBhcmVudENudC5nbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLlVjci5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0uYXV0b0xvYWRUZXh0eVpSb3p2cmh1Q29sdW1uc1wiKSBhcyBib29sZWFuID8/IGZhbHNlKVxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cuZGVidWcoXCJBdXRvbWF0aWNrZSBuYWNpdGFuaSB0ZXh0dSB6IHJvenZyaHU6IFwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXppdCB0ZXh0eSB6IHJvdnJodVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGRpc3BsYXlUZXh0eVpSb3p2cmh1KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBkaXNwbGF5VGV4dHlaUm96dnJodSBHU2V6bmFtRWtvWmF6bmFtdUJhc2VcIik7XHJcbiAgICAgICAgICAgIC8vY29udGVudC5nbG9iYWxTZXR0aW5ncyEuZ2V0KFwiR2xvYmFsLlVjci5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0uRXZpZGVuY2VBa2NlXCIpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudXNlVGV4dHlaUm96dnJodSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB6amlzdGVuaSBwcmVkbmFzdGF2ZW55Y2ggc2xvdiByb3p2cmh1XHJcbiAgICAgICAgICAgIGxldCBzbG92Um96dnJodSA9IHRoaXMucGFyZW50Q250LnVzZXJTZXR0aW5ncz8uZ2V0KFwic2VsZWN0ZWRXb3Jkc1Nob3dHcmlkQ29sdW1uc1wiKSBhcyBHU2xvdmFSb3p2cmhGaWx0ZXJEdG9bXTtcclxuICAgICAgICAgICAgaWYgKCFzbG92Um96dnJodSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLmRlYnVnKFwiWm9icmF6aXQgdGV4dHkgeiByb3p2cmh1OiBuZWpzb3UgcHJlZG5hc3RhdmVuYSBzbG92YVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9wb2t1ZCBuZW5pIHZ5YnJhbm8gemFkbmUgc2xvdm8sIG5lbmkgY28gem9icmF6b3ZhdFxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gKHRoaXMucGFyZW50Q250Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5zaG93VGV4dHlaUm96dnJodUNvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZSkgJiYgc2xvdlJvenZyaHUubGVuZ3RoID4gMDtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLmRlYnVnKFwiWm9icmF6aXQgdGV4dHkgeiByb3p2cmh1IFwiLCByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXppdCBha2NpIGJleiBQQVBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBzaG93UGFwQWN0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCB1c2VQYXAgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICAvL2NvbnRlbnQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5VY3IuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLkV2aWRlbmNlQWtjZVwiKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnVzZVBhcFJvd3MpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vcG9rdWQgbmVuaSB2eWJyYW5vIHphZG5lIHNsb3ZvLCBuZW5pIGNvIHpvYnJhem92YXRcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICh0aGlzLnBhcmVudENudC5nbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLlVjci5BcHBTZXR0aW5ncy5VY3RTZXR0aW5nc0Zvcm0ucmVhZFdpdGhvdXRQYXBcIikgYXMgYm9vbGVhbiA/PyBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cuZGVidWcoXCJab2JyYXppdCBha2NpIGJleiBQQVAgXCIsICFyZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gIXJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3RhdiB2eWJlcnUgUEFQIHphcGlzdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldENoZWNrZWRQYXAoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZVBhcFJvd3MpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVja2VkID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5iZXpQYXBBY3Q/LmNoZWNrZWQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mIGNoZWNrZWQgPT0gXCJ1bmRlZmluZWRcIiA/IGZhbHNlIDogY2hlY2tlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWN0ZSBjZnUgc2V0ICh6IGdjb250ZW50dSBuZWJvIHByaW1vIHogYXJndW1lbnR1KSBhIGplZG5vdGxpdnltIHNsb3VwY3VtIHZ5dHZvcmkgcHJvcGVydHUgJ3NlcnZlckZpbHRlcicgcHJvIENGVS5cclxuICAgICAgICAgKiBAcGFyYW0gZGVsZWdhdGVJbnRlcnZhbE9wdGlvbnNVc2Uge2Jvb2xlYW59IHRydWUgYnVkZSBwb3V6aXQgZGVsZWdhdCBwcm8gcHJpcGFkbm91IHVwcmF2dSBvcHRpb25zIGNmdUludGVydmFsdSBwcmVkIGplaG8gdnl0dm9yZW5pbSBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0Q2Z1U2V0U2VydmVyRmlsdGVycyhkZWxlZ2F0ZUludGVydmFsT3B0aW9uc1VzZTogYm9vbGVhbik6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8YW55PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNmdVV0aWxzLmdldENmdVNldFNlcnZlckZpbHRlcnModGhpcy5wYXJlbnRDbnQsIHRoaXMuZ2V0Q2Z1SW50ZXJ2YWxPcHRpb25zKGRlbGVnYXRlSW50ZXJ2YWxPcHRpb25zVXNlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFppc2thbmkgbmFzdGF2ZW5pIHBybyBpbmZldHZhbCBjZnVcclxuICAgICAgICAgKiBAcGFyYW0gZGVsZWdhdGVJbnRlcnZhbE9wdGlvbnNVc2Uge2Jvb2xlYW59IHRydWUgYnVkZSBwb3V6aXQgZGVsZWdhdCBwcm8gcHJpcGFkbm91IHVwcmF2dSBvcHRpb25zIGNmdUludGVydmFsdSBwcmVkIGplaG8gdnl0dm9yZW5pbSBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRDZnVJbnRlcnZhbE9wdGlvbnMoZGVsZWdhdGVJbnRlcnZhbE9wdGlvbnNVc2U6IGJvb2xlYW4pOiBHb3JkaWMuRWtvLkNmdVV0aWxzLklHQ2Z1RmlsdGVyT3B0aW9ucyB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaXNSb3o6IHRoaXMuUm96cG9jZXQsXHJcbiAgICAgICAgICAgICAgICBpc1VjdDogdGhpcy5VY2V0bmljdHZpLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tVZXRlOiB0aGlzLnBhcmVudENudC5la29QYXJhbXMuQ2hlY2tVZXRlLFxyXG4gICAgICAgICAgICAgICAgd2lsZGNhcmQ6IHRoaXMucGFyZW50Q250Lkdsb2JhbHMuT3RoZXJzPy5XaWxkY2FyZCxcclxuICAgICAgICAgICAgICAgIGl4c1JvejogdGhpcy5wYXJlbnRDbnQuZWtvUGFyYW1zLkl4c1JveiB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAvKiogRGVsZWdhdCBwcm8gcHJpcGFkbm91IHVwcmF2dSBvcHRpb25zIGNmdUludGVydmFsdSBwcmVkIGplaG8gdnl0dm9yZW5pbSAqL1xyXG4gICAgICAgICAgICAgICAgZ2V0SW50ZXJ2YWxPcHRpb25zOiBkZWxlZ2F0ZUludGVydmFsT3B0aW9uc1VzZSA/ICgoZHRvLCBvcHRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkZpbHRlciB8fCAhdGhpcy5TdHJpY3RGaWx0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGlzYWJsZWQgPSAhISF0aGlzLkZpbHRlcltkdG8ubmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHM7XHJcbiAgICAgICAgICAgICAgICB9KTogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmppc3RlbmkgYWt0dWFsbmlobyByYWRrdVxyXG4gICAgICAgICAqICAgICAgICBcclxuICAgICAgICAgKiAgQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0Q3VycmVudFJvdyhncmlkPzogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwpOiBVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0byB8IG51bGwge1xyXG4gICAgICAgICAgICBncmlkID0gdHlwZW9mIGdyaWQgPT09IFwidW5kZWZpbmVkXCIgfHwgZ3JpZCA9PT0gbnVsbCA/IHRoaXMuZ2V0R3JpZCgpIDogZ3JpZDtcclxuICAgICAgICAgICAgLy8gcG9rdWQgbmVuaSBncmlkLCBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXMucGFyZW50Q250O1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBqZSBjb250ZW50IHphdnJlbnksIHBhayBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICBpZiAodGhhdC5jbG9zZWQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRSb3cgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImFjdGl2ZVJvd1wiLCB0cnVlKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50Um93KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgLy8gemppc3RlbmkgYWt0dWFsbmlobyByYWRrdVxyXG4gICAgICAgICAgICByZXR1cm4gKGN1cnJlbnRSb3c/Ll9pc1ZpcnR1YWwpID8gKGN1cnJlbnRSb3dbXCJzdHJ1Y3R1cmVcIl0/IGN1cnJlbnRSb3dbXCJzdHJ1Y3R1cmVcIl0ucm93c1swXS5kYXRhIGFzIFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvOm51bGwpXHJcbiAgICAgICAgICAgICAgICA6IGN1cnJlbnRSb3cuZGF0YSBhcyBVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgZXhwb3J0IHR5cGUgSUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncyA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0byAmIHsgdGFiU2V0dGluZ3M/OiBJR0RldGFpbFN0YXZaYXBpc1JhZGt1VGFiU2V0dGluZ3MgfTtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdTZXpuYW1aYXBpc3VQcm9maWxlcyB7XHJcbiAgICAgICAgZGVmYXVsdDogR3JpZFByb2ZpbGU8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvPjtcclxuICAgICAgICBkb2tsYWR5PzogR3JpZFByb2ZpbGU8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvPjtcclxuICAgIH1cclxufSJdfQ==