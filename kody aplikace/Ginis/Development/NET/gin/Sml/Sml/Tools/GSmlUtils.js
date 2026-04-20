"use strict";
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            var Options;
            (function (Options) {
                function Podani(options) {
                    let returnValue = { isEditing: false, ixp_dokladu: "" };
                    var _this = options.cnt;
                    _this.beginOperation("Založení nového dokumentu - Krok 1/1: Vložte PID", 0, 1);
                    Gordic.Wfl.Dialogs.GenerovaniIxp(_this, {
                        TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                        TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                        ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.ParametremGinGenIxp,
                        HlaseniPriExistenciVAgende: false,
                        DotazPriExistenciVJineAgende: false
                    }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                        .done((retVal, content) => {
                        if (!retVal) {
                            _this.showFlash("Vytvoření dokumentu se nepodařilo, dialog bude uzavřen ...", "g-state-error", 5000);
                            setTimeout(() => { _this.tryClose(); }, 5200);
                            return;
                        }
                        if (!retVal.IxpExist) {
                            _this.progressOperation("Založení nového dokladu - Hotovo", 1);
                            if (retVal && retVal.Ixp) {
                                // PID byl sejmut, nastavit do DetailDto.ixp, nastavit IsEditable = true a dát load - dojde k načtení editovatelného detailu s novým ixp
                                returnValue.ixp_dokladu = retVal.Ixp;
                                returnValue.isEditing = true;
                                _this.isl.DetailDokladu.podani({
                                    data: { ixp: retVal.Ixp },
                                }).getData().done(function (ol) { });
                                if (options.seznamDokladu) {
                                    Sml.Dialogs.GSmlDetailOpenDlg({
                                        parentContent: _this,
                                        opt: {
                                            ixp_den: undefined,
                                            ixp_dokladu: retVal.Ixp,
                                        }
                                    }).fail(() => {
                                        _this.showFlash("Vytvoření dokumentu se nepodařilo, dialog bude uzavřen ...", "g-state-error", 5000);
                                        setTimeout(() => { _this.tryClose(); }, 5200);
                                    });
                                }
                                else
                                    _this.load({ ixp_dokladu: retVal.Ixp }).fail(() => {
                                        _this.showFlash("Vytvoření dokumentu se nepodařilo, dialog bude uzavřen ...", "g-state-error", 5000);
                                        setTimeout(() => { _this.tryClose(); }, 5200);
                                    });
                            }
                            else {
                                _this.tryClose();
                            }
                        }
                        else {
                            _this.progressOperation("Otevírání existujícího dokladu", 1);
                            returnValue.ixp_dokladu = retVal.Ixp; //změna vlastnosti, která je JsonProperty, takže se při load přenese automaticky.
                            _this.load({ ixp_dokladu: retVal.Ixp });
                        }
                    })
                        .fail(() => {
                        _this.tryClose();
                    }).always(() => {
                        _this.endOperation();
                    });
                }
                Options.Podani = Podani;
                //export function columnsFinancovaniPolozkyPrehled(gcontent: GContent, ktg_sml_p: number | undefined): GGridColumn<any>[] | Data.GridFormat<any> | undefined {
                //    var gf = new Gordic.Data.GridFormat<Interface.GSmlInfoFinancovaniPripaduDto>();
                //    gf.addTextColumn({
                //        name: "Stav",
                //        description: "Stav",
                //        cellTemplate: (value) => {
                //            switch (value.up_stav) {
                //                case Interface.StavPolozky.ng_upsNavrh:
                //                    return "N";
                //                case Interface.StavPolozky.ng_upsEvidence:
                //                    return "E";
                //                case Interface.StavPolozky.ng_upsEvidenceValidate:
                //                    return "Eok";
                //                case Interface.StavPolozky.ng_upsValidate:
                //                    return "Ok";
                //                case Interface.StavPolozky.ng_upsClose:
                //                    return "U";
                //                case Interface.StavPolozky.ng_upsStorno:
                //                    return "S";
                //                default:
                //                    return "";
                //            }
                //        }
                //    })
                //    gf.addTextColumn({
                //        name: "cis_pol_pla", caption: "jres:33500654", width: 120, //RC 33500654 : Čísla položky plánu
                //    })
                //    gf.addTextColumn({
                //        name: "nks", caption: "jres:33500655", width: 120, //RC 33500655 : NKS
                //    })
                //    gf.addNumberColumn({
                //        name: "rok", caption: "jres:33500245", width: 120, //RC 33500245 : Rok
                //    })
                //    gf.addTextColumn({
                //        name: "bu_vl", caption: "jres:33500656", width: 120, //RC 33500656 : Bankovní účet
                //        cellTemplate: "{bu_vl}/{sk_vl}",
                //    })
                //        .addSortedEkoCfuSet(
                //            Gordic.Eko.CfuUtils.getCfuSetServerFilters(gcontent, {
                //                isRoz: true, //patri k rozpoctu 
                //                isUct: false,  //patri do ucetnictvi                        
                //            })
                //        )
                //        .addTextColumn({
                //            name: "priz_zaz", // asi v gridu na tvrdo
                //            caption: "jres:33500657", //RC 33500657 : Typ operace
                //            description: "jres:33500657",
                //            cellTemplate: (value) => {
                //                let ktg_sml = ktg_sml_p;
                //                // let ktg_sml = this.model?.findoc?.ktg_sml;
                //                let val = value.priz_zaz ?? -1;
                //                if (ktg_sml == Interface.KategorieDokladu.ng_ktgsmlDod || ktg_sml == Interface.KategorieDokladu.ng_ktgsmlDodObj || ktg_sml == Interface.KategorieDokladu.ng_ktgsmlIndPrislib || ktg_sml == Interface.KategorieDokladu.ng_ktgsmlDodLimPrislib) {
                //                    if (val == 0)
                //                        return "jres:33500658"; //RC 33500658 : Výdaj
                //                    else if (val == 1)
                //                        return "jres:33500659"; //RC 33500659 : Vratka příjmu
                //                    else
                //                        throw "Error 33500005";
                //                }
                //                else if (ktg_sml == Interface.KategorieDokladu.ng_ktgsmlOdb || ktg_sml == Interface.KategorieDokladu.ng_ktgsmlOdbObj || ktg_sml == Interface.KategorieDokladu.ng_ktgsmlJinyPrijemInd || ktg_sml == Interface.KategorieDokladu.ng_ktgsmlJinyPrijemLim) {
                //                    if (val == 0)
                //                        return "jres:33500660"; //RC 33500660 : Příjem
                //                    else if (val == 1)
                //                        return "jres:33500661"; //RC 33500661 : Vratka výdaje
                //                    else
                //                        throw "Error 33500006";
                //                }
                //                else
                //                    return "";
                //            },
                //        })
                //        .addCurrencyColumn({
                //            name: "c",
                //            caption: "jres:33500662", //RC 33500662 : Částka krytí CZK
                //            description: "jres:33500662",
                //        })
                //        .addCurrencyColumn({
                //            name: "c_fak",
                //            caption: "jres:33500663", //RC 33500663 : Částka vratky REZ CZK
                //            description: "jres:33500663",
                //        })
                //        .addNumberColumn({
                //            name: "m",
                //            caption: "jres:33500664", //RC 33500664 : Množství
                //            description: "jres:33500664",
                //        })
                //        .addTextColumn({
                //            name: "mj_txt",
                //            caption: "jres:33500665", //RC 33500665 : MJ
                //            description: "jres:33500665",
                //        })
                //        .addTextColumn({
                //            name: "nazev",
                //            caption: "jres:33500666", //RC 33500666 : Název položky
                //            description: "jres:33500666",
                //        })
                //    return gf;
                //}
                function filterFormDef(ktg_den_p, StavDokladuFilter, StavPodpisuFilter, dataFilter) {
                    let filterFormDef = new Gordic.Forms.Form({ tabLabel: "Kompletní filtr", name: "ZakladniFilter" })
                        .addSection("Doklad")
                        .addRow("jres:33500460").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), { name: "ixp" /* Interface.GDokladyDtoNames.ixp */, model: "ixp" /* Interface.GDokladyDtoNames.ixp */ }) //RC 33500460 : Identifikátor
                        .addRow("jres:33500461").addField("gformbox", {
                        name: "evidencni_cislo",
                        model: "model.ac_odDo=value.odDo",
                        form: new Gordic.Forms.Form({
                            layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0"
                        }).addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "string",
                            pathInModel: "odDo",
                            name: "evidencni_cislo",
                            customOptAll: {
                                change: function (ev, obj) {
                                    ;
                                },
                            }
                        })),
                        itemTemplate: function (value) {
                            var start = "", end = "";
                            if (value.odDo.start != null)
                                start = String(value.odDo.start);
                            if (value.odDo.end != null)
                                end = String(value.odDo.end);
                            return end.length > 0 || start.length > 0 ? (start + " - " + end) /*+ "  (" + (value.odDo.end === value.odDo.start ? "0 let" : Gordic.Templates.Formatters.datetime([value.odDo.end]).from(Gordic.Templates.Formatters.datetime([value.odDo.start]),true))+")"*/ : "";
                        },
                        mode: "inlineimmediate",
                    })
                        .addRow("jres:33500462").addField("gformbox", {
                        name: "agendove_cislo",
                        model: "model.ac_sml=value.odDo",
                        form: new Gordic.Forms.Form({
                            layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0"
                        }).addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "string",
                            pathInModel: "odDo",
                            name: "agendove_cislo",
                            customOptAll: {
                                change: function (ev, obj) {
                                },
                            }
                        })),
                        itemTemplate: function (value) {
                            var start = "", end = "";
                            if (value.odDo.start != null)
                                start = String(value.odDo.start);
                            if (value.odDo.end != null)
                                end = String(value.odDo.end);
                            return end.length > 0 || start.length > 0 ? (start + " - " + end) /*+ "  (" + (value.odDo.end === value.odDo.start ? "0 let" : Gordic.Templates.Formatters.datetime([value.odDo.end]).from(Gordic.Templates.Formatters.datetime([value.odDo.start]),true))+")"*/ : "";
                        },
                        mode: "inlineimmediate",
                    })
                        .addRow("jres:33500463").addField("gselectbox", //RC 33500463 : Typ dokladu
                    Gordic.Prefabs.Select.smlTypDokladu(), {
                        name: "ixs_typ",
                        modelDefaults: { ktg_den: ktg_den_p },
                        model: "ixs_typ=value.ixs_typ,ktg_den<=value.ktg_den"
                    })
                        .addRow("jres:33500464").addField("gformbox", {
                        name: "financovani_od",
                        model: "model.fin_od=value.odDo",
                        form: new Gordic.Forms.Form({
                            layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0"
                        }).addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "rok",
                            pathInModel: "odDo",
                            name: "financovani_od",
                            customOptAll: {
                                change: function (ev, obj) {
                                },
                            }
                        })),
                        itemTemplate: function (value) {
                            var start = "", end = "";
                            if (value.odDo.start != null)
                                start = String(value.odDo.start);
                            if (value.odDo.end != null)
                                end = String(value.odDo.end);
                            return end.length > 0 || start.length > 0 ? (start + " - " + end) /*+ "  (" + (value.odDo.end === value.odDo.start ? "0 let" : Gordic.Templates.Formatters.datetime([value.odDo.end]).from(Gordic.Templates.Formatters.datetime([value.odDo.start]),true))+")"*/ : "";
                        },
                        mode: "inlineimmediate",
                    })
                        .addRow("jres:33500465").addField("gformbox", {
                        name: "financovani_od",
                        model: "model.fin_do=value.odDo",
                        form: new Gordic.Forms.Form({
                            layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0"
                        }).addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "rok",
                            pathInModel: "odDo",
                            name: "financovani_do",
                            customOptAll: {
                                change: function (ev, obj) {
                                },
                            }
                        })),
                        itemTemplate: function (value) {
                            var start = "", end = "";
                            if (value.odDo.start != null)
                                start = String(value.odDo.start);
                            if (value.odDo.end != null)
                                end = String(value.odDo.end);
                            return end.length > 0 || start.length > 0 ? (start + " - " + end) /*+ "  (" + (value.odDo.end === value.odDo.start ? "0 let" : Gordic.Templates.Formatters.datetime([value.odDo.end]).from(Gordic.Templates.Formatters.datetime([value.odDo.start]),true))+")"*/ : "";
                        },
                        mode: "inlineimmediate",
                    })
                        .addRow("jres:33500466").addField("gformbox", {
                        name: "dat_prij_pod",
                        model: "model.dat_prij_pod=value.odDo",
                        form: new Gordic.Forms.Form({
                            layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0"
                        }).addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "date",
                            pathInModel: "odDo",
                            name: "dat_prij_pod",
                            customOptAll: {
                                change: function (ev, obj) {
                                },
                            }
                        })),
                        itemTemplate: function (value) {
                            let start, end;
                            if (value.odDo.start != null)
                                start = Gordic.Templates.Formatters.datetime(new Date(value.odDo.start)).format('DD.MM.YYYY');
                            if (value.odDo.end != null)
                                end = Gordic.Templates.Formatters.datetime(new Date(value.odDo.end)).format('DD.MM.YYYY');
                            return end != undefined || start != undefined ? (start + " - " + end) /*+ "  (" + (value.odDo.end === value.odDo.start ? "0 let" : Gordic.Templates.Formatters.datetime([value.odDo.end]).from(Gordic.Templates.Formatters.datetime([value.odDo.start]),true))+")"*/ : "";
                        },
                        mode: "inlineimmediate",
                    })
                        .addRow("jres:33500467").addField("gformbox", {
                        name: "dat_uzav",
                        model: "model.dat_uzav=value.odDo",
                        form: new Gordic.Forms.Form({
                            layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0"
                        }).addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "date",
                            pathInModel: "odDo",
                            name: "dat_uzav",
                            customOptAll: {
                                change: function (ev, obj) {
                                },
                            }
                        })),
                        itemTemplate: function (value) {
                            let start, end;
                            if (value.odDo.start != null)
                                start = Gordic.Templates.Formatters.datetime(new Date(value.odDo.start)).format('DD.MM.YYYY');
                            if (value.odDo.end != null)
                                end = Gordic.Templates.Formatters.datetime(new Date(value.odDo.end)).format('DD.MM.YYYY');
                            return end != undefined || start != undefined ? (start + " - " + end) /*+ "  (" + (value.odDo.end === value.odDo.start ? "0 let" : Gordic.Templates.Formatters.datetime([value.odDo.end]).from(Gordic.Templates.Formatters.datetime([value.odDo.start]),true))+")"*/ : "";
                        },
                        mode: "inlineimmediate",
                    })
                        .addRow("jres:33500468").addField("gformbox", {
                        name: "dat_platnost",
                        model: "model.dat_platnost=value.odDo",
                        form: new Gordic.Forms.Form({
                            layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0"
                        }).addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "date",
                            pathInModel: "odDo",
                            name: "dat_platnost",
                            customOptAll: {
                                change: function (ev, obj) {
                                },
                            }
                        })),
                        itemTemplate: function (value) {
                            let start, end;
                            if (value.odDo.start != null)
                                start = Gordic.Templates.Formatters.datetime(new Date(value.odDo.start)).format('DD.MM.YYYY');
                            if (value.odDo.end != null)
                                end = Gordic.Templates.Formatters.datetime(new Date(value.odDo.end)).format('DD.MM.YYYY');
                            return end != undefined || start != undefined ? (start + " - " + end) /*+ "  (" + (value.odDo.end === value.odDo.start ? "0 let" : Gordic.Templates.Formatters.datetime([value.odDo.end]).from(Gordic.Templates.Formatters.datetime([value.odDo.start]),true))+")"*/ : "";
                        },
                        mode: "inlineimmediate",
                    })
                        .addRow("jres:33500469").addField("gformbox", {
                        name: "dat_sgn",
                        model: "model.dat_sgn=value.odDo",
                        form: new Gordic.Forms.Form({
                            layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0"
                        }).addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "date",
                            pathInModel: "odDo",
                            name: "dat_sgn",
                            customOptAll: {
                                change: function (ev, obj) {
                                },
                            }
                        })),
                        itemTemplate: function (value) {
                            let start, end;
                            if (value.odDo.start != null)
                                start = Gordic.Templates.Formatters.datetime(new Date(value.odDo.start)).format('DD.MM.YYYY');
                            if (value.odDo.end != null)
                                end = Gordic.Templates.Formatters.datetime(new Date(value.odDo.end)).format('DD.MM.YYYY');
                            return end != undefined || start != undefined ? (start + " - " + end) /*+ "  (" + (value.odDo.end === value.odDo.start ? "0 let" : Gordic.Templates.Formatters.datetime([value.odDo.end]).from(Gordic.Templates.Formatters.datetime([value.odDo.start]),true))+")"*/ : "";
                        },
                        mode: "inlineimmediate",
                    })
                        .addRow("jres:33500470").addField("gformbox", {
                        name: "dat_sgn_ext",
                        model: "model.dat_sgn_ext=value.odDo",
                        form: new Gordic.Forms.Form({
                            layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0"
                        }).addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "date",
                            pathInModel: "odDo",
                            name: "dat_sgn_ext",
                            customOptAll: {
                                change: function (ev, obj) {
                                },
                            }
                        })),
                        itemTemplate: function (value) {
                            let start, end;
                            if (value.odDo.start != null)
                                start = Gordic.Templates.Formatters.datetime(new Date(value.odDo.start)).format('DD.MM.YYYY');
                            if (value.odDo.end != null)
                                end = Gordic.Templates.Formatters.datetime(new Date(value.odDo.end)).format('DD.MM.YYYY');
                            return end != undefined || start != undefined ? (start + " - " + end) /*+ "  (" + (value.odDo.end === value.odDo.start ? "0 let" : Gordic.Templates.Formatters.datetime([value.odDo.end]).from(Gordic.Templates.Formatters.datetime([value.odDo.start]),true))+")"*/ : "";
                        },
                        mode: "inlineimmediate",
                    })
                        .addRow("Datum účinnosti").addField("gformbox", {
                        name: "dat_ucinnost",
                        model: "model.dat_ucinnost=value.odDo",
                        form: new Gordic.Forms.Form({
                            layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0"
                        }).addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "date",
                            pathInModel: "odDo",
                            name: "dat_ucinnost",
                            customOptAll: {
                                change: function (ev, obj) {
                                },
                            }
                        })),
                        itemTemplate: function (value) {
                            let start, end;
                            if (value.odDo.start != null)
                                start = Gordic.Templates.Formatters.datetime(new Date(value.odDo.start)).format('DD.MM.YYYY');
                            if (value.odDo.end != null)
                                end = Gordic.Templates.Formatters.datetime(new Date(value.odDo.end)).format('DD.MM.YYYY');
                            return end != undefined || start != undefined ? (start + " - " + end) /*+ "  (" + (value.odDo.end === value.odDo.start ? "0 let" : Gordic.Templates.Formatters.datetime([value.odDo.end]).from(Gordic.Templates.Formatters.datetime([value.odDo.start]),true))+")"*/ : "";
                        },
                        mode: "inlineimmediate",
                    })
                        .addRow("jres:33500471") //RC 33500471 : Příznak přečtení
                        .addField("gselectbox", {
                        name: "priz_view",
                        model: "model.priz_view = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        data: [
                            { priz_view: "jres:33500472", v: 10, }, //RC 33500472 : nepřečteno
                            { priz_view: "jres:33500473", v: 0, }, //RC 33500473 : přečteno
                            { priz_view: "jres:33500474", v: -1, } //RC 33500474 : neurčeno
                        ], // mozna bude lepsi predelat na new Gordic.Data.View
                        itemTemplate: "{priz_view}",
                        helperColumns: ["priz_view"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addRow("jres:33500475").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "popis",
                        model: "model.popis"
                    })
                        .addRow("jres:33500476").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "nazev_sml",
                        model: "model.nazev"
                    })
                        .addSection("jres:33500477") //RC 33500477 : Případ
                        .addRow("jres:33500478").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), { name: "ixp_sml_pri" /* Interface.GDokladyDtoNames.ixp_sml_pri */, model: "ixp_sml_pri" /* Interface.GDokladyDtoNames.ixp_sml_pri */ }) //RC 33500478 : Identifikátor
                        .addRow("jres:33500479").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), { name: "ac_sml_pri" /* Interface.GDokladyDtoNames.ac_sml_pri */ }) //RC 33500479 : Agendové číslo
                        .addRow("jres:33500480").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "ac_ver_zak" /* Interface.GDokladyDtoNames.ac_ver_zak */, model: "ac_ver_zak" /* Interface.GDokladyDtoNames.ac_ver_zak */
                    })
                        .addRow("Agendové číslo nadřazeného případu").addField("gstringbox", Gordic.Prefabs.String.withOperators(Gordic.Eko.Filters.getStringOperators()), {
                        name: "ac_sml_nad",
                        model: "model.ac_sml_nad"
                    })
                        .addRow("jres:33500481") //RC 33500481 : Stav evidence
                        .addField("gselectbox", {
                        name: "stav_evi",
                        model: "model.stav_evi = value.valu",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        data: new Gordic.Data.View([
                            { stav_evi: "jres:33500482", valu: 10 /* Interface.StavEvidKniha.ng_staveviEvidovane */, }, //RC 33500482 : Evidované
                            { stav_evi: "jres:33500483", valu: 20 /* Interface.StavEvidKniha.ng_staveviNeevidovane */, }, //RC 33500483 : Neevidované
                            { stav_evi: "jres:33500484", valu: 30 /* Interface.StavEvidKniha.ng_staveviAktualEvidovane */, }, //RC 33500484 : Aktuálně evidované
                            { stav_evi: "jres:33500485", valu: 40 /* Interface.StavEvidKniha.ng_staveviPreevidovaneZ */, }, //RC 33500485 : Přeevidované z
                            { stav_evi: "jres:33500486", valu: 50 /* Interface.StavEvidKniha.ng_staveviPreevidovaneDo */, }, //RC 33500486 : Přeevidované do
                            { stav_evi: "jres:33500487", valu: 60 /* Interface.StavEvidKniha.ng_staveviPuvodni */, }, //RC 33500487 : Původní
                        ], { key: "valu" }),
                        itemTemplate: "{stav_evi}",
                        helperColumns: ["stav_evi"],
                        helperItemTemplate: "{stav_evi:trim:encode}"
                    })
                        .addRow("jres:33500488") //RC 33500488 : Stav dokladu
                        .addField("gselectbox", {
                        name: "sml_stav",
                        model: "model.sml_stav = value.sml_stav",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        data: StavDokladuFilter,
                        itemTemplate: "{sml_stav_txt}",
                        helperColumns: ["sml_stav_txt"],
                        helperItemTemplate: "{sml_stav_txt:trim:encode}"
                    })
                        .addRow("jres:33500489") //RC 33500489 : Stav podpisu
                        .addField("gselectbox", {
                        name: "sgn_stav",
                        model: "model.sgn_stav = value.sgn_stav",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        data: StavPodpisuFilter,
                        itemTemplate: "{sgn_stav_txt}",
                        helperColumns: ["sgn_stav_txt"],
                        helperItemTemplate: "{sgn_stav_txt:trim:encode}"
                    })
                        .addRow("Realizátor").addField("gselectbox", Gordic.Prefabs.Select.ekosrea(), {
                        dropdown: true,
                        name: "cis_real",
                        model: "model.cis_real=value.cis_real;model.ico=value.ico",
                        //kvůli povýšení TS - stejně na vymazání souboru
                        //disabled: !dataFilter.cis_real_edit ?? false,
                        //initialValue: { cis_real: dataFilter.cis_real, ico: dataFilter.ico }
                        serverFilters: {
                            ico: dataFilter.ico,
                            aktivita: 100,
                        }
                    })
                        .addRow("Kompetent").addField("gselectbox", Gordic.Prefabs.Select.ekoskom(), {
                        dropdown: true,
                        name: "ixs_fun_vyriz",
                        model: "model.ico=value.ico; model.ixs_fun_vyriz = value.ixs_fun",
                    })
                        .addRow("Vyřizující referent").addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        dropdown: true,
                        name: "ixs_fun_ref",
                        model: "model.ixs_fun_ref=value.ixs_fun"
                    })
                        .addRow("Organizační jednotka").addField("gselectbox", Gordic.Prefabs.Select.ginsorj(), {
                        dropdown: true,
                        name: "ixs_orj",
                        model: "model.ixs_orj=value.ixs_orj"
                    })
                        .addRow("Zastupující").addField("gselectbox", Gordic.Prefabs.Select.SmlZastoupenaOsoba(), {
                        dropdown: true,
                        name: "ixs_orj",
                    })
                        .addRow("Posledních").addField("gnumberbox", { name: "num_row" });
                    //.addPrefab(Gordic.Gin.Prefabs.interval(
                    //    {
                    //        type: "string"
                    //        , label: "Agendové číslo"
                    //        , name: "ac_sml"
                    //        , pathInModel: "model.ac_sml"
                    //    }))
                    //.addRow("Typ smlouvy").addField("gselectbox",
                    //    Gordic.Prefabs.Select.smlTypDokladu()
                    //    , {
                    //        //dropdown: true
                    //        name: "ixs_typ"
                    //        , mujKtGden: this.ktg_den
                    //        , serverFilters:
                    //        {
                    //            //data: function () {
                    //            //    return that.srv.call("InitListSeznam");
                    //            //},
                    //            // that.srv.call("InitListSeznam").done(function (prop) {
                    //            //   that.properties = prop;
                    //            //}),
                    //            //ktg_den: function (ev, obj) { return ; },
                    //            //ktg_den: function (ev, obj) { return that.srv.serverContext.ktg_den; },
                    //            ktg_den: function (ev, obj) {
                    //                var a = ($(this) as any).gfield("option", "mujKtGden");
                    //                return a;
                    //            },
                    //            ixp_den: this.ixpKniha, // function(ev, obj) { return that.srv.serverContext.ixp_den; }
                    //        }
                    //        , modelDefaults: { ktg_den: this.ktg_den }
                    //        , model: "model.ixs_typ=value.ixs_typ; model.ktg_typ<=value.ktg_typ"
                    //    } as any)
                    //.addPrefab(Gordic.Gin.Prefabs.interval(
                    //    {
                    //        type: "rok"
                    //        , label: "Financování od"
                    //        , name: "fin_od"
                    //        , pathInModel: "model.fin_od"
                    //    }))
                    //.addPrefab(Gordic.Gin.Prefabs.interval(
                    //    {
                    //        type: "rok"
                    //        , label: "Financování do"
                    //        , name: "fin_do"
                    //        , pathInModel: "model.fin_do"
                    //    }))
                    //.addPrefab(Gordic.Gin.Prefabs.interval(
                    //    {
                    //        type: "date"
                    //        , label: "Datum evidence"
                    //        , name: "dat_prij_pod"
                    //        , pathInModel: "model.dat_prij_pod"
                    //    }))
                    //.addPrefab(Gordic.Gin.Prefabs.interval(
                    //    {
                    //        type: "date"
                    //        , label: "Datum uzavření"
                    //        , name: "dat_uzav"
                    //        , pathInModel: "model.dat_uzav"
                    //    }))
                    //.addPrefab(Gordic.Gin.Prefabs.interval(
                    //    {
                    //        type: "date"
                    //        , label: "Datum ukončení platnosti"
                    //        , name: "dat_platnost"
                    //        , pathInModel: "model.dat_platnost"
                    //    }))
                    //.addPrefab(Gordic.Gin.Prefabs.interval(
                    //    {
                    //        type: "date"
                    //        , label: "Datum podpisu"
                    //        , name: "dat_sgn"
                    //        , pathInModel: "model.dat_sgn"
                    //    }))
                    //.addPrefab(Gordic.Gin.Prefabs.interval(
                    //    {
                    //        type: "date"
                    //        , label: "Datum podpisu protistrany"
                    //        , name: "dat_sgn_ext"
                    //        , pathInModel: "model.dat_sgn_ext"
                    //    }))
                    //.addPrefab(Gordic.Gin.Prefabs.interval(
                    //    {
                    //        type: "date"
                    //        , label: "Datum účinnosti"
                    //        , name: "dat_ucinnost"
                    //        , pathInModel: "model.dat_ucinnost"
                    //    }))
                    //.addRow("Příznak přečtení")
                    //.addField("gselectbox", {
                    //    name: "priz_view",
                    //    model: "model.priz_view = value.v",
                    //    dropdown: true,
                    //    emptyValue: null,
                    //    itemWidth: "",
                    //    data: [
                    //        { priz_view: "nepřečteno", v: 10, },
                    //        { priz_view: "přečteno", v: 0, },
                    //        { priz_view: "neurčeno", v: -1, }
                    //    ], // mozna bude lepsi predelat na new Gordic.Data.View
                    //    itemTemplate: "{priz_view}",
                    //    helperColumns: ["priz_view"],
                    //    verify: function (value) {
                    //        var data = $(this).gfield("option", "data") as any[]
                    //        for (var i = 0; i < data.length; i++) {
                    //            if (data[i].v === value.v) {
                    //                return data[i];
                    //            }
                    //        }
                    //        return null;
                    //    },
                    //})
                    //// TODO .addRow("Posledních").addField("gnumberbox", { name: "num_row" })
                    //.addRow("Stav insolvence").addField("gselectbox",
                    //    Gordic.Prefabs.Select.gincisr(),
                    //    {
                    //        name: "druh_stav_rizeni"
                    //        , model: "model.druh_stav_rizeni = value.druh_stav_rizeni "
                    //        //,multi: true
                    //    })
                    //.addRow("Typ organizace").addField("gselectbox",
                    //    Gordic.Prefabs.Select.ginctyo(),
                    //    {
                    //        name: "typ_org"
                    //        , model: "model.typ_org = value.typ_org"
                    //    })
                    //.addRow("Ičo protistrany").addField("gstringbox", {
                    //    name: "ico_esu"
                    //    , model: "model.ico_esu"
                    //})
                    ////.addRow()
                    //// TODO: klicova slova
                    ////.addRow("IČO protistrany").addField(
                    ////    "gselectbox",
                    ////    Gordic.Prefabs.Select.ginsesu(),
                    ////    {
                    ////        name: "ixs_esu",
                    ////        model: "model.ico_esu=value.ixs_esu"
                    ////    })
                    //.addSection()
                    //.addRow("Číslo VZ,DT,PO").addField("gstringbox",
                    //    {
                    //        name: "ac_ver_zak"
                    //        , model: "model.ac_ver_zak"
                    //    })
                    ////TODO Stav evidence
                    //.addRow("Stav dokladu").addField("gselectbox"
                    //    , Gordic.Prefabs.Select.smlcsta()
                    //    , {
                    //        dropdown: true
                    //        , name: "sml_stav"
                    //        , model: "model.sml_stav = value.sml_stav"
                    //    })
                    //.addRow("Stav podpisu").addField("gselectbox"
                    //    , Gordic.Prefabs.Select.smlcsts()
                    //    , {
                    //        dropdown: true
                    //        , name: "sgn_stav"
                    //        , model: "model.sgn_stav = value.sgn_stav"
                    //    })
                    //// TODO: .addRow("Finanční konrola").addField("gselectbox", { name: "" })
                    //.addRow("Účtování o PZ/P").addField("gselectbox", {
                    //    name: "priz_pzp",
                    //    model: "model.priz_pzp = value.v",
                    //    dropdown: true,
                    //    emptyValue: null,
                    //    itemWidth: "",
                    //    data: [
                    //        { priz_pzp: "ano", v: 10, },
                    //        { priz_pzp: "ne", v: 0, },
                    //        { priz_pzp: "neurčeno", v: -1, }
                    //    ],
                    //    itemTemplate: "{priz_pzp}",
                    //    helperColumns: ["priz_pzp"],
                    //    verify: function (value) {
                    //        //
                    //        var data = $(this).gfield("option", "data") as any[]
                    //        for (var i = 0; i < data.length; i++) {
                    //            if (data[i].v === value.v) {
                    //                return data[i];
                    //            }
                    //        }
                    //        return null;
                    //    },
                    //})
                    ////TODO:.addRow("Vlastník").addField("gselectbox", { name: "ixs_fun_akt" }) ixs_esu_vla
                    ////Readers.SmlVlastnik = function (options) { this._base({ readerClass: "Gordic.Sml.Client.GReaderSmlVlastnik", keys: ['ixs_fun'], columns: ["ixs_fun", "nazev_rf", "ktg_den"], rowSize: 100, readAll: false, permanent: false }, options); };
                    ////Readers.SmlVlastnik.inheritsFrom(Readers.Base);
                    ////Fields.smlVlastnik = function () { return { data: new Readers.SmlVlastnik(), itemTemplate: "{nazev_rf}", helperColumns: ["nazev_rf"] }; };
                    //.addRow("Vlastník")
                    //.addField("gselectbox", Gordic.Prefabs.Select.smlVlastnik()
                    //    , {
                    //        //dropdown: true
                    //        name: "vlastnik"
                    //        , serverFilters: {
                    //            ixp_den: this.ktg_den
                    //            , subrada: this.subrada
                    //            , rezimKniha: 0
                    //            , rezimHist: 1
                    //        }
                    //        , model: "model.ixs_fun_akt = value.ixs_fun_akt"
                    //        //   ,itemTemplate: "{nazev_rf:trim:encode}"
                    //    }) //RC 26600291 : Vlastník
                    ////.addRow("jres:26600291").addField("gselectbox"
                    ////    , Gordic.Prefabs.Select.smlVlastnik(),
                    ////{
                    ////    dropdown: true
                    ////    , name: "vlastnik"
                    ////    , serverFilters: {
                    ////        ixp_den: this.param.ixp_den
                    ////       //ixp_den: function (ev, obj) { return that.model.ixp_den; }
                    ////  // , subrada: new Gordic.Forms.Dependency("kniha", "subrada", true), rezimKniha: 0, rezimHist: 1
                    ////        , model: "model.ixs_fun_akt = value.ixs_fun_akt"
                    ////    }
                    ////}) //RC 26600291 : Vlastník
                    ////.addRow("Zpracovatel").addField("gselectbox", //referent
                    ////{
                    ////    name: "ixs_fun_akt_txt",
                    ////    model: "model.ixs_fun_akt_txt = value.cis_real; ixs_fun_akt_txt = nazev"
                    ////})
                    //.addRow("Realizátor").addField("gselectbox",
                    //    Gordic.Prefabs.Select.ekosrea(),
                    //    {
                    //        dropdown: true
                    //        , name: "cis_real",
                    //        model: "ico=ico; model.cis_real = value.cis_real; cis_real_txt=nazev"
                    //    })
                    //.addRow("Kompetent").addField("gselectbox",
                    //    Gordic.Prefabs.Select.ekoskom(),
                    //    {
                    //        dropdown: true,
                    //        name: "ixs_fun_vyriz",
                    //        model: "ico=ico; model.ixs_fun_vyriz = value.ixs_fun; ixs_fun_vyriz_txt=nazev_ref "
                    //    })
                    //.addRow("Vyřizující referent").addField("gselectbox",
                    //    Gordic.Prefabs.Select.ginsfun(),
                    //    {
                    //        dropdown: true,
                    //        name: "ixs_fun_ref",
                    //        model: "ixs_fun_ref=ixs_fun; ixs_fun_ref_txt=nazev_ref"
                    //    })
                    //.addRow("Organizační jednotka").addField("gselectbox",
                    //    Gordic.Prefabs.Select.ginsorj(),
                    //    {
                    //        dropdown: true,
                    //        name: "ixs_orj",
                    //        model: "ixs_orj=ixs_orj"
                    //    })
                    //.addRow("Popis").addField("gstringbox", { name: "popis_pid", model: "model.popis_pid" })
                    //.addRow("Úplný název").addField("gstringbox", { name: "nazev_sml", model: "model.nazev_sml" })
                    return filterFormDef;
                }
                Options.filterFormDef = filterFormDef;
                function filterFinancniUdaje(priz_iissp_p) {
                    //#region filterFinancniUdaje
                    let filterFinancniUdaje = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1 L-3-8-1, M-12-11-1, S-12-11-1", tabLabel: "Finanční údaje" })
                        .addSection("") //RC 26600002 : Případ
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "jres:33500490", //RC 33500490 : Cena dokladu v měně
                        name: "c_mena_doc",
                        type: "number",
                        pathInModel: "model.c_mena_doc",
                        emptyValue: null,
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "jres:33500491", //RC 33500491 : Celková částka v měně
                        name: "c_mena",
                        type: "number",
                        pathInModel: "model.c_mena",
                        emptyValue: null,
                    }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "jres:33500492", //RC 33500492 : Rozpis částky v CZK
                        name: "c",
                        type: "number",
                        pathInModel: "model.c",
                        emptyValue: null,
                    }))
                        .addSection()
                        .addRow("jres:33500493").addField("gselectbox", Gordic.Prefabs.Select.smlctyc(), { name: "typ_ceny", model: "model.typ_ceny = value.typ_ceny" }) //RC 33500493 : Typ ceny
                        .addRow("jres:33500494").addField("gselectbox", {
                        name: "stav_rez",
                        model: "stav_rez = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav_rezervace: "jres:33500495", v: -1, }, //RC 33500495 : Neurčeno
                            { stav_rezervace: "jres:33500496", v: 0, }, //RC 33500496 : Žádná rezervace
                            { stav_rezervace: "jres:33500497", v: 1, }, //RC 33500497 : Částečná rezervace
                            { stav_rezervace: "jres:33500498", v: 2, } //RC 33500498 : Úplná rezervace
                        ],
                        itemTemplate: "{stav_rezervace}",
                        helperColumns: ["stav_rezervace"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    });
                    if (priz_iissp_p != 0) { // ContentValues.AddObject("priz_iissp", UserProcess.EkoParams.PrizIissp);
                        filterFinancniUdaje.addRow("Stav rezervace SP").addField("gselectbox", {
                            name: "stav_rez_iissp",
                            model: "stav_rez_iissp = value.v",
                            dropdown: true,
                            emptyValue: null,
                            itemWidth: "",
                            change: function (ev, obj) {
                                //that.zmenaDokladu = true;
                                //that.SetEnableOk();
                            },
                            data: [
                                { stav_rezervace_iissp: "jres:33500499", v: -1, }, //RC 33500499 : Neurčeno
                                { stav_rezervace_iissp: "jres:33500500", v: 0, }, //RC 33500500 : Připraveno
                                { stav_rezervace_iissp: "jres:33500501", v: 10, }, //RC 33500501 : Odesláno
                                { stav_rezervace_iissp: "jres:33500502", v: 20, }, //RC 33500502 : Schváleno
                                { stav_rezervace_iissp: "jres:33500503", v: 30, }, //RC 33500503 : Schváleno s výhradou
                                { stav_rezervace_iissp: "jres:33500504", v: 23, }, //RC 33500504 : Schváleno + schváleno s výhradou
                                { stav_rezervace_iissp: "jres:33500505", v: 40, } //RC 33500505 : Zamítnuto
                            ],
                            itemTemplate: "{stav_rezervace_iissp}",
                            helperColumns: ["stav_rezervace_iissp"],
                            verify: function (value) {
                                var data = $(this).gfield("option", "data");
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].v === value.v) {
                                        return data[i];
                                    }
                                }
                                return null;
                            },
                        })
                            .addRow("jres:33500506")
                            .addField("gstringbox", {
                            name: "id_hdr_ris",
                            model: "id_hdr_ris"
                        }); //RC 33500506 : ID IISSP
                    }
                    ;
                    return filterFinancniUdaje;
                }
                Options.filterFinancniUdaje = filterFinancniUdaje;
                function filterOstatniUdaje() {
                    //------ostatni
                    var filterOstatniUdaje = new Gordic.Forms.Form({
                        layoutDescriptor: "L2M2S1 L-3-8-1, M-12-11-1, S-12-11-1", tabLabel: "Ostatní údaje"
                    })
                        .addRow("jres:33500507").addField("gstringbox", {
                        name: "poznamka", change: function (ev, obj) { }
                    })
                        .addRow("jres:33500508").addField("gstringbox", { name: "ac_dok_1", change: function (ev, obj) { } }) //RC 33500508 : Související dokument
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "jres:33500511", //RC 33500511 : Datum
                        name: "dat_dok_1",
                        type: "date",
                        pathInModel: "model.dat_dok_1",
                        emptyValue: null,
                    }))
                        .addRow("jres:33500509").addField("gstringbox", { name: "ac_dok_2" }) //RC 33500509 : Související dokument
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "jres:33500510", //RC 33500510 : Datum
                        name: "dat_dok_2",
                        type: "date",
                        pathInModel: "model.dat_dok_2",
                        emptyValue: null,
                    }))
                        .addRow("jres:33500512").addField("gselectbox", Gordic.Prefabs.Select.smlczuk(), {
                        name: "ixs_zuk", model: "model.ixs_zuk = value.ixs_zuk", change: function (ev, obj) { }
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "jres:33500513", //RC 33500513 : Datum ukončení
                        name: "dat_uko",
                        type: "date",
                        pathInModel: "model.dat_uko",
                        emptyValue: null,
                    }))
                        .addSection("jres:33500514") //RC 33500514 : Vazby dokladů SML
                        .addRow("jres:33500515").addField("gselectbox", {
                        name: "sml_blk",
                        model: "sml_blk = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav: "jres:33500516", v: 10, }, //RC 33500516 : Existuje
                            { stav: "jres:33500517", v: 20, }, //RC 33500517 : Neexistuje
                            { stav: "jres:33500518", v: 0, }, //RC 33500518 : Neurčeno
                        ],
                        itemTemplate: "{stav}",
                        helperColumns: ["stav"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addRow("jres:33500520").addField("gselectbox", {
                        name: "sml_nad_sml",
                        model: "sml_nad_sml = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav: "jres:33500521", v: 10, }, //RC 33500521 : Existuje
                            { stav: "jres:33500522", v: 20, }, //RC 33500522 : Neexistuje
                            { stav: "jres:33500523", v: 0, } //RC 33500523 : Neurčeno
                        ],
                        itemTemplate: "{stav}",
                        helperColumns: ["stav"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addRow("jres:33500524").addField("gselectbox", {
                        name: "sml_obj",
                        model: "sml_obj = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav: "jres:33500525", v: 10, }, //RC 33500525 : Existuje
                            { stav: "jres:33500526", v: 20, }, //RC 33500526 : Neexistuje
                            { stav: "jres:33500527", v: 0, } //RC 33500527 : Neurčeno
                        ],
                        itemTemplate: "{stav}",
                        helperColumns: ["stav"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addRow("jres:33500528").addField("gselectbox", {
                        name: "sml_dod",
                        model: "sml_dod = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav: "jres:33500529", v: 10, }, //RC 33500529 : Existuje
                            { stav: "jres:33500530", v: 20, }, //RC 33500530 : Neexistuje
                            { stav: "jres:33500531", v: 0, } //RC 33500531 : Neurčeno
                        ],
                        itemTemplate: "{stav}",
                        helperColumns: ["stav"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addRow("jres:33500532").addField("gselectbox", {
                        name: "sml_nad_pri",
                        model: "sml_nad_pri = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav: "Ano", v: 10, },
                            { stav: "Ne", v: 20, },
                            { stav: "Neurčeno", v: 0, }
                        ],
                        itemTemplate: "{stav}",
                        helperColumns: ["stav"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addRow("jres:33500533").addField("gselectbox", {
                        name: "sml_doc_dsg",
                        model: "sml_doc_dsg = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav: "jres:33500535", v: 10, }, //RC 33500535 : Ano
                            { stav: "jres:33500536", v: 20, }, //RC 33500536 : Ne
                            { stav: "jres:33500537", v: 0, } //RC 33500537 : Neurčeno
                        ],
                        itemTemplate: "{stav}",
                        helperColumns: ["stav"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addRow("jres:33500534").addField("gselectbox", {
                        name: "s_ele",
                        model: "s_ele = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav: "jres:33500535", v: 10, }, //RC 33500535 : Ano
                            { stav: "jres:33500536", v: 20, }, //RC 33500536 : Ne
                            { stav: "jres:33500537", v: 0, } //RC 33500537 : Neurčeno
                        ],
                        itemTemplate: "{stav}",
                        helperColumns: ["stav"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addSection("jres:33500538") //RC 33500538 : Zveřejnění
                        .addSection("")
                        .addSection()
                        //TODO - neni cis .addRow("jres:26600042").addField("gselectbox",  //RC 26600042 : Stav
                        //Gordic.Prefabs.Select.wflcszp(),
                        //{
                        //    name: "stav_zverejneni",
                        //    model: "model.stav_zverejneni=value.stav_zpv",
                        //    change: function (ev, changeObj) {
                        //        that.findFields("plan_zve").gfield("option", "disabled", changeObj.value.stav_zpv == 0 /*nezahájeno*/);
                        //        that.findFields("plan_zve").gfield("setValue", null);
                        //    }
                        //})
                        .addRow("jres:33500539").addField("gselectbox", //RC 33500539 : Způsob
                    Gordic.Prefabs.Select.wflszpv(), {
                        name: "ixs_zpv",
                        model: "model.ixs_zpv=value.ixs_zpv",
                        change: function (ev, changeObj) {
                        }
                    })
                        .addRow("jres:33500540").addField("gselectbox", {
                        name: "priz_pov_zve",
                        model: "priz_pov_zve = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav: "jres:33500541", v: -1, }, //RC 33500541 : Existuje
                            { stav: "jres:33500542", v: 0, }, //RC 33500542 : Nepovinné
                            { stav: "jres:33500543", v: 1, }, //RC 33500543 : Povinné
                        ],
                        itemTemplate: "{stav}",
                        helperColumns: ["stav"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addRow("Plán").addField("gselectbox", Gordic.Prefabs.Select.wflszpv(), {
                        name: "plan_zve",
                        disabled: true,
                        model: "model.plan_zve=value.plan_zve",
                        change: function (ev, changeObj) {
                        }
                    })
                        .addSection()
                        .addRow("jres:33500544").addField("gselectbox", {
                        name: "s_ele_zve",
                        model: "s_ele_zve = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav: "jres:33500545", v: 10, }, //RC 33500545 : Existuje
                            { stav: "jres:33500546", v: 20, }, //RC 33500546 : Neexistuje
                            { stav: "jres:33500547", v: 0, }, //RC 33500547 : Neurčeno
                        ],
                        itemTemplate: "{stav}",
                        helperColumns: ["stav"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "jres:33500548", //RC 33500548 : Datum
                        name: "dat_zve",
                        type: "date",
                        pathInModel: "model.dat_zve",
                        emptyValue: null,
                    }))
                        .addRow("jres:33500549").addField("gstringbox", {
                        name: "id_zve", change: function (ev, obj) { }, model: "id_zve"
                    });
                    return filterOstatniUdaje;
                }
                Options.filterOstatniUdaje = filterOstatniUdaje;
                function filterVecnyProfil() {
                    var filterVecnyProfil = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1 L-3-8-1, M-12-11-1, S-12-11-1", tabLabel: "Věcný profil" })
                        .addSection()
                        .addRow("jres:33500550").addField("gselectbox", {
                        name: "vp_typ_vyb",
                        model: "vp_typ_vyb = value.v",
                        dropdown: true,
                        emptyValue: null,
                        itemWidth: "",
                        change: function (ev, obj) {
                            //that.zmenaDokladu = true;
                            //that.SetEnableOk();
                        },
                        data: [
                            { stav: "jres:33500545", v: 10, }, //RC 33500545 : Existuje
                            { stav: "jres:33500546", v: 20, }, //RC 33500546 : Neexistuje
                            { stav: "jres:33500547", v: 0, }, //RC 33500547 : Neurčeno
                        ],
                        itemTemplate: "{stav}",
                        helperColumns: ["stav"],
                        verify: function (value) {
                            var data = $(this).gfield("option", "data");
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].v === value.v) {
                                    return data[i];
                                }
                            }
                            return null;
                        },
                    })
                        .addRow("jres:33500551").addField("gselectbox", Gordic.Prefabs.Select.smlVepsdup(), {
                        name: "vp_ixs_dup",
                        model: "model.vp_ixs_dup = value.ixs_dup",
                        change: function (ev, obj) { }
                    })
                        .addRow("Název položky VP").addField("gstringbox", { name: "vp_nazev_skp", change: function (ev, obj) { }, model: "vp_nazev_skp" })
                        .addRow("Inventární číslo").addField("gstringbox", { name: "vp_inv_cis", change: function (ev, obj) { }, model: "vp_inv_cis" })
                        //TODO: nen ciselnik if (!this.is_acr) { //není instalace na ACR
                        //    formBuilderMaska.addRow("jres:26600046").addField("gselectbox", Gordic.Prefabs.Select.majscim(), { //RC 26600046 : Materiálové číslo
                        //        name: "vp_mat_cis",
                        //        model: "model.vp_mat_cis = value.vp_mat_cis",
                        //        change: function (ev, obj) { }
                        //    })
                        //}
                        //else {
                        //    //  doplnit políčko na matskcm, až bude
                        //}
                        .addSection();
                    filterVecnyProfil.addRow("jres:33500552").addField("gstringbox", { name: "vp_evi_cis", change: function (ev, obj) { }, model: "vp_evi_cis" }) //RC 33500552 : Evidenční číslo
                        .addRow("jres:33500553").addField("gstringbox", { name: "vp_vyr_cis", change: function (ev, obj) { }, model: "vp_vyr_cis" }) //RC 33500553 : Výrobní číslo
                        .addRow("jres:33500554").addField("gstringbox", { name: "vp_ser_cis", change: function (ev, obj) { }, model: "vp_ser_cis" }) //RC 33500554 : Sériové číslo
                        .addRow("jres:33500555").addField("gselectbox", Gordic.Prefabs.Select.ekoskla(), {
                        name: "vp_skp",
                        model: "model.vp_skp = value.skp",
                        change: function (ev, obj) { }
                    })
                        .addRow("jres:33500556").addField("gstringbox", { name: "vp_sarze", change: function (ev, obj) { }, model: "vp_sarze" }) //RC 33500556 : Šarže
                        .addRow("jres:33500557").addField("gselectbox", Gordic.Prefabs.Select.majcskm(), {
                        name: "vp_skupina_id",
                        model: "model.vp_skupina_id = value.vp_skupina_id",
                        change: function (ev, obj) { }
                    })
                        .addRow("jres:33500558").addField("gselectbox", Gordic.Prefabs.Select.majcdrm(), {
                        name: "vp_drh_id",
                        model: "model.vp_drh_id = value.vp_drh_id",
                        change: function (ev, obj) { }
                    })
                        //TODO:.addRow("jres:26600052").addField("gselectbox",  //RC 26600066 : MJ
                        //Gordic.Prefabs.Select.gincmej(),
                        //{
                        //    name: "mj",
                        //    model: "model.mj=value.mj",
                        //    change: function (ev, changeObj) {
                        //    }
                        //})
                        //.addPrefab(Gordic.Gin.Prefabs.interval({
                        //    label: "jres:26600093", //RC 26600093 : Množství
                        //    name: "vp_m",
                        //    type: "number",
                        //    pathInModel: "model.vp_m",
                        //    emptyValue: null,
                        //    change: function (ev, obj) { }
                        //}))
                        //.addPrefab(Gordic.Gin.Prefabs.interval({
                        //    label: "jres:26600197", //RC 26600197 : Částka
                        //    name: "vp_c",
                        //    type: "number",
                        //    pathInModel: "model.vp_c",
                        //    emptyValue: null,
                        //    change: function (ev, obj) { }
                        //}))
                        .addRow("jres:33500559").addField("gstringbox", {
                        name: "vp_popis", change: function (ev, obj) { }, allowResize: true, rows: 3, autoSize: true, model: "vp_popis"
                    });
                    return filterVecnyProfil;
                }
                Options.filterVecnyProfil = filterVecnyProfil;
            })(Options = WebClient.Options || (WebClient.Options = {}));
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NtbFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0E2N0NmO0FBNzdDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2N0NuQjtJQTc3Q2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTY3QzdCO1FBNzdDb0IsV0FBQSxTQUFTO1lBQUMsSUFBQSxPQUFPLENBNjdDckM7WUE3N0M4QixXQUFBLE9BQU87Z0JBZWxDLFNBQWdCLE1BQU0sQ0FBQyxPQUFvQjtvQkFDdkMsSUFBSSxXQUFXLEdBQXNCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQzNFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQ3hCLEtBQUssQ0FBQyxjQUFjLENBQUMsa0RBQWtELEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUUvRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO3dCQUNwQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPO3dCQUMvQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHO3dCQUN6QyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CO3dCQUNsRiwwQkFBMEIsRUFBRSxLQUFLO3dCQUNqQyw0QkFBNEIsRUFBRSxLQUFLO3FCQUN0QyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7eUJBQzlDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVB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d0JBQzFDLG9EQUFvRDt3QkFDcEQsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLGdDQUFnQzt3QkFDaEMsdUJBQXVCO3dCQUN2QixvQ0FBb0M7d0JBQ3BDLEtBQUs7eUJBQ0osTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7d0JBQzVDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVU7cUJBQ2xILENBQUMsQ0FBQTtvQkFFTixPQUFPLGlCQUFpQixDQUFDO2dCQUM3QixDQUFDO2dCQXJHZSx5QkFBaUIsb0JBcUdoQyxDQUFBO1lBQ0wsQ0FBQyxFQTc3QzhCLE9BQU8sR0FBUCxpQkFBTyxLQUFQLGlCQUFPLFFBNjdDckM7UUFBRCxDQUFDLEVBNzdDb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNjdDN0I7SUFBRCxDQUFDLEVBNzdDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNjdDbkI7QUFBRCxDQUFDLEVBNzdDUyxNQUFNLEtBQU4sTUFBTSxRQTY3Q2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlNtbC5XZWJDbGllbnQuT3B0aW9ucyB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU21sT3B0aW9ucyB7XHJcbiAgICAgICAgLyoqIFR5cCBjb250ZW50dSAqL1xyXG4gICAgICAgIGNudDogR0NvbnRlbnQ8SUdDb250ZW50QmFzZSwgYW55PjtcclxuICAgICAgICBzZXpuYW1Eb2tsYWR1OiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdTbWxQb2RhbmlSZXR1cm4ge1xyXG4gICAgICAgIC8qKiBUeXAgY29udGVudHUgKi9cclxuICAgICAgICBpeHBfZG9rbGFkdTogc3RyaW5nO1xyXG4gICAgICAgIGlzRWRpdGluZzogYm9vbGVhbjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFBvZGFuaShvcHRpb25zOiBHU21sT3B0aW9ucykge1xyXG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTogSUdTbWxQb2RhbmlSZXR1cm4gPSB7IGlzRWRpdGluZzogZmFsc2UsIGl4cF9kb2tsYWR1OiBcIlwiIH07XHJcbiAgICAgICAgdmFyIF90aGlzID0gb3B0aW9ucy5jbnQ7XHJcbiAgICAgICAgX3RoaXMuYmVnaW5PcGVyYXRpb24oXCJaYWxvxb5lbsOtIG5vdsOpaG8gZG9rdW1lbnR1IC0gS3JvayAxLzE6IFZsb8W+dGUgUElEXCIsIDAsIDEpO1xyXG5cclxuICAgICAgICBHb3JkaWMuV2ZsLkRpYWxvZ3MuR2VuZXJvdmFuaUl4cChfdGhpcywge1xyXG4gICAgICAgICAgICBUeXBEb2s6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5UeXBEb2suVmxhc3RuaSxcclxuICAgICAgICAgICAgVHlwSWQ6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5UeXBJZC5JWFAsXHJcbiAgICAgICAgICAgIFpwdXNvYkdlbmVyb3Zhbmk6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5acHVzb2JHZW5lcm92YW5pSXhwLlBhcmFtZXRyZW1HaW5HZW5JeHAsXHJcbiAgICAgICAgICAgIEhsYXNlbmlQcmlFeGlzdGVuY2lWQWdlbmRlOiBmYWxzZSxcclxuICAgICAgICAgICAgRG90YXpQcmlFeGlzdGVuY2lWSmluZUFnZW5kZTogZmFsc2VcclxuICAgICAgICB9LCBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdylcclxuICAgICAgICAgICAgLmRvbmUoKHJldFZhbCwgY29udGVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zaG93Rmxhc2goXCJWeXR2b8WZZW7DrSBkb2t1bWVudHUgc2UgbmVwb2RhxZlpbG8sIGRpYWxvZyBidWRlIHV6YXbFmWVuIC4uLlwiLCBcImctc3RhdGUtZXJyb3JcIiwgNTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IF90aGlzLnRyeUNsb3NlKCk7IH0sIDUyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXJldFZhbC5JeHBFeGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnByb2dyZXNzT3BlcmF0aW9uKFwiWmFsb8W+ZW7DrSBub3bDqWhvIGRva2xhZHUgLSBIb3Rvdm9cIiwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgJiYgcmV0VmFsLkl4cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQSUQgYnlsIHNlam11dCwgbmFzdGF2aXQgZG8gRGV0YWlsRHRvLml4cCwgbmFzdGF2aXQgSXNFZGl0YWJsZSA9IHRydWUgYSBkw6F0IGxvYWQgLSBkb2pkZSBrIG5hxI10ZW7DrSBlZGl0b3ZhdGVsbsOpaG8gZGV0YWlsdSBzIG5vdsO9bSBpeHBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUuaXhwX2Rva2xhZHUgPSByZXRWYWwuSXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZS5pc0VkaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pc2wuRGV0YWlsRG9rbGFkdS5wb2Rhbmkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBpeHA6IHJldFZhbC5JeHAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpLmRvbmUoZnVuY3Rpb24gKG9sKSB7IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2V6bmFtRG9rbGFkdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9ncy5HU21sRGV0YWlsT3BlbkRsZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogX3RoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rva2xhZHU6IHJldFZhbC5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvd0ZsYXNoKFwiVnl0dm/FmWVuw60gZG9rdW1lbnR1IHNlIG5lcG9kYcWZaWxvLCBkaWFsb2cgYnVkZSB1emF2xZllbiAuLi5cIiwgXCJnLXN0YXRlLWVycm9yXCIsIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBfdGhpcy50cnlDbG9zZSgpOyB9LCA1MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2FkKHsgaXhwX2Rva2xhZHU6IHJldFZhbC5JeHAgfSkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvd0ZsYXNoKFwiVnl0dm/FmWVuw60gZG9rdW1lbnR1IHNlIG5lcG9kYcWZaWxvLCBkaWFsb2cgYnVkZSB1emF2xZllbiAuLi5cIiwgXCJnLXN0YXRlLWVycm9yXCIsIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBfdGhpcy50cnlDbG9zZSgpOyB9LCA1MjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wcm9ncmVzc09wZXJhdGlvbihcIk90ZXbDrXLDoW7DrSBleGlzdHVqw61jw61obyBkb2tsYWR1XCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlLml4cF9kb2tsYWR1ID0gcmV0VmFsLkl4cDsgLy96bcSbbmEgdmxhc3Rub3N0aSwga3RlcsOhIGplIEpzb25Qcm9wZXJ0eSwgdGFrxb5lIHNlIHDFmWkgbG9hZCBwxZllbmVzZSBhdXRvbWF0aWNreS5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2FkKHsgaXhwX2Rva2xhZHU6IHJldFZhbC5JeHAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy9leHBvcnQgZnVuY3Rpb24gY29sdW1uc0ZpbmFuY292YW5pUG9sb3preVByZWhsZWQoZ2NvbnRlbnQ6IEdDb250ZW50LCBrdGdfc21sX3A6IG51bWJlciB8IHVuZGVmaW5lZCk6IEdHcmlkQ29sdW1uPGFueT5bXSB8IERhdGEuR3JpZEZvcm1hdDxhbnk+IHwgdW5kZWZpbmVkIHtcclxuICAgIC8vICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HU21sSW5mb0ZpbmFuY292YW5pUHJpcGFkdUR0bz4oKTtcclxuXHJcbiAgICAvLyAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgIC8vICAgICAgICBuYW1lOiBcIlN0YXZcIixcclxuICAgIC8vICAgICAgICBkZXNjcmlwdGlvbjogXCJTdGF2XCIsXHJcbiAgICAvLyAgICAgICAgY2VsbFRlbXBsYXRlOiAodmFsdWUpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS51cF9zdGF2KSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5TdGF2UG9sb3preS5uZ191cHNOYXZyaDpcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOXCI7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5TdGF2UG9sb3preS5uZ191cHNFdmlkZW5jZTpcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJFXCI7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5TdGF2UG9sb3preS5uZ191cHNFdmlkZW5jZVZhbGlkYXRlOlxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkVva1wiO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuU3RhdlBvbG96a3kubmdfdXBzVmFsaWRhdGU6XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiT2tcIjtcclxuICAgIC8vICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLlN0YXZQb2xvemt5Lm5nX3Vwc0Nsb3NlOlxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlVcIjtcclxuICAgIC8vICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLlN0YXZQb2xvemt5Lm5nX3Vwc1N0b3JubzpcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJTXCI7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgLy8gICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgfVxyXG4gICAgLy8gICAgfSlcclxuXHJcbiAgICAvLyAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgIC8vICAgICAgICBuYW1lOiBcImNpc19wb2xfcGxhXCIsIGNhcHRpb246IFwianJlczozMzUwMDY1NFwiLCB3aWR0aDogMTIwLCAvL1JDIDMzNTAwNjU0IDogxIzDrXNsYSBwb2xvxb5reSBwbMOhbnVcclxuICAgIC8vICAgIH0pXHJcbiAgICAvLyAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgIC8vICAgICAgICBuYW1lOiBcIm5rc1wiLCBjYXB0aW9uOiBcImpyZXM6MzM1MDA2NTVcIiwgd2lkdGg6IDEyMCwgLy9SQyAzMzUwMDY1NSA6IE5LU1xyXG4gICAgLy8gICAgfSlcclxuICAgIC8vICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAvLyAgICAgICAgbmFtZTogXCJyb2tcIiwgY2FwdGlvbjogXCJqcmVzOjMzNTAwMjQ1XCIsIHdpZHRoOiAxMjAsIC8vUkMgMzM1MDAyNDUgOiBSb2tcclxuICAgIC8vICAgIH0pXHJcbiAgICAvLyAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgIC8vICAgICAgICBuYW1lOiBcImJ1X3ZsXCIsIGNhcHRpb246IFwianJlczozMzUwMDY1NlwiLCB3aWR0aDogMTIwLCAvL1JDIDMzNTAwNjU2IDogQmFua292bsOtIMO6xI1ldFxyXG4gICAgLy8gICAgICAgIGNlbGxUZW1wbGF0ZTogXCJ7YnVfdmx9L3tza192bH1cIixcclxuICAgIC8vICAgIH0pXHJcbiAgICAvLyAgICAgICAgLmFkZFNvcnRlZEVrb0NmdVNldChcclxuICAgIC8vICAgICAgICAgICAgR29yZGljLkVrby5DZnVVdGlscy5nZXRDZnVTZXRTZXJ2ZXJGaWx0ZXJzKGdjb250ZW50LCB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBpc1JvejogdHJ1ZSwgLy9wYXRyaSBrIHJvenBvY3R1IFxyXG4gICAgLy8gICAgICAgICAgICAgICAgaXNVY3Q6IGZhbHNlLCAgLy9wYXRyaSBkbyB1Y2V0bmljdHZpICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgLy8gICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgIClcclxuICAgIC8vICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAvLyAgICAgICAgICAgIG5hbWU6IFwicHJpel96YXpcIiwgLy8gYXNpIHYgZ3JpZHUgbmEgdHZyZG9cclxuICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjU3XCIsIC8vUkMgMzM1MDA2NTcgOiBUeXAgb3BlcmFjZVxyXG4gICAgLy8gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjU3XCIsXHJcbiAgICAvLyAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKHZhbHVlKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICBsZXQga3RnX3NtbCA9IGt0Z19zbWxfcDtcclxuICAgIC8vICAgICAgICAgICAgICAgIC8vIGxldCBrdGdfc21sID0gdGhpcy5tb2RlbD8uZmluZG9jPy5rdGdfc21sO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgbGV0IHZhbCA9IHZhbHVlLnByaXpfemF6ID8/IC0xO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgaWYgKGt0Z19zbWwgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sRG9kIHx8IGt0Z19zbWwgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sRG9kT2JqIHx8IGt0Z19zbWwgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sSW5kUHJpc2xpYiB8fCBrdGdfc21sID09IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbERvZExpbVByaXNsaWIpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09IDApXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM1MDA2NThcIjsgLy9SQyAzMzUwMDY1OCA6IFbDvWRhalxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA9PSAxKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwNjU5XCI7IC8vUkMgMzM1MDA2NTkgOiBWcmF0a2EgcMWZw61qbXVcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiRXJyb3IgMzM1MDAwMDVcIjtcclxuICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgIGVsc2UgaWYgKGt0Z19zbWwgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sT2RiIHx8IGt0Z19zbWwgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sT2RiT2JqIHx8IGt0Z19zbWwgPT0gSW50ZXJmYWNlLkthdGVnb3JpZURva2xhZHUubmdfa3Rnc21sSmlueVByaWplbUluZCB8fCBrdGdfc21sID09IEludGVyZmFjZS5LYXRlZ29yaWVEb2tsYWR1Lm5nX2t0Z3NtbEppbnlQcmlqZW1MaW0pIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09IDApXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM1MDA2NjBcIjsgLy9SQyAzMzUwMDY2MCA6IFDFmcOtamVtXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsID09IDEpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM1MDA2NjFcIjsgLy9SQyAzMzUwMDY2MSA6IFZyYXRrYSB2w71kYWplXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkVycm9yIDMzNTAwMDA2XCI7XHJcbiAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcblxyXG4gICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgIC8vICAgICAgICAgICAgbmFtZTogXCJjXCIsXHJcbiAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDY2MlwiLCAvL1JDIDMzNTAwNjYyIDogxIzDoXN0a2Ega3J5dMOtIENaS1xyXG4gICAgLy8gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjYyXCIsXHJcbiAgICAvLyAgICAgICAgfSlcclxuXHJcbiAgICAvLyAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgIC8vICAgICAgICAgICAgbmFtZTogXCJjX2Zha1wiLFxyXG4gICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2NjNcIiwgLy9SQyAzMzUwMDY2MyA6IMSMw6FzdGthIHZyYXRreSBSRVogQ1pLXHJcbiAgICAvLyAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2NjNcIixcclxuICAgIC8vICAgICAgICB9KVxyXG5cclxuICAgIC8vICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgIC8vICAgICAgICAgICAgbmFtZTogXCJtXCIsXHJcbiAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDY2NFwiLCAvL1JDIDMzNTAwNjY0IDogTW5vxb5zdHbDrVxyXG4gICAgLy8gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjY0XCIsXHJcbiAgICAvLyAgICAgICAgfSlcclxuXHJcbiAgICAvLyAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgLy8gICAgICAgICAgICBuYW1lOiBcIm1qX3R4dFwiLFxyXG4gICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2NjVcIiwgLy9SQyAzMzUwMDY2NSA6IE1KXHJcbiAgICAvLyAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2NjVcIixcclxuICAgIC8vICAgICAgICB9KVxyXG5cclxuICAgIC8vICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAvLyAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjY2XCIsIC8vUkMgMzM1MDA2NjYgOiBOw6F6ZXYgcG9sb8W+a3lcclxuICAgIC8vICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDY2NlwiLFxyXG4gICAgLy8gICAgICAgIH0pXHJcblxyXG4gICAgLy8gICAgcmV0dXJuIGdmO1xyXG4gICAgLy99XHJcblxyXG5cclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckZvcm1EZWYoa3RnX2Rlbl9wOiBudW1iZXIsIFN0YXZEb2tsYWR1RmlsdGVyOiBJbnRlcmZhY2UuR1NtbGNzdGFEdG9bXSwgU3RhdlBvZHBpc3VGaWx0ZXI6IEludGVyZmFjZS5HU21sY3N0c0R0b1tdLCBkYXRhRmlsdGVyOiBJbnRlcmZhY2UuR0Rva2xhZHlMaXN0RmlsdGVyRHRvKSB7XHJcblxyXG4gICAgICAgIGxldCBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiS29tcGxldG7DrSBmaWx0clwiLCBuYW1lOiBcIlpha2xhZG5pRmlsdGVyXCIgfSlcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJEb2tsYWRcIilcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NjBcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwgeyBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHAsIG1vZGVsOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHAgfSkgLy9SQyAzMzUwMDQ2MCA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDYxXCIpLmFkZEZpZWxkKFwiZ2Zvcm1ib3hcIiwgeyAvL1JDIDMzNTAwNDYxIDogRXZpZGVuxI1uw60gxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJldmlkZW5jbmlfY2lzbG9cIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmFjX29kRG89dmFsdWUub2REb1wiLFxyXG4gICAgICAgICAgICAgICAgZm9ybTpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMLTAtMTItMCBNLTAtMTItMCBTLTAtMTItMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhJbk1vZGVsOiBcIm9kRG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJldmlkZW5jbmlfY2lzbG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApKSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gXCJcIiwgZW5kID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUub2REby5zdGFydCAhPSBudWxsKSBzdGFydCA9IFN0cmluZyh2YWx1ZS5vZERvLnN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUub2REby5lbmQgIT0gbnVsbCkgZW5kID0gU3RyaW5nKHZhbHVlLm9kRG8uZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW5kLmxlbmd0aCA+IDAgfHwgc3RhcnQubGVuZ3RoID4gMCA/IChzdGFydCArIFwiIC0gXCIgKyBlbmQpIC8qKyBcIiAgKFwiICsgKHZhbHVlLm9kRG8uZW5kID09PSB2YWx1ZS5vZERvLnN0YXJ0ID8gXCIwIGxldFwiIDogR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKFt2YWx1ZS5vZERvLmVuZF0pLmZyb20oR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKFt2YWx1ZS5vZERvLnN0YXJ0XSksdHJ1ZSkpK1wiKVwiKi8gOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcImlubGluZWltbWVkaWF0ZVwiLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NjJcIikuYWRkRmllbGQoXCJnZm9ybWJveFwiLCB7IC8vUkMgMzM1MDA0NjIgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhZ2VuZG92ZV9jaXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYWNfc21sPXZhbHVlLm9kRG9cIixcclxuICAgICAgICAgICAgICAgIGZvcm06XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTC0wLTEyLTAgTS0wLTEyLTAgUy0wLTEyLTBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoSW5Nb2RlbDogXCJvZERvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWdlbmRvdmVfY2lzbG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApKSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gXCJcIiwgZW5kID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUub2REby5zdGFydCAhPSBudWxsKSBzdGFydCA9IFN0cmluZyh2YWx1ZS5vZERvLnN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUub2REby5lbmQgIT0gbnVsbCkgZW5kID0gU3RyaW5nKHZhbHVlLm9kRG8uZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW5kLmxlbmd0aCA+IDAgfHwgc3RhcnQubGVuZ3RoID4gMCA/IChzdGFydCArIFwiIC0gXCIgKyBlbmQpIC8qKyBcIiAgKFwiICsgKHZhbHVlLm9kRG8uZW5kID09PSB2YWx1ZS5vZERvLnN0YXJ0ID8gXCIwIGxldFwiIDogR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKFt2YWx1ZS5vZERvLmVuZF0pLmZyb20oR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKFt2YWx1ZS5vZERvLnN0YXJ0XSksdHJ1ZSkpK1wiKVwiKi8gOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcImlubGluZWltbWVkaWF0ZVwiLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NjNcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIC8vUkMgMzM1MDA0NjMgOiBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbFR5cERva2xhZHUoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbERlZmF1bHRzOiB7IGt0Z19kZW46IGt0Z19kZW5fcCB9LFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX3R5cD12YWx1ZS5peHNfdHlwLGt0Z19kZW48PXZhbHVlLmt0Z19kZW5cIlxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NjRcIikuYWRkRmllbGQoXCJnZm9ybWJveFwiLCB7IC8vUkMgMzM1MDA0NjQgOiBGaW5hbmNvdsOhbsOtIG9kXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZpbmFuY292YW5pX29kXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5maW5fb2Q9dmFsdWUub2REb1wiLFxyXG4gICAgICAgICAgICAgICAgZm9ybTpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMLTAtMTItMCBNLTAtMTItMCBTLTAtMTItMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhJbk1vZGVsOiBcIm9kRG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaW5hbmNvdmFuaV9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRBbGw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkpLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBcIlwiLCBlbmQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5vZERvLnN0YXJ0ICE9IG51bGwpIHN0YXJ0ID0gU3RyaW5nKHZhbHVlLm9kRG8uc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5vZERvLmVuZCAhPSBudWxsKSBlbmQgPSBTdHJpbmcodmFsdWUub2REby5lbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbmQubGVuZ3RoID4gMCB8fCBzdGFydC5sZW5ndGggPiAwID8gKHN0YXJ0ICsgXCIgLSBcIiArIGVuZCkgLyorIFwiICAoXCIgKyAodmFsdWUub2REby5lbmQgPT09IHZhbHVlLm9kRG8uc3RhcnQgPyBcIjAgbGV0XCIgOiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUoW3ZhbHVlLm9kRG8uZW5kXSkuZnJvbShHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUoW3ZhbHVlLm9kRG8uc3RhcnRdKSx0cnVlKSkrXCIpXCIqLyA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG1vZGU6IFwiaW5saW5laW1tZWRpYXRlXCIsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ2NVwiKS5hZGRGaWVsZChcImdmb3JtYm94XCIsIHsgLy9SQyAzMzUwMDQ2NSA6IEZpbmFuY292w6Fuw60gZG9cclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmluYW5jb3Zhbmlfb2RcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmZpbl9kbz12YWx1ZS5vZERvXCIsXHJcbiAgICAgICAgICAgICAgICBmb3JtOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIEwtMC0xMi0wIE0tMC0xMi0wIFMtMC0xMi0wXCJcclxuICAgICAgICAgICAgICAgICAgICB9KS5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aEluTW9kZWw6IFwib2REb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbmFuY292YW5pX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEFsbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKSksXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IFwiXCIsIGVuZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm9kRG8uc3RhcnQgIT0gbnVsbCkgc3RhcnQgPSBTdHJpbmcodmFsdWUub2REby5zdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm9kRG8uZW5kICE9IG51bGwpIGVuZCA9IFN0cmluZyh2YWx1ZS5vZERvLmVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuZC5sZW5ndGggPiAwIHx8IHN0YXJ0Lmxlbmd0aCA+IDAgPyAoc3RhcnQgKyBcIiAtIFwiICsgZW5kKSAvKisgXCIgIChcIiArICh2YWx1ZS5vZERvLmVuZCA9PT0gdmFsdWUub2REby5zdGFydCA/IFwiMCBsZXRcIiA6IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShbdmFsdWUub2REby5lbmRdKS5mcm9tKEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShbdmFsdWUub2REby5zdGFydF0pLHRydWUpKStcIilcIiovIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJpbmxpbmVpbW1lZGlhdGVcIixcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDY2XCIpLmFkZEZpZWxkKFwiZ2Zvcm1ib3hcIiwgeyAvL1JDIDMzNTAwNDY2IDogRGF0dW0gZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ByaWpfcG9kXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5kYXRfcHJpal9wb2Q9dmFsdWUub2REb1wiLFxyXG4gICAgICAgICAgICAgICAgZm9ybTpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMLTAtMTItMCBNLTAtMTItMCBTLTAtMTItMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoSW5Nb2RlbDogXCJvZERvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ByaWpfcG9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEFsbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKSksXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydCwgZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5vZERvLnN0YXJ0ICE9IG51bGwpIHN0YXJ0ID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKG5ldyBEYXRlKHZhbHVlLm9kRG8uc3RhcnQpKS5mb3JtYXQoJ0RELk1NLllZWVknKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUub2REby5lbmQgIT0gbnVsbCkgZW5kID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKG5ldyBEYXRlKHZhbHVlLm9kRG8uZW5kKSkuZm9ybWF0KCdERC5NTS5ZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuZCAhPSB1bmRlZmluZWQgfHwgc3RhcnQgIT0gdW5kZWZpbmVkID8gKHN0YXJ0ICsgXCIgLSBcIiArIGVuZCkgLyorIFwiICAoXCIgKyAodmFsdWUub2REby5lbmQgPT09IHZhbHVlLm9kRG8uc3RhcnQgPyBcIjAgbGV0XCIgOiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUoW3ZhbHVlLm9kRG8uZW5kXSkuZnJvbShHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUoW3ZhbHVlLm9kRG8uc3RhcnRdKSx0cnVlKSkrXCIpXCIqLyA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIG1vZGU6IFwiaW5saW5laW1tZWRpYXRlXCIsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ2N1wiKS5hZGRGaWVsZChcImdmb3JtYm94XCIsIHsgLy9SQyAzMzUwMDQ2NyA6IERhdHVtIHV6YXbFmWVuw61cclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3V6YXZcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRhdF91emF2PXZhbHVlLm9kRG9cIixcclxuICAgICAgICAgICAgICAgIGZvcm06XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTC0wLTEyLTAgTS0wLTEyLTAgUy0wLTEyLTBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aEluTW9kZWw6IFwib2REb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF91emF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdEFsbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKSksXHJcblxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQsIGVuZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUub2REby5zdGFydCAhPSBudWxsKSBzdGFydCA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShuZXcgRGF0ZSh2YWx1ZS5vZERvLnN0YXJ0KSkuZm9ybWF0KCdERC5NTS5ZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm9kRG8uZW5kICE9IG51bGwpIGVuZCA9IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShuZXcgRGF0ZSh2YWx1ZS5vZERvLmVuZCkpLmZvcm1hdCgnREQuTU0uWVlZWScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbmQgIT0gdW5kZWZpbmVkIHx8IHN0YXJ0ICE9IHVuZGVmaW5lZCA/IChzdGFydCArIFwiIC0gXCIgKyBlbmQpIC8qKyBcIiAgKFwiICsgKHZhbHVlLm9kRG8uZW5kID09PSB2YWx1ZS5vZERvLnN0YXJ0ID8gXCIwIGxldFwiIDogR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKFt2YWx1ZS5vZERvLmVuZF0pLmZyb20oR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKFt2YWx1ZS5vZERvLnN0YXJ0XSksdHJ1ZSkpK1wiKVwiKi8gOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IFwiaW5saW5laW1tZWRpYXRlXCIsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ2OFwiKS5hZGRGaWVsZChcImdmb3JtYm94XCIsIHsgLy9SQyAzMzUwMDQ2OCA6IERhdHVtIHVrb27EjWVuw60gcGxhdG5vc3RpXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wbGF0bm9zdFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZGF0X3BsYXRub3N0PXZhbHVlLm9kRG9cIixcclxuICAgICAgICAgICAgICAgIGZvcm06XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTC0wLTEyLTAgTS0wLTEyLTAgUy0wLTEyLTBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aEluTW9kZWw6IFwib2REb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wbGF0bm9zdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRBbGw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkpLFxyXG5cclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0LCBlbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm9kRG8uc3RhcnQgIT0gbnVsbCkgc3RhcnQgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUobmV3IERhdGUodmFsdWUub2REby5zdGFydCkpLmZvcm1hdCgnREQuTU0uWVlZWScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5vZERvLmVuZCAhPSBudWxsKSBlbmQgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUobmV3IERhdGUodmFsdWUub2REby5lbmQpKS5mb3JtYXQoJ0RELk1NLllZWVknKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW5kICE9IHVuZGVmaW5lZCB8fCBzdGFydCAhPSB1bmRlZmluZWQgPyAoc3RhcnQgKyBcIiAtIFwiICsgZW5kKSAvKisgXCIgIChcIiArICh2YWx1ZS5vZERvLmVuZCA9PT0gdmFsdWUub2REby5zdGFydCA/IFwiMCBsZXRcIiA6IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShbdmFsdWUub2REby5lbmRdKS5mcm9tKEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShbdmFsdWUub2REby5zdGFydF0pLHRydWUpKStcIilcIiovIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcImlubGluZWltbWVkaWF0ZVwiLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NjlcIikuYWRkRmllbGQoXCJnZm9ybWJveFwiLCB7IC8vUkMgMzM1MDA0NjkgOiBEYXR1bSBwb2RwaXN1XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9zZ25cIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRhdF9zZ249dmFsdWUub2REb1wiLFxyXG4gICAgICAgICAgICAgICAgZm9ybTpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMLTAtMTItMCBNLTAtMTItMCBTLTAtMTItMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoSW5Nb2RlbDogXCJvZERvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NnblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRBbGw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkpLFxyXG5cclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0LCBlbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm9kRG8uc3RhcnQgIT0gbnVsbCkgc3RhcnQgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUobmV3IERhdGUodmFsdWUub2REby5zdGFydCkpLmZvcm1hdCgnREQuTU0uWVlZWScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5vZERvLmVuZCAhPSBudWxsKSBlbmQgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUobmV3IERhdGUodmFsdWUub2REby5lbmQpKS5mb3JtYXQoJ0RELk1NLllZWVknKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW5kICE9IHVuZGVmaW5lZCB8fCBzdGFydCAhPSB1bmRlZmluZWQgPyAoc3RhcnQgKyBcIiAtIFwiICsgZW5kKSAvKisgXCIgIChcIiArICh2YWx1ZS5vZERvLmVuZCA9PT0gdmFsdWUub2REby5zdGFydCA/IFwiMCBsZXRcIiA6IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShbdmFsdWUub2REby5lbmRdKS5mcm9tKEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShbdmFsdWUub2REby5zdGFydF0pLHRydWUpKStcIilcIiovIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcImlubGluZWltbWVkaWF0ZVwiLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NzBcIikuYWRkRmllbGQoXCJnZm9ybWJveFwiLCB7IC8vUkMgMzM1MDA0NzAgOiBEYXR1bSBwb2RwaXN1IHByb3Rpc3RyYW55XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9zZ25fZXh0XCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5kYXRfc2duX2V4dD12YWx1ZS5vZERvXCIsXHJcbiAgICAgICAgICAgICAgICBmb3JtOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIEwtMC0xMi0wIE0tMC0xMi0wIFMtMC0xMi0wXCJcclxuICAgICAgICAgICAgICAgICAgICB9KS5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhJbk1vZGVsOiBcIm9kRG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfc2duX2V4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21PcHRBbGw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkpLFxyXG5cclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0LCBlbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm9kRG8uc3RhcnQgIT0gbnVsbCkgc3RhcnQgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUobmV3IERhdGUodmFsdWUub2REby5zdGFydCkpLmZvcm1hdCgnREQuTU0uWVlZWScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5vZERvLmVuZCAhPSBudWxsKSBlbmQgPSBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUobmV3IERhdGUodmFsdWUub2REby5lbmQpKS5mb3JtYXQoJ0RELk1NLllZWVknKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW5kICE9IHVuZGVmaW5lZCB8fCBzdGFydCAhPSB1bmRlZmluZWQgPyAoc3RhcnQgKyBcIiAtIFwiICsgZW5kKSAvKisgXCIgIChcIiArICh2YWx1ZS5vZERvLmVuZCA9PT0gdmFsdWUub2REby5zdGFydCA/IFwiMCBsZXRcIiA6IEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShbdmFsdWUub2REby5lbmRdKS5mcm9tKEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kYXRldGltZShbdmFsdWUub2REby5zdGFydF0pLHRydWUpKStcIilcIiovIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBcImlubGluZWltbWVkaWF0ZVwiLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIMO6xI1pbm5vc3RpXCIpLmFkZEZpZWxkKFwiZ2Zvcm1ib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdWNpbm5vc3RcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRhdF91Y2lubm9zdD12YWx1ZS5vZERvXCIsXHJcbiAgICAgICAgICAgICAgICBmb3JtOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIEwtMC0xMi0wIE0tMC0xMi0wIFMtMC0xMi0wXCJcclxuICAgICAgICAgICAgICAgICAgICB9KS5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhJbk1vZGVsOiBcIm9kRG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdWNpbm5vc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApKSxcclxuXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydCwgZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5vZERvLnN0YXJ0ICE9IG51bGwpIHN0YXJ0ID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKG5ldyBEYXRlKHZhbHVlLm9kRG8uc3RhcnQpKS5mb3JtYXQoJ0RELk1NLllZWVknKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUub2REby5lbmQgIT0gbnVsbCkgZW5kID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRhdGV0aW1lKG5ldyBEYXRlKHZhbHVlLm9kRG8uZW5kKSkuZm9ybWF0KCdERC5NTS5ZWVlZJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVuZCAhPSB1bmRlZmluZWQgfHwgc3RhcnQgIT0gdW5kZWZpbmVkID8gKHN0YXJ0ICsgXCIgLSBcIiArIGVuZCkgLyorIFwiICAoXCIgKyAodmFsdWUub2REby5lbmQgPT09IHZhbHVlLm9kRG8uc3RhcnQgPyBcIjAgbGV0XCIgOiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUoW3ZhbHVlLm9kRG8uZW5kXSkuZnJvbShHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZGF0ZXRpbWUoW3ZhbHVlLm9kRG8uc3RhcnRdKSx0cnVlKSkrXCIpXCIqLyA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbW9kZTogXCJpbmxpbmVpbW1lZGlhdGVcIixcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDcxXCIpIC8vUkMgMzM1MDA0NzEgOiBQxZnDrXpuYWsgcMWZZcSNdGVuw61cclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfdmlld1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucHJpel92aWV3ID0gdmFsdWUudlwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgcHJpel92aWV3OiBcImpyZXM6MzM1MDA0NzJcIiwgdjogMTAsIH0sIC8vUkMgMzM1MDA0NzIgOiBuZXDFmWXEjXRlbm9cclxuICAgICAgICAgICAgICAgICAgICB7IHByaXpfdmlldzogXCJqcmVzOjMzNTAwNDczXCIsIHY6IDAsIH0sIC8vUkMgMzM1MDA0NzMgOiBwxZllxI10ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgeyBwcml6X3ZpZXc6IFwianJlczozMzUwMDQ3NFwiLCB2OiAtMSwgfSAvL1JDIDMzNTAwNDc0IDogbmV1csSNZW5vXHJcbiAgICAgICAgICAgICAgICBdLCAvLyBtb3puYSBidWRlIGxlcHNpIHByZWRlbGF0IG5hIG5ldyBHb3JkaWMuRGF0YS5WaWV3XHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3ByaXpfdmlld31cIixcclxuICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInByaXpfdmlld1wiXSxcclxuICAgICAgICAgICAgICAgIHZlcmlmeTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpIGFzIGFueVtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnYgPT09IHZhbHVlLnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NzVcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwgeyAvL1JDIDMzNTAwNDc1IDogUG9waXNcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnBvcGlzXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NzZcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwgeyAvL1JDIDMzNTAwNDc2IDogw5pwbG7DvSBuw6F6ZXZcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfc21sXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5uYXpldlwiXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzM1MDA0NzdcIikgLy9SQyAzMzUwMDQ3NyA6IFDFmcOtcGFkXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDc4XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyhFa28uRmlsdGVycy5nZXRTdHJpbmdPcGVyYXRvcnMoKSksIHsgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhwX3NtbF9wcmksIG1vZGVsOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHBfc21sX3ByaSB9KSAvL1JDIDMzNTAwNDc4IDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0NzlcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKEVrby5GaWx0ZXJzLmdldFN0cmluZ09wZXJhdG9ycygpKSwgeyBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY19zbWxfcHJpIH0pIC8vUkMgMzM1MDA0NzkgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ4MFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoRWtvLkZpbHRlcnMuZ2V0U3RyaW5nT3BlcmF0b3JzKCkpLCB7IC8vUkMgMzM1MDA0ODAgOiBBZ2VuZG92w6kgxI3DrXNsbyBWWixEVCwgUE9cclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjX3Zlcl96YWssIG1vZGVsOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY192ZXJfemFrXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJBZ2VuZG92w6kgxI3DrXNsbyBuYWTFmWF6ZW7DqWhvIHDFmcOtcGFkdVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoRWtvLkZpbHRlcnMuZ2V0U3RyaW5nT3BlcmF0b3JzKCkpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjX3NtbF9uYWRcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmFjX3NtbF9uYWRcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ4MVwiKSAvL1JDIDMzNTAwNDgxIDogU3RhdiBldmlkZW5jZVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9ldmlcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfZXZpID0gdmFsdWUudmFsdVwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgc3Rhdl9ldmk6IFwianJlczozMzUwMDQ4MlwiLCB2YWx1OiBJbnRlcmZhY2UuU3RhdkV2aWRLbmloYS5uZ19zdGF2ZXZpRXZpZG92YW5lLCB9LCAvL1JDIDMzNTAwNDgyIDogRXZpZG92YW7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3Rhdl9ldmk6IFwianJlczozMzUwMDQ4M1wiLCB2YWx1OiBJbnRlcmZhY2UuU3RhdkV2aWRLbmloYS5uZ19zdGF2ZXZpTmVldmlkb3ZhbmUsIH0sIC8vUkMgMzM1MDA0ODMgOiBOZWV2aWRvdmFuw6lcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXZfZXZpOiBcImpyZXM6MzM1MDA0ODRcIiwgdmFsdTogSW50ZXJmYWNlLlN0YXZFdmlkS25paGEubmdfc3RhdmV2aUFrdHVhbEV2aWRvdmFuZSwgfSwgLy9SQyAzMzUwMDQ4NCA6IEFrdHXDoWxuxJsgZXZpZG92YW7DqVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3Rhdl9ldmk6IFwianJlczozMzUwMDQ4NVwiLCB2YWx1OiBJbnRlcmZhY2UuU3RhdkV2aWRLbmloYS5uZ19zdGF2ZXZpUHJlZXZpZG92YW5lWiwgfSwgLy9SQyAzMzUwMDQ4NSA6IFDFmWVldmlkb3ZhbsOpIHpcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXZfZXZpOiBcImpyZXM6MzM1MDA0ODZcIiwgdmFsdTogSW50ZXJmYWNlLlN0YXZFdmlkS25paGEubmdfc3RhdmV2aVByZWV2aWRvdmFuZURvLCB9LCAvL1JDIDMzNTAwNDg2IDogUMWZZWV2aWRvdmFuw6kgZG9cclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXZfZXZpOiBcImpyZXM6MzM1MDA0ODdcIiwgdmFsdTogSW50ZXJmYWNlLlN0YXZFdmlkS25paGEubmdfc3RhdmV2aVB1dm9kbmksIH0sIC8vUkMgMzM1MDA0ODcgOiBQxa92b2Ruw61cclxuICAgICAgICAgICAgICAgIF0sIHsga2V5OiBcInZhbHVcIiB9KSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7c3Rhdl9ldml9XCIsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJzdGF2X2V2aVwiXSxcclxuICAgICAgICAgICAgICAgIGhlbHBlckl0ZW1UZW1wbGF0ZTogXCJ7c3Rhdl9ldmk6dHJpbTplbmNvZGV9XCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0ODhcIikgLy9SQyAzMzUwMDQ4OCA6IFN0YXYgZG9rbGFkdVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic21sX3N0YXZcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNtbF9zdGF2ID0gdmFsdWUuc21sX3N0YXZcIixcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IFN0YXZEb2tsYWR1RmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntzbWxfc3Rhdl90eHR9XCIsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJzbWxfc3Rhdl90eHRcIl0sXHJcbiAgICAgICAgICAgICAgICBoZWxwZXJJdGVtVGVtcGxhdGU6IFwie3NtbF9zdGF2X3R4dDp0cmltOmVuY29kZX1cIlxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA0ODlcIikgLy9SQyAzMzUwMDQ4OSA6IFN0YXYgcG9kcGlzdVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2duX3N0YXZcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNnbl9zdGF2ID0gdmFsdWUuc2duX3N0YXZcIixcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IFN0YXZQb2RwaXN1RmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntzZ25fc3Rhdl90eHR9XCIsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJzZ25fc3Rhdl90eHRcIl0sXHJcbiAgICAgICAgICAgICAgICBoZWxwZXJJdGVtVGVtcGxhdGU6IFwie3Nnbl9zdGF2X3R4dDp0cmltOmVuY29kZX1cIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiUmVhbGl6w6F0b3JcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3JlYSgpLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBuYW1lOiBcImNpc19yZWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuY2lzX3JlYWw9dmFsdWUuY2lzX3JlYWw7bW9kZWwuaWNvPXZhbHVlLmljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8va3bFr2xpIHBvdsO9xaFlbsOtIFRTIC0gc3Rlam7EmyBuYSB2eW1hesOhbsOtIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICAvL2Rpc2FibGVkOiAhZGF0YUZpbHRlci5jaXNfcmVhbF9lZGl0ID8/IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiB7IGNpc19yZWFsOiBkYXRhRmlsdGVyLmNpc19yZWFsLCBpY286IGRhdGFGaWx0ZXIuaWNvIH1cclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogZGF0YUZpbHRlci5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIktvbXBldGVudFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29za29tKCksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX3Z5cml6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvPXZhbHVlLmljbzsgbW9kZWwuaXhzX2Z1bl92eXJpeiA9IHZhbHVlLml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAuYWRkUm93KFwiVnnFmWl6dWrDrWPDrSByZWZlcmVudFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZnVuKCksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX3JlZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW5fcmVmPXZhbHVlLml4c19mdW5cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJPcmdhbml6YcSNbsOtIGplZG5vdGthXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNvcmooKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19vcmpcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfb3JqPXZhbHVlLml4c19vcmpcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlphc3R1cHVqw61jw61cIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QuU21sWmFzdG91cGVuYU9zb2JhKCksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfb3JqXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiUG9zbGVkbsOtY2hcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJudW1fcm93XCIgfSlcclxuXHJcbiAgICAgICAgLy8uYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbChcclxuICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgLy8gICAgICAgIHR5cGU6IFwic3RyaW5nXCJcclxuICAgICAgICAvLyAgICAgICAgLCBsYWJlbDogXCJBZ2VuZG92w6kgxI3DrXNsb1wiXHJcbiAgICAgICAgLy8gICAgICAgICwgbmFtZTogXCJhY19zbWxcIlxyXG4gICAgICAgIC8vICAgICAgICAsIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmFjX3NtbFwiXHJcbiAgICAgICAgLy8gICAgfSkpXHJcbiAgICAgICAgLy8uYWRkUm93KFwiVHlwIHNtbG91dnlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsXHJcblxyXG4gICAgICAgIC8vICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zbWxUeXBEb2tsYWR1KClcclxuICAgICAgICAvLyAgICAsIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC8vZHJvcGRvd246IHRydWVcclxuICAgICAgICAvLyAgICAgICAgbmFtZTogXCJpeHNfdHlwXCJcclxuICAgICAgICAvLyAgICAgICAgLCBtdWpLdEdkZW46IHRoaXMua3RnX2RlblxyXG4gICAgICAgIC8vICAgICAgICAsIHNlcnZlckZpbHRlcnM6XHJcbiAgICAgICAgLy8gICAgICAgIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL2RhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIHJldHVybiB0aGF0LnNydi5jYWxsKFwiSW5pdExpc3RTZXpuYW1cIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvL30sXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy8gdGhhdC5zcnYuY2FsbChcIkluaXRMaXN0U2V6bmFtXCIpLmRvbmUoZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vICAgdGhhdC5wcm9wZXJ0aWVzID0gcHJvcDtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vfSksXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy9rdGdfZGVuOiBmdW5jdGlvbiAoZXYsIG9iaikgeyByZXR1cm4gOyB9LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgLy9rdGdfZGVuOiBmdW5jdGlvbiAoZXYsIG9iaikgeyByZXR1cm4gdGhhdC5zcnYuc2VydmVyQ29udGV4dC5rdGdfZGVuOyB9LFxyXG4gICAgICAgIC8vICAgICAgICAgICAga3RnX2RlbjogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdmFyIGEgPSAoJCh0aGlzKSBhcyBhbnkpLmdmaWVsZChcIm9wdGlvblwiLCBcIm11akt0R2RlblwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgaXhwX2RlbjogdGhpcy5peHBLbmloYSwgLy8gZnVuY3Rpb24oZXYsIG9iaikgeyByZXR1cm4gdGhhdC5zcnYuc2VydmVyQ29udGV4dC5peHBfZGVuOyB9XHJcblxyXG4gICAgICAgIC8vICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICAgICAsIG1vZGVsRGVmYXVsdHM6IHsga3RnX2RlbjogdGhpcy5rdGdfZGVuIH1cclxuICAgICAgICAvLyAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5peHNfdHlwPXZhbHVlLml4c190eXA7IG1vZGVsLmt0Z190eXA8PXZhbHVlLmt0Z190eXBcIlxyXG4gICAgICAgIC8vICAgIH0gYXMgYW55KVxyXG5cclxuICAgICAgICAvLy5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgIC8vICAgIHtcclxuICAgICAgICAvLyAgICAgICAgdHlwZTogXCJyb2tcIlxyXG4gICAgICAgIC8vICAgICAgICAsIGxhYmVsOiBcIkZpbmFuY292w6Fuw60gb2RcIlxyXG4gICAgICAgIC8vICAgICAgICAsIG5hbWU6IFwiZmluX29kXCJcclxuICAgICAgICAvLyAgICAgICAgLCBwYXRoSW5Nb2RlbDogXCJtb2RlbC5maW5fb2RcIlxyXG4gICAgICAgIC8vICAgIH0pKVxyXG5cclxuICAgICAgICAvLy5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgIC8vICAgIHtcclxuICAgICAgICAvLyAgICAgICAgdHlwZTogXCJyb2tcIlxyXG4gICAgICAgIC8vICAgICAgICAsIGxhYmVsOiBcIkZpbmFuY292w6Fuw60gZG9cIlxyXG4gICAgICAgIC8vICAgICAgICAsIG5hbWU6IFwiZmluX2RvXCJcclxuICAgICAgICAvLyAgICAgICAgLCBwYXRoSW5Nb2RlbDogXCJtb2RlbC5maW5fZG9cIlxyXG4gICAgICAgIC8vICAgIH0pKVxyXG5cclxuICAgICAgICAvLy5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgIC8vICAgIHtcclxuICAgICAgICAvLyAgICAgICAgdHlwZTogXCJkYXRlXCJcclxuICAgICAgICAvLyAgICAgICAgLCBsYWJlbDogXCJEYXR1bSBldmlkZW5jZVwiXHJcbiAgICAgICAgLy8gICAgICAgICwgbmFtZTogXCJkYXRfcHJpal9wb2RcIlxyXG4gICAgICAgIC8vICAgICAgICAsIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmRhdF9wcmlqX3BvZFwiXHJcblxyXG4gICAgICAgIC8vICAgIH0pKVxyXG4gICAgICAgIC8vLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICB0eXBlOiBcImRhdGVcIlxyXG4gICAgICAgIC8vICAgICAgICAsIGxhYmVsOiBcIkRhdHVtIHV6YXbFmWVuw61cIlxyXG4gICAgICAgIC8vICAgICAgICAsIG5hbWU6IFwiZGF0X3V6YXZcIlxyXG4gICAgICAgIC8vICAgICAgICAsIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmRhdF91emF2XCJcclxuICAgICAgICAvLyAgICB9KSlcclxuICAgICAgICAvLy5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgIC8vICAgIHtcclxuICAgICAgICAvLyAgICAgICAgdHlwZTogXCJkYXRlXCJcclxuICAgICAgICAvLyAgICAgICAgLCBsYWJlbDogXCJEYXR1bSB1a29uxI1lbsOtIHBsYXRub3N0aVwiXHJcbiAgICAgICAgLy8gICAgICAgICwgbmFtZTogXCJkYXRfcGxhdG5vc3RcIlxyXG4gICAgICAgIC8vICAgICAgICAsIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmRhdF9wbGF0bm9zdFwiXHJcbiAgICAgICAgLy8gICAgfSkpXHJcbiAgICAgICAgLy8uYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbChcclxuICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgLy8gICAgICAgIHR5cGU6IFwiZGF0ZVwiXHJcbiAgICAgICAgLy8gICAgICAgICwgbGFiZWw6IFwiRGF0dW0gcG9kcGlzdVwiXHJcbiAgICAgICAgLy8gICAgICAgICwgbmFtZTogXCJkYXRfc2duXCJcclxuICAgICAgICAvLyAgICAgICAgLCBwYXRoSW5Nb2RlbDogXCJtb2RlbC5kYXRfc2duXCJcclxuICAgICAgICAvLyAgICB9KSlcclxuICAgICAgICAvLy5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKFxyXG4gICAgICAgIC8vICAgIHtcclxuICAgICAgICAvLyAgICAgICAgdHlwZTogXCJkYXRlXCJcclxuICAgICAgICAvLyAgICAgICAgLCBsYWJlbDogXCJEYXR1bSBwb2RwaXN1IHByb3Rpc3RyYW55XCJcclxuICAgICAgICAvLyAgICAgICAgLCBuYW1lOiBcImRhdF9zZ25fZXh0XCJcclxuICAgICAgICAvLyAgICAgICAgLCBwYXRoSW5Nb2RlbDogXCJtb2RlbC5kYXRfc2duX2V4dFwiXHJcbiAgICAgICAgLy8gICAgfSkpXHJcbiAgICAgICAgLy8uYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbChcclxuICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgLy8gICAgICAgIHR5cGU6IFwiZGF0ZVwiXHJcbiAgICAgICAgLy8gICAgICAgICwgbGFiZWw6IFwiRGF0dW0gw7rEjWlubm9zdGlcIlxyXG4gICAgICAgIC8vICAgICAgICAsIG5hbWU6IFwiZGF0X3VjaW5ub3N0XCJcclxuICAgICAgICAvLyAgICAgICAgLCBwYXRoSW5Nb2RlbDogXCJtb2RlbC5kYXRfdWNpbm5vc3RcIlxyXG4gICAgICAgIC8vICAgIH0pKVxyXG5cclxuICAgICAgICAvLy5hZGRSb3coXCJQxZnDrXpuYWsgcMWZZcSNdGVuw61cIilcclxuICAgICAgICAvLy5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgIC8vICAgIG5hbWU6IFwicHJpel92aWV3XCIsXHJcbiAgICAgICAgLy8gICAgbW9kZWw6IFwibW9kZWwucHJpel92aWV3ID0gdmFsdWUudlwiLFxyXG4gICAgICAgIC8vICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgIC8vICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgLy8gICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgIC8vICAgIGRhdGE6IFtcclxuICAgICAgICAvLyAgICAgICAgeyBwcml6X3ZpZXc6IFwibmVwxZllxI10ZW5vXCIsIHY6IDEwLCB9LFxyXG4gICAgICAgIC8vICAgICAgICB7IHByaXpfdmlldzogXCJwxZllxI10ZW5vXCIsIHY6IDAsIH0sXHJcbiAgICAgICAgLy8gICAgICAgIHsgcHJpel92aWV3OiBcIm5ldXLEjWVub1wiLCB2OiAtMSwgfVxyXG4gICAgICAgIC8vICAgIF0sIC8vIG1vem5hIGJ1ZGUgbGVwc2kgcHJlZGVsYXQgbmEgbmV3IEdvcmRpYy5EYXRhLlZpZXdcclxuICAgICAgICAvLyAgICBpdGVtVGVtcGxhdGU6IFwie3ByaXpfdmlld31cIixcclxuICAgICAgICAvLyAgICBoZWxwZXJDb2x1bW5zOiBbXCJwcml6X3ZpZXdcIl0sXHJcbiAgICAgICAgLy8gICAgdmVyaWZ5OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpIGFzIGFueVtdXHJcbiAgICAgICAgLy8gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKGRhdGFbaV0udiA9PT0gdmFsdWUudikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAvLyAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy99KVxyXG5cclxuICAgICAgICAvLy8vIFRPRE8gLmFkZFJvdyhcIlBvc2xlZG7DrWNoXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7IG5hbWU6IFwibnVtX3Jvd1wiIH0pXHJcblxyXG4gICAgICAgIC8vLmFkZFJvdyhcIlN0YXYgaW5zb2x2ZW5jZVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAvLyAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY2lzcigpLFxyXG4gICAgICAgIC8vICAgIHtcclxuICAgICAgICAvLyAgICAgICAgbmFtZTogXCJkcnVoX3N0YXZfcml6ZW5pXCJcclxuICAgICAgICAvLyAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5kcnVoX3N0YXZfcml6ZW5pID0gdmFsdWUuZHJ1aF9zdGF2X3JpemVuaSBcIlxyXG4gICAgICAgIC8vICAgICAgICAvLyxtdWx0aTogdHJ1ZVxyXG4gICAgICAgIC8vICAgIH0pXHJcblxyXG4gICAgICAgIC8vLmFkZFJvdyhcIlR5cCBvcmdhbml6YWNlXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgIC8vICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jdHlvKCksXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICBuYW1lOiBcInR5cF9vcmdcIlxyXG4gICAgICAgIC8vICAgICAgICAsIG1vZGVsOiBcIm1vZGVsLnR5cF9vcmcgPSB2YWx1ZS50eXBfb3JnXCJcclxuICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgIC8vLmFkZFJvdyhcIknEjW8gcHJvdGlzdHJhbnlcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAvLyAgICBuYW1lOiBcImljb19lc3VcIlxyXG4gICAgICAgIC8vICAgICwgbW9kZWw6IFwibW9kZWwuaWNvX2VzdVwiXHJcbiAgICAgICAgLy99KVxyXG5cclxuICAgICAgICAvLy8vLmFkZFJvdygpXHJcbiAgICAgICAgLy8vLyBUT0RPOiBrbGljb3ZhIHNsb3ZhXHJcbiAgICAgICAgLy8vLy5hZGRSb3coXCJJxIxPIHByb3Rpc3RyYW55XCIpLmFkZEZpZWxkKFxyXG4gICAgICAgIC8vLy8gICAgXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgLy8vLyAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2VzdSgpLFxyXG4gICAgICAgIC8vLy8gICAge1xyXG4gICAgICAgIC8vLy8gICAgICAgIG5hbWU6IFwiaXhzX2VzdVwiLFxyXG4gICAgICAgIC8vLy8gICAgICAgIG1vZGVsOiBcIm1vZGVsLmljb19lc3U9dmFsdWUuaXhzX2VzdVwiXHJcbiAgICAgICAgLy8vLyAgICB9KVxyXG5cclxuICAgICAgICAvLy5hZGRTZWN0aW9uKClcclxuICAgICAgICAvLy5hZGRSb3coXCLEjMOtc2xvIFZaLERULFBPXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgIC8vICAgIHtcclxuICAgICAgICAvLyAgICAgICAgbmFtZTogXCJhY192ZXJfemFrXCJcclxuICAgICAgICAvLyAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5hY192ZXJfemFrXCJcclxuICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgIC8vLy9UT0RPIFN0YXYgZXZpZGVuY2VcclxuICAgICAgICAvLy5hZGRSb3coXCJTdGF2IGRva2xhZHVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCJcclxuICAgICAgICAvLyAgICAsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zbWxjc3RhKClcclxuICAgICAgICAvLyAgICAsIHtcclxuICAgICAgICAvLyAgICAgICAgZHJvcGRvd246IHRydWVcclxuICAgICAgICAvLyAgICAgICAgLCBuYW1lOiBcInNtbF9zdGF2XCJcclxuICAgICAgICAvLyAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5zbWxfc3RhdiA9IHZhbHVlLnNtbF9zdGF2XCJcclxuICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgIC8vLmFkZFJvdyhcIlN0YXYgcG9kcGlzdVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIlxyXG4gICAgICAgIC8vICAgICwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbGNzdHMoKVxyXG4gICAgICAgIC8vICAgICwge1xyXG4gICAgICAgIC8vICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgIC8vICAgICAgICAsIG5hbWU6IFwic2duX3N0YXZcIlxyXG4gICAgICAgIC8vICAgICAgICAsIG1vZGVsOiBcIm1vZGVsLnNnbl9zdGF2ID0gdmFsdWUuc2duX3N0YXZcIlxyXG4gICAgICAgIC8vICAgIH0pXHJcblxyXG4gICAgICAgIC8vLy8gVE9ETzogLmFkZFJvdyhcIkZpbmFuxI1uw60ga29ucm9sYVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyBuYW1lOiBcIlwiIH0pXHJcblxyXG4gICAgICAgIC8vLmFkZFJvdyhcIsOaxI10b3bDoW7DrSBvIFBaL1BcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAvLyAgICBuYW1lOiBcInByaXpfcHpwXCIsXHJcbiAgICAgICAgLy8gICAgbW9kZWw6IFwibW9kZWwucHJpel9wenAgPSB2YWx1ZS52XCIsXHJcbiAgICAgICAgLy8gICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgLy8gICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAvLyAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgZGF0YTogW1xyXG4gICAgICAgIC8vICAgICAgICB7IHByaXpfcHpwOiBcImFub1wiLCB2OiAxMCwgfSxcclxuICAgICAgICAvLyAgICAgICAgeyBwcml6X3B6cDogXCJuZVwiLCB2OiAwLCB9LFxyXG4gICAgICAgIC8vICAgICAgICB7IHByaXpfcHpwOiBcIm5ldXLEjWVub1wiLCB2OiAtMSwgfVxyXG4gICAgICAgIC8vICAgIF0sXHJcbiAgICAgICAgLy8gICAgaXRlbVRlbXBsYXRlOiBcIntwcml6X3B6cH1cIixcclxuICAgICAgICAvLyAgICBoZWxwZXJDb2x1bW5zOiBbXCJwcml6X3B6cFwiXSxcclxuICAgICAgICAvLyAgICB2ZXJpZnk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICAgICB2YXIgZGF0YSA9ICQodGhpcykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGF0YVwiKSBhcyBhbnlbXVxyXG5cclxuICAgICAgICAvLyAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAoZGF0YVtpXS52ID09PSB2YWx1ZS52KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbaV07XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIC8vICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvL30pXHJcblxyXG4gICAgICAgIC8vLy9UT0RPOi5hZGRSb3coXCJWbGFzdG7DrWtcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgbmFtZTogXCJpeHNfZnVuX2FrdFwiIH0pIGl4c19lc3VfdmxhXHJcblxyXG4gICAgICAgIC8vLy9SZWFkZXJzLlNtbFZsYXN0bmlrID0gZnVuY3Rpb24gKG9wdGlvbnMpIHsgdGhpcy5fYmFzZSh7IHJlYWRlckNsYXNzOiBcIkdvcmRpYy5TbWwuQ2xpZW50LkdSZWFkZXJTbWxWbGFzdG5pa1wiLCBrZXlzOiBbJ2l4c19mdW4nXSwgY29sdW1uczogW1wiaXhzX2Z1blwiLCBcIm5hemV2X3JmXCIsIFwia3RnX2RlblwiXSwgcm93U2l6ZTogMTAwLCByZWFkQWxsOiBmYWxzZSwgcGVybWFuZW50OiBmYWxzZSB9LCBvcHRpb25zKTsgfTtcclxuICAgICAgICAvLy8vUmVhZGVycy5TbWxWbGFzdG5pay5pbmhlcml0c0Zyb20oUmVhZGVycy5CYXNlKTtcclxuICAgICAgICAvLy8vRmllbGRzLnNtbFZsYXN0bmlrID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkYXRhOiBuZXcgUmVhZGVycy5TbWxWbGFzdG5paygpLCBpdGVtVGVtcGxhdGU6IFwie25hemV2X3JmfVwiLCBoZWxwZXJDb2x1bW5zOiBbXCJuYXpldl9yZlwiXSB9OyB9O1xyXG5cclxuXHJcbiAgICAgICAgLy8uYWRkUm93KFwiVmxhc3Ruw61rXCIpXHJcblxyXG4gICAgICAgIC8vLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc21sVmxhc3RuaWsoKVxyXG4gICAgICAgIC8vICAgICwge1xyXG4gICAgICAgIC8vICAgICAgICAvL2Ryb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgLy8gICAgICAgIG5hbWU6IFwidmxhc3RuaWtcIlxyXG4gICAgICAgIC8vICAgICAgICAsIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGl4cF9kZW46IHRoaXMua3RnX2RlblxyXG4gICAgICAgIC8vICAgICAgICAgICAgLCBzdWJyYWRhOiB0aGlzLnN1YnJhZGFcclxuICAgICAgICAvLyAgICAgICAgICAgICwgcmV6aW1LbmloYTogMFxyXG4gICAgICAgIC8vICAgICAgICAgICAgLCByZXppbUhpc3Q6IDFcclxuXHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5peHNfZnVuX2FrdCA9IHZhbHVlLml4c19mdW5fYWt0XCJcclxuICAgICAgICAvLyAgICAgICAgLy8gICAsaXRlbVRlbXBsYXRlOiBcIntuYXpldl9yZjp0cmltOmVuY29kZX1cIlxyXG4gICAgICAgIC8vICAgIH0pIC8vUkMgMjY2MDAyOTEgOiBWbGFzdG7DrWtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8vLy5hZGRSb3coXCJqcmVzOjI2NjAwMjkxXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiXHJcbiAgICAgICAgLy8vLyAgICAsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zbWxWbGFzdG5paygpLFxyXG4gICAgICAgIC8vLy97XHJcbiAgICAgICAgLy8vLyAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgIC8vLy8gICAgLCBuYW1lOiBcInZsYXN0bmlrXCJcclxuXHJcbiAgICAgICAgLy8vLyAgICAsIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAvLy8vICAgICAgICBpeHBfZGVuOiB0aGlzLnBhcmFtLml4cF9kZW5cclxuICAgICAgICAvLy8vICAgICAgIC8vaXhwX2RlbjogZnVuY3Rpb24gKGV2LCBvYmopIHsgcmV0dXJuIHRoYXQubW9kZWwuaXhwX2RlbjsgfVxyXG4gICAgICAgIC8vLy8gIC8vICwgc3VicmFkYTogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwia25paGFcIiwgXCJzdWJyYWRhXCIsIHRydWUpLCByZXppbUtuaWhhOiAwLCByZXppbUhpc3Q6IDFcclxuICAgICAgICAvLy8vICAgICAgICAsIG1vZGVsOiBcIm1vZGVsLml4c19mdW5fYWt0ID0gdmFsdWUuaXhzX2Z1bl9ha3RcIlxyXG4gICAgICAgIC8vLy8gICAgfVxyXG4gICAgICAgIC8vLy99KSAvL1JDIDI2NjAwMjkxIDogVmxhc3Ruw61rXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vLy8uYWRkUm93KFwiWnByYWNvdmF0ZWxcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIC8vcmVmZXJlbnRcclxuICAgICAgICAvLy8ve1xyXG4gICAgICAgIC8vLy8gICAgbmFtZTogXCJpeHNfZnVuX2FrdF90eHRcIixcclxuICAgICAgICAvLy8vICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW5fYWt0X3R4dCA9IHZhbHVlLmNpc19yZWFsOyBpeHNfZnVuX2FrdF90eHQgPSBuYXpldlwiXHJcbiAgICAgICAgLy8vL30pXHJcbiAgICAgICAgLy8uYWRkUm93KFwiUmVhbGl6w6F0b3JcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgLy8gICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NyZWEoKSxcclxuICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgLy8gICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgLy8gICAgICAgICwgbmFtZTogXCJjaXNfcmVhbFwiLFxyXG4gICAgICAgIC8vICAgICAgICBtb2RlbDogXCJpY289aWNvOyBtb2RlbC5jaXNfcmVhbCA9IHZhbHVlLmNpc19yZWFsOyBjaXNfcmVhbF90eHQ9bmF6ZXZcIlxyXG4gICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy8uYWRkUm93KFwiS29tcGV0ZW50XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgIC8vICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29za29tKCksXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgbmFtZTogXCJpeHNfZnVuX3Z5cml6XCIsXHJcbiAgICAgICAgLy8gICAgICAgIG1vZGVsOiBcImljbz1pY287IG1vZGVsLml4c19mdW5fdnlyaXogPSB2YWx1ZS5peHNfZnVuOyBpeHNfZnVuX3Z5cml6X3R4dD1uYXpldl9yZWYgXCJcclxuICAgICAgICAvLyAgICB9KVxyXG5cclxuICAgICAgICAvLy5hZGRSb3coXCJWecWZaXp1asOtY8OtIHJlZmVyZW50XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgIC8vICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZnVuKCksXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgbmFtZTogXCJpeHNfZnVuX3JlZlwiLFxyXG4gICAgICAgIC8vICAgICAgICBtb2RlbDogXCJpeHNfZnVuX3JlZj1peHNfZnVuOyBpeHNfZnVuX3JlZl90eHQ9bmF6ZXZfcmVmXCJcclxuICAgICAgICAvLyAgICB9KVxyXG5cclxuICAgICAgICAvLy5hZGRSb3coXCJPcmdhbml6YcSNbsOtIGplZG5vdGthXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgIC8vICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zb3JqKCksXHJcbiAgICAgICAgLy8gICAge1xyXG4gICAgICAgIC8vICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgbmFtZTogXCJpeHNfb3JqXCIsXHJcbiAgICAgICAgLy8gICAgICAgIG1vZGVsOiBcIml4c19vcmo9aXhzX29yalwiXHJcbiAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAvLy5hZGRSb3coXCJQb3Bpc1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBvcGlzX3BpZFwiLCBtb2RlbDogXCJtb2RlbC5wb3Bpc19waWRcIiB9KVxyXG4gICAgICAgIC8vLmFkZFJvdyhcIsOacGxuw70gbsOhemV2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwibmF6ZXZfc21sXCIsIG1vZGVsOiBcIm1vZGVsLm5hemV2X3NtbFwiIH0pXHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZmlsdGVyRm9ybURlZjtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZmlsdGVyRmluYW5jbmlVZGFqZShwcml6X2lpc3NwX3A6IG51bWJlcikge1xyXG5cclxuICAgICAgICAvLyNyZWdpb24gZmlsdGVyRmluYW5jbmlVZGFqZVxyXG4gICAgICAgIGxldCBmaWx0ZXJGaW5hbmNuaVVkYWplID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIiwgdGFiTGFiZWw6IFwiRmluYW7EjW7DrSDDumRhamVcIiB9KVxyXG5cclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIikgLy9SQyAyNjYwMDAwMiA6IFDFmcOtcGFkXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM1MDA0OTBcIiwgLy9SQyAzMzUwMDQ5MCA6IENlbmEgZG9rbGFkdSB2IG3Em27Em1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX21lbmFfZG9jXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgcGF0aEluTW9kZWw6IFwibW9kZWwuY19tZW5hX2RvY1wiLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM1MDA0OTFcIiwgLy9SQyAzMzUwMDQ5MSA6IENlbGtvdsOhIMSNw6FzdGthIHYgbcSbbsSbXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfbWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcclxuICAgICAgICAgICAgICAgIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmNfbWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM1MDA0OTJcIiwgLy9SQyAzMzUwMDQ5MiA6IFJvenBpcyDEjcOhc3RreSB2IENaS1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgcGF0aEluTW9kZWw6IFwibW9kZWwuY1wiLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgfSkpXHJcblxyXG4gICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcblxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDQ5M1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbGN0eWMoKSwgeyBuYW1lOiBcInR5cF9jZW55XCIsIG1vZGVsOiBcIm1vZGVsLnR5cF9jZW55ID0gdmFsdWUudHlwX2NlbnlcIiB9KSAvL1JDIDMzNTAwNDkzIDogVHlwIGNlbnlcclxuXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNDk0XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IC8vUkMgMzM1MDA0OTQgOiBTdGF2IHJlemVydmFjZVxyXG5cclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9yZXpcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcInN0YXZfcmV6ID0gdmFsdWUudlwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYURva2xhZHUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5TZXRFbmFibGVPaygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXZfcmV6ZXJ2YWNlOiBcImpyZXM6MzM1MDA0OTVcIiwgdjogLTEsIH0sIC8vUkMgMzM1MDA0OTUgOiBOZXVyxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXZfcmV6ZXJ2YWNlOiBcImpyZXM6MzM1MDA0OTZcIiwgdjogMCwgfSwgLy9SQyAzMzUwMDQ5NiA6IMW9w6FkbsOhIHJlemVydmFjZVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3Rhdl9yZXplcnZhY2U6IFwianJlczozMzUwMDQ5N1wiLCB2OiAxLCB9LCAvL1JDIDMzNTAwNDk3IDogxIzDoXN0ZcSNbsOhIHJlemVydmFjZVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3Rhdl9yZXplcnZhY2U6IFwianJlczozMzUwMDQ5OFwiLCB2OiAyLCB9IC8vUkMgMzM1MDA0OTggOiDDmnBsbsOhIHJlemVydmFjZVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7c3Rhdl9yZXplcnZhY2V9XCIsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJzdGF2X3JlemVydmFjZVwiXSxcclxuICAgICAgICAgICAgICAgIHZlcmlmeTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpIGFzIGFueVtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnYgPT09IHZhbHVlLnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIGlmIChwcml6X2lpc3NwX3AgIT0gMCkgeyAvLyBDb250ZW50VmFsdWVzLkFkZE9iamVjdChcInByaXpfaWlzc3BcIiwgVXNlclByb2Nlc3MuRWtvUGFyYW1zLlByaXpJaXNzcCk7XHJcbiAgICAgICAgICAgIGZpbHRlckZpbmFuY25pVWRhamUuYWRkUm93KFwiU3RhdiByZXplcnZhY2UgU1BcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9yZXpfaWlzc3BcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcInN0YXZfcmV6X2lpc3NwID0gdmFsdWUudlwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYURva2xhZHUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5TZXRFbmFibGVPaygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXZfcmV6ZXJ2YWNlX2lpc3NwOiBcImpyZXM6MzM1MDA0OTlcIiwgdjogLTEsIH0sIC8vUkMgMzM1MDA0OTkgOiBOZXVyxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXZfcmV6ZXJ2YWNlX2lpc3NwOiBcImpyZXM6MzM1MDA1MDBcIiwgdjogMCwgfSwgLy9SQyAzMzUwMDUwMCA6IFDFmWlwcmF2ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2X3JlemVydmFjZV9paXNzcDogXCJqcmVzOjMzNTAwNTAxXCIsIHY6IDEwLCB9LCAvL1JDIDMzNTAwNTAxIDogT2Rlc2zDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2X3JlemVydmFjZV9paXNzcDogXCJqcmVzOjMzNTAwNTAyXCIsIHY6IDIwLCB9LCAvL1JDIDMzNTAwNTAyIDogU2NodsOhbGVub1xyXG4gICAgICAgICAgICAgICAgICAgIHsgc3Rhdl9yZXplcnZhY2VfaWlzc3A6IFwianJlczozMzUwMDUwM1wiLCB2OiAzMCwgfSwgLy9SQyAzMzUwMDUwMyA6IFNjaHbDoWxlbm8gcyB2w71ocmFkb3VcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXZfcmV6ZXJ2YWNlX2lpc3NwOiBcImpyZXM6MzM1MDA1MDRcIiwgdjogMjMsIH0sIC8vUkMgMzM1MDA1MDQgOiBTY2h2w6FsZW5vICsgc2NodsOhbGVubyBzIHbDvWhyYWRvdVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3Rhdl9yZXplcnZhY2VfaWlzc3A6IFwianJlczozMzUwMDUwNVwiLCB2OiA0MCwgfSAvL1JDIDMzNTAwNTA1IDogWmFtw610bnV0b1xyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7c3Rhdl9yZXplcnZhY2VfaWlzc3B9XCIsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJzdGF2X3JlemVydmFjZV9paXNzcFwiXSxcclxuICAgICAgICAgICAgICAgIHZlcmlmeTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpIGFzIGFueVtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnYgPT09IHZhbHVlLnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA1MDZcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfaGRyX3Jpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpZF9oZHJfcmlzXCJcclxuICAgICAgICAgICAgICAgICAgICB9KTsgLy9SQyAzMzUwMDUwNiA6IElEIElJU1NQXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZpbHRlckZpbmFuY25pVWRhamU7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZmlsdGVyT3N0YXRuaVVkYWplKCkge1xyXG4gICAgICAgIC8vLS0tLS0tb3N0YXRuaVxyXG4gICAgICAgIHZhciBmaWx0ZXJPc3RhdG5pVWRhamUgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLCB0YWJMYWJlbDogXCJPc3RhdG7DrSDDumRhamVcIlxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDUwN1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDMzNTAwNTA3IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHsgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDUwOFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImFjX2Rva18xXCIsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHsgfSB9KSAvL1JDIDMzNTAwNTA4IDogU291dmlzZWrDrWPDrSBkb2t1bWVudFxyXG4gICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMzNTAwNTExXCIsIC8vUkMgMzM1MDA1MTEgOiBEYXR1bVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZG9rXzFcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgcGF0aEluTW9kZWw6IFwibW9kZWwuZGF0X2Rva18xXCIsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA1MDlcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJhY19kb2tfMlwiIH0pIC8vUkMgMzM1MDA1MDkgOiBTb3V2aXNlasOtY8OtIGRva3VtZW50XHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM1MDA1MTBcIiwgLy9SQyAzMzUwMDUxMCA6IERhdHVtXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb2tfMlwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICBwYXRoSW5Nb2RlbDogXCJtb2RlbC5kYXRfZG9rXzJcIixcclxuICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDUxMlwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbGN6dWsoKSwgeyAvL1JDIDMzNTAwNTEyIDogWnDFr3NvYiB1a29uxI1lbsOtIHNtbG91dnlcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3p1a1wiLCBtb2RlbDogXCJtb2RlbC5peHNfenVrID0gdmFsdWUuaXhzX3p1a1wiLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7IH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFByZWZhYihHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMzUwMDUxM1wiLCAvL1JDIDMzNTAwNTEzIDogRGF0dW0gdWtvbsSNZW7DrVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdWtvXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImRhdGVcIixcclxuICAgICAgICAgICAgICAgIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmRhdF91a29cIixcclxuICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzM1MDA1MTRcIikgLy9SQyAzMzUwMDUxNCA6IFZhemJ5IGRva2xhZMWvIFNNTFxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDUxNVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDMzNTAwNTE1IDogVmF6YmEgZG9rbGFkdSBuYSBwxZnDrXBhZCBCTEtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic21sX2Jsa1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwic21sX2JsayA9IHZhbHVlLnZcIixcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFEb2tsYWR1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuU2V0RW5hYmxlT2soKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1MTZcIiwgdjogMTAsIH0sIC8vUkMgMzM1MDA1MTYgOiBFeGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdjogXCJqcmVzOjMzNTAwNTE3XCIsIHY6IDIwLCB9LCAvL1JDIDMzNTAwNTE3IDogTmVleGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdjogXCJqcmVzOjMzNTAwNTE4XCIsIHY6IDAsIH0sIC8vUkMgMzM1MDA1MTggOiBOZXVyxI1lbm9cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3N0YXZ9XCIsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJzdGF2XCJdLFxyXG5cclxuICAgICAgICAgICAgICAgIHZlcmlmeTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpIGFzIGFueVtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnYgPT09IHZhbHVlLnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA1MjBcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMzUwMDUyMCA6IFZhemJhIGRva2xhZHUgbmEgbmFkxZlhemVub3Ugc21sb3V2dVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbWxfbmFkX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwic21sX25hZF9zbWwgPSB2YWx1ZS52XCIsXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hRG9rbGFkdSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LlNldEVuYWJsZU9rKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdjogXCJqcmVzOjMzNTAwNTIxXCIsIHY6IDEwLCB9LCAvL1JDIDMzNTAwNTIxIDogRXhpc3R1amVcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXY6IFwianJlczozMzUwMDUyMlwiLCB2OiAyMCwgfSwgLy9SQyAzMzUwMDUyMiA6IE5lZXhpc3R1amVcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXY6IFwianJlczozMzUwMDUyM1wiLCB2OiAwLCB9IC8vUkMgMzM1MDA1MjMgOiBOZXVyxI1lbm9cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3N0YXZ9XCIsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJzdGF2XCJdLFxyXG4gICAgICAgICAgICAgICAgdmVyaWZ5OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSAkKHRoaXMpLmdmaWVsZChcIm9wdGlvblwiLCBcImRhdGFcIikgYXMgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnYgPT09IHZhbHVlLnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNTI0XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IC8vUkMgMzM1MDA1MjQgOiBWYXpiYSBkb2tsYWR1IG5hIHBvZMWZw616ZW5vdSBvYmplZG7DoXZrdVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbWxfb2JqXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJzbWxfb2JqID0gdmFsdWUudlwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYURva2xhZHUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5TZXRFbmFibGVPaygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXY6IFwianJlczozMzUwMDUyNVwiLCB2OiAxMCwgfSwgLy9SQyAzMzUwMDUyNSA6IEV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1MjZcIiwgdjogMjAsIH0sIC8vUkMgMzM1MDA1MjYgOiBOZWV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1MjdcIiwgdjogMCwgfSAvL1JDIDMzNTAwNTI3IDogTmV1csSNZW5vXHJcblxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7c3Rhdn1cIixcclxuICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInN0YXZcIl0sXHJcbiAgICAgICAgICAgICAgICB2ZXJpZnk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpIGFzIGFueVtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnYgPT09IHZhbHVlLnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA1MjhcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMzUwMDUyOCA6IERvZGF0ZWsga2Ugc21sb3V2xJtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic21sX2RvZFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwic21sX2RvZCA9IHZhbHVlLnZcIixcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFEb2tsYWR1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuU2V0RW5hYmxlT2soKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1MjlcIiwgdjogMTAsIH0sIC8vUkMgMzM1MDA1MjkgOiBFeGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdjogXCJqcmVzOjMzNTAwNTMwXCIsIHY6IDIwLCB9LCAvL1JDIDMzNTAwNTMwIDogTmVleGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdjogXCJqcmVzOjMzNTAwNTMxXCIsIHY6IDAsIH0gLy9SQyAzMzUwMDUzMSA6IE5ldXLEjWVub1xyXG5cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3N0YXZ9XCIsXHJcbiAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJzdGF2XCJdLFxyXG4gICAgICAgICAgICAgICAgdmVyaWZ5OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9ICQodGhpcykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGF0YVwiKSBhcyBhbnlbXVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXS52ID09PSB2YWx1ZS52KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDUzMlwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDMzNTAwNTMyIDogRG9rbGFkIGplIG5hZMWZYXplbsO9bSBwxZnDrXBhZGVtXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNtbF9uYWRfcHJpXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJzbWxfbmFkX3ByaSA9IHZhbHVlLnZcIixcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFEb2tsYWR1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuU2V0RW5hYmxlT2soKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcIkFub1wiLCB2OiAxMCwgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXY6IFwiTmVcIiwgdjogMjAsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcIk5ldXLEjWVub1wiLCB2OiAwLCB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntzdGF2fVwiLFxyXG4gICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1wic3RhdlwiXSxcclxuICAgICAgICAgICAgICAgIHZlcmlmeTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSAkKHRoaXMpLmdmaWVsZChcIm9wdGlvblwiLCBcImRhdGFcIikgYXMgYW55W11cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV0udiA9PT0gdmFsdWUudikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDUzM1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDMzNTAwNTMzIDogSyBkb2tsYWR1IGV4aXN0dWrDrSB6cHLDoXZ5IGRvaGxlZG92w6lobyBzeXN0w6ltdVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbWxfZG9jX2RzZ1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwic21sX2RvY19kc2cgPSB2YWx1ZS52XCIsXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hRG9rbGFkdSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LlNldEVuYWJsZU9rKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdjogXCJqcmVzOjMzNTAwNTM1XCIsIHY6IDEwLCB9LCAvL1JDIDMzNTAwNTM1IDogQW5vXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1MzZcIiwgdjogMjAsIH0sIC8vUkMgMzM1MDA1MzYgOiBOZVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdjogXCJqcmVzOjMzNTAwNTM3XCIsIHY6IDAsIH0gLy9SQyAzMzUwMDUzNyA6IE5ldXLEjWVub1xyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7c3Rhdn1cIixcclxuICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInN0YXZcIl0sXHJcbiAgICAgICAgICAgICAgICB2ZXJpZnk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpIGFzIGFueVtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnYgPT09IHZhbHVlLnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA1MzRcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMzUwMDUzNCA6IEsgZG9rbGFkdSBleGlzdHVqZSBlbGVrdHJvbmlja8O9IG9icmF6L3DFmcOtbG9oYVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzX2VsZVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwic19lbGUgPSB2YWx1ZS52XCIsXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnptZW5hRG9rbGFkdSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LlNldEVuYWJsZU9rKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdjogXCJqcmVzOjMzNTAwNTM1XCIsIHY6IDEwLCB9LCAvL1JDIDMzNTAwNTM1IDogQW5vXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1MzZcIiwgdjogMjAsIH0sIC8vUkMgMzM1MDA1MzYgOiBOZVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdjogXCJqcmVzOjMzNTAwNTM3XCIsIHY6IDAsIH0gLy9SQyAzMzUwMDUzNyA6IE5ldXLEjWVub1xyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7c3Rhdn1cIixcclxuICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInN0YXZcIl0sXHJcbiAgICAgICAgICAgICAgICB2ZXJpZnk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpIGFzIGFueVtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnYgPT09IHZhbHVlLnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMzNTAwNTM4XCIpIC8vUkMgMzM1MDA1MzggOiBadmXFmWVqbsSbbsOtXHJcbiAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiXCIpXHJcbiAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgLy9UT0RPIC0gbmVuaSBjaXMgLmFkZFJvdyhcImpyZXM6MjY2MDAwNDJcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsICAvL1JDIDI2NjAwMDQyIDogU3RhdlxyXG4gICAgICAgICAgICAvL0dvcmRpYy5QcmVmYWJzLlNlbGVjdC53Zmxjc3pwKCksXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcInN0YXZfenZlcmVqbmVuaVwiLFxyXG4gICAgICAgICAgICAvLyAgICBtb2RlbDogXCJtb2RlbC5zdGF2X3p2ZXJlam5lbmk9dmFsdWUuc3Rhdl96cHZcIixcclxuICAgICAgICAgICAgLy8gICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhhdC5maW5kRmllbGRzKFwicGxhbl96dmVcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgY2hhbmdlT2JqLnZhbHVlLnN0YXZfenB2ID09IDAgLypuZXphaMOhamVubyovKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInBsYW5fenZlXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA1MzlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIC8vUkMgMzM1MDA1MzkgOiBacMWvc29iXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2Zsc3pwdigpLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3pwdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c196cHY9dmFsdWUuaXhzX3pwdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDU0MFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDMzNTAwNTQwIDogTnV0bm9zdFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X3Bvdl96dmVcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcInByaXpfcG92X3p2ZSA9IHZhbHVlLnZcIixcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuem1lbmFEb2tsYWR1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuU2V0RW5hYmxlT2soKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1NDFcIiwgdjogLTEsIH0sIC8vUkMgMzM1MDA1NDEgOiBFeGlzdHVqZVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdjogXCJqcmVzOjMzNTAwNTQyXCIsIHY6IDAsIH0sIC8vUkMgMzM1MDA1NDIgOiBOZXBvdmlubsOpXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1NDNcIiwgdjogMSwgfSwgLy9SQyAzMzUwMDU0MyA6IFBvdmlubsOpXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntzdGF2fVwiLFxyXG4gICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1wic3RhdlwiXSxcclxuICAgICAgICAgICAgICAgIHZlcmlmeTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSAkKHRoaXMpLmdmaWVsZChcIm9wdGlvblwiLCBcImRhdGFcIikgYXMgYW55W11cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV0udiA9PT0gdmFsdWUudikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJQbMOhblwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxzenB2KCksXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwbGFuX3p2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnBsYW5fenZlPXZhbHVlLnBsYW5fenZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA1NDRcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMzUwMDU0NCA6IEVsLm9icmF6L3DFmcOtbG9oYSB1csSNZW7DvS/DoSBrZSB6dmXFmWVqbsSbbsOtXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNfZWxlX3p2ZVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwic19lbGVfenZlID0gdmFsdWUudlwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYURva2xhZHUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5TZXRFbmFibGVPaygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXY6IFwianJlczozMzUwMDU0NVwiLCB2OiAxMCwgfSwgLy9SQyAzMzUwMDU0NSA6IEV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1NDZcIiwgdjogMjAsIH0sIC8vUkMgMzM1MDA1NDYgOiBOZWV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1NDdcIiwgdjogMCwgfSwgLy9SQyAzMzUwMDU0NyA6IE5ldXLEjWVub1xyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7c3Rhdn1cIixcclxuICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInN0YXZcIl0sXHJcbiAgICAgICAgICAgICAgICB2ZXJpZnk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpIGFzIGFueVtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnYgPT09IHZhbHVlLnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzM1MDA1NDhcIiwgLy9SQyAzMzUwMDU0OCA6IERhdHVtXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96dmVcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgcGF0aEluTW9kZWw6IFwibW9kZWwuZGF0X3p2ZVwiLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNTQ5XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IC8vUkMgMzM1MDA1NDkgOiBJRCBSZWdpc3RydSBzbWx1dlxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpZF96dmVcIiwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikgeyB9LCBtb2RlbDogXCJpZF96dmVcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZpbHRlck9zdGF0bmlVZGFqZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZpbHRlclZlY255UHJvZmlsKCkge1xyXG5cclxuICAgICAgICB2YXIgZmlsdGVyVmVjbnlQcm9maWwgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLCB0YWJMYWJlbDogXCJWxJtjbsO9IHByb2ZpbFwiIH0pXHJcbiAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA1NTBcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMzUwMDU1MCA6IFZhemJhIHBvbG/Fvmt5IFZQIG5hIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ2cF90eXBfdnliXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJ2cF90eXBfdnliID0gdmFsdWUudlwiLFxyXG4gICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC56bWVuYURva2xhZHUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5TZXRFbmFibGVPaygpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHN0YXY6IFwianJlczozMzUwMDU0NVwiLCB2OiAxMCwgfSwgLy9SQyAzMzUwMDU0NSA6IEV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1NDZcIiwgdjogMjAsIH0sIC8vUkMgMzM1MDA1NDYgOiBOZWV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF2OiBcImpyZXM6MzM1MDA1NDdcIiwgdjogMCwgfSwgLy9SQyAzMzUwMDU0NyA6IE5ldXLEjWVub1xyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7c3Rhdn1cIixcclxuICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInN0YXZcIl0sXHJcbiAgICAgICAgICAgICAgICB2ZXJpZnk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkYXRhXCIpIGFzIGFueVtdXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLnYgPT09IHZhbHVlLnYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNTUxXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc21sVmVwc2R1cCgpLCB7IC8vUkMgMzM1MDA1NTEgOiBUeXAgcG9sb8W+a3kgVlBcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidnBfaXhzX2R1cFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudnBfaXhzX2R1cCA9IHZhbHVlLml4c19kdXBcIixcclxuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHsgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLmFkZFJvdyhcIk7DoXpldiBwb2xvxb5reSBWUFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInZwX25hemV2X3NrcFwiLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7IH0sIG1vZGVsOiBcInZwX25hemV2X3NrcFwiIH0pXHJcblxyXG4gICAgICAgICAgICAuYWRkUm93KFwiSW52ZW50w6FybsOtIMSNw61zbG9cIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ2cF9pbnZfY2lzXCIsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHsgfSwgbW9kZWw6IFwidnBfaW52X2Npc1wiIH0pXHJcbiAgICAgICAgICAgIC8vVE9ETzogbmVuIGNpc2VsbmlrIGlmICghdGhpcy5pc19hY3IpIHsgLy9uZW7DrSBpbnN0YWxhY2UgbmEgQUNSXHJcbiAgICAgICAgICAgIC8vICAgIGZvcm1CdWlsZGVyTWFza2EuYWRkUm93KFwianJlczoyNjYwMDA0NlwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0Lm1hanNjaW0oKSwgeyAvL1JDIDI2NjAwMDQ2IDogTWF0ZXJpw6Fsb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInZwX21hdF9jaXNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIG1vZGVsOiBcIm1vZGVsLnZwX21hdF9jaXMgPSB2YWx1ZS52cF9tYXRfY2lzXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7IH1cclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICBkb3Bsbml0IHBvbMOtxI1rbyBuYSBtYXRza2NtLCBhxb4gYnVkZVxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgZmlsdGVyVmVjbnlQcm9maWwuYWRkUm93KFwianJlczozMzUwMDU1MlwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInZwX2V2aV9jaXNcIiwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikgeyB9LCBtb2RlbDogXCJ2cF9ldmlfY2lzXCIgfSkgLy9SQyAzMzUwMDU1MiA6IEV2aWRlbsSNbsOtIMSNw61zbG9cclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA1NTNcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ2cF92eXJfY2lzXCIsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHsgfSwgbW9kZWw6IFwidnBfdnlyX2Npc1wiIH0pIC8vUkMgMzM1MDA1NTMgOiBWw71yb2Juw60gxI3DrXNsb1xyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDU1NFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInZwX3Nlcl9jaXNcIiwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikgeyB9LCBtb2RlbDogXCJ2cF9zZXJfY2lzXCIgfSkgLy9SQyAzMzUwMDU1NCA6IFPDqXJpb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNTU1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2tsYSgpLCB7IC8vUkMgMzM1MDA1NTUgOiBLbGFzaWZpa2FjZVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ2cF9za3BcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnZwX3NrcCA9IHZhbHVlLnNrcFwiLFxyXG4gICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikgeyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNTU2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwidnBfc2FyemVcIiwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikgeyB9LCBtb2RlbDogXCJ2cF9zYXJ6ZVwiIH0pIC8vUkMgMzM1MDA1NTYgOiDFoGFyxb5lXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNTAwNTU3XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QubWFqY3NrbSgpLCB7IC8vUkMgMzM1MDA1NTcgOiBTa3VwaW5hXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInZwX3NrdXBpbmFfaWRcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnZwX3NrdXBpbmFfaWQgPSB2YWx1ZS52cF9za3VwaW5hX2lkXCIsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7IH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM1MDA1NThcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5tYWpjZHJtKCksIHsgLy9SQyAzMzUwMDU1OCA6IERydWhcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidnBfZHJoX2lkXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC52cF9kcmhfaWQgPSB2YWx1ZS52cF9kcmhfaWRcIixcclxuICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHsgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL1RPRE86LmFkZFJvdyhcImpyZXM6MjY2MDAwNTJcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsICAvL1JDIDI2NjAwMDY2IDogTUpcclxuICAgICAgICAgICAgLy9Hb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY21laigpLFxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJtalwiLFxyXG4gICAgICAgICAgICAvLyAgICBtb2RlbDogXCJtb2RlbC5taj12YWx1ZS5talwiLFxyXG4gICAgICAgICAgICAvLyAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAvLy5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgLy8gICAgbGFiZWw6IFwianJlczoyNjYwMDA5M1wiLCAvL1JDIDI2NjAwMDkzIDogTW5vxb5zdHbDrVxyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcInZwX21cIixcclxuICAgICAgICAgICAgLy8gICAgdHlwZTogXCJudW1iZXJcIixcclxuICAgICAgICAgICAgLy8gICAgcGF0aEluTW9kZWw6IFwibW9kZWwudnBfbVwiLFxyXG4gICAgICAgICAgICAvLyAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAvLyAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7IH1cclxuICAgICAgICAgICAgLy99KSlcclxuICAgICAgICAgICAgLy8uYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgIC8vICAgIGxhYmVsOiBcImpyZXM6MjY2MDAxOTdcIiwgLy9SQyAyNjYwMDE5NyA6IMSMw6FzdGthXHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwidnBfY1wiLFxyXG4gICAgICAgICAgICAvLyAgICB0eXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAvLyAgICBwYXRoSW5Nb2RlbDogXCJtb2RlbC52cF9jXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgIC8vICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHsgfVxyXG4gICAgICAgICAgICAvL30pKVxyXG4gICAgICAgICAgICAuYWRkUm93KFwianJlczozMzUwMDU1OVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDMzNTAwNTU5IDogUG9waXNcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidnBfcG9waXNcIiwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikgeyB9LCBhbGxvd1Jlc2l6ZTogdHJ1ZSwgcm93czogMywgYXV0b1NpemU6IHRydWUsIG1vZGVsOiBcInZwX3BvcGlzXCJcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIGZpbHRlclZlY255UHJvZmlsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==