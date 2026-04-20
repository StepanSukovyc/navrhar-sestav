"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Fuc;
    (function (Fuc) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Seznam případů
             *
             * @author Martin Boček
             * @since 480.1.0.12
             */
            let GSeznamPripadu = class GSeznamPripadu extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    // akce seznamu
                    this.actions.addRange({
                        // TODO: texty do resource
                        actDetail: Gordic.Eko.Action.actionDetail({
                            run: function () { that.detail(); }
                        }),
                        actStorno: Gordic.Eko.Action.actionStornovat({
                            run: function () { that.storno(true); }
                        }),
                        actZruseniStorna: Gordic.Eko.Action.actionZrusitStorno({
                            run: function () { that.storno(false); }
                        }),
                        actUzavreni: Gordic.Eko.Action.actionUzavrit({
                            run: function () { that.uzavreni(true); }
                        }),
                        actZruseniUzavreni: Gordic.Eko.Action.actionZrusitUzavreni({
                            run: function () { that.uzavreni(false); }
                        }),
                        actPredani: Gordic.Eko.Action.actionPredat({
                            run: function () { that.predani(); }
                        }),
                        // TODO: udělat na to akci do Eko.WebClient
                        actPridatDoPorovnani: Gordic.Eko.Action.actionPridatDoPorovnani({
                            run: function () { WebClient.FucGrid.Comparator.add(that); }
                        }),
                        // TODO: nejde zrušit name, ať to není duplicitní?
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tema: "fuc_ptm_upr",
                            serverParameterMethod: "Gordic.Fuc.WebClient.GSeznamPripadu:PrintParameters",
                            reportStarting: function (rep) { return that.reportStarting(rep); }
                        })
                    });
                    // menubar
                    this.menuBar(this.actions.createBar(this.getMenuActions()));
                    // filtry
                    this.$filterForm = $.newDiv().appendTo(this.element)
                        .gfilterpanel(Gordic.Eko.Filters.getFilterParams(that.getFilters(), 
                    // TODO: doplnit nějaké oblíbené filtry
                    ["XXXXXXXXX"], "fuc_ptm_upr", { gfilterpanel_name: "jres:24100470", gfilterpanel_is_default: true, upo_akt_rok: true, s_upr_def: 2 }, //RC 24100470 : *s pohyby aktuálního roku
                    undefined, undefined, true, this));
                    // sloupce
                    let gridFormat = WebClient.FucGrid.Pripad.createGridFormat(that);
                    // view
                    this.view = new Gordic.Isl.View(that.isl.FinPripad.list(rq => rq), {
                        filterPanel: that.$filterForm,
                        key: that.PrimaryKey,
                        startEmpty: true
                    });
                    // grid
                    $.newDiv("SeznamFuc")
                        .css("height", "100%")
                        .appendTo(that.element)
                        .ggrid(WebClient.FucGrid.Pripad.getGridOptions(that, gridFormat, that.actions.actDetail, function (ev, obj) {
                        // aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                        if (that.previewController) {
                            if (obj != null && obj.cellInfo != null && obj.cellInfo.data != null) {
                                // TODO: pokud by bylo potřeba řešit nastavení okna po přesunu po gridu, tak to odkomentovat, ale záznamová práva se aktuálně neřeší
                                //that.enable();
                                that.previewController.enable(true);
                                that.previewController.show(obj.cellInfo.data);
                            }
                            else {
                                // TODO: může tohle vůbec nastat?
                                that.previewController.enable(false);
                            }
                        }
                    }, (cellContext) => WebClient.FucGrid.getContextMenuParams(cellContext, (cellContext) => that.actions.createBar(that.getMenuActions(true, cellContext))), { data: that.view }))
                        .ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        // dlouhý seznam
                        longListAllowed: true,
                        longListCountMethod: (rq) => that.isl.FinPripad.listCount(rq).get(),
                        longListModifyRqMethod: (rq) => WebClient.FucGrid.modifyListRequest(that, rq)
                    })
                        .ggridrowscalc({
                        filterColumns: {
                            mode: "include",
                            columns: Gordic.Eko.Grid.getColumnsForCalc(gridFormat)
                        }
                    })
                        .gautofit();
                    // obsluha změny v gridu
                    this.view.on("change", function (ev, ctx) {
                        that.enable();
                    });
                    let focusFunc = function () {
                        that.element.find(".SeznamFuc.ggrid").ggrid("focus");
                        that.view.off("change.focus", focusFunc);
                    };
                    this.view.on("change.focus", focusFunc);
                    // náhled v pravém bočním panelu
                    this.element.gsidebar("option", { right: { width: 200, visible: false, leafsAutoHide: false } });
                    let previewPanelsDefinition = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                linkProvider: function (loadParams) { return Gordic.WebApp.Utility.createCommandUrl(null, "OpenDetail", { ixp: loadParams.ixp_upr }, { ticketType: Gordic.Enums.TicketType.WithLoginAndContext }); },
                                viewId: "fuc:Pripad"
                            }),
                            Gordic.Previews.getFilePreviewTab({
                                ixpProvider: function (loadParams) { return loadParams.ixp_upr; }
                            })
                        ]
                    };
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, previewPanelsDefinition);
                    // porovnání
                    WebClient.FucGrid.Comparator.create(that);
                }
                //#region Detail
                /**
                 * Zobrazení detailu případu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detail() {
                    // aktuální vybraná položka
                    const aktRadek = Gordic.Eko.Grid.currentRow(this.element.find(".SeznamFuc.ggrid"));
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        // otevření detailu aktuální vybrané položky
                        return this.openDetail(this, aktRadek);
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Zobrazení detailu případu
                 *
                 * @param {GContent} content content
                 * @param {Gordic.Fuc.Interface.GPripadDto} row aktuální řádek
                 * @param {FucGrid.openDetailWizardParams} [wizard] parametry průvodce (v případě volání detailu z průvodce)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                openDetail(content, row, wizard) {
                    let that = this;
                    // zásobník změněných záznamů
                    let changedRows = [];
                    // otevření detailu
                    let $detailWindow = content.navigate(["Gordic.Fuc.WebClient.GDetailPripadu", { gridRemoteControl: new Gordic.Components.GridRC(wizard?.grid ?? that.element.find(".SeznamFuc.ggrid")) }], {
                        ID: 'DetailPripadu#',
                        IxpUpr: row?.ixp_upr
                    });
                    // obsluha aktivní operace na detailu
                    $.content($detailWindow).on(WebClient.FucDetail.triggerChange, (retVal) => {
                        if (retVal?.data?.ixp_upr) {
                            // přidání do seznamu záznamů k občerstvení
                            if (changedRows.indexOf(retVal.data.ixp_upr) < 0)
                                changedRows.push(retVal.data.ixp_upr);
                        }
                    });
                    // obsluha ukončení okna
                    $detailWindow.on("closed", (retVal) => {
                        // nastavení fokusu (jen pokud není průvodce)
                        if (!wizard)
                            that.element.find(".SeznamFuc.ggrid").ggrid("focus");
                        // aktualizace změněných záznamů (v hlavním seznamu i případně v průvodci)
                        if (changedRows?.length > 0) {
                            // nastavení aktivní operace
                            if (wizard && wizard.setActiveOperation != undefined && typeof (wizard.setActiveOperation) === "function") {
                                wizard.setActiveOperation();
                            }
                            // aktualizace základního gridu
                            that.view.requestData({ filters: { ixp_upr: changedRows }, onlyPKWithoutFilters: true }, { updateMode: "update" })
                                .done(function () {
                                // nastavení aktuálního řádku
                                if (retVal?.returnValue?.ixp_upr) {
                                    that.element.find(".SeznamFuc.ggrid").ggrid("activeRow", { ixp_upr: retVal.returnValue.ixp_upr });
                                }
                                // v případě průvodce i aktualizace gridu v průvodci
                                if (wizard) {
                                    WebClient.FucWizard.reloadRows((rq) => { return that.isl.FinPripad.list(rq); }, { ixp_upr: changedRows }, wizard.grid)
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
                 * Storno / zrušení storna vybraných případů
                 *
                 * @param {boolean} stornovat stornovat (true) nebo zrušit storno (false)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                storno(stornovat) {
                    let that = this;
                    ;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "StornoPripadu#",
                        texts: {
                            title: stornovat
                                ? "jres:24100252" //RC 24100252 : Storno
                                : "jres:24100253", //RC 24100253 : Zrušení storna
                            description: stornovat
                                ? "Akce stornuje vybrané (zaškrtnuté) případy. Po jejím provedení budou tyto případy ve stavu 'stornován'"
                                : "Akce zruší storno vybraných (zaškrtnutých) případů. Po jejím provedení budou tyto případy ve stavu 'otevřen'",
                            formTabTitle: stornovat
                                ? "jres:24100302" //RC 24100302 : Parametry storna
                                : "jres:24100303", //RC 24100303 : Parametry zrušení storna
                            operationAction: stornovat ? that.actions.actStorno.caption : that.actions.actZruseniStorna.caption,
                        },
                        parameters: {
                            form: new Gordic.Forms.Form({ name: "wizParams" }).addSection().addRow("jres:24100294").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()], smartNavNextElement: function (cur, next) { return $.content(this)?.element.find("button[data-param-id='checkAct']")[0]; } }), //RC 24100294 : Důvod
                            model: { duvod: null },
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    stornovat: stornovat,
                                    duvod: (model != null && model.duvod != null ? model.duvod : "jres:24100301") //RC 24100301 : nezadán
                                };
                            },
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.FinPripad.zkontrolujPredStornem(dto); },
                            islOperation: (dto) => { return that.isl.FinPripad.hromadneStornuj(dto); },
                        },
                        end: {
                            callingAction: stornovat ? that.actions.actStorno : that.actions.actZruseniStorna
                        }
                    });
                }
                /**
                 * Uzavření / zrušení uzavření vybraných případů
                 *
                 * @param {boolean} uzavrit uzavřít (true) nebo zrušit uzavření (false)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                uzavreni(uzavrit) {
                    let that = this;
                    ;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "UzavreniPripadu#",
                        texts: {
                            title: uzavrit
                                ? "Uzavření"
                                : "Zrušení uzavření",
                            description: uzavrit
                                ? "Akce uzavře vybrané (zaškrtnuté) případy. Po jejím provedení budou tyto případy ve stavu 'uzavřen'"
                                : "Akce zruší uzavření vybraných (zaškrtnutých) případů. Po jejím provedení budou tyto případy ve stavu 'připraveno k uzavření', resp. 'otevřen'",
                            formTabTitle: uzavrit
                                ? "Parametry uzavření"
                                : "Parametry zrušení uzavření",
                            operationAction: uzavrit ? that.actions.actUzavreni.caption : that.actions.actZruseniUzavreni.caption,
                        },
                        parameters: {
                            form: uzavrit
                                ? undefined
                                : new Gordic.Forms.Form({ name: "wizParams" }).addSection().addRow("Případy agend FUC a INT").addField("gcheck", { name: "otevrit_fuc_int", label: "otevřít do stavu 'otevřen' místo do stavu 'připraven k uzavření'" }),
                            model: { otevrit_fuc_int: null },
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    uzavrit: uzavrit,
                                    otevrit_fuc_int: uzavrit ? false : (model != null ? model.otevrit_fuc_int : false)
                                };
                            },
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.FinPripad.zkontrolujPredUzavrenim(dto); },
                            islOperation: (dto) => { return that.isl.FinPripad.hromadneUzavri(dto); },
                        },
                        end: {
                            callingAction: uzavrit ? that.actions.actUzavreni : that.actions.actZruseniUzavreni
                        }
                    });
                }
                /**
                 * Předání vybraných případů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                predani() {
                    let that = this;
                    ;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "PredaniPripadu#",
                        texts: {
                            title: "jres:24100260", //RC 24100260 : Předání
                            description: "Akce předá vybrané (zaškrtnuté) případy na zadanou účtárnu a zpracovatele",
                            formTabTitle: "Parametry předání",
                            operationAction: that.actions.actPredani.caption,
                        },
                        parameters: {
                            form: 
                            //new Gordic.Forms.Form({ name: "wizParams" }).addSection().addRow("Případy agend FUC a INT").addField("gcheck", { name: "otevrit_fuc_int", label: "otevřít do stavu 'otevřen' místo do stavu 'připraven k uzavření'" }),
                            new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1 LMS-2-10-0" })
                                .addRow("Účtárna").addField("gselectbox", Gordic.Prefabs.Select.ekosuus(), {
                                name: "uus",
                                model: "uus=uus,ico=ico,ucs=ucs",
                                serverFilters: {
                                    ico: this.Ico,
                                    ucs: this.Ucs,
                                    uus: this.dbparams.fuc_rez_pro === Gordic.Fuc.Globals.Enums.RezimProvozu.Referent || this.dbparams.fuc_rez_pro === Gordic.Fuc.Globals.Enums.RezimProvozu.Uctarna ? (this.Uus === "HU" ? "HU" : [this.Uus, "HU"]) : void 0,
                                },
                                flag: Gordic.Prefabs.Field.Flags.required,
                                validators: [new Gordic.Validators.Required()],
                                dropdown: true
                            })
                                .addField("gcheck", {
                                name: "zmena_funkce",
                                label: "Změnit zpracovatele",
                                change: function (ev, changeObj) {
                                    let newValue;
                                    newValue = (changeObj.value === true);
                                    $(ev.target).closest(".gform").findFields("ixs_fun").gfield("option", "disabled", !newValue);
                                }
                            })
                                .addRow("Zpracovatel").addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                                name: "ixs_fun",
                                model: "ixs_fun=ixs_fun",
                                serverFilters: {
                                    DlePovolenychFazi: "GWAFUC05",
                                    EkoIco: that.Ico,
                                    EkoUcs: that.Ucs,
                                    EkoUus: new Gordic.Forms.Dependency("uus", "uus", true)
                                },
                                flag: Gordic.Prefabs.Field.Flags.required,
                                validators: [new Gordic.Validators.Required()],
                                dropdown: true
                            })
                                .addRow("jres:24100294").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()] }), //RC 24100294 : Důvod
                            model: { uus: that.Uus, ixs_fun: null, duvod: null, zmena_funkce: true, ico: that.Ico, ucs: that.Ucs },
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    predat: true,
                                    uus: model?.uus,
                                    ixs_fun_akt: model?.ixs_fun,
                                    duvod: (model != null && model.duvod != null ? model.duvod : "jres:24100301") //RC 24100301 : nezadán
                                };
                            },
                            withoutPreCheck: true,
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.FinPripad.zkontrolujPredPredanim(dto); },
                            islOperation: (dto) => { return that.isl.FinPripad.hromadnePredej(dto); },
                        },
                        end: {
                            callingAction: that.actions.actPredani
                        }
                    });
                }
                /**
                 * Průvodce nad seznamem případů <DTO operace, model parametrů>. nepracuje s fucduct
                 *
                 * @param {FucWizard.FucWizardParams<TOperationDto, TModel, Fuc.Interface.GPripadDto> | FucWizard.FucWizardParamsPart<TOperationDto, TModel, Fuc.Interface.GPripadDto>} params část parametrů průvodce
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                wizardTwoSteps(params) {
                    let that = this;
                    // TODO: dočasné řešení fragmentů - je ale je nutné předat do metody wizardGetData
                    //let gridFormat = Gordic.Fuc.WebClient.FucGrid.Pripad.createGridFormat(that, true);
                    //let fragments: string[] = FucWizard.getFragmentsFromGridFormat(gridFormat, true);
                    const gridFormat = WebClient.FucWizard.getCurrentGridFormat(that.element.find(".SeznamFuc.ggrid"));
                    const fragments = WebClient.FucWizard.getFragmentsFromGridFormat(gridFormat);
                    // volání obecného FUCového průvodce
                    return WebClient.FucWizard.wizardTwoSteps(this, $.extend(true, {
                        texts: {
                            formTabTitle: "jres:24100456", //RC 24100456 : Vybrané případy
                        },
                        grid: {
                            format: gridFormat,
                            keys: that.PrimaryKey,
                            profile: (that.element.find(".SeznamFuc.ggrid").ggrid("getCurrentProfile")),
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
                 * Vrátí seznam případů pro zobrazení v průvodcích pro hromadné operace
                 *
                 * @param {boolean} onlyChecked pouze zaškrtnuté řádky (true = ano, false = ne)
                 * @param {boolean} withResults doplnění výsledků hromadné operace (true = ano, false = ne)
                 * @param {Gordic.General.GIkc | Gordic.Fuc.Interface.GPripadDto[] | null} ikcOrData IKC nebo data (stačí PK)
                 * @param {string[] | undefined} fragments fragmenty
                 * @param {Gordic.Isl.GServiceGroupResponse<Gordic.Fuc.Interface.GpripadDto>} [response] výsledek hromadné operace
                 * @returns {JQueryPromise<Gordic.Fuc.Interface.GPripadDto[]>} seznam případů (s výsledky operace nebo bez podle parametru withResults)
                 */
                wizardGetData(onlyChecked, withResults, ikcOrData, fragments, response) {
                    let that = this;
                    // volání obecné metody pro načtení dat do průvodce
                    return WebClient.FucWizard.getData(that, onlyChecked, withResults, ikcOrData, {}, (rq) => { return that.isl.FinPripad.list(rq); }, undefined, //(data) => { return FucGrid.Pripad.modifyDto(data, false, withResults) },
                    response, that.PrimaryKey, fragments);
                }
                /**
                 * Občerství seznam a překontroluje data (oboje volitelně)
                 *
                 * @param {GContent} cnt content
                 * @param {boolean} reloadData mají se načíst aktuální data z databáze? (true = ano, false = ne)
                 * @param {Gordic.Fuc.Interface.GPripadDto[] | undefined} data data pro případ, že se nemají načítat z databáze (reloadData = false)
                 * @param {Gordic.General.GIkc | null} ikc IKC
                 * @param {string[] | undefined} fragments fragmenty
                 * @param {((dto: TOperationDto) => any) | undefined} checkAction delegát pro kontrolu dat před operací (pokud není, nevolá se kontrola, jen se načtou aktuální data)
                 * @param {(model: TModel | undefined, data: Gordic.Fuc.Interface.GPripadDto[], ikc: Gordic.General.GIkc | null) => TOperationDto} toOperationDto delegát pro vytvoření DTO operace
                 * @returns {JQueryPromise<Gordic.Fuc.Interface.GPripadDto[]>} seznam zápočtových listů (s výsledky operace nebo bez podle parametru withResults)
                 */
                wizardRefreshAndCheckData(cnt, reloadData, data, ikc, fragments, checkAction, toOperationDto, model) {
                    let that = this;
                    // volání obecné metody občerstvení seznamu a kontrolu dat
                    return WebClient.FucWizard.refreshAndCheckData(cnt, reloadData, data, ikc, (withResults, ikc) => { return that.wizardGetData(false, withResults, ikc, fragments); }, checkAction, toOperationDto, model);
                }
                //#endregion
                //#region Nastavení
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // TODO: pokud by bylo potřeba se řídit konkrétním řádkem, tak odkomentovat a použít
                    // aktuální případ
                    //const aktPripad = this.element.find(".SeznamFuc.ggrid").ggrid<Gordic.Fuc.Interface.GPripadDto>("activeRow");
                    const isEmpty = !(this.view.getCount("data") > 0);
                    // akce seznamu
                    const permEmptyGrid = WebClient.FucGrid.getEmptyGridPermission();
                    const acts = this.actions;
                    const perms = this.Permissions;
                    acts.actDetail.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeZobrazit);
                    acts.actStorno.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeStornovat);
                    acts.actZruseniStorna.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeZrusitStorno);
                    acts.actUzavreni.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeUzavrit);
                    acts.actZruseniUzavreni.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeZrusitUzavreni);
                    acts.actPredani.updatePermission(isEmpty ? permEmptyGrid : perms?.LzePredat);
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
                    let that = this;
                    // základní filtry na pohyby
                    let filterFormDef = new Gordic.Forms.Form({ tabLabel: "jres:24100092" }) //RC 24100092 : Kompletní filtr
                        .addSection("jres:24100352") //RC 24100352 : Základní údaje
                        .addRow("Identifikátor").addField("gstringbox", Gordic.Prefabs.String.ixs(false), {
                        name: "ixp_upr"
                    })
                        .addPrefab(Gordic.Eko.Filters.prefabAgEvCislo())
                        .addRow("Vlastník").addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        name: "ixs_fun_akt",
                        model: "ixs_fun_akt=ixs_fun",
                        dropdown: true
                    })
                        .addRow(Gordic.Consts.DbShortcuts.nks ?? "NKS").addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), {
                        name: "nks",
                        model: "nks=nks,ignore_ico_nks=ico" /*"nks=nks,ico=>ico"*/,
                        serverFilters: {
                            ico: this.Ico
                        },
                        dropdown: true
                    })
                        .addRow(Gordic.Consts.DbShortcuts.uus ?? "UUS").addField("gselectbox", Gordic.Prefabs.Select.ekosuus(), {
                        name: "uus",
                        model: "uus=uus,ignore_ico_uus=ico,ignore_ucs_uus=ucs" /*"uus=uus,ico=>ico,ucs=>ucs"*/ /*"uus=uus,ico_1=ico,ucs_1=ucs"*/,
                        serverFilters: {
                            ico: this.Ico,
                            ucs: this.Ucs
                        },
                        dropdown: true
                    })
                        .addRow("jres:24100324").addField("gselectbox", Gordic.Prefabs.Select.ginsesu(), {
                        name: "ixs_esu",
                        model: "ixs_esu=ixs_esu",
                        multi: true
                    })
                        .addPrefab(Gordic.Eko.Filters.prefabVsKsSs())
                        .addRow("Způsob úhrady").addField("gselectbox", Gordic.Prefabs.Select.ekocizp(), {
                        name: "zp",
                        model: "zp=zp",
                        multi: true,
                        dropdown: false
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "Datum evidence platby od-do",
                        name: "dat_evid"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "Datum vystavení platby od-do",
                        name: "dat_vyst"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "Datum plnění platby od-do",
                        name: "dat_zdan"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "Datum splatnosti platby od-do",
                        name: "dat_splat"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "Částka celkem od-do",
                        name: "c_mena",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addRow("Měna").addField("gselectbox", Gordic.Prefabs.Select.ekocmen(), {
                        name: "mena",
                        model: "mena=mena"
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "Částka celkem v Kč od-do",
                        name: "c_celk",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addRow("Popis").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "popis"
                    })
                        .addRow("Poznámka případu").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "poznamka"
                    })
                        .addRow("Poznámka dokladu").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "wfl_poznamka"
                    })
                        .addRow("jres:24100248").addField("gselectbox", Gordic.Prefabs.Select.wflKlicSlova(), {
                        name: "wfl_kls",
                        model: "wfl_kls=kl_slovo",
                        multi: true,
                        dropdown: true,
                        showSelectButton: true,
                        verticalButtons: false
                    })
                        .addSection("Stavy")
                        .addPrefab(WebClient.FucFilter.prefabSUprRadio("s_upr"))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "Částka případu od-do",
                        name: "c_upr",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addRow("Stav přípravy k úhradě").addField("gselectbox", Gordic.Prefabs.Select.fuccspr(), {
                        name: "s_prip",
                        model: "s_prip=s_prip",
                        multi: true,
                        list: true,
                        itemWidth: ""
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "Částka přípravená k úhradě od-do",
                        name: "c_prip",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addRow("Stav odeslání k úhradě").addField("gselectbox", Gordic.Prefabs.Select.fuccsod(), {
                        name: "s_ode",
                        model: "s_ode=s_ode",
                        multi: true,
                        list: true,
                        itemWidth: ""
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "Částka odeslaná k úhradě od-do",
                        name: "c_ode",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addRow("Stav párování").addField("gselectbox", Gordic.Prefabs.Select.fuccspa(), {
                        name: "s_par",
                        model: "s_par=s_par",
                        multi: true,
                        list: true,
                        itemWidth: ""
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "Částka spárovaná od-do",
                        name: "c_par",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addRow("Stav zaúčtování").addField("gselectbox", Gordic.Prefabs.Select.fuccsza(), {
                        name: "s_zau",
                        model: "s_zau=s_zau",
                        multi: true,
                        list: true,
                        itemWidth: ""
                    })
                        .addRow("Stav storna").addField("gselectbox", Gordic.Prefabs.Select.ekocsto(), {
                        name: "s_sto",
                        model: "s_sto=s_sto",
                        multi: true,
                        list: true,
                        itemWidth: "",
                        serverFilters: {
                            s_sto: [Gordic.Fuc.Globals.Enums.SSto.Nestornovano, Gordic.Fuc.Globals.Enums.SSto.Storno]
                        }
                    })
                        .addSection("Typy a kategorie")
                        // TODO: upravit řazení hodnot (podle čísel nebo podle abecedy?)
                        .addRow("Kategorie případu").addField("gselectbox", Gordic.Prefabs.Select.fuccupr(), {
                        name: "ktg_upr",
                        model: "ktg_upr=ktg_upr",
                        //dropdown: false,
                        multi: true,
                        list: true,
                        itemWidth: "",
                        change: (e, c) => { that.filterAnoNeChange("ktg_upr", e, c); }
                    })
                        // TODO: dořešit zatržítka u následujících tří polí jako jsou ve WinClientu
                        //.addRow("X Typy případů").addField("gstringbox", { name: "typ_upr" })
                        .addRow("Typ případu").addField("gselectbox", Gordic.Prefabs.Select.fucstup(), {
                        name: "typ_upr",
                        model: "typ_upr=typ_upr",
                        multi: true
                    })
                        .addRow("Kategorie typu dokladu").addField("gselectbox", Gordic.Prefabs.Select.ginckat(), {
                        name: "ktg_typ",
                        model: "ktg_typ=ktg_typ",
                        serverFilters: {
                            PouzeFUC: true
                        },
                        multi: true
                    })
                        .addRow("Typ dokladu").addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                        name: "ixs_typ",
                        model: "ixs_typ=ixs_typ",
                        multi: true,
                        serverFilters: {
                            PouzeFUC: true
                        }
                    })
                        //.addSection("jres:24100376") //RC 24100376 : Předkontace
                        // TODO: pro sloupce uea-te4
                        //.addRow("X Grid").addField("gstringbox", { name: "XXXXXXXXXXXXXXX" })
                        .addSection("Agenda")
                        .addRow("Typ agendy").addField("gselectbox", Gordic.Prefabs.Select.ginctag(), {
                        name: "typ_ag",
                        model: "typ_ag=typ_ag",
                        multi: true,
                        list: true,
                        itemWidth: "",
                        itemTooltipTemplate: "{typ_ag_txt}",
                        serverFilters: {
                            typ_ag: Gordic.Fuc.Globals.Enums.TypAgFuc.TypAgPovoleneFuc
                        },
                        change: function (ev, changeObj) {
                            // TODO: pokud to funguje, tak to zakomentované smazat
                            WebClient.FucFilter.filtryPripaduZmenaTypAg(/*this.parentContent!*/ $(ev.currentTarget).parent(), changeObj.value, "ixp_den");
                        }
                    })
                        .addRow("Kniha").addField("gselectbox", Gordic.Prefabs.Select.ekoaden(), {
                        name: "ixp_den",
                        model: "ixp_den=ixp_den",
                        multi: true
                    })
                        .addSection("Případy z externích systémů")
                        .addRow("jres:24100538").addField("gselectbox", Gordic.Prefabs.Select.intsdav(), {
                        name: "ixs_dav",
                        model: "ixs_dav=ixs_dav",
                        multi: false
                    })
                        .addRow("jres:24100539").addField("gselectbox", Gordic.Prefabs.Select.intsroz(), {
                        name: "ixp_exs",
                        model: "ixp_exs=ixp_exs",
                        multi: false
                    })
                        .addSection("jres:24100453") //RC 24100453 : Pohyby
                        .addRow("Datum účtování pohybu").addField("gradio", "w-12", {
                        name: "upo_akt_rok",
                        emptyValue: false,
                        //defaultValue: 1,
                        radios: [
                            { value: true, label: "jres:24100468" }, //RC 24100468 : pouze aktuální rok
                            { value: false, label: "jres:24100469" } //RC 24100469 : podle rozsahu od-do
                        ],
                        change: function (ev, changeObj) {
                            let newValue;
                            newValue = (changeObj.value == true);
                            if (newValue)
                                $(ev.currentTarget).findFields("upo_dat_uct").gfield("setValue", null);
                            $(ev.currentTarget).findFields("upo_dat_uct" + "Start", "upo_dat_uct" + "End").gfield("option", "disabled", newValue);
                        }
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "Datum účtování pohybu od-do",
                        name: "upo_dat_uct"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "jres:24100534", //RC 24100534 : Částka pohybu od-do
                        name: "upo_c_upo",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        // TODO: má to být kombinované pole pro *subřada nebo číslo (upo_subrada_duz, upo_ac_ixe)
                        //.addRow("X Číslo úč. dokladu").addField("gstringbox", { name: "XXXXXXXXXXXXXXX" })
                        .addRow("Popis pohybu").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "upo_popis_upo"
                    })
                        .addRow("Stav pohybu").addField("gselectbox", Gordic.Prefabs.Select.fuccsuo(), {
                        name: "upo_s_upo",
                        model: "upo_s_upo=s_upo",
                        multi: true,
                        list: true,
                        itemWidth: ""
                    })
                        // TODO: přidat pomocná tlačítka jako jsou u pohybů?
                        .addRow("Typ pohybu").addField("gselectbox", Gordic.Prefabs.Select.fucctup(), {
                        name: "upo_typ_upo",
                        model: "upo_typ_upo=typ_upo",
                        multi: true,
                        list: true,
                        itemWidth: ""
                    })
                        .addRow("Kategorie pohybu").addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                        name: "upo_ktg_upo",
                        model: "upo_ktg_upo=ktg_upo",
                        multi: true,
                        dropdown: false,
                        itemTemplate: WebClient.FucUtils.getFuccupoItemTemplate(this)
                    })
                        .addSection("Platby")
                        .addRow("VS platby").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "pla_vs"
                    })
                        .addRow("KS platby").addField("gstringbox", {
                        name: "pla_ks"
                    })
                        .addRow("SS platby").addField("gstringbox", {
                        name: "pla_ss"
                    })
                        // TODO: u účtů jsou zatím zdvojené hodntoy (kombinované a zvlášť) - nechat jen jedny?
                        .addRow("Vlastní účet platby").addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                        name: "pla_vl_ucet_komb",
                        model: "pla_bu_vl=bu_vl,pla_sk_vl=sk_vl,ignore_ico_bu=ico,ignore_ucs_bu=ucs,ignore_rok_bu=rok",
                        serverFilters: {
                            aktivita: [100],
                            ico: this.Ico,
                            ucs: this.Ucs,
                            rok: this.Rok
                        }
                    })
                        // TODO: formát tak, aby to vypadalo stejně jako u vlastního účtu (mezery u lomítka)
                        .addRow("Cizí účet platby").addField("gstringbox", {
                        name: "pla_ci_ucet_komb"
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "Datum splatnosti platby od-do",
                        name: "pla_dat_spl"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "date",
                        label: "Datum zaplacení platby od-do",
                        name: "pla_dat_zap"
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        type: "number",
                        label: "Částka platby od-do",
                        name: "pla_c",
                        customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null })
                    }))
                        .addRow("Stav úhrady").addField("gselectbox", Gordic.Prefabs.Select.buccuhr(), {
                        name: "pla_s_uhrp",
                        model: "pla_s_uhrp=s_uhrp",
                        multi: true
                    })
                        .addRow("Způsob úhrady").addField("gselectbox", Gordic.Prefabs.Select.ekocizp(), {
                        name: "pla_zp",
                        model: "pla_zp=zp",
                        multi: true,
                        dropdown: false
                    });
                    if (this.JeIissp)
                        filterFormDef
                            .addSection("jres:24100325") //RC 24100325 : IISSP
                            .addRow("jres:24100326").addField("gstringbox", {
                            name: "upo_id_hdr_ris"
                        })
                            .addRow("jres:24100327").addField("gnumberbox", {
                            name: "upo_radek_hdr",
                            defaultValue: null
                        });
                    // výsledné formuláře s filtry
                    return [filterFormDef];
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
                 * @param {IGGridCellContext<Gordic.Fuc.Interface.GPripadDto>} [cellContext] kontext z gridu (pouze pro contextMenu = true) (default = undefined)
                 * @returns {any} seznam akcí
                 */
                getMenuActions(contextMenu = false, cellContext) {
                    return contextMenu
                        ? [
                            "actDetail",
                            "actStorno",
                            "actZruseniStorna",
                            "actUzavreni",
                            "actZruseniUzavreni",
                            "actPredani",
                            "actPridatDoPorovnani",
                            "actTisk"
                        ]
                        : [
                            "actDetail*!",
                            "actStorno",
                            "actZruseniStorna",
                            "actUzavreni",
                            "actZruseniUzavreni",
                            "actPredani",
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
                    // aktuální filtry pro předání do C# metody
                    rep.customDto = this.$filterForm.gfilterpanel("getConfirmedData");
                    // parametry se nastavují až v C#
                }
            };
            GSeznamPripadu = __decorate([
                gcontent
            ], GSeznamPripadu);
            WebClient.GSeznamPripadu = GSeznamPripadu;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVByaXBhZHUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtUHJpcGFkdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBb2xDZjtBQXBsQ0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb2xDbkI7SUFwbENnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FvbEM3QjtRQXBsQ29CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DOzs7OztlQUtHO1lBRUgsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBZ0o7Z0JBcUNoTDs7bUJBRUc7Z0JBQ0ksY0FBYztvQkFFakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixlQUFlO29CQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQiwwQkFBMEI7d0JBQzFCLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7NEJBQ3RDLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQ3RDLENBQUM7d0JBQ0YsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzs0QkFDekMsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzFDLENBQUM7d0JBQ0YsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7NEJBQ25ELEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUMzQyxDQUFDO3dCQUNGLFdBQVcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1B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QUFULGFBQVMsS0FBVCxhQUFTLFFBb2xDN0I7SUFBRCxDQUFDLEVBcGxDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb2xDbkI7QUFBRCxDQUFDLEVBcGxDUyxNQUFNLEtBQU4sTUFBTSxRQW9sQ2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkZ1Yy5XZWJDbGllbnQge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlem5hbSBwxZnDrXBhZMWvXHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gQm/EjWVrXHJcbiAgICAgKiBAc2luY2UgNDgwLjEuMC4xMlxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtUHJpcGFkdSBleHRlbmRzIEdDb250ZW50QmFzZTxGdWNHcmlkLklHU3RhbmRhcmRGdWNHcmlkPEZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0bywgRnVjLkludGVyZmFjZS5HUHJpcGFkU2VydmljZVBlcm1pc3Npb24+LyogJiBHb3JkaWMuRWtvLlV0aWxzLklHTG9uZ0xpc3RMaW1pdCovPiB7XHJcblxyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHXDoWxuw60gScSMT1xyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJY286IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIFVDU1xyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBVY3M6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIFVVU1xyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBVdXM6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBqZSBzdMOhdG7DrSBwb2tsYWRuYT9cclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEplSWlzc3A6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSByb2tcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUm9rOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGF0YWLDoXpvdsOpIHBhcmFtZXRyeVxyXG4gICAgICAgICAqIEB0eXBlIHt7fX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGRicGFyYW1zOiB7XHJcbiAgICAgICAgICAgIC8vIEZVQyAtIFJlxb5pbSBwcm92b3p1XHJcbiAgICAgICAgICAgIGZ1Y19yZXpfcHJvOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuUmV6aW1Qcm92b3p1XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogdGV4dHkgZG8gcmVzb3VyY2VcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5kZXRhaWwoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RTdG9ybm86IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblN0b3Jub3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuc3Rvcm5vKHRydWUpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNlbmlTdG9ybmE6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpydXNpdFN0b3Jubyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuc3Rvcm5vKGZhbHNlKTsgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RVemF2cmVuaTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVXphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudXphdnJlbmkodHJ1ZSk7IH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WnJ1c2VuaVV6YXZyZW5pOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXRVemF2cmVuaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudXphdnJlbmkoZmFsc2UpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFByZWRhbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByZWRhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQucHJlZGFuaSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHVkxJtsYXQgbmEgdG8gYWtjaSBkbyBFa28uV2ViQ2xpZW50XHJcbiAgICAgICAgICAgICAgICBhY3RQcmlkYXREb1Bvcm92bmFuaTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUHJpZGF0RG9Qb3Jvdm5hbmkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyBGdWNHcmlkLkNvbXBhcmF0b3IuYWRkKHRoYXQpOyB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lamRlIHpydcWhaXQgbmFtZSwgYcWlIHRvIG5lbsOtIGR1cGxpY2l0bsOtP1xyXG4gICAgICAgICAgICAgICAgYWN0VGlzazogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVGlzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJmdWNfcHRtX3VwclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HU2V6bmFtUHJpcGFkdTpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkgeyByZXR1cm4gdGhhdC5yZXBvcnRTdGFydGluZyhyZXApOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1lbnViYXJcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIodGhpcy5nZXRNZW51QWN0aW9ucygpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBmaWx0cnlcclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyRm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbChcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkZpbHRlcnMuZ2V0RmlsdGVyUGFyYW1zPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWRGaWx0ZXI+KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdldEZpbHRlcnMoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBuxJtqYWvDqSBvYmzDrWJlbsOpIGZpbHRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJYWFhYWFhYWFhcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVjX3B0bV91cHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBnZmlsdGVycGFuZWxfbmFtZTogXCJqcmVzOjI0MTAwNDcwXCIsIGdmaWx0ZXJwYW5lbF9pc19kZWZhdWx0OiB0cnVlLCB1cG9fYWt0X3JvazogdHJ1ZSwgc191cHJfZGVmOiAyIH0gYXMgYW55LCAvL1JDIDI0MTAwNDcwIDogKnMgcG9oeWJ5IGFrdHXDoWxuw61obyByb2t1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBzbG91cGNlXHJcbiAgICAgICAgICAgIGxldCBncmlkRm9ybWF0ID0gRnVjR3JpZC5QcmlwYWQuY3JlYXRlR3JpZEZvcm1hdCh0aGF0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZpZXdcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvPihcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLkZpblByaXBhZC5saXN0KHJxID0+IHJxKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhhdC4kZmlsdGVyRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IHRoYXQuUHJpbWFyeUtleSxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdyaWRcclxuICAgICAgICAgICAgJC5uZXdEaXYoXCJTZXpuYW1GdWNcIilcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG8+KFxyXG4gICAgICAgICAgICAgICAgICAgIEZ1Y0dyaWQuUHJpcGFkLmdldEdyaWRPcHRpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2Ugc3RhdnUgb2tuYSBhIG7DoWhsZWR1IHBvZGxlIGFrdHXDoWxuxJsgdnlicmFuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnByZXZpZXdDb250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiAhPSBudWxsICYmIG9iai5jZWxsSW5mbyAhPSBudWxsICYmIG9iai5jZWxsSW5mby5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcG9rdWQgYnkgYnlsbyBwb3TFmWViYSDFmWXFoWl0IG5hc3RhdmVuw60gb2tuYSBwbyBwxZllc3VudSBwbyBncmlkdSwgdGFrIHRvIG9ka29tZW50b3ZhdCwgYWxlIHrDoXpuYW1vdsOhIHByw6F2YSBzZSBha3R1w6FsbsSbIG5lxZllxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3cob2JqLmNlbGxJbmZvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbcWvxb5lIHRvaGxlIHbFr2JlYyBuYXN0YXQ/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjZWxsQ29udGV4dCkgPT4gRnVjR3JpZC5nZXRDb250ZXh0TWVudVBhcmFtcyhjZWxsQ29udGV4dCwgKGNlbGxDb250ZXh0KSA9PiB0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKHRoYXQuZ2V0TWVudUFjdGlvbnModHJ1ZSwgY2VsbENvbnRleHQpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgZGF0YTogdGhhdC52aWV3IH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRla28oe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvdcSNdG92w70gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRsb3Vow70gc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0Q291bnRNZXRob2Q6IChycSkgPT4gdGhhdC5pc2wuRmluUHJpcGFkLmxpc3RDb3VudChycSkuZ2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RNb2RpZnlScU1ldGhvZDogKHJxKSA9PiBGdWNHcmlkLm1vZGlmeUxpc3RSZXF1ZXN0KHRoYXQsIHJxKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZHJvd3NjYWxjKHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJDb2x1bW5zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwiaW5jbHVkZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBFa28uR3JpZC5nZXRDb2x1bW5zRm9yQ2FsYyhncmlkRm9ybWF0KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9ic2x1aGEgem3Em255IHYgZ3JpZHVcclxuICAgICAgICAgICAgdGhpcy52aWV3Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgZm9jdXNGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmQoXCIuU2V6bmFtRnVjLmdncmlkXCIpLmdncmlkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICAodGhhdC52aWV3IGFzIGFueSkub2ZmKFwiY2hhbmdlLmZvY3VzXCIsIGZvY3VzRnVuYyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudmlldy5vbihcImNoYW5nZS5mb2N1c1wiLCBmb2N1c0Z1bmMpO1xyXG5cclxuICAgICAgICAgICAgLy8gbsOhaGxlZCB2IHByYXbDqW0gYm/EjW7DrW0gcGFuZWx1XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5nc2lkZWJhcihcIm9wdGlvblwiLCB7IHJpZ2h0OiB7IHdpZHRoOiAyMDAsIHZpc2libGU6IGZhbHNlLCBsZWFmc0F1dG9IaWRlOiBmYWxzZSB9IH0pO1xyXG4gICAgICAgICAgICBsZXQgcHJldmlld1BhbmVsc0RlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua1Byb3ZpZGVyOiBmdW5jdGlvbiAobG9hZFBhcmFtcykgeyByZXR1cm4gR29yZGljLldlYkFwcC5VdGlsaXR5LmNyZWF0ZUNvbW1hbmRVcmwobnVsbCwgXCJPcGVuRGV0YWlsXCIsIHsgaXhwOiBsb2FkUGFyYW1zLml4cF91cHIgfSwgeyB0aWNrZXRUeXBlOiBHb3JkaWMuRW51bXMuVGlja2V0VHlwZS5XaXRoTG9naW5BbmRDb250ZXh0IH0pIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdJZDogXCJmdWM6UHJpcGFkXCJcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJldmlld3MuZ2V0RmlsZVByZXZpZXdUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBQcm92aWRlcjogZnVuY3Rpb24gKGxvYWRQYXJhbXMpIHsgcmV0dXJuIGxvYWRQYXJhbXMuaXhwX3VwcjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKHRoaXMuZWxlbWVudCwgcHJldmlld1BhbmVsc0RlZmluaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgLy8gcG9yb3Zuw6Fuw61cclxuICAgICAgICAgICAgRnVjR3JpZC5Db21wYXJhdG9yLmNyZWF0ZSh0aGF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBEZXRhaWxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW7DrSBkZXRhaWx1IHDFmcOtcGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRldGFpbCgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgY29uc3QgYWt0UmFkZWsgPSBFa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG8+KHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbUZ1Yy5nZ3JpZFwiKSk7XHJcbiAgICAgICAgICAgIGlmIChha3RSYWRlayAmJiAhKGFrdFJhZGVrIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1IGFrdHXDoWxuw60gdnlicmFuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5EZXRhaWwodGhpcywgYWt0UmFkZWspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGRldGFpbHUgcMWZw61wYWR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudCBjb250ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvfSByb3cgYWt0dcOhbG7DrSDFmcOhZGVrXHJcbiAgICAgICAgICogQHBhcmFtIHtGdWNHcmlkLm9wZW5EZXRhaWxXaXphcmRQYXJhbXN9IFt3aXphcmRdIHBhcmFtZXRyeSBwcsWvdm9kY2UgKHYgcMWZw61wYWTEmyB2b2zDoW7DrSBkZXRhaWx1IHogcHLFr3ZvZGNlKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wZW5EZXRhaWwoXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgICAgICByb3c6IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG8sXHJcbiAgICAgICAgICAgIHdpemFyZD86IEZ1Y0dyaWQub3BlbkRldGFpbFdpemFyZFBhcmFtc1xyXG4gICAgICAgICk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gesOhc29ibsOtayB6bcSbbsSbbsO9Y2ggesOhem5hbcWvXHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VkUm93czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICAgICAgICBsZXQgJGRldGFpbFdpbmRvdyA9IGNvbnRlbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICBbXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsUHJpcGFkdVwiLCB7IGdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHdpemFyZD8uZ3JpZCA/PyB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1GdWMuZ2dyaWRcIikpIH1dLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElEOiAnRGV0YWlsUHJpcGFkdSMnLFxyXG4gICAgICAgICAgICAgICAgICAgIEl4cFVwcjogcm93Py5peHBfdXByXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBvYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICAkLmNvbnRlbnQoJGRldGFpbFdpbmRvdykub24oRnVjRGV0YWlsLnRyaWdnZXJDaGFuZ2UsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbD8uZGF0YT8uaXhwX3Vwcikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gZG8gc2V6bmFtdSB6w6F6bmFtxa8gayBvYsSNZXJzdHZlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZWRSb3dzLmluZGV4T2YocmV0VmFsLmRhdGEuaXhwX3VwcikgPCAwKSBjaGFuZ2VkUm93cy5wdXNoKHJldFZhbC5kYXRhLml4cF91cHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9ic2x1aGEgdWtvbsSNZW7DrSBva25hXHJcbiAgICAgICAgICAgICRkZXRhaWxXaW5kb3cub24oXCJjbG9zZWRcIiwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGZva3VzdSAoamVuIHBva3VkIG5lbsOtIHByxa92b2RjZSlcclxuICAgICAgICAgICAgICAgIGlmICghd2l6YXJkKSB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1GdWMuZ2dyaWRcIikuZ2dyaWQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHptxJtuxJtuw71jaCB6w6F6bmFtxa8gKHYgaGxhdm7DrW0gc2V6bmFtdSBpIHDFmcOtcGFkbsSbIHYgcHLFr3ZvZGNpKVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWRSb3dzPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBha3Rpdm7DrSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpemFyZCAmJiB3aXphcmQuc2V0QWN0aXZlT3BlcmF0aW9uICE9IHVuZGVmaW5lZCAmJiB0eXBlb2YgKHdpemFyZC5zZXRBY3RpdmVPcGVyYXRpb24pID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l6YXJkLnNldEFjdGl2ZU9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSB6w6FrbGFkbsOtaG8gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiB7IGl4cF91cHI6IGNoYW5nZWRSb3dzIH0sIG9ubHlQS1dpdGhvdXRGaWx0ZXJzOiB0cnVlIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGFrdHXDoWxuw61obyDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsPy5yZXR1cm5WYWx1ZT8uaXhwX3Vwcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbUZ1Yy5nZ3JpZFwiKS5nZ3JpZChcImFjdGl2ZVJvd1wiLCB7IGl4cF91cHI6IHJldFZhbC5yZXR1cm5WYWx1ZS5peHBfdXByIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdiBwxZnDrXBhZMSbIHByxa92b2RjZSBpIGFrdHVhbGl6YWNlIGdyaWR1IHYgcHLFr3ZvZGNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2l6YXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRnVjV2l6YXJkLnJlbG9hZFJvd3MoKHJxKSA9PiB7IHJldHVybiB0aGF0LmlzbC5GaW5QcmlwYWQubGlzdChycSk7IH0sIHsgaXhwX3VwcjogY2hhbmdlZFJvd3MgfSwgd2l6YXJkLmdyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aXphcmQgJiYgd2l6YXJkLnJlZnJlc2hBbmRDaGVja0RhdGFBY3Rpb24gIT0gdW5kZWZpbmVkICYmIHR5cGVvZiAod2l6YXJkLnJlZnJlc2hBbmRDaGVja0RhdGFBY3Rpb24pID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2l6YXJkLnJlZnJlc2hBbmRDaGVja0RhdGFBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkZGV0YWlsV2luZG93LmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gSHJvbWFkbsOpIG9wZXJhY2VcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3Rvcm5vIC8genJ1xaFlbsOtIHN0b3JuYSB2eWJyYW7DvWNoIHDFmcOtcGFkxa9cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3Rvcm5vdmF0IHN0b3Jub3ZhdCAodHJ1ZSkgbmVibyB6cnXFoWl0IHN0b3JubyAoZmFsc2UpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc3Rvcm5vKHN0b3Jub3ZhdDogYm9vbGVhbik6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IG9wZXJhY2VcclxuICAgICAgICAgICAgaW50ZXJmYWNlIHN0b3Jub01vZGVsIHtcclxuICAgICAgICAgICAgICAgIGR1dm9kOiBzdHJpbmcgfCBudWxsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyB2b2zDoW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkVHdvU3RlcHM8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZFN0b3Jub09wZXJhdGlvbkR0bywgc3Rvcm5vTW9kZWw+KFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN0b3Jub1ByaXBhZHUjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHN0b3Jub3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImpyZXM6MjQxMDAyNTJcIiAvL1JDIDI0MTAwMjUyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwianJlczoyNDEwMDI1M1wiLCAvL1JDIDI0MTAwMjUzIDogWnJ1xaFlbsOtIHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogc3Rvcm5vdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiQWtjZSBzdG9ybnVqZSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBwxZnDrXBhZHkuIFBvIGplasOtbSBwcm92ZWRlbsOtIGJ1ZG91IHR5dG8gcMWZw61wYWR5IHZlIHN0YXZ1ICdzdG9ybm92w6FuJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiQWtjZSB6cnXFocOtIHN0b3JubyB2eWJyYW7DvWNoICh6YcWha3J0bnV0w71jaCkgcMWZw61wYWTFry4gUG8gamVqw61tIHByb3ZlZGVuw60gYnVkb3UgdHl0byBwxZnDrXBhZHkgdmUgc3RhdnUgJ290ZXbFmWVuJ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IHN0b3Jub3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImpyZXM6MjQxMDAzMDJcIiAvL1JDIDI0MTAwMzAyIDogUGFyYW1ldHJ5IHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImpyZXM6MjQxMDAzMDNcIiwgLy9SQyAyNDEwMDMwMyA6IFBhcmFtZXRyeSB6cnXFoWVuw60gc3Rvcm5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbkFjdGlvbjogc3Rvcm5vdmF0ID8gdGhhdC5hY3Rpb25zLmFjdFN0b3JubyEuY2FwdGlvbiA6IHRoYXQuYWN0aW9ucy5hY3RacnVzZW5pU3Rvcm5hIS5jYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiIH0pLmFkZFNlY3Rpb24oKS5hZGRSb3coXCJqcmVzOjI0MTAwMjk0XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZHV2b2RcIiwgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIHNtYXJ0TmF2TmV4dEVsZW1lbnQ6IGZ1bmN0aW9uIChjdXIsIG5leHQpIHsgcmV0dXJuICQuY29udGVudCh0aGlzKT8uZWxlbWVudC5maW5kKFwiYnV0dG9uW2RhdGEtcGFyYW0taWQ9J2NoZWNrQWN0J11cIilbMF07IH0gfSksIC8vUkMgMjQxMDAyOTQgOiBExa92b2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHsgZHV2b2Q6IG51bGwgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbCwgZGF0YSwgaWtjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogaWtjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcm5vdmF0OiBzdG9ybm92YXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHV2b2Q6IChtb2RlbCAhPSBudWxsICYmIG1vZGVsLmR1dm9kICE9IG51bGwgPyBtb2RlbC5kdXZvZCA6IFwianJlczoyNDEwMDMwMVwiKSAvL1JDIDI0MTAwMzAxIDogbmV6YWTDoW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbENoZWNrQmVmb3JlT3BlcmF0aW9uOiAoZHRvKSA9PiB7IHJldHVybiB0aGF0LmlzbC5GaW5QcmlwYWQuemtvbnRyb2x1alByZWRTdG9ybmVtKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRmluUHJpcGFkLmhyb21hZG5lU3Rvcm51aihkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxpbmdBY3Rpb246IHN0b3Jub3ZhdCA/IHRoYXQuYWN0aW9ucy5hY3RTdG9ybm8gOiB0aGF0LmFjdGlvbnMuYWN0WnJ1c2VuaVN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2xZllbsOtIC8genJ1xaFlbsOtIHV6YXbFmWVuw60gdnlicmFuw71jaCBwxZnDrXBhZMWvXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHV6YXZyaXQgdXphdsWZw610ICh0cnVlKSBuZWJvIHpydcWhaXQgdXphdsWZZW7DrSAoZmFsc2UpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdXphdnJlbmkodXphdnJpdDogYm9vbGVhbik6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IG9wZXJhY2VcclxuICAgICAgICAgICAgaW50ZXJmYWNlIHV6YXZyZW5pTW9kZWwge1xyXG4gICAgICAgICAgICAgICAgb3RldnJpdF9mdWNfaW50OiBib29sZWFuIHwgbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LndpemFyZFR3b1N0ZXBzPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWRVemF2cmVuaU9wZXJhdGlvbkR0bywgdXphdnJlbmlNb2RlbD4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiVXphdnJlbmlQcmlwYWR1I1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB1emF2cml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiVXphdsWZZW7DrVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiWnJ1xaFlbsOtIHV6YXbFmWVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHV6YXZyaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJBa2NlIHV6YXbFmWUgdnlicmFuw6kgKHphxaFrcnRudXTDqSkgcMWZw61wYWR5LiBQbyBqZWrDrW0gcHJvdmVkZW7DrSBidWRvdSB0eXRvIHDFmcOtcGFkeSB2ZSBzdGF2dSAndXphdsWZZW4nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJBa2NlIHpydcWhw60gdXphdsWZZW7DrSB2eWJyYW7DvWNoICh6YcWha3J0bnV0w71jaCkgcMWZw61wYWTFry4gUG8gamVqw61tIHByb3ZlZGVuw60gYnVkb3UgdHl0byBwxZnDrXBhZHkgdmUgc3RhdnUgJ3DFmWlwcmF2ZW5vIGsgdXphdsWZZW7DrScsIHJlc3AuICdvdGV2xZllbidcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVRhYlRpdGxlOiB1emF2cml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiUGFyYW1ldHJ5IHV6YXbFmWVuw61cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlBhcmFtZXRyeSB6cnXFoWVuw60gdXphdsWZZW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25BY3Rpb246IHV6YXZyaXQgPyB0aGF0LmFjdGlvbnMuYWN0VXphdnJlbmkhLmNhcHRpb24gOiB0aGF0LmFjdGlvbnMuYWN0WnJ1c2VuaVV6YXZyZW5pIS5jYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiB1emF2cml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiIH0pLmFkZFNlY3Rpb24oKS5hZGRSb3coXCJQxZnDrXBhZHkgYWdlbmQgRlVDIGEgSU5UXCIpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJvdGV2cml0X2Z1Y19pbnRcIiwgbGFiZWw6IFwib3RldsWZw610IGRvIHN0YXZ1ICdvdGV2xZllbicgbcOtc3RvIGRvIHN0YXZ1ICdwxZlpcHJhdmVuIGsgdXphdsWZZW7DrSdcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHsgb3RldnJpdF9mdWNfaW50OiBudWxsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvT3BlcmF0aW9uRHRvOiAobW9kZWwsIGRhdGEsIGlrYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpa2M6IGlrYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV6YXZyaXQ6IHV6YXZyaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RldnJpdF9mdWNfaW50OiB1emF2cml0ID8gZmFsc2UgOiAobW9kZWwgIT0gbnVsbCA/IG1vZGVsLm90ZXZyaXRfZnVjX2ludCA6IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkZpblByaXBhZC56a29udHJvbHVqUHJlZFV6YXZyZW5pbShkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc2xPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkZpblByaXBhZC5ocm9tYWRuZVV6YXZyaShkdG8pOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxpbmdBY3Rpb246IHV6YXZyaXQgPyB0aGF0LmFjdGlvbnMuYWN0VXphdnJlbmkgOiB0aGF0LmFjdGlvbnMuYWN0WnJ1c2VuaVV6YXZyZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWVkw6Fuw60gdnlicmFuw71jaCBwxZnDrXBhZMWvXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVkYW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IG9wZXJhY2VcclxuICAgICAgICAgICAgaW50ZXJmYWNlIHByZWRhbmlNb2RlbCB7XHJcbiAgICAgICAgICAgICAgICB1dXM6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpeHNfZnVuOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgZHV2b2Q6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgICAgICAgICB6bWVuYV9mdW5rY2U6IGJvb2xlYW4gfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgaWNvOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgdWNzOiBzdHJpbmcgfCBudWxsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyB2b2zDoW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQud2l6YXJkVHdvU3RlcHM8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZFByZWRhbmlPcGVyYXRpb25EdG8sIHByZWRhbmlNb2RlbD4oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUHJlZGFuaVByaXBhZHUjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDI2MFwiLCAvL1JDIDI0MTAwMjYwIDogUMWZZWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBa2NlIHDFmWVkw6EgdnlicmFuw6kgKHphxaFrcnRudXTDqSkgcMWZw61wYWR5IG5hIHphZGFub3Ugw7rEjXTDoXJudSBhIHpwcmFjb3ZhdGVsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwiUGFyYW1ldHJ5IHDFmWVkw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uQWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UHJlZGFuaSEuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiB9KS5hZGRTZWN0aW9uKCkuYWRkUm93KFwiUMWZw61wYWR5IGFnZW5kIEZVQyBhIElOVFwiKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwib3RldnJpdF9mdWNfaW50XCIsIGxhYmVsOiBcIm90ZXbFmcOtdCBkbyBzdGF2dSAnb3RldsWZZW4nIG3DrXN0byBkbyBzdGF2dSAncMWZaXByYXZlbiBrIHV6YXbFmWVuw60nXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0yLTEwLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIsOaxI10w6FybmFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXVzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInV1cz11dXMsaWNvPWljbyx1Y3M9dWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoaXMuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dXM6IHRoaXMuZGJwYXJhbXMuZnVjX3Jlel9wcm8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5SZXppbVByb3ZvenUuUmVmZXJlbnQgfHwgdGhpcy5kYnBhcmFtcy5mdWNfcmV6X3BybyA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlJlemltUHJvdm96dS5VY3Rhcm5hID8gKHRoaXMuVXVzID09PSBcIkhVXCIgPyBcIkhVXCIgOiBbdGhpcy5VdXMsIFwiSFVcIl0pIDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVuYV9mdW5rY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJabcSbbml0IHpwcmFjb3ZhdGVsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlOiBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IChjaGFuZ2VPYmoudmFsdWUgPT09IHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LnRhcmdldCkuY2xvc2VzdChcIi5nZm9ybVwiKS5maW5kRmllbGRzKFwiaXhzX2Z1blwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiWnByYWNvdmF0ZWxcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZnVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZnVuPWl4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERsZVBvdm9sZW55Y2hGYXppOiBcIkdXQUZVQzA1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVrb0ljbzogdGhhdC5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVrb1VjczogdGhhdC5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVrb1V1czogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwidXVzXCIsIFwidXVzXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAyOTRcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJkdXZvZFwiLCBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IDI1NCB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pLCAvL1JDIDI0MTAwMjk0IDogRMWvdm9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7IHV1czogdGhhdC5VdXMsIGl4c19mdW46IG51bGwsIGR1dm9kOiBudWxsLCB6bWVuYV9mdW5rY2U6IHRydWUsIGljbzogdGhhdC5JY28sIHVjczogdGhhdC5VY3MgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbCwgZGF0YSwgaWtjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlrYzogaWtjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGF0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1czogbW9kZWw/LnV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuX2FrdDogbW9kZWw/Lml4c19mdW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHV2b2Q6IChtb2RlbCAhPSBudWxsICYmIG1vZGVsLmR1dm9kICE9IG51bGwgPyBtb2RlbC5kdXZvZCA6IFwianJlczoyNDEwMDMwMVwiKSAvL1JDIDI0MTAwMzAxIDogbmV6YWTDoW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhvdXRQcmVDaGVjazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkZpblByaXBhZC56a29udHJvbHVqUHJlZFByZWRhbmltKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRmluUHJpcGFkLmhyb21hZG5lUHJlZGVqKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGluZ0FjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFByZWRhbmlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHLFr3ZvZGNlIG5hZCBzZXpuYW1lbSBwxZnDrXBhZMWvIDxEVE8gb3BlcmFjZSwgbW9kZWwgcGFyYW1ldHLFrz4uIG5lcHJhY3VqZSBzIGZ1Y2R1Y3RcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1Y1dpemFyZC5GdWNXaXphcmRQYXJhbXM8VE9wZXJhdGlvbkR0bywgVE1vZGVsLCBGdWMuSW50ZXJmYWNlLkdQcmlwYWREdG8+IHwgRnVjV2l6YXJkLkZ1Y1dpemFyZFBhcmFtc1BhcnQ8VE9wZXJhdGlvbkR0bywgVE1vZGVsLCBGdWMuSW50ZXJmYWNlLkdQcmlwYWREdG8+fSBwYXJhbXMgxI3DoXN0IHBhcmFtZXRyxa8gcHLFr3ZvZGNlXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgd2l6YXJkVHdvU3RlcHM8VE9wZXJhdGlvbkR0bywgVE1vZGVsID0gbnVsbD4oXHJcbiAgICAgICAgICAgIHBhcmFtczogRnVjV2l6YXJkLkZ1Y1dpemFyZFBhcmFtczxUT3BlcmF0aW9uRHRvLCBUTW9kZWwsIEZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0bz4gfCBGdWNXaXphcmQuRnVjV2l6YXJkUGFyYW1zUGFydDxUT3BlcmF0aW9uRHRvLCBUTW9kZWwsIEZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0bz5cclxuICAgICAgICApOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRvxI1hc27DqSDFmWXFoWVuw60gZnJhZ21lbnTFryAtIGplIGFsZSBqZSBudXRuw6kgcMWZZWRhdCBkbyBtZXRvZHkgd2l6YXJkR2V0RGF0YVxyXG4gICAgICAgICAgICAvL2xldCBncmlkRm9ybWF0ID0gR29yZGljLkZ1Yy5XZWJDbGllbnQuRnVjR3JpZC5QcmlwYWQuY3JlYXRlR3JpZEZvcm1hdCh0aGF0LCB0cnVlKTtcclxuICAgICAgICAgICAgLy9sZXQgZnJhZ21lbnRzOiBzdHJpbmdbXSA9IEZ1Y1dpemFyZC5nZXRGcmFnbWVudHNGcm9tR3JpZEZvcm1hdChncmlkRm9ybWF0LCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZEZvcm1hdCA9IEZ1Y1dpemFyZC5nZXRDdXJyZW50R3JpZEZvcm1hdDxGdWMuSW50ZXJmYWNlLkdQcmlwYWREdG8+KHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbUZ1Yy5nZ3JpZFwiKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyYWdtZW50cyA9IEZ1Y1dpemFyZC5nZXRGcmFnbWVudHNGcm9tR3JpZEZvcm1hdChncmlkRm9ybWF0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZvbMOhbsOtIG9iZWNuw6lobyBGVUNvdsOpaG8gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIHJldHVybiBGdWNXaXphcmQud2l6YXJkVHdvU3RlcHMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwianJlczoyNDEwMDQ1NlwiLCAvL1JDIDI0MTAwNDU2IDogVnlicmFuw6kgcMWZw61wYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZ3JpZEZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IHRoYXQuUHJpbWFyeUtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGU6ICh0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1GdWMuZ2dyaWRcIikuZ2dyaWQoXCJnZXRDdXJyZW50UHJvZmlsZVwiKSkgYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXREYXRhOiAod2l0aFJlc3VsdHMsIGlrY09yRGF0YSwgcmVzcG9uc2UpID0+IHsgcmV0dXJuIHRoYXQud2l6YXJkR2V0RGF0YSh3aXRoUmVzdWx0cywgd2l0aFJlc3VsdHMsIGlrY09yRGF0YSwgZnJhZ21lbnRzLCByZXNwb25zZSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51R3JpZERldGFpbDogKGNudCwgY3R4LCBpa2MsIG1vZGVsLCBha3RSYWRlaywgJGdyaWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5vcGVuRGV0YWlsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdFJhZGVrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkOiAkZ3JpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hBbmRDaGVja0RhdGFBY3Rpb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC53aXphcmRSZWZyZXNoQW5kQ2hlY2tEYXRhKGNudCwgZmFsc2UsICRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpLCBpa2MsIGZyYWdtZW50cywgcGFyYW1zLmFjdGlvbnMuaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb24sIHBhcmFtcy5wYXJhbWV0ZXJzLnRvT3BlcmF0aW9uRHRvLCBtb2RlbCBhcyBUTW9kZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkYXQgdiBncmlkdSBhIG9ixI1lcnN0dmVuw60gaW5kaWvDoXRvcsWvIHBvxI10xa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKGRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjbnQgYXMgYW55KS5yZWZyZXNoSW5kaWNhdG9yICE9IHVuZGVmaW5lZCAmJiB0eXBlb2YgKChjbnQgYXMgYW55KS5yZWZyZXNoSW5kaWNhdG9yKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNudCBhcyBhbnkpLnJlZnJlc2hJbmRpY2F0b3IoJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxvYWRMaXN0QWZ0ZXJGaW5pc2g6ICgpID0+IHsgcmV0dXJuIHRoYXQudmlldy5yZXF1ZXN0RGF0YSh7IHdpdGhvdXRMb25nTGltaXQ6IHRydWUgfSk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcsOhdMOtIHNlem5hbSBwxZnDrXBhZMWvIHBybyB6b2JyYXplbsOtIHYgcHLFr3ZvZGPDrWNoIHBybyBocm9tYWRuw6kgb3BlcmFjZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gb25seUNoZWNrZWQgcG91emUgemHFoWtydG51dMOpIMWZw6Fka3kgKHRydWUgPSBhbm8sIGZhbHNlID0gbmUpXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB3aXRoUmVzdWx0cyBkb3BsbsSbbsOtIHbDvXNsZWRrxa8gaHJvbWFkbsOpIG9wZXJhY2UgKHRydWUgPSBhbm8sIGZhbHNlID0gbmUpXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2VuZXJhbC5HSWtjIHwgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b1tdIHwgbnVsbH0gaWtjT3JEYXRhIElLQyBuZWJvIGRhdGEgKHN0YcSNw60gUEspXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmdbXSB8IHVuZGVmaW5lZH0gZnJhZ21lbnRzIGZyYWdtZW50eVxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLklzbC5HU2VydmljZUdyb3VwUmVzcG9uc2U8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR3ByaXBhZER0bz59IFtyZXNwb25zZV0gdsO9c2xlZGVrIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b1tdPn0gc2V6bmFtIHDFmcOtcGFkxa8gKHMgdsO9c2xlZGt5IG9wZXJhY2UgbmVibyBiZXogcG9kbGUgcGFyYW1ldHJ1IHdpdGhSZXN1bHRzKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgd2l6YXJkR2V0RGF0YShcclxuICAgICAgICAgICAgb25seUNoZWNrZWQ6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHdpdGhSZXN1bHRzOiBib29sZWFuLFxyXG4gICAgICAgICAgICBpa2NPckRhdGE6IEdvcmRpYy5HZW5lcmFsLkdJa2MgfCBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvW10gfCBudWxsLFxyXG4gICAgICAgICAgICBmcmFnbWVudHM6IHN0cmluZ1tdIHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICByZXNwb25zZT86IEdvcmRpYy5Jc2wuR1NlcnZpY2VHcm91cFJlc3BvbnNlPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG8+XHJcbiAgICAgICAgKTogSlF1ZXJ5UHJvbWlzZTwoR29yZGljLkVrby5Db21wb25lbnRzLk1hc3NPcGVyYXRpb25EYXRhPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG8+IHwgR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0bylbXT4vKiB8IEpRdWVyeVByb21pc2U8R29yZGljLklzbC5HU2VydmljZUdyb3VwUmVzcG9uc2U8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0bz4+Ki8ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gb2JlY27DqSBtZXRvZHkgcHJvIG5hxI10ZW7DrSBkYXQgZG8gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIHJldHVybiBGdWNXaXphcmQuZ2V0RGF0YShcclxuICAgICAgICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAgICAgICBvbmx5Q2hlY2tlZCxcclxuICAgICAgICAgICAgICAgIHdpdGhSZXN1bHRzLFxyXG4gICAgICAgICAgICAgICAgaWtjT3JEYXRhLFxyXG4gICAgICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgICAgICAocnEpID0+IHsgcmV0dXJuIHRoYXQuaXNsLkZpblByaXBhZC5saXN0KHJxKTsgfSxcclxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwvLyhkYXRhKSA9PiB7IHJldHVybiBGdWNHcmlkLlByaXBhZC5tb2RpZnlEdG8oZGF0YSwgZmFsc2UsIHdpdGhSZXN1bHRzKSB9LFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UsXHJcbiAgICAgICAgICAgICAgICB0aGF0LlByaW1hcnlLZXksXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudHNcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYsSNZXJzdHbDrSBzZXpuYW0gYSBwxZlla29udHJvbHVqZSBkYXRhIChvYm9qZSB2b2xpdGVsbsSbKVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNudCBjb250ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSByZWxvYWREYXRhIG1hasOtIHNlIG5hxI3DrXN0IGFrdHXDoWxuw60gZGF0YSB6IGRhdGFiw6F6ZT8gKHRydWUgPSBhbm8sIGZhbHNlID0gbmUpXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvW10gfCB1bmRlZmluZWR9IGRhdGEgZGF0YSBwcm8gcMWZw61wYWQsIMW+ZSBzZSBuZW1hasOtIG5hxI3DrXRhdCB6IGRhdGFiw6F6ZSAocmVsb2FkRGF0YSA9IGZhbHNlKVxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdlbmVyYWwuR0lrYyB8IG51bGx9IGlrYyBJS0NcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ1tdIHwgdW5kZWZpbmVkfSBmcmFnbWVudHMgZnJhZ21lbnR5XHJcbiAgICAgICAgICogQHBhcmFtIHsoKGR0bzogVE9wZXJhdGlvbkR0bykgPT4gYW55KSB8IHVuZGVmaW5lZH0gY2hlY2tBY3Rpb24gZGVsZWfDoXQgcHJvIGtvbnRyb2x1IGRhdCBwxZllZCBvcGVyYWPDrSAocG9rdWQgbmVuw60sIG5ldm9sw6Egc2Uga29udHJvbGEsIGplbiBzZSBuYcSNdG91IGFrdHXDoWxuw60gZGF0YSlcclxuICAgICAgICAgKiBAcGFyYW0geyhtb2RlbDogVE1vZGVsIHwgdW5kZWZpbmVkLCBkYXRhOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvW10sIGlrYzogR29yZGljLkdlbmVyYWwuR0lrYyB8IG51bGwpID0+IFRPcGVyYXRpb25EdG99IHRvT3BlcmF0aW9uRHRvIGRlbGVnw6F0IHBybyB2eXR2b8WZZW7DrSBEVE8gb3BlcmFjZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG9bXT59IHNlem5hbSB6w6Fwb8SNdG92w71jaCBsaXN0xa8gKHMgdsO9c2xlZGt5IG9wZXJhY2UgbmVibyBiZXogcG9kbGUgcGFyYW1ldHJ1IHdpdGhSZXN1bHRzKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgd2l6YXJkUmVmcmVzaEFuZENoZWNrRGF0YTxUT3BlcmF0aW9uRHRvLCBUTW9kZWw+KFxyXG4gICAgICAgICAgICBjbnQ6IEdDb250ZW50LFxyXG4gICAgICAgICAgICByZWxvYWREYXRhOiBib29sZWFuLFxyXG4gICAgICAgICAgICBkYXRhOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvW10gfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGlrYzogR29yZGljLkdlbmVyYWwuR0lrYyB8IG51bGwsXHJcbiAgICAgICAgICAgIGZyYWdtZW50czogc3RyaW5nW10gfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAoKGR0bzogVE9wZXJhdGlvbkR0bykgPT4gYW55KSB8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdG9PcGVyYXRpb25EdG86IChtb2RlbDogVE1vZGVsIHwgdW5kZWZpbmVkLCBkYXRhOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvW10sIGlrYzogR29yZGljLkdlbmVyYWwuR0lrYyB8IG51bGwpID0+IFRPcGVyYXRpb25EdG8sXHJcbiAgICAgICAgICAgIG1vZGVsOiBUTW9kZWwgfCB1bmRlZmluZWRcclxuICAgICAgICApOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5NYXNzT3BlcmF0aW9uRGF0YTxHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvPltdPi8qSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvW10+Ki8vKiB8IEpRdWVyeVByb21pc2U8R29yZGljLklzbC5HU2VydmljZUdyb3VwUmVzcG9uc2U8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0bz4+Ki8ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gb2JlY27DqSBtZXRvZHkgb2LEjWVyc3R2ZW7DrSBzZXpuYW11IGEga29udHJvbHUgZGF0XHJcbiAgICAgICAgICAgIHJldHVybiBGdWNXaXphcmQucmVmcmVzaEFuZENoZWNrRGF0YShcclxuICAgICAgICAgICAgICAgIGNudCxcclxuICAgICAgICAgICAgICAgIHJlbG9hZERhdGEsXHJcbiAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgaWtjLFxyXG4gICAgICAgICAgICAgICAgKHdpdGhSZXN1bHRzOiBib29sZWFuLCBpa2M6IEdvcmRpYy5HZW5lcmFsLkdJa2MgfCBudWxsKSA9PiB7IHJldHVybiB0aGF0LndpemFyZEdldERhdGEoZmFsc2UsIHdpdGhSZXN1bHRzLCBpa2MsIGZyYWdtZW50cyk7IH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja0FjdGlvbixcclxuICAgICAgICAgICAgICAgIHRvT3BlcmF0aW9uRHRvLFxyXG4gICAgICAgICAgICAgICAgbW9kZWxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gTmFzdGF2ZW7DrVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2ZSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogcG9rdWQgYnkgYnlsbyBwb3TFmWViYSBzZSDFmcOtZGl0IGtvbmtyw6l0bsOtbSDFmcOhZGtlbSwgdGFrIG9ka29tZW50b3ZhdCBhIHBvdcW+w610XHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gcMWZw61wYWRcclxuICAgICAgICAgICAgLy9jb25zdCBha3RQcmlwYWQgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1GdWMuZ2dyaWRcIikuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzRW1wdHkgPSAhKHRoaXMudmlldy5nZXRDb3VudChcImRhdGFcIikgPiAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICBjb25zdCBwZXJtRW1wdHlHcmlkID0gRnVjR3JpZC5nZXRFbXB0eUdyaWRQZXJtaXNzaW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdHMgPSB0aGlzLmFjdGlvbnM7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcm1zID0gdGhpcy5QZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgYWN0cy5hY3REZXRhaWwhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplWm9icmF6aXQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFN0b3JubyEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVTdG9ybm92YXQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFpydXNlbmlTdG9ybmEhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplWnJ1c2l0U3Rvcm5vKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RVemF2cmVuaSEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVVemF2cml0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RacnVzZW5pVXphdnJlbmkhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplWnJ1c2l0VXphdnJlbmkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFByZWRhbmkhLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplUHJlZGF0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RQcmlkYXREb1Bvcm92bmFuaSEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0VGlzayEudXBkYXRlUGVybWlzc2lvbihpc0VtcHR5ID8gcGVybUVtcHR5R3JpZCA6IHBlcm1zPy5MemVUaXNrbm91dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEZpbHRyeVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB2eXR2b8WZw60gYSB2csOhdMOtIGZvcm11bMOhxZllIHMgZmlsdHJ5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5Gb3Jtcy5Gb3JtW119IHBvbGUgZm9ybXVsw6HFmcWvIHMgZmlsdHJ5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXJzKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtW10ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gesOha2xhZG7DrSBmaWx0cnkgbmEgcG9oeWJ5XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwianJlczoyNDEwMDA5MlwiIH0pIC8vUkMgMjQxMDAwOTIgOiBLb21wbGV0bsOtIGZpbHRyXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjI0MTAwMzUyXCIpIC8vUkMgMjQxMDAzNTIgOiBaw6FrbGFkbsOtIMO6ZGFqZVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKGZhbHNlKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3VwclwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuRWtvLkZpbHRlcnMucHJlZmFiQWdFdkNpc2xvKCkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVmxhc3Ruw61rXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2Z1bigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX2FrdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19mdW5fYWt0PWl4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MgPz8gXCJOS1NcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zbmtzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm5rcz1ua3MsaWdub3JlX2ljb19ua3M9aWNvXCIvKlwibmtzPW5rcyxpY289Pmljb1wiKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuSWNvXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy51dXMgPz8gXCJVVVNcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXVzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInV1cz11dXMsaWdub3JlX2ljb191dXM9aWNvLGlnbm9yZV91Y3NfdXVzPXVjc1wiLypcInV1cz11dXMsaWNvPT5pY28sdWNzPT51Y3NcIiovLypcInV1cz11dXMsaWNvXzE9aWNvLHVjc18xPXVjc1wiKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoaXMuVWNzXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMzI0XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2VzdSgpLCB7IC8vUkMgMjQxMDAzMjQgOiBFeHRlcm7DrSBzdWJqZWt0XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2VzdT1peHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5Fa28uRmlsdGVycy5wcmVmYWJWc0tzU3MoKSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJacMWvc29iIMO6aHJhZHlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jaXpwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwienA9enBcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGF0dW0gZXZpZGVuY2UgcGxhdGJ5IG9kLWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZXZpZFwiXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXR1bSB2eXN0YXZlbsOtIHBsYXRieSBvZC1kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z5c3RcIlxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGF0dW0gcGxuxJtuw60gcGxhdGJ5IG9kLWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfemRhblwiXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXR1bSBzcGxhdG5vc3RpIHBsYXRieSBvZC1kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbGF0XCJcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwixIzDoXN0a2EgY2Vsa2VtIG9kLWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX21lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRBbGw6ICQuZXh0ZW5kKEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRlZmF1bHRWYWx1ZTogbnVsbCB9KVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTcSbbmFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jbWVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtZW5hPW1lbmFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIsSMw6FzdGthIGNlbGtlbSB2IEvEjSBvZC1kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19jZWxrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiAkLmV4dGVuZChHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkZWZhdWx0VmFsdWU6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGlzXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthIHDFmcOtcGFkdVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoRWtvLkZpbHRlcnMuZ2V0U3RyaW5nT3BlcmF0b3JzKCkpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvem7DoW1rYSBkb2tsYWR1XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIndmbF9wb3puYW1rYVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAyNDhcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxLbGljU2xvdmEoKSwgeyAvL1JDIDI0MTAwMjQ4IDogS2zDrcSNb3bDoSBzbG92YVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwid2ZsX2tsc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIndmbF9rbHM9a2xfc2xvdm9cIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0QnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQnV0dG9uczogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJTdGF2eVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihGdWNGaWx0ZXIucHJlZmFiU1VwclJhZGlvKFwic191cHJcIikpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLEjMOhc3RrYSBwxZnDrXBhZHUgb2QtZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfdXByXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiAkLmV4dGVuZChHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkZWZhdWx0VmFsdWU6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgcMWZw61wcmF2eSBrIMO6aHJhZMSbXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY3NwcigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3ByaXBcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzX3ByaXA9c19wcmlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLEjMOhc3RrYSBwxZnDrXByYXZlbsOhIGsgw7pocmFkxJsgb2QtZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcHJpcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEFsbDogJC5leHRlbmQoR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGVmYXVsdFZhbHVlOiBudWxsIH0pXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IG9kZXNsw6Fuw60gayDDumhyYWTEm1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2Nzb2QoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19vZGVcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzX29kZT1zX29kZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwixIzDoXN0a2Egb2Rlc2xhbsOhIGsgw7pocmFkxJsgb2QtZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfb2RlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiAkLmV4dGVuZChHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkZWZhdWx0VmFsdWU6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgcMOhcm92w6Fuw61cIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjc3BhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfcGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic19wYXI9c19wYXJcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIsSMw6FzdGthIHNww6Fyb3ZhbsOhIG9kLWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3BhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEFsbDogJC5leHRlbmQoR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGVmYXVsdFZhbHVlOiBudWxsIH0pXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IHphw7rEjXRvdsOhbsOtXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY3N6YSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3phdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNfemF1PXNfemF1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBzdG9ybmFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jc3RvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfc3RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic19zdG89c19zdG9cIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNfc3RvOiBbR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNTdG8uTmVzdG9ybm92YW5vLCBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1N0by5TdG9ybm9dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlR5cHkgYSBrYXRlZ29yaWVcIilcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwcmF2aXQgxZlhemVuw60gaG9kbm90IChwb2RsZSDEjcOtc2VsIG5lYm8gcG9kbGUgYWJlY2VkeT8pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIHDFmcOtcGFkdVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2N1cHIoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3VwclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImt0Z191cHI9a3RnX3VwclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGUsIGMpID0+IHsgdGhhdC5maWx0ZXJBbm9OZUNoYW5nZShcImt0Z191cHJcIiwgZSwgYyk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb8WZZcWhaXQgemF0csW+w610a2EgdSBuw6FzbGVkdWrDrWPDrWNoIHTFmcOtIHBvbMOtIGpha28ganNvdSB2ZSBXaW5DbGllbnR1XHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJYIFR5cHkgcMWZw61wYWTFr1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInR5cF91cHJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBwxZnDrXBhZHVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNzdHVwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF91cHJcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ0eXBfdXByPXR5cF91cHJcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLYXRlZ29yaWUgdHlwdSBkb2tsYWR1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2thdCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwia3RnX3R5cD1rdGdfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQb3V6ZUZVQzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIGRva2xhZHVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zc2xzdHlwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfdHlwPWl4c190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBvdXplRlVDOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRTZWN0aW9uKFwianJlczoyNDEwMDM3NlwiKSAvL1JDIDI0MTAwMzc2IDogUMWZZWRrb250YWNlXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBwcm8gc2xvdXBjZSB1ZWEtdGU0XHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJYIEdyaWRcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJYWFhYWFhYWFhYWFhYWFhcIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiQWdlbmRhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIGFnZW5keVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmN0YWcoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidHlwX2FnPXR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Ub29sdGlwVGVtcGxhdGU6IFwie3R5cF9hZ190eHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfYWc6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBBZ0Z1Yy5UeXBBZ1Bvdm9sZW5lRnVjXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHBva3VkIHRvIGZ1bmd1amUsIHRhayB0byB6YWtvbWVudG92YW7DqSBzbWF6YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgRnVjRmlsdGVyLmZpbHRyeVByaXBhZHVabWVuYVR5cEFnKC8qdGhpcy5wYXJlbnRDb250ZW50ISovJChldi5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoKSwgY2hhbmdlT2JqLnZhbHVlLCBcIml4cF9kZW5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLbmloYVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2FkZW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4cF9kZW49aXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUMWZw61wYWR5IHogZXh0ZXJuw61jaCBzeXN0w6ltxa9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwNTM4XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuaW50c2RhdigpLCB7IC8vUkMgMjQxMDA1MzggOiBUeXAgZMOhdmt5IElOVFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19kYXY9aXhzX2RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwNTM5XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuaW50c3JveigpLCB7IC8vUkMgMjQxMDA1MzkgOiBMb2thbGl0YSBleHRlcm7DrWhvIHN5c3TDqW11XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZXhzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhwX2V4cz1peHBfZXhzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczoyNDEwMDQ1M1wiKSAvL1JDIDI0MTAwNDUzIDogUG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gw7rEjXRvdsOhbsOtIHBvaHlidVwiKS5hZGRGaWVsZChcImdyYWRpb1wiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBvX2FrdF9yb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRWYWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IFwianJlczoyNDEwMDQ2OFwiIH0sIC8vUkMgMjQxMDA0NjggOiBwb3V6ZSBha3R1w6FsbsOtIHJva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IFwianJlczoyNDEwMDQ2OVwiIH0gLy9SQyAyNDEwMDQ2OSA6IHBvZGxlIHJvenNhaHUgb2QtZG9cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlOiBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IChjaGFuZ2VPYmoudmFsdWUgPT0gdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSkgJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKFwidXBvX2RhdF91Y3RcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcyhcInVwb19kYXRfdWN0XCIgKyBcIlN0YXJ0XCIsIFwidXBvX2RhdF91Y3RcIiArIFwiRW5kXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRhdHVtIMO6xI10b3bDoW7DrSBwb2h5YnUgb2QtZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVwb19kYXRfdWN0XCJcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyNDEwMDUzNFwiLCAvL1JDIDI0MTAwNTM0IDogxIzDoXN0a2EgcG9oeWJ1IG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1cG9fY191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRBbGw6ICQuZXh0ZW5kKEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRlZmF1bHRWYWx1ZTogbnVsbCB9KVxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBtw6EgdG8gYsO9dCBrb21iaW5vdmFuw6kgcG9sZSBwcm8gKnN1YsWZYWRhIG5lYm8gxI3DrXNsbyAodXBvX3N1YnJhZGFfZHV6LCB1cG9fYWNfaXhlKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiWCDEjMOtc2xvIMO6xI0uIGRva2xhZHVcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJYWFhYWFhYWFhYWFhYWFhcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGlzIHBvaHlidVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoRWtvLkZpbHRlcnMuZ2V0U3RyaW5nT3BlcmF0b3JzKCkpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1cG9fcG9waXNfdXBvXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBwb2h5YnVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjc3VvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVwb19zX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInVwb19zX3Vwbz1zX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogcMWZaWRhdCBwb21vY27DoSB0bGHEjcOtdGthIGpha28ganNvdSB1IHBvaHlixa8/XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaHlidVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2N0dXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBvX3R5cF91cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ1cG9fdHlwX3Vwbz10eXBfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIHBvaHlidVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBvX2t0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ1cG9fa3RnX3Vwbz1rdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogRnVjVXRpbHMuZ2V0RnVjY3Vwb0l0ZW1UZW1wbGF0ZSh0aGlzKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlBsYXRieVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlZTIHBsYXRieVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoRWtvLkZpbHRlcnMuZ2V0U3RyaW5nT3BlcmF0b3JzKCkpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwbGFfdnNcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLUyBwbGF0YnlcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBsYV9rc1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNTIHBsYXRieVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGxhX3NzXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiB1IMO6xI10xa8ganNvdSB6YXTDrW0gemR2b2plbsOpIGhvZG50b3kgKGtvbWJpbm92YW7DqSBhIHp2bMOhxaHFpSkgLSBuZWNoYXQgamVuIGplZG55P1xyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlZsYXN0bsOtIMO6xI1ldCBwbGF0YnlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXZsKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBsYV92bF91Y2V0X2tvbWJcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJwbGFfYnVfdmw9YnVfdmwscGxhX3NrX3ZsPXNrX3ZsLGlnbm9yZV9pY29fYnU9aWNvLGlnbm9yZV91Y3NfYnU9dWNzLGlnbm9yZV9yb2tfYnU9cm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogWzEwMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhpcy5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhpcy5Sb2tcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZm9ybcOhdCB0YWssIGFieSB0byB2eXBhZGFsbyBzdGVqbsSbIGpha28gdSB2bGFzdG7DrWhvIMO6xI10dSAobWV6ZXJ5IHUgbG9tw610a2EpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQ2l6w60gw7rEjWV0IHBsYXRieVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGxhX2NpX3VjZXRfa29tYlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkRhdHVtIHNwbGF0bm9zdGkgcGxhdGJ5IG9kLWRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwbGFfZGF0X3NwbFwiXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEYXR1bSB6YXBsYWNlbsOtIHBsYXRieSBvZC1kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGxhX2RhdF96YXBcIlxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCLEjMOhc3RrYSBwbGF0Ynkgb2QtZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBsYV9jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiAkLmV4dGVuZChHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkZWZhdWx0VmFsdWU6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgw7pocmFkeVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y2N1aHIoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGxhX3NfdWhycFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInBsYV9zX3VocnA9c191aHJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWnDFr3NvYiDDumhyYWR5XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY2l6cCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwbGFfenBcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJwbGFfenA9enBcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuSmVJaXNzcCkgZmlsdGVyRm9ybURlZlxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjI0MTAwMzI1XCIpIC8vUkMgMjQxMDAzMjUgOiBJSVNTUFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAzMjZcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgLy9SQyAyNDEwMDMyNiA6IElEIFJJU1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBvX2lkX2hkcl9yaXNcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMzI3XCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IC8vUkMgMjQxMDAzMjcgOiDFmC4gUklTXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1cG9fcmFkZWtfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHbDvXNsZWRuw6kgZm9ybXVsw6HFmWUgcyBmaWx0cnlcclxuICAgICAgICAgICAgcmV0dXJuIFtmaWx0ZXJGb3JtRGVmXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgem3Em255IGhvZG5vdHkgdSBmaWx0cnUgcyBqZWRub3UgaG9kbm90b3UgKG11bHRpIHBvbGUgc2UgY2hvdsOhIGpha28gc2luZ2xlIGEgamUgbW/Fvm7DqSBtecWhw60gb2R2eWJyYXQgaG9kbm90dSlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBwcnZla1xyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBldiBldiB6IHVkw6Fsb3N0aSBjaGFuZ2VcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gY2hhbmdlT2JqIGNoYW5nZU9iaiB6IHVkw6Fsb3N0aSBjaGFuZ2VcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWVdIG7DoXpldiBwb2xvxb5reSB2IERUTyAoam1lbnVqZS1saSBzZSBqaW5hayBuZcW+IG5hbWUpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJBbm9OZUNoYW5nZShuYW1lOiBzdHJpbmcsIGV2OiBhbnksIGNoYW5nZU9iajogYW55LCByZWFkZXJOYW1lPzogc3RyaW5nKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlT2JqPy52YWx1ZT8ubGVuZ3RoICE9IG51bGwgJiYgY2hhbmdlT2JqPy52YWx1ZT8ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8genZvbGVuw6EgbcWvxb5lIGLDvXQgcG91emUgamVkbmEgaG9kbm90YSAoamUgdG8gc2ltdWxhY2UgbmUtbXVsdGkgcmXFvmltdSwga3RlcsOhIGFsZSB1bW/FvsWIb3Z1IG15xaHDrSBvZHZ5YnJhdCB2xaFlY2hueSBob2Rub3R5KVxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1NpbmdsZVZhbCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY2hhbmdlT2JqPy52YWx1ZS5mb3JFYWNoKCh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZbcmVhZGVyTmFtZSA/PyBuYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzW1wiY3VycmZpbHRlcl9cIiArIG5hbWVdID8/IFtdKS5mb3JFYWNoKChuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobltyZWFkZXJOYW1lID8/IG5hbWVdICE9IG51bGwgJiYgbltyZWFkZXJOYW1lID8/IG5hbWVdICE9PSB2W3JlYWRlck5hbWUgPz8gbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTaW5nbGVWYWxbcmVhZGVyTmFtZSA/PyBuYW1lXSA9IHZbcmVhZGVyTmFtZSA/PyBuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3U2luZ2xlVmFsW3JlYWRlck5hbWUgPz8gbmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGV2LnRhcmdldCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3U2luZ2xlVmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzW1wiY3VycmZpbHRlcl9cIiArIG5hbWVdID0gJChldi50YXJnZXQpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBNZW51XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlem5hbSBha2PDrSBwcm8gbWVudSAoaGFtYnVyZ2VyIG5lYm8ga29udGV4dG92w6kgbWVudSBncmlkdSlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbnRleHRNZW51IGZvcm3DoXQgcHJvIGtvbnRleHRvdsOpIG1lbnUgZ3JpZHUgKHRydWUgKGRlZmF1bHQpID0gYW5vLCBmYWxzZSA9IG5lKVxyXG4gICAgICAgICAqIEBwYXJhbSB7SUdHcmlkQ2VsbENvbnRleHQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0bz59IFtjZWxsQ29udGV4dF0ga29udGV4dCB6IGdyaWR1IChwb3V6ZSBwcm8gY29udGV4dE1lbnUgPSB0cnVlKSAoZGVmYXVsdCA9IHVuZGVmaW5lZClcclxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBzZXpuYW0gYWtjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldE1lbnVBY3Rpb25zKGNvbnRleHRNZW51OiBib29sZWFuID0gZmFsc2UsIGNlbGxDb250ZXh0PzogSUdHcmlkQ2VsbENvbnRleHQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0bz4pOiBhbnkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHRNZW51XHJcbiAgICAgICAgICAgICAgICA/IFtcclxuICAgICAgICAgICAgICAgICAgICBcImFjdERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0U3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RacnVzZW5pU3Rvcm5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RVemF2cmVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0WnJ1c2VuaVV6YXZyZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQcmVkYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQcmlkYXREb1Bvcm92bmFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0VGlza1wiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICA6IFtcclxuICAgICAgICAgICAgICAgICAgICBcImFjdERldGFpbCohXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNlbmlTdG9ybmFcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFV6YXZyZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RacnVzZW5pVXphdnJlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByZWRhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByaWRhdERvUG9yb3ZuYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RUaXNrKlwiXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBUaXNreVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWTDoW7DrSBwYXJhbWV0csWvIHRpc2t1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtJR1ByaW50QWN0aW9uUmVwb3J0U3RhcnRpbmd9IHJlcCBwYXJhbWV0cnkgdGlza3VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVwb3J0U3RhcnRpbmcocmVwOiBJR1ByaW50QWN0aW9uUmVwb3J0U3RhcnRpbmcpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gZmlsdHJ5IHBybyBwxZllZMOhbsOtIGRvIEMjIG1ldG9keVxyXG4gICAgICAgICAgICByZXAuY3VzdG9tRHRvID0gdGhpcy4kZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IHNlIG5hc3RhdnVqw60gYcW+IHYgQyNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=