"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GParovaciZapisy.ts                     </Name>
//    <Description> Content pro párovací zápisy (tři různé módy - okna)         </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-12-05                                                  </Created>
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
            /** Content pro párovací zápisy (tři různé módy - okna) */
            let GParovaciZapisy = class GParovaciZapisy extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createFilterPanel();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actOdparovat: {
                            caption: "jres:33600387", //RC 33600387 : Odpárovat
                            tooltip: "jres:33600388", //RC 33600388 : Spárovaná položka se změní na nespárovanou, dojde k odpárování
                            permission: this.Permissions.LzeOdparovat,
                            run: function (ev, ctx) {
                                //this.setPending(that.odparovat());
                                this.setPending(that.dialogs.error("TODO").createDialogPromise());
                            }
                        },
                        actStorno: {
                            caption: "jres:33600389", //RC 33600389 : Storno
                            tooltip: "jres:33600662", //RC 33600662 : Hromadné nastavení stavu položek NE- nespárovaná na stav NZ- nespárován-zrušen a případně obráceně
                            permission: this.Permissions.LzeStornovat,
                            run: function (ev, ctx) {
                                this.setPending(that.storno());
                            }
                        },
                        actRozpis: {
                            caption: "jres:33600592", //RC 33600592 : Rozpis
                            tooltip: "jres:33600593", //RC 33600593 : Rozepsání položky bankovního výpisu
                            permission: this.Permissions.LzeRozpis,
                            run: function (ev, ctx) {
                                this.setPending(that.rozpis());
                            }
                        },
                        actParovano: {
                            caption: "jres:33600393", //RC 33600393 : Párováno
                            tooltip: "jres:33600394", //RC 33600394 : Zobrazení údajů o párované protipoložce
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.parovano());
                            }
                        },
                        actHistorieParovani: {
                            caption: "jres:33600395", //RC 33600395 : Historie párování
                            tooltip: "jres:33600396", //RC 33600396 : Zobrazení údajů o historii párování
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.historieParovani());
                            }
                        },
                        actOdstranit: {
                            caption: "jres:33600391", //RC 33600391 : Odstranit
                            tooltip: "jres:33600663", //RC 33600663 : Hromadné odstranění položek
                            permission: this.Permissions.LzeOdstranit,
                            run: function (ev, ctx) {
                                this.setPending(that.odstranit());
                            }
                        },
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tooltip: "jres:33600681", //RC 33600681 : Tisk párovacích zápisů
                            tema: (this.rezim == 0 /* Interface.GParovaciZapisyRezim.Pok */) ? "buc_ptm_pokpol" : "buc_ptm_zappol",
                            ixsStr: (this.rezim == 0 /* Interface.GParovaciZapisyRezim.Pok */) ? this.buc_ptm_pokpol : this.buc_ptm_zappol,
                            enabled: false,
                            serverParameterMethod: (this.rezim == 0 /* Interface.GParovaciZapisyRezim.Pok */) ? "Gordic.Buc.WebClient.GParovaciZapisyPok:PrintParameters" : "Gordic.Buc.WebClient.GParovaciZapisyKompenzace:PrintParameters",
                            reportStarting: function (rep) {
                                if (Gordic.Utils.WidgetExists("gfilterpanel", that.$filterPanel)) {
                                    // aktuální filtry pro předání do C# metody
                                    let filterPanelData = that.$filterPanel.gfilterpanel("getConfirmedData");
                                    return that.getFilter(filterPanelData).then((data) => {
                                        let maskaText = [];
                                        const columns = that.$grid.ggrid("trueColumns");
                                        const filterKeys = Object.keys(data.filter);
                                        for (let column of columns) {
                                            let filterKey = filterKeys.find((el, idx, arr) => { return el == column.name; });
                                            if (filterKey && data.filter[filterKey]) {
                                                //našlo se i s filtrem
                                                let hasStartValue = (data.filter[filterKey].start || data.filter[filterKey].start == 0);
                                                let hasEndValue = (data.filter[filterKey].end || data.filter[filterKey].end == 0);
                                                if (hasStartValue && hasEndValue) {
                                                    maskaText.push(column.caption + ": " + data.filter[filterKey].start + " - " + data.filter[filterKey].end);
                                                }
                                                else if (hasStartValue && !hasEndValue) {
                                                    maskaText.push(column.caption + ": >= " + data.filter[filterKey].start);
                                                }
                                                else if (!hasStartValue && hasEndValue) {
                                                    maskaText.push(column.caption + ": <= " + data.filter[filterKey].end);
                                                }
                                            }
                                            else {
                                                continue;
                                            }
                                        }
                                        rep.customDto = { filters: data.filter, maskaText: maskaText.join(", "), rezim: that.rezim };
                                        return rep;
                                    });
                                }
                            }
                        }),
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actOdparovat*", "actStorno*", "actRozpis*", "actParovano*", "actHistorieParovani*", "actOdstranit*", "actTisk*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření filtr panelu nad gridem*/
                createFilterPanel() {
                    this.$filterPanel = $.newDiv().appendTo(this.element).gfilterpanel({
                        forms: [new Gordic.Forms.Form()],
                        favorites: [],
                        autoLoadAfter: [],
                        filterViewMode: FilterViewMode.Simple,
                        reset: () => { this.$grid.ggridserverfilter("clear"); }
                    });
                }
                /** Vytvoření gridu */
                createGrid() {
                    this.$grid = $.newDiv().css("height", "100%").appendTo(this.element).ggrid({
                        name: "gridParovaciZapisy",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucParovaciZapisy.list({ filters: { rezim: this.rezim }, fragments: ["*"] }).use((req, next, ctx) => {
                            return this.getFilterData(this, req, next);
                        }), {
                            key: ["ixp", "radek_pol", "subradek", "radek_av"],
                            filterPanel: this.$filterPanel,
                            startEmpty: true,
                            onResponse: (response) => {
                                if ((response?.data?.length ?? 0) >= 1) {
                                    this.actions.actTisk?.enabled(true);
                                }
                                return response;
                            }
                        }),
                        columnMode: "full",
                        multi: true,
                        defaultProfile: {
                            //sort: "ucet_vl,cis_pid,radek_pol,subradek",
                            condFormats: [
                                {
                                    formula: "@c < 0",
                                    description: "jres:33600494", //RC 33600494 : Částka menší než 0
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red,
                                    applyTo: "c,c_mena"
                                }
                            ]
                        },
                        selection: (ev, obj) => {
                            //kontrola na normální řádek a nastavení permission
                            if (obj.count >= 1 && obj.getSelection(false, false).length >= 1) {
                                let row = obj.getSelection()[0];
                                this.actions.actParovano?.updatePermission(row.Permissions?.LzeParovano);
                                this.actions.actHistorieParovani?.enabled(true);
                                this.actions.actRozpis?.updatePermission(row.Permissions?.LzeRozpis);
                            }
                            else {
                                this.actions.actParovano?.enabled(false);
                                this.actions.actHistorieParovani?.enabled(false);
                                this.actions.actRozpis?.enabled(false);
                            }
                        }
                    }).ggridserverfilter({}).gautofit();
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({
                        name: "s_pol_zkr" /* Interface.GParovaciZapisyDtoNames.s_pol_zkr */,
                        caption: "jres:33600664", //RC 33600664 : S 
                        description: "jres:33600665", //RC 33600665 : Stav položky
                        width: 32,
                        cellTemplate: (data) => { return data.s_pol_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_pol_txt ?? ""; },
                    });
                    gridFormat.addTextColumn({
                        name: "ktg_typ_txt" /* Interface.GParovaciZapisyDtoNames.ktg_typ_txt */,
                        caption: "jres:33600666", //RC 33600666 : Typ
                        width: 100
                    });
                    gridFormat.addTextColumn({
                        name: "ixp" /* Interface.GParovaciZapisyDtoNames.ixp */,
                        caption: (this.rezim == 1 /* Interface.GParovaciZapisyRezim.Kompenzace */) ? "jres:33600612" : "jres:33600667", //RC 33600667 : Identifikátor BUC
                        width: 140,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "ixp" /* Interface.GParovaciZapisyDtoNames.ixp */
                        })
                    });
                    gridFormat.addVs({
                        name: "vs" /* Interface.GParovaciZapisyDtoNames.vs */,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "vs" /* Interface.GParovaciZapisyDtoNames.vs */
                        })
                    });
                    if (this.rezim != 0 /* Interface.GParovaciZapisyRezim.Pok */) {
                        gridFormat.addKs({
                            name: "ks" /* Interface.GParovaciZapisyDtoNames.ks */,
                            serverFilter: Gordic.Eko.Filters.stringInterval({
                                model: "ks" /* Interface.GParovaciZapisyDtoNames.ks */
                            })
                        });
                        gridFormat.addSs({
                            name: "ss" /* Interface.GParovaciZapisyDtoNames.ss */,
                            serverFilter: Gordic.Eko.Filters.stringInterval({
                                model: "ss" /* Interface.GParovaciZapisyDtoNames.ss */
                            })
                        });
                    }
                    if (this.rezim != 1 /* Interface.GParovaciZapisyRezim.Kompenzace */) {
                        gridFormat.addTextColumn({
                            name: "ixp_pok" /* Interface.GParovaciZapisyDtoNames.ixp_pok */,
                            caption: "jres:33600668", //RC 33600668 : Identifikátor POK
                            width: 140,
                            serverFilter: Gordic.Eko.Filters.stringInterval({
                                model: "ixp_pok" /* Interface.GParovaciZapisyDtoNames.ixp_pok */
                            })
                        });
                    }
                    gridFormat.addCurrencyColumn({
                        name: "c" /* Interface.GParovaciZapisyDtoNames.c */,
                        caption: "jres:33600669", //RC 33600669 : Částka
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({
                            model: "c" /* Interface.GParovaciZapisyDtoNames.c */
                        })
                    });
                    if (this.rezim == 1 /* Interface.GParovaciZapisyRezim.Kompenzace */) {
                        gridFormat.addDateColumn({
                            name: "dat_nov_zus" /* Interface.GParovaciZapisyDtoNames.dat_nov_zus */,
                            caption: "jres:33600670", //RC 33600670 : Datum UUP
                            description: "jres:33600671", //RC 33600671 : Datum uskutečnění účetního případu
                            width: 110,
                            serverFilter: Gordic.Eko.Filters.dateInterval({
                                model: "dat_nov_zus" /* Interface.GParovaciZapisyDtoNames.dat_nov_zus */
                            })
                        });
                    }
                    if (this.rezim != 1 /* Interface.GParovaciZapisyRezim.Kompenzace */) {
                        gridFormat.addDateColumn({
                            name: "dat_zap" /* Interface.GParovaciZapisyDtoNames.dat_zap */,
                            caption: "jres:33600672", //RC 33600672 : Datum zaplacení
                            width: 130,
                            serverFilter: Gordic.Eko.Filters.dateInterval({
                                model: "dat_zap" /* Interface.GParovaciZapisyDtoNames.dat_zap */
                            })
                        });
                    }
                    gridFormat.addTextColumn({
                        name: "nazev" /* Interface.GParovaciZapisyDtoNames.nazev */,
                        caption: "jres:33600673", //RC 33600673 : Popis
                        width: 300,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "nazev" /* Interface.GParovaciZapisyDtoNames.nazev */
                        })
                    });
                    gridFormat.addTextColumn({
                        name: "zu_txt" /* Interface.GParovaciZapisyDtoNames.zu_txt */,
                        caption: "jres:33600674", //RC 33600674 : Způsob úhrady
                        width: 120
                    });
                    if (this.rppUus == 1) {
                        gridFormat.addUus();
                    }
                    return gridFormat;
                }
                /** Získání, přidání a upravení filtrů pro volaní Isl*/
                getFilterData(that, req, next) {
                    return that.getFilter(this.$filterPanel.gfilterpanel("getCurrentData"))
                        .then((newFilter) => {
                        let filters = newFilter.filter;
                        filters = {
                            ...req.filters,
                            ...filters
                        };
                        req["filters"] = filters;
                        return next(req);
                    });
                }
                /**Získání server filteru z gridu*/
                getFilter(fPanelData) {
                    let filterDto = fPanelData || {};
                    return this.$grid.ggridserverfilter("collect", filterDto)
                        .then((filter) => {
                        //úprava vs, ks, ss, kdy pokud je operace =, tak nechci castovat na int, takže musím upravit vstupní filtr do islu
                        if (filter.vs && filter.vs.start == filter.vs.end) {
                            filter.vs = filter.vs.start;
                        }
                        if (filter.ks && filter.ks.start == filter.ks.end) {
                            filter.ks = filter.ks.start;
                        }
                        if (filter.ss && filter.ss.start == filter.ss.end) {
                            filter.ss = filter.ss.start;
                        }
                        return { filter: filter };
                    });
                }
                /** Zobrazení dialogu s rozpisem položky*/
                rozpis() {
                    let row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GRozpisPolozky", { uid: "GRozpisPolozky#" }], {
                        ixp: row.ixp,
                        radek_pol: row.radek_pol,
                        dat_vyp: row.dat_nov_zus,
                        uroceni: 0,
                        c_jistina: parseDecimal(0),
                        c_urok: parseDecimal(0),
                        c_preplatek: parseDecimal(0),
                        ixp_uro: void 0,
                        radek_uhr_uro: 0
                    } /*, { width: 580, height: 450 }*/).createDialogPromise().then((ctx) => {
                        if (ctx?.changed) {
                            this.$filterPanel.gfilterpanel("applyFilter");
                        }
                    });
                }
                /** Zobrazení detailu párování položky */
                parovano() {
                    let row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GParovanoDetail", { uid: "GParovanoDetail#" }], {
                        ixp_par: row.ixp_par,
                        cislo_par: row.cislo_par,
                        s_pol: row.s_pol,
                        c: row.c
                    }, { width: 580, height: 450 }).createDialogPromise();
                }
                /** Zobrazení historie párování položky */
                historieParovani() {
                    let row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GParovanoHistorie", { uid: "GParovanoHistorie#" }], {
                        ixp_par: row.ixp,
                        radek_pol: row.radek_pol,
                        subradek: row.subradek,
                        radek_av: row.radek_av
                    } /*, { width: 580, height: 450 }*/).createDialogPromise();
                }
                /** Hromadné storno vybraných položek */
                storno() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600158");
                        return $.Deferred().reject().promise();
                    } //RC 33600158 : Vyberte alespoň jeden řádek
                    let wizardChanged = false;
                    let title = "jres:33600675"; //RC 33600675 : Hromadné storno/odstorno položek
                    let description = "jres:33600676"; //RC 33600676 : Akce stornuje/odstornuje (změna stavu z NZ na NE a obráceně) vybrané (zaškrtnuté) položky párovacích zápisů
                    if (this.rezim == 1 /* Interface.GParovaciZapisyRezim.Kompenzace */) {
                        title = "jres:33600677"; //RC 33600677 : Hromadné storno položek
                        description = "jres:33600678"; //RC 33600678 : Akce stornuje vybrané (zaškrtnuté) položky párovacích zápisů
                    }
                    return this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "GHromadneStornoPolozekParovaciZapisyBuc#",
                        title: title,
                        gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                        gridProfile: this.$grid.ggrid("getCurrentProfile"),
                        keys: this.$grid.ggrid("getView").keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                            return this.isl.BucParovaciZapisy.zkontrolujPredStorno({ rezim: this.rezim, keys: keysArr })
                                .get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600162", //RC 33600162 : Výběr záznamů
                            title: "jres:33600162", //RC 33600162 : Výběr záznamů
                            description: description,
                            showIndicator: true,
                            nextAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                                return this.isl.BucParovaciZapisy.hromadneStornovat({ rezim: this.rezim, keys: keysArr })
                                    .get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                                return this.isl.BucParovaciZapisy.zkontrolujPredStorno({ rezim: this.rezim, keys: keysArr })
                                    .get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600164", //RC 33600164 : Výsledek
                            title: "jres:33600165" //RC 33600165 : Výsledek hromadné operace
                        },
                        completeDelegate: (data) => {
                            if (data.getDataRows().some(x => x.wiz_kind == 200)) {
                                wizardChanged = true;
                            }
                        }
                    }).createDialogPromise().then(() => {
                        if (wizardChanged) {
                            //znovu načtení gridu
                            this.$filterPanel.gfilterpanel("applyFilter");
                        }
                    });
                }
                /** Hromadné odstranění vybraných položek */
                odstranit() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600158");
                        return $.Deferred().reject().promise();
                    } //RC 33600158 : Vyberte alespoň jeden řádek
                    let wizardChanged = false;
                    return this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "GHromadneOdstraneniPolozekParovaciZapisyBuc#",
                        title: "jres:33600679", //RC 33600679 : Hromadné odstranění párovacích výpisů
                        gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                        gridProfile: this.$grid.ggrid("getCurrentProfile"),
                        keys: this.$grid.ggrid("getView").keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                            return this.isl.BucParovaciZapisy.zkontrolujPredOdstranit({ rezim: this.rezim, keys: keysArr })
                                .get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600162", //RC 33600162 : Výběr záznamů
                            title: "jres:33600162", //RC 33600162 : Výběr záznamů
                            description: "jres:33600680", //RC 33600680 : Akce odstraní vybrané (zaškrtnuté) párovací zápisy
                            showIndicator: true,
                            nextAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                                return this.isl.BucParovaciZapisy.hromadneOdstranit({ rezim: this.rezim, keys: keysArr })
                                    .get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                                return this.isl.BucParovaciZapisy.zkontrolujPredOdstranit({ rezim: this.rezim, keys: keysArr })
                                    .get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600164", //RC 33600164 : Výsledek
                            title: "jres:33600165" //RC 33600165 : Výsledek hromadné operace
                        },
                        completeDelegate: (data) => {
                            if (data.getDataRows().some(x => x.wiz_kind == 200)) {
                                wizardChanged = true;
                            }
                        }
                    }).createDialogPromise().then(() => {
                        if (wizardChanged) {
                            //znovu načtení gridu
                            this.$filterPanel.gfilterpanel("applyFilter");
                        }
                    });
                }
            };
            GParovaciZapisy = __decorate([
                Decorators.gcontent
            ], GParovaciZapisy);
            WebClient.GParovaciZapisy = GParovaciZapisy;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bhcm92YWNpWmFwaXN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bhcm92YWNpWmFwaXN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBaWdCZjtBQWpnQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaWdCbkI7SUFqZ0JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpZ0I3QjtRQWpnQm9CLFdBQUEsU0FBUztZQUMxQiwwREFBMEQ7WUFFMUQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxPQUFBLFlBQVk7Z0JBZTdDLGNBQWM7b0JBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGtDQUFrQztnQkFDMUIsYUFBYTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsWUFBWSxFQUFFOzRCQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCOzRCQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLDhFQUE4RTs0QkFDeEcsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWTs0QkFDekMsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLG9DQUFvQztnQ0FDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtB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WUFBWSxFQUFFLGVBQWUsRUFBRSx3QkFBd0I7NEJBQ3ZELEtBQUssRUFBRSxlQUFlLENBQUMseUNBQXlDO3lCQUNuRTt3QkFDRCxnQkFBZ0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0NBQ2xELGFBQWEsR0FBRyxJQUFJLENBQUM7NEJBQ3pCLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUMvQixJQUFJLGFBQWEsRUFBRSxDQUFDOzRCQUNoQixxQkFBcUI7NEJBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUNsRCxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFDSixDQUFBO1lBN2ZZLGVBQWU7Z0JBRDNCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsZUFBZSxDQTZmM0I7WUE3ZlkseUJBQWUsa0JBNmYzQixDQUFBO1FBQ0wsQ0FBQyxFQWpnQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlnQjdCO0lBQUQsQ0FBQyxFQWpnQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWlnQm5CO0FBQUQsQ0FBQyxFQWpnQlMsTUFBTSxLQUFOLE1BQU0sUUFpZ0JmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdQYXJvdmFjaVphcGlzeS50cyAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBDb250ZW50IHBybyBww6Fyb3ZhY8OtIHrDoXBpc3kgKHTFmWkgcsWvem7DqSBtw7NkeSAtIG9rbmEpICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBwc21lamthbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyNS0xMi0wNSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKiogQ29udGVudCBwcm8gcMOhcm92YWPDrSB6w6FwaXN5ICh0xZlpIHLFr3puw6kgbcOzZHkgLSBva25hKSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUGFyb3ZhY2laYXBpc3kgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKiBSZcW+aW0gcMOhcm92YWPDrWNoIHrDoXBpc8WvKi9cclxuICAgICAgICBwcml2YXRlIHJlemltOiBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5UmV6aW07XHJcbiAgICAgICAgLyoqIFNlcnZpY2UgUGVybWlzc2lvbnMgKi9cclxuICAgICAgICBwcml2YXRlIFBlcm1pc3Npb25zOiBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5U2VydmljZVBlcm1pc3Npb25zO1xyXG4gICAgICAgIC8qKiBHbG9iYWxzIC0gcnBwVXVzKi9cclxuICAgICAgICBwcml2YXRlIHJwcFV1cztcclxuICAgICAgICAvKiogVGlzayBEQiBQYXJhbSAtIEJVQyAtIFRUIFDDoXJvdmFjw60gesOhcGlzeSBob3Rvdm9zdG7DrWNoIG9wZXJhY8OtKi9cclxuICAgICAgICBwcml2YXRlIGJ1Y19wdG1fcG9rcG9sOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFRpc2sgREIgUGFyYW0gLSBCVUMgLSBUVCBQw6Fyb3ZhY8OtIHBvbG/Fvmt5IHrDoXBvxI10b3bDvWNoIGxpc3TFryovXHJcbiAgICAgICAgcHJpdmF0ZSBidWNfcHRtX3phcHBvbDogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlICRncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgJGZpbHRlclBhbmVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVudUJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gdGxhxI3DrXRrYSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0T2RwYXJvdmF0OiB7IC8qcGJfT2RwYXIgKi9cclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzODdcIiwgLy9SQyAzMzYwMDM4NyA6IE9kcMOhcm92YXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDAzODhcIiwgLy9SQyAzMzYwMDM4OCA6IFNww6Fyb3ZhbsOhIHBvbG/FvmthIHNlIHptxJtuw60gbmEgbmVzcMOhcm92YW5vdSwgZG9qZGUgayBvZHDDoXJvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5QZXJtaXNzaW9ucy5MemVPZHBhcm92YXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2V0UGVuZGluZyh0aGF0Lm9kcGFyb3ZhdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGlhbG9ncy5lcnJvcihcIlRPRE9cIikuY3JlYXRlRGlhbG9nUHJvbWlzZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0U3Rvcm5vOiB7IC8qcGJfU3RvICovXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzg5XCIsIC8vUkMgMzM2MDAzODkgOiBTdG9ybm9cclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA2NjJcIiwgLy9SQyAzMzYwMDY2MiA6IEhyb21hZG7DqSBuYXN0YXZlbsOtIHN0YXZ1IHBvbG/FvmVrIE5FLSBuZXNww6Fyb3ZhbsOhIG5hIHN0YXYgTlotIG5lc3DDoXJvdsOhbi16cnXFoWVuIGEgcMWZw61wYWRuxJsgb2Jyw6FjZW7Em1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuUGVybWlzc2lvbnMuTHplU3Rvcm5vdmF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuc3Rvcm5vKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RSb3pwaXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1OTJcIiwgLy9SQyAzMzYwMDU5MiA6IFJvenBpc1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDU5M1wiLCAvL1JDIDMzNjAwNTkzIDogUm96ZXBzw6Fuw60gcG9sb8W+a3kgYmFua292bsOtaG8gdsO9cGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuUGVybWlzc2lvbnMuTHplUm96cGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQucm96cGlzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQYXJvdmFubzogeyAvKnBiX1BhciAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM5M1wiLCAvL1JDIDMzNjAwMzkzIDogUMOhcm92w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDM5NFwiLCAvL1JDIDMzNjAwMzk0IDogWm9icmF6ZW7DrSDDumRhasWvIG8gcMOhcm92YW7DqSBwcm90aXBvbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5wYXJvdmFubygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0SGlzdG9yaWVQYXJvdmFuaTogeyAvKnBiX0hpc1BhciAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM5NVwiLCAvL1JDIDMzNjAwMzk1IDogSGlzdG9yaWUgcMOhcm92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDAzOTZcIiwgLy9SQyAzMzYwMDM5NiA6IFpvYnJhemVuw60gw7pkYWrFryBvIGhpc3RvcmlpIHDDoXJvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5oaXN0b3JpZVBhcm92YW5pKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPZHN0cmFuaXQ6IHsgLypwYl9EZWwgKi9cclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzOTFcIiwgLy9SQyAzMzYwMDM5MSA6IE9kc3RyYW5pdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDY2M1wiLCAvL1JDIDMzNjAwNjYzIDogSHJvbWFkbsOpIG9kc3RyYW7Em27DrSBwb2xvxb5la1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuUGVybWlzc2lvbnMuTHplT2RzdHJhbml0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQub2RzdHJhbml0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA2ODFcIiwgLy9SQyAzMzYwMDY4MSA6IFRpc2sgcMOhcm92YWPDrWNoIHrDoXBpc8WvXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogKHRoaXMucmV6aW0gPT0gSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeVJlemltLlBvaykgPyBcImJ1Y19wdG1fcG9rcG9sXCIgOiBcImJ1Y19wdG1femFwcG9sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzU3RyOiAodGhpcy5yZXppbSA9PSBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5UmV6aW0uUG9rKSA/IHRoaXMuYnVjX3B0bV9wb2twb2wgOiB0aGlzLmJ1Y19wdG1femFwcG9sLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogKHRoaXMucmV6aW0gPT0gSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeVJlemltLlBvaykgPyBcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdQYXJvdmFjaVphcGlzeVBvazpQcmludFBhcmFtZXRlcnNcIiA6IFwiR29yZGljLkJ1Yy5XZWJDbGllbnQuR1Bhcm92YWNpWmFwaXN5S29tcGVuemFjZTpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmaWx0ZXJwYW5lbFwiLCB0aGF0LiRmaWx0ZXJQYW5lbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gZmlsdHJ5IHBybyBwxZllZMOhbsOtIGRvIEMjIG1ldG9keVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlclBhbmVsRGF0YSA9IHRoYXQuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldENvbmZpcm1lZERhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZXRGaWx0ZXIoZmlsdGVyUGFuZWxEYXRhKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1hc2thVGV4dDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gdGhhdC4kZ3JpZC5nZ3JpZChcInRydWVDb2x1bW5zXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcktleXMgPSBPYmplY3Qua2V5cyhkYXRhLmZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uIG9mIGNvbHVtbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcktleSA9IGZpbHRlcktleXMuZmluZCgoZWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiBlbCA9PSBjb2x1bW4ubmFtZTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcktleSAmJiBkYXRhLmZpbHRlcltmaWx0ZXJLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hxaFsbyBzZSBpIHMgZmlsdHJlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc1N0YXJ0VmFsdWU6IGJvb2xlYW4gPSAoZGF0YS5maWx0ZXJbZmlsdGVyS2V5XS5zdGFydCB8fCBkYXRhLmZpbHRlcltmaWx0ZXJLZXldLnN0YXJ0ID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc0VuZFZhbHVlOiBib29sZWFuID0gKGRhdGEuZmlsdGVyW2ZpbHRlcktleV0uZW5kIHx8IGRhdGEuZmlsdGVyW2ZpbHRlcktleV0uZW5kID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1N0YXJ0VmFsdWUgJiYgaGFzRW5kVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrYVRleHQucHVzaChjb2x1bW4uY2FwdGlvbiArIFwiOiBcIiArIGRhdGEuZmlsdGVyW2ZpbHRlcktleV0uc3RhcnQgKyBcIiAtIFwiICsgZGF0YS5maWx0ZXJbZmlsdGVyS2V5XS5lbmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0VmFsdWUgJiYgIWhhc0VuZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza2FUZXh0LnB1c2goY29sdW1uLmNhcHRpb24gKyBcIjogPj0gXCIgKyBkYXRhLmZpbHRlcltmaWx0ZXJLZXldLnN0YXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaGFzU3RhcnRWYWx1ZSAmJiBoYXNFbmRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2thVGV4dC5wdXNoKGNvbHVtbi5jYXB0aW9uICsgXCI6IDw9IFwiICsgZGF0YS5maWx0ZXJbZmlsdGVyS2V5XS5lbmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBmaWx0ZXJzOiBkYXRhLmZpbHRlciwgbWFza2FUZXh0OiBtYXNrYVRleHQuam9pbihcIiwgXCIpLCByZXppbTogdGhhdC5yZXppbSBhcyBudW1iZXIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RPZHBhcm92YXQqXCIsIFwiYWN0U3Rvcm5vKlwiLCBcImFjdFJvenBpcypcIiwgXCJhY3RQYXJvdmFubypcIiwgXCJhY3RIaXN0b3JpZVBhcm92YW5pKlwiLCBcImFjdE9kc3RyYW5pdCpcIiwgXCJhY3RUaXNrKlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RaYXZyaXRcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBmaWx0ciBwYW5lbHUgbmFkIGdyaWRlbSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJQYW5lbCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGZvcm1zOiBbbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKCldLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBbXSxcclxuICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXI6IFtdLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgIHJlc2V0OiAoKSA9PiB7IHRoaXMuJGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBncmlkdSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KCkuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdncmlkPEludGVyZmFjZS5HUGFyb3ZhY2laYXBpc3lEdG8+KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFBhcm92YWNpWmFwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXc8SW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2wuQnVjUGFyb3ZhY2laYXBpc3kubGlzdCh7IGZpbHRlcnM6IHsgcmV6aW06IHRoaXMucmV6aW0gfSwgZnJhZ21lbnRzOiBbXCIqXCJdIH0pLnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsdGVyRGF0YSh0aGlzLCByZXEsIG5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJpeHBcIiwgXCJyYWRla19wb2xcIiwgXCJzdWJyYWRla1wiLCBcInJhZGVrX2F2XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhpcy4kZmlsdGVyUGFuZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RW1wdHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVzcG9uc2U6IChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyZXNwb25zZT8uZGF0YT8ubGVuZ3RoID8/IDApID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VGlzaz8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc29ydDogXCJ1Y2V0X3ZsLGNpc19waWQscmFkZWtfcG9sLHN1YnJhZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAYyA8IDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA0OTRcIiwgLy9SQyAzMzYwMDQ5NCA6IMSMw6FzdGthIG1lbsWhw60gbmXFviAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5VG86IFwiYyxjX21lbmFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2tvbnRyb2xhIG5hIG5vcm3DoWxuw60gxZnDoWRlayBhIG5hc3RhdmVuw60gcGVybWlzc2lvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouY291bnQgPj0gMSAmJiBvYmouZ2V0U2VsZWN0aW9uKGZhbHNlLCBmYWxzZSkubGVuZ3RoID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IG9iai5nZXRTZWxlY3Rpb24oKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFBhcm92YW5vPy51cGRhdGVQZXJtaXNzaW9uKHJvdy5QZXJtaXNzaW9ucz8uTHplUGFyb3Zhbm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0SGlzdG9yaWVQYXJvdmFuaT8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFJvenBpcz8udXBkYXRlUGVybWlzc2lvbihyb3cuUGVybWlzc2lvbnM/Lkx6ZVJvenBpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0UGFyb3Zhbm8/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0SGlzdG9yaWVQYXJvdmFuaT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RSb3pwaXM/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZ2dyaWRzZXJ2ZXJmaWx0ZXIoe30pLmdhdXRvZml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZGZvcm3DoXR1IGdyaWR1Ki9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIGxldCBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0bz4oKVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLnNfcG9sX3prcixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDY2NFwiLCAvL1JDIDMzNjAwNjY0IDogUyBcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA2NjVcIiwgLy9SQyAzMzYwMDY2NSA6IFN0YXYgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMixcclxuICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIGRhdGEuc19wb2xfemtyID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBkYXRhLnNfcG9sX3R4dCA/PyBcIlwiOyB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLmt0Z190eXBfdHh0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjY2XCIsIC8vUkMgMzM2MDA2NjYgOiBUeXBcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUGFyb3ZhY2laYXBpc3lEdG9OYW1lcy5peHAsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiAodGhpcy5yZXppbSA9PSBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5UmV6aW0uS29tcGVuemFjZSkgPyBcImpyZXM6MzM2MDA2MTJcIiA6IFwianJlczozMzYwMDY2N1wiLCAvL1JDIDMzNjAwNjY3IDogSWRlbnRpZmlrw6F0b3IgQlVDXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvTmFtZXMuaXhwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFZzKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUGFyb3ZhY2laYXBpc3lEdG9OYW1lcy52cyxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLnZzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXppbSAhPSBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5UmV6aW0uUG9rKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZEtzKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvTmFtZXMua3MsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLmtzXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFNzKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvTmFtZXMuc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLnNzXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucmV6aW0gIT0gSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeVJlemltLktvbXBlbnphY2UpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLml4cF9wb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjY4XCIsIC8vUkMgMzM2MDA2NjggOiBJZGVudGlmaWvDoXRvciBQT0tcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IEludGVyZmFjZS5HUGFyb3ZhY2laYXBpc3lEdG9OYW1lcy5peHBfcG9rXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDY2OVwiLCAvL1JDIDMzNjAwNjY5IDogxIzDoXN0a2FcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvTmFtZXMuY1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKHRoaXMucmV6aW0gPT0gSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeVJlemltLktvbXBlbnphY2UpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLmRhdF9ub3ZfenVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDY3MFwiLCAvL1JDIDMzNjAwNjcwIDogRGF0dW0gVVVQXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDY3MVwiLCAvL1JDIDMzNjAwNjcxIDogRGF0dW0gdXNrdXRlxI1uxJtuw60gw7rEjWV0bsOtaG8gcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kYXRlSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLmRhdF9ub3ZfenVzXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucmV6aW0gIT0gSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeVJlemltLktvbXBlbnphY2UpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLmRhdF96YXAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjcyXCIsIC8vUkMgMzM2MDA2NzIgOiBEYXR1bSB6YXBsYWNlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kYXRlSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLmRhdF96YXBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjczXCIsIC8vUkMgMzM2MDA2NzMgOiBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLm5hemV2XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b05hbWVzLnp1X3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDY3NFwiLCAvL1JDIDMzNjAwNjc0IDogWnDFr3NvYiDDumhyYWR5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJwcFV1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFV1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBaw61za8OhbsOtLCBwxZlpZMOhbsOtIGEgdXByYXZlbsOtIGZpbHRyxa8gcHJvIHZvbGFuw60gSXNsKi9cclxuICAgICAgICBwcml2YXRlIGdldEZpbHRlckRhdGEodGhhdDogdGhpcywgcmVxOiBJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbmV4dDogSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHwgSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgYW55LypJbnRlcmZhY2UuR1BvemFkYXZreUR0byovPikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5nZXRGaWx0ZXIodGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikpXHJcbiAgICAgICAgICAgICAgICAudGhlbigobmV3RmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSBuZXdGaWx0ZXIuZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnJlcS5maWx0ZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5maWx0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxW1wiZmlsdGVyc1wiXSA9IGZpbHRlcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQocmVxKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqWsOtc2vDoW7DrSBzZXJ2ZXIgZmlsdGVydSB6IGdyaWR1Ki9cclxuICAgICAgICBwcml2YXRlIGdldEZpbHRlcihmUGFuZWxEYXRhPzogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJEdG8gPSBmUGFuZWxEYXRhIHx8IHt9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImNvbGxlY3RcIiwgZmlsdGVyRHRvKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGZpbHRlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/DunByYXZhIHZzLCBrcywgc3MsIGtkeSBwb2t1ZCBqZSBvcGVyYWNlID0sIHRhayBuZWNoY2kgY2FzdG92YXQgbmEgaW50LCB0YWvFvmUgbXVzw61tIHVwcmF2aXQgdnN0dXBuw60gZmlsdHIgZG8gaXNsdVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIudnMgJiYgZmlsdGVyLnZzLnN0YXJ0ID09IGZpbHRlci52cy5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnZzID0gZmlsdGVyLnZzLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmtzICYmIGZpbHRlci5rcy5zdGFydCA9PSBmaWx0ZXIua3MuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5rcyA9IGZpbHRlci5rcy5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5zcyAmJiBmaWx0ZXIuc3Muc3RhcnQgPT0gZmlsdGVyLnNzLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuc3MgPSBmaWx0ZXIuc3Muc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBmaWx0ZXI6IGZpbHRlciB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogWm9icmF6ZW7DrSBkaWFsb2d1IHMgcm96cGlzZW0gcG9sb8W+a3kqL1xyXG4gICAgICAgIHByaXZhdGUgcm96cGlzKCkge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8SW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICghcm93KSB7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFxyXG4gICAgICAgICAgICAgICAgW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR1JvenBpc1BvbG96a3lcIiwgeyB1aWQ6IFwiR1JvenBpc1BvbG96a3kjXCIgfV0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiByb3cuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrX3BvbDogcm93LnJhZGVrX3BvbCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRfdnlwOiByb3cuZGF0X25vdl96dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJvY2VuaTogMCxcclxuICAgICAgICAgICAgICAgICAgICBjX2ppc3RpbmE6IHBhcnNlRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgICAgICBjX3Vyb2s6IHBhcnNlRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgICAgICBjX3ByZXBsYXRlazogcGFyc2VEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4cF91cm86IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICByYWRla191aHJfdXJvOiAwXHJcbiAgICAgICAgICAgICAgICB9LyosIHsgd2lkdGg6IDU4MCwgaGVpZ2h0OiA0NTAgfSovKS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0eD8uY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFpvYnJhemVuw60gZGV0YWlsdSBww6Fyb3bDoW7DrSBwb2xvxb5reSAqL1xyXG4gICAgICAgIHByaXZhdGUgcGFyb3Zhbm8oKSB7XHJcbiAgICAgICAgICAgIGxldCByb3cgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgaWYgKCFyb3cpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFxyXG4gICAgICAgICAgICAgICAgW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR1Bhcm92YW5vRGV0YWlsXCIsIHsgdWlkOiBcIkdQYXJvdmFub0RldGFpbCNcIiB9XSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBfcGFyOiByb3cuaXhwX3BhcixcclxuICAgICAgICAgICAgICAgICAgICBjaXNsb19wYXI6IHJvdy5jaXNsb19wYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc19wb2w6IHJvdy5zX3BvbCxcclxuICAgICAgICAgICAgICAgICAgICBjOiByb3cuY1xyXG4gICAgICAgICAgICAgICAgfSwgeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQ1MCB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogWm9icmF6ZW7DrSBoaXN0b3JpZSBww6Fyb3bDoW7DrSBwb2xvxb5reSAqL1xyXG4gICAgICAgIHByaXZhdGUgaGlzdG9yaWVQYXJvdmFuaSgpIHtcclxuICAgICAgICAgICAgbGV0IHJvdyA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEludGVyZmFjZS5HUGFyb3ZhY2laYXBpc3lEdG8+KHRoaXMuJGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXJvdykgeyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXHJcbiAgICAgICAgICAgICAgICBbXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HUGFyb3Zhbm9IaXN0b3JpZVwiLCB7IHVpZDogXCJHUGFyb3Zhbm9IaXN0b3JpZSNcIiB9XSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBfcGFyOiByb3cuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrX3BvbDogcm93LnJhZGVrX3BvbCxcclxuICAgICAgICAgICAgICAgICAgICBzdWJyYWRlazogcm93LnN1YnJhZGVrLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrX2F2OiByb3cucmFkZWtfYXZcclxuICAgICAgICAgICAgICAgIH0vKiwgeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQ1MCB9Ki8pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEhyb21hZG7DqSBzdG9ybm8gdnlicmFuw71jaCBwb2xvxb5layAqL1xyXG4gICAgICAgIHByaXZhdGUgc3Rvcm5vKCkge1xyXG4gICAgICAgICAgICBsZXQgcm93czogSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0b1tdIHwgbnVsbCA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgaWYgKCFyb3dzIHx8IChyb3dzPy5sZW5ndGggPz8gMCkgPCAxKSB7IHRoaXMuZGlhbG9ncy5hbGVydChcImpyZXM6MzM2MDAxNThcIik7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9IC8vUkMgMzM2MDAxNTggOiBWeWJlcnRlIGFsZXNwb8WIIGplZGVuIMWZw6FkZWtcclxuICAgICAgICAgICAgbGV0IHdpemFyZENoYW5nZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IFwianJlczozMzYwMDY3NVwiOyAvL1JDIDMzNjAwNjc1IDogSHJvbWFkbsOpIHN0b3Juby9vZHN0b3JubyBwb2xvxb5la1xyXG4gICAgICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBcImpyZXM6MzM2MDA2NzZcIjsgLy9SQyAzMzYwMDY3NiA6IEFrY2Ugc3Rvcm51amUvb2RzdG9ybnVqZSAoem3Em25hIHN0YXZ1IHogTlogbmEgTkUgYSBvYnLDoWNlbsSbKSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBwb2xvxb5reSBww6Fyb3ZhY8OtY2ggesOhcGlzxa9cclxuICAgICAgICAgICAgaWYgKHRoaXMucmV6aW0gPT0gSW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeVJlemltLktvbXBlbnphY2UpIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gXCJqcmVzOjMzNjAwNjc3XCI7IC8vUkMgMzM2MDA2NzcgOiBIcm9tYWRuw6kgc3Rvcm5vIHBvbG/FvmVrXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9IFwianJlczozMzYwMDY3OFwiOyAvL1JDIDMzNjAwNjc4IDogQWtjZSBzdG9ybnVqZSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBwb2xvxb5reSBww6Fyb3ZhY8OtY2ggesOhcGlzxa9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwiR0hyb21hZG5lU3Rvcm5vUG9sb3pla1Bhcm92YWNpWmFwaXN5QnVjI1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0bz4oKS5hZGQodGhpcy4kZ3JpZC5nZ3JpZDxJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvLCBcImNvbHVtbnNcIj4oXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgIGdyaWRQcm9maWxlOiB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HUGFyb3ZhY2laYXBpc3lEdG8+KFwiZ2V0Q3VycmVudFByb2ZpbGVcIiksXHJcbiAgICAgICAgICAgICAgICBrZXlzOiB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HUGFyb3ZhY2laYXBpc3lEdG8+KFwiZ2V0Vmlld1wiKS5rZXlzLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcm93cyxcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICBwcmVDaGVja0FjdGlvbjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfcG9sOiB2YWwucmFkZWtfcG9sLCBzdWJyYWRlazogdmFsLnN1YnJhZGVrLCByYWRla19hdjogdmFsLnJhZGVrX2F2IH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y1Bhcm92YWNpWmFwaXN5Lnprb250cm9sdWpQcmVkU3Rvcm5vKHsgcmV6aW06IHRoaXMucmV6aW0sIGtleXM6IGtleXNBcnIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMzNjAwMTYyXCIsIC8vUkMgMzM2MDAxNjIgOiBWw71ixJtyIHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNjJcIiwgLy9SQyAzMzYwMDE2MiA6IFbDvWLEm3IgesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWwuaXhwLCByYWRla19wb2w6IHZhbC5yYWRla19wb2wsIHN1YnJhZGVrOiB2YWwuc3VicmFkZWssIHJhZGVrX2F2OiB2YWwucmFkZWtfYXYgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y1Bhcm92YWNpWmFwaXN5Lmhyb21hZG5lU3Rvcm5vdmF0KHsgcmV6aW06IHRoaXMucmV6aW0sIGtleXM6IGtleXNBcnIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfcG9sOiB2YWwucmFkZWtfcG9sLCBzdWJyYWRlazogdmFsLnN1YnJhZGVrLCByYWRla19hdjogdmFsLnJhZGVrX2F2IH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNQYXJvdmFjaVphcGlzeS56a29udHJvbHVqUHJlZFN0b3Jubyh7IHJlemltOiB0aGlzLnJlemltLCBrZXlzOiBrZXlzQXJyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDE2NFwiLCAvL1JDIDMzNjAwMTY0IDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDE2NVwiIC8vUkMgMzM2MDAxNjUgOiBWw71zbGVkZWsgaHJvbWFkbsOpIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmdldERhdGFSb3dzKCkuc29tZSh4ID0+IHgud2l6X2tpbmQgPT0gMjAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aXphcmRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3aXphcmRDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy96bm92dSBuYcSNdGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSHJvbWFkbsOpIG9kc3RyYW7Em27DrSB2eWJyYW7DvWNoIHBvbG/FvmVrICovXHJcbiAgICAgICAgcHJpdmF0ZSBvZHN0cmFuaXQoKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzOiBJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvW10gfCBudWxsID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEludGVyZmFjZS5HUGFyb3ZhY2laYXBpc3lEdG8+KHRoaXMuJGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXJvd3MgfHwgKHJvd3M/Lmxlbmd0aCA/PyAwKSA8IDEpIHsgdGhpcy5kaWFsb2dzLmFsZXJ0KFwianJlczozMzYwMDE1OFwiKTsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH0gLy9SQyAzMzYwMDE1OCA6IFZ5YmVydGUgYWxlc3BvxYggamVkZW4gxZnDoWRla1xyXG4gICAgICAgICAgICBsZXQgd2l6YXJkQ2hhbmdlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwiR0hyb21hZG5lT2RzdHJhbmVuaVBvbG96ZWtQYXJvdmFjaVphcGlzeUJ1YyNcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDA2NzlcIiwgLy9SQyAzMzYwMDY3OSA6IEhyb21hZG7DqSBvZHN0cmFuxJtuw60gcMOhcm92YWPDrWNoIHbDvXBpc8WvXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR1Bhcm92YWNpWmFwaXN5RHRvPigpLmFkZCh0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HUGFyb3ZhY2laYXBpc3lEdG8sIFwiY29sdW1uc1wiPihcIm9wdGlvblwiLCBcImNvbHVtbnNcIikgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFByb2ZpbGU6IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0bz4oXCJnZXRDdXJyZW50UHJvZmlsZVwiKSxcclxuICAgICAgICAgICAgICAgIGtleXM6IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdQYXJvdmFjaVphcGlzeUR0bz4oXCJnZXRWaWV3XCIpLmtleXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByb3dzLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgIHByZUNoZWNrQWN0aW9uOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWwuaXhwLCByYWRla19wb2w6IHZhbC5yYWRla19wb2wsIHN1YnJhZGVrOiB2YWwuc3VicmFkZWssIHJhZGVrX2F2OiB2YWwucmFkZWtfYXYgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjUGFyb3ZhY2laYXBpc3kuemtvbnRyb2x1alByZWRPZHN0cmFuaXQoeyByZXppbTogdGhpcy5yZXppbSwga2V5czoga2V5c0FyciB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxNjJcIiwgLy9SQyAzMzYwMDE2MiA6IFbDvWLEm3IgesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDE2MlwiLCAvL1JDIDMzNjAwMTYyIDogVsO9YsSbciB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNjgwXCIsIC8vUkMgMzM2MDA2ODAgOiBBa2NlIG9kc3RyYW7DrSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBww6Fyb3ZhY8OtIHrDoXBpc3lcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfcG9sOiB2YWwucmFkZWtfcG9sLCBzdWJyYWRlazogdmFsLnN1YnJhZGVrLCByYWRla19hdjogdmFsLnJhZGVrX2F2IH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNQYXJvdmFjaVphcGlzeS5ocm9tYWRuZU9kc3RyYW5pdCh7IHJlemltOiB0aGlzLnJlemltLCBrZXlzOiBrZXlzQXJyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleXNBcnIgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4geyBpeHA6IHZhbC5peHAsIHJhZGVrX3BvbDogdmFsLnJhZGVrX3BvbCwgc3VicmFkZWs6IHZhbC5zdWJyYWRlaywgcmFkZWtfYXY6IHZhbC5yYWRla19hdiB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjUGFyb3ZhY2laYXBpc3kuemtvbnRyb2x1alByZWRPZHN0cmFuaXQoeyByZXppbTogdGhpcy5yZXppbSwga2V5czoga2V5c0FyciB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxNjRcIiwgLy9SQyAzMzYwMDE2NCA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNjVcIiAvL1JDIDMzNjAwMTY1IDogVsO9c2xlZGVrIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5nZXREYXRhUm93cygpLnNvbWUoeCA9PiB4Lndpel9raW5kID09IDIwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l6YXJkQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2l6YXJkQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vem5vdnUgbmHEjXRlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=