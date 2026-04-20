"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVypocetPredpisu.ts                    </Name>
//    <Description> Okno pro výpočet předpisu                                   </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2022-11-28                                                  </Created>
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
            let GVypocetPredpisu = class GVypocetPredpisu extends Gordic.GContentBase {
                onContentReady() {
                    let that = this;
                    //#region GROUP DEFINICE
                    //var tabmanager = $("<div>")
                    //    .appendTo(that.element)
                    //    .gtabmanager({
                    //        groups: [
                    //            //{
                    //            //    id: "groupVyberVypoctu",
                    //            //    caption: "Caption1",
                    //            //},
                    //            {
                    //                id: "groupDenniSazba",
                    //                caption: "Caption2",
                    //            },
                    //            {
                    //                id: "groupPomerRocniSazby",
                    //                caption: "Caption3",
                    //            },
                    //            {
                    //                id: "groupPomerRocniSazbyZjednodusen",
                    //                caption: "Caption4",
                    //            },
                    //            {
                    //                id: "groupProcentoCastky",
                    //                caption: "Caption5",
                    //            }
                    //        ],
                    //        scopeElement: that.element
                    //    });
                    //let groupVyberVypoctu = $("<div>").appendTo(that.element)
                    //    .ggroupable({
                    //        group: { id: "groupVyberVypoctu" },
                    //        conceal: function (ev, ctx) {
                    //            if (ctx.conceal) groupVyberVypoctu.addClass("concealed"); else groupVyberVypoctu.removeClass("concealed");
                    //        }
                    //    });
                    //let groupDenniSazba = $("<div>").appendTo(that.element)
                    //    .ggroupable({
                    //        group: { id: "groupDenniSazba" },
                    //        conceal: function (ev, ctx) {
                    //            if (ctx.conceal) groupDenniSazba.addClass("concealed"); else groupDenniSazba.removeClass("concealed");
                    //        }
                    //    });
                    //let groupPomerRocniSazby = $("<div>").appendTo(that.element)
                    //    .ggroupable({
                    //        group: { id: "groupPomerRocniSazby" },
                    //        conceal: function (ev, ctx) {
                    //            if (ctx.conceal) groupPomerRocniSazby.addClass("concealed"); else groupPomerRocniSazby.removeClass("concealed");
                    //        }
                    //    });
                    //let groupPomerRocniSazbyZjednodusen = $("<div>").appendTo(that.element)
                    //    .ggroupable({
                    //        group: { id: "groupPomerRocniSazbyZjednodusen" },
                    //        conceal: function (ev, ctx) {
                    //            if (ctx.conceal) groupPomerRocniSazbyZjednodusen.addClass("concealed"); else groupPomerRocniSazbyZjednodusen.removeClass("concealed");
                    //        }
                    //    });
                    //let groupProcentoCastky = $("<div>").appendTo(that.element)
                    //    .ggroupable({
                    //        group: { id: "groupProcentoCastky" },
                    //        conceal: function (ev, ctx) {
                    //            if (ctx.conceal) groupProcentoCastky.addClass("concealed"); else groupProcentoCastky.removeClass("concealed");
                    //        }
                    //    });
                    //
                    //var tab1 = new Gordic.Forms.Form({ name: "nameOfTab1", layoutDescriptor: "L2M2S1" })
                    //$("<div>").appendTo(groupVyberVypoctu).gform("createFrom", tab1);
                    //
                    //#endregion
                    //#region ZÁKLADNÍ FORM
                    var tab1 = new Gordic.Forms.Form({ name: "vypocetPredpisu", layoutDescriptor: "L1M1S1" })
                        //var tab1 = new Gordic.Forms.Form({ name: "form1" })
                        .addSection()
                        .addRow()
                        .addField("gradio", {
                        name: "vypocet",
                        itemClass: "w-6",
                        initialValue: 0,
                        radios: [
                            { value: 0, label: 'Denní sazba' },
                            { value: 1, label: 'Poměrná částka roční sazby' },
                            { value: 3, label: 'Poměr roční sazby - zjednodušené' },
                            { value: 2, label: 'Procento z částky' }
                        ],
                        change: function (ev, input) {
                            that.refreshVypocet();
                        }
                    })
                        .addSection()
                        .addRow("Zaokrouhlení předpisu")
                        .addField("gradio", {
                        name: "zaokrouhleni",
                        itemClass: "w-4",
                        initialValue: 0,
                        radios: [
                            { value: 0, label: "Bez zaokrouhlení" },
                            { value: 1, label: "1 desetinné místo" },
                            { value: 2, label: "Na celé koruny" }
                        ], change: function (ev, input) {
                            that.refreshZaokrouhleni();
                        }
                    })
                        .addRow()
                        .addText("Výše předpisu", "w-6")
                        .addText("Částka předpisu", "w-6")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), { name: "vyse_predpisu", disabled: true, redNegative: true, change: (ev, input) => { that.refreshZaokrouhleni(); } })
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), { name: "castka_predpisu", disabled: true, redNegative: true, hideZeroDecimalsEdit: true });
                    //$("<div>").appendTo(groupVyberVypoctu).gform("createFrom", tab1);
                    this.mainForm = $("<div>").appendTo(this.element).gform("createFrom", tab1);
                    //#endregion
                    //#region DENNÍ SAZBA
                    var tab2 = new Gordic.Forms.Form({ name: "form2" })
                        //.addSection("Denní sazba")
                        .addRow()
                        .addText("Datum od", "w-6")
                        .addText("Datum do", "w-6")
                        .addField("gdatebox", "w-6", {
                        name: "dat_od", disabled: true, change: (ev, input) => { that.refreshPocetDni(); }
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_do", disabled: true, change: (ev, input) => { that.refreshPocetDni(); }
                    })
                        .addRow("Počet dní").addField("gnumberbox", { name: "pocet_dni", disabled: true })
                        .addRow("Částka").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "castka", disabled: true, redNegative: true })
                        .addRow()
                        .addText("Denní sazba(procento)", "w-6")
                        .addText("Roční sazba(procento)", "w-6")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.decimal(2, true), {
                        name: "den_sazba", disabled: true, redNegative: true, change: function (ev, input) {
                            that.refreshSazba();
                            that.refreshDenniSazba();
                            that.refreshZaokrouhleni();
                        }
                    })
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.decimal(2, true), {
                        name: "roc_sazba", disabled: true, redNegative: true, change: function (ev, input) {
                            that.refreshSazba();
                            that.refreshDenniSazba();
                            that.refreshZaokrouhleni();
                        }
                    })
                        .addRow().addField("gradio", {
                        name: "rok_bezny_bankovni",
                        itemClass: "w-6",
                        radios: [
                            { value: 365, label: "Rok běžný" },
                            { value: 360, label: "Rok bankovní(360 dní)" }
                        ], disabled: true, initialValue: 365, change: (ev, input) => { that.refreshDenniSazba(); that.refreshZaokrouhleni(); }
                    });
                    //$("<div>").appendTo(groupDenniSazba).gform("createFrom", tab2);
                    this.mainForm = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        title: "Denní sazba",
                        opened: false,
                    })
                        .gform("createFrom", tab2);
                    //#endregion
                    //#region POMĚRNÁ ČÁSTKA ROČNÍ SAZBY
                    var tab3 = new Gordic.Forms.Form({ name: "form3" })
                        //.addSection("Poměrná částka roční sazby")
                        .addRow("Pro rok").addField("gnumberbox", { name: "rok", disabled: true, initialValue: this.rok }) //format: "yyyy"
                        .addRow()
                        .addText("Platnost přip. od", "w-6")
                        .addText("Platnost přip. do", "w-6")
                        .addField("gdatebox", "w-6", { name: "platnost_od", disabled: true, initialValue: this.ip_dat_od, change: (ev, input) => { that.resfreshPomCastkaRocniSazby(); that.refreshZaokrouhleni(); } })
                        .addField("gdatebox", "w-6", { name: "platnost_do", disabled: true, initialValue: this.ip_dat_do, change: (ev, input) => { that.resfreshPomCastkaRocniSazby(); that.refreshZaokrouhleni(); } })
                        .addRow()
                        .addField("gcheck", "w-6", { name: "prvni_mesic_den", initialValue: true, label: "Započítat první měsíc/den", disabled: true, change: (ev, input) => { that.resfreshPomCastkaRocniSazby(); that.refreshZaokrouhleni(); } })
                        .addField("gcheck", "w-6", { name: "posledni_mesic_den", initialValue: false, label: "Započítat poslední měsíc/den", disabled: true, change: (ev, input) => { that.resfreshPomCastkaRocniSazby(); that.refreshZaokrouhleni(); } })
                        .addRow()
                        .addText("Počet dní", "w-6")
                        .addText("Výše řoč. předp.", "w-6")
                        .addField("gnumberbox", "w-6", { name: "poc_dni", disabled: true })
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), { name: "vyse_roc_predpisu", disabled: true, redNegative: true, change: (ev, input) => { that.resfreshPomCastkaRocniSazby(); that.refreshZaokrouhleni(); } })
                        .addRow()
                        .addText("Poměrná část", "w-6")
                        .addText("Již předepsáno", "w-6")
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), { name: "pomerna_cast", redNegative: true, disabled: true })
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), { name: "predepsano", disabled: true, redNegative: true, change: (ev, input) => { that.resfreshPomCastkaRocniSazby(); that.refreshZaokrouhleni(); } })
                        .addRow().addField("gradio", {
                        name: "pocitat_den_mesic",
                        itemClass: "w-6",
                        radios: [
                            { value: 0, label: "Počítat po dnech" },
                            { value: 1, label: "Počítat po měsíci" }
                        ], disabled: true, initialValue: 0, change: (ev, input) => { that.resfreshPomCastkaRocniSazby(); }
                    });
                    //$("<div>").appendTo(groupPomerRocniSazby).gform("createFrom", tab3);
                    this.mainForm = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        title: "Poměrná částka roční sazby",
                        opened: false,
                    })
                        .gform("createFrom", tab3);
                    //#endregion
                    //#region POMĚR ROČNÍ SAZBY ZJEDNODUŠENÉ
                    var tab4 = new Gordic.Forms.Form({ name: "form4" })
                        //.addSection("Poměr roční sazby - zjednodušené")
                        .addRow("Roční sazba").addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "rocni_sazba", disabled: true, redNegative: true, change: function (ev, input) {
                            that.refreshPomerRozniSazbyZjed();
                            that.refreshZaokrouhleni();
                        }
                    })
                        .addRow("Počet měsíců").addField("gnumberbox", {
                        name: "poc_mesicu", disabled: true, redNegative: true, change: function (ev, input) {
                            that.refreshPomerRozniSazbyZjed();
                            that.refreshZaokrouhleni();
                        }
                    });
                    //$("<div>").appendTo(groupPomerRocniSazbyZjednodusen).gform("createFrom", tab4);
                    this.mainForm = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        title: "Poměr roční sazby - zjednodušené",
                        opened: false,
                    })
                        .gform("createFrom", tab4);
                    //#endregion
                    //#region PROCENTO Z ČÁSTKY
                    var tab5 = new Gordic.Forms.Form({ name: "form5" })
                        //.addSection("Procento z částky")
                        .addRow("Částka").addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "castka_p", disabled: true, redNegative: true, change: function (ev, input) {
                            that.refreshProcentoZCastky();
                            that.refreshZaokrouhleni();
                        }
                    })
                        .addRow("Procento").addField("gnumberbox", Gordic.Prefabs.Number.decimal(2, true), {
                        name: "procento", disabled: true, redNegative: true, change: function (ev, input) {
                            that.refreshProcentoZCastky();
                            that.refreshZaokrouhleni();
                        }
                    });
                    //$("<div>").appendTo(groupProcentoCastky).gform("createFrom", tab5);
                    this.mainForm = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        title: "Procento z částky",
                        opened: false,
                    })
                        .gform("createFrom", tab5);
                    //#endregion
                }
                /** Zaktivnění výpočtu
                 */
                refreshVypocet() {
                    let form = this.findForms("vypocetPredpisu");
                    let form2 = this.findForms("form2");
                    let form3 = this.findForms("form3");
                    let form4 = this.findForms("form4");
                    let form5 = this.findForms("form5");
                    let vypocet = form.findFields("vypocet").gfield("getValue");
                    //změna výpočtu
                    if (vypocet == 0) { //{ value: 0, label: 'Denní sazba' }, -> form2:smar
                        //denní sazba
                        form2.findFields("dat_od", "dat_do", "castka", "den_sazba", "roc_sazba" /*, "rok_bezny_bankovni"*/).gfield("option", "disabled", false);
                        form2.gtab("show");
                        form2.gtab("open");
                        //poměrná částka roční sazby
                        form3.findFields("rok", "platnost_od", "platnost_do", "prvni_mesic_den", "posledni_mesic_den", "poc_dni", "vyse_roc_predpisu", "pomerna_cast", "predepsano", "pocitat_den_mesic")
                            .gfield("reset");
                        form3.findFields("rok", "platnost_od", "platnost_do", "prvni_mesic_den", "posledni_mesic_den" /*, "poc_dni"*/, "vyse_roc_predpisu", "pomerna_cast", "predepsano", "pocitat_den_mesic")
                            .gfield("option", "disabled", true);
                        form3.gtab("hide");
                        form3.gtab("close");
                        //procentno z částky
                        form5.findFields("castka_p", "procento").gfield("reset");
                        form5.findFields("castka_p", "procento").gfield("option", "disabled", true);
                        form5.gtab("hide");
                        form5.gtab("close");
                        //poměr roční sazby - zjednodušené
                        form4.findFields("rocni_sazba", "poc_mesicu").gfield("reset");
                        form4.findFields("rocni_sazba", "poc_mesicu").gfield("option", "disabled", true);
                        form4.gtab("hide");
                        form4.gtab("close");
                    }
                    if (vypocet == 1) { //{ value: 1, label: 'Poměrná částka roční sazby' }, -> form3
                        //denní sazba
                        form2.findFields("dat_od", "dat_do", "castka", "den_sazba", "roc_sazba", "rok_bezny_bankovni", "pocet_dni").gfield("reset");
                        form2.findFields("dat_od", "dat_do", "castka", "den_sazba", "roc_sazba" /*, "rok_bezny_bankovni"*/).gfield("option", "disabled", true);
                        form2.gtab("hide");
                        form2.gtab("close");
                        //poměrná částka roční sazby
                        form3.findFields("rok", "platnost_od", "platnost_do", "prvni_mesic_den", "posledni_mesic_den" /*, "poc_dni"*/, "vyse_roc_predpisu", "pomerna_cast", "predepsano", "pocitat_den_mesic")
                            .gfield("option", "disabled", false);
                        form3.gtab("show");
                        form3.gtab("open");
                        //procentno z částky
                        form5.findFields("castka_p", "procento").gfield("reset");
                        form5.findFields("castka_p", "procento").gfield("option", "disabled", true);
                        form5.gtab("hide");
                        form5.gtab("close");
                        //poměr roční sazby - zjednodušené
                        form4.findFields("rocni_sazba", "poc_mesicu").gfield("reset");
                        form4.findFields("rocni_sazba", "poc_mesicu").gfield("option", "disabled", true);
                        form4.gtab("hide");
                        form4.gtab("close");
                    }
                    if (vypocet == 2) { //{ value: 3, label: 'Poměr roční sazby - zjednodušené' }, -> form4
                        //denní sazba
                        form2.findFields("dat_od", "dat_do", "castka", "den_sazba", "roc_sazba", "rok_bezny_bankovni", "pocet_dni").gfield("reset");
                        form2.findFields("dat_od", "dat_do", "castka", "den_sazba", "roc_sazba" /*, "rok_bezny_bankovni"*/).gfield("option", "disabled", true);
                        form2.gtab("hide");
                        form2.gtab("close");
                        //poměrná částka roční sazby
                        form3.findFields("rok", "platnost_od", "platnost_do", "prvni_mesic_den", "posledni_mesic_den", "poc_dni", "vyse_roc_predpisu", "pomerna_cast", "predepsano", "pocitat_den_mesic")
                            .gfield("reset");
                        form3.findFields("rok", "platnost_od", "platnost_do", "prvni_mesic_den", "posledni_mesic_den" /*, "poc_dni"*/, "vyse_roc_predpisu", "pomerna_cast", "predepsano", "pocitat_den_mesic")
                            .gfield("option", "disabled", true);
                        form3.gtab("hide");
                        form3.gtab("close");
                        //procentno z částky
                        form5.findFields("castka_p", "procento").gfield("option", "disabled", false);
                        form5.gtab("show");
                        form5.gtab("open");
                        //poměr roční sazby - zjednodušené
                        form4.findFields("rocni_sazba", "poc_mesicu").gfield("reset");
                        form4.findFields("rocni_sazba", "poc_mesicu").gfield("option", "disabled", true);
                        form4.gtab("hide");
                        form4.gtab("close");
                    }
                    if (vypocet == 3) { //{ value: 2, label: 'Procento z částky' } -> form5
                        //denní sazba
                        form2.findFields("dat_od", "dat_do", "castka", "den_sazba", "roc_sazba", "rok_bezny_bankovni", "pocet_dni").gfield("reset");
                        form2.findFields("dat_od", "dat_do", "castka", "den_sazba", "roc_sazba" /*, "rok_bezny_bankovni"*/).gfield("option", "disabled", true);
                        form2.gtab("hide");
                        form2.gtab("close");
                        //poměrná částka roční sazby
                        form3.findFields("rok", "platnost_od", "platnost_do", "prvni_mesic_den", "posledni_mesic_den", "poc_dni", "vyse_roc_predpisu", "pomerna_cast", "predepsano", "pocitat_den_mesic")
                            .gfield("reset");
                        form3.findFields("rok", "platnost_od", "platnost_do", "prvni_mesic_den", "posledni_mesic_den", "poc_dni", "vyse_roc_predpisu", "pomerna_cast", "predepsano", "pocitat_den_mesic")
                            .gfield("option", "disabled", true);
                        form3.gtab("hide");
                        form3.gtab("close");
                        //procentno z částky
                        form5.findFields("castka_p", "procento").gfield("reset");
                        form5.findFields("castka_p", "procento").gfield("option", "disabled", true);
                        form5.gtab("hide");
                        form5.gtab("close");
                        //poměr roční sazby - zjednodušené
                        form4.findFields("rocni_sazba", "poc_mesicu").gfield("option", "disabled", false);
                        form4.gtab("show");
                        form4.gtab("open");
                    }
                }
                /** Výpočet počtu dní
                 */
                refreshPocetDni() {
                    //TODO: kontroly
                    //debugger;
                    let form = this.findForms("form2");
                    let dat_od = form.findFields("dat_od").gfield("getValue");
                    let dat_do = form.findFields("dat_do").gfield("getValue");
                    let pocet_dni;
                    let date1 = new Date(dat_od).getTime();
                    let date2 = new Date(dat_do).getTime();
                    if (dat_od == null || dat_od == undefined || dat_do == null || dat_do == undefined) {
                        pocet_dni = 0;
                        form.findFields("pocet_dni").gfield("setValue", pocet_dni);
                    }
                    else if (date1 === date2) {
                        pocet_dni = 1;
                        form.findFields("pocet_dni").gfield("setValue", pocet_dni);
                    }
                    else if (date1 < date2) {
                        pocet_dni = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
                        form.findFields("pocet_dni").gfield("setValue", pocet_dni);
                    }
                    else {
                        pocet_dni = 0;
                        form.findFields("pocet_dni").gfield("setValue", pocet_dni);
                        GDlg.error("Datum od a datum do se kříží!");
                    }
                }
                /** Zaokrouhlení na potřebné desetinné místa
                 */
                roundTo(n, digits) {
                    var negative = false;
                    if (digits === undefined) {
                        digits = 0;
                    }
                    if (n < 0) {
                        negative = true;
                        n = n * -1;
                    }
                    var multiplicator = Math.pow(10, digits);
                    n = parseFloat((n * multiplicator).toFixed(11));
                    n = (Math.round(n) / multiplicator).toFixed(digits);
                    if (negative) {
                        n = (n * -1).toFixed(digits);
                    }
                    return n;
                }
                /** Vypsaní částky po zvoleném způsobu zaokrouhlování
                 */
                refreshZaokrouhleni() {
                    let form = this.findForms("vypocetPredpisu");
                    let zaokrouhleni = form.findFields("zaokrouhleni").gfield("getValue");
                    let castka = form.findFields("vyse_predpisu").gfield("getValue");
                    if (zaokrouhleni == 0) {
                        form.findFields("castka_predpisu").gfield("setValue", castka);
                    }
                    else if (zaokrouhleni == 1) {
                        let castkaNew = this.roundTo(castka, 1);
                        form.findFields("castka_predpisu").gfield("setValue", castkaNew);
                    }
                    else if (zaokrouhleni == 2) {
                        let castkaNew = Math.round(castka);
                        form.findFields("castka_predpisu").gfield("setValue", castkaNew);
                    }
                }
                /** Výpočet procento z částky
                 */
                refreshProcentoZCastky() {
                    let form = this.findForms("vypocetPredpisu");
                    let form5 = this.findForms("form5");
                    let castka = form5.findFields("castka_p").gfield("getValue");
                    let procento = form5.findFields("procento").gfield("getValue");
                    let vyse_predpisu;
                    if (castka == 0 || castka == null || procento == 0 || procento == null) {
                        form.findFields("castka_predpisu").gfield("reset");
                    }
                    vyse_predpisu = (castka / 100) * procento;
                    form.findFields("vyse_predpisu").gfield("setValue", vyse_predpisu);
                }
                /** Výpočet poměr roční sazby - zjednodušený
                 */
                refreshPomerRozniSazbyZjed() {
                    let form = this.findForms("vypocetPredpisu");
                    let form4 = this.findForms("form4");
                    let rocni_sazba = form4.findFields("rocni_sazba").gfield("getValue");
                    let pocet_mesicu = form4.findFields("poc_mesicu").gfield("getValue");
                    let vyse_predpisu;
                    vyse_predpisu = (rocni_sazba / 12) * pocet_mesicu;
                    form.findFields("vyse_predpisu").gfield("setValue", vyse_predpisu);
                }
                /** Přepínání sazeb při výpočtu denní sazby
                 */
                refreshSazba() {
                    let form2 = this.findForms("form2");
                    let den_sazba = form2.findFields("den_sazba").gfield("getValue");
                    let roc_sazba = form2.findFields("roc_sazba").gfield("getValue");
                    if ((den_sazba == 0 || den_sazba == null) && roc_sazba > 0) {
                        form2.findFields("den_sazba").gfield("option", "disabled", true);
                        form2.findFields("roc_sazba").gfield("option", "disabled", false);
                        form2.findFields("rok_bezny_bankovni").gfield("option", "disabled", false);
                    }
                    if ((roc_sazba == 0 || roc_sazba == null) && den_sazba > 0) {
                        form2.findFields("den_sazba").gfield("option", "disabled", false);
                        form2.findFields("roc_sazba").gfield("option", "disabled", true);
                        form2.findFields("rok_bezny_bankovni").gfield("reset");
                        form2.findFields("rok_bezny_bankovni").gfield("option", "disabled", true);
                    }
                    if (den_sazba == 0 && roc_sazba == 0) {
                        form2.findFields("den_sazba").gfield("option", "disabled", false);
                        form2.findFields("roc_sazba").gfield("option", "disabled", false);
                        form2.findFields("rok_bezny_bankovni").gfield("reset");
                        form2.findFields("rok_bezny_bankovni").gfield("option", "disabled", true);
                    }
                }
                /** Výpočet denní sazby
                 */
                refreshDenniSazba() {
                    let form = this.findForms("vypocetPredpisu");
                    let form2 = this.findForms("form2");
                    var getPocetDni = form2.findFields("pocet_dni").gfield("getValue");
                    var getCastka = form2.findFields("castka").gfield("getValue");
                    var getProc = form2.findFields("roc_sazba").gfield("getValue");
                    var getProm = form2.findFields("den_sazba").gfield("getValue");
                    var getRok = form2.findFields("rok_bezny_bankovni").gfield("getValue");
                    let vyse_predpisu = 0;
                    if (getProc != 0) { //! PROCENTO
                        vyse_predpisu = getPocetDni * getCastka * getProc / getRok / 100;
                    }
                    else if (getProm != 0) {
                        vyse_predpisu = getPocetDni * getCastka * getProm / 100;
                    }
                    else {
                        vyse_predpisu = 0;
                    }
                    form.findFields("vyse_predpisu").gfield("setValue", vyse_predpisu);
                }
                /**Výpočet poměrné částky roční sazby
                 */
                resfreshPomCastkaRocniSazby() {
                    //debugger;
                    let form = this.findForms("vypocetPredpisu");
                    let form3 = this.findForms("form3");
                    let rok = form3.findFields("rok").gfield("getValue"); //new Date(form3.findFields("rok").gfield("getValue")).getFullYear();
                    let dat_od = form3.findFields("platnost_od").gfield("getValue");
                    let dat_do = form3.findFields("platnost_do").gfield("getValue");
                    let dat_od_ms = new Date(dat_od).getTime();
                    let dat_do_ms = new Date(dat_do).getTime();
                    let zapocitatPrvni = form3.findFields("prvni_mesic_den").gfield("getValue");
                    let zapocitatPosledni = form3.findFields("posledni_mesic_den").gfield("getValue");
                    let den_mesic = form3.findFields("pocitat_den_mesic").gfield("getValue");
                    let castka = form3.findFields("vyse_roc_predpisu").gfield("getValue");
                    let predepsano = form3.findFields("predepsano").gfield("getValue");
                    let pocet_dni;
                    let vyse_predpisu;
                    let prvni_mesic;
                    let posl_mesic;
                    //pokud je datum prazdné nebo neodpovídá zadanému roku, zadej začátek a konec roku
                    if (dat_od == null || (new Date(dat_od).getFullYear() != rok)) {
                        //dat_od = new Date(rok, 1, 1, 0, 0, 0); //uprava nastavení defaultního datumu (mněsíc zkouším počíádat od 0)
                        dat_od = new Date(rok, 0, 1, 0, 0, 0);
                    }
                    if (dat_do == null || (new Date(dat_od).getFullYear() != rok)) {
                        //dat_do = new Date(rok, 12, 31, 0, 0, 0);
                        dat_do = new Date(rok, 11, 31, 0, 0, 0);
                    }
                    //pokud se data nekříží
                    if (new Date(dat_od).getTime() <= new Date(dat_do).getTime()) {
                        //počet dní - mínus 1 protože mám checkbox na započítávání prvního dne
                        //pocet_dni = Math.round((dat_do_ms - dat_od_ms) / (1000 * 60 * 60 * 24)) - 1; 
                        pocet_dni = Math.round((dat_do.getTime() - dat_od.getTime()) / (1000 * 60 * 60 * 24)) - 1; //změna datumů která se počítají, osobně netuším proč tu je totot datum...
                        if (pocet_dni < 0)
                            pocet_dni = 0;
                        if (zapocitatPrvni)
                            pocet_dni += 1;
                        if (zapocitatPosledni)
                            pocet_dni += 1;
                        if (zapocitatPrvni && zapocitatPosledni && (new Date(dat_od).getTime() === new Date(dat_do).getTime()))
                            pocet_dni = 1;
                        form3.findFields("poc_dni").gfield("setValue", pocet_dni);
                        //počítat po měsících (1)
                        if (den_mesic) {
                            if (dat_od == null || (new Date(dat_od).getFullYear() != rok))
                                prvni_mesic = 1;
                            else
                                prvni_mesic = new Date(dat_od).getMonth() + 1;
                            if (dat_do == null || (new Date(dat_do).getFullYear() != rok))
                                posl_mesic = 12;
                            else
                                posl_mesic = new Date(dat_do).getMonth() - 1;
                            let pocet = posl_mesic - prvni_mesic + 1;
                            if (pocet < 0)
                                pocet = 0;
                            if (zapocitatPrvni && dat_od != null && (new Date(dat_od).getFullYear() == rok))
                                pocet += 1;
                            if (zapocitatPosledni && dat_do != null && (new Date(dat_do).getFullYear() == rok))
                                pocet += 1;
                            if (new Date(dat_od).getMonth() == new Date(dat_do).getMonth() && pocet > 1)
                                pocet = 1;
                            vyse_predpisu = (castka * pocet) / 12;
                            form3.findFields("pomerna_cast").gfield("setValue", Math.round(vyse_predpisu * 100) / 100);
                            vyse_predpisu = (Math.round(vyse_predpisu * 100) / 100) - predepsano;
                            form.findFields("vyse_predpisu").gfield("setValue", vyse_predpisu);
                        }
                        else { //počítat po dnech (0)                                             počet dní v roce?
                            vyse_predpisu = ((pocet_dni) * castka) / (Math.round((new Date(rok, 12, 31, 0, 0, 0).getTime() - new Date(rok, 1, 1, 0, 0, 0).getTime()) / (1000 * 60 * 60 * 24)) + 1);
                            form3.findFields("pomerna_cast").gfield("setValue", Math.round(vyse_predpisu * 100) / 100);
                            vyse_predpisu = (Math.round(vyse_predpisu * 100) / 100) - predepsano;
                            form.findFields("vyse_predpisu").gfield("setValue", vyse_predpisu);
                        }
                    }
                    else {
                        pocet_dni = 0;
                        form3.findFields("poc_dni").gfield("setValue", pocet_dni);
                        GDlg.error("Datum platnosti od a datum platnosti do se kříží!");
                    }
                }
                //#region DOSAVE
                /*
                private doSave(def: JQuery.Deferred<any, any, any>) {
                    let zmenyForm = this.mainForm.gform("hasChanged");
                    let defSkupinaVymahani = $.Deferred();
        
                    if (zmenyForm) {
                        if (!this.mainForm.gform("isValid")) {
                            defSkupinaVymahani.reject();
                            def.reject();
                            return;
                        }
        
                        let dto: Gordic.Ddp.Interface.LK.Isl.GCiselnikCtvrtiDto = $.extend({}, this.data);
                        this.mainForm.findFields().gfield("model", "collect", dto);
        
                        let req = rq => {
                            return {
                                rq: { Data: dto }
                            };
                        };
                        let task = this.editMode ? Isl.SkupinaVymahani.update(req) : Isl.SkupinaVymahani.create(req);
                        Ddp.WebClient.Common.Base.ProcessResponse(task.get(), this, false)
                            .done((resp: any) => {
                                if (resp.Messages == null || resp.Messages.length === 0) {
                                    this.editMode = true;
                                    this.data = resp.data;
                                    this.ixs_skv = resp.data.ixs_skv;
                                    this.mainForm.findFields().gfield("model", "apply", resp.data, { initialValues: true });
                                    defSkupinaVymahani.resolve();
                                }
                                else {
                                    defSkupinaVymahani.reject();
                                }
                            })
                            .fail(() => {
                                defSkupinaVymahani.reject();
                            });
                    }
                    else
                        defSkupinaVymahani.resolve();
        
                    defSkupinaVymahani.then(
                        () => {
                            let defTypyPohledavek = $.Deferred();
                            if (this.changedTypyPohledavek)
                                this.saveNavazaneTypyPohledavek()
                                    .done(() => {
                                        defTypyPohledavek.resolve();
                                    })
                                    .fail(() => {
                                        defTypyPohledavek.reject();
                                    });
                            else
                                defTypyPohledavek.resolve();
        
                            defTypyPohledavek.then(
                                () => {
                                    def.resolve();
                                },
                                () => {
                                    this.dialogs.error("Chyba", "Chyba při ukládání navázaných typů pohledávek.");
                                    def.reject();
                                });
                        },
                        () => {
                            def.reject();
                        });
                }
                */
                //#endregion
                //#region SAVE
                /*
                private save(ask: boolean = false) {
                    let def = $.Deferred();
        
                    let zmenyForm = this.mainForm.gform("hasChanged");
                    //let zmeny = this.changedTypyPohledavek || zmenyForm;
        
                    if (zmeny && ask) {
                        this.dialogs.confirm("Uložit", "Chcete uložit změny?")
                            .on("close", (ev, retVal) => {
                                if (retVal === "yes") {
                                    this.doSave(def);
                                }
                                else
                                    def.resolve();
                            });
                    }
                    else if (zmeny)
                        this.doSave(def);
                    else
                        def.resolve();
        
                    return def.promise();
                }
                */
                //#endregion
                //#region CLOSING
                //closing() {
                //    //if (this.readOnly)
                //        return;
                //    //else
                //        //return this.save(true);
                //}
                //#endregion
                //#region CANCEL
                cancel() {
                    this.close();
                }
                //#endregion
                //#region OK       
                ok() {
                    let form = this.findForms("vypocetPredpisu");
                    //debugger;
                    //let dto/*: Gordic.Ddp.Interface.LK.Isl.GDetailRozPripaduDto = this.model*/;
                    //this.element.findForms("detailRozhodnuti").findFields().gfield("model", "collect", dto);
                    //let req = rq => {
                    //    return {
                    //        rq: { Data: dto }
                    //    };
                    //};
                    //let task/* = that.isl.DetailRozPripadu.ulozRozhodnuti(req)*/;
                    //Common.Base.ProcessResponse(task.get(), this, true);
                    //if (!this.readOnly && !this.editMode) {
                    //    let f = this.formSkupinaVymahani.findFields("ixs_skv");
                    //    f.gfield("setInitial", null);
                    //    f.gfield("model", "apply", { ixs_skv: this.ixs_skv }, { initialValues: false });
                    //}
                    //this.save()
                    //    .done(() => {
                    //        this.close();
                    //    });
                    var smt = form.findFields("castka_predpisu").gfield("getValue");
                    this.close(smt);
                }
            };
            GVypocetPredpisu = __decorate([
                Decorators.gcontent
            ], GVypocetPredpisu);
            WebClient.GVypocetPredpisu = GVypocetPredpisu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5cG9jZXRQcmVkcGlzdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdWeXBvY2V0UHJlZHBpc3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUVqQixJQUFVLE1BQU0sQ0FrdUJmO0FBbHVCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrdUJuQjtJQWx1QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWt1QjdCO1FBbHVCb0IsV0FBQSxTQUFTO1lBRTFCLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQVc5QyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsd0JBQXdCO29CQUN4Qiw2QkFBNkI7b0JBQzdCLDZCQUE2QjtvQkFDN0Isb0JBQW9CO29CQUNwQixtQkFBbUI7b0JBQ25CLGlCQUFpQjtvQkFDakIsNENBQTRDO29CQUM1Qyx3Q0FBd0M7b0JBQ3hDLGtCQUFrQjtvQkFDbEIsZUFBZTtvQkFDZix3Q0FBd0M7b0JBQ3hDLHNDQUFzQztvQkFDdEMsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLDZDQUE2QztvQkFDN0Msc0NBQXNDO29CQUN0QyxnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2Ysd0RBQXdEO29CQUN4RCxzQ0FBc0M7b0JBQ3RDLGdCQUFnQjtvQkFDaEIsZUFBZTtvQkFDZiw0Q0FBNEM7b0JBQzVDLHNDQUFzQztvQkFDdEMsZUFBZTtvQkFDZixZQUFZO29CQUNaLG9DQUFvQztvQkFDcEMsU0FBUztvQkFDVCwyREFBMkQ7b0JBQzNELG1CQUFtQjtvQkFDbkIsNkNBQTZDO29CQUM3Qyx1Q0FBdUM7b0JBQ3ZDLHdIQUF3SDtvQkFDeEgsV0FBVztvQkFDWCxTQUFTO29CQUNULHlE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R0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBa3VCbkI7QUFBRCxDQUFDLEVBbHVCUyxNQUFNLEtBQU4sTUFBTSxRQWt1QmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5cG9jZXRQcmVkcGlzdS50cyAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gcHJvIHbDvXBvxI1ldCBwxZllZHBpc3UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjItMTEtMjggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdWeXBvY2V0UHJlZHBpc3UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8vcHJpdmF0ZSBSYWRla191aHI7XHJcbiAgICAgICAgcHJpdmF0ZSBtYWluRm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBpcF9zYXpiYTogbnVtYmVyO1xyXG4gICAgICAgIGlwX3Z5c2U6IG51bWJlcjtcclxuICAgICAgICBpcF9wcmVkZXBzYW5vOiBudW1iZXI7XHJcbiAgICAgICAgaXBfZGF0X29kOiBEYXRlO1xyXG4gICAgICAgIGlwX2RhdF9kbzogRGF0ZTtcclxuICAgICAgICBpcF9yb2s6IG51bWJlcjtcclxuICAgICAgICByb2s6IG51bWJlcjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBHUk9VUCBERUZJTklDRVxyXG4gICAgICAgICAgICAvL3ZhciB0YWJtYW5hZ2VyID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgIC8vICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgIC8vICAgIC5ndGFibWFuYWdlcih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBncm91cHM6IFtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICBpZDogXCJncm91cFZ5YmVyVnlwb2N0dVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiQ2FwdGlvbjFcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpZDogXCJncm91cERlbm5pU2F6YmFcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJDYXB0aW9uMlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpZDogXCJncm91cFBvbWVyUm9jbmlTYXpieVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkNhcHRpb24zXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGlkOiBcImdyb3VwUG9tZXJSb2NuaVNhemJ5WmplZG5vZHVzZW5cIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJDYXB0aW9uNFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpZDogXCJncm91cFByb2NlbnRvQ2FzdGt5XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQ2FwdGlvbjVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICBdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgc2NvcGVFbGVtZW50OiB0aGF0LmVsZW1lbnRcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIC8vbGV0IGdyb3VwVnliZXJWeXBvY3R1ID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgLy8gICAgLmdncm91cGFibGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JvdXBWeWJlclZ5cG9jdHVcIiB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY29uY2VhbDogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoY3R4LmNvbmNlYWwpIGdyb3VwVnliZXJWeXBvY3R1LmFkZENsYXNzKFwiY29uY2VhbGVkXCIpOyBlbHNlIGdyb3VwVnliZXJWeXBvY3R1LnJlbW92ZUNsYXNzKFwiY29uY2VhbGVkXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy9sZXQgZ3JvdXBEZW5uaVNhemJhID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgLy8gICAgLmdncm91cGFibGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JvdXBEZW5uaVNhemJhXCIgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGNvbmNlYWw6IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKGN0eC5jb25jZWFsKSBncm91cERlbm5pU2F6YmEuYWRkQ2xhc3MoXCJjb25jZWFsZWRcIik7IGVsc2UgZ3JvdXBEZW5uaVNhemJhLnJlbW92ZUNsYXNzKFwiY29uY2VhbGVkXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy9sZXQgZ3JvdXBQb21lclJvY25pU2F6YnkgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KVxyXG4gICAgICAgICAgICAvLyAgICAuZ2dyb3VwYWJsZSh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBncm91cDogeyBpZDogXCJncm91cFBvbWVyUm9jbmlTYXpieVwiIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjb25jZWFsOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmIChjdHguY29uY2VhbCkgZ3JvdXBQb21lclJvY25pU2F6YnkuYWRkQ2xhc3MoXCJjb25jZWFsZWRcIik7IGVsc2UgZ3JvdXBQb21lclJvY25pU2F6YnkucmVtb3ZlQ2xhc3MoXCJjb25jZWFsZWRcIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL2xldCBncm91cFBvbWVyUm9jbmlTYXpieVpqZWRub2R1c2VuID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgLy8gICAgLmdncm91cGFibGUoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JvdXBQb21lclJvY25pU2F6YnlaamVkbm9kdXNlblwiIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjb25jZWFsOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmIChjdHguY29uY2VhbCkgZ3JvdXBQb21lclJvY25pU2F6YnlaamVkbm9kdXNlbi5hZGRDbGFzcyhcImNvbmNlYWxlZFwiKTsgZWxzZSBncm91cFBvbWVyUm9jbmlTYXpieVpqZWRub2R1c2VuLnJlbW92ZUNsYXNzKFwiY29uY2VhbGVkXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy9sZXQgZ3JvdXBQcm9jZW50b0Nhc3RreSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgIC8vICAgIC5nZ3JvdXBhYmxlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGdyb3VwOiB7IGlkOiBcImdyb3VwUHJvY2VudG9DYXN0a3lcIiB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY29uY2VhbDogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoY3R4LmNvbmNlYWwpIGdyb3VwUHJvY2VudG9DYXN0a3kuYWRkQ2xhc3MoXCJjb25jZWFsZWRcIik7IGVsc2UgZ3JvdXBQcm9jZW50b0Nhc3RreS5yZW1vdmVDbGFzcyhcImNvbmNlYWxlZFwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vdmFyIHRhYjEgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIm5hbWVPZlRhYjFcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9KVxyXG4gICAgICAgICAgICAvLyQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhncm91cFZ5YmVyVnlwb2N0dSkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRhYjEpO1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBaw4FLTEFETsONIEZPUk1cclxuICAgICAgICAgICAgdmFyIHRhYjEgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInZ5cG9jZXRQcmVkcGlzdVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAvL3ZhciB0YWIxID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eXBvY2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6ICdEZW5uw60gc2F6YmEnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiAnUG9txJtybsOhIMSNw6FzdGthIHJvxI1uw60gc2F6YnknIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDMsIGxhYmVsOiAnUG9txJtyIHJvxI1uw60gc2F6YnkgLSB6amVkbm9kdcWhZW7DqScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMiwgbGFiZWw6ICdQcm9jZW50byB6IMSNw6FzdGt5JyB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoVnlwb2NldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWmFva3JvdWhsZW7DrSBwxZllZHBpc3VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YW9rcm91aGxlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy00XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAwLCBsYWJlbDogXCJCZXogemFva3JvdWhsZW7DrVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiBcIjEgZGVzZXRpbm7DqSBtw61zdG9cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAyLCBsYWJlbDogXCJOYSBjZWzDqSBrb3J1bnlcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaFphb2tyb3VobGVuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiVsO9xaFlIHDFmWVkcGlzdVwiLCBcInctNlwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwixIzDoXN0a2EgcMWZZWRwaXN1XCIsIFwidy02XCIsKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcInZ5c2VfcHJlZHBpc3VcIiwgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLCBjaGFuZ2U6IChldiwgaW5wdXQpID0+IHsgdGhhdC5yZWZyZXNoWmFva3JvdWhsZW5pKCk7IH0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgbmFtZTogXCJjYXN0a2FfcHJlZHBpc3VcIiwgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLCBoaWRlWmVyb0RlY2ltYWxzRWRpdDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vJChcIjxkaXY+XCIpLmFwcGVuZFRvKGdyb3VwVnliZXJWeXBvY3R1KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGFiMSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGFiMSk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBERU5Ow40gU0FaQkFcclxuICAgICAgICAgICAgdmFyIHRhYjIgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm0yXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oXCJEZW5uw60gc2F6YmFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJEYXR1bSBvZFwiLCBcInctNlwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiRGF0dW0gZG9cIiwgXCJ3LTZcIiwpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfb2RcIiwgZGlzYWJsZWQ6IHRydWUsIGNoYW5nZTogKGV2LCBpbnB1dCkgPT4geyB0aGF0LnJlZnJlc2hQb2NldERuaSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2RvXCIsIGRpc2FibGVkOiB0cnVlLCBjaGFuZ2U6IChldiwgaW5wdXQpID0+IHsgdGhhdC5yZWZyZXNoUG9jZXREbmkoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb8SNZXQgZG7DrVwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcInBvY2V0X2RuaVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdGthXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcImNhc3RrYVwiLCBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJEZW5uw60gc2F6YmEocHJvY2VudG8pXCIsIFwidy02XCIsKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJSb8SNbsOtIHNhemJhKHByb2NlbnRvKVwiLCBcInctNlwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmRlY2ltYWwoMiwgdHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRlbl9zYXpiYVwiLCBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2hTYXpiYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2hEZW5uaVNhemJhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaFphb2tyb3VobGVuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5kZWNpbWFsKDIsIHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2Nfc2F6YmFcIiwgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoU2F6YmEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoRGVubmlTYXpiYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2haYW9rcm91aGxlbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva19iZXpueV9iYW5rb3ZuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTZcIixcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMzY1LCBsYWJlbDogXCJSb2sgYsSbxb5uw71cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAzNjAsIGxhYmVsOiBcIlJvayBiYW5rb3Zuw60oMzYwIGRuw60pXCIgfV0sIGRpc2FibGVkOiB0cnVlLCBpbml0aWFsVmFsdWU6IDM2NSwgY2hhbmdlOiAoZXYsIGlucHV0KSA9PiB7IHRoYXQucmVmcmVzaERlbm5pU2F6YmEoKTsgdGhhdC5yZWZyZXNoWmFva3JvdWhsZW5pKCk7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vJChcIjxkaXY+XCIpLmFwcGVuZFRvKGdyb3VwRGVubmlTYXpiYSkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRhYjIpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5Gb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlbm7DrSBzYXpiYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0YWIyKTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gUE9NxJpSTsOBIMSMw4FTVEtBIFJPxIxOw40gU0FaQllcclxuICAgICAgICAgICAgdmFyIHRhYjMgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm0zXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oXCJQb23Em3Juw6EgxI3DoXN0a2Egcm/EjW7DrSBzYXpieVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBybyByb2tcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJyb2tcIiwgZGlzYWJsZWQ6IHRydWUsIGluaXRpYWxWYWx1ZTogdGhpcy5yb2sgfSkgLy9mb3JtYXQ6IFwieXl5eVwiXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUGxhdG5vc3QgcMWZaXAuIG9kXCIsIFwidy02XCIsKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQbGF0bm9zdCBwxZlpcC4gZG9cIiwgXCJ3LTZcIiwpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7IG5hbWU6IFwicGxhdG5vc3Rfb2RcIiwgZGlzYWJsZWQ6IHRydWUsIGluaXRpYWxWYWx1ZTogdGhpcy5pcF9kYXRfb2QsIGNoYW5nZTogKGV2LCBpbnB1dCkgPT4geyB0aGF0LnJlc2ZyZXNoUG9tQ2FzdGthUm9jbmlTYXpieSgpOyB0aGF0LnJlZnJlc2haYW9rcm91aGxlbmkoKTsgfSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwgeyBuYW1lOiBcInBsYXRub3N0X2RvXCIsIGRpc2FibGVkOiB0cnVlLCBpbml0aWFsVmFsdWU6IHRoaXMuaXBfZGF0X2RvLCBjaGFuZ2U6IChldiwgaW5wdXQpID0+IHsgdGhhdC5yZXNmcmVzaFBvbUNhc3RrYVJvY25pU2F6YnkoKTsgdGhhdC5yZWZyZXNoWmFva3JvdWhsZW5pKCk7IH0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHsgbmFtZTogXCJwcnZuaV9tZXNpY19kZW5cIiwgaW5pdGlhbFZhbHVlOiB0cnVlLCBsYWJlbDogXCJaYXBvxI3DrXRhdCBwcnZuw60gbcSbc8OtYy9kZW5cIiwgZGlzYWJsZWQ6IHRydWUsIGNoYW5nZTogKGV2LCBpbnB1dCkgPT4geyB0aGF0LnJlc2ZyZXNoUG9tQ2FzdGthUm9jbmlTYXpieSgpOyB0aGF0LnJlZnJlc2haYW9rcm91aGxlbmkoKTsgfSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHsgbmFtZTogXCJwb3NsZWRuaV9tZXNpY19kZW5cIiwgaW5pdGlhbFZhbHVlOiBmYWxzZSwgbGFiZWw6IFwiWmFwb8SNw610YXQgcG9zbGVkbsOtIG3Em3PDrWMvZGVuXCIsIGRpc2FibGVkOiB0cnVlLCBjaGFuZ2U6IChldiwgaW5wdXQpID0+IHsgdGhhdC5yZXNmcmVzaFBvbUNhc3RrYVJvY25pU2F6YnkoKTsgdGhhdC5yZWZyZXNoWmFva3JvdWhsZW5pKCk7IH0gfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiUG/EjWV0IGRuw61cIiwgXCJ3LTZcIiwpXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dChcIlbDvcWhZSDFmW/EjS4gcMWZZWRwLlwiLCBcInctNlwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgeyBuYW1lOiBcInBvY19kbmlcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgbmFtZTogXCJ2eXNlX3JvY19wcmVkcGlzdVwiLCBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsIGNoYW5nZTogKGV2LCBpbnB1dCkgPT4geyB0aGF0LnJlc2ZyZXNoUG9tQ2FzdGthUm9jbmlTYXpieSgpOyB0aGF0LnJlZnJlc2haYW9rcm91aGxlbmkoKTsgfSB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQb23Em3Juw6EgxI3DoXN0XCIsIFwidy02XCIsKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJKacW+IHDFmWVkZXBzw6Fub1wiLCBcInctNlwiLClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgbmFtZTogXCJwb21lcm5hX2Nhc3RcIiwgcmVkTmVnYXRpdmU6IHRydWUsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IG5hbWU6IFwicHJlZGVwc2Fub1wiLCBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsIGNoYW5nZTogKGV2LCBpbnB1dCkgPT4geyB0aGF0LnJlc2ZyZXNoUG9tQ2FzdGthUm9jbmlTYXpieSgpOyB0aGF0LnJlZnJlc2haYW9rcm91aGxlbmkoKTsgfSB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NpdGF0X2Rlbl9tZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTZcIixcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6IFwiUG/EjcOtdGF0IHBvIGRuZWNoXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6IFwiUG/EjcOtdGF0IHBvIG3Em3PDrWNpXCIgfV0sIGRpc2FibGVkOiB0cnVlLCBpbml0aWFsVmFsdWU6IDAsIGNoYW5nZTogKGV2LCBpbnB1dCkgPT4geyB0aGF0LnJlc2ZyZXNoUG9tQ2FzdGthUm9jbmlTYXpieSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhncm91cFBvbWVyUm9jbmlTYXpieSkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRhYjMpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5Gb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBvbcSbcm7DoSDEjcOhc3RrYSByb8SNbsOtIHNhemJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRhYjMpO1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBQT03EmlIgUk/EjE7DjSBTQVpCWSBaSkVETk9EVcWgRU7DiVxyXG4gICAgICAgICAgICB2YXIgdGFiNCA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybTRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkU2VjdGlvbihcIlBvbcSbciByb8SNbsOtIHNhemJ5IC0gemplZG5vZHXFoWVuw6lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJSb8SNbsOtIHNhemJhXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9jbmlfc2F6YmFcIiwgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoUG9tZXJSb3puaVNhemJ5WmplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2haYW9rcm91aGxlbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvxI1ldCBtxJtzw61jxa9cIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvY19tZXNpY3VcIiwgZGlzYWJsZWQ6IHRydWUsIHJlZE5lZ2F0aXZlOiB0cnVlLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoUG9tZXJSb3puaVNhemJ5WmplZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2haYW9rcm91aGxlbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8kKFwiPGRpdj5cIikuYXBwZW5kVG8oZ3JvdXBQb21lclJvY25pU2F6YnlaamVkbm9kdXNlbikuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHRhYjQpO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5Gb3JtID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBvbcSbciByb8SNbsOtIHNhemJ5IC0gemplZG5vZHXFoWVuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGFiNCk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIFBST0NFTlRPIFogxIzDgVNUS1lcclxuICAgICAgICAgICAgdmFyIHRhYjUgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm01XCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oXCJQcm9jZW50byB6IMSNw6FzdGt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDoXN0a2FcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYXN0a2FfcFwiLCBkaXNhYmxlZDogdHJ1ZSwgcmVkTmVnYXRpdmU6IHRydWUsIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2hQcm9jZW50b1pDYXN0a3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoWmFva3JvdWhsZW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQcm9jZW50b1wiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmRlY2ltYWwoMiwgdHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByb2NlbnRvXCIsIGRpc2FibGVkOiB0cnVlLCByZWROZWdhdGl2ZTogdHJ1ZSwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaFByb2NlbnRvWkNhc3RreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2haYW9rcm91aGxlbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhncm91cFByb2NlbnRvQ2FzdGt5KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGFiNSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkZvcm0gPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUHJvY2VudG8geiDEjcOhc3RreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB0YWI1KTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFpha3Rpdm7Em27DrSB2w71wb8SNdHVcclxuICAgICAgICAgKi9cclxuICAgICAgICByZWZyZXNoVnlwb2NldCgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcInZ5cG9jZXRQcmVkcGlzdVwiKTtcclxuICAgICAgICAgICAgbGV0IGZvcm0yID0gdGhpcy5maW5kRm9ybXMoXCJmb3JtMlwiKTtcclxuICAgICAgICAgICAgbGV0IGZvcm0zID0gdGhpcy5maW5kRm9ybXMoXCJmb3JtM1wiKTtcclxuICAgICAgICAgICAgbGV0IGZvcm00ID0gdGhpcy5maW5kRm9ybXMoXCJmb3JtNFwiKTtcclxuICAgICAgICAgICAgbGV0IGZvcm01ID0gdGhpcy5maW5kRm9ybXMoXCJmb3JtNVwiKTtcclxuICAgICAgICAgICAgbGV0IHZ5cG9jZXQgPSBmb3JtLmZpbmRGaWVsZHMoXCJ2eXBvY2V0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vem3Em25hIHbDvXBvxI10dVxyXG4gICAgICAgICAgICBpZiAodnlwb2NldCA9PSAwKSB7IC8veyB2YWx1ZTogMCwgbGFiZWw6ICdEZW5uw60gc2F6YmEnIH0sIC0+IGZvcm0yOnNtYXJcclxuICAgICAgICAgICAgICAgIC8vZGVubsOtIHNhemJhXHJcbiAgICAgICAgICAgICAgICBmb3JtMi5maW5kRmllbGRzKFwiZGF0X29kXCIsIFwiZGF0X2RvXCIsIFwiY2FzdGthXCIsIFwiZGVuX3NhemJhXCIsIFwicm9jX3NhemJhXCIvKiwgXCJyb2tfYmV6bnlfYmFua292bmlcIiovKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtMi5ndGFiKFwic2hvd1wiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0yLmd0YWIoXCJvcGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9wb23Em3Juw6EgxI3DoXN0a2Egcm/EjW7DrSBzYXpieVxyXG4gICAgICAgICAgICAgICAgZm9ybTMuZmluZEZpZWxkcyhcInJva1wiLCBcInBsYXRub3N0X29kXCIsIFwicGxhdG5vc3RfZG9cIiwgXCJwcnZuaV9tZXNpY19kZW5cIiwgXCJwb3NsZWRuaV9tZXNpY19kZW5cIiwgXCJwb2NfZG5pXCIsIFwidnlzZV9yb2NfcHJlZHBpc3VcIiwgXCJwb21lcm5hX2Nhc3RcIiwgXCJwcmVkZXBzYW5vXCIsIFwicG9jaXRhdF9kZW5fbWVzaWNcIilcclxuICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtMy5maW5kRmllbGRzKFwicm9rXCIsIFwicGxhdG5vc3Rfb2RcIiwgXCJwbGF0bm9zdF9kb1wiLCBcInBydm5pX21lc2ljX2RlblwiLCBcInBvc2xlZG5pX21lc2ljX2RlblwiLyosIFwicG9jX2RuaVwiKi8sIFwidnlzZV9yb2NfcHJlZHBpc3VcIiwgXCJwb21lcm5hX2Nhc3RcIiwgXCJwcmVkZXBzYW5vXCIsIFwicG9jaXRhdF9kZW5fbWVzaWNcIilcclxuICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtMy5ndGFiKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0zLmd0YWIoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vcHJvY2VudG5vIHogxI3DoXN0a3lcclxuICAgICAgICAgICAgICAgIGZvcm01LmZpbmRGaWVsZHMoXCJjYXN0a2FfcFwiLCBcInByb2NlbnRvXCIpLmdmaWVsZChcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTUuZmluZEZpZWxkcyhcImNhc3RrYV9wXCIsIFwicHJvY2VudG9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtNS5ndGFiKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm01Lmd0YWIoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vcG9txJtyIHJvxI1uw60gc2F6YnkgLSB6amVkbm9kdcWhZW7DqVxyXG4gICAgICAgICAgICAgICAgZm9ybTQuZmluZEZpZWxkcyhcInJvY25pX3NhemJhXCIsIFwicG9jX21lc2ljdVwiKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm00LmZpbmRGaWVsZHMoXCJyb2NuaV9zYXpiYVwiLCBcInBvY19tZXNpY3VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtNC5ndGFiKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm00Lmd0YWIoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodnlwb2NldCA9PSAxKSB7IC8veyB2YWx1ZTogMSwgbGFiZWw6ICdQb23Em3Juw6EgxI3DoXN0a2Egcm/EjW7DrSBzYXpieScgfSwgLT4gZm9ybTNcclxuICAgICAgICAgICAgICAgIC8vZGVubsOtIHNhemJhXHJcbiAgICAgICAgICAgICAgICBmb3JtMi5maW5kRmllbGRzKFwiZGF0X29kXCIsIFwiZGF0X2RvXCIsIFwiY2FzdGthXCIsIFwiZGVuX3NhemJhXCIsIFwicm9jX3NhemJhXCIsIFwicm9rX2Jlem55X2Jhbmtvdm5pXCIsIFwicG9jZXRfZG5pXCIpLmdmaWVsZChcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTIuZmluZEZpZWxkcyhcImRhdF9vZFwiLCBcImRhdF9kb1wiLCBcImNhc3RrYVwiLCBcImRlbl9zYXpiYVwiLCBcInJvY19zYXpiYVwiLyosIFwicm9rX2Jlem55X2Jhbmtvdm5pXCIqLykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtMi5ndGFiKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0yLmd0YWIoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIC8vcG9txJtybsOhIMSNw6FzdGthIHJvxI1uw60gc2F6YnlcclxuICAgICAgICAgICAgICAgIGZvcm0zLmZpbmRGaWVsZHMoXCJyb2tcIiwgXCJwbGF0bm9zdF9vZFwiLCBcInBsYXRub3N0X2RvXCIsIFwicHJ2bmlfbWVzaWNfZGVuXCIsIFwicG9zbGVkbmlfbWVzaWNfZGVuXCIvKiwgXCJwb2NfZG5pXCIqLywgXCJ2eXNlX3JvY19wcmVkcGlzdVwiLCBcInBvbWVybmFfY2FzdFwiLCBcInByZWRlcHNhbm9cIiwgXCJwb2NpdGF0X2Rlbl9tZXNpY1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtMy5ndGFiKFwic2hvd1wiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0zLmd0YWIoXCJvcGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9wcm9jZW50bm8geiDEjcOhc3RreVxyXG4gICAgICAgICAgICAgICAgZm9ybTUuZmluZEZpZWxkcyhcImNhc3RrYV9wXCIsIFwicHJvY2VudG9cIikuZ2ZpZWxkKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtNS5maW5kRmllbGRzKFwiY2FzdGthX3BcIiwgXCJwcm9jZW50b1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZvcm01Lmd0YWIoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTUuZ3RhYihcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9wb23Em3Igcm/EjW7DrSBzYXpieSAtIHpqZWRub2R1xaFlbsOpXHJcbiAgICAgICAgICAgICAgICBmb3JtNC5maW5kRmllbGRzKFwicm9jbmlfc2F6YmFcIiwgXCJwb2NfbWVzaWN1XCIpLmdmaWVsZChcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTQuZmluZEZpZWxkcyhcInJvY25pX3NhemJhXCIsIFwicG9jX21lc2ljdVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZvcm00Lmd0YWIoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTQuZ3RhYihcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2eXBvY2V0ID09IDIpIHsgLy97IHZhbHVlOiAzLCBsYWJlbDogJ1BvbcSbciByb8SNbsOtIHNhemJ5IC0gemplZG5vZHXFoWVuw6knIH0sIC0+IGZvcm00XHJcbiAgICAgICAgICAgICAgICAvL2Rlbm7DrSBzYXpiYVxyXG4gICAgICAgICAgICAgICAgZm9ybTIuZmluZEZpZWxkcyhcImRhdF9vZFwiLCBcImRhdF9kb1wiLCBcImNhc3RrYVwiLCBcImRlbl9zYXpiYVwiLCBcInJvY19zYXpiYVwiLCBcInJva19iZXpueV9iYW5rb3ZuaVwiLCBcInBvY2V0X2RuaVwiKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0yLmZpbmRGaWVsZHMoXCJkYXRfb2RcIiwgXCJkYXRfZG9cIiwgXCJjYXN0a2FcIiwgXCJkZW5fc2F6YmFcIiwgXCJyb2Nfc2F6YmFcIi8qLCBcInJva19iZXpueV9iYW5rb3ZuaVwiKi8pLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTIuZ3RhYihcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtMi5ndGFiKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICAvL3BvbcSbcm7DoSDEjcOhc3RrYSByb8SNbsOtIHNhemJ5XHJcbiAgICAgICAgICAgICAgICBmb3JtMy5maW5kRmllbGRzKFwicm9rXCIsIFwicGxhdG5vc3Rfb2RcIiwgXCJwbGF0bm9zdF9kb1wiLCBcInBydm5pX21lc2ljX2RlblwiLCBcInBvc2xlZG5pX21lc2ljX2RlblwiLCBcInBvY19kbmlcIiwgXCJ2eXNlX3JvY19wcmVkcGlzdVwiLCBcInBvbWVybmFfY2FzdFwiLCBcInByZWRlcHNhbm9cIiwgXCJwb2NpdGF0X2Rlbl9tZXNpY1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0zLmZpbmRGaWVsZHMoXCJyb2tcIiwgXCJwbGF0bm9zdF9vZFwiLCBcInBsYXRub3N0X2RvXCIsIFwicHJ2bmlfbWVzaWNfZGVuXCIsIFwicG9zbGVkbmlfbWVzaWNfZGVuXCIvKiwgXCJwb2NfZG5pXCIqLywgXCJ2eXNlX3JvY19wcmVkcGlzdVwiLCBcInBvbWVybmFfY2FzdFwiLCBcInByZWRlcHNhbm9cIiwgXCJwb2NpdGF0X2Rlbl9tZXNpY1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZvcm0zLmd0YWIoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTMuZ3RhYihcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9wcm9jZW50bm8geiDEjcOhc3RreVxyXG4gICAgICAgICAgICAgICAgZm9ybTUuZmluZEZpZWxkcyhcImNhc3RrYV9wXCIsIFwicHJvY2VudG9cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTUuZ3RhYihcInNob3dcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtNS5ndGFiKFwib3BlblwiKTtcclxuICAgICAgICAgICAgICAgIC8vcG9txJtyIHJvxI1uw60gc2F6YnkgLSB6amVkbm9kdcWhZW7DqVxyXG4gICAgICAgICAgICAgICAgZm9ybTQuZmluZEZpZWxkcyhcInJvY25pX3NhemJhXCIsIFwicG9jX21lc2ljdVwiKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm00LmZpbmRGaWVsZHMoXCJyb2NuaV9zYXpiYVwiLCBcInBvY19tZXNpY3VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtNC5ndGFiKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm00Lmd0YWIoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodnlwb2NldCA9PSAzKSB7IC8veyB2YWx1ZTogMiwgbGFiZWw6ICdQcm9jZW50byB6IMSNw6FzdGt5JyB9IC0+IGZvcm01XHJcbiAgICAgICAgICAgICAgICAvL2Rlbm7DrSBzYXpiYVxyXG4gICAgICAgICAgICAgICAgZm9ybTIuZmluZEZpZWxkcyhcImRhdF9vZFwiLCBcImRhdF9kb1wiLCBcImNhc3RrYVwiLCBcImRlbl9zYXpiYVwiLCBcInJvY19zYXpiYVwiLCBcInJva19iZXpueV9iYW5rb3ZuaVwiLCBcInBvY2V0X2RuaVwiKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0yLmZpbmRGaWVsZHMoXCJkYXRfb2RcIiwgXCJkYXRfZG9cIiwgXCJjYXN0a2FcIiwgXCJkZW5fc2F6YmFcIiwgXCJyb2Nfc2F6YmFcIi8qLCBcInJva19iZXpueV9iYW5rb3ZuaVwiKi8pLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTIuZ3RhYihcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtMi5ndGFiKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICAvL3BvbcSbcm7DoSDEjcOhc3RrYSByb8SNbsOtIHNhemJ5XHJcbiAgICAgICAgICAgICAgICBmb3JtMy5maW5kRmllbGRzKFwicm9rXCIsIFwicGxhdG5vc3Rfb2RcIiwgXCJwbGF0bm9zdF9kb1wiLCBcInBydm5pX21lc2ljX2RlblwiLCBcInBvc2xlZG5pX21lc2ljX2RlblwiLCBcInBvY19kbmlcIiwgXCJ2eXNlX3JvY19wcmVkcGlzdVwiLCBcInBvbWVybmFfY2FzdFwiLCBcInByZWRlcHNhbm9cIiwgXCJwb2NpdGF0X2Rlbl9tZXNpY1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm0zLmZpbmRGaWVsZHMoXCJyb2tcIiwgXCJwbGF0bm9zdF9vZFwiLCBcInBsYXRub3N0X2RvXCIsIFwicHJ2bmlfbWVzaWNfZGVuXCIsIFwicG9zbGVkbmlfbWVzaWNfZGVuXCIsIFwicG9jX2RuaVwiLCBcInZ5c2Vfcm9jX3ByZWRwaXN1XCIsIFwicG9tZXJuYV9jYXN0XCIsIFwicHJlZGVwc2Fub1wiLCBcInBvY2l0YXRfZGVuX21lc2ljXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTMuZ3RhYihcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtMy5ndGFiKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICAvL3Byb2NlbnRubyB6IMSNw6FzdGt5XHJcbiAgICAgICAgICAgICAgICBmb3JtNS5maW5kRmllbGRzKFwiY2FzdGthX3BcIiwgXCJwcm9jZW50b1wiKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgIGZvcm01LmZpbmRGaWVsZHMoXCJjYXN0a2FfcFwiLCBcInByb2NlbnRvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTUuZ3RhYihcImhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtNS5ndGFiKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICAvL3BvbcSbciByb8SNbsOtIHNhemJ5IC0gemplZG5vZHXFoWVuw6lcclxuICAgICAgICAgICAgICAgIGZvcm00LmZpbmRGaWVsZHMoXCJyb2NuaV9zYXpiYVwiLCBcInBvY19tZXNpY3VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTQuZ3RhYihcInNob3dcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtNC5ndGFiKFwib3BlblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFbDvXBvxI1ldCBwb8SNdHUgZG7DrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlZnJlc2hQb2NldERuaSgpIHtcclxuICAgICAgICAgICAgLy9UT0RPOiBrb250cm9seVxyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IHRoaXMuZmluZEZvcm1zKFwiZm9ybTJcIik7XHJcbiAgICAgICAgICAgIGxldCBkYXRfb2QgPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfb2RcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBkYXRfZG8gPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfZG9cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBwb2NldF9kbmk7XHJcbiAgICAgICAgICAgIGxldCBkYXRlMSA9IG5ldyBEYXRlKGRhdF9vZCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBsZXQgZGF0ZTIgPSBuZXcgRGF0ZShkYXRfZG8pLmdldFRpbWUoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0X29kID09IG51bGwgfHwgZGF0X29kID09IHVuZGVmaW5lZCB8fCBkYXRfZG8gPT0gbnVsbCB8fCBkYXRfZG8gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBwb2NldF9kbmkgPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwicG9jZXRfZG5pXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHBvY2V0X2RuaSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZTEgPT09IGRhdGUyKSB7XHJcbiAgICAgICAgICAgICAgICBwb2NldF9kbmkgPSAxO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwicG9jZXRfZG5pXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHBvY2V0X2RuaSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZTEgPCBkYXRlMikge1xyXG4gICAgICAgICAgICAgICAgcG9jZXRfZG5pID0gTWF0aC5yb3VuZCgoZGF0ZTIgLSBkYXRlMSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwicG9jZXRfZG5pXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHBvY2V0X2RuaSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwb2NldF9kbmkgPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwicG9jZXRfZG5pXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHBvY2V0X2RuaSk7XHJcbiAgICAgICAgICAgICAgICBHRGxnLmVycm9yKFwiRGF0dW0gb2QgYSBkYXR1bSBkbyBzZSBrxZnDrcW+w60hXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFphb2tyb3VobGVuw60gbmEgcG90xZllYm7DqSBkZXNldGlubsOpIG3DrXN0YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJvdW5kVG8obiwgZGlnaXRzKSB7XHJcbiAgICAgICAgICAgIHZhciBuZWdhdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoZGlnaXRzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGRpZ2l0cyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG4gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBuID0gbiAqIC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBtdWx0aXBsaWNhdG9yID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XHJcbiAgICAgICAgICAgIG4gPSBwYXJzZUZsb2F0KChuICogbXVsdGlwbGljYXRvcikudG9GaXhlZCgxMSkpO1xyXG4gICAgICAgICAgICBuID0gKE1hdGgucm91bmQobikgLyBtdWx0aXBsaWNhdG9yKS50b0ZpeGVkKGRpZ2l0cyk7XHJcbiAgICAgICAgICAgIGlmIChuZWdhdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgbiA9IChuICogLTEpLnRvRml4ZWQoZGlnaXRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXBzYW7DrSDEjcOhc3RreSBwbyB6dm9sZW7DqW0genDFr3NvYnUgemFva3JvdWhsb3bDoW7DrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlZnJlc2haYW9rcm91aGxlbmkoKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gdGhpcy5maW5kRm9ybXMoXCJ2eXBvY2V0UHJlZHBpc3VcIik7XHJcbiAgICAgICAgICAgIGxldCB6YW9rcm91aGxlbmkgPSBmb3JtLmZpbmRGaWVsZHMoXCJ6YW9rcm91aGxlbmlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjYXN0a2EgPSBmb3JtLmZpbmRGaWVsZHMoXCJ2eXNlX3ByZWRwaXN1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHphb2tyb3VobGVuaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjYXN0a2FfcHJlZHBpc3VcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY2FzdGthKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh6YW9rcm91aGxlbmkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhc3RrYU5ldyA9IHRoaXMucm91bmRUbyhjYXN0a2EsIDEpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiY2FzdGthX3ByZWRwaXN1XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNhc3RrYU5ldyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoemFva3JvdWhsZW5pID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjYXN0a2FOZXcgPSBNYXRoLnJvdW5kKGNhc3RrYSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJjYXN0a2FfcHJlZHBpc3VcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgY2FzdGthTmV3KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFbDvXBvxI1ldCBwcm9jZW50byB6IMSNw6FzdGt5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVmcmVzaFByb2NlbnRvWkNhc3RreSgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcInZ5cG9jZXRQcmVkcGlzdVwiKTtcclxuICAgICAgICAgICAgbGV0IGZvcm01ID0gdGhpcy5maW5kRm9ybXMoXCJmb3JtNVwiKTtcclxuICAgICAgICAgICAgbGV0IGNhc3RrYSA9IGZvcm01LmZpbmRGaWVsZHMoXCJjYXN0a2FfcFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IHByb2NlbnRvID0gZm9ybTUuZmluZEZpZWxkcyhcInByb2NlbnRvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgdnlzZV9wcmVkcGlzdTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjYXN0a2EgPT0gMCB8fCBjYXN0a2EgPT0gbnVsbCB8fCBwcm9jZW50byA9PSAwIHx8IHByb2NlbnRvID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImNhc3RrYV9wcmVkcGlzdVwiKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdnlzZV9wcmVkcGlzdSA9IChjYXN0a2EgLyAxMDApICogcHJvY2VudG87XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInZ5c2VfcHJlZHBpc3VcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdnlzZV9wcmVkcGlzdSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVsO9cG/EjWV0IHBvbcSbciByb8SNbsOtIHNhemJ5IC0gemplZG5vZHXFoWVuw71cclxuICAgICAgICAgKi9cclxuICAgICAgICByZWZyZXNoUG9tZXJSb3puaVNhemJ5WmplZCgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSB0aGlzLmZpbmRGb3JtcyhcInZ5cG9jZXRQcmVkcGlzdVwiKTtcclxuICAgICAgICAgICAgbGV0IGZvcm00ID0gdGhpcy5maW5kRm9ybXMoXCJmb3JtNFwiKTtcclxuICAgICAgICAgICAgbGV0IHJvY25pX3NhemJhID0gZm9ybTQuZmluZEZpZWxkcyhcInJvY25pX3NhemJhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgcG9jZXRfbWVzaWN1ID0gZm9ybTQuZmluZEZpZWxkcyhcInBvY19tZXNpY3VcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCB2eXNlX3ByZWRwaXN1O1xyXG5cclxuICAgICAgICAgICAgdnlzZV9wcmVkcGlzdSA9IChyb2NuaV9zYXpiYSAvIDEyKSAqIHBvY2V0X21lc2ljdTtcclxuICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwidnlzZV9wcmVkcGlzdVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB2eXNlX3ByZWRwaXN1KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBQxZllcMOtbsOhbsOtIHNhemViIHDFmWkgdsO9cG/EjXR1IGRlbm7DrSBzYXpieVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlZnJlc2hTYXpiYSgpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm0yID0gdGhpcy5maW5kRm9ybXMoXCJmb3JtMlwiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkZW5fc2F6YmEgPSBmb3JtMi5maW5kRmllbGRzKFwiZGVuX3NhemJhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgcm9jX3NhemJhID0gZm9ybTIuZmluZEZpZWxkcyhcInJvY19zYXpiYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgoZGVuX3NhemJhID09IDAgfHwgZGVuX3NhemJhID09IG51bGwpICYmIHJvY19zYXpiYSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZvcm0yLmZpbmRGaWVsZHMoXCJkZW5fc2F6YmFcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtMi5maW5kRmllbGRzKFwicm9jX3NhemJhXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGZvcm0yLmZpbmRGaWVsZHMoXCJyb2tfYmV6bnlfYmFua292bmlcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgocm9jX3NhemJhID09IDAgfHwgcm9jX3NhemJhID09IG51bGwpICYmIGRlbl9zYXpiYSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZvcm0yLmZpbmRGaWVsZHMoXCJkZW5fc2F6YmFcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZm9ybTIuZmluZEZpZWxkcyhcInJvY19zYXpiYVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZvcm0yLmZpbmRGaWVsZHMoXCJyb2tfYmV6bnlfYmFua292bmlcIikuZ2ZpZWxkKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtMi5maW5kRmllbGRzKFwicm9rX2Jlem55X2Jhbmtvdm5pXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZW5fc2F6YmEgPT0gMCAmJiByb2Nfc2F6YmEgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybTIuZmluZEZpZWxkcyhcImRlbl9zYXpiYVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtMi5maW5kRmllbGRzKFwicm9jX3NhemJhXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGZvcm0yLmZpbmRGaWVsZHMoXCJyb2tfYmV6bnlfYmFua292bmlcIikuZ2ZpZWxkKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtMi5maW5kRmllbGRzKFwicm9rX2Jlem55X2Jhbmtvdm5pXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVsO9cG/EjWV0IGRlbm7DrSBzYXpieVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlZnJlc2hEZW5uaVNhemJhKCkge1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IHRoaXMuZmluZEZvcm1zKFwidnlwb2NldFByZWRwaXN1XCIpO1xyXG4gICAgICAgICAgICBsZXQgZm9ybTIgPSB0aGlzLmZpbmRGb3JtcyhcImZvcm0yXCIpO1xyXG4gICAgICAgICAgICB2YXIgZ2V0UG9jZXREbmk6IG51bWJlciA9IGZvcm0yLmZpbmRGaWVsZHMoXCJwb2NldF9kbmlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBnZXRDYXN0a2E6IG51bWJlciA9IGZvcm0yLmZpbmRGaWVsZHMoXCJjYXN0a2FcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBnZXRQcm9jID0gZm9ybTIuZmluZEZpZWxkcyhcInJvY19zYXpiYVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGdldFByb20gPSBmb3JtMi5maW5kRmllbGRzKFwiZGVuX3NhemJhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgZ2V0Um9rOiBudW1iZXIgPSBmb3JtMi5maW5kRmllbGRzKFwicm9rX2Jlem55X2Jhbmtvdm5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgdnlzZV9wcmVkcGlzdSA9IDA7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGdldFByb2MgIT0gMCkgeyAvLyEgUFJPQ0VOVE9cclxuICAgICAgICAgICAgICAgIHZ5c2VfcHJlZHBpc3UgPSBnZXRQb2NldERuaSAqIGdldENhc3RrYSAqIGdldFByb2MgLyBnZXRSb2sgLyAxMDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChnZXRQcm9tICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHZ5c2VfcHJlZHBpc3UgPSBnZXRQb2NldERuaSAqIGdldENhc3RrYSAqIGdldFByb20gLyAxMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2eXNlX3ByZWRwaXN1ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJ2eXNlX3ByZWRwaXN1XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHZ5c2VfcHJlZHBpc3UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqVsO9cG/EjWV0IHBvbcSbcm7DqSDEjcOhc3RreSByb8SNbsOtIHNhemJ5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVzZnJlc2hQb21DYXN0a2FSb2NuaVNhemJ5KCkge1xyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IHRoaXMuZmluZEZvcm1zKFwidnlwb2NldFByZWRwaXN1XCIpO1xyXG4gICAgICAgICAgICBsZXQgZm9ybTMgPSB0aGlzLmZpbmRGb3JtcyhcImZvcm0zXCIpO1xyXG4gICAgICAgICAgICBsZXQgcm9rID0gZm9ybTMuZmluZEZpZWxkcyhcInJva1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTsgLy9uZXcgRGF0ZShmb3JtMy5maW5kRmllbGRzKFwicm9rXCIpLmdmaWVsZChcImdldFZhbHVlXCIpKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICBsZXQgZGF0X29kID0gZm9ybTMuZmluZEZpZWxkcyhcInBsYXRub3N0X29kXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0X2RvID0gZm9ybTMuZmluZEZpZWxkcyhcInBsYXRub3N0X2RvXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0X29kX21zID0gbmV3IERhdGUoZGF0X29kKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIGxldCBkYXRfZG9fbXMgPSBuZXcgRGF0ZShkYXRfZG8pLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgbGV0IHphcG9jaXRhdFBydm5pID0gZm9ybTMuZmluZEZpZWxkcyhcInBydm5pX21lc2ljX2RlblwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IHphcG9jaXRhdFBvc2xlZG5pID0gZm9ybTMuZmluZEZpZWxkcyhcInBvc2xlZG5pX21lc2ljX2RlblwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGRlbl9tZXNpYyA9IGZvcm0zLmZpbmRGaWVsZHMoXCJwb2NpdGF0X2Rlbl9tZXNpY1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNhc3RrYTogbnVtYmVyID0gZm9ybTMuZmluZEZpZWxkcyhcInZ5c2Vfcm9jX3ByZWRwaXN1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgcHJlZGVwc2FubyA9IGZvcm0zLmZpbmRGaWVsZHMoXCJwcmVkZXBzYW5vXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgcG9jZXRfZG5pOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCB2eXNlX3ByZWRwaXN1OiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBwcnZuaV9tZXNpYzogbnVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgcG9zbF9tZXNpYzogbnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgLy9wb2t1ZCBqZSBkYXR1bSBwcmF6ZG7DqSBuZWJvIG5lb2Rwb3bDrWTDoSB6YWRhbsOpbXUgcm9rdSwgemFkZWogemHEjcOhdGVrIGEga29uZWMgcm9rdVxyXG4gICAgICAgICAgICBpZiAoZGF0X29kID09IG51bGwgfHwgKG5ldyBEYXRlKGRhdF9vZCkuZ2V0RnVsbFllYXIoKSAhPSByb2spKSB7XHJcbiAgICAgICAgICAgICAgICAvL2RhdF9vZCA9IG5ldyBEYXRlKHJvaywgMSwgMSwgMCwgMCwgMCk7IC8vdXByYXZhIG5hc3RhdmVuw60gZGVmYXVsdG7DrWhvIGRhdHVtdSAobW7Em3PDrWMgemtvdcWhw61tIHBvxI3DrcOhZGF0IG9kIDApXHJcbiAgICAgICAgICAgICAgICBkYXRfb2QgPSBuZXcgRGF0ZShyb2ssIDAsIDEsIDAsIDAsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRfZG8gPT0gbnVsbCB8fCAobmV3IERhdGUoZGF0X29kKS5nZXRGdWxsWWVhcigpICE9IHJvaykpIHtcclxuICAgICAgICAgICAgICAgIC8vZGF0X2RvID0gbmV3IERhdGUocm9rLCAxMiwgMzEsIDAsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgZGF0X2RvID0gbmV3IERhdGUocm9rLCAxMSwgMzEsIDAsIDAsIDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3Bva3VkIHNlIGRhdGEgbmVrxZnDrcW+w61cclxuICAgICAgICAgICAgaWYgKG5ldyBEYXRlKGRhdF9vZCkuZ2V0VGltZSgpIDw9IG5ldyBEYXRlKGRhdF9kbykuZ2V0VGltZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAvL3BvxI1ldCBkbsOtIC0gbcOtbnVzIDEgcHJvdG/FvmUgbcOhbSBjaGVja2JveCBuYSB6YXBvxI3DrXTDoXbDoW7DrSBwcnZuw61obyBkbmVcclxuICAgICAgICAgICAgICAgIC8vcG9jZXRfZG5pID0gTWF0aC5yb3VuZCgoZGF0X2RvX21zIC0gZGF0X29kX21zKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSkgLSAxOyBcclxuICAgICAgICAgICAgICAgIHBvY2V0X2RuaSA9IE1hdGgucm91bmQoKGRhdF9kby5nZXRUaW1lKCkgLSBkYXRfb2QuZ2V0VGltZSgpKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSkgLSAxOyAvL3ptxJtuYSBkYXR1bcWvIGt0ZXLDoSBzZSBwb8SNw610YWrDrSwgb3NvYm7EmyBuZXR1xaHDrW0gcHJvxI0gdHUgamUgdG90b3QgZGF0dW0uLi5cclxuICAgICAgICAgICAgICAgIGlmIChwb2NldF9kbmkgPCAwKSBwb2NldF9kbmkgPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHphcG9jaXRhdFBydm5pKSBwb2NldF9kbmkgKz0gMTtcclxuICAgICAgICAgICAgICAgIGlmICh6YXBvY2l0YXRQb3NsZWRuaSkgcG9jZXRfZG5pICs9IDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoemFwb2NpdGF0UHJ2bmkgJiYgemFwb2NpdGF0UG9zbGVkbmkgJiYgKG5ldyBEYXRlKGRhdF9vZCkuZ2V0VGltZSgpID09PSBuZXcgRGF0ZShkYXRfZG8pLmdldFRpbWUoKSkpIHBvY2V0X2RuaSA9IDE7XHJcbiAgICAgICAgICAgICAgICBmb3JtMy5maW5kRmllbGRzKFwicG9jX2RuaVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBwb2NldF9kbmkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcG/EjcOtdGF0IHBvIG3Em3PDrWPDrWNoICgxKVxyXG4gICAgICAgICAgICAgICAgaWYgKGRlbl9tZXNpYykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRfb2QgPT0gbnVsbCB8fCAobmV3IERhdGUoZGF0X29kKS5nZXRGdWxsWWVhcigpICE9IHJvaykpIHBydm5pX21lc2ljID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHBydm5pX21lc2ljID0gbmV3IERhdGUoZGF0X29kKS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0X2RvID09IG51bGwgfHwgKG5ldyBEYXRlKGRhdF9kbykuZ2V0RnVsbFllYXIoKSAhPSByb2spKSBwb3NsX21lc2ljID0gMTI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBwb3NsX21lc2ljID0gbmV3IERhdGUoZGF0X2RvKS5nZXRNb250aCgpIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9jZXQgPSBwb3NsX21lc2ljIC0gcHJ2bmlfbWVzaWMgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2NldCA8IDApIHBvY2V0ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHphcG9jaXRhdFBydm5pICYmIGRhdF9vZCAhPSBudWxsICYmIChuZXcgRGF0ZShkYXRfb2QpLmdldEZ1bGxZZWFyKCkgPT0gcm9rKSkgcG9jZXQgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoemFwb2NpdGF0UG9zbGVkbmkgJiYgZGF0X2RvICE9IG51bGwgJiYgKG5ldyBEYXRlKGRhdF9kbykuZ2V0RnVsbFllYXIoKSA9PSByb2spKSBwb2NldCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXcgRGF0ZShkYXRfb2QpLmdldE1vbnRoKCkgPT0gbmV3IERhdGUoZGF0X2RvKS5nZXRNb250aCgpICYmIHBvY2V0ID4gMSkgcG9jZXQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5c2VfcHJlZHBpc3UgPSAoY2FzdGthICogcG9jZXQpIC8gMTI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTMuZmluZEZpZWxkcyhcInBvbWVybmFfY2FzdFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBNYXRoLnJvdW5kKHZ5c2VfcHJlZHBpc3UgKiAxMDApIC8gMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB2eXNlX3ByZWRwaXN1ID0gKE1hdGgucm91bmQodnlzZV9wcmVkcGlzdSAqIDEwMCkgLyAxMDApIC0gcHJlZGVwc2FubztcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJ2eXNlX3ByZWRwaXN1XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHZ5c2VfcHJlZHBpc3UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy9wb8SNw610YXQgcG8gZG5lY2ggKDApICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG/EjWV0IGRuw60gdiByb2NlP1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5c2VfcHJlZHBpc3UgPSAoKHBvY2V0X2RuaSkgKiBjYXN0a2EpIC8gKE1hdGgucm91bmQoKG5ldyBEYXRlKHJvaywgMTIsIDMxLCAwLCAwLCAwKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShyb2ssIDEsIDEsIDAsIDAsIDApLmdldFRpbWUoKSkgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTMuZmluZEZpZWxkcyhcInBvbWVybmFfY2FzdFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBNYXRoLnJvdW5kKHZ5c2VfcHJlZHBpc3UgKiAxMDApIC8gMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB2eXNlX3ByZWRwaXN1ID0gKE1hdGgucm91bmQodnlzZV9wcmVkcGlzdSAqIDEwMCkgLyAxMDApIC0gcHJlZGVwc2FubztcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJ2eXNlX3ByZWRwaXN1XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHZ5c2VfcHJlZHBpc3UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcG9jZXRfZG5pID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcm0zLmZpbmRGaWVsZHMoXCJwb2NfZG5pXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHBvY2V0X2RuaSk7XHJcbiAgICAgICAgICAgICAgICBHRGxnLmVycm9yKFwiRGF0dW0gcGxhdG5vc3RpIG9kIGEgZGF0dW0gcGxhdG5vc3RpIGRvIHNlIGvFmcOtxb7DrSFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jcmVnaW9uIERPU0FWRVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgcHJpdmF0ZSBkb1NhdmUoZGVmOiBKUXVlcnkuRGVmZXJyZWQ8YW55LCBhbnksIGFueT4pIHtcclxuICAgICAgICAgICAgbGV0IHptZW55Rm9ybSA9IHRoaXMubWFpbkZvcm0uZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGVmU2t1cGluYVZ5bWFoYW5pID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHptZW55Rm9ybSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1haW5Gb3JtLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZlNrdXBpbmFWeW1haGFuaS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HQ2lzZWxuaWtDdHZydGlEdG8gPSAkLmV4dGVuZCh7fSwgdGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbkZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXEgPSBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnE6IHsgRGF0YTogZHRvIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGxldCB0YXNrID0gdGhpcy5lZGl0TW9kZSA/IElzbC5Ta3VwaW5hVnltYWhhbmkudXBkYXRlKHJlcSkgOiBJc2wuU2t1cGluYVZ5bWFoYW5pLmNyZWF0ZShyZXEpO1xyXG4gICAgICAgICAgICAgICAgRGRwLldlYkNsaWVudC5Db21tb24uQmFzZS5Qcm9jZXNzUmVzcG9uc2UodGFzay5nZXQoKSwgdGhpcywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3A6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcC5NZXNzYWdlcyA9PSBudWxsIHx8IHJlc3AuTWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXhzX3NrdiA9IHJlc3AuZGF0YS5peHNfc2t2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluRm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCByZXNwLmRhdGEsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZlNrdXBpbmFWeW1haGFuaS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZTa3VwaW5hVnltYWhhbmkucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmU2t1cGluYVZ5bWFoYW5pLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGRlZlNrdXBpbmFWeW1haGFuaS5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICBkZWZTa3VwaW5hVnltYWhhbmkudGhlbihcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVmVHlweVBvaGxlZGF2ZWsgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhbmdlZFR5cHlQb2hsZWRhdmVrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVOYXZhemFuZVR5cHlQb2hsZWRhdmVrKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZUeXB5UG9obGVkYXZlay5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZlR5cHlQb2hsZWRhdmVrLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZUeXB5UG9obGVkYXZlay5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZlR5cHlQb2hsZWRhdmVrLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIFwiQ2h5YmEgcMWZaSB1a2zDoWTDoW7DrSBuYXbDoXphbsO9Y2ggdHlwxa8gcG9obGVkw6F2ZWsuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIFNBVkVcclxuICAgICAgICAvKlxyXG4gICAgICAgIHByaXZhdGUgc2F2ZShhc2s6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHptZW55Rm9ybSA9IHRoaXMubWFpbkZvcm0uZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICAvL2xldCB6bWVueSA9IHRoaXMuY2hhbmdlZFR5cHlQb2hsZWRhdmVrIHx8IHptZW55Rm9ybTtcclxuXHJcbiAgICAgICAgICAgIGlmICh6bWVueSAmJiBhc2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKFwiVWxvxb5pdFwiLCBcIkNoY2V0ZSB1bG/Fvml0IHptxJtueT9cIilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvU2F2ZShkZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoem1lbnkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvU2F2ZShkZWYpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIENMT1NJTkdcclxuICAgICAgICAvL2Nsb3NpbmcoKSB7XHJcbiAgICAgICAgLy8gICAgLy9pZiAodGhpcy5yZWFkT25seSlcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgIC8vZWxzZVxyXG4gICAgICAgIC8vICAgICAgICAvL3JldHVybiB0aGlzLnNhdmUodHJ1ZSk7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8jcmVnaW9uIENBTkNFTFxyXG4gICAgICAgIGNhbmNlbCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLyNyZWdpb24gT0sgICAgICAgXHJcbiAgICAgICAgb2soKSB7XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gdGhpcy5maW5kRm9ybXMoXCJ2eXBvY2V0UHJlZHBpc3VcIik7XHJcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgIC8vbGV0IGR0by8qOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR0RldGFpbFJvelByaXBhZHVEdG8gPSB0aGlzLm1vZGVsKi87XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImRldGFpbFJvemhvZG51dGlcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG5cclxuICAgICAgICAgICAgLy9sZXQgcmVxID0gcnEgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcnE6IHsgRGF0YTogZHRvIH1cclxuICAgICAgICAgICAgLy8gICAgfTtcclxuICAgICAgICAgICAgLy99O1xyXG5cclxuICAgICAgICAgICAgLy9sZXQgdGFzay8qID0gdGhhdC5pc2wuRGV0YWlsUm96UHJpcGFkdS51bG96Um96aG9kbnV0aShyZXEpKi87XHJcbiAgICAgICAgICAgIC8vQ29tbW9uLkJhc2UuUHJvY2Vzc1Jlc3BvbnNlKHRhc2suZ2V0KCksIHRoaXMsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy9pZiAoIXRoaXMucmVhZE9ubHkgJiYgIXRoaXMuZWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgLy8gICAgbGV0IGYgPSB0aGlzLmZvcm1Ta3VwaW5hVnltYWhhbmkuZmluZEZpZWxkcyhcIml4c19za3ZcIik7XHJcbiAgICAgICAgICAgIC8vICAgIGYuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCBudWxsKTtcclxuICAgICAgICAgICAgLy8gICAgZi5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgaXhzX3NrdjogdGhpcy5peHNfc2t2IH0sIHsgaW5pdGlhbFZhbHVlczogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgLy90aGlzLnNhdmUoKVxyXG4gICAgICAgICAgICAvLyAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgc210ID0gZm9ybS5maW5kRmllbGRzKFwiY2FzdGthX3ByZWRwaXN1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKHNtdClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iXX0=