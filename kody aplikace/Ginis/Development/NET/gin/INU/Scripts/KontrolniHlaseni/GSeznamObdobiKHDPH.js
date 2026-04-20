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
            let GSeznamObdobiKHDPH = class GSeznamObdobiKHDPH extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actSeznamObdobiKHDPH";
                    this.uid = "GSeznamObdobiKHDPH#";
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                onContentReady() {
                    var that = this;
                    //nastavení breadcrumbs
                    //this.setBreadcrumbs([
                    //    {
                    //        caption: that.title,
                    //    }
                    //]);
                    //nastavení akcí
                    this.actions.addRange({
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: () => {
                                //var radek = that.currentRow
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetail(radek, that.globals.Globalni_Parametry.PovoleniEditaceObdobiDPH);
                            }
                        }),
                        actEditovat: Gordic.Eko.Action.actionOpravit({
                            enabled: false, visible: false,
                            run: function () {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetail(radek, that.globals.Globalni_Parametry.PovoleniEditaceObdobiDPH);
                            }
                        }),
                        actKontrolaKH: {
                            caption: "jres:30250052", //RC 30250052 : Kontrola KH
                            run: () => {
                                that.beginOperation("jres:30250125"); //RC 30250125 : Provádím kontrolu
                                Gordic.Isl.InuObdobiDPH.kontrolaVlivuZmenNaHlaseniDPH().
                                    get()
                                    .done(function (result) {
                                    if (result && result.seznam_obdobi.trim() != "")
                                        that.dialogs.messageBox("jres:30250171", result.seznam_obdobi) //RC 30250171 : Výsledek kontroly
                                            .on("close", function (res) {
                                            that.dialogs.messageBox("jres:30450053" //RC 30450053 : Dotaz
                                            , "jres:30450054", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30450054 : Zobrazit seznam dokladů, ve kterých došlo ke změnám v souvislosti s Kontrolním hlášením ?
                                                .on("yes", function () {
                                                that.dialogs.showModalWindow(Gordic.Inu.WebClient.GNevykazaneDokladyKHL, { data: result.doklady, uid: "GNevykazaneDokladyKHLID#" }, "jres:30450052", 800, 600, true) //RC 30450052 : Seznam daňových dokladů zaúčtovaných po provedení přiznání KHL
                                                    .on("close", function (res) {
                                                });
                                            });
                                        });
                                    //else
                                    //    that.dialogs.messageBox("", "jres:30250170"); //RC 30250170 : Nezjištěna žádná chyba
                                })
                                    .always(function () {
                                    that.endOperation();
                                });
                            }
                        },
                        actPrepocet: {
                            caption: "jres:30250156", //RC 30250156 : Přepočet stavů KH
                            run: () => {
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.Prepocet(radek?.mesic_dph);
                            }
                        },
                        actNove: Gordic.Eko.Action.actionNovy({
                            caption: "jres:30250479" //RC 30250479 : Nové hlášení
                            ,
                            tooltip: "jres:30250480" //RC 30250480 : Nové kontrolní hlášení DPH
                            ,
                            enabled: false,
                            run: function () {
                                //var radek = Gordic.Eko.Grid.currentRow<Gordic.Inu.Interface.GSeznamObdobiKHDPHDto>(that.GetGridHlaseni());
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null) {
                                    radek.por_cislo = 0;
                                    that.ZobrazDetail(radek, true, true);
                                }
                            }
                        }),
                        actProhlizeni: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: () => {
                                var radek = Gordic.Eko.Grid.currentRow(that.getGridHlaseni());
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetail(radek, false, true);
                            }
                        }),
                        actTisk: GAction.createPrintAction({
                            name: "actTisk",
                            caption: "jres:30250018", //RC 30250018 : Tisk
                            tooltip: "jres:30250018", //RC 30250018 : Tisk
                            icon: "gi-print",
                            tema: "inu_ptm_dphsest",
                            platnost: this.GlobalParams.EkoParams?.ROK?.toString().trim() + "12",
                            serverParameterMethod: "Gordic.Inu.WebClient.GUctPrintParameters:ServerParameterMethod",
                            reportFinished: function (event, repInfo) {
                                //if (repInfo && repInfo.customData!.IXB_NEW && (repInfo.customData!.IXB_NEW).trim() != "")                            
                            },
                            enabled: true,
                            favorite: false,
                            parentContent: that,
                            reportStarting: function (rep) {
                                // var radek = that.currentRow;
                                var radek = Gordic.Eko.Grid.currentRow(that.$grid);
                                if (typeof radek !== undefined && radek != null) {
                                    rep.customDto = {
                                        Tema: rep.tema,
                                        IDSestavy: 140 /* GEIDSestavy.SeznamObdobiDPH */,
                                        Mesic: radek?.mesic_dph,
                                    };
                                }
                                else
                                    return $.Deferred().reject(false).promise();
                            }
                        }),
                        actObcerstvit: {
                            name: "actObcerstvit",
                            caption: "jres:30250039", //RC 30250039 : Občerstvit
                            tooltip: "",
                            icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.refresh();
                            }
                        },
                        actObcerstvitHL: {
                            name: "actObcerstvitHL",
                            caption: "jres:30250039", //RC 30250039 : Občerstvit
                            tooltip: "",
                            icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                var radek = that.getGridHlaseni().ggrid("getSelection", false, true);
                                if (radek.length == 1) {
                                    that.viewHlaseni.requestData(radek[0].mesic_dph);
                                    that.viewHlaseni.getLoadingPromise().
                                        done(() => {
                                        that.NastaveniAkci();
                                    });
                                }
                            }
                        }
                    });
                    console.log("data: ", this.model);
                    //            $.extend(this.model_akt, this.model );
                    //nastavení menuBaru
                    //this.menuBar(this.actions.createBar([ "actDetail*", "actEditovat*","actTisk*"
                    //    , "actObcerstvit*"
                    //    , "actKontrolaKH*"
                    //    ]));
                    //let provider = new Gordic.Data.Provider<any, any, any>((a, b) => {
                    //    return that.reload();
                    //});
                    //that.view = new Gordic.Data.View(that.model, { processors: { provider: provider } });
                    //that.VyrobKarty();
                    //that.refresh();
                    /////////////
                    // defincice provideru
                    let provider = new Gordic.Data.Provider((a, b) => {
                        return that.reload();
                    });
                    // nastaveni procesoru na view
                    that.view = new Gordic.Data.View(that.model, { processors: { provider: provider } });
                    var tabObdobi = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        id: that.taskId + "myTabObdobi",
                        title: "jres:30250476", //RC 30250476 : Období KH
                        //title: "jres:30250128".format(that.GlobalParams.EkoParams?.ROK?.toString()),//RC 30250128 :  Období KH - {0}
                        opened: true,
                        menuBar: this.actions.createBar(["actDetail*", "actEditovat*", "actTisk*", "actPrepocet*",
                            "actKontrolaKH*",
                            "actObcerstvit"
                        ])
                    });
                    // definicie gridu
                    that.$grid = $("<div>")
                        .css("height", "100%")
                        .appendTo(tabObdobi)
                        .ggrid({
                        columnMode: "full",
                        data: that.view,
                        name: "obdobiKHDPHHorni",
                        selection: function (ev, objekt) {
                            var radek = objekt.getSelection(false, true);
                            if (radek.length == 1) {
                                that.viewHlaseni.requestData(radek[0].mesic_dph);
                                that.viewHlaseni.getLoadingPromise().
                                    done(() => {
                                    that.NastaveniAkci();
                                });
                            }
                        },
                        defaultAction: this.actions.actDetail,
                        columns: that.createCols()
                    });
                    var tabHlaseni = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        id: that.taskId + "myTabHlaseni",
                        title: "jres:30250136", //RC 30250136 : Kontrolní hlášení za období
                        opened: true,
                        menuBar: this.actions.createBar(["actNove*", "actProhlizeni*", "actObcerstvitHL"
                        ])
                        //, customMenuID: that.taskId
                    });
                    let provider2 = new Gordic.Data.Provider((a, b) => {
                        if (typeof b["request"] === "number")
                            return that.ReloadHlaseni(b["request"]);
                        else
                            return $.Deferred().resolve().promise();
                    });
                    // nastaveni procedoru na view
                    that.viewHlaseni = new Gordic.Data.View(that.model, { processors: { provider: provider2 } });
                    $("<div class='js-inuHlaseniGrid'>")
                        .css("height", "100%")
                        .appendTo(tabHlaseni)
                        .ggrid({
                        //id: "idzapisygrid",
                        columnMode: "full",
                        data: that.viewHlaseni,
                        name: "obdobiKHDPHDolni",
                        columns: that.createColsHlaseni(),
                        selection: function (ev, objekt) {
                        },
                        defaultAction: this.actions.actProhlizeni,
                    })
                        .gautofit({ resizersOnTab: false });
                    this.refresh();
                    //that.view.requestData();
                    // Fokus na seznammu
                    var focusFunc = function () {
                        that.$grid.ggrid('focus'); // nastavení focusu na grid
                        that.view.off('change.focus'); // odvázání události z ISL view
                    };
                    that.view.on('change.focus', focusFunc); // při změně ISL view se naváže funkce focusFunc
                    if (that.globalSettings.get("Global.Inu.AppSettings.InuSettingsFormDPH.BeforeRunCheck"))
                        this.dialogs.messageBox("jres:30250124", //RC 30250124 : Dotaz
                        "jres:30250123", //RC 30250123 : Chcete provést kontrolu jednotlivých období DPH, zda v nich došlo ke změnám v souvislosti s Kontrolním hlášením?
                        GDlg.mbbYesNo, GDlg.mbiQuestion)
                            .on("yes", () => {
                            that.actions.actKontrolaKH?.run();
                        })
                            .on("close", () => {
                            that.$grid.ggrid('focus');
                        });
                    /////////////
                }
                /**
                 *  Definice sloupcu
                 *
                 * */
                createColsHlaseni() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addNumberColumn({
                        name: "por_cislo",
                        caption: "jres:30250056", //RC 30250056 : Pořadí
                        width: 70
                    })
                        .addTextColumn({
                        name: "typ_priz_dph_txt",
                        caption: "jres:30250130", //RC 30250130 : Typ KH
                        width: 110
                    })
                        .addDateColumn({
                        name: "dat_priz_max",
                        caption: "jres:30250131", //RC 30250131 : Max.přiznání KH
                        width: 150, //align: "left"
                    })
                        .addDateColumn({
                        name: "dat_priz_dph",
                        caption: "jres:30250132", //RC 30250132 : Datum přiznání KH
                        width: 160, //align: "left"
                    })
                        .addDateColumn({
                        name: "dat_zjist_dod",
                        caption: "jres:30250133", //RC 30250133 : Zjištění pro dod.KH
                        width: 165, //align: "left"
                    });
                    return gridFormat;
                }
                /**
                 *  Definice sloupcu
                 *
                 * */
                createCols() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        //.addTextColumn({
                        //    name: "typ_dph",
                        //    caption: "jres:30450025", //RC 30450025 : S 
                        //    width: 30
                        //})
                        //.addTextColumn({
                        //    name: "typ_dph_txt",
                        //    caption: "jres:30450024", //RC 30450024 : Stav období
                        //    width: 130
                        //})
                        .addNumberColumn({
                        name: "mesic_dph",
                        caption: "jres:30250138", //RC 30250138 : Měsíc
                        width: 70
                    })
                        .addNumberColumn({
                        name: "rok_dph",
                        caption: "jres:30450026", //RC 30450026 : Rok
                        width: 70
                    })
                        .addDateColumn({
                        name: "dat_priz_max",
                        caption: "jres:30250131", //RC 30250131 : Max.přiznání KH
                        width: 160, //align: "left"
                    })
                        .addTextColumn({
                        name: "typ_priz_dph_txt",
                        caption: "jres:30250130", //RC 30250130 : Typ KH
                        width: 110
                    })
                        .addDateColumn({
                        name: "dat_priz_dph",
                        caption: "jres:30250132", //RC 30250132 : Datum přiznání KH
                        width: 160, //align: "left"
                    });
                    return gridFormat;
                }
                /**
                 * Znovunacteni dat
                 * */
                refresh() {
                    var that = this;
                    that.view.requestData();
                    that.view.getLoadingPromise().
                        done(() => {
                        that.NastaveniAkci();
                    });
                }
                /**
                 *
                 *
                 * */
                VyrobKarty() {
                    var that = this;
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
                                "<div class='g-card-header-text gtooltip'>" + radek.mesic_dph + "&nbsp;&nbsp;&nbsp;<span class='" + colorStav + "' >" + stav + "</span></div>" +
                                "</div>" +
                                "<div class='g-card-main'></br>"; //+
                            result += "<div>jres:30250046".format(Gordic.Templates.Formatters.date(radek.dat_priz_max)) + "</div>" + //RC 30250046 : Max. přiznání DPH: {0}                        
                                "<p><strong>" + radek.typ_priz_dph_txt + "</strong></p>";
                            var color = "g-state-success";
                            if (radek.s_prep_dph == 0)
                                color = "g-state-error";
                            result += "<div><b class='" + color + " g-state-text '>" + radek.s_prep_dph_txt + "</b></div></br>"; //RC 30250048 : stav přepočtu: {0}
                            if (radek.dat_priz_dph !== null)
                                //result += "<p><b>"+radek.dat_priz_dph + "</b></p>"; //RC 30250047 : Datum přiznání: {0}
                                result += "<div>jres:30250047".format(Gordic.Templates.Formatters.date(radek.dat_priz_dph)) + "</div>"; //RC 30250047 : Datum přiznání: {0}
                            //result += "<p>jres:30250047".format(Gordic.Templates.Formatters.date(radek.dat_priz_dph)) + "</p>"; //RC 30250047 : Datum přiznání: {0}
                            var color = "g-state-success";
                            result += "</div></div></div></div>";
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
                    this.actions.actEditovat?.update({ enabled: dataFound, tooltip: tooltip });
                    this.actions.actDetail?.update({ enabled: dataFound, tooltip: tooltip });
                    this.actions.actPrepocet?.update({ enabled: dataFound && this.globals.Globalni_Parametry.PovoleniProvadeniPrepoctuStavuDPH, tooltip: tooltip === "" ? "jres:30250478" : tooltip }); //RC 30250478 : Přepočet stavů KH z účetních zápisů pro vybrané období KH
                    //this.actions.acthlaseni?.update({ enabled: dataFound, tooltip: tooltip });
                    // KH DPH pouze pro rok 2016 a vyse
                    this.actions.actKontrolaKH?.update({ enabled: dataFound && this.GlobalParams.EkoParams?.ROK >= 2016, visible: this.GlobalParams.EkoParams?.ROK >= 2016, tooltip: "jres:30250477" }); //RC 30250477 : Kontrola případných změn v účetním deníku s dopadem na hlášení za dané období
                    this.actions.actObdobiKH?.update({ enabled: dataFound && this.GlobalParams.EkoParams?.ROK >= 2016, visible: this.GlobalParams.EkoParams?.ROK >= 2016 });
                    // tisk
                    if (this.GlobalParams.Params?.PovoleniTisku) {
                        this.actions.actTisk?.update({ enabled: dataFound, tooltip: tooltip });
                    }
                    else
                        this.actions.actTisk?.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    // nastaveni dle hlaseni
                    dataFound = this.viewHlaseni.getCount() > 0;
                    tooltip = dataFound ? "" : "jres:30250141"; //RC 30250141 : Hlášení nenalezeno
                    this.actions.actProhlizeni?.update({ enabled: dataFound, tooltip: tooltip });
                    //this.actions.actNove?.update({ enabled:  this.globals.Globalni_Parametry.PovoleniProvadetPriznaniDPH!});
                    this.actions.actNove?.update({ enabled: true });
                }
                /**
                 *  Prepocet stavu
                 *
                 * */
                Prepocet(mesic) {
                    var that = this;
                    that.beginOperation("jres:30250043".format(mesic)); //RC 30250043 : Přepočítávám stavy období {0}
                    Gordic.Isl.InuKontrolniHlaseni.prepocetStavuKHDPH({ mesic: mesic })
                        .get()
                        .done(() => {
                        that.endOperation();
                        that.showFlash("jres:30250157".format(mesic), "success"); //RC 30250157 : Byly přepočteny stavy KH v období {0}
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
                 *  Znovunacteni k. hlaseni
                 *
                 */
                ReloadHlaseni(mesic) {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    Gordic.Isl.InuKontrolniHlaseni.list({ mesic: mesic })
                        .get()
                        .done(function (result) {
                        return def.resolve(result);
                    })
                        .always(function () { });
                    return def.promise();
                }
                /**
                 *  Znovunacteni dat
                 *
                 */
                reload() {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    Gordic.Isl.InuObdobiKHDPH.list({ mesic: that.mesic })
                        .get()
                        .done(function (result) {
                        return def.resolve(result);
                    })
                        .always(function () { });
                    return def.promise();
                }
                /**
                 * Zobrazeni okna dle aktualniho radku
                 * @param content
                 * @param row
                 */
                ZobrazDetail(row, editace = false, hlaseni = false) {
                    var that = this;
                    if (this.closed)
                        return;
                    if (this.$grid === null)
                        return;
                    //(row as Interface.GHlaseniDPHDto).vyzva_odp
                    if (row != null) {
                        if (hlaseni) {
                            if (row.por_cislo == 0) {
                                var defer = $.Deferred();
                                that.beginOperation("jres:30250094"); //RC 30250094 : Načítám data
                                Gordic.Isl.InuPriznaniDPH.kontrolaNeprouctovanychDokladu({ mesic: row.mesic_dph })
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
                                                that.dialogs.messageBox({ title: "jres:30250087", html: "jres:30450033", buttons: GDlg.mbbYesNo, icon: GDlg.mbiQuestion }) //RC 30450033 : Data daňového období obsahují neproúčtované doklady, které by mohly ovlivnit stavy DPH. Umožnit i přesto provést kontrolní hlášení?
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
                                    that.dialogs.showModalWindow("Gordic.Inu.WebClient.GDetailKontrolnihoHlaseni", { porCislo: editace ? 0 : row.por_cislo, mesic: row.mesic_dph, editace: editace, uid: "GDetailKontrolnihoHlaseniID#" })
                                        //this.navigate("Gordic.Inu.WebClient.GDetailKontrolnihoHlaseni", { porCislo: editace ? 0 : row.por_cislo, mesic: row.mesic_dph, editace: editace })
                                        .on("close", function (res) {
                                        if (res.returnValue && res.returnValue.refresh === true) {
                                            //reload(content);
                                            if (editace)
                                                that.view.requestData(undefined);
                                        }
                                    });
                                });
                            }
                            else {
                                that.dialogs.showModalWindow("Gordic.Inu.WebClient.GDetailKontrolnihoHlaseni", { porCislo: editace ? 0 : row.por_cislo, mesic: row.mesic_dph, editace: editace, uid: "GDetailKontrolnihoHlaseniID#" })
                                    //this.navigate("Gordic.Inu.WebClient.GDetailKontrolnihoHlaseni", { porCislo: editace ? 0 : row.por_cislo, mesic: row.mesic_dph, editace: editace })
                                    .on("close", function (res) {
                                    if (res.returnValue && res.returnValue.refresh === true) {
                                        //reload(content);
                                        if (editace)
                                            that.view.requestData(undefined);
                                    }
                                });
                            }
                        }
                        else
                            that.dialogs.showModalWindow("Gordic.Inu.WebClient.GDetailObdobiKH", { rok: row.rok_dph, mesic: row.mesic_dph, editace: editace, uid: "GDetailObdobiKHID#" })
                                //this.navigate("Gordic.Inu.WebClient.GDetailObdobiKH", { rok: row.rok_dph, mesic: row.mesic_dph, editace: editace })
                                .on("close", function (res) {
                                if (res.returnValue && res.returnValue.refresh === true) {
                                    //reload(content);
                                    if (editace)
                                        that.view.requestData(undefined);
                                }
                            });
                    }
                    else
                        that.dialogs.showModalWindow("Gordic.Inu.WebClient.GDetailObdobiKH", { rok: 0, mesic: 0, editace: true, uid: "GDetailObdobiKHID#" })
                            //this.navigate("Gordic.Inu.WebClient.GDetailObdobiKH", { rok: 0, mesic: 0, editace:true })
                            .on("close", function (res) {
                            if (res.returnValue && res.returnValue.refresh === true) {
                                //that.reload(undefined);
                                that.view.requestData(undefined);
                            }
                        });
                }
                /**
                 * Vraci objekt gridu
                 * @param content
                 * @returns
                 */
                getGridHlaseni() {
                    var data = this.element.find(".ggrid.js-inuHlaseniGrid");
                    return (data.length == 0 ? null : data);
                }
            };
            GSeznamObdobiKHDPH = __decorate([
                gcontent
            ], GSeznamObdobiKHDPH);
            WebClient.GSeznamObdobiKHDPH = GSeznamObdobiKHDPH;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbU9iZG9iaUtIRFBILmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbU9iZG9iaUtIRFBILnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFVLE1BQU0sQ0FxdEJmO0FBcnRCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxdEJuQjtJQXJ0QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXF0QjdCO1FBcnRCb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXBEOztvQkFFSSxXQUFNLEdBQUcsc0JBQXNCLENBQUM7b0JBQ2hDLFFBQUcsR0FBRyxxQkFBcUIsQ0FBQztvQkFZcEIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkErckJyRCxDQUFDO2dCQTFxQkcsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBR2hCLHVCQUF1QjtvQkFDdkIsdUJBQXVCO29CQUN2QixPQUFPO29CQUNQLDhCQUE4QjtvQkFDOUIsT0FBTztvQkFDUCxLQUFLO29CQUVMLGdCQUFnQjtvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBRWxCLFNBQVMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7NEJBQ3RDLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBQ04sNkJBQTZCO2dDQUM3QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQTZDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDL0YsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxJQUFJLElB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QUcsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7Z0NBQ3RELHlCQUF5QjtnQ0FDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3JDLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBR2YsQ0FBQztnQkFDRDs7OzttQkFJRztnQkFDSyxjQUFjO29CQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO29CQUN6RCxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELENBQUM7YUFDSixDQUFBO1lBOXNCWSxrQkFBa0I7Z0JBRDlCLFFBQVE7ZUFDSSxrQkFBa0IsQ0E4c0I5QjtZQTlzQlksNEJBQWtCLHFCQThzQjlCLENBQUE7UUFHTCxDQUFDLEVBcnRCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcXRCN0I7SUFBRCxDQUFDLEVBcnRCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBcXRCbkI7QUFBRCxDQUFDLEVBcnRCUyxNQUFNLEtBQU4sTUFBTSxRQXF0QmYiLCJzb3VyY2VzQ29udGVudCI6WyJcclxubmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbU9iZG9iaUtIRFBIIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgR0ludUJhc2VDbGFzcyB7XHJcblxyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0U2V6bmFtT2Jkb2JpS0hEUEhcIjtcclxuICAgICAgICB1aWQgPSBcIkdTZXpuYW1PYmRvYmlLSERQSCNcIjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBamF4IHByb3BlcnR5XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpS0hEUEhEdG9bXTtcclxuICAgICAgICBwcml2YXRlIG1lc2ljOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsbmkgbmFzdGF2ZW5pXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICByZWFkb25seSBHbG9iYWxQYXJhbXM6IEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbnVHbG9iYWxEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYmVjbmUgcHJvcGVydHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIFByZXBGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICBwcm90ZWN0ZWQgZm9ybTogSlF1ZXJ5O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgZWxlbTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTsgICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZpZXcgc2V6bmFtdSBvYmRvYmlcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogR29yZGljLkRhdGEuVmlldztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgdmlldyBobGFzZW5pXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHZpZXdIbGFzZW5pOiBHb3JkaWMuRGF0YS5WaWV3O1xyXG4gICAgICAgIHByaXZhdGUgY3VycmVudFJvdzogR29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaUtIRFBIRHRvIDtcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYnJlYWRjcnVtYnNcclxuICAgICAgICAgICAgLy90aGlzLnNldEJyZWFkY3J1bWJzKFtcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogdGhhdC50aXRsZSxcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL10pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIGFrY8OtXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcblxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciByYWRlayA9IHRoYXQuY3VycmVudFJvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpS0hEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6RGV0YWlsKHJhZGVrLCB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pRWRpdGFjZU9iZG9iaURQSCEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgYWN0RWRpdG92YXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9wcmF2aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCB2aXNpYmxlOmZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpS0hEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6RGV0YWlsKHJhZGVrLCB0aGF0Lmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pRWRpdGFjZU9iZG9iaURQSCEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0S29udHJvbGFLSDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA1MlwiLCAvL1JDIDMwMjUwMDUyIDogS29udHJvbGEgS0hcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAxMjVcIikgLy9SQyAzMDI1MDEyNSA6IFByb3bDoWTDrW0ga29udHJvbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5JbnVPYmRvYmlEUEgua29udHJvbGFWbGl2dVptZW5OYUhsYXNlbmlEUEgoKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuc2V6bmFtX29iZG9iaSEudHJpbSgpICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3MVwiLCByZXN1bHQuc2V6bmFtX29iZG9iaSEpIC8vUkMgMzAyNTAxNzEgOiBWw71zbGVkZWsga29udHJvbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDQ1MDA1M1wiIC8vUkMgMzA0NTAwNTMgOiBEb3RhelxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIFwianJlczozMDQ1MDA1NFwiLCBHRGxnLm1iYlllc05vLCBHRGxnLm1iaVF1ZXN0aW9uKSAvL1JDIDMwNDUwMDU0IDogWm9icmF6aXQgc2V6bmFtIGRva2xhZMWvLCB2ZSBrdGVyw71jaCBkb8WhbG8ga2Ugem3Em27DoW0gdiBzb3V2aXNsb3N0aSBzIEtvbnRyb2xuw61tIGhsw6HFoWVuw61tID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coR29yZGljLkludS5XZWJDbGllbnQuR05ldnlrYXphbmVEb2tsYWR5S0hMLCB7IGRhdGE6IHJlc3VsdC5kb2tsYWR5LCB1aWQ6IFwiR05ldnlrYXphbmVEb2tsYWR5S0hMSUQjXCIgfSwgXCJqcmVzOjMwNDUwMDUyXCIsIDgwMCwgNjAwLCB0cnVlKSAvL1JDIDMwNDUwMDUyIDogU2V6bmFtIGRhxYhvdsO9Y2ggZG9rbGFkxa8gemHDusSNdG92YW7DvWNoIHBvIHByb3ZlZGVuw60gcMWZaXpuw6Fuw60gS0hMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiXCIsIFwianJlczozMDI1MDE3MFwiKTsgLy9SQyAzMDI1MDE3MCA6IE5lemppxaF0xJtuYSDFvsOhZG7DoSBjaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJlcG9jZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTZcIiwgLy9SQyAzMDI1MDE1NiA6IFDFmWVwb8SNZXQgc3RhdsWvIEtIXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlLSERQSER0bz4odGhhdC4kZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmFkZWsgIT09IHVuZGVmaW5lZCAmJiByYWRlayAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmVwb2NldChyYWRlaz8ubWVzaWNfZHBoISk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE5vdmU6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ3OVwiIC8vUkMgMzAyNTA0NzkgOiBOb3bDqSBobMOhxaFlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLCB0b29sdGlwOlwianJlczozMDI1MDQ4MFwiIC8vUkMgMzAyNTA0ODAgOiBOb3bDqSBrb250cm9sbsOtIGhsw6HFoWVuw60gRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgLCBlbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICwgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaUtIRFBIRHRvPih0aGF0LkdldEdyaWRIbGFzZW5pKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpS0hEUEhEdG8+KHRoYXQuJGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWsucG9yX2Npc2xvID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6RGV0YWlsKHJhZGVrLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0UHJvaGxpemVuaTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaUtIRFBIRHRvPih0aGF0LmdldEdyaWRIbGFzZW5pKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJhZGVrICE9PSB1bmRlZmluZWQgJiYgcmFkZWsgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6RGV0YWlsKHJhZGVrLCBmYWxzZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAxOFwiLCAvL1JDIDMwMjUwMDE4IDogVGlza1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDAxOFwiLCAvL1JDIDMwMjUwMDE4IDogVGlza1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImludV9wdG1fZHBoc2VzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRub3N0OiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSz8udG9TdHJpbmcoKS50cmltKCkgKyBcIjEyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdVY3RQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0RmluaXNoZWQ6IGZ1bmN0aW9uIChldmVudCwgcmVwSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChyZXBJbmZvICYmIHJlcEluZm8uY3VzdG9tRGF0YSEuSVhCX05FVyAmJiAocmVwSW5mby5jdXN0b21EYXRhIS5JWEJfTkVXKS50cmltKCkgIT0gXCJcIikgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhhdCxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgcmFkZWsgPSB0aGF0LmN1cnJlbnRSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlLSERQSER0bz4odGhhdC4kZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmFkZWsgIT09IHVuZGVmaW5lZCAmJiByYWRlayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbWE6IHJlcC50ZW1hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEU2VzdGF2eTogR0VJRFNlc3RhdnkuU2V6bmFtT2Jkb2JpRFBILFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lc2ljOiByYWRlaz8ubWVzaWNfZHBoISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoZmFsc2UpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgICAgICBhY3RPYmNlcnN0dml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPYmNlcnN0dml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDM5XCIsIC8vUkMgMzAyNTAwMzkgOiBPYsSNZXJzdHZpdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLm9iY2Vyc3R2aXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPYmNlcnN0dml0SEw6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9iY2Vyc3R2aXRITFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAzOVwiLCAvL1JDIDMwMjUwMDM5IDogT2LEjWVyc3R2aXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5vYmNlcnN0dml0LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IHRoYXQuZ2V0R3JpZEhsYXNlbmkoKS5nZ3JpZChcImdldFNlbGVjdGlvblwiLGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdIbGFzZW5pLnJlcXVlc3REYXRhKHJhZGVrWzBdLm1lc2ljX2RwaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdIbGFzZW5pLmdldExvYWRpbmdQcm9taXNlKCkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhOiBcIiwgdGhpcy5tb2RlbClcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgJC5leHRlbmQodGhpcy5tb2RlbF9ha3QsIHRoaXMubW9kZWwgKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIC8vdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoWyBcImFjdERldGFpbCpcIiwgXCJhY3RFZGl0b3ZhdCpcIixcImFjdFRpc2sqXCJcclxuICAgICAgICAgICAgLy8gICAgLCBcImFjdE9iY2Vyc3R2aXQqXCJcclxuICAgICAgICAgICAgLy8gICAgLCBcImFjdEtvbnRyb2xhS0gqXCJcclxuICAgICAgICAgICAgLy8gICAgXSkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL2xldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhhdC5tb2RlbCwgeyBwcm9jZXNzb3JzOiB7IHByb3ZpZGVyOiBwcm92aWRlciB9IH0pO1xyXG4gICAgICAgICAgICAvL3RoYXQuVnlyb2JLYXJ0eSgpO1xyXG5cclxuICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgLy8gZGVmaW5jaWNlIHByb3ZpZGVydVxyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXIgPSBuZXcgR29yZGljLkRhdGEuUHJvdmlkZXI8YW55LCBhbnksIGFueT4oKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW5pIHByb2Nlc29ydSBuYSB2aWV3XHJcbiAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQubW9kZWwsIHsgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIgfSB9KTtcclxuICAgICAgICAgICAgdmFyIHRhYk9iZG9iaSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGhhdC50YXNrSWQgKyBcIm15VGFiT2Jkb2JpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDQ3NlwiLC8vUkMgMzAyNTA0NzYgOiBPYmRvYsOtIEtIXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aXRsZTogXCJqcmVzOjMwMjUwMTI4XCIuZm9ybWF0KHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LPy50b1N0cmluZygpKSwvL1JDIDMwMjUwMTI4IDogIE9iZG9iw60gS0ggLSB7MH1cclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogdGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3REZXRhaWwqXCIsIFwiYWN0RWRpdG92YXQqXCIsIFwiYWN0VGlzaypcIiwgXCJhY3RQcmVwb2NldCpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIFwiYWN0S29udHJvbGFLSCpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIFwiYWN0T2JjZXJzdHZpdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmljaWUgZ3JpZHVcclxuICAgICAgICAgICAgdGhhdC4kZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWJPYmRvYmkpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOlwib2Jkb2JpS0hEUEhIb3JuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBvYmpla3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhZGVrID0gb2JqZWt0LmdldFNlbGVjdGlvbihmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3SGxhc2VuaS5yZXF1ZXN0RGF0YShyYWRla1swXS5tZXNpY19kcGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3SGxhc2VuaS5nZXRMb2FkaW5nUHJvbWlzZSgpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVDb2xzKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhYkhsYXNlbmkgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoYXQudGFza0lkICsgXCJteVRhYkhsYXNlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMTM2XCIsLy9SQyAzMDI1MDEzNiA6IEtvbnRyb2xuw60gaGzDocWhZW7DrSB6YSBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0Tm92ZSpcIiwgXCJhY3RQcm9obGl6ZW5pKlwiLFwiYWN0T2JjZXJzdHZpdEhMXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgICAgICAvLywgY3VzdG9tTWVudUlEOiB0aGF0LnRhc2tJZFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXIyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPGFueSwgYW55LCBhbnk+KChhLCBiKSA9PiB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBiW1wicmVxdWVzdFwiXSA9PT0gXCJudW1iZXJcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5SZWxvYWRIbGFzZW5pKGJbXCJyZXF1ZXN0XCJdKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbmkgcHJvY2Vkb3J1IG5hIHZpZXdcclxuICAgICAgICAgICAgdGhhdC52aWV3SGxhc2VuaSA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQubW9kZWwsIHsgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIyIH0gfSk7XHJcbiAgICAgICAgICAgICQoXCI8ZGl2IGNsYXNzPSdqcy1pbnVIbGFzZW5pR3JpZCc+XCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYkhsYXNlbmkpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWQ6IFwiaWR6YXBpc3lncmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3SGxhc2VuaSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm9iZG9iaUtIRFBIRG9sbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGF0LmNyZWF0ZUNvbHNIbGFzZW5pKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIG9iamVrdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RQcm9obGl6ZW5pLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOmZhbHNlIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIC8vdGhhdC52aWV3LnJlcXVlc3REYXRhKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBGb2t1cyBuYSBzZXpuYW1tdVxyXG4gICAgICAgICAgICB2YXIgZm9jdXNGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZCgnZm9jdXMnKTsgLy8gbmFzdGF2ZW7DrSBmb2N1c3UgbmEgZ3JpZFxyXG4gICAgICAgICAgICAgICAgKHRoYXQudmlldyBhcyBhbnkpLm9mZignY2hhbmdlLmZvY3VzJyk7IC8vIG9kdsOhesOhbsOtIHVkw6Fsb3N0aSB6IElTTCB2aWV3XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoYXQudmlldy5vbignY2hhbmdlLmZvY3VzJywgZm9jdXNGdW5jKTsgLy8gcMWZaSB6bcSbbsSbIElTTCB2aWV3IHNlIG5hdsOhxb5lIGZ1bmtjZSBmb2N1c0Z1bmNcclxuXHJcbiAgICAgICAgICAgIGlmKHRoYXQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5JbnUuQXBwU2V0dGluZ3MuSW51U2V0dGluZ3NGb3JtRFBILkJlZm9yZVJ1bkNoZWNrXCIpKVxyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxMjRcIiwgLy9SQyAzMDI1MDEyNCA6IERvdGF6XHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAxMjNcIiwgLy9SQyAzMDI1MDEyMyA6IENoY2V0ZSBwcm92w6lzdCBrb250cm9sdSBqZWRub3RsaXbDvWNoIG9iZG9iw60gRFBILCB6ZGEgdiBuaWNoIGRvxaFsbyBrZSB6bcSbbsOhbSB2IHNvdXZpc2xvc3RpIHMgS29udHJvbG7DrW0gaGzDocWhZW7DrW0/XHJcbiAgICAgICAgICAgICAgICBHRGxnLm1iYlllc05vLCBHRGxnLm1iaVF1ZXN0aW9uKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0S29udHJvbGFLSD8ucnVuKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsICgpID0+IHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWQuZ2dyaWQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgRGVmaW5pY2Ugc2xvdXBjdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb2xzSGxhc2VuaSgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdIbGFzZW5pRFBIRHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkludS5JbnRlcmZhY2UuR0hsYXNlbmlEUEhEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9yX2Npc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDU2XCIsIC8vUkMgMzAyNTAwNTYgOiBQb8WZYWTDrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9wcml6X2RwaF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMzBcIiwgLy9SQyAzMDI1MDEzMCA6IFR5cCBLSFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcHJpel9tYXhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMzFcIiwgLy9SQyAzMDI1MDEzMSA6IE1heC5wxZlpem7DoW7DrSBLSFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsIC8vYWxpZ246IFwibGVmdFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ByaXpfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTMyXCIsIC8vUkMgMzAyNTAxMzIgOiBEYXR1bSBwxZlpem7DoW7DrSBLSFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNjAsIC8vYWxpZ246IFwibGVmdFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3pqaXN0X2RvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDEzM1wiLCAvL1JDIDMwMjUwMTMzIDogWmppxaF0xJtuw60gcHJvIGRvZC5LSFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNjUsIC8vYWxpZ246IFwibGVmdFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgRGVmaW5pY2Ugc2xvdXBjdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDb2xzKCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaUtIRFBIRHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaUtIRFBIRHRvPigpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwidHlwX2RwaFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMwNDUwMDI1XCIsIC8vUkMgMzA0NTAwMjUgOiBTIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDMwXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInR5cF9kcGhfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzA0NTAwMjRcIiwgLy9SQyAzMDQ1MDAyNCA6IFN0YXYgb2Jkb2LDrVxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTM4XCIsIC8vUkMgMzAyNTAxMzggOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX2RwaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDQ1MDAyNlwiLCAvL1JDIDMwNDUwMDI2IDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wcml6X21heFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDEzMVwiLCAvL1JDIDMwMjUwMTMxIDogTWF4LnDFmWl6bsOhbsOtIEtIXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE2MCwgLy9hbGlnbjogXCJsZWZ0XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcHJpel9kcGhfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTMwXCIsIC8vUkMgMzAyNTAxMzAgOiBUeXAgS0hcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ByaXpfZHBoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTMyXCIsIC8vUkMgMzAyNTAxMzIgOiBEYXR1bSBwxZlpem7DoW7DrSBLSFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNjAsIC8vYWxpZ246IFwibGVmdFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9IFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1bmFjdGVuaSBkYXRcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVmcmVzaCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgdGhhdC52aWV3LmdldExvYWRpbmdQcm9taXNlKCkuXHJcbiAgICAgICAgICAgICAgICBkb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBWeXJvYkthcnR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCk7XHJcbiAgICAgICAgICAgIHZhciBrYXJ0eSA9IHRoaXMuZWxlbS5nY2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy90aXRsZTogXCJTZXpuYW0gb2Jkb2LDrSBcIixcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHJhZGVrOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpS0hEUEhEdG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdiA9IFwianJlczozMDI1MDA0OVwiOyAvL1JDIDMwMjUwMDQ5IDogT3RldsWZZW7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xvclN0YXYgPSBcImctc3RhdGUtaW5mb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5zX2RwaCA9PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF2ID0gXCJqcmVzOjMwMjUwMDUwXCI7IC8vUkMgMzAyNTAwNTAgOiBacMSbdG7EmyBvdGV2xZllbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yU3RhdiA9IFwiZy1zdGF0ZS13YXJuaW5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJhZGVrLnNfZHBoID09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXYgPSBcImpyZXM6MzAyNTAwNTFcIjsgLy9SQyAzMDI1MDA1MSA6IFV6YXbFmWVuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JTdGF2ID0gXCJnLXN0YXRlLXN1Y2Nlc3NcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFwiPGRpdiBjbGFzcz0naXRlbXMgZ2NhcmQnIHN0eWxlPSdkaXNwbGF5OiBibG9jazsgZmxvYXQ6IGxlZnQ7IGJhY2tncm91bmQ6I2ZmZmZmZiBoZWlnaHQ6MjAwcHg7Jz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nZy1jYXJkJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nZy1yYXAtY2FyZCc+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2ctY2FyZC1oZWFkZXInPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdnLWNhcmQtaGVhZGVyLXRleHQgZ3Rvb2x0aXAnPlwiICsgcmFkZWsubWVzaWNfZHBoICsgXCImbmJzcDsmbmJzcDsmbmJzcDs8c3BhbiBjbGFzcz0nXCIgKyBjb2xvclN0YXYgKyBcIicgPlwiICsgc3RhdiArIFwiPC9zcGFuPjwvZGl2PlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nZy1jYXJkLW1haW4nPjwvYnI+XCI7Ly8rXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCI8ZGl2PmpyZXM6MzAyNTAwNDZcIi5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUocmFkZWsuZGF0X3ByaXpfbWF4KSkgKyBcIjwvZGl2PlwiICsgLy9SQyAzMDI1MDA0NiA6IE1heC4gcMWZaXpuw6Fuw60gRFBIOiB7MH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8cD48c3Ryb25nPlwiICsgcmFkZWsudHlwX3ByaXpfZHBoX3R4dCArIFwiPC9zdHJvbmc+PC9wPlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBcImctc3RhdGUtc3VjY2Vzc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5zX3ByZXBfZHBoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gXCJnLXN0YXRlLWVycm9yXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIjxkaXY+PGIgY2xhc3M9J1wiICsgY29sb3IgKyBcIiBnLXN0YXRlLXRleHQgJz5cIiArIHJhZGVrLnNfcHJlcF9kcGhfdHh0ICsgXCI8L2I+PC9kaXY+PC9icj5cIiAgLy9SQyAzMDI1MDA0OCA6IHN0YXYgcMWZZXBvxI10dTogezB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5kYXRfcHJpel9kcGggIT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzdWx0ICs9IFwiPHA+PGI+XCIrcmFkZWsuZGF0X3ByaXpfZHBoICsgXCI8L2I+PC9wPlwiOyAvL1JDIDMwMjUwMDQ3IDogRGF0dW0gcMWZaXpuw6Fuw606IHswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCI8ZGl2PmpyZXM6MzAyNTAwNDdcIi5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUocmFkZWsuZGF0X3ByaXpfZHBoKSkgKyBcIjwvZGl2PlwiOyAvL1JDIDMwMjUwMDQ3IDogRGF0dW0gcMWZaXpuw6Fuw606IHswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc3VsdCArPSBcIjxwPmpyZXM6MzAyNTAwNDdcIi5mb3JtYXQoR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGUocmFkZWsuZGF0X3ByaXpfZHBoKSkgKyBcIjwvcD5cIjsgLy9SQyAzMDI1MDA0NyA6IERhdHVtIHDFmWl6bsOhbsOtOiB7MH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3IgPSBcImctc3RhdGUtc3VjY2Vzc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSAgIFwiPC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9ICwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXcsXHJcbiAgICAgICAgICAgICAgICAvL2Zvcm06IG9iZEZvcm0sXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUYWI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gKGV2LCBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhbmVsID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbChudWxsKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgZWRpdDogZnVuY3Rpb24gKGV2LCBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhbmVsID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVkaXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWwoZGF0YSBhcyBhbnksdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbChjdHguaXRlbS5kYXRhIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSwgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBkYXRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpRFBIRHRvKSB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmN1cnJlbnRSb3cgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBOYXN0YXZlbmlBa2NpKCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZGF0YUZvdW5kID0gdGhpcy52aWV3LmdldENvdW50KCkgPiAwO1xyXG4gICAgICAgICAgICB2YXIgdG9vbHRpcCA9IGRhdGFGb3VuZCA/IFwiXCIgOiBcImpyZXM6MzAyNTAxMTNcIjsgLy9SQyAzMDI1MDExMyA6IE9iZG9iw60gbmVuYWxlemVub1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RFZGl0b3ZhdD8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kLCB0b29sdGlwOiB0b29sdGlwIH0pOyBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3REZXRhaWw/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcmVwb2NldD8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kICYmIHRoaXMuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlQcm92YWRlbmlQcmVwb2N0dVN0YXZ1RFBIISwgdG9vbHRpcDogdG9vbHRpcCA9PT0gXCJcIiA/IFwianJlczozMDI1MDQ3OFwiIDogdG9vbHRpcCB9KTsgLy9SQyAzMDI1MDQ3OCA6IFDFmWVwb8SNZXQgc3RhdsWvIEtIIHogw7rEjWV0bsOtY2ggesOhcGlzxa8gcHJvIHZ5YnJhbsOpIG9iZG9iw60gS0hcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFjdGhsYXNlbmk/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEtIIERQSCBwb3V6ZSBwcm8gcm9rIDIwMTYgYSB2eXNlXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RLb250cm9sYUtIPy51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQgJiYgdGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0shID49IDIwMTYsIHZpc2libGU6IHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LISA+PSAyMDE2LCB0b29sdGlwOlwianJlczozMDI1MDQ3N1wiIH0pOyAvL1JDIDMwMjUwNDc3IDogS29udHJvbGEgcMWZw61wYWRuw71jaCB6bcSbbiB2IMO6xI1ldG7DrW0gZGVuw61rdSBzIGRvcGFkZW0gbmEgaGzDocWhZW7DrSB6YSBkYW7DqSBvYmRvYsOtXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPYmRvYmlLSD8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kICYmIHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LISA+PSAyMDE2LCB2aXNpYmxlOiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyEgPj0gMjAxNiB9KTtcclxuICAgICAgICAgICAgLy8gdGlza1xyXG4gICAgICAgICAgICBpZiAodGhpcy5HbG9iYWxQYXJhbXMuUGFyYW1zPy5Qb3ZvbGVuaVRpc2t1KSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrPy51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogXCJqcmVzOjMwMjUwMTA1XCIgfSk7IC8vUkMgMzAyNTAxMDUgOiBOZW7DrSBwb3ZvbGVubyBwYXJhbWV0cmVtXHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbmkgZGxlIGhsYXNlbmlcclxuICAgICAgICAgICAgZGF0YUZvdW5kID0gdGhpcy52aWV3SGxhc2VuaS5nZXRDb3VudCgpID4gMDtcclxuICAgICAgICAgICAgdG9vbHRpcCA9IGRhdGFGb3VuZCA/IFwiXCIgOiBcImpyZXM6MzAyNTAxNDFcIjsgLy9SQyAzMDI1MDE0MSA6IEhsw6HFoWVuw60gbmVuYWxlemVub1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0UHJvaGxpemVuaT8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kLCB0b29sdGlwOiB0b29sdGlwIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0Tm92ZT8udXBkYXRlKHsgZW5hYmxlZDogIHRoaXMuZ2xvYmFscy5HbG9iYWxuaV9QYXJhbWV0cnkuUG92b2xlbmlQcm92YWRldFByaXpuYW5pRFBIIX0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Tm92ZT8udXBkYXRlKHsgZW5hYmxlZDogdHJ1ZX0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIFByZXBvY2V0IHN0YXZ1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIFByZXBvY2V0KCBtZXNpYzogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMDQzXCIuZm9ybWF0KG1lc2ljKSk7IC8vUkMgMzAyNTAwNDMgOiBQxZllcG/EjcOtdMOhdsOhbSBzdGF2eSBvYmRvYsOtIHswfVxyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkludUtvbnRyb2xuaUhsYXNlbmkucHJlcG9jZXRTdGF2dUtIRFBIKHsgbWVzaWM6IG1lc2ljIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwianJlczozMDI1MDE1N1wiLmZvcm1hdChtZXNpYyksIFwic3VjY2Vzc1wiKTsgLy9SQyAzMDI1MDE1NyA6IEJ5bHkgcMWZZXBvxI10ZW55IHN0YXZ5IEtIIHYgb2Jkb2LDrSB7MH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnNob3dGbGFzaChcImpyZXM6MzAyNTAwNDRcIiwgXCJlcnJvclwiLCAyMDAwKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBabm92dW5hY3Rlbmkgay4gaGxhc2VuaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUmVsb2FkSGxhc2VuaShtZXNpYzogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm4gZGVmLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Jc2wuSW51S29udHJvbG5pSGxhc2VuaS5saXN0KHsgbWVzaWM6IG1lc2ljIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7IH0pXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgWm5vdnVuYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkludU9iZG9iaUtIRFBILmxpc3QoeyBtZXNpYzogdGhhdC5tZXNpYyB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB9KSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuIFxyXG5cclxuXHJcbiAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgb2tuYSBkbGUgYWt0dWFsbmlobyByYWRrdVxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHJvd1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgWm9icmF6RGV0YWlsKHJvdzogR29yZGljLkludS5JbnRlcmZhY2UuR1Nlem5hbU9iZG9iaUtIRFBIRHRvIHwgR29yZGljLkludS5JbnRlcmZhY2UuR0hsYXNlbmlEUEhEdG8gfCBudWxsLCBlZGl0YWNlOiBib29sZWFuID0gZmFsc2UsIGhsYXNlbmk6IGJvb2xlYW49ZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLiRncmlkID09PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyhyb3cgYXMgSW50ZXJmYWNlLkdIbGFzZW5pRFBIRHRvKS52eXp2YV9vZHBcclxuXHJcbiAgICAgICAgaWYgKHJvdyAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGhsYXNlbmkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocm93LnBvcl9jaXNsbyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMDk0XCIpOyAvL1JDIDMwMjUwMDk0IDogTmHEjcOtdMOhbSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5JbnVQcml6bmFuaURQSC5rb250cm9sYU5lcHJvdWN0b3ZhbnljaERva2xhZHUoeyBtZXNpYzogcm93Lm1lc2ljX2RwaCEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubmF2aWdhdGUoR29yZGljLkludS5XZWJDbGllbnQuR1Z5YmVyTmV6YXVjdG92YW55Y2hEb2tsYWR1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdOZXphdWN0b3ZhbmVjaERva2xhZHksIHsgZGF0YTogcmVzdWx0LlNlem5hbURva2xhZHUsIHVpZDogXCJHTmV6YXVjdG92YW5lY2hEb2tsYWR5SUQjXCIgfSwgXCJqcmVzOjMwMjUwMDk2XCIsIDgwMCwgNjAwLCB0cnVlKSAvL1JDIDMwMjUwMDk2IDogTmVwcm/DusSNdG92YW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuR2xvYmFsUGFyYW1zLlBhcmFtcz8uQmxva2FjZUFrY2lEbGVLb250cm9sRFBIID09IEludGVyZmFjZS5HRVR5cEJsb2thY2VEbGVTdGF2dUtvbnRyb2x5RFBILkFrY2VCbG9rb3ZhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveCh7IHRpdGxlOiBcImpyZXM6MzAyNTAwODdcIiwgaHRtbDogXCJqcmVzOjMwNDUwMDMzXCIsIGJ1dHRvbnM6IEdEbGcubWJiWWVzTm8sIGljb246IEdEbGcubWJpUXVlc3Rpb24gfSkgLy9SQyAzMDQ1MDAzMyA6IERhdGEgZGHFiG92w6lobyBvYmRvYsOtIG9ic2FodWrDrSBuZXByb8O6xI10b3ZhbsOpIGRva2xhZHksIGt0ZXLDqSBieSBtb2hseSBvdmxpdm5pdCBzdGF2eSBEUEguIFVtb8W+bml0IGkgcMWZZXN0byBwcm92w6lzdCBrb250cm9sbsOtIGhsw6HFoWVuw60/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmZXIuc3RhdGUoKSA9PT0gXCJwZW5kaW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXIucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHJlcy5yZXR1cm5WYWx1ZSAmJiByZXMucmV0dXJuVmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIHpub3Z1bmHEjXRlbsOtIHNlem5hbXUgKHBvZGxlIGFrdHXDoWxuw61jaCBmaWx0csWvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9Hb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uUmVmcmVzaFNlem5hbXUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92eWJlckRva2xhZHUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZlci5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxLb250cm9sbmlob0hsYXNlbmlcIiwgeyBwb3JDaXNsbzogZWRpdGFjZSA/IDAgOiByb3cucG9yX2Npc2xvLCBtZXNpYzogcm93Lm1lc2ljX2RwaCwgZWRpdGFjZTogZWRpdGFjZSwgdWlkOiBcIkdEZXRhaWxLb250cm9sbmlob0hsYXNlbmlJRCNcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0RldGFpbEtvbnRyb2xuaWhvSGxhc2VuaVwiLCB7IHBvckNpc2xvOiBlZGl0YWNlID8gMCA6IHJvdy5wb3JfY2lzbG8sIG1lc2ljOiByb3cubWVzaWNfZHBoLCBlZGl0YWNlOiBlZGl0YWNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnJldHVyblZhbHVlICYmIHJlcy5yZXR1cm5WYWx1ZS5yZWZyZXNoID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVsb2FkKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWRpdGFjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkludS5XZWJDbGllbnQuR0RldGFpbEtvbnRyb2xuaWhvSGxhc2VuaVwiLCB7IHBvckNpc2xvOiBlZGl0YWNlID8gMCA6IHJvdy5wb3JfY2lzbG8sIG1lc2ljOiByb3cubWVzaWNfZHBoLCBlZGl0YWNlOiBlZGl0YWNlLCB1aWQ6IFwiR0RldGFpbEtvbnRyb2xuaWhvSGxhc2VuaUlEI1wiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxLb250cm9sbmlob0hsYXNlbmlcIiwgeyBwb3JDaXNsbzogZWRpdGFjZSA/IDAgOiByb3cucG9yX2Npc2xvLCBtZXNpYzogcm93Lm1lc2ljX2RwaCwgZWRpdGFjZTogZWRpdGFjZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMucmV0dXJuVmFsdWUgJiYgcmVzLnJldHVyblZhbHVlLnJlZnJlc2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JlbG9hZChjb250ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWRpdGFjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuSW51LldlYkNsaWVudC5HRGV0YWlsT2Jkb2JpS0hcIiwgeyByb2s6IHJvdy5yb2tfZHBoLCBtZXNpYzogcm93Lm1lc2ljX2RwaCwgZWRpdGFjZTogZWRpdGFjZSwgdWlkOlwiR0RldGFpbE9iZG9iaUtISUQjXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZXRhaWxPYmRvYmlLSFwiLCB7IHJvazogcm93LnJva19kcGgsIG1lc2ljOiByb3cubWVzaWNfZHBoLCBlZGl0YWNlOiBlZGl0YWNlIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAocmVzOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnJldHVyblZhbHVlICYmIHJlcy5yZXR1cm5WYWx1ZS5yZWZyZXNoID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVsb2FkKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWRpdGFjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuSW51LldlYkNsaWVudC5HRGV0YWlsT2Jkb2JpS0hcIiwgeyByb2s6IDAsIG1lc2ljOiAwLCBlZGl0YWNlOiB0cnVlLCB1aWQ6IFwiR0RldGFpbE9iZG9iaUtISUQjXCIgfSlcclxuICAgICAgICAgICAgLy90aGlzLm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0RldGFpbE9iZG9iaUtIXCIsIHsgcm9rOiAwLCBtZXNpYzogMCwgZWRpdGFjZTp0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMucmV0dXJuVmFsdWUgJiYgcmVzLnJldHVyblZhbHVlLnJlZnJlc2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWxvYWQodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldy5yZXF1ZXN0RGF0YSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGdyaWR1XHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0R3JpZEhsYXNlbmkoKTogSlF1ZXJ5IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5nZ3JpZC5qcy1pbnVIbGFzZW5pR3JpZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIChkYXRhLmxlbmd0aCA9PSAwID8gbnVsbCBhcyBhbnkgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==