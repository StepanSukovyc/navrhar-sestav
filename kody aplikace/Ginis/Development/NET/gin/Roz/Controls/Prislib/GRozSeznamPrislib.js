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
            var GRozSeznamPrislib = /** @class */ (function (_super) {
                __extends(GRozSeznamPrislib, _super);
                function GRozSeznamPrislib() {
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
                GRozSeznamPrislib.prototype.onContentReady = function () {
                    console.log("Gordic.Roz.WebClient.GRozSeznamPrislib.onContentReady", this);
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
                GRozSeznamPrislib.prototype.createGrid = function () {
                    var _this = this;
                    console.log("Gordic.Roz.WebClient.GRozSeznamPrislib.createGrid", this);
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
                    that.$grid = $("<div class='js-seznamPrislib'>") // Vytvor div pro grid
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
                        columns: that.createGridFormat(false),
                        // #endregion
                        defaultProfile: { condFormats: condFormat },
                        // zmena aktivniho radku
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
                GRozSeznamPrislib.prototype.createGridFormat = function (zobrazitNS) {
                    var grdFormat = new Gordic.Data.GridFormat();
                    if (zobrazitNS)
                        grdFormat.addTextColumn({
                            name: "nks",
                            caption: Gordic.Consts.DbShortcuts.nks,
                            width: 80,
                            forced: true,
                        });
                    grdFormat.addSortedEkoCfuSet(this, {
                        isEditable: false,
                    })
                        .addCurrencyColumn({
                        name: "kc1_puvodni",
                        //structureLead:true,
                        caption: "jres:30250453",
                        width: 110,
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            //start: alert("start MD"),
                            options: [
                                Gordic.Prefabs.Number.currency(),
                                {
                                    name: "kc1_puvodni", /*, model: "model.c0=value",*/
                                }
                            ]
                        }
                    })
                        .addCurrencyColumn({
                        name: "kc1_nova",
                        //structureLead:true,
                        caption: "jres:30250454",
                        width: 110,
                        sortable: false,
                        editor: {
                            widget: "gnumberbox",
                            options: [
                                Gordic.Prefabs.Number.currency(),
                                {
                                    name: "kc1_nova",
                                }
                            ]
                        }
                    });
                    return grdFormat;
                };
                //////////////////////////////////////////
                //#region Metoda pristupnostAkciSeznam
                GRozSeznamPrislib.prototype.pristupnostAkciSeznamu = function (permisions, currentRow) {
                    if (currentRow === void 0) { currentRow = undefined; }
                    console.log("Gordic.Roz.WebClient.GRozSeznamPrislib.pristupnostAkciSeznamu", this);
                    var that = this;
                    return;
                };
                ;
                GRozSeznamPrislib.prototype.loadData = function () {
                    console.log("Gordic.Roz.WebClient.GRozSeznamPrislib.loadData", this);
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
                GRozSeznamPrislib.prototype.getGrid = function () {
                    var data = this.element.find(".ggrid.js-seznamPrislib");
                    return (data.length == 0 ? null : data);
                };
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda loadData
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                /**
                 * Nahrazni radku z DB
                 *
                 * @param indentifikator
                 */
                GRozSeznamPrislib.prototype.reloadRow = function (indentifikator) {
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
                };
                GRozSeznamPrislib = __decorate([
                    gcontent
                ], GRozSeznamPrislib);
                return GRozSeznamPrislib;
            }(Gordic.GContentBase));
            WebClient.GRozSeznamPrislib = GRozSeznamPrislib;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GRozSeznamPrislib.js.map