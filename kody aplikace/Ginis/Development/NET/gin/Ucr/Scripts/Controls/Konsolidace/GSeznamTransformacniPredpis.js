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
             * Seznam transformacnich predpisu konsolidace
             *
             * @author tkares
             * @since 484.1.0.69
             */
            let GSeznamTransformacniPredpis = class GSeznamTransformacniPredpis extends Gordic.GContentBase {
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
                }
                //private profilName: string = "userProfile"; // jmeno profilu
                // nastaveni id a titulku okna
                //taskId = "SeznamTransformacniPredpis";
                onContentReady() {
                    //this.uid = "transformacniPredpisyKon#";
                    var that = this;
                    that.actions.addRange({
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: false,
                            run: () => {
                                //var row = that.$grid.ggrid<Gordic.Uct.Interface.GUctdmpaDto>("activeRow");
                                //if (row === null)
                                //    return;
                                let row = {};
                                //row.por_cislo = -1;
                                that.showDetail(row, true);
                            }
                        }),
                        actOprava: Gordic.Eko.Action.actionOpravit({
                            enabled: false, run: () => {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                var row = grid.ggrid("activeRow");
                                if (row === null)
                                    return;
                                that.showDetail(row, true);
                            }
                        }),
                        actKopieRadku: {
                            icon: "fa-clone",
                            tooltip: "30250306", //RC 30250306 : Vytvořit nový řádek jako kopii označeného řádku
                            caption: "jres:30250305", enabled: false, visible: true, run: () => {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                var row = grid.ggrid("activeRow");
                                if (row === null)
                                    return;
                                row.por_cislo = null;
                                that.showDetail(row, true);
                            }
                        },
                        actOdstranit: Gordic.Eko.Action.actionOdstranit({
                            enabled: false, run: () => {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                let rows = Gordic.Eko.Grid.checkedRows(grid);
                                if (rows == null || rows.length == 0)
                                    return;
                                that.DeleteRows(rows);
                            }
                        }),
                        actObcerstvit: Gordic.Eko.Action.actionObcerstvit({
                            enabled: true, run: function () {
                                that.refresh();
                                //if (that.loadingData) return;
                                //var view = that.$grid.ggrid("getView");
                                //view.requestData();
                            }
                        }),
                    });
                    this.menuBar([
                        //{ action: that.actions.printAct, favorite: true }
                        { action: that.actions.actNovy, favorite: true },
                        { action: that.actions.actOprava, favorite: true },
                        { action: that.actions.actKopieRadku, favorite: true },
                        { action: that.actions.actOdstranit, favorite: true },
                        { action: that.actions.actObcerstvit, favorite: true }
                    ]);
                    // vytvoreni fitru panelu
                    //this.createFilterPanel(this);
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
                        multi: true,
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
                                //var row = that.$grid.ggrid<Gordic.Uct.Interface.GUctdmpaDto>("activeRow");
                                //if (row === null)
                                //    return;
                                that.showDetail(data, false);
                            }
                        }),
                        //profileVisible: true,
                    });
                    //this.$grid.ggridserverfilter({});
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
                    this.setActions(0);
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
                 * Odstraneni radku
                 * */
                DeleteRows(rows) {
                    let that = this;
                    let msg = "jres:30250318"; //RC 30250318 : Opravdu chcete vymazat označený řádek?
                    if (rows.length > 1)
                        msg = "jres:30250319"; //RC 30250319 : Opravdu chcete vymazat označené řádky?
                    that.dialogs.confirm(msg)
                        .on("close", (ev, obj) => {
                        if (obj === "yes") {
                            that.isl.UcrKonsolidaceTransformace.hromadneOdstranit({ rq: rows })
                                .get()
                                .then(() => {
                                that.refresh();
                                that.showFlash({ label: "jres:30250320", state: "success" }); //RC 30250320 : Vymazání úspěšně provedeno
                                return;
                            });
                        }
                    });
                }
                /**
                 * Znovunacteni dat
                 *
                 * */
                refresh() {
                    let that = this;
                    if (that.loadingData)
                        return;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    var view = grid.ggrid("getView");
                    view.requestData();
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
                showDetail(radek, viewMode = true) {
                    let that = this;
                    //zobrazeni detailu
                    that.navigate("Gordic.Ucr.WebClient.GDetailTransformacniPredpis", { currentRow: radek, viewMode: viewMode }, {
                        closeOnEscape: false,
                    })
                        .on("close", function (res) {
                        if (res.returnValue && res.returnValue.refresh === true) {
                            that.refresh();
                        }
                    });
                    ;
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
                    var dataFound = pocetRadku > 0;
                    var tooltip = dataFound ? "" : "jres:30250174"; //RC 30250174 : Záznamy nenalezeny
                    let visible = Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */;
                    //if (dataFound)
                    //    this.actions.editovatAct!.updatePermission(this.editovatPermit);
                    //else
                    //    this.actions.editovatAct!.update({ enabled: dataFound, tooltip: tooltip });
                    this.actions.actNovy.update({
                        enabled: visible,
                        visible: visible
                    });
                    this.actions.actOprava.update({
                        tooltip: tooltip,
                        enabled: dataFound && visible,
                        visible: visible
                    });
                    this.actions.actKopieRadku.update({
                        tooltip: tooltip,
                        enabled: dataFound && visible,
                        visible: visible
                    });
                    this.actions.actOdstranit.update({
                        tooltip: tooltip,
                        enabled: dataFound && visible,
                        visible: visible
                    });
                }
                /**
                 *  Nacteni dat
                 */
                loadData() {
                    var that = this;
                    var def = $.Deferred();
                    debugger;
                    that.isl.UcrKonsolidaceTransformace.list()
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
                }
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 * @param colDefinition
                 */
                createGridFormat() {
                    var myGridFormat = new Gordic.Data.GridFormat();
                    myGridFormat.addTextColumn({
                        name: "uec_1",
                        caption: "jres:30250300", //RC 30250300 : Okruh
                        width: 80,
                    });
                    myGridFormat.addNumberColumn({
                        name: "drd",
                        caption: "jres:31100052 ", //RC 31100052 : H
                        description: "jres:31100102", //RC 31100102 : Druh dokladu (DRD)
                        //tooltipTemplate: "jres:31100102", //RC 31100102 : Druh dokladu (DRD)
                        width: 30,
                    });
                    myGridFormat.addTextColumn({
                        name: "ac_0",
                        caption: "jres:31100054", //RC 31100054 : Doklad
                        width: 100,
                    });
                    myGridFormat.addNumberColumn({
                        name: "md_dal",
                        caption: "jres:30250302", //RC 30250302 : Str
                        width: 40,
                        description: "jres:30250301" //RC 30250301 : Strana 0-bez rozlišení; 1-MD, 2-Dal
                    });
                    myGridFormat.addTextColumn({
                        name: "popis",
                        caption: "jres:30250303", //RC 30250303 : Popis
                        width: 150,
                    });
                    myGridFormat.addTextColumn({
                        name: "nks_0",
                        caption: this.Globals.Zkratky?.Nks,
                        //description: this.Globals.Zkratky?. this.texty.Nks,
                        width: 60,
                    });
                    myGridFormat.addTextColumn({
                        name: "ucs_0",
                        caption: this.Globals.Zkratky?.Ucs,
                        description: this.Globals.Zkratky?.Ucs,
                        width: 70,
                        //group: topoGroup,
                        aggregate: Gordic.Data.Aggregates.first("ucs"),
                    });
                    myGridFormat.addTextColumn({
                        name: "uus_0",
                        caption: this.Globals.Zkratky?.Uus,
                        description: this.Globals.Texty?.Uus,
                        width: 60,
                    });
                    // Modifikovane Su a Au
                    for (let i = 0; i < this.modifyCfu.columns.length; i++) {
                        const c = this.modifyCfu.columns[i];
                        myGridFormat.addTextColumn({
                            name: `${c.name}`,
                            caption: c.caption,
                            description: c.description,
                            width: c.width,
                            serverFilter: Gordic.Eko.Filters.cfuInterval({
                                cfu: c,
                                isRoz: false,
                                isUct: true,
                                model: `${c.name}`
                            })
                        });
                    }
                    return myGridFormat;
                }
            };
            GSeznamTransformacniPredpis = __decorate([
                Decorators.gcontent
            ], GSeznamTransformacniPredpis);
            WebClient.GSeznamTransformacniPredpis = GSeznamTransformacniPredpis;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVRyYW5zZm9ybWFjbmlQcmVkcGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbVRyYW5zZm9ybWFjbmlQcmVkcGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FzaUJmO0FBdGlCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzaUJuQjtJQXRpQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXNpQjdCO1FBdGlCb0IsV0FBQSxTQUFTO1lBQzFCOzs7OztlQUtHO1lBRUgsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBNEIsU0FBUSxPQUFBLFlBQVk7Z0JBQTdEOztvQkFPSSxrQkFBa0I7b0JBQ2xCLHFDQUFxQztvQkFDckM7O3VCQUVHO29CQUNPLGNBQVMsR0FBVyxjQUFjLENBQUM7b0JBWTdDLG1EQUFtRDtvQkFDbkQsZ0dBQWdHO29CQUN4RixnQkFBVyxHQUFZLEtBQUssQ0FBQyxDQUFDLHVCQUF1QjtnQkFtZ0JqRSxDQUFDO2dCQWxnQkcsOERBQThEO2dCQUM5RCw4QkFBOEI7Z0JBQzlCLHdDQUF3QztnQkFDeEMsY0FBYztvQkFDVix5Q0FBeUM7b0JBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFJaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBRWxCLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7NEJBQ2xDLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sNEVBQTRFO2dDQUM1RSxtQkFBbUI7Z0NBQ25CLGFBQWE7Z0NBQ2IsSUFBSSxHQUFHLEdBQXFDLEVBQUUsQ0FBQztnQ0FDL0MscUJBQXFCO2dDQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTs0QkFDOUIsQ0FBQzt5QkFDSixDQUFDO3dCQUdGLFNBQVMs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QUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNyRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFcEMsWUFBWSxDQUFDLGFBQWEsQ0FBQzs0QkFDdkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs0QkFDakIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPOzRCQUNsQixXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVc7NEJBQzFCLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSzs0QkFDZCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dDQUN6QyxHQUFHLEVBQUUsQ0FBQztnQ0FDTixLQUFLLEVBQUUsS0FBSztnQ0FDWixLQUFLLEVBQUUsSUFBSTtnQ0FDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOzZCQUNyQixDQUFDO3lCQUNMLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUdELE9BQU8sWUFBWSxDQUFDO2dCQUN4QixDQUFDO2FBQ0osQ0FBQTtZQTdoQlksMkJBQTJCO2dCQUR2QyxVQUFVLENBQUMsUUFBUTtlQUNQLDJCQUEyQixDQTZoQnZDO1lBN2hCWSxxQ0FBMkIsOEJBNmhCdkMsQ0FBQTtRQUNMLENBQUMsRUF0aUJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzaUI3QjtJQUFELENBQUMsRUF0aUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFzaUJuQjtBQUFELENBQUMsRUF0aUJTLE1BQU0sS0FBTixNQUFNLFFBc2lCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFNlem5hbSB0cmFuc2Zvcm1hY25pY2ggcHJlZHBpc3Uga29uc29saWRhY2VcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0a2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODQuMS4wLjY5XHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVRyYW5zZm9ybWFjbmlQcmVkcGlzIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBla29QYXJhbXM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdFa29QYXJhbXNEdG87XHJcblxyXG4gICAgICAgIGZpbHRlck9wdGlvbnM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HRmlsdGVyT3B0aW9uc0R0bztcclxuICAgICAgICAvLyBmaWx0cm92YWNpIHBhbmVsXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICAvLyBncmlkIHNlIHNlbmFtZW1cclxuICAgICAgICAvL3ByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdHJpZGEgZ3JpZHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2xhc3NHcmlkOiBzdHJpbmcgPSBcImpzLWdyaWQtYmFzZVwiO1xyXG4gICAgICAgIC8vIGNmdSBwcm8gc2V6bmFtXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RpZnlDZnU6IEd1aS5XZWJBcHAuR0dyaWRGb3JtYXREdG87XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQb3ZvbGVuaSBlZGl0YWNlXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgZWRpdG92YXRQZXJtaXQ6IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdQZXJtaXNzaW9uO1xyXG5cclxuICAgICAgICAvLyBrb250cm9sZXIgcHJvIHByZXZpZXcgb2tub1xyXG4gICAgICAgIC8vcHJpdmF0ZSBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjtcclxuICAgICAgICAvLyBOYXN0YXZlbmlcclxuICAgICAgICBwcml2YXRlIEdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JHbG9iYWxEdG87IFxyXG4gICAgICAgIC8vcHJpdmF0ZSBjb2xzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvY3Nrb0R0b1tdO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBjb25kRm9ybWF0czogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0W107IC8vIHBvZG1pbmVuZSBmb3JtYXRvdmFuaVxyXG4gICAgICAgIHByaXZhdGUgbG9hZGluZ0RhdGE6IGJvb2xlYW4gPSBmYWxzZTsgLy8gYXRyaWJ1dCBuYWNpdGFuaSBkYXRcclxuICAgICAgICAvL3ByaXZhdGUgcHJvZmlsTmFtZTogc3RyaW5nID0gXCJ1c2VyUHJvZmlsZVwiOyAvLyBqbWVubyBwcm9maWx1XHJcbiAgICAgICAgLy8gbmFzdGF2ZW5pIGlkIGEgdGl0dWxrdSBva25hXHJcbiAgICAgICAgLy90YXNrSWQgPSBcIlNlem5hbVRyYW5zZm9ybWFjbmlQcmVkcGlzXCI7XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vdGhpcy51aWQgPSBcInRyYW5zZm9ybWFjbmlQcmVkcGlzeUtvbiNcIjtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdE5vdnk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByb3cgPSB0aGF0LiRncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkbXBhRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkbXBhRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcm93LnBvcl9jaXNsbyA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dEZXRhaWwocm93LCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAsXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0T3ByYXZhOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PcHJhdml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0RldGFpbChyb3csdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdEtvcGllUmFka3U6IHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNsb25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCIzMDI1MDMwNlwiLCAvL1JDIDMwMjUwMzA2IDogVnl0dm/FmWl0IG5vdsO9IMWZw6FkZWsgamFrbyBrb3BpaSBvem5hxI1lbsOpaG8gxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDMwNVwiLCBlbmFibGVkOiBmYWxzZSwgdmlzaWJsZTogdHJ1ZSwgcnVuOiAoKSA9PiB7IC8vUkMgMzAyNTAzMDUgOiBLb3BpZSAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGRtcGFEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cucG9yX2Npc2xvID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93RGV0YWlsKHJvdywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T2RzdHJhbml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PZHN0cmFuaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93cyA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93cyhncmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93cyA9PSBudWxsIHx8IHJvd3MubGVuZ3RoID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5EZWxldGVSb3dzKHJvd3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0T2JjZXJzdHZpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2JjZXJzdHZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGF0LmFjdGlvbnMucHJpbnRBY3QsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0Tm92eSwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICAgICAgLCB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9wcmF2YSwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICAgICAgLCB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEtvcGllUmFka3UsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICwgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICwgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPYmNlcnN0dml0LCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXR2b3JlbmkgZml0cnUgcGFuZWx1XHJcbiAgICAgICAgICAgIC8vdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0ZG1wYUR0bz4gKFtdLCB7IHByb2Nlc3NvcnM6IHsgcHJvdmlkZXI6IHByb3ZpZGVyIH0gfSk7XHJcbiAgICAgICAgICAgIHZhciBzbG91cGNlID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSAkLm5ld0Rpdih0aGlzLmNsYXNzR3JpZClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHNsb3VwY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0UHJvZmlsZTogeyBjb2x1bW5zOiBzbG91cGNlLmNvbHVtbnMgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvd3MgPSBpbmZvLmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuY2xlYXJDb250cm9scygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93cy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KHsgY3VycmVudFJvdzogcm93c1swXSwgdmlld01vZGU6IHRydWUsIGNvbHM6IHRoYXQuY29scyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkWm9iemFaYXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkbXBhRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8gJiYgY3R4LmNlbGxJbmZvLmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGN0eC5jZWxsSW5mby5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJvdyA9IHRoYXQuJGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGRtcGFEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93RGV0YWlsKGRhdGEsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy96b2JyYXplbmkgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3daYXBpc3koZGF0YSwgY3R4LmNlbGxJbmZvLmNvbHVtbi5maWVsZClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3Byb2ZpbGVWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy4kZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcih7fSk7XHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBQcmV2aWV3IHYgc2lkZWJhcnVcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmdzaWRlYmFyKFwib3B0aW9uXCIsIFwicmlnaHRcIiwgeyB1c2VyU2V0dGluZ3M6IHRoaXMudXNlclNldHRpbmdzISwgd2lkdGg6IDUwMCwgdmlzaWJsZTogdHJ1ZSwgcGlubmVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKHRoaXMuZWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgdXNlU3VidGFzazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwYW5lbE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwOTdcIiwgLy9SQyAzMDI1MDA5NyA6IE7DoWhsZWQgZGV0YWlsdSBkYcWIb3bDqSBldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIHNpZGU6IFwicmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDk3XCIsIC8vUkMgMzAyNTAwOTcgOiBOw6FobGVkIGRldGFpbHUgZGHFiG92w6kgZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiAodGFiLCBkdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsbSA9ICQoXCI8ZGl2PlwiKS5nY29udGVudChHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRGFub3ZlRXZpZGVuY2UsIHsgcGFyZW50Q29udGVudDogdGhpcyB9KTsgLy9OdXRuZSBwcm8gc3ByYXZuZSBzcG9qZW5pIHMga29udGV4dGVtIGhsYXZuaWhvIGNvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHRhYlNldHRpbmdzID0gZHRvLnRhYlNldHRpbmdzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSBkdG8udGFiU2V0dGluZ3M7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudDxHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsRGFub3ZlRXZpZGVuY2U+KGVsbSkuaW5pdChkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0YWIpLmVtcHR5KCkuYXBwZW5kKGVsbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBLbC4gemtyYXRreVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiSU5TRVJUXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIsIC8vUkMgMzExMDAyMjYgOiBOYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiTG9hZERhdGFBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgLy8gICAga2V5OiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMTgxXCIsIC8vUkMgMzExMDAxODEgOiBWecSNaXN0aXRcclxuICAgICAgICAgICAgLy8gICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAvLyAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgLy8gICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImNsZWFyRmlsdGVyUm93QWN0XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyNjdcIiwgLy9SQyAzMTEwMDI2NyA6IFZ5xI1pc3RpdCBmaWx0ciBzZXpuYW11XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpY29uOiBcImdpLWJpblwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgfX0pLFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgIGtleTogXCIwXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjhcIiwgLy9SQyAzMTEwMDIyOCA6IFZ5xI1pc3RpdCBhIG5hxI3DrXN0XHJcbiAgICAgICAgICAgIC8vICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgLy8gICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJjbGVhckFuZEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcnVuOihldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgfX0pLFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcImN0cmwrc2hpZnQrbGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuR3JpZCxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjlcIiwgLy9SQyAzMTEwMDIyOSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1LlxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzZWxGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hGaWxsU2VydmVyR3JpZEV2ZW50KGV2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSB9KSxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcImN0cmwrbGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuR3JpZCxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMzVcIiwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlbEZpbHRlckFuZFNlYXJjaEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRBY3Rpb25zKDApO1xyXG5cclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIHZpZGl0ZWxueWNoIHNsb3VwY3VcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy4kZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvU2V6bmFtRHBoRmlsdGVyRHRvPihcInVzZVByb2ZpbGVcIiwgeyBuYW1lOiB0aGF0LnByb2ZpbE5hbWUsIGNvbHVtbkxpc3Q6IHRoYXQuZ2V0Q29sc0J5Um96cGFkKHRoYXQuZ2V0Um96cGFkKCkpICsgXCJyYWRla19kcGgsbmF6ZXYsY19ha3RfMixjX2FrdF8xLGNfYWt0XzMsY19ha3RfNFwiIH0pO1xyXG4gICAgICAgICAgICAvLy8vIG5hc3RhdmVuaSBob2Rub3QgdXVzLCBwb2t1ZCBqZSBSZXppbSBEUEggPSB1dXMsIHBhayBqZSBwcm9ibGVtIGEgbmljIHNlIG5lb3picmF6aVxyXG4gICAgICAgICAgICAvL2lmICh0aGF0Lkdsb2JhbHMuUGFyYW1zPy5SZXppbURQSCA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1EcGguVXVzKVxyXG4gICAgICAgICAgICAvLyAgICB0aGF0LmZpbmRGaWVsZHMoXCJ1dXNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyB1dXM6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlVVUyB9KTtcclxuICAgICAgICAgICAgLy90aGlzLnNldFZpc2libGVDb2x1bW5zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBncmlkdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuXCIgKyB0aGlzLmNsYXNzR3JpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2RzdHJhbmVuaSByYWRrdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBEZWxldGVSb3dzKHJvd3M6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkbXBhRHRvW10pOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgbXNnID0gXCJqcmVzOjMwMjUwMzE4XCI7IC8vUkMgMzAyNTAzMTggOiBPcHJhdmR1IGNoY2V0ZSB2eW1hemF0IG96bmHEjWVuw70gxZnDoWRlaz9cclxuICAgICAgICAgICAgaWYgKHJvd3MubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgICAgIG1zZyA9IFwianJlczozMDI1MDMxOVwiOyAvL1JDIDMwMjUwMzE5IDogT3ByYXZkdSBjaGNldGUgdnltYXphdCBvem5hxI1lbsOpIMWZw6Fka3k/XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShtc2cpIFxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCBvYmo6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmogPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVWNyS29uc29saWRhY2VUcmFuc2Zvcm1hY2UuaHJvbWFkbmVPZHN0cmFuaXQoeyBycTogcm93cyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwMzIwXCIsIHN0YXRlOiBcInN1Y2Nlc3NcIiB9KTsgLy9SQyAzMDI1MDMyMCA6IFZ5bWF6w6Fuw60gw7pzcMSbxaFuxJsgcHJvdmVkZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabm92dW5hY3RlbmkgZGF0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHJlZnJlc2goKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoYXQubG9hZGluZ0RhdGEpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByZXZlZGVuaSBrbGlrdSBuYSBidW5rdSBkbyBmaWx0cnUgYSBuYWN0ZW5pXHJcbiAgICAgICAgICogQHBhcmFtIGV2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXY6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciAkY29sID0gJChldi50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFldi5jdHJsS2V5IHx8ICEkY29sLmhhc0NsYXNzKFwiY2VsbFwiKSB8fCAkY29sLmhhc0NsYXNzKFwianMtY2Z1LWNlbGxcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChldi5zaGlmdEtleSAmJiBzZWxlY3Rpb24pIHNlbGVjdGlvbi5lbXB0eSgpOyAvL1Bva3VkIHNlIHZ5YmlyYSBwcmVzIGtsLiB6a3JhdGt1IGN0cmwrc2hpZnQrbGNsaWNrLCB0YWsgYXQgc2UgbmVvem5hY3VqZSB0ZXh0XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sSW5kZXggPSAkY29sLmF0dHIoXCJkYXRhLWNvbHVtbi1pbmRleFwiKSE7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGNvbERlZiA9IGdyaWQuZ2dyaWQoXCJ0cnVlQ29sdW1uc1wiLCBmYWxzZSlbY29sSW5kZXhdIGFzIEdHcmlkQ29sdW1uO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbERlZi5zZXJ2ZXJGaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogYW55ID0gJGNvbC50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuOyAvL05PVEU6IFBva3VkIG5lbmkgaG9kbm90YSwgdGFrIGFzaSBuZW5pIGNvIHJlc2l0LiBSZXNpIGhsYXZuZSBidWcgcyB0ZXh0b3ZvdSBob2Rub3RvdSB2IGNpc2VsbnljaCBzbG91cGNpY2hcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsID0gZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiLCBmYWxzZSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy9OT1RFOiBUb2hsZSBqZSBzcGF0bnkgenB1c29iLCBjZWxlIGJ5IHRvIGNodGVsbyBwcmVwc2F0LCBhYnkgc2UgbmVzbG8gcG8gc3RyaW5ndSB6IGJ1bmt5LCBhbGUgcG8gZGF0ZWNoLiBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgUG9wdGF0IHNlIFNrYWxpY2UsIGplc3RsaSBleGl0dWplIG5lamFreSBsZXBzaSB6cHVzb2IuLi5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbERlZi5jb2x1bW5UeXBlID09PSBcImRhdGV0aW1lXCIpIHZhbHVlID0gc2VsW2NvbERlZi5uYW1lIV07XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2xEZWYuY29sdW1uVHlwZSA9PT0gXCJjdXJyZW5jeVwiKSB2YWx1ZSA9IHNlbFtjb2xEZWYubmFtZSFdO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgJGZpbHRlckZybUJveCA9IGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJmaW5kRmllbGRzXCIsIGNvbERlZi5uYW1lISk7XHJcbiAgICAgICAgICAgICAgICAkZmlsdGVyRnJtQm94LmdmaWVsZChcInNldFZhbHVlXCIsIHZhbHVlLCB7IHZhbGlkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIGRldGFpbHUgdWthemF0ZWxlXHJcbiAgICAgICAgICogQHBhcmFtIHJhZGVrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93RGV0YWlsKHJhZGVrOiBVY3QuSW50ZXJmYWNlLkdVY3RkbXBhRHRvLCB2aWV3TW9kZTogYm9vbGVhbj10cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy96b2JyYXplbmkgZGV0YWlsdVxyXG4gICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbFRyYW5zZm9ybWFjbmlQcmVkcGlzXCIsIHsgY3VycmVudFJvdzogcmFkZWssIHZpZXdNb2RlOiB2aWV3TW9kZSB9LCB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU9uRXNjYXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMucmV0dXJuVmFsdWUgJiYgcmVzLnJldHVyblZhbHVlLnJlZnJlc2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwcmF2YSB2aWRpdGVsbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRBY3Rpb25zKHBvY2V0UmFka3U6IG51bWJlcikge1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBuZW5pIGdyaWQsIG5pYyBuZWRlbGVqXHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkICkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgZGF0YUZvdW5kID0gcG9jZXRSYWRrdSA+IDA7XHJcbiAgICAgICAgICAgIHZhciB0b29sdGlwID0gZGF0YUZvdW5kID8gXCJcIiA6IFwianJlczozMDI1MDE3NFwiOyAvL1JDIDMwMjUwMTc0IDogWsOhem5hbXkgbmVuYWxlemVueVxyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZSA9IEdsb2JhbHMuR1Vjckdsb2JhbHMuUmFkX0tvbnNvbGlkYWNlID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyWm9icmF6ZW5pVmR1LkFub0VkaXRhY2U7XHJcbiAgICAgICAgICAgIC8vaWYgKGRhdGFGb3VuZClcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmVkaXRvdmF0QWN0IS51cGRhdGVQZXJtaXNzaW9uKHRoaXMuZWRpdG92YXRQZXJtaXQpO1xyXG4gICAgICAgICAgICAvL2Vsc2VcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmVkaXRvdmF0QWN0IS51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Tm92eSEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHZpc2libGUsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB2aXNpYmxlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0T3ByYXZhIS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogdG9vbHRpcCxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGRhdGFGb3VuZCAmJiB2aXNpYmxlLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogdmlzaWJsZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEtvcGllUmFka3UhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiB0b29sdGlwLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZGF0YUZvdW5kICYmIHZpc2libGUsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB2aXNpYmxlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0T2RzdHJhbml0IS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogdG9vbHRpcCxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGRhdGFGb3VuZCAmJiB2aXNpYmxlLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogdmlzaWJsZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIE5hY3RlbmkgZGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRGF0YSgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlVjcktvbnNvbGlkYWNlVHJhbnNmb3JtYWNlLmxpc3QoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hdC5zZXRBY3Rpb25zKHJlc3VsdC5MaXN0VmFsdWVzPy5sZW5ndGggYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRBY3Rpb25zKHJlc3VsdC5kYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7fSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkZm9ybWF0dSBkbGUgcHJlZGxvaHlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gY29sRGVmaW5pdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RkbXBhRHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBteUdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0ZG1wYUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidWVjXzFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDMwMFwiLCAvL1JDIDMwMjUwMzAwIDogT2tydWhcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkcmRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MiBcIiwgLy9SQyAzMTEwMDA1MiA6IEhcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgLy90b29sdGlwVGVtcGxhdGU6IFwianJlczozMTEwMDEwMlwiLCAvL1JDIDMxMTAwMTAyIDogRHJ1aCBkb2tsYWR1IChEUkQpXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNfMFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU0XCIsIC8vUkMgMzExMDAwNTQgOiBEb2tsYWRcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJtZF9kYWxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDMwMlwiLCAvL1JDIDMwMjUwMzAyIDogU3RyXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMzAxXCIgLy9SQyAzMDI1MDMwMSA6IFN0cmFuYSAwLWJleiByb3psacWhZW7DrTsgMS1NRCwgMi1EYWxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMDNcIiwgLy9SQyAzMDI1MDMwMyA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc18wXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uTmtzLFxyXG4gICAgICAgICAgICAgICAgLy9kZXNjcmlwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LiB0aGlzLnRleHR5Lk5rcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInVjc18wXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVWNzLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ1Y3NcIiksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInV1c18wXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5UZXh0eT8uVXVzLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gTW9kaWZpa292YW5lIFN1IGEgQXVcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1vZGlmeUNmdS5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gdGhpcy5tb2RpZnlDZnUuY29sdW1uc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7Yy5uYW1lfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogYy5jYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmNmdUludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Z1OiBjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1JvejogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVWN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYCR7Yy5uYW1lfWBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbXlHcmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==