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
            let GSeznamZdanovaciObdobiDPH = class GSeznamZdanovaciObdobiDPH extends Gordic.GContentBase {
                constructor() {
                    /**
                     * Ajax property
                     *
                     */
                    super(...arguments);
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                    this.taskId = "actZdanovaciObdobi";
                }
                onContentReady() {
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
                    //            $.extend(this.model_akt, this.model );
                    //nastavení menuBaru
                    //this.menuBar(this.actions.createBar(["actNovy*", "actDetail*", "actEditovat*", "actPrepocet*", "actPriznani*", "actDanDoloz*", "actTisk*"
                    //    , "actObcerstvit*"
                    //    , "actKontrolaKH*"
                    //    , "actObdobiKH*"]));
                    // defincice provideru
                    let provider = new Gordic.Data.Provider((a, b) => {
                        return that.reload();
                    });
                    // nastaveni procesoru na view
                    that.view = new Gordic.Data.View(that.dataDPH, { processors: { provider: provider } });
                    // definice tabu
                    var tabObdobi = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        id: that.taskId + "myTabObdobi",
                        title: "jres:30250464", //RC 30250464 : Období DPH
                        opened: true,
                        menuBar: this.actions.createBar(["actNovy*", "actDetail*", "actTisk*", "actPrepocetDPH*", "actObcerstvit"])
                    });
                    // definicie gridu
                    that.$grid = $("<div>")
                        .css("height", "100%")
                        .appendTo(tabObdobi)
                        //.gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: that.view,
                        name: "tabDPH",
                        //showHeaderRow:false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                var radek = that.currentRow;
                                that.ZobrazDetail(ctx.cellInfo.data, that.globals.Globalni_Parametry.PovoleniEditaceObdobiDPH);
                            }
                        }),
                        selection: function (ev, objekt) {
                            //var radek = objekt.getSelection(false, true);
                            //if (radek.length == 1) {
                            //    that.viewKHDPH.requestData(radek[0].mesic_dph);
                            //    that.currentRow = radek[0];
                            //    that.viewKHDPH.getLoadingPromise().
                            //        done(() => {
                            //            that.NastaveniAkci();
                            //        }
                            //        );
                            //}
                        },
                        columns: that.createColsDPH()
                    });
                    //that.VyrobKarty();
                    //that.refresh();
                    // Fokus na seznammu
                    var focusFunc = function () {
                        that.$grid.ggrid('focus'); // nastavení focusu na grid
                        that.view.off('change.focus'); // odvázání události z ISL view
                    };
                    that.view.on('change.focus', focusFunc); // při změně ISL view se naváže funkce focusFunc
                    /////////////
                    // defincice provideru
                    let providerKHDPH = new Gordic.Data.Provider((a, b) => {
                        return that.reloadKHDPH();
                    });
                    // nastaveni procesoru na view
                    that.viewKHDPH = new Gordic.Data.View(that.dataKHDPH, { processors: { provider: providerKHDPH } });
                    let tabKHDPH = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        id: that.taskId + "myTabKontrolniHlaseniDPH0",
                        title: "jres:30250483", //RC 30250483 : Období KH
                        opened: true,
                        menuBar: this.actions.createBar(["actDetailKH*", "actPrepocetKH*", "actObcerstvitKHDPH"])
                    });
                    // definicie gridu
                    that.$gridPriznani = $("<div>")
                        .css("height", "100%")
                        .appendTo(tabKHDPH)
                        .ggrid({
                        columnMode: "full", name: "tabKHDPH",
                        data: that.viewKHDPH,
                        selection: function (ev, objekt) {
                        },
                        defaultAction: this.actions.actDetailKH,
                        columns: that.createColsKHDPH()
                    });
                    //that.refresh(true);
                    that.viewKHDPH.requestData();
                    that.view.requestData();
                }
                /**
                 * Definice akci
                 * @param that
                 */
                DefinceAkci(that) {
                    this.actions.addRange({
                        actDetailDokladu: Gordic.Eko.Action.actionDetail({
                            enabled: false, run: () => {
                            }
                        }),
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: that.globals.Globalni_Parametry.PovoleniEditaceObdobiDPH,
                            caption: "jres:30250467", //RC-EX 30250465 : Nové období
                            tooltip: "jres:30250468", //RC 30250468 : Otevření nového zdaňovacího období a období KH
                            run: function () {
                                that.ZobrazDetail(null);
                            }
                        }),
                        actNovyPriznani: Gordic.Eko.Action.actionNovy({
                            enabled: false, visible: false,
                            run: function () {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                //var radek = that.currentRow;
                                if (typeof radek === undefined && radek == null)
                                    return;
                                that.ZobrazDetailPriznani(null, radek?.mesic, false);
                            }
                        }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: true, // false,
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
                            caption: "jres:30250008",
                            enabled: false,
                            visible: false,
                            run: () => {
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
                            visible: false,
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
                                    if (result && result.seznam_obdobi.trim() != "") {
                                        that.dialogs.messageBox("jres:30250171", result.seznam_obdobi) //RC 30250171 : Výsledek kontroly
                                            .on("close", function (res) {
                                            that.dialogs.showModalWindow(Gordic.Inu.WebClient.GNevykazaneDokladyKHL, { data: result.doklady, uid: "GNevykazaneDokladyKHLID#" }, "jres:30450052", 800, 600, true) //RC 30450052 : Doklady nevykázané v KH
                                                .on("close", function (res) {
                                            });
                                        });
                                    }
                                })
                                    .always(function () {
                                    that.endOperation();
                                });
                            }
                        },
                        actObdobiKH: {
                            caption: "jres:30250053", //RC 30250053 : Období KH
                            visible: false,
                            run: () => {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.navigate("Gordic.Inu.WebClient.GSeznamObdobiKHDPH", { mesic: radek.mesic });
                            }
                        },
                        actDetailKH: Gordic.Eko.Action.actionDetail({
                            enabled: true, // false,
                            run: () => {
                                //var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$gridPriznani);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetailKH(radek, that.globals.Globalni_Parametry.PovoleniEditaceObdobiDPH);
                            }
                        }),
                        actTisk: GAction.createPrintAction({
                            name: "actTisk",
                            caption: "jres:30250018",
                            tooltip: "jres:30250018",
                            icon: "gi-print",
                            tema: "inu_ptm_dphsest",
                            enbled: false,
                            visible: false,
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
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
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
                        actObcerstvitKHDPH: {
                            name: "actObcerstvitKHDPH",
                            caption: "jres:30250039",
                            tooltip: "",
                            icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.refresh(true);
                            }
                        },
                        actProhlizeni: {
                            caption: "jres:30250055", //RC 30250055 : Prohlížení
                            run: () => {
                                //var radek = that.currentRow
                                var radek = Gordic.Eko.Grid.currentRow(that.$gridPriznani);
                                if (typeof radek !== undefined && radek != null) {
                                    var radekO = Gordic.Eko.Grid.currentRow(that.$grid);
                                    if (typeof radekO !== undefined && radekO != null)
                                        that.ZobrazDetailPriznani(radek, radekO?.mesic, false);
                                }
                            }
                        },
                        actKontrola: {
                            caption: "jres:30250054", //RC 30250054 : Kontrola dokladů
                            run: () => {
                                var radek = Gordic.Eko.Grid.currentRow(that.$gridPriznani);
                                if (typeof radek !== undefined && radek != null) {
                                    that.Kontrola(radek.mesic);
                                }
                            }
                        },
                        actPrepocetKH: {
                            caption: "jres:30250156", //RC 30250156 : Přepočet stavů KH
                            run: () => {
                                var radek = Gordic.Eko.Grid.currentRow(that.$gridPriznani);
                                if (typeof radek !== undefined && radek != null)
                                    that.PrepocetStavuKH(radek?.rok_dph, radek?.mesic_dph);
                            }
                        },
                        actPrepocetDPH: {
                            caption: "jres:30250016", //RC 30250016 : Přepočet stavů DPH
                            tooltip: "jres:30250485", //RC 30250485 : Přepočet stavů DPH z účetních zápisů pro vybrané období DPH
                            run: () => {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                //var radek = that.currentRow;
                                if (typeof radek !== undefined && radek != null)
                                    that.PrepocetStavuDPH(radek?.ico, radek?.rok, radek?.mesic);
                            }
                        },
                    });
                }
                /**
                 *  Prepocet stavu KH
                 *
                 * */
                PrepocetStavuKH(rok, mesic) {
                    var that = this;
                    that.beginOperation("jres:30450031".format(mesic, rok)); //RC 30450031 : Přepočítávám stavy období {0}/{1}
                    Gordic.Isl.InuKontrolniHlaseni.prepocetStavuKHDPH({ mesic: mesic })
                        .get()
                        .done(() => {
                        that.endOperation();
                        that.showFlash("jres:30250157".format(mesic, rok), "success"); //RC 30250157 : Byly přepočteny stavy KH v období {0}/{1}
                        that.view.requestData(undefined);
                    })
                        .fail(() => {
                        //that.showFlash("jres:30250044", "error", 2000);
                    })
                        .always(() => {
                        that.endOperation();
                    });
                }
                /**
                 *  Prepocet stavu DPH
                 *
                 * */
                PrepocetStavuDPH(ico, rok, mesic) {
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
                            that.beginOperation("jres:30450029".format(mesic, rok)); //RC 30450029 : Přepočítávám stavy období {0}/{1}
                            Gordic.Isl.InuObdobiDPH.prepocetStavuDPH({ ico: ico, rok: rok, mesic: mesic })
                                .get()
                                .done(() => {
                                that.endOperation();
                                that.showFlash("jres:30450030".format(mesic, rok), "success"); //RC 30450030 : Stavy období {0}/{1} přepočteny
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
                                    that.viewKHDPH.requestData(undefined);
                                }
                            });
                        });
                    }
                }
                /**
                 * Definice gridu obdobi dph
                 * */
                createColsDPH() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({ name: "typ_dph", caption: "jres:30250161", width: 30 }) //RC 30250161 : S 
                        .addTextColumn({ name: "typ_dph_txt", caption: "jres:30450021", width: 130 }) //RC 30450021 : Stav období
                        .addNumberColumn({ name: "mesic", caption: "jres:30250162", width: 70 }) //RC 30250162 : Měsíc
                        .addNumberColumn({ name: "rok", caption: "jres:30450020", width: 70 }) //RC 30450020 : Rok
                        .addDateColumn({ name: "dat_priz_max", caption: "jres:30250163", width: 160 }) //RC 30250163 : Max. přiznání DPH
                        .addTextColumn({ name: "typ_priz_dph_txt", caption: "jres:30250164", width: 130 }) //RC 30250164 : Typ přiznání DPH
                        .addDateColumn({ name: "dat_priz_dph", caption: "jres:30250165", width: 160 }) //RC 30250165 : Datum přiznání DPH
                        .addTextColumn({ name: "s_prep_dph_txt", caption: "jres:30250166", width: 120 }); //RC 30250166 : Stavy DPH
                    return gridFormat;
                }
                /**
                 *  Definice sloupcu obdobi KHDPH
                 *
                 * */
                createColsKHDPH() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        //.addTextColumn({
                        //    name: "typ_dph",
                        //    caption: "jres:30250137", //RC 30250137 : S 
                        //    width: 30
                        //})
                        //.addTextColumn({
                        //    name: "typ_dph_txt",
                        //    caption: "jres:30450023", //RC 30450023 : Stav období
                        //    width: 130
                        //})
                        .addNumberColumn({
                        name: "mesic_dph",
                        caption: "jres:30250138", //RC 30250138 : Měsíc
                        width: 70
                    })
                        .addNumberColumn({
                        name: "rok_dph",
                        caption: "jres:30450022", //RC 30450022 : Rok
                        width: 70
                    })
                        .addDateColumn({
                        name: "dat_priz_max",
                        caption: "jres:30250131", //RC 30250131 : Max. přiznání KH
                        width: 160, //align: "left"
                    })
                        .addTextColumn({
                        name: "typ_priz_dph_txt",
                        caption: "jres:30250130", //RC 30250130 : Typ KH
                        width: 130
                    })
                        .addDateColumn({
                        name: "dat_priz_dph",
                        caption: "jres:30250132", //RC 30250132 : Datum přiznání KH
                        width: 160, // align: "left"
                    });
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
                        that.viewKHDPH.requestData();
                        that.viewKHDPH.getLoadingPromise().
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
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci() {
                    var dataFound = this.view.getCount() > 0;
                    var tooltip = dataFound ? "" : "jres:30250113"; //RC 30250113 : Období nenalezeno
                    //            if (typeof this.currentRow === "undefined" || this.currentRow.typ_priz_dph == 0)
                    if (typeof this.currentRow === "undefined")
                        this.actions.actEditovat?.update({ enabled: dataFound, tooltip: tooltip });
                    else
                        this.actions.actEditovat?.update({ enabled: false, tooltip: "jres:30250115" }); //RC 30250115 : Již podáno přiznání
                    this.actions.actDetail?.update({ enabled: dataFound, tooltip: tooltip });
                    this.actions.actPriznani?.update({ enabled: dataFound, tooltip: tooltip });
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
                    var dataFound = this.viewKHDPH.getCount() > 0;
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
                    this.actions.actNovyPriznani?.updatePermission(this.priznatPermit);
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
                reloadKHDPH() {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    Gordic.Isl.InuObdobiKHDPH.list({ mesic: null })
                        .get()
                        .done(function (result) {
                        return def.resolve(result);
                    })
                        .always(function () { });
                    return def.promise();
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
                        this.dialogs.showModalWindow("Gordic.Inu.WebClient.GDetailObdobiDPH", { rok: row.rok, mesic: row.mesic, editace: editace, uid: "GDetailObdobiDPHID#" }, undefined, 900, 350, true)
                            //this.navigate("Gordic.Inu.WebClient.GDetailObdobiDPH", { rok: row.rok, mesic: row.mesic, editace: editace})
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                //reload(content);
                                if (editace)
                                    that.view.requestData(undefined);
                            }
                        });
                    }
                    else
                        this.dialogs.showModalWindow("Gordic.Inu.WebClient.GDetailObdobiDPH", { rok: 0, mesic: 0, editace: true, uid: "GDetailObdobiDPHID#" }, undefined, 900, 350, true)
                            //this.navigate("Gordic.Inu.WebClient.GDetailObdobiDPH", { rok: 0, mesic: 0, editace:true })
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                //that.reload(undefined);
                                that.view.requestData(undefined);
                                that.viewKHDPH.requestData(undefined);
                            }
                        });
                    //        this.dialogs.messageBox("jres:30250022", //RC 30250022 : Upozornění
                    //            "jres:30250023");  //RC 30250023 : Není vybrán žádný řádek!
                }
                /**
                 * Zobrazeni okna dle aktualniho radku
                 * @param content
                 * @param row
                 */
                ZobrazDetailKH(row, editace = false) {
                    var that = this;
                    if (this.closed)
                        return;
                    if (this.$gridPriznani === null)
                        return;
                    //(row as Interface.GHlaseniDPHDto).vyzva_odp
                    if (row != null) {
                        that.dialogs.showModalWindow("Gordic.Inu.WebClient.GDetailObdobiKH", { rok: row.rok_dph, mesic: row.mesic_dph, editace: editace, uid: "GDetailObdobiKHID#" })
                            //this.navigate("Gordic.Inu.WebClient.GDetailObdobiKH", { rok: row.rok_dph, mesic: row.mesic_dph, editace: editace })
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                //reload(content);
                                if (editace)
                                    that.viewKHDPH.requestData(undefined);
                            }
                        });
                    }
                    else
                        that.dialogs.showModalWindow("Gordic.Inu.WebClient.GDetailObdobiKH", { rok: 0, mesic: 0, editace: true, uid: "GDetailObdobiKHID#" })
                            //this.navigate("Gordic.Inu.WebClient.GDetailObdobiKH", { rok: 0, mesic: 0, editace:true })
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                //that.reload(undefined);
                                that.viewKHDPH.requestData(undefined);
                            }
                        });
                }
            };
            GSeznamZdanovaciObdobiDPH = __decorate([
                gcontent
            ], GSeznamZdanovaciObdobiDPH);
            WebClient.GSeznamZdanovaciObdobiDPH = GSeznamZdanovaciObdobiDPH;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVpkYW5vdmFjaU9iZG9iaURQSC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1aZGFub3ZhY2lPYmRvYmlEUEgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLElBQVUsTUFBTSxDQSsvQmY7QUEvL0JELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQSsvQm5CO0lBLy9CZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBKy9CN0I7UUEvL0JvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUEwQixTQUFRLE9BQUEsWUFBWTtnQkFBM0Q7b0JBRUk7Ozt1QkFHRzs7b0JBUUssWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztvQkE4QmpELFdBQU0sR0FBRyxvQkFBb0IsQ0FBQztnQkE4OEJsQyxDQUFDO2dCQTU4QkcsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLFdBQVc7b0JBR1gsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLE9BQU87b0JBQ1AsOEJBQThCO29CQUM5QixPQUFPO29CQUNQLEtBQUs7b0JBRUwsZ0JBQWdCO29CQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQU12QixvREFBb0Q7b0JBSXBELG9CQUFvQjtvQkFDcEIsMklBQTJJO29CQUMzSSx3QkFBd0I7b0JBQ3hCLHdCQUF3QjtvQkFDeEIsMEJBQTBCO29CQUcxQixzQkFBc0I7b0JBQ3RCLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUM1RCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDekIsQ0FBQyxDQUFD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QUFFLENBQUM7Z0NBQ3RELHlCQUF5QjtnQ0FDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQzFDLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQzthQUVKLENBQUE7WUF6L0JZLHlCQUF5QjtnQkFEckMsUUFBUTtlQUNJLHlCQUF5QixDQXkvQnJDO1lBei9CWSxtQ0FBeUIsNEJBeS9CckMsQ0FBQTtRQUVMLENBQUMsRUEvL0JvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUErL0I3QjtJQUFELENBQUMsRUEvL0JnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUErL0JuQjtBQUFELENBQUMsRUEvL0JTLE1BQU0sS0FBTixNQUFNLFFBKy9CZiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5uYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtWmRhbm92YWNpT2Jkb2JpRFBIIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgR0ludUJhc2VDbGFzcyB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFqYXggcHJvcGVydHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZGF0YURQSDogR29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaURQSER0b1tdO1xyXG4gICAgICAgIHByb3RlY3RlZCBkYXRhS0hEUEg6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlLSERQSER0b1tdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbG5pIG5hc3RhdmVuaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcmVhZG9ubHkgR2xvYmFsUGFyYW1zOiBHb3JkaWMuSW51LldlYkNsaWVudC5HSW51R2xvYmFsRHRvO1xyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5JbnUuR2xvYmFscy5HSW51R2xvYmFscztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JlY25lIHByb3BlcnR5XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBQcmVwRm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgcHJvdGVjdGVkIGZvcm06IEpRdWVyeTtcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIGVsZW06IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpuYW0gemRhbi4gb2Jkb2JpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlICRncmlkOiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V6bmFtIHByaXpuYW5pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlICRncmlkUHJpem5hbmk6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBHb3JkaWMuRGF0YS5WaWV3O1xyXG4gICAgICAgIHByaXZhdGUgdmlld0tIRFBIOiBHb3JkaWMuRGF0YS5WaWV3O1xyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFJvdzogR29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaURQSER0bztcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBvdm9sZW5pIHByaXpuYXRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBwcml6bmF0UGVybWl0OiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HUGVybWlzc2lvbjtcclxuICAgICAgICBcclxuICAgICAgICB0YXNrSWQgPSBcImFjdFpkYW5vdmFjaU9iZG9iaVwiO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBicmVhZGNydW1ic1xyXG4gICAgICAgICAgICAvL3RoaXMuc2V0QnJlYWRjcnVtYnMoW1xyXG4gICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiB0aGF0LnRpdGxlLFxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vXSk7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYWtjw61cclxuICAgICAgICAgICAgdGhpcy5EZWZpbmNlQWtjaSh0aGF0KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICQuZXh0ZW5kKHRoaXMubW9kZWxfYWt0LCB0aGlzLm1vZGVsICk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBtZW51QmFydVxyXG4gICAgICAgICAgICAvL3RoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE5vdnkqXCIsIFwiYWN0RGV0YWlsKlwiLCBcImFjdEVkaXRvdmF0KlwiLCBcImFjdFByZXBvY2V0KlwiLCBcImFjdFByaXpuYW5pKlwiLCBcImFjdERhbkRvbG96KlwiLCBcImFjdFRpc2sqXCJcclxuICAgICAgICAgICAgLy8gICAgLCBcImFjdE9iY2Vyc3R2aXQqXCJcclxuICAgICAgICAgICAgLy8gICAgLCBcImFjdEtvbnRyb2xhS0gqXCJcclxuICAgICAgICAgICAgLy8gICAgLCBcImFjdE9iZG9iaUtIKlwiXSkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluY2ljZSBwcm92aWRlcnVcclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPGFueSwgYW55LCBhbnk+KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBwcm9jZXNvcnUgbmEgdmlld1xyXG4gICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0LmRhdGFEUEgsIHsgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIgfSB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBkZWZpbmljZSB0YWJ1XHJcbiAgICAgICAgICAgIHZhciB0YWJPYmRvYmkgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoYXQudGFza0lkICsgXCJteVRhYk9iZG9iaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTA0NjRcIiwvL1JDIDMwMjUwNDY0IDogT2Jkb2LDrSBEUEhcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3ROb3Z5KlwiLCBcImFjdERldGFpbCpcIiwgXCJhY3RUaXNrKlwiLCBcImFjdFByZXBvY2V0RFBIKlwiLFwiYWN0T2JjZXJzdHZpdFwiXSlcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICB0aGF0LiRncmlkID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYk9iZG9iaSlcclxuICAgICAgICAgICAgICAgIC8vLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGFiRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaG93SGVhZGVyUm93OmZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IHRoYXQuY3VycmVudFJvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWwoY3R4LmNlbGxJbmZvLmRhdGEgYXMgYW55LCB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pRWRpdGFjZU9iZG9iaURQSCEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBvYmpla3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSBvYmpla3QuZ2V0U2VsZWN0aW9uKGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocmFkZWsubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC52aWV3S0hEUEgucmVxdWVzdERhdGEocmFkZWtbMF0ubWVzaWNfZHBoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5jdXJyZW50Um93ID0gcmFkZWtbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQudmlld0tIRFBILmdldExvYWRpbmdQcm9taXNlKCkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlQ29sc0RQSCgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy90aGF0LlZ5cm9iS2FydHkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBGb2t1cyBuYSBzZXpuYW1tdVxyXG4gICAgICAgICAgICB2YXIgZm9jdXNGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZCgnZm9jdXMnKTsgLy8gbmFzdGF2ZW7DrSBmb2N1c3UgbmEgZ3JpZFxyXG4gICAgICAgICAgICAgICAgKHRoYXQudmlldyBhcyBhbnkpLm9mZignY2hhbmdlLmZvY3VzJyk7IC8vIG9kdsOhesOhbsOtIHVkw6Fsb3N0aSB6IElTTCB2aWV3XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoYXQudmlldy5vbignY2hhbmdlLmZvY3VzJywgZm9jdXNGdW5jKTsgLy8gcMWZaSB6bcSbbsSbIElTTCB2aWV3IHNlIG5hdsOhxb5lIGZ1bmtjZSBmb2N1c0Z1bmNcclxuXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgLy8gZGVmaW5jaWNlIHByb3ZpZGVydVxyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXJLSERQSCA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoYSwgYikgPT4geyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnJlbG9hZEtIRFBIKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbmkgcHJvY2Vzb3J1IG5hIHZpZXdcclxuICAgICAgICAgICAgdGhhdC52aWV3S0hEUEggPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0LmRhdGFLSERQSCwgeyBwcm9jZXNzb3JzOiB7IHByb3ZpZGVyOiBwcm92aWRlcktIRFBIIH0gfSk7XHJcbiAgICAgICAgICAgIGxldCB0YWJLSERQSCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGhhdC50YXNrSWQgKyBcIm15VGFiS29udHJvbG5pSGxhc2VuaURQSDBcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNDgzXCIsLy9SQyAzMDI1MDQ4MyA6IE9iZG9iw60gS0hcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3REZXRhaWxLSCpcIiwgXCJhY3RQcmVwb2NldEtIKlwiLCBcImFjdE9iY2Vyc3R2aXRLSERQSFwiXSlcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICB0aGF0LiRncmlkUHJpem5hbmkgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiS0hEUEgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgbmFtZTpcInRhYktIRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3S0hEUEgsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIG9iamVrdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdERldGFpbEtILFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlQ29sc0tIRFBIKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGF0LnJlZnJlc2godHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoYXQudmlld0tIRFBILnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSgpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIGFrY2lcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgRGVmaW5jZUFrY2kodGhhdDogdGhpcykge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdERldGFpbERva2xhZHU6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0Tm92eTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uTm92eSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaUVkaXRhY2VPYmRvYmlEUEghLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ2N1wiLCAvL1JDLUVYIDMwMjUwNDY1IDogTm92w6kgb2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6XCJqcmVzOjMwMjUwNDY4XCIsIC8vUkMgMzAyNTA0NjggOiBPdGV2xZllbsOtIG5vdsOpaG8gemRhxYhvdmFjw61obyBvYmRvYsOtIGEgb2Jkb2LDrSBLSFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdE5vdnlQcml6bmFuaTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uTm92eSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsIHZpc2libGU6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByYWRlayA9IHRoYXQuY3VycmVudFJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayA9PT0gdW5kZWZpbmVkICYmIHJhZGVrID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWxQcml6bmFuaShudWxsLCByYWRlaz8ubWVzaWMgYXMgbnVtYmVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgLy8gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJhZGVrID0gdGhhdC5jdXJyZW50Um93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbChyYWRlaywgdGhhdC5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaUVkaXRhY2VPYmRvYmlEUEghKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGFjdEVkaXRvdmF0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PcHJhdml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSB0aGF0LmN1cnJlbnRSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6RGV0YWlsKHJhZGVrLCB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pRWRpdGFjZU9iZG9iaURQSCEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0UHJpem5hbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMDhcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSB0aGF0LmN1cnJlbnRSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6U2V6bmFtUHJpem5hbmkocmFkZWspO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGFjdERhbkRvbG96OiBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMTFcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTAxMTJcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJpbnVfcHRtX2RhbmRvbG9cIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBwbGF0bm9zdDogdGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0s/LnRvU3RyaW5nKCkudHJpbSgpICsgXCIxMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuSW51LldlYkNsaWVudC5HVWN0UHJpbnRQYXJhbWV0ZXJzOlNlcnZlclBhcmFtZXRlck1ldGhvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbihyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSB0aGF0LmN1cnJlbnRSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZW1hOiByZXAudGVtYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRFNlc3Rhdnk6IEdFSURTZXN0YXZ5LlNlem5hbU9iZG9iaURQSCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZXNpYzogcmFkZWs/Lm1lc2ljISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KGZhbHNlKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBhY3RLb250cm9sYUtIOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDUyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJhZGVrID0gdGhhdC5jdXJyZW50Um93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0eXBlb2YgcmFkZWsgIT09IHVuZGVmaW5lZCAmJiByYWRlayAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDEyNVwiKSAvL1JDIDMwMjUwMTI1IDogUHJvdsOhZMOtbSBrb250cm9sdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkludU9iZG9iaURQSC5rb250cm9sYVZsaXZ1Wm1lbk5hSGxhc2VuaURQSCgpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5zZXpuYW1fb2Jkb2JpIS50cmltKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzFcIiwgcmVzdWx0LnNlem5hbV9vYmRvYmkhKSAgICAvL1JDIDMwMjUwMTcxIDogVsO9c2xlZGVrIGtvbnRyb2x5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdOZXZ5a2F6YW5lRG9rbGFkeUtITCwgeyBkYXRhOiByZXN1bHQuZG9rbGFkeSwgdWlkOiBcIkdOZXZ5a2F6YW5lRG9rbGFkeUtITElEI1wiIH0sIFwianJlczozMDQ1MDA1MlwiLCA4MDAsIDYwMCwgdHJ1ZSkgLy9SQyAzMDQ1MDA1MiA6IERva2xhZHkgbmV2eWvDoXphbsOpIHYgS0hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T2Jkb2JpS0g6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTNcIiwgLy9SQyAzMDI1MDA1MyA6IE9iZG9iw60gS0hcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSB0aGF0LmN1cnJlbnRSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuSW51LldlYkNsaWVudC5HU2V6bmFtT2Jkb2JpS0hEUEhcIiwgeyBtZXNpYzogcmFkZWsubWVzaWMgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWxLSDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLCAvLyBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSB0aGF0LmN1cnJlbnRSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlLSERQSER0bz4odGhhdC4kZ3JpZFByaXpuYW5pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbEtIKHJhZGVrLCB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pRWRpdGFjZU9iZG9iaURQSCEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAxOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDAxOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImludV9wdG1fZHBoc2VzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdG5vc3Q6IHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LPy50b1N0cmluZygpLnRyaW0oKSArIFwiMTJcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkludS5XZWJDbGllbnQuR1VjdFByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RcIixcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24oZXZlbnQsIHJlcEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAocmVwSW5mbyAmJiByZXBJbmZvLmN1c3RvbURhdGEhLklYQl9ORVcgJiYgKHJlcEluZm8uY3VzdG9tRGF0YSEuSVhCX05FVykudHJpbSgpICE9IFwiXCIpICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByYWRlayA9IHRoYXQuY3VycmVudFJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaURQSER0bz4odGhhdC4kZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmFkZWsgIT09IHVuZGVmaW5lZCAmJiByYWRlayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbWE6IHJlcC50ZW1hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEU2VzdGF2eTogR0VJRFNlc3RhdnkuU2V6bmFtT2Jkb2JpRFBILFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lc2ljOiByYWRlaz8ubWVzaWMhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoZmFsc2UpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2tQcml6bmFuaTogR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDE4XCIsIC8vUkMgMzAyNTAwMTggOiBUaXNrXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwMDE4XCIsIC8vUkMgMzAyNTAwMTggOiBUaXNrXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiaW51X3B0bV9wcml6ZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdG5vc3Q6IHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LPy50b1N0cmluZygpLnRyaW0oKSArIFwiMTJcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkludS5XZWJDbGllbnQuR1VjdFByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RcIixcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24gKGV2ZW50LCByZXBJbmZvKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbVByaXpuYW5pRFBIRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVtYTogcmVwLnRlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSURTZXN0YXZ5OiBHRUlEU2VzdGF2eS5EZXRhaWxQcml6bmFuaURQSCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBQcml6bmFuaTogcmFkZWsudHlwX3ByaXpfZHBoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lc2ljOiByYWRlaz8ubWVzaWMhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvckNpc2xvOiByYWRlay5wb3JfY2lzbG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoZmFsc2UpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGFjdE9iY2Vyc3R2aXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9iY2Vyc3R2aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMzlcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5vYmNlcnN0dml0LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPYmNlcnN0dml0S0hEUEg6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9iY2Vyc3R2aXRLSERQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAzOVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLm9iY2Vyc3R2aXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGFjdFByb2hsaXplbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTVcIiwgLy9SQyAzMDI1MDA1NSA6IFByb2hsw63FvmVuw61cclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcmFkZWsgPSB0aGF0LmN1cnJlbnRSb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbVByaXpuYW5pRFBIRHRvPih0aGF0LiRncmlkUHJpem5hbmkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrTyA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1Qcml6bmFuaURQSER0bz4odGhhdC4kZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrTyAhPT0gdW5kZWZpbmVkICYmIHJhZGVrTyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6RGV0YWlsUHJpem5hbmkocmFkZWssIHJhZGVrTz8ubWVzaWMgYXMgbnVtYmVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0S29udHJvbGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNTRcIiwgLy9SQyAzMDI1MDA1NCA6IEtvbnRyb2xhIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1Qcml6bmFuaURQSER0bz4odGhhdC4kZ3JpZFByaXpuYW5pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuS29udHJvbGEocmFkZWsubWVzaWMgYXMgbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0UHJlcG9jZXRLSDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1NlwiLCAvL1JDIDMwMjUwMTU2IDogUMWZZXBvxI1ldCBzdGF2xa8gS0hcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaUtIRFBIRHRvPih0aGF0LiRncmlkUHJpem5hbmkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJlcG9jZXRTdGF2dUtIKHJhZGVrPy5yb2tfZHBoISwgcmFkZWs/Lm1lc2ljX2RwaCEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0UHJlcG9jZXREUEg6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTZcIiwgLy9SQyAzMDI1MDAxNiA6IFDFmWVwb8SNZXQgc3RhdsWvIERQSFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDQ4NVwiLCAvL1JDIDMwMjUwNDg1IDogUMWZZXBvxI1ldCBzdGF2xa8gRFBIIHogw7rEjWV0bsOtY2ggesOhcGlzxa8gcHJvIHZ5YnJhbsOpIG9iZG9iw60gRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByYWRlayA9IHRoYXQuY3VycmVudFJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByYWRlayAhPT0gdW5kZWZpbmVkICYmIHJhZGVrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByZXBvY2V0U3RhdnVEUEgocmFkZWs/LmljbyEsIHJhZGVrPy5yb2shLCByYWRlaz8ubWVzaWMhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgUHJlcG9jZXQgc3RhdnUgS0hcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgUHJlcG9jZXRTdGF2dUtIKHJvazogbnVtYmVyLCBtZXNpYzogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwNDUwMDMxXCIuZm9ybWF0KG1lc2ljLCByb2spKTsgLy9SQyAzMDQ1MDAzMSA6IFDFmWVwb8SNw610w6F2w6FtIHN0YXZ5IG9iZG9iw60gezB9L3sxfVxyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkludUtvbnRyb2xuaUhsYXNlbmkucHJlcG9jZXRTdGF2dUtIRFBIKHsgbWVzaWM6IG1lc2ljIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwianJlczozMDI1MDE1N1wiLmZvcm1hdChtZXNpYywgcm9rKSwgXCJzdWNjZXNzXCIpOyAvL1JDIDMwMjUwMTU3IDogQnlseSBwxZllcG/EjXRlbnkgc3RhdnkgS0ggdiBvYmRvYsOtIHswfS97MX1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcImpyZXM6MzAyNTAwNDRcIiwgXCJlcnJvclwiLCAyMDAwKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBQcmVwb2NldCBzdGF2dSBEUEhcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBQcmVwb2NldFN0YXZ1RFBIKGljbzogc3RyaW5nLCByb2s6IG51bWJlciwgbWVzaWM6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmcm1QcmVwb2NldCA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMSBNLTMtOS0wIEwtMy05LTAgYnJlYWtzLTQwMC01MDBcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ2R1bW15ZmllbGRcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwicmFkZWtcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwicmFkZWtcIlxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwNDBcIikgLy9SQyAzMDI1MDA0MCA6IEnEjE9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LThcIixcclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiaWNvXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDA0MVwiKSAvL1JDIDMwMjUwMDQxIDogUm9rXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy04XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcInJva1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwNDJcIikgLy9SQyAzMDI1MDA0MiA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LThcIixcclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwibWVzaWNcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgR0RsZy5zaW1wbGVGb3JtKFwianJlczozMDI1MDA2MFwiLCBmcm1QcmVwb2NldCwgeyBpY286IGljbywgcm9rOiByb2ssIG1lc2ljOiBtZXNpYyB9LCB7IHdpZHRoOiAzMDAsIGhlaWdodDogMzAwIH0pIC8vUkMgMzAyNTAwNjAgOiBQxZllcG/EjWV0IHN0YXbFryBEUEhcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChldiwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwNDUwMDI5XCIuZm9ybWF0KG1lc2ljLCByb2spKTsgLy9SQyAzMDQ1MDAyOSA6IFDFmWVwb8SNw610w6F2w6FtIHN0YXZ5IG9iZG9iw60gezB9L3sxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkludU9iZG9iaURQSC5wcmVwb2NldFN0YXZ1RFBIKHsgaWNvOiBpY28sIHJvazogcm9rLCBtZXNpYzogbWVzaWMgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJqcmVzOjMwNDUwMDMwXCIuZm9ybWF0KG1lc2ljLCByb2spLCBcInN1Y2Nlc3NcIik7IC8vUkMgMzA0NTAwMzAgOiBTdGF2eSBvYmRvYsOtIHswfS97MX0gcMWZZXBvxI10ZW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zaG93Rmxhc2goXCJqcmVzOjMwMjUwMDQ0XCIsIFwiZXJyb3JcIiwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIGRldGFpbHUgcHJpem5hbmkgZGxlIGFrdHVhbG5paG8gcmFka3VcclxuICAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFpvYnJhekRldGFpbFByaXpuYW5pKHJvdzogR29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbVByaXpuYW5pRFBIRHRvIHwgbnVsbCxtZXNpYzpudW1iZXIsIG5ld1JlY29yZDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRncmlkID09PSBudWxsKSByZXR1cm47XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbCAmJiAhbmV3UmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0RldGFpbFByaXpuYW5pRFBIXCIsIHsgcG9yQ2lzbG86IHJvdy5wb3JfY2lzbG8sIG1lc2ljOiByb3cubWVzaWMsIHR5cFByaXpuYW5pOiByb3cudHlwX3ByaXpfZHBoLCBuZXdSZWNvcmQ6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnJldHVyblZhbHVlICYmIHJlcy5yZXR1cm5WYWx1ZS5yZWZyZXNoID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JlbG9hZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGVkaXRhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudmlldy5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDA5NFwiKTsgLy9SQyAzMDI1MDA5NCA6IE5hxI3DrXTDoW0gZGF0YVxyXG4gICAgICAgICAgICAgICAgR29yZGljLklzbC5JbnVQcml6bmFuaURQSC5rb250cm9sYU5lcHJvdWN0b3ZhbnljaERva2xhZHUoeyBtZXNpYzogbWVzaWMgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LlJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLm5hdmlnYXRlKEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdWeWJlck5lemF1Y3RvdmFueWNoRG9rbGFkdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdOZXphdWN0b3ZhbmVjaERva2xhZHksIHsgZGF0YTogcmVzdWx0LlNlem5hbURva2xhZHUsIHVpZDogXCJHTmV6YXVjdG92YW5lY2hEb2tsYWR5SUQjXCIgfSwgXCJqcmVzOjMwMjUwMDk2XCIsIDgwMCwgNjAwLCB0cnVlKSAvL1JDIDMwMjUwMDk2IDogTmVwcm/DusSNdG92YW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lkdsb2JhbFBhcmFtcy5QYXJhbXM/LkJsb2thY2VBa2NpRGxlS29udHJvbERQSCA9PSBJbnRlcmZhY2UuR0VUeXBCbG9rYWNlRGxlU3RhdnVLb250cm9seURQSC5Ba2NlQmxva292YW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveCh7IHRpdGxlOiBcImpyZXM6MzAyNTAwODdcIiwgaHRtbDogXCJqcmVzOjMwMjUwMDg4XCIsIGJ1dHRvbnM6IEdEbGcubWJiWWVzTm8sIGljb246IEdEbGcubWJpUXVlc3Rpb24gfSkgLy9SQyAzMDI1MDA4OCA6IERhdGEgZGHFiG92w6lobyBvYmRvYsOtIG9ic2FodWrDrSBuZXByb8O6xI10b3ZhbsOpIGRva2xhZHksIGt0ZXLDqSBieSBtb2hseSBvdmxpdm5pdCBzdGF2eSBEUEguIFVtb8W+bml0IGkgcMWZZXN0byBwcm92w6lzdCBwxZlpem7DoW7DrSBEUEg/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmVyLnN0YXRlKCkgPT09IFwicGVuZGluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gem5vdnVuYcSNdGVuw60gc2V6bmFtdSAocG9kbGUgYWt0dcOhbG7DrWNoIGZpbHRyxa8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlZnJlc2hTZXpuYW11KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92eWJlckRva2xhZHUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKS5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlci5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0RldGFpbFByaXpuYW5pRFBIXCIsIHsgcG9yQ2lzbG86IDAsIG1lc2ljOiBtZXNpYywgbmV3UmVjb3JkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUucmVmcmVzaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVsb2FkKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGVkaXRhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3S0hEUEgucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBncmlkdSBvYmRvYmkgZHBoXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHNEUEgoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvPiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ0eXBfZHBoXCIsIGNhcHRpb246IFwianJlczozMDI1MDE2MVwiLCB3aWR0aDogMzAgfSkgLy9SQyAzMDI1MDE2MSA6IFMgXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwidHlwX2RwaF90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMwNDUwMDIxXCIsIHdpZHRoOiAxMzAgfSkgLy9SQyAzMDQ1MDAyMSA6IFN0YXYgb2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwibWVzaWNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTYyXCIsIHdpZHRoOiA3MCB9KSAvL1JDIDMwMjUwMTYyIDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicm9rXCIsIGNhcHRpb246IFwianJlczozMDQ1MDAyMFwiLCB3aWR0aDogNzAgfSkgLy9SQyAzMDQ1MDAyMCA6IFJva1xyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oeyBuYW1lOiBcImRhdF9wcml6X21heFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNjNcIiwgd2lkdGg6IDE2MCB9KSAvL1JDIDMwMjUwMTYzIDogTWF4LiBwxZlpem7DoW7DrSBEUEhcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ0eXBfcHJpel9kcGhfdHh0XCIsIGNhcHRpb246IFwianJlczozMDI1MDE2NFwiLCB3aWR0aDogMTMwIH0pIC8vUkMgMzAyNTAxNjQgOiBUeXAgcMWZaXpuw6Fuw60gRFBIXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7IG5hbWU6IFwiZGF0X3ByaXpfZHBoXCIsIGNhcHRpb246IFwianJlczozMDI1MDE2NVwiLCB3aWR0aDogMTYwIH0pIC8vUkMgMzAyNTAxNjUgOiBEYXR1bSBwxZlpem7DoW7DrSBEUEhcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJzX3ByZXBfZHBoX3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNjZcIiwgd2lkdGg6IDEyMCB9KTsgLy9SQyAzMDI1MDE2NiA6IFN0YXZ5IERQSFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1IG9iZG9iaSBLSERQSFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb2xzS0hEUEgoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpS0hEUEhEdG8+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpS0hEUEhEdG8+KClcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJ0eXBfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMzdcIiwgLy9SQyAzMDI1MDEzNyA6IFMgXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogMzBcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJ0eXBfZHBoX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMwNDUwMDIzXCIsIC8vUkMgMzA0NTAwMjMgOiBTdGF2IG9iZG9iw61cclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTM4XCIsIC8vUkMgMzAyNTAxMzggOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwNDUwMDIyXCIsIC8vUkMgMzA0NTAwMjIgOiBSb2tcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzBcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ByaXpfbWF4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTMxXCIsIC8vUkMgMzAyNTAxMzEgOiBNYXguIHDFmWl6bsOhbsOtIEtIXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE2MCwgLy9hbGlnbjogXCJsZWZ0XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcHJpel9kcGhfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTMwXCIsIC8vUkMgMzAyNTAxMzAgOiBUeXAgS0hcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ByaXpfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTMyXCIsIC8vUkMgMzAyNTAxMzIgOiBEYXR1bSBwxZlpem7DoW7DrSBLSFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNjAsIC8vIGFsaWduOiBcImxlZnRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtvbnRyb2xhIG5hIG5lcHJvdWN0b3ZhbmUgZG9rbGFkeVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBLb250cm9sYShtZXNpYzpudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMDk0XCIpOyAvL1JDIDMwMjUwMDk0IDogTmHEjcOtdMOhbSBkYXRhXHJcbiAgICAgICAgICAgIEdvcmRpYy5Jc2wuSW51UHJpem5hbmlEUEgua29udHJvbGFOZXByb3VjdG92YW55Y2hEb2tsYWR1KHsgbWVzaWM6IG1lc2ljIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LlJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubmF2aWdhdGUoR29yZGljLkludS5XZWJDbGllbnQuR1Z5YmVyTmV6YXVjdG92YW55Y2hEb2tsYWR1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuSW51LldlYkNsaWVudC5HTmV6YXVjdG92YW5lY2hEb2tsYWR5LCB7IGRhdGE6IHJlc3VsdC5TZXpuYW1Eb2tsYWR1LCB1aWQ6IFwiR05lemF1Y3RvdmFuZWNoRG9rbGFkeUlEI1wiIH0sIFwianJlczozMDI1MDA5NlwiLCA4MDAsIDYwMCwgdHJ1ZSk7IC8vUkMgMzAyNTAwOTYgOiBOZXByb8O6xI10b3ZhbsOpIGRva2xhZHlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcIkluZm9cIiwgcmVzdWx0Lk1lc3NhZ2UhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy92eWJlckRva2xhZHUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1bmFjdGVuaSBkYXRcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVmcmVzaChwcml6bmFuaTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHByaXpuYW5pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdLSERQSC5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3S0hEUEguZ2V0TG9hZGluZ1Byb21pc2UoKS5cclxuICAgICAgICAgICAgICAgICAgICBkb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLlxyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgVnlyb2JLYXJ0eSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgb2JkRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMSBNLTMtOS0wIEwtMy05LTAgYnJlYWtzLTQwMC01MDBcIilcclxuICAgICAgICAgICAgLy8gICAgLy8uYWRkRmllbGQoXCJnZHVtbXlmaWVsZFwiLCBcInctaFwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIG1vZGVsOiBcInJhZGVrXCIsXHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIG5hbWU6IFwicmFkZWtcIlxyXG4gICAgICAgICAgICAvLyAgICAvL30pXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coXCJ0eXBcIilcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctOFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgeyBuYW1lOiBcInR5cF9kcGhcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coXCJSb2tcIilcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctOFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgeyBuYW1lOiBcInJva1wiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KFwiTcSbc8OtY1wiKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy04XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB7IG5hbWU6IFwibWVzaWNcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coXCJkYXR1bVwiKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy04XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB7IG5hbWU6IFwiZGF0X3ByaXpfbWF4XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGl0ZW10ZW1wbGF0ZV9tZXNpYyA9IFwiPGRpdiBzdHlsZT0nYm9yZGVyOjFweCBzb2xpZCBMaWdodEdyYXk7IHBhZGRpbmc6IDVweDsgd2lkdGg6MjMwcHg7IGhlaWdodDozMDBweDsnPlwiICtcclxuICAgICAgICAgICAgLy8gICAgLy9cIjxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHtiYXJ2YV90eHR9OyBwYWRkaW5nOiA1cHg7Jz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPGRpdiBzdHlsZT0ncGFkZGluZzogNXB4Oyc+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxoMz48aSBjbGFzcz0nZmEge3NsMX0nIHN0eWxlPSdjb2xvcjogZ3JheTsnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+e21lc2ljfTwvaDM+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjwvZGl2PjxkaXYgc3R5bGU9J3dpZHRoOjIxOXB4OyBwYWRkaW5nOiA1cHg7Jz5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIC8vXCI8aDMgc3R5bGU9J2NvbG9yOiB7YWt0aXZpdGFfY29sb3J9Oyc+e2FrdGl2aXRhX3R4dH08L2gzPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8cD5TdGF2OiB7dHlwX2RwaH08L3A+XCI7XHJcbiAgICAgICAgICAgIC8vICAgIFwiPHA+TWF4LiBwxZlpem7DoW7DrSBEUEg6IHtkYXRfcHJpel9tYXhfdH08L3A+XCIgK1xyXG4gICAgICAgICAgICAvLyAgICBcIjxwPlR5cCBwxZlpem7DoW7DrToge3R5cF9wcml6X2RwaF90eHR9PC9wPlwiICtcclxuICAgICAgICAgICAgLy8gICAgXCI8cD5EYXR1bSBwxZlpem7DoW7DrToge2RhdF9wcml6X2RwaF90fTwvcD5cIiArXHJcbiAgICAgICAgICAgIC8vICAgIFwiPHA+U3RhdiBwxZllcG/EjXR1OiB7c19wcmVwX2RwaF90eHR9PC9wPjxicj5cIiArICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICBcIjwvZGl2PjwvZGl2PlwiO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIGthcnR5ID0gdGhpcy5lbGVtLmdjYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL3RpdGxlOiBcIlNlem5hbSBvYmRvYsOtIFwiLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAocmFkZWs6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdiA9IFwianJlczozMDI1MDA0OVwiOyAvL1JDIDMwMjUwMDQ5IDogT3RldsWZZW7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvclN0YXYgPSBcImctc3RhdGUtaW5mb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5zX2RwaCA9PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF2ID0gXCJqcmVzOjMwMjUwMDUwXCI7IC8vUkMgMzAyNTAwNTAgOiBacMSbdG7EmyBvdGV2xZllbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yU3RhdiA9IFwiZy1zdGF0ZS13YXJuaW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhZGVrLnNfZHBoID09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXYgPSBcImpyZXM6MzAyNTAwNTFcIjsgLy9SQyAzMDI1MDA1MSA6IFV6YXbFmWVuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JTdGF2ID0gXCJnLXN0YXRlLXN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFwiPGRpdiBjbGFzcz0naXRlbXMgZ2NhcmQnIHN0eWxlPSdkaXNwbGF5OiBibG9jazsgZmxvYXQ6IGxlZnQ7IGJhY2tncm91bmQ6I2ZmZmZmZiBoZWlnaHQ6MjAwcHg7Jz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nZy1jYXJkJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nZy1yYXAtY2FyZCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2ctY2FyZC1oZWFkZXInPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdnLWNhcmQtaGVhZGVyLXRleHQgZ3Rvb2x0aXAnPlwiICsgcmFkZWsubWVzaWMgKyBcIiZuYnNwOyZuYnNwOyZuYnNwOzxzcGFuIGNsYXNzPSdcIiArIGNvbG9yU3RhdiArIFwiJyA+XCIgKyBzdGF2ICsgXCI8L3NwYW4+PC9kaXY+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdnLWNhcmQtbWFpbic+PC9icj5cIjsvLytcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cIjxkaXYgY2xhc3M9J1wiICsgY29sb3JTdGF2ICsgXCInID48c3Ryb25nPlwiICsgc3RhdiArIFwiPC9zdHJvbmc+PC9kaXY+PC9icj5cIjsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHJlc3VsdCA9IFwiPGRpdiBzdHlsZT0nYm9yZGVyOjFweCBzb2xpZCBMaWdodEdyYXk7IHBhZGRpbmc6IDVweDsgd2lkdGg6MjMwcHg7IGhlaWdodDoyMDBweDsnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBcIjxkaXYgc3R5bGU9J3BhZGRpbmc6IDVweDsnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBcIjxoMz48aSBjbGFzcz0nZmEgJyBzdHlsZT0nY29sb3I6IGdyYXk7JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPlwiICsgcmFkZWsubWVzaWMgKyBcIjxzcGFuIGNsYXNzPSdcIiArIGNvbG9yU3RhdiArXCInPiZuYnNwOyZuYnNwOyZuYnNwOyBcIisgc3RhditcIjwvc3Bhbj48L2gzPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBcIjwvZGl2PjxkaXYgc3R5bGU9J3dpZHRoOjIxOXB4OyBwYWRkaW5nOiA1cHg7Jz5cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiPGRpdj5qcmVzOjMwMjUwMDQ2XCIuZm9ybWF0KEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRlKHJhZGVrLmRhdF9wcml6X21heCkpICsgXCI8L2Rpdj5cIiArIC8vUkMgMzAyNTAwNDYgOiBNYXguIHDFmWl6bsOhbsOtIERQSDogezB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPHA+PHN0cm9uZz5cIiArIHJhZGVrLnR5cF9wcml6X2RwaF90eHQgKyBcIjwvc3Ryb25nPjwvcD5cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gXCJnLXN0YXRlLXN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsuc19wcmVwX2RwaCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IFwiZy1zdGF0ZS1lcnJvclwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCI8ZGl2PjxiIGNsYXNzPSdcIiArIGNvbG9yICsgXCIgZy1zdGF0ZS10ZXh0ICc+XCIgKyByYWRlay5zX3ByZXBfZHBoX3R4dCArIFwiPC9iPjwvZGl2PjwvYnI+XCIgIC8vUkMgMzAyNTAwNDggOiBzdGF2IHDFmWVwb8SNdHU6IHswfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Jlc3VsdCArPSBcIjxwPmpyZXM6MzAyNTAwNDZcIi5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUocmFkZWsuZGF0X3ByaXpfbWF4KSkgKyBcIjwvcD5cIiArIC8vUkMgMzAyNTAwNDYgOiBNYXguIHDFmWl6bsOhbsOtIERQSDogezB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgXCI8cD48Yj5cIiArIHJhZGVrLnR5cF9wcml6X2RwaF90eHQgKyBcIjwvYj48L3A+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXCI8cD5UeXAgcMWZaXpuw6Fuw606XCIgKyByYWRlay50eXBfcHJpel9kcGhfdHh0ICsgXCI8L3A+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLmRhdF9wcml6X2RwaCAhPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXN1bHQgKz0gXCI8cD48Yj5cIityYWRlay5kYXRfcHJpel9kcGggKyBcIjwvYj48L3A+XCI7IC8vUkMgMzAyNTAwNDcgOiBEYXR1bSBwxZlpem7DoW7DrTogezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIjxkaXY+anJlczozMDI1MDA0N1wiLmZvcm1hdChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZShyYWRlay5kYXRfcHJpel9kcGgpKSArIFwiPC9kaXY+XCI7IC8vUkMgMzAyNTAwNDcgOiBEYXR1bSBwxZlpem7DoW7DrTogezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzdWx0ICs9IFwiPHA+anJlczozMDI1MDA0N1wiLmZvcm1hdChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZShyYWRlay5kYXRfcHJpel9kcGgpKSArIFwiPC9wPlwiOyAvL1JDIDMwMjUwMDQ3IDogRGF0dW0gcMWZaXpuw6Fuw606IHswfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvciA9IFwiZy1zdGF0ZS1zdWNjZXNzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAocmFkZWsuc19wcmVwX2RwaCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbG9yID0gXCJnLXN0YXRlLWVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8vL3N0eWxlID0gJ2NvbG9yOiBcIiArIGNvbG9yICsgXCI7JyBcclxuICAgICAgICAgICAgICAgICAgICAvLy8vaSBjbGFzcz0nZmEgZmEtY2hlY2stY2lyY2xlIFwiICsgY29sb3IgKyBcIiBnLXN0YXRlLXRleHQgJyBhcmlhIC0gaGlkZGVuPSd0cnVlJyA+IDwvaT5cclxuICAgICAgICAgICAgICAgICAgICAvLy8vanJlczogMzAyNTAwNDhcIi5mb3JtYXQocmFkZWsuc19wcmVwX2RwaF90eHQgYXMgYW55KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVzdWx0ICs9IFwiPGRpdj48YiBjbGFzcz0nXCIgKyBjb2xvciArIFwiIGctc3RhdGUtdGV4dCAnPlwiICsgcmFkZWsuc19wcmVwX2RwaF90eHQgKyBcIjwvYj48L2Rpdj48L2JyPlwiICsgLy9SQyAzMDI1MDA0OCA6IHN0YXYgcMWZZXBvxI10dTogezB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9ICAgXCI8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIjtcclxuICAgICAgICAgICAgICAgICAgICAvL3Jlc3VsdCArPSBcIjxwPjxiIGNsYXNzPSdcIiArIGNvbG9yICsgXCIgZy1zdGF0ZS10ZXh0ICc+XCIrcmFkZWsuc19wcmVwX2RwaF90eHQgICsgXCI8L2I+PC9wPjxicj5cIiArIC8vUkMgMzAyNTAwNDggOiBzdGF2IHDFmWVwb8SNdHU6IHswfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIFwiPC9kaXY+PC9kaXY+XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9ICwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXcsXHJcbiAgICAgICAgICAgICAgICAvL2Zvcm06IG9iZEZvcm0sXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUYWI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gKGV2LCBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhbmVsID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbChudWxsKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgZWRpdDogZnVuY3Rpb24gKGV2LCBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhbmVsID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWwoZGF0YSBhcyBhbnksdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbChjdHguaXRlbS5kYXRhIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSwgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvKSB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmN1cnJlbnRSb3cgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBOYXN0YXZlbmlBa2NpKCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZGF0YUZvdW5kID0gdGhpcy52aWV3LmdldENvdW50KCkgPiAwO1xyXG4gICAgICAgICAgICB2YXIgdG9vbHRpcCA9IGRhdGFGb3VuZCA/IFwiXCIgOiBcImpyZXM6MzAyNTAxMTNcIjsgLy9SQyAzMDI1MDExMyA6IE9iZG9iw60gbmVuYWxlemVub1xyXG5cclxuLy8gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY3VycmVudFJvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmN1cnJlbnRSb3cudHlwX3ByaXpfZHBoID09IDApXHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuY3VycmVudFJvdyA9PT0gXCJ1bmRlZmluZWRcIiApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RWRpdG92YXQ/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEVkaXRvdmF0Py51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogXCJqcmVzOjMwMjUwMTE1XCIgfSk7IC8vUkMgMzAyNTAxMTUgOiBKacW+IHBvZMOhbm8gcMWZaXpuw6Fuw61cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcml6bmFuaT8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kLCB0b29sdGlwOiB0b29sdGlwIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gS0ggRFBIIHBvdXplIHBybyByb2sgMjAxNiBhIHZ5c2VcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0S29udHJvbGFLSD8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kICYmIHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LISA+PSAyMDE2LCB2aXNpYmxlOiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyEgPj0gMjAxNiB9KTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0T2Jkb2JpS0g/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCAmJiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyEgPj0gMjAxNiwgdmlzaWJsZTogdGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0shID49IDIwMTYgfSk7XHJcbiAgICAgICAgICAgIC8vIHRpc2tcclxuICAgICAgICAgICAgaWYgKHRoaXMuR2xvYmFsUGFyYW1zLlBhcmFtcz8uUG92b2xlbmlUaXNrdSkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VGlzaz8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kLCB0b29sdGlwOiB0b29sdGlwIH0pOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VGlzaz8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDEwNVwiIH0pOyAvL1JDIDMwMjUwMTA1IDogTmVuw60gcG92b2xlbm8gcGFyYW1ldHJlbVxyXG4gICAgICAgICAgICAvLyBkYW5vdmEgZG9sb3plbm9zdFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0RGFuRG9sb3o/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBQcml6bmFuaVxyXG4gICAgICAgICAgICAvLy0tLS0tLS0tLVxyXG4gICAgICAgICAgICB2YXIgZGF0YUZvdW5kID0gdGhpcy52aWV3S0hEUEguZ2V0Q291bnQoKSA+IDA7XHJcbiAgICAgICAgICAgIHZhciB0b29sdGlwID0gZGF0YUZvdW5kID8gXCJcIiA6IFwianJlczozMDI1MDExNFwiOyAvL1JDIDMwMjUwMTE0IDogUMWZaXpuw6Fuw60gbmVuYWxlemVub1xyXG4gICAgICAgICAgICAvLyB0aXNrXHJcbiAgICAgICAgICAgIGlmICh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlBvdm9sZW5pVGlza3UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VGlza1ByaXpuYW5pPy51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFRpc2tQcml6bmFuaT8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDEwNVwiIH0pOyAvL1JDIDMwMjUwMTA1IDogTmVuw60gcG92b2xlbm8gcGFyYW1ldHJlbVxyXG4gICAgICAgICAgICAvLyBwcm9obGl6ZW5pXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcm9obGl6ZW5pPy51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7XHJcbiAgICAgICAgICAgIC8vIG5vdmUgcG9kYW5pXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3ROb3Z5UHJpem5hbmk/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5wcml6bmF0UGVybWl0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBabm92dW5hY3RlbmkgZGF0IHpkYW5vdmFjaWhvIG9iZG9iaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkludU9iZG9iaURQSC5saXN0KClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7IH0pICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogIFpub3Z1bmFjdGVuaSBkYXQgcHJpem5hbmlcclxuICAgICAgICAqIFxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWxvYWRLSERQSCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5jbG9zZWQpIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgR29yZGljLklzbC5JbnVPYmRvYmlLSERQSC5saXN0KHsgbWVzaWM6IG51bGwgYXMgYW55IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7IH0pXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIHNlem5hbXUgcHJpem5hbmkgRFBIIGRsZSBha3R1YWxuaWhvIHJhZGt1XHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAgKiBAcGFyYW0gcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBab2JyYXpTZXpuYW1Qcml6bmFuaShyb3c6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlEUEhEdG8gfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRncmlkID09PSBudWxsKSByZXR1cm47XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdTZXpuYW1Qcml6bmFuaURQSFwiLCB7IHJvazogcm93LnJvaywgbWVzaWM6IHJvdy5tZXNpYywgaWRlbnRpZmlrYXRvcjogcm93LmljbyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMDIyXCIsIC8vUkMgMzAyNTAwMjIgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMDIzXCIpOyAgLy9SQyAzMDI1MDAyMyA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlayFcclxuXHJcbiBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgb2tuYSBkbGUgYWt0dWFsbmlobyByYWRrdVxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHJvd1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgWm9icmF6RGV0YWlsKHJvdzogR29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaURQSER0byB8IG51bGwsIGVkaXRhY2U6IGJvb2xlYW49ZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLiRncmlkID09PSBudWxsKSByZXR1cm47XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKHJvdyAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxPYmRvYmlEUEhcIiwgeyByb2s6IHJvdy5yb2ssIG1lc2ljOiByb3cubWVzaWMsIGVkaXRhY2U6IGVkaXRhY2UsIHVpZDogXCJHRGV0YWlsT2Jkb2JpRFBISUQjXCIgfSwgdW5kZWZpbmVkLCA5MDAsIDM1MCwgdHJ1ZSlcclxuICAgICAgICAgICAgLy90aGlzLm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0RldGFpbE9iZG9iaURQSFwiLCB7IHJvazogcm93LnJvaywgbWVzaWM6IHJvdy5tZXNpYywgZWRpdGFjZTogZWRpdGFjZX0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnJldHVyblZhbHVlICYmIHJlcy5yZXR1cm5WYWx1ZS5yZWZyZXNoID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVsb2FkKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWRpdGFjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuSW51LldlYkNsaWVudC5HRGV0YWlsT2Jkb2JpRFBIXCIsIHsgcm9rOjAsIG1lc2ljOiAwLCBlZGl0YWNlOiB0cnVlLCB1aWQ6IFwiR0RldGFpbE9iZG9iaURQSElEI1wiIH0sIHVuZGVmaW5lZCwgOTAwLCAzNTAsIHRydWUpXHJcbiAgICAgICAgICAgIC8vdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxPYmRvYmlEUEhcIiwgeyByb2s6IDAsIG1lc2ljOiAwLCBlZGl0YWNlOnRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUucmVmcmVzaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlbG9hZCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdLSERQSC5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgICAgIHRoaXMuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDAyMlwiLCAvL1JDIDMwMjUwMDIyIDogVXBvem9ybsSbbsOtXHJcbiAgICAvLyAgICAgICAgICAgIFwianJlczozMDI1MDAyM1wiKTsgIC8vUkMgMzAyNTAwMjMgOiBOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IMWZw6FkZWshXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIG9rbmEgZGxlIGFrdHVhbG5paG8gcmFka3VcclxuICAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFpvYnJhekRldGFpbEtIKHJvdzogR29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaUtIRFBIRHRvIHwgR29yZGljLkludS5JbnRlcmZhY2UuR0hsYXNlbmlEUEhEdG8gfCBudWxsLCBlZGl0YWNlOiBib29sZWFuID0gZmFsc2UgKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRncmlkUHJpem5hbmkgPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8vKHJvdyBhcyBJbnRlcmZhY2UuR0hsYXNlbmlEUEhEdG8pLnZ5enZhX29kcFxyXG5cclxuICAgICAgICAgICAgaWYgKHJvdyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkludS5XZWJDbGllbnQuR0RldGFpbE9iZG9iaUtIXCIsIHsgcm9rOiByb3cucm9rX2RwaCwgbWVzaWM6IHJvdy5tZXNpY19kcGgsIGVkaXRhY2U6IGVkaXRhY2UsIHVpZDogXCJHRGV0YWlsT2Jkb2JpS0hJRCNcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxPYmRvYmlLSFwiLCB7IHJvazogcm93LnJva19kcGgsIG1lc2ljOiByb3cubWVzaWNfZHBoLCBlZGl0YWNlOiBlZGl0YWNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMucmV0dXJuVmFsdWUgJiYgcmVzLnJldHVyblZhbHVlLnJlZnJlc2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVsb2FkKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVkaXRhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3S0hEUEgucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuSW51LldlYkNsaWVudC5HRGV0YWlsT2Jkb2JpS0hcIiwgeyByb2s6IDAsIG1lc2ljOiAwLCBlZGl0YWNlOiB0cnVlLCB1aWQ6IFwiR0RldGFpbE9iZG9iaUtISUQjXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMubmF2aWdhdGUoXCJHb3JkaWMuSW51LldlYkNsaWVudC5HRGV0YWlsT2Jkb2JpS0hcIiwgeyByb2s6IDAsIG1lc2ljOiAwLCBlZGl0YWNlOnRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUucmVmcmVzaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlbG9hZCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3S0hEUEgucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59Il19