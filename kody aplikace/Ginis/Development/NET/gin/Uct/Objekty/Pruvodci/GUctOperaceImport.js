"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Predkontace
             *
             * @author Tomas Kares
             * @since 480.1.0.20
             */
            let GUctOperaceImport = class GUctOperaceImport extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "OperaceImporte#";
                    this.contentClipBoard = "";
                    /** příznak úspěšného ukončení (true-success, false - fail) */
                    this.successClose = false;
                    /**
                     *   Instance Wizarda
                     *
                     * Pruvodce
                     * @type {Wizard}
                     */
                    this.Pruvodce = new Gordic.Wizard();
                    this.kontrolaNaRozvrh = true;
                    // vybrane zapisy pro import (pred spustenim vlastniho importu do databaze)
                    this.seznamVybranychZapisu = [];
                    this.editacniMod = false;
                }
                /**
                 * Zadefinování formuláře
                 */
                prepareContent(option) {
                    this.Globals = option.globals;
                    this.content = option.content;
                    this.type = option.type;
                    this.ixp = option.ixp;
                    this.datZmeny = option.datZmeny;
                    this.grdFormat = option.grdFormat;
                    this.content.ContentImport = this; // zaregistrovani obsahu do detailu
                    this.onContentReady();
                }
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    that.actions.addRange({
                        actZkontroluj: new GAction({
                            caption: "jres:30250805", //RC 30250805 : Kontrolovat
                            name: "KontrolovatAct",
                            run: function () {
                                this.setPending(that.Kontrolovat());
                            }
                        }),
                        actZrusit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: () => {
                                this.tryClose();
                            }
                        }),
                        //actImportBezKontrol: new GAction({
                        //    caption: "jres:30250845", //RC 30250845 : Import bez kontroly rozvrhu
                        //    name: "actImportBezKontrol",
                        //    run: () => {
                        //        that.kontrolaNaRozvrh = false;
                        //        that.Pruvodce.setStep(2);
                        //    }
                        //}),
                        actPolozkyUlozit: Gordic.Eko.Action.actionUlozit({ enabled: false, run: () => that.GetGrid()?.ggridroweditor("commit") }),
                        actPolozkyZrusit: Gordic.Eko.Action.actionZrusit({ enabled: false, run: () => that.GetGrid()?.ggridroweditor("cancel") }),
                        actPolozkyOpravit: Gordic.Eko.Action.actionOpravit({
                            enabled: false, run: () => {
                                that.GetGrid()?.ggridroweditor("start");
                                that.editacniMod = true;
                            }
                        }),
                        actPolozkyOdstranit: Gordic.Eko.Action.actionOdstranit({
                            enabled: false,
                            run: () => {
                                let grid = that.GetGrid();
                                if (grid == null)
                                    return;
                                let data = Gordic.Eko.Grid.checkedRows(grid);
                                if (data == null || data.length === 0) {
                                    that.dialogs.messageBox("jres:30250137" //RC 30250137 : Info
                                    , "jres:30250345" //RC 30250345 : Nevybrány žádné zápisy
                                    );
                                    return;
                                }
                                let dataAll = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                                let dataResult = [];
                                dataAll.forEach((item) => {
                                    let a = data.find((x) => x.ixp === item.ixp && x.radek_z === item.radek_z);
                                    if (typeof a === "undefined" || a === null)
                                        dataResult.push(item);
                                });
                                let view = grid.ggrid("getView");
                                view.updateData(dataResult);
                                that.enabledAction();
                            }
                        }),
                    });
                    // button zavrit
                    let zrusitButton = {
                        caption: "jres:30250107", //RC 30250107 : Zrušit
                        action: that.actions.actZrusit
                    };
                    this.Pruvodce.create({
                        content: that
                    }, {
                        title: "jres:30250516", //RC 30250516 : Import
                        steps: [
                            {
                                caption: "jres:30250517", //RC 30250517 : Zdrojová data
                                buttons: [zrusitButton],
                                create: function (cnt, contentDiv, change) {
                                    that.kontrolaNaRozvrh = true;
                                    that.Pruvodce.enableStep(cnt, [{ enabled: true, index: 0 }, { enabled: true, index: 1 }, { enabled: false, index: 2 }], { back: { enabled: true }, next: { enabled: true } });
                                    var form = new Gordic.Forms.Form({
                                        name: "frmNastaveniImport", layoutDescriptor: "L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0", tabOptions: {
                                            title: "Nastavení",
                                        }
                                    });
                                    form.addSection();
                                    if (that.type === "IMPCLIP") {
                                        Gordic.Utils.readFromClipboard({ parentContent: that })
                                            .then(function (result) {
                                            if (typeof result !== "undefined" && typeof result.text !== "undefined") {
                                                that.contentClipBoard = result.text;
                                                that.Pruvodce.setStep(1);
                                                return;
                                            }
                                            else {
                                                if (typeof result !== "undefined" && typeof result.errorMessage !== "undefined")
                                                    cnt.showFlash({ label: result.errorMessage, state: "warning", timer: 2000 });
                                                else
                                                    cnt.showFlash({ label: "jres:30250808", state: "warning", timer: 2000 }); //RC 30250808 : Prázdný obsah schránky
                                            }
                                        })
                                            .catch((error) => {
                                            throw error;
                                        });
                                    }
                                    else
                                        form.addRow("jres:30250525").addField("gfilefield", //RC 30250525 : Výběr souboru
                                        {
                                            name: "uploadTMPFile",
                                            //customClass: "downloadField",
                                            acceptExtension: ".csv",
                                            itemWidth: "w-L-4 w-S-12 w-M-6",
                                            maxFileCount: 1, // pouze jeden soubor
                                            //fieldDownloaderClass: "Gordic.Documents.WebClient.GFtpClient",
                                            fileUploaded: function (ev, obj) {
                                                that.showFlash("jres:30250526".format(obj.fileInfo.filename), "success", "xx"); //RC 30250526 : Soubor {0} nahrán.
                                            }
                                        });
                                    $.newDiv().appendTo(contentDiv).gform("createFrom", form);
                                },
                                change: function (cnt, contentDiv, change) {
                                    // deferred object
                                    let defClose = $.Deferred();
                                    if (change.task.nextStep === 1) {
                                        if (that.type === "IMPCLIP") {
                                            if (typeof that.contentClipBoard === "undefined" || that.contentClipBoard.length == 0 || that.contentClipBoard == "") {
                                                cnt.dialogs.warning("jres:30250537"); //RC 30250537 : Prázdný obsah schránky
                                                defClose.reject(false).promise();
                                                return;
                                            }
                                            return defClose.resolve(true).promise();
                                        }
                                        else {
                                            return cnt.findFields("uploadTMPFile").gfilefield("getValueAsync").then(function (data) {
                                                console.log(data);
                                                if (typeof data === "undefined" || data.length == 0) {
                                                    cnt.dialogs.warning("jres:30250520"); //RC 30250520 : Není vybrán žádný soubor!
                                                    defClose.reject(false);
                                                }
                                                that.infoFile = data[0];
                                                return defClose.resolve(true).promise();
                                            }).catch(() => {
                                                defClose.reject(false).promise();
                                            });
                                            //debugger;
                                            //defClose.resolve();
                                        }
                                    }
                                    else {
                                        return defClose.reject(false).promise();
                                    }
                                }
                            },
                            {
                                caption: "jres:30250810", //RC 30250810 : Výběr zápisů
                                buttons: [zrusitButton /*, {
                                        //caption:that.actions.actImportBezKontrol.caption,
                                        action: that.actions.actImportBezKontrol
                                    }*/
                                ],
                                commandBar: {
                                    next: {
                                        caption: "jres:30250809", //RC 30250809 : Importovat
                                        icon: ""
                                    }, previously: { caption: "jres:30250853" } //RC 30250853 : Zpět
                                },
                                create: (cnt, contentDiv, change) => {
                                    // zpristupneni tlacitek
                                    that.Pruvodce.enableStep(cnt, [{ enabled: true, index: 0 }, { enabled: true, index: 1 }, { enabled: true, index: 2 }], { back: { enabled: true }, next: { enabled: this.isValidData() } });
                                    that.kontrolaNaRozvrh = true;
                                    let form = new Gordic.Forms.Form({
                                        name: "frmImpNastaveni", layoutDescriptor: "L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0", tabOptions: {
                                            title: "Nastaveni",
                                        }
                                    })
                                        // .addSection("jres:30250850") //RC 30250850 : Import bez kontroly na rozvrh
                                        .addRow("jres:30250854").addField("gcheck", {
                                        name: "chkBezKontroluRozvrhu",
                                        label: "Bez kontroly",
                                        model: "bezKontrolyRozvrhu=value",
                                        initialValue: false
                                    });
                                    let formHtml = $.newDiv().appendTo(contentDiv).gform("createFrom", form);
                                    let tabRadky = $.newDiv()
                                        .appendTo(contentDiv)
                                        .gtab({
                                        title: "jres:30250811", //RC 30250811 : Zdrojové zápisy
                                        opened: true,
                                        locked: true,
                                        menuBar: [
                                            { id: "IDmnuKontroluj", action: that.actions.actZkontroluj, favorite: true },
                                            { id: "IDmnuOpravit", action: that.actions.actPolozkyOpravit, favorite: true },
                                            { id: "IDmnuUlozit", action: that.actions.actPolozkyUlozit, favorite: true },
                                            { id: "IDmnuZrusit", action: that.actions.actPolozkyZrusit, favorite: true },
                                            { id: "IDmnuOdstranit", action: that.actions.actPolozkyOdstranit, favorite: true },
                                        ]
                                    });
                                    let grid = that.createGrid(that.parentContent, tabRadky);
                                    that.beginOperation({ text: "jres:30250844" }); //RC 30250844 : Připravuji data...
                                    debugger;
                                    let spustitKontrolu = that.globalSettings.get("Global.Uct.AppSettings.UctSettingsForm.PolozkyImportKontrola") ?? false;
                                    if (that.type === "IMPCLIP") {
                                        that.isl.UctDokladZapis.prepareImportFromClipboard({
                                            rq: {
                                                ViditelneSloupce: Gordic.Uct.WebClient.Detail.getViditelneSloupce(that.grdFormat)
                                                /*that.getViditelneSloupce()*/ ,
                                                DataZeSchranky: that.contentClipBoard,
                                                ProvestKontrolu: spustitKontrolu,
                                                DatumPosledniZmenyDokladu: this.datZmeny, PidDokladu: this.ixp
                                            }
                                        })
                                            .get()
                                            .then((returnData) => {
                                            let view = new Gordic.Data.View(returnData.Seznam, { key: "ixp,radek_z" });
                                            let grid = that.GetGrid();
                                            if (grid === null)
                                                return;
                                            // nastavení dat a překreslení gridu
                                            grid.ggrid("setData", view);
                                            grid.ggrid("refreshRows");
                                            grid.ggrid("refresh");
                                            //that.successClose = true;
                                            return returnData;
                                        })
                                            .always(() => that.endOperation());
                                    }
                                    else {
                                        that.isl.UctDokladZapis.prepareImportFromFile({
                                            rq: {
                                                FileInfo: that.infoFile,
                                                ViditelneSloupce: Gordic.Uct.WebClient.Detail.getViditelneSloupce(that.grdFormat),
                                                ProvestKontrolu: spustitKontrolu,
                                                DatumPosledniZmenyDokladu: this.datZmeny, PidDokladu: this.ixp
                                            }
                                        })
                                            .get()
                                            .then((returnData) => {
                                            let view = new Gordic.Data.View(returnData.Seznam, { key: "ixp,radek_z" });
                                            // nastavení dat a překreslení gridu
                                            let grid = that.GetGrid();
                                            if (grid === null)
                                                return;
                                            grid.ggrid("setData", view);
                                            grid.ggrid("refreshRows");
                                            return returnData;
                                        })
                                            .always(() => that.endOperation());
                                    }
                                },
                                change: (cnt, contentDiv, change) => {
                                    let grid = that.GetGrid();
                                    if (grid === null)
                                        return;
                                    that.seznamVybranychZapisu = Gordic.Eko.Grid.checkedRows(grid, true);
                                    //let val = cnt.findFields("chkBezKontroluRozvrhu").gfilefield("getValue");
                                    let dtoData = { bezKontrolyRozvrhu: false };
                                    cnt. /*findForms("frmNastaveniImport").*/findFields().gfield("model", "collect", dtoData);
                                    that.kontrolaNaRozvrh = !dtoData.bezKontrolyRozvrhu;
                                    //else
                                    //    that.seznamVybranychZapisu = [];
                                }
                            },
                            {
                                // fáze 3 - zobrazení výsledku 
                                caption: "jres:30250437", //RC 30250437 : Výsledek
                                create: function (cnt, contentDiv, change) {
                                    // zpristupneni tlacitek
                                    that.Pruvodce.enableStep(cnt, [{ enabled: false, index: 0 }, { enabled: true, index: 1 }, { enabled: true, index: 2 }], { back: { enabled: false }, next: { enabled: true } });
                                    let html = $.newDiv().appendTo(contentDiv).gform("createFrom", new Gordic.Forms.Form("L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0")
                                    //.addSection("Vyberte doklady k proúčtování")
                                    );
                                    that.createGrid(that.parentContent, contentDiv);
                                    that.Run(html, contentDiv)
                                        .then(function () {
                                        cnt.showFlash({
                                            id: "completeMsg", label: "jres:30250524" //RC 30250524 : Import zápisů dokončen
                                            //, icon: "gi-tick"
                                            ,
                                            customClass: "g-state-success",
                                            timer: 5000
                                        });
                                    });
                                },
                                change: function (cnt, contentDiv, change) {
                                }
                            },
                        ],
                        // závěrečný krok
                        complete: function (cnt, contentDiv, change) {
                            // ukončení průvodce
                            that.tryClose();
                        },
                        //custom: {
                        //    caption: "Vygenerovat zápisy",
                        //    tooltip: "Ukončení průvodce",
                        //    //                    customClass: "gwizard__back",
                        //    run: function (cnt) {
                        //        if (that !== null && typeof that.successClose !== "undefined")
                        //            that.successClose = true;
                        //        // ukončení průvodce
                        //        cnt.tryClose();
                        //    }
                        //}
                    });
                }
                /**
                 * Kontrola zdrojovych dat
                 *
                 *
                 */
                Kontrolovat() {
                    let that = this;
                    let grid = that.GetGrid();
                    if (grid === null)
                        return $.Deferred().reject().promise();
                    let radky = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                    if (typeof radky === "undefined" || radky.length === 0) {
                        throw new GError("jres:30250806"); //RC 30250806 : Nenalezeny zdrojova data pro kontrolu
                    }
                    this.beginOperation("jres:30250807"); //RC 30250807 : Kontroluji...
                    return this.isl.UctDokladZapis.verifyImportData({ rq: { DatumPosledniZmenyDokladu: this.datZmeny, PidDokladu: this.ixp, Seznam: radky } })
                        .get()
                        .then((result) => {
                        let grid = that.GetGrid();
                        if (grid === null)
                            return;
                        let view = grid.ggrid("getView");
                        view.updateData(result.Seznam);
                        debugger;
                        return result;
                    }).
                        always(() => this.endOperation());
                }
                /**
                 * spusteni zauctovani dokladu
                 *
                 * @param {JQuery} $grid grid
                 */
                Run($grid, controlDiv) {
                    let that = this;
                    if (typeof that.seznamVybranychZapisu === "undefined" || that.seznamVybranychZapisu === null || that.seznamVybranychZapisu.length === 0) {
                        that.dialogs.alert("jres:30250818"); //RC 30250818 : Nebyly vybrány žádné doklady k proúčtování
                        return $.Deferred().reject().promise();
                    }
                    debugger;
                    that.beginOperation("jres:30250817"); //RC 30250817 : Probíhá import
                    //var vstup: Gordic.Eko.Interface.GVisibleTableColumns[] = [];
                    return that.isl.UctDokladZapis.import({ rq: { DatumPosledniZmenyDokladu: this.datZmeny, PidDokladu: this.ixp, Seznam: that.seznamVybranychZapisu, KontrolovatNaRozvrh: that.kontrolaNaRozvrh } })
                        .get()
                        .then((returnData) => {
                        //that.$grid = that.createGrid(that.parentContent as Detail.GUctDetail, controlDiv); //that.createGrid(controlDiv, false);
                        let view = new Gordic.Data.View(returnData.Seznam, { key: "ixp,radek_z" });
                        let grid = that.GetGrid();
                        if (grid === null)
                            return;
                        // nastavení dat a překreslení gridu
                        grid.ggrid("setData", view);
                        grid.ggrid("refreshRows");
                        that.successClose = false;
                        returnData.Seznam?.forEach((item) => {
                            if (item.wiz_kind == 200 /* Gordic.Uct.Interface.GEResultOperation.Success */) {
                                that.successClose = true;
                                return;
                            }
                        });
                        return returnData;
                    })
                        .always(() => that.endOperation());
                }
                /**
                *
                *  Vytvoreni gridu
                *
                * createGrid
                *
                * @param {JQuery} content
                * @param {boolean} multi (default = false)
                * @param {boolean} result (default = false) - vysledny grid
                * @returns {JQuery}
                */
                createGrid(content, contentDiv) {
                    let that = this;
                    // vyhledavaci sloupce
                    //let searchColumns = ["c0","c1","popis"];
                    // definice gridu
                    let rownGrid = $.newDiv("js-WizadrGrid").css("height", "100%").appendTo(contentDiv.css("height", "100%"));
                    rownGrid
                        // $("<div class='js-WizadrGrid'>")
                        //.css("height", "calc(100% - " + $filterForm.height() + "px)")
                        //.css("height", "100%")
                        //.appendTo(content)
                        .ggrid({
                        columnMode: "full" // fit (defaultne by melo byt toto), full
                        ,
                        multi: true,
                        selection: function (ev, ctx) {
                            that.enabledAction();
                        },
                        rowsChecked: "wiz_check"
                        //sloupce, podle kterych se vyhledava v searchboxu
                        //, searchColumns: searchColumns
                        //#region Definice sloupcu
                        ,
                        columns: this.createColumns(content),
                    })
                        .ggridroweditor({
                        allowCopy: true,
                        start: function (ev, obj) {
                            // jsem v editaci
                            that.editacniMod = true;
                            that.enabledAction();
                        },
                        rowBar: Gordic.Widget.GMagicPreFiller.buttons,
                        commit: function (ev, obj) {
                            that.editacniMod = false;
                            that.enabledAction();
                        },
                        beforeStart: function (ev, info) {
                            // pred editaci
                            //debugger;
                        },
                        cancel: function (ev, obj) {
                            that.editacniMod = false;
                            that.enabledAction();
                        },
                        save: function (data, obj) {
                            that.editacniMod = false;
                            that.enabledAction();
                        }, //??
                    })
                        .gautofit({ resizersOnTab: false });
                    return rownGrid.gautofit();
                    //this.$grid.resize();
                }
                /**
                * enabledAction
                *
                *  Povoleni akce
                */
                enabledAction() {
                    //let that = content;
                    var currentStep = this.Pruvodce.getStep(this);
                    if (currentStep == 1) {
                        this.Pruvodce.enableStep(this, [{ enabled: true, index: 0 }, { enabled: true, index: 1 }, { enabled: false, index: 2 }], { back: { enabled: true }, next: { enabled: this.isValidData() } });
                    }
                    let grd = this.GetGrid();
                    let pocet = 0;
                    if (grd != null)
                        pocet = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grd);
                    this.actions.actPolozkyOpravit.update({
                        enabled: currentStep == 1 && pocet > 0 && !this.editacniMod,
                        visible: currentStep == 1,
                    });
                    this.actions.actPolozkyUlozit.update({
                        enabled: currentStep == 1 && pocet > 0 && this.editacniMod,
                        visible: currentStep == 1,
                    });
                    this.actions.actPolozkyZrusit.update({
                        enabled: currentStep == 1 && pocet > 0 && this.editacniMod,
                        visible: currentStep == 1,
                    });
                    this.actions.actPolozkyOdstranit.update({
                        enabled: currentStep == 1 && pocet > 0 && !this.editacniMod,
                        visible: currentStep == 1,
                    });
                }
                ///**
                // * Viditelne sloupce na gridu
                // * 
                // * @returns
                // */
                //private getViditelneSloupce(): Gordic.Eko.Interface.GVisibleTableColumns[] {
                //    var vstup: Gordic.Eko.Interface.GVisibleTableColumns[] = [];
                //    this.grdFormat.columns.forEach(function (item) {
                //        vstup.push({ HeaderText: item.caption, Name: item.name });
                //    });
                //    return vstup;
                //}
                /***
                    *
                    *  Kontrola dat pred vlastni operaci
                    *
                    */
                isValidData() {
                    let result = !this.editacniMod;
                    let grid = this.GetGrid();
                    if (typeof grid === "undefined" || grid === null)
                        return false;
                    let oznaceneRadky = Gordic.Eko.Grid.checkedRows(grid, true);
                    if (typeof oznaceneRadky === "undefined" || oznaceneRadky === null || oznaceneRadky.length === 0)
                        return false;
                    oznaceneRadky.forEach((radek, index) => {
                        if (radek.ResultOperation === 400 /* Gordic.Uct.Interface.GEResultOperation.Error */) {
                            return false;
                        }
                    });
                    return result;
                }
                /**
                 *  Definice sloupcu
                 * createColumns
                 *
                 * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctVybranyDokladDto>}
                 */
                createColumns(content) {
                    return Gordic.Uct.WebClient.Detail.createGridFormat(this.content, true);
                    var gridFormat = new Gordic.Data.GridFormat()
                        //.addIconColumn({                                                          // přidání výsledkového sloupce do gridu wizardu
                        //    name: "ResultOperation", caption: "", width: 40,                      // vlastnosti přidaného sloupce
                        //    hidden: false,
                        //    iconTemplate: function (data) {                                         // sloupec do gridu timu ICON
                        //        if (data.ResultOperation === Gordic.Uct.Interface.GEResultOperation.Success)          // vyhovující doklad
                        //        {
                        //            return { icon: "fa-check-circle g-state-success g-state-text", tooltip: "jres:30250503" }; //RC 30250503 : OK
                        //        }
                        //        else if (data.ResultOperation === Gordic.Uct.Interface.GEResultOperation.Warning)     // vyhovující doklad s upozrněním
                        //            return { icon: "fa-exclamation-triangle g-state-warning g-state-text", tooltip: "jres:30250483" }; //RC 30250483 : Doklad s upozorněním
                        //        else if (data.ResultOperation === Gordic.Uct.Interface.GEResultOperation.Error)       // nevyhovující doklad
                        //            return { icon: "fa-times-circle g-state-error g-state-text", tooltip: "jres:30250484" }; //RC 30250484 : Nevyhovující doklad pro hromadnou operaci
                        //        else                                                                // žádný výsledek neexistuje
                        //            return { icon: "", text: "", tooltip: "" } as any;                     // neutrální doklad
                        //    }
                        //})
                        .addIconColumn({
                        name: "wiz_kind", caption: "jres:30250815", width: 40, //RC 30250815 : Kontrola
                        hidden: false,
                        iconTemplate: function (data) {
                            if (data.wiz_kind === 200 /* Gordic.Uct.Interface.GEResultOperation.Success */) // vyhovující doklad
                                return { icon: "fa-check-circle g-state-success g-state-text", tooltip: "jres:30250503" }; //RC 30250503 : OK
                            else if (data.wiz_kind === 206 /* Gordic.Uct.Interface.GEResultOperation.Warning */) // vyhovující doklad s upozrněním
                                return { icon: "fa-exclamation-triangle g-state-warning g-state-text", tooltip: "jres:30250813" }; //RC 30250813 : Řádek s upozorněním
                            else if (data.wiz_kind === 400 /* Gordic.Uct.Interface.GEResultOperation.Error */) // nevyhovující doklad
                                return { icon: "fa-times-circle g-state-error g-state-text", tooltip: "jres:30250812" }; //RC 30250812 : Nevyhovující řádek
                            else // žádný výsledek neexistuje
                                return { icon: "", text: "", tooltip: "" }; // neutrální doklad
                        }
                    })
                        .addTextColumn({
                        name: "wiz_txt_err", caption: "jres:30250814", width: 170, // vlastnosti přidaného sloupce //RC 30250814 : Kontrola - výsledek
                    })
                        //.addTextColumn({                                                          // přidání výsledkového sloupce do gridu wizardu
                        //    name: "ErrMsg", caption: "Výsledek", width: 170,                      // vlastnosti přidaného sloupce
                        //    hidden: false,
                        //    cellTemplate: function (data, metarow, info) {                                         // sloupec do gridu timu ICON
                        //        if (data.ResultOperation === Gordic.Uct.Interface.GEResultOperation.Success)          // vyhovující doklad
                        //        {
                        //           return "jres:30250503"; //RC 30250503 : OK
                        //        }
                        //        else if (data.ResultOperation === Gordic.Uct.Interface.GEResultOperation.Warning)     // vyhovující doklad s upozorněním
                        //            return data.ResultMsg as any;
                        //        else if (data.ResultOperation === Gordic.Uct.Interface.GEResultOperation.Error)       // nevyhovující doklad
                        //            return data.ResultMsg as any;
                        //        else                                                                // žádný výsledek neexistuje
                        //            return "" as any;
                        //    }
                        //})
                        .addTextColumn({
                        name: "nks",
                        //sysColumn: true,
                        caption: Gordic.Consts.DbShortcuts.nks,
                        sortable: false,
                        width: 70,
                        editor: {
                            widget: "gselectbox",
                            options: [Gordic.Prefabs.Select.ekosnks(),
                                {
                                    name: "nks",
                                    itemTemplate: "{nks:trim:encode}",
                                    showSelectButton: false,
                                    //customClass: "gporizovacConfig",                      
                                    serverFilters: {
                                        ico: content.Globals.EkoParams?.ICO //content.datovaVeta.ico
                                    },
                                    model: "model.ico=value.ico,model.nks=value.nks",
                                    customClass: "js-NKS"
                                }]
                        }
                    })
                        //Gordic.Consts.DbShortcuts.uus
                        .addSortedEkoCfuSet(content, { isEditable: true }) //LK20170214_1, standardni pouziti cfu (eko sloupcu), this = instance gcontentu
                        .addCurrencyColumn({
                        name: "c0",
                        //structureLead:true,
                        caption: "jres:30250019", //RC 30250019 : MD
                        width: 110,
                        //customClass:"js-castka",
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            //start: alert("start MD"),
                            options: [
                                Gordic.Prefabs.Number.decimal(2, true), { name: "c0", customClass: "js-MD" /*, model: "model.c0=value",*/ }
                            ]
                        }
                    })
                        .addCurrencyColumn({
                        name: "c1",
                        caption: "jres:30250131", //RC 30250131 : Dal
                        width: 110,
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            options: [
                                Gordic.Prefabs.Number.decimal(2, true), { name: "c1", customClass: "js-DAL" /*,model: "model.c1=value", */ }
                            ]
                        }
                    });
                    if (content.UcetniDokladDto.Permissions.PermissionsZapis.PovoleniSmlouvy.visible) {
                        gridFormat.addTextColumn({
                            name: "smlouva",
                            caption: "jres:30250862", //RC 30250746 : Smlouva
                            width: 150,
                            fixedWidth: true,
                            sortable: false,
                            //customClass: "ui-disabled",
                        });
                    }
                    gridFormat.addTextColumn({
                        name: "popis",
                        caption: "jres:30250024", //RC 30250024 : Popis
                        width: 300,
                        sortable: false,
                        customClass: "js-popis",
                        editor: {
                            widget: "gstringbox",
                            options: [
                                { smartNavOnLength: 254 }
                            ]
                        }
                    });
                    if (content.Globals.EkoParams?.IsIssp) {
                        gridFormat.addNumberColumn({
                            name: "id_hdr_ris",
                            caption: "jres:30250134", //RC 30250134 : ID IISSP
                            sortable: false,
                            width: 300,
                        })
                            .addTextColumn({
                            name: "radek_hdr",
                            caption: "jres:30250135", //RC 30250135 : Řádek IISSP
                            width: 40,
                            fixedWidth: true,
                            sortable: false,
                            customClass: "ui-disabled"
                        })
                            .addTextColumn({
                            name: "priz_kur_roz",
                            caption: "jres:30250136", //RC 30250136 : KR
                            width: 300,
                            sortable: false,
                            customClass: "ui-disabled js-polkr",
                            cellTemplate: function (row) {
                                if (row.priz_kur_roz !== null) {
                                    var kr = Gordic.Uct.WebClient.Detail.GetTextKurzRozdilu(row.priz_kur_roz);
                                    return kr.kod;
                                }
                                return "";
                            },
                            tooltipTemplate: function (row) {
                                if (row.priz_kur_roz !== null) {
                                    var kr = Gordic.Uct.WebClient.Detail.GetTextKurzRozdilu(row.priz_kur_roz);
                                    return kr.name;
                                }
                                return "";
                            },
                        });
                    }
                    return gridFormat;
                }
                /**
                 * Vraci objekt gridu
                 * @param content
                 * @returns
                */
                GetGrid() {
                    let data = this.element.find(".ggrid.js-WizadrGrid");
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít)
                 */
                closing() {
                    this.content.ContentImport = null; // uvolneni obsahu
                    // může se zavřít vždy
                    return $.Deferred().resolve().promise();
                }
            };
            GUctOperaceImport = __decorate([
                gcontent
            ], GUctOperaceImport);
            WebClient.GUctOperaceImport = GUctOperaceImport;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdE9wZXJhY2VJbXBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVWN0T3BlcmFjZUltcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBczBCZjtBQXQwQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBczBCbkI7SUF0MEJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FzMEI3QjtRQXQwQm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DOzs7OztlQUtHO1lBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBQW5EOztvQkFFSSxRQUFHLEdBQUcsaUJBQWlCLENBQUM7b0JBZ0JoQixxQkFBZ0IsR0FBVyxFQUFFLENBQUM7b0JBSXRDLDhEQUE4RDtvQkFDdkQsaUJBQVksR0FBWSxLQUFLLENBQUM7b0JBRXJDOzs7Ozt1QkFLRztvQkFDSSxhQUFRLEdBQVcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBUXRDLHFCQUFnQixHQUFHLElBQUksQ0FBQztvQkFDaEMsMkVBQTJFO29CQUNuRSwwQkFBcUIsR0FBdUQsRUFBRSxDQUFDO29CQUMvRSxnQkFBVyxHQUFZLEtBQUssQ0FBQztnQkFpeEJ6QyxDQUFDO2dCQTl3Qkc7O21CQUVHO2dCQUNILGNBQWMsQ0FBQyxNQUFnTTtvQkFDM00sSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO29CQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7b0JBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO29CQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxR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QlksaUJBQWlCO2dCQUQ3QixRQUFRO2VBQ0ksaUJBQWlCLENBMnpCN0I7WUEzekJZLDJCQUFpQixvQkEyekI3QixDQUFBO1FBQ0wsQ0FBQyxFQXQwQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXMwQjdCO0lBQUQsQ0FBQyxFQXQwQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXMwQm5CO0FBQUQsQ0FBQyxFQXQwQlMsTUFBTSxLQUFOLE1BQU0sUUFzMEJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3QuV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVka29udGFjZVxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgVG9tYXMgS2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODAuMS4wLjIwXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdVY3RPcGVyYWNlSW1wb3J0IGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgR1BydXZvZGNlT3BlcmFjZSwgSUdDbGllbnRDb250ZW50IHtcclxuXHJcbiAgICAgICAgdWlkID0gXCJPcGVyYWNlSW1wb3J0ZSNcIjtcclxuICAgICAgICAvLyB2bGFzdG5vc3RpIHogQyNcclxuXHJcblxyXG4gICAgICAgIC8vIHN0YXR1cyBiYXJcclxuICAgICAgICAvL215U3RhdHVzQmFyOiBKUXVlcnk7XHJcbiAgICAgICAgLy8gR2xvYmFuaSBuYXN0YXZlbmlcclxuICAgICAgICBwdWJsaWMgR2xvYmFsU2V0dXA6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RHbG9iYWxEdG87XHJcbiAgICAgICAgcHVibGljIEdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RHbG9iYWxEdG87XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBzZSBzZXpuYW1lbVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy9wdWJsaWMgJGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICBwdWJsaWMgJG15R3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb250ZW50Q2xpcEJvYXJkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIC8vIGluc3RhbmNlIGRldGFpbHUgZG9rbGFkdVxyXG4gICAgICAgIHByaXZhdGUgY29udGVudDogRGV0YWlsLkdVY3REZXRhaWw7XHJcblxyXG4gICAgICAgIC8qKiBwxZnDrXpuYWsgw7pzcMSbxaFuw6lobyB1a29uxI1lbsOtICh0cnVlLXN1Y2Nlc3MsIGZhbHNlIC0gZmFpbCkgKi9cclxuICAgICAgICBwdWJsaWMgc3VjY2Vzc0Nsb3NlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICAgSW5zdGFuY2UgV2l6YXJkYSAgICAgICBcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICogUHJ1dm9kY2VcclxuICAgICAgICAgKiBAdHlwZSB7V2l6YXJkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBQcnV2b2RjZTogV2l6YXJkID0gbmV3IEdvcmRpYy5XaXphcmQoKTtcclxuXHJcbiAgICAgICAgLy8gdnN0dXBuaSBwYXJhbWV0cnlcclxuICAgICAgICB0eXBlOiBzdHJpbmc7IC8vIHR5cCBvcGVyYWNlXHJcbiAgICAgICAgaXhwOiBzdHJpbmc7ICAvLyBwaWQgZG9rbGFkdVxyXG4gICAgICAgIGRhdFptZW55OiBKc29uRGF0ZTsgLy8gZGF0dW0gcG9zbGVkbmkgem1lbnlcclxuICAgICAgICBpbmZvRmlsZTogR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HRmlsZUluZm9EdG87XHJcbiAgICAgICAgZ3JkRm9ybWF0OiBEYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdGRwZXBEdG8+OyAvLyBncmlkZm9ybWF0IG5hIHBvcml6b3ZhY2NlXHJcbiAgICAgICAgcHJpdmF0ZSBrb250cm9sYU5hUm96dnJoID0gdHJ1ZTsgXHJcbiAgICAgICAgLy8gdnlicmFuZSB6YXBpc3kgcHJvIGltcG9ydCAocHJlZCBzcHVzdGVuaW0gdmxhc3RuaWhvIGltcG9ydHUgZG8gZGF0YWJhemUpXHJcbiAgICAgICAgcHJpdmF0ZSBzZXpuYW1WeWJyYW55Y2haYXBpc3U6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pWeWJyYW55RG9rbGFkRHRvW10gfCBudWxsID0gW107XHJcbiAgICAgICAgcHJpdmF0ZSBlZGl0YWNuaU1vZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByZXBhcmVDb250ZW50KG9wdGlvbjogeyBjb250ZW50OiBEZXRhaWwuR1VjdERldGFpbCwgZ2xvYmFsczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdEdsb2JhbER0bywgdHlwZTogc3RyaW5nLCBpeHA6IHN0cmluZywgZGF0Wm1lbnk6IEpzb25EYXRlLCBncmRGb3JtYXQ6IERhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0ZHBlcER0bz4gfSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLkdsb2JhbHMgPSBvcHRpb24uZ2xvYmFscztcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gb3B0aW9uLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IG9wdGlvbi50eXBlO1xyXG4gICAgICAgICAgICB0aGlzLml4cCA9IG9wdGlvbi5peHA7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0Wm1lbnkgPSBvcHRpb24uZGF0Wm1lbnk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JkRm9ybWF0ID0gb3B0aW9uLmdyZEZvcm1hdDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LkNvbnRlbnRJbXBvcnQgPSB0aGlzOyAvLyB6YXJlZ2lzdHJvdmFuaSBvYnNhaHUgZG8gZGV0YWlsdVxyXG4gICAgICAgICAgICB0aGlzLm9uQ29udGVudFJlYWR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0WmtvbnRyb2x1ajogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA4MDVcIiwgLy9SQyAzMDI1MDgwNSA6IEtvbnRyb2xvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiS29udHJvbG92YXRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5Lb250cm9sb3ZhdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFpydXNpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvL2FjdEltcG9ydEJlektvbnRyb2w6IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA4NDVcIiwgLy9SQyAzMDI1MDg0NSA6IEltcG9ydCBiZXoga29udHJvbHkgcm96dnJodVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiYWN0SW1wb3J0QmV6S29udHJvbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmtvbnRyb2xhTmFSb3p2cmggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5QcnV2b2RjZS5zZXRTdGVwKDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL30pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFBvbG96a3lVbG96aXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblVsb3ppdCh7IGVuYWJsZWQ6IGZhbHNlLCBydW46ICgpID0+IHRoYXQuR2V0R3JpZCgpPy5nZ3JpZHJvd2VkaXRvcihcImNvbW1pdFwiKSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RQb2xvemt5WnJ1c2l0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXQoeyBlbmFibGVkOiBmYWxzZSwgcnVuOiAoKSA9PiB0aGF0LkdldEdyaWQoKT8uZ2dyaWRyb3dlZGl0b3IoXCJjYW5jZWxcIikgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UG9sb3preU9wcmF2aXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9wcmF2aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LkdldEdyaWQoKT8uZ2dyaWRyb3dlZGl0b3IoXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWRpdGFjbmlNb2QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UG9sb3preU9kc3RyYW5pdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2RzdHJhbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LkdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YTogSW50ZXJmYWNlLkdVY3RWeWJyYW55WmFwaXNEdG9bXSB8IG51bGwgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3MoZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBudWxsIHx8IGRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTM3XCIgLy9SQyAzMDI1MDEzNyA6IEluZm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBcImpyZXM6MzAyNTAzNDVcIiAvL1JDIDMwMjUwMzQ1IDogTmV2eWJyw6FueSDFvsOhZG7DqSB6w6FwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUFsbDogSW50ZXJmYWNlLkdVY3RWeWJyYW55WmFwaXNEdG9bXSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRBbGxSb3dzKGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFSZXN1bHQ6IEludGVyZmFjZS5HVWN0VnlicmFueVphcGlzRHRvW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBbGwuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhID0gZGF0YS5maW5kKCh4KSA9PiB4Lml4cCA9PT0gaXRlbS5peHAgJiYgeC5yYWRla196ID09PSBpdGVtLnJhZGVrX3opO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBhID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUmVzdWx0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcudXBkYXRlRGF0YShkYXRhUmVzdWx0KSA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZWRBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyBidXR0b24gemF2cml0XHJcbiAgICAgICAgICAgIGxldCB6cnVzaXRCdXR0b246IGFueSA9IHtcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDEwN1wiLCAvL1JDIDMwMjUwMTA3IDogWnJ1xaFpdFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WnJ1c2l0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlBydXZvZGNlLmNyZWF0ZShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0aGF0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDUxNlwiLCAvL1JDIDMwMjUwNTE2IDogSW1wb3J0XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTE3XCIsIC8vUkMgMzAyNTA1MTcgOiBaZHJvam92w6EgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW3pydXNpdEJ1dHRvbiBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5rb250cm9sYU5hUm96dnJoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlBydXZvZGNlLmVuYWJsZVN0ZXAoY250LCBbeyBlbmFibGVkOiB0cnVlLCBpbmRleDogMCB9LCB7IGVuYWJsZWQ6IHRydWUsIGluZGV4OiAxIH0sIHsgZW5hYmxlZDogZmFsc2UsIGluZGV4OiAyIH1dLCB7IGJhY2s6IHsgZW5hYmxlZDogdHJ1ZSB9LCBuZXh0OiB7IGVuYWJsZWQ6IHRydWUgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZnJtTmFzdGF2ZW5pSW1wb3J0XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItMTAtMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIiwgdGFiT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTmFzdGF2ZW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC50eXBlID09PSBcIklNUENMSVBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVXRpbHMucmVhZEZyb21DbGlwYm9hcmQoeyBwYXJlbnRDb250ZW50OiB0aGF0IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHJlc3VsdC50ZXh0ICE9PSBcInVuZGVmaW5lZFwiICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbnRlbnRDbGlwQm9hcmQgPSByZXN1bHQudGV4dCBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJ1dm9kY2Uuc2V0U3RlcCgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHJlc3VsdC5lcnJvck1lc3NhZ2UgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuc2hvd0ZsYXNoKHsgbGFiZWw6IHJlc3VsdC5lcnJvck1lc3NhZ2UsIHN0YXRlOiBcIndhcm5pbmdcIiwgdGltZXI6IDIwMDAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwODA4XCIsIHN0YXRlOiBcIndhcm5pbmdcIiwgdGltZXI6IDIwMDAgfSk7IC8vUkMgMzAyNTA4MDggOiBQcsOhemRuw70gb2JzYWggc2NocsOhbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3I6IEdFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZFJvdyhcImpyZXM6MzAyNTA1MjVcIikuYWRkRmllbGQoXCJnZmlsZWZpZWxkXCIsIC8vUkMgMzAyNTA1MjUgOiBWw71ixJtyIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVwbG9hZFRNUEZpbGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcImRvd25sb2FkRmllbGRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHRFeHRlbnNpb246IFwiLmNzdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJ3LUwtNCB3LVMtMTIgdy1NLTZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhGaWxlQ291bnQ6IDEsIC8vIHBvdXplIGplZGVuIHNvdWJvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZmllbGREb3dubG9hZGVyQ2xhc3M6IFwiR29yZGljLkRvY3VtZW50cy5XZWJDbGllbnQuR0Z0cENsaWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRlZDogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJqcmVzOjMwMjUwNTI2XCIuZm9ybWF0KG9iai5maWxlSW5mby5maWxlbmFtZSBhcyBhbnkpLCBcInN1Y2Nlc3NcIiwgXCJ4eFwiKSAvL1JDIDMwMjUwNTI2IDogU291Ym9yIHswfSBuYWhyw6FuLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKGNvbnRlbnREaXYpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZlcnJlZCBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmQ2xvc2UgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UudGFzay5uZXh0U3RlcCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC50eXBlID09PSBcIklNUENMSVBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LmNvbnRlbnRDbGlwQm9hcmQgPT09IFwidW5kZWZpbmVkXCIgfHwgdGhhdC5jb250ZW50Q2xpcEJvYXJkIS5sZW5ndGggPT0gMCB8fCB0aGF0LmNvbnRlbnRDbGlwQm9hcmQ9PVwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDUzN1wiKTsgLy9SQyAzMDI1MDUzNyA6IFByw6F6ZG7DvSBvYnNhaCBzY2hyw6Fua3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZDbG9zZS5yZWplY3QoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmQ2xvc2UucmVzb2x2ZSh0cnVlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY250LmZpbmRGaWVsZHMoXCJ1cGxvYWRUTVBGaWxlXCIpLmdmaWxlZmllbGQoXCJnZXRWYWx1ZUFzeW5jXCIpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwidW5kZWZpbmVkXCIgfHwgZGF0YS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDUyMFwiKSAvL1JDIDMwMjUwNTIwIDogTmVuw60gdnlicsOhbiDFvsOhZG7DvSBzb3Vib3IhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkNsb3NlLnJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mb0ZpbGUgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZDbG9zZS5yZXNvbHZlKHRydWUpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZDbG9zZS5yZWplY3QoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWZDbG9zZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmQ2xvc2UucmVqZWN0KGZhbHNlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA4MTBcIiwgLy9SQyAzMDI1MDgxMCA6IFbDvWLEm3IgesOhcGlzxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFt6cnVzaXRCdXR0b24vKiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FwdGlvbjp0aGF0LmFjdGlvbnMuYWN0SW1wb3J0QmV6S29udHJvbC5jYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEltcG9ydEJlektvbnRyb2xcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0qLyBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZEJhcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwODA5XCIsIC8vUkMgMzAyNTA4MDkgOiBJbXBvcnRvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBwcmV2aW91c2x5OiB7IGNhcHRpb246XCJqcmVzOjMwMjUwODUzXCIgfSAvL1JDIDMwMjUwODUzIDogWnDEm3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpwcmlzdHVwbmVuaSB0bGFjaXRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJ1dm9kY2UuZW5hYmxlU3RlcChjbnQsIFt7IGVuYWJsZWQ6IHRydWUsIGluZGV4OiAwIH0sIHsgZW5hYmxlZDogdHJ1ZSwgaW5kZXg6IDEgfSwgeyBlbmFibGVkOiB0cnVlLCBpbmRleDogMiB9XSwgeyBiYWNrOiB7IGVuYWJsZWQ6IHRydWUgfSwgbmV4dDogeyBlbmFibGVkOnRoaXMuaXNWYWxpZERhdGEoKSB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQua29udHJvbGFOYVJvenZyaCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmcm1JbXBOYXN0YXZlbmlcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMi0xMC0wLCBNLTEyLTEyLTAsIFMtMTItMTItMFwiLCB0YWJPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOYXN0YXZlbmlcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC5hZGRTZWN0aW9uKFwianJlczozMDI1MDg1MFwiKSAvL1JDIDMwMjUwODUwIDogSW1wb3J0IGJleiBrb250cm9seSBuYSByb3p2cmhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTA4NTRcIikuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyAvL1JDIDMwMjUwODU0IDogSW1wb3J0IGJleiBrb250cm9seSBuYSByb3p2cmhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaGtCZXpLb250cm9sdVJvenZyaHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiQmV6IGtvbnRyb2x5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiAgXCJiZXpLb250cm9seVJvenZyaHU9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JtSHRtbCA9ICQubmV3RGl2KCkuYXBwZW5kVG8oY29udGVudERpdikuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YWJSYWRreSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKGNvbnRlbnREaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTA4MTFcIiwgLy9SQyAzMDI1MDgxMSA6IFpkcm9qb3bDqSB6w6FwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJJRG1udUtvbnRyb2x1alwiLCBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3Raa29udHJvbHVqLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwiSURtbnVPcHJhdml0XCIsIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFBvbG96a3lPcHJhdml0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwiSURtbnVVbG96aXRcIiwgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UG9sb3preVVsb3ppdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIklEbW51WnJ1c2l0XCIsIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFBvbG96a3lacnVzaXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJJRG1udU9kc3RyYW5pdFwiLCBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQb2xvemt5T2RzdHJhbml0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmNyZWF0ZUdyaWQodGhhdC5wYXJlbnRDb250ZW50IGFzIGFueSwgdGFiUmFka3kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyB0ZXh0OiBcImpyZXM6MzAyNTA4NDRcIiB9KTsgLy9SQyAzMDI1MDg0NCA6IFDFmWlwcmF2dWppIGRhdGEuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3B1c3RpdEtvbnRyb2x1ID0gdGhhdCEuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5VY3QuQXBwU2V0dGluZ3MuVWN0U2V0dGluZ3NGb3JtLlBvbG96a3lJbXBvcnRLb250cm9sYVwiKT8/ZmFsc2UgYXMgYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC50eXBlID09PSBcIklNUENMSVBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5VY3REb2tsYWRaYXBpcy5wcmVwYXJlSW1wb3J0RnJvbUNsaXBib2FyZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZpZGl0ZWxuZVNsb3VwY2U6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5nZXRWaWRpdGVsbmVTbG91cGNlKHRoYXQuZ3JkRm9ybWF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qdGhhdC5nZXRWaWRpdGVsbmVTbG91cGNlKCkqLywgRGF0YVplU2NocmFua3k6IHRoYXQuY29udGVudENsaXBCb2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgUHJvdmVzdEtvbnRyb2x1OiBzcHVzdGl0S29udHJvbHUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogdGhpcy5kYXRabWVueSwgUGlkRG9rbGFkdTogdGhpcy5peHBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJldHVybkRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJldHVybkRhdGEuU2V6bmFtIGFzIGFueSwgeyBrZXk6IFwiaXhwLHJhZGVrX3pcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuR2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09PSBudWxsKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcInJlZnJlc2hSb3dzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJyZWZyZXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zdWNjZXNzQ2xvc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4gdGhhdC5lbmRPcGVyYXRpb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5VY3REb2tsYWRaYXBpcy5wcmVwYXJlSW1wb3J0RnJvbUZpbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmlsZUluZm86IHRoYXQuaW5mb0ZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmlkaXRlbG5lU2xvdXBjZTogR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLmdldFZpZGl0ZWxuZVNsb3VwY2UodGhhdC5ncmRGb3JtYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBQcm92ZXN0S29udHJvbHU6IHNwdXN0aXRLb250cm9sdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogdGhpcy5kYXRabWVueSwgUGlkRG9rbGFkdTogdGhpcy5peHBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJldHVybkRhdGE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pSZXN1bHRaYXBpc3lEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJldHVybkRhdGEuU2V6bmFtIGFzIGFueSwgeyBrZXk6IFwiaXhwLHJhZGVrX3pcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuR2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09PSBudWxsKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHRoYXQuZW5kT3BlcmF0aW9uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGNudCwgY29udGVudERpdiwgY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LkdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V6bmFtVnlicmFueWNoWmFwaXN1ID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPihncmlkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB2YWwgPSBjbnQuZmluZEZpZWxkcyhcImNoa0JlektvbnRyb2x1Um96dnJodVwiKS5nZmlsZWZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR0b0RhdGEgPSB7IGJlektvbnRyb2x5Um96dnJodTpmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC4vKmZpbmRGb3JtcyhcImZybU5hc3RhdmVuaUltcG9ydFwiKS4qL2ZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5rb250cm9sYU5hUm96dnJoID0gIWR0b0RhdGEuYmV6S29udHJvbHlSb3p2cmh1IGFzIGFueSBhcyBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuc2V6bmFtVnlicmFueWNoWmFwaXN1ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDMgLSB6b2JyYXplbsOtIHbDvXNsZWRrdSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQzN1wiLCAvL1JDIDMwMjUwNDM3IDogVsO9c2xlZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8genByaXN0dXBuZW5pIHRsYWNpdGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcnV2b2RjZS5lbmFibGVTdGVwKGNudCwgW3sgZW5hYmxlZDogZmFsc2UsIGluZGV4OiAwIH0sIHsgZW5hYmxlZDogdHJ1ZSwgaW5kZXg6IDEgfSwgeyBlbmFibGVkOiB0cnVlLCBpbmRleDogMiB9XSwgeyBiYWNrOiB7IGVuYWJsZWQ6IGZhbHNlIH0sIG5leHQ6IHsgZW5hYmxlZDogdHJ1ZSB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBodG1sID0gJC5uZXdEaXYoKS5hcHBlbmRUbyhjb250ZW50RGl2KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxLCBMLTItMTAtMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkU2VjdGlvbihcIlZ5YmVydGUgZG9rbGFkeSBrIHByb8O6xI10b3bDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlR3JpZCh0aGF0LnBhcmVudENvbnRlbnQgYXMgYW55LCBjb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5SdW4oaHRtbCwgY29udGVudERpdilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LnNob3dGbGFzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY29tcGxldGVNc2dcIiwgbGFiZWw6IFwianJlczozMDI1MDUyNFwiIC8vUkMgMzAyNTA1MjQgOiBJbXBvcnQgesOhcGlzxa8gZG9rb27EjWVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8sIGljb246IFwiZ2ktdGlja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgdGltZXI6IDUwMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHrDoXbEm3JlxI1uw70ga3Jva1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdWtvbsSNZW7DrSBwcsWvdm9kY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiVnlnZW5lcm92YXQgesOhcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRvb2x0aXA6IFwiVWtvbsSNZW7DrSBwcsWvdm9kY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZ3dpemFyZF9fYmFja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKGNudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAodGhhdCAhPT0gbnVsbCAmJiB0eXBlb2YgdGhhdC5zdWNjZXNzQ2xvc2UgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LnN1Y2Nlc3NDbG9zZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vIHVrb27EjWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGNudC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbGEgemRyb2pvdnljaCBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEtvbnRyb2xvdmF0KCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LkdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgbGV0IHJhZGt5ID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkdldEFsbFJvd3M8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG8+KGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJhZGt5ID09PSBcInVuZGVmaW5lZFwiIHx8IHJhZGt5Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcImpyZXM6MzAyNTA4MDZcIik7IC8vUkMgMzAyNTA4MDYgOiBOZW5hbGV6ZW55IHpkcm9qb3ZhIGRhdGEgcHJvIGtvbnRyb2x1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA4MDdcIik7IC8vUkMgMzAyNTA4MDcgOiBLb250cm9sdWppLi4uXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5VY3REb2tsYWRaYXBpcy52ZXJpZnlJbXBvcnREYXRhKHsgcnE6IHsgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogdGhpcy5kYXRabWVueSwgUGlkRG9rbGFkdTogdGhpcy5peHAsIFNlem5hbTogcmFka3kgfSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LkdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcudXBkYXRlRGF0YShyZXN1bHQuU2V6bmFtKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSkuXHJcbiAgICAgICAgICAgICAgICBhbHdheXMoKCkgPT4gdGhpcy5lbmRPcGVyYXRpb24oKSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNwdXN0ZW5pIHphdWN0b3ZhbmkgZG9rbGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5fSAkZ3JpZCBncmlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBSdW4oJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD4sIGNvbnRyb2xEaXY6IEpRdWVyeTxIVE1MRWxlbWVudD4pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LnNlem5hbVZ5YnJhbnljaFphcGlzdSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0aGF0LnNlem5hbVZ5YnJhbnljaFphcGlzdSA9PT0gbnVsbCB8fCB0aGF0LnNlem5hbVZ5YnJhbnljaFphcGlzdS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcImpyZXM6MzAyNTA4MThcIik7IC8vUkMgMzAyNTA4MTggOiBOZWJ5bHkgdnlicsOhbnkgxb7DoWRuw6kgZG9rbGFkeSBrIHByb8O6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwODE3XCIpOyAvL1JDIDMwMjUwODE3IDogUHJvYsOtaMOhIGltcG9ydFxyXG4gICAgICAgICAgICAvL3ZhciB2c3R1cDogR29yZGljLkVrby5JbnRlcmZhY2UuR1Zpc2libGVUYWJsZUNvbHVtbnNbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlVjdERva2xhZFphcGlzLmltcG9ydCh7IHJxOiB7IERhdHVtUG9zbGVkbmlabWVueURva2xhZHU6IHRoaXMuZGF0Wm1lbnksIFBpZERva2xhZHU6IHRoaXMuaXhwLCBTZXpuYW06IHRoYXQuc2V6bmFtVnlicmFueWNoWmFwaXN1LCBLb250cm9sb3ZhdE5hUm96dnJoOiB0aGF0LmtvbnRyb2xhTmFSb3p2cmggfSB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5nZXQoKSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXR1cm5EYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkID0gdGhhdC5jcmVhdGVHcmlkKHRoYXQucGFyZW50Q29udGVudCBhcyBEZXRhaWwuR1VjdERldGFpbCwgY29udHJvbERpdik7IC8vdGhhdC5jcmVhdGVHcmlkKGNvbnRyb2xEaXYsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJldHVybkRhdGEuU2V6bmFtIGFzIGFueSwgeyBrZXk6IFwiaXhwLHJhZGVrX3pcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuR2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnN1Y2Nlc3NDbG9zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkRhdGEuU2V6bmFtPy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLndpel9raW5kID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLlN1Y2Nlc3MpIHsgdGhhdC5zdWNjZXNzQ2xvc2UgPSB0cnVlOyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkRhdGE7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB0aGF0LmVuZE9wZXJhdGlvbigpKVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogIFxyXG4gICAgICAgICogIFZ5dHZvcmVuaSBncmlkdVxyXG4gICAgICAgICogIFxyXG4gICAgICAgICogY3JlYXRlR3JpZFxyXG4gICAgICAgICogXHJcbiAgICAgICAgKiBAcGFyYW0ge0pRdWVyeX0gY29udGVudFxyXG4gICAgICAgICogQHBhcmFtIHtib29sZWFufSBtdWx0aSAoZGVmYXVsdCA9IGZhbHNlKVxyXG4gICAgICAgICogQHBhcmFtIHtib29sZWFufSByZXN1bHQgKGRlZmF1bHQgPSBmYWxzZSkgLSB2eXNsZWRueSBncmlkXHJcbiAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5fVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKGNvbnRlbnQ6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5HVWN0RGV0YWlsLCBjb250ZW50RGl2OiBKUXVlcnkpOiBKUXVlcnkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQ9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIHZ5aGxlZGF2YWNpIHNsb3VwY2VcclxuICAgICAgICAgICAgLy9sZXQgc2VhcmNoQ29sdW1ucyA9IFtcImMwXCIsXCJjMVwiLFwicG9waXNcIl07XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmljZSBncmlkdVxyXG4gICAgICAgICAgICBsZXQgcm93bkdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD4gPSAkLm5ld0RpdihcImpzLVdpemFkckdyaWRcIikuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKS5hcHBlbmRUbyhjb250ZW50RGl2LmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJvd25HcmlkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gJChcIjxkaXYgY2xhc3M9J2pzLVdpemFkckdyaWQnPlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcImNhbGMoMTAwJSAtIFwiICsgJGZpbHRlckZvcm0uaGVpZ2h0KCkgKyBcInB4KVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgICAgICAvLy5hcHBlbmRUbyhjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIG11bHRpOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlZEFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgcm93c0NoZWNrZWQ6IFwid2l6X2NoZWNrXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zbG91cGNlLCBwb2RsZSBrdGVyeWNoIHNlIHZ5aGxlZGF2YSB2IHNlYXJjaGJveHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8sIHNlYXJjaENvbHVtbnM6IHNlYXJjaENvbHVtbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIERlZmluaWNlIHNsb3VwY3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBjb2x1bW5zOiB0aGlzLmNyZWF0ZUNvbHVtbnMoY29udGVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2dyaWRyb3dlZGl0b3I8SW50ZXJmYWNlLkdVY3RkcGVwRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93Q29weTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBqc2VtIHYgZWRpdGFjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lZGl0YWNuaU1vZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZWRBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93QmFyOiBHb3JkaWMuV2lkZ2V0LkdNYWdpY1ByZUZpbGxlci5idXR0b25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21taXQ6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVkaXRhY25pTW9kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZWRBY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVN0YXJ0OiBmdW5jdGlvbiAoZXYsIGluZm8pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmVkIGVkaXRhY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lZGl0YWNuaU1vZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGVkQWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmU6IGZ1bmN0aW9uIChkYXRhLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWRpdGFjbmlNb2QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlZEFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAvLz8/XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcm93bkdyaWQuZ2F1dG9maXQoKTtcclxuICAgICAgICAgICAgLy90aGlzLiRncmlkLnJlc2l6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGVuYWJsZWRBY3Rpb25cclxuICAgICAgICAqIFxyXG4gICAgICAgICogIFBvdm9sZW5pIGFrY2VcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlZEFjdGlvbigpIHtcclxuICAgICAgICAgICAgLy9sZXQgdGhhdCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3RlcCA9IHRoaXMuUHJ1dm9kY2UuZ2V0U3RlcCh0aGlzKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRTdGVwID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHJ1dm9kY2UuZW5hYmxlU3RlcCh0aGlzLCBbeyBlbmFibGVkOiB0cnVlLCBpbmRleDogMCB9LCB7IGVuYWJsZWQ6IHRydWUsIGluZGV4OiAxIH0sIHsgZW5hYmxlZDogZmFsc2UsIGluZGV4OiAyIH1dLCB7IGJhY2s6IHsgZW5hYmxlZDogdHJ1ZSB9LCBuZXh0OiB7IGVuYWJsZWQ6IHRoaXMuaXNWYWxpZERhdGEoKSB9IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBncmQgPSB0aGlzLkdldEdyaWQoKTtcclxuICAgICAgICAgICAgbGV0IHBvY2V0ID0gMDtcclxuICAgICAgICAgICAgaWYgKCBncmQgIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgcG9jZXQgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uQ2Vsa292eVBvY2V0UmFka3UoZ3JkKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFBvbG96a3lPcHJhdml0IS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogY3VycmVudFN0ZXAgPT0gMSAmJiBwb2NldCA+IDAgJiYgIXRoaXMuZWRpdGFjbmlNb2QsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiBjdXJyZW50U3RlcCA9PSAxLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFBvbG96a3lVbG96aXQhLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBjdXJyZW50U3RlcCA9PSAxICYmIHBvY2V0ID4gMCAmJiB0aGlzLmVkaXRhY25pTW9kLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogY3VycmVudFN0ZXAgPT0gMSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQb2xvemt5WnJ1c2l0IS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogY3VycmVudFN0ZXAgPT0gMSAmJiBwb2NldCA+IDAgJiYgdGhpcy5lZGl0YWNuaU1vZCxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IGN1cnJlbnRTdGVwID09IDEsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0UG9sb3preU9kc3RyYW5pdCEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGN1cnJlbnRTdGVwID09IDEgJiYgcG9jZXQgPiAwICYmICF0aGlzLmVkaXRhY25pTW9kLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogY3VycmVudFN0ZXAgPT0gMSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBWaWRpdGVsbmUgc2xvdXBjZSBuYSBncmlkdVxyXG4gICAgICAgIC8vICogXHJcbiAgICAgICAgLy8gKiBAcmV0dXJuc1xyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIGdldFZpZGl0ZWxuZVNsb3VwY2UoKTogR29yZGljLkVrby5JbnRlcmZhY2UuR1Zpc2libGVUYWJsZUNvbHVtbnNbXSB7XHJcbiAgICAgICAgLy8gICAgdmFyIHZzdHVwOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVmlzaWJsZVRhYmxlQ29sdW1uc1tdID0gW107XHJcbiAgICAgICAgLy8gICAgdGhpcy5ncmRGb3JtYXQuY29sdW1ucy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHZzdHVwLnB1c2goeyBIZWFkZXJUZXh0OiBpdGVtLmNhcHRpb24sIE5hbWU6IGl0ZW0ubmFtZSB9KTtcclxuICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAvLyAgICByZXR1cm4gdnN0dXA7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLyoqKlxyXG4gICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAqICBLb250cm9sYSBkYXQgcHJlZCB2bGFzdG5pIG9wZXJhY2lcclxuICAgICAgICAgICAgKiBcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGlzVmFsaWREYXRhKCk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICF0aGlzLmVkaXRhY25pTW9kO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuR2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGdyaWQgPT09IFwidW5kZWZpbmVkXCIgfHwgZ3JpZCA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IG96bmFjZW5lUmFka3kgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbnlEb2tsYWREdG8+KGdyaWQsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG96bmFjZW5lUmFka3kgPT09IFwidW5kZWZpbmVkXCIgfHwgb3puYWNlbmVSYWRreSA9PT0gbnVsbCB8fCBvem5hY2VuZVJhZGt5Lmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgb3puYWNlbmVSYWRreS5mb3JFYWNoKChyYWRlaywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyYWRlay5SZXN1bHRPcGVyYXRpb24gPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogY3JlYXRlQ29sdW1uc1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHVtbnMoY29udGVudDogR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLkdVY3REZXRhaWwpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeXNsZWRla1phcGlzeUR0bz4ge1xyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLmNyZWF0ZUdyaWRGb3JtYXQodGhpcy5jb250ZW50LHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC8vLmFkZEljb25Db2x1bW4oeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHbDvXNsZWRrb3bDqWhvIHNsb3VwY2UgZG8gZ3JpZHUgd2l6YXJkdVxyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJSZXN1bHRPcGVyYXRpb25cIiwgY2FwdGlvbjogXCJcIiwgd2lkdGg6IDQwLCAgICAgICAgICAgICAgICAgICAgICAvLyB2bGFzdG5vc3RpIHDFmWlkYW7DqWhvIHNsb3VwY2VcclxuICAgICAgICAgICAgICAgIC8vICAgIGhpZGRlbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzbG91cGVjIGRvIGdyaWR1IHRpbXUgSUNPTlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChkYXRhLlJlc3VsdE9wZXJhdGlvbiA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VSZXN1bHRPcGVyYXRpb24uU3VjY2VzcykgICAgICAgICAgLy8gdnlob3Z1asOtY8OtIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS1zdWNjZXNzIGctc3RhdGUtdGV4dFwiLCB0b29sdGlwOiBcImpyZXM6MzAyNTA1MDNcIiB9OyAvL1JDIDMwMjUwNTAzIDogT0tcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZWxzZSBpZiAoZGF0YS5SZXN1bHRPcGVyYXRpb24gPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLldhcm5pbmcpICAgICAvLyB2eWhvdnVqw61jw60gZG9rbGFkIHMgdXBvenJuxJtuw61tXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZmEtZXhjbGFtYXRpb24tdHJpYW5nbGUgZy1zdGF0ZS13YXJuaW5nIGctc3RhdGUtdGV4dFwiLCB0b29sdGlwOiBcImpyZXM6MzAyNTA0ODNcIiB9OyAvL1JDIDMwMjUwNDgzIDogRG9rbGFkIHMgdXBvem9ybsSbbsOtbVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGVsc2UgaWYgKGRhdGEuUmVzdWx0T3BlcmF0aW9uID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5FcnJvcikgICAgICAgLy8gbmV2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB7IGljb246IFwiZmEtdGltZXMtY2lyY2xlIGctc3RhdGUtZXJyb3IgZy1zdGF0ZS10ZXh0XCIsIHRvb2x0aXA6IFwianJlczozMDI1MDQ4NFwiIH07IC8vUkMgMzAyNTA0ODQgOiBOZXZ5aG92dWrDrWPDrSBkb2tsYWQgcHJvIGhyb21hZG5vdSBvcGVyYWNpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDFvsOhZG7DvSB2w71zbGVkZWsgbmVleGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4geyBpY29uOiBcIlwiLCB0ZXh0OiBcIlwiLCB0b29sdGlwOiBcIlwiIH0gYXMgYW55OyAgICAgICAgICAgICAgICAgICAgIC8vIG5ldXRyw6FsbsOtIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHbDvXNsZWRrb3bDqWhvIHNsb3VwY2UgZG8gZ3JpZHUgd2l6YXJkdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwid2l6X2tpbmRcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwODE1XCIsIHdpZHRoOiA0MCwgICAgICAgICAgICAgICAgICAgICAvL1JDIDMwMjUwODE1IDogS29udHJvbGFcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNsb3VwZWMgZG8gZ3JpZHUgdGltdSBJQ09OXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLndpel9raW5kID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5TdWNjZXNzKSAgICAgICAgICAvLyB2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXN1Y2Nlc3MgZy1zdGF0ZS10ZXh0XCIsIHRvb2x0aXA6IFwianJlczozMDI1MDUwM1wiIH07IC8vUkMgMzAyNTA1MDMgOiBPS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLndpel9raW5kID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5XYXJuaW5nKSAgICAgLy8gdnlob3Z1asOtY8OtIGRva2xhZCBzIHVwb3pybsSbbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsIHRvb2x0aXA6IFwianJlczozMDI1MDgxM1wiIH07IC8vUkMgMzAyNTA4MTMgOiDFmMOhZGVrIHMgdXBvem9ybsSbbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLndpel9raW5kID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5FcnJvcikgICAgICAgLy8gbmV2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0b29sdGlwOiBcImpyZXM6MzAyNTA4MTJcIiB9OyAvL1JDIDMwMjUwODEyIDogTmV2eWhvdnVqw61jw60gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIMW+w6FkbsO9IHbDvXNsZWRlayBuZWV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcIlwiLCB0ZXh0OiBcIlwiLCB0b29sdGlwOiBcIlwiIH0gYXMgYW55OyAgICAgICAgICAgICAgICAgICAgIC8vIG5ldXRyw6FsbsOtIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gdsO9c2xlZGtvdsOpaG8gc2xvdXBjZSBkbyBncmlkdSB3aXphcmR1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ3aXpfdHh0X2VyclwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA4MTRcIiwgd2lkdGg6IDE3MCwgICAgICAgICAgICAgICAgICAgICAgLy8gdmxhc3Rub3N0aSBwxZlpZGFuw6lobyBzbG91cGNlIC8vUkMgMzAyNTA4MTQgOiBLb250cm9sYSAtIHbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHbDvXNsZWRrb3bDqWhvIHNsb3VwY2UgZG8gZ3JpZHUgd2l6YXJkdVxyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJFcnJNc2dcIiwgY2FwdGlvbjogXCJWw71zbGVkZWtcIiwgd2lkdGg6IDE3MCwgICAgICAgICAgICAgICAgICAgICAgLy8gdmxhc3Rub3N0aSBwxZlpZGFuw6lobyBzbG91cGNlXHJcbiAgICAgICAgICAgICAgICAvLyAgICBoaWRkZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSwgbWV0YXJvdywgaW5mbykgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2xvdXBlYyBkbyBncmlkdSB0aW11IElDT05cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAoZGF0YS5SZXN1bHRPcGVyYXRpb24gPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLlN1Y2Nlc3MpICAgICAgICAgIC8vIHZ5aG92dWrDrWPDrSBkb2tsYWRcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgcmV0dXJuIFwianJlczozMDI1MDUwM1wiOyAvL1JDIDMwMjUwNTAzIDogT0tcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZWxzZSBpZiAoZGF0YS5SZXN1bHRPcGVyYXRpb24gPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLldhcm5pbmcpICAgICAvLyB2eWhvdnVqw61jw60gZG9rbGFkIHMgdXBvem9ybsSbbsOtbVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gZGF0YS5SZXN1bHRNc2cgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGVsc2UgaWYgKGRhdGEuUmVzdWx0T3BlcmF0aW9uID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5FcnJvcikgICAgICAgLy8gbmV2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBkYXRhLlJlc3VsdE1zZyBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDFvsOhZG7DvSB2w71zbGVkZWsgbmVleGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gXCJcIiBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9uYWtsYWRvdmUgc3RyZWRpc2tvXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3N5c0NvbHVtbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLm5rcyxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmtzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcImdwb3Jpem92YWNDb25maWdcIiwgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiBjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5JQ08vL2NvbnRlbnQuZGF0b3ZhVmV0YS5pY29cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289dmFsdWUuaWNvLG1vZGVsLm5rcz12YWx1ZS5ua3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjdXN0b21DbGFzczogXCJqcy1OS1NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL0dvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudXVzXHJcbiAgICAgICAgICAgICAgICAuYWRkU29ydGVkRWtvQ2Z1U2V0KGNvbnRlbnQsIHsgaXNFZGl0YWJsZTogdHJ1ZX0pICAgICAgIC8vTEsyMDE3MDIxNF8xLCBzdGFuZGFyZG5pIHBvdXppdGkgY2Z1IChla28gc2xvdXBjdSksIHRoaXMgPSBpbnN0YW5jZSBnY29udGVudHVcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgICAgLy9NRFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3N0cnVjdHVyZUxlYWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTlcIiwgLy9SQyAzMDI1MDAxOSA6IE1EXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOlwianMtY2FzdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3N0YXJ0OiBhbGVydChcInN0YXJ0IE1EXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5OdW1iZXIuZGVjaW1hbCgyLCB0cnVlKSwgeyBuYW1lOiBcImMwXCIsIGN1c3RvbUNsYXNzOiBcImpzLU1EXCIvKiwgbW9kZWw6IFwibW9kZWwuYzA9dmFsdWVcIiwqLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvLyBEQUxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTMxXCIsIC8vUkMgMzAyNTAxMzEgOiBEYWxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuTnVtYmVyLmRlY2ltYWwoMiwgdHJ1ZSksIHsgbmFtZTogXCJjMVwiLCBjdXN0b21DbGFzczogXCJqcy1EQUxcIi8qLG1vZGVsOiBcIm1vZGVsLmMxPXZhbHVlXCIsICovIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuVWNldG5pRG9rbGFkRHRvLlBlcm1pc3Npb25zLlBlcm1pc3Npb25zWmFwaXMuUG92b2xlbmlTbWxvdXZ5LnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbWxvdXZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwODYyXCIsIC8vUkMgMzAyNTA3NDYgOiBTbWxvdXZhXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcInVpLWRpc2FibGVkXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDI0XCIsIC8vUkMgMzAyNTAwMjQgOiBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLXBvcGlzXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc21hcnROYXZPbkxlbmd0aDogMjU0IH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb250ZW50Lkdsb2JhbHMuRWtvUGFyYW1zPy5Jc0lzc3ApIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2hkcl9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMzRcIiwgLy9SQyAzMDI1MDEzNCA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX2hkclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMzVcIiwgLy9SQyAzMDI1MDEzNSA6IMWYw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVpLWRpc2FibGVkXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X2t1cl9yb3pcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTM2XCIsIC8vUkMgMzAyNTAxMzYgOiBLUlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZCBqcy1wb2xrclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChyb3c6IEludGVyZmFjZS5HVWN0ZHBlcER0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5wcml6X2t1cl9yb3ogIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga3IgPSBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuR2V0VGV4dEt1cnpSb3pkaWx1KHJvdy5wcml6X2t1cl9yb3ogYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga3Iua29kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogZnVuY3Rpb24gKHJvdzogSW50ZXJmYWNlLkdVY3RkcGVwRHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LnByaXpfa3VyX3JveiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrciA9IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5HZXRUZXh0S3VyelJvemRpbHUocm93LnByaXpfa3VyX3JveiBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGdyaWR1XHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHVibGljIEdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5nZ3JpZC5qcy1XaXphZHJHcmlkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QsIGplc3RsaSBqZSBtb8W+bsOpIG9rbm8gemF2xZnDrXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxhbnk+fSBwcm9taXNlIChyZXNvbHZlID0gamUgbW/Fvm7DqSB6YXbFmcOtdCwgcmVqZWN0ID0gbmVuw60gbW/Fvm7DqSB6YXbFmcOtdClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuQ29udGVudEltcG9ydCA9IG51bGw7IC8vIHV2b2xuZW5pIG9ic2FodVxyXG4gICAgICAgICAgICAvLyBtxa/FvmUgc2UgemF2xZnDrXQgdsW+ZHlcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19