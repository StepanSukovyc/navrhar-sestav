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
            let GUzaverkaObdobi = 
            /**
             *  Uzaverka ucetniho obdobi
             */
            class GUzaverkaObdobi extends Gordic.GContentBase {
                constructor() {
                    /**
                     * Ajax property
                     *
                     */
                    //public model: Gordic.Inu.Interface.GEkoskhlDto;
                    super(...arguments);
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                    /**
                     * Obecne property
                     *
                     *
                     */
                    this.myLoading = false;
                    this.refresh = false;
                }
                onContentReady() {
                    var that = this;
                    that.createAction();
                    // Tlacitko zavrit
                    that.commandBar([
                        { action: this.actions.actZavrit },
                    ]);
                    this.menuBar([
                        { action: this.actions.actStart, favorite: true },
                        { action: this.actions.actStartAnulace, favorite: true },
                        {
                            id: "actUcetnictvi",
                            type: "static",
                            caption: "jres:30250186", //RC 30250186 : Účetnictví
                            favorite: true,
                            //enabled: false,
                            children: [
                                {
                                    action: that.actions.actZavZapis,
                                },
                                {
                                    action: that.actions.actZavZapisAnulace,
                                },
                                {
                                    action: that.actions.actUzUcetKnih,
                                },
                                {
                                    action: that.actions.actUzUcetKnihAnulace,
                                },
                                {
                                    action: that.actions.actOtevreniUcetnichKnih,
                                },
                                {
                                    action: that.actions.actOtevreniUcetnichKnihAnulace,
                                },
                            ]
                        },
                        {
                            id: "acRozpocet",
                            type: "static",
                            caption: "jres:30250246", //RC 30250246 : Rozpočet
                            favorite: true,
                            //enabled: false,
                            children: [
                                {
                                    action: that.actions.actUzavreniRozpoctu,
                                },
                                {
                                    action: that.actions.actUzavreniRozpoctuAnulace,
                                },
                                {
                                    action: that.actions.actOtevreniENNV,
                                },
                                {
                                    action: that.actions.actOtevrenuENNVAnulace,
                                },
                            ]
                        },
                        {
                            action: that.actions.actPresunUzavrenychDat, favorite: true
                        },
                        {
                            action: that.actions.actPresunUzavrenychDatAnulace, favorite: true
                        },
                        {
                            action: that.actions.actArchivaceAgendovuchKnih, favorite: true
                        },
                    ]);
                    this.NastaveniAkci(that.povoleniAkci);
                }
                /**
                 * Nacteni prav
                 *
                 *
                 * */
                loadPermit() {
                    var that = this;
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.povoleniAkci()
                        .get()
                        .then((result) => {
                        that.povoleniAkci = result;
                    });
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createAction() {
                    var that = this;
                    this.actions.addRange({
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: () => {
                                {
                                    that.tryClose();
                                }
                            }
                        }),
                        actStart: {
                            name: "actStart",
                            caption: "jres:30250177", //RC 30250177 : Zahájit uzávěrku
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.StartUzaverky();
                                //that.reload();
                            }
                        },
                        actStartAnulace: {
                            name: "actStartAnulace",
                            caption: "jres:30250178", //RC 30250178 : Anulovat zahájení uzávěrky
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.AnulaceStartUzaverky();
                                //that.reload();
                            }
                        },
                        actZavZapis: {
                            name: "actZavZapis",
                            caption: "jres:30250182", //RC 30250182 : Závěrečné účetní zápisy
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.StartAkce(0 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.ZaverecneUcetniZapisy */);
                                //that.reload();
                            }
                        },
                        actZavZapisAnulace: {
                            name: "actZavZapisAnulace",
                            caption: "jres:30250183", //RC 30250183 : Anulovat závěrečné účetní zápisy
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250213") //RC 30250213 : Opravdu chcete provést anulování závěrečných zápisů ?
                                    .done((result) => {
                                    if (result === "YES")
                                        that.AnulaceZapisuUct();
                                });
                            }
                        },
                        actUzUcetKnih: {
                            name: "actUzUcetKnih",
                            caption: "jres:30250187", //RC 30250187 : Uzavření účetních knih
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.StartAkce(1 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.UzavreniUcetnichKnih */);
                                //that.reload();
                            }
                        },
                        actUzUcetKnihAnulace: {
                            name: "actUzUcetKnihAnulace",
                            caption: "jres:30250188", //RC 30250188 : Anulovat uzavření účetních knih
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250227") //RC 30250227 : Opravdu chcete provést anulování zápisů uzavření knih?
                                    .done((result) => {
                                    if (result === "YES")
                                        that.AnulaceZapisuUzavreniKnih();
                                });
                            }
                        },
                        actOtevreniUcetnichKnih: {
                            name: "actOtevreniUcetnichKnih",
                            caption: "jres:30250184", //RC 30250184 : Otevření účetních knih
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.StartAkce(2 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.OtevreniUcetnichKnih */);
                                //that.reload();
                            }
                        },
                        actOtevreniUcetnichKnihAnulace: {
                            name: "actOtevreniUcetnichKnihAnulace",
                            caption: "jres:30250185", //RC 30250185 : Anulovat otevření účetních knih
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250245") //RC 30250245 : Opravdu chcete provést anulování zápisů otevření knih?
                                    .done((result) => {
                                    if (result === "YES")
                                        that.AnulaceZapisuOtevreniKnih();
                                });
                            }
                        },
                        actUzavreniRozpoctuAnulace: {
                            name: "actUzavreniRozpoctuAnulace",
                            caption: "jres:30250248", //RC 30250248 : Anulovat uzavřeni rozpočtu
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250274") //RC 30250274 : Opravdu chcete provést anulování zápisů uzavření knih ROZ?
                                    .done((result) => {
                                    if (result === "YES")
                                        that.AnulaceUzavreniRozpoctu();
                                });
                                //that.reload();
                            }
                        },
                        actUzavreniRozpoctu: {
                            name: "actUzavreniRozpoctu",
                            caption: "jres:30250247", //RC 30250247 : Uzavření rozpočtu
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.StartAkce(3 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.UzavreniRozpoctu */);
                            }
                        },
                        actOtevrenuENNVAnulace: {
                            name: "actOtevrenuEENVAnulace",
                            caption: "jres:30250250", //RC 30250250 : Anulovat otevření ENNV
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250269") //RC 30250269 : Opravdu chcete provést anulování zápisů otevření knih ROZ?
                                    .done((result) => {
                                    if (result === "YES")
                                        that.AnulaceOtevreniENNV();
                                });
                            }
                        },
                        actOtevreniENNV: {
                            name: "acOtevreniENNV",
                            caption: "jres:30250249", //RC 30250249 : Otevření ENNV
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.StartAkce(4 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.OtevreniENNV */);
                            }
                        },
                        actPresunUzavrenychDat: {
                            name: "actPresunUzavrenychDat",
                            caption: "jres:30250275", //RC 30250275 : Přesun uzavřených dat
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250278") //RC 30250278 : Opravdu chcete provést přesun dat do archivních prostorů? Jde o časově náročnou operaci vyžadující nepřítomnost uživatelů v databázi!!!
                                    .done((result) => {
                                    if (result === "YES")
                                        that.PresunArchivnichDat();
                                });
                            }
                        },
                        actPresunUzavrenychDatAnulace: {
                            name: "actPresunUzavrenychDatAnulace",
                            caption: "jres:30250280", //RC 30250280 : Anulovat přesun dat
                            tooltip: "",
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                Gordic.Eko.WebClient.Common.Dotaz(that, "jres:30250281") //RC 30250281 : Opravdu chcete provést anulaci přesunu dat do archivních prostorů?;Jde o časově náročnou operaci vyžadující nepřítomnost uživatelů v databázi!!!
                                    .done((result) => {
                                    if (result === "YES")
                                        that.PresunArchivnichDat();
                                });
                            }
                        },
                        actArchivaceAgendovuchKnih: {
                            name: "actArchivaceAgendovuchKnih",
                            caption: "jres:30450040", //RC 30450040 : Archivace knih
                            tooltip: "jres:30250276", //RC 30250276 : Archivace agendových knih
                            //icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                            enabled: true,
                            run: function () {
                                that.navigate("Gordic.Inu.WebClient.GArchivaceKnih");
                            }
                        },
                    });
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci(povoleniAkci = null) {
                    var that = this;
                    var deferrer = $.Deferred();
                    if (povoleniAkci == null) {
                        that.loadPermit().done(() => {
                            povoleniAkci = that.povoleniAkci;
                            deferrer.resolve();
                        });
                    }
                    else
                        deferrer.resolve();
                    deferrer.done(() => {
                        this.actions.actStart?.updatePermission(povoleniAkci?.ZacatekUzaverky);
                        this.actions.actStartAnulace?.updatePermission(povoleniAkci?.ZacatekUzaverkyAnulace);
                        this.actions.actZavZapis?.updatePermission(povoleniAkci?.ZaverecneUcetniZapisy);
                        this.actions.actZavZapisAnulace?.updatePermission(povoleniAkci?.ZaverecneUcetniZapisyAnulace);
                        this.actions.actUzUcetKnih?.updatePermission(povoleniAkci?.UzavreniUcetnichKnih);
                        this.actions.actUzUcetKnihAnulace?.updatePermission(povoleniAkci?.UzavreniUcetnichKnihAnulace);
                        this.actions.actOtevreniUcetnichKnih?.updatePermission(povoleniAkci?.OtevreniUcetnichKnih);
                        this.actions.actOtevreniUcetnichKnihAnulace?.updatePermission(povoleniAkci?.OtevreniUcetnichKnihAnulace);
                        this.actions.actUzavreniRozpoctu?.updatePermission(povoleniAkci?.UzavreniRozpoctu);
                        this.actions.actUzavreniRozpoctuAnulace?.updatePermission(povoleniAkci?.UzavreniRozpoctuAnulace);
                        this.actions.actOtevreniENNV?.updatePermission(povoleniAkci?.OtevreniENNV);
                        this.actions.actOtevrenuENNVAnulace?.updatePermission(povoleniAkci?.OtevreniENNVAnulace);
                        this.actions.actPresunUzavrenychDat?.updatePermission(povoleniAkci?.PresunUzavrenychDat);
                        this.actions.actPresunUzavrenychDatAnulace?.updatePermission(povoleniAkci?.PresunUzavrenychDatAnulace);
                        this.actions.actArchivaceAgendovuchKnih?.updatePermission(povoleniAkci?.ArchivaceAgendovychKnih);
                        deferrer.resolve().promise();
                    });
                    //this.actions.actUlozit?.updatePermission(this.priznatPermit);
                    //this.actions.actUlozit?.update({ ennabled: false });
                    return deferrer.promise();
                }
                /**
                 * Start akce uzaverky
                 *
                 * @param vstup
                 */
                StartAkce(vstup) {
                    var that = this;
                    that.navigate("Gordic.Inu.WebClient.GInuAkceUzav", { akce: vstup })
                        .on("close", function (content, par) {
                        that.NastaveniAkci();
                        $.Deferred().resolve();
                    });
                    return $.Deferred().promise();
                }
                /**
                 * Zacetek uzaverky
                 * @param deferrer
                 */
                PresunArchivnichDat(deferrer) {
                    var that = this;
                    //that.actions
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred();
                        that.beginOperation("jres:30250277"); //RC 30250277 : Provádím přesun dat do archivních prostorů
                    }
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.presunDatDoArchivu()
                        .get()
                        .then((result) => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250279" //RC 30250279 : Přesun dat do archivních prostorů byl proveden
                        );
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.PresunArchivnichDat(deferrer);
                                    }
                                    else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                });
                                return deferrer.promise();
                            }
                        }
                        that.endOperation();
                    });
                }
                /**
                 * Zacetek uzaverky
                 * @param vstup
                 * @param deferrer
                 */
                StartUzaverky(vstup, deferrer) {
                    var that = this;
                    //that.actions
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred();
                        that.beginOperation("jres:30250181"); //RC 30250181 : Provádění akce...
                        vstup = {};
                    }
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.zacatekRocniUzaverky({ rq: vstup })
                        .get()
                        .then((result) => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250174" //RC 30250174 : Období bylo připraveno k uzávěrce
                        );
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, vstup, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        vstup.Nastaveni = returnValue.Nastaveni; //transMsg.Nastaveni;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.StartUzaverky(vstup, deferrer);
                                    }
                                    else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                });
                                return deferrer.promise();
                            }
                        }
                        that.endOperation();
                    });
                }
                /**
                 * Anulace startu uzaverky
                 * @param vstup
                 * @param deferrer
                 */
                AnulaceStartUzaverky(vstup, deferrer) {
                    var that = this;
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred();
                        that.beginOperation("jres:30250253"); //RC 30250253 : Probíhá anulování uzávěrky...
                        vstup = {};
                    }
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.zruseniRocniUzaverky({ rq: vstup })
                        .get()
                        .then((result) => {
                        that.endOperation();
                        that.showFlash({ label: "jres:30250179", state: "success" }); //RC 30250179 : Uzávěrka byla anulována
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, vstup, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        vstup.Nastaveni = returnValue.Nastaveni; //transMsg.Nastaveni;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.AnulaceStartUzaverky(vstup, deferrer);
                                    }
                                    else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                });
                                return deferrer.promise();
                            }
                        }
                        that.endOperation();
                    });
                }
                /**
                 * Anulace zapisu
                 *
                 */
                AnulaceZapisuUct() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250254"); //RC 30250254 : Probíhá anulování závěrečných zápisů, čekejte prosím
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZaverZapisuAnulace()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250212".format(this.GlobalParams.EkoParams?.UCS) //RC 30250212 : Vrácení uzávěrky - závěrečné zápisy - UCS: {0} - proběhlo OK.
                        );
                        //that.refresh();
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                });
                                return deferrer.promise();
                            }
                        }
                        that.endOperation();
                    });
                }
                /**
                 * Anulace zapisu uzavreni knih
                 *
                 */
                AnulaceZapisuUzavreniKnih() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250226"); //RC 30250226 : Probíhá anulace zápisů uzavření knih, čekejte prosím.
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.zapisyUzavreniKnihAnulace()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250228".format(this.GlobalParams.EkoParams?.UCS) //RC 30250228 : Vrácení uzávěrky - zápisy uzavření knih - UCS: {0} - proběhlo OK.
                        );
                        //that.refresh();
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                });
                                return deferrer.promise();
                            }
                        }
                        that.endOperation();
                    });
                }
                /**
                 * Anulace zapisu otevreni
                 *
                 */
                AnulaceZapisuOtevreniKnih() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250244"); //RC 30250244 : Probíhá anulace zápisů otevření knih, čekejte prosím.
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZapisyOtevreniKnihAnulace()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250243".format(this.GlobalParams.EkoParams?.UCS) //RC 30250243 : Vrácení uzávěrky - zápisů otevření knih - UCS: {0} - proběhlo OK.
                        );
                        //that.refresh();
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                });
                                return deferrer.promise();
                            }
                        }
                        that.endOperation();
                    });
                }
                /**
                 * Anulace zapisu uzavreni rozpoctu
                 *
                 */
                AnulaceUzavreniRozpoctu() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250292"); //RC 30250292 : Probíhá anulování zápisů uzavření knih ROZ, čekejte prosím.
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZapisyUzavreniROZuAnulace()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250273".format(this.GlobalParams.EkoParams?.UCS) //RC 30250273 :  Vrácení uzávěrky - zápisy uzavření knih ROZ - UCS: {0} - proběhlo OK.
                        );
                        //that.refresh();
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                });
                                return deferrer.promise();
                            }
                        }
                        that.endOperation();
                    });
                }
                /**
                 * Anulace zapisu otevreni ENNV rozpoctu
                 *
                 */
                AnulaceOtevreniENNV() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250291"); //RC 30250291 : Probíhá anulování zápisů otevření knih ROZ, čekejte prosím.
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZapisyOtevreniENNVAnulace()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250290".format(this.GlobalParams.EkoParams?.UCS) //RC 30250290 : Vrácení uzávěrky - zápisy otevření knih ROZ - UCS: {0} - proběhlo OK.
                        );
                        //that.refresh();
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                });
                                return deferrer.promise();
                            }
                        }
                        that.endOperation();
                    });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    // pokud se needituje, je možné detail zavřít
                    def.resolve({ refresh: typeof that.refresh !== "undefined" && that.refresh === true });
                    return def.promise();
                }
            };
            GUzaverkaObdobi = __decorate([
                gcontent
                /**
                 *  Uzaverka ucetniho obdobi
                 */
            ], GUzaverkaObdobi);
            WebClient.GUzaverkaObdobi = GUzaverkaObdobi;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1V6YXZlcmthT2Jkb2JpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1V6YXZlcmthT2Jkb2JpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FvMUJmO0FBcDFCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvMUJuQjtJQXAxQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW8xQjdCO1FBcDFCb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFNbkMsSUFBYSxlQUFlO1lBSDVCOztlQUVHO1lBQ0gsTUFBYSxlQUFnQixTQUFRLE9BQUEsWUFBWTtnQkFBakQ7b0JBQ0k7Ozt1QkFHRztvQkFDSCxpREFBaUQ7O29CQU96QyxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO29CQUNqRDs7Ozt1QkFJRztvQkFDSSxjQUFTLEdBQVksS0FBSyxDQUFDO29CQUkzQixZQUFPLEdBQUcsS0FBSyxDQUFDO2dCQXN6QjNCLENBQUM7Z0JBcHpCRyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFHaEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUVwQixrQkFBa0I7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUM7d0JBQ1osRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7cUJBQ3JDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNULEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7d0JBQ2pELEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7d0JBQ3hEOzRCQUNJLEVBQUUsRUFBRSxlQUFlOzRC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bnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIC8qKlxyXG4gICAgICogIFV6YXZlcmthIHVjZXRuaWhvIG9iZG9iaVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1V6YXZlcmthT2Jkb2JpIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBamF4IHByb3BlcnR5XHJcbiAgICAgICAgICogIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIC8vcHVibGljIG1vZGVsOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRWtvc2tobER0bztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwb3ZvbGVuaUFrY2k6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVVemF2ZXJreVBvdm9sZW5pUmVzcG9uc2VEdG87XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2xvYmFsbmkgbmFzdGF2ZW5pXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICByZWFkb25seSBHbG9iYWxQYXJhbXM6IEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbnVHbG9iYWxEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9iZWNuZSBwcm9wZXJ0eVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBteUxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcHVibGljIHJlZnJlc2ggPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUbGFjaXRrbyB6YXZyaXRcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0WmF2cml0IH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RTdGFydCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0U3RhcnRBbnVsYWNlLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImFjdFVjZXRuaWN0dmlcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE4NlwiLCAvL1JDIDMwMjUwMTg2IDogw5rEjWV0bmljdHbDrVxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0WmF2WmFwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFphdlphcGlzQW51bGFjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VXpVY2V0S25paCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VXpVY2V0S25paEFudWxhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE90ZXZyZW5pVWNldG5pY2hLbmloLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPdGV2cmVuaVVjZXRuaWNoS25paEFudWxhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJhY1JvenBvY2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNDZcIiwgLy9SQyAzMDI1MDI0NiA6IFJvenBvxI1ldFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VXphdnJlbmlSb3pwb2N0dSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VXphdnJlbmlSb3pwb2N0dUFudWxhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE90ZXZyZW5pRU5OVixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T3RldnJlbnVFTk5WQW51bGFjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFByZXN1blV6YXZyZW55Y2hEYXQsIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFByZXN1blV6YXZyZW55Y2hEYXRBbnVsYWNlLCBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RBcmNoaXZhY2VBZ2VuZG92dWNoS25paCwgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5OYXN0YXZlbmlBa2NpKHRoYXQucG92b2xlbmlBa2NpKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWN0ZW5pIHByYXZcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZFBlcm1pdCgpOiBKUXVlcnkuUHJvbWlzZTxhbnksYW55LGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS5wb3ZvbGVuaUFrY2koKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb3ZvbGVuaUFrY2kgPSByZXN1bHQ7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGF0LnRyeUNsb3NlKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFN0YXJ0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTdGFydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE3N1wiLCAvL1JDIDMwMjUwMTc3IDogWmFow6FqaXQgdXrDoXbEm3JrdVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ub2JjZXJzdHZpdCxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlN0YXJ0VXphdmVya3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFN0YXJ0QW51bGFjZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U3RhcnRBbnVsYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTc4XCIsIC8vUkMgMzAyNTAxNzggOiBBbnVsb3ZhdCB6YWjDoWplbsOtIHV6w6F2xJtya3lcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLm9iY2Vyc3R2aXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5BbnVsYWNlU3RhcnRVemF2ZXJreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFphdlphcGlzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RaYXZaYXBpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE4MlwiLCAvL1JDIDMwMjUwMTgyIDogWsOhdsSbcmXEjW7DqSDDusSNZXRuw60gesOhcGlzeVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ub2JjZXJzdHZpdCxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlN0YXJ0QWtjZShHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5aYXZlcmVjbmVVY2V0bmlaYXBpc3kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFphdlphcGlzQW51bGFjZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WmF2WmFwaXNBbnVsYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTgzXCIsIC8vUkMgMzAyNTAxODMgOiBBbnVsb3ZhdCB6w6F2xJtyZcSNbsOpIMO6xI1ldG7DrSB6w6FwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5vYmNlcnN0dml0LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Eb3Rheih0aGF0LCBcImpyZXM6MzAyNTAyMTNcIikgLy9SQyAzMDI1MDIxMyA6IE9wcmF2ZHUgY2hjZXRlIHByb3bDqXN0IGFudWxvdsOhbsOtIHrDoXbEm3JlxI1uw71jaCB6w6FwaXPFryA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZRVNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5BbnVsYWNlWmFwaXN1VWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0VXpVY2V0S25paDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VXpVY2V0S25paFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE4N1wiLCAvL1JDIDMwMjUwMTg3IDogVXphdsWZZW7DrSDDusSNZXRuw61jaCBrbmloXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5vYmNlcnN0dml0LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuU3RhcnRBa2NlKEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5LlV6YXZyZW5pVWNldG5pY2hLbmloKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFV6VWNldEtuaWhBbnVsYWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVelVjZXRLbmloQW51bGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE4OFwiLCAvL1JDIDMwMjUwMTg4IDogQW51bG92YXQgdXphdsWZZW7DrSDDusSNZXRuw61jaCBrbmloXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5vYmNlcnN0dml0LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Eb3Rheih0aGF0LCBcImpyZXM6MzAyNTAyMjdcIikgLy9SQyAzMDI1MDIyNyA6IE9wcmF2ZHUgY2hjZXRlIHByb3bDqXN0IGFudWxvdsOhbsOtIHrDoXBpc8WvIHV6YXbFmWVuw60ga25paD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBcIllFU1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LkFudWxhY2VaYXBpc3VVemF2cmVuaUtuaWgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgYWN0T3RldnJlbmlVY2V0bmljaEtuaWg6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE90ZXZyZW5pVWNldG5pY2hLbmloXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTg0XCIsIC8vUkMgMzAyNTAxODQgOiBPdGV2xZllbsOtIMO6xI1ldG7DrWNoIGtuaWhcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLm9iY2Vyc3R2aXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5TdGFydEFrY2UoR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuT3RldnJlbmlVY2V0bmljaEtuaWgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T3RldnJlbmlVY2V0bmljaEtuaWhBbnVsYWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPdGV2cmVuaVVjZXRuaWNoS25paEFudWxhY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxODVcIiwgLy9SQyAzMDI1MDE4NSA6IEFudWxvdmF0IG90ZXbFmWVuw60gw7rEjWV0bsOtY2gga25paFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ub2JjZXJzdHZpdCxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRG90YXoodGhhdCwgXCJqcmVzOjMwMjUwMjQ1XCIpIC8vUkMgMzAyNTAyNDUgOiBPcHJhdmR1IGNoY2V0ZSBwcm92w6lzdCBhbnVsb3bDoW7DrSB6w6FwaXPFryBvdGV2xZllbsOtIGtuaWg/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZRVNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5BbnVsYWNlWmFwaXN1T3RldnJlbmlLbmloKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VXphdnJlbmlSb3pwb2N0dUFudWxhY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFV6YXZyZW5pUm96cG9jdHVBbnVsYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjQ4XCIsIC8vUkMgMzAyNTAyNDggOiBBbnVsb3ZhdCB1emF2xZllbmkgcm96cG/EjXR1XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5vYmNlcnN0dml0LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Eb3Rheih0aGF0LCBcImpyZXM6MzAyNTAyNzRcIikgLy9SQyAzMDI1MDI3NCA6IE9wcmF2ZHUgY2hjZXRlIHByb3bDqXN0IGFudWxvdsOhbsOtIHrDoXBpc8WvIHV6YXbFmWVuw60ga25paCBST1o/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZRVNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5BbnVsYWNlVXphdnJlbmlSb3pwb2N0dSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RVemF2cmVuaVJvenBvY3R1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVemF2cmVuaVJvenBvY3R1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjQ3XCIsIC8vUkMgMzAyNTAyNDcgOiBVemF2xZllbsOtIHJvenBvxI10dVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ub2JjZXJzdHZpdCxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlN0YXJ0QWtjZShHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5VemF2cmVuaVJvenBvY3R1KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T3RldnJlbnVFTk5WQW51bGFjZToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T3RldnJlbnVFRU5WQW51bGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI1MFwiLCAvL1JDIDMwMjUwMjUwIDogQW51bG92YXQgb3RldsWZZW7DrSBFTk5WXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5vYmNlcnN0dml0LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Eb3Rheih0aGF0LCBcImpyZXM6MzAyNTAyNjlcIikgLy9SQyAzMDI1MDI2OSA6IE9wcmF2ZHUgY2hjZXRlIHByb3bDqXN0IGFudWxvdsOhbsOtIHrDoXBpc8WvIG90ZXbFmWVuw60ga25paCBST1o/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZRVNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5BbnVsYWNlT3RldnJlbmlFTk5WKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE90ZXZyZW5pRU5OVjoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNPdGV2cmVuaUVOTlZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNDlcIiwgLy9SQyAzMDI1MDI0OSA6IE90ZXbFmWVuw60gRU5OVlxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ub2JjZXJzdHZpdCxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuU3RhcnRBa2NlKEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5Lk90ZXZyZW5pRU5OVik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByZXN1blV6YXZyZW55Y2hEYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByZXN1blV6YXZyZW55Y2hEYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzVcIiwgLy9SQyAzMDI1MDI3NSA6IFDFmWVzdW4gdXphdsWZZW7DvWNoIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ub2JjZXJzdHZpdCxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRG90YXoodGhhdCwgXCJqcmVzOjMwMjUwMjc4XCIpIC8vUkMgMzAyNTAyNzggOiBPcHJhdmR1IGNoY2V0ZSBwcm92w6lzdCBwxZllc3VuIGRhdCBkbyBhcmNoaXZuw61jaCBwcm9zdG9yxa8/IEpkZSBvIMSNYXNvdsSbIG7DoXJvxI1ub3Ugb3BlcmFjaSB2ecW+YWR1asOtY8OtIG5lcMWZw610b21ub3N0IHXFvml2YXRlbMWvIHYgZGF0YWLDoXppISEhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gXCJZRVNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmVzdW5BcmNoaXZuaWNoRGF0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByZXN1blV6YXZyZW55Y2hEYXRBbnVsYWNlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmVzdW5VemF2cmVueWNoRGF0QW51bGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI4MFwiLCAvL1JDIDMwMjUwMjgwIDogQW51bG92YXQgcMWZZXN1biBkYXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLm9iY2Vyc3R2aXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkRvdGF6KHRoYXQsIFwianJlczozMDI1MDI4MVwiKSAvL1JDIDMwMjUwMjgxIDogT3ByYXZkdSBjaGNldGUgcHJvdsOpc3QgYW51bGFjaSBwxZllc3VudSBkYXQgZG8gYXJjaGl2bsOtY2ggcHJvc3RvcsWvPztKZGUgbyDEjWFzb3bEmyBuw6Fyb8SNbm91IG9wZXJhY2kgdnnFvmFkdWrDrWPDrSBuZXDFmcOtdG9tbm9zdCB1xb5pdmF0ZWzFryB2IGRhdGFiw6F6aSEhIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IFwiWUVTXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJlc3VuQXJjaGl2bmljaERhdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RBcmNoaXZhY2VBZ2VuZG92dWNoS25paDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0QXJjaGl2YWNlQWdlbmRvdnVjaEtuaWhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzA0NTAwNDBcIiwgLy9SQyAzMDQ1MDA0MCA6IEFyY2hpdmFjZSBrbmloXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwMjc2XCIsIC8vUkMgMzAyNTAyNzYgOiBBcmNoaXZhY2UgYWdlbmRvdsO9Y2gga25paFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLm9iY2Vyc3R2aXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdBcmNoaXZhY2VLbmloXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBOYXN0YXZlbmlBa2NpKHBvdm9sZW5pQWtjaTogR29yZGljLkludS5JbnRlcmZhY2UuR0ludVV6YXZlcmt5UG92b2xlbmlSZXNwb25zZUR0byB8IG51bGwgPSBudWxsKTogSlF1ZXJ5LlByb21pc2U8YW55LCBhbnksIGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgaWYgKHBvdm9sZW5pQWtjaSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmxvYWRQZXJtaXQoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBwb3ZvbGVuaUFrY2kgPSB0aGF0LnBvdm9sZW5pQWtjaTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICBkZWZlcnJlci5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RTdGFydD8udXBkYXRlUGVybWlzc2lvbihwb3ZvbGVuaUFrY2k/LlphY2F0ZWtVemF2ZXJreSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0U3RhcnRBbnVsYWNlPy51cGRhdGVQZXJtaXNzaW9uKHBvdm9sZW5pQWtjaT8uWmFjYXRla1V6YXZlcmt5QW51bGFjZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0WmF2WmFwaXM/LnVwZGF0ZVBlcm1pc3Npb24ocG92b2xlbmlBa2NpPy5aYXZlcmVjbmVVY2V0bmlaYXBpc3kpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFphdlphcGlzQW51bGFjZT8udXBkYXRlUGVybWlzc2lvbihwb3ZvbGVuaUFrY2k/LlphdmVyZWNuZVVjZXRuaVphcGlzeUFudWxhY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFV6VWNldEtuaWg/LnVwZGF0ZVBlcm1pc3Npb24ocG92b2xlbmlBa2NpPy5VemF2cmVuaVVjZXRuaWNoS25paCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VXpVY2V0S25paEFudWxhY2U/LnVwZGF0ZVBlcm1pc3Npb24ocG92b2xlbmlBa2NpPy5VemF2cmVuaVVjZXRuaWNoS25paEFudWxhY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE90ZXZyZW5pVWNldG5pY2hLbmloPy51cGRhdGVQZXJtaXNzaW9uKHBvdm9sZW5pQWtjaT8uT3RldnJlbmlVY2V0bmljaEtuaWgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE90ZXZyZW5pVWNldG5pY2hLbmloQW51bGFjZT8udXBkYXRlUGVybWlzc2lvbihwb3ZvbGVuaUFrY2k/Lk90ZXZyZW5pVWNldG5pY2hLbmloQW51bGFjZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VXphdnJlbmlSb3pwb2N0dT8udXBkYXRlUGVybWlzc2lvbihwb3ZvbGVuaUFrY2k/LlV6YXZyZW5pUm96cG9jdHUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFV6YXZyZW5pUm96cG9jdHVBbnVsYWNlPy51cGRhdGVQZXJtaXNzaW9uKHBvdm9sZW5pQWtjaT8uVXphdnJlbmlSb3pwb2N0dUFudWxhY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE90ZXZyZW5pRU5OVj8udXBkYXRlUGVybWlzc2lvbihwb3ZvbGVuaUFrY2k/Lk90ZXZyZW5pRU5OVik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0T3RldnJlbnVFTk5WQW51bGFjZT8udXBkYXRlUGVybWlzc2lvbihwb3ZvbGVuaUFrY2k/Lk90ZXZyZW5pRU5OVkFudWxhY2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFByZXN1blV6YXZyZW55Y2hEYXQ/LnVwZGF0ZVBlcm1pc3Npb24ocG92b2xlbmlBa2NpPy5QcmVzdW5VemF2cmVueWNoRGF0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RQcmVzdW5VemF2cmVueWNoRGF0QW51bGFjZT8udXBkYXRlUGVybWlzc2lvbihwb3ZvbGVuaUFrY2k/LlByZXN1blV6YXZyZW55Y2hEYXRBbnVsYWNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RBcmNoaXZhY2VBZ2VuZG92dWNoS25paD8udXBkYXRlUGVybWlzc2lvbihwb3ZvbGVuaUFrY2k/LkFyY2hpdmFjZUFnZW5kb3Z5Y2hLbmloKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVyLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL3RoaXMuYWN0aW9ucy5hY3RVbG96aXQ/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5wcml6bmF0UGVybWl0KTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0VWxveml0Py51cGRhdGUoeyBlbm5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTdGFydCBha2NlIHV6YXZlcmt5ICAgICAgICAgIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB2c3R1cFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgU3RhcnRBa2NlKHZzdHVwOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreSk6IEpRdWVyeS5Qcm9taXNlPGFueSwgYW55LCBhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0ludUFrY2VVemF2XCIsIHsgYWtjZTogdnN0dXAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChjb250ZW50LCBwYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTsgJC5EZWZlcnJlZCgpLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphY2V0ZWsgdXphdmVya3lcclxuICAgICAgICAgKiBAcGFyYW0gZGVmZXJyZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFByZXN1bkFyY2hpdm5pY2hEYXQoZGVmZXJyZXI/OiBhbnkpOiBKUXVlcnkuUHJvbWlzZTxhbnksIGFueSwgYW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy90aGF0LmFjdGlvbnNcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZlcnJlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDI3N1wiKTsgLy9SQyAzMDI1MDI3NyA6IFByb3bDoWTDrW0gcMWZZXN1biBkYXQgZG8gYXJjaGl2bsOtY2ggcHJvc3RvcsWvXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnByZXN1bkRhdERvQXJjaGl2dSgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyNzlcIiAvL1JDIDMwMjUwMjc5IDogUMWZZXN1biBkYXQgZG8gYXJjaGl2bsOtY2ggcHJvc3RvcsWvIGJ5bCBwcm92ZWRlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLG51bGwsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5QcmVzdW5BcmNoaXZuaWNoRGF0KGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWNldGVrIHV6YXZlcmt5XHJcbiAgICAgICAgICogQHBhcmFtIHZzdHVwXHJcbiAgICAgICAgICogQHBhcmFtIGRlZmVycmVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBTdGFydFV6YXZlcmt5KHZzdHVwPzogR29yZGljLkludS5JbnRlcmZhY2UuR0ludVphY2F0ZWtVemF2ZXJreVJlcXVlc3REdG8sIGRlZmVycmVyPzogYW55KTogIEpRdWVyeS5Qcm9taXNlPGFueSwgYW55LCBhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL3RoYXQuYWN0aW9uc1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmVycmVyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMTgxXCIpOyAvL1JDIDMwMjUwMTgxIDogUHJvdsOhZMSbbsOtIGFrY2UuLi5cclxuICAgICAgICAgICAgICAgIHZzdHVwID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnphY2F0ZWtSb2NuaVV6YXZlcmt5KHsgcnE6IHZzdHVwIGFzIEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVaYWNhdGVrVXphdmVya3lSZXF1ZXN0RHRvIH0pXHJcbiAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAxNzRcIiAvL1JDIDMwMjUwMTc0IDogT2Jkb2LDrSBieWxvIHDFmWlwcmF2ZW5vIGsgdXrDoXbEm3JjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIHZzdHVwLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLk5hc3RhdmVuaSA9IHJldHVyblZhbHVlLk5hc3RhdmVuaTsgLy90cmFuc01zZy5OYXN0YXZlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5TdGFydFV6YXZlcmt5KHZzdHVwLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFudWxhY2Ugc3RhcnR1IHV6YXZlcmt5XHJcbiAgICAgICAgICogQHBhcmFtIHZzdHVwXHJcbiAgICAgICAgICogQHBhcmFtIGRlZmVycmVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBBbnVsYWNlU3RhcnRVemF2ZXJreSh2c3R1cD86IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVBbnVsYWNlWmFjYXRla1V6YXZlcmt5UmVxdWVzdER0bywgZGVmZXJyZXI/OiBhbnkpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmZXJyZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAyNTNcIik7IC8vUkMgMzAyNTAyNTMgOiBQcm9iw61ow6EgYW51bG92w6Fuw60gdXrDoXbEm3JreS4uLlxyXG4gICAgICAgICAgICAgICAgdnN0dXAgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkuenJ1c2VuaVJvY25pVXphdmVya3koeyBycTogdnN0dXAgYXMgR29yZGljLkludS5JbnRlcmZhY2UuR0ludUFudWxhY2VaYWNhdGVrVXphdmVya3lSZXF1ZXN0RHRvIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDE3OVwiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSk7IC8vUkMgMzAyNTAxNzkgOiBVesOhdsSbcmthIGJ5bGEgYW51bG92w6FuYVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCB2c3R1cCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLk5hc3RhdmVuaSA9IHJldHVyblZhbHVlLk5hc3RhdmVuaTsgLy90cmFuc01zZy5OYXN0YXZlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlOy8vdHJhbnNNc2cuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LkFudWxhY2VTdGFydFV6YXZlcmt5KHZzdHVwLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbnVsYWNlIHphcGlzdSBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEFudWxhY2VaYXBpc3VVY3QoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDI1NFwiKTsgLy9SQyAzMDI1MDI1NCA6IFByb2LDrWjDoSBhbnVsb3bDoW7DrSB6w6F2xJtyZcSNbsO9Y2ggesOhcGlzxa8sIMSNZWtlanRlIHByb3PDrW1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnByb3VjdG92YW5pWmF2ZXJaYXBpc3VBbnVsYWNlKClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDIxMlwiLmZvcm1hdCh0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlVDUyEpIC8vUkMgMzAyNTAyMTIgOiBWcsOhY2Vuw60gdXrDoXbEm3JreSAtIHrDoXbEm3JlxI1uw6kgesOhcGlzeSAtIFVDUzogezB9IC0gcHJvYsSbaGxvIE9LLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbnVsYWNlIHphcGlzdSB1emF2cmVuaSBrbmloXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBBbnVsYWNlWmFwaXN1VXphdnJlbmlLbmloKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAyMjZcIik7IC8vUkMgMzAyNTAyMjYgOiBQcm9iw61ow6EgYW51bGFjZSB6w6FwaXPFryB1emF2xZllbsOtIGtuaWgsIMSNZWtlanRlIHByb3PDrW0uXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS56YXBpc3lVemF2cmVuaUtuaWhBbnVsYWNlKClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDIyOFwiLmZvcm1hdCh0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlVDUyEpIC8vUkMgMzAyNTAyMjggOiBWcsOhY2Vuw60gdXrDoXbEm3JreSAtIHrDoXBpc3kgdXphdsWZZW7DrSBrbmloIC0gVUNTOiB7MH0gLSBwcm9ixJtobG8gT0suXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIG51bGwsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFudWxhY2UgemFwaXN1IG90ZXZyZW5pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBBbnVsYWNlWmFwaXN1T3RldnJlbmlLbmloKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAyNDRcIik7IC8vUkMgMzAyNTAyNDQgOiBQcm9iw61ow6EgYW51bGFjZSB6w6FwaXPFryBvdGV2xZllbsOtIGtuaWgsIMSNZWtlanRlIHByb3PDrW0uXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkucHJvdWN0b3ZhbmlaYXBpc3lPdGV2cmVuaUtuaWhBbnVsYWNlKClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDI0M1wiLmZvcm1hdCh0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlVDUyEpIC8vUkMgMzAyNTAyNDMgOiBWcsOhY2Vuw60gdXrDoXbEm3JreSAtIHrDoXBpc8WvIG90ZXbFmWVuw60ga25paCAtIFVDUzogezB9IC0gcHJvYsSbaGxvIE9LLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbnVsYWNlIHphcGlzdSB1emF2cmVuaSByb3pwb2N0dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQW51bGFjZVV6YXZyZW5pUm96cG9jdHUoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDI5MlwiKTsgLy9SQyAzMDI1MDI5MiA6IFByb2LDrWjDoSBhbnVsb3bDoW7DrSB6w6FwaXPFryB1emF2xZllbsOtIGtuaWggUk9aLCDEjWVrZWp0ZSBwcm9zw61tLlxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnByb3VjdG92YW5pWmFwaXN5VXphdnJlbmlST1p1QW51bGFjZSgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyNzNcIi5mb3JtYXQodGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5VQ1MhKSAvL1JDIDMwMjUwMjczIDogIFZyw6FjZW7DrSB1esOhdsSbcmt5IC0gesOhcGlzeSB1emF2xZllbsOtIGtuaWggUk9aIC0gVUNTOiB7MH0gLSBwcm9ixJtobG8gT0suXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIG51bGwsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFudWxhY2UgemFwaXN1IG90ZXZyZW5pIEVOTlYgcm96cG9jdHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEFudWxhY2VPdGV2cmVuaUVOTlYoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDI5MVwiKTsgLy9SQyAzMDI1MDI5MSA6IFByb2LDrWjDoSBhbnVsb3bDoW7DrSB6w6FwaXPFryBvdGV2xZllbsOtIGtuaWggUk9aLCDEjWVrZWp0ZSBwcm9zw61tLlxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnByb3VjdG92YW5pWmFwaXN5T3RldnJlbmlFTk5WQW51bGFjZSgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyOTBcIi5mb3JtYXQodGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5VQ1MhKSAvL1JDIDMwMjUwMjkwIDogVnLDoWNlbsOtIHV6w6F2xJtya3kgLSB6w6FwaXN5IG90ZXbFmWVuw60ga25paCBST1ogLSBVQ1M6IHswfSAtIHByb2LEm2hsbyBPSy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFV6YXZpcmFuaSBva25hXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4gIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAvLyBwb2t1ZCBzZSBuZWVkaXR1amUsIGplIG1vxb5uw6kgZGV0YWlsIHphdsWZw610XHJcbiAgICAgICAgICAgIGRlZi5yZXNvbHZlKHsgcmVmcmVzaDogdHlwZW9mIHRoYXQucmVmcmVzaCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGF0LnJlZnJlc2ggPT09IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIl19