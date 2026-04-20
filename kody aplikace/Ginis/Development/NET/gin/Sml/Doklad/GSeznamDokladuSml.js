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
             * Seznam dokladů SML
             *
             * @author Martin Boček
             * @since 490.1.0.17
             */
            let GSeznamDokladuSml = class GSeznamDokladuSml extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    // akce seznamu
                    this.actions.addRange({
                        actPodani: Gordic.Eko.Action.actionPodat({
                            run: function () { that.podani(); }
                        }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            run: function () { that.detail(); }
                        }),
                        actDetailDoZalozky: Gordic.Eko.Action.actionDetailDoZalozky({
                            run: function () { that.detailDoZalozky(); }
                        }),
                        actSchvaleni: Gordic.Eko.Action.actionSchvalit({
                            run: function () { that.schvaleni(true); }
                        }),
                        actZruseniSchvaleni: Gordic.Eko.Action.actionZrusitSchvaleni({
                            run: function () { that.schvaleni(false); }
                        }),
                        actPodepsani: {
                            caption: "jres:24100055", //RC 24100055 : Podepsat
                            enabled: false,
                            run: function () { that.podepsani(true); }
                        },
                        actZruseniPodepsani: {
                            caption: "jres:24100056", //RC 24100056 : Zrušit podepsání
                            enabled: false,
                            run: function () { that.podepsani(false); }
                        },
                        actUkonceni: Gordic.Eko.Action.actionUzavrit({
                            caption: "jres:24100057", //RC 24100057 : Ukončit
                            enabled: false,
                            run: function () { that.ukonceni(true); }
                        }),
                        actZruseniUkonceni: Gordic.Eko.Action.actionZrusitUzavreni({
                            caption: "jres:24100058", //RC 24100058 : Zrušit ukončení
                            enabled: false,
                            run: function () { that.ukonceni(false); }
                        }),
                        actStorno: Gordic.Eko.Action.actionStornovat({
                            run: function () { that.storno(true); }
                        }),
                        actZruseniStorna: Gordic.Eko.Action.actionZrusitStorno({
                            run: function () { that.storno(false); }
                        }),
                        actRezervaceIissp: {
                            caption: "jres:24100192", //RC 24100192 : Rezervovat v IISSP
                            icon: "",
                            enabled: false,
                            visible: that.JeIissp,
                            run: function () { that.rezervaceIissp(); }
                        },
                        actPredani: Gordic.Eko.Action.actionPredat({
                            run: function () { that.predani(); }
                        }),
                        actPrevzeti: Gordic.Eko.Action.actionPrevzit({
                            run: function () { that.prevzeti(); }
                        }),
                        actPrideleni: Gordic.Eko.Action.actionPridelit({
                            run: function () { that.prideleni(); }
                        }),
                        actPreevidence: Gordic.Eko.Action.actionPreevidovat({
                            run: function () { that.preevidence(); }
                        }),
                        actSchvaleniPolozekFP: Gordic.Eko.Action.actionSchvalit({
                            caption: "jres:24100179", //RC 24100179 : Schválit položky FP
                            run: function () { that.schvaleniPolozekFP(); }
                        }),
                        actFinancniKontrola: Gordic.Eko.Action.actionFinancniKontrola({
                            run: function () { that.financniKontrola(); }
                        }),
                        actKontrolaMetadat: Gordic.Eko.Action.actionKontrolaMetadat({
                            run: function () { that.kontrolaMetadat(); }
                        }),
                        actUvolneni: {
                            name: "actUvolneni",
                            enabled: false,
                            caption: "jres:33600526", //RC 33600526 : Uvolnění
                            tooltip: "jres:33600527", //RC 33600527 : Hromadné uvolnění volných prostředků vybraných dokladů
                            run: function () { this.setPending(that.uvolneni()); }
                        },
                        actZmenaUdaju: {
                            name: "actZmenaUdaju",
                            enabled: false,
                            caption: "jres:33600528", //RC 33600528 : Změna údajů
                            tooltip: "jres:33600529", //RC 33600529 : Hromadná změna údajů vybraných dokladů
                            run: function () { this.setPending(that.zmenaUdaju() ?? $.Deferred().reject().promise()); }
                        },
                        actGenerovaniPoukazu: {
                            name: "actGenerovaniPoukazu",
                            enabled: false,
                            caption: "jres:24100079", //RC 24100079 : Generovat poukazy
                            tooltip: "jres:24100082", //RC 24100082 : Generování žádostí na založení poukazů
                            icon: "gi-generate|gi-list gi-stack-pos--rb",
                            run: function () { that.generovaniPoukazu(); }
                        },
                        actGenerovaniPohledavky: {
                            name: "actGenerovaniPohledavky",
                            enabled: false,
                            caption: "jres:24100080", //RC 24100080 : Generovat pohledávky
                            tooltip: "jres:24100081", //RC 24100081 : Generování žádostí na založení pohledávek
                            icon: "gi-generate|gi-list gi-stack-pos--rb",
                            run: function () { that.generovaniPohledavek(); }
                        },
                        actPridatDoPorovnani: Gordic.Eko.Action.actionPridatDoPorovnani({
                            run: function () { WebClient.SmlGrid.Comparator.add(that); }
                        }),
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tema: "sml_ptm_den",
                            serverParameterMethod: "Gordic.Sml.WebClient.GSeznamDokladuSml:PrintParameters",
                            reportStarting: function (rep) { return that.reportStarting(rep); }
                        }),
                        actOdeslat: {
                            name: "actOdeslat",
                            enabled: false,
                            caption: "jres:33600612", //RC 33600612 : Odeslat
                            tooltip: "jres:33600613", //RC 33600613 : Hromadné vygenerování el. obrazů a odeslání vybraných dokladů do výpravny
                            icon: "gi-send",
                            run: function () { that.odeslani(); }
                        },
                        actPolozkyVP: {
                            caption: "jres:24100184", //RC 24100184 : Položky VP
                            icon: "gi-list",
                            tooltip: "jres:24100185", //RC 24100185 : Položky věcného profilu
                            enabled: false,
                            run: function () { that.polozkyVP(); }
                        },
                        actPolozkyFP: {
                            caption: "jres:24100186", //RC 24100186 : Položky FP
                            icon: "gi-list",
                            tooltip: "jres:24100187", //RC 24100187 : Položky finančního profilu
                            enabled: false,
                            run: function () { that.polozkyFP(); }
                        },
                        actInfo: {
                            caption: "jres:24100209", //RC 24100209 : Info
                            icon: "gi-info",
                            enabled: false,
                            run: function () { that.info(); }
                        },
                        actZapisy: {
                            caption: "jres:24100208", //RC 24100208 : Zápisy
                            icon: "gi-list",
                            enabled: false,
                            run: function () { that.zapisy(); }
                        },
                    });
                    // menubar
                    this.menuBar(this.actions.createBar(this.getMenuActions()));
                    // flash se stavem knihy
                    Gordic.Eko.Utils.ShowEkoBookStateFlash(this);
                    // inicializace dokumentu
                    this.beginOperation();
                    WebClient.SmlGrid.dokumentInit().then((dokumentParams) => {
                        // uložení parametrů dokumentu pro další použití
                        that.DokumentParams = dokumentParams;
                        // filtry
                        that.$filterForm = $.newDiv().appendTo(that.element)
                            .gfilterpanel(Gordic.Eko.Filters.getFilterParams(that.getFilters(), undefined, //["s_bvy"],
                        "sml_ptm_den", "ixs_fun_akt", undefined, null, true, that));
                        // sloupce
                        let gridFormat = WebClient.SmlGrid.Doklad.createGridFormat(that);
                        // view
                        that.view = new Gordic.Isl.View(that.isl.DokladSml.list(rq => rq), {
                            filterPanel: that.$filterForm,
                            key: that.PrimaryKey,
                            startEmpty: true
                        });
                        // grid
                        $("<div class='SeznamSml'>")
                            .css("height", "100%")
                            .appendTo(that.element)
                            .ggrid(WebClient.SmlGrid.Doklad.getGridOptions(that, gridFormat, that.actions.actDetail, function (ev, obj) {
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
                            longListCountMethod: (rq) => that.isl.DokladSml.listCount(rq).get(),
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
                                    viewId: "sml:DokladSml"
                                }),
                                Gordic.Previews.getFilePreviewTab({
                                    ixpProvider: function (loadParams) { return loadParams.ixp; }
                                })
                            ]
                        };
                        that.previewController = new Gordic.Previews.GPreviewController(that.element, previewPanelsDefinition);
                        // porovnání
                        WebClient.SmlGrid.Comparator.create(that);
                        // nastavení akcí (je potřeba v případě, že je vypnuté načtení seznamu při spuštění)
                        that.enable();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                //#region Podání a detail
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
                    const aktRadek = Gordic.Eko.Grid.currentRow(this.element.find(".SeznamSml.ggrid"));
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
                 * @param {Gordic.Sml.Interface.GDokladSmlDto} [row] aktuální řádek (pro zobrazení detailu) nebo nevyplněno (pro podání)
                 * @param {SmlGrid.openDetailWizardParams} [wizard] parametry průvodce (v případě volání detailu z průvodce)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                openDetail(content, row, wizard) {
                    let that = this;
                    // zásobník změněných záznamů
                    let changedRows = [];
                    // GPC s knihou z aktuálního záznamu
                    const newGpc = (row ? Gordic.Eko.Utils.createBookGpc(content.gpc, row.ixp_den) : content.gpc);
                    // otevření detailu
                    // zjištění detailového okna
                    let detailID = "DetailDokladuSml";
                    switch (that.TypSeznamuDokladu) {
                        case Sml.Globals.Enums.TypSeznamuDokladu.Smlouva:
                            detailID = "DetailSmlouvy";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.SmlouvaDodavatelska:
                            detailID = "DetailSmlouvyDodavatelske";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.SmlouvaOdberatelska:
                            detailID = "DetailSmlouvyOdberatelske";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.SmlouvaBezRozliseni:
                            detailID = "DetailSmlouvyBezRozliseni";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.SmlouvaBezFP:
                            detailID = "DetailSmlouvyBezFP";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.Objednavka:
                            detailID = "DetailObjednavky";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.ObjednavkaDodavatelska:
                            detailID = "DetailObjednavkyDodavatelske";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.ObjednavkaOdberatelska:
                            detailID = "DetailObjednavkyOdberatelske";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.ObjednavkaBezRozliseni:
                            detailID = "DetailObjednavkyBezRozliseni";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.ObjednavkaBezFP:
                            detailID = "DetailObjednavkyBezFP";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.PrislibNeboJinyPrijem:
                            detailID = "DetailPrislibuNeboJinehoPrijmu";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.PrislibLimitovany:
                            detailID = "DetailPrislibuLimitovaneho";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.PrislibIndividualni:
                            detailID = "DetailPrislibuIndividualniho";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.JinyPrijemIndividualni:
                            detailID = "DetailJinehoPrijmuIndividualniho";
                            break;
                        case Sml.Globals.Enums.TypSeznamuDokladu.JinyPrijemOcekavany:
                            detailID = "DetailJinehoPrijmu";
                            break;
                    }
                    // TODO: po dořešení knih smazat použití proměnných IxpDen, SubradaDen a AktSubradyDen
                    let $detailWindow = content.navigate(["Gordic.Sml.WebClient.G" + detailID, { gpc: newGpc, gridRemoteControl: new Gordic.Components.GridRC(wizard?.grid ?? that.element.find(".SeznamSml.ggrid")) }], {
                        ID: detailID + '#',
                        Ixp: row?.ixp,
                        IxpDen: row?.ixp_den ?? that.getIxpDen(),
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
                                    WebClient.SmlWizard.reloadRows((rq) => { return that.isl.DokladSml.list(rq); }, { ixp: changedRows }, wizard.grid)
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
                /**
                 * Zobrazení detailu soupisky v nové zálozce
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailDoZalozky() {
                    // aktuální vybraná položka
                    const aktRadek = Gordic.Eko.Grid.currentRow(this.element.find(".SeznamSml.ggrid"));
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        // otevření detailu aktuální vybrané položky v nové záložce
                        return WebClient.SmlUtils.openDetailInOtherTab(Sml.Globals.Enums.TypAg.SML, aktRadek.ixp);
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                //#endregion
                //#region Hromadné operace
                /**
                 * Schvalení / zrušení schvalení vybraných dokladů
                 *
                 * @param {boolean} schvalit schválit (true) nebo zrušit schválení (false)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                schvaleni(schvalit) {
                    let that = this;
                    ;
                    // formulář s parametry
                    let formParams = new Gordic.Forms.Form({ name: "wizParams" /*, layoutDescriptor: "L1M1S1, L-3-7-2, M-3-7-2, S-12-12-0"*/ }).addSection();
                    if (schvalit) {
                        if (that.dbparams?.sml_rad_valele === 1) {
                            formParams.addRow( /*"El. obraz"*/).addField("gcheck", { name: "i_bez_el_obrazu", label: "jres:24100219" }); //RC 24100219 : schválit, aniž by existoval elektronický obraz
                        }
                        if (that.dbparams?.sml_rad_valpub === 1) {
                            formParams.addRow( /*"Zveřejnění"*/).addField("gcheck", { name: "i_bez_zverejneni", label: "jres:24100220" }); //RC 24100220 : schválit, aniž by byl doklad zveřejněn
                        }
                    }
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "SchvaleniDokladuSml#",
                        texts: {
                            title: schvalit
                                ? "Schválení"
                                : "Zrušení schválení",
                            description: schvalit
                                ? "Akce schválí vybrané (zaškrtnuté) doklady. Po jejím provedení budou tyto doklady ve stavu 'schválen'"
                                : "Akce zruší schválení vybraných (zaškrtnutých) dokladů. Po jejím provedení budou tyto doklady ve stavu 'evidován'",
                            operationAction: schvalit ? that.actions.actSchvaleni.caption : that.actions.actZruseniSchvaleni.caption,
                        },
                        parameters: {
                            form: formParams,
                            model: { i_bez_el_obrazu: null, i_bez_zverejneni: null },
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    schvalit: schvalit,
                                    i_bez_el_obrazu: model?.i_bez_el_obrazu ?? false,
                                    i_bez_zverejneni: model?.i_bez_zverejneni ?? false
                                };
                            },
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredSchvalenim(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadneSchval(dto); },
                        },
                        end: {
                            callingAction: schvalit ? that.actions.actSchvaleni : that.actions.actZruseniSchvaleni
                        }
                    });
                }
                /**
                 * Schvalení položek FP vybraných dokladů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                schvaleniPolozekFP() {
                    let that = this;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "SchvaleniPolozekFPDokladuSml#",
                        texts: {
                            title: "Schválení položek FP",
                            description: "Akce schválí položky FP vybraných (zaškrtnutých) dokladů",
                            operationAction: that.actions.actSchvaleniPolozekFP.caption,
                        },
                        parameters: {
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    schvalit: true
                                };
                            },
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredSchvalenimPolozekFP(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadneSchvalPolozkyFP(dto); },
                        },
                        end: {
                            callingAction: that.actions.actSchvaleniPolozekFP
                        }
                    });
                }
                /**
                 * Podepsání / zrušení podepsání vybraných dokladů
                 *
                 * @param {boolean} podepsat podepsat (true) nebo zrušit podepsání (false)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                podepsani(podepsat) {
                    let that = this;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "PodepsaniDokladuSml#",
                        texts: {
                            title: podepsat
                                ? "Podepsání"
                                : "Zrušení podepsání",
                            description: podepsat
                                ? "Akce podepíše vybrané (zaškrtnuté) doklady. Po jejím provedení budou tyto doklady ve stavu 'podepsán'"
                                : "Akce zruší podepsání vybraných (zaškrtnutých) dokladů. Po jejím provedení budou tyto doklady ve stavu 'schválen'",
                            operationAction: podepsat ? that.actions.actPodepsani.caption : that.actions.actZruseniPodepsani.caption,
                        },
                        parameters: {
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    podepsat: podepsat
                                };
                            },
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredPodepsanim(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadnePodepis(dto); },
                        },
                        end: {
                            callingAction: podepsat ? that.actions.actPodepsani : that.actions.actZruseniPodepsani
                        }
                    });
                }
                /**
                 * Ukončení / zrušení ukončení vybraných dokladů
                 *
                 * @param {boolean} ukoncit ukončit (true) nebo zrušit ukončení (false)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                ukonceni(ukoncit) {
                    let that = this;
                    ;
                    // formulář s parametry
                    let formParams = new Gordic.Forms.Form({ name: "wizParams" /*, layoutDescriptor: "L1M1S1, L-3-7-2, M-3-7-2, S-12-12-0"*/ }).addSection();
                    if (ukoncit) {
                        // TODO: tady asi žádná dopředu známá podmínka není, ale ještě to překontrolovat
                        formParams.addRow( /*"Zveřejnění"*/).addField("gcheck", { name: "i_bez_vazby_na_doklad_cerpani", label: "jres:24100217" }); //RC 24100217 : ukončit, i když doklad není vázán na doklady realizující čerpání prostředků (doklady rezervačních agend, objednávky)
                        if (that.dbparams?.ssl_vyrkonmet === 1) {
                            formParams.addRow( /*"El. obraz"*/).addField("gcheck", { name: "i_pri_chybnych_metadatech", label: "jres:24100218" }); //RC 24100218 : ukončit i při zjištění nesrovnalostí v kontrole metadat
                        }
                    }
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "UkonceniDokladuSml#",
                        texts: {
                            title: ukoncit
                                ? "Ukončení"
                                : "Zrušení ukončení",
                            description: ukoncit
                                ? "Akce ukončí vybrané (zaškrtnuté) doklady. Po jejím provedení budou tyto doklady ve stavu 'ukončen'"
                                : "Akce zruší ukončení vybraných (zaškrtnutých) dokladů. Po jejím provedení budou tyto doklady ve stavu 'podepsán'",
                            operationAction: ukoncit ? that.actions.actUkonceni.caption : that.actions.actZruseniUkonceni.caption,
                        },
                        parameters: {
                            form: formParams,
                            model: { i_bez_vazby_na_doklad_cerpani: null, i_pri_chybnych_metadatech: null },
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    ukoncit: ukoncit,
                                    i_bez_vazby_na_doklad_cerpani: model?.i_bez_vazby_na_doklad_cerpani ?? false,
                                    i_pri_chybnych_metadatech: model?.i_pri_chybnych_metadatech ?? false
                                };
                            },
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredUkoncenim(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadneUkonci(dto); },
                        },
                        end: {
                            callingAction: ukoncit ? that.actions.actUkonceni : that.actions.actZruseniUkonceni
                        }
                    });
                }
                /**
                 * Storno / zrušení storna vybraných dokladů
                 *
                 * @param {boolean} stornovat stornovat (true) nebo zrušit storno (false)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                storno(stornovat) {
                    let that = this;
                    ;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "StornoDokladuSml#",
                        texts: {
                            title: stornovat
                                ? "jres:24100050" //RC 24100050 : Storno
                                : "jres:24100051", //RC 24100051 : Zrušení storna
                            description: stornovat
                                ? "jres:24100046" //RC 24100046 : Akce stornuje vybrané (zaškrtnuté) doklady. Po jejím provedení budou tyto doklady ve stavu 'stornován'
                                : "jres:24100047", //RC 24100047 : Akce zruší storno vybraných (zaškrtnutých) dokladů. Po jejím provedení budou tyto doklady ve stavu 'evidován'
                            formTabTitle: stornovat
                                ? "jres:24100048" //RC 24100048 : Parametry storna
                                : "jres:24100049", //RC 24100049 : Parametry zrušení storna
                            operationAction: stornovat ? that.actions.actStorno.caption : that.actions.actZruseniStorna.caption,
                        },
                        parameters: {
                            form: new Gordic.Forms.Form({ name: "wizParams" }).addSection().addRow("jres:24100043").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()], smartNavNextElement: function (cur, next) { return $.content(this)?.element.find("button[data-param-id='checkAct']")[0]; } }), //RC 24100043 : Důvod
                            model: { duvod: null },
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    stornovat: stornovat,
                                    duvod: (model != null && model.duvod != null ? model.duvod : "jres:24100044") //RC 24100044 : nezadán
                                };
                            },
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredStornem(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadneStornuj(dto); },
                        },
                        end: {
                            callingAction: stornovat ? that.actions.actStorno : that.actions.actZruseniStorna
                        }
                    });
                }
                /**
                 * Rezervace v IISSP
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                rezervaceIissp() {
                    let that = this;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "RezervaceIissp#",
                        texts: {
                            title: "Rezervace v IISSP",
                            description: "Akce rezervuje vybrané (zaškrtnuté) doklady, resp. jejich případy, v IISSP",
                            operationAction: that.actions.actRezervaceIissp.caption,
                        },
                        parameters: {
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    rezervovat: true,
                                    ixs_ref: that.IxsRef,
                                    rok: that.Rok
                                };
                            },
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredRezervaciVIissp(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadneRezervujVIissp(dto); },
                        },
                        end: {
                            callingAction: that.actions.actRezervaceIissp
                        }
                    });
                    //return that.wizardTwoSteps<Gordic.Iissp.Interface.GIisspRezervacePripaduGroupDto>(
                    //    {
                    //        id: "RezervaceIissp#",
                    //        texts: {
                    //            title: "Rezervace v IISSP",
                    //            description: "Akce rezervuje vybrané (zaškrtnuté) doklady v IISSP",
                    //            operationAction: that.actions.actRezervaceIissp!.caption,
                    //        },
                    //        parameters: {
                    //            withoutPreCheck: true,
                    //            toOperationDto: (model, data, ikc) => {
                    //                let xxx = data.map(doklad => {
                    //                    return {
                    //                        /**id případu v GINIS*/
                    //                        ixs_hpr: doklad.ixp_sml_pri,
                    //                        /**id rezervace v IISSP*/
                    //                        ixs_ref: that.IxsRef,
                    //                        /**ico*/
                    //                        ico: that.gpc.ico,
                    //                        /**ucs*/
                    //                        ucs: that.gpc.ucs,
                    //                        /**rok*/
                    //                        rok: that.Rok,
                    //                        /**pid_rd*/
                    //                        //pid_rd?: string | null;
                    //                        /**Hromadná rezervace*/
                    //                        hromadna: true,
                    //                        /**Maximální úroveň hlášení, dle významnosti. E - chyba, W - varování, I - informace.*/
                    //                        //typ_maximum?: string | null;
                    //                        /**doklady*/
                    //                        //doklady?: Gordic.Iissp.Interface.GIisspRezervaceDokladuDto[] | null;
                    //                    }
                    //                });
                    //                return { pripady: xxx };
                    //            },
                    //        },
                    //        actions: {
                    //            islCheckBeforeOperation: (dto) => {
                    //                xxx
                    //                // TODO: dodělat nějakou kontrolu před rezervací v IISSP
                    //                /*return that.isl.DokladSml.zkontrolujPredUkoncenim(dto);*/
                    //            },
                    //            islOperation: (dto) => { return that.isl.IisspRezervacePripadu.rezervujPripadHrom(dto); },
                    //        },
                    //        end: {
                    //            callingAction: that.actions.actRezervaceIissp
                    //        }
                    //    }
                    //);
                }
                /**
                 * Předání vybraných dokladů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                predani() {
                    let that = this;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "PredaniDokladu#",
                        texts: {
                            title: "Předání",
                            description: "Akce předá vybrané (zaškrtnuté) doklady jinému zpracovateli.",
                            operationAction: that.actions.actPredani.caption,
                        },
                        parameters: {
                            // TODO: dořešit KtgDen - na detailu to mám, ale je otázka, jestli tam skutečně jsou nějaké hodnoty
                            form: WebClient.SmlDoklad.getFormPredani(/*Globals.Enums.KtgDen.ZapoctoveListy*/ [], $.content("main").IxsFunAkt, that.IxsSu, that.getIxpDen()),
                            model: { ixs_su: null, ixs_fun_akt: null, Kompetent: null, ixs_fun_vyriz: null, cis_real: null },
                            toOperationDto: (model, data, ikc) => WebClient.SmlDoklad.ToPredaniOperationDto(data, model, ikc),
                            withoutPreCheck: true,
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredPredanim(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadnePredej(dto); },
                        },
                        end: {
                            callingAction: that.actions.actPredani
                        }
                    });
                }
                /**
                 * Převzetí vybraných dokladů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                prevzeti() {
                    let that = this;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "PrevzetiDokladu#",
                        texts: {
                            title: "Převzetí",
                            description: "Akce převezme vybrané (zaškrtnuté) doklady od jiného zpracovatele.",
                            operationAction: that.actions.actPrevzeti.caption,
                        },
                        parameters: {
                            form: WebClient.SmlDoklad.getFormPrevzeti($.content("main").IxsFunAkt),
                            model: { ixs_su: null, ixs_fun_akt: null, Kompetent: null, ixs_fun_vyriz: null, cis_real: null },
                            toOperationDto: (model, data, ikc) => WebClient.SmlDoklad.ToPrevzetiOperationDto(data, model, ikc),
                            withoutPreCheck: true,
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredPrevzetim(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadnePrevezmi(dto); },
                        },
                        end: {
                            callingAction: that.actions.actPrevzeti
                        }
                    });
                }
                /**
                 * Přidělení vybraných dokladů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                prideleni() {
                    let that = this;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "PrideleniDokladu#",
                        texts: {
                            title: "Přidělení",
                            description: "Akce přidělí vybrané (zaškrtnuté) doklady jinému zpracovateli.",
                            operationAction: that.actions.actPrideleni.caption,
                        },
                        parameters: {
                            // TODO: dořešit KtgDen - na detailu to mám, ale je otázka, jestli tam skutečně jsou nějaké hodnoty
                            form: WebClient.SmlDoklad.getFormPrideleni(/*Globals.Enums.KtgDen.ZapoctoveListy*/ [], $.content("main").IxsFunAkt, that.IxsSu, that.getIxpDen()),
                            model: { ixs_su: null, ixs_fun_akt: null },
                            toOperationDto: (model, data, ikc) => WebClient.SmlDoklad.ToPrideleniOperationDto(data, model, ikc),
                            withoutPreCheck: true,
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredPridelenim(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadnePridel(dto); },
                        },
                        end: {
                            callingAction: that.actions.actPrideleni
                        }
                    });
                }
                /**
                 * Přeevidence vybraných dokladů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                preevidence() {
                    let that = this;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "PreevidenceDokladu#",
                        texts: {
                            title: "Přeevidence",
                            description: "Akce přeeviduje vybrané (zaškrtnuté) doklady do jiné knihy. Při přeevidenci je možné změnit zpracovatele.",
                            operationAction: that.actions.actPreevidence.caption,
                        },
                        parameters: {
                            // TODO: dořešit KtgDen - na detailu to mám, ale je otázka, jestli tam skutečně jsou nějaké hodnoty
                            form: WebClient.SmlDoklad.getFormPreevidence(/*Globals.Enums.KtgDen.ZapoctoveListy*/ [], that.gpc.ico, that.gpc.ucs, that.IxsSu, that.getIxpDen(), that.dbparams.sml_rad_pfksto, that.dbparams.eko_rad_dfken),
                            model: { ixp_den: null, subrada: null, ixs_su: null, ixs_fun_akt: null, ixs_fun_vyriz: null, cis_real: null },
                            toOperationDto: (model, data, ikc) => WebClient.SmlDoklad.ToPreevidenceOperationDto(data, model, ikc),
                            withoutPreCheck: true,
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredPreevidovanim(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadnePreeviduj(dto); },
                        },
                        end: {
                            callingAction: that.actions.actPreevidence
                        }
                    });
                }
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
                            // TODO: nebo SmlGrid.Doklad.createGridFormat(content, true)?
                            GridFormat: WebClient.SmlWizard.getCurrentGridFormat(that.element.find(".SeznamSml.ggrid") /*, true*/),
                            ColumnList: that.element.find(".SeznamSml.ggrid").ggrid("getCurrentProfile").columnList ?? "",
                            KontrolaZaznamu: (data) => {
                                return that.isl.PripadSml.zkontrolujPredFinancniKontrolou({
                                    // do metody vstupují udaje případu, tj. z dokladu jen ixp_sml_pri
                                    rows: data.map((it) => { return { ixp_sml_pri: it.ixp_sml_pri }; }),
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
                                    var dto = that.element.find(".SeznamSml.ggrid").ggrid("getSelection", false, true).find((elem) => elem.ixp == ixp);
                                    let UPD = {
                                        // TODO: zkontrolovat, jestli je to správně
                                        ac_ag: dto?.ac_sml,
                                        c_celk: dto?.pripad?.c,
                                        c_mena: dto?.c_mena,
                                        mena: dto?.mena,
                                        dat_spl: dto?.dat_platnost,
                                        ixs_typ: dto?.ixs_typ,
                                        ixs_esu: dto?.ixs_esu,
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
                            NazevIdentifikatoru: "ixp_sml_pri" /* Gordic.Sml.Interface.GDokladSmlDtoNames.ixp_sml_pri */,
                            TypKontroly: 0 /* Gordic.Wfl.Interface.GFinancniKontrolaTypKontroly.FK */,
                            OmezitKtgTyp: 20 /* Gordic.Wfl.Interface.GHFinancniKontrolaOmezitKtgTyp.Vsechny */,
                            InputDto: zaznamy,
                            // TODO: co režim knih všech let?
                            Rok: that.ekoBook.rok
                        });
                        return $.Deferred().resolve().promise();
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Kontrola metadat
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                kontrolaMetadat() {
                    let that = this;
                    //const $grid = this.element.find(".SeznamSml.ggrid");
                    const zaznamy = this.element.find(".SeznamSml.ggrid").ggrid("getSelection");
                    if (zaznamy !== null && zaznamy.length > 0) {
                        // volání komponenty
                        return Gordic.Eko.Utils.KontrolaMetadat({
                            content: that,
                            listIxp: zaznamy.map(row => row.ixp),
                            // TODO: je ten rok správně, neměl by tam být rok podle aktuální knihy? zkusit na dokladu přeevidovaném do knihy jiného roku ...
                            //listIxpRok: zaznamy.map<Eko.Interface.GEkoPidRokDto>(row => { return { Ixp: row.ixp, Rok: row.rok }; }),
                            detailAkce: (cnt, ixp) => that.openDetail(cnt, { ixp: ixp })
                        })
                            // TODO: zatím se seznam občerstvuje vždy, protože komponenta (na rozdíl od průvodce) nevrací informaci, jestli tam byly nějaké změny nebo ne
                            // TODO: má být občerstvení v done nebo then?
                            .done(() => { that.view.requestData({ withoutLongLimit: true }); });
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Generování žádostí o založení poukazů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                generovaniPoukazu() {
                    let that = this;
                    ;
                    // načtení defaultních hodnot parametrů
                    return this.isl.DokladSml.readDefaultsForGenerujPoukaz()
                        .getData()
                        .then(function (defaults) {
                        //let defaultModel: generovatModel = {
                        //    ixs_ste: defaults.ixs_ste ?? null,
                        //    ixp_den: defaults.ixp_den ?? null,
                        //    ixs_typ: defaults.ixs_typ ?? null,
                        //    ks: defaults.ks ?? null,
                        //    ss: defaults.ss ?? null,
                        //    bu_vl_grp: defaults.bu_vl_grp ?? false
                        //};
                        // volání průvodce
                        return that.wizardTwoSteps({
                            id: "GenerovaniPoukazu#",
                            texts: {
                                title: "jres:24100086", //RC 24100086 : Generování poukazů
                                description: "jres:24100087", //RC 24100087 : Akce vygeneruje žádosti o založení poukazů k vybraným (zaškrtnutým) dokladům
                                formTabTitle: "jres:24100085", //RC 24100085 : Parametry generování
                                operationAction: that.actions.actGenerovaniPoukazu.caption,
                            },
                            parameters: {
                                form: new Gordic.Forms.Form({ name: "wizParams" })
                                    .addSection()
                                    .addRow("jres:24100202").addField("gselectbox", Gordic.Prefabs.Select.bplsste(Sml.Globals.Enums.TypAg.POU), {
                                    name: "ixs_ste",
                                    model: "ixs_ste=ixs_ste;ixs_ste_txt=nazev",
                                    // TODO: založit konstantu na typ_ste?
                                    serverFilters: { typ_ste: 50, aktivita: 100 },
                                    flag: Gordic.Prefabs.Field.Flags.required,
                                    validators: [new Gordic.Validators.Required()]
                                })
                                    .addRow("jres:24100203").addField("gselectbox", Gordic.Prefabs.Select.ekosden(Sml.Globals.Enums.TypAg.POU), {
                                    dropdown: true,
                                    name: "ixp_den",
                                    model: "ixp_den=ixp_den;ixp_den_txt=ixp_den_txt",
                                    serverFilters: { typ_ag: Sml.Globals.Enums.TypAg.POU, ktg_den: Sml.Globals.Enums.KtgDen.Poukazy, rok: that.Rok, ico: that.Ico, ucs: that.Ucs, aktivita: 100, pouzeAktObd: true }
                                })
                                    .addRow("jres:33600107").addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                                    dropdown: true,
                                    name: "ixs_typ",
                                    model: "ixs_typ=ixs_typ;ixs_typ_txt=nazev;ktg_typ=ktg_typ",
                                    flag: Gordic.Prefabs.Field.Flags.required,
                                    validators: [new Gordic.Validators.Required()],
                                    serverFilters: { ktg_typ: 1380, aktivita: 100 }
                                })
                                    .addRow("jres:24100205").addField("gselectbox", "w-6", Gordic.Prefabs.Select.ekoskos(), { name: "ks", model: "ks=ks" }).addField("gstringbox", "w-6", { name: "ss" }) //RC 24100205 : KS, SS
                                    .addRow().addField("gcheck", {
                                    name: "bu_vl_grp",
                                    label: "jres:24100204", //RC 24100204 : kumulovat položky FP dle vlastního BÚ
                                    smartNavNextElement: function (cur, next) { return $.content(this)?.element.find("button[data-param-id='checkAct']")[0]; }
                                }),
                                //model: defaultModel/*{ ixs_ste: ixs_ste1, ixp_den: ixp_den1, ixs_typ: ixs_typ1, ks: null, ss: null, bu_vl_grp: false }*/,
                                model: {
                                    ixs_ste: defaults.ixs_ste ?? null,
                                    ixp_den: defaults.ixp_den ?? null,
                                    ixs_typ: defaults.ixs_typ ?? null,
                                    ks: defaults.ks ?? null,
                                    ss: defaults.ss ?? null,
                                    bu_vl_grp: defaults.bu_vl_grp ?? false
                                },
                                toOperationDto: (model, data, ikc) => {
                                    return {
                                        ikc: ikc,
                                        rows: data,
                                        generovat: true,
                                        ixs_ste: (model != null && model.ixs_ste != null ? model.ixs_ste : ""),
                                        ixp_den: (model != null && model.ixp_den != null ? model.ixp_den : ""),
                                        ixs_typ: (model != null && model.ixs_typ != null ? model.ixs_typ : ""),
                                        ks: (model != null && model.ks != null ? model.ks : ""),
                                        ss: (model != null && model.ss != null ? model.ss : ""),
                                        bu_vl_grp: (model?.bu_vl_grp ?? false) === true
                                    };
                                },
                            },
                            actions: {
                                islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredGenerovanimPoukazu(dto); },
                                islOperation: (dto) => { return that.isl.DokladSml.hromadneGenerujPoukaz(dto); },
                            },
                            end: {
                                callingAction: that.actions.actGenerovaniPoukazu
                            }
                        });
                    });
                }
                /**
                 * Generování žádostí o založení pohledávek
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                generovaniPohledavek() {
                    let that = this;
                    ;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "GenerovaniPohledavek#",
                        texts: {
                            title: "jres:24100083", //RC 24100083 : Generování pohledávek
                            description: "jres:24100084", //RC 24100084 : Akce vygeneruje žádosti o založení pohledávek k vybraným (zaškrtnutým) dokladům
                            formTabTitle: "jres:24100085", //RC 24100085 : Parametry generování
                            operationAction: that.actions.actGenerovaniPohledavky.caption,
                        },
                        parameters: {
                            model: {},
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    generovat: true
                                };
                            },
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredGenerovanimPohledavky(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadneGenerujPohledavku(dto); },
                        },
                        end: {
                            callingAction: that.actions.actGenerovaniPohledavky
                        }
                    });
                }
                /**
                 * Hromadné odeslání dokladů do výpravny
                 * @returns
                 */
                odeslani() {
                    let that = this;
                    let tema = "sml_ptm_prtsml";
                    if (this.ktg_den == 1690 /*ng_ktgdenLimPrislib*/) {
                        tema = "sml_ptm_prtlim";
                    }
                    else if (this.ktg_den == 1691 /*ng_ktgdenIndPrislib*/) {
                        tema = "sml_ptm_prtind";
                    }
                    else if (this.ktg_den == 1625 /*ng_ktgdenKDSObj*/ || this.ktg_den == 1645 /*ng_ktgdenKOSObj*/ ||
                        this.ktg_den == 1675 /*ng_ktgdenOBJ*/ || this.ktg_den == 1680 /*ng_ktgdenOBJNoEko*/) {
                        tema = "sml_ptm_prtobj";
                    }
                    //this.actions.add(Gordic.Eko.Action.actionTisk({
                    //    name: "actTiskOdeslat",
                    //    enabled: true,
                    //    tema: tema,
                    //    ixsStr: this.dbparams.sml_ptm_prtsml,
                    //    serverRestrictionAlfMethod: (this.ktg_den == 1691 /*ng_ktgdenIndPrislib*/) ? "Gordic.Sml.WebClient.GSeznamDokladuSml:GetRestrictionAlfOdeslat" : void 0,
                    //    serverRestrictionAlvMethod: (this.ktg_den == 1691 /*ng_ktgdenIndPrislib*/) ? "Gordic.Sml.WebClient.GSeznamDokladuSml:GetRestrictionAlvOdeslat" : void 0,
                    //    serverParameterMethod: "Gordic.Sml.WebClient.GSeznamDokladuSml:PrintParametersOdeslat",
                    //    reportStarting: function (rep) {
                    //        rep.customDto = { ixp: "A446X000RB1E" }; //TODO: zatím natvrdo, protože si nejsem jistý, jak to správně předat u hromadného
                    //    },
                    //    reportFinished: function (ev, rep) {
                    //        debugger;
                    //    }
                    //}))
                    let reportInfo;
                    let reportDto;
                    let form = new Gordic.Forms.Form()
                        .addRow("jres:33600601", true) //RC 33600601 : Sestava
                        .addField("gselectbox", Gordic.Prefabs.Select.reports({
                        reportsOptions: {
                            Tema: tema /*"ddp_ptm_nvy"*/ /*"sml_ptm_den"*/,
                            IxsStr: this.dbparams.sml_ptm_prtsml,
                            ServerRestrictionAlfMethod: (this.ktg_den == 1691 /*ng_ktgdenIndPrislib*/) ? "Gordic.Sml.WebClient.GSeznamDokladuSml:GetRestrictionAlf" : void 0,
                            ServerRestrictionAlvMethod: (this.ktg_den == 1691 /*ng_ktgdenIndPrislib*/) ? "Gordic.Sml.WebClient.GSeznamDokladuSml:GetRestrictionAlv" : void 0
                        }
                    }), {
                        name: "reportId",
                        model: "model.reportId=value.reportId",
                        validators: [new Gordic.Validators.Required(),
                            new Gordic.Validators.Base({
                                validateWithMessage: (value, src) => {
                                    if (reportInfo) {
                                        if (!(reportInfo.typVyst == "TXT" || reportInfo.typVyst == "RTF" || reportInfo.typVyst == "XME")) {
                                            return "jres:33600602"; //RC 33600602 : Vybranou sestavu nelze uložit do výstupního formátu PDF
                                        }
                                        if (parseInt(reportInfo.commonInfos?.ZPUS_ULOZ ?? "0") == 0) {
                                            return "jres:33600603"; //RC 33600603 : Zvolená tisková sestava nemá nastaven způsob uložení do elektronického uložiště. Kontaktujte administrátora systému.
                                        }
                                    }
                                    return null;
                                }
                            })
                        ],
                        change: (ev, ctx) => {
                            const cnt = $.content(ev.target);
                            reportInfo = void 0;
                            reportDto = void 0;
                            if (ctx?.value) {
                                reportDto = ctx.value;
                                cnt.beginOperation("jres:33600604"); //RC 33600604 : Načítání podrobností o sestavě
                                Gordic.Report.WebClient.GReportTreeControlTS.getReportInfo(ctx.value.reportId ?? "", ctx.value.rokMesDo).then((res) => {
                                    if (res) {
                                        reportInfo = res;
                                        $(ev.target).gfield("validate");
                                    }
                                }).always(() => { cnt.endOperation(); });
                            }
                        }
                    });
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "OdeslatDoVypravny#",
                        texts: {
                            title: "jres:33600605", //RC 33600605 : Hromadné vygenerování el. obrazů a odeslání do výpravny
                            description: "jres:33600606", //RC 33600606 : Akce vygeneruje asynchronně (na pozadí) el. obrazy vybraným (zaškrtnutým) dokladům a v notifikačním centru poté nabídne odeslání do výpravny.
                            operationAction: "jres:33600607", //RC 33600607 : Vygenerovat a odeslat
                        },
                        parameters: {
                            form: form,
                            model: {},
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: this.Ikc.toString(),
                                    rows: data,
                                    reportId: model?.reportId ?? void 0
                                };
                            },
                            withoutPreCheck: false
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DokladSml.zkontrolujPredOdeslanimDoVypravny(dto); },
                            islOperation: (dto) => { return that.isl.DokladSml.hromadnePripravOdeslaniDoVypravny(dto); },
                            getData: (withResults, ikcOrData, response) => {
                                const gridFormat = WebClient.SmlWizard.getCurrentGridFormat(that.element.find(".SeznamSml.ggrid") /*, true*/);
                                const fragments = WebClient.SmlWizard.getFragmentsFromGridFormat(gridFormat /*, true*/);
                                return that.wizardGetData(withResults, withResults, ikcOrData, fragments, response).then((res) => {
                                    //(this.actions.actTiskOdeslat as GPrintActionType).run();
                                    let validIxps = response.result.filter((item) => { return item.kind === 200 /* Gordic.Isl.GOperationResultKind.Success */; }).map(item => item.data.ixp);
                                    const params = new Array(); //Kolik instanci parametru, tolikrat se bude generovat sestava
                                    for (let item of validIxps) {
                                        var val = { X0003: this.Ico, X0004: this.Ucs, X0005: this.Nks, X0006: item, IXP: item };
                                        params.push(val);
                                    }
                                    const platnost = this.Rok.toString() + (this.Mesic?.toString() ?? "");
                                    //vyvolání sestavy v návrh, zda nevyhodí nějaký dialog a případné předání parametrů pro tisk
                                    let navrhDialog = $.newDiv().gcontent([Gordic.Report.WebClient.GReportPreview, {
                                            input: {
                                                dto: {
                                                    //reportId: "0000STR003LA/0000ALV0773Z/0000ALF04GKE/0"/*"GZNOSTR0A04U/0000ALV02HDG/0000ALF02RTQ/0"*/,
                                                    reportId: reportDto?.reportId ?? "",
                                                    platnost: platnost,
                                                    params: (params?.length > 0) ? params[0] : void 0 //pokud je více parametrů, tak návrh pustím pouze s prvním
                                                }
                                            }
                                        }]);
                                    const navrhCnt = $.content(navrhDialog);
                                    return navrhCnt.initAwait.then(() => { return navrhCnt.getParams(); })
                                        .then((pars) => {
                                        const scheduledParams = pars;
                                        Gordic.Async.GTaskManager.start("Gordic.Eko.Server.GOdeslatMultipleReportsAsyncTask", {
                                            Platnost: platnost,
                                            ReportId: reportDto?.reportId,
                                            Parameters: params,
                                            ScheduledParams: scheduledParams,
                                            Ikc: this.Ikc
                                        });
                                        return res;
                                    });
                                });
                            }
                        },
                        end: {
                            callingAction: that.actions.actOdeslat
                        }
                    });
                }
                /**
                 * Hromadná uvolnění prostředků dokladů
                 */
                uvolneni() {
                    let grid = this.element.find(".SeznamSml.ggrid");
                    let rows = Gordic.Eko.Grid.checkedRows(grid);
                    if ((rows?.length ?? 0) < 1) {
                        return $.Deferred().reject().promise();
                    } //nevybrán žádný řádek
                    let gf = grid.ggrid("getCurrentProfile");
                    return WebClient.hromadneUvolneniWizard(this, 0, rows, WebClient.SmlGrid.Doklad.createGridFormat(this), { columnList: gf.columnList, columns: gf.columns, sort: gf.sort }, grid.ggrid("getView").keys).then((completed) => {
                        //pokud vše proběhlo, tak refreshnu seznam
                        if (completed === "completed") {
                            this.view.requestData({ withoutLongLimit: true });
                        }
                    });
                }
                /**
                 * Hromadná změna údajů dokladů
                 */
                zmenaUdaju() {
                    let grid = this.element.find(".SeznamSml.ggrid");
                    let rows = Gordic.Eko.Grid.checkedRows(grid);
                    if ((rows?.length ?? 0) < 1) {
                        return $.Deferred().reject().promise();
                    } //nevybrán žádný řádek
                    let gf = grid.ggrid("getCurrentProfile");
                    return WebClient.hromadnaZmenaUdajuWizard(this, rows, WebClient.SmlGrid.Doklad.createGridFormat(this), { columnList: gf.columnList, columns: gf.columns, sort: gf.sort }, grid.ggrid("getView").keys).then((completed) => {
                        //pokud vše proběhlo, tak refreshnu seznam
                        if (completed === "completed") {
                            this.view.requestData({ withoutLongLimit: true });
                        }
                    });
                }
                /**
                 * Zobrazení položek finančního profilu
                 */
                polozkyFP() {
                    let that = this;
                    const aktRadek = Gordic.Eko.Grid.currentRow(this.element.find(".SeznamSml.ggrid"));
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        that.beginOperation();
                        return that.isl.DokladSml.read({ ixp: aktRadek.ixp, fragments: ["*", "Permissions.*"] })
                            .getData()
                            .then(function (data) {
                            that.endOperation();
                            if (data.Permissions?.LzePolozkyFP?.value === true) {
                                return Sml.Dialogs.GSmlPolozkyFPDlg({
                                    parentContent: that,
                                    opt: {
                                        smlpid: data
                                    },
                                    ModOtevreni: Gordic.Global.Enums.ModOtevreni.navigate
                                }).then((ctx) => {
                                    if (ctx ?? false) {
                                        that.view.requestData({ filters: { ixp: [aktRadek.ixp] }, onlyPKWithoutFilters: true }, { updateMode: "update" });
                                    }
                                });
                            }
                            else
                                return that.dialogs.alert("Položky FP", data.Permissions?.LzePolozkyFP.message || "Nemáte oprávnění k zobrazení položek FP").createDialogPromise();
                        });
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Zobrazení položek věcného profilu
                 */
                polozkyVP() {
                    let that = this;
                    const aktRadek = Gordic.Eko.Grid.currentRow(this.element.find(".SeznamSml.ggrid"));
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        that.beginOperation();
                        return that.isl.DokladSml.read({ ixp: aktRadek.ixp, fragments: ["*", "Permissions.*"] })
                            .getData()
                            .then(function (data) {
                            that.endOperation();
                            if (data.Permissions?.LzePolozkyVP?.value === true) {
                                let visitor = new Gordic.Sml.WebClient.GSmlVecnyProfilVisitor({
                                    dao: new Gordic.Sml.WebClient.GVecnyProfilSmlDAO({ ixp: aktRadek.ixp }),
                                    ixp: aktRadek.ixp,
                                    smlpid_p: data
                                });
                                let cnt = that.navigate([Gordic.Eko.WebClient.GVecnyProfilSeznam, {}]);
                                const vpContent = $.content(cnt);
                                vpContent.readyAwait.then(() => {
                                    vpContent.accept(visitor);
                                    vpContent.init();
                                });
                                cnt.on("closed", (ev, changed) => {
                                    if (changed) {
                                        that.view.requestData({ filters: { ixp: [aktRadek.ixp] }, onlyPKWithoutFilters: true }, { updateMode: "update" });
                                    }
                                });
                                return cnt.promise();
                            }
                            else
                                return that.dialogs.alert("Položky VP", data.Permissions?.LzePolozkyFP.message || "Nemáte oprávnění k zobrazení položek VP").createDialogPromise();
                        });
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Zobrazení okna Info k dokladu
                 */
                info() {
                    let that = this;
                    const aktRadek = Gordic.Eko.Grid.currentRow(this.element.find(".SeznamSml.ggrid"));
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        that.beginOperation();
                        return that.isl.DokladSml.read({ ixp: aktRadek.ixp, fragments: ["*", "Permissions.*"] })
                            .getData()
                            .then(function (data) {
                            that.endOperation();
                            // poznámka: permission není potřeba řešit, protože info nemá svoje oprávnění
                            // poznámka: info neumožňuje aktivní operace, tak není potřeba řešit reload změněných dat
                            return Sml.Dialogs.GSmlInfoDlg({
                                parentContent: that,
                                opt: {
                                    smlpid: data
                                },
                                ModOtevreni: Gordic.Global.Enums.ModOtevreni.navigate
                            });
                        });
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Zobrazení zápisů dokladu
                 */
                zapisy() {
                    let that = this;
                    const aktRadek = Gordic.Eko.Grid.currentRow(this.element.find(".SeznamSml.ggrid"));
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        that.beginOperation();
                        return that.isl.DokladSml.read({ ixp: aktRadek.ixp, fragments: ["*", "Permissions.*"] })
                            .getData()
                            .then(function (data) {
                            that.endOperation();
                            // poznámka: permission není potřeba řešit, protože zápisy nemají svoje oprávnění
                            // poznámka: zápisy neumožňují aktivní operace, tak není potřeba řešit reload změněných dat
                            return Sml.Dialogs.GSmlZapisyDlg({
                                parentContent: that,
                                opt: {
                                    ixp_sml_pri: data.ixp_sml_pri,
                                    cislo: null,
                                    ixp: data.ixp,
                                    ac_sml: data.ac_sml
                                },
                                ModOtevreni: Gordic.Global.Enums.ModOtevreni.navigate
                            });
                        });
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Průvodce nad seznamem dokladů <DTO operace, model parametrů>
                 *
                 * @param {SmlWizard.SmlWizardParams<TOperationDto, TModel, Sml.Interface.GDokladSmlDto> | SmlWizard.SmlWizardParamsPart<TOperationDto, TModel, Sml.Interface.GDokladSmlDto>} params část parametrů průvodce
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                wizardTwoSteps(params) {
                    let that = this;
                    // TODO: dočasné řešení fragmentů - je ale je nutné předat do metody wizardGetData
                    //let gridFormat = Gordic.Sml.WebClient.SmlGrid.Doklad.createGridFormat(that, true);
                    //let fragments: string[] = SmlWizard.getFragmentsFromGridFormat(gridFormat, true);
                    const gridFormat = WebClient.SmlWizard.getCurrentGridFormat(that.element.find(".SeznamSml.ggrid") /*, true*/);
                    const fragments = WebClient.SmlWizard.getFragmentsFromGridFormat(gridFormat /*, true*/);
                    // volání obecného SML průvodce
                    return WebClient.SmlWizard.wizardTwoSteps(this, $.extend(true, {
                        texts: {
                            formTabTitle: "jres:24100045", //RC 24100045 : Vybrané doklady
                        },
                        grid: {
                            format: gridFormat,
                            keys: that.PrimaryKey,
                            profile: (that.element.find(".SeznamSml.ggrid").ggrid("getCurrentProfile")),
                        },
                        actions: {
                            getData: (withResults, ikcOrData, response) => { return that.wizardGetData(withResults, withResults, ikcOrData, fragments, response); },
                            menuGridDetail: (cnt, ctx, ikc, model, aktRadek, $grid) => {
                                return that.openDetail(cnt, aktRadek, {
                                    grid: $grid,
                                    refreshAndCheckDataAction: () => {
                                        return that.wizardRefreshAndCheckData(cnt, false, $grid.ggrid("getView").getDataRows(), ikc, fragments, params.actions.islCheckBeforeOperation, params.parameters.toOperationDto, model)
                                            .then(function (data) {
                                            // aktualizace dat v gridu a občerstvení indikátorů počtů
                                            $grid.ggrid("getView").updateData(data, "update");
                                            if (cnt.refreshIndicator != undefined && typeof (cnt.refreshIndicator) === "function") {
                                                cnt.refreshIndicator($grid.ggrid("getView"));
                                            }
                                            return;
                                        });
                                    }
                                });
                            },
                        },
                        end: {
                            reloadListAfterFinish: () => { return that.view.requestData({ withoutLongLimit: true }); }
                        }
                    }, params));
                }
                /**
                 * Vrátí seznam dokladů pro zobrazení v průvodcích pro hromadné operace
                 *
                 * @param {boolean} onlyChecked pouze zaškrtnuté řádky (true = ano, false = ne)
                 * @param {boolean} withResults doplnění výsledků hromadné operace (true = ano, false = ne)
                 * @param {Gordic.General.GIkc | Gordic.Sml.Interface.GDokladSmlDto[] | null} ikcOrData IKC nebo data (stačí PK)
                 * @param {string[] | undefined} fragments fragmenty
                 * @param {Gordic.Isl.GServiceGroupResponse<Gordic.Sml.Interface.GDokladSmlDto>} [response] výsledek hromadné operace
                 * @returns {JQueryPromise<(Gordic.Eko.Components.MassOperationData<Gordic.Sml.Interface.GDokladSmlDto> | Gordic.Sml.Interface.GDokladSmlDto)[]>} seznam dokladů (s výsledky operace nebo bez podle parametru withResults)
                 */
                wizardGetData(onlyChecked, withResults, ikcOrData, fragments, response) {
                    let that = this;
                    //// TODO: je to jen pokus jak skrýt tlačítko, ale není to kde vyvolat, takže se to bude muset obsloužit v komponentě průvodce
                    //$(".gbutton [aria-label='Zkontrolovat']").hide();
                    // filtry podle režimu knihy
                    // TODO: jsou vůbec potřeba, když je tam hlavní filtr přes wfltpre?
                    let filters = {};
                    //if ((that as any).ekoBookFilter?.ixp_den) $.extend(filters, { ixp_den: (that as any).ekoBookFilter.ixp_den });
                    //if ((that as any).ekoBookFilter?.rok) $.extend(filters, { rok_den: (that as any).ekoBookFilter.rok });
                    // volání obecné metody pro načtení dat do průvodce
                    return WebClient.SmlWizard.getData(that, onlyChecked, withResults, ikcOrData, filters, (rq) => { return that.isl.DokladSml.list(rq); }, undefined, //(data) => { return SmlGrid.DokladSml.modifyDto(data, false, withResults) },
                    response, that.PrimaryKey, fragments);
                }
                /**
                 * Občerství seznam a překontroluje data (oboje volitelně)
                 *
                 * @param {GContent} cnt content
                 * @param {boolean} reloadData mají se načíst aktuální data z databáze? (true = ano, false = ne)
                 * @param {Gordic.Sml.Interface.GDokladSmlDto[] | undefined} data data pro případ, že se nemají načítat z databáze (reloadData = false)
                 * @param {Gordic.General.GIkc | null} ikc IKC
                 * @param {string[] | undefined} fragments fragmenty
                 * @param {((dto: TOperationDto) => any) | undefined} checkAction delegát pro kontrolu dat před operací (pokud není, nevolá se kontrola, jen se načtou aktuální data)
                 * @param {(model: TModel | undefined, data: Gordic.Sml.Interface.GDokladSmlDto[], ikc: Gordic.General.GIkc) => TOperationDto} toOperationDto delegát pro vytvoření DTO operace
                 * @param {TModel | undefined} model model
                 * @returns {JQueryPromise<Gordic.Sml.Interface.GDokladSmlDto[]>} seznam dokladů (s výsledky operace nebo bez podle parametru withResults)
                 */
                wizardRefreshAndCheckData(cnt, reloadData, data, ikc, fragments, checkAction, toOperationDto, model) {
                    let that = this;
                    // volání obecné metody občerstvení seznamu a kontrolu dat
                    return WebClient.SmlWizard.refreshAndCheckData(cnt, reloadData, data, ikc, (withResults, ikc) => { return that.wizardGetData(false, withResults, ikc, fragments); }, checkAction, toOperationDto, model);
                }
                //#endregion
                //#region Nezařazené
                // TODO: tyhle metody protřídit případně udělat nový region nebo přesunout do sml.methods
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
                /**
                 * Vrátí parametr pro knihu dle aktuálního režimu
                 *
                 * @returns {string} hodnota parametru
                 */
                getParamKniha() {
                    // TODO: tuto metodu asi dát do společných, protože bude nejspíše použita i v soupiskách
                    if (Gordic.Eko.Utils.getEkoBookVariant(this) === 1 /* Eko.Interface.GEkoBookVariant.One */)
                        return this.ekoBook?.ixp_den || "";
                    if (Gordic.Eko.Utils.getEkoBookVariant(this) === 2 /* Eko.Interface.GEkoBookVariant.Year */)
                        return this.ekoBook?.rok?.toString() || "";
                    return "";
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
                    acts.actPodani.updatePermission(perms?.LzePodat);
                    acts.actDetail.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeZobrazit);
                    acts.actDetailDoZalozky.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeZobrazit);
                    acts.actSchvaleni.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneSchvalit);
                    acts.actZruseniSchvaleni.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneZrusitSchvaleni);
                    acts.actPodepsani.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadnePodepsat);
                    acts.actZruseniPodepsani.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneZrusitPodepsani);
                    acts.actUkonceni.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneUkoncit);
                    acts.actZruseniUkonceni.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneZrusitUkonceni);
                    acts.actStorno.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneStornovat);
                    acts.actZruseniStorna.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneZrusitStorno);
                    acts.actRezervaceIissp.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeRezervovatIissp);
                    acts.actPredani.updatePermission(isEmpty ? permEmptyGrid : perms?.LzePredat);
                    acts.actPrevzeti.updatePermission(isEmpty ? permEmptyGrid : perms?.LzePrevzit);
                    acts.actPrideleni.updatePermission(isEmpty ? permEmptyGrid : perms?.LzePridelit);
                    acts.actPreevidence.updatePermission(isEmpty ? permEmptyGrid : perms?.LzePreevidovat);
                    acts.actSchvaleniPolozekFP.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneSchvalitPolozkyFP);
                    // TODO: dořešit typ perms nebo založit novou proměnnou na permissions případu?
                    // TODO: v případě režimu více knih je tenhle permission povolen (na rozdíl od dokladových) - nechat to nebo k dokladovým permissions přidat permission pro případ a tím omezit všechny použité?
                    acts.actFinancniKontrola.updatePermission(isEmpty ? permEmptyGrid : perms?.pripad?.LzePodatFK);
                    acts.actKontrolaMetadat.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeZkontrolovatMetadata);
                    acts.actUvolneni.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneUvolnit);
                    acts.actZmenaUdaju.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneZmenitUdaje);
                    acts.actGenerovaniPoukazu.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeGenerovatPoukaz);
                    acts.actGenerovaniPohledavky.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeGenerovatPohledavku);
                    acts.actPridatDoPorovnani.updatePermission(isEmpty ? permEmptyGrid : { value: true });
                    acts.actTisk.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeTisknout);
                    acts.actOdeslat.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeHromadneOdeslatDoVypravny);
                    // permissions položek a zápisů se řeší až při vyvolání akce, protože se používají záznamové permissions
                    acts.actPolozkyFP.updatePermission(isEmpty ? permEmptyGrid : perms?. /*LzePolozkyFP*/LzeZobrazit);
                    acts.actPolozkyVP.updatePermission(isEmpty ? permEmptyGrid : perms?. /*LzePolozkyVP*/LzeZobrazit);
                    acts.actInfo.updatePermission(isEmpty ? permEmptyGrid : perms?. /*LzeInfo*/LzeZobrazit);
                    acts.actZapisy.updatePermission(isEmpty ? permEmptyGrid : perms?. /*LzeZapisy*/LzeZobrazit);
                }
                //#endregion
                //#region Filtry
                /**
                 * vytvoří a vrátí formuláře s filtry
                 *
                 * @returns {Gordic.Forms.Form[]} pole formulářů s filtry
                 */
                getFilters() {
                    let that = this;
                    let filterFormDef = new Gordic.Forms.Form({ tabLabel: "jres:24100059" }) //RC 24100059 : Kompletní filtr
                        .addSection("jres:24100060") //RC 24100060 : Základní údaje
                        // TODO: doladit pořadí filtrů (podle detailu nebo seznamu)
                        // TODO: přidat chybějící filtry (třeba typ kompenzovaných položek nebo klíčová slova jako v UCT?)
                        .addRow("Identifikátor").addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp" /* Sml.Interface.GDokladSmlDtoNames.ixp */
                    })
                        // TODO: obecná metoda nemá možnost nastavit name - neupravit ji?
                        //.addPrefab(Gordic.Eko.Filters.prefabAgEvCislo())
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string",
                        label: "Agendové číslo od-do",
                        name: "ac_sml"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string",
                        label: "Evidenční číslo od-do",
                        name: "ac"
                    }))
                        .addRow("Typ dokladu").addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                        name: "ixs_typ" /* Sml.Interface.GDokladSmlDtoNames.ixs_typ */,
                        model: "ixs_typ=ixs_typ;ktg_typ=ktg_typ",
                        dropdown: false,
                        multi: true,
                        serverFilters: { ktg_typ: this.KtgTyp }
                    })
                        .addRow("Stav dokladu").addField("gselectbox", Gordic.Prefabs.Select.smlcsta(), {
                        name: "sml_stav" /* Sml.Interface.GDokladSmlDtoNames.sml_stav */,
                        model: "sml_stav=sml_stav",
                        list: true,
                        dropdown: false,
                        itemWidth: "",
                        multi: true
                    })
                        // pomocná tlačítka pro výběr více vybraných stavů na jeden klik
                        .addRow({ customClass: "noPinnable", layoutDescriptor: "L-3-8-1, M-0-11-1, S-0-11-1" })
                        //.addField("gbutton", "", {
                        //    params: {
                        //        action: new GAction({
                        //            caption: "Neúplná rezervace",
                        //            name: "smlStav990",
                        //            run: function (ev, ctx) {
                        //                $(ev.currentTarget).gform().findFields(Sml.Interface.GDokladSmlDtoNames.sml_stav).gfield("setValue", [...]);
                        //            }
                        //        })
                        //    }
                        //})
                        .addField("gbutton", "", {
                        params: {
                            action: new GAction({
                                caption: "jres:24100108", //RC 24100108 : Nepřipraveno k uzávěrce
                                name: "smlStav992",
                                run: function (ev, ctx) {
                                    $(ev.currentTarget).gform().findFields("sml_stav" /* Sml.Interface.GDokladSmlDtoNames.sml_stav */).gfield("setValue", [{ sml_stav: 10 }, { sml_stav: 20 }, { sml_stav: 23 }, { sml_stav: 30 }]);
                                }
                            })
                        }
                    })
                        .addField("gbutton", "", {
                        params: {
                            action: new GAction({
                                caption: "jres:24100109", //RC 24100109 : Nestornováno
                                name: "smlStav998",
                                run: function (ev, ctx) {
                                    $(ev.currentTarget).gform().findFields("sml_stav" /* Sml.Interface.GDokladSmlDtoNames.sml_stav */).gfield("setValue", [{ sml_stav: 10 }, { sml_stav: 20 }, { sml_stav: 23 }, { sml_stav: 30 }, { sml_stav: 50 }]);
                                }
                            })
                        }
                    })
                        .addField("gbutton", "", {
                        params: {
                            action: new GAction({
                                caption: "jres:24100110", //RC 24100110 : Neukončeno
                                name: "smlStav999",
                                run: function (ev, ctx) {
                                    $(ev.currentTarget).gform().findFields("sml_stav" /* Sml.Interface.GDokladSmlDtoNames.sml_stav */).gfield("setValue", [{ sml_stav: 10 }, { sml_stav: 20 }, { sml_stav: 23 }, { sml_stav: 30 }]);
                                }
                            })
                        }
                    })
                        .addRow("Stav podpisu").addField("gselectbox", Gordic.Prefabs.Select.smlcsts(), {
                        name: "sml_stav" /* Sml.Interface.GDokladSmlDtoNames.sml_stav */,
                        model: "sgn_stav=sgn_stav",
                        list: true,
                        dropdown: false,
                        itemWidth: "",
                        multi: true
                    })
                        .addRow("jres:24100183").addField("gselectbox", Gordic.Prefabs.Select.ekocmen(), {
                        name: "mena",
                        model: "mena=mena",
                        //list: true,
                        dropdown: false,
                        //itemWidth: "",
                        multi: true
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "jres:24100101", //RC 24100101 : Cena dokladu od-do
                        name: "c_mena_doc" /* Sml.Interface.GDokladSmlDtoNames.c_mena_doc */,
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:24100102", //RC 24100102 : Datum evidence od-do
                        name: "dat_prij_pod" /* Sml.Interface.GDokladSmlDtoNames.dat_prij_pod */
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:24100103", //RC 24100103 : Datum uzavření od-do
                        name: "dat_uzavreni" /* Sml.Interface.GDokladSmlDtoNames.dat_uzavreni */
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:24100104", //RC 24100104 : Datum konce platnosti od-do
                        name: "dat_platnost" /* Sml.Interface.GDokladSmlDtoNames.dat_platnost */
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:24100105", //RC 24100105 : Datum účinnosti od-do
                        name: "dat_ucinnost" /* Sml.Interface.GDokladSmlDtoNames.dat_ucinnost */
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:24100106", //RC 24100106 : Datum podpisu protistranou od-do
                        name: "dat_sgn_ext" /* Sml.Interface.GDokladSmlDtoNames.dat_sgn_ext */
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "jres:24100107", //RC 24100107 : Datum podpisu od-do
                        name: "dat_sgn" /* Sml.Interface.GDokladSmlDtoNames.dat_sgn */
                    }))
                        .addRow(WebClient.SmlUtils.getVadText(this, 1 /* Gordic.Sml.Interface.GSmlvadId.Popis */) ?? "Popis").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "popis" /* Sml.Interface.GDokladSmlDtoNames.popis */
                    })
                        .addRow(WebClient.SmlUtils.getVadText(this, 2 /* Gordic.Sml.Interface.GSmlvadId.Nazev */) ?? "Úplný název").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "nazev" /* Sml.Interface.GDokladSmlDtoNames.nazev */
                    })
                        // TODO: neupravit filtr na subjekt na ixs_eko místo ixs_esu?
                        .addRow("Subjekt").addField("gselectbox", Gordic.Prefabs.Select.ginsesu(), {
                        name: "ixs_esu" /* Sml.Interface.GDokladSmlDtoNames.ixs_esu */,
                        model: "ixs_esu=ixs_esu",
                        multi: true
                    })
                        .addRow("Zpracovatel").addField("gselectbox", Gordic.Prefabs.Select.ginsfunMini(), {
                        name: "ixs_fun_akt" /* Sml.Interface.GDokladSmlDtoNames.ixs_fun_akt */,
                        model: "ixs_fun_akt=ixs_fun",
                        dropdown: false
                    })
                        .addSection("Finacování")
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "rok",
                        label: "jres:24100098", //RC 24100098 : Datum financování od od-do
                        name: "fin_od" /* Sml.Interface.GDokladSmlDtoNames.fin_od */
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "rok",
                        label: "jres:24100099", //RC 24100099 : Datum financování do od-do
                        name: "fin_do" /* Sml.Interface.GDokladSmlDtoNames.fin_do */
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "jres:24100100", //RC 24100100 : Celková částka od-do
                        name: "c_mena" /* Sml.Interface.GDokladSmlDtoNames.c_mena */,
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        // TODO: neudělat skupinu pro filtry případu?
                        .addPrefab(WebClient.SmlDetail.prefabUplnyCastecnyZadny("disp", "disp_txt", "Disponibilita", undefined, (e, c) => { that.filterAnoNeChange("disp", e, c); }))
                        .addSection("Finanční profil")
                        .addRow("Finanční profil").addField("gselectbox", Gordic.Eko.Prefabs.cfuElements({
                        gridFormat: new Gordic.Data.GridFormat()
                            .addRok({
                            cellTemplate: function (dto) { return Gordic.Eko.Filters.Utils.formatIntervalValue(dto.rok); },
                            editor: Gordic.Eko.Filters.integerInterval({
                                model: "rok",
                                caption: "Rok"
                            })
                        })
                            .addBankovniUcetVlastni({
                            cellTemplate: function (dto) { return Gordic.Eko.Filters.Utils.formatIntervalValue(dto.bu_vl_txt); },
                            editor: WebClient.SmlFilter.buVlTxtInterval({
                                model: "bu_vl_txt",
                                caption: "Bankovní účet vlastní",
                                ico: this.Ico,
                                ucs: this.Ucs,
                                rok: this.Rok,
                                aktivita: 100,
                            })
                        })
                            .addTextColumn({
                            name: "cis_pol_pla",
                            caption: this.JeACR
                                ? "jres:33600377" //RC 33600377 : ČPP
                                : "jres:33600378", //RC 33600378 : Číslo akce
                            width: 130,
                            cellTemplate: function (dto) { return Gordic.Eko.Filters.Utils.formatIntervalValue(dto.cis_pol_pla); },
                            editor: /*SmlFilter.cisPolPlaInterval*/ Gordic.Eko.Filters.stringInterval({
                                model: "cis_pol_pla",
                                caption: this.JeACR
                                    ? "jres:33600377" //RC 33600377 : ČPP
                                    : "jres:33600378", //RC 33600378 : Číslo akce
                            })
                        })
                            .addNks({
                            cellTemplate: function (dto) { return Gordic.Eko.Filters.Utils.formatIntervalValue(dto.nks); },
                            editor: Gordic.Eko.Filters.nksInterval({
                                model: "nks",
                                caption: Gordic.Consts.DbShortcuts.nks ?? "NS",
                                ico: this.Ico,
                                onlyActive: true,
                                aktProhl: 100,
                            })
                        })
                            .addSortedEkoCfuSet(Gordic.Eko.CfuUtils.getCfuSetEditors(this))
                            .addTextColumn({
                            name: "priz_zaz",
                            caption: "jres:33600381", //RC 33600381 : Typ operace
                            width: 120,
                            cellTemplate: function (dto) {
                                if (dto?.priz_zaz_txt)
                                    return "=" + dto.priz_zaz_txt.toString().trim();
                                else if (dto?.priz_zaz != null)
                                    return "=" + dto.priz_zaz.toString().trim();
                                else
                                    return WebClient.SmlFilter.filterEmptyValue;
                            },
                            editor: WebClient.SmlFilter.prizZazInterval({
                                model: "priz_zaz",
                                caption: "jres:33600381", //RC 33600381 : Typ operace
                            })
                        })
                            .addCurrencyColumn({
                            name: "c",
                            caption: "jres:33600382", //RC 33600382 : Částka CZK
                            width: 120,
                            cellTemplate: function (dto) { return Gordic.Eko.Filters.Utils.formatIntervalValue(dto.c); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "c",
                                caption: "jres:33600382" //RC 33600382 : Částka CZK
                            })
                        }),
                        //.addCurrencyColumn({
                        //    name: "c_disp",
                        //    caption: "jres:33600584", //RC 33600584 : Disponibilní zůstatek
                        //    width: 120,
                        //    // TODO: dořešit jeSmlouva
                        //    // hidden: !this.jeSmlouva
                        //    cellTemplate: function (dto) { return Gordic.Eko.Filters.Utils.formatIntervalValue(dto.c_pol); },
                        //    editor: Gordic.Eko.Filters.decimalInterval({
                        //        model: "c_disp",
                        //        caption: "jres:33600584", //RC 33600584 : Disponibilní zůstatek
                        //    })
                        //})
                        canAddNewRecords: true,
                        canRemoveRecords: true,
                    }), { name: "fp_pol" })
                        .addPrefab(WebClient.SmlDetail.prefabFpTypVyb("Položky finančního profilu", undefined, (e, c) => { that.filterAnoNeChange("fp_typ_vyb", e, c); }))
                        .addSection("Platební kalendář")
                        .addPrefab(WebClient.SmlDetail.prefabPlkTypVyb("Platební kalendář", undefined, (e, c) => { that.filterAnoNeChange("plk_typ_vyb", e, c); }))
                        .addSection("Rozpis")
                        .addPrefab(WebClient.SmlDetail.prefabRozpisTypVyb("Rozpis celkové částky", undefined, (e, c) => { that.filterAnoNeChange("rozpis_typ_vyb", e, c); }))
                        .addSection("Dodatek")
                        .addPrefab(WebClient.SmlDetail.prefabDodTypVyb("Dodatek", undefined, (e, c) => { that.filterAnoNeChange("dod_typ_vyb", e, c); }))
                        .addSection("Blokační agenda")
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("sml_blk", "sml_blk_txt", "jres:24100090", undefined, (e, c) => { that.filterAnoNeChange("sml_blk", e, c); })) //RC 24100090 : Vazba dokladu na případ BLK
                        .addRow("Blokační agenda").addField("gselectbox", Gordic.Prefabs.Select.ginctag(), {
                        name: "typ_ag_blok" /* Sml.Interface.GDokladSmlDtoNames.typ_ag_blok */,
                        model: "typ_ag_blok=typ_ag",
                        list: true,
                        dropdown: false,
                        itemWidth: "",
                        multi: true,
                        itemTooltipTemplate: "{typ_ag_txt}",
                        serverFilters: {
                            typ_ag: this.TypAgBlokAkt /*[Sml.Globals.Enums.TypAg.EVZ, Sml.Globals.Enums.TypAg.RZA, Sml.Globals.Enums.TypAg.VFP, Sml.Globals.Enums.TypAg.EPO]*/
                        },
                        change: function (ev, changeObj) {
                            // TODO: pokud to funguje, tak to zakomentované smazat
                            // TODO: dořešit metodu SmlFilter.filtryPripaduZmenaTypAgBlok
                            //SmlFilter.filtryPripaduZmenaTypAgBlok(/*that.parentContent!*/$(ev.currentTarget).parent(), changeObj.value, Sml.Interface.GDokladSmlDtoNames.soutez);
                            if (changeObj?.value?.length === 1) {
                                // pole jsou povolená jen pro jednu agendu
                                $(ev.currentTarget).parent().findFields("soutez" /* Sml.Interface.GDokladSmlDtoNames.soutez */).gfield("option", "disabled", false);
                            }
                            else {
                                // pole jsou nepřístupná pro žádnou nebo více agend
                                $(ev.currentTarget).parent().findFields("soutez" /* Sml.Interface.GDokladSmlDtoNames.soutez */).gfield("option", "disabled", true);
                                $(ev.currentTarget).parent().findFields("soutez" /* Sml.Interface.GDokladSmlDtoNames.soutez */).gfield("setValue", null);
                            }
                        }
                    })
                        .addRow("Druh soutěže").addField("gselectbox", Gordic.Prefabs.Select.smlSoutez(), {
                        dropdown: false,
                        name: "soutez" /* Sml.Interface.GDokladSmlDtoNames.soutez */,
                        model: function (operation, dto, modelOptions) {
                            if (operation === "apply" && dto["typ_ag_blok"]?.length !== 1) {
                                // pole soutěž je přístupné jen pro jednu zvolenou blokační agendu
                                $(this).gfield("option", "disabled", true);
                            }
                            // úprava apply pokud je zadán i typ bokační agendy
                            if (operation === "apply" && dto["typ_ag_blok"]?.length === 1) {
                                $(this).gfield("option", "disabled", false);
                                let val = [];
                                let setFlags = modelOptions?.setFlags ?? null;
                                // úprava hodnot pro field
                                if (modelOptions?.setFlags?.isKontrolniDiv === true) {
                                    // režim kontrolního divu - vrací pole stringů
                                    val = dto["soutez"].map(i => { return typeof i === "string" ? i : i.soutez; }) ?? [];
                                }
                                else {
                                    // jiné režimy - vrací pole struktur
                                    val = dto["soutez"].map(i => { return typeof i === "string" ? { soutez: i, typ_ag_blok: dto.typ_ag_blok[0] } : { soutez: i.soutez, typ_ag_blok: dto.typ_ag_blok[0] }; }) ?? [];
                                    setFlags = $.extend({ valid: false }, modelOptions?.setFlags);
                                }
                                $(this).gfield("option", "data").readerParams = {
                                    // předání typu blokační agendy do readeru
                                    TypAgBlok: dto.typ_ag_blok[0]
                                };
                                // nastavení hodnot
                                $(this).gfield("setValue", val, setFlags);
                                return;
                            }
                            return "soutez" /* Sml.Interface.GDokladSmlDtoNames.soutez */;
                        },
                        multi: true,
                        modelOptions: {
                            verificationNeeded: true,
                        },
                        serverFilters: {
                            typ_ag_blok: function () {
                                const vals = $.content(this).findFields("typ_ag_blok" /* Sml.Interface.GDokladSmlDtoNames.typ_ag_blok */).gfield("getValue");
                                if (vals?.length === 1)
                                    return vals[0].typ_ag;
                                else
                                    return null;
                            }
                        },
                    })
                        .addSection("jres:24100089") //RC 24100089 : Vazby dokladů SML
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("sml_nad_sml", "sml_nad_sml_txt", "jres:24100091", undefined, (e, c) => { that.filterAnoNeChange("sml_nad_sml", e, c); })) //RC 24100091 : Vazba dokladu na nadřazenou smlouvu
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("sml_obj", "sml_obj_txt", "jres:24100092", undefined, (e, c) => { that.filterAnoNeChange("sml_obj", e, c); })) //RC 24100092 : Vazba dokladu na podřízenou objednávku
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("sml_dod", "sml_dod_txt", "jres:24100093", undefined, (e, c) => { that.filterAnoNeChange("sml_dod", e, c); })) //RC 24100093 : Dodatek ke smlouvě
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("sml_nad_pri", "sml_nad_pri_txt", "jres:24100094", undefined, (e, c) => { that.filterAnoNeChange("sml_nad_pri", e, c); })) //RC 24100094 : Doklad je nadřazeným případem
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("sml_doc_dsg", "sml_doc_dsg_txt", "jres:24100095", undefined, (e, c) => { that.filterAnoNeChange("sml_doc_dsg", e, c); })) //RC 24100095 : K dokladu existují zprávy dohledového systému
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("s_ele", "s_ele_txt", "jres:24100096", undefined, (e, c) => { that.filterAnoNeChange("s_ele", e, c); })) //RC 24100096 : K dokladu existuje elektronický obraz/příloha
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("sml_maj", "sml_maj_txt", "jres:24100097", undefined, (e, c) => { that.filterAnoNeChange("sml_maj", e, c); })) //RC 24100097 : Vazba dokladu na majetkové karty
                        .addSection("Zveřejnění")
                        .addRow("jres:24100118").addField("gselectbox", Gordic.Prefabs.Select.wflcszp(), {
                        name: "stav_zpv",
                        model: "stav_zpv=stav_zpv",
                        list: true,
                        dropdown: false,
                        itemWidth: "",
                        multi: true
                    })
                        .addRow("jres:24100119").addField("gselectbox", Gordic.Prefabs.Select.wflszpv(), {
                        name: "ixs_zpv",
                        model: "ixs_zpv=ixs_zpv",
                        dropdown: false,
                        multi: true
                        // TODO: je potřeba přidat nějaké serverové filtry? zeptat se Petra
                    })
                        // TODO: v TK jsou hodnoty povinné/nepovinné
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("priz_pov_zve", "priz_pov_zve_txt", "Nutnost zveřejnění", undefined, (e, c) => { that.filterAnoNeChange("priz_pov_zve", e, c); }))
                        .addRow("jres:24100120").addField("gselectbox", Gordic.Prefabs.Select.wflcplz(), {
                        name: "plan_zve",
                        model: "plan_zve=plan_zve",
                        dropdown: false,
                        multi: true
                    })
                        // TODO: v TK jsou hodnoty existuje/neexistuje
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("s_ele_zve", "s_ele_zve_txt", "jres:24100121", undefined, (e, c) => { that.filterAnoNeChange("s_ele_zve", e, c); })) //RC 24100121 : El. obraz/příloha určený/á ke zveřejnění
                        .addPrefab(Gordic.Gin.Prefabs.interval({ type: "date", label: "jres:24100122", name: "dat_zve" /* Sml.Interface.GDokladSmlDtoNames.dat_zve */ })) //RC 24100122 : Datum zveřejnění
                        .addRow("jres:24100124").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), { name: "id_zve" }) //RC 24100124 : ID registru smluv
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("plan_zve_d", "plan_zve_d_txt", "jres:24100123", undefined, (e, c) => { that.filterAnoNeChange("plan_zve_d", e, c); })) //RC 24100123 : Pouze doklady určené ke zveřejnění
                        .addSection("Věcný profil")
                        .addPrefab(WebClient.SmlDetail.prefabAnoNe("vp_typ_vyb", "vp_typ_vyb_txt", "jres:24100172", undefined, (e, c) => { that.filterAnoNeChange("vp_typ_vyb", e, c); })) //RC 24100172 : Vazba položky VP na doklad
                        .addRow("jres:24100157").addField("gselectbox", Gordic.Prefabs.Select.vepsdup(), {
                        name: "vep_ixs_dup",
                        model: "vep_ixs_dup=ixs_dup",
                        dropdown: false,
                        multi: true,
                        serverFilters: {
                            ixs_dup: { o: "!=", v: Sml.Globals.Enums.Nulak.Dup }
                        }
                    })
                        .addRow("jres:24100158").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "vep_nazev"
                    })
                        .addRow("jres:24100159").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "vep_inv_cis"
                    })
                        .addRow("jres:24100160").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "vep_evi_cis"
                    })
                        .addRow("jres:24100161").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "vep_vyr_cis"
                    })
                        .addRow("jres:24100162").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "vep_ser_cis"
                    });
                    if (this.JeACR) {
                        filterFormDef
                            // TODO: nefunguje, při hledání to padá
                            .addRow("jres:24100163").addField("gselectbox", Gordic.Prefabs.Select.matskcm(), {
                            name: "vep_mat_cis",
                            model: "vep_mat_cis=idk",
                            dropdown: false,
                            multi: true,
                            serverFilters: {
                                skp: { o: ">", v: " " }
                            }
                        });
                    }
                    else {
                        filterFormDef
                            .addRow("jres:24100164").addField("gselectbox", Gordic.Prefabs.Select.majscim(), {
                            name: "vep_mat_cis",
                            model: "vep_mat_cis=mat_cis",
                            dropdown: false,
                            multi: true,
                            serverFilters: {
                                skp: { o: ">", v: " " }
                            }
                        });
                    }
                    filterFormDef
                        .addRow("jres:24100165").addField("gselectbox", Gordic.Prefabs.Select.ekoskla(), {
                        name: "vep_skp",
                        model: "vep_skp=skp",
                        dropdown: false,
                        multi: true,
                        serverFilters: {
                            skp: { o: ">", v: " " }
                        }
                    })
                        .addRow("jres:24100166").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "vep_sarze"
                    })
                        // TODO: co ičo ? v TK to nevybere nic - v ControlsLogic je nějaké stará verze, kde není IČO ani parametr MAJ_RAD_ACCSKM - zeptat se Petra Vošty
                        .addRow("jres:24100167").addField("gselectbox", Gordic.Prefabs.Select.majcskm(), {
                        name: "vep_skupina_id",
                        model: "vep_skupina_id=skp",
                        dropdown: false,
                        multi: true,
                        serverFilters: {
                            skupina_id: { o: ">", v: 0 }
                        }
                    })
                        // TODO: číselník není
                        //.addRow("Druh majetku VP").addField("gselectbox", Gordic.Prefabs.Select.majsdrm(), { name: "vep_drh_id", model: "vep_drh_id=drh_id", dropdown: false, multi: true, serverFilters: { drh_id: { o: ">", v: 0 } } })
                        .addRow("jres:24100168").addField("gselectbox", Gordic.Prefabs.Select.gincmej(), {
                        name: "vep_mj",
                        model: "vep_mj=mj",
                        dropdown: false,
                        multi: true,
                        serverFilters: {
                            mj: { o: ">", v: " " }
                        }
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "jres:24100170", //RC 24100170 : Množství VP od-do
                        name: "vep_m_sml",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "jres:24100171", //RC 24100171 : Částka VP od-do
                        name: "vep_c_sml",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addRow("jres:24100169").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "vep_popis"
                    })
                        // TODO: používat GDokladSmlFilterDtoNames místo GDokladSmlDtoNames?
                        .addSection("jres:24100111"); //RC 24100111 : Ostatní údaje
                    if (this.dbparams.eko_rad_dfken >= 1) {
                        filterFormDef
                            .addRow("Finanční kontrola").addField("gselectbox", Gordic.Prefabs.Select.wflcstvEko(), {
                            name: "stav_pfk" /* Sml.Interface.GDokladSmlFilterDtoNames.stav_pfk */,
                            model: "stav_pfk" /* Sml.Interface.GDokladSmlFilterDtoNames.stav_pfk */ + "=stav_vyriz",
                            list: true,
                            dropdown: false,
                            itemWidth: "",
                            multi: true,
                            change: (e, c) => { that.filterAnoNeChange("stav_pfk" /* Sml.Interface.GDokladSmlFilterDtoNames.stav_pfk */, e, c, "stav_vyriz"); }
                        });
                    }
                    if (this.JePolLicRSP && this.dbparams.gin_epk_schval === 1) {
                        filterFormDef
                            .addRow("Schvalovací proces").addField("gselectbox", Gordic.Prefabs.Select.wflcstvEko(), {
                            name: "stav_rsp" /* Sml.Interface.GDokladSmlFilterDtoNames.stav_rsp */,
                            model: "stav_rsp" /* Sml.Interface.GDokladSmlFilterDtoNames.stav_rsp */ + "=stav_vyriz",
                            list: true,
                            dropdown: false,
                            itemWidth: "",
                            multi: true,
                            change: (e, c) => { that.filterAnoNeChange("stav_rsp" /* Sml.Interface.GDokladSmlFilterDtoNames.stav_rsp */, e, c, "stav_vyriz"); }
                        });
                    }
                    filterFormDef
                        .addPrefab(WebClient.SmlDetail.prefabPriPzp("Účtovat o podmíněném Z/P", undefined, (e, c) => { that.filterAnoNeChange("priz_pzp", e, c); }))
                        .addRow("Poznámka").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "poznamka" /* Sml.Interface.GDokladSmlFilterDtoNames.poznamka */
                    })
                        .addRow(this.dbparams.sml_lbl_dok1).addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), { name: "ac_dok_1" /* Sml.Interface.GDokladSmlDtoNames.ac_dok_1 */ })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "{0} datum od-do".format(this.dbparams.sml_lbl_dok1),
                        name: "dat_dok_1" /* Sml.Interface.GDokladSmlFilterDtoNames.dat_dok_1 */
                    }))
                        .addRow(this.dbparams.sml_lbl_dok2).addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), { name: "ac_dok_2" /* Sml.Interface.GDokladSmlDtoNames.ac_dok_2 */ })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "{0} datum od-do".format(this.dbparams.sml_lbl_dok2),
                        name: "dat_dok_2" /* Sml.Interface.GDokladSmlFilterDtoNames.dat_dok_2 */
                    }))
                        // TODO: způsob ukončení nemusí být vidět vždy (viz detail)
                        .addRow("Způsob ukončení").addField("gselectbox", Gordic.Prefabs.Select.smlszuk(), {
                        name: "ixs_zuk" /* Sml.Interface.GDokladSmlFilterDtoNames.ixs_zuk */,
                        model: "ixs_zuk=ixs_zuk",
                        //list: true,
                        dropdown: false,
                        //itemWidth: "",
                        multi: true,
                        //change: (e, c) => { that.filterAnoNeChange(Sml.Interface.GDokladSmlFilterDtoNames.ixs_zuk, e, c); }
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "Datum ukončení od-do",
                        name: "dat_uko" /* Sml.Interface.GDokladSmlFilterDtoNames.dat_uko */
                    }))
                        // TODO: sjednotit pořadí hodnot ano/ne ve filtrech, případně i velká/malá písmena na začátku slova
                        .addRow("Možnost opce").addField("gselectbox", Gordic.Prefabs.Select.smlcpop(), {
                        name: "priz_opce" /* Sml.Interface.GDokladSmlFilterDtoNames.priz_opce */,
                        model: "priz_opce=priz_opce",
                        list: true,
                        dropdown: false,
                        itemWidth: "",
                        multi: true,
                        change: (e, c) => { that.filterAnoNeChange("priz_opce" /* Sml.Interface.GDokladSmlFilterDtoNames.priz_opce */, e, c); }
                    })
                        // TODO: zatím není obslouženo na serveru
                        //.addPrefab(Gordic.Gin.Prefabs.interval({ type: "date", label: "Datum odeslání od-do", name: Sml.Interface.GDokladSmlFilterDtoNames.dat_odes }))
                        //.addPrefab(Gordic.Gin.Prefabs.interval({ type: "date", label: "Datum rozhodného zveřejnění od-do", name: Sml.Interface.GDokladSmlFilterDtoNames.dat_zve }))
                        .addSection("Další")
                        .addRow("Klíčová slova").addField("gselectbox", Gordic.Prefabs.Select.wflKlicSlova(), {
                        name: "wfl_kl_slovo",
                        model: "wfl_kl_slovo=kl_slovo",
                        multi: true,
                        dropdown: false,
                        showSelectButton: true,
                        verticalButtons: false
                    })
                        .addSection("Případ")
                        .addRow("Identifikátor případu").addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp_sml_pri" /* Sml.Interface.GDokladSmlDtoNames.ixp_sml_pri */
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "string",
                        label: "Agendové číslo případu od-do",
                        name: "pri_ac_sml"
                    }))
                        .addRow("Popis případu").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "pri_popis"
                    });
                    // filtry na vlastnosti
                    let sxsTyp = [{
                            sxs: null,
                            typ_obj: Sml.Globals.Enums.TypObj.Smlouva
                        }];
                    this.IxsTypDok.forEach(item => sxsTyp.push({
                        sxs: item,
                        typ_obj: Sml.Globals.Enums.TypObj.TypDokumentu
                    }));
                    let filterFormVlastnost = new Gordic.Forms.Form({ tabLabel: "Vlastnosti" })
                        .addSection()
                        // TODO: jsou parametry prefabů správně?
                        .addRow("jres:24100112").addPrefab(Gordic.Gin.Prefabs.Field.GGinVlastnostiExtPropsFilterField(//RC 24100112 : Rozšiřující vlastnosti
                    {
                        name: "vlastnosti_r",
                        esuLogovani: {
                            Ixp: "",
                            AktZnacka: "",
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani
                        }
                    }, {
                        rpp_ixs_typ: this.IxsTypDok,
                        typ_obj: [Sml.Globals.Enums.TypObj.Smlouva],
                        t_sxs: sxsTyp
                    }));
                    // popisné vlastnosti se nezobrazují
                    //.addRow("Popisné vlastnosti").addPrefab(Gordic.Gin.Prefabs.Field.GGinVlastnostiFilterField(
                    //    {
                    //        name: "vlastnosti_s",
                    //        esuLogovani: {
                    //            Ixp: "",
                    //            AktZnacka: "",
                    //            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani
                    //        }
                    //    }
                    //));
                    // filtry na dokumenty
                    let filterFormDokument = Gordic.Ssl.WebClient.GDokumentIsl.AddDokumentFilterFieldsImmediate({
                        content: this,
                        params: this.DokumentParams,
                        form: new Gordic.Forms.Form({ tabLabel: "Dokument" }).addSection(),
                        //initialValues: dokumentParams,
                        fields: WebClient.SmlGrid.presetDokumentFields,
                        scope: {
                            scopeLevels: [
                                // Všechny napojené filtry budou mít v názvu prefix "dokument" (zde tedy filtrační enum bude obsahovat hodnoty dokument_ixp, dokument_ixs_fun_akt a dokument_nazev). Tím je možné odlišit filtry, které spravuji sám jako autor entity a ty, které si řeší dokument sám.
                                { scope: "dokument" }
                            ]
                        },
                        fieldsOptions: {}
                    });
                    return [filterFormDef, filterFormVlastnost, filterFormDokument];
                }
                /**
                 * Obsluha změny hodnoty u filtru s jednou hodnotou (multi pole se chová jako single a je možné myší odvybrat hodnotu)
                 *
                 * @param {string} name prvek
                 * @param {any} ev ev z události change
                 * @param {any} changeObj changeObj z události change
                 * @param {string} [name] název položky v DTO (jmenuje-li se jinak než name)
                 */
                filterAnoNeChange(name, ev, changeObj, readerName) {
                    if (changeObj?.value?.length != null && changeObj?.value?.length > 1) {
                        // zvolená může být pouze jedna hodnota (je to simulace ne-multi režimu, která ale umožňovu myší odvybrat všechny hodnoty)
                        let newSingleVal = {};
                        changeObj?.value.forEach((v) => {
                            if (v[readerName ?? name] != null) {
                                (this["currfilter_" + name] ?? []).forEach((n) => {
                                    if (n[readerName ?? name] != null && n[readerName ?? name] !== v[readerName ?? name]) {
                                        newSingleVal[readerName ?? name] = v[readerName ?? name];
                                    }
                                });
                            }
                        });
                        if (newSingleVal[readerName ?? name] != null) {
                            $(ev.target).gfield("setValue", null);
                            $(ev.target).gfield("setValue", newSingleVal);
                        }
                    }
                    this["currfilter_" + name] = $(ev.target).gfield("getValue");
                }
                //#endregion
                //#region Menu
                /**
                 * Seznam akcí pro menu (hamburger nebo kontextové menu gridu)
                 *
                 * @param {boolean} contextMenu formát pro kontextové menu gridu (true (default) = ano, false = ne)
                 * @param {IGGridCellContext<Gordic.Sml.Interface.GDokladSmlDto>} [cellContext] kontext z gridu (pouze pro contextMenu = true) (default = undefined)
                 * @returns {any} seznam akcí
                 */
                getMenuActions(contextMenu = false, cellContext) {
                    //(string | undefined)[] | (string | (string | undefined)[] | { action: GAction | undefined; primary: boolean; favorite: boolean } | { action: GAction | undefined; favorite: boolean; align: string })[]
                    return contextMenu
                        ? [
                            "actPodani",
                            "actDetail",
                            "actDetailDoZalozky",
                            "actPolozkyFP",
                            "actPolozkyVP",
                            "actInfo",
                            "actZapisy",
                            "actSchvaleni",
                            "actSchvaleniPolozekFP",
                            "actZruseniSchvaleni",
                            "actPodepsani",
                            "actZruseniPodepsani",
                            "actUkonceni",
                            // 20.01.2026 - po dohodě na poradě zrušení ukončení nebudeme podporovat
                            //"actZruseniUkonceni",
                            "actStorno",
                            "actZruseniStorna",
                            "actRezervaceIissp",
                            "actPredani",
                            "actPrevzeti",
                            "actPrideleni",
                            "actPreevidence",
                            "actFinancniKontrola",
                            "actKontrolaMetadat",
                            "actUvolneni",
                            "actZmenaUdaju",
                            /*["Generování", */ "actGenerovaniPoukazu", "actGenerovaniPohledavky" /*]*/,
                            "actPridatDoPorovnani",
                            "actTisk",
                            "actOdeslat"
                        ]
                        : [
                            "actPodani*",
                            "actDetail*!",
                            "actDetailDoZalozky",
                            "actPolozkyFP",
                            "actPolozkyVP",
                            "actInfo",
                            "actZapisy",
                            "actSchvaleni*",
                            "actSchvaleniPolozekFP",
                            "actZruseniSchvaleni",
                            "actPodepsani*",
                            "actZruseniPodepsani",
                            "actUkonceni",
                            // 20.01.2026 - po dohodě na poradě zrušení ukončení nebudeme podporovat
                            //"actZruseniUkonceni",
                            "actStorno",
                            "actZruseniStorna",
                            "actRezervaceIissp",
                            "actPredani",
                            "actPrevzeti",
                            "actPrideleni",
                            "actPreevidence",
                            "actFinancniKontrola",
                            "actKontrolaMetadat",
                            "actUvolneni",
                            "actZmenaUdaju",
                            ["Generování", "actGenerovaniPoukazu", "actGenerovaniPohledavky"],
                            "actPridatDoPorovnani",
                            "actTisk*",
                            "actOdeslat"
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
                    // TODO: na vstupu není typ_alg
                    // třídění
                    // TODO: dá se vůbec nějak z ggridu/view zjistit?
                    rep.params.X0002 = "";
                    // titulek - podle režimu knihy a typu seznamu
                    rep.params.X0006 = "";
                    if (this.TypSeznamuDokladu === Sml.Globals.Enums.TypSeznamuDokladu.Objednavka || this.TypSeznamuDokladu === Sml.Globals.Enums.TypSeznamuDokladu.ObjednavkaDodavatelska || this.TypSeznamuDokladu === Sml.Globals.Enums.TypSeznamuDokladu.ObjednavkaOdberatelska || this.TypSeznamuDokladu === Sml.Globals.Enums.TypSeznamuDokladu.ObjednavkaBezRozliseni || this.TypSeznamuDokladu === Sml.Globals.Enums.TypSeznamuDokladu.ObjednavkaBezFP) {
                        if (Gordic.Eko.Utils.getEkoBookVariant(this) === 1 /* Eko.Interface.GEkoBookVariant.One */)
                            rep.params.X0006 = "Výběr objednávek z knihy " + this.ekoBook.nazev;
                        else if (Gordic.Eko.Utils.getEkoBookVariant(this) === 2 /* Eko.Interface.GEkoBookVariant.Year */)
                            rep.params.X0006 = "Výběr objednávek z knih aktuálního roku";
                        else
                            rep.params.X0006 = "Výběr objednávek ze všech knih";
                    }
                    else {
                        if (Gordic.Eko.Utils.getEkoBookVariant(this) === 1 /* Eko.Interface.GEkoBookVariant.One */)
                            rep.params.X0006 = "Výběr smluv z knihy " + this.ekoBook.nazev;
                        else if (Gordic.Eko.Utils.getEkoBookVariant(this) === 2 /* Eko.Interface.GEkoBookVariant.Year */)
                            rep.params.X0006 = "Výběr smluv z knih aktuálního roku";
                        else
                            rep.params.X0006 = "Výběr smluv ze všech knih";
                    }
                    // název masky a filtry
                    rep.params.X0007 = "";
                    // TODO: použít metodu WidgetExists i jinde (třeba při ověření existence ggridu)?
                    if (Gordic.Utils.WidgetExists("gfilterpanel", this.$filterForm)) {
                        // aktuální filtry (+ filtry pro knihy) pro předání do C# metody
                        rep.customDto = this.$filterForm.gfilterpanel("getConfirmedData");
                        if (this.ekoBookFilter?.ixp_den)
                            $.extend(rep.customDto, { ixp_den: this.ekoBookFilter.ixp_den });
                        if (this.ekoBookFilter?.rok)
                            $.extend(rep.customDto, { rok_den: this.ekoBookFilter.rok });
                        // název filtru
                        return this.$filterForm.gfilterpanel("getFilterCurrent")
                            .then((retVal) => {
                            rep.params.X0007 = retVal?.gfilterpanel_name ?? "";
                            return;
                        });
                    }
                    // ostatní se nastavuje až v C#
                }
            };
            GSeznamDokladuSml = __decorate([
                gcontent
            ], GSeznamDokladuSml);
            WebClient.GSeznamDokladuSml = GSeznamDokladuSml;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbURva2xhZHVTbWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtRG9rbGFkdVNtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNm1GZjtBQTdtRkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNm1GbkI7SUE3bUZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E2bUY3QjtRQTdtRm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DOzs7OztlQUtHO1lBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQXFKO2dCQThHeEw7O21CQUVHO2dCQUNJLGNBQWM7b0JBRWpCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsZUFBZTtvQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQzs0QkFDckMsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDdEMsQ0FBQzt3QkFDRixTQUFTLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzRCQUN0QyxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUN0QyxDQUFDO3dCQUNGLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDOzRCQUN4RCxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUMvQyxDQUFDO3dCQUNGLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7NEJBQzND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QUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQzFGLGVBQWU7d0JBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQzs2QkFDbkQsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7NEJBQ2IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxFQUFFLGlCQUFpQixJQUFJLEVBQUUsQ0FBQzs0QkFDbkQsT0FBTzt3QkFDWCxDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUVELCtCQUErQjtnQkFDbkMsQ0FBQzthQUlKLENBQUE7WUFsbUZZLGlCQUFpQjtnQkFEN0IsUUFBUTtlQUNJLGlCQUFpQixDQWttRjdCO1lBbG1GWSwyQkFBaUIsb0JBa21GN0IsQ0FBQTtRQUNMLENBQUMsRUE3bUZvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE2bUY3QjtJQUFELENBQUMsRUE3bUZnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2bUZuQjtBQUFELENBQUMsRUE3bUZTLE1BQU0sS0FBTixNQUFNLFFBNm1GZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V6bmFtIGRva2xhZMWvIFNNTFxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA0OTAuMS4wLjE3XHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1Eb2tsYWR1U21sIGV4dGVuZHMgR0NvbnRlbnRCYXNlPFNtbEdyaWQuSUdTdGFuZGFyZFNtbEdyaWQ8U21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvLCBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxTZXJ2aWNlUGVybWlzc2lvbj4gJiBHb3JkaWMuRWtvLlV0aWxzLklHRWtvQm9va0V4dGVuc2lvbj4ge1xyXG5cclxuICAgICAgICAvLyB2bGFzdG5vc3RpIHogQyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIEnEjE9cclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSWNvOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBVQ1NcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVWNzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBOS1NcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgTmtzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSByb2tcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUm9rOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHlwIGRva2xhZHUgU01MXHJcbiAgICAgICAgICogQHR5cGUge1NtbC5HbG9iYWxzLkVudW1zLlR5cFNlem5hbXVEb2tsYWR1fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVHlwU2V6bmFtdURva2xhZHU6IFNtbC5HbG9iYWxzLkVudW1zLlR5cFNlem5hbXVEb2tsYWR1O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hYWRtaW5pc3Ryb3ZhbsOpIHR5cHkgZG9rdW1lbnTFr1xyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEl4c1R5cERvazogc3RyaW5nW107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG92b2xlbsOpIHR5cHkgYmxva2HEjW7DrWNoIGFnZW5kXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcltdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVHlwQWdCbG9rQWt0OiBudW1iZXJbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpuYW0gcG92b2xlbsO9Y2gga2F0ZWdvcmnDrSB0eXB1IGRva2xhZHVcclxuICAgICAgICAgKiBAdHlwZSB7U21sLkdsb2JhbHMuRW51bXMuS3RnVHlwW119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBLdGdUeXA6IFNtbC5HbG9iYWxzLkVudW1zLkt0Z1R5cFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtlIGthdGVnb3Jpw61tIHR5cHUgZG9rbGFkdSBtb2hvdSBiw710IGkgZG9kYXRreVxyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgS3RnVHlwVmNldG5lRG9kYXRrdTogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIHNwaXNvdsO9IHV6ZWxcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSXhzU3U6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIHJlZmVyZW50XHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEl4c1JlZjogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGplIHN0w6F0bsOtIHBva2xhZG5hP1xyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSmVJaXNzcDogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBqZSBBxIxSP1xyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSmVBQ1I6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogamUgbGljZW7EjW7DrSBjZXJ0aWZpa8OhdCBrIMWZw616ZW7DqW11IHNjaHZhbG92YWPDrW11IHByb2Nlc3U/XHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBKZVBvbExpY1JTUDogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLb25maWd1cmFjZSBwb2zDrVxyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuU21sLkludGVyZmFjZS5HU21sZHZhZER0b1tdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdmFkOiBHb3JkaWMuU21sLkludGVyZmFjZS5HU21sZHZhZER0b1tdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERhdGFiw6F6b3bDqSBwYXJhbWV0cnlcclxuICAgICAgICAgKiBAdHlwZSB7e319XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBkYnBhcmFtczoge1xyXG4gICAgICAgICAgICAvLyBTTUwg4oCTIMWYUCBSZcW+aW0gc3Rvcm5vdsOhbsOtIGRva2xhZHUgUEZLIHYgb2thbcW+aWt1IHVrb27EjWVuw60gZG9rbGFkdSBTTUxcclxuICAgICAgICAgICAgc21sX3JhZF9wZmtzdG86IG51bWJlcixcclxuICAgICAgICAgICAgLy8gU01MIOKAkyDFmFAgUG9kbcOtbsSbbm9zdCBzY2h2w6FsZW7DrSBkb2tsYWR1IGV4aXN0ZW5jw60gZWxla3Ryb25pY2vDqWhvIG9icmF6dVxyXG4gICAgICAgICAgICBzbWxfcmFkX3ZhbGVsZTogbnVtYmVyO1xyXG4gICAgICAgICAgICAvLyBTTUwg4oCTIMWYUCBQb2Rtw61uxJtub3N0IHNjaHbDoWxlbsOtIHNtbG91dnkvb2JqZWRuw6F2a3kgc3RhdmVtIHp2ZcWZZWpuxJtuw61cclxuICAgICAgICAgICAgc21sX3JhZF92YWxwdWI6IG51bWJlcjtcclxuICAgICAgICAgICAgLy8gU01MIC0gUG9waXMgcG9sZSBTb3V2aXNlasOtY8OtIGRva3VtZW50IDFcclxuICAgICAgICAgICAgc21sX2xibF9kb2sxOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIC8vIFNNTCAtIFBvcGlzIHBvbGUgU291dmlzZWrDrWPDrSBkb2t1bWVudCAyXHJcbiAgICAgICAgICAgIHNtbF9sYmxfZG9rMjogc3RyaW5nLFxyXG4gICAgICAgICAgICAvLyBFS08g4oCTIMWYUCBSZcW+aW0gZG9rbGFkb3bDqSBmaW5hbsSNbsOtIGtvbnRyb2x5XHJcbiAgICAgICAgICAgIGVrb19yYWRfZGZrZW46IG51bWJlcjtcclxuICAgICAgICAgICAgLy8gR0lOIEVQSyAtIFBvZHBvcmEgc2NodmFsb3ZhY8OtaG8gcHJvY2VzdVxyXG4gICAgICAgICAgICBnaW5fZXBrX3NjaHZhbDogbnVtYmVyO1xyXG4gICAgICAgICAgICAvLyBTTUwgLSBUVCBQcm90b2tvbCBvIHNtbHV2bsOtbSBwxZnDrXBhZHVcclxuICAgICAgICAgICAgc21sX3B0bV9wcnRzbWw6IHN0cmluZztcclxuICAgICAgICAgICAgLy8gR0lOIC0gS29udHJvbG92YXQgbWV0YWRhdGEgcMWZaSB1emF2xZllbsOtIGRva3VtZW50xa8vc3Bpc8WvXHJcbiAgICAgICAgICAgIHNzbF92eXJrb25tZXQ6IG51bWJlcjtcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKiogS2F0ZWdvcmllIGtuaWh5Ki9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGt0Z19kZW46IG51bWJlcjtcclxuICAgICAgICAvKiogSWtjKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElrYzogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBNxJtzw61jKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IE1lc2ljOiBudW1iZXI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSBzZXpuYW11XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RQb2Rhbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblBvZGF0KHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5wb2RhbmkoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuZGV0YWlsKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsRG9aYWxvemt5OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWxEb1phbG96a3koe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmRldGFpbERvWmFsb3preSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFNjaHZhbGVuaTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uU2NodmFsaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnNjaHZhbGVuaSh0cnVlKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RacnVzZW5pU2NodmFsZW5pOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXRTY2h2YWxlbmkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnNjaHZhbGVuaShmYWxzZSk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0UG9kZXBzYW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwMDU1XCIsIC8vUkMgMjQxMDAwNTUgOiBQb2RlcHNhdFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnBvZGVwc2FuaSh0cnVlKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNlbmlQb2RlcHNhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAwNTZcIiwgLy9SQyAyNDEwMDA1NiA6IFpydcWhaXQgcG9kZXBzw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5wb2RlcHNhbmkoZmFsc2UpOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VWtvbmNlbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblV6YXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDEwMDA1N1wiLCAvL1JDIDI0MTAwMDU3IDogVWtvbsSNaXRcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC51a29uY2VuaSh0cnVlKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RacnVzZW5pVWtvbmNlbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpydXNpdFV6YXZyZW5pKHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAwNThcIiwgLy9SQyAyNDEwMDA1OCA6IFpydcWhaXQgdWtvbsSNZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnVrb25jZW5pKGZhbHNlKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RTdG9ybm86IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblN0b3Jub3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuc3Rvcm5vKHRydWUpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNlbmlTdG9ybmE6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpydXNpdFN0b3Jubyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuc3Rvcm5vKGZhbHNlKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RSZXplcnZhY2VJaXNzcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDEwMDE5MlwiLCAvL1JDIDI0MTAwMTkyIDogUmV6ZXJ2b3ZhdCB2IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LkplSWlzc3AsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQucmV6ZXJ2YWNlSWlzc3AoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByZWRhbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByZWRhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQucHJlZGFuaSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFByZXZ6ZXRpOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmV2eml0KHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5wcmV2emV0aSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFByaWRlbGVuaTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUHJpZGVsaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnByaWRlbGVuaSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFByZWV2aWRlbmNlOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmVldmlkb3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQucHJlZXZpZGVuY2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RTY2h2YWxlbmlQb2xvemVrRlA6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblNjaHZhbGl0KHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAxNzlcIiwgLy9SQyAyNDEwMDE3OSA6IFNjaHbDoWxpdCBwb2xvxb5reSBGUFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnNjaHZhbGVuaVBvbG96ZWtGUCgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdEZpbmFuY25pS29udHJvbGE6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkZpbmFuY25pS29udHJvbGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmZpbmFuY25pS29udHJvbGEoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RLb250cm9sYU1ldGFkYXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbktvbnRyb2xhTWV0YWRhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQua29udHJvbGFNZXRhZGF0KCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0VXZvbG5lbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFV2b2xuZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTI2XCIsIC8vUkMgMzM2MDA1MjYgOiBVdm9sbsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNjAwNTI3XCIsIC8vUkMgMzM2MDA1MjcgOiBIcm9tYWRuw6kgdXZvbG7Em27DrSB2b2xuw71jaCBwcm9zdMWZZWRrxa8gdnlicmFuw71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC51dm9sbmVuaSgpKSB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Wm1lbmFVZGFqdToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Wm1lbmFVZGFqdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDUyOFwiLCAvL1JDIDMzNjAwNTI4IDogWm3Em25hIMO6ZGFqxa9cclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA1MjlcIiwgLy9SQyAzMzYwMDUyOSA6IEhyb21hZG7DoSB6bcSbbmEgw7pkYWrFryB2eWJyYW7DvWNoIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LnptZW5hVWRhanUoKSA/PyAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpKSB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0R2VuZXJvdmFuaVBvdWthenU6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdlbmVyb3ZhbmlQb3VrYXp1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwMDc5XCIsIC8vUkMgMjQxMDAwNzkgOiBHZW5lcm92YXQgcG91a2F6eVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyNDEwMDA4MlwiLCAvL1JDIDI0MTAwMDgyIDogR2VuZXJvdsOhbsOtIMW+w6Fkb3N0w60gbmEgemFsb8W+ZW7DrSBwb3VrYXrFr1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZ2VuZXJhdGV8Z2ktbGlzdCBnaS1zdGFjay1wb3MtLXJiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuZ2VuZXJvdmFuaVBvdWthenUoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEdlbmVyb3ZhbmlQb2hsZWRhdmt5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHZW5lcm92YW5pUG9obGVkYXZreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDEwMDA4MFwiLCAvL1JDIDI0MTAwMDgwIDogR2VuZXJvdmF0IHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjI0MTAwMDgxXCIsIC8vUkMgMjQxMDAwODEgOiBHZW5lcm92w6Fuw60gxb7DoWRvc3TDrSBuYSB6YWxvxb5lbsOtIHBvaGxlZMOhdmVrXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1nZW5lcmF0ZXxnaS1saXN0IGdpLXN0YWNrLXBvcy0tcmJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5nZW5lcm92YW5pUG9obGVkYXZlaygpOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJpZGF0RG9Qb3Jvdm5hbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByaWRhdERvUG9yb3ZuYW5pKHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgU21sR3JpZC5Db21wYXJhdG9yLmFkZCh0aGF0KTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcInNtbF9wdG1fZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTZXpuYW1Eb2tsYWR1U21sOlByaW50UGFyYW1ldGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7IHJldHVybiB0aGF0LnJlcG9ydFN0YXJ0aW5nKHJlcCk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0T2Rlc2xhdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2Rlc2xhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDYxMlwiLCAvL1JDIDMzNjAwNjEyIDogT2Rlc2xhdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDYxM1wiLCAvL1JDIDMzNjAwNjEzIDogSHJvbWFkbsOpIHZ5Z2VuZXJvdsOhbsOtIGVsLiBvYnJhesWvIGEgb2Rlc2zDoW7DrSB2eWJyYW7DvWNoIGRva2xhZMWvIGRvIHbDvXByYXZueVxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2VuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9kZXNsYW5pKCk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQb2xvemt5VlA6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAxODRcIiwgLy9SQyAyNDEwMDE4NCA6IFBvbG/Fvmt5IFZQXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjI0MTAwMTg1XCIsIC8vUkMgMjQxMDAxODUgOiBQb2xvxb5reSB2xJtjbsOpaG8gcHJvZmlsdVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnBvbG96a3lWUCgpOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UG9sb3preUZQOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwMTg2XCIsIC8vUkMgMjQxMDAxODYgOiBQb2xvxb5reSBGUFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyNDEwMDE4N1wiLCAvL1JDIDI0MTAwMTg3IDogUG9sb8W+a3kgZmluYW7EjW7DrWhvIHByb2ZpbHVcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5wb2xvemt5RlAoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAyMDlcIiwgLy9SQyAyNDEwMDIwOSA6IEluZm9cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5pbmZvKCk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RaYXBpc3k6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAyMDhcIiwgLy9SQyAyNDEwMDIwOCA6IFrDoXBpc3lcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC56YXBpc3koKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBtZW51YmFyXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKHRoaXMuZ2V0TWVudUFjdGlvbnMoKSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gZmxhc2ggc2Ugc3RhdmVtIGtuaWh5XHJcbiAgICAgICAgICAgIEVrby5VdGlscy5TaG93RWtvQm9va1N0YXRlRmxhc2godGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBpbmljaWFsaXphY2UgZG9rdW1lbnR1XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgU21sR3JpZC5kb2t1bWVudEluaXQoKS50aGVuKChkb2t1bWVudFBhcmFtcykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrSBwYXJhbWV0csWvIGRva3VtZW50dSBwcm8gZGFsxaHDrSBwb3XFvml0w61cclxuICAgICAgICAgICAgICAgIHRoYXQuRG9rdW1lbnRQYXJhbXMgPSBkb2t1bWVudFBhcmFtcztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmaWx0cnlcclxuICAgICAgICAgICAgICAgIHRoYXQuJGZpbHRlckZvcm0gPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkZpbHRlcnMuZ2V0RmlsdGVyUGFyYW1zPEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxGaWx0ZXI+KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nZXRGaWx0ZXJzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsLy9bXCJzX2J2eVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic21sX3B0bV9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXhzX2Z1bl9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gc2xvdXBjZVxyXG4gICAgICAgICAgICAgICAgbGV0IGdyaWRGb3JtYXQgPSBTbWxHcmlkLkRva2xhZC5jcmVhdGVHcmlkRm9ybWF0KHRoYXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHZpZXdcclxuICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXc8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuRG9rbGFkU21sLmxpc3QocnEgPT4gcnEpLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyUGFuZWw6IHRoYXQuJGZpbHRlckZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogdGhhdC5QcmltYXJ5S2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZ3JpZFxyXG4gICAgICAgICAgICAgICAgJChcIjxkaXYgY2xhc3M9J1Nlem5hbVNtbCc+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvPihcclxuICAgICAgICAgICAgICAgICAgICAgICAgU21sR3JpZC5Eb2tsYWQuZ2V0R3JpZE9wdGlvbnMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHN0YXZ1IG9rbmEgYSBuw6FobGVkdSBwb2RsZSBha3R1w6FsbsSbIHZ5YnJhbsOpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucHJldmlld0NvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiAhPSBudWxsICYmIG9iai5jZWxsSW5mbyAhPSBudWxsICYmIG9iai5jZWxsSW5mby5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHBva3VkIGJ5IGJ5bG8gcG90xZllYmEgxZllxaFpdCBuYXN0YXZlbsOtIG9rbmEgcG8gcMWZZXN1bnUgcG8gZ3JpZHUsIHRhayB0byBvZGtvbWVudG92YXQsIGFsZSBwcsOhdmEgesOhem5hbW92w6EgcHLDoXZhIHNlIGFrdHXDoWxuxJsgbmXFmWXFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuc2hvdyhvYmouY2VsbEluZm8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBtxa/FvmUgdG9obGUgdsWvYmVjIG5hc3RhdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2VsbENvbnRleHQpID0+IFNtbEdyaWQuZ2V0Q29udGV4dE1lbnVQYXJhbXMoY2VsbENvbnRleHQsIChjZWxsQ29udGV4dCkgPT4gdGhhdC5hY3Rpb25zLmNyZWF0ZUJhcih0aGF0LmdldE1lbnVBY3Rpb25zKHRydWUsIGNlbGxDb250ZXh0KSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcMWZaWRhdCBkYXRhIGRvIG1ldG9kIGdldEdyaWRPcHRpb25zPyBhc2kgYW5vLCBwcm90b8W+ZSB2aWV3IGJ1ZHUgcMWZZWTDoXZhdCB2xaF1ZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGF0YTogdGhhdC52aWV3IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuZ2dyaWRla28oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3XEjXRvdsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0FsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRsb3Vow70gc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0QWxsb3dlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RDb3VudE1ldGhvZDogKHJxKSA9PiB0aGF0LmlzbC5Eb2tsYWRTbWwubGlzdENvdW50KHJxKS5nZXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RNb2RpZnlScU1ldGhvZDogKHJxKSA9PiBTbWxHcmlkLm1vZGlmeUxpc3RSZXF1ZXN0KHRoYXQsIHJxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZpbHRlcnMpID0+ICQuZXh0ZW5kKHt9LCBmaWx0ZXJzLCB7IGt0Z190eXA6IHRoYXQuS3RnVHlwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZHJvd3NjYWxjKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyQ29sdW1uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJpbmNsdWRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBFa28uR3JpZC5nZXRDb2x1bW5zRm9yQ2FsYyhncmlkRm9ybWF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIHptxJtueSB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXcub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBmb2N1c0Z1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmQoXCIuU2V6bmFtU21sLmdncmlkXCIpLmdncmlkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgKHRoYXQudmlldyBhcyBhbnkpLm9mZihcImNoYW5nZS5mb2N1c1wiLCBmb2N1c0Z1bmMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlldy5vbihcImNoYW5nZS5mb2N1c1wiLCBmb2N1c0Z1bmMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG7DoWhsZWQgdiBwcmF2w6ltIGJvxI1uw61tIHBhbmVsdVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmdzaWRlYmFyKFwib3B0aW9uXCIsIHsgcmlnaHQ6IHsgd2lkdGg6IDIwMCwgdmlzaWJsZTogZmFsc2UsIGxlYWZzQXV0b0hpZGU6IGZhbHNlIH0gfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlld1BhbmVsc0RlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJldmlld3MuZ2V0RGVmYXVsdFByZXZpZXdUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlua1Byb3ZpZGVyOiBmdW5jdGlvbiAobG9hZFBhcmFtcykgeyByZXR1cm4gR29yZGljLldlYkFwcC5VdGlsaXR5LmNyZWF0ZUNvbW1hbmRVcmwobnVsbCwgXCJPcGVuRGV0YWlsXCIsIHsgaXhwOiBsb2FkUGFyYW1zLml4cCB9LCB7IHRpY2tldFR5cGU6IEdvcmRpYy5FbnVtcy5UaWNrZXRUeXBlLldpdGhMb2dpbkFuZENvbnRleHQgfSkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdJZDogXCJzbWw6RG9rbGFkU21sXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmV2aWV3cy5nZXRGaWxlUHJldmlld1RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBQcm92aWRlcjogZnVuY3Rpb24gKGxvYWRQYXJhbXMpIHsgcmV0dXJuIGxvYWRQYXJhbXMuaXhwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKHRoYXQuZWxlbWVudCwgcHJldmlld1BhbmVsc0RlZmluaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBvcm92bsOhbsOtXHJcbiAgICAgICAgICAgICAgICBTbWxHcmlkLkNvbXBhcmF0b3IuY3JlYXRlKHRoYXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gYWtjw60gKGplIHBvdMWZZWJhIHYgcMWZw61wYWTEmywgxb5lIGplIHZ5cG51dMOpIG5hxI10ZW7DrSBzZXpuYW11IHDFmWkgc3B1xaF0xJtuw60pXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gUG9kw6Fuw60gYSBkZXRhaWxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG9kw6Fuw60gZG9rbGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHBvZGFuaSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gcHLDoXpkbsOpaG8gZGV0YWlsdSAtIHZ5dm9sw6Egc2UgcG9kw6Fuw61cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbkRldGFpbCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuw60gZGV0YWlsdSBkb2tsYWR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSB2eWJyYW7DoSBwb2xvxb5rYVxyXG4gICAgICAgICAgICBjb25zdCBha3RSYWRlayA9IEVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4odGhpcy5lbGVtZW50LmZpbmQoXCIuU2V6bmFtU21sLmdncmlkXCIpKTtcclxuICAgICAgICAgICAgaWYgKGFrdFJhZGVrICYmICEoYWt0UmFkZWsgaW5zdGFuY2VvZiBqUXVlcnkpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvdGV2xZllbsOtIGRldGFpbHUgYWt0dcOhbG7DrSB2eWJyYW7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbkRldGFpbCh0aGlzLCBha3RSYWRlayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuw60gZGV0YWlsdSBleGlzdHVqw61jw61obyBuZWJvIHBvZMOhbsOtIG5vdsOpaG8gZG9rbGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnQgY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b30gW3Jvd10gYWt0dcOhbG7DrSDFmcOhZGVrIChwcm8gem9icmF6ZW7DrSBkZXRhaWx1KSBuZWJvIG5ldnlwbG7Em25vIChwcm8gcG9kw6Fuw60pXHJcbiAgICAgICAgICogQHBhcmFtIHtTbWxHcmlkLm9wZW5EZXRhaWxXaXphcmRQYXJhbXN9IFt3aXphcmRdIHBhcmFtZXRyeSBwcsWvdm9kY2UgKHYgcMWZw61wYWTEmyB2b2zDoW7DrSBkZXRhaWx1IHogcHLFr3ZvZGNlKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wZW5EZXRhaWwoXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgICAgICByb3c/OiBHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvLFxyXG4gICAgICAgICAgICB3aXphcmQ/OiBTbWxHcmlkLm9wZW5EZXRhaWxXaXphcmRQYXJhbXNcclxuICAgICAgICApOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHrDoXNvYm7DrWsgem3Em27Em27DvWNoIHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICBsZXQgY2hhbmdlZFJvd3M6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBHUEMgcyBrbmlob3UgeiBha3R1w6FsbsOtaG8gesOhem5hbXVcclxuICAgICAgICAgICAgY29uc3QgbmV3R3BjID0gKHJvdyA/IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjb250ZW50LmdwYywgcm93Lml4cF9kZW4hKSA6IGNvbnRlbnQuZ3BjKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICAgICAgICAvLyB6amnFoXTEm27DrSBkZXRhaWxvdsOpaG8gb2tuYVxyXG4gICAgICAgICAgICBsZXQgZGV0YWlsSUQgPSBcIkRldGFpbERva2xhZHVTbWxcIjtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGF0LlR5cFNlem5hbXVEb2tsYWR1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNtbC5HbG9iYWxzLkVudW1zLlR5cFNlem5hbXVEb2tsYWR1LlNtbG91dmE6XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsSUQgPSBcIkRldGFpbFNtbG91dnlcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU21sLkdsb2JhbHMuRW51bXMuVHlwU2V6bmFtdURva2xhZHUuU21sb3V2YURvZGF2YXRlbHNrYTpcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxJRCA9IFwiRGV0YWlsU21sb3V2eURvZGF2YXRlbHNrZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5TbWxvdXZhT2RiZXJhdGVsc2thOlxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxTbWxvdXZ5T2RiZXJhdGVsc2tlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNtbC5HbG9iYWxzLkVudW1zLlR5cFNlem5hbXVEb2tsYWR1LlNtbG91dmFCZXpSb3psaXNlbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsSUQgPSBcIkRldGFpbFNtbG91dnlCZXpSb3psaXNlbmlcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU21sLkdsb2JhbHMuRW51bXMuVHlwU2V6bmFtdURva2xhZHUuU21sb3V2YUJlekZQOlxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxTbWxvdXZ5QmV6RlBcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU21sLkdsb2JhbHMuRW51bXMuVHlwU2V6bmFtdURva2xhZHUuT2JqZWRuYXZrYTpcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxJRCA9IFwiRGV0YWlsT2JqZWRuYXZreVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5PYmplZG5hdmthRG9kYXZhdGVsc2thOlxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxPYmplZG5hdmt5RG9kYXZhdGVsc2tlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNtbC5HbG9iYWxzLkVudW1zLlR5cFNlem5hbXVEb2tsYWR1Lk9iamVkbmF2a2FPZGJlcmF0ZWxza2E6XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsSUQgPSBcIkRldGFpbE9iamVkbmF2a3lPZGJlcmF0ZWxza2VcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU21sLkdsb2JhbHMuRW51bXMuVHlwU2V6bmFtdURva2xhZHUuT2JqZWRuYXZrYUJlelJvemxpc2VuaTpcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxJRCA9IFwiRGV0YWlsT2JqZWRuYXZreUJlelJvemxpc2VuaVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5PYmplZG5hdmthQmV6RlA6XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsSUQgPSBcIkRldGFpbE9iamVkbmF2a3lCZXpGUFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5QcmlzbGliTmVib0ppbnlQcmlqZW06XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsSUQgPSBcIkRldGFpbFByaXNsaWJ1TmVib0ppbmVob1ByaWptdVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5QcmlzbGliTGltaXRvdmFueTpcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxJRCA9IFwiRGV0YWlsUHJpc2xpYnVMaW1pdG92YW5laG9cIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU21sLkdsb2JhbHMuRW51bXMuVHlwU2V6bmFtdURva2xhZHUuUHJpc2xpYkluZGl2aWR1YWxuaTpcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxJRCA9IFwiRGV0YWlsUHJpc2xpYnVJbmRpdmlkdWFsbmlob1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5KaW55UHJpamVtSW5kaXZpZHVhbG5pOlxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxKaW5laG9QcmlqbXVJbmRpdmlkdWFsbmlob1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5KaW55UHJpamVtT2Nla2F2YW55OlxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbElEID0gXCJEZXRhaWxKaW5laG9QcmlqbXVcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBwbyBkb8WZZcWhZW7DrSBrbmloIHNtYXphdCBwb3XFvml0w60gcHJvbcSbbm7DvWNoIEl4cERlbiwgU3VicmFkYURlbiBhIEFrdFN1YnJhZHlEZW5cclxuICAgICAgICAgICAgbGV0ICRkZXRhaWxXaW5kb3cgPSBjb250ZW50Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgW1wiR29yZGljLlNtbC5XZWJDbGllbnQuR1wiICsgZGV0YWlsSUQsIHsgZ3BjOiBuZXdHcGMsIGdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHdpemFyZD8uZ3JpZCA/PyB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIikpIH1dLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElEOiBkZXRhaWxJRCArICcjJyxcclxuICAgICAgICAgICAgICAgICAgICBJeHA6IHJvdz8uaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIEl4cERlbjogcm93Py5peHBfZGVuID8/IHRoYXQuZ2V0SXhwRGVuKCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG/FmWXFoWl0IHDFmWVkw6F2w6Fuw60ga3RnX3R5cCBhIGt0Z19kZW4gbmVibyB2b2xhdCBwxZnDrW1vIHNwcsOhdm7DvSBkZXRhaWw/XHJcbiAgICAgICAgICAgICAgICAgICAgLy9LdGdUeXA6IHRoYXQuS3RnVHlwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBvdGVzdG92YXQsIGplc3RsaSBkb2LFmWUgZnVuZ3VqZSBha3R1YWxpemFjZSBvYm91IHNlem5hbcWvIGEgbmFzdGF2ZW7DrSBhY3RpdmVSb3cgYSBmb2t1c3VcclxuXHJcbiAgICAgICAgICAgIC8vIG9ic2x1aGEgYWt0aXZuw60gb3BlcmFjZSBuYSBkZXRhaWx1XHJcbiAgICAgICAgICAgICQuY29udGVudCgkZGV0YWlsV2luZG93KS5vbihTbWxEZXRhaWwudHJpZ2dlckNoYW5nZSwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0VmFsPy5kYXRhPy5peHApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIGRvIHNlem5hbXUgesOhem5hbcWvIGsgb2LEjWVyc3R2ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkUm93cy5pbmRleE9mKHJldFZhbC5kYXRhLml4cCkgPCAwKSBjaGFuZ2VkUm93cy5wdXNoKHJldFZhbC5kYXRhLml4cCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gb2JzbHVoYSB1a29uxI1lbsOtIG9rbmFcclxuICAgICAgICAgICAgJGRldGFpbFdpbmRvdy5vbihcImNsb3NlZFwiLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZm9rdXN1IChqZW4gcG9rdWQgbmVuw60gcHLFr3ZvZGNlKVxyXG4gICAgICAgICAgICAgICAgaWYgKCF3aXphcmQpIHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKS5nZ3JpZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2Ugem3Em27Em27DvWNoIHrDoXpuYW3FryAodiBobGF2bsOtbSBzZXpuYW11IGkgcMWZw61wYWRuxJsgdiBwcsWvdm9kY2kpXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZFJvd3M/Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGFrdGl2bsOtIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2l6YXJkPy5zZXRBY3RpdmVPcGVyYXRpb24gJiYgdHlwZW9mICh3aXphcmQuc2V0QWN0aXZlT3BlcmF0aW9uKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpemFyZC5zZXRBY3RpdmVPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgesOha2xhZG7DrWhvIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKHsgZmlsdGVyczogeyBpeHA6IGNoYW5nZWRSb3dzIH0sIG9ubHlQS1dpdGhvdXRGaWx0ZXJzOiB0cnVlIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGFrdHXDoWxuw61obyDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsPy5yZXR1cm5WYWx1ZT8uaXhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmQoXCIuU2V6bmFtU21sLmdncmlkXCIpLmdncmlkKFwiYWN0aXZlUm93XCIsIHsgaXhwOiByZXRWYWw/LnJldHVyblZhbHVlPy5peHAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2IHDFmcOtcGFkxJsgcHLFr3ZvZGNlIGkgYWt0dWFsaXphY2UgZ3JpZHUgdiBwcsWvdm9kY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aXphcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTbWxXaXphcmQucmVsb2FkUm93cygocnEpID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC5saXN0KHJxKTsgfSwgeyBpeHA6IGNoYW5nZWRSb3dzIH0sIHdpemFyZC5ncmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2l6YXJkICYmIHdpemFyZC5yZWZyZXNoQW5kQ2hlY2tEYXRhQWN0aW9uICE9IHVuZGVmaW5lZCAmJiB0eXBlb2YgKHdpemFyZC5yZWZyZXNoQW5kQ2hlY2tEYXRhQWN0aW9uKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpemFyZC5yZWZyZXNoQW5kQ2hlY2tEYXRhQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJGRldGFpbFdpbmRvdy5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGRldGFpbHUgc291cGlza3kgdiBub3bDqSB6w6Fsb3pjZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRldGFpbERvWmFsb3preSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgY29uc3QgYWt0UmFkZWsgPSBFa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8+KHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKSk7XHJcbiAgICAgICAgICAgIGlmIChha3RSYWRlayAmJiAhKGFrdFJhZGVrIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1IGFrdHXDoWxuw60gdnlicmFuw6kgcG9sb8W+a3kgdiBub3bDqSB6w6Fsb8W+Y2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBTbWxVdGlscy5vcGVuRGV0YWlsSW5PdGhlclRhYihTbWwuR2xvYmFscy5FbnVtcy5UeXBBZy5TTUwsIGFrdFJhZGVrLml4cCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gSHJvbWFkbsOpIG9wZXJhY2VcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2NodmFsZW7DrSAvIHpydcWhZW7DrSBzY2h2YWxlbsOtIHZ5YnJhbsO9Y2ggZG9rbGFkxa9cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2NodmFsaXQgc2NodsOhbGl0ICh0cnVlKSBuZWJvIHpydcWhaXQgc2NodsOhbGVuw60gKGZhbHNlKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNjaHZhbGVuaShzY2h2YWxpdDogYm9vbGVhbik6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IG9wZXJhY2VcclxuICAgICAgICAgICAgaW50ZXJmYWNlIHNjaHZhbGVuaU1vZGVsIHtcclxuICAgICAgICAgICAgICAgIGlfYmV6X2VsX29icmF6dTogYm9vbGVhbiB8IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpX2Jlel96dmVyZWpuZW5pOiBib29sZWFuIHwgbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gZm9ybXVsw6HFmSBzIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICBsZXQgZm9ybVBhcmFtcyA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIvKiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMy03LTIsIE0tMy03LTIsIFMtMTItMTItMFwiKi8gfSkuYWRkU2VjdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAoc2NodmFsaXQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmRicGFyYW1zPy5zbWxfcmFkX3ZhbGVsZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1QYXJhbXMuYWRkUm93KC8qXCJFbC4gb2JyYXpcIiovKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiaV9iZXpfZWxfb2JyYXp1XCIsIGxhYmVsOiBcImpyZXM6MjQxMDAyMTlcIiB9KTsgLy9SQyAyNDEwMDIxOSA6IHNjaHbDoWxpdCwgYW5pxb4gYnkgZXhpc3RvdmFsIGVsZWt0cm9uaWNrw70gb2JyYXpcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmRicGFyYW1zPy5zbWxfcmFkX3ZhbHB1YiA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1QYXJhbXMuYWRkUm93KC8qXCJadmXFmWVqbsSbbsOtXCIqLykuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcImlfYmV6X3p2ZXJlam5lbmlcIiwgbGFiZWw6IFwianJlczoyNDEwMDIyMFwiIH0pOyAvL1JDIDI0MTAwMjIwIDogc2NodsOhbGl0LCBhbmnFviBieSBieWwgZG9rbGFkIHp2ZcWZZWpuxJtuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHZvbMOhbsOtIHByxa92b2RjZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC53aXphcmRUd29TdGVwczxHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sU2NodmFsZW5pT3BlcmF0aW9uRHRvLCBzY2h2YWxlbmlNb2RlbD4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiU2NodmFsZW5pRG9rbGFkdVNtbCNcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2NodmFsaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJTY2h2w6FsZW7DrVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiWnJ1xaFlbsOtIHNjaHbDoWxlbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzY2h2YWxpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIkFrY2Ugc2NodsOhbMOtIHZ5YnJhbsOpICh6YcWha3J0bnV0w6kpIGRva2xhZHkuIFBvIGplasOtbSBwcm92ZWRlbsOtIGJ1ZG91IHR5dG8gZG9rbGFkeSB2ZSBzdGF2dSAnc2NodsOhbGVuJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiQWtjZSB6cnXFocOtIHNjaHbDoWxlbsOtIHZ5YnJhbsO9Y2ggKHphxaFrcnRudXTDvWNoKSBkb2tsYWTFry4gUG8gamVqw61tIHByb3ZlZGVuw60gYnVkb3UgdHl0byBkb2tsYWR5IHZlIHN0YXZ1ICdldmlkb3bDoW4nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbkFjdGlvbjogc2NodmFsaXQgPyB0aGF0LmFjdGlvbnMuYWN0U2NodmFsZW5pIS5jYXB0aW9uIDogdGhhdC5hY3Rpb25zLmFjdFpydXNlbmlTY2h2YWxlbmkhLmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1QYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7IGlfYmV6X2VsX29icmF6dTogbnVsbCwgaV9iZXpfenZlcmVqbmVuaTogbnVsbCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b09wZXJhdGlvbkR0bzogKG1vZGVsLCBkYXRhLCBpa2MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWtjOiBpa2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2h2YWxpdDogc2NodmFsaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaV9iZXpfZWxfb2JyYXp1OiBtb2RlbD8uaV9iZXpfZWxfb2JyYXp1ID8/IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlfYmV6X3p2ZXJlam5lbmk6IG1vZGVsPy5pX2Jlel96dmVyZWpuZW5pID8/IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc2xDaGVja0JlZm9yZU9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLnprb250cm9sdWpQcmVkU2NodmFsZW5pbShkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc2xPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC5ocm9tYWRuZVNjaHZhbChkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxpbmdBY3Rpb246IHNjaHZhbGl0ID8gdGhhdC5hY3Rpb25zLmFjdFNjaHZhbGVuaSA6IHRoYXQuYWN0aW9ucy5hY3RacnVzZW5pU2NodmFsZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2NodmFsZW7DrSBwb2xvxb5layBGUCB2eWJyYW7DvWNoIGRva2xhZMWvXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzY2h2YWxlbmlQb2xvemVrRlAoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyB2b2zDoW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkVHdvU3RlcHM8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbFNjaHZhbGVuaU9wZXJhdGlvbkR0bz4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiU2NodmFsZW5pUG9sb3pla0ZQRG9rbGFkdVNtbCNcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6XCJTY2h2w6FsZW7DrSBwb2xvxb5layBGUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBa2NlIHNjaHbDoWzDrSBwb2xvxb5reSBGUCB2eWJyYW7DvWNoICh6YcWha3J0bnV0w71jaCkgZG9rbGFkxa9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uQWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0U2NodmFsZW5pUG9sb3pla0ZQIS5jYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b09wZXJhdGlvbkR0bzogKG1vZGVsLCBkYXRhLCBpa2MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWtjOiBpa2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2h2YWxpdDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC56a29udHJvbHVqUHJlZFNjaHZhbGVuaW1Qb2xvemVrRlAoZHRvKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNsT3BlcmF0aW9uOiAoZHRvKSA9PiB7IHJldHVybiB0aGF0LmlzbC5Eb2tsYWRTbWwuaHJvbWFkbmVTY2h2YWxQb2xvemt5RlAoZHRvKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsaW5nQWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0U2NodmFsZW5pUG9sb3pla0ZQXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG9kZXBzw6Fuw60gLyB6cnXFoWVuw60gcG9kZXBzw6Fuw60gdnlicmFuw71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBwb2RlcHNhdCBwb2RlcHNhdCAodHJ1ZSkgbmVibyB6cnXFoWl0IHBvZGVwc8OhbsOtIChmYWxzZSlcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb2RlcHNhbmkocG9kZXBzYXQ6IGJvb2xlYW4pOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHZvbMOhbsOtIHByxa92b2RjZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC53aXphcmRUd29TdGVwczxHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sUG9kZXBzYW5pT3BlcmF0aW9uRHRvPihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJQb2RlcHNhbmlEb2tsYWR1U21sI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBwb2RlcHNhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIlBvZGVwc8OhbsOtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJacnXFoWVuw60gcG9kZXBzw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHBvZGVwc2F0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiQWtjZSBwb2RlcMOtxaFlIHZ5YnJhbsOpICh6YcWha3J0bnV0w6kpIGRva2xhZHkuIFBvIGplasOtbSBwcm92ZWRlbsOtIGJ1ZG91IHR5dG8gZG9rbGFkeSB2ZSBzdGF2dSAncG9kZXBzw6FuJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiQWtjZSB6cnXFocOtIHBvZGVwc8OhbsOtIHZ5YnJhbsO9Y2ggKHphxaFrcnRudXTDvWNoKSBkb2tsYWTFry4gUG8gamVqw61tIHByb3ZlZGVuw60gYnVkb3UgdHl0byBkb2tsYWR5IHZlIHN0YXZ1ICdzY2h2w6FsZW4nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbkFjdGlvbjogcG9kZXBzYXQgPyB0aGF0LmFjdGlvbnMuYWN0UG9kZXBzYW5pIS5jYXB0aW9uIDogdGhhdC5hY3Rpb25zLmFjdFpydXNlbmlQb2RlcHNhbmkhLmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvT3BlcmF0aW9uRHRvOiAobW9kZWwsIGRhdGEsIGlrYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpa2M6IGlrYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvZGVwc2F0OiBwb2RlcHNhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC56a29udHJvbHVqUHJlZFBvZGVwc2FuaW0oZHRvKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNsT3BlcmF0aW9uOiAoZHRvKSA9PiB7IHJldHVybiB0aGF0LmlzbC5Eb2tsYWRTbWwuaHJvbWFkbmVQb2RlcGlzKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGluZ0FjdGlvbjogcG9kZXBzYXQgPyB0aGF0LmFjdGlvbnMuYWN0UG9kZXBzYW5pIDogdGhhdC5hY3Rpb25zLmFjdFpydXNlbmlQb2RlcHNhbmlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVa29uxI1lbsOtIC8genJ1xaFlbsOtIHVrb27EjWVuw60gdnlicmFuw71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB1a29uY2l0IHVrb27EjWl0ICh0cnVlKSBuZWJvIHpydcWhaXQgdWtvbsSNZW7DrSAoZmFsc2UpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdWtvbmNlbmkodWtvbmNpdDogYm9vbGVhbik6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IG9wZXJhY2VcclxuICAgICAgICAgICAgaW50ZXJmYWNlIHVrb25jZW5pTW9kZWwge1xyXG4gICAgICAgICAgICAgICAgaV9iZXpfdmF6YnlfbmFfZG9rbGFkX2NlcnBhbmk6IGJvb2xlYW4gfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgaV9wcmlfY2h5Ym55Y2hfbWV0YWRhdGVjaDogYm9vbGVhbiB8IG51bGxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIGZvcm11bMOhxZkgcyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgbGV0IGZvcm1QYXJhbXMgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiLyosIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTMtNy0yLCBNLTMtNy0yLCBTLTEyLTEyLTBcIiovIH0pLmFkZFNlY3Rpb24oKTtcclxuICAgICAgICAgICAgaWYgKHVrb25jaXQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHRhZHkgYXNpIMW+w6FkbsOhIGRvcMWZZWR1IHpuw6Ftw6EgcG9kbcOtbmthIG5lbsOtLCBhbGUgamXFoXTEmyB0byBwxZlla29udHJvbG92YXRcclxuICAgICAgICAgICAgICAgIGZvcm1QYXJhbXMuYWRkUm93KC8qXCJadmXFmWVqbsSbbsOtXCIqLykuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcImlfYmV6X3ZhemJ5X25hX2Rva2xhZF9jZXJwYW5pXCIsIGxhYmVsOiBcImpyZXM6MjQxMDAyMTdcIiB9KTsgLy9SQyAyNDEwMDIxNyA6IHVrb27EjWl0LCBpIGtkecW+IGRva2xhZCBuZW7DrSB2w6F6w6FuIG5hIGRva2xhZHkgcmVhbGl6dWrDrWPDrSDEjWVycMOhbsOtIHByb3N0xZllZGvFryAoZG9rbGFkeSByZXplcnZhxI1uw61jaCBhZ2VuZCwgb2JqZWRuw6F2a3kpXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5kYnBhcmFtcz8uc3NsX3Z5cmtvbm1ldCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1QYXJhbXMuYWRkUm93KC8qXCJFbC4gb2JyYXpcIiovKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwiaV9wcmlfY2h5Ym55Y2hfbWV0YWRhdGVjaFwiLCBsYWJlbDogXCJqcmVzOjI0MTAwMjE4XCIgfSk7IC8vUkMgMjQxMDAyMTggOiB1a29uxI1pdCBpIHDFmWkgemppxaF0xJtuw60gbmVzcm92bmFsb3N0w60gdiBrb250cm9sZSBtZXRhZGF0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHZvbMOhbsOtIHByxa92b2RjZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC53aXphcmRUd29TdGVwczxHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sVWtvbmNlbmlPcGVyYXRpb25EdG8sIHVrb25jZW5pTW9kZWw+KFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlVrb25jZW5pRG9rbGFkdVNtbCNcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdWtvbmNpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIlVrb27EjWVuw61cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlpydcWhZW7DrSB1a29uxI1lbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB1a29uY2l0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiQWtjZSB1a29uxI3DrSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBkb2tsYWR5LiBQbyBqZWrDrW0gcHJvdmVkZW7DrSBidWRvdSB0eXRvIGRva2xhZHkgdmUgc3RhdnUgJ3Vrb27EjWVuJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiQWtjZSB6cnXFocOtIHVrb27EjWVuw60gdnlicmFuw71jaCAoemHFoWtydG51dMO9Y2gpIGRva2xhZMWvLiBQbyBqZWrDrW0gcHJvdmVkZW7DrSBidWRvdSB0eXRvIGRva2xhZHkgdmUgc3RhdnUgJ3BvZGVwc8OhbidcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uQWN0aW9uOiB1a29uY2l0ID8gdGhhdC5hY3Rpb25zLmFjdFVrb25jZW5pIS5jYXB0aW9uIDogdGhhdC5hY3Rpb25zLmFjdFpydXNlbmlVa29uY2VuaSEuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybVBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHsgaV9iZXpfdmF6YnlfbmFfZG9rbGFkX2NlcnBhbmk6IG51bGwsIGlfcHJpX2NoeWJueWNoX21ldGFkYXRlY2g6IG51bGwgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbCwgZGF0YSwgaWtjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogaWtjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWtvbmNpdDogdWtvbmNpdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpX2Jlel92YXpieV9uYV9kb2tsYWRfY2VycGFuaTogbW9kZWw/LmlfYmV6X3ZhemJ5X25hX2Rva2xhZF9jZXJwYW5pID8/IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlfcHJpX2NoeWJueWNoX21ldGFkYXRlY2g6IG1vZGVsPy5pX3ByaV9jaHlibnljaF9tZXRhZGF0ZWNoID8/IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc2xDaGVja0JlZm9yZU9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLnprb250cm9sdWpQcmVkVWtvbmNlbmltKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLmhyb21hZG5lVWtvbmNpKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGluZ0FjdGlvbjogdWtvbmNpdCA/IHRoYXQuYWN0aW9ucy5hY3RVa29uY2VuaSA6IHRoYXQuYWN0aW9ucy5hY3RacnVzZW5pVWtvbmNlbmlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTdG9ybm8gLyB6cnXFoWVuw60gc3Rvcm5hIHZ5YnJhbsO9Y2ggZG9rbGFkxa9cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3Rvcm5vdmF0IHN0b3Jub3ZhdCAodHJ1ZSkgbmVibyB6cnXFoWl0IHN0b3JubyAoZmFsc2UpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc3Rvcm5vKHN0b3Jub3ZhdDogYm9vbGVhbik6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IG9wZXJhY2VcclxuICAgICAgICAgICAgaW50ZXJmYWNlIHN0b3Jub01vZGVsIHtcclxuICAgICAgICAgICAgICAgIGR1dm9kOiBzdHJpbmcgfCBudWxsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyB2b2zDoW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkVHdvU3RlcHM8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbFN0b3Jub09wZXJhdGlvbkR0bywgc3Rvcm5vTW9kZWw+KFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN0b3Jub0Rva2xhZHVTbWwjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHN0b3Jub3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImpyZXM6MjQxMDAwNTBcIiAvL1JDIDI0MTAwMDUwIDogU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwianJlczoyNDEwMDA1MVwiLCAvL1JDIDI0MTAwMDUxIDogWnJ1xaFlbsOtIHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogc3Rvcm5vdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwianJlczoyNDEwMDA0NlwiIC8vUkMgMjQxMDAwNDYgOiBBa2NlIHN0b3JudWplIHZ5YnJhbsOpICh6YcWha3J0bnV0w6kpIGRva2xhZHkuIFBvIGplasOtbSBwcm92ZWRlbsOtIGJ1ZG91IHR5dG8gZG9rbGFkeSB2ZSBzdGF2dSAnc3Rvcm5vdsOhbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJqcmVzOjI0MTAwMDQ3XCIsIC8vUkMgMjQxMDAwNDcgOiBBa2NlIHpydcWhw60gc3Rvcm5vIHZ5YnJhbsO9Y2ggKHphxaFrcnRudXTDvWNoKSBkb2tsYWTFry4gUG8gamVqw61tIHByb3ZlZGVuw60gYnVkb3UgdHl0byBkb2tsYWR5IHZlIHN0YXZ1ICdldmlkb3bDoW4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1UYWJUaXRsZTogc3Rvcm5vdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwianJlczoyNDEwMDA0OFwiIC8vUkMgMjQxMDAwNDggOiBQYXJhbWV0cnkgc3Rvcm5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwianJlczoyNDEwMDA0OVwiLCAvL1JDIDI0MTAwMDQ5IDogUGFyYW1ldHJ5IHpydcWhZW7DrSBzdG9ybmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uQWN0aW9uOiBzdG9ybm92YXQgPyB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS5jYXB0aW9uIDogdGhhdC5hY3Rpb25zLmFjdFpydXNlbmlTdG9ybmEhLmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIgfSkuYWRkU2VjdGlvbigpLmFkZFJvdyhcImpyZXM6MjQxMDAwNDNcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJkdXZvZFwiLCBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgc21hcnROYXZOZXh0RWxlbWVudDogZnVuY3Rpb24gKGN1ciwgbmV4dCkgeyByZXR1cm4gJC5jb250ZW50KHRoaXMpPy5lbGVtZW50LmZpbmQoXCJidXR0b25bZGF0YS1wYXJhbS1pZD0nY2hlY2tBY3QnXVwiKVswXTsgfSB9KSwgLy9SQyAyNDEwMDA0MyA6IETFr3ZvZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogeyBkdXZvZDogbnVsbCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b09wZXJhdGlvbkR0bzogKG1vZGVsLCBkYXRhLCBpa2MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWtjOiBpa2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9ybm92YXQ6IHN0b3Jub3ZhdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXZvZDogKG1vZGVsICE9IG51bGwgJiYgbW9kZWwuZHV2b2QgIT0gbnVsbCA/IG1vZGVsLmR1dm9kIDogXCJqcmVzOjI0MTAwMDQ0XCIpIC8vUkMgMjQxMDAwNDQgOiBuZXphZMOhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC56a29udHJvbHVqUHJlZFN0b3JuZW0oZHRvKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNsT3BlcmF0aW9uOiAoZHRvKSA9PiB7IHJldHVybiB0aGF0LmlzbC5Eb2tsYWRTbWwuaHJvbWFkbmVTdG9ybnVqKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGluZ0FjdGlvbjogc3Rvcm5vdmF0ID8gdGhhdC5hY3Rpb25zLmFjdFN0b3JubyA6IHRoYXQuYWN0aW9ucy5hY3RacnVzZW5pU3Rvcm5hXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV6ZXJ2YWNlIHYgSUlTU1BcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlemVydmFjZUlpc3NwKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LndpemFyZFR3b1N0ZXBzPEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxSZXplcnZhY2VWSWlzc3BPcGVyYXRpb25EdG8+KFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlJlemVydmFjZUlpc3NwI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlJlemVydmFjZSB2IElJU1NQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFrY2UgcmV6ZXJ2dWplIHZ5YnJhbsOpICh6YcWha3J0bnV0w6kpIGRva2xhZHksIHJlc3AuIGplamljaCBwxZnDrXBhZHksIHYgSUlTU1BcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uQWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UmV6ZXJ2YWNlSWlzc3AhLmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvT3BlcmF0aW9uRHRvOiAobW9kZWwsIGRhdGEsIGlrYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpa2M6IGlrYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlemVydm92YXQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3JlZjogdGhhdC5JeHNSZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGF0LlJva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC56a29udHJvbHVqUHJlZFJlemVydmFjaVZJaXNzcChkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc2xPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC5ocm9tYWRuZVJlemVydnVqVklpc3NwKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGluZ0FjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFJlemVydmFjZUlpc3NwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvL3JldHVybiB0aGF0LndpemFyZFR3b1N0ZXBzPEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwUmV6ZXJ2YWNlUHJpcGFkdUdyb3VwRHRvPihcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgaWQ6IFwiUmV6ZXJ2YWNlSWlzc3AjXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB0ZXh0czoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRpdGxlOiBcIlJlemVydmFjZSB2IElJU1NQXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWtjZSByZXplcnZ1amUgdnlicmFuw6kgKHphxaFrcnRudXTDqSkgZG9rbGFkeSB2IElJU1NQXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgb3BlcmF0aW9uQWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UmV6ZXJ2YWNlSWlzc3AhLmNhcHRpb24sXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHdpdGhvdXRQcmVDaGVjazogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0b09wZXJhdGlvbkR0bzogKG1vZGVsLCBkYXRhLCBpa2MpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbGV0IHh4eCA9IGRhdGEubWFwKGRva2xhZCA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8qKmlkIHDFmcOtcGFkdSB2IEdJTklTKi9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBpeHNfaHByOiBkb2tsYWQuaXhwX3NtbF9wcmksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLyoqaWQgcmV6ZXJ2YWNlIHYgSUlTU1AqL1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGl4c19yZWY6IHRoYXQuSXhzUmVmLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8qKmljbyovXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0LmdwYy5pY28sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLyoqdWNzKi9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoYXQuZ3BjLnVjcyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvKipyb2sqL1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5Sb2ssXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLyoqcGlkX3JkKi9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAvL3BpZF9yZD86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLyoqSHJvbWFkbsOhIHJlemVydmFjZSovXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaHJvbWFkbmE6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLyoqTWF4aW3DoWxuw60gw7pyb3ZlxYggaGzDocWhZW7DrSwgZGxlIHbDvXpuYW1ub3N0aS4gRSAtIGNoeWJhLCBXIC0gdmFyb3bDoW7DrSwgSSAtIGluZm9ybWFjZS4qL1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8vdHlwX21heGltdW0/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8qKmRva2xhZHkqL1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8vZG9rbGFkeT86IEdvcmRpYy5JaXNzcC5JbnRlcmZhY2UuR0lpc3NwUmV6ZXJ2YWNlRG9rbGFkdUR0b1tdIHwgbnVsbDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiB7IHByaXBhZHk6IHh4eCB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlzbENoZWNrQmVmb3JlT3BlcmF0aW9uOiAoZHRvKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHh4eFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdCBuxJtqYWtvdSBrb250cm9sdSBwxZllZCByZXplcnZhY8OtIHYgSUlTU1BcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLypyZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLnprb250cm9sdWpQcmVkVWtvbmNlbmltKGR0byk7Ki9cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuSWlzc3BSZXplcnZhY2VQcmlwYWR1LnJlemVydnVqUHJpcGFkSHJvbShkdG8pOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNhbGxpbmdBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RSZXplcnZhY2VJaXNzcFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWVkw6Fuw60gdnlicmFuw71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZWRhbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyB2b2zDoW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkVHdvU3RlcHM8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbFByZWRhbmlPcGVyYXRpb25EdG8sIFNtbERva2xhZC5JR1ByZWRhbmlNb2RlbD4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUHJlZGFuaURva2xhZHUjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUMWZZWTDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBa2NlIHDFmWVkw6EgdnlicmFuw6kgKHphxaFrcnRudXTDqSkgZG9rbGFkeSBqaW7DqW11IHpwcmFjb3ZhdGVsaS5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uQWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UHJlZGFuaSEuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG/FmWXFoWl0IEt0Z0RlbiAtIG5hIGRldGFpbHUgdG8gbcOhbSwgYWxlIGplIG90w6F6a2EsIGplc3RsaSB0YW0gc2t1dGXEjW7EmyBqc291IG7Em2pha8OpIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogU21sRG9rbGFkLmdldEZvcm1QcmVkYW5pKC8qR2xvYmFscy5FbnVtcy5LdGdEZW4uWmFwb2N0b3ZlTGlzdHkqL1tdLCAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCwgdGhhdC5JeHNTdSwgdGhhdC5nZXRJeHBEZW4oKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7IGl4c19zdTogbnVsbCwgaXhzX2Z1bl9ha3Q6IG51bGwsIEtvbXBldGVudDogbnVsbCwgaXhzX2Z1bl92eXJpejogbnVsbCwgY2lzX3JlYWw6IG51bGwgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbCwgZGF0YSwgaWtjKSA9PiBTbWxEb2tsYWQuVG9QcmVkYW5pT3BlcmF0aW9uRHRvPFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bywgU21sLkludGVyZmFjZS5HRG9rbGFkU21sUHJlZGFuaU9wZXJhdGlvbkR0bz4oZGF0YSwgbW9kZWwsIGlrYyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhvdXRQcmVDaGVjazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC56a29udHJvbHVqUHJlZFByZWRhbmltKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLmhyb21hZG5lUHJlZGVqKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGluZ0FjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFByZWRhbmlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZZXZ6ZXTDrSB2eWJyYW7DvWNoIGRva2xhZMWvXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJldnpldGkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyB2b2zDoW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkVHdvU3RlcHM8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbFByZXZ6ZXRpT3BlcmF0aW9uRHRvLCBTbWxEb2tsYWQuSUdQcmV2emV0aU1vZGVsPihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJQcmV2emV0aURva2xhZHUjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUMWZZXZ6ZXTDrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBa2NlIHDFmWV2ZXptZSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBkb2tsYWR5IG9kIGppbsOpaG8genByYWNvdmF0ZWxlLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25BY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQcmV2emV0aSEuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogU21sRG9rbGFkLmdldEZvcm1QcmV2emV0aSgoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7IGl4c19zdTogbnVsbCwgaXhzX2Z1bl9ha3Q6IG51bGwsIEtvbXBldGVudDogbnVsbCwgaXhzX2Z1bl92eXJpejogbnVsbCwgY2lzX3JlYWw6IG51bGwgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbCwgZGF0YSwgaWtjKSA9PiBTbWxEb2tsYWQuVG9QcmV2emV0aU9wZXJhdGlvbkR0bzxTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8sIFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbFByZXZ6ZXRpT3BlcmF0aW9uRHRvPihkYXRhLCBtb2RlbCwgaWtjKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l0aG91dFByZUNoZWNrOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc2xDaGVja0JlZm9yZU9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLnprb250cm9sdWpQcmVkUHJldnpldGltKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLmhyb21hZG5lUHJldmV6bWkoZHRvKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsaW5nQWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UHJldnpldGlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZaWTEm2xlbsOtIHZ5YnJhbsO9Y2ggZG9rbGFkxa9cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmlkZWxlbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyB2b2zDoW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkVHdvU3RlcHM8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbFByaWRlbGVuaU9wZXJhdGlvbkR0bywgU21sRG9rbGFkLklHUHJpZGVsZW5pTW9kZWw+KFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlByaWRlbGVuaURva2xhZHUjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUMWZaWTEm2xlbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFrY2UgcMWZaWTEm2zDrSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBkb2tsYWR5IGppbsOpbXUgenByYWNvdmF0ZWxpLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25BY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQcmlkZWxlbmkhLmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBLdGdEZW4gLSBuYSBkZXRhaWx1IHRvIG3DoW0sIGFsZSBqZSBvdMOhemthLCBqZXN0bGkgdGFtIHNrdXRlxI1uxJsganNvdSBuxJtqYWvDqSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IFNtbERva2xhZC5nZXRGb3JtUHJpZGVsZW5pKC8qR2xvYmFscy5FbnVtcy5LdGdEZW4uWmFwb2N0b3ZlTGlzdHkqL1tdLCAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCwgdGhhdC5JeHNTdSwgdGhhdC5nZXRJeHBEZW4oKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7IGl4c19zdTogbnVsbCwgaXhzX2Z1bl9ha3Q6IG51bGwgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbCwgZGF0YSwgaWtjKSA9PiBTbWxEb2tsYWQuVG9QcmlkZWxlbmlPcGVyYXRpb25EdG88U21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvLCBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxQcmlkZWxlbmlPcGVyYXRpb25EdG8+KGRhdGEsIG1vZGVsLCBpa2MpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aXRob3V0UHJlQ2hlY2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbENoZWNrQmVmb3JlT3BlcmF0aW9uOiAoZHRvKSA9PiB7IHJldHVybiB0aGF0LmlzbC5Eb2tsYWRTbWwuemtvbnRyb2x1alByZWRQcmlkZWxlbmltKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLmhyb21hZG5lUHJpZGVsKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGluZ0FjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFByaWRlbGVuaVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZllZXZpZGVuY2UgdnlicmFuw71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZWV2aWRlbmNlKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LndpemFyZFR3b1N0ZXBzPEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxQcmVldmlkZW5jZU9wZXJhdGlvbkR0bywgU21sRG9rbGFkLklHUHJlZXZpZGVuY2VNb2RlbD4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUHJlZXZpZGVuY2VEb2tsYWR1I1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlDFmWVldmlkZW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBa2NlIHDFmWVldmlkdWplIHZ5YnJhbsOpICh6YcWha3J0bnV0w6kpIGRva2xhZHkgZG8gamluw6kga25paHkuIFDFmWkgcMWZZWV2aWRlbmNpIGplIG1vxb5uw6kgem3Em25pdCB6cHJhY292YXRlbGUuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbkFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFByZWV2aWRlbmNlIS5jYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb8WZZcWhaXQgS3RnRGVuIC0gbmEgZGV0YWlsdSB0byBtw6FtLCBhbGUgamUgb3TDoXprYSwgamVzdGxpIHRhbSBza3V0ZcSNbsSbIGpzb3UgbsSbamFrw6kgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBTbWxEb2tsYWQuZ2V0Rm9ybVByZWV2aWRlbmNlKC8qR2xvYmFscy5FbnVtcy5LdGdEZW4uWmFwb2N0b3ZlTGlzdHkqL1tdLCB0aGF0LmdwYy5pY28sIHRoYXQuZ3BjLnVjcywgdGhhdC5JeHNTdSwgdGhhdC5nZXRJeHBEZW4oKSwgdGhhdC5kYnBhcmFtcy5zbWxfcmFkX3Bma3N0bywgdGhhdC5kYnBhcmFtcy5la29fcmFkX2Rma2VuKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHsgaXhwX2RlbjogbnVsbCwgc3VicmFkYTogbnVsbCwgaXhzX3N1OiBudWxsLCBpeHNfZnVuX2FrdDogbnVsbCwgaXhzX2Z1bl92eXJpejogbnVsbCwgY2lzX3JlYWw6IG51bGwgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbCwgZGF0YSwgaWtjKSA9PiBTbWxEb2tsYWQuVG9QcmVldmlkZW5jZU9wZXJhdGlvbkR0bzxTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8sIFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbFByZWV2aWRlbmNlT3BlcmF0aW9uRHRvPihkYXRhLCBtb2RlbCwgaWtjKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l0aG91dFByZUNoZWNrOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc2xDaGVja0JlZm9yZU9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLnprb250cm9sdWpQcmVkUHJlZXZpZG92YW5pbShkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc2xPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC5ocm9tYWRuZVByZWV2aWR1aihkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxpbmdBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQcmVldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaW5hbsSNbsOtIGtvbnRyb2xhXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZmluYW5jbmlLb250cm9sYSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHphem5hbXkgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIikuZ2dyaWQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmICh6YXpuYW15ICE9PSBudWxsICYmIHphem5hbXkubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuV2ViQ2xpZW50LmFkZEhyb21hZG5hRktSdW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIENvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbmVibyBTbWxHcmlkLkRva2xhZC5jcmVhdGVHcmlkRm9ybWF0KGNvbnRlbnQsIHRydWUpP1xyXG4gICAgICAgICAgICAgICAgICAgIEdyaWRGb3JtYXQ6IFNtbFdpemFyZC5nZXRDdXJyZW50R3JpZEZvcm1hdDxTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8+KHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKS8qLCB0cnVlKi8pLFxyXG4gICAgICAgICAgICAgICAgICAgIENvbHVtbkxpc3Q6IHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKS5nZ3JpZChcImdldEN1cnJlbnRQcm9maWxlXCIpLmNvbHVtbkxpc3QgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBLb250cm9sYVphem5hbXU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5QcmlwYWRTbWwuemtvbnRyb2x1alByZWRGaW5hbmNuaUtvbnRyb2xvdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyBtZXRvZHkgdnN0dXB1asOtIHVkYWplIHDFmcOtcGFkdSwgdGouIHogZG9rbGFkdSBqZW4gaXhwX3NtbF9wcmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IGRhdGEubWFwKChpdCkgPT4geyByZXR1cm4geyBpeHBfc21sX3ByaTogaXQuaXhwX3NtbF9wcmkgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvZGF0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUocmVzdWx0LnJlc3VsdC5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogaXRlbS5kYXRhLml4cF9zbWxfcHJpIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkOiBpdGVtLmtpbmQgPT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yX3R4dDogaXRlbS5raW5kICE9PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MgPyBpdGVtLmVycm9ycy5tYXAoKGVycikgPT4gZXJyLm1lc3NhZ2UpLmpvaW4oXCIsIFwiKSA6IHZvaWQgMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBLb250cm9sYVphem5hbXVLdGdUeXA6IChkYXRhLCBrdGdfdHlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrdGdfdHlwID09IFNtbC5HbG9iYWxzLkVudW1zLkt0Z1R5cC5QRktQcmVkVnpuaWtlbVphdmF6a3VMaW0gJiYgZGF0YS5KZVZ5ZGFqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2w71kYWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChrdGdfdHlwID09IFNtbC5HbG9iYWxzLkVudW1zLkt0Z1R5cC5QRktQcmVkVnpuaWtlbU5hcm9rdUhyb20gJiYgZGF0YS5KZVByaWplbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZw61qbXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBHZXRVUEQ6IChpeHBzOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzOiB7IFtpeHA6IHN0cmluZ106IEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdGaW5hbmNuaUtvbnRyb2xhVVBEIH0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaXhwIG9mIGl4cHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdG8gPSB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIikuZ2dyaWQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4oXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UsIHRydWUpLmZpbmQoKGVsZW0pID0+IGVsZW0uaXhwID09IGl4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgVVBEOiBHb3JkaWMuV2ZsLkludGVyZmFjZS5HRmluYW5jbmlLb250cm9sYVVQRCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB6a29udHJvbG92YXQsIGplc3RsaSBqZSB0byBzcHLDoXZuxJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY19hZzogZHRvPy5hY19zbWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY19jZWxrOiBkdG8/LnByaXBhZD8uYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX21lbmE6IGR0bz8uY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbmE6IChkdG8/Lm1lbmEgYXMgYW55KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfc3BsOiBkdG8/LmRhdF9wbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfdHlwOiBkdG8/Lml4c190eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2VzdTogZHRvPy5peHNfZXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcGlzOiBkdG8/LnBvcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfc2NoOiBkdG8/LnNtbHJvaz8uYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2l4cF9wZms6IHh4eCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VjczogZHRvPy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90eXBfYWc6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1tpeHBdID0gVVBEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBGS0NoYW5nZWQ6IChpeHBzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHRhZHkgbcOhIGFzaSBiw710IHJlbG9hZCBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl4cHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgTmF6ZXZJZGVudGlmaWthdG9ydTogR29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLml4cF9zbWxfcHJpLFxyXG4gICAgICAgICAgICAgICAgICAgIFR5cEtvbnRyb2x5OiBHb3JkaWMuV2ZsLkludGVyZmFjZS5HRmluYW5jbmlLb250cm9sYVR5cEtvbnRyb2x5LkZLLFxyXG4gICAgICAgICAgICAgICAgICAgIE9tZXppdEt0Z1R5cDogR29yZGljLldmbC5JbnRlcmZhY2UuR0hGaW5hbmNuaUtvbnRyb2xhT21leml0S3RnVHlwLlZzZWNobnksXHJcbiAgICAgICAgICAgICAgICAgICAgSW5wdXREdG86IHphem5hbXksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY28gcmXFvmltIGtuaWggdsWhZWNoIGxldD9cclxuICAgICAgICAgICAgICAgICAgICBSb2s6IHRoYXQuZWtvQm9vay5yb2shXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbGEgbWV0YWRhdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGtvbnRyb2xhTWV0YWRhdCgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vY29uc3QgJGdyaWQgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHphem5hbXkgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIikuZ2dyaWQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmICh6YXpuYW15ICE9PSBudWxsICYmIHphem5hbXkubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHZvbMOhbsOtIGtvbXBvbmVudHlcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLlV0aWxzLktvbnRyb2xhTWV0YWRhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGhhdCxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0SXhwOiB6YXpuYW15Lm1hcChyb3cgPT4gcm93Lml4cCEpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGplIHRlbiByb2sgc3Byw6F2bsSbLCBuZW3Em2wgYnkgdGFtIGLDvXQgcm9rIHBvZGxlIGFrdHXDoWxuw60ga25paHk/IHprdXNpdCBuYSBkb2tsYWR1IHDFmWVldmlkb3ZhbsOpbSBkbyBrbmloeSBqaW7DqWhvIHJva3UgLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgLy9saXN0SXhwUm9rOiB6YXpuYW15Lm1hcDxFa28uSW50ZXJmYWNlLkdFa29QaWRSb2tEdG8+KHJvdyA9PiB7IHJldHVybiB7IEl4cDogcm93Lml4cCwgUm9rOiByb3cucm9rIH07IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbEFrY2U6IChjbnQsIGl4cCkgPT4gdGhhdC5vcGVuRGV0YWlsKGNudCwgeyBpeHA6IGl4cCB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB6YXTDrW0gc2Ugc2V6bmFtIG9ixI1lcnN0dnVqZSB2xb5keSwgcHJvdG/FvmUga29tcG9uZW50YSAobmEgcm96ZMOtbCBvZCBwcsWvdm9kY2UpIG5ldnJhY8OtIGluZm9ybWFjaSwgamVzdGxpIHRhbSBieWx5IG7Em2pha8OpIHptxJtueSBuZWJvIG5lXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbcOhIGLDvXQgb2LEjWVyc3R2ZW7DrSB2IGRvbmUgbmVibyB0aGVuP1xyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHsgdGhhdC52aWV3LnJlcXVlc3REYXRhKHsgd2l0aG91dExvbmdMaW1pdDogdHJ1ZSB9KTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdlbmVyb3bDoW7DrSDFvsOhZG9zdMOtIG8gemFsb8W+ZW7DrSBwb3VrYXrFr1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2VuZXJvdmFuaVBvdWthenUoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBwYXJhbWV0cnkgb3BlcmFjZVxyXG4gICAgICAgICAgICBpbnRlcmZhY2UgZ2VuZXJvdmF0TW9kZWwge1xyXG4gICAgICAgICAgICAgICAgaXhzX3N0ZTogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAgICAgICAgIGl4cF9kZW46IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpeHNfdHlwOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgICAgICAgICAga3M6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzczogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAgICAgICAgIGJ1X3ZsX2dycDogYm9vbGVhbiB8IG51bGxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkZWZhdWx0bsOtY2ggaG9kbm90IHBhcmFtZXRyxa9cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkRva2xhZFNtbC5yZWFkRGVmYXVsdHNGb3JHZW5lcnVqUG91a2F6KClcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZWZhdWx0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGRlZmF1bHRNb2RlbDogZ2VuZXJvdmF0TW9kZWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaXhzX3N0ZTogZGVmYXVsdHMuaXhzX3N0ZSA/PyBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGl4cF9kZW46IGRlZmF1bHRzLml4cF9kZW4gPz8gbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpeHNfdHlwOiBkZWZhdWx0cy5peHNfdHlwID8/IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAga3M6IGRlZmF1bHRzLmtzID8/IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgc3M6IGRlZmF1bHRzLnNzID8/IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgYnVfdmxfZ3JwOiBkZWZhdWx0cy5idV92bF9ncnAgPz8gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAvL307XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdm9sw6Fuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkVHdvU3RlcHM8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbEdlbmVyb3ZhbmlQb3VrYXp1T3BlcmF0aW9uRHRvLCBnZW5lcm92YXRNb2RlbD4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIkdlbmVyb3ZhbmlQb3VrYXp1I1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjI0MTAwMDg2XCIsIC8vUkMgMjQxMDAwODYgOiBHZW5lcm92w6Fuw60gcG91a2F6xa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjI0MTAwMDg3XCIsIC8vUkMgMjQxMDAwODcgOiBBa2NlIHZ5Z2VuZXJ1amUgxb7DoWRvc3RpIG8gemFsb8W+ZW7DrSBwb3VrYXrFryBrIHZ5YnJhbsO9bSAoemHFoWtydG51dMO9bSkgZG9rbGFkxa9tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVRhYlRpdGxlOiBcImpyZXM6MjQxMDAwODVcIiwgLy9SQyAyNDEwMDA4NSA6IFBhcmFtZXRyeSBnZW5lcm92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25BY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RHZW5lcm92YW5pUG91a2F6dSEuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMjAyXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuYnBsc3N0ZShHbG9iYWxzLkVudW1zLlR5cEFnLlBPVSksIHsgLy9SQyAyNDEwMDIwMiA6IFNrdXBpbmEgxaFhYmxvbiBQT1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3N0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX3N0ZT1peHNfc3RlO2l4c19zdGVfdHh0PW5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB6YWxvxb5pdCBrb25zdGFudHUgbmEgdHlwX3N0ZT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgdHlwX3N0ZTogNTAsIGFrdGl2aXRhOiAxMDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDIwM1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NkZW4oR2xvYmFscy5FbnVtcy5UeXBBZy5QT1UpLCB7IC8vUkMgMjQxMDAyMDMgOiBLbmloYSBQT1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHBfZGVuPWl4cF9kZW47aXhwX2Rlbl90eHQ9aXhwX2Rlbl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgdHlwX2FnOiBHbG9iYWxzLkVudW1zLlR5cEFnLlBPVSwga3RnX2RlbjogU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLlBvdWthenksIHJvazogdGhhdC5Sb2ssIGljbzogdGhhdC5JY28sIHVjczogdGhhdC5VY3MsIGFrdGl2aXRhOiAxMDAsIHBvdXplQWt0T2JkOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxMDdcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zc2xzdHlwKCksIHsgLy9SQyAzMzYwMDEwNyA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX3R5cD1peHNfdHlwO2l4c190eXBfdHh0PW5hemV2O2t0Z190eXA9a3RnX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBrdGdfdHlwOiAxMzgwLCBha3Rpdml0YTogMTAwIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAyMDVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29za29zKCksIHsgbmFtZTogXCJrc1wiLCBtb2RlbDogXCJrcz1rc1wiIH0pLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCB7IG5hbWU6IFwic3NcIiB9KSAvL1JDIDI0MTAwMjA1IDogS1MsIFNTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ1X3ZsX2dycFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyNDEwMDIwNFwiLCAvL1JDIDI0MTAwMjA0IDoga3VtdWxvdmF0IHBvbG/Fvmt5IEZQIGRsZSB2bGFzdG7DrWhvIELDmlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21hcnROYXZOZXh0RWxlbWVudDogZnVuY3Rpb24gKGN1ciwgbmV4dCkgeyByZXR1cm4gJC5jb250ZW50KHRoaXMpPy5lbGVtZW50LmZpbmQoXCJidXR0b25bZGF0YS1wYXJhbS1pZD0nY2hlY2tBY3QnXVwiKVswXTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBkZWZhdWx0TW9kZWwvKnsgaXhzX3N0ZTogaXhzX3N0ZTEsIGl4cF9kZW46IGl4cF9kZW4xLCBpeHNfdHlwOiBpeHNfdHlwMSwga3M6IG51bGwsIHNzOiBudWxsLCBidV92bF9ncnA6IGZhbHNlIH0qLyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfc3RlOiBkZWZhdWx0cy5peHNfc3RlID8/IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IGRlZmF1bHRzLml4cF9kZW4gPz8gbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3R5cDogZGVmYXVsdHMuaXhzX3R5cCA/PyBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrczogZGVmYXVsdHMua3MgPz8gbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3M6IGRlZmF1bHRzLnNzID8/IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1X3ZsX2dycDogZGVmYXVsdHMuYnVfdmxfZ3JwID8/IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b09wZXJhdGlvbkR0bzogKG1vZGVsLCBkYXRhLCBpa2MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogaWtjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyb3ZhdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19zdGU6IChtb2RlbCAhPSBudWxsICYmIG1vZGVsLml4c19zdGUgIT0gbnVsbCA/IG1vZGVsLml4c19zdGUgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IChtb2RlbCAhPSBudWxsICYmIG1vZGVsLml4cF9kZW4gIT0gbnVsbCA/IG1vZGVsLml4cF9kZW4gOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c190eXA6IChtb2RlbCAhPSBudWxsICYmIG1vZGVsLml4c190eXAgIT0gbnVsbCA/IG1vZGVsLml4c190eXAgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtzOiAobW9kZWwgIT0gbnVsbCAmJiBtb2RlbC5rcyAhPSBudWxsID8gbW9kZWwua3MgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNzOiAobW9kZWwgIT0gbnVsbCAmJiBtb2RlbC5zcyAhPSBudWxsID8gbW9kZWwuc3MgOiBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1X3ZsX2dycDogKG1vZGVsPy5idV92bF9ncnAgPz8gZmFsc2UpID09PSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC56a29udHJvbHVqUHJlZEdlbmVyb3ZhbmltUG91a2F6dShkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLmhyb21hZG5lR2VuZXJ1alBvdWtheihkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxpbmdBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RHZW5lcm92YW5pUG91a2F6dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2VuZXJvdsOhbsOtIMW+w6Fkb3N0w60gbyB6YWxvxb5lbsOtIHBvaGxlZMOhdmVrXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcm92YW5pUG9obGVkYXZlaygpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRyeSBvcGVyYWNlXHJcbiAgICAgICAgICAgIGludGVyZmFjZSBnZW5lcm92YXRNb2RlbCB7IH07XHJcblxyXG4gICAgICAgICAgICAvLyB2b2zDoW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkVHdvU3RlcHM8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbEdlbmVyb3ZhbmlQb2hsZWRhdmt5T3BlcmF0aW9uRHRvLCBnZW5lcm92YXRNb2RlbD4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiR2VuZXJvdmFuaVBvaGxlZGF2ZWsjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDA4M1wiLCAvL1JDIDI0MTAwMDgzIDogR2VuZXJvdsOhbsOtIHBvaGxlZMOhdmVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MjQxMDAwODRcIiwgLy9SQyAyNDEwMDA4NCA6IEFrY2UgdnlnZW5lcnVqZSDFvsOhZG9zdGkgbyB6YWxvxb5lbsOtIHBvaGxlZMOhdmVrIGsgdnlicmFuw71tICh6YcWha3J0bnV0w71tKSBkb2tsYWTFr21cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVRhYlRpdGxlOiBcImpyZXM6MjQxMDAwODVcIiwgLy9SQyAyNDEwMDA4NSA6IFBhcmFtZXRyeSBnZW5lcm92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uQWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0R2VuZXJvdmFuaVBvaGxlZGF2a3khLmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbCwgZGF0YSwgaWtjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogaWtjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJvdmF0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc2xDaGVja0JlZm9yZU9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLnprb250cm9sdWpQcmVkR2VuZXJvdmFuaW1Qb2hsZWRhdmt5KGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLmhyb21hZG5lR2VuZXJ1alBvaGxlZGF2a3UoZHRvKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsaW5nQWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0R2VuZXJvdmFuaVBvaGxlZGF2a3lcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIcm9tYWRuw6kgb2Rlc2zDoW7DrSBkb2tsYWTFryBkbyB2w71wcmF2bnlcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb2Rlc2xhbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZW1hID0gXCJzbWxfcHRtX3BydHNtbFwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5rdGdfZGVuID09IDE2OTAvKm5nX2t0Z2RlbkxpbVByaXNsaWIqLykge1xyXG4gICAgICAgICAgICAgICAgdGVtYSA9IFwic21sX3B0bV9wcnRsaW1cIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmt0Z19kZW4gPT0gMTY5MSAvKm5nX2t0Z2RlbkluZFByaXNsaWIqLykge1xyXG4gICAgICAgICAgICAgICAgdGVtYSA9IFwic21sX3B0bV9wcnRpbmRcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmt0Z19kZW4gPT0gMTYyNSAvKm5nX2t0Z2RlbktEU09iaiovIHx8IHRoaXMua3RnX2RlbiA9PSAxNjQ1IC8qbmdfa3RnZGVuS09TT2JqKi8gfHxcclxuICAgICAgICAgICAgICAgIHRoaXMua3RnX2RlbiA9PSAxNjc1IC8qbmdfa3RnZGVuT0JKKi8gfHwgdGhpcy5rdGdfZGVuID09IDE2ODAgLypuZ19rdGdkZW5PQkpOb0VrbyovKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1hID0gXCJzbWxfcHRtX3BydG9ialwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoaXMuYWN0aW9ucy5hZGQoR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVGlzayh7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiYWN0VGlza09kZXNsYXRcIixcclxuICAgICAgICAgICAgLy8gICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgdGVtYTogdGVtYSxcclxuICAgICAgICAgICAgLy8gICAgaXhzU3RyOiB0aGlzLmRicGFyYW1zLnNtbF9wdG1fcHJ0c21sLFxyXG4gICAgICAgICAgICAvLyAgICBzZXJ2ZXJSZXN0cmljdGlvbkFsZk1ldGhvZDogKHRoaXMua3RnX2RlbiA9PSAxNjkxIC8qbmdfa3RnZGVuSW5kUHJpc2xpYiovKSA/IFwiR29yZGljLlNtbC5XZWJDbGllbnQuR1Nlem5hbURva2xhZHVTbWw6R2V0UmVzdHJpY3Rpb25BbGZPZGVzbGF0XCIgOiB2b2lkIDAsXHJcbiAgICAgICAgICAgIC8vICAgIHNlcnZlclJlc3RyaWN0aW9uQWx2TWV0aG9kOiAodGhpcy5rdGdfZGVuID09IDE2OTEgLypuZ19rdGdkZW5JbmRQcmlzbGliKi8pID8gXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU2V6bmFtRG9rbGFkdVNtbDpHZXRSZXN0cmljdGlvbkFsdk9kZXNsYXRcIiA6IHZvaWQgMCxcclxuICAgICAgICAgICAgLy8gICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTZXpuYW1Eb2tsYWR1U21sOlByaW50UGFyYW1ldGVyc09kZXNsYXRcIixcclxuICAgICAgICAgICAgLy8gICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IGl4cDogXCJBNDQ2WDAwMFJCMUVcIiB9OyAvL1RPRE86IHphdMOtbSBuYXR2cmRvLCBwcm90b8W+ZSBzaSBuZWpzZW0gamlzdMO9LCBqYWsgdG8gc3Byw6F2bsSbIHDFmWVkYXQgdSBocm9tYWRuw6lob1xyXG4gICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24gKGV2LCByZXApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSkpXHJcblxyXG4gICAgICAgICAgICBsZXQgcmVwb3J0SW5mbzogR29yZGljLlJlcG9ydC5JbnRlcmZhY2UuR1JlcG9ydEluZm9EdG8gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCByZXBvcnREdG86IEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRUcmVlTm9kZUR0byB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNjAxXCIsIHRydWUpIC8vUkMgMzM2MDA2MDEgOiBTZXN0YXZhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5yZXBvcnRzKHtcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRzT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUZW1hOiB0ZW1hLypcImRkcF9wdG1fbnZ5XCIqLy8qXCJzbWxfcHRtX2RlblwiKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4c1N0cjogdGhpcy5kYnBhcmFtcy5zbWxfcHRtX3BydHNtbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyUmVzdHJpY3Rpb25BbGZNZXRob2Q6ICh0aGlzLmt0Z19kZW4gPT0gMTY5MSAvKm5nX2t0Z2RlbkluZFByaXNsaWIqLykgPyBcIkdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTZXpuYW1Eb2tsYWR1U21sOkdldFJlc3RyaWN0aW9uQWxmXCIgOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNlcnZlclJlc3RyaWN0aW9uQWx2TWV0aG9kOiAodGhpcy5rdGdfZGVuID09IDE2OTEgLypuZ19rdGdkZW5JbmRQcmlzbGliKi8pID8gXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU2V6bmFtRG9rbGFkdVNtbDpHZXRSZXN0cmljdGlvbkFsdlwiIDogdm9pZCAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJlcG9ydElkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnJlcG9ydElkPXZhbHVlLnJlcG9ydElkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVdpdGhNZXNzYWdlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVwb3J0SW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEocmVwb3J0SW5mby50eXBWeXN0ID09IFwiVFhUXCIgfHwgcmVwb3J0SW5mby50eXBWeXN0ID09IFwiUlRGXCIgfHwgcmVwb3J0SW5mby50eXBWeXN0ID09IFwiWE1FXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzYwMDYwMlwiOyAvL1JDIDMzNjAwNjAyIDogVnlicmFub3Ugc2VzdGF2dSBuZWx6ZSB1bG/Fvml0IGRvIHbDvXN0dXBuw61obyBmb3Jtw6F0dSBQREZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChyZXBvcnRJbmZvLmNvbW1vbkluZm9zPy5aUFVTX1VMT1ogPz8gXCIwXCIpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNjAwNjAzXCI7IC8vUkMgMzM2MDA2MDMgOiBadm9sZW7DoSB0aXNrb3bDoSBzZXN0YXZhIG5lbcOhIG5hc3RhdmVuIHpwxa9zb2IgdWxvxb5lbsOtIGRvIGVsZWt0cm9uaWNrw6lobyB1bG/FvmnFoXTEmy4gS29udGFrdHVqdGUgYWRtaW5pc3Ryw6F0b3JhIHN5c3TDqW11LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNudCA9ICQuY29udGVudChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0SW5mbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydER0byA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHg/LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0RHRvID0gY3R4LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzM2MDA2MDRcIik7IC8vUkMgMzM2MDA2MDQgOiBOYcSNw610w6Fuw60gcG9kcm9ibm9zdMOtIG8gc2VzdGF2xJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZUNvbnRyb2xUUy5nZXRSZXBvcnRJbmZvKGN0eC52YWx1ZS5yZXBvcnRJZCA/PyBcIlwiLCBjdHgudmFsdWUucm9rTWVzRG8pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7IHJlcG9ydEluZm8gPSByZXM7ICQoZXYudGFyZ2V0KS5nZmllbGQoXCJ2YWxpZGF0ZVwiKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IGNudC5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAvLyB2b2zDoW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkVHdvU3RlcHM8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbE9kZXNsYW5pRG9WeXByYXZueU9wZXJhdGlvbkR0bywgYW55PihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJPZGVzbGF0RG9WeXByYXZueSNcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwNjA1XCIsIC8vUkMgMzM2MDA2MDUgOiBIcm9tYWRuw6kgdnlnZW5lcm92w6Fuw60gZWwuIG9icmF6xa8gYSBvZGVzbMOhbsOtIGRvIHbDvXByYXZueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNjA2XCIsIC8vUkMgMzM2MDA2MDYgOiBBa2NlIHZ5Z2VuZXJ1amUgYXN5bmNocm9ubsSbIChuYSBwb3phZMOtKSBlbC4gb2JyYXp5IHZ5YnJhbsO9bSAoemHFoWtydG51dMO9bSkgZG9rbGFkxa9tIGEgdiBub3RpZmlrYcSNbsOtbSBjZW50cnUgcG90w6kgbmFiw61kbmUgb2Rlc2zDoW7DrSBkbyB2w71wcmF2bnkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbkFjdGlvbjogXCJqcmVzOjMzNjAwNjA3XCIsIC8vUkMgMzM2MDA2MDcgOiBWeWdlbmVyb3ZhdCBhIG9kZXNsYXRcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbCwgZGF0YSwgaWtjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogdGhpcy5Ja2MudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydElkOiBtb2RlbD8ucmVwb3J0SWQgPz8gdm9pZCAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aXRob3V0UHJlQ2hlY2s6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbENoZWNrQmVmb3JlT3BlcmF0aW9uOiAoZHRvKSA9PiB7IHJldHVybiB0aGF0LmlzbC5Eb2tsYWRTbWwuemtvbnRyb2x1alByZWRPZGVzbGFuaW1Eb1Z5cHJhdm55KGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLmhyb21hZG5lUHJpcHJhdk9kZXNsYW5pRG9WeXByYXZueShkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXREYXRhOiAod2l0aFJlc3VsdHMsIGlrY09yRGF0YSwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRGb3JtYXQgPSBTbWxXaXphcmQuZ2V0Q3VycmVudEdyaWRGb3JtYXQ8U21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvPih0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIikvKiwgdHJ1ZSovKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyYWdtZW50cyA9IFNtbFdpemFyZC5nZXRGcmFnbWVudHNGcm9tR3JpZEZvcm1hdChncmlkRm9ybWF0LyosIHRydWUqLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LndpemFyZEdldERhdGEod2l0aFJlc3VsdHMsIHdpdGhSZXN1bHRzLCBpa2NPckRhdGEsIGZyYWdtZW50cywgcmVzcG9uc2UpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHRoaXMuYWN0aW9ucy5hY3RUaXNrT2Rlc2xhdCBhcyBHUHJpbnRBY3Rpb25UeXBlKS5ydW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsaWRJeHBzOiBzdHJpbmdbXSA9IHJlc3BvbnNlLnJlc3VsdC5maWx0ZXIoKGl0ZW0pID0+IHsgcmV0dXJuIGl0ZW0ua2luZCA9PT0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzIH0pLm1hcChpdGVtID0+IGl0ZW0uZGF0YS5peHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBBcnJheTxHUmVwb3J0UGFyYW1zPigpOyAvL0tvbGlrIGluc3RhbmNpIHBhcmFtZXRydSwgdG9saWtyYXQgc2UgYnVkZSBnZW5lcm92YXQgc2VzdGF2YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdmFsaWRJeHBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSB7IFgwMDAzOiB0aGlzLkljbywgWDAwMDQ6IHRoaXMuVWNzLCBYMDAwNTogdGhpcy5Oa3MsIFgwMDA2OiBpdGVtLCBJWFA6IGl0ZW0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxhdG5vc3QgPSB0aGlzLlJvay50b1N0cmluZygpICsgKHRoaXMuTWVzaWM/LnRvU3RyaW5nKCkgPz8gXCJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnl2b2zDoW7DrSBzZXN0YXZ5IHYgbsOhdnJoLCB6ZGEgbmV2eWhvZMOtIG7Em2pha8O9IGRpYWxvZyBhIHDFmcOtcGFkbsOpIHDFmWVkw6Fuw60gcGFyYW1ldHLFryBwcm8gdGlza1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYXZyaERpYWxvZyA9ICQubmV3RGl2KCkuZ2NvbnRlbnQoW0dvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRQcmV2aWV3LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JlcG9ydElkOiBcIjAwMDBTVFIwMDNMQS8wMDAwQUxWMDc3M1ovMDAwMEFMRjA0R0tFLzBcIi8qXCJHWk5PU1RSMEEwNFUvMDAwMEFMVjAySERHLzAwMDBBTEYwMlJUUS8wXCIqLyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRJZDogcmVwb3J0RHRvPy5yZXBvcnRJZCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXRub3N0OiBwbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IChwYXJhbXM/Lmxlbmd0aCA+IDApID8gcGFyYW1zWzBdIDogdm9pZCAwIC8vcG9rdWQgamUgdsOtY2UgcGFyYW1ldHLFrywgdGFrIG7DoXZyaCBwdXN0w61tIHBvdXplIHMgcHJ2bsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGFzIEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LklHUmVwb3J0UHJldmlld0lucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmF2cmhDbnQgPSAkLmNvbnRlbnQobmF2cmhEaWFsb2cpIGFzIEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRQcmV2aWV3O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuYXZyaENudC5pbml0QXdhaXQudGhlbigoKSA9PiB7IHJldHVybiBuYXZyaENudC5nZXRQYXJhbXMoKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHBhcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjaGVkdWxlZFBhcmFtcyA9IHBhcnMgYXMgR29yZGljLlJlcG9ydC5JbnRlcmZhY2UuR1NjaGVkdWxlZFJlcG9ydFBhcmFtZXRlcltdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydChcIkdvcmRpYy5Fa28uU2VydmVyLkdPZGVzbGF0TXVsdGlwbGVSZXBvcnRzQXN5bmNUYXNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQbGF0bm9zdDogcGxhdG5vc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0SWQ6IHJlcG9ydER0bz8ucmVwb3J0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFyYW1ldGVyczogcGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNjaGVkdWxlZFBhcmFtczogc2NoZWR1bGVkUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElrYzogdGhpcy5Ja2NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxpbmdBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPZGVzbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSHJvbWFkbsOhIHV2b2xuxJtuw60gcHJvc3TFmWVka8WvIGRva2xhZMWvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB1dm9sbmVuaSgpIHtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIik7XHJcbiAgICAgICAgICAgIGxldCByb3dzID0gRWtvLkdyaWQuY2hlY2tlZFJvd3M8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4oZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICgocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL25ldnlicsOhbiDFvsOhZG7DvSDFmcOhZGVrXHJcbiAgICAgICAgICAgIGxldCBnZiA9IGdyaWQuZ2dyaWQoXCJnZXRDdXJyZW50UHJvZmlsZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGhyb21hZG5lVXZvbG5lbmlXaXphcmQodGhpcywgMCwgcm93cyEsIFNtbEdyaWQuRG9rbGFkLmNyZWF0ZUdyaWRGb3JtYXQodGhpcyksIHsgY29sdW1uTGlzdDogZ2YuY29sdW1uTGlzdCwgY29sdW1uczogZ2YuY29sdW1ucywgc29ydDogZ2Yuc29ydCB9LCBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5rZXlzKS50aGVuKChjb21wbGV0ZWQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vcG9rdWQgdsWhZSBwcm9ixJtobG8sIHRhayByZWZyZXNobnUgc2V6bmFtXHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkID09PSBcImNvbXBsZXRlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnJlcXVlc3REYXRhKHsgd2l0aG91dExvbmdMaW1pdDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIcm9tYWRuw6Egem3Em25hIMO6ZGFqxa8gZG9rbGFkxa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHptZW5hVWRhanUoKSB7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuU2V6bmFtU21sLmdncmlkXCIpO1xyXG4gICAgICAgICAgICBsZXQgcm93cyA9IEVrby5HcmlkLmNoZWNrZWRSb3dzPEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8+KGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAoKHJvd3M/Lmxlbmd0aCA/PyAwKSA8IDEpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH0gLy9uZXZ5YnLDoW4gxb7DoWRuw70gxZnDoWRla1xyXG4gICAgICAgICAgICBsZXQgZ2YgPSBncmlkLmdncmlkKFwiZ2V0Q3VycmVudFByb2ZpbGVcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBocm9tYWRuYVptZW5hVWRhanVXaXphcmQodGhpcywgcm93cyEsIFNtbEdyaWQuRG9rbGFkLmNyZWF0ZUdyaWRGb3JtYXQodGhpcyksIHsgY29sdW1uTGlzdDogZ2YuY29sdW1uTGlzdCwgY29sdW1uczogZ2YuY29sdW1ucywgc29ydDogZ2Yuc29ydCB9LCBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5rZXlzKS50aGVuKChjb21wbGV0ZWQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vcG9rdWQgdsWhZSBwcm9ixJtobG8sIHRhayByZWZyZXNobnUgc2V6bmFtXHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkID09PSBcImNvbXBsZXRlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3LnJlcXVlc3REYXRhKHsgd2l0aG91dExvbmdMaW1pdDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIHBvbG/FvmVrIGZpbmFuxI1uw61obyBwcm9maWx1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb2xvemt5RlAoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgYWt0UmFkZWsgPSBFa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8+KHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKSk7XHJcbiAgICAgICAgICAgIGlmIChha3RSYWRlayAmJiAhKGFrdFJhZGVrIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC5yZWFkKHsgaXhwOiBha3RSYWRlay5peHAsIGZyYWdtZW50czogW1wiKlwiLCBcIlBlcm1pc3Npb25zLipcIl0gfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuUGVybWlzc2lvbnM/Lkx6ZVBvbG96a3lGUD8udmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBEaWFsb2dzLkdTbWxQb2xvemt5RlBEbGcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtbHBpZDogZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kT3RldnJlbmk6IEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5uYXZpZ2F0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eCA/PyBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiB7IGl4cDogW2FrdFJhZGVrLml4cF0gfSwgb25seVBLV2l0aG91dEZpbHRlcnM6IHRydWUgfSwgeyB1cGRhdGVNb2RlOiBcInVwZGF0ZVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoYXQuZGlhbG9ncy5hbGVydChcIlBvbG/Fvmt5IEZQXCIsIGRhdGEuUGVybWlzc2lvbnM/Lkx6ZVBvbG96a3lGUC5tZXNzYWdlIHx8IFwiTmVtw6F0ZSBvcHLDoXZuxJtuw60gayB6b2JyYXplbsOtIHBvbG/FvmVrIEZQXCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW7DrSBwb2xvxb5layB2xJtjbsOpaG8gcHJvZmlsdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcG9sb3preVZQKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGFrdFJhZGVrID0gRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvPih0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIikpO1xyXG4gICAgICAgICAgICBpZiAoYWt0UmFkZWsgJiYgIShha3RSYWRlayBpbnN0YW5jZW9mIGpRdWVyeSkpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5Eb2tsYWRTbWwucmVhZCh7IGl4cDogYWt0UmFkZWsuaXhwLCBmcmFnbWVudHM6IFtcIipcIiwgXCJQZXJtaXNzaW9ucy4qXCJdIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlBlcm1pc3Npb25zPy5MemVQb2xvemt5VlA/LnZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlzaXRvciA9IG5ldyBHb3JkaWMuU21sLldlYkNsaWVudC5HU21sVmVjbnlQcm9maWxWaXNpdG9yKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW86IG5ldyBHb3JkaWMuU21sLldlYkNsaWVudC5HVmVjbnlQcm9maWxTbWxEQU8oeyBpeHA6IGFrdFJhZGVrLml4cCEgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiBha3RSYWRlay5peHAhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtbHBpZF9wOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbnQgPSB0aGF0Lm5hdmlnYXRlKFtHb3JkaWMuRWtvLldlYkNsaWVudC5HVmVjbnlQcm9maWxTZXpuYW0sIHt9XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2cENvbnRlbnQgPSAkLmNvbnRlbnQ8R29yZGljLkVrby5XZWJDbGllbnQuR1ZlY255UHJvZmlsU2V6bmFtPihjbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnBDb250ZW50LnJlYWR5QXdhaXQudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnBDb250ZW50LmFjY2VwdCh2aXNpdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2cENvbnRlbnQuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5vbihcImNsb3NlZFwiLCAoZXYsIGNoYW5nZWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiB7IGl4cDogW2FrdFJhZGVrLml4cF0gfSwgb25seVBLV2l0aG91dEZpbHRlcnM6IHRydWUgfSwgeyB1cGRhdGVNb2RlOiBcInVwZGF0ZVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY250LnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJQb2xvxb5reSBWUFwiLCBkYXRhLlBlcm1pc3Npb25zPy5MemVQb2xvemt5RlAubWVzc2FnZSB8fCBcIk5lbcOhdGUgb3Byw6F2bsSbbsOtIGsgem9icmF6ZW7DrSBwb2xvxb5layBWUFwiKS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuw60gb2tuYSBJbmZvIGsgZG9rbGFkdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaW5mbygpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBha3RSYWRlayA9IEVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4odGhpcy5lbGVtZW50LmZpbmQoXCIuU2V6bmFtU21sLmdncmlkXCIpKTtcclxuICAgICAgICAgICAgaWYgKGFrdFJhZGVrICYmICEoYWt0UmFkZWsgaW5zdGFuY2VvZiBqUXVlcnkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLnJlYWQoeyBpeHA6IGFrdFJhZGVrLml4cCwgZnJhZ21lbnRzOiBbXCIqXCIsIFwiUGVybWlzc2lvbnMuKlwiXSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3puw6Fta2E6IHBlcm1pc3Npb24gbmVuw60gcG90xZllYmEgxZllxaFpdCwgcHJvdG/FvmUgaW5mbyBuZW3DoSBzdm9qZSBvcHLDoXZuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG96bsOhbWthOiBpbmZvIG5ldW1vxb7FiHVqZSBha3Rpdm7DrSBvcGVyYWNlLCB0YWsgbmVuw60gcG90xZllYmEgxZllxaFpdCByZWxvYWQgem3Em27Em27DvWNoIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRGlhbG9ncy5HU21sSW5mb0RsZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21scGlkOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kT3RldnJlbmk6IEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5uYXZpZ2F0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW7DrSB6w6FwaXPFryBkb2tsYWR1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6YXBpc3koKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgYWt0UmFkZWsgPSBFa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8+KHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbVNtbC5nZ3JpZFwiKSk7XHJcbiAgICAgICAgICAgIGlmIChha3RSYWRlayAmJiAhKGFrdFJhZGVrIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC5yZWFkKHsgaXhwOiBha3RSYWRlay5peHAsIGZyYWdtZW50czogW1wiKlwiLCBcIlBlcm1pc3Npb25zLipcIl0gfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG96bsOhbWthOiBwZXJtaXNzaW9uIG5lbsOtIHBvdMWZZWJhIMWZZcWhaXQsIHByb3Rvxb5lIHrDoXBpc3kgbmVtYWrDrSBzdm9qZSBvcHLDoXZuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG96bsOhbWthOiB6w6FwaXN5IG5ldW1vxb7FiHVqw60gYWt0aXZuw60gb3BlcmFjZSwgdGFrIG5lbsOtIHBvdMWZZWJhIMWZZcWhaXQgcmVsb2FkIHptxJtuxJtuw71jaCBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERpYWxvZ3MuR1NtbFphcGlzeURsZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX3NtbF9wcmk6IGRhdGEuaXhwX3NtbF9wcmkhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc2xvOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogZGF0YS5peHAhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjX3NtbDogZGF0YS5hY19zbWwhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kT3RldnJlbmk6IEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5uYXZpZ2F0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHLFr3ZvZGNlIG5hZCBzZXpuYW1lbSBkb2tsYWTFryA8RFRPIG9wZXJhY2UsIG1vZGVsIHBhcmFtZXRyxa8+XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtTbWxXaXphcmQuU21sV2l6YXJkUGFyYW1zPFRPcGVyYXRpb25EdG8sIFRNb2RlbCwgU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvPiB8IFNtbFdpemFyZC5TbWxXaXphcmRQYXJhbXNQYXJ0PFRPcGVyYXRpb25EdG8sIFRNb2RlbCwgU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvPn0gcGFyYW1zIMSNw6FzdCBwYXJhbWV0csWvIHByxa92b2RjZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHdpemFyZFR3b1N0ZXBzPFRPcGVyYXRpb25EdG8sIFRNb2RlbCA9IG51bGw+KFxyXG4gICAgICAgICAgICBwYXJhbXM6IFNtbFdpemFyZC5TbWxXaXphcmRQYXJhbXM8VE9wZXJhdGlvbkR0bywgVE1vZGVsLCBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8+IHwgU21sV2l6YXJkLlNtbFdpemFyZFBhcmFtc1BhcnQ8VE9wZXJhdGlvbkR0bywgVE1vZGVsLCBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8+XHJcbiAgICAgICAgKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBkb8SNYXNuw6kgxZllxaFlbsOtIGZyYWdtZW50xa8gLSBqZSBhbGUgamUgbnV0bsOpIHDFmWVkYXQgZG8gbWV0b2R5IHdpemFyZEdldERhdGFcclxuICAgICAgICAgICAgLy9sZXQgZ3JpZEZvcm1hdCA9IEdvcmRpYy5TbWwuV2ViQ2xpZW50LlNtbEdyaWQuRG9rbGFkLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vbGV0IGZyYWdtZW50czogc3RyaW5nW10gPSBTbWxXaXphcmQuZ2V0RnJhZ21lbnRzRnJvbUdyaWRGb3JtYXQoZ3JpZEZvcm1hdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWRGb3JtYXQgPSBTbWxXaXphcmQuZ2V0Q3VycmVudEdyaWRGb3JtYXQ8U21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvPih0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1TbWwuZ2dyaWRcIikvKiwgdHJ1ZSovKTtcclxuICAgICAgICAgICAgY29uc3QgZnJhZ21lbnRzID0gU21sV2l6YXJkLmdldEZyYWdtZW50c0Zyb21HcmlkRm9ybWF0KGdyaWRGb3JtYXQvKiwgdHJ1ZSovKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZvbMOhbsOtIG9iZWNuw6lobyBTTUwgcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIHJldHVybiBTbWxXaXphcmQud2l6YXJkVHdvU3RlcHMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwianJlczoyNDEwMDA0NVwiLCAvL1JDIDI0MTAwMDQ1IDogVnlicmFuw6kgZG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGdyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiB0aGF0LlByaW1hcnlLZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlOiAodGhhdC5lbGVtZW50LmZpbmQoXCIuU2V6bmFtU21sLmdncmlkXCIpLmdncmlkKFwiZ2V0Q3VycmVudFByb2ZpbGVcIikpIGFzIGFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RGF0YTogKHdpdGhSZXN1bHRzLCBpa2NPckRhdGEsIHJlc3BvbnNlKSA9PiB7IHJldHVybiB0aGF0LndpemFyZEdldERhdGEod2l0aFJlc3VsdHMsIHdpdGhSZXN1bHRzLCBpa2NPckRhdGEsIGZyYWdtZW50cywgcmVzcG9uc2UpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUdyaWREZXRhaWw6IChjbnQsIGN0eCwgaWtjLCBtb2RlbCwgYWt0UmFkZWssICRncmlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQub3BlbkRldGFpbChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3RSYWRlayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZDogJGdyaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoQW5kQ2hlY2tEYXRhQWN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkUmVmcmVzaEFuZENoZWNrRGF0YShjbnQsIGZhbHNlLCAkZ3JpZC5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKSwgaWtjLCBmcmFnbWVudHMsIHBhcmFtcy5hY3Rpb25zLmlzbENoZWNrQmVmb3JlT3BlcmF0aW9uLCBwYXJhbXMucGFyYW1ldGVycy50b09wZXJhdGlvbkR0bywgbW9kZWwgYXMgVE1vZGVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgZGF0IHYgZ3JpZHUgYSBvYsSNZXJzdHZlbsOtIGluZGlrw6F0b3LFryBwb8SNdMWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZ3JpZC5nZ3JpZChcImdldFZpZXdcIikudXBkYXRlRGF0YShkYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoY250IGFzIGFueSkucmVmcmVzaEluZGljYXRvciAhPSB1bmRlZmluZWQgJiYgdHlwZW9mICgoY250IGFzIGFueSkucmVmcmVzaEluZGljYXRvcikgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbnQgYXMgYW55KS5yZWZyZXNoSW5kaWNhdG9yKCRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsb2FkTGlzdEFmdGVyRmluaXNoOiAoKSA9PiB7IHJldHVybiB0aGF0LnZpZXcucmVxdWVzdERhdGEoeyB3aXRob3V0TG9uZ0xpbWl0OiB0cnVlIH0pOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc1xyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnLDoXTDrSBzZXpuYW0gZG9rbGFkxa8gcHJvIHpvYnJhemVuw60gdiBwcsWvdm9kY8OtY2ggcHJvIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBvbmx5Q2hlY2tlZCBwb3V6ZSB6YcWha3J0bnV0w6kgxZnDoWRreSAodHJ1ZSA9IGFubywgZmFsc2UgPSBuZSlcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHdpdGhSZXN1bHRzIGRvcGxuxJtuw60gdsO9c2xlZGvFryBocm9tYWRuw6kgb3BlcmFjZSAodHJ1ZSA9IGFubywgZmFsc2UgPSBuZSlcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HZW5lcmFsLkdJa2MgfCBHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvW10gfCBudWxsfSBpa2NPckRhdGEgSUtDIG5lYm8gZGF0YSAoc3RhxI3DrSBQSylcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ1tdIHwgdW5kZWZpbmVkfSBmcmFnbWVudHMgZnJhZ21lbnR5XHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuSXNsLkdTZXJ2aWNlR3JvdXBSZXNwb25zZTxHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvPn0gW3Jlc3BvbnNlXSB2w71zbGVkZWsgaHJvbWFkbsOpIG9wZXJhY2VcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTwoR29yZGljLkVrby5Db21wb25lbnRzLk1hc3NPcGVyYXRpb25EYXRhPEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8+IHwgR29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bylbXT59IHNlem5hbSBkb2tsYWTFryAocyB2w71zbGVka3kgb3BlcmFjZSBuZWJvIGJleiBwb2RsZSBwYXJhbWV0cnUgd2l0aFJlc3VsdHMpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB3aXphcmRHZXREYXRhKFxyXG4gICAgICAgICAgICBvbmx5Q2hlY2tlZDogYm9vbGVhbixcclxuICAgICAgICAgICAgd2l0aFJlc3VsdHM6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIGlrY09yRGF0YTogR29yZGljLkdlbmVyYWwuR0lrYyB8IEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9bXSB8IG51bGwsXHJcbiAgICAgICAgICAgIGZyYWdtZW50czogc3RyaW5nW10gfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlPzogR29yZGljLklzbC5HU2VydmljZUdyb3VwUmVzcG9uc2U8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz5cclxuICAgICAgICApOiBKUXVlcnlQcm9taXNlPChHb3JkaWMuRWtvLkNvbXBvbmVudHMuTWFzc09wZXJhdGlvbkRhdGE8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4gfCBHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvKVtdPiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLy8vIFRPRE86IGplIHRvIGplbiBwb2t1cyBqYWsgc2tyw710IHRsYcSNw610a28sIGFsZSBuZW7DrSB0byBrZGUgdnl2b2xhdCwgdGFrxb5lIHNlIHRvIGJ1ZGUgbXVzZXQgb2JzbG91xb5pdCB2IGtvbXBvbmVudMSbIHByxa92b2RjZVxyXG4gICAgICAgICAgICAvLyQoXCIuZ2J1dHRvbiBbYXJpYS1sYWJlbD0nWmtvbnRyb2xvdmF0J11cIikuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZmlsdHJ5IHBvZGxlIHJlxb5pbXUga25paHlcclxuICAgICAgICAgICAgLy8gVE9ETzoganNvdSB2xa9iZWMgcG90xZllYmEsIGtkecW+IGplIHRhbSBobGF2bsOtIGZpbHRyIHDFmWVzIHdmbHRwcmU/XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge307XHJcbiAgICAgICAgICAgIC8vaWYgKCh0aGF0IGFzIGFueSkuZWtvQm9va0ZpbHRlcj8uaXhwX2RlbikgJC5leHRlbmQoZmlsdGVycywgeyBpeHBfZGVuOiAodGhhdCBhcyBhbnkpLmVrb0Jvb2tGaWx0ZXIuaXhwX2RlbiB9KTtcclxuICAgICAgICAgICAgLy9pZiAoKHRoYXQgYXMgYW55KS5la29Cb29rRmlsdGVyPy5yb2spICQuZXh0ZW5kKGZpbHRlcnMsIHsgcm9rX2RlbjogKHRoYXQgYXMgYW55KS5la29Cb29rRmlsdGVyLnJvayB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZvbMOhbsOtIG9iZWNuw6kgbWV0b2R5IHBybyBuYcSNdGVuw60gZGF0IGRvIHByxa92b2RjZVxyXG4gICAgICAgICAgICByZXR1cm4gU21sV2l6YXJkLmdldERhdGEoXHJcbiAgICAgICAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgICAgICAgb25seUNoZWNrZWQsXHJcbiAgICAgICAgICAgICAgICB3aXRoUmVzdWx0cyxcclxuICAgICAgICAgICAgICAgIGlrY09yRGF0YSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcnMsXHJcbiAgICAgICAgICAgICAgICAocnEpID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC5saXN0KHJxKTsgfSxcclxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwvLyhkYXRhKSA9PiB7IHJldHVybiBTbWxHcmlkLkRva2xhZFNtbC5tb2RpZnlEdG8oZGF0YSwgZmFsc2UsIHdpdGhSZXN1bHRzKSB9LFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UsXHJcbiAgICAgICAgICAgICAgICB0aGF0LlByaW1hcnlLZXksXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudHNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ixI1lcnN0dsOtIHNlem5hbSBhIHDFmWVrb250cm9sdWplIGRhdGEgKG9ib2plIHZvbGl0ZWxuxJspXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY250IGNvbnRlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlbG9hZERhdGEgbWFqw60gc2UgbmHEjcOtc3QgYWt0dcOhbG7DrSBkYXRhIHogZGF0YWLDoXplPyAodHJ1ZSA9IGFubywgZmFsc2UgPSBuZSlcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9bXSB8IHVuZGVmaW5lZH0gZGF0YSBkYXRhIHBybyBwxZnDrXBhZCwgxb5lIHNlIG5lbWFqw60gbmHEjcOtdGF0IHogZGF0YWLDoXplIChyZWxvYWREYXRhID0gZmFsc2UpXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2VuZXJhbC5HSWtjIHwgbnVsbH0gaWtjIElLQ1xyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nW10gfCB1bmRlZmluZWR9IGZyYWdtZW50cyBmcmFnbWVudHlcclxuICAgICAgICAgKiBAcGFyYW0geygoZHRvOiBUT3BlcmF0aW9uRHRvKSA9PiBhbnkpIHwgdW5kZWZpbmVkfSBjaGVja0FjdGlvbiBkZWxlZ8OhdCBwcm8ga29udHJvbHUgZGF0IHDFmWVkIG9wZXJhY8OtIChwb2t1ZCBuZW7DrSwgbmV2b2zDoSBzZSBrb250cm9sYSwgamVuIHNlIG5hxI10b3UgYWt0dcOhbG7DrSBkYXRhKVxyXG4gICAgICAgICAqIEBwYXJhbSB7KG1vZGVsOiBUTW9kZWwgfCB1bmRlZmluZWQsIGRhdGE6IEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9bXSwgaWtjOiBHb3JkaWMuR2VuZXJhbC5HSWtjKSA9PiBUT3BlcmF0aW9uRHRvfSB0b09wZXJhdGlvbkR0byBkZWxlZ8OhdCBwcm8gdnl0dm/FmWVuw60gRFRPIG9wZXJhY2VcclxuICAgICAgICAgKiBAcGFyYW0ge1RNb2RlbCB8IHVuZGVmaW5lZH0gbW9kZWwgbW9kZWxcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvW10+fSBzZXpuYW0gZG9rbGFkxa8gKHMgdsO9c2xlZGt5IG9wZXJhY2UgbmVibyBiZXogcG9kbGUgcGFyYW1ldHJ1IHdpdGhSZXN1bHRzKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgd2l6YXJkUmVmcmVzaEFuZENoZWNrRGF0YTxUT3BlcmF0aW9uRHRvLCBUTW9kZWw+KFxyXG4gICAgICAgICAgICBjbnQ6IEdDb250ZW50LFxyXG4gICAgICAgICAgICByZWxvYWREYXRhOiBib29sZWFuLFxyXG4gICAgICAgICAgICBkYXRhOiBHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvW10gfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGlrYzogR29yZGljLkdlbmVyYWwuR0lrYyB8IG51bGwsXHJcbiAgICAgICAgICAgIGZyYWdtZW50czogc3RyaW5nW10gfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAoKGR0bzogVE9wZXJhdGlvbkR0bykgPT4gYW55KSB8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbDogVE1vZGVsIHwgdW5kZWZpbmVkLCBkYXRhOiBHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvW10sIGlrYzogR29yZGljLkdlbmVyYWwuR0lrYyB8IG51bGwpID0+IFRPcGVyYXRpb25EdG8sXHJcbiAgICAgICAgICAgIG1vZGVsOiBUTW9kZWwgfCB1bmRlZmluZWRcclxuICAgICAgICApOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5NYXNzT3BlcmF0aW9uRGF0YTxHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvPltdPiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyB2b2zDoW7DrSBvYmVjbsOpIG1ldG9keSBvYsSNZXJzdHZlbsOtIHNlem5hbXUgYSBrb250cm9sdSBkYXRcclxuICAgICAgICAgICAgcmV0dXJuIFNtbFdpemFyZC5yZWZyZXNoQW5kQ2hlY2tEYXRhKFxyXG4gICAgICAgICAgICAgICAgY250LFxyXG4gICAgICAgICAgICAgICAgcmVsb2FkRGF0YSxcclxuICAgICAgICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgICAgICAgICBpa2MsXHJcbiAgICAgICAgICAgICAgICAod2l0aFJlc3VsdHM6IGJvb2xlYW4sIGlrYzogR29yZGljLkdlbmVyYWwuR0lrYyB8IG51bGwpID0+IHsgcmV0dXJuIHRoYXQud2l6YXJkR2V0RGF0YShmYWxzZSwgd2l0aFJlc3VsdHMsIGlrYywgZnJhZ21lbnRzKTsgfSxcclxuICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG8sXHJcbiAgICAgICAgICAgICAgICBtb2RlbFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBOZXphxZlhemVuw6lcclxuXHJcbiAgICAgICAgLy8gVE9ETzogdHlobGUgbWV0b2R5IHByb3TFmcOtZGl0IHDFmcOtcGFkbsSbIHVkxJtsYXQgbm92w70gcmVnaW9uIG5lYm8gcMWZZXN1bm91dCBkbyBzbWwubWV0aG9kc1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcsOhdMOtIFBJRCBha3R1w6FsbsOtIGtuaWh5IChuZWJvIG51bGwgcG9rdWQgbmVuw60gemFkw6FuYSBuZWJvIHNlIGpkZSBvIHJlxb5pbSBwxZllcyB2w61jZSBrbmloKVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfSBQSUQgYWt0dcOhbG7DrSBrbmloeSAobmVibyBudWxsIHBva3VkIG5lbsOtIHphZMOhbmEgbmVibyBzZSBqZGUgbyByZcW+aW0gcMWZZXMgdsOtY2Uga25paClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldEl4cERlbigpOiBzdHJpbmcgfCBudWxsIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHrFr3N0YW5lIHRhdG8gbWV0b2RhP1xyXG4gICAgICAgICAgICBpZiAoRWtvLlV0aWxzLmdldEVrb0Jvb2tWYXJpYW50KHRoaXMpID09PSBFa28uSW50ZXJmYWNlLkdFa29Cb29rVmFyaWFudC5PbmUpIHJldHVybiB0aGlzLmVrb0Jvb2s/Lml4cF9kZW4gfHwgbnVsbDtcclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyw6F0w60gcGFyYW1ldHIgcHJvIGtuaWh1IGRsZSBha3R1w6FsbsOtaG8gcmXFvmltdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IGhvZG5vdGEgcGFyYW1ldHJ1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRQYXJhbUtuaWhhKCk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiB0dXRvIG1ldG9kdSBhc2kgZMOhdCBkbyBzcG9sZcSNbsO9Y2gsIHByb3Rvxb5lIGJ1ZGUgbmVqc3DDrcWhZSBwb3XFvml0YSBpIHYgc291cGlza8OhY2hcclxuICAgICAgICAgICAgaWYgKEVrby5VdGlscy5nZXRFa29Cb29rVmFyaWFudCh0aGlzKSA9PT0gRWtvLkludGVyZmFjZS5HRWtvQm9va1ZhcmlhbnQuT25lKSByZXR1cm4gdGhpcy5la29Cb29rPy5peHBfZGVuIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIGlmIChFa28uVXRpbHMuZ2V0RWtvQm9va1ZhcmlhbnQodGhpcykgPT09IEVrby5JbnRlcmZhY2UuR0Vrb0Jvb2tWYXJpYW50LlllYXIpIHJldHVybiB0aGlzLmVrb0Jvb2s/LnJvaz8udG9TdHJpbmcoKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gTmFzdGF2ZW7DrVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2ZSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8ganNvdSBuxJtqYWvDqSDFmcOhZGt5P1xyXG4gICAgICAgICAgICBjb25zdCBpc0VtcHR5ID0gISh0aGlzLnZpZXcuZ2V0Q291bnQoXCJkYXRhXCIpID4gMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBha2NlIHNlem5hbXVcclxuICAgICAgICAgICAgY29uc3QgcGVybUVtcHR5R3JpZCA9IFNtbEdyaWQuZ2V0RW1wdHlHcmlkUGVybWlzc2lvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBhY3RzID0gdGhpcy5hY3Rpb25zO1xyXG4gICAgICAgICAgICBjb25zdCBwZXJtcyA9IHRoaXMuUGVybWlzc2lvbnM7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0UG9kYW5pIS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zPy5MemVQb2RhdCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0RGV0YWlsIS51cGRhdGVQZXJtaXNzaW9uKGlzRW1wdHkgPyBwZXJtRW1wdHlHcmlkIDogcGVybXM/Lkx6ZVpvYnJheml0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3REZXRhaWxEb1phbG96a3khLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplWm9icmF6aXQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFNjaHZhbGVuaSEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVIcm9tYWRuZVNjaHZhbGl0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RacnVzZW5pU2NodmFsZW5pIS51cGRhdGVQZXJtaXNzaW9uKGlzRW1wdHkgPyBwZXJtRW1wdHlHcmlkIDogcGVybXM/Lkx6ZUhyb21hZG5lWnJ1c2l0U2NodmFsZW5pKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RQb2RlcHNhbmkhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplSHJvbWFkbmVQb2RlcHNhdCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0WnJ1c2VuaVBvZGVwc2FuaSEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVIcm9tYWRuZVpydXNpdFBvZGVwc2FuaSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0VWtvbmNlbmkhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplSHJvbWFkbmVVa29uY2l0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RacnVzZW5pVWtvbmNlbmkhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplSHJvbWFkbmVacnVzaXRVa29uY2VuaSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0U3Rvcm5vIS51cGRhdGVQZXJtaXNzaW9uKGlzRW1wdHkgPyBwZXJtRW1wdHlHcmlkIDogcGVybXM/Lkx6ZUhyb21hZG5lU3Rvcm5vdmF0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RacnVzZW5pU3Rvcm5hIS51cGRhdGVQZXJtaXNzaW9uKGlzRW1wdHkgPyBwZXJtRW1wdHlHcmlkIDogcGVybXM/Lkx6ZUhyb21hZG5lWnJ1c2l0U3Rvcm5vKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RSZXplcnZhY2VJaXNzcCEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVSZXplcnZvdmF0SWlzc3ApO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFByZWRhbmkhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplUHJlZGF0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RQcmV2emV0aSEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVQcmV2eml0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RQcmlkZWxlbmkhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplUHJpZGVsaXQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFByZWV2aWRlbmNlIS51cGRhdGVQZXJtaXNzaW9uKGlzRW1wdHkgPyBwZXJtRW1wdHlHcmlkIDogcGVybXM/Lkx6ZVByZWV2aWRvdmF0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RTY2h2YWxlbmlQb2xvemVrRlAhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplSHJvbWFkbmVTY2h2YWxpdFBvbG96a3lGUCk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCB0eXAgcGVybXMgbmVibyB6YWxvxb5pdCBub3ZvdSBwcm9txJtubm91IG5hIHBlcm1pc3Npb25zIHDFmcOtcGFkdT9cclxuICAgICAgICAgICAgLy8gVE9ETzogdiBwxZnDrXBhZMSbIHJlxb5pbXUgdsOtY2Uga25paCBqZSB0ZW5obGUgcGVybWlzc2lvbiBwb3ZvbGVuIChuYSByb3pkw61sIG9kIGRva2xhZG92w71jaCkgLSBuZWNoYXQgdG8gbmVibyBrIGRva2xhZG92w71tIHBlcm1pc3Npb25zIHDFmWlkYXQgcGVybWlzc2lvbiBwcm8gcMWZw61wYWQgYSB0w61tIG9tZXppdCB2xaFlY2hueSBwb3XFvml0w6k/XHJcbiAgICAgICAgICAgIGFjdHMuYWN0RmluYW5jbmlLb250cm9sYSEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IChwZXJtcyBhcyBhbnkpPy5wcmlwYWQ/Lkx6ZVBvZGF0RkspO1xyXG4gICAgICAgICAgICBhY3RzLmFjdEtvbnRyb2xhTWV0YWRhdCEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVaa29udHJvbG92YXRNZXRhZGF0YSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0VXZvbG5lbmkhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplSHJvbWFkbmVVdm9sbml0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RabWVuYVVkYWp1IS51cGRhdGVQZXJtaXNzaW9uKGlzRW1wdHkgPyBwZXJtRW1wdHlHcmlkIDogcGVybXM/Lkx6ZUhyb21hZG5lWm1lbml0VWRhamUpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdEdlbmVyb3ZhbmlQb3VrYXp1IS51cGRhdGVQZXJtaXNzaW9uKGlzRW1wdHkgPyBwZXJtRW1wdHlHcmlkIDogcGVybXM/Lkx6ZUdlbmVyb3ZhdFBvdWtheik7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0R2VuZXJvdmFuaVBvaGxlZGF2a3khLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplR2VuZXJvdmF0UG9obGVkYXZrdSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0UHJpZGF0RG9Qb3Jvdm5hbmkhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiB7IHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFRpc2shLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplVGlza25vdXQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdE9kZXNsYXQhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplSHJvbWFkbmVPZGVzbGF0RG9WeXByYXZueSk7XHJcbiAgICAgICAgICAgIC8vIHBlcm1pc3Npb25zIHBvbG/FvmVrIGEgesOhcGlzxa8gc2UgxZllxaHDrSBhxb4gcMWZaSB2eXZvbMOhbsOtIGFrY2UsIHByb3Rvxb5lIHNlIHBvdcW+w612YWrDrSB6w6F6bmFtb3bDqSBwZXJtaXNzaW9uc1xyXG4gICAgICAgICAgICBhY3RzLmFjdFBvbG96a3lGUCEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy4vKkx6ZVBvbG96a3lGUCovTHplWm9icmF6aXQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFBvbG96a3lWUCEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy4vKkx6ZVBvbG96a3lWUCovTHplWm9icmF6aXQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdEluZm8hLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uLypMemVJbmZvKi9MemVab2JyYXppdCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0WmFwaXN5IS51cGRhdGVQZXJtaXNzaW9uKGlzRW1wdHkgPyBwZXJtRW1wdHlHcmlkIDogcGVybXM/Li8qTHplWmFwaXN5Ki9MemVab2JyYXppdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEZpbHRyeVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB2eXR2b8WZw60gYSB2csOhdMOtIGZvcm11bMOhxZllIHMgZmlsdHJ5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5Gb3Jtcy5Gb3JtW119IHBvbGUgZm9ybXVsw6HFmcWvIHMgZmlsdHJ5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXJzKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtW10ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjI0MTAwMDU5XCIgfSkgLy9SQyAyNDEwMDA1OSA6IEtvbXBsZXRuw60gZmlsdHJcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MjQxMDAwNjBcIikgLy9SQyAyNDEwMDA2MCA6IFrDoWtsYWRuw60gw7pkYWplXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb2xhZGl0IHBvxZlhZMOtIGZpbHRyxa8gKHBvZGxlIGRldGFpbHUgbmVibyBzZXpuYW11KVxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogcMWZaWRhdCBjaHlixJtqw61jw60gZmlsdHJ5ICh0xZllYmEgdHlwIGtvbXBlbnpvdmFuw71jaCBwb2xvxb5layBuZWJvIGtsw63EjW92w6Egc2xvdmEgamFrbyB2IFVDVD8pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9OYW1lcy5peHBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBvYmVjbsOhIG1ldG9kYSBuZW3DoSBtb8W+bm9zdCBuYXN0YXZpdCBuYW1lIC0gbmV1cHJhdml0IGppP1xyXG4gICAgICAgICAgICAgICAgLy8uYWRkUHJlZmFiKEdvcmRpYy5Fa28uRmlsdGVycy5wcmVmYWJBZ0V2Q2lzbG8oKSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFnZW5kb3bDqSDEjcOtc2xvIG9kLWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19zbWxcIlxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJFdmlkZW7EjW7DrSDEjcOtc2xvIG9kLWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY1wiXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgZG9rbGFkdVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHN0eXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLml4c190eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX3R5cD1peHNfdHlwO2t0Z190eXA9a3RnX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGt0Z190eXA6IHRoaXMuS3RnVHlwIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBkb2tsYWR1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc21sY3N0YSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuc21sX3N0YXYsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic21sX3N0YXY9c21sX3N0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBwb21vY27DoSB0bGHEjcOtdGthIHBybyB2w71ixJtyIHbDrWNlIHZ5YnJhbsO9Y2ggc3RhdsWvIG5hIGplZGVuIGtsaWtcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBjdXN0b21DbGFzczogXCJub1Bpbm5hYmxlXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTC0zLTgtMSwgTS0wLTExLTEsIFMtMC0xMS0xXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCBcIlwiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJOZcO6cGxuw6EgcmV6ZXJ2YWNlXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwic21sU3Rhdjk5MFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmdmb3JtKCkuZmluZEZpZWxkcyhTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9OYW1lcy5zbWxfc3RhdikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgWy4uLl0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgXCJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDEwMDEwOFwiLCAvL1JDIDI0MTAwMTA4IDogTmVwxZlpcHJhdmVubyBrIHV6w6F2xJtyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic21sU3Rhdjk5MlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZ2Zvcm0oKS5maW5kRmllbGRzKFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLnNtbF9zdGF2KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBbeyBzbWxfc3RhdjogMTAgfSwgeyBzbWxfc3RhdjogMjAgfSwgeyBzbWxfc3RhdjogMjMgfSwgeyBzbWxfc3RhdjogMzAgfV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnYnV0dG9uXCIsIFwiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAxMDlcIiwgLy9SQyAyNDEwMDEwOSA6IE5lc3Rvcm5vdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic21sU3Rhdjk5OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZ2Zvcm0oKS5maW5kRmllbGRzKFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLnNtbF9zdGF2KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBbeyBzbWxfc3RhdjogMTAgfSwgeyBzbWxfc3RhdjogMjAgfSwgeyBzbWxfc3RhdjogMjMgfSwgeyBzbWxfc3RhdjogMzAgfSwgeyBzbWxfc3RhdjogNTAgfV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnYnV0dG9uXCIsIFwiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAxMTBcIiwgLy9SQyAyNDEwMDExMCA6IE5ldWtvbsSNZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNtbFN0YXY5OTlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmdmb3JtKCkuZmluZEZpZWxkcyhTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9OYW1lcy5zbWxfc3RhdikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgW3sgc21sX3N0YXY6IDEwIH0sIHsgc21sX3N0YXY6IDIwIH0sIHsgc21sX3N0YXY6IDIzIH0sIHsgc21sX3N0YXY6IDMwIH1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgcG9kcGlzdVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbGNzdHMoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLnNtbF9zdGF2LFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNnbl9zdGF2PXNnbl9zdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAxODNcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jbWVuKCksIHsgLy9SQyAyNDEwMDE4MyA6IE3Em25hXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibWVuYT1tZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9saXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2l0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MjQxMDAxMDFcIiwgLy9SQyAyNDEwMDEwMSA6IENlbmEgZG9rbGFkdSBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLmNfbWVuYV9kb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiAkLmV4dGVuZChHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkZWZhdWx0VmFsdWU6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MjQxMDAxMDJcIiwgLy9SQyAyNDEwMDEwMiA6IERhdHVtIGV2aWRlbmNlIG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuZGF0X3ByaWpfcG9kXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwMTAzXCIsIC8vUkMgMjQxMDAxMDMgOiBEYXR1bSB1emF2xZllbsOtIG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuZGF0X3V6YXZyZW5pXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwMTA0XCIsIC8vUkMgMjQxMDAxMDQgOiBEYXR1bSBrb25jZSBwbGF0bm9zdGkgb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9OYW1lcy5kYXRfcGxhdG5vc3RcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MjQxMDAxMDVcIiwgLy9SQyAyNDEwMDEwNSA6IERhdHVtIMO6xI1pbm5vc3RpIG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuZGF0X3VjaW5ub3N0XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwMTA2XCIsIC8vUkMgMjQxMDAxMDYgOiBEYXR1bSBwb2RwaXN1IHByb3Rpc3RyYW5vdSBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLmRhdF9zZ25fZXh0XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwMTA3XCIsIC8vUkMgMjQxMDAxMDcgOiBEYXR1bSBwb2RwaXN1IG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuZGF0X3NnblxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFNtbFV0aWxzLmdldFZhZFRleHQodGhpcywgR29yZGljLlNtbC5JbnRlcmZhY2UuR1NtbHZhZElkLlBvcGlzKSA/PyBcIlBvcGlzXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9OYW1lcy5wb3Bpc1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coU21sVXRpbHMuZ2V0VmFkVGV4dCh0aGlzLCBHb3JkaWMuU21sLkludGVyZmFjZS5HU21sdmFkSWQuTmF6ZXYpID8/IFwiw5pwbG7DvSBuw6F6ZXZcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLm5hemV2XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogbmV1cHJhdml0IGZpbHRyIG5hIHN1Ympla3QgbmEgaXhzX2VrbyBtw61zdG8gaXhzX2VzdT9cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdWJqZWt0XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2VzdSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuaXhzX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZXN1PWl4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJacHJhY292YXRlbFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNmdW5NaW5pKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9OYW1lcy5peHNfZnVuX2FrdCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZnVuX2FrdD1peHNfZnVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJGaW5hY292w6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MjQxMDAwOThcIiwgLy9SQyAyNDEwMDA5OCA6IERhdHVtIGZpbmFuY292w6Fuw60gb2Qgb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9OYW1lcy5maW5fb2RcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyNDEwMDA5OVwiLCAvL1JDIDI0MTAwMDk5IDogRGF0dW0gZmluYW5jb3bDoW7DrSBkbyBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLmZpbl9kb1xyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwMTAwXCIsIC8vUkMgMjQxMDAxMDAgOiBDZWxrb3bDoSDEjcOhc3RrYSBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLmNfbWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRBbGw6ICQuZXh0ZW5kKEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRlZmF1bHRWYWx1ZTogbnVsbCB9KVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZXVkxJtsYXQgc2t1cGludSBwcm8gZmlsdHJ5IHDFmcOtcGFkdT9cclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoU21sRGV0YWlsLnByZWZhYlVwbG55Q2FzdGVjbnlaYWRueShcImRpc3BcIiwgXCJkaXNwX3R4dFwiLCBcIkRpc3BvbmliaWxpdGFcIiwgdW5kZWZpbmVkLCAoZSwgYykgPT4geyB0aGF0LmZpbHRlckFub05lQ2hhbmdlKFwiZGlzcFwiLCBlLCBjKTsgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkZpbmFuxI1uw60gcHJvZmlsXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRmluYW7EjW7DrSBwcm9maWxcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5Fa28uUHJlZmFicy5jZnVFbGVtZW50cyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR1NtbENmdUZpbHRlckR0bz4oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm9rKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKGR0bykgeyByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWUoZHRvLnJvayk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm9rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRCYW5rb3ZuaVVjZXRWbGFzdG5pKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKGR0bykgeyByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWUoZHRvLmJ1X3ZsX3R4dCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IFNtbEZpbHRlci5idVZsVHh0SW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImJ1X3ZsX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQmFua292bsOtIMO6xI1ldCB2bGFzdG7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB0aGlzLlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoaXMuUm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19wb2xfcGxhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkplQUNSXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImpyZXM6MzM2MDAzNzdcIiAvL1JDIDMzNjAwMzc3IDogxIxQUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJqcmVzOjMzNjAwMzc4XCIsIC8vUkMgMzM2MDAzNzggOiDEjMOtc2xvIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChkdG8pIHsgcmV0dXJuIEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRJbnRlcnZhbFZhbHVlKGR0by5jaXNfcG9sX3BsYSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IC8qU21sRmlsdGVyLmNpc1BvbFBsYUludGVydmFsKi9Hb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImNpc19wb2xfcGxhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5KZUFDUlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwianJlczozMzYwMDM3N1wiIC8vUkMgMzM2MDAzNzcgOiDEjFBQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJqcmVzOjMzNjAwMzc4XCIsIC8vUkMgMzM2MDAzNzggOiDEjMOtc2xvIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGROa3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAoZHRvKSB7IHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZShkdG8ubmtzKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLm5rcyA/PyBcIk5TXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmx5QWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdFByb2hsOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkU29ydGVkRWtvQ2Z1U2V0KEdvcmRpYy5Fa28uQ2Z1VXRpbHMuZ2V0Q2Z1U2V0RWRpdG9ycyh0aGlzKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X3phelwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzgxXCIsIC8vUkMgMzM2MDAzODEgOiBUeXAgb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdG8/LnByaXpfemF6X3R4dCkgcmV0dXJuIFwiPVwiICsgZHRvLnByaXpfemF6X3R4dC50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkdG8/LnByaXpfemF6ICE9IG51bGwpIHJldHVybiBcIj1cIiArIGR0by5wcml6X3phei50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBTbWxGaWx0ZXIuZmlsdGVyRW1wdHlWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IFNtbEZpbHRlci5wcml6WmF6SW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInByaXpfemF6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzgxXCIsIC8vUkMgMzM2MDAzODEgOiBUeXAgb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzgyXCIsIC8vUkMgMzM2MDAzODIgOiDEjMOhc3RrYSBDWktcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChkdG8pIHsgcmV0dXJuIEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRJbnRlcnZhbFZhbHVlKGR0by5jKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM4MlwiIC8vUkMgMzM2MDAzODIgOiDEjMOhc3RrYSBDWktcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImNfZGlzcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMzYwMDU4NFwiLCAvL1JDIDMzNjAwNTg0IDogRGlzcG9uaWJpbG7DrSB6xa9zdGF0ZWtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIFRPRE86IGRvxZllxaFpdCBqZVNtbG91dmFcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBoaWRkZW46ICF0aGlzLmplU21sb3V2YVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKGR0bykgeyByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWUoZHRvLmNfcG9sKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtb2RlbDogXCJjX2Rpc3BcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTg0XCIsIC8vUkMgMzM2MDA1ODQgOiBEaXNwb25pYmlsbsOtIHrFr3N0YXRla1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbkFkZE5ld1JlY29yZHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuUmVtb3ZlUmVjb3JkczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pLCB7IG5hbWU6IFwiZnBfcG9sXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoU21sRGV0YWlsLnByZWZhYkZwVHlwVnliKFwiUG9sb8W+a3kgZmluYW7EjW7DrWhvIHByb2ZpbHVcIiwgdW5kZWZpbmVkLCAoZSwgYykgPT4geyB0aGF0LmZpbHRlckFub05lQ2hhbmdlKFwiZnBfdHlwX3Z5YlwiLCBlLCBjKTsgfSkpXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQbGF0ZWJuw60ga2FsZW5kw6HFmVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihTbWxEZXRhaWwucHJlZmFiUGxrVHlwVnliKFwiUGxhdGVibsOtIGthbGVuZMOhxZlcIiwgdW5kZWZpbmVkLCAoZSwgYykgPT4geyB0aGF0LmZpbHRlckFub05lQ2hhbmdlKFwicGxrX3R5cF92eWJcIiwgZSwgYyk7IH0pKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUm96cGlzXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKFNtbERldGFpbC5wcmVmYWJSb3pwaXNUeXBWeWIoXCJSb3pwaXMgY2Vsa292w6kgxI3DoXN0a3lcIiwgdW5kZWZpbmVkLCAoZSwgYykgPT4geyB0aGF0LmZpbHRlckFub05lQ2hhbmdlKFwicm96cGlzX3R5cF92eWJcIiwgZSwgYyk7IH0pKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiRG9kYXRla1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihTbWxEZXRhaWwucHJlZmFiRG9kVHlwVnliKFwiRG9kYXRla1wiLCB1bmRlZmluZWQsIChlLCBjKSA9PiB7IHRoYXQuZmlsdGVyQW5vTmVDaGFuZ2UoXCJkb2RfdHlwX3Z5YlwiLCBlLCBjKTsgfSkpXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJCbG9rYcSNbsOtIGFnZW5kYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihTbWxEZXRhaWwucHJlZmFiQW5vTmUoXCJzbWxfYmxrXCIsIFwic21sX2Jsa190eHRcIiwgXCJqcmVzOjI0MTAwMDkwXCIsIHVuZGVmaW5lZCwgKGUsIGMpID0+IHsgdGhhdC5maWx0ZXJBbm9OZUNoYW5nZShcInNtbF9ibGtcIiwgZSwgYyk7IH0pKSAvL1JDIDI0MTAwMDkwIDogVmF6YmEgZG9rbGFkdSBuYSBwxZnDrXBhZCBCTEtcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJCbG9rYcSNbsOtIGFnZW5kYVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmN0YWcoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLnR5cF9hZ19ibG9rLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInR5cF9hZ19ibG9rPXR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVG9vbHRpcFRlbXBsYXRlOiBcInt0eXBfYWdfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2FnOiB0aGlzLlR5cEFnQmxva0FrdC8qW1NtbC5HbG9iYWxzLkVudW1zLlR5cEFnLkVWWiwgU21sLkdsb2JhbHMuRW51bXMuVHlwQWcuUlpBLCBTbWwuR2xvYmFscy5FbnVtcy5UeXBBZy5WRlAsIFNtbC5HbG9iYWxzLkVudW1zLlR5cEFnLkVQT10qL1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBwb2t1ZCB0byBmdW5ndWplLCB0YWsgdG8gemFrb21lbnRvdmFuw6kgc21hemF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBtZXRvZHUgU21sRmlsdGVyLmZpbHRyeVByaXBhZHVabWVuYVR5cEFnQmxva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NtbEZpbHRlci5maWx0cnlQcmlwYWR1Wm1lbmFUeXBBZ0Jsb2soLyp0aGF0LnBhcmVudENvbnRlbnQhKi8kKGV2LmN1cnJlbnRUYXJnZXQpLnBhcmVudCgpLCBjaGFuZ2VPYmoudmFsdWUsIFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLnNvdXRleik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VPYmo/LnZhbHVlPy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbGUganNvdSBwb3ZvbGVuw6EgamVuIHBybyBqZWRudSBhZ2VuZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkucGFyZW50KCkuZmluZEZpZWxkcyhTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9OYW1lcy5zb3V0ZXopLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbGUganNvdSBuZXDFmcOtc3R1cG7DoSBwcm8gxb7DoWRub3UgbmVibyB2w61jZSBhZ2VuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoKS5maW5kRmllbGRzKFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLnNvdXRleikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLnBhcmVudCgpLmZpbmRGaWVsZHMoU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuc291dGV6KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRHJ1aCBzb3V0xJvFvmVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zbWxTb3V0ZXooKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9OYW1lcy5zb3V0ZXosXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRpb24gPT09IFwiYXBwbHlcIiAmJiBkdG9bXCJ0eXBfYWdfYmxva1wiXT8ubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2xlIHNvdXTEm8W+IGplIHDFmcOtc3R1cG7DqSBqZW4gcHJvIGplZG51IHp2b2xlbm91IGJsb2thxI1uw60gYWdlbmR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIMO6cHJhdmEgYXBwbHkgcG9rdWQgamUgemFkw6FuIGkgdHlwIGJva2HEjW7DrSBhZ2VuZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gXCJhcHBseVwiICYmIGR0b1tcInR5cF9hZ19ibG9rXCJdPy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbDogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZXRGbGFncyA9IG1vZGVsT3B0aW9ucz8uc2V0RmxhZ3MgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIMO6cHJhdmEgaG9kbm90IHBybyBmaWVsZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsT3B0aW9ucz8uc2V0RmxhZ3M/LmlzS29udHJvbG5pRGl2ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmXFvmltIGtvbnRyb2xuw61obyBkaXZ1IC0gdnJhY8OtIHBvbGUgc3RyaW5nxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBkdG9bXCJzb3V0ZXpcIl0ubWFwKGkgPT4geyByZXR1cm4gdHlwZW9mIGkgPT09IFwic3RyaW5nXCIgPyBpIDogaS5zb3V0ZXo7IH0pID8/IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gamluw6kgcmXFvmlteSAtIHZyYWPDrSBwb2xlIHN0cnVrdHVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gZHRvW1wic291dGV6XCJdLm1hcChpID0+IHsgcmV0dXJuIHR5cGVvZiBpID09PSBcInN0cmluZ1wiID8geyBzb3V0ZXo6IGksIHR5cF9hZ19ibG9rOiBkdG8udHlwX2FnX2Jsb2tbMF0gfSA6IHsgc291dGV6OiBpLnNvdXRleiwgdHlwX2FnX2Jsb2s6IGR0by50eXBfYWdfYmxva1swXSB9OyB9KSA/PyBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGbGFncyA9ICQuZXh0ZW5kKHsgdmFsaWQ6IGZhbHNlIH0sIG1vZGVsT3B0aW9ucz8uc2V0RmxhZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCQodGhpcykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGF0YVwiKSBhcyBHb3JkaWMuRGF0YS5SZWFkZXJzLklHUmVhZGVyQmFzZSkucmVhZGVyUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWVkw6Fuw60gdHlwdSBibG9rYcSNbsOtIGFnZW5keSBkbyByZWFkZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwQWdCbG9rOiBkdG8udHlwX2FnX2Jsb2tbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGhvZG5vdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2YWwsIHNldEZsYWdzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuc291dGV6O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcmlmaWNhdGlvbk5lZWRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2FnX2Jsb2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHMgPSAkLmNvbnRlbnQodGhpcykuZmluZEZpZWxkcyhTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9OYW1lcy50eXBfYWdfYmxvaykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFscz8ubGVuZ3RoID09PSAxKSByZXR1cm4gdmFsc1swXS50eXBfYWc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MjQxMDAwODlcIikgLy9SQyAyNDEwMDA4OSA6IFZhemJ5IGRva2xhZMWvIFNNTFxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihTbWxEZXRhaWwucHJlZmFiQW5vTmUoXCJzbWxfbmFkX3NtbFwiLCBcInNtbF9uYWRfc21sX3R4dFwiLCBcImpyZXM6MjQxMDAwOTFcIiwgdW5kZWZpbmVkLCAoZSwgYykgPT4geyB0aGF0LmZpbHRlckFub05lQ2hhbmdlKFwic21sX25hZF9zbWxcIiwgZSwgYyk7IH0pKSAvL1JDIDI0MTAwMDkxIDogVmF6YmEgZG9rbGFkdSBuYSBuYWTFmWF6ZW5vdSBzbWxvdXZ1XHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKFNtbERldGFpbC5wcmVmYWJBbm9OZShcInNtbF9vYmpcIiwgXCJzbWxfb2JqX3R4dFwiLCBcImpyZXM6MjQxMDAwOTJcIiwgdW5kZWZpbmVkLCAoZSwgYykgPT4geyB0aGF0LmZpbHRlckFub05lQ2hhbmdlKFwic21sX29ialwiLCBlLCBjKTsgfSkpIC8vUkMgMjQxMDAwOTIgOiBWYXpiYSBkb2tsYWR1IG5hIHBvZMWZw616ZW5vdSBvYmplZG7DoXZrdVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihTbWxEZXRhaWwucHJlZmFiQW5vTmUoXCJzbWxfZG9kXCIsIFwic21sX2RvZF90eHRcIiwgXCJqcmVzOjI0MTAwMDkzXCIsIHVuZGVmaW5lZCwgKGUsIGMpID0+IHsgdGhhdC5maWx0ZXJBbm9OZUNoYW5nZShcInNtbF9kb2RcIiwgZSwgYyk7IH0pKSAvL1JDIDI0MTAwMDkzIDogRG9kYXRlayBrZSBzbWxvdXbEm1xyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihTbWxEZXRhaWwucHJlZmFiQW5vTmUoXCJzbWxfbmFkX3ByaVwiLCBcInNtbF9uYWRfcHJpX3R4dFwiLCBcImpyZXM6MjQxMDAwOTRcIiwgdW5kZWZpbmVkLCAoZSwgYykgPT4geyB0aGF0LmZpbHRlckFub05lQ2hhbmdlKFwic21sX25hZF9wcmlcIiwgZSwgYyk7IH0pKSAvL1JDIDI0MTAwMDk0IDogRG9rbGFkIGplIG5hZMWZYXplbsO9bSBwxZnDrXBhZGVtXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKFNtbERldGFpbC5wcmVmYWJBbm9OZShcInNtbF9kb2NfZHNnXCIsIFwic21sX2RvY19kc2dfdHh0XCIsIFwianJlczoyNDEwMDA5NVwiLCB1bmRlZmluZWQsIChlLCBjKSA9PiB7IHRoYXQuZmlsdGVyQW5vTmVDaGFuZ2UoXCJzbWxfZG9jX2RzZ1wiLCBlLCBjKTsgfSkpIC8vUkMgMjQxMDAwOTUgOiBLIGRva2xhZHUgZXhpc3R1asOtIHpwcsOhdnkgZG9obGVkb3bDqWhvIHN5c3TDqW11XHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKFNtbERldGFpbC5wcmVmYWJBbm9OZShcInNfZWxlXCIsIFwic19lbGVfdHh0XCIsIFwianJlczoyNDEwMDA5NlwiLCB1bmRlZmluZWQsIChlLCBjKSA9PiB7IHRoYXQuZmlsdGVyQW5vTmVDaGFuZ2UoXCJzX2VsZVwiLCBlLCBjKTsgfSkpIC8vUkMgMjQxMDAwOTYgOiBLIGRva2xhZHUgZXhpc3R1amUgZWxla3Ryb25pY2vDvSBvYnJhei9wxZnDrWxvaGFcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoU21sRGV0YWlsLnByZWZhYkFub05lKFwic21sX21halwiLCBcInNtbF9tYWpfdHh0XCIsIFwianJlczoyNDEwMDA5N1wiLCB1bmRlZmluZWQsIChlLCBjKSA9PiB7IHRoYXQuZmlsdGVyQW5vTmVDaGFuZ2UoXCJzbWxfbWFqXCIsIGUsIGMpOyB9KSkgLy9SQyAyNDEwMDA5NyA6IFZhemJhIGRva2xhZHUgbmEgbWFqZXRrb3bDqSBrYXJ0eVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJadmXFmWVqbsSbbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDExOFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LndmbGNzenAoKSwgeyAvL1JDIDI0MTAwMTE4IDogU3RhdiB6dmXFmWVqbsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3pwdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInN0YXZfenB2PXN0YXZfenB2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAxMTlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxzenB2KCksIHsgLy9SQyAyNDEwMDExOSA6IFpwxa9zb2IgenZlxZllam7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3pwdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c196cHY9aXhzX3pwdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGplIHBvdMWZZWJhIHDFmWlkYXQgbsSbamFrw6kgc2VydmVyb3bDqSBmaWx0cnk/IHplcHRhdCBzZSBQZXRyYVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHYgVEsganNvdSBob2Rub3R5IHBvdmlubsOpL25lcG92aW5uw6lcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoU21sRGV0YWlsLnByZWZhYkFub05lKFwicHJpel9wb3ZfenZlXCIsIFwicHJpel9wb3ZfenZlX3R4dFwiLCBcIk51dG5vc3QgenZlxZllam7Em27DrVwiLCB1bmRlZmluZWQsIChlLCBjKSA9PiB7IHRoYXQuZmlsdGVyQW5vTmVDaGFuZ2UoXCJwcml6X3Bvdl96dmVcIiwgZSwgYyk7IH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAxMjBcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxjcGx6KCksIHsgLy9SQyAyNDEwMDEyMCA6IFBsw6FuIHp2ZcWZZWpuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBsYW5fenZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicGxhbl96dmU9cGxhbl96dmVcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiB2IFRLIGpzb3UgaG9kbm90eSBleGlzdHVqZS9uZWV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKFNtbERldGFpbC5wcmVmYWJBbm9OZShcInNfZWxlX3p2ZVwiLCBcInNfZWxlX3p2ZV90eHRcIiwgXCJqcmVzOjI0MTAwMTIxXCIsIHVuZGVmaW5lZCwgKGUsIGMpID0+IHsgdGhhdC5maWx0ZXJBbm9OZUNoYW5nZShcInNfZWxlX3p2ZVwiLCBlLCBjKTsgfSkpIC8vUkMgMjQxMDAxMjEgOiBFbC4gb2JyYXovcMWZw61sb2hhIHVyxI1lbsO9L8OhIGtlIHp2ZcWZZWpuxJtuw61cclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHsgdHlwZTogXCJkYXRlXCIsIGxhYmVsOiBcImpyZXM6MjQxMDAxMjJcIiwgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuZGF0X3p2ZSB9KSkgLy9SQyAyNDEwMDEyMiA6IERhdHVtIHp2ZcWZZWpuxJtuw61cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMTI0XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHsgbmFtZTogXCJpZF96dmVcIiB9KSAvL1JDIDI0MTAwMTI0IDogSUQgcmVnaXN0cnUgc21sdXZcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoU21sRGV0YWlsLnByZWZhYkFub05lKFwicGxhbl96dmVfZFwiLCBcInBsYW5fenZlX2RfdHh0XCIsIFwianJlczoyNDEwMDEyM1wiLCB1bmRlZmluZWQsIChlLCBjKSA9PiB7IHRoYXQuZmlsdGVyQW5vTmVDaGFuZ2UoXCJwbGFuX3p2ZV9kXCIsIGUsIGMpOyB9KSkgLy9SQyAyNDEwMDEyMyA6IFBvdXplIGRva2xhZHkgdXLEjWVuw6kga2UgenZlxZllam7Em27DrVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJWxJtjbsO9IHByb2ZpbFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihTbWxEZXRhaWwucHJlZmFiQW5vTmUoXCJ2cF90eXBfdnliXCIsIFwidnBfdHlwX3Z5Yl90eHRcIiwgXCJqcmVzOjI0MTAwMTcyXCIsIHVuZGVmaW5lZCwgKGUsIGMpID0+IHsgdGhhdC5maWx0ZXJBbm9OZUNoYW5nZShcInZwX3R5cF92eWJcIiwgZSwgYyk7IH0pKSAvL1JDIDI0MTAwMTcyIDogVmF6YmEgcG9sb8W+a3kgVlAgbmEgZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDE1N1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnZlcHNkdXAoKSwgeyAvL1JDIDI0MTAwMTU3IDogVHlwIHBvbG/Fvmt5IFZQXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXBfaXhzX2R1cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInZlcF9peHNfZHVwPWl4c19kdXBcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfZHVwOiB7IG86IFwiIT1cIiwgdjogU21sLkdsb2JhbHMuRW51bXMuTnVsYWsuRHVwIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAxNThcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwgeyAvL1JDIDI0MTAwMTU4IDogTsOhemV2IHBvbG/Fvmt5IFZQXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXBfbmF6ZXZcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMTU5XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHsgLy9SQyAyNDEwMDE1OSA6IEludmVudMOhcm7DrSDEjcOtc2xvIFZQXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXBfaW52X2Npc1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAxNjBcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwgeyAvL1JDIDI0MTAwMTYwIDogRXZpZGVuxI1uw60gxI3DrXNsbyBWUFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmVwX2V2aV9jaXNcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMTYxXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHsgLy9SQyAyNDEwMDE2MSA6IFbDvXJvYm7DrSDEjcOtc2xvIFZQXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXBfdnlyX2Npc1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAxNjJcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwgeyAvL1JDIDI0MTAwMTYyIDogU8OpcmlvdsOpIMSNw61zbG8gVlBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZlcF9zZXJfY2lzXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5KZUFDUikge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyRm9ybURlZlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lZnVuZ3VqZSwgcMWZaSBobGVkw6Fuw60gdG8gcGFkw6FcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDE2M1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0Lm1hdHNrY20oKSwgeyAvL1JDIDI0MTAwMTYzIDogS8SMTSBWUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZlcF9tYXRfY2lzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInZlcF9tYXRfY2lzPWlka1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza3A6IHsgbzogXCI+XCIsIHY6IFwiIFwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyRm9ybURlZlxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMTY0XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QubWFqc2NpbSgpLCB7IC8vUkMgMjQxMDAxNjQgOiBNYXRlcmnDoWxvdsOpIMSNw61zbG8gVlBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXBfbWF0X2Npc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ2ZXBfbWF0X2Npcz1tYXRfY2lzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrcDogeyBvOiBcIj5cIiwgdjogXCIgXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlsdGVyRm9ybURlZlxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAxNjVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29za2xhKCksIHsgLy9SQyAyNDEwMDE2NSA6IEtsYXNpZmlrYWNlIFZQXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXBfc2twXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidmVwX3NrcD1za3BcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBza3A6IHsgbzogXCI+XCIsIHY6IFwiIFwiIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAxNjZcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwgeyAvL1JDIDI0MTAwMTY2IDogxaBhcsW+ZSBWUFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmVwX3NhcnplXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjbyBpxI1vID8gdiBUSyB0byBuZXZ5YmVyZSBuaWMgLSB2IENvbnRyb2xzTG9naWMgamUgbsSbamFrw6kgc3RhcsOhIHZlcnplLCBrZGUgbmVuw60gScSMTyBhbmkgcGFyYW1ldHIgTUFKX1JBRF9BQ0NTS00gLSB6ZXB0YXQgc2UgUGV0cmEgVm/FoXR5XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDE2N1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0Lm1hamNza20oKSwgeyAvL1JDIDI0MTAwMTY3IDogU2t1cGluYSBtYWpldGt1IFZQXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXBfc2t1cGluYV9pZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInZlcF9za3VwaW5hX2lkPXNrcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNrdXBpbmFfaWQ6IHsgbzogXCI+XCIsIHY6IDAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDEjcOtc2VsbsOtayBuZW7DrVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiRHJ1aCBtYWpldGt1IFZQXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QubWFqc2RybSgpLCB7IG5hbWU6IFwidmVwX2RyaF9pZFwiLCBtb2RlbDogXCJ2ZXBfZHJoX2lkPWRyaF9pZFwiLCBkcm9wZG93bjogZmFsc2UsIG11bHRpOiB0cnVlLCBzZXJ2ZXJGaWx0ZXJzOiB7IGRyaF9pZDogeyBvOiBcIj5cIiwgdjogMCB9IH0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMTY4XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY21laigpLCB7IC8vUkMgMjQxMDAxNjggOiBNSiBWUFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmVwX21qXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidmVwX21qPW1qXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWo6IHsgbzogXCI+XCIsIHY6IFwiIFwiIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyNDEwMDE3MFwiLCAvL1JDIDI0MTAwMTcwIDogTW5vxb5zdHbDrSBWUCBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmVwX21fc21sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiAkLmV4dGVuZChHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkZWZhdWx0VmFsdWU6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyNDEwMDE3MVwiLCAvL1JDIDI0MTAwMTcxIDogxIzDoXN0a2EgVlAgb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZlcF9jX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEFsbDogJC5leHRlbmQoR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGVmYXVsdFZhbHVlOiBudWxsIH0pXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMTY5XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHsgLy9SQyAyNDEwMDE2OSA6IFBvcGlzIFZQXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2ZXBfcG9waXNcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHBvdcW+w612YXQgR0Rva2xhZFNtbEZpbHRlckR0b05hbWVzIG3DrXN0byBHRG9rbGFkU21sRHRvTmFtZXM/XHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MjQxMDAxMTFcIik7IC8vUkMgMjQxMDAxMTEgOiBPc3RhdG7DrSDDumRhamVcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGJwYXJhbXMuZWtvX3JhZF9kZmtlbiA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkZpbmFuxI1uw60ga29udHJvbGFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53Zmxjc3R2RWtvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRmlsdGVyRHRvTmFtZXMuc3Rhdl9wZmssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxGaWx0ZXJEdG9OYW1lcy5zdGF2X3BmayArIFwiPXN0YXZfdnlyaXpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChlLCBjKSA9PiB7IHRoYXQuZmlsdGVyQW5vTmVDaGFuZ2UoU21sLkludGVyZmFjZS5HRG9rbGFkU21sRmlsdGVyRHRvTmFtZXMuc3Rhdl9wZmssIGUsIGMsIFwic3Rhdl92eXJpelwiKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkplUG9sTGljUlNQICYmIHRoaXMuZGJwYXJhbXMuZ2luX2Vwa19zY2h2YWwgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlckZvcm1EZWZcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiU2NodmFsb3ZhY8OtIHByb2Nlc1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LndmbGNzdHZFa28oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxGaWx0ZXJEdG9OYW1lcy5zdGF2X3JzcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbEZpbHRlckR0b05hbWVzLnN0YXZfcnNwK1wiPXN0YXZfdnlyaXpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChlLCBjKSA9PiB7IHRoYXQuZmlsdGVyQW5vTmVDaGFuZ2UoU21sLkludGVyZmFjZS5HRG9rbGFkU21sRmlsdGVyRHRvTmFtZXMuc3Rhdl9yc3AsIGUsIGMsIFwic3Rhdl92eXJpelwiKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKFNtbERldGFpbC5wcmVmYWJQcmlQenAoXCLDmsSNdG92YXQgbyBwb2Rtw61uxJtuw6ltIFovUFwiLCB1bmRlZmluZWQsIChlLCBjKSA9PiB7IHRoYXQuZmlsdGVyQW5vTmVDaGFuZ2UoXCJwcml6X3B6cFwiLCBlLCBjKTsgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxGaWx0ZXJEdG9OYW1lcy5wb3puYW1rYVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3codGhpcy5kYnBhcmFtcy5zbWxfbGJsX2RvazEpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHsgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuYWNfZG9rXzEgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJ7MH0gZGF0dW0gb2QtZG9cIi5mb3JtYXQodGhpcy5kYnBhcmFtcy5zbWxfbGJsX2RvazEpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbEZpbHRlckR0b05hbWVzLmRhdF9kb2tfMVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHRoaXMuZGJwYXJhbXMuc21sX2xibF9kb2syKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoRWtvLkZpbHRlcnMuZ2V0U3RyaW5nT3BlcmF0b3JzKCkpLCB7IG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b05hbWVzLmFjX2Rva18yIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiezB9IGRhdHVtIG9kLWRvXCIuZm9ybWF0KHRoaXMuZGJwYXJhbXMuc21sX2xibF9kb2syKSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxGaWx0ZXJEdG9OYW1lcy5kYXRfZG9rXzJcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogenDFr3NvYiB1a29uxI1lbsOtIG5lbXVzw60gYsO9dCB2aWTEm3QgdsW+ZHkgKHZpeiBkZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWnDFr3NvYiB1a29uxI1lbsOtXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc21sc3p1aygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRmlsdGVyRHRvTmFtZXMuaXhzX3p1ayxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfenVrPWl4c196dWtcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2xpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2hhbmdlOiAoZSwgYykgPT4geyB0aGF0LmZpbHRlckFub05lQ2hhbmdlKFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbEZpbHRlckR0b05hbWVzLml4c196dWssIGUsIGMpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRhdHVtIHVrb27EjWVuw60gb2QtZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxGaWx0ZXJEdG9OYW1lcy5kYXRfdWtvXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHNqZWRub3RpdCBwb8WZYWTDrSBob2Rub3QgYW5vL25lIHZlIGZpbHRyZWNoLCBwxZnDrXBhZG7EmyBpIHZlbGvDoS9tYWzDoSBww61zbWVuYSBuYSB6YcSNw6F0a3Ugc2xvdmFcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJNb8W+bm9zdCBvcGNlXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc21sY3BvcCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRmlsdGVyRHRvTmFtZXMucHJpel9vcGNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInByaXpfb3BjZT1wcml6X29wY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZSwgYykgPT4geyB0aGF0LmZpbHRlckFub05lQ2hhbmdlKFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbEZpbHRlckR0b05hbWVzLnByaXpfb3BjZSwgZSwgYyk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiB6YXTDrW0gbmVuw60gb2JzbG91xb5lbm8gbmEgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7IHR5cGU6IFwiZGF0ZVwiLCBsYWJlbDogXCJEYXR1bSBvZGVzbMOhbsOtIG9kLWRvXCIsIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbEZpbHRlckR0b05hbWVzLmRhdF9vZGVzIH0pKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7IHR5cGU6IFwiZGF0ZVwiLCBsYWJlbDogXCJEYXR1bSByb3pob2Ruw6lobyB6dmXFmWVqbsSbbsOtIG9kLWRvXCIsIG5hbWU6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbEZpbHRlckR0b05hbWVzLmRhdF96dmUgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkRhbMWhw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLbMOtxI1vdsOhIHNsb3ZhXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2ZsS2xpY1Nsb3ZhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIndmbF9rbF9zbG92b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIndmbF9rbF9zbG92bz1rbF9zbG92b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0QnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQnV0dG9uczogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlDFmcOtcGFkXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3IgcMWZw61wYWR1XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvTmFtZXMuaXhwX3NtbF9wcmlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJBZ2VuZG92w6kgxI3DrXNsbyBwxZnDrXBhZHUgb2QtZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaV9hY19zbWxcIlxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9waXMgcMWZw61wYWR1XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaV9wb3Bpc1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAvLyBmaWx0cnkgbmEgdmxhc3Rub3N0aVxyXG4gICAgICAgICAgICBsZXQgc3hzVHlwOiB7IHN4czogc3RyaW5nIHwgbnVsbCwgdHlwX29iajogbnVtYmVyIH1bXSA9IFt7XHJcbiAgICAgICAgICAgICAgICBzeHM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB0eXBfb2JqOiBTbWwuR2xvYmFscy5FbnVtcy5UeXBPYmouU21sb3V2YVxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICAgICAgdGhpcy5JeHNUeXBEb2suZm9yRWFjaChpdGVtID0+IHN4c1R5cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHN4czogaXRlbSxcclxuICAgICAgICAgICAgICAgIHR5cF9vYmo6IFNtbC5HbG9iYWxzLkVudW1zLlR5cE9iai5UeXBEb2t1bWVudHVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyRm9ybVZsYXN0bm9zdCA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlZsYXN0bm9zdGlcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzoganNvdSBwYXJhbWV0cnkgcHJlZmFixa8gc3Byw6F2bsSbP1xyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAxMTJcIikuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5GaWVsZC5HR2luVmxhc3Rub3N0aUV4dFByb3BzRmlsdGVyRmllbGQoIC8vUkMgMjQxMDAxMTIgOiBSb3rFoWnFmXVqw61jw60gdmxhc3Rub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2bGFzdG5vc3RpX3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXN1TG9nb3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJwcF9peHNfdHlwOiB0aGlzLkl4c1R5cERvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX29iajogW1NtbC5HbG9iYWxzLkVudW1zLlR5cE9iai5TbWxvdXZhXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdF9zeHM6IHN4c1R5cFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICAvLyBwb3Bpc27DqSB2bGFzdG5vc3RpIHNlIG5lem9icmF6dWrDrVxyXG4gICAgICAgICAgICAvLy5hZGRSb3coXCJQb3Bpc27DqSB2bGFzdG5vc3RpXCIpLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuRmllbGQuR0dpblZsYXN0bm9zdGlGaWx0ZXJGaWVsZChcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJ2bGFzdG5vc3RpX3NcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGVzdUxvZ292YW5pOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgSXhwOiBcIlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmlcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLykpO1xyXG4gICAgICAgICAgICAvLyBmaWx0cnkgbmEgZG9rdW1lbnR5XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJGb3JtRG9rdW1lbnQgPSBHb3JkaWMuU3NsLldlYkNsaWVudC5HRG9rdW1lbnRJc2wuQWRkRG9rdW1lbnRGaWx0ZXJGaWVsZHNJbW1lZGlhdGUoe1xyXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgIHBhcmFtczogdGhpcy5Eb2t1bWVudFBhcmFtcyEsXHJcbiAgICAgICAgICAgICAgICBmb3JtOiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJEb2t1bWVudFwiIH0pLmFkZFNlY3Rpb24oKSxcclxuICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlczogZG9rdW1lbnRQYXJhbXMsXHJcbiAgICAgICAgICAgICAgICBmaWVsZHM6IFNtbEdyaWQucHJlc2V0RG9rdW1lbnRGaWVsZHMsXHJcbiAgICAgICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlTGV2ZWxzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFbFoWVjaG55IG5hcG9qZW7DqSBmaWx0cnkgYnVkb3UgbcOtdCB2IG7DoXp2dSBwcmVmaXggXCJkb2t1bWVudFwiICh6ZGUgdGVkeSBmaWx0cmHEjW7DrSBlbnVtIGJ1ZGUgb2JzYWhvdmF0IGhvZG5vdHkgZG9rdW1lbnRfaXhwLCBkb2t1bWVudF9peHNfZnVuX2FrdCBhIGRva3VtZW50X25hemV2KS4gVMOtbSBqZSBtb8W+bsOpIG9kbGnFoWl0IGZpbHRyeSwga3RlcsOpIHNwcmF2dWppIHPDoW0gamFrbyBhdXRvciBlbnRpdHkgYSB0eSwga3RlcsOpIHNpIMWZZcWhw60gZG9rdW1lbnQgc8OhbS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzY29wZTogXCJkb2t1bWVudFwiIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmllbGRzT3B0aW9uczoge31cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW2ZpbHRlckZvcm1EZWYsIGZpbHRlckZvcm1WbGFzdG5vc3QsIGZpbHRlckZvcm1Eb2t1bWVudF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNsdWhhIHptxJtueSBob2Rub3R5IHUgZmlsdHJ1IHMgamVkbm91IGhvZG5vdG91IChtdWx0aSBwb2xlIHNlIGNob3bDoSBqYWtvIHNpbmdsZSBhIGplIG1vxb5uw6kgbXnFocOtIG9kdnlicmF0IGhvZG5vdHUpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgcHJ2ZWtcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gZXYgZXYgeiB1ZMOhbG9zdGkgY2hhbmdlXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IGNoYW5nZU9iaiBjaGFuZ2VPYmogeiB1ZMOhbG9zdGkgY2hhbmdlXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lXSBuw6F6ZXYgcG9sb8W+a3kgdiBEVE8gKGptZW51amUtbGkgc2UgamluYWsgbmXFviBuYW1lKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyQW5vTmVDaGFuZ2UobmFtZTogc3RyaW5nLCBldjogYW55LCBjaGFuZ2VPYmo6IGFueSwgcmVhZGVyTmFtZT86c3RyaW5nKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlT2JqPy52YWx1ZT8ubGVuZ3RoICE9IG51bGwgJiYgY2hhbmdlT2JqPy52YWx1ZT8ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8genZvbGVuw6EgbcWvxb5lIGLDvXQgcG91emUgamVkbmEgaG9kbm90YSAoamUgdG8gc2ltdWxhY2UgbmUtbXVsdGkgcmXFvmltdSwga3RlcsOhIGFsZSB1bW/FvsWIb3Z1IG15xaHDrSBvZHZ5YnJhdCB2xaFlY2hueSBob2Rub3R5KVxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1NpbmdsZVZhbCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlT2JqPy52YWx1ZS5mb3JFYWNoKCh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZbcmVhZGVyTmFtZSA/PyBuYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzW1wiY3VycmZpbHRlcl9cIiArIG5hbWVdID8/IFtdKS5mb3JFYWNoKChuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobltyZWFkZXJOYW1lID8/IG5hbWVdICE9IG51bGwgJiYgbltyZWFkZXJOYW1lID8/IG5hbWVdICE9PSB2W3JlYWRlck5hbWUgPz8gbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTaW5nbGVWYWxbcmVhZGVyTmFtZSA/PyBuYW1lXSA9IHZbcmVhZGVyTmFtZSA/PyBuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3U2luZ2xlVmFsW3JlYWRlck5hbWUgPz8gbmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGV2LnRhcmdldCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3U2luZ2xlVmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzW1wiY3VycmZpbHRlcl9cIiArIG5hbWVdID0gJChldi50YXJnZXQpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBNZW51XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlem5hbSBha2PDrSBwcm8gbWVudSAoaGFtYnVyZ2VyIG5lYm8ga29udGV4dG92w6kgbWVudSBncmlkdSlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbnRleHRNZW51IGZvcm3DoXQgcHJvIGtvbnRleHRvdsOpIG1lbnUgZ3JpZHUgKHRydWUgKGRlZmF1bHQpID0gYW5vLCBmYWxzZSA9IG5lKVxyXG4gICAgICAgICAqIEBwYXJhbSB7SUdHcmlkQ2VsbENvbnRleHQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz59IFtjZWxsQ29udGV4dF0ga29udGV4dCB6IGdyaWR1IChwb3V6ZSBwcm8gY29udGV4dE1lbnUgPSB0cnVlKSAoZGVmYXVsdCA9IHVuZGVmaW5lZClcclxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBzZXpuYW0gYWtjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldE1lbnVBY3Rpb25zKGNvbnRleHRNZW51OiBib29sZWFuID0gZmFsc2UsIGNlbGxDb250ZXh0PzogSUdHcmlkQ2VsbENvbnRleHQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4pOiBhbnkge1xyXG4gICAgICAgICAgICAvLyhzdHJpbmcgfCB1bmRlZmluZWQpW10gfCAoc3RyaW5nIHwgKHN0cmluZyB8IHVuZGVmaW5lZClbXSB8IHsgYWN0aW9uOiBHQWN0aW9uIHwgdW5kZWZpbmVkOyBwcmltYXJ5OiBib29sZWFuOyBmYXZvcml0ZTogYm9vbGVhbiB9IHwgeyBhY3Rpb246IEdBY3Rpb24gfCB1bmRlZmluZWQ7IGZhdm9yaXRlOiBib29sZWFuOyBhbGlnbjogc3RyaW5nIH0pW11cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0TWVudVxyXG4gICAgICAgICAgICAgICAgPyBbXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQb2RhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0RGV0YWlsRG9aYWxvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQb2xvemt5RlBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFBvbG96a3lWUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0SW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0WmFwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RTY2h2YWxlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFNjaHZhbGVuaVBvbG96ZWtGUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0WnJ1c2VuaVNjaHZhbGVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UG9kZXBzYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RacnVzZW5pUG9kZXBzYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RVa29uY2VuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDIwLjAxLjIwMjYgLSBwbyBkb2hvZMSbIG5hIHBvcmFkxJsgenJ1xaFlbsOtIHVrb27EjWVuw60gbmVidWRlbWUgcG9kcG9yb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgIC8vXCJhY3RacnVzZW5pVWtvbmNlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0WnJ1c2VuaVN0b3JuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UmV6ZXJ2YWNlSWlzc3BcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByZWRhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByZXZ6ZXRpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQcmlkZWxlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByZWV2aWRlbmNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RGaW5hbmNuaUtvbnRyb2xhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RLb250cm9sYU1ldGFkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFV2b2xuZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RabWVuYVVkYWp1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLypbXCJHZW5lcm92w6Fuw61cIiwgKi9cImFjdEdlbmVyb3ZhbmlQb3VrYXp1XCIsIFwiYWN0R2VuZXJvdmFuaVBvaGxlZGF2a3lcIi8qXSovLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UHJpZGF0RG9Qb3Jvdm5hbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdE9kZXNsYXRcIlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQb2RhbmkqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3REZXRhaWwqIVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0RGV0YWlsRG9aYWxvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQb2xvemt5RlBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFBvbG96a3lWUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0SW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0WmFwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RTY2h2YWxlbmkqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RTY2h2YWxlbmlQb2xvemVrRlBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNlbmlTY2h2YWxlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFBvZGVwc2FuaSpcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNlbmlQb2RlcHNhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFVrb25jZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMjAuMDEuMjAyNiAtIHBvIGRvaG9kxJsgbmEgcG9yYWTEmyB6cnXFoWVuw60gdWtvbsSNZW7DrSBuZWJ1ZGVtZSBwb2Rwb3JvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgLy9cImFjdFpydXNlbmlVa29uY2VuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0U3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RacnVzZW5pU3Rvcm5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RSZXplcnZhY2VJaXNzcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UHJlZGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UHJldnpldGlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByaWRlbGVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UHJlZXZpZGVuY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdEZpbmFuY25pS29udHJvbGFcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdEtvbnRyb2xhTWV0YWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0VXZvbG5lbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFptZW5hVWRhanVcIixcclxuICAgICAgICAgICAgICAgICAgICBbXCJHZW5lcm92w6Fuw61cIiwgXCJhY3RHZW5lcm92YW5pUG91a2F6dVwiLCBcImFjdEdlbmVyb3ZhbmlQb2hsZWRhdmt5XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UHJpZGF0RG9Qb3Jvdm5hbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFRpc2sqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RPZGVzbGF0XCJcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFRpc2t5XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZMOhbsOtIHBhcmFtZXRyxa8gdGlza3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0lHUHJpbnRBY3Rpb25SZXBvcnRTdGFydGluZ30gcmVwIHBhcmFtZXRyeSB0aXNrdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyByZXBvcnRTdGFydGluZyhyZXA6IElHUHJpbnRBY3Rpb25SZXBvcnRTdGFydGluZyk6IEpRdWVyeVByb21pc2U8YW55PiB8IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogbmEgdnN0dXB1IG5lbsOtIHR5cF9hbGdcclxuXHJcbiAgICAgICAgICAgIC8vIHTFmcOtZMSbbsOtXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGTDoSBzZSB2xa9iZWMgbsSbamFrIHogZ2dyaWR1L3ZpZXcgemppc3RpdD9cclxuICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMiA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vIHRpdHVsZWsgLSBwb2RsZSByZcW+aW11IGtuaWh5IGEgdHlwdSBzZXpuYW11XHJcbiAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDYgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBTZXpuYW11RG9rbGFkdSA9PT0gU21sLkdsb2JhbHMuRW51bXMuVHlwU2V6bmFtdURva2xhZHUuT2JqZWRuYXZrYSB8fCB0aGlzLlR5cFNlem5hbXVEb2tsYWR1ID09PSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5PYmplZG5hdmthRG9kYXZhdGVsc2thIHx8IHRoaXMuVHlwU2V6bmFtdURva2xhZHUgPT09IFNtbC5HbG9iYWxzLkVudW1zLlR5cFNlem5hbXVEb2tsYWR1Lk9iamVkbmF2a2FPZGJlcmF0ZWxza2EgfHwgdGhpcy5UeXBTZXpuYW11RG9rbGFkdSA9PT0gU21sLkdsb2JhbHMuRW51bXMuVHlwU2V6bmFtdURva2xhZHUuT2JqZWRuYXZrYUJlelJvemxpc2VuaSB8fCB0aGlzLlR5cFNlem5hbXVEb2tsYWR1ID09PSBTbWwuR2xvYmFscy5FbnVtcy5UeXBTZXpuYW11RG9rbGFkdS5PYmplZG5hdmthQmV6RlApIHtcclxuICAgICAgICAgICAgICAgIGlmIChFa28uVXRpbHMuZ2V0RWtvQm9va1ZhcmlhbnQodGhpcykgPT09IEVrby5JbnRlcmZhY2UuR0Vrb0Jvb2tWYXJpYW50Lk9uZSkgcmVwLnBhcmFtcy5YMDAwNiA9IFwiVsO9YsSbciBvYmplZG7DoXZlayB6IGtuaWh5IFwiICsgdGhpcy5la29Cb29rLm5hemV2O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoRWtvLlV0aWxzLmdldEVrb0Jvb2tWYXJpYW50KHRoaXMpID09PSBFa28uSW50ZXJmYWNlLkdFa29Cb29rVmFyaWFudC5ZZWFyKSByZXAucGFyYW1zLlgwMDA2ID0gXCJWw71ixJtyIG9iamVkbsOhdmVrIHoga25paCBha3R1w6FsbsOtaG8gcm9rdVwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSByZXAucGFyYW1zLlgwMDA2ID0gXCJWw71ixJtyIG9iamVkbsOhdmVrIHplIHbFoWVjaCBrbmloXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoRWtvLlV0aWxzLmdldEVrb0Jvb2tWYXJpYW50KHRoaXMpID09PSBFa28uSW50ZXJmYWNlLkdFa29Cb29rVmFyaWFudC5PbmUpIHJlcC5wYXJhbXMuWDAwMDYgPSBcIlbDvWLEm3Igc21sdXYgeiBrbmloeSBcIiArIHRoaXMuZWtvQm9vay5uYXpldjtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKEVrby5VdGlscy5nZXRFa29Cb29rVmFyaWFudCh0aGlzKSA9PT0gRWtvLkludGVyZmFjZS5HRWtvQm9va1ZhcmlhbnQuWWVhcikgcmVwLnBhcmFtcy5YMDAwNiA9IFwiVsO9YsSbciBzbWx1diB6IGtuaWggYWt0dcOhbG7DrWhvIHJva3VcIjtcclxuICAgICAgICAgICAgICAgIGVsc2UgcmVwLnBhcmFtcy5YMDAwNiA9IFwiVsO9YsSbciBzbWx1diB6ZSB2xaFlY2gga25paFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG7DoXpldiBtYXNreSBhIGZpbHRyeVxyXG4gICAgICAgICAgICByZXAucGFyYW1zLlgwMDA3ID0gXCJcIjtcclxuICAgICAgICAgICAgLy8gVE9ETzogcG91xb7DrXQgbWV0b2R1IFdpZGdldEV4aXN0cyBpIGppbmRlICh0xZllYmEgcMWZaSBvdsSbxZllbsOtIGV4aXN0ZW5jZSBnZ3JpZHUpP1xyXG4gICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmaWx0ZXJwYW5lbFwiLCB0aGlzLiRmaWx0ZXJGb3JtKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSBmaWx0cnkgKCsgZmlsdHJ5IHBybyBrbmloeSkgcHJvIHDFmWVkw6Fuw60gZG8gQyMgbWV0b2R5XHJcbiAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0gdGhpcy4kZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWtvQm9va0ZpbHRlcj8uaXhwX2RlbikgJC5leHRlbmQocmVwLmN1c3RvbUR0bywgeyBpeHBfZGVuOiB0aGlzLmVrb0Jvb2tGaWx0ZXIuaXhwX2RlbiB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVrb0Jvb2tGaWx0ZXI/LnJvaykgJC5leHRlbmQocmVwLmN1c3RvbUR0bywgeyByb2tfZGVuOiB0aGlzLmVrb0Jvb2tGaWx0ZXIucm9rIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gbsOhemV2IGZpbHRydVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGZpbHRlckZvcm0uZ2ZpbHRlcnBhbmVsKFwiZ2V0RmlsdGVyQ3VycmVudFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwNyA9IHJldFZhbD8uZ2ZpbHRlcnBhbmVsX25hbWUgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBvc3RhdG7DrSBzZSBuYXN0YXZ1amUgYcW+IHYgQyNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=