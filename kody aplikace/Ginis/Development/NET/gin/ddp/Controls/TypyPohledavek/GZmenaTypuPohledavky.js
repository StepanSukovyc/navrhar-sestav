"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GZmenaTypuPohledavky.ts                </Name>
//    <Description> Okno pro změnu typu pohledávky na případu                   </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-10-17                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Okno pro změnu typu pohledávky na případu (dlg_zmen_phl)
             * @author ### ###
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-##-##
             * @lastModified 2025-##-##
             */
            let GZmenaTypuPohledavky = class GZmenaTypuPohledavky extends Gordic.GContentBase {
                constructor() {
                    //#region P R O P E R T I E S 
                    super(...arguments);
                    this.typPhlFilter = {};
                    this.vytisteno = false;
                    this.nastavujeSe = true;
                    //#endregion A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                }
                //#endregion P R O P E R T I E S 
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.createActions();
                    that.createForm(); // )ret.data);
                    that.setDefaultData()
                        .fail(() => {
                        that.close(); // V případě chyby se zavře oknno
                    });
                }
                //#region S E S T A V E N Í   O K N A
                /**
                 * Metoda pro vytvoření akcí a command baru
                 * @method createActions()
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actSave",
                            caption: "Ok",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ok()
                                    .done((retIxp) => {
                                    that.close(retIxp);
                                });
                            }
                        },
                        {
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        },
                        {
                            name: "actTisk",
                            caption: "Tisk",
                            icon: "gi-print",
                            run: function () {
                                that.tiskDokladu();
                                //.fail((ret) => {
                                //    that.dialogs.error("Chyba", ret);
                                //})
                            }
                        },
                        {
                            name: "actSaldoDetail",
                            run: () => { }
                        },
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose", "<actTisk"]));
                }
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    var formDefine = new Gordic.Forms.Form({ name: "formx", layoutDescriptor: "L1M1S1, L-3-9-0, M-4-8-0, S-12-12-0" })
                        .addSection()
                        .addRow({ label: "Kniha", required: true })
                        .addField("gselectbox", "w-8", {
                        name: "ixp_den",
                        itemTemplate: "{nazev} ({ixp_den})",
                        model: "model.ixp_den=value.ixp_den,model.nazev=value.nazev",
                        validators: [new Gordic.Validators.Required()],
                        //data: seznamKnih,
                        //initialValue: seznamKnih[0],
                        change: (ev, ctx) => {
                            if (!that.nastavujeSe) {
                                that.nastavTlacitka();
                                that.vytisteno = false;
                                that.setTypPhlField();
                            }
                        },
                    })
                        //.addField("gselectbox", "w-8", Prefabs.Select.kniha(), {
                        //    name: "ixp_den",
                        //    itemTemplate: "{nazev} ({ixp_den})",
                        //    model: "model.ixp_den=value.ixp_den",
                        //    serverFilters: { ico: that.Ico, ucs: that.Ucs, rok: that.Rok, aktivita: 100, ixs_fun: that.IxsFun },
                        //    validators: [new Gordic.Validators.Required()],
                        //    change: (ev, ctx) => {
                        //        if (!that.nastavujeSe) {
                        //            that.nastavTlacitka();
                        //            that.vytisteno = false;
                        //            that.setTypPhlField();
                        //        }
                        //    },
                        //})
                        .addField("gstringbox", "w-4", {
                        name: "rokIxpDen",
                        disabled: true,
                        tooltip: "Aktuální účetní období",
                    })
                        .addRow({ label: "Typ pohledávky", required: true })
                        .addField("gselectbox", "w-8", Gordic.Prefabs.Select.typPohledavky(), {
                        name: "typ_phl",
                        dropdown: false,
                        model: "model.typ_phl=value.typ_phl",
                        validators: [new Gordic.Validators.Required()],
                        change: (ev, ctx) => {
                            if (!that.nastavujeSe) {
                                that.nastavTlacitka();
                                that.vytisteno = false;
                            }
                        },
                    })
                        .addField("gstringbox", "w-4", {
                        name: "rokTypPhl",
                        disabled: true,
                        tooltip: "Rok aktuálně vybraného typu pohledávky",
                    })
                        .addRow({ label: "Datum", required: true })
                        .addField("gdatebox", "w-12", {
                        name: "datumZmenyPhl",
                        validators: [new Gordic.Validators.Required()],
                        change: (ev, ctx) => {
                            if (!that.nastavujeSe) {
                                that.nastavTlacitka();
                                that.vytisteno = false;
                                that.ziskejSaldo();
                                that.nastavSaldo();
                            }
                        },
                    })
                        .addRow("Saldo")
                        .addField("gnumberbox", "w-12", Gordic.Prefabs.Number.currency(), {
                        name: "saldo",
                        buttons: [
                            {
                                icon: "gi-detail",
                                caption: "Saldo",
                                action: that.actions["actSaldoDetail"]
                            }
                        ],
                        change: (ev, ctx) => {
                            if (!that.nastavujeSe) {
                                that.nastavTlacitka();
                                that.vytisteno = false;
                            }
                        },
                    })
                        //.addField()
                        .addRow().addField("gcheck", WebClient.Common.Prefabs.Checkbox(), {
                        name: "cb_kumulace", label: "Kumulovat Předpisy",
                        change: (ev, ctx) => {
                            if (!that.nastavujeSe) {
                                that.zmenaComboBox(1);
                            }
                        },
                    })
                        .addRow().addField("gcheck", WebClient.Common.Prefabs.Checkbox(), {
                        name: "cb_prevod_minulych_let", label: "Převody pohledávky minulých let",
                        change: (ev, ctx) => {
                            if (!that.nastavujeSe) {
                                that.zmenaComboBox(2);
                            }
                        },
                    })
                        .addRow().addField("gcheck", WebClient.Common.Prefabs.Checkbox(), {
                        name: "cb_prevod_vnitrni", label: "Vnitroorganizační změna",
                        change: (ev, ctx) => {
                            if (!that.nastavujeSe) {
                                that.zmenaComboBox(3);
                            }
                        },
                    });
                    that.form = $.newDiv().appendTo(this.element).gform("createFrom", formDefine);
                }
                //#endregion S E S T A V E N Í   O K N A
                //#region A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                setDefaultData() {
                    const that = this;
                    var def = $.Deferred();
                    that.vytisteno = false;
                    that.findFields("rokIxpDen").gfield("setValue", "Rok knihy: " + that.Rok, { initialValues: true });
                    that.findFields("rokTypPhl").gfield("setValue", "Rok PHL: " + that.InitTypPhl.Nastaveni?.rok, { initialValues: true });
                    if (that.InitTypPhl.Nastaveni?.rok != that.Rok) {
                        that.findFields("rokIxpDen").css("color", "#FF0000");
                        //that.findFields("rokIxpDen").removeAttr("style");
                    }
                    that.nactiKnihyDoFieldu().done(() => {
                        that.findFields("datumZmenyPhl").gfield("setValue", that.DatumPrevodu, { initialValues: true });
                        that.ziskejSaldo()
                            .fail(() => {
                            def.reject().promise();
                        })
                            .done(() => {
                            that.findFields("cb_kumulace").gfield("setValue", true, { initialValues: true });
                            that.findFields("cb_prevod_minulych_let").gfield("setValue", false, { initialValues: true });
                            that.findFields("cb_prevod_vnitrni").gfield("setValue", false, { initialValues: true });
                            if (that.DdpParams.ddp_rad_presal != 1) {
                                that.findFields("saldo").gfield("option", "disabled", true);
                                that.nastavSaldo();
                            }
                            else {
                                var l_saldo = new Decimal(that.Saldo);
                                var l_nula = new Decimal(0);
                                if (!l_saldo.equals(l_nula)) {
                                    //if (!that.Saldo.equals(new Decimal(0))) {
                                    that.findFields("saldo").gfield("setValue", that.Saldo, { initialValues: true });
                                }
                                else {
                                    that.nastavSaldo();
                                }
                            }
                            if (that.DdpParams.ddp_rad_zmekni == 0) {
                                that.findFields("ixp_den").gfield("option", "disabled", true);
                            }
                            that.nastavComboBoxy();
                            that.nastavTlacitka();
                            that.nastavujeSe = false;
                            def.resolve();
                        });
                    }).fail(() => {
                        that.dialogs.error("Chyba", "Nebyla nalezena žádná aktivní kniha pro dané parametry (IČO, UCS, Rok). \n Změna typu pohledávky nemůže být provedena.")
                            .on("close", (ev, retVal) => {
                            def.reject().promise();
                        });
                    });
                    return def.promise();
                }
                nactiKnihyDoFieldu() {
                    const that = this;
                    var def = $.Deferred();
                    //that.beginOperation("Načítání dat...");
                    let filtrData = { ico: that.Ico, ucs: that.Ucs, rok: that.Rok, aktivita: 100, ixs_fun: that.IxsFun };
                    that.isl.Kniha.nactiKnihy(rq => { return { filters: filtrData }; }).get()
                        //.always(() => { that.endOperation(); })
                        .done((ret) => {
                        if (ret.data.length === 0) { // pokud metoda skončila v pořádku ale vrátila prázdný seznam knih
                            def.reject(); // ukončím metodu s chybou - čímž ukončím práci v celém okně
                        }
                        else { // pokud v poli je alespoń jeden záznam
                            that.findFields("ixp_den").gselectbox("option", "data", ret.data); // naplnit data do fieldu
                            that.findFields("ixp_den").gfield("model", "apply", ret.data[0]); // potom vyberu první položku z nabídky a nastavím ji jako vybranou hodnotu
                            that.setTypPhlField(); // jelikož mám vybranou knihu, můžu volat metodu pro nastavení filtru typ_phl
                            def.resolve(); // nakonec pošlu úspěšné dokončení metody
                        }
                    })
                        .fail((jqXHR, typ, obj) => {
                        WebClient.Common.Base.getFailFromIslPromise(that, jqXHR, typ, obj)
                            .then(() => {
                            def.reject();
                        });
                    });
                    return def.promise();
                }
                setTypPhlField() {
                    const that = this;
                    let ixpDen = that.findFields("ixp_den").gfield("getValue");
                    if (ixpDen && ixpDen.ixp_den) {
                        that.findFields("typ_phl").gfield("option", "disabled", false);
                        that.typPhlFilter = {
                            phl_pro_roky: true,
                            povolene_pro_knihu: ixpDen.value?.ixp_den,
                            test_kniha_funkce: false,
                        };
                        if (that.DdpParams.ddp_phl_preoth == 1) {
                            that.typPhlFilter.povolene_pro_funkci = that.IxsFun;
                        }
                        that.findFields("typ_phl").gfield("option", "serverFilters", that.typPhlFilter);
                    }
                    else {
                        if (!that.nastavujeSe)
                            that.findFields("typ_phl").gfield("option", "disabled", true);
                        that.findFields("typ_phl").gfield("setValue", null);
                    }
                }
                nastavSaldo() {
                    const that = this;
                    var datum = that.findFields("datumZmenyPhl").gfield("getValue");
                    if (datum != null) {
                        var kumulace = that.findFields("cb_kumulace").gfield("getValue");
                        if (!kumulace) {
                            that.findFields("saldo").gfield("setValue", new Decimal(0), { initialValues: true });
                        }
                        else {
                            that.findFields("saldo").gfield("setValue", that.saldoDleData, { initialValues: true });
                            //x that.ziskejSaldo(); // ? Možná nastavit pouze do políčka s datumem, kde se při jeho změně saldo přenastaví do glob. hodnoty a tady se jen nastaví
                        }
                    }
                    else {
                        that.findFields("saldo").gfield("setValue", new Decimal(0), { initialValues: true });
                    }
                }
                /**
                 * Metoda pro získání Salda dle data
                 * @method ziskejSaldo()
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                ziskejSaldo() {
                    const that = this;
                    var def = $.Deferred();
                    var datum = that.findFields("datumZmenyPhl").gfield("getValue");
                    if (datum != null) {
                        that.isl.Salda.saldoDo({ ixp: that.IxpOld, dat_salda_do: datum, typ_salda: 10, napojene: false }).get()
                            .always(() => { that.endOperation(); })
                            .done(function (ret) {
                            //that.findFields("saldo").gfield("setValue", ret, { initialValues: true });
                            that.saldoDleData = new Decimal(ret);
                            def.resolve();
                        })
                            .fail(function (jqXHR, typ, obj) {
                            if (typ === "exception") {
                                obj.handled = true;
                                that.dialogs.error("Chyba", obj.baseMessage)
                                    .on("close", (ev, retVal) => {
                                    def.reject();
                                });
                            }
                            else {
                                def.reject();
                            }
                        });
                        return def.promise();
                    }
                    else {
                        that.saldoDleData = new Decimal(0);
                        return def.resolve().promise();
                    }
                }
                /**
                 * Metoda pro nastavení comboboxů
                 * @method nastavComboBoxy()
                 */
                nastavComboBoxy() {
                    const that = this;
                    if (that.DdpParams.ddp_rez_prevod != 1) {
                        that.findFields("cb_kumulace").gfield("option", "disabled", true);
                    }
                    else {
                        //!je povoleno pouze kumulovaně
                        if (that.DdpParams.ddp_rez_prevku == 1) {
                            that.findFields("cb_kumulace").gfield("setValue", true, { initialValues: true });
                            that.findFields("cb_kumulace").gfield("option", "disabled", true);
                        }
                        //!je povoleno pouze nekumulovaně
                        if (that.DdpParams.ddp_rez_prevku == 2) {
                            that.findFields("cb_kumulace").gfield("setValue", false, { initialValues: true });
                            that.findFields("cb_kumulace").gfield("option", "disabled", true);
                        }
                        //!Dle data automaticky
                        if (that.DdpParams.ddp_rez_prevku == 3) {
                            var rokPocatku = new Date(that.DatumPocatku).getFullYear();
                            if (rokPocatku == that.InitTypPhl.Nastaveni?.rok) {
                                that.findFields("cb_kumulace").gfield("setValue", false, { initialValues: true });
                            }
                            else {
                                that.findFields("cb_kumulace").gfield("setValue", true, { initialValues: true });
                            }
                            that.findFields("cb_kumulace").gfield("option", "disabled", true);
                        }
                    }
                }
                /**
                 * Metoda údálostí při změně hodnoty v comboboxech
                 * @method zmenaComboBox()
                 * @param input 1 - kumulace | 2 - převod minulých | 3 - převod vnitřní
                 * @returns ukončení metody v případě jiného vstupu
                 */
                zmenaComboBox(input) {
                    const that = this;
                    if (input == 1) {
                        if (that.findFields("cb_kumulace").gfield("getValue") == 0) {
                            that.findFields("cb_prevod_minulych_let").gfield("setValue", false, { initialValues: true });
                            that.findFields("cb_prevod_vnitrni").gfield("setValue", false, { initialValues: true });
                        }
                    }
                    else if (input == 2) {
                        if (that.findFields("cb_prevod_minulych_let").gfield("getValue") == 1) {
                            that.findFields("cb_prevod_vnitrni").gfield("setValue", false, { initialValues: true });
                        }
                    }
                    else if (input == 3) {
                        if (that.findFields("cb_prevod_vnitrni").gfield("getValue") == 1) {
                            that.findFields("cb_prevod_minulych_let").gfield("setValue", false, { initialValues: true });
                            that.findFields("cb_kumulace").gfield("setValue", true, { initialValues: true });
                        }
                        else {
                            if (that.DdpParams.ddp_rez_prevku == 3) {
                                var rokPocatku = new Date(that.DatumPocatku).getFullYear();
                                if (rokPocatku == that.InitTypPhl.Nastaveni?.rok) {
                                    that.findFields("cb_kumulace").gfield("setValue", false, { initialValues: true });
                                }
                                else {
                                    that.findFields("cb_kumulace").gfield("setValue", true, { initialValues: true });
                                }
                                that.findFields("cb_kumulace").gfield("option", "disabled", true);
                            }
                        }
                    }
                    else {
                        return;
                    }
                    that.nastavTlacitka();
                    that.nastavSaldo();
                }
                /**
                 * Metoda pro nastavení tlačítek
                 * @method nastavTlacitka()
                 */
                nastavTlacitka() {
                    const that = this;
                    var datum = that.findFields("datumZmenyPhl").gfield("getValue");
                    var typ_phl = that.findFields("typ_phl").gfield("getValue");
                    var permsTrue = { visible: true, value: true };
                    var permsFalse = { visible: true, value: false };
                    //If df_date.Datum() != DATETIME_Null AND SalStrTrimX(df_typ_phl) != ''
                    if (datum != null && typ_phl && typ_phl.typ_phl != '') {
                        if (that.vytisteno) {
                            that.actions.actSave.updatePermission(permsTrue);
                            that.actions.actTisk.updatePermission(permsTrue);
                        }
                        else {
                            that.actions.actSave.updatePermission(permsFalse);
                            that.actions.actTisk.updatePermission(permsTrue);
                        }
                    }
                    else {
                        that.actions.actSave.updatePermission(permsFalse);
                        that.actions.actTisk.updatePermission(permsFalse);
                        that.vytisteno = false;
                    }
                    var kumulace = that.findFields("cb_kumulace").gfield("getValue");
                    if (kumulace) {
                        if (that.DdpParams.ddp_rez_prevku != 3) {
                            that.findFields("cb_prevod_minulych_let").gfield("option", "disabled", false);
                        }
                        if (that.DdpParams.ddp_rez_prevku == 1) {
                            that.findFields("cb_prevod_vnitrni").gfield("option", "disabled", false);
                        }
                        if (that.DdpParams.ddp_rad_presal != 1) {
                            that.findFields("saldo").gfield("option", "disabled", true);
                        }
                        else {
                            that.findFields("saldo").gfield("option", "disabled", false);
                        }
                    }
                    else {
                        that.findFields("cb_prevod_minulych_let").gfield("option", "disabled", true);
                        if (that.DdpParams.ddp_rez_prevku == 2) {
                            that.findFields("cb_prevod_vnitrni").gfield("option", "disabled", true);
                        }
                    }
                }
                /** Metoda pro nastavení tisku Salda Vym DŘ
                  * @method tiskyDokladu()
                  */
                tiskDokladu() {
                    let that = this;
                    let typ_phl_field = that.findFields("typ_phl").gfield("getValue");
                    let datum = that.element.findForms().findFields("datumZmenyPhl").gfield("getValue");
                    let castka = that.element.findForms().findFields("saldo").gfield("getValue");
                    let kumulace = that.findFields("cb_kumulace").gfield("getValue");
                    let prevodMinulychLet = 0;
                    let prevod_minulych_let = that.findFields("cb_prevod_minulych_let").gfield("getValue");
                    if (prevod_minulych_let)
                        prevodMinulychLet = 1;
                    let prevod_vnitrni = that.findFields("cb_prevod_vnitrni").gfield("getValue");
                    if (prevod_vnitrni)
                        prevodMinulychLet = 2;
                    const actTiskDokladuPrevod = GAction.createPrintAction({
                        name: "actTiskPrevod",
                        tema: "ddp_ptm_predphl",
                        serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:ZmenaPohledavky",
                        reportStarting: function (rep) {
                            rep.customDto = {
                                ixp_novy: that.IxpOld, // 0
                                typ_phl: typ_phl_field?.typ_phl, // 1
                                nazev: typ_phl_field?.nazev, // 2
                                datumOd: datum, // 3
                                ixp: that.IxpOld, // 4
                                kumulace: kumulace, // 5
                                castka: castka, // 6
                                //                                           // 7 testMode
                                prevod_minulych_let: prevodMinulychLet, // 8
                                //                                           // 9 typTisk
                                ixp_den: that.Ixp_den, //
                                rok_den: that.Rok_den, //
                            };
                        },
                        reportFinished: function () {
                        },
                        dialogClosed: function () {
                            that.vytisteno = true;
                            var permsTrue = { visible: true, value: true };
                            that.actions.actSave.updatePermission(permsTrue);
                            that.actions.actTisk.updatePermission(permsTrue);
                        }
                    });
                    actTiskDokladuPrevod.run();
                }
                /**
                 * Metoda pro uložení dat z obsahu
                 * @method ulozit()
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                ok() {
                    const that = this;
                    var def = $.Deferred();
                    if (!that.findForms().gform("isValid")) { // Dodatečná kontrola vyplnění povinných políček
                        return def.reject().promise();
                    }
                    let formData = {};
                    that.findFields().gfield("model", "collect", formData);
                    var dataProZmenu = {
                        ixp_puv: that.IxpOld,
                        typ_phl: formData.typ_phl,
                        ixp_den: formData.ixp_den,
                        dat_k: formData.datumZmenyPhl,
                        kumulace: formData.cb_kumulace,
                        prev_min_roky: formData.cb_prevod_minulych_let + (formData.cb_prevod_vnitrni * 2),
                        saldo: formData.saldo,
                        generovat_upo: that.DdpParams.ddp_rez_prevod,
                    };
                    let datumPrevodu = new Date(dataProZmenu.dat_k);
                    datumPrevodu.setDate(datumPrevodu.getDate() + 1);
                    that.isl.Pripad.predpisyPripaduVIntervaluOd({ ip_ixp: that.IxpOld, ip_typ: 0, ip_dat_od: datumPrevodu }).get()
                        .always(() => { that.endOperation(); })
                        .done(function (ret) {
                        var predpisy = new Decimal(ret);
                        var l_nula = new Decimal(0);
                        if (!predpisy.eq(l_nula)) {
                            that.dialogs.confirm("Upozornění", "Případ má po datu převodu (dle data vzniku) předpisy ve výši " + predpisy.toString() + ". \n Chcete pokračovat ? ")
                                .on("close", (ev, ret) => {
                                if (ret = "no") {
                                    def.reject();
                                }
                                else {
                                    that.zmenaTypuPohledavky(dataProZmenu)
                                        .done((retIxp) => {
                                        def.resolve(retIxp);
                                    })
                                        .fail(() => {
                                        def.reject();
                                    });
                                }
                            });
                        }
                        that.zmenaTypuPohledavky(dataProZmenu)
                            .done((retIxp) => {
                            def.resolve(retIxp);
                        })
                            .fail(() => {
                            def.reject();
                        });
                    })
                        .fail(function (jqXHR, typ, obj) {
                        if (typ === "exception") {
                            obj.handled = true;
                            that.dialogs.error("Chyba", obj.baseMessage)
                                .on("close", (ev, retVal) => {
                                def.reject();
                            });
                        }
                        else {
                            def.reject();
                        }
                    });
                    return def.promise();
                    //return def.resolve(dataProZmenu).promise(); 
                }
                zmenaTypuPohledavky(dataProZmenu) {
                    const that = this;
                    var def = $.Deferred();
                    that.dotazNaAktivituPuvodnihoPripadu()
                        .then((ukoncit) => {
                        dataProZmenu.ukon_puv = ukoncit;
                        that.beginOperation("Probíhá změna typu pohledávky...");
                        that.isl.PripadPrevody.zmenaTypuPohledavky(rq => { return { data: dataProZmenu }; }).get()
                            .always(() => { that.endOperation(); })
                            .done(function (ret) {
                            def.resolve(ret.result.data.ixp_novy);
                        })
                            .fail(function (jqXHR, typ, obj) {
                            WebClient.Common.Base.getFailFromIslPromise(that, jqXHR, typ, obj)
                                .always(() => {
                                def.reject();
                            });
                        });
                    });
                    return def.promise();
                }
                dotazNaAktivituPuvodnihoPripadu() {
                    const that = this;
                    var def = $.Deferred();
                    // jeste dotaz na to zda chci pripad nechat aktivni nebo ne
                    var ukoncit = 0;
                    // dotaz
                    //If gf_HodnotaParametruDBN('ddp_rez_prevod') = 0 AND l_saldo = 0
                    var l_nula = new Decimal(0);
                    var l_saldo = new Decimal(that.Saldo);
                    if ((that.DdpParams.ddp_rez_prevod == 0) && (l_saldo.eq(l_nula))) {
                        //	If gf_HodnotaParametruDBN('ddp_rez_prezru') = 0
                        if (that.DdpParams.ddp_rez_prezru == 0) {
                            that.dialogs.confirm("Upozornění", "Chcete původní případ ponechat aktivní? \n Pokud odpovíte Ano, případ zůstane zachován, pokud odpovíte Ne, původní případ bude ukončen.")
                                .on("close", (ev, ret) => {
                                if (ret = "yes") {
                                    ukoncit = 0;
                                }
                                else {
                                    ukoncit = 1;
                                }
                                def.resolve(ukoncit);
                            });
                            return def.promise();
                        }
                        else if (that.DdpParams.ddp_rez_prezru == 1) {
                            ukoncit = 1;
                            return def.resolve(ukoncit).promise();
                        }
                        else if (that.DdpParams.ddp_rez_prezru == 2) {
                            ukoncit = 0;
                            return def.resolve(ukoncit).promise();
                        }
                        else {
                            ukoncit = 0;
                            return def.resolve(ukoncit).promise();
                        }
                    }
                    else {
                        return def.resolve(ukoncit).promise();
                    }
                }
            };
            GZmenaTypuPohledavky = __decorate([
                Decorators.gcontent
            ], GZmenaTypuPohledavky);
            WebClient.GZmenaTypuPohledavky = GZmenaTypuPohledavky;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ptZW5hVHlwdVBvaGxlZGF2a3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHWm1lbmFUeXB1UG9obGVkYXZreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQXNzQmY7QUF0c0JELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXNzQm5CO0lBdHNCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBc3NCN0I7UUF0c0JvQixXQUFBLFNBQVM7WUFDMUI7Ozs7OztlQU1HO1lBRUgsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXREO29CQUVJLDhCQUE4Qjs7b0JBd0M5QixpQkFBWSxHQUFRLEVBQUUsQ0FBQztvQkFDdkIsY0FBUyxHQUFZLEtBQUssQ0FBQztvQkFDM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7b0JBK29CNUIsa0VBQWtFO2dCQUN0RSxDQUFDO2dCQS9vQkcsaUNBQWlDO2dCQUVqQzs7O21CQUdHO2dCQUNILGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLGNBQWM7b0JBRWpDLElBQUksQ0FBQyxjQUFjLEVBQUU7eUJBQ2hCLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1AsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsaUNBQWlDO29CQUNuRCxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVELHFDQUFxQztnQkFDckM7OzttQkFHRztnQkFDSCxhQUFhO29CQUNULE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxD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NEJBQ1osT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUMxQyxDQUFDOzZCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLElBQUksQ0FBQyxFQUFFLENBQUM7NEJBQzVDLE9BQU8sR0FBRyxDQUFDLENBQUM7NEJBQ1osT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUMxQyxDQUFDOzZCQUFNLENBQUM7NEJBQ0osT0FBTyxHQUFHLENBQUMsQ0FBQzs0QkFDWixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzFDLENBQUM7b0JBQ0wsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDMUMsQ0FBQztnQkFDTCxDQUFDO2FBSUosQ0FBQTtZQTVyQlksb0JBQW9CO2dCQURoQyxVQUFVLENBQUMsUUFBUTtlQUNQLG9CQUFvQixDQTRyQmhDO1lBNXJCWSw4QkFBb0IsdUJBNHJCaEMsQ0FBQTtRQUNMLENBQUMsRUF0c0JvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFzc0I3QjtJQUFELENBQUMsRUF0c0JnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFzc0JuQjtBQUFELENBQUMsRUF0c0JTLE1BQU0sS0FBTixNQUFNLFFBc3NCZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuRGRwLldlYkNsaWVudC5HWm1lbmFUeXB1UG9obGVkYXZreS50cyAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gT2tubyBwcm8gem3Em251IHR5cHUgcG9obGVkw6F2a3kgbmEgcMWZw61wYWR1ICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMTAtMTcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogT2tubyBwcm8gem3Em251IHR5cHUgcG9obGVkw6F2a3kgbmEgcMWZw61wYWR1IChkbGdfem1lbl9waGwpICBcclxuICAgICAqIEBhdXRob3IgIyMjICMjI1xyXG4gICAgICogQGNvcHlyaWdodCDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjZcclxuICAgICAqIEBjcmVhdGVkIDIwMjUtIyMtIyNcclxuICAgICAqIEBsYXN0TW9kaWZpZWQgMjAyNS0jIy0jI1xyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdabWVuYVR5cHVQb2hsZWRhdmt5IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFAgUiBPIFAgRSBSIFQgSSBFIFMgXHJcblxyXG4gICAgICAgIC8qKiBGb3JtdWzDocWZICovXHJcbiAgICAgICAgcHJpdmF0ZSBmb3JtOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIC8qKiBSb2sgLSBla29wYXJhbXMgKi9cclxuICAgICAgICByZWFkb25seSBSb2s6IG51bWJlcjtcclxuICAgICAgICAvKiogVUNTIC0gZWtvcGFyYW1zICovXHJcbiAgICAgICAgcmVhZG9ubHkgVWNzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEnEjE8gLSBla29wYXJhbXMgICovXHJcbiAgICAgICAgcmVhZG9ubHkgSWNvOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIElkZW50aWZpa8OhdG9yIGZ1bmtjZSAtIHNlc3Npb25pbmZvICovXHJcbiAgICAgICAgcmVhZG9ubHkgSXhzRnVuOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHJlYWRvbmx5IEl4cF9kZW46IHN0cmluZztcclxuICAgICAgICByZWFkb25seSBSb2tfZGVuOiBudW1iZXI7XHJcblxyXG4gICAgICAgIERhdHVtUG9jYXRrdTogRGF0ZTtcclxuICAgICAgICAvL3JlYWRvbmx5IGRlY2lOdWxhOiBEZWNpbWFsID0gbmV3IERlY2ltYWwoMCk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEVE8gVHlwdSBwb2hsZWTDoXZreSB2IGVrby1pbml0dVxyXG4gICAgICAgICAqICBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBJbml0VHlwUGhsOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1R5cFBvaGxlZGF2a3lEdG87IFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYXJhbWV0cnkgYXBsaWthY2UgRERQXHJcbiAgICAgICAgICogT2JqZWt0IG9ic2FodWplIGNlbG91IMWha8OhbHUgcGFyYW1ldHLFrywgYWxlIG5hxI10ZW55IGpzb3UgcG91emUgdHksIGt0ZXLDqSBzZSB2eXXFvsOtdmFqw60gemRlIG5hIGRldGFpbHVcclxuICAgICAgICAgKiBKZWppY2ggbmHEjXRlbsOtIGplIGRlZmlub3bDoW5vIHYgR1NhbGRhVnltRHIuY3Mga2RlIGx6ZSBwxZlpZGF0IGRhbMWhw60gamUtbGkgdG8gcG90xZllYmFcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZHBQYXJhbXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdEZHBQYXJhbWV0cnlEdG87XHJcblxyXG4gICAgICAgIEl4cERlbjogc3RyaW5nOy8vIGxfaXhwX2RlbiBcclxuICAgICAgICBUeXBQaGw6IHN0cmluZzsvLyB0aGF0Lm1vZGVsLnR5cF9waGxcclxuICAgICAgICBJeHBPbGQ6IHN0cmluZzsvLyBpeHBfb2xkXHJcbiAgICAgICAgRGF0dW1QcmV2b2R1OiBEYXRlOy8vIGREYXR1bVxyXG4gICAgICAgIFNhbGRvOiBEZWNpbWFsOy8vIGxfc2FsZG8sXHJcbiAgICAgICAgXHJcbiAgICAgICAgc2FsZG9EbGVEYXRhOiBEZWNpbWFsO1xyXG4gICAgICAgIHR5cFBobEZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgdnl0aXN0ZW5vOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbmFzdGF2dWplU2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBQIFIgTyBQIEUgUiBUIEkgRSBTIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIbGF2bsOtIG1ldG9kYSBwcm8gaW5pY2lhbGl6YWNpIG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIG9uQ29udGVudFJlYWR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpOyAvLyApcmV0LmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5zZXREZWZhdWx0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpOyAvLyBWIHDFmcOtcGFkxJsgY2h5Ynkgc2UgemF2xZllIG9rbm5vXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBha2PDrSBhIGNvbW1hbmQgYmFydVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlQWN0aW9ucygpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vaygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmV0SXhwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShyZXRJeHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9IC8vIFphdsWZZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlza0Rva2xhZHUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmZhaWwoKHJldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYWxkb0RldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIiwgXCI8YWN0VGlza1wiXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGZvcm11bMOhxZllIFxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlRm9ybSgpXHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5Gb3Jtcy5Gb3JtfSAtIFZyYWPDrSBmb3JtdWzDocWZXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCkgeyAvLyAoc2V6bmFtS25paDogYW55KVxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZvcm1EZWZpbmUgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm14XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTMtOS0wLCBNLTQtOC0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIktuaWhhXCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy04XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie25hemV2fSAoe2l4cF9kZW59KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4cF9kZW49dmFsdWUuaXhwX2Rlbixtb2RlbC5uYXpldj12YWx1ZS5uYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kYXRhOiBzZXpuYW1LbmloLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiBzZXpuYW1LbmloWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0Lm5hc3RhdnVqZVNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdlRsYWNpdGthKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZ5dGlzdGVubyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRUeXBQaGxGaWVsZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LThcIiwgUHJlZmFicy5TZWxlY3Qua25paGEoKSwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJpeHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpdGVtVGVtcGxhdGU6IFwie25hemV2fSAoe2l4cF9kZW59KVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwibW9kZWwuaXhwX2Rlbj12YWx1ZS5peHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGljbzogdGhhdC5JY28sIHVjczogdGhhdC5VY3MsIHJvazogdGhhdC5Sb2ssIGFrdGl2aXRhOiAxMDAsIGl4c19mdW46IHRoYXQuSXhzRnVuIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlmICghdGhhdC5uYXN0YXZ1amVTZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Lm5hc3RhdlRsYWNpdGthKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQudnl0aXN0ZW5vID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuc2V0VHlwUGhsRmllbGQoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tJeHBEZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkFrdHXDoWxuw60gw7rEjWV0bsOtIG9iZG9iw61cIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiVHlwIHBvaGxlZMOhdmt5XCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy04XCIsIFByZWZhYnMuU2VsZWN0LnR5cFBvaGxlZGF2a3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfcGhsPXZhbHVlLnR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0Lm5hc3RhdnVqZVNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdlRsYWNpdGthKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZ5dGlzdGVubyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1R5cFBobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiUm9rIGFrdHXDoWxuxJsgdnlicmFuw6lobyB0eXB1IHBvaGxlZMOhdmt5XCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkRhdHVtXCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1abWVueVBobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQubmFzdGF2dWplU2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2VGxhY2l0a2EoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnl0aXN0ZW5vID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlalNhbGRvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdlNhbGRvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTYWxkb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctMTJcIiwgUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2FsZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNhbGRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdFNhbGRvRGV0YWlsXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0Lm5hc3RhdnVqZVNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdlRsYWNpdGthKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZ5dGlzdGVubyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZCgpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwgQ29tbW9uLlByZWZhYnMuQ2hlY2tib3goKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2Jfa3VtdWxhY2VcIiwgbGFiZWw6IFwiS3VtdWxvdmF0IFDFmWVkcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0Lm5hc3RhdnVqZVNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5hQ29tYm9Cb3goMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCBDb21tb24uUHJlZmFicy5DaGVja2JveCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYl9wcmV2b2RfbWludWx5Y2hfbGV0XCIsIGxhYmVsOiBcIlDFmWV2b2R5IHBvaGxlZMOhdmt5IG1pbnVsw71jaCBsZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5uYXN0YXZ1amVTZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYUNvbWJvQm94KDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwgQ29tbW9uLlByZWZhYnMuQ2hlY2tib3goKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2JfcHJldm9kX3ZuaXRybmlcIiwgbGFiZWw6IFwiVm5pdHJvb3JnYW5pemHEjW7DrSB6bcSbbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5uYXN0YXZ1amVTZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYUNvbWJvQm94KDMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgdGhhdC5mb3JtID0gJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtRGVmaW5lKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb24gUyBFIFMgVCBBIFYgRSBOIMONICAgTyBLIE4gQVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gQSBDIFQgSSBPIE4gUyAtIFYgWSBUIFYgTyDFmCBFIE4gw40gIEEgIEQgRSBGIEkgTiBJIEMgRVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldERlZmF1bHREYXRhKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52eXRpc3Rlbm8gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInJva0l4cERlblwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBcIlJvayBrbmloeTogXCIgKyB0aGF0LlJvaywgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJyb2tUeXBQaGxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCJSb2sgUEhMOiBcIiArIHRoYXQuSW5pdFR5cFBobC5OYXN0YXZlbmk/LnJvaywgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuSW5pdFR5cFBobC5OYXN0YXZlbmk/LnJvayAhPSB0aGF0LlJvaykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwicm9rSXhwRGVuXCIpLmNzcyhcImNvbG9yXCIsIFwiI0ZGMDAwMFwiKTtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5maW5kRmllbGRzKFwicm9rSXhwRGVuXCIpLnJlbW92ZUF0dHIoXCJzdHlsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5uYWN0aUtuaWh5RG9GaWVsZHUoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImRhdHVtWm1lbnlQaGxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5EYXR1bVByZXZvZHUsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuemlza2VqU2FsZG8oKVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX2t1bXVsYWNlXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY2JfcHJldm9kX21pbnVseWNoX2xldFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjYl9wcmV2b2Rfdm5pdHJuaVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuRGRwUGFyYW1zLmRkcF9yYWRfcHJlc2FsICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInNhbGRvXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdlNhbGRvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9zYWxkbzogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKHRoYXQuU2FsZG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxfbnVsYTogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsX3NhbGRvLmVxdWFscyhsX251bGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXRoYXQuU2FsZG8uZXF1YWxzKG5ldyBEZWNpbWFsKDApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInNhbGRvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRoYXQuU2FsZG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZTYWxkbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5EZHBQYXJhbXMuZGRwX3JhZF96bWVrbmkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaXhwX2RlblwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZDb21ib0JveHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZUbGFjaXRrYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdnVqZVNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgXCJOZWJ5bGEgbmFsZXplbmEgxb7DoWRuw6EgYWt0aXZuw60ga25paGEgcHJvIGRhbsOpIHBhcmFtZXRyeSAoScSMTywgVUNTLCBSb2spLiBcXG4gWm3Em25hIHR5cHUgcG9obGVkw6F2a3kgbmVtxa/FvmUgYsO9dCBwcm92ZWRlbmEuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBuYWN0aUtuaWh5RG9GaWVsZHUoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAvL3RoYXQuYmVnaW5PcGVyYXRpb24oXCJOYcSNw610w6Fuw60gZGF0Li4uXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpbHRyRGF0YSA9IHsgaWNvOiB0aGF0LkljbywgdWNzOiB0aGF0LlVjcywgcm9rOiB0aGF0LlJvaywgYWt0aXZpdGE6IDEwMCwgaXhzX2Z1bjogdGhhdC5JeHNGdW4gfTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuS25paGEubmFjdGlLbmloeShycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IGZpbHRyRGF0YSB9OyB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLy8uYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0LmRhdGEubGVuZ3RoID09PSAwKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBtZXRvZGEgc2tvbsSNaWxhIHYgcG/FmcOhZGt1IGFsZSB2csOhdGlsYSBwcsOhemRuw70gc2V6bmFtIGtuaWhcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1a29uxI3DrW0gbWV0b2R1IHMgY2h5Ym91IC0gxI3DrW3FviB1a29uxI3DrW0gcHLDoWNpIHYgY2Vsw6ltIG9rbsSbXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgdiBwb2xpIGplIGFsZXNwb8WEIGplZGVuIHrDoXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaXhwX2RlblwiKS5nc2VsZWN0Ym94KFwib3B0aW9uXCIsIFwiZGF0YVwiLCByZXQuZGF0YSk7ICAvLyBuYXBsbml0IGRhdGEgZG8gZmllbGR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCByZXQuZGF0YVswXSk7ICAgLy8gcG90b20gdnliZXJ1IHBydm7DrSBwb2xvxb5rdSB6IG5hYsOtZGt5IGEgbmFzdGF2w61tIGppIGpha28gdnlicmFub3UgaG9kbm90dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFR5cFBobEZpZWxkKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGplbGlrb8W+IG3DoW0gdnlicmFub3Uga25paHUsIG3Fr8W+dSB2b2xhdCBtZXRvZHUgcHJvIG5hc3RhdmVuw60gZmlsdHJ1IHR5cF9waGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWtvbmVjIHBvxaFsdSDDunNwxJvFoW7DqSBkb2tvbsSNZW7DrSBtZXRvZHlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKGpxWEhSLCB0eXAsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLmdldEZhaWxGcm9tSXNsUHJvbWlzZSh0aGF0LCBqcVhIUiwgdHlwLCBvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNldFR5cFBobEZpZWxkKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBpeHBEZW4gPSB0aGF0LmZpbmRGaWVsZHMoXCJpeHBfZGVuXCIpLmdmaWVsZChcImdldFZhbHVlXCIpXHJcblxyXG4gICAgICAgICAgICBpZiAoaXhwRGVuICYmIGl4cERlbi5peHBfZGVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQudHlwUGhsRmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBobF9wcm9fcm9reTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwb3ZvbGVuZV9wcm9fa25paHU6IGl4cERlbi52YWx1ZT8uaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICB0ZXN0X2tuaWhhX2Z1bmtjZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5EZHBQYXJhbXMuZGRwX3BobF9wcmVvdGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHlwUGhsRmlsdGVyLnBvdm9sZW5lX3Byb19mdW5rY2kgPSB0aGF0Lkl4c0Z1bjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB0aGF0LnR5cFBobEZpbHRlcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZighdGhhdC5uYXN0YXZ1amVTZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInR5cF9waGxcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbmFzdGF2U2FsZG8oKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGF0dW0gPSB0aGF0LmZpbmRGaWVsZHMoXCJkYXR1bVptZW55UGhsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBpZiAoZGF0dW0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGt1bXVsYWNlID0gdGhhdC5maW5kRmllbGRzKFwiY2Jfa3VtdWxhY2VcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWt1bXVsYWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwic2FsZG9cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERlY2ltYWwoMCksIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwic2FsZG9cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5zYWxkb0RsZURhdGEsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3ggdGhhdC56aXNrZWpTYWxkbygpOyAvLyA/IE1vxb5uw6EgbmFzdGF2aXQgcG91emUgZG8gcG9sw63EjWthIHMgZGF0dW1lbSwga2RlIHNlIHDFmWkgamVobyB6bcSbbsSbIHNhbGRvIHDFmWVuYXN0YXbDrSBkbyBnbG9iLiBob2Rub3R5IGEgdGFkeSBzZSBqZW4gbmFzdGF2w61cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInNhbGRvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG5ldyBEZWNpbWFsKDApLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gesOtc2vDoW7DrSBTYWxkYSBkbGUgZGF0YSBcclxuICAgICAgICAgKiBAbWV0aG9kIHppc2tlalNhbGRvKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gLSBWcmFjw60gcHJvbWlzZSA8VWtvbsSNZW7DrSBtZXRvZHkgdm9pZD5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHppc2tlalNhbGRvKCk6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBkYXR1bSA9IHRoYXQuZmluZEZpZWxkcyhcImRhdHVtWm1lbnlQaGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmIChkYXR1bSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5TYWxkYS5zYWxkb0RvKHsgaXhwOiB0aGF0Lkl4cE9sZCwgZGF0X3NhbGRhX2RvOiBkYXR1bSwgdHlwX3NhbGRhOiAxMCwgbmFwb2plbmU6IGZhbHNlIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmluZEZpZWxkcyhcInNhbGRvXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHJldCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNhbGRvRGxlRGF0YSA9IG5ldyBEZWNpbWFsKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IGRlZi5yZWplY3QoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNhbGRvRGxlRGF0YSA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIG5hc3RhdmVuw60gY29tYm9ib3jFr1xyXG4gICAgICAgICAqIEBtZXRob2QgbmFzdGF2Q29tYm9Cb3h5KClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hc3RhdkNvbWJvQm94eSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LkRkcFBhcmFtcy5kZHBfcmV6X3ByZXZvZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjYl9rdW11bGFjZVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8hamUgcG92b2xlbm8gcG91emUga3VtdWxvdmFuxJtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LkRkcFBhcmFtcy5kZHBfcmV6X3ByZXZrdSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY2Jfa3VtdWxhY2VcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdHJ1ZSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX2t1bXVsYWNlXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyFqZSBwb3ZvbGVubyBwb3V6ZSBuZWt1bXVsb3ZhbsSbXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5EZHBQYXJhbXMuZGRwX3Jlel9wcmV2a3UgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX2t1bXVsYWNlXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY2Jfa3VtdWxhY2VcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIURsZSBkYXRhIGF1dG9tYXRpY2t5XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5EZHBQYXJhbXMuZGRwX3Jlel9wcmV2a3UgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb2tQb2NhdGt1ID0gbmV3IERhdGUodGhhdC5EYXR1bVBvY2F0a3UpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJva1BvY2F0a3UgPT0gdGhhdC5Jbml0VHlwUGhsLk5hc3RhdmVuaT8ucm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX2t1bXVsYWNlXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY2Jfa3VtdWxhY2VcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdHJ1ZSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjYl9rdW11bGFjZVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgw7pkw6Fsb3N0w60gcMWZaSB6bcSbbsSbIGhvZG5vdHkgdiBjb21ib2JveGVjaFxyXG4gICAgICAgICAqIEBtZXRob2Qgem1lbmFDb21ib0JveCgpXHJcbiAgICAgICAgICogQHBhcmFtIGlucHV0IDEgLSBrdW11bGFjZSB8IDIgLSBwxZlldm9kIG1pbnVsw71jaCB8IDMgLSBwxZlldm9kIHZuaXTFmW7DrVxyXG4gICAgICAgICAqIEByZXR1cm5zIHVrb27EjWVuw60gbWV0b2R5IHYgcMWZw61wYWTEmyBqaW7DqWhvIHZzdHVwdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgem1lbmFDb21ib0JveChpbnB1dDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuZmluZEZpZWxkcyhcImNiX2t1bXVsYWNlXCIpLmdmaWVsZChcImdldFZhbHVlXCIpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjYl9wcmV2b2RfbWludWx5Y2hfbGV0XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjYl9wcmV2b2Rfdm5pdHJuaVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXQgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuZmluZEZpZWxkcyhcImNiX3ByZXZvZF9taW51bHljaF9sZXRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX3ByZXZvZF92bml0cm5pXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnB1dCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5maW5kRmllbGRzKFwiY2JfcHJldm9kX3ZuaXRybmlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX3ByZXZvZF9taW51bHljaF9sZXRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX2t1bXVsYWNlXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuRGRwUGFyYW1zLmRkcF9yZXpfcHJldmt1ID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJva1BvY2F0a3UgPSBuZXcgRGF0ZSh0aGF0LkRhdHVtUG9jYXRrdSkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJva1BvY2F0a3UgPT0gdGhhdC5Jbml0VHlwUGhsLk5hc3RhdmVuaT8ucm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjYl9rdW11bGFjZVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY2Jfa3VtdWxhY2VcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdHJ1ZSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX2t1bXVsYWNlXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQubmFzdGF2VGxhY2l0a2EoKTtcclxuICAgICAgICAgICAgdGhhdC5uYXN0YXZTYWxkbygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBuYXN0YXZlbsOtIHRsYcSNw610ZWtcclxuICAgICAgICAgKiBAbWV0aG9kIG5hc3RhdlRsYWNpdGthKClcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hc3RhdlRsYWNpdGthKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRhdHVtID0gdGhhdC5maW5kRmllbGRzKFwiZGF0dW1abWVueVBobFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIHR5cF9waGwgPSB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgcGVybXNUcnVlOiBHb3JkaWMuR2VuZXJhbC5BcHBsaWNhdGlvbkludGVyZmFjZS5HUGVybWlzc2lvbiA9IHsgdmlzaWJsZTogdHJ1ZSwgdmFsdWU6IHRydWUgfVxyXG4gICAgICAgICAgICB2YXIgcGVybXNGYWxzZTogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR1Blcm1pc3Npb24gPSB7IHZpc2libGU6IHRydWUsIHZhbHVlOiBmYWxzZSB9XHJcbiAgICAgICAgICAgIC8vSWYgZGZfZGF0ZS5EYXR1bSgpICE9IERBVEVUSU1FX051bGwgQU5EIFNhbFN0clRyaW1YKGRmX3R5cF9waGwpICE9ICcnXHJcbiAgICAgICAgICAgIGlmIChkYXR1bSAhPSBudWxsICYmIHR5cF9waGwgJiYgdHlwX3BobC50eXBfcGhsICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC52eXRpc3Rlbm8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U2F2ZSEudXBkYXRlUGVybWlzc2lvbihwZXJtc1RydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRpc2shLnVwZGF0ZVBlcm1pc3Npb24ocGVybXNUcnVlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U2F2ZSEudXBkYXRlUGVybWlzc2lvbihwZXJtc0ZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrIS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zVHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTYXZlIS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zRmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGlzayEudXBkYXRlUGVybWlzc2lvbihwZXJtc0ZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhhdC52eXRpc3Rlbm8gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIga3VtdWxhY2UgPSB0aGF0LmZpbmRGaWVsZHMoXCJjYl9rdW11bGFjZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgaWYgKGt1bXVsYWNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5EZHBQYXJhbXMuZGRwX3Jlel9wcmV2a3UgIT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX3ByZXZvZF9taW51bHljaF9sZXRcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5EZHBQYXJhbXMuZGRwX3Jlel9wcmV2a3UgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX3ByZXZvZF92bml0cm5pXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuRGRwUGFyYW1zLmRkcF9yYWRfcHJlc2FsICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJzYWxkb1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJzYWxkb1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImNiX3ByZXZvZF9taW51bHljaF9sZXRcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LkRkcFBhcmFtcy5kZHBfcmV6X3ByZXZrdSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiY2JfcHJldm9kX3ZuaXRybmlcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE1ldG9kYSBwcm8gbmFzdGF2ZW7DrSB0aXNrdSBTYWxkYSBWeW0gRMWYXHJcbiAgICAgICAgICAqIEBtZXRob2QgdGlza3lEb2tsYWR1KClcclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB0aXNrRG9rbGFkdSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHR5cF9waGxfZmllbGQgPSB0aGF0LmZpbmRGaWVsZHMoXCJ0eXBfcGhsXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0dW06IERhdGUgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRhdHVtWm1lbnlQaGxcIikuZ2ZpZWxkPERhdGU+KFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBjYXN0a2E6IERlY2ltYWwgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInNhbGRvXCIpLmdmaWVsZDxEZWNpbWFsPihcImdldFZhbHVlXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGt1bXVsYWNlID0gdGhhdC5maW5kRmllbGRzKFwiY2Jfa3VtdWxhY2VcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGxldCBwcmV2b2RNaW51bHljaExldDogbnVtYmVyID0gMFxyXG4gICAgICAgICAgICBsZXQgcHJldm9kX21pbnVseWNoX2xldCA9IHRoYXQuZmluZEZpZWxkcyhcImNiX3ByZXZvZF9taW51bHljaF9sZXRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIGlmIChwcmV2b2RfbWludWx5Y2hfbGV0KSBwcmV2b2RNaW51bHljaExldCA9IDE7XHJcbiAgICAgICAgICAgIGxldCBwcmV2b2Rfdm5pdHJuaSA9IHRoYXQuZmluZEZpZWxkcyhcImNiX3ByZXZvZF92bml0cm5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBpZiAocHJldm9kX3ZuaXRybmkpIHByZXZvZE1pbnVseWNoTGV0ID0gMjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdFRpc2tEb2tsYWR1UHJldm9kID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tQcmV2b2RcIixcclxuICAgICAgICAgICAgICAgIHRlbWE6IFwiZGRwX3B0bV9wcmVkcGhsXCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RkcFdlYlRpc2s6Wm1lbmFQb2hsZWRhdmt5XCIsXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9ub3Z5OiB0aGF0Lkl4cE9sZCwgICAgICAgICAgICAgICAgICAvLyAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHR5cF9waGxfZmllbGQ/LnR5cF9waGwsICAgICAgICAvLyAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2OiB0eXBfcGhsX2ZpZWxkPy5uYXpldiwgICAgICAgICAgICAvLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtT2Q6IGRhdHVtLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5JeHBPbGQsICAgICAgICAgICAgICAgICAgICAgICAvLyA0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt1bXVsYWNlOiBrdW11bGFjZSwgICAgICAgICAgICAgICAgICAgICAvLyA1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc3RrYTogY2FzdGthLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyA2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDcgdGVzdE1vZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldm9kX21pbnVseWNoX2xldDogcHJldm9kTWludWx5Y2hMZXQsIC8vIDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gOSB0eXBUaXNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuSXhwX2RlbiwgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2tfZGVuOiB0aGF0LlJva19kZW4sICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0RmluaXNoZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkaWFsb2dDbG9zZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZ5dGlzdGVubyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcm1zVHJ1ZTogR29yZGljLkdlbmVyYWwuQXBwbGljYXRpb25JbnRlcmZhY2UuR1Blcm1pc3Npb24gPSB7IHZpc2libGU6IHRydWUsIHZhbHVlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U2F2ZSEudXBkYXRlUGVybWlzc2lvbihwZXJtc1RydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRpc2shLnVwZGF0ZVBlcm1pc3Npb24ocGVybXNUcnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFjdFRpc2tEb2tsYWR1UHJldm9kLnJ1bigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB1bG/FvmVuw60gZGF0IHogb2JzYWh1IFxyXG4gICAgICAgICAqIEBtZXRob2QgdWxveml0KClcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gLSBWcmFjw60gcHJvbWlzZSA8VWtvbsSNZW7DrSBtZXRvZHkgdm9pZD5cclxuICAgICAgICAgKi9cclxuICAgICAgICBvaygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhhdC5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIikpIHsgLy8gRG9kYXRlxI1uw6Ega29udHJvbGEgdnlwbG7Em27DrSBwb3Zpbm7DvWNoIHBvbMOtxI1la1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtRGF0YTogYW55ID0ge307XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBmb3JtRGF0YSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YVByb1ptZW51OiBHb3JkaWMuRGRwLkludGVyZmFjZS5HWm1lbmFUeXB1UG9obGVkYXZreUR0byA9IHtcclxuICAgICAgICAgICAgICAgIGl4cF9wdXY6IHRoYXQuSXhwT2xkLFxyXG4gICAgICAgICAgICAgICAgdHlwX3BobDogZm9ybURhdGEudHlwX3BobCxcclxuICAgICAgICAgICAgICAgIGl4cF9kZW46IGZvcm1EYXRhLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICBkYXRfazogZm9ybURhdGEuZGF0dW1abWVueVBobCxcclxuICAgICAgICAgICAgICAgIGt1bXVsYWNlOiBmb3JtRGF0YS5jYl9rdW11bGFjZSxcclxuICAgICAgICAgICAgICAgIHByZXZfbWluX3Jva3k6IGZvcm1EYXRhLmNiX3ByZXZvZF9taW51bHljaF9sZXQgKyAoZm9ybURhdGEuY2JfcHJldm9kX3ZuaXRybmkgKiAyKSxcclxuICAgICAgICAgICAgICAgIHNhbGRvOiBmb3JtRGF0YS5zYWxkbyxcclxuICAgICAgICAgICAgICAgIGdlbmVyb3ZhdF91cG86IHRoYXQuRGRwUGFyYW1zLmRkcF9yZXpfcHJldm9kLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdHVtUHJldm9kdSA9IG5ldyBEYXRlKGRhdGFQcm9abWVudS5kYXRfayEpXHJcbiAgICAgICAgICAgIGRhdHVtUHJldm9kdS5zZXREYXRlKGRhdHVtUHJldm9kdS5nZXREYXRlKCkgKyAxKVxyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkLnByZWRwaXN5UHJpcGFkdVZJbnRlcnZhbHVPZCh7IGlwX2l4cDogdGhhdC5JeHBPbGQsIGlwX3R5cDogMCwgaXBfZGF0X29kOiBkYXR1bVByZXZvZHUgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmVkcGlzeSA9IG5ldyBEZWNpbWFsKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxfbnVsYTogRGVjaW1hbCA9IG5ldyBEZWNpbWFsKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJlZHBpc3kuZXEobF9udWxhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIlVwb3pvcm7Em27DrVwiLCBcIlDFmcOtcGFkIG3DoSBwbyBkYXR1IHDFmWV2b2R1IChkbGUgZGF0YSB2em5pa3UpIHDFmWVkcGlzeSB2ZSB2w73FoWkgXCIgKyBwcmVkcGlzeS50b1N0cmluZygpICsgXCIuIFxcbiBDaGNldGUgcG9rcmHEjW92YXQgPyBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldCA9IFwibm9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYVR5cHVQb2hsZWRhdmt5KGRhdGFQcm9abWVudSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXRJeHApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXRJeHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC56bWVuYVR5cHVQb2hsZWRhdmt5KGRhdGFQcm9abWVudSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJldEl4cCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmV0SXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgeyBkZWYucmVqZWN0KCk7IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnJlc29sdmUoZGF0YVByb1ptZW51KS5wcm9taXNlKCk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgem1lbmFUeXB1UG9obGVkYXZreShkYXRhUHJvWm1lbnU6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdabWVuYVR5cHVQb2hsZWRhdmt5RHRvKTogSlF1ZXJ5UHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRvdGF6TmFBa3Rpdml0dVB1dm9kbmlob1ByaXBhZHUoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHVrb25jaXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhUHJvWm1lbnUudWtvbl9wdXYgPSB1a29uY2l0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6Egem3Em25hIHR5cHUgcG9obGVkw6F2a3kuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkUHJldm9keS56bWVuYVR5cHVQb2hsZWRhdmt5KHJxID0+IHsgcmV0dXJuIHsgZGF0YTogZGF0YVByb1ptZW51IH07IH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXQucmVzdWx0LmRhdGEuaXhwX25vdnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uQmFzZS5nZXRGYWlsRnJvbUlzbFByb21pc2UodGhhdCwganFYSFIsIHR5cCwgb2JqKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb3Rhek5hQWt0aXZpdHVQdXZvZG5paG9QcmlwYWR1KCk6IEpRdWVyeVByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAvLyBqZXN0ZSBkb3RheiBuYSB0byB6ZGEgY2hjaSBwcmlwYWQgbmVjaGF0IGFrdGl2bmkgbmVibyBuZVxyXG4gICAgICAgICAgICB2YXIgdWtvbmNpdCA9IDA7XHJcbiAgICAgICAgICAgIC8vIGRvdGF6XHJcbiAgICAgICAgICAgIC8vSWYgZ2ZfSG9kbm90YVBhcmFtZXRydURCTignZGRwX3Jlel9wcmV2b2QnKSA9IDAgQU5EIGxfc2FsZG8gPSAwXHJcbiAgICAgICAgICAgIHZhciBsX251bGE6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgdmFyIGxfc2FsZG86IERlY2ltYWwgPSBuZXcgRGVjaW1hbCh0aGF0LlNhbGRvKTtcclxuICAgICAgICAgICAgaWYgKCh0aGF0LkRkcFBhcmFtcy5kZHBfcmV6X3ByZXZvZCA9PSAwKSAmJiAobF9zYWxkby5lcShsX251bGEpKSkge1xyXG4gICAgICAgICAgICAgICAgLy9cdElmIGdmX0hvZG5vdGFQYXJhbWV0cnVEQk4oJ2RkcF9yZXpfcHJlenJ1JykgPSAwXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5EZHBQYXJhbXMuZGRwX3Jlel9wcmV6cnUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiVXBvem9ybsSbbsOtXCIsIFwiQ2hjZXRlIHDFr3ZvZG7DrSBwxZnDrXBhZCBwb25lY2hhdCBha3Rpdm7DrT8gXFxuIFBva3VkIG9kcG92w610ZSBBbm8sIHDFmcOtcGFkIHrFr3N0YW5lIHphY2hvdsOhbiwgcG9rdWQgb2Rwb3bDrXRlIE5lLCBwxa92b2Ruw60gcMWZw61wYWQgYnVkZSB1a29uxI1lbi5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXQgPSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWtvbmNpdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVrb25jaXQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodWtvbmNpdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0LkRkcFBhcmFtcy5kZHBfcmV6X3ByZXpydSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWtvbmNpdCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHVrb25jaXQpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5EZHBQYXJhbXMuZGRwX3Jlel9wcmV6cnUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHVrb25jaXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSh1a29uY2l0KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHVrb25jaXQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSh1a29uY2l0KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUodWtvbmNpdCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIEEgQyBUIEkgTyBOIFMgLSBWIFkgVCBWIE8gxZggRSBOIMONICBBICBEIEUgRiBJIE4gSSBDIEVcclxuICAgIH1cclxufSJdfQ==