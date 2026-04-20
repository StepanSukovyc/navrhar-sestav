"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GOcekavanoZBanky.ts                    </Name>
//    <Description> Content pro očekáváno z banky                               </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-09-26                                                  </Created>
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
            /** Content pro očekáváno z banky */
            let GOcekavanoZBanky = class GOcekavanoZBanky extends Gordic.GContentBase {
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
                        actPridat: {
                            caption: "jres:33600489", //RC 33600489 : Přidat
                            tooltip: "jres:33600490", //RC 33600490 : Hromadná akce pro zaktivnění položek
                            permission: this.Permissions.LzePridat,
                            run: function (ev, ctx) {
                                this.setPending(that.pridat());
                            }
                        },
                        actVyjmout: {
                            caption: "jres:33600491", //RC 33600491 : Vyjmout
                            tooltip: "jres:33600492", //RC 33600492 : Hromadná akce pro zneaktivnění položek
                            permission: this.Permissions.LzeVyjmout,
                            run: function (ev, ctx) {
                                this.setPending(that.vyjmout());
                            }
                        },
                        actStornovat: Gordic.Eko.Action.actionStornovat({
                            tooltip: "jres:33600493", //RC 33600493 : Hromadná akce pro storno položek - budou vráceny k opravě do agendy
                            permission: this.Permissions.LzeStornovat,
                            run: function (ev, ctx) {
                                this.setPending(that.stornovat());
                            }
                        }),
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tema: "buc_ptm_ocebang",
                            ixsStr: this.buc_ptm_ocebang,
                            enabled: true,
                            serverParameterMethod: "Gordic.Buc.WebClient.GOcekavanoZBanky:PrintParameters",
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
                                            if (column.name == "ucet_vl" && (data.filter.sk_vl || data.filter.bu_vl)) {
                                                maskaText.push(column.caption + ": " + data.filter.bu_vl + "/" + data.filter.sk_vl);
                                            }
                                            else if (column.name == "ucet_ci" && (data.filter.sk_ci || data.filter.bu_ci)) {
                                                maskaText.push(column.caption + ": " + data.filter.bu_ci + "/" + data.filter.sk_ci);
                                            }
                                            else if (column.name == "typ_ag_zkr" && (data.filter.typ_ag || data.filter.typ_ag == 0)) {
                                                maskaText.push(column.caption + ": " + data.filter.typ_ag);
                                            }
                                            else if (column.name == "mena_txt" && (data.filter.mena || data.filter.mena == 0)) {
                                                maskaText.push(column.caption + ": " + data.filter.mena);
                                            }
                                            else if (filterKey && data.filter[filterKey]) {
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
                                        rep.customDto = { filters: data.filter, maskaText: maskaText.join(", ") };
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
                    this.menuBar(this.actions.createBar(["actPridat*", "actVyjmout*", "actStornovat*", "actTisk*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření filtr panelu nad gridem*/
                createFilterPanel() {
                    this.$filterPanel = $.newDiv().appendTo(this.element).gfilterpanel({
                        forms: [new Gordic.Forms.Form().addRow("Neaktivní").addField("gcheck", {
                                name: "eko_akt",
                                modelValueTransform: {
                                    apply: function (modelValue) { return modelValue === 1; },
                                    collect: function (fieldValue) { return fieldValue === true ? 1 : 0; }
                                }
                            })],
                        favorites: [],
                        autoLoadAfter: [],
                        filterViewMode: FilterViewMode.Simple,
                        reset: () => { this.$grid.ggridserverfilter("clear"); }
                    });
                }
                /** Vytvoření gridu */
                createGrid() {
                    this.$grid = $.newDiv().css("height", "100%").appendTo(this.element).ggrid({
                        name: "gridOcekavanoZBanky",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucOcekavanoZBanky.list({ fragments: ["*"] }).use((req, next, ctx) => {
                            return this.getFilterData(this, req, next);
                        }), {
                            key: ["ixp", "radek_uhr"],
                            filterPanel: this.$filterPanel,
                            startEmpty: true
                        }),
                        columnMode: "full",
                        multi: true,
                        defaultProfile: {
                            sort: "ucet_vl,dat_spl,c",
                            condFormats: [
                                {
                                    formula: "@c < 0",
                                    description: "jres:33600494", //RC 33600494 : Částka menší než 0
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red,
                                    applyTo: "c,c_mena"
                                }
                            ]
                        }
                    }).ggridserverfilter({}).gautofit();
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "upl_zkr" /* Interface.GOcekavanoZBankyDtoNames.upl_zkr */,
                        caption: "jres:33600495", //RC 33600495 : Typ
                        description: "jres:33600496", //RC 33600496 : Určení platby
                        width: 32,
                        cellTemplate: (data) => { return data.upl_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.upl_txt ?? ""; },
                    })
                        .addTextColumn({
                        name: "s_uhrp_zkr" /* Interface.GOcekavanoZBankyDtoNames.s_uhrp_zkr */,
                        caption: "jres:33600497", //RC 33600497 : S 
                        description: "jres:33600498", //RC 33600498 : Stav předpisu platby
                        width: 32,
                        cellTemplate: (data) => { return data.s_uhrp_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_uhrp_txt ?? ""; },
                    })
                        .addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GOcekavanoZBankyDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GOcekavanoZBankyDtoNames.ucet_vl */,
                        serverFilter: {
                            widget: "gformbox",
                            options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({ name: "ucet_vl" }), {
                                form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                    .addSection("jres:33600499") //RC 33600499 : Bankovní účet vlastní
                                    .addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                                    name: "ucet_vl",
                                    model: "model.sk_vl=value.sk_vl;model.bu_vl=value.bu_vl;model.rok=value.rok",
                                    serverFilters: {
                                        pristupKBU: 1,
                                        urovenPristupuKBU: 1,
                                        rezimVyberuDleKnihy: 0
                                    },
                                    itemTemplate: (v) => {
                                        if (!!v?.rok) {
                                            return (v.bu_vl ?? "").trim() + "/" + (v.sk_vl ?? "").trim();
                                        }
                                        return "";
                                    },
                                    tabbable: false,
                                    verify: (o) => { return o; }, //NOTE: Bez toho nefunguje vyplneni hodnoty a klik mimo inlinedialog, musi to byt u vsech techto prefabu, krome cfuIntervalu
                                    validators: [new Gordic.Validators.Base({
                                            message: "jres:33600219", //RC 33600219 : Nevalidní hodnota
                                            validate: (val, src) => {
                                                return !val || !!val?.rok;
                                            }
                                        })]
                                }),
                                model: "model.ucet_vl=value",
                                itemTemplate: (v) => {
                                    if (!!v?.rok) {
                                        let ucet_vl = (v.bu_vl ?? "").trim() + "/" + (v.sk_vl ?? "").trim();
                                        return Gordic.Eko.Filters.Utils.formatIntervalValueElement({ start: ucet_vl, end: ucet_vl });
                                    }
                                    else {
                                        return Gordic.Eko.Filters.Utils.formatIntervalValueElement(null);
                                    }
                                },
                            })
                        }
                    })
                        .addCurrencyColumn({
                        name: "c" /* Interface.GOcekavanoZBankyDtoNames.c */,
                        caption: "jres:33600500", //RC 33600500 : Částka
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({
                            model: "c" /* Interface.GOcekavanoZBankyDtoNames.c */
                        })
                    })
                        .addCurrencyColumn({
                        name: "c_par" /* Interface.GOcekavanoZBankyDtoNames.c_par */,
                        caption: "jres:33600501", //RC 33600501 : Částka párovaná
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({
                            model: "c_par" /* Interface.GOcekavanoZBankyDtoNames.c_par */
                        })
                    })
                        .addBankovniUcetCizi({
                        name: "ucet_ci" /* Interface.GOcekavanoZBankyDtoNames.ucet_ci */,
                        field: "ucet_ci" /* Interface.GOcekavanoZBankyDtoNames.ucet_ci */,
                        serverFilter: {
                            widget: "gformbox",
                            options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({ name: "ucet_ci" }), {
                                form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                    .addSection("jres:33600502") //RC 33600502 : Bankovní účet cizí
                                    .addField("gselectbox", Gordic.Prefabs.Select.ekosuci(), {
                                    name: "ucet_ci",
                                    model: "model.sk_ci=value.sk_ci;model.bu_ci=value.bu_ci;model.ixs_esu=value.ixs_esu",
                                    serverFilters: {
                                        aktivita: 100
                                    },
                                    itemTemplate: (data) => {
                                        if (!!data?.ixs_esu) {
                                            return (data.bu_ci ?? "").trim() + "/" + (data.sk_ci ?? "").trim();
                                        }
                                        return "";
                                    },
                                    tabbable: false,
                                    verify: (o) => { return o; }, //NOTE: Bez toho nefunguje vyplneni hodnoty a klik mimo inlinedialog, musi to byt u vsech techto prefabu, krome cfuIntervalu
                                    validators: [new Gordic.Validators.Base({
                                            message: "jres:33600219", //RC 33600219 : Nevalidní hodnota
                                            validate: (val, src) => {
                                                return !val || !!val?.ixs_esu;
                                            }
                                        })],
                                }),
                                model: "model.ucet_ci=value",
                                itemTemplate: (v) => {
                                    if (!!v?.ixs_esu) {
                                        let ucet_ci = (v.bu_ci ?? "").trim() + "/" + (v.sk_ci ?? "").trim();
                                        return Gordic.Eko.Filters.Utils.formatIntervalValueElement({ start: ucet_ci, end: ucet_ci });
                                    }
                                    else {
                                        return Gordic.Eko.Filters.Utils.formatIntervalValueElement(null);
                                    }
                                },
                            })
                        }
                    })
                        .addDateColumn({
                        name: "dat_spl" /* Interface.GOcekavanoZBankyDtoNames.dat_spl */,
                        caption: "jres:33600503", //RC 33600503 : Datum splatnosti
                        width: 110,
                        serverFilter: Gordic.Eko.Filters.dateInterval({
                            model: "dat_spl" /* Interface.GOcekavanoZBankyDtoNames.dat_spl */
                        })
                    })
                        .addVs({
                        name: "vs" /* Interface.GOcekavanoZBankyDtoNames.vs */,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "vs" /* Interface.GOcekavanoZBankyDtoNames.vs */
                        })
                    })
                        .addKs({
                        name: "ks" /* Interface.GOcekavanoZBankyDtoNames.ks */,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "ks" /* Interface.GOcekavanoZBankyDtoNames.ks */
                        })
                    })
                        .addSs({
                        name: "ss" /* Interface.GOcekavanoZBankyDtoNames.ss */,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "ss" /* Interface.GOcekavanoZBankyDtoNames.ss */
                        })
                    });
                    if (this.rppUus == 1) {
                        gridFormat.addUus();
                    }
                    gridFormat.addTextColumn({
                        name: "zp_zkr" /* Interface.GOcekavanoZBankyDtoNames.zp_zkr */,
                        caption: "jres:33600504", //RC 33600504 : ZÚ
                        description: "jres:33600505", //RC 33600505 : Způsob platby
                        width: 32,
                        cellTemplate: (data) => { return data.zp_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.zp_txt ?? ""; },
                    })
                        .addAgenda({
                        name: "typ_ag_zkr" /* Interface.GOcekavanoZBankyDtoNames.typ_ag_zkr */,
                        field: "typ_ag_zkr" /* Interface.GOcekavanoZBankyDtoNames.typ_ag_zkr */,
                        serverFilter: {
                            widget: "gformbox",
                            options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({ name: "typ_ag" }), {
                                form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                    .addSection("jres:33600506") //RC 33600506 : Agenda
                                    .addField("gselectbox", Gordic.Prefabs.Select.ginctag(), {
                                    name: "typ_ag",
                                    model: "model.typ_ag=value.typ_ag;model.zkr_ag=value.zkr_ag",
                                    tabbable: false,
                                    verify: (o) => { return o; }, //NOTE: Bez toho nefunguje vyplneni hodnoty a klik mimo inlinedialog, musi to byt u vsech techto prefabu, krome cfuIntervalu
                                    validators: [new Gordic.Validators.Base({
                                            message: "jres:33600219", //RC 33600219 : Nevalidní hodnota
                                            validate: (val, src) => {
                                                return !val || !!val?.typ_ag || val?.typ_ag == 0;
                                            }
                                        })]
                                }),
                                model: "model.typ_ag=value.typ_ag",
                                itemTemplate: (v) => {
                                    if (!!v?.typ_ag || v?.typ_ag == 0) {
                                        return Gordic.Eko.Filters.Utils.formatIntervalValueElement({ start: v.zkr_ag, end: v.zkr_ag });
                                    }
                                    else {
                                        return Gordic.Eko.Filters.Utils.formatIntervalValueElement(null);
                                    }
                                },
                            })
                        }
                    })
                        .addAgendoveCislo({
                        name: "ac" /* Interface.GOcekavanoZBankyDtoNames.ac */,
                        field: "ac" /* Interface.GOcekavanoZBankyDtoNames.ac */
                    })
                        .addMena({
                        name: "mena_txt" /* Interface.GOcekavanoZBankyDtoNames.mena_txt */,
                        field: "mena_txt" /* Interface.GOcekavanoZBankyDtoNames.mena_txt */,
                        serverFilter: {
                            widget: "gformbox",
                            options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({ name: "mena" }), {
                                form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                    .addSection("jres:33600507") //RC 33600507 : Měna
                                    .addField("gselectbox", Gordic.Prefabs.Select.ekocmen(), {
                                    name: "ucet_vl",
                                    model: "model.mena=value.mena;model.mena_sis_aaa=value.mena_sis_aaa",
                                    tabbable: false,
                                    verify: (o) => { return o; }, //NOTE: Bez toho nefunguje vyplneni hodnoty a klik mimo inlinedialog, musi to byt u vsech techto prefabu, krome cfuIntervalu
                                    validators: [new Gordic.Validators.Base({
                                            message: "jres:33600219", //RC 33600219 : Nevalidní hodnota
                                            validate: (val, src) => {
                                                return !val || !!val?.mena || val?.mena == 0;
                                            }
                                        })]
                                }),
                                model: "model.mena=value.mena",
                                itemTemplate: (v) => {
                                    if (!!v?.mena || v?.mena == 0) {
                                        return Gordic.Eko.Filters.Utils.formatIntervalValueElement({ start: v.mena_sis_aaa, end: v.mena_sis_aaa });
                                    }
                                    else {
                                        return Gordic.Eko.Filters.Utils.formatIntervalValueElement(null);
                                    }
                                },
                            })
                        }
                    })
                        .addCurrencyColumn({
                        name: "c_mena" /* Interface.GOcekavanoZBankyDtoNames.c_mena */,
                        caption: "jres:33600508", //RC 33600508 : Částka v měně
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({
                            model: "c_mena" /* Interface.GOcekavanoZBankyDtoNames.c_mena */
                        })
                    })
                        .addTextColumn({
                        name: "nazev" /* Interface.GOcekavanoZBankyDtoNames.nazev */,
                        caption: "jres:33600509", //RC 33600509 : Název
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "nazev" /* Interface.GOcekavanoZBankyDtoNames.nazev */
                        })
                    })
                        .addIco({
                        name: "ico_esu" /* Interface.GOcekavanoZBankyDtoNames.ico_esu */,
                        field: "ico_esu" /* Interface.GOcekavanoZBankyDtoNames.ico_esu */
                    })
                        .addPid({
                        name: "ixp" /* Interface.GOcekavanoZBankyDtoNames.ixp */,
                        field: "ixp" /* Interface.GOcekavanoZBankyDtoNames.ixp */
                    });
                    return gridFormat;
                }
                /** Získání, přidání a upravení filtrů pro volaní Isl*/
                getFilterData(that, req, next) {
                    return that.getFilter(this.$filterPanel.gfilterpanel("getCurrentData"))
                        .then((newFilter) => {
                        let filters = newFilter.filter;
                        filters = {
                            ...filters
                        };
                        req["filters"] = filters;
                        return next(req);
                    });
                }
                /**Získání server filteru z gridu*/
                getFilter(fPanelData) {
                    let filterDto = fPanelData || {};
                    filterDto.eko_akt = (filterDto.eko_akt) ? 900 : 100;
                    return this.$grid.ggridserverfilter("collect", filterDto)
                        .then((filter) => {
                        if (filter.ucet_vl) {
                            filter.sk_vl = filter.ucet_vl.sk_vl;
                            filter.bu_vl = filter.ucet_vl.bu_vl;
                        }
                        delete filter.ucet_vl;
                        if (filter.ucet_ci) {
                            filter.sk_ci = filter.ucet_ci.sk_ci;
                            filter.bu_ci = filter.ucet_ci.bu_ci;
                        }
                        delete filter.ucet_ci;
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
                /** Hromadné přidání/zaktivnění vybraných položek */
                pridat() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid) || [];
                    if ((rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600171");
                        return $.Deferred().reject().promise();
                    } //RC 33600171 : Vyberte alespoň jeden řádek
                    let wizardChanged = false;
                    return this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "GHromadnePridaniOcekanoZBankyBuc#",
                        title: "jres:33600510", //RC 33600510 : Hromadné přidání / zaktivnění položek
                        gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                        gridProfile: this.$grid.ggrid("getCurrentProfile"),
                        keys: this.$grid.ggrid("getView").keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_uhr: val.radek_uhr }; });
                            return this.isl.BucOcekavanoZBanky.zkontrolujPredPridat({ keys: keysArr }).get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600173", //RC 33600173 : Výběr záznamů
                            title: "jres:33600173", //RC 33600173 : Výběr záznamů
                            description: "jres:33600511", //RC 33600511 : Akce přidá / zaktivní vybrané (zaškrtnuté) odeslané platby do banky. Opravdu chcete toto provést?
                            showIndicator: true,
                            nextAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_uhr: val.radek_uhr }; });
                                return this.isl.BucOcekavanoZBanky.hromadnePridat({ keys: keysArr }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_uhr: val.radek_uhr }; });
                                return this.isl.BucOcekavanoZBanky.zkontrolujPredPridat({ keys: keysArr }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600175", //RC 33600175 : Výsledek
                            title: "jres:33600176" //RC 33600176 : Výsledek hromadné operace
                        },
                        completeDelegate: (data) => {
                            if (data.getDataRows().find(x => x.wiz_kind == 200)) {
                                wizardChanged = true;
                            }
                        }
                    }).createDialogPromise().then(() => {
                        if (wizardChanged) {
                            this.$filterPanel.gfilterpanel("applyFilter");
                        }
                    });
                    ;
                }
                /** Hromadné vyjmutí/zneaktivnění vybraných položek */
                vyjmout() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid) || [];
                    if ((rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600171");
                        return $.Deferred().reject().promise();
                    } //RC 33600171 : Vyberte alespoň jeden řádek
                    let wizardChanged = false;
                    return this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "GHromadneVyjmutiOcekanoZBankyBuc#",
                        title: "jres:33600512", //RC 33600512 : Hromadné vyjmutí / zneaktivnění položek
                        gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                        gridProfile: this.$grid.ggrid("getCurrentProfile"),
                        keys: this.$grid.ggrid("getView").keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_uhr: val.radek_uhr }; });
                            return this.isl.BucOcekavanoZBanky.zkontrolujPredVyjmout({ keys: keysArr }).get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600173", //RC 33600173 : Výběr záznamů
                            title: "jres:33600173", //RC 33600173 : Výběr záznamů
                            description: "jres:33600513", //RC 33600513 : Akce vyjme / zneaktivní vybrané (zaškrtnuté) odeslané platby do banky. Opravdu chcete toto provést?
                            showIndicator: true,
                            nextAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_uhr: val.radek_uhr }; });
                                return this.isl.BucOcekavanoZBanky.hromadneVyjmout({ keys: keysArr }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_uhr: val.radek_uhr }; });
                                return this.isl.BucOcekavanoZBanky.zkontrolujPredVyjmout({ keys: keysArr }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600175", //RC 33600175 : Výsledek
                            title: "jres:33600176" //RC 33600176 : Výsledek hromadné operace
                        },
                        completeDelegate: (data) => {
                            if (data.getDataRows().find(x => x.wiz_kind == 200)) {
                                wizardChanged = true;
                            }
                        }
                    }).createDialogPromise().then(() => {
                        if (wizardChanged) {
                            this.$filterPanel.gfilterpanel("applyFilter");
                        }
                    });
                    ;
                }
                /** Hromadné stornování vybraných položek */
                stornovat() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid) || [];
                    if ((rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600171");
                        return $.Deferred().reject().promise();
                    } //RC 33600171 : Vyberte alespoň jeden řádek
                    let wizardChanged = false;
                    let hasSlozenkyB = false;
                    let hasHotovostExtSystem = false;
                    for (let row of rows) {
                        if (row.typ_ag == 100 && (row.radek_uhr ?? 0) < 4) {
                            hasSlozenkyB = true;
                        }
                        else if (row.typ_ag == 300 && row.zp == 10) {
                            hasHotovostExtSystem = true;
                        }
                    }
                    let wizardForm = new Gordic.Forms.Form({
                        name: "formHromadneStornovaniOcekanoZBankyBuc"
                    })
                        .addSection()
                        .addRow("jres:33600514") //RC 33600514 : Složenky B - vrácení
                        .addField("gradio", {
                        name: "rSlozenkyB",
                        itemClass: "w-12",
                        initialValue: (hasSlozenkyB) ? 0 : void 0,
                        radios: [
                            { value: 0, label: "jres:33600515", disabled: !hasSlozenkyB }, //RC 33600515 : pro opětovné generování dávky
                            { value: 1, label: "jres:33600516", disabled: !hasSlozenkyB } //RC 33600516 : pro vrácení do agendy - stornovat
                        ]
                    })
                        .addRow("jres:33600517") //RC 33600517 : Hotovost zadaná externím systémem - stornovat a předat
                        .addField("gradio", {
                        name: "rHotovostExtSystem",
                        itemClass: "w-12",
                        initialValue: (hasHotovostExtSystem) ? 0 : void 0,
                        radios: [
                            { value: 0, label: "jres:33600518", disabled: !hasHotovostExtSystem }, //RC 33600518 : stav nevyzvednuto
                            { value: 1, label: "jres:33600519", disabled: !hasHotovostExtSystem } //RC 33600519 : stav storno
                        ]
                    });
                    //objekt pro uložení modelu z prvního kroku (špatně se přenáší model při krokách tam a zpět)
                    let dataModel = {};
                    return this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "GHromadneStornovaniOcekanoZBankyBuc#",
                        title: "jres:33600520", //RC 33600520 : Hromadné stornování položek
                        gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                        gridProfile: this.$grid.ggrid("getCurrentProfile"),
                        keys: this.$grid.ggrid("getView").keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_uhr: val.radek_uhr }; });
                            return this.isl.BucOcekavanoZBanky.zkontrolujPredStornovat({ keys: keysArr }).get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600173", //RC 33600173 : Výběr záznamů
                            title: "jres:33600173", //RC 33600173 : Výběr záznamů
                            description: "jres:33600521", //RC 33600521 : Akce stornuje / vrátí k opravě do agendy vybrané (zaškrtnuté) odeslané platby do banky. Opravdu chcete toto provést?
                            showIndicator: true,
                            formTabTitle: "jres:33600522", //RC 33600522 : Údaje
                            form: wizardForm,
                            modelData: { /*uup_Rok: this.Rok*/},
                            enableFormFields: true,
                            nextAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_uhr: val.radek_uhr }; });
                                return this.isl.BucOcekavanoZBanky.hromadneStornovat({ keys: keysArr, slozenkyB: model.rSlozenkyB ?? 0, hotovostExtSystem: model.rHotovostExtSystem ?? 0 }).get().then((result) => {
                                    dataModel = model;
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_uhr: val.radek_uhr }; });
                                return this.isl.BucOcekavanoZBanky.zkontrolujPredStornovat({ keys: keysArr }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600175", //RC 33600175 : Výsledek
                            title: "jres:33600176", //RC 33600176 : Výsledek hromadné operace
                            formTabTitle: "jres:33600522", //RC 33600522 : Údaje
                            form: wizardForm,
                            enableFormFields: false,
                            modelData: () => { return dataModel; },
                        },
                        completeDelegate: (data) => {
                            if (data.getDataRows().find(x => x.wiz_kind == 200)) {
                                wizardChanged = true;
                            }
                        }
                    }).createDialogPromise().then(() => {
                        if (wizardChanged) {
                            this.$filterPanel.gfilterpanel("applyFilter");
                        }
                    });
                    ;
                }
            };
            GOcekavanoZBanky = __decorate([
                Decorators.gcontent
            ], GOcekavanoZBanky);
            WebClient.GOcekavanoZBanky = GOcekavanoZBanky;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR09jZWthdmFub1pCYW5reS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdPY2VrYXZhbm9aQmFua3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0E2cEJmO0FBN3BCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2cEJuQjtJQTdwQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZwQjdCO1FBN3BCb0IsV0FBQSxTQUFTO1lBQzFCLG9DQUFvQztZQUVwQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFXOUMsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsa0NBQWtDO2dCQUMxQixhQUFhO29CQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7NEJBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsb0RBQW9EOzRCQUM5RSxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTOzRCQUN0QyxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzs0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Y3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdPY2VrYXZhbm9aQmFua3kudHMgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBDb250ZW50IHBybyBvxI1la8OhdsOhbm8geiBiYW5reSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTA5LTI2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5CdWMuV2ViQ2xpZW50IHtcclxuICAgIC8qKiBDb250ZW50IHBybyBvxI1la8OhdsOhbm8geiBiYW5reSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHT2Nla2F2YW5vWkJhbmt5IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKiogU2VydmljZSBQZXJtaXNzaW9ucyAqL1xyXG4gICAgICAgIHByaXZhdGUgUGVybWlzc2lvbnM6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5U2VydmljZVBlcm1pc3Npb25zO1xyXG4gICAgICAgIC8qKiBHbG9iYWxzIC0gcnBwVXVzKi9cclxuICAgICAgICBwcml2YXRlIHJwcFV1czogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBEYXRhYsOhem92w70gcGFyYW1ldHIgcHJvIHRpc2sgLSBCVUMgLSBUVCBPxI1la8OhdsOhbm8gbmEgYmFuLnbDvXBpc2UgKEdSKSAqL1xyXG4gICAgICAgIHByaXZhdGUgYnVjX3B0bV9vY2ViYW5nOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNZW51QmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZpbHRlclBhbmVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RQcmlkYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0ODlcIiwgLy9SQyAzMzYwMDQ4OSA6IFDFmWlkYXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA0OTBcIiwgLy9SQyAzMzYwMDQ5MCA6IEhyb21hZG7DoSBha2NlIHBybyB6YWt0aXZuxJtuw60gcG9sb8W+ZWtcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLlBlcm1pc3Npb25zLkx6ZVByaWRhdCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnByaWRhdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VnlqbW91dDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQ5MVwiLCAvL1JDIDMzNjAwNDkxIDogVnlqbW91dFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDQ5MlwiLCAvL1JDIDMzNjAwNDkyIDogSHJvbWFkbsOhIGFrY2UgcHJvIHpuZWFrdGl2bsSbbsOtIHBvbG/FvmVrXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5QZXJtaXNzaW9ucy5MemVWeWptb3V0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQudnlqbW91dCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0U3Rvcm5vdmF0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25TdG9ybm92YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDQ5M1wiLCAvL1JDIDMzNjAwNDkzIDogSHJvbWFkbsOhIGFrY2UgcHJvIHN0b3JubyBwb2xvxb5layAtIGJ1ZG91IHZyw6FjZW55IGsgb3ByYXbEmyBkbyBhZ2VuZHlcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLlBlcm1pc3Npb25zLkx6ZVN0b3Jub3ZhdCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnN0b3Jub3ZhdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiYnVjX3B0bV9vY2ViYW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzU3RyOiB0aGlzLmJ1Y19wdG1fb2NlYmFuZyxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HT2Nla2F2YW5vWkJhbmt5OlByaW50UGFyYW1ldGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKFwiZ2ZpbHRlcnBhbmVsXCIsIHRoYXQuJGZpbHRlclBhbmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSBmaWx0cnkgcHJvIHDFmWVkw6Fuw60gZG8gQyMgbWV0b2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyUGFuZWxEYXRhID0gdGhhdC4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmdldEZpbHRlcihmaWx0ZXJQYW5lbERhdGEpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFza2FUZXh0OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSB0aGF0LiRncmlkLmdncmlkKFwidHJ1ZUNvbHVtbnNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyS2V5cyA9IE9iamVjdC5rZXlzKGRhdGEuZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gb2YgY29sdW1ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyS2V5ID0gZmlsdGVyS2V5cy5maW5kKChlbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIGVsID09IGNvbHVtbi5uYW1lOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uLm5hbWUgPT0gXCJ1Y2V0X3ZsXCIgJiYgKGRhdGEuZmlsdGVyLnNrX3ZsIHx8IGRhdGEuZmlsdGVyLmJ1X3ZsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza2FUZXh0LnB1c2goY29sdW1uLmNhcHRpb24gKyBcIjogXCIgKyBkYXRhLmZpbHRlci5idV92bCArIFwiL1wiICsgZGF0YS5maWx0ZXIuc2tfdmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi5uYW1lID09IFwidWNldF9jaVwiICYmIChkYXRhLmZpbHRlci5za19jaSB8fCBkYXRhLmZpbHRlci5idV9jaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2thVGV4dC5wdXNoKGNvbHVtbi5jYXB0aW9uICsgXCI6IFwiICsgZGF0YS5maWx0ZXIuYnVfY2kgKyBcIi9cIiArIGRhdGEuZmlsdGVyLnNrX2NpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2x1bW4ubmFtZSA9PSBcInR5cF9hZ196a3JcIiAmJiAoZGF0YS5maWx0ZXIudHlwX2FnIHx8IGRhdGEuZmlsdGVyLnR5cF9hZyA9PSAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza2FUZXh0LnB1c2goY29sdW1uLmNhcHRpb24gKyBcIjogXCIgKyBkYXRhLmZpbHRlci50eXBfYWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi5uYW1lID09IFwibWVuYV90eHRcIiAmJiAoZGF0YS5maWx0ZXIubWVuYSB8fCBkYXRhLmZpbHRlci5tZW5hID09IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrYVRleHQucHVzaChjb2x1bW4uY2FwdGlvbiArIFwiOiBcIiArIGRhdGEuZmlsdGVyLm1lbmEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlcktleSAmJiBkYXRhLmZpbHRlcltmaWx0ZXJLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hxaFsbyBzZSBpIHMgZmlsdHJlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc1N0YXJ0VmFsdWU6IGJvb2xlYW4gPSAoZGF0YS5maWx0ZXJbZmlsdGVyS2V5XS5zdGFydCB8fCBkYXRhLmZpbHRlcltmaWx0ZXJLZXldLnN0YXJ0ID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc0VuZFZhbHVlOiBib29sZWFuID0gKGRhdGEuZmlsdGVyW2ZpbHRlcktleV0uZW5kIHx8IGRhdGEuZmlsdGVyW2ZpbHRlcktleV0uZW5kID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1N0YXJ0VmFsdWUgJiYgaGFzRW5kVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrYVRleHQucHVzaChjb2x1bW4uY2FwdGlvbiArIFwiOiBcIiArIGRhdGEuZmlsdGVyW2ZpbHRlcktleV0uc3RhcnQgKyBcIiAtIFwiICsgZGF0YS5maWx0ZXJbZmlsdGVyS2V5XS5lbmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0VmFsdWUgJiYgIWhhc0VuZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza2FUZXh0LnB1c2goY29sdW1uLmNhcHRpb24gKyBcIjogPj0gXCIgKyBkYXRhLmZpbHRlcltmaWx0ZXJLZXldLnN0YXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaGFzU3RhcnRWYWx1ZSAmJiBoYXNFbmRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2thVGV4dC5wdXNoKGNvbHVtbi5jYXB0aW9uICsgXCI6IDw9IFwiICsgZGF0YS5maWx0ZXJbZmlsdGVyS2V5XS5lbmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBmaWx0ZXJzOiBkYXRhLmZpbHRlciwgbWFza2FUZXh0OiBtYXNrYVRleHQuam9pbihcIiwgXCIpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHRGxnLm1iYkNsb3NlLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBtZW51YmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudUJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UHJpZGF0KlwiLCBcImFjdFZ5am1vdXQqXCIsIFwiYWN0U3Rvcm5vdmF0KlwiLCBcImFjdFRpc2sqXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gY29tbWFuZGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFphdnJpdFwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGZpbHRyIHBhbmVsdSBuYWQgZ3JpZGVtKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlclBhbmVsKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZm9ybXM6IFtuZXcgR29yZGljLkZvcm1zLkZvcm0oKS5hZGRSb3coXCJOZWFrdGl2bsOtXCIpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVrb19ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gbW9kZWxWYWx1ZSA9PT0gMTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdDogZnVuY3Rpb24gKGZpZWxkVmFsdWUpIHsgcmV0dXJuIGZpZWxkVmFsdWUgPT09IHRydWUgPyAxIDogMDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW10sXHJcbiAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyOiBbXSxcclxuICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICByZXNldDogKCkgPT4geyB0aGlzLiRncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiY2xlYXJcIik7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdigpLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZ3JpZDxJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkT2Nla2F2YW5vWkJhbmt5XCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXc8SW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG8+KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsLkJ1Y09jZWthdmFub1pCYW5reS5saXN0KHsgZnJhZ21lbnRzOiBbXCIqXCJdIH0pLnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsdGVyRGF0YSh0aGlzLCByZXEsIG5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJpeHBcIiwgXCJyYWRla191aHJcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGlzLiRmaWx0ZXJQYW5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJ1Y2V0X3ZsLGRhdF9zcGwsY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQGMgPCAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNDk0XCIsIC8vUkMgMzM2MDA0OTQgOiDEjMOhc3RrYSBtZW7FocOtIG5lxb4gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBseVRvOiBcImMsY19tZW5hXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZ2dyaWRzZXJ2ZXJmaWx0ZXIoe30pLmdhdXRvZml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZGZvcm3DoXR1IGdyaWR1Ki9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIGxldCBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLnVwbF96a3IsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDk1XCIsIC8vUkMgMzM2MDA0OTUgOiBUeXBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNDk2XCIsIC8vUkMgMzM2MDA0OTYgOiBVcsSNZW7DrSBwbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS51cGxfemtyID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS51cGxfdHh0ID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMuc191aHJwX3prcixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA0OTdcIiwgLy9SQyAzMzYwMDQ5NyA6IFMgXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDQ5OFwiLCAvL1JDIDMzNjAwNDk4IDogU3RhdiBwxZllZHBpc3UgcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIGRhdGEuc191aHJwX3prciA/PyBcIlwiOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIGRhdGEuc191aHJwX3R4dCA/PyBcIlwiOyB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRCYW5rb3ZuaVVjZXRWbGFzdG5pKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMudWNldF92bCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdmb3JtYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6ICQuZXh0ZW5kKEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5nZXRGb3JtQm94RmlsdGVyRGVmYXVsdHMoeyBuYW1lOiBcInVjZXRfdmxcIiB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzYwMDQ5OVwiKSAvL1JDIDMzNjAwNDk5IDogQmFua292bsOtIMO6xI1ldCB2bGFzdG7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dmwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjZXRfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc2tfdmw9dmFsdWUuc2tfdmw7bW9kZWwuYnVfdmw9dmFsdWUuYnVfdmw7bW9kZWwucm9rPXZhbHVlLnJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmlzdHVwS0JVOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJvdmVuUHJpc3R1cHVLQlU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXppbVZ5YmVydURsZUtuaWh5OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXY/LnJvaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodi5idV92bCA/PyBcIlwiKS50cmltKCkgKyBcIi9cIiArICh2LnNrX3ZsID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJiYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcmlmeTogKG8pID0+IHsgcmV0dXJuIG87IH0sIC8vTk9URTogQmV6IHRvaG8gbmVmdW5ndWplIHZ5cGxuZW5pIGhvZG5vdHkgYSBrbGlrIG1pbW8gaW5saW5lZGlhbG9nLCBtdXNpIHRvIGJ5dCB1IHZzZWNoIHRlY2h0byBwcmVmYWJ1LCBrcm9tZSBjZnVJbnRlcnZhbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDIxOVwiLCAvL1JDIDMzNjAwMjE5IDogTmV2YWxpZG7DrSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWwgfHwgISF2YWw/LnJvaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC51Y2V0X3ZsPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhdj8ucm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1Y2V0X3ZsID0gKHYuYnVfdmwgPz8gXCJcIikudHJpbSgpICsgXCIvXCIgKyAodi5za192bCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZUVsZW1lbnQoeyBzdGFydDogdWNldF92bCwgZW5kOiB1Y2V0X3ZsIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZUVsZW1lbnQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDUwMFwiLCAvL1JDIDMzNjAwNTAwIDogxIzDoXN0a2FcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLmNcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG9OYW1lcy5jX3BhcixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1MDFcIiwgLy9SQyAzMzYwMDUwMSA6IMSMw6FzdGthIHDDoXJvdmFuw6FcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLmNfcGFyXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQmFua292bmlVY2V0Q2l6aSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG9OYW1lcy51Y2V0X2NpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLnVjZXRfY2ksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnZm9ybWJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiAkLmV4dGVuZChHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZ2V0Rm9ybUJveEZpbHRlckRlZmF1bHRzKHsgbmFtZTogXCJ1Y2V0X2NpXCIgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzM2MDA1MDJcIikgLy9SQyAzMzYwMDUwMiA6IEJhbmtvdm7DrSDDusSNZXQgY2l6w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdWNpKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y2V0X2NpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNrX2NpPXZhbHVlLnNrX2NpO21vZGVsLmJ1X2NpPXZhbHVlLmJ1X2NpO21vZGVsLml4c19lc3U9dmFsdWUuaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIWRhdGE/Lml4c19lc3UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRhdGEuYnVfY2kgPz8gXCJcIikudHJpbSgpICsgXCIvXCIgKyAoZGF0YS5za19jaSA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiYmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IChvKSA9PiB7IHJldHVybiBvOyB9LCAvL05PVEU6IEJleiB0b2hvIG5lZnVuZ3VqZSB2eXBsbmVuaSBob2Rub3R5IGEga2xpayBtaW1vIGlubGluZWRpYWxvZywgbXVzaSB0byBieXQgdSB2c2VjaCB0ZWNodG8gcHJlZmFidSwga3JvbWUgY2Z1SW50ZXJ2YWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAyMTlcIiwgLy9SQyAzMzYwMDIxOSA6IE5ldmFsaWRuw60gaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWwsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhdmFsIHx8ICEhdmFsPy5peHNfZXN1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC51Y2V0X2NpPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhdj8uaXhzX2VzdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdWNldF9jaSA9ICh2LmJ1X2NpID8/IFwiXCIpLnRyaW0oKSArIFwiL1wiICsgKHYuc2tfY2kgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWVFbGVtZW50KHsgc3RhcnQ6IHVjZXRfY2ksIGVuZDogdWNldF9jaSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWVFbGVtZW50KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG9OYW1lcy5kYXRfc3BsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDUwM1wiLCAvL1JDIDMzNjAwNTAzIDogRGF0dW0gc3BsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGF0ZUludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMuZGF0X3NwbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFZzKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMudnNcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRLcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG9OYW1lcy5rcyxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLmtzXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMuc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG9OYW1lcy5zc1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucnBwVXVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVXVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLnpwX3prcixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1MDRcIiwgLy9SQyAzMzYwMDUwNCA6IFrDmlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA1MDVcIiwgLy9SQyAzMzYwMDUwNSA6IFpwxa9zb2IgcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGRhdGEpID0+IHsgcmV0dXJuIGRhdGEuenBfemtyID8/IFwiXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS56cF90eHQgPz8gXCJcIjsgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQWdlbmRhKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLnR5cF9hZ196a3IsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMudHlwX2FnX3prcixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdmb3JtYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6ICQuZXh0ZW5kKEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5nZXRGb3JtQm94RmlsdGVyRGVmYXVsdHMoeyBuYW1lOiBcInR5cF9hZ1wiIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMzNjAwNTA2XCIpIC8vUkMgMzM2MDA1MDYgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jdGFnKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfYWdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX2FnPXZhbHVlLnR5cF9hZzttb2RlbC56a3JfYWc9dmFsdWUuemtyX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiAobykgPT4geyByZXR1cm4gbzsgfSwgLy9OT1RFOiBCZXogdG9obyBuZWZ1bmd1amUgdnlwbG5lbmkgaG9kbm90eSBhIGtsaWsgbWltbyBpbmxpbmVkaWFsb2csIG11c2kgdG8gYnl0IHUgdnNlY2ggdGVjaHRvIHByZWZhYnUsIGtyb21lIGNmdUludGVydmFsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMjE5XCIsIC8vUkMgMzM2MDAyMTkgOiBOZXZhbGlkbsOtIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXZhbCB8fCAhIXZhbD8udHlwX2FnIHx8IHZhbD8udHlwX2FnID09IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX2FnPXZhbHVlLnR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXY/LnR5cF9hZyB8fCB2Py50eXBfYWcgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWVFbGVtZW50KHsgc3RhcnQ6IHYuemtyX2FnLCBlbmQ6IHYuemtyX2FnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZUVsZW1lbnQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRBZ2VuZG92ZUNpc2xvKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLmFjLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLmFjXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE1lbmEoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMubWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMubWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnZm9ybWJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiAkLmV4dGVuZChHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZ2V0Rm9ybUJveEZpbHRlckRlZmF1bHRzKHsgbmFtZTogXCJtZW5hXCIgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzM2MDA1MDdcIikgLy9SQyAzMzYwMDUwNyA6IE3Em25hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY21lbigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNldF92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5tZW5hPXZhbHVlLm1lbmE7bW9kZWwubWVuYV9zaXNfYWFhPXZhbHVlLm1lbmFfc2lzX2FhYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJiYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcmlmeTogKG8pID0+IHsgcmV0dXJuIG87IH0sIC8vTk9URTogQmV6IHRvaG8gbmVmdW5ndWplIHZ5cGxuZW5pIGhvZG5vdHkgYSBrbGlrIG1pbW8gaW5saW5lZGlhbG9nLCBtdXNpIHRvIGJ5dCB1IHZzZWNoIHRlY2h0byBwcmVmYWJ1LCBrcm9tZSBjZnVJbnRlcnZhbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDIxOVwiLCAvL1JDIDMzNjAwMjE5IDogTmV2YWxpZG7DrSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWwgfHwgISF2YWw/Lm1lbmEgfHwgdmFsPy5tZW5hID09IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwubWVuYT12YWx1ZS5tZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhdj8ubWVuYSB8fCB2Py5tZW5hID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRJbnRlcnZhbFZhbHVlRWxlbWVudCh7IHN0YXJ0OiB2Lm1lbmFfc2lzX2FhYSwgZW5kOiB2Lm1lbmFfc2lzX2FhYSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWVFbGVtZW50KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMuY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDUwOFwiLCAvL1JDIDMzNjAwNTA4IDogxIzDoXN0a2EgdiBtxJtuxJtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLmNfbWVuYVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTA5XCIsIC8vUkMgMzM2MDA1MDkgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLm5hemV2XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLmljb19lc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMuaWNvX2VzdVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRQaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvTmFtZXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b05hbWVzLml4cFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFrDrXNrw6Fuw60sIHDFmWlkw6Fuw60gYSB1cHJhdmVuw60gZmlsdHLFryBwcm8gdm9sYW7DrSBJc2wqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0RmlsdGVyRGF0YSh0aGF0OiB0aGlzLCByZXE6IElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBuZXh0OiBJc2wuVGFza1J1bnRpbWVOZXh0PElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8YW55Pj4gfCBJc2wuVGFza1J1bnRpbWVOZXh0PElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBhbnkvKkludGVyZmFjZS5HUG96YWRhdmt5RHRvKi8+KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmdldEZpbHRlcih0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChuZXdGaWx0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVycyA9IG5ld0ZpbHRlci5maWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVycyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uZmlsdGVyc1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlcVtcImZpbHRlcnNcIl0gPSBmaWx0ZXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KHJlcSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlrDrXNrw6Fuw60gc2VydmVyIGZpbHRlcnUgeiBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXIoZlBhbmVsRGF0YT86IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVyRHRvID0gZlBhbmVsRGF0YSB8fCB7fTtcclxuICAgICAgICAgICAgZmlsdGVyRHRvLmVrb19ha3QgPSAoZmlsdGVyRHRvLmVrb19ha3QpID8gOTAwIDogMTAwO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImNvbGxlY3RcIiwgZmlsdGVyRHRvKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGZpbHRlcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci51Y2V0X3ZsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5za192bCA9IGZpbHRlci51Y2V0X3ZsLnNrX3ZsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuYnVfdmwgPSBmaWx0ZXIudWNldF92bC5idV92bDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZpbHRlci51Y2V0X3ZsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIudWNldF9jaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuc2tfY2kgPSBmaWx0ZXIudWNldF9jaS5za19jaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmJ1X2NpID0gZmlsdGVyLnVjZXRfY2kuYnVfY2k7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmaWx0ZXIudWNldF9jaTtcclxuICAgICAgICAgICAgICAgICAgICAvL8O6cHJhdmEgdnMsIGtzLCBzcywga2R5IHBva3VkIGplIG9wZXJhY2UgPSwgdGFrIG5lY2hjaSBjYXN0b3ZhdCBuYSBpbnQsIHRha8W+ZSBtdXPDrW0gdXByYXZpdCB2c3R1cG7DrSBmaWx0ciBkbyBpc2x1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci52cyAmJiBmaWx0ZXIudnMuc3RhcnQgPT0gZmlsdGVyLnZzLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIudnMgPSBmaWx0ZXIudnMuc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIua3MgJiYgZmlsdGVyLmtzLnN0YXJ0ID09IGZpbHRlci5rcy5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmtzID0gZmlsdGVyLmtzLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnNzICYmIGZpbHRlci5zcy5zdGFydCA9PSBmaWx0ZXIuc3MuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5zcyA9IGZpbHRlci5zcy5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZmlsdGVyOiBmaWx0ZXIgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEhyb21hZG7DqSBwxZlpZMOhbsOtL3pha3Rpdm7Em27DrSB2eWJyYW7DvWNoIHBvbG/FvmVrICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmlkYXQoKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b1tdIHwgbnVsbCA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0bz4odGhpcy4kZ3JpZCkgfHwgW107XHJcbiAgICAgICAgICAgIGlmICgocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwMTcxXCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwMTcxIDogVnliZXJ0ZSBhbGVzcG/FiCBqZWRlbiDFmcOhZGVrXHJcbiAgICAgICAgICAgIGxldCB3aXphcmRDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwiR0hyb21hZG5lUHJpZGFuaU9jZWthbm9aQmFua3lCdWMjXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwNTEwXCIsIC8vUkMgMzM2MDA1MTAgOiBIcm9tYWRuw6kgcMWZaWTDoW7DrSAvIHpha3Rpdm7Em27DrSBwb2xvxb5la1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG8+KCkuYWRkKHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG8sIFwiY29sdW1uc1wiPihcIm9wdGlvblwiLCBcImNvbHVtbnNcIikgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFByb2ZpbGU6IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG8+KFwiZ2V0Q3VycmVudFByb2ZpbGVcIiksXHJcbiAgICAgICAgICAgICAgICBrZXlzOiB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvPihcImdldFZpZXdcIikua2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJvd3MsXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleXNBcnIgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4geyBpeHA6IHZhbC5peHAsIHJhZGVrX3VocjogdmFsLnJhZGVrX3VociB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNPY2VrYXZhbm9aQmFua3kuemtvbnRyb2x1alByZWRQcmlkYXQoeyBrZXlzOiBrZXlzQXJyIH0pLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDE3M1wiLCAvL1JDIDMzNjAwMTczIDogVsO9YsSbciB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMTczXCIsIC8vUkMgMzM2MDAxNzMgOiBWw71ixJtyIHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA1MTFcIiwgLy9SQyAzMzYwMDUxMSA6IEFrY2UgcMWZaWTDoSAvIHpha3Rpdm7DrSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBvZGVzbGFuw6kgcGxhdGJ5IGRvIGJhbmt5LiBPcHJhdmR1IGNoY2V0ZSB0b3RvIHByb3bDqXN0P1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWwuaXhwLCByYWRla191aHI6IHZhbC5yYWRla191aHIgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y09jZWthdmFub1pCYW5reS5ocm9tYWRuZVByaWRhdCh7IGtleXM6IGtleXNBcnIgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWwuaXhwLCByYWRla191aHI6IHZhbC5yYWRla191aHIgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y09jZWthdmFub1pCYW5reS56a29udHJvbHVqUHJlZFByaWRhdCh7IGtleXM6IGtleXNBcnIgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxNzVcIiwgLy9SQyAzMzYwMDE3NSA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNzZcIiAvL1JDIDMzNjAwMTc2IDogVsO9c2xlZGVrIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5nZXREYXRhUm93cygpLmZpbmQoeCA9PiB4Lndpel9raW5kID09IDIwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l6YXJkQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2l6YXJkQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSHJvbWFkbsOpIHZ5am11dMOtL3puZWFrdGl2bsSbbsOtIHZ5YnJhbsO9Y2ggcG9sb8W+ZWsgKi9cclxuICAgICAgICBwcml2YXRlIHZ5am1vdXQoKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b1tdIHwgbnVsbCA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0bz4odGhpcy4kZ3JpZCkgfHwgW107XHJcbiAgICAgICAgICAgIGlmICgocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwMTcxXCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwMTcxIDogVnliZXJ0ZSBhbGVzcG/FiCBqZWRlbiDFmcOhZGVrXHJcbiAgICAgICAgICAgIGxldCB3aXphcmRDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwiR0hyb21hZG5lVnlqbXV0aU9jZWthbm9aQmFua3lCdWMjXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwNTEyXCIsIC8vUkMgMzM2MDA1MTIgOiBIcm9tYWRuw6kgdnlqbXV0w60gLyB6bmVha3Rpdm7Em27DrSBwb2xvxb5la1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG8+KCkuYWRkKHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG8sIFwiY29sdW1uc1wiPihcIm9wdGlvblwiLCBcImNvbHVtbnNcIikgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFByb2ZpbGU6IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG8+KFwiZ2V0Q3VycmVudFByb2ZpbGVcIiksXHJcbiAgICAgICAgICAgICAgICBrZXlzOiB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvPihcImdldFZpZXdcIikua2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJvd3MsXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleXNBcnIgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4geyBpeHA6IHZhbC5peHAsIHJhZGVrX3VocjogdmFsLnJhZGVrX3VociB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNPY2VrYXZhbm9aQmFua3kuemtvbnRyb2x1alByZWRWeWptb3V0KHsga2V5czoga2V5c0FyciB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxNzNcIiwgLy9SQyAzMzYwMDE3MyA6IFbDvWLEm3IgesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDE3M1wiLCAvL1JDIDMzNjAwMTczIDogVsO9YsSbciB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNTEzXCIsIC8vUkMgMzM2MDA1MTMgOiBBa2NlIHZ5am1lIC8gem5lYWt0aXZuw60gdnlicmFuw6kgKHphxaFrcnRudXTDqSkgb2Rlc2xhbsOpIHBsYXRieSBkbyBiYW5reS4gT3ByYXZkdSBjaGNldGUgdG90byBwcm92w6lzdD9cclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfdWhyOiB2YWwucmFkZWtfdWhyIH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNPY2VrYXZhbm9aQmFua3kuaHJvbWFkbmVWeWptb3V0KHsga2V5czoga2V5c0FyciB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleXNBcnIgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4geyBpeHA6IHZhbC5peHAsIHJhZGVrX3VocjogdmFsLnJhZGVrX3VociB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjT2Nla2F2YW5vWkJhbmt5Lnprb250cm9sdWpQcmVkVnlqbW91dCh7IGtleXM6IGtleXNBcnIgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxNzVcIiwgLy9SQyAzMzYwMDE3NSA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNzZcIiAvL1JDIDMzNjAwMTc2IDogVsO9c2xlZGVrIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5nZXREYXRhUm93cygpLmZpbmQoeCA9PiB4Lndpel9raW5kID09IDIwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l6YXJkQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2l6YXJkQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSHJvbWFkbsOpIHN0b3Jub3bDoW7DrSB2eWJyYW7DvWNoIHBvbG/FvmVrICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9ybm92YXQoKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzOiBJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0b1tdIHwgbnVsbCA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0bz4odGhpcy4kZ3JpZCkgfHwgW107XHJcbiAgICAgICAgICAgIGlmICgocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwMTcxXCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwMTcxIDogVnliZXJ0ZSBhbGVzcG/FiCBqZWRlbiDFmcOhZGVrXHJcbiAgICAgICAgICAgIGxldCB3aXphcmRDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBsZXQgaGFzU2xvemVua3lCID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBoYXNIb3Rvdm9zdEV4dFN5c3RlbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgb2Ygcm93cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy50eXBfYWcgPT0gMTAwICYmIChyb3cucmFkZWtfdWhyID8/IDApIDwgNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc1Nsb3plbmt5QiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvdy50eXBfYWcgPT0gMzAwICYmIHJvdy56cCA9PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0hvdG92b3N0RXh0U3lzdGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHdpemFyZEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmb3JtSHJvbWFkbmVTdG9ybm92YW5pT2Nla2Fub1pCYW5reUJ1Y1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA1MTRcIikgLy9SQyAzMzYwMDUxNCA6IFNsb8W+ZW5reSBCIC0gdnLDoWNlbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiclNsb3plbmt5QlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAoaGFzU2xvemVua3lCKSA/IDAgOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiBcImpyZXM6MzM2MDA1MTVcIiwgZGlzYWJsZWQ6ICFoYXNTbG96ZW5reUIgfSwgLy9SQyAzMzYwMDUxNSA6IHBybyBvcMSbdG92bsOpIGdlbmVyb3bDoW7DrSBkw6F2a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6IFwianJlczozMzYwMDUxNlwiLCBkaXNhYmxlZDogIWhhc1Nsb3plbmt5QiB9IC8vUkMgMzM2MDA1MTYgOiBwcm8gdnLDoWNlbsOtIGRvIGFnZW5keSAtIHN0b3Jub3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDUxN1wiKSAvL1JDIDMzNjAwNTE3IDogSG90b3Zvc3QgemFkYW7DoSBleHRlcm7DrW0gc3lzdMOpbWVtIC0gc3Rvcm5vdmF0IGEgcMWZZWRhdFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJIb3Rvdm9zdEV4dFN5c3RlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAoaGFzSG90b3Zvc3RFeHRTeXN0ZW0pID8gMCA6IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6IFwianJlczozMzYwMDUxOFwiLCBkaXNhYmxlZDogIWhhc0hvdG92b3N0RXh0U3lzdGVtIH0sIC8vUkMgMzM2MDA1MTggOiBzdGF2IG5ldnl6dmVkbnV0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogXCJqcmVzOjMzNjAwNTE5XCIsIGRpc2FibGVkOiAhaGFzSG90b3Zvc3RFeHRTeXN0ZW0gfSAvL1JDIDMzNjAwNTE5IDogc3RhdiBzdG9ybm9cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vb2JqZWt0IHBybyB1bG/FvmVuw60gbW9kZWx1IHogcHJ2bsOtaG8ga3Jva3UgKMWhcGF0bsSbIHNlIHDFmWVuw6HFocOtIG1vZGVsIHDFmWkga3Jva8OhY2ggdGFtIGEgenDEm3QpXHJcbiAgICAgICAgICAgIGxldCBkYXRhTW9kZWwgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8SW50ZXJmYWNlLkdPY2VrYXZhbm9aQmFua3lEdG8+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBJRDogXCJHSHJvbWFkbmVTdG9ybm92YW5pT2Nla2Fub1pCYW5reUJ1YyNcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDA1MjBcIiwgLy9SQyAzMzYwMDUyMCA6IEhyb21hZG7DqSBzdG9ybm92w6Fuw60gcG9sb8W+ZWtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvPigpLmFkZCh0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvLCBcImNvbHVtbnNcIj4oXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgIGdyaWRQcm9maWxlOiB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HT2Nla2F2YW5vWkJhbmt5RHRvPihcImdldEN1cnJlbnRQcm9maWxlXCIpLFxyXG4gICAgICAgICAgICAgICAga2V5czogdGhpcy4kZ3JpZC5nZ3JpZDxJbnRlcmZhY2UuR09jZWthdmFub1pCYW5reUR0bz4oXCJnZXRWaWV3XCIpLmtleXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByb3dzLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgIHByZUNoZWNrQWN0aW9uOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWwuaXhwLCByYWRla191aHI6IHZhbC5yYWRla191aHIgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjT2Nla2F2YW5vWkJhbmt5Lnprb250cm9sdWpQcmVkU3Rvcm5vdmF0KHsga2V5czoga2V5c0FyciB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDE3M1wiLCAvL1JDIDMzNjAwMTczIDogVsO9YsSbciB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMTczXCIsIC8vUkMgMzM2MDAxNzMgOiBWw71ixJtyIHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA1MjFcIiwgLy9SQyAzMzYwMDUyMSA6IEFrY2Ugc3Rvcm51amUgLyB2csOhdMOtIGsgb3ByYXbEmyBkbyBhZ2VuZHkgdnlicmFuw6kgKHphxaFrcnRudXTDqSkgb2Rlc2xhbsOpIHBsYXRieSBkbyBiYW5reS4gT3ByYXZkdSBjaGNldGUgdG90byBwcm92w6lzdD9cclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1UYWJUaXRsZTogXCJqcmVzOjMzNjAwNTIyXCIsIC8vUkMgMzM2MDA1MjIgOiDDmmRhamVcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiB3aXphcmRGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogeyAvKnV1cF9Sb2s6IHRoaXMuUm9rKi8gfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVGb3JtRmllbGRzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfdWhyOiB2YWwucmFkZWtfdWhyIH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNPY2VrYXZhbm9aQmFua3kuaHJvbWFkbmVTdG9ybm92YXQoeyBrZXlzOiBrZXlzQXJyLCBzbG96ZW5reUI6IG1vZGVsLnJTbG96ZW5reUIgPz8gMCwgaG90b3Zvc3RFeHRTeXN0ZW06IG1vZGVsLnJIb3Rvdm9zdEV4dFN5c3RlbSA/PyAwIH0pLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWwuaXhwLCByYWRla191aHI6IHZhbC5yYWRla191aHIgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y09jZWthdmFub1pCYW5reS56a29udHJvbHVqUHJlZFN0b3Jub3ZhdCh7IGtleXM6IGtleXNBcnIgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxNzVcIiwgLy9SQyAzMzYwMDE3NSA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNzZcIiwgLy9SQyAzMzYwMDE3NiA6IFbDvXNsZWRlayBocm9tYWRuw6kgb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1UYWJUaXRsZTogXCJqcmVzOjMzNjAwNTIyXCIsIC8vUkMgMzM2MDA1MjIgOiDDmmRhamVcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiB3aXphcmRGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZUZvcm1GaWVsZHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogKCkgPT4geyByZXR1cm4gZGF0YU1vZGVsOyB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZ2V0RGF0YVJvd3MoKS5maW5kKHggPT4geC53aXpfa2luZCA9PSAyMDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpemFyZENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY3JlYXRlRGlhbG9nUHJvbWlzZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpemFyZENoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=