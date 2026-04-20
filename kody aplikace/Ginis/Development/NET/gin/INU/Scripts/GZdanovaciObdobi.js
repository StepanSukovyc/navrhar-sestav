"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
            var GZdanovaciObdobi = /** @class */ (function (_super) {
                __extends(GZdanovaciObdobi, _super);
                function GZdanovaciObdobi() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.globals = Gordic.Inu.Globals.GInuGlobals;
                    return _this;
                }
                GZdanovaciObdobi.prototype.onContentReady = function () {
                    var that = this;
                    //debugger;
                    //nastavení breadcrumbs
                    //this.setBreadcrumbs([
                    //    {
                    //        caption: that.title,
                    //    }
                    //]);
                    //nastavení akcí
                    this.actions.addRange({
                        actPrepocet: {
                            caption: "jres:30250016",
                            run: function () {
                                //var radek = Gordic.Eko.Grid.currentRow<Gordic.Inu.Interface.GSeznamObdobiDPHDto>(that.$grid);
                                var radek = that.currentRow;
                                if (typeof radek !== undefined && radek != null)
                                    that.Prepocet(radek === null || radek === void 0 ? void 0 : radek.ico, radek === null || radek === void 0 ? void 0 : radek.rok, radek === null || radek === void 0 ? void 0 : radek.mesic);
                            }
                        },
                        actDetailDokladu: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: function () {
                            }
                        }),
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: true, run: function () {
                                that.ZobrazDetail(null);
                            }
                        }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: function () {
                                var radek = that.currentRow;
                                //var radek = Gordic.Eko.Grid.currentRow<Gordic.Inu.Interface.GSeznamObdobiDPHDto>(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetail(radek);
                            }
                        }),
                        actEditovat: Gordic.Eko.Action.actionOpravit({
                            enabled: false, run: function () {
                                var radek = that.currentRow;
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazDetail(radek, true);
                            }
                        }),
                        actPriznani: {
                            caption: "jres:30250008",
                            run: function () {
                                var radek = that.currentRow;
                                //var radek = Gordic.Eko.Grid.currentRow<Gordic.Inu.Interface.GSeznamObdobiDPHDto>(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.ZobrazSeznamPriznani(radek);
                            }
                        },
                        actDanDoloz: {
                            caption: "jres:30250009",
                            run: function () {
                                var radek = that.currentRow;
                                //var radek = Gordic.Eko.Grid.currentRow<Gordic.Inu.Interface.GSeznamObdobiDPHDto>(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.DanovaDolozenost(radek === null || radek === void 0 ? void 0 : radek.mesic);
                            }
                        },
                        actKontrolaKH: {
                            caption: "jres:30250052",
                            run: function () {
                                var radek = that.currentRow;
                                //var radek = Gordic.Eko.Grid.currentRow<Gordic.Inu.Interface.GSeznamObdobiDPHDto>(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    alert("doposud nerealizovano");
                            }
                        },
                        actObdobiKH: {
                            caption: "jres:30250053",
                            run: function () {
                                var radek = that.currentRow;
                                //var radek = Gordic.Eko.Grid.currentRow<Gordic.Inu.Interface.GSeznamObdobiDPHDto>(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    alert("doposud nerealizovano");
                            }
                        },
                        tiskAct: {
                            name: "tiskAct",
                            caption: "jres:30250018",
                            tooltip: "jres:30250018",
                            run: function () {
                                var radek = that.currentRow;
                                //var radek = Gordic.Eko.Grid.currentRow<Gordic.Inu.Interface.GSeznamObdobiDPHDto>(that.$grid);
                                if (typeof radek !== undefined && radek != null)
                                    that.Tisk(radek === null || radek === void 0 ? void 0 : radek.mesic);
                            }
                        },
                        //tiskAct: GAction.createPrintAction({
                        //    name: "tiskAct",
                        //    caption: "jres:30250018", //RC 30250018 : Tisk
                        //    tooltip: "jres:30250018", //RC 30250018 : Tisk
                        //    tema: "inu_ptm_dphsest",
                        //    serverParameterMethod: "Gordic.Uct.WebClient.GUctPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                        //    enabled: true,
                        //    favorite: false,
                        //    parentContent: that,
                        //    reportStarting: function (rep) {
                        //        //rep.customDto.Tema = "uct_ptm_kudpol";
                        //        //rep.customDto = { Tema: rep.tema, Filtry: GetFilter(that).gfilterpanel("getConfirmedData") };
                        //    }
                        //}),
                        actObcerstvit: {
                            name: "actObcerstvit",
                            caption: "jres:30250039",
                            tooltip: "",
                            icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.view.requestData(undefined);
                                that.NastaveniAkci();
                                //that.reload();
                            }
                        }
                    });
                    console.log("data: ", this.model);
                    //            $.extend(this.model_akt, this.model );
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actNovy*", "actDetail*", "actEditovat*", "actPrepocet*", "actPriznani*", "actDanDoloz*", "tiskAct*",
                        "actObcerstvit*",
                        "actKontrolaKH*",
                        "actObdobiKH*"]));
                    //that.$grid = $("<div>")
                    //   .css("height", "100%")
                    //   .appendTo(this.element)
                    //   .gautofit()
                    //   //.gtab({
                    //   //    title: "ROZ", opened: true, locked: true,
                    //   //})
                    //   .ggrid({
                    //       columnMode: "full",
                    //       defaultAction: new GAction({
                    //           name: "gridRowSelectedAct",
                    //           run: function (ev, ctx) {
                    //               that.ZobrazDetail(ctx.cellInfo.data as any);
                    //               /*
                    //               var row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                    //               GDlg.showWindow("Gordic.Uct.WebClient.GUctDetail", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
                    //               */
                    //           }
                    //       }),                   
                    //       columns: new Gordic.Data.GridFormat()
                    //           .addTextColumn({
                    //               name: "typ_dph",
                    //               caption: "jres:30250010", //RC 30250010 : Stav
                    //               width: 49
                    //           })
                    //           .addNumberColumn({
                    //               name: "mesic",
                    //               caption: "jres:30250011", //RC 30250011 : Měsíc
                    //               width: 57
                    //           })
                    //           .addDateColumn({
                    //               name: "dat_priz_max",
                    //               caption: "jres:30250012", //RC 30250012 : Max. přiznání DPH
                    //               width: 146
                    //           })
                    //           .addTextColumn({
                    //               name: "typ_priz_dph_txt",
                    //               caption: "jres:30250014", //RC 30250014 : Typ přiznání
                    //               width: 110
                    //           })
                    //           .addDateColumn({
                    //               name: "dat_priz_dph",
                    //               caption: "jres:30250013", //RC 30250013 : Datum přiznání DPH
                    //               width: 154
                    //           })
                    //           .addTextColumn({
                    //               name: "s_prep_dph_txt",
                    //               caption: "jres:30250015", //RC 30250015 : Stav přepočtu
                    //               width: 111
                    //           })
                    //   });
                    //let treeProcessor = new Gordic.Data.Tree<Gordic.Inu.Interface.GEkolstvDto[]>(
                    //    Gordic.Data.Tree.parentIdOrganizer("rok"), { defaultState: "open" });
                    var provider = new Gordic.Data.Provider(function (a, b) {
                        debugger;
                        return that.reload();
                    });
                    that.view = new Gordic.Data.View(that.model, { processors: { provider: provider } });
                    // transformace dat
                    //that.Transformace(that.model);
                    that.VyrobKarty();
                    //that.$grid.ggrid("setData", view);
                    that.NastaveniAkci();
                };
                /**
                 *
                 *
                 * */
                GZdanovaciObdobi.prototype.VyrobKarty = function () {
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
                            //result += "<p>jres:30250046".format(Gordic.Templates.Formatters.date(radek.dat_priz_max)) + "</p>" + //RC 30250046 : Max. přiznání DPH: {0}                        
                            //    "<p><b>" + radek.typ_priz_dph_txt + "</b></p>";
                            //"<p>Typ přiznání:" + radek.typ_priz_dph_txt + "</p>";
                            if (radek.dat_priz_dph !== null)
                                //result += "<p><b>"+radek.dat_priz_dph + "</b></p>"; //RC 30250047 : Datum přiznání: {0}
                                result += "<div>jres:30250047".format(Gordic.Templates.Formatters.date(radek.dat_priz_dph)) + "</div>"; //RC 30250047 : Datum přiznání: {0}
                            //result += "<p>jres:30250047".format(Gordic.Templates.Formatters.date(radek.dat_priz_dph)) + "</p>"; //RC 30250047 : Datum přiznání: {0}
                            var color = "g-state-success";
                            if (radek.s_prep_dph == 0)
                                color = "g-state-error";
                            //style = 'color: " + color + ";' 
                            //i class='fa fa-check-circle " + color + " g-state-text ' aria - hidden='true' > </i>
                            //jres: 30250048".format(radek.s_prep_dph_txt as any)
                            result += "<div><b class='" + color + " g-state-text '>" + radek.s_prep_dph_txt + "</b></div></br>" + //RC 30250048 : stav přepočtu: {0}
                                "</div></div></div></div>";
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
                            //that.prava_mesic(data);
                            that.currentRow = data;
                        }
                    });
                };
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                GZdanovaciObdobi.prototype.NastaveniAkci = function () {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    var dataFound = this.view.getCount() > 0;
                    (_a = this.actions.actEditovat) === null || _a === void 0 ? void 0 : _a.update({ enabled: dataFound });
                    (_b = this.actions.actDetail) === null || _b === void 0 ? void 0 : _b.update({ enabled: dataFound });
                    (_c = this.actions.actPrepocet) === null || _c === void 0 ? void 0 : _c.update({ enabled: dataFound });
                    // KH DPH pouze pro rok 2016 a vyse
                    debugger;
                    (_d = this.actions.actKontrolaKH) === null || _d === void 0 ? void 0 : _d.update({ enabled: dataFound && ((_e = this.GlobalsParam.EkoParams) === null || _e === void 0 ? void 0 : _e.ROK) >= 2016, visible: ((_f = this.GlobalsParam.EkoParams) === null || _f === void 0 ? void 0 : _f.ROK) >= 2016 });
                    (_g = this.actions.actObdobiKH) === null || _g === void 0 ? void 0 : _g.update({ enabled: dataFound && ((_h = this.GlobalsParam.EkoParams) === null || _h === void 0 ? void 0 : _h.ROK) >= 2016, visible: ((_j = this.GlobalsParam.EkoParams) === null || _j === void 0 ? void 0 : _j.ROK) >= 2016 });
                };
                /**
                 * Transforamce dat pro zobrazeni
                 * @param vstup
                 */
                GZdanovaciObdobi.prototype.Transformace = function (vstup) {
                    //vstup.forEach((polozka) => {
                    //    if (polozka.dat_priz_max) 
                    //        polozka["dat_priz_max_t"] = Gordic.Templates.Formatters.date(polozka.dat_priz_max);
                    //    else
                    //        polozka["dat_priz_max_t"] = "";
                    //    if (polozka.dat_priz_dph === null)
                    //        polozka["dat_priz_dph_t"] = "";
                    //    else
                    //        polozka["dat_priz_dph_t"] = Gordic.Templates.Formatters.date(polozka.dat_priz_dph);
                    //});
                };
                /**
                 *  Znovunacteni dat
                 *
                 */
                GZdanovaciObdobi.prototype.reload = function () {
                    var that = this;
                    debugger;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    Gordic.Isl.InuObdobiDPH.list()
                        .get()
                        .done(function (result) {
                        debugger;
                        //at.setActions(result.ListValues?.length as any);
                        //that.Transformace(result);
                        return def.resolve(result);
                    })
                        .always(function () { });
                    return def.promise();
                };
                /**
                 *  Danova dolozenost
                 *
                 * */
                GZdanovaciObdobi.prototype.Tisk = function (mesic) {
                    var that = this;
                    var deffer = $.Deferred();
                    that.beginOperation("jres:30250045"); //RC 30250045 : Zpracovávám
                    Gordic.Isl.InuObdobiDPH.tiskni({ mesic: mesic })
                        .get()
                        .done(function (data) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ZpracovaniZpravy(that, data);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .done(function (returnValue) {
                                that.endOperation();
                                return deffer.resolve();
                            })
                                .always(function () {
                                that.endOperation();
                            });
                        }
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    return deffer.promise();
                };
                /**
                 *  Danova dolozenost
                 *
                 * */
                GZdanovaciObdobi.prototype.DanovaDolozenost = function (mesic) {
                    var that = this;
                    var deffer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                    that.beginOperation("jres:30250045"); //RC 30250045 : Zpracovávám
                    Gordic.Isl.InuObdobiDPH.tiskniDanovouDolozenost({ mesic: mesic })
                        .get()
                        .done(function (data) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ZpracovaniZpravy(that, data);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .done(function (returnValue) {
                                that.endOperation();
                                return deffer.resolve();
                            })
                                .always(function () {
                                that.endOperation();
                            });
                        }
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    return deffer.promise();
                };
                /**
                 *  Prepocet stavu
                 *
                 * */
                GZdanovaciObdobi.prototype.Prepocet = function (ico, rok, mesic) {
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
                            that.beginOperation("jres:30250043".format(mesic)); //RC 30250043 : Přepočítávám {0}
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
                GZdanovaciObdobi.prototype.ZobrazSeznamPriznani = function (row) {
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
                GZdanovaciObdobi.prototype.ZobrazDetail = function (row, editace) {
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
                GZdanovaciObdobi = __decorate([
                    gcontent
                ], GZdanovaciObdobi);
                return GZdanovaciObdobi;
            }(Gordic.GContentBase));
            WebClient.GZdanovaciObdobi = GZdanovaciObdobi;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=GZdanovaciObdobi.js.map