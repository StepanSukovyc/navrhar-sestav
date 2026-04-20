"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GVyberUhrady.ts                        </Name>
//    <Description> Dialog s výběrem úhrady při párování                        </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-02-17                                                  </Created>
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
            /**Dialog s výběrem úhrady při párování */
            let GVyberUhrady = class GVyberUhrady extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createFilterPanel();
                    this.createGrid();
                    this.presetFilters();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actOk: Gordic.Eko.Action.actionOk({
                            enabled: true,
                            run: (ev, ctx) => {
                                let data = this.$grid.ggrid("getSelection");
                                if (data.length == 1) {
                                    if ((this.typ_doh == 15 || this.typ_doh == 16) && (data[0].sk_vl != this.sk_vl || data[0].bu_vl != this.bu_vl) && data[0].typ_ag != 350) {
                                        this.dialogs.error("jres:33600214"); //RC 33600214 : Nelze vybrat, vlastní účet položky se neshoduje s účtem rozepisované položky
                                    }
                                    else {
                                        if (data[0].priz_nepar != 10 || this.buc_mpppn == 1 || (this.$grid.ggrid("getView").getCount() == 1 && this.typ_doh < 10 && data[0].priz_nepar == 10)) {
                                            this.tryClose(data);
                                        }
                                        else {
                                            this.dialogs.error("jres:33600215"); //RC 33600215 : Nelze vybrat, předpis má příznak nepárovat
                                        }
                                    }
                                }
                                else {
                                    this.tryClose(data);
                                }
                            }
                        }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }),
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actOk!", "actZavrit"]));
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
                /**Vytvoření gridu*/
                createGrid() {
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridVyberUhrady",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        multi: this.multiSelect,
                        data: new Gordic.Isl.View(this.isl.BucVyberUhrady.list().use((req, next, ctx) => {
                            return this.getFilterData(this, req, next);
                        }), {
                            filterPanel: this.$filterPanel,
                            startEmpty: true
                        }),
                        defaultAction: this.actions.actOk,
                        rowsCheckEnabled: (row) => {
                            if ((this.typ_doh == 15 || this.typ_doh == 16) && (row.data.sk_vl != this.sk_vl || row.data.bu_vl != this.bu_vl) && row.data.typ_ag != 350) {
                                //Call Msg._stop( 'Nelze vybrat, vlastní účet položky se neshoduje s účtem rozepisované položky !' )
                                return false;
                            }
                            else if (row.data.priz_nepar != 10 || this.buc_mpppn == 1) {
                                return true;
                                //else {Call Msg._stop( 'Nelze vybrat, předpis má příznak nepárovat !' )}
                            }
                            return true;
                        },
                        rowsEnabled: (row) => {
                            if ((this.typ_doh == 15 || this.typ_doh == 16) && (row.data.sk_vl != this.sk_vl || row.data.bu_vl != this.bu_vl) && row.data.typ_ag != 350) {
                                //Call Msg._stop( 'Nelze vybrat, vlastní účet položky se neshoduje s účtem rozepisované položky !' )
                                return false;
                            }
                            else if (row.data.priz_nepar != 10 || this.buc_mpppn == 1) {
                                return true;
                                //else {Call Msg._stop( 'Nelze vybrat, předpis má příznak nepárovat !' )}
                            }
                            return true;
                        }
                    }).ggridserverfilter({})
                        .gautofit({ resizersOnTab: false });
                }
                /** Definice gridformátu */
                createGridFormat() {
                    const that = this;
                    const filtersPerms = this.getPermsForGridServerFilters();
                    let columns = new Gordic.Data.GridFormat();
                    columns.addNumberColumn({
                        name: "pri_uhr" /* Interface.GVyberUhradyDtoNames.pri_uhr */,
                        caption: "jres:33600216", //RC 33600216 : Priorita
                        width: 32
                    });
                    columns.addTextColumn({
                        name: "ktg_upo_txt" /* Interface.GVyberUhradyDtoNames.ktg_upo_txt */,
                        caption: "jres:33600217", //RC 33600217 : Kategorie pohybu
                        width: 120
                    });
                    columns.addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GVyberUhradyDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GVyberUhradyDtoNames.ucet_vl */,
                        serverFilter: (filtersPerms.ucet_vl) ? {
                            widget: "gformbox",
                            options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({ name: "ucet_vl" }), {
                                form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                    .addSection("jres:33600218") //RC 33600218 : Bankovní účet vlastní
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
                                    //customClass: "js-inter-first",
                                    validators: [new Gordic.Validators.Base({
                                            message: "jres:33600219", //RC 33600219 : Nevalidní hodnota
                                            validate: (val, src) => {
                                                return !val || !!val?.rok;
                                            }
                                        })],
                                    //change: (ev, ctx) => {
                                    //    var $depField = $(document.body).findFields("ucet_vl2");
                                    //    if (ctx.value?.rok ?? false) {
                                    //        const val = ctx.value ?? {};
                                    //        $depField.gfield("model", "apply", { sk_vl: val.sk_vl, bu_vl: val.bu_vl, rok: val.rok });
                                    //    } else {
                                    //        $depField.gfield("reset");
                                    //    }
                                    //}
                                }),
                                //.addField("gselectbox", Gordic.Prefabs.Select.ekosuvl(), {
                                //    name: "ucet_vl2",
                                //    model: "model.sk_vl=value.sk_vl;model.bu_vl=value.bu_vl;model.rok=value.rok",
                                //    tabbable: false,
                                //    disabled: true, //pouze jedna hodnota
                                //    verify: (o) => { return o; }, //NOTE: Bez toho nefunguje vyplneni hodnoty a klik mimo inlinedialog, musi to byt u vsech techto prefabu, krome cfuIntervalu
                                //    customClass: "js-inter-second",
                                //    serverFilters: {
                                //        pristupKBU: 1,
                                //        urovenPristupuKBU: 1,
                                //        rezimVyberuDleKnihy: 0
                                //    }
                                //}),
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
                                //itemTooltipTemplate: Gordic.Eko.Filters.Utils.formatIntervalTooltip,
                            })
                        } : void 0
                    });
                    columns.addBankovniUcetCizi({
                        name: "ucet_ci" /* Interface.GVyberUhradyDtoNames.ucet_ci */,
                        field: "ucet_ci" /* Interface.GVyberUhradyDtoNames.ucet_ci */,
                        serverFilter: (filtersPerms.ucet_ci) ? {
                            widget: "gformbox",
                            options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({ name: "ucet_ci" }), {
                                form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                    .addSection("jres:33600220") //RC 33600220 : Bankovní účet cizí
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
                        } : void 0
                    });
                    columns.addCurrencyColumn({
                        name: "c" /* Interface.GVyberUhradyDtoNames.c */,
                        caption: "jres:33600062", //RC 33600062 : Částka
                        width: 120,
                        serverFilter: (filtersPerms.c) ? Gordic.Eko.Filters.decimalInterval({
                            model: "c" /* Interface.GVyberUhradyDtoNames.c */
                        }) : void 0
                    });
                    columns.addDateColumn({
                        name: "dat_spl" /* Interface.GVyberUhradyDtoNames.dat_spl */,
                        caption: "jres:33600221", //RC 33600221 : Datum splatnosti
                        width: 110,
                        serverFilter: (filtersPerms.dat_spl) ? Gordic.Eko.Filters.dateInterval({
                            model: "dat_spl" /* Interface.GVyberUhradyDtoNames.dat_spl */
                        }) : void 0
                    });
                    columns.addTextColumn({
                        name: "nazev" /* Interface.GVyberUhradyDtoNames.nazev */,
                        caption: "jres:33600222", //RC 33600222 : Název
                        width: 250,
                        serverFilter: (filtersPerms.nazev) ? Gordic.Eko.Filters.stringInterval({
                            model: "nazev" /* Interface.GVyberUhradyDtoNames.nazev */
                        }) : void 0
                    });
                    columns.addVs({
                        name: "vs" /* Interface.GVyberUhradyDtoNames.vs */,
                        serverFilter: (filtersPerms.vs) ? Gordic.Eko.Filters.stringInterval({
                            model: "vs" /* Interface.GVyberUhradyDtoNames.vs */
                        }) : void 0
                    });
                    columns.addTextColumn({
                        name: "vs_n" /* Interface.GVyberUhradyDtoNames.vs_n */,
                        caption: "jres:33600223", //RC 33600223 : VS náhradní
                        width: 90
                    });
                    if (this.rppUus == 1 && this.typ_doh != 20) {
                        columns.addUus({
                            name: "uus" /* Interface.GVyberUhradyDtoNames.uus */,
                            field: "uus" /* Interface.GVyberUhradyDtoNames.uus */
                        });
                    }
                    columns.addKs({
                        name: "ks" /* Interface.GVyberUhradyDtoNames.ks */,
                        serverFilter: (filtersPerms.ks) ? Gordic.Eko.Filters.stringInterval({
                            model: "ks" /* Interface.GVyberUhradyDtoNames.ks */
                        }) : void 0
                    });
                    columns.addSs({
                        name: "ss" /* Interface.GVyberUhradyDtoNames.ss */,
                        serverFilter: (filtersPerms.ss) ? Gordic.Eko.Filters.stringInterval({
                            model: "ss" /* Interface.GVyberUhradyDtoNames.ss */
                        }) : void 0
                    });
                    columns.addCurrencyColumn({
                        name: "c_par" /* Interface.GVyberUhradyDtoNames.c_par */,
                        caption: "jres:33600224", //RC 33600224 : Párováno
                        width: 120
                    });
                    columns.addMena({
                        name: "mena_txt" /* Interface.GVyberUhradyDtoNames.mena_txt */,
                        field: "mena_txt" /* Interface.GVyberUhradyDtoNames.mena_txt */,
                        serverFilter: (filtersPerms.mena) ? {
                            widget: "gformbox",
                            options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({ name: "mena" }), {
                                form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                    .addSection("jres:33600225") //RC 33600225 : Měna
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
                        } : void 0
                    });
                    Gordic.Eko.Filters.stringSingle;
                    columns.addCurrencyColumn({
                        name: "c_mena" /* Interface.GVyberUhradyDtoNames.c_mena */,
                        caption: "jres:33600061", //RC 33600061 : Částka v měně
                        width: 120,
                        serverFilter: (filtersPerms.c_mena) ? Gordic.Eko.Filters.decimalInterval({
                            model: "c_mena" /* Interface.GVyberUhradyDtoNames.c_mena */
                        }) : void 0
                    });
                    columns.addCurrencyColumn({
                        name: "c_par_mena" /* Interface.GVyberUhradyDtoNames.c_par_mena */,
                        caption: "jres:33600226", //RC 33600226 : Párováno v měně
                        width: 120
                    });
                    columns.addAgenda({
                        name: "typ_ag_zkr" /* Interface.GVyberUhradyDtoNames.typ_ag_zkr */,
                        field: "typ_ag_zkr" /* Interface.GVyberUhradyDtoNames.typ_ag_zkr */,
                        serverFilter: (filtersPerms.mena) ? {
                            widget: "gformbox",
                            options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({ name: "typ_ag" }), {
                                form: new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                    .addSection("jres:33600227") //RC 33600227 : Agenda
                                    .addField("gselectbox", Gordic.Prefabs.Select.ginctag(), {
                                    name: "typ_ag",
                                    model: "model.typ_ag=value.typ_ag;model.zkr_ag=value.zkr_ag",
                                    tabbable: false,
                                    serverFilters: {
                                        typ_ag: [50, 70, 80, 90, 100, 180, 230, 270, 300, 330, 350, 410, 430, 490, 500, 700]
                                    },
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
                        } : void 0
                    });
                    columns.addAgendoveCislo({
                        name: "ac" /* Interface.GVyberUhradyDtoNames.ac */,
                        field: "ac" /* Interface.GVyberUhradyDtoNames.ac */
                    });
                    columns.addTextColumn({
                        name: "ixp" /* Interface.GVyberUhradyDtoNames.ixp */,
                        caption: "jres:33600228", //RC 33600228 : Identifikátor
                        width: 120
                    });
                    if (this.typ_doh == 17 || this.typ_doh == 13) {
                        columns.addNumberColumn({
                            name: "cis_pid" /* Interface.GVyberUhradyDtoNames.cis_pid */,
                            caption: "jres:33600229", //RC 33600229 : Č.v.
                            description: "jres:33600230", //RC 33600230 : Číslo výpisu
                            width: 32,
                            serverFilter: (filtersPerms.cis_pid) ? Gordic.Eko.Filters.decimalInterval({
                                model: "cis_pid" /* Interface.GVyberUhradyDtoNames.cis_pid */
                            }) : void 0
                        });
                        columns.addTextColumn({
                            name: "ixp_pol" /* Interface.GVyberUhradyDtoNames.ixp_pol */,
                            caption: "jres:33600231", //RC 33600231 : ID výpisu
                            width: 120
                        });
                        columns.addDateColumn({
                            name: "dat_nov_zus" /* Interface.GVyberUhradyDtoNames.dat_nov_zus */,
                            caption: "jres:33600232", //RC 33600232 : Datum výpisu
                            width: 110
                        });
                        columns.addNumberColumn({
                            name: "pod_cis" /* Interface.GVyberUhradyDtoNames.pod_cis */,
                            caption: "jres:33600233", //RC 33600233 : Pod. číslo
                            description: "jres:33600234", //RC 33600234 : Podací číslo
                            width: 32
                        });
                        columns.addNumberColumn({
                            name: "por_cis_vds" /* Interface.GVyberUhradyDtoNames.por_cis_vds */,
                            caption: "jres:33600235", //RC 33600235 : Věta VDS
                            width: 32
                        });
                        columns.addTextColumn({
                            name: "spe_adr" /* Interface.GVyberUhradyDtoNames.spe_adr */,
                            caption: "jres:33600236", //RC 33600236 : Spec. adresáta
                            width: 100
                        });
                    }
                    columns.addTextColumn({
                        name: "popis" /* Interface.GVyberUhradyDtoNames.popis */,
                        caption: "jres:33600237", //RC 33600237 : Popis párovacího předpisu
                        width: 200
                    });
                    return columns;
                }
                /** Získání, přidání a upravení filtrů pro volaní Isl*/
                getFilterData(that, req, next) {
                    return that.getFilter()
                        .then((newFilter) => {
                        let filters = newFilter.filter;
                        filters = {
                            ...filters,
                            typ_doh_p: this.typ_doh,
                            sk_vl_p: this.sk_vl,
                            bu_vl_p: this.bu_vl,
                            sk_ci_p: this.sk_ci,
                            bu_ci_p: this.bu_ci,
                            vs_p: this.vs,
                            ss_p: this.ss,
                            c_p: this.c,
                            ixp_p: this.ixp,
                            ixp_rs_p: this.ixp_rs,
                            dat_vyp_vra_p: this.dat_vyp_vra,
                            lic_p: this.lic,
                            c_mena_p: this.c_mena,
                            radek_in_p: this.radek_in
                        };
                        req["filters"] = filters;
                        return next(req);
                    });
                }
                /**Získání server filteru z gridu*/
                getFilter() {
                    let filterDto = {};
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
                /** Nastaví úvodní ggridserver filtry */
                presetFilters() {
                    let filters = {};
                    if (this.typ_doh == 10 || this.typ_doh == 15 || this.typ_doh == 16) {
                        filters["ucet_vl"] = { bu_vl: this.bu_vl, sk_vl: this.sk_vl, rok: this.rok }; //rok kvůli primárnímu klíči
                    }
                    if (this.buc_pvsm == 1) {
                        filters["vs"] = this.vs;
                    }
                    this.$grid.ggridserverfilter("apply", filters);
                }
                /**Získání povolených/zakázaných server filterů masky*/
                getPermsForGridServerFilters() {
                    let perms = {
                        ucet_vl: true,
                        ucet_ci: true,
                        cis_pid: true,
                        c: true,
                        dat_spl: true,
                        dat_zap: true,
                        vs: true,
                        ks: true,
                        ss: true,
                        mena: true,
                        c_mena: true,
                        typ_ag: true,
                        nazev: true,
                    };
                    if (this.typ_doh < 20) {
                        perms.cis_pid = perms.dat_zap = false;
                        //Set sTable = 'bucdpep'
                        switch (this.typ_doh) {
                            case 1:
                                //manuál.pár- aut. dohledání-ban.výpis
                                perms.ucet_vl = perms.ucet_ci = perms.vs = perms.c = false;
                                break;
                            case 2:
                                //manuál.pár- aut. dohledání-ban.výpis
                                perms.ucet_vl = perms.vs = perms.c = false;
                                break;
                            case 3:
                                //manuál.pár- aut. dohledání-ban.výpis
                                perms.ucet_vl = perms.vs = false;
                                break;
                            case 4:
                                //manuál.pár- aut. dohledání-ban.výpis
                                perms.ucet_vl = perms.c = false;
                                break;
                            case 5:
                                //manuál.pár- aut. dohledání-ban.výpis
                                perms.vs = false;
                                break;
                            case 7:
                                //trvale pozastavené
                                //Set sTable = 'p'
                                //Call SalSetWindowText( hWndForm, 'Výběrová maska pro seznam trvale pozastavených plateb' )
                                break;
                            case 18:
                                //kumplar- dohledání-pok.výpis c>0
                                perms.ucet_vl = false;
                                break;
                            case 19:
                                //kumplar- dohledání-pok.výpis c<=0
                                perms.ucet_vl = false;
                                break;
                        }
                    }
                    else if (this.typ_doh >= 20 && this.typ_doh < 25) {
                        //Set sTable = 'bucdpam'
                        perms.cis_pid = perms.ucet_vl = perms.c = perms.dat_zap = perms.typ_ag = perms.nazev = perms.mena = perms.c_mena = false;
                    }
                    else {
                        //Call SalSetWindowText( hWndForm, 'Výběrová maska pro likvidaci nespárovaných plateb bankovního výpisu' )
                        //Set sTable = 'bucdpol'
                        perms.typ_ag = perms.dat_spl = false;
                    }
                    return perms;
                }
            };
            GVyberUhrady = __decorate([
                Decorators.gcontent
            ], GVyberUhrady);
            WebClient.GVyberUhrady = GVyberUhrady;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyVWhyYWR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Z5YmVyVWhyYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFHakIsSUFBVSxNQUFNLENBeW9CZjtBQXpvQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBeW9CbkI7SUF6b0JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5b0I3QjtRQXpvQm9CLFdBQUEsU0FBUztZQXVDMUIsMENBQTBDO1lBRTFDLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxPQUFBLFlBQVk7Z0JBa0QxQyxjQUFjO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDekIsQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7NEJBQzlCLE9BQU8sRUFBRSxJQUFJOzRCQUNiLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztnQ0FDNUMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFB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LFlBQVk7Z0JBRHhCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsWUFBWSxDQStsQnhCO1lBL2xCWSxzQkFBWSxlQStsQnhCLENBQUE7UUFDTCxDQUFDLEVBem9Cb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeW9CN0I7SUFBRCxDQUFDLEVBem9CZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeW9CbkI7QUFBRCxDQUFDLEVBem9CUyxNQUFNLEtBQU4sTUFBTSxRQXlvQmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdWeWJlclVocmFkeS50cyAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cbi8vICAgIDxEZXNjcmlwdGlvbj4gRGlhbG9nIHMgdsO9YsSbcmVtIMO6aHJhZHkgcMWZaSBww6Fyb3bDoW7DrSAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDItMTcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cbi8vICA8L0ZpbGVIZWFkZXI+XG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQnVjLldlYkNsaWVudCB7XHJcbiAgICAvKiogVnN0dXBuw60gcGFyYW1ldHJ5IGRpYWxvZ3UgdsO9YsSbcnUgw7pocmFkeSovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdWeWJlclVocmFkeURsZ0lucHV0UGFyYW1zIHtcclxuICAgICAgICAvKipWUyovXHJcbiAgICAgICAgdnM/OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIC8qKlNTKi9cclxuICAgICAgICBzcz86IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgLyoqc2tfdmwqL1xyXG4gICAgICAgIHNrX3ZsPzogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAvKipidV92bCovXHJcbiAgICAgICAgYnVfdmw/OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIC8qKnNrX2NpKi9cclxuICAgICAgICBza19jaT86IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgLyoqYnVfY2kqL1xyXG4gICAgICAgIGJ1X2NpPzogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAvKipjKi9cclxuICAgICAgICBjPzogRGVjaW1hbCB8IEpzb25EZWNpbWFsIHwgbnVsbCxcclxuICAgICAgICAvKipUeXBEb2ggKi9cclxuICAgICAgICB0eXBfZG9oPzogbnVtYmVyIHwgbnVsbCxcclxuICAgICAgICAvKipQb2NEb2ggKi9cclxuICAgICAgICBwb2NfZG9oPzogbnVtYmVyIHwgbnVsbCxcclxuICAgICAgICAvKipjX21lbmEgKi9cclxuICAgICAgICBjX21lbmE/OiBEZWNpbWFsIHwgSnNvbkRlY2ltYWwgfCBudWxsLFxyXG4gICAgICAgIC8qKk3Em25hICovXHJcbiAgICAgICAgbWVuYT86IG51bWJlciB8IG51bGwsXHJcbiAgICAgICAgLyoqUmFkZWtJbiAqL1xyXG4gICAgICAgIHJhZGVrX2luPzogc3RyaW5nW10gfCBudWxsLFxyXG4gICAgICAgIC8qKml4cCAqL1xyXG4gICAgICAgIGl4cD86IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgLyoqaXhwX3JzICovXHJcbiAgICAgICAgaXhwX3JzPzogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAvKipkYXRfdnlwX3ZyYSAqL1xyXG4gICAgICAgIGRhdF92eXBfdnJhPzogRGF0ZSB8IEpzb25EYXRlIHwgbnVsbCxcclxuICAgICAgICAvKipsaWMgKi9cclxuICAgICAgICBsaWM/OiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIC8qKlDFmcOtem5haywgemRhIGplIHBvdm9sZW4gdsO9YsSbciB2w61jZSDFmcOhZGvFryAtIGRlZmF1bHQgdHJ1ZSAqL1xyXG4gICAgICAgIG11bHRpU2VsZWN0PzogYm9vbGVhbiB8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqRGlhbG9nIHMgdsO9YsSbcmVtIMO6aHJhZHkgcMWZaSBww6Fyb3bDoW7DrSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnliZXJVaHJhZHkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKnZzICovXHJcbiAgICAgICAgcHVibGljIHZzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqc3MgKi9cclxuICAgICAgICBwdWJsaWMgc3M6IHN0cmluZztcclxuICAgICAgICAvKipza192bCAqL1xyXG4gICAgICAgIHB1YmxpYyBza192bDogc3RyaW5nO1xyXG4gICAgICAgIC8qKmJ1X3ZsICovXHJcbiAgICAgICAgcHVibGljIGJ1X3ZsOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqc2tfY2kgKi9cclxuICAgICAgICBwdWJsaWMgc2tfY2k6IHN0cmluZztcclxuICAgICAgICAvKipidV9jaSAqL1xyXG4gICAgICAgIHB1YmxpYyBidV9jaTogc3RyaW5nO1xyXG4gICAgICAgIC8qKmMgKi9cclxuICAgICAgICBwdWJsaWMgYzogRGVjaW1hbCB8IEpzb25EZWNpbWFsO1xyXG4gICAgICAgIC8qKlR5cERvaCAqL1xyXG4gICAgICAgIHB1YmxpYyB0eXBfZG9oOiBudW1iZXI7XHJcbiAgICAgICAgLyoqUG9jRG9oICovXHJcbiAgICAgICAgcHVibGljIHBvY19kb2g6IG51bWJlclxyXG4gICAgICAgIC8qKmNfbWVuYSAqL1xyXG4gICAgICAgIHB1YmxpYyBjX21lbmE6IERlY2ltYWwgfCBKc29uRGVjaW1hbDtcclxuICAgICAgICAvKipNxJtuYSAqL1xyXG4gICAgICAgIHB1YmxpYyBtZW5hOiBudW1iZXI7XHJcbiAgICAgICAgLyoqUmFkZWtJbiAqL1xyXG4gICAgICAgIHB1YmxpYyByYWRla19pbjogc3RyaW5nW107XHJcbiAgICAgICAgLyoqaXhwICovXHJcbiAgICAgICAgcHVibGljIGl4cDogc3RyaW5nO1xyXG4gICAgICAgIC8qKml4cF9ycyAqL1xyXG4gICAgICAgIHB1YmxpYyBpeHBfcnM6IHN0cmluZztcclxuICAgICAgICAvKipkYXRfdnlwX3ZyYSAqL1xyXG4gICAgICAgIHB1YmxpYyBkYXRfdnlwX3ZyYTogRGF0ZSB8IEpzb25EYXRlO1xyXG4gICAgICAgIC8qKmxpYyAqL1xyXG4gICAgICAgIHB1YmxpYyBsaWM6IHN0cmluZztcclxuICAgICAgICAvKipQxZnDrXpuYWssIHpkYSBqZSBwb3ZvbGVuIHbDvWLEm3IgdsOtY2UgxZnDoWRrxa8gKi9cclxuICAgICAgICBwdWJsaWMgbXVsdGlTZWxlY3Q6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIC8qKiBHbG9iYWxzIC0gUnBwVXVzKi9cclxuICAgICAgICBwcml2YXRlIHJwcFV1czogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBBa3R1w6FsbsOtIHJvayovXHJcbiAgICAgICAgcHJpdmF0ZSByb2s6IG51bWJlcjtcclxuICAgICAgICAvKiogQlVDIC0gUMWZZWRwbG7Em27DrSBWUyBkbyBtYXNreSBwxZlpIGRvaGxlZMOhbsOtIHDFmWVkcGlzxa8qL1xyXG4gICAgICAgIHByaXZhdGUgYnVjX3B2c206IG51bWJlcjtcclxuICAgICAgICAvKiogQlVDIC0gTWFuLnDDoXJvdsOhbsOtIG5hIHDFmWVkcGlzIHMgcMWZw616bmFrZW0gbmVww6Fyb3ZhdCovXHJcbiAgICAgICAgcHJpdmF0ZSBidWNfbXBwcG46IG51bWJlcjtcclxuXHJcbiAgICAgICAgLyoqR3JpZCAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqRmlsdGVycGFuZWwgKi9cclxuICAgICAgICBwcml2YXRlICRmaWx0ZXJQYW5lbDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbW1hbmRCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5wcmVzZXRGaWx0ZXJzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9rOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Payh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodGhpcy50eXBfZG9oID09IDE1IHx8IHRoaXMudHlwX2RvaCA9PSAxNikgJiYgKGRhdGFbMF0uc2tfdmwgIT0gdGhpcy5za192bCB8fCBkYXRhWzBdLmJ1X3ZsICE9IHRoaXMuYnVfdmwpICYmIGRhdGFbMF0udHlwX2FnICE9IDM1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcImpyZXM6MzM2MDAyMTRcIik7IC8vUkMgMzM2MDAyMTQgOiBOZWx6ZSB2eWJyYXQsIHZsYXN0bsOtIMO6xI1ldCBwb2xvxb5reSBzZSBuZXNob2R1amUgcyDDusSNdGVtIHJvemVwaXNvdmFuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbMF0ucHJpel9uZXBhciAhPSAxMCB8fCB0aGlzLmJ1Y19tcHBwbiA9PSAxIHx8ICh0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXRDb3VudCgpID09IDEgJiYgdGhpcy50eXBfZG9oIDwgMTAgJiYgZGF0YVswXS5wcml6X25lcGFyID09IDEwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcImpyZXM6MzM2MDAyMTVcIik7IC8vUkMgMzM2MDAyMTUgOiBOZWx6ZSB2eWJyYXQsIHDFmWVkcGlzIG3DoSBwxZnDrXpuYWsgbmVww6Fyb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0T2shXCIsIFwiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZmlsdHIgcGFuZWx1IG5hZCBncmlkZW0qL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWwoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBmb3JtczogW25ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW10sXHJcbiAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyOiBbXSxcclxuICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICByZXNldDogKCkgPT4geyB0aGlzLiRncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiY2xlYXJcIik7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipWeXR2b8WZZW7DrSBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8SW50ZXJmYWNlLkdWeWJlclVocmFkeUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFZ5YmVyVWhyYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRoaXMubXVsdGlTZWxlY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5CdWNWeWJlclVocmFkeS5saXN0KCkudXNlKChyZXEsIG5leHQsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWx0ZXJEYXRhKHRoaXMsIHJlcSwgbmV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyUGFuZWw6IHRoaXMuJGZpbHRlclBhbmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE9rLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3NDaGVja0VuYWJsZWQ6IChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGlzLnR5cF9kb2ggPT0gMTUgfHwgdGhpcy50eXBfZG9oID09IDE2KSAmJiAocm93LmRhdGEuc2tfdmwgIT0gdGhpcy5za192bCB8fCByb3cuZGF0YS5idV92bCAhPSB0aGlzLmJ1X3ZsKSAmJiByb3cuZGF0YS50eXBfYWcgIT0gMzUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NhbGwgTXNnLl9zdG9wKCAnTmVsemUgdnlicmF0LCB2bGFzdG7DrSDDusSNZXQgcG9sb8W+a3kgc2UgbmVzaG9kdWplIHMgw7rEjXRlbSByb3plcGlzb3ZhbsOpIHBvbG/Fvmt5ICEnIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJvdy5kYXRhLnByaXpfbmVwYXIgIT0gMTAgfHwgdGhpcy5idWNfbXBwcG4gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2Uge0NhbGwgTXNnLl9zdG9wKCAnTmVsemUgdnlicmF0LCBwxZllZHBpcyBtw6EgcMWZw616bmFrIG5lcMOhcm92YXQgIScgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3NFbmFibGVkOiAocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodGhpcy50eXBfZG9oID09IDE1IHx8IHRoaXMudHlwX2RvaCA9PSAxNikgJiYgKHJvdy5kYXRhLnNrX3ZsICE9IHRoaXMuc2tfdmwgfHwgcm93LmRhdGEuYnVfdmwgIT0gdGhpcy5idV92bCkgJiYgcm93LmRhdGEudHlwX2FnICE9IDM1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DYWxsIE1zZy5fc3RvcCggJ05lbHplIHZ5YnJhdCwgdmxhc3Ruw60gw7rEjWV0IHBvbG/Fvmt5IHNlIG5lc2hvZHVqZSBzIMO6xI10ZW0gcm96ZXBpc292YW7DqSBwb2xvxb5reSAhJyApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihyb3cuZGF0YS5wcml6X25lcGFyICE9IDEwIHx8IHRoaXMuYnVjX21wcHBuID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9lbHNlIHtDYWxsIE1zZy5fc3RvcCggJ05lbHplIHZ5YnJhdCwgcMWZZWRwaXMgbcOhIHDFmcOtem5hayBuZXDDoXJvdmF0ICEnICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZ2dyaWRzZXJ2ZXJmaWx0ZXIoe30pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBEZWZpbmljZSBncmlkZm9ybcOhdHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG8+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJzUGVybXMgPSB0aGlzLmdldFBlcm1zRm9yR3JpZFNlcnZlckZpbHRlcnMoKTtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvPigpO1xyXG5cclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnByaV91aHIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyMTZcIiwgLy9SQyAzMzYwMDIxNiA6IFByaW9yaXRhXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9OYW1lcy5rdGdfdXBvX3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIxN1wiLCAvL1JDIDMzNjAwMjE3IDogS2F0ZWdvcmllIHBvaHlidVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEJhbmtvdm5pVWNldFZsYXN0bmkoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnVjZXRfdmwsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IChmaWx0ZXJzUGVybXMudWNldF92bCkgPyB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdmb3JtYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyh7IG5hbWU6IFwidWNldF92bFwiIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzYwMDIxOFwiKSAvL1JDIDMzNjAwMjE4IDogQmFua292bsOtIMO6xI1ldCB2bGFzdG7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3V2bCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y2V0X3ZsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc2tfdmw9dmFsdWUuc2tfdmw7bW9kZWwuYnVfdmw9dmFsdWUuYnVfdmw7bW9kZWwucm9rPXZhbHVlLnJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpc3R1cEtCVTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJvdmVuUHJpc3R1cHVLQlU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlemltVnliZXJ1RGxlS25paHk6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhdj8ucm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHYuYnVfdmwgPz8gXCJcIikudHJpbSgpICsgXCIvXCIgKyAodi5za192bCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJiYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiAobykgPT4geyByZXR1cm4gbzsgfSwgLy9OT1RFOiBCZXogdG9obyBuZWZ1bmd1amUgdnlwbG5lbmkgaG9kbm90eSBhIGtsaWsgbWltbyBpbmxpbmVkaWFsb2csIG11c2kgdG8gYnl0IHUgdnNlY2ggdGVjaHRvIHByZWZhYnUsIGtyb21lIGNmdUludGVydmFsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwianMtaW50ZXItZmlyc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAyMTlcIiwgLy9SQyAzMzYwMDIxOSA6IE5ldmFsaWRuw60gaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXZhbCB8fCAhIXZhbD8ucm9rO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciAkZGVwRmllbGQgPSAkKGRvY3VtZW50LmJvZHkpLmZpbmRGaWVsZHMoXCJ1Y2V0X3ZsMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoY3R4LnZhbHVlPy5yb2sgPz8gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY29uc3QgdmFsID0gY3R4LnZhbHVlID8/IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAkZGVwRmllbGQuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB7IHNrX3ZsOiB2YWwuc2tfdmwsIGJ1X3ZsOiB2YWwuYnVfdmwsIHJvazogdmFsLnJvayB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAkZGVwRmllbGQuZ2ZpZWxkKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dmwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJ1Y2V0X3ZsMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwibW9kZWwuc2tfdmw9dmFsdWUuc2tfdmw7bW9kZWwuYnVfdmw9dmFsdWUuYnVfdmw7bW9kZWwucm9rPXZhbHVlLnJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGFiYmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZGlzYWJsZWQ6IHRydWUsIC8vcG91emUgamVkbmEgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmVyaWZ5OiAobykgPT4geyByZXR1cm4gbzsgfSwgLy9OT1RFOiBCZXogdG9obyBuZWZ1bmd1amUgdnlwbG5lbmkgaG9kbm90eSBhIGtsaWsgbWltbyBpbmxpbmVkaWFsb2csIG11c2kgdG8gYnl0IHUgdnNlY2ggdGVjaHRvIHByZWZhYnUsIGtyb21lIGNmdUludGVydmFsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY3VzdG9tQ2xhc3M6IFwianMtaW50ZXItc2Vjb25kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcHJpc3R1cEtCVTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB1cm92ZW5QcmlzdHVwdUtCVTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXppbVZ5YmVydURsZUtuaWh5OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC51Y2V0X3ZsPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXY/LnJvaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1Y2V0X3ZsID0gKHYuYnVfdmwgPz8gXCJcIikudHJpbSgpICsgXCIvXCIgKyAodi5za192bCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRJbnRlcnZhbFZhbHVlRWxlbWVudCh7IHN0YXJ0OiB1Y2V0X3ZsLCBlbmQ6IHVjZXRfdmwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZUVsZW1lbnQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtVG9vbHRpcFRlbXBsYXRlOiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxUb29sdGlwLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9IDogdm9pZCAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQmFua292bmlVY2V0Q2l6aSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvTmFtZXMudWNldF9jaSxcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvTmFtZXMudWNldF9jaSxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogKGZpbHRlcnNQZXJtcy51Y2V0X2NpKSA/IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiAkLmV4dGVuZChHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZ2V0Rm9ybUJveEZpbHRlckRlZmF1bHRzKHsgbmFtZTogXCJ1Y2V0X2NpXCIgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMzNjAwMjIwXCIpIC8vUkMgMzM2MDAyMjAgOiBCYW5rb3Zuw60gw7rEjWV0IGNpesOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdWNpKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjZXRfY2lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5za19jaT12YWx1ZS5za19jaTttb2RlbC5idV9jaT12YWx1ZS5idV9jaTttb2RlbC5peHNfZXN1PXZhbHVlLml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhZGF0YT8uaXhzX2VzdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkYXRhLmJ1X2NpID8/IFwiXCIpLnRyaW0oKSArIFwiL1wiICsgKGRhdGEuc2tfY2kgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiYmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcmlmeTogKG8pID0+IHsgcmV0dXJuIG87IH0sIC8vTk9URTogQmV6IHRvaG8gbmVmdW5ndWplIHZ5cGxuZW5pIGhvZG5vdHkgYSBrbGlrIG1pbW8gaW5saW5lZGlhbG9nLCBtdXNpIHRvIGJ5dCB1IHZzZWNoIHRlY2h0byBwcmVmYWJ1LCBrcm9tZSBjZnVJbnRlcnZhbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAyMTlcIiwgLy9SQyAzMzYwMDIxOSA6IE5ldmFsaWRuw60gaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXZhbCB8fCAhIXZhbD8uaXhzX2VzdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC51Y2V0X2NpPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXY/Lml4c19lc3UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdWNldF9jaSA9ICh2LmJ1X2NpID8/IFwiXCIpLnRyaW0oKSArIFwiL1wiICsgKHYuc2tfY2kgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZUVsZW1lbnQoeyBzdGFydDogdWNldF9jaSwgZW5kOiB1Y2V0X2NpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWVFbGVtZW50KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9IDogdm9pZCAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLmMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwNjJcIiwgLy9SQyAzMzYwMDA2MiA6IMSMw6FzdGthXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiAoZmlsdGVyc1Blcm1zLmMpID8gR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9OYW1lcy5jXHJcbiAgICAgICAgICAgICAgICB9KSA6IHZvaWQgMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLmRhdF9zcGwsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyMjFcIiwgLy9SQyAzMzYwMDIyMSA6IERhdHVtIHNwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IChmaWx0ZXJzUGVybXMuZGF0X3NwbCkgPyBHb3JkaWMuRWtvLkZpbHRlcnMuZGF0ZUludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLmRhdF9zcGxcclxuICAgICAgICAgICAgICAgIH0pIDogdm9pZCAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyMjJcIiwgLy9SQyAzMzYwMDIyMiA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDI1MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogKGZpbHRlcnNQZXJtcy5uYXpldikgPyBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvTmFtZXMubmF6ZXZcclxuICAgICAgICAgICAgICAgIH0pIDogdm9pZCAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVnMoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiAoZmlsdGVyc1Blcm1zLnZzKSA/IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9OYW1lcy52c1xyXG4gICAgICAgICAgICAgICAgfSkgOiB2b2lkIDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9OYW1lcy52c19uLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjIzXCIsIC8vUkMgMzM2MDAyMjMgOiBWUyBuw6FocmFkbsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKHRoaXMucnBwVXVzID09IDEgJiYgdGhpcy50eXBfZG9oICE9IDIwKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zLmFkZFV1cyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnV1cyxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnV1c1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEtzKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9OYW1lcy5rcyxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogKGZpbHRlcnNQZXJtcy5rcykgPyBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvTmFtZXMua3NcclxuICAgICAgICAgICAgICAgIH0pIDogdm9pZCAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkU3Moe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnNzLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiAoZmlsdGVyc1Blcm1zLnNzKSA/IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9OYW1lcy5zc1xyXG4gICAgICAgICAgICAgICAgfSkgOiB2b2lkIDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvTmFtZXMuY19wYXIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyMjRcIiwgLy9SQyAzMzYwMDIyNCA6IFDDoXJvdsOhbm9cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRNZW5hKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9OYW1lcy5tZW5hX3R4dCxcclxuICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvTmFtZXMubWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IChmaWx0ZXJzUGVybXMubWVuYSkgPyB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdmb3JtYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyh7IG5hbWU6IFwibWVuYVwiIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzYwMDIyNVwiKSAvL1JDIDMzNjAwMjI1IDogTcSbbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NtZW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNldF92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLm1lbmE9dmFsdWUubWVuYTttb2RlbC5tZW5hX3Npc19hYWE9dmFsdWUubWVuYV9zaXNfYWFhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiYmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcmlmeTogKG8pID0+IHsgcmV0dXJuIG87IH0sIC8vTk9URTogQmV6IHRvaG8gbmVmdW5ndWplIHZ5cGxuZW5pIGhvZG5vdHkgYSBrbGlrIG1pbW8gaW5saW5lZGlhbG9nLCBtdXNpIHRvIGJ5dCB1IHZzZWNoIHRlY2h0byBwcmVmYWJ1LCBrcm9tZSBjZnVJbnRlcnZhbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAyMTlcIiwgLy9SQyAzMzYwMDIxOSA6IE5ldmFsaWRuw60gaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXZhbCB8fCAhIXZhbD8ubWVuYSB8fCB2YWw/Lm1lbmEgPT0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLm1lbmE9dmFsdWUubWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISF2Py5tZW5hIHx8IHY/Lm1lbmEgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZUVsZW1lbnQoeyBzdGFydDogdi5tZW5hX3Npc19hYWEsIGVuZDogdi5tZW5hX3Npc19hYWEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZUVsZW1lbnQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9IDogdm9pZCAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGVcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvTmFtZXMuY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDYxXCIsIC8vUkMgMzM2MDAwNjEgOiDEjMOhc3RrYSB2IG3Em27Em1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogKGZpbHRlcnNQZXJtcy5jX21lbmEpID8gR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9OYW1lcy5jX21lbmFcclxuICAgICAgICAgICAgICAgIH0pIDogdm9pZCAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLmNfcGFyX21lbmEsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyMjZcIiwgLy9SQyAzMzYwMDIyNiA6IFDDoXJvdsOhbm8gdiBtxJtuxJtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRBZ2VuZGEoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnR5cF9hZ196a3IsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnR5cF9hZ196a3IsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IChmaWx0ZXJzUGVybXMubWVuYSkgPyB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdmb3JtYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyh7IG5hbWU6IFwidHlwX2FnXCIgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMzNjAwMjI3XCIpIC8vUkMgMzM2MDAyMjcgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmN0YWcoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX2FnPXZhbHVlLnR5cF9hZzttb2RlbC56a3JfYWc9dmFsdWUuemtyX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiYmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2FnOiBbNTAsIDcwLCA4MCwgOTAsIDEwMCwgMTgwLCAyMzAsIDI3MCwgMzAwLCAzMzAsIDM1MCwgNDEwLCA0MzAsIDQ5MCwgNTAwLCA3MDBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IChvKSA9PiB7IHJldHVybiBvOyB9LCAvL05PVEU6IEJleiB0b2hvIG5lZnVuZ3VqZSB2eXBsbmVuaSBob2Rub3R5IGEga2xpayBtaW1vIGlubGluZWRpYWxvZywgbXVzaSB0byBieXQgdSB2c2VjaCB0ZWNodG8gcHJlZmFidSwga3JvbWUgY2Z1SW50ZXJ2YWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMjE5XCIsIC8vUkMgMzM2MDAyMTkgOiBOZXZhbGlkbsOtIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6ICh2YWwsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWwgfHwgISF2YWw/LnR5cF9hZyB8fCB2YWw/LnR5cF9hZyA9PSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX2FnPXZhbHVlLnR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISF2Py50eXBfYWcgfHwgdj8udHlwX2FnID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWVFbGVtZW50KHsgc3RhcnQ6IHYuemtyX2FnLCBlbmQ6IHYuemtyX2FnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWVFbGVtZW50KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfSA6IHZvaWQgMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEFnZW5kb3ZlQ2lzbG8oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLmFjLFxyXG4gICAgICAgICAgICAgICAgZmllbGQ6IEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9OYW1lcy5hY1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLml4cCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIyOFwiLCAvL1JDIDMzNjAwMjI4IDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwX2RvaCA9PSAxNyB8fCB0aGlzLnR5cF9kb2ggPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnMuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvTmFtZXMuY2lzX3BpZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyMjlcIiwgLy9SQyAzMzYwMDIyOSA6IMSMLnYuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDIzMFwiLCAvL1JDIDMzNjAwMjMwIDogxIzDrXNsbyB2w71waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogKGZpbHRlcnNQZXJtcy5jaXNfcGlkKSA/IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLmNpc19waWRcclxuICAgICAgICAgICAgICAgICAgICB9KSA6IHZvaWQgMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLml4cF9wb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjMxXCIsIC8vUkMgMzM2MDAyMzEgOiBJRCB2w71waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbHVtbnMuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLmRhdF9ub3ZfenVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIzMlwiLCAvL1JDIDMzNjAwMjMyIDogRGF0dW0gdsO9cGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnBvZF9jaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMjMzXCIsIC8vUkMgMzM2MDAyMzMgOiBQb2QuIMSNw61zbG9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMjM0XCIsIC8vUkMgMzM2MDAyMzQgOiBQb2RhY8OtIMSNw61zbG9cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0b05hbWVzLnBvcl9jaXNfdmRzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIzNVwiLCAvL1JDIDMzNjAwMjM1IDogVsSbdGEgVkRTXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMyXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvTmFtZXMuc3BlX2FkcixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyMzZcIiwgLy9SQyAzMzYwMDIzNiA6IFNwZWMuIGFkcmVzw6F0YVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HVnliZXJVaHJhZHlEdG9OYW1lcy5wb3BpcyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDIzN1wiLCAvL1JDIDMzNjAwMjM3IDogUG9waXMgcMOhcm92YWPDrWhvIHDFmWVkcGlzdVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogWsOtc2vDoW7DrSwgcMWZaWTDoW7DrSBhIHVwcmF2ZW7DrSBmaWx0csWvIHBybyB2b2xhbsOtIElzbCovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXJEYXRhKHRoYXQ6IHRoaXMsIHJlcTogSXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG5leHQ6IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PiB8IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIGFueS8qSW50ZXJmYWNlLkdQb3phZGF2a3lEdG8qLz4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ2V0RmlsdGVyKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChuZXdGaWx0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVycyA9IG5ld0ZpbHRlci5maWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVycyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uZmlsdGVycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2RvaF9wOiB0aGlzLnR5cF9kb2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNrX3ZsX3A6IHRoaXMuc2tfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1X3ZsX3A6IHRoaXMuYnVfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNrX2NpX3A6IHRoaXMuc2tfY2ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1X2NpX3A6IHRoaXMuYnVfY2ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzX3A6IHRoaXMudnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNzX3A6IHRoaXMuc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNfcDogdGhpcy5jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfcDogdGhpcy5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9yc19wOiB0aGlzLml4cF9ycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3Z5cF92cmFfcDogdGhpcy5kYXRfdnlwX3ZyYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGljX3A6IHRoaXMubGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjX21lbmFfcDogdGhpcy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrX2luX3A6IHRoaXMucmFkZWtfaW5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcVtcImZpbHRlcnNcIl0gPSBmaWx0ZXJzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KHJlcSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlrDrXNrw6Fuw60gc2VydmVyIGZpbHRlcnUgeiBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRGaWx0ZXIoKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJEdG8gPSB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjb2xsZWN0XCIsIGZpbHRlckR0bylcclxuICAgICAgICAgICAgICAgIC50aGVuKChmaWx0ZXI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIudWNldF92bCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuc2tfdmwgPSBmaWx0ZXIudWNldF92bC5za192bDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmJ1X3ZsID0gZmlsdGVyLnVjZXRfdmwuYnVfdmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmaWx0ZXIudWNldF92bDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnVjZXRfY2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNrX2NpID0gZmlsdGVyLnVjZXRfY2kuc2tfY2k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5idV9jaSA9IGZpbHRlci51Y2V0X2NpLmJ1X2NpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZmlsdGVyLnVjZXRfY2k7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/DunByYXZhIHZzLCBrcywgc3MsIGtkeSBwb2t1ZCBqZSBvcGVyYWNlID0sIHRhayBuZWNoY2kgY2FzdG92YXQgbmEgaW50LCB0YWvFvmUgbXVzw61tIHVwcmF2aXQgdnN0dXBuw60gZmlsdHIgZG8gaXNsdVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIudnMgJiYgZmlsdGVyLnZzLnN0YXJ0ID09IGZpbHRlci52cy5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnZzID0gZmlsdGVyLnZzLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmtzICYmIGZpbHRlci5rcy5zdGFydCA9PSBmaWx0ZXIua3MuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5rcyA9IGZpbHRlci5rcy5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5zcyAmJiBmaWx0ZXIuc3Muc3RhcnQgPT0gZmlsdGVyLnNzLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuc3MgPSBmaWx0ZXIuc3Muc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBmaWx0ZXI6IGZpbHRlciB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTmFzdGF2w60gw7p2b2Ruw60gZ2dyaWRzZXJ2ZXIgZmlsdHJ5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVzZXRGaWx0ZXJzKCkge1xyXG4gICAgICAgICAgICBsZXQgZmlsdGVycyA9IHt9O1xyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBfZG9oID09IDEwIHx8IHRoaXMudHlwX2RvaCA9PSAxNSB8fCB0aGlzLnR5cF9kb2ggPT0gMTYpIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcnNbXCJ1Y2V0X3ZsXCJdID0geyBidV92bDogdGhpcy5idV92bCwgc2tfdmw6IHRoaXMuc2tfdmwsIHJvazogdGhpcy5yb2sgfTsgLy9yb2sga3bFr2xpIHByaW3DoXJuw61tdSBrbMOtxI1pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuYnVjX3B2c20gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyc1tcInZzXCJdID0gdGhpcy52cztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImFwcGx5XCIsIGZpbHRlcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqWsOtc2vDoW7DrSBwb3ZvbGVuw71jaC96YWvDoXphbsO9Y2ggc2VydmVyIGZpbHRlcsWvIG1hc2t5Ki9cclxuICAgICAgICBwcml2YXRlIGdldFBlcm1zRm9yR3JpZFNlcnZlckZpbHRlcnMoKSB7XHJcbiAgICAgICAgICAgIGxldCBwZXJtcyA9IHtcclxuICAgICAgICAgICAgICAgIHVjZXRfdmw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB1Y2V0X2NpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2lzX3BpZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkYXRfc3BsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGF0X3phcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHZzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAga3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1lbmE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjX21lbmE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0eXBfYWc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBuYXpldjogdHJ1ZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwX2RvaCA8IDIwKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJtcy5jaXNfcGlkID0gcGVybXMuZGF0X3phcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy9TZXQgc1RhYmxlID0gJ2J1Y2RwZXAnXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwX2RvaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tYW51w6FsLnDDoXItIGF1dC4gZG9obGVkw6Fuw60tYmFuLnbDvXBpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtcy51Y2V0X3ZsID0gcGVybXMudWNldF9jaSA9IHBlcm1zLnZzID0gcGVybXMuYyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFudcOhbC5ww6FyLSBhdXQuIGRvaGxlZMOhbsOtLWJhbi52w71waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybXMudWNldF92bCA9IHBlcm1zLnZzID0gcGVybXMuYyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFudcOhbC5ww6FyLSBhdXQuIGRvaGxlZMOhbsOtLWJhbi52w71waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybXMudWNldF92bCA9IHBlcm1zLnZzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tYW51w6FsLnDDoXItIGF1dC4gZG9obGVkw6Fuw60tYmFuLnbDvXBpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtcy51Y2V0X3ZsID0gcGVybXMuYyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFudcOhbC5ww6FyLSBhdXQuIGRvaGxlZMOhbsOtLWJhbi52w71waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybXMudnMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RydmFsZSBwb3phc3RhdmVuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgc1RhYmxlID0gJ3AnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FsbCBTYWxTZXRXaW5kb3dUZXh0KCBoV25kRm9ybSwgJ1bDvWLEm3JvdsOhIG1hc2thIHBybyBzZXpuYW0gdHJ2YWxlIHBvemFzdGF2ZW7DvWNoIHBsYXRlYicgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2t1bXBsYXItIGRvaGxlZMOhbsOtLXBvay52w71waXMgYz4wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1zLnVjZXRfdmwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9rdW1wbGFyLSBkb2hsZWTDoW7DrS1wb2sudsO9cGlzIGM8PTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybXMudWNldF92bCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cF9kb2ggPj0gMjAgJiYgdGhpcy50eXBfZG9oIDwgMjUpIHtcclxuICAgICAgICAgICAgICAgIC8vU2V0IHNUYWJsZSA9ICdidWNkcGFtJ1xyXG4gICAgICAgICAgICAgICAgcGVybXMuY2lzX3BpZCA9IHBlcm1zLnVjZXRfdmwgPSBwZXJtcy5jID0gcGVybXMuZGF0X3phcCA9IHBlcm1zLnR5cF9hZyA9IHBlcm1zLm5hemV2ID0gcGVybXMubWVuYSA9IHBlcm1zLmNfbWVuYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9DYWxsIFNhbFNldFdpbmRvd1RleHQoIGhXbmRGb3JtLCAnVsO9YsSbcm92w6EgbWFza2EgcHJvIGxpa3ZpZGFjaSBuZXNww6Fyb3ZhbsO9Y2ggcGxhdGViIGJhbmtvdm7DrWhvIHbDvXBpc3UnIClcclxuICAgICAgICAgICAgICAgIC8vU2V0IHNUYWJsZSA9ICdidWNkcG9sJ1xyXG4gICAgICAgICAgICAgICAgcGVybXMudHlwX2FnID0gcGVybXMuZGF0X3NwbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGVybXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19