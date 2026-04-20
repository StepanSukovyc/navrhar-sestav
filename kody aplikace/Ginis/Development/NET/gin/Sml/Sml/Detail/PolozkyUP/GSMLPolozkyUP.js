"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSMLPolozkyUP.ts                       </Name>
//    <Description> Content Položky Účetního profilu případu smlouvy            </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2022                            </Copyright>
//    <Created>     2022-05-04                                                  </Created>
//  </FileHeader>
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
            /** Content Položky Účetního profilu případu smlouvy */
            let GSmlPolozkyUP = class GSmlPolozkyUP extends Gordic.GContentBase {
                closing() {
                    return this.changed;
                }
                onContentReady() {
                    this.changed = false;
                    //přednačtení datové věty
                    this.loadingAwait.then(() => { Gordic.Eko.WebClient.DataSentenceAdapter.getCacheContent(this.ixsRoz, this.ixsSax); });
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createFilterPanel();
                    this.createGrid();
                }
                /** Vytvoření akcí */
                createActions() {
                    var that = this;
                    let tmpIxsStr = [];
                    if (this.sml_ptm_pzp) {
                        tmpIxsStr.push(this.sml_ptm_pzp);
                    }
                    if (this.sml_ptm_prtsml) {
                        tmpIxsStr.push(this.sml_ptm_prtsml);
                    }
                    let ixsStr = tmpIxsStr.join(",");
                    this.actions.addRange({
                        actNew: Gordic.Eko.Action.actionNovy({
                            name: "actNew",
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.isl.Smlpzp.createNewDefaultDto({ ixp: that.smlpid_p.ixp_sml_pri ?? "" }).getData().done((newRow) => {
                                    let metaRows = that.$grid.ggrid("getView").getRows(true);
                                    if (metaRows.length > 0 && metaRows[metaRows.length - 1]._isVirtual) { //$(that.$grid).find(".group").length > 0
                                        that.$grid.ggridroweditor("insertRow", metaRows.length - 1, newRow); //_isVirtual
                                    }
                                    else {
                                        that.$grid.ggridroweditor("addRow", newRow);
                                    }
                                }));
                            }
                        }),
                        actValidate: Gordic.Eko.Action.actionSchvalit({
                            name: "actValidate",
                            enabled: false,
                            run: function (ev, ctx) {
                                that.operationRun(30 /* Interface.GSmlspzpUpsertOperace.validate */);
                            }
                        }),
                        actZrusitValidate: Gordic.Eko.Action.actionZrusitSchvaleni({
                            name: "actZrusitValidate",
                            enabled: false,
                            run: function (ev, ctx) {
                                that.operationRun(21 /* Interface.GSmlspzpUpsertOperace.zrusitValidate */);
                            }
                        }),
                        actStorno: Gordic.Eko.Action.actionStornovat({
                            name: "actStorno",
                            enabled: false,
                            run: function (ev, ctx) {
                                that.operationRun(90 /* Interface.GSmlspzpUpsertOperace.storno */);
                            }
                        }),
                        actZrusitStorno: Gordic.Eko.Action.actionZrusitStorno({
                            name: "actZrusitStorno",
                            enabled: false,
                            run: function (ev, ctx) {
                                that.operationRun(22 /* Interface.GSmlspzpUpsertOperace.zrusitStorno */);
                            }
                        }),
                        actUcetniKontrola: {
                            name: "actUcetniKontrola",
                            caption: "jres:33600007", //RC 33600007 : Kontrola
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.ucetniKontrola());
                            }
                        },
                        actPrint: Gordic.Eko.Action.actionTisk({
                            name: "actPrint",
                            enabled: false,
                            tema: "sml_ptm_pzp,sml_ptm_prtsml", //sml_ptm_prtsml,
                            ixsStr: ixsStr, //that.sml_ptm_prtsml + "," +
                            serverRestrictionAlvMethod: "Gordic.Sml.WebClient.GSmlPolozkyUP:GetRestrictionAlv",
                            serverRestrictionAlfMethod: "Gordic.Sml.WebClient.GSmlPolozkyUP:GetRestrictionAlf",
                            serverParameterMethod: "Gordic.Sml.WebClient.GSmlPolozkyUP:ServerParameterMethod",
                            customDto: function () {
                                let subTexts = [];
                                let rows = that.$grid.ggrid("getSelection", false, false);
                                for (let row of rows) {
                                    if (row.pzp_stav != 90 /* Gordic.Sml.Interface.StavDokladu.ng_stavStorno */ && (row.rok_sml_pri ?? 0) > 0 && (row.cislo_sml_pri ?? 0) > 0) {
                                        subTexts.push(String.Format("( smlspzp.rok_sml_pri = {0} and smlspzp.cislo_sml_pri = {1} )", row.rok_sml_pri, row.cislo_sml_pri));
                                    }
                                }
                                let list_pol = (subTexts.length > 0) ? String.Format("AND ( {0} )", subTexts.join(" or ")) : subTexts.join(" or ");
                                return { dtos: that.$grid.ggrid("getSelection", false, false), ixp_sml_pri: that.smlpid_p.ixp_sml_pri, text: list_pol };
                            },
                            dialogOpening: (act) => {
                                return (that.$grid.ggrid("getSelection", false, false).length > 0);
                            }
                        }),
                        actEnd: Gordic.Eko.Action.actionZavrit({
                            name: "actEnd",
                            enabled: true,
                            run: (ev, ctx) => {
                                this.tryClose();
                            }
                        }),
                        actDetailPohybuFuc: Gordic.Eko.Action.actionPrimarniAgenda({
                            name: "actDetailPohybuFuc",
                            caption: "jres:24100077", //RC 24100077 : Pohyb ve FUC
                            enabled: false,
                            run: (ev, ctx) => {
                                /*this.setPending(*/ that.detailPohybuVeFuc() /*)*/;
                            }
                        }),
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actNew*", "actValidate*", "actZrusitValidate*", "actStorno*", "actZrusitStorno*", "actUcetniKontrola*", "actDetailPohybuFuc", "actPrint*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actEnd"]));
                }
                /** Vytvoření filter panelu */
                createFilterPanel() {
                    this.$filterPanel = $.newDiv().appendTo(this.element).gfilterpanel({
                        forms: [this.createFilterPanelForm()],
                        filterViewMode: FilterViewMode.Simple,
                        autoLoadAfter: ["CreatePanel"]
                    });
                }
                /** Vytvoření filterpanel formuláře */
                createFilterPanelForm() {
                    return new Gordic.Forms.Form({ name: "filterPolozkyUP" })
                        .addRow()
                        .addField("gcheck", {
                        name: "act_obd",
                        label: "jres:33600008", //RC 33600008 : pouze aktuální období
                    });
                }
                /** Vytvoření gridu */
                createGrid() {
                    const that = this;
                    this.$grid = $.newDiv().appendTo(this.element).ggrid({
                        name: "gridPolozkyUP",
                        columnMode: "full",
                        columns: this.createGridFormat(),
                        multi: true,
                        data: new Gordic.Isl.View(this.isl.Smlpzp.list({ filters: { ixp_sml_pri: this.smlpid_p.ixp_sml_pri } }), {
                            onResponse: (data) => {
                                //nastavení permissions
                                this.servicePermissions = data.servicePermissions;
                                this.actions.actNew?.updatePermission(this.servicePermissions, "LzeNovy");
                                if (data.data.length < 1 && this.servicePermissions.LzeUcetniKontrola.value) {
                                    this.servicePermissions.LzeUcetniKontrola = { value: false };
                                }
                                this.actions.actUcetniKontrola?.updatePermission(this.servicePermissions, "LzeUcetniKontrola");
                                return data;
                            },
                            processors: {
                                permissionFragments: new Gordic.Data.FragmentManager(["Permissions.*"])
                            },
                            filterPanel: this.$filterPanel,
                            key: ["ixp_sml_pri", "rok_sml_pri", "cislo_sml_pri"],
                            startEmpty: true
                        }),
                        defaultProfile: {
                            condFormats: [
                                {
                                    formula: "EQUALS(@pzp_stav_txt, 'S')",
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red
                                }
                            ]
                        },
                        profileBeforeChange: (ev, obj) => {
                            // pokud se edituje, nejsou povoleny změny v gridu
                            return (this.$grid?.find(".row.editing")?.length ?? 0) < 1;
                        },
                        selection: (ev, obj) => {
                            if (obj.count == 0 || (this.$grid?.find(".row.editing")?.length ?? 1) > 0 || obj.count == 1 && obj.getSelection(false, false).length == 0) {
                                this.setActionsEnable(false);
                            }
                            else {
                                this.setActionsEnable(true);
                            }
                        }
                    }).ggridroweditor({
                        allowCopy: true,
                        beforeStart: (ev, info) => {
                            ///kontrola povolení editace
                            if (!(info?.cellInfo?.data?.Permissions?.LzeEvidovat?.value ?? false)) {
                                ev.preventDefault();
                            }
                        },
                        start: (ev, info) => {
                            setTimeout(() => {
                                this.actions.actNew?.updatePermission({ value: false });
                                this.actions.actUcetniKontrola?.updatePermission({ value: false });
                            }, 1);
                            this.setActionsEnable(false);
                            if (info.cellInfo.data.typ_upr) { //pokud je vyplněn druhý sloupec, který ovládá větu
                                this.$grid.findFields("ktg_typ,typ_upr,ktg_upo,c_up,dat_uup,dat_spl,popis,ixs_esu,nks").gfield("option", "disabled", false);
                                this.setEnableRs(true);
                            }
                            else {
                                this.setEnableRs(false);
                            }
                            //z ktg_typ_txt filter
                            info.cellInfo.data.ktg_typ = info.cellInfo.data.ktg_typ ?? 0;
                            //366.1 06.10.10 inicializace na výběr obojího
                            //366.17 05.10.11 pro MO je záležitost řízena parametricky
                            if (this.sml_pzp_ktgtyp == "1") {
                                if (this.isVydaj && info.cellInfo.data.ktg_upr == undefined /*&& info.cellInfo.data.ktg_upr == 0*/) {
                                    //výdaj - podmíněný závazek
                                    //kategorie účetního případu
                                    info.cellInfo.data.ktg_upr = 70 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPZ */;
                                }
                                else {
                                    //příjem - podmíněná pohledávka
                                    //kategorie účetního případu
                                    if (info.cellInfo.data.ktg_upr == undefined /*&& info.cellInfo.data.ktg_upr == 0*/) { //nepřepisovat pokud existuje
                                        info.cellInfo.data.ktg_upr = 60 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPP */;
                                    }
                                }
                            }
                            else {
                                if (info.cellInfo.data.ktg_upr == undefined /* && info.cellInfo.data.ktg_upr != 0*/) { //nepřepisovat pokud existuje
                                    info.cellInfo.data.ktg_upr = 76 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPZPP */;
                                }
                            }
                        },
                        save: (data, obj) => {
                            this.beginOperation();
                            return this.isl.Smlpzp.upsert({ dto: data, operace: 20 /* Interface.GSmlspzpUpsertOperace.upsert */, ixp: this.smlpid_p.ixp_sml_pri }).getData().done(() => {
                                this.changed = true;
                                this.$grid.ggrid("getView").requestData();
                            }).always(() => { this.endOperation(); });
                        },
                        cancel: (ev) => {
                            this.actions.actNew?.updatePermission(this.servicePermissions, "LzeNovy");
                            this.actions.actUcetniKontrola?.updatePermission(this.servicePermissions, "LzeUcetniKontrola");
                            this.setActionsEnable(true);
                        }
                    })
                        .ggrideko({
                        summaryRowAllowed: true,
                        summaryRowColumns: ["c_up", "c_up_rez"],
                        summaryRowCondition: (meta) => { return meta.data.pzp_stav_txt != 'S'; },
                        longListAllowed: false
                    })
                        .gautofit();
                }
                /** Vytvoření gridformátu pro hlavní editační grid nebo pro wizarda hromadných operací*/
                createGridFormat(wizard = false) {
                    const that = this;
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({
                        width: 40,
                        name: "pzp_stav_txt",
                        caption: "jres:33600009", //RC 33600009 : Stav
                    });
                    Gordic.Eko.Grid.Column.addRok(gridFormat, {
                        name: "rok_sml_pri",
                        field: "rok_sml_pri"
                    });
                    gridFormat.addNumberColumn({
                        width: 40,
                        name: "cislo_sml_pri",
                        caption: "#"
                    })
                        .addTextColumn({
                        width: 200,
                        name: "ktg_typ_txt",
                        caption: "jres:33600010", //RC 33600010 : Kategorie podmíněného Z/P
                        editor: (!wizard) ? function (info) {
                            return {
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.fucckat(), {
                                        name: "ktg_typ",
                                        model: "model.ktg_typ=value.ktg_typ,model.ktg_typ_txt=value.ktg_typ_txt",
                                        flag: "required",
                                        validators: [new Gordic.Validators.Required()],
                                        serverFilters: {
                                            sml_ixp_upr: that.smlpid_p.ixp_sml_pri,
                                            sml_radek_upo: info.cellInfo.data.radek_upo,
                                            ktg_upr: function () {
                                                if (this.sml_pzp_ktgtyp == "1") {
                                                    if (this.isVydaj) {
                                                        //výdaj - podmíněný závazek
                                                        //kategorie účetního případu
                                                        return 70 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPZ */;
                                                    }
                                                    else {
                                                        //příjem - podmíněná pohledávka
                                                        //kategorie účetního případu
                                                        return 60 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPP */;
                                                    }
                                                }
                                                else {
                                                    return [60 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPP */, 70 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPZ */];
                                                }
                                            },
                                        },
                                        change: (ev, ctx) => {
                                            //366.1 06.10.10 změna kategorie typu
                                            if (ctx && ctx.flags && ctx.flags.valid && ctx.value) {
                                                info.cellInfo.data.ktg_typ = ctx.value.ktg_typ ?? 0;
                                                info.cellInfo.data.ktg_typ_txt = ctx.value.ktg_typ_txt ?? "";
                                                info.cellInfo.data.ktg_upr = ctx.value.ktg_upr ?? 0;
                                                //366.1 06.10.10 podle ktg_upr zpětně definuju ktg_upo
                                                if (info.cellInfo.data.ktg_upr == 70 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPZ */) {
                                                    //kategorie účetního pohybu
                                                    info.cellInfo.data.ktg_upo = 203 /* Gordic.Sml.Interface.KategorieUcetnihoPohybu.ng_ktgupoPPZ */;
                                                }
                                                else if (info.cellInfo.data.ktg_upr == 60 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPP */) {
                                                    //kategorie účetního pohybu
                                                    info.cellInfo.data.ktg_upo = 103 /* Gordic.Sml.Interface.KategorieUcetnihoPohybu.ng_ktgupoPPP */;
                                                }
                                                //that.$grid.findFields("ktg_typ").gfield("smartNavNext");
                                            }
                                        }
                                    }]
                            };
                        } : undefined
                    })
                        .addTextColumn({
                        width: 200,
                        name: "typ_upr_txt",
                        caption: "jres:33600011", //RC 33600011 : Charakter podmíněného Z/P
                        editor: (!wizard) ? function (info) {
                            return {
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.fucstup(), {
                                        name: "typ_upr",
                                        model: "model.typ_upr=value.typ_upr;model.typ_upr_txt=value.nazev_upr",
                                        flag: "required",
                                        validators: [new Gordic.Validators.Required()],
                                        serverFilters: {
                                            ktg_typ: function () {
                                                return info.cellInfo.data.ktg_typ;
                                            },
                                            nazev_upr: new Gordic.Forms.Dependency("ktg_typ", (value) => { }, true, false, that.$grid)
                                        },
                                        change: (ev, ctx) => {
                                            //změna typu účetního případu
                                            if (ctx && ctx.flags && ctx.flags.valid && ctx.value) {
                                                info.cellInfo.data.typ_upr = ctx.value.typ_upr;
                                                //info.cellInfo.data.ktg_upo = ctx.value.ktg_upo; //zde není ktg_upo
                                                that.$grid.findFields("uea,ueb,uec,ued,uee,uef,ueg,ueh,uei,uej,te0,te1,te2,te3,te4,uek,uel,uem,uen,te5,te6,te7,te8,te9").gfield("clear");
                                                that.beginOperation("jres:33600012"); //RC 33600012 : Načítání RS účetního případu
                                                that.isl.Smlpzp.getTypUprRs({ data: { typ_upr: info.cellInfo.data.typ_upr, ktg_upo: info.cellInfo.data.ktg_upo } }).getData().done((data) => {
                                                    //setnutí SU AU
                                                    that.$grid.findFields("uea").gfield("setValue", { code: data.uea }, true);
                                                    that.$grid.findFields("ueb").gfield("setValue", { code: data.ueb }, true);
                                                    $.extend(info.cellInfo.data, data);
                                                    that.setEnableRs(true);
                                                    //that.$grid.findFields("typ_upr").gfield("smartNavNext");
                                                }).always(() => { that.endOperation(); });
                                            }
                                            else if (ctx && ctx.flags && ctx.flags.valid && ctx.flags.dependencySet) {
                                                that.$grid.findFields("uea,ueb,uec,ued,uee,uef,ueg,ueh,uei,uej,te0,te1,te2,te3,te4,uek,uel,uem,uen,te5,te6,te7,te8,te9").gfield("clear");
                                                info.cellInfo.data.typ_upr = undefined;
                                                that.resetRSValues(info.cellInfo.data);
                                                that.setEnableRs(false);
                                            }
                                        }
                                    }]
                            };
                        } : undefined
                    })
                        .addTextColumn({
                        width: 200,
                        name: "ktg_upo_txt",
                        caption: "jres:33600013", //RC 33600013 : Kategorie UPO
                        editor: (!wizard) ? function (info) {
                            return {
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.fuccupo(), {
                                        name: "ktg_upo",
                                        model: "model.ktg_upo=value.ktg_upo;model.ktg_upo_txt=value.ktg_upo_txt",
                                        flag: "required",
                                        validators: [new Gordic.Validators.Required()],
                                        serverFilters: {
                                            ktg_upo: new Gordic.Forms.Dependency("ktg_typ", (ctx) => {
                                                if (ctx.ktg_upr == 60 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPP */) {
                                                    return [103, 153];
                                                }
                                                if (ctx.ktg_upr == 70 /* Gordic.Sml.Interface.KategorieUcetnihoPripadu.ng_ktguprPZ */) {
                                                    return [203, 253];
                                                }
                                                return [-1];
                                            }, true, false, that.$grid),
                                            druh_upo: 10,
                                        },
                                        change: (ev, ctx) => {
                                            //that.$grid.findFields("ktg_upo").gfield("smartNavNext");
                                        }
                                    }]
                            };
                        } : undefined
                    })
                        .addTextColumn({
                        width: 300,
                        name: "ixs_esu_txt",
                        caption: "jres:33600014", //RC 33600014 : Název protistrany
                        editor: (!wizard) ? function (info) {
                            return {
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.smlsesu(), {
                                        name: "ixs_esu",
                                        model: "model.ixp_sml_pri=>value.ixp_sml_pri,model.ixs_esu=value.ixs_esu,model.ixs_esu_txt<=value.ixs_esu_txt",
                                        serverFilters: {
                                            ixp_sml_pri: info.cellInfo.data.ixp_sml_pri
                                        },
                                        change: (ev, ctx) => {
                                            //that.$grid.findFields("ixs_esu").gfield("smartNavNext");
                                        }
                                    }]
                            };
                        } : undefined
                    })
                        .addCurrencyColumn({
                        name: "c_up",
                        caption: "jres:33600015", //RC 33600015 : Částka podmíněného Z/P
                        editor: (!wizard) ? {
                            widget: "gnumberbox",
                            options: [Gordic.Prefabs.Number.currency(), {
                                    name: "c_up",
                                }]
                        } : undefined
                    })
                        .addCurrencyColumn({
                        name: "c_up_rez",
                        caption: "jres:33600016", //RC 33600016 : Vázáno
                    });
                    Gordic.Eko.Grid.Column.addDatumUUP(gridFormat, {
                        editor: (!wizard) ? {
                            widget: "gdatebox",
                            options: [{
                                    name: "dat_uup",
                                    flag: "required",
                                    validators: [new Gordic.Validators.Required()]
                                }]
                        } : undefined
                    });
                    Gordic.Eko.Grid.Column.addDatumSplatnosti(gridFormat, {
                        editor: (!wizard) ? {
                            widget: "gdatebox",
                            options: [{
                                    name: "dat_spl",
                                    flag: "required",
                                    validators: [new Gordic.Validators.Required()]
                                }]
                        } : undefined
                    });
                    gridFormat.addTextColumn({
                        width: 100,
                        name: "s_upo_txt",
                        caption: "jres:33600017" //RC 33600017 : Stav zaúčtování
                    });
                    Gordic.Eko.Grid.Column.addPopis(gridFormat, {
                        editor: (!wizard) ? {
                            widget: "gstringbox",
                            options: [{
                                    name: "popis",
                                }]
                        } : undefined
                    });
                    Gordic.Eko.Grid.Column.addNks(gridFormat, {
                        editor: (!wizard) ? function (info) {
                            return {
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.ekosnks(), {
                                        name: "nks",
                                        model: "model.ico=value.ico,model.nks=value.nks",
                                        flag: "required",
                                        validators: [new Gordic.Validators.Required()],
                                        serverFilters: {
                                            aktivita: 100,
                                            rok_od: { o: "<=", v: that.rok },
                                            rok_do: { o: ">=", v: that.rok },
                                            ico: that.ico,
                                            rezim_uct: { o: "!=", v: 0 },
                                            vazbaUcsNaEkovnks: that.ucs
                                        },
                                        change: (ev, ctx) => {
                                            //that.$grid.findFields("nks").gfield("smartNavNext");
                                        }
                                    }]
                            };
                        } : undefined
                    });
                    var fieldOptions = {
                        uea: { forceState: true, disabled: true, tabbable: false },
                        ueb: { forceState: true, disabled: true, tabbable: false },
                        uec: { forceState: true, disabled: true },
                        ued: { forceState: true, disabled: true },
                        uee: { forceState: true, disabled: true },
                        uef: { forceState: true, disabled: true },
                        ueg: { forceState: true, disabled: true },
                        ueh: { forceState: true, disabled: true },
                        uei: { forceState: true, disabled: true },
                        uej: { forceState: true, disabled: true },
                        te0: { forceState: true, disabled: true },
                        te1: { forceState: true, disabled: true },
                        te2: { forceState: true, disabled: true },
                        te3: { forceState: true, disabled: true },
                        te4: { forceState: true, disabled: true },
                        uek: { forceState: true, disabled: true },
                        uel: { forceState: true, disabled: true },
                        uem: { forceState: true, disabled: true },
                        uen: { forceState: true, disabled: true },
                        te5: { forceState: true, disabled: true },
                        te6: { forceState: true, disabled: true },
                        te7: { forceState: true, disabled: true },
                        te8: { forceState: true, disabled: true },
                        te9: { forceState: true, disabled: true },
                    };
                    gridFormat.addSortedEkoCfuSet(this, {
                        isEditable: !wizard,
                        mode: "withoutCheck",
                        fieldOptions: fieldOptions
                    })
                        .addNumberColumn({
                        width: 110,
                        name: "radek_upo",
                        caption: "jres:33600018", //RC 33600018 : Řádek FUC
                    });
                    return gridFormat;
                }
                /**
                 * Spuštění aktivní operace nad záznamem/y (wizard)
                 * @param operation Typ operace
                 */
                operationRun(operation) {
                    var selection = this.$grid.ggrid("getSelection");
                    if (selection.length < 1) {
                        return;
                    }
                    var wizardChanged = false;
                    this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "VecnyProfilWizard#",
                        title: this.getTitleOrDescription(operation, true),
                        gridFormat: this.createGridFormat(true),
                        keys: this.$grid.ggrid("getView").keys,
                        data: selection,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            return this.isl.Smlpzp.checkMassPermissionsBeforeOperation({ dtos: data, operace: operation, ixp: this.smlpid_p.ixp_sml_pri }).get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600086", //RC 33600086 : Výběr záznamů
                            title: "jres:33600086", //RC 33600086 : Výběr záznamů
                            description: this.getTitleOrDescription(operation, false),
                            showIndicator: true,
                            nextAction: (model, data) => {
                                return this.isl.Smlpzp.massOperation({ dtos: data, operace: operation, ixp: this.smlpid_p.ixp_sml_pri }).get().then((result) => {
                                    wizardChanged = true;
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                return this.isl.Smlpzp.checkMassPermissionsBeforeOperation({ dtos: data, operace: operation, ixp: this.smlpid_p.ixp_sml_pri }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600087", //RC 33600087 : Výsledek
                            title: "jres:33600088" //RC 33600088 : Výsledek hromadné operace
                        },
                        completeDelegate: () => {
                            this.changed = true;
                            wizardChanged = true;
                            this.$grid.ggrid("getView").requestData();
                        },
                        cancelDelegate: () => {
                            if (wizardChanged) {
                                this.changed = true;
                                this.$grid.ggrid("getView").requestData();
                            }
                        }
                    });
                }
                /** Otevření dialogu se seznamem účetních kontrol*/
                ucetniKontrola() {
                    return this.isl.Smlpzp.areAllItemsEnabledOrCancelled({ ixp_sml_pri: this.smlpid_p.ixp_sml_pri }).get().then((res) => {
                        this.navigate(["Gordic.Eko.WebClient.GEkoSchvalovaciProcesSeznam", {
                                uid: "EkoSchvalovaciProcesSeznam#",
                            }], {
                            Ixp: this.smlpid_p.ixp_sml_pri,
                            KtgTyp: [160],
                            KtgTypFilter: [160],
                            Rok: this.rok,
                            EnabledPodaniUk: this.smlpid_p.pripad?.uk?.num_akt == 0 && res,
                            EnabledStornoVyrizUk: (this.smlpid_p.pripad?.uk?.stav_vyriz ?? -1) >= 0 /* Interface.StavVyrizeni.ng_stavvyrizNavrh */,
                            UdajePrimarnihoDokladuFK: {
                                ac_ag: this.smlpid_p.ac_sml,
                                ixs_typ: this.smlpid_p.ixs_typ,
                                ixs_esu: this.smlpid_p.ixs_esu,
                                popis: this.smlpid_p.pripad?.popis,
                                c_mena: this.smlpid_p.pripad?.c_mena,
                                mena: this.smlpid_p.pripad?.mena,
                                c_celk: this.smlpid_p.pripad?.c,
                                c_sch: this.smlpid_p.pripad?.smlrok?.c,
                            },
                            ReportParamsFK: { X0002: this.smlpid_p.ixp }
                        }).createDialogPromise().then((retValue) => {
                            this.changed = true;
                            this.load({ changed: this.changed, smlpid_p: void 0, ixp: this.smlpid_p.ixp });
                        });
                    });
                }
                /**
                 * Otevření detailu pohybu ve FUCu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailPohybuVeFuc() {
                    // aktuální vybraná položka
                    let aktPol = Gordic.Eko.Grid.currentRow(this.$grid);
                    if (aktPol !== null) {
                        if (aktPol.radek_upo) {
                            // otevření detailu položky v primární agendě
                            return WebClient.SmlUtils.openDetailInOtherTab(Gordic.Sml.Globals.Enums.TypAg.FUC, aktPol.ixp_sml_pri, aktPol.radek_upo?.toString());
                        }
                        else {
                            // pohyb ve FUCu zatím nebyl vytvořen
                            return this.dialogs.messageBox("jres:33600498", //RC 33600498 : Upozornění
                            "jres:24100078" //RC 24100078 : Účetní pohyb v agendě FUC neexistuje
                            ).createDialogPromise();
                        }
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Získání titilku nebo popisu hromadné operace
                 * @param operation Aktuální operace
                 * @param title Příznak, zda se jedná o titulek nebo popis
                 */
                getTitleOrDescription(operation, title) {
                    switch (operation) {
                        case 30 /* Interface.GSmlspzpUpsertOperace.validate */:
                            if (title) {
                                return "jres:33600089";
                            } //RC 33600089 : Hromadné schválení položek účetního profilu
                            return "jres:33600090"; //RC 33600090 : Akce schvaluje vybrané (zaškrtnuté) položky účetního profilu. Po jejím provedení budou tyto položky ve stavu 'schváleno'
                        case 21 /* Interface.GSmlspzpUpsertOperace.zrusitValidate */:
                            if (title) {
                                return "jres:33600091";
                            } //RC 33600091 : Hromadné zrušení schválení položek účetního profilu
                            return "jres:33600092"; //RC 33600092 : Akce zruší schválení vybraných (zaškrnutých) položek účetního profilu. Po jejím provedení budou tyto položky ve stavu 'evidováno'
                        case 90 /* Interface.GSmlspzpUpsertOperace.storno */:
                            if (title) {
                                return "jres:33600093";
                            } //RC 33600093 : Hromadné storno položek účetního profilu
                            return "jres:33600094"; //RC 33600094 : Akce stornuje vybrané (zaškrtnuté) položky účetního profilu. Po jejím provedení budou tyto položky ve stavu 'stornováno'
                        case 22 /* Interface.GSmlspzpUpsertOperace.zrusitStorno */:
                            if (title) {
                                return "jres:33600095";
                            } //RC 33600095 : Hromadné zrušení storna položek účetního profilu
                            return "jres:33600096"; //RC 33600096 : Akce zruší storno vybraných (zaškrtnutých) položek účetního profilu. Po jejím provedení budou tyto položky ve stavu 'evidováno'
                        default:
                            return "";
                    }
                }
                /**
                 * Nastaví editovatelnost polí věty. (uea,ueb - nelze měnit rukama - je závislý na typu účetního případu)
                 * @param enable Zde povolit editovatelnost nebo zakázat
                 */
                setEnableRs(enable) {
                    this.$grid.findFields("uec,ued,uee,uef,ueg,ueh,uei,uej,te0,te1,te2,te3,te4,uek,uel,uem,uen,te5,te6,te7,te8,te9").gfield("option", "disabled", !enable);
                }
                /**
                 * Reset hodnot datové věty
                 * @param data dto
                 */
                resetRSValues(data) {
                    data.uea = undefined;
                    data.ueb = undefined;
                    data.uec = undefined;
                    data.ued = undefined;
                    data.uee = undefined;
                    data.uef = undefined;
                    data.ueg = undefined;
                    data.ueh = undefined;
                    data.uei = undefined;
                    data.uej = undefined;
                    data.te0 = undefined;
                    data.te1 = undefined;
                    data.te2 = undefined;
                    data.te3 = undefined;
                    data.te4 = undefined;
                    data.uek = undefined;
                    data.uel = undefined;
                    data.uem = undefined;
                    data.uen = undefined;
                    data.te5 = undefined;
                    data.te6 = undefined;
                    data.te7 = undefined;
                    data.te8 = undefined;
                    data.te9 = undefined;
                }
                /** Nastavení povolení hromadných akcí + tisku podle vstupu */
                setActionsEnable(enable) {
                    this.actions.actValidate?.updatePermission({ value: enable });
                    this.actions.actZrusitValidate?.updatePermission({ value: enable });
                    this.actions.actStorno?.updatePermission({ value: enable });
                    this.actions.actZrusitStorno?.updatePermission({ value: enable });
                    this.actions.actDetailPohybuFuc?.updatePermission({ value: enable });
                    this.actions.actPrint?.updatePermission({ value: enable });
                }
            };
            GSmlPolozkyUP = __decorate([
                Decorators.gcontent
            ], GSmlPolozkyUP);
            WebClient.GSmlPolozkyUP = GSmlPolozkyUP;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NNTFBvbG96a3lVUC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTTUxQb2xvemt5VVAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0F5dkJmO0FBenZCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5dkJuQjtJQXp2QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXl2QjdCO1FBenZCb0IsV0FBQSxTQUFTO1lBYTFCLHVEQUF1RDtZQUV2RCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsT0FBQSxZQUFZO2dCQTJCM0MsT0FBTztvQkFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLENBQUM7Z0JBRUQsY0FBYztvQkFDVixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIseUJBQXlCO29CQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEgsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELHFCQUFxQjtnQkFDYixhQUFhO29CQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksU0FBUyxHQUFhLEVBQUUsQ0FBQztvQkFDN0IsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7b0JBQUMsQ0FBQztvQkFDMUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7b0JBQUMsQ0FBQztvQkFDaEUsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7NEJBQ2pDLElBQUksRUFBRSxRQUFROzRCQUNkLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0NBQ2xILElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDekQsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLHlDQUF5Qzt3Q0FDNUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWTtvQ0FDckYsQ0FBQzt5Q0FBTSxDQUFDO3dDQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztvQ0FDaEQsQ0FBQztnQ0FDTCxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUVSLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixXQUFXLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDOzRCQUMxQyxJQUFJLEVBQUUsYUFBYTs0QkFDbkIsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksQ0FBQyxZQUFZLG1EQUEwQyxDQUFDOzRCQUNoRSxDQUFDO3lCQUNKLENBQUM7d0JBQ0YsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7NEJBQ3ZELElBQUksRUFBRSxtQkFBbUI7NEJBQ3pCLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsWUFBWSx5REFBZ0QsQ0FBQzs0QkFDdEUsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7NEJBQ3pDLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsS0FBSzs0QkFDZCxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFlBQVksaURBQXdDLENBQUM7NEJBQzlELENBQUM7eUJBQ0osQ0FBQzt3QkFDRixlQUFlLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7NEJBQ2xELElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsWUFBWSx1REFBOEMsQ0FBQzs0QkFDcEUsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLGlCQUFpQixFQUFFOzRCQUNmLElBQUksRUFBRSxtQkFBbUI7NEJBQ3pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0JBQXdCOzRCQUNsRCxPQUFPLEVBQUUsS0FBSzs0QkFDZCxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRztnQ0FDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzs0QkFDM0MsQ0FBQzt5QkFDSjt3QkFDRCxRQUFRLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDOzRCQUNuQyxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsSUFBSSxFQUFFLDRCQUE0QixFQUFFLGlCQUFpQjs0QkFDckQsTUFBTSxFQUFFLE1BQU0sRUFBRSw2QkFBNkI7NEJBQzdDLDBCQUEwQixFQUFFLHNEQUFzRDs0QkFDbEYsMEJBQTBCLEVBQUUsc0RBQXNEOzRCQUNsRixxQkFBcUIsRUFBRSwwREFBMEQ7NEJBQ2pGLFNBQVMsRUFBRTtnQ0FDUCxJQUFJLFFBQVEsR0FBYSxFQUFFLENBQUM7Z0NBQzVCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0NBQzFELEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQ25CLElBQUksR0FBRyxDQUFDLFFBQVEsMkRBQWtELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0NBQy9ILFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQywrREFBK0QsRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO29DQUN0SSxDQUFDO2dDQUNMLENBQUM7Z0NBQ0QsSUFBSSxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ25ILE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFBOzRCQUMzSCxDQUFDOzRCQUNELGFBQWEsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dDQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZFLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzRCQUNuQyxJQUFJLEVBQUUsUUFBUTs0QkFDZCxPQUFPLEVBQUUsSUFBSTs0QkFDYixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNwQixDQUFDO3lCQUNKLENBQUM7d0JBQ0Ysa0JBQWtCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7NEJBQ3ZELElBQUksRUFBRSxvQkFBb0I7NEJBQzFCLE9BQU8sRUFBRSxlQUFlLEVBQUUsNEJBQTRCOzRCQUN0RCxPQUFPLEVBQUUsS0FBSzs0QkFDZCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2Isb0JBQW9CLENBQUEsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUEsS0FBSyxDQUFDOzRCQUN0RCxDQUFDO3lCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQseUJBQXlCO2dCQUNqQixhQUFhO29CQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2TCxDQUFDO2dCQUVELDRCQUE0QjtnQkFDcEIsZ0JBQWdCO29CQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQUVELDhCQUE4QjtnQkFDdEIsaUJBQWlCO29CQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQzt3QkFDL0QsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7d0JBQ3JDLGNBQWMsRUFBRSxjQUFjLENBQUMsTUFBTTt3QkFDckMsYUFBYSxFQUFFLENBQUMsYUFBYSxDQUFDO3FCQUNqQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQztnQkFFRCxzQ0FBc0M7Z0JBQzlCLHFCQUFxQjtvQkFDekIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUM7eUJBQ3BELE1BQU0sRUFBRTt5QkFDUixRQUFRLENBQUMsUUFBUSxFQUFFO3dCQUNoQixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsZUFBZSxFQUFFLHFDQUFxQztxQkFDaEUsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBRUQsc0JBQXNCO2dCQUNkLFVBQVU7b0JBQ2QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDakQsSUFBSSxFQUFFLGVBQWU7d0JBQ3JCLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO3dCQUNoQyxLQUFLLEVBQUUsSUFBSTt3QkFDWCxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBbUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFOzRCQUN2SSxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQ0FDakIsdUJBQXVCO2dDQUN2QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUEwRCxDQUFDO2dDQUMxRixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0NBQzFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0NBQUMsQ0FBQztnQ0FDOUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztnQ0FDL0YsT0FBTyxJQUFJLENBQUM7NEJBQ2hCLENBQUM7NEJBQ0QsVUFBVSxFQUFFO2dDQUNSLG1CQUFtQixFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQzs2QkFDMUU7NEJBQ0QsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZOzRCQUM5QixHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQzs0QkFDcEQsVUFBVSxFQUFFLElBQUk7eUJBQ25CLENBQUM7d0JBQ0YsY0FBYyxFQUFFOzRCQUNaLFdBQVcsRUFBRTtnQ0FDVDtvQ0FDSSxPQUFPLEVBQUUsNEJBQTRCO29DQUNyQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHO2lDQUM5RDs2QkFDSjt5QkFDSjt3QkFDRCxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDN0Isa0RBQWtEOzRCQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDL0QsQ0FBQzt3QkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ25CLElBQUksR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztnQ0FDeEksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqQyxDQUFDO2lDQUFNLENBQUM7Z0NBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNoQyxDQUFDO3dCQUVMLENBQUM7cUJBQ0osQ0FBQyxDQUFDLGNBQWMsQ0FBQzt3QkFDZCxTQUFTLEVBQUUsSUFBSTt3QkFDZixXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUU7NEJBQ3RCLDRCQUE0Qjs0QkFDNUIsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQztnQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7NEJBQUMsQ0FBQzt3QkFDbkcsQ0FBQzt3QkFDRCxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUU7NEJBQ2hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0NBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQ0FDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDOzRCQUN2RSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7NEJBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUU3QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsbURBQW1EO2dDQUNqRixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dDQUM1SCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMzQixDQUFDO2lDQUFNLENBQUM7Z0NBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDNUIsQ0FBQzs0QkFFRCxzQkFBc0I7NEJBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDOzRCQUM3RCw4Q0FBOEM7NEJBQzlDLDBEQUEwRDs0QkFDMUQsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dDQUM3QixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxzQ0FBc0MsRUFBRSxDQUFDO29DQUNqRywyQkFBMkI7b0NBQzNCLDRCQUE0QjtvQ0FDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxxRUFBNEQsQ0FBQztnQ0FDM0YsQ0FBQztxQ0FBTSxDQUFDO29DQUNKLCtCQUErQjtvQ0FDL0IsNEJBQTRCO29DQUM1QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsc0NBQXNDLEVBQUUsQ0FBQyxDQUFDLDZCQUE2Qjt3Q0FDL0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxxRUFBNEQsQ0FBQztvQ0FDM0YsQ0FBQztnQ0FDTCxDQUFDOzRCQUNMLENBQUM7aUNBQU0sQ0FBQztnQ0FDSixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUEsdUNBQXVDLEVBQUUsQ0FBQyxDQUFDLDZCQUE2QjtvQ0FDL0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyx1RUFBOEQsQ0FBQTtnQ0FDNUYsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUM7d0JBQ0QsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7NEJBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLGlEQUF3QyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQ0FDOUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0NBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUM5QyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7d0JBQzdDLENBQUM7d0JBQ0QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7NEJBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDOzRCQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDOzRCQUMvRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2hDLENBQUM7cUJBQ0osQ0FBQzt5QkFDRyxRQUFRLENBQUM7d0JBQ04saUJBQWlCLEVBQUUsSUFBSTt3QkFDdkIsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDO3dCQUN2QyxtQkFBbUIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN4RSxlQUFlLEVBQUUsS0FBSztxQkFDekIsQ0FBQzt5QkFDRCxRQUFRLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQztnQkFFRCx3RkFBd0Y7Z0JBQ2hGLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxLQUFLO29CQUNuQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDOUMsVUFBVSxDQUFDLGFBQWEsQ0FBQzt3QkFDckIsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CO3FCQUVqRCxDQUFDLENBQUE7b0JBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7d0JBQ3RDLElBQUksRUFBRSxhQUFhO3dCQUNuQixLQUFLLEVBQUUsYUFBYTtxQkFDdkIsQ0FBQyxDQUFBO29CQUNGLFVBQVUsQ0FBQyxlQUFlLENBQUM7d0JBQ3ZCLEtBQUssRUFBRSxFQUFFO3dCQUNULElBQUksRUFBRSxlQUFlO3dCQUNyQixPQUFPLEVBQUUsR0FBRztxQkFDZixDQUFDO3lCQUNHLGFBQWEsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsR0FBRzt3QkFDVixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsT0FBTyxFQUFFLGVBQWUsRUFBRSx5Q0FBeUM7d0JBQ25FLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSTs0QkFDOUIsT0FBTztnQ0FDSCxNQUFNLEVBQUUsWUFBWTtnQ0FDcEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7d0NBQ3ZDLElBQUksRUFBRSxTQUFTO3dDQUNmLEtBQUssRUFBRSxpRUFBaUU7d0NBQ3hFLElBQUksRUFBRSxVQUFVO3dDQUNoQixVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0NBQzlDLGFBQWEsRUFBRTs0Q0FDWCxXQUFXLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXOzRDQUN0QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUzs0Q0FDM0MsT0FBTyxFQUFFO2dEQUNMLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxHQUFHLEVBQUUsQ0FBQztvREFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0RBQ2YsMkJBQTJCO3dEQUMzQiw0QkFBNEI7d0RBQzVCLDBFQUFpRTtvREFDckUsQ0FBQzt5REFBTSxDQUFDO3dEQUNKLCtCQUErQjt3REFDL0IsNEJBQTRCO3dEQUM1QiwwRUFBaUU7b0RBQ3JFLENBQUM7Z0RBQ0wsQ0FBQztxREFBTSxDQUFDO29EQUNKLE9BQU8sd0lBQXNILENBQUE7Z0RBQ2pJLENBQUM7NENBQ0wsQ0FBQzt5Q0FFSjt3Q0FDRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NENBQ2hCLHFDQUFxQzs0Q0FDckMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Z0RBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7Z0RBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7Z0RBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7Z0RBQ3BELHNEQUFzRDtnREFDdEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLHNFQUE2RCxFQUFFLENBQUM7b0RBQzFGLDJCQUEyQjtvREFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxzRUFBNEQsQ0FBQztnREFDM0YsQ0FBQztxREFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sc0VBQTZELEVBQUUsQ0FBQztvREFDakcsMkJBQTJCO29EQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLHNFQUE0RCxDQUFDO2dEQUMzRixDQUFDO2dEQUNELDBEQUEwRDs0Q0FDOUQsQ0FBQzt3Q0FDTCxDQUFDO3FDQUNKLENBQUM7NkJBQ0wsQ0FBQTt3QkFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7cUJBQ2hCLENBQUM7eUJBRUQsYUFBYSxDQUFDO3dCQUNYLEtBQUssRUFBRSxHQUFHO3dCQUNWLElBQUksRUFBRSxhQUFhO3dCQUNuQixPQUFPLEVBQUUsZUFBZSxFQUFFLHlDQUF5Qzt3QkFDbkUsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJOzRCQUM5QixPQUFPO2dDQUNILE1BQU0sRUFBRSxZQUFZO2dDQUNwQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3Q0FDdkMsSUFBSSxFQUFFLFNBQVM7d0NBQ2YsS0FBSyxFQUFFLCtEQUErRDt3Q0FDdEUsSUFBSSxFQUFFLFVBQVU7d0NBQ2hCLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3Q0FDOUMsYUFBYSxFQUFFOzRDQUNYLE9BQU8sRUFBRTtnREFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0Q0FDdEMsQ0FBQzs0Q0FDRCxTQUFTLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7eUNBQzdGO3dDQUNELE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0Q0FDaEIsNkJBQTZCOzRDQUM3QixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnREFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2dEQUMvQyxvRUFBb0U7Z0RBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGlHQUFpRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dEQUV6SSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsNENBQTRDO2dEQUNsRixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0RBQ3hJLGVBQWU7b0RBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7b0RBQzFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO29EQUMxRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29EQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO29EQUN2QiwwREFBMEQ7Z0RBQzlELENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0Q0FFN0MsQ0FBQztpREFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7Z0RBQ3hFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGlHQUFpRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dEQUN6SSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO2dEQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0RBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7NENBQzVCLENBQUM7d0NBQ0wsQ0FBQztxQ0FDSixDQUFDOzZCQUNMLENBQUE7d0JBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO3FCQUNoQixDQUFDO3lCQUNELGFBQWEsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsR0FBRzt3QkFDVixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsT0FBTyxFQUFFLGVBQWUsRUFBRSw2QkFBNkI7d0JBQ3ZELE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSTs0QkFDOUIsT0FBTztnQ0FDSCxNQUFNLEVBQUUsWUFBWTtnQ0FDcEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7d0NBQ3ZDLElBQUksRUFBRSxTQUFTO3dDQUNmLEtBQUssRUFBRSxpRUFBaUU7d0NBQ3hFLElBQUksRUFBRSxVQUFVO3dDQUNoQixVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0NBQzlDLGFBQWEsRUFBRTs0Q0FDWCxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnREFDcEQsSUFBSSxHQUFHLENBQUMsT0FBTyxzRUFBNkQsRUFBRSxDQUFDO29EQUMzRSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dEQUN0QixDQUFDO2dEQUNELElBQUksR0FBRyxDQUFDLE9BQU8sc0VBQTZELEVBQUUsQ0FBQztvREFDM0UsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnREFDdEIsQ0FBQztnREFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0Q0FDaEIsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzs0Q0FDM0IsUUFBUSxFQUFFLEVBQUU7eUNBQ2Y7d0NBQ0QsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRDQUNoQiwwREFBMEQ7d0NBQzlELENBQUM7cUNBQ0osQ0FBQzs2QkFDTCxDQUFBO3dCQUNMLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztxQkFDaEIsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsSUFBSSxFQUFFLGFBQWE7d0JBQ25CLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUNBQWlDO3dCQUMzRCxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUk7NEJBQzlCLE9BQU87Z0NBQ0gsTUFBTSxFQUFFLFlBQVk7Z0NBQ3BCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO3dDQUN2QyxJQUFJLEVBQUUsU0FBUzt3Q0FDZixLQUFLLEVBQUUsdUdBQXVHO3dDQUM5RyxhQUFhLEVBQUU7NENBQ1gsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVc7eUNBQzlDO3dDQUNELE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0Q0FDaEIsMERBQTBEO3dDQUM5RCxDQUFDO3FDQUNKLENBQUM7NkJBQ0wsQ0FBQTt3QkFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7cUJBQ2hCLENBQUM7eUJBQ0QsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLE1BQU07d0JBQ1osT0FBTyxFQUFFLGVBQWUsRUFBRSxzQ0FBc0M7d0JBQ2hFLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNoQixNQUFNLEVBQUUsWUFBWTs0QkFDcEIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7b0NBQ3hDLElBQUksRUFBRSxNQUFNO2lDQUNmLENBQUM7eUJBQ0wsQ0FBQyxDQUFDLENBQUMsU0FBUztxQkFDaEIsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7cUJBQ25ELENBQUMsQ0FBQztvQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRTt3QkFDM0MsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hCLE1BQU0sRUFBRSxVQUFVOzRCQUNsQixPQUFPLEVBQUUsQ0FBQztvQ0FDTixJQUFJLEVBQUUsU0FBUztvQ0FDZixJQUFJLEVBQUUsVUFBVTtvQ0FDaEIsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lDQUNqRCxDQUFDO3lCQUNMLENBQUMsQ0FBQyxDQUFDLFNBQVM7cUJBQ2hCLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFO3dCQUNsRCxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDaEIsTUFBTSxFQUFFLFVBQVU7NEJBQ2xCLE9BQU8sRUFBRSxDQUFDO29DQUNOLElBQUksRUFBRSxTQUFTO29DQUNmLElBQUksRUFBRSxVQUFVO29DQUNoQixVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7aUNBQ2pELENBQUM7eUJBQ0wsQ0FBQyxDQUFDLENBQUMsU0FBUztxQkFDaEIsQ0FBQyxDQUFDO29CQUNILFVBQVUsQ0FBQyxhQUFhLENBQUM7d0JBQ3JCLEtBQUssRUFBRSxHQUFHO3dCQUNWLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsZUFBZSxDQUFDLCtCQUErQjtxQkFDM0QsQ0FBQyxDQUFBO29CQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO3dCQUN4QyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDaEIsTUFBTSxFQUFFLFlBQVk7NEJBQ3BCLE9BQU8sRUFBRSxDQUFDO29DQUNOLElBQUksRUFBRSxPQUFPO2lDQUNoQixDQUFDO3lCQUNMLENBQUMsQ0FBQyxDQUFDLFNBQVM7cUJBQ2hCLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTt3QkFDdEMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJOzRCQUM5QixPQUFPO2dDQUNILE1BQU0sRUFBRSxZQUFZO2dDQUNwQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTt3Q0FDdkMsSUFBSSxFQUFFLEtBQUs7d0NBQ1gsS0FBSyxFQUFFLHlDQUF5Qzt3Q0FDaEQsSUFBSSxFQUFFLFVBQVU7d0NBQ2hCLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3Q0FDOUMsYUFBYSxFQUFFOzRDQUNYLFFBQVEsRUFBRSxHQUFHOzRDQUNiLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7NENBQ2hDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7NENBQ2hDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzs0Q0FDYixTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7NENBQzVCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxHQUFHO3lDQUM5Qjt3Q0FDRCxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NENBQ2hCLHNEQUFzRDt3Q0FDMUQsQ0FBQztxQ0FDSixDQUFDOzZCQUNMLENBQUE7d0JBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO3FCQUNoQixDQUFDLENBQUM7b0JBQ0gsSUFBSSxZQUFZLEdBQUc7d0JBQ2YsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7d0JBQzFELEdBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO3dCQUMxRCxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7d0JBQ3pDLEdBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDekMsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO3dCQUN6QyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7d0JBQ3pDLEdBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDekMsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO3dCQUN6QyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7d0JBQ3pDLEdBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDekMsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO3dCQUN6QyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7d0JBQ3pDLEdBQUcsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDekMsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO3dCQUN6QyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJ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QUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDL0QsQ0FBQzthQUNKLENBQUE7WUF6dUJZLGFBQWE7Z0JBRHpCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsYUFBYSxDQXl1QnpCO1lBenVCWSx1QkFBYSxnQkF5dUJ6QixDQUFBO1FBQ0wsQ0FBQyxFQXp2Qm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXl2QjdCO0lBQUQsQ0FBQyxFQXp2QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXl2Qm5CO0FBQUQsQ0FBQyxFQXp2QlMsTUFBTSxLQUFOLE1BQU0sUUF5dkJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5TbWwuV2ViQ2xpZW50LkdTTUxQb2xvemt5VVAudHMgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBDb250ZW50IFBvbG/Fvmt5IMOaxI1ldG7DrWhvIHByb2ZpbHUgcMWZw61wYWR1IHNtbG91dnkgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDIyLTA1LTA0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5cclxubmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuXHJcbiAgICAvKiogVnN0dXBuw60gcGFyYW1ldHJ5IGRpYWxvZ3UgcG9sb8W+a3kgw7rEjWV0bsOtaG8gcHJvZmlsdSovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTTUxQb2xvemt5VVBEbGdJbnB1dFBhcmFtcyB7XHJcbiAgICAgICAgLyoqIERhdGEgZGV0YWlsdSBzbWxvdXZ5ICovXHJcbiAgICAgICAgc21scGlkX3A6IEludGVyZmFjZS5HRG9rbGFkU21sRHRvXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFbDvXN0dXBuw60gcGFyYW1ldHJ5IGRpYWxvZ3UgcG9sb8W+a3kgw7rEjWV0bsOtaG8gcHJvZmlsdSovXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEdTTUxQb2xvemt5VVBEbGdSZXR1cm5WYWx1ZSB7XHJcbiAgICAgICAgY2hhbmdlZDogYm9vbGVhblxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDb250ZW50IFBvbG/Fvmt5IMOaxI1ldG7DrWhvIHByb2ZpbHUgcMWZw61wYWR1IHNtbG91dnkgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NtbFBvbG96a3lVUCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIGNlbGtvdsO9IHJlY29yZCAtIGRva2xhZCArIHDFmcOtcGFkICovXHJcbiAgICAgICAgcHVibGljIHNtbHBpZF9wOiBJbnRlcmZhY2UuR0Rva2xhZFNtbER0bztcclxuXHJcbiAgICAgICAgLy9Db250ZW50VmFsdWVzXHJcbiAgICAgICAgLyoqIERhdGFiw6F6b3bDvSBwYXJhbWV0ciBwcm8gb21lemVuw60gdHJvanBvbGUgdiBncmlkdSovXHJcbiAgICAgICAgcHJpdmF0ZSBzbWxfcHpwX2t0Z3R5cDtcclxuICAgICAgICAvKiogRGF0YWLDoXpvdsO9IHBhcmFtZXRyIHBybyB0aXNrICovXHJcbiAgICAgICAgcHJpdmF0ZSBzbWxfcHRtX3BydHNtbDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBEYXRhYsOhem92w70gcGFyYW1ldHIgcHJvIHRpc2sgKi9cclxuICAgICAgICBwcml2YXRlIHNtbF9wdG1fcHpwOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgaXNWeWRhajogYm9vbGVhbjtcclxuICAgICAgICBwcml2YXRlIHJvazogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgaWNvOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSB1Y3M6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGl4c1JvejtcclxuICAgICAgICBwcml2YXRlIGl4c1NheDtcclxuXHJcbiAgICAgICAgLyoqIEFrdHXDoWxuxJsgbmHEjXRlbsOpIHNlcnZpY2UgcGVybWlzc2lvbnMgKi9cclxuICAgICAgICBwcml2YXRlIHNlcnZpY2VQZXJtaXNzaW9uczogSW50ZXJmYWNlLkdTbWxzcHpwU2VydmljZVBlcm1pc3Npb25zO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsgemRhIGJ5bGEgcHJvdmVkZW5hIG7Em2pha8OhIGFrdGl2bsOtIG9wZXJhY2UgbmFkIHBvbG/FvmthbWkgKi9cclxuICAgICAgICBwcml2YXRlIGNoYW5nZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIGNsb3NpbmcoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vcMWZZWRuYcSNdGVuw60gZGF0b3bDqSB2xJt0eVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdBd2FpdC50aGVuKCgpID0+IHsgR29yZGljLkVrby5XZWJDbGllbnQuRGF0YVNlbnRlbmNlQWRhcHRlci5nZXRDYWNoZUNvbnRlbnQodGhpcy5peHNSb3osIHRoaXMuaXhzU2F4KTsgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyUGFuZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHRtcEl4c1N0cjogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc21sX3B0bV9wenApIHsgdG1wSXhzU3RyLnB1c2godGhpcy5zbWxfcHRtX3B6cCkgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zbWxfcHRtX3BydHNtbCkgeyB0bXBJeHNTdHIucHVzaCh0aGlzLnNtbF9wdG1fcHJ0c21sKSB9XHJcbiAgICAgICAgICAgIGxldCBpeHNTdHIgPSB0bXBJeHNTdHIuam9pbihcIixcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROZXc6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0TmV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5pc2wuU21scHpwLmNyZWF0ZU5ld0RlZmF1bHREdG8oeyBpeHA6IHRoYXQuc21scGlkX3AuaXhwX3NtbF9wcmk/P1wiXCIgfSkuZ2V0RGF0YSgpLmRvbmUoKG5ld1JvdykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1ldGFSb3dzID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikuZ2V0Um93cyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRhUm93cy5sZW5ndGggPiAwICYmIG1ldGFSb3dzW21ldGFSb3dzLmxlbmd0aCAtIDFdLl9pc1ZpcnR1YWwpIHsgLy8kKHRoYXQuJGdyaWQpLmZpbmQoXCIuZ3JvdXBcIikubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZ2dyaWRyb3dlZGl0b3IoXCJpbnNlcnRSb3dcIiwgbWV0YVJvd3MubGVuZ3RoIC0gMSwgbmV3Um93KTsgLy9faXNWaXJ0dWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZ2dyaWRyb3dlZGl0b3IoXCJhZGRSb3dcIiwgbmV3Um93KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFZhbGlkYXRlOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25TY2h2YWxpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWYWxpZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vcGVyYXRpb25SdW4oSW50ZXJmYWNlLkdTbWxzcHpwVXBzZXJ0T3BlcmFjZS52YWxpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RacnVzaXRWYWxpZGF0ZTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWnJ1c2l0U2NodmFsZW5pKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFpydXNpdFZhbGlkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9wZXJhdGlvblJ1bihJbnRlcmZhY2UuR1NtbHNwenBVcHNlcnRPcGVyYWNlLnpydXNpdFZhbGlkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFN0b3JubzogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uU3Rvcm5vdmF0KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vcGVyYXRpb25SdW4oSW50ZXJmYWNlLkdTbWxzcHpwVXBzZXJ0T3BlcmFjZS5zdG9ybm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0WnJ1c2l0U3Rvcm5vOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXRTdG9ybm8oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WnJ1c2l0U3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9wZXJhdGlvblJ1bihJbnRlcmZhY2UuR1NtbHNwenBVcHNlcnRPcGVyYWNlLnpydXNpdFN0b3Jubyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RVY2V0bmlLb250cm9sYToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VWNldG5pS29udHJvbGFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMDdcIiwgLy9SQyAzMzYwMDAwNyA6IEtvbnRyb2xhXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC51Y2V0bmlLb250cm9sYSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJpbnQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcInNtbF9wdG1fcHpwLHNtbF9wdG1fcHJ0c21sXCIsIC8vc21sX3B0bV9wcnRzbWwsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzU3RyOiBpeHNTdHIsIC8vdGhhdC5zbWxfcHRtX3BydHNtbCArIFwiLFwiICtcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJSZXN0cmljdGlvbkFsdk1ldGhvZDogXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUG9sb3preVVQOkdldFJlc3RyaWN0aW9uQWx2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUmVzdHJpY3Rpb25BbGZNZXRob2Q6IFwiR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbFBvbG96a3lVUDpHZXRSZXN0cmljdGlvbkFsZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU21sUG9sb3preVVQOlNlcnZlclBhcmFtZXRlck1ldGhvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUR0bzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3ViVGV4dHM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dzID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCByb3cgb2Ygcm93cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5wenBfc3RhdiAhPSBHb3JkaWMuU21sLkludGVyZmFjZS5TdGF2RG9rbGFkdS5uZ19zdGF2U3Rvcm5vICYmIChyb3cucm9rX3NtbF9wcmkgPz8gMCkgPiAwICYmIChyb3cuY2lzbG9fc21sX3ByaSA/PyAwKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJUZXh0cy5wdXNoKFN0cmluZy5Gb3JtYXQoXCIoIHNtbHNwenAucm9rX3NtbF9wcmkgPSB7MH0gYW5kIHNtbHNwenAuY2lzbG9fc21sX3ByaSA9IHsxfSApXCIsIHJvdy5yb2tfc21sX3ByaSwgcm93LmNpc2xvX3NtbF9wcmkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdF9wb2wgPSAoc3ViVGV4dHMubGVuZ3RoID4gMCkgPyBTdHJpbmcuRm9ybWF0KFwiQU5EICggezB9IClcIiwgc3ViVGV4dHMuam9pbihcIiBvciBcIikpIDogc3ViVGV4dHMuam9pbihcIiBvciBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGR0b3M6IHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UsIGZhbHNlKSwgaXhwX3NtbF9wcmk6IHRoYXQuc21scGlkX3AuaXhwX3NtbF9wcmksIHRleHQ6IGxpc3RfcG9sIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ09wZW5pbmc6IChhY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0aGF0LiRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlLCBmYWxzZSkubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RFbmQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RFbmRcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsUG9oeWJ1RnVjOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmltYXJuaUFnZW5kYSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxQb2h5YnVGdWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQxMDAwNzdcIiwgLy9SQyAyNDEwMDA3NyA6IFBvaHliIHZlIEZVQ1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyp0aGlzLnNldFBlbmRpbmcoKi90aGF0LmRldGFpbFBvaHlidVZlRnVjKCkvKikqLztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gbWVudWJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVCYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5ldypcIiwgXCJhY3RWYWxpZGF0ZSpcIiwgXCJhY3RacnVzaXRWYWxpZGF0ZSpcIiwgXCJhY3RTdG9ybm8qXCIsIFwiYWN0WnJ1c2l0U3Rvcm5vKlwiLCBcImFjdFVjZXRuaUtvbnRyb2xhKlwiLCBcImFjdERldGFpbFBvaHlidUZ1Y1wiLCBcImFjdFByaW50KlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RFbmRcIl0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBmaWx0ZXIgcGFuZWx1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJQYW5lbCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGZvcm1zOiBbdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbEZvcm0oKV0sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlcjogW1wiQ3JlYXRlUGFuZWxcIl1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBmaWx0ZXJwYW5lbCBmb3JtdWzDocWZZSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWxGb3JtKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmaWx0ZXJQb2xvemt5VVBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0X29iZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM2MDAwMDhcIiwgLy9SQyAzMzYwMDAwOCA6IHBvdXplIGFrdHXDoWxuw60gb2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZ3JpZHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLiRncmlkID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFBvbG96a3lVUFwiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuU21sLkludGVyZmFjZS5HU21sc3B6cER0bz4odGhpcy5pc2wuU21scHpwLmxpc3QoeyBmaWx0ZXJzOiB7IGl4cF9zbWxfcHJpOiB0aGlzLnNtbHBpZF9wLml4cF9zbWxfcHJpIH0gfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBvblJlc3BvbnNlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25hc3RhdmVuw60gcGVybWlzc2lvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlUGVybWlzc2lvbnMgPSBkYXRhLnNlcnZpY2VQZXJtaXNzaW9ucyBhcyBJbnRlcmZhY2UuR1NtbHNwenBTZXJ2aWNlUGVybWlzc2lvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROZXc/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5zZXJ2aWNlUGVybWlzc2lvbnMsIFwiTHplTm92eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YS5sZW5ndGggPCAxICYmIHRoaXMuc2VydmljZVBlcm1pc3Npb25zLkx6ZVVjZXRuaUtvbnRyb2xhLnZhbHVlKSB7IHRoaXMuc2VydmljZVBlcm1pc3Npb25zLkx6ZVVjZXRuaUtvbnRyb2xhID0geyB2YWx1ZTogZmFsc2UgfTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VWNldG5pS29udHJvbGE/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5zZXJ2aWNlUGVybWlzc2lvbnMsIFwiTHplVWNldG5pS29udHJvbGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uRnJhZ21lbnRzOiBuZXcgR29yZGljLkRhdGEuRnJhZ21lbnRNYW5hZ2VyKFtcIlBlcm1pc3Npb25zLipcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhpcy4kZmlsdGVyUGFuZWwsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJpeHBfc21sX3ByaVwiLCBcInJva19zbWxfcHJpXCIsIFwiY2lzbG9fc21sX3ByaVwiXSxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJFUVVBTFMoQHB6cF9zdGF2X3R4dCwgJ1MnKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlQmVmb3JlQ2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIHNlIGVkaXR1amUsIG5lanNvdSBwb3ZvbGVueSB6bcSbbnkgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy4kZ3JpZD8uZmluZChcIi5yb3cuZWRpdGluZ1wiKT8ubGVuZ3RoID8/IDApIDwgMTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5jb3VudCA9PSAwIHx8ICh0aGlzLiRncmlkPy5maW5kKFwiLnJvdy5lZGl0aW5nXCIpPy5sZW5ndGggPz8gMSkgPiAwIHx8IG9iai5jb3VudCA9PSAxICYmIG9iai5nZXRTZWxlY3Rpb24oZmFsc2UsIGZhbHNlKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGlvbnNFbmFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9uc0VuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5nZ3JpZHJvd2VkaXRvcih7XHJcbiAgICAgICAgICAgICAgICBhbGxvd0NvcHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTdGFydDogKGV2LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8va29udHJvbGEgcG92b2xlbsOtIGVkaXRhY2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShpbmZvPy5jZWxsSW5mbz8uZGF0YT8uUGVybWlzc2lvbnM/Lkx6ZUV2aWRvdmF0Py52YWx1ZSA/PyBmYWxzZSkpIHsgZXYucHJldmVudERlZmF1bHQoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiAoZXYsIGluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgLy9tdXPDrSBkb2LEm2hub3V0IGFrdHXDoWxuw60gcHJvbWlzZSwgYWJ5IHpydcWhaWxhIHNldFBlbmRpbmcgbmEgYWtjaSBhIG1vaGwganNlbSBuYXN0YXZpdCBlbmFibGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROZXc/LnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RVY2V0bmlLb250cm9sYT8udXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9uc0VuYWJsZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmNlbGxJbmZvLmRhdGEudHlwX3VwcikgeyAvL3Bva3VkIGplIHZ5cGxuxJtuIGRydWjDvSBzbG91cGVjLCBrdGVyw70gb3Zsw6Fkw6EgdsSbdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5maW5kRmllbGRzKFwia3RnX3R5cCx0eXBfdXByLGt0Z191cG8sY191cCxkYXRfdXVwLGRhdF9zcGwscG9waXMsaXhzX2VzdSxua3NcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEVuYWJsZVJzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RW5hYmxlUnMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy96IGt0Z190eXBfdHh0IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgIGluZm8uY2VsbEluZm8uZGF0YS5rdGdfdHlwID0gaW5mby5jZWxsSW5mby5kYXRhLmt0Z190eXAgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLzM2Ni4xIDA2LjEwLjEwIGluaWNpYWxpemFjZSBuYSB2w71ixJtyIG9ib2rDrWhvXHJcbiAgICAgICAgICAgICAgICAgICAgLy8zNjYuMTcgMDUuMTAuMTEgcHJvIE1PIGplIHrDoWxlxb5pdG9zdCDFmcOtemVuYSBwYXJhbWV0cmlja3lcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zbWxfcHpwX2t0Z3R5cCA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Z5ZGFqICYmIGluZm8uY2VsbEluZm8uZGF0YS5rdGdfdXByID09IHVuZGVmaW5lZCAvKiYmIGluZm8uY2VsbEluZm8uZGF0YS5rdGdfdXByID09IDAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92w71kYWogLSBwb2Rtw61uxJtuw70gesOhdmF6ZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8va2F0ZWdvcmllIMO6xI1ldG7DrWhvIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5jZWxsSW5mby5kYXRhLmt0Z191cHIgPSBHb3JkaWMuU21sLkludGVyZmFjZS5LYXRlZ29yaWVVY2V0bmlob1ByaXBhZHUubmdfa3RndXByUFo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3DFmcOtamVtIC0gcG9kbcOtbsSbbsOhIHBvaGxlZMOhdmthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2thdGVnb3JpZSDDusSNZXRuw61obyBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmNlbGxJbmZvLmRhdGEua3RnX3VwciA9PSB1bmRlZmluZWQgLyomJiBpbmZvLmNlbGxJbmZvLmRhdGEua3RnX3VwciA9PSAwKi8pIHsgLy9uZXDFmWVwaXNvdmF0IHBva3VkIGV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5jZWxsSW5mby5kYXRhLmt0Z191cHIgPSBHb3JkaWMuU21sLkludGVyZmFjZS5LYXRlZ29yaWVVY2V0bmlob1ByaXBhZHUubmdfa3RndXByUFA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5jZWxsSW5mby5kYXRhLmt0Z191cHIgPT0gdW5kZWZpbmVkLyogJiYgaW5mby5jZWxsSW5mby5kYXRhLmt0Z191cHIgIT0gMCovKSB7IC8vbmVwxZllcGlzb3ZhdCBwb2t1ZCBleGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5jZWxsSW5mby5kYXRhLmt0Z191cHIgPSBHb3JkaWMuU21sLkludGVyZmFjZS5LYXRlZ29yaWVVY2V0bmlob1ByaXBhZHUubmdfa3RndXByUFpQUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNhdmU6IChkYXRhLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlNtbHB6cC51cHNlcnQoeyBkdG86IGRhdGEsIG9wZXJhY2U6IEludGVyZmFjZS5HU21sc3B6cFVwc2VydE9wZXJhY2UudXBzZXJ0LCBpeHA6IHRoaXMuc21scGlkX3AuaXhwX3NtbF9wcmkgfSkuZ2V0RGF0YSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsOiAoZXYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0TmV3Py51cGRhdGVQZXJtaXNzaW9uKHRoaXMuc2VydmljZVBlcm1pc3Npb25zLCBcIkx6ZU5vdnlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFVjZXRuaUtvbnRyb2xhPy51cGRhdGVQZXJtaXNzaW9uKHRoaXMuc2VydmljZVBlcm1pc3Npb25zLCBcIkx6ZVVjZXRuaUtvbnRyb2xhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9uc0VuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZGVrbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0FsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0NvbHVtbnM6IFtcImNfdXBcIiwgXCJjX3VwX3JlelwiXSxcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5Um93Q29uZGl0aW9uOiAobWV0YSkgPT4geyByZXR1cm4gbWV0YS5kYXRhLnB6cF9zdGF2X3R4dCAhPSAnUyc7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RBbGxvd2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWRmb3Jtw6F0dSBwcm8gaGxhdm7DrSBlZGl0YcSNbsOtIGdyaWQgbmVibyBwcm8gd2l6YXJkYSBocm9tYWRuw71jaCBvcGVyYWPDrSovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KHdpemFyZCA9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInB6cF9zdGF2X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDA5XCIsIC8vUkMgMzM2MDAwMDkgOiBTdGF2XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFJvayhncmlkRm9ybWF0LCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJva19zbWxfcHJpXCIsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogXCJyb2tfc21sX3ByaVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0MCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY2lzbG9fc21sX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3R5cF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMTBcIiwgLy9SQyAzMzYwMDAxMCA6IEthdGVnb3JpZSBwb2Rtw61uxJtuw6lobyBaL1BcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6ICghd2l6YXJkKSA/IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW0dvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNja2F0KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdHlwPXZhbHVlLmt0Z190eXAsbW9kZWwua3RnX3R5cF90eHQ9dmFsdWUua3RnX3R5cF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtbF9peHBfdXByOiB0aGF0LnNtbHBpZF9wLml4cF9zbWxfcHJpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWxfcmFkZWtfdXBvOiBpbmZvLmNlbGxJbmZvLmRhdGEucmFkZWtfdXBvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXByOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zbWxfcHpwX2t0Z3R5cCA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVnlkYWopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92w71kYWogLSBwb2Rtw61uxJtuw70gesOhdmF6ZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9rYXRlZ29yaWUgw7rEjWV0bsOtaG8gcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuU21sLkludGVyZmFjZS5LYXRlZ29yaWVVY2V0bmlob1ByaXBhZHUubmdfa3RndXByUFo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wxZnDrWplbSAtIHBvZG3DrW7Em27DoSBwb2hsZWTDoXZrYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2thdGVnb3JpZSDDusSNZXRuw61obyBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5TbWwuSW50ZXJmYWNlLkthdGVnb3JpZVVjZXRuaWhvUHJpcGFkdS5uZ19rdGd1cHJQUDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbR29yZGljLlNtbC5JbnRlcmZhY2UuS2F0ZWdvcmllVWNldG5paG9QcmlwYWR1Lm5nX2t0Z3VwclBQLCBHb3JkaWMuU21sLkludGVyZmFjZS5LYXRlZ29yaWVVY2V0bmlob1ByaXBhZHUubmdfa3RndXByUFpdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLzM2Ni4xIDA2LjEwLjEwIHptxJtuYSBrYXRlZ29yaWUgdHlwdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4ICYmIGN0eC5mbGFncyAmJiBjdHguZmxhZ3MudmFsaWQgJiYgY3R4LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmNlbGxJbmZvLmRhdGEua3RnX3R5cCA9IGN0eC52YWx1ZS5rdGdfdHlwID8/IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmNlbGxJbmZvLmRhdGEua3RnX3R5cF90eHQgPSBjdHgudmFsdWUua3RnX3R5cF90eHQgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uY2VsbEluZm8uZGF0YS5rdGdfdXByID0gY3R4LnZhbHVlLmt0Z191cHIgPz8gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMzY2LjEgMDYuMTAuMTAgcG9kbGUga3RnX3VwciB6cMSbdG7EmyBkZWZpbnVqdSBrdGdfdXBvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5jZWxsSW5mby5kYXRhLmt0Z191cHIgPT0gR29yZGljLlNtbC5JbnRlcmZhY2UuS2F0ZWdvcmllVWNldG5paG9QcmlwYWR1Lm5nX2t0Z3VwclBaKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9rYXRlZ29yaWUgw7rEjWV0bsOtaG8gcG9oeWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5jZWxsSW5mby5kYXRhLmt0Z191cG8gPSBHb3JkaWMuU21sLkludGVyZmFjZS5LYXRlZ29yaWVVY2V0bmlob1BvaHlidS5uZ19rdGd1cG9QUFo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZm8uY2VsbEluZm8uZGF0YS5rdGdfdXByID09IEdvcmRpYy5TbWwuSW50ZXJmYWNlLkthdGVnb3JpZVVjZXRuaWhvUHJpcGFkdS5uZ19rdGd1cHJQUCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8va2F0ZWdvcmllIMO6xI1ldG7DrWhvIHBvaHlidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uY2VsbEluZm8uZGF0YS5rdGdfdXBvID0gR29yZGljLlNtbC5JbnRlcmZhY2UuS2F0ZWdvcmllVWNldG5paG9Qb2h5YnUubmdfa3RndXBvUFBQO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkLmZpbmRGaWVsZHMoXCJrdGdfdHlwXCIpLmdmaWVsZChcInNtYXJ0TmF2TmV4dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3Vwcl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMTFcIiwgLy9SQyAzMzYwMDAxMSA6IENoYXJha3RlciBwb2Rtw61uxJtuw6lobyBaL1BcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6ICghd2l6YXJkKSA/IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW0dvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNzdHVwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF91cHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfdXByPXZhbHVlLnR5cF91cHI7bW9kZWwudHlwX3Vwcl90eHQ9dmFsdWUubmF6ZXZfdXByXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdfdHlwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5mby5jZWxsSW5mby5kYXRhLmt0Z190eXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2X3VwcjogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwia3RnX3R5cFwiLCAodmFsdWUpID0+IHsgfSwgdHJ1ZSwgZmFsc2UsIHRoYXQuJGdyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vem3Em25hIHR5cHUgw7rEjWV0bsOtaG8gcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHggJiYgY3R4LmZsYWdzICYmIGN0eC5mbGFncy52YWxpZCAmJiBjdHgudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uY2VsbEluZm8uZGF0YS50eXBfdXByID0gY3R4LnZhbHVlLnR5cF91cHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2luZm8uY2VsbEluZm8uZGF0YS5rdGdfdXBvID0gY3R4LnZhbHVlLmt0Z191cG87IC8vemRlIG5lbsOtIGt0Z191cG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZmluZEZpZWxkcyhcInVlYSx1ZWIsdWVjLHVlZCx1ZWUsdWVmLHVlZyx1ZWgsdWVpLHVlaix0ZTAsdGUxLHRlMix0ZTMsdGU0LHVlayx1ZWwsdWVtLHVlbix0ZTUsdGU2LHRlNyx0ZTgsdGU5XCIpLmdmaWVsZChcImNsZWFyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMzNjAwMDEyXCIpOyAvL1JDIDMzNjAwMDEyIDogTmHEjcOtdMOhbsOtIFJTIMO6xI1ldG7DrWhvIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuU21scHpwLmdldFR5cFVwclJzKHsgZGF0YTogeyB0eXBfdXByOiBpbmZvLmNlbGxJbmZvLmRhdGEudHlwX3Vwciwga3RnX3VwbzogaW5mby5jZWxsSW5mby5kYXRhLmt0Z191cG8gfSB9KS5nZXREYXRhKCkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2V0bnV0w60gU1UgQVVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkLmZpbmRGaWVsZHMoXCJ1ZWFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBjb2RlOiBkYXRhLnVlYSB9LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkLmZpbmRGaWVsZHMoXCJ1ZWJcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBjb2RlOiBkYXRhLnVlYiB9LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChpbmZvLmNlbGxJbmZvLmRhdGEsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0RW5hYmxlUnModHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkLmZpbmRGaWVsZHMoXCJ0eXBfdXByXCIpLmdmaWVsZChcInNtYXJ0TmF2TmV4dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN0eCAmJiBjdHguZmxhZ3MgJiYgY3R4LmZsYWdzLnZhbGlkICYmIGN0eC5mbGFncy5kZXBlbmRlbmN5U2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkLmZpbmRGaWVsZHMoXCJ1ZWEsdWViLHVlYyx1ZWQsdWVlLHVlZix1ZWcsdWVoLHVlaSx1ZWosdGUwLHRlMSx0ZTIsdGUzLHRlNCx1ZWssdWVsLHVlbSx1ZW4sdGU1LHRlNix0ZTcsdGU4LHRlOVwiKS5nZmllbGQoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uY2VsbEluZm8uZGF0YS50eXBfdXByID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZXNldFJTVmFsdWVzKGluZm8uY2VsbEluZm8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEVuYWJsZVJzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAxM1wiLCAvL1JDIDMzNjAwMDEzIDogS2F0ZWdvcmllIFVQT1xyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogKCF3aXphcmQpID8gZnVuY3Rpb24gKGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z191cG89dmFsdWUua3RnX3Vwbzttb2RlbC5rdGdfdXBvX3R4dD12YWx1ZS5rdGdfdXBvX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3VwbzogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwia3RnX3R5cFwiLCAoY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4Lmt0Z191cHIgPT0gR29yZGljLlNtbC5JbnRlcmZhY2UuS2F0ZWdvcmllVWNldG5paG9QcmlwYWR1Lm5nX2t0Z3VwclBQKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsxMDMsIDE1M107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4Lmt0Z191cHIgPT0gR29yZGljLlNtbC5JbnRlcmZhY2UuS2F0ZWdvcmllVWNldG5paG9QcmlwYWR1Lm5nX2t0Z3VwclBaKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyMDMsIDI1M107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy0xXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSwgZmFsc2UsIHRoYXQuJGdyaWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcnVoX3VwbzogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC4kZ3JpZC5maW5kRmllbGRzKFwia3RnX3Vwb1wiKS5nZmllbGQoXCJzbWFydE5hdk5leHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDE0XCIsIC8vUkMgMzM2MDAwMTQgOiBOw6F6ZXYgcHJvdGlzdHJhbnlcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6ICghd2l6YXJkKSA/IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW0dvcmRpYy5QcmVmYWJzLlNlbGVjdC5zbWxzZXN1KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHBfc21sX3ByaT0+dmFsdWUuaXhwX3NtbF9wcmksbW9kZWwuaXhzX2VzdT12YWx1ZS5peHNfZXN1LG1vZGVsLml4c19lc3VfdHh0PD12YWx1ZS5peHNfZXN1X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX3NtbF9wcmk6IGluZm8uY2VsbEluZm8uZGF0YS5peHBfc21sX3ByaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGdyaWQuZmluZEZpZWxkcyhcIml4c19lc3VcIikuZ2ZpZWxkKFwic21hcnROYXZOZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfdXBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMTVcIiwgLy9SQyAzMzYwMDAxNSA6IMSMw6FzdGthIHBvZG3DrW7Em27DqWhvIFovUFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogKCF3aXphcmQpID8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY191cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY191cF9yZXpcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwMTZcIiwgLy9SQyAzMzYwMDAxNiA6IFbDoXrDoW5vXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREYXR1bVVVUChncmlkRm9ybWF0LCB7XHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6ICghd2l6YXJkKSA/IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2RhdGVib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF91dXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkRGF0dW1TcGxhdG5vc3RpKGdyaWRGb3JtYXQsIHtcclxuICAgICAgICAgICAgICAgIGVkaXRvcjogKCF3aXphcmQpID8ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnZGF0ZWJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV1cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNfdXBvX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMDE3XCIgLy9SQyAzMzYwMDAxNyA6IFN0YXYgemHDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRQb3BpcyhncmlkRm9ybWF0LCB7XHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6ICghd2l6YXJkKSA/IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGROa3MoZ3JpZEZvcm1hdCwge1xyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiAoIXdpemFyZCkgPyBmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc25rcygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvPXZhbHVlLmljbyxtb2RlbC5ua3M9dmFsdWUubmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rX29kOiB7IG86IFwiPD1cIiwgdjogdGhhdC5yb2sgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2tfZG86IHsgbzogXCI+PVwiLCB2OiB0aGF0LnJvayB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV6aW1fdWN0OiB7IG86IFwiIT1cIiwgdjogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhemJhVWNzTmFFa292bmtzOiB0aGF0LnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGdyaWQuZmluZEZpZWxkcyhcIm5rc1wiKS5nZmllbGQoXCJzbWFydE5hdk5leHRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGZpZWxkT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHVlYTogeyBmb3JjZVN0YXRlOiB0cnVlLCBkaXNhYmxlZDogdHJ1ZSwgdGFiYmFibGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB1ZWI6IHsgZm9yY2VTdGF0ZTogdHJ1ZSwgZGlzYWJsZWQ6IHRydWUsIHRhYmJhYmxlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgdWVjOiB7IGZvcmNlU3RhdGU6IHRydWUsIGRpc2FibGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB1ZWQ6IHsgZm9yY2VTdGF0ZTogdHJ1ZSwgZGlzYWJsZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHVlZTogeyBmb3JjZVN0YXRlOiB0cnVlLCBkaXNhYmxlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgdWVmOiB7IGZvcmNlU3RhdGU6IHRydWUsIGRpc2FibGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB1ZWc6IHsgZm9yY2VTdGF0ZTogdHJ1ZSwgZGlzYWJsZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHVlaDogeyBmb3JjZVN0YXRlOiB0cnVlLCBkaXNhYmxlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgdWVpOiB7IGZvcmNlU3RhdGU6IHRydWUsIGRpc2FibGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB1ZWo6IHsgZm9yY2VTdGF0ZTogdHJ1ZSwgZGlzYWJsZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHRlMDogeyBmb3JjZVN0YXRlOiB0cnVlLCBkaXNhYmxlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgdGUxOiB7IGZvcmNlU3RhdGU6IHRydWUsIGRpc2FibGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB0ZTI6IHsgZm9yY2VTdGF0ZTogdHJ1ZSwgZGlzYWJsZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHRlMzogeyBmb3JjZVN0YXRlOiB0cnVlLCBkaXNhYmxlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgdGU0OiB7IGZvcmNlU3RhdGU6IHRydWUsIGRpc2FibGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB1ZWs6IHsgZm9yY2VTdGF0ZTogdHJ1ZSwgZGlzYWJsZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHVlbDogeyBmb3JjZVN0YXRlOiB0cnVlLCBkaXNhYmxlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgdWVtOiB7IGZvcmNlU3RhdGU6IHRydWUsIGRpc2FibGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB1ZW46IHsgZm9yY2VTdGF0ZTogdHJ1ZSwgZGlzYWJsZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHRlNTogeyBmb3JjZVN0YXRlOiB0cnVlLCBkaXNhYmxlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgdGU2OiB7IGZvcmNlU3RhdGU6IHRydWUsIGRpc2FibGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB0ZTc6IHsgZm9yY2VTdGF0ZTogdHJ1ZSwgZGlzYWJsZWQ6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHRlODogeyBmb3JjZVN0YXRlOiB0cnVlLCBkaXNhYmxlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgdGU5OiB7IGZvcmNlU3RhdGU6IHRydWUsIGRpc2FibGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFNvcnRlZEVrb0NmdVNldChcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFZGl0YWJsZTogIXdpemFyZCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBcIndpdGhvdXRDaGVja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkT3B0aW9uczogZmllbGRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDAxOFwiLCAvL1JDIDMzNjAwMDE4IDogxZjDoWRlayBGVUNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3B1xaF0xJtuw60gYWt0aXZuw60gb3BlcmFjZSBuYWQgesOhem5hbWVtL3kgKHdpemFyZClcclxuICAgICAgICAgKiBAcGFyYW0gb3BlcmF0aW9uIFR5cCBvcGVyYWNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBvcGVyYXRpb25SdW4ob3BlcmF0aW9uOiBJbnRlcmZhY2UuR1NtbHNwenBVcHNlcnRPcGVyYWNlKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGlzLiRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA8IDEpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHZhciB3aXphcmRDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8YW55Pj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwiVmVjbnlQcm9maWxXaXphcmQjXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5nZXRUaXRsZU9yRGVzY3JpcHRpb24ob3BlcmF0aW9uLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCh0cnVlKSxcclxuICAgICAgICAgICAgICAgIGtleXM6IHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmtleXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBzZWxlY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlNtbHB6cC5jaGVja01hc3NQZXJtaXNzaW9uc0JlZm9yZU9wZXJhdGlvbih7ZHRvczogZGF0YSwgb3BlcmFjZTogb3BlcmF0aW9uLCBpeHA6IHRoaXMuc21scGlkX3AuaXhwX3NtbF9wcml9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDA4NlwiLCAvL1JDIDMzNjAwMDg2IDogVsO9YsSbciB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMDg2XCIsIC8vUkMgMzM2MDAwODYgOiBWw71ixJtyIHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmdldFRpdGxlT3JEZXNjcmlwdGlvbihvcGVyYXRpb24sIGZhbHNlKSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuU21scHpwLm1hc3NPcGVyYXRpb24oeyBkdG9zOiBkYXRhLCBvcGVyYWNlOiBvcGVyYXRpb24sIGl4cDogdGhpcy5zbWxwaWRfcC5peHBfc21sX3ByaSB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpemFyZENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5TbWxwenAuY2hlY2tNYXNzUGVybWlzc2lvbnNCZWZvcmVPcGVyYXRpb24oeyBkdG9zOiBkYXRhLCBvcGVyYWNlOiBvcGVyYXRpb24sIGl4cDogdGhpcy5zbWxwaWRfcC5peHBfc21sX3ByaSB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMzNjAwMDg3XCIsIC8vUkMgMzM2MDAwODcgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMDg4XCIgLy9SQyAzMzYwMDA4OCA6IFbDvXNsZWRlayBocm9tYWRuw6kgb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpemFyZENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2l6YXJkQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBPdGV2xZllbsOtIGRpYWxvZ3Ugc2Ugc2V6bmFtZW0gw7rEjWV0bsOtY2gga29udHJvbCovXHJcbiAgICAgICAgcHJpdmF0ZSB1Y2V0bmlLb250cm9sYSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlNtbHB6cC5hcmVBbGxJdGVtc0VuYWJsZWRPckNhbmNlbGxlZCh7IGl4cF9zbWxfcHJpOiB0aGlzLnNtbHBpZF9wLml4cF9zbWxfcHJpISB9KS5nZXQoKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoW1wiR29yZGljLkVrby5XZWJDbGllbnQuR0Vrb1NjaHZhbG92YWNpUHJvY2VzU2V6bmFtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICB1aWQ6IFwiRWtvU2NodmFsb3ZhY2lQcm9jZXNTZXpuYW0jXCIsXHJcbiAgICAgICAgICAgICAgICB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIEl4cDogdGhpcy5zbWxwaWRfcC5peHBfc21sX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICBLdGdUeXA6IFsxNjBdLFxyXG4gICAgICAgICAgICAgICAgICAgIEt0Z1R5cEZpbHRlcjogWzE2MF0sXHJcbiAgICAgICAgICAgICAgICAgICAgUm9rOiB0aGlzLnJvayxcclxuICAgICAgICAgICAgICAgICAgICBFbmFibGVkUG9kYW5pVWs6IHRoaXMuc21scGlkX3AucHJpcGFkPy51az8ubnVtX2FrdCA9PSAwICYmIHJlcyxcclxuICAgICAgICAgICAgICAgICAgICBFbmFibGVkU3Rvcm5vVnlyaXpVazogKHRoaXMuc21scGlkX3AucHJpcGFkPy51az8uc3Rhdl92eXJpeiA/PyAtMSkgPj0gSW50ZXJmYWNlLlN0YXZWeXJpemVuaS5uZ19zdGF2dnlyaXpOYXZyaCxcclxuICAgICAgICAgICAgICAgICAgICBVZGFqZVByaW1hcm5paG9Eb2tsYWR1Rks6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWNfYWc6IHRoaXMuc21scGlkX3AuYWNfc21sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfdHlwOiB0aGlzLnNtbHBpZF9wLml4c190eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19lc3U6IHRoaXMuc21scGlkX3AuaXhzX2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9waXM6IHRoaXMuc21scGlkX3AucHJpcGFkPy5wb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY19tZW5hOiB0aGlzLnNtbHBpZF9wLnByaXBhZD8uY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW5hOiB0aGlzLnNtbHBpZF9wLnByaXBhZD8ubWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY19jZWxrOiB0aGlzLnNtbHBpZF9wLnByaXBhZD8uYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY19zY2g6IHRoaXMuc21scGlkX3AucHJpcGFkPy5zbWxyb2s/LmMsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBSZXBvcnRQYXJhbXNGSzogeyBYMDAwMjogdGhpcy5zbWxwaWRfcC5peHAgfVxyXG4gICAgICAgICAgICAgICAgfSkuY3JlYXRlRGlhbG9nUHJvbWlzZSgpLnRoZW4oKHJldFZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWQoeyBjaGFuZ2VkOiB0aGlzLmNoYW5nZWQsIHNtbHBpZF9wOiB2b2lkIDAsIGl4cDogdGhpcy5zbWxwaWRfcC5peHAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3RldsWZZW7DrSBkZXRhaWx1IHBvaHlidSB2ZSBGVUN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsUG9oeWJ1VmVGdWMoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1w6FsbsOtIHZ5YnJhbsOhIHBvbG/FvmthXHJcbiAgICAgICAgICAgIGxldCBha3RQb2wgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuU21sLkludGVyZmFjZS5HU21sc3B6cER0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmIChha3RQb2wgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChha3RQb2wucmFkZWtfdXBvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1IHBvbG/Fvmt5IHYgcHJpbcOhcm7DrSBhZ2VuZMSbXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNtbFV0aWxzLm9wZW5EZXRhaWxJbk90aGVyVGFiKEdvcmRpYy5TbWwuR2xvYmFscy5FbnVtcy5UeXBBZy5GVUMsIGFrdFBvbC5peHBfc21sX3ByaSwgYWt0UG9sLnJhZGVrX3Vwbz8udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb2h5YiB2ZSBGVUN1IHphdMOtbSBuZWJ5bCB2eXR2b8WZZW5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLm1lc3NhZ2VCb3goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMzYwMDQ5OFwiLCAvL1JDIDMzNjAwNDk4IDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczoyNDEwMDA3OFwiIC8vUkMgMjQxMDAwNzggOiDDmsSNZXRuw60gcG9oeWIgdiBhZ2VuZMSbIEZVQyBuZWV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgKS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFrDrXNrw6Fuw60gdGl0aWxrdSBuZWJvIHBvcGlzdSBocm9tYWRuw6kgb3BlcmFjZVxyXG4gICAgICAgICAqIEBwYXJhbSBvcGVyYXRpb24gQWt0dcOhbG7DrSBvcGVyYWNlXHJcbiAgICAgICAgICogQHBhcmFtIHRpdGxlIFDFmcOtem5haywgemRhIHNlIGplZG7DoSBvIHRpdHVsZWsgbmVibyBwb3Bpc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0VGl0bGVPckRlc2NyaXB0aW9uKG9wZXJhdGlvbjogSW50ZXJmYWNlLkdTbWxzcHpwVXBzZXJ0T3BlcmFjZSwgdGl0bGU6IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuR1NtbHNwenBVcHNlcnRPcGVyYWNlLnZhbGlkYXRlOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aXRsZSkgeyByZXR1cm4gXCJqcmVzOjMzNjAwMDg5XCI7IH0gLy9SQyAzMzYwMDA4OSA6IEhyb21hZG7DqSBzY2h2w6FsZW7DrSBwb2xvxb5layDDusSNZXRuw61obyBwcm9maWx1XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzYwMDA5MFwiOyAvL1JDIDMzNjAwMDkwIDogQWtjZSBzY2h2YWx1amUgdnlicmFuw6kgKHphxaFrcnRudXTDqSkgcG9sb8W+a3kgw7rEjWV0bsOtaG8gcHJvZmlsdS4gUG8gamVqw61tIHByb3ZlZGVuw60gYnVkb3UgdHl0byBwb2xvxb5reSB2ZSBzdGF2dSAnc2NodsOhbGVubydcclxuICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkdTbWxzcHpwVXBzZXJ0T3BlcmFjZS56cnVzaXRWYWxpZGF0ZTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGUpIHsgcmV0dXJuIFwianJlczozMzYwMDA5MVwiOyB9IC8vUkMgMzM2MDAwOTEgOiBIcm9tYWRuw6kgenJ1xaFlbsOtIHNjaHbDoWxlbsOtIHBvbG/FvmVrIMO6xI1ldG7DrWhvIHByb2ZpbHVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNjAwMDkyXCI7IC8vUkMgMzM2MDAwOTIgOiBBa2NlIHpydcWhw60gc2NodsOhbGVuw60gdnlicmFuw71jaCAoemHFoWtybnV0w71jaCkgcG9sb8W+ZWsgw7rEjWV0bsOtaG8gcHJvZmlsdS4gUG8gamVqw61tIHByb3ZlZGVuw60gYnVkb3UgdHl0byBwb2xvxb5reSB2ZSBzdGF2dSAnZXZpZG92w6FubydcclxuICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkdTbWxzcHpwVXBzZXJ0T3BlcmFjZS5zdG9ybm86XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlKSB7IHJldHVybiBcImpyZXM6MzM2MDAwOTNcIjsgfSAvL1JDIDMzNjAwMDkzIDogSHJvbWFkbsOpIHN0b3JubyBwb2xvxb5layDDusSNZXRuw61obyBwcm9maWx1XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzYwMDA5NFwiOyAvL1JDIDMzNjAwMDk0IDogQWtjZSBzdG9ybnVqZSB2eWJyYW7DqSAoemHFoWtydG51dMOpKSBwb2xvxb5reSDDusSNZXRuw61obyBwcm9maWx1LiBQbyBqZWrDrW0gcHJvdmVkZW7DrSBidWRvdSB0eXRvIHBvbG/Fvmt5IHZlIHN0YXZ1ICdzdG9ybm92w6FubydcclxuICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkdTbWxzcHpwVXBzZXJ0T3BlcmFjZS56cnVzaXRTdG9ybm86XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpdGxlKSB7IHJldHVybiBcImpyZXM6MzM2MDAwOTVcIjsgfSAvL1JDIDMzNjAwMDk1IDogSHJvbWFkbsOpIHpydcWhZW7DrSBzdG9ybmEgcG9sb8W+ZWsgw7rEjWV0bsOtaG8gcHJvZmlsdVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM2MDAwOTZcIjsgLy9SQyAzMzYwMDA5NiA6IEFrY2UgenJ1xaHDrSBzdG9ybm8gdnlicmFuw71jaCAoemHFoWtydG51dMO9Y2gpIHBvbG/FvmVrIMO6xI1ldG7DrWhvIHByb2ZpbHUuIFBvIGplasOtbSBwcm92ZWRlbsOtIGJ1ZG91IHR5dG8gcG9sb8W+a3kgdmUgc3RhdnUgJ2V2aWRvdsOhbm8nXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXbDrSBlZGl0b3ZhdGVsbm9zdCBwb2zDrSB2xJt0eS4gKHVlYSx1ZWIgLSBuZWx6ZSBtxJtuaXQgcnVrYW1hIC0gamUgesOhdmlzbMO9IG5hIHR5cHUgw7rEjWV0bsOtaG8gcMWZw61wYWR1KVxyXG4gICAgICAgICAqIEBwYXJhbSBlbmFibGUgWmRlIHBvdm9saXQgZWRpdG92YXRlbG5vc3QgbmVibyB6YWvDoXphdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0RW5hYmxlUnMoZW5hYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQuZmluZEZpZWxkcyhcInVlYyx1ZWQsdWVlLHVlZix1ZWcsdWVoLHVlaSx1ZWosdGUwLHRlMSx0ZTIsdGUzLHRlNCx1ZWssdWVsLHVlbSx1ZW4sdGU1LHRlNix0ZTcsdGU4LHRlOVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhZW5hYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlc2V0IGhvZG5vdCBkYXRvdsOpIHbEm3R5XHJcbiAgICAgICAgICogQHBhcmFtIGRhdGEgZHRvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZXNldFJTVmFsdWVzKGRhdGE6IEludGVyZmFjZS5HU21sc3B6cER0bykge1xyXG4gICAgICAgICAgICBkYXRhLnVlYSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGF0YS51ZWIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGRhdGEudWVjID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkYXRhLnVlZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGF0YS51ZWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGRhdGEudWVmID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkYXRhLnVlZyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGF0YS51ZWggPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGRhdGEudWVpID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkYXRhLnVlaiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGF0YS50ZTAgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGRhdGEudGUxID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkYXRhLnRlMiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGF0YS50ZTMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGRhdGEudGU0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkYXRhLnVlayA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGF0YS51ZWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGRhdGEudWVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkYXRhLnVlbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGF0YS50ZTUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGRhdGEudGU2ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkYXRhLnRlNyA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGF0YS50ZTggPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGRhdGEudGU5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE5hc3RhdmVuw60gcG92b2xlbsOtIGhyb21hZG7DvWNoIGFrY8OtICsgdGlza3UgcG9kbGUgdnN0dXB1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRBY3Rpb25zRW5hYmxlKGVuYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VmFsaWRhdGU/LnVwZGF0ZVBlcm1pc3Npb24oe3ZhbHVlOiBlbmFibGV9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFpydXNpdFZhbGlkYXRlPy51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGVuYWJsZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFN0b3Jubz8udXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBlbmFibGUgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RacnVzaXRTdG9ybm8/LnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogZW5hYmxlIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsUG9oeWJ1RnVjPy51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGVuYWJsZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFByaW50Py51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGVuYWJsZSB9KTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59Il19