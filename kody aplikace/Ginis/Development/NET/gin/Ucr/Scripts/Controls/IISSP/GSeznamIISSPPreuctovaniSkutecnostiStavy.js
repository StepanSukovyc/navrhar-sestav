"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * IISSP preuctovani skutecnosti - stavy
             *
             * @author tkares
             * @since 484.1.0.69
             */
            class GSeznamIISSPPreuctovaniSkutecnostiStavy extends WebClient.GSeznamIISSPBase {
                constructor() {
                    // parametry
                    super(...arguments);
                    this._isAggregation = true;
                }
                // nastaveni id a titulku okna
                //taskId = "seznamStavyKonsolidace";
                onContentReady() {
                    super.onContentReady();
                    var that = this;
                    that.FinMisto = this.parentCnt["FinMisto"];
                    that.showUCS_UUS = this.parentCnt["showUCS_UUS"];
                    that.VolanoZUlohy = this.parentCnt["VolanoZUlohyUlohy"];
                    that.filter = this.parentCnt["FilterStavy"];
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    if (that.VolanoZUlohy === 18 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty */) {
                        if (that.FinMisto.trim() !== "")
                            grid.ggridserverfilter("apply", {
                                isp_fim: { start: that.FinMisto, end: that.FinMisto },
                                bu_vl: that.filter.bu_vl,
                                sk_vl: that.filter.sk_vl
                            });
                        else
                            grid.ggridserverfilter("apply", {
                                bu_vl: that.filter.bu_vl,
                                sk_vl: that.filter.sk_vl
                            });
                    }
                    else if (that.FinMisto.trim() !== "")
                        grid.ggridserverfilter("apply", { isp_fim: { start: that.FinMisto, end: that.FinMisto } });
                    if (this.autoReload) {
                        this.reload();
                    }
                }
                ///**
                // * Znovunacteni dat
                // * 
                // * */
                //private reload(): void {
                //    let that = this;
                //    let grid = this.getGrid();
                //    if (grid == null) return;
                //    var view = grid.ggrid("getView");
                //    view.requestData();
                //    view.getLoadingPromise().always(() => {
                //        that.loadingData = false;
                //        that.nastaveniAkci();
                //    });
                //}
                /**
                 * Definice menubaru
                 * */
                DefineMenuBar() {
                    let menuPar = [{ action: this.parentCnt.actions.actZapisy, favorite: true },
                        { action: this.parentCnt.actions.actPrepocet, favorite: true },
                        { action: this.parentCnt.actions.actPrepocetUplny, favorite: true },
                        { action: this.parentCnt.actions.actVytvorit, favorite: true }
                    ];
                    return menuPar;
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createActions() {
                    let that = this;
                    that.parentCnt.actions.addRange({
                        actPrepocet: {
                            name: "actPrepocet",
                            //icon: "gi-list",
                            enabled: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                            visible: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                            caption: "jres:30250376", //RC 30250376 : Přepočet
                            run: function (ev, ctx) {
                                that.Recalculation();
                            }
                        },
                        actPrepocetUplny: {
                            name: "actPrepocetUplny",
                            //icon: "gi-list",
                            enabled: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                            visible: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                            caption: "jres:30250315", //RC 30250315 : Přepočet úplný
                            run: function (ev, ctx) {
                                that.RecalculationAll();
                            }
                        },
                        actVytvorit: {
                            name: "actVytvorit",
                            //icon: "gi-list",
                            enabled: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                            visible: Ucr.Globals.GUcrGlobals.Rad_Konsolidace === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                            caption: "jres:30250349", //RC 30250349 : Vytvořit
                            run: function (ev, ctx) {
                                that.createDozeAsync();
                            }
                        },
                        actZapisy: {
                            name: "actZapisy",
                            icon: "gi-list",
                            enabled: false,
                            caption: "jres:31100124", //RC 31100124 : Zápisy
                            run: (ev, ctx) => {
                                this.showZapisy();
                            }
                        }
                    });
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci() {
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    // pokud neni grid, nic nedelej
                    if (that.parentCnt.closed)
                        return;
                    var view = grid.ggrid("getView");
                    let pocet = view.getCount();
                    // prepocet
                    that.parentCnt.actions.actPrepocet?.update({
                        enabled: (this.globalParams.Rad_Risre >= 2 /* Gordic.Uct.Interface.GUcrZobrazeniRisre.AnoEditace */) || this.debug,
                        visible: this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */,
                        ToolTip: "jres:30250374".format(this.Globals.EkoParams?.ICO, this.Globals.EkoParams?.Rok, this.Globals.Zkratky?.Ico) //RC 30250374 : Přepočet za aktuální účetní období a {2} ({1} a {0})
                    });
                    // uplny prepocet
                    that.parentCnt.actions.actPrepocetUplny?.update({
                        enabled: (this.globalParams.Rad_Risre >= 2 /* Gordic.Uct.Interface.GUcrZobrazeniRisre.AnoEditace */),
                        visible: this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */ && this.debug
                    });
                    // actVytvorit
                    that.parentCnt.actions.actVytvorit?.update({
                        enabled: pocet > 0 && ((this.globalParams.Rad_Risre === 2 /* Gordic.Uct.Interface.GUcrZobrazeniRisre.AnoEditace */) || this.globalParams.Rad_Risre === 4 /* Gordic.Uct.Interface.GUcrZobrazeniRisre.AnoEditaceJenSD */),
                        visible: this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */,
                        ToolTip: pocet > 0 ?
                            "jres:30250638" //RC 30250638 : Prázdný seznam
                            : undefined
                    });
                    // zapisy
                    that.parentCnt.actions.actZapisy?.update({
                        enabled: pocet > 0,
                        visible: this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                    });
                }
                /**
                 * Zobrazeni zapisu
                 *
                 * */
                showZapisy() {
                    let title = "jres:31100224"; //RC 31100224 : Zápisy stavu
                    let that = this;
                    debugger;
                    //var filtr= this.getFilter();
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    let sel = grid.ggrid("getSelection", false);
                    if (sel.length !== 1)
                        return;
                    let row = sel[0];
                    //let typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType;
                    let id;
                    let filter;
                    if (that.isAggregation()) {
                        filter = {
                            //ico: { start: row.ico!, end: row.ico! },
                            //ucs: { start: row.ucs!, end: row.ucs! },
                            //uus: { start: row.uus!, end: row.uus! },
                            //nks: { start: row.nks!, end: row.nks! },
                            id_hdr_ris: { start: row.id_hdr_ris, end: row.id_hdr_ris },
                            radek_hdr: { start: row.radek_hdr, end: row.radek_hdr },
                            //mesic: { start: 0, end: row.mesic },
                        };
                    }
                    else {
                        filter = {
                            //ico: { start: row.ico!, end: row.ico! },
                            //ucs: { start: row.ucs!, end: row.ucs! },
                            //uus: { start: row.uus!, end: row.uus! },
                            //nks: { start: row.nks!, end: row.nks! },
                            mesic: { start: 1, end: row.mesic },
                            den: { start: 1, end: row.den },
                            id_hdr_ris: { start: row.id_hdr_ris, end: row.id_hdr_ris },
                            radek_hdr: { start: row.radek_hdr, end: row.radek_hdr },
                            //mesic: { start: 0, end: row.mesic },
                        };
                    }
                    let typUlohy = 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */;
                    id = "uctZapisy#"; //NOTE: Musi byt stejne ni na MainApp.cs
                    that.parentCnt.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
                        ID: id,
                        TypUlohy: typUlohy,
                        Filter: filter,
                        CurrentRow: row,
                        StrictFilter: false,
                        //FilterStrPopis: f.filterStrPopis,
                        AutoLoadData: true,
                        title: title
                    });
                }
                /**
                 *  Vytvoreni gridu
                 *
                 * */
                createGrid() {
                    let that = this;
                    let provider = new Gordic.Data.Provider(() => {
                        that.loadingData = true;
                        return that.loadData();
                    });
                    let view = new Gordic.Data.View([], {
                        processors: { provider: provider },
                        key: "ico,rok,mesden,sk_vl,bu_vl,id_hdr_ris,radek_hdr,xfimuz,ucs,uus"
                    });
                    var sloupce = that.createGridFormat();
                    //var defaultProfile = sloupce.columns;//sloupce.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1)
                    const grid = $.newDiv(this.classGrid)
                        .appendTo(this.parentCnt.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: view,
                        columns: sloupce,
                        defaultProfile: { name: "default", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        profiles: [
                            { name: "userProfile", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        ],
                        profileVisible: false,
                    });
                }
                /**
                 * Prepocet
                 * */
                Recalculation() {
                    let that = this;
                    that.parentCnt.isl.UcrRisreStavy.pocetZaznamuKPrepoctu({ uplny: false })
                        .get()
                        .then((result) => {
                        return Gordic.Eko.WebClient.Common.Dotaz(that.parentCnt, "jres:30250375".format(result)) //RC 30250375 : Opravdu provést přepočet stavu?; Počet záznamů k přepočtu {0}
                            .then(function (result) {
                            if (result === "YES") {
                                that.parentCnt.beginOperation("jres:30250316"); //RC 30250316 : Probíhá přepočet...
                                that.parentCnt.isl.UcrRisreStavy.prepocet()
                                    .get()
                                    .then(() => {
                                    that.parentCnt.showFlash({ label: "jres:30250377".format(that.Globals.EkoParams?.ICO, that.Globals.EkoParams?.Rok, that.Globals.Zkratky?.Ico), state: "success" }); //RC 30250377 :  Stavy úspěšně přepočteny za účetní období {1} a {2} {0}.
                                    return;
                                })
                                    .always(() => that.parentCnt.endOperation());
                            }
                        });
                    });
                }
                /**
                 * Prepocet uplny
                 * */
                RecalculationAll() {
                    let that = this;
                    that.parentCnt.isl.UcrRisreStavy.pocetZaznamuKPrepoctu({ uplny: true })
                        .get()
                        .then((result) => {
                        return Gordic.Eko.WebClient.Common.Dotaz(that.parentCnt, "jres:30250375".format(result)) //RC 30250375 : Opravdu provést přepočet stavu?; Počet záznamů k přepočtu {0}
                            .then(function (result) {
                            if (result === "YES") {
                                that.parentCnt.beginOperation("jres:30250316"); //RC 30250316 : Probíhá přepočet...
                                that.parentCnt.isl.UcrRisreStavy.prepocetUplny()
                                    .get()
                                    .then(() => {
                                    that.parentCnt.showFlash({ label: "jres:30250377".format(that.Globals.EkoParams?.ICO, that.Globals.EkoParams?.Rok, that.Globals.Zkratky?.Ico), state: "success" }); //RC 30250377 :  Stavy úspěšně přepočteny za účetní období {1} a {2} {0}.
                                    return;
                                })
                                    .always(() => that.parentCnt.endOperation());
                            }
                        });
                    });
                }
                /**
                 * Vytvorit davku - prime volany
                 * */
                createDoze() {
                    let that = this;
                    Gordic.Eko.WebClient.Common.Dotaz(that.parentCnt, "jres:30250378") //RC 30250378 : Opravdu chcete vytvořit dílčí dávku přeúčtování skutečnosti?
                        .then(function (result) {
                        if (result === "YES") {
                            var filter = that.getFilter().gfilterpanel('getCurrentData');
                            var maska = {};
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggridserverfilter("collect", maska)
                                .then((filterServer) => {
                                // Kontrola dat
                                that.checkFM()
                                    .then(() => {
                                    that.parentCnt.beginOperation("jres:30250379"); //RC 30250379 : Probíhá vytváření dávky...
                                    that.parentCnt.isl.UcrRisreStavy.createDose({ request: { KeDni: filter.datumK, Maska: filterServer } })
                                        .get()
                                        .then(() => {
                                        that.parentCnt.showFlash({ label: "jres:30250380", state: "success" }); //RC 30250380 : Úspěšně vytvořeno a uloženo do registru dávek
                                        return;
                                    })
                                        .always(() => that.parentCnt.endOperation());
                                });
                            });
                        }
                    });
                }
                /**
                 * Vytvorit davku - asynchronni volani
                 * */
                createDozeAsync() {
                    let that = this;
                    Gordic.Eko.WebClient.Common.Dotaz(that.parentCnt, "jres:30250378") //RC 30250378 : Opravdu chcete vytvořit dílčí dávku přeúčtování skutečnosti?
                        .then(function (result) {
                        if (result === "YES") {
                            var filter = that.getFilter().gfilterpanel('getCurrentData');
                            var maska = {};
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggridserverfilter("collect", maska)
                                .then((filterServer) => {
                                // Kontrola dat
                                that.checkFM()
                                    .then(() => {
                                    // that.parentCnt.beginOperation("jres:30250379"); //RC 30250379 : Probíhá vytváření dávky...
                                    const op = that.parentCnt.beginOperation({
                                        id: "GUcrCreateDose",
                                        progress: 0, total: 100,
                                        text: "jres:30250379", //RC 30250379 : Probíhá vytváření dávky...
                                        //cancelAction: new GAction({ caption: "jres:30250285", run: () => { task.cancel() }, name: "cancelAct" }) //RC 30250285 : Storno
                                    });
                                    var task = Gordic.Async.GTaskManager.start("Gordic.Uct.Server.GUcrVytvoritDavkuAsync", {
                                        KeDni: filter.datumK, Maska: filterServer
                                    });
                                    return task.getPromise()
                                        .then((result) => {
                                        //debugger;
                                        that.parentCnt.showFlash({ label: "jres:30250380", state: "success" }); //RC 30250380 : Úspěšně vytvořeno a uloženo do registru dávek
                                        //that.parentCnt.endOperation(op);
                                    }, (t) => {
                                        if (t.state === 6 /* Gordic.Async.GTaskState.cancelSignalized */) {
                                            that.parentCnt.dialogs.alert("jres:30250384"); //RC 30250384 : Stornovano
                                        }
                                        else if (t.state === 4 /* Gordic.Async.GTaskState.faulted */) {
                                            that.parentCnt.dialogs.showException(t.exception);
                                        }
                                        return $.Deferred().reject().promise();
                                    })
                                        .progress((a) => {
                                        if (a.progress) {
                                            op.progress = a.progress.current, op.total = a.progress.total, op.text = a.progress.text;
                                            that.parentCnt.progressOperation(op);
                                        }
                                    }).always(() => that.parentCnt.endOperation(op));
                                });
                            });
                        }
                    });
                }
                /**
                 * Kontrola podminek na moznost provest davku
                 * */
                checkFM() {
                    let that = this;
                    let def = $.Deferred();
                    let fm = null;
                    let grid = that.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    let view = grid.ggrid("getView");
                    let data = view.getDataRows(false);
                    for (let i = 0; i < data.length; i++) {
                        let row = data[i];
                        if (fm === null)
                            fm = row.isp_fim?.trim();
                        else if (fm != row.isp_fim?.trim()) {
                            that.parentCnt.dialogs.error("jres:30250381" //RC 30250381 : Chyba
                            , "jres:30250382" //RC 30250382 : Vytvoření dávky lze spustit pouze pro jedno Finanční místo.
                            )
                                .on("close", () => {
                                return def.reject(false);
                            });
                            return def.promise();
                        }
                    }
                    if (fm == null)
                        return def.reject();
                    if (fm.trim() != that.FinMisto) {
                        that.parentCnt.dialogs.error("jres:30250381" //RC 30250381 : Chyba
                        , "jres:30250383".format(that.Globals.Zkratky?.Ico, that.Globals.Zkratky?.Ucs) //RC 30250383 : Vytvoření dávky lze spustit pouze pro Finanční místo odpovídající přihlášenému {0} a {1}
                        )
                            .on("close", () => {
                            return def.reject(false);
                        });
                        return def.promise();
                    }
                    return def.resolve(false).promise();
                }
                /**
                * function createFilterZalozka
                *
                * filtrovaci zalozka
                * @returns {any}
                */
                createFilterZalozka() {
                    var that = this;
                    //var datMax = moment("31.12." + that.Globals.EkoParams?.Rok, "D.M.YYYY").toDate();
                    //var datMin = moment("1.1." + that.Globals.EkoParams?.Rok, "D.M.YYYY").toDate();
                    var datMax = new Date(that.Globals.EkoParams?.Rok + "-12-31");
                    var datMin = new Date(that.Globals.EkoParams?.Rok + "-1-1");
                    var aktDatum = new Date(that.aktDatum);
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }); //RC 30250052 : Filtr
                    //if (this.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy || this.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty)
                    filterFormDef.addSection()
                        .addRow({ label: "jres:30250347" }) //RC 30250347 : ke dni
                        .addField("gdatebox", {
                        name: "datumK",
                        //minValue: new Date(that.Globals.EkoParams?.Rok as number, 1, 1),
                        //maxValue: new Date(that.Globals.EkoParams?.Rok as number ,12,31) ,
                        //maxValue:new Date(2019,12,31,23,59),
                        minValue: datMin,
                        maxValue: datMax,
                        initialValue: aktDatum,
                        //initialValue: new Date(that.Globals.EkoParams?.Rok as number, 12, 31) ,
                        //model: "model.datumK=value",
                        change: (ev, ctx) => {
                        },
                        valueType: "date"
                    });
                    //if (this.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy)
                    filterFormDef.addSection()
                        .addRow({ label: "jres:30250348" }) //RC 30250348 : Agregace
                        .addField("gcheck", {
                        name: "agregace",
                        initialValue: true,
                        //model: "model.agregace=value.agregace",
                        change: (ev, ctx) => {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            if (typeof ctx === "undefined" || typeof ctx.value === "undefined")
                                return;
                            // nastaveni atributu agregace
                            that._isAggregation = ctx.value;
                            var userProfil = grid.ggrid("getCurrentProfile");
                            //console.log("userProfil", userProfil);
                            let grdFormat = that.createGridFormat();
                            grid.ggrid("option", "columns", grdFormat);
                            //that.$grid.ggrid<Gordic.Uct.Interface.GUctaspsDto>("profileVisible", grdFormat);
                            userProfil.columnList = grdFormat.columns.map((c) => c.name).join(",");
                            grid.ggrid("profileChanges", userProfil);
                        },
                    });
                    if (this.TypUlohy === 19 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_RegistrDavek */) {
                        filterFormDef
                            .addSection()
                            .addRow({ label: "jres:30250391" }) //RC 30250391 : Stornované
                            .addField("gcheck", {
                            name: "storno",
                            initialValue: true,
                            //model: "model.agregace=value.agregace",
                            change: (ev, ctx) => {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                if (typeof ctx === "undefined" || typeof ctx.value === "undefined")
                                    return;
                                // nastaveni atributu agregace
                                //that._isAggregation = ctx.value as boolean;
                            },
                        })
                            .addSection()
                            .addRow({ label: "jres:30250392" }) //RC 30250392 : Zamítnuté
                            .addField("gcheck", {
                            name: "zamitnuto",
                            initialValue: true,
                            //model: "model.agregace=value.agregace",
                            change: (ev, ctx) => {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                if (typeof ctx === "undefined" || typeof ctx.value === "undefined")
                                    return;
                            },
                        });
                    }
                    return filterFormDef;
                }
                /**
                 * Nacteni Isl sluzby pro list
                 * @param param0
                 */
                loadISLList(rq) {
                    return this.parentCnt.isl.UcrRisreStavy.list({ agregace: this.isAggregation(), maska: rq.maska, filter: { filters: rq.filter.filters } });
                }
                /**
                 * Vrat muj sestaveny filtr
                 *
                 * @returns
                 */
                getMyFilter(filterServer, filter) {
                    if (filter.Mesic === null)
                        filter.Mesic = -1;
                    let denmes = null;
                    if (typeof filter.datumK !== undefined && filter.datumK !== null) {
                        denmes = 1 * filter.datumK.getDate() + (filter.datumK.getMonth() + 1) * 32;
                    }
                    else
                        throw Error("Chybí datum");
                    let myfiltr = { rok: { o: "=", v: this.Globals.EkoParams?.Rok }, ico: { o: "=", v: this.Globals.EkoParams?.ICO }, denmes: { o: "<=", v: denmes } };
                    return {
                        maska: filterServer, filter: { filters: myfiltr }
                    };
                }
                ///**
                // *  Nacteni dat
                // */
                //public loadDataOld(): JQueryPromise<any> {
                //    var that = this;
                //    var def = $.Deferred();
                //    var maska: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto = {};
                //    var filter = that.getFilter().gfilterpanel('getCurrentData');
                //    console.log("loaddata.filter", filter);
                //    //let view = this.$grid.ggrid("getView");
                //    let grid = this.getGrid();
                //    if (grid == null) return $.Deferred().reject().promise();
                //    grid.ggridserverfilter<Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto>("collect", maska)
                //        .then((filterServer) => {
                //            maska = filterServer;
                //            if (filter.Mesic === null)
                //                filter.Mesic = -1;
                //            debugger;
                //            let denmes: number | null = null;
                //            if (typeof filter.datumK !== undefined && filter.datumK !== null) {
                //                denmes = 1*filter.datumK.getDate() +(filter.datumK.getMonth()+1)*32
                //            }
                //            let myfiltr = { rok: { o: "=", v: that.Globals.EkoParams?.Rok }, ico: { o: "=", v: that.Globals.EkoParams?.ICO }, denmes: { o: "<=", v: denmes } } as any;
                //            Gordic.Isl.UcrRisreStavy.list({ agregace: that.isAggregation(), maska: maska, filter: { filters: myfiltr } })
                //                .get()
                //                .then(function (result) {
                //                    debugger;
                //                    //at.setActions(result.ListValues?.length as any);
                //                    //that.loadingData = false;
                //                    that.nastaveniAkci();
                //                    return def.resolve(result);
                //                })
                //                .always(function () {
                //                    //that.loadingData = false;
                //                })
                //                ;
                //            return def.promise();
                //        }
                //    );
                //    return def.promise();
                //}
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 *
                 */
                createGridFormat() {
                    let that = this;
                    var myGridFormat = new Gordic.Data.GridFormat();
                    myGridFormat.addTextColumn({
                        name: "bu_vl",
                        caption: "jres:30250350", //RC 30250350 : Bankovní účet                
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "bu_vl", caption: "jres:30250351",
                            disabled: that.VolanoZUlohy === 18 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty */
                        }), //RC 30250351 : Bankovní účet
                        width: 115,
                    });
                    myGridFormat.addTextColumn({
                        name: "sk_vl",
                        caption: "jres:30250353", //RC 30250353 : Banka
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "sk_vl", caption: "jres:30250352",
                            disabled: that.VolanoZUlohy === 18 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty */
                        }), //RC 30250352 : Banka
                        width: 40, hidden: true
                    });
                    if (that.showUCS_UUS) {
                        myGridFormat.addTextColumn({
                            name: "ucs",
                            caption: this.Globals.Zkratky?.Ucs,
                            description: this.Globals.Zkratky?.Ucs,
                            width: 60, hidden: true,
                            //group: topoGroup,
                            aggregate: Gordic.Data.Aggregates.first("ucs"),
                            //serverFilter: Gordic.Eko.Filters.ucsInterval(this.filterOptions.ucs)
                            serverFilter: Gordic.Eko.Filters.ucsInterval({
                                ico: this.filterOptions.ucs.ico, aktProhl: this.filterOptions.ucs.aktProhl,
                                onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: undefined, secondField: undefined,
                                model: "ucs",
                                disabled: false
                            })
                        });
                        myGridFormat.addTextColumn({
                            name: "uus",
                            caption: this.Globals.Zkratky?.Uus,
                            description: this.Globals.Zkratky?.Uus,
                            width: 60,
                            //group: topoGroup,
                            //serverFilter: Gordic.Eko.Filters.uusInterval(this.filterOptions.uus)
                            serverFilter: Gordic.Eko.Filters.uusInterval({
                                ico: this.filterOptions.uus.ico, ucs: this.filterOptions.uus.ucs, aktProhl: this.filterOptions.uus.aktProhl,
                                onlyActive: this.filterOptions.uus.onlyActive, caption: this.filterOptions.uus.caption, name: "uus", firstField: undefined, secondField: undefined,
                                model: "uus"
                            })
                        });
                    }
                    myGridFormat.addTextColumn({
                        name: "id_hdr_ris",
                        caption: "jres:31100082", //RC 31100082 : ID IISSP
                        description: "jres:31100255", //RC 31100255 : Identifikátor rezervace rozpočtových prostředků IISSP
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "id_hdr_ris", caption: "jres:31100082", firstField: { maxLength: 9 }, secondField: { maxLength: 9 } }), //RC 31100082 : ID IISSP
                    });
                    myGridFormat.addNumberColumn({
                        name: "radek_hdr",
                        caption: "jres:31100083", //RC 31100083 : řádek IISSP
                        description: "jres:31100256", //RC 31100256 : Řádek rezervace rozpočtových prostředků IISSP
                        width: 91,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_fim", caption: "jres:30250356", firstField: { maxLength: 3 }, secondField: { maxLength: 3 } }), //RC 30250356 : FIM
                    });
                    myGridFormat.addDateColumn({
                        name: "dat_rez",
                        caption: "jres:30250354", //RC 30250354 : Rezerv.
                        description: "jres:30250355", //RC 30250355 : Datum rezervace IISSP
                        width: 80
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_fim",
                        caption: "jres:30250356", //RC 30250356 : FIM     
                        width: 75,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_fim", caption: "jres:30250356", firstField: { maxLength: 7 }, secondField: { maxLength: 7, allowedChars: "0123456789" } }), //RC 30250356 : FIM
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_zdr",
                        caption: "jres:30250357", //RC 30250357 : ZDR
                        width: 70,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_zdr", caption: "jres:30250357", firstField: { maxLength: 7 }, secondField: { maxLength: 7 } }), //RC 30250357 : ZDR
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_par",
                        caption: "jres:30250358", //RC 30250358 : PAR
                        width: 60,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_par", caption: "jres:30250358", firstField: { maxLength: 6 }, secondField: { maxLength: 6 } }), //RC 30250358 : PAR
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_pol",
                        caption: "jres:30250359", //RC 30250359 : POL
                        width: 60,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_pol", caption: "jres:30250359", firstField: { maxLength: 4 }, secondField: { maxLength: 4 } }), //RC 30250359 : POL
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_eds",
                        caption: "jres:30250360", //RC 30250360 : EDS/SMVS
                        width: 100,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_eds", caption: "jres:30250360", firstField: { maxLength: 13 }, secondField: { maxLength: 13 } }), //RC 30250360 : EDS/SMVS
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_pvs",
                        caption: "jres:30250361", //RC 30250361 : PVS
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_pvs", caption: "jres:30250361", firstField: { maxLength: 10 }, secondField: { maxLength: 10 } }), //RC 30250361 : PVS
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_ucl",
                        caption: "jres:30250362", //RC 30250362 : UCL
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_ucl", caption: "jres:30250362", firstField: { maxLength: 9 }, secondField: { maxLength: 9 } }), //RC 30250362 : UCL
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_zj",
                        caption: "jres:30250363", //RC 30250363 : ZJ
                        width: 35,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_zj", caption: "jres:30250363", firstField: { maxLength: 3 }, secondField: { maxLength: 3 } }) //RC 30250363 : ZJ
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_uj",
                        caption: "jres:30250385", //RC 30250385 : UJ
                        width: 64,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_uj", caption: "jres:30250365", firstField: { maxLength: 6 }, secondField: { maxLength: 6 } }) //RC 30250365 : 130250364
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_uz",
                        caption: "jres:30250366", //RC 30250366 : UZ
                        width: 64,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_uz", caption: "jres:30250366", firstField: { maxLength: 5 }, secondField: { maxLength: 5 } }) //RC 30250366 : UZ
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "kc0",
                        caption: "jres:30250367", //RC 30250367 : AS MD
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "kc0", caption: "jres:30250367" }) //RC 30250367 : AS MD
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "kc1",
                        caption: "jres:30250368", //RC 30250368 : AS Dal
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "kc1", caption: "jres:30250368" }) //RC 30250368 : AS Dal
                    });
                    myGridFormat.addTextColumn({
                        name: "denmes",
                        caption: "jres:30250369", //RC 30250369 : Změna UCT
                        width: 100, //fixedWidth: true,
                        //customClass: "center",
                        cellTemplate: function (data, metarow, info) {
                            //var font = "font-weight: bold;";
                            if (typeof data.denmes === undefined || data.denmes === null)
                                return "";
                            let denmes = data.denmes;
                            let den = denmes % 32;
                            let mesic = Math.floor(denmes / 32);
                            return $("<span>", { text: "" + den + "." + mesic + ".", title: "" /*, "style": font*/ });
                        }
                    });
                    if (!that.isAggregation()) {
                        myGridFormat.addNumberColumn({
                            name: "mesic",
                            caption: "jres:30250370", //RC 30250370 : M
                            width: 30,
                            serverFilter: Gordic.Eko.Filters.integerInterval({
                                model: "mesic", caption: "jres:30250370",
                                disabled: that.VolanoZUlohy === 18 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty */
                            }) //RC 30250370 : M
                        });
                        myGridFormat.addNumberColumn({
                            name: "den",
                            caption: "jres:30250371", //RC 30250371 : D
                            width: 30,
                            serverFilter: Gordic.Eko.Filters.integerInterval({
                                model: "den", caption: "jres:30250371",
                                disabled: that.VolanoZUlohy === 18 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_BankovniUcty */
                            }) //RC 30250371 : D
                        });
                        myGridFormat.addCurrencyColumn({
                            name: "sc0",
                            caption: "jres:30250372", //RC 30250372 : DO MD
                            width: 120,
                            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "sc0", caption: "jres:30250372" }) //RC 30250372 : DO MD
                        });
                        myGridFormat.addCurrencyColumn({
                            name: "sc1",
                            caption: "jres:30250373", //RC 30250373 : DO Dal
                            width: 120,
                            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "sc1", caption: "jres:30250373" }) //RC 30250373 : DO Dal
                        });
                        myGridFormat.addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:31100015", //RC 31100015 : Datum změny
                            width: 130,
                            serverFilter: Gordic.Eko.Filters.dateInterval({
                                model: "dat_zmena",
                                firstField: { valueType: "datetime" },
                                secondField: { valueType: "datetime" },
                                caption: "jres:31100015" //RC 31100015 : Datum změny
                            })
                        });
                    }
                    return myGridFormat;
                }
                /**
                 * Je zapnuta agregace
                 * */
                isAggregation() {
                    return this._isAggregation;
                }
            }
            WebClient.GSeznamIISSPPreuctovaniSkutecnostiStavy = GSeznamIISSPPreuctovaniSkutecnostiStavy;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQUHJldWN0b3ZhbmlTa3V0ZWNub3N0aVN0YXZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUlJU1NQUHJldWN0b3ZhbmlTa3V0ZWNub3N0aVN0YXZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0E0M0JmO0FBNTNCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0M0JuQjtJQTUzQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTQzQjdCO1FBNTNCb0IsV0FBQSxTQUFTO1lBQzFCOzs7OztlQUtHO1lBQ0gsTUFBYSx1Q0FBd0MsU0FBUSxVQUFBLGdCQUFnQjtnQkFBN0U7b0JBR0ksWUFBWTs7b0JBTUosbUJBQWMsR0FBWSxJQUFJLENBQUM7Z0JBMjJCM0MsQ0FBQztnQkExMkJHLDhCQUE4QjtnQkFDOUIsb0NBQW9DO2dCQUNwQyxjQUFjO29CQUNWLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQ3hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO3dCQUFFLE9BQU87b0JBQ3pCLElBQUksSUFBSSxDQUFDLFlBQVksd0ZBQStFLEVBQUUsQ0FBQzt3QkFDbkcsSUFBSSxJQUFJLENBQUMsUUFB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QyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsc0JBQXNCO3lCQUN0SCxDQUFDLENBQUM7d0JBQ0gsWUFBWSxDQUFDLGlCQUFpQixDQUFDOzRCQUMzQixJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7NEJBQ3JELEtBQUssRUFBRSxHQUFHOzRCQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7Z0NBQzFDLEtBQUssRUFBRSxXQUFXO2dDQUNsQixVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFO2dDQUNyQyxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFO2dDQUN0QyxPQUFPLEVBQUUsZUFBZSxDQUFDLDJCQUEyQjs2QkFDdkQsQ0FBQzt5QkFDTCxDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFLTCxPQUFPLFlBQVksQ0FBQztnQkFDeEIsQ0FBQztnQkFDRDs7cUJBRUs7Z0JBQ0csYUFBYTtvQkFDakIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUUvQixDQUFDO2FBQ0o7WUFwM0JZLGlEQUF1QywwQ0FvM0JuRCxDQUFBO1FBQ0wsQ0FBQyxFQTUzQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTQzQjdCO0lBQUQsQ0FBQyxFQTUzQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTQzQm5CO0FBQUQsQ0FBQyxFQTUzQlMsTUFBTSxLQUFOLE1BQU0sUUE0M0JmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogSUlTU1AgcHJldWN0b3Zhbmkgc2t1dGVjbm9zdGkgLSBzdGF2eVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHRrYXJlc1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuNjlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1JSVNTUFByZXVjdG92YW5pU2t1dGVjbm9zdGlTdGF2eSBleHRlbmRzIEdTZXpuYW1JSVNTUEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuXHJcbiAgICAgICAgLy8gcGFyYW1ldHJ5XHJcblxyXG4gICAgICAgIHByaXZhdGUgRmluTWlzdG86IHN0cmluZzsgICAvLyBmaW5hbmNuaSBtaXN0b1xyXG4gICAgICAgIC8vIHpvYnJhemVuaSBzdHJlZGlza2EgYSB1Y3Rhcm55XHJcbiAgICAgICAgcHJpdmF0ZSBzaG93VUNTX1VVUzogYm9vbGVhbjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlcjogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBfaXNBZ2dyZWdhdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgLy8gbmFzdGF2ZW5pIGlkIGEgdGl0dWxrdSBva25hXHJcbiAgICAgICAgLy90YXNrSWQgPSBcInNlem5hbVN0YXZ5S29uc29saWRhY2VcIjtcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIub25Db250ZW50UmVhZHkoKTtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LkZpbk1pc3RvID0gdGhpcy5wYXJlbnRDbnRbXCJGaW5NaXN0b1wiXTtcclxuICAgICAgICAgICAgdGhhdC5zaG93VUNTX1VVUyA9IHRoaXMucGFyZW50Q250W1wic2hvd1VDU19VVVNcIl07XHJcbiAgICAgICAgICAgIHRoYXQuVm9sYW5vWlVsb2h5ID0gdGhpcy5wYXJlbnRDbnRbXCJWb2xhbm9aVWxvaHlVbG9oeVwiXTtcclxuICAgICAgICAgICAgdGhhdC5maWx0ZXIgPSB0aGlzLnBhcmVudENudFtcIkZpbHRlclN0YXZ5XCJdO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGF0LlZvbGFub1pVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9CYW5rb3ZuaVVjdHkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LkZpbk1pc3RvLnRyaW0oKSAhPT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc3BfZmltOiB7IHN0YXJ0OiB0aGF0LkZpbk1pc3RvLCBlbmQ6IHRoYXQuRmluTWlzdG8gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVfdmw6IHRoYXQuZmlsdGVyLmJ1X3ZsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBza192bDogdGhhdC5maWx0ZXIuc2tfdmxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidV92bDogdGhhdC5maWx0ZXIuYnVfdmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNrX3ZsOiB0aGF0LmZpbHRlci5za192bCBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuRmluTWlzdG8udHJpbSgpICE9PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJhcHBseVwiLCB7IGlzcF9maW06IHsgc3RhcnQ6IHRoYXQuRmluTWlzdG8sIGVuZDogdGhhdC5GaW5NaXN0byB9IH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIFpub3Z1bmFjdGVuaSBkYXRcclxuICAgICAgICAvLyAqIFxyXG4gICAgICAgIC8vICogKi9cclxuICAgICAgICAvL3ByaXZhdGUgcmVsb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIC8vICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgIC8vICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAvLyAgICB2YXIgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgIC8vICAgIHZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAvLyAgICB2aWV3LmdldExvYWRpbmdQcm9taXNlKCkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICB0aGF0Lm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBtZW51YmFydVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIERlZmluZU1lbnVCYXIoKTogTWVudVBhcmFtc1tdIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBtZW51UGFyOiBNZW51UGFyYW1zW10gPVxyXG4gICAgICAgICAgICAgICAgW3sgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdFphcGlzeSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdFByZXBvY2V0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0UHJlcG9jZXRVcGxueSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdFZ5dHZvcml0LCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gbWVudVBhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0UHJlcG9jZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByZXBvY2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBHbG9iYWxzLkdVY3JHbG9iYWxzLlJhZF9Lb25zb2xpZGFjZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVZkdS5Bbm9FZGl0YWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IEdsb2JhbHMuR1Vjckdsb2JhbHMuUmFkX0tvbnNvbGlkYWNlID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyWm9icmF6ZW5pVmR1LkFub0VkaXRhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzc2XCIsIC8vUkMgMzAyNTAzNzYgOiBQxZllcG/EjWV0XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJlY2FsY3VsYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJlcG9jZXRVcGxueToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UHJlcG9jZXRVcGxueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogR2xvYmFscy5HVWNyR2xvYmFscy5SYWRfS29uc29saWRhY2UgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Jab2JyYXplbmlWZHUuQW5vRWRpdGFjZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBHbG9iYWxzLkdVY3JHbG9iYWxzLlJhZF9Lb25zb2xpZGFjZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVZkdS5Bbm9FZGl0YWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDMxNVwiLCAvL1JDIDMwMjUwMzE1IDogUMWZZXBvxI1ldCDDunBsbsO9XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJlY2FsY3VsYXRpb25BbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBhY3RWeXR2b3JpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Vnl0dm9yaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IEdsb2JhbHMuR1Vjckdsb2JhbHMuUmFkX0tvbnNvbGlkYWNlID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyWm9icmF6ZW5pVmR1LkFub0VkaXRhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogR2xvYmFscy5HVWNyR2xvYmFscy5SYWRfS29uc29saWRhY2UgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Jab2JyYXplbmlWZHUuQW5vRWRpdGFjZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNDlcIiwgLy9SQyAzMDI1MDM0OSA6IFZ5dHZvxZlpdFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVEb3plQXN5bmMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0WmFwaXN5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RaYXBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxMjRcIiwgLy9SQyAzMTEwMDEyNCA6IFrDoXBpc3lcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1phcGlzeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBuYXN0YXZlbmlBa2NpKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgLy8gcG9rdWQgbmVuaSBncmlkLCBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICBpZiAodGhhdC5wYXJlbnRDbnQuY2xvc2VkICkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgbGV0IHBvY2V0ICA9IHZpZXcuZ2V0Q291bnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHByZXBvY2V0XHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnMuYWN0UHJlcG9jZXQ/LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAodGhpcy5nbG9iYWxQYXJhbXMuUmFkX1Jpc3JlISA+PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyWm9icmF6ZW5pUmlzcmUuQW5vRWRpdGFjZSkgfHwgdGhpcy5kZWJ1Z1xyXG4gICAgICAgICAgICAgICAgLCB2aXNpYmxlOiB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICAsIFRvb2xUaXA6ICBcImpyZXM6MzAyNTAzNzRcIi5mb3JtYXQodGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPIGFzIHN0cmluZywgdGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rIGFzIG51bWJlciwgdGhpcy5HbG9iYWxzLlprcmF0a3k/LkljbykgLy9SQyAzMDI1MDM3NCA6IFDFmWVwb8SNZXQgemEgYWt0dcOhbG7DrSDDusSNZXRuw60gb2Jkb2LDrSBhIHsyfSAoezF9IGEgezB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gdXBsbnkgcHJlcG9jZXRcclxuICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy5hY3RQcmVwb2NldFVwbG55Py51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogKHRoaXMuZ2xvYmFsUGFyYW1zLlJhZF9SaXNyZSEgPj0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVJpc3JlLkFub0VkaXRhY2UpIFxyXG4gICAgICAgICAgICAgICAgLCB2aXNpYmxlOiB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5ICYmICB0aGlzLmRlYnVnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBhY3RWeXR2b3JpdFxyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLmFjdFZ5dHZvcml0Py51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXQ+MCYmKCh0aGlzLmdsb2JhbFBhcmFtcy5SYWRfUmlzcmUgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Jab2JyYXplbmlSaXNyZS5Bbm9FZGl0YWNlKSB8fCB0aGlzLmdsb2JhbFBhcmFtcy5SYWRfUmlzcmUgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Jab2JyYXplbmlSaXNyZS5Bbm9FZGl0YWNlSmVuU0QpXHJcbiAgICAgICAgICAgICAgICAsIHZpc2libGU6IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3Zhbmlfc3RhdnlcclxuICAgICAgICAgICAgICAgICwgVG9vbFRpcDogcG9jZXQgPiAwID9cclxuICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTA2MzhcIiAvL1JDIDMwMjUwNjM4IDogUHLDoXpkbsO9IHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB6YXBpc3lcclxuICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy5hY3RaYXBpc3k/LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBwb2NldD4wXHJcbiAgICAgICAgICAgICAgICAsIHZpc2libGU6IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3Zhbmlfc3RhdnlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgemFwaXN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgc2hvd1phcGlzeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gXCJqcmVzOjMxMTAwMjI0XCI7IC8vUkMgMzExMDAyMjQgOiBaw6FwaXN5IHN0YXZ1XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIC8vdmFyIGZpbHRyPSB0aGlzLmdldEZpbHRlcigpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47ICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc2VsID0gZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCAhPT0gMSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCByb3cgPSBzZWxbMF07XHJcbiAgICAgICAgICAgIC8vbGV0IHR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlO1xyXG4gICAgICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuICAgICAgICAgICAgbGV0IGZpbHRlcjogR0Vrb0ZpbHRlckR0bztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmlzQWdncmVnYXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvOiB7IHN0YXJ0OiByb3cuaWNvISwgZW5kOiByb3cuaWNvISB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdWNzOiB7IHN0YXJ0OiByb3cudWNzISwgZW5kOiByb3cudWNzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXVzOiB7IHN0YXJ0OiByb3cudXVzISwgZW5kOiByb3cudXVzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbmtzOiB7IHN0YXJ0OiByb3cubmtzISwgZW5kOiByb3cubmtzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGlkX2hkcl9yaXM6IHsgc3RhcnQ6IHJvdy5pZF9oZHJfcmlzISwgZW5kOiByb3cuaWRfaGRyX3JpcyEgfSxcclxuICAgICAgICAgICAgICAgICAgICByYWRla19oZHI6IHsgc3RhcnQ6IHJvdy5yYWRla19oZHIhLCBlbmQ6IHJvdy5yYWRla19oZHIhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZXNpYzogeyBzdGFydDogMCwgZW5kOiByb3cubWVzaWMgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY286IHsgc3RhcnQ6IHJvdy5pY28hLCBlbmQ6IHJvdy5pY28hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy91Y3M6IHsgc3RhcnQ6IHJvdy51Y3MhLCBlbmQ6IHJvdy51Y3MhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy91dXM6IHsgc3RhcnQ6IHJvdy51dXMhLCBlbmQ6IHJvdy51dXMhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9ua3M6IHsgc3RhcnQ6IHJvdy5ua3MhLCBlbmQ6IHJvdy5ua3MhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzaWM6IHsgc3RhcnQ6IDEsIGVuZDogcm93Lm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVuOiB7IHN0YXJ0OiAxLCBlbmQ6IHJvdy5kZW4gYXMgbnVtYmVyIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaWRfaGRyX3JpczogeyBzdGFydDogcm93LmlkX2hkcl9yaXMhLCBlbmQ6IHJvdy5pZF9oZHJfcmlzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGVrX2hkcjogeyBzdGFydDogcm93LnJhZGVrX2hkciEsIGVuZDogcm93LnJhZGVrX2hkciEgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL21lc2ljOiB7IHN0YXJ0OiAwLCBlbmQ6IHJvdy5tZXNpYyB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eTtcclxuICAgICAgICAgICAgICAgICAgICBpZCA9IFwidWN0WmFwaXN5I1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcblxyXG5cclxuICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQubmF2aWdhdGUoJ0dvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1Fa29aYXpuYW11Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR5cFVsb2h5OiB0eXBVbG9oeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmlsdGVyOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1cnJlbnRSb3c6IHJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3RyaWN0RmlsdGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9GaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBWeXR2b3JlbmkgZ3JpZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWREYXRhKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Rhc3BzRHRvPihbXSwge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIgfVxyXG4gICAgICAgICAgICAgICAgLCBrZXk6IFwiaWNvLHJvayxtZXNkZW4sc2tfdmwsYnVfdmwsaWRfaGRyX3JpcyxyYWRla19oZHIseGZpbXV6LHVjcyx1dXNcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHNsb3VwY2UgPSB0aGF0LmNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgLy92YXIgZGVmYXVsdFByb2ZpbGUgPSBzbG91cGNlLmNvbHVtbnM7Ly9zbG91cGNlLmNvbHVtbnMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLm5hbWU/LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInZsYXN0bm9zdFwiKSA9PT0gLTEpXHJcblxyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gJC5uZXdEaXYodGhpcy5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogc2xvdXBjZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogeyBuYW1lOiBcImRlZmF1bHRcIiwgY29sdW1uTGlzdDogc2xvdXBjZS5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJ1c2VyUHJvZmlsZVwiLCBjb2x1bW5MaXN0OiBzbG91cGNlLmNvbHVtbnMubWFwKChjKSA9PiBjLm5hbWUpLmpvaW4oXCIsXCIpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcmVwb2NldFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBSZWNhbGN1bGF0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmlzbC5VY3JSaXNyZVN0YXZ5LnBvY2V0WmF6bmFtdUtQcmVwb2N0dSh7IHVwbG55OiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Eb3Rheih0aGF0LnBhcmVudENudCwgXCJqcmVzOjMwMjUwMzc1XCIuZm9ybWF0KHJlc3VsdCkpIC8vUkMgMzAyNTAzNzUgOiBPcHJhdmR1IHByb3bDqXN0IHDFmWVwb8SNZXQgc3RhdnU/OyBQb8SNZXQgesOhem5hbcWvIGsgcMWZZXBvxI10dSB7MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZRVNcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDMxNlwiKTsgLy9SQyAzMDI1MDMxNiA6IFByb2LDrWjDoSBwxZllcG/EjWV0Li4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuaXNsLlVjclJpc3JlU3RhdnkucHJlcG9jZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDM3N1wiLmZvcm1hdCh0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gYXMgc3RyaW5nLCB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgYXMgbnVtYmVyLCB0aGF0Lkdsb2JhbHMuWmtyYXRreT8uSWNvKSwgc3RhdGU6IFwic3VjY2Vzc1wiIH0pOyAvL1JDIDMwMjUwMzc3IDogIFN0YXZ5IMO6c3DEm8WhbsSbIHDFmWVwb8SNdGVueSB6YSDDusSNZXRuw60gb2Jkb2LDrSB7MX0gYSB7Mn0gezB9LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByZXBvY2V0IHVwbG55XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIFJlY2FsY3VsYXRpb25BbGwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuaXNsLlVjclJpc3JlU3RhdnkucG9jZXRaYXpuYW11S1ByZXBvY3R1KHsgdXBsbnk6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRG90YXoodGhhdC5wYXJlbnRDbnQsIFwianJlczozMDI1MDM3NVwiLmZvcm1hdChyZXN1bHQpKSAvL1JDIDMwMjUwMzc1IDogT3ByYXZkdSBwcm92w6lzdCBwxZllcG/EjWV0IHN0YXZ1PzsgUG/EjWV0IHrDoXpuYW3FryBrIHDFmWVwb8SNdHUgezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IFwiWUVTXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMzE2XCIpOyAvL1JDIDMwMjUwMzE2IDogUHJvYsOtaMOhIHDFmWVwb8SNZXQuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5pc2wuVWNyUmlzcmVTdGF2eS5wcmVwb2NldFVwbG55KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAzNzdcIi5mb3JtYXQodGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPIGFzIHN0cmluZywgdGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rIGFzIG51bWJlciwgdGhhdC5HbG9iYWxzLlprcmF0a3k/LkljbyksIHN0YXRlOiBcInN1Y2Nlc3NcIiB9KTsgLy9SQyAzMDI1MDM3NyA6ICBTdGF2eSDDunNwxJvFoW7EmyBwxZllcG/EjXRlbnkgemEgw7rEjWV0bsOtIG9iZG9iw60gezF9IGEgezJ9IHswfS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB0aGF0LnBhcmVudENudC5lbmRPcGVyYXRpb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JpdCBkYXZrdSAtIHByaW1lIHZvbGFueSBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRG96ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRG90YXoodGhhdC5wYXJlbnRDbnQsIFwianJlczozMDI1MDM3OFwiKSAvL1JDIDMwMjUwMzc4IDogT3ByYXZkdSBjaGNldGUgdnl0dm/FmWl0IGTDrWzEjcOtIGTDoXZrdSBwxZllw7rEjXRvdsOhbsOtIHNrdXRlxI1ub3N0aT9cclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIllFU1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXIgPSB0aGF0LmdldEZpbHRlcigpLmdmaWx0ZXJwYW5lbCgnZ2V0Q3VycmVudERhdGEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2thOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUHJldWN0b3ZhbmlTdGF2TGlzdEZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXI8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBtYXNrYSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChmaWx0ZXJTZXJ2ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBLb250cm9sYSBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNoZWNrRk0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAzNzlcIik7IC8vUkMgMzAyNTAzNzkgOiBQcm9iw61ow6Egdnl0dsOhxZllbsOtIGTDoXZreS4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuaXNsLlVjclJpc3JlU3RhdnkuY3JlYXRlRG9zZSh7IHJlcXVlc3Q6IHsgS2VEbmk6IGZpbHRlci5kYXR1bUssIE1hc2thOiBmaWx0ZXJTZXJ2ZXIgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDM4MFwiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSk7IC8vUkMgMzAyNTAzODAgOiDDmnNwxJvFoW7EmyB2eXR2b8WZZW5vIGEgdWxvxb5lbm8gZG8gcmVnaXN0cnUgZMOhdmVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4gdGhhdC5wYXJlbnRDbnQuZW5kT3BlcmF0aW9uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcml0IGRhdmt1IC0gYXN5bmNocm9ubmkgdm9sYW5pXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZURvemVBc3luYygpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRG90YXoodGhhdC5wYXJlbnRDbnQsIFwianJlczozMDI1MDM3OFwiKSAvL1JDIDMwMjUwMzc4IDogT3ByYXZkdSBjaGNldGUgdnl0dm/FmWl0IGTDrWzEjcOtIGTDoXZrdSBwxZllw7rEjXRvdsOhbsOtIHNrdXRlxI1ub3N0aT9cclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIllFU1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXIgPSB0aGF0LmdldEZpbHRlcigpLmdmaWx0ZXJwYW5lbCgnZ2V0Q3VycmVudERhdGEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2thOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUHJldWN0b3ZhbmlTdGF2TGlzdEZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXI8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBtYXNrYSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChmaWx0ZXJTZXJ2ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBLb250cm9sYSBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNoZWNrRk0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoYXQucGFyZW50Q250LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDM3OVwiKTsgLy9SQyAzMDI1MDM3OSA6IFByb2LDrWjDoSB2eXR2w6HFmWVuw60gZMOhdmt5Li4uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3AgPSB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiR1VjckNyZWF0ZURvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogMCwgdG90YWw6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImpyZXM6MzAyNTAzNzlcIiwgIC8vUkMgMzAyNTAzNzkgOiBQcm9iw61ow6Egdnl0dsOhxZllbsOtIGTDoXZreS4uLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FuY2VsQWN0aW9uOiBuZXcgR0FjdGlvbih7IGNhcHRpb246IFwianJlczozMDI1MDI4NVwiLCBydW46ICgpID0+IHsgdGFzay5jYW5jZWwoKSB9LCBuYW1lOiBcImNhbmNlbEFjdFwiIH0pIC8vUkMgMzAyNTAyODUgOiBTdG9ybm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhc2sgPSBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0PEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcywgYW55PihcIkdvcmRpYy5VY3QuU2VydmVyLkdVY3JWeXR2b3JpdERhdmt1QXN5bmNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBLZURuaTogZmlsdGVyLmRhdHVtSywgTWFza2E6IGZpbHRlclNlcnZlciBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGFzIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JWeXR2b3JEYXZrdVJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLmdldFByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDM4MFwiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSk7IC8vUkMgMzAyNTAzODAgOiDDmnNwxJvFoW7EmyB2eXR2b8WZZW5vIGEgdWxvxb5lbm8gZG8gcmVnaXN0cnUgZMOhdmVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbihvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0LC8qIHUsIG8qLykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHQuc3RhdGUgPT09IEdvcmRpYy5Bc3luYy5HVGFza1N0YXRlLmNhbmNlbFNpZ25hbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5kaWFsb2dzLmFsZXJ0KFwianJlczozMDI1MDM4NFwiKTsgLy9SQyAzMDI1MDM4NCA6IFN0b3Jub3Zhbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHQuc3RhdGUgPT09IEdvcmRpYy5Bc3luYy5HVGFza1N0YXRlLmZhdWx0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5kaWFsb2dzLnNob3dFeGNlcHRpb24odC5leGNlcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb2dyZXNzKChhOiB7IHByb2dyZXNzPzogR29yZGljLkFzeW5jLklHVGFza1Byb2dyZXNzIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEucHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wLnByb2dyZXNzID0gYS5wcm9ncmVzcy5jdXJyZW50LCBvcC50b3RhbCA9IGEucHJvZ3Jlc3MudG90YWwsIG9wLnRleHQgPSBhLnByb2dyZXNzLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5wcm9ncmVzc09wZXJhdGlvbihvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4gdGhhdC5wYXJlbnRDbnQuZW5kT3BlcmF0aW9uKG9wKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbGEgcG9kbWluZWsgbmEgbW96bm9zdCBwcm92ZXN0IGRhdmt1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNoZWNrRk0oKTogSlF1ZXJ5UHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgbGV0IGZtOiBTdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdmlldyA9IGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+KFwiZ2V0Vmlld1wiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdmlldy5nZXREYXRhUm93cyhmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCByb3cgPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZtID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIGZtID0gcm93LmlzcF9maW0/LnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm0gIT0gcm93LmlzcF9maW0/LnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5kaWFsb2dzLmVycm9yKFwianJlczozMDI1MDM4MVwiIC8vUkMgMzAyNTAzODEgOiBDaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBcImpyZXM6MzAyNTAzODJcIiAvL1JDIDMwMjUwMzgyIDogVnl0dm/FmWVuw60gZMOhdmt5IGx6ZSBzcHVzdGl0IHBvdXplIHBybyBqZWRubyBGaW5hbsSNbsOtIG3DrXN0by5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZm0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZm0udHJpbSgpICE9IHRoYXQuRmluTWlzdG8pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjMwMjUwMzgxXCIgLy9SQyAzMDI1MDM4MSA6IENoeWJhXHJcbiAgICAgICAgICAgICAgICAgICAgLCBcImpyZXM6MzAyNTAzODNcIi5mb3JtYXQodGhhdC5HbG9iYWxzLlprcmF0a3k/LkljbywgdGhhdC5HbG9iYWxzLlprcmF0a3k/LlVjcykgLy9SQyAzMDI1MDM4MyA6IFZ5dHZvxZllbsOtIGTDoXZreSBsemUgc3B1c3RpdCBwb3V6ZSBwcm8gRmluYW7EjW7DrSBtw61zdG8gb2Rwb3bDrWRhasOtY8OtIHDFmWlobMOhxaFlbsOpbXUgezB9IGEgezF9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBjcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogZmlsdHJvdmFjaSB6YWxvemthXHJcbiAgICAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUZpbHRlclphbG96a2EoKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy92YXIgZGF0TWF4ID0gbW9tZW50KFwiMzEuMTIuXCIgKyB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2ssIFwiRC5NLllZWVlcIikudG9EYXRlKCk7XHJcbiAgICAgICAgICAgIC8vdmFyIGRhdE1pbiA9IG1vbWVudChcIjEuMS5cIiArIHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvaywgXCJELk0uWVlZWVwiKS50b0RhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGRhdE1heCA9IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvaytcIi0xMi0zMVwiICk7XHJcbiAgICAgICAgICAgIHZhciBkYXRNaW4gPSBuZXcgRGF0ZSh0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgKyBcIi0xLTFcIik7XHJcbiAgICAgICAgICAgIHZhciBha3REYXR1bSA9IG5ldyBEYXRlKHRoYXQuYWt0RGF0dW0pOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG9wZW5lZDogdHJ1ZSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzEyLCBMLTEyLTEyLTAsIE0tMTItMTEtMSwgUy0xMi0xMS0xXCIsIHRhYkxhYmVsOiBcImpyZXM6MzAyNTAwNTJcIiB9KTsgIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG4gICAgICAgICAgICAvL2lmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5IHx8IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3ZhbmlfQmFua292bmlVY3R5KVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyRm9ybURlZi5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMzQ3XCIgfSkgLy9SQyAzMDI1MDM0NyA6IGtlIGRuaVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9taW5WYWx1ZTogbmV3IERhdGUodGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rIGFzIG51bWJlciwgMSwgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tYXhWYWx1ZTogbmV3IERhdGUodGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rIGFzIG51bWJlciAsMTIsMzEpICxcclxuICAgICAgICAgICAgICAgICAgICAvL21heFZhbHVlOm5ldyBEYXRlKDIwMTksMTIsMzEsMjMsNTkpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pblZhbHVlOiBkYXRNaW4sXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IGRhdE1heCxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGFrdERhdHVtLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiBuZXcgRGF0ZSh0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgYXMgbnVtYmVyLCAxMiwgMzEpICxcclxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBcIm1vZGVsLmRhdHVtSz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVR5cGU6XCJkYXRlXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eSlcclxuICAgICAgICAgICAgICAgIGZpbHRlckZvcm1EZWYuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDM0OFwiIH0pIC8vUkMgMzAyNTAzNDggOiBBZ3JlZ2FjZVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFncmVnYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IFwibW9kZWwuYWdyZWdhY2U9dmFsdWUuYWdyZWdhY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjdHggPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGN0eC52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIGF0cmlidXR1IGFncmVnYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2lzQWdncmVnYXRpb24gPSBjdHgudmFsdWUgYXMgYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJQcm9maWwgPSBncmlkLmdncmlkKFwiZ2V0Q3VycmVudFByb2ZpbGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ1c2VyUHJvZmlsXCIsIHVzZXJQcm9maWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JkRm9ybWF0ID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+KFwib3B0aW9uXCIsIFwiY29sdW1uc1wiLCBncmRGb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+KFwicHJvZmlsZVZpc2libGVcIiwgZ3JkRm9ybWF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlclByb2ZpbC5jb2x1bW5MaXN0ID0gZ3JkRm9ybWF0LmNvbHVtbnMubWFwKChjKSA9PiBjLm5hbWUpLmpvaW4oXCIsXCIpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Rhc3BzRHRvPihcInByb2ZpbGVDaGFuZ2VzXCIsIHVzZXJQcm9maWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3ZhbmlfUmVnaXN0ckRhdmVrKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJGb3JtRGVmXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMzkxXCIgfSkgLy9SQyAzMDI1MDM5MSA6IFN0b3Jub3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBcIm1vZGVsLmFncmVnYWNlPXZhbHVlLmFncmVnYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN0eCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgY3R4LnZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBhdHJpYnV0dSBhZ3JlZ2FjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Ll9pc0FnZ3JlZ2F0aW9uID0gY3R4LnZhbHVlIGFzIGJvb2xlYW47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMzkyXCIgfSkgLy9SQyAzMDI1MDM5MiA6IFphbcOtdG51dMOpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YW1pdG51dG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBcIm1vZGVsLmFncmVnYWNlPXZhbHVlLmFncmVnYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGN0eCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgY3R4LnZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hY3RlbmkgSXNsIHNsdXpieSBwcm8gbGlzdFxyXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbTBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgbG9hZElTTExpc3QocnE6IHsgbWFza2E6IHt9LCBmaWx0ZXI6IHsgZmlsdGVyczogYW55IH0gfSk6IElzbC5fVGFzazxhbnksIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PiB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRDbnQuaXNsLlVjclJpc3JlU3RhdnkubGlzdCh7IGFncmVnYWNlOiB0aGlzLmlzQWdncmVnYXRpb24oKSwgbWFza2E6IHJxLm1hc2thLCBmaWx0ZXI6IHsgZmlsdGVyczogcnEuZmlsdGVyLmZpbHRlcnMgfSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhdCBtdWogc2VzdGF2ZW55IGZpbHRyXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0TXlGaWx0ZXIoZmlsdGVyU2VydmVyOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUHJldWN0b3ZhbmlTdGF2TGlzdEZpbHRlckR0bywgZmlsdGVyOiBhbnkpOiB7IG1hc2thOiB7fSwgZmlsdGVyOiB7IGZpbHRlcnM6IHt9IH0gfSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKGZpbHRlci5NZXNpYyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGZpbHRlci5NZXNpYyA9IC0xO1xyXG4gICAgICAgICAgICBsZXQgZGVubWVzOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIuZGF0dW1LICE9PSB1bmRlZmluZWQgJiYgZmlsdGVyLmRhdHVtSyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZGVubWVzID0gMSAqIGZpbHRlci5kYXR1bUsuZ2V0RGF0ZSgpICsgKGZpbHRlci5kYXR1bUsuZ2V0TW9udGgoKSArIDEpICogMzJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIkNoeWLDrSBkYXR1bVwiKTtcclxuICAgICAgICAgICAgbGV0IG15ZmlsdHIgPSB7IHJvazogeyBvOiBcIj1cIiwgdjogdGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rIH0sIGljbzogeyBvOiBcIj1cIiwgdjogdGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPIH0sIGRlbm1lczogeyBvOiBcIjw9XCIsIHY6IGRlbm1lcyB9IH0gYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1hc2thOiBmaWx0ZXJTZXJ2ZXIsIGZpbHRlcjogeyBmaWx0ZXJzOiBteWZpbHRyIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqICBOYWN0ZW5pIGRhdFxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wdWJsaWMgbG9hZERhdGFPbGQoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8gICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAvLyAgICB2YXIgbWFza2E6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICB2YXIgZmlsdGVyID0gdGhhdC5nZXRGaWx0ZXIoKS5nZmlsdGVycGFuZWwoJ2dldEN1cnJlbnREYXRhJyk7XHJcblxyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwibG9hZGRhdGEuZmlsdGVyXCIsIGZpbHRlcik7XHJcbiAgICAgICAgLy8gICAgLy9sZXQgdmlldyA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG5cclxuICAgICAgICAvLyAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgIC8vICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXI8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBtYXNrYSlcclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oKGZpbHRlclNlcnZlcikgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbWFza2EgPSBmaWx0ZXJTZXJ2ZXI7XHJcblxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgIGlmIChmaWx0ZXIuTWVzaWMgPT09IG51bGwpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZmlsdGVyLk1lc2ljID0gLTE7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBsZXQgZGVubWVzOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyLmRhdHVtSyAhPT0gdW5kZWZpbmVkICYmIGZpbHRlci5kYXR1bUsgIT09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBkZW5tZXMgPSAxKmZpbHRlci5kYXR1bUsuZ2V0RGF0ZSgpICsoZmlsdGVyLmRhdHVtSy5nZXRNb250aCgpKzEpKjMyXHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICBsZXQgbXlmaWx0ciA9IHsgcm9rOiB7IG86IFwiPVwiLCB2OiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5Sb2sgfSwgaWNvOiB7IG86IFwiPVwiLCB2OiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08gfSwgZGVubWVzOiB7IG86IFwiPD1cIiwgdjogZGVubWVzIH0gfSBhcyBhbnk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBHb3JkaWMuSXNsLlVjclJpc3JlU3RhdnkubGlzdCh7IGFncmVnYWNlOiB0aGF0LmlzQWdncmVnYXRpb24oKSwgbWFza2E6IG1hc2thLCBmaWx0ZXI6IHsgZmlsdGVyczogbXlmaWx0ciB9IH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy9hdC5zZXRBY3Rpb25zKHJlc3VsdC5MaXN0VmFsdWVzPy5sZW5ndGggYXMgYW55KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGdyaWRmb3JtYXR1IGRsZSBwcmVkbG9oeVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbXlHcmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGFzcHNEdG8+KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYnVfdmxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM1MFwiLCAvL1JDIDMwMjUwMzUwIDogQmFua292bsOtIMO6xI1ldCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJidV92bFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5Wb2xhbm9aVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3ZhbmlfQmFua292bmlVY3R5XHJcbiAgICAgICAgICAgICAgICB9KSwgLy9SQyAzMDI1MDM1MSA6IEJhbmtvdm7DrSDDusSNZXRcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNrX3ZsXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTNcIiwgLy9SQyAzMDI1MDM1MyA6IEJhbmthXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2tfdmxcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzUyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQuVm9sYW5vWlVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX0Jhbmtvdm5pVWN0eVxyXG4gICAgICAgICAgICAgICAgfSksIC8vUkMgMzAyNTAzNTIgOiBCYW5rYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwLCBoaWRkZW46IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5zaG93VUNTX1VVUykge1xyXG4gICAgICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5HbG9iYWxzLlprcmF0a3k/LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCwgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInVjc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudWNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuaWNvLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuY2FwdGlvbiwgbmFtZTogXCJ1Y3NcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInVjc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuR2xvYmFscy5aa3JhdGt5Py5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuaWNvLCB1Y3M6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMudWNzLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuY2FwdGlvbiwgbmFtZTogXCJ1dXNcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInV1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZF9oZHJfcmlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgyXCIsIC8vUkMgMzExMDAwODIgOiBJRCBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTVcIiwgLy9SQyAzMTEwMDI1NSA6IElkZW50aWZpa8OhdG9yIHJlemVydmFjZSByb3pwb8SNdG92w71jaCBwcm9zdMWZZWRrxa8gSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpZF9oZHJfcmlzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4MlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogOSB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSB9KSwgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgzXCIsLy9SQyAzMTEwMDA4MyA6IMWZw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU2XCIsIC8vUkMgMzExMDAyNTYgOiDFmMOhZGVrIHJlemVydmFjZSByb3pwb8SNdG92w71jaCBwcm9zdMWZZWRrxa8gSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogOTEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfZmltXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1NlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogMyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDMgfSB9KSwgLy9SQyAzMDI1MDM1NiA6IEZJTVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3JlelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM1NFwiLC8vUkMgMzAyNTAzNTQgOiBSZXplcnYuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDM1NVwiLCAvL1JDIDMwMjUwMzU1IDogRGF0dW0gcmV6ZXJ2YWNlIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfZmltXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU2XCIsIC8vUkMgMzAyNTAzNTYgOiBGSU0gICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF9maW1cIiwgIGNhcHRpb246IFwianJlczozMDI1MDM1NlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDcsIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCIgfSB9KSwgLy9SQyAzMDI1MDM1NiA6IEZJTVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfemRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU3XCIsIC8vUkMgMzAyNTAzNTcgOiBaRFJcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfemRyXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1N1wiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDcgfSB9KSwgLy9SQyAzMDI1MDM1NyA6IFpEUlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfcGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU4XCIsIC8vUkMgMzAyNTAzNTggOiBQQVJcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfcGFyXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1OFwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNiB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDYgfSB9KSwgLy9SQyAzMDI1MDM1OCA6IFBBUlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfcG9sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU5XCIsIC8vUkMgMzAyNTAzNTkgOiBQT0xcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfcG9sXCIsIGNhcHRpb246IFwianJlczozMDI1MDM1OVwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNCB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDQgfSB9KSwgLy9SQyAzMDI1MDM1OSA6IFBPTFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfZWRzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYwXCIsIC8vUkMgMzAyNTAzNjAgOiBFRFMvU01WU1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfZWRzXCIsIGNhcHRpb246IFwianJlczozMDI1MDM2MFwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogMTMgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiAxMyB9IH0pLCAvL1JDIDMwMjUwMzYwIDogRURTL1NNVlNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3B2c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2MVwiLCAvL1JDIDMwMjUwMzYxIDogUFZTXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3B2c1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjFcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDEwIH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogMTAgfSB9KSwgLy9SQyAzMDI1MDM2MSA6IFBWU1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfdWNsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYyXCIsIC8vUkMgMzAyNTAzNjIgOiBVQ0xcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfdWNsXCIsIGNhcHRpb246IFwianJlczozMDI1MDM2MlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogOSB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSB9KSwgLy9SQyAzMDI1MDM2MiA6IFVDTFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfempcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjNcIiwgLy9SQyAzMDI1MDM2MyA6IFpKXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM1LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3pqXCIsIGNhcHRpb246IFwianJlczozMDI1MDM2M1wiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogMyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDMgfSB9KSAvL1JDIDMwMjUwMzYzIDogWkpcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3VqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzg1XCIsIC8vUkMgMzAyNTAzODUgOiBVSlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2NCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF91alwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjVcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDYgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA2IH0gfSkgLy9SQyAzMDI1MDM2NSA6IDEzMDI1MDM2NFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfdXpcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjZcIiwgLy9SQyAzMDI1MDM2NiA6IFVaXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDY0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3V6XCIsIGNhcHRpb246IFwianJlczozMDI1MDM2NlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNSB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDUgfSB9KSAvL1JDIDMwMjUwMzY2IDogVVpcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2MwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzY3XCIsIC8vUkMgMzAyNTAzNjcgOiBBUyBNRFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwia2MwXCIsIGNhcHRpb246IFwianJlczozMDI1MDM2N1wiIH0pIC8vUkMgMzAyNTAzNjcgOiBBUyBNRFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzY4XCIsIC8vUkMgMzAyNTAzNjggOiBBUyBEYWxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImtjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjhcIiB9KSAvL1JDIDMwMjUwMzY4IDogQVMgRGFsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZW5tZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjlcIiwgICAvL1JDIDMwMjUwMzY5IDogWm3Em25hIFVDVFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsIC8vZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEsIG1ldGFyb3csIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgZm9udCA9IFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS5kZW5tZXMgPT09IHVuZGVmaW5lZCB8fCBkYXRhLmRlbm1lcyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVubWVzID0gZGF0YS5kZW5tZXMgYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVuID0gZGVubWVzICUgMzI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZXNpYyA9IE1hdGguZmxvb3IoZGVubWVzIC8gMzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChcIjxzcGFuPlwiLCB7IHRleHQ6IFwiXCIgKyBkZW4gKyBcIi5cIiArIG1lc2ljICsgXCIuXCIsIHRpdGxlOiBcIlwiLyosIFwic3R5bGVcIjogZm9udCovIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoYXQuaXNBZ2dyZWdhdGlvbigpKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNzBcIiwgLy9SQyAzMDI1MDM3MCA6IE1cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibWVzaWNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzcwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5Wb2xhbm9aVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3ZhbmlfQmFua292bmlVY3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIC8vUkMgMzAyNTAzNzAgOiBNXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM3MVwiLCAvL1JDIDMwMjUwMzcxIDogRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkZW5cIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzcxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5Wb2xhbm9aVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3ZhbmlfQmFua292bmlVY3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIC8vUkMgMzAyNTAzNzEgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2MwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM3MlwiLCAvL1JDIDMwMjUwMzcyIDogRE8gTURcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwic2MwXCIsIGNhcHRpb246IFwianJlczozMDI1MDM3MlwiIH0pIC8vUkMgMzAyNTAzNzIgOiBETyBNRFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM3M1wiLCAvL1JDIDMwMjUwMzczIDogRE8gRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcInNjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNzNcIiB9KSAvL1JDIDMwMjUwMzczIDogRE8gRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDE1XCIsIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGF0ZUludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZDogeyB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmllbGQ6IHsgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxNVwiIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBteUdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEplIHphcG51dGEgYWdyZWdhY2VcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgaXNBZ2dyZWdhdGlvbigpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzQWdncmVnYXRpb247XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==