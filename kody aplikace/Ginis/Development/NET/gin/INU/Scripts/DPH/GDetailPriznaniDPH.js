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
            let GDetailPriznaniDPH = 
            /**
             *  Detail priznani dph
             */
            class GDetailPriznaniDPH extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /**
                     * Obecne property
                     *
                     *
                     */
                    this.myLoading = false;
                    this.refresh = false;
                    /**
                     * Atribut urcujici, zda se jiz byl porveden tisk
                     * */
                    this.printed = false;
                }
                onContentReady() {
                    this.taskId = "GDetailPriznaniDPHTask";
                    var that = this;
                    //at.model.eko_akt_txt
                    // doplnění prvků do tabu
                    var form = new Gordic.Forms.Form({ name: "formDetail", layoutDescriptor: "L3M3S1, L-3-9-0, M-4-8-0, S-12-12-0" /*"L3M2S1, L-12-12-0, M-12-12-0, S-12-12-0"*/ /* "L2M2S1"*/ })
                        .addSection({ label: "jres:30250071", customClass: "w-12" }) //RC 30250071 : Období DPH
                        .addSection("")
                        //.addRow().addText("jres:30250019", "w-1").addText("jres:30250020", "w-1").addText("jres:30250021", "w-2").addText("jres:30250025", "w-2")
                        //.addText("jres:30250029", "w-2")
                        //.addRow()
                        .addRow("jres:30250019")
                        .addField("gstringbox", //RC 30250019 : Rok
                    {
                        name: "rok", disabled: true,
                    })
                        .addRow("jres:30250025")
                        .addField("gstringbox", {
                        name: "s_dph_txt", disabled: true,
                    })
                        .addSection("")
                        .addRow("jres:30250020").addField("gstringbox", {
                        name: "mesic", disabled: true,
                    })
                        .addRow("jres:30250033").addField("gstringbox", {
                        name: "s_prep_dph_txt", disabled: true
                    })
                        .addSection("")
                        .addRow("jres:30250021")
                        .addField("gstringbox", {
                        name: "eko_akt_txt", disabled: true,
                    })
                        //; 
                        //var form2 = new Gordic.Forms.Form({ name: "formDetail", layoutDescriptor: "L3M2S1, L-3-9-0, M-4-8-0, S-12-12-0" /*"L3M2S1, L-12-12-0, M-12-12-0, S-12-12-0"*/  })
                        .addSection({ label: "jres:30250072", customClass: "w-12" }) //RC 30250072 : Přiznání DPH
                        .addSection("")
                        .addRow("jres:30250027").addField("gdatebox", { name: "dat_priz_max", disabled: true }) //RC 30250027 : Maximální datum pro podání přiznání k DPH
                        .addRow("jres:30250029") //RC 30250029 : Typ přiznání k DPH
                        //                .addField("gnumberbox", "w-h", {
                        .addField("gnumberbox", "w-h", {
                        name: "typ_priz_dph", disabled: true,
                        change: function (ev, obj) {
                            if (obj) {
                                if (obj.value) {
                                    if (obj.value == 10)
                                        that.typPriznani = 10 /* Interface.GETypPriznaniDPH.Radne */;
                                    if (obj.value == 20)
                                        that.typPriznani = 20 /* Interface.GETypPriznaniDPH.Opravne */;
                                    if (obj.value == 30)
                                        that.typPriznani = 30 /* Interface.GETypPriznaniDPH.Dodatecne */;
                                    if (that.subtasky) {
                                        var v_nastaveni = that.subtasky.gsubtasks("option");
                                        if (that.typPriznani == 10 /* Interface.GETypPriznaniDPH.Radne */) {
                                            v_nastaveni.params[0].action.visible(true);
                                            v_nastaveni.params[1].action.visible(false);
                                            v_nastaveni.params[2].action.visible(false);
                                            v_nastaveni.activeItem = 0;
                                        }
                                        if (that.typPriznani == 20 /* Interface.GETypPriznaniDPH.Opravne */) {
                                            v_nastaveni.params[0].action.visible(true);
                                            v_nastaveni.params[1].action.visible(true);
                                            v_nastaveni.params[2].action.visible(false);
                                            v_nastaveni.activeItem = 0;
                                        }
                                        if (that.typPriznani == 30 /* Interface.GETypPriznaniDPH.Dodatecne */) {
                                            v_nastaveni.params[0].action.visible(true);
                                            v_nastaveni.params[1].action.visible(true);
                                            v_nastaveni.params[2].action.visible(true);
                                            v_nastaveni.activeItem = 2;
                                        }
                                        that.subtasky.gsubtasks("option", v_nastaveni);
                                    }
                                }
                            }
                        }
                    })
                        .addField("gstringbox", {
                        name: "typ_priz_dph_txt", disabled: true
                    })
                        .addRow("jres:30250030").addField("gdatebox", {
                        name: "dat_priz_dph", disabled: !that.datSkutPodaniEnabled,
                        change: function (ev, obj) {
                            that.reload(obj.value);
                        }
                    }) //RC 30250030 : Datum skutečného podání přiznání DPH
                        .addRow("jres:30250032").addField("gdatebox", {
                        name: "dat_zjist_dod", disabled: !that.datZjistDuvoduEnabled,
                        validators: that.datZjistDuvoduEnabled ? [new Gordic.Validators.Required()] : [],
                        flag: that.datZjistDuvoduEnabled ? "required" : "",
                    }) //RC 30250032 : Datum zjištění důvodů pro dadatečné přiznání DPH
                    ;
                    var tabHead = $("<div>")
                        .appendTo(this.element);
                    // pro validatory ze serveru
                    this.defaultForm = this.element; //tabHead;
                    form.appendTo(tabHead);
                    var poleParams = new Array();
                    // Akce pro subtasky poslane ze serveru
                    that.seznamPoduloh.forEach(function (akceItem, i) {
                        poleParams.push({
                            action: new GAction({
                                name: "act" + i,
                                caption: akceItem.Title,
                                enabled: akceItem.Enabled,
                                run: function () {
                                    that.typPriznani = akceItem.Filtr;
                                    that.reload(null); /* Gordic.Eko.WebClient.GDetailPredkontaceMethod.reload(that);*/
                                }
                            })
                        });
                    });
                    that.subtasky = $("<div>").appendTo(this.element)
                        .gsubtasks({ params: poleParams });
                    //form2.appendTo($("<div>")
                    //    .appendTo(this.element));
                    // defincice provideru
                    let provider = new Gordic.Data.Provider((a, b) => {
                        return that.reload(null);
                    });
                    // vytvoreni akci
                    this.createAction();
                    // nastaveni procedoru na view
                    that.view = new Gordic.Data.View(that.model, { processors: { provider: provider } });
                    // definicie gridu
                    var $grid = $("<div>")
                        .css("height", "100%")
                        .appendTo(this.element)
                        .gautofit()
                        //.gtab({
                        //    title: "ROZ", opened: true, locked: true,
                        //})
                        .ggrid({
                        columnMode: "full",
                        data: that.view,
                        showHeaderRow: this.GlobalParams.EkoParams?.ROK < 2004 || (this.GlobalParams.EkoParams?.ROK == 2004 && this.mesic < 5) ? true : false,
                        columns: that.createCols()
                    });
                    // comman bar
                    that.commandBar([
                        { action: this.actions.actTisk, favorite: true },
                        { action: this.actions.actUlozit },
                        {
                            customClass: "g-button--primary",
                            action: this.actions.actZavrit
                        },
                    ]);
                    // menu bar
                    //this.menuBar([
                    //    //{ action: this.actions.actUlozit, favorite: true },
                    //    { action: this.actions.actTisk, favorite: true },
                    //]);
                    //plnění hlavičkového formuláře
                    //that.findFields()
                    //    // { initialValues: true} - nevyvola se udalost change po naplneni dat
                    //    // verificationNeeded: false  - nevyvola se validace z databaze, zda je hodnota ok
                    //    .gfield("model", "apply", that.model, { initialValues: true, setFlags: { triggerChange: false } }) // verificationNeeded: false 
                    //    ;
                    //this.view.requestData();
                    // focus na prvni editovatelnou bunku
                    if (that.datSkutPodaniEnabled || that.datZjistDuvoduEnabled)
                        this.element.find('.gfield:not(.ui-state-disabled)').first().gfield('focus');
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci() {
                    // ulozit - priznat
                    if (this.priznatPermit.value) {
                        if (this.printed) {
                            if (this.priznatPermit.value)
                                this.priznatPermit.message = "jres:30250475"; //RC 30250475 : Uložení přiznání k DPH
                            this.actions.actUlozit?.updatePermission(this.priznatPermit);
                            this.actions.actUlozit?.update({ tooltip: this.priznatPermit.message });
                        }
                        else
                            this.actions.actUlozit?.update({ ennabled: false, tooltip: "jres:30250473" }); //RC 30250473 : Přiznání není vytištěné
                    }
                    else
                        this.actions.actUlozit?.updatePermission(this.priznatPermit);
                    //if (this.GlobalParams.Params?.PovoleniProvadetPriznaniDPH && this.porCislo < 1 && this.GlobalParams.Params.RezimZpracovaniDPH == Interface.GERezimDPH.ICO)
                    //    this.actions.actUlozit?.update({ enabled: this.printed, tooltip: "jres:30250106" }); //RC 30250106 : Přiznání DPH
                    //else
                    //    this.actions.actUlozit?.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    // tisk
                    if (this.GlobalParams.Params?.PovoleniTisku)
                        this.actions.actTisk?.update({ enabled: true, tooltip: "" }); //RC 30250106 : Přiznání DPH
                    else
                        this.actions.actTisk?.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    if (this.porCislo < 1) {
                        // novy zaznam
                        this.findFields("dat_zjist_dod").gfield("option", "disabled", this.typPriznani !== 30 /* Interface.GETypPriznaniDPH.Dodatecne */);
                        this.findFields("dat_zjist_dod").gfield("option", "flag", this.typPriznani == 30 /* Interface.GETypPriznaniDPH.Dodatecne */ ? "required" : "");
                        this.findFields("dat_zjist_dod").gfield("option", "validators", this.typPriznani == 30 /* Interface.GETypPriznaniDPH.Dodatecne */ ? [new Gordic.Validators.Required()] : []);
                    }
                }
                /**
                 *  Definice sloupcu
                 *
                 * */
                createCols() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    //if (this.GlobalParams.EkoParams?.ROK! < 2004 || (this.GlobalParams.EkoParams?.ROK! == 2004 && this.mesic < 5)) {
                    gridFormat.addTextColumn({
                        name: "radek_dph",
                        caption: "jres:30250066", //RC 30250066 : Řádek
                        width: 40,
                        cellTemplate: function (radek) {
                            return (radek.priz_zobr.trim() == "000" ? "" : radek.radek_dph);
                        },
                    })
                        .addTextColumn({
                        name: "nazev_dph", caption: "jres:30250067", width: 550, //RC 30250067 : Název
                        customClass: function (radek) {
                            return radek.data.priz_zobr.trim() == "000" ? "bold" : "";
                        },
                    })
                        .addTextColumn({
                        name: "text_zaklad", /*"c_zaklad"*/ caption: "jres:30250068", width: 100, //RC 30250068 : Základ daně
                        align: "right",
                        cellTemplate: function (radek) {
                            if (radek.priznak && radek.priznak.trim() == "0" && radek.c_zaklad) {
                                return Gordic.Templates.Formatters.number(parseDecimal(radek.c_zaklad), "C2");
                                //return Gordic.Templates.Formatters.dotNetDecimal(radek.c_zaklad, "### ### ### ##0,00");
                            }
                            else
                                return radek.text_zaklad ? radek.text_zaklad : "";
                        },
                        customClass: function (radek) {
                            return (radek.data.priznak && radek.data.priznak.trim() == "0" && radek.c_zaklad) ? "bold left" : "right";
                        },
                    })
                        .addTextColumn({
                        name: "c_vstup", caption: "jres:30250069", width: 100, //RC 30250069 : Daň na vstupu
                        align: "right",
                        cellTemplate: function (radek) {
                            if (radek.priznak && radek.priznak.trim() == "0" && radek.c_vstup) {
                                //return Gordic.Templates.Formatters.dotNetDecimal(radek.c_vstup, "### ### ### ##0,00");
                                return Gordic.Templates.Formatters.number(parseDecimal(radek.c_vstup), "C2");
                            }
                            else
                                return radek.text_vstup ? "<strong>" + radek.text_vstup + "</strong>" : "";
                        }
                    })
                        .addTextColumn({
                        name: "c_vystup", caption: "jres:30250070", width: 100, //RC 30250070 : Daň na výstupu
                        align: "right",
                        cellTemplate: function (radek) {
                            if (radek.priznak && radek.priznak.trim() == "0" && radek.c_vystup) {
                                return Gordic.Templates.Formatters.number(parseDecimal(radek.c_vystup), "C2");
                                //return Gordic.Templates.Formatters.dotNetDecimal(radek.c_vystup, "### ### ### ##0,00");
                            }
                            else
                                return radek.text_vystup ? "<strong>" + radek.text_vystup + "</strong>" : "";
                        }
                    });
                    //}
                    //else
                    //{
                    //        gridFormat.addTextColumn({
                    //            name: "radek_dph",
                    //            caption: "jres:30250066", //RC 30250066 : Řádek
                    //            width: 40,
                    //            cellTemplate: function (radek) {
                    //                return (radek.priz_zobr as string).trim() == "000" ? "" : radek.radek_dph;
                    //            },
                    //        })
                    //        .addTextColumn({
                    //            name: "nazev_dph", caption: "jres:30250067", width: 550,//RC 30250067 : Název
                    //            customClass: function (radek) {
                    //                return (radek.data.priz_zobr as string).trim() == "000" ? "bold" : "";
                    //            },
                    //        }) 
                    //        .addDecimalColumn({
                    //            name: "c_zaklad", caption: "", width: 100
                    //            , cellTemplate: function (radek) {
                    //                if (radek.priznak && (radek.priznak as string).trim() == "0" && radek.c_zaklad)
                    //                    return Gordic.Templates.Formatters.dotNetDecimal(radek.c_zaklad, "###,###,###,##0.00");
                    //                else
                    //                    return radek.text_zaklad ?"<strong>" + radek.text_zaklad + "</strong>":"";
                    //            },
                    //            customClass: function (radek) {
                    //                return (radek.data.priz_zobr && (radek.data.priznak as string).trim() == "000") ? "left" : "";
                    //            },
                    //        })
                    //        .addDecimalColumn({
                    //            name: "c_vstup", caption: "", width: 100
                    //            , cellTemplate: function (radek) {
                    //                if (radek.priznak && (radek.priznak as string).trim() == "0" && radek.c_vstup)                                                                
                    //                    return Gordic.Templates.Formatters.dotNetDecimal(radek.c_vstup, "###,###,###,##0.00");
                    //                else
                    //                    return radek.text_vstup ?"<strong>" + radek.text_vstup + "</strong>":"";
                    //            }
                    //        })
                    //        .addDecimalColumn({
                    //            name: "c_vystup", caption: "", width: 100
                    //            , cellTemplate: function (radek) {
                    //                if (radek.priznak && (radek.priznak as string).trim() == "0" && radek.c_vystup)
                    //                    return Gordic.Templates.Formatters.dotNetDecimal(radek.c_vystup, "###,###,###,##0.00");
                    //                else
                    //                    return radek.text_vystup ? "<strong>" + radek.text_vystup + "</strong>":"";
                    //            }
                    //        })
                    //}
                    return gridFormat;
                }
                /**
                 *  Znovunacteni dat
                 *
                 */
                reload(datPriznani) {
                    var that = this;
                    var def = $.Deferred();
                    var zpracovani = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    // Pokud je rezim uctarny a neni jeste vybrana uctarna, je ji nutno nechat vybrat uzivatelem
                    if (this.GlobalParams.Params?.RezimZpracovaniDPH == 2 /* Interface.GERezimDPH.UUS */ && (!that.uus || that.uus == "")) {
                        Gordic.Isl.InuPriznaniDPH.listUUS()
                            .get()
                            .done(function (result) {
                            if (result.data.length == 0) {
                                // uctarny nenalezeny, beru, ze neni potreba
                                zpracovani.resolve();
                            }
                            that.dialogs.showModalWindow(Gordic.Inu.WebClient.GSeznamUctaren, { data: result.data }, "jres:30250119", 800, 600, true) //RC 30250119 : Seznam účtáren
                                .on("contentclose", function (ev, ctx) {
                                if (ctx != null) {
                                    that.uus = ctx["uus"];
                                    zpracovani.resolve();
                                }
                                else {
                                    zpracovani.reject(); // jinak reject
                                    def.reject().promise();
                                    that.close();
                                }
                            });
                        })
                            .fail(() => {
                            zpracovani.reject().promise();
                            def.reject().promise();
                        });
                    }
                    else
                        zpracovani.resolve().promise();
                    that.beginOperation("jres:30250126"); //RC 30250126 : Načítam data
                    zpracovani.done(() => {
                        Gordic.Isl.InuPriznaniDPH.read({ mesic: that.mesic, porCislo: this.porCislo, typPriznani: this.typPriznani, datSkutPriznani: datPriznani, uus: this.uus })
                            .get()
                            .done(function (result) {
                            var res = { data: result.data.PolozkyPriznani };
                            // naplneni hlavicky
                            that.findFields("rok,s_dph_txt,mesic,s_prep_dph_txt,eko_akt_txt,aktivita,s_prep_dph")
                                // { initialValues: true} - nevyvola se udalost change po naplneni dat
                                // verificationNeeded: false  - nevyvola se validace z databaze, zda je hodnota ok
                                .gfield("model", "apply", result.data.ZdanovaciObdobi, { initialValues: true, setFlags: { triggerChange: false } }) // verificationNeeded: false 
                            ;
                            that.findFields("typ_priz_dph").gfield("model", "apply", result.data.HlavickaPriznani, { initialValues: true, setFlags: { triggerChange: true } }); // verificationNeeded: false
                            that.findFields().gfield("model", "apply", result.data.HlavickaPriznani, { initialValues: true, setFlags: { triggerChange: false } }); // verificationNeeded: false
                            that.view.updateData(res.data);
                            //.gfield("model", "validators", $.extend(content.docValidators))
                            result.data.HlavickaPriznani?.dat_akt_zdo;
                            //// !!! toto je problem protoze to nastavuje typ podle priznani a prebiji to, na co uzivatel klikne
                            //that.typPriznani = result.data.HlavickaPriznani?.typ_priz_dph as Interface.GETypPriznaniDPH;
                            that.NastaveniAkci();
                            //if (that.subtasky) {
                            //    var v_nastaveni = that.subtasky.gsubtasks("option");
                            //    if (that.typPriznani == Interface.GETypPriznaniDPH.Radne) {
                            //        v_nastaveni.params[0].action.visible(true);
                            //        v_nastaveni.params[1].action.visible(false);
                            //        v_nastaveni.params[2].action.visible(false);
                            //        v_nastaveni.activeItem = 0;
                            //    }
                            //    if (that.typPriznani == Interface.GETypPriznaniDPH.Opravne) {
                            //        v_nastaveni.params[0].action.visible(true);
                            //        v_nastaveni.params[1].action.visible(true);
                            //        v_nastaveni.params[2].action.visible(false);
                            //        v_nastaveni.activeItem = 0;
                            //    }
                            //    if (that.typPriznani == Interface.GETypPriznaniDPH.Dodatecne) {
                            //        v_nastaveni.params[0].action.visible(true);
                            //        v_nastaveni.params[1].action.visible(true);
                            //        v_nastaveni.params[2].action.visible(true);
                            //        v_nastaveni.activeItem = 2;
                            //    }
                            //    that.subtasky.gsubtasks("option", v_nastaveni);
                            //}
                            //});
                            return def.resolve(res);
                        })
                            .always(function () { that.endOperation(); });
                    });
                    return def.promise();
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createAction() {
                    var that = this;
                    this.actions.addRange({
                        actUlozit: {
                            caption: "jres:30250437", captionVisible: "normal", enabled: false, run: function () {
                                that.dialogs.messageBox("jres:30450043" //RC 30450043 : Přizníní DPH
                                , "jres:30450042", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30450042 : Provést přiznání DPH (nevratná operace) ???
                                    .on("yes", function () {
                                    that.dialogs.messageBox("jres:30450043" //RC 30450043 : Přizníní DPH
                                    , "jres:30450044", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30450044 : Opravdu provést přiznání DPH (nevratná operace) ???
                                        .on("yes", function () {
                                        that.Ulozit()
                                            .done(function () {
                                            that.refresh = true;
                                            that.close({ refresh: true });
                                        });
                                    });
                                });
                            }
                        },
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } }),
                        actTisk: GAction.createPrintAction({
                            name: "actTisk",
                            caption: "jres:30250018", //RC 30250018 : Tisk
                            tooltip: "jres:30250018", //RC 30250018 : Tisk
                            icon: "gi-print",
                            tema: "inu_ptm_prizdph",
                            platnost: this.GlobalParams.EkoParams?.ROK?.toString().trim() + "12",
                            serverParameterMethod: "Gordic.Inu.WebClient.GUctPrintParameters:ServerParameterMethod",
                            dialogClosed: () => { that.printed = true; that.NastaveniAkci(); },
                            enabled: true,
                            favorite: false,
                            parentContent: that,
                            reportStarting: function (rep) {
                                var v_datum = that.findFields("dat_zjist_dod").gfield("getValue");
                                rep.customDto = {
                                    Tema: rep.tema,
                                    IDSestavy: 120 /* GEIDSestavy.DetailPriznaniDPH */,
                                    Mesic: that.mesic,
                                    TypPriznani: that.typPriznani,
                                    PorCislo: that.porCislo,
                                    DatZjisteniDod: v_datum
                                };
                            }
                        }),
                    });
                }
                /**
                 * Ulozeni dat
                 *
                 * */
                Ulozit(vstup, deferrer) {
                    var that = this;
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred(); //.promise().always(() => { content.endOperation() });
                        that.beginOperation("jres:30250038"); //RC 30250038 : Probíhá ukládání
                        vstup = {};
                        that.findFields().gfield("model", "collect", vstup); // verificationNeeded: false 
                        //vstup.rok = that.rok;
                        vstup.mesic = that.mesic;
                        vstup.por_cislo = that.porCislo;
                    }
                    return that.isl.InuPriznaniDPH.priznat({
                        datumZjisteni: vstup?.dat_zjist_dod, datSkutPriznani: vstup?.dat_priz_dph, mesicPriznani: that.mesic, porCislo: that.porCislo,
                        rokPriznani: that.GlobalParams.EkoParams?.ROK, typPriznani: that.typPriznani
                    })
                        .get()
                        .then((result) => {
                        // preberu hodnoty
                        //if (!content.otevreniBezSeznamu)
                        //    Gordic.Uct.WebClient.Seznam.ReloadRowFromDB(null, content.Ixp, true);
                        that.endOperation();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, (objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: that,
                        erroObject: objError,
                    }));
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    if (false) {
                        // v editačním režimu (tj. i po podání) dotaz na zavření bez uložení
                        this.dialogs.messageBox("jres:30250026" //RC 30250026 : Zavřít
                        , "jres:30250104", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 30250104 : Opravdu chcete zavřít detail dokladu bez uložení?
                            .on("yes", function () {
                            def.resolve({ refresh: true });
                        })
                            .on("close", def.reject);
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        def.resolve({ refresh: typeof that.refresh !== "undefined" && that.refresh === true });
                    }
                    return def.promise();
                }
            };
            GDetailPriznaniDPH = __decorate([
                gcontent
                /**
                 *  Detail priznani dph
                 */
            ], GDetailPriznaniDPH);
            WebClient.GDetailPriznaniDPH = GDetailPriznaniDPH;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFByaXpuYW5pRFBILmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbFByaXpuYW5pRFBILnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0Fnb0JmO0FBaG9CRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0Fnb0JuQjtJQWhvQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWdvQjdCO1FBaG9Cb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFNbkMsSUFBYSxrQkFBa0I7WUFIL0I7O2VBRUc7WUFDSCxNQUFhLGtCQUFtQixTQUFRLE9BQUEsWUFBWTtnQkFBcEQ7O29CQWtESTs7Ozt1QkFJRztvQkFDSSxjQUFTLEdBQVksS0FBSyxDQUFDO29CQU8zQixZQUFPLEdBQUcsS0FBSyxDQUFDO29CQUN2Qjs7eUJBRUs7b0JBQ0csWUFBTyxHQUFZLEtBQUssQ0FBQztnQkFzakJyQyxDQUFDO2dCQXJqQkcsY0FBYztvQkFHVixJQUFJLENBQUMsTUFBTSxHQUFHLHdCQUF3QixDQUFDO29CQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLHNCQUFzQjtvQkFDdEIseUJBQXlCO29CQUV6QixJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxxQ0FBcUMsQ0FBQyw2Q0FBNkMsQ0FBQyxhQUFhLEVBQUUsQ0FBQzt5QkFDeEssVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQywwQkFBMEI7eUJBQ3RGLFVBQVUsQ0FBQyxFQUFFLENBQUM7d0JBQ2YsMklBQTJJO3dCQUMzSSxrQ0FBa0M7d0JBQ2xDLFdBQVc7eUJBQ1YsTUFBTSxDQUFDLGVBQWUsQ0FBQzt5QkFD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QUFRO2dCQUNUOzttQkFFRztlQUNVLGtCQUFrQixDQXduQjlCO1lBeG5CWSw0QkFBa0IscUJBd25COUIsQ0FBQTtRQUNMLENBQUMsRUFob0JvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFnb0I3QjtJQUFELENBQUMsRUFob0JnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFnb0JuQjtBQUFELENBQUMsRUFob0JTLE1BQU0sS0FBTixNQUFNLFFBZ29CZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuSW51LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgLyoqXHJcbiAgICAgKiAgRGV0YWlsIHByaXpuYW5pIGRwaFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbFByaXpuYW5pRFBIIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDb250ZW50LCBHSW51QmFzZUNsYXNzIHsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFqYXggcHJvcGVydHlcclxuICAgICAgICAgKiAgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG1vZGVsOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvY3BmZER0b1tdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBvcmFkb3ZlIGNpc2xvIHBvZGFuaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb3JDaXNsbzogbnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1lc2ljIHByaXpuYW5pXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIG1lc2ljOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHlwIHByaXpuYW5pXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgdHlwUHJpem5hbmk6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlwUHJpem5hbmlEUEg7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJpc3R1cG5vc3QgcG9saWNrYSBkYXR1bSB6amlzdGVuaSBkdXZvZHVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBkYXRaamlzdER1dm9kdUVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJpc3R1cG5vc3QgcG9saWNrYSBkYXR1bSBza3V0LiBwb2RhbmlcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBkYXRTa3V0UG9kYW5pRW5hYmxlZDogYm9vbGVhbjtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBvdm9sZW5pIHByaXpuYXRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBwcml6bmF0UGVybWl0OkdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdQZXJtaXNzaW9uIDtcclxuICAgICAgICAvLy8vIG5vdnkgemF6bmFtXHJcbiAgICAgICAgLy9wdWJsaWMgbmV3UmVjb3JkOiBib29sZWFuO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbG5pIG5hc3RhdmVuaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcmVhZG9ubHkgR2xvYmFsUGFyYW1zOiBHb3JkaWMuSW51LldlYkNsaWVudC5HSW51R2xvYmFsRHRvO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIHN1YnRhc2t1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgc2V6bmFtUG9kdWxvaDogR29yZGljLkVrby5JbnRlcmZhY2UuR1ByZWRrb250YWNlQWtjZUR0b1tdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHVjdGFybmFcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyB1dXM6IHN0cmluZztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdWN0YXJuYVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdWJ0YXNreTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JlY25lIHByb3BlcnR5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG15TG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBWaWV3XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHZpZXc6IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLkludS5JbnRlcmZhY2UuR0Vrb2NwZmREdG8+O1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIHJlZnJlc2ggPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBdHJpYnV0IHVyY3VqaWNpLCB6ZGEgc2Ugaml6IGJ5bCBwb3J2ZWRlbiB0aXNrXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHByaW50ZWQ6IGJvb2xlYW4gPSBmYWxzZTsgICAgICAgIFxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudGFza0lkID0gXCJHRGV0YWlsUHJpem5hbmlEUEhUYXNrXCI7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9hdC5tb2RlbC5la29fYWt0X3R4dFxyXG4gICAgICAgICAgICAvLyBkb3BsbsSbbsOtIHBydmvFryBkbyB0YWJ1XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybURldGFpbFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMSwgTC0zLTktMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIgLypcIkwzTTJTMSwgTC0xMi0xMi0wLCBNLTEyLTEyLTAsIFMtMTItMTItMFwiKi8gLyogXCJMMk0yUzFcIiovIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxhYmVsOiBcImpyZXM6MzAyNTAwNzFcIiwgY3VzdG9tQ2xhc3M6IFwidy0xMlwiIH0pIC8vUkMgMzAyNTAwNzEgOiBPYmRvYsOtIERQSFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdygpLmFkZFRleHQoXCJqcmVzOjMwMjUwMDE5XCIsIFwidy0xXCIpLmFkZFRleHQoXCJqcmVzOjMwMjUwMDIwXCIsIFwidy0xXCIpLmFkZFRleHQoXCJqcmVzOjMwMjUwMDIxXCIsIFwidy0yXCIpLmFkZFRleHQoXCJqcmVzOjMwMjUwMDI1XCIsIFwidy0yXCIpXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0KFwianJlczozMDI1MDAyOVwiLCBcInctMlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDE5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIC8vUkMgMzAyNTAwMTkgOiBSb2tcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDAyNVwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDMwMjUwMDI1IDogU3RhdiBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX2RwaF90eHRcIiwgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDIwXCIsKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDMwMjUwMDIwIDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIiwgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMzNcIiwpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IC8vUkMgMzAyNTAwMzMgOiBTdGF2IHDFmWVwb8SNdHUgc3RhdsWvIERQSFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19wcmVwX2RwaF90eHRcIiwgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMjFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyAvL1JDIDMwMjUwMDIxIDogQWt0aXZpdGFcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVrb19ha3RfdHh0XCIsIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vOyBcclxuICAgICAgICAgICAgLy92YXIgZm9ybTIgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1EZXRhaWxcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMM00yUzEsIEwtMy05LTAsIE0tNC04LTAsIFMtMTItMTItMFwiIC8qXCJMM00yUzEsIEwtMTItMTItMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIiovICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYWJlbDogXCJqcmVzOjMwMjUwMDcyXCIsIGN1c3RvbUNsYXNzOiBcInctMTJcIiB9KSAvL1JDIDMwMjUwMDcyIDogUMWZaXpuw6Fuw60gRFBIXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMjdcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwiZGF0X3ByaXpfbWF4XCIsIGRpc2FibGVkOiB0cnVlIH0pIC8vUkMgMzAyNTAwMjcgOiBNYXhpbcOhbG7DrSBkYXR1bSBwcm8gcG9kw6Fuw60gcMWZaXpuw6Fuw60gayBEUEhcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDI5XCIpIC8vUkMgMzAyNTAwMjkgOiBUeXAgcMWZaXpuw6Fuw60gayBEUEhcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LWhcIiwge1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctaFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcHJpel9kcGhcIiwgZGlzYWJsZWQ6IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUgPT0gMTApIHRoYXQudHlwUHJpem5hbmkgPSBJbnRlcmZhY2UuR0VUeXBQcml6bmFuaURQSC5SYWRuZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlID09IDIwKSB0aGF0LnR5cFByaXpuYW5pID0gSW50ZXJmYWNlLkdFVHlwUHJpem5hbmlEUEguT3ByYXZuZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlID09IDMwKSB0aGF0LnR5cFByaXpuYW5pID0gSW50ZXJmYWNlLkdFVHlwUHJpem5hbmlEUEguRG9kYXRlY25lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5zdWJ0YXNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdl9uYXN0YXZlbmkgPSB0aGF0LnN1YnRhc2t5LmdzdWJ0YXNrcyhcIm9wdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQudHlwUHJpem5hbmkgPT0gSW50ZXJmYWNlLkdFVHlwUHJpem5hbmlEUEguUmFkbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZfbmFzdGF2ZW5pLnBhcmFtc1swXS5hY3Rpb24udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZfbmFzdGF2ZW5pLnBhcmFtc1sxXS5hY3Rpb24udmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2X25hc3RhdmVuaS5wYXJhbXNbMl0uYWN0aW9uLnZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdl9uYXN0YXZlbmkuYWN0aXZlSXRlbSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQudHlwUHJpem5hbmkgPT0gSW50ZXJmYWNlLkdFVHlwUHJpem5hbmlEUEguT3ByYXZuZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdl9uYXN0YXZlbmkucGFyYW1zWzBdLmFjdGlvbi52aXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdl9uYXN0YXZlbmkucGFyYW1zWzFdLmFjdGlvbi52aXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdl9uYXN0YXZlbmkucGFyYW1zWzJdLmFjdGlvbi52aXNpYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZfbmFzdGF2ZW5pLmFjdGl2ZUl0ZW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnR5cFByaXpuYW5pID09IEludGVyZmFjZS5HRVR5cFByaXpuYW5pRFBILkRvZGF0ZWNuZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdl9uYXN0YXZlbmkucGFyYW1zWzBdLmFjdGlvbi52aXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdl9uYXN0YXZlbmkucGFyYW1zWzFdLmFjdGlvbi52aXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdl9uYXN0YXZlbmkucGFyYW1zWzJdLmFjdGlvbi52aXNpYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdl9uYXN0YXZlbmkuYWN0aXZlSXRlbSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3VidGFza3kuZ3N1YnRhc2tzKFwib3B0aW9uXCIsIHZfbmFzdGF2ZW5pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3ByaXpfZHBoX3R4dFwiLCBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMzBcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfcHJpel9kcGhcIiwgZGlzYWJsZWQ6ICF0aGF0LmRhdFNrdXRQb2RhbmlFbmFibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWQob2JqLnZhbHVlIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSkgLy9SQyAzMDI1MDAzMCA6IERhdHVtIHNrdXRlxI1uw6lobyBwb2TDoW7DrSBwxZlpem7DoW7DrSBEUEhcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDMyXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3pqaXN0X2RvZFwiLCBkaXNhYmxlZDogIXRoYXQuZGF0Wmppc3REdXZvZHVFbmFibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IHRoYXQuZGF0Wmppc3REdXZvZHVFbmFibGVkID8gW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSA6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IHRoYXQuZGF0Wmppc3REdXZvZHVFbmFibGVkID8gXCJyZXF1aXJlZFwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgIH0pIC8vUkMgMzAyNTAwMzIgOiBEYXR1bSB6amnFoXTEm27DrSBkxa92b2TFryBwcm8gZGFkYXRlxI1uw6kgcMWZaXpuw6Fuw60gRFBIXHJcbiAgICAgICAgICAgICAgICA7IFxyXG4gICAgICAgICAgICB2YXIgdGFiSGVhZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC8vLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgLy90aXRsZTogXCJqcmVzOjMwMjUwMDIxXCIsIC8vUkMgMzAyNTAwMjEgOiBBa3Rpdml0YVxyXG4gICAgICAgICAgICAgICAgLy8gICAgb3BlbmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIC8vIHBybyB2YWxpZGF0b3J5IHplIHNlcnZlcnVcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSA9IHRoaXMuZWxlbWVudDsvL3RhYkhlYWQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3JtLmFwcGVuZFRvKHRhYkhlYWQpO1xyXG4gICAgICAgICAgICB2YXIgcG9sZVBhcmFtcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAvLyBBa2NlIHBybyBzdWJ0YXNreSBwb3NsYW5lIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgdGhhdC5zZXpuYW1Qb2R1bG9oLmZvckVhY2goZnVuY3Rpb24gKGFrY2VJdGVtOiBhbnksIGk6IE51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgcG9sZVBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFwiICsgaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGFrY2VJdGVtLlRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogYWtjZUl0ZW0uRW5hYmxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHlwUHJpem5hbmkgPSBha2NlSXRlbS5GaWx0cjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlbG9hZChudWxsIGFzIGFueSk7IC8qIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdEZXRhaWxQcmVka29udGFjZU1ldGhvZC5yZWxvYWQodGhhdCk7Ki9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnN1YnRhc2t5ID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nc3VidGFza3MoeyBwYXJhbXM6IHBvbGVQYXJhbXMgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2Zvcm0yLmFwcGVuZFRvKCQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAvLyAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KSk7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmNpY2UgcHJvdmlkZXJ1XHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQucmVsb2FkKG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbmkgcHJvY2Vkb3J1IG5hIHZpZXdcclxuICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLkludS5JbnRlcmZhY2UuR0Vrb2NwZmREdG8+KHRoYXQubW9kZWwsIHsgcHJvY2Vzc29yczogeyBwcm92aWRlcjogcHJvdmlkZXIgfSB9KTtcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2llIGdyaWR1XHJcbiAgICAgICAgICAgIHZhciAkZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLy8uZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aXRsZTogXCJST1pcIiwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SGVhZGVyUm93OiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyEgPCAyMDA0IHx8ICh0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyEgPT0gMjAwNCAmJiB0aGlzLm1lc2ljIDwgNSk/dHJ1ZTpmYWxzZSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlQ29scygpXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gY29tbWFuIGJhclxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RUaXNrLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RVbG96aXQgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFphdnJpdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAvLyBtZW51IGJhclxyXG4gICAgICAgICAgICAvL3RoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgIC8vICAgIC8veyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RVbG96aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VGlzaywgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy9dKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9wbG7Em27DrSBobGF2acSNa292w6lobyBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAvL3RoYXQuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgIC8vICAgIC8vIHsgaW5pdGlhbFZhbHVlczogdHJ1ZX0gLSBuZXZ5dm9sYSBzZSB1ZGFsb3N0IGNoYW5nZSBwbyBuYXBsbmVuaSBkYXRcclxuICAgICAgICAgICAgLy8gICAgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSAgLSBuZXZ5dm9sYSBzZSB2YWxpZGFjZSB6IGRhdGFiYXplLCB6ZGEgamUgaG9kbm90YSBva1xyXG4gICAgICAgICAgICAvLyAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUsIHNldEZsYWdzOiB7IHRyaWdnZXJDaGFuZ2U6IGZhbHNlIH0gfSkgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSBcclxuXHJcbiAgICAgICAgICAgIC8vICAgIDtcclxuICAgICAgICAgICAgLy90aGlzLnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgLy8gZm9jdXMgbmEgcHJ2bmkgZWRpdG92YXRlbG5vdSBidW5rdVxyXG4gICAgICAgICAgICBpZiAodGhhdC5kYXRTa3V0UG9kYW5pRW5hYmxlZCB8fCB0aGF0LmRhdFpqaXN0RHV2b2R1RW5hYmxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kKCcuZ2ZpZWxkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpJykuZmlyc3QoKS5nZmllbGQoJ2ZvY3VzJyk7XHJcblxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBOYXN0YXZlbmlBa2NpKCkge1xyXG5cclxuICAgICAgICAgICAgLy8gdWxveml0IC0gcHJpem5hdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcml6bmF0UGVybWl0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmludGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJpem5hdFBlcm1pdC52YWx1ZSkgdGhpcy5wcml6bmF0UGVybWl0Lm1lc3NhZ2UgPSBcImpyZXM6MzAyNTA0NzVcIjsgLy9SQyAzMDI1MDQ3NSA6IFVsb8W+ZW7DrSBwxZlpem7DoW7DrSBrIERQSFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RVbG96aXQ/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5wcml6bmF0UGVybWl0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VWxveml0Py51cGRhdGUoeyB0b29sdGlwOiB0aGlzLnByaXpuYXRQZXJtaXQubWVzc2FnZSB9KTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFVsb3ppdD8udXBkYXRlKHsgZW5uYWJsZWQ6IGZhbHNlLCB0b29sdGlwOiBcImpyZXM6MzAyNTA0NzNcIiB9KTsgLy9SQyAzMDI1MDQ3MyA6IFDFmWl6bsOhbsOtIG5lbsOtIHZ5dGnFoXTEm27DqVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RVbG96aXQ/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5wcml6bmF0UGVybWl0KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5HbG9iYWxQYXJhbXMuUGFyYW1zPy5Qb3ZvbGVuaVByb3ZhZGV0UHJpem5hbmlEUEggJiYgdGhpcy5wb3JDaXNsbyA8IDEgJiYgdGhpcy5HbG9iYWxQYXJhbXMuUGFyYW1zLlJlemltWnByYWNvdmFuaURQSCA9PSBJbnRlcmZhY2UuR0VSZXppbURQSC5JQ08pXHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYWN0aW9ucy5hY3RVbG96aXQ/LnVwZGF0ZSh7IGVuYWJsZWQ6IHRoaXMucHJpbnRlZCwgdG9vbHRpcDogXCJqcmVzOjMwMjUwMTA2XCIgfSk7IC8vUkMgMzAyNTAxMDYgOiBQxZlpem7DoW7DrSBEUEhcclxuICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYWN0aW9ucy5hY3RVbG96aXQ/LnVwZGF0ZSh7IGVuYWJsZWQ6IGZhbHNlLCB0b29sdGlwOiBcImpyZXM6MzAyNTAxMDVcIiB9KTsgLy9SQyAzMDI1MDEwNSA6IE5lbsOtIHBvdm9sZW5vIHBhcmFtZXRyZW1cclxuICAgICAgICAgICAgLy8gdGlza1xyXG4gICAgICAgICAgICBpZiAodGhpcy5HbG9iYWxQYXJhbXMuUGFyYW1zPy5Qb3ZvbGVuaVRpc2t1IClcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrPy51cGRhdGUoeyBlbmFibGVkOiB0cnVlLCB0b29sdGlwOiBcIlwiIH0pOyAvL1JDIDMwMjUwMTA2IDogUMWZaXpuw6Fuw60gRFBIXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogXCJqcmVzOjMwMjUwMTA1XCIgfSk7IC8vUkMgMzAyNTAxMDUgOiBOZW7DrSBwb3ZvbGVubyBwYXJhbWV0cmVtXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3JDaXNsbyA8IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIG5vdnkgemF6bmFtXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJkYXRfemppc3RfZG9kXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRoaXMudHlwUHJpem5hbmkgIT09IEludGVyZmFjZS5HRVR5cFByaXpuYW5pRFBILkRvZGF0ZWNuZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJkYXRfemppc3RfZG9kXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImZsYWdcIiwgdGhpcy50eXBQcml6bmFuaSA9PSBJbnRlcmZhY2UuR0VUeXBQcml6bmFuaURQSC5Eb2RhdGVjbmUgPyBcInJlcXVpcmVkXCIgOiBcIlwiICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoXCJkYXRfemppc3RfZG9kXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy50eXBQcml6bmFuaSA9PSBJbnRlcmZhY2UuR0VUeXBQcml6bmFuaURQSC5Eb2RhdGVjbmUgPyBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIDogW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvY3BmZER0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFa29jcGZkRHRvPigpXHJcblxyXG5cclxuICAgICAgICAgICAgLy9pZiAodGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0shIDwgMjAwNCB8fCAodGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0shID09IDIwMDQgJiYgdGhpcy5tZXNpYyA8IDUpKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19kcGhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNjZcIiwgLy9SQyAzMDI1MDA2NiA6IMWYw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAocmFkZWspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgocmFkZWsucHJpel96b2JyIGFzIHN0cmluZykudHJpbSgpID09IFwiMDAwXCIgPyBcIlwiIDogcmFkZWsucmFkZWtfZHBoKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9kcGhcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDY3XCIsIHdpZHRoOiA1NTAsIC8vUkMgMzAyNTAwNjcgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogZnVuY3Rpb24gKHJhZGVrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAocmFkZWsuZGF0YS5wcml6X3pvYnIgYXMgc3RyaW5nKS50cmltKCkgPT0gXCIwMDBcIiA/IFwiYm9sZFwiIDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0ZXh0X3pha2xhZFwiLC8qXCJjX3pha2xhZFwiKi8gY2FwdGlvbjogXCJqcmVzOjMwMjUwMDY4XCIsIHdpZHRoOiAxMDAsIC8vUkMgMzAyNTAwNjggOiBaw6FrbGFkIGRhbsSbXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwicmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChyYWRlaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFkZWsucHJpem5hayAmJiAocmFkZWsucHJpem5hayBhcyBzdHJpbmcpLnRyaW0oKSA9PSBcIjBcIiAmJiByYWRlay5jX3pha2xhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIocGFyc2VEZWNpbWFsKHJhZGVrLmNfemFrbGFkKSwgXCJDMlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kb3ROZXREZWNpbWFsKHJhZGVrLmNfemFrbGFkLCBcIiMjIyAjIyMgIyMjICMjMCwwMFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFkZWsudGV4dF96YWtsYWQgPyAgcmFkZWsudGV4dF96YWtsYWQgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IGZ1bmN0aW9uIChyYWRlaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJhZGVrLmRhdGEucHJpem5hayAmJiAocmFkZWsuZGF0YS5wcml6bmFrIGFzIHN0cmluZykudHJpbSgpID09IFwiMFwiICYmIHJhZGVrLmNfemFrbGFkKSA/IFwiYm9sZCBsZWZ0XCIgOiBcInJpZ2h0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY192c3R1cFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNjlcIiwgd2lkdGg6IDEwMCwgLy9SQyAzMDI1MDA2OSA6IERhxYggbmEgdnN0dXB1XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwicmlnaHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChyYWRlayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRlay5wcml6bmFrICYmIChyYWRlay5wcml6bmFrIGFzIHN0cmluZykudHJpbSgpID09IFwiMFwiICYmIHJhZGVrLmNfdnN0dXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kb3ROZXREZWNpbWFsKHJhZGVrLmNfdnN0dXAsIFwiIyMjICMjIyAjIyMgIyMwLDAwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5udW1iZXIocGFyc2VEZWNpbWFsKHJhZGVrLmNfdnN0dXApLCBcIkMyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFkZWsudGV4dF92c3R1cCA/IFwiPHN0cm9uZz5cIiArIHJhZGVrLnRleHRfdnN0dXAgKyBcIjwvc3Ryb25nPlwiIDogXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfdnlzdHVwXCIsIGNhcHRpb246IFwianJlczozMDI1MDA3MFwiLCB3aWR0aDogMTAwLCAvL1JDIDMwMjUwMDcwIDogRGHFiCBuYSB2w71zdHVwdVxyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduOiBcInJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAocmFkZWspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhZGVrLnByaXpuYWsgJiYgKHJhZGVrLnByaXpuYWsgYXMgc3RyaW5nKS50cmltKCkgPT0gXCIwXCIgJiYgcmFkZWsuY192eXN0dXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHBhcnNlRGVjaW1hbChyYWRlay5jX3Z5c3R1cCksIFwiQzJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMuZG90TmV0RGVjaW1hbChyYWRlay5jX3Z5c3R1cCwgXCIjIyMgIyMjICMjIyAjIzAsMDBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJhZGVrLnRleHRfdnlzdHVwID8gXCI8c3Ryb25nPlwiICsgcmFkZWsudGV4dF92eXN0dXAgKyBcIjwvc3Ryb25nPlwiIDogXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcInJhZGVrX2RwaFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA2NlwiLCAvL1JDIDMwMjUwMDY2IDogxZjDoWRla1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHdpZHRoOiA0MCxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChyYWRlaykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gKHJhZGVrLnByaXpfem9iciBhcyBzdHJpbmcpLnRyaW0oKSA9PSBcIjAwMFwiID8gXCJcIiA6IHJhZGVrLnJhZGVrX2RwaDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcIm5hemV2X2RwaFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNjdcIiwgd2lkdGg6IDU1MCwvL1JDIDMwMjUwMDY3IDogTsOhemV2XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IGZ1bmN0aW9uIChyYWRlaykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gKHJhZGVrLmRhdGEucHJpel96b2JyIGFzIHN0cmluZykudHJpbSgpID09IFwiMDAwXCIgPyBcImJvbGRcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLmFkZERlY2ltYWxDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiY196YWtsYWRcIiwgY2FwdGlvbjogXCJcIiwgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICwgY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAocmFkZWspIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHJhZGVrLnByaXpuYWsgJiYgKHJhZGVrLnByaXpuYWsgYXMgc3RyaW5nKS50cmltKCkgPT0gXCIwXCIgJiYgcmFkZWsuY196YWtsYWQpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLmRvdE5ldERlY2ltYWwocmFkZWsuY196YWtsYWQsIFwiIyMjLCMjIywjIyMsIyMwLjAwXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFkZWsudGV4dF96YWtsYWQgP1wiPHN0cm9uZz5cIiArIHJhZGVrLnRleHRfemFrbGFkICsgXCI8L3N0cm9uZz5cIjpcIlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IGZ1bmN0aW9uIChyYWRlaykge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gKHJhZGVrLmRhdGEucHJpel96b2JyICYmIChyYWRlay5kYXRhLnByaXpuYWsgYXMgc3RyaW5nKS50cmltKCkgPT0gXCIwMDBcIikgPyBcImxlZnRcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAuYWRkRGVjaW1hbENvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJjX3ZzdHVwXCIsIGNhcHRpb246IFwiXCIsIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAsIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKHJhZGVrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGlmIChyYWRlay5wcml6bmFrICYmIChyYWRlay5wcml6bmFrIGFzIHN0cmluZykudHJpbSgpID09IFwiMFwiICYmIHJhZGVrLmNfdnN0dXApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kb3ROZXREZWNpbWFsKHJhZGVrLmNfdnN0dXAsIFwiIyMjLCMjIywjIyMsIyMwLjAwXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFkZWsudGV4dF92c3R1cCA/XCI8c3Ryb25nPlwiICsgcmFkZWsudGV4dF92c3R1cCArIFwiPC9zdHJvbmc+XCI6XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gICAgICAgIC5hZGREZWNpbWFsQ29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImNfdnlzdHVwXCIsIGNhcHRpb246IFwiXCIsIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAsIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKHJhZGVrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGlmIChyYWRlay5wcml6bmFrICYmIChyYWRlay5wcml6bmFrIGFzIHN0cmluZykudHJpbSgpID09IFwiMFwiICYmIHJhZGVrLmNfdnlzdHVwKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5UZW1wbGF0ZXMuRm9ybWF0dGVycy5kb3ROZXREZWNpbWFsKHJhZGVrLmNfdnlzdHVwLCBcIiMjIywjIyMsIyMjLCMjMC4wMFwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJhZGVrLnRleHRfdnlzdHVwID8gXCI8c3Ryb25nPlwiICsgcmFkZWsudGV4dF92eXN0dXAgKyBcIjwvc3Ryb25nPlwiOlwiXCI7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIFpub3Z1bmFjdGVuaSBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlbG9hZChkYXRQcml6bmFuaTpEYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIHpwcmFjb3ZhbmkgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAvLyBQb2t1ZCBqZSByZXppbSB1Y3Rhcm55IGEgbmVuaSBqZXN0ZSB2eWJyYW5hIHVjdGFybmEsIGplIGppIG51dG5vIG5lY2hhdCB2eWJyYXQgdXppdmF0ZWxlbVxyXG4gICAgICAgICAgICBpZiAodGhpcy5HbG9iYWxQYXJhbXMuUGFyYW1zPy5SZXppbVpwcmFjb3ZhbmlEUEggPT0gSW50ZXJmYWNlLkdFUmV6aW1EUEguVVVTICYmICghdGhhdC51dXMgfHwgdGhhdC51dXMgPT0gXCJcIikpIHtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuSW51UHJpem5hbmlEUEgubGlzdFVVUygpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVjdGFybnkgbmVuYWxlemVueSwgYmVydSwgemUgbmVuaSBwb3RyZWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6cHJhY292YW5pLnJlc29sdmUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhHb3JkaWMuSW51LldlYkNsaWVudC5HU2V6bmFtVWN0YXJlbiwgeyBkYXRhOiByZXN1bHQuZGF0YSB9LCBcImpyZXM6MzAyNTAxMTlcIiwgODAwLCA2MDAsIHRydWUpIC8vUkMgMzAyNTAxMTkgOiBTZXpuYW0gw7rEjXTDoXJlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjb250ZW50Y2xvc2VcIiwgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHggIT0gbnVsbCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnV1cyA9IGN0eFtcInV1c1wiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6cHJhY292YW5pLnJlc29sdmUoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpwcmFjb3ZhbmkucmVqZWN0KCk7IC8vIGppbmFrIHJlamVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgenByYWNvdmFuaS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgenByYWNvdmFuaS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDEyNlwiKTsgLy9SQyAzMDI1MDEyNiA6IE5hxI3DrXRhbSBkYXRhXHJcbiAgICAgICAgICAgIHpwcmFjb3ZhbmkuZG9uZSgoKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgR29yZGljLklzbC5JbnVQcml6bmFuaURQSC5yZWFkKHsgbWVzaWM6IHRoYXQubWVzaWMsIHBvckNpc2xvOiB0aGlzLnBvckNpc2xvLCB0eXBQcml6bmFuaTogdGhpcy50eXBQcml6bmFuaSwgZGF0U2t1dFByaXpuYW5pOiBkYXRQcml6bmFuaSwgdXVzOiB0aGlzLnV1cyB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcyA9IHsgZGF0YTogcmVzdWx0LmRhdGEuUG9sb3preVByaXpuYW5pIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hcGxuZW5pIGhsYXZpY2t5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInJvayxzX2RwaF90eHQsbWVzaWMsc19wcmVwX2RwaF90eHQsZWtvX2FrdF90eHQsYWt0aXZpdGEsc19wcmVwX2RwaFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8geyBpbml0aWFsVmFsdWVzOiB0cnVlfSAtIG5ldnl2b2xhIHNlIHVkYWxvc3QgY2hhbmdlIHBvIG5hcGxuZW5pIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSAgLSBuZXZ5dm9sYSBzZSB2YWxpZGFjZSB6IGRhdGFiYXplLCB6ZGEgamUgaG9kbm90YSBva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgcmVzdWx0LmRhdGEuWmRhbm92YWNpT2Jkb2JpLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUsIHNldEZsYWdzOiB7IHRyaWdnZXJDaGFuZ2U6IGZhbHNlIH0gfSkgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwidHlwX3ByaXpfZHBoXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgcmVzdWx0LmRhdGEuSGxhdmlja2FQcml6bmFuaSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlLCBzZXRGbGFnczogeyB0cmlnZ2VyQ2hhbmdlOiB0cnVlIH0gfSkgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHJlc3VsdC5kYXRhLkhsYXZpY2thUHJpem5hbmksIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSB9KSAvLyB2ZXJpZmljYXRpb25OZWVkZWQ6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcudXBkYXRlRGF0YShyZXMuZGF0YSEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8uZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsICQuZXh0ZW5kKGNvbnRlbnQuZG9jVmFsaWRhdG9ycykpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0YS5IbGF2aWNrYVByaXpuYW5pPy5kYXRfYWt0X3pkb1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLyAhISEgdG90byBqZSBwcm9ibGVtIHByb3RvemUgdG8gbmFzdGF2dWplIHR5cCBwb2RsZSBwcml6bmFuaSBhIHByZWJpamkgdG8sIG5hIGNvIHV6aXZhdGVsIGtsaWtuZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudHlwUHJpem5hbmkgPSByZXN1bHQuZGF0YS5IbGF2aWNrYVByaXpuYW5pPy50eXBfcHJpel9kcGggYXMgSW50ZXJmYWNlLkdFVHlwUHJpem5hbmlEUEg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoYXQuc3VidGFza3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIHZfbmFzdGF2ZW5pID0gdGhhdC5zdWJ0YXNreS5nc3VidGFza3MoXCJvcHRpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGF0LnR5cFByaXpuYW5pID09IEludGVyZmFjZS5HRVR5cFByaXpuYW5pRFBILlJhZG5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB2X25hc3RhdmVuaS5wYXJhbXNbMF0uYWN0aW9uLnZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB2X25hc3RhdmVuaS5wYXJhbXNbMV0uYWN0aW9uLnZpc2libGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdl9uYXN0YXZlbmkucGFyYW1zWzJdLmFjdGlvbi52aXNpYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZfbmFzdGF2ZW5pLmFjdGl2ZUl0ZW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGF0LnR5cFByaXpuYW5pID09IEludGVyZmFjZS5HRVR5cFByaXpuYW5pRFBILk9wcmF2bmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZfbmFzdGF2ZW5pLnBhcmFtc1swXS5hY3Rpb24udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZfbmFzdGF2ZW5pLnBhcmFtc1sxXS5hY3Rpb24udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZfbmFzdGF2ZW5pLnBhcmFtc1syXS5hY3Rpb24udmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB2X25hc3RhdmVuaS5hY3RpdmVJdGVtID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodGhhdC50eXBQcml6bmFuaSA9PSBJbnRlcmZhY2UuR0VUeXBQcml6bmFuaURQSC5Eb2RhdGVjbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZfbmFzdGF2ZW5pLnBhcmFtc1swXS5hY3Rpb24udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZfbmFzdGF2ZW5pLnBhcmFtc1sxXS5hY3Rpb24udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZfbmFzdGF2ZW5pLnBhcmFtc1syXS5hY3Rpb24udmlzaWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZfbmFzdGF2ZW5pLmFjdGl2ZUl0ZW0gPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LnN1YnRhc2t5LmdzdWJ0YXNrcyhcIm9wdGlvblwiLCB2X25hc3RhdmVuaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQzN1wiLCBjYXB0aW9uVmlzaWJsZTogXCJub3JtYWxcIiwgZW5hYmxlZDogZmFsc2UsIHJ1bjogZnVuY3Rpb24gKCkgeyAvL1JDIDMwMjUwNDM3IDogUMWZaXpuYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwNDUwMDQzXCIgLy9SQyAzMDQ1MDA0MyA6IFDFmWl6bsOtbsOtIERQSFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBcImpyZXM6MzA0NTAwNDJcIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbikgLy9SQyAzMDQ1MDA0MiA6IFByb3bDqXN0IHDFmWl6bsOhbsOtIERQSCAobmV2cmF0bsOhIG9wZXJhY2UpID8/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzA0NTAwNDNcIiAvL1JDIDMwNDUwMDQzIDogUMWZaXpuw61uw60gRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgXCJqcmVzOjMwNDUwMDQ0XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pIC8vUkMgMzA0NTAwNDQgOiBPcHJhdmR1IHByb3bDqXN0IHDFmWl6bsOhbsOtIERQSCAobmV2cmF0bsOhIG9wZXJhY2UpID8/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5VbG96aXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSh7IHJlZnJlc2g6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoeyBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIGFjdFRpc2s6IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAxOFwiLCAvL1JDIDMwMjUwMDE4IDogVGlza1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDAxOFwiLCAvL1JDIDMwMjUwMDE4IDogVGlza1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpbnRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJpbnVfcHRtX3ByaXpkcGhcIiwgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdG5vc3Q6IHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LPy50b1N0cmluZygpLnRyaW0oKSArIFwiMTJcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkludS5XZWJDbGllbnQuR1VjdFByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RcIixcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dDbG9zZWQ6ICgpID0+IHsgdGhhdC5wcmludGVkID0gdHJ1ZTsgdGhhdC5OYXN0YXZlbmlBa2NpKCk7fSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2X2RhdHVtID0gdGhhdC5maW5kRmllbGRzKFwiZGF0X3pqaXN0X2RvZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZW1hOiByZXAudGVtYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEU2VzdGF2eTogR0VJRFNlc3RhdnkuRGV0YWlsUHJpem5hbmlEUEgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZXNpYzogdGhhdC5tZXNpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cFByaXpuYW5pOiB0aGF0LnR5cFByaXpuYW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9yQ2lzbG86IHRoYXQucG9yQ2lzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRaamlzdGVuaURvZDogdl9kYXR1bSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvemVuaSBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgVWxveml0KHZzdHVwPzogR29yZGljLkludS5JbnRlcmZhY2UuR0hsYXZpY2thUHJpem5hbmlEUEhEdG8sIGRlZmVycmVyPzogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZlcnJlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7Ly8ucHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7IGNvbnRlbnQuZW5kT3BlcmF0aW9uKCkgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDAzOFwiKTsgLy9SQyAzMDI1MDAzOCA6IFByb2LDrWjDoSB1a2zDoWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgdnN0dXAgPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCB2c3R1cCkgLy8gdmVyaWZpY2F0aW9uTmVlZGVkOiBmYWxzZSBcclxuICAgICAgICAgICAgICAgIC8vdnN0dXAucm9rID0gdGhhdC5yb2s7XHJcbiAgICAgICAgICAgICAgICB2c3R1cC5tZXNpYyA9IHRoYXQubWVzaWM7XHJcbiAgICAgICAgICAgICAgICB2c3R1cC5wb3JfY2lzbG8gPSB0aGF0LnBvckNpc2xvO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5JbnVQcml6bmFuaURQSC5wcml6bmF0KHtcclxuICAgICAgICAgICAgICAgIGRhdHVtWmppc3Rlbmk6IHZzdHVwPy5kYXRfemppc3RfZG9kISwgZGF0U2t1dFByaXpuYW5pOiB2c3R1cD8uZGF0X3ByaXpfZHBoISwgbWVzaWNQcml6bmFuaTogdGhhdC5tZXNpYywgcG9yQ2lzbG86IHRoYXQucG9yQ2lzbG8sXHJcbiAgICAgICAgICAgICAgICByb2tQcml6bmFuaTogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0shLCB0eXBQcml6bmFuaTogdGhhdC50eXBQcml6bmFuaVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlYmVydSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCFjb250ZW50Lm90ZXZyZW5pQmV6U2V6bmFtdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlbG9hZFJvd0Zyb21EQihudWxsLCBjb250ZW50Lkl4cCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAob2JqRXJyb3I6IEVycm9yKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRXhjZXB0aW9uUHJvY2Vzc2luZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb09iamVjdDogb2JqRXJyb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+ICB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgaWYgKGZhbHNlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyB2IGVkaXRhxI1uw61tIHJlxb5pbXUgKHRqLiBpIHBvIHBvZMOhbsOtKSBkb3RheiBuYSB6YXbFmWVuw60gYmV6IHVsb8W+ZW7DrVxyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAwMjZcIiAvL1JDIDMwMjUwMDI2IDogWmF2xZnDrXRcclxuICAgICAgICAgICAgICAgICwgXCJqcmVzOjMwMjUwMTA0XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pIC8vUkMgMzAyNTAxMDQgOiBPcHJhdmR1IGNoY2V0ZSB6YXbFmcOtdCBkZXRhaWwgZG9rbGFkdSBiZXogdWxvxb5lbsOtP1xyXG4gICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh7IHJlZnJlc2g6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZGVmLnJlamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBzZSBuZWVkaXR1amUsIGplIG1vxb5uw6kgZGV0YWlsIHphdsWZw610XHJcbiAgICAgICAgICAgIGRlZi5yZXNvbHZlKHsgcmVmcmVzaDogdHlwZW9mIHRoYXQucmVmcmVzaCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGF0LnJlZnJlc2ggPT09IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=