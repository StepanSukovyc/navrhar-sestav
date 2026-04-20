"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Okno pro Rozpis předpisů pro hromadnou tvorbu předpisů      </Name>
//    <Description>                                                             </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-12-19                                                  </Created>
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
             * Okno pro Rozpis předpisů pro hromadnou tvorbu předpisů
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-12-10
             * @lastModified 2025-12-10
             */
            let GRozpisPredpisu = class GRozpisPredpisu extends Gordic.GContentBase {
                //#endregion P R O P E R T I E S 
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.createActions();
                    that.createForm();
                    that.createShortcuts();
                    that.enableFields();
                    that.setDefaultData();
                }
                //#region S E S T A V E N Í   O K N A       
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 */
                createForm() {
                    const that = this;
                    if (that.TestDph) {
                        var mimoradnyPredpisRecap = {
                            checkVisible: false,
                            periodDPHVisible: false,
                            readOnly: false,
                            totalAmount: new Decimal(that.DataRozpisu.c_mimo ?? 0),
                            //sumField: field,
                            //taxPeriod: field2, // <- let taxPeriod = parseDate(that.DetailDto.dat_dph_od ?? that.DetailDto.dat_uzavreni ?? new Date());
                            model: {
                                //taxDoc: false,
                                prices: Gordic.Gin.WebClient.Utils.dphModelApply(that.DataRozpisu, [
                                    // osvobozeno
                                    { from: "cmimo_d0", to: { taxType: "-1" /* Gordic.Gin.WebClient.ETaxType.Osvobozeno */, priceType: "baseValue" } },
                                    // bez daně
                                    { from: "cmimo_z0", to: { taxType: "0" /* Gordic.Gin.WebClient.ETaxType.BezDane */, priceType: "baseValue" } },
                                    // základní sazba
                                    { from: "cmimo_z2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "baseValue" } },
                                    { from: "cmimo_d2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "tax" } },
                                    { from: "cmimo_zd2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "sum" } },
                                    // první snížená
                                    { from: "cmimo_z1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "baseValue" } },
                                    { from: "cmimo_d1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "tax" } },
                                    { from: "cmimo_zd1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "sum" } },
                                    // druhá snížená
                                    { from: "cmimo_z3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "baseValue" } },
                                    { from: "cmimo_d3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "tax" } },
                                    { from: "cmimo_zd3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "sum" } },
                                    // třetí snížená
                                    // TODO: zatím není podpora
                                    //{ from: "c_z4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "baseValue" } },
                                    //{ from: "c_d4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "tax" } },
                                    //{ from: "c_zd4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "sum" } },
                                    // zaokrouhlení
                                    { from: "cmimo_zao", to: { taxType: "-2" /* Gordic.Gin.WebClient.ETaxType.Zaokrouhleno */, priceType: "sum" } },
                                    //Celkem
                                    { from: "c_mimo", to: { taxType: "-3" /* Gordic.Gin.WebClient.ETaxType.DokladCelkem */, priceType: "sum" } }
                                ])
                            }
                        };
                        var tab1 = $("<div>").appendTo(this.element).gcontent(Gordic.Gin.WebClient.recapDPH, mimoradnyPredpisRecap)
                            .gtab({
                            title: "Mimořádný předpis",
                            opened: true
                        });
                        var prvniPredpisRecap = {
                            checkVisible: false,
                            periodDPHVisible: false,
                            readOnly: false,
                            totalAmount: new Decimal(that.DataRozpisu.c_prv ?? 0),
                            //sumField: field,
                            //taxPeriod: field2, // <- let taxPeriod = parseDate(that.DetailDto.dat_dph_od ?? that.DetailDto.dat_uzavreni ?? new Date());
                            model: {
                                taxDoc: true,
                                prices: Gordic.Gin.WebClient.Utils.dphModelApply(that.DataRozpisu, [
                                    // osvobozeno
                                    { from: "cprv_d0", to: { taxType: "-1" /* Gordic.Gin.WebClient.ETaxType.Osvobozeno */, priceType: "baseValue" } },
                                    // bez daně
                                    { from: "cprv_z0", to: { taxType: "0" /* Gordic.Gin.WebClient.ETaxType.BezDane */, priceType: "baseValue" } },
                                    // základní sazba
                                    { from: "cprv_z2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "baseValue" } },
                                    { from: "cprv_d2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "tax" } },
                                    { from: "cprv_zd2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "sum" } },
                                    // první snížená
                                    { from: "cprv_z1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "baseValue" } },
                                    { from: "cprv_d1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "tax" } },
                                    { from: "cprv_zd1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "sum" } },
                                    // druhá snížená
                                    { from: "cprv_z3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "baseValue" } },
                                    { from: "cprv_d3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "tax" } },
                                    { from: "cprv_zd3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "sum" } },
                                    // třetí snížená
                                    // TODO: zatím není podpora
                                    //{ from: "c_z4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "baseValue" } },
                                    //{ from: "c_d4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "tax" } },
                                    //{ from: "c_zd4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "sum" } },
                                    // zaokrouhlení
                                    { from: "cprv_zao", to: { taxType: "-2" /* Gordic.Gin.WebClient.ETaxType.Zaokrouhleno */, priceType: "sum" } },
                                    //Celkem
                                    { from: "c_prv", to: { taxType: "-3" /* Gordic.Gin.WebClient.ETaxType.DokladCelkem */, priceType: "sum" } }
                                ])
                            }
                        };
                        var tab2 = $("<div>").appendTo(this.element).gcontent(Gordic.Gin.WebClient.recapDPH, prvniPredpisRecap)
                            .gtab({
                            title: "První předpis",
                            opened: true
                        });
                        var celkCastkaRecap = {
                            checkVisible: false,
                            periodDPHVisible: false,
                            readOnly: false,
                            totalAmount: new Decimal(that.DataRozpisu.c_celk ?? 0),
                            //sumField: field,
                            //taxPeriod: field2, // <- let taxPeriod = parseDate(that.DetailDto.dat_dph_od ?? that.DetailDto.dat_uzavreni ?? new Date());
                            model: {
                                taxDoc: false,
                                prices: Gordic.Gin.WebClient.Utils.dphModelApply(that.DataRozpisu, [
                                    // osvobozeno
                                    { from: "c_d0", to: { taxType: "-1" /* Gordic.Gin.WebClient.ETaxType.Osvobozeno */, priceType: "baseValue" } },
                                    // bez daně
                                    { from: "c_z0", to: { taxType: "0" /* Gordic.Gin.WebClient.ETaxType.BezDane */, priceType: "baseValue" } },
                                    // základní sazba
                                    { from: "c_z2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "baseValue" } },
                                    { from: "c_d2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "tax" } },
                                    { from: "c_zd2", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "sum" } },
                                    // první snížená
                                    { from: "c_z1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "baseValue" } },
                                    { from: "c_d1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "tax" } },
                                    { from: "c_zd1", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "sum" } },
                                    // druhá snížená
                                    { from: "c_z3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "baseValue" } },
                                    { from: "c_d3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "tax" } },
                                    { from: "c_zd3", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "sum" } },
                                    // třetí snížená
                                    // TODO: zatím není podpora
                                    //{ from: "c_z4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "baseValue" } },
                                    //{ from: "c_d4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "tax" } },
                                    //{ from: "c_zd4", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "sum" } },
                                    // zaokrouhlení
                                    { from: "c_zao", to: { taxType: "-2" /* Gordic.Gin.WebClient.ETaxType.Zaokrouhleno */, priceType: "sum" } },
                                    // Celkem
                                    { from: "c_celk", to: { taxType: "-3" /* Gordic.Gin.WebClient.ETaxType.DokladCelkem */, priceType: "sum" } }
                                ])
                            }
                        };
                        var tab3 = $("<div>").appendTo(this.element).gcontent(Gordic.Gin.WebClient.recapDPH, celkCastkaRecap)
                            .gtab({
                            title: "Celková částka k rozpisu",
                            opened: true
                        });
                    }
                    //#region Mimořádný předpis
                    var mimoradnyPredpisForm = new Gordic.Forms.Form({ name: "GDdpMimoradnyPredpisForm", layoutDescriptor: "L3M3S1, L-4-8-0, M-4-8-0, S-12-12-0" })
                        //.addSection({ name: "mimoradnyPredpisSection", label: "Mimořádný předpis" })
                        .addSection()
                        .addRow("Zákl. bez DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cmimo_z0",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Osvob. od DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cmimo_d0",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Zákl. sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cmimo_z1",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Daň sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cmimo_d1",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addSection()
                        .addRow("Zákl. 2.sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cmimo_z3",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Daň 2.sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cmimo_d3",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Zákl. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cmimo_z2",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Dan zákl. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cmimo_d2",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addSection()
                        .addRow("Zaokr.")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cmimo_zao",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow({ label: "Částka celkem", hint: "F6 - pro zadání DPH" })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_mimo", redNegative: true,
                        change: function (ev, input) {
                            //TODO TEST!
                            var dat_vzn_mimo = that.element.findFields("dat_vzniku_mimo");
                            if (input.value && input.value != new Decimal(0)) {
                                dat_vzn_mimo.gfield("option", "flag", "required"); // nastavení příznaku Povinné
                                dat_vzn_mimo.gfield("setValidators", [new Gordic.Validators.Required()]); // nastavení validátoru
                            }
                            else {
                                dat_vzn_mimo.gfield("option", "flag", ""); // zrušení příznaku Povinné
                                dat_vzn_mimo.gfield("setValidators", []); // zrušení validátoru
                            }
                        }
                    })
                        .addRow("Dat. vzniku")
                        .addField("gdatebox", {
                        name: "dat_vzniku_mimo",
                        change: function (ev, input) { }
                    })
                        .addRow("Dat. splatnosti")
                        .addField("gdatebox", {
                        name: "dat_spl_mimo",
                        change: function (ev, input) { }
                    });
                    var mimoradnyPredpisDiv = $.newDiv("mimoradnyPredpisDiv")
                        .appendTo(that.element)
                        .gtab({ title: "Mimořádný předpis", opened: true })
                        .gform("createFrom", mimoradnyPredpisForm);
                    //#endregion Mimořádný předpis
                    //
                    //#region První předpis
                    var prvniPredpisForm = new Gordic.Forms.Form({ name: "GDdpPrvniPredpisForm", layoutDescriptor: "L3M3S1, L-4-8-0, M-4-8-0, S-12-12-0" })
                        //.addSection({ name: "sectionPrvniPredpis", label: "První předpis" })
                        .addSection()
                        .addRow("Zákl. bez DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cprv_z0",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Osvob. od DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cprv_d0",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Zákl. sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cprv_z1",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Daň sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cprv_d1",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addSection()
                        .addRow("Zákl. 2.sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cprv_z3",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Daň 2.sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cprv_d3",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Zákl. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cprv_z2",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Dan zákl. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cprv_d2",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addSection()
                        .addRow("Zaokr.")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "cprv_zao",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow({ label: "První předpis", hint: "F6 - pro zadání DPH" })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_prv", redNegative: true,
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        change: function (ev, input) { }
                    })
                        .addRow("Dat. vzniku")
                        .addField("gdatebox", {
                        name: "dat_vzniku_prv",
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        change: function (ev, input) { }
                    })
                        .addRow("Dat. splatnosti")
                        .addField("gdatebox", {
                        name: "dat_spl_prv",
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        change: function (ev, input) { }
                    });
                    var prvniPredpisDiv = $.newDiv("prvniPredpisDiv")
                        .appendTo(that.element)
                        .gtab({ title: "První předpis", opened: true })
                        .gform("createFrom", prvniPredpisForm);
                    //#endregion První předpis
                    //
                    //#region Celková částka k rozpisu
                    var celkCastkaForm = new Gordic.Forms.Form({ name: "GDdpCelkCastkaForm", layoutDescriptor: "L3M3S1, L-4-8-0, M-4-8-0, S-12-12-0" })
                        //.addSection({ name: "sectionCelkovaCastka", label: "Celková částka k rozpisu" })
                        .addSection()
                        .addRow("Zákl. bez DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_z0",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Osvob. od DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_d0",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Zákl. sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_z1",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Daň sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_d1",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addSection()
                        .addRow("Zákl. 2.sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_z3",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Daň 2.sníž. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_d3",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Zákl. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_z2",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Dan zákl. DPH")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_d2",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addSection()
                        .addRow("Zaokr.")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_zao",
                        disabled: true, redNegative: true,
                        change: function (ev, input) { }
                    })
                        .addRow({ label: "Částka k rozpisu", hint: "F6 - pro zadání DPH" })
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "c_celk", redNegative: true,
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        change: function (ev, input) { }
                    });
                    var celkCastkaDiv = $.newDiv("celkCastkaDiv")
                        .appendTo(that.element)
                        .gtab({ title: "Celková částka k rozpisu", opened: true })
                        .gform("createFrom", celkCastkaForm);
                    //#endregion Celková částka k rozpisu
                    //
                    //#region Parametry rozpisu
                    var parametryRozpisuForm = new Gordic.Forms.Form({ name: "GDdpParametryRozpisuForm", layoutDescriptor: "L2M2S2, L-0-12-0, M-0-12-0, S-0-12-0" })
                        //.addSection({ name: "sectionParametryRozpisu", label: "Parametry rozpisu" })
                        .addSection()
                        .addRow()
                        .addText("Poč. před.", "w-3")
                        .addText("Posun dat. splat. (dnů)", "w-9")
                        .addRow()
                        .addField("gnumberbox", "w-3", {
                        name: "poc_predp",
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        change: function (ev, input) { }
                    })
                        .addField("gnumberbox", "w-2", {
                        name: "posun_spl",
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        change: function (ev, input) { }
                    })
                        .addField("gcheck", "w-7", {
                        name: "neposDatVzniku",
                        label: "Neposouvat dat.vzniku",
                    })
                        .addRow()
                        .addText("Zaokrouhlení předpisu", "w-12")
                        .addRow()
                        .addField("gradio", {
                        name: "crb_zao",
                        itemClass: "w-4",
                        initialValue: 0,
                        radios: [
                            { value: 0, label: "Bez zaokrouhlení" },
                            { value: 1, label: "1 desetinné místo" },
                            { value: 2, label: "Na celé koruny" }
                        ],
                        change: (ev, input) => { }
                    })
                        .addRow()
                        .addText("Popis", "w-6")
                        .addText("Poznamka", "w-6")
                        .addRow()
                        .addField("gstringbox", "w-6", { name: "popis" })
                        .addField("gstringbox", "w-6", { name: "poznamka" })
                        .addSection()
                        .addRow()
                        .addText("Kategorie předpisu", "w-12")
                        .addRow()
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo", //Typ předpisu (name = model)
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        model: "model.ktg_upo=value.ktg_upo", //,
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt:trim:encode}",
                        dropdown: false,
                        serverFilters: {
                            ktg_upo: WebClient.Common.Base.naplneniPoleKtgUpoPre(0, 199)
                        }
                    })
                        .addRow()
                        .addText("Měna", "w-3")
                        .addText("Interval dní", "w-3")
                        .addText("Interval měsíců", "w-3")
                        .addText("Interval roků", "w-3")
                        .addRow()
                        .addField("gselectbox", "w-3", Gordic.Prefabs.Select.ekocmen(), {
                        name: "mena",
                        defaultValue: { mena: 0 },
                        model: "model.mena=value.mena",
                        change: function (ev, input) { },
                    })
                        .addField("gnumberbox", "w-3", {
                        name: "int_dni",
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        change: function (ev, input) { }
                    })
                        .addField("gnumberbox", "w-3", {
                        name: "int_mes",
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        change: function (ev, input) { }
                    })
                        .addField("gnumberbox", "w-3", {
                        name: "int_rok",
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        change: function (ev, input) { }
                    })
                        .addRow()
                        .addText("Dat.vzniku posl.predp.", "w-6")
                        .addText("Dat.spl.posl.predp.", "w-6")
                        .addRow()
                        .addField("gdatebox", "w-6", {
                        name: "dat_vzniku_posl",
                        flag: "required",
                        validators: [
                            new Gordic.Validators.Required(),
                            WebClient.Common.Prefabs.Validatory.ValidatorDatVznikuDatUzav(that, that.DataRozpisu.dat_uzav),
                        ],
                        change: function (ev, input) {
                            let datUzavreni = that.DataRozpisu.dat_uzav;
                            let datVzniku = that.element.findForms().findFields("dat_spl_posl").gfield("getValue");
                            let inputDat = input.value;
                            debugger;
                        }
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_spl_posl",
                        validators: [new Gordic.Validators.Required()], flag: "required",
                        change: function (ev, input) { }
                    });
                    var parametryRozpisuDiv = $.newDiv("parametryRozpisuDiv")
                        .appendTo(that.element)
                        .gtab({ title: "Parametry rozpisu", opened: true })
                        .gform("createFrom", parametryRozpisuForm);
                    //#endregion Parametry rozpisu
                    return;
                }
                enableFields() {
                    const that = this;
                    if (that.DataRozpisu.priz_dph2 == 0) {
                        that.element.findForms().findFields("c_z0").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_z0").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_z0").gfield("option", "disabled", false);
                    }
                    if (that.DataRozpisu.priz_dph_zakl == 1) {
                        that.element.findForms().findFields("c_z2").gfield("option", "disabled", false);
                        that.element.findForms().findFields("c_d2").gfield("option", "disabled", false);
                        that.element.findForms().findFields("c_zao").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_z2").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_d2").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_zao").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_z2").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_d2").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_zao").gfield("option", "disabled", false);
                    }
                    if (that.DataRozpisu.priz_dph_sniz == 1) {
                        that.element.findForms().findFields("c_z1").gfield("option", "disabled", false);
                        that.element.findForms().findFields("c_d1").gfield("option", "disabled", false);
                        that.element.findForms().findFields("c_zao").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_z1").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_d1").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_zao").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_z1").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_d1").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_zao").gfield("option", "disabled", false);
                    }
                    if (that.DataRozpisu.priz_dph_sniz2 == 1) {
                        that.element.findForms().findFields("c_z3").gfield("option", "disabled", false);
                        that.element.findForms().findFields("c_d3").gfield("option", "disabled", false);
                        that.element.findForms().findFields("c_zao").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_z3").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_d3").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_zao").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_z3").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_d3").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_zao").gfield("option", "disabled", false);
                    }
                    if (that.DataRozpisu.priz_osvob == 1) {
                        that.element.findForms().findFields("c_d0").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cprv_d0").gfield("option", "disabled", false);
                        that.element.findForms().findFields("cmimo_d0").gfield("option", "disabled", false);
                    }
                    //if (that.Ixp == null || that.Ixp == "") {
                    //    const zrus: Gordic.General.ApplicationInterface.GPermission = { value: false, message: "Nebyl zadán validní PID pohledávky!"/*, visible: false*/ }
                    //    this.actions.actSave!.updatePermission(zrus);
                    //}
                }
                /**
                 * Metoda pro nastaveníklavesových zkratek v okně
                 * @method createShortcuts()
                 */
                createShortcuts() {
                    const that = this;
                    WebClient.Common.Base.setDateBoxShortcuts(that);
                    that.element.findForms("GDdpCelkCastkaForm").findFields("c_celk").gshortcut({
                        key: "F6", //klávesová zkratka F6
                        description: `Otevření okna pro ~Zadání DPH~ nad políčkem Částka k rozpisu`, //Popis klávesové zkratky pro zobrazení v nápovědě.
                        group: Gordic.Shortcuts.Groups.Field,
                        action: that.actions["openTabZadaniDphCelkAct"],
                    });
                    that.element.findForms("GDdpPrvniPredpisForm").findFields("c_prv").gshortcut({
                        key: "F6", //klávesová zkratka F6
                        description: `Otevření okna pro ~Zadání DPH~ nad políčkem První předpis`, //Popis klávesové zkratky pro zobrazení v nápovědě.
                        group: Gordic.Shortcuts.Groups.Field,
                        action: that.actions["openTabZadaniDphPrvAct"],
                    });
                    that.element.findForms("GDdpMimoradnyPredpisForm").findFields("c_mimo").gshortcut({
                        key: "F6", //klávesová zkratka F6
                        description: `Otevření okna pro ~Zadání DPH~ nad políčkem Částka mim. př. celkem`, //Popis klávesové zkratky pro zobrazení v nápovědě.
                        group: Gordic.Shortcuts.Groups.Field,
                        action: that.actions["openTabZadaniDphMimoAct"],
                    });
                }
                /**
                 * Metoda pro nastavení výchozích hodnot do formuláře
                 * @method setDefaultData()
                 */
                setDefaultData() {
                    const that = this;
                    that.element.findForms().findFields()
                        .gfield("model", "apply", that.DataRozpisu, { initialValues: true });
                    //TODO: nastavit výchozí hodnoty:
                    // Function: predpln_pole
                    // Set cb_stdvz = LoginDDP.rzp_neposouvat
                    // Set crb_zao_0 = (LoginDDP.rzp_zaokrouhleni = 0)
                    // Set crb_zao_1 = (LoginDDP.rzp_zaokrouhleni = 1)
                    // Set crb_zao_2 = (LoginDDP.rzp_zaokrouhleni = 2)
                }
                //#endregion S E S T A V E N Í   O K N A
                //#region A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                /**
                 * Vytvoří action list a jednotlivé akce
                 * @method createActions()
                 * @returns {void} - Ukončení metody void
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actSave",
                            caption: "OK",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ulozit()
                                    .done(() => {
                                    //that.close();
                                }); // Uložení dat a zavření okna v případě úspěchu metody.
                            }
                        },
                        {
                            name: "actClose",
                            caption: "Konec",
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        },
                        {
                            name: "actVybratRozpis",
                            caption: "Vybrat rozpis",
                            icon: "gi-list",
                            run: () => {
                                //todo: vytvořit akci otvírající okno se seznamem
                            }
                        },
                        {
                            name: "openTabZadaniDphCelkAct",
                            caption: "Zadání DPH",
                            tooltip: "Otevření okna pro zadání DPH",
                            //disabled: !that.permsDto.c,
                            run: () => {
                                let castka = that.findForms("GDdpCelkCastkaForm").findFields("c_celk").gfield("getValue");
                                that.otevriOknoProZadaniDph(0, castka ?? new Decimal(0));
                            }
                        },
                        {
                            name: "openTabZadaniDphPrvAct",
                            caption: "Zadání DPH",
                            tooltip: "Otevření okna pro zadání DPH",
                            //disabled: !that.permsDto.c,
                            run: () => {
                                let castka = that.findForms("GDdpPrvniPredpisForm").findFields("c_prv").gfield("getValue");
                                that.otevriOknoProZadaniDph(1, castka ?? new Decimal(0));
                            }
                        },
                        {
                            name: "openTabZadaniDphMimoAct",
                            caption: "Zadání DPH",
                            tooltip: "Otevření okna pro zadání DPH",
                            //disabled: !that.permsDto.c,
                            run: () => {
                                let castka = that.findForms("GDdpMimoradnyPredpisForm").findFields("c_mimo").gfield("getValue");
                                that.otevriOknoProZadaniDph(2, castka ?? new Decimal(0));
                            }
                        }
                    ]);
                    that.commandBar(that.actions.createBar(["<actVybratRozpis", "actSave!", "actClose"]));
                }
                prepocetCastek() {
                    const that = this;
                    let noveDto = {};
                    that.element.findForms().findFields().gfield("model", "collect", noveDto);
                    if (!(that.DataRozpisu.priz_dph2 == 0 || that.DataRozpisu.priz_osvob == 1 || that.DataRozpisu.priz_dph_zakl == 1 || that.DataRozpisu.priz_dph_sniz == 1 || that.DataRozpisu.priz_dph_sniz2 == 1)) {
                        noveDto.c_z0 = new Decimal(0);
                        noveDto.c_z1 = new Decimal(0);
                        noveDto.c_z2 = new Decimal(0);
                        noveDto.c_z3 = new Decimal(0);
                        noveDto.c_d0 = new Decimal(0);
                        noveDto.c_d1 = new Decimal(0);
                        noveDto.c_d2 = new Decimal(0);
                        noveDto.c_d3 = new Decimal(0);
                    }
                }
                otevriOknoProZadaniDph(zdroj, castka) {
                    const that = this;
                    var windowOption = { title: "Zadání DPH", width: 500, height: 500 };
                    var ParamJSON = { ID: "DDPGZadaniDph#", Ixp: that.Ixp, Typ_phl: that.DataRozpisu.typ_phl, Castka_K_Vypoctu: castka ?? new Decimal(0) };
                    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GZadaniDph", ParamJSON, windowOption)
                        .on("close", (ev, retVal) => {
                        if (retVal) {
                            // retVal = { // 10 - základní sazba DPH // 20 - snížená sazba DPH // 30 - 2.snížená sazba DPH // 40 - 3.snížená sazba DPH
                            //    sazba: form.findFields("sazba").gfield("getValue"),              // op_dan_typ     // Sazba - typ daně (10,20,30,40)
                            //    castka: form.findFields("castka").gfield<Decimal>("getValue"),   // op_c           // Celková částka
                            //    zaklad: form.findFields("zaklad").gfield<Decimal>("getValue"),   // op_c_bez_dph   // Základ
                            //    dan: form.findFields("dan").gfield<Decimal>("getValue"),         // op_c_dph       // Daň
                            //    zao: form.findFields("zao").gfield<Decimal>("getValue"),         // op_c_zao       // Zaokrouhlení
                            //    datZdan: form.findFields("dat_zdan").gfield<Date>("getValue"),   // l_dat_zdan     // Zaokrouhlení
                            // }
                            var form, celk = "", c_z0 = "", c_z1 = "", c_z2 = "", c_z3 = "", c_d0 = "", c_d1 = "", c_d2 = "", c_d3 = "", czao = ""; // c_z4, c_d4,
                            switch (zdroj) {
                                case 2: { // Mimořádný
                                    form = that.findForms("GDdpMimoradnyPredpisForm");
                                    celk = "c_mimo";
                                    c_z0 = "cmimo_z0";
                                    c_z1 = "cmimo_z1";
                                    c_z2 = "cmimo_z2";
                                    c_z3 = "cmimo_z3";
                                    //c_z4 = "cmimo_z4";
                                    c_d0 = "cmimo_d0";
                                    c_d1 = "cmimo_d1";
                                    c_d2 = "cmimo_d2";
                                    c_d3 = "cmimo_d3";
                                    //c_d4 = "cmimo_d4";
                                    czao = "cmimo_zao";
                                    break;
                                }
                                case 1: { // Prvni
                                    form = that.findForms("GDdpPrvniPredpisForm");
                                    celk = "c_prv";
                                    c_z0 = "cprv_z0";
                                    c_z1 = "cprv_z1";
                                    c_z2 = "cprv_z2";
                                    c_z3 = "cprv_z3";
                                    //c_z4 = "cprv_z4";
                                    c_d0 = "cprv_d0";
                                    c_d1 = "cprv_d1";
                                    c_d2 = "cprv_d2";
                                    c_d3 = "cprv_d3";
                                    //c_d4 = "cprv_d4";
                                    czao = "cprv_zao";
                                    break;
                                }
                                case 0: // Celkem
                                default: {
                                    form = that.findForms("GDdpCelkCastkaForm");
                                    celk = "c_celk";
                                    c_z0 = "c_z0";
                                    c_z1 = "c_z1";
                                    c_z2 = "c_z2";
                                    c_z3 = "c_z3";
                                    //c_z4 = "c_z4";
                                    c_d0 = "c_d0";
                                    c_d1 = "c_d1";
                                    c_d2 = "c_d2";
                                    c_d3 = "c_d3";
                                    //c_d4 = "c_d4";
                                    czao = "c_zao";
                                    break;
                                }
                            }
                            switch (retVal.sazba) {
                                //case 40: {    // 40 - 3.snížená sazba DPH   // ng_dantypLow3
                                //    form.findFields(c_z4).gfield("setValue", retVal.zaklad);
                                //    form.findFields(c_d4).gfield("setValue", retVal.dan);
                                //    break;
                                //}
                                case 30: { // 30 - 2.snížená sazba DPH   // ng_dantypLow2
                                    form.findFields(c_z3).gfield("setValue", retVal.zaklad);
                                    form.findFields(c_d3).gfield("setValue", retVal.dan);
                                    break;
                                }
                                case 20: { // 20 - snížená sazba DPH     // ng_dantypLow
                                    form.findFields(c_z1).gfield("setValue", retVal.zaklad);
                                    form.findFields(c_d1).gfield("setValue", retVal.dan);
                                    break;
                                }
                                case 10:
                                default: { // 10 - základní sazba DPH    // ng_dantypBase
                                    form.findFields(c_z2).gfield("setValue", retVal.zaklad);
                                    form.findFields(c_d2).gfield("setValue", retVal.dan);
                                    break;
                                }
                            }
                            form.findFields(czao).gfield("setValue", retVal.zao);
                            //TODO: if ( NVL(castka,0) == retVal.castka ) { castka = retVal.castka; }
                            //TODO: castka = retVal.zaklad + retVal.dan + retVal.zao;
                            let celkovaCastka = Decimal.add(retVal.zaklad, Decimal.add(retVal.dan, retVal.zao));
                            form.findFields(celk).gfield("setValue", celkovaCastka);
                        }
                    });
                }
                /**
                 * Metoda pro vytvoření rozpisu - uložení dat z obsahu
                 * @method ulozit()
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                ulozit() {
                    const that = this;
                    var def = $.Deferred(); // Vytvoření promisu
                    var chybnaKontrola = false; // Pomocný příznak pro hlídání chyb při kontrole dat
                    const form = that.findForms(); // Všechny formy na detailu
                    var isValid = form.gform("isValid"); // validace formuláře
                    if (!isValid) { // Pokud nejsou data validní...
                        return def.reject().promise(); // ukončím metodu s chybou
                    }
                    that.beginOperation({ id: "opSavePrepareLoading", text: "Připravuji data pro uložení..." }); // Zapnu načítání kontroly dat pro uložení
                    let noveDto = {}; // ? Možná nastavovat již existující DataRozpisu (neboť má init všech potřebných dat.
                    form.findFields().gfield("model", "collect", noveDto);
                    //#region TODO: předělat do GValidatoru na samotné fieldy
                    //x IF DAT_VNIKU == NULL -> CHYBA: 'Vyplňte datum vzniku!' // řešeno pomoví validace GRequired
                    if (noveDto.dat_vzniku_prv <= that.DataRozpisu?.dat_uzav) {
                        chybnaKontrola = true;
                        that.endOperation({ id: "opSavePrepareLoading" });
                        that.dialogs.error("Chyba", "Datum vzniku prvního předpisu musí být po datu uzávěrky!")
                            .on("close", (ev, retVal) => {
                            that.element.findForms("GDdpPrvniPredpisForm").findFields("dat_vzniku_prv").gfield('focus');
                            return def.reject();
                        });
                    }
                    if (noveDto.c_mimo != new Decimal(0) && noveDto.dat_vzniku_mimo < that.DataRozpisu?.dat_uzav) { // mimořádný předpis vyřazen(a vrácen)
                        chybnaKontrola = true;
                        that.endOperation({ id: "opSavePrepareLoading" });
                        that.dialogs.error("Chyba", "Nelze vytvářet předpisy v uzavřeném období")
                            .on("close", (ev, retVal) => {
                            that.element.findForms("GDdpMimoradnyPredpisForm").findFields("dat_vzniku_mimo").gfield('focus');
                            return def.reject();
                        });
                    }
                    //#endregion TODO:
                    that.endOperation({ id: "opSavePrepareLoading" }); // Ukončím načítání přípravné části
                    if (!chybnaKontrola) {
                        that.beginOperation({ id: "opSaveProcessLoading", text: "Vytvářím rozpis..." }); // Zobrazení dialogu s načítáním
                        that.isl.DdpRozpisPredpisu.udelejRozpis({ data: noveDto }) // Zavolání ISL metody k uložení dat lhůty
                            .get()
                            .always(() => { that.endOperation({ id: "opSaveProcessLoading" }); }) // Ukončení dialogu s načítáním                   
                            .done(function (ret) {
                            return def.resolve();
                            ; // Vrací promise_resolve = úspěch
                        })
                            .fail(function (jqXHR, typ, obj) {
                            if (typ === "exception") { // V případě výjimky
                                obj.handled = true; // Nastavení výjimky jako ošetřené
                                that.dialogs.error("Chyba", obj.baseMessage) // Zobrazení dialogu s chybou
                                    .on("close", (ev, retVal) => {
                                    return def.reject(); // Vrací promise_reject = chyba
                                });
                            }
                            else {
                                return def.reject();
                            } // Vrací promise_reject = chyba (i když se nejedná o ošetřenou vyjímku)
                        });
                        return def.promise(); // Vrací promise
                    }
                    else
                        return def.reject().promise(); // V případě že nastala nejaká chyba v kontrolách a dobublalo to až sem, tak uplně ukončím s chybou
                }
            };
            GRozpisPredpisu = __decorate([
                Decorators.gcontent
            ], GRozpisPredpisu);
            WebClient.GRozpisPredpisu = GRozpisPredpisu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//private createFormOld() {
//    const that = this;
//    var castkyRozpisuForm = new Gordic.Forms.Form({ name: "GDdpFormCastkyRozpisu", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
//        // Mimořádný předpis
//        .addSection({ name: "sectionMimoradnyPredpis", label: "Mimořádný předpis" })
//        .addRow()
//        .addText("Zákl. bez DPH", "w-3 right")
//        .addText("Osvob. od DPH", "w-3 right")
//        .addText("Zákl. sníž. DPH", "w-3 right")
//        .addText("Daň sníž. DPH", "w-3 right")
//        .addRow()
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cmimo_z0",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cmimo_d0",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cmimo_z1",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cmimo_d1",
//            change: function (ev, input) { }
//        })
//        .addRow()
//        .addText("Zákl. 2.sníž. DPH", "w-3 right")
//        .addText("Daň 2.sníž. DPH", "w-3 right")
//        .addText("Zákl. DPH", "w-3 right")
//        .addText("Dan zákl. DPH", "w-3 right")
//        .addRow()
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cmimo_z3",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cmimo_d3",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cmimo_z2",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cmimo_d2",
//            change: function (ev, input) { }
//        })
//        .addRow()
//        .addText("Zaokr.", "w-3 right")
//        .addText("Částka celkem", "w-3 right")
//        .addText("Dat. vzniku", "w-3 right")
//        .addText("Dat. splatnosti", "w-3 right")
//        .addRow()
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cmimo_zao",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_mimo",
//            change: function (ev, input) { }
//        })
//        .addField("gdatebox", "w-3", {
//            name: "c_dat_vzniku_mimu",
//            change: function (ev, input) { }
//        })
//        .addField("gdatebox", "w-3", {
//            name: "c_dat_spl_mimo",
//            change: function (ev, input) { }
//        })
//        // První předpis
//        .addSection({ name: "sectionPrvniPredpis", label: "První předpis" })
//        .addRow()
//        .addText("Zákl. bez DPH", "w-3 right")
//        .addText("Osvob. od DPH", "w-3 right")
//        .addText("Zákl. sníž. DPH", "w-3 right")
//        .addText("Daň sníž. DPH", "w-3 right")
//        .addRow()
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cprv_z0",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cprv_d0",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cprv_z1",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cprv_d1",
//            change: function (ev, input) { }
//        })
//        .addRow()
//        .addText("Zákl. 2.sníž. DPH", "w-3 right")
//        .addText("Daň 2.sníž. DPH", "w-3 right")
//        .addText("Zákl. DPH", "w-3 right")
//        .addText("Dan zákl. DPH", "w-3 right")
//        .addRow()
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cprv_z3",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cprv_d3",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cprv_z2",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cprv_d2",
//            change: function (ev, input) { }
//        })
//        .addRow()
//        .addText("Zaokr.", "w-3 right")
//        .addText("První předpis", "w-3 right")
//        .addText("Dat. vzniku", "w-3 right")
//        .addText("Dat. splatnosti", "w-3 right")
//        .addRow()
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "cprv_zao",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_prv",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) { }
//        })
//        .addField("gdatebox", "w-3", {
//            name: "c_dat_vzniku_prv",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) { }
//        })
//        .addField("gdatebox", "w-3", {
//            name: "c_dat_spl_prv",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) { }
//        })
//        // Celková částka k rozpisu
//        .addSection({ name: "sectionCelkovaCastka", label: "Celková částka k rozpisu" })
//        .addRow()
//        .addText("Zákl. bez DPH", "w-3 right")
//        .addText("Osvob. od DPH", "w-3 right")
//        .addText("Zákl. sníž. DPH", "w-3 right")
//        .addText("Daň sníž. DPH", "w-3 right")
//        .addRow()
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_z0",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_d0",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_z1",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_d1",
//            change: function (ev, input) { }
//        })
//        .addRow()
//        .addText("Zákl. 2.sníž. DPH", "w-3 right")
//        .addText("Daň 2.sníž. DPH", "w-3 right")
//        .addText("Zákl. DPH", "w-3 right")
//        .addText("Dan zákl. DPH", "w-3 right")
//        .addRow()
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_z3",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_d3",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_z2",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_d2",
//            change: function (ev, input) { }
//        })
//        .addRow()
//        .addText("Zaokr.", "w-3 right")
//        .addText("Částka k rozpisu", "w-3 right")
//        .addRow()
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_zao",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", Prefabs.Number.currency(), {
//            name: "c_celk",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) { }
//        })
//        .addSection({ name: "sectionParametryRozpisu", label: "Parametry rozpisu" })
//        ;
//    var parametryRozpisuForm = new Gordic.Forms.Form({ name: "GDdpFormParametryRozpisu", layoutDescriptor: "L2M2S2, L-0-12-0, M-0-12-0, S-0-12-0" })
//        .addSection()
//        .addRow()
//        .addText("Poč. před.", "w-4")
//        .addText("Posun dat. splat. (dnů)", "w-8")
//        .addRow()
//        .addField("gnumberbox", "w-3", {
//            name: "poc_predp",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-2", {
//            name: "posun_spl",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) { }
//        })
//        .addField("gcheck", "w-7", {
//            name: "neposDatVzniku",
//            label: "Neposouvat dat.vzniku",
//        })
//        .addRow()
//        .addText("Zaokrouhlení předpisu", "w-12")
//        .addRow()
//        .addField("gradio", {
//            name: "crb_zao",
//            itemClass: "w-4",
//            initialValue: 0,
//            radios: [
//                { value: 0, label: "Bez zaokrouhlení" },
//                { value: 1, label: "1 desetinné místo" },
//                { value: 2, label: "Na celé koruny" }
//            ],
//            change: (ev, input) => {}
//        })
//        .addRow()
//        .addText("Popis", "w-6")
//        .addText("Poznamka", "w-6")
//        .addRow()
//        .addField("gstringbox", "w-6", { name: "popis" })
//        .addField("gstringbox", "w-6", { name: "poznamka" })
//        .addSection()
//        .addRow()
//        .addText("Kategorie předpisu", "w-12")
//        .addRow()
//        .addField("gselectbox", "w-12", Prefabs.Select.fuccupo(), {
//            name: "bucdpep_ktg_upo", //Typ předpisu
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            model: "model.bucdpep_ktg_upo=value.ktg_upo", //,
//            itemTemplate: "{ktg_upo}-{ktg_upo_txt:trim:encode}",
//            dropdown: false,
//            serverFilters: {
//                ktg_upo: Common.Base.naplneniPoleKtgUpoPre(0, 199)
//            }
//        })
//        .addRow()
//        .addText("Měna", "w-3")
//        .addText("Interval dní", "w-3")
//        .addText("Interval měsíců", "w-3")
//        .addText("Interval roků", "w-3")
//        .addRow()
//        .addField("gselectbox", "w-4", Prefabs.Select.ekocmen(), {
//            name: "mena",
//            defaultValue: { mena: 0 },
//            model: "model.mena=value.mena",
//            change: function (ev, input) { },
//        })
//        .addField("gnumberbox", "w-3", {
//            name: "int_dni",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) {}
//        })
//        .addField("gnumberbox", "w-3", {
//            name: "int_mes",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) { }
//        })
//        .addField("gnumberbox", "w-3", {
//            name: "int_rok",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) { }
//        })
//        .addRow()
//        .addText("Dat.vzniku posl.predp.", "w-6")
//        .addText("Dat.spl.posl.predp.", "w-6")
//        .addRow()
//        .addField("gdatebox", "w-6", {
//            name: "c_dat_vzniku_posl",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) { }
//        })
//        .addField("gdatebox", "w-6", {
//            name: "c_dat_spl_posl",
//            validators: [new Gordic.Validators.Required()], //flag: "required",
//            change: function (ev, input) { }
//        })
//        //.addRow()
//        //.addText("Poč. před.", "w-2")
//        //.addText("Posun dat.spl.(dnů)", "w-2")
//        //.addText("", "w-3")
//        //.addText("Kategorie předpisu", "w-5")
//        //.addRow()
//        //.addField("gnumberbox", "w-2", {
//        //    name: "poc_predp",
//        //    change: function (ev, input) { }
//        //})
//        //.addField("gnumberbox", "w-2", {
//        //    name: "posun_spl",
//        //    change: function (ev, input) { }
//        //})
//        //.addField("gcheck", "w-3", {
//        //    name: "neposDatVzniku",
//        //    label: "Neposouvat dat. vzniku",
//        //})
//        //.addField("gselectbox", "w-5", Prefabs.Select.fuccupo(), {
//        //    name: "bucdpep_ktg_upo", //Typ předpisu
//        //    model: "model.bucdpep_ktg_upo=value.ktg_upo", //,
//        //    itemTemplate: "{ktg_upo}-{ktg_upo_txt:trim:encode}",
//        //    dropdown: false,
//        //    serverFilters: {
//        //        ktg_upo: Common.Base.naplneniPoleKtgUpoPre(0, 199)
//        //    }
//        //})
//        ;
//    var castkyRozpisuFormDiv = $.newDiv(/*ID*/).appendTo(that.element).gform("createFrom", castkyRozpisuForm);
//    var parametryRozpisuFormDiv = $.newDiv(/*ID*/).appendTo(that.element).gform("createFrom", parametryRozpisuForm);
//}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvenBpc1ByZWRwaXN1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1JvenBpc1ByZWRwaXN1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBMjRCZjtBQTM0QkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMjRCbkI7SUEzNEJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EyNEI3QjtRQTM0Qm9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7O2VBTUc7WUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFjN0MsaUNBQWlDO2dCQUVqQzs7O21CQUdHO2dCQUNILGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztnQkFFRCw0Q0FBNEM7Z0JBRTVDOzs7bUJBR0c7Z0JBQ0ssVUFBVTtvQkFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLElBQUkscUJBQXFCLEdBQTBDOzRCQUMvRCxZQUFZLEVBQUUsS0FBSzs0QkFDbkIsZ0JBQWdCLEVBQUUsS0FBSzs0QkFDdkIsUUFBUSxFQUFFLEtBQUs7NEJBQ2YsV0FBVyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENB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UyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUE7d0JBQ2xGLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUN2RixDQUFDO29CQUNELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFBO3dCQUMvRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQTt3QkFDL0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUE7d0JBQ2hGLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFBO3dCQUNsRixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQTt3QkFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxD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QUN2QyxnREFBZ0Q7QUFDaEQsY0FBYztBQUNkLHNFQUFzRTtBQUN0RSx1REFBdUQ7QUFDdkQsaUVBQWlFO0FBQ2pFLG9FQUFvRTtBQUNwRSxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLHNFQUFzRTtBQUN0RSxpQkFBaUI7QUFDakIsY0FBYztBQUNkLFdBQVc7QUFFWCxnSEFBZ0g7QUFDaEgsc0hBQXNIO0FBQ3RILEdBQUciLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgT2tubyBwcm8gUm96cGlzIHDFmWVkcGlzxa8gcHJvIGhyb21hZG5vdSB0dm9yYnUgcMWZZWRwaXPFryAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTEyLTE5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBPa25vIHBybyBSb3pwaXMgcMWZZWRwaXPFryBwcm8gaHJvbWFkbm91IHR2b3JidSBwxZllZHBpc8WvICAgXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBIYW51xaFcclxuICAgICAqIEBjb3B5cmlnaHQgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI2XHJcbiAgICAgKiBAY3JlYXRlZCAyMDI1LTEyLTEwXHJcbiAgICAgKiBAbGFzdE1vZGlmaWVkIDIwMjUtMTItMTBcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUm96cGlzUHJlZHBpc3UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvLyNyZWdpb24gUCBSIE8gUCBFIFIgVCBJIEUgUyBcclxuXHJcbiAgICAgICAgLy8vKiogR3JpZCAoc2V6bmFtKSAgIFxyXG4gICAgICAgIC8vICogQHR5cGUge0pRdWVyeTw+fSAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICBEYXRfb2Q6IERhdGU7XHJcbiAgICAgICAgRGF0YVJvenBpc3U6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdEZHBSb3pwaXNQcmVkcGlzdUR0bztcclxuICAgICAgICBkZHBfcHJlZF9kbnk6IG51bWJlcjtcclxuICAgICAgICBUZXN0RHBoOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb24gUCBSIE8gUCBFIFIgVCBJIEUgUyBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGxhdm7DrSBtZXRvZGEgcHJvIGluaWNpYWxpemFjaSBva25hXHJcbiAgICAgICAgICogQG1ldGhvZCBvbkNvbnRlbnRSZWFkeVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVTaG9ydGN1dHMoKTtcclxuICAgICAgICAgICAgdGhhdC5lbmFibGVGaWVsZHMoKTtcclxuICAgICAgICAgICAgdGhhdC5zZXREZWZhdWx0RGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFMgRSBTIFQgQSBWIEUgTiDDjSAgIE8gSyBOIEEgICAgICAgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVGb3JtKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuVGVzdERwaCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1pbW9yYWRueVByZWRwaXNSZWNhcDogR29yZGljLkdpbi5XZWJDbGllbnQuSUdSZWNhcENvbmZpZ0R0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja1Zpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcmlvZERQSFZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbEFtb3VudDogbmV3IERlY2ltYWwodGhhdC5EYXRhUm96cGlzdS5jX21pbW8gPz8gMCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdW1GaWVsZDogZmllbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90YXhQZXJpb2Q6IGZpZWxkMiwgLy8gPC0gbGV0IHRheFBlcmlvZCA9IHBhcnNlRGF0ZSh0aGF0LkRldGFpbER0by5kYXRfZHBoX29kID8/IHRoYXQuRGV0YWlsRHRvLmRhdF91emF2cmVuaSA/PyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RheERvYzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlczogR29yZGljLkdpbi5XZWJDbGllbnQuVXRpbHMuZHBoTW9kZWxBcHBseSh0aGF0LkRhdGFSb3pwaXN1LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvc3ZvYm96ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY21pbW9fZDBcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuT3N2b2JvemVubywgcHJpY2VUeXBlOiBcImJhc2VWYWx1ZVwiIH0gfSwgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBiZXogZGFuxJtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjbWltb196MFwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5CZXpEYW5lLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOha2xhZG7DrSBzYXpiYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNtaW1vX3oyXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlpha2xhZG5pLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNtaW1vX2QyXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlpha2xhZG5pLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNtaW1vX3pkMlwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5aYWtsYWRuaSwgcHJpY2VUeXBlOiBcInN1bVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBydm7DrSBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY21pbW9fejFcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuUHJ2bmlTbml6ZW5hLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNtaW1vX2QxXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlBydm5pU25pemVuYSwgcHJpY2VUeXBlOiBcInRheFwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjbWltb196ZDFcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuUHJ2bmlTbml6ZW5hLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZHJ1aMOhIHNuw63FvmVuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjbWltb196M1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5EcnVoYVNuaXplbmEsIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY21pbW9fZDNcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuRHJ1aGFTbml6ZW5hLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNtaW1vX3pkM1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5EcnVoYVNuaXplbmEsIHByaWNlVHlwZTogXCJzdW1cIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0xZlldMOtIHNuw63FvmVuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHphdMOtbSBuZW7DrSBwb2Rwb3JhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sgZnJvbTogXCJjX3o0XCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlRyZXRpU25pemVuYSwgcHJpY2VUeXBlOiBcImJhc2VWYWx1ZVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBmcm9tOiBcImNfZDRcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuVHJldGlTbml6ZW5hLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy97IGZyb206IFwiY196ZDRcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuVHJldGlTbml6ZW5hLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemFva3JvdWhsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNtaW1vX3phb1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5aYW9rcm91aGxlbm8sIHByaWNlVHlwZTogXCJzdW1cIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NlbGtlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfbWltb1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5Eb2tsYWRDZWxrZW0sIHByaWNlVHlwZTogXCJzdW1cIiB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFiMSA9XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2NvbnRlbnQoR29yZGljLkdpbi5XZWJDbGllbnQucmVjYXBEUEgsIG1pbW9yYWRueVByZWRwaXNSZWNhcClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTWltb8WZw6FkbsO9IHDFmWVkcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBydm5pUHJlZHBpc1JlY2FwOiBHb3JkaWMuR2luLldlYkNsaWVudC5JR1JlY2FwQ29uZmlnRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyaW9kRFBIVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50OiBuZXcgRGVjaW1hbCh0aGF0LkRhdGFSb3pwaXN1LmNfcHJ2ID8/IDApLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc3VtRmllbGQ6IGZpZWxkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGF4UGVyaW9kOiBmaWVsZDIsIC8vIDwtIGxldCB0YXhQZXJpb2QgPSBwYXJzZURhdGUodGhhdC5EZXRhaWxEdG8uZGF0X2RwaF9vZCA/PyB0aGF0LkRldGFpbER0by5kYXRfdXphdnJlbmkgPz8gbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGF4RG9jOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlczogR29yZGljLkdpbi5XZWJDbGllbnQuVXRpbHMuZHBoTW9kZWxBcHBseSh0aGF0LkRhdGFSb3pwaXN1LCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvc3ZvYm96ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY3Bydl9kMFwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5Pc3ZvYm96ZW5vLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmV6IGRhbsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY3Bydl96MFwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5CZXpEYW5lLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOha2xhZG7DrSBzYXpiYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNwcnZfejJcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuWmFrbGFkbmksIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY3Bydl9kMlwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5aYWtsYWRuaSwgcHJpY2VUeXBlOiBcInRheFwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjcHJ2X3pkMlwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5aYWtsYWRuaSwgcHJpY2VUeXBlOiBcInN1bVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBydm7DrSBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY3Bydl96MVwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5QcnZuaVNuaXplbmEsIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY3Bydl9kMVwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5QcnZuaVNuaXplbmEsIHByaWNlVHlwZTogXCJ0YXhcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY3Bydl96ZDFcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuUHJ2bmlTbml6ZW5hLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZHJ1aMOhIHNuw63FvmVuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjcHJ2X3ozXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLkRydWhhU25pemVuYSwgcHJpY2VUeXBlOiBcImJhc2VWYWx1ZVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjcHJ2X2QzXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLkRydWhhU25pemVuYSwgcHJpY2VUeXBlOiBcInRheFwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjcHJ2X3pkM1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5EcnVoYVNuaXplbmEsIHByaWNlVHlwZTogXCJzdW1cIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0xZlldMOtIHNuw63FvmVuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHphdMOtbSBuZW7DrSBwb2Rwb3JhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sgZnJvbTogXCJjX3o0XCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlRyZXRpU25pemVuYSwgcHJpY2VUeXBlOiBcImJhc2VWYWx1ZVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBmcm9tOiBcImNfZDRcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuVHJldGlTbml6ZW5hLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy97IGZyb206IFwiY196ZDRcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuVHJldGlTbml6ZW5hLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemFva3JvdWhsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNwcnZfemFvXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlphb2tyb3VobGVubywgcHJpY2VUeXBlOiBcInN1bVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2Vsa2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY19wcnZcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuRG9rbGFkQ2Vsa2VtLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRhYjIgPVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdjb250ZW50KEdvcmRpYy5HaW4uV2ViQ2xpZW50LnJlY2FwRFBILCBwcnZuaVByZWRwaXNSZWNhcClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUHJ2bsOtIHDFmWVkcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGtDYXN0a2FSZWNhcDogR29yZGljLkdpbi5XZWJDbGllbnQuSUdSZWNhcENvbmZpZ0R0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja1Zpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcmlvZERQSFZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbEFtb3VudDogbmV3IERlY2ltYWwodGhhdC5EYXRhUm96cGlzdS5jX2NlbGsgPz8gMCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdW1GaWVsZDogZmllbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy90YXhQZXJpb2Q6IGZpZWxkMiwgLy8gPC0gbGV0IHRheFBlcmlvZCA9IHBhcnNlRGF0ZSh0aGF0LkRldGFpbER0by5kYXRfZHBoX29kID8/IHRoYXQuRGV0YWlsRHRvLmRhdF91emF2cmVuaSA/PyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXhEb2M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZXM6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LlV0aWxzLmRwaE1vZGVsQXBwbHkodGhhdC5EYXRhUm96cGlzdSwgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3N2b2JvemVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfZDBcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuT3N2b2JvemVubywgcHJpY2VUeXBlOiBcImJhc2VWYWx1ZVwiIH0gfSwgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJleiBkYW7Em1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfejBcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuQmV6RGFuZSwgcHJpY2VUeXBlOiBcImJhc2VWYWx1ZVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHrDoWtsYWRuw60gc2F6YmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX3oyXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlpha2xhZG5pLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfZDJcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuWmFrbGFkbmksIHByaWNlVHlwZTogXCJ0YXhcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY196ZDJcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuWmFrbGFkbmksIHByaWNlVHlwZTogXCJzdW1cIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcnZuw60gc27DrcW+ZW7DoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfejFcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuUHJ2bmlTbml6ZW5hLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfZDFcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuUHJ2bmlTbml6ZW5hLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfemQxXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlBydm5pU25pemVuYSwgcHJpY2VUeXBlOiBcInN1bVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRydWjDoSBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY196M1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5EcnVoYVNuaXplbmEsIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY19kM1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5EcnVoYVNuaXplbmEsIHByaWNlVHlwZTogXCJ0YXhcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY196ZDNcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuRHJ1aGFTbml6ZW5hLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdMWZZXTDrSBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB6YXTDrW0gbmVuw60gcG9kcG9yYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy97IGZyb206IFwiY196NFwiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5UcmV0aVNuaXplbmEsIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sgZnJvbTogXCJjX2Q0XCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlRyZXRpU25pemVuYSwgcHJpY2VUeXBlOiBcInRheFwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBmcm9tOiBcImNfemQ0XCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlRyZXRpU25pemVuYSwgcHJpY2VUeXBlOiBcInN1bVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphb2tyb3VobGVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX3phb1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5aYW9rcm91aGxlbm8sIHByaWNlVHlwZTogXCJzdW1cIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDZWxrZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX2NlbGtcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuRG9rbGFkQ2Vsa2VtLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRhYjMgPVxyXG4gICAgICAgICAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdjb250ZW50KEdvcmRpYy5HaW4uV2ViQ2xpZW50LnJlY2FwRFBILCBjZWxrQ2FzdGthUmVjYXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNlbGtvdsOhIMSNw6FzdGthIGsgcm96cGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gTWltb8WZw6FkbsO9IHDFmWVkcGlzXHJcbiAgICAgICAgICAgIHZhciBtaW1vcmFkbnlQcmVkcGlzRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiR0RkcE1pbW9yYWRueVByZWRwaXNGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDNNM1MxLCBMLTQtOC0wLCBNLTQtOC0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkU2VjdGlvbih7IG5hbWU6IFwibWltb3JhZG55UHJlZHBpc1NlY3Rpb25cIiwgbGFiZWw6IFwiTWltb8WZw6FkbsO9IHDFmWVkcGlzXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaw6FrbC4gYmV6IERQSFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbWltb196MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPc3ZvYi4gb2QgRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNtaW1vX2QwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlrDoWtsLiBzbsOtxb4uIERQSFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbWltb196MVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYcWIIHNuw63Fvi4gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNtaW1vX2QxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlrDoWtsLiAyLnNuw63Fvi4gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNtaW1vX3ozXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhxYggMi5zbsOtxb4uIERQSFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbWltb19kM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaw6FrbC4gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNtaW1vX3oyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhbiB6w6FrbC4gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNtaW1vX2QyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlphb2tyLlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbWltb196YW9cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwixIzDoXN0a2EgY2Vsa2VtXCIgLCBoaW50OiBcIkY2IC0gcHJvIHphZMOhbsOtIERQSFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfbWltb1wiLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPIFRFU1QhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfdnpuX21pbW8gPSB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcImRhdF92em5pa3VfbWltb1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbHVlICYmIGlucHV0LnZhbHVlICE9IG5ldyBEZWNpbWFsKDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfdnpuX21pbW8uZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZmxhZ1wiLCBcInJlcXVpcmVkXCIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gcMWZw616bmFrdSBQb3Zpbm7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3Z6bl9taW1vLmdmaWVsZChcInNldFZhbGlkYXRvcnNcIiwgW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSk7ICAgICAgIC8vIG5hc3RhdmVuw60gdmFsaWTDoXRvcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF92em5fbWltby5nZmllbGQoXCJvcHRpb25cIiwgXCJmbGFnXCIsIFwiXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8genJ1xaFlbsOtIHDFmcOtem5ha3UgUG92aW5uw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF92em5fbWltby5nZmllbGQoXCJzZXRWYWxpZGF0b3JzXCIsIFtdKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6cnXFoWVuw60gdmFsaWTDoXRvcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0LiB2em5pa3VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92em5pa3VfbWltb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdC4gc3BsYXRub3N0aVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbF9taW1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHZhciBtaW1vcmFkbnlQcmVkcGlzRGl2ID0gJC5uZXdEaXYoXCJtaW1vcmFkbnlQcmVkcGlzRGl2XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoeyB0aXRsZTogXCJNaW1vxZnDoWRuw70gcMWZZWRwaXNcIiwgb3BlbmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG1pbW9yYWRueVByZWRwaXNGb3JtKTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uIE1pbW/FmcOhZG7DvSBwxZllZHBpc1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gUHJ2bsOtIHDFmWVkcGlzXHJcbiAgICAgICAgICAgIHZhciBwcnZuaVByZWRwaXNGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJHRGRwUHJ2bmlQcmVkcGlzRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMSwgTC00LTgtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oeyBuYW1lOiBcInNlY3Rpb25QcnZuaVByZWRwaXNcIiwgbGFiZWw6IFwiUHJ2bsOtIHDFmWVkcGlzXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaw6FrbC4gYmV6IERQSFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjcHJ2X3owXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9zdm9iLiBvZCBEUEhcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3Bydl9kMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaw6FrbC4gc27DrcW+LiBEUEhcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3Bydl96MVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYcWIIHNuw63Fvi4gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNwcnZfZDFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2wuIDIuc27DrcW+LiBEUEhcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3Bydl96M1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYcWIIDIuc27DrcW+LiBEUEhcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3Bydl9kM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaw6FrbC4gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNwcnZfejJcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGFuIHrDoWtsLiBEUEhcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3Bydl9kMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaYW9rci5cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY3Bydl96YW9cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiUHJ2bsOtIHDFmWVkcGlzXCIsIGhpbnQ6IFwiRjYgLSBwcm8gemFkw6Fuw60gRFBIXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wcnZcIiwgcmVkTmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdC4gdnpuaWt1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdnpuaWt1X3BydlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXQuIHNwbGF0bm9zdGlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9zcGxfcHJ2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB2YXIgcHJ2bmlQcmVkcGlzRGl2ID0gJC5uZXdEaXYoXCJwcnZuaVByZWRwaXNEaXZcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7IHRpdGxlOiBcIlBydm7DrSBwxZllZHBpc1wiLCBvcGVuZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgcHJ2bmlQcmVkcGlzRm9ybSk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBQcnZuw60gcMWZZWRwaXNcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgLy8jcmVnaW9uIENlbGtvdsOhIMSNw6FzdGthIGsgcm96cGlzdVxyXG4gICAgICAgICAgICB2YXIgY2Vsa0Nhc3RrYUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkdEZHBDZWxrQ2FzdGthRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMSwgTC00LTgtMCwgTS00LTgtMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oeyBuYW1lOiBcInNlY3Rpb25DZWxrb3ZhQ2FzdGthXCIsIGxhYmVsOiBcIkNlbGtvdsOhIMSNw6FzdGthIGsgcm96cGlzdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2wuIGJleiBEUEhcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY196MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPc3ZvYi4gb2QgRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDBcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2wuIHNuw63Fvi4gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejFcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGHFiCBzbsOtxb4uIERQSFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2QxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlrDoWtsLiAyLnNuw63Fvi4gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfejNcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGHFiCAyLnNuw63Fvi4gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDNcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWsOha2wuIERQSFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3oyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhbiB6w6FrbC4gRFBIXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfZDJcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWmFva3IuXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfemFvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIsSMw6FzdGthIGsgcm96cGlzdVwiLCBoaW50OiBcIkY2IC0gcHJvIHphZMOhbsOtIERQSFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfY2Vsa1wiLCByZWROZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLCBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHZhciBjZWxrQ2FzdGthRGl2ID0gJC5uZXdEaXYoXCJjZWxrQ2FzdGthRGl2XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoeyB0aXRsZTogXCJDZWxrb3bDoSDEjcOhc3RrYSBrIHJvenBpc3VcIiwgb3BlbmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGNlbGtDYXN0a2FGb3JtKTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uIENlbGtvdsOhIMSNw6FzdGthIGsgcm96cGlzdVxyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gUGFyYW1ldHJ5IHJvenBpc3VcclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRyeVJvenBpc3VGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJHRGRwUGFyYW1ldHJ5Um96cGlzdUZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzIsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkU2VjdGlvbih7IG5hbWU6IFwic2VjdGlvblBhcmFtZXRyeVJvenBpc3VcIiwgbGFiZWw6IFwiUGFyYW1ldHJ5IHJvenBpc3VcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlBvxI0uIHDFmWVkLlwiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQb3N1biBkYXQuIHNwbGF0LiAoZG7FrylcIiwgXCJ3LTlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NfcHJlZHBcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLCBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0yXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvc3VuX3NwbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIGZsYWc6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctN1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZXBvc0RhdFZ6bmlrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5lcG9zb3V2YXQgZGF0LnZ6bmlrdVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJaYW9rcm91aGxlbsOtIHDFmWVkcGlzdVwiLCBcInctMTJcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNyYl96YW9cIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy00XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAwLCBsYWJlbDogXCJCZXogemFva3JvdWhsZW7DrVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiBcIjEgZGVzZXRpbm7DqSBtw61zdG9cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAyLCBsYWJlbDogXCJOYSBjZWzDqSBrb3J1bnlcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgaW5wdXQpID0+IHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQb3Bpc1wiLCBcInctNlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQb3puYW1rYVwiLCBcInctNlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHsgbmFtZTogXCJwb3Bpc1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHsgbmFtZTogXCJwb3puYW1rYVwiIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkthdGVnb3JpZSBwxZllZHBpc3VcIiwgXCJ3LTEyXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLCAvL1R5cCBwxZllZHBpc3UgKG5hbWUgPSBtb2RlbClcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLCBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvXCIsIC8vLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a3RnX3Vwb30te2t0Z191cG9fdHh0OnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IENvbW1vbi5CYXNlLm5hcGxuZW5pUG9sZUt0Z1Vwb1ByZSgwLCAxOTkpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJNxJtuYVwiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJJbnRlcnZhbCBkbsOtXCIsIFwidy0zXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkludGVydmFsIG3Em3PDrWPFr1wiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJJbnRlcnZhbCByb2vFr1wiLCBcInctM1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0zXCIsIFByZWZhYnMuU2VsZWN0LmVrb2NtZW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogeyBtZW5hOiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwubWVuYT12YWx1ZS5tZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpbnRfZG5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpbnRfbWVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpbnRfcm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIkRhdC52em5pa3UgcG9zbC5wcmVkcC5cIiwgXCJ3LTZcIilcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiRGF0LnNwbC5wb3NsLnByZWRwLlwiLCBcInctNlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdnpuaWt1X3Bvc2xcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLlByZWZhYnMuVmFsaWRhdG9yeS5WYWxpZGF0b3JEYXRWem5pa3VEYXRVemF2KHRoYXQsIHRoYXQuRGF0YVJvenBpc3UuZGF0X3V6YXYhKSwgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRVemF2cmVuaSA9IHRoYXQuRGF0YVJvenBpc3UuZGF0X3V6YXYhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0VnpuaWt1ID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJkYXRfc3BsX3Bvc2xcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dERhdCA9IGlucHV0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbF9wb3NsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1ldHJ5Um96cGlzdURpdiA9ICQubmV3RGl2KFwicGFyYW1ldHJ5Um96cGlzdURpdlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5ndGFiKHsgdGl0bGU6IFwiUGFyYW1ldHJ5IHJvenBpc3VcIiwgb3BlbmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHBhcmFtZXRyeVJvenBpc3VGb3JtKTsgXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBQYXJhbWV0cnkgcm96cGlzdVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGVuYWJsZUZpZWxkcygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LkRhdGFSb3pwaXN1LnByaXpfZHBoMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImNfejBcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImNwcnZfejBcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImNtaW1vX3owXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGF0LkRhdGFSb3pwaXN1LnByaXpfZHBoX3pha2wgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJjX3oyXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJjX2QyXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJjX3phb1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY3Bydl96MlwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY3Bydl9kMlwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY3Bydl96YW9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImNtaW1vX3oyXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJjbWltb19kMlwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY21pbW9femFvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGF0LkRhdGFSb3pwaXN1LnByaXpfZHBoX3NuaXogPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJjX3oxXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJjX2QxXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJjX3phb1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY3Bydl96MVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY3Bydl9kMVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY3Bydl96YW9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImNtaW1vX3oxXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJjbWltb19kMVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY21pbW9femFvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGF0LkRhdGFSb3pwaXN1LnByaXpfZHBoX3NuaXoyID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY196M1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY19kM1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY196YW9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImNwcnZfejNcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImNwcnZfZDNcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImNwcnZfemFvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJjbWltb196M1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY21pbW9fZDNcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImNtaW1vX3phb1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhhdC5EYXRhUm96cGlzdS5wcml6X29zdm9iID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY19kMFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY3Bydl9kMFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiY21pbW9fZDBcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pZiAodGhhdC5JeHAgPT0gbnVsbCB8fCB0aGF0Lkl4cCA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnN0IHpydXM6IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdQZXJtaXNzaW9uID0geyB2YWx1ZTogZmFsc2UsIG1lc3NhZ2U6IFwiTmVieWwgemFkw6FuIHZhbGlkbsOtIFBJRCBwb2hsZWTDoXZreSFcIi8qLCB2aXNpYmxlOiBmYWxzZSovIH1cclxuICAgICAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmFjdFNhdmUhLnVwZGF0ZVBlcm1pc3Npb24oenJ1cyk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBuYXN0YXZlbsOta2xhdmVzb3bDvWNoIHprcmF0ZWsgdiBva27Em1xyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlU2hvcnRjdXRzKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVNob3J0Y3V0cygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIENvbW1vbi5CYXNlLnNldERhdGVCb3hTaG9ydGN1dHModGhhdCk7XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJHRGRwQ2Vsa0Nhc3RrYUZvcm1cIikuZmluZEZpZWxkcyhcImNfY2Vsa1wiKS5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIkY2XCIsIC8va2zDoXZlc292w6EgemtyYXRrYSBGNlxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBPdGV2xZllbsOtIG9rbmEgcHJvIH5aYWTDoW7DrSBEUEh+IG5hZCBwb2zDrcSNa2VtIMSMw6FzdGthIGsgcm96cGlzdWAsIC8vUG9waXMga2zDoXZlc292w6kgemtyYXRreSBwcm8gem9icmF6ZW7DrSB2IG7DoXBvdsSbZMSbLlxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkZpZWxkLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJvcGVuVGFiWmFkYW5pRHBoQ2Vsa0FjdFwiXSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJHRGRwUHJ2bmlQcmVkcGlzRm9ybVwiKS5maW5kRmllbGRzKFwiY19wcnZcIikuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJGNlwiLCAvL2tsw6F2ZXNvdsOhIHprcmF0a2EgRjZcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgT3RldsWZZW7DrSBva25hIHBybyB+WmFkw6Fuw60gRFBIfiBuYWQgcG9sw63EjWtlbSBQcnZuw60gcMWZZWRwaXNgLCAvL1BvcGlzIGtsw6F2ZXNvdsOpIHprcmF0a3kgcHJvIHpvYnJhemVuw60gdiBuw6Fwb3bEm2TEmy5cclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5GaWVsZCxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wib3BlblRhYlphZGFuaURwaFBydkFjdFwiXSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoXCJHRGRwTWltb3JhZG55UHJlZHBpc0Zvcm1cIikuZmluZEZpZWxkcyhcImNfbWltb1wiKS5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIkY2XCIsIC8va2zDoXZlc292w6EgemtyYXRrYSBGNlxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBPdGV2xZllbsOtIG9rbmEgcHJvIH5aYWTDoW7DrSBEUEh+IG5hZCBwb2zDrcSNa2VtIMSMw6FzdGthIG1pbS4gcMWZLiBjZWxrZW1gLCAvL1BvcGlzIGtsw6F2ZXNvdsOpIHprcmF0a3kgcHJvIHpvYnJhemVuw60gdiBuw6Fwb3bEm2TEmy5cclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5GaWVsZCxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wib3BlblRhYlphZGFuaURwaE1pbW9BY3RcIl0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBuYXN0YXZlbsOtIHbDvWNob3rDrWNoIGhvZG5vdCBkbyBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqIEBtZXRob2Qgc2V0RGVmYXVsdERhdGEoKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0RGVmYXVsdERhdGEoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0LkRhdGFSb3pwaXN1LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSlcclxuICAgICAgICAgICAgLy9UT0RPOiBuYXN0YXZpdCB2w71jaG96w60gaG9kbm90eTpcclxuICAgICAgICAgICAgLy8gRnVuY3Rpb246IHByZWRwbG5fcG9sZVxyXG5cdFx0ICAgIC8vIFNldCBjYl9zdGR2eiA9IExvZ2luRERQLnJ6cF9uZXBvc291dmF0XHJcblx0XHQgICAgLy8gU2V0IGNyYl96YW9fMCA9IChMb2dpbkREUC5yenBfemFva3JvdWhsZW5pID0gMClcclxuICAgIFx0XHQvLyBTZXQgY3JiX3phb18xID0gKExvZ2luRERQLnJ6cF96YW9rcm91aGxlbmkgPSAxKVxyXG5cdCAgICBcdC8vIFNldCBjcmJfemFvXzIgPSAoTG9naW5ERFAucnpwX3phb2tyb3VobGVuaSA9IDIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIFxyXG4gICAgXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFMgRSBTIFQgQSBWIEUgTiDDjSAgIE8gSyBOIEFcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEEgQyBUIEkgTyBOIFMgLSBWIFkgVCBWIE8gxZggRSBOIMONICBBICBEIEUgRiBJIE4gSSBDIEVcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gYWN0aW9uIGxpc3QgYSBqZWRub3RsaXbDqSBha2NlXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVBY3Rpb25zKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVsb3ppdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSAvLyBVbG/FvmVuw60gZGF0IGEgemF2xZllbsOtIG9rbmEgdiBwxZnDrXBhZMSbIMO6c3DEm2NodSBtZXRvZHkuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdENsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb25lY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQuY2xvc2UoKTsgfSAvLyBaYXbFmWVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5YnJhdFJvenBpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlicmF0IHJvenBpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHZ5dHZvxZlpdCBha2NpIG90dsOtcmFqw61jw60gb2tubyBzZSBzZXpuYW1lbVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvcGVuVGFiWmFkYW5pRHBoQ2Vsa0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmFkw6Fuw60gRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPdGV2xZllbsOtIG9rbmEgcHJvIHphZMOhbsOtIERQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmMsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXN0a2E6IERlY2ltYWwgPSB0aGF0LmZpbmRGb3JtcyhcIkdEZHBDZWxrQ2FzdGthRm9ybVwiKS5maW5kRmllbGRzKFwiY19jZWxrXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm90ZXZyaU9rbm9Qcm9aYWRhbmlEcGgoMCwgY2FzdGthID8/IG5ldyBEZWNpbWFsKDApKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwib3BlblRhYlphZGFuaURwaFBydkFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmFkw6Fuw60gRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPdGV2xZllbsOtIG9rbmEgcHJvIHphZMOhbsOtIERQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGlzYWJsZWQ6ICF0aGF0LnBlcm1zRHRvLmMsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXN0a2E6IERlY2ltYWwgPSB0aGF0LmZpbmRGb3JtcyhcIkdEZHBQcnZuaVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJjX3BydlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vdGV2cmlPa25vUHJvWmFkYW5pRHBoKDEsIGNhc3RrYSA/PyBuZXcgRGVjaW1hbCgwKSk7ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm9wZW5UYWJaYWRhbmlEcGhNaW1vQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYWTDoW7DrSBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk90ZXbFmWVuw60gb2tuYSBwcm8gemFkw6Fuw60gRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kaXNhYmxlZDogIXRoYXQucGVybXNEdG8uYyxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhc3RrYTogRGVjaW1hbCA9IHRoYXQuZmluZEZvcm1zKFwiR0RkcE1pbW9yYWRueVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJjX21pbW9cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3RldnJpT2tub1Byb1phZGFuaURwaCgyLCBjYXN0a2EgPz8gbmV3IERlY2ltYWwoMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcIjxhY3RWeWJyYXRSb3pwaXNcIiwgXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHByZXBvY2V0Q2FzdGVrKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBub3ZlRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5HRGRwUm96cGlzUHJlZHBpc3VEdG8gPSB7fTtcclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgbm92ZUR0byk7XHJcblxyXG4gICAgICAgICAgICBpZiAoISh0aGF0LkRhdGFSb3pwaXN1LnByaXpfZHBoMiA9PSAwIHx8IHRoYXQuRGF0YVJvenBpc3UucHJpel9vc3ZvYiA9PSAxIHx8IHRoYXQuRGF0YVJvenBpc3UucHJpel9kcGhfemFrbCA9PSAxIHx8IHRoYXQuRGF0YVJvenBpc3UucHJpel9kcGhfc25peiA9PSAxIHx8IHRoYXQuRGF0YVJvenBpc3UucHJpel9kcGhfc25pejIgPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgIG5vdmVEdG8uY196MCA9IG5ldyBEZWNpbWFsKDApOyBcclxuICAgICAgICAgICAgICAgIG5vdmVEdG8uY196MSA9IG5ldyBEZWNpbWFsKDApOyBcclxuICAgICAgICAgICAgICAgIG5vdmVEdG8uY196MiA9IG5ldyBEZWNpbWFsKDApOyBcclxuICAgICAgICAgICAgICAgIG5vdmVEdG8uY196MyA9IG5ldyBEZWNpbWFsKDApOyBcclxuICAgICAgICAgICAgICAgIG5vdmVEdG8uY19kMCA9IG5ldyBEZWNpbWFsKDApOyBcclxuICAgICAgICAgICAgICAgIG5vdmVEdG8uY19kMSA9IG5ldyBEZWNpbWFsKDApOyBcclxuICAgICAgICAgICAgICAgIG5vdmVEdG8uY19kMiA9IG5ldyBEZWNpbWFsKDApOyBcclxuICAgICAgICAgICAgICAgIG5vdmVEdG8uY19kMyA9IG5ldyBEZWNpbWFsKDApOyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvdGV2cmlPa25vUHJvWmFkYW5pRHBoKHpkcm9qOiBudW1iZXIsIGNhc3RrYTogRGVjaW1hbCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHdpbmRvd09wdGlvbiA9IHsgdGl0bGU6IFwiWmFkw6Fuw60gRFBIXCIsIHdpZHRoOiA1MDAsIGhlaWdodDogNTAwIH07XHJcbiAgICAgICAgICAgIHZhciBQYXJhbUpTT04gPSB7IElEOiBcIkREUEdaYWRhbmlEcGgjXCIsIEl4cDogdGhhdC5JeHAsIFR5cF9waGw6IHRoYXQuRGF0YVJvenBpc3UudHlwX3BobCwgQ2FzdGthX0tfVnlwb2N0dTogY2FzdGthID8/IG5ldyBEZWNpbWFsKDApfTtcclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdaYWRhbmlEcGhcIiwgUGFyYW1KU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmV0VmFsID0geyAvLyAxMCAtIHrDoWtsYWRuw60gc2F6YmEgRFBIIC8vIDIwIC0gc27DrcW+ZW7DoSBzYXpiYSBEUEggLy8gMzAgLSAyLnNuw63FvmVuw6Egc2F6YmEgRFBIIC8vIDQwIC0gMy5zbsOtxb5lbsOhIHNhemJhIERQSFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBzYXpiYTogZm9ybS5maW5kRmllbGRzKFwic2F6YmFcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIiksICAgICAgICAgICAgICAvLyBvcF9kYW5fdHlwICAgICAvLyBTYXpiYSAtIHR5cCBkYW7EmyAoMTAsMjAsMzAsNDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNhc3RrYTogZm9ybS5maW5kRmllbGRzKFwiY2FzdGthXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpLCAgIC8vIG9wX2MgICAgICAgICAgIC8vIENlbGtvdsOhIMSNw6FzdGthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHpha2xhZDogZm9ybS5maW5kRmllbGRzKFwiemFrbGFkXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpLCAgIC8vIG9wX2NfYmV6X2RwaCAgIC8vIFrDoWtsYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZGFuOiBmb3JtLmZpbmRGaWVsZHMoXCJkYW5cIikuZ2ZpZWxkPERlY2ltYWw+KFwiZ2V0VmFsdWVcIiksICAgICAgICAgLy8gb3BfY19kcGggICAgICAgLy8gRGHFiFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB6YW86IGZvcm0uZmluZEZpZWxkcyhcInphb1wiKS5nZmllbGQ8RGVjaW1hbD4oXCJnZXRWYWx1ZVwiKSwgICAgICAgICAvLyBvcF9jX3phbyAgICAgICAvLyBaYW9rcm91aGxlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGRhdFpkYW46IGZvcm0uZmluZEZpZWxkcyhcImRhdF96ZGFuXCIpLmdmaWVsZDxEYXRlPihcImdldFZhbHVlXCIpLCAgIC8vIGxfZGF0X3pkYW4gICAgIC8vIFphb2tyb3VobGVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybTogYW55LCBjZWxrOiBzdHJpbmcgPSBcIlwiLCBjX3owOiBzdHJpbmcgPSBcIlwiLCBjX3oxOiBzdHJpbmcgPSBcIlwiLCBjX3oyOiBzdHJpbmcgPSBcIlwiLCBjX3ozOiBzdHJpbmcgPSBcIlwiLCBjX2QwOiBzdHJpbmcgPSBcIlwiLCBjX2QxOiBzdHJpbmcgPSBcIlwiLCBjX2QyOiBzdHJpbmcgPSBcIlwiLCBjX2QzOiBzdHJpbmcgPSBcIlwiLCBjemFvOiBzdHJpbmcgPSBcIlwiOyAvLyBjX3o0LCBjX2Q0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHpkcm9qKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHsgLy8gTWltb8WZw6FkbsO9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwiR0RkcE1pbW9yYWRueVByZWRwaXNGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGsgPSBcImNfbWltb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfejAgPSBcImNtaW1vX3owXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY196MSA9IFwiY21pbW9fejFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX3oyID0gXCJjbWltb196MlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfejMgPSBcImNtaW1vX3ozXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jX3o0ID0gXCJjbWltb196NFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfZDAgPSBcImNtaW1vX2QwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY19kMSA9IFwiY21pbW9fZDFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX2QyID0gXCJjbWltb19kMlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfZDMgPSBcImNtaW1vX2QzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jX2Q0ID0gXCJjbWltb19kNFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN6YW8gPSBcImNtaW1vX3phb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiB7IC8vIFBydm5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwiR0RkcFBydm5pUHJlZHBpc0Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsayA9IFwiY19wcnZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX3owID0gXCJjcHJ2X3owXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY196MSA9IFwiY3Bydl96MVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfejIgPSBcImNwcnZfejJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX3ozID0gXCJjcHJ2X3ozXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jX3o0ID0gXCJjcHJ2X3o0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY19kMCA9IFwiY3Bydl9kMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfZDEgPSBcImNwcnZfZDFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX2QyID0gXCJjcHJ2X2QyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY19kMyA9IFwiY3Bydl9kM1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY19kNCA9IFwiY3Bydl9kNFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN6YW8gPSBcImNwcnZfemFvXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6ICAgICAvLyBDZWxrZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybSA9IHRoYXQuZmluZEZvcm1zKFwiR0RkcENlbGtDYXN0a2FGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGsgPSBcImNfY2Vsa1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfejAgPSBcImNfejBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX3oxID0gXCJjX3oxXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY196MiA9IFwiY196MlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfejMgPSBcImNfejNcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NfejQgPSBcImNfejRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX2QwID0gXCJjX2QwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY19kMSA9IFwiY19kMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNfZDIgPSBcImNfZDJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjX2QzID0gXCJjX2QzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jX2Q0ID0gXCJjX2Q0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3phbyA9IFwiY196YW9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZXRWYWwuc2F6YmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FzZSA0MDogeyAgICAvLyA0MCAtIDMuc27DrcW+ZW7DoSBzYXpiYSBEUEggICAvLyBuZ19kYW50eXBMb3czXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBmb3JtLmZpbmRGaWVsZHMoY196NCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsLnpha2xhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBmb3JtLmZpbmRGaWVsZHMoY19kNCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsLmRhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzMDogeyAgICAvLyAzMCAtIDIuc27DrcW+ZW7DoSBzYXpiYSBEUEggICAvLyBuZ19kYW50eXBMb3cyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKGNfejMpLmdmaWVsZChcInNldFZhbHVlXCIsIHJldFZhbC56YWtsYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhjX2QzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXRWYWwuZGFuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjA6IHsgICAgLy8gMjAgLSBzbsOtxb5lbsOhIHNhemJhIERQSCAgICAgLy8gbmdfZGFudHlwTG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKGNfejEpLmdmaWVsZChcInNldFZhbHVlXCIsIHJldFZhbC56YWtsYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhjX2QxKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXRWYWwuZGFuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB7ICAgIC8vIDEwIC0gesOha2xhZG7DrSBzYXpiYSBEUEggICAgLy8gbmdfZGFudHlwQmFzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhjX3oyKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXRWYWwuemFrbGFkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoY19kMikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsLmRhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhjemFvKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXRWYWwuemFvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBpZiAoIE5WTChjYXN0a2EsMCkgPT0gcmV0VmFsLmNhc3RrYSApIHsgY2FzdGthID0gcmV0VmFsLmNhc3RrYTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IGNhc3RrYSA9IHJldFZhbC56YWtsYWQgKyByZXRWYWwuZGFuICsgcmV0VmFsLnphbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGtvdmFDYXN0a2EgPSBEZWNpbWFsLmFkZChyZXRWYWwuemFrbGFkLCBEZWNpbWFsLmFkZChyZXRWYWwuZGFuLCByZXRWYWwuemFvKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhjZWxrKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjZWxrb3ZhQ2FzdGthKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9ICAgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gcm96cGlzdSAtIHVsb8W+ZW7DrSBkYXQgeiBvYnNhaHUgXHJcbiAgICAgICAgICogQG1ldGhvZCB1bG96aXQoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSAtIFZyYWPDrSBwcm9taXNlIDxVa29uxI1lbsOtIG1ldG9keSB2b2lkPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdWxveml0KCk6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQ8dm9pZD4oKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnl0dm/FmWVuw60gcHJvbWlzdVxyXG4gICAgICAgICAgICB2YXIgY2h5Ym5hS29udHJvbGE6IGJvb2xlYW4gPSBmYWxzZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb21vY27DvSBwxZnDrXpuYWsgcHJvIGhsw61kw6Fuw60gY2h5YiBwxZlpIGtvbnRyb2xlIGRhdFxyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybSA9IHRoYXQuZmluZEZvcm1zKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVsWhZWNobnkgZm9ybXkgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9IGZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhbGlkYWNlIGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgIGlmICghaXNWYWxpZCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIG5lanNvdSBkYXRhIHZhbGlkbsOtLi4uXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpLnByb21pc2UoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVrb27EjcOtbSBtZXRvZHUgcyBjaHlib3VcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcIm9wU2F2ZVByZXBhcmVMb2FkaW5nXCIsIHRleHQ6IFwiUMWZaXByYXZ1amkgZGF0YSBwcm8gdWxvxb5lbsOtLi4uXCIgfSk7ICAvLyBaYXBudSBuYcSNw610w6Fuw60ga29udHJvbHkgZGF0IHBybyB1bG/FvmVuw61cclxuXHJcbiAgICAgICAgICAgIGxldCBub3ZlRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5HRGRwUm96cGlzUHJlZHBpc3VEdG8gPSB7fTsgLy8gPyBNb8W+bsOhIG5hc3Rhdm92YXQgamnFviBleGlzdHVqw61jw60gRGF0YVJvenBpc3UgKG5lYm/FpSBtw6EgaW5pdCB2xaFlY2ggcG90xZllYm7DvWNoIGRhdC5cclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIG5vdmVEdG8pO1xyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIFRPRE86IHDFmWVkxJtsYXQgZG8gR1ZhbGlkYXRvcnUgbmEgc2Ftb3Ruw6kgZmllbGR5XHJcbiAgICAgICAgICAgIC8veCBJRiBEQVRfVk5JS1UgPT0gTlVMTCAtPiBDSFlCQTogJ1Z5cGzFiHRlIGRhdHVtIHZ6bmlrdSEnIC8vIMWZZcWhZW5vIHBvbW92w60gdmFsaWRhY2UgR1JlcXVpcmVkXHJcbiAgICAgICAgICAgIGlmIChub3ZlRHRvLmRhdF92em5pa3VfcHJ2ISA8PSB0aGF0LkRhdGFSb3pwaXN1Py5kYXRfdXphdiEpIHsgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjaHlibmFLb250cm9sYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm9wU2F2ZVByZXBhcmVMb2FkaW5nXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBcIkRhdHVtIHZ6bmlrdSBwcnZuw61obyBwxZllZHBpc3UgbXVzw60gYsO9dCBwbyBkYXR1IHV6w6F2xJtya3khXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcyhcIkdEZHBQcnZuaVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJkYXRfdnpuaWt1X3BydlwiKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vdmVEdG8uY19taW1vICE9IG5ldyBEZWNpbWFsKDApICYmIG5vdmVEdG8uZGF0X3Z6bmlrdV9taW1vISA8IHRoYXQuRGF0YVJvenBpc3U/LmRhdF91emF2ISkgeyAvLyBtaW1vxZnDoWRuw70gcMWZZWRwaXMgdnnFmWF6ZW4oYSB2csOhY2VuKVxyXG4gICAgICAgICAgICAgICAgY2h5Ym5hS29udHJvbGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJvcFNhdmVQcmVwYXJlTG9hZGluZ1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOZWx6ZSB2eXR2w6HFmWV0IHDFmWVkcGlzeSB2IHV6YXbFmWVuw6ltIG9iZG9iw61cIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKFwiR0RkcE1pbW9yYWRueVByZWRwaXNGb3JtXCIpLmZpbmRGaWVsZHMoXCJkYXRfdnpuaWt1X21pbW9cIikuZ2ZpZWxkKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBUT0RPOlxyXG5cclxuICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJvcFNhdmVQcmVwYXJlTG9hZGluZ1wiIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVWtvbsSNw61tIG5hxI3DrXTDoW7DrSBwxZnDrXByYXZuw6kgxI3DoXN0aVxyXG5cclxuICAgICAgICAgICAgaWYgKCFjaHlibmFLb250cm9sYSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcIm9wU2F2ZVByb2Nlc3NMb2FkaW5nXCIsIHRleHQ6IFwiVnl0dsOhxZnDrW0gcm96cGlzLi4uXCIgfSk7ICAgIC8vIFpvYnJhemVuw60gZGlhbG9ndSBzIG5hxI3DrXTDoW7DrW1cclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLkRkcFJvenBpc1ByZWRwaXN1LnVkZWxlalJvenBpcyh7IGRhdGE6IG5vdmVEdG8gfSkgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFphdm9sw6Fuw60gSVNMIG1ldG9keSBrIHVsb8W+ZW7DrSBkYXQgbGjFr3R5XHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwib3BTYXZlUHJvY2Vzc0xvYWRpbmdcIiB9KTsgfSkgICAgICAgICAgIC8vIFVrb27EjWVuw60gZGlhbG9ndSBzIG5hxI3DrXTDoW7DrW0gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWIHDFmcOtcGFkxJsgw7pzcMSbY2h1ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpOyAgICAgICAgICAgICAgIDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjw60gcHJvbWlzZV9yZXNvbHZlID0gw7pzcMSbY2hcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gViBwxZnDrXBhZMSbIGNoeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFYgcMWZw61wYWTEmyB2w71qaW1reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGF2ZW7DrSB2w71qaW1reSBqYWtvIG/FoWV0xZllbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpvYnJhemVuw60gZGlhbG9ndSBzIGNoeWJvdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyB6YXbFmWVuw60gZGlhbG9ndVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY8OtIHByb21pc2VfcmVqZWN0ID0gY2h5YmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgcmV0dXJuIGRlZi5yZWplY3QoKTsgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY8OtIHByb21pc2VfcmVqZWN0ID0gY2h5YmEgKGkga2R5xb4gc2UgbmVqZWRuw6EgbyBvxaFldMWZZW5vdSB2eWrDrW1rdSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjw60gcHJvbWlzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCkucHJvbWlzZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFYgcMWZw61wYWTEmyDFvmUgbmFzdGFsYSBuZWpha8OhIGNoeWJhIHYga29udHJvbMOhY2ggYSBkb2J1YmxhbG8gdG8gYcW+IHNlbSwgdGFrIHVwbG7EmyB1a29uxI3DrW0gcyBjaHlib3VcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIEEgQyBUIEkgTyBOIFMgLSBWIFkgVCBWIE8gxZggRSBOIMONICBBICBEIEUgRiBJIE4gSSBDIEVcclxuICAgIH1cclxufVxyXG5cclxuLy9wcml2YXRlIGNyZWF0ZUZvcm1PbGQoKSB7XHJcbi8vICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4vLyAgICB2YXIgY2FzdGt5Um96cGlzdUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkdEZHBGb3JtQ2FzdGt5Um96cGlzdVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbi8vICAgICAgICAvLyBNaW1vxZnDoWRuw70gcMWZZWRwaXNcclxuLy8gICAgICAgIC5hZGRTZWN0aW9uKHsgbmFtZTogXCJzZWN0aW9uTWltb3JhZG55UHJlZHBpc1wiLCBsYWJlbDogXCJNaW1vxZnDoWRuw70gcMWZZWRwaXNcIiB9KVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIlrDoWtsLiBiZXogRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIk9zdm9iLiBvZCBEUEhcIiwgXCJ3LTMgcmlnaHRcIilcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiWsOha2wuIHNuw63Fvi4gRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIkRhxYggc27DrcW+LiBEUEhcIiwgXCJ3LTMgcmlnaHRcIilcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjbWltb196MFwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjbWltb19kMFwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjbWltb196MVwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjbWltb19kMVwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIlrDoWtsLiAyLnNuw63Fvi4gRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIkRhxYggMi5zbsOtxb4uIERQSFwiLCBcInctMyByaWdodFwiKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJaw6FrbC4gRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIkRhbiB6w6FrbC4gRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkUm93KClcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY21pbW9fejNcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY21pbW9fZDNcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY21pbW9fejJcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY21pbW9fZDJcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJaYW9rci5cIiwgXCJ3LTMgcmlnaHRcIilcclxuLy8gICAgICAgIC5hZGRUZXh0KFwixIzDoXN0a2EgY2Vsa2VtXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIkRhdC4gdnpuaWt1XCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIkRhdC4gc3BsYXRub3N0aVwiLCBcInctMyByaWdodFwiKVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcImNtaW1vX3phb1wiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjX21pbW9cIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0zXCIsIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcImNfZGF0X3Z6bmlrdV9taW11XCIsXHJcbi8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctM1wiLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjX2RhdF9zcGxfbWltb1wiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLy8gUHJ2bsOtIHDFmWVkcGlzXHJcbi8vICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwic2VjdGlvblBydm5pUHJlZHBpc1wiLCBsYWJlbDogXCJQcnZuw60gcMWZZWRwaXNcIiB9KVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIlrDoWtsLiBiZXogRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIk9zdm9iLiBvZCBEUEhcIiwgXCJ3LTMgcmlnaHRcIilcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiWsOha2wuIHNuw63Fvi4gRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIkRhxYggc27DrcW+LiBEUEhcIiwgXCJ3LTMgcmlnaHRcIilcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjcHJ2X3owXCIsXHJcbi8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcImNwcnZfZDBcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY3Bydl96MVwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjcHJ2X2QxXCIsXHJcbi8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkUm93KClcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiWsOha2wuIDIuc27DrcW+LiBEUEhcIiwgXCJ3LTMgcmlnaHRcIilcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiRGHFiCAyLnNuw63Fvi4gRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIlrDoWtsLiBEUEhcIiwgXCJ3LTMgcmlnaHRcIilcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiRGFuIHrDoWtsLiBEUEhcIiwgXCJ3LTMgcmlnaHRcIilcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjcHJ2X3ozXCIsXHJcbi8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcImNwcnZfZDNcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY3Bydl96MlwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjcHJ2X2QyXCIsXHJcbi8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkUm93KClcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiWmFva3IuXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIlBydm7DrSBwxZllZHBpc1wiLCBcInctMyByaWdodFwiKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJEYXQuIHZ6bmlrdVwiLCBcInctMyByaWdodFwiKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJEYXQuIHNwbGF0bm9zdGlcIiwgXCJ3LTMgcmlnaHRcIilcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjcHJ2X3phb1wiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjX3BydlwiLFxyXG4vLyAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIC8vZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTNcIiwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY19kYXRfdnpuaWt1X3BydlwiLFxyXG4vLyAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIC8vZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTNcIiwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY19kYXRfc3BsX3BydlwiLFxyXG4vLyAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIC8vZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLy8gQ2Vsa292w6EgxI3DoXN0a2EgayByb3pwaXN1XHJcbi8vICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwic2VjdGlvbkNlbGtvdmFDYXN0a2FcIiwgbGFiZWw6IFwiQ2Vsa292w6EgxI3DoXN0a2EgayByb3pwaXN1XCIgfSlcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJaw6FrbC4gYmV6IERQSFwiLCBcInctMyByaWdodFwiKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJPc3ZvYi4gb2QgRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIlrDoWtsLiBzbsOtxb4uIERQSFwiLCBcInctMyByaWdodFwiKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJEYcWIIHNuw63Fvi4gRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkUm93KClcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY196MFwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjX2QwXCIsXHJcbi8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcImNfejFcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY19kMVwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIlrDoWtsLiAyLnNuw63Fvi4gRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIkRhxYggMi5zbsOtxb4uIERQSFwiLCBcInctMyByaWdodFwiKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJaw6FrbC4gRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIkRhbiB6w6FrbC4gRFBIXCIsIFwidy0zIHJpZ2h0XCIpXHJcbi8vICAgICAgICAuYWRkUm93KClcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY196M1wiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjX2QzXCIsXHJcbi8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcImNfejJcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY19kMlwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIlphb2tyLlwiLCBcInctMyByaWdodFwiKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCLEjMOhc3RrYSBrIHJvenBpc3VcIiwgXCJ3LTMgcmlnaHRcIilcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjX3phb1wiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctM1wiLCBQcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjX2NlbGtcIixcclxuLy8gICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLCAvL2ZsYWc6IFwicmVxdWlyZWRcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRTZWN0aW9uKHsgbmFtZTogXCJzZWN0aW9uUGFyYW1ldHJ5Um96cGlzdVwiLCBsYWJlbDogXCJQYXJhbWV0cnkgcm96cGlzdVwiIH0pXHJcbi8vICAgICAgICA7XHJcbi8vICAgIHZhciBwYXJhbWV0cnlSb3pwaXN1Rm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiR0RkcEZvcm1QYXJhbWV0cnlSb3pwaXN1XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMyLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuLy8gICAgICAgIC5hZGRTZWN0aW9uKClcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJQb8SNLiBwxZllZC5cIiwgXCJ3LTRcIilcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiUG9zdW4gZGF0LiBzcGxhdC4gKGRuxa8pXCIsIFwidy04XCIpXHJcbi8vICAgICAgICAuYWRkUm93KClcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwicG9jX3ByZWRwXCIsXHJcbi8vICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgLy9mbGFnOiBcInJlcXVpcmVkXCIsXHJcbi8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0yXCIsIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcInBvc3VuX3NwbFwiLFxyXG4vLyAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIC8vZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy03XCIsIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcIm5lcG9zRGF0VnpuaWt1XCIsXHJcbi8vICAgICAgICAgICAgbGFiZWw6IFwiTmVwb3NvdXZhdCBkYXQudnpuaWt1XCIsXHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIlphb2tyb3VobGVuw60gcMWZZWRwaXN1XCIsIFwidy0xMlwiKVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY3JiX3phb1wiLFxyXG4vLyAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTRcIixcclxuLy8gICAgICAgICAgICBpbml0aWFsVmFsdWU6IDAsXHJcbi8vICAgICAgICAgICAgcmFkaW9zOiBbXHJcbi8vICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiBcIkJleiB6YW9rcm91aGxlbsOtXCIgfSxcclxuLy8gICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6IFwiMSBkZXNldGlubsOpIG3DrXN0b1wiIH0sXHJcbi8vICAgICAgICAgICAgICAgIHsgdmFsdWU6IDIsIGxhYmVsOiBcIk5hIGNlbMOpIGtvcnVueVwiIH1cclxuLy8gICAgICAgICAgICBdLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogKGV2LCBpbnB1dCkgPT4ge31cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkUm93KClcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiUG9waXNcIiwgXCJ3LTZcIilcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiUG96bmFta2FcIiwgXCJ3LTZcIilcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCB7IG5hbWU6IFwicG9waXNcIiB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCB7IG5hbWU6IFwicG96bmFta2FcIiB9KVxyXG5cclxuLy8gICAgICAgIC5hZGRTZWN0aW9uKClcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJLYXRlZ29yaWUgcMWZZWRwaXN1XCIsIFwidy0xMlwiKVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcImJ1Y2RwZXBfa3RnX3Vwb1wiLCAvL1R5cCBwxZllZHBpc3VcclxuLy8gICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLCAvL2ZsYWc6IFwicmVxdWlyZWRcIixcclxuLy8gICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5idWNkcGVwX2t0Z191cG89dmFsdWUua3RnX3Vwb1wiLCAvLyxcclxuLy8gICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2t0Z191cG99LXtrdGdfdXBvX3R4dDp0cmltOmVuY29kZX1cIixcclxuLy8gICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbi8vICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4vLyAgICAgICAgICAgICAgICBrdGdfdXBvOiBDb21tb24uQmFzZS5uYXBsbmVuaVBvbGVLdGdVcG9QcmUoMCwgMTk5KVxyXG4vLyAgICAgICAgICAgIH1cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkUm93KClcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiTcSbbmFcIiwgXCJ3LTNcIilcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiSW50ZXJ2YWwgZG7DrVwiLCBcInctM1wiKVxyXG4vLyAgICAgICAgLmFkZFRleHQoXCJJbnRlcnZhbCBtxJtzw61jxa9cIiwgXCJ3LTNcIilcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiSW50ZXJ2YWwgcm9rxa9cIiwgXCJ3LTNcIilcclxuLy8gICAgICAgIC5hZGRSb3coKVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBQcmVmYWJzLlNlbGVjdC5la29jbWVuKCksIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcIm1lbmFcIixcclxuLy8gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHsgbWVuYTogMCB9LFxyXG4vLyAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLm1lbmE9dmFsdWUubWVuYVwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9LFxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiaW50X2RuaVwiLFxyXG4vLyAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIC8vZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge31cclxuLy8gICAgICAgIH0pXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0zXCIsIHtcclxuLy8gICAgICAgICAgICBuYW1lOiBcImludF9tZXNcIixcclxuLy8gICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLCAvL2ZsYWc6IFwicmVxdWlyZWRcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTNcIiwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiaW50X3Jva1wiLFxyXG4vLyAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIC8vZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkVGV4dChcIkRhdC52em5pa3UgcG9zbC5wcmVkcC5cIiwgXCJ3LTZcIilcclxuLy8gICAgICAgIC5hZGRUZXh0KFwiRGF0LnNwbC5wb3NsLnByZWRwLlwiLCBcInctNlwiKVxyXG4vLyAgICAgICAgLmFkZFJvdygpXHJcbi8vICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbi8vICAgICAgICAgICAgbmFtZTogXCJjX2RhdF92em5pa3VfcG9zbFwiLFxyXG4vLyAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sIC8vZmxhZzogXCJyZXF1aXJlZFwiLFxyXG4vLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbi8vICAgICAgICB9KVxyXG4vLyAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4vLyAgICAgICAgICAgIG5hbWU6IFwiY19kYXRfc3BsX3Bvc2xcIixcclxuLy8gICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLCAvL2ZsYWc6IFwicmVxdWlyZWRcIixcclxuLy8gICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgfSlcclxuLy8gICAgICAgIC8vLmFkZFJvdygpXHJcbi8vICAgICAgICAvLy5hZGRUZXh0KFwiUG/EjS4gcMWZZWQuXCIsIFwidy0yXCIpXHJcbi8vICAgICAgICAvLy5hZGRUZXh0KFwiUG9zdW4gZGF0LnNwbC4oZG7FrylcIiwgXCJ3LTJcIilcclxuLy8gICAgICAgIC8vLmFkZFRleHQoXCJcIiwgXCJ3LTNcIilcclxuLy8gICAgICAgIC8vLmFkZFRleHQoXCJLYXRlZ29yaWUgcMWZZWRwaXN1XCIsIFwidy01XCIpXHJcbi8vICAgICAgICAvLy5hZGRSb3coKVxyXG4vLyAgICAgICAgLy8uYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0yXCIsIHtcclxuLy8gICAgICAgIC8vICAgIG5hbWU6IFwicG9jX3ByZWRwXCIsXHJcbi8vICAgICAgICAvLyAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgLy99KVxyXG4vLyAgICAgICAgLy8uYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0yXCIsIHtcclxuLy8gICAgICAgIC8vICAgIG5hbWU6IFwicG9zdW5fc3BsXCIsXHJcbi8vICAgICAgICAvLyAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4vLyAgICAgICAgLy99KVxyXG4vLyAgICAgICAgLy8uYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTNcIiwge1xyXG4vLyAgICAgICAgLy8gICAgbmFtZTogXCJuZXBvc0RhdFZ6bmlrdVwiLFxyXG4vLyAgICAgICAgLy8gICAgbGFiZWw6IFwiTmVwb3NvdXZhdCBkYXQuIHZ6bmlrdVwiLFxyXG4vLyAgICAgICAgLy99KVxyXG4vLyAgICAgICAgLy8uYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy01XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4vLyAgICAgICAgLy8gICAgbmFtZTogXCJidWNkcGVwX2t0Z191cG9cIiwgLy9UeXAgcMWZZWRwaXN1XHJcbi8vICAgICAgICAvLyAgICBtb2RlbDogXCJtb2RlbC5idWNkcGVwX2t0Z191cG89dmFsdWUua3RnX3Vwb1wiLCAvLyxcclxuLy8gICAgICAgIC8vICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a3RnX3Vwb30te2t0Z191cG9fdHh0OnRyaW06ZW5jb2RlfVwiLFxyXG4vLyAgICAgICAgLy8gICAgZHJvcGRvd246IGZhbHNlLFxyXG4vLyAgICAgICAgLy8gICAgc2VydmVyRmlsdGVyczoge1xyXG4vLyAgICAgICAgLy8gICAgICAgIGt0Z191cG86IENvbW1vbi5CYXNlLm5hcGxuZW5pUG9sZUt0Z1Vwb1ByZSgwLCAxOTkpXHJcbi8vICAgICAgICAvLyAgICB9XHJcbi8vICAgICAgICAvL30pXHJcbi8vICAgICAgICA7XHJcblxyXG4vLyAgICB2YXIgY2FzdGt5Um96cGlzdUZvcm1EaXYgPSAkLm5ld0RpdigvKklEKi8pLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGNhc3RreVJvenBpc3VGb3JtKTtcclxuLy8gICAgdmFyIHBhcmFtZXRyeVJvenBpc3VGb3JtRGl2ID0gJC5uZXdEaXYoLypJRCovKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBwYXJhbWV0cnlSb3pwaXN1Rm9ybSk7XHJcbi8vfSJdfQ==