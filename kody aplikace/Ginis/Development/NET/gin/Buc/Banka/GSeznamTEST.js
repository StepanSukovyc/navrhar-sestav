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
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            /**
             * Seznam TEST
             *
             * @author Martin Boček
             * @since 484.1.0.3
             */
            var GSeznamTEST = /** @class */ (function (_super) {
                __extends(GSeznamTEST, _super);
                //export class GSeznamTEST extends GContentBase {
                function GSeznamTEST() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ///**
                // * Aktuální hodnoty filtru
                // * @type {any}
                // */
                //private currentFilter: any;
                ///**
                // * Filtr nad gridem
                // * @type {JQuery}
                // */
                //private $filterForm: JQuery;
                ///**
                // * ovladač pro náhledy
                // * @type {any}
                // */
                //private previewController: any;
                ///**
                // * oprávnění (k celému seznamu)
                // * @type {Gordic.Buc.Interface.GBankaServicePermission | undefined}
                // */
                //private permissions: Gordic.Buc.Interface.GBankaServicePermission | undefined;
                // vlastnosti z C#
                // definice view pro grid - test
                //private viewBanky: Gordic.Isl.View<Gordic.Buc.Interface.GBankaDto>;
                /**
                 * Zadefinování formuláře
                 */
                GSeznamTEST.prototype.onContentReady = function () {
                    debugger;
                    var that = this;
                    // aktuální filtr
                    //this.currentFilter = null;
                    // akce seznamu
                    this.actions.addRange({
                        actDetail: Gordic.Eko.Action.actionDetail({ run: function () { that.detail(); } }),
                    });
                    // menubar
                    this.menuBar(this.actions.createBar([{ action: this.actions.actDetail, primary: true, favorite: true }]));
                    // breadcrumbs
                    this.setBreadcrumbs([{ caption: "Banky", defaultAction: true }]);
                    // filtry
                    var filterFormDef = new Gordic.Forms.Form({ tabLabel: "Kompletní filtr" })
                        .addSection("")
                        .addRow("Popis").addField("gstringbox", Gordic.Prefabs.String.withOperators(), { name: "naz_ban" });
                    this.$filterForm = $.newDiv().appendTo(this.element)
                        .gfilterpanel(Gordic.Eko.Filters.getFilterParams([filterFormDef], 
                    // TODO: doplnit nějaké oblíbené filtry
                    ["XXXXXXXXX"], "buc_ptm_test", 
                    // TODO: má být nějaká *vlastní?
                    null, function (event, obj) {
                        // načtení dat podle filtrů
                        that.nacteniSeznamu(obj.filter);
                    }));
                    //test - nastavit do view "islTaks" objekt a nastavit prázdná data, aby k samovolnému načtení nedošlo a grid si "myslel", že již data má 
                    //this.viewBanky = new Gordic.Isl.View(Gordic.Isl.Banka.list({
                    //}), { data: [] as any });
                    // grid
                    $("<div class='SeznamBuc'>")
                        .css("height", "100%")
                        .appendTo(that.element)
                        .ggrid({
                        columnMode: "full",
                        //test přiřadit view do vlastnosti data: daného gridu
                        //data: that.viewBanky,
                        multi: true,
                        // obslužná akce pro doubleclick pro zobrazení detailu platby
                        defaultAction: that.actions.actDetail,
                        // TODO: nebo použít selection místo cellActivate?
                        cellActivate: function (ev, obj) {
                            // aktualizace stavu okna a náhledu podle aktuálně vybrané položky
                            if (obj != null && obj.cellInfo != null && obj.cellInfo.data != null) {
                                that.enable();
                                that.previewController.enable(true);
                                that.previewController.show(obj.cellInfo.data);
                            }
                            else {
                                // TODO: může tohle vůbec nastat?
                                that.previewController.enable(false);
                            }
                        },
                        // TODO: upravit:
                        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                        columns: WebClient.BucGrid.Banka.createGridFormat(that)
                    }).gautofit();
                    // náhled v pravém bočním panelu
                    this.element.gsidebar("option", { right: { width: 200, visible: false, leafsAutoHide: false } });
                    var previewPanelsDefinition = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                //linkProvider: function (loadParams) { return Gordic.WebApp.Utility.createCommandUrl(null, "OpenDetail", { ixp: loadParams.pla_ixp }, { ticketType: Gordic.Enums.TicketType.WithLoginAndContext }) },
                                viewId: "buc:Platba"
                            }),
                            Gordic.Previews.getFilePreviewTab({
                                ixpProvider: function (loadParams) { return loadParams.ixp; }
                            })
                        ]
                    };
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, previewPanelsDefinition);
                    this.previewController.registerPanel();
                    // oprávnění 
                    /*Gordic.Isl*/ this.isl.Banka.getServicePermissions()
                        .get()
                        .done(function (perm) {
                        // oprávnění (bez naplnění seznamu)
                        //that.permissions = perm;
                        // nastavení okna
                        that.enable();
                    });
                    // nastavení okna
                    //this.enable();
                };
                /**
                 * Naplnění seznamu plateb případů
                 *
                 * @param {any} [filterModel] aktuální filtry
                 */
                GSeznamTEST.prototype.nacteniSeznamu = function (filterModel) {
                    var that = this;
                    // načtení dat do gridu
                    if (filterModel === undefined || filterModel === null) {
                        this.$filterForm.gfilterpanel("applyFilter");
                        // nastavení okna
                        that.enable();
                    }
                    else {
                        // načtení dat do seznamu
                        filterModel = filterModel || {};
                        ;
                        var returnObj = {
                            data: null
                        };
                        // deferred objekt pro zřetězení otázek
                        var def = $.Deferred().resolve(returnObj).promise();
                        // obsluha jednotlivých fází
                        this.beginOperation("Načítám data");
                        def.then(function (returnObj) {
                            var def = $.Deferred();
                            // načtení dat
                            /*Gordic.Isl*/
                            that.isl.Banka.list(function (rq) { return { /*filters: that.currentFilter!*/}; })
                                .get()
                                .done(function (response) {
                                returnObj.data = response.data;
                                ////that.permissions = <Gordic.Buc.Interface.GBankaServicePermission>response.servicePermissions;
                                def.resolve(returnObj);
                            })
                                .fail(function () {
                                // operace nedopadla
                                def.reject();
                            });
                            return def.promise();
                        })
                            .then(function (returnObj) {
                            var def = $.Deferred();
                            // úprava dat
                            WebClient.BucGrid.Banka.modifyDto(returnObj.data)
                                .done(function (data) {
                                returnObj.data = data;
                                def.resolve(returnObj);
                            });
                            return def.promise();
                        })
                            .done(function (returnObj) {
                            // pohled
                            var view = new Gordic.Data.View(returnObj.data, { key: "ixp,radek_uhr" });
                            // nastavení dat a překreslení gridu
                            that.element.find(".SeznamBuc.ggrid").ggrid("setData", view);
                            // nastavení okna
                            that.enable();
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    }
                };
                /**
                 * Naplnění jednoho řádku do seznamu plateb
                 *
                 * @param {any} filterPK filtr pro aktualizaci dat
                 * @param {any} $grid (default = undefined) grid, který má být aktualizován (vždy je navíc aktualizován základní seznamový grid)
                 */
                GSeznamTEST.prototype.nacteniRadku = function (filterPK, $grid) {
                    if ($grid === void 0) { $grid = undefined; }
                    var that = this;
                    // volání obecné metody pro načtení řádku
                    WebClient.BucGrid.reloadRow(that, function (rq) { return that.isl.Banka.list(rq); }, WebClient.BucGrid.Banka.modifyDto, function () { return that.enable(); }, filterPK, $grid);
                };
                /**
                 * Zobrazení detailu platby případu
                 */
                GSeznamTEST.prototype.detail = function () {
                    var that = this;
                    // aktuální vybraná položka
                    var $grid = this.element.find(".SeznamBuc.ggrid");
                    var aktRadek = $grid.ggrid("activeRow");
                    if (aktRadek && !(aktRadek instanceof jQuery)) {
                        // otevření detailu
                        var $detailWindow = this.navigate(["Gordic.Buc.WebClient.GDetailTEST", { gridRemoteControl: new Gordic.Components.GridRC($grid) }], {
                            Ico: aktRadek.ico,
                            Ucs: aktRadek.ucs,
                            IxsEsu: aktRadek.ixs_esu,
                            Sbu: aktRadek.sbu
                        });
                        // obsluha aktivní operace na detailu
                        $.content($detailWindow).on(WebClient.BucDetail.triggerChange, function (retVal) {
                            //záznam byl změně, musí se načíst znovu
                            if (retVal != null && retVal.data && retVal.data.ixs_esu && retVal.data.sbu && retVal.data.ixs_esu != null && retVal.data.sbu != null) {
                                that.nacteniRadku({ ixs_esu: retVal.data.ixs_esu, sbu: retVal.data.sbu });
                            }
                        });
                    }
                };
                /**
                 * Nastavení prvků ve formuláři
                 */
                GSeznamTEST.prototype.enable = function () {
                    // aktuální platba
                    var aktZaznam = this.element.find(".SeznamBuc.ggrid").ggrid("activeRow");
                    // akce seznamu
                    this.actions.actDetail.updatePermission(aktZaznam === null ? { value: false } : null /*this.permissions?.LzeZobrazit*/);
                };
                GSeznamTEST = __decorate([
                    gcontent
                    //export class GSeznamTEST extends GContentBase {
                ], GSeznamTEST);
                return GSeznamTEST;
            }(Gordic.GContentBase));
            WebClient.GSeznamTEST = GSeznamTEST;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GSeznamTEST.js.map