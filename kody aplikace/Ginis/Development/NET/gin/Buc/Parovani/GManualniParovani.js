"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GManualniParovani.ts                   </Name>
//    <Description> Content pro manuální párování                               </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-10                                                  </Created>
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
            /** Subtasky pro manuální párování */
            let GManualniParovaniSubtaskEnum;
            (function (GManualniParovaniSubtaskEnum) {
                GManualniParovaniSubtaskEnum[GManualniParovaniSubtaskEnum["Parovani"] = 0] = "Parovani";
                GManualniParovaniSubtaskEnum[GManualniParovaniSubtaskEnum["Rozpis"] = 1] = "Rozpis";
            })(GManualniParovaniSubtaskEnum = WebClient.GManualniParovaniSubtaskEnum || (WebClient.GManualniParovaniSubtaskEnum = {}));
            /** Content pro manuální párování */
            let GManualniParovani = class GManualniParovani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.activeSubtask = GManualniParovaniSubtaskEnum.Parovani;
                }
                onContentReady() {
                    this.createActions();
                    this.createCommandBar();
                    this.createGrid();
                    this.createSubtasks();
                    //Vytvoření tabu Rozpis
                    this.createTabRozpisPredpisu();
                    this.$subTaskRozpis = this.$subTaskCnt.children().detach();
                    //Vytvoření tabu Párování
                    this.createTabParovani();
                    this.$subTaskParovani = this.$subTaskCnt.children();
                    this.$subTasks.gsubtasks("setActive", GManualniParovaniSubtaskEnum.Parovani);
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actDohledaniAutomaticke: {
                            caption: "jres:33600586", //RC 33600586 : Automatické
                            tooltip: "jres:33600587", //RC 33600587 : Automatické dohledání očekávané platby
                            permission: this.Permissions.LzeDohledaniAutomaticke,
                            run: function (ev, ctx) {
                                this.setPending(that.dohledaniAutomaticke());
                            }
                        },
                        actDohledaniManualni: {
                            caption: "jres:33600588", //RC 33600588 : Manuální
                            tooltip: "jres:33600589", //RC 33600589 : Manuální dohledání očekávané platby
                            permission: this.Permissions.LzeDohledaniManualni,
                            run: function (ev, ctx) {
                                this.setPending(that.dohledaniManualni());
                            }
                        },
                        actVratka: {
                            caption: "jres:33600590", //RC 33600590 : Vratka
                            tooltip: "jres:33600591", //RC 33600591 : Dohledání již zaplacené platby pro provedení storna - banka dodatečně vrátila platbu
                            permission: this.Permissions.LzeVratka,
                            run: function (ev, ctx) {
                                this.setPending(that.vratka());
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
                        actLikvidaceUct: {
                            caption: "jres:33600594", //RC 33600594 : Likvidace UCT
                            tooltip: "jres:33600595", //RC 33600595 : Likvidace nespárované (nedohledané) platby
                            permission: this.Permissions.LzeLikvidovatUct,
                            run: function (ev, ctx) {
                                this.setPending(that.likvidaceUct());
                            }
                        },
                        actLikvidaceFuc: {
                            caption: "jres:33600596", //RC 33600596 : Likvidace FUC
                            tooltip: "jres:33600597", //RC 33600597 : Likvidace nespárované (nedohledané) platby
                            permission: this.Permissions.LzeLikvidovatFuc,
                            run: function (ev, ctx) {
                                this.setPending(that.likvidaceFuc());
                            }
                        },
                        actParovat: {
                            caption: "jres:33600598", //RC 33600598 : Párovat
                            tooltip: "jres:33600599", //RC 33600599 : Párování dohledané platby
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.parovat());
                            }
                        },
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            tooltip: "jres:33600600", //RC 33600600 : Tisk nespárovaných položek bankovních výpisů
                            tema: "buc_ptm_nespol",
                            ixsStr: this.buc_ptm_nespol,
                            enabled: false,
                            serverParameterMethod: "Gordic.Buc.WebClient.GManualniParovani:PrintParameters",
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
                        actRozpisPridat: {
                            caption: "jres:33600601", //RC 33600601 : Přidat
                            tooltip: "jres:33600602", //RC 33600602 : Přidání předpisu pro párování
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.rozpisPridatPredpis());
                            }
                        },
                        actRozpisOdstranit: {
                            caption: "jres:33600603", //RC 33600603 : Odstranit
                            tooltip: "jres:33600604", //RC 33600604 : Vymazání vybraných položek rozpisu
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(0);
                                let gridRozpis = that.$subTaskRozpis.find(".ggrid");
                                let rows = Gordic.Eko.Grid.checkedRows(gridRozpis);
                                if ((rows ?? []).length < 1) {
                                    that.dialogs.alert("jres:33600605");
                                    this.setPending(-1);
                                } //RC 33600605 : Vyberte alespoň jeden řádek
                                for (let item of rows) {
                                    that.tabParovaniData.c_roz.plus(parseDecimal(item.c_new ?? 0));
                                    that.tabParovaniData.c_roz_mena.plus(parseDecimal(item.c_new_mena ?? 0));
                                }
                                gridRozpis.ggrid("getView").updateData(rows, "delete");
                                this.setPending(100);
                            }
                        },
                        actZavrit: {
                            caption: GDlg.mbbClose.text,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }
                    });
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actZavrit"]));
                }
                /** Vytvoření filtr panelu nad gridem*/
                createFilterPanel(element) {
                    this.$filterPanel = $.newDiv().appendTo(element).gfilterpanel({
                        forms: [new Gordic.Forms.Form()],
                        favorites: [],
                        autoLoadAfter: [],
                        filterViewMode: FilterViewMode.Simple,
                        reset: () => { this.$grid.ggridserverfilter("clear"); },
                        apply: (ev, o) => {
                            this.$grid.ggrid("mark", $());
                            this.clearDataParovani();
                        }
                    });
                }
                /** Vytvoření gridu */
                createGrid() {
                    let $tabGrid = $.newDiv()
                        .appendTo(this.element)
                        .gtab({
                        id: "tabManualniParovaniPolozky",
                        title: "jres:33600606", //RC 33600606 : Nespárované platby
                        opened: true,
                        locked: true,
                        menuBar: [{ action: this.actions.actDohledaniAutomaticke, favorite: true }, { action: this.actions.actDohledaniManualni, favorite: true },
                            { type: "separator", favorite: true }, { action: this.actions.actVratka, favorite: true }, { action: this.actions.actRozpis, favorite: true },
                            { action: this.actions.actLikvidaceUct, favorite: true }, { action: this.actions.actLikvidaceFuc, favorite: true },
                            { action: this.actions.actTisk, favorite: true }]
                    });
                    this.createFilterPanel($tabGrid);
                    this.$grid = $.newDiv().appendTo($tabGrid).ggrid({
                        name: "gridManualniParovani",
                        columns: this.createGridFormat(),
                        data: new Gordic.Isl.View(this.isl.BucManualniParovani.list({ fragments: ["*"] }).use((req, next, ctx) => {
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
                            sort: "ucet_vl,cis_pid,radek_pol,subradek",
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
                                this.actions.actDohledaniAutomaticke?.updatePermission(row.Permissions?.LzeDohledaniAutomaticke);
                                this.actions.actDohledaniManualni?.updatePermission(row.Permissions?.LzeDohledaniManualni);
                                this.actions.actVratka?.updatePermission(row.Permissions?.LzeVratka);
                                this.actions.actRozpis?.updatePermission(row.Permissions?.LzeRozpis);
                            }
                            //else if (obj.count > 1 && obj.getSelection(false, false).length > 1) {
                            //    this.actions.actDohledaniAutomaticke?.updatePermission({ value: false });
                            //    this.actions.actDohledaniManualni?.updatePermission({ value: false });
                            //    this.actions.actVratka?.updatePermission({ value: false });
                            //}
                            else {
                                this.actions.actDohledaniAutomaticke?.updatePermission(this.Permissions.LzeDohledaniAutomaticke);
                                this.actions.actDohledaniManualni?.updatePermission(this.Permissions.LzeDohledaniManualni);
                                this.actions.actVratka?.updatePermission(this.Permissions.LzeVratka);
                                this.actions.actRozpis?.updatePermission(this.Permissions.LzeRozpis);
                            }
                        },
                        rowsCheckEnabled: (row) => {
                            return !(this.vybranaPlatba && this.vybranaPlatba.ixp == row.data.ixp && this.vybranaPlatba.radek_pol == row.data.radek_pol &&
                                this.vybranaPlatba.subradek == row.data.subradek && this.vybranaPlatba.radek_av == row.data.radek_av);
                        }
                    }).ggridserverfilter({}).gautofit({ resizersOnTab: true });
                }
                /** Vytvoření gridformátu gridu*/
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat()
                        .addBankovniUcetVlastni({
                        name: "ucet_vl" /* Interface.GManualniParovaniDtoNames.ucet_vl */,
                        field: "ucet_vl" /* Interface.GManualniParovaniDtoNames.ucet_vl */,
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
                        .addNumberColumn({
                        name: "cis_pid" /* Interface.GManualniParovaniDtoNames.cis_pid */,
                        caption: "jres:33600229", //RC 33600229 : Č.v.
                        description: "jres:33600230", //RC 33600230 : Číslo výpisu
                        width: 32,
                        serverFilter: Gordic.Eko.Filters.integerInterval({
                            model: "cis_pid" /* Interface.GManualniParovaniDtoNames.cis_pid */
                        })
                    })
                        .addBankovniUcetCizi({
                        name: "ucet_ci" /* Interface.GManualniParovaniDtoNames.ucet_ci */,
                        field: "ucet_ci" /* Interface.GManualniParovaniDtoNames.ucet_ci */,
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
                        .addCurrencyColumn({
                        name: "c" /* Interface.GManualniParovaniDtoNames.c */,
                        caption: "jres:33600500", //RC 33600500 : Částka
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({
                            model: "c" /* Interface.GManualniParovaniDtoNames.c */
                        })
                    })
                        .addVs({
                        name: "vs" /* Interface.GManualniParovaniDtoNames.vs */,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "vs" /* Interface.GManualniParovaniDtoNames.vs */
                        })
                    })
                        .addKs({
                        name: "ks" /* Interface.GManualniParovaniDtoNames.ks */,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "ks" /* Interface.GManualniParovaniDtoNames.ks */
                        })
                    })
                        .addSs({
                        name: "ss" /* Interface.GManualniParovaniDtoNames.ss */,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "ss" /* Interface.GManualniParovaniDtoNames.ss */
                        })
                    })
                        .addDateColumn({
                        name: "dat_zap" /* Interface.GManualniParovaniDtoNames.dat_zap */,
                        caption: "jres:33600607", //RC 33600607 : Datum zaplacení
                        width: 110,
                        serverFilter: Gordic.Eko.Filters.dateInterval({
                            model: "dat_zap" /* Interface.GManualniParovaniDtoNames.dat_zap */
                        })
                    })
                        .addMena({
                        name: "mena_txt" /* Interface.GManualniParovaniDtoNames.mena_txt */,
                        field: "mena_txt" /* Interface.GManualniParovaniDtoNames.mena_txt */,
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
                        name: "c_mena" /* Interface.GManualniParovaniDtoNames.c_mena */,
                        caption: "jres:33600508", //RC 33600508 : Částka v měně
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({
                            model: "c_mena" /* Interface.GManualniParovaniDtoNames.c_mena */
                        })
                    })
                        .addTextColumn({
                        name: "nazev" /* Interface.GManualniParovaniDtoNames.nazev */,
                        caption: "jres:33600509", //RC 33600509 : Název
                        width: 300,
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "nazev" /* Interface.GManualniParovaniDtoNames.nazev */
                        })
                    })
                        .addTextColumn({
                        name: "pokyn" /* Interface.GManualniParovaniDtoNames.pokyn */,
                        caption: "jres:33600608", //RC 33600608 : Pokyn
                        width: 120
                    })
                        .addDateColumn({
                        name: "dat_val" /* Interface.GManualniParovaniDtoNames.dat_val */,
                        caption: "jres:33600609", //RC 33600609 : Datum valuta
                        width: 110,
                        serverFilter: Gordic.Eko.Filters.dateInterval({
                            model: "dat_val" /* Interface.GManualniParovaniDtoNames.dat_val */
                        })
                    })
                        .addTextColumn({
                        name: "vs2" /* Interface.GManualniParovaniDtoNames.vs2 */,
                        caption: "jres:33600610", //RC 33600610 : VS2
                        width: 90
                    })
                        .addTextColumn({
                        name: "ss2" /* Interface.GManualniParovaniDtoNames.ss2 */,
                        caption: "jres:33600611", //RC 33600611 : SS2
                        width: 90
                    })
                        .addTextColumn({
                        name: "ixp" /* Interface.GManualniParovaniDtoNames.ixp */,
                        caption: "jres:33600612", //RC 33600612 : Identifikátor
                        width: 120
                    })
                        .addTextColumn({
                        name: "ixp_pok" /* Interface.GManualniParovaniDtoNames.ixp_pok */,
                        caption: "jres:33600613", //RC 33600613 : Identifikátor POK
                        width: 120
                    })
                        .addDateColumn({
                        name: "dat_pol" /* Interface.GManualniParovaniDtoNames.dat_pol */,
                        caption: "jres:33600614", //RC 33600614 : Datum položky
                        width: 110
                    })
                        .addTextColumn({
                        name: "zu_txt" /* Interface.GManualniParovaniDtoNames.zu_txt */,
                        caption: "jres:33600615", //RC 33600615 : Způsob úhrady
                        width: 120
                    })
                        .addTextColumn({
                        name: "ixp_bpl" /* Interface.GManualniParovaniDtoNames.ixp_bpl */,
                        caption: "jres:33600616", //RC 33600616 : Identifikátor BPL
                        width: 120
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
                /** Vytvoření subtasků pro párování a rozpis předpisu */
                createSubtasks() {
                    const that = this;
                    let params = [{
                            action: new GAction({
                                name: "actSubParovani",
                                caption: "jres:33600617", //RC 33600617 : Párování dohledané položky
                                run: function () {
                                    this.setPending(0);
                                    if (that.activeSubtask == GManualniParovaniSubtaskEnum.Parovani) {
                                        this.setPending(100);
                                        return;
                                    }
                                    else if (that.activeSubtask == GManualniParovaniSubtaskEnum.Rozpis) {
                                        that.$subTaskRozpis = that.$subTaskCnt.children().detach();
                                    }
                                    if (that.$subTaskParovani) {
                                        //výměna obsahu
                                        that.$subTaskCnt.append(that.$subTaskParovani);
                                        that.$subTaskParovani.find(".gbuttonpanel").gbuttonpanel("refresh");
                                    }
                                    that.activeSubtask = GManualniParovaniSubtaskEnum.Parovani;
                                    this.setPending(100);
                                }
                            })
                        },
                        {
                            action: new GAction({
                                name: "actSubRozpisPredpisu",
                                caption: "jres:33600618", //RC 33600618 : Rozpis předpisů
                                run: function () {
                                    this.setPending(0);
                                    if (that.activeSubtask == GManualniParovaniSubtaskEnum.Rozpis) {
                                        this.setPending(100);
                                        return;
                                    }
                                    else if (that.activeSubtask == GManualniParovaniSubtaskEnum.Parovani) {
                                        that.$subTaskParovani = that.$subTaskCnt.children().detach();
                                    }
                                    if (that.$subTaskRozpis) {
                                        //výměna obsahu
                                        that.$subTaskCnt.append(that.$subTaskRozpis);
                                        that.$subTaskRozpis.find(".gbuttonpanel").gbuttonpanel("refresh");
                                    }
                                    that.activeSubtask = GManualniParovaniSubtaskEnum.Rozpis;
                                    this.setPending(100);
                                }
                            })
                        }];
                    this.$subTasks = $.newDiv().appendTo(this.element).gsubtasks({
                        params: params
                    });
                    this.$subTaskCnt = $.newDiv(".subtaskManualniParovani").appendTo(this.element);
                }
                /** Vytvoření tabu s Párováním dohledané položky*/
                createTabParovani() {
                    let $tabParovani = $.newDiv()
                        .appendTo(this.$subTaskCnt)
                        .gtab({
                        id: "tabManualniParovaniParovani",
                        title: "jres:33600619", //RC 33600619 : Párovaní dohledané položky
                        opened: true,
                        locked: true,
                        menuBar: [{ action: this.actions.actParovat, favorite: true }]
                    });
                    let form = new Gordic.Forms.Form({ name: "formBankovniVypis", layoutDescriptor: "L2M2S1" })
                        .addSection()
                        .addRow("jres:33600620") //RC 33600620 : Účet vlastní
                        .addField("gstringbox", {
                        name: "ucet_vl",
                        disabled: true
                    })
                        .addRow("jres:33600621") //RC 33600621 : Účet cizí
                        .addField("gstringbox", {
                        name: "ucet_ci",
                        disabled: true
                    })
                        .addRow("jres:33600622") //RC 33600622 : Měna
                        .addField("gselectbox", Gordic.Prefabs.Select.ekocmen(), {
                        name: "mena",
                        model: "mena=mena",
                        disabled: true
                    })
                        .addRow("jres:33600623") //RC 33600623 : Částka
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c",
                        disabled: true,
                        redNegative: true
                    })
                        .addRow("jres:33600624") //RC 33600624 : Částka v měně
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_mena",
                        disabled: true,
                        redNegative: true
                    })
                        .addSection()
                        .addRow("jres:33600625") //RC 33600625 : VS
                        .addField("gstringbox", {
                        name: "vs",
                        disabled: true
                    })
                        .addRow("jres:33600626") //RC 33600626 : KS
                        .addField("gstringbox", {
                        name: "ks",
                        disabled: true
                    })
                        .addRow("jres:33600627") //RC 33600627 : SS
                        .addField("gstringbox", {
                        name: "ss",
                        disabled: true
                    })
                        .addRow("jres:33600628") //RC 33600628 : Agenda
                        .addField("gselectbox", Gordic.Prefabs.Select.ginctag(), {
                        name: "typ_ag",
                        model: "typ_ag=typ_ag",
                        disabled: true
                    })
                        .addRow("jres:33600629") //RC 33600629 : Agendové číslo
                        .addField("gstringbox", {
                        name: "ac",
                        disabled: true
                    });
                    $tabParovani.gform("createFrom", form).gautofit({ resizersOnTab: false, criticalHeight: 200, minimalHeight: 200 });
                }
                /** Vytvoření tabu rozpis předpisu*/
                createTabRozpisPredpisu() {
                    let $tabRozpis = $.newDiv()
                        .appendTo(this.$subTaskCnt)
                        .gtab({
                        id: "tabManualniParovaniRozpis",
                        title: "jres:33600630", //RC 33600630 : Rozpis předpisů
                        opened: true,
                        locked: true,
                        menuBar: [{ action: this.actions.actRozpisPridat, favorite: true }, { action: this.actions.actRozpisOdstranit, favorite: true }]
                    });
                    let cnt = $.newDiv().appendTo($tabRozpis).gcontent({
                        parentContent: this,
                    }, GContent.createInitializer(["Gordic.Buc.WebClient.GRozpisPredpisu", { uid: "GRozpisPredpisu#" }], { readOnly: true }))
                        .gautofit({ resizersOnTab: false, criticalHeight: 200, minimalHeight: 200 });
                    cnt.gcontent("load");
                    this.rozpisPredpisuCnt = $.content(cnt);
                }
                /** Automatické dohledání předpisu k nespárované platbě*/
                dohledaniAutomaticke() {
                    let row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    return this.isl.BucManualniParovani.automatickyDohledat({ data: { ixp: row?.ixp, radek_pol: row?.radek_pol, subradek: row?.subradek, radek_av: row?.radek_av } }).getData().then((result) => {
                        if (result.predpis) {
                            this.clearDataParovani();
                            this.setDataToParovani(result.typ_doh ?? 0, result.poc_doh ?? 0, 0 /* Interface.GManualniParovaniTypDohledani.Automaticke */, row, result.predpis);
                        }
                        else {
                            return Buc.Dialogs.GVyberUhradyDlg({
                                parentContent: this,
                                ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                                opt: {
                                    vs: row?.vs,
                                    ss: row?.ss,
                                    sk_vl: row?.sk_vl,
                                    bu_vl: row?.bu_vl,
                                    sk_ci: row?.sk_ci,
                                    bu_ci: row?.bu_ci,
                                    c: row?.c,
                                    typ_doh: result.typ_doh,
                                    poc_doh: result.poc_doh,
                                    c_mena: row?.c_mena,
                                    mena: row?.mena,
                                    multiSelect: false
                                }
                            }).then((predpisDtoList) => {
                                if ((predpisDtoList ?? []).length < 1) {
                                    return $.Deferred().reject().promise();
                                }
                                //setne predpisDtoList[0] do formuláře
                                this.clearDataParovani();
                                this.setDataToParovani(result.typ_doh ?? 0, result.poc_doh ?? 0, 0 /* Interface.GManualniParovaniTypDohledani.Automaticke */, row, predpisDtoList[0]);
                            });
                        }
                    });
                }
                /** Manuální dohledání předpisu k nespárované platbě*/
                dohledaniManualni() {
                    let row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    let typ_doh = (row.ktg_typ == 1760) ? 10 : 12;
                    return Buc.Dialogs.GVyberUhradyDlg({
                        parentContent: this,
                        ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                        opt: {
                            vs: row?.vs,
                            ss: row?.ss,
                            sk_vl: row?.sk_vl,
                            bu_vl: row?.bu_vl,
                            sk_ci: row?.sk_ci,
                            bu_ci: row?.bu_ci,
                            c: row?.c,
                            typ_doh: typ_doh,
                            poc_doh: 0,
                            c_mena: row?.c_mena,
                            mena: row?.mena,
                            multiSelect: false
                        }
                    }).then((predpisDtoList) => {
                        if ((predpisDtoList ?? []).length < 1) {
                            return $.Deferred().reject().promise();
                        }
                        this.clearDataParovani();
                        this.setDataToParovani(typ_doh, 0, 1 /* Interface.GManualniParovaniTypDohledani.Manualni */, row, predpisDtoList[0]);
                    });
                }
                /** Vratka předpisu k nespárované platbě*/
                vratka() {
                    let row = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    return Buc.Dialogs.GVyberUhradyDlg({
                        parentContent: this,
                        ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                        opt: {
                            vs: row?.vs,
                            ss: row?.ss,
                            sk_vl: row?.sk_vl,
                            bu_vl: row?.bu_vl,
                            sk_ci: row?.sk_ci,
                            bu_ci: row?.bu_ci,
                            c: row?.c,
                            typ_doh: 17,
                            poc_doh: 0,
                            c_mena: row?.c_mena,
                            mena: row?.mena,
                            multiSelect: false
                        }
                    }).then((predpisDtoList) => {
                        if ((predpisDtoList ?? []).length < 1) {
                            return $.Deferred().reject().promise();
                        }
                        this.clearDataParovani();
                        this.setDataToParovani(17, 0, 2 /* Interface.GManualniParovaniTypDohledani.Vratka */, row, predpisDtoList[0], false);
                    });
                }
                /** Párování předpisu k nespárované platbě*/
                parovat() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid, true);
                    if (!rows) {
                        return $.Deferred().reject().promise();
                    }
                    let row = rows.find((elem, idx, arr) => {
                        return elem.ixp == this.vybranaPlatba?.ixp && elem.radek_pol == this.vybranaPlatba?.radek_pol && elem.subradek == this.vybranaPlatba?.subradek && elem.radek_av == this.vybranaPlatba?.radek_av;
                    });
                    if (!row) {
                        return $.Deferred().reject().promise();
                    }
                    let hromRows = rows.filter((elem, idx, arr) => {
                        return !(elem.ixp == this.vybranaPlatba?.ixp && elem.radek_pol == this.vybranaPlatba?.radek_pol && elem.subradek == this.vybranaPlatba?.subradek && elem.radek_av == this.vybranaPlatba?.radek_av);
                    });
                    let reqDto = {
                        platbaKeys: {
                            ixp: row.ixp,
                            radek_pol: row.radek_pol,
                            radek_av: row.radek_av,
                            subradek: row.subradek
                        },
                        typDohledani: this.tabParovaniData?.typDohledani,
                        predpisKeys: {
                            ixp: this.tabParovaniData?.ixp,
                            radek_uhr: this.tabParovaniData?.radek_uhr,
                            davka: this.tabParovaniData?.davka,
                            sk_vl: this.tabParovaniData?.sk_vl,
                            bu_vl: this.tabParovaniData?.bu_vl,
                            radek: this.tabParovaniData?.radek_uhr,
                        },
                        hromPlatbaKeys: hromRows.map((value, index, array) => {
                            return { ixp: value.ixp, radek_pol: value.radek_pol, subradek: value.subradek, radek_av: value.radek_av };
                        })
                    };
                    if (this.tabParovaniData?.typ_ag == 350 && hromRows.length == 0) {
                        //DDP - předám i primární klíče z rozpisu předpisu pro uložení
                        reqDto.rozpisKeys = this.$subTaskRozpis.find(".ggrid").ggrid("getView").getDataRows()
                            .map((val, idx, arr) => { return { ixp: val.ixp, radek_uhr: val.radek_uhr, c: val.c_new, c_mena: val.c_new_mena }; });
                    }
                    let proms = [];
                    if (this.tabParovaniData?.typDohledani == 2 /* Interface.GManualniParovaniTypDohledani.Vratka */) {
                        let hlaska = "";
                        if (!parseDecimal(row.c ?? 0).times(-1).equals(parseDecimal(this.tabParovaniData?.c ?? 0))) {
                            hlaska = "jres:33600631"; //RC 33600631 : Vrácená a spárovaná platba jsou různé! 
                        }
                        proms.push(this.dialogs.confirmDangerous(hlaska + "jres:33600632") //RC 33600632 : Opravdu chcete k dohledané spárované položce provést storno platby nespárovanou vrácenou platbou (vratkou)?
                            .createDialogPromise(GDlg.mbbYes.id));
                    }
                    if (hromRows.length > 0) {
                        let text = "";
                        if (this.tabParovaniData?.typ_ag == 350) {
                            text = "jres:33600633"; //RC 33600633 : položku předpisu DDP?
                        }
                        else if (this.tabParovaniData?.typ_ag == 180) {
                            text = "jres:33600634"; //RC 33600634 : platbu POU?
                        }
                        else {
                            return this.dialogs.error("jres:33600635").createDialogPromise(); //RC 33600635 : Hromadně lze párovat pouze na předpis DDP nebo POU!
                        }
                        proms.push(this.dialogs.confirm("jres:33600636" + text).createDialogPromise(GDlg.mbbYes.id)); //RC 33600636 : Opravdu chcete všechny označené položky bankovního výpisu napárovat na jednu dohlednou 
                    }
                    return $.when.apply(null, proms).then(() => {
                        return this.isl.BucManualniParovani.parovat(reqDto)
                            .use(this.repeatOnException((excInfo) => {
                            if (excInfo?.data?.clientMessageBoxProperty && excInfo?.data?.clientMessageBoxText) {
                                // vyžádání potvrzení od uživatele
                                excInfo.handled = true;
                                if (excInfo.data.clientMessageBoxProperty == "serverMessageNeshodaBuVl") {
                                    return this.dialogs.confirmDangerous(excInfo.data.clientMessageBoxText, 600)
                                        .createDialogPromise(GDlg.mbbYes.id)
                                        .then(() => { let returnProp = {}; returnProp[excInfo.data.clientMessageBoxProperty] = true; return returnProp; });
                                }
                                else if (excInfo.data.clientMessageBoxProperty == "serverMessageIsParJinaMena") {
                                    return this.dialogs.confirm(excInfo.data.clientMessageBoxText, 600)
                                        .createDialogPromise(GDlg.mbbYes.id)
                                        .then(() => {
                                        let returnProp = {};
                                        returnProp[excInfo.data.clientMessageBoxProperty] = true;
                                        //Dialog pro zadání částku položky v jiné měně uvedené na předpisu - dlg_DopCizMen
                                        let debKreTxt = "jres:33600637"; //RC 33600637 : kreditní
                                        let znam = parseDecimal(1);
                                        if (parseDecimal(row.c ?? 0).lessThan(0)) {
                                            debKreTxt = "jres:33600638"; //RC 33600638 : debetní
                                            znam = parseDecimal(-1);
                                        }
                                        let formCMena = parseDecimal(this.tabParovaniData?.c_mena ?? 0).abs();
                                        //384.04X04 - pokud se jedná o příjem DDP a parametr přeplatek bez rozpisu, tak předplnit částku CZK z výpisu, rozpiss to udělá, ale páruje celou částku
                                        if (this.buc_pbr == 1 && this.tabParovaniData?.typ_ag == 350 && znam.equals(1) && this.tabParovaniData.mena == 0) {
                                            formCMena = parseDecimal(row.c ?? 0).abs();
                                        }
                                        return this.dialogs.showModalWindow([Gordic.Buc.WebClient.GManualniParovaniCiziMena, {
                                                infoTxt: "jres:33600639".format(debKreTxt, row.mena_txt ?? ""), //RC 33600639 : Na Vašem účtu byl realizován {0} pohyb v měně {1}
                                                formCMena: formCMena,
                                                mena_txt: this.tabParovaniData?.mena_txt ?? "",
                                                c_pol: parseDecimal(row.c ?? 0)
                                            }]).createDialogPromise().then((dialogData) => {
                                            if (dialogData?.c_mena) {
                                                returnProp["c_mena_predpis"] = dialogData.c_mena;
                                            }
                                            else {
                                                return $.Deferred().reject().promise();
                                            }
                                            return returnProp;
                                        });
                                    });
                                }
                                else if (excInfo.data.clientMessageBoxProperty == "serverMessageSablonaVS") {
                                    let typ_pla = 1;
                                    if (parseDecimal(row.c ?? 0).lessThan(0)) {
                                        typ_pla = -1;
                                    }
                                    return Buc.Dialogs.GSablonaLikvidaceFucSeznamDlg({
                                        parentContent: this,
                                        opt: {
                                            rezim: 1,
                                            sk_vl: row.sk_vl,
                                            bu_vl: row.bu_vl,
                                            vs: row.vs,
                                            ktg_typ: 2370,
                                            priz_char: 25,
                                            typ_pla: typ_pla
                                        },
                                        ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow
                                    }).then((id_sablona) => {
                                        if (!id_sablona && id_sablona != 0) {
                                            return $.Deferred().reject().promise();
                                        }
                                        let returnProp = {};
                                        returnProp[excInfo.data.clientMessageBoxProperty] = true;
                                        returnProp["id_sablona"] = id_sablona;
                                        return returnProp;
                                    });
                                }
                                else {
                                    return this.dialogs.confirm(excInfo.data.clientMessageBoxText, 600)
                                        .createDialogPromise(GDlg.mbbYes.id)
                                        .then(() => { let returnProp = {}; returnProp[excInfo.data.clientMessageBoxProperty] = true; return returnProp; });
                                }
                            }
                            // dialog není potřeba, pokračuje se dál
                            return $.Deferred().reject(excInfo).promise();
                        }))
                            .get().then((res) => {
                            if (res) {
                                this.$filterPanel.gfilterpanel("applyFilter");
                            }
                        });
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
                /** Přidání předpisu do rozpisu předpisů v tabu*/
                rozpisPridatPredpis() {
                    let gridRozpis = this.$subTaskRozpis.find(".ggrid");
                    let radekUhrPredpisArr = gridRozpis.ggrid("getView").getDataRows().map((value, index, array) => { return value.radek_uhr; });
                    return Buc.Dialogs.GVyberUhradyDlg({
                        parentContent: this,
                        ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                        opt: {
                            ixp: this.tabParovaniData?.ixp,
                            radek_in: radekUhrPredpisArr,
                            c: this.tabParovaniData?.c,
                            typ_doh: 11,
                            poc_doh: gridRozpis.ggrid("getView").getDataRows().length,
                            c_mena: this.tabParovaniData?.c_mena,
                            mena: this.tabParovaniData?.mena,
                            multiSelect: false
                        }
                    }).then((predpisDtoList) => {
                        if ((predpisDtoList ?? []).length < 1) {
                            return $.Deferred().reject().promise();
                        }
                        //setne predpisDtoList[0] do formuláře
                        const predpis = predpisDtoList[0];
                        let rozpisGrid = this.$subTaskRozpis.find(".ggrid");
                        rozpisGrid.ggrid("getView").requestData({ filters: { ixp: predpis.ixp, radek_uhr: predpis.radek_uhr, c_roz: this.tabParovaniData?.c_roz, c_roz_mena: this.tabParovaniData?.c_roz_mena } }, { updateMode: "add" }).then(() => {
                            let newRozpisDto = rozpisGrid.ggrid("getView").findByKey(predpis.ixp, predpis.radek_uhr);
                            this.tabParovaniData.c_roz = parseDecimal(newRozpisDto?.c_roz ?? 0);
                            this.tabParovaniData.c_roz_mena = parseDecimal(newRozpisDto?.c_roz_mena ?? 0);
                        });
                    });
                }
                /** Setnutí dat do formuláře párování a rozpisu předpisů po výběru předpisu/úhrady */
                setDataToParovani(typ_doh, poc_doh, typDohledani, row, predpis, rozpisEnabled = true) {
                    this.vybranaPlatba = row;
                    this.tabParovaniData = { ...predpis, typ_doh: typ_doh, poc_doh: poc_doh, typDohledani: typDohledani, c_roz: parseDecimal(row.c ?? 0), c_roz_mena: parseDecimal(row.c_mena ?? 0) };
                    let cellInfo = this.$grid.ggrid("activeCellAddress");
                    $(cellInfo.rowDOM).find(".checkcol .gcheck").gcheck("setValue", true);
                    this.$grid.ggrid("refreshRow", cellInfo.row);
                    this.$grid.ggrid("mark", cellInfo);
                    let formData = {
                        ucet_vl: predpis.ucet_vl,
                        ucet_ci: predpis.ucet_ci,
                        vs: predpis.vs,
                        ks: predpis.ks,
                        ss: predpis.ss,
                        ac: predpis.ac,
                        uus: predpis.uus,
                        mena: predpis.mena,
                        typ_ag: predpis.typ_ag
                    };
                    if (typ_doh != 17) {
                        //vratka - storno
                        if (predpis.typ_ag != 350) {
                            //není DDP
                            formData["c"] = parseDecimal(predpis.c ?? 0).minus(parseDecimal(predpis.c_par ?? 0));
                            formData["c_mena"] = parseDecimal(predpis.c_mena ?? 0).minus(parseDecimal(predpis.c_par_mena ?? 0));
                        }
                        else {
                            formData["c"] = row?.c;
                            formData["c_mena"] = row?.c_mena;
                        }
                    }
                    else {
                        formData["c"] = predpis.c;
                        formData["c_mena"] = predpis.c_mena;
                    }
                    this.$subTaskParovani.findFields().gfield("model", "apply", formData);
                    this.actions.actParovat?.updatePermission(this.Permissions.LzeParovat);
                    if (predpis.priz_nepar != 0 && this.buc_mpppn != 0) {
                        this.$flashNeparovat = $.newDiv().gflashpanel({
                            content: "jres:33600640", //RC 33600640 : Předpis má příznak nepárovat. Přesto ho chcete párovat?
                            state: "warning"
                        });
                        this.$subTaskParovani.prepend(this.$flashNeparovat);
                    }
                    else if (predpis.priz_nepar != 0 && this.buc_mpppn == 0) {
                        this.actions.actParovat?.updatePermission({ value: false, message: "jres:33600641" }); //RC 33600641 : Nelze párovat, vybraný předpis má příznak nepárovat!
                    }
                    if (rozpisEnabled) {
                        let rozpisGrid = this.$subTaskRozpis.find(".ggrid");
                        rozpisGrid.ggrid("getView").requestData({
                            filters: {
                                ixp: predpis.ixp,
                                radek_uhr: predpis.radek_uhr,
                                c_roz: this.tabParovaniData.c_roz,
                                c_roz_mena: this.tabParovaniData.c_roz_mena
                            }
                        }, { updateMode: "add" }).then(() => {
                            let newRozpisDto = rozpisGrid.ggrid("getView").findByKey(predpis.ixp, predpis.radek_uhr);
                            this.tabParovaniData.c_roz = parseDecimal(newRozpisDto?.c_roz ?? 0);
                            this.tabParovaniData.c_roz_mena = parseDecimal(newRozpisDto?.c_roz_mena ?? 0);
                        });
                        if (predpis.typ_ag == 350) {
                            //DDP - lze pracovat s rozpisem
                            this.actions.actRozpisPridat?.enabled(true);
                            this.actions.actRozpisOdstranit?.enabled(true);
                            this.rozpisPredpisuCnt.readOnly = false;
                        }
                        else {
                            //jiné agendy - rozpis nelze měnit - pouze prohlížet
                            this.actions.actRozpisPridat?.enabled(false);
                            this.actions.actRozpisOdstranit?.enabled(false);
                            this.rozpisPredpisuCnt.readOnly = true;
                        }
                    }
                    //přejmenování tlačítka párovat pokud jde o vratku
                    if (typDohledani == 2 /* Interface.GManualniParovaniTypDohledani.Vratka */) {
                        this.actions.actParovat?.update({ caption: "jres:33600642" }); //RC 33600642 : Stornovat
                    }
                }
                /**Vyčištění dat do formuláře párování a rozpisu předpisů po výběru předpisu/úhrady */
                clearDataParovani() {
                    this.vybranaPlatba = void 0;
                    this.tabParovaniData = void 0;
                    this.$grid.find(".checkcol .gcheck").gcheck("clear");
                    this.$grid.ggrid("refresh");
                    this.$grid.ggrid("mark", $());
                    this.$subTaskParovani.findFields().gfield("clear");
                    if (this.$flashNeparovat) {
                        this.$flashNeparovat.gflashpanel("close");
                        this.$flashNeparovat = void 0;
                    }
                    let view = this.$subTaskRozpis.find(".ggrid").ggrid("getView");
                    let keys = view.getDataRows().map((value, index, arr) => { return { ixp: value.ixp, radek_uhr: value.radek_uhr }; });
                    if (keys.length > 0) {
                        view.updateData(keys, "delete");
                    }
                    this.actions.actRozpisPridat?.enabled(false);
                    this.actions.actRozpisOdstranit?.enabled(false);
                    this.actions.actParovat?.enabled(false);
                    this.actions.actParovat?.update({ caption: "jres:33600643" }); //RC 33600643 : Párovat
                    this.rozpisPredpisuCnt.readOnly = true;
                }
                /** Hromadné operace s likvidací do UCT*/
                likvidaceUct() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows) {
                        return $.Deferred().reject().promise();
                    }
                    let wizardForm = new Gordic.Forms.Form({
                        name: "formManualniParovniLikvidaceUct"
                    })
                        .addSection()
                        .addRow("jres:33600567", true) //RC 33600567 : Kniha
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosdenAll(), {
                        name: "ixp_den",
                        model: "model.ixp_den=value.ixp_den",
                        serverFilters: {
                            rok: this.rok,
                            aktivita: 100,
                            typ_ag: 40
                        },
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600568", true) //RC 33600568 : Typ dokladu
                        .addField("gselectbox", Gordic.Prefabs.Select.gincpdd(), {
                        name: "priz_dd",
                        model: "model.priz_dd=value.priz_dd",
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600569", true) //RC 33600569 : Předat k zaúčtování
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        name: "ixs_fun",
                        model: "model.ixs_fun=value.ixs_fun",
                        serverFilters: {
                            VrfuTypAg: "uct",
                            VrfuIxpDen: new Gordic.Forms.Dependency("ixp_den", (val) => {
                                return val.ixp_den;
                            }, true, false),
                            VrfuSubrada: new Gordic.Forms.Dependency("ixp_den", (val) => {
                                return val.subrada;
                            }, true, false),
                            VrfuAktivita: 100,
                            aktivita: 100,
                            DlePovolenychFazi: ["GSAUCT01", "GWAUCT05"],
                            PridruzenaStrediska: true
                        },
                        validators: [new Gordic.Validators.Required()]
                    })
                        .addRow("jres:33600570", true) //RC 33600570 : Způsob likvidace
                        .addField("gradio", {
                        name: "typ_lik",
                        initialValue: this.buc_lik,
                        radios: [
                            { value: 0, label: "jres:33600571" }, //RC 33600571 : Samostatný doklad
                            { value: 1, label: "jres:33600572" } //RC 33600572 : Společný doklad
                        ],
                        validators: [new Gordic.Validators.Required()]
                    });
                    //objekt pro uložení modelu z prvního kroku (špatně se přenáší model při krokách tam a zpět)
                    let dataModel = {};
                    let wizardChanged = false;
                    return this.navigate(Gordic.Eko.Components.ThreeStepsContent, {
                        ID: "GHromadnLikvidaceUctBuc#",
                        title: "jres:33600566", //RC 33600566 : Hromadná likvidace nespárovaných plateb do Uct
                        gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                        gridProfile: this.$grid.ggrid("getCurrentProfile"),
                        keys: this.$grid.ggrid("getView").keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                            return this.isl.BucManualniParovani.zkontrolujPredLikvidaciDoUctPredFormularem({ keys: keysArr }).get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600180", //RC 33600180 : Záznamy
                            title: "jres:33600181", //RC 33600181 : Zadání údajů
                            description: "jres:33600565", //RC 33600565 : Akce provede likvidaci vybraných (zaškrtnutých) nespárovaných plateb do Uct
                            formTabTitle: "jres:33600183", //RC 33600183 : Údaje
                            form: wizardForm,
                            modelData: {},
                            enableFormFields: true,
                            showIndicator: true,
                            //checkAction: (model, data) => {
                            //    let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av } });
                            //    return this.isl.BucManualniParovani.zkontrolujPredLikvidaciDoUctPredFormularem({ keys: keysArr }).get().then((result) => {
                            //        return Gordic.Eko.Components.Wizard.Utils.getData<any>(result);
                            //    });
                            //},
                            nextAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                                return this.isl.BucManualniParovani.zkontrolujPredLikvidaciDoUct({ keys: keysArr, paramsLikDoUct: model }).get().then((result) => {
                                    dataModel = model;
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        secondStep: {
                            gridTabTitle: "jres:33600184", //RC 33600184 : Výběr záznamů
                            title: "jres:33600185", //RC 33600185 : Kontrola a výběr dokladů
                            description: "jres:33600565", //RC 33600565 : Akce provede likvidaci vybraných (zaškrtnutých) nespárovaných plateb do Uct
                            form: wizardForm,
                            formTabTitle: "jres:33600186", //RC 33600186 : Údaje
                            enableFormFields: false,
                            modelData: () => { return dataModel; },
                            showIndicator: true,
                            checkAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                                return this.isl.BucManualniParovani.zkontrolujPredLikvidaciDoUct({ keys: keysArr, paramsLikDoUct: model }).get().then((result) => {
                                    dataModel = model;
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            nextAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                                return this.isl.BucManualniParovani.hromadneLikvidovatDoUct({ keys: keysArr, paramsLikDoUct: model }).get().then((result) => {
                                    dataModel = model;
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600187", //RC 33600187 : Výsledek
                            title: "jres:33600188", //RC 33600188 : Výsledek hromadné operace
                            form: wizardForm,
                            formTabTitle: "jres:33600189", //RC 33600189 : Údaje
                            enableFormFields: false
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
                }
                /** Hromadné operace s likvidací do FUC*/
                likvidaceFuc() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || rows.length == 0) {
                        return $.Deferred().reject().promise();
                    }
                    if (rows.length > 1 && rows.find((elem, idx, arr) => { return elem.zu == 25; })) {
                        return this.dialogs.error("jres:33600573").createDialogPromise("."); //RC 33600573 : Typ nespárované platby karta-výdaj lze provést pouze samostatně!
                    }
                    let prom = $.Deferred().resolve().promise();
                    let isZu25 = false;
                    if (rows.length == 1 && rows[0].zu == 25) {
                        //karta-výdaj - samostatně, protože se bude dohledávat šablona
                        isZu25 = true;
                        let typ_pla = 1;
                        if (parseDecimal(rows[0].c ?? 0).lessThan(0)) {
                            typ_pla = -1;
                        }
                        prom = Buc.Dialogs.GSablonaLikvidaceFucSeznamDlg({
                            parentContent: this,
                            ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                            opt: {
                                rezim: 1,
                                vs: rows[0].vs,
                                sk_vl: rows[0].sk_vl,
                                bu_vl: rows[0].bu_vl,
                                typ_pla: typ_pla,
                                priz_char: 25,
                                ktg_typ: 1788
                            }
                        });
                    }
                    //objekt pro uložení modelu z prvního kroku (špatně se přenáší model při krokách tam a zpět)
                    let dataModel = {};
                    let wizardChanged = false;
                    return prom.then((idSablona) => {
                        //idSablona - pokud není žádná nabídnuta (nalezena), tak se vrací -1 a umožní se pokračovat
                        if (isZu25 && !idSablona) {
                            return $.Deferred().reject().promise();
                        }
                        let prom2 = $.Deferred().resolve().promise();
                        if (idSablona > 0) {
                            //šablona vybrána - načtu detail
                            prom2 = this.isl.BucSablonaLikvidaceFuc.read({ data: { id_sablona: idSablona } }).getData();
                        }
                        prom2.then((sablonaDto) => {
                            let modelData = { uus_zprac: this.uus };
                            if (sablonaDto) {
                                modelData.ktg_typ = sablonaDto.ktg_typ;
                                modelData.typ_upr = sablonaDto.typ_upr_poh;
                                modelData.uus = sablonaDto.uus;
                                modelData.nks = sablonaDto.nks;
                                modelData.ico = sablonaDto.ico; //primární klíč u nks
                                modelData.ixs_fun = sablonaDto.ixs_fun;
                                modelData.ktg_upo = (parseDecimal(rows[0].c ?? 0).greaterThan(0)) ? 300 : 400;
                            }
                            else if (isZu25 && idSablona == -1) {
                                modelData.ktg_typ = 1788;
                                modelData.ktg_upo = (parseDecimal(rows[0].c ?? 0).greaterThan(0)) ? 300 : 400;
                            }
                            else {
                                modelData.ktg_typ = 1785;
                            }
                            let wizardForm = new Gordic.Forms.Form({
                                name: "formManualniParovniLikvidaceFuc"
                            })
                                .addSection()
                                .addRow("jres:33600574", true) //RC 33600574 : Kategorie typu dokladu
                                .addField("gselectbox", Gordic.Prefabs.Select.fucckat(), {
                                name: "ktg_typ",
                                model: "model.ktg_typ=value.ktg_typ",
                                serverFilters: {
                                    ktg_typ: [1785, 1786, 1788, 1789, 1900, 2370, 4000]
                                },
                                validators: [new Gordic.Validators.Required()],
                                disabled: !!sablonaDto || (isZu25 && idSablona == -1)
                            })
                                .addRow("jres:33600575", true) //RC 33600575 : Kategorie účetního pohybu
                                .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                                name: "ktg_upo",
                                model: "model.ktg_upo=value.ktg_upo",
                                serverFilters: {
                                    ktg_upo: [300, 320, 400, 420, 520]
                                },
                                validators: [new Gordic.Validators.Required()],
                                disabled: !!sablonaDto || (isZu25 && idSablona == -1)
                            })
                                .addRow("jres:33600576", true) //RC 33600576 : Typ účetního případu pohybu
                                .addField("gselectbox", Gordic.Prefabs.Select.fucstup(), {
                                name: "typ_upr",
                                model: "model.typ_upr=value.typ_upr",
                                dropdown: true,
                                serverFilters: {
                                    ktg_typ: new Gordic.Forms.Dependency("ktg_typ", (val) => {
                                        return val.ktg_typ;
                                    }, true, false),
                                    aktivita: 100
                                },
                                validators: [new Gordic.Validators.Required()],
                                disabled: !!sablonaDto
                            })
                                .addRow("jres:33600577", true) //RC 33600577 : Účtárna NS
                                .addField("gselectbox", {
                                name: "uus",
                                data: new Gordic.Data.View([this.uusGen, ...this.uusArr]),
                                dropdown: true,
                                validators: [new Gordic.Validators.Required()]
                            })
                                .addRow("jres:33600578", true) //RC 33600578 : Nákladové středisko
                                .addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), {
                                name: "nks",
                                model: "model.nks=value.nks;model.ico<=value.ico",
                                serverFilters: {
                                    vazbaUcsNaEkovnks: this.ucs,
                                    vazbaUusNaEkovnus: new Gordic.Forms.Dependency("uus", (val) => {
                                        return val;
                                    }, true, false),
                                    ico: this.ico
                                },
                                validators: [new Gordic.Validators.Required()]
                            })
                                .addRow("jres:33600579") //RC 33600579 : Účtárna zpracovatele
                                .addField("gstringbox", {
                                name: "uus_zprac",
                                disabled: true
                            })
                                .addRow("jres:33600580", true) //RC 33600580 : Zpracovatel ve FUC
                                .addField("gselectbox", Gordic.Prefabs.Select.zpracFuc(), {
                                name: "ixs_fun",
                                model: "model.ixs_fun=value.ixs_fun",
                                serverFilters: {
                                    uus: this.uus
                                },
                                validators: [new Gordic.Validators.Required()],
                                tag: (this.buc_rad_zpf == 0) ? {
                                    state: "info",
                                    text: "jres:33600581", //RC 33600581 : Nemusí být brán v potaz
                                    tooltip: "jres:33600582" //RC 33600582 : Zadaný zpracovatel nebude použit, pokud je nalezen již existující pohyb, tak se použije zpracovatel z tohoto pohybu
                                } : void 0
                            })
                                .addRow("jres:33600583") //RC 33600583 : Pokyn
                                .addField("gstringbox", {
                                name: "pokyn",
                                rows: 2
                            });
                            return this.navigate(Gordic.Eko.Components.ThreeStepsContent, {
                                ID: "GHromadnaLikvidaceFucBuc#",
                                title: "jres:33600584", //RC 33600584 : Hromadná likvidace nespárovaných plateb do Fuc
                                gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                                gridProfile: this.$grid.ggrid("getCurrentProfile"),
                                keys: this.$grid.ggrid("getView").keys,
                                data: rows,
                                indicatorType: "KPI",
                                firstStep: {
                                    gridTabTitle: "jres:33600180", //RC 33600180 : Záznamy
                                    title: "jres:33600181", //RC 33600181 : Zadání údajů
                                    description: "jres:33600585", //RC 33600585 : Akce provede likvidaci vybraných (zaškrtnutých) nespárovaných plateb do Fuc
                                    formTabTitle: "jres:33600183", //RC 33600183 : Údaje
                                    form: wizardForm,
                                    modelData: modelData,
                                    enableFormFields: true,
                                    showIndicator: true,
                                    nextAction: (model, data) => {
                                        let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                                        return this.isl.BucManualniParovani.zkontrolujPredLikvidaciDoFuc({ keys: keysArr, paramsLikDoFuc: { ...model, id_sablona: idSablona } }).get().then((result) => {
                                            dataModel = model;
                                            return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                        });
                                    }
                                },
                                secondStep: {
                                    gridTabTitle: "jres:33600184", //RC 33600184 : Výběr záznamů
                                    title: "jres:33600185", //RC 33600185 : Kontrola a výběr dokladů
                                    description: "jres:33600585", //RC 33600585 : Akce provede likvidaci vybraných (zaškrtnutých) nespárovaných plateb do Fuc
                                    form: wizardForm,
                                    formTabTitle: "jres:33600186", //RC 33600186 : Údaje
                                    enableFormFields: false,
                                    modelData: () => { return dataModel; },
                                    showIndicator: true,
                                    checkAction: (model, data) => {
                                        let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                                        return this.isl.BucManualniParovani.zkontrolujPredLikvidaciDoFuc({ keys: keysArr, paramsLikDoFuc: { ...model, id_sablona: idSablona } }).get().then((result) => {
                                            dataModel = model;
                                            return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                        });
                                    },
                                    nextAction: (model, data) => {
                                        let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, subradek: val.subradek, radek_av: val.radek_av }; });
                                        return this.isl.BucManualniParovani.hromadneLikvidovatDoFuc({ keys: keysArr, paramsLikDoFuc: { ...model, id_sablona: idSablona } }).get().then((result) => {
                                            dataModel = model;
                                            return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                        });
                                    }
                                },
                                lastStep: {
                                    gridTabTitle: "jres:33600187", //RC 33600187 : Výsledek
                                    title: "jres:33600188", //RC 33600188 : Výsledek hromadné operace
                                    form: wizardForm,
                                    formTabTitle: "jres:33600189", //RC 33600189 : Údaje
                                    enableFormFields: false
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
                        });
                    });
                }
                /**
                 * Zopakování volání ISL metody při chybě, pokud má být speciálně ošetřena
                 *
                 * @param {any} conditionalRequestModification
                 * @returns {any}
                 */
                repeatOnException(conditionalRequestModification) {
                    let recursiveCall = function (request, next, ctx) {
                        return next(request).catch((excInfo) => conditionalRequestModification(excInfo).then((changereq) => (changereq ? recursiveCall($.deepExtendWoArray({}, request, changereq), next, ctx) : $.Deferred().reject(excInfo)), () => $.Deferred().reject(excInfo).promise()));
                    };
                    return recursiveCall;
                }
            };
            GManualniParovani = __decorate([
                Decorators.gcontent
            ], GManualniParovani);
            WebClient.GManualniParovani = GManualniParovani;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR01hbnVhbG5pUGFyb3ZhbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTWFudWFsbmlQYXJvdmFuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQWc5Q2Y7QUFoOUNELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWc5Q25CO0lBaDlDZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBZzlDN0I7UUFoOUNvQixXQUFBLFNBQVM7WUFDMUIscUNBQXFDO1lBQ3JDLElBQVksNEJBR1g7WUFIRCxXQUFZLDRCQUE0QjtnQkFDcEMsdUZBQVEsQ0FBQTtnQkFDUixtRkFBTSxDQUFBO1lBQ1YsQ0FBQyxFQUhXLDRCQUE0QixHQUE1QixzQ0FBNEIsS0FBNUIsc0NBQTRCLFFBR3ZDO1lBRUQsb0NBQW9DO1lBRXBDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsT0FBQSxZQUFZO2dCQUFuRDs7b0JBbUNZLGtCQUFhLEdBQWlDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQztnQkFtNkNoRyxDQUFDO2dCQTk1Q0csY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdEIsdUJBQXVCO29CQUN2QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUMzRCx5QkFBeUI7b0JBQ3pCLElBQUksQ0FBQyxpQkFB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QUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ25DLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDeEMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUUsQ0FBUyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQzFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FDcEQsQ0FBQztvQkFDTixDQUFDLENBQUE7b0JBQ0QsT0FBTyxhQUFhLENBQUM7Z0JBQ3pCLENBQUM7YUFDSixDQUFBO1lBdDhDWSxpQkFBaUI7Z0JBRDdCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsaUJBQWlCLENBczhDN0I7WUF0OENZLDJCQUFpQixvQkFzOEM3QixDQUFBO1FBQ0wsQ0FBQyxFQWg5Q29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWc5QzdCO0lBQUQsQ0FBQyxFQWg5Q2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWc5Q25CO0FBQUQsQ0FBQyxFQWg5Q1MsTUFBTSxLQUFOLE1BQU0sUUFnOUNmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdNYW51YWxuaVBhcm92YW5pLnRzICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBDb250ZW50IHBybyBtYW51w6FsbsOtIHDDoXJvdsOhbsOtICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMTAtMTAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqIFN1YnRhc2t5IHBybyBtYW51w6FsbsOtIHDDoXJvdsOhbsOtICovXHJcbiAgICBleHBvcnQgZW51bSBHTWFudWFsbmlQYXJvdmFuaVN1YnRhc2tFbnVtIHtcclxuICAgICAgICBQYXJvdmFuaSxcclxuICAgICAgICBSb3pwaXNcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ29udGVudCBwcm8gbWFudcOhbG7DrSBww6Fyb3bDoW7DrSAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTWFudWFsbmlQYXJvdmFuaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIFNlcnZpY2UgUGVybWlzc2lvbnMgKi9cclxuICAgICAgICBwcml2YXRlIFBlcm1pc3Npb25zOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlTZXJ2aWNlUGVybWlzc2lvbnM7XHJcbiAgICAgICAgLyoqIERhdGFiw6F6b3bDvSBwYXJhbWV0ciBwcm8gdGlzayAtIEJVQyAtIFRUIE5lc3DDoXJvdmFuw6kgcG9sb8W+a3kgYmFua292bsOtY2ggdsO9cGlzxa8gKi9cclxuICAgICAgICBwcml2YXRlIGJ1Y19wdG1fbmVzcG9sOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIERhdGFiw6F6b3bDvSBwYXJhbWV0ciAtIEJVQyAtIE1hbi5ww6Fyb3bDoW7DrSBuYSBwxZllZHBpcyBzIHDFmcOtem5ha2VtIG5lcMOhcm92YXQgKi9cclxuICAgICAgICBwcml2YXRlIGJ1Y19tcHBwbjogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBEYXRhYsOhem92w70gcGFyYW1ldHIgLSBCVUMgLSBQw6Fyb3bDoW7DrSBwxZllcGxhdGt1IGJleiByb3pwaXN1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBidWNfcGJyOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIERhdGFiw6F6b3bDvSBwYXJhbWV0ciAtIEJVQyAtIFpwxa9zb2IgbGlrdmlkYWNlIG5lc3DDoXIucGxhdGViIGRvIFVDVCAqL1xyXG4gICAgICAgIHByaXZhdGUgYnVjX2xpazogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBEYXRhYsOhem92w70gcGFyYW1ldHIgLSBCVUMgLSDFmFAgUmXFvmltIHpha2zDoWTDoW7DrSBwb2xvxb5layB2w71waXPFryBkbyBGVUMgKi9cclxuICAgICAgICBwcml2YXRlIGJ1Y19yYWRfenBmOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFDFmcOtem5hayB6IGdsb2JhbHMgcHJvIHpvYnJhemVuw60gVVVTKi9cclxuICAgICAgICBwcml2YXRlIHJwcFV1czogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBBa3R1w6FsbsOtIHJvayovXHJcbiAgICAgICAgcHJpdmF0ZSByb2s6IG51bWJlcjtcclxuICAgICAgICAvKiogQWt0dcOhbG7DrSB1Y3MqL1xyXG4gICAgICAgIHByaXZhdGUgdWNzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEFrdHXDoWxuw60gdXVzKi9cclxuICAgICAgICBwcml2YXRlIHV1czogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBBa3R1w6FsbsOtIGljbyovXHJcbiAgICAgICAgcHJpdmF0ZSBpY286IHN0cmluZztcclxuICAgICAgICAvKiogw5rEjXTDoXJueSAoQnVjR2xvYmFscykqL1xyXG4gICAgICAgIHByaXZhdGUgdXVzQXJyOiBzdHJpbmdbXTtcclxuICAgICAgICAvKiogw5rEjXTDoXJuYSAoQnVjR2xvYmFscykqL1xyXG4gICAgICAgIHByaXZhdGUgdXVzR2VuOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSAkc3ViVGFza3M6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSAkc3ViVGFza0NudDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlICRzdWJUYXNrUGFyb3Zhbmk6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSAkc3ViVGFza1JvenBpczogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlICRmbGFzaE5lcGFyb3ZhdD86IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSBhY3RpdmVTdWJ0YXNrOiBHTWFudWFsbmlQYXJvdmFuaVN1YnRhc2tFbnVtID0gR01hbnVhbG5pUGFyb3ZhbmlTdWJ0YXNrRW51bS5QYXJvdmFuaTtcclxuICAgICAgICBwcml2YXRlIHZ5YnJhbmFQbGF0YmE/OiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG87XHJcbiAgICAgICAgcHJpdmF0ZSB0YWJQYXJvdmFuaURhdGE/OiBJbnRlcmZhY2UuR1Z5YmVyVWhyYWR5RHRvICYgeyB0eXBfZG9oOiBudW1iZXIsIHBvY19kb2g6IG51bWJlciwgdHlwRG9obGVkYW5pOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlUeXBEb2hsZWRhbmksIGNfcm96OiBEZWNpbWFsLCBjX3Jvel9tZW5hOiBEZWNpbWFsIH07XHJcbiAgICAgICAgcHJpdmF0ZSByb3pwaXNQcmVkcGlzdUNudDogR1JvenBpc1ByZWRwaXN1O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29tbWFuZEJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdWJ0YXNrcygpO1xyXG4gICAgICAgICAgICAvL1Z5dHZvxZllbsOtIHRhYnUgUm96cGlzXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGFiUm96cGlzUHJlZHBpc3UoKTtcclxuICAgICAgICAgICAgdGhpcy4kc3ViVGFza1JvenBpcyA9IHRoaXMuJHN1YlRhc2tDbnQuY2hpbGRyZW4oKS5kZXRhY2goKTtcclxuICAgICAgICAgICAgLy9WeXR2b8WZZW7DrSB0YWJ1IFDDoXJvdsOhbsOtXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGFiUGFyb3ZhbmkoKTtcclxuICAgICAgICAgICAgdGhpcy4kc3ViVGFza1Bhcm92YW5pID0gdGhpcy4kc3ViVGFza0NudC5jaGlsZHJlbigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kc3ViVGFza3MuZ3N1YnRhc2tzKFwic2V0QWN0aXZlXCIsIEdNYW51YWxuaVBhcm92YW5pU3VidGFza0VudW0uUGFyb3ZhbmkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3REb2hsZWRhbmlBdXRvbWF0aWNrZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDU4NlwiLCAvL1JDIDMzNjAwNTg2IDogQXV0b21hdGlja8OpXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNjAwNTg3XCIsIC8vUkMgMzM2MDA1ODcgOiBBdXRvbWF0aWNrw6kgZG9obGVkw6Fuw60gb8SNZWvDoXZhbsOpIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuUGVybWlzc2lvbnMuTHplRG9obGVkYW5pQXV0b21hdGlja2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5kb2hsZWRhbmlBdXRvbWF0aWNrZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RG9obGVkYW5pTWFudWFsbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1ODhcIiwgLy9SQyAzMzYwMDU4OCA6IE1hbnXDoWxuw61cclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA1ODlcIiwgLy9SQyAzMzYwMDU4OSA6IE1hbnXDoWxuw60gZG9obGVkw6Fuw60gb8SNZWvDoXZhbsOpIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuUGVybWlzc2lvbnMuTHplRG9obGVkYW5pTWFudWFsbmksXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5kb2hsZWRhbmlNYW51YWxuaSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VnJhdGthOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTkwXCIsIC8vUkMgMzM2MDA1OTAgOiBWcmF0a2FcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA1OTFcIiwgLy9SQyAzMzYwMDU5MSA6IERvaGxlZMOhbsOtIGppxb4gemFwbGFjZW7DqSBwbGF0YnkgcHJvIHByb3ZlZGVuw60gc3Rvcm5hIC0gYmFua2EgZG9kYXRlxI1uxJsgdnLDoXRpbGEgcGxhdGJ1XHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5QZXJtaXNzaW9ucy5MemVWcmF0a2EsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC52cmF0a2EoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFJvenBpczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDU5MlwiLCAvL1JDIDMzNjAwNTkyIDogUm96cGlzXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNjAwNTkzXCIsIC8vUkMgMzM2MDA1OTMgOiBSb3plcHPDoW7DrSBwb2xvxb5reSBiYW5rb3Zuw61obyB2w71waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5QZXJtaXNzaW9ucy5MemVSb3pwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5yb3pwaXMoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdExpa3ZpZGFjZVVjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDU5NFwiLCAvL1JDIDMzNjAwNTk0IDogTGlrdmlkYWNlIFVDVFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDU5NVwiLCAvL1JDIDMzNjAwNTk1IDogTGlrdmlkYWNlIG5lc3DDoXJvdmFuw6kgKG5lZG9obGVkYW7DqSkgcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5QZXJtaXNzaW9ucy5MemVMaWt2aWRvdmF0VWN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQubGlrdmlkYWNlVWN0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RMaWt2aWRhY2VGdWM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1OTZcIiwgLy9SQyAzMzYwMDU5NiA6IExpa3ZpZGFjZSBGVUNcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA1OTdcIiwgLy9SQyAzMzYwMDU5NyA6IExpa3ZpZGFjZSBuZXNww6Fyb3ZhbsOpIChuZWRvaGxlZGFuw6kpIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuUGVybWlzc2lvbnMuTHplTGlrdmlkb3ZhdEZ1YyxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0Lmxpa3ZpZGFjZUZ1YygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UGFyb3ZhdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDU5OFwiLCAvL1JDIDMzNjAwNTk4IDogUMOhcm92YXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA1OTlcIiwgLy9SQyAzMzYwMDU5OSA6IFDDoXJvdsOhbsOtIGRvaGxlZGFuw6kgcGxhdGJ5XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5wYXJvdmF0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA2MDBcIiwgLy9SQyAzMzYwMDYwMCA6IFRpc2sgbmVzcMOhcm92YW7DvWNoIHBvbG/FvmVrIGJhbmtvdm7DrWNoIHbDvXBpc8WvXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJidWNfcHRtX25lc3BvbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4c1N0cjogdGhpcy5idWNfcHRtX25lc3BvbCxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkJ1Yy5XZWJDbGllbnQuR01hbnVhbG5pUGFyb3Zhbmk6UHJpbnRQYXJhbWV0ZXJzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEdvcmRpYy5VdGlscy5XaWRnZXRFeGlzdHMoXCJnZmlsdGVycGFuZWxcIiwgdGhhdC4kZmlsdGVyUGFuZWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1w6FsbsOtIGZpbHRyeSBwcm8gcMWZZWTDoW7DrSBkbyBDIyBtZXRvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJQYW5lbERhdGEgPSB0aGF0LiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ2V0RmlsdGVyKGZpbHRlclBhbmVsRGF0YSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXNrYVRleHQ6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJ0cnVlQ29sdW1uc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJLZXlzID0gT2JqZWN0LmtleXMoZGF0YS5maWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiBvZiBjb2x1bW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJLZXkgPSBmaWx0ZXJLZXlzLmZpbmQoKGVsLCBpZHgsIGFycikgPT4geyByZXR1cm4gZWwgPT0gY29sdW1uLm5hbWU7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4ubmFtZSA9PSBcInVjZXRfdmxcIiAmJiAoZGF0YS5maWx0ZXIuc2tfdmwgfHwgZGF0YS5maWx0ZXIuYnVfdmwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrYVRleHQucHVzaChjb2x1bW4uY2FwdGlvbiArIFwiOiBcIiArIGRhdGEuZmlsdGVyLmJ1X3ZsICsgXCIvXCIgKyBkYXRhLmZpbHRlci5za192bCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sdW1uLm5hbWUgPT0gXCJ1Y2V0X2NpXCIgJiYgKGRhdGEuZmlsdGVyLnNrX2NpIHx8IGRhdGEuZmlsdGVyLmJ1X2NpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza2FUZXh0LnB1c2goY29sdW1uLmNhcHRpb24gKyBcIjogXCIgKyBkYXRhLmZpbHRlci5idV9jaSArIFwiL1wiICsgZGF0YS5maWx0ZXIuc2tfY2kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbi5uYW1lID09IFwibWVuYV90eHRcIiAmJiAoZGF0YS5maWx0ZXIubWVuYSB8fCBkYXRhLmZpbHRlci5tZW5hID09IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrYVRleHQucHVzaChjb2x1bW4uY2FwdGlvbiArIFwiOiBcIiArIGRhdGEuZmlsdGVyLm1lbmEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlcktleSAmJiBkYXRhLmZpbHRlcltmaWx0ZXJLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hxaFsbyBzZSBpIHMgZmlsdHJlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc1N0YXJ0VmFsdWU6IGJvb2xlYW4gPSAoZGF0YS5maWx0ZXJbZmlsdGVyS2V5XS5zdGFydCB8fCBkYXRhLmZpbHRlcltmaWx0ZXJLZXldLnN0YXJ0ID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc0VuZFZhbHVlOiBib29sZWFuID0gKGRhdGEuZmlsdGVyW2ZpbHRlcktleV0uZW5kIHx8IGRhdGEuZmlsdGVyW2ZpbHRlcktleV0uZW5kID09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1N0YXJ0VmFsdWUgJiYgaGFzRW5kVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrYVRleHQucHVzaChjb2x1bW4uY2FwdGlvbiArIFwiOiBcIiArIGRhdGEuZmlsdGVyW2ZpbHRlcktleV0uc3RhcnQgKyBcIiAtIFwiICsgZGF0YS5maWx0ZXJbZmlsdGVyS2V5XS5lbmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0VmFsdWUgJiYgIWhhc0VuZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza2FUZXh0LnB1c2goY29sdW1uLmNhcHRpb24gKyBcIjogPj0gXCIgKyBkYXRhLmZpbHRlcltmaWx0ZXJLZXldLnN0YXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaGFzU3RhcnRWYWx1ZSAmJiBoYXNFbmRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2thVGV4dC5wdXNoKGNvbHVtbi5jYXB0aW9uICsgXCI6IDw9IFwiICsgZGF0YS5maWx0ZXJbZmlsdGVyS2V5XS5lbmQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBmaWx0ZXJzOiBkYXRhLmZpbHRlciwgbWFza2FUZXh0OiBtYXNrYVRleHQuam9pbihcIiwgXCIpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RSb3pwaXNQcmlkYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA2MDFcIiwgLy9SQyAzMzYwMDYwMSA6IFDFmWlkYXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA2MDJcIiwgLy9SQyAzMzYwMDYwMiA6IFDFmWlkw6Fuw60gcMWZZWRwaXN1IHBybyBww6Fyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQucm96cGlzUHJpZGF0UHJlZHBpcygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Um96cGlzT2RzdHJhbml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjAzXCIsIC8vUkMgMzM2MDA2MDMgOiBPZHN0cmFuaXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDA2MDRcIiwgLy9SQyAzMzYwMDYwNCA6IFZ5bWF6w6Fuw60gdnlicmFuw71jaCBwb2xvxb5layByb3pwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkUm96cGlzID0gdGhhdC4kc3ViVGFza1JvenBpcy5maW5kKFwiLmdncmlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93cyA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxJbnRlcmZhY2UuR1JvenBpc1ByZWRwaXN1RHRvPihncmlkUm96cGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyb3dzID8/IFtdKS5sZW5ndGggPCAxKSB7IHRoYXQuZGlhbG9ncy5hbGVydChcImpyZXM6MzM2MDA2MDVcIik7IHRoaXMuc2V0UGVuZGluZygtMSk7IH0gLy9SQyAzMzYwMDYwNSA6IFZ5YmVydGUgYWxlc3BvxYggamVkZW4gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHJvd3MhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRhYlBhcm92YW5pRGF0YSEuY19yb3oucGx1cyhwYXJzZURlY2ltYWwoaXRlbS5jX25ldyA/PyAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRhYlBhcm92YW5pRGF0YSEuY19yb3pfbWVuYS5wbHVzKHBhcnNlRGVjaW1hbChpdGVtLmNfbmV3X21lbmEgPz8gMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRSb3pwaXMuZ2dyaWQoXCJnZXRWaWV3XCIpLnVwZGF0ZURhdGEocm93cywgXCJkZWxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZygxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHRGxnLm1iYkNsb3NlLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBjb21tYW5kYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0WmF2cml0XCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZmlsdHIgcGFuZWx1IG5hZCBncmlkZW0qL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWwoZWxlbWVudDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQubmV3RGl2KCkuYXBwZW5kVG8oZWxlbWVudCkuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGZvcm1zOiBbbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKCldLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBbXSxcclxuICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXI6IFtdLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgIHJlc2V0OiAoKSA9PiB7IHRoaXMuJGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKTsgfSxcclxuICAgICAgICAgICAgICAgIGFwcGx5OiAoZXYsIG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwibWFya1wiLCAkKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhUGFyb3ZhbmkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIGxldCAkdGFiR3JpZCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGFiTWFudWFsbmlQYXJvdmFuaVBvbG96a3lcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwNjA2XCIsIC8vUkMgMzM2MDA2MDYgOiBOZXNww6Fyb3ZhbsOpIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW3sgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RG9obGVkYW5pQXV0b21hdGlja2UsIGZhdm9yaXRlOiB0cnVlIH0sIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RG9obGVkYW5pTWFudWFsbmksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiwgZmF2b3JpdGU6IHRydWUgfSwgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RWcmF0a2EsIGZhdm9yaXRlOiB0cnVlIH0sIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Um96cGlzLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdExpa3ZpZGFjZVVjdCwgZmF2b3JpdGU6IHRydWUgfSwgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RMaWt2aWRhY2VGdWMsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VGlzaywgZmF2b3JpdGU6IHRydWUgfV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZpbHRlclBhbmVsKCR0YWJHcmlkKTtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8oJHRhYkdyaWQpLmdncmlkPEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkTWFudWFsbmlQYXJvdmFuaVwiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc2wuQnVjTWFudWFsbmlQYXJvdmFuaS5saXN0KHsgZnJhZ21lbnRzOiBbXCIqXCJdIH0pLnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsdGVyRGF0YSh0aGlzLCByZXEsIG5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJpeHBcIiwgXCJyYWRla19wb2xcIiwgXCJzdWJyYWRla1wiLCBcInJhZGVrX2F2XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhpcy4kZmlsdGVyUGFuZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RW1wdHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVzcG9uc2U6IChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChyZXNwb25zZT8uZGF0YT8ubGVuZ3RoID8/IDApID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VGlzaz8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwidWNldF92bCxjaXNfcGlkLHJhZGVrX3BvbCxzdWJyYWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQGMgPCAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNDk0XCIsIC8vUkMgMzM2MDA0OTQgOiDEjMOhc3RrYSBtZW7FocOtIG5lxb4gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBseVRvOiBcImMsY19tZW5hXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9rb250cm9sYSBuYSBub3Jtw6FsbsOtIMWZw6FkZWsgYSBuYXN0YXZlbsOtIHBlcm1pc3Npb25cclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmNvdW50ID49IDEgJiYgb2JqLmdldFNlbGVjdGlvbihmYWxzZSwgZmFsc2UpLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBvYmouZ2V0U2VsZWN0aW9uKClbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REb2hsZWRhbmlBdXRvbWF0aWNrZT8udXBkYXRlUGVybWlzc2lvbihyb3cuUGVybWlzc2lvbnM/Lkx6ZURvaGxlZGFuaUF1dG9tYXRpY2tlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERvaGxlZGFuaU1hbnVhbG5pPy51cGRhdGVQZXJtaXNzaW9uKHJvdy5QZXJtaXNzaW9ucz8uTHplRG9obGVkYW5pTWFudWFsbmkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VnJhdGthPy51cGRhdGVQZXJtaXNzaW9uKHJvdy5QZXJtaXNzaW9ucz8uTHplVnJhdGthKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFJvenBpcz8udXBkYXRlUGVybWlzc2lvbihyb3cuUGVybWlzc2lvbnM/Lkx6ZVJvenBpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZWxzZSBpZiAob2JqLmNvdW50ID4gMSAmJiBvYmouZ2V0U2VsZWN0aW9uKGZhbHNlLCBmYWxzZSkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoaXMuYWN0aW9ucy5hY3REb2hsZWRhbmlBdXRvbWF0aWNrZT8udXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGlzLmFjdGlvbnMuYWN0RG9obGVkYW5pTWFudWFsbmk/LnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmFjdFZyYXRrYT8udXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERvaGxlZGFuaUF1dG9tYXRpY2tlPy51cGRhdGVQZXJtaXNzaW9uKHRoaXMuUGVybWlzc2lvbnMuTHplRG9obGVkYW5pQXV0b21hdGlja2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RG9obGVkYW5pTWFudWFsbmk/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5QZXJtaXNzaW9ucy5MemVEb2hsZWRhbmlNYW51YWxuaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RWcmF0a2E/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5QZXJtaXNzaW9ucy5MemVWcmF0a2EpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Um96cGlzPy51cGRhdGVQZXJtaXNzaW9uKHRoaXMuUGVybWlzc2lvbnMuTHplUm96cGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcm93c0NoZWNrRW5hYmxlZDogKHJvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhKHRoaXMudnlicmFuYVBsYXRiYSAmJiB0aGlzLnZ5YnJhbmFQbGF0YmEuaXhwID09IHJvdy5kYXRhLml4cCAmJiB0aGlzLnZ5YnJhbmFQbGF0YmEucmFkZWtfcG9sID09IHJvdy5kYXRhLnJhZGVrX3BvbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZ5YnJhbmFQbGF0YmEuc3VicmFkZWsgPT0gcm93LmRhdGEuc3VicmFkZWsgJiYgdGhpcy52eWJyYW5hUGxhdGJhLnJhZGVrX2F2ID09IHJvdy5kYXRhLnJhZGVrX2F2KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZ2dyaWRzZXJ2ZXJmaWx0ZXIoe30pLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBncmlkZm9ybcOhdHUgZ3JpZHUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgbGV0IGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRCYW5rb3ZuaVVjZXRWbGFzdG5pKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy51Y2V0X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy51Y2V0X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyh7IG5hbWU6IFwidWNldF92bFwiIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMzNjAwNDk5XCIpIC8vUkMgMzM2MDA0OTkgOiBCYW5rb3Zuw60gw7rEjWV0IHZsYXN0bsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3V2bCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNldF92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5za192bD12YWx1ZS5za192bDttb2RlbC5idV92bD12YWx1ZS5idV92bDttb2RlbC5yb2s9dmFsdWUucm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXN0dXBLQlU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cm92ZW5QcmlzdHVwdUtCVTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlemltVnliZXJ1RGxlS25paHk6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhdj8ucm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh2LmJ1X3ZsID8/IFwiXCIpLnRyaW0oKSArIFwiL1wiICsgKHYuc2tfdmwgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiAobykgPT4geyByZXR1cm4gbzsgfSwgLy9OT1RFOiBCZXogdG9obyBuZWZ1bmd1amUgdnlwbG5lbmkgaG9kbm90eSBhIGtsaWsgbWltbyBpbmxpbmVkaWFsb2csIG11c2kgdG8gYnl0IHUgdnNlY2ggdGVjaHRvIHByZWZhYnUsIGtyb21lIGNmdUludGVydmFsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMjE5XCIsIC8vUkMgMzM2MDAyMTkgOiBOZXZhbGlkbsOtIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXZhbCB8fCAhIXZhbD8ucm9rO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnVjZXRfdmw9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISF2Py5yb2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVjZXRfdmwgPSAodi5idV92bCA/PyBcIlwiKS50cmltKCkgKyBcIi9cIiArICh2LnNrX3ZsID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRJbnRlcnZhbFZhbHVlRWxlbWVudCh7IHN0YXJ0OiB1Y2V0X3ZsLCBlbmQ6IHVjZXRfdmwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRJbnRlcnZhbFZhbHVlRWxlbWVudChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMuY2lzX3BpZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAyMjlcIiwgLy9SQyAzMzYwMDIyOSA6IMSMLnYuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDIzMFwiLCAvL1JDIDMzNjAwMjMwIDogxIzDrXNsbyB2w71waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5jaXNfcGlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQmFua292bmlVY2V0Q2l6aSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMudWNldF9jaSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMudWNldF9jaSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdmb3JtYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6ICQuZXh0ZW5kKEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5nZXRGb3JtQm94RmlsdGVyRGVmYXVsdHMoeyBuYW1lOiBcInVjZXRfY2lcIiB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzYwMDUwMlwiKSAvL1JDIDMzNjAwNTAyIDogQmFua292bsOtIMO6xI1ldCBjaXrDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1Y2koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjZXRfY2lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc2tfY2k9dmFsdWUuc2tfY2k7bW9kZWwuYnVfY2k9dmFsdWUuYnVfY2k7bW9kZWwuaXhzX2VzdT12YWx1ZS5peHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhZGF0YT8uaXhzX2VzdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZGF0YS5idV9jaSA/PyBcIlwiKS50cmltKCkgKyBcIi9cIiArIChkYXRhLnNrX2NpID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJiYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcmlmeTogKG8pID0+IHsgcmV0dXJuIG87IH0sIC8vTk9URTogQmV6IHRvaG8gbmVmdW5ndWplIHZ5cGxuZW5pIGhvZG5vdHkgYSBrbGlrIG1pbW8gaW5saW5lZGlhbG9nLCBtdXNpIHRvIGJ5dCB1IHZzZWNoIHRlY2h0byBwcmVmYWJ1LCBrcm9tZSBjZnVJbnRlcnZhbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDIxOVwiLCAvL1JDIDMzNjAwMjE5IDogTmV2YWxpZG7DrSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF2YWwgfHwgISF2YWw/Lml4c19lc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnVjZXRfY2k9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISF2Py5peHNfZXN1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1Y2V0X2NpID0gKHYuYnVfY2kgPz8gXCJcIikudHJpbSgpICsgXCIvXCIgKyAodi5za19jaSA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZUVsZW1lbnQoeyBzdGFydDogdWNldF9jaSwgZW5kOiB1Y2V0X2NpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZUVsZW1lbnQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1MDBcIiwgLy9SQyAzMzYwMDUwMCA6IMSMw6FzdGthXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMuY1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFZzKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy52cyxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy52c1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEtzKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5rcyxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5rc1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNzKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5zcyxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5zc1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0b05hbWVzLmRhdF96YXAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjA3XCIsIC8vUkMgMzM2MDA2MDcgOiBEYXR1bSB6YXBsYWNlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kYXRlSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMuZGF0X3phcFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE1lbmEoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0b05hbWVzLm1lbmFfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5tZW5hX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdmb3JtYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6ICQuZXh0ZW5kKEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5nZXRGb3JtQm94RmlsdGVyRGVmYXVsdHMoeyBuYW1lOiBcIm1lbmFcIiB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMzYwMDUwN1wiKSAvL1JDIDMzNjAwNTA3IDogTcSbbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jbWVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y2V0X3ZsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLm1lbmE9dmFsdWUubWVuYTttb2RlbC5tZW5hX3Npc19hYWE9dmFsdWUubWVuYV9zaXNfYWFhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiAobykgPT4geyByZXR1cm4gbzsgfSwgLy9OT1RFOiBCZXogdG9obyBuZWZ1bmd1amUgdnlwbG5lbmkgaG9kbm90eSBhIGtsaWsgbWltbyBpbmxpbmVkaWFsb2csIG11c2kgdG8gYnl0IHUgdnNlY2ggdGVjaHRvIHByZWZhYnUsIGtyb21lIGNmdUludGVydmFsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMjE5XCIsIC8vUkMgMzM2MDAyMTkgOiBOZXZhbGlkbsOtIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXZhbCB8fCAhIXZhbD8ubWVuYSB8fCB2YWw/Lm1lbmEgPT0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5tZW5hPXZhbHVlLm1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISF2Py5tZW5hIHx8IHY/Lm1lbmEgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWVFbGVtZW50KHsgc3RhcnQ6IHYubWVuYV9zaXNfYWFhLCBlbmQ6IHYubWVuYV9zaXNfYWFhIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZUVsZW1lbnQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMuY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDUwOFwiLCAvL1JDIDMzNjAwNTA4IDogxIzDoXN0a2EgdiBtxJtuxJtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5jX21lbmFcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5uYXpldixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA1MDlcIiwgLy9SQyAzMzYwMDUwOSA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMubmF6ZXZcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5wb2t5bixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA2MDhcIiwgLy9SQyAzMzYwMDYwOCA6IFBva3luXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5kYXRfdmFsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDYwOVwiLCAvL1JDIDMzNjAwNjA5IDogRGF0dW0gdmFsdXRhXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kYXRlSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMuZGF0X3ZhbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0b05hbWVzLnZzMixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDA2MTBcIiwgLy9SQyAzMzYwMDYxMCA6IFZTMlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA5MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5zczIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjExXCIsIC8vUkMgMzM2MDA2MTEgOiBTUzJcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDYxMlwiLCAvL1JDIDMzNjAwNjEyIDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0b05hbWVzLml4cF9wb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjEzXCIsIC8vUkMgMzM2MDA2MTMgOiBJZGVudGlmaWvDoXRvciBQT0tcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0b05hbWVzLmRhdF9wb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjE0XCIsIC8vUkMgMzM2MDA2MTQgOiBEYXR1bSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvTmFtZXMuenVfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDYxNVwiLCAvL1JDIDMzNjAwNjE1IDogWnDFr3NvYiDDumhyYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG9OYW1lcy5peHBfYnBsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDYxNlwiLCAvL1JDIDMzNjAwNjE2IDogSWRlbnRpZmlrw6F0b3IgQlBMXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBaw61za8OhbsOtLCBwxZlpZMOhbsOtIGEgdXByYXZlbsOtIGZpbHRyxa8gcHJvIHZvbGFuw60gSXNsKi9cclxuICAgICAgICBwcml2YXRlIGdldEZpbHRlckRhdGEodGhhdDogdGhpcywgcmVxOiBJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbmV4dDogSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHwgSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgYW55LypJbnRlcmZhY2UuR1BvemFkYXZreUR0byovPikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5nZXRGaWx0ZXIodGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikpXHJcbiAgICAgICAgICAgICAgICAudGhlbigobmV3RmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcnMgPSBuZXdGaWx0ZXIuZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmZpbHRlcnNcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXFbXCJmaWx0ZXJzXCJdID0gZmlsdGVycztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dChyZXEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipaw61za8OhbsOtIHNlcnZlciBmaWx0ZXJ1IHogZ3JpZHUqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0RmlsdGVyKGZQYW5lbERhdGE/OiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IGZpbHRlckR0byA9IGZQYW5lbERhdGEgfHwge307XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiY29sbGVjdFwiLCBmaWx0ZXJEdG8pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZmlsdGVyOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnVjZXRfdmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNrX3ZsID0gZmlsdGVyLnVjZXRfdmwuc2tfdmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5idV92bCA9IGZpbHRlci51Y2V0X3ZsLmJ1X3ZsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZmlsdGVyLnVjZXRfdmw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci51Y2V0X2NpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5za19jaSA9IGZpbHRlci51Y2V0X2NpLnNrX2NpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuYnVfY2kgPSBmaWx0ZXIudWNldF9jaS5idV9jaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZpbHRlci51Y2V0X2NpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vw7pwcmF2YSB2cywga3MsIHNzLCBrZHkgcG9rdWQgamUgb3BlcmFjZSA9LCB0YWsgbmVjaGNpIGNhc3RvdmF0IG5hIGludCwgdGFrxb5lIG11c8OtbSB1cHJhdml0IHZzdHVwbsOtIGZpbHRyIGRvIGlzbHVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnZzICYmIGZpbHRlci52cy5zdGFydCA9PSBmaWx0ZXIudnMuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci52cyA9IGZpbHRlci52cy5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlci5rcyAmJiBmaWx0ZXIua3Muc3RhcnQgPT0gZmlsdGVyLmtzLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIua3MgPSBmaWx0ZXIua3Muc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuc3MgJiYgZmlsdGVyLnNzLnN0YXJ0ID09IGZpbHRlci5zcy5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNzID0gZmlsdGVyLnNzLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZmlsdGVyOiBmaWx0ZXIgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIHN1YnRhc2vFryBwcm8gcMOhcm92w6Fuw60gYSByb3pwaXMgcMWZZWRwaXN1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVTdWJ0YXNrcygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXM6IE1lbnVQYXJhbXNbXSA9IFt7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFN1YlBhcm92YW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNjE3XCIsIC8vUkMgMzM2MDA2MTcgOiBQw6Fyb3bDoW7DrSBkb2hsZWRhbsOpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZygwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuYWN0aXZlU3VidGFzayA9PSBHTWFudWFsbmlQYXJvdmFuaVN1YnRhc2tFbnVtLlBhcm92YW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRoYXQuYWN0aXZlU3VidGFzayA9PSBHTWFudWFsbmlQYXJvdmFuaVN1YnRhc2tFbnVtLlJvenBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kc3ViVGFza1JvenBpcyA9IHRoYXQuJHN1YlRhc2tDbnQuY2hpbGRyZW4oKS5kZXRhY2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC4kc3ViVGFza1Bhcm92YW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3bDvW3Em25hIG9ic2FodVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kc3ViVGFza0NudC5hcHBlbmQodGhhdC4kc3ViVGFza1Bhcm92YW5pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJHN1YlRhc2tQYXJvdmFuaS5maW5kKFwiLmdidXR0b25wYW5lbFwiKS5nYnV0dG9ucGFuZWwoXCJyZWZyZXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGl2ZVN1YnRhc2sgPSBHTWFudWFsbmlQYXJvdmFuaVN1YnRhc2tFbnVtLlBhcm92YW5pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTdWJSb3pwaXNQcmVkcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDYxOFwiLCAvL1JDIDMzNjAwNjE4IDogUm96cGlzIHDFmWVkcGlzxa9cclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5hY3RpdmVTdWJ0YXNrID09IEdNYW51YWxuaVBhcm92YW5pU3VidGFza0VudW0uUm96cGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0LmFjdGl2ZVN1YnRhc2sgPT0gR01hbnVhbG5pUGFyb3ZhbmlTdWJ0YXNrRW51bS5QYXJvdmFuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kc3ViVGFza1Bhcm92YW5pID0gdGhhdC4kc3ViVGFza0NudC5jaGlsZHJlbigpLmRldGFjaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LiRzdWJUYXNrUm96cGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3bDvW3Em25hIG9ic2FodVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kc3ViVGFza0NudC5hcHBlbmQodGhhdC4kc3ViVGFza1JvenBpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRzdWJUYXNrUm96cGlzLmZpbmQoXCIuZ2J1dHRvbnBhbmVsXCIpLmdidXR0b25wYW5lbChcInJlZnJlc2hcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aXZlU3VidGFzayA9IEdNYW51YWxuaVBhcm92YW5pU3VidGFza0VudW0uUm96cGlzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfV07XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRzdWJUYXNrcyA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nc3VidGFza3Moe1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRzdWJUYXNrQ250ID0gJC5uZXdEaXYoXCIuc3VidGFza01hbnVhbG5pUGFyb3ZhbmlcIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSB0YWJ1IHMgUMOhcm92w6Fuw61tIGRvaGxlZGFuw6kgcG9sb8W+a3kqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlVGFiUGFyb3ZhbmkoKSB7XHJcbiAgICAgICAgICAgIGxldCAkdGFiUGFyb3ZhbmkgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy4kc3ViVGFza0NudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YWJNYW51YWxuaVBhcm92YW5pUGFyb3ZhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwNjE5XCIsIC8vUkMgMzM2MDA2MTkgOiBQw6Fyb3ZhbsOtIGRvaGxlZGFuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFt7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFBhcm92YXQsIGZhdm9yaXRlOiB0cnVlIH1dXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtQmFua292bmlWeXBpc1wiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDYyMFwiKSAvL1JDIDMzNjAwNjIwIDogw5rEjWV0IHZsYXN0bsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjZXRfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNjIxXCIpIC8vUkMgMzM2MDA2MjEgOiDDmsSNZXQgY2l6w61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNldF9jaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA2MjJcIikgLy9SQyAzMzYwMDYyMiA6IE3Em25hXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jbWVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtZW5hPW1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNjIzXCIpIC8vUkMgMzM2MDA2MjMgOiDEjMOhc3RrYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZE5lZ2F0aXZlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA2MjRcIikgLy9SQyAzMzYwMDYyNCA6IMSMw6FzdGthIHYgbcSbbsSbXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX21lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICByZWROZWdhdGl2ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNjI1XCIpIC8vUkMgMzM2MDA2MjUgOiBWU1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA2MjZcIikgLy9SQyAzMzYwMDYyNiA6IEtTXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDYyN1wiKSAvL1JDIDMzNjAwNjI3IDogU1NcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3NcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNjI4XCIpIC8vUkMgMzM2MDA2MjggOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmN0YWcoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidHlwX2FnPXR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA2MjlcIikgLy9SQyAzMzYwMDYyOSA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJHRhYlBhcm92YW5pLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKS5nYXV0b2ZpdCh7cmVzaXplcnNPblRhYjogZmFsc2UsIGNyaXRpY2FsSGVpZ2h0OiAyMDAsIG1pbmltYWxIZWlnaHQ6IDIwMH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIHRhYnUgcm96cGlzIHDFmWVkcGlzdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVUYWJSb3pwaXNQcmVkcGlzdSgpIHtcclxuICAgICAgICAgICAgbGV0ICR0YWJSb3pwaXMgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy4kc3ViVGFza0NudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YWJNYW51YWxuaVBhcm92YW5pUm96cGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDYzMFwiLCAvL1JDIDMzNjAwNjMwIDogUm96cGlzIHDFmWVkcGlzxa9cclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFt7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFJvenBpc1ByaWRhdCwgZmF2b3JpdGU6IHRydWUgfSwgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RSb3pwaXNPZHN0cmFuaXQsIGZhdm9yaXRlOiB0cnVlIH1dXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IGNudCA9ICQubmV3RGl2KCkuYXBwZW5kVG8oJHRhYlJvenBpcykuZ2NvbnRlbnQoe1xyXG4gICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgfSwgR0NvbnRlbnQuY3JlYXRlSW5pdGlhbGl6ZXIoW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR1JvenBpc1ByZWRwaXN1XCIsIHsgdWlkOiBcIkdSb3pwaXNQcmVkcGlzdSNcIiB9XSwgeyByZWFkT25seTogdHJ1ZSB9KSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlLCBjcml0aWNhbEhlaWdodDogMjAwLCBtaW5pbWFsSGVpZ2h0OiAyMDAgfSk7XHJcbiAgICAgICAgICAgIGNudC5nY29udGVudChcImxvYWRcIik7XHJcbiAgICAgICAgICAgIHRoaXMucm96cGlzUHJlZHBpc3VDbnQgPSAkLmNvbnRlbnQoY250KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBBdXRvbWF0aWNrw6kgZG9obGVkw6Fuw60gcMWZZWRwaXN1IGsgbmVzcMOhcm92YW7DqSBwbGF0YsSbKi9cclxuICAgICAgICBwcml2YXRlIGRvaGxlZGFuaUF1dG9tYXRpY2tlKCkge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8SW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgaWYgKCFyb3cpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y01hbnVhbG5pUGFyb3ZhbmkuYXV0b21hdGlja3lEb2hsZWRhdCh7IGRhdGE6IHsgaXhwOiByb3c/Lml4cCwgcmFkZWtfcG9sOiByb3c/LnJhZGVrX3BvbCwgc3VicmFkZWs6IHJvdz8uc3VicmFkZWssIHJhZGVrX2F2OiByb3c/LnJhZGVrX2F2IH0gfSkuZ2V0RGF0YSgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5wcmVkcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckRhdGFQYXJvdmFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvUGFyb3ZhbmkocmVzdWx0LnR5cF9kb2ggPz8gMCwgcmVzdWx0LnBvY19kb2ggPz8gMCwgSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pVHlwRG9obGVkYW5pLkF1dG9tYXRpY2tlLCByb3csIHJlc3VsdC5wcmVkcGlzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIERpYWxvZ3MuR1Z5YmVyVWhyYWR5RGxnKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTW9kT3RldnJlbmk6IEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnM6IHJvdz8udnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzczogcm93Py5zcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrX3ZsOiByb3c/LnNrX3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVfdmw6IHJvdz8uYnVfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza19jaTogcm93Py5za19jaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1X2NpOiByb3c/LmJ1X2NpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYzogcm93Py5jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2RvaDogcmVzdWx0LnR5cF9kb2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2NfZG9oOiByZXN1bHQucG9jX2RvaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfbWVuYTogcm93Py5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW5hOiByb3c/Lm1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHByZWRwaXNEdG9MaXN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocHJlZHBpc0R0b0xpc3QgPz8gW10pLmxlbmd0aCA8IDEpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXRuZSBwcmVkcGlzRHRvTGlzdFswXSBkbyBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRGF0YVBhcm92YW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvUGFyb3ZhbmkocmVzdWx0LnR5cF9kb2ggPz8gMCwgcmVzdWx0LnBvY19kb2ggPz8gMCwgSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pVHlwRG9obGVkYW5pLkF1dG9tYXRpY2tlLCByb3csIHByZWRwaXNEdG9MaXN0IVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTWFudcOhbG7DrSBkb2hsZWTDoW7DrSBwxZllZHBpc3UgayBuZXNww6Fyb3ZhbsOpIHBsYXRixJsqL1xyXG4gICAgICAgIHByaXZhdGUgZG9obGVkYW5pTWFudWFsbmkoKSB7XHJcbiAgICAgICAgICAgIGxldCByb3cgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG8+KHRoaXMuJGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXJvdykgeyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfVxyXG4gICAgICAgICAgICBsZXQgdHlwX2RvaCA9IChyb3cua3RnX3R5cCA9PSAxNzYwKSA/IDEwIDogMTI7XHJcbiAgICAgICAgICAgIHJldHVybiBEaWFsb2dzLkdWeWJlclVocmFkeURsZyh7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgTW9kT3RldnJlbmk6IEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3csXHJcbiAgICAgICAgICAgICAgICBvcHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB2czogcm93Py52cyxcclxuICAgICAgICAgICAgICAgICAgICBzczogcm93Py5zcyxcclxuICAgICAgICAgICAgICAgICAgICBza192bDogcm93Py5za192bCxcclxuICAgICAgICAgICAgICAgICAgICBidV92bDogcm93Py5idV92bCxcclxuICAgICAgICAgICAgICAgICAgICBza19jaTogcm93Py5za19jaSxcclxuICAgICAgICAgICAgICAgICAgICBidV9jaTogcm93Py5idV9jaSxcclxuICAgICAgICAgICAgICAgICAgICBjOiByb3c/LmMsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX2RvaDogdHlwX2RvaCxcclxuICAgICAgICAgICAgICAgICAgICBwb2NfZG9oOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNfbWVuYTogcm93Py5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVuYTogcm93Py5tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKChwcmVkcGlzRHRvTGlzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChwcmVkcGlzRHRvTGlzdCA/PyBbXSkubGVuZ3RoIDwgMSkgeyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckRhdGFQYXJvdmFuaSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVG9QYXJvdmFuaSh0eXBfZG9oLCAwLCBJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlUeXBEb2hsZWRhbmkuTWFudWFsbmksIHJvdywgcHJlZHBpc0R0b0xpc3QhWzBdKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWcmF0a2EgcMWZZWRwaXN1IGsgbmVzcMOhcm92YW7DqSBwbGF0YsSbKi9cclxuICAgICAgICBwcml2YXRlIHZyYXRrYSgpIHtcclxuICAgICAgICAgICAgbGV0IHJvdyA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICghcm93KSB7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9XHJcbiAgICAgICAgICAgIHJldHVybiBEaWFsb2dzLkdWeWJlclVocmFkeURsZyh7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgTW9kT3RldnJlbmk6IEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3csXHJcbiAgICAgICAgICAgICAgICBvcHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB2czogcm93Py52cyxcclxuICAgICAgICAgICAgICAgICAgICBzczogcm93Py5zcyxcclxuICAgICAgICAgICAgICAgICAgICBza192bDogcm93Py5za192bCxcclxuICAgICAgICAgICAgICAgICAgICBidV92bDogcm93Py5idV92bCxcclxuICAgICAgICAgICAgICAgICAgICBza19jaTogcm93Py5za19jaSxcclxuICAgICAgICAgICAgICAgICAgICBidV9jaTogcm93Py5idV9jaSxcclxuICAgICAgICAgICAgICAgICAgICBjOiByb3c/LmMsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX2RvaDogMTcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9jX2RvaDogMCxcclxuICAgICAgICAgICAgICAgICAgICBjX21lbmE6IHJvdz8uY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbmE6IHJvdz8ubWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdDogZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbigocHJlZHBpc0R0b0xpc3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgocHJlZHBpc0R0b0xpc3QgPz8gW10pLmxlbmd0aCA8IDEpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhUGFyb3ZhbmkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVRvUGFyb3ZhbmkoMTcsIDAsIEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaVR5cERvaGxlZGFuaS5WcmF0a2EsIHJvdywgcHJlZHBpc0R0b0xpc3QhWzBdLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUMOhcm92w6Fuw60gcMWZZWRwaXN1IGsgbmVzcMOhcm92YW7DqSBwbGF0YsSbKi9cclxuICAgICAgICBwcml2YXRlIHBhcm92YXQoKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0bz4odGhpcy4kZ3JpZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICghcm93cykgeyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfVxyXG4gICAgICAgICAgICBsZXQgcm93ID0gcm93cy5maW5kKChlbGVtLCBpZHgsIGFycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uaXhwID09IHRoaXMudnlicmFuYVBsYXRiYT8uaXhwICYmIGVsZW0ucmFkZWtfcG9sID09IHRoaXMudnlicmFuYVBsYXRiYT8ucmFkZWtfcG9sICYmIGVsZW0uc3VicmFkZWsgPT0gdGhpcy52eWJyYW5hUGxhdGJhPy5zdWJyYWRlayAmJiBlbGVtLnJhZGVrX2F2ID09IHRoaXMudnlicmFuYVBsYXRiYT8ucmFkZWtfYXY7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIXJvdykgeyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfVxyXG4gICAgICAgICAgICBsZXQgaHJvbVJvd3MgPSByb3dzLmZpbHRlcigoZWxlbSwgaWR4LCBhcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhKGVsZW0uaXhwID09IHRoaXMudnlicmFuYVBsYXRiYT8uaXhwICYmIGVsZW0ucmFkZWtfcG9sID09IHRoaXMudnlicmFuYVBsYXRiYT8ucmFkZWtfcG9sICYmIGVsZW0uc3VicmFkZWsgPT0gdGhpcy52eWJyYW5hUGxhdGJhPy5zdWJyYWRlayAmJiBlbGVtLnJhZGVrX2F2ID09IHRoaXMudnlicmFuYVBsYXRiYT8ucmFkZWtfYXYpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXFEdG86IEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaVBhcm92YXRSZXFEdG8gPSB7XHJcbiAgICAgICAgICAgICAgICBwbGF0YmFLZXlzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiByb3cuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrX3BvbDogcm93LnJhZGVrX3BvbCxcclxuICAgICAgICAgICAgICAgICAgICByYWRla19hdjogcm93LnJhZGVrX2F2LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YnJhZGVrOiByb3cuc3VicmFkZWtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0eXBEb2hsZWRhbmk6IHRoaXMudGFiUGFyb3ZhbmlEYXRhPy50eXBEb2hsZWRhbmksXHJcbiAgICAgICAgICAgICAgICBwcmVkcGlzS2V5czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cDogdGhpcy50YWJQYXJvdmFuaURhdGE/Lml4cCxcclxuICAgICAgICAgICAgICAgICAgICByYWRla191aHI6IHRoaXMudGFiUGFyb3ZhbmlEYXRhPy5yYWRla191aHIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF2a2E6IHRoaXMudGFiUGFyb3ZhbmlEYXRhPy5kYXZrYSxcclxuICAgICAgICAgICAgICAgICAgICBza192bDogdGhpcy50YWJQYXJvdmFuaURhdGE/LnNrX3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1X3ZsOiB0aGlzLnRhYlBhcm92YW5pRGF0YT8uYnVfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWs6IHRoaXMudGFiUGFyb3ZhbmlEYXRhPy5yYWRla191aHIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaHJvbVBsYXRiYUtleXM6IGhyb21Sb3dzLm1hcCgodmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGl4cDogdmFsdWUuaXhwLCByYWRla19wb2w6IHZhbHVlLnJhZGVrX3BvbCwgc3VicmFkZWs6IHZhbHVlLnN1YnJhZGVrLCByYWRla19hdjogdmFsdWUucmFkZWtfYXYgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudGFiUGFyb3ZhbmlEYXRhPy50eXBfYWcgPT0gMzUwICYmIGhyb21Sb3dzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL0REUCAtIHDFmWVkw6FtIGkgcHJpbcOhcm7DrSBrbMOtxI1lIHogcm96cGlzdSBwxZllZHBpc3UgcHJvIHVsb8W+ZW7DrVxyXG4gICAgICAgICAgICAgICAgcmVxRHRvLnJvenBpc0tleXMgPSB0aGlzLiRzdWJUYXNrUm96cGlzLmZpbmQoXCIuZ2dyaWRcIikuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKClcclxuICAgICAgICAgICAgICAgICAgICAubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfdWhyOiB2YWwucmFkZWtfdWhyLCBjOiB2YWwuY19uZXcsIGNfbWVuYTogdmFsLmNfbmV3X21lbmEgfSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcHJvbXM6IEpRdWVyeVByb21pc2U8YW55PltdID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYlBhcm92YW5pRGF0YT8udHlwRG9obGVkYW5pID09IEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaVR5cERvaGxlZGFuaS5WcmF0a2EpIHtcclxuICAgICAgICAgICAgICAgIGxldCBobGFza2EgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwYXJzZURlY2ltYWwocm93LmMgPz8gMCkudGltZXMoLTEpLmVxdWFscyhwYXJzZURlY2ltYWwodGhpcy50YWJQYXJvdmFuaURhdGE/LmMgPz8gMCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGxhc2thID0gXCJqcmVzOjMzNjAwNjMxXCI7IC8vUkMgMzM2MDA2MzEgOiBWcsOhY2Vuw6EgYSBzcMOhcm92YW7DoSBwbGF0YmEganNvdSByxa96bsOpISBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb21zLnB1c2godGhpcy5kaWFsb2dzLmNvbmZpcm1EYW5nZXJvdXMoaGxhc2thICsgXCJqcmVzOjMzNjAwNjMyXCIpIC8vUkMgMzM2MDA2MzIgOiBPcHJhdmR1IGNoY2V0ZSBrIGRvaGxlZGFuw6kgc3DDoXJvdmFuw6kgcG9sb8W+Y2UgcHJvdsOpc3Qgc3Rvcm5vIHBsYXRieSBuZXNww6Fyb3Zhbm91IHZyw6FjZW5vdSBwbGF0Ym91ICh2cmF0a291KT9cclxuICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaHJvbVJvd3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHQgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YWJQYXJvdmFuaURhdGE/LnR5cF9hZyA9PSAzNTApIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gXCJqcmVzOjMzNjAwNjMzXCI7IC8vUkMgMzM2MDA2MzMgOiBwb2xvxb5rdSBwxZllZHBpc3UgRERQP1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYlBhcm92YW5pRGF0YT8udHlwX2FnID09IDE4MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBcImpyZXM6MzM2MDA2MzRcIjsgLy9SQyAzMzYwMDYzNCA6IHBsYXRidSBQT1U/XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjMzNjAwNjM1XCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTsgLy9SQyAzMzYwMDYzNSA6IEhyb21hZG7EmyBsemUgcMOhcm92YXQgcG91emUgbmEgcMWZZWRwaXMgRERQIG5lYm8gUE9VIVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHJvbXMucHVzaCh0aGlzLmRpYWxvZ3MuY29uZmlybShcImpyZXM6MzM2MDA2MzZcIiArIHRleHQpLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpKTsgLy9SQyAzMzYwMDYzNiA6IE9wcmF2ZHUgY2hjZXRlIHbFoWVjaG55IG96bmHEjWVuw6kgcG9sb8W+a3kgYmFua292bsOtaG8gdsO9cGlzdSBuYXDDoXJvdmF0IG5hIGplZG51IGRvaGxlZG5vdSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuICQud2hlbi5hcHBseShudWxsLCBwcm9tcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjTWFudWFsbmlQYXJvdmFuaS5wYXJvdmF0KHJlcUR0bylcclxuICAgICAgICAgICAgICAgICAgICAudXNlKHRoaXMucmVwZWF0T25FeGNlcHRpb24oKGV4Y0luZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4Y0luZm8/LmRhdGE/LmNsaWVudE1lc3NhZ2VCb3hQcm9wZXJ0eSAmJiBleGNJbmZvPy5kYXRhPy5jbGllbnRNZXNzYWdlQm94VGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnnFvsOhZMOhbsOtIHBvdHZyemVuw60gb2QgdcW+aXZhdGVsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjSW5mby5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGNJbmZvLmRhdGEuY2xpZW50TWVzc2FnZUJveFByb3BlcnR5ID09IFwic2VydmVyTWVzc2FnZU5lc2hvZGFCdVZsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLmNvbmZpcm1EYW5nZXJvdXMoZXhjSW5mby5kYXRhLmNsaWVudE1lc3NhZ2VCb3hUZXh0LCA2MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKEdEbGcubWJiWWVzLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7IGxldCByZXR1cm5Qcm9wID0ge307IHJldHVyblByb3BbZXhjSW5mby5kYXRhLmNsaWVudE1lc3NhZ2VCb3hQcm9wZXJ0eV0gPSB0cnVlOyByZXR1cm4gcmV0dXJuUHJvcDsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV4Y0luZm8uZGF0YS5jbGllbnRNZXNzYWdlQm94UHJvcGVydHkgPT0gXCJzZXJ2ZXJNZXNzYWdlSXNQYXJKaW5hTWVuYVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5jb25maXJtKGV4Y0luZm8uZGF0YS5jbGllbnRNZXNzYWdlQm94VGV4dCwgNjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJldHVyblByb3AgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblByb3BbZXhjSW5mby5kYXRhLmNsaWVudE1lc3NhZ2VCb3hQcm9wZXJ0eV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EaWFsb2cgcHJvIHphZMOhbsOtIMSNw6FzdGt1IHBvbG/Fvmt5IHYgamluw6kgbcSbbsSbIHV2ZWRlbsOpIG5hIHDFmWVkcGlzdSAtIGRsZ19Eb3BDaXpNZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWJLcmVUeHQgPSBcImpyZXM6MzM2MDA2MzdcIjsgLy9SQyAzMzYwMDYzNyA6IGtyZWRpdG7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHpuYW0gPSBwYXJzZURlY2ltYWwoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VEZWNpbWFsKHJvdy5jID8/IDApLmxlc3NUaGFuKDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGViS3JlVHh0ID0gXCJqcmVzOjMzNjAwNjM4XCI7IC8vUkMgMzM2MDA2MzggOiBkZWJldG7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpuYW0gPSBwYXJzZURlY2ltYWwoLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1DTWVuYSA9IHBhcnNlRGVjaW1hbCh0aGlzLnRhYlBhcm92YW5pRGF0YT8uY19tZW5hID8/IDApLmFicygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8zODQuMDRYMDQgLSBwb2t1ZCBzZSBqZWRuw6EgbyBwxZnDrWplbSBERFAgYSBwYXJhbWV0ciBwxZllcGxhdGVrIGJleiByb3pwaXN1LCB0YWsgcMWZZWRwbG5pdCDEjcOhc3RrdSBDWksgeiB2w71waXN1LCByb3pwaXNzIHRvIHVkxJtsw6EsIGFsZSBww6FydWplIGNlbG91IMSNw6FzdGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5idWNfcGJyID09IDEgJiYgdGhpcy50YWJQYXJvdmFuaURhdGE/LnR5cF9hZyA9PSAzNTAgJiYgem5hbS5lcXVhbHMoMSkgJiYgdGhpcy50YWJQYXJvdmFuaURhdGEubWVuYSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUNNZW5hID0gcGFyc2VEZWNpbWFsKHJvdy5jID8/IDApLmFicygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coW0dvcmRpYy5CdWMuV2ViQ2xpZW50LkdNYW51YWxuaVBhcm92YW5pQ2l6aU1lbmEsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvVHh0OiBcImpyZXM6MzM2MDA2MzlcIi5mb3JtYXQoZGViS3JlVHh0LCByb3cubWVuYV90eHQgPz8gXCJcIiksIC8vUkMgMzM2MDA2MzkgOiBOYSBWYcWhZW0gw7rEjXR1IGJ5bCByZWFsaXpvdsOhbiB7MH0gcG9oeWIgdiBtxJtuxJsgezF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUNNZW5hOiBmb3JtQ01lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVuYV90eHQ6IHRoaXMudGFiUGFyb3ZhbmlEYXRhPy5tZW5hX3R4dCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfcG9sOiBwYXJzZURlY2ltYWwocm93LmMgPz8gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dKS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoZGlhbG9nRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWFsb2dEYXRhPy5jX21lbmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuUHJvcFtcImNfbWVuYV9wcmVkcGlzXCJdID0gZGlhbG9nRGF0YS5jX21lbmE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuUHJvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV4Y0luZm8uZGF0YS5jbGllbnRNZXNzYWdlQm94UHJvcGVydHkgPT0gXCJzZXJ2ZXJNZXNzYWdlU2FibG9uYVZTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHlwX3BsYSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRGVjaW1hbChyb3cuYyA/PyAwKS5sZXNzVGhhbigwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGxhID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBEaWFsb2dzLkdTYWJsb25hTGlrdmlkYWNlRnVjU2V6bmFtRGxnKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXppbTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrX3ZsOiByb3cuc2tfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidV92bDogcm93LmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnM6IHJvdy52cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z190eXA6IDIzNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml6X2NoYXI6IDI1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BsYTogdHlwX3BsYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKGlkX3NhYmxvbmEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpZF9zYWJsb25hICYmIGlkX3NhYmxvbmEgIT0gMCkgeyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0dXJuUHJvcCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Qcm9wW2V4Y0luZm8uZGF0YS5jbGllbnRNZXNzYWdlQm94UHJvcGVydHldID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuUHJvcFtcImlkX3NhYmxvbmFcIl0gPSBpZF9zYWJsb25hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuUHJvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5jb25maXJtKGV4Y0luZm8uZGF0YS5jbGllbnRNZXNzYWdlQm94VGV4dCwgNjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyBsZXQgcmV0dXJuUHJvcCA9IHt9OyByZXR1cm5Qcm9wW2V4Y0luZm8uZGF0YS5jbGllbnRNZXNzYWdlQm94UHJvcGVydHldID0gdHJ1ZTsgcmV0dXJuIHJldHVyblByb3A7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpYWxvZyBuZW7DrSBwb3TFmWViYSwgcG9rcmHEjXVqZSBzZSBkw6FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KGV4Y0luZm8pLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogWm9icmF6ZW7DrSBkaWFsb2d1IHMgcm96cGlzZW0gcG9sb8W+a3kqL1xyXG4gICAgICAgIHByaXZhdGUgcm96cGlzKCkge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8SW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgaWYgKCFyb3cpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXHJcbiAgICAgICAgICAgICAgICBbXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HUm96cGlzUG9sb3preVwiLCB7IHVpZDogXCJHUm96cGlzUG9sb3preSNcIiB9XSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpeHA6IHJvdy5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWtfcG9sOiByb3cucmFkZWtfcG9sLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdF92eXA6IHJvdy5kYXRfbm92X3p1cyxcclxuICAgICAgICAgICAgICAgICAgICB1cm9jZW5pOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNfamlzdGluYTogcGFyc2VEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNfdXJvazogcGFyc2VEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNfcHJlcGxhdGVrOiBwYXJzZURlY2ltYWwoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX3Vybzogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrX3Vocl91cm86IDBcclxuICAgICAgICAgICAgICAgIH0vKiwgeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQ1MCB9Ki8pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKChjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3R4Py5jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUMWZaWTDoW7DrSBwxZllZHBpc3UgZG8gcm96cGlzdSBwxZllZHBpc8WvIHYgdGFidSovXHJcbiAgICAgICAgcHJpdmF0ZSByb3pwaXNQcmlkYXRQcmVkcGlzKCkge1xyXG4gICAgICAgICAgICBsZXQgZ3JpZFJvenBpcyA9IHRoaXMuJHN1YlRhc2tSb3pwaXMuZmluZChcIi5nZ3JpZFwiKTtcclxuICAgICAgICAgICAgbGV0IHJhZGVrVWhyUHJlZHBpc0FyciA9IGdyaWRSb3pwaXMuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCkubWFwKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7IHJldHVybiB2YWx1ZS5yYWRla191aHI7IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gRGlhbG9ncy5HVnliZXJVaHJhZHlEbGcoe1xyXG4gICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgIE1vZE90ZXZyZW5pOiBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93LFxyXG4gICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGlzLnRhYlBhcm92YW5pRGF0YT8uaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrX2luOiByYWRla1VoclByZWRwaXNBcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgYzogdGhpcy50YWJQYXJvdmFuaURhdGE/LmMsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX2RvaDogMTEsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9jX2RvaDogZ3JpZFJvenBpcy5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY19tZW5hOiB0aGlzLnRhYlBhcm92YW5pRGF0YT8uY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbmE6IHRoaXMudGFiUGFyb3ZhbmlEYXRhPy5tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKChwcmVkcGlzRHRvTGlzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChwcmVkcGlzRHRvTGlzdCA/PyBbXSkubGVuZ3RoIDwgMSkgeyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgLy9zZXRuZSBwcmVkcGlzRHRvTGlzdFswXSBkbyBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJlZHBpcyA9IHByZWRwaXNEdG9MaXN0IVswXTtcclxuICAgICAgICAgICAgICAgIGxldCByb3pwaXNHcmlkID0gdGhpcy4kc3ViVGFza1JvenBpcy5maW5kKFwiLmdncmlkXCIpO1xyXG4gICAgICAgICAgICAgICAgcm96cGlzR3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiB7IGl4cDogcHJlZHBpcy5peHAsIHJhZGVrX3VocjogcHJlZHBpcy5yYWRla191aHIsIGNfcm96OiB0aGlzLnRhYlBhcm92YW5pRGF0YT8uY19yb3osIGNfcm96X21lbmE6IHRoaXMudGFiUGFyb3ZhbmlEYXRhPy5jX3Jvel9tZW5hIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHVwZGF0ZU1vZGU6IFwiYWRkXCIgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdSb3pwaXNEdG8gPSByb3pwaXNHcmlkLmdncmlkPEludGVyZmFjZS5HUm96cGlzUHJlZHBpc3VEdG8+KFwiZ2V0Vmlld1wiKS5maW5kQnlLZXkocHJlZHBpcy5peHAhLCBwcmVkcGlzLnJhZGVrX3VociEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYlBhcm92YW5pRGF0YSEuY19yb3ogPSBwYXJzZURlY2ltYWwobmV3Um96cGlzRHRvPy5jX3JveiA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJQYXJvdmFuaURhdGEhLmNfcm96X21lbmEgPSBwYXJzZURlY2ltYWwobmV3Um96cGlzRHRvPy5jX3Jvel9tZW5hID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFNldG51dMOtIGRhdCBkbyBmb3JtdWzDocWZZSBww6Fyb3bDoW7DrSBhIHJvenBpc3UgcMWZZWRwaXPFryBwbyB2w71ixJtydSBwxZllZHBpc3Uvw7pocmFkeSAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0RGF0YVRvUGFyb3ZhbmkodHlwX2RvaDogbnVtYmVyLCBwb2NfZG9oOiBudW1iZXIsIHR5cERvaGxlZGFuaTogSW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pVHlwRG9obGVkYW5pLFxyXG4gICAgICAgICAgICByb3c6IEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0bywgcHJlZHBpczogSW50ZXJmYWNlLkdWeWJlclVocmFkeUR0bywgcm96cGlzRW5hYmxlZCA9IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy52eWJyYW5hUGxhdGJhID0gcm93O1xyXG4gICAgICAgICAgICB0aGlzLnRhYlBhcm92YW5pRGF0YSA9IHsgLi4ucHJlZHBpcywgdHlwX2RvaDogdHlwX2RvaCwgcG9jX2RvaDogcG9jX2RvaCwgdHlwRG9obGVkYW5pOiB0eXBEb2hsZWRhbmksIGNfcm96OiBwYXJzZURlY2ltYWwocm93LmMgPz8gMCksIGNfcm96X21lbmE6IHBhcnNlRGVjaW1hbChyb3cuY19tZW5hID8/IDApIH07XHJcbiAgICAgICAgICAgIGxldCBjZWxsSW5mbyA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJhY3RpdmVDZWxsQWRkcmVzc1wiKTtcclxuICAgICAgICAgICAgJChjZWxsSW5mby5yb3dET00hKS5maW5kKFwiLmNoZWNrY29sIC5nY2hlY2tcIikuZ2NoZWNrKFwic2V0VmFsdWVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJyZWZyZXNoUm93XCIsIGNlbGxJbmZvLnJvdyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJtYXJrXCIsIGNlbGxJbmZvKTtcclxuICAgICAgICAgICAgbGV0IGZvcm1EYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdWNldF92bDogcHJlZHBpcy51Y2V0X3ZsLFxyXG4gICAgICAgICAgICAgICAgdWNldF9jaTogcHJlZHBpcy51Y2V0X2NpLFxyXG4gICAgICAgICAgICAgICAgdnM6IHByZWRwaXMudnMsXHJcbiAgICAgICAgICAgICAgICBrczogcHJlZHBpcy5rcyxcclxuICAgICAgICAgICAgICAgIHNzOiBwcmVkcGlzLnNzLFxyXG4gICAgICAgICAgICAgICAgYWM6IHByZWRwaXMuYWMsXHJcbiAgICAgICAgICAgICAgICB1dXM6IHByZWRwaXMudXVzLFxyXG4gICAgICAgICAgICAgICAgbWVuYTogcHJlZHBpcy5tZW5hLFxyXG4gICAgICAgICAgICAgICAgdHlwX2FnOiBwcmVkcGlzLnR5cF9hZ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBfZG9oICE9IDE3KSB7XHJcbiAgICAgICAgICAgICAgICAvL3ZyYXRrYSAtIHN0b3Jub1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZWRwaXMudHlwX2FnICE9IDM1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmVuw60gRERQXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGFbXCJjXCJdID0gcGFyc2VEZWNpbWFsKHByZWRwaXMuYyA/PyAwKS5taW51cyhwYXJzZURlY2ltYWwocHJlZHBpcy5jX3BhciA/PyAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGFbXCJjX21lbmFcIl0gPSBwYXJzZURlY2ltYWwocHJlZHBpcy5jX21lbmEgPz8gMCkubWludXMocGFyc2VEZWNpbWFsKHByZWRwaXMuY19wYXJfbWVuYSA/PyAwKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhW1wiY1wiXSA9IHJvdz8uYztcclxuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YVtcImNfbWVuYVwiXSA9IHJvdz8uY19tZW5hO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGFbXCJjXCJdID0gcHJlZHBpcy5jO1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGFbXCJjX21lbmFcIl0gPSBwcmVkcGlzLmNfbWVuYTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kc3ViVGFza1Bhcm92YW5pLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIGZvcm1EYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQYXJvdmF0Py51cGRhdGVQZXJtaXNzaW9uKHRoaXMuUGVybWlzc2lvbnMuTHplUGFyb3ZhdCk7XHJcbiAgICAgICAgICAgIGlmIChwcmVkcGlzLnByaXpfbmVwYXIgIT0gMCAmJiB0aGlzLmJ1Y19tcHBwbiAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRmbGFzaE5lcGFyb3ZhdCA9ICQubmV3RGl2KCkuZ2ZsYXNocGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwianJlczozMzYwMDY0MFwiLCAvL1JDIDMzNjAwNjQwIDogUMWZZWRwaXMgbcOhIHDFmcOtem5hayBuZXDDoXJvdmF0LiBQxZllc3RvIGhvIGNoY2V0ZSBww6Fyb3ZhdD9cclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJ3YXJuaW5nXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3ViVGFza1Bhcm92YW5pLnByZXBlbmQodGhpcy4kZmxhc2hOZXBhcm92YXQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByZWRwaXMucHJpel9uZXBhciAhPSAwICYmIHRoaXMuYnVjX21wcHBuID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQYXJvdmF0Py51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGZhbHNlLCBtZXNzYWdlOiBcImpyZXM6MzM2MDA2NDFcIn0pOyAvL1JDIDMzNjAwNjQxIDogTmVsemUgcMOhcm92YXQsIHZ5YnJhbsO9IHDFmWVkcGlzIG3DoSBwxZnDrXpuYWsgbmVww6Fyb3ZhdCFcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJvenBpc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCByb3pwaXNHcmlkID0gdGhpcy4kc3ViVGFza1JvenBpcy5maW5kKFwiLmdncmlkXCIpO1xyXG4gICAgICAgICAgICAgICAgcm96cGlzR3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiBwcmVkcGlzLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtfdWhyOiBwcmVkcGlzLnJhZGVrX3VocixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY19yb3o6IHRoaXMudGFiUGFyb3ZhbmlEYXRhLmNfcm96LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjX3Jvel9tZW5hOiB0aGlzLnRhYlBhcm92YW5pRGF0YS5jX3Jvel9tZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgeyB1cGRhdGVNb2RlOiBcImFkZFwiIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdSb3pwaXNEdG8gPSByb3pwaXNHcmlkLmdncmlkPEludGVyZmFjZS5HUm96cGlzUHJlZHBpc3VEdG8+KFwiZ2V0Vmlld1wiKS5maW5kQnlLZXkocHJlZHBpcy5peHAhLCBwcmVkcGlzLnJhZGVrX3VociEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFiUGFyb3ZhbmlEYXRhIS5jX3JveiA9IHBhcnNlRGVjaW1hbChuZXdSb3pwaXNEdG8/LmNfcm96ID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFiUGFyb3ZhbmlEYXRhIS5jX3Jvel9tZW5hID0gcGFyc2VEZWNpbWFsKG5ld1JvenBpc0R0bz8uY19yb3pfbWVuYSA/PyAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwcmVkcGlzLnR5cF9hZyA9PSAzNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0REUCAtIGx6ZSBwcmFjb3ZhdCBzIHJvenBpc2VtXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFJvenBpc1ByaWRhdD8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Um96cGlzT2RzdHJhbml0Py5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm96cGlzUHJlZHBpc3VDbnQucmVhZE9ubHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9qaW7DqSBhZ2VuZHkgLSByb3pwaXMgbmVsemUgbcSbbml0IC0gcG91emUgcHJvaGzDrcW+ZXRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Um96cGlzUHJpZGF0Py5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Um96cGlzT2RzdHJhbml0Py5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvenBpc1ByZWRwaXN1Q250LnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3DFmWVqbWVub3bDoW7DrSB0bGHEjcOtdGthIHDDoXJvdmF0IHBva3VkIGpkZSBvIHZyYXRrdVxyXG4gICAgICAgICAgICBpZiAodHlwRG9obGVkYW5pID09IEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaVR5cERvaGxlZGFuaS5WcmF0a2EpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQYXJvdmF0Py51cGRhdGUoeyBjYXB0aW9uOiBcImpyZXM6MzM2MDA2NDJcIiB9KTsgLy9SQyAzMzYwMDY0MiA6IFN0b3Jub3ZhdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipWecSNacWhdMSbbsOtIGRhdCBkbyBmb3JtdWzDocWZZSBww6Fyb3bDoW7DrSBhIHJvenBpc3UgcMWZZWRwaXPFryBwbyB2w71ixJtydSBwxZllZHBpc3Uvw7pocmFkeSAqL1xyXG4gICAgICAgIHByaXZhdGUgY2xlYXJEYXRhUGFyb3ZhbmkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudnlicmFuYVBsYXRiYSA9IHZvaWQgMDtcclxuICAgICAgICAgICAgdGhpcy50YWJQYXJvdmFuaURhdGEgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQuZmluZChcIi5jaGVja2NvbCAuZ2NoZWNrXCIpLmdjaGVjayhcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwicmVmcmVzaFwiKTtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcIm1hcmtcIiwgJCgpKTtcclxuICAgICAgICAgICAgdGhpcy4kc3ViVGFza1Bhcm92YW5pLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJGZsYXNoTmVwYXJvdmF0KSB7IHRoaXMuJGZsYXNoTmVwYXJvdmF0LmdmbGFzaHBhbmVsKFwiY2xvc2VcIik7IHRoaXMuJGZsYXNoTmVwYXJvdmF0ID0gdm9pZCAwOyB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlldyA9IHRoaXMuJHN1YlRhc2tSb3pwaXMuZmluZChcIi5nZ3JpZFwiKS5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gdmlldy5nZXREYXRhUm93cygpLm1hcCgodmFsdWUsIGluZGV4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWx1ZS5peHAsIHJhZGVrX3VocjogdmFsdWUucmFkZWtfdWhyIH07IH0pO1xyXG4gICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGggPiAwKSB7IFxyXG4gICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKGtleXMsIFwiZGVsZXRlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Um96cGlzUHJpZGF0Py5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFJvenBpc09kc3RyYW5pdD8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQYXJvdmF0Py5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFBhcm92YXQ/LnVwZGF0ZSh7Y2FwdGlvbjogXCJqcmVzOjMzNjAwNjQzXCJ9KTsgLy9SQyAzMzYwMDY0MyA6IFDDoXJvdmF0XHJcbiAgICAgICAgICAgIHRoaXMucm96cGlzUHJlZHBpc3VDbnQucmVhZE9ubHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEhyb21hZG7DqSBvcGVyYWNlIHMgbGlrdmlkYWPDrSBkbyBVQ1QqL1xyXG4gICAgICAgIHByaXZhdGUgbGlrdmlkYWNlVWN0KCkge1xyXG4gICAgICAgICAgICBsZXQgcm93cyA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG8+KHRoaXMuJGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXJvd3MpIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuXHJcbiAgICAgICAgICAgIGxldCB3aXphcmRGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybU1hbnVhbG5pUGFyb3ZuaUxpa3ZpZGFjZVVjdFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA1NjdcIiwgdHJ1ZSkgLy9SQyAzMzYwMDU2NyA6IEtuaWhhXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zZGVuQWxsKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHBfZGVuPXZhbHVlLml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhpcy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9hZzogNDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDU2OFwiLCB0cnVlKSAvL1JDIDMzNjAwNTY4IDogVHlwIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmNwZGQoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel9kZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnByaXpfZGQ9dmFsdWUucHJpel9kZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDU2OVwiLCB0cnVlKSAvL1JDIDMzNjAwNTY5IDogUMWZZWRhdCBrIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZnVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZnVuPXZhbHVlLml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVUeXBBZzogXCJ1Y3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnJmdUl4cERlbjogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhwX2RlblwiLCAodmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsLml4cF9kZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRydWUsIGZhbHNlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVnJmdVN1YnJhZGE6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcIml4cF9kZW5cIiwgKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5zdWJyYWRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0cnVlLCBmYWxzZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVBa3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEbGVQb3ZvbGVueWNoRmF6aTogW1wiR1NBVUNUMDFcIiwgXCJHV0FVQ1QwNVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJpZHJ1emVuYVN0cmVkaXNrYTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTcwXCIsIHRydWUpIC8vUkMgMzM2MDA1NzAgOiBacMWvc29iIGxpa3ZpZGFjZVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9saWtcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRoaXMuYnVjX2xpayxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6IFwianJlczozMzYwMDU3MVwiIH0sIC8vUkMgMzM2MDA1NzEgOiBTYW1vc3RhdG7DvSBkb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6IFwianJlczozMzYwMDU3MlwiIH0gLy9SQyAzMzYwMDU3MiA6IFNwb2xlxI1uw70gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy9vYmpla3QgcHJvIHVsb8W+ZW7DrSBtb2RlbHUgeiBwcnZuw61obyBrcm9rdSAoxaFwYXRuxJsgc2UgcMWZZW7DocWhw60gbW9kZWwgcMWZaSBrcm9rw6FjaCB0YW0gYSB6cMSbdClcclxuICAgICAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgd2l6YXJkQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVGhyZWVTdGVwc09wdGlvbnM8SW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlRocmVlU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBJRDogXCJHSHJvbWFkbkxpa3ZpZGFjZVVjdEJ1YyNcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDA1NjZcIiwgLy9SQyAzMzYwMDU2NiA6IEhyb21hZG7DoSBsaWt2aWRhY2UgbmVzcMOhcm92YW7DvWNoIHBsYXRlYiBkbyBVY3RcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0bz4oKS5hZGQodGhpcy4kZ3JpZC5nZ3JpZDxJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG8sIFwiY29sdW1uc1wiPihcIm9wdGlvblwiLCBcImNvbHVtbnNcIikgfHwgW10pLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFByb2ZpbGU6IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvPihcImdldEN1cnJlbnRQcm9maWxlXCIpLFxyXG4gICAgICAgICAgICAgICAga2V5czogdGhpcy4kZ3JpZC5nZ3JpZDxJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG8+KFwiZ2V0Vmlld1wiKS5rZXlzLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcm93cyxcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICBwcmVDaGVja0FjdGlvbjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfcG9sOiB2YWwucmFkZWtfcG9sLCBzdWJyYWRlazogdmFsLnN1YnJhZGVrLCByYWRla19hdjogdmFsLnJhZGVrX2F2IH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y01hbnVhbG5pUGFyb3ZhbmkuemtvbnRyb2x1alByZWRMaWt2aWRhY2lEb1VjdFByZWRGb3JtdWxhcmVtKHsga2V5czoga2V5c0FyciB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxODBcIiwgLy9SQyAzMzYwMDE4MCA6IFrDoXpuYW15XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDE4MVwiLCAvL1JDIDMzNjAwMTgxIDogWmFkw6Fuw60gw7pkYWrFr1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA1NjVcIiwgLy9SQyAzMzYwMDU2NSA6IEFrY2UgcHJvdmVkZSBsaWt2aWRhY2kgdnlicmFuw71jaCAoemHFoWtydG51dMO9Y2gpIG5lc3DDoXJvdmFuw71jaCBwbGF0ZWIgZG8gVWN0XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVRhYlRpdGxlOiBcImpyZXM6MzM2MDAxODNcIiwgLy9SQyAzMzYwMDE4MyA6IMOaZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IHdpemFyZEZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiB7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRm9ybUZpZWxkczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWwuaXhwLCByYWRla19wb2w6IHZhbC5yYWRla19wb2wsIHN1YnJhZGVrOiB2YWwuc3VicmFkZWssIHJhZGVrX2F2OiB2YWwucmFkZWtfYXYgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5pc2wuQnVjTWFudWFsbmlQYXJvdmFuaS56a29udHJvbHVqUHJlZExpa3ZpZGFjaURvVWN0UHJlZEZvcm11bGFyZW0oeyBrZXlzOiBrZXlzQXJyIH0pLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWwuaXhwLCByYWRla19wb2w6IHZhbC5yYWRla19wb2wsIHN1YnJhZGVrOiB2YWwuc3VicmFkZWssIHJhZGVrX2F2OiB2YWwucmFkZWtfYXYgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y01hbnVhbG5pUGFyb3ZhbmkuemtvbnRyb2x1alByZWRMaWt2aWRhY2lEb1VjdCh7IGtleXM6IGtleXNBcnIsIHBhcmFtc0xpa0RvVWN0OiBtb2RlbCB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFNb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxODRcIiwgLy9SQyAzMzYwMDE4NCA6IFbDvWLEm3IgesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDE4NVwiLCAvL1JDIDMzNjAwMTg1IDogS29udHJvbGEgYSB2w71ixJtyIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDU2NVwiLCAvL1JDIDMzNjAwNTY1IDogQWtjZSBwcm92ZWRlIGxpa3ZpZGFjaSB2eWJyYW7DvWNoICh6YcWha3J0bnV0w71jaCkgbmVzcMOhcm92YW7DvWNoIHBsYXRlYiBkbyBVY3RcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiB3aXphcmRGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1UYWJUaXRsZTogXCJqcmVzOjMzNjAwMTg2XCIsIC8vUkMgMzM2MDAxODYgOiDDmmRhamVcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVGb3JtRmllbGRzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6ICgpID0+IHsgcmV0dXJuIGRhdGFNb2RlbDsgfSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleXNBcnIgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4geyBpeHA6IHZhbC5peHAsIHJhZGVrX3BvbDogdmFsLnJhZGVrX3BvbCwgc3VicmFkZWs6IHZhbC5zdWJyYWRlaywgcmFkZWtfYXY6IHZhbC5yYWRla19hdiB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjTWFudWFsbmlQYXJvdmFuaS56a29udHJvbHVqUHJlZExpa3ZpZGFjaURvVWN0KHsga2V5czoga2V5c0FyciwgcGFyYW1zTGlrRG9VY3Q6IG1vZGVsIH0pLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleXNBcnIgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4geyBpeHA6IHZhbC5peHAsIHJhZGVrX3BvbDogdmFsLnJhZGVrX3BvbCwgc3VicmFkZWs6IHZhbC5zdWJyYWRlaywgcmFkZWtfYXY6IHZhbC5yYWRla19hdiB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjTWFudWFsbmlQYXJvdmFuaS5ocm9tYWRuZUxpa3ZpZG92YXREb1VjdCh7IGtleXM6IGtleXNBcnIsIHBhcmFtc0xpa0RvVWN0OiBtb2RlbCB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFNb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMzNjAwMTg3XCIsIC8vUkMgMzM2MDAxODcgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMTg4XCIsIC8vUkMgMzM2MDAxODggOiBWw71zbGVkZWsgaHJvbWFkbsOpIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiB3aXphcmRGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1UYWJUaXRsZTogXCJqcmVzOjMzNjAwMTg5XCIsIC8vUkMgMzM2MDAxODkgOiDDmmRhamVcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVGb3JtRmllbGRzOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZ2V0RGF0YVJvd3MoKS5maW5kKHggPT4geC53aXpfa2luZCA9PSAyMDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpemFyZENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY3JlYXRlRGlhbG9nUHJvbWlzZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpemFyZENoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSHJvbWFkbsOpIG9wZXJhY2UgcyBsaWt2aWRhY8OtIGRvIEZVQyovXHJcbiAgICAgICAgcHJpdmF0ZSBsaWt2aWRhY2VGdWMoKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICghcm93cyB8fCByb3dzLmxlbmd0aCA9PSAwKSB7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9XHJcblxyXG4gICAgICAgICAgICBpZiAocm93cy5sZW5ndGggPiAxICYmIHJvd3MuZmluZCgoZWxlbSwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIGVsZW0uenUgPT0gMjUgfSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjMzNjAwNTczXCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCIuXCIpOyAvL1JDIDMzNjAwNTczIDogVHlwIG5lc3DDoXJvdmFuw6kgcGxhdGJ5IGthcnRhLXbDvWRhaiBsemUgcHJvdsOpc3QgcG91emUgc2Ftb3N0YXRuxJshXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHByb20gPSAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgbGV0IGlzWnUyNSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAocm93cy5sZW5ndGggPT0gMSAmJiByb3dzWzBdLnp1ID09IDI1KSB7XHJcbiAgICAgICAgICAgICAgICAvL2thcnRhLXbDvWRhaiAtIHNhbW9zdGF0bsSbLCBwcm90b8W+ZSBzZSBidWRlIGRvaGxlZMOhdmF0IMWhYWJsb25hXHJcbiAgICAgICAgICAgICAgICBpc1p1MjUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cF9wbGEgPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlRGVjaW1hbChyb3dzWzBdLmMgPz8gMCkubGVzc1RoYW4oMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBfcGxhID0gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwcm9tID0gRGlhbG9ncy5HU2FibG9uYUxpa3ZpZGFjZUZ1Y1Nlem5hbURsZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBNb2RPdGV2cmVuaTogR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyxcclxuICAgICAgICAgICAgICAgICAgICBvcHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV6aW06IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzOiByb3dzWzBdLnZzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBza192bDogcm93c1swXS5za192bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVfdmw6IHJvd3NbMF0uYnVfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9wbGE6IHR5cF9wbGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfY2hhcjogMjUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt0Z190eXA6IDE3ODhcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9vYmpla3QgcHJvIHVsb8W+ZW7DrSBtb2RlbHUgeiBwcnZuw61obyBrcm9rdSAoxaFwYXRuxJsgc2UgcMWZZW7DocWhw60gbW9kZWwgcMWZaSBrcm9rw6FjaCB0YW0gYSB6cMSbdClcclxuICAgICAgICAgICAgbGV0IGRhdGFNb2RlbCA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgd2l6YXJkQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbS50aGVuKChpZFNhYmxvbmEpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vaWRTYWJsb25hIC0gcG9rdWQgbmVuw60gxb7DoWRuw6EgbmFiw61kbnV0YSAobmFsZXplbmEpLCB0YWsgc2UgdnJhY8OtIC0xIGEgdW1vxb5uw60gc2UgcG9rcmHEjW92YXRcclxuICAgICAgICAgICAgICAgIGlmIChpc1p1MjUgJiYgIWlkU2FibG9uYSkgeyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHByb20yID0gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWRTYWJsb25hID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vxaFhYmxvbmEgdnlicsOhbmEgLSBuYcSNdHUgZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbTIgPSB0aGlzLmlzbC5CdWNTYWJsb25hTGlrdmlkYWNlRnVjLnJlYWQoeyBkYXRhOiB7IGlkX3NhYmxvbmE6IGlkU2FibG9uYSB9IH0pLmdldERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByb20yLnRoZW4oKHNhYmxvbmFEdG8/OiBJbnRlcmZhY2UuR1NhYmxvbmFMaWt2aWRhY2VGdWNEdG8gfCBudWxsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vZGVsRGF0YTogYW55ID0geyB1dXNfenByYWM6IHRoaXMudXVzIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhYmxvbmFEdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhLmt0Z190eXAgPSBzYWJsb25hRHRvLmt0Z190eXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YS50eXBfdXByID0gc2FibG9uYUR0by50eXBfdXByX3BvaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhLnV1cyA9IHNhYmxvbmFEdG8udXVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGEubmtzID0gc2FibG9uYUR0by5ua3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YS5pY28gPSBzYWJsb25hRHRvLmljbzsgLy9wcmltw6FybsOtIGtsw63EjSB1IG5rc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGEuaXhzX2Z1biA9IHNhYmxvbmFEdG8uaXhzX2Z1bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhLmt0Z191cG8gPSAocGFyc2VEZWNpbWFsKHJvd3NbMF0uYyA/PyAwKS5ncmVhdGVyVGhhbigwKSkgPyAzMDAgOiA0MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1p1MjUgJiYgaWRTYWJsb25hID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YS5rdGdfdHlwID0gMTc4ODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhLmt0Z191cG8gPSAocGFyc2VEZWNpbWFsKHJvd3NbMF0uYyA/PyAwKS5ncmVhdGVyVGhhbigwKSkgPyAzMDAgOiA0MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhLmt0Z190eXAgPSAxNzg1O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpemFyZEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybU1hbnVhbG5pUGFyb3ZuaUxpa3ZpZGFjZUZ1Y1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA1NzRcIiwgdHJ1ZSkgLy9SQyAzMzYwMDU3NCA6IEthdGVnb3JpZSB0eXB1IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY2thdCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z190eXA9dmFsdWUua3RnX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z190eXA6IFsxNzg1LCAxNzg2LCAxNzg4LCAxNzg5LCAxOTAwLCAyMzcwLCA0MDAwXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISFzYWJsb25hRHRvIHx8IChpc1p1MjUgJiYgaWRTYWJsb25hID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDU3NVwiLCB0cnVlKSAvL1JDIDMzNjAwNTc1IDogS2F0ZWdvcmllIMO6xI1ldG7DrWhvIHBvaHlidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3VwbzogWzMwMCwgMzIwLCA0MDAsIDQyMCwgNTIwXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISFzYWJsb25hRHRvIHx8IChpc1p1MjUgJiYgaWRTYWJsb25hID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDU3NlwiLCB0cnVlKSAvL1JDIDMzNjAwNTc2IDogVHlwIMO6xI1ldG7DrWhvIHDFmcOtcGFkdSBwb2h5YnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjc3R1cCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF91cHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF91cHI9dmFsdWUudHlwX3VwclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3R5cDogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwia3RnX3R5cFwiLCAodmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwua3RnX3R5cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0cnVlLCBmYWxzZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISFzYWJsb25hRHRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTc3XCIsIHRydWUpIC8vUkMgMzM2MDA1NzcgOiDDmsSNdMOhcm5hIE5TXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt0aGlzLnV1c0dlbiwgLi4udGhpcy51dXNBcnJdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDU3OFwiLCB0cnVlKSAvL1JDIDMzNjAwNTc4IDogTsOha2xhZG92w6kgc3TFmWVkaXNrb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zbmtzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5ua3M9dmFsdWUubmtzO21vZGVsLmljbzw9dmFsdWUuaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmF6YmFVY3NOYUVrb3Zua3M6IHRoaXMudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhemJhVXVzTmFFa292bnVzOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJ1dXNcIiwgKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRydWUsIGZhbHNlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuaWNvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDU3OVwiKSAvL1JDIDMzNjAwNTc5IDogw5rEjXTDoXJuYSB6cHJhY292YXRlbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c196cHJhY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDA1ODBcIiwgdHJ1ZSkgLy9SQyAzMzYwMDU4MCA6IFpwcmFjb3ZhdGVsIHZlIEZVQ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC56cHJhY0Z1YygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW49dmFsdWUuaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1czogdGhpcy51dXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAodGhpcy5idWNfcmFkX3pwZiA9PSAwKSA/IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJqcmVzOjMzNjAwNTgxXCIsIC8vUkMgMzM2MDA1ODEgOiBOZW11c8OtIGLDvXQgYnLDoW4gdiBwb3RhelxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDU4MlwiIC8vUkMgMzM2MDA1ODIgOiBaYWRhbsO9IHpwcmFjb3ZhdGVsIG5lYnVkZSBwb3XFvml0LCBwb2t1ZCBqZSBuYWxlemVuIGppxb4gZXhpc3R1asOtY8OtIHBvaHliLCB0YWsgc2UgcG91xb5pamUgenByYWNvdmF0ZWwgeiB0b2hvdG8gcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IDogdm9pZCAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNTgzXCIpIC8vUkMgMzM2MDA1ODMgOiBQb2t5blxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9reW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVGhyZWVTdGVwc09wdGlvbnM8SW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlRocmVlU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkdIcm9tYWRuYUxpa3ZpZGFjZUZ1Y0J1YyNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDU4NFwiLCAvL1JDIDMzNjAwNTg0IDogSHJvbWFkbsOhIGxpa3ZpZGFjZSBuZXNww6Fyb3ZhbsO9Y2ggcGxhdGViIGRvIEZ1Y1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR01hbnVhbG5pUGFyb3ZhbmlEdG8+KCkuYWRkKHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvLCBcImNvbHVtbnNcIj4oXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFByb2ZpbGU6IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdNYW51YWxuaVBhcm92YW5pRHRvPihcImdldEN1cnJlbnRQcm9maWxlXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HTWFudWFsbmlQYXJvdmFuaUR0bz4oXCJnZXRWaWV3XCIpLmtleXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHJvd3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxODBcIiwgLy9SQyAzMzYwMDE4MCA6IFrDoXpuYW15XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMTgxXCIsIC8vUkMgMzM2MDAxODEgOiBaYWTDoW7DrSDDumRhasWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNTg1XCIsIC8vUkMgMzM2MDA1ODUgOiBBa2NlIHByb3ZlZGUgbGlrdmlkYWNpIHZ5YnJhbsO9Y2ggKHphxaFrcnRudXTDvWNoKSBuZXNww6Fyb3ZhbsO9Y2ggcGxhdGViIGRvIEZ1Y1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVRhYlRpdGxlOiBcImpyZXM6MzM2MDAxODNcIiwgLy9SQyAzMzYwMDE4MyA6IMOaZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogd2l6YXJkRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogbW9kZWxEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlRm9ybUZpZWxkczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfcG9sOiB2YWwucmFkZWtfcG9sLCBzdWJyYWRlazogdmFsLnN1YnJhZGVrLCByYWRla19hdjogdmFsLnJhZGVrX2F2IH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y01hbnVhbG5pUGFyb3ZhbmkuemtvbnRyb2x1alByZWRMaWt2aWRhY2lEb0Z1Yyh7IGtleXM6IGtleXNBcnIsIHBhcmFtc0xpa0RvRnVjOiB7IC4uLm1vZGVsLCBpZF9zYWJsb25hOiBpZFNhYmxvbmEgfSB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDE4NFwiLCAvL1JDIDMzNjAwMTg0IDogVsO9YsSbciB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxODVcIiwgLy9SQyAzMzYwMDE4NSA6IEtvbnRyb2xhIGEgdsO9YsSbciBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDU4NVwiLCAvL1JDIDMzNjAwNTg1IDogQWtjZSBwcm92ZWRlIGxpa3ZpZGFjaSB2eWJyYW7DvWNoICh6YcWha3J0bnV0w71jaCkgbmVzcMOhcm92YW7DvWNoIHBsYXRlYiBkbyBGdWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IHdpemFyZEZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwianJlczozMzYwMDE4NlwiLCAvL1JDIDMzNjAwMTg2IDogw5pkYWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVGb3JtRmllbGRzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogKCkgPT4geyByZXR1cm4gZGF0YU1vZGVsOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfcG9sOiB2YWwucmFkZWtfcG9sLCBzdWJyYWRlazogdmFsLnN1YnJhZGVrLCByYWRla19hdjogdmFsLnJhZGVrX2F2IH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y01hbnVhbG5pUGFyb3ZhbmkuemtvbnRyb2x1alByZWRMaWt2aWRhY2lEb0Z1Yyh7IGtleXM6IGtleXNBcnIsIHBhcmFtc0xpa0RvRnVjOiB7IC4uLm1vZGVsLCBpZF9zYWJsb25hOiBpZFNhYmxvbmEgfSB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWwuaXhwLCByYWRla19wb2w6IHZhbC5yYWRla19wb2wsIHN1YnJhZGVrOiB2YWwuc3VicmFkZWssIHJhZGVrX2F2OiB2YWwucmFkZWtfYXYgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjTWFudWFsbmlQYXJvdmFuaS5ocm9tYWRuZUxpa3ZpZG92YXREb0Z1Yyh7IGtleXM6IGtleXNBcnIsIHBhcmFtc0xpa0RvRnVjOiB7IC4uLm1vZGVsLCBpZF9zYWJsb25hOiBpZFNhYmxvbmEgfSB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxODdcIiwgLy9SQyAzMzYwMDE4NyA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDE4OFwiLCAvL1JDIDMzNjAwMTg4IDogVsO9c2xlZGVrIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiB3aXphcmRGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVRhYlRpdGxlOiBcImpyZXM6MzM2MDAxODlcIiwgLy9SQyAzMzYwMDE4OSA6IMOaZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlRm9ybUZpZWxkczogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmdldERhdGFSb3dzKCkuZmluZCh4ID0+IHgud2l6X2tpbmQgPT0gMjAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpemFyZENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY3JlYXRlRGlhbG9nUHJvbWlzZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2l6YXJkQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab3Bha292w6Fuw60gdm9sw6Fuw60gSVNMIG1ldG9keSBwxZlpIGNoeWLEmywgcG9rdWQgbcOhIGLDvXQgc3BlY2nDoWxuxJsgb8WhZXTFmWVuYVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBjb25kaXRpb25hbFJlcXVlc3RNb2RpZmljYXRpb25cclxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVwZWF0T25FeGNlcHRpb24oY29uZGl0aW9uYWxSZXF1ZXN0TW9kaWZpY2F0aW9uOiBhbnkpOiBhbnkge1xyXG4gICAgICAgICAgICBsZXQgcmVjdXJzaXZlQ2FsbCA9IGZ1bmN0aW9uIChyZXF1ZXN0LCBuZXh0LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KHJlcXVlc3QpLmNhdGNoKChleGNJbmZvKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbmFsUmVxdWVzdE1vZGlmaWNhdGlvbihleGNJbmZvKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlcmVxKSA9PiAoY2hhbmdlcmVxID8gcmVjdXJzaXZlQ2FsbCgoJCBhcyBhbnkpLmRlZXBFeHRlbmRXb0FycmF5KHt9LCByZXF1ZXN0LCBjaGFuZ2VyZXEpLCBuZXh0LCBjdHgpIDogJC5EZWZlcnJlZCgpLnJlamVjdChleGNJbmZvKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+ICQuRGVmZXJyZWQoKS5yZWplY3QoZXhjSW5mbykucHJvbWlzZSgpKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVjdXJzaXZlQ2FsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19