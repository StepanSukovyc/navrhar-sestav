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
            var gcontent = Decorators.gcontent;
            let GRozGenerujPrislib = class GRozGenerujPrislib extends Gordic.GContentBase {
                constructor() {
                    //////////////////////////////////////////
                    //#region Atributy
                    //////////////////////////////////////////
                    super(...arguments);
                    // nutno nacist
                    this.needLoad = false;
                    // nazev te1
                    //private te1_nazev: string;
                    this.stylGridu = "js-seznamPrislib";
                    //logOptions = this.logOptions ?? {
                    //    name: 'GRozGenerujPrislib',
                    //    authorCode: 302,
                    //    fileName: 'Gordic.Eko.WebClient.GRozGenerujPrislib.ts'
                    //};;
                    this.loadingData = false;
                }
                //////////////////////////////////////////
                //#region Metoda onContentReady
                onContentReady() {
                    this.log.debug("Gordic.Roz.WebClient.GRozSeznamPrislib.onContentReady", this);
                    this.logOptions = this.logOptions ?? {
                        name: 'GRozGenerujPrislib',
                        authorCode: 302,
                        fileName: 'Gordic.Eko.WebClient.GRozGenerujPrislib.ts'
                    };
                    ;
                    // This se neustale meni dle objektu. Zde si tedy ulozim odkaz na cely Content
                    const that = this;
                    // pocatecni inicializace aributu
                    this.needLoad = false;
                    this.loadingData = false;
                    // Vytvoreni akci
                    this.createActions();
                    // Vytvoreni formulare
                    if (!this.opravnyPrislib)
                        this.createForm();
                    this.menuBar([
                        { action: this.actions.actObcerstvit, favorite: true },
                        { action: this.actions.actGenerovat, favorite: true }
                    ]);
                    // Pridani filtrovaciho panelu
                    //that.createFilterPanel(that);
                    // Vytvoreni gridu a naplneni objektu nactenymi daty
                    that.createGrid();
                    // načtení dat do gridu
                    //that.pristupnostAkciSeznamu();   
                    // úvodní rozbor přístupnosti tlačítek a akcí na seznamu
                    //if (that.needLoad)
                    //    that.actions!.actObcerstvit!.run();
                    //else
                    that.pristupnostAkci();
                    if (that.opravnyPrislib)
                        that.actions.actObcerstvit.run();
                }
                //#endregion
                //////////////////////////////////////////
                /**
                 * Vytvoreni akci
                 *
                 */
                createActions() {
                    let that = this;
                    this.actions.addRange({
                        actObcerstvit: Gordic.Eko.Action.actionObcerstvit({
                            enabled: true,
                            caption: "jres:30250462", //RC 30250462 : Načíst
                            run: function (ev, ctx) {
                                //this.setPending(that.loadData());
                                if (that.closed)
                                    return;
                                var grid = that.getGrid();
                                if (grid === null)
                                    return;
                                let view = that.getGrid().ggrid("getView");
                                view.requestData();
                            }
                        }),
                        actGenerovat: {
                            name: "actGenerovat",
                            caption: "jres:30250461", //RC 30250461 : Generovat
                            run: function (ev, ctx) {
                                this.setPending(that.generujZapisyDokladu());
                            }
                        },
                    });
                }
                /**
                 * Generovani rozpoctovych zapisu
                 *
                 *
                 */
                generujZapisyDokladu() {
                    let grid = this.getGrid();
                    if (grid === null)
                        return $.Deferred().resolve().promise();
                    // nacteni zapisu pro ukladani
                    let data = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                    let that = this;
                    that.beginOperation("jres:30250463"); //RC 30250463 : Probíhá generování...
                    return this.isl.RozPrislib.generovatZapisy({ hlavickaDokladu: this.dokladHead, dataProGenerovani: data })
                        .get()
                        .then(() => {
                        that.needLoad = true;
                        that.tryClose();
                        return;
                    }).
                        catch((ex) => {
                        throw ex;
                    })
                        .always(() => that.endOperation());
                }
                /**
                 * Vytvoreni formulare
                 */
                createForm() {
                    let that = this;
                    let gf = new Gordic.Data.GridFormat().addTextColumn({
                        name: "code", caption: "jres:30250467" //RC 30250467 : Kód
                    }).addTextColumn({ name: "nazev", caption: "jres:30250468" }); //RC 30250468 : Název
                    //let reader = new Gordic.Data.Readers.Rozvrh()
                    var form = new Gordic.Forms.Form({
                        name: "formDetail", layoutDescriptor: "L3M2S1, L-2-10-0, M-4-8-0, S-12-12-0"
                    })
                        .addSection()
                        //Gordic.Prefabs.Select.uctdroz()
                        .addRow({ label: Gordic.Consts.DbShortcuts.nks }).addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), {
                        name: "nks",
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            ico: that.dokladHead?.ico,
                            vazbaUcsNaEkovnks: that.dokladHead?.ucs,
                            rok_od: "<= " + that.dokladHead?.rok,
                            rok_do: ">= " + that.dokladHead?.rok,
                            aktivita: 100,
                            vazbaNksNaFunkci: that.globals.DatabaseParams.VazbaNksNaFunkci ? that.globals.SessionParams.IxsFun : void 0,
                        },
                        model: "model.ico=>value.ico,model.nks=value.nks",
                    })
                        .addSection()
                        .addRow({ label: this.ueb_zkratka })
                        .addField("gselectbox", Gordic.Prefabs.Select.rozvrh(), {
                        name: "ueb",
                        validators: [new Gordic.Validators.Required()],
                        //data: reader,
                        serverFilters: {
                            NapovedaColumn: "ueb",
                            uea: "223",
                            aktivita_roz: 100,
                            prislib: true,
                            ktg_typ: this.dokladHead.ktg_typ,
                            ixs_roz: this.globals.EkoParams?.IxsRoz,
                        },
                        helperColumns: ["code", "nazev"], // podle toho se může hledat v autocomplete
                        helperItemTemplate: "{code:trim:encode} - {nazev:trim:encode}", //jak vypadá položka v autocomplete
                        selectorFormat: gf,
                        itemTemplate: "{code:trim:encode}"
                    });
                    if (this.dokladHead.ktg_typ == 1136 /* Gordic.Eko.Interface.GEKategorieDokladu.IndividualniPrislib */)
                        form.addSection()
                            .addRow({ label: this.te1_zkratka })
                            .addField("gselectbox", Gordic.Prefabs.Select.rozvrh(), {
                            name: "te1",
                            validators: [new Gordic.Validators.Required()],
                            //data: reader,
                            serverFilters: {
                                NapovedaColumn: "te1",
                                uea: "223",
                                aktivita_roz: 100,
                                ktg_typ: this.dokladHead.ktg_typ,
                                prislib: true,
                                ueb: () => { return this.findFields("ueb").gfield("getValue")?.code; }, // hodnota z ueb
                                ixs_roz: this.globals.EkoParams?.IxsRoz
                            },
                            selectorFormat: gf,
                            helperColumns: ["code", "nazev"],
                            helperItemTemplate: "{code:trim:encode} - {nazev:trim:encode}",
                            itemTemplate: "{code:trim:encode}"
                        });
                    var tabHead = $.newDiv()
                        .appendTo(this.element);
                    // pro validatory ze serveru
                    this.defaultForm = this.element; //tabHead;
                    form.appendTo(tabHead);
                    // prednastaveni hodnoty nks
                    debugger;
                    this.findFields("nks").gfield("setValue", {
                        nks: this.dokladHead.nks, ico: this.dokladHead.ico,
                        rok: this.dokladHead.rok
                    }, false);
                }
                //////////////////////////////////////////
                //#region Metoda createGrid
                createGrid() {
                    this.log.debug("Gordic.Roz.WebClient.GRozSeznamPrislib.createGrid", this);
                    const that = this;
                    let gridView = new Gordic.Data.View([], {
                        //key: "id",
                        processors: {
                            provider: new Gordic.Data.Provider((req, re) => {
                                return that.loadData();
                            }),
                            //    tree: new Gordic.Data.Tree<kontaceData, any>(Gordic.Data.Tree.parentIdOrganizer("id_parent"), { filterKeepStructure: true, defaultState: "closed" }),
                            //error: new Gordic.Data.ErrorProcessor<Gordic.Uct.Interface.GRozaaatPrislibDto>((row,metaRow) => {
                            //    debugger;
                            //    // pokud se nacita, nevaliduji
                            //    if (this.loading)
                            //        return [{ stopping:true }] as Validators.GridError[];
                            //    if (typeof row === "undefined" || typeof row.kc1_nova === "undefined" || row.kc1_nova == null)
                            //        return [{ columnName: "kc1_nova", row: 0 }] as Validators.GridError[];                               
                            //    if (typeof row.kc1_puvodni === "undefined" || row.kc1_puvodni == null)
                            //        return [] as Validators.GridError[];
                            //    let puvodni = parseDecimal(row.kc1_puvodni);
                            //    let nova = parseDecimal(row.kc1_nova);
                            //    if (nova.lessThanOrEqualTo(0) || nova.greaterThan(puvodni))
                            //        return [{
                            //            columnName: "kc1_nova", row: 0, message: "jres:30250464" //RC 30250464 : Hodnota musí být v rozsahu >0 a <={0}
                            //                .format(Gordic.Templates.Formatters.number(puvodni, "C"))
                            //        }] as Validators.GridError[];
                            //    return [] as Validators.GridError[];
                            //})
                        }
                    });
                    // Podmineny format
                    let condFormat = void 0;
                    condFormat = [
                        {
                            description: "jres:30250469", //RC 30250469 : Změna hodnoty
                            formula: "@kc1_puvodni>@kc1_nova and @kc1_nova>0",
                            bg: Gordic.Components.Grid.CondFormats.CondFormatBg.green,
                            applyTo: "kc1_nova"
                        },
                        {
                            description: "jres:30250470", //RC 30250470 : Chybná hodnota
                            formula: "@kc1_nova<0 or @kc1_nova>@kc1_puvodni",
                            bg: Gordic.Components.Grid.CondFormats.CondFormatBg.red,
                            applyTo: "kc1_nova"
                        },
                    ];
                    // Grid si ulozim do modularni promenne, abych se na nej nemusel vsude odkazovat
                    that.$grid = $("<div class='{0}'>".format(this.stylGridu)) // Vytvor div pro grid
                        //                .css("height", "calc(100% - " + $filterForm.height() + "px)") // nastav mu vysku
                        .css("height", "100%")
                        .appendTo(this.element) // vloz grid do this.element
                        .ggrid({
                        //#region ColumnMode - typ zobrazeni gridu
                        columnMode: "fit", // absolutni sirky sloupcu (default fit - responzivni) / full
                        //#endregion
                        //#region Multi - moznost vyberu vice radku
                        multi: false,
                        //#endregion
                        data: gridView,
                        //#region defaultAction - nastavení DEFAULT akce pro DVOJKLIK na gridu nebo ENTER
                        defaultAction: that.actions.actDetail,
                        //#endregion
                        //#region searchColumns - sloupce, podle kterých se vyhledává v searchboxu                    
                        //#endregion
                        // #region GridFormat
                        columns: that.createGridFormat(this.opravnyPrislib),
                        // #endregion
                        defaultProfile: { condFormats: condFormat },
                        // zmena aktivniho radku
                    })
                        .ggridcelleditor({
                        //allowCopy: true,
                        beforeStart: function (ev, obj) {
                            // znepristupeni gridu, pokud se nema editovat
                            //return DetailPredkontaceMethod.IsPrivate(that, that.PredkontaceDto.Hlavicka!.ixs_fun);
                        },
                        change: function (ev, obj) {
                        },
                        start: function (ev, obj) { }
                    }).gautofit();
                    ;
                }
                //#endregion
                //////////////////////////////////////////
                /**
                 * Vytovreni gridformatu
                 *
                 */
                createGridFormat(zobrazitNS) {
                    let grdFormat = new Gordic.Data.GridFormat();
                    let dataSentence = $.extend(this["dataSentence"], {
                        sentenceType: 50 /* Gordic.Eko.Interface.TypVetyEnum.Rozpoctova */, rok: this.globals.EkoParams?.Rok,
                        drd: 0,
                        ixsRoz: this.globals.EkoParams?.IxsRoz
                    });
                    const that = this;
                    let validace = new Gordic.Validators.Base({
                        validate(value, source) {
                            let content = $.content(source);
                            var grid = that.getGrid();
                            if (grid === null)
                                return true;
                            let currentRow = grid.ggrid("getSelection")[0];
                            debugger;
                            const puvodni = parseDecimal(currentRow.kc1_puvodni);
                            if (value == null) {
                                this.errorType = "warning";
                                this.message = "jres:30250472"; //RC 30250472 : Hodnota musí být vyplněná
                                this.stopping = false;
                                //this.group = "warning"
                                return false;
                            }
                            if (puvodni !== null && value.greaterThan(puvodni)) {
                                this.errorType = "error";
                                this.message = "jres:30250473".format(Gordic.Templates.Formatters.number(puvodni, "C")); //RC 30250473 : Hodnota musí být menší než {0}
                                this.stopping = true;
                                //this.group = "warning"
                                return false;
                            }
                            if (!puvodni.greaterThan(0)) {
                                this.errorType = "warning";
                                this.message = "jres:30250471"; //RC 30250471 : Hodnota musí být menší větší než 0
                                this.stopping = false;
                                //this.group = "warning"
                                return false;
                            }
                            return true;
                        }
                    });
                    if (zobrazitNS)
                        grdFormat.addTextColumn({
                            name: "nks",
                            caption: Gordic.Consts.DbShortcuts.nks,
                            width: 80,
                            forced: true,
                        });
                    grdFormat.addSortedEkoCfuSet(this, {
                        isEditable: false,
                        dataSentence: dataSentence,
                    })
                        .addCurrencyColumn({
                        name: "kc1_puvodni",
                        //structureLead:true,
                        caption: "jres:30250453", //RC 30250453 : Původní hodnota
                        width: 110,
                        sortable: false,
                    })
                        .addCurrencyColumn({
                        name: "kc1_nova",
                        //structureLead:true,
                        caption: "jres:30250454", //RC 30250454 : Nová hodnota
                        width: 110,
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            options: [
                                Gordic.Prefabs.Number.currency(),
                                {
                                    name: "kc1_nova",
                                    validators: [validace, new Gordic.Validators.Required(), new Gordic.Validators.Range({ min: 0, message: "jres:30250465" } //RC 30250465 : Hodnota nesmí být menší než 0
                                        )],
                                }
                            ]
                        }
                    });
                    return grdFormat;
                }
                //////////////////////////////////////////
                //#region Metoda pristupnostAkci
                pristupnostAkci() {
                    this.log.debug("Gordic.Roz.WebClient.GRozSeznamPrislib.pristupnostAkciSeznamu", this);
                    let pocetZapisu = 0;
                    let grid = this.getGrid();
                    if (grid != null)
                        pocetZapisu = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid);
                    this.actions.actGenerovat?.update({ enabled: pocetZapisu > 0 });
                    return;
                }
                ;
                /**
                 * Zadana akce
                 * @returns
                 */
                getAkce() {
                    let value = this.findFields("te1").gfield("getValue");
                    if (value !== null)
                        if (typeof value.code !== "undefined" && value.code !== null)
                            return value.code.trim();
                    //return "737373737373737";
                    return "";
                }
                /**
                 * Zadane Au
                 * @returns
                 */
                getAu() {
                    let value = this.findFields("ueb").gfield("getValue");
                    if (value)
                        if (typeof value.code !== "undefined" && value.code !== null)
                            return value.code.trim();
                    return "";
                }
                /**
                 * Zanane nakladove stredisko
                 * @returns
                 */
                getNKS() {
                    //
                    //let a: string = "";
                    //a.trim()
                    let value = this.findFields("nks").gfield("getValue");
                    if (value)
                        if (typeof value.nks !== "undefined" && value.nks !== null)
                            return value.nks.trim();
                    //return "490800";
                    return "";
                }
                /**
                 * Instance gridu
                 * @returns
                 */
                getGrid() {
                    var data = this.element.find(".ggrid." + this.stylGridu);
                    return (data.length == 0 ? null : data);
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda loadData
                /**
                  * Nacteni dat
                  * @returns
                  */
                loadData() {
                    this.log.debug("Gordic.Roz.WebClient.GRozSeznamPrislib.loadData", this);
                    const that = this;
                    this.loadingData = true;
                    // validace hodnot
                    if (!that.opravnyPrislib)
                        if (!that.element.findForms().gform("isValid"))
                            return $.Deferred().reject().promise();
                    //view.requestData();
                    let promisData;
                    switch (this.dokladHead.ktg_typ) {
                        case 1136 /* Gordic.Eko.Interface.GEKategorieDokladu.IndividualniPrislib */:
                            promisData = that.isl.RozPrislib.listIndividualniPrislib({ drd: that.dokladHead.drd, nks: that.getNKS(), au: that.getAu(), akce: that.getAkce() }).getData();
                            break;
                        case 1138 /* Gordic.Eko.Interface.GEKategorieDokladu.OpravnyIndividualniPrislib */:
                            promisData = that.isl.RozPrislib.listOpravnyIndividualniPrislib({ ixp: that.dokladHead.ixp }).getData();
                            break;
                        case 1135 /* Gordic.Eko.Interface.GEKategorieDokladu.LimitovanyPrislib */:
                            promisData = that.isl.RozPrislib.listLimitovanyPrislib({ drd: that.dokladHead.drd, nks: that.getNKS(), au: that.getAu() }).getData();
                            break;
                        case 1137 /* Gordic.Eko.Interface.GEKategorieDokladu.OpravnyLimitovanyPrislib */:
                            promisData = that.isl.RozPrislib.listOpravnyLimitovanyPrislib({ ixp: that.dokladHead.ixp }).getData();
                            break;
                        default: return $.Deferred().resolve().promise();
                    }
                    that.beginOperation("jres:30150038"); //RC 30150038 : Načítám data
                    return promisData
                        .then(function (result) {
                        if (that.closed)
                            return;
                        var grid = that.getGrid();
                        if (grid === null)
                            return;
                        let view = that.getGrid().ggrid("getView");
                        if (result && result.length > 0)
                            view.updateData(result);
                        else
                            view.updateData([], "reset");
                        that.pristupnostAkci();
                        //grid.ggrid("setData", view, true);  
                        return result;
                    })
                        .always(function () {
                        that.loadingData = false;
                        that.endOperation();
                    });
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                closing() {
                    return $.Deferred().resolve(this.needLoad).promise();
                }
            };
            GRozGenerujPrislib = __decorate([
                gcontent
            ], GRozGenerujPrislib);
            WebClient.GRozGenerujPrislib = GRozGenerujPrislib;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvekdlbmVydWpQcmlzbGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1JvekdlbmVydWpQcmlzbGliLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FrakJmO0FBbGpCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrakJuQjtJQWxqQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtqQjdCO1FBbGpCb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXBEO29CQUNJLDBDQUEwQztvQkFDMUMsa0JBQWtCO29CQUNsQiwwQ0FBMEM7O29CQUcxQyxlQUFlO29CQUNQLGFBQVEsR0FBWSxLQUFLLENBQUM7b0JBZWxDLFlBQVk7b0JBQ1osNEJBQTRCO29CQUVwQixjQUFTLEdBQUcsa0JBQWtCLENBQUM7b0JBRXZDLG1DQUFtQztvQkFDbkMsaUNBQWlDO29CQUNqQyxzQkFBc0I7b0JBQ3RCLDREQUE0RDtvQkFDNUQsS0FBSztvQkFDRyxnQkFBVyxHQUFHLEtBQUssQ0FBQztnQkE2Z0JqQyxDQUFDO2dCQTVnQkksMENBQTBDO2dCQUMxQywrQkFBK0I7Z0JBQ3hCLGNBQWM7b0JBRWpCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHVEQUF1RCxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUM5RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUk7d0JBQ2pDLElBQUksRUFBRSxvQkFBb0I7d0JBQzFCLFVBQVUsRUFBRSxHQUFHO3dCQUNmLFFBQVEsRUFBRSw0Q0FBNEM7cUJBQ3pELENBQUM7b0JBQUEsQ0FBQztvQkFDSCw4RUFBOEU7b0JBQzlFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsaUNBQWlDO29CQUNqQyxJ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QU0sR0FBRyxDQUFDOzRCQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs0QkFHeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTt3QkFDdEIsc0NBQXNDO3dCQUN0QyxPQUFPLE1BQU0sQ0FBQztvQkFDbEIsQ0FBQyxDQUFDO3lCQUVELE1BQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzt3QkFDekIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQUMsQ0FDRDtnQkFDVCxDQUFDO2dCQUdELFlBQVk7Z0JBQ1osMENBQTBDO2dCQUcxQywwQ0FBMEM7Z0JBRW5DLE9BQU87b0JBRVYsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekQsQ0FBQzthQUdMLENBQUE7WUE3aUJhLGtCQUFrQjtnQkFEOUIsUUFBUTtlQUNJLGtCQUFrQixDQTZpQi9CO1lBN2lCYSw0QkFBa0IscUJBNmlCL0IsQ0FBQTtRQUNKLENBQUMsRUFsakJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFrakI3QjtJQUFELENBQUMsRUFsakJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrakJuQjtBQUFELENBQUMsRUFsakJTLE1BQU0sS0FBTixNQUFNLFFBa2pCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUm96LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdSb3pHZW5lcnVqUHJpc2xpYiBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jcmVnaW9uIEF0cmlidXR5XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTsgLy8gSFRNTEVsZW1lbnQsIG5lcG92aW5uZSwgZG9wbG5lbm8gcG96ZGVqaVxyXG4gICAgICAgIC8vIG51dG5vIG5hY2lzdFxyXG4gICAgICAgIHByaXZhdGUgbmVlZExvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvLyBHbG9iYWxuaSBuYXN0YXZlbmlcclxuICAgICAgICBwdWJsaWMgZ2xvYmFsczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Jvekdsb2JhbHNEdG87XHJcbiAgICAgICAgcHVibGljICRmaWx0ZXJGb3JtOiBhbnk7XHJcbiAgICAgICAgLy8gI3JlZ2lvbiBIb2Rub3R5IHplIHNlcnZlcnVcclxuICAgICAgICAvLyBkdG8gZG9rbGFkdVxyXG4gICAgICAgIHByaXZhdGUgZG9rbGFkSGVhZDogR29yZGljLkVrby5JbnRlcmZhY2UuR1JvenNwaWREdG87XHJcbiAgICAgICAgLy8gYXRyaWJ1dCBvcHJhdm5laG8gcHJpc2xpYnVcclxuICAgICAgICBwcml2YXRlIG9wcmF2bnlQcmlzbGliOiBib29sZWFuO1xyXG4gICAgICAgIC8vIHprcmF0a2EgYXVcclxuICAgICAgICBwcml2YXRlIHVlYl96a3JhdGthOiBzdHJpbmc7XHJcbiAgICAgICAgLy8gbmF6ZXYgYXVcclxuICAgICAgICAvL3ByaXZhdGUgdWViX25hemV2OiBzdHJpbmc7XHJcbiAgICAgICAgLy8gemtyYXRrYSB0ZTFcclxuICAgICAgICBwcml2YXRlIHRlMV96a3JhdGthOiBzdHJpbmc7XHJcbiAgICAgICAgLy8gbmF6ZXYgdGUxXHJcbiAgICAgICAgLy9wcml2YXRlIHRlMV9uYXpldjogc3RyaW5nO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgc3R5bEdyaWR1ID0gXCJqcy1zZXpuYW1QcmlzbGliXCI7XHJcblxyXG4gICAgICAgIC8vbG9nT3B0aW9ucyA9IHRoaXMubG9nT3B0aW9ucyA/PyB7XHJcbiAgICAgICAgLy8gICAgbmFtZTogJ0dSb3pHZW5lcnVqUHJpc2xpYicsXHJcbiAgICAgICAgLy8gICAgYXV0aG9yQ29kZTogMzAyLFxyXG4gICAgICAgIC8vICAgIGZpbGVOYW1lOiAnR29yZGljLkVrby5XZWJDbGllbnQuR1JvekdlbmVydWpQcmlzbGliLnRzJ1xyXG4gICAgICAgIC8vfTs7XHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBNZXRvZGEgb25Db250ZW50UmVhZHlcclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdSb3pTZXpuYW1QcmlzbGliLm9uQ29udGVudFJlYWR5XCIsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ09wdGlvbnMgPSB0aGlzLmxvZ09wdGlvbnMgPz8ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ0dSb3pHZW5lcnVqUHJpc2xpYicsXHJcbiAgICAgICAgICAgICAgICBhdXRob3JDb2RlOiAzMDIsXHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogJ0dvcmRpYy5Fa28uV2ViQ2xpZW50LkdSb3pHZW5lcnVqUHJpc2xpYi50cydcclxuICAgICAgICAgICAgfTs7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgc2UgbmV1c3RhbGUgbWVuaSBkbGUgb2JqZWt0dS4gWmRlIHNpIHRlZHkgdWxvemltIG9ka2F6IG5hIGNlbHkgQ29udGVudFxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpczsgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHBvY2F0ZWNuaSBpbmljaWFsaXphY2UgYXJpYnV0dVxyXG4gICAgICAgICAgICB0aGlzLm5lZWRMb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgLy8gVnl0dm9yZW5pIGZvcm11bGFyZVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMub3ByYXZueVByaXNsaWIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE9iY2Vyc3R2aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdEdlbmVyb3ZhdCwgZmF2b3JpdGU6dHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAvLyBQcmlkYW5pIGZpbHRyb3ZhY2lobyBwYW5lbHVcclxuICAgICAgICAgICAgLy90aGF0LmNyZWF0ZUZpbHRlclBhbmVsKHRoYXQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIFZ5dHZvcmVuaSBncmlkdSBhIG5hcGxuZW5pIG9iamVrdHUgbmFjdGVueW1pIGRhdHlcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVHcmlkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IGRvIGdyaWR1XHJcbiAgICAgICAgICAgIC8vdGhhdC5wcmlzdHVwbm9zdEFrY2lTZXpuYW11KCk7ICAgXHJcbiAgICAgICAgICAgIC8vIMO6dm9kbsOtIHJvemJvciBwxZnDrXN0dXBub3N0aSB0bGHEjcOtdGVrIGEgYWtjw60gbmEgc2V6bmFtdVxyXG5cclxuICAgICAgICAgICAgLy9pZiAodGhhdC5uZWVkTG9hZClcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zIS5hY3RPYmNlcnN0dml0IS5ydW4oKTtcclxuICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgIHRoYXQucHJpc3R1cG5vc3RBa2NpKCk7IFxyXG4gICAgICAgICAgICBpZiAodGhhdC5vcHJhdm55UHJpc2xpYilcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucyEuYWN0T2JjZXJzdHZpdCEucnVuKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9iY2Vyc3R2aXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9iY2Vyc3R2aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjpcImpyZXM6MzAyNTA0NjJcIiwgLy9SQyAzMDI1MDQ2MiA6IE5hxI3DrXN0XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2V0UGVuZGluZyh0aGF0LmxvYWREYXRhKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5jbG9zZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGF0LmdldEdyaWQoKS5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96YWFhdFByaXNsaWJEdG8+KFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0R2VuZXJvdmF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHZW5lcm92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NjFcIiwgLy9SQyAzMDI1MDQ2MSA6IEdlbmVyb3ZhdFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZ2VuZXJ1alphcGlzeURva2xhZHUoKSk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2VuZXJvdmFuaSByb3pwb2N0b3Z5Y2ggemFwaXN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcnVqWmFwaXN5RG9rbGFkdSgpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAvLyBuYWN0ZW5pIHphcGlzdSBwcm8gdWtsYWRhbmlcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0QWxsUm93czxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96YWFhdFByaXNsaWJEdG8+KGdyaWQpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwNDYzXCIpIC8vUkMgMzAyNTA0NjMgOiBQcm9iw61ow6EgZ2VuZXJvdsOhbsOtLi4uXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5Sb3pQcmlzbGliLmdlbmVyb3ZhdFphcGlzeSh7IGhsYXZpY2thRG9rbGFkdTogdGhpcy5kb2tsYWRIZWFkLCBkYXRhUHJvR2VuZXJvdmFuaTogZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uZWVkTG9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pLlxyXG4gICAgICAgICAgICAgICAgY2F0Y2goKGV4OiBHRXJyb3IpPT57ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBleDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHRoYXQuZW5kT3BlcmF0aW9uKCkpXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZm9ybXVsYXJlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNvZGVcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDY3XCIgLy9SQyAzMDI1MDQ2NyA6IEvDs2RcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDY4XCIgfSk7IC8vUkMgMzAyNTA0NjggOiBOw6F6ZXZcclxuICAgICAgICAgICAgLy9sZXQgcmVhZGVyID0gbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuUm96dnJoKClcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJmb3JtRGV0YWlsXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDNNMlMxLCBMLTItMTAtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC8vR29yZGljLlByZWZhYnMuU2VsZWN0LnVjdGRyb3ooKVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MgfSkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0LmRva2xhZEhlYWQ/LmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmF6YmFVY3NOYUVrb3Zua3M6IHRoYXQuZG9rbGFkSGVhZD8udWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2tfb2Q6IFwiPD0gXCIgKyB0aGF0LmRva2xhZEhlYWQ/LnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rX2RvOiBcIj49IFwiICsgdGhhdC5kb2tsYWRIZWFkPy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhemJhTmtzTmFGdW5rY2k6IHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuVmF6YmFOa3NOYUZ1bmtjaSA/IHRoYXQuZ2xvYmFscy5TZXNzaW9uUGFyYW1zIS5JeHNGdW4gOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289PnZhbHVlLmljbyxtb2RlbC5ua3M9dmFsdWUubmtzXCIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogdGhpcy51ZWJfemtyYXRrYSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qucm96dnJoKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVlYlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kYXRhOiByZWFkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYXBvdmVkYUNvbHVtbjogXCJ1ZWJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVlYTogXCIyMjNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGFfcm96OiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaXNsaWI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt0Z190eXA6IHRoaXMuZG9rbGFkSGVhZC5rdGdfdHlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfcm96OiB0aGlzLmdsb2JhbHMuRWtvUGFyYW1zPy5JeHNSb3osXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJjb2RlXCIsIFwibmF6ZXZcIl0sIC8vIHBvZGxlIHRvaG8gc2UgbcWvxb5lIGhsZWRhdCB2IGF1dG9jb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckl0ZW1UZW1wbGF0ZTogXCJ7Y29kZTp0cmltOmVuY29kZX0gLSB7bmF6ZXY6dHJpbTplbmNvZGV9XCIsIC8vamFrIHZ5cGFkw6EgcG9sb8W+a2EgdiBhdXRvY29tcGxldGVcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvckZvcm1hdDogZ2YsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntjb2RlOnRyaW06ZW5jb2RlfVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZG9rbGFkSGVhZC5rdGdfdHlwID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFS2F0ZWdvcmllRG9rbGFkdS5JbmRpdmlkdWFsbmlQcmlzbGliKVxyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogdGhpcy50ZTFfemtyYXRrYSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnJvenZyaCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGUxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kYXRhOiByZWFkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYXBvdmVkYUNvbHVtbjogXCJ0ZTFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWVhOiBcIjIyM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YV9yb3o6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3R5cDogdGhpcy5kb2tsYWRIZWFkLmt0Z190eXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaXNsaWI6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWViOiAoKSA9PiB7IHJldHVybiB0aGlzLmZpbmRGaWVsZHMoXCJ1ZWJcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/LmNvZGUgfSwgLy8gaG9kbm90YSB6IHVlYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfcm96OiB0aGlzLmdsb2JhbHMuRWtvUGFyYW1zPy5JeHNSb3pcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yRm9ybWF0OiBnZixcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJjb2RlXCIsIFwibmF6ZXZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVySXRlbVRlbXBsYXRlOiBcIntjb2RlOnRyaW06ZW5jb2RlfSAtIHtuYXpldjp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2NvZGU6dHJpbTplbmNvZGV9XCJcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgdmFyIHRhYkhlYWQgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KTtcclxuICAgICAgICAgICAgLy8gcHJvIHZhbGlkYXRvcnkgemUgc2VydmVydVxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gdGhpcy5lbGVtZW50OyAvL3RhYkhlYWQ7XHJcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kVG8odGFiSGVhZCk7XHJcbiAgICAgICAgICAgIC8vIHByZWRuYXN0YXZlbmkgaG9kbm90eSBua3NcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhcIm5rc1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICBua3M6IHRoaXMuZG9rbGFkSGVhZC5ua3MsIGljbzogdGhpcy5kb2tsYWRIZWFkLmljbyxcclxuICAgICAgICAgICAgICAgIHJvazogdGhpcy5kb2tsYWRIZWFkLnJva1xyXG4gICAgICAgICAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jcmVnaW9uIE1ldG9kYSBjcmVhdGVHcmlkXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCkgOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cuZGVidWcoXCJHb3JkaWMuUm96LldlYkNsaWVudC5HUm96U2V6bmFtUHJpc2xpYi5jcmVhdGVHcmlkXCIsIHRoaXMpO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpczsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGdyaWRWaWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemFhYXRQcmlzbGliRHRvPihbXSwge1xyXG4gICAgICAgICAgICAgICAgLy9rZXk6IFwiaWRcIixcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcjogbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3phYWF0UHJpc2xpYkR0bywgR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemFhYXRQcmlzbGliRHRvPigocmVxLCByZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgdHJlZTogbmV3IEdvcmRpYy5EYXRhLlRyZWU8a29udGFjZURhdGEsIGFueT4oR29yZGljLkRhdGEuVHJlZS5wYXJlbnRJZE9yZ2FuaXplcihcImlkX3BhcmVudFwiKSwgeyBmaWx0ZXJLZWVwU3RydWN0dXJlOiB0cnVlLCBkZWZhdWx0U3RhdGU6IFwiY2xvc2VkXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9lcnJvcjogbmV3IEdvcmRpYy5EYXRhLkVycm9yUHJvY2Vzc29yPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3phYWF0UHJpc2xpYkR0bz4oKHJvdyxtZXRhUm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gcG9rdWQgc2UgbmFjaXRhLCBuZXZhbGlkdWppXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKHRoaXMubG9hZGluZylcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIFt7IHN0b3BwaW5nOnRydWUgfV0gYXMgVmFsaWRhdG9ycy5HcmlkRXJyb3JbXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodHlwZW9mIHJvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2Ygcm93LmtjMV9ub3ZhID09PSBcInVuZGVmaW5lZFwiIHx8IHJvdy5rYzFfbm92YSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gW3sgY29sdW1uTmFtZTogXCJrYzFfbm92YVwiLCByb3c6IDAgfV0gYXMgVmFsaWRhdG9ycy5HcmlkRXJyb3JbXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKHR5cGVvZiByb3cua2MxX3B1dm9kbmkgPT09IFwidW5kZWZpbmVkXCIgfHwgcm93LmtjMV9wdXZvZG5pID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBbXSBhcyBWYWxpZGF0b3JzLkdyaWRFcnJvcltdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBsZXQgcHV2b2RuaSA9IHBhcnNlRGVjaW1hbChyb3cua2MxX3B1dm9kbmkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGxldCBub3ZhID0gcGFyc2VEZWNpbWFsKHJvdy5rYzFfbm92YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKG5vdmEubGVzc1RoYW5PckVxdWFsVG8oMCkgfHwgbm92YS5ncmVhdGVyVGhhbihwdXZvZG5pKSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjb2x1bW5OYW1lOiBcImtjMV9ub3ZhXCIsIHJvdzogMCwgbWVzc2FnZTogXCJqcmVzOjMwMjUwNDY0XCIgLy9SQyAzMDI1MDQ2NCA6IEhvZG5vdGEgbXVzw60gYsO9dCB2IHJvenNhaHUgPjAgYSA8PXswfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihwdXZvZG5pLCBcIkNcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1dIGFzIFZhbGlkYXRvcnMuR3JpZEVycm9yW107XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIFtdIGFzIFZhbGlkYXRvcnMuR3JpZEVycm9yW107XHJcbiAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBvZG1pbmVueSBmb3JtYXRcclxuICAgICAgICAgICAgbGV0IGNvbmRGb3JtYXQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdIHwgdW5kZWZpbmVkID0gdm9pZCAwO1xyXG4gICAgICAgICAgICBjb25kRm9ybWF0ID0gW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNDY5XCIsIC8vUkMgMzAyNTA0NjkgOiBabcSbbmEgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFwiQGtjMV9wdXZvZG5pPkBrYzFfbm92YSBhbmQgQGtjMV9ub3ZhPjBcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYmc6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdEJnLmdyZWVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5VG86XCJrYzFfbm92YVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA0NzBcIiwgLy9SQyAzMDI1MDQ3MCA6IENoeWJuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAa2MxX25vdmE8MCBvciBAa2MxX25vdmE+QGtjMV9wdXZvZG5pXCIsICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGJnOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRCZy5yZWQsXHJcbiAgICAgICAgICAgICAgICBhcHBseVRvOiBcImtjMV9ub3ZhXCJcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICAvLyBHcmlkIHNpIHVsb3ppbSBkbyBtb2R1bGFybmkgcHJvbWVubmUsIGFieWNoIHNlIG5hIG5laiBuZW11c2VsIHZzdWRlIG9ka2F6b3ZhdFxyXG4gICAgICAgICAgICB0aGF0LiRncmlkID0gJChcIjxkaXYgY2xhc3M9J3swfSc+XCIuZm9ybWF0KHRoaXMuc3R5bEdyaWR1KSkgLy8gVnl0dm9yIGRpdiBwcm8gZ3JpZFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcImNhbGMoMTAwJSAtIFwiICsgJGZpbHRlckZvcm0uaGVpZ2h0KCkgKyBcInB4KVwiKSAvLyBuYXN0YXYgbXUgdnlza3VcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KSAvLyB2bG96IGdyaWQgZG8gdGhpcy5lbGVtZW50XHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemFhYXRQcmlzbGliRHRvPih7IC8vIHN0cnVrdHVyYSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBDb2x1bW5Nb2RlIC0gdHlwIHpvYnJhemVuaSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAvLyBhYnNvbHV0bmkgc2lya3kgc2xvdXBjdSAoZGVmYXVsdCBmaXQgLSByZXNwb256aXZuaSkgLyBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBNdWx0aSAtIG1vem5vc3QgdnliZXJ1IHZpY2UgcmFka3VcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZ3JpZFZpZXcsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBkZWZhdWx0QWN0aW9uIC0gbmFzdGF2ZW7DrSBERUZBVUxUIGFrY2UgcHJvIERWT0pLTElLIG5hIGdyaWR1IG5lYm8gRU5URVJcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gc2VhcmNoQ29sdW1ucyAtIHNsb3VwY2UsIHBvZGxlIGt0ZXLDvWNoIHNlIHZ5aGxlZMOhdsOhIHYgc2VhcmNoYm94dSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICNyZWdpb24gR3JpZEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlR3JpZEZvcm1hdCh0aGlzLm9wcmF2bnlQcmlzbGliKSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7ICBjb25kRm9ybWF0czogY29uZEZvcm1hdCB9LCBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gem1lbmEgYWt0aXZuaWhvIHJhZGt1XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZGNlbGxlZGl0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vYWxsb3dDb3B5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVN0YXJ0OiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6bmVwcmlzdHVwZW5pIGdyaWR1LCBwb2t1ZCBzZSBuZW1hIGVkaXRvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIERldGFpbFByZWRrb250YWNlTWV0aG9kLklzUHJpdmF0ZSh0aGF0LCB0aGF0LlByZWRrb250YWNlRHRvLkhsYXZpY2thIS5peHNfZnVuKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoZXYsIG9iaikgeyB9XHJcbiAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dG92cmVuaSBncmlkZm9ybWF0dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCh6b2JyYXppdE5TKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96YWFhdFByaXNsaWJEdG8+IHtcclxuICAgICAgICAgICAgbGV0IGdyZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3phYWF0UHJpc2xpYkR0bz4oKTtcclxuICAgICAgICAgICAgbGV0IGRhdGFTZW50ZW5jZSA9ICQuZXh0ZW5kKHRoaXNbXCJkYXRhU2VudGVuY2VcIl0sIHtcclxuICAgICAgICAgICAgICAgIHNlbnRlbmNlVHlwZTogR29yZGljLkVrby5JbnRlcmZhY2UuVHlwVmV0eUVudW0uUm96cG9jdG92YSwgcm9rOiB0aGlzLmdsb2JhbHMuRWtvUGFyYW1zPy5Sb2ssXHJcbiAgICAgICAgICAgICAgICBkcmQ6IDBcclxuICAgICAgICAgICAgICAgICwgaXhzUm96OiB0aGlzLmdsb2JhbHMuRWtvUGFyYW1zPy5JeHNSb3pcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHZhbGlkYWNlID1uZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZSh2YWx1ZTpEZWNpbWFsLCBzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9ICQuY29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Um93ID0gZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96YWFhdFByaXNsaWJEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHB1dm9kbmkgPSBwYXJzZURlY2ltYWwoY3VycmVudFJvdy5rYzFfcHV2b2RuaSEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZT09bnVsbCkgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvclR5cGUgPSBcIndhcm5pbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJqcmVzOjMwMjUwNDcyXCI7IC8vUkMgMzAyNTA0NzIgOiBIb2Rub3RhIG11c8OtIGLDvXQgdnlwbG7Em27DoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BwaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5ncm91cCA9IFwid2FybmluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHB1dm9kbmkgIT09IG51bGwgJiYgdmFsdWUuZ3JlYXRlclRoYW4ocHV2b2RuaSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvclR5cGUgPSBcImVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IFwianJlczozMDI1MDQ3M1wiLmZvcm1hdChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHB1dm9kbmksIFwiQ1wiKSk7IC8vUkMgMzAyNTA0NzMgOiBIb2Rub3RhIG11c8OtIGLDvXQgbWVuxaHDrSBuZcW+IHswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BwaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmdyb3VwID0gXCJ3YXJuaW5nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXB1dm9kbmkuZ3JlYXRlclRoYW4oMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvclR5cGUgPSBcIndhcm5pbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJqcmVzOjMwMjUwNDcxXCI7IC8vUkMgMzAyNTA0NzEgOiBIb2Rub3RhIG11c8OtIGLDvXQgbWVuxaHDrSB2xJt0xaHDrSBuZcW+IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wcGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZ3JvdXAgPSBcIndhcm5pbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmICh6b2JyYXppdE5TKVxyXG4gICAgICAgICAgICAgICAgZ3JkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcmNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBncmRGb3JtYXQuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoaXMsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNlbnRlbmNlOiBkYXRhU2VudGVuY2UsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2MxX3B1dm9kbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3N0cnVjdHVyZUxlYWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NTNcIiwgLy9SQyAzMDI1MDQ1MyA6IFDFr3ZvZG7DrSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtjMV9ub3ZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdHJ1Y3R1cmVMZWFkOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDU0XCIsIC8vUkMgMzAyNTA0NTQgOiBOb3bDoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2MxX25vdmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbdmFsaWRhY2UsbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMCwgbWVzc2FnZTogXCJqcmVzOjMwMjUwNDY1XCIgfSAvL1JDIDMwMjUwNDY1IDogSG9kbm90YSBuZXNtw60gYsO9dCBtZW7FocOtIG5lxb4gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jcmVnaW9uIE1ldG9kYSBwcmlzdHVwbm9zdEFrY2lcclxuICAgICAgICBwcml2YXRlIHByaXN0dXBub3N0QWtjaSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cuZGVidWcoXCJHb3JkaWMuUm96LldlYkNsaWVudC5HUm96U2V6bmFtUHJpc2xpYi5wcmlzdHVwbm9zdEFrY2lTZXpuYW11XCIsIHRoaXMpO1xyXG4gICAgICAgICAgICBsZXQgcG9jZXRaYXBpc3UgPSAwO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcG9jZXRaYXBpc3UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uQ2Vsa292eVBvY2V0UmFka3UoZ3JpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RHZW5lcm92YXQ/LnVwZGF0ZSh7IGVuYWJsZWQ6IHBvY2V0WmFwaXN1PjAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuIFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGFuYSBha2NlXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldEFrY2UoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5maW5kRmllbGRzKFwidGUxXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlLmNvZGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUuY29kZSAhPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHZhbHVlLmNvZGUgYXMgc3RyaW5nKS50cmltKCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3JldHVybiBcIjczNzM3MzczNzM3MzczN1wiO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkYW5lIEF1XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldEF1KCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZmluZEZpZWxkcyhcInVlYlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZS5jb2RlICE9PSBcInVuZGVmaW5lZFwiICYmIHZhbHVlLmNvZGUgIT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh2YWx1ZS5jb2RlIGFzIHN0cmluZykudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphbmFuZSBuYWtsYWRvdmUgc3RyZWRpc2tvXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldE5LUygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvL2xldCBhOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAvL2EudHJpbSgpXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZmluZEZpZWxkcyhcIm5rc1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZS5ua3MgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUubmtzICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodmFsdWUubmtzIGFzIHN0cmluZykudHJpbSgpO1xyXG4gICAgICAgICAgICAvL3JldHVybiBcIjQ5MDgwMFwiO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5zdGFuY2UgZ3JpZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5nZ3JpZC5cIit0aGlzLnN0eWxHcmlkdSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgYXMgYW55IDogZGF0YSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jcmVnaW9uIE1ldG9kYSBsb2FkRGF0YVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgKiBOYWN0ZW5pIGRhdFxyXG4gICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWREYXRhKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdSb3pTZXpuYW1QcmlzbGliLmxvYWREYXRhXCIsIHRoaXMpO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHZhbGlkYWNlIGhvZG5vdFxyXG4gICAgICAgICAgICBpZiAoIXRoYXQub3ByYXZueVByaXNsaWIpXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIC8vdmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzRGF0YTogSlF1ZXJ5UHJvbWlzZTxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96YWFhdFByaXNsaWJEdG9bXT47XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5kb2tsYWRIZWFkLmt0Z190eXAgYXMgR29yZGljLkVrby5JbnRlcmZhY2UuR0VLYXRlZ29yaWVEb2tsYWR1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFS2F0ZWdvcmllRG9rbGFkdS5JbmRpdmlkdWFsbmlQcmlzbGliOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc0RhdGEgPSB0aGF0LmlzbC5Sb3pQcmlzbGliLmxpc3RJbmRpdmlkdWFsbmlQcmlzbGliKHsgZHJkOiB0aGF0LmRva2xhZEhlYWQuZHJkISwgbmtzOiB0aGF0LmdldE5LUygpLCBhdTogdGhhdC5nZXRBdSgpLCBha2NlOiB0aGF0LmdldEFrY2UoKSB9KS5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFS2F0ZWdvcmllRG9rbGFkdS5PcHJhdm55SW5kaXZpZHVhbG5pUHJpc2xpYjpcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNEYXRhID0gdGhhdC5pc2wuUm96UHJpc2xpYi5saXN0T3ByYXZueUluZGl2aWR1YWxuaVByaXNsaWIoeyBpeHA6IHRoYXQuZG9rbGFkSGVhZC5peHAhIH0pLmdldERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkVrby5JbnRlcmZhY2UuR0VLYXRlZ29yaWVEb2tsYWR1LkxpbWl0b3ZhbnlQcmlzbGliOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc0RhdGEgPSB0aGF0LmlzbC5Sb3pQcmlzbGliLmxpc3RMaW1pdG92YW55UHJpc2xpYih7IGRyZDogdGhhdC5kb2tsYWRIZWFkLmRyZCEsIG5rczogdGhhdC5nZXROS1MoKSwgYXU6IHRoYXQuZ2V0QXUoKSB9KS5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFS2F0ZWdvcmllRG9rbGFkdS5PcHJhdm55TGltaXRvdmFueVByaXNsaWI6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzRGF0YSA9IHRoYXQuaXNsLlJvelByaXNsaWIubGlzdE9wcmF2bnlMaW1pdG92YW55UHJpc2xpYih7IGl4cDogdGhhdC5kb2tsYWRIZWFkLml4cCEgfSkuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDE1MDAzOFwiKTsgLy9SQyAzMDE1MDAzOCA6IE5hxI3DrXTDoW0gZGF0YVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzRGF0YVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IHRoYXQuZ2V0R3JpZCgpLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3phYWF0UHJpc2xpYkR0bz4oXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcudXBkYXRlRGF0YShyZXN1bHQpOyAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKFtdLCBcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucHJpc3R1cG5vc3RBa2NpKClcclxuICAgICAgICAgICAgICAgICAgICAvL2dyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcsIHRydWUpOyAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUodGhpcy5uZWVkTG9hZCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICB9XHJcbn0iXX0=