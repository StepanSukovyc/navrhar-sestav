"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Seznam případů SML
             *
             * @author Martin Boček
             * @since 490.1.0.23
             */
            let GSeznamPripaduSml = class GSeznamPripaduSml extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    // akce seznamu
                    this.actions.addRange({
                        //actPodani: Gordic.Eko.Action.actionPodat({ run: function () { that.podani(); } }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            run: function () { that.detail(); }
                        }),
                        actFinancniKontrola: Gordic.Eko.Action.actionFinancniKontrola({
                            run: function () { that.financniKontrola(); }
                        }),
                        actPridatDoPorovnani: Gordic.Eko.Action.actionPridatDoPorovnani({
                            run: function () { WebClient.SmlGrid.Comparator.add(that); }
                        }),
                        // TODO: doplnit správné téma
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tema: "sml_ptm_pripad",
                            serverParameterMethod: "Gordic.Sml.WebClient.GSeznamPripaduSml:PrintParameters",
                            reportStarting: function (rep) { return that.reportStarting(rep); }
                        }),
                    });
                    // menubar
                    this.menuBar(this.actions.createBar(this.getMenuActions()));
                    // filtry
                    that.$filterForm = $.newDiv().appendTo(that.element)
                        .gfilterpanel(Gordic.Eko.Filters.getFilterParams(that.getFilters(), undefined, //["s_bvy"],
                    "sml_ptm_pripad", undefined, undefined, null, true, that));
                    // sloupce
                    let gridFormat = WebClient.SmlGrid.Pripad.createGridFormat(that);
                    // view
                    that.view = new Gordic.Isl.View(that.isl.PripadSml.list(rq => rq), {
                        filterPanel: that.$filterForm,
                        key: that.PrimaryKey,
                        startEmpty: true
                    });
                    // grid
                    $("<div class='SeznamSml'>")
                        .css("height", "100%")
                        .appendTo(that.element)
                        .ggrid(WebClient.SmlGrid.Pripad.getGridOptions(that, gridFormat, that.actions.actDetail, function (ev, obj) {
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
                    }, (cellContext) => WebClient.SmlGrid.getContextMenuParams(cellContext, (cellContext) => that.actions.createBar(that.getMenuActions(true, cellContext))), 
                    // TODO: přidat data do metod getGridOptions? asi ano, protože view budu předávat všude
                    { data: that.view }))
                        .ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        // dlouhý seznam
                        longListAllowed: true,
                        longListCountMethod: (rq) => that.isl.PripadSml.listCount(rq).get(),
                        longListModifyRqMethod: (rq) => WebClient.SmlGrid.modifyListRequest(that, rq, (filters) => $.extend({}, filters, { ktg_typ: that.KtgTyp }))
                    })
                        .ggridrowscalc({
                        filterColumns: {
                            mode: "include",
                            columns: Gordic.Eko.Grid.getColumnsForCalc(gridFormat)
                        }
                    })
                        .gautofit();
                    // obsluha změny v gridu
                    that.view.on("change", function (ev, ctx) {
                        that.enable();
                    });
                    let focusFunc = function () {
                        that.element.find(".SeznamSml.ggrid").ggrid("focus");
                        that.view.off("change.focus", focusFunc);
                    };
                    that.view.on("change.focus", focusFunc);
                    // náhled v pravém bočním panelu
                    that.element.gsidebar("option", { right: { width: 200, visible: false, leafsAutoHide: false } });
                    let previewPanelsDefinition = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                linkProvider: function (loadParams) { return Gordic.WebApp.Utility.createCommandUrl(null, "OpenDetail", { ixp: loadParams.ixp }, { ticketType: Gordic.Enums.TicketType.WithLoginAndContext }); },
                                viewId: "sml:PripadSml"
                            }),
                            Gordic.Previews.getFilePreviewTab({
                                ixpProvider: function (loadParams) { return loadParams.ixp; }
                            })
                        ]
                    };
                    that.previewController = new Gordic.Previews.GPreviewController(that.element, previewPanelsDefinition);
                    // porovnání
                    WebClient.SmlGrid.Comparator.create(that);
                }
                //#region Detail
                /**
                 * Zobrazení detailu případu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detail() {
                    // aktuální vybraná položka
                    const aktRadek = Gordic.Eko.Grid.currentRow(this.element.find(".SeznamSml.ggrid"));
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        // otevření detailu aktuální vybrané položky
                        return this.openDetail(this, aktRadek);
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Zobrazení detailu existujícího nebo podání nového případu
                 *
                 * @param {GContent} content content
                 * @param {Gordic.Sml.Interface.GPripadSmlDto} [row] aktuální řádek (pro zobrazení detailu) nebo nevyplněno (pro podání)
                 * @param {SmlGrid.openDetailWizardParams} [wizard] parametry průvodce (v případě volání detailu z průvodce)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                openDetail(content, row, wizard) {
                    let that = this;
                    // zásobník změněných záznamů
                    let changedRows = [];
                    // otevření detailu
                    // test názvu okna a id
                    let detailName = "GDetailPripaduSml";
                    let detailID = "DetailPripaduSml";
                    //switch (that.TypSeznamuDokladu) {
                    //    case Sml.Globals.Enums.TypSeznamuDokladu.Smlouva:
                    //        detailName = "GDetailSmlouvy";
                    //        detailID = "DetailSmlouvy";
                    //        break;
                    //    case Sml.Globals.Enums.TypSeznamuDokladu.SmlouvaDodavatelska:
                    //        detailName = "GDetailSmlouvyDodavatelske";
                    //        detailID = "DetailSmlouvyDodavatelske";
                    //        break;
                    //    case Sml.Globals.Enums.TypSeznamuDokladu.SmlouvaOdberatelska:
                    //        detailName = "GDetailSmlouvyOdberatelske";
                    //        detailID = "DetailSmlouvyOdberatelske";
                    //        break;
                    //    case Sml.Globals.Enums.TypSeznamuDokladu.Objednavka:
                    //        detailName = "GDetailObjednavky";
                    //        detailID = "DetailObjednavky";
                    //        break;
                    //    case Sml.Globals.Enums.TypSeznamuDokladu.ObjednavkaDodavatelska:
                    //        detailName = "GDetailObjednavkyDodavatelske";
                    //        detailID = "DetailObjednavkyDodavatelske";
                    //        break;
                    //    case Sml.Globals.Enums.TypSeznamuDokladu.ObjednavkaOdberatelska:
                    //        detailName = "GDetailObjednavkyOdberatelske";
                    //        detailID = "DetailObjednavkyOdberatelske";
                    //        break;
                    //    case Sml.Globals.Enums.TypSeznamuDokladu.PrislibNeboJinyPrijem:
                    //        detailName = "GDetailPrislibuNeboJinehoPrijmu";
                    //        detailID = "DetailPrislibuNeboJinehoPrijmu";
                    //        break;
                    //    case Sml.Globals.Enums.TypSeznamuDokladu.JinyPrijem:
                    //        detailName = "GDetailJinehoPrijmu";
                    //        detailID = "DetailJinehoPrijmu";
                    //        break;
                    //    case Sml.Globals.Enums.TypSeznamuDokladu.Prislib:
                    //        detailName = "GDetailPrislibu";
                    //        detailID = "DetailPrislibu";
                    //        break;
                    //}
                    let $detailWindow = content.navigate(["Gordic.Sml.WebClient." + detailName, { gridRemoteControl: new Gordic.Components.GridRC(wizard?.grid ?? that.element.find(".SeznamSml.ggrid")) }], {
                        ID: detailID + '#',
                        IxpSmlPri: row?.ixp_sml_pri,
                        // TODO: dořešit předávání ktg_typ a ktg_den nebo volat přímo správný detail?
                        //KtgTyp: that.KtgTyp
                    });
                    // TODO: otestovat, jestli dobře funguje aktualizace obou seznamů a nastavení activeRow a fokusu
                    // obsluha aktivní operace na detailu
                    $.content($detailWindow).on(WebClient.SmlDetail.triggerChange, (retVal) => {
                        if (retVal?.data?.ixp) {
                            // přidání do seznamu záznamů k občerstvení
                            if (changedRows.indexOf(retVal.data.ixp) < 0)
                                changedRows.push(retVal.data.ixp);
                        }
                    });
                    // obsluha ukončení okna
                    $detailWindow.on("closed", (retVal) => {
                        // nastavení fokusu (jen pokud není průvodce)
                        if (!wizard)
                            that.element.find(".SeznamSml.ggrid").ggrid("focus");
                        // aktualizace změněných záznamů (v hlavním seznamu i případně v průvodci)
                        if (changedRows?.length > 0) {
                            // nastavení aktivní operace
                            if (wizard?.setActiveOperation && typeof (wizard.setActiveOperation) === "function") {
                                wizard.setActiveOperation();
                            }
                            // aktualizace základního gridu
                            that.view.requestData({ filters: { ixp: changedRows }, onlyPKWithoutFilters: true }, { updateMode: "update" })
                                .done(function () {
                                // nastavení aktuálního řádku
                                if (retVal?.returnValue?.ixp) {
                                    that.element.find(".SeznamSml.ggrid").ggrid("activeRow", { ixp: retVal?.returnValue?.ixp });
                                }
                                // v případě průvodce i aktualizace gridu v průvodci
                                if (wizard) {
                                    WebClient.SmlWizard.reloadRows((rq) => { return that.isl.PripadSml.list(rq); }, { ixp: changedRows }, wizard.grid)
                                        .then(function () {
                                        if (wizard && wizard.refreshAndCheckDataAction != undefined && typeof (wizard.refreshAndCheckDataAction) === "function") {
                                            return wizard.refreshAndCheckDataAction();
                                        }
                                    });
                                }
                            });
                        }
                    });
                    return $detailWindow.createDialogPromise();
                }
                //#endregion
                //#region Hromadné operace
                /**
                 * Finanční kontrola
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                financniKontrola() {
                    let that = this;
                    const zaznamy = this.element.find(".SeznamSml.ggrid").ggrid("getSelection");
                    if (zaznamy !== null && zaznamy.length > 0) {
                        Gordic.Wfl.WebClient.addHromadnaFKRun({
                            Content: this,
                            // TODO: nebo SmlGrid.Pripad.createGridFormat(content, true)?
                            GridFormat: WebClient.SmlWizard.getCurrentGridFormat(that.element.find(".SeznamSml.ggrid") /*, true*/),
                            ColumnList: that.element.find(".SeznamSml.ggrid").ggrid("getCurrentProfile").columnList ?? "",
                            KontrolaZaznamu: (data) => {
                                return that.isl.PripadSml.zkontrolujPredFinancniKontrolou({
                                    rows: data,
                                    podat: true
                                })
                                    .get()
                                    .then((result) => {
                                    if (typeof result === "undefined")
                                        return $.Deferred().resolve([]);
                                    return $.Deferred().resolve(result.result.map((item) => {
                                        return {
                                            ixp: item.data.ixp_sml_pri,
                                            valid: item.kind === 200 /* Gordic.Isl.GOperationResultKind.Success */,
                                            error_txt: item.kind !== 200 /* Gordic.Isl.GOperationResultKind.Success */ ? item.errors.map((err) => err.message).join(", ") : void 0
                                        };
                                    }));
                                });
                            },
                            KontrolaZaznamuKtgTyp: (data, ktg_typ) => {
                                if (ktg_typ == Sml.Globals.Enums.KtgTyp.PFKPredVznikemZavazkuLim && data.JeVydaj) {
                                    // výdaje
                                    return true;
                                }
                                else if (ktg_typ == Sml.Globals.Enums.KtgTyp.PFKPredVznikemNarokuHrom && data.JePrijem) {
                                    // příjmy
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            },
                            GetUPD: (ixps) => {
                                var res = {};
                                for (let ixp of ixps) {
                                    var dto = that.element.find(".SeznamSml.ggrid").ggrid("getSelection", false, true).find((elem) => elem.ixp_sml_pri == ixp);
                                    let UPD = {
                                        // TODO: zkontrolovat, jestli je to správně
                                        ac_ag: dto?.ac_sml,
                                        c_celk: dto?.c,
                                        c_mena: dto?.c_mena,
                                        mena: dto?.mena,
                                        dat_spl: dto?.dat_platnost,
                                        ixs_typ: dto?.ixs_typ,
                                        ixs_esu: null,
                                        popis: dto?.popis,
                                        c_sch: dto?.smlrok?.c,
                                        //ixp_pfk: xxx,
                                        //ucs: dto?.ucs,
                                        //typ_ag: 100
                                    };
                                    res[ixp] = UPD;
                                }
                                return res;
                            },
                            FKChanged: (ixps) => {
                                // TODO: tady má asi být reload seznamu
                                console.log(ixps);
                            },
                            NazevIdentifikatoru: "ixp_sml_pri" /* Gordic.Sml.Interface.GPripadSmlDtoNames.ixp_sml_pri */,
                            TypKontroly: 0 /* Gordic.Wfl.Interface.GFinancniKontrolaTypKontroly.FK */,
                            OmezitKtgTyp: 20 /* Gordic.Wfl.Interface.GHFinancniKontrolaOmezitKtgTyp.Vsechny */,
                            InputDto: zaznamy,
                            // TODO: co režim knih všech let?
                            Rok: that.Rok
                        });
                        return $.Deferred().resolve().promise();
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                //#endregion
                //#region Nastavení
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // jsou nějaké řádky?
                    const isEmpty = !(this.view.getCount("data") > 0);
                    // akce seznamu
                    const permEmptyGrid = WebClient.SmlGrid.getEmptyGridPermission();
                    const acts = this.actions;
                    const perms = this.Permissions;
                    //acts.actPodani!.updatePermission(perms?.LzePodat);
                    acts.actDetail.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeZobrazit);
                    acts.actFinancniKontrola.updatePermission(isEmpty ? permEmptyGrid : perms?.LzePodatFK);
                    acts.actPridatDoPorovnani.updatePermission(isEmpty ? permEmptyGrid : { value: true });
                    acts.actTisk.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeTisknout);
                }
                //#endregion
                //#region Filtry
                /**
                 * vytvoří a vrátí formuláře s filtry
                 *
                 * @returns {Gordic.Forms.Form[]} pole formulářů s filtry
                 */
                getFilters() {
                    // základní filtry na případy
                    let filterFormDef = new Gordic.Forms.Form({ tabLabel: "jres:24100059" }) //RC 24100059 : Kompletní filtr
                        .addSection("jres:24100060") //RC 24100060 : Základní údaje
                        // TODO: doladit pořadí filtrů (podle detailu nebo seznamu)
                        // TODO: přidat chybějící filtry (třeba typ kompenzovaných položek nebo klíčová slova jako v UCT?)
                        .addRow("Identifikátor").addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp"
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string",
                        label: "Agendové číslo od-do",
                        name: "ac_ag"
                    }))
                        .addRow("Typ dokladu").addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                        name: "ixs_typ",
                        model: "ixs_typ=ixs_typ;ixs_typ_txt=nazev;ktg_typ=ktg_typ",
                        dropdown: true,
                        multi: true,
                        serverFilters: {
                            ktg_typ: this.KtgTyp
                        }
                    })
                        .addRow("Popis").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "popis"
                    })
                        // TODO: neupravit filtr na subjekt na ixs_eko místo ixs_esu?
                        .addRow("Subjekt").addField("gselectbox", Gordic.Prefabs.Select.ginsesu(), {
                        name: "ixs_esu",
                        model: "ixs_esu=ixs_esu",
                        multi: true
                    })
                        .addRow("Zpracovatel").addField("gselectbox", Gordic.Prefabs.Select.ginsfunMini(), {
                        name: "ixs_fun_akt",
                        model: "ixs_fun_akt=ixs_fun",
                        dropdown: true
                    })
                        .addSection("Další")
                        .addRow("Klíčová slova").addField("gselectbox", Gordic.Prefabs.Select.wflKlicSlova(), {
                        name: "wfl_kl_slovo",
                        model: "wfl_kl_slovo=kl_slovo",
                        multi: true,
                        dropdown: true,
                        showSelectButton: true,
                        verticalButtons: false
                    });
                    return [filterFormDef];
                }
                //#endregion
                //#region Menu
                /**
                 * Seznam akcí pro menu (hamburger nebo kontextové menu gridu)
                 *
                 * @param {boolean} contextMenu formát pro kontextové menu gridu (true (default) = ano, false = ne)
                 * @param {IGGridCellContext<Gordic.Sml.Interface.GPripadSmlDto> | undefined} cellContext kontext z gridu (pouze pro contextMenu = true) (default = undefined)
                 * @returns {any} seznam akcí
                 */
                getMenuActions(contextMenu = false, cellContext = undefined) {
                    //(string | undefined)[] | (string | (string | undefined)[] | { action: GAction | undefined; primary: boolean; favorite: boolean } | { action: GAction | undefined; favorite: boolean; align: string })[]
                    return contextMenu
                        ? [
                            //"actPodani",
                            "actDetail",
                            "actFinancniKontrola",
                            "actPridatDoPorovnani",
                            "actTisk"
                        ]
                        : [
                            //"actPodani*",
                            "actDetail*!",
                            "actFinancniKontrola",
                            "actPridatDoPorovnani",
                            "actTisk*"
                        ];
                }
                //#endregion
                //#region Tisky
                /**
                 * Zadání parametrů tisku
                 *
                 * @param {IGPrintActionReportStarting} rep parametry tisku
                 */
                reportStarting(rep) {
                    // PID knihy
                    //let kniha = this.getIxpDen();
                    //if (kniha === null || kniha === undefined) kniha = "";
                    //rep.params.X0003 = /*kniha*/this.getParamKniha();
                    // název masky a filtry
                    rep.params.X0005 = "";
                    // příznak WK
                    rep.params.X0008 = "1";
                    // TODO: použít metodu WidgetExists i jinde (třeba při ověření existence ggridu)?
                    if (Gordic.Utils.WidgetExists("gfilterpanel", this.$filterForm)) {
                        // aktuální filtry pro předání do C# metody
                        rep.customDto = this.$filterForm.gfilterpanel("getConfirmedData");
                        // název filtru
                        return this.$filterForm.gfilterpanel("getFilterCurrent")
                            .then((retVal) => {
                            rep.params.X0005 = retVal?.gfilterpanel_name ?? "";
                            return;
                        });
                    }
                    // ostatní se nastavuje až v C#
                }
            };
            GSeznamPripaduSml = __decorate([
                gcontent
            ], GSeznamPripaduSml);
            WebClient.GSeznamPripaduSml = GSeznamPripaduSml;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVByaXBhZHVTbWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtUHJpcGFkdVNtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBeWlCZjtBQXppQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBeWlCbkI7SUF6aUJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5aUI3QjtRQXppQm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DOzs7OztlQUtHO1lBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQStHO2dCQWtDbEo7O21CQUVHO2dCQUNJLGNBQWM7b0JBRWpCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsZUFBZTtvQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsb0ZBQW9GO3dCQUNwRixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzRCQUN0QyxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUN0QyxDQUFDO3dCQUNGLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDOzRCQUMxRCxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ2hELENBQUM7d0JBQ0Ysb0JBQW9CLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7NEJBQzVELEdBQUcsRUFBRSxjQUFjLFVBQUEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNyRCxDQUFDO3dCQUNGLDZCQUE2Qjt3QkFD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QUFDO3dCQUNsRSxlQUFlO3dCQUNmLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUM7NkJBQ25ELElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOzRCQUNiLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sRUFBRSxpQkFBaUIsSUFBSSxFQUFFLENBQUM7NEJBQ25ELE9BQU87d0JBQ1gsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFFRCwrQkFBK0I7Z0JBQ25DLENBQUM7YUFJSixDQUFBO1lBOWhCWSxpQkFBaUI7Z0JBRDdCLFFBQVE7ZUFDSSxpQkFBaUIsQ0E4aEI3QjtZQTloQlksMkJBQWlCLG9CQThoQjdCLENBQUE7UUFDTCxDQUFDLEVBemlCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeWlCN0I7SUFBRCxDQUFDLEVBemlCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeWlCbkI7QUFBRCxDQUFDLEVBemlCUyxNQUFNLEtBQU4sTUFBTSxRQXlpQmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNtbC5XZWJDbGllbnQge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlem5hbSBwxZnDrXBhZMWvIFNNTFxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA0OTAuMS4wLjIzXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1QcmlwYWR1U21sIGV4dGVuZHMgR0NvbnRlbnRCYXNlPFNtbEdyaWQuSUdTdGFuZGFyZFNtbEdyaWQ8U21sLkludGVyZmFjZS5HUHJpcGFkU21sRHRvLCBTbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxTZXJ2aWNlUGVybWlzc2lvbj4+IHtcclxuXHJcbiAgICAgICAgLy8gdmxhc3Rub3N0aSB6IEMjXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIFR5cCBkb2tsYWR1IFNNTFxyXG4gICAgICAgIC8vICogQHR5cGUge1NtbC5HbG9iYWxzLkVudW1zLlR5cFNlem5hbXVEb2tsYWR1fVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIHJlYWRvbmx5IFR5cFNlem5hbXVEb2tsYWR1OiBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hYWRtaW5pc3Ryb3ZhbsOpIHR5cHkgZG9rdW1lbnTFr1xyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEl4c1R5cDogc3RyaW5nW11cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpuYW0gcG92b2xlbsO9Y2gga2F0ZWdvcmnDrSB0eXB1IGRva2xhZHVcclxuICAgICAgICAgKiBAdHlwZSB7U21sLkdsb2JhbHMuRW51bXMuS3RnVHlwW119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBLdGdUeXA6IFNtbC5HbG9iYWxzLkVudW1zLkt0Z1R5cFtdXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBzcGlzb3bDvSB1emVsXHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEl4c1N1OiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSByb2tcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUm9rOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogamUgc3TDoXRuw60gcG9rbGFkbmE/XHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBKZUlpc3NwOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgLy9hY3RQb2Rhbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblBvZGF0KHsgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQucG9kYW5pKCk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuZGV0YWlsKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0RmluYW5jbmlLb250cm9sYTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRmluYW5jbmlLb250cm9sYSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuZmluYW5jbmlLb250cm9sYSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFByaWRhdERvUG9yb3ZuYW5pOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmlkYXREb1Bvcm92bmFuaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IFNtbEdyaWQuQ29tcGFyYXRvci5hZGQodGhhdCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBzcHLDoXZuw6kgdMOpbWFcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwic21sX3B0bV9wcmlwYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlNtbC5XZWJDbGllbnQuR1Nlem5hbVByaXBhZHVTbWw6UHJpbnRQYXJhbWV0ZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHsgcmV0dXJuIHRoYXQucmVwb3J0U3RhcnRpbmcocmVwKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gbWVudWJhclxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcih0aGlzLmdldE1lbnVBY3Rpb25zKCkpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGZpbHRyeVxyXG4gICAgICAgICAgICB0aGF0LiRmaWx0ZXJGb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRmlsdGVycy5nZXRGaWx0ZXJQYXJhbXM8R29yZGljLlNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbEZpbHRlcj4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2V0RmlsdGVycygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsLy9bXCJzX2J2eVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWxfcHRtX3ByaXBhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCBhcyBhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXRcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gc2xvdXBjZVxyXG4gICAgICAgICAgICBsZXQgZ3JpZEZvcm1hdCA9IFNtbEdyaWQuUHJpcGFkLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2aWV3XHJcbiAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXc8R29yZGljLlNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0bz4oXHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRTbWwubGlzdChycSA9PiBycSksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyUGFuZWw6IHRoYXQuJGZpbHRlckZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiB0aGF0LlByaW1hcnlLZXksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBncmlkXHJcbiAgICAgICAgICAgICQoXCI8ZGl2IGNsYXNzPSdTZXpuYW1TbWwnPlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgU21sR3JpZC5QcmlwYWQuZ2V0R3JpZE9wdGlvbnMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBzdGF2dSBva25hIGEgbsOhaGxlZHUgcG9kbGUgYWt0dcOhbG7EmyB2eWJyYW7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucHJldmlld0NvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqICE9IG51bGwgJiYgb2JqLmNlbGxJbmZvICE9IG51bGwgJiYgb2JqLmNlbGxJbmZvLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBwb2t1ZCBieSBieWxvIHBvdMWZZWJhIMWZZcWhaXQgbmFzdGF2ZW7DrSBva25hIHBvIHDFmWVzdW51IHBvIGdyaWR1LCB0YWsgdG8gb2Rrb21lbnRvdmF0LCBhbGUgcHLDoXZhIHrDoXpuYW1vdsOhIHByw6F2YSBzZSBha3R1w6FsbsSbIG5lxZllxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3cob2JqLmNlbGxJbmZvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbcWvxb5lIHRvaGxlIHbFr2JlYyBuYXN0YXQ/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjZWxsQ29udGV4dCkgPT4gU21sR3JpZC5nZXRDb250ZXh0TWVudVBhcmFtcyhjZWxsQ29udGV4dCwgKGNlbGxDb250ZXh0KSA9PiB0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKHRoYXQuZ2V0TWVudUFjdGlvbnModHJ1ZSwgY2VsbENvbnRleHQpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHDFmWlkYXQgZGF0YSBkbyBtZXRvZCBnZXRHcmlkT3B0aW9ucz8gYXNpIGFubywgcHJvdG/FvmUgdmlldyBidWR1IHDFmWVkw6F2YXQgdsWhdWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgZGF0YTogdGhhdC52aWV3IH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRla28oe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvdcSNdG92w70gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRsb3Vow70gc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0Q291bnRNZXRob2Q6IChycSkgPT4gdGhhdC5pc2wuUHJpcGFkU21sLmxpc3RDb3VudChycSkuZ2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RNb2RpZnlScU1ldGhvZDogKHJxKSA9PiBTbWxHcmlkLm1vZGlmeUxpc3RSZXF1ZXN0KHRoYXQsIHJxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZmlsdGVycykgPT4gJC5leHRlbmQoe30sIGZpbHRlcnMsIHsga3RnX3R5cDogdGhhdC5LdGdUeXAgfSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkcm93c2NhbGMoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckNvbHVtbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJpbmNsdWRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEVrby5HcmlkLmdldENvbHVtbnNGb3JDYWxjKGdyaWRGb3JtYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gb2JzbHVoYSB6bcSbbnkgdiBncmlkdVxyXG4gICAgICAgICAgICB0aGF0LnZpZXcub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBmb2N1c0Z1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIikuZ2dyaWQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgICh0aGF0LnZpZXcgYXMgYW55KS5vZmYoXCJjaGFuZ2UuZm9jdXNcIiwgZm9jdXNGdW5jKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhhdC52aWV3Lm9uKFwiY2hhbmdlLmZvY3VzXCIsIGZvY3VzRnVuYyk7XHJcblxyXG4gICAgICAgICAgICAvLyBuw6FobGVkIHYgcHJhdsOpbSBib8SNbsOtbSBwYW5lbHVcclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50LmdzaWRlYmFyKFwib3B0aW9uXCIsIHsgcmlnaHQ6IHsgd2lkdGg6IDIwMCwgdmlzaWJsZTogZmFsc2UsIGxlYWZzQXV0b0hpZGU6IGZhbHNlIH0gfSk7XHJcbiAgICAgICAgICAgIGxldCBwcmV2aWV3UGFuZWxzRGVmaW5pdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHRhYnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJldmlld3MuZ2V0RGVmYXVsdFByZXZpZXdUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rUHJvdmlkZXI6IGZ1bmN0aW9uIChsb2FkUGFyYW1zKSB7IHJldHVybiBHb3JkaWMuV2ViQXBwLlV0aWxpdHkuY3JlYXRlQ29tbWFuZFVybChudWxsLCBcIk9wZW5EZXRhaWxcIiwgeyBpeHA6IGxvYWRQYXJhbXMuaXhwIH0sIHsgdGlja2V0VHlwZTogR29yZGljLkVudW1zLlRpY2tldFR5cGUuV2l0aExvZ2luQW5kQ29udGV4dCB9KSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3SWQ6IFwic21sOlByaXBhZFNtbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldEZpbGVQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwUHJvdmlkZXI6IGZ1bmN0aW9uIChsb2FkUGFyYW1zKSB7IHJldHVybiBsb2FkUGFyYW1zLml4cDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKHRoYXQuZWxlbWVudCwgcHJldmlld1BhbmVsc0RlZmluaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgLy8gcG9yb3Zuw6Fuw61cclxuICAgICAgICAgICAgU21sR3JpZC5Db21wYXJhdG9yLmNyZWF0ZSh0aGF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBEZXRhaWxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW7DrSBkZXRhaWx1IHDFmcOtcGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRldGFpbCgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgY29uc3QgYWt0UmFkZWsgPSBFa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG8+KHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKSk7XHJcbiAgICAgICAgICAgIGlmIChha3RSYWRlayAmJiAhKGFrdFJhZGVrIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1IGFrdHXDoWxuw60gdnlicmFuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5EZXRhaWwodGhpcywgYWt0UmFkZWspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGRldGFpbHUgZXhpc3R1asOtY8OtaG8gbmVibyBwb2TDoW7DrSBub3bDqWhvIHDFmcOtcGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnQgY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLlNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0b30gW3Jvd10gYWt0dcOhbG7DrSDFmcOhZGVrIChwcm8gem9icmF6ZW7DrSBkZXRhaWx1KSBuZWJvIG5ldnlwbG7Em25vIChwcm8gcG9kw6Fuw60pXHJcbiAgICAgICAgICogQHBhcmFtIHtTbWxHcmlkLm9wZW5EZXRhaWxXaXphcmRQYXJhbXN9IFt3aXphcmRdIHBhcmFtZXRyeSBwcsWvdm9kY2UgKHYgcMWZw61wYWTEmyB2b2zDoW7DrSBkZXRhaWx1IHogcHLFr3ZvZGNlKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wZW5EZXRhaWwoXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgICAgICByb3c/OiBHb3JkaWMuU21sLkludGVyZmFjZS5HUHJpcGFkU21sRHRvLFxyXG4gICAgICAgICAgICB3aXphcmQ/OiBTbWxHcmlkLm9wZW5EZXRhaWxXaXphcmRQYXJhbXNcclxuICAgICAgICApOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHrDoXNvYm7DrWsgem3Em27Em27DvWNoIHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICBsZXQgY2hhbmdlZFJvd3M6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBvdGV2xZllbsOtIGRldGFpbHVcclxuICAgICAgICAgICAgLy8gdGVzdCBuw6F6dnUgb2tuYSBhIGlkXHJcbiAgICAgICAgICAgIGxldCBkZXRhaWxOYW1lID0gXCJHRGV0YWlsUHJpcGFkdVNtbFwiO1xyXG4gICAgICAgICAgICBsZXQgZGV0YWlsSUQgPSBcIkRldGFpbFByaXBhZHVTbWxcIjtcclxuICAgICAgICAgICAgLy9zd2l0Y2ggKHRoYXQuVHlwU2V6bmFtdURva2xhZHUpIHtcclxuICAgICAgICAgICAgLy8gICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5TbWxvdXZhOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGV0YWlsTmFtZSA9IFwiR0RldGFpbFNtbG91dnlcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxTbWxvdXZ5XCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5TbWxvdXZhRG9kYXZhdGVsc2thOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGV0YWlsTmFtZSA9IFwiR0RldGFpbFNtbG91dnlEb2RhdmF0ZWxza2VcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxTbWxvdXZ5RG9kYXZhdGVsc2tlXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5TbWxvdXZhT2RiZXJhdGVsc2thOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGV0YWlsTmFtZSA9IFwiR0RldGFpbFNtbG91dnlPZGJlcmF0ZWxza2VcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxTbWxvdXZ5T2RiZXJhdGVsc2tlXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5PYmplZG5hdmthOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGV0YWlsTmFtZSA9IFwiR0RldGFpbE9iamVkbmF2a3lcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxPYmplZG5hdmt5XCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5PYmplZG5hdmthRG9kYXZhdGVsc2thOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGV0YWlsTmFtZSA9IFwiR0RldGFpbE9iamVkbmF2a3lEb2RhdmF0ZWxza2VcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxPYmplZG5hdmt5RG9kYXZhdGVsc2tlXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5PYmplZG5hdmthT2RiZXJhdGVsc2thOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGV0YWlsTmFtZSA9IFwiR0RldGFpbE9iamVkbmF2a3lPZGJlcmF0ZWxza2VcIjtcclxuICAgICAgICAgICAgLy8gICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxPYmplZG5hdmt5T2RiZXJhdGVsc2tlXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5QcmlzbGliTmVib0ppbnlQcmlqZW06XHJcbiAgICAgICAgICAgIC8vICAgICAgICBkZXRhaWxOYW1lID0gXCJHRGV0YWlsUHJpc2xpYnVOZWJvSmluZWhvUHJpam11XCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBkZXRhaWxJRCA9IFwiRGV0YWlsUHJpc2xpYnVOZWJvSmluZWhvUHJpam11XCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5KaW55UHJpamVtOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGV0YWlsTmFtZSA9IFwiR0RldGFpbEppbmVob1ByaWptdVwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZGV0YWlsSUQgPSBcIkRldGFpbEppbmVob1ByaWptdVwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgIGNhc2UgU21sLkdsb2JhbHMuRW51bXMuVHlwU2V6bmFtdURva2xhZHUuUHJpc2xpYjpcclxuICAgICAgICAgICAgLy8gICAgICAgIGRldGFpbE5hbWUgPSBcIkdEZXRhaWxQcmlzbGlidVwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZGV0YWlsSUQgPSBcIkRldGFpbFByaXNsaWJ1XCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIGxldCAkZGV0YWlsV2luZG93ID0gY29udGVudC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5TbWwuV2ViQ2xpZW50LlwiICsgZGV0YWlsTmFtZSwgeyBncmlkUmVtb3RlQ29udHJvbDogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh3aXphcmQ/LmdyaWQgPz8gdGhhdC5lbGVtZW50LmZpbmQoXCIuU2V6bmFtU21sLmdncmlkXCIpKSB9XSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBJRDogZGV0YWlsSUQgKyAnIycsXHJcbiAgICAgICAgICAgICAgICAgICAgSXhwU21sUHJpOiByb3c/Lml4cF9zbWxfcHJpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBwxZllZMOhdsOhbsOtIGt0Z190eXAgYSBrdGdfZGVuIG5lYm8gdm9sYXQgcMWZw61tbyBzcHLDoXZuw70gZGV0YWlsP1xyXG4gICAgICAgICAgICAgICAgICAgIC8vS3RnVHlwOiB0aGF0Lkt0Z1R5cFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogb3Rlc3RvdmF0LCBqZXN0bGkgZG9ixZllIGZ1bmd1amUgYWt0dWFsaXphY2Ugb2JvdSBzZXpuYW3FryBhIG5hc3RhdmVuw60gYWN0aXZlUm93IGEgZm9rdXN1XHJcblxyXG4gICAgICAgICAgICAvLyBvYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICAkLmNvbnRlbnQoJGRldGFpbFdpbmRvdykub24oU21sRGV0YWlsLnRyaWdnZXJDaGFuZ2UsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbD8uZGF0YT8uaXhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBkbyBzZXpuYW11IHrDoXpuYW3FryBrIG9ixI1lcnN0dmVuw61cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZFJvd3MuaW5kZXhPZihyZXRWYWwuZGF0YS5peHApIDwgMCkgY2hhbmdlZFJvd3MucHVzaChyZXRWYWwuZGF0YS5peHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9ic2x1aGEgdWtvbsSNZW7DrSBva25hXHJcbiAgICAgICAgICAgICRkZXRhaWxXaW5kb3cub24oXCJjbG9zZWRcIiwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGZva3VzdSAoamVuIHBva3VkIG5lbsOtIHByxa92b2RjZSlcclxuICAgICAgICAgICAgICAgIGlmICghd2l6YXJkKSB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIikuZ2dyaWQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHptxJtuxJtuw71jaCB6w6F6bmFtxa8gKHYgaGxhdm7DrW0gc2V6bmFtdSBpIHDFmcOtcGFkbsSbIHYgcHLFr3ZvZGNpKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWRSb3dzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBha3Rpdm7DrSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpemFyZD8uc2V0QWN0aXZlT3BlcmF0aW9uICYmIHR5cGVvZiAod2l6YXJkLnNldEFjdGl2ZU9wZXJhdGlvbikgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aXphcmQuc2V0QWN0aXZlT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHrDoWtsYWRuw61obyBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IHsgaXhwOiBjaGFuZ2VkUm93cyB9LCBvbmx5UEtXaXRob3V0RmlsdGVyczogdHJ1ZSB9LCB7IHVwZGF0ZU1vZGU6IFwidXBkYXRlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBha3R1w6FsbsOtaG8gxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbD8ucmV0dXJuVmFsdWU/Lml4cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKS5nZ3JpZChcImFjdGl2ZVJvd1wiLCB7IGl4cDogcmV0VmFsPy5yZXR1cm5WYWx1ZT8uaXhwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdiBwxZnDrXBhZMSbIHByxa92b2RjZSBpIGFrdHVhbGl6YWNlIGdyaWR1IHYgcHLFr3ZvZGNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2l6YXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU21sV2l6YXJkLnJlbG9hZFJvd3MoKHJxKSA9PiB7IHJldHVybiB0aGF0LmlzbC5QcmlwYWRTbWwubGlzdChycSk7IH0sIHsgaXhwOiBjaGFuZ2VkUm93cyB9LCB3aXphcmQuZ3JpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpemFyZCAmJiB3aXphcmQucmVmcmVzaEFuZENoZWNrRGF0YUFjdGlvbiAhPSB1bmRlZmluZWQgJiYgdHlwZW9mICh3aXphcmQucmVmcmVzaEFuZENoZWNrRGF0YUFjdGlvbikgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aXphcmQucmVmcmVzaEFuZENoZWNrRGF0YUFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRkZXRhaWxXaW5kb3cuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBIcm9tYWRuw6kgb3BlcmFjZVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaW5hbsSNbsOtIGtvbnRyb2xhXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZmluYW5jbmlLb250cm9sYSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHphem5hbXkgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIikuZ2dyaWQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmICh6YXpuYW15ICE9PSBudWxsICYmIHphem5hbXkubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuV2ViQ2xpZW50LmFkZEhyb21hZG5hRktSdW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIENvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbmVibyBTbWxHcmlkLlByaXBhZC5jcmVhdGVHcmlkRm9ybWF0KGNvbnRlbnQsIHRydWUpP1xyXG4gICAgICAgICAgICAgICAgICAgIEdyaWRGb3JtYXQ6IFNtbFdpemFyZC5nZXRDdXJyZW50R3JpZEZvcm1hdDxTbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG8+KHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKS8qLCB0cnVlKi8pLFxyXG4gICAgICAgICAgICAgICAgICAgIENvbHVtbkxpc3Q6IHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKS5nZ3JpZChcImdldEN1cnJlbnRQcm9maWxlXCIpLmNvbHVtbkxpc3QgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBLb250cm9sYVphem5hbXU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5QcmlwYWRTbWwuemtvbnRyb2x1alByZWRGaW5hbmNuaUtvbnRyb2xvdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9kYXQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoW10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXN1bHQucmVzdWx0Lm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiBpdGVtLmRhdGEuaXhwX3NtbF9wcmkgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQ6IGl0ZW0ua2luZCA9PT0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfdHh0OiBpdGVtLmtpbmQgIT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcyA/IGl0ZW0uZXJyb3JzLm1hcCgoZXJyKSA9PiBlcnIubWVzc2FnZSkuam9pbihcIiwgXCIpIDogdm9pZCAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIEtvbnRyb2xhWmF6bmFtdUt0Z1R5cDogKGRhdGEsIGt0Z190eXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGt0Z190eXAgPT0gU21sLkdsb2JhbHMuRW51bXMuS3RnVHlwLlBGS1ByZWRWem5pa2VtWmF2YXprdUxpbSAmJiBkYXRhLkplVnlkYWopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbDvWRhamVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGt0Z190eXAgPT0gU21sLkdsb2JhbHMuRW51bXMuS3RnVHlwLlBGS1ByZWRWem5pa2VtTmFyb2t1SHJvbSAmJiBkYXRhLkplUHJpamVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZnDrWpteVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIEdldFVQRDogKGl4cHM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXM6IHsgW2l4cDogc3RyaW5nXTogR29yZGljLldmbC5JbnRlcmZhY2UuR0ZpbmFuY25pS29udHJvbGFVUEQgfSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpeHAgb2YgaXhwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR0byA9IHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKS5nZ3JpZDxHb3JkaWMuU21sLkludGVyZmFjZS5HUHJpcGFkU21sRHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSwgdHJ1ZSkuZmluZCgoZWxlbSkgPT4gZWxlbS5peHBfc21sX3ByaSA9PSBpeHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IFVQRDogR29yZGljLldmbC5JbnRlcmZhY2UuR0ZpbmFuY25pS29udHJvbGFVUEQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogemtvbnRyb2xvdmF0LCBqZXN0bGkgamUgdG8gc3Byw6F2bsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNfYWc6IGR0bz8uYWNfc21sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfY2VsazogZHRvPy5jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfbWVuYTogZHRvPy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVuYTogKGR0bz8ubWVuYSBhcyBhbnkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF9zcGw6IGR0bz8uZGF0X3BsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c190eXA6IGR0bz8uaXhzX3R5cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZXN1OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcGlzOiBkdG8/LnBvcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfc2NoOiBkdG8/LnNtbHJvaz8uYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2l4cF9wZms6IHh4eCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VjczogZHRvPy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90eXBfYWc6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1tpeHBdID0gVVBEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBGS0NoYW5nZWQ6IChpeHBzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHRhZHkgbcOhIGFzaSBiw710IHJlbG9hZCBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl4cHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgTmF6ZXZJZGVudGlmaWthdG9ydTogR29yZGljLlNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0b05hbWVzLml4cF9zbWxfcHJpLFxyXG4gICAgICAgICAgICAgICAgICAgIFR5cEtvbnRyb2x5OiBHb3JkaWMuV2ZsLkludGVyZmFjZS5HRmluYW5jbmlLb250cm9sYVR5cEtvbnRyb2x5LkZLLFxyXG4gICAgICAgICAgICAgICAgICAgIE9tZXppdEt0Z1R5cDogR29yZGljLldmbC5JbnRlcmZhY2UuR0hGaW5hbmNuaUtvbnRyb2xhT21leml0S3RnVHlwLlZzZWNobnksXHJcbiAgICAgICAgICAgICAgICAgICAgSW5wdXREdG86IHphem5hbXksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY28gcmXFvmltIGtuaWggdsWhZWNoIGxldD9cclxuICAgICAgICAgICAgICAgICAgICBSb2s6IHRoYXQuUm9rXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBOYXN0YXZlbsOtXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcHJ2a8WvIHZlIGZvcm11bMOhxZlpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBqc291IG7Em2pha8OpIMWZw6Fka3k/XHJcbiAgICAgICAgICAgIGNvbnN0IGlzRW1wdHkgPSAhKHRoaXMudmlldy5nZXRDb3VudChcImRhdGFcIikgPiAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICBjb25zdCBwZXJtRW1wdHlHcmlkID0gU21sR3JpZC5nZXRFbXB0eUdyaWRQZXJtaXNzaW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdHMgPSB0aGlzLmFjdGlvbnM7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcm1zID0gdGhpcy5QZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgLy9hY3RzLmFjdFBvZGFuaSEudXBkYXRlUGVybWlzc2lvbihwZXJtcz8uTHplUG9kYXQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdERldGFpbCEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVab2JyYXppdCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0RmluYW5jbmlLb250cm9sYSEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVQb2RhdEZLKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RQcmlkYXREb1Bvcm92bmFuaSEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0VGlzayEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVUaXNrbm91dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEZpbHRyeVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB2eXR2b8WZw60gYSB2csOhdMOtIGZvcm11bMOhxZllIHMgZmlsdHJ5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5Gb3Jtcy5Gb3JtW119IHBvbGUgZm9ybXVsw6HFmcWvIHMgZmlsdHJ5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXJzKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtW10ge1xyXG5cclxuICAgICAgICAgICAgLy8gesOha2xhZG7DrSBmaWx0cnkgbmEgcMWZw61wYWR5XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwianJlczoyNDEwMDA1OVwiIH0pIC8vUkMgMjQxMDAwNTkgOiBLb21wbGV0bsOtIGZpbHRyXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjI0MTAwMDYwXCIpIC8vUkMgMjQxMDAwNjAgOiBaw6FrbGFkbsOtIMO6ZGFqZVxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZG9sYWRpdCBwb8WZYWTDrSBmaWx0csWvIChwb2RsZSBkZXRhaWx1IG5lYm8gc2V6bmFtdSlcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHDFmWlkYXQgY2h5YsSbasOtY8OtIGZpbHRyeSAodMWZZWJhIHR5cCBrb21wZW56b3ZhbsO9Y2ggcG9sb8W+ZWsgbmVibyBrbMOtxI1vdsOhIHNsb3ZhIGpha28gdiBVQ1Q/KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFnZW5kb3bDqSDEjcOtc2xvIG9kLWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19hZ1wiXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgZG9rbGFkdVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHN0eXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c190eXA9aXhzX3R5cDtpeHNfdHlwX3R4dD1uYXpldjtrdGdfdHlwPWt0Z190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt0Z190eXA6IHRoaXMuS3RnVHlwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3Bpc1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoRWtvLkZpbHRlcnMuZ2V0U3RyaW5nT3BlcmF0b3JzKCkpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogbmV1cHJhdml0IGZpbHRyIG5hIHN1Ympla3QgbmEgaXhzX2VrbyBtw61zdG8gaXhzX2VzdT9cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdWJqZWt0XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2VzdSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2VzdT1peHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWnByYWNvdmF0ZWxcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZnVuTWluaSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX2FrdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19mdW5fYWt0PWl4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkRhbMWhw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLbMOtxI1vdsOhIHNsb3ZhXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2ZsS2xpY1Nsb3ZhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIndmbF9rbF9zbG92b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIndmbF9rbF9zbG92bz1rbF9zbG92b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxCdXR0b25zOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW2ZpbHRlckZvcm1EZWZdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBNZW51XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlem5hbSBha2PDrSBwcm8gbWVudSAoaGFtYnVyZ2VyIG5lYm8ga29udGV4dG92w6kgbWVudSBncmlkdSlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbnRleHRNZW51IGZvcm3DoXQgcHJvIGtvbnRleHRvdsOpIG1lbnUgZ3JpZHUgKHRydWUgKGRlZmF1bHQpID0gYW5vLCBmYWxzZSA9IG5lKVxyXG4gICAgICAgICAqIEBwYXJhbSB7SUdHcmlkQ2VsbENvbnRleHQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0bz4gfCB1bmRlZmluZWR9IGNlbGxDb250ZXh0IGtvbnRleHQgeiBncmlkdSAocG91emUgcHJvIGNvbnRleHRNZW51ID0gdHJ1ZSkgKGRlZmF1bHQgPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICogQHJldHVybnMge2FueX0gc2V6bmFtIGFrY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRNZW51QWN0aW9ucyhjb250ZXh0TWVudTogYm9vbGVhbiA9IGZhbHNlLCBjZWxsQ29udGV4dDogSUdHcmlkQ2VsbENvbnRleHQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0bz4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpOiBhbnkge1xyXG4gICAgICAgICAgICAvLyhzdHJpbmcgfCB1bmRlZmluZWQpW10gfCAoc3RyaW5nIHwgKHN0cmluZyB8IHVuZGVmaW5lZClbXSB8IHsgYWN0aW9uOiBHQWN0aW9uIHwgdW5kZWZpbmVkOyBwcmltYXJ5OiBib29sZWFuOyBmYXZvcml0ZTogYm9vbGVhbiB9IHwgeyBhY3Rpb246IEdBY3Rpb24gfCB1bmRlZmluZWQ7IGZhdm9yaXRlOiBib29sZWFuOyBhbGlnbjogc3RyaW5nIH0pW11cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0TWVudVxyXG4gICAgICAgICAgICAgICAgPyBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy9cImFjdFBvZGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RGaW5hbmNuaUtvbnRyb2xhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQcmlkYXREb1Bvcm92bmFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0VGlza1wiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICA6IFtcclxuICAgICAgICAgICAgICAgICAgICAvL1wiYWN0UG9kYW5pKlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0RGV0YWlsKiFcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdEZpbmFuY25pS29udHJvbGFcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByaWRhdERvUG9yb3ZuYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RUaXNrKlwiXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBUaXNreVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWTDoW7DrSBwYXJhbWV0csWvIHRpc2t1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtJR1ByaW50QWN0aW9uUmVwb3J0U3RhcnRpbmd9IHJlcCBwYXJhbWV0cnkgdGlza3VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVwb3J0U3RhcnRpbmcocmVwOiBJR1ByaW50QWN0aW9uUmVwb3J0U3RhcnRpbmcpOiBKUXVlcnlQcm9taXNlPGFueT4gfCB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFBJRCBrbmloeVxyXG4gICAgICAgICAgICAvL2xldCBrbmloYSA9IHRoaXMuZ2V0SXhwRGVuKCk7XHJcbiAgICAgICAgICAgIC8vaWYgKGtuaWhhID09PSBudWxsIHx8IGtuaWhhID09PSB1bmRlZmluZWQpIGtuaWhhID0gXCJcIjtcclxuICAgICAgICAgICAgLy9yZXAucGFyYW1zLlgwMDAzID0gLyprbmloYSovdGhpcy5nZXRQYXJhbUtuaWhhKCk7XHJcbiAgICAgICAgICAgIC8vIG7DoXpldiBtYXNreSBhIGZpbHRyeVxyXG4gICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gXCJcIjtcclxuICAgICAgICAgICAgLy8gcMWZw616bmFrIFdLXHJcbiAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDggPSBcIjFcIjtcclxuICAgICAgICAgICAgLy8gVE9ETzogcG91xb7DrXQgbWV0b2R1IFdpZGdldEV4aXN0cyBpIGppbmRlICh0xZllYmEgcMWZaSBvdsSbxZllbsOtIGV4aXN0ZW5jZSBnZ3JpZHUpP1xyXG4gICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmaWx0ZXJwYW5lbFwiLCB0aGlzLiRmaWx0ZXJGb3JtKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSBmaWx0cnkgcHJvIHDFmWVkw6Fuw60gZG8gQyMgbWV0b2R5XHJcbiAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0gdGhpcy4kZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gbsOhemV2IGZpbHRydVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGZpbHRlckZvcm0uZ2ZpbHRlcnBhbmVsKFwiZ2V0RmlsdGVyQ3VycmVudFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwNSA9IHJldFZhbD8uZ2ZpbHRlcnBhbmVsX25hbWUgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBvc3RhdG7DrSBzZSBuYXN0YXZ1amUgYcW+IHYgQyNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=