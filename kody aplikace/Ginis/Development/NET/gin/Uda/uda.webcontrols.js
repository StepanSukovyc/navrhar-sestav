"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * GUdaDialogs.ts
 *
 * @author Jindřich Vácha
 * @since 480.2.0.0
 */
var Gordic;
(function (Gordic) {
    var Uda;
    (function (Uda) {
        var Dialogs;
        (function (Dialogs) {
            //-----------------------------------------------------------------------------------------------------
            /**
             * Vyvěšení na úřední desku
             *
             * @author Jindřich Vácha
             * @since 480.2.0.0
             */
            function VyveseniNaUredniDesku(parentContent, opt, ModOtevreni) {
                const options = {
                    Ixp: opt ? opt.Ixp : undefined,
                    Ixb: opt ? opt.Ixb : undefined,
                    Nazev: opt ? opt.Nazev : undefined,
                    Popis: opt ? opt.Popis : undefined
                };
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                if (ModOtevreni.indexOf("navigate") > -1) {
                    return pContent[ModOtevreni]("Gordic.Uda.WebControls.VyveseniTabs", options);
                }
                else {
                    return (pContent.dialogs ? pContent.dialogs : pContent)[ModOtevreni]("Gordic.Uda.WebControls.VyveseniTabs", options, { title: "jres:Gordic.Uda.WebControls:24450063", width: 1000, height: 650 }); //RC 24450063 : Vyvěšení na úřední desku
                }
            } // VyveseniNaUredniDesku()
            Dialogs.VyveseniNaUredniDesku = VyveseniNaUredniDesku;
            //-----------------------------------------------------------------------------------------------------
            /**
             * Zveřejnění souboru
             *
             * @author Jindřich Vácha
             * @since 480.2.0.0
             */
            function ZverejneniSouboru(parentContent, opt, ModOtevreni) {
                const options = {
                    Ixb: opt ? opt.Ixb : undefined,
                    Ixp: opt ? opt.Ixp : undefined,
                    Nazev: opt ? opt.Nazev : undefined,
                    Popis: opt ? opt.Popis : undefined
                };
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                if (ModOtevreni.indexOf("navigate") > -1) {
                    return pContent[ModOtevreni]("Gordic.Uda.WebControls.ZverejneniTabs", options);
                }
                else {
                    return (pContent.dialogs ? pContent.dialogs : pContent)[ModOtevreni]("Gordic.Uda.WebControls.ZverejneniTabs", options, { title: "jres:Gordic.Uda.WebControls:24450072", width: 1000, height: 650 }); //RC 24450072 : Zveřejnění souboru
                }
            } // ZverejneniSouboru()
            Dialogs.ZverejneniSouboru = ZverejneniSouboru;
            //-----------------------------------------------------------------------------------------------------
            /**
             * Zveřejnění souboru
             *
             * @author Jindřich Vácha
             * @since 480.2.0.0
             */
            function ZverejneniSouboruHistorie(parentContent, opt, ModOtevreni) {
                const options = {
                    Ixb: opt ? opt.Ixb : undefined,
                    HistOnly: true // jen historii
                };
                const pContent = Gordic.Gin.Globals.Dialogs.ZkontrolujContent(parentContent);
                ModOtevreni = Gordic.Gin.Globals.Dialogs.UpravModOtevrni(pContent, ModOtevreni);
                if (ModOtevreni.indexOf("navigate") > -1) {
                    return pContent[ModOtevreni]("Gordic.Uda.WebControls.ZverejneniTabs", options);
                }
                else {
                    return (pContent.dialogs ? pContent.dialogs : pContent)[ModOtevreni]("Gordic.Uda.WebControls.ZverejneniTabs", options, { title: "jres:Gordic.Uda.WebControls:24450072", width: 1000, height: 650 }); //RC 24450072 : Zveřejnění souboru
                }
            } // ZverejneniSouboruHistorie()
            Dialogs.ZverejneniSouboruHistorie = ZverejneniSouboruHistorie;
        })(Dialogs = Uda.Dialogs || (Uda.Dialogs = {}));
    })(Uda = Gordic.Uda || (Gordic.Uda = {}));
})(Gordic || (Gordic = {})); // ns
var Gordic;
(function (Gordic) {
    var Uda;
    (function (Uda) {
        var WebControls;
        (function (WebControls) {
            let gcontent = Decorators.gcontent;
            /**
             * Všeobecné testy
             *
             * @author Jindřich Vácha
             * @since 480.2.0.0
             */
            let ObecneTesty = class ObecneTesty extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actObecneTesty";
                    //NOTE: BMartinek 21.9.2018 - promenna log je na gcontentu pro logovani, pls. prejmenuj si metodu. Dik
                    //-----------------------------------------------------------------------------------------------------
                    //private log(text: string) {
                    //    let aText = this.defaultForm!.findFields("log").gfield("getValue");
                    //    if (aText == null) {
                    //        aText = "";
                    //    }
                    //    this.defaultForm!.findFields("log").gfield("setValue", aText + text + "\n");
                    //} // m
                }
                /**
                 * Definice formuláře
                 */
                onContentReady() {
                    let that = this;
                    console.log("Gordic.Uda.WebControls.ObecneTesty.onContentReady", this);
                    // akce seznamu
                    this.actions.addRange({
                        //-----------------------------------------------------------------------------------------------------
                        // Vyvěšení
                        actVyveseni1: {
                            name: "actVyveseni1",
                            caption: "Vyvěšení (nothing+bez ixb, názvu a popisu)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                that.otevriVyveseni(undefined);
                            }
                        },
                        actVyveseni2: {
                            name: "actVyveseni2",
                            caption: "Vyvěšení (auto)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                that.otevriVyveseni(Gordic.Gin.Globals.Enums.ModOtevreni.auto);
                            }
                            //run: function (ev, ctx) {
                            //    Gordic.Uda.Dialogs.VyveseniNaUredniDesku(
                            //        that
                            //        , { Ixp: "DEMOX0015BBE", Ixb: "", Nazev: "Vyvěšení (auto)", Popis: "" }
                            //        , Gordic.Gin.Globals.Enums.ModOtevreni.auto
                            //    );
                            //}
                        },
                        actVyveseni3: {
                            name: "actVyveseni3",
                            caption: "Vyvěšení (navigate)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                that.otevriVyveseni(Gordic.Gin.Globals.Enums.ModOtevreni.navigate);
                            }
                            //run: function (ev, ctx) {
                            //    Gordic.Uda.Dialogs.VyveseniNaUredniDesku(
                            //        that
                            //        , { Ixp: "DEMOX0015BBE", Ixb: "", Nazev: "Vyvěšení (navigate)", Popis: "" }
                            //        , Gordic.Gin.Globals.Enums.ModOtevreni.navigate
                            //    );
                            //}
                        },
                        actVyveseni4: {
                            name: "actVyveseni4",
                            caption: "Vyvěšení (navigateTask)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                that.otevriVyveseni(Gordic.Gin.Globals.Enums.ModOtevreni.navigateTask);
                            }
                            //run: function (ev, ctx) {
                            //    Gordic.Uda.Dialogs.VyveseniNaUredniDesku(
                            //        that
                            //        , { Ixp: "DEMOX0015BBE", Ixb: "", Nazev: "Vyvěšení (navigateTask)", Popis: "" }
                            //        , Gordic.Gin.Globals.Enums.ModOtevreni.navigateTask
                            //    );
                            //}
                        },
                        actVyveseni5: {
                            name: "actVyveseni5",
                            caption: "Vyvěšení (showModalWindow)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                that.otevriVyveseni(Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow);
                            }
                            //run: function (ev, ctx) {
                            //    Gordic.Uda.Dialogs.VyveseniNaUredniDesku(
                            //        that
                            //        , { Ixp: "DEMOX0015BBE", Ixb: "", Nazev: "Vyvěšení (showModalWindow)", Popis: "" }
                            //        , Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow
                            //    );
                            //}
                        },
                        actVyveseni6: {
                            name: "actVyveseni6",
                            caption: "Vyvěšení (showWindow)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                that.otevriVyveseni(Gordic.Gin.Globals.Enums.ModOtevreni.showWindow);
                            }
                            //run: function (ev, ctx) {
                            //    Gordic.Uda.Dialogs.VyveseniNaUredniDesku(
                            //        that
                            //        , { Ixp: "DEMOX0015BBE", Ixb: "", Nazev: "Vyvěšení (showWindow)", Popis: "" }
                            //        , Gordic.Gin.Globals.Enums.ModOtevreni.showWindow
                            //    );
                            //}
                        },
                        //-----------------------------------------------------------------------------------------------------
                        // Zveřejnění
                        actZverejneni1: {
                            name: "actZverejneni1",
                            caption: "Zveřejnění (nothing + bez ixp, názvu a popisu)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboru(that, { Ixb: "DEMO0C011DM6" }
                                //,Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow
                                );
                            }
                        },
                        actZverejneni2: {
                            name: "actZverejneni2",
                            caption: "Zveřejnění (auto)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboru(that, { Ixb: "DEMO0C011DM6", Ixp: "", Nazev: "Zveřejnění (auto)", Popis: "" }, Gordic.Gin.Globals.Enums.ModOtevreni.auto);
                            }
                        },
                        actZverejneni3: {
                            name: "actZverejneni3",
                            caption: "Zveřejnění (navigate)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboru(that, { Ixb: "DEMO0C011DM6", Ixp: "", Nazev: "Zveřejnění (navigate)", Popis: "" }, Gordic.Gin.Globals.Enums.ModOtevreni.navigate);
                            }
                        },
                        actZverejneni4: {
                            name: "actZverejneni4",
                            caption: "Zveřejnění (navigateTask)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboru(that, { Ixb: "DEMO0C011DM6", Ixp: "", Nazev: "Zveřejnění (navigateTask)", Popis: "" }, Gordic.Gin.Globals.Enums.ModOtevreni.navigateTask);
                            }
                        },
                        actZverejneni5: {
                            name: "actZverejneni5",
                            caption: "Zveřejnění (showModalWindow)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboru(that, { Ixb: "DEMO0C011DM6", Ixp: "", Nazev: "Zveřejnění (showModalWindow)", Popis: "" }, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow);
                            }
                        },
                        actZverejneni6: {
                            name: "actZverejneni6",
                            caption: "Zveřejnění (showWindow)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboru(that, { Ixb: "DEMO0C011DM6", Ixp: "", Nazev: "Zveřejnění (showWindow)", Popis: "" }, Gordic.Gin.Globals.Enums.ModOtevreni.showWindow);
                            }
                        },
                        //-----------------------------------------------------------------------------------------------------
                        // ZverejneniSouboruHistorie
                        actZverejneniHistorie1: {
                            name: "actZverejneniHistorie1",
                            caption: "Zveřejnění (nothing)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboruHistorie(that, { Ixb: "DEMO0C011DM6" }
                                //,Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow
                                );
                            }
                        },
                        actZverejneniHistorie2: {
                            name: "actZverejneniHistorie2",
                            caption: "Zveřejnění (auto)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboruHistorie(that, { Ixb: "DEMO0C011DM6" }, Gordic.Gin.Globals.Enums.ModOtevreni.auto);
                            }
                        },
                        actZverejneniHistorie3: {
                            name: "actZverejneniHistorie3",
                            caption: "Zveřejnění (navigate)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboruHistorie(that, { Ixb: "DEMO0C011DM6" }, Gordic.Gin.Globals.Enums.ModOtevreni.navigate);
                            }
                        },
                        actZverejneniHistorie4: {
                            name: "actZverejneniHistorie4",
                            caption: "Zveřejnění (navigateTask)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboruHistorie(that, { Ixb: "DEMO0C011DM6" }, Gordic.Gin.Globals.Enums.ModOtevreni.navigateTask);
                            }
                        },
                        actZverejneniHistorie5: {
                            name: "actZverejneniHistorie5",
                            caption: "Zveřejnění (showModalWindow)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboruHistorie(that, { Ixb: "DEMO0C011DM6" }, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow);
                            }
                        },
                        actZverejneniHistorie6: {
                            name: "actZverejneniHistorie6",
                            caption: "Zveřejnění (showWindow)",
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                Gordic.Uda.Dialogs.ZverejneniSouboruHistorie(that, { Ixb: "DEMO0C011DM6" }, Gordic.Gin.Globals.Enums.ModOtevreni.showWindow);
                            }
                        },
                        //-----------------------------------------------------------------------------------------------------
                        actJsonPropertySet: {
                            name: "actJsonPropertySet",
                            caption: "Json Property (set)",
                            icon: "",
                            run: function (ev, ctx) {
                                that.setJsonProperty(ev, ctx);
                            }
                        },
                        actJsonPropertyEmpty: {
                            name: "actJsonPropertyEmpty",
                            caption: "Json Property (empty)",
                            icon: "",
                            run: function (ev, ctx) {
                                that.emptyJsonProperty(ev, ctx);
                            }
                        },
                        actSessionSet: {
                            name: "actSessionSet",
                            caption: "Session (Set)",
                            icon: "",
                            run: function (ev, ctx) {
                                that.setSession(ev, ctx);
                            }
                        },
                        actSessionEmpty: {
                            name: "actSessionEmpty",
                            caption: "Session (empty)",
                            icon: "",
                            run: function (ev, ctx) {
                                that.emptySession(ev, ctx);
                            }
                        },
                        actLogNastaveni: {
                            name: "actLogNastaveni",
                            caption: "Log nastavení",
                            icon: "",
                            run: function (ev, ctx) {
                                that.logNastaveni(ev, ctx);
                            }
                        },
                        actVarLetTest: {
                            name: "actVarLetTest",
                            caption: "Var x Let",
                            icon: "",
                            run: function (ev, ctx) {
                                that.varLetTest(ev, ctx);
                            }
                        }
                    });
                    this.menuBar(this.actions.createBar([
                        ["Vyvěšení*", // main + sub
                            "actVyveseni1", "actVyveseni2", /*"actVyveseni3", "actVyveseni4",*/ "actVyveseni5", "actVyveseni6"
                        ],
                        ["Zveřejnění*", // main + sub
                            "actZverejneni1", "actZverejneni2", /*"actZverejneni3", "actZverejneni4",*/ "actZverejneni5", "actZverejneni6"
                        ],
                        ["Historie zveřejnění*", // main + sub
                            "actZverejneniHistorie1", "actZverejneniHistorie2", "actZverejneniHistorie3", "actZverejneniHistorie4", "actZverejneniHistorie5", "actZverejneniHistorie6"
                        ],
                        "actJsonPropertySet*",
                        "actJsonPropertyEmpty*",
                        "actSessionSet*",
                        "actSessionEmpty*",
                        "actLogNastaveni*",
                        "actVarLetTest*"
                    ])); // menuBar
                    this.defaultForm = $("<div>")
                        .appendTo(this.element)
                        .gform("createFrom", new Gordic.Forms.Form({
                        name: "formTesty",
                        layoutDescriptor: "L1M1S1, breaks-200-500"
                    })
                        .addRow("Ixp")
                        .addField("gstringbox", { name: "ixp", initialValue: "DEMOX0015BBE" })
                        .addRow("Název")
                        .addField("gstringbox", { name: "nazev", initialValue: "Toto je název" })
                        .addRow("Popis")
                        .addField("gstringbox", { name: "popis", initialValue: "A tohle je popis prosím" })
                        .addRow("Log")
                        .addField("gstringbox", { name: "log", rows: 15 })); // gform
                } // onContentReady
                //-----------------------------------------------------------------------------------------------------
                /**
                 * otevriVyveseni
                 *
                 * @param {Gordic.Gin.Globals.Enums.ModOtevreni} mod
                 */
                otevriVyveseni(mod) {
                    let opt = {
                        Ixp: this.defaultForm.findFields("ixp").gfield("getValue"),
                        Ixb: undefined,
                        Nazev: this.jsonProp ? this.jsonProp.nazev : undefined,
                        Popis: this.jsonProp ? this.jsonProp.popis : undefined
                    };
                    Gordic.Uda.Dialogs.VyveseniNaUredniDesku(this, opt, mod);
                }
                //-----------------------------------------------------------------------------------------------------
                setJsonProperty(ev, ctx) {
                    this.jsonProp = new Object();
                    this.defaultForm.findFields("nazev", "popis").gfield("model", "collect", this.jsonProp);
                    this.logNastaveni(ev, ctx);
                } // setJsonProperty
                //-----------------------------------------------------------------------------------------------------
                emptyJsonProperty(ev, ctx) {
                    this.jsonProp = undefined;
                    this.logNastaveni(ev, ctx);
                } // emptyJsonProperty
                //-----------------------------------------------------------------------------------------------------
                setSession(ev, ctx) {
                    let that = this;
                    this.defaultForm.findFields("nazev", "popis").gfield("model", "collect", this.model);
                    this.call("SetSession", { model: this.model })
                        .done(function () {
                        that.logNastaveni(ev, ctx);
                    })
                        .fail(function (xhr, type, vobj) {
                        console.log("xhr, type, vobj", xhr, type, vobj);
                        alert("Došlo k chybě (viz log)");
                    });
                } // setSession
                //-----------------------------------------------------------------------------------------------------
                emptySession(ev, ctx) {
                    let that = this;
                    this.call("EmptySession")
                        .done(function () {
                        that.logNastaveni(ev, ctx);
                    })
                        .fail(function (xhr, type, vobj) {
                        console.log("xhr, type, vobj", xhr, type, vobj);
                        alert("Došlo k chybě (viz log)");
                    });
                } // emptySession
                //-----------------------------------------------------------------------------------------------------
                logNastaveni(ev, ctx) {
                    let that = this;
                    let log = "";
                    log += "-- JsonProperty --" + "\n";
                    if (this.jsonProp) {
                        log += "nazev: " + this.jsonProp.nazev + "\n";
                        log += "popis: " + this.jsonProp.popis + "\n";
                    }
                    else {
                        log += "this.jsonProp:" + this.jsonProp + "\n";
                    }
                    log += "-- Session -- " + "\n";
                    this.call("GetSession")
                        .done(function (vysl) {
                        if (vysl) {
                            log += "nazev:" + vysl.nazev + "\n";
                            log += "popis:" + vysl.popis + "\n";
                        }
                        else {
                            log += "vysl:" + vysl + "\n";
                        }
                        that.defaultForm.findFields("log").gfield("setValue", log);
                    })
                        .fail(function (xhr, type, vobj) {
                        console.log("xhr, type, vobj", xhr, type, vobj);
                        alert("Došlo k chybě (viz log)");
                    });
                } // setJsonProperty
                //-----------------------------------------------------------------------------------------------------
                varLetTest(ev, ctx) {
                    let prvni_v;
                    prvni_v = "prvni var";
                    if (true) {
                        let druha_v;
                        druha_v = "druha var";
                        let druha_l;
                        druha_l = "druha let";
                    }
                    //this.log(druha_v);
                    //treti_v++;
                    let treti_v;
                    //this.log(treti_v); //NOTE: BMartinek 21.9.2018 - promenna log je na gcontentu pro logovani, pls. prejmenuj si metodu. Dik
                    //this.log(druha_l);
                } // m
            }; // cls
            ObecneTesty = __decorate([
                gcontent
            ], ObecneTesty);
            WebControls.ObecneTesty = ObecneTesty;
        })(WebControls = Uda.WebControls || (Uda.WebControls = {}));
    })(Uda = Gordic.Uda || (Gordic.Uda = {}));
})(Gordic || (Gordic = {})); // ns
var Gordic;
(function (Gordic) {
    var Uda;
    (function (Uda) {
        var WebControls;
        (function (WebControls) {
            let gcontent = Decorators.gcontent;
            //-----------------------------------------------------------------------------------------------------
            /**
             * SamplePage
             *
             * @author Jindřich Vácha
             * @since 480.2.0.0
             */
            let SamplePage = class SamplePage extends Gordic.GContentBase {
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Definice formuláře
                 */
                onContentReady() {
                    this.taskId = "actSamplePage";
                    let that = this;
                    console.log("Gordic.Uda.WebControls.SamplePage.onContentReady", this);
                    // akce seznamu
                    this.actions.addRange({
                        actSample: {
                            name: "actSample",
                            caption: "Sample " + this.model.ixp,
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                alert(1);
                            }
                        }
                    });
                    this.menuBar(this.actions.createBar(["actSample*"]));
                } // onContentReady
            }; // cls
            SamplePage = __decorate([
                gcontent
            ], SamplePage);
            WebControls.SamplePage = SamplePage;
        })(WebControls = Uda.WebControls || (Uda.WebControls = {}));
    })(Uda = Gordic.Uda || (Gordic.Uda = {}));
})(Gordic || (Gordic = {})); // ns
var Gordic;
(function (Gordic) {
    var Uda;
    (function (Uda) {
        var WebControls;
        (function (WebControls) {
            let gcontent = Decorators.gcontent;
            /**
             * Test bez cs
             *
             * @author Jindřich Vácha
             * @since 480.2.0.0
             */
            let TestBezCs = class TestBezCs extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actTestBezCs";
                }
                /**
                 * Definice formuláře
                 */
                onContentReady() {
                    let that = this;
                    console.log("Gordic.Uda.WebControls.actTestBezCs.onContentReady", this);
                } // onContentReady
            }; // cls
            TestBezCs = __decorate([
                gcontent
            ], TestBezCs);
            WebControls.TestBezCs = TestBezCs;
        })(WebControls = Uda.WebControls || (Uda.WebControls = {}));
    })(Uda = Gordic.Uda || (Gordic.Uda = {}));
})(Gordic || (Gordic = {})); // ns
var Gordic;
(function (Gordic) {
    var Uda;
    (function (Uda) {
        var WebControls;
        (function (WebControls) {
            let gcontent = Decorators.gcontent;
            /**
             * Vyvěšení na úřední desku
             *
             * @author Jindřich Vácha
             * @since 480.2.0.0
             */
            let VyveseniTabs = class VyveseniTabs extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actVyveseniTabs";
                }
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Definice formuláře
                 */
                onContentReady() {
                    let that = this;
                    console.log("Gordic.Uda.WebControls.VyveseniTabs.onContentReady", this);
                    this.isVyveseniTabAlreadyLoaded = false;
                    this.isHistorieTabAlreadyLoaded = false;
                    // start grafické části
                    //debugger;
                    // GSUBTASKS (taby)
                    this.actions.addRange({
                        actVyveseniTab: { enabled: true, run: function () { that.LoadVyveseniTab(); } },
                        actHistorieTab: { enabled: true, run: function () { that.LoadHistorieTab(); } },
                    });
                    $("<div>").appendTo(this.element)
                        .gsubtasks({
                        params: [
                            {
                                caption: this.model.is_automaticke_vyveseni
                                    ? "jres:24450036" //RC 24450036 : Vyvěšení
                                    : "jres:24450081", //RC 24450081 : Návrh na vyvěšení
                                action: this.actions.actVyveseniTab
                            }, {
                                caption: "jres:24450056", //RC 24450056 : Historie
                                action: this.actions.actHistorieTab
                            },
                        ],
                    });
                    this.LoadVyveseniTab();
                    // akce pro vyvěšení
                    this.actions.addRange({
                        // TODO: texty do resource
                        actVyvesit: {
                            name: "actVyvesit",
                            caption: //"OK",
                            this.model.is_automaticke_vyveseni
                                ? "jres:24450057" //RC 24450057 : Vyvěsit
                                : "jres:24450077", //RC 24450077 : Návrh
                            icon: "fa-save",
                            run: function (ev, ctx) { that.saveDetail(); }
                        },
                        actCancel: {
                            name: "actCancel", caption: "jres:24450058", icon: "gi-window-close", run: function (ev, ctx) { that.tryClose(); } //RC 24450058 : Zrušit
                        },
                    });
                    // commandbar (tlačítka na spodu okna)
                    this.commandBar([
                        { action: this.actions.actVyvesit },
                        { action: this.actions.actCancel },
                    ]);
                    if (this.model.flash) {
                        this.showFlash({ label: this.model.flash, customClass: 'g-state-info' });
                    }
                    //if (!this.model.lze_zobrazit) {
                    //    this.dialogs.warning("jres:24450022").on("close", function () { that.close() }); //RC 24450022 : Nemáte právo k zobrazení el. obrazu a příloh.
                    //}
                    // ony ty lze_... věci jsou spřaženy s existencí el. obrazu a příloh => pokud el. obraz neexistuje, tak to jen otravuje...
                    //if (!this.model.lze_zverejnit_obr && !this.model.lze_zverejnit_pri) {
                    //    this.dialogs.warning("jres:24450023"); //RC 24450023 : Nemáte právo k vyvěšení el. obrazu a příloh.
                    //}
                    //else if (!this.model.lze_zverejnit_obr) {
                    //    this.dialogs.warning("jres:24450024"); //RC 24450024 : Nemáte právo k vyvěšení el. obrazu.
                    //}
                    //else if (!this.model.lze_zverejnit_pri) {
                    //    this.dialogs.warning("jres:24450025"); //RC 24450025 : Nemáte právo k vyvěšení el. příloh.
                    //}
                } // onContentReady
                //-----------------------------------------------------------------------------------------------------
                /**
                 * 'closing()' okna – test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít), boolean určuje, jestli přeselektovat seznam (true) nebo ne (false)
                 */
                closing() {
                    let that = this;
                    console.log("VyveseniTabs.closing()", this);
                    let nowSoub = this.$gridVyveseniSoubory.ggrid("getSelection", false, true);
                    console.log("files at start");
                    console.log(this.model.souboryZverejnitAtStart);
                    console.log("files now");
                    console.log(nowSoub);
                    // kontrola na změněné položky
                    let formChanged = this.defaultForm.gform("hasChanged");
                    //let aSoub = this.$gridVyveseniSoubory.ggrid("getSelection", false, true);
                    let atStart = "";
                    let justNow = "";
                    for (let i = 0; i < this.model.souboryZverejnitAtStart.length; i++) {
                        atStart += this.model.souboryZverejnitAtStart[i].ixb + ",";
                    }
                    for (let j = 0; j < nowSoub.length; j++) {
                        justNow += nowSoub[j].ixb + ",";
                    }
                    console.log("atStart", atStart);
                    console.log("justNow", justNow);
                    let filesCheckedChanged = (atStart !== justNow);
                    //let soubChanged = (x)
                    console.log("filesCheckedChanged", filesCheckedChanged);
                    console.log("formChanged", formChanged);
                    let def = $.Deferred();
                    if (formChanged || filesCheckedChanged) {
                        // dotaz na zavření
                        this.dialogs.confirm("jres:24450059", //RC 24450059 : Dotaz
                        "jres:24450083") //RC 24450083 : Chcete zavřít okno bez uložení změn?
                            .on("yes", def.resolve)
                            .on("close", def.reject);
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        def.resolve();
                    }
                    return def.promise();
                } // closing
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Tab (subtask) 'Vyvěšení'
                 */
                LoadVyveseniTab() {
                    let that = this;
                    console.log("Gordic.Uda.WebControls.VyveseniTabs.VyveseniTab()", this);
                    // schovám historii
                    if (this.$historyDiv != null) {
                        this.$historyDiv.hide();
                    }
                    // vybuduju vyvěšení
                    if (this.isVyveseniTabAlreadyLoaded == false) { // první otevření Subtasku
                        this.isVyveseniTabAlreadyLoaded = true;
                        console.log("...loading", this);
                        this.$vyveseniDiv = $("<div>").appendTo(this.element);
                        this.defaultForm = $("<div>")
                            .appendTo(this.$vyveseniDiv)
                            .gform("createFrom", new Gordic.Forms.Form({
                            name: "formVyveseni",
                            layoutDescriptor: "L1M1S1, breaks-200-500"
                            //layoutDescriptor: "L2M2S1"
                        })
                            .addSection()
                            .addRow("jres:24450052") //RC 24450052 : Ixp
                            .addField("gstringbox", {
                            name: "ixp", disabled: true, flag: "required",
                        })
                            .addRow("jres:24450079") //RC 24450079 : Akce
                            .addField("gstringbox", {
                            name: "stav", disabled: true
                        })
                            .addRow("jres:24450016") //RC 24450016 : Název
                            .addField("gstringbox", {
                            name: "nazev", flag: "required"
                        })
                            .addRow("jres:24450017") //RC 24450017 : Popis
                            .addField("gstringbox", {
                            name: "popis", rows: 2
                        })
                            .addRow("jres:24450018") //RC 24450018 : Místo
                            .addField("gselectbox", Gordic.Prefabs.Select.wflsulz(), {
                            name: "ulozisteField",
                            model: "uloziste = ixs_ulz",
                            flag: "required",
                            serverFilters: {
                                priz_ud: 10
                            }
                        }) // gselectbox
                            .addRow("jres:24450034") //RC 24450034 : Kategorie
                            .addField("gselectbox", Gordic.Prefabs.Select.wfldulz(), {
                            name: "slozkaField",
                            model: "slozka = ktg_dms",
                            flag: "required",
                            serverFilters: {
                                ixs_ulz: new Gordic.Forms.Dependency("ulozisteField", "ixs_ulz", true)
                            }
                        }) // gselectbox
                            .addRow("jres:24450020") //RC 24450020 : Vyvěšení dne
                            .addField("gdatebox", {
                            name: "dat_od", flag: "required"
                        })
                            .addRow("jres:24450021") //RC 24450021 : Sejmutí dne
                            .addField("gdatebox", {
                            name: "dat_do"
                        })); // gform
                        this.defaultForm.findFields()
                            .gfield("model", "apply", this.model, { initialValues: true })
                            .gfield("model", "validators", this.validators);
                        this.$gridVyveseniSoubory = $("<div>") //;  //vytvoreni elementu pro grid
                            .appendTo(this.$vyveseniDiv)
                            .ggrid({
                            multi: true,
                            rowsChecked: "is_checked", //zaskrtne chb, je-li promenna true
                            searchColumns: ["ixb", "soubor", "poznamka"], //sloupce, podle kterych se vyhledava v searchboxu
                            columns: new Gordic.Data.GridFormat()
                                .addTextColumn({
                                name: "typ_txt",
                                caption: "jres:24450029", //RC 24450029 : Typ
                                width: 60,
                                fixedWidth: true
                                //customClass: "ui-disabled"
                            })
                                .addTextColumn({
                                name: "ixb",
                                caption: "jres:24450031", //RC 24450031 : ID souboru
                                fixedWidth: true,
                                width: 110
                            })
                                .addTextColumn({
                                name: "soubor",
                                caption: "jres:24450032", //RC 24450032 : Soubor
                                width: 200
                            })
                                .addTextColumn({
                                name: "poznamka",
                                caption: "jres:24450017", //RC 24450017 : Popis
                                width: 200
                            })
                        })
                            .gautofit(); // bude mít Height až dolu
                        if (this.model.souboryVsechny) {
                            let view = new Gordic.Data.View(this.model.souboryVsechny, { key: "ixb" }); //key je dulezity kvuli pripadnemu vyhledavani radku
                            this.$gridVyveseniSoubory.ggrid("setData", view);
                            this.model.souboryZverejnitAtStart = this.$gridVyveseniSoubory.ggrid("getSelection", false, true); //nacteni pres referenci
                            if (this.model.souboryVsechny.length == 0) {
                                this.dialogs.warning("jres:24450053"); //RC 24450053 : Doklad nemá žádný el. obraz a přílohy nebo na jejich zveřejnění nemáte dostatečná práva.
                                this.close();
                            }
                        }
                    } // první otevření Subtasku
                    else {
                        console.log("...already loaded", this);
                    }
                    // zobrazím vyvěšení
                    if (this.$vyveseniDiv != null) {
                        this.$vyveseniDiv.show();
                    }
                    if (this.actions.actVyvesit != null) {
                        this.actions.actVyvesit.visible(true);
                    }
                } // LoadVyveseniTab()
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Tab (subtask) historie
                 */
                LoadHistorieTab() {
                    let that = this;
                    console.log("Gordic.Uda.WebControls.VyveseniTabs.HistorieTab()", this);
                    // schovám vyvěšení
                    if (this.$vyveseniDiv != null) {
                        this.$vyveseniDiv.hide();
                    }
                    if (this.actions.actVyvesit != null) {
                        this.actions.actVyvesit.visible(false);
                    }
                    // vybuduju vyvěšení
                    if (this.isHistorieTabAlreadyLoaded == false) { // první otevření Subtasku
                        this.isHistorieTabAlreadyLoaded = true;
                        console.log("...loading", this);
                        this.$historyDiv = $("<div>").appendTo(this.element);
                        this.$gridHistory = $("<div>") //;  //vytvoreni elementu pro $gridHistory
                            //.height(250)        //nastaveni vysky $gridHistory
                            .appendTo(this.$historyDiv)
                            .gautofit()
                            .ggrid({
                            //columnMode: "full", // srazí width sloupců na def. hodnoty
                            marking: false,
                            rowNumbers: false,
                            selection: function (ev, obj) {
                                that.showHistoryDetail();
                            },
                            searchColumns: ["nazev_kat", "nazev_zdroj", "nazev", "popis", "nazev_ref", "zmenu_prov_txt"],
                            columns: new Gordic.Data.GridFormat()
                                .addTextColumn({
                                name: "ixs_ulo_and_por_cislo",
                                caption: "ID",
                                width: 130,
                                fixedWidth: true
                                //, visible: false
                            })
                                .addTextColumn({
                                name: "stav",
                                caption: "jres:24450047" //RC 24450047 : Stav
                                ,
                                width: 100
                            })
                                .addTextColumn({
                                name: "nazev_kat",
                                caption: "jres:24450034" //RC 24450034 : Kategorie
                                ,
                                width: 130
                            })
                                .addTextColumn({
                                name: "nazev_zdroj",
                                caption: "jres:24450035" //RC 24450035 : Zdroj
                                ,
                                width: 130
                            })
                                .addDateColumn({
                                name: "dat_od",
                                caption: "jres:24450036" //RC 24450036 : Vyvěšení
                                ,
                                width: 80,
                                fixedWidth: true
                            })
                                .addDateColumn({
                                name: "dat_do",
                                caption: "jres:24450037" //RC 24450037 : Sejmutí
                                ,
                                width: 80,
                                fixedWidth: true
                            })
                                .addTextColumn({
                                name: "nazev",
                                caption: "jres:24450016" //RC 24450016 : Název
                                ,
                                width: 140
                            })
                                .addTextColumn({
                                name: "popis",
                                caption: "jres:24450017" //RC 24450017 : Popis
                                ,
                                width: 150
                            })
                                .addTextColumn({
                                name: "nazev_ref",
                                caption: "jres:24450038" //RC 24450038 : Vyvěšení provedl
                                ,
                                width: 130
                            })
                                .addDateTimeColumn({
                                name: "dat_zmena",
                                caption: "jres:24450039" //RC 24450039 : Datum změny
                                ,
                                width: 130,
                                fixedWidth: true
                            })
                                .addTextColumn({
                                name: "zmenu_prov_txt",
                                caption: "jres:24450040" //RC 24450040 : Změnu provedl
                                ,
                                width: 130
                            })
                        });
                        this.$historyDetailTabObsah = $("<div>")
                            .appendTo(this.$historyDiv);
                        let view = new Gordic.Data.View(this.model.historie, { key: "ixs_ulo, por_cislo" }); //key je dulezity kvuli pripadnemu vyhledavani radku
                        this.$gridHistory.ggrid("setData", view);
                        // aby se to furt nepřenášelo (vykreslený už to je)
                        //this.model.historie = null;
                        this.$gridHistorySoubory = $("<div>")
                            .appendTo(this.$historyDiv);
                    } // první otevření Subtasku
                    else {
                        console.log("...already loaded", this);
                    }
                    // zobrazím historii
                    if (this.$historyDiv != null) {
                        this.$historyDiv.show();
                    }
                } // LoadHistorieTab()
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Uložení
                 */
                saveDetail() {
                    let that = this;
                    //////////////////////////////////////
                    // provedu všechny kontroly
                    //////////////////////////////////////
                    console.log("Gordic.Uda.WebControls.VyveseniTabs.saveDetail()", this);
                    //Vyvolani validace (pouze v JS bez volani serveru)
                    if (!this.defaultForm.gform("isValid")) {
                        return;
                    }
                    let ff = this.defaultForm.findFields().gfield("model", "collect", this.model);
                    // checked
                    this.model.souboryZverejnit = this.$gridVyveseniSoubory.ggrid("getSelection", false, true); //nacteni pres referenci
                    if (this.model.souboryZverejnit.length == 0) {
                        this.dialogs.warning("jres:24450026"); //RC 24450026 : Není vybrán žádný soubor k vyvěšení.
                        return;
                    }
                    //////////////////////////////////////
                    // Už bylo něco vyvěšeno, na to se přeptám
                    //////////////////////////////////////
                    if (this.model.historie && this.model.historie.length > 0) {
                        this.dialogs.confirm("jres:24450059", //RC 24450059 : Dotaz
                        "jres:24450060" //RC 24450060 : Zveřejnění již bylo provedeno, viz záložka Historie.
                            + "<br/>"
                            + "jres:24450068") //RC 24450068 : Přejete si zveřejnění zopakovat?
                            .on("yes", function () { that.saveDetailReal(); });
                    }
                    else {
                        this.saveDetailReal();
                    }
                } // saveDetail()
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Uložení (vlastní)
                 */
                saveDetailReal() {
                    let that = this;
                    console.log("Gordic.Uda.WebControls.VyveseniTabs.saveDetailReal()", this);
                    this.call("SaveDetail", { model: this.model } /*, null, { applyValidationResultTo: ff } */)
                        .done(function (r) {
                        console.log("VyveseniTabs.saveDetailReal().done()");
                        //console.log("Gordic.Uda.WebControls.Vyveseni.saveDetail.done that", that.model);
                        that.actions.actVyvesit.enabled(false);
                        let text = "";
                        if (that.model.is_automaticke_vyveseni === true) {
                            text += "jres:24450027"; //RC 24450027 : Vyvěšení bylo úspěšné.
                            text += "<br/>" + "jres:24450076"; //RC 24450076 : Viditelnost na desce je dále řízena datumem vyvěšení a sejmutí.
                        }
                        else {
                            text += "jres:24450074"; //RC 24450074 : Návrh na vyvěšení byl úspěšný.
                            text += "<br/>" + "jres:24450075"; //RC 24450075 : K zobrazení na desce musí projít schválením.
                        }
                        let dlg = that.dialogs.alert(text);
                        dlg.on("close", function () { that.close(); });
                    })
                        .fail(function (xhr, type, vobj) {
                        console.log("VyveseniTabs.saveDetailReal().fail()");
                        if (type === "validation") {
                            let msg = "jres:24450028" + ":<br/>"; //RC 24450028 : Chyba validace (server)
                            $.each(vobj, function (k, v) {
                                for (let i = 0; i < v.length; i++)
                                    msg += k + ": " + v[i].message + "<br/>";
                            });
                            that.dialogs.error(msg);
                        }
                    });
                } // saveDetailReal()
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Zobrazení detailu k řádku historie (data se berou z gridu – i data gridu souborů)
                 */
                showHistoryDetail() {
                    let that = this;
                    let sel;
                    sel = this.$gridHistory.ggrid("getSelection");
                    if (sel.length == 1) {
                        let row = sel[0];
                        // vyčištění
                        this.$historyDetailTabObsah.empty();
                        $("<div>")
                            .appendTo(this.$historyDetailTabObsah)
                            .gform("createFrom", new Gordic.Forms.Form({ name: "formNahledHistorieVyveseni", layoutDescriptor: "L1M1S1, breaks-200-500" })
                            .addSection("jres:24450062") //RC 24450062 : Detail historie
                            .addRow("ID").addField("gstaticfield", { name: "ixs_ulo_and_por_cislo" })
                            .addRow("jres:24450047").addField("gstaticfield", { name: "stav" }) //RC 24450047 : Stav
                            .addRow("jres:24450034").addField("gstaticfield", { name: "nazev_kat" }) //RC 24450034 : Kategorie
                            .addRow("jres:24450035").addField("gstaticfield", { name: "nazev_zdroj" }) //RC 24450035 : Zdroj
                            .addRow("jres:24450036").addField("gstaticfield", { name: "dat_od", itemTemplate: "{#:date}" }) //RC 24450036 : Vyvěšení
                            .addRow("jres:24450037").addField("gstaticfield", { name: "dat_do", itemTemplate: "{#:date}" }) //RC 24450037 : Sejmutí
                            //.addSection("&nbsp;")
                            .addRow("jres:24450016").addField("gstaticfield", { name: "nazev" }) //RC 24450016 : Název
                            .addRow("jres:24450017").addField("gstaticfield", { name: "popis" }) //RC 24450017 : Popis
                            .addRow("jres:24450038").addField("gstaticfield", { name: "nazev_ref" }) //RC 24450038 : Vyvěšení provedl
                            .addRow("jres:24450039").addField("gstaticfield", { name: "dat_zmena", itemTemplate: "{#:datetime}" }) //RC 24450039 : Datum změny
                            .addRow("jres:24450040").addField("gstaticfield", { name: "zmenu_prov_txt" }) //RC 24450040 : Změnu provedl
                            .addSection("jres:24450049") //RC 24450049 : Vyvěšené soubory
                        );
                        let histFilesGridDiv = $("<div>")
                            .appendTo(this.$historyDetailTabObsah)
                            .ggrid({
                            //columnMode: "fit", // rozšíří width sloupců na šíři gridu
                            columns: new Gordic.Data.GridFormat()
                                .addIconColumn({
                                name: "soubor_pri",
                                caption: "jres:24450051", //RC 24450051 : Typ souboru
                                customClass: "center cursor_help",
                                width: 30,
                                fixedWidth: true,
                                iconTemplate: function (row) {
                                    let pripona = row.soubor_pri;
                                    if (pripona != null) {
                                        switch (pripona) {
                                            case "pdf": return { icon: "fa-file-pdf-o", tooltip: pripona };
                                            case "txt": return { icon: "fa-file-text-o", tooltip: pripona };
                                            case "zip": return { icon: "fa-file-archive-o", tooltip: pripona };
                                            case "doc": return { icon: "fa-file-word-o", tooltip: pripona };
                                            case "docx": return { icon: "fa-file-word-o", tooltip: pripona };
                                            case "xls": return { icon: "fa-file-excel-o", tooltip: pripona };
                                            case "xlsx": return { icon: "fa-file-excel-o", tooltip: pripona };
                                            case "xml": return { icon: "fa-file-code-o", tooltip: pripona };
                                            case "jpg": return { icon: "fa-file-image-o", tooltip: pripona };
                                            case "jpeg": return { icon: "fa-file-image-o", tooltip: pripona };
                                            case "png": return { icon: "fa-file-image-o", tooltip: pripona };
                                            case "gif": return { icon: "fa-file-image-o", tooltip: pripona };
                                            default: return { icon: "fa-file-o", tooltip: pripona };
                                        }
                                    }
                                    else {
                                        return null;
                                    }
                                }
                            })
                                .addTextColumn({
                                name: "velikost_txt",
                                caption: "jres:24450050", //RC 24450050 : Velikost
                                width: 120,
                                fixedWidth: true
                            })
                                .addTextColumn({
                                name: "soubor",
                                caption: "jres:24450032", //RC 24450032 : Soubor
                                width: 300
                            })
                                .addTextColumn({
                                name: "poznamka",
                                caption: "jres:24450017", //RC 24450017 : Popis
                                width: 400
                            })
                        })
                            .gautofit(); // bude mít Height až dolu
                        // nastavení dat a překreslení gridu
                        if (row.SouboryHistorie != null) {
                            let view = new Gordic.Data.View(row.SouboryHistorie, { key: "ixs_ulo, por_cislo, ixs_ulo_pri" });
                            histFilesGridDiv.ggrid("setData", view);
                        }
                        // naplnění
                        this.$historyDetailTabObsah.findFields().gfield("model", "apply", row);
                    } // if
                } // showHistoryDetail()
            }; // cls
            VyveseniTabs = __decorate([
                gcontent
            ], VyveseniTabs);
            WebControls.VyveseniTabs = VyveseniTabs;
        })(WebControls = Uda.WebControls || (Uda.WebControls = {}));
    })(Uda = Gordic.Uda || (Gordic.Uda = {}));
})(Gordic || (Gordic = {})); // ns
var Gordic;
(function (Gordic) {
    var Uda;
    (function (Uda) {
        var WebControls;
        (function (WebControls) {
            let gcontent = Decorators.gcontent;
            /**
             * SeznamVyveseni
             *
             * @author Jindřich Vácha
             * @since 480.2.0.0
             */
            let SeznamVyveseni = class SeznamVyveseni extends Gordic.GContentBase {
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Definice formuláře
                 */
                onContentReady() {
                    this.taskId = "actSeznamVyveseni";
                    let that = this;
                    console.log("Gordic.Uda.WebControls.SeznamVyveseni.onContentReady", this);
                    // akce seznamu
                    this.actions.addRange({
                        actSample: {
                            name: "actSample",
                            caption: "Sample " + this.model.ixp,
                            icon: "gi-detail",
                            run: function (ev, ctx) {
                                alert(1);
                            }
                        }
                    });
                    this.menuBar(this.actions.createBar(["actSample*"]));
                    // aktuální filtr
                    this.currentFilter = null;
                    var filterFormDef = new Gordic.Forms.Form({ tabLabel: "Kompletní filtr" })
                        .addSection()
                        .addRow("ixs_ulo").addField("gstringbox", { name: "ixs_ulo" })
                        .addRow("por_cislo").addField("gnumberbox", { name: "por_cislo" });
                    this.$filterForm = $("<div>").appendTo(this.element)
                        .gfilterpanel({
                        forms: [filterFormDef],
                        favorites: ["ixs_ulo"],
                        favoriteLayoutDescriptor: "L4M3S1",
                        tema: "ude_sez_vyv",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        saveOptionsForm: "all",
                        searchButtonOnMainRow: true,
                        apply: function (event, obj) {
                            // načtení dat podle filtrů
                            that.nacteniSeznamu(obj.filter);
                        }
                    });
                    // vytvoření gridu
                    this.$grid = $("<div>")
                        .appendTo(that.element)
                        .ggrid({
                        multi: true,
                        searchColumns: ["nazev", "popis", "nazev_ref", "zmenu_prov_txt"],
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "ixs_ulo",
                            caption: "ixs_ulo_c",
                            width: 120,
                            fixedWidth: true
                            //customClass: "ui-disabled"
                        })
                            .addTextColumn({
                            name: "por_cislo",
                            caption: "por_cislo_c",
                            fixedWidth: true,
                            width: 50
                        })
                            .addIconColumn({
                            caption: "Stav",
                            name: "s_ude",
                            iconTemplate: function (row) {
                                let s_ude = row.s_ude;
                                let stav = row.stav;
                                if (s_ude != null && stav != null) {
                                    switch (s_ude) {
                                        case 0: return {
                                            icon: "gi-paper" /*gi-paper2-02 "fa-file-o"*/, tooltip: stav
                                        }; // návrh
                                        case 10: return {
                                            icon: "gi-tick" /*"fa-file-text-o" */, tooltip: stav
                                        }; // vyvěšeno
                                        case 20: return {
                                            icon: "gi-bin" /*gi-window-close" /*"fa-file" */, tooltip: stav
                                        }; // zrušeno
                                        case 30: return {
                                            icon: "gi-history" /*"gi-schvyr" /*"fa-file-archive-o" */, tooltip: stav
                                        }; // sejmuto nebo fa-file-text?
                                        default: return null;
                                    }
                                }
                                else {
                                    return null;
                                }
                            }
                        })
                            .addTextColumn({
                            caption: "Ixp",
                            name: "ixp_wflspid",
                            width: 100
                        })
                            .addTextColumn({
                            caption: "jres:24450082", //RC 24450082 : IČO
                            name: "ico",
                            width: 65
                        })
                            .addTextColumn({
                            caption: "Kategorie",
                            name: "nazev_kat",
                            width: 120
                        })
                            .addTextColumn({
                            caption: "Název",
                            name: "nazev",
                            width: 150
                        })
                            .addTextColumn({
                            caption: "Značka/Čj",
                            name: "cj",
                            width: 120
                        })
                            .addTextColumn({
                            caption: "Zdroj",
                            name: "nazev_zdroj",
                            width: 120
                        })
                            .addDateColumn({
                            caption: "Vyvěšení",
                            name: "dat_od",
                            width: 80
                        })
                            .addDateColumn({
                            caption: "Sejmutí",
                            name: "dat_do",
                            width: 80
                        })
                            .addTextColumn({
                            caption: "Popis",
                            name: "popis",
                            width: 150
                        })
                            .addTextColumn({
                            caption: "Vyvěšení provedl",
                            name: "nazev_ref",
                            width: 120
                        })
                            .addDateTimeColumn({
                            caption: "Datum změny",
                            name: "dat_zmena",
                            width: 120
                        })
                            .addTextColumn({
                            caption: "Změnu provedl",
                            name: "zmenu_prov_txt",
                            width: 120
                        })
                    }).gautofit(); // ggrid
                } // onContentReady
                //-----------------------------------------------------------------------------------------------------
                nacteniSeznamu(filterModel) {
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
                        // zapamatování aktuálního filtru kvůli tiskům
                        this.currentFilter = filterModel;
                        // TODO: dát sem začátek a konec operace nebo se to tam dělá samo?
                        this.call("GetSeznamVyveseni", { filter: filterModel })
                            .done(function (data) {
                            var view = new Gordic.Data.View(data, { key: "ixs_ulo, por_cislo" });
                            // nastavení dat a překreslení gridu
                            that.$grid.ggrid("setData", view);
                            // nastavení okna
                            that.enable();
                        });
                    }
                } // nacteniSeznamu
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    //// aktuální zápočtový list
                    //var aktZL = FucGrid.currentRow<Gordic.Fuc.Interface.GSeznamZapoctovychListuDto>(this.$grid);
                    //// akce seznamu
                    //this.actions.actPodani!.enabled(this.PovolenoPodani);
                    //this.actions.actDetail!.enabled(aktZL !== null);
                    //this.actions.actTisk!.enabled(aktZL !== null);
                } // enable
            }; // cls
            SeznamVyveseni = __decorate([
                gcontent
            ], SeznamVyveseni);
            WebControls.SeznamVyveseni = SeznamVyveseni;
        })(WebControls = Uda.WebControls || (Uda.WebControls = {}));
    })(Uda = Gordic.Uda || (Gordic.Uda = {}));
})(Gordic || (Gordic = {})); // ns
var Gordic;
(function (Gordic) {
    var Uda;
    (function (Uda) {
        var WebControls;
        (function (WebControls) {
            let gcontent = Decorators.gcontent;
            /**
             * Zveřejnění el. obrazu / přílohy do poblikačního úložiště
             *
             * @author Jindřich Vácha
             * @since 480.2.0.0
             */
            let ZverejneniTabs = class ZverejneniTabs extends Gordic.GContentBase {
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Definice formuláře
                 */
                onContentReady() {
                    let that = this;
                    console.log("Gordic.Uda.WebControls.ZverejneniTabs.onContentReady", this);
                    this.taskId = this.model.hist_only ? "actZverejneniHistTab" : "actZverejneniTabs";
                    this.isZverejneniTabAlreadyLoaded = false;
                    this.isHistorieTabAlreadyLoaded = false;
                    this.actions.addRange({
                        // GSUBTASKS (taby)
                        actZverejneniTab: {
                            enabled: true,
                            caption: "jres:24450045", //RC 24450045 : Zveřejnění
                            run: function () {
                                that.LoadZverejneniTab();
                            }
                        },
                        actHistorieTab: {
                            enabled: true,
                            caption: "jres:24450056", //RC 24450056 : Historie
                            run: function () {
                                that.LoadHistorieTab();
                            }
                        },
                        // tlačidla
                        actZverejnit: {
                            name: "actZverejnit",
                            caption: "jres:24450065", //RC 24450065 : Zveřejnit
                            icon: "fa-save",
                            run: function (ev, ctx) {
                                that.saveDetail();
                            }
                        },
                        actCancel: {
                            name: "actCancel",
                            caption: "jres:24450058", //RC 24450058 : Zrušit
                            icon: "gi-window-close",
                            run: function (ev, ctx) {
                                that.tryClose();
                            }
                        },
                    });
                    if (!this.model.hist_only) {
                        // Okno se zveřejněním –> Subtasky + LoadZverejneni
                        $("<div>").appendTo(this.element)
                            .gsubtasks({
                            params: [
                                //caption se vezme rovnou z act...
                                { action: this.actions.actZverejneniTab },
                                { action: this.actions.actHistorieTab },
                            ],
                        });
                        this.LoadZverejneniTab();
                    } // !hist_only
                    else {
                        // jen historii
                        this.LoadHistorieTab();
                        // commandbar (tlačítka na spodu okna)
                        this.commandBar([
                            { action: this.actions.actCancel },
                        ]);
                    }
                } // onContentReady
                //-----------------------------------------------------------------------------------------------------
                /**
                 * 'closing()' okna – test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<any>} promise (resolve = je možné zavřít, reject = není možné zavřít), boolean určuje, jestli přeselektovat seznam (true) nebo ne (false)
                 */
                closing() {
                    console.log("ZverejneniTabs.closing()", this);
                    // kontrola na změněné položky
                    let def = $.Deferred();
                    if (this.defaultForm == undefined || this.defaultForm == null || this.defaultForm.gform == undefined || this.defaultForm.gform == null) {
                        console.log("defaultForm neexistuje (je null) => zavřu Tab");
                        def.resolve();
                        return def.promise();
                    }
                    let formChanged = this.defaultForm.gform("hasChanged");
                    if (formChanged) {
                        console.log("byly změny => dotaz na zavření");
                        this.dialogs.confirm("jres:24450059", //RC 24450059 : Dotaz
                        "jres:24450083") //RC 24450083 : Chcete zavřít okno bez uložení změn?
                            .on("yes", def.resolve)
                            .on("close", def.reject);
                    }
                    else {
                        console.log("nebyly změny => zavřu Tab");
                        def.resolve();
                    }
                    return def.promise();
                } // closing
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Tab (subtask) 'Zveřejnění'
                 */
                LoadZverejneniTab() {
                    let that = this;
                    console.log("Gordic.Uda.WebControls.ZverejneniTabs.ZverejneniTab()", this);
                    // nejsou práva - ukončim
                    if (this.model.lze_zverejnit === 0) {
                        let dlg = this.dialogs.warning("jres:24450014"); //RC 24450014 : K dané operaci nemáte dostatečná oprávnění.
                        dlg.on("close", function () { that.close(); });
                        return;
                    }
                    // schovám historii
                    if (this.$historyDiv) {
                        this.$historyDiv.hide();
                        console.log("hiding historyDiv...");
                    }
                    if (this.isZverejneniTabAlreadyLoaded == false) {
                        this.isZverejneniTabAlreadyLoaded = true;
                        console.log("...loading tab", this);
                        this.$zverejneniDiv = $("<div>").appendTo(this.element);
                        this.defaultForm = $("<div>")
                            .appendTo(this.$zverejneniDiv)
                            .gform("createFrom", new Gordic.Forms.Form({
                            name: "formZverejneni",
                            layoutDescriptor: "L1M1S1, breaks-200-500"
                            //layoutDescriptor: "L2M2S1"
                        })
                            .addSection()
                            .addRow("jres:24450064") //RC 24450064 : Ixb
                            .addField("gstringbox", { name: "ixb", disabled: true, flag: "required" })
                            // schovám ?, když není vyplněno, tak je prázdné...
                            .addRow("jres:24450052") //RC 24450052 : Ixp
                            .addField("gstringbox", { name: "ixp", disabled: true })
                            .addRow("jres:24450032") //RC 24450032 : Soubor
                            .addField("gstringbox", { name: "soubor", disabled: true })
                            .addRow("jres:24450029") //RC 24450029 : Typ
                            .addField("gstringbox", { name: "typ", disabled: true })
                            .addRow("jres:24450042") //RC 24450042 : Titulek
                            .addField("gstringbox", { name: "nazev", flag: "required" })
                            .addRow("jres:24450017") //RC 24450017 : Popis
                            .addField("gstringbox", { name: "popis", rows: 2 })
                            .addRow("jres:24450018") //RC 24450018 : Místo
                            .addField("gselectbox", Gordic.Prefabs.Select.wflsulz(), {
                            name: "ulozisteField",
                            model: "uloziste = ixs_ulz",
                            flag: "required",
                            serverFilters: {
                                priz_pub: 10,
                                priz_ud: 0
                            }
                        }) // gselectbox
                            .addRow("jres:24450019") //RC 24450019 : Složka
                            .addField("gselectbox", Gordic.Prefabs.Select.wfldulz(), {
                            name: "slozkaField",
                            flag: "required",
                            model: "slozka = ktg_dms",
                            serverFilters: {
                                ixs_ulz: new Gordic.Forms.Dependency("ulozisteField", "ixs_ulz", true)
                            }
                        }) // gselectbox
                        ); // .gform
                        // commandbar (tlačítka na spodu okna)
                        this.commandBar([
                            { action: this.actions.actZverejnit },
                            { action: this.actions.actCancel },
                        ]);
                        if (this.model.flash) {
                            this.showFlash({ label: this.model.flash, customClass: 'g-state-info' });
                        }
                        this.defaultForm.findFields()
                            .gfield("model", "apply", this.model, { initialValues: true })
                            .gfield("model", "validators", this.validators);
                    } // isZverejneniTabAlreadyLoaded
                    else {
                        console.log("...already loaded", this);
                    }
                    // zobrazím zveřejnění
                    if (this.$zverejneniDiv != null) {
                        this.$zverejneniDiv.show();
                    }
                    if (this.actions.actZverejnit) {
                        this.actions.actZverejnit.visible(true);
                    }
                } // LoadZverejneniTab()
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Tab (subtask) historie
                 */
                LoadHistorieTab() {
                    let that = this;
                    console.log("Gordic.Uda.WebControls.VyveseniTabs.HistorieTab()", this);
                    // schovám zveřejnění
                    if (this.$zverejneniDiv) {
                        this.$zverejneniDiv.hide();
                        console.log("$zverejneniDiv.hide()");
                    }
                    if (this.actions.actZverejnit) {
                        this.actions.actZverejnit.visible(false);
                        console.log("actZverejnit.visible(false)");
                    }
                    // vybuduju zveřejnění
                    if (this.isHistorieTabAlreadyLoaded == false) { // první otevření Subtasku
                        this.isHistorieTabAlreadyLoaded = true;
                        console.log("...loading", this);
                        this.$historyDiv = $("<div>").appendTo(this.element);
                        this.$gridHistory = $("<div>") //;  //vytvoreni elementu pro $gridHistory
                            //.height(250)        //nastaveni vysky $gridHistory
                            .gautofit()
                            .appendTo(this.$historyDiv)
                            .ggrid({
                            //columnMode: "full", // srazí width sloupců na def. hodnoty
                            marking: false,
                            rowNumbers: false,
                            selection: function (ev, obj) {
                                that.showHistoryDetail();
                            },
                            searchColumns: ["nazev_ulz", "nazev_sloz", "nazev_rf", "soubor", "titule", "popis"],
                            columns: new Gordic.Data.GridFormat()
                                .addTextColumn({
                                name: "ixb",
                                caption: "Ixb",
                                width: 130,
                                fixedWidth: true
                                //, visible: false
                            })
                                .addDateTimeColumn({
                                name: "dat_zmena",
                                caption: "jres:24450069" //RC 24450069 : Datum zveřejnění
                                ,
                                width: 130,
                                fixedWidth: true
                            })
                                .addTextColumn({
                                name: "nazev_ulz",
                                caption: "jres:24450041" //RC  : Úložiště
                                ,
                                width: 130
                            })
                                .addTextColumn({
                                name: "nazev_sloz",
                                caption: "jres:24450019" //RC 24450019 : Složka
                                ,
                                width: 130
                            })
                                .addTextColumn({
                                name: "soubor",
                                caption: "jres:24450032" //RC 24450032 : Soubor
                                ,
                                width: 130
                            })
                                .addTextColumn({
                                name: "titulek",
                                caption: "jres:24450042" //RC 24450042 : Titulek
                                ,
                                width: 130
                            })
                                .addTextColumn({
                                name: "popis",
                                caption: "jres:24450017" //RC 24450017 : Popis
                                ,
                                width: 130
                            })
                                .addTextColumn({
                                name: "nazev_rf",
                                caption: "jres:24450070" //RC 24450070 : Zveřejnil
                                ,
                                width: 130
                            })
                        });
                        this.$historyDetailTabObsah = $("<div>")
                            .appendTo(this.$historyDiv);
                        let view = new Gordic.Data.View(this.model.historie, { key: "ixs_ulo,por_cislo" }); //key je dulezity kvuli pripadnemu vyhledavani radku
                        this.$gridHistory.ggrid("setData", view);
                    } // první otevření Subtasku
                    else {
                        console.log("...already loaded", this);
                    }
                    // zobrazím historii
                    if (this.$historyDiv != null) {
                        this.$historyDiv.show();
                    }
                } // LoadHistorieTab()
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Stisk tlačítka [Zveřejnit]
                 */
                saveDetail() {
                    let that = this;
                    //////////////////////////////////////
                    // provedu všechny kontroly
                    //////////////////////////////////////
                    console.log("Gordic.Uda.WebControls.ZverejneniTabs.saveDetail()", this);
                    //Vyvolani validace (pouze v JS bez volani serveru)
                    if (!this.defaultForm.gform("isValid")) {
                        return;
                    }
                    let ff = this.defaultForm.findFields( /*"text2, text3"*/) //NOTE: Lze zadavat name jednotlivych fieldu
                        .gfield("model", "collect", this.model);
                    console.log("saveDetail() – after collect", this.model);
                    //////////////////////////////////////
                    // Už bylo něco vyvěšeno, na to se přeptám
                    //////////////////////////////////////
                    if (this.model.historie && this.model.historie.length > 0) {
                        this.dialogs.confirm("jres:24450059", //RC 24450059 : Dotaz
                        "jres:24450060" //RC 24450060 : Zveřejnění již bylo provedeno, viz záložka Historie.
                            + "<br/>"
                            + "jres:24450061") //RC 24450061 : Přejete si zveřejnění zopakovat?
                            .on("yes", function () { that.saveDetailReal(); });
                    }
                    else {
                        this.saveDetailReal();
                    }
                } // saveDetail()
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Uložení (vlastní)
                 */
                saveDetailReal() {
                    let that = this;
                    console.log("Gordic.Uda.WebControls.ZverejneniTabs.saveDetailReal()", this);
                    this.call("SaveDetail", { model: this.model } /*, null, { applyValidationResultTo: ff } */)
                        .done(function (r) {
                        console.log("ZverejneniTabs.saveDetailReal().done()");
                        //console.log("Gordic.Uda.WebControls.Zverejneni.saveDetail.done that", that.model);
                        that.actions.actZverejnit.enabled(false);
                        that.dialogs.alert("jres:24450066") //RC 24450066 : Zveřejnění bylo úspěšné.
                            .on("close", function () { that.close(); });
                    })
                        .fail(function (xhr, type, vobj) {
                        console.log("ZverejneniTabs.saveDetailReal().fail()");
                        if (type === "validation") {
                            let msg = "jres:24450028" + ":<br/>"; //RC 24450028 : Chyba validace (server)
                            $.each(vobj, function (k, v) {
                                for (let i = 0; i < v.length; i++)
                                    msg += k + ": " + v[i].message + "<br/>";
                            });
                            that.dialogs.error(msg);
                        }
                    });
                } // SaveDetailReal()
                //-----------------------------------------------------------------------------------------------------
                /**
                 * Zobrazení detailu k řádku historie (data se berou z gridu – i data gridu souborů)
                 */
                showHistoryDetail() {
                    let that = this;
                    let sel;
                    sel = this.$gridHistory.ggrid("getSelection");
                    if (sel.length == 1) {
                        let row = sel[0];
                        // vyčištění
                        this.$historyDetailTabObsah.empty();
                        $("<div>")
                            .appendTo(this.$historyDetailTabObsah)
                            .gform("createFrom", new Gordic.Forms.Form({ name: "formNahledHistorieZverejneni", layoutDescriptor: "L1M1S1, breaks-200-500" })
                            .addSection("jres:24450062") //RC 24450062 : Detail historie
                            .addRow("Ixb").addField("gstaticfield", { name: "ixb" })
                            .addRow("jres:24450069") //RC 24450069 : Datum zveřejnění
                            .addField("gstaticfield", { name: "dat_zmena", itemTemplate: "{#:datetime}" })
                            .addRow("jres:24450041") //RC 24450041 : Úložiště
                            .addField("gstaticfield", { name: "nazev_ulz" })
                            .addRow("jres:24450019") //RC 24450019 : Složka
                            .addField("gstaticfield", { name: "nazev_sloz" })
                            .addRow("jres:24450032") //RC 24450032 : Soubor
                            .addField("gstaticfield", { name: "soubor" })
                            .addRow("jres:24450042") //RC 24450042 : Titulek
                            .addField("gstaticfield", { name: "titulek" })
                            .addRow("jres:24450017") //RC 24450017 : Popis
                            .addField("gstaticfield", { name: "popis" })
                            .addRow("jres:24450070") //RC 24450070 : Zveřejnil
                            .addField("gstaticfield", { name: "nazev_rf" }));
                        // naplnění
                        this.$historyDetailTabObsah.findFields().gfield("model", "apply", row);
                    } // if sel.length == 1
                } // showHistoryDetail()
            }; // cls
            ZverejneniTabs = __decorate([
                gcontent
            ], ZverejneniTabs);
            WebControls.ZverejneniTabs = ZverejneniTabs;
        })(WebControls = Uda.WebControls || (Uda.WebControls = {}));
    })(Uda = Gordic.Uda || (Gordic.Uda = {}));
})(Gordic || (Gordic = {})); // ns
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWRhLndlYmNvbnRyb2xzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJHVWRhRGlhbG9ncy50cyIsIk9iZWNuZVRlc3R5LnRzIiwiU2FtcGxlUGFnZS50cyIsIlRlc3RCZXpDUy50cyIsIlZ5dmVzZW5pVGFicy9WeXZlc2VuaVRhYnMudHMiLCJaYXpuYW15L1Nlem5hbVZ5dmVzZW5pLnRzIiwiWnZlcmVqbmVuaVRhYnMvWnZlcmVqbmVuaVRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7OztHQUtHO0FBQ0gsSUFBVSxNQUFNLENBNElmO0FBNUlELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRJbkI7SUE1SWdCLFdBQUEsR0FBRztRQUFDLElBQUEsT0FBTyxDQTRJM0I7UUE1SW9CLFdBQUEsT0FBTztZQUV4Qix1R0FBdUc7WUFDdkc7Ozs7O2VBS0c7WUFDSCxTQUFnQixxQkFBcUIsQ0FDakMsYUFBdUIsRUFDdkIsR0FxQkMsRUFDRCxXQUFrRDtnQkFHbEQsTUFBTSxPQUFPLEdBQUc7b0JBQ1osR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUztvQkFDOUIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUztvQkFDOUIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztvQkFDbEMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztpQkFDckMsQ0FBQztnQkFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzdFLFdBQVcsR0FBRyxNQUFN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QUMsT0FBTyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ25FLEtBQUssS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ2hFLEtBQUssTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ2pFLEtBQUssS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ2pFLEtBQUssTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ2xFLEtBQUssS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ2hFLEtBQUssS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ2pFLEtBQUssTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ2xFLEtBQUssS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ2pFLEtBQUssS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ2pFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzt3Q0FDNUQs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QyxzQkFBc0I7YUFFM0IsQ0FBQSxDQUFDLE1BQU07WUFwZUssY0FBYztnQkFEMUIsUUFBUTtlQUNJLGNBQWMsQ0FvZTFCO1lBcGVZLDBCQUFjLGlCQW9lMUIsQ0FBQTtRQUNMLENBQUMsRUEvZW9CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQStlL0I7SUFBRCxDQUFDLEVBL2VnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUErZW5CO0FBQUQsQ0FBQyxFQS9lUyxNQUFNLEtBQU4sTUFBTSxRQStlZixDQUFDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogR1VkYURpYWxvZ3MudHNcclxuICogXHJcbiAqIEBhdXRob3IgSmluZMWZaWNoIFbDoWNoYVxyXG4gKiBAc2luY2UgNDgwLjIuMC4wXHJcbiAqL1xyXG5uYW1lc3BhY2UgR29yZGljLlVkYS5EaWFsb2dzIHtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKipcclxuICAgICAqIFZ5dsSbxaFlbsOtIG5hIMO6xZllZG7DrSBkZXNrdVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIEppbmTFmWljaCBWw6FjaGFcclxuICAgICAqIEBzaW5jZSA0ODAuMi4wLjBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFZ5dmVzZW5pTmFVcmVkbmlEZXNrdShcclxuICAgICAgICBwYXJlbnRDb250ZW50OiBHQ29udGVudCxcclxuICAgICAgICBvcHQ/OiB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBJeHAgZG9rbGFkdSDigJMgcG92aW5uw6lcclxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIEl4cDogc3RyaW5nLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogSXhiIHNvdWJvcnUg4oCTIHZvbGl0ZWxuw6ksIGJ1ZGUgemHFoWtydG51dFxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgSXhiPzogc3RyaW5nLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogTsOhemV2IOKAkyB2b2xpdGVsbsOpLCBwxZllZHZ5cGxuw60gc2VcclxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIE5hemV2Pzogc3RyaW5nLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUG9waXMg4oCTIHZvbGl0ZWxuw6ksIHDFmWVkdnlwbG7DrSBzZVxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgUG9waXM/OiBzdHJpbmdcclxuICAgICAgICB9LFxyXG4gICAgICAgIE1vZE90ZXZyZW5pPzogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pXHJcbiAgICApOiBKUXVlcnkgfCB1bmRlZmluZWQge1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBJeHA6IG9wdCA/IG9wdC5JeHAgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIEl4Yjogb3B0ID8gb3B0Lkl4YiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgTmF6ZXY6IG9wdCA/IG9wdC5OYXpldiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgUG9waXM6IG9wdCA/IG9wdC5Qb3BpcyA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHBDb250ZW50ID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuWmtvbnRyb2x1akNvbnRlbnQocGFyZW50Q29udGVudCk7XHJcbiAgICAgICAgTW9kT3RldnJlbmkgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5VcHJhdk1vZE90ZXZybmkocENvbnRlbnQsIE1vZE90ZXZyZW5pKTtcclxuXHJcbiAgICAgICAgaWYgKE1vZE90ZXZyZW5pLmluZGV4T2YoXCJuYXZpZ2F0ZVwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAocENvbnRlbnQgYXMgYW55KVtNb2RPdGV2cmVuaV0oXCJHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlZ5dmVzZW5pVGFic1wiLCBvcHRpb25zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgocENvbnRlbnQgYXMgR0NvbnRlbnQpLmRpYWxvZ3MgPyAocENvbnRlbnQgYXMgR0NvbnRlbnQpLmRpYWxvZ3MgOiBwQ29udGVudCkgYXMgYW55KVxyXG4gICAgICAgICAgICBbTW9kT3RldnJlbmldKFwiR29yZGljLlVkYS5XZWJDb250cm9scy5WeXZlc2VuaVRhYnNcIiwgb3B0aW9ucywgeyB0aXRsZTogXCJqcmVzOkdvcmRpYy5VZGEuV2ViQ29udHJvbHM6MjQ0NTAwNjNcIiwgd2lkdGg6IDEwMDAsIGhlaWdodDogNjUwIH0pOyAgLy9SQyAyNDQ1MDA2MyA6IFZ5dsSbxaFlbsOtIG5hIMO6xZllZG7DrSBkZXNrdVxyXG4gICAgICAgIH1cclxuICAgIH0gLy8gVnl2ZXNlbmlOYVVyZWRuaURlc2t1KClcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKipcclxuICAgICAqIFp2ZcWZZWpuxJtuw60gc291Ym9ydVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIEppbmTFmWljaCBWw6FjaGFcclxuICAgICAqIEBzaW5jZSA0ODAuMi4wLjBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFp2ZXJlam5lbmlTb3Vib3J1KFxyXG4gICAgICAgIHBhcmVudENvbnRlbnQ6IEdDb250ZW50LFxyXG4gICAgICAgIG9wdD86IHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEl4YiBzb3Vib3J1IOKAkyBwb3Zpbm7DqVxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgSXhiOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBJeHAgZG9rbGFkdSDigJMgdm9saXRlbG7DqSwgYWxlIHJhZMSbamkgdXbDqXN0XHJcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBJeHA/OiBzdHJpbmcsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBOw6F6ZXYgLyB0aXR1bGVrIOKAkyB2b2xpdGVsbsOpLCBwxZllZHZ5cGxuw60gc2VcclxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIE5hemV2Pzogc3RyaW5nLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUG9waXMg4oCTIHZvbGl0ZWxuw6ksIHDFmWVkdnlwbG7DrSBzZVxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgUG9waXM/OiBzdHJpbmdcclxuICAgICAgICB9LFxyXG4gICAgICAgIE1vZE90ZXZyZW5pPzogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pXHJcbiAgICApOiBKUXVlcnkgfCB1bmRlZmluZWQge1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBJeGI6IG9wdCA/IG9wdC5JeGIgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIEl4cDogb3B0ID8gb3B0Lkl4cCA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgTmF6ZXY6IG9wdCA/IG9wdC5OYXpldiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgUG9waXM6IG9wdCA/IG9wdC5Qb3BpcyA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHBDb250ZW50ID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuWmtvbnRyb2x1akNvbnRlbnQocGFyZW50Q29udGVudCk7XHJcbiAgICAgICAgTW9kT3RldnJlbmkgPSBHb3JkaWMuR2luLkdsb2JhbHMuRGlhbG9ncy5VcHJhdk1vZE90ZXZybmkocENvbnRlbnQsIE1vZE90ZXZyZW5pKTtcclxuXHJcbiAgICAgICAgaWYgKE1vZE90ZXZyZW5pLmluZGV4T2YoXCJuYXZpZ2F0ZVwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAocENvbnRlbnQgYXMgYW55KVtNb2RPdGV2cmVuaV0oXCJHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlp2ZXJlam5lbmlUYWJzXCIsIG9wdGlvbnMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoKChwQ29udGVudCBhcyBHQ29udGVudCkuZGlhbG9ncyA/IChwQ29udGVudCBhcyBHQ29udGVudCkuZGlhbG9ncyA6IHBDb250ZW50KSBhcyBhbnkpXHJcbiAgICAgICAgICAgIFtNb2RPdGV2cmVuaV0oXCJHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlp2ZXJlam5lbmlUYWJzXCIsIG9wdGlvbnMsIHsgdGl0bGU6IFwianJlczpHb3JkaWMuVWRhLldlYkNvbnRyb2xzOjI0NDUwMDcyXCIsIHdpZHRoOiAxMDAwLCBoZWlnaHQ6IDY1MCB9KTsgIC8vUkMgMjQ0NTAwNzIgOiBadmXFmWVqbsSbbsOtIHNvdWJvcnVcclxuICAgICAgICB9XHJcbiAgICB9IC8vIFp2ZXJlam5lbmlTb3Vib3J1KClcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKipcclxuICAgICAqIFp2ZcWZZWpuxJtuw60gc291Ym9ydVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIEppbmTFmWljaCBWw6FjaGFcclxuICAgICAqIEBzaW5jZSA0ODAuMi4wLjBcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFp2ZXJlam5lbmlTb3Vib3J1SGlzdG9yaWUoXHJcbiAgICAgICAgcGFyZW50Q29udGVudDogR0NvbnRlbnQsXHJcbiAgICAgICAgb3B0Pzoge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogSXhiIHNvdWJvcnUg4oCTIHBvdmlubsOpXHJcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBJeGI6IHN0cmluZ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTW9kT3RldnJlbmk/OiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmlcclxuICAgICk6IEpRdWVyeSB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgSXhiOiBvcHQgPyBvcHQuSXhiIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBIaXN0T25seTogdHJ1ZSAvLyBqZW4gaGlzdG9yaWlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBwQ29udGVudCA9IEdvcmRpYy5HaW4uR2xvYmFscy5EaWFsb2dzLlprb250cm9sdWpDb250ZW50KHBhcmVudENvbnRlbnQpO1xyXG4gICAgICAgIE1vZE90ZXZyZW5pID0gR29yZGljLkdpbi5HbG9iYWxzLkRpYWxvZ3MuVXByYXZNb2RPdGV2cm5pKHBDb250ZW50LCBNb2RPdGV2cmVuaSk7XHJcblxyXG4gICAgICAgIGlmIChNb2RPdGV2cmVuaS5pbmRleE9mKFwibmF2aWdhdGVcIikgPiAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKHBDb250ZW50IGFzIGFueSlbTW9kT3RldnJlbmldKFwiR29yZGljLlVkYS5XZWJDb250cm9scy5admVyZWpuZW5pVGFic1wiLCBvcHRpb25zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgocENvbnRlbnQgYXMgR0NvbnRlbnQpLmRpYWxvZ3MgPyAocENvbnRlbnQgYXMgR0NvbnRlbnQpLmRpYWxvZ3MgOiBwQ29udGVudCkgYXMgYW55KVxyXG4gICAgICAgICAgICBbTW9kT3RldnJlbmldKFwiR29yZGljLlVkYS5XZWJDb250cm9scy5admVyZWpuZW5pVGFic1wiLCBvcHRpb25zLCB7IHRpdGxlOiBcImpyZXM6R29yZGljLlVkYS5XZWJDb250cm9sczoyNDQ1MDA3MlwiLCB3aWR0aDogMTAwMCwgaGVpZ2h0OiA2NTAgfSk7ICAvL1JDIDI0NDUwMDcyIDogWnZlxZllam7Em27DrSBzb3Vib3J1XHJcbiAgICAgICAgfVxyXG4gICAgfSAvLyBadmVyZWpuZW5pU291Ym9ydUhpc3RvcmllKClcclxuXHJcbn0gLy8gbnMiLCJuYW1lc3BhY2UgR29yZGljLlVkYS5XZWJDb250cm9scyB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVsWhZW9iZWNuw6kgdGVzdHlcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIEppbmTFmWljaCBWw6FjaGFcclxuICAgICAqIEBzaW5jZSA0ODAuMi4wLjBcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgT2JlY25lVGVzdHkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0YXNrSWQgPSBcImFjdE9iZWNuZVRlc3R5XCI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG1vZGVsIChkZWZpbm92YW5lIGpha28gQ29udGVudFZhbHVlcylcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLlVkYS5XZWJDb250cm9scy5PYmVjbmVUZXN0eUR0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWw6IEdvcmRpYy5VZGEuV2ViQ29udHJvbHMuT2JlY25lVGVzdHlEdG87XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG1vZGVsIChkZWZpbm92YW5lIGpha28gQ29udGVudFZhbHVlcylcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLlVkYS5XZWJDb250cm9scy5PYmVjbmVUZXN0eUR0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQganNvblByb3A/OiBHb3JkaWMuVWRhLldlYkNvbnRyb2xzLk9iZWNuZVRlc3R5RHRvO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlVkYS5XZWJDb250cm9scy5PYmVjbmVUZXN0eS5vbkNvbnRlbnRSZWFkeVwiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgLy8gVnl2xJvFoWVuw61cclxuICAgICAgICAgICAgICAgIGFjdFZ5dmVzZW5pMToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Vnl2ZXNlbmkxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeXbEm8WhZW7DrSAobm90aGluZytiZXogaXhiLCBuw6F6dnUgYSBwb3Bpc3UpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3RldnJpVnl2ZXNlbmkodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Vnl2ZXNlbmkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeXZlc2VuaTJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5dsSbxaFlbsOtIChhdXRvKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm90ZXZyaVZ5dmVzZW5pKEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5hdXRvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlVkYS5EaWFsb2dzLlZ5dmVzZW5pTmFVcmVkbmlEZXNrdShcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAsIHsgSXhwOiBcIkRFTU9YMDAxNUJCRVwiLCBJeGI6IFwiXCIsIE5hemV2OiBcIlZ5dsSbxaFlbsOtIChhdXRvKVwiLCBQb3BpczogXCJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICwgR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLmF1dG9cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFZ5dmVzZW5pMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Vnl2ZXNlbmkzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeXbEm8WhZW7DrSAobmF2aWdhdGUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3RldnJpVnl2ZXNlbmkoR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLm5hdmlnYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlVkYS5EaWFsb2dzLlZ5dmVzZW5pTmFVcmVkbmlEZXNrdShcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAsIHsgSXhwOiBcIkRFTU9YMDAxNUJCRVwiLCBJeGI6IFwiXCIsIE5hemV2OiBcIlZ5dsSbxaFlbsOtIChuYXZpZ2F0ZSlcIiwgUG9waXM6IFwiXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAsIEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5uYXZpZ2F0ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Vnl2ZXNlbmk0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeXZlc2VuaTRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5dsSbxaFlbsOtIChuYXZpZ2F0ZVRhc2spXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3RldnJpVnl2ZXNlbmkoR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLm5hdmlnYXRlVGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIEdvcmRpYy5VZGEuRGlhbG9ncy5WeXZlc2VuaU5hVXJlZG5pRGVza3UoXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXRcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLCB7IEl4cDogXCJERU1PWDAwMTVCQkVcIiwgSXhiOiBcIlwiLCBOYXpldjogXCJWeXbEm8WhZW7DrSAobmF2aWdhdGVUYXNrKVwiLCBQb3BpczogXCJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICwgR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLm5hdmlnYXRlVGFza1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Vnl2ZXNlbmk1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeXZlc2VuaTVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5dsSbxaFlbsOtIChzaG93TW9kYWxXaW5kb3cpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3RldnJpVnl2ZXNlbmkoR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIEdvcmRpYy5VZGEuRGlhbG9ncy5WeXZlc2VuaU5hVXJlZG5pRGVza3UoXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXRcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLCB7IEl4cDogXCJERU1PWDAwMTVCQkVcIiwgSXhiOiBcIlwiLCBOYXpldjogXCJWeXbEm8WhZW7DrSAoc2hvd01vZGFsV2luZG93KVwiLCBQb3BpczogXCJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICwgR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvd1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Vnl2ZXNlbmk2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeXZlc2VuaTZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5dsSbxaFlbsOtIChzaG93V2luZG93KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm90ZXZyaVZ5dmVzZW5pKEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93V2luZG93KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlVkYS5EaWFsb2dzLlZ5dmVzZW5pTmFVcmVkbmlEZXNrdShcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAsIHsgSXhwOiBcIkRFTU9YMDAxNUJCRVwiLCBJeGI6IFwiXCIsIE5hemV2OiBcIlZ5dsSbxaFlbsOtIChzaG93V2luZG93KVwiLCBQb3BpczogXCJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICwgR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLnNob3dXaW5kb3dcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgIC8vIFp2ZcWZZWpuxJtuw61cclxuICAgICAgICAgICAgICAgIGFjdFp2ZXJlam5lbmkxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RadmVyZWpuZW5pMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnZlxZllam7Em27DrSAobm90aGluZyArIGJleiBpeHAsIG7DoXp2dSBhIHBvcGlzdSlcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlVkYS5EaWFsb2dzLlp2ZXJlam5lbmlTb3Vib3J1KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7IEl4YjogXCJERU1PMEMwMTFETTZcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyxHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFp2ZXJlam5lbmkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RadmVyZWpuZW5pMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnZlxZllam7Em27DrSAoYXV0bylcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlVkYS5EaWFsb2dzLlp2ZXJlam5lbmlTb3Vib3J1KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7IEl4YjogXCJERU1PMEMwMTFETTZcIiwgSXhwOiBcIlwiLCBOYXpldjogXCJadmXFmWVqbsSbbsOtIChhdXRvKVwiLCBQb3BpczogXCJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5hdXRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFp2ZXJlam5lbmkzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RadmVyZWpuZW5pM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnZlxZllam7Em27DrSAobmF2aWdhdGUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5VZGEuRGlhbG9ncy5admVyZWpuZW5pU291Ym9ydShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgeyBJeGI6IFwiREVNTzBDMDExRE02XCIsIEl4cDogXCJcIiwgTmF6ZXY6IFwiWnZlxZllam7Em27DrSAobmF2aWdhdGUpXCIsIFBvcGlzOiBcIlwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLm5hdmlnYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFp2ZXJlam5lbmk0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RadmVyZWpuZW5pNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnZlxZllam7Em27DrSAobmF2aWdhdGVUYXNrKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVWRhLkRpYWxvZ3MuWnZlcmVqbmVuaVNvdWJvcnUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHsgSXhiOiBcIkRFTU8wQzAxMURNNlwiLCBJeHA6IFwiXCIsIE5hemV2OiBcIlp2ZcWZZWpuxJtuw60gKG5hdmlnYXRlVGFzaylcIiwgUG9waXM6IFwiXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkubmF2aWdhdGVUYXNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFp2ZXJlam5lbmk1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RadmVyZWpuZW5pNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnZlxZllam7Em27DrSAoc2hvd01vZGFsV2luZG93KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVWRhLkRpYWxvZ3MuWnZlcmVqbmVuaVNvdWJvcnUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHsgSXhiOiBcIkRFTU8wQzAxMURNNlwiLCBJeHA6IFwiXCIsIE5hemV2OiBcIlp2ZcWZZWpuxJtuw60gKHNob3dNb2RhbFdpbmRvdylcIiwgUG9waXM6IFwiXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFp2ZXJlam5lbmk2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RadmVyZWpuZW5pNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnZlxZllam7Em27DrSAoc2hvd1dpbmRvdylcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlVkYS5EaWFsb2dzLlp2ZXJlam5lbmlTb3Vib3J1KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7IEl4YjogXCJERU1PMEMwMTFETTZcIiwgSXhwOiBcIlwiLCBOYXpldjogXCJadmXFmWVqbsSbbsOtIChzaG93V2luZG93KVwiLCBQb3BpczogXCJcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93V2luZG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgIC8vIFp2ZXJlam5lbmlTb3Vib3J1SGlzdG9yaWVcclxuICAgICAgICAgICAgICAgIGFjdFp2ZXJlam5lbmlIaXN0b3JpZTE6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFp2ZXJlam5lbmlIaXN0b3JpZTFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlp2ZcWZZWpuxJtuw60gKG5vdGhpbmcpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5VZGEuRGlhbG9ncy5admVyZWpuZW5pU291Ym9ydUhpc3RvcmllKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7IEl4YjogXCJERU1PMEMwMTFETTZcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyxHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFp2ZXJlam5lbmlIaXN0b3JpZTI6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFp2ZXJlam5lbmlIaXN0b3JpZTJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlp2ZcWZZWpuxJtuw60gKGF1dG8pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5VZGEuRGlhbG9ncy5admVyZWpuZW5pU291Ym9ydUhpc3RvcmllKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7IEl4YjogXCJERU1PMEMwMTFETTZcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5Nb2RPdGV2cmVuaS5hdXRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFp2ZXJlam5lbmlIaXN0b3JpZTM6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFp2ZXJlam5lbmlIaXN0b3JpZTNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlp2ZcWZZWpuxJtuw60gKG5hdmlnYXRlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVWRhLkRpYWxvZ3MuWnZlcmVqbmVuaVNvdWJvcnVIaXN0b3JpZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgeyBJeGI6IFwiREVNTzBDMDExRE02XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkubmF2aWdhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0WnZlcmVqbmVuaUhpc3RvcmllNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WnZlcmVqbmVuaUhpc3RvcmllNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnZlxZllam7Em27DrSAobmF2aWdhdGVUYXNrKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVWRhLkRpYWxvZ3MuWnZlcmVqbmVuaVNvdWJvcnVIaXN0b3JpZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgeyBJeGI6IFwiREVNTzBDMDExRE02XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkubmF2aWdhdGVUYXNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFp2ZXJlam5lbmlIaXN0b3JpZTU6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFp2ZXJlam5lbmlIaXN0b3JpZTVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlp2ZcWZZWpuxJtuw60gKHNob3dNb2RhbFdpbmRvdylcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlVkYS5EaWFsb2dzLlp2ZXJlam5lbmlTb3Vib3J1SGlzdG9yaWUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHsgSXhiOiBcIkRFTU8wQzAxMURNNlwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RadmVyZWpuZW5pSGlzdG9yaWU2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RadmVyZWpuZW5pSGlzdG9yaWU2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJadmXFmWVqbsSbbsOtIChzaG93V2luZG93KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVWRhLkRpYWxvZ3MuWnZlcmVqbmVuaVNvdWJvcnVIaXN0b3JpZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgeyBJeGI6IFwiREVNTzBDMDExRE02XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkuc2hvd1dpbmRvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICBhY3RKc29uUHJvcGVydHlTZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEpzb25Qcm9wZXJ0eVNldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSnNvbiBQcm9wZXJ0eSAoc2V0KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEpzb25Qcm9wZXJ0eShldiwgY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0SnNvblByb3BlcnR5RW1wdHk6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEpzb25Qcm9wZXJ0eUVtcHR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJKc29uIFByb3BlcnR5IChlbXB0eSlcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbXB0eUpzb25Qcm9wZXJ0eShldiwgY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0U2Vzc2lvblNldDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2Vzc2lvblNldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU2Vzc2lvbiAoU2V0KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFNlc3Npb24oZXYsIGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFNlc3Npb25FbXB0eToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2Vzc2lvbkVtcHR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTZXNzaW9uIChlbXB0eSlcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbXB0eVNlc3Npb24oZXYsIGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdExvZ05hc3RhdmVuaToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0TG9nTmFzdGF2ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJMb2cgbmFzdGF2ZW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZ05hc3RhdmVuaShldiwgY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VmFyTGV0VGVzdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VmFyTGV0VGVzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVmFyIHggTGV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmFyTGV0VGVzdChldiwgY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1xyXG4gICAgICAgICAgICAgICAgW1wiVnl2xJvFoWVuw60qXCIsIC8vIG1haW4gKyBzdWJcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFZ5dmVzZW5pMVwiLCBcImFjdFZ5dmVzZW5pMlwiLCAvKlwiYWN0Vnl2ZXNlbmkzXCIsIFwiYWN0Vnl2ZXNlbmk0XCIsKi8gXCJhY3RWeXZlc2VuaTVcIiwgXCJhY3RWeXZlc2VuaTZcIlxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFtcIlp2ZcWZZWpuxJtuw60qXCIsIC8vIG1haW4gKyBzdWJcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFp2ZXJlam5lbmkxXCIsIFwiYWN0WnZlcmVqbmVuaTJcIiwgLypcImFjdFp2ZXJlam5lbmkzXCIsIFwiYWN0WnZlcmVqbmVuaTRcIiwqLyBcImFjdFp2ZXJlam5lbmk1XCIsIFwiYWN0WnZlcmVqbmVuaTZcIlxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIFtcIkhpc3RvcmllIHp2ZcWZZWpuxJtuw60qXCIsIC8vIG1haW4gKyBzdWJcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFp2ZXJlam5lbmlIaXN0b3JpZTFcIiwgXCJhY3RadmVyZWpuZW5pSGlzdG9yaWUyXCIsIFwiYWN0WnZlcmVqbmVuaUhpc3RvcmllM1wiLCBcImFjdFp2ZXJlam5lbmlIaXN0b3JpZTRcIiwgXCJhY3RadmVyZWpuZW5pSGlzdG9yaWU1XCIsIFwiYWN0WnZlcmVqbmVuaUhpc3RvcmllNlwiXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RKc29uUHJvcGVydHlTZXQqXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdEpzb25Qcm9wZXJ0eUVtcHR5KlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RTZXNzaW9uU2V0KlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RTZXNzaW9uRW1wdHkqXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdExvZ05hc3RhdmVuaSpcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0VmFyTGV0VGVzdCpcIlxyXG5cclxuICAgICAgICAgICAgXSkpOyAvLyBtZW51QmFyXHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybVRlc3R5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIGJyZWFrcy0yMDAtNTAwXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkl4cFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIml4cFwiLCBpbml0aWFsVmFsdWU6IFwiREVNT1gwMDE1QkJFXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOhemV2XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwibmF6ZXZcIiwgaW5pdGlhbFZhbHVlOiBcIlRvdG8gamUgbsOhemV2XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9waXNcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJwb3Bpc1wiLCBpbml0aWFsVmFsdWU6IFwiQSB0b2hsZSBqZSBwb3BpcyBwcm9zw61tXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiTG9nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwibG9nXCIsIHJvd3M6IDE1IH0pXHJcbiAgICAgICAgICAgICAgICApOyAvLyBnZm9ybVxyXG5cclxuXHJcbiAgICAgICAgfSAvLyBvbkNvbnRlbnRSZWFkeVxyXG5cclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG90ZXZyaVZ5dmVzZW5pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbml9IG1vZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb3RldnJpVnl2ZXNlbmkobW9kOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuTW9kT3RldnJlbmkgfCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBvcHQgPSAge1xyXG4gICAgICAgICAgICAgICAgSXhwOiB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwiaXhwXCIpLmdmaWVsZChcImdldFZhbHVlXCIpLFxyXG4gICAgICAgICAgICAgICAgSXhiOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBOYXpldjogdGhpcy5qc29uUHJvcCA/IHRoaXMuanNvblByb3AubmF6ZXYhIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgUG9waXM6IHRoaXMuanNvblByb3AgPyB0aGlzLmpzb25Qcm9wLnBvcGlzISA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuVWRhLkRpYWxvZ3MuVnl2ZXNlbmlOYVVyZWRuaURlc2t1KFxyXG4gICAgICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICAgICAgICAgLCBvcHRcclxuICAgICAgICAgICAgICAgICwgbW9kXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRKc29uUHJvcGVydHkoZXYsIGN0eCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmpzb25Qcm9wID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcIm5hemV2XCIsIFwicG9waXNcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMuanNvblByb3ApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2dOYXN0YXZlbmkoZXYsIGN0eCk7XHJcbiAgICAgICAgfSAvLyBzZXRKc29uUHJvcGVydHlcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHByaXZhdGUgZW1wdHlKc29uUHJvcGVydHkoZXYsIGN0eCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmpzb25Qcm9wID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2dOYXN0YXZlbmkoZXYsIGN0eCk7XHJcblxyXG4gICAgICAgIH0gLy8gZW1wdHlKc29uUHJvcGVydHlcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHByaXZhdGUgc2V0U2Vzc2lvbihldiwgY3R4KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcIm5hemV2XCIsIFwicG9waXNcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMubW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYWxsPHZvaWQ+KFwiU2V0U2Vzc2lvblwiLCB7IG1vZGVsOiB0aGlzLm1vZGVsIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2dOYXN0YXZlbmkoZXYsIGN0eCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieGhyLCB0eXBlLCB2b2JqXCIsIHhociwgdHlwZSwgdm9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJEb8WhbG8gayBjaHlixJsgKHZpeiBsb2cpXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gLy8gc2V0U2Vzc2lvblxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgcHJpdmF0ZSBlbXB0eVNlc3Npb24oZXYsIGN0eCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbDx2b2lkPihcIkVtcHR5U2Vzc2lvblwiKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9nTmFzdGF2ZW5pKGV2LCBjdHgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInhociwgdHlwZSwgdm9ialwiLCB4aHIsIHR5cGUsIHZvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiRG/FoWxvIGsgY2h5YsSbICh2aXogbG9nKVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gLy8gZW1wdHlTZXNzaW9uXHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBwcml2YXRlIGxvZ05hc3RhdmVuaShldiwgY3R4KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBsb2cgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgbG9nICs9IFwiLS0gSnNvblByb3BlcnR5IC0tXCIgKyBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuanNvblByb3ApIHtcclxuICAgICAgICAgICAgICAgIGxvZyArPSBcIm5hemV2OiBcIiArIHRoaXMuanNvblByb3AubmF6ZXYgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgbG9nICs9IFwicG9waXM6IFwiICsgdGhpcy5qc29uUHJvcC5wb3BpcyArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2cgKz0gXCJ0aGlzLmpzb25Qcm9wOlwiICsgdGhpcy5qc29uUHJvcCArIFwiXFxuXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxvZyArPSBcIi0tIFNlc3Npb24gLS0gXCIgKyBcIlxcblwiXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGw8T2JlY25lVGVzdHlEdG8+KFwiR2V0U2Vzc2lvblwiKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHZ5c2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodnlzbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cgKz0gXCJuYXpldjpcIiArIHZ5c2wubmF6ZXYgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cgKz0gXCJwb3BpczpcIiArIHZ5c2wucG9waXMgKyBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZyArPSBcInZ5c2w6XCIgKyB2eXNsICsgXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcImxvZ1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBsb2cpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInhociwgdHlwZSwgdm9ialwiLCB4aHIsIHR5cGUsIHZvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiRG/FoWxvIGsgY2h5YsSbICh2aXogbG9nKVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IC8vIHNldEpzb25Qcm9wZXJ0eVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgcHJpdmF0ZSB2YXJMZXRUZXN0KGV2LCBjdHgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHBydm5pX3Y7XHJcbiAgICAgICAgICAgIHBydm5pX3YgPSBcInBydm5pIHZhclwiO1xyXG4gICAgICAgICAgICBpZiAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRydWhhX3Y7XHJcbiAgICAgICAgICAgICAgICBkcnVoYV92ID0gXCJkcnVoYSB2YXJcIlxyXG4gICAgICAgICAgICAgICAgbGV0IGRydWhhX2w7XHJcbiAgICAgICAgICAgICAgICBkcnVoYV9sID0gXCJkcnVoYSBsZXRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2coZHJ1aGFfdik7XHJcbiAgICAgICAgICAgIC8vdHJldGlfdisrO1xyXG4gICAgICAgICAgICBsZXQgdHJldGlfdjtcclxuICAgICAgICAgICAgLy90aGlzLmxvZyh0cmV0aV92KTsgLy9OT1RFOiBCTWFydGluZWsgMjEuOS4yMDE4IC0gcHJvbWVubmEgbG9nIGplIG5hIGdjb250ZW50dSBwcm8gbG9nb3ZhbmksIHBscy4gcHJlam1lbnVqIHNpIG1ldG9kdS4gRGlrXHJcbiAgICAgICAgICAgIC8vdGhpcy5sb2coZHJ1aGFfbCk7XHJcbiAgICAgICAgfSAvLyBtXHJcblxyXG4gICAgICAgIC8vTk9URTogQk1hcnRpbmVrIDIxLjkuMjAxOCAtIHByb21lbm5hIGxvZyBqZSBuYSBnY29udGVudHUgcHJvIGxvZ292YW5pLCBwbHMuIHByZWptZW51aiBzaSBtZXRvZHUuIERpa1xyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvL3ByaXZhdGUgbG9nKHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIC8vICAgIGxldCBhVGV4dCA9IHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJsb2dcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgLy8gICAgaWYgKGFUZXh0ID09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgYVRleHQgPSBcIlwiO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKFwibG9nXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGFUZXh0ICsgdGV4dCArIFwiXFxuXCIpO1xyXG4gICAgICAgIC8vfSAvLyBtXHJcblxyXG4gICAgfSAvLyBjbHNcclxufSAvLyBucyIsIm5hbWVzcGFjZSBHb3JkaWMuVWRhLldlYkNvbnRyb2xzIHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoqXHJcbiAgICAgKiBTYW1wbGVQYWdlXHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciBKaW5kxZlpY2ggVsOhY2hhXHJcbiAgICAgKiBAc2luY2UgNDgwLjIuMC4wXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIFNhbXBsZVBhZ2UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBtb2RlbFxyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlNhbXBsZVBhZ2VEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsOiBHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlNhbXBsZVBhZ2VEdG87XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGFza0lkID0gXCJhY3RTYW1wbGVQYWdlXCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvcmRpYy5VZGEuV2ViQ29udHJvbHMuU2FtcGxlUGFnZS5vbkNvbnRlbnRSZWFkeVwiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2Ugc2V6bmFtdVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0U2FtcGxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYW1wbGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNhbXBsZSBcIiArIHRoaXMubW9kZWwuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2FtcGxlKlwiXSkpO1xyXG5cclxuICAgICAgICB9IC8vIG9uQ29udGVudFJlYWR5XHJcblxyXG4gICAgfSAvLyBjbHNcclxufSAvLyBucyIsIm5hbWVzcGFjZSBHb3JkaWMuVWRhLldlYkNvbnRyb2xzIHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0IGJleiBjc1xyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgSmluZMWZaWNoIFbDoWNoYVxyXG4gICAgICogQHNpbmNlIDQ4MC4yLjAuMFxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBUZXN0QmV6Q3MgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0YXNrSWQgPSBcImFjdFRlc3RCZXpDc1wiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlVkYS5XZWJDb250cm9scy5hY3RUZXN0QmV6Q3Mub25Db250ZW50UmVhZHlcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgIH0gLy8gb25Db250ZW50UmVhZHlcclxuXHJcbiAgICB9IC8vIGNsc1xyXG59IC8vIG5zIiwibmFtZXNwYWNlIEdvcmRpYy5VZGEuV2ViQ29udHJvbHMge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZ5dsSbxaFlbsOtIG5hIMO6xZllZG7DrSBkZXNrdVxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgSmluZMWZaWNoIFbDoWNoYVxyXG4gICAgICogQHNpbmNlIDQ4MC4yLjAuMFxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBWeXZlc2VuaVRhYnMgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0YXNrSWQgPSBcImFjdFZ5dmVzZW5pVGFic1wiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNhaCB0YWJ1IChzdWJ0YXNrdSkgdnl2xJvFoWVuw61cclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJHZ5dmVzZW5pRGl2OiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzYWggdGFidSAoc3VidGFza3UpIGhpc3RvcmllXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRoaXN0b3J5RGl2OiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBzZSBzb3Vib3JhbWEgcHJvIHZ5dsSbxaFlbsOtXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkVnl2ZXNlbmlTb3Vib3J5OiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBzIGhpc3RvcmnDrVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZEhpc3Rvcnk6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWw71waXMgZGV0YWlsdSDFmcOhZGt1IGhpc3RvcmllIChkeW5hbWlja3kgcMWZaSB6bcSbbsSbIMWZw6Fka3Ug4oCTIHpkcm9qZW0gcHJvIGRhdGEgamUgaGlzdG9yeSBncmlkKVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkaGlzdG9yeURldGFpbFRhYk9ic2FoOiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBzIHZ5dsSbxaFlbsO9bWEgc291Ym9yYW1hIHUgesOhem5hbXUgaGlzdG9yaWVcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRIaXN0b3J5U291Ym9yeTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaZGEgdcW+IGRvxaFsbyBrIGxvYWR1IHZ5dmVzZW5pIHRhYlxyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaXNWeXZlc2VuaVRhYkFscmVhZHlMb2FkZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpkYSB1xb4gZG/FoWxvIGsgbG9hZHUgaGlzdC4gdGFiXHJcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBpc0hpc3RvcmllVGFiQWxyZWFkeUxvYWRlZDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogbW9kZWwgKGRlZmlub3ZhbmUgamFrbyBDb250ZW50VmFsdWVzKVxyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlZ5dmVzZW5pVGFic0R0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWw6IEdvcmRpYy5VZGEuV2ViQ29udHJvbHMuVnl2ZXNlbmlUYWJzRHRvO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHZhbGlkYXRvcnMgKGRlZmlub3ZhbmUgamFrbyBDb250ZW50VmFsdWVzKVxyXG4gICAgICAgICAqIEB0eXBlIHthbnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHZhbGlkYXRvcnM6IGFueTtcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlZ5dmVzZW5pVGFicy5vbkNvbnRlbnRSZWFkeVwiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNWeXZlc2VuaVRhYkFscmVhZHlMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc0hpc3RvcmllVGFiQWxyZWFkeUxvYWRlZCA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIHN0YXJ0IGdyYWZpY2vDqSDEjcOhc3RpXHJcblxyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG5cclxuICAgICAgICAgICAgLy8gR1NVQlRBU0tTICh0YWJ5KVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0Vnl2ZXNlbmlUYWI6IHsgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuTG9hZFZ5dmVzZW5pVGFiKCk7IH0gfSxcclxuICAgICAgICAgICAgICAgIGFjdEhpc3RvcmllVGFiOiB7IGVuYWJsZWQ6IHRydWUsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LkxvYWRIaXN0b3JpZVRhYigpOyB9IH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nc3VidGFza3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuaXNfYXV0b21hdGlja2Vfdnl2ZXNlbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcImpyZXM6MjQ0NTAwMzZcIiAvL1JDIDI0NDUwMDM2IDogVnl2xJvFoWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImpyZXM6MjQ0NTAwODFcIiwgLy9SQyAyNDQ1MDA4MSA6IE7DoXZyaCBuYSB2eXbEm8WhZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Vnl2ZXNlbmlUYWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDU2XCIsIC8vUkMgMjQ0NTAwNTYgOiBIaXN0b3JpZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0SGlzdG9yaWVUYWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkxvYWRWeXZlc2VuaVRhYigpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSBwcm8gdnl2xJvFoWVuw61cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHRleHR5IGRvIHJlc291cmNlXHJcbiAgICAgICAgICAgICAgICBhY3RWeXZlc2l0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeXZlc2l0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogLy9cIk9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuaXNfYXV0b21hdGlja2Vfdnl2ZXNlbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJqcmVzOjI0NDUwMDU3XCIgLy9SQyAyNDQ1MDA1NyA6IFZ5dsSbc2l0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwianJlczoyNDQ1MDA3N1wiLCAvL1JDIDI0NDUwMDc3IDogTsOhdnJoXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1zYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkgeyB0aGF0LnNhdmVEZXRhaWwoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdENhbmNlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2FuY2VsXCIsIGNhcHRpb246IFwianJlczoyNDQ1MDA1OFwiLCBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLCBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7IHRoYXQudHJ5Q2xvc2UoKTsgfSAvL1JDIDI0NDUwMDU4IDogWnJ1xaFpdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBjb21tYW5kYmFyICh0bGHEjcOtdGthIG5hIHNwb2R1IG9rbmEpXHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFZ5dmVzaXQgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Q2FuY2VsIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuZmxhc2gpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHsgbGFiZWw6IHRoaXMubW9kZWwuZmxhc2gsIGN1c3RvbUNsYXNzOiAnZy1zdGF0ZS1pbmZvJyB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9pZiAoIXRoaXMubW9kZWwubHplX3pvYnJheml0KSB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuZGlhbG9ncy53YXJuaW5nKFwianJlczoyNDQ1MDAyMlwiKS5vbihcImNsb3NlXCIsIGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpIH0pOyAvL1JDIDI0NDUwMDIyIDogTmVtw6F0ZSBwcsOhdm8gayB6b2JyYXplbsOtIGVsLiBvYnJhenUgYSBwxZnDrWxvaC5cclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvLyBvbnkgdHkgbHplXy4uLiB2xJtjaSBqc291IHNwxZlhxb5lbnkgcyBleGlzdGVuY8OtIGVsLiBvYnJhenUgYSBwxZnDrWxvaCA9PiBwb2t1ZCBlbC4gb2JyYXogbmVleGlzdHVqZSwgdGFrIHRvIGplbiBvdHJhdnVqZS4uLlxyXG4gICAgICAgICAgICAvL2lmICghdGhpcy5tb2RlbC5semVfenZlcmVqbml0X29iciAmJiAhdGhpcy5tb2RlbC5semVfenZlcmVqbml0X3ByaSkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzLmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MjQ0NTAwMjNcIik7IC8vUkMgMjQ0NTAwMjMgOiBOZW3DoXRlIHByw6F2byBrIHZ5dsSbxaFlbsOtIGVsLiBvYnJhenUgYSBwxZnDrWxvaC5cclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vZWxzZSBpZiAoIXRoaXMubW9kZWwubHplX3p2ZXJlam5pdF9vYnIpIHtcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOjI0NDUwMDI0XCIpOyAvL1JDIDI0NDUwMDI0IDogTmVtw6F0ZSBwcsOhdm8gayB2eXbEm8WhZW7DrSBlbC4gb2JyYXp1LlxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9lbHNlIGlmICghdGhpcy5tb2RlbC5semVfenZlcmVqbml0X3ByaSkge1xyXG4gICAgICAgICAgICAvLyAgICB0aGlzLmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MjQ0NTAwMjVcIik7IC8vUkMgMjQ0NTAwMjUgOiBOZW3DoXRlIHByw6F2byBrIHZ5dsSbxaFlbsOtIGVsLiBwxZnDrWxvaC5cclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgIH0gLy8gb25Db250ZW50UmVhZHlcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICdjbG9zaW5nKCknIG9rbmEg4oCTIHRlc3QsIGplc3RsaSBqZSBtb8W+bsOpIG9rbm8gemF2xZnDrXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxhbnk+fSBwcm9taXNlIChyZXNvbHZlID0gamUgbW/Fvm7DqSB6YXbFmcOtdCwgcmVqZWN0ID0gbmVuw60gbW/Fvm7DqSB6YXbFmcOtdCksIGJvb2xlYW4gdXLEjXVqZSwgamVzdGxpIHDFmWVzZWxla3RvdmF0IHNlem5hbSAodHJ1ZSkgbmVibyBuZSAoZmFsc2UpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVnl2ZXNlbmlUYWJzLmNsb3NpbmcoKVwiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBub3dTb3ViIDogU291Ym9yRHRvW10gPSB0aGlzLiRncmlkVnl2ZXNlbmlTb3Vib3J5LmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsZXMgYXQgc3RhcnRcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubW9kZWwuc291Ym9yeVp2ZXJlam5pdEF0U3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaWxlcyBub3dcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vd1NvdWIpO1xyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyBrb250cm9sYSBuYSB6bcSbbsSbbsOpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgIGxldCBmb3JtQ2hhbmdlZCA9IHRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vbGV0IGFTb3ViID0gdGhpcy4kZ3JpZFZ5dmVzZW5pU291Ym9yeS5nZ3JpZChcImdldFNlbGVjdGlvblwiLCBmYWxzZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgYXRTdGFydCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBqdXN0Tm93ID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1vZGVsLnNvdWJvcnladmVyZWpuaXRBdFN0YXJ0IS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYXRTdGFydCArPSB0aGlzLm1vZGVsLnNvdWJvcnladmVyZWpuaXRBdFN0YXJ0IVtpXS5peGIgKyBcIixcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5vd1NvdWIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGp1c3ROb3cgKz0gbm93U291YltqXS5peGIgKyBcIixcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImF0U3RhcnRcIiwgYXRTdGFydCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwianVzdE5vd1wiLCBqdXN0Tm93KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmaWxlc0NoZWNrZWRDaGFuZ2VkID0gKGF0U3RhcnQgIT09IGp1c3ROb3cpO1xyXG4gICAgICAgICAgICAvL2xldCBzb3ViQ2hhbmdlZCA9ICh4KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbGVzQ2hlY2tlZENoYW5nZWRcIiwgZmlsZXNDaGVja2VkQ2hhbmdlZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZm9ybUNoYW5nZWRcIiwgZm9ybUNoYW5nZWQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgaWYgKGZvcm1DaGFuZ2VkIHx8IGZpbGVzQ2hlY2tlZENoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRvdGF6IG5hIHphdsWZZW7DrVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmNvbmZpcm0oXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjI0NDUwMDU5XCIsIC8vUkMgMjQ0NTAwNTkgOiBEb3RhelxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczoyNDQ1MDA4M1wiKSAvL1JDIDI0NDUwMDgzIDogQ2hjZXRlIHphdsWZw610IG9rbm8gYmV6IHVsb8W+ZW7DrSB6bcSbbj9cclxuICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZGVmLnJlc29sdmUgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGRlZi5yZWplY3QgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHBva3VkIHNlIG5lZWRpdHVqZSwgamUgbW/Fvm7DqSBkZXRhaWwgemF2xZnDrXRcclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfSAvLyBjbG9zaW5nXHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWIgKHN1YnRhc2spICdWeXbEm8WhZW7DrSdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIExvYWRWeXZlc2VuaVRhYigpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlVkYS5XZWJDb250cm9scy5WeXZlc2VuaVRhYnMuVnl2ZXNlbmlUYWIoKVwiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNjaG92w6FtIGhpc3RvcmlpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRoaXN0b3J5RGl2ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGhpc3RvcnlEaXYuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB2eWJ1ZHVqdSB2eXbEm8WhZW7DrVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1Z5dmVzZW5pVGFiQWxyZWFkeUxvYWRlZCA9PSBmYWxzZSkgeyAvLyBwcnZuw60gb3RldsWZZW7DrSBTdWJ0YXNrdVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Z5dmVzZW5pVGFiQWxyZWFkeUxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIuLi5sb2FkaW5nXCIsIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuJHZ5dmVzZW5pRGl2ID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLiR2eXZlc2VuaURpdilcclxuICAgICAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybVZ5dmVzZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBicmVha3MtMjAwLTUwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQ0NTAwNTJcIikgLy9SQyAyNDQ1MDA1MiA6IEl4cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsIGRpc2FibGVkOiB0cnVlLCBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDc5XCIpIC8vUkMgMjQ0NTAwNzkgOiBBa2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2XCIsIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDE2XCIpIC8vUkMgMjQ0NTAwMTYgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsIGZsYWc6IFwicmVxdWlyZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDAxN1wiKSAvL1JDIDI0NDUwMDE3IDogUG9waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsIHJvd3M6IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQ0NTAwMThcIikgLy9SQyAyNDQ1MDAxOCA6IE3DrXN0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2Zsc3VseigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWxvemlzdGVGaWVsZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInVsb3ppc3RlID0gaXhzX3VselwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfdWQ6IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgLy8gZ3NlbGVjdGJveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDAzNFwiKSAvL1JDIDI0NDUwMDM0IDogS2F0ZWdvcmllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxkdWx6KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbG96a2FGaWVsZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNsb3prYSA9IGt0Z19kbXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfdWx6OiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJ1bG96aXN0ZUZpZWxkXCIsIFwiaXhzX3VselwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIC8vIGdzZWxlY3Rib3hcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQ0NTAwMjBcIikgLy9SQyAyNDQ1MDAyMCA6IFZ5dsSbxaFlbsOtIGRuZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZFwiLCBmbGFnOiBcInJlcXVpcmVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQ0NTAwMjFcIikgLy9SQyAyNDQ1MDAyMSA6IFNlam11dMOtIGRuZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKTsgLy8gZ2Zvcm1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRncmlkVnl2ZXNlbmlTb3Vib3J5ID0gJChcIjxkaXY+XCIpLy87ICAvL3Z5dHZvcmVuaSBlbGVtZW50dSBwcm8gZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLiR2eXZlc2VuaURpdilcclxuICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8U291Ym9yRHRvW10+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3NDaGVja2VkOiBcImlzX2NoZWNrZWRcIiwgLy96YXNrcnRuZSBjaGIsIGplLWxpIHByb21lbm5hIHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiaXhiXCIsIFwic291Ym9yXCIsIFwicG96bmFta2FcIl0sIC8vc2xvdXBjZSwgcG9kbGUga3RlcnljaCBzZSB2eWhsZWRhdmEgdiBzZWFyY2hib3h1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQ0NTAwMjlcIiwgLy9SQyAyNDQ1MDAyOSA6IFR5cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDMxXCIsIC8vUkMgMjQ0NTAwMzEgOiBJRCBzb3Vib3J1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic291Ym9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDMyXCIsIC8vUkMgMjQ0NTAwMzIgOiBTb3Vib3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQ0NTAwMTdcIiwgLy9SQyAyNDQ1MDAxNyA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpOyAvLyBidWRlIG3DrXQgSGVpZ2h0IGHFviBkb2x1XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuc291Ym9yeVZzZWNobnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoaXMubW9kZWwuc291Ym9yeVZzZWNobnksIHsga2V5OiBcIml4YlwiIH0pOyAgLy9rZXkgamUgZHVsZXppdHkga3Z1bGkgcHJpcGFkbmVtdSB2eWhsZWRhdmFuaSByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWRWeXZlc2VuaVNvdWJvcnkuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnNvdWJvcnladmVyZWpuaXRBdFN0YXJ0ID0gdGhpcy4kZ3JpZFZ5dmVzZW5pU291Ym9yeS5nZ3JpZChcImdldFNlbGVjdGlvblwiLCBmYWxzZSwgdHJ1ZSk7ICAgICAgICAgICAgICAgICAgICAgIC8vbmFjdGVuaSBwcmVzIHJlZmVyZW5jaVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5zb3Vib3J5VnNlY2hueS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Mud2FybmluZyhcImpyZXM6MjQ0NTAwNTNcIik7IC8vUkMgMjQ0NTAwNTMgOiBEb2tsYWQgbmVtw6Egxb7DoWRuw70gZWwuIG9icmF6IGEgcMWZw61sb2h5IG5lYm8gbmEgamVqaWNoIHp2ZcWZZWpuxJtuw60gbmVtw6F0ZSBkb3N0YXRlxI1uw6EgcHLDoXZhLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSAvLyBwcnZuw60gb3RldsWZZW7DrSBTdWJ0YXNrdVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLi4uYWxyZWFkeSBsb2FkZWRcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHpvYnJhesOtbSB2eXbEm8WhZW7DrVxyXG4gICAgICAgICAgICBpZiAodGhpcy4kdnl2ZXNlbmlEaXYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdnl2ZXNlbmlEaXYuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbnMuYWN0Vnl2ZXNpdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Vnl2ZXNpdC52aXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAvLyBMb2FkVnl2ZXNlbmlUYWIoKVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGFiIChzdWJ0YXNrKSBoaXN0b3JpZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgTG9hZEhpc3RvcmllVGFiKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvcmRpYy5VZGEuV2ViQ29udHJvbHMuVnl2ZXNlbmlUYWJzLkhpc3RvcmllVGFiKClcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzY2hvdsOhbSB2eXbEm8WhZW7DrVxyXG4gICAgICAgICAgICBpZiAodGhpcy4kdnl2ZXNlbmlEaXYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdnl2ZXNlbmlEaXYuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbnMuYWN0Vnl2ZXNpdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Vnl2ZXNpdC52aXNpYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdnlidWR1anUgdnl2xJvFoWVuw61cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNIaXN0b3JpZVRhYkFscmVhZHlMb2FkZWQgPT0gZmFsc2UpIHsgLy8gcHJ2bsOtIG90ZXbFmWVuw60gU3VidGFza3VcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNIaXN0b3JpZVRhYkFscmVhZHlMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLi4ubG9hZGluZ1wiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRoaXN0b3J5RGl2ID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZ3JpZEhpc3RvcnkgPSAkKFwiPGRpdj5cIikvLzsgIC8vdnl0dm9yZW5pIGVsZW1lbnR1IHBybyAkZ3JpZEhpc3RvcnlcclxuICAgICAgICAgICAgICAgICAgICAvLy5oZWlnaHQoMjUwKSAgICAgICAgLy9uYXN0YXZlbmkgdnlza3kgJGdyaWRIaXN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuJGhpc3RvcnlEaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8Vnl2ZXNlbmlIaXN0RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29sdW1uTW9kZTogXCJmdWxsXCIsIC8vIHNyYXrDrSB3aWR0aCBzbG91cGPFryBuYSBkZWYuIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dIaXN0b3J5RGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIm5hemV2X2thdFwiLCBcIm5hemV2X3pkcm9qXCIsIFwibmF6ZXZcIiwgXCJwb3Bpc1wiLCBcIm5hemV2X3JlZlwiLCBcInptZW51X3Byb3ZfdHh0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfdWxvX2FuZF9wb3JfY2lzbG9cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogXCJJRFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBmaXhlZFdpZHRoOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8sIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjYXB0aW9uOiBcImpyZXM6MjQ0NTAwNDdcIiAvL1JDIDI0NDUwMDQ3IDogU3RhdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X2thdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjYXB0aW9uOiBcImpyZXM6MjQ0NTAwMzRcIiAvL1JDIDI0NDUwMDM0IDogS2F0ZWdvcmllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfemRyb2pcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDM1XCIgLy9SQyAyNDQ1MDAzNSA6IFpkcm9qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X29kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhcHRpb246IFwianJlczoyNDQ1MDAzNlwiIC8vUkMgMjQ0NTAwMzYgOiBWeXbEm8WhZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBmaXhlZFdpZHRoOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2RvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhcHRpb246IFwianJlczoyNDQ1MDAzN1wiIC8vUkMgMjQ0NTAwMzcgOiBTZWptdXTDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBmaXhlZFdpZHRoOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDE2XCIgLy9SQyAyNDQ1MDAxNiA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDE0MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhcHRpb246IFwianJlczoyNDQ1MDAxN1wiIC8vUkMgMjQ0NTAwMTcgOiBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X3JlZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBjYXB0aW9uOiBcImpyZXM6MjQ0NTAwMzhcIiAvL1JDIDI0NDUwMDM4IDogVnl2xJvFoWVuw60gcHJvdmVkbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDM5XCIgLy9SQyAyNDQ1MDAzOSA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZml4ZWRXaWR0aDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZfdHh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhcHRpb246IFwianJlczoyNDQ1MDA0MFwiIC8vUkMgMjQ0NTAwNDAgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRoaXN0b3J5RGV0YWlsVGFiT2JzYWggPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy4kaGlzdG9yeURpdik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhpcy5tb2RlbC5oaXN0b3JpZSEsIHsga2V5OiBcIml4c191bG8sIHBvcl9jaXNsb1wiIH0pOyAgLy9rZXkgamUgZHVsZXppdHkga3Z1bGkgcHJpcGFkbmVtdSB2eWhsZWRhdmFuaSByYWRrdVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZ3JpZEhpc3RvcnkuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFieSBzZSB0byBmdXJ0IG5lcMWZZW7DocWhZWxvICh2eWtyZXNsZW7DvSB1xb4gdG8gamUpXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubW9kZWwuaGlzdG9yaWUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuJGdyaWRIaXN0b3J5U291Ym9yeSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLiRoaXN0b3J5RGl2KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSAvLyBwcnZuw60gb3RldsWZZW7DrSBTdWJ0YXNrdVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLi4uYWxyZWFkeSBsb2FkZWRcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHpvYnJhesOtbSBoaXN0b3JpaVxyXG4gICAgICAgICAgICBpZiAodGhpcy4kaGlzdG9yeURpdiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRoaXN0b3J5RGl2LnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IC8vIExvYWRIaXN0b3JpZVRhYigpXHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG/FvmVuw60gXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlRGV0YWlsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAvLyBwcm92ZWR1IHbFoWVjaG55IGtvbnRyb2x5XHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlVkYS5XZWJDb250cm9scy5WeXZlc2VuaVRhYnMuc2F2ZURldGFpbCgpXCIsIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy9WeXZvbGFuaSB2YWxpZGFjZSAocG91emUgdiBKUyBiZXogdm9sYW5pIHNlcnZlcnUpXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kZWZhdWx0Rm9ybSEuZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmZiA9IHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgdGhpcy5tb2RlbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVja2VkXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc291Ym9yeVp2ZXJlam5pdCA9IHRoaXMuJGdyaWRWeXZlc2VuaVNvdWJvcnkuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UsIHRydWUpOyAgICAgICAgICAgICAgICAgICAgICAvL25hY3RlbmkgcHJlcyByZWZlcmVuY2lcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLnNvdWJvcnladmVyZWpuaXQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy53YXJuaW5nKFwianJlczoyNDQ1MDAyNlwiKTsgLy9SQyAyNDQ1MDAyNiA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gc291Ym9yIGsgdnl2xJvFoWVuw60uXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIC8vIFXFviBieWxvIG7Em2NvIHZ5dsSbxaFlbm8sIG5hIHRvIHNlIHDFmWVwdMOhbVxyXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5oaXN0b3JpZSAmJiB0aGlzLm1vZGVsLmhpc3RvcmllLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczoyNDQ1MDA1OVwiLCAvL1JDIDI0NDUwMDU5IDogRG90YXpcclxuICAgICAgICAgICAgICAgICAgICBcImpyZXM6MjQ0NTAwNjBcIiAvL1JDIDI0NDUwMDYwIDogWnZlxZllam7Em27DrSBqacW+IGJ5bG8gcHJvdmVkZW5vLCB2aXogesOhbG/FvmthIEhpc3RvcmllLlxyXG4gICAgICAgICAgICAgICAgICAgICsgXCI8YnIvPlwiXHJcbiAgICAgICAgICAgICAgICAgICAgKyBcImpyZXM6MjQ0NTAwNjhcIikgLy9SQyAyNDQ1MDA2OCA6IFDFmWVqZXRlIHNpIHp2ZcWZZWpuxJtuw60gem9wYWtvdmF0P1xyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7IHRoYXQuc2F2ZURldGFpbFJlYWwoKTsgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVEZXRhaWxSZWFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IC8vIHNhdmVEZXRhaWwoKVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvxb5lbsOtICh2bGFzdG7DrSlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNhdmVEZXRhaWxSZWFsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvcmRpYy5VZGEuV2ViQ29udHJvbHMuVnl2ZXNlbmlUYWJzLnNhdmVEZXRhaWxSZWFsKClcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGw8dm9pZD4oXCJTYXZlRGV0YWlsXCIsIHsgbW9kZWw6IHRoaXMubW9kZWwgfSAvKiwgbnVsbCwgeyBhcHBseVZhbGlkYXRpb25SZXN1bHRUbzogZmYgfSAqLylcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWeXZlc2VuaVRhYnMuc2F2ZURldGFpbFJlYWwoKS5kb25lKClcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkdvcmRpYy5VZGEuV2ViQ29udHJvbHMuVnl2ZXNlbmkuc2F2ZURldGFpbC5kb25lIHRoYXRcIiwgdGhhdC5tb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFZ5dmVzaXQhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tb2RlbC5pc19hdXRvbWF0aWNrZV92eXZlc2VuaSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFwianJlczoyNDQ1MDAyN1wiOyAvL1JDIDI0NDUwMDI3IDogVnl2xJvFoWVuw60gYnlsbyDDunNwxJvFoW7DqS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIjxici8+XCIgKyBcImpyZXM6MjQ0NTAwNzZcIjsgLy9SQyAyNDQ1MDA3NiA6IFZpZGl0ZWxub3N0IG5hIGRlc2NlIGplIGTDoWxlIMWZw616ZW5hIGRhdHVtZW0gdnl2xJvFoWVuw60gYSBzZWptdXTDrS5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFwianJlczoyNDQ1MDA3NFwiOyAvL1JDIDI0NDUwMDc0IDogTsOhdnJoIG5hIHZ5dsSbxaFlbsOtIGJ5bCDDunNwxJvFoW7DvS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIjxici8+XCIgKyBcImpyZXM6MjQ0NTAwNzVcIjsgLy9SQyAyNDQ1MDA3NSA6IEsgem9icmF6ZW7DrSBuYSBkZXNjZSBtdXPDrSBwcm9qw610IHNjaHbDoWxlbsOtbS5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRsZyA9IHRoYXQuZGlhbG9ncy5hbGVydCh0ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBkbGcub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVnl2ZXNlbmlUYWJzLnNhdmVEZXRhaWxSZWFsKCkuZmFpbCgpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInZhbGlkYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXNnID0gXCJqcmVzOjI0NDUwMDI4XCIgKyBcIjo8YnIvPlwiOyAvL1JDIDI0NDUwMDI4IDogQ2h5YmEgdmFsaWRhY2UgKHNlcnZlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHZvYmosIGZ1bmN0aW9uIChrLCB2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHYubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnICs9IGsgKyBcIjogXCIgKyB2W2ldLm1lc3NhZ2UgKyBcIjxici8+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IobXNnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9IC8vIHNhdmVEZXRhaWxSZWFsKClcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuw60gZGV0YWlsdSBrIMWZw6Fka3UgaGlzdG9yaWUgKGRhdGEgc2UgYmVyb3UgeiBncmlkdSDigJMgaSBkYXRhIGdyaWR1IHNvdWJvcsWvKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2hvd0hpc3RvcnlEZXRhaWwoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsOiBHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlZ5dmVzZW5pSGlzdER0b1tdO1xyXG4gICAgICAgICAgICBzZWwgPSB0aGlzLiRncmlkSGlzdG9yeS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByb3cgPSBzZWxbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdnnEjWnFoXTEm27DrVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kaGlzdG9yeURldGFpbFRhYk9ic2FoLmVtcHR5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuJGhpc3RvcnlEZXRhaWxUYWJPYnNhaClcclxuICAgICAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybU5haGxlZEhpc3RvcmllVnl2ZXNlbmlcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIGJyZWFrcy0yMDAtNTAwXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjI0NDUwMDYyXCIpIC8vUkMgMjQ0NTAwNjIgOiBEZXRhaWwgaGlzdG9yaWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIklEXCIpLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJpeHNfdWxvX2FuZF9wb3JfY2lzbG9cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDA0N1wiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwic3RhdlwiIH0pIC8vUkMgMjQ0NTAwNDcgOiBTdGF2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDM0XCIpLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJuYXpldl9rYXRcIiB9KSAvL1JDIDI0NDUwMDM0IDogS2F0ZWdvcmllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDM1XCIpLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJuYXpldl96ZHJvalwiIH0pIC8vUkMgMjQ0NTAwMzUgOiBaZHJvalxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDAzNlwiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwiZGF0X29kXCIsIGl0ZW1UZW1wbGF0ZTogXCJ7IzpkYXRlfVwiIH0pIC8vUkMgMjQ0NTAwMzYgOiBWeXbEm8WhZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDAzN1wiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwiZGF0X2RvXCIsIGl0ZW1UZW1wbGF0ZTogXCJ7IzpkYXRlfVwiIH0pIC8vUkMgMjQ0NTAwMzcgOiBTZWptdXTDrVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkU2VjdGlvbihcIiZuYnNwO1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDAxNlwiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwibmF6ZXZcIiB9KSAvL1JDIDI0NDUwMDE2IDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDE3XCIpLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJwb3Bpc1wiIH0pIC8vUkMgMjQ0NTAwMTcgOiBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDAzOFwiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwibmF6ZXZfcmVmXCIgfSkgLy9SQyAyNDQ1MDAzOCA6IFZ5dsSbxaFlbsOtIHByb3ZlZGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQ0NTAwMzlcIikuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgeyBuYW1lOiBcImRhdF96bWVuYVwiLCBpdGVtVGVtcGxhdGU6IFwieyM6ZGF0ZXRpbWV9XCIgfSkgLy9SQyAyNDQ1MDAzOSA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDA0MFwiKS5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwiem1lbnVfcHJvdl90eHRcIiB9KSAvL1JDIDI0NDUwMDQwIDogWm3Em251IHByb3ZlZGxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczoyNDQ1MDA0OVwiKSAvL1JDIDI0NDUwMDQ5IDogVnl2xJvFoWVuw6kgc291Ym9yeVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhpc3RGaWxlc0dyaWREaXYgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy4kaGlzdG9yeURldGFpbFRhYk9ic2FoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuVWRhLkludGVyZmFjZS5TZXpuYW1Qcmlsb2hEdG9bXT4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbHVtbk1vZGU6IFwiZml0XCIsIC8vIHJvesWhw63FmcOtIHdpZHRoIHNsb3VwY8WvIG5hIMWhw63FmWkgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic291Ym9yX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDQ1MDA1MVwiLCAvL1JDIDI0NDUwMDUxIDogVHlwIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJjZW50ZXIgY3Vyc29yX2hlbHBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByaXBvbmEgPSByb3cuc291Ym9yX3ByaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByaXBvbmEgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJpcG9uYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwZGZcIjogcmV0dXJuIHsgaWNvbjogXCJmYS1maWxlLXBkZi1vXCIsIHRvb2x0aXA6IHByaXBvbmEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidHh0XCI6IHJldHVybiB7IGljb246IFwiZmEtZmlsZS10ZXh0LW9cIiwgdG9vbHRpcDogcHJpcG9uYSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ6aXBcIjogcmV0dXJuIHsgaWNvbjogXCJmYS1maWxlLWFyY2hpdmUtb1wiLCB0b29sdGlwOiBwcmlwb25hIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRvY1wiOiByZXR1cm4geyBpY29uOiBcImZhLWZpbGUtd29yZC1vXCIsIHRvb2x0aXA6IHByaXBvbmEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZG9jeFwiOiByZXR1cm4geyBpY29uOiBcImZhLWZpbGUtd29yZC1vXCIsIHRvb2x0aXA6IHByaXBvbmEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwieGxzXCI6IHJldHVybiB7IGljb246IFwiZmEtZmlsZS1leGNlbC1vXCIsIHRvb2x0aXA6IHByaXBvbmEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwieGxzeFwiOiByZXR1cm4geyBpY29uOiBcImZhLWZpbGUtZXhjZWwtb1wiLCB0b29sdGlwOiBwcmlwb25hIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInhtbFwiOiByZXR1cm4geyBpY29uOiBcImZhLWZpbGUtY29kZS1vXCIsIHRvb2x0aXA6IHByaXBvbmEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwianBnXCI6IHJldHVybiB7IGljb246IFwiZmEtZmlsZS1pbWFnZS1vXCIsIHRvb2x0aXA6IHByaXBvbmEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwianBlZ1wiOiByZXR1cm4geyBpY29uOiBcImZhLWZpbGUtaW1hZ2Utb1wiLCB0b29sdGlwOiBwcmlwb25hIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBuZ1wiOiByZXR1cm4geyBpY29uOiBcImZhLWZpbGUtaW1hZ2Utb1wiLCB0b29sdGlwOiBwcmlwb25hIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImdpZlwiOiByZXR1cm4geyBpY29uOiBcImZhLWZpbGUtaW1hZ2Utb1wiLCB0b29sdGlwOiBwcmlwb25hIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIHsgaWNvbjogXCJmYS1maWxlLW9cIiwgdG9vbHRpcDogcHJpcG9uYSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmVsaWtvc3RfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDUwXCIsIC8vUkMgMjQ0NTAwNTAgOiBWZWxpa29zdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNvdWJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDQ1MDAzMlwiLCAvL1JDIDI0NDUwMDMyIDogU291Ym9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDE3XCIsIC8vUkMgMjQ0NTAwMTcgOiBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKTsgLy8gYnVkZSBtw610IEhlaWdodCBhxb4gZG9sdVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgaWYgKHJvdy5Tb3Vib3J5SGlzdG9yaWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcocm93LlNvdWJvcnlIaXN0b3JpZSwgeyBrZXk6IFwiaXhzX3VsbywgcG9yX2Npc2xvLCBpeHNfdWxvX3ByaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGhpc3RGaWxlc0dyaWREaXYuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG5hcGxuxJtuw61cclxuICAgICAgICAgICAgICAgIHRoaXMuJGhpc3RvcnlEZXRhaWxUYWJPYnNhaC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCByb3cpO1xyXG4gICAgICAgICAgICB9IC8vIGlmXHJcblxyXG5cclxuICAgICAgICB9IC8vIHNob3dIaXN0b3J5RGV0YWlsKClcclxuXHJcbiAgICB9IC8vIGNsc1xyXG59IC8vIG5zIiwibmFtZXNwYWNlIEdvcmRpYy5VZGEuV2ViQ29udHJvbHMge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlem5hbVZ5dmVzZW5pXHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciBKaW5kxZlpY2ggVsOhY2hhXHJcbiAgICAgKiBAc2luY2UgNDgwLjIuMC4wXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIFNlem5hbVZ5dmVzZW5pIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmlsdHIgbmFkIGdyaWRlbVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyRm9ybTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIGhvZG5vdHkgZmlsdHJ1XHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5VZGEuSW50ZXJmYWNlLlNlem5hbURva3VtZW50dVVERmlsdGVyRHRvIHwgbnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGN1cnJlbnRGaWx0ZXI6IEdvcmRpYy5VZGEuSW50ZXJmYWNlLlNlem5hbURva3VtZW50dVVERmlsdGVyRHRvIHwgbnVsbDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBzZSBzZXpuYW1lbVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBtb2RlbFxyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlNlem5hbVZ5dmVzZW5pRHRvfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBtb2RlbDogR29yZGljLlVkYS5XZWJDb250cm9scy5TZXpuYW1WeXZlc2VuaUR0bztcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy50YXNrSWQgPSBcImFjdFNlem5hbVZ5dmVzZW5pXCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvcmRpYy5VZGEuV2ViQ29udHJvbHMuU2V6bmFtVnl2ZXNlbmkub25Db250ZW50UmVhZHlcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBha2NlIHNlem5hbXVcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFNhbXBsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2FtcGxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTYW1wbGUgXCIgKyB0aGlzLm1vZGVsLml4cCxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhbXBsZSpcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gZmlsdHJcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50RmlsdGVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJGb3JtRGVmID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiS29tcGxldG7DrSBmaWx0clwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiaXhzX3Vsb1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIml4c191bG9cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcInBvcl9jaXNsb1wiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcInBvcl9jaXNsb1wiIH0pXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGZpbHRlckZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtmaWx0ZXJGb3JtRGVmXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZXM6IFtcIml4c191bG9cIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwidWRlX3Nlel92eXZcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgICAgICAgICBzYXZlT3B0aW9uc0Zvcm06IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQnV0dG9uT25NYWluUm93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5OiBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IHBvZGxlIGZpbHRyxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYWN0ZW5pU2V6bmFtdShvYmouZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZ5dHZvxZllbsOtIGdyaWR1XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLlVkYS5JbnRlcmZhY2UuU2V6bmFtRG9rdW1lbnR1VUREdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJuYXpldlwiLCBcInBvcGlzXCIsIFwibmF6ZXZfcmVmXCIsIFwiem1lbnVfcHJvdl90eHRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3Vsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiaXhzX3Vsb19jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZFdpZHRoOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9yX2Npc2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJwb3JfY2lzbG9fY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic191ZGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNfdWRlID0gcm93LnNfdWRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdiA9IHJvdy5zdGF2O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNfdWRlICE9IG51bGwgJiYgc3RhdiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHNfdWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBhcGVyXCIgLypnaS1wYXBlcjItMDIgXCJmYS1maWxlLW9cIiovLCB0b29sdGlwOiBzdGF2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTsgLy8gbsOhdnJoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS10aWNrXCIgLypcImZhLWZpbGUtdGV4dC1vXCIgKi8sIHRvb2x0aXA6IHN0YXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OyAvLyB2eXbEm8WhZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMDogcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1iaW5cIiAvKmdpLXdpbmRvdy1jbG9zZVwiIC8qXCJmYS1maWxlXCIgKi8sIHRvb2x0aXA6IHN0YXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OyAvLyB6cnXFoWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzA6IHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktaGlzdG9yeVwiIC8qXCJnaS1zY2h2eXJcIiAvKlwiZmEtZmlsZS1hcmNoaXZlLW9cIiAqLywgdG9vbHRpcDogc3RhdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07IC8vIHNlam11dG8gbmVibyBmYS1maWxlLXRleHQ/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJJeHBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF93ZmxzcGlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjQ0NTAwODJcIiwgLy9SQyAyNDQ1MDA4MiA6IEnEjE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2NVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkthdGVnb3JpZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfa2F0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk7DoXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWm5hxI1rYS/EjGpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpkcm9qXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl96ZHJvalwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeXbEm8WhZW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU2VqbXV0w61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeXbEm8WhZW7DrSBwcm92ZWRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9yZWZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlptxJtudSBwcm92ZWRsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCgpOyAvLyBnZ3JpZFxyXG5cclxuICAgICAgICB9IC8vIG9uQ29udGVudFJlYWR5XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBwcml2YXRlIG5hY3RlbmlTZXpuYW11KGZpbHRlck1vZGVsPzogR29yZGljLlVkYS5JbnRlcmZhY2UuU2V6bmFtRG9rdW1lbnR1VURGaWx0ZXJEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdCBkbyBncmlkdVxyXG4gICAgICAgICAgICBpZiAoZmlsdGVyTW9kZWwgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXJNb2RlbCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXQgZG8gc2V6bmFtdVxyXG4gICAgICAgICAgICAgICAgZmlsdGVyTW9kZWwgPSBmaWx0ZXJNb2RlbCB8fCB7fTtcclxuICAgICAgICAgICAgICAgIC8vIHphcGFtYXRvdsOhbsOtIGFrdHXDoWxuw61obyBmaWx0cnUga3bFr2xpIHRpc2vFr21cclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEZpbHRlciA9IGZpbHRlck1vZGVsO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZMOhdCBzZW0gemHEjcOhdGVrIGEga29uZWMgb3BlcmFjZSBuZWJvIHNlIHRvIHRhbSBkxJtsw6Egc2Ftbz9cclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbDxHb3JkaWMuVWRhLkludGVyZmFjZS5TZXpuYW1Eb2t1bWVudHVVRER0b1tdPihcIkdldFNlem5hbVZ5dmVzZW5pXCIsIHsgZmlsdGVyOiBmaWx0ZXJNb2RlbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhzX3VsbywgcG9yX2Npc2xvXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSAvLyBuYWN0ZW5pU2V6bmFtdVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2ZSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8vLyBha3R1w6FsbsOtIHrDoXBvxI10b3bDvSBsaXN0XHJcbiAgICAgICAgICAgIC8vdmFyIGFrdFpMID0gRnVjR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdTZXpuYW1aYXBvY3RvdnljaExpc3R1RHRvPih0aGlzLiRncmlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vLy8gYWtjZSBzZXpuYW11XHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFjdFBvZGFuaSEuZW5hYmxlZCh0aGlzLlBvdm9sZW5vUG9kYW5pKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0RGV0YWlsIS5lbmFibGVkKGFrdFpMICE9PSBudWxsKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0VGlzayEuZW5hYmxlZChha3RaTCAhPT0gbnVsbCk7XHJcbiAgICAgICAgfSAvLyBlbmFibGVcclxuXHJcbiAgICB9IC8vIGNsc1xyXG59IC8vIG5zIiwibmFtZXNwYWNlIEdvcmRpYy5VZGEuV2ViQ29udHJvbHMge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFp2ZcWZZWpuxJtuw60gZWwuIG9icmF6dSAvIHDFmcOtbG9oeSBkbyBwb2JsaWthxI1uw61obyDDumxvxb5pxaF0xJtcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIEppbmTFmWljaCBWw6FjaGFcclxuICAgICAqIEBzaW5jZSA0ODAuMi4wLjBcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgWnZlcmVqbmVuaVRhYnMgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNhaCB0YWJ1IChzdWJ0YXNrdSkgenZlxZllam7Em27DrVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkenZlcmVqbmVuaURpdjogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2FoIHRhYnUgKHN1YnRhc2t1KSBoaXN0b3JpZVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkaGlzdG9yeURpdjogSlF1ZXJ5O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIHMgaGlzdG9yacOtXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkSGlzdG9yeTogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFbDvXBpcyBkZXRhaWx1IMWZw6Fka3UgaGlzdG9yaWUgKGR5bmFtaWNreSBwxZlpIHptxJtuxJsgxZnDoWRrdSDigJMgemRyb2plbSBwcm8gZGF0YSBqZSBoaXN0b3J5IGdyaWQpXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRoaXN0b3J5RGV0YWlsVGFiT2JzYWg6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmRhIHXFviBkb8WhbG8gayBsb2FkdSB6dmXFmWVqbsSbbsOtIHRhYlxyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaXNadmVyZWpuZW5pVGFiQWxyZWFkeUxvYWRlZDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmRhIHXFviBkb8WhbG8gayBsb2FkdSBoaXN0LiB0YWJcclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGlzSGlzdG9yaWVUYWJBbHJlYWR5TG9hZGVkOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBtb2RlbCAoZGVmaW5vdmFuZSBqYWtvIENvbnRlbnRWYWx1ZXMpXHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5VZGEuV2ViQ29udHJvbHMuWnZlcmVqbmVuaUR0b31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWw6IEdvcmRpYy5VZGEuV2ViQ29udHJvbHMuWnZlcmVqbmVuaUR0bztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB2YWxpZGF0b3JzIChkZWZpbm92YW5lIGpha28gQ29udGVudFZhbHVlcylcclxuICAgICAgICAgKiBAdHlwZSB7YW55fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCB2YWxpZGF0b3JzOiBhbnk7XHJcblxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmaW5pY2UgZm9ybXVsw6HFmWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvcmRpYy5VZGEuV2ViQ29udHJvbHMuWnZlcmVqbmVuaVRhYnMub25Db250ZW50UmVhZHlcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRhc2tJZCA9IHRoaXMubW9kZWwuaGlzdF9vbmx5ID8gXCJhY3RadmVyZWpuZW5pSGlzdFRhYlwiIDogXCJhY3RadmVyZWpuZW5pVGFic1wiO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaXNadmVyZWpuZW5pVGFiQWxyZWFkeUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzSGlzdG9yaWVUYWJBbHJlYWR5TG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgLy8gR1NVQlRBU0tTICh0YWJ5KVxyXG4gICAgICAgICAgICAgICAgYWN0WnZlcmVqbmVuaVRhYjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDQ1XCIsIC8vUkMgMjQ0NTAwNDUgOiBadmXFmWVqbsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTG9hZFp2ZXJlam5lbmlUYWIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0SGlzdG9yaWVUYWI6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDQ1MDA1NlwiLCAvL1JDIDI0NDUwMDU2IDogSGlzdG9yaWVcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Mb2FkSGlzdG9yaWVUYWIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gdGxhxI1pZGxhXHJcbiAgICAgICAgICAgICAgICBhY3RadmVyZWpuaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFp2ZXJlam5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNDQ1MDA2NVwiLCAvL1JDIDI0NDUwMDY1IDogWnZlxZllam5pdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zYXZlRGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdENhbmNlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2FuY2VsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDU4XCIsIC8vUkMgMjQ0NTAwNTggOiBacnXFoWl0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5tb2RlbC5oaXN0X29ubHkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBPa25vIHNlIHp2ZcWZZWpuxJtuw61tIOKAkz4gU3VidGFza3kgKyBMb2FkWnZlcmVqbmVuaVxyXG4gICAgICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAuZ3N1YnRhc2tzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NhcHRpb24gc2UgdmV6bWUgcm92bm91IHogYWN0Li4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFp2ZXJlam5lbmlUYWIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0SGlzdG9yaWVUYWIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvYWRadmVyZWpuZW5pVGFiKCk7XHJcblxyXG4gICAgICAgICAgICB9IC8vICFoaXN0X29ubHlcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBqZW4gaGlzdG9yaWlcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9hZEhpc3RvcmllVGFiKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb21tYW5kYmFyICh0bGHEjcOtdGthIG5hIHNwb2R1IG9rbmEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Q2FuY2VsIH0sXHJcbiAgICAgICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSAvLyBvbkNvbnRlbnRSZWFkeVxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogJ2Nsb3NpbmcoKScgb2tuYSDigJMgdGVzdCwgamVzdGxpIGplIG1vxb5uw6kgb2tubyB6YXbFmcOtdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPGFueT59IHByb21pc2UgKHJlc29sdmUgPSBqZSBtb8W+bsOpIHphdsWZw610LCByZWplY3QgPSBuZW7DrSBtb8W+bsOpIHphdsWZw610KSwgYm9vbGVhbiB1csSNdWplLCBqZXN0bGkgcMWZZXNlbGVrdG92YXQgc2V6bmFtICh0cnVlKSBuZWJvIG5lIChmYWxzZSlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJadmVyZWpuZW5pVGFicy5jbG9zaW5nKClcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBrb250cm9sYSBuYSB6bcSbbsSbbsOpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlZmF1bHRGb3JtID09IHVuZGVmaW5lZCB8fCB0aGlzLmRlZmF1bHRGb3JtID09IG51bGwgfHwgdGhpcy5kZWZhdWx0Rm9ybS5nZm9ybSA9PSB1bmRlZmluZWQgfHwgdGhpcy5kZWZhdWx0Rm9ybS5nZm9ybSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZmF1bHRGb3JtIG5lZXhpc3R1amUgKGplIG51bGwpID0+IHphdsWZdSBUYWJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybUNoYW5nZWQgPSB0aGlzLmRlZmF1bHRGb3JtIS5nZm9ybShcImhhc0NoYW5nZWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZm9ybUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnlseSB6bcSbbnkgPT4gZG90YXogbmEgemF2xZllbsOtXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczoyNDQ1MDA1OVwiLCAvL1JDIDI0NDUwMDU5IDogRG90YXpcclxuICAgICAgICAgICAgICAgICAgICBcImpyZXM6MjQ0NTAwODNcIikgLy9SQyAyNDQ1MDA4MyA6IENoY2V0ZSB6YXbFmcOtdCBva25vIGJleiB1bG/FvmVuw60gem3Em24/XHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGRlZi5yZXNvbHZlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGRlZi5yZWplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZWJ5bHkgem3Em255ID0+IHphdsWZdSBUYWJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfSAvLyBjbG9zaW5nXHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUYWIgKHN1YnRhc2spICdadmXFmWVqbsSbbsOtJ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgTG9hZFp2ZXJlam5lbmlUYWIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlVkYS5XZWJDb250cm9scy5admVyZWpuZW5pVGFicy5admVyZWpuZW5pVGFiKClcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBuZWpzb3UgcHLDoXZhIC0gdWtvbsSNaW1cclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwubHplX3p2ZXJlam5pdCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRsZyA9IHRoaXMuZGlhbG9ncy53YXJuaW5nKFwianJlczoyNDQ1MDAxNFwiKTsgLy9SQyAyNDQ1MDAxNCA6IEsgZGFuw6kgb3BlcmFjaSBuZW3DoXRlIGRvc3RhdGXEjW7DoSBvcHLDoXZuxJtuw60uXHJcbiAgICAgICAgICAgICAgICBkbGcub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHNjaG92w6FtIGhpc3RvcmlpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRoaXN0b3J5RGl2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRoaXN0b3J5RGl2LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGlkaW5nIGhpc3RvcnlEaXYuLi5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzWnZlcmVqbmVuaVRhYkFscmVhZHlMb2FkZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNadmVyZWpuZW5pVGFiQWxyZWFkeUxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIuLi5sb2FkaW5nIHRhYlwiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLiR6dmVyZWpuZW5pRGl2ID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLiR6dmVyZWpuZW5pRGl2KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmb3JtWnZlcmVqbmVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgYnJlYWtzLTIwMC01MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDY0XCIpIC8vUkMgMjQ0NTAwNjQgOiBJeGJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiaXhiXCIsIGRpc2FibGVkOiB0cnVlLCBmbGFnOiBcInJlcXVpcmVkXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2Nob3bDoW0gPywga2R5xb4gbmVuw60gdnlwbG7Em25vLCB0YWsgamUgcHLDoXpkbsOpLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDUyXCIpIC8vUkMgMjQ0NTAwNTIgOiBJeHBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiaXhwXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDMyXCIpIC8vUkMgMjQ0NTAwMzIgOiBTb3Vib3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwic291Ym9yXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDI5XCIpIC8vUkMgMjQ0NTAwMjkgOiBUeXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwidHlwXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDQyXCIpIC8vUkMgMjQ0NTAwNDIgOiBUaXR1bGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcIm5hemV2XCIsIGZsYWc6IFwicmVxdWlyZWRcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDAxN1wiKSAvL1JDIDI0NDUwMDE3IDogUG9waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9waXNcIiwgcm93czogMiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDAxOFwiKSAvL1JDIDI0NDUwMDE4IDogTcOtc3RvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxzdWx6KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1bG96aXN0ZUZpZWxkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidWxvemlzdGUgPSBpeHNfdWx6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpel9wdWI6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml6X3VkOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgLy8gZ3NlbGVjdGJveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDAxOVwiKSAvL1JDIDI0NDUwMDE5IDogU2xvxb5rYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2ZsZHVseigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xvemthRmllbGRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2xvemthID0ga3RnX2Rtc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3VsejogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwidWxvemlzdGVGaWVsZFwiLCBcIml4c191bHpcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSAvLyBnc2VsZWN0Ym94XHJcbiAgICAgICAgICAgICAgICAgICAgKTsgLy8gLmdmb3JtXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29tbWFuZGJhciAodGxhxI3DrXRrYSBuYSBzcG9kdSBva25hKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFp2ZXJlam5pdCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Q2FuY2VsIH0sXHJcbiAgICAgICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5mbGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKHsgbGFiZWw6IHRoaXMubW9kZWwuZmxhc2gsIGN1c3RvbUNsYXNzOiAnZy1zdGF0ZS1pbmZvJyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRGb3JtLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuXHJcbiAgICAgICAgICAgIH0gLy8gaXNadmVyZWpuZW5pVGFiQWxyZWFkeUxvYWRlZFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLi4uYWxyZWFkeSBsb2FkZWRcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHpvYnJhesOtbSB6dmXFmWVqbsSbbsOtXHJcbiAgICAgICAgICAgIGlmICh0aGlzLiR6dmVyZWpuZW5pRGl2ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHp2ZXJlam5lbmlEaXYuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbnMuYWN0WnZlcmVqbml0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0WnZlcmVqbml0LnZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IC8vIExvYWRadmVyZWpuZW5pVGFiKClcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRhYiAoc3VidGFzaykgaGlzdG9yaWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIExvYWRIaXN0b3JpZVRhYigpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlZ5dmVzZW5pVGFicy5IaXN0b3JpZVRhYigpXCIsIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2Nob3bDoW0genZlxZllam7Em27DrVxyXG4gICAgICAgICAgICBpZiAodGhpcy4kenZlcmVqbmVuaURpdikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kenZlcmVqbmVuaURpdi5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiR6dmVyZWpuZW5pRGl2LmhpZGUoKVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3Rpb25zLmFjdFp2ZXJlam5pdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFp2ZXJlam5pdC52aXNpYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWN0WnZlcmVqbml0LnZpc2libGUoZmFsc2UpXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB2eWJ1ZHVqdSB6dmXFmWVqbsSbbsOtXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSGlzdG9yaWVUYWJBbHJlYWR5TG9hZGVkID09IGZhbHNlKSB7IC8vIHBydm7DrSBvdGV2xZllbsOtIFN1YnRhc2t1XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzSGlzdG9yaWVUYWJBbHJlYWR5TG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi4uLmxvYWRpbmdcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy4kaGlzdG9yeURpdiA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuJGdyaWRIaXN0b3J5ID0gJChcIjxkaXY+XCIpLy87ICAvL3Z5dHZvcmVuaSBlbGVtZW50dSBwcm8gJGdyaWRIaXN0b3J5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8uaGVpZ2h0KDI1MCkgICAgICAgIC8vbmFzdGF2ZW5pIHZ5c2t5ICRncmlkSGlzdG9yeVxyXG4gICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuJGhpc3RvcnlEaXYpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdncmlkPFp2ZXJlam5lbmlIaXN0RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29sdW1uTW9kZTogXCJmdWxsXCIsIC8vIHNyYXrDrSB3aWR0aCBzbG91cGPFryBuYSBkZWYuIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2luZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dIaXN0b3J5RGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIm5hemV2X3VselwiLCBcIm5hemV2X3Nsb3pcIiwgXCJuYXpldl9yZlwiLCBcInNvdWJvclwiLCBcInRpdHVsZVwiLCBcInBvcGlzXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeGJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogXCJJeGJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDEzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZml4ZWRXaWR0aDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLCB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDY5XCIgLy9SQyAyNDQ1MDA2OSA6IERhdHVtIHp2ZcWZZWpuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGZpeGVkV2lkdGg6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl91bHpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDQxXCIgLy9SQyAgOiDDmmxvxb5pxaF0xJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9zbG96XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhcHRpb246IFwianJlczoyNDQ1MDAxOVwiIC8vUkMgMjQ0NTAwMTkgOiBTbG/FvmthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic291Ym9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhcHRpb246IFwianJlczoyNDQ1MDAzMlwiIC8vUkMgMjQ0NTAwMzIgOiBTb3Vib3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aXR1bGVrXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGNhcHRpb246IFwianJlczoyNDQ1MDA0MlwiIC8vUkMgMjQ0NTAwNDIgOiBUaXR1bGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDE3XCIgLy9SQyAyNDQ1MDAxNyA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogMTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfcmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgY2FwdGlvbjogXCJqcmVzOjI0NDUwMDcwXCIgLy9SQyAyNDQ1MDA3MCA6IFp2ZcWZZWpuaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy4kaGlzdG9yeURldGFpbFRhYk9ic2FoID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuJGhpc3RvcnlEaXYpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoaXMubW9kZWwuaGlzdG9yaWUhLCB7IGtleTogXCJpeHNfdWxvLHBvcl9jaXNsb1wiIH0pOyAgLy9rZXkgamUgZHVsZXppdHkga3Z1bGkgcHJpcGFkbmVtdSB2eWhsZWRhdmFuaSByYWRrdVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZ3JpZEhpc3RvcnkuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG5cclxuICAgICAgICAgICAgfSAvLyBwcnZuw60gb3RldsWZZW7DrSBTdWJ0YXNrdVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLi4uYWxyZWFkeSBsb2FkZWRcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHpvYnJhesOtbSBoaXN0b3JpaVxyXG4gICAgICAgICAgICBpZiAodGhpcy4kaGlzdG9yeURpdiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRoaXN0b3J5RGl2LnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IC8vIExvYWRIaXN0b3JpZVRhYigpXHJcblxyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3Rpc2sgdGxhxI3DrXRrYSBbWnZlxZllam5pdF1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNhdmVEZXRhaWwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIC8vIHByb3ZlZHUgdsWhZWNobnkga29udHJvbHlcclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlp2ZXJlam5lbmlUYWJzLnNhdmVEZXRhaWwoKVwiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vVnl2b2xhbmkgdmFsaWRhY2UgKHBvdXplIHYgSlMgYmV6IHZvbGFuaSBzZXJ2ZXJ1KVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZmYgPSB0aGlzLmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKC8qXCJ0ZXh0MiwgdGV4dDNcIiovKSAgICAgICAgICAgIC8vTk9URTogTHplIHphZGF2YXQgbmFtZSBqZWRub3RsaXZ5Y2ggZmllbGR1XHJcbiAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHRoaXMubW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzYXZlRGV0YWlsKCkg4oCTIGFmdGVyIGNvbGxlY3RcIiwgdGhpcy5tb2RlbCk7XHJcblxyXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAvLyBVxb4gYnlsbyBuxJtjbyB2eXbEm8WhZW5vLCBuYSB0byBzZSBwxZllcHTDoW1cclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuaGlzdG9yaWUgJiYgdGhpcy5tb2RlbC5oaXN0b3JpZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcclxuICAgICAgICAgICAgICAgICAgICBcImpyZXM6MjQ0NTAwNTlcIiwgLy9SQyAyNDQ1MDA1OSA6IERvdGF6XHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjI0NDUwMDYwXCIgLy9SQyAyNDQ1MDA2MCA6IFp2ZcWZZWpuxJtuw60gamnFviBieWxvIHByb3ZlZGVubywgdml6IHrDoWxvxb5rYSBIaXN0b3JpZS5cclxuICAgICAgICAgICAgICAgICAgICArIFwiPGJyLz5cIlxyXG4gICAgICAgICAgICAgICAgICAgICsgXCJqcmVzOjI0NDUwMDYxXCIpIC8vUkMgMjQ0NTAwNjEgOiBQxZllamV0ZSBzaSB6dmXFmWVqbsSbbsOtIHpvcGFrb3ZhdD9cclxuICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkgeyB0aGF0LnNhdmVEZXRhaWxSZWFsKCk7IH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlRGV0YWlsUmVhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAvLyBzYXZlRGV0YWlsKClcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVsb8W+ZW7DrSAodmxhc3Ruw60pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzYXZlRGV0YWlsUmVhbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlp2ZXJlam5lbmlUYWJzLnNhdmVEZXRhaWxSZWFsKClcIiwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbGw8dm9pZD4oXCJTYXZlRGV0YWlsXCIsIHsgbW9kZWw6IHRoaXMubW9kZWwgfSAvKiwgbnVsbCwgeyBhcHBseVZhbGlkYXRpb25SZXN1bHRUbzogZmYgfSAqLylcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJadmVyZWpuZW5pVGFicy5zYXZlRGV0YWlsUmVhbCgpLmRvbmUoKVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiR29yZGljLlVkYS5XZWJDb250cm9scy5admVyZWpuZW5pLnNhdmVEZXRhaWwuZG9uZSB0aGF0XCIsIHRoYXQubW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RadmVyZWpuaXQhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcImpyZXM6MjQ0NTAwNjZcIikgLy9SQyAyNDQ1MDA2NiA6IFp2ZcWZZWpuxJtuw60gYnlsbyDDunNwxJvFoW7DqS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKCkgeyB0aGF0LmNsb3NlKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlp2ZXJlam5lbmlUYWJzLnNhdmVEZXRhaWxSZWFsKCkuZmFpbCgpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInZhbGlkYXRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXNnID0gXCJqcmVzOjI0NDUwMDI4XCIgKyBcIjo8YnIvPlwiOyAvL1JDIDI0NDUwMDI4IDogQ2h5YmEgdmFsaWRhY2UgKHNlcnZlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHZvYmosIGZ1bmN0aW9uIChrLCB2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHYubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnICs9IGsgKyBcIjogXCIgKyB2W2ldLm1lc3NhZ2UgKyBcIjxici8+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IobXNnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9IC8vIFNhdmVEZXRhaWxSZWFsKClcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuw60gZGV0YWlsdSBrIMWZw6Fka3UgaGlzdG9yaWUgKGRhdGEgc2UgYmVyb3UgeiBncmlkdSDigJMgaSBkYXRhIGdyaWR1IHNvdWJvcsWvKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2hvd0hpc3RvcnlEZXRhaWwoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsOiBHb3JkaWMuVWRhLldlYkNvbnRyb2xzLlp2ZXJlam5lbmlIaXN0RHRvW107XHJcbiAgICAgICAgICAgIHNlbCA9IHRoaXMuJGdyaWRIaXN0b3J5LmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IHNlbFswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB2ecSNacWhdMSbbsOtXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRoaXN0b3J5RGV0YWlsVGFiT2JzYWguZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy4kaGlzdG9yeURldGFpbFRhYk9ic2FoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtTmFobGVkSGlzdG9yaWVadmVyZWpuZW5pXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBicmVha3MtMjAwLTUwMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczoyNDQ1MDA2MlwiKSAvL1JDIDI0NDUwMDYyIDogRGV0YWlsIGhpc3RvcmllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJeGJcIikuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgeyBuYW1lOiBcIml4YlwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDY5XCIpIC8vUkMgMjQ0NTAwNjkgOiBEYXR1bSB6dmXFmWVqbsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwiZGF0X3ptZW5hXCIsIGl0ZW1UZW1wbGF0ZTogXCJ7IzpkYXRldGltZX1cIiB9IClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQ0NTAwNDFcIikgLy9SQyAyNDQ1MDA0MSA6IMOabG/FvmnFoXTEm1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgeyBuYW1lOiBcIm5hemV2X3VselwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDE5XCIpIC8vUkMgMjQ0NTAwMTkgOiBTbG/FvmthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwibmF6ZXZfc2xvelwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDMyXCIpIC8vUkMgMjQ0NTAwMzIgOiBTb3Vib3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJzb3Vib3JcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDA0MlwiKSAvL1JDIDI0NDUwMDQyIDogVGl0dWxla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgeyBuYW1lOiBcInRpdHVsZWtcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDQ1MDAxN1wiKSAvL1JDIDI0NDUwMDE3IDogUG9waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0YXRpY2ZpZWxkXCIsIHsgbmFtZTogXCJwb3Bpc1wiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0NDUwMDcwXCIpIC8vUkMgMjQ0NTAwNzAgOiBadmXFmWVqbmlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCB7IG5hbWU6IFwibmF6ZXZfcmZcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbmFwbG7Em27DrVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kaGlzdG9yeURldGFpbFRhYk9ic2FoLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHJvdyk7XHJcbiAgICAgICAgICAgIH0gLy8gaWYgc2VsLmxlbmd0aCA9PSAxXHJcblxyXG4gICAgICAgIH0gLy8gc2hvd0hpc3RvcnlEZXRhaWwoKVxyXG5cclxuICAgIH0gLy8gY2xzXHJcbn0gLy8gbnNcclxuIl19