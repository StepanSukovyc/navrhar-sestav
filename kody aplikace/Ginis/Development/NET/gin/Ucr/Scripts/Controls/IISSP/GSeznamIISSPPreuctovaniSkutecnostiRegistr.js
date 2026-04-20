"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * IISSP preuctovani skutecnosti - Registr davek
             *
             * @author tkares
             * @since 484.1.0.69
             */
            class GSeznamIISSPPreuctovaniSkutecnostiRegistr extends WebClient.GSeznamIISSPBase {
                constructor() {
                    super(...arguments);
                    this._isStorno = false;
                    this._isZamistnuto = false;
                }
                onContentReady() {
                    super.onContentReady();
                    let that = this;
                    that.FinMisto = this.parentCnt["FinMisto"];
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    if (this.FinMisto.trim() !== "")
                        grid.ggridserverfilter("apply", { isp_fim: { start: that.FinMisto, end: that.FinMisto } });
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createActions() {
                    let that = this;
                    that.parentCnt.actions.addRange({
                        actOtevrit: {
                            name: "actOtevrit",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250431", //RC 30250431 : Otevřít
                            run: function (ev, ctx) {
                                this.setPending(that.RunAction(0 /* TypeActionRegister.Open */));
                            }
                        },
                        actVytvorit: {
                            name: "actVytvorit",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250441", //RC 30250441 : Vytvořit
                            run: function (ev, ctx) {
                                this.setPending(that.RunAction(3 /* TypeActionRegister.Created */));
                            }
                        },
                        actOdeslat: {
                            name: "actOdeslat",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250432", //RC 30250432 : Odeslat
                            run: function (ev, ctx) {
                                this.setPending(that.RunAction(1 /* TypeActionRegister.Send */));
                            }
                        },
                        actUlozit: {
                            name: "actUlozit",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250439", //RC 30250439 : Uložit jako...
                            run: function (ev, ctx) {
                                this.setPending(that.RunAction(4 /* TypeActionRegister.Save */));
                            }
                        },
                        actHistorie: {
                            name: "actHistorie",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250433", //RC 30250433 : Historie
                            run: function (ev, ctx) {
                                that.RunAction(5 /* TypeActionRegister.History */);
                            }
                        },
                        actZrusit: {
                            name: "actZrusit",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250434", //RC 30250434 : Zrušit
                            run: function (ev, ctx) {
                                this.setPending(that.RunAction(6 /* TypeActionRegister.Cancel */));
                            }
                        },
                        actPotvrdit: {
                            name: "actPotvrdit",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250435", //RC 30250435 : Potvrdit
                            run: function (ev, ctx) {
                                this.setPending(that.RunAction(7 /* TypeActionRegister.Commit */));
                            }
                        },
                        actStorno: {
                            name: "actStorno",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250436", //RC 30250436 : Storno
                            run: function (ev, ctx) {
                                this.setPending(that.RunAction(2 /* TypeActionRegister.Storno */));
                            }
                        },
                        actStav: {
                            name: "actStav",
                            //icon: "gi-list",
                            enabled: false,
                            visible: false,
                            caption: "jres:30250440", //RC 30250440 : Ověřit stav
                            run: function (ev, ctx) {
                                this.setPending(that.RunAction(8 /* TypeActionRegister.State */));
                            }
                        },
                    });
                }
                /**
                 * Spusteni akce
                 *
                 * */
                RunAction(action) {
                    switch (action) {
                        case 0 /* TypeActionRegister.Open */:
                            return this.Otevrit();
                        case 3 /* TypeActionRegister.Created */:
                            this.Vytvorit();
                            break;
                        case 6 /* TypeActionRegister.Cancel */:
                            this.Zrusit();
                            break;
                        case 1 /* TypeActionRegister.Send */:
                            this.Odeslat();
                            break;
                        case 7 /* TypeActionRegister.Commit */:
                            this.Potvrdit();
                            break;
                        case 2 /* TypeActionRegister.Storno */:
                            this.Storno();
                            break;
                        case 5 /* TypeActionRegister.History */:
                            let grid = this.getGrid();
                            if (grid == null)
                                return $.Deferred().reject("").promise();
                            let rows = grid.ggrid("getSelection");
                            if (rows !== null && typeof rows !== "undefined" && rows.length > 0) {
                                this.parentCnt.navigate(Gordic.Iissp.WebControls.GIisspHistoryPsk, { id_ext: rows[0].id_csuis });
                            }
                            break;
                        case 8 /* TypeActionRegister.State */:
                            // TODO: Nereseno, nutno dodelat
                            break;
                        case 4 /* TypeActionRegister.Save */:
                            // TODO: Nereseno, nutno dodelat
                            // Ulozit jako
                            return this.SaveAs();
                    }
                    return $.Deferred().resolve().promise();
                }
                /**
                 * Odeslat vykaz
                 *
                 *
                 * */
                Odeslat() {
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    //that.parentCnt.beginOperation("jres:30250445"); //RC 30250445 : Připravuje se odeslání
                    const row = grid.ggrid("getSelection")[0];
                    const options = {
                        ico: row.ico,
                        rok: row.rok,
                        ucs: row.ucs,
                        ixb: row.ixb,
                        ixs_vkz: row.ixs_vkz,
                        por_cislo: row.por_cislo
                    };
                    this.parentCnt.navigate(Gordic.Iissp.WebControls.GIisspPreuctovaniSkutecnosti, options)
                        .on("close", () => { that.reload(); });
                }
                /**
                 * Zadani datumu
                 * */
                ZadaniDatumu() {
                    let that = this;
                    var datMax = new Date(that.Globals.EkoParams?.Rok + "-12-31");
                    var datMin = new Date(that.Globals.EkoParams?.Rok + "-1-1");
                    var form = new Gordic.Forms.Form({ tabLabel: "jres:30250446" }) //RC 30250446 : Zadejte datum dávky
                        .addRow({ label: "jres:30250448" }) //RC 30250448 : Vytvořit dávku ke dni
                        .addField("gdatebox", {
                        name: "dateumKDni", disabled: false,
                        minValue: datMin,
                        maxValue: datMax,
                        initialValue: datMax,
                    });
                    var simpleForm = that.parentCnt.dialogs.simpleForm("jres:30250449", form, {}, $.extend({}, {
                        width: 500, height: 200,
                        commandBar: [
                            {
                                customClass: "g-button--primary",
                                action: new GAction({
                                    name: "actOk", caption: GDlg.mbbOk.text, icon: "gi-tick", run: function (ev) {
                                        var dlg = simpleForm;
                                        console.log("dlg: ", dlg);
                                        if (dlg.gform("isValid", true)) {
                                            var data = data || {};
                                            dlg.findFields().gfield("model", "collect", data);
                                            dlg.gcontent().close(data);
                                        }
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "actZrusit", caption: GDlg.mbbCancel.text, icon: "gi-window-close", run: function (ev) {
                                        var dlg = simpleForm;
                                        dlg.gcontent().close();
                                    }
                                })
                            }
                        ]
                    }));
                    return simpleForm;
                }
                /**
                 * Zrusit davku
                 *
                 * */
                Zrusit() {
                    let that = this;
                    Gordic.Eko.WebClient.Common.Dotaz(this.parentCnt, "jres:30250442") //RC 30250442 : Opravdu chcete výkaz zrušit? Výkaz nepůjde odeslat.
                        .then(function (vysledek) {
                        if (vysledek == "YES") {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            let rows = grid.ggrid("getSelection");
                            if (rows !== null && typeof rows !== "undefined" && rows.length > 0) {
                                that.parentCnt.isl.UcrVykaz.zrusit({ ixsVkz: rows[0].ixs_vkz, porCislo: rows[0].por_cislo })
                                    .get()
                                    .then(() => {
                                    that.parentCnt.showFlash({ label: "jres:30250443", state: "success" }); //RC 30250443 : Výkaz zrušen
                                    that.reload();
                                    return;
                                })
                                    .catch(() => {
                                    that.parentCnt.showFlash({ label: "jres:30250444", state: "error" }); //RC 30250444 : Výkaz se nepodařilo zrušit
                                });
                            }
                        }
                    });
                }
                /**
                 * Potvrdit
                 *
                 * */
                Potvrdit() {
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    //let keDni = moment().toDate();
                    let rows = grid.ggrid("getSelection");
                    if (rows !== null && typeof rows !== "undefined" && rows.length > 0) {
                        that.parentCnt.beginOperation("jres:30250450"); //RC 30250450 : Probíhá potvrzení dávky...
                        that.parentCnt.isl.UcrVykaz.potvrdit({ ixsVkz: rows[0].ixs_vkz, porCislo: rows[0].por_cislo })
                            .get()
                            .then(() => {
                            that.parentCnt.showFlash({ label: "jres:30250451", state: "success" }); //RC 30250451 : Dávka potvrzena
                            that.reload();
                            return;
                        })
                            .always(() => that.parentCnt.endOperation());
                    }
                }
                /**
                 * Vytvorit
                 *
                 * */
                Otevrit() {
                    this.parentCnt.log.debug("Start Otevrit");
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    let rows = grid.ggrid("getSelection");
                    if (rows !== null && typeof rows !== "undefined" && rows.length > 0) {
                        that.parentCnt.beginOperation("jres:30250657"); //RC 30250657 : Probíhá otevření...
                        const row = rows[0];
                        if (row.ixb && row.ixb.trim()) {
                            //return Gordic.Wfl.Dialogs.IxsPrilohyDialog(that.parentCnt, {
                            //    visitors: [
                            //        new Wfl.WebClient.Attachments.GIxsAttachmentVisitor({
                            //            ixs: row.ixb,
                            //            //downloaderType: "Gordic.Uct.WebClient.GUctFileDownloader",
                            //            dao: new Wfl.WebClient.Attachments.GIxsAttachmentDAO({ ixs: row.ixb, /*islName: "UctLoadAttachmentService" */ }),
                            //            readonly: true
                            //        })]
                            //}, Global.Enums.ModOtevreni.showModalWindow).always(() => { that.parentCnt.endOperation(); });
                            let dto = {
                                DownloaderType: "Gordic.Ucr.WebClient.GFileDownloader",
                                AutoDownload: true,
                                CustomData: {
                                    "vykazDavkaOpen": "ANO",
                                    "ixsVkz": rows[0].ixs_vkz,
                                    "ixb": row.ixb
                                    //"porCislo": rows[0].por_cislo as string
                                }
                            };
                            let doc = new GDocument(this.parentCnt);
                            return doc.download(dto).always(() => that.parentCnt.endOperation());
                        }
                    }
                    return $.Deferred().reject().promise();
                }
                /**
                 * Ulozit jako
                 *
                 * */
                SaveAs() {
                    this.parentCnt.log.debug("Start SaveAs");
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    let rows = grid.ggrid("getSelection");
                    if (rows !== null && typeof rows !== "undefined" && rows.length > 0) {
                        that.parentCnt.beginOperation("jres:30250658"); //RC 30250658 : Probíhá uložení...
                        that.parentCnt.isl.UcrVykaz.ulozitJako({ ixsVkz: rows[0].ixs_vkz, porCislo: rows[0].por_cislo })
                            .get()
                            .then((result) => {
                            if (that.parentCnt.closed)
                                return;
                            return that.parentCnt.call("GetServerFile", { info: result.FileDto }).
                                then((info) => {
                                new GFile().download(info, { deleteAfterDownload: true });
                                if (result && result.Result?.trim() !== "")
                                    that.parentCnt.showFlash(result.Result);
                                that.reload();
                                return;
                            });
                            ;
                        })
                            .always(() => that.parentCnt.endOperation());
                    }
                    return $.Deferred().reject().promise();
                    {
                        return this.parentCnt.dialogs.error("jres:30250614", //RC 30250614 : Doklad o zaúčtování
                        "jres:30250615" //RC 30250615 : Doklad o zaúčtování nebyl nalezen
                        )
                            .createDialogPromise(() => false);
                    }
                }
                /**
                 * Potvrdit
                 *
                 * */
                Storno() {
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    //let keDni = moment().toDate();
                    let rows = grid.ggrid("getSelection");
                    if (rows !== null && typeof rows !== "undefined" && rows.length > 0) {
                        that.parentCnt.beginOperation("jres:30250452"); //RC 30250452 : Probíhá stornování dávky...
                        that.parentCnt.isl.UcrVykaz.stornovat({ ixsVkz: rows[0].ixs_vkz, porCislo: rows[0].por_cislo })
                            .get()
                            .then(() => {
                            that.parentCnt.showFlash({ label: "jres:30250453", state: "success" }); //RC 30250453 :  Dávka stornována
                            that.reload();
                            return;
                        })
                            .always(() => that.parentCnt.endOperation());
                    }
                }
                /**
                 * Vytvorit
                 *
                 * */
                Vytvorit() {
                    let that = this;
                    //TODO: nutno zobrazit formular
                    that.ZadaniDatumu()
                        .on("close", function (ev, data) {
                        if (data && data.dateumKDni && typeof data.dateumKDni === "object") {
                            //let keDni = moment().toDate();
                            let keDni = data.dateumKDni;
                            that.parentCnt.beginOperation("jres:30250379"); //RC 30250379 : Probíhá vytváření dávky...
                            that.parentCnt.isl.UcrRisreStavy.createDose({ request: { KeDni: keDni, Maska: {} } })
                                .get()
                                .then(() => {
                                that.parentCnt.showFlash({ label: "jres:30250380", state: "success" }); //RC 30250380 : Úspěšně vytvořeno a uloženo do registru dávek
                                that.reload();
                                return;
                            })
                                .always(() => that.parentCnt.endOperation());
                        }
                    });
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci() {
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    // pokud neni grid, nic nedelej
                    if (this.parentCnt.closed)
                        return;
                    let view = grid.ggrid("getView");
                    let rows = grid.ggrid("getSelection");
                    let pocet = view.getCount();
                    let lzeOdeslat = false;
                    let row = {};
                    if (pocet > 0)
                        row = rows[0];
                    lzeOdeslat = (row != null) && (row.stav_vkz == 10 || row.stav_vkz == 20);
                    // odeslat
                    this.parentCnt.actions.actOdeslat?.update({
                        enabled: pocet > 0 && lzeOdeslat && Ucr.Globals.GUcrGlobals.Rad_RisOdes === 2 /* Gordic.Uct.Interface.GUcrRisrePsOdes.Online */,
                        visible: Ucr.Globals.GUcrGlobals.Rad_RisOdes === 2 /* Gordic.Uct.Interface.GUcrRisrePsOdes.Online */
                    });
                    // ulozit
                    this.parentCnt.actions.actUlozit?.update({
                        enabled: pocet > 0 && lzeOdeslat && Ucr.Globals.GUcrGlobals.Rad_RisOdes === 1 /* Gordic.Uct.Interface.GUcrRisrePsOdes.Offline */,
                        visible: Ucr.Globals.GUcrGlobals.Rad_RisOdes === 1 /* Gordic.Uct.Interface.GUcrRisrePsOdes.Offline */
                    });
                    // historie
                    this.parentCnt.actions.actHistorie?.update({
                        enabled: pocet > 0 && row.id_csuis !== null && row.id_csuis?.trim() !== "" && Ucr.Globals.GUcrGlobals.Rad_RisOdes === 2 /* Gordic.Uct.Interface.GUcrRisrePsOdes.Online */,
                        visible: Ucr.Globals.GUcrGlobals.Rad_RisOdes === 2 /* Gordic.Uct.Interface.GUcrRisrePsOdes.Online */
                    });
                    // vytvorit
                    this.parentCnt.actions.actVytvorit?.update({
                        enabled: Ucr.Globals.GUcrGlobals.Rad_Risre === 2 /* Gordic.Uct.Interface.GUcrZobrazeniRisre.AnoEditace */ || Ucr.Globals.GUcrGlobals.Rad_Risre === 3 /* Gordic.Uct.Interface.GUcrZobrazeniRisre.AnoEditaceJenSU */,
                    });
                    // zrusit
                    this.parentCnt.actions.actZrusit?.update({
                        enabled: pocet > 0 && row.stav_vkz === 10,
                    });
                    // potvrdit
                    this.parentCnt.actions.actPotvrdit?.update({
                        enabled: pocet > 0 && row.stav_vkz === 20,
                    });
                    // storno
                    this.parentCnt.actions.actStorno?.update({
                        enabled: pocet > 0 && row.stav_vkz === 20,
                    });
                    // stav
                    this.parentCnt.actions.actStav?.update({
                        enabled: pocet > 0 && row.stav_vkz == 20 && row.id_csuis !== null,
                    });
                    // otevrit
                    this.parentCnt.actions.actOtevrit?.update({
                        enabled: pocet > 0 && row.ixb !== null,
                    });
                    // ulozit jako
                    this.parentCnt.actions.actUlozit?.update({
                        enabled: pocet > 0 && row.ixb !== null,
                    });
                }
                /**
                 * Definice menubaru
                 * */
                DefineMenuBar() {
                    let menuPar = [{ action: this.parentCnt.actions.actOtevrit, favorite: true },
                        { action: this.parentCnt.actions.actVytvorit, favorite: true },
                        { action: this.parentCnt.actions.actOdeslat, favorite: true },
                        { action: this.parentCnt.actions.actUlozit, favorite: true },
                        { action: this.parentCnt.actions.actHistorie, favorite: true },
                        { action: this.parentCnt.actions.actZrusit, favorite: true },
                        { action: this.parentCnt.actions.actPotvrdit, favorite: true },
                        { action: this.parentCnt.actions.actStorno, favorite: true },
                        { action: this.parentCnt.actions.actStav, favorite: true },
                    ];
                    return menuPar;
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
                        key: "ixs_vkz,por_cislo"
                    });
                    var sloupce = that.createGridFormat();
                    //var defaultProfile = sloupce.columns;//sloupce.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1)
                    const grid = $.newDiv(this.classGrid)
                        .appendTo(this.parentCnt.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        defaultAction: that.parentCnt.actions.actOtevrit,
                        data: view,
                        columns: sloupce,
                        defaultProfile: { name: "default", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        profiles: [
                            { name: "userProfile", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        ],
                        profileVisible: false,
                        selection: function (ev, info) {
                            that.nastaveniAkci();
                        },
                    });
                }
                /**
                * function createFilterZalozka
                *
                * Obecna zalozka
                * @param {GContent} content
                * @returns {any}
                */
                createFilterZalozka() {
                    var that = this;
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                        //.addSection()
                        //.addRow({ label: "jres:30250391" }) //RC 30250391 : Stornované
                        ////.addSection()
                        //    .addField("gcheck", {
                        //        name: "storno",
                        //        initialValue: false,
                        //        //model: "model.agregace=value.agregace",
                        //        change: (ev, ctx) => {
                        //            let grid = this.getGrid();
                        //            if (grid == null) return;
                        //            if (typeof ctx === "undefined" || typeof ctx.value === "undefined")
                        //                return;
                        //            // nastaveni atributu storna
                        //            that._isStorno = ctx.value as boolean;
                        //        },
                        //    }
                        //    )
                        //    .addSection()
                        //.addRow({ label: "jres:30250392" }) //RC 30250392 : Zamítnuté
                        ////.addSection()
                        //    .addField("gcheck", {
                        //        name: "zamitnuto",
                        //        initialValue: false,
                        //        //model: "model.agregace=value.agregace",
                        //        change: (ev, ctx) => {
                        //            let grid = this.getGrid();
                        //            if (grid == null) return;
                        //            if (typeof ctx === "undefined" || typeof ctx.value === "undefined")
                        //                return;
                        //            // nastaveni atributu zamitnuto
                        //            that._isZamistnuto = ctx.value as boolean;
                        //        },
                        //    }
                        //    )
                        .addSection()
                        .addRow({ label: "jres:30250496" }) //RC 30250496 : Volby
                        .addField("gselectbox", {
                        name: "volby", list: true, itemWidth: "",
                        dropdown: false,
                        multi: true,
                        model: "model.volby=value.hodnota",
                        itemTemplate: "{text}",
                        data: new Gordic.Data.View([{ text: "jres:30250391", hodnota: 1 } //RC 30250391 : Stornované
                            ,
                            { text: "jres:30250392", hodnota: 2 }] //RC 30250471 : Nesouhlasné stavy
                        , { key: "hodnota" })
                        //, initialValue: initialValue
                        ,
                        emptyValue: null,
                        change: function (ev, obj) {
                            //                    if (that.loading || (obj.flags && obj.flags.filterClear === true)) return;
                            //if (that.loading) return;
                            if (obj && typeof obj.value !== "undefined") {
                                //that.setFilter();
                                //// nastaveni akci
                                //let view = that.$grid.ggrid("getView");
                                //that.setActions(view.getDataRows().length);
                            }
                        }
                    });
                    return filterFormDef;
                }
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 *
                 */
                createGridFormat() {
                    let that = this;
                    var myGridFormat = new Gordic.Data.GridFormat();
                    myGridFormat.addIconColumn({
                        name: "v",
                        caption: "",
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            if (data === null)
                                return null;
                            return {
                                icon: "gi-send", text: "",
                                //tooltip: "jres:30250289"
                            };
                        }
                    });
                    myGridFormat.addIconColumn({
                        name: "e",
                        caption: "",
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            if (data === null || data.ixb === null)
                                return null;
                            return {
                                icon: "gi-paperel g-state-text", text: "jres:30250437", //RC 30250437 : Má uložený výkaz
                                //tooltip: "jres:30250289"
                            };
                        }
                    });
                    myGridFormat.addIconColumn({
                        name: "s",
                        caption: "",
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            if (data === null)
                                return null;
                            switch (data.stav_vkz) {
                                case 10: //vytvoren
                                    return {
                                        icon: "gi-paper",
                                        text: "jres:30250413" //RC 30250413 : Vytvořen
                                    };
                                case 20: //odeslan
                                    return {
                                        icon: "gi-vypraveno",
                                        text: "jres:30250414" //RC 30250414 : Odeslán do CSÚIS
                                    };
                                case 30: //Přijat CSÚIS
                                    return {
                                        icon: "gi-dokument_neurceno",
                                        text: "jres:30250415" //RC 30250415 : Přijat CSÚIS
                                    };
                                case 40: //Potvrzen CSÚIS OK
                                    return {
                                        icon: "gi-vyrizeno g-state-success",
                                        text: "jres:30250416" //RC 30250416 : Potvrzen CSÚIS OK
                                    };
                                case 50: //Potvrzen CSÚIS CHYBA
                                    return {
                                        icon: "gi-exclam g-state-error",
                                        text: "jres:30250417" //RC 30250417 : Potvrzen CSÚIS CHYBA
                                    };
                                case 60: //zrusen
                                    return {
                                        icon: "fa-times-circle g-state-text g-state-important",
                                        text: "jres:30250418" //RC 30250418 : Zrušen
                                    };
                                default:
                                    return null;
                            }
                        }
                    });
                    myGridFormat.addIconColumn({
                        name: "SExt",
                        caption: "",
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            if (data === null)
                                return null;
                            if (data.id_csuis === null)
                                return null;
                            return {
                                icon: "gi-ds-nove g-state-text g-state-favorite",
                                text: "jres:30250429" //RC 30250429 : Odesláno online
                            };
                        }
                    });
                    myGridFormat.addTextColumn({
                        name: "kod_vkz",
                        caption: "jres:30250419", //RC 30250419 : Kód
                        width: 80,
                    });
                    myGridFormat.addTextColumn({
                        name: "fim",
                        caption: "jres:30250356", //RC 30250356 : FIM     
                        description: "jres:30250430", //RC 30250430 : Finanční místo
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "fim", disabled: true, caption: "jres:30250356", firstField: { maxLength: 7 }, secondField: { maxLength: 7, allowedChars: "0123456789" } }), //RC 30250356 : FIM
                        width: 75,
                    });
                    myGridFormat.addNumberColumn({
                        name: "mesic",
                        caption: "jres:30250420", //RC 30250420 : Měsíc
                        serverFilter: Gordic.Eko.Filters.integerInterval({ model: "mesic", caption: "jres:30250420" }), //RC 30250420 : Měsíc
                        width: 40
                    });
                    myGridFormat.addNumberColumn({
                        name: "den",
                        caption: "jres:30250421", //RC 30250421 : Den
                        serverFilter: Gordic.Eko.Filters.integerInterval({ model: "den", caption: "jres:30250421" }), //RC 30250421 : Den
                        width: 40
                    });
                    myGridFormat.addTextColumn({
                        name: "stav_vkz_txt",
                        caption: "jres:30250422", //RC 30250422 : Stav
                        width: 80
                    });
                    myGridFormat.addDateTimeColumn({
                        name: "dat_zmena_ixb",
                        caption: "jres:30250423", //RC 30250423 : Datum vytvoření
                        width: 110,
                    });
                    myGridFormat.addTextColumn({
                        name: "zmenu_prov_rf_ixb",
                        caption: "jres:30250425", //RC 30250425 :  Autor vytvoření
                        width: 170
                    });
                    myGridFormat.addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:30250424", //RC 30250424 : Datum změny
                        width: 130,
                        serverFilter: Gordic.Eko.Filters.dateInterval({
                            model: "dat_zmena",
                            firstField: { valueType: "datetime" },
                            secondField: { valueType: "datetime" },
                            caption: "jres:31100015" //RC 31100015 : Datum změny
                        })
                    });
                    myGridFormat.addTextColumn({
                        name: "zmenu_prov_rf",
                        caption: "jres:30250426", //RC 30250426 : Změnu provedl
                        width: 170
                    });
                    myGridFormat.addTextColumn({
                        name: "poznamka",
                        caption: "jres:30250427", //RC 30250427 : Poznámka
                        width: 300,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "poznamka", caption: "jres:30250427" }), //RC 30250427 : Poznámka
                    });
                    myGridFormat.addTextColumn({
                        name: "id_csuis",
                        caption: "jres:30250428", //RC 30250428 : ID ext
                        width: 100,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "id_csuis", caption: "jres:30250428" }), //RC 30250428 : ID ext
                    });
                    return myGridFormat;
                }
                /**
                 * Nacteni Isl sluzby pro list
                 * @param param0
                 */
                loadISLList(rq) {
                    return this.parentCnt.isl.UcrVykaz.list(rq);
                }
                /**
                 * Zjisteni voleb na filtrpanelu
                 * */
                nactiVolby(volby) {
                    this._isStorno = false;
                    this._isZamistnuto = false;
                    for (var i = 0; i < volby.length; i++) {
                        if (volby[i] == 1)
                            this._isStorno = true;
                        else if (volby[i] == 2)
                            this._isZamistnuto = true;
                    }
                }
                /**
                 * Vrat muj sestaveny filtr
                 *
                 * @returns
                 */
                getMyFilter(filterServer, filter) {
                    this.nactiVolby(filter.volby);
                    let podmStav = { o: "NOT IN", v: [50, 60] };
                    if (this._isStorno) {
                        if (this._isZamistnuto)
                            podmStav = {};
                        else
                            podmStav = { o: "NOT IN", v: [50] };
                    }
                    else if (this._isZamistnuto)
                        podmStav = { o: "NOT IN", v: [60] };
                    //podmStav = { o: "=", v: 0 as any};
                    let myfiltr = {
                        stav_vkz: podmStav, zdroj_vkz: { o: "=", v: 10 }
                    };
                    return {
                        maska: filterServer, filter: { filters: myfiltr }
                    };
                }
            }
            WebClient.GSeznamIISSPPreuctovaniSkutecnostiRegistr = GSeznamIISSPPreuctovaniSkutecnostiRegistr;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQUHJldWN0b3ZhbmlTa3V0ZWNub3N0aVJlZ2lzdHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtSUlTU1BQcmV1Y3RvdmFuaVNrdXRlY25vc3RpUmVnaXN0ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBcTRCZjtBQXI0QkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcTRCbkI7SUFyNEJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxNEI3QjtRQXI0Qm9CLFdBQUEsU0FBUztZQWUxQjs7Ozs7ZUFLRztZQUNILE1BQWEseUNBQTBDLFNBQVEsVUFBQSxnQkFBZ0I7Z0JBQS9FOztvQkFFWSxjQUFTLEdBQVksS0FBSyxDQUFDO29CQUMzQixrQkFBYSxHQUFZLEtBQUssQ0FBQztnQkE0MkIzQyxDQUFDO2dCQXoyQkcsY0FBYztvQkFDVixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7d0JBQUUsT0FBTztvQkFDekIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7d0JBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbkcsQ0FBQztnQkFFRDs7O3FCQUdLO2dCQUNFLGFBQWE7b0JBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFB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NUMsQ0FBQzt5QkFDSSxJQUFJLElBQUksQ0FBQyxhQUFhO3dCQUN2QixRQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBRXhDLG9DQUFvQztvQkFDcEMsSUFBSSxPQUFPLEdBQUc7d0JBQ1YsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7cUJBQzVDLENBQUM7b0JBQ1QsT0FBTzt3QkFDSCxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7cUJBQ3BELENBQUM7Z0JBQ04sQ0FBQzthQUVKO1lBLzJCWSxtREFBeUMsNENBKzJCckQsQ0FBQTtRQUNMLENBQUMsRUFyNEJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFxNEI3QjtJQUFELENBQUMsRUFyNEJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxNEJuQjtBQUFELENBQUMsRUFyNEJTLE1BQU0sS0FBTixNQUFNLFFBcTRCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcbiAgICAvLyB0eXAgYWtjZVxyXG4gICAgY29uc3QgZW51bSBUeXBlQWN0aW9uUmVnaXN0ZXIge1xyXG4gICAgICAgIE9wZW4sXHJcbiAgICAgICAgU2VuZCxcclxuICAgICAgICBTdG9ybm8sXHJcbiAgICAgICAgQ3JlYXRlZCxcclxuICAgICAgICBTYXZlLFxyXG4gICAgICAgIEhpc3RvcnksXHJcbiAgICAgICAgQ2FuY2VsLFxyXG4gICAgICAgIENvbW1pdCxcclxuICAgICAgICAvLyBOZXBvdXppdmEgc2VcclxuICAgICAgICBTdGF0ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSUlTU1AgcHJldWN0b3Zhbmkgc2t1dGVjbm9zdGkgLSBSZWdpc3RyIGRhdmVrXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC42OVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUlJU1NQUHJldWN0b3ZhbmlTa3V0ZWNub3N0aVJlZ2lzdHIgZXh0ZW5kcyBHU2V6bmFtSUlTU1BCYXNlIGltcGxlbWVudHMgSUdDb250ZW50e1xyXG5cclxuICAgICAgICBwcml2YXRlIF9pc1N0b3JubzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgX2lzWmFtaXN0bnV0bzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgRmluTWlzdG86IHN0cmluZzsgICAvLyBmaW5hbmNuaSBtaXN0b1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgc3VwZXIub25Db250ZW50UmVhZHkoKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LkZpbk1pc3RvID0gdGhpcy5wYXJlbnRDbnRbXCJGaW5NaXN0b1wiXTtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5GaW5NaXN0by50cmltKCkgIT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgeyBpc3BfZmltOiB7IHN0YXJ0OiB0aGF0LkZpbk1pc3RvLCBlbmQ6IHRoYXQuRmluTWlzdG8gfSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLmFkZFJhbmdlKHsgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0T3RldnJpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T3RldnJpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDMxXCIsIC8vUkMgMzAyNTA0MzEgOiBPdGV2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuUnVuQWN0aW9uKFR5cGVBY3Rpb25SZWdpc3Rlci5PcGVuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFZ5dHZvcml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeXR2b3JpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDQxXCIsIC8vUkMgMzAyNTA0NDEgOiBWeXR2b8WZaXRcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuUnVuQWN0aW9uKFR5cGVBY3Rpb25SZWdpc3Rlci5DcmVhdGVkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE9kZXNsYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9kZXNsYXRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQzMlwiLCAvL1JDIDMwMjUwNDMyIDogT2Rlc2xhdFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LlJ1bkFjdGlvbihUeXBlQWN0aW9uUmVnaXN0ZXIuU2VuZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RVbG96aXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFVsb3ppdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDM5XCIsIC8vUkMgMzAyNTA0MzkgOiBVbG/Fvml0IGpha28uLi5cclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuUnVuQWN0aW9uKFR5cGVBY3Rpb25SZWdpc3Rlci5TYXZlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEhpc3RvcmllOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RIaXN0b3JpZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDMzXCIsIC8vUkMgMzAyNTA0MzMgOiBIaXN0b3JpZVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24oZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJ1bkFjdGlvbihUeXBlQWN0aW9uUmVnaXN0ZXIuSGlzdG9yeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WnJ1c2l0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MzRcIiwgLy9SQyAzMDI1MDQzNCA6IFpydcWhaXRcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuUnVuQWN0aW9uKFR5cGVBY3Rpb25SZWdpc3Rlci5DYW5jZWwpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UG90dnJkaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFBvdHZyZGl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MzVcIiwgLy9SQyAzMDI1MDQzNSA6IFBvdHZyZGl0XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbihldiwgY3R4KSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5SdW5BY3Rpb24oVHlwZUFjdGlvblJlZ2lzdGVyLkNvbW1pdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RTdG9ybm86IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDM2XCIsIC8vUkMgMzAyNTA0MzYgOiBTdG9ybm9cclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuUnVuQWN0aW9uKFR5cGVBY3Rpb25SZWdpc3Rlci5TdG9ybm8pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0U3Rhdjoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NDBcIiwgLy9SQyAzMDI1MDQ0MCA6IE92xJvFmWl0IHN0YXZcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuUnVuQWN0aW9uKFR5cGVBY3Rpb25SZWdpc3Rlci5TdGF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTcHVzdGVuaSBha2NlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgUnVuQWN0aW9uKGFjdGlvbjogVHlwZUFjdGlvblJlZ2lzdGVyKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZUFjdGlvblJlZ2lzdGVyLk9wZW46XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuT3RldnJpdCgpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQWN0aW9uUmVnaXN0ZXIuQ3JlYXRlZDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlZ5dHZvcml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGVBY3Rpb25SZWdpc3Rlci5DYW5jZWw6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5acnVzaXQoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGVBY3Rpb25SZWdpc3Rlci5TZW5kOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuT2Rlc2xhdCgpOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVHlwZUFjdGlvblJlZ2lzdGVyLkNvbW1pdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlBvdHZyZGl0KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQWN0aW9uUmVnaXN0ZXIuU3Rvcm5vOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3Rvcm5vKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQWN0aW9uUmVnaXN0ZXIuSGlzdG9yeTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KFwiXCIpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93cyA9IGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1Nlem5hbVZ5a2F6dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvd3MgIT09IG51bGwgJiYgdHlwZW9mIHJvd3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcm93cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250Lm5hdmlnYXRlKEdvcmRpYy5JaXNzcC5XZWJDb250cm9scy5HSWlzc3BIaXN0b3J5UHNrLCB7IGlkX2V4dDogcm93c1swXS5pZF9jc3VpcyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFR5cGVBY3Rpb25SZWdpc3Rlci5TdGF0ZTpcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBOZXJlc2VubywgbnV0bm8gZG9kZWxhdFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUeXBlQWN0aW9uUmVnaXN0ZXIuU2F2ZTpcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBOZXJlc2VubywgbnV0bm8gZG9kZWxhdFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVsb3ppdCBqYWtvXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuU2F2ZUFzKCk7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPZGVzbGF0IHZ5a2F6XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIE9kZXNsYXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvL3RoYXQucGFyZW50Q250LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDQ0NVwiKTsgLy9SQyAzMDI1MDQ0NSA6IFDFmWlwcmF2dWplIHNlIG9kZXNsw6Fuw61cclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtVnlrYXp1RHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogR29yZGljLklpc3NwLldlYkNvbnRyb2xzLkdJc3NwUHJldWN0b3ZhbmlTa3V0ZWNub3N0aU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBpY286IHJvdy5pY28hLFxyXG4gICAgICAgICAgICAgICAgcm9rOiByb3cucm9rISxcclxuICAgICAgICAgICAgICAgIHVjczogcm93LnVjcyEsXHJcbiAgICAgICAgICAgICAgICBpeGI6IHJvdy5peGIhLFxyXG4gICAgICAgICAgICAgICAgaXhzX3Zrejogcm93Lml4c192a3ohLFxyXG4gICAgICAgICAgICAgICAgcG9yX2Npc2xvOiByb3cucG9yX2Npc2xvIVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubmF2aWdhdGUoR29yZGljLklpc3NwLldlYkNvbnRyb2xzLkdJaXNzcFByZXVjdG92YW5pU2t1dGVjbm9zdGksIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoKSA9PiB7IHRoYXQucmVsb2FkKCkgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkYW5pIGRhdHVtdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBaYWRhbmlEYXR1bXUoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRhdE1heCA9IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayArIFwiLTEyLTMxXCIpO1xyXG4gICAgICAgICAgICB2YXIgZGF0TWluID0gbmV3IERhdGUodGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rICsgXCItMS0xXCIpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcImpyZXM6MzAyNTA0NDZcIiB9KSAvL1JDIDMwMjUwNDQ2IDogWmFkZWp0ZSBkYXR1bSBkw6F2a3lcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNDQ4XCIgfSkgLy9SQyAzMDI1MDQ0OCA6IFZ5dHZvxZlpdCBkw6F2a3Uga2UgZG5pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRldW1LRG5pXCIsIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogZGF0TWluLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbHVlOiBkYXRNYXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBkYXRNYXgsICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgdmFyIHNpbXBsZUZvcm0gPSB0aGF0LnBhcmVudENudC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJqcmVzOjMwMjUwNDQ5XCIsIGZvcm0sIHt9LCAkLmV4dGVuZCh7fSwgeyAvL1JDIDMwMjUwNDQ5IDogVnl0dm/FmWVuw60gZMOhdmt5XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAwLCBoZWlnaHQ6IDIwMCxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPa1wiLCBjYXB0aW9uOiBHRGxnLm1iYk9rLnRleHQsIGljb246IFwiZ2ktdGlja1wiLCBydW46IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkbGcgPSBzaW1wbGVGb3JtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGxnOiBcIiwgZGxnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGxnLmdmb3JtKFwiaXNWYWxpZFwiLCB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGRhdGEgfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRsZy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbGcuZ2NvbnRlbnQoKS5jbG9zZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RacnVzaXRcIiwgY2FwdGlvbjogR0RsZy5tYmJDYW5jZWwudGV4dCwgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIiwgcnVuOiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGxnID0gc2ltcGxlRm9ybTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbGcuZ2NvbnRlbnQoKS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2ltcGxlRm9ybTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWnJ1c2l0IGRhdmt1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIFpydXNpdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRG90YXoodGhpcy5wYXJlbnRDbnQsIFwianJlczozMDI1MDQ0MlwiKSAvL1JDIDMwMjUwNDQyIDogT3ByYXZkdSBjaGNldGUgdsO9a2F6IHpydcWhaXQ/IFbDvWtheiBuZXDFr2pkZSBvZGVzbGF0LlxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHZ5c2xlZGVrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZ5c2xlZGVrID09IFwiWUVTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93cyA9IGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1Nlem5hbVZ5a2F6dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3dzICE9PSBudWxsICYmIHR5cGVvZiByb3dzICE9PSBcInVuZGVmaW5lZFwiICYmIHJvd3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuaXNsLlVjclZ5a2F6LnpydXNpdCh7IGl4c1Zrejogcm93c1swXS5peHNfdmt6IGFzIHN0cmluZywgcG9yQ2lzbG86IHJvd3NbMF0ucG9yX2Npc2xvIGFzIG51bWJlciB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDQ0M1wiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSkgLy9SQyAzMDI1MDQ0MyA6IFbDvWtheiB6cnXFoWVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwNDQ0XCIsIHN0YXRlOiBcImVycm9yXCIgfSkgLy9SQyAzMDI1MDQ0NCA6IFbDvWtheiBzZSBuZXBvZGHFmWlsbyB6cnXFoWl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBvdHZyZGl0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgUG90dnJkaXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgLy9sZXQga2VEbmkgPSBtb21lbnQoKS50b0RhdGUoKTtcclxuICAgICAgICAgICAgbGV0IHJvd3MgPSBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdTZXpuYW1WeWthenVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAocm93cyAhPT0gbnVsbCAmJiB0eXBlb2Ygcm93cyAhPT0gXCJ1bmRlZmluZWRcIiAmJiByb3dzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDQ1MFwiKTsgLy9SQyAzMDI1MDQ1MCA6IFByb2LDrWjDoSBwb3R2cnplbsOtIGTDoXZreS4uLlxyXG4gICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuaXNsLlVjclZ5a2F6LnBvdHZyZGl0KHsgaXhzVmt6OiByb3dzWzBdLml4c192a3ogYXMgc3RyaW5nLCBwb3JDaXNsbzogcm93c1swXS5wb3JfY2lzbG8gYXMgbnVtYmVyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwNDUxXCIsIHN0YXRlOiBcInN1Y2Nlc3NcIiB9KTsgLy9SQyAzMDI1MDQ1MSA6IETDoXZrYSBwb3R2cnplbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB0aGF0LnBhcmVudENudC5lbmRPcGVyYXRpb24oKSlcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcml0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgT3RldnJpdCgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cuZGVidWcoXCJTdGFydCBPdGV2cml0XCIpO1xyXG4gICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIGxldCByb3dzID0gZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtVnlrYXp1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHJvd3MgIT09IG51bGwgJiYgdHlwZW9mIHJvd3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcm93cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA2NTdcIik7IC8vUkMgMzAyNTA2NTcgOiBQcm9iw61ow6Egb3RldsWZZW7DrS4uLlxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHJvd3NbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAocm93Lml4YiAmJiByb3cuaXhiLnRyaW0oKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBHb3JkaWMuV2ZsLkRpYWxvZ3MuSXhzUHJpbG9oeURpYWxvZyh0aGF0LnBhcmVudENudCwge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZpc2l0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIG5ldyBXZmwuV2ViQ2xpZW50LkF0dGFjaG1lbnRzLkdJeHNBdHRhY2htZW50VmlzaXRvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpeHM6IHJvdy5peGIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL2Rvd25sb2FkZXJUeXBlOiBcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3RGaWxlRG93bmxvYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZGFvOiBuZXcgV2ZsLldlYkNsaWVudC5BdHRhY2htZW50cy5HSXhzQXR0YWNobWVudERBTyh7IGl4czogcm93Lml4YiwgLyppc2xOYW1lOiBcIlVjdExvYWRBdHRhY2htZW50U2VydmljZVwiICovIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcmVhZG9ubHk6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSldXHJcbiAgICAgICAgICAgICAgICAgICAgLy99LCBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KS5hbHdheXMoKCkgPT4geyB0aGF0LnBhcmVudENudC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR0bzogSUdEb2N1bWVudERvd25sb2FkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEb3dubG9hZGVyVHlwZTogXCJHb3JkaWMuVWNyLldlYkNsaWVudC5HRmlsZURvd25sb2FkZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b0Rvd25sb2FkOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1c3RvbURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidnlrYXpEYXZrYU9wZW5cIjogXCJBTk9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXhzVmt6XCI6IHJvd3NbMF0uaXhzX3ZreiBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml4YlwiOiByb3cuaXhiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1wicG9yQ2lzbG9cIjogcm93c1swXS5wb3JfY2lzbG8gYXMgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkb2MgPSBuZXcgR0RvY3VtZW50KHRoaXMucGFyZW50Q250ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvYy5kb3dubG9hZChkdG8pLmFsd2F5cygoKSA9PiB0aGF0LnBhcmVudENudC5lbmRPcGVyYXRpb24oKSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG96aXQgamFrb1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIFNhdmVBcygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLmRlYnVnKFwiU3RhcnQgU2F2ZUFzXCIpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCByb3dzID0gZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtVnlrYXp1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHJvd3MgIT09IG51bGwgJiYgdHlwZW9mIHJvd3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcm93cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA2NThcIik7IC8vUkMgMzAyNTA2NTggOiBQcm9iw61ow6EgdWxvxb5lbsOtLi4uXHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuaXNsLlVjclZ5a2F6LnVsb3ppdEpha28oeyBpeHNWa3o6IHJvd3NbMF0uaXhzX3ZreiBhcyBzdHJpbmcsIHBvckNpc2xvOiByb3dzWzBdLnBvcl9jaXNsbyBhcyBudW1iZXIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmVudENudC5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQucGFyZW50Q250LmNhbGwoXCJHZXRTZXJ2ZXJGaWxlXCIsIHsgaW5mbzogcmVzdWx0LkZpbGVEdG8gfSkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVuKChpbmZvOiBHZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdGaWxlSW5mb0R0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHRmlsZSgpLmRvd25sb2FkKGluZm8hLCB7IGRlbGV0ZUFmdGVyRG93bmxvYWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuUmVzdWx0Py50cmltKCkgIT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LnNob3dGbGFzaChyZXN1bHQuUmVzdWx0ISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWQoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4gdGhhdC5wYXJlbnRDbnQuZW5kT3BlcmF0aW9uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRDbnQuZGlhbG9ncy5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTA2MTRcIiwgLy9SQyAzMDI1MDYxNCA6IERva2xhZCBvIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwNjE1XCIgLy9SQyAzMDI1MDYxNSA6IERva2xhZCBvIHphw7rEjXRvdsOhbsOtIG5lYnlsIG5hbGV6ZW5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgoKSA9PiBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBvdHZyZGl0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgU3Rvcm5vKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIC8vbGV0IGtlRG5pID0gbW9tZW50KCkudG9EYXRlKCk7XHJcbiAgICAgICAgICAgIGxldCByb3dzID0gZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtVnlrYXp1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHJvd3MgIT09IG51bGwgJiYgdHlwZW9mIHJvd3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcm93cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA0NTJcIik7IC8vUkMgMzAyNTA0NTIgOiBQcm9iw61ow6Egc3Rvcm5vdsOhbsOtIGTDoXZreS4uLlxyXG4gICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuaXNsLlVjclZ5a2F6LnN0b3Jub3ZhdCh7IGl4c1Zrejogcm93c1swXS5peHNfdmt6IGFzIHN0cmluZywgcG9yQ2lzbG86IHJvd3NbMF0ucG9yX2Npc2xvIGFzIG51bWJlciB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDQ1M1wiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSk7IC8vUkMgMzAyNTA0NTMgOiAgRMOhdmthIHN0b3Jub3bDoW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4gdGhhdC5wYXJlbnRDbnQuZW5kT3BlcmF0aW9uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JpdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIFZ5dHZvcml0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL1RPRE86IG51dG5vIHpvYnJheml0IGZvcm11bGFyXHJcbiAgICAgICAgICAgIHRoYXQuWmFkYW5pRGF0dW11KClcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgZGF0YSkgeyAvLyBUT0RPOiB0YWR5IGJ5bG8gcMWvdm9kbsSbIFwib2tcIlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuZGF0ZXVtS0RuaSAmJiB0eXBlb2YgZGF0YS5kYXRldW1LRG5pID09PSBcIm9iamVjdFwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBrZURuaSA9IG1vbWVudCgpLnRvRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2VEbmkgPSBkYXRhLmRhdGV1bUtEbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDM3OVwiKTsgLy9SQyAzMDI1MDM3OSA6IFByb2LDrWjDoSB2eXR2w6HFmWVuw60gZMOhdmt5Li4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmlzbC5VY3JSaXNyZVN0YXZ5LmNyZWF0ZURvc2UoeyByZXF1ZXN0OiB7IEtlRG5pOiBrZURuaSwgTWFza2E6IHt9IH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAzODBcIiwgc3RhdGU6IFwic3VjY2Vzc1wiIH0pOyAvL1JDIDMwMjUwMzgwIDogw5pzcMSbxaFuxJsgdnl0dm/FmWVubyBhIHVsb8W+ZW5vIGRvIHJlZ2lzdHJ1IGTDoXZla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4gdGhhdC5wYXJlbnRDbnQuZW5kT3BlcmF0aW9uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgZ3JpZCwgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Q250LmNsb3NlZCApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIGxldCByb3dzID0gZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtVnlrYXp1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgbGV0IHBvY2V0ID0gdmlldy5nZXRDb3VudCgpO1xyXG4gICAgICAgICAgICBsZXQgbHplT2Rlc2xhdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgcm93OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtVnlrYXp1RHRvID0ge30gO1xyXG4gICAgICAgICAgICBpZiAocG9jZXQgPiAwKVxyXG4gICAgICAgICAgICAgICAgcm93ID0gcm93c1swXVxyXG4gICAgICAgICAgICAgICAgbHplT2Rlc2xhdCA9IChyb3cgIT0gbnVsbCkgJiYgKHJvdy5zdGF2X3ZreiA9PSAxMCB8fCByb3cuc3Rhdl92a3ogPT0gMjApO1xyXG4gICAgICAgICAgICAvLyBvZGVzbGF0XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0T2Rlc2xhdD8udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHBvY2V0ID4gMCAmJiBsemVPZGVzbGF0ICYmIEdsb2JhbHMuR1Vjckdsb2JhbHMuUmFkX1Jpc09kZXMgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSaXNyZVBzT2Rlcy5PbmxpbmUsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBHbG9iYWxzLkdVY3JHbG9iYWxzLlJhZF9SaXNPZGVzID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmlzcmVQc09kZXMuT25saW5lXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHVsb3ppdFxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdFVsb3ppdD8udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHBvY2V0ID4gMCAmJiBsemVPZGVzbGF0ICYmIEdsb2JhbHMuR1Vjckdsb2JhbHMuUmFkX1Jpc09kZXMgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSaXNyZVBzT2Rlcy5PZmZsaW5lLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogR2xvYmFscy5HVWNyR2xvYmFscy5SYWRfUmlzT2RlcyA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJpc3JlUHNPZGVzLk9mZmxpbmVcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBoaXN0b3JpZVxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdEhpc3RvcmllPy51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXQgPiAwICYmIHJvdy5pZF9jc3VpcyAhPT0gbnVsbCAmJiByb3cuaWRfY3N1aXM/LnRyaW0oKSAhPT0gXCJcIiAmJiBHbG9iYWxzLkdVY3JHbG9iYWxzLlJhZF9SaXNPZGVzID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmlzcmVQc09kZXMuT25saW5lLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogR2xvYmFscy5HVWNyR2xvYmFscy5SYWRfUmlzT2RlcyA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJpc3JlUHNPZGVzLk9ubGluZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcml0XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0Vnl0dm9yaXQ/LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBHbG9iYWxzLkdVY3JHbG9iYWxzLlJhZF9SaXNyZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVJpc3JlLkFub0VkaXRhY2UgfHwgR2xvYmFscy5HVWNyR2xvYmFscy5SYWRfUmlzcmUgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Jab2JyYXplbmlSaXNyZS5Bbm9FZGl0YWNlSmVuU1UsICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8genJ1c2l0XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0WnJ1c2l0Py51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXQgPiAwICYmIHJvdy5zdGF2X3Zrej09PTEwICxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHBvdHZyZGl0XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0UG90dnJkaXQ/LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBwb2NldCA+IDAgJiYgcm93LnN0YXZfdmt6ID09PTIwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gc3Rvcm5vXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0U3Rvcm5vPy51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXQgPiAwICYmIHJvdy5zdGF2X3ZreiA9PT0gMjAsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBzdGF2XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0U3Rhdj8udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHBvY2V0ID4gMCAmJiByb3cuc3Rhdl92a3ogPT0gMjAgJiYgcm93LmlkX2NzdWlzICE9PSBudWxsLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gb3RldnJpdFxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdE90ZXZyaXQ/LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBwb2NldCA+IDAgJiYgcm93Lml4YiAhPT0gbnVsbCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHVsb3ppdCBqYWtvXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0VWxveml0Py51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXQgPiAwICYmIHJvdy5peGIgIT09IG51bGwsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnViYXJ1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgRGVmaW5lTWVudUJhcigpOiBNZW51UGFyYW1zW10ge1xyXG5cclxuICAgICAgICAgICAgbGV0IG1lbnVQYXI6IE1lbnVQYXJhbXNbXSA9XHJcbiAgICAgICAgICAgICAgICBbeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0T3RldnJpdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3RWeXR2b3JpdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3RPZGVzbGF0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdFVsb3ppdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3RIaXN0b3JpZSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3RacnVzaXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0UG90dnJkaXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0U3Rvcm5vLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdFN0YXYsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51UGFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgVnl0dm9yZW5pIGdyaWR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXIgPSBuZXcgR29yZGljLkRhdGEuUHJvdmlkZXI8YW55LCBhbnksIGFueT4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0YXNwc0R0bz4oW10sIHtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHsgcHJvdmlkZXI6IHByb3ZpZGVyIH1cclxuICAgICAgICAgICAgICAgICwga2V5OiBcIml4c192a3oscG9yX2Npc2xvXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBzbG91cGNlID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIC8vdmFyIGRlZmF1bHRQcm9maWxlID0gc2xvdXBjZS5jb2x1bW5zOy8vc2xvdXBjZS5jb2x1bW5zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5uYW1lPy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJ2bGFzdG5vc3RcIikgPT09IC0xKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9ICQubmV3RGl2KHRoaXMuY2xhc3NHcmlkKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMucGFyZW50Q250LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LnBhcmVudENudC5hY3Rpb25zLmFjdE90ZXZyaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlldyxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBzbG91cGNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7IG5hbWU6IFwiZGVmYXVsdFwiLCBjb2x1bW5MaXN0OiBzbG91cGNlLmNvbHVtbnMubWFwKChjKSA9PiBjLm5hbWUpLmpvaW4oXCIsXCIpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcInVzZXJQcm9maWxlXCIsIGNvbHVtbkxpc3Q6IHNsb3VwY2UuY29sdW1ucy5tYXAoKGMpID0+IGMubmFtZSkuam9pbihcIixcIikgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVWaXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaUFrY2koKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBmdW5jdGlvbiBjcmVhdGVGaWx0ZXJaYWxvemthXHJcbiAgICAgICAgKiAgICAgIFxyXG4gICAgICAgICogT2JlY25hIHphbG96a2FcclxuICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAqIEByZXR1cm5zIHthbnl9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlRmlsdGVyWmFsb3prYSgpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgb3BlbmVkOiB0cnVlLCBsYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMTIsIEwtMTItMTItMCwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwgdGFiTGFiZWw6IFwianJlczozMDI1MDA1MlwiIH0pICAvL1JDIDMwMjUwMDUyIDogRmlsdHJcclxuXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAyNTAzOTFcIiB9KSAvL1JDIDMwMjUwMzkxIDogU3Rvcm5vdmFuw6lcclxuICAgICAgICAgICAgICAgIC8vLy8uYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwic3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvL21vZGVsOiBcIm1vZGVsLmFncmVnYWNlPXZhbHVlLmFncmVnYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICh0eXBlb2YgY3R4ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBjdHgudmFsdWUgPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBhdHJpYnV0dSBzdG9ybmFcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5faXNTdG9ybm8gPSBjdHgudmFsdWUgYXMgYm9vbGVhbjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICApXHJcbiAgICAgICAgICAgICAgICAvLyAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwMzkyXCIgfSkgLy9SQyAzMDI1MDM5MiA6IFphbcOtdG51dMOpXHJcbiAgICAgICAgICAgICAgICAvLy8vLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInphbWl0bnV0b1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9tb2RlbDogXCJtb2RlbC5hZ3JlZ2FjZT12YWx1ZS5hZ3JlZ2FjZVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAodHlwZW9mIGN0eCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgY3R4LnZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBuYXN0YXZlbmkgYXRyaWJ1dHUgemFtaXRudXRvXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuX2lzWmFtaXN0bnV0byA9IGN0eC52YWx1ZSBhcyBib29sZWFuO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNDk2XCIgfSkgLy9SQyAzMDI1MDQ5NiA6IFZvbGJ5XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZvbGJ5XCIsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtdWx0aTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwudm9sYnk9dmFsdWUuaG9kbm90YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt7IHRleHQ6IFwianJlczozMDI1MDM5MVwiLCBob2Rub3RhOiAxIH0gLy9SQyAzMDI1MDM5MSA6IFN0b3Jub3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyB0ZXh0OiBcImpyZXM6MzAyNTAzOTJcIiwgaG9kbm90YTogMiB9XSAvL1JDIDMwMjUwNDcxIDogTmVzb3VobGFzbsOpIHN0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyBrZXk6IFwiaG9kbm90YVwiIH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIGluaXRpYWxWYWx1ZTogaW5pdGlhbFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBlbXB0eVZhbHVlOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubG9hZGluZyB8fCAob2JqLmZsYWdzICYmIG9iai5mbGFncy5maWx0ZXJDbGVhciA9PT0gdHJ1ZSkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC5sb2FkaW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqICYmIHR5cGVvZiBvYmoudmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8gbmFzdGF2ZW5pIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRBY3Rpb25zKHZpZXcuZ2V0RGF0YVJvd3MoKS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGb3JtRGVmO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkZm9ybWF0dSBkbGUgcHJlZGxvaHlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdTZXpuYW1WeWthenVEdG8+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbXlHcmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1Nlem5hbVZ5a2F6dUR0bz4oKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ2XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDM5LC8vIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJjZW50ZXJcIixcclxuXHJcbiAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2VuZFwiLCB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlczozMDI1MDI4OVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJlXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDM5LC8vIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJjZW50ZXJcIixcclxuXHJcbiAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgPT09IG51bGwgfHwgZGF0YS5peGIgPT09bnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wYXBlcmVsIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcImpyZXM6MzAyNTA0MzdcIiwgLy9SQyAzMDI1MDQzNyA6IE3DoSB1bG/FvmVuw70gdsO9a2F6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMjg5XCJcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG5cclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5zdGF2X3Zreikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOiAvL3Z5dHZvcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGFwZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImpyZXM6MzAyNTA0MTNcIiAvL1JDIDMwMjUwNDEzIDogVnl0dm/FmWVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIwOiAvL29kZXNsYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS12eXByYXZlbm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImpyZXM6MzAyNTA0MTRcIiAvL1JDIDMwMjUwNDE0IDogT2Rlc2zDoW4gZG8gQ1PDmklTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDMwOiAvL1DFmWlqYXQgQ1PDmklTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZG9rdW1lbnRfbmV1cmNlbm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcImpyZXM6MzAyNTA0MTVcIiAvL1JDIDMwMjUwNDE1IDogUMWZaWphdCBDU8OaSVNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDA6IC8vUG90dnJ6ZW4gQ1PDmklTIE9LXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktdnlyaXplbm8gZy1zdGF0ZS1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJqcmVzOjMwMjUwNDE2XCIgLy9SQyAzMDI1MDQxNiA6IFBvdHZyemVuIENTw5pJUyBPS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1MDogLy9Qb3R2cnplbiBDU8OaSVMgQ0hZQkFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1leGNsYW0gZy1zdGF0ZS1lcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwianJlczozMDI1MDQxN1wiIC8vUkMgMzAyNTA0MTcgOiBQb3R2cnplbiBDU8OaSVMgQ0hZQkFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjA6IC8venJ1c2VuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS10aW1lcy1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW1wb3J0YW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwianJlczozMDI1MDQxOFwiIC8vUkMgMzAyNTA0MTggOiBacnXFoWVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJTRXh0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDM5LC8vIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJjZW50ZXJcIixcclxuXHJcbiAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlkX2NzdWlzID09PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kcy1ub3ZlIGctc3RhdGUtdGV4dCBnLXN0YXRlLWZhdm9yaXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwianJlczozMDI1MDQyOVwiIC8vUkMgMzAyNTA0MjkgOiBPZGVzbMOhbm8gb25saW5lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrb2Rfdmt6XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MTlcIiwgLy9SQyAzMDI1MDQxOSA6IEvDs2RcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZpbVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU2XCIsIC8vUkMgMzAyNTAzNTYgOiBGSU0gICAgIFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDQzMFwiLCAvL1JDIDMwMjUwNDMwIDogRmluYW7EjW7DrSBtw61zdG9cclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiZmltXCIsIGRpc2FibGVkOnRydWUsIGNhcHRpb246IFwianJlczozMDI1MDM1NlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNyB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDcsIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCIgfSB9KSwgLy9SQyAzMDI1MDM1NiA6IEZJTVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDc1LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDIwXCIsIC8vUkMgMzAyNTA0MjAgOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoeyBtb2RlbDogXCJtZXNpY1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MjBcIn0pLCAvL1JDIDMwMjUwNDIwIDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRlblwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDIxXCIsIC8vUkMgMzAyNTA0MjEgOiBEZW5cclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG1vZGVsOiBcImRlblwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MjFcIiB9KSwgLy9SQyAzMDI1MDQyMSA6IERlblxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Zrel90eHRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQyMlwiLCAvL1JDIDMwMjUwNDIyIDogU3RhdlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hX2l4YlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDIzXCIsIC8vUkMgMzAyNTA0MjMgOiBEYXR1bSB2eXR2b8WZZW7DrVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3JmX2l4YlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDI1XCIsIC8vUkMgMzAyNTA0MjUgOiAgQXV0b3Igdnl0dm/FmWVuw61cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNzBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQyNFwiLCAvL1JDIDMwMjUwNDI0IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGF0ZUludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmllbGQ6IHsgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTVcIiAvL1JDIDMxMTAwMDE1IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZfcmZcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQyNlwiLCAvL1JDIDMwMjUwNDI2IDogWm3Em251IHByb3ZlZGxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNzBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MjdcIiwgLy9SQyAzMDI1MDQyNyA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwicG96bmFta2FcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDI3XCIgfSksIC8vUkMgMzAyNTA0MjcgOiBQb3puw6Fta2FcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2NzdWlzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MjhcIiwgLy9SQyAzMDI1MDQyOCA6IElEIGV4dFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaWRfY3N1aXNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDI4XCIgfSksIC8vUkMgMzAyNTA0MjggOiBJRCBleHRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG15R3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBJc2wgc2x1emJ5IHBybyBsaXN0XHJcbiAgICAgICAgICogQHBhcmFtIHBhcmFtMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBsb2FkSVNMTGlzdChycTogeyBtYXNrYToge30sIGZpbHRlcjogeyBmaWx0ZXJzOiBhbnkgfSB9KTogSXNsLl9UYXNrPGFueSwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudENudC5pc2wuVWNyVnlrYXoubGlzdChycSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaamlzdGVuaSB2b2xlYiBuYSBmaWx0cnBhbmVsdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYWN0aVZvbGJ5KHZvbGJ5OiBbTnVtYmVyXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1N0b3JubyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9pc1phbWlzdG51dG8gPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2b2xieSEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh2b2xieVtpXSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzU3Rvcm5vID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZvbGJ5W2ldID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNaYW1pc3RudXRvID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmF0IG11aiBzZXN0YXZlbnkgZmlsdHJcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRNeUZpbHRlcihmaWx0ZXJTZXJ2ZXI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvLCBmaWx0ZXI6IGFueSk6IHsgbWFza2E6IHt9LCBmaWx0ZXI6IHsgZmlsdGVyczoge30gfSB9IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICAgICAgdGhpcy5uYWN0aVZvbGJ5KGZpbHRlci52b2xieSk7XHJcbiAgICAgICAgICAgIGxldCBwb2RtU3RhdiA9IHsgbzogXCJOT1QgSU5cIiwgdjogWzUwLCA2MF0gfTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzU3Rvcm5vKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNaYW1pc3RudXRvKVxyXG4gICAgICAgICAgICAgICAgICAgIHBvZG1TdGF2ID0ge30gYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHBvZG1TdGF2ID0geyBvOiBcIk5PVCBJTlwiLCB2OiBbNTBdIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5faXNaYW1pc3RudXRvKVxyXG4gICAgICAgICAgICAgICAgcG9kbVN0YXYgPSB7IG86IFwiTk9UIElOXCIsIHY6IFs2MF0gfTtcclxuXHJcbiAgICAgICAgICAgIC8vcG9kbVN0YXYgPSB7IG86IFwiPVwiLCB2OiAwIGFzIGFueX07XHJcbiAgICAgICAgICAgIGxldCBteWZpbHRyID0ge1xyXG4gICAgICAgICAgICAgICAgc3Rhdl92a3o6IHBvZG1TdGF2LCB6ZHJval92a3o6IHsgbzogXCI9XCIsIHY6IDEwIH1cclxuICAgICAgICAgICAgfSBhcyBhbnk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBtYXNrYTogZmlsdGVyU2VydmVyLCBmaWx0ZXI6IHsgZmlsdGVyczogbXlmaWx0ciB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdfQ==