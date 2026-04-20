"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            var GRozSeznmaPrislib = /** @class */ (function (_super) {
                __extends(GRozSeznmaPrislib, _super);
                function GRozSeznmaPrislib() {
                    //////////////////////////////////////////
                    //#region Atributy
                    //////////////////////////////////////////
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    // nutno nacist
                    _this.needLoad = false;
                    return _this;
                }
                //taskId = "ROZSeznamdokladu";
                //////////////////////////////////////////
                //#region Metoda onContentReady
                GRozSeznmaPrislib.prototype.onContentReady = function () {
                    console.log("Gordic.Roz.WebClient.GRozSeznmaPrislib.onContentReady", this);
                    this.needLoad = true;
                    // This se neustale meni dle objektu. Zde si tedy ulozim odkaz na cely Content
                    var that = this;
                    // Pridani filtrovaciho panelu
                    //that.createFilterPanel(that);
                    // Vytvoreni gridu a naplneni objektu nactenymi daty
                    that.createGrid();
                    // načtení dat do gridu
                    //that.pristupnostAkciSeznamu();   
                    // úvodní rozbor přístupnosti tlačítek a akcí na seznamu
                    if (that.needLoad)
                        that.actions.actObcerstvit.run();
                    //else
                    //  that.pristupnostAkciSeznamu(); 
                };
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda createGrid
                GRozSeznmaPrislib.prototype.createGrid = function () {
                    var _this = this;
                    console.log("Gordic.Roz.WebClient.GRozSeznamAHlavicekTab.createGrid", this);
                    var that = this;
                    var view = new Gordic.Isl.View(that.isl.RozDokladHlavickaA.list(
                    //{ rq: { Druh: null, Rok: null, FiltrStav: Gordic.Uct.Interface.VsechnyHlavicky } }
                    ).use(function (req, next, ctx) {
                        req.filters = { Druh: null, Rok: null, FiltrStav: 0 /* Gordic.Uct.Interface.GERozFiltrAHlavicekStav.VsechnyHlavicky */ };
                        return next(req).then(function (result) {
                            _this.pristupnostAkciSeznamu(result.meta);
                            return result;
                        });
                    }), {
                        filterPanel: that.$filterForm,
                        key: "ixs_ahl",
                        startEmpty: true,
                        onResponse: function (rq) { return rq; }
                    });
                    // Podmineny format
                    var condFormat = undefined;
                    condFormat = [
                        {
                            description: "jres:30250337",
                            formula: "@a_stav==0",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.green
                        },
                        {
                            description: "jres:30250338",
                            formula: "@a_stav>0 and @a_stav<20",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                        },
                        {
                            description: "jres:30250339",
                            formula: "@a_stav>19",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.gray
                        },
                    ];
                    // Grid si ulozim do modularni promenne, abych se na nej nemusel vsude odkazovat
                    that.$grid = $("<div class='js-seznamHlavicek'>") // Vytvor div pro grid
                        //                .css("height", "calc(100% - " + $filterForm.height() + "px)") // nastav mu vysku
                        .css("height", "100%")
                        .appendTo(this.element) // vloz grid do this.element
                        .ggrid({
                        //#region ColumnMode - typ zobrazeni gridu
                        columnMode: "fit",
                        //#endregion
                        //#region Multi - moznost vyberu vice radku
                        multi: false,
                        //#endregion
                        data: view,
                        //#region defaultAction - nastavení DEFAULT akce pro DVOJKLIK na gridu nebo ENTER
                        defaultAction: that.actions.actDetail,
                        //#endregion
                        //#region searchColumns - sloupce, podle kterých se vyhledává v searchboxu
                        searchColumns: ["ixs_ahl", "popis"],
                        //#endregion
                        // #region GridFormat
                        columns: that.createGridFormat(),
                        // #endregion
                        defaultProfile: { condFormats: condFormat },
                        // zmena aktivniho radku
                        selection: function (ev, info) {
                            var _a;
                            if (info.count > 0) {
                                var rows = info.getSelection();
                                if (rows.length > 0)
                                    that.pristupnostAkciSeznamu(undefined, rows[0]);
                                (_a = that.previewController) === null || _a === void 0 ? void 0 : _a.show(rows[0]);
                            }
                            // Zde se nemohu odkazovat na objekt $grid, musim nacitat pres class gridu
                            //var vybraneRadky = that.find(".js-seznamDokladu").ggrid("getSelection");                // načtení přes vyhledání gridu (přes class)
                            //if (vybraneRadky !== null && vybraneRadky.length === 1) {                           // je vybrán jeden řádek
                            //    that.actions.actStornoDokladu.update({ enabled: true });                        // STORNO aktivní
                            //}
                            //else {                                                                              // je vybráno více dokladů
                            //    that.actions.actStornoDokladu.update({ enabled: false });                       // STORNO neaktivní
                            //}
                        },
                    })
                        .ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        // dlouhý seznam
                        longListAllowed: false,
                    });
                };
                //#endregion
                //////////////////////////////////////////
                /**
                 * Vytovreni gridformatu
                 *
                 */
                GRozSeznmaPrislib.prototype.createGridFormat = function () {
                    var grdFormat = new Gordic.Data.GridFormat()
                        // Pid dokladu
                        .addTextColumn({
                        name: "ixs_ahl",
                        caption: "jres:30250184",
                        width: 120,
                        fixedWidth: true,
                        customClass: "ui-disabled"
                    })
                        // Cisla a-hlavicky
                        .addTextColumn({
                        name: "a_cislo",
                        caption: "jres:30250185" //RC 30250185 : Číslo hlavičky
                    })
                        // Nazev
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:30250186" //RC 30250186 : Název
                    })
                        // Prijmy
                        .addMD({
                        caption: "jres:30250187", //RC 30250187 : Příjmy
                    })
                        // Vydaje
                        .addDal({
                        caption: "jres:30250188", //RC 30250188 : Výdaje 
                    })
                        // Stav a-hlavicky - text
                        .addTextColumn({
                        name: "stav",
                        caption: "jres:30250189" //RC 30250189 : Stav
                    })
                        // Stav a-hlavicky - cislo
                        .addNumberColumn({
                        name: "a_stav",
                        caption: "jres:30250189" //RC 30250189 : Stav
                        ,
                        hidden: true
                    })
                        // Druh a-hlavicky
                        .addTextColumn({
                        name: "druh",
                        caption: "jres:30250190" //RC 30250190 : Druh
                    })
                        // Datum evidence
                        .addDateTimeColumn({
                        name: "dat_evid",
                        caption: "jres:30250191" //RC 30250191 : Datum založení
                    });
                    return grdFormat;
                };
                //////////////////////////////////////////
                //#region Metoda pristupnostAkciSeznam
                GRozSeznmaPrislib.prototype.pristupnostAkciSeznamu = function (permisions, currentRow) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                    if (currentRow === void 0) { currentRow = undefined; }
                    console.log("Gordic.Roz.WebClient.GSeznamAHlavicekTab.pristupnostAkciSeznamu", this);
                    var that = this;
                    if (typeof permisions === "undefined")
                        permisions = this.permissions;
                    else
                        this.permissions = permisions;
                    //if (typeof permisions === "undefined")
                    //    permisions = this.permisions;
                    //else
                    //    this.permisions = permisions;
                    // podani
                    (_a = that.actions.actNova) === null || _a === void 0 ? void 0 : _a.updatePermission(permisions.CanCreate);
                    // zobrazit detail
                    (_b = that.actions.actDetail) === null || _b === void 0 ? void 0 : _b.updatePermission(permisions.CanShowDetail);
                    // vymazani hlavicky
                    (_c = that.actions.actVymazat) === null || _c === void 0 ? void 0 : _c.updatePermission(permisions.CanDelete);
                    // zobrazeni dokladu
                    (_d = that.actions.actDoklady) === null || _d === void 0 ? void 0 : _d.updatePermission(permisions.CanDocuments);
                    // otevreni hlavicky
                    (_e = that.actions.actOtevrit) === null || _e === void 0 ? void 0 : _e.update({ enabled: false });
                    // uzavrit hlavicky
                    (_f = that.actions.actUzavrit) === null || _f === void 0 ? void 0 : _f.update({ enabled: false });
                    if (typeof currentRow !== "undefined") {
                        // dle stavu hlavicky zpristupnim akce
                        if (currentRow.a_stav == 0) {
                        }
                        else if (currentRow.a_stav < 20) {
                            // uzavrit hlavicky
                            (_g = that.actions.actUzavrit) === null || _g === void 0 ? void 0 : _g.update({ visible: true });
                            (_h = that.actions.actUzavrit) === null || _h === void 0 ? void 0 : _h.updatePermission(permisions.CanClose);
                            if (permisions.CanDelete)
                                (_j = that.actions.actVymazat) === null || _j === void 0 ? void 0 : _j.update({ enabled: false });
                        }
                        else if (currentRow.a_stav > 10) {
                            // otevreni hlavicky
                            (_k = that.actions.actOtevrit) === null || _k === void 0 ? void 0 : _k.update({ visible: true });
                            (_l = that.actions.actOtevrit) === null || _l === void 0 ? void 0 : _l.updatePermission(permisions.CanOpen);
                            if (permisions.CanDelete)
                                (_m = that.actions.actVymazat) === null || _m === void 0 ? void 0 : _m.update({ enabled: false });
                        }
                    }
                    that.previewController.enable(typeof currentRow !== "undefined");
                    return;
                };
                ;
                GRozSeznmaPrislib.prototype.loadData = function () {
                    console.log("Gordic.Roz.WebClient.GRozSeznamAHlavicek.loadData", this);
                    var that = this;
                    var view = this.getGrid().ggrid("getView");
                    view.requestData();
                    //that.beginOperation("jres:30150038"); //RC 30150038 : Načítám data
                    //let myfiltr: Gordic.Uct.Interface.GRozAhlavickaListiRequestDto = {
                    //    FiltrStav: Gordic.Uct.Interface.GERozFiltrAHlavicekStav.VsechnyHlavicky,
                    //    Druh: null,
                    //    Rok:null
                    //};
                    //Gordic.Isl.RozDokladHlavickaA.list({ rq: myfiltr }).getData()
                    //    .done(function (seznamHlavicek) {
                    //        if (that.closed) return;
                    //        var grid = that.getGrid();
                    //        if (grid === null) return;
                    //        let view: Data.View<Gordic.Uct.Interface.GRozsahlOutDto> = new Gordic.Data.View([] as any, { key: "ixs_ahl" });
                    //        if (seznamHlavicek && seznamHlavicek.length > 0) {
                    //            view = new Gordic.Data.View(seznamHlavicek, { key: "ixs_ahl" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    //        }                    
                    //        grid.ggrid("setData", view, true);  
                    //    })
                    //    .always(function () {
                    //        that.endOperation();
                    //    })
                    //    ;
                };
                GRozSeznmaPrislib.prototype.getGrid = function () {
                    var data = this.element.find(".ggrid.js-seznamHlavicek");
                    return (data.length == 0 ? null : data);
                };
                //#endregion
                //////////////////////////////////////////
                GRozSeznmaPrislib.prototype.delete = function (radek) {
                    console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.delete", this);
                    var that = this;
                    var deferrer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                    this.dialogs.confirm("jres:30250175".format(radek.nazev, radek.ixs_ahl)) //RC 30250175 : Opravdu chcete smazat hlavičku {0} ({1})?
                        .on("close", function (ev, obj) {
                        if (obj === "yes") {
                            that.beginOperation("jres:30250166"); //RC 30250166 :  Probíhá mazání
                            return Gordic.Isl.RozDokladHlavickaA.delete({ identifikator: radek.ixs_ahl })
                                .get()
                                .then(function (result) {
                                // preberu hodnoty
                                // obcerstveni formulare
                                that.endOperation();
                                that.showFlash({ id: "flashDelete", icon: "gi-tick", label: "jres:30250167", customClass: "g-state-success" }); //RC 30250167 : Záznam byl úspěšně vymazán
                                that.loadData();
                                console.log("Gordic.Roz.WebClient.GRozDetailAHlavicka.delete - dokonceno");
                                return deferrer.resolve();
                                //return deffer.promise();
                            }, function (jqXHR, type, obj) {
                                //debugger;
                                that.endOperation();
                            }).always(function () { that.endOperation(); });
                        }
                        else
                            return deferrer.resolve();
                    });
                    return deferrer.promise();
                };
                /***
                 *
                 * Uzavreni hlavicky
                 */
                GRozSeznmaPrislib.prototype.uzavrit = function (indetifikator) {
                    var that = this;
                    return this.isl.RozDokladHlavickaA.uzavrit({ identifikator: indetifikator }).get()
                        .then(function () { return that.reloadRow(indetifikator); });
                };
                /***
                 *
                 * Uzavreni hlavicky
                 */
                GRozSeznmaPrislib.prototype.otevrit = function (indetifikator) {
                    var that = this;
                    return this.isl.RozDokladHlavickaA.otevrit({ identifikator: indetifikator }).get()
                        .then(function () { return that.reloadRow(indetifikator); });
                };
                //////////////////////////////////////////
                //#region Metoda loadData
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda openDetail
                GRozSeznmaPrislib.prototype.openDetail = function (row) {
                    var that = this;
                    console.log("Gordic.Roz.WebClient.GSeznamDokladuTab.openDetail", this);
                    // Pro aktivni radek zobraz detail
                    that.navigate('Gordic.Roz.WebClient.GRozDetailAHlavicka', { ixs_ahl: row.ixs_ahl })
                        .on("close", function (retVal) {
                        debugger;
                        if (retVal != null && retVal.returnValue && retVal.returnValue != "") {
                            that.reloadRow(retVal.returnValue);
                        }
                    });
                };
                //#endregion
                //////////////////////////////////////////
                /**
                 * Nahrazni radku z DB
                 *
                 * @param indentifikator
                 */
                GRozSeznmaPrislib.prototype.reloadRow = function (indentifikator) {
                    var that = this;
                    var view = that.getGrid().ggrid("getView");
                    return that.isl.RozDokladHlavickaA.list({ ixs_ahl: { o: "=", v: indentifikator } })
                        .getData()
                        .then(function (result) {
                        debugger;
                        if (result.length > 0)
                            view.updateData(result[0], "update");
                        return;
                    });
                    //return view.requestData({ Filters: { ixp: { o: "=", v: pidDokladu } } })
                    //    .always(() => {
                    //        content!.endOperation();
                    //        debugger;
                    //        (content as GUctSeznam).$grid.ggrid("activeRow", { ixp: pidDokladu })
                    //    });
                    //that.loadData();
                };
                GRozSeznmaPrislib = __decorate([
                    gcontent
                ], GRozSeznmaPrislib);
                return GRozSeznmaPrislib;
            }(Gordic.GContentBase));
            WebClient.GRozSeznmaPrislib = GRozSeznmaPrislib;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GRozSeznmaPrislib.js.map