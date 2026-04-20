"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Import
             *
             * @author Tomas Kares
             * @since 480.1.0.20
             */
            let GRozOperaceImport = class GRozOperaceImport extends Gordic.GContentBase {
                constructor() {
                    //uid = "OperaceImportRows#";
                    // vlastnosti z C#
                    //title = "Ahoj";
                    super(...arguments);
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
                    // Akce
                    //myForm: GContent & GHromadneOperaceDialog;
                    //form: JQuery;
                    // vybrane zapisy pro import (pred spustenim vlastniho importu do databaze)
                    this.seznamVybranychZapisu = [];
                }
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    that.actions.addRange({
                        actZkontroluj: new GAction({
                            caption: "jres:30250404", //RC 30250404 : Kontrolovat
                            name: "KontrolovatAct",
                            run: function () {
                                this.setPending(that.Kontrolovat());
                            }
                        }),
                        actZrusit: Gordic.Eko.Action.actionZavrit({
                            run: () => {
                                this.tryClose();
                            }
                        }),
                    });
                    // button zavrit
                    let zrusitButton = {
                        caption: "jres:30250377", //RC 30250377 : Zrušit
                        action: that.actions.actZrusit
                    };
                    //// Akce na kontrolu
                    //let zkontrolujAct = new GAction({
                    //    caption: "jres:30250404", //RC 30250404 : Kontrolovat
                    //    name: "KontrolovatAct",
                    //    run: function(){
                    //        this.setPending(that.Kontrolovat());
                    //    }
                    //});
                    //var doplnujiciTlacitka: MenuParams[] = [zrusitButton, zrusitButton];
                    this.Pruvodce.create({
                        content: that
                    }, {
                        title: "jres:30250376", //RC 30250376 : Import
                        steps: [
                            {
                                caption: "jres:30250378", //RC 30250378 : Zdrojová data
                                buttons: [zrusitButton],
                                create: function (cnt, contentDiv, change) {
                                    //// definice okna
                                    that.Pruvodce.enableStep(cnt, [{ enabled: true, index: 0 }, { enabled: true, index: 1 }, { enabled: false, index: 2 }], { back: { enabled: true }, next: { enabled: true } });
                                    if (that.type === "IMPCLIP") {
                                        debugger;
                                        Gordic.Utils.readFromClipboard({ parentContent: that })
                                            .then(function (result) {
                                            debugger;
                                            if (typeof result !== "undefined" && typeof result.text !== "undefined" /*&& result.text != null && $.trim(result.text as string)!=""*/) {
                                                that.contentClipBoard = result.text;
                                                that.Pruvodce.setStep(1);
                                                return;
                                            }
                                            else {
                                                if (typeof result !== "undefined" && typeof result.errorMessage !== "undefined")
                                                    cnt.showFlash({ label: result.errorMessage, state: "warning", timer: 2000 });
                                                else
                                                    cnt.showFlash({ label: "jres:30250380", state: "warning", timer: 2000 }); //RC 30250380 : Prázdný obsah schránky
                                            }
                                        })
                                            .catch((error) => {
                                            debugger;
                                            throw error;
                                        });
                                    }
                                    else {
                                        var form = new Gordic.Forms.Form("L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0");
                                        form.addSection();
                                        form.addRow("jres:30250381").addField("gfilefield", //RC 30250381 : Výběr souboru
                                        {
                                            name: "uploadTMPFile",
                                            //customClass: "downloadField",
                                            acceptExtension: ".csv",
                                            itemWidth: "w-L-4 w-S-12 w-M-6",
                                            //fieldDownloaderClass: "Gordic.Documents.WebClient.GFtpClient",
                                            fileUploaded: function (ev, obj) {
                                                that.showFlash("jres:30250382".format(obj.fileInfo.filename), "success", "xx"); //RC 30250382 : Soubor {0} nahrán.
                                            }
                                        });
                                        $.newDiv().appendTo(contentDiv).gform("createFrom", form);
                                    }
                                },
                                change: function (cnt, contentDiv, change) {
                                    // deferred object
                                    let defClose = $.Deferred();
                                    debugger;
                                    if (change.task.nextStep === 1) {
                                        if (that.type === "IMPCLIP") {
                                            if (typeof that.contentClipBoard === "undefined" || that.contentClipBoard.length == 0 || that.contentClipBoard == "") {
                                                cnt.dialogs.warning("jres:30250383"); //RC 30250383 : Prázdný obsah schránky
                                                defClose.reject(false).promise();
                                                return;
                                            }
                                            return defClose.resolve(true).promise();
                                        }
                                        else {
                                            return cnt.findFields("uploadTMPFile").gfilefield("getValueAsync")
                                                .then(function (data) {
                                                console.log(data);
                                                debugger;
                                                if (typeof data === "undefined" || data.length == 0) {
                                                    cnt.dialogs.warning("jres:30250384"); //RC 30250384 : Není vybrán žádný soubor!
                                                    defClose.reject(false);
                                                }
                                                that.infoFile = data[0];
                                                return defClose.resolve(true).promise();
                                            }).catch(() => {
                                                defClose.reject(false).promise();
                                            });
                                        }
                                    }
                                    else {
                                        return defClose.reject(false).promise();
                                    }
                                }
                            },
                            {
                                caption: "jres:30250401", //RC 30250401 : Výběr zápisů
                                commandBar: {
                                    next: {
                                        caption: "jres:30250379", //RC 30250379 : Importovat
                                        icon: ""
                                        //icon: "gi-arrow"
                                    }
                                },
                                create: (cnt, contentDiv, change) => {
                                    // zpristupneni tlacitek
                                    that.Pruvodce.enableStep(cnt, [{ enabled: true, index: 0 }, { enabled: true, index: 1 }, { enabled: true, index: 2 }], { back: { enabled: true }, next: { enabled: this.isValidData() } });
                                    //let html = $.newDiv().appendTo(contentDiv).gform("createFrom", new Gordic.Forms.Form("L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0")
                                    //.addSection("Vyberte doklady k proúčtování")
                                    //);
                                    let tabRadky = $.newDiv()
                                        .appendTo(contentDiv)
                                        .gtab({
                                        title: "jres:30250405", //RC 30250405 : Zdrojové zápisy
                                        opened: true,
                                        locked: true,
                                        menuBar: [
                                            { id: "IDmnuKontroluj", action: that.actions.actZkontroluj, favorite: true },
                                        ]
                                    });
                                    that.$grid = that.createGrid(that.parentContent, tabRadky);
                                    if (that.type === "IMPCLIP") {
                                        that.isl.RozDokladZapis.prepareImportFromClipboard({ viditelneSloupce: that.getViditelneSloupce(), dataZeSchranky: that.contentClipBoard })
                                            .get()
                                            .then((returnData) => {
                                            let view = new Gordic.Data.View(returnData.Seznam, { key: "ixp,radek_z" });
                                            // nastavení dat a překreslení gridu
                                            that.$grid.ggrid("setData", view);
                                            that.$grid.ggrid("refreshRows");
                                            //that.successClose = true;
                                            return returnData;
                                        })
                                            .always(() => that.endOperation());
                                    }
                                    else {
                                        that.isl.RozDokladZapis.prepareImportFromFile({ fileInfo: that.infoFile, viditelneSloupce: that.getViditelneSloupce() })
                                            .get()
                                            //this.call("ImportFromFile", { fileInfo: that.infoFile, viditelneSloupce: vstup, datumPosledniZmeny: this.datZmeny, pidDokladu: this.ixp })
                                            .then((returnData) => {
                                            //that.$grid = that.createGrid(that.parentContent as Detail.GUctDetail, controlDiv); //that.createGrid(controlDiv, false);
                                            let view = new Gordic.Data.View(returnData.Seznam, { key: "ixp,radek_z" });
                                            // nastavení dat a překreslení gridu
                                            that.$grid.ggrid("setData", view);
                                            that.$grid.ggrid("refreshRows");
                                            //that.successClose = true;
                                            return returnData;
                                        })
                                            .always(() => that.endOperation());
                                    }
                                },
                                change: (cnt, contentDiv, change) => {
                                    if (typeof this.$grid === "undefined" || this.$grid === null)
                                        return;
                                    if (this.$grid.hasClass("ggrid"))
                                        that.seznamVybranychZapisu = Gordic.Eko.Grid.checkedRows(that.$grid, true);
                                    //else
                                    //    that.seznamVybranychZapisu = [];
                                }
                            },
                            {
                                // fáze 2 - zobrazení výsledku 
                                caption: "jres:30250385", //RC 30250385 : Výsledek
                                create: function (cnt, contentDiv, change) {
                                    // zpristupneni tlacitek
                                    that.Pruvodce.enableStep(cnt, [{ enabled: false, index: 0 }, { enabled: true, index: 1 }, { enabled: true, index: 2 }], { back: { enabled: false }, next: { enabled: true } });
                                    let html = $.newDiv().appendTo(contentDiv).gform("createFrom", new Gordic.Forms.Form("L1M1S1, L-2-10-0, M-12-12-0, S-12-12-0")
                                    //.addSection("Vyberte doklady k proúčtování")
                                    );
                                    that.$grid = that.createGrid(that.parentContent, contentDiv);
                                    that.Run(html, contentDiv)
                                        .then(() => cnt.showFlash({
                                        id: "completeMsg", label: "jres:30250386" //RC 30250386 : Import zápisů dokončen
                                        //, icon: "gi-tick"
                                        ,
                                        customClass: "g-state-success",
                                        timer: 5000
                                    }));
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
                    });
                }
                /**
                 * Viditelne sloupce na gridu
                 *
                 * @returns
                 */
                getViditelneSloupce() {
                    var vstup = [];
                    this.grdFormat.columns.forEach(function (item) {
                        vstup.push({ HeaderText: item.caption, Name: item.name });
                    });
                    return vstup;
                }
                /**
                 * Kontrola zdrojovych dat
                 *
                 *
                 */
                Kontrolovat() {
                    let radky = Gordic.Eko.WebClient.Common.GetAllRows(this.$grid);
                    if (typeof radky === "undefined" || radky.length === 0) {
                        throw new GError("jres:30250406"); //RC 30250406 : Nenalezany zdrojova data pro kontrolu
                    }
                    this.beginOperation("jres:30250407"); //RC 30250407 : Kontorluji...
                    return this.isl.RozDokladZapis.verifyImportData({ rq: { DatumPosledniZmenyDokladu: this.datZmeny, PidDokladu: this.ixp, Seznam: radky } })
                        .get()
                        .then((result) => {
                        let view = this.$grid.ggrid("getView");
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
                        that.dialogs.alert("jres:30250410"); //RC 30250410 : Nebyly vybrány žádné doklady k proúčtování
                        return $.Deferred().reject().promise();
                    }
                    debugger;
                    that.beginOperation("jres:30250387"); //RC 30250387 : Probíhá import
                    //var vstup: Gordic.Eko.Interface.GVisibleTableColumns[] = [];
                    return that.isl.RozDokladZapis.import({ rq: { DatumPosledniZmenyDokladu: this.datZmeny, PidDokladu: this.ixp, Seznam: that.seznamVybranychZapisu } })
                        .get()
                        //this.call("ImportFromClipboard", { viditelneSloupce: vstup, datumPosledniZmeny: this.datZmeny, pidDokladu: this.ixp, data: that.contentClipBoard })
                        .then((returnData) => {
                        //that.$grid = that.createGrid(that.parentContent as Detail.GUctDetail, controlDiv); //that.createGrid(controlDiv, false);
                        let view = new Gordic.Data.View(returnData.Seznam, { key: "ixp,radek_z" });
                        // nastavení dat a překreslení gridu
                        that.$grid.ggrid("setData", view);
                        that.$grid.ggrid("refreshRows");
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
                    //let searchColumns = ["c0", "c1", "popis"];
                    // definice gridu
                    let rownGrid = $.newDiv("js-WizadrGrid").appendTo(contentDiv);
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
                        }
                        // delegat pro zmenu stylu radku pri vykreslovani
                        //, rowsClass: rowsClass
                        //sloupce, podle kterych se vyhledava v searchboxu
                        //, searchColumns: searchColumns
                        //#region Definice sloupcu
                        ,
                        columns: this.createColumns(content),
                        rowsChecked: "wiz_check"
                    });
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
                }
                /***
                    *
                    *  Kontrola dat pred vlastni operaci
                    *
                    */
                isValidData() {
                    let result = true;
                    if (typeof this.$grid === "undefined" || this.$grid === null)
                        return false;
                    if (!this.$grid.hasClass("ggrid"))
                        return false;
                    let oznaceneRadky = Gordic.Eko.Grid.checkedRows(this.$grid, true);
                    if (typeof oznaceneRadky === "undefined" || oznaceneRadky === null || oznaceneRadky.length === 0)
                        return false;
                    oznaceneRadky.forEach((radek, index) => {
                        if (radek.ResultOperation === 400 /* Gordic.Uct.Interface.GEResultOperation.Error */) {
                            result = false;
                            return result;
                        }
                    });
                    return result;
                }
                /**
                 *  Definice sloupcu
                 * createColumns
                 *
                 * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GRozVybranyDokladDto>}
                 */
                createColumns(content) {
                    const that = this;
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addIconColumn({
                        name: "wiz_kind", caption: "jres:30250402", width: 40, // vlastnosti přidaného sloupce //RC 30250402 : Kontrola
                        hidden: false,
                        iconTemplate: function (data) {
                            if (data.wiz_kind === 200 /* Gordic.Uct.Interface.GEResultOperation.Success */) // vyhovující doklad
                                return { icon: "fa-check-circle g-state-success g-state-text", tooltip: "jres:30250389" }; //RC 30250389 : OK
                            else if (data.wiz_kind === 206 /* Gordic.Uct.Interface.GEResultOperation.Warning */) // vyhovující doklad s upozrněním
                                return { icon: "fa-exclamation-triangle g-state-warning g-state-text", tooltip: "jres:30250393" }; //RC 30250393 : Řádek s upozorněním
                            else if (data.wiz_kind === 400 /* Gordic.Uct.Interface.GEResultOperation.Error */) // nevyhovující doklad
                                return { icon: "fa-times-circle g-state-error g-state-text", tooltip: "jres:30250394" }; //RC 30250394 : Nevyhovující řádek
                            else // žádný výsledek neexistuje
                                return { icon: "", text: "", tooltip: "" }; // neutrální doklad
                        }
                    })
                        .addTextColumn({
                        name: "wiz_txt_err", caption: "jres:30250400", width: 170, // vlastnosti přidaného sloupce //RC 30250400 : Kontrola - výsledek
                    });
                    if (this.typPorizovace == 1 /* GRozTypPorizovace.VLZR */) {
                        gridFormat
                            .addNumberColumn({
                            name: "rok",
                            caption: "jres:30250360", //RC 30250360 : Rok
                            width: 110,
                        });
                    }
                    if (this.typPorizovace !== 2 /* GRozTypPorizovace.Rezervace */) {
                        gridFormat.addTextColumn({
                            name: "nks",
                            caption: Gordic.Consts.DbShortcuts.nks,
                            width: 80,
                            forced: true,
                        })
                            .addTextColumn({
                            name: "ucs",
                            caption: Gordic.Consts.DbShortcuts.ucs,
                            width: 70,
                            forced: true,
                        })
                            .addTextColumn({
                            name: "uus",
                            caption: Gordic.Consts.DbShortcuts.uus,
                            width: 70,
                            forced: true,
                        });
                    }
                    //Gordic.Consts.DbShortcuts.uus
                    gridFormat.addSortedEkoCfuSet(content, { isEditable: true }) //LK20170214_1, standardni pouziti cfu (eko sloupcu), this = instance gcontentu
                        .addCurrencyColumn({
                        name: "c0",
                        //structureLead:true,
                        caption: this.globals.DatabaseParams.NazevPoleC0,
                        width: 110,
                        //customClass:"js-castka",
                        sortable: false,
                        //editor: {
                        //    widget: "gnumberbox",
                        //    //start: alert("start MD"),
                        //    options: [
                        //        Gordic.Prefabs.Number.decimal(2, true), { name: "c0", customClass: "js-MD"/*, model: "model.c0=value",*/ }
                        //    ]
                        //}
                    })
                        .addCurrencyColumn({
                        name: "c1",
                        caption: this.globals.DatabaseParams.NazevPoleC1,
                        width: 110,
                        sortable: false,
                        //editor: {
                        //    widget: "gnumberbox",
                        //    options: [
                        //        Gordic.Prefabs.Number.decimal(2, true), { name: "c1", customClass: "js-DAL"/*,model: "model.c1=value", */ }
                        //    ]
                        //}
                    });
                    gridFormat.addTextColumn({
                        name: "popis",
                        caption: "jres:30250392", //RC 30250392 : Popis
                        width: 300,
                        sortable: false,
                        customClass: "js-popis",
                        //editor: {
                        //    widget: "gstringbox",
                        //    options: [
                        //        { smartNavOnLength: 254 }
                        //    ]
                        //}
                    });
                    if (that.typPorizovace === 0 /* GRozTypPorizovace.Standard */ && that.isRezervujeVIISSP) {
                        gridFormat.addTextColumn({
                            name: "id_hdr_ris",
                            caption: "jres:30250361", //RC 30250361 : ID IISSP
                            width: 70,
                            forced: true,
                        })
                            .addNumberColumn({
                            name: "radek_hdr_ris",
                            caption: "jres:30250362", //RC 30250362 : Řádek IISSP
                            width: 110,
                        })
                            .addNumberColumn({
                            name: "radek_hdr",
                            caption: "jres:30250363", //RC 30250363 :  Řádek GIN
                            width: 110,
                        });
                    }
                    return gridFormat;
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít)
                 */
                closing() {
                    // může se zavřít vždy
                    return $.Deferred().resolve(this.successClose).promise();
                }
            };
            GRozOperaceImport = __decorate([
                gcontent
            ], GRozOperaceImport);
            WebClient.GRozOperaceImport = GRozOperaceImport;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Jvek9wZXJhY2VJbXBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUm96T3BlcmFjZUltcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBcWxCZjtBQXJsQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcWxCbkI7SUFybEJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxbEI3QjtRQXJsQm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ25DOzs7OztlQUtHO1lBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBQW5EO29CQUVJLDZCQUE2QjtvQkFDN0Isa0JBQWtCO29CQUNsQixpQkFBaUI7O29CQVFULHFCQUFnQixHQUFXLEVBQUUsQ0FBQztvQkFVdEMsOERBQThEO29CQUN2RCxpQkFBWSxHQUFZLEtBQUssQ0FBQztvQkFFckM7Ozs7O3VCQUtHO29CQUNJLGFBQVEsR0FBVyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFVOUMsT0FBTztvQkFFUCw0Q0FBNEM7b0JBQzVDLGVBQWU7b0JBRWYsMkVBQTJFO29CQUNuRSwwQkFBcUIsR0FBcUQsRUFBRSxDQUFDO2dCQTRoQnpGLENBQUM7Z0JBMWhCRzs7bUJBRUc7Z0JBQ0ksY0FBYztvQkFFakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDakI7d0JBQ0ksYUFBYSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjs0QkFDckQsSUFBSSxFQUFFLGdCQUFnQjs0QkFDdEIsR0FBRyxFQUFFO2dDQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7NEJBQ3hDLENBQUM7eUJB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QUMsRUFybEJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFxbEI3QjtJQUFELENBQUMsRUFybEJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxbEJuQjtBQUFELENBQUMsRUFybEJTLE1BQU0sS0FBTixNQUFNLFFBcWxCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUm96LldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50OyAgICBcclxuICAgIC8qKlxyXG4gICAgICogSW1wb3J0XHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciBUb21hcyBLYXJlc1xyXG4gICAgICogQHNpbmNlIDQ4MC4xLjAuMjBcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Jvek9wZXJhY2VJbXBvcnQgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBHUHJ1dm9kY2VPcGVyYWNlIHtcclxuXHJcbiAgICAgICAgLy91aWQgPSBcIk9wZXJhY2VJbXBvcnRSb3dzI1wiO1xyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG4gICAgICAgIC8vdGl0bGUgPSBcIkFob2pcIjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBzZSBzZXpuYW1lbVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljICRncmlkOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY29udGVudENsaXBCb2FyZDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgLy8gRGF0b3Z5IG9iamVrdCBzIG9iZWNueW1pIGRhdHkgYXBsaWthY2VcclxuICAgICAgICBwcml2YXRlIGdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pHbG9iYWxzRHRvO1xyXG5cclxuICAgICAgICAvLyBSZXplcnZhY2UgdmUgc3RhdG5pIHBva2xhZG5lXHJcbiAgICAgICAgcHJpdmF0ZSBpc1JlemVydnVqZVZJSVNTUDogQm9vbGVhbjtcclxuICAgICAgICAvLyBUeXAgcG9yaXpvdmFjZVxyXG4gICAgICAgIHByaXZhdGUgdHlwUG9yaXpvdmFjZTogR1JvelR5cFBvcml6b3ZhY2U7XHJcblxyXG4gICAgICAgIC8qKiBwxZnDrXpuYWsgw7pzcMSbxaFuw6lobyB1a29uxI1lbsOtICh0cnVlLXN1Y2Nlc3MsIGZhbHNlIC0gZmFpbCkgKi9cclxuICAgICAgICBwdWJsaWMgc3VjY2Vzc0Nsb3NlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICAgSW5zdGFuY2UgV2l6YXJkYSAgICAgICBcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICogUHJ1dm9kY2VcclxuICAgICAgICAgKiBAdHlwZSB7V2l6YXJkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBQcnV2b2RjZTogV2l6YXJkID0gbmV3IEdvcmRpYy5XaXphcmQoKTtcclxuXHJcblxyXG4gICAgICAgIC8vIHZzdHVwbmkgcGFyYW1ldHJ5XHJcbiAgICAgICAgdHlwZTogc3RyaW5nOyAvLyB0eXAgb3BlcmFjZVxyXG4gICAgICAgIGl4cDogc3RyaW5nOyAgLy8gcGlkIGRva2xhZHVcclxuICAgICAgICBkYXRabWVueTogSnNvbkRhdGU7IC8vIGRhdHVtIHBvc2xlZG5pIHptZW55XHJcbiAgICAgICAgaW5mb0ZpbGU6IEdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR0ZpbGVJbmZvRHRvO1xyXG4gICAgICAgIGdyZEZvcm1hdDogRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pkcGVwRHRvPjsgLy8gZ3JpZGZvcm1hdCBuYSBwb3Jpem92YWNjZSAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIEFrY2VcclxuXHJcbiAgICAgICAgLy9teUZvcm06IEdDb250ZW50ICYgR0hyb21hZG5lT3BlcmFjZURpYWxvZztcclxuICAgICAgICAvL2Zvcm06IEpRdWVyeTtcclxuXHJcbiAgICAgICAgLy8gdnlicmFuZSB6YXBpc3kgcHJvIGltcG9ydCAocHJlZCBzcHVzdGVuaW0gdmxhc3RuaWhvIGltcG9ydHUgZG8gZGF0YWJhemUpXHJcbiAgICAgICAgcHJpdmF0ZSBzZXpuYW1WeWJyYW55Y2haYXBpc3U6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pWeWJyYW55RG9rbGFkRHRvW118bnVsbCA9IFtdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdFprb250cm9sdWo6IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDA0XCIsIC8vUkMgMzAyNTA0MDQgOiBLb250cm9sb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIktvbnRyb2xvdmF0QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuS29udHJvbG92YXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RacnVzaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIGJ1dHRvbiB6YXZyaXRcclxuICAgICAgICAgICAgbGV0IHpydXNpdEJ1dHRvbjogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzc3XCIsIC8vUkMgMzAyNTAzNzcgOiBacnXFoWl0XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RacnVzaXRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLy8vIEFrY2UgbmEga29udHJvbHVcclxuICAgICAgICAgICAgLy9sZXQgemtvbnRyb2x1akFjdCA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDA0XCIsIC8vUkMgMzAyNTA0MDQgOiBLb250cm9sb3ZhdFxyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcIktvbnRyb2xvdmF0QWN0XCIsXHJcbiAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LktvbnRyb2xvdmF0KCkpO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy92YXIgZG9wbG51amljaVRsYWNpdGthOiBNZW51UGFyYW1zW10gPSBbenJ1c2l0QnV0dG9uLCB6cnVzaXRCdXR0b25dO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QcnV2b2RjZS5jcmVhdGUoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGhhdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMzc2XCIsIC8vUkMgMzAyNTAzNzYgOiBJbXBvcnRcclxuICAgICAgICAgICAgICAgICAgICBzdGVwczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNzhcIiwgLy9SQyAzMDI1MDM3OCA6IFpkcm9qb3bDoSBkYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW3pydXNpdEJ1dHRvbl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vIGRlZmluaWNlIG9rbmFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcnV2b2RjZS5lbmFibGVTdGVwKGNudCwgW3sgZW5hYmxlZDogdHJ1ZSwgaW5kZXg6IDAgfSwgeyBlbmFibGVkOiB0cnVlLCBpbmRleDogMSB9LCB7IGVuYWJsZWQ6IGZhbHNlLCBpbmRleDogMiB9XSwgeyBiYWNrOiB7IGVuYWJsZWQ6IHRydWUgfSwgbmV4dDogeyBlbmFibGVkOiB0cnVlIH0gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnR5cGUgPT09IFwiSU1QQ0xJUFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVXRpbHMucmVhZEZyb21DbGlwYm9hcmQoeyBwYXJlbnRDb250ZW50OiB0aGF0IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHJlc3VsdC50ZXh0ICE9PSBcInVuZGVmaW5lZFwiIC8qJiYgcmVzdWx0LnRleHQgIT0gbnVsbCAmJiAkLnRyaW0ocmVzdWx0LnRleHQgYXMgc3RyaW5nKSE9XCJcIiovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY29udGVudENsaXBCb2FyZCA9IHJlc3VsdC50ZXh0IGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcnV2b2RjZS5zZXRTdGVwKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgcmVzdWx0LmVycm9yTWVzc2FnZSAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5zaG93Rmxhc2goeyBsYWJlbDogcmVzdWx0LmVycm9yTWVzc2FnZSwgc3RhdGU6IFwid2FybmluZ1wiLCB0aW1lcjogMjAwMCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAzODBcIiwgc3RhdGU6IFwid2FybmluZ1wiLCB0aW1lcjogMjAwMCB9KTsgLy9SQyAzMDI1MDM4MCA6IFByw6F6ZG7DvSBvYnNhaCBzY2hyw6Fua3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcjogR0Vycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzEsIEwtMi0xMC0wLCBNLTEyLTEyLTAsIFMtMTItMTItMFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJqcmVzOjMwMjUwMzgxXCIpLmFkZEZpZWxkKFwiZ2ZpbGVmaWVsZFwiLCAvL1JDIDMwMjUwMzgxIDogVsO9YsSbciBzb3Vib3J1XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBsb2FkVE1QRmlsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwiZG93bmxvYWRGaWVsZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdEV4dGVuc2lvbjogXCIuY3N2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcInctTC00IHctUy0xMiB3LU0tNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZmllbGREb3dubG9hZGVyQ2xhc3M6IFwiR29yZGljLkRvY3VtZW50cy5XZWJDbGllbnQuR0Z0cENsaWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRlZDogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJqcmVzOjMwMjUwMzgyXCIuZm9ybWF0KG9iai5maWxlSW5mby5maWxlbmFtZSBhcyBhbnkpLCBcInN1Y2Nlc3NcIiwgXCJ4eFwiKSAvL1JDIDMwMjUwMzgyIDogU291Ym9yIHswfSBuYWhyw6FuLlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyhjb250ZW50RGl2KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZlcnJlZCBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmQ2xvc2UgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UudGFzay5uZXh0U3RlcCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC50eXBlID09PSBcIklNUENMSVBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LmNvbnRlbnRDbGlwQm9hcmQgPT09IFwidW5kZWZpbmVkXCIgfHwgdGhhdC5jb250ZW50Q2xpcEJvYXJkIS5sZW5ndGggPT0gMCB8fCB0aGF0LmNvbnRlbnRDbGlwQm9hcmQgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOjMwMjUwMzgzXCIpOyAvL1JDIDMwMjUwMzgzIDogUHLDoXpkbsO9IG9ic2FoIHNjaHLDoW5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkNsb3NlLnJlamVjdChmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZDbG9zZS5yZXNvbHZlKHRydWUpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbnQuZmluZEZpZWxkcyhcInVwbG9hZFRNUEZpbGVcIikuZ2ZpbGVmaWVsZChcImdldFZhbHVlQXN5bmNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBkYXRhLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy53YXJuaW5nKFwianJlczozMDI1MDM4NFwiKSAvL1JDIDMwMjUwMzg0IDogTmVuw60gdnlicsOhbiDFvsOhZG7DvSBzb3Vib3IhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZDbG9zZS5yZWplY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5mb0ZpbGUgPSBkYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmQ2xvc2UucmVzb2x2ZSh0cnVlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQ2xvc2UucmVqZWN0KGZhbHNlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZkNsb3NlLnJlamVjdChmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDAxXCIsIC8vUkMgMzAyNTA0MDEgOiBWw71ixJtyIHrDoXBpc8WvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kQmFyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNzlcIiwgLy9SQyAzMDI1MDM3OSA6IEltcG9ydG92YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktYXJyb3dcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGU6IChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpwcmlzdHVwbmVuaSB0bGFjaXRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJ1dm9kY2UuZW5hYmxlU3RlcChjbnQsIFt7IGVuYWJsZWQ6IHRydWUsIGluZGV4OiAwIH0sIHsgZW5hYmxlZDogdHJ1ZSwgaW5kZXg6IDEgfSwgeyBlbmFibGVkOiB0cnVlLCBpbmRleDogMiB9XSwgeyBiYWNrOiB7IGVuYWJsZWQ6IHRydWUgfSwgbmV4dDogeyBlbmFibGVkOiB0aGlzLmlzVmFsaWREYXRhKCkgfSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgaHRtbCA9ICQubmV3RGl2KCkuYXBwZW5kVG8oY29udGVudERpdikuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMSwgTC0yLTEwLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oXCJWeWJlcnRlIGRva2xhZHkgayBwcm/DusSNdG92w6Fuw61cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhYlJhZGt5ID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oY29udGVudERpdilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDQwNVwiLCAvL1JDIDMwMjUwNDA1IDogWmRyb2pvdsOpIHrDoXBpc3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiBcIklEbW51S29udHJvbHVqXCIsIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFprb250cm9sdWosIGZhdm9yaXRlOiB0cnVlIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZCA9IHRoYXQuY3JlYXRlR3JpZCh0aGF0LnBhcmVudENvbnRlbnQgYXMgYW55LCB0YWJSYWRreSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQudHlwZSA9PT0gXCJJTVBDTElQXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUm96RG9rbGFkWmFwaXMucHJlcGFyZUltcG9ydEZyb21DbGlwYm9hcmQoeyB2aWRpdGVsbmVTbG91cGNlOiB0aGF0LmdldFZpZGl0ZWxuZVNsb3VwY2UoKSwgICBkYXRhWmVTY2hyYW5reTogdGhhdC5jb250ZW50Q2xpcEJvYXJkIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXR1cm5EYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhyZXR1cm5EYXRhLlNlem5hbSBhcyBhbnksIHsga2V5OiBcIml4cCxyYWRla196XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZChcInJlZnJlc2hSb3dzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zdWNjZXNzQ2xvc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4gdGhhdC5lbmRPcGVyYXRpb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Sb3pEb2tsYWRaYXBpcy5wcmVwYXJlSW1wb3J0RnJvbUZpbGUoeyBmaWxlSW5mbzogdGhhdC5pbmZvRmlsZSwgdmlkaXRlbG5lU2xvdXBjZTogdGhhdC5nZXRWaWRpdGVsbmVTbG91cGNlKCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmNhbGwoXCJJbXBvcnRGcm9tRmlsZVwiLCB7IGZpbGVJbmZvOiB0aGF0LmluZm9GaWxlLCB2aWRpdGVsbmVTbG91cGNlOiB2c3R1cCwgZGF0dW1Qb3NsZWRuaVptZW55OiB0aGlzLmRhdFptZW55LCBwaWREb2tsYWR1OiB0aGlzLml4cCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJldHVybkRhdGE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pSZXN1bHRaYXBpc3lEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGdyaWQgPSB0aGF0LmNyZWF0ZUdyaWQodGhhdC5wYXJlbnRDb250ZW50IGFzIERldGFpbC5HVWN0RGV0YWlsLCBjb250cm9sRGl2KTsgLy90aGF0LmNyZWF0ZUdyaWQoY29udHJvbERpdiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcocmV0dXJuRGF0YS5TZXpuYW0gYXMgYW55LCB7IGtleTogXCJpeHAscmFkZWtfelwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc3VjY2Vzc0Nsb3NlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHRoYXQuZW5kT3BlcmF0aW9uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGNudCwgY29udGVudERpdiwgY2hhbmdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLiRncmlkID09PSBcInVuZGVmaW5lZFwiIHx8IHRoaXMuJGdyaWQgPT09IG51bGwpIHJldHVybiA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuJGdyaWQuaGFzQ2xhc3MoXCJnZ3JpZFwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXpuYW1WeWJyYW55Y2haYXBpc3UgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvelZ5YnJhbnlEb2tsYWREdG8+KHRoYXQuJGdyaWQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuc2V6bmFtVnlicmFueWNoWmFwaXN1ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDIgLSB6b2JyYXplbsOtIHbDvXNsZWRrdSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM4NVwiLCAvL1JDIDMwMjUwMzg1IDogVsO9c2xlZGVrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoY250LCBjb250ZW50RGl2LCBjaGFuZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8genByaXN0dXBuZW5pIHRsYWNpdGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcnV2b2RjZS5lbmFibGVTdGVwKGNudCwgW3sgZW5hYmxlZDogZmFsc2UsIGluZGV4OiAwIH0sIHsgZW5hYmxlZDogdHJ1ZSwgaW5kZXg6IDEgfSwgeyBlbmFibGVkOiB0cnVlLCBpbmRleDogMiB9XSwgeyBiYWNrOiB7IGVuYWJsZWQ6IGZhbHNlIH0sIG5leHQ6IHsgZW5hYmxlZDogdHJ1ZSB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBodG1sID0gJC5uZXdEaXYoKS5hcHBlbmRUbyhjb250ZW50RGl2KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxLCBMLTItMTAtMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkU2VjdGlvbihcIlZ5YmVydGUgZG9rbGFkeSBrIHByb8O6xI10b3bDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZCA9IHRoYXQuY3JlYXRlR3JpZCh0aGF0LnBhcmVudENvbnRlbnQgYXMgYW55LCBjb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5SdW4oaHRtbCwgY29udGVudERpdilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5zaG93Rmxhc2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImNvbXBsZXRlTXNnXCIsIGxhYmVsOiBcImpyZXM6MzAyNTAzODZcIiAvL1JDIDMwMjUwMzg2IDogSW1wb3J0IHrDoXBpc8WvIGRva29uxI1lblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLCBpY29uOiBcImdpLXRpY2tcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1zdWNjZXNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHRpbWVyOiA1MDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGNudCwgY29udGVudERpdiwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gesOhdsSbcmXEjW7DvSBrcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChjbnQsIGNvbnRlbnREaXYsIGNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1a29uxI1lbsOtIHByxa92b2RjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmlkaXRlbG5lIHNsb3VwY2UgbmEgZ3JpZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0VmlkaXRlbG5lU2xvdXBjZSgpOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVmlzaWJsZVRhYmxlQ29sdW1uc1tdIHtcclxuICAgICAgICAgICAgdmFyIHZzdHVwOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVmlzaWJsZVRhYmxlQ29sdW1uc1tdID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZ3JkRm9ybWF0LmNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgdnN0dXAucHVzaCh7IEhlYWRlclRleHQ6IGl0ZW0uY2FwdGlvbiwgTmFtZTogaXRlbS5uYW1lIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHZzdHVwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbGEgemRyb2pvdnljaCBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEtvbnRyb2xvdmF0KCk6IEpRdWVyeVByb21pc2U8YW55PiAge1xyXG4gICAgICAgICAgICBsZXQgcmFka3kgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0QWxsUm93czxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96VnlicmFueURva2xhZER0bz4odGhpcy4kZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmFka3kgPT09IFwidW5kZWZpbmVkXCIgfHwgcmFka3kubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDI1MDQwNlwiKTsgLy9SQyAzMDI1MDQwNiA6IE5lbmFsZXphbnkgemRyb2pvdmEgZGF0YSBwcm8ga29udHJvbHVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDQwN1wiKTsgLy9SQyAzMDI1MDQwNyA6IEtvbnRvcmx1amkuLi5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlJvekRva2xhZFphcGlzLnZlcmlmeUltcG9ydERhdGEoeyBycTogeyBEYXR1bVBvc2xlZG5pWm1lbnlEb2tsYWR1OiB0aGlzLmRhdFptZW55LCBQaWREb2tsYWR1OiB0aGlzLml4cCwgU2V6bmFtOiByYWRreSB9IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcudXBkYXRlRGF0YShyZXN1bHQuU2V6bmFtKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSkuXHJcbiAgICAgICAgICAgICAgICBhbHdheXMoKCkgPT4gdGhpcy5lbmRPcGVyYXRpb24oKSApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBzcHVzdGVuaSB6YXVjdG92YW5pIGRva2xhZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeX0gJGdyaWQgZ3JpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUnVuKCRncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBjb250cm9sRGl2OiBKUXVlcnk8SFRNTEVsZW1lbnQ+KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhhdC5zZXpuYW1WeWJyYW55Y2haYXBpc3UgPT09IFwidW5kZWZpbmVkXCIgfHwgdGhhdC5zZXpuYW1WeWJyYW55Y2haYXBpc3U9PT1udWxsIHx8IHRoYXQuc2V6bmFtVnlicmFueWNoWmFwaXN1Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwianJlczozMDI1MDQxMFwiKTsgLy9SQyAzMDI1MDQxMCA6IE5lYnlseSB2eWJyw6FueSDFvsOhZG7DqSBkb2tsYWR5IGsgcHJvw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAzODdcIik7IC8vUkMgMzAyNTAzODcgOiBQcm9iw61ow6EgaW1wb3J0XHJcbiAgICAgICAgICAgIC8vdmFyIHZzdHVwOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVmlzaWJsZVRhYmxlQ29sdW1uc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuUm96RG9rbGFkWmFwaXMuaW1wb3J0KHsgcnE6IHsgRGF0dW1Qb3NsZWRuaVptZW55RG9rbGFkdTogdGhpcy5kYXRabWVueSwgUGlkRG9rbGFkdTogdGhpcy5peHAsIFNlem5hbTogdGhhdC5zZXpuYW1WeWJyYW55Y2haYXBpc3UgfSB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmNhbGwoXCJJbXBvcnRGcm9tQ2xpcGJvYXJkXCIsIHsgdmlkaXRlbG5lU2xvdXBjZTogdnN0dXAsIGRhdHVtUG9zbGVkbmlabWVueTogdGhpcy5kYXRabWVueSwgcGlkRG9rbGFkdTogdGhpcy5peHAsIGRhdGE6IHRoYXQuY29udGVudENsaXBCb2FyZCB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJldHVybkRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGdyaWQgPSB0aGF0LmNyZWF0ZUdyaWQodGhhdC5wYXJlbnRDb250ZW50IGFzIERldGFpbC5HVWN0RGV0YWlsLCBjb250cm9sRGl2KTsgLy90aGF0LmNyZWF0ZUdyaWQoY29udHJvbERpdiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcocmV0dXJuRGF0YS5TZXpuYW0gYXMgYW55LCB7IGtleTogXCJpeHAscmFkZWtfelwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnN1Y2Nlc3NDbG9zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkRhdGEuU2V6bmFtPy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLndpel9raW5kID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLlN1Y2Nlc3MpIHsgdGhhdC5zdWNjZXNzQ2xvc2UgPSB0cnVlO3JldHVybiA7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVybkRhdGE7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB0aGF0LmVuZE9wZXJhdGlvbigpKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqICBcclxuICAgICAgICAqICBWeXR2b3JlbmkgZ3JpZHVcclxuICAgICAgICAqICBcclxuICAgICAgICAqIGNyZWF0ZUdyaWRcclxuICAgICAgICAqIFxyXG4gICAgICAgICogQHBhcmFtIHtKUXVlcnl9IGNvbnRlbnRcclxuICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbXVsdGkgKGRlZmF1bHQgPSBmYWxzZSlcclxuICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVzdWx0IChkZWZhdWx0ID0gZmFsc2UpIC0gdnlzbGVkbnkgZ3JpZFxyXG4gICAgICAgICogQHJldHVybnMge0pRdWVyeX1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZUdyaWQoY29udGVudDogR29yZGljLlJvei5XZWJDbGllbnQuR0RldGFpbERva2xhZHVUYWIsIGNvbnRlbnREaXY6IEpRdWVyeSk6IEpRdWVyeSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIHZ5aGxlZGF2YWNpIHNsb3VwY2VcclxuICAgICAgICAgICAgLy9sZXQgc2VhcmNoQ29sdW1ucyA9IFtcImMwXCIsIFwiYzFcIiwgXCJwb3Bpc1wiXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIGdyaWR1XHJcbiAgICAgICAgICAgIGxldCByb3duR3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PiA9ICQubmV3RGl2KFwianMtV2l6YWRyR3JpZFwiKS5hcHBlbmRUbyhjb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgIHJvd25HcmlkXHJcbiAgICAgICAgICAgICAgICAvLyAkKFwiPGRpdiBjbGFzcz0nanMtV2l6YWRyR3JpZCc+XCIpXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCJjYWxjKDEwMCUgLSBcIiArICRmaWx0ZXJGb3JtLmhlaWdodCgpICsgXCJweClcIilcclxuICAgICAgICAgICAgICAgIC8vLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC8vLmFwcGVuZFRvKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICwgbXVsdGk6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAsIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlZEFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWxlZ2F0IHBybyB6bWVudSBzdHlsdSByYWRrdSBwcmkgdnlrcmVzbG92YW5pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIHJvd3NDbGFzczogcm93c0NsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zbG91cGNlLCBwb2RsZSBrdGVyeWNoIHNlIHZ5aGxlZGF2YSB2IHNlYXJjaGJveHVcclxuICAgICAgICAgICAgICAgICAgICAvLywgc2VhcmNoQ29sdW1uczogc2VhcmNoQ29sdW1uc1xyXG4gICAgICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICAgICAgICAgICAgLCBjb2x1bW5zOiB0aGlzLmNyZWF0ZUNvbHVtbnMoY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAsIHJvd3NDaGVja2VkOlwid2l6X2NoZWNrXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJvd25HcmlkLmdhdXRvZml0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy4kZ3JpZC5yZXNpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBlbmFibGVkQWN0aW9uXHJcbiAgICAgICAgKiBcclxuICAgICAgICAqICBQb3ZvbGVuaSBha2NlXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZWRBY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vbGV0IHRoYXQgPSBjb250ZW50O1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFN0ZXAgPSB0aGlzLlBydXZvZGNlLmdldFN0ZXAodGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RlcCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBydXZvZGNlLmVuYWJsZVN0ZXAodGhpcywgW3sgZW5hYmxlZDogdHJ1ZSwgaW5kZXg6IDAgfSwgeyBlbmFibGVkOiB0cnVlLCBpbmRleDogMSB9LCB7IGVuYWJsZWQ6IGZhbHNlLCBpbmRleDogMiB9XSwgeyBiYWNrOiB7IGVuYWJsZWQ6IHRydWUgfSwgbmV4dDogeyBlbmFibGVkOiB0aGlzLmlzVmFsaWREYXRhKCkgfSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKioqXHJcbiAgICAgICAgICAgICogXHJcbiAgICAgICAgICAgICogIEtvbnRyb2xhIGRhdCBwcmVkIHZsYXN0bmkgb3BlcmFjaVxyXG4gICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaXNWYWxpZERhdGEoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy4kZ3JpZCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLiRncmlkID09PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy4kZ3JpZC5oYXNDbGFzcyhcImdncmlkXCIpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBvem5hY2VuZVJhZGt5ID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvPih0aGlzLiRncmlkLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvem5hY2VuZVJhZGt5ID09PSBcInVuZGVmaW5lZFwiIHx8IG96bmFjZW5lUmFka3kgPT09IG51bGwgfHwgb3puYWNlbmVSYWRreS5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgb3puYWNlbmVSYWRreS5mb3JFYWNoKChyYWRlaywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyYWRlay5SZXN1bHRPcGVyYXRpb24gPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFUmVzdWx0T3BlcmF0aW9uLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgRGVmaW5pY2Ugc2xvdXBjdVxyXG4gICAgICAgICAqIGNyZWF0ZUNvbHVtbnNcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7R29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96VnlicmFueURva2xhZER0bz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb2x1bW5zKGNvbnRlbnQ6IEdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdEZXRhaWxEb2tsYWR1VGFiKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSB2w71zbGVka292w6lobyBzbG91cGNlIGRvIGdyaWR1IHdpemFyZHVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIndpel9raW5kXCIsIGNhcHRpb246IFwianJlczozMDI1MDQwMlwiLCB3aWR0aDogNDAsICAgICAgICAgICAgICAgICAgICAgIC8vIHZsYXN0bm9zdGkgcMWZaWRhbsOpaG8gc2xvdXBjZSAvL1JDIDMwMjUwNDAyIDogS29udHJvbGFcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNsb3VwZWMgZG8gZ3JpZHUgdGltdSBJQ09OXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLndpel9raW5kID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5TdWNjZXNzKSAgICAgICAgICAvLyB2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXN1Y2Nlc3MgZy1zdGF0ZS10ZXh0XCIsIHRvb2x0aXA6IFwianJlczozMDI1MDM4OVwiIH07IC8vUkMgMzAyNTAzODkgOiBPS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLndpel9raW5kID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5XYXJuaW5nKSAgICAgLy8gdnlob3Z1asOtY8OtIGRva2xhZCBzIHVwb3pybsSbbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsIHRvb2x0aXA6IFwianJlczozMDI1MDM5M1wiIH07IC8vUkMgMzAyNTAzOTMgOiDFmMOhZGVrIHMgdXBvem9ybsSbbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLndpel9raW5kID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVJlc3VsdE9wZXJhdGlvbi5FcnJvcikgICAgICAgLy8gbmV2eWhvdnVqw61jw60gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0b29sdGlwOiBcImpyZXM6MzAyNTAzOTRcIiB9OyAvL1JDIDMwMjUwMzk0IDogTmV2eWhvdnVqw61jw60gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIMW+w6FkbsO9IHbDvXNsZWRlayBuZWV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpY29uOiBcIlwiLCB0ZXh0OiBcIlwiLCB0b29sdGlwOiBcIlwiIH0gYXMgYW55OyAgICAgICAgICAgICAgICAgICAgIC8vIG5ldXRyw6FsbsOtIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gdsO9c2xlZGtvdsOpaG8gc2xvdXBjZSBkbyBncmlkdSB3aXphcmR1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ3aXpfdHh0X2VyclwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MDBcIiwgd2lkdGg6IDE3MCwgICAgICAgICAgICAgICAgICAgICAgLy8gdmxhc3Rub3N0aSBwxZlpZGFuw6lobyBzbG91cGNlIC8vUkMgMzAyNTA0MDAgOiBLb250cm9sYSAtIHbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cFBvcml6b3ZhY2UgPT0gR1JvelR5cFBvcml6b3ZhY2UuVkxaUikge1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2MFwiLCAvL1JDIDMwMjUwMzYwIDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBQb3Jpem92YWNlICE9PSBHUm96VHlwUG9yaXpvdmFjZS5SZXplcnZhY2UpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLm5rcyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgICAgICAgICBmb3JjZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9Hb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnV1c1xyXG4gICAgICAgICAgICAoZ3JpZEZvcm1hdCBhcyBhbnkpLmFkZFNvcnRlZEVrb0NmdVNldChjb250ZW50LCB7IGlzRWRpdGFibGU6IHRydWUgfSkgICAgICAgLy9MSzIwMTcwMjE0XzEsIHN0YW5kYXJkbmkgcG91eml0aSBjZnUgKGVrbyBzbG91cGN1KSwgdGhpcyA9IGluc3RhbmNlIGdjb250ZW50dVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvL01EXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc3RydWN0dXJlTGVhZDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuTmF6ZXZQb2xlQzAhLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczpcImpzLWNhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2VkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9zdGFydDogYWxlcnQoXCJzdGFydCBNRFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIEdvcmRpYy5QcmVmYWJzLk51bWJlci5kZWNpbWFsKDIsIHRydWUpLCB7IG5hbWU6IFwiYzBcIiwgY3VzdG9tQ2xhc3M6IFwianMtTURcIi8qLCBtb2RlbDogXCJtb2RlbC5jMD12YWx1ZVwiLCovIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvLyBEQUxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zIS5OYXpldlBvbGVDMSEsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9lZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgR29yZGljLlByZWZhYnMuTnVtYmVyLmRlY2ltYWwoMiwgdHJ1ZSksIHsgbmFtZTogXCJjMVwiLCBjdXN0b21DbGFzczogXCJqcy1EQUxcIi8qLG1vZGVsOiBcIm1vZGVsLmMxPXZhbHVlXCIsICovIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM5MlwiLCAvL1JDIDMwMjUwMzkyIDogUG9waXNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1wb3Bpc1wiLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWRnZXQ6IFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHsgc21hcnROYXZPbkxlbmd0aDogMjU0IH1cclxuICAgICAgICAgICAgICAgIC8vICAgIF1cclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC50eXBQb3Jpem92YWNlID09PSBHUm96VHlwUG9yaXpvdmFjZS5TdGFuZGFyZCAmJiB0aGF0LmlzUmV6ZXJ2dWplVklJU1NQKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfaGRyX3Jpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2MVwiLCAvL1JDIDMwMjUwMzYxIDogSUQgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHsgICAgICAgICAgICAgICAvL3Nsb3VwY2UgcHJpZGFuZSBwcmVkIGNmdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX2hkcl9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYyXCIsIC8vUkMgMzAyNTAzNjIgOiDFmMOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19oZHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYzXCIsIC8vUkMgMzAyNTAzNjMgOiAgxZjDoWRlayBHSU5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QsIGplc3RsaSBqZSBtb8W+bsOpIG9rbm8gemF2xZnDrXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxhbnk+fSBwcm9taXNlIChyZXNvbHZlID0gamUgbW/Fvm7DqSB6YXbFmcOtdCwgcmVqZWN0ID0gbmVuw60gbW/Fvm7DqSB6YXbFmcOtdClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gbcWvxb5lIHNlIHphdsWZw610IHbFvmR5XHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSh0aGlzLnN1Y2Nlc3NDbG9zZSkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==