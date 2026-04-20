"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNovyPohyb.ts                          </Name>
//    <Description> Okno pro založení nového účetního pohybu                    </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-13                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Okno pro založení nového účetního pohybu
             * @author Martin Hanuš
             */
            let GNovyPohyb = class GNovyPohyb extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** pomocná prom. por přepočet částek */
                    this.m_bPrepocet = false;
                    /** načtené data */
                    this.nactene = 0;
                }
                //** Základní metoda pro content */
                onContentReady() {
                    var that = this;
                    this.beginOperation("Načítám okno...");
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    // Naplnění DTO objektu pro sazby DPH
                    var DPH = that.isl.Predpisy.vratDPH()
                        .get();
                    DPH.done((data) => {
                        this.sazbyDPH = data.data;
                        this.loadedData();
                    });
                    // Naplnění DTO objektu pro kurzy měn
                    if (!this.kurzyMenyDto) { // || this.kurzyMenyDto == undefined) {
                        var Kurzy = that.isl.Predpisy.vratKurzMeny()
                            .get();
                        Kurzy.done((data) => {
                            this.kurzyMenyDto = data.data;
                            this.loadedData();
                        });
                    }
                    else {
                        this.loadedData();
                    }
                    this.createMainForm();
                    this.createMainGrid();
                }
                loadedData() {
                    var that = this;
                    this.nactene++;
                    if (this.nactene == 2) {
                        that.endOperation();
                    }
                }
                /** Metoda pro definici základního formuláře okna */
                createMainForm() {
                    var that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "formNovyPohyb", }) //layoutDescriptor: "L2M1S1, L-2-10-0, M-12-12-0, S-12-12-0"
                        .addSection()
                        .addRow("Kategorie pohybu")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo", //Typ předpisu
                        flag: "required",
                        model: "model.ktg_upo=value.ktg_upo;model.ktg_upo_txt=value.ktg_upo_txt", //,
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        initialValue: { ktg_upo: 80 },
                        serverFilters: {
                        //ktg_upo: this.naplneniPole(200, 220),
                        //ktg_upo: [200,205,206,207,208,209,210,215,217],
                        },
                        dropdown: true,
                        //helperColumns: ["ktg_upo", "ktg_upo_txt"]
                    }) // BUCDPEP.ktg_upo 
                        .addRow("")
                        .addText("Datum Pohybu", "w-4")
                        .addText("Rok DPH", "w-4")
                        .addText("Mesíc DPH", "w-4")
                        .addRow()
                        .addField("gdatebox", "w-4", {
                        name: "dat_upo",
                        initialValue: new Date(),
                        flag: "required",
                        change: function (ev, input) { }
                    })
                        .addField("gnumberbox", "w-4", {
                        name: "rok",
                        initialValue: new Date().getFullYear(),
                        disabled: !this.JeDanova(),
                        change: function (ev, input) { }
                    })
                        .addField("gnumberbox", "w-4", {
                        name: "mesic",
                        initialValue: (new Date().getMonth() + 1), //+1 protože metoda getMonth() vrací 0-11
                        disabled: !this.JeDanova(),
                        change: function (ev, input) { }
                    })
                        .addRow("Popis")
                        .addField("gstringbox", "w-12", {
                        name: "popis_upo",
                        rows: 3,
                        change: function (ev, input) { }
                    })
                        //!Složení DPH (roční předpis)------------------------------------------
                        .addSection("")
                        .addRow()
                        .addText("Základ daně", "w-4 right")
                        .addText("Daň", "w-4 right")
                        .addText("Celkem", "w-4 right")
                        .addRow("Osvobozeno")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0",
                        disabled: this.dph_osvob(),
                        change: function (ev, input) {
                            $(this).gform().findFields("c_d0celkem").gfield("model", "apply", null);
                            //$(this).gform().findFields("c_upo").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_d");
                            that.PrepocetCastek(0);
                            //    }
                            //}
                        }
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0celkem",
                        //initialValue: 0, //TEST
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setInitial", $(this).gform().findFields("c_d0").gfield("getValue"));
                                    return;
                                case "collect": return;
                                default: return "c_d0celkem";
                            }
                        },
                        change: function (ev, input) { }
                    })
                        .addRow("Bez daně")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0",
                        disabled: this.dph_dph2(),
                        change: function (ev, input) {
                            $(this).gform().findFields("c_z0celkem").gfield("model", "apply", null);
                            //$(this).gform().findFields("c_upo").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_z");
                            that.PrepocetCastek(1);
                            //    }
                            //}
                        }
                    })
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0celkem",
                        //initialValue: 0, //TEST
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    $(this).gfield("setInitial", $(this).gform().findFields("c_z0").gfield("getValue"));
                                    return;
                                case "collect": return;
                                default: return "c_z0celkem";
                            }
                        },
                        change: function (ev, input) { }
                    })
                        .addRow("První snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z1",
                        disabled: this.dph_sniz(),
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                            //$(this).gform().findFields("c_upo").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_z");
                            that.PrepocetCastek(1);
                            //    }
                            //}
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d1",
                        disabled: this.dph_sniz(),
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd1").gfield("model", "apply", null);
                            //$(this).gform().findFields("c_upo").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_d");
                            that.PrepocetCastek(0);
                            //    }
                            //}
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd1",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z1").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d1").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd1";
                            }
                        },
                        change: function (ev, input) { }
                    })
                        .addRow("Druhá snížená")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z3",
                        disabled: this.dph_sniz2(),
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                            //$(this).gform().findFields("c_upo").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_z");
                            that.PrepocetCastek(1);
                            //    }
                            //}
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d3",
                        disabled: this.dph_sniz2(),
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd3").gfield("model", "apply", null);
                            //$(this).gform().findFields("c_upo").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_d");
                            that.PrepocetCastek(0);
                            //    }
                            //}
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd3",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z3").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d3").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd3";
                            }
                        },
                        change: function (ev, input) { }
                    })
                        .addRow("Základní sazba")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_z2",
                        disabled: this.dph_zakl(),
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                            //$(this).gform().findFields("c_upo").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_z");
                            that.PrepocetCastek(1);
                            //    }
                            //}
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_d2",
                        disabled: this.dph_zakl(),
                        change: function (ev, input) {
                            $(this).gform().findFields("c_zd2").gfield("model", "apply", null);
                            //$(this).gform().findFields("c_upo").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_d");
                            that.PrepocetCastek(0);
                            //    }
                            //}
                        }
                    })
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zd2",
                        disabled: true,
                        model: function (operation, dto, modelOptions) {
                            switch (operation) {
                                case "apply":
                                    let z = $(this).gform().findFields("c_z2").gfield("getValue");
                                    let d = $(this).gform().findFields("c_d2").gfield("getValue");
                                    let sum = z.add(d);
                                    $(this).gfield("setInitial", sum);
                                    return;
                                case "collect": return;
                                default: return "c_zd2";
                            }
                        },
                        change: function (ev, input) { }
                    })
                        .addRow("Zaokrouhlení")
                        .addText("", "w-4")
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_zao",
                        disabled: !this.PovoleniCZao(),
                        change: function (ev, input) {
                            $(this).gform().findFields("c_upo").gfield("model", "apply", null);
                            //if (!that.prvniNastaveni) {
                            //    if (input.value != null) {
                            //        //that.onValidateItem("c_d");
                            that.PrepocetCastek(0);
                            //    }
                            //}
                        }
                    })
                        .addRow("Částka pohybu")
                        .addText("", "w-4")
                        .addText("", "w-4")
                        .addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        name: "c_upo",
                        //model: function (operation, dto, modelOptions) {
                        //    switch (operation) {
                        //        case "apply":
                        //            let a = $(this).gform().findFields("c_d0celkem").gfield<Decimal>("getValue");
                        //            let b = $(this).gform().findFields("c_z0celkem").gfield<Decimal>("getValue");
                        //            let c = $(this).gform().findFields("c_zd1").gfield<Decimal>("getValue");
                        //            let d = $(this).gform().findFields("c_zd2").gfield<Decimal>("getValue");
                        //            let e = $(this).gform().findFields("c_zd3").gfield<Decimal>("getValue");
                        //            let f = $(this).gform().findFields("c_zao").gfield<Decimal>("getValue");
                        //            let sum = a.plus(b).plus(c).plus(d).plus(e).plus(f)
                        //            $(this).gfield("setInitial", sum);
                        //            return;
                        //        case "collect": return;
                        //        default: return "c_upo";
                        //    }
                        //}
                    });
                    var defaultForm = $("<div>")
                        .appendTo(this.element)
                        .gform("createFrom", mainForm);
                }
                /** Metoda pro definici gridu okna */
                createMainGrid() {
                    var that = this;
                    this.grid = $("<div>")
                        .appendTo(this.element)
                        .gautofit()
                        //.ggrid({
                        //    columns: new Data.GridFormat()
                        //        .addTextColumn({ name: "SU", caption: "SU" })
                        //        .addTextColumn({ name: "AU", caption: "AU" })
                        //        .addTextColumn({ name: "ZDR", caption: "ZDR" })
                        //        .addTextColumn({ name: "ODPA", caption: "ODPA" })
                        //        .addTextColumn({ name: "POL", caption: "POL" })
                        //        .addTextColumn({ name: "PPOL", caption: "PPOL" })
                        //        .addTextColumn({ name: "PRJ", caption: "PRJ" })
                        //        .addTextColumn({ name: "ZJ", caption: "ZJ" })
                        //        .addTextColumn({ name: "UZ", caption: "UZ" })
                        //        .addTextColumn({ name: "ORJ", caption: "ORJ" })
                        //        .addTextColumn({ name: "ESF", caption: "ESF" })
                        //        .addTextColumn({ name: "PVS", caption: "PVS" })
                        //        .addTextColumn({ name: "ORG", caption: "ORG" })
                        //})
                        .ggrid({
                        // TODO: grid dodělat
                        columnMode: "full", // fit (defaultne by melo byt toto), full
                        // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                        // defaultAction: 
                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                        columns: WebClient.Common.GridFormats.Predkontace(that) //new Gordic.Data.GridFormat<Gordic.Fuc.Interface.GUeTeDto>().addSortedEkoCfuSet(that)
                    });
                }
                //Akce po kliknutí na tlačítko uložit
                ok() {
                    var that = this;
                    that.beginOperation("Probíhá ukládání pohybu...");
                    var c_dto = {};
                    var form = this.findForms("formNovyPohyb");
                    that.element.findForms("formNovyPohyb").findFields().gfield("model", "collect", c_dto);
                    var col_c_mena = form.findFields("c_upo").gfield("getValue");
                    c_dto.c_upo = form.findFields("c_upo").gfield("getValue");
                    c_dto.ixp = this.Ixp;
                    c_dto.typ_upo = 10;
                    //c_dto.JeDanovy = this.JeDanova();
                    //Object.keys(c_dto).forEach(key => {
                    //    console.log(key, c_dto[key]);
                    //});
                    that.isl.DdpPripadPohyb.zalozPohyb(rq => { return { data: c_dto }; })
                        //that.isl.PripadVratky.save(rq => { return { data: c_dto } })
                        .get()
                        .done(function (ret) {
                        //?-------------------------------POVEDLO SE ULOŽENÍ VRATKY
                        var Radek_upo = ret.result.data.radek_upo;
                        that.endOperation();
                        that.close();
                    })
                        .fail(function (jqXHR, typ, obj) {
                        //?-------------------------------NĚCO SE NEPOVEDLO
                        that.endOperation();
                        if (typ === "exception") {
                            obj.handled = true;
                            return that.dialogs.error("Chyba", obj.baseMessage);
                        }
                    });
                    //that.endOperation();
                }
                /** Metoda zjistí, zda je částka daňová */
                JeDanova() {
                    return (this.typ_Pohl.priz_dph2 == 0 || this.typ_Pohl.priz_dph_sniz == 1 || this.typ_Pohl.priz_dph_sniz2 == 1 || this.typ_Pohl.priz_dph_sniz3 == 1 || this.typ_Pohl.priz_dph_zakl == 1 || this.typ_Pohl.priz_osvob == 1);
                }
                /** Metoda zjistí, zda má být částka zaokrouhlení povolena. (Záleží na povolených daních u typu pohledávky)*/
                PovoleniCZao() {
                    return (this.typ_Pohl.priz_dph_sniz == 1 || this.typ_Pohl.priz_dph_sniz2 == 1 || this.typ_Pohl.priz_dph_sniz3 == 1 || this.typ_Pohl.priz_dph_zakl == 1);
                }
                dph_zakl() {
                    return (this.typ_Pohl.priz_dph_zakl == 0);
                }
                dph_sniz() {
                    return (this.typ_Pohl.priz_dph_sniz == 0);
                }
                dph_sniz2() {
                    return (this.typ_Pohl.priz_dph_sniz2 == 0);
                }
                dph_osvob() {
                    return (this.typ_Pohl.priz_osvob == 0);
                }
                dph_dph2() {
                    return (this.typ_Pohl.priz_dph2 != 0);
                }
                NastavNuloveCastky(vseSmazat) {
                    this.m_bPrepocet = true;
                    var form = this.findForms("formNovyPohyb");
                    if (vseSmazat) {
                        form.findFields("c_upo").gfield("setValue", new Decimal(0)); //m_tbcastkaCelk.Value = new GDecimal(0);
                        form.findFields("c_zao").gfield("setValue", new Decimal(0)); //m_tbcastkaZao.Value = new GDecimal(0);
                    }
                    form.findFields("c_z0").gfield("setValue", new Decimal(0)); //m_tbcastkaZ0.Value = new GDecimal(0);
                    form.findFields("c_z1").gfield("setValue", new Decimal(0)); //m_tbcastkaZ1.Value = new GDecimal(0);
                    form.findFields("c_z2").gfield("setValue", new Decimal(0)); //m_tbcastkaZ2.Value = new GDecimal(0);
                    form.findFields("c_z3").gfield("setValue", new Decimal(0)); //m_tbcastkaZ3.Value = new GDecimal(0);
                    //form.findFields("c_z4").gfield("setValue", 0 );                                //m_tbcastkaZ4.Value = new GDecimal(0);
                    form.findFields("c_d0").gfield("setValue", new Decimal(0)); //m_tbcastkaD0.Value = new GDecimal(0);
                    form.findFields("c_d1").gfield("setValue", new Decimal(0)); //m_tbcastkaD1.Value = new GDecimal(0);
                    form.findFields("c_d2").gfield("setValue", new Decimal(0)); //m_tbcastkaD2.Value = new GDecimal(0)
                    form.findFields("c_d3").gfield("setValue", new Decimal(0)); //m_tbcastkaD3.Value = new GDecimal(0);
                    //form.findFields("c_d4").gfield("setValue", 0 );                                //m_tbcastkaD4.Value = new GDecimal(0);           
                    this.m_bPrepocet = false;
                }
                PrepocetCastek(spocitatDan) {
                    var form = this.findForms("formNovyPohyb");
                    if (this.m_bPrepocet)
                        return;
                    this.m_bPrepocet = true;
                    //var l_zaklad: Decimal; 
                    //var l_dan: Decimal;
                    //var l_procento: Decimal;
                    //0    Bez DPH
                    //10    Základní
                    //20    Snížená
                    //30    Druhá snížená
                    //40    Třetí snížená
                    if (!this.JeDanova()) {
                        this.NastavNuloveCastky(false);
                    }
                    var c_upo = form.findFields("c_upo").gfield("getValue");
                    var c_z0 = form.findFields("c_z0").gfield("getValue");
                    var c_z1 = form.findFields("c_z1").gfield("getValue");
                    var c_z2 = form.findFields("c_z2").gfield("getValue");
                    var c_z3 = form.findFields("c_z3").gfield("getValue");
                    //var c_z4 = form.findFields("c_z4").gfield<Decimal>("getValue");
                    var c_d0 = form.findFields("c_d0").gfield("getValue");
                    var c_d1 = form.findFields("c_d1").gfield("getValue");
                    var c_d2 = form.findFields("c_d2").gfield("getValue");
                    var c_d3 = form.findFields("c_d3").gfield("getValue");
                    //var c_d4: Decimal = form.findFields("c_d4").gfield<Decimal>("getValue");
                    var c_zao = form.findFields("c_zao").gfield("getValue");
                    if (spocitatDan) {
                        //var rok = form.findFields("rok").gfield<number>("getValue");
                        //var mesic = form.findFields("mesic").gfield<number>("getValue");
                        var procento;
                        var castka;
                        if (c_d1.eq(0)) {
                            [procento, castka] = this.Vypocet_dph(c_z1, false, this.getProcentoDane(20), true);
                            c_d1 = procento;
                            form.findFields("c_d1").gfield("setValue", c_d1);
                        }
                        if (c_d2.eq(0)) {
                            [procento, castka] = this.Vypocet_dph(c_z2, false, this.getProcentoDane(10), true);
                            c_d2 = procento;
                            form.findFields("c_d2").gfield("setValue", c_d2);
                        }
                        if (c_d3.eq(0)) {
                            try {
                                procento = this.getProcentoDane(30);
                            }
                            catch (GException) {
                                procento = 0;
                            }
                            [procento, castka] = this.Vypocet_dph(c_z3, false, procento, true);
                            c_d3 = procento;
                            form.findFields("c_d3").gfield("setValue", c_d3);
                        }
                        //if (m_tbcastkaD4.Value.BaseValue == 0) { //UNDONE 4. sazba
                        //l_procento = m_dtEkocdap.GetProcentoDane(40, m_tbDphRok.Value, m_tbDphMesic.Value);
                        //GDdpSdileneMetody.VypocetDPH(m_tbcastkaZ4.Value, false, l_procento, out l_zaklad, out l_dan);
                        //    m_tbcastkaD4.Value = l_dan;
                        //}
                        //
                    }
                    this.m_bPrepocet = false;
                    this.SumaCastek(c_upo, c_z0, c_z1, c_z2, c_z3, c_d0, c_d1, c_d2, c_d3, c_zao);
                }
                SumaCastek(c_upo = new Decimal(0), c_z0 = new Decimal(0), c_z1 = new Decimal(0), c_z2 = new Decimal(0), c_z3 = new Decimal(0), c_d0 = new Decimal(0), c_d1 = new Decimal(0), c_d2 = new Decimal(0), c_d3 = new Decimal(0), c_zao = new Decimal(0)) {
                    if (!this.m_bPrepocet) {
                        c_upo = c_z0.plus(c_z1).plus(c_z2).plus(c_z3).plus(c_d0).plus(c_d1).plus(c_d2).plus(c_d3).plus(c_zao);
                        //m_tbcastkaCelk.Value =
                        //    (m_tbcastkaZ0.Value.BaseValue + m_tbcastkaD0.Value.BaseValue +
                        //        m_tbcastkaZ1.Value.BaseValue + m_tbcastkaD1.Value.BaseValue +
                        //        m_tbcastkaZ2.Value.BaseValue + m_tbcastkaD2.Value.BaseValue +
                        //        m_tbcastkaZ3.Value.BaseValue + m_tbcastkaD3.Value.BaseValue +
                        //    /*m_tbcastkaZ4.Value.BaseValue + m_tbcastkaD4.Value.BaseValue +*/ m_tbcastkaZao.Value.BaseValue);
                        var form = this.findForms("formNovyPohyb");
                        form.findFields("c_upo").gfield("setValue", c_upo);
                    }
                }
                /**
                 * Funkce pro vrácení procenta daně
                 * @param danTyp - Typ daně
                 */
                getProcentoDane(danTyp) {
                    var that = this;
                    var vysledek;
                    var form = that.findForms("formNovyPohyb");
                    var rokDph = form.findFields("rok").gfield("getValue");
                    var mesicDph = form.findFields("mesic").gfield("getValue");
                    var hodnota = Decimal.add(Decimal.mul(rokDph, 100).d[0], mesicDph).d[0];
                    if (that.sazbyDPH) {
                        that.sazbyDPH.forEach(function (x) {
                            if (x.dan_typ === danTyp && x.rokmes_od <= hodnota.toString() && x.rokmes_do >= hodnota.toString()) {
                                vysledek = x.dan_proc;
                            }
                        });
                    }
                    return vysledek;
                }
                /**
                 * Metoda pro výpočet DPH
                 * @param c_p - Zadaná částka
                 * @param b_vcetne_dph - Výpočet daně - při zadání částky s dph je TRUE
                 * @param dph_proc_p - Hodnota daně
                 * @param b_new - Určtení způsobu výpočtu (true = nový)
                 */
                Vypocet_dph(c_p, b_vcetne_dph, dph_proc_p, b_new) {
                    //TODO b_new -> vytvořit metodu pro zjištění způsoby výpočtu dle Gupta fce "gf_ZpusobVypoctuDPH"
                    var that = this;
                    var c_dph_rp;
                    var c_bez_dph_rp;
                    var koef = new Decimal(0);
                    var zn = 1;
                    let sto = new Decimal(100);
                    if (c_p.lt(0)) { // Otočení znaménka pro záporné hodnoty, ze zaporné hodnoty to dává odlišný výsledek          
                        zn = (-1);
                        c_p = c_p.mul(zn);
                    }
                    if (b_vcetne_dph) { // Výpočet daně při zadáni částky s DPH 
                        if (!b_new) {
                            koef = Decimal.div(dph_proc_p, dph_proc_p.plus(sto));
                            koef = koef.toDecimalPlaces(4); // Zaokrouhlení na 4 des. místa
                            c_dph_rp = c_p.mul(koef);
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        else {
                            c_dph_rp = c_p.mul(Decimal.div(dph_proc_p, dph_proc_p.plus(sto)));
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        // Částka bez DPH
                        c_bez_dph_rp = c_p.minus(c_dph_rp);
                    }
                    else {
                        // Výpočet daně při zadání částky bez DPH
                        if (b_new == false) {
                            koef = Decimal.div(dph_proc_p, sto);
                            c_dph_rp = c_p.mul(koef);
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        else {
                            //c_dph_rp = dph_proc_p.dividedBy(sto)
                            c_dph_rp = c_p.mul(Decimal.div(dph_proc_p, sto));
                            c_dph_rp = c_dph_rp.toDecimalPlaces(2); // Zaokrouhlení na 2 des. místa
                        }
                        // Částka bez DPH
                        c_bez_dph_rp = c_p;
                    }
                    c_dph_rp = c_dph_rp.mul(zn);
                    c_bez_dph_rp = c_bez_dph_rp.mul(zn);
                    return [c_dph_rp, c_bez_dph_rp];
                }
            };
            GNovyPohyb = __decorate([
                Decorators.gcontent
            ], GNovyPohyb);
            WebClient.GNovyPohyb = GNovyPohyb;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05vdnlQb2h5Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdOb3Z5UG9oeWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUdqQixJQUFVLE1BQU0sQ0E2cUJmO0FBN3FCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E2cUJuQjtJQTdxQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTZxQjdCO1FBN3FCb0IsV0FBQSxTQUFTO1lBQzFCOzs7ZUFHRztZQUVILElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7Z0JBQTVDOztvQkFPSSx3Q0FBd0M7b0JBQ3hDLGdCQUFXLEdBQVksS0FBSyxDQUFDO29CQUc3QixtQkFBbUI7b0JBQ25CLFlBQU8sR0FBVyxDQUFDLENBQUM7Z0JBMHBCeEIsQ0FBQztnQkE1bkJHLG1DQUFtQztnQkFDbkMsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFFdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFFbkUscUNBQXFDO29CQUNyQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7eUJBQ2hDLEdBQUcsRUFBRSxDQUFDO29CQUNYLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQzFCLElBQUksQ0FBQyxVQUFV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cEMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3pCLFFBQVEsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsK0JBQStCO3dCQUMzRSxDQUFDOzZCQUNJLENBQUM7NEJBQ0Ysc0NBQXNDOzRCQUN0QyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUNqRCxRQUFRLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLCtCQUErQjt3QkFDM0UsQ0FBQzt3QkFDRCxpQkFBaUI7d0JBQ2pCLFlBQVksR0FBRyxHQUFHLENBQUM7b0JBQ3ZCLENBQUM7b0JBRUQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzVCLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUVwQyxPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFBO2dCQUNuQyxDQUFDO2FBR0osQ0FBQTtZQXRxQlksVUFBVTtnQkFEdEIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxVQUFVLENBc3FCdEI7WUF0cUJZLG9CQUFVLGFBc3FCdEIsQ0FBQTtRQUNMLENBQUMsRUE3cUJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE2cUI3QjtJQUFELENBQUMsRUE3cUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE2cUJuQjtBQUFELENBQUMsRUE3cUJTLE1BQU0sS0FBTixNQUFNLFFBNnFCZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HTm92eVBvaHliLnRzICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBwcm8gemFsb8W+ZW7DrSBub3bDqWhvIMO6xI1ldG7DrWhvIHBvaHlidSAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBIYW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0xMS0xMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKiogXHJcbiAgICAgKiBPa25vIHBybyB6YWxvxb5lbsOtIG5vdsOpaG8gw7rEjWV0bsOtaG8gcG9oeWJ1XHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBIYW51xaFcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTm92eVBvaHliIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLy8tLS1OYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAvKiogTmFkcGlzIG9rbmEgKi9cclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBCb29sIHpkYSBzZSBqZWRuw6EgbyBva25vIHBybyB2eXR2b8WZZW7DrSBuZWJvIGVkaXQgKi9cclxuICAgICAgICBFZGl0OiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBwb21vY27DoSBwcm9tLiBwb3IgcMWZZXBvxI1ldCDEjcOhc3RlayAqL1xyXG4gICAgICAgIG1fYlByZXBvY2V0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqIFrDoWtsYWRuw60gZ3JpZCBva25hIChwcm8gcMWZZWRrb250YWNlKSAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKiogbmHEjXRlbsOpIGRhdGEgKi9cclxuICAgICAgICBuYWN0ZW5lOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIC8vLS0tUEsgZGF0YVxyXG4gICAgICAgIC8qKiBQaWQgUMWZw61wYWR1IEREUCAqL1xyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiDFmMOhZGVrIMO6aHJhZHkgKi9cclxuICAgICAgICBSYWRla191aHI6IG51bWJlcjtcclxuICAgICAgICAvKiogUEsgVHlwdSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIFR5cF9waGw6IHN0cmluZztcclxuXHJcbiAgICAgICAgLy8tLS1EVE8gb2JqZWt0eVxyXG4gICAgICAgIC8qKiBEVE8gUMWZw61wYWR1ICovXHJcbiAgICAgICAgZHRvUHJpcGFkOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0bztcclxuICAgICAgICAvKiogRFRPIFDFmWVkcGlzdSAqL1xyXG4gICAgICAgIGR0b1ByZWRwaXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0bzsgICBcclxuICAgICAgICAvKiogRFRPIFR5cHUgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICB0eXBfUG9obDogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvO1xyXG5cclxuICAgICAgICAvLy0tUG9tb2Nuw6kgb2JqZWt0eVxyXG4gICAgICAgIC8qKiBTYXpieSBEUEggKi9cclxuICAgICAgICBwcml2YXRlIHNhemJ5RFBIOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0Vrb2NkYXBEdG9bXTtcclxuICAgICAgICAvKiogS3VyenkgbcSbbnkgKi9cclxuICAgICAgICBwcml2YXRlIGt1cnp5TWVueUR0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdFa29ka3VyRHRvW107XHJcbiAgICAgICAgLy8tLS1OYXN0YXZlbsOtIHBobCAgIFxyXG4gICAgICAgIC8qKiBSb2sgKi9cclxuICAgICAgICByb2s6IG51bWJlcjtcclxuICAgICAgICAvKiogVWNzICovXHJcbiAgICAgICAgdWNzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEnEjW8gKi9cclxuICAgICAgICBpY286IHN0cmluZzsgICAgICAgXHJcblxyXG4gICAgICAgIC8vKiogWsOha2xhZG7DrSBtZXRvZGEgcHJvIGNvbnRlbnQgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKFwiTmHEjcOtdMOhbSBva25vLi4uXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCBkZWZhdWx0QWN0aW9uOiB0cnVlIH1dKVxyXG5cclxuICAgICAgICAgICAgLy8gTmFwbG7Em27DrSBEVE8gb2JqZWt0dSBwcm8gc2F6YnkgRFBIXHJcbiAgICAgICAgICAgIHZhciBEUEggPSB0aGF0LmlzbC5QcmVkcGlzeS52cmF0RFBIKClcclxuICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgRFBILmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F6YnlEUEggPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZERhdGEoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBOYXBsbsSbbsOtIERUTyBvYmpla3R1IHBybyBrdXJ6eSBtxJtuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5rdXJ6eU1lbnlEdG8pIHsgLy8gfHwgdGhpcy5rdXJ6eU1lbnlEdG8gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgS3VyenkgPSB0aGF0LmlzbC5QcmVkcGlzeS52cmF0S3Vyek1lbnkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIEt1cnp5LmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmt1cnp5TWVueUR0byA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZERhdGEoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyB0aGlzLmxvYWRlZERhdGEoKSB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1haW5Gb3JtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFpbkdyaWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvYWRlZERhdGEoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5uYWN0ZW5lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hY3RlbmUgPT0gMikgeyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTWV0b2RhIHBybyBkZWZpbmljaSB6w6FrbGFkbsOtaG8gZm9ybXVsw6HFmWUgb2tuYSAqL1xyXG4gICAgICAgIGNyZWF0ZU1haW5Gb3JtKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBtYWluRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybU5vdnlQb2h5YlwiLCB9KSAvL2xheW91dERlc2NyaXB0b3I6IFwiTDJNMVMxLCBMLTItMTAtMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIlxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLYXRlZ29yaWUgcG9oeWJ1XCIpIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvXCIsIC8vVHlwIHDFmWVkcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rdGdfdXBvPXZhbHVlLmt0Z191cG87bW9kZWwua3RnX3Vwb190eHQ9dmFsdWUua3RnX3Vwb190eHRcIiwgLy8sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntrdGdfdXBvfS17a3RnX3Vwb190eHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGt0Z191cG86IDgwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2t0Z191cG86IHRoaXMubmFwbG5lbmlQb2xlKDIwMCwgMjIwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9rdGdfdXBvOiBbMjAwLDIwNSwyMDYsMjA3LDIwOCwyMDksMjEwLDIxNSwyMTddLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9oZWxwZXJDb2x1bW5zOiBbXCJrdGdfdXBvXCIsIFwia3RnX3Vwb190eHRcIl1cclxuICAgICAgICAgICAgICAgIH0pIC8vIEJVQ0RQRVAua3RnX3VwbyBcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkRhdHVtIFBvaHlidVwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJSb2sgRFBIXCIsIFwidy00XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIk1lc8OtYyBEUEhcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Vwb1wiLCBcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLkplRGFub3ZhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpLCAvLysxIHByb3Rvxb5lIG1ldG9kYSBnZXRNb250aCgpIHZyYWPDrSAwLTExXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLkplRGFub3ZhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3Bpc1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogMyxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyFTbG/FvmVuw60gRFBIIChyb8SNbsOtIHDFmWVkcGlzKS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlrDoWtsYWQgZGFuxJtcIiwgXCJ3LTQgcmlnaHRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkRhxYhcIiwgXCJ3LTQgcmlnaHRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkNlbGtlbVwiLCBcInctNCByaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPc3ZvYm96ZW5vXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kcGhfb3N2b2IoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfZDBjZWxrZW1cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3Vwb1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwiY19kXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByZXBvY2V0Q2FzdGVrKDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QwY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiAwLCAvL1RFU1RcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3BlcmF0aW9uLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY19kMFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOiByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY19kMGNlbGtlbVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkJleiBkYW7Em1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZHBoX2RwaDIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfejBjZWxrZW1cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3Vwb1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwiY196XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByZXBvY2V0Q2FzdGVrKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiXCIsIFwidy00XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196MGNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogMCwgLy9URVNUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfejBcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNfejBjZWxrZW1cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQcnZuw60gc27DrcW+ZW7DoVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZHBoX3NuaXooKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQxXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY191cG9cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNfelwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmVwb2NldENhc3RlaygxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZHBoX3NuaXooKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQxXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY191cG9cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNfZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemQxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3oxXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY19kMVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3pkMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRHJ1aMOhIHNuw63FvmVuw6FcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3ozXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRwaF9zbml6MigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDNcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3Vwb1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXRoYXQucHJ2bmlOYXN0YXZlbmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChpbnB1dC52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGF0Lm9uVmFsaWRhdGVJdGVtKFwiY196XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByZXBvY2V0Q2FzdGVrKDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19kM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kcGhfc25pejIoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQzXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY191cG9cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNfZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemQzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3ozXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY19kM1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3pkM1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2xhZG7DrSBzYXpiYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZHBoX3pha2woKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQyXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY191cG9cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNfelwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmVwb2NldENhc3RlaygxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZHBoX3pha2woKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQyXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY191cG9cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCF0aGF0LnBydm5pTmFzdGF2ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoaW5wdXQudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGhhdC5vblZhbGlkYXRlSXRlbShcImNfZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmVwb2NldENhc3RlaygwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemQyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6ID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3oyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZCA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY19kMlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bSA9IHouYWRkKGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEluaXRpYWxcIiwgc3VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJjX3pkMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiWmFva3JvdWhsZW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiXCIsIFwidy00XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3phb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogIXRoaXMuUG92b2xlbmlDWmFvKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3Vwb1wiKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIG51bGwpOyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghdGhhdC5wcnZuaU5hc3RhdmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKGlucHV0LnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQub25WYWxpZGF0ZUl0ZW0oXCJjX2RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJlcG9jZXRDYXN0ZWsoMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDoXN0a2EgcG9oeWJ1XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHQoXCJcIiwgXCJ3LTRcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlwiLCBcInctNFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgYSA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY19kMGNlbGtlbVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgYiA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196MGNlbGtlbVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgYyA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196ZDFcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbGV0IGQgPSAkKHRoaXMpLmdmb3JtKCkuZmluZEZpZWxkcyhcImNfemQyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGxldCBlID0gJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJjX3pkM1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgZiA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiY196YW9cIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbGV0IHN1bSA9IGEucGx1cyhiKS5wbHVzKGMpLnBsdXMoZCkucGx1cyhlKS5wbHVzKGYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHN1bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY2FzZSBcImNvbGxlY3RcIjogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiY191cG9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmF1bHRGb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBtYWluRm9ybSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE1ldG9kYSBwcm8gZGVmaW5pY2kgZ3JpZHUgb2tuYSAqL1xyXG4gICAgICAgIGNyZWF0ZU1haW5HcmlkKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAvLy5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjb2x1bW5zOiBuZXcgRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiU1VcIiwgY2FwdGlvbjogXCJTVVwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIkFVXCIsIGNhcHRpb246IFwiQVVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJaRFJcIiwgY2FwdGlvbjogXCJaRFJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJPRFBBXCIsIGNhcHRpb246IFwiT0RQQVwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIlBPTFwiLCBjYXB0aW9uOiBcIlBPTFwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIlBQT0xcIiwgY2FwdGlvbjogXCJQUE9MXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiUFJKXCIsIGNhcHRpb246IFwiUFJKXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiWkpcIiwgY2FwdGlvbjogXCJaSlwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIlVaXCIsIGNhcHRpb246IFwiVVpcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJPUkpcIiwgY2FwdGlvbjogXCJPUkpcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJFU0ZcIiwgY2FwdGlvbjogXCJFU0ZcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJQVlNcIiwgY2FwdGlvbjogXCJQVlNcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJPUkdcIiwgY2FwdGlvbjogXCJPUkdcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdVZVRlTmtzVXVzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ3JpZCBkb2TEm2xhdFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBidWRlIG7Em2pha8OhIGRlZmF1bHRuw60gYWtjZT8gamVzdGxpIGFubywgdGFrIGJ1xI8gb3ByYXZhIHBvbG/Fvmt5IG5lYm8gbsSbamFrw70gbm92w70gZGV0YWlsIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdEFjdGlvbjogXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJ2c1wiLCBcImNcIiwgXCJ0eXBfYWdcIiwgXCJhY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuUHJlZGtvbnRhY2UodGhhdCkgLy9uZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuRnVjLkludGVyZmFjZS5HVWVUZUR0bz4oKS5hZGRTb3J0ZWRFa29DZnVTZXQodGhhdClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0FrY2UgcG8ga2xpa251dMOtIG5hIHRsYcSNw610a28gdWxvxb5pdFxyXG4gICAgICAgIG9rKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgdWtsw6Fkw6Fuw60gcG9oeWJ1Li4uXCIpO1xyXG4gICAgICAgICAgICB2YXIgY19kdG86IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0byA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoaXMuZmluZEZvcm1zKFwiZm9ybU5vdnlQb2h5YlwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJmb3JtTm92eVBvaHliXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgY19kdG8pO1xyXG4gICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGNvbF9jX21lbmE6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3Vwb1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgY19kdG8uY191cG8gPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3Vwb1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGNfZHRvLml4cCA9IHRoaXMuSXhwO1xyXG4gICAgICAgICAgICBjX2R0by50eXBfdXBvID0gMTA7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9jX2R0by5KZURhbm92eSA9IHRoaXMuSmVEYW5vdmEoKTtcclxuXHJcbiAgICAgICAgICAgIC8vT2JqZWN0LmtleXMoY19kdG8pLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coa2V5LCBjX2R0b1trZXldKTtcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLkRkcFByaXBhZFBvaHliLnphbG96UG9oeWIocnEgPT4geyByZXR1cm4geyBkYXRhOiBjX2R0byB9IH0pXHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuaXNsLlByaXBhZFZyYXRreS5zYXZlKHJxID0+IHsgcmV0dXJuIHsgZGF0YTogY19kdG8gfSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVBPVkVETE8gU0UgVUxPxb1FTsONIFZSQVRLWVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBSYWRla191cG8gPSByZXQucmVzdWx0LmRhdGEucmFkZWtfdXBvITtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLU7EmkNPIFNFIE5FUE9WRURMT1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBNZXRvZGEgemppc3TDrSwgemRhIGplIMSNw6FzdGthIGRhxYhvdsOhICovXHJcbiAgICAgICAgSmVEYW5vdmEoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy50eXBfUG9obC5wcml6X2RwaDIgPT0gMCB8fCB0aGlzLnR5cF9Qb2hsLnByaXpfZHBoX3NuaXogPT0gMSB8fCB0aGlzLnR5cF9Qb2hsLnByaXpfZHBoX3NuaXoyID09IDEgfHwgdGhpcy50eXBfUG9obC5wcml6X2RwaF9zbml6MyA9PSAxIHx8IHRoaXMudHlwX1BvaGwucHJpel9kcGhfemFrbCA9PSAxIHx8IHRoaXMudHlwX1BvaGwucHJpel9vc3ZvYiA9PSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIE1ldG9kYSB6amlzdMOtLCB6ZGEgbcOhIGLDvXQgxI3DoXN0a2EgemFva3JvdWhsZW7DrSBwb3ZvbGVuYS4gKFrDoWxlxb7DrSBuYSBwb3ZvbGVuw71jaCBkYW7DrWNoIHUgdHlwdSBwb2hsZWTDoXZreSkqLyAgICAgICBcclxuICAgICAgICBQb3ZvbGVuaUNaYW8oKTogYm9vbGVhbntcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnR5cF9Qb2hsLnByaXpfZHBoX3NuaXogPT0gMSB8fCB0aGlzLnR5cF9Qb2hsLnByaXpfZHBoX3NuaXoyID09IDEgfHwgdGhpcy50eXBfUG9obC5wcml6X2RwaF9zbml6MyA9PSAxIHx8IHRoaXMudHlwX1BvaGwucHJpel9kcGhfemFrbCA9PSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRwaF96YWtsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMudHlwX1BvaGwucHJpel9kcGhfemFrbCA9PSAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZHBoX3NuaXooKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy50eXBfUG9obC5wcml6X2RwaF9zbml6ID09IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkcGhfc25pejIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy50eXBfUG9obC5wcml6X2RwaF9zbml6MiA9PSAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZHBoX29zdm9iKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMudHlwX1BvaGwucHJpel9vc3ZvYiA9PSAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBkcGhfZHBoMigpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnR5cF9Qb2hsLnByaXpfZHBoMiAhPSAwKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIE5hc3Rhdk51bG92ZUNhc3RreSh2c2VTbWF6YXQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tX2JQcmVwb2NldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHRoaXMuZmluZEZvcm1zKFwiZm9ybU5vdnlQb2h5YlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodnNlU21hemF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY191cG9cIikuZ2ZpZWxkPERlY2ltYWw+KFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCkpOyAvL21fdGJjYXN0a2FDZWxrLlZhbHVlID0gbmV3IEdEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfemFvXCIpLmdmaWVsZDxEZWNpbWFsPihcInNldFZhbHVlXCIsIG5ldyBEZWNpbWFsKDApKTsgLy9tX3RiY2FzdGthWmFvLlZhbHVlID0gbmV3IEdEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196MFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSk7ICAgIC8vbV90YmNhc3RrYVowLlZhbHVlID0gbmV3IEdEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196MVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSk7ICAgIC8vbV90YmNhc3RrYVoxLlZhbHVlID0gbmV3IEdEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196MlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSk7ICAgIC8vbV90YmNhc3RrYVoyLlZhbHVlID0gbmV3IEdEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY196M1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSk7ICAgIC8vbV90YmNhc3RrYVozLlZhbHVlID0gbmV3IEdEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgLy9mb3JtLmZpbmRGaWVsZHMoXCJjX3o0XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIDAgKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbV90YmNhc3RrYVo0LlZhbHVlID0gbmV3IEdEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19kMFwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSk7ICAgIC8vbV90YmNhc3RrYUQwLlZhbHVlID0gbmV3IEdEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19kMVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSk7ICAgIC8vbV90YmNhc3RrYUQxLlZhbHVlID0gbmV3IEdEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY19kMlwiKS5nZmllbGQ8RGVjaW1hbD4oXCJzZXRWYWx1ZVwiLCBuZXcgRGVjaW1hbCgwKSk7ICAgIC8vbV90YmNhc3RrYUQyLlZhbHVlID0gbmV3IEdEZWNpbWFsKDApXHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjX2QzXCIpLmdmaWVsZDxEZWNpbWFsPihcInNldFZhbHVlXCIsIG5ldyBEZWNpbWFsKDApKTsgICAgLy9tX3RiY2FzdGthRDMuVmFsdWUgPSBuZXcgR0RlY2ltYWwoMCk7XHJcbiAgICAgICAgICAgICAgICAvL2Zvcm0uZmluZEZpZWxkcyhcImNfZDRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgMCApOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tX3RiY2FzdGthRDQuVmFsdWUgPSBuZXcgR0RlY2ltYWwoMCk7ICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5tX2JQcmVwb2NldCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUHJlcG9jZXRDYXN0ZWsoc3BvY2l0YXREYW4pIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcImZvcm1Ob3Z5UG9oeWJcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fYlByZXBvY2V0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLm1fYlByZXBvY2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy92YXIgbF96YWtsYWQ6IERlY2ltYWw7IFxyXG4gICAgICAgICAgICAvL3ZhciBsX2RhbjogRGVjaW1hbDtcclxuICAgICAgICAgICAgLy92YXIgbF9wcm9jZW50bzogRGVjaW1hbDtcclxuICAgICAgICAgICAgLy8wICAgIEJleiBEUEhcclxuICAgICAgICAgICAgLy8xMCAgICBaw6FrbGFkbsOtXHJcbiAgICAgICAgICAgIC8vMjAgICAgU27DrcW+ZW7DoVxyXG4gICAgICAgICAgICAvLzMwICAgIERydWjDoSBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgIC8vNDAgICAgVMWZZXTDrSBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5KZURhbm92YSgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk5hc3Rhdk51bG92ZUNhc3RreShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBjX3VwbzogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfdXBvXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgY196MDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfejBcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBjX3oxOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY196MVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGNfejI6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3oyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgY196MzogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfejNcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vdmFyIGNfejQgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3o0XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgY19kMDogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfZDBcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBjX2QxOiBEZWNpbWFsID0gZm9ybS5maW5kRmllbGRzKFwiY19kMVwiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGNfZDI6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX2QyXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgY19kMzogRGVjaW1hbCA9IGZvcm0uZmluZEZpZWxkcyhcImNfZDNcIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIC8vdmFyIGNfZDQ6IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX2Q0XCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgY196YW86IERlY2ltYWwgPSBmb3JtLmZpbmRGaWVsZHMoXCJjX3phb1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzcG9jaXRhdERhbikge1xyXG4gICAgICAgICAgICAgICAgLy92YXIgcm9rID0gZm9ybS5maW5kRmllbGRzKFwicm9rXCIpLmdmaWVsZDxudW1iZXI+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBtZXNpYyA9IGZvcm0uZmluZEZpZWxkcyhcIm1lc2ljXCIpLmdmaWVsZDxudW1iZXI+KFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHByb2NlbnRvOyB2YXIgY2FzdGthO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjX2QxLmVxKDApKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIFtwcm9jZW50bywgY2FzdGthXSA9IHRoaXMuVnlwb2NldF9kcGgoY196MSwgZmFsc2UsIHRoaXMuZ2V0UHJvY2VudG9EYW5lKDIwKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kMSA9IHByb2NlbnRvO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfZDFcIikuZ2ZpZWxkPERlY2ltYWw+KFwic2V0VmFsdWVcIiwgY19kMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY19kMi5lcSgwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIFtwcm9jZW50bywgY2FzdGthXSA9IHRoaXMuVnlwb2NldF9kcGgoY196MiwgZmFsc2UsIHRoaXMuZ2V0UHJvY2VudG9EYW5lKDEwKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kMiA9IHByb2NlbnRvO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfZDJcIikuZ2ZpZWxkPERlY2ltYWw+KFwic2V0VmFsdWVcIiwgY19kMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNfZDMuZXEoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZW50byA9IHRoaXMuZ2V0UHJvY2VudG9EYW5lKDMwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKEdFeGNlcHRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2VudG8gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBbcHJvY2VudG8sIGNhc3RrYV0gPSB0aGlzLlZ5cG9jZXRfZHBoKGNfejMsIGZhbHNlLCBwcm9jZW50bywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kMyA9IHByb2NlbnRvO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfZDNcIikuZ2ZpZWxkPERlY2ltYWw+KFwic2V0VmFsdWVcIiwgY19kMyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2lmIChtX3RiY2FzdGthRDQuVmFsdWUuQmFzZVZhbHVlID09IDApIHsgLy9VTkRPTkUgNC4gc2F6YmFcclxuICAgICAgICAgICAgICAgIC8vbF9wcm9jZW50byA9IG1fZHRFa29jZGFwLkdldFByb2NlbnRvRGFuZSg0MCwgbV90YkRwaFJvay5WYWx1ZSwgbV90YkRwaE1lc2ljLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vR0RkcFNkaWxlbmVNZXRvZHkuVnlwb2NldERQSChtX3RiY2FzdGthWjQuVmFsdWUsIGZhbHNlLCBsX3Byb2NlbnRvLCBvdXQgbF96YWtsYWQsIG91dCBsX2Rhbik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBtX3RiY2FzdGthRDQuVmFsdWUgPSBsX2RhbjtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fYlByZXBvY2V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuU3VtYUNhc3RlayhjX3VwbyEsIGNfejAhLCBjX3oxISwgY196MiEsIGNfejMhLCBjX2QwISwgY19kMSEsIGNfZDIhLCBjX2QzISwgY196YW8hICk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU3VtYUNhc3RlayhjX3VwbzogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICBjX3owOiBEZWNpbWFsID0gbmV3IERlY2ltYWwoMCksXHJcbiAgICAgICAgICAgIGNfejE6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgY196MjogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICBjX3ozOiBEZWNpbWFsID0gbmV3IERlY2ltYWwoMCksXHJcbiAgICAgICAgICAgIGNfZDA6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgY19kMTogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICBjX2QyOiBEZWNpbWFsID0gbmV3IERlY2ltYWwoMCksXHJcbiAgICAgICAgICAgIGNfZDM6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCgwKSxcclxuICAgICAgICAgICAgY196YW86IERlY2ltYWwgPSBuZXcgRGVjaW1hbCgwKSk6IHZvaWQgIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm1fYlByZXBvY2V0KSB7XHJcbiAgICAgICAgICAgICAgICBjX3VwbyA9IGNfejAucGx1cyhjX3oxKS5wbHVzKGNfejIpLnBsdXMoY196MykucGx1cyhjX2QwKS5wbHVzKGNfZDEpLnBsdXMoY19kMikucGx1cyhjX2QzKS5wbHVzKGNfemFvKTtcclxuICAgICAgICAgICAgICAgIC8vbV90YmNhc3RrYUNlbGsuVmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgLy8gICAgKG1fdGJjYXN0a2FaMC5WYWx1ZS5CYXNlVmFsdWUgKyBtX3RiY2FzdGthRDAuVmFsdWUuQmFzZVZhbHVlICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBtX3RiY2FzdGthWjEuVmFsdWUuQmFzZVZhbHVlICsgbV90YmNhc3RrYUQxLlZhbHVlLkJhc2VWYWx1ZSArXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbV90YmNhc3RrYVoyLlZhbHVlLkJhc2VWYWx1ZSArIG1fdGJjYXN0a2FEMi5WYWx1ZS5CYXNlVmFsdWUgK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG1fdGJjYXN0a2FaMy5WYWx1ZS5CYXNlVmFsdWUgKyBtX3RiY2FzdGthRDMuVmFsdWUuQmFzZVZhbHVlICtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8qbV90YmNhc3RrYVo0LlZhbHVlLkJhc2VWYWx1ZSArIG1fdGJjYXN0a2FENC5WYWx1ZS5CYXNlVmFsdWUgKyovIG1fdGJjYXN0a2FaYW8uVmFsdWUuQmFzZVZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gdGhpcy5maW5kRm9ybXMoXCJmb3JtTm92eVBvaHliXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNfdXBvXCIpLmdmaWVsZDxEZWNpbWFsPihcInNldFZhbHVlXCIsIGNfdXBvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIHBybyB2csOhY2Vuw60gcHJvY2VudGEgZGFuxJtcclxuICAgICAgICAgKiBAcGFyYW0gZGFuVHlwIC0gVHlwIGRhbsSbXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRQcm9jZW50b0RhbmUoZGFuVHlwOiBudW1iZXIpOiBEZWNpbWFsIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyBcclxuICAgICAgICAgICAgdmFyIHZ5c2xlZGVrO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwiZm9ybU5vdnlQb2h5YlwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByb2tEcGggPSBmb3JtLmZpbmRGaWVsZHMoXCJyb2tcIikuZ2ZpZWxkPG51bWJlcj4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIG1lc2ljRHBoID0gZm9ybS5maW5kRmllbGRzKFwibWVzaWNcIikuZ2ZpZWxkPG51bWJlcj4oXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBob2Rub3RhID0gRGVjaW1hbC5hZGQoRGVjaW1hbC5tdWwocm9rRHBoLCAxMDApLmRbMF0sIG1lc2ljRHBoKS5kWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuc2F6YnlEUEgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2F6YnlEUEguZm9yRWFjaChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4LmRhbl90eXAgPT09IGRhblR5cCAmJiB4LnJva21lc19vZCEgPD0gaG9kbm90YS50b1N0cmluZygpICYmIHgucm9rbWVzX2RvISA+PSBob2Rub3RhLnRvU3RyaW5nKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnlzbGVkZWsgPSB4LmRhbl9wcm9jO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2eXNsZWRlaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdsO9cG/EjWV0IERQSFxyXG4gICAgICAgICAqIEBwYXJhbSBjX3AgLSBaYWRhbsOhIMSNw6FzdGthXHJcbiAgICAgICAgICogQHBhcmFtIGJfdmNldG5lX2RwaCAtIFbDvXBvxI1ldCBkYW7EmyAtIHDFmWkgemFkw6Fuw60gxI3DoXN0a3kgcyBkcGggamUgVFJVRVxyXG4gICAgICAgICAqIEBwYXJhbSBkcGhfcHJvY19wIC0gSG9kbm90YSBkYW7EmyBcclxuICAgICAgICAgKiBAcGFyYW0gYl9uZXcgLSBVcsSNdGVuw60genDFr3NvYnUgdsO9cG/EjXR1ICh0cnVlID0gbm92w70pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBWeXBvY2V0X2RwaChjX3A6IERlY2ltYWwsIGJfdmNldG5lX2RwaDogYm9vbGVhbiwgZHBoX3Byb2NfcDogRGVjaW1hbCwgYl9uZXc6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgLy9UT0RPIGJfbmV3IC0+IHZ5dHZvxZlpdCBtZXRvZHUgcHJvIHpqacWhdMSbbsOtIHpwxa9zb2J5IHbDvXBvxI10dSBkbGUgR3VwdGEgZmNlIFwiZ2ZfWnB1c29iVnlwb2N0dURQSFwiXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNfZHBoX3JwOiBEZWNpbWFsO1xyXG4gICAgICAgICAgICB2YXIgY19iZXpfZHBoX3JwOiBEZWNpbWFsO1xyXG4gICAgICAgICAgICB2YXIga29lZjogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICB2YXIgem46IG51bWJlciA9IDE7XHJcbiAgICAgICAgICAgIGxldCBzdG8gPSBuZXcgRGVjaW1hbCgxMDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNfcC5sdCgwKSkgeyAvLyBPdG/EjWVuw60gem5hbcOpbmthIHBybyB6w6Fwb3Juw6kgaG9kbm90eSwgemUgemFwb3Juw6kgaG9kbm90eSB0byBkw6F2w6Egb2RsacWhbsO9IHbDvXNsZWRlayAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHpuID0gKC0xKTtcclxuICAgICAgICAgICAgICAgIGNfcCA9IGNfcC5tdWwoem4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYl92Y2V0bmVfZHBoKSB7ICAgLy8gVsO9cG/EjWV0IGRhbsSbIHDFmWkgemFkw6FuaSDEjcOhc3RreSBzIERQSCBcclxuICAgICAgICAgICAgICAgIGlmICghYl9uZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICBrb2VmID0gRGVjaW1hbC5kaXYoZHBoX3Byb2NfcCwgZHBoX3Byb2NfcC5wbHVzKHN0bykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtvZWYgPSBrb2VmLnRvRGVjaW1hbFBsYWNlcyg0KSAvLyBaYW9rcm91aGxlbsOtIG5hIDQgZGVzLiBtw61zdGFcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IGNfcC5tdWwoa29lZik7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX2RwaF9ycC50b0RlY2ltYWxQbGFjZXMoMik7IC8vIFphb2tyb3VobGVuw60gbmEgMiBkZXMuIG3DrXN0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX3AubXVsKERlY2ltYWwuZGl2KGRwaF9wcm9jX3AsIGRwaF9wcm9jX3AucGx1cyhzdG8pKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY19kcGhfcnAgPSBjX2RwaF9ycC50b0RlY2ltYWxQbGFjZXMoMik7IC8vIFphb2tyb3VobGVuw60gbmEgMiBkZXMuIG3DrXN0YVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gxIzDoXN0a2EgYmV6IERQSFxyXG4gICAgICAgICAgICAgICAgY19iZXpfZHBoX3JwID0gY19wLm1pbnVzKGNfZHBoX3JwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFbDvXBvxI1ldCBkYW7EmyBwxZlpIHphZMOhbsOtIMSNw6FzdGt5IGJleiBEUEhcclxuICAgICAgICAgICAgICAgIGlmIChiX25ldyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtvZWYgPSBEZWNpbWFsLmRpdihkcGhfcHJvY19wLCBzdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19wLm11bChrb2VmKTtcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IGNfZHBoX3JwLnRvRGVjaW1hbFBsYWNlcygyKTsgLy8gWmFva3JvdWhsZW7DrSBuYSAyIGRlcy4gbcOtc3RhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NfZHBoX3JwID0gZHBoX3Byb2NfcC5kaXZpZGVkQnkoc3RvKVxyXG4gICAgICAgICAgICAgICAgICAgIGNfZHBoX3JwID0gY19wLm11bChEZWNpbWFsLmRpdihkcGhfcHJvY19wLCBzdG8pKTtcclxuICAgICAgICAgICAgICAgICAgICBjX2RwaF9ycCA9IGNfZHBoX3JwLnRvRGVjaW1hbFBsYWNlcygyKTsgLy8gWmFva3JvdWhsZW7DrSBuYSAyIGRlcy4gbcOtc3RhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyDEjMOhc3RrYSBiZXogRFBIXHJcbiAgICAgICAgICAgICAgICBjX2Jlel9kcGhfcnAgPSBjX3A7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNfZHBoX3JwID0gY19kcGhfcnAubXVsKHpuKTtcclxuICAgICAgICAgICAgY19iZXpfZHBoX3JwID0gY19iZXpfZHBoX3JwLm11bCh6bik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW2NfZHBoX3JwLCBjX2Jlel9kcGhfcnBdXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn0iXX0=