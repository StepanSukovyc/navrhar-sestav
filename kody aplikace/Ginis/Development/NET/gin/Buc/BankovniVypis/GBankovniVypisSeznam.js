"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GBankovniVypisSeznam.ts                </Name>
//    <Description> Seznam bankovních výpisů                                    </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-09-19                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            /** Seznam bankovních výpisů */
            let GBankovniVypisSeznam = class GBankovniVypisSeznam extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    this.createActions();
                    this.createMenuBar();
                    // flash se stavem knihy
                    Gordic.Eko.Utils.ShowEkoBookStateFlash(this);
                    // inicializace dokumentu
                    this.beginOperation();
                    WebClient.BucGrid.dokumentInit().then((dokumentParams) => {
                        // uložení parametrů dokumentu pro další použití
                        that.DokumentParams = dokumentParams;
                        this.createFilterPanel();
                        this.createGrid();
                    }).always(() => { that.endOperation(); });
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actPodat: Gordic.Eko.Action.actionPodat({
                            run: function (ev, ctx) {
                                this.setPending(that.podani());
                            }
                        }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            run: function (ev, ctx) {
                                this.setPending(that.detail());
                            }
                        }),
                        actNacist: {
                            caption: "jres:33600800", //RC 33600800 : Načíst
                            tooltip: "jres:33600801", //RC 33600801 : Načtení elektronického výpisu
                            permission: this.Permissions?.LzeNacist,
                            run: function (ev, ctx) {
                                this.setPending(that.nacist());
                            }
                        },
                        actPreevidovat: Gordic.Eko.Action.actionPreevidovat({
                            run: function () { this.setPending(that.dialogs.error("TODO").createDialogPromise()); }
                        }),
                        //TODO: přesunout do nástrojů (domluva 1.10.2024)
                        //actAutParovat: {
                        //    caption: "jres:33600002", //RC 33600002 : Aut. párovat
                        //    tooltip: "jres:33600003", //RC 33600003 : Automatické párování nespárovaných výpisů
                        //    enabled: false,
                        //    run: function (ev, ctx) {
                        //        this.setPending(that.dialogs.error("TODO").createDialogPromise());
                        //    }
                        //},
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tema: "buc_ptm_sezvyp",
                            ixsStr: that.dbparams.buc_ptm_sezvyp,
                            serverParameterMethod: "Gordic.Buc.WebClient.GBankovniVypisSeznam:PrintParameters",
                            reportStarting: function (rep) {
                                if (Gordic.Utils.WidgetExists("gfilterpanel", that.$filterForm)) {
                                    // aktuální filtry (+ filtry pro knihy) pro předání do C# metody
                                    rep.customDto = that.$filterForm.gfilterpanel("getConfirmedData");
                                    if (that.ekoBookFilter?.ixp_den)
                                        $.extend(rep.customDto, { ixp_den: that.ekoBookFilter.ixp_den });
                                    if (that.ekoBookFilter?.rok)
                                        $.extend(rep.customDto, { rok_den: that.ekoBookFilter.rok });
                                }
                            }
                        }),
                        actPridatDoPorovnani: Gordic.Eko.Action.actionPridatDoPorovnani({
                            run: function () { WebClient.BucGrid.Comparator.add(that); }
                        }),
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actPodat*", "actDetail*!", "actNacist*", "actPreevidovat*", "actTisk*", "actPridatDoPorovnani"]));
                }
                /** Vytvoření filterpanelu */
                createFilterPanel() {
                    const that = this;
                    const filterFormDef = new Gordic.Forms.Form({ tabLabel: "jres:33600005" }) //RC 33600005 : Filtr bankovních výpisů
                        .addSection("jres:33600004") //RC 33600004 : Základní údaje
                        .addRow("jres:33600006") //RC 33600006 : Účet vlastní
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                        name: "ucet_vl",
                        model: "model.bu_vl=value.bu_vl;model.sk_vl=value.sk_vl;model.rok=value.rok",
                        serverFilters: {
                            pristupKBU: 1, //čistě příznak, zda řešit
                            urovenPristupuKBU: 1, //čistě příznak, zda řešit
                            rezimVyberuDleKnihy: 0
                        },
                        multi: true
                    })
                        .addRow("jres:33600007") //RC 33600007 : Identifikátor
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp"
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "Datum nového zůstatku od-do",
                        name: "dat_nov_zus"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:33600008", //RC 33600008 : Datum starého zůstatku od-do
                        name: "dat_str_zus"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "jres:33600009", //RC 33600009 : Číslo výpisu od-do
                        name: "cis_pid"
                    }))
                        .addRow({ label: "jres:33600010", hint: "jres:33600011" }) //RC 33600011 : Včetně stornovaných výpisů
                        .addField("gcheck", {
                        name: "stornovane"
                    })
                        .addRow({ label: "jres:33600012", hint: "jres:33600013" }) //RC 33600013 : Pouze výpisy ve stavu Podáno
                        .addField("gcheck", {
                        name: "pouze_podane",
                        modelValueTransform: {
                            apply: function (modelValue) { return modelValue === 1; },
                            collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                        },
                        change: (ev, ctx) => {
                            if (ctx.value) {
                                that.findFields("ucet_vl,stornovane").gfield("disable").gfield("clear");
                            }
                            else {
                                that.findFields("ucet_vl,stornovane").gfield("enable");
                            }
                        }
                    });
                    //.addPrefab(Gordic.Eko.Filters.prefabAgEvCislo());
                    let filterParams = Gordic.Eko.Filters.getFilterParams([filterFormDef], ["ucet_vl", "stornovane"], "buc_ptm_bvy", //TODO: asi?
                    /*"ixs_fun_akt"*/ void 0, 
                    //(ev, ctx) => {
                    //    let filters = ctx.filter as any;
                    //    if (!filters.stornovane) { filters.s_bvy = { o: "!=", v: Gordic.Buc.Globals.Enums.SBvy.Stornovan } }
                    //    delete (ctx.filter as any).stornovane;
                    //},
                    void 0, null, false, that);
                    filterParams.filterViewMode = FilterViewMode.Normal;
                    filterParams.poVyhledaniZobrazit = "OblibenePodminky";
                    filterParams.collectData = (ev, ctx) => {
                        if (!ctx.data.stornovane) {
                            ctx.data.s_bvy = { o: "!=", v: Gordic.Buc.Globals.Enums.SBvy.Stornovan };
                        }
                        delete ctx.data.stornovane;
                        if (ctx.data.rok) {
                            delete ctx.data.rok;
                        }
                    };
                    that.$filterForm = $.newDiv().appendTo(that.element)
                        .gfilterpanel(filterParams);
                }
                /** Vytvoření gridu a view */
                createGrid() {
                    const that = this;
                    that.view = new Gordic.Isl.View(that.isl.BucBankovniVypis.list(), {
                        filterPanel: that.$filterForm,
                        key: that.PrimaryKey,
                        startEmpty: true
                    });
                    // grid
                    $.newDiv("SeznamBuc")
                        .css("height", "100%")
                        .appendTo(that.element)
                        .ggrid(WebClient.BucGrid.BankovniVypis.getGridOptions(that, undefined, //gridFormat,
                    that.actions.actDetail, function (ev, obj) {
                        // aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                        if (that.previewController) {
                            if (obj != null && obj.cellInfo != null && obj.cellInfo.data != null) {
                                // TODO: pokud by bylo potřeba řešit nastavení okna po přesunu po gridu, tak to odkomentovat, ale práva záznamová práva se aktuálně neřeší
                                //that.enable();
                                that.previewController.enable(true);
                                that.previewController.show(obj.cellInfo.data);
                            }
                            else {
                                // TODO: může tohle vůbec nastat?
                                that.previewController.enable(false);
                            }
                        }
                    }, (cellContext) => WebClient.BucGrid.getContextMenuParams(cellContext, (cellContext) => that.actions.createBar(["actPodat", "actDetail", "actPridatDoPorovnani"])), 
                    // TODO: přidat data do metod getGridOptions? asi ano, protože view budu předávat všude
                    { data: that.view }))
                        .ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        // dlouhý seznam
                        longListAllowed: true,
                        longListCountMethod: (rq) => that.isl.BucBankovniVypis.listCount(rq).get(),
                        longListModifyRqMethod: (rq) => WebClient.BucGrid.modifyListRequest(that, rq)
                    })
                        .ggridrowscalc()
                        .gautofit();
                    // obsluha změny v gridu
                    that.view.on("change", function (ev, ctx) {
                        that.enable();
                    });
                    // náhled v pravém bočním panelu
                    that.element.gsidebar("option", { right: { width: 200, visible: false, leafsAutoHide: false } });
                    let previewPanelsDefinition = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                viewId: "buc:BankovniVypisPreview"
                            }),
                            Gordic.Previews.getFilePreviewTab({
                                ixpProvider: function (loadParams) { return loadParams.ixp; }
                            })
                        ]
                    };
                    that.previewController = new Gordic.Previews.GPreviewController(that.element, previewPanelsDefinition);
                    // porovnání
                    WebClient.BucGrid.Comparator.create(this);
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // jsou nějaké řádky?
                    const isEmpty = !(this.view.getCount("data") > 0);
                    // akce seznamu
                    const permEmptyGrid = WebClient.BucGrid.getEmptyGridPermission();
                    const acts = this.actions;
                    const perms = this.Permissions;
                    acts.actPodat.updatePermission(perms?.LzePodat);
                    acts.actDetail.updatePermission(isEmpty ? permEmptyGrid : { value: true });
                    acts.actPridatDoPorovnani.updatePermission(isEmpty ? permEmptyGrid : { value: true });
                    acts.actTisk.updatePermission(isEmpty ? permEmptyGrid : { value: true });
                    acts.actPreevidovat.updatePermission(isEmpty ? permEmptyGrid : perms?.LzePreevidovat);
                }
                /**
                 * Podání dokladu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                podani() {
                    // otevření prázdného detailu - vyvolá se podání
                    return this.openDetail(this);
                }
                /**
                 * Zobrazení detailu dokladu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detail() {
                    // aktuální vybraná položka
                    const aktRadek = Gordic.Eko.Grid.currentRow(this.element.find(".SeznamBuc.ggrid"));
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        // otevření detailu aktuální vybrané položky
                        return this.openDetail(this, aktRadek);
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Zobrazení detailu existujícího nebo podání nového dokladu
                 *
                 * @param {GContent} content content
                 * @param {Interface.GBankovniVypisDto} [row] aktuální řádek (pro zobrazení detailu) nebo nevyplněno (pro podání)
                 * @param {BucGrid.openDetailWizardParams} [wizard] parametry průvodce (v případě volání detailu z průvodce)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                openDetail(content, row, wizard) {
                    let that = this;
                    // zásobník změněných záznamů
                    let changedRows = [];
                    // GPC s knihou z aktuálního záznamu
                    const newGpc = (row ? Gordic.Eko.Utils.createBookGpc(content.gpc, row.ixp_den) : content.gpc);
                    // TODO: po dořešení knih smazat použití proměnných IxpDen, SubradaDen a AktSubradyDen
                    let $detailWindow = content.navigate(["Gordic.Buc.WebClient.GBankovniVypisDetail", { uid: "GBankovniVypisDetail", gpc: newGpc, gridRemoteControl: new Gordic.Components.GridRC(wizard?.grid ?? that.element.find(".SeznamBuc.ggrid")) }], {
                        /*ID: detailID + '#',*/
                        Ixp: row?.ixp,
                        IxpDen: row?.ixp_den ?? that.getIxpDen(),
                    });
                    // TODO: otestovat, jestli dobře funguje aktualizace obou seznamů a nastavení activeRow a fokusu
                    // obsluha aktivní operace na detailu
                    $.content($detailWindow).on(WebClient.BucDetail.triggerChange, (retVal) => {
                        if (retVal?.data?.ixp) {
                            // přidání do seznamu záznamů k občerstvení
                            if (changedRows.indexOf(retVal.data.ixp) < 0)
                                changedRows.push(retVal.data.ixp);
                        }
                    });
                    //obsluha ukončení okna
                    $detailWindow.on("closed", (retVal) => {
                        // nastavení fokusu (jen pokud není průvodce)
                        if (!wizard)
                            that.element.find(".SeznamBuc.ggrid").ggrid("focus");
                        // aktualizace změněných záznamů (v hlavním seznamu i případně v průvodci)
                        if (changedRows?.length > 0) {
                            // nastavení aktivní operace
                            //if (wizard?.setActiveOperation && typeof (wizard.setActiveOperation) === "function") {
                            //    wizard.setActiveOperation();
                            //}
                            // aktualizace základního gridu
                            that.view.requestData({ filters: { ixp: changedRows } }, { updateMode: "update" })
                                .done(function () {
                                // nastavení aktuálního řádku
                                if (retVal?.returnValue?.ixp) {
                                    that.element.find(".SeznamBuc.ggrid").ggrid("activeRow", { ixp: retVal?.returnValue?.ixp });
                                }
                                //// v případě průvodce i aktualizace gridu v průvodci
                                //if (wizard) {
                                //    SmlWizard.reloadRows((rq) => { return that.isl.DokladSml.list(rq); }, { ixp: changedRows }, wizard.grid)
                                //        .then(function () {
                                //            if (wizard && wizard.refreshAndCheckDataAction != undefined && typeof (wizard.refreshAndCheckDataAction) === "function") {
                                //                return wizard.refreshAndCheckDataAction();
                                //            }
                                //        });
                                //}
                            });
                        }
                    });
                    return $detailWindow.createDialogPromise();
                }
                /**
                 * Vrátí PID aktuální knihy (nebo null pokud není zadána nebo se jde o režim přes více knih)
                 *
                 * @returns {string | null} PID aktuální knihy (nebo null pokud není zadána nebo se jde o režim přes více knih)
                 */
                getIxpDen() {
                    // TODO: zůstane tato metoda?
                    if (Gordic.Eko.Utils.getEkoBookVariant(this) === 1 /* Eko.Interface.GEkoBookVariant.One */)
                        return this.ekoBook?.ixp_den || null;
                    else
                        return null;
                }
                /** Volání načtení elektronického bankovního výpisu*/
                nacist() {
                    return this.navigate(['Gordic.Buc.WebClient.GNacteniElVypisu', { taskId: 'actNacteniElVypisu', uid: 'NacteniElVypisu#' }], {}).createDialogPromise().then(() => {
                        this.view.requestData();
                    });
                }
            };
            GBankovniVypisSeznam = __decorate([
                Decorators.gcontent
            ], GBankovniVypisSeznam);
            WebClient.GBankovniVypisSeznam = GBankovniVypisSeznam;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Jhbmtvdm5pVnlwaXNTZXpuYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHQmFua292bmlWeXBpc1Nlem5hbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQWdZZjtBQWhZRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FnWW5CO0lBaFlnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FnWTdCO1FBaFlvQixXQUFBLFNBQVM7WUFDMUIsK0JBQStCO1lBRS9CLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsT0FBQSxZQUE4SjtnQkFTN0wsY0FBYztvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsd0JBQXdCO29CQUN4QixPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RDLHlCQUF5QjtvQkFDekIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN0QixVQUFBLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTt3QkFDM0MsZ0RBQWdEO3dCQUNoRCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQzt3QkFFckMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdEIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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aEMsQ0FBQTtRQUNMLENBQUMsRUFoWW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWdZN0I7SUFBRCxDQUFDLEVBaFlnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFnWW5CO0FBQUQsQ0FBQyxFQWhZUyxNQUFNLEtBQU4sTUFBTSxRQWdZZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkJ1Yy5XZWJDbGllbnQuR0Jhbmtvdm5pVnlwaXNTZXpuYW0udHMgICAgICAgICAgICAgICAgPC9OYW1lPlxuLy8gICAgPERlc2NyaXB0aW9uPiBTZXpuYW0gYmFua292bsOtY2ggdsO9cGlzxa8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI0LTA5LTE5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XG4vLyAgPC9GaWxlSGVhZGVyPlxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqIFNlem5hbSBiYW5rb3Zuw61jaCB2w71waXPFryAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHQmFua292bmlWeXBpc1Nlem5hbSBleHRlbmRzIEdDb250ZW50QmFzZTxCdWNHcmlkLklHU3RhbmRhcmRCdWNHcmlkPEJ1Yy5JbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNEdG8sIEJ1Yy5JbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNTZXJ2aWNlUGVybWlzc2lvbnM+ICYgR29yZGljLkVrby5VdGlscy5JR0Vrb0Jvb2tFeHRlbnNpb24+IHtcclxuXHJcbiAgICAgICAgLy9Db250ZW50VmFsdWVzXHJcbiAgICAgICAgLyoqIERhdGFiw6F6b3bDqSBwYXJhbWV0cnkgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGRicGFyYW1zOiB7XHJcbiAgICAgICAgICAgIC8qKkJVQyAtIFRUIFNlem5hbSBiYW5rb3Zuw61jaCB2w71waXPFryovXHJcbiAgICAgICAgICAgIGJ1Y19wdG1fc2V6dnlwOiBzdHJpbmdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIC8vIGZsYXNoIHNlIHN0YXZlbSBrbmloeVxyXG4gICAgICAgICAgICBFa28uVXRpbHMuU2hvd0Vrb0Jvb2tTdGF0ZUZsYXNoKHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBpbmljaWFsaXphY2UgZG9rdW1lbnR1XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgQnVjR3JpZC5kb2t1bWVudEluaXQoKS50aGVuKChkb2t1bWVudFBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdWxvxb5lbsOtIHBhcmFtZXRyxa8gZG9rdW1lbnR1IHBybyBkYWzFocOtIHBvdcW+aXTDrVxyXG4gICAgICAgICAgICAgICAgdGhhdC5Eb2t1bWVudFBhcmFtcyA9IGRva3VtZW50UGFyYW1zO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyUGFuZWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RQb2RhdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUG9kYXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQucG9kYW5pKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGV0YWlsKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0TmFjaXN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwODAwXCIsIC8vUkMgMzM2MDA4MDAgOiBOYcSNw61zdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDgwMVwiLCAvL1JDIDMzNjAwODAxIDogTmHEjXRlbsOtIGVsZWt0cm9uaWNrw6lobyB2w71waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5QZXJtaXNzaW9ucz8uTHplTmFjaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQubmFjaXN0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQcmVldmlkb3ZhdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUHJlZXZpZG92YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5kaWFsb2dzLmVycm9yKFwiVE9ET1wiKS5jcmVhdGVEaWFsb2dQcm9taXNlKCkpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogcMWZZXN1bm91dCBkbyBuw6FzdHJvasWvIChkb21sdXZhIDEuMTAuMjAyNClcclxuICAgICAgICAgICAgICAgIC8vYWN0QXV0UGFyb3ZhdDoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDAyXCIsIC8vUkMgMzM2MDAwMDIgOiBBdXQuIHDDoXJvdmF0XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0b29sdGlwOiBcImpyZXM6MzM2MDAwMDNcIiwgLy9SQyAzMzYwMDAwMyA6IEF1dG9tYXRpY2vDqSBww6Fyb3bDoW7DrSBuZXNww6Fyb3ZhbsO9Y2ggdsO9cGlzxa9cclxuICAgICAgICAgICAgICAgIC8vICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmRpYWxvZ3MuZXJyb3IoXCJUT0RPXCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImJ1Y19wdG1fc2V6dnlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzU3RyOiB0aGF0LmRicGFyYW1zLmJ1Y19wdG1fc2V6dnlwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HQmFua292bmlWeXBpc1Nlem5hbTpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmaWx0ZXJwYW5lbFwiLCB0aGF0LiRmaWx0ZXJGb3JtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSBmaWx0cnkgKCsgZmlsdHJ5IHBybyBrbmloeSkgcHJvIHDFmWVkw6Fuw60gZG8gQyMgbWV0b2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0gdGhhdC4kZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZWtvQm9va0ZpbHRlcj8uaXhwX2RlbikgJC5leHRlbmQocmVwLmN1c3RvbUR0bywgeyBpeHBfZGVuOiB0aGF0LmVrb0Jvb2tGaWx0ZXIuaXhwX2RlbiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmVrb0Jvb2tGaWx0ZXI/LnJvaykgJC5leHRlbmQocmVwLmN1c3RvbUR0bywgeyByb2tfZGVuOiB0aGF0LmVrb0Jvb2tGaWx0ZXIucm9rIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RQcmlkYXREb1Bvcm92bmFuaTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUHJpZGF0RG9Qb3Jvdm5hbmkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyBCdWNHcmlkLkNvbXBhcmF0b3IuYWRkKHRoYXQpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gbWVudWJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFBvZGF0KlwiLCBcImFjdERldGFpbCohXCIsIFwiYWN0TmFjaXN0KlwiLCBcImFjdFByZWV2aWRvdmF0KlwiLCBcImFjdFRpc2sqXCIsIFwiYWN0UHJpZGF0RG9Qb3Jvdm5hbmlcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBmaWx0ZXJwYW5lbHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlclBhbmVsKCkgeyBcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjMzNjAwMDA1XCIgfSkgLy9SQyAzMzYwMDAwNSA6IEZpbHRyIGJhbmtvdm7DrWNoIHbDvXBpc8WvXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzM2MDAwMDRcIikgLy9SQyAzMzYwMDAwNCA6IFrDoWtsYWRuw60gw7pkYWplXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDAwNlwiKSAvL1JDIDMzNjAwMDA2IDogw5rEjWV0IHZsYXN0bsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXZsKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjZXRfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5idV92bD12YWx1ZS5idV92bDttb2RlbC5za192bD12YWx1ZS5za192bDttb2RlbC5yb2s9dmFsdWUucm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmlzdHVwS0JVOiAxLCAvL8SNaXN0xJsgcMWZw616bmFrLCB6ZGEgxZllxaFpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cm92ZW5QcmlzdHVwdUtCVTogMSwgLy/EjWlzdMSbIHDFmcOtem5haywgemRhIMWZZcWhaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV6aW1WeWJlcnVEbGVLbmloeTogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDAwN1wiKSAvL1JDIDMzNjAwMDA3IDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLml4cyh0cnVlKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGF0dW0gbm92w6lobyB6xa9zdGF0a3Ugb2QtZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9ub3ZfenVzXCJcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAwMDhcIiwgLy9SQyAzMzYwMDAwOCA6IERhdHVtIHN0YXLDqWhvIHrFr3N0YXRrdSBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3N0cl96dXNcIlxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNjAwMDA5XCIsIC8vUkMgMzM2MDAwMDkgOiDEjMOtc2xvIHbDvXBpc3Ugb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19waWRcIlxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMzYwMDAxMFwiLCBoaW50OiBcImpyZXM6MzM2MDAwMTFcIiB9KSAvL1JDIDMzNjAwMDExIDogVsSNZXRuxJsgc3Rvcm5vdmFuw71jaCB2w71waXPFr1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0b3Jub3ZhbmVcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMzNjAwMDEyXCIsIGhpbnQ6IFwianJlczozMzYwMDAxM1wiIH0pIC8vUkMgMzM2MDAwMTMgOiBQb3V6ZSB2w71waXN5IHZlIHN0YXZ1IFBvZMOhbm9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3V6ZV9wb2RhbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gbW9kZWxWYWx1ZSA9PT0gMTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdDogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHsgcmV0dXJuIGZpZWxkVmFsdWUgPT09IHRydWUgPyAxIDogMDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ1Y2V0X3ZsLHN0b3Jub3ZhbmVcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKS5nZmllbGQoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInVjZXRfdmwsc3Rvcm5vdmFuZVwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUHJlZmFiKEdvcmRpYy5Fa28uRmlsdGVycy5wcmVmYWJBZ0V2Q2lzbG8oKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmlsdGVyUGFyYW1zID0gR29yZGljLkVrby5GaWx0ZXJzLmdldEZpbHRlclBhcmFtczxJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNGaWx0ZXI+KFxyXG4gICAgICAgICAgICAgICAgW2ZpbHRlckZvcm1EZWZdLFxyXG4gICAgICAgICAgICAgICAgW1widWNldF92bFwiLCBcInN0b3Jub3ZhbmVcIl0sXHJcbiAgICAgICAgICAgICAgICBcImJ1Y19wdG1fYnZ5XCIsIC8vVE9ETzogYXNpP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlwiaXhzX2Z1bl9ha3RcIiovdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgLy8oZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbGV0IGZpbHRlcnMgPSBjdHguZmlsdGVyIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmICghZmlsdGVycy5zdG9ybm92YW5lKSB7IGZpbHRlcnMuc19idnkgPSB7IG86IFwiIT1cIiwgdjogR29yZGljLkJ1Yy5HbG9iYWxzLkVudW1zLlNCdnkuU3Rvcm5vdmFuIH0gfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVsZXRlIChjdHguZmlsdGVyIGFzIGFueSkuc3Rvcm5vdmFuZTtcclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIHZvaWQgMCxcclxuICAgICAgICAgICAgICAgIG51bGwgYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0aGF0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGZpbHRlclBhcmFtcy5maWx0ZXJWaWV3TW9kZSA9IEZpbHRlclZpZXdNb2RlLk5vcm1hbDtcclxuICAgICAgICAgICAgZmlsdGVyUGFyYW1zLnBvVnlobGVkYW5pWm9icmF6aXQgPSBcIk9ibGliZW5lUG9kbWlua3lcIjtcclxuICAgICAgICAgICAgZmlsdGVyUGFyYW1zLmNvbGxlY3REYXRhID0gKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghY3R4LmRhdGEuc3Rvcm5vdmFuZSkgeyBjdHguZGF0YS5zX2J2eSA9IHsgbzogXCIhPVwiLCB2OiBHb3JkaWMuQnVjLkdsb2JhbHMuRW51bXMuU0J2eS5TdG9ybm92YW4gfSB9XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgY3R4LmRhdGEuc3Rvcm5vdmFuZTtcclxuICAgICAgICAgICAgICAgIGlmIChjdHguZGF0YS5yb2spIHsgZGVsZXRlIGN0eC5kYXRhLnJvazsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuJGZpbHRlckZvcm0gPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoZmlsdGVyUGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBncmlkdSBhIHZpZXcgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQnVjLkludGVyZmFjZS5HQmFua292bmlWeXBpc0R0bz4oXHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5CdWNCYW5rb3ZuaVZ5cGlzLmxpc3QoKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhhdC4kZmlsdGVyRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IHRoYXQuUHJpbWFyeUtleSxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdyaWRcclxuICAgICAgICAgICAgJC5uZXdEaXYoXCJTZXpuYW1CdWNcIilcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEludGVyZmFjZS5HQmFua292bmlWeXBpc0R0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgQnVjR3JpZC5CYW5rb3ZuaVZ5cGlzLmdldEdyaWRPcHRpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsLy9ncmlkRm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2Ugc3RhdnUgb2tuYSBhIG7DoWhsZWR1IHBvZGxlIGFrdHXDoWxuxJsgdnlicmFuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnByZXZpZXdDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiAhPSBudWxsICYmIG9iai5jZWxsSW5mbyAhPSBudWxsICYmIG9iai5jZWxsSW5mby5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcG9rdWQgYnkgYnlsbyBwb3TFmWViYSDFmWXFoWl0IG5hc3RhdmVuw60gb2tuYSBwbyBwxZllc3VudSBwbyBncmlkdSwgdGFrIHRvIG9ka29tZW50b3ZhdCwgYWxlIHByw6F2YSB6w6F6bmFtb3bDoSBwcsOhdmEgc2UgYWt0dcOhbG7EmyBuZcWZZcWhw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KG9iai5jZWxsSW5mby5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG3Fr8W+ZSB0b2hsZSB2xa9iZWMgbmFzdGF0P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2VsbENvbnRleHQpID0+IEJ1Y0dyaWQuZ2V0Q29udGV4dE1lbnVQYXJhbXMoY2VsbENvbnRleHQsIChjZWxsQ29udGV4dCkgPT4gdGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RQb2RhdFwiLCBcImFjdERldGFpbFwiLCBcImFjdFByaWRhdERvUG9yb3ZuYW5pXCJdKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHDFmWlkYXQgZGF0YSBkbyBtZXRvZCBnZXRHcmlkT3B0aW9ucz8gYXNpIGFubywgcHJvdG/FvmUgdmlldyBidWR1IHDFmWVkw6F2YXQgdsWhdWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgZGF0YTogdGhhdC52aWV3IH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRla28oe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvdcSNdG92w70gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRsb3Vow70gc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0Q291bnRNZXRob2Q6IChycSkgPT4gdGhhdC5pc2wuQnVjQmFua292bmlWeXBpcy5saXN0Q291bnQocnEpLmdldCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0TW9kaWZ5UnFNZXRob2Q6IChycSkgPT4gQnVjR3JpZC5tb2RpZnlMaXN0UmVxdWVzdCh0aGF0LCBycSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRyb3dzY2FsYygpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9ic2x1aGEgem3Em255IHYgZ3JpZHVcclxuICAgICAgICAgICAgdGhhdC52aWV3Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gbsOhaGxlZCB2IHByYXbDqW0gYm/EjW7DrW0gcGFuZWx1XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5nc2lkZWJhcihcIm9wdGlvblwiLCB7IHJpZ2h0OiB7IHdpZHRoOiAyMDAsIHZpc2libGU6IGZhbHNlLCBsZWFmc0F1dG9IaWRlOiBmYWxzZSB9IH0pO1xyXG4gICAgICAgICAgICBsZXQgcHJldmlld1BhbmVsc0RlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0lkOiBcImJ1YzpCYW5rb3ZuaVZ5cGlzUHJldmlld1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldEZpbGVQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwUHJvdmlkZXI6IGZ1bmN0aW9uIChsb2FkUGFyYW1zKSB7IHJldHVybiBsb2FkUGFyYW1zLml4cDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKHRoYXQuZWxlbWVudCwgcHJldmlld1BhbmVsc0RlZmluaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgLy8gcG9yb3Zuw6Fuw61cclxuICAgICAgICAgICAgQnVjR3JpZC5Db21wYXJhdG9yLmNyZWF0ZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcHJ2a8WvIHZlIGZvcm11bMOhxZlpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vIGpzb3UgbsSbamFrw6kgxZnDoWRreT9cclxuICAgICAgICAgICAgY29uc3QgaXNFbXB0eSA9ICEodGhpcy52aWV3LmdldENvdW50KFwiZGF0YVwiKSA+IDApO1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSBzZXpuYW11XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcm1FbXB0eUdyaWQgPSBCdWNHcmlkLmdldEVtcHR5R3JpZFBlcm1pc3Npb24oKTtcclxuICAgICAgICAgICAgY29uc3QgYWN0cyA9IHRoaXMuYWN0aW9ucztcclxuICAgICAgICAgICAgY29uc3QgcGVybXMgPSB0aGlzLlBlcm1pc3Npb25zO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFBvZGF0IS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zPy5MemVQb2RhdCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0RGV0YWlsIS51cGRhdGVQZXJtaXNzaW9uKGlzRW1wdHkgPyBwZXJtRW1wdHlHcmlkIDogeyB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RQcmlkYXREb1Bvcm92bmFuaSEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0VGlzayEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0UHJlZXZpZG92YXQhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplUHJlZXZpZG92YXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG9kw6Fuw60gZG9rbGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHBvZGFuaSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBwcsOhemRuw6lobyBkZXRhaWx1IC0gdnl2b2zDoSBzZSBwb2TDoW7DrVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuRGV0YWlsKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW7DrSBkZXRhaWx1IGRva2xhZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWwoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1w6FsbsOtIHZ5YnJhbsOhIHBvbG/FvmthXHJcbiAgICAgICAgICAgIGNvbnN0IGFrdFJhZGVrID0gRWtvLkdyaWQuY3VycmVudFJvdzxJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNEdG8+KHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbUJ1Yy5nZ3JpZFwiKSk7XHJcbiAgICAgICAgICAgIGlmIChha3RSYWRlayAmJiAhKGFrdFJhZGVrIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1IGFrdHXDoWxuw60gdnlicmFuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5EZXRhaWwodGhpcywgYWt0UmFkZWspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGRldGFpbHUgZXhpc3R1asOtY8OtaG8gbmVibyBwb2TDoW7DrSBub3bDqWhvIGRva2xhZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50IGNvbnRlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVyZmFjZS5HQmFua292bmlWeXBpc0R0b30gW3Jvd10gYWt0dcOhbG7DrSDFmcOhZGVrIChwcm8gem9icmF6ZW7DrSBkZXRhaWx1KSBuZWJvIG5ldnlwbG7Em25vIChwcm8gcG9kw6Fuw60pXHJcbiAgICAgICAgICogQHBhcmFtIHtCdWNHcmlkLm9wZW5EZXRhaWxXaXphcmRQYXJhbXN9IFt3aXphcmRdIHBhcmFtZXRyeSBwcsWvdm9kY2UgKHYgcMWZw61wYWTEmyB2b2zDoW7DrSBkZXRhaWx1IHogcHLFr3ZvZGNlKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wZW5EZXRhaWwoXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgICAgICByb3c/OiBJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNEdG8sXHJcbiAgICAgICAgICAgIHdpemFyZD86IEJ1Y0dyaWQub3BlbkRldGFpbFdpemFyZFBhcmFtc1xyXG4gICAgICAgICk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gesOhc29ibsOtayB6bcSbbsSbbsO9Y2ggesOhem5hbcWvXHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VkUm93czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdQQyBzIGtuaWhvdSB6IGFrdHXDoWxuw61obyB6w6F6bmFtdVxyXG4gICAgICAgICAgICBjb25zdCBuZXdHcGMgPSAocm93ID8gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKGNvbnRlbnQuZ3BjLCByb3cuaXhwX2RlbiEpIDogY29udGVudC5ncGMpO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogcG8gZG/FmWXFoWVuw60ga25paCBzbWF6YXQgcG91xb5pdMOtIHByb23Em25uw71jaCBJeHBEZW4sIFN1YnJhZGFEZW4gYSBBa3RTdWJyYWR5RGVuXHJcbiAgICAgICAgICAgIGxldCAkZGV0YWlsV2luZG93ID0gY29udGVudC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdCYW5rb3ZuaVZ5cGlzRGV0YWlsXCIsIHsgdWlkOiBcIkdCYW5rb3ZuaVZ5cGlzRGV0YWlsXCIsIGdwYzogbmV3R3BjLCBncmlkUmVtb3RlQ29udHJvbDogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh3aXphcmQ/LmdyaWQgPz8gdGhhdC5lbGVtZW50LmZpbmQoXCIuU2V6bmFtQnVjLmdncmlkXCIpKSB9XSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvKklEOiBkZXRhaWxJRCArICcjJywqL1xyXG4gICAgICAgICAgICAgICAgICAgIEl4cDogcm93Py5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgSXhwRGVuOiByb3c/Lml4cF9kZW4gPz8gdGhhdC5nZXRJeHBEZW4oKSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG90ZXN0b3ZhdCwgamVzdGxpIGRvYsWZZSBmdW5ndWplIGFrdHVhbGl6YWNlIG9ib3Ugc2V6bmFtxa8gYSBuYXN0YXZlbsOtIGFjdGl2ZVJvdyBhIGZva3VzdVxyXG5cclxuICAgICAgICAgICAgLy8gb2JzbHVoYSBha3Rpdm7DrSBvcGVyYWNlIG5hIGRldGFpbHVcclxuICAgICAgICAgICAgJC5jb250ZW50KCRkZXRhaWxXaW5kb3cpLm9uKEJ1Y0RldGFpbC50cmlnZ2VyQ2hhbmdlLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXRWYWw/LmRhdGE/Lml4cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gZG8gc2V6bmFtdSB6w6F6bmFtxa8gayBvYsSNZXJzdHZlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZWRSb3dzLmluZGV4T2YocmV0VmFsLmRhdGEuaXhwKSA8IDApIGNoYW5nZWRSb3dzLnB1c2gocmV0VmFsLmRhdGEuaXhwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL29ic2x1aGEgdWtvbsSNZW7DrSBva25hXHJcbiAgICAgICAgICAgICRkZXRhaWxXaW5kb3cub24oXCJjbG9zZWRcIiwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGZva3VzdSAoamVuIHBva3VkIG5lbsOtIHByxa92b2RjZSlcclxuICAgICAgICAgICAgICAgIGlmICghd2l6YXJkKSB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1CdWMuZ2dyaWRcIikuZ2dyaWQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHptxJtuxJtuw71jaCB6w6F6bmFtxa8gKHYgaGxhdm7DrW0gc2V6bmFtdSBpIHDFmcOtcGFkbsSbIHYgcHLFr3ZvZGNpKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWRSb3dzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBha3Rpdm7DrSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAod2l6YXJkPy5zZXRBY3RpdmVPcGVyYXRpb24gJiYgdHlwZW9mICh3aXphcmQuc2V0QWN0aXZlT3BlcmF0aW9uKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgd2l6YXJkLnNldEFjdGl2ZU9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHrDoWtsYWRuw61obyBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IHsgaXhwOiBjaGFuZ2VkUm93cyB9fSwgeyB1cGRhdGVNb2RlOiBcInVwZGF0ZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gYWt0dcOhbG7DrWhvIMWZw6Fka3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWw/LnJldHVyblZhbHVlPy5peHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1CdWMuZ2dyaWRcIikuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgeyBpeHA6IHJldFZhbD8ucmV0dXJuVmFsdWU/Lml4cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8gdiBwxZnDrXBhZMSbIHByxa92b2RjZSBpIGFrdHVhbGl6YWNlIGdyaWR1IHYgcHLFr3ZvZGNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh3aXphcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIFNtbFdpemFyZC5yZWxvYWRSb3dzKChycSkgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLmxpc3QocnEpOyB9LCB7IGl4cDogY2hhbmdlZFJvd3MgfSwgd2l6YXJkLmdyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAod2l6YXJkICYmIHdpemFyZC5yZWZyZXNoQW5kQ2hlY2tEYXRhQWN0aW9uICE9IHVuZGVmaW5lZCAmJiB0eXBlb2YgKHdpemFyZC5yZWZyZXNoQW5kQ2hlY2tEYXRhQWN0aW9uKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gd2l6YXJkLnJlZnJlc2hBbmRDaGVja0RhdGFBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkZGV0YWlsV2luZG93LmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyw6F0w60gUElEIGFrdHXDoWxuw60ga25paHkgKG5lYm8gbnVsbCBwb2t1ZCBuZW7DrSB6YWTDoW5hIG5lYm8gc2UgamRlIG8gcmXFvmltIHDFmWVzIHbDrWNlIGtuaWgpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZyB8IG51bGx9IFBJRCBha3R1w6FsbsOtIGtuaWh5IChuZWJvIG51bGwgcG9rdWQgbmVuw60gemFkw6FuYSBuZWJvIHNlIGpkZSBvIHJlxb5pbSBwxZllcyB2w61jZSBrbmloKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0SXhwRGVuKCk6IHN0cmluZyB8IG51bGwge1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogesWvc3RhbmUgdGF0byBtZXRvZGE/XHJcbiAgICAgICAgICAgIGlmIChFa28uVXRpbHMuZ2V0RWtvQm9va1ZhcmlhbnQodGhpcykgPT09IEVrby5JbnRlcmZhY2UuR0Vrb0Jvb2tWYXJpYW50Lk9uZSkgcmV0dXJuIHRoaXMuZWtvQm9vaz8uaXhwX2RlbiB8fCBudWxsO1xyXG4gICAgICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZvbMOhbsOtIG5hxI10ZW7DrSBlbGVrdHJvbmlja8OpaG8gYmFua292bsOtaG8gdsO9cGlzdSovXHJcbiAgICAgICAgcHJpdmF0ZSBuYWNpc3QoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlKFsnR29yZGljLkJ1Yy5XZWJDbGllbnQuR05hY3RlbmlFbFZ5cGlzdScsIHsgdGFza0lkOiAnYWN0TmFjdGVuaUVsVnlwaXN1JywgdWlkOiAnTmFjdGVuaUVsVnlwaXN1IycgfV0sIHt9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19