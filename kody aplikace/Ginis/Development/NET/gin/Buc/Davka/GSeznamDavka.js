"use strict";
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
            let gcontent = Decorators.gcontent;
            /**
             * Pouziti enumu actionNames
             *
             * @author vblabla
             * @since 490.1.0.36
             */
            let actionNames;
            (function (actionNames) {
                actionNames["actPodpisy"] = "actPodpisy";
                //actObsah = "actObsah", - Bude součástí detailu dávky
                actionNames["actDokoncit"] = "actDokoncit";
                actionNames["actStav"] = "actStav";
                actionNames["actHistorie"] = "actHistorie";
                actionNames["actPodepsat"] = "actPodepsat";
                actionNames["actOdeslat"] = "actOdeslat";
                actionNames["actStorno"] = "actStorno";
                actionNames["actPridatDoPorovnani"] = "actPridatDoPorovnani";
            })(actionNames || (actionNames = {}));
            /**
             * Seznam generovanych davek prikazu k uhrade
             *
             * @author vblabla
             * @since 490.1.0.14
             */
            let GSeznamDavka = class GSeznamDavka extends Gordic.GContentBase {
                // vlastnosti z C#
                // definice view pro grid - test
                //private viewDavky: Gordic.Isl.View<Gordic.Buc.Interface.GDavkaDto>;
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    that.call("VlozitVsechnyDavkyDoPracSeznamu", { filters: [] }).then((dataIkc) => {
                        that.ikc = dataIkc;
                        // akce seznamu
                        this.actions.addRange({
                            actDetail: Gordic.Eko.Action.actionDetail({ run: function () { that.detail(); }, enabled: true }),
                            actPodepsat: new GAction({ name: actionNames.actPodepsat, caption: "jres:33140079", run: function () { that.podepsatDavky(true); }, enabled: true /*(that.permissions?.LzePodepsat.value ? true : false)*/, visible: true }), //RC 33140079 : Podepsat
                            actPodpisy: new GAction({ name: actionNames.actPodpisy, caption: "jres:33140074", run: function () { that.openDetailPodpisy(); }, /*enabled: (that.permissions?.LzePodepsat ? true : false)*/ }), //RC 33140074 : Podpisy
                            actDokoncit: new GAction({ name: actionNames.actDokoncit, caption: "jres:33140076", run: function () { } }), //RC 33140076 : Dokončit
                            actStav: new GAction({ name: actionNames.actStav, caption: "jres:33140077", run: function () { } }), //RC 33140077 : Stav
                            actHistorie: new GAction({ name: actionNames.actHistorie, caption: "jres:33140078", run: function () { } }), //RC 33140078 : Historie
                            actOdeslat: new GAction({ name: actionNames.actOdeslat, caption: "jres:33140080", run: function () { that.odeslat(true); }, enabled: (that.permissions?.LzeOdeslat.value ? true : true), visible: true }), //RC 33140080 : Odeslat
                            actStorno: Gordic.Eko.Action.actionStornovat({ run: function () { that.storno(true); } }),
                            actPridatDoPorovnani: Gordic.Eko.Action.actionPridatDoPorovnani({ run: function () { WebClient.BucGrid.Comparator.add(that); }, enabled: true, visible: true }),
                        });
                        // menubar
                        this.menuBar(this.actions.createBar(this.getMenuActions()));
                        // flash se stavem knihy
                        Gordic.Eko.Utils.ShowEkoBookStateFlash(this);
                        // breadcrumbs
                        //this.setBreadcrumbs([{ caption: "Dávky", defaultAction: true }]);
                        // filtrační formulář pro filterpanel 
                        const filterFormDef = new Gordic.Forms.Form({ tabLabel: "jres:33140100" }) //RC 33140100 : Filtr dávek s příkazy do banky
                            .addSection("")
                            .addRow("jres:33140022") //RC 33140022 : Banka
                            .addField("gselectbox", Gordic.Prefabs.Select.bucspba(), {
                            name: "nazev_sbu", //name: "nazev_sbu",
                            //model: "sk_vl=sk_vl;sbu=sbu", //"sk_vl=sk_vl"
                            model: "model.sk_vl=value.sk_vl;model.sbu=value.sbu",
                            //validators: [new Gordic.Validators.Required],
                            disabled: false,
                            change: function (ev, changeObj) {
                                (changeObj.value ? that.bankaDto = changeObj.value : null);
                            }
                        })
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "number",
                            label: "jres:33140101",
                            name: "dat_vzn",
                            customOptFieldEnd: { model: "model.dat_vzn.start=value" },
                            customOptFieldStart: { model: "model.dat_vzn.end=value" },
                            customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null, modelValueTransform: { apply: function (modelValue) { return (modelValue < 0) ? modelValue * (-1) : modelValue; }, collect: function (fieldValue) { return (fieldValue != null) ? fieldValue.d[0] * (-1) : fieldValue; } } })
                        })) //RC 33140101 : Datum vzniku od-do
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "number",
                            label: "jres:33140102",
                            name: "dat_ode",
                            customOptFieldEnd: { model: "model.dat_ode.start=value" },
                            customOptFieldStart: { model: "model.dat_ode.end=value" },
                            customOptAll: $.extend(Gordic.Prefabs.Number.currency(), { defaultValue: null, modelValueTransform: { apply: function (modelValue) { return (modelValue < 0) ? modelValue * (-1) : modelValue; }, collect: function (fieldValue) { return (fieldValue != null) ? fieldValue.d[0] * (-1) : fieldValue; } } })
                        })) //RC 33140102 : Datum odeslání od-do
                            .addRow("jres:33140103") //RC 33140103 : Stav dávky příkazů
                            .addField("gselectbox", Gordic.Prefabs.Select.buccdpd(), {
                            name: "s_dpb",
                            model: "s_dpb=s_dpb",
                            dropdown: true,
                            itemWidth: "",
                            itemTooltipTemplate: "{s_dpb_txt}",
                            /* serverFilters: { typ_ag: Gordic.Buc.Globals.Enums.TypAgBuc.TypAgPovoleneBuc },*/
                        }); //RC 33140029 : Typ agendy
                        let filterParams = Gordic.Eko.Filters.getFilterParams([filterFormDef], ["nazev_sbu"], " ", //TODO: asi?
                        void 0, 
                        //(ev, ctx) => {
                        //},
                        void 0, null, false, that);
                        filterParams.filterViewMode = FilterViewMode.Normal;
                        filterParams.poVyhledaniZobrazit = "OblibenePodminky";
                        filterParams.collectData = (ev, ctx) => {
                        };
                        that.$filterForm = $.newDiv().appendTo(that.element)
                            .gfilterpanel(filterParams).on("gfilterpanelapply", function (event, obj) {
                            var actions = that.actions.getActions();
                            if (obj.filter.sk_vl !== null && obj.filter.sk_vl !== null) {
                                actions.filter(obj => {
                                    return obj.name === actionNames.actPodepsat;
                                })[0].visible(true);
                                actions.filter(obj => {
                                    return obj.name === actionNames.actOdeslat;
                                })[0].visible(true);
                            }
                        });
                        new Gordic.Data.Readers.Bucspba().getData().then(function (result) {
                            if (Gordic.Utils.WidgetExists("gfilterpanel", that.$filterForm) && result.length != 0) {
                                $(that.element).findFields("nazev_sbu").gfield("setValue", result[0]);
                                that.endOperation();
                            }
                        });
                        that.view = new Gordic.Isl.View(that.isl.DavkaPDB.list(rq => rq), {
                            filterPanel: that.$filterForm,
                            //key: that.PrimaryKey,
                            //startEmpty: false
                        });
                        // view
                        //that.viewDavky = new Gordic.Isl.View(that.isl.DavkaPDB.list(rq => { return { filters: {  } } }), { filterPanel: that.filterPanel, startEmpty: false });
                        // grid
                        $.newDiv("SeznamBuc")
                            .css("height", "100%")
                            .appendTo(that.element)
                            .ggrid(WebClient.BucGrid.Davka.getGridOptions(that, undefined, //gridFormat,
                        that.actions.actDetail, function (ev, obj) {
                            //// aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                            //if (that.previewController) {
                            //    if (obj != null && obj.cellInfo != null && obj.cellInfo.data != null) {
                            //        // TODO: pokud by bylo potřeba řešit nastavení okna po přesunu po gridu, tak to odkomentovat, ale práva záznamová práva se aktuálně neřeší
                            //        //that.enable();
                            //        that.previewController.enable(true);
                            //        that.previewController.show(obj.cellInfo.data);
                            //    }
                            //    else {
                            //        // TODO: může tohle vůbec nastat?
                            //        that.previewController.enable(false);
                            //    }
                            //}
                        }, (cellContext) => WebClient.BucGrid.getContextMenuParams(cellContext, (cellContext) => that.actions.createBar(that.getMenuActions(true, cellContext))), 
                        // TODO: přidat data do metod getGridOptions? asi ano, protože view budu předávat všude
                        {
                            data: that.view,
                            selection: function (ev, obj) {
                                // aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                                if (that.previewController) {
                                    if (obj != null && obj.getSelection()[0] != null && obj.getSelection()[0] != null) {
                                        // TODO: pokud by bylo potřeba řešit nastavení okna po přesunu po gridu, tak to odkomentovat, ale práva záznamová práva se aktuálně neřeší
                                        //that.enable();
                                        that.previewController.enable(true);
                                        that.previewController.show(obj.getSelection()[0]);
                                    }
                                    else {
                                        // TODO: může tohle vůbec nastat?
                                        that.previewController.enable(false);
                                    }
                                }
                            }
                        })
                        //{
                        //    columnMode: "full",
                        //    //test přiřadit view do vlastnosti data: daného gridu
                        //    data: that.view,
                        //    multi: true,
                        //    // obslužná akce pro doubleclick pro zobrazení detailu platby
                        //    defaultAction: that.actions.actDetail,
                        //    // TODO: nebo použít selection místo cellActivate?
                        //    cellActivate: function (ev, obj) {
                        //        // aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                        //        if (obj != null && obj.cellInfo != null && obj.cellInfo.data != null) {
                        //            that.enable();
                        //            that.previewController.enable(true);
                        //            that.previewController.show(obj.cellInfo.data);
                        //        } else {
                        //            // TODO: může tohle vůbec nastat?
                        //            that.previewController.enable(false);
                        //        }
                        //    },
                        //    // TODO: upravit:
                        //    //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                        //    columns: BucGrid.Davka.createGridFormat(that)
                        //}
                        )
                            .ggrideko({
                            // součtový řádek
                            summaryRowAllowed: true,
                            // dlouhý seznam
                            longListAllowed: true,
                            longListCountMethod: (rq) => that.isl.DavkaPDB.listCount(rq).get(),
                            longListModifyRqMethod: (rq) => WebClient.BucGrid.modifyListRequest(that, rq)
                        })
                            .gautofit();
                        // obsluha změny v gridu
                        that.view.on("change", function (ev, ctx) {
                            that.enable();
                        });
                        let focusFunc = function () {
                            that.element.find(".SeznamBuc.ggrid").ggrid("focus");
                            that.view.off("change.focus", focusFunc);
                        };
                        that.view.on("change.focus", focusFunc);
                        // náhled v pravém bočním panelu
                        that.element.gsidebar("option", { right: { width: 200, visible: false, leafsAutoHide: false, pinned: true } });
                        let previewPanelsDefinition = {
                            tabs: [
                                Gordic.Previews.getDefaultPreviewTab({
                                    //linkProvider: function (loadParams) { return Gordic.WebApp.Utility.createCommandUrl(null, "OpenDetail", { ixp: loadParams.pla_ixp }, { ticketType: Gordic.Enums.TicketType.WithLoginAndContext }) },
                                    viewId: "buc:Davka"
                                }),
                                Gordic.Previews.getFilePreviewTab({
                                    ixpProvider: function (loadParams) { return loadParams.ixp_dav; }
                                })
                            ]
                        };
                        that.previewController = new Gordic.Previews.GPreviewController(that.element, previewPanelsDefinition);
                        that.previewController.registerPanel();
                        // porovnání
                        WebClient.BucGrid.Comparator.create(that);
                        //// náhled v pravém bočním panelu
                        //this.element.gsidebar("option", { right: { width: 200, visible: false, leafsAutoHide: false } });
                        //let previewPanelsDefinition = {
                        //    tabs: [
                        //        Gordic.Previews.getDefaultPreviewTab({
                        //            //linkProvider: function (loadParams) { return Gordic.WebApp.Utility.createCommandUrl(null, "OpenDetail", { ixp: loadParams.pla_ixp }, { ticketType: Gordic.Enums.TicketType.WithLoginAndContext }) },
                        //            viewId: "buc:Platba"
                        //        }),
                        //        Gordic.Previews.getFilePreviewTab({
                        //            ixpProvider: function (loadParams) { return loadParams.ixp; }
                        //        })
                        //    ]
                        //}
                        //this.previewController = new Gordic.Previews.GPreviewController(this.element, previewPanelsDefinition);
                        //this.previewController.registerPanel();
                        //To do - oprávnění
                        //this.isl.DavkaPDB.getServicePermissions()
                        //    .get()
                        //    .done(function (perm) {
                        //        // oprávnění (bez naplnění seznamu)
                        //        that.permissions = perm;
                        //        // nastavení okna
                        //        that.enable();
                        //  });
                        // nastavení okna
                        //this.enable();
                        //Označení potřebných polí jako required
                        //Gordic.Utils.Form.markRequired(that.findForms());
                    });
                }
                ///**
                // * Naplnění seznamu plateb případů
                // * 
                // * @param {any} [filterModel] aktuální filtry
                // */
                //private nacteniSeznamu(filterModel?: any): void {
                //    let that = this;
                //    // načtení dat do gridu
                //    if (filterModel === undefined || filterModel === null) {
                //        this.$filterForm.gfilterpanel("applyFilter");
                //        // nastavení okna
                //        that.enable();
                //    }
                //    else {
                //        // načtení dat do seznamu
                //        filterModel = filterModel || {};
                //        // zapamatování aktuálního filtru kvůli tiskům
                //        this.currentFilter = filterModel;
                //        // načtení seznamu
                //        // objekt pro předávání hodnot
                //        interface returnObjType {
                //            data: Gordic.Buc.Interface.GDavkaPDBDto[] | null
                //        };
                //        let returnObj: returnObjType = {
                //            data: null
                //        };
                //        // deferred objekt pro zřetězení otázek
                //        let def = $.Deferred().resolve(returnObj).promise();
                //        // obsluha jednotlivých fází
                //        this.beginOperation("Načítám data");
                //        def.then(function (returnObj: returnObjType) {
                //            let def = $.Deferred();
                //            // načtení dat
                //            /*Gordic.Isl*/
                //            that.isl.DavkaPDB.list(rq => { return { filters: that.currentFilter! }; })
                //                .get()
                //                .then(function (response) {
                //                    returnObj.data = response.data;
                //                    //that.permissions = <Gordic.Buc.Interface.GDavkaServicePermission>response.servicePermissions;
                //                    def.resolve(returnObj);
                //                })
                //                .fail(function () {
                //                    // operace nedopadla
                //                    def.reject();
                //                });
                //            return def.promise();
                //        })
                //            .then(function (returnObj: returnObjType) {
                //                let def = $.Deferred();
                //                // úprava dat
                //                BucGrid.Davka.modifyDto(returnObj.data)
                //                    .done(function (data) {
                //                        returnObj.data = data;
                //                        def.resolve(returnObj);
                //                    });
                //                return def.promise();
                //            })
                //            .done(function (returnObj: returnObjType) {
                //                // pohled
                //                let view = new Gordic.Data.View(returnObj.data!, { key: "ixp,radek_uhr" });
                //                // nastavení dat a překreslení gridu
                //                that.element.find(".SeznamBuc.ggrid").ggrid("setData", view);
                //                // nastavení okna
                //                that.enable();
                //            })
                //            .always(function () {
                //                that.endOperation();
                //            });
                //    }
                //}
                ///**
                // * Naplnění jednoho řádku do seznamu plateb
                // * 
                // * @param {any} filterPK filtr pro aktualizaci dat
                // * @param {any} $grid (default = undefined) grid, který má být aktualizován (vždy je navíc aktualizován základní seznamový grid)
                // */
                //private nacteniRadku(filterPK: any, $grid: any = undefined): void {
                //    let that = this;
                //    // volání obecné metody pro načtení řádku
                //    BucGrid.reloadRow(
                //        that,
                //        (rq) => { return that.isl.DavkaPDB.list(rq); },
                //        BucGrid.Banka.modifyDto,
                //        () => that.enable(),
                //        filterPK,
                //        $grid
                //    );
                //}
                ///**
                // * Zobrazení detailu platby případu
                // */
                //private detail(): void {
                //    let that = this;
                //    // aktuální vybraná položka
                //    const $grid = this.element.find(".SeznamBuc.ggrid");
                //    const aktRadek = $grid.ggrid<Gordic.Buc.Interface.GBankaDto>("activeRow");
                //    if (aktRadek && !(aktRadek instanceof jQuery)) {
                //        // otevření detailu
                //        let $detailWindow = this.navigate(["Gordic.Buc.WebClient.GDetailDavka", { gridRemoteControl: new Gordic.Components.GridRC($grid) }], {
                //            Ico: aktRadek.ico,
                //            Ucs: aktRadek.ucs,
                //            IxsEsu: aktRadek.ixs_esu,
                //            Sbu: aktRadek.sbu
                //        });
                //        // obsluha aktivní operace na detailu
                //        $.content($detailWindow).on(BucDetail.triggerChange, (retVal: any) => {
                //            //záznam byl změně, musí se načíst znovu
                //            if (retVal != null && retVal.data && retVal.data.ixs_esu && retVal.data.sbu && retVal.data.ixs_esu != null && retVal.data.sbu != null) {
                //                that.nacteniRadku({ ixs_esu: retVal.data.ixs_esu, sbu: retVal.data.sbu });
                //            }
                //        });
                //    }
                //}
                //**
                //* Zobrazení detailu davky
                //*/
                detail() {
                    let that = this;
                    // aktuální vybraná položka
                    const $grid = this.element.find(".SeznamBuc.ggrid");
                    const aktRadek = $grid.ggrid("activeRow");
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        // otevření detailu
                        let $detailWindow = this.navigate(["Gordic.Buc.WebClient.GDetailDavkaPDB", { gridRemoteControl: new Gordic.Components.GridRC($grid) }], {
                            ID: 'DetailDavkaPDB#',
                            ixp_dav: aktRadek?.ixp_dav
                        });
                    }
                }
                /**
                 * Zobrazení detailu dávky
                 *
                 * @param {GContent} content content
                 * @param {Gordic.Buc.Interface.GDavkaPDBDto} row aktuální řádek
                 * @param {BucGrid.openDetailWizardParams} [wizard] parametry průvodce (v případě volání detailu z průvodce)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                openDetail(content, row, wizard) {
                    let that = this;
                    // zásobník změněných záznamů
                    let changedRows = [];
                    // otevření detailu
                    let $detailWindow = content.navigate(["Gordic.Buc.WebClient.GDetailDavkaPDB", { /*gridRemoteControl: new Gordic.Components.GridRC($grid)*/}], {
                        ID: 'DetailDavkaPDB#',
                        IxpDav: row?.ixp_dav
                    });
                    // obsluha aktivní operace na detailu
                    $.content($detailWindow).on(WebClient.BucDetail.triggerChange, (retVal) => {
                        if (retVal?.data?.ixp_dav) {
                            // přidání do seznamu záznamů k občerstvení
                            if (changedRows.indexOf(retVal.data.ixp_dav) < 0)
                                changedRows.push(retVal.data.ixp_dav);
                        }
                    });
                    // obsluha ukončení okna
                    $detailWindow.on("closed", (retVal) => {
                        // nastavení fokusu (jen pokud není průvodce)
                        if (!wizard)
                            that.element.find(".SeznamBuc.ggrid").ggrid("focus");
                        // aktualizace změněných záznamů (v hlavním seznamu i případně v průvodci)
                        if (changedRows?.length > 0) {
                            // nastavení aktivní operace
                            if (wizard && wizard.setActiveOperation != undefined && typeof (wizard.setActiveOperation) === "function") {
                                wizard.setActiveOperation();
                            }
                            // aktualizace základního gridu
                            that.view.requestData({ filters: { ixp_dav: changedRows }, onlyPKWithoutFilters: true }, { updateMode: "update" })
                                .done(function () {
                                // nastavení aktuálního řádku
                                if (retVal?.returnValue?.ixp_dav) {
                                    that.element.find(".SeznamBuc.ggrid").ggrid("activeRow", { ixp_dav: retVal.returnValue.ixp_dav });
                                }
                                // v případě průvodce i aktualizace gridu v průvodci
                                if (wizard) {
                                    WebClient.BucWizard.reloadRows((rq) => { return that.isl.DavkaPDB.list(rq); }, { ixp_dav: changedRows }, wizard.grid)
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
                 * To do: Akce podpisy
                 */
                podpisy() {
                    // aktuální platba
                    const aktZaznam = this.element.find(".SeznamBuc.ggrid").ggrid("activeRow");
                }
                /**
                 * Storno / zrušení storna vybraných dávek
                 *
                 * @param {boolean} stornovat (default = true) stornovat (true) nebo zrušit storno (false)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                storno(stornovat = true) {
                    let that = this;
                    ;
                    // volání průvodce
                    return that.wizardTwoSteps({
                        id: "StornoDavkyPDB#",
                        texts: {
                            title: "Storno",
                            description: "Akce stornuje vybrané (zaškrtnuté) dávky. Po jejím provedení budou tyto dávky ve stavu 'stornován'",
                            formTabTitle: "Parametry storna",
                            operationAction: that.actions.actStorno.caption,
                        },
                        parameters: {
                            form: new Gordic.Forms.Form({ name: "wizParams" }).addSection().addRow("Důvod").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()], smartNavNextElement: function (cur, next) { return $.content(this)?.element.find("button[data-param-id='checkAct']")[0]; } }),
                            model: { duvod: null },
                            toOperationDto: (model, data, ikc) => {
                                return {
                                    ikc: ikc,
                                    rows: data,
                                    stornovat: stornovat,
                                    duvod: (model != null && model.duvod != null ? model.duvod : "nezadán")
                                };
                            },
                        },
                        actions: {
                            islCheckBeforeOperation: (dto) => { return that.isl.DavkaPDB.zkontrolujPredStornem(dto); },
                            islOperation: (dto) => { return that.isl.DavkaPDB.hromadneStornuj(dto); },
                        },
                        end: {
                            callingAction: that.actions.actStorno
                        }
                    });
                }
                /**
                 * Odeslání vybraných dávek
                 *
                 * @param {boolean} stornovat (default = true) odelat (true) nebo zrušit odelani (false)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                odeslat(odeslat = true) {
                    const that = this;
                    ;
                    //Vybrane radky
                    const vybraneRadky = this.element.find(".SeznamBuc.ggrid").ggrid("getSelection");
                    //if (that.bankaDto.sk_vl != undefined) {
                    that.navigate("Gordic.Buc.WebClient.GOdeslaniDavka", { vybraneRadky: vybraneRadky, bankaDto: that.bankaDto, ikc: that.ikc })
                        .on("close", function (ev, retValue) {
                        that.view.requestData();
                    });
                    //To do: volání průvodce pro odeslani davky/davek (podle vzoru pro storno davek)
                    //return that.wizardTwoSteps<Gordic.Buc.Interface.GDavkaPDB.StornoOperationDto, stornoModel>(
                    //    {
                    //        id: "OdeslaniDavkyPDB#",
                    //        texts: {
                    //            title: "Storno",
                    //            description: "Akce stornuje vybrané (zaškrtnuté) dávky. Po jejím provedení budou tyto dávky ve stavu 'stornován'",
                    //            formTabTitle: "Parametry storna",
                    //            operationAction: that.actions.actStorno!.caption,
                    //        },
                    //        parameters: {
                    //            form: new Gordic.Forms.Form({ name: "wizParams" }).addSection().addRow("Důvod").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()], smartNavNextElement: function (cur, next) { return $.content(this)?.element.find("button[data-param-id='checkAct']")[0]; } }),
                    //            model: { duvod: null },
                    //            toOperationDto: (model, data, ikc) => {
                    //                return {
                    //                    ikc: ikc,
                    //                    rows: data,
                    //                    stornovat: stornovat,
                    //                    duvod: (model != null && model.duvod != null ? model.duvod : "nezadán")
                    //                };
                    //            },
                    //        },
                    //        actions: {
                    //            islCheckBeforeOperation: (dto) => { return that.isl.DavkaPDB.zkontrolujPredStornem(dto); },
                    //            islOperation: (dto) => { return that.isl.DavkaPDB.hromadneStornuj(dto); },
                    //        },
                    //        end: {
                    //            callingAction: that.actions.actStorno
                    //        }
                    //    }
                    //);
                }
                /**
                 * Podepsání vybraných dávek
                 *
                 * @param {boolean} podepsat (default = true) odelat (true) nebo zrušit podepsani (false)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                podepsatDavky(podepsat = true) {
                    const that = this;
                    //Vybrane radky
                    const vybraneRadky = this.element.find(".SeznamBuc.ggrid").ggrid("getSelection");
                    //if (that.bankaDto.sk_vl != undefined) {
                    var def = $.Deferred();
                    that.actions.actPodepsat?.setPending(def.promise());
                    that.navigate("Gordic.Buc.WebClient.GPodepsaniDavka", { vybraneRadky: vybraneRadky, davkaDto: that.bankaDto })
                        .on("close", function (ev, retValue) {
                        that.view.requestData();
                        return def.reject();
                    });
                    // parametry operace
                    //interface podpisModel {
                    //    duvod: string | null
                    //};
                    //// volání průvodce
                    //return that.wizardTwoSteps<Gordic.Buc.Interface.GDavkaPDBPodpisOperationDto, podpisModel>(
                    //    {
                    //        id: "PodpisDavkyPDB#",
                    //        texts: {
                    //            title: "Podepsání",
                    //            description: "Akce podepíše vybrané (zaškrtnuté) dávky. Po jejím provedení budou tyto dávky ve stavu 'podepsáno'",
                    //            formTabTitle: "Parametry podpisu",
                    //            operationAction: that.actions.actPodepsat!.caption,
                    //        },
                    //        parameters: {
                    //            form: new Gordic.Forms.Form({ name: "wizParams" }).addSection().addRow("Důvod").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()], smartNavNextElement: function (cur, next) { return $.content(this)?.element.find("button[data-param-id='checkAct']")[0]; } }),
                    //            model: { duvod: null },
                    //            toOperationDto: (model, data, ikc) => {
                    //                return {
                    //                    ikc: ikc,
                    //                    rows: data,
                    //                    podepsat: podepsat,
                    //                    duvod: (model != null && model.duvod != null ? model.duvod : "nezadán")
                    //                };
                    //            },
                    //        },
                    //        actions: {
                    //            islCheckBeforeOperation: (dto) => { return that.isl.DavkaPDB.zkontrolujPredStornem(dto); },
                    //            islOperation: (dto) => { return that.isl.DavkaPDB.hromadneStornuj(dto); },
                    //        },
                    //        end: {
                    //            callingAction: that.actions.actPodepsat
                    //        }
                    //    }
                    //);
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    //// aktuální platba
                    //const aktZaznam = this.element.find(".SeznamBuc.ggrid").ggrid<Gordic.Buc.Interface.GDavkaPDBDto>("activeRow");
                    // jsou nějaké řádky?
                    const isEmpty = !(this.view.getCount("data") > 0);
                    // akce seznamu
                    const permEmptyGrid = WebClient.BucGrid.getEmptyGridPermission();
                    const acts = this.actions;
                    const perms = this.Permissions;
                    ///acts.actDetail!.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeZobrazit);
                    acts.actStorno.updatePermission(isEmpty ? permEmptyGrid : perms?.LzeStornovat);
                }
                /**
                 * Průvodce nad seznamem dávek <DTO operace, model parametrů>
                 *
                 * @param {BucWizard.IGBucWizardparams<TOperationDto, TModel, Buc.Interface.GDavkaPDBDto> | BucWizard.IGBucWizardparamsPart<TOperationDto, TModel, Buc.Interface.GDavkaPDBDto>} params část parametrů průvodce
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                wizardTwoSteps(params) {
                    let that = this;
                    // TODO: dočasné řešení fragmentů - je ale je nutné předat do metody wizardGetData
                    let gridFormat = Gordic.Buc.WebClient.BucGrid.Davka.createGridFormat(that, true);
                    let fragments = WebClient.BucWizard.getFragmentsFromGridFormat(gridFormat, true);
                    // volání obecného BUC průvodce
                    return WebClient.BucWizard.wizardTwoSteps(this, $.extend(true, {
                        texts: {
                            formTabTitle: "Vybrané dávky",
                        },
                        grid: {
                            format: gridFormat,
                            keys: that.PrimaryKey,
                            profile: (that.element.find(".SeznamBuc.ggrid").ggrid("getCurrentProfile")),
                        },
                        actions: {
                            getData: (withResults, ikc, response) => { return that.wizardGetData(withResults, withResults, ikc, fragments, response); },
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
                 * Vrátí seznam dávek pro zobrazení v průvodcích pro hromadné operace
                 *
                 * @param {boolean} onlyChecked pouze zaškrtnuté řádky (true = ano, false = ne)
                 * @param {boolean} withResults doplnění výsledků hromadné operace (true = ano, false = ne)
                 * @param {Gordic.General.GIkc} ikc IKC
                 * @param {string[] | undefined} fragments fragmenty
                 * @param {Gordic.Isl.GServiceGroupResponse<Gordic.Buc.Interface.GDavkaPDBDto>} [response] výsledek hromadné operace
                 * @returns {JQueryPromise<(Gordic.Eko.Components.MassOperationData<Gordic.Buc.Interface.GDavkaPDBDto> | Gordic.Buc.Interface.GDavkaPDBDto)[]>} seznam dávek (s výsledky operace nebo bez podle parametru withResults)
                 */
                wizardGetData(onlyChecked, withResults, ikc, fragments, response) {
                    let that = this;
                    //// TODO: je to jen pokus jak skrýt tlačítko, ale není to kde vyvolat, takže se to bude muset obsloužit v komponentě průvodce
                    //$(".gbutton [aria-label='Zkontrolovat']").hide();
                    // filtry podle režimu knihy
                    // TODO: jsou vůbec potřeba, když je tam hlavní filtr přes wfltpre?
                    let filters = {};
                    if (that.ekoBookFilter?.ixp_den)
                        $.extend(filters, { ixp_den: that.ekoBookFilter.ixp_den });
                    if (that.ekoBookFilter?.rok)
                        $.extend(filters, { rok_den: that.ekoBookFilter.rok });
                    // volání obecné metody pro načtení dat do průvodce
                    return WebClient.BucWizard.getData(that, onlyChecked, withResults, ikc, filters, (rq) => { return that.isl.DavkaPDB.list(rq); }, undefined, response, that.PrimaryKey, fragments);
                }
                /**
                 * Občerství seznam a překontroluje data (oboje volitelně)
                 *
                 * @param {GContent} cnt content
                 * @param {boolean} reloadData mají se načíst aktuální data z databáze? (true = ano, false = ne)
                 * @param {Gordic.Buc.Interface.GDavkaPDBDto[] | undefined} data data pro případ, že se nemají načítat z databáze (reloadData = false)
                 * @param {Gordic.General.GIkc} ikc IKC
                 * @param {string[] | undefined} fragments fragmenty
                 * @param {((dto: TOperationDto) => any) | undefined} checkAction delegát pro kontrolu dat před operací (pokud není, nevolá se kontrola, jen se načtou aktuální data)
                 * @param {(model: TModel | undefined, data: Gordic.Buc.Interface.GDavkaPDBDto[], ikc: Gordic.General.GIkc) => TOperationDto} toOperationDto delegát pro vytvoření DTO operace
                 * @param {TModel | undefined} model model
                 * @returns {JQueryPromise<Gordic.Eko.Components.MassOperationData<Gordic.Buc.Interface.GDavkaPDBDto>[]>} seznam dávek (s výsledky operace nebo bez podle parametru withResults)
                 */
                wizardRefreshAndCheckData(cnt, reloadData, data, ikc, fragments, checkAction, toOperationDto, model) {
                    let that = this;
                    // volání obecné metody občerstvení seznamu a kontrolu dat
                    return WebClient.BucWizard.refreshAndCheckData(cnt, reloadData, data, ikc, (withResults, ikc) => { return that.wizardGetData(false, withResults, ikc, fragments); }, checkAction, toOperationDto, model);
                }
                /**
                 * Seznam akcí pro menu (hamburger nebo kontextové menu gridu)
                 *
                 * @param {boolean} contextMenu formát pro kontextové menu gridu (true (default) = ano, false = ne)
                 * @param {IGGridCellContext<Gordic.Buc.Interface.GDavkaPDBDto>} [cellContext] kontext z gridu (pouze pro contextMenu = true) (default = undefined)
                 * @returns {any} seznam akcí
                 */
                getMenuActions(contextMenu = false, cellContext) {
                    return contextMenu
                        ? [
                            "actDetail",
                            "actPodpisy",
                            "actDokoncit",
                            "actStav",
                            "actHistorie",
                            "actPodepsat",
                            "actOdeslat",
                            "actStorno",
                            "actPridatDoPorovnani"
                        ]
                        : [
                            { action: this.actions.actDetail, primary: true, favorite: true },
                            "actPodpisy*",
                            "actDokoncit*",
                            "actStav*",
                            "actHistorie*",
                            "actPodepsat",
                            "actOdeslat",
                            "actStorno*",
                            "actPridatDoPorovnani"
                        ];
                }
                /**
                 * openDetailPodpisy - Otevření dialogu s podpisy generované dávky
                 */
                openDetailPodpisy() {
                    const that = this;
                    var selection = that.element.find(".SeznamBuc.ggrid").ggrid("getSelection");
                    that.dialogs.showModalWindow("Gordic.Buc.WebClient.GPodpisyDlg", { ixp: selection[0].ixp_dav, ixb: selection[0].ixb, poc_pod: selection[0].poc_pod }, { width: 850, height: 400 })
                        .createDialogPromise((r) => !!r)
                        .then((data) => {
                        that.view.requestData();
                    });
                }
            };
            GSeznamDavka = __decorate([
                gcontent
            ], GSeznamDavka);
            WebClient.GSeznamDavka = GSeznamDavka;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbURhdmthLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbURhdmthLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EwNkJmO0FBMTZCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwNkJuQjtJQTE2QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTA2QjdCO1FBMTZCb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkM7Ozs7O2VBS0c7WUFDSCxJQUFLLFdBVUo7WUFWRCxXQUFLLFdBQVc7Z0JBQ1osd0NBQXlCLENBQUE7Z0JBQ3pCLHNEQUFzRDtnQkFDdEQsMENBQTJCLENBQUE7Z0JBQzNCLGtDQUFtQixDQUFBO2dCQUNuQiwwQ0FBMkIsQ0FBQTtnQkFDM0IsMENBQTJCLENBQUE7Z0JBQzNCLHdDQUF5QixDQUFBO2dCQUN6QixzQ0FBdUIsQ0FBQTtnQkFDdkIsNERBQTZDLENBQUE7WUFDakQsQ0FBQyxFQVZJLFdBQVcsS0FBWCxXQUFXLFFBVWY7WUFFRDs7Ozs7ZUFLRztZQUVILElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxPQUFBLFlBQTRJO2dCQTJDMUssa0JBQWtCO2dCQUVsQixnQ0FBZ0M7Z0JBQ2hDLHFFQUFxRTtnQkFHckU7O21CQUVHO2dCQUNJLGNBQWM7b0JBQ2pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBc0IsaUNBQWlDLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDaEcsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUE7d0JBQ2xCLGVBQWU7d0JBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7NEJBQ2xCLFNBQVMsRUFBRSxNQUFNLENBQUMs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QTA2Qm5CO0FBQUQsQ0FBQyxFQTE2QlMsTUFBTSxLQUFOLE1BQU0sUUEwNkJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5CdWMuV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3V6aXRpIGVudW11IGFjdGlvbk5hbWVzXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdmJsYWJsYVxyXG4gICAgICogQHNpbmNlIDQ5MC4xLjAuMzZcclxuICAgICAqL1xyXG4gICAgZW51bSBhY3Rpb25OYW1lcyB7XHJcbiAgICAgICAgYWN0UG9kcGlzeSA9IFwiYWN0UG9kcGlzeVwiLFxyXG4gICAgICAgIC8vYWN0T2JzYWggPSBcImFjdE9ic2FoXCIsIC0gQnVkZSBzb3XEjcOhc3TDrSBkZXRhaWx1IGTDoXZreVxyXG4gICAgICAgIGFjdERva29uY2l0ID0gXCJhY3REb2tvbmNpdFwiLFxyXG4gICAgICAgIGFjdFN0YXYgPSBcImFjdFN0YXZcIixcclxuICAgICAgICBhY3RIaXN0b3JpZSA9IFwiYWN0SGlzdG9yaWVcIixcclxuICAgICAgICBhY3RQb2RlcHNhdCA9IFwiYWN0UG9kZXBzYXRcIixcclxuICAgICAgICBhY3RPZGVzbGF0ID0gXCJhY3RPZGVzbGF0XCIsXHJcbiAgICAgICAgYWN0U3Rvcm5vID0gXCJhY3RTdG9ybm9cIixcclxuICAgICAgICBhY3RQcmlkYXREb1Bvcm92bmFuaSA9IFwiYWN0UHJpZGF0RG9Qb3Jvdm5hbmlcIixcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlem5hbSBnZW5lcm92YW55Y2ggZGF2ZWsgcHJpa2F6dSBrIHVocmFkZVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHZibGFibGFcclxuICAgICAqIEBzaW5jZSA0OTAuMS4wLjE0XHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1EYXZrYSBleHRlbmRzIEdDb250ZW50QmFzZTxCdWNHcmlkLklHU3RhbmRhcmRCdWNHcmlkPEJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvLCBCdWMuSW50ZXJmYWNlLkdEYXZrYVBEQlBlcm1pc3Npb24+ICYgR29yZGljLkVrby5VdGlscy5JR0Vrb0Jvb2tFeHRlbnNpb24+IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcmFkZWsgZ3JpZHUgdnlicmFueSBwcmVzIGRlZmF1bHRhY3Rpb24gIDExXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkUm93OiBhbnk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHXDoWxuw60gSUtDXHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5HZW5lcmFsLkdJa2N9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBpa2M6IEdvcmRpYy5HZW5lcmFsLkdJa2M7XHJcblxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBGaWx0ciBuYWQgZ3JpZGVtXHJcbiAgICAgICAgLy8gKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIGZpbHRlclBhbmVsOiBKUXVlcnk7XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIEFrdHXDoWxuw60gaG9kbm90eSBmaWx0cnVcclxuICAgICAgICAvLyAqIEB0eXBlIHthbnl9XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgY3VycmVudEZpbHRlcjogYW55O1xyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBGaWx0ciBuYWQgZ3JpZGVtXHJcbiAgICAgICAgLy8gKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlICRmaWx0ZXJGb3JtOiBKUXVlcnk7XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIG92bGFkYcSNIHBybyBuw6FobGVkeVxyXG4gICAgICAgIC8vICogQHR5cGUge2FueX1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBwcmV2aWV3Q29udHJvbGxlcjogYW55O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIG9wcsOhdm7Em27DrSAoayBjZWzDqW11IHNlem5hbXUpXHJcbiAgICAgICAgKiBAdHlwZSB7R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthU2VydmljZVBlcm1pc3Npb24gfCB1bmRlZmluZWR9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHBlcm1pc3Npb25zRGF2a2E6IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQlBlcm1pc3Npb24gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIC8vLy8gZGVmaW5pY2UgdmlldyBwcm8gZ3JpZCAtIERhdmt5XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3RGF2a3k6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG8+O1xyXG5cclxuICAgICAgICAvLyB2bGFzdG5vc3RpIHogQyNcclxuXHJcbiAgICAgICAgLy8gZGVmaW5pY2UgdmlldyBwcm8gZ3JpZCAtIHRlc3RcclxuICAgICAgICAvL3ByaXZhdGUgdmlld0Rhdmt5OiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthRHRvPjtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuY2FsbDxHb3JkaWMuR2VuZXJhbC5HSWtjPihcIlZsb3ppdFZzZWNobnlEYXZreURvUHJhY1Nlem5hbXVcIiwgeyBmaWx0ZXJzOiBbXSB9KS50aGVuKChkYXRhSWtjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlrYyA9IGRhdGFJa2NcclxuICAgICAgICAgICAgICAgIC8vIGFrY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgICAgICBhY3REZXRhaWw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7IHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmRldGFpbCgpOyB9LGVuYWJsZWQ6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UG9kZXBzYXQ6IG5ldyBHQWN0aW9uKHsgbmFtZTogYWN0aW9uTmFtZXMuYWN0UG9kZXBzYXQsIGNhcHRpb246IFwianJlczozMzE0MDA3OVwiLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5wb2RlcHNhdERhdmt5KHRydWUpOyB9LCBlbmFibGVkOiB0cnVlIC8qKHRoYXQucGVybWlzc2lvbnM/Lkx6ZVBvZGVwc2F0LnZhbHVlID8gdHJ1ZSA6IGZhbHNlKSovLCB2aXNpYmxlOiB0cnVlIH0pLCAvL1JDIDMzMTQwMDc5IDogUG9kZXBzYXRcclxuICAgICAgICAgICAgICAgICAgICBhY3RQb2RwaXN5OiBuZXcgR0FjdGlvbih7IG5hbWU6IGFjdGlvbk5hbWVzLmFjdFBvZHBpc3ksIGNhcHRpb246IFwianJlczozMzE0MDA3NFwiLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vcGVuRGV0YWlsUG9kcGlzeSgpIH0sIC8qZW5hYmxlZDogKHRoYXQucGVybWlzc2lvbnM/Lkx6ZVBvZGVwc2F0ID8gdHJ1ZSA6IGZhbHNlKSovIH0pLCAvL1JDIDMzMTQwMDc0IDogUG9kcGlzeVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdERva29uY2l0OiBuZXcgR0FjdGlvbih7IG5hbWU6IGFjdGlvbk5hbWVzLmFjdERva29uY2l0LCBjYXB0aW9uOiBcImpyZXM6MzMxNDAwNzZcIiwgcnVuOiBmdW5jdGlvbiAoKSB7IC8qdGhhdC5kb2tvbmNpdCgpOyovIH0gfSksIC8vUkMgMzMxNDAwNzYgOiBEb2tvbsSNaXRcclxuICAgICAgICAgICAgICAgICAgICBhY3RTdGF2OiBuZXcgR0FjdGlvbih7IG5hbWU6IGFjdGlvbk5hbWVzLmFjdFN0YXYsIGNhcHRpb246IFwianJlczozMzE0MDA3N1wiLCBydW46IGZ1bmN0aW9uICgpIHsgLyp0aGF0LnN0YXYoKTsqLyB9IH0pLCAvL1JDIDMzMTQwMDc3IDogU3RhdlxyXG4gICAgICAgICAgICAgICAgICAgIGFjdEhpc3RvcmllOiBuZXcgR0FjdGlvbih7IG5hbWU6IGFjdGlvbk5hbWVzLmFjdEhpc3RvcmllLCBjYXB0aW9uOiBcImpyZXM6MzMxNDAwNzhcIiwgcnVuOiBmdW5jdGlvbiAoKSB7IC8qdGhhdC5oaXN0b3JpZSgpOyovIH0gfSksIC8vUkMgMzMxNDAwNzggOiBIaXN0b3JpZVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9kZXNsYXQ6IG5ldyBHQWN0aW9uKHsgbmFtZTogYWN0aW9uTmFtZXMuYWN0T2Rlc2xhdCwgY2FwdGlvbjogXCJqcmVzOjMzMTQwMDgwXCIsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9kZXNsYXQodHJ1ZSk7IH0sIGVuYWJsZWQ6ICh0aGF0LnBlcm1pc3Npb25zPy5MemVPZGVzbGF0LnZhbHVlID8gdHJ1ZSA6IHRydWUpLCB2aXNpYmxlOiB0cnVlIH0pLCAvL1JDIDMzMTQwMDgwIDogT2Rlc2xhdFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFN0b3JubzogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uU3Rvcm5vdmF0KHsgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuc3Rvcm5vKHRydWUpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByaWRhdERvUG9yb3ZuYW5pOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmlkYXREb1Bvcm92bmFuaSh7IHJ1bjogZnVuY3Rpb24gKCkgeyBCdWNHcmlkLkNvbXBhcmF0b3IuYWRkKHRoYXQpOyB9LCBlbmFibGVkOiB0cnVlLCB2aXNpYmxlOiB0cnVlIH0pLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbWVudWJhclxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIodGhpcy5nZXRNZW51QWN0aW9ucygpKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZmxhc2ggc2Ugc3RhdmVtIGtuaWh5XHJcbiAgICAgICAgICAgICAgICBFa28uVXRpbHMuU2hvd0Vrb0Jvb2tTdGF0ZUZsYXNoKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJyZWFkY3J1bWJzXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogXCJEw6F2a3lcIiwgZGVmYXVsdEFjdGlvbjogdHJ1ZSB9XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZmlsdHJhxI1uw60gZm9ybXVsw6HFmSBwcm8gZmlsdGVycGFuZWwgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwianJlczozMzE0MDEwMFwiIH0pIC8vUkMgMzMxNDAxMDAgOiBGaWx0ciBkw6F2ZWsgcyBwxZnDrWthenkgZG8gYmFua3lcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzMTQwMDIyXCIpIC8vUkMgMzMxNDAwMjIgOiBCYW5rYVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y3NwYmEoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X3NidVwiLCAgLy9uYW1lOiBcIm5hemV2X3NidVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBcInNrX3ZsPXNrX3ZsO3NidT1zYnVcIiwgLy9cInNrX3ZsPXNrX3ZsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc2tfdmw9dmFsdWUuc2tfdmw7bW9kZWwuc2J1PXZhbHVlLnNidVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2VPYmoudmFsdWUgPyB0aGF0LmJhbmthRHRvID0gY2hhbmdlT2JqLnZhbHVlIDogbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzMTQwMTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z6blwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRGaWVsZEVuZDogeyBtb2RlbDogXCJtb2RlbC5kYXRfdnpuLnN0YXJ0PXZhbHVlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0RmllbGRTdGFydDogeyBtb2RlbDogXCJtb2RlbC5kYXRfdnpuLmVuZD12YWx1ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEFsbDogJC5leHRlbmQoR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGVmYXVsdFZhbHVlOiBudWxsLCBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7IGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gKG1vZGVsVmFsdWUgPCAwKSA/IG1vZGVsVmFsdWUgKiAoLTEpIDogbW9kZWxWYWx1ZSB9LCBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gKGZpZWxkVmFsdWUgIT0gbnVsbCkgPyBmaWVsZFZhbHVlLmRbMF0gKiAoLTEpIDogZmllbGRWYWx1ZSB9IH0gfSlcclxuICAgICAgICAgICAgICAgICAgICB9KSkgLy9SQyAzMzE0MDEwMSA6IERhdHVtIHZ6bmlrdSBvZC1kb1xyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzE0MDEwMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0RmllbGRFbmQ6IHsgbW9kZWw6IFwibW9kZWwuZGF0X29kZS5zdGFydD12YWx1ZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEZpZWxkU3RhcnQ6IHsgbW9kZWw6IFwibW9kZWwuZGF0X29kZS5lbmQ9dmFsdWVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRBbGw6ICQuZXh0ZW5kKEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRlZmF1bHRWYWx1ZTogbnVsbCwgbW9kZWxWYWx1ZVRyYW5zZm9ybTogeyBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIChtb2RlbFZhbHVlIDwgMCkgPyBtb2RlbFZhbHVlICogKC0xKSA6IG1vZGVsVmFsdWUgfSwgY29sbGVjdDogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHsgcmV0dXJuIChmaWVsZFZhbHVlICE9IG51bGwpID8gZmllbGRWYWx1ZS5kWzBdICogKC0xKSA6IGZpZWxkVmFsdWUgfSB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpIC8vUkMgMzMxNDAxMDIgOiBEYXR1bSBvZGVzbMOhbsOtIG9kLWRvXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzMxNDAxMDNcIikgLy9SQyAzMzE0MDEwMyA6IFN0YXYgZMOhdmt5IHDFmcOta2F6xa9cclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5idWNjZHBkKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX2RwYlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzX2RwYj1zX2RwYlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVG9vbHRpcFRlbXBsYXRlOiBcIntzX2RwYl90eHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIHNlcnZlckZpbHRlcnM6IHsgdHlwX2FnOiBHb3JkaWMuQnVjLkdsb2JhbHMuRW51bXMuVHlwQWdCdWMuVHlwQWdQb3ZvbGVuZUJ1YyB9LCovXHJcbiAgICAgICAgICAgICAgICAgICAgfSkgLy9SQyAzMzE0MDAyOSA6IFR5cCBhZ2VuZHlcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlclBhcmFtcyA9IEdvcmRpYy5Fa28uRmlsdGVycy5nZXRGaWx0ZXJQYXJhbXM8SW50ZXJmYWNlLkdEYXZrYVBEQkZpbHRlcj4oXHJcbiAgICAgICAgICAgICAgICAgICAgW2ZpbHRlckZvcm1EZWZdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtcIm5hemV2X3NidVwiXSxcclxuICAgICAgICAgICAgICAgICAgICBcIiBcIiwgLy9UT0RPOiBhc2k/XHJcbiAgICAgICAgICAgICAgICAgICAgdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vKGV2LCBjdHgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICBudWxsIGFzIGFueSxcclxuICAgICAgICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0aGF0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyUGFyYW1zLmZpbHRlclZpZXdNb2RlID0gRmlsdGVyVmlld01vZGUuTm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyUGFyYW1zLnBvVnlobGVkYW5pWm9icmF6aXQgPSBcIk9ibGliZW5lUG9kbWlua3lcIjtcclxuICAgICAgICAgICAgICAgIGZpbHRlclBhcmFtcy5jb2xsZWN0RGF0YSA9IChldiwgY3R4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kZmlsdGVyRm9ybSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbChmaWx0ZXJQYXJhbXMpLm9uKFwiZ2ZpbHRlcnBhbmVsYXBwbHlcIiwgZnVuY3Rpb24gKGV2ZW50LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5maWx0ZXIuc2tfdmwgIT09IG51bGwgJiYgb2JqLmZpbHRlci5za192bCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmZpbHRlcihvYmogPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iai5uYW1lID09PSBhY3Rpb25OYW1lcy5hY3RQb2RlcHNhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVswXS52aXNpYmxlKHRydWUpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zLmZpbHRlcihvYmogPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iai5uYW1lID09PSBhY3Rpb25OYW1lcy5hY3RPZGVzbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pWzBdLnZpc2libGUodHJ1ZSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuQnVjc3BiYSgpLmdldERhdGEoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmaWx0ZXJwYW5lbFwiLCB0aGF0LiRmaWx0ZXJGb3JtKSAmJiByZXN1bHQubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGF0LmVsZW1lbnQpLmZpbmRGaWVsZHMoXCJuYXpldl9zYnVcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmVzdWx0WzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuRGF2a2FQREIubGlzdChycSA9PiBycSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhhdC4kZmlsdGVyRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9rZXk6IHRoYXQuUHJpbWFyeUtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zdGFydEVtcHR5OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB2aWV3XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQudmlld0Rhdmt5ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGF0LmlzbC5EYXZrYVBEQi5saXN0KHJxID0+IHsgcmV0dXJuIHsgZmlsdGVyczogeyAgfSB9IH0pLCB7IGZpbHRlclBhbmVsOiB0aGF0LmZpbHRlclBhbmVsLCBzdGFydEVtcHR5OiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdyaWRcclxuICAgICAgICAgICAgICAgICQubmV3RGl2KFwiU2V6bmFtQnVjXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG8+KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBCdWNHcmlkLkRhdmthLmdldEdyaWRPcHRpb25zKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwvL2dyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vIGFrdHVhbGl6YWNlIHN0YXZ1IG9rbmEgYSBuw6FobGVkdSBwb2RsZSBha3R1w6FsbsSbIHZ5YnJhbsOpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC5wcmV2aWV3Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChvYmogIT0gbnVsbCAmJiBvYmouY2VsbEluZm8gIT0gbnVsbCAmJiBvYmouY2VsbEluZm8uZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IHBva3VkIGJ5IGJ5bG8gcG90xZllYmEgxZllxaFpdCBuYXN0YXZlbsOtIG9rbmEgcG8gcMWZZXN1bnUgcG8gZ3JpZHUsIHRhayB0byBvZGtvbWVudG92YXQsIGFsZSBwcsOhdmEgesOhem5hbW92w6EgcHLDoXZhIHNlIGFrdHXDoWxuxJsgbmXFmWXFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuc2hvdyhvYmouY2VsbEluZm8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBUT0RPOiBtxa/FvmUgdG9obGUgdsWvYmVjIG5hc3RhdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2VsbENvbnRleHQpID0+IEJ1Y0dyaWQuZ2V0Q29udGV4dE1lbnVQYXJhbXMoY2VsbENvbnRleHQsIChjZWxsQ29udGV4dCkgPT4gdGhhdC5hY3Rpb25zLmNyZWF0ZUJhcih0aGF0LmdldE1lbnVBY3Rpb25zKHRydWUsIGNlbGxDb250ZXh0KSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcMWZaWRhdCBkYXRhIGRvIG1ldG9kIGdldEdyaWRPcHRpb25zPyBhc2kgYW5vLCBwcm90b8W+ZSB2aWV3IGJ1ZHUgcMWZZWTDoXZhdCB2xaF1ZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBzdGF2dSBva25hIGEgbsOhaGxlZHUgcG9kbGUgYWt0dcOhbG7EmyB2eWJyYW7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wcmV2aWV3Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiAhPSBudWxsICYmIG9iai5nZXRTZWxlY3Rpb24oKVswXSAhPSBudWxsICYmIG9iai5nZXRTZWxlY3Rpb24oKVswXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcG9rdWQgYnkgYnlsbyBwb3TFmWViYSDFmWXFoWl0IG5hc3RhdmVuw60gb2tuYSBwbyBwxZllc3VudSBwbyBncmlkdSwgdGFrIHRvIG9ka29tZW50b3ZhdCwgYWxlIHByw6F2YSB6w6F6bmFtb3bDoSBwcsOhdmEgc2UgYWt0dcOhbG7EmyBuZcWZZcWhw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KG9iai5nZXRTZWxlY3Rpb24oKVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBtxa/FvmUgdG9obGUgdsWvYmVjIG5hc3RhdD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3Rlc3QgcMWZacWZYWRpdCB2aWV3IGRvIHZsYXN0bm9zdGkgZGF0YTogZGFuw6lobyBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBkYXRhOiB0aGF0LnZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBvYnNsdcW+bsOhIGFrY2UgcHJvIGRvdWJsZWNsaWNrIHBybyB6b2JyYXplbsOtIGRldGFpbHUgcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIFRPRE86IG5lYm8gcG91xb7DrXQgc2VsZWN0aW9uIG3DrXN0byBjZWxsQWN0aXZhdGU/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNlbGxBY3RpdmF0ZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIGFrdHVhbGl6YWNlIHN0YXZ1IG9rbmEgYSBuw6FobGVkdSBwb2RsZSBha3R1w6FsbsSbIHZ5YnJhbsOpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAob2JqICE9IG51bGwgJiYgb2JqLmNlbGxJbmZvICE9IG51bGwgJiYgb2JqLmNlbGxJbmZvLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KG9iai5jZWxsSW5mby5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogbcWvxb5lIHRvaGxlIHbFr2JlYyBuYXN0YXQ/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBUT0RPOiB1cHJhdml0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjb2x1bW5zOiBCdWNHcmlkLkRhdmthLmNyZWF0ZUdyaWRGb3JtYXQodGhhdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZGVrbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdcSNdG92w70gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5Um93QWxsb3dlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGxvdWjDvSBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdENvdW50TWV0aG9kOiAocnEpID0+IHRoYXQuaXNsLkRhdmthUERCLmxpc3RDb3VudChycSkuZ2V0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0TW9kaWZ5UnFNZXRob2Q6IChycSkgPT4gQnVjR3JpZC5tb2RpZnlMaXN0UmVxdWVzdCh0aGF0LCBycSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgem3Em255IHYgZ3JpZHVcclxuICAgICAgICAgICAgICAgIHRoYXQudmlldy5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzRnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1CdWMuZ2dyaWRcIikuZ2dyaWQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAodGhhdC52aWV3IGFzIGFueSkub2ZmKFwiY2hhbmdlLmZvY3VzXCIsIGZvY3VzRnVuYyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3Lm9uKFwiY2hhbmdlLmZvY3VzXCIsIGZvY3VzRnVuYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbsOhaGxlZCB2IHByYXbDqW0gYm/EjW7DrW0gcGFuZWx1XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZ3NpZGViYXIoXCJvcHRpb25cIiwgeyByaWdodDogeyB3aWR0aDogMjAwLCB2aXNpYmxlOiBmYWxzZSwgbGVhZnNBdXRvSGlkZTogZmFsc2UsIHBpbm5lZDogdHJ1ZSB9IH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZpZXdQYW5lbHNEZWZpbml0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGlua1Byb3ZpZGVyOiBmdW5jdGlvbiAobG9hZFBhcmFtcykgeyByZXR1cm4gR29yZGljLldlYkFwcC5VdGlsaXR5LmNyZWF0ZUNvbW1hbmRVcmwobnVsbCwgXCJPcGVuRGV0YWlsXCIsIHsgaXhwOiBsb2FkUGFyYW1zLnBsYV9peHAgfSwgeyB0aWNrZXRUeXBlOiBHb3JkaWMuRW51bXMuVGlja2V0VHlwZS5XaXRoTG9naW5BbmRDb250ZXh0IH0pIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3SWQ6IFwiYnVjOkRhdmthXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmV2aWV3cy5nZXRGaWxlUHJldmlld1RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBQcm92aWRlcjogZnVuY3Rpb24gKGxvYWRQYXJhbXMpIHsgcmV0dXJuIGxvYWRQYXJhbXMuaXhwX2RhdjsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIgPSBuZXcgR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcih0aGF0LmVsZW1lbnQsIHByZXZpZXdQYW5lbHNEZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIucmVnaXN0ZXJQYW5lbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBvcm92bsOhbsOtXHJcbiAgICAgICAgICAgICAgICBCdWNHcmlkLkNvbXBhcmF0b3IuY3JlYXRlKHRoYXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vLy8gbsOhaGxlZCB2IHByYXbDqW0gYm/EjW7DrW0gcGFuZWx1XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZWxlbWVudC5nc2lkZWJhcihcIm9wdGlvblwiLCB7IHJpZ2h0OiB7IHdpZHRoOiAyMDAsIHZpc2libGU6IGZhbHNlLCBsZWFmc0F1dG9IaWRlOiBmYWxzZSB9IH0pO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgcHJldmlld1BhbmVsc0RlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0YWJzOiBbXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9saW5rUHJvdmlkZXI6IGZ1bmN0aW9uIChsb2FkUGFyYW1zKSB7IHJldHVybiBHb3JkaWMuV2ViQXBwLlV0aWxpdHkuY3JlYXRlQ29tbWFuZFVybChudWxsLCBcIk9wZW5EZXRhaWxcIiwgeyBpeHA6IGxvYWRQYXJhbXMucGxhX2l4cCB9LCB7IHRpY2tldFR5cGU6IEdvcmRpYy5FbnVtcy5UaWNrZXRUeXBlLldpdGhMb2dpbkFuZENvbnRleHQgfSkgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdmlld0lkOiBcImJ1YzpQbGF0YmFcIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIEdvcmRpYy5QcmV2aWV3cy5nZXRGaWxlUHJldmlld1RhYih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGl4cFByb3ZpZGVyOiBmdW5jdGlvbiAobG9hZFBhcmFtcykgeyByZXR1cm4gbG9hZFBhcmFtcy5peHA7IH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgXVxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMucHJldmlld0NvbnRyb2xsZXIgPSBuZXcgR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcih0aGlzLmVsZW1lbnQsIHByZXZpZXdQYW5lbHNEZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5wcmV2aWV3Q29udHJvbGxlci5yZWdpc3RlclBhbmVsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UbyBkbyAtIG9wcsOhdm7Em27DrVxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmlzbC5EYXZrYVBEQi5nZXRTZXJ2aWNlUGVybWlzc2lvbnMoKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAocGVybSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIG9wcsOhdm7Em27DrSAoYmV6IG5hcGxuxJtuw60gc2V6bmFtdSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnBlcm1pc3Npb25zID0gcGVybTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmVuYWJsZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vT3puYcSNZW7DrSBwb3TFmWVibsO9Y2ggcG9sw60gamFrbyByZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgLy9Hb3JkaWMuVXRpbHMuRm9ybS5tYXJrUmVxdWlyZWQodGhhdC5maW5kRm9ybXMoKSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBOYXBsbsSbbsOtIHNlem5hbXUgcGxhdGViIHDFmcOtcGFkxa9cclxuICAgICAgICAvLyAqIFxyXG4gICAgICAgIC8vICogQHBhcmFtIHthbnl9IFtmaWx0ZXJNb2RlbF0gYWt0dcOhbG7DrSBmaWx0cnlcclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBuYWN0ZW5pU2V6bmFtdShmaWx0ZXJNb2RlbD86IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vICAgIC8vIG5hxI10ZW7DrSBkYXQgZG8gZ3JpZHVcclxuICAgICAgICAvLyAgICBpZiAoZmlsdGVyTW9kZWwgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXJNb2RlbCA9PT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICB0aGlzLiRmaWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAvLyBuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgIC8vIG5hxI10ZW7DrSBkYXQgZG8gc2V6bmFtdVxyXG4gICAgICAgIC8vICAgICAgICBmaWx0ZXJNb2RlbCA9IGZpbHRlck1vZGVsIHx8IHt9O1xyXG4gICAgICAgIC8vICAgICAgICAvLyB6YXBhbWF0b3bDoW7DrSBha3R1w6FsbsOtaG8gZmlsdHJ1IGt2xa9saSB0aXNrxa9tXHJcbiAgICAgICAgLy8gICAgICAgIHRoaXMuY3VycmVudEZpbHRlciA9IGZpbHRlck1vZGVsO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgLy8gbmHEjXRlbsOtIHNlem5hbXVcclxuICAgICAgICAvLyAgICAgICAgLy8gb2JqZWt0IHBybyBwxZllZMOhdsOhbsOtIGhvZG5vdFxyXG4gICAgICAgIC8vICAgICAgICBpbnRlcmZhY2UgcmV0dXJuT2JqVHlwZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBkYXRhOiBHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG9bXSB8IG51bGxcclxuICAgICAgICAvLyAgICAgICAgfTtcclxuICAgICAgICAvLyAgICAgICAgbGV0IHJldHVybk9iajogcmV0dXJuT2JqVHlwZSA9IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGRhdGE6IG51bGxcclxuICAgICAgICAvLyAgICAgICAgfTtcclxuICAgICAgICAvLyAgICAgICAgLy8gZGVmZXJyZWQgb2JqZWt0IHBybyB6xZlldMSbemVuw60gb3TDoXpla1xyXG4gICAgICAgIC8vICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpLnJlc29sdmUocmV0dXJuT2JqKS5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgICAgIC8vIG9ic2x1aGEgamVkbm90bGl2w71jaCBmw6F6w61cclxuICAgICAgICAvLyAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbihcIk5hxI3DrXTDoW0gZGF0YVwiKTtcclxuICAgICAgICAvLyAgICAgICAgZGVmLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXRcclxuICAgICAgICAvLyAgICAgICAgICAgIC8qR29yZGljLklzbCovXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmlzbC5EYXZrYVBEQi5saXN0KHJxID0+IHsgcmV0dXJuIHsgZmlsdGVyczogdGhhdC5jdXJyZW50RmlsdGVyISB9OyB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm5PYmouZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5wZXJtaXNzaW9ucyA9IDxHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FTZXJ2aWNlUGVybWlzc2lvbj5yZXNwb25zZS5zZXJ2aWNlUGVybWlzc2lvbnM7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybk9iajogcmV0dXJuT2JqVHlwZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gw7pwcmF2YSBkYXRcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBCdWNHcmlkLkRhdmthLm1vZGlmeUR0byhyZXR1cm5PYmouZGF0YSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk9iai5kYXRhID0gZGF0YTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldHVybk9iaik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5PYmo6IHJldHVybk9ialR5cGUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJldHVybk9iai5kYXRhISwgeyBrZXk6IFwiaXhwLHJhZGVrX3VoclwiIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbUJ1Yy5nZ3JpZFwiKS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBva25hXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIE5hcGxuxJtuw60gamVkbm9obyDFmcOhZGt1IGRvIHNlem5hbXUgcGxhdGViXHJcbiAgICAgICAgLy8gKiBcclxuICAgICAgICAvLyAqIEBwYXJhbSB7YW55fSBmaWx0ZXJQSyBmaWx0ciBwcm8gYWt0dWFsaXphY2kgZGF0XHJcbiAgICAgICAgLy8gKiBAcGFyYW0ge2FueX0gJGdyaWQgKGRlZmF1bHQgPSB1bmRlZmluZWQpIGdyaWQsIGt0ZXLDvSBtw6EgYsO9dCBha3R1YWxpem92w6FuICh2xb5keSBqZSBuYXbDrWMgYWt0dWFsaXpvdsOhbiB6w6FrbGFkbsOtIHNlem5hbW92w70gZ3JpZClcclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBuYWN0ZW5pUmFka3UoZmlsdGVyUEs6IGFueSwgJGdyaWQ6IGFueSA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vICAgIC8vIHZvbMOhbsOtIG9iZWNuw6kgbWV0b2R5IHBybyBuYcSNdGVuw60gxZnDoWRrdVxyXG4gICAgICAgIC8vICAgIEJ1Y0dyaWQucmVsb2FkUm93KFxyXG4gICAgICAgIC8vICAgICAgICB0aGF0LFxyXG4gICAgICAgIC8vICAgICAgICAocnEpID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRhdmthUERCLmxpc3QocnEpOyB9LFxyXG4gICAgICAgIC8vICAgICAgICBCdWNHcmlkLkJhbmthLm1vZGlmeUR0byxcclxuICAgICAgICAvLyAgICAgICAgKCkgPT4gdGhhdC5lbmFibGUoKSxcclxuICAgICAgICAvLyAgICAgICAgZmlsdGVyUEssXHJcbiAgICAgICAgLy8gICAgICAgICRncmlkXHJcbiAgICAgICAgLy8gICAgKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIFpvYnJhemVuw60gZGV0YWlsdSBwbGF0YnkgcMWZw61wYWR1XHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgZGV0YWlsKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAvLyAgICBjb25zdCAkZ3JpZCA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbUJ1Yy5nZ3JpZFwiKTtcclxuICAgICAgICAvLyAgICBjb25zdCBha3RSYWRlayA9ICRncmlkLmdncmlkPEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdCYW5rYUR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgLy8gICAgaWYgKGFrdFJhZGVrICYmICEoYWt0UmFkZWsgaW5zdGFuY2VvZiBqUXVlcnkpKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAvLyBvdGV2xZllbsOtIGRldGFpbHVcclxuICAgICAgICAvLyAgICAgICAgbGV0ICRkZXRhaWxXaW5kb3cgPSB0aGlzLm5hdmlnYXRlKFtcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEZXRhaWxEYXZrYVwiLCB7IGdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKCRncmlkKSB9XSwge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgSWNvOiBha3RSYWRlay5pY28sXHJcbiAgICAgICAgLy8gICAgICAgICAgICBVY3M6IGFrdFJhZGVrLnVjcyxcclxuICAgICAgICAvLyAgICAgICAgICAgIEl4c0VzdTogYWt0UmFkZWsuaXhzX2VzdSxcclxuICAgICAgICAvLyAgICAgICAgICAgIFNidTogYWt0UmFkZWsuc2J1XHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgLy8gb2JzbHVoYSBha3Rpdm7DrSBvcGVyYWNlIG5hIGRldGFpbHVcclxuICAgICAgICAvLyAgICAgICAgJC5jb250ZW50KCRkZXRhaWxXaW5kb3cpLm9uKEJ1Y0RldGFpbC50cmlnZ2VyQ2hhbmdlLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vesOhem5hbSBieWwgem3Em27EmywgbXVzw60gc2UgbmHEjcOtc3Qgem5vdnVcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmIChyZXRWYWwgIT0gbnVsbCAmJiByZXRWYWwuZGF0YSAmJiByZXRWYWwuZGF0YS5peHNfZXN1ICYmIHJldFZhbC5kYXRhLnNidSAmJiByZXRWYWwuZGF0YS5peHNfZXN1ICE9IG51bGwgJiYgcmV0VmFsLmRhdGEuc2J1ICE9IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0Lm5hY3RlbmlSYWRrdSh7IGl4c19lc3U6IHJldFZhbC5kYXRhLml4c19lc3UsIHNidTogcmV0VmFsLmRhdGEuc2J1IH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vKipcclxuICAgICAgICAvLyogWm9icmF6ZW7DrSBkZXRhaWx1IGRhdmt5XHJcbiAgICAgICAgLy8qL1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gYWt0dcOhbG7DrSB2eWJyYW7DoSBwb2xvxb5rYVxyXG4gICAgICAgIGNvbnN0ICRncmlkID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuU2V6bmFtQnVjLmdncmlkXCIpO1xyXG4gICAgICAgIGNvbnN0IGFrdFJhZGVrID0gJGdyaWQuZ2dyaWQ8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICBpZihha3RSYWRlayAmJiAhKGFrdFJhZGVrIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xyXG5cclxuICAgICAgICAvLyBvdGV2xZllbsOtIGRldGFpbHVcclxuICAgICAgICBsZXQgJGRldGFpbFdpbmRvdyA9IHRoaXMubmF2aWdhdGUoW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RldGFpbERhdmthUERCXCIsIHsgZ3JpZFJlbW90ZUNvbnRyb2w6IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkMoJGdyaWQpIH1dLCB7XHJcbiAgICAgICAgICAgIElEOiAnRGV0YWlsRGF2a2FQREIjJyxcclxuICAgICAgICAgICAgaXhwX2RhdjogYWt0UmFkZWs/Lml4cF9kYXYgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuw60gZGV0YWlsdSBkw6F2a3lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjb250ZW50IGNvbnRlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0b30gcm93IGFrdHXDoWxuw60gxZnDoWRla1xyXG4gICAgICAgICAqIEBwYXJhbSB7QnVjR3JpZC5vcGVuRGV0YWlsV2l6YXJkUGFyYW1zfSBbd2l6YXJkXSBwYXJhbWV0cnkgcHLFr3ZvZGNlICh2IHDFmcOtcGFkxJsgdm9sw6Fuw60gZGV0YWlsdSB6IHByxa92b2RjZSlcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBvcGVuRGV0YWlsKFxyXG4gICAgICAgICAgICBjb250ZW50OiBHQ29udGVudCxcclxuICAgICAgICAgICAgcm93OiBHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG8sXHJcbiAgICAgICAgICAgIHdpemFyZD86IEJ1Y0dyaWQub3BlbkRldGFpbFdpemFyZFBhcmFtc1xyXG4gICAgICAgICk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gesOhc29ibsOtayB6bcSbbsSbbsO9Y2ggesOhem5hbcWvXHJcbiAgICAgICAgICAgIGxldCBjaGFuZ2VkUm93czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICAgICAgICBsZXQgJGRldGFpbFdpbmRvdyA9IGNvbnRlbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICBbXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HRGV0YWlsRGF2a2FQREJcIiwgeyAvKmdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKCRncmlkKSovIH1dLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElEOiAnRGV0YWlsRGF2a2FQREIjJyxcclxuICAgICAgICAgICAgICAgICAgICBJeHBEYXY6IHJvdz8uaXhwX2RhdlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gb2JzbHVoYSBha3Rpdm7DrSBvcGVyYWNlIG5hIGRldGFpbHVcclxuICAgICAgICAgICAgJC5jb250ZW50KCRkZXRhaWxXaW5kb3cpLm9uKEJ1Y0RldGFpbC50cmlnZ2VyQ2hhbmdlLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXRWYWw/LmRhdGE/Lml4cF9kYXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIGRvIHNlem5hbXUgesOhem5hbcWvIGsgb2LEjWVyc3R2ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkUm93cy5pbmRleE9mKHJldFZhbC5kYXRhLml4cF9kYXYpIDwgMCkgY2hhbmdlZFJvd3MucHVzaChyZXRWYWwuZGF0YS5peHBfZGF2KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBvYnNsdWhhIHVrb27EjWVuw60gb2tuYVxyXG4gICAgICAgICAgICAkZGV0YWlsV2luZG93Lm9uKFwiY2xvc2VkXCIsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBmb2t1c3UgKGplbiBwb2t1ZCBuZW7DrSBwcsWvdm9kY2UpXHJcbiAgICAgICAgICAgICAgICBpZiAoIXdpemFyZCkgdGhhdC5lbGVtZW50LmZpbmQoXCIuU2V6bmFtQnVjLmdncmlkXCIpLmdncmlkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSB6bcSbbsSbbsO9Y2ggesOhem5hbcWvICh2IGhsYXZuw61tIHNlem5hbXUgaSBwxZnDrXBhZG7EmyB2IHByxa92b2RjaSlcclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkUm93cz8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gYWt0aXZuw60gb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3aXphcmQgJiYgd2l6YXJkLnNldEFjdGl2ZU9wZXJhdGlvbiAhPSB1bmRlZmluZWQgJiYgdHlwZW9mICh3aXphcmQuc2V0QWN0aXZlT3BlcmF0aW9uKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpemFyZC5zZXRBY3RpdmVPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgesOha2xhZG7DrWhvIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKHsgZmlsdGVyczogeyBpeHBfZGF2OiBjaGFuZ2VkUm93cyB9LCBvbmx5UEtXaXRob3V0RmlsdGVyczogdHJ1ZSB9LCB7IHVwZGF0ZU1vZGU6IFwidXBkYXRlXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBha3R1w6FsbsOtaG8gxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbD8ucmV0dXJuVmFsdWU/Lml4cF9kYXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1CdWMuZ2dyaWRcIikuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgeyBpeHBfZGF2OiByZXRWYWwucmV0dXJuVmFsdWUuaXhwX2RhdiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHYgcMWZw61wYWTEmyBwcsWvdm9kY2UgaSBha3R1YWxpemFjZSBncmlkdSB2IHByxa92b2RjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpemFyZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1Y1dpemFyZC5yZWxvYWRSb3dzKChycSkgPT4geyByZXR1cm4gdGhhdC5pc2wuRGF2a2FQREIubGlzdChycSk7IH0sIHsgaXhwX2RhdjogY2hhbmdlZFJvd3MgfSwgd2l6YXJkLmdyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aXphcmQgJiYgd2l6YXJkLnJlZnJlc2hBbmRDaGVja0RhdGFBY3Rpb24gIT0gdW5kZWZpbmVkICYmIHR5cGVvZiAod2l6YXJkLnJlZnJlc2hBbmRDaGVja0RhdGFBY3Rpb24pID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2l6YXJkLnJlZnJlc2hBbmRDaGVja0RhdGFBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkZGV0YWlsV2luZG93LmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUbyBkbzogQWtjZSBwb2RwaXN5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb2RwaXN5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSBwbGF0YmFcclxuICAgICAgICAgICAgY29uc3QgYWt0WmF6bmFtID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuU2V6bmFtQnVjLmdncmlkXCIpLmdncmlkPEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bz4oXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTdG9ybm8gLyB6cnXFoWVuw60gc3Rvcm5hIHZ5YnJhbsO9Y2ggZMOhdmVrXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN0b3Jub3ZhdCAoZGVmYXVsdCA9IHRydWUpIHN0b3Jub3ZhdCAodHJ1ZSkgbmVibyB6cnXFoWl0IHN0b3JubyAoZmFsc2UpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc3Rvcm5vKHN0b3Jub3ZhdDogYm9vbGVhbiA9IHRydWUpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRyeSBvcGVyYWNlXHJcbiAgICAgICAgICAgIGludGVyZmFjZSBzdG9ybm9Nb2RlbCB7XHJcbiAgICAgICAgICAgICAgICBkdXZvZDogc3RyaW5nIHwgbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LndpemFyZFR3b1N0ZXBzPEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQlN0b3Jub09wZXJhdGlvbkR0bywgc3Rvcm5vTW9kZWw+KFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlN0b3Jub0Rhdmt5UERCI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBa2NlIHN0b3JudWplIHZ5YnJhbsOpICh6YcWha3J0bnV0w6kpIGTDoXZreS4gUG8gamVqw61tIHByb3ZlZGVuw60gYnVkb3UgdHl0byBkw6F2a3kgdmUgc3RhdnUgJ3N0b3Jub3bDoW4nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1UYWJUaXRsZTogXCJQYXJhbWV0cnkgc3Rvcm5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbkFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFN0b3JubyEuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiB9KS5hZGRTZWN0aW9uKCkuYWRkUm93KFwiRMWvdm9kXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZHV2b2RcIiwgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIHNtYXJ0TmF2TmV4dEVsZW1lbnQ6IGZ1bmN0aW9uIChjdXIsIG5leHQpIHsgcmV0dXJuICQuY29udGVudCh0aGlzKT8uZWxlbWVudC5maW5kKFwiYnV0dG9uW2RhdGEtcGFyYW0taWQ9J2NoZWNrQWN0J11cIilbMF07IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7IGR1dm9kOiBudWxsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvT3BlcmF0aW9uRHRvOiAobW9kZWwsIGRhdGEsIGlrYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpa2M6IGlrYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3Jub3ZhdDogc3Rvcm5vdmF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1dm9kOiAobW9kZWwgIT0gbnVsbCAmJiBtb2RlbC5kdXZvZCAhPSBudWxsID8gbW9kZWwuZHV2b2QgOiBcIm5lemFkw6FuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc2xDaGVja0JlZm9yZU9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRGF2a2FQREIuemtvbnRyb2x1alByZWRTdG9ybmVtKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRGF2a2FQREIuaHJvbWFkbmVTdG9ybnVqKGR0byk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGluZ0FjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFN0b3Jub1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9kZXNsw6Fuw60gdnlicmFuw71jaCBkw6F2ZWtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3Rvcm5vdmF0IChkZWZhdWx0ID0gdHJ1ZSkgb2RlbGF0ICh0cnVlKSBuZWJvIHpydcWhaXQgb2RlbGFuaSAoZmFsc2UpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb2Rlc2xhdChvZGVzbGF0OiBib29sZWFuID0gdHJ1ZSk6IGFueSAvKkpRdWVyeS5Qcm9taXNlPGFueT4qLyB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHBhcmFtZXRyeSBvcGVyYWNlXHJcbiAgICAgICAgICAgIGludGVyZmFjZSBvZGVzbGFuaU1vZGVsIHtcclxuICAgICAgICAgICAgICAgIC8vZHV2b2Q6IHN0cmluZyB8IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy9WeWJyYW5lIHJhZGt5XHJcbiAgICAgICAgICAgIGNvbnN0IHZ5YnJhbmVSYWRreSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlNlem5hbUJ1Yy5nZ3JpZFwiKS5nZ3JpZDxHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpXHJcbiAgICAgICAgICAgIC8vaWYgKHRoYXQuYmFua2FEdG8uc2tfdmwgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HT2Rlc2xhbmlEYXZrYVwiLCB7IHZ5YnJhbmVSYWRreTogdnlicmFuZVJhZGt5LCBiYW5rYUR0bzogdGhhdC5iYW5rYUR0bywgaWtjOiB0aGF0LmlrYyB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCByZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL1RvIGRvOiB2b2zDoW7DrSBwcsWvdm9kY2UgcHJvIG9kZXNsYW5pIGRhdmt5L2RhdmVrIChwb2RsZSB2em9ydSBwcm8gc3Rvcm5vIGRhdmVrKVxyXG4gICAgICAgICAgICAvL3JldHVybiB0aGF0LndpemFyZFR3b1N0ZXBzPEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQi5TdG9ybm9PcGVyYXRpb25EdG8sIHN0b3Jub01vZGVsPihcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgaWQ6IFwiT2Rlc2xhbmlEYXZreVBEQiNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHRleHRzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGl0bGU6IFwiU3Rvcm5vXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWtjZSBzdG9ybnVqZSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBkw6F2a3kuIFBvIGplasOtbSBwcm92ZWRlbsOtIGJ1ZG91IHR5dG8gZMOhdmt5IHZlIHN0YXZ1ICdzdG9ybm92w6FuJ1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZvcm1UYWJUaXRsZTogXCJQYXJhbWV0cnkgc3Rvcm5hXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgb3BlcmF0aW9uQWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS5jYXB0aW9uLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBmb3JtOiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiIH0pLmFkZFNlY3Rpb24oKS5hZGRSb3coXCJExa92b2RcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJkdXZvZFwiLCBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgc21hcnROYXZOZXh0RWxlbWVudDogZnVuY3Rpb24gKGN1ciwgbmV4dCkgeyByZXR1cm4gJC5jb250ZW50KHRoaXMpPy5lbGVtZW50LmZpbmQoXCJidXR0b25bZGF0YS1wYXJhbS1pZD0nY2hlY2tBY3QnXVwiKVswXTsgfSB9KSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBtb2RlbDogeyBkdXZvZDogbnVsbCB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRvT3BlcmF0aW9uRHRvOiAobW9kZWwsIGRhdGEsIGlrYykgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWtjOiBpa2MsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByb3dzOiBkYXRhLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgc3Rvcm5vdmF0OiBzdG9ybm92YXQsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBkdXZvZDogKG1vZGVsICE9IG51bGwgJiYgbW9kZWwuZHV2b2QgIT0gbnVsbCA/IG1vZGVsLmR1dm9kIDogXCJuZXphZMOhblwiKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlzbENoZWNrQmVmb3JlT3BlcmF0aW9uOiAoZHRvKSA9PiB7IHJldHVybiB0aGF0LmlzbC5EYXZrYVBEQi56a29udHJvbHVqUHJlZFN0b3JuZW0oZHRvKTsgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpc2xPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRhdmthUERCLmhyb21hZG5lU3Rvcm51aihkdG8pOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNhbGxpbmdBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RTdG9ybm9cclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG9kZXBzw6Fuw60gdnlicmFuw71jaCBkw6F2ZWtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcG9kZXBzYXQgKGRlZmF1bHQgPSB0cnVlKSBvZGVsYXQgKHRydWUpIG5lYm8genJ1xaFpdCBwb2RlcHNhbmkgKGZhbHNlKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHBvZGVwc2F0RGF2a3kocG9kZXBzYXQ6IGJvb2xlYW4gPSB0cnVlKTogYW55IC8qSlF1ZXJ5LlByb21pc2U8YW55PiovIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vVnlicmFuZSByYWRreVxyXG4gICAgICAgICAgICBjb25zdCB2eWJyYW5lUmFka3kgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1CdWMuZ2dyaWRcIikuZ2dyaWQ8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvPihcImdldFNlbGVjdGlvblwiKVxyXG4gICAgICAgICAgICAvL2lmICh0aGF0LmJhbmthRHRvLnNrX3ZsICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UG9kZXBzYXQ/LnNldFBlbmRpbmcoZGVmLnByb21pc2UoKSk7XHJcbiAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HUG9kZXBzYW5pRGF2a2FcIiwgeyB2eWJyYW5lUmFka3k6IHZ5YnJhbmVSYWRreSwgZGF2a2FEdG86IHRoYXQuYmFua2FEdG8gfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgcmV0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IG9wZXJhY2VcclxuICAgICAgICAgICAgLy9pbnRlcmZhY2UgcG9kcGlzTW9kZWwge1xyXG4gICAgICAgICAgICAvLyAgICBkdXZvZDogc3RyaW5nIHwgbnVsbFxyXG4gICAgICAgICAgICAvL307XHJcblxyXG4gICAgICAgICAgICAvLy8vIHZvbMOhbsOtIHByxa92b2RjZVxyXG4gICAgICAgICAgICAvL3JldHVybiB0aGF0LndpemFyZFR3b1N0ZXBzPEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQlBvZHBpc09wZXJhdGlvbkR0bywgcG9kcGlzTW9kZWw+KFxyXG4gICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZDogXCJQb2RwaXNEYXZreVBEQiNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHRleHRzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGl0bGU6IFwiUG9kZXBzw6Fuw61cIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBa2NlIHBvZGVww63FoWUgdnlicmFuw6kgKHphxaFrcnRudXTDqSkgZMOhdmt5LiBQbyBqZWrDrW0gcHJvdmVkZW7DrSBidWRvdSB0eXRvIGTDoXZreSB2ZSBzdGF2dSAncG9kZXBzw6FubydcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwiUGFyYW1ldHJ5IHBvZHBpc3VcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBvcGVyYXRpb25BY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQb2RlcHNhdCEuY2FwdGlvbixcclxuICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiB9KS5hZGRTZWN0aW9uKCkuYWRkUm93KFwiRMWvdm9kXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZHV2b2RcIiwgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIHNtYXJ0TmF2TmV4dEVsZW1lbnQ6IGZ1bmN0aW9uIChjdXIsIG5leHQpIHsgcmV0dXJuICQuY29udGVudCh0aGlzKT8uZWxlbWVudC5maW5kKFwiYnV0dG9uW2RhdGEtcGFyYW0taWQ9J2NoZWNrQWN0J11cIilbMF07IH0gfSksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbW9kZWw6IHsgZHV2b2Q6IG51bGwgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0b09wZXJhdGlvbkR0bzogKG1vZGVsLCBkYXRhLCBpa2MpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlrYzogaWtjLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcm93czogZGF0YSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHBvZGVwc2F0OiBwb2RlcHNhdCxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGR1dm9kOiAobW9kZWwgIT0gbnVsbCAmJiBtb2RlbC5kdXZvZCAhPSBudWxsID8gbW9kZWwuZHV2b2QgOiBcIm5lemFkw6FuXCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb246IChkdG8pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkRhdmthUERCLnprb250cm9sdWpQcmVkU3Rvcm5lbShkdG8pOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlzbE9wZXJhdGlvbjogKGR0bykgPT4geyByZXR1cm4gdGhhdC5pc2wuRGF2a2FQREIuaHJvbWFkbmVTdG9ybnVqKGR0byk7IH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FsbGluZ0FjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFBvZGVwc2F0XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcHJ2a8WvIHZlIGZvcm11bMOhxZlpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vLy8gYWt0dcOhbG7DrSBwbGF0YmFcclxuICAgICAgICAgICAgLy9jb25zdCBha3RaYXpuYW0gPSB0aGlzLmVsZW1lbnQuZmluZChcIi5TZXpuYW1CdWMuZ2dyaWRcIikuZ2dyaWQ8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgLy8ganNvdSBuxJtqYWvDqSDFmcOhZGt5P1xyXG4gICAgICAgICAgICBjb25zdCBpc0VtcHR5ID0gISh0aGlzLnZpZXcuZ2V0Q291bnQoXCJkYXRhXCIpID4gMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBha2NlIHNlem5hbXVcclxuICAgICAgICAgICAgY29uc3QgcGVybUVtcHR5R3JpZCA9IEJ1Y0dyaWQuZ2V0RW1wdHlHcmlkUGVybWlzc2lvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBhY3RzID0gdGhpcy5hY3Rpb25zO1xyXG4gICAgICAgICAgICBjb25zdCBwZXJtcyA9IHRoaXMuUGVybWlzc2lvbnM7XHJcbiAgICAgICAgICAgIC8vL2FjdHMuYWN0RGV0YWlsIS51cGRhdGVQZXJtaXNzaW9uKGlzRW1wdHkgPyBwZXJtRW1wdHlHcmlkIDogcGVybXM/Lkx6ZVpvYnJheml0KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RTdG9ybm8hLnVwZGF0ZVBlcm1pc3Npb24oaXNFbXB0eSA/IHBlcm1FbXB0eUdyaWQgOiBwZXJtcz8uTHplU3Rvcm5vdmF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByxa92b2RjZSBuYWQgc2V6bmFtZW0gZMOhdmVrIDxEVE8gb3BlcmFjZSwgbW9kZWwgcGFyYW1ldHLFrz5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0J1Y1dpemFyZC5JR0J1Y1dpemFyZHBhcmFtczxUT3BlcmF0aW9uRHRvLCBUTW9kZWwsIEJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvPiB8IEJ1Y1dpemFyZC5JR0J1Y1dpemFyZHBhcmFtc1BhcnQ8VE9wZXJhdGlvbkR0bywgVE1vZGVsLCBCdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bz59IHBhcmFtcyDEjcOhc3QgcGFyYW1ldHLFryBwcsWvdm9kY2VcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB3aXphcmRUd29TdGVwczxUT3BlcmF0aW9uRHRvLCBUTW9kZWw+KFxyXG4gICAgICAgICAgICBwYXJhbXM6IEJ1Y1dpemFyZC5CdWNXaXphcmRQYXJhbXM8VE9wZXJhdGlvbkR0bywgVE1vZGVsLCBCdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bz4gfCBCdWNXaXphcmQuQnVjV2l6YXJkUGFyYW1zUGFydDxUT3BlcmF0aW9uRHRvLCBUTW9kZWwsIEJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvPlxyXG4gICAgICAgICk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogZG/EjWFzbsOpIMWZZcWhZW7DrSBmcmFnbWVudMWvIC0gamUgYWxlIGplIG51dG7DqSBwxZllZGF0IGRvIG1ldG9keSB3aXphcmRHZXREYXRhXHJcbiAgICAgICAgICAgIGxldCBncmlkRm9ybWF0ID0gR29yZGljLkJ1Yy5XZWJDbGllbnQuQnVjR3JpZC5EYXZrYS5jcmVhdGVHcmlkRm9ybWF0KHRoYXQsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgZnJhZ21lbnRzOiBzdHJpbmdbXSA9IEJ1Y1dpemFyZC5nZXRGcmFnbWVudHNGcm9tR3JpZEZvcm1hdChncmlkRm9ybWF0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZvbMOhbsOtIG9iZWNuw6lobyBCVUMgcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIHJldHVybiBCdWNXaXphcmQud2l6YXJkVHdvU3RlcHMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwiVnlicmFuw6kgZMOhdmt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZ3JpZEZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXM6IHRoYXQuUHJpbWFyeUtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGU6ICh0aGF0LmVsZW1lbnQuZmluZChcIi5TZXpuYW1CdWMuZ2dyaWRcIikuZ2dyaWQoXCJnZXRDdXJyZW50UHJvZmlsZVwiKSkgYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXREYXRhOiAod2l0aFJlc3VsdHMsIGlrYywgcmVzcG9uc2UpID0+IHsgcmV0dXJuIHRoYXQud2l6YXJkR2V0RGF0YSh3aXRoUmVzdWx0cywgd2l0aFJlc3VsdHMsIGlrYywgZnJhZ21lbnRzLCByZXNwb25zZSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51R3JpZERldGFpbDogKGNudCwgY3R4LCBpa2MsIG1vZGVsLCBha3RSYWRlaywgJGdyaWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5vcGVuRGV0YWlsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdFJhZGVrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkOiAkZ3JpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hBbmRDaGVja0RhdGFBY3Rpb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC53aXphcmRSZWZyZXNoQW5kQ2hlY2tEYXRhKGNudCwgZmFsc2UsICRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpLCBpa2MsIGZyYWdtZW50cywgcGFyYW1zLmFjdGlvbnMuaXNsQ2hlY2tCZWZvcmVPcGVyYXRpb24sIHBhcmFtcy5wYXJhbWV0ZXJzLnRvT3BlcmF0aW9uRHRvLCBtb2RlbCBhcyBUTW9kZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkYXQgdiBncmlkdSBhIG9ixI1lcnN0dmVuw60gaW5kaWvDoXRvcsWvIHBvxI10xa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKGRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjbnQgYXMgYW55KS5yZWZyZXNoSW5kaWNhdG9yICE9IHVuZGVmaW5lZCAmJiB0eXBlb2YgKChjbnQgYXMgYW55KS5yZWZyZXNoSW5kaWNhdG9yKSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNudCBhcyBhbnkpLnJlZnJlc2hJbmRpY2F0b3IoJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxvYWRMaXN0QWZ0ZXJGaW5pc2g6ICgpID0+IHsgcmV0dXJuIHRoYXQudmlldy5yZXF1ZXN0RGF0YSh7IHdpdGhvdXRMb25nTGltaXQ6IHRydWUgfSk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcsOhdMOtIHNlem5hbSBkw6F2ZWsgcHJvIHpvYnJhemVuw60gdiBwcsWvdm9kY8OtY2ggcHJvIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBvbmx5Q2hlY2tlZCBwb3V6ZSB6YcWha3J0bnV0w6kgxZnDoWRreSAodHJ1ZSA9IGFubywgZmFsc2UgPSBuZSlcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHdpdGhSZXN1bHRzIGRvcGxuxJtuw60gdsO9c2xlZGvFryBocm9tYWRuw6kgb3BlcmFjZSAodHJ1ZSA9IGFubywgZmFsc2UgPSBuZSlcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HZW5lcmFsLkdJa2N9IGlrYyBJS0NcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ1tdIHwgdW5kZWZpbmVkfSBmcmFnbWVudHMgZnJhZ21lbnR5XHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuSXNsLkdTZXJ2aWNlR3JvdXBSZXNwb25zZTxHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG8+fSBbcmVzcG9uc2VdIHbDvXNsZWRlayBocm9tYWRuw6kgb3BlcmFjZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPChHb3JkaWMuRWtvLkNvbXBvbmVudHMuTWFzc09wZXJhdGlvbkRhdGE8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvPiB8IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bylbXT59IHNlem5hbSBkw6F2ZWsgKHMgdsO9c2xlZGt5IG9wZXJhY2UgbmVibyBiZXogcG9kbGUgcGFyYW1ldHJ1IHdpdGhSZXN1bHRzKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgd2l6YXJkR2V0RGF0YShcclxuICAgICAgICAgICAgb25seUNoZWNrZWQ6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgIHdpdGhSZXN1bHRzOiBib29sZWFuLFxyXG4gICAgICAgICAgICBpa2M6IEdvcmRpYy5HZW5lcmFsLkdJa2MsXHJcbiAgICAgICAgICAgIGZyYWdtZW50czogc3RyaW5nW10gfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlPzogR29yZGljLklzbC5HU2VydmljZUdyb3VwUmVzcG9uc2U8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvPlxyXG4gICAgICAgICk6IEpRdWVyeVByb21pc2U8KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5NYXNzT3BlcmF0aW9uRGF0YTxHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG8+IHwgR29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvKVtdPiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLy8vIFRPRE86IGplIHRvIGplbiBwb2t1cyBqYWsgc2tyw710IHRsYcSNw610a28sIGFsZSBuZW7DrSB0byBrZGUgdnl2b2xhdCwgdGFrxb5lIHNlIHRvIGJ1ZGUgbXVzZXQgb2JzbG91xb5pdCB2IGtvbXBvbmVudMSbIHByxa92b2RjZVxyXG4gICAgICAgICAgICAvLyQoXCIuZ2J1dHRvbiBbYXJpYS1sYWJlbD0nWmtvbnRyb2xvdmF0J11cIikuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZmlsdHJ5IHBvZGxlIHJlxb5pbXUga25paHlcclxuICAgICAgICAgICAgLy8gVE9ETzoganNvdSB2xa9iZWMgcG90xZllYmEsIGtkecW+IGplIHRhbSBobGF2bsOtIGZpbHRyIHDFmWVzIHdmbHRwcmU/XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJzID0ge307XHJcbiAgICAgICAgICAgIGlmICgodGhhdCBhcyBhbnkpLmVrb0Jvb2tGaWx0ZXI/Lml4cF9kZW4pICQuZXh0ZW5kKGZpbHRlcnMsIHsgaXhwX2RlbjogKHRoYXQgYXMgYW55KS5la29Cb29rRmlsdGVyLml4cF9kZW4gfSk7XHJcbiAgICAgICAgICAgIGlmICgodGhhdCBhcyBhbnkpLmVrb0Jvb2tGaWx0ZXI/LnJvaykgJC5leHRlbmQoZmlsdGVycywgeyByb2tfZGVuOiAodGhhdCBhcyBhbnkpLmVrb0Jvb2tGaWx0ZXIucm9rIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gb2JlY27DqSBtZXRvZHkgcHJvIG5hxI10ZW7DrSBkYXQgZG8gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIHJldHVybiBCdWNXaXphcmQuZ2V0RGF0YShcclxuICAgICAgICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAgICAgICBvbmx5Q2hlY2tlZCxcclxuICAgICAgICAgICAgICAgIHdpdGhSZXN1bHRzLFxyXG4gICAgICAgICAgICAgICAgaWtjLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVycyxcclxuICAgICAgICAgICAgICAgIChycSkgPT4geyByZXR1cm4gdGhhdC5pc2wuRGF2a2FQREIubGlzdChycSk7IH0sXHJcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZSxcclxuICAgICAgICAgICAgICAgIHRoYXQuUHJpbWFyeUtleSxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50c1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2LEjWVyc3R2w60gc2V6bmFtIGEgcMWZZWtvbnRyb2x1amUgZGF0YSAob2JvamUgdm9saXRlbG7EmylcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dDb250ZW50fSBjbnQgY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVsb2FkRGF0YSBtYWrDrSBzZSBuYcSNw61zdCBha3R1w6FsbsOtIGRhdGEgeiBkYXRhYsOhemU/ICh0cnVlID0gYW5vLCBmYWxzZSA9IG5lKVxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvW10gfCB1bmRlZmluZWR9IGRhdGEgZGF0YSBwcm8gcMWZw61wYWQsIMW+ZSBzZSBuZW1hasOtIG5hxI3DrXRhdCB6IGRhdGFiw6F6ZSAocmVsb2FkRGF0YSA9IGZhbHNlKVxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdlbmVyYWwuR0lrY30gaWtjIElLQ1xyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nW10gfCB1bmRlZmluZWR9IGZyYWdtZW50cyBmcmFnbWVudHlcclxuICAgICAgICAgKiBAcGFyYW0geygoZHRvOiBUT3BlcmF0aW9uRHRvKSA9PiBhbnkpIHwgdW5kZWZpbmVkfSBjaGVja0FjdGlvbiBkZWxlZ8OhdCBwcm8ga29udHJvbHUgZGF0IHDFmWVkIG9wZXJhY8OtIChwb2t1ZCBuZW7DrSwgbmV2b2zDoSBzZSBrb250cm9sYSwgamVuIHNlIG5hxI10b3UgYWt0dcOhbG7DrSBkYXRhKVxyXG4gICAgICAgICAqIEBwYXJhbSB7KG1vZGVsOiBUTW9kZWwgfCB1bmRlZmluZWQsIGRhdGE6IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0b1tdLCBpa2M6IEdvcmRpYy5HZW5lcmFsLkdJa2MpID0+IFRPcGVyYXRpb25EdG99IHRvT3BlcmF0aW9uRHRvIGRlbGVnw6F0IHBybyB2eXR2b8WZZW7DrSBEVE8gb3BlcmFjZVxyXG4gICAgICAgICAqIEBwYXJhbSB7VE1vZGVsIHwgdW5kZWZpbmVkfSBtb2RlbCBtb2RlbFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5NYXNzT3BlcmF0aW9uRGF0YTxHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG8+W10+fSBzZXpuYW0gZMOhdmVrIChzIHbDvXNsZWRreSBvcGVyYWNlIG5lYm8gYmV6IHBvZGxlIHBhcmFtZXRydSB3aXRoUmVzdWx0cylcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHdpemFyZFJlZnJlc2hBbmRDaGVja0RhdGE8VE9wZXJhdGlvbkR0bywgVE1vZGVsPihcclxuICAgICAgICAgICAgY250OiBHQ29udGVudCxcclxuICAgICAgICAgICAgcmVsb2FkRGF0YTogYm9vbGVhbixcclxuICAgICAgICAgICAgZGF0YTogR29yZGljLkJ1Yy5JbnRlcmZhY2UuR0RhdmthUERCRHRvW10gfCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGlrYzogR29yZGljLkdlbmVyYWwuR0lrYyxcclxuICAgICAgICAgICAgZnJhZ21lbnRzOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgY2hlY2tBY3Rpb246ICgoZHRvOiBUT3BlcmF0aW9uRHRvKSA9PiBhbnkpIHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0b09wZXJhdGlvbkR0bzogKG1vZGVsOiBUTW9kZWwgfCB1bmRlZmluZWQsIGRhdGE6IEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0b1tdLCBpa2M6IEdvcmRpYy5HZW5lcmFsLkdJa2MpID0+IFRPcGVyYXRpb25EdG8sXHJcbiAgICAgICAgICAgIG1vZGVsOiBUTW9kZWwgfCB1bmRlZmluZWRcclxuICAgICAgICApOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5NYXNzT3BlcmF0aW9uRGF0YTxHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG8+W10+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHZvbMOhbsOtIG9iZWNuw6kgbWV0b2R5IG9ixI1lcnN0dmVuw60gc2V6bmFtdSBhIGtvbnRyb2x1IGRhdFxyXG4gICAgICAgICAgICByZXR1cm4gQnVjV2l6YXJkLnJlZnJlc2hBbmRDaGVja0RhdGEoXHJcbiAgICAgICAgICAgICAgICBjbnQsXHJcbiAgICAgICAgICAgICAgICByZWxvYWREYXRhLFxyXG4gICAgICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgICAgIGlrYyxcclxuICAgICAgICAgICAgICAgICh3aXRoUmVzdWx0czogYm9vbGVhbiwgaWtjOiBzdHJpbmcpID0+IHsgcmV0dXJuIHRoYXQud2l6YXJkR2V0RGF0YShmYWxzZSwgd2l0aFJlc3VsdHMsIGlrYywgZnJhZ21lbnRzKTsgfSxcclxuICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgdG9PcGVyYXRpb25EdG8sXHJcbiAgICAgICAgICAgICAgICBtb2RlbFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V6bmFtIGFrY8OtIHBybyBtZW51IChoYW1idXJnZXIgbmVibyBrb250ZXh0b3bDqSBtZW51IGdyaWR1KVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY29udGV4dE1lbnUgZm9ybcOhdCBwcm8ga29udGV4dG92w6kgbWVudSBncmlkdSAodHJ1ZSAoZGVmYXVsdCkgPSBhbm8sIGZhbHNlID0gbmUpXHJcbiAgICAgICAgICogQHBhcmFtIHtJR0dyaWRDZWxsQ29udGV4dDxHb3JkaWMuQnVjLkludGVyZmFjZS5HRGF2a2FQREJEdG8+fSBbY2VsbENvbnRleHRdIGtvbnRleHQgeiBncmlkdSAocG91emUgcHJvIGNvbnRleHRNZW51ID0gdHJ1ZSkgKGRlZmF1bHQgPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICogQHJldHVybnMge2FueX0gc2V6bmFtIGFrY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRNZW51QWN0aW9ucyhjb250ZXh0TWVudTogYm9vbGVhbiA9IGZhbHNlLCBjZWxsQ29udGV4dD86IElHR3JpZENlbGxDb250ZXh0PEdvcmRpYy5CdWMuSW50ZXJmYWNlLkdEYXZrYVBEQkR0bz4pOiBhbnkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHRNZW51XHJcbiAgICAgICAgICAgICAgICA/IFtcclxuICAgICAgICAgICAgICAgICAgICBcImFjdERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UG9kcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0RG9rb25jaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFN0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdEhpc3RvcmllXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQb2RlcHNhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0T2Rlc2xhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0U3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQcmlkYXREb1Bvcm92bmFuaVwiXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICA6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdERldGFpbCwgcHJpbWFyeTogdHJ1ZSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFBvZHBpc3kqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3REb2tvbmNpdCpcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFN0YXYqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RIaXN0b3JpZSpcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFBvZGVwc2F0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RPZGVzbGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RTdG9ybm8qXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQcmlkYXREb1Bvcm92bmFuaVwiXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb3BlbkRldGFpbFBvZHBpc3kgLSBPdGV2xZllbsOtIGRpYWxvZ3UgcyBwb2RwaXN5IGdlbmVyb3ZhbsOpIGTDoXZreSBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wZW5EZXRhaWxQb2RwaXN5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZWxlbWVudC5maW5kKFwiLlNlem5hbUJ1Yy5nZ3JpZFwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdQb2RwaXN5RGxnXCIsIHsgaXhwOiBzZWxlY3Rpb25bMF0uaXhwX2RhdiwgaXhiOiBzZWxlY3Rpb25bMF0uaXhiLCBwb2NfcG9kOiBzZWxlY3Rpb25bMF0ucG9jX3BvZCB9LCB7IHdpZHRoOiA4NTAsIGhlaWdodDogNDAwIH0pXHJcbiAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgocikgPT4gISFyKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==