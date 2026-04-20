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
    var Inu;
    (function (Inu) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            var GSeznamiObdobiDPH = /** @class */ (function (_super) {
                __extends(GSeznamiObdobiDPH, _super);
                function GSeznamiObdobiDPH() {
                    /**
                     * Ajax property
                     *
                     */
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.globals = Gordic.Inu.Globals.GInuGlobals;
                    _this.taskId = "actZdanovaciObdobiDPHTaskID";
                    return _this;
                }
                GSeznamiObdobiDPH.prototype.onContentReady = function () {
                    var _a;
                    var that = this;
                    //debugger;
                    //nastavení breadcrumbs
                    //this.setBreadcrumbs([
                    //    {
                    //        caption: that.title,
                    //    }
                    //]);
                    //nastavení akcí
                    this.DefinceAkci(that);
                    console.log("data: ", this.model);
                    //            $.extend(this.model_akt, this.model );
                    //nastavení menuBaru
                    //this.menuBar(this.actions.createBar(["actNovy*", "actDetail*", "actEditovat*", "actPrepocet*", "actPriznani*", "actDanDoloz*", "actTisk*"
                    //    , "actObcerstvit*"
                    //    , "actKontrolaKH*"
                    //    , "actObdobiKH*"]));
                    // defincice provideru
                    var provider = new Gordic.Data.Provider(function (a, b) {
                        return that.reload();
                    });
                    // nastaveni procesoru na view
                    that.view = new Gordic.Data.View(that.model, { processors: { provider: provider } });
                    // definice tabu
                    var tabObdobi = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        id: that.taskId + "myTabObdobi",
                        title: "jres:30250167".format((_a = this.GlobalParams.EkoParams) === null || _a === void 0 ? void 0 : _a.ROK),
                        opened: true,
                        menuBar: this.actions.createBar(["actNovy*", "actDetail*", "actEditovat*", "actPrepocet*", "actPriznani*", "actDanDoloz*", "actTisk*",
                            "actKontrolaKH*",
                            "actObdobiKH*",
                            "actObcerstvit*"
                        ])
                    });
                    // definicie gridu
                    that.$grid = $("<div>")
                        .css("height", "100%")
                        .appendTo(tabObdobi)
                        //.gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: that.view,
                        //showHeaderRow:false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                //var radek = that.currentRow
                                that.ZobrazDetail(ctx.cellInfo.data, false);
                            }
                        }),
                        selection: function (ev, objekt) {
                            debugger;
                            var radek = objekt.getSelection(false, true);
                            if (radek.length == 1) {
                                that.viewPriznani.requestData(radek[0].mesic_dph);
                                that.currentRow = radek[0];
                                that.viewPriznani.getLoadingPromise().
                                    done(function () {
                                    that.NastaveniAkci();
                                });
                            }
                        },
                        columns: that.createCols()
                    });
                    //that.VyrobKarty();
                    that.refresh();
                    // defincice provideru
                    var providerPriznani = new Gordic.Data.Provider(function (a, b) {
                        debugger;
                        return that.reloadPriznani();
                    });
                    // nastaveni procesoru na view
                    that.viewPriznani = new Gordic.Data.View(that.model, { processors: { provider: providerPriznani } });
                    // definice tabu
                    that.tabPriznani = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        id: that.taskId + "myTabPriznani",
                        title: "jres:30250158",
                        opened: true,
                        menuBar: this.actions.createBar(["actNovyPriznani*", "actProhlizeni*", "actKontrola*", "actTiskPriznani*", "actObcerstvitPriznani*"])
                    });
                    // definicie gridu
                    that.$gridPriznani = $("<div>")
                        .css("height", "100%")
                        .appendTo(that.tabPriznani)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: that.viewPriznani,
                        //showHeaderRow:false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                //var radek = that.currentRow
                                that.ZobrazDetailPriznani(ctx.cellInfo.data, ctx.cellInfo.data.mesic);
                            }
                        }),
                        columns: that.createColsPriznani()
                    });
                    //that.NastaveniAkci();
                    that.viewPriznani.requestData();
                    //this.dialogs.messageBox("jres:31750175", "jres:31750174", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 31750175 : Zavřít? //RC 31750174 : Neuložené změny budou ztraceny. Opravdu chcete pokračovat?
                    //    .on("yes" )
                    //    .on("close");
                    this.dialogs.messageBox("jres:30250124", //RC 30250124 : Dotaz
                    "jres:30250123", //RC 30250123 : Chcete provést kontrolu jednotlivých období DPH, zda v nich došlo ke změnám v souvislosti s Kontrolním hlášením?
                    GDlg.mbbYesNo, GDlg.mbiQuestion)
                        .on("yes", function () {
                        var _a;
                        (_a = that.actions.actKontrolaKH) === null || _a === void 0 ? void 0 : _a.run();
                        //that.beginOperation("jres:30250125") //RC 30250125 : Provádím kontrolu
                        //Gordic.Isl.InuObdobiDPH.kontrolaVlivuZmenNaHlaseniDPH().
                        //    get()
                        //    .done(function (result) {
                        //        debugger;
                        //        if (result && result.trim() != "")
                        //        that.dialogs.messageBox("", result);
                        //    })
                        //    .always(function () {
                        //        that.endOperation();
                        //    })
                    })
                        .on("close", function () {
                        debugger;
                        that.$grid.ggrid('focus');
                        //that.refresh(true);
                    });
                };
                /**
                 * Definice akci
                 * @param that
                 */
                GSeznamiObdobiDPH.prototype.DefinceAkci = function (that) {
                    var _a, _b, _c, _d, _e, _f;
                    this.actions.addRange({
                        actPrepocet: {
                            caption: "jres:30250016",
                            run: function () {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                //var radek = that.currentRow;
                                if (typeof radek !== undefined && radek != null)
                                    that.Prepocet(radek === null || radek === void 0 ? void 0 : radek.ico, radek === null || radek === void 0 ? void 0 : radek.rok, radek === null || radek === void 0 ? void 0 : radek.mesic);
                            }
                        },
                        actDetailDokladu: Gordic.Eko.Action.actionDetail({
                            enabled: false, run: function () {
                            }
                        }),
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: true, run: function () {
                                that.ZobrazDetail(null);
                            }
                        }),
                        actNovyPriznani: Gordic.Eko.Action.actionNovy({
                            enabled: false, run: function () {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                //var radek = that.currentRow;
                                if (typeof radek === undefined && radek == null)
                                    return;
                                that.ZobrazDetailPriznani(null, radek === null || radek === void 0 ? void 0 : radek.mesic, false);
                            }
                        }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: function () {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetail(radek);
                            }
                        }),
                        actEditovat: Gordic.Eko.Action.actionOpravit({
                            enabled: false, run: function () {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetail(radek, true);
                            }
                        }),
                        actPriznani: {
                            caption: "jres:30250008",
                            enabled: false,
                            run: function () {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazSeznamPriznani(radek);
                            }
                        },
                        actDanDoloz: GAction.createPrintAction({
                            name: "actTisk",
                            caption: "jres:30250111",
                            tooltip: "jres:30250112",
                            icon: "gi-print",
                            tema: "inu_ptm_dandolo",
                            enbled: false,
                            platnost: ((_b = (_a = this.GlobalParams.EkoParams) === null || _a === void 0 ? void 0 : _a.ROK) === null || _b === void 0 ? void 0 : _b.toString().trim()) + "12",
                            serverParameterMethod: "Gordic.Inu.WebClient.GUctPrintParameters:ServerParameterMethod",
                            enabled: false,
                            favorite: false,
                            parentContent: that,
                            reportStarting: function (rep) {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null) {
                                    rep.customDto = {
                                        Tema: rep.tema,
                                        IDSestavy: 140 /* SeznamObdobiDPH */,
                                        Mesic: radek === null || radek === void 0 ? void 0 : radek.mesic,
                                    };
                                }
                                else
                                    return $.Deferred().reject(false).promise();
                            }
                        }),
                        actKontrolaKH: {
                            caption: "jres:30250052",
                            run: function () {
                                //var radek = that.currentRow;
                                //var radek = Gordic.Eko.Grid.currentRow<Gordic.Inu.Interface.GSeznamObdobiDPHDto>(that.$grid);
                                //if (typeof radek !== undefined && radek != null)
                                that.beginOperation("jres:30250125"); //RC 30250125 : Provádím kontrolu
                                Gordic.Isl.InuObdobiDPH.kontrolaVlivuZmenNaHlaseniDPH().
                                    get()
                                    .done(function (result) {
                                    debugger;
                                    if (result && result.trim() != "")
                                        that.dialogs.messageBox("jres:30250171", result); //RC 30250171 : Výsledek kontroly
                                })
                                    .always(function () {
                                    that.endOperation();
                                });
                            }
                        },
                        actObdobiKH: {
                            caption: "jres:30250053",
                            run: function () {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.navigate("Gordic.Inu.WebClient.GSeznamObdobiKHDPH", { mesic: radek.mesic });
                            }
                        },
                        actTisk: GAction.createPrintAction({
                            name: "actTisk",
                            caption: "jres:30250018",
                            tooltip: "jres:30250018",
                            icon: "gi-print",
                            tema: "inu_ptm_dphsest",
                            enbled: false,
                            platnost: ((_d = (_c = this.GlobalParams.EkoParams) === null || _c === void 0 ? void 0 : _c.ROK) === null || _d === void 0 ? void 0 : _d.toString().trim()) + "12",
                            serverParameterMethod: "Gordic.Inu.WebClient.GUctPrintParameters:ServerParameterMethod",
                            reportFinished: function (event, repInfo) {
                                //if (repInfo && repInfo.customData!.IXB_NEW && (repInfo.customData!.IXB_NEW).trim() != "")                            
                            },
                            enabled: true,
                            favorite: false,
                            parentContent: that,
                            reportStarting: function (rep) {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null) {
                                    rep.customDto = {
                                        Tema: rep.tema,
                                        IDSestavy: 140 /* SeznamObdobiDPH */,
                                        Mesic: radek === null || radek === void 0 ? void 0 : radek.mesic,
                                    };
                                }
                                else
                                    return $.Deferred().reject(false).promise();
                            }
                        }),
                        actTiskPriznani: GAction.createPrintAction({
                            name: "actTisk",
                            caption: "jres:30250018",
                            tooltip: "jres:30250018",
                            icon: "gi-print",
                            tema: "inu_ptm_prizdph",
                            platnost: ((_f = (_e = this.GlobalParams.EkoParams) === null || _e === void 0 ? void 0 : _e.ROK) === null || _f === void 0 ? void 0 : _f.toString().trim()) + "12",
                            serverParameterMethod: "Gordic.Inu.WebClient.GUctPrintParameters:ServerParameterMethod",
                            reportFinished: function (event, repInfo) {
                            },
                            enabled: false,
                            favorite: false,
                            parentContent: that,
                            reportStarting: function (rep) {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null) {
                                    rep.customDto = {
                                        Tema: rep.tema,
                                        IDSestavy: 120 /* DetailPriznaniDPH */,
                                        TypPriznani: radek.typ_priz_dph,
                                        Mesic: radek === null || radek === void 0 ? void 0 : radek.mesic,
                                        PorCislo: radek.por_cislo
                                    };
                                }
                                else
                                    return $.Deferred().reject(false).promise();
                            }
                        }),
                        actObcerstvit: {
                            name: "actObcerstvit",
                            caption: "jres:30250039",
                            tooltip: "",
                            icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.refresh();
                            }
                        },
                        actObcerstvitPriznani: {
                            name: "actObcerstvit",
                            caption: "jres:30250039",
                            tooltip: "",
                            icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.refresh(true);
                            }
                        },
                        actProhlizeni: {
                            caption: "jres:30250055",
                            run: function () {
                                //var radek = that.currentRow
                                var radek = Gordic.Eko.Grid.currentRow(that.$gridPriznani);
                                if (typeof radek !== undefined && radek != null) {
                                    var radekO = Gordic.Eko.Grid.currentRow(that.$grid);
                                    if (typeof radekO !== undefined && radekO != null)
                                        that.ZobrazDetailPriznani(radek, radekO === null || radekO === void 0 ? void 0 : radekO.mesic, false);
                                }
                            }
                        },
                        actKontrola: {
                            caption: "jres:30250054",
                            run: function () {
                                var radek = Gordic.Eko.Grid.currentRow(that.$gridPriznani);
                                if (typeof radek !== undefined && radek != null) {
                                    that.Kontrola(radek.mesic);
                                }
                            }
                        },
                    });
                };
                /**
                 * Zobrazeni detailu priznani dle aktualniho radku
                 * @param content
                 * @param row
                 */
                GSeznamiObdobiDPH.prototype.ZobrazDetailPriznani = function (row, mesic, newRecord) {
                    var _this = this;
                    if (newRecord === void 0) { newRecord = false; }
                    var that = this;
                    if (this.closed)
                        return;
                    if (this.$grid === null)
                        return;
                    if (row != null && !newRecord) {
                        this.navigate("Gordic.Inu.WebClient.GDetailPriznaniDPH", { porCislo: row.por_cislo, mesic: row.mesic, typPriznani: row.typ_priz_dph, newRecord: false })
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                //reload(content);
                                //if (editace)
                                //that.view.requestData(undefined);
                            }
                        });
                    }
                    else {
                        var defer = $.Deferred();
                        that.beginOperation("jres:30250094"); //RC 30250094 : Načítám data
                        Gordic.Isl.InuPriznaniDPH.kontrolaNeprouctovanychDokladu({ mesic: mesic })
                            .get()
                            .done(function (result) {
                            debugger;
                            that.endOperation();
                            if (!result.Result) {
                                //this.navigate(Gordic.Inu.WebClient.GVyberNezauctovanychDokladu);
                                that.dialogs.showModalWindow(Gordic.Inu.WebClient.GNezauctovanechDoklady, { data: result.SeznamDokladu }, "jres:30250096", 800, 600, true) //RC 30250096 : Neproúčtované doklady
                                    .on("close", function (res) {
                                    var _a;
                                    if (((_a = that.GlobalParams.Params) === null || _a === void 0 ? void 0 : _a.BlokaceAkciDleKontrolDPH) == 0 /* AkceBlokovany */) {
                                        defer.reject().promise();
                                    }
                                    else {
                                        that.dialogs.messageBox({ title: "jres:30250087", html: "jres:30250088", buttons: GDlg.mbbYesNo, icon: GDlg.mbiQuestion }) //RC 30250088 : Data daňového období obsahují neproúčtované doklady, které by mohly ovlivnit stavy DPH. Umožnit i přesto provést přiznání DPH?
                                            .on("yes", function () {
                                            defer.resolve().promise();
                                        })
                                            .on("close", function () {
                                            if (defer.state() === "pending")
                                                defer.reject().promise();
                                        });
                                    }
                                    //if (res.returnValue && res.returnValue === true) {
                                    //    // znovunačtení seznamu (podle aktuálních filtrů)
                                    //    //Gordic.Uct.WebClient.Seznam.RefreshSeznamu(null);
                                    //}
                                });
                            }
                            else {
                                defer.resolve().promise();
                            }
                            //vyberDokladu();
                        }).always(function () { that.endOperation(); });
                        defer.done(function () {
                            _this.navigate("Gordic.Inu.WebClient.GDetailPriznaniDPH", { porCislo: 0, mesic: mesic, newRecord: true })
                                .on("close", function (res) {
                                if (res.returnValue && res.returnValue.refresh === true) {
                                    //reload(content);
                                    //if (editace)
                                    that.view.requestData(undefined);
                                }
                            });
                        });
                    }
                };
                /**
                 *  Definice sloupcu
                 *
                 * */
                GSeznamiObdobiDPH.prototype.createColsPriznani = function () {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "por_cislo",
                        caption: "jres:30250056",
                        width: 70
                    })
                        .addTextColumn({
                        name: "typ_priz_dph_txt",
                        caption: "jres:30250057",
                        width: 110
                    })
                        .addDateColumn({
                        name: "dat_priz_max",
                        caption: "jres:30250012",
                        width: 150
                    })
                        .addDateColumn({
                        name: "dat_priz_dph",
                        caption: "jres:30250058",
                        width: 160
                    })
                        .addDateColumn({
                        name: "dat_zjist_dod",
                        caption: "jres:30250059",
                        width: 165
                    });
                    return gridFormat;
                };
                /**
                 * Definice gridu
                 * */
                GSeznamiObdobiDPH.prototype.createCols = function () {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({ name: "typ_dph", caption: "jres:30250161", width: 30 }) //RC 30250161 : Stav
                        .addNumberColumn({ name: "mesic", caption: "jres:30250162", width: 40 }) //RC 30250162 : Měsíc
                        .addDateColumn({ name: "dat_priz_max", caption: "jres:30250163", width: 110 }) //RC 30250163 : Max. přiznání DPH
                        .addTextColumn({ name: "typ_priz_dph_txt", caption: "jres:30250164", width: 110 }) //RC 30250164 : Typ přiznání
                        .addDateColumn({ name: "dat_priz_dph", caption: "jres:30250165", width: 115 }) //RC 30250165 : Datum přiznání DPH
                        .addTextColumn({ name: "s_prep_dph_txt", caption: "jres:30250166", width: 100 }); //RC 30250166 : Stav přepočtu
                    return gridFormat;
                };
                /**
                 * Kontrola na neprouctovane doklady
                 * */
                GSeznamiObdobiDPH.prototype.Kontrola = function (mesic) {
                    var that = this;
                    var defer = $.Deferred();
                    that.beginOperation("jres:30250094"); //RC 30250094 : Načítám data
                    Gordic.Isl.InuPriznaniDPH.kontrolaNeprouctovanychDokladu({ mesic: mesic })
                        .get()
                        .done(function (result) {
                        debugger;
                        that.endOperation();
                        if (!result.Result) {
                            //this.navigate(Gordic.Inu.WebClient.GVyberNezauctovanychDokladu);
                            that.dialogs.showModalWindow(Gordic.Inu.WebClient.GNezauctovanechDoklady, { data: result.SeznamDokladu }, "jres:30250096", 800, 600, true); //RC 30250096 : Neproúčtované doklady
                        }
                        else {
                            that.dialogs.messageBox("Info", result.Message);
                            defer.resolve().promise();
                        }
                        //vyberDokladu();
                    }).always(function () { that.endOperation(); });
                };
                /**
                 * Znovunacteni dat
                 * */
                GSeznamiObdobiDPH.prototype.refresh = function (priznani) {
                    if (priznani === void 0) { priznani = false; }
                    var that = this;
                    if (priznani) {
                        that.viewPriznani.requestData();
                        that.viewPriznani.getLoadingPromise().
                            done(function () {
                            that.NastaveniAkci();
                        });
                    }
                    else {
                        that.view.requestData();
                        that.view.getLoadingPromise().
                            done(function () {
                            that.NastaveniAkci();
                        });
                    }
                };
                /**
                 *
                 *
                 * */
                GSeznamiObdobiDPH.prototype.VyrobKarty = function () {
                    var that = this;
                    //var obdForm = new Gordic.Forms.Form("L1M1S1 M-3-9-0 L-3-9-0 breaks-400-500")
                    //    //.addField("gdummyfield", "w-h", {
                    //    //    model: "radek",
                    //    //    name: "radek"
                    //    //})
                    //    .addRow("typ")
                    //    .addField("gnumberbox", "w-8",
                    //        { name: "typ_dph", disabled: true })
                    //    .addRow("Rok")
                    //    .addField("gnumberbox", "w-8",
                    //        { name: "rok", disabled: true })
                    //    .addRow("Měsíc")
                    //    .addField("gnumberbox", "w-8",
                    //        { name: "mesic", disabled: true })
                    //    .addRow("datum")
                    //    .addField("gstringbox", "w-8",
                    //        { name: "dat_priz_max", disabled: true })
                    //var itemtemplate_mesic = "<div style='border:1px solid LightGray; padding: 5px; width:230px; height:300px;'>" +
                    //    //"<div style='background-color: {barva_txt}; padding: 5px;'>" +
                    //    "<div style='padding: 5px;'>" +
                    //    "<h3><i class='fa {sl1}' style='color: gray;' aria-hidden='true'></i>{mesic}</h3>" +
                    //    "</div><div style='width:219px; padding: 5px;'>" +
                    //    //"<h3 style='color: {aktivita_color};'>{aktivita_txt}</h3>" +
                    //    "<p>Stav: {typ_dph}</p>";
                    //    "<p>Max. přiznání DPH: {dat_priz_max_t}</p>" +
                    //    "<p>Typ přiznání: {typ_priz_dph_txt}</p>" +
                    //    "<p>Datum přiznání: {dat_priz_dph_t}</p>" +
                    //    "<p>Stav přepočtu: {s_prep_dph_txt}</p><br>" +                
                    //    "</div></div>";
                    this.elem = $("<div>").appendTo(that.element);
                    var karty = this.elem.gcardpanel({
                        editable: true,
                        //title: "Seznam období ",
                        itemTemplate: function (radek) {
                            var stav = "jres:30250049"; //RC 30250049 : Otevřené
                            var colorStav = "g-state-info";
                            if (radek.s_dph == 10) {
                                stav = "jres:30250050"; //RC 30250050 : Zpětně otevřené
                                colorStav = "g-state-warning";
                            }
                            else if (radek.s_dph == 20) {
                                stav = "jres:30250051"; //RC 30250051 : Uzavřené
                                colorStav = "g-state-success";
                            }
                            var result = "<div class='items gcard' style='display: block; float: left; background:#ffffff height:200px;'>" +
                                "<div class='g-card'>" +
                                "<div class='g-rap-card'>" +
                                "<div class='g-card-header'>" +
                                "<div class='g-card-header-text gtooltip'>" + radek.mesic + "&nbsp;&nbsp;&nbsp;<span class='" + colorStav + "' >" + stav + "</span></div>" +
                                "</div>" +
                                "<div class='g-card-main'></br>"; //+
                            //"<div class='" + colorStav + "' ><strong>" + stav + "</strong></div></br>"; 
                            //var result = "<div style='border:1px solid LightGray; padding: 5px; width:230px; height:200px;'>" +
                            //    "<div style='padding: 5px;'>" +
                            //    "<h3><i class='fa ' style='color: gray;' aria-hidden='true'></i>" + radek.mesic + "<span class='" + colorStav +"'>&nbsp;&nbsp;&nbsp; "+ stav+"</span></h3>" +
                            //    "</div><div style='width:219px; padding: 5px;'>";
                            result += "<div>jres:30250046".format(Gordic.Templates.Formatters.date(radek.dat_priz_max)) + "</div>" + //RC 30250046 : Max. přiznání DPH: {0}                        
                                "<p><strong>" + radek.typ_priz_dph_txt + "</strong></p>";
                            var color = "g-state-success";
                            if (radek.s_prep_dph == 0)
                                color = "g-state-error";
                            result += "<div><b class='" + color + " g-state-text '>" + radek.s_prep_dph_txt + "</b></div></br>"; //RC 30250048 : stav přepočtu: {0}
                            //result += "<p>jres:30250046".format(Gordic.Templates.Formatters.date(radek.dat_priz_max)) + "</p>" + //RC 30250046 : Max. přiznání DPH: {0}                        
                            //    "<p><b>" + radek.typ_priz_dph_txt + "</b></p>";
                            //"<p>Typ přiznání:" + radek.typ_priz_dph_txt + "</p>";
                            if (radek.dat_priz_dph !== null)
                                //result += "<p><b>"+radek.dat_priz_dph + "</b></p>"; //RC 30250047 : Datum přiznání: {0}
                                result += "<div>jres:30250047".format(Gordic.Templates.Formatters.date(radek.dat_priz_dph)) + "</div>"; //RC 30250047 : Datum přiznání: {0}
                            //result += "<p>jres:30250047".format(Gordic.Templates.Formatters.date(radek.dat_priz_dph)) + "</p>"; //RC 30250047 : Datum přiznání: {0}
                            var color = "g-state-success";
                            //if (radek.s_prep_dph == 0)
                            //    color = "g-state-error";
                            ////style = 'color: " + color + ";' 
                            ////i class='fa fa-check-circle " + color + " g-state-text ' aria - hidden='true' > </i>
                            ////jres: 30250048".format(radek.s_prep_dph_txt as any)
                            //result += "<div><b class='" + color + " g-state-text '>" + radek.s_prep_dph_txt + "</b></div></br>" + //RC 30250048 : stav přepočtu: {0}
                            result += "</div></div></div></div>";
                            //result += "<p><b class='" + color + " g-state-text '>"+radek.s_prep_dph_txt  + "</b></p><br>" + //RC 30250048 : stav přepočtu: {0}
                            //    "</div></div>";
                            return result;
                        },
                        data: that.view,
                        //form: obdForm,
                        createTab: false,
                        defaultSelected: true,
                        add: function (ev, data) {
                            var panel = this;
                            console.log("add");
                            that.ZobrazDetail(null);
                        },
                        edit: function (ev, data) {
                            var panel = this;
                            console.log("edit");
                            that.ZobrazDetail(data, true);
                        },
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                that.ZobrazDetail(ctx.item.data);
                            }
                        }),
                        selection: function (ev, data) {
                            that.currentRow = data;
                            that.NastaveniAkci();
                        }
                    });
                };
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                GSeznamiObdobiDPH.prototype.NastaveniAkci = function () {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
                    var dataFound = this.view.getCount() > 0;
                    var tooltip = dataFound ? "" : "jres:30250113"; //RC 30250113 : Období nenalezeno
                    if (typeof this.currentRow === "undefined" || this.currentRow.typ_priz_dph == 0)
                        (_a = this.actions.actEditovat) === null || _a === void 0 ? void 0 : _a.update({ enabled: dataFound, tooltip: tooltip });
                    else
                        (_b = this.actions.actEditovat) === null || _b === void 0 ? void 0 : _b.update({ enabled: false, tooltip: "jres:30250115" }); //RC 30250115 : Již podáno přiznání
                    (_c = this.actions.actDetail) === null || _c === void 0 ? void 0 : _c.update({ enabled: dataFound, tooltip: tooltip });
                    (_d = this.actions.actPrepocet) === null || _d === void 0 ? void 0 : _d.update({ enabled: dataFound, tooltip: tooltip });
                    (_e = this.actions.actPriznani) === null || _e === void 0 ? void 0 : _e.update({ enabled: dataFound, tooltip: tooltip });
                    // KH DPH pouze pro rok 2016 a vyse
                    debugger;
                    (_f = this.actions.actKontrolaKH) === null || _f === void 0 ? void 0 : _f.update({ enabled: dataFound && ((_g = this.GlobalParams.EkoParams) === null || _g === void 0 ? void 0 : _g.ROK) >= 2016, visible: ((_h = this.GlobalParams.EkoParams) === null || _h === void 0 ? void 0 : _h.ROK) >= 2016 });
                    (_j = this.actions.actObdobiKH) === null || _j === void 0 ? void 0 : _j.update({ enabled: dataFound && ((_k = this.GlobalParams.EkoParams) === null || _k === void 0 ? void 0 : _k.ROK) >= 2016, visible: ((_l = this.GlobalParams.EkoParams) === null || _l === void 0 ? void 0 : _l.ROK) >= 2016 });
                    // tisk
                    if ((_m = this.GlobalParams.Params) === null || _m === void 0 ? void 0 : _m.PovoleniTisku) {
                        (_o = this.actions.actTisk) === null || _o === void 0 ? void 0 : _o.update({ enabled: dataFound, tooltip: tooltip });
                    }
                    else
                        (_p = this.actions.actTisk) === null || _p === void 0 ? void 0 : _p.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    // danova dolozenost
                    (_q = this.actions.actDanDoloz) === null || _q === void 0 ? void 0 : _q.update({ enabled: dataFound, tooltip: tooltip });
                    // Priznani
                    //---------
                    var dataFound = this.viewPriznani.getCount() > 0;
                    var tooltip = dataFound ? "" : "jres:30250114"; //RC 30250114 : Přiznání nenalezeno
                    // tisk
                    if ((_r = this.GlobalParams.Params) === null || _r === void 0 ? void 0 : _r.PovoleniTisku) {
                        (_s = this.actions.actTiskPriznani) === null || _s === void 0 ? void 0 : _s.update({ enabled: dataFound, tooltip: tooltip });
                    }
                    else
                        (_t = this.actions.actTiskPriznani) === null || _t === void 0 ? void 0 : _t.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    // prohlizeni
                    (_u = this.actions.actProhlizeni) === null || _u === void 0 ? void 0 : _u.update({ enabled: dataFound, tooltip: tooltip });
                    // nove podani
                    (_v = this.actions.actNovyPriznani) === null || _v === void 0 ? void 0 : _v.updatePermission(this.priznatPermit);
                };
                /**
                 *  Znovunacteni dat zdanovaciho obdobi
                 *
                 */
                GSeznamiObdobiDPH.prototype.reload = function () {
                    var that = this;
                    debugger;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    Gordic.Isl.InuObdobiDPH.list()
                        .get()
                        .done(function (result) {
                        debugger;
                        return def.resolve(result);
                    })
                        .always(function () { });
                    return def.promise();
                };
                /**
                *  Znovunacteni dat priznani
                *
                */
                GSeznamiObdobiDPH.prototype.reloadPriznani = function () {
                    var that = this;
                    debugger;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                    if (typeof radek === undefined || radek == null)
                        return def.resolve().promise();
                    Gordic.Isl.InuPriznaniDPH.list({ mesic: radek.mesic })
                        .get()
                        .done(function (result) {
                        debugger;
                        Gordic.Isl.InuPriznaniDPH.povoleniPriznani({ mesicPriznani: radek === null || radek === void 0 ? void 0 : radek.mesic })
                            .get()
                            .done(function (permit) {
                            that.priznatPermit = permit;
                            that.tabPriznani.gtab({ title: "jres:30250169".format(radek === null || radek === void 0 ? void 0 : radek.rok, radek === null || radek === void 0 ? void 0 : radek.mesic) }); //RC 30250169 : Seznam přiznání DPH - {0} / {1}
                            return def.resolve(result);
                        })
                            .fail(function () { return def.reject; });
                        return def.resolve(result);
                    })
                        .fail(function () { return def.reject; })
                        .always(function () { that.NastaveniAkci(); });
                    return def.promise();
                };
                /**
                 *  Prepocet stavu
                 *
                 * */
                GSeznamiObdobiDPH.prototype.Prepocet = function (ico, rok, mesic) {
                    var that = this;
                    var frmPrepocet = new Gordic.Forms.Form("L1M1S1 M-3-9-0 L-3-9-0 breaks-400-500")
                        //.addField("gdummyfield", "w-h", {
                        //    model: "radek",
                        //    name: "radek"
                        //})
                        .addRow("jres:30250040") //RC 30250040 : IČO
                        .addField("gstringbox", "w-8", { name: "ico", disabled: true })
                        .addRow("jres:30250041") //RC 30250041 : Rok
                        .addField("gnumberbox", "w-8", { name: "rok", disabled: true })
                        .addRow("jres:30250042") //RC 30250042 : Měsíc
                        .addField("gnumberbox", "w-8", { name: "mesic", disabled: true });
                    GDlg.simpleForm("jres:30250060", frmPrepocet, { ico: ico, rok: rok, mesic: mesic }, { width: 300, height: 300 }) //RC 30250060 : Přepočet stavů DPH
                        .on("close", function (ev, data) {
                        if (data) {
                            that.beginOperation("jres:30250043".format(mesic)); //RC 30250043 : Přepočítávám stavy období {0}
                            Gordic.Isl.InuObdobiDPH.prepocetStavuDPH({ ico: ico, rok: rok, mesic: mesic })
                                .get()
                                .done(function () {
                                that.endOperation();
                                that.showFlash("jres:30250044".format(mesic), "success", 2000); //RC 30250044 : Stavy období {0} přepočteny
                                that.view.requestData(undefined);
                            })
                                .fail(function () {
                                //that.showFlash("jres:30250044", "error", 2000);
                            })
                                .always(function () {
                                that.endOperation();
                            });
                        }
                    });
                };
                /**
                 * Zobrazeni seznamu priznani DPH dle aktualniho radku
                 * @param content
                 * @param row
                 */
                GSeznamiObdobiDPH.prototype.ZobrazSeznamPriznani = function (row) {
                    var that = this;
                    if (this.closed)
                        return;
                    if (this.$grid === null)
                        return;
                    if (row != null) {
                        this.navigate("Gordic.Inu.WebClient.GSeznamPriznaniDPH", { rok: row.rok, mesic: row.mesic, identifikator: row.ico });
                    }
                    else
                        this.dialogs.messageBox("jres:30250022", //RC 30250022 : Upozornění
                        "jres:30250023"); //RC 30250023 : Není vybrán žádný řádek!
                };
                /**
                 * Zobrazeni okna dle aktualniho radku
                 * @param content
                 * @param row
                 */
                GSeznamiObdobiDPH.prototype.ZobrazDetail = function (row, editace) {
                    if (editace === void 0) { editace = false; }
                    var that = this;
                    if (this.closed)
                        return;
                    if (this.$grid === null)
                        return;
                    if (row != null) {
                        this.navigate("Gordic.Inu.WebClient.GDetailObdobiDPH", { rok: row.rok, mesic: row.mesic, editace: editace })
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                //reload(content);
                                if (editace)
                                    that.view.requestData(undefined);
                            }
                        });
                    }
                    else
                        this.navigate("Gordic.Inu.WebClient.GDetailObdobiDPH", { rok: 0, mesic: 0, editace: true })
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                //that.reload(undefined);
                                that.view.requestData(undefined);
                            }
                        });
                    //        this.dialogs.messageBox("jres:30250022", //RC 30250022 : Upozornění
                    //            "jres:30250023");  //RC 30250023 : Není vybrán žádný řádek!
                };
                GSeznamiObdobiDPH = __decorate([
                    gcontent
                ], GSeznamiObdobiDPH);
                return GSeznamiObdobiDPH;
            }(Gordic.GContentBase));
            WebClient.GSeznamiObdobiDPH = GSeznamiObdobiDPH;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GSeznamiObdobiDPH.js.map