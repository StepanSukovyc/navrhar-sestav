"use strict";
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
            let GSeznamObdobiDPH = class GSeznamObdobiDPH extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actPriznaniDPH";
                    this.uid = "GSeznamObdobiDPH#";
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                //taskId = "actPriznaniDPHTaskID";
                onContentReady() {
                    var that = this;
                    //nastavení akcí
                    this.DefinceAkci(that);
                    // defincice provideru
                    let provider = new Gordic.Data.Provider((a, b) => {
                        return that.reload();
                    });
                    // nastaveni procesoru na view
                    that.view = new Gordic.Data.View(that.model, { processors: { provider: provider } });
                    // definice menu tisku
                    let tisk = {
                        id: "actTiskSep",
                        type: "static",
                        caption: "jres:30250469", //RC 30250469 : Tisk
                        tooltip: "jres:30250469", //RC 30250469 : Tisk
                        icon: "gi-print",
                        favorite: true,
                        //enabled: false,
                        children: [
                            {
                                action: that.actions["actDanDoloz"],
                            },
                            {
                                action: that.actions["actTisk"],
                            },
                        ]
                    };
                    // definice tabu
                    var tabObdobi = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        id: that.taskId + "myTabObdobi",
                        title: "jres:30250464", //RC 30250464 : Období DPH
                        opened: true,
                        menuBar: this.actions.createBar(["actNovy*", "actDetail*", "actEditovat*", "actPrepocet*", "actPriznani*", "actKontrola*",
                            "actDanDoloz*",
                            "actTisk*"
                            //, tisk
                            ,
                            "actKontrolaKH*",
                            "actObdobiKH*",
                            "actObcerstvit"
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
                        name: "tabObdobiHorni",
                        //showHeaderRow:false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                //var radek = that.currentRow
                                that.ZobrazDetail(ctx.cellInfo.data, that.globals.Globalni_Parametry.PovoleniEditaceObdobiDPH);
                            }
                        }),
                        selection: function (ev, objekt) {
                            var radek = objekt.getSelection(false, true);
                            if (radek.length == 1) {
                                that.viewPriznani.requestData(radek[0].mesic_dph);
                                that.currentRow = radek[0];
                                that.viewPriznani.getLoadingPromise().
                                    done(() => {
                                    that.NastaveniAkci();
                                });
                            }
                        },
                        columns: that.createCols()
                    });
                    //that.VyrobKarty();
                    that.refresh();
                    // Fokus na seznammu
                    var focusFunc = function () {
                        that.$grid.ggrid('focus'); // nastavení focusu na grid
                        that.view.off('change.focus'); // odvázání události z ISL view
                    };
                    that.view.on('change.focus', focusFunc); // při změně ISL view se naváže funkce focusFunc
                    // definice provideru
                    let providerPriznani = new Gordic.Data.Provider((a, b) => {
                        return that.reloadPriznani();
                    });
                    // nastaveni procesoru na view
                    that.viewPriznani = new Gordic.Data.View(that.model, { processors: { provider: providerPriznani } });
                    // definice tabu
                    that.tabPriznani = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        id: that.taskId + "myTabPriznani",
                        title: "jres:30250158", //RC 30250158 : Přiznání za období
                        opened: true,
                        menuBar: this.actions.createBar(["actNovyPriznani*", "actProhlizeni*", "actTiskPriznani*", "actObcerstvitPriznani"])
                    });
                    // definicie gridu
                    that.$gridPriznani = $("<div>")
                        .css("height", "100%")
                        .appendTo(that.tabPriznani)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: that.viewPriznani,
                        name: "tabObdobiDolni",
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
                    that.viewPriznani.requestData();
                    //this.dialogs.messageBox("jres:30250124", //RC 30250124 : Dotaz
                    //     "jres:30250123", //RC 30250123 : Chcete provést kontrolu jednotlivých období DPH, zda v nich došlo ke změnám v souvislosti s Kontrolním hlášením?
                    //    GDlg.mbbYesNo, GDlg.mbiQuestion)
                    //    .on("yes", () => {
                    //        that.actions.actKontrolaKH?.run();
                    //    })
                    //    .on("close", () => {
                    //        debugger;
                    //        that.$grid.ggrid('focus');
                    //    })
                    //    ;
                }
                /**
                 * Definice akci
                 * @param that
                 */
                DefinceAkci(that) {
                    this.actions.addRange({
                        actPrepocet: {
                            caption: "jres:30250016", //RC 30250016 : Přepočet stavů DPH
                            tooltip: "jres:30250485", //RC 30250485 : Přepočet stavů DPH z účetních zápisů pro vybrané období DPH
                            run: () => {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                //var radek = that.currentRow;
                                if (typeof radek !== undefined && radek != null)
                                    that.Prepocet(radek?.ico, radek?.rok, radek?.mesic);
                            }
                        },
                        actDetailDokladu: Gordic.Eko.Action.actionDetail({
                            enabled: false, run: () => {
                            }
                        }),
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: true, visible: false,
                            run: function () {
                                that.ZobrazDetail(null);
                            }
                        }),
                        actNovyPriznani: Gordic.Eko.Action.actionNovy({
                            enabled: false,
                            caption: "jres:30250472" //RC 30250472 : Nové přiznání
                            ,
                            tooltip: "jres:30250471" //RC 30250471 : Nové přiznání k DPH
                            ,
                            run: function () {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                //var radek = that.currentRow;
                                if (typeof radek === undefined && radek == null)
                                    return;
                                that.ZobrazDetailPriznani(null, radek?.mesic, false);
                            }
                        }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: () => {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetail(radek, that.globals.Globalni_Parametry.PovoleniEditaceObdobiDPH);
                            }
                        }),
                        actEditovat: Gordic.Eko.Action.actionOpravit({
                            enabled: false,
                            visible: false,
                            run: function () {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetail(radek, that.globals.Globalni_Parametry.PovoleniEditaceObdobiDPH);
                            }
                        }),
                        actPriznani: {
                            caption: "jres:30250008", //RC 30250008 : Přiznání
                            visible: false,
                            enabled: false,
                            run: () => {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazSeznamPriznani(radek);
                            }
                        },
                        actDanDoloz: GAction.createPrintAction({
                            name: "actTisk",
                            caption: "jres:30250112", //RC 30250112 : Daňová doloženost
                            tooltip: "jres:30250112", //RC 30250112 : Daňová doloženost
                            icon: "gi-print",
                            tema: "inu_ptm_dandolo",
                            enbled: false,
                            platnost: this.GlobalParams.EkoParams?.ROK?.toString().trim() + "12",
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
                                        IDSestavy: 140 /* GEIDSestavy.SeznamObdobiDPH */,
                                        Mesic: radek?.mesic,
                                    };
                                }
                                else
                                    return $.Deferred().reject(false).promise();
                            }
                        }),
                        actKontrolaKH: {
                            caption: "jres:30250052",
                            visible: false,
                            run: () => {
                                //var radek = that.currentRow;
                                //var radek = Gordic.Eko.Grid.currentRow<Gordic.Inu.Interface.GSeznamObdobiDPHDto>(that.$grid);
                                //if (typeof radek !== undefined && radek != null)
                                that.beginOperation("jres:30250125"); //RC 30250125 : Provádím kontrolu
                                Gordic.Isl.InuObdobiDPH.kontrolaVlivuZmenNaHlaseniDPH().
                                    get()
                                    .done(function (result) {
                                    if (result && result.seznam_obdobi.trim() != "")
                                        that.dialogs.messageBox("jres:30250171", result.seznam_obdobi); //RC 30250171 : Výsledek kontroly
                                })
                                    .always(function () {
                                    that.endOperation();
                                });
                            }
                        },
                        actObdobiKH: {
                            caption: "jres:30250053",
                            visible: false,
                            run: () => {
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
                            platnost: this.GlobalParams.EkoParams?.ROK?.toString().trim() + "12",
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
                                        IDSestavy: 140 /* GEIDSestavy.SeznamObdobiDPH */,
                                        Mesic: radek?.mesic,
                                    };
                                }
                                else
                                    return $.Deferred().reject(false).promise();
                            }
                        }),
                        actTiskPriznani: GAction.createPrintAction({
                            name: "actTisk",
                            caption: "jres:30250018", //RC 30250018 : Tisk
                            tooltip: "jres:30250018", //RC 30250018 : Tisk
                            icon: "gi-print",
                            tema: "inu_ptm_prizdph",
                            platnost: this.GlobalParams.EkoParams?.ROK?.toString().trim() + "12",
                            serverParameterMethod: "Gordic.Inu.WebClient.GUctPrintParameters:ServerParameterMethod",
                            reportFinished: function (event, repInfo) {
                            },
                            enabled: false,
                            favorite: false,
                            parentContent: that,
                            reportStarting: function (rep) {
                                var radek = Gordic.Eko.Grid.currentRow(that.$gridPriznani);
                                if (typeof radek !== undefined && radek != null) {
                                    rep.customDto = {
                                        Tema: rep.tema,
                                        IDSestavy: 120 /* GEIDSestavy.DetailPriznaniDPH */,
                                        TypPriznani: radek.typ_priz_dph,
                                        Mesic: radek?.mesic,
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
                        actProhlizeni: Gordic.Eko.Action.actionDetail({
                            run: () => {
                                //var radek = that.currentRow
                                var radek = Gordic.Eko.Grid.currentRow(that.$gridPriznani);
                                if (typeof radek !== undefined && radek != null) {
                                    var radekO = Gordic.Eko.Grid.currentRow(that.$gridPriznani);
                                    if (typeof radekO !== undefined && radekO != null)
                                        that.ZobrazDetailPriznani(radek, radekO?.mesic, false);
                                }
                            }
                        }),
                        actKontrola: {
                            caption: "jres:30250054", //RC 30250054 : Kontrola dokladů
                            tooltip: "jres:30250484", //RC 30250484 : Kontrola neproúčtovaných dokladů v daném období DPH
                            run: () => {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null) {
                                    that.Kontrola(radek.mesic);
                                }
                            }
                        },
                    });
                }
                /**
                 * Zobrazeni detailu priznani dle aktualniho radku
                 * @param content
                 * @param row
                 */
                ZobrazDetailPriznani(row, mesic, newRecord = false) {
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
                            .done((result) => {
                            that.endOperation();
                            if (!result.Result) {
                                //this.navigate(Gordic.Inu.WebClient.GVyberNezauctovanychDokladu);
                                that.dialogs.showModalWindow(Gordic.Inu.WebClient.GNezauctovanechDoklady, { data: result.SeznamDokladu, uid: "GNezauctovanechDokladyID#" }, "jres:30250096", 800, 600, true) //RC 30250096 : Neproúčtované doklady
                                    .on("close", function (res) {
                                    if (that.GlobalParams.Params?.BlokaceAkciDleKontrolDPH == 0 /* Interface.GETypBlokaceDleStavuKontrolyDPH.AkceBlokovany */) {
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
                        }).always(() => { that.endOperation(); });
                        defer.done(() => {
                            this.navigate("Gordic.Inu.WebClient.GDetailPriznaniDPH", { porCislo: 0, mesic: mesic, newRecord: true })
                                .on("close", function (res) {
                                if (res.returnValue && res.returnValue.refresh === true) {
                                    //reload(content);
                                    //if (editace)
                                    that.view.requestData(undefined);
                                }
                            });
                        });
                    }
                }
                /**
                 *  Definice sloupcu
                 *
                 * */
                createColsPriznani() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "por_cislo",
                        caption: "jres:30250056", //RC 30250056 : Pořadí
                        width: 60
                    })
                        .addTextColumn({
                        name: "typ_priz_dph_txt",
                        caption: "jres:30250057", //RC 30250057 : Typ přiznání
                        width: 130
                    })
                        .addDateColumn({
                        name: "dat_priz_max",
                        caption: "jres:30250012", //RC 30250012 : Max. přiznání DPH
                        width: 160
                    })
                        .addDateColumn({
                        name: "dat_priz_dph",
                        caption: "jres:30250058", //RC 30250058 : Datum přiznání DPH
                        width: 160
                    })
                        .addDateColumn({
                        name: "dat_zjist_dod",
                        caption: "jres:30250059", //RC 30250059 : Zjištění pro dod. př.
                        width: 165
                    });
                    return gridFormat;
                }
                /**
                 * Definice gridu
                 * */
                createCols() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({ name: "typ_dph", caption: "jres:30450027", width: 30 }) //RC 30450027 : S 
                        .addTextColumn({ name: "typ_dph_txt", caption: "jres:30450028", width: 130 }) //RC 30450028 : Stav období
                        .addNumberColumn({ name: "mesic", caption: "jres:30250162", width: 70 }) //RC 30250162 : Měsíc
                        .addNumberColumn({ name: "rok", caption: "jres:30450008", width: 70 }) //RC 30450008 : Rok
                        .addDateColumn({ name: "dat_priz_max", caption: "jres:30250163", width: 160 }) //RC 30250163 : Max. přiznání DPH
                        .addTextColumn({ name: "typ_priz_dph_txt", caption: "jres:30250164", width: 130 }) //RC 30250164 : Typ přiznání DPH
                        .addDateColumn({ name: "dat_priz_dph", caption: "jres:30250165", width: 160 }) //RC 30250165 : Datum přiznání DPH
                        .addTextColumn({ name: "s_prep_dph_txt", caption: "jres:30250166", width: 120 }); //RC 30250166 : Stavy DPH
                    return gridFormat;
                }
                /**
                 * Kontrola na neprouctovane doklady
                 * */
                Kontrola(mesic) {
                    var that = this;
                    var defer = $.Deferred();
                    that.beginOperation("jres:30250094"); //RC 30250094 : Načítám data
                    Gordic.Isl.InuPriznaniDPH.kontrolaNeprouctovanychDokladu({ mesic: mesic })
                        .get()
                        .done((result) => {
                        that.endOperation();
                        if (!result.Result) {
                            //this.navigate(Gordic.Inu.WebClient.GVyberNezauctovanychDokladu);
                            that.dialogs.showModalWindow(Gordic.Inu.WebClient.GNezauctovanechDoklady, { data: result.SeznamDokladu, uid: "GNezauctovanechDokladyID#" }, "jres:30250096", 800, 600, true); //RC 30250096 : Neproúčtované doklady
                        }
                        else {
                            that.dialogs.messageBox("Info", result.Message);
                            defer.resolve().promise();
                        }
                        //vyberDokladu();
                    }).always(() => { that.endOperation(); });
                }
                /**
                 * Znovunacteni dat
                 * */
                refresh(priznani = false) {
                    var that = this;
                    if (priznani) {
                        that.viewPriznani.requestData();
                        that.viewPriznani.getLoadingPromise().
                            done(() => {
                            that.NastaveniAkci();
                        });
                    }
                    else {
                        that.view.requestData();
                        that.view.getLoadingPromise().
                            done(() => {
                            that.NastaveniAkci();
                        });
                    }
                }
                /**
                 *
                 *
                 * */
                VyrobKarty() {
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
                        itemTemplate: (radek) => {
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
                        //add: function (ev, data: Gordic.Inu.Interface.GSeznamObdobiDPHDto) {
                        //    var panel = this;
                        //    console.log("add");
                        //    that.ZobrazDetail(null);
                        //},
                        //edit: function (ev, data: Gordic.Inu.Interface.GSeznamObdobiDPHDto) {
                        //    var panel = this;
                        //    console.log("edit");
                        //    that.ZobrazDetail(data as any,true);
                        //},
                        //defaultAction: new GAction({
                        //        name: "gridRowSelectedAct",
                        //        run: function (ev, ctx) {
                        //            that.ZobrazDetail(ctx.item.data as any);
                        //        }
                        //    }),             
                        selection: function (ev, data) {
                            that.currentRow = data;
                            that.NastaveniAkci();
                        }
                    });
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci() {
                    var dataFound = this.view.getCount() > 0;
                    var tooltip = dataFound ? "" : "jres:30250113"; //RC 30250113 : Období nenalezeno
                    //if (typeof this.currentRow === "undefined" || this.currentRow.typ_priz_dph == 0)
                    //    this.actions.actEditovat?.update({ enabled: dataFound, tooltip: tooltip });
                    //else
                    //    this.actions.actEditovat?.update({ enabled: false, tooltip: "jres:30250115" }); //RC 30250115 : Již podáno přiznání
                    this.actions.actDetail?.update({ enabled: dataFound, tooltip: tooltip });
                    this.actions.actPrepocet?.update({ enabled: (dataFound && this.globals.Globalni_Parametry.PovoleniProvadeniPrepoctuStavuDPH), tooltip: tooltip === "" ? "jres:30250485" : tooltip }); //RC 30250485 : Přepočet stavů DPH z účetních zápisů pro vybrané období DPH
                    this.actions.actPriznani?.update({ enabled: (dataFound && this.globals.Globalni_Parametry.PovoleniProvadetPriznaniDPH), tooltip: tooltip });
                    // KH DPH pouze pro rok 2016 a vyse
                    //this.actions.actKontrolaKH?.update({ enabled: dataFound && this.GlobalParams.EkoParams?.ROK! >= 2016, visible: this.GlobalParams.EkoParams?.ROK! >= 2016 });
                    //this.actions.actObdobiKH?.update({ enabled: dataFound && this.GlobalParams.EkoParams?.ROK! >= 2016, visible: this.GlobalParams.EkoParams?.ROK! >= 2016 });
                    // tisk
                    if (this.GlobalParams.Params?.PovoleniTisku) {
                        this.actions.actTisk?.update({ enabled: dataFound, tooltip: tooltip });
                    }
                    else
                        this.actions.actTisk?.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    // danova dolozenost
                    this.actions.actDanDoloz?.update({ enabled: dataFound, tooltip: tooltip });
                    // Priznani
                    //---------
                    var dataFound = this.viewPriznani.getCount() > 0;
                    var tooltip = dataFound ? "" : "jres:30250114"; //RC 30250114 : Přiznání nenalezeno
                    // tisk
                    if (this.GlobalParams.Params?.PovoleniTisku) {
                        this.actions.actTiskPriznani?.update({ enabled: dataFound, tooltip: tooltip });
                    }
                    else
                        this.actions.actTiskPriznani?.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    // prohlizeni
                    this.actions.actProhlizeni?.update({ enabled: dataFound, tooltip: tooltip });
                    // nove podani
                    //this.actions.actNovyPriznani?.updatePermission(this.priznatPermit);
                    this.actions.actNovyPriznani?.update({ enabled: true });
                }
                /**
                 *  Znovunacteni dat zdanovaciho obdobi
                 *
                 */
                reload() {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    Gordic.Isl.InuObdobiDPH.list()
                        .get()
                        .done(function (result) {
                        return def.resolve(result);
                    })
                        .always(function () { });
                    return def.promise();
                }
                /**
                *  Znovunacteni dat priznani
                *
                */
                reloadPriznani() {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                    if (typeof radek === undefined || radek == null)
                        return def.resolve().promise();
                    Gordic.Isl.InuPriznaniDPH.list({ mesic: radek.mesic })
                        .get()
                        .done(function (result) {
                        Gordic.Isl.InuPriznaniDPH.povoleniPriznani({ mesicPriznani: radek?.mesic })
                            .get()
                            .done(function (permit) {
                            that.priznatPermit = permit;
                            //that.tabPriznani.gtab({ title: "jres:30250169".format(radek?.rok as number, radek?.mesic as number) }); //RC 30250169 : Seznam přiznání DPH - {0} / {1}
                            return def.resolve(result);
                        })
                            .fail(() => { return def.reject; });
                        return def.resolve(result);
                    })
                        .fail(() => { return def.reject; })
                        .always(function () { that.NastaveniAkci(); });
                    return def.promise();
                }
                /**
                 *  Prepocet stavu
                 *
                 * */
                Prepocet(ico, rok, mesic) {
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
                                .done(() => {
                                that.endOperation();
                                that.showFlash("jres:30250044".format(mesic), "success"); //RC 30250044 : Stavy období {0} přepočteny
                                that.view.requestData(undefined);
                            })
                                .fail(() => {
                                //that.showFlash("jres:30250044", "error", 2000);
                            })
                                .always(() => {
                                that.endOperation();
                            });
                        }
                    });
                }
                /**
                 * Zobrazeni seznamu priznani DPH dle aktualniho radku
                 * @param content
                 * @param row
                 */
                ZobrazSeznamPriznani(row) {
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
                }
                /**
                 * Zobrazeni okna dle aktualniho radku
                 * @param content
                 * @param row
                 */
                ZobrazDetail(row, editace = false) {
                    var that = this;
                    if (this.closed)
                        return;
                    if (this.$grid === null)
                        return;
                    if (row != null) {
                        // editace = editace && this.currentRow.typ_priz_dph == 0;
                        this.dialogs.showModalWindow("Gordic.Inu.WebClient.GDetailObdobiDPH", { rok: row.rok, mesic: row.mesic, editace: editace, uid: "GDetailObdobiDPHID#" })
                            //                , undefined, 900, 350, true)
                            //this.navigate("Gordic.Inu.WebClient.GDetailObdobiDPH", { rok: row.rok, mesic: row.mesic, editace: editace})
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                //reload(content);
                                if (editace)
                                    that.view.requestData(undefined);
                            }
                        });
                    }
                    //else
                    //    this.navigate("Gordic.Inu.WebClient.GDetailObdobiDPH", { rok: 0, mesic: 0, editace:true })
                    //            .on("close", function (res: any) {
                    //                if (res.returnValue && res.returnValue.refresh === true) {
                    //                    //that.reload(undefined);
                    //                    that.view.requestData(undefined);
                    //                }
                    //            });
                }
            };
            GSeznamObdobiDPH = __decorate([
                gcontent
            ], GSeznamObdobiDPH);
            WebClient.GSeznamObdobiDPH = GSeznamObdobiDPH;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbU9iZG9iaURQSC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1PYmRvYmlEUEgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLElBQVUsTUFBTSxDQXc3QmY7QUF4N0JELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXc3Qm5CO0lBeDdCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBdzdCN0I7UUF4N0JvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFBbEQ7O29CQUVJLFdBQU0sR0FBRyxnQkFBZ0IsQ0FBQztvQkFDMUIsUUFBRyxHQUFHLG1CQUFtQixDQUFDO29CQVdsQixZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQW82QnJELENBQUM7Z0JBcjRCRyxrQ0FBa0M7Z0JBRWxDLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixnQkFBZ0I7b0JBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBR3ZCLHNCQUFzQjtvQkFDdEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQzVELE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN6QixDQUFDLENBQUMsQ0FBQztvQkFDSCw4QkFBOEI7b0JBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFF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eDdCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdzdCbkI7QUFBRCxDQUFDLEVBeDdCUyxNQUFNLEtBQU4sTUFBTSxRQXc3QmYiLCJzb3VyY2VzQ29udGVudCI6WyJcclxubmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbU9iZG9iaURQSCBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIEdJbnVCYXNlQ2xhc3Mge1xyXG5cclxuICAgICAgICB0YXNrSWQgPSBcImFjdFByaXpuYW5pRFBIXCI7XHJcbiAgICAgICAgdWlkID0gXCJHU2V6bmFtT2Jkb2JpRFBII1wiO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFqYXggcHJvcGVydHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWw6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG9bXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbG9iYWxuaSBuYXN0YXZlbmlcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHJlYWRvbmx5IEdsb2JhbFBhcmFtczogR29yZGljLkludS5XZWJDbGllbnQuR0ludUdsb2JhbER0bztcclxuICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuSW51Lkdsb2JhbHMuR0ludUdsb2JhbHM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9iZWNuZSBwcm9wZXJ0eVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgUHJlcEZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG4gICAgICAgIHByb3RlY3RlZCBmb3JtOiBKUXVlcnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBlbGVtOiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V6bmFtIHpkYW4uIG9iZG9iaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlem5hbSBwcml6bmFuaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFByaXpuYW5pOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGFiUHJpem5hbmk6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBHb3JkaWMuRGF0YS5WaWV3O1xyXG4gICAgICAgIHByaXZhdGUgdmlld1ByaXpuYW5pOiBHb3JkaWMuRGF0YS5WaWV3O1xyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFJvdzogR29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaURQSER0bztcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBvdm9sZW5pIHByaXpuYXRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBwcml6bmF0UGVybWl0OiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HUGVybWlzc2lvbjtcclxuICAgICAgICBcclxuICAgICAgICAvL3Rhc2tJZCA9IFwiYWN0UHJpem5hbmlEUEhUYXNrSURcIjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBha2PDrVxyXG4gICAgICAgICAgICB0aGlzLkRlZmluY2VBa2NpKHRoYXQpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluY2ljZSBwcm92aWRlcnVcclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPGFueSwgYW55LCBhbnk+KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBwcm9jZXNvcnUgbmEgdmlld1xyXG4gICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0Lm1vZGVsLCB7IHByb2Nlc3NvcnM6IHsgcHJvdmlkZXI6IHByb3ZpZGVyIH0gfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmljZSBtZW51IHRpc2t1XHJcbiAgICAgICAgICAgIGxldCB0aXNrOiBNZW51UGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYWN0VGlza1NlcFwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ2OVwiLCAvL1JDIDMwMjUwNDY5IDogVGlza1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwNDY5XCIsIC8vUkMgMzAyNTA0NjkgOiBUaXNrXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3REYW5Eb2xvelwiXSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RUaXNrXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBkZWZpbmljZSB0YWJ1XHJcbiAgICAgICAgICAgIHZhciB0YWJPYmRvYmkgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoYXQudGFza0lkICsgXCJteVRhYk9iZG9iaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTA0NjRcIiwvL1JDIDMwMjUwNDY0IDogT2Jkb2LDrSBEUEhcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROb3Z5KlwiLCBcImFjdERldGFpbCpcIiwgXCJhY3RFZGl0b3ZhdCpcIiwgXCJhY3RQcmVwb2NldCpcIiwgXCJhY3RQcml6bmFuaSpcIiwgXCJhY3RLb250cm9sYSpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIFwiYWN0RGFuRG9sb3oqXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBcImFjdFRpc2sqXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8sIHRpc2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBcImFjdEtvbnRyb2xhS0gqXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBcImFjdE9iZG9iaUtIKlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgXCJhY3RPYmNlcnN0dml0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXSlcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICB0aGF0LiRncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYk9iZG9iaSlcclxuICAgICAgICAgICAgICAgIC8vLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGFiT2Jkb2JpSG9ybmlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3Nob3dIZWFkZXJSb3c6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByYWRlayA9IHRoYXQuY3VycmVudFJvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWwoY3R4LmNlbGxJbmZvLmRhdGEgYXMgYW55LCB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pRWRpdGFjZU9iZG9iaURQSCEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIG9iamVrdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBvYmpla3QuZ2V0U2VsZWN0aW9uKGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdQcml6bmFuaS5yZXF1ZXN0RGF0YShyYWRla1swXS5tZXNpY19kcGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jdXJyZW50Um93ID0gcmFkZWtbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdQcml6bmFuaS5nZXRMb2FkaW5nUHJvbWlzZSgpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlQ29scygpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy90aGF0LlZ5cm9iS2FydHkoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gRm9rdXMgbmEgc2V6bmFtbXVcclxuICAgICAgICAgICAgdmFyIGZvY3VzRnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZ2dyaWQoJ2ZvY3VzJyk7IC8vIG5hc3RhdmVuw60gZm9jdXN1IG5hIGdyaWRcclxuICAgICAgICAgICAgICAgICh0aGF0LnZpZXcgYXMgYW55KS5vZmYoJ2NoYW5nZS5mb2N1cycpOyAvLyBvZHbDoXrDoW7DrSB1ZMOhbG9zdGkgeiBJU0wgdmlld1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGF0LnZpZXcub24oJ2NoYW5nZS5mb2N1cycsIGZvY3VzRnVuYyk7IC8vIHDFmWkgem3Em27EmyBJU0wgdmlldyBzZSBuYXbDocW+ZSBmdW5rY2UgZm9jdXNGdW5jXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgcHJvdmlkZXJ1XHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlclByaXpuYW5pID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPGFueSwgYW55LCBhbnk+KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5yZWxvYWRQcml6bmFuaSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIHByb2Nlc29ydSBuYSB2aWV3XHJcbiAgICAgICAgICAgIHRoYXQudmlld1ByaXpuYW5pID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhhdC5tb2RlbCwgeyBwcm9jZXNzb3JzOiB7IHByb3ZpZGVyOiBwcm92aWRlclByaXpuYW5pIH0gfSk7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIHRhYnVcclxuICAgICAgICAgICAgdGhhdC50YWJQcml6bmFuaSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGhhdC50YXNrSWQgKyBcIm15VGFiUHJpem5hbmlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMTU4XCIsLy9SQyAzMDI1MDE1OCA6IFDFmWl6bsOhbsOtIHphIG9iZG9iw61cclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROb3Z5UHJpem5hbmkqXCIsIFwiYWN0UHJvaGxpemVuaSpcIixcImFjdFRpc2tQcml6bmFuaSpcIiwgXCJhY3RPYmNlcnN0dml0UHJpem5hbmlcIl0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICB0aGF0LiRncmlkUHJpem5hbmkgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC50YWJQcml6bmFuaSlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlld1ByaXpuYW5pLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGFiT2Jkb2JpRG9sbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3Nob3dIZWFkZXJSb3c6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByYWRlayA9IHRoYXQuY3VycmVudFJvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbFByaXpuYW5pKGN0eC5jZWxsSW5mby5kYXRhIGFzIGFueSwgY3R4LmNlbGxJbmZvLmRhdGEubWVzaWMgYXMgbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlQ29sc1ByaXpuYW5pKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LnZpZXdQcml6bmFuaS5yZXF1ZXN0RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxMjRcIiwgLy9SQyAzMDI1MDEyNCA6IERvdGF6XHJcbiAgICAgICAgICAgIC8vICAgICBcImpyZXM6MzAyNTAxMjNcIiwgLy9SQyAzMDI1MDEyMyA6IENoY2V0ZSBwcm92w6lzdCBrb250cm9sdSBqZWRub3RsaXbDvWNoIG9iZG9iw60gRFBILCB6ZGEgdiBuaWNoIGRvxaFsbyBrZSB6bcSbbsOhbSB2IHNvdXZpc2xvc3RpIHMgS29udHJvbG7DrW0gaGzDocWhZW7DrW0/XHJcbiAgICAgICAgICAgIC8vICAgIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pXHJcbiAgICAgICAgICAgIC8vICAgIC5vbihcInllc1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGF0LmFjdGlvbnMuYWN0S29udHJvbGFLSD8ucnVuKCk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC5vbihcImNsb3NlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZCgnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBha2NpXHJcbiAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIERlZmluY2VBa2NpKHRoYXQ6IHRoaXMpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFByZXBvY2V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDE2XCIsIC8vUkMgMzAyNTAwMTYgOiBQxZllcG/EjWV0IHN0YXbFryBEUEhcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA0ODVcIiwgLy9SQyAzMDI1MDQ4NSA6IFDFmWVwb8SNZXQgc3RhdsWvIERQSCB6IMO6xI1ldG7DrWNoIHrDoXBpc8WvIHBybyB2eWJyYW7DqSBvYmRvYsOtIERQSFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSB0aGF0LmN1cnJlbnRSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmFkZWsgIT09IHVuZGVmaW5lZCAmJiByYWRlayAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmVwb2NldChyYWRlaz8uaWNvISwgcmFkZWs/LnJvayEsIHJhZGVrPy5tZXNpYyEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWxEb2tsYWR1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdE5vdnk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIHZpc2libGU6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6RGV0YWlsKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0Tm92eVByaXpuYW5pOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Ob3Z5KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDcyXCIgLy9SQyAzMDI1MDQ3MiA6IE5vdsOpIHDFmWl6bsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLCB0b29sdGlwOlwianJlczozMDI1MDQ3MVwiIC8vUkMgMzAyNTA0NzEgOiBOb3bDqSBwxZlpem7DoW7DrSBrIERQSFxyXG4gICAgICAgICAgICAgICAgICAgICwgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByYWRlayA9IHRoYXQuY3VycmVudFJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayA9PT0gdW5kZWZpbmVkICYmIHJhZGVrID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWxQcml6bmFuaShudWxsLCByYWRlaz8ubWVzaWMgYXMgbnVtYmVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJhZGVrID0gdGhhdC5jdXJyZW50Um93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbChyYWRlaywgdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaUVkaXRhY2VPYmRvYmlEUEghKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGFjdEVkaXRvdmF0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PcHJhdml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSB0aGF0LmN1cnJlbnRSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6RGV0YWlsKHJhZGVrLCB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pRWRpdGFjZU9iZG9iaURQSCEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0UHJpem5hbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMDhcIiwgLy9SQyAzMDI1MDAwOCA6IFDFmWl6bsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJhZGVrID0gdGhhdC5jdXJyZW50Um93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhelNlem5hbVByaXpuYW5pKHJhZGVrKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3REYW5Eb2xvejogR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTEyXCIsIC8vUkMgMzAyNTAxMTIgOiBEYcWIb3bDoSBkb2xvxb5lbm9zdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDExMlwiLCAvL1JDIDMwMjUwMTEyIDogRGHFiG92w6EgZG9sb8W+ZW5vc3RcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJpbnVfcHRtX2RhbmRvbG9cIixcclxuICAgICAgICAgICAgICAgICAgICBlbmJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRub3N0OiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSz8udG9TdHJpbmcoKS50cmltKCkgKyBcIjEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdVY3RQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByYWRlayA9IHRoYXQuY3VycmVudFJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaURQSER0bz4odGhhdC4kZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmFkZWsgIT09IHVuZGVmaW5lZCAmJiByYWRlayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbWE6IHJlcC50ZW1hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEU2VzdGF2eTogR0VJRFNlc3RhdnkuU2V6bmFtT2Jkb2JpRFBILFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lc2ljOiByYWRlaz8ubWVzaWMhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoZmFsc2UpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGFjdEtvbnRyb2xhS0g6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTJcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByYWRlayA9IHRoYXQuY3VycmVudFJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAxMjVcIikgLy9SQyAzMDI1MDEyNSA6IFByb3bDoWTDrW0ga29udHJvbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5JbnVPYmRvYmlEUEgua29udHJvbGFWbGl2dVptZW5OYUhsYXNlbmlEUEgoKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuc2V6bmFtX29iZG9iaSEudHJpbSgpICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3MVwiLCByZXN1bHQuc2V6bmFtX29iZG9iaSEpOyAvL1JDIDMwMjUwMTcxIDogVsO9c2xlZGVrIGtvbnRyb2x5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPYmRvYmlLSDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA1M1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJhZGVrID0gdGhhdC5jdXJyZW50Um93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR1Nlem5hbU9iZG9iaUtIRFBIXCIsIHsgbWVzaWM6IHJhZGVrLm1lc2ljIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0VGlzazogR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDE4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwMDE4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiaW51X3B0bV9kcGhzZXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5ibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBwbGF0bm9zdDogdGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0s/LnRvU3RyaW5nKCkudHJpbSgpICsgXCIxMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuSW51LldlYkNsaWVudC5HVWN0UHJpbnRQYXJhbWV0ZXJzOlNlcnZlclBhcmFtZXRlck1ldGhvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiBmdW5jdGlvbihldmVudCwgcmVwSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChyZXBJbmZvICYmIHJlcEluZm8uY3VzdG9tRGF0YSEuSVhCX05FVyAmJiAocmVwSW5mby5jdXN0b21EYXRhIS5JWEJfTkVXKS50cmltKCkgIT0gXCJcIikgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhhdCxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24ocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJhZGVrID0gdGhhdC5jdXJyZW50Um93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVtYTogcmVwLnRlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSURTZXN0YXZ5OiBHRUlEU2VzdGF2eS5TZXpuYW1PYmRvYmlEUEgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWVzaWM6IHJhZGVrPy5tZXNpYyEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdChmYWxzZSkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgYWN0VGlza1ByaXpuYW5pOiBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMThcIiwgLy9SQyAzMDI1MDAxOCA6IFRpc2tcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTAwMThcIiwgLy9SQyAzMDI1MDAxOCA6IFRpc2tcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJpbnVfcHRtX3ByaXpkcGhcIixcclxuICAgICAgICAgICAgICAgICAgICBwbGF0bm9zdDogdGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0s/LnRvU3RyaW5nKCkudHJpbSgpICsgXCIxMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuSW51LldlYkNsaWVudC5HVWN0UHJpbnRQYXJhbWV0ZXJzOlNlcnZlclBhcmFtZXRlck1ldGhvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiBmdW5jdGlvbiAoZXZlbnQsIHJlcEluZm8pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhhdCxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtUHJpem5hbmlEUEhEdG8+KHRoYXQuJGdyaWRQcml6bmFuaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmFkZWsgIT09IHVuZGVmaW5lZCAmJiByYWRlayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbWE6IHJlcC50ZW1hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEU2VzdGF2eTogR0VJRFNlc3RhdnkuRGV0YWlsUHJpem5hbmlEUEgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwUHJpem5hbmk6IHJhZGVrLnR5cF9wcml6X2RwaCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZXNpYzogcmFkZWs/Lm1lc2ljISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3JDaXNsbzogcmFkZWsucG9yX2Npc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KGZhbHNlKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBhY3RPYmNlcnN0dml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPYmNlcnN0dml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDM5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ub2JjZXJzdHZpdCxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T2JjZXJzdHZpdFByaXpuYW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPYmNlcnN0dml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDM5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ub2JjZXJzdHZpdCxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2godHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQcm9obGl6ZW5pOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoIHtcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSB0aGF0LmN1cnJlbnRSb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbVByaXpuYW5pRFBIRHRvPih0aGF0LiRncmlkUHJpem5hbmkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrTyA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1Qcml6bmFuaURQSER0bz4odGhhdC4kZ3JpZFByaXpuYW5pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmFkZWtPICE9PSB1bmRlZmluZWQgJiYgcmFkZWtPICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWxQcml6bmFuaShyYWRlaywgcmFkZWtPPy5tZXNpYyBhcyBudW1iZXIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0S29udHJvbGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTRcIiwgLy9SQyAzMDI1MDA1NCA6IEtvbnRyb2xhIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwNDg0XCIsIC8vUkMgMzAyNTA0ODQgOiBLb250cm9sYSBuZXByb8O6xI10b3ZhbsO9Y2ggZG9rbGFkxa8gdiBkYW7DqW0gb2Jkb2LDrSBEUEhcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbVByaXpuYW5pRFBIRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS29udHJvbGEocmFkZWsubWVzaWMgYXMgbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBkZXRhaWx1IHByaXpuYW5pIGRsZSBha3R1YWxuaWhvIHJhZGt1XHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAgKiBAcGFyYW0gcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBab2JyYXpEZXRhaWxQcml6bmFuaShyb3c6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1Qcml6bmFuaURQSER0byB8IG51bGwsbWVzaWM6bnVtYmVyLCBuZXdSZWNvcmQ6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kZ3JpZCA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAocm93ICE9IG51bGwgJiYgIW5ld1JlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxQcml6bmFuaURQSFwiLCB7IHBvckNpc2xvOiByb3cucG9yX2Npc2xvLCBtZXNpYzogcm93Lm1lc2ljLCB0eXBQcml6bmFuaTogcm93LnR5cF9wcml6X2RwaCwgbmV3UmVjb3JkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUucmVmcmVzaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZWxvYWQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChlZGl0YWNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAwOTRcIik7IC8vUkMgMzAyNTAwOTQgOiBOYcSNw610w6FtIGRhdGFcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuSW51UHJpem5hbmlEUEgua29udHJvbGFOZXByb3VjdG92YW55Y2hEb2tsYWR1KHsgbWVzaWM6IG1lc2ljIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5uYXZpZ2F0ZShHb3JkaWMuSW51LldlYkNsaWVudC5HVnliZXJOZXphdWN0b3ZhbnljaERva2xhZHUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuSW51LldlYkNsaWVudC5HTmV6YXVjdG92YW5lY2hEb2tsYWR5LCB7IGRhdGE6IHJlc3VsdC5TZXpuYW1Eb2tsYWR1LCB1aWQ6IFwiR05lemF1Y3RvdmFuZWNoRG9rbGFkeUlEI1wiIH0sIFwianJlczozMDI1MDA5NlwiLCA4MDAsIDYwMCwgdHJ1ZSApIC8vUkMgMzAyNTAwOTYgOiBOZXByb8O6xI10b3ZhbsOpIGRva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuR2xvYmFsUGFyYW1zLlBhcmFtcz8uQmxva2FjZUFrY2lEbGVLb250cm9sRFBIID09IEludGVyZmFjZS5HRVR5cEJsb2thY2VEbGVTdGF2dUtvbnRyb2x5RFBILkFrY2VCbG9rb3ZhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KHsgdGl0bGU6IFwianJlczozMDI1MDA4N1wiLCBodG1sOiBcImpyZXM6MzAyNTAwODhcIiwgYnV0dG9uczogR0RsZy5tYmJZZXNObywgaWNvbjogR0RsZy5tYmlRdWVzdGlvbiB9KSAvL1JDIDMwMjUwMDg4IDogRGF0YSBkYcWIb3bDqWhvIG9iZG9iw60gb2JzYWh1asOtIG5lcHJvw7rEjXRvdmFuw6kgZG9rbGFkeSwga3RlcsOpIGJ5IG1vaGx5IG92bGl2bml0IHN0YXZ5IERQSC4gVW1vxb5uaXQgaSBwxZllc3RvIHByb3bDqXN0IHDFmWl6bsOhbsOtIERQSD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmZXIuc3RhdGUoKSA9PT0gXCJwZW5kaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocmVzLnJldHVyblZhbHVlICYmIHJlcy5yZXR1cm5WYWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyB6bm92dW5hxI10ZW7DrSBzZXpuYW11IChwb2RsZSBha3R1w6FsbsOtY2ggZmlsdHLFrylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9Hb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uUmVmcmVzaFNlem5hbXUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Z5YmVyRG9rbGFkdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVyLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoXCJHb3JkaWMuSW51LldlYkNsaWVudC5HRGV0YWlsUHJpem5hbmlEUEhcIiwgeyBwb3JDaXNsbzogMCwgbWVzaWM6IG1lc2ljLCBuZXdSZWNvcmQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnJldHVyblZhbHVlICYmIHJlcy5yZXR1cm5WYWx1ZS5yZWZyZXNoID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZWxvYWQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoZWRpdGFjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHNQcml6bmFuaSgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1Qcml6bmFuaURQSER0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1Qcml6bmFuaURQSER0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3JfY2lzbG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTZcIiwgLy9SQyAzMDI1MDA1NiA6IFBvxZlhZMOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3ByaXpfZHBoX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA1N1wiLCAvL1JDIDMwMjUwMDU3IDogVHlwIHDFmWl6bsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wcml6X21heFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAxMlwiLCAvL1JDIDMwMjUwMDEyIDogTWF4LiBwxZlpem7DoW7DrSBEUEhcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTYwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ByaXpfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDU4XCIsIC8vUkMgMzAyNTAwNTggOiBEYXR1bSBwxZlpem7DoW7DrSBEUEhcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTYwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3pqaXN0X2RvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA1OVwiLCAvL1JDIDMwMjUwMDU5IDogWmppxaF0xJtuw60gcHJvIGRvZC4gcMWZLlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNjVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIGdyaWR1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvPiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ0eXBfZHBoXCIsIGNhcHRpb246IFwianJlczozMDQ1MDAyN1wiLCB3aWR0aDogMzAgfSkgLy9SQyAzMDQ1MDAyNyA6IFMgXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwidHlwX2RwaF90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMwNDUwMDI4XCIsIHdpZHRoOiAxMzAgfSkgLy9SQyAzMDQ1MDAyOCA6IFN0YXYgb2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6XCJtZXNpY1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNjJcIiwgd2lkdGg6IDcwfSkgLy9SQyAzMDI1MDE2MiA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInJva1wiLCBjYXB0aW9uOiBcImpyZXM6MzA0NTAwMDhcIiwgd2lkdGg6IDcwIH0pICAvL1JDIDMwNDUwMDA4IDogUm9rXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7IG5hbWU6IFwiZGF0X3ByaXpfbWF4XCIsIGNhcHRpb246IFwianJlczozMDI1MDE2M1wiLCB3aWR0aDogMTYwIH0pIC8vUkMgMzAyNTAxNjMgOiBNYXguIHDFmWl6bsOhbsOtIERQSFxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInR5cF9wcml6X2RwaF90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTY0XCIsIHdpZHRoOiAxMzB9KSAvL1JDIDMwMjUwMTY0IDogVHlwIHDFmWl6bsOhbsOtIERQSFxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oeyBuYW1lOiBcImRhdF9wcml6X2RwaFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNjVcIiwgd2lkdGg6IDE2MCB9KSAvL1JDIDMwMjUwMTY1IDogRGF0dW0gcMWZaXpuw6Fuw60gRFBIXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwic19wcmVwX2RwaF90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTY2XCIsIHdpZHRoOiAxMjAgfSk7IC8vUkMgMzAyNTAxNjYgOiBTdGF2eSBEUEhcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtvbnRyb2xhIG5hIG5lcHJvdWN0b3ZhbmUgZG9rbGFkeVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBLb250cm9sYShtZXNpYzpudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMDk0XCIpOyAvL1JDIDMwMjUwMDk0IDogTmHEjcOtdMOhbSBkYXRhXHJcbiAgICAgICAgICAgIEdvcmRpYy5Jc2wuSW51UHJpem5hbmlEUEgua29udHJvbGFOZXByb3VjdG92YW55Y2hEb2tsYWR1KHsgbWVzaWM6IG1lc2ljIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LlJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubmF2aWdhdGUoR29yZGljLkludS5XZWJDbGllbnQuR1Z5YmVyTmV6YXVjdG92YW55Y2hEb2tsYWR1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuSW51LldlYkNsaWVudC5HTmV6YXVjdG92YW5lY2hEb2tsYWR5LCB7IGRhdGE6IHJlc3VsdC5TZXpuYW1Eb2tsYWR1LCB1aWQ6IFwiR05lemF1Y3RvdmFuZWNoRG9rbGFkeUlEI1wiIH0sIFwianJlczozMDI1MDA5NlwiLCA4MDAsIDYwMCwgdHJ1ZSk7IC8vUkMgMzAyNTAwOTYgOiBOZXByb8O6xI10b3ZhbsOpIGRva2xhZHlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcIkluZm9cIiwgcmVzdWx0Lk1lc3NhZ2UhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy92eWJlckRva2xhZHUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1bmFjdGVuaSBkYXRcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVmcmVzaChwcml6bmFuaTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHByaXpuYW5pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdQcml6bmFuaS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3UHJpem5hbmkuZ2V0TG9hZGluZ1Byb21pc2UoKS5cclxuICAgICAgICAgICAgICAgICAgICBkb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLlxyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgVnlyb2JLYXJ0eSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgb2JkRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMSBNLTMtOS0wIEwtMy05LTAgYnJlYWtzLTQwMC01MDBcIilcclxuICAgICAgICAgICAgLy8gICAgLy8uYWRkRmllbGQoXCJnZHVtbXlmaWVsZFwiLCBcInctaFwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIG1vZGVsOiBcInJhZGVrXCIsXHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIG5hbWU6IFwicmFkZWtcIlxyXG4gICAgICAgICAgICAvLyAgICAvL30pXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coXCJ0eXBcIilcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctOFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgeyBuYW1lOiBcInR5cF9kcGhcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coXCJSb2tcIilcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctOFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgeyBuYW1lOiBcInJva1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KFwiTcSbc8OtY1wiKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy04XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB7IG5hbWU6IFwibWVzaWNcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coXCJkYXR1bVwiKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy04XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB7IG5hbWU6IFwiZGF0X3ByaXpfbWF4XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGl0ZW10ZW1wbGF0ZV9tZXNpYyA9IFwiPGRpdiBzdHlsZT0nYm9yZGVyOjFweCBzb2xpZCBMaWdodEdyYXk7IHBhZGRpbmc6IDVweDsgd2lkdGg6MjMwcHg7IGhlaWdodDozMDBweDsnPlwiICtcclxuICAgICAgICAgICAgLy8gICAgLy9cIjxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHtiYXJ2YV90eHR9OyBwYWRkaW5nOiA1cHg7Jz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPGRpdiBzdHlsZT0ncGFkZGluZzogNXB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxoMz48aSBjbGFzcz0nZmEge3NsMX0nIHN0eWxlPSdjb2xvcjogZ3JheTsnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+e21lc2ljfTwvaDM+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjwvZGl2PjxkaXYgc3R5bGU9J3dpZHRoOjIxOXB4OyBwYWRkaW5nOiA1cHg7Jz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIC8vXCI8aDMgc3R5bGU9J2NvbG9yOiB7YWt0aXZpdGFfY29sb3J9Oyc+e2FrdGl2aXRhX3R4dH08L2gzPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8cD5TdGF2OiB7dHlwX2RwaH08L3A+XCI7XHJcbiAgICAgICAgICAgIC8vICAgIFwiPHA+TWF4LiBwxZlpem7DoW7DrSBEUEg6IHtkYXRfcHJpel9tYXhfdH08L3A+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxwPlR5cCBwxZlpem7DoW7DrToge3R5cF9wcml6X2RwaF90eHR9PC9wPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8cD5EYXR1bSBwxZlpem7DoW7DrToge2RhdF9wcml6X2RwaF90fTwvcD5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPHA+U3RhdiBwxZllcG/EjXR1OiB7c19wcmVwX2RwaF90eHR9PC9wPjxicj5cIiArICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICBcIjwvZGl2PjwvZGl2PlwiO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIGthcnR5ID0gdGhpcy5lbGVtLmdjYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL3RpdGxlOiBcIlNlem5hbSBvYmRvYsOtIFwiLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAocmFkZWs6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdiA9IFwianJlczozMDI1MDA0OVwiOyAvL1JDIDMwMjUwMDQ5IDogT3RldsWZZW7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvclN0YXYgPSBcImctc3RhdGUtaW5mb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5zX2RwaCA9PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF2ID0gXCJqcmVzOjMwMjUwMDUwXCI7IC8vUkMgMzAyNTAwNTAgOiBacMSbdG7EmyBvdGV2xZllbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yU3RhdiA9IFwiZy1zdGF0ZS13YXJuaW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhZGVrLnNfZHBoID09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXYgPSBcImpyZXM6MzAyNTAwNTFcIjsgLy9SQyAzMDI1MDA1MSA6IFV6YXbFmWVuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JTdGF2ID0gXCJnLXN0YXRlLXN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFwiPGRpdiBjbGFzcz0naXRlbXMgZ2NhcmQnIHN0eWxlPSdkaXNwbGF5OiBibG9jazsgZmxvYXQ6IGxlZnQ7IGJhY2tncm91bmQ6I2ZmZmZmZiBoZWlnaHQ6MjAwcHg7Jz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nZy1jYXJkJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nZy1yYXAtY2FyZCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2ctY2FyZC1oZWFkZXInPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdnLWNhcmQtaGVhZGVyLXRleHQgZ3Rvb2x0aXAnPlwiICsgcmFkZWsubWVzaWMgKyBcIiZuYnNwOyZuYnNwOyZuYnNwOzxzcGFuIGNsYXNzPSdcIiArIGNvbG9yU3RhdiArIFwiJyA+XCIgKyBzdGF2ICsgXCI8L3NwYW4+PC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdnLWNhcmQtbWFpbic+PC9icj5cIjsvLytcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cIjxkaXYgY2xhc3M9J1wiICsgY29sb3JTdGF2ICsgXCInID48c3Ryb25nPlwiICsgc3RhdiArIFwiPC9zdHJvbmc+PC9kaXY+PC9icj5cIjsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHJlc3VsdCA9IFwiPGRpdiBzdHlsZT0nYm9yZGVyOjFweCBzb2xpZCBMaWdodEdyYXk7IHBhZGRpbmc6IDVweDsgd2lkdGg6MjMwcHg7IGhlaWdodDoyMDBweDsnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBcIjxkaXYgc3R5bGU9J3BhZGRpbmc6IDVweDsnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBcIjxoMz48aSBjbGFzcz0nZmEgJyBzdHlsZT0nY29sb3I6IGdyYXk7JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPlwiICsgcmFkZWsubWVzaWMgKyBcIjxzcGFuIGNsYXNzPSdcIiArIGNvbG9yU3RhdiArXCInPiZuYnNwOyZuYnNwOyZuYnNwOyBcIisgc3RhditcIjwvc3Bhbj48L2gzPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBcIjwvZGl2PjxkaXYgc3R5bGU9J3dpZHRoOjIxOXB4OyBwYWRkaW5nOiA1cHg7Jz5cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiPGRpdj5qcmVzOjMwMjUwMDQ2XCIuZm9ybWF0KEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRlKHJhZGVrLmRhdF9wcml6X21heCkpICsgXCI8L2Rpdj5cIiArIC8vUkMgMzAyNTAwNDYgOiBNYXguIHDFmWl6bsOhbsOtIERQSDogezB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPHA+PHN0cm9uZz5cIiArIHJhZGVrLnR5cF9wcml6X2RwaF90eHQgKyBcIjwvc3Ryb25nPjwvcD5cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gXCJnLXN0YXRlLXN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsuc19wcmVwX2RwaCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IFwiZy1zdGF0ZS1lcnJvclwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCI8ZGl2PjxiIGNsYXNzPSdcIiArIGNvbG9yICsgXCIgZy1zdGF0ZS10ZXh0ICc+XCIgKyByYWRlay5zX3ByZXBfZHBoX3R4dCArIFwiPC9iPjwvZGl2PjwvYnI+XCIgIC8vUkMgMzAyNTAwNDggOiBzdGF2IHDFmWVwb8SNdHU6IHswfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Jlc3VsdCArPSBcIjxwPmpyZXM6MzAyNTAwNDZcIi5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUocmFkZWsuZGF0X3ByaXpfbWF4KSkgKyBcIjwvcD5cIiArIC8vUkMgMzAyNTAwNDYgOiBNYXguIHDFmWl6bsOhbsOtIERQSDogezB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgXCI8cD48Yj5cIiArIHJhZGVrLnR5cF9wcml6X2RwaF90eHQgKyBcIjwvYj48L3A+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXCI8cD5UeXAgcMWZaXpuw6Fuw606XCIgKyByYWRlay50eXBfcHJpel9kcGhfdHh0ICsgXCI8L3A+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLmRhdF9wcml6X2RwaCAhPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXN1bHQgKz0gXCI8cD48Yj5cIityYWRlay5kYXRfcHJpel9kcGggKyBcIjwvYj48L3A+XCI7IC8vUkMgMzAyNTAwNDcgOiBEYXR1bSBwxZlpem7DoW7DrTogezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIjxkaXY+anJlczozMDI1MDA0N1wiLmZvcm1hdChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZShyYWRlay5kYXRfcHJpel9kcGgpKSArIFwiPC9kaXY+XCI7IC8vUkMgMzAyNTAwNDcgOiBEYXR1bSBwxZlpem7DoW7DrTogezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzdWx0ICs9IFwiPHA+anJlczozMDI1MDA0N1wiLmZvcm1hdChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZShyYWRlay5kYXRfcHJpel9kcGgpKSArIFwiPC9wPlwiOyAvL1JDIDMwMjUwMDQ3IDogRGF0dW0gcMWZaXpuw6Fuw606IHswfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IFwiZy1zdGF0ZS1zdWNjZXNzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAocmFkZWsuc19wcmVwX2RwaCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbG9yID0gXCJnLXN0YXRlLWVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8vL3N0eWxlID0gJ2NvbG9yOiBcIiArIGNvbG9yICsgXCI7JyBcclxuICAgICAgICAgICAgICAgICAgICAvLy8vaSBjbGFzcz0nZmEgZmEtY2hlY2stY2lyY2xlIFwiICsgY29sb3IgKyBcIiBnLXN0YXRlLXRleHQgJyBhcmlhIC0gaGlkZGVuPSd0cnVlJyA+IDwvaT5cclxuICAgICAgICAgICAgICAgICAgICAvLy8vanJlczogMzAyNTAwNDhcIi5mb3JtYXQocmFkZWsuc19wcmVwX2RwaF90eHQgYXMgYW55KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVzdWx0ICs9IFwiPGRpdj48YiBjbGFzcz0nXCIgKyBjb2xvciArIFwiIGctc3RhdGUtdGV4dCAnPlwiICsgcmFkZWsuc19wcmVwX2RwaF90eHQgKyBcIjwvYj48L2Rpdj48L2JyPlwiICsgLy9SQyAzMDI1MDA0OCA6IHN0YXYgcMWZZXBvxI10dTogezB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICAgXCI8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIjtcclxuICAgICAgICAgICAgICAgICAgICAvL3Jlc3VsdCArPSBcIjxwPjxiIGNsYXNzPSdcIiArIGNvbG9yICsgXCIgZy1zdGF0ZS10ZXh0ICc+XCIrcmFkZWsuc19wcmVwX2RwaF90eHQgICsgXCI8L2I+PC9wPjxicj5cIiArIC8vUkMgMzAyNTAwNDggOiBzdGF2IHDFmWVwb8SNdHU6IHswfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIFwiPC9kaXY+PC9kaXY+XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9ICwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXcsXHJcbiAgICAgICAgICAgICAgICAvL2Zvcm06IG9iZEZvcm0sXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUYWI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vYWRkOiBmdW5jdGlvbiAoZXYsIGRhdGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8pIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHZhciBwYW5lbCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcImFkZFwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuWm9icmF6RGV0YWlsKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgLy99LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vZWRpdDogZnVuY3Rpb24gKGV2LCBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB2YXIgcGFuZWwgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coXCJlZGl0XCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGhhdC5ab2JyYXpEZXRhaWwoZGF0YSBhcyBhbnksdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAvL2RlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWwoY3R4Lml0ZW0uZGF0YSBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgIH0pLCAgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGRhdGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8pIHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY3VycmVudFJvdyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIE5hc3RhdmVuaUFrY2koKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBkYXRhRm91bmQgPSB0aGlzLnZpZXcuZ2V0Q291bnQoKSA+IDA7XHJcbiAgICAgICAgICAgIHZhciB0b29sdGlwID0gZGF0YUZvdW5kID8gXCJcIiA6IFwianJlczozMDI1MDExM1wiOyAvL1JDIDMwMjUwMTEzIDogT2Jkb2LDrSBuZW5hbGV6ZW5vXHJcblxyXG4gICAgICAgICAgICAvL2lmICh0eXBlb2YgdGhpcy5jdXJyZW50Um93ID09PSBcInVuZGVmaW5lZFwiIHx8IHRoaXMuY3VycmVudFJvdy50eXBfcHJpel9kcGggPT0gMClcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmFjdEVkaXRvdmF0Py51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7XHJcbiAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAvLyAgICB0aGlzLmFjdGlvbnMuYWN0RWRpdG92YXQ/LnVwZGF0ZSh7IGVuYWJsZWQ6IGZhbHNlLCB0b29sdGlwOiBcImpyZXM6MzAyNTAxMTVcIiB9KTsgLy9SQyAzMDI1MDExNSA6IEppxb4gcG9kw6FubyBwxZlpem7DoW7DrVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFByZXBvY2V0Py51cGRhdGUoeyBlbmFibGVkOiAoIGRhdGFGb3VuZCAmJiB0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pUHJvdmFkZW5pUHJlcG9jdHVTdGF2dURQSCEgKSAsIHRvb2x0aXA6IHRvb2x0aXAgPT09IFwiXCIgPyBcImpyZXM6MzAyNTA0ODVcIiA6IHRvb2x0aXAgfSk7IC8vUkMgMzAyNTA0ODUgOiBQxZllcG/EjWV0IHN0YXbFryBEUEggeiDDusSNZXRuw61jaCB6w6FwaXPFryBwcm8gdnlicmFuw6kgb2Jkb2LDrSBEUEhcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcml6bmFuaT8udXBkYXRlKHsgZW5hYmxlZDogKCBkYXRhRm91bmQgJiYgdGhpcy5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaVByb3ZhZGV0UHJpem5hbmlEUEghICkgLCB0b29sdGlwOiB0b29sdGlwIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gS0ggRFBIIHBvdXplIHBybyByb2sgMjAxNiBhIHZ5c2VcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0S29udHJvbGFLSD8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kICYmIHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LISA+PSAyMDE2LCB2aXNpYmxlOiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyEgPj0gMjAxNiB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuYWN0aW9ucy5hY3RPYmRvYmlLSD8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kICYmIHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LISA+PSAyMDE2LCB2aXNpYmxlOiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyEgPj0gMjAxNiB9KTtcclxuICAgICAgICAgICAgLy8gdGlza1xyXG4gICAgICAgICAgICBpZiAodGhpcy5HbG9iYWxQYXJhbXMuUGFyYW1zPy5Qb3ZvbGVuaVRpc2t1KSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrPy51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogXCJqcmVzOjMwMjUwMTA1XCIgfSk7IC8vUkMgMzAyNTAxMDUgOiBOZW7DrSBwb3ZvbGVubyBwYXJhbWV0cmVtXHJcbiAgICAgICAgICAgIC8vIGRhbm92YSBkb2xvemVub3N0XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REYW5Eb2xvej8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kLCB0b29sdGlwOiB0b29sdGlwIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIFByaXpuYW5pXHJcbiAgICAgICAgICAgIC8vLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIHZhciBkYXRhRm91bmQgPSB0aGlzLnZpZXdQcml6bmFuaS5nZXRDb3VudCgpID4gMDtcclxuICAgICAgICAgICAgdmFyIHRvb2x0aXAgPSBkYXRhRm91bmQgPyBcIlwiIDogXCJqcmVzOjMwMjUwMTE0XCI7IC8vUkMgMzAyNTAxMTQgOiBQxZlpem7DoW7DrSBuZW5hbGV6ZW5vXHJcbiAgICAgICAgICAgIC8vIHRpc2tcclxuICAgICAgICAgICAgaWYgKHRoaXMuR2xvYmFsUGFyYW1zLlBhcmFtcz8uUG92b2xlbmlUaXNrdSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrUHJpem5hbmk/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VGlza1ByaXpuYW5pPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogXCJqcmVzOjMwMjUwMTA1XCIgfSk7IC8vUkMgMzAyNTAxMDUgOiBOZW7DrSBwb3ZvbGVubyBwYXJhbWV0cmVtXHJcbiAgICAgICAgICAgIC8vIHByb2hsaXplbmlcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFByb2hsaXplbmk/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgLy8gbm92ZSBwb2RhbmlcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0Tm92eVByaXpuYW5pPy51cGRhdGVQZXJtaXNzaW9uKHRoaXMucHJpem5hdFBlcm1pdCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5UHJpem5hbmk/LnVwZGF0ZSh7IGVuYWJsZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgWm5vdnVuYWN0ZW5pIGRhdCB6ZGFub3ZhY2lobyBvYmRvYmlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlbG9hZCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5jbG9zZWQpIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgR29yZGljLklzbC5JbnVPYmRvYmlEUEgubGlzdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB9KSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqICBabm92dW5hY3RlbmkgZGF0IHByaXpuYW5pXHJcbiAgICAgICAgKiBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkUHJpem5hbmkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrID09PSB1bmRlZmluZWQgfHwgcmFkZWsgPT0gbnVsbCkgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgR29yZGljLklzbC5JbnVQcml6bmFuaURQSC5saXN0KHsgbWVzaWM6IHJhZGVrLm1lc2ljIGFzIG51bWJlciB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5JbnVQcml6bmFuaURQSC5wb3ZvbGVuaVByaXpuYW5pKHsgbWVzaWNQcml6bmFuaTogcmFkZWs/Lm1lc2ljIGFzIG51bWJlciB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHBlcm1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcml6bmF0UGVybWl0ID0gcGVybWl0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnRhYlByaXpuYW5pLmd0YWIoeyB0aXRsZTogXCJqcmVzOjMwMjUwMTY5XCIuZm9ybWF0KHJhZGVrPy5yb2sgYXMgbnVtYmVyLCByYWRlaz8ubWVzaWMgYXMgbnVtYmVyKSB9KTsgLy9SQyAzMDI1MDE2OSA6IFNlem5hbSBwxZlpem7DoW7DrSBEUEggLSB7MH0gLyB7MX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7IHJldHVybiBkZWYucmVqZWN0IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4geyByZXR1cm4gZGVmLnJlamVjdCB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7IHRoYXQuTmFzdGF2ZW5pQWtjaSgpOyB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIFByZXBvY2V0IHN0YXZ1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIFByZXBvY2V0KGljbzogc3RyaW5nLCByb2s6IG51bWJlciwgbWVzaWM6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmcm1QcmVwb2NldCA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMSBNLTMtOS0wIEwtMy05LTAgYnJlYWtzLTQwMC01MDBcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2R1bW15ZmllbGRcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwicmFkZWtcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwicmFkZWtcIlxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwNDBcIikgLy9SQyAzMDI1MDA0MCA6IEnEjE9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LThcIixcclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiaWNvXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDA0MVwiKSAvL1JDIDMwMjUwMDQxIDogUm9rXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy04XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcInJva1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwNDJcIikgLy9SQyAzMDI1MDA0MiA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LThcIixcclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwibWVzaWNcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgR0RsZy5zaW1wbGVGb3JtKFwianJlczozMDI1MDA2MFwiLCBmcm1QcmVwb2NldCwge2ljbzppY28scm9rOnJvayxtZXNpYzptZXNpY30sIHsgd2lkdGg6IDMwMCwgaGVpZ2h0OiAzMDAgfSkgLy9SQyAzMDI1MDA2MCA6IFDFmWVwb8SNZXQgc3RhdsWvIERQSFxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAwNDNcIi5mb3JtYXQobWVzaWMpKTsgLy9SQyAzMDI1MDA0MyA6IFDFmWVwb8SNw610w6F2w6FtIHN0YXZ5IG9iZG9iw60gezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuSW51T2Jkb2JpRFBILnByZXBvY2V0U3RhdnVEUEgoeyBpY286IGljbywgcm9rOiByb2ssIG1lc2ljOiBtZXNpYyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcImpyZXM6MzAyNTAwNDRcIi5mb3JtYXQobWVzaWMpLCBcInN1Y2Nlc3NcIik7IC8vUkMgMzAyNTAwNDQgOiBTdGF2eSBvYmRvYsOtIHswfSBwxZllcG/EjXRlbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcImpyZXM6MzAyNTAwNDRcIiwgXCJlcnJvclwiLCAyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIHNlem5hbXUgcHJpem5hbmkgRFBIIGRsZSBha3R1YWxuaWhvIHJhZGt1XHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAgKiBAcGFyYW0gcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBab2JyYXpTZXpuYW1Qcml6bmFuaShyb3c6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8gfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRncmlkID09PSBudWxsKSByZXR1cm47XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdTZXpuYW1Qcml6bmFuaURQSFwiLCB7IHJvazogcm93LnJvaywgbWVzaWM6IHJvdy5tZXNpYywgaWRlbnRpZmlrYXRvcjogcm93LmljbyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMDIyXCIsIC8vUkMgMzAyNTAwMjIgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMDIzXCIpOyAgLy9SQyAzMDI1MDAyMyA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlayFcclxuXHJcbiBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgb2tuYSBkbGUgYWt0dWFsbmlobyByYWRrdVxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHJvd1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgWm9icmF6RGV0YWlsKHJvdzogR29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaURQSER0byB8IG51bGwsIGVkaXRhY2U6IGJvb2xlYW49ZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLiRncmlkID09PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgaWYgKHJvdyAhPSBudWxsICApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBlZGl0YWNlID0gZWRpdGFjZSAmJiB0aGlzLmN1cnJlbnRSb3cudHlwX3ByaXpfZHBoID09IDA7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuSW51LldlYkNsaWVudC5HRGV0YWlsT2Jkb2JpRFBIXCIsIHsgcm9rOiByb3cucm9rLCBtZXNpYzogcm93Lm1lc2ljLCBlZGl0YWNlOiBlZGl0YWNlLCB1aWQ6IFwiR0RldGFpbE9iZG9iaURQSElEI1wiIH0pXHJcbi8vICAgICAgICAgICAgICAgICwgdW5kZWZpbmVkLCA5MDAsIDM1MCwgdHJ1ZSlcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxPYmRvYmlEUEhcIiwgeyByb2s6IHJvdy5yb2ssIG1lc2ljOiByb3cubWVzaWMsIGVkaXRhY2U6IGVkaXRhY2V9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUucmVmcmVzaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlbG9hZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVkaXRhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgLy8gICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxPYmRvYmlEUEhcIiwgeyByb2s6IDAsIG1lc2ljOiAwLCBlZGl0YWNlOnRydWUgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmIChyZXMucmV0dXJuVmFsdWUgJiYgcmVzLnJldHVyblZhbHVlLnJlZnJlc2ggPT09IHRydWUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlbG9hZCh1bmRlZmluZWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICB9XHJcblxyXG59Il19