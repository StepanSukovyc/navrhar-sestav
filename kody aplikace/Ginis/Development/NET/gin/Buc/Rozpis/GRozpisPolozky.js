"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Buc.WebClient.GRozpisPolozky.ts                      </Name>
//    <Description> Dialog s rozpisem položky                                   </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-02-04                                                  </Created>
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
            /**Dialog s rozpisem položky */
            let GRozpisPolozky = class GRozpisPolozky extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Číselná řada pro pozdější přesné určení nového řádku (pro delete)*/
                    this.polozkyNewId = 0;
                    /** Příznak režimu vytvoření nových záznamů (-1 - Soubor, 0 - Předpisy, 1 - Dávky A-V, 2 - SIPO, 3 - Avíza, 4 - Vratky B, 5 - Napojení poplatnící DDP, 6 - Dopočítat/kopírovat)*/
                    this.rezim_vytvoreni = 0; //bylo void 0, proč?
                    /** Číslo dávky, které bylo použito při režimu vytvoření > 0*/
                    this.aktualni_davka = 0; //bylo void 0, proč?
                }
                onContentReady() {
                    if ((this.dtoPolVypis.pokyn?.length ?? 0) > 0) {
                        this.showFlash({ content: "jres:33600371" + this.dtoPolVypis.pokyn, state: "info" });
                    } //RC 33600371 : <b>Pokyn: </b>
                    this.castky = { c: parseDecimal(this.dtoPolVypis.c ?? 0), c_roz: parseDecimal(0), c_zby: parseDecimal(0) };
                    this.createActions();
                    this.createMenuBar();
                    this.createCommandBar();
                    this.createGrid();
                }
                /** Metoda voladá při zavírání rozpisu - dotaz při případných změnách dokladu */
                closing() {
                    let that = this;
                    // kontrola na změněné položky
                    const polozkyChanged = this.$grid.ggrid("getView").getDataRows().filter(x => x.flagEdited == 1 || x.flagEdited == 2).length > 0;
                    if (polozkyChanged) {
                        // dotaz na zavření bez uložení, protože se něco změnilo
                        return Gordic.Eko.Detail.messageBoxUnsavedData(that)
                            .createDialogPromise([GDlg.mbbYes.id, GDlg.mbbNo.id])
                            .then(function (retVal) {
                            if (retVal === GDlg.mbbYes.id) {
                                // uložení dat
                                return that.ulozit(true)
                                    .then(function () {
                                    return { changed: that.changed };
                                });
                            }
                            else {
                                return { changed: that.changed };
                            }
                        });
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        return { changed: that.changed };
                    }
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        actUlozit: Gordic.Eko.Action.actionEvidovat({
                            permission: this.servicePermissions.LzeEditovat,
                            run: function () {
                                this.setPending(that.ulozit());
                            }
                        }),
                        actPredpisy: {
                            caption: "jres:33600372", //RC 33600372 : Předpisy
                            tooltip: "jres:33600373", //RC 33600373 : Dohledání položek rozpisu v seznamu očekávaných plateb
                            permission: this.servicePermissions.LzePredpisy,
                            run: function (ev, ctx) {
                                this.setPending(that.predpisy());
                            }
                        },
                        actDavkyAV: {
                            caption: "jres:33600374", //RC 33600374 : Dávky A-V
                            tooltip: "jres:33600375", //RC 33600375 : Rozepsání dávky složenek A-V
                            permission: this.servicePermissions.LzeDavkyAV,
                            run: function (ev, ctx) {
                                this.setPending(that.davkyAV());
                            }
                        },
                        actDavkySIPO: {
                            caption: "jres:33600376", //RC 33600376 : Dávky SIPO
                            tooltip: "jres:33600377", //RC 33600377 : Rozepsání dávky plateb SIPO
                            permission: this.servicePermissions.LzeDavkySIPO,
                            run: function (ev, ctx) {
                                this.setPending(that.davkySIPO());
                            }
                        },
                        actAviza: {
                            caption: "jres:33600378", //RC 33600378 : Avíza
                            tooltip: "jres:33600379", //RC 33600379 : Rozepsání dávky avíz platebních karet
                            permission: this.servicePermissions.LzeAviza,
                            run: function (ev, ctx) {
                                this.setPending(that.davkyAvizo());
                            }
                        },
                        actVratbaB: {
                            caption: "jres:33600380", //RC 33600380 : Vratka B
                            tooltip: "jres:33600381", //RC 33600381 : Dohledání spárované složenky B pro provedení rozpisu nedoručených složenek
                            permission: this.servicePermissions.LzeVratkaB,
                            run: function (ev, ctx) {
                                this.setPending(that.davkyVratkaB());
                            }
                        },
                        actSoubor: {
                            caption: "jres:33600382", //RC 33600382 : Soubor
                            permission: this.servicePermissions.LzeSoubor,
                            run: function (ev, ctx) {
                                this.setPending(that.soubor());
                            }
                        },
                        actKopirovat: {
                            caption: "jres:33600383", //RC 33600383 : Kopírovat
                            tooltip: "jres:33600384", //RC 33600384 : Kopíruje poslední řádek rozpisu
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.kopirovat());
                            }
                        },
                        actDopocitat: {
                            caption: "jres:33600385", //RC 33600385 : Dopočítat
                            tooltip: "jres:33600386", //RC 33600386 : Generování poslední položky rozpisu
                            enabled: false,
                            run: function (ev, ctx) {
                                this.setPending(that.dopocitat());
                            }
                        },
                        actOdparovat: {
                            caption: "jres:33600387", //RC 33600387 : Odpárovat
                            tooltip: "jres:33600388", //RC 33600388 : Spárovaná položka se změní na nespárovanou, dojde k odpárování
                            permission: this.servicePermissions.LzeOdparovat,
                            run: function (ev, ctx) {
                                //this.setPending(that.odparovat());
                                this.setPending(that.dialogs.error("TODO").createDialogPromise());
                            }
                        },
                        actStorno: {
                            caption: "jres:33600389", //RC 33600389 : Storno
                            tooltip: "jres:33600390", //RC 33600390 : Nastavení stavu položky NE- nespárovaná na stav NZ- nespárován-zrušen a obráceně
                            permission: this.servicePermissions.LzeStorno,
                            run: function (ev, ctx) {
                                this.setPending(that.storno());
                            }
                        },
                        actOdstranit: {
                            caption: "jres:33600391", //RC 33600391 : Odstranit
                            tooltip: "jres:33600392", //RC 33600392 : Vymazání položky rozpisu
                            permission: this.servicePermissions.LzeOdstranit,
                            run: function (ev, ctx) {
                                this.setPending(that.odstranit());
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
                        actTisk: Gordic.Eko.Action.actionTisk({
                            name: "actTisk",
                            enabled: true, //asi vždy povoleno?
                            tema: "buc_ptm_rozpol",
                            ixsStr: that.dbparams.buc_ptm_rozpol,
                            serverParameterMethod: "Gordic.Buc.WebClient.GRozpisPolozky:PrintParameters",
                            reportStarting: function (rep) {
                                rep.customDto = { ixp: that.ixp, radek_pol: that.radek_pol };
                            }
                        }),
                        //contextmenu
                        actZauctovat: {
                            caption: "jres:33600397", //RC 33600397 : Zaúčtovat
                            permission: this.servicePermissions.LzeZauctovat,
                            run: function () {
                                this.setPending(that.zauctovat());
                            }
                        },
                        actNapojeniPoplatniciDDP: {
                            caption: "jres:33600398", //RC 33600398 : Napojení poplatníci DDP
                            enabled: false,
                            run: function () {
                                this.setPending(that.napojeniPoplatniciDDP());
                            }
                        },
                        actPrilohy: {
                            caption: "jres:33600399", //RC 33600399 : Přílohy
                            enabled: false,
                            run: function () {
                                this.setPending(that.prilohy());
                            }
                        },
                        actUcetniZapisy: Gordic.Eko.Action.actionUcetniZapisy({
                            enabled: false,
                            run: function () {
                                this.setPending(that.ucetniZapisy());
                            }
                        }),
                        actDiagID: {
                            caption: "jres:33600400", //RC 33600400 : Diagnostické ID
                            enabled: false,
                            run: function () {
                                this.setPending(that.diagID());
                            }
                        },
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: (ev, ctx) => {
                                that.tryClose();
                            }
                        })
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar(["actPredpisy*", "actDavkyAV*", "actDavkySIPO*", "actAviza*", "actVratbaB*", "actSoubor*", "actKopirovat*",
                        "actDopocitat*", "actOdparovat*", "actStorno*", "actOdstranit*", "actParovano", "actHistorieParovani", "actPrilohy", "actNapojeniPoplatniciDDP",
                        "actZauctovat*", "actUcetniZapisy", "actDiagID", "actTisk*"]));
                }
                /** Vytvoření commandbaru */
                createCommandBar() {
                    this.commandBar(this.actions.createBar(["actUlozit!", "actZavrit*"]));
                }
                /**Vytvoření gridu*/
                createGrid() {
                    const that = this;
                    this.$grid = $.newDiv().appendTo(this.element)
                        .ggrid({
                        name: "gridRozpisPolozky",
                        columnMode: "full",
                        multi: true,
                        marking: true,
                        columns: this.createGridFormat(),
                        contextMenu: this.actions.createBar(["actParovano", "actHistorieParovani", "actPrilohy", "actNapojeniPoplatniciDDP", "actUcetniZapisy", "actDiagID"]),
                        data: new Gordic.Isl.View(this.isl.BucRozpisPolozky.list({
                            filters: { ixp: this.ixp, radek_pol: this.radek_pol },
                            fragments: ["Permissions"]
                        }), {
                            key: ["ixp", "radek_pol", "subradek", "radek_av", "new_id"],
                            onResponse: (data) => {
                                for (let row of data.data) {
                                    this.castky.c_roz = this.castky.c_roz.plus(parseDecimal(row.c ?? 0));
                                }
                                this.castky.c_zby = this.castky.c.minus(this.castky.c_roz);
                                this.setGridStatusWidget();
                                if (data.data.length > 0) {
                                    this.actions.actKopirovat?.enabled((this.servicePermissions.LzeKopirovat?.value ?? false) && !this.castky.c_zby.equals(0));
                                    this.actions.actDopocitat?.enabled((this.servicePermissions.LzeDopocitat?.value ?? false) && !this.castky.c_zby.equals(0));
                                }
                                return data;
                            }
                        }),
                        profileBeforeChange: (ev, obj) => {
                            // pokud se edituje, nejsou povoleny změny v gridu
                            return (this.$grid?.find(".row.editing")?.length ?? 0) < 1;
                        },
                        defaultProfile: {
                            sort: "radek_av",
                            condFormats: [
                                {
                                    formula: "@s_pol == 40",
                                    description: "jres:33600401", //RC 33600401 : Stav 'nespárováno'
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                                },
                                {
                                    formula: "@s_pol == 30 or @s_pol == 35",
                                    description: "jres:33600402", //RC 33600402 : Stav 'spárováno do účetnictví' nebo 'spárován do FUC'
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.purple
                                },
                                {
                                    formula: "@s_pol == 20 or @s_pol == 25 or @s_pol == 27", //20 je v TK DarkGreen, ale to ve WK není
                                    description: "jres:33600403", //RC 33600403 : Stav 'spárováno automaticky' nebo 'spárováno manuálně' nebo 'spárováno rozpisem plateb'
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.green
                                },
                                {
                                    formula: "@s_pol == 50",
                                    description: "jres:33600404", //RC 33600404 : Stav 'nespárován-zrušen'
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.blue //v TK teal
                                },
                                {
                                    formula: "@c < 0",
                                    description: "jres:33600405", //RC 33600405 : Částka menší než 0
                                    text: Gordic.Components.Grid.CondFormats.CondFormatText.red,
                                    applyTo: "c,c_mena"
                                },
                            ],
                        },
                        selection: (ev, obj) => {
                            let row = Gordic.Eko.Grid.currentRow($(ev.target));
                            row = row;
                            if (row != void 0) {
                                this.actions.actEditovat?.updatePermission(row.Permissions, "LzeEditovat");
                                this.actions.actParovano?.updatePermission(row.Permissions, "LzeParovano");
                                this.actions.actUcetniZapisy?.updatePermission(row.Permissions, "LzeUcetniZapisy");
                                this.actions.actNapojeniPoplatniciDDP?.enabled((row.ixp_pl ?? "").trim().length == 12); //je to pid
                                this.actions.actHistorieParovani?.enabled((row.new_id) ? false : true);
                                this.actions.actPrilohyPolozky?.enabled((row.new_id) ? false : true);
                                this.actions.actDiagIDPolozky?.enabled((row.new_id) ? false : true);
                            }
                            else {
                                this.actions.actEditovat?.enabled(false);
                                this.actions.actParovano?.enabled(false);
                                this.actions.actUcetniZapisy?.enabled(false);
                                this.actions.actNapojeniPoplatniciDDP?.enabled(false);
                                this.actions.actHistorieParovani?.enabled(false);
                                this.actions.actPrilohyPolozky?.enabled(false);
                                this.actions.actDiagIDPolozky?.enabled(false);
                            }
                        }
                    }).ggridroweditor({
                        allowCopy: true,
                        beforeStart: (ev, info) => {
                            //kontrola povolení editace
                            //permission pro editaci
                            if (!(info.cellInfo.data.Permissions?.LzeEditovat?.value ?? false)) {
                                ev.preventDefault();
                                return;
                            }
                        },
                        start: (ev, obj) => {
                            //this.$grid.findFields().gfield("model", "validators", that.validatorsPolozky);
                            that.actions.actOdstranit?.enabled(false);
                            that.actions.actStorno?.enabled(false);
                            that.actions.actZauctovat?.enabled(false);
                        },
                        save: (data, obj) => {
                            if ((data.flagEdited ?? 2) > 1 && that.$grid.findFields().gform("hasChanged")) {
                                //editace
                                data.flagEdited = 2;
                            }
                            this.castky.c_roz = this.castky.c_roz.minus(parseDecimal(obj.cellInfo.data.c ?? 0)); //odečtení původní částky
                            this.setCRoz(parseDecimal(data.c ?? 0)); //přičtení nové částky
                            that.setGridStatusWidget();
                            that.actions.actStorno.updatePermission(that.servicePermissions.LzeStorno);
                            that.actions.actOdstranit.updatePermission(that.servicePermissions.LzeOdstranit);
                            that.actions.actZauctovat.updatePermission(that.servicePermissions.LzeZauctovat);
                        },
                        cancel: (ev, obj) => {
                            that.actions.actStorno.updatePermission(that.servicePermissions.LzeStorno);
                            that.actions.actOdstranit.updatePermission(that.servicePermissions.LzeOdstranit);
                            that.actions.actZauctovat.updatePermission(that.servicePermissions.LzeZauctovat);
                        }
                    })
                        .gautofit({ resizersOnTab: false });
                    this.setGridStatusWidget();
                }
                /**
                 * Definice gridformátu pro rozpis položky
                 * @returns
                 */
                createGridFormat() {
                    const that = this;
                    let columns = new Gordic.Data.GridFormat();
                    columns.addTextColumn({
                        name: "s_pol_zkr" /* Interface.GRozpisPolozkyDtoNames.s_pol_zkr */,
                        caption: "jres:33600118", //RC 33600118 : S 
                        description: "jres:33600119", //RC 33600119 : Stav položky
                        width: 32,
                        cellTemplate: (data) => { return data.s_pol_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_pol_txt ?? ""; },
                        fragment: "s_pol_zkr" /* Interface.GRozpisPolozkyDtoFragments.s_pol_zkr */
                    });
                    columns.addTextColumn({
                        name: "s_zau_zkr" /* Interface.GRozpisPolozkyDtoNames.s_zau_zkr */,
                        caption: "jres:33600121", //RC 33600121 : U 
                        description: "jres:33600122", //RC 33600122 : Stav zaúčtování
                        width: 32,
                        cellTemplate: (data) => { return data.s_zau_zkr ?? ""; },
                        tooltipTemplate: (data) => { return data.s_zau_txt ?? ""; },
                        fragment: "typ_vypis_zkr" /* Interface.GRozpisPolozkyDtoFragments.s_zau_zkr */
                    });
                    columns.addTextColumn({
                        name: "ac_uct" /* Interface.GRozpisPolozkyDtoNames.ac_uct */,
                        caption: "jres:33600123", //RC 33600123 : Čís.úč.dok.
                        description: "jres:33600124", //RC 33600124 : Číslo účetního dokladu
                        width: 120,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.ac_uct */
                    });
                    columns.addBankovniUcetCizi({
                        name: "ucet_ci" /* Interface.GRozpisPolozkyDtoNames.ucet_ci */,
                        field: "ucet_ci" /* Interface.GRozpisPolozkyDtoNames.ucet_ci */,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.ucet_ci */
                    });
                    columns.addCurrencyColumn({
                        name: "c" /* Interface.GRozpisPolozkyDtoNames.c */,
                        caption: "jres:33600130", //RC 33600130 : Částka v CZK
                        width: 120,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.c */,
                        editor: {
                            widget: "gnumberbox",
                            options: [Gordic.Prefabs.Number.currency(), {
                                    name: "c" /* Interface.GRozpisPolozkyDtoNames.c */,
                                    validators: [
                                        new Gordic.Validators.Required()
                                        //new Gordic.Validators.Base({
                                        //    message: "jres:33600131", //RC 33600131 : Částka v CZK nesmí být nulová
                                        //    validate: (val, src) => { return !parseDecimal(val ?? 0).equals(0); }
                                        //})
                                    ],
                                    flag: "required",
                                    change: (ev, ctx) => {
                                        //částka měny
                                        const mena = that.$grid.findFields("mena").gfield("getValue").mena;
                                        if (mena == 0) {
                                            that.$grid.findFields("c_mena").gfield("setValue", ctx.value);
                                        }
                                    }
                                }]
                        }
                    });
                    columns.addTextColumn({
                        name: "vs" /* Interface.GRozpisPolozkyDtoNames.vs */,
                        caption: "jres:33600125", //RC 33600125 : VS
                        description: "jres:33600126", //RC 33600126 : Variabilní symbol
                        width: 120,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.vs */,
                        editor: {
                            widget: "gstringbox",
                            options: [{
                                    name: "vs" /* Interface.GRozpisPolozkyDtoNames.vs */,
                                }]
                        }
                    });
                    columns.addTextColumn({
                        name: "ks" /* Interface.GRozpisPolozkyDtoNames.ks */,
                        caption: "jres:33600140", //RC 33600140 : KS
                        description: "jres:33600141", //RC 33600141 : Konstantní symbol
                        width: 120,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.ks */
                    });
                    columns.addTextColumn({
                        name: "ss" /* Interface.GRozpisPolozkyDtoNames.ss */,
                        caption: "jres:33600142", //RC 33600142 : SS
                        description: "jres:33600143", //RC 33600143 : Specifický symbol
                        width: 120,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.ss */,
                        editor: {
                            widget: "gstringbox",
                            options: [{
                                    name: "ss" /* Interface.GRozpisPolozkyDtoNames.ss */,
                                }]
                        }
                    });
                    columns.addDateColumn({
                        name: "dat_zap" /* Interface.GRozpisPolozkyDtoNames.dat_zap */,
                        caption: "jres:33600136", //RC 33600136 : Zaplaceno
                        description: "jres:33600137", //RC 33600137 : Datum zaplacení
                        width: 110,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.dat_zap */,
                        editor: {
                            widget: "gdatebox",
                            options: [{
                                    name: "dat_zap" /* Interface.GRozpisPolozkyDtoNames.dat_zap */,
                                    flag: "required",
                                    validators: [
                                        new Gordic.Validators.Required(),
                                        //new Gordic.Validators.Base({
                                        //    message: "jres:33600138", //RC 33600138 : Datum nesmí být menší než datum počátečního zůstatku
                                        //    validate: (val, src) => { return !(parseDate(val) < parseDate(that.findFields("dat_str_zus").gfield("getValue"))); }
                                        //}),
                                        //new Gordic.Validators.Base({
                                        //    message: "jres:33600139", //RC 33600139 : Datum nesmí být větší než datum konečného zůstatku
                                        //    validate: (val, src) => { return !(parseDate(val) > parseDate(that.findFields("dat_nov_zus").gfield("getValue"))); }
                                        //}),
                                    ]
                                }]
                        }
                    });
                    columns.addDateColumn({
                        name: "dat_odp" /* Interface.GRozpisPolozkyDtoNames.dat_odp */,
                        caption: "jres:33600406", //RC 33600406 : Datum UUP
                        description: "jres:33600407", //RC 33600407 : Datum uskutečnění účetního případu
                        width: 110,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.dat_odp */,
                        editor: {
                            widget: "gdatebox",
                            options: [{
                                    name: "dat_odp" /* Interface.GRozpisPolozkyDtoNames.dat_odp */,
                                    //flag: "required",
                                    //validators: [
                                    //    new Gordic.Validators.Base({
                                    //        message: "jres:33600138", //RC 33600138 : Datum nesmí být menší než datum počátečního zůstatku
                                    //        validate: (val, src) => { return !(parseDate(val) < parseDate(that.findFields("dat_str_zus").gfield("getValue"))); }
                                    //    }),
                                    //    new Gordic.Validators.Base({
                                    //        message: "jres:33600139", //RC 33600139 : Datum nesmí být větší než datum konečného zůstatku
                                    //        validate: (val, src) => { return !(parseDate(val) > parseDate(that.findFields("dat_nov_zus").gfield("getValue"))); }
                                    //    }),
                                    //]
                                }]
                        }
                    });
                    columns.addTextColumn({
                        name: "nazev" /* Interface.GRozpisPolozkyDtoNames.nazev */,
                        caption: "jres:33600144", //RC 33600144 : Veřejný popis
                        width: 200,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.nazev */,
                        editor: {
                            widget: "gstringbox",
                            options: [{
                                    name: "nazev" /* Interface.GRozpisPolozkyDtoNames.nazev */,
                                }]
                        }
                    });
                    columns.addTextColumn({
                        name: "mena_txt" /* Interface.GRozpisPolozkyDtoNames.mena_txt */,
                        caption: "jres:33600132", //RC 33600132 : Měna
                        width: 60,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.mena_txt */,
                        editor: {
                            widget: "gselectbox",
                            options: [Gordic.Prefabs.Select.ekocmen(), {
                                    name: "mena" /* Interface.GRozpisPolozkyDtoNames.mena */,
                                    model: "model.mena=value.mena;model.mena_sis_aaa=>value.mena_txt",
                                    serverFilters: {
                                        aktivita: 100
                                    },
                                    //change: (ev, ctx) => {
                                    //    const c_mena_field = that.$gridPolozky.findFields("c_mena");
                                    //    if (ctx.value.mena == 0 && parseDecimal(c_mena_field.gfield("getValue") ?? 0)) {
                                    //        c_mena_field.gfield("setValue", that.$gridPolozky.findFields("c").gfield("getValue"));
                                    //    }
                                    //}
                                }]
                        }
                    });
                    columns.addCurrencyColumn({
                        name: "c_mena" /* Interface.GRozpisPolozkyDtoNames.c_mena */,
                        caption: "jres:33600133", //RC 33600133 : Částka v měně
                        width: 120,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.c_mena */,
                        editor: {
                            widget: "gnumberbox",
                            options: [Gordic.Prefabs.Number.currency(), {
                                    name: "c_mena" /* Interface.GRozpisPolozkyDtoNames.c_mena */,
                                    validators: [
                                        new Gordic.Validators.Required(),
                                        //new Gordic.Validators.Base({
                                        //    message: "jres:33600134", //RC 33600134 : Částka v měně nesmí být nulová
                                        //    validate: (val, src) => { return !parseDecimal(val ?? 0).equals(0); }
                                        //}),
                                        new Gordic.Validators.Base({
                                            message: "jres:33600135", //RC 33600135 : Nesouhlasí znaménka částek
                                            validate: (val, src) => { return (parseDecimal(val ?? 0).times(that.$grid.findFields("c").gfield("getValue"))).greaterThanOrEqualTo(0); }
                                        })
                                    ],
                                    flag: "required",
                                    //change: (ev, ctx) => {
                                    //    const mena = that.findFields("ucet_vl").gfield("getValue")?.mena;
                                    //    if ((that.DetailDto.s_bvy ?? 0) < 35 && mena != 0) {
                                    //        const dat_nov_zus = that.findFields("dat_nov_zus").gfield("getValue");
                                    //        that.isl.BankovniVypisBuc.najdiKurzovniListekAPrevedZMenyDoCzk({ datum: dat_nov_zus, c_mena: ctx.value, mena: mena }).get().then((c) => {
                                    //            that.$gridPolozky.findFields("c").gfield("setValue", c);
                                    //        })
                                    //    }
                                    //}
                                }]
                        }
                    });
                    columns.addDateColumn({
                        name: "dat_val" /* Interface.GRozpisPolozkyDtoNames.dat_val */,
                        caption: "jres:33600146", //RC 33600146 : Valuta
                        description: "jres:33600147", //RC 33600147 : Datum valuta
                        width: 110,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.dat_val */
                    });
                    columns.addTextColumn({
                        name: "vs2" /* Interface.GRozpisPolozkyDtoNames.vs2 */,
                        caption: "jres:33600148", //RC 33600148 : VS2
                        description: "jres:33600149", //RC 33600149 : Variabilní symbol - protistrany
                        width: 120,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.vs2 */,
                        editor: {
                            //stejně jak vs
                            widget: "gstringbox",
                            options: [{
                                    name: "vs2" /* Interface.GRozpisPolozkyDtoNames.vs2 */,
                                }]
                        }
                    });
                    columns.addTextColumn({
                        name: "ss2" /* Interface.GRozpisPolozkyDtoNames.ss2 */,
                        caption: "jres:33600150", //RC 33600150 : SS2
                        description: "jres:33600151", //RC 33600151 : Specifický symbol - protistrany
                        width: 120,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.ss2 */,
                        editor: {
                            //stejně jak vs
                            widget: "gstringbox",
                            options: [{
                                    name: "ss2" /* Interface.GRozpisPolozkyDtoNames.ss2 */,
                                }]
                        }
                    });
                    columns.addTextColumn({
                        name: "popis1" /* Interface.GRozpisPolozkyDtoNames.popis1 */,
                        caption: "jres:33600145", //RC 33600145 : Doplňkový popis
                        width: 200,
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.popis1 */,
                    });
                    columns.addTextColumn({
                        name: "zu_txt" /* Interface.GRozpisPolozkyDtoNames.zu_txt */,
                        caption: "jres:33600408", //RC 33600408 : Způsob úhrady
                        width: 130,
                        fragment: "zu_txt" /* Interface.GRozpisPolozkyDtoFragments.zu_txt */,
                        editor: function (obj) {
                            const disabledField = obj.cellInfo.data.zu == 30 || obj.cellInfo.data.rezim_vytvoreni > 0;
                            return {
                                widget: "gselectbox",
                                options: [Gordic.Prefabs.Select.ekoczuh(), {
                                        name: "zu" /* Interface.GRozpisPolozkyDtoNames.zu */,
                                        model: "model.zu=value.zu",
                                        disabled: disabledField,
                                        flag: "required",
                                        validators: [new Gordic.Validators.Required()],
                                        serverFilters: {
                                            zu: (!disabledField) ? [0, 10, 20, 25, 100] : void 0
                                        }
                                    }]
                            };
                        }
                    });
                    if (this.rppUus == 1) {
                        columns.addUus({
                            name: "uus" /* Interface.GRozpisPolozkyDtoNames.uus */,
                            field: "uus" /* Interface.GRozpisPolozkyDtoNames.uus */
                        });
                    }
                    columns.addNumberColumn({
                        name: "s_pol" /* Interface.GRozpisPolozkyDtoNames.s_pol */,
                        caption: "jres:33600154", //RC 33600154 : Stav (číselně)
                        fragment: "Base" /* Interface.GRozpisPolozkyDtoFragments.s_pol */,
                        hidden: true
                    });
                    return columns;
                }
                //#region Akce
                /** Výběr položek předpisů */
                predpisy(typ_doh = this.typ_doh) {
                    return Buc.Dialogs.GVyberUhradyDlg({
                        parentContent: this,
                        ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow,
                        opt: {
                            vs: this.dtoPolVypis.vs,
                            //ks: this.dtoPolVypis.ks,
                            ss: this.dtoPolVypis.ss,
                            sk_vl: this.dtoPolVypis.sk_vl,
                            bu_vl: this.dtoPolVypis.bu_vl,
                            sk_ci: this.dtoPolVypis.sk_ci,
                            bu_ci: this.dtoPolVypis.bu_ci,
                            c: this.castky.c,
                            typ_doh: typ_doh,
                            poc_doh: 0,
                            c_mena: this.dtoPolVypis.c_mena,
                            mena: this.dtoPolVypis.mena,
                            dat_vyp_vra: (typ_doh == 13) ? this.dat_vyp : void 0,
                            radek_in: [],
                            multiSelect: true
                        }
                    }).then((data) => {
                        if ((data ?? []).length == 0) {
                            return $.Deferred().reject().promise();
                        }
                        let prom = $.Deferred().resolve().promise();
                        if (typ_doh == 13) {
                            //356.13 - důvod vrácení pro vratky B
                            //SalModalDialog( dlgDuvVra,hWndForm, 'Důvod nevyplacení poštovní poukázky B', FALSE, nDuvVra, sDuvVra )
                            const form = new Gordic.Forms.Form()
                                .addRow("jres:33600409", true) //RC 33600409 : Důvod nevyplacení
                                .addField("gselectbox", Gordic.Prefabs.Select.buccssb(), {
                                name: "s_slob",
                                model: "model.s_slob=value.s_slob;model.s_slob_txt=value.s_slob_txt",
                                validators: [new Gordic.Validators.Required()],
                                serverFilters: {
                                    ide_rea: 2
                                }
                            });
                            prom = this.dialogs.simpleForm("jres:33600410", form).createDialogPromise().then((ctx) => {
                                if (ctx?.s_slob || ctx?.s_slob == 0) {
                                    return ctx;
                                }
                                else {
                                    return $.Deferred().reject().promise();
                                }
                            });
                        }
                        prom.then((duv_vra_dto) => {
                            let newDtos = [];
                            for (let row of data) {
                                let dto /* & {new_id: number, rezim_vytvoreni: number}*/ = {
                                    new_id: ++this.polozkyNewId,
                                    rezim_vytvoreni: 0,
                                    flagEdited: 1,
                                    typ_doh: typ_doh,
                                    sk_ci: this.dtoPolVypis.sk_ci,
                                    bu_ci: this.dtoPolVypis.bu_ci,
                                    ucet_ci: this.dtoPolVypis.bu_ci + "/" + this.dtoPolVypis.sk_ci,
                                    vs: row.vs,
                                    ks: row.ks,
                                    ss: row.ss,
                                    dat_zap: this.dtoPolVypis.dat_zap,
                                    dat_val: this.dtoPolVypis.dat_val,
                                    lic: row.lic,
                                    s_pol: 10 /* Interface.GBucGlobalsBase.SPol.Porizena */,
                                    mena: ((row.mena ?? -1) < 0) ? row.mena : 0,
                                    mena_txt: ((row.mena ?? -1) < 0) ? row.mena_txt : "CZK",
                                    dat_odp: this.dtoPolVypis.dat_odp,
                                    ixp_pok: this.dtoPolVypis.ixp_pok,
                                    Permissions: {
                                        LzeEditovat: { value: true },
                                        LzeRozpisPolozek: { value: true },
                                        LzeParovano: { value: false },
                                        LzeUcetniZapisy: { value: false },
                                    },
                                    sk_vl: this.dtoPolVypis.sk_vl,
                                    bu_vl: this.dtoPolVypis.bu_vl,
                                    ixp_predpis: row.ixp,
                                    radek_uhr_predpis: row.radek_uhr,
                                    davka_predpis: row.davka,
                                    sk_vl_predpis: row.sk_vl,
                                    bu_vl_predpis: row.bu_vl,
                                    radek_predpis: row.radek_uhr
                                };
                                const c = parseDecimal(row.c ?? 0);
                                const c_mena = parseDecimal(row.c_mena ?? 0);
                                const c_par = parseDecimal(row.c_par ?? 0);
                                const c_par_mena = parseDecimal(row.c_par_mena ?? 0);
                                //DDP
                                if (row.typ_ag == 350 && c.minus(c_par).lessThanOrEqualTo(0)) {
                                    if (typ_doh != 13) {
                                        //378.03X10  BucPep.c < 0 - Svozil
                                        if (c.lessThan(0)) {
                                            dto.c = c.minus(c_par);
                                            dto.c_mena = c_mena.minus(c_par_mena);
                                        }
                                        else {
                                            dto.c = parseDecimal(0);
                                            dto.c_mena = parseDecimal(0);
                                        }
                                    }
                                    else {
                                        dto.c = c.times(-1);
                                        dto.c_mena = c_mena.times(-1);
                                    }
                                }
                                else {
                                    if (typ_doh != 13) {
                                        dto.c = c.minus(c_par);
                                        dto.c_mena = c_mena.minus(c_par_mena);
                                    }
                                    else {
                                        dto.c = c.times(-1);
                                        dto.c_mena = c_mena.times(-1);
                                    }
                                }
                                if (typ_doh != 13) {
                                    dto.nazev = (this.dbparams.buc_rpnp == 0) ? row.nazev : this.dtoPolVypis.nazev;
                                    dto.zu = this.dtoPolVypis.zu;
                                    dto.zu_txt = this.dtoPolVypis.zu_txt;
                                }
                                else {
                                    dto.dat_vyp_vra_predpis = this.dat_vyp;
                                    dto.nazev = "jres:33600411".format(duv_vra_dto.s_slob_txt ?? "", row.nazev ?? ""); //RC 33600411 : Vratka PP B - {0} - {1}
                                    dto.zu = 30; //natvrdo a zakazat editaci
                                    dto.zu_txt = "jres:33600412"; //RC 33600412 : vratka B
                                    dto.duv_vra = duv_vra_dto.s_slob;
                                    dto.ixp_par = row.ixp;
                                    dto.cislo_par = row.radek_uhr;
                                }
                                //388.03X11 - zatím pouze příjmy POU
                                if (row.typ_ag == 180 && c.greaterThan(0)) {
                                    dto.ixp_par = row.ixp;
                                    dto.cislo_par = row.radek_uhr;
                                }
                                this.setCRoz(dto.c); //nastaví interně rozepsáno + zbývá
                                //Set nCMenaSum = nCMenaSum + tbl_Kp.c_mena
                                //388.03X11 - pokud je vybrán 1 předpis
                                if ( /*data.length == 1 && */row.typ_ag == 350) {
                                    dto.ixp_pl = row.ixp;
                                }
                                newDtos.push(dto);
                            }
                            this.$grid.ggrid("getView").updateData(newDtos, "add");
                            this.setGridStatusWidget();
                        });
                    });
                }
                /** Výběr dávky A-V*/
                davkyAV() {
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GDavkaAVSeznam", { uid: "GDavkaAVSeznam#" }], {
                        sk_vl: this.dtoPolVypis.sk_vl,
                        bu_vl: this.dtoPolVypis.bu_vl,
                        c_pre: this.dtoPolVypis.c,
                        mod: 1,
                        vs: this.dtoPolVypis.vs
                    }, { /*width: 580, height: 450*/}).createDialogPromise().then((davka) => {
                        if (davka || davka == 0) {
                            return this.dialogVolbaDataZaplaceni(0, "buc_duav").then((nDatZap) => {
                                return this.isl.BucRozpisPolozky.listDavkyAV({ davka: davka, ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol }).getData().then((data) => {
                                    if (data?.length > 0) {
                                        this.aktualni_davka = davka;
                                        for (let row of data) {
                                            row.new_id = ++this.polozkyNewId;
                                            row.rezim_vytvoreni = 1;
                                            row.flagEdited = 1;
                                            row.typ_doh = this.typ_doh;
                                            row.radek_davka = row.radek_pol; //v radek_pol je aktuálně řádek dávky (část PK)
                                            row.dat_odp = this.dtoPolVypis.dat_odp;
                                            //If ( ( nRezim = 1 ) OR ( nRezim = 2 ) OR ( nRezim = 3 ) ) AND ( nDatZap = 1 )
                                            if (nDatZap == 1) {
                                                row.dat_zap = this.dat_vyp;
                                            }
                                            row.Permissions = {
                                                LzeEditovat: { value: true },
                                                LzeRozpisPolozek: { value: true },
                                                LzeParovano: { value: false },
                                                LzeUcetniZapisy: { value: false },
                                            };
                                        }
                                        this.$grid.ggrid("getView").updateData(data, "set");
                                        this.recalculateCastky();
                                        this.setGridStatusWidget();
                                    }
                                    else {
                                        return $.Deferred().reject().promise();
                                    }
                                });
                            });
                        }
                        else {
                            return $.Deferred().reject().promise();
                        }
                    });
                }
                /** Výběr dávky SIPO*/
                davkySIPO() {
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GDavkaSIPOSeznam", { uid: "GDavkaSIPOSeznam#" }], {
                        sk_vl: this.dtoPolVypis.sk_vl,
                        bu_vl: this.dtoPolVypis.bu_vl,
                        c_pre: this.dtoPolVypis.c,
                        mod: 1
                    }, { /*width: 580, height: 450*/}).createDialogPromise().then((davka) => {
                        if (davka) {
                            return this.dialogVolbaDataZaplaceni(1, "buc_dusi").then((nDatZap) => {
                                return this.isl.BucRozpisPolozky.listDavkySIPO({ davka: davka.davka ?? -1, ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol }).getData().then((data) => {
                                    if (data?.length > 0) {
                                        this.aktualni_davka = davka.davka ?? -1;
                                        for (let row of data) {
                                            row.new_id = ++this.polozkyNewId;
                                            row.rezim_vytvoreni = 2;
                                            row.flagEdited = 1;
                                            row.typ_doh = this.typ_doh;
                                            row.radek_davka_sipo = row.davka_sipo; //v radek_davka_sipo je aktuálně řádek dávky - spoj_cis (část PK)
                                            row.dat_odp = this.dtoPolVypis.dat_odp;
                                            //If ( ( nRezim = 1 ) OR ( nRezim = 2 ) OR ( nRezim = 3 ) ) AND ( nDatZap = 1 )
                                            if (nDatZap == 1) {
                                                row.dat_zap = this.dat_vyp;
                                            }
                                            row.Permissions = {
                                                LzeEditovat: { value: true },
                                                LzeRozpisPolozek: { value: true },
                                                LzeParovano: { value: false },
                                                LzeUcetniZapisy: { value: false },
                                            };
                                        }
                                        this.$grid.ggrid("getView").updateData(data, "set");
                                        this.recalculateCastky();
                                        this.setGridStatusWidget();
                                    }
                                    else {
                                        return $.Deferred().reject().promise();
                                    }
                                });
                            });
                        }
                        else {
                            return $.Deferred().reject().promise();
                        }
                    });
                }
                /** Výběr dávky Avízo*/
                davkyAvizo() {
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GDavkaAvizoSeznam", { uid: "GDavkaAvizoSeznam#" }], {
                        sk_vl: this.dtoPolVypis.sk_vl,
                        bu_vl: this.dtoPolVypis.bu_vl,
                        c_pre: this.dtoPolVypis.c,
                        vs: this.dtoPolVypis.vs,
                        ss: this.dtoPolVypis.ss,
                        mod: 1
                    }, { /*width: 580, height: 450*/}).createDialogPromise().then((davka) => {
                        if (davka) {
                            return this.dialogVolbaDataZaplaceni(2, "buc_dupk").then((nDatZap) => {
                                return this.isl.BucRozpisPolozky.listDavkyAvizo({ davka: davka.davka ?? -1, ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol }).getData().then((data) => {
                                    if (data?.length > 0) {
                                        this.aktualni_davka = davka.davka ?? -1;
                                        for (let row of data) {
                                            row.new_id = ++this.polozkyNewId;
                                            row.rezim_vytvoreni = 3;
                                            row.flagEdited = 1;
                                            row.typ_doh = this.typ_doh;
                                            row.radek_davka = row.radek_pol;
                                            row.dat_odp = this.dtoPolVypis.dat_odp;
                                            if (nDatZap == 1) {
                                                row.dat_zap = this.dat_vyp;
                                            }
                                            row.Permissions = {
                                                LzeEditovat: { value: true },
                                                LzeRozpisPolozek: { value: true },
                                                LzeParovano: { value: false },
                                                LzeUcetniZapisy: { value: false },
                                            };
                                        }
                                        this.$grid.ggrid("getView").updateData(data, "set");
                                        this.recalculateCastky();
                                        this.setGridStatusWidget();
                                    }
                                    else {
                                        return $.Deferred().reject().promise();
                                    }
                                });
                            });
                        }
                        else {
                            return $.Deferred().reject().promise();
                        }
                    });
                }
                /** Výběr dávky Vratka B*/
                davkyVratkaB() {
                    //15.04.2025 - dle domluvy s jsochor bude umožněn pouze režim Jednotlivě, takže dialog s dotazem není potřeba
                    return this.predpisy(13);
                }
                /** Import dávky ze souboru */
                soubor() {
                    const form = new Gordic.Forms.Form()
                        .addRow("jres:33600368", true) //RC 33600368 : Soubor
                        .addField("gfilefield", {
                        name: "soubor",
                        validators: [new Gordic.Validators.Required()],
                        acceptExtension: ".csv", //v TK i .sta a .gpc, ty se zatím ale nebudou dělat
                        maxFileCount: 1,
                    });
                    return this.dialogs.simpleForm("jres:33600369", form).createDialogPromise().then((ctx) => {
                        if ((ctx?.soubor?.length ?? 0) > 0) {
                            return this.isl.BucRozpisPolozky.importSouboru({ guid: ctx?.soubor[0].guid }).get().then((newRows) => {
                                for (let row of newRows) {
                                    row.new_id = ++this.polozkyNewId;
                                    row.rezim_vytvoreni = -1; //zatím -1 - bez kontrol
                                    row.flagEdited = 1;
                                    row.typ_doh = this.typ_doh;
                                    row.dat_zap = this.dtoPolVypis.dat_zap;
                                    row.dat_val = this.dtoPolVypis.dat_val;
                                    row.lic = this.dtoPolVypis.lic;
                                    row.Permissions = {
                                        LzeEditovat: { value: true },
                                        LzeRozpisPolozek: { value: true },
                                        LzeParovano: { value: false },
                                        LzeUcetniZapisy: { value: false },
                                    };
                                    this.setCRoz(row.c); //nastaví interně rozepsáno + zbývá
                                }
                                this.$grid.ggrid("getView").updateData(newRows, "add");
                                this.setGridStatusWidget();
                            });
                        }
                        else {
                            return $.Deferred().reject().promise();
                        }
                    });
                }
                /** Zobrazení/vybrání záznamů z napojených poplatníků DDP*/
                napojeniPoplatniciDDP() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600158");
                        return $.Deferred().reject().promise();
                    } //RC 33600158 : Vyberte alespoň jeden řádek
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GNapojeniPoplatniciDDP", { uid: "GNapojeniPoplatniciDDP#" }], {
                        ixp_pl: rows[0].ixp_pl
                    }).createDialogPromise().then((ctx) => {
                        if ((ctx ?? []).length == 0) {
                            return $.Deferred().reject().promise();
                        } //pokud není vybrán žádný, tak reject
                        let newDtos = [];
                        for (let row of (ctx ?? [])) {
                            let dto /* & {new_id: number, rezim_vytvoreni: number}*/ = {
                                new_id: ++this.polozkyNewId,
                                rezim_vytvoreni: 5,
                                flagEdited: 1,
                                typ_doh: this.typ_doh,
                                sk_ci: this.dtoPolVypis.sk_ci,
                                bu_ci: this.dtoPolVypis.bu_ci,
                                ucet_ci: this.dtoPolVypis.bu_ci + "/" + this.dtoPolVypis.sk_ci,
                                vs: row.vs,
                                ks: row.ks,
                                ss: row.ss,
                                dat_zap: this.dtoPolVypis.dat_zap,
                                dat_val: this.dtoPolVypis.dat_val,
                                lic: rows[0].lic,
                                s_pol: 10 /* Interface.GBucGlobalsBase.SPol.Porizena */,
                                mena: rows[0].mena,
                                mena_txt: rows[0].mena_txt,
                                dat_odp: this.dtoPolVypis.dat_odp,
                                ixp_pok: this.dtoPolVypis.ixp_pok,
                                Permissions: {
                                    LzeEditovat: { value: true },
                                    LzeRozpisPolozek: { value: true },
                                    LzeParovano: { value: false },
                                    LzeUcetniZapisy: { value: false },
                                },
                            };
                            const c = parseDecimal(row.c ?? 0);
                            const c_mena = parseDecimal(row.c ?? 0);
                            const c_par = parseDecimal(row.c_uhr ?? 0);
                            const c_par_mena = parseDecimal(row.c_uhr ?? 0);
                            //DDP
                            if ( /*row.typ_ag == 350 &&*/c.minus(c_par).lessThanOrEqualTo(0)) { // je vždy 350
                                if (this.typ_doh != 13) {
                                    //378.03X10  BucPep.c < 0 - Svozil
                                    if (c.lessThan(0)) {
                                        dto.c = c.minus(c_par);
                                        dto.c_mena = c_mena.minus(c_par_mena);
                                    }
                                    else {
                                        dto.c = parseDecimal(0);
                                        dto.c_mena = parseDecimal(0);
                                    }
                                }
                                else {
                                    dto.c = c.times(-1);
                                    dto.c_mena = c_mena.times(-1);
                                }
                            }
                            else {
                                if (this.typ_doh != 13) {
                                    dto.c = c.minus(c_par);
                                    dto.c_mena = c_mena.minus(c_par_mena);
                                }
                                else {
                                    dto.c = c.times(-1);
                                    dto.c_mena = c_mena.times(-1);
                                }
                            }
                            if (this.typ_doh != 13) {
                                dto.nazev = (this.dbparams.buc_rpnp == 0) ? row.esu_txt : this.dtoPolVypis.nazev;
                                dto.zu = this.dtoPolVypis.zu;
                                dto.zu_txt = this.dtoPolVypis.zu_txt;
                            }
                            else {
                                dto.nazev = "{0} - {1}".format(rows[0].nazev ?? "", row.esu_txt ?? "");
                                dto.zu = 30; //natvrdo a zakazat editaci
                                dto.zu_txt = "jres:33600413"; //RC 33600413 : vratka B
                                dto.duv_vra = rows[0].duv_vra;
                                dto.ixp_par = row.ixp;
                                dto.cislo_par = rows[0].cislo_par;
                            }
                            this.setCRoz(dto.c); //nastaví interně rozepsáno + zbývá
                            //Set nCMenaSum = nCMenaSum + tbl_Kp.c_mena
                            dto.ixp_pl = row.ixp;
                            newDtos.push(dto);
                        }
                        this.$grid.ggrid("getView").updateData(newDtos, "add");
                        this.setGridStatusWidget();
                    });
                }
                /**
                 * Uložení změn v rozpisu bankovního výpisu
                 *
                 * @param {boolean} fromClosing (default = false) způsob volání (false = standardní uložení tlačítkem, true = ze zavření detailu s neuloženými daty)
                 * @returns {JQueryPromise<any>} promise
                 */
                ulozit(fromClosing = false) {
                    const that = this;
                    //položky výpisu
                    let polozky = this.$grid.ggrid("getView").getDataRows().filter(x => x.flagEdited == 1 || x.flagEdited == 2);
                    if (polozky.length < 1) {
                        return this.dialogs.error("jres:33600414").createDialogPromise().then(() => { return $.Deferred().reject().promise(); }); //RC 33600414 : Nebyly provedeny žádné změny pro uložení
                    }
                    //obecný režim vytvoření asi nastavovat spíše až zde? Uživatel totiž může všechny dávky vymazat a vložit třeba z předpisu (0)
                    //vždy bude existovat pouze jeden druh větší jak 0
                    polozky.some((val, idx, arr) => { if (val.rezim_vytvoreni > 0) {
                        this.rezim_vytvoreni = val.rezim_vytvoreni;
                    } return val.rezim_vytvoreni > 0; });
                    // volání uložení
                    return that.isl.BucRozpisPolozky.massUpsert({
                        data: {
                            ixp: this.dtoPolVypis.ixp,
                            radek_pol: this.dtoPolVypis.radek_pol,
                            //subradek: this.dtoPolVypis.subradek,
                            dat_zmena: this.dtoPolVypis.dat_zmena,
                            rezim_vytvoreni: this.rezim_vytvoreni,
                            davka: this.aktualni_davka,
                            polozky: polozky
                        }
                    }).get().then(() => {
                        this.changed = true;
                        if (!fromClosing) {
                            this.load({ changed: this.changed });
                        }
                    });
                }
                /** Kopírování posledního řádku rozpisu*/
                kopirovat() {
                    const rows = this.$grid.ggrid("getView").getDataRows();
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600415");
                        return $.Deferred().reject().promise();
                    } //RC 33600415 : Neexistuje předchozí záznam pro kopírování
                    const prevRow = rows[rows.length - 1];
                    let dto /* & {new_id: number, rezim_vytvoreni: number}*/ = {
                        new_id: ++this.polozkyNewId,
                        rezim_vytvoreni: 6, //kopírovat/dopočítat
                        flagEdited: 1,
                        sk_vl: prevRow.sk_vl,
                        bu_vl: prevRow.bu_vl,
                        sk_ci: prevRow.sk_ci,
                        bu_ci: prevRow.bu_ci,
                        ucet_ci: prevRow.bu_ci + "/" + prevRow.sk_ci,
                        ks: prevRow.ks,
                        ss: prevRow.ss,
                        c: parseDecimal(0),
                        vs2: prevRow.vs2,
                        ss2: prevRow.ss2,
                        c_mena: parseDecimal(0),
                        mena: prevRow.mena,
                        mena_txt: prevRow.mena_txt,
                        ixp_pok: prevRow.ixp_pok,
                        nazev: "jres:33600416", //RC 33600416 : Rozpis položky výpisu
                        Permissions: {
                            LzeEditovat: { value: true },
                            LzeRozpisPolozek: { value: true },
                            LzeParovano: { value: false },
                            LzeUcetniZapisy: { value: false },
                        },
                        //TODO: z logiky věci doplněny další údaje, které se jinak doplňují před insertem jako default
                        zu: prevRow.zu,
                        zu_txt: prevRow.zu_txt,
                        s_pol: 10 /* Interface.GBucGlobalsBase.SPol.Porizena */, //podmíněné formátování
                        dat_zap: prevRow.dat_zap //asi taky logicky?
                    };
                    this.$grid.ggrid("getView").updateData(dto, "add");
                    //není potřeba update částky, protože je 0 vždy
                    return $.Deferred().resolve().promise();
                }
                /** Dopočítání částky pro vyrovnání rozpisu vznikem řádku rozpisu*/
                dopocitat() {
                    const rows = this.$grid.ggrid("getView").getDataRows();
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600417");
                        return $.Deferred().reject().promise();
                    } //RC 33600417 : Neexistuje předchozí záznam pro dopočítání
                    //TODO: vážně je potřeba dotaz na provedení, když u kopírování se neptá vůbec?
                    //this.dialogs.confirm("Opravdu chcete dopočítat poslední řádek rozpisu?")
                    //TODO: je vážně potřeba? Po prvním dotazu je další s textem:
                    //Dopočítaný řádek rozpisu bude mít opačné znaménko než rozepisovaný řádek! Opravdu ho chcete dopočítat ?
                    let c_mena_sum = parseDecimal(0);
                    rows.forEach((val, index, arr) => { c_mena_sum = c_mena_sum.plus(parseDecimal(val.c_mena ?? 0)); });
                    let dto /* & {new_id: number, rezim_vytvoreni: number}*/ = {
                        new_id: ++this.polozkyNewId,
                        rezim_vytvoreni: 6, //kopírovat/dopočítat
                        flagEdited: 1,
                        sk_ci: this.dtoPolVypis.sk_ci,
                        bu_ci: this.dtoPolVypis.bu_ci,
                        ucet_ci: this.dtoPolVypis.bu_ci + "/" + this.dtoPolVypis.sk_ci,
                        vs: this.dtoPolVypis.vs,
                        ks: this.dtoPolVypis.ks,
                        ss: this.dtoPolVypis.ss,
                        vs2: this.dtoPolVypis.vs2,
                        ss2: this.dtoPolVypis.ss2,
                        c: this.castky.c_zby,
                        dat_zap: this.dtoPolVypis.dat_zap,
                        dat_val: this.dtoPolVypis.dat_val,
                        nazev: "jres:33600418", //RC 33600418 : Dopočet k rozpisu položky výpisu
                        lic: this.dtoPolVypis.lic, //asi?
                        s_pol: 10 /* Interface.GBucGlobalsBase.SPol.Porizena */,
                        c_mena: parseDecimal(this.dtoPolVypis.c_mena ?? 0).minus(c_mena_sum),
                        mena: this.dtoPolVypis.mena,
                        mena_txt: this.dtoPolVypis.mena_txt,
                        dat_odp: this.dtoPolVypis.dat_odp,
                        ixp_pok: this.dtoPolVypis.ixp_pok,
                        Permissions: {
                            LzeEditovat: { value: true },
                            LzeRozpisPolozek: { value: true },
                            LzeParovano: { value: false },
                            LzeUcetniZapisy: { value: false },
                        },
                        //TODO: z logiky věci doplněny další údaje, které se jinak doplňují před insertem jako default
                        zu: this.dtoPolVypis.zu, //asi z hlavní položky?
                        zu_txt: this.dtoPolVypis.zu_txt, //asi z hlavní položky?
                    };
                    this.$grid.ggrid("getView").updateData(dto, "add");
                    this.setCRoz(this.castky.c_zby);
                    this.setGridStatusWidget();
                    return $.Deferred().resolve().promise();
                }
                /** Hromadné storno vybraných položek */
                storno() {
                    if (this.hasUnsavedChanges()) {
                        this.dialogs.alert("jres:33600419");
                        return $.Deferred().reject().promise();
                    } //RC 33600419 : Rozpis obsahuje neuložené záznamy!
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600158");
                        return $.Deferred().reject().promise();
                    } //RC 33600158 : Vyberte alespoň jeden řádek
                    let wizardChanged = false;
                    return this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "GHromadneStornoPolozekRozpisuBuc#",
                        title: "jres:33600420", //RC 33600420 : Hromadné storno položek rozpisu
                        gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                        gridProfile: this.$grid.ggrid("getCurrentProfile"),
                        keys: this.$grid.ggrid("getView").keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, radek_av: val.radek_av }; });
                            return this.isl.BucRozpisPolozky.zkontrolujPredStorno({ ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol, dat_zmena: this.dtoPolVypis.dat_zmena, keys: keysArr })
                                .get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600162", //RC 33600162 : Výběr záznamů
                            title: "jres:33600162", //RC 33600162 : Výběr záznamů
                            description: "jres:33600421", //RC 33600421 : Akce stornuje/odstornuje (změna stavu z NZ na NE a obráceně) vybrané (zaškrtnuté) položky rozpisu
                            showIndicator: true,
                            nextAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, radek_av: val.radek_av }; });
                                return this.isl.BucRozpisPolozky.hromadneStornovat({ ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol, dat_zmena: this.dtoPolVypis.dat_zmena, keys: keysArr })
                                    .get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, radek_av: val.radek_av }; });
                                return this.isl.BucRozpisPolozky.zkontrolujPredStorno({ ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol, dat_zmena: this.dtoPolVypis.dat_zmena, keys: keysArr })
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
                            //asi radši celý reload detailu
                            this.changed = true;
                            this.load({ changed: this.changed });
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
                    //všechny nově vytvořené záznamy jsou nové => prostě odeberu
                    if (rows.every(x => (x.flagEdited ?? 0) == 1)) {
                        if (rows.some(x => x.rezim_vytvoreni > 0)) {
                            this.dialogs.alert("jres:33600422");
                            return $.Deferred().reject().promise(); //RC 33600422 : Nelze odstranit nově načtené záznamy z dávky!
                        }
                        return this.dialogs.confirm("jres:33600423").createDialogPromise(GDlg.mbbYes.id).then(() => {
                            this.$grid.ggrid("getView").updateData(rows, "delete");
                            this.recalculateCastky();
                            this.setGridStatusWidget();
                        });
                    }
                    //pokud obsahuje nějaké rozeditované záznamy (již dříve uložené), tak nedovolím odstranit
                    if (this.$grid.ggrid("getView").getDataRows().some(x => x.flagEdited == 2)) {
                        this.dialogs.alert("jres:33600424");
                        return $.Deferred().reject().promise(); //RC 33600424 : Rozpis obsahuje neuložené upravené záznamy!
                    }
                    let wizardChanged = false;
                    return this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "GHromadneOdstraneniPolozekRozpisuBuc#",
                        title: "jres:33600425", //RC 33600425 : Hromadné odstranění položek rozpisu
                        gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                        gridProfile: this.$grid.ggrid("getCurrentProfile"),
                        keys: this.$grid.ggrid("getView").keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            let keysArrDB = [];
                            let keysArrNoDB = [];
                            data.forEach((val, idx, arr) => {
                                if (val.flagEdited != 1) {
                                    keysArrDB.push({ ixp: val.ixp, radek_pol: val.radek_pol, radek_av: val.radek_av });
                                }
                                else {
                                    keysArrNoDB.push({ new_id: val.new_id });
                                }
                            });
                            return this.isl.BucRozpisPolozky.zkontrolujPredOdstranit({ ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol, dat_zmena: this.dtoPolVypis.dat_zmena, keys: keysArrDB })
                                .get().then((result) => {
                                let res = Gordic.Eko.Components.Wizard.Utils.getData(result);
                                keysArrNoDB.forEach((val, idx, arr) => { res.push({ ...val, wiz_kind: 200 /* Isl.GOperationResultKind.Success */, wiz_check: true, wiz_txt_err: "jres:33600426" }); }); //RC 33600426 : Povoleno
                                return res;
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600162", //RC 33600162 : Výběr záznamů
                            title: "jres:33600162", //RC 33600162 : Výběr záznamů
                            description: "jres:33600427", //RC 33600427 : Akce odstraní vybrané (zaškrtnuté) položky rozpisu
                            showIndicator: true,
                            nextAction: (model, data) => {
                                //neuložená data nemusím ani odstraňovat z gridu, protože po úspěchu dojde k celkovému reloadu rozpisu a data zmizí
                                let keysArrDB = [];
                                let keysArrNoDB = [];
                                data.forEach((val, idx, arr) => {
                                    if (val.flagEdited != 1) {
                                        keysArrDB.push({ ixp: val.ixp, radek_pol: val.radek_pol, radek_av: val.radek_av });
                                    }
                                    else {
                                        keysArrNoDB.push({ new_id: val.new_id });
                                    }
                                });
                                return this.isl.BucRozpisPolozky.hromadneOdstranit({ ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol, dat_zmena: this.dtoPolVypis.dat_zmena, keys: keysArrDB })
                                    .get().then((result) => {
                                    let res = Gordic.Eko.Components.Wizard.Utils.getData(result);
                                    keysArrNoDB.forEach((val, idx, arr) => { res.push({ ...val, wiz_kind: 200 /* Isl.GOperationResultKind.Success */, wiz_check: true, wiz_txt_err: "jres:33600428" }); }); //RC 33600428 : Provedeno
                                    return res;
                                });
                            },
                            checkAction: (model, data) => {
                                let keysArrDB = [];
                                let keysArrNoDB = [];
                                data.forEach((val, idx, arr) => {
                                    if (val.flagEdited != 1) {
                                        keysArrDB.push({ ixp: val.ixp, radek_pol: val.radek_pol, radek_av: val.radek_av });
                                    }
                                    else {
                                        keysArrNoDB.push({ new_id: val.new_id });
                                    }
                                });
                                return this.isl.BucRozpisPolozky.zkontrolujPredOdstranit({ ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol, dat_zmena: this.dtoPolVypis.dat_zmena, keys: keysArrDB })
                                    .get().then((result) => {
                                    let res = Gordic.Eko.Components.Wizard.Utils.getData(result);
                                    keysArrNoDB.forEach((val, idx, arr) => { res.push({ ...val, wiz_kind: 200 /* Isl.GOperationResultKind.Success */, wiz_check: true, wiz_txt_err: "jres:33600429" }); }); //RC 33600429 : Povoleno
                                    return res;
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
                            //asi radši celý reload detailu
                            this.changed = true;
                            this.load({ changed: this.changed });
                        }
                    });
                }
                /** Hromadné zaúčtování vybraných položek*/
                zauctovat() {
                    if (this.hasUnsavedChanges()) {
                        this.dialogs.alert("jres:33600430");
                        return $.Deferred().reject().promise();
                    } //RC 33600430 : Rozpis obsahuje neuložené záznamy!
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600158");
                        return $.Deferred().reject().promise();
                    } //RC 33600158 : Vyberte alespoň jeden řádek
                    let wizardChanged = false;
                    return this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "GHromadneZauctovaniPolozekRozpisuBuc#",
                        title: "jres:33600431", //RC 33600431 : Hromadné zaúčtování položek rozpisu
                        gridFormat: new Gordic.Data.GridFormat().add(this.$grid.ggrid("option", "columns") || []),
                        gridProfile: this.$grid.ggrid("getCurrentProfile"),
                        keys: this.$grid.ggrid("getView").keys,
                        data: rows,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, radek_av: val.radek_av }; });
                            return this.isl.BucRozpisPolozky.zkontrolujPredZauctovanim({ ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol, dat_zmena: this.dtoPolVypis.dat_zmena, keys: keysArr })
                                .get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600162", //RC 33600162 : Výběr záznamů
                            title: "jres:33600162", //RC 33600162 : Výběr záznamů
                            description: "jres:33600432", //RC 33600432 : Akce zaúčtuje vybrané (zaškrtnuté) položky rozpisu
                            showIndicator: true,
                            nextAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, radek_av: val.radek_av }; });
                                return this.isl.BucRozpisPolozky.hromadneZauctovat({ ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol, dat_zmena: this.dtoPolVypis.dat_zmena, keys: keysArr })
                                    .get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                let keysArr = data.map((val, idx, arr) => { return { ixp: val.ixp, radek_pol: val.radek_pol, radek_av: val.radek_av }; });
                                return this.isl.BucRozpisPolozky.zkontrolujPredZauctovanim({ ixp: this.dtoPolVypis.ixp, radek_pol: this.dtoPolVypis.radek_pol, dat_zmena: this.dtoPolVypis.dat_zmena, keys: keysArr })
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
                            //asi radši celý reload detailu
                            this.changed = true;
                            this.load({ changed: this.changed });
                        }
                    });
                }
                /** Zobrazení detailu párování platby položky rozpisu */
                parovano() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600158");
                        return $.Deferred().reject().promise();
                    } //RC 33600158 : Vyberte alespoň jeden řádek
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GParovanoDetail", { uid: "GParovanoDetail#" }], {
                        ixp_par: rows[0].ixp_par,
                        cislo_par: rows[0].cislo_par,
                        s_pol: rows[0].s_pol,
                        c: rows[0].c
                    }, { width: 580, height: 450 }).createDialogPromise();
                }
                /** Zobrazení historie párování platby položky rozpisu */
                historieParovani() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600159");
                        return $.Deferred().reject().promise();
                    } //RC 33600159 : Vyberte alespoň jeden řádek
                    return this.dialogs.showModalWindow(["Gordic.Buc.WebClient.GParovanoHistorie", { uid: "GParovanoHistorie#" }], {
                        ixp_par: this.ixp,
                        radek_pol: rows[0].radek_pol,
                        subradek: rows[0].subradek,
                        radek_av: rows[0].radek_av
                    } /*, { width: 580, height: 450 }*/).createDialogPromise();
                }
                /** Zobrazení dialogu příloh položky rozpisu */
                prilohy() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600166");
                        return $.Deferred().reject().promise();
                    } //RC 33600166 : Vyberte alespoň jeden řádek
                    const ixsUctenky = this.ixp + (rows[0].radek_pol ?? 0).toString().padStart(4, '0') + "00" + "0000";
                    return Gordic.Wfl.Dialogs.IxsPrilohyDialog(this, {
                        visitors: [
                            new Gordic.Wfl.WebClient.Attachments.GIxsAttachmentVisitor({
                                ixs: ixsUctenky,
                                //downloaderType: "Gordic.Uct.WebClient.GUctFileDownloader",
                                dao: new Gordic.Wfl.WebClient.Attachments.GIxsAttachmentDAO({ ixs: ixsUctenky /*, islName: "UctLoadAttachmentService"*/ }),
                                readonly: false
                            })
                        ]
                    }, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                }
                /** Zobrazení historie párování platby položky rozpisu */
                ucetniZapisy() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600167");
                        return $.Deferred().reject().promise();
                    } //RC 33600167 : Vyberte alespoň jeden řádek
                    return this.navigate("Gordic.Eko.WebClient.GVazby", {
                        InputDto: {
                            ixp: rows[0].ixp_par,
                            drd: 0,
                            ktg_typ: 0,
                            viewMode: true
                        }
                    }).createDialogPromise();
                }
                /** Zobrazení diagnostického ID položky rozpisu */
                diagID() {
                    let rows = Gordic.Eko.Grid.checkedRows(this.$grid);
                    if (!rows || (rows?.length ?? 0) < 1) {
                        this.dialogs.alert("jres:33600169");
                        return $.Deferred().reject().promise();
                    } //RC 33600169 : Vyberte alespoň jeden řádek
                    return this.dialogs.alert("jres:33600170", "{0}#{1}#{2}#{3}".format(rows[0].ixp ?? "", rows[0].radek_pol ?? 0, rows[0].subradek ?? 0, rows[0].radek_av ?? 0)) //RC 33600170 : Diagnostické ID položky
                        .createDialogPromise();
                }
                //#endregion Akce
                /** Update rozepsané částky + napočítání rozdílu */
                setCRoz(c_roz) {
                    this.castky.c_roz = this.castky.c_roz.plus(c_roz);
                    this.castky.c_zby = this.castky.c.minus(this.castky.c_roz);
                }
                /** Celkový přepočet částek*/
                recalculateCastky() {
                    this.castky.c_roz = parseDecimal(0);
                    this.castky.c_zby = parseDecimal(0);
                    this.$grid.ggrid("getView").getDataRows().forEach((val, idx, arr) => {
                        this.castky.c_roz = this.castky.c_roz.plus(parseDecimal(val.c ?? 0));
                    });
                    this.castky.c_zby = this.castky.c.minus(this.castky.c_roz);
                }
                /** Nastavení částek rozpisu statusu gridu s položkami*/
                setGridStatusWidget() {
                    const status = "Celkem: <b class='g-state-text g-state-active'>{0}</b>".format(Gordic.Templates.Formatters.number(this.castky.c, "C")) +
                        " Rozepsáno: <b class='g-state-text g-state-active'>{0}</b>".format(Gordic.Templates.Formatters.number(this.castky.c_roz, "C")) +
                        " Zbývá: <b class='g-state-text g-state-active'>{0}</b>".format(Gordic.Templates.Formatters.number(this.castky.c_zby, "C"));
                    this.$grid.ggrid("statusWidget", "statusWidget-rozpis-polozky").html(status);
                    //nastavení akcí kopírovat/dopočítat, které mají být dostupné
                    this.actions.actKopirovat?.enabled((this.servicePermissions.LzeKopirovat?.value ?? false) && !this.castky.c_zby.equals(0));
                    this.actions.actDopocitat?.enabled((this.servicePermissions.LzeDopocitat?.value ?? false) && !this.castky.c_zby.equals(0));
                }
                /** Kontrola, zda existují neuložené záznamy v rozpise */
                hasUnsavedChanges() {
                    return this.$grid.ggrid("getView").getDataRows().some(x => x.flagEdited == 1 || x.flagEdited == 2);
                }
                /**
                 * Získání způsobu doplnění data zaplacení
                 * @param typ_dav
                 * @returns
                 */
                dialogVolbaDataZaplaceni(typ_dav, db_param) {
                    let caption = "";
                    switch (typ_dav) {
                        case 0:
                            caption = "jres:33600433"; //RC 33600433 : Volba data zaplacení pro platbu složenkou A-V
                            break;
                        case 1:
                            caption = "jres:33600434"; //RC 33600434 : Volba data zaplacení pro platbu SIPO
                            break;
                        case 2:
                            caption = "jres:33600435"; //RC 33600435 : Volba data zaplacení pro platbu platební kartou
                            break;
                        default:
                            caption = "jres:33600436"; //RC 33600436 : Volba data zaplacení
                            break;
                    }
                    if (this.dbparams[db_param] == 1) {
                        let form = new Gordic.Forms.Form()
                            .addRow(caption, true)
                            .addField("gradio", {
                            name: "nDatZap",
                            initialValue: 0,
                            groupName: "gradioRozpisGDavkaAV",
                            radios: [
                                {
                                    value: 0,
                                    label: "jres:33600437", //RC 33600437 : Datum z dávky
                                    id: "r1"
                                },
                                {
                                    value: 1,
                                    label: "jres:33600438", //RC 33600438 : Datum převodu na bankovním výpise
                                    id: "r2"
                                }
                            ],
                            validators: [new Gordic.Validators.Required()]
                        });
                        return this.dialogs.simpleForm("jres:33600439", form).createDialogPromise().then((ctx) => {
                            if (ctx && (ctx.nDatZap == 0 || ctx.nDatZap == 1)) {
                                return $.Deferred().resolve(ctx.nDatZap).promise();
                            }
                            else {
                                return $.Deferred().reject().promise();
                            }
                        });
                    }
                    else {
                        return $.Deferred().resolve(0).promise();
                    }
                }
            };
            GRozpisPolozky = __decorate([
                Decorators.gcontent
            ], GRozpisPolozky);
            WebClient.GRozpisPolozky = GRozpisPolozky;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvenBpc1BvbG96a3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUm96cGlzUG9sb3preS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQXVuRGY7QUF2bkRELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXVuRG5CO0lBdm5EZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBdW5EN0I7UUF2bkRvQixXQUFBLFNBQVM7WUFDMUIsK0JBQStCO1lBRS9CLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxPQUFBLFlBQVk7Z0JBQWhEOztvQkErQ0ksdUVBQXVFO29CQUMvRCxpQkFBWSxHQUFXLENBQUMsQ0FBQztvQkFDakMsaUxBQWlMO29CQUN6SyxvQkFBZSxHQUFZLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtvQkFDMUQsOERBQThEO29CQUN0RCxtQkFBYyxHQUFZLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtnQkErakQ3RCxDQUFDO2dCQTNqREcsY0FBYztvQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUFDLENBQUMsQ0FBQyw4QkFBOEI7b0JBQ3ZLLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFB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U0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBdW5EN0I7SUFBRCxDQUFDLEVBdm5EZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdW5EbkI7QUFBRCxDQUFDLEVBdm5EUyxNQUFNLEtBQU4sTUFBTSxRQXVuRGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdSb3pwaXNQb2xvemt5LnRzICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cbi8vICAgIDxEZXNjcmlwdGlvbj4gRGlhbG9nIHMgcm96cGlzZW0gcG9sb8W+a3kgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XG4vLyAgICA8QXV0aG9yPiAgICAgIHBzbWVqa2FsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjUgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDItMDQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cbi8vICA8L0ZpbGVIZWFkZXI+XG5cblxyXG5uYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgLyoqRGlhbG9nIHMgcm96cGlzZW0gcG9sb8W+a3kgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1JvenBpc1BvbG96a3kgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKiBJZGVudGlmaWvDoXRvciBwb2xvxb5reSovXHJcbiAgICAgICAgcHVibGljIGl4cDogc3RyaW5nO1xyXG4gICAgICAgIC8qKsWYw6FkZWsgcG9sb8W+a3kgKi9cclxuICAgICAgICBwdWJsaWMgcmFkZWtfcG9sOiBudW1iZXI7XHJcbiAgICAgICAgLyoqRGF0dW0gc3Rhxb5lbsOtIHbDvXBpc8WvICovXHJcbiAgICAgICAgcHVibGljIGRhdF92eXA6IERhdGUgfCBKc29uRGF0ZTtcclxuICAgICAgICAvKip1cm9jZW5pICovXHJcbiAgICAgICAgcHVibGljIHVyb2Nlbmk6IG51bWJlcjtcclxuICAgICAgICAvKipjX2ppc3RpbmEgKi9cclxuICAgICAgICBwdWJsaWMgY19qaXN0aW5hOiBEZWNpbWFsIHwgSnNvbkRlY2ltYWw7XHJcbiAgICAgICAgLyoqY191cm9rICovXHJcbiAgICAgICAgcHVibGljIGNfdXJvazogRGVjaW1hbCB8IEpzb25EZWNpbWFsO1xyXG4gICAgICAgIC8qKmNfcHJlcGxhdGVrICovXHJcbiAgICAgICAgcHVibGljIGNfcHJlcGxhdGVrOiBEZWNpbWFsIHwgSnNvbkRlY2ltYWw7XHJcbiAgICAgICAgLyoqaXhwX3VybyAqL1xyXG4gICAgICAgIHB1YmxpYyBpeHBfdXJvOiBzdHJpbmdcclxuICAgICAgICAvKipyYWRla191aHJfdXJvICovXHJcbiAgICAgICAgcHVibGljIHJhZGVrX3Vocl91cm86IG51bWJlclxyXG5cclxuICAgICAgICAvL0NvbnRlbnRWYWx1ZXNcclxuICAgICAgICAvKiogRGF0YSBwb2xvxb5reSBiYW4uIHbDvXBpc3UqL1xyXG4gICAgICAgIHByaXZhdGUgZHRvUG9sVnlwaXM6IEludGVyZmFjZS5HQmFua292bmlWeXBpc1BvbG96a2FEdG87XHJcbiAgICAgICAgLyoqIERhdGFiw6F6b3bDqSBwYXJhbWV0cnkgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGRicGFyYW1zOiB7XHJcbiAgICAgICAgICAgIC8qPHN1bW1hcnk+QlVDIC0gUMWZZWRwbG7Em27DrSBwb2xlIE7DoXpldi1wb3BpcyB2IHJvenBpc3UqL1xyXG4gICAgICAgICAgICBidWNfcnBucDogbnVtYmVyO1xyXG4gICAgICAgICAgICAvKkJVQyAtIFRUIFJvenBpcyBwb2xvxb5reSB2w71waXN1ICggR1IgKSovXHJcbiAgICAgICAgICAgIGJ1Y19wdG1fcm96cG9sOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIC8qQlVDIC0gRGF0dW0gw7pocmFkeSBwcm8gZMOhdmt1IHNsb8W+ZW5layBBLVYqL1xyXG4gICAgICAgICAgICBidWNfZHVhdjogbnVtYmVyO1xyXG4gICAgICAgICAgICAvKkJVQyAtIERhdHVtIMO6aHJhZHkgcHJvIGTDoXZrdSBTSVBPKi9cclxuICAgICAgICAgICAgYnVjX2R1c2k6IG51bWJlcjtcclxuICAgICAgICAgICAgLypCVUMgLSBEYXR1bSDDumhyYWR5IHBybyBkw6F2a3UgYXbDrXogUEsqL1xyXG4gICAgICAgICAgICBidWNfZHVwazogbnVtYmVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqIFNlcnZpY2UgcGVybWlzc2lvbnMgc2V6bmFtdSBwb2xvxb5layovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXJ2aWNlUGVybWlzc2lvbnM6IEludGVyZmFjZS5HUm96cGlzUG9sb3preVNlcnZpY2VQZXJtaXNzaW9ucztcclxuICAgICAgICAvKiogR2xvYmFscyAtIFJwcFV1cyovXHJcbiAgICAgICAgcHJpdmF0ZSBycHBVdXM6IG51bWJlcjtcclxuICAgICAgICAvKiogdHlwX2RvaCAqL1xyXG4gICAgICAgIHByaXZhdGUgdHlwX2RvaDogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKiogR3JpZCAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIEluZm9ybWHEjW7DrSDEjcOhc3RreSByb3pwaXN1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjYXN0a3k6IHsgYzogRGVjaW1hbCwgY19yb3o6IERlY2ltYWwsIGNfemJ5OiBEZWNpbWFsIH07IC8vYzogbkNfMCAgKGRmX0MpLCBjX3JvejogbkNTdW0oZGZfQ1JveiksIGNfemJ5OiBuQ18wIC0gbkNTdW0gIChkZl9DWmJ5KVxyXG4gICAgICAgIC8qKiDEjMOtc2VsbsOhIMWZYWRhIHBybyBwb3pkxJtqxaHDrSBwxZllc27DqSB1csSNZW7DrSBub3bDqWhvIMWZw6Fka3UgKHBybyBkZWxldGUpKi9cclxuICAgICAgICBwcml2YXRlIHBvbG96a3lOZXdJZDogbnVtYmVyID0gMDtcclxuICAgICAgICAvKiogUMWZw616bmFrIHJlxb5pbXUgdnl0dm/FmWVuw60gbm92w71jaCB6w6F6bmFtxa8gKC0xIC0gU291Ym9yLCAwIC0gUMWZZWRwaXN5LCAxIC0gRMOhdmt5IEEtViwgMiAtIFNJUE8sIDMgLSBBdsOtemEsIDQgLSBWcmF0a3kgQiwgNSAtIE5hcG9qZW7DrSBwb3BsYXRuw61jw60gRERQLCA2IC0gRG9wb8SNw610YXQva29ww61yb3ZhdCkqL1xyXG4gICAgICAgIHByaXZhdGUgcmV6aW1fdnl0dm9yZW5pPzogbnVtYmVyID0gMDsgLy9ieWxvIHZvaWQgMCwgcHJvxI0/XHJcbiAgICAgICAgLyoqIMSMw61zbG8gZMOhdmt5LCBrdGVyw6kgYnlsbyBwb3XFvml0byBwxZlpIHJlxb5pbXUgdnl0dm/FmWVuw60gPiAwKi9cclxuICAgICAgICBwcml2YXRlIGFrdHVhbG5pX2RhdmthPzogbnVtYmVyID0gMDsgLy9ieWxvIHZvaWQgMCwgcHJvxI0/XHJcbiAgICAgICAgLyoqIFDFmcOtem5haywgemRhIGRvxaFsbyBrZSB6bcSbbsSbIHYgcm96cGlzdSovXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgaWYgKCh0aGlzLmR0b1BvbFZ5cGlzLnBva3luPy5sZW5ndGggPz8gMCkgPiAwKSB7IHRoaXMuc2hvd0ZsYXNoKHsgY29udGVudDogXCJqcmVzOjMzNjAwMzcxXCIgKyB0aGlzLmR0b1BvbFZ5cGlzLnBva3luLCBzdGF0ZTogXCJpbmZvXCIgfSk7IH0gLy9SQyAzMzYwMDM3MSA6IDxiPlBva3luOiA8L2I+XHJcbiAgICAgICAgICAgIHRoaXMuY2FzdGt5ID0geyBjOiBwYXJzZURlY2ltYWwodGhpcy5kdG9Qb2xWeXBpcy5jID8/IDApLCBjX3JvejogcGFyc2VEZWNpbWFsKDApLCBjX3pieTogcGFyc2VEZWNpbWFsKDApIH07XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1lbnVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE1ldG9kYSB2b2xhZMOhIHDFmWkgemF2w61yw6Fuw60gcm96cGlzdSAtIGRvdGF6IHDFmWkgcMWZw61wYWRuw71jaCB6bcSbbsOhY2ggZG9rbGFkdSAqL1xyXG4gICAgICAgIGNsb3NpbmcoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2xhIG5hIHptxJtuxJtuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgY29uc3QgcG9sb3preUNoYW5nZWQgPSB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpLmZpbHRlcih4ID0+IHguZmxhZ0VkaXRlZCA9PSAxIHx8IHguZmxhZ0VkaXRlZCA9PSAyKS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICBpZiAocG9sb3preUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRvdGF6IG5hIHphdsWZZW7DrSBiZXogdWxvxb5lbsOtLCBwcm90b8W+ZSBzZSBuxJtjbyB6bcSbbmlsb1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVrby5EZXRhaWwubWVzc2FnZUJveFVuc2F2ZWREYXRhKHRoYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoW0dEbGcubWJiWWVzLmlkLCBHRGxnLm1iYk5vLmlkXSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IEdEbGcubWJiWWVzLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1bG/FvmVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC51bG96aXQodHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNoYW5nZWQ6IHRoYXQuY2hhbmdlZCB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY2hhbmdlZDogdGhhdC5jaGFuZ2VkIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHBva3VkIHNlIG5lZWRpdHVqZSwgamUgbW/Fvm7DqSBkZXRhaWwgemF2xZnDrXRcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGNoYW5nZWQ6IHRoYXQuY2hhbmdlZCB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHRsYcSNw610a2EgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRXZpZG92YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuc2VydmljZVBlcm1pc3Npb25zLkx6ZUVkaXRvdmF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC51bG96aXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RQcmVkcGlzeTogeyAvKnBiX0RvaCAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM3MlwiLCAvL1JDIDMzNjAwMzcyIDogUMWZZWRwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNjAwMzczXCIsIC8vUkMgMzM2MDAzNzMgOiBEb2hsZWTDoW7DrSBwb2xvxb5layByb3pwaXN1IHYgc2V6bmFtdSBvxI1la8OhdmFuw71jaCBwbGF0ZWJcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucy5MemVQcmVkcGlzeSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnByZWRwaXN5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REYXZreUFWOiB7IC8qcGJfQVYgKi9cclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzNzRcIiwgLy9SQyAzMzYwMDM3NCA6IETDoXZreSBBLVZcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDAzNzVcIiwgLy9SQyAzMzYwMDM3NSA6IFJvemVwc8OhbsOtIGTDoXZreSBzbG/FvmVuZWsgQS1WXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5zZXJ2aWNlUGVybWlzc2lvbnMuTHplRGF2a3lBVixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmRhdmt5QVYoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdERhdmt5U0lQTzogeyAvKnBiX1NpcCAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM3NlwiLCAvL1JDIDMzNjAwMzc2IDogRMOhdmt5IFNJUE9cclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzM2MDAzNzdcIiwgLy9SQyAzMzYwMDM3NyA6IFJvemVwc8OhbsOtIGTDoXZreSBwbGF0ZWIgU0lQT1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuc2VydmljZVBlcm1pc3Npb25zLkx6ZURhdmt5U0lQTyxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmRhdmt5U0lQTygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0QXZpemE6IHsgLypwYl9Bdml6YSAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM3OFwiLCAvL1JDIDMzNjAwMzc4IDogQXbDrXphXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNjAwMzc5XCIsIC8vUkMgMzM2MDAzNzkgOiBSb3plcHPDoW7DrSBkw6F2a3kgYXbDrXogcGxhdGVibsOtY2gga2FyZXRcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucy5MemVBdml6YSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmRhdmt5QXZpem8oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFZyYXRiYUI6IHsgLypwYl9WcmFCICovXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzgwXCIsIC8vUkMgMzM2MDAzODAgOiBWcmF0a2EgQlxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDM4MVwiLCAvL1JDIDMzNjAwMzgxIDogRG9obGVkw6Fuw60gc3DDoXJvdmFuw6kgc2xvxb5lbmt5IEIgcHJvIHByb3ZlZGVuw60gcm96cGlzdSBuZWRvcnXEjWVuw71jaCBzbG/FvmVuZWtcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucy5MemVWcmF0a2FCLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGF2a3lWcmF0a2FCKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RTb3Vib3I6IHsgLypwYl9Tb3UgKi9cclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzODJcIiwgLy9SQyAzMzYwMDM4MiA6IFNvdWJvclxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuc2VydmljZVBlcm1pc3Npb25zLkx6ZVNvdWJvcixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnNvdWJvcigpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0S29waXJvdmF0OiB7IC8qcGJfS29waSAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM4M1wiLCAvL1JDIDMzNjAwMzgzIDogS29ww61yb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDM4NFwiLCAvL1JDIDMzNjAwMzg0IDogS29ww61ydWplIHBvc2xlZG7DrSDFmcOhZGVrIHJvenBpc3VcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmtvcGlyb3ZhdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RG9wb2NpdGF0OiB7IC8qcGJfR2VuICovXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzg1XCIsIC8vUkMgMzM2MDAzODUgOiBEb3BvxI3DrXRhdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDM4NlwiLCAvL1JDIDMzNjAwMzg2IDogR2VuZXJvdsOhbsOtIHBvc2xlZG7DrSBwb2xvxb5reSByb3pwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5kb3BvY2l0YXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE9kcGFyb3ZhdDogeyAvKnBiX09kcGFyICovXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzg3XCIsIC8vUkMgMzM2MDAzODcgOiBPZHDDoXJvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNjAwMzg4XCIsIC8vUkMgMzM2MDAzODggOiBTcMOhcm92YW7DoSBwb2xvxb5rYSBzZSB6bcSbbsOtIG5hIG5lc3DDoXJvdmFub3UsIGRvamRlIGsgb2Rww6Fyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMuc2VydmljZVBlcm1pc3Npb25zLkx6ZU9kcGFyb3ZhdCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZXRQZW5kaW5nKHRoYXQub2RwYXJvdmF0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5kaWFsb2dzLmVycm9yKFwiVE9ET1wiKS5jcmVhdGVEaWFsb2dQcm9taXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RTdG9ybm86IHsgLypwYl9TdG8gKi9cclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzODlcIiwgLy9SQyAzMzYwMDM4OSA6IFN0b3Jub1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDM5MFwiLCAvL1JDIDMzNjAwMzkwIDogTmFzdGF2ZW7DrSBzdGF2dSBwb2xvxb5reSBORS0gbmVzcMOhcm92YW7DoSBuYSBzdGF2IE5aLSBuZXNww6Fyb3bDoW4tenJ1xaFlbiBhIG9icsOhY2VuxJtcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucy5MemVTdG9ybm8sXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5zdG9ybm8oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE9kc3RyYW5pdDogeyAvKnBiX0RlbCAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM5MVwiLCAvL1JDIDMzNjAwMzkxIDogT2RzdHJhbml0XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNjAwMzkyXCIsIC8vUkMgMzM2MDAzOTIgOiBWeW1hesOhbsOtIHBvbG/Fvmt5IHJvenBpc3VcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucy5MemVPZHN0cmFuaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5vZHN0cmFuaXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFBhcm92YW5vOiB7IC8qcGJfUGFyICovXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzkzXCIsIC8vUkMgMzM2MDAzOTMgOiBQw6Fyb3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMzNjAwMzk0XCIsIC8vUkMgMzM2MDAzOTQgOiBab2JyYXplbsOtIMO6ZGFqxa8gbyBww6Fyb3ZhbsOpIHByb3RpcG9sb8W+Y2VcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnBhcm92YW5vKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RIaXN0b3JpZVBhcm92YW5pOiB7IC8qcGJfSGlzUGFyICovXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMzk1XCIsIC8vUkMgMzM2MDAzOTUgOiBIaXN0b3JpZSBww6Fyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDM5NlwiLCAvL1JDIDMzNjAwMzk2IDogWm9icmF6ZW7DrSDDumRhasWvIG8gaGlzdG9yaWkgcMOhcm92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0Lmhpc3RvcmllUGFyb3ZhbmkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vYXNpIHbFvmR5IHBvdm9sZW5vP1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiYnVjX3B0bV9yb3pwb2xcIixcclxuICAgICAgICAgICAgICAgICAgICBpeHNTdHI6IHRoYXQuZGJwYXJhbXMuYnVjX3B0bV9yb3pwb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdSb3pwaXNQb2xvemt5OlByaW50UGFyYW1ldGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IGl4cDogdGhhdC5peHAsIHJhZGVrX3BvbDogdGhhdC5yYWRla19wb2wgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbnRleHRtZW51XHJcbiAgICAgICAgICAgICAgICBhY3RaYXVjdG92YXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzOTdcIiwgLy9SQyAzMzYwMDM5NyA6IFphw7rEjXRvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5zZXJ2aWNlUGVybWlzc2lvbnMuTHplWmF1Y3RvdmF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC56YXVjdG92YXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE5hcG9qZW5pUG9wbGF0bmljaUREUDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDM5OFwiLCAvL1JDIDMzNjAwMzk4IDogTmFwb2plbsOtIHBvcGxhdG7DrWNpIEREUFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5uYXBvamVuaVBvcGxhdG5pY2lERFAoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByaWxvaHk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAzOTlcIiwgLy9SQyAzMzYwMDM5OSA6IFDFmcOtbG9oeVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5wcmlsb2h5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RVY2V0bmlaYXBpc3k6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblVjZXRuaVphcGlzeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LnVjZXRuaVphcGlzeSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdERpYWdJRDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQwMFwiLCAvL1JDIDMzNjAwNDAwIDogRGlhZ25vc3RpY2vDqSBJRFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5kaWFnSUQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RQcmVkcGlzeSpcIiwgXCJhY3REYXZreUFWKlwiLCBcImFjdERhdmt5U0lQTypcIiwgXCJhY3RBdml6YSpcIiwgXCJhY3RWcmF0YmFCKlwiLCBcImFjdFNvdWJvcipcIiwgXCJhY3RLb3Bpcm92YXQqXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdERvcG9jaXRhdCpcIiwgXCJhY3RPZHBhcm92YXQqXCIsIFwiYWN0U3Rvcm5vKlwiLCBcImFjdE9kc3RyYW5pdCpcIiwgXCJhY3RQYXJvdmFub1wiLCBcImFjdEhpc3RvcmllUGFyb3ZhbmlcIiwgXCJhY3RQcmlsb2h5XCIsIFwiYWN0TmFwb2plbmlQb3BsYXRuaWNpRERQXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdFphdWN0b3ZhdCpcIiwgXCJhY3RVY2V0bmlaYXBpc3lcIiwgXCJhY3REaWFnSURcIiwgXCJhY3RUaXNrKlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGNvbW1hbmRiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb21tYW5kQmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RVbG96aXQhXCIsIFwiYWN0WmF2cml0KlwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqVnl0dm/FmWVuw60gZ3JpZHUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3pwaXNQb2xvemt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFya2luZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudTogdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RQYXJvdmFub1wiLCBcImFjdEhpc3RvcmllUGFyb3ZhbmlcIiwgXCJhY3RQcmlsb2h5XCIsIFwiYWN0TmFwb2plbmlQb3BsYXRuaWNpRERQXCIsIFwiYWN0VWNldG5pWmFwaXN5XCIsIFwiYWN0RGlhZ0lEXCJdKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLklzbC5WaWV3PEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4odGhpcy5pc2wuQnVjUm96cGlzUG9sb3preS5saXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogeyBpeHA6IHRoaXMuaXhwLCByYWRla19wb2w6IHRoaXMucmFkZWtfcG9sIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wiUGVybWlzc2lvbnNcIl1cclxuICAgICAgICAgICAgICAgICAgICB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFtcIml4cFwiLCBcInJhZGVrX3BvbFwiLCBcInN1YnJhZGVrXCIsIFwicmFkZWtfYXZcIiwgXCJuZXdfaWRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVzcG9uc2U6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCByb3cgb2YgZGF0YS5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXN0a3kuY19yb3ogPSB0aGlzLmNhc3RreS5jX3Jvei5wbHVzKHBhcnNlRGVjaW1hbChyb3cuYyA/PyAwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhc3RreS5jX3pieSA9IHRoaXMuY2FzdGt5LmMubWludXModGhpcy5jYXN0a3kuY19yb3opO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHcmlkU3RhdHVzV2lkZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0S29waXJvdmF0Py5lbmFibGVkKCh0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucy5MemVLb3Bpcm92YXQ/LnZhbHVlID8/IGZhbHNlKSAmJiAhdGhpcy5jYXN0a3kuY196YnkuZXF1YWxzKDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RG9wb2NpdGF0Py5lbmFibGVkKCh0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucy5MemVEb3BvY2l0YXQ/LnZhbHVlID8/IGZhbHNlKSAmJiAhdGhpcy5jYXN0a3kuY196YnkuZXF1YWxzKDApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVCZWZvcmVDaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIHNlIGVkaXR1amUsIG5lanNvdSBwb3ZvbGVueSB6bcSbbnkgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuJGdyaWQ/LmZpbmQoXCIucm93LmVkaXRpbmdcIik/Lmxlbmd0aCA/PyAwKSA8IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInJhZGVrX2F2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAc19wb2wgPT0gNDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNDAxXCIsIC8vUkMgMzM2MDA0MDEgOiBTdGF2ICduZXNww6Fyb3bDoW5vJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBzX3BvbCA9PSAzMCBvciBAc19wb2wgPT0gMzVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNDAyXCIsIC8vUkMgMzM2MDA0MDIgOiBTdGF2ICdzcMOhcm92w6FubyBkbyDDusSNZXRuaWN0dsOtJyBuZWJvICdzcMOhcm92w6FuIGRvIEZVQydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnB1cnBsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBzX3BvbCA9PSAyMCBvciBAc19wb2wgPT0gMjUgb3IgQHNfcG9sID09IDI3XCIsIC8vMjAgamUgdiBUSyBEYXJrR3JlZW4sIGFsZSB0byB2ZSBXSyBuZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA0MDNcIiwgLy9SQyAzMzYwMDQwMyA6IFN0YXYgJ3Nww6Fyb3bDoW5vIGF1dG9tYXRpY2t5JyBuZWJvICdzcMOhcm92w6FubyBtYW51w6FsbsSbJyBuZWJvICdzcMOhcm92w6FubyByb3pwaXNlbSBwbGF0ZWInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmVlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBzX3BvbCA9PSA1MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA0MDRcIiwgLy9SQyAzMzYwMDQwNCA6IFN0YXYgJ25lc3DDoXJvdsOhbi16cnXFoWVuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZSAvL3YgVEsgdGVhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBjIDwgMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA0MDVcIiwgLy9SQyAzMzYwMDQwNSA6IMSMw6FzdGthIG1lbsWhw60gbmXFviAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHlUbzogXCJjLGNfbWVuYVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93OiBhbnkgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8+KCQoZXYudGFyZ2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IHJvdyBhcyBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8gJiB7IG5ld19pZDogbnVtYmVyIH0gfCBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IHZvaWQgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEVkaXRvdmF0Py51cGRhdGVQZXJtaXNzaW9uKHJvdy5QZXJtaXNzaW9ucywgXCJMemVFZGl0b3ZhdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQYXJvdmFubz8udXBkYXRlUGVybWlzc2lvbihyb3cuUGVybWlzc2lvbnMsIFwiTHplUGFyb3Zhbm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VWNldG5pWmFwaXN5Py51cGRhdGVQZXJtaXNzaW9uKHJvdy5QZXJtaXNzaW9ucywgXCJMemVVY2V0bmlaYXBpc3lcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0TmFwb2plbmlQb3BsYXRuaWNpRERQPy5lbmFibGVkKChyb3cuaXhwX3BsID8/IFwiXCIpLnRyaW0oKS5sZW5ndGggPT0gMTIpOyAvL2plIHRvIHBpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEhpc3RvcmllUGFyb3Zhbmk/LmVuYWJsZWQoKHJvdy5uZXdfaWQpID8gZmFsc2UgOiB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcmlsb2h5UG9sb3preT8uZW5hYmxlZCgocm93Lm5ld19pZCkgPyBmYWxzZSA6IHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERpYWdJRFBvbG96a3k/LmVuYWJsZWQoKHJvdy5uZXdfaWQpID8gZmFsc2UgOiB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RFZGl0b3ZhdD8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0UGFyb3Zhbm8/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFVjZXRuaVphcGlzeT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0TmFwb2plbmlQb3BsYXRuaWNpRERQPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RIaXN0b3JpZVBhcm92YW5pPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcmlsb2h5UG9sb3preT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGlhZ0lEUG9sb3preT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5nZ3JpZHJvd2VkaXRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dDb3B5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVN0YXJ0OiAoZXYsIGluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9rb250cm9sYSBwb3ZvbGVuw60gZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Blcm1pc3Npb24gcHJvIGVkaXRhY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaW5mby5jZWxsSW5mby5kYXRhLlBlcm1pc3Npb25zPy5MemVFZGl0b3ZhdD8udmFsdWUgPz8gZmFsc2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLiRncmlkLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhhdC52YWxpZGF0b3JzUG9sb3preSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQ/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFphdWN0b3ZhdD8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzYXZlOiAoZGF0YSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZGF0YS5mbGFnRWRpdGVkID8/IDIpID4gMSAmJiB0aGF0LiRncmlkLmZpbmRGaWVsZHMoKS5nZm9ybShcImhhc0NoYW5nZWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mbGFnRWRpdGVkID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhc3RreS5jX3JveiA9IHRoaXMuY2FzdGt5LmNfcm96Lm1pbnVzKHBhcnNlRGVjaW1hbChvYmouY2VsbEluZm8uZGF0YS5jID8/IDApKTsgLy9vZGXEjXRlbsOtIHDFr3ZvZG7DrSDEjcOhc3RreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENSb3oocGFyc2VEZWNpbWFsKGRhdGEuYyA/PyAwKSk7IC8vcMWZacSNdGVuw60gbm92w6kgxI3DoXN0a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRHcmlkU3RhdHVzV2lkZ2V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS51cGRhdGVQZXJtaXNzaW9uKHRoYXQuc2VydmljZVBlcm1pc3Npb25zLkx6ZVN0b3Jubyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQhLnVwZGF0ZVBlcm1pc3Npb24odGhhdC5zZXJ2aWNlUGVybWlzc2lvbnMuTHplT2RzdHJhbml0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFphdWN0b3ZhdCEudXBkYXRlUGVybWlzc2lvbih0aGF0LnNlcnZpY2VQZXJtaXNzaW9ucy5MemVaYXVjdG92YXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS51cGRhdGVQZXJtaXNzaW9uKHRoYXQuc2VydmljZVBlcm1pc3Npb25zLkx6ZVN0b3Jubyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQhLnVwZGF0ZVBlcm1pc3Npb24odGhhdC5zZXJ2aWNlUGVybWlzc2lvbnMuTHplT2RzdHJhbml0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFphdWN0b3ZhdCEudXBkYXRlUGVybWlzc2lvbih0aGF0LnNlcnZpY2VQZXJtaXNzaW9ucy5MemVaYXVjdG92YXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0R3JpZFN0YXR1c1dpZGdldCgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBncmlkZm9ybcOhdHUgcHJvIHJvenBpcyBwb2xvxb5reVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IERhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9OYW1lcy5zX3BvbF96a3IsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMThcIiwgLy9SQyAzMzYwMDExOCA6IFMgXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMTE5XCIsIC8vUkMgMzM2MDAxMTkgOiBTdGF2IHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzIsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBkYXRhLnNfcG9sX3prciA/PyBcIlwiOyB9LFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS5zX3BvbF90eHQgPz8gXCJcIjsgfSxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9GcmFnbWVudHMuc19wb2xfemtyXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9OYW1lcy5zX3phdV96a3IsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMjFcIiwgLy9SQyAzMzYwMDEyMSA6IFUgXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMTIyXCIsIC8vUkMgMzM2MDAxMjIgOiBTdGF2IHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzIsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7IHJldHVybiBkYXRhLnNfemF1X3prciA/PyBcIlwiOyB9LFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiAoZGF0YSkgPT4geyByZXR1cm4gZGF0YS5zX3phdV90eHQgPz8gXCJcIjsgfSxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9GcmFnbWVudHMuc196YXVfemtyXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9OYW1lcy5hY191Y3QsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMjNcIiwgLy9SQyAzMzYwMDEyMyA6IMSMw61zLsO6xI0uZG9rLlxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDEyNFwiLCAvL1JDIDMzNjAwMTI0IDogxIzDrXNsbyDDusSNZXRuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b0ZyYWdtZW50cy5hY191Y3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRCYW5rb3ZuaVVjZXRDaXppKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b05hbWVzLnVjZXRfY2ksXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMudWNldF9jaSxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9GcmFnbWVudHMudWNldF9jaVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b05hbWVzLmMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMzBcIiwgLy9SQyAzMzYwMDEzMCA6IMSMw6FzdGthIHYgQ1pLXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b0ZyYWdtZW50cy5jLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMTMxXCIsIC8vUkMgMzM2MDAxMzEgOiDEjMOhc3RrYSB2IENaSyBuZXNtw60gYsO9dCBudWxvdsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7IHJldHVybiAhcGFyc2VEZWNpbWFsKHZhbCA/PyAwKS5lcXVhbHMoMCk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL8SNw6FzdGthIG3Em255XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZW5hID0gdGhhdC4kZ3JpZC5maW5kRmllbGRzKFwibWVuYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5tZW5hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lbmEgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZmluZEZpZWxkcyhcImNfbWVuYVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjdHgudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTI1XCIsIC8vUkMgMzM2MDAxMjUgOiBWU1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDEyNlwiLCAvL1JDIDMzNjAwMTI2IDogVmFyaWFiaWxuw60gc3ltYm9sXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b0ZyYWdtZW50cy52cyxcclxuICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMudnMsXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b05hbWVzLmtzLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTQwXCIsIC8vUkMgMzM2MDAxNDAgOiBLU1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDE0MVwiLCAvL1JDIDMzNjAwMTQxIDogS29uc3RhbnRuw60gc3ltYm9sXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b0ZyYWdtZW50cy5rc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMuc3MsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNDJcIiwgLy9SQyAzMzYwMDE0MiA6IFNTXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMTQzXCIsIC8vUkMgMzM2MDAxNDMgOiBTcGVjaWZpY2vDvSBzeW1ib2xcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvRnJhZ21lbnRzLnNzLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9OYW1lcy5zcyxcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMuZGF0X3phcCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDEzNlwiLCAvL1JDIDMzNjAwMTM2IDogWmFwbGFjZW5vXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMTM3XCIsIC8vUkMgMzM2MDAxMzcgOiBEYXR1bSB6YXBsYWNlbsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b0ZyYWdtZW50cy5kYXRfemFwLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdkYXRlYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMuZGF0X3phcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMTM4XCIsIC8vUkMgMzM2MDAxMzggOiBEYXR1bSBuZXNtw60gYsO9dCBtZW7FocOtIG5lxb4gZGF0dW0gcG/EjcOhdGXEjW7DrWhvIHrFr3N0YXRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFsaWRhdGU6ICh2YWwsIHNyYykgPT4geyByZXR1cm4gIShwYXJzZURhdGUodmFsKSA8IHBhcnNlRGF0ZSh0aGF0LmZpbmRGaWVsZHMoXCJkYXRfc3RyX3p1c1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAxMzlcIiwgLy9SQyAzMzYwMDEzOSA6IERhdHVtIG5lc23DrSBiw710IHbEm3TFocOtIG5lxb4gZGF0dW0ga29uZcSNbsOpaG8gesWvc3RhdGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB2YWxpZGF0ZTogKHZhbCwgc3JjKSA9PiB7IHJldHVybiAhKHBhcnNlRGF0ZSh2YWwpID4gcGFyc2VEYXRlKHRoYXQuZmluZEZpZWxkcyhcImRhdF9ub3ZfenVzXCIpLmdmaWVsZChcImdldFZhbHVlXCIpKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMuZGF0X29kcCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDQwNlwiLCAvL1JDIDMzNjAwNDA2IDogRGF0dW0gVVVQXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwNDA3XCIsIC8vUkMgMzM2MDA0MDcgOiBEYXR1bSB1c2t1dGXEjW7Em27DrSDDusSNZXRuw61obyBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvRnJhZ21lbnRzLmRhdF9vZHAsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2RhdGVib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9OYW1lcy5kYXRfb2RwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDEzOFwiLCAvL1JDIDMzNjAwMTM4IDogRGF0dW0gbmVzbcOtIGLDvXQgbWVuxaHDrSBuZcW+IGRhdHVtIHBvxI3DoXRlxI1uw61obyB6xa9zdGF0a3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHsgcmV0dXJuICEocGFyc2VEYXRlKHZhbCkgPCBwYXJzZURhdGUodGhhdC5maW5kRmllbGRzKFwiZGF0X3N0cl96dXNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMzNjAwMTM5XCIsIC8vUkMgMzM2MDAxMzkgOiBEYXR1bSBuZXNtw60gYsO9dCB2xJt0xaHDrSBuZcW+IGRhdHVtIGtvbmXEjW7DqWhvIHrFr3N0YXRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFsaWRhdGU6ICh2YWwsIHNyYykgPT4geyByZXR1cm4gIShwYXJzZURhdGUodmFsKSA+IHBhcnNlRGF0ZSh0aGF0LmZpbmRGaWVsZHMoXCJkYXRfbm92X3p1c1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL11cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNDRcIiwgLy9SQyAzMzYwMDE0NCA6IFZlxZllam7DvSBwb3Bpc1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9GcmFnbWVudHMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9OYW1lcy5tZW5hX3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDEzMlwiLCAvL1JDIDMzNjAwMTMyIDogTcSbbmFcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9GcmFnbWVudHMubWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvY21lbigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b05hbWVzLm1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLm1lbmE9dmFsdWUubWVuYTttb2RlbC5tZW5hX3Npc19hYWE9PnZhbHVlLm1lbmFfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbnN0IGNfbWVuYV9maWVsZCA9IHRoYXQuJGdyaWRQb2xvemt5LmZpbmRGaWVsZHMoXCJjX21lbmFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChjdHgudmFsdWUubWVuYSA9PSAwICYmIHBhcnNlRGVjaW1hbChjX21lbmFfZmllbGQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPz8gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGNfbWVuYV9maWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LiRncmlkUG9sb3preS5maW5kRmllbGRzKFwiY1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9OYW1lcy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMzNcIiwgLy9SQyAzMzYwMDEzMyA6IMSMw6FzdGthIHYgbcSbbsSbXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQ6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b0ZyYWdtZW50cy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9OYW1lcy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAxMzRcIiwgLy9SQyAzMzYwMDEzNCA6IMSMw6FzdGthIHYgbcSbbsSbIG5lc23DrSBiw710IG51bG92w6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHsgcmV0dXJuICFwYXJzZURlY2ltYWwodmFsID8/IDApLmVxdWFscygwKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAxMzVcIiwgLy9SQyAzMzYwMDEzNSA6IE5lc291aGxhc8OtIHpuYW3DqW5rYSDEjcOhc3Rla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsLCBzcmMpID0+IHsgcmV0dXJuIChwYXJzZURlY2ltYWwodmFsID8/IDApLnRpbWVzKHRoYXQuJGdyaWQuZmluZEZpZWxkcyhcImNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpKS5ncmVhdGVyVGhhbk9yRXF1YWxUbygwKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgY29uc3QgbWVuYSA9IHRoYXQuZmluZEZpZWxkcyhcInVjZXRfdmxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/Lm1lbmE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICgodGhhdC5EZXRhaWxEdG8uc19idnkgPz8gMCkgPCAzNSAmJiBtZW5hICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGNvbnN0IGRhdF9ub3ZfenVzID0gdGhhdC5maW5kRmllbGRzKFwiZGF0X25vdl96dXNcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmlzbC5CYW5rb3ZuaVZ5cGlzQnVjLm5hamRpS3Vyem92bmlMaXN0ZWtBUHJldmVkWk1lbnlEb0N6ayh7IGRhdHVtOiBkYXRfbm92X3p1cywgY19tZW5hOiBjdHgudmFsdWUsIG1lbmE6IG1lbmEgfSkuZ2V0KCkudGhlbigoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuJGdyaWRQb2xvemt5LmZpbmRGaWVsZHMoXCJjXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMuZGF0X3ZhbCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDE0NlwiLCAvL1JDIDMzNjAwMTQ2IDogVmFsdXRhXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMTQ3XCIsIC8vUkMgMzM2MDAxNDcgOiBEYXR1bSB2YWx1dGFcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvRnJhZ21lbnRzLmRhdF92YWxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b05hbWVzLnZzMixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDE0OFwiLCAvL1JDIDMzNjAwMTQ4IDogVlMyXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNjAwMTQ5XCIsIC8vUkMgMzM2MDAxNDkgOiBWYXJpYWJpbG7DrSBzeW1ib2wgLSBwcm90aXN0cmFueVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9GcmFnbWVudHMudnMyLFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdGVqbsSbIGphayB2c1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMudnMyLFxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbHVtbnMuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9OYW1lcy5zczIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNTBcIiwgLy9SQyAzMzYwMDE1MCA6IFNTMlxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDE1MVwiLCAvL1JDIDMzNjAwMTUxIDogU3BlY2lmaWNrw70gc3ltYm9sIC0gcHJvdGlzdHJhbnlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvRnJhZ21lbnRzLnNzMixcclxuICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc3Rlam7EmyBqYWsgdnNcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b05hbWVzLnNzMixcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMucG9waXMxLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTQ1XCIsIC8vUkMgMzM2MDAxNDUgOiBEb3BsxYhrb3bDvSBwb3Bpc1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgIGZyYWdtZW50OiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9GcmFnbWVudHMucG9waXMxLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb2x1bW5zLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMuenVfdHh0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwNDA4XCIsIC8vUkMgMzM2MDA0MDggOiBacMWvc29iIMO6aHJhZHlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvRnJhZ21lbnRzLnp1X3R4dCxcclxuICAgICAgICAgICAgICAgIGVkaXRvcjogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc2FibGVkRmllbGQgPSBvYmouY2VsbEluZm8uZGF0YS56dSA9PSAzMCB8fCAob2JqLmNlbGxJbmZvLmRhdGEgYXMgYW55KS5yZXppbV92eXR2b3JlbmkgPiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2N6dWgoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b05hbWVzLnp1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnp1PXZhbHVlLnp1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkRmllbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6dTogKCFkaXNhYmxlZEZpZWxkKSA/IFswLCAxMCwgMjAsIDI1LCAxMDBdIDogdm9pZCAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJwcFV1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zLmFkZFV1cyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMudXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9OYW1lcy51dXNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29sdW1ucy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvTmFtZXMuc19wb2wsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNTRcIiwgLy9SQyAzMzYwMDE1NCA6IFN0YXYgKMSNw61zZWxuxJspXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvRnJhZ21lbnRzLnNfcG9sLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sdW1ucztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBBa2NlXHJcbiAgICAgICAgLyoqIFbDvWLEm3IgcG9sb8W+ZWsgcMWZZWRwaXPFryAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJlZHBpc3kodHlwX2RvaDogbnVtYmVyID0gdGhpcy50eXBfZG9oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEaWFsb2dzLkdWeWJlclVocmFkeURsZyh7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgTW9kT3RldnJlbmk6IEdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3csXHJcbiAgICAgICAgICAgICAgICBvcHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICB2czogdGhpcy5kdG9Qb2xWeXBpcy52cyxcclxuICAgICAgICAgICAgICAgICAgICAvL2tzOiB0aGlzLmR0b1BvbFZ5cGlzLmtzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNzOiB0aGlzLmR0b1BvbFZ5cGlzLnNzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNrX3ZsOiB0aGlzLmR0b1BvbFZ5cGlzLnNrX3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1X3ZsOiB0aGlzLmR0b1BvbFZ5cGlzLmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIHNrX2NpOiB0aGlzLmR0b1BvbFZ5cGlzLnNrX2NpLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1X2NpOiB0aGlzLmR0b1BvbFZ5cGlzLmJ1X2NpLFxyXG4gICAgICAgICAgICAgICAgICAgIGM6IHRoaXMuY2FzdGt5LmMsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX2RvaDogdHlwX2RvaCxcclxuICAgICAgICAgICAgICAgICAgICBwb2NfZG9oOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNfbWVuYTogdGhpcy5kdG9Qb2xWeXBpcy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVuYTogdGhpcy5kdG9Qb2xWeXBpcy5tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdF92eXBfdnJhOiAodHlwX2RvaCA9PSAxMykgPyB0aGlzLmRhdF92eXAgOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWtfaW46IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgoZGF0YSA/PyBbXSkubGVuZ3RoID09IDApIHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH1cclxuICAgICAgICAgICAgICAgIGxldCBwcm9tID0gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwX2RvaCA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vMzU2LjEzIC0gZMWvdm9kIHZyw6FjZW7DrSBwcm8gdnJhdGt5IEJcclxuICAgICAgICAgICAgICAgICAgICAvL1NhbE1vZGFsRGlhbG9nKCBkbGdEdXZWcmEsaFduZEZvcm0sICdExa92b2QgbmV2eXBsYWNlbsOtIHBvxaF0b3Zuw60gcG91a8Ohemt5IEInLCBGQUxTRSwgbkR1dlZyYSwgc0R1dlZyYSApXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwNDA5XCIsIHRydWUpIC8vUkMgMzM2MDA0MDkgOiBExa92b2QgbmV2eXBsYWNlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmJ1Y2Nzc2IoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3Nsb2JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNfc2xvYj12YWx1ZS5zX3Nsb2I7bW9kZWwuc19zbG9iX3R4dD12YWx1ZS5zX3Nsb2JfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkZV9yZWE6IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBwcm9tID0gdGhpcy5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjMzNjAwNDEwXCIsIGZvcm0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKChjdHgpID0+IHsgLy9SQyAzMzYwMDQxMCA6IETFr3ZvZCBuZXZ5cGxhY2Vuw60gcG/FoXRvdm7DrSBwb3Vrw6F6a3kgQlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4Py5zX3Nsb2IgfHwgY3R4Py5zX3Nsb2IgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN0eDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcHJvbS50aGVuKChkdXZfdnJhX2R0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdEdG9zOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHJvdyBvZiBkYXRhISkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHRvOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8gJiBhbnkvKiAmIHtuZXdfaWQ6IG51bWJlciwgcmV6aW1fdnl0dm9yZW5pOiBudW1iZXJ9Ki8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdfaWQ6ICsrdGhpcy5wb2xvemt5TmV3SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXppbV92eXR2b3Jlbmk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnRWRpdGVkOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2RvaDogdHlwX2RvaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrX2NpOiB0aGlzLmR0b1BvbFZ5cGlzLnNrX2NpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVfY2k6IHRoaXMuZHRvUG9sVnlwaXMuYnVfY2ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y2V0X2NpOiB0aGlzLmR0b1BvbFZ5cGlzLmJ1X2NpICsgXCIvXCIgKyB0aGlzLmR0b1BvbFZ5cGlzLnNrX2NpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnM6IHJvdy52cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtzOiByb3cua3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzczogcm93LnNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3phcDogdGhpcy5kdG9Qb2xWeXBpcy5kYXRfemFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ZhbDogdGhpcy5kdG9Qb2xWeXBpcy5kYXRfdmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGljOiByb3cubGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc19wb2w6IEludGVyZmFjZS5HQnVjR2xvYmFsc0Jhc2UuU1BvbC5Qb3JpemVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbmE6ICgocm93Lm1lbmEgPz8gLTEpIDwgMCkgPyByb3cubWVuYSA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW5hX3R4dDogKChyb3cubWVuYSA/PyAtMSkgPCAwKSA/IHJvdy5tZW5hX3R4dCA6IFwiQ1pLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfb2RwOiB0aGlzLmR0b1BvbFZ5cGlzLmRhdF9vZHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfcG9rOiB0aGlzLmR0b1BvbFZ5cGlzLml4cF9wb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQZXJtaXNzaW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEx6ZUVkaXRvdmF0OiB7IHZhbHVlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTHplUm96cGlzUG9sb3plazogeyB2YWx1ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEx6ZVBhcm92YW5vOiB7IHZhbHVlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEx6ZVVjZXRuaVphcGlzeTogeyB2YWx1ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza192bDogdGhpcy5kdG9Qb2xWeXBpcy5za192bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1X3ZsOiB0aGlzLmR0b1BvbFZ5cGlzLmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX3ByZWRwaXM6IHJvdy5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRla191aHJfcHJlZHBpczogcm93LnJhZGVrX3VocixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdmthX3ByZWRwaXM6IHJvdy5kYXZrYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrX3ZsX3ByZWRwaXM6IHJvdy5za192bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1X3ZsX3ByZWRwaXM6IHJvdy5idV92bCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGVrX3ByZWRwaXM6IHJvdy5yYWRla191aHJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjID0gcGFyc2VEZWNpbWFsKHJvdy5jID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjX21lbmEgPSBwYXJzZURlY2ltYWwocm93LmNfbWVuYSA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY19wYXIgPSBwYXJzZURlY2ltYWwocm93LmNfcGFyID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjX3Bhcl9tZW5hID0gcGFyc2VEZWNpbWFsKHJvdy5jX3Bhcl9tZW5hID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0REUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LnR5cF9hZyA9PSAzNTAgJiYgYy5taW51cyhjX3BhcikubGVzc1RoYW5PckVxdWFsVG8oMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBfZG9oICE9IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8zNzguMDNYMTAgIEJ1Y1BlcC5jIDwgMCAtIFN2b3ppbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjLmxlc3NUaGFuKDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jID0gYy5taW51cyhjX3Bhcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jX21lbmEgPSBjX21lbmEubWludXMoY19wYXJfbWVuYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmMgPSBwYXJzZURlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jX21lbmEgPSBwYXJzZURlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uYyA9IGMudGltZXMoLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jX21lbmEgPSBjX21lbmEudGltZXMoLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cF9kb2ggIT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uYyA9IGMubWludXMoY19wYXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jX21lbmEgPSBjX21lbmEubWludXMoY19wYXJfbWVuYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jID0gYy50aW1lcygtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmNfbWVuYSA9IGNfbWVuYS50aW1lcygtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cF9kb2ggIT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5uYXpldiA9ICh0aGlzLmRicGFyYW1zLmJ1Y19ycG5wID09IDApID8gcm93Lm5hemV2IDogdGhpcy5kdG9Qb2xWeXBpcy5uYXpldjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by56dSA9IHRoaXMuZHRvUG9sVnlwaXMuenU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uenVfdHh0ID0gdGhpcy5kdG9Qb2xWeXBpcy56dV90eHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uZGF0X3Z5cF92cmFfcHJlZHBpcyA9IHRoaXMuZGF0X3Z5cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5uYXpldiA9IFwianJlczozMzYwMDQxMVwiLmZvcm1hdChkdXZfdnJhX2R0by5zX3Nsb2JfdHh0ID8/IFwiXCIsIHJvdy5uYXpldiA/PyBcIlwiKTsgLy9SQyAzMzYwMDQxMSA6IFZyYXRrYSBQUCBCIC0gezB9IC0gezF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uenUgPSAzMDsgLy9uYXR2cmRvIGEgemFrYXphdCBlZGl0YWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uenVfdHh0ID0gXCJqcmVzOjMzNjAwNDEyXCI7IC8vUkMgMzM2MDA0MTIgOiB2cmF0a2EgQlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmR1dl92cmEgPSBkdXZfdnJhX2R0by5zX3Nsb2I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uaXhwX3BhciA9IHJvdy5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uY2lzbG9fcGFyID0gcm93LnJhZGVrX3VocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLzM4OC4wM1gxMSAtIHphdMOtbSBwb3V6ZSBwxZnDrWpteSBQT1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy50eXBfYWcgPT0gMTgwICYmIGMuZ3JlYXRlclRoYW4oMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5peHBfcGFyID0gcm93Lml4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jaXNsb19wYXIgPSByb3cucmFkZWtfdWhyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q1JveihkdG8uYyk7IC8vbmFzdGF2w60gaW50ZXJuxJsgcm96ZXBzw6FubyArIHpiw712w6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgbkNNZW5hU3VtID0gbkNNZW5hU3VtICsgdGJsX0twLmNfbWVuYVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8zODguMDNYMTEgLSBwb2t1ZCBqZSB2eWJyw6FuIDEgcMWZZWRwaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC8qZGF0YS5sZW5ndGggPT0gMSAmJiAqL3Jvdy50eXBfYWcgPT0gMzUwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uaXhwX3BsID0gcm93Lml4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RHRvcy5wdXNoKGR0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKG5ld0R0b3MsIFwiYWRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R3JpZFN0YXR1c1dpZGdldCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFbDvWLEm3IgZMOhdmt5IEEtViovXHJcbiAgICAgICAgcHJpdmF0ZSBkYXZreUFWKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcclxuICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUFWU2V6bmFtXCIsIHsgdWlkOiBcIkdEYXZrYUFWU2V6bmFtI1wiIH1dLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNrX3ZsOiB0aGlzLmR0b1BvbFZ5cGlzLnNrX3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1X3ZsOiB0aGlzLmR0b1BvbFZ5cGlzLmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNfcHJlOiB0aGlzLmR0b1BvbFZ5cGlzLmMsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZzOiB0aGlzLmR0b1BvbFZ5cGlzLnZzXHJcbiAgICAgICAgICAgICAgICB9LCB7IC8qd2lkdGg6IDU4MCwgaGVpZ2h0OiA0NTAqLyB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoZGF2a2E/OiBudW1iZXIgfCBudWxsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdmthIHx8IGRhdmthID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nVm9sYmFEYXRhWmFwbGFjZW5pKDAsIFwiYnVjX2R1YXZcIikudGhlbigobkRhdFphcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y1JvenBpc1BvbG96a3kubGlzdERhdmt5QVYoeyBkYXZrYTogZGF2a2EsIGl4cDogdGhpcy5kdG9Qb2xWeXBpcy5peHAhLCByYWRla19wb2w6IHRoaXMuZHRvUG9sVnlwaXMucmFkZWtfcG9sISB9KS5nZXREYXRhKCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWt0dWFsbmlfZGF2a2EgPSBkYXZrYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcm93IG9mIChkYXRhIGFzIGFueVtdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lm5ld19pZCA9ICsrdGhpcy5wb2xvemt5TmV3SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cucmV6aW1fdnl0dm9yZW5pID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5mbGFnRWRpdGVkID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy50eXBfZG9oID0gdGhpcy50eXBfZG9oO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnJhZGVrX2RhdmthID0gcm93LnJhZGVrX3BvbDsgLy92IHJhZGVrX3BvbCBqZSBha3R1w6FsbsSbIMWZw6FkZWsgZMOhdmt5ICjEjcOhc3QgUEspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZGF0X29kcCA9IHRoaXMuZHRvUG9sVnlwaXMuZGF0X29kcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgKCAoIG5SZXppbSA9IDEgKSBPUiAoIG5SZXppbSA9IDIgKSBPUiAoIG5SZXppbSA9IDMgKSApIEFORCAoIG5EYXRaYXAgPSAxIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuRGF0WmFwID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZGF0X3phcCA9IHRoaXMuZGF0X3Z5cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5QZXJtaXNzaW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMemVFZGl0b3ZhdDogeyB2YWx1ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEx6ZVJvenBpc1BvbG96ZWs6IHsgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMemVQYXJvdmFubzogeyB2YWx1ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMemVVY2V0bmlaYXBpc3k6IHsgdmFsdWU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKGRhdGEsIFwic2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY2FsY3VsYXRlQ2FzdGt5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R3JpZFN0YXR1c1dpZGdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVsO9YsSbciBkw6F2a3kgU0lQTyovXHJcbiAgICAgICAgcHJpdmF0ZSBkYXZreVNJUE8oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFxyXG4gICAgICAgICAgICAgICAgW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RhdmthU0lQT1Nlem5hbVwiLCB7IHVpZDogXCJHRGF2a2FTSVBPU2V6bmFtI1wiIH1dLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNrX3ZsOiB0aGlzLmR0b1BvbFZ5cGlzLnNrX3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1X3ZsOiB0aGlzLmR0b1BvbFZ5cGlzLmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNfcHJlOiB0aGlzLmR0b1BvbFZ5cGlzLmMsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kOiAxXHJcbiAgICAgICAgICAgICAgICB9LCB7IC8qd2lkdGg6IDU4MCwgaGVpZ2h0OiA0NTAqLyB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoZGF2a2E/OiBJbnRlcmZhY2UuR0RhdmthU0lQT0R0byB8IG51bGwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF2a2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nVm9sYmFEYXRhWmFwbGFjZW5pKDEsIFwiYnVjX2R1c2lcIikudGhlbigobkRhdFphcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y1JvenBpc1BvbG96a3kubGlzdERhdmt5U0lQTyh7IGRhdmthOiBkYXZrYS5kYXZrYT8/LTEsIGl4cDogdGhpcy5kdG9Qb2xWeXBpcy5peHAhLCByYWRla19wb2w6IHRoaXMuZHRvUG9sVnlwaXMucmFkZWtfcG9sISB9KS5nZXREYXRhKCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWt0dWFsbmlfZGF2a2EgPSBkYXZrYS5kYXZrYT8/LTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHJvdyBvZiAoZGF0YSBhcyBhbnlbXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5uZXdfaWQgPSArK3RoaXMucG9sb3preU5ld0lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnJlemltX3Z5dHZvcmVuaSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZmxhZ0VkaXRlZCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cudHlwX2RvaCA9IHRoaXMudHlwX2RvaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5yYWRla19kYXZrYV9zaXBvID0gcm93LmRhdmthX3NpcG87IC8vdiByYWRla19kYXZrYV9zaXBvIGplIGFrdHXDoWxuxJsgxZnDoWRlayBkw6F2a3kgLSBzcG9qX2NpcyAoxI3DoXN0IFBLKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdF9vZHAgPSB0aGlzLmR0b1BvbFZ5cGlzLmRhdF9vZHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmICggKCBuUmV6aW0gPSAxICkgT1IgKCBuUmV6aW0gPSAyICkgT1IgKCBuUmV6aW0gPSAzICkgKSBBTkQgKCBuRGF0WmFwID0gMSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobkRhdFphcCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdF96YXAgPSB0aGlzLmRhdF92eXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuUGVybWlzc2lvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTHplRWRpdG92YXQ6IHsgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMemVSb3pwaXNQb2xvemVrOiB7IHZhbHVlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTHplUGFyb3Zhbm86IHsgdmFsdWU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTHplVWNldG5pWmFwaXN5OiB7IHZhbHVlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikudXBkYXRlRGF0YShkYXRhLCBcInNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNhbGN1bGF0ZUNhc3RreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdyaWRTdGF0dXNXaWRnZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFbDvWLEm3IgZMOhdmt5IEF2w616byovXHJcbiAgICAgICAgcHJpdmF0ZSBkYXZreUF2aXpvKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcclxuICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdEYXZrYUF2aXpvU2V6bmFtXCIsIHsgdWlkOiBcIkdEYXZrYUF2aXpvU2V6bmFtI1wiIH1dLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNrX3ZsOiB0aGlzLmR0b1BvbFZ5cGlzLnNrX3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1X3ZsOiB0aGlzLmR0b1BvbFZ5cGlzLmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNfcHJlOiB0aGlzLmR0b1BvbFZ5cGlzLmMsXHJcbiAgICAgICAgICAgICAgICAgICAgdnM6IHRoaXMuZHRvUG9sVnlwaXMudnMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3M6IHRoaXMuZHRvUG9sVnlwaXMuc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kOiAxXHJcbiAgICAgICAgICAgICAgICB9LCB7IC8qd2lkdGg6IDU4MCwgaGVpZ2h0OiA0NTAqLyB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoZGF2a2E/OiBJbnRlcmZhY2UuR0RhdmthQXZpem9EdG8gfCBudWxsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdmthKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ1ZvbGJhRGF0YVphcGxhY2VuaSgyLCBcImJ1Y19kdXBrXCIpLnRoZW4oKG5EYXRaYXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNSb3pwaXNQb2xvemt5Lmxpc3REYXZreUF2aXpvKHsgZGF2a2E6IGRhdmthLmRhdmthID8/IC0xLCBpeHA6IHRoaXMuZHRvUG9sVnlwaXMuaXhwISwgcmFkZWtfcG9sOiB0aGlzLmR0b1BvbFZ5cGlzLnJhZGVrX3BvbCEgfSkuZ2V0RGF0YSgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YT8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFrdHVhbG5pX2RhdmthID0gZGF2a2EuZGF2a2EgPz8gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHJvdyBvZiAoZGF0YSBhcyBhbnlbXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5uZXdfaWQgPSArK3RoaXMucG9sb3preU5ld0lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnJlemltX3Z5dHZvcmVuaSA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZmxhZ0VkaXRlZCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cudHlwX2RvaCA9IHRoaXMudHlwX2RvaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5yYWRla19kYXZrYSA9IHJvdy5yYWRla19wb2w7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZGF0X29kcCA9IHRoaXMuZHRvUG9sVnlwaXMuZGF0X29kcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuRGF0WmFwID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZGF0X3phcCA9IHRoaXMuZGF0X3Z5cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5QZXJtaXNzaW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMemVFZGl0b3ZhdDogeyB2YWx1ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEx6ZVJvenBpc1BvbG96ZWs6IHsgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMemVQYXJvdmFubzogeyB2YWx1ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMemVVY2V0bmlaYXBpc3k6IHsgdmFsdWU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKGRhdGEsIFwic2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY2FsY3VsYXRlQ2FzdGt5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R3JpZFN0YXR1c1dpZGdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVsO9YsSbciBkw6F2a3kgVnJhdGthIEIqL1xyXG4gICAgICAgIHByaXZhdGUgZGF2a3lWcmF0a2FCKCkge1xyXG4gICAgICAgICAgICAvLzE1LjA0LjIwMjUgLSBkbGUgZG9tbHV2eSBzIGpzb2Nob3IgYnVkZSB1bW/Fvm7Em24gcG91emUgcmXFvmltIEplZG5vdGxpdsSbLCB0YWvFvmUgZGlhbG9nIHMgZG90YXplbSBuZW7DrSBwb3TFmWViYVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVkcGlzeSgxMyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSW1wb3J0IGTDoXZreSB6ZSBzb3Vib3J1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBzb3Vib3IoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAzNjhcIiwgdHJ1ZSkgLy9SQyAzMzYwMDM2OCA6IFNvdWJvclxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2ZpbGVmaWVsZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzb3Vib3JcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdEV4dGVuc2lvbjogXCIuY3N2XCIsIC8vdiBUSyBpIC5zdGEgYSAuZ3BjLCB0eSBzZSB6YXTDrW0gYWxlIG5lYnVkb3UgZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4RmlsZUNvdW50OiAxLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaW1wbGVGb3JtKFwianJlczozMzYwMDM2OVwiLCBmb3JtKS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoY3R4PzogeyBzb3Vib3I6IGFueVtdIH0pID0+IHsgLy9SQyAzMzYwMDM2OSA6IFZ5YmVydGUgc291Ym9yIHBybyBpbXBvcnRcclxuICAgICAgICAgICAgICAgIGlmICgoY3R4Py5zb3Vib3I/Lmxlbmd0aCA/PyAwKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjUm96cGlzUG9sb3preS5pbXBvcnRTb3Vib3J1KHsgZ3VpZDogY3R4Py5zb3Vib3JbMF0uZ3VpZCB9KS5nZXQoKS50aGVuKChuZXdSb3dzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHJvdyBvZiAobmV3Um93cyBhcyBhbnlbXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5uZXdfaWQgPSArK3RoaXMucG9sb3preU5ld0lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnJlemltX3Z5dHZvcmVuaSA9IC0xOyAvL3phdMOtbSAtMSAtIGJleiBrb250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZmxhZ0VkaXRlZCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cudHlwX2RvaCA9IHRoaXMudHlwX2RvaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5kYXRfemFwID0gdGhpcy5kdG9Qb2xWeXBpcy5kYXRfemFwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdF92YWwgPSB0aGlzLmR0b1BvbFZ5cGlzLmRhdF92YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cubGljID0gdGhpcy5kdG9Qb2xWeXBpcy5saWM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuUGVybWlzc2lvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTHplRWRpdG92YXQ6IHsgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMemVSb3pwaXNQb2xvemVrOiB7IHZhbHVlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTHplUGFyb3Zhbm86IHsgdmFsdWU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTHplVWNldG5pWmFwaXN5OiB7IHZhbHVlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENSb3oocm93LmMpOyAvL25hc3RhdsOtIGludGVybsSbIHJvemVwc8Ohbm8gKyB6YsO9dsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnVwZGF0ZURhdGEobmV3Um93cywgXCJhZGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R3JpZFN0YXR1c1dpZGdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBab2JyYXplbsOtL3Z5YnLDoW7DrSB6w6F6bmFtxa8geiBuYXBvamVuw71jaCBwb3BsYXRuw61rxa8gRERQKi9cclxuICAgICAgICBwcml2YXRlIG5hcG9qZW5pUG9wbGF0bmljaUREUCgpIHtcclxuICAgICAgICAgICAgbGV0IHJvd3M6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b1tdIHwgbnVsbCA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8+KHRoaXMuJGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXJvd3MgfHwgKHJvd3M/Lmxlbmd0aCA/PyAwKSA8IDEpIHsgdGhpcy5kaWFsb2dzLmFsZXJ0KFwianJlczozMzYwMDE1OFwiKTsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH0gLy9SQyAzMzYwMDE1OCA6IFZ5YmVydGUgYWxlc3BvxYggamVkZW4gxZnDoWRla1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXHJcbiAgICAgICAgICAgICAgICBbXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HTmFwb2plbmlQb3BsYXRuaWNpRERQXCIsIHsgdWlkOiBcIkdOYXBvamVuaVBvcGxhdG5pY2lERFAjXCIgfV0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX3BsOiAocm93c1swXSBhcyBhbnkpLml4cF9wbFxyXG4gICAgICAgICAgICAgICAgfSwgLyp7IHdpZHRoOiA1ODAsIGhlaWdodDogNDUwIH0qLykuY3JlYXRlRGlhbG9nUHJvbWlzZSgpLnRoZW4oKGN0eDogSW50ZXJmYWNlLkdOYXBvamVuaVBvcGxhdG5pY2lERFBEdG9bXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoY3R4ID8/IFtdKS5sZW5ndGggPT0gMCkgeyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL3Bva3VkIG5lbsOtIHZ5YnLDoW4gxb7DoWRuw70sIHRhayByZWplY3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0R0b3M6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b1tdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcm93IG9mIChjdHggPz8gW10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdG86IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0byAmIGFueS8qICYge25ld19pZDogbnVtYmVyLCByZXppbV92eXR2b3Jlbmk6IG51bWJlcn0qLyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld19pZDogKyt0aGlzLnBvbG96a3lOZXdJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlemltX3Z5dHZvcmVuaTogNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdFZGl0ZWQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfZG9oOiB0aGlzLnR5cF9kb2gsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza19jaTogdGhpcy5kdG9Qb2xWeXBpcy5za19jaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1X2NpOiB0aGlzLmR0b1BvbFZ5cGlzLmJ1X2NpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNldF9jaTogdGhpcy5kdG9Qb2xWeXBpcy5idV9jaSArIFwiL1wiICsgdGhpcy5kdG9Qb2xWeXBpcy5za19jaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzOiByb3cudnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrczogcm93LmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3M6IHJvdy5zcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF96YXA6IHRoaXMuZHRvUG9sVnlwaXMuZGF0X3phcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF92YWw6IHRoaXMuZHRvUG9sVnlwaXMuZGF0X3ZhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYzogcm93c1swXS5saWMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzX3BvbDogSW50ZXJmYWNlLkdCdWNHbG9iYWxzQmFzZS5TUG9sLlBvcml6ZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVuYTogcm93c1swXS5tZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVuYV90eHQ6IHJvd3NbMF0ubWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfb2RwOiB0aGlzLmR0b1BvbFZ5cGlzLmRhdF9vZHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfcG9rOiB0aGlzLmR0b1BvbFZ5cGlzLml4cF9wb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQZXJtaXNzaW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEx6ZUVkaXRvdmF0OiB7IHZhbHVlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTHplUm96cGlzUG9sb3plazogeyB2YWx1ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEx6ZVBhcm92YW5vOiB7IHZhbHVlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEx6ZVVjZXRuaVphcGlzeTogeyB2YWx1ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYyA9IHBhcnNlRGVjaW1hbChyb3cuYyA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY19tZW5hID0gcGFyc2VEZWNpbWFsKHJvdy5jID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjX3BhciA9IHBhcnNlRGVjaW1hbChyb3cuY191aHIgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNfcGFyX21lbmEgPSBwYXJzZURlY2ltYWwocm93LmNfdWhyID8/IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0REUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoLypyb3cudHlwX2FnID09IDM1MCAmJiovIGMubWludXMoY19wYXIpLmxlc3NUaGFuT3JFcXVhbFRvKDApKSB7IC8vIGplIHbFvmR5IDM1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwX2RvaCAhPSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vMzc4LjAzWDEwICBCdWNQZXAuYyA8IDAgLSBTdm96aWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYy5sZXNzVGhhbigwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uYyA9IGMubWludXMoY19wYXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uY19tZW5hID0gY19tZW5hLm1pbnVzKGNfcGFyX21lbmEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jID0gcGFyc2VEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uY19tZW5hID0gcGFyc2VEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmMgPSBjLnRpbWVzKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uY19tZW5hID0gY19tZW5hLnRpbWVzKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cF9kb2ggIT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uYyA9IGMubWludXMoY19wYXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jX21lbmEgPSBjX21lbmEubWludXMoY19wYXJfbWVuYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jID0gYy50aW1lcygtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmNfbWVuYSA9IGNfbWVuYS50aW1lcygtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwX2RvaCAhPSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLm5hemV2ID0gKHRoaXMuZGJwYXJhbXMuYnVjX3JwbnAgPT0gMCkgPyByb3cuZXN1X3R4dCA6IHRoaXMuZHRvUG9sVnlwaXMubmF6ZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uenUgPSB0aGlzLmR0b1BvbFZ5cGlzLnp1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLnp1X3R4dCA9IHRoaXMuZHRvUG9sVnlwaXMuenVfdHh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLm5hemV2ID0gXCJ7MH0gLSB7MX1cIi5mb3JtYXQocm93c1swXS5uYXpldiA/PyBcIlwiLCByb3cuZXN1X3R4dCA/PyBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by56dSA9IDMwOyAvL25hdHZyZG8gYSB6YWthemF0IGVkaXRhY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by56dV90eHQgPSBcImpyZXM6MzM2MDA0MTNcIjsgLy9SQyAzMzYwMDQxMyA6IHZyYXRrYSBCXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uZHV2X3ZyYSA9IChyb3dzWzBdIGFzIGFueSkuZHV2X3ZyYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5peHBfcGFyID0gcm93Lml4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5jaXNsb19wYXIgPSByb3dzWzBdLmNpc2xvX3BhcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENSb3ooZHRvLmMpOyAvL25hc3RhdsOtIGludGVybsSbIHJvemVwc8Ohbm8gKyB6YsO9dsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IG5DTWVuYVN1bSA9IG5DTWVuYVN1bSArIHRibF9LcC5jX21lbmFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR0by5peHBfcGwgPSByb3cuaXhwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RHRvcy5wdXNoKGR0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKG5ld0R0b3MsIFwiYWRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0R3JpZFN0YXR1c1dpZGdldCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG/FvmVuw60gem3Em24gdiByb3pwaXN1IGJhbmtvdm7DrWhvIHbDvXBpc3VcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZnJvbUNsb3NpbmcgKGRlZmF1bHQgPSBmYWxzZSkgenDFr3NvYiB2b2zDoW7DrSAoZmFsc2UgPSBzdGFuZGFyZG7DrSB1bG/FvmVuw60gdGxhxI3DrXRrZW0sIHRydWUgPSB6ZSB6YXbFmWVuw60gZGV0YWlsdSBzIG5ldWxvxb5lbsO9bWkgZGF0eSlcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxhbnk+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB1bG96aXQoZnJvbUNsb3Npbmc6IGJvb2xlYW4gPSBmYWxzZSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy9wb2xvxb5reSB2w71waXN1XHJcbiAgICAgICAgICAgIGxldCBwb2xvemt5ID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKS5maWx0ZXIoeCA9PiB4LmZsYWdFZGl0ZWQgPT0gMSB8fCB4LmZsYWdFZGl0ZWQgPT0gMik7XHJcbiAgICAgICAgICAgIGlmIChwb2xvemt5Lmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjMzNjAwNDE0XCIpLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKCgpID0+IHsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH0pIC8vUkMgMzM2MDA0MTQgOiBOZWJ5bHkgcHJvdmVkZW55IMW+w6FkbsOpIHptxJtueSBwcm8gdWxvxb5lbsOtXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vb2JlY27DvSByZcW+aW0gdnl0dm/FmWVuw60gYXNpIG5hc3Rhdm92YXQgc3DDrcWhZSBhxb4gemRlPyBVxb5pdmF0ZWwgdG90acW+IG3Fr8W+ZSB2xaFlY2hueSBkw6F2a3kgdnltYXphdCBhIHZsb8W+aXQgdMWZZWJhIHogcMWZZWRwaXN1ICgwKVxyXG4gICAgICAgICAgICAvL3bFvmR5IGJ1ZGUgZXhpc3RvdmF0IHBvdXplIGplZGVuIGRydWggdsSbdMWhw60gamFrIDBcclxuICAgICAgICAgICAgcG9sb3preS5zb21lKCh2YWwsIGlkeCwgYXJyKSA9PiB7IGlmICh2YWwucmV6aW1fdnl0dm9yZW5pID4gMCkgeyB0aGlzLnJlemltX3Z5dHZvcmVuaSA9IHZhbC5yZXppbV92eXR2b3Jlbmk7IH0gcmV0dXJuIHZhbC5yZXppbV92eXR2b3JlbmkgPiAwOyB9KVxyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gdWxvxb5lbsOtXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5CdWNSb3pwaXNQb2xvemt5Lm1hc3NVcHNlcnQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoaXMuZHRvUG9sVnlwaXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRla19wb2w6IHRoaXMuZHRvUG9sVnlwaXMucmFkZWtfcG9sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3N1YnJhZGVrOiB0aGlzLmR0b1BvbFZ5cGlzLnN1YnJhZGVrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRfem1lbmE6IHRoaXMuZHRvUG9sVnlwaXMuZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXppbV92eXR2b3Jlbmk6IHRoaXMucmV6aW1fdnl0dm9yZW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXZrYTogdGhpcy5ha3R1YWxuaV9kYXZrYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9sb3preTogcG9sb3preVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5nZXQoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZyb21DbG9zaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkKHsgY2hhbmdlZDogdGhpcy5jaGFuZ2VkIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBLb3DDrXJvdsOhbsOtIHBvc2xlZG7DrWhvIMWZw6Fka3Ugcm96cGlzdSovXHJcbiAgICAgICAgcHJpdmF0ZSBrb3Bpcm92YXQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvd3MgPSB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cygpO1xyXG4gICAgICAgICAgICBpZiAoIXJvd3MgfHwgKHJvd3M/Lmxlbmd0aCA/PyAwKSA8IDEpIHsgdGhpcy5kaWFsb2dzLmFsZXJ0KFwianJlczozMzYwMDQxNVwiKTsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH0gLy9SQyAzMzYwMDQxNSA6IE5lZXhpc3R1amUgcMWZZWRjaG96w60gesOhem5hbSBwcm8ga29ww61yb3bDoW7DrVxyXG4gICAgICAgICAgICBjb25zdCBwcmV2Um93OiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8gPSByb3dzW3Jvd3MubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIGxldCBkdG86IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0byAmIGFueS8qICYge25ld19pZDogbnVtYmVyLCByZXppbV92eXR2b3Jlbmk6IG51bWJlcn0qLyA9IHtcclxuICAgICAgICAgICAgICAgIG5ld19pZDogKyt0aGlzLnBvbG96a3lOZXdJZCxcclxuICAgICAgICAgICAgICAgIHJlemltX3Z5dHZvcmVuaTogNiwgLy9rb3DDrXJvdmF0L2RvcG/EjcOtdGF0XHJcbiAgICAgICAgICAgICAgICBmbGFnRWRpdGVkOiAxLFxyXG4gICAgICAgICAgICAgICAgc2tfdmw6IHByZXZSb3cuc2tfdmwsXHJcbiAgICAgICAgICAgICAgICBidV92bDogcHJldlJvdy5idV92bCxcclxuICAgICAgICAgICAgICAgIHNrX2NpOiBwcmV2Um93LnNrX2NpLFxyXG4gICAgICAgICAgICAgICAgYnVfY2k6IHByZXZSb3cuYnVfY2ksXHJcbiAgICAgICAgICAgICAgICB1Y2V0X2NpOiBwcmV2Um93LmJ1X2NpICsgXCIvXCIgKyBwcmV2Um93LnNrX2NpLFxyXG4gICAgICAgICAgICAgICAga3M6IHByZXZSb3cua3MsXHJcbiAgICAgICAgICAgICAgICBzczogcHJldlJvdy5zcyxcclxuICAgICAgICAgICAgICAgIGM6IHBhcnNlRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgICAgIHZzMjogcHJldlJvdy52czIsXHJcbiAgICAgICAgICAgICAgICBzczI6IHByZXZSb3cuc3MyLFxyXG4gICAgICAgICAgICAgICAgY19tZW5hOiBwYXJzZURlY2ltYWwoMCksXHJcbiAgICAgICAgICAgICAgICBtZW5hOiBwcmV2Um93Lm1lbmEsXHJcbiAgICAgICAgICAgICAgICBtZW5hX3R4dDogcHJldlJvdy5tZW5hX3R4dCxcclxuICAgICAgICAgICAgICAgIGl4cF9wb2s6IHByZXZSb3cuaXhwX3BvayxcclxuICAgICAgICAgICAgICAgIG5hemV2OiBcImpyZXM6MzM2MDA0MTZcIiwgLy9SQyAzMzYwMDQxNiA6IFJvenBpcyBwb2xvxb5reSB2w71waXN1XHJcbiAgICAgICAgICAgICAgICBQZXJtaXNzaW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIEx6ZUVkaXRvdmF0OiB7IHZhbHVlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgTHplUm96cGlzUG9sb3plazogeyB2YWx1ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIEx6ZVBhcm92YW5vOiB7IHZhbHVlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIEx6ZVVjZXRuaVphcGlzeTogeyB2YWx1ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IHogbG9naWt5IHbEm2NpIGRvcGxuxJtueSBkYWzFocOtIMO6ZGFqZSwga3RlcsOpIHNlIGppbmFrIGRvcGzFiHVqw60gcMWZZWQgaW5zZXJ0ZW0gamFrbyBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICB6dTogcHJldlJvdy56dSxcclxuICAgICAgICAgICAgICAgIHp1X3R4dDogcHJldlJvdy56dV90eHQsXHJcbiAgICAgICAgICAgICAgICBzX3BvbDogSW50ZXJmYWNlLkdCdWNHbG9iYWxzQmFzZS5TUG9sLlBvcml6ZW5hLCAvL3BvZG3DrW7Em27DqSBmb3Jtw6F0b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgZGF0X3phcDogcHJldlJvdy5kYXRfemFwIC8vYXNpIHRha3kgbG9naWNreT9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikudXBkYXRlRGF0YShkdG8sIFwiYWRkXCIpO1xyXG4gICAgICAgICAgICAvL25lbsOtIHBvdMWZZWJhIHVwZGF0ZSDEjcOhc3RreSwgcHJvdG/FvmUgamUgMCB2xb5keVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIERvcG/EjcOtdMOhbsOtIMSNw6FzdGt5IHBybyB2eXJvdm7DoW7DrSByb3pwaXN1IHZ6bmlrZW0gxZnDoWRrdSByb3pwaXN1Ki9cclxuICAgICAgICBwcml2YXRlIGRvcG9jaXRhdCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgcm93cyA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCk7XHJcbiAgICAgICAgICAgIGlmICghcm93cyB8fCAocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwNDE3XCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwNDE3IDogTmVleGlzdHVqZSBwxZllZGNob3rDrSB6w6F6bmFtIHBybyBkb3BvxI3DrXTDoW7DrVxyXG4gICAgICAgICAgICAvL1RPRE86IHbDocW+bsSbIGplIHBvdMWZZWJhIGRvdGF6IG5hIHByb3ZlZGVuw60sIGtkecW+IHUga29ww61yb3bDoW7DrSBzZSBuZXB0w6EgdsWvYmVjP1xyXG4gICAgICAgICAgICAvL3RoaXMuZGlhbG9ncy5jb25maXJtKFwiT3ByYXZkdSBjaGNldGUgZG9wb8SNw610YXQgcG9zbGVkbsOtIMWZw6FkZWsgcm96cGlzdT9cIilcclxuICAgICAgICAgICAgLy9UT0RPOiBqZSB2w6HFvm7EmyBwb3TFmWViYT8gUG8gcHJ2bsOtbSBkb3RhenUgamUgZGFsxaHDrSBzIHRleHRlbTpcclxuICAgICAgICAgICAgLy9Eb3BvxI3DrXRhbsO9IMWZw6FkZWsgcm96cGlzdSBidWRlIG3DrXQgb3BhxI1uw6kgem5hbcOpbmtvIG5lxb4gcm96ZXBpc292YW7DvSDFmcOhZGVrISBPcHJhdmR1IGhvIGNoY2V0ZSBkb3BvxI3DrXRhdCA/XHJcbiAgICAgICAgICAgIGxldCBjX21lbmFfc3VtOiBEZWNpbWFsID0gcGFyc2VEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICByb3dzLmZvckVhY2goKHZhbCwgaW5kZXgsIGFycikgPT4geyBjX21lbmFfc3VtID0gY19tZW5hX3N1bS5wbHVzKHBhcnNlRGVjaW1hbCh2YWwuY19tZW5hID8/IDApKTsgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZHRvOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8gJiBhbnkvKiAmIHtuZXdfaWQ6IG51bWJlciwgcmV6aW1fdnl0dm9yZW5pOiBudW1iZXJ9Ki8gPSB7XHJcbiAgICAgICAgICAgICAgICBuZXdfaWQ6ICsrdGhpcy5wb2xvemt5TmV3SWQsXHJcbiAgICAgICAgICAgICAgICByZXppbV92eXR2b3Jlbmk6IDYsIC8va29ww61yb3ZhdC9kb3BvxI3DrXRhdFxyXG4gICAgICAgICAgICAgICAgZmxhZ0VkaXRlZDogMSxcclxuICAgICAgICAgICAgICAgIHNrX2NpOiB0aGlzLmR0b1BvbFZ5cGlzLnNrX2NpLFxyXG4gICAgICAgICAgICAgICAgYnVfY2k6IHRoaXMuZHRvUG9sVnlwaXMuYnVfY2ksXHJcbiAgICAgICAgICAgICAgICB1Y2V0X2NpOiB0aGlzLmR0b1BvbFZ5cGlzLmJ1X2NpICsgXCIvXCIgKyB0aGlzLmR0b1BvbFZ5cGlzLnNrX2NpLFxyXG4gICAgICAgICAgICAgICAgdnM6IHRoaXMuZHRvUG9sVnlwaXMudnMsXHJcbiAgICAgICAgICAgICAgICBrczogdGhpcy5kdG9Qb2xWeXBpcy5rcyxcclxuICAgICAgICAgICAgICAgIHNzOiB0aGlzLmR0b1BvbFZ5cGlzLnNzLFxyXG4gICAgICAgICAgICAgICAgdnMyOiB0aGlzLmR0b1BvbFZ5cGlzLnZzMixcclxuICAgICAgICAgICAgICAgIHNzMjogdGhpcy5kdG9Qb2xWeXBpcy5zczIsXHJcbiAgICAgICAgICAgICAgICBjOiB0aGlzLmNhc3RreS5jX3pieSxcclxuICAgICAgICAgICAgICAgIGRhdF96YXA6IHRoaXMuZHRvUG9sVnlwaXMuZGF0X3phcCxcclxuICAgICAgICAgICAgICAgIGRhdF92YWw6IHRoaXMuZHRvUG9sVnlwaXMuZGF0X3ZhbCxcclxuICAgICAgICAgICAgICAgIG5hemV2OiBcImpyZXM6MzM2MDA0MThcIiwgLy9SQyAzMzYwMDQxOCA6IERvcG/EjWV0IGsgcm96cGlzdSBwb2xvxb5reSB2w71waXN1XHJcbiAgICAgICAgICAgICAgICBsaWM6IHRoaXMuZHRvUG9sVnlwaXMubGljLCAvL2FzaT9cclxuICAgICAgICAgICAgICAgIHNfcG9sOiBJbnRlcmZhY2UuR0J1Y0dsb2JhbHNCYXNlLlNQb2wuUG9yaXplbmEsXHJcbiAgICAgICAgICAgICAgICBjX21lbmE6IHBhcnNlRGVjaW1hbCh0aGlzLmR0b1BvbFZ5cGlzLmNfbWVuYSA/PyAwKS5taW51cyhjX21lbmFfc3VtKSxcclxuICAgICAgICAgICAgICAgIG1lbmE6IHRoaXMuZHRvUG9sVnlwaXMubWVuYSxcclxuICAgICAgICAgICAgICAgIG1lbmFfdHh0OiB0aGlzLmR0b1BvbFZ5cGlzLm1lbmFfdHh0LFxyXG4gICAgICAgICAgICAgICAgZGF0X29kcDogdGhpcy5kdG9Qb2xWeXBpcy5kYXRfb2RwLFxyXG4gICAgICAgICAgICAgICAgaXhwX3BvazogdGhpcy5kdG9Qb2xWeXBpcy5peHBfcG9rLFxyXG4gICAgICAgICAgICAgICAgUGVybWlzc2lvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBMemVFZGl0b3ZhdDogeyB2YWx1ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIEx6ZVJvenBpc1BvbG96ZWs6IHsgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICBMemVQYXJvdmFubzogeyB2YWx1ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICBMemVVY2V0bmlaYXBpc3k6IHsgdmFsdWU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiB6IGxvZ2lreSB2xJtjaSBkb3BsbsSbbnkgZGFsxaHDrSDDumRhamUsIGt0ZXLDqSBzZSBqaW5hayBkb3BsxYh1asOtIHDFmWVkIGluc2VydGVtIGpha28gZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgenU6IHRoaXMuZHRvUG9sVnlwaXMuenUsIC8vYXNpIHogaGxhdm7DrSBwb2xvxb5reT9cclxuICAgICAgICAgICAgICAgIHp1X3R4dDogdGhpcy5kdG9Qb2xWeXBpcy56dV90eHQsIC8vYXNpIHogaGxhdm7DrSBwb2xvxb5reT9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikudXBkYXRlRGF0YShkdG8sIFwiYWRkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldENSb3oodGhpcy5jYXN0a3kuY196YnkpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEdyaWRTdGF0dXNXaWRnZXQoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBIcm9tYWRuw6kgc3Rvcm5vIHZ5YnJhbsO9Y2ggcG9sb8W+ZWsgKi9cclxuICAgICAgICBwcml2YXRlIHN0b3JubygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVW5zYXZlZENoYW5nZXMoKSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwNDE5XCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwNDE5IDogUm96cGlzIG9ic2FodWplIG5ldWxvxb5lbsOpIHrDoXpuYW15IVxyXG4gICAgICAgICAgICBsZXQgcm93czogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvW10gfCBudWxsID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICghcm93cyB8fCAocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwMTU4XCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwMTU4IDogVnliZXJ0ZSBhbGVzcG/FiCBqZWRlbiDFmcOhZGVrXHJcbiAgICAgICAgICAgIGxldCB3aXphcmRDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgIElEOiBcIkdIcm9tYWRuZVN0b3Jub1BvbG96ZWtSb3pwaXN1QnVjI1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDQyMFwiLCAvL1JDIDMzNjAwNDIwIDogSHJvbWFkbsOpIHN0b3JubyBwb2xvxb5layByb3pwaXN1XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8+KCkuYWRkKHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvLCBcImNvbHVtbnNcIj4oXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgIGdyaWRQcm9maWxlOiB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4oXCJnZXRDdXJyZW50UHJvZmlsZVwiKSxcclxuICAgICAgICAgICAgICAgIGtleXM6IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvPihcImdldFZpZXdcIikua2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJvd3MsXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleXNBcnIgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4geyBpeHA6IHZhbC5peHAsIHJhZGVrX3BvbDogdmFsLnJhZGVrX3BvbCwgcmFkZWtfYXY6IHZhbC5yYWRla19hdiB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNSb3pwaXNQb2xvemt5Lnprb250cm9sdWpQcmVkU3Rvcm5vKHsgaXhwOiB0aGlzLmR0b1BvbFZ5cGlzLml4cCwgcmFkZWtfcG9sOiB0aGlzLmR0b1BvbFZ5cGlzLnJhZGVrX3BvbCwgZGF0X3ptZW5hOiB0aGlzLmR0b1BvbFZ5cGlzLmRhdF96bWVuYSwga2V5czoga2V5c0FyciB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMzNjAwMTYyXCIsIC8vUkMgMzM2MDAxNjIgOiBWw71ixJtyIHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNjJcIiwgLy9SQyAzMzYwMDE2MiA6IFbDvWLEm3IgesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDQyMVwiLCAvL1JDIDMzNjAwNDIxIDogQWtjZSBzdG9ybnVqZS9vZHN0b3JudWplICh6bcSbbmEgc3RhdnUgeiBOWiBuYSBORSBhIG9icsOhY2VuxJspIHZ5YnJhbsOpICh6YcWha3J0bnV0w6kpIHBvbG/Fvmt5IHJvenBpc3VcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfcG9sOiB2YWwucmFkZWtfcG9sLCByYWRla19hdjogdmFsLnJhZGVrX2F2IH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNSb3pwaXNQb2xvemt5Lmhyb21hZG5lU3Rvcm5vdmF0KHsgaXhwOiB0aGlzLmR0b1BvbFZ5cGlzLml4cCwgcmFkZWtfcG9sOiB0aGlzLmR0b1BvbFZ5cGlzLnJhZGVrX3BvbCwgZGF0X3ptZW5hOiB0aGlzLmR0b1BvbFZ5cGlzLmRhdF96bWVuYSwga2V5czoga2V5c0FyciB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0FyciA9IGRhdGEubWFwKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJldHVybiB7IGl4cDogdmFsLml4cCwgcmFkZWtfcG9sOiB2YWwucmFkZWtfcG9sLCByYWRla19hdjogdmFsLnJhZGVrX2F2IH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNSb3pwaXNQb2xvemt5Lnprb250cm9sdWpQcmVkU3Rvcm5vKHsgaXhwOiB0aGlzLmR0b1BvbFZ5cGlzLml4cCwgcmFkZWtfcG9sOiB0aGlzLmR0b1BvbFZ5cGlzLnJhZGVrX3BvbCwgZGF0X3ptZW5hOiB0aGlzLmR0b1BvbFZ5cGlzLmRhdF96bWVuYSwga2V5czoga2V5c0FyciB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMzNjAwMTY0XCIsIC8vUkMgMzM2MDAxNjQgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMTY1XCIgLy9SQyAzMzYwMDE2NSA6IFbDvXNsZWRlayBocm9tYWRuw6kgb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZ2V0RGF0YVJvd3MoKS5zb21lKHggPT4geC53aXpfa2luZCA9PSAyMDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpemFyZENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY3JlYXRlRGlhbG9nUHJvbWlzZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpemFyZENoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2FzaSByYWTFoWkgY2Vsw70gcmVsb2FkIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZCh7IGNoYW5nZWQ6IHRoaXMuY2hhbmdlZCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSHJvbWFkbsOpIG9kc3RyYW7Em27DrSB2eWJyYW7DvWNoIHBvbG/FvmVrICovXHJcbiAgICAgICAgcHJpdmF0ZSBvZHN0cmFuaXQoKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzOiBJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG9bXSB8IG51bGwgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8SW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgaWYgKCFyb3dzIHx8IChyb3dzPy5sZW5ndGggPz8gMCkgPCAxKSB7IHRoaXMuZGlhbG9ncy5hbGVydChcImpyZXM6MzM2MDAxNThcIik7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9IC8vUkMgMzM2MDAxNTggOiBWeWJlcnRlIGFsZXNwb8WIIGplZGVuIMWZw6FkZWtcclxuXHJcbiAgICAgICAgICAgIC8vdsWhZWNobnkgbm92xJsgdnl0dm/FmWVuw6kgesOhem5hbXkganNvdSBub3bDqSA9PiBwcm9zdMSbIG9kZWJlcnVcclxuICAgICAgICAgICAgaWYgKHJvd3MuZXZlcnkoeCA9PiAoKHggYXMgYW55KS5mbGFnRWRpdGVkID8/IDApID09IDEpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93cy5zb21lKHggPT4gKHggYXMgYW55KS5yZXppbV92eXR2b3JlbmkgPiAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5hbGVydChcImpyZXM6MzM2MDA0MjJcIik7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyAvL1JDIDMzNjAwNDIyIDogTmVsemUgb2RzdHJhbml0IG5vdsSbIG5hxI10ZW7DqSB6w6F6bmFteSB6IGTDoXZreSFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuY29uZmlybShcImpyZXM6MzM2MDA0MjNcIikuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZCkudGhlbigoKSA9PiB7IC8vUkMgMzM2MDA0MjMgOiBPcHJhdmR1IGNoY2V0ZSBvZHN0cmFuaXQgdnlicmFuw6kgcG9sb8W+a3k/XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikudXBkYXRlRGF0YShyb3dzLCBcImRlbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY2FsY3VsYXRlQ2FzdGt5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRHcmlkU3RhdHVzV2lkZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vcG9rdWQgb2JzYWh1amUgbsSbamFrw6kgcm96ZWRpdG92YW7DqSB6w6F6bmFteSAoamnFviBkxZnDrXZlIHVsb8W+ZW7DqSksIHRhayBuZWRvdm9sw61tIG9kc3RyYW5pdFxyXG4gICAgICAgICAgICBpZiAodGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoKS5zb21lKHggPT4geC5mbGFnRWRpdGVkID09IDIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwNDI0XCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgLy9SQyAzMzYwMDQyNCA6IFJvenBpcyBvYnNhaHVqZSBuZXVsb8W+ZW7DqSB1cHJhdmVuw6kgesOhem5hbXkhXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB3aXphcmRDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8SW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwiR0hyb21hZG5lT2RzdHJhbmVuaVBvbG96ZWtSb3pwaXN1QnVjI1wiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDQyNVwiLCAvL1JDIDMzNjAwNDI1IDogSHJvbWFkbsOpIG9kc3RyYW7Em27DrSBwb2xvxb5layByb3pwaXN1XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8+KCkuYWRkKHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvLCBcImNvbHVtbnNcIj4oXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgIGdyaWRQcm9maWxlOiB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4oXCJnZXRDdXJyZW50UHJvZmlsZVwiKSxcclxuICAgICAgICAgICAgICAgIGtleXM6IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvPihcImdldFZpZXdcIikua2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJvd3MsXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleXNBcnJEQjogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5c0Fyck5vREI6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2YWwsIGlkeCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodmFsIGFzIGFueSkuZmxhZ0VkaXRlZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzQXJyREIucHVzaCh7IGl4cDogdmFsLml4cCwgcmFkZWtfcG9sOiB2YWwucmFkZWtfcG9sLCByYWRla19hdjogdmFsLnJhZGVrX2F2IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5c0Fyck5vREIucHVzaCh7IG5ld19pZDogKHZhbCBhcyBhbnkpLm5ld19pZCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y1JvenBpc1BvbG96a3kuemtvbnRyb2x1alByZWRPZHN0cmFuaXQoeyBpeHA6IHRoaXMuZHRvUG9sVnlwaXMuaXhwLCByYWRla19wb2w6IHRoaXMuZHRvUG9sVnlwaXMucmFkZWtfcG9sLCBkYXRfem1lbmE6IHRoaXMuZHRvUG9sVnlwaXMuZGF0X3ptZW5hLCBrZXlzOiBrZXlzQXJyREIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzQXJyTm9EQi5mb3JFYWNoKCh2YWwsIGlkeCwgYXJyKSA9PiB7IHJlcy5wdXNoKHsgLi4udmFsLCB3aXpfa2luZDogSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MsIHdpel9jaGVjazogdHJ1ZSwgd2l6X3R4dF9lcnI6IFwianJlczozMzYwMDQyNlwiIH0pOyB9KTsgLy9SQyAzMzYwMDQyNiA6IFBvdm9sZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDE2MlwiLCAvL1JDIDMzNjAwMTYyIDogVsO9YsSbciB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMTYyXCIsIC8vUkMgMzM2MDAxNjIgOiBWw71ixJtyIHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA0MjdcIiwgLy9SQyAzMzYwMDQyNyA6IEFrY2Ugb2RzdHJhbsOtIHZ5YnJhbsOpICh6YcWha3J0bnV0w6kpIHBvbG/Fvmt5IHJvenBpc3VcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25ldWxvxb5lbsOhIGRhdGEgbmVtdXPDrW0gYW5pIG9kc3RyYcWIb3ZhdCB6IGdyaWR1LCBwcm90b8W+ZSBwbyDDunNwxJtjaHUgZG9qZGUgayBjZWxrb3bDqW11IHJlbG9hZHUgcm96cGlzdSBhIGRhdGEgem1pesOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyREI6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyTm9EQjogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2YWwsIGlkeCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHZhbCBhcyBhbnkpLmZsYWdFZGl0ZWQgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXNBcnJEQi5wdXNoKHsgaXhwOiB2YWwuaXhwLCByYWRla19wb2w6IHZhbC5yYWRla19wb2wsIHJhZGVrX2F2OiB2YWwucmFkZWtfYXYgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXNBcnJOb0RCLnB1c2goeyBuZXdfaWQ6ICh2YWwgYXMgYW55KS5uZXdfaWQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNSb3pwaXNQb2xvemt5Lmhyb21hZG5lT2RzdHJhbml0KHsgaXhwOiB0aGlzLmR0b1BvbFZ5cGlzLml4cCwgcmFkZWtfcG9sOiB0aGlzLmR0b1BvbFZ5cGlzLnJhZGVrX3BvbCwgZGF0X3ptZW5hOiB0aGlzLmR0b1BvbFZ5cGlzLmRhdF96bWVuYSwga2V5czoga2V5c0FyckRCIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5c0Fyck5vREIuZm9yRWFjaCgodmFsLCBpZHgsIGFycikgPT4geyByZXMucHVzaCh7IC4uLnZhbCwgd2l6X2tpbmQ6IElzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzLCB3aXpfY2hlY2s6IHRydWUsIHdpel90eHRfZXJyOiBcImpyZXM6MzM2MDA0MjhcIiB9KTsgfSk7IC8vUkMgMzM2MDA0MjggOiBQcm92ZWRlbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyREI6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyTm9EQjogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2YWwsIGlkeCwgYXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHZhbCBhcyBhbnkpLmZsYWdFZGl0ZWQgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXNBcnJEQi5wdXNoKHsgaXhwOiB2YWwuaXhwLCByYWRla19wb2w6IHZhbC5yYWRla19wb2wsIHJhZGVrX2F2OiB2YWwucmFkZWtfYXYgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXNBcnJOb0RCLnB1c2goeyBuZXdfaWQ6ICh2YWwgYXMgYW55KS5uZXdfaWQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNSb3pwaXNQb2xvemt5Lnprb250cm9sdWpQcmVkT2RzdHJhbml0KHsgaXhwOiB0aGlzLmR0b1BvbFZ5cGlzLml4cCwgcmFkZWtfcG9sOiB0aGlzLmR0b1BvbFZ5cGlzLnJhZGVrX3BvbCwgZGF0X3ptZW5hOiB0aGlzLmR0b1BvbFZ5cGlzLmRhdF96bWVuYSwga2V5czoga2V5c0FyckRCIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5c0Fyck5vREIuZm9yRWFjaCgodmFsLCBpZHgsIGFycikgPT4geyByZXMucHVzaCh7IC4uLnZhbCwgd2l6X2tpbmQ6IElzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzLCB3aXpfY2hlY2s6IHRydWUsIHdpel90eHRfZXJyOiBcImpyZXM6MzM2MDA0MjlcIiB9KTsgfSk7IC8vUkMgMzM2MDA0MjkgOiBQb3ZvbGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDE2NFwiLCAvL1JDIDMzNjAwMTY0IDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDE2NVwiIC8vUkMgMzM2MDAxNjUgOiBWw71zbGVkZWsgaHJvbWFkbsOpIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmdldERhdGFSb3dzKCkuc29tZSh4ID0+IHgud2l6X2tpbmQgPT0gMjAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aXphcmRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3aXphcmRDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9hc2kgcmFkxaFpIGNlbMO9IHJlbG9hZCBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWQoeyBjaGFuZ2VkOiB0aGlzLmNoYW5nZWQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEhyb21hZG7DqSB6YcO6xI10b3bDoW7DrSB2eWJyYW7DvWNoIHBvbG/FvmVrKi9cclxuICAgICAgICBwcml2YXRlIHphdWN0b3ZhdCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVW5zYXZlZENoYW5nZXMoKSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwNDMwXCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwNDMwIDogUm96cGlzIG9ic2FodWplIG5ldWxvxb5lbsOpIHrDoXpuYW15IVxyXG4gICAgICAgICAgICBsZXQgcm93czogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvW10gfCBudWxsID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICghcm93cyB8fCAocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwMTU4XCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwMTU4IDogVnliZXJ0ZSBhbGVzcG/FiCBqZWRlbiDFmcOhZGVrXHJcbiAgICAgICAgICAgIGxldCB3aXphcmRDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgIElEOiBcIkdIcm9tYWRuZVphdWN0b3ZhbmlQb2xvemVrUm96cGlzdUJ1YyNcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDA0MzFcIiwgLy9SQyAzMzYwMDQzMSA6IEhyb21hZG7DqSB6YcO6xI10b3bDoW7DrSBwb2xvxb5layByb3pwaXN1XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8+KCkuYWRkKHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvLCBcImNvbHVtbnNcIj4oXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpIHx8IFtdKSxcclxuICAgICAgICAgICAgICAgIGdyaWRQcm9maWxlOiB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4oXCJnZXRDdXJyZW50UHJvZmlsZVwiKSxcclxuICAgICAgICAgICAgICAgIGtleXM6IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvPihcImdldFZpZXdcIikua2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJvd3MsXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleXNBcnIgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4geyBpeHA6IHZhbC5peHAsIHJhZGVrX3BvbDogdmFsLnJhZGVrX3BvbCwgcmFkZWtfYXY6IHZhbC5yYWRla19hdiB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5CdWNSb3pwaXNQb2xvemt5Lnprb250cm9sdWpQcmVkWmF1Y3RvdmFuaW0oeyBpeHA6IHRoaXMuZHRvUG9sVnlwaXMuaXhwLCByYWRla19wb2w6IHRoaXMuZHRvUG9sVnlwaXMucmFkZWtfcG9sLCBkYXRfem1lbmE6IHRoaXMuZHRvUG9sVnlwaXMuZGF0X3ptZW5hLCBrZXlzOiBrZXlzQXJyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDE2MlwiLCAvL1JDIDMzNjAwMTYyIDogVsO9YsSbciB6w6F6bmFtxa9cclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMTYyXCIsIC8vUkMgMzM2MDAxNjIgOiBWw71ixJtyIHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDA0MzJcIiwgIC8vUkMgMzM2MDA0MzIgOiBBa2NlIHphw7rEjXR1amUgdnlicmFuw6kgKHphxaFrcnRudXTDqSkgcG9sb8W+a3kgcm96cGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXlzQXJyID0gZGF0YS5tYXAoKHZhbCwgaWR4LCBhcnIpID0+IHsgcmV0dXJuIHsgaXhwOiB2YWwuaXhwLCByYWRla19wb2w6IHZhbC5yYWRla19wb2wsIHJhZGVrX2F2OiB2YWwucmFkZWtfYXYgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLkJ1Y1JvenBpc1BvbG96a3kuaHJvbWFkbmVaYXVjdG92YXQoeyBpeHA6IHRoaXMuZHRvUG9sVnlwaXMuaXhwLCByYWRla19wb2w6IHRoaXMuZHRvUG9sVnlwaXMucmFkZWtfcG9sLCBkYXRfem1lbmE6IHRoaXMuZHRvUG9sVnlwaXMuZGF0X3ptZW5hLCBrZXlzOiBrZXlzQXJyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleXNBcnIgPSBkYXRhLm1hcCgodmFsLCBpZHgsIGFycikgPT4geyByZXR1cm4geyBpeHA6IHZhbC5peHAsIHJhZGVrX3BvbDogdmFsLnJhZGVrX3BvbCwgcmFkZWtfYXY6IHZhbC5yYWRla19hdiB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQnVjUm96cGlzUG9sb3preS56a29udHJvbHVqUHJlZFphdWN0b3ZhbmltKHsgaXhwOiB0aGlzLmR0b1BvbFZ5cGlzLml4cCwgcmFkZWtfcG9sOiB0aGlzLmR0b1BvbFZ5cGlzLnJhZGVrX3BvbCwgZGF0X3ptZW5hOiB0aGlzLmR0b1BvbFZ5cGlzLmRhdF96bWVuYSwga2V5czoga2V5c0FyciB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxNjRcIiwgLy9SQyAzMzYwMDE2NCA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNjVcIiAvL1JDIDMzNjAwMTY1IDogVsO9c2xlZGVrIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5nZXREYXRhUm93cygpLnNvbWUoeCA9PiB4Lndpel9raW5kID09IDIwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l6YXJkQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2l6YXJkQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYXNpIHJhZMWhaSBjZWzDvSByZWxvYWQgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkKHsgY2hhbmdlZDogdGhpcy5jaGFuZ2VkIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBab2JyYXplbsOtIGRldGFpbHUgcMOhcm92w6Fuw60gcGxhdGJ5IHBvbG/Fvmt5IHJvenBpc3UgKi9cclxuICAgICAgICBwcml2YXRlIHBhcm92YW5vKCkge1xyXG4gICAgICAgICAgICBsZXQgcm93czogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvW10gfCBudWxsID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICghcm93cyB8fCAocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwMTU4XCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwMTU4IDogVnliZXJ0ZSBhbGVzcG/FiCBqZWRlbiDFmcOhZGVrXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcclxuICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdQYXJvdmFub0RldGFpbFwiLCB7IHVpZDogXCJHUGFyb3Zhbm9EZXRhaWwjXCIgfV0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX3Bhcjogcm93c1swXS5peHBfcGFyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNpc2xvX3Bhcjogcm93c1swXS5jaXNsb19wYXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc19wb2w6IHJvd3NbMF0uc19wb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgYzogcm93c1swXS5jXHJcbiAgICAgICAgICAgICAgICB9LCB7IHdpZHRoOiA1ODAsIGhlaWdodDogNDUwIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBab2JyYXplbsOtIGhpc3RvcmllIHDDoXJvdsOhbsOtIHBsYXRieSBwb2xvxb5reSByb3pwaXN1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBoaXN0b3JpZVBhcm92YW5pKCkge1xyXG4gICAgICAgICAgICBsZXQgcm93czogSW50ZXJmYWNlLkdSb3pwaXNQb2xvemt5RHRvW10gfCBudWxsID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICghcm93cyB8fCAocm93cz8ubGVuZ3RoID8/IDApIDwgMSkgeyB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMzNjAwMTU5XCIpOyByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgfSAvL1JDIDMzNjAwMTU5IDogVnliZXJ0ZSBhbGVzcG/FiCBqZWRlbiDFmcOhZGVrXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcclxuICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5CdWMuV2ViQ2xpZW50LkdQYXJvdmFub0hpc3RvcmllXCIsIHsgdWlkOiBcIkdQYXJvdmFub0hpc3RvcmllI1wiIH1dLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cF9wYXI6IHRoaXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrX3BvbDogcm93c1swXS5yYWRla19wb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VicmFkZWs6IHJvd3NbMF0uc3VicmFkZWssXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkZWtfYXY6IHJvd3NbMF0ucmFkZWtfYXZcclxuICAgICAgICAgICAgICAgIH0vKiwgeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQ1MCB9Ki8pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBab2JyYXplbsOtIGRpYWxvZ3UgcMWZw61sb2ggcG9sb8W+a3kgcm96cGlzdSAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJpbG9oeSgpIHtcclxuICAgICAgICAgICAgbGV0IHJvd3M6IEludGVyZmFjZS5HUm96cGlzUG9sb3preUR0b1tdIHwgbnVsbCA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxJbnRlcmZhY2UuR1JvenBpc1BvbG96a3lEdG8+KHRoaXMuJGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXJvd3MgfHwgKHJvd3M/Lmxlbmd0aCA/PyAwKSA8IDEpIHsgdGhpcy5kaWFsb2dzLmFsZXJ0KFwianJlczozMzYwMDE2NlwiKTsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH0gLy9SQyAzMzYwMDE2NiA6IFZ5YmVydGUgYWxlc3BvxYggamVkZW4gxZnDoWRla1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXhzVWN0ZW5reSA9IHRoaXMuaXhwICsgKHJvd3NbMF0ucmFkZWtfcG9sID8/IDApLnRvU3RyaW5nKCkucGFkU3RhcnQoNCwgJzAnKSArIFwiMDBcIiArIFwiMDAwMFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLldmbC5EaWFsb2dzLkl4c1ByaWxvaHlEaWFsb2codGhpcywge1xyXG4gICAgICAgICAgICAgICAgdmlzaXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgV2ZsLldlYkNsaWVudC5BdHRhY2htZW50cy5HSXhzQXR0YWNobWVudFZpc2l0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHM6IGl4c1VjdGVua3ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZG93bmxvYWRlclR5cGU6IFwiR29yZGljLlVjdC5XZWJDbGllbnQuR1VjdEZpbGVEb3dubG9hZGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbzogbmV3IFdmbC5XZWJDbGllbnQuQXR0YWNobWVudHMuR0l4c0F0dGFjaG1lbnREQU8oeyBpeHM6IGl4c1VjdGVua3kvKiwgaXNsTmFtZTogXCJVY3RMb2FkQXR0YWNobWVudFNlcnZpY2VcIiovIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkb25seTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9KV1cclxuICAgICAgICAgICAgfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogWm9icmF6ZW7DrSBoaXN0b3JpZSBww6Fyb3bDoW7DrSBwbGF0YnkgcG9sb8W+a3kgcm96cGlzdSAqL1xyXG4gICAgICAgIHByaXZhdGUgdWNldG5pWmFwaXN5KCkge1xyXG4gICAgICAgICAgICBsZXQgcm93czogSW50ZXJmYWNlLkdCYW5rb3ZuaVZ5cGlzUG9sb3prYUR0b1tdIHwgbnVsbCA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthRHRvPih0aGlzLiRncmlkKTtcclxuICAgICAgICAgICAgaWYgKCFyb3dzIHx8IChyb3dzPy5sZW5ndGggPz8gMCkgPCAxKSB7IHRoaXMuZGlhbG9ncy5hbGVydChcImpyZXM6MzM2MDAxNjdcIik7IHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyB9IC8vUkMgMzM2MDAxNjcgOiBWeWJlcnRlIGFsZXNwb8WIIGplZGVuIMWZw6FkZWtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgXCJHb3JkaWMuRWtvLldlYkNsaWVudC5HVmF6YnlcIixcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBJbnB1dER0bzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHJvd3NbMF0uaXhwX3BhcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrdGdfdHlwOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3TW9kZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBab2JyYXplbsOtIGRpYWdub3N0aWNrw6lobyBJRCBwb2xvxb5reSByb3pwaXN1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBkaWFnSUQoKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzOiBJbnRlcmZhY2UuR0Jhbmtvdm5pVnlwaXNQb2xvemthRHRvW10gfCBudWxsID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEludGVyZmFjZS5HQmFua292bmlWeXBpc1BvbG96a2FEdG8+KHRoaXMuJGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAoIXJvd3MgfHwgKHJvd3M/Lmxlbmd0aCA/PyAwKSA8IDEpIHsgdGhpcy5kaWFsb2dzLmFsZXJ0KFwianJlczozMzYwMDE2OVwiKTsgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7IH0gLy9SQyAzMzYwMDE2OSA6IFZ5YmVydGUgYWxlc3BvxYggamVkZW4gxZnDoWRla1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5hbGVydChcImpyZXM6MzM2MDAxNzBcIiwgXCJ7MH0jezF9I3syfSN7M31cIi5mb3JtYXQocm93c1swXS5peHAgPz8gXCJcIiwgcm93c1swXS5yYWRla19wb2wgPz8gMCwgcm93c1swXS5zdWJyYWRlayA/PyAwLCByb3dzWzBdLnJhZGVrX2F2ID8/IDApKSAvL1JDIDMzNjAwMTcwIDogRGlhZ25vc3RpY2vDqSBJRCBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIEFrY2VcclxuXHJcbiAgICAgICAgLyoqIFVwZGF0ZSByb3plcHNhbsOpIMSNw6FzdGt5ICsgbmFwb8SNw610w6Fuw60gcm96ZMOtbHUgKi9cclxuICAgICAgICBwcml2YXRlIHNldENSb3ooY19yb3o6IERlY2ltYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXN0a3kuY19yb3ogPSB0aGlzLmNhc3RreS5jX3Jvei5wbHVzKGNfcm96KTtcclxuICAgICAgICAgICAgdGhpcy5jYXN0a3kuY196YnkgPSB0aGlzLmNhc3RreS5jLm1pbnVzKHRoaXMuY2FzdGt5LmNfcm96KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBDZWxrb3bDvSBwxZllcG/EjWV0IMSNw6FzdGVrKi9cclxuICAgICAgICBwcml2YXRlIHJlY2FsY3VsYXRlQ2FzdGt5KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhc3RreS5jX3JveiA9IHBhcnNlRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgdGhpcy5jYXN0a3kuY196YnkgPSBwYXJzZURlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCkuZm9yRWFjaCgodmFsLCBpZHgsIGFycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXN0a3kuY19yb3ogPSB0aGlzLmNhc3RreS5jX3Jvei5wbHVzKHBhcnNlRGVjaW1hbCh2YWwuYyA/PyAwKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNhc3RreS5jX3pieSA9IHRoaXMuY2FzdGt5LmMubWludXModGhpcy5jYXN0a3kuY19yb3opO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE5hc3RhdmVuw60gxI3DoXN0ZWsgcm96cGlzdSBzdGF0dXN1IGdyaWR1IHMgcG9sb8W+a2FtaSovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRHcmlkU3RhdHVzV2lkZ2V0KCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBcIkNlbGtlbTogPGIgY2xhc3M9J2ctc3RhdGUtdGV4dCBnLXN0YXRlLWFjdGl2ZSc+ezB9PC9iPlwiLmZvcm1hdChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHRoaXMuY2FzdGt5LmMsIFwiQ1wiKSkgK1xyXG4gICAgICAgICAgICAgICAgXCIgUm96ZXBzw6FubzogPGIgY2xhc3M9J2ctc3RhdGUtdGV4dCBnLXN0YXRlLWFjdGl2ZSc+ezB9PC9iPlwiLmZvcm1hdChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHRoaXMuY2FzdGt5LmNfcm96LCBcIkNcIikpICtcclxuICAgICAgICAgICAgICAgIFwiIFpiw712w6E6IDxiIGNsYXNzPSdnLXN0YXRlLXRleHQgZy1zdGF0ZS1hY3RpdmUnPnswfTwvYj5cIi5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcih0aGlzLmNhc3RreS5jX3pieSwgXCJDXCIpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJzdGF0dXNXaWRnZXRcIiwgXCJzdGF0dXNXaWRnZXQtcm96cGlzLXBvbG96a3lcIikuaHRtbChzdGF0dXMpO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIGFrY8OtIGtvcMOtcm92YXQvZG9wb8SNw610YXQsIGt0ZXLDqSBtYWrDrSBiw710IGRvc3R1cG7DqVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0S29waXJvdmF0Py5lbmFibGVkKCh0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucy5MemVLb3Bpcm92YXQ/LnZhbHVlID8/IGZhbHNlKSAmJiAhdGhpcy5jYXN0a3kuY196YnkuZXF1YWxzKDApKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdERvcG9jaXRhdD8uZW5hYmxlZCgodGhpcy5zZXJ2aWNlUGVybWlzc2lvbnMuTHplRG9wb2NpdGF0Py52YWx1ZSA/PyBmYWxzZSkgJiYgIXRoaXMuY2FzdGt5LmNfemJ5LmVxdWFscygwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogS29udHJvbGEsIHpkYSBleGlzdHVqw60gbmV1bG/FvmVuw6kgesOhem5hbXkgdiByb3pwaXNlICovXHJcbiAgICAgICAgcHJpdmF0ZSBoYXNVbnNhdmVkQ2hhbmdlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKCkuc29tZSh4ID0+IHguZmxhZ0VkaXRlZCA9PSAxIHx8IHguZmxhZ0VkaXRlZCA9PSAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFrDrXNrw6Fuw60genDFr3NvYnUgZG9wbG7Em27DrSBkYXRhIHphcGxhY2Vuw61cclxuICAgICAgICAgKiBAcGFyYW0gdHlwX2RhdlxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkaWFsb2dWb2xiYURhdGFaYXBsYWNlbmkodHlwX2RhdjogbnVtYmVyLCBkYl9wYXJhbTogc3RyaW5nKTogSlF1ZXJ5UHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICAgICAgbGV0IGNhcHRpb24gPSBcIlwiO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cF9kYXYpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbiA9IFwianJlczozMzYwMDQzM1wiOyAvL1JDIDMzNjAwNDMzIDogVm9sYmEgZGF0YSB6YXBsYWNlbsOtIHBybyBwbGF0YnUgc2xvxb5lbmtvdSBBLVZcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uID0gXCJqcmVzOjMzNjAwNDM0XCI7IC8vUkMgMzM2MDA0MzQgOiBWb2xiYSBkYXRhIHphcGxhY2Vuw60gcHJvIHBsYXRidSBTSVBPXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbiA9IFwianJlczozMzYwMDQzNVwiOyAvL1JDIDMzNjAwNDM1IDogVm9sYmEgZGF0YSB6YXBsYWNlbsOtIHBybyBwbGF0YnUgcGxhdGVibsOtIGthcnRvdVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uID0gXCJqcmVzOjMzNjAwNDM2XCI7IC8vUkMgMzM2MDA0MzYgOiBWb2xiYSBkYXRhIHphcGxhY2Vuw61cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYnBhcmFtc1tkYl9wYXJhbV0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coY2FwdGlvbiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQ8bnVtYmVyPihcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibkRhdFphcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTmFtZTogXCJncmFkaW9Sb3pwaXNHRGF2a2FBVlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNjAwNDM3XCIsIC8vUkMgMzM2MDA0MzcgOiBEYXR1bSB6IGTDoXZreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInIxXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzYwMDQzOFwiLCAvL1JDIDMzNjAwNDM4IDogRGF0dW0gcMWZZXZvZHUgbmEgYmFua292bsOtbSB2w71waXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwicjJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjMzNjAwNDM5XCIsIGZvcm0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKChjdHgpID0+IHsgLy9SQyAzMzYwMDQzOSA6IFZvbGJhIGRhdGEgemFwbGFjZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHggJiYgKGN0eC5uRGF0WmFwID09IDAgfHwgY3R4Lm5EYXRaYXAgPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKGN0eC5uRGF0WmFwKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgwKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=