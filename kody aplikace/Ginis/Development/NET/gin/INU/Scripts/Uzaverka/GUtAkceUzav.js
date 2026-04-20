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
            let GUtAkceUzav = class GUtAkceUzav extends Gordic.GContentBase {
                constructor() {
                    //taskId = "actSeznamObdobiKHDPH";
                    //uid = "GSeznamObdobiKHDPH#";
                    /**
                     * Ajax property
                     *
                     */
                    super(...arguments);
                    /**
                     *  atribut testovani zaznamu
                     * */
                    this.tested = false;
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                onContentReady() {
                    var that = this;
                    for (var i = 0; i < that.definiceAkci.length; i++) {
                        let item = that.definiceAkci[i];
                        //var fce = function (i: number) { return () => that.startAkce(that.definiceAkci[i].ID!); };
                        let act = {
                            caption: item.Title,
                            tooltip: item.ToolTip,
                            enabled: item.Enabled,
                            visible: item.Visible,
                            icon: item.Icon,
                            name: "act" + item.ID,
                            run: function () {
                                debugger;
                                that.startAkce(item.ID);
                            },
                        };
                        if (item.ID == 2) {
                            //tisk
                            let tisk = Gordic.Eko.Action.actionTisk({
                                tema: item.Tema, name: "actPrt" + item.ID,
                                platnost: that.GlobalParams.EkoParams?.ROK?.toString().trim() + "12",
                                serverParameterMethod: "Gordic.Inu.WebClient.GUctPrintParameters:ServerParameterMethod",
                                enabled: true,
                                favorite: false,
                                reportStarting: function (rep) {
                                    rep.customDto = {
                                        Tema: rep.tema,
                                        IDSestavy: item.Filtr,
                                    };
                                }
                            });
                            this.actions.add(tisk);
                        }
                        else
                            this.actions.add(act);
                    }
                    var listAkce = this.actions.getActions();
                    var defAkMenu = [];
                    for (var i = 0; i < listAkce.length; i++) {
                        defAkMenu.push({ action: listAkce[i], favorite: true });
                    }
                    //nastavení akcí
                    this.actions.addRange({
                        //actObcerstvit: {
                        //    name: "actObcerstvit",
                        //    caption: "jres:30250039", //RC 30250039 : Občerstvit
                        //    tooltip: "",
                        //    icon: Gordic.Gin.Icons.ActionEnum.obcerstvit,
                        //    enabled: true,
                        //    run: function () {
                        //        that.refresh();
                        //    }
                        //},
                        actZavrit: Gordic.Eko.Action.actionZavrit({
                            enabled: true,
                            run: () => {
                                {
                                    that.tryClose();
                                }
                            }
                        }),
                    });
                    /////////////
                    // defincice provideru
                    let provider = new Gordic.Data.Provider((a, b) => {
                        debugger;
                        return that.reload();
                    });
                    // nastaveni procedoru na view
                    that.view = new Gordic.Data.View(that.model, { processors: { provider: provider } });
                    var tabObdobi = $("<div>")
                        .appendTo(this.element)
                        .gtab({
                        id: that.taskId + "myTabObdobi",
                        title: that.titleTab,
                        opened: true,
                        menuBar: defAkMenu
                        //menuBar: this.actions.createBar(["actProhlizeni*",  "actTisk*", "actObcerstvit*"
                        //    , "actStartAkce*"
                        //    , "actTestAkce*"
                        //    , "actDokoncitAkci*"
                        //])
                    });
                    // definicie gridu
                    let gf = that.createCols();
                    that.$grid = $("<div>")
                        .css("height", "100%")
                        .appendTo(tabObdobi)
                        .ggrid({
                        columnMode: "full",
                        data: that.view,
                        defaultProfile: { filterVisible: true, columnList: gf.columns.map((c) => c.name).join(",") },
                        selection: function (ev, objekt) {
                            debugger;
                            var radek = objekt.getSelection(false, true);
                        },
                        defaultAction: this.actions.actDetail,
                        columns: that.createCols()
                    });
                    // Tlacitko zavrit
                    that.commandBar([
                        {
                            action: this.actions.actZavrit
                        },
                    ]);
                    this.refresh();
                }
                /**
                 *  Definice sloupcu
                 *
                 * */
                createCols() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    Gordic.Eko.Grid.Column.addDruhDokladu(gridFormat, { name: "drd" });
                    Gordic.Eko.Grid.Column.addRok(gridFormat, { name: "rok" });
                    Gordic.Eko.Grid.Column.addMesic(gridFormat, { name: "mesic" });
                    Gordic.Eko.Grid.Column.addDen(gridFormat, { name: "den" });
                    Gordic.Eko.Grid.Column.addCisloDokladu(gridFormat, { name: "ac" });
                    gridFormat.addTextColumn({
                        name: "nks",
                        caption: Gordic.Consts.DbShortcuts.nks, //this.GlobalParams.Zkratky?.Nks,
                        width: 50
                    });
                    gridFormat.addSortedEkoCfuSet(this, { isEditable: false })
                        .addCurrencyColumn({
                        name: "c0",
                        //structureLead:true,
                        caption: "jres:30250237", //RC 30250237 : MD
                        width: 110,
                    })
                        .addCurrencyColumn({
                        name: "c1",
                        caption: "jres:30250284", //RC 30250284 : Dal
                        width: 110,
                    });
                    Gordic.Eko.Grid.Column.addPid(gridFormat, { name: "ixp" });
                    gridFormat.addDateColumn({
                        name: "dat_zmena",
                        caption: "jres:30250189", //RC 30250189 : Datum změny
                        width: 160
                    });
                    gridFormat.addTextColumn({
                        name: "zmenu_prov",
                        caption: "jres:30250190", //RC 30250190 : Změnu provedl
                        width: 90
                    });
                    gridFormat.addNumberColumn({
                        name: "radek_z",
                        caption: "jres:30250191", //RC 30250191 : Řádek
                        width: 40
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
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci() {
                    var dataFound = this.view.getCount() > 0;
                    var tooltip = dataFound ? "" : "jres:30250209"; //RC 30250209 : Záznamy nenalezeny
                    this.actions.actEditovat?.update({ enabled: dataFound, tooltip: tooltip });
                    //this.actions.acthlaseni?.update({ enabled: dataFound, tooltip: tooltip });
                    // KH DPH pouze pro rok 2016 a vyse
                    debugger;
                    this.actions.actKontrolaKH?.update({ enabled: dataFound && this.GlobalParams.EkoParams?.ROK >= 2016, visible: this.GlobalParams.EkoParams?.ROK >= 2016 });
                    this.actions.actObdobiKH?.update({ enabled: dataFound && this.GlobalParams.EkoParams?.ROK >= 2016, visible: this.GlobalParams.EkoParams?.ROK >= 2016 });
                    // tisk
                    if (this.globals.Globalni_Parametry.PovoleniTisku /*this.GlobalParams.Params?.PovoleniTisku*/) {
                        this.actions.actTisk?.update({ enabled: dataFound, tooltip: tooltip });
                    }
                    else
                        this.actions.actTisk?.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    this.actions["act6"].update({ enabled: this.tested && dataFound, tooltip: tooltip }); // zauct
                }
                /**
                 *  Znovunacteni dat
                 *
                 */
                reload() {
                    var that = this;
                    debugger;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    //if (that.akce == Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.ZaverecneUcetniZapisy)
                    {
                        Gordic.Isl.InuiUzaverkaUcetnihoObdobi.seznamZapisu({ akce: that.akce })
                            .get()
                            .done(function (result) {
                            debugger;
                            return def.resolve(result);
                        })
                            .always(function () { });
                    }
                    return def.promise();
                }
                /**
                 *  Start akce
                 * @param id
                 */
                startAkce(id) {
                    this.tested = false;
                    if (id == 3) {
                        this.refresh();
                    }
                    else if (id == 2) {
                        // tisk
                        switch (this.akce) {
                            case 0 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.ZaverecneUcetniZapisy */:
                                break;
                        }
                    }
                    else if (id == 4) {
                        // tvorba zapisu
                        if (this.akce == 0 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.ZaverecneUcetniZapisy */)
                            this.zaverecneZapisy();
                        else if (this.akce == 1 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.UzavreniUcetnichKnih */)
                            this.zapisyKnih();
                        else if (this.akce == 2 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.OtevreniUcetnichKnih */)
                            this.zapisyKnihOtevreni();
                        else if (this.akce == 3 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.UzavreniRozpoctu */)
                            this.zapisyUzavreniRozu();
                        else if (this.akce == 4 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.OtevreniENNV */)
                            this.zapisyOtevreniENNV();
                    }
                    else if (id == 5) {
                        // testovani
                        if (this.akce == 0 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.ZaverecneUcetniZapisy */)
                            this.testZapisu();
                        else if (this.akce == 1 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.UzavreniUcetnichKnih */)
                            this.testZapisuKnih();
                        else if (this.akce == 2 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.OtevreniUcetnichKnih */)
                            this.testZapisuOtevreniKnih();
                        else if (this.akce == 3 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.UzavreniRozpoctu */)
                            this.testZapisuRozu();
                        else if (this.akce == 4 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.OtevreniENNV */)
                            this.testZapisuENNV();
                    }
                    else if (id == 6) {
                        // zauctovani
                        if (this.akce == 0 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.ZaverecneUcetniZapisy */)
                            this.zauctovaniZapisu();
                        else if (this.akce == 1 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.UzavreniUcetnichKnih */)
                            this.zauctovaniZapisuKnih();
                        else if (this.akce == 2 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.OtevreniUcetnichKnih */)
                            this.zauctovaniOtevreniKnih();
                        else if (this.akce == 3 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.UzavreniRozpoctu */)
                            this.zauctovaniZapisuRozu();
                        else if (this.akce == 4 /* Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.OtevreniENNV */)
                            this.zauctovaniZapisuOtevreniENNV();
                    }
                }
                /**
                 * Zauctovani zapisu ROZu
                 *
                 */
                zauctovaniZapisuOtevreniENNV() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250267"); //RC 30250267 : Probíhá otevření ENNV, čekejte prosím.
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZapisyOtevreniENNV()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250268" //RC 30250268 :  Byly proúčtovány zápisy otevření ENNV !
                        );
                        that.refresh();
                        that.NastaveniAkci();
                        return deferrer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        debugger;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zauctovaniZapisuOtevreniENNV();
                                    }
                                    else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */ && returnValue.TypeMessage == 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        that.endOperation();
                                        // zobrazeni okna s chybami
                                        return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: 50 /* Gordic.Inu.Interface.GEInuAgenda.ROZ */ })
                                            .getData()
                                            .then((data) => {
                                            that.zobrazeniChyb(data, deferrer);
                                        });
                                        //return deferrer.reject();
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
                 * Testovani zapisu uzavreni ROZu
                 *
                 */
                testZapisuENNV() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250265"); //RC 30250265 : Probíhá test zápisů otevření ENNV, čekejte prosím
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.testZapisyOtevreniENNV()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250266" //RC 30250266 : Test zápisů otevření ENNV proběhl bez chyb
                        );
                        //that.refresh();
                        this.tested = true;
                        that.NastaveniAkci();
                        return deferrer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        debugger;
                                        return that.testZapisuKnih();
                                    }
                                    else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */ && returnValue.TypeMessage == 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        that.endOperation();
                                        // zobrazeni okna s chybami
                                        return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: 50 /* Gordic.Inu.Interface.GEInuAgenda.ROZ */ })
                                            .getData()
                                            .then((data) => {
                                            that.zobrazeniChyb(data, deferrer);
                                        });
                                        //return deferrer.reject();
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
                 * Zapisy otevreni ENNV
                 *
                 */
                zapisyOtevreniENNV(vstup, deferrer) {
                    let that = this;
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred();
                        that.beginOperation("jres:30250229"); //RC 30250229 : Probíhá vytváření zápisů
                        vstup = {};
                    }
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.zapisyOtevreniENNV({ rq: vstup })
                        .get()
                        .then((result) => {
                        that.endOperation();
                        if (result > 0)
                            that.showFlash({ label: "jres:30250263", state: "success" }); //RC 30250263 : Zápisy otevření ENNV byly provedeny
                        else
                            that.showFlash({ label: "jres:30250264", state: "warning" }); //RC 30250264 : Zápisy otevření ENNV nebyly provedeny
                        that.refresh();
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
                                        debugger;
                                        vstup.Nastaveni = returnValue.Nastaveni; //transMsg.Nastaveni;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zapisyOtevreniENNV(vstup, deferrer);
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
                 * Zauctovani zapisu ROZu
                 *
                 */
                zauctovaniZapisuRozu() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250261"); //RC 30250261 : Probíhá proúčtování zápisů uzavření rozpočtu, čekejte prosím.
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZapisyUzavreniROZu()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250262" //RC 30250262 : Byly proúčtovány zápisy uzavření rozpočtu!
                        );
                        that.refresh();
                        that.NastaveniAkci();
                        return deferrer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        debugger;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zauctovaniZapisuRozu();
                                    }
                                    else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */ && returnValue.TypeMessage == 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        that.endOperation();
                                        // zobrazeni okna s chybami
                                        return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: 50 /* Gordic.Inu.Interface.GEInuAgenda.ROZ */ })
                                            .getData()
                                            .then((data) => {
                                            that.zobrazeniChyb(data, deferrer);
                                        });
                                        return deferrer.reject();
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
                 * Testovani zapisu uzavreni ROZu
                 *
                 */
                testZapisuRozu() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250259"); //RC 30250259 : Probíhá test zápisů uzavření rozpočtu, čekejte prosím
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.testZapisyUzavreniROZu()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250260" //RC 30250260 : Test závěrečných zápisů proběhl bez chyb
                        );
                        //that.refresh();
                        this.tested = true;
                        that.NastaveniAkci();
                        return deferrer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        debugger;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.testZapisuKnih();
                                    }
                                    else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */ && returnValue.TypeMessage == 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        that.endOperation();
                                        // zobrazeni okna s chybami
                                        return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: 50 /* Gordic.Inu.Interface.GEInuAgenda.ROZ */ })
                                            .getData()
                                            .then((data) => {
                                            that.zobrazeniChyb(data, deferrer);
                                        });
                                        //return deferrer.reject();
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
                 * Zapisy uzavreni ROZu
                 *
                 */
                zapisyUzavreniRozu(vstup, deferrer) {
                    let that = this;
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred();
                        that.beginOperation("jres:30250229"); //RC 30250229 : Probíhá vytváření zápisů
                        vstup = {};
                    }
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.zapisyUzavreniROZu({ rq: vstup })
                        .get()
                        .then((result) => {
                        that.endOperation();
                        if (result > 0)
                            that.showFlash({ label: "jres:30250258", state: "success" }); //RC 30250258 : Zápisy uzavření rozpočtu nebyly vytvořeny
                        else
                            that.showFlash({ label: "jres:30250257", state: "warning" }); //RC 30250257 : Zápisy uzavření rozpočtu nebyly vytvořeny
                        that.refresh();
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
                                        debugger;
                                        vstup.Nastaveni = returnValue.Nastaveni; //transMsg.Nastaveni;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zapisyUzavreniRozu(vstup, deferrer);
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
                 * Zapisy knih uzavreni - otevreni
                 *
                 */
                zapisyKnihOtevreni(vstup, deferrer) {
                    let that = this;
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred();
                        that.beginOperation("jres:30250229"); //RC 30250229 : Probíhá vytváření zápisů
                        vstup = {};
                    }
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.zapisyOtevreniKnih({ rq: vstup })
                        .get()
                        .then((result) => {
                        that.endOperation();
                        if (result > 0)
                            that.showFlash({ label: "jres:30250234", state: "success" }); //RC 30250234 : Zápisy otevření účetních knih nebyly provedeny
                        else
                            that.showFlash({ label: "jres:30250235", state: "warning" }); //RC 30250235 : Zápisy otevření účetních knih byly provedeny
                        //that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        //    "jres:30250174" //RC 30250174 : Období bylo připraveno k uzávěrce
                        //,
                        //);
                        that.refresh();
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
                                        debugger;
                                        vstup.Nastaveni = returnValue.Nastaveni; //transMsg.Nastaveni;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zapisyKnihOtevreni(vstup, deferrer);
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
                 * Zapisy knih uzavreni
                 *
                 */
                zapisyKnih(vstup, deferrer) {
                    let that = this;
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred();
                        that.beginOperation("jres:30250229"); //RC 30250229 : Probíhá vytváření zápisů
                        vstup = {};
                    }
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.zapisyUzavKnih({ rq: vstup })
                        .get()
                        .then((result) => {
                        that.endOperation();
                        if (result > 0)
                            that.showFlash({ label: "jres:30250217", state: "success" }); //RC 30250217 : Zápisy uzavření účetních knih byly provedeny
                        else
                            that.showFlash({ label: "jres:30250216", state: "warning" }); //RC 30250216 : Zápisy uzavření účetních knih nebyly provedeny
                        //that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        //    "jres:30250174" //RC 30250174 : Období bylo připraveno k uzávěrce
                        //,
                        //);
                        that.refresh();
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
                                        debugger;
                                        vstup.Nastaveni = returnValue.Nastaveni; //transMsg.Nastaveni;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zapisyKnih(vstup, deferrer);
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
                 * Zauctovani zapisu
                 *
                 */
                zauctovaniZapisu() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250210"); //RC 30250210 : Probíhá proúčtování závěrečných zápisů, čekejte prosím.
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZaverZapisu()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250211" //RC 30250211 : Byly proúčtovány závěrečné zápisy !
                        );
                        that.refresh();
                        //this.tested = true;
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
                                        debugger;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zaverecneZapisy();
                                    }
                                    else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */ && returnValue.TypeMessage == 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        that.endOperation();
                                        // zobrazeni okna s chybami
                                        return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: 40 /* Gordic.Inu.Interface.GEInuAgenda.UCT */ })
                                            .getData()
                                            .then((data) => {
                                            that.zobrazeniChyb(data, deferrer);
                                        });
                                        return deferrer.reject();
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
                 * Zauctovani zapisu otevreni knihy
                 *
                 */
                zauctovaniOtevreniKnih() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250210"); //RC 30250210 : Probíhá proúčtování závěrečných zápisů, čekejte prosím.
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZapisyOtevreniKnih()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250239" //RC 30250239 : Probíhá proúčtování zápisů otevření úč. knih, čekejte prosím.
                        );
                        that.refresh();
                        that.NastaveniAkci();
                        return deferrer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        debugger;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zauctovaniOtevreniKnih();
                                    }
                                    else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */ && returnValue.TypeMessage == 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        that.endOperation();
                                        // zobrazeni okna s chybami
                                        return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: 40 /* Gordic.Inu.Interface.GEInuAgenda.UCT */ })
                                            .getData()
                                            .then((data) => {
                                            that.zobrazeniChyb(data, deferrer);
                                        });
                                        return deferrer.reject();
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
                 * Zauctovani zapisu uzavreni knih
                 *
                 */
                zauctovaniZapisuKnih() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250220"); //RC 30250220 : Probíhá proúčtování zápisů uzávěrky úč. knih, čekejte prosím.
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZapisyUzavreniKnih()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250221" //RC 30250221 : Byly proúčtovány zápisy uzávěrky účetních knih !
                        );
                        that.refresh();
                        //this.tested = true;
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
                                        debugger;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zauctovaniZapisuKnih();
                                    }
                                    else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */ && returnValue.TypeMessage == 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        that.endOperation();
                                        // zobrazeni okna s chybami
                                        return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: 40 /* Gordic.Inu.Interface.GEInuAgenda.UCT */ })
                                            .getData()
                                            .then((data) => {
                                            that.zobrazeniChyb(data, deferrer);
                                        });
                                        return deferrer.reject();
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
                 * Testovani zapisu uzavreni knih
                 *
                 */
                testZapisuKnih() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250218"); //RC 30250218 : Probíhá test zápisů uzávěrky úč. knih, čekejte prosím
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.testZapisyUzavreniKnih()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250219" //RC 30250219 : Test zápisů uzávěrky úč. knih proběhl bez chyb
                        );
                        //that.refresh();
                        this.tested = true;
                        that.NastaveniAkci();
                        return deferrer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        debugger;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.testZapisuKnih();
                                    }
                                    else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */ && returnValue.TypeMessage == 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        that.endOperation();
                                        // zobrazeni okna s chybami
                                        return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: 40 /* Gordic.Inu.Interface.GEInuAgenda.UCT */ })
                                            .getData()
                                            .then((data) => {
                                            that.zobrazeniChyb(data, deferrer);
                                        });
                                        //return deferrer.reject();
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
                  * Testovani zapisu otevreni knih
                  *
                  */
                testZapisuOtevreniKnih() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250240"); //RC 30250240 : Probíhá test zápisů otevření úč. knih, čekejte prosím
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.testZapisyOtevreniKnih()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250241" //RC 30250241 : Test zápisů otevření úč. knih proběhl bez chyb
                        );
                        //that.refresh();
                        this.tested = true;
                        that.NastaveniAkci();
                        return deferrer.resolve();
                    }, function (jqXHR, type, obj) {
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            // test, zda jsou poslany nejake zpravy
                            if (true /*transMsgTst != null*/) {
                                returnMessage
                                    .done(function (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        debugger;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.testZapisuOtevreniKnih();
                                    }
                                    else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */ && returnValue.TypeMessage == 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        that.endOperation();
                                        // zobrazeni okna s chybami
                                        return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: 40 /* Gordic.Inu.Interface.GEInuAgenda.UCT */ })
                                            .getData()
                                            .then((data) => {
                                            that.zobrazeniChyb(data, deferrer);
                                        });
                                        //return deferrer.reject();
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
                 * Testovani zapisu
                 *
                 */
                testZapisu() {
                    let that = this;
                    let deferrer = $.Deferred();
                    that.beginOperation("jres:30250208"); //RC 30250208 : Probíhá test závěrečných zápisů, čekejte prosím
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.testPripravenychZapisuUCT()
                        .get()
                        .then(() => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250207" //RC 30250207 : Test závěrečných zápisů proběhl bez chyb
                        );
                        //that.refresh();
                        this.tested = true;
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
                                        debugger;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zaverecneZapisy();
                                    }
                                    else if (returnValue.Result === 40 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed */ && returnValue.TypeMessage == 100 /* Gordic.Eko.Interface.GETypeTransferMessage.UserMessage */) {
                                        that.endOperation();
                                        // zobrazeni okna s chybami
                                        return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: 40 /* Gordic.Inu.Interface.GEInuAgenda.UCT */ })
                                            .getData()
                                            .then((data) => {
                                            that.zobrazeniChyb(data, deferrer);
                                        });
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
                 * Zaverecne zapis
                 *
                 */
                zaverecneZapisy(vstup, deferrer) {
                    let that = this;
                    if (typeof deferrer === "undefined") {
                        deferrer = $.Deferred();
                        that.beginOperation("jres:30250229"); //RC 30250229 : Probíhá vytváření zápisů
                        vstup = {};
                    }
                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.zaverecneZapisy({ rq: vstup })
                        .get()
                        .then((result) => {
                        that.endOperation();
                        if (result > 0)
                            that.showFlash({ label: "jres:30250205", state: "success" }); //RC 30250205 : Závěrečné zápisy byly vytvořeny
                        else
                            that.showFlash({ label: "jres:30250206", state: "warning" }); //RC 30250206 : Závěrečné zápisy nebyly vytvořeny
                        //that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        //    "jres:30250174" //RC 30250174 : Období bylo připraveno k uzávěrce
                        //,
                        //);
                        that.refresh();
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
                                        debugger;
                                        vstup.Nastaveni = returnValue.Nastaveni; //transMsg.Nastaveni;
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.zaverecneZapisy(vstup, deferrer);
                                    }
                                    else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        that.refresh();
                                        that.NastaveniAkci();
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
                 * Zobrazeni okna s chybami
                 * @param data
                 * @param defer
                 */
                zobrazeniChyb(data, defer) {
                    var that = this;
                    that.dialogs.showModalWindow(Gordic.Inu.WebClient.GSeznamChyb, { data: data }, "jres:30250223", 800, 600, true) //RC 30250223 : Výpis chyb
                        .on("close", function (res) {
                        defer.resolve().promise();
                    });
                }
            };
            GUtAkceUzav = __decorate([
                gcontent
            ], GUtAkceUzav);
            WebClient.GUtAkceUzav = GUtAkceUzav;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1V0QWtjZVV6YXYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVXRBa2NlVXphdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsSUFBVSxNQUFNLENBZzBDZjtBQWgwQ0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBZzBDbkI7SUFoMENnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FnMEM3QjtRQWgwQ29CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxPQUFBLFlBQVk7Z0JBQTdDO29CQUVJLGtDQUFrQztvQkFDbEMsOEJBQThCO29CQUM5Qjs7O3VCQUdHOztvQkFHSDs7eUJBRUs7b0JBQ0csV0FBTSxHQUFZLEtBQUssQ0FBQztvQkFLeEIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkF1eUNyRCxDQUFDO2dCQS93Q0csY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBR2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNoRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyw0RkFBNEY7d0JBQzVGLElBQUksR0FBRyxHQUFrQjs0QkFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFlOzRCQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQWlCOzRCQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQWtCOzRCQUNoQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQWtCOzRCQUVoQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUs7NEJBQ2hCLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUU7NEJBQ3JCLEdBQUcsRUFBRTtnQ0FDRCxRQUFRLENBQUM7Z0NBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBWSxDQUFDLENBQUM7NEJBQ3RDLENBQUM7eUJBRUosQ0FBQTt3QkFFRCxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7NEJBQ2YsTUFBTTs0QkFDTixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7Z0NBQ3BDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSyxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0NBQ3hDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSTtnQ0FDcEUscUJBQXFCLEVBQUUsZ0VBQWdFO2dDQUN2RixPQUFPLEVBQUUsSUFBSTtnQ0FDYixRQUFRLEVBQUUsS0FBSztnQ0FDZixjQUFjLEVBQUUsVUFBVSxHQUFHO29DQUUzQixHQUFHLENBQUMsU0FBUyxHQUFHO3dDQUNaLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTt3Q0FDZCxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUs7cUNBQ3hCLENBQUM7Z0NBRU4sQ0FBQzs2QkFDSixDQUFDLENBQUM7NEJBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzNCLENBQUM7OzRCQUVHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUU5QixDQUFDO29CQUNELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3pDLElBQUksU0FBUyxHQUFpQixFQUFFLENBQUM7b0JBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3ZDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUM1RCxDQUFDO29CQUVELGdCQUFnQjtvQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBSWxCLGtCQUFrQjt3QkFDbEIsNEJBQTRCO3dCQUM1QiwwREFBMEQ7d0JBQzFELGtCQUFrQjt3QkFDbEIsbURBQW1EO3dCQUNuRCxvQkFBb0I7d0JBQ3BCLHdCQUF3Qjt3QkFDeEIseUJBQXlCO3dCQUV6QixPQUFPO3dCQUNQLElBQUk7d0JBQ0osU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzs0QkFDdEMsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixDQUFDO29DQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FBQyxDQUFDOzRCQUN4QixDQUFDO3lCQUNKLENBQUM7cUJBQ0wsQ0FBQyxDQUFDO29CQUlILGFBQWE7b0JBQ2Isc0JBQXNCO29CQUN0QixJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDNUQsUUFBUSxDQUFDO3dCQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN6QixDQUFDLENBQUMsQ0FBQztvQkFHSCw4QkFBOEI7b0JBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDckYsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt5QkFDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLElBQUksQ0FBQzt3QkFDRixFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhO3dCQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7d0JBQ3BCLE1BQU0sRUFBRSxJQUFJO3dCQUNaLE9BQU8sRUFBRSxTQUFTO3dCQUNsQixrRkFBa0Y7d0JBQ2xGLHVCQUF1Qjt3QkFDdkIsc0JBQXNCO3dCQUN0QiwwQkFBMEI7d0JBRTFCLElBQUk7cUJBRVAsQ0FBQyxDQUFDO29CQUVQLGtCQUFrQjtvQkFDbEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7eUJBQ2xCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO3lCQUNyQixRQUFRLENBQUMsU0FBUyxDQUFDO3lCQUVuQixLQUFLLENBQUM7d0JBQ0gsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZixjQUFjLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDNUYsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU07NEJBQzNCLFFBQVEsQ0FBQzs0QkFDVCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFFakQsQ0FBQzt3QkFDRCxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO3dCQUNyQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtxQkFDN0IsQ0FBQyxDQUFDO29CQUlQLGtCQUFrQjtvQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQzt3QkFDWjs0QkFDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO3lCQUVqQztxQkFDSixDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixDQUFDO2dCQUdEOzs7cUJBR0s7Z0JBQ0csVUFBVTtvQkFDZCxJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQy9ELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ25FLFVBQVUsQ0FBQyxhQUFhLENBQUM7d0JBQ3JCLElBQUksRUFBRSxLQUFLO3dCQUNYLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUMsaUNBQWlDO3dCQUN4RSxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDLENBQUM7b0JBRUgsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQzt5QkFDckQsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLElBQUk7d0JBQ1YscUJBQXFCO3dCQUNyQixPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQjt3QkFDNUMsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQjt3QkFDN0MsS0FBSyxFQUFFLEdBQUc7cUJBRWIsQ0FBQyxDQUFDO29CQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQzNELFVBQVUsQ0FBQyxhQUFhLENBQUM7d0JBQ3JCLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjt3QkFDckQsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQyxDQUFBO29CQUNGLFVBQVUsQ0FBQyxhQUFhLENBQUM7d0JBQ3JCLElBQUksRUFBRSxZQUFZO3dCQUNsQixPQUFPLEVBQUUsZUFBZSxFQUFFLDZCQUE2Qjt3QkFDdkQsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQyxDQUFDO29CQUNILFVBQVUsQ0FBQyxlQUFlLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUMvQyxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDLENBQUE7b0JBRUYsT0FBTyxVQUFVLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQ0Q7O3FCQUVLO2dCQUNHLE9BQU87b0JBQ1gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO3dCQUN6QixJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUNOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDekIsQ0FBQyxDQUNBLENBQUM7Z0JBQ1YsQ0FBQztnQkFFRDs7O3FCQUdLO2dCQUNHLGFBQWE7b0JBQ2pCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsa0NBQWtDO29CQUdsRixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUczRSw0RUFBNEU7b0JBRTVFLG1DQUFtQztvQkFDbkMsUUFBUSxDQUFDO29CQUNULElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsR0FBSSxJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsR0FBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzVKLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsR0FBSSxJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsR0FBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzFKLE9BQU87b0JBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQSwyQ0FBMkMsRUFBRSxDQUFDO3dCQUUzRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUMzRSxDQUFDOzt3QkFFRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO29CQUd4SCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBLFFBQVE7Z0JBRWxHLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSyxNQUFNO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsUUFBUSxDQUFDO29CQUNULElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTTt3QkFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDaEQseUZBQXlGO29CQUN6RixDQUFDO3dCQUNHLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs2QkFDbEUsR0FBRyxFQUFFOzZCQUNMLElBQUksQ0FBQyxVQUFVLE1BQU07NEJBQ2xCLFFBQVEsQ0FBQzs0QkFDVCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBRS9CLENBQUMsQ0FBQzs2QkFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtvQkFDaEMsQ0FBQztvQkFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekIsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLFNBQVMsQ0FBQyxFQUFVO29CQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ1YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNuQixDQUFDO3lCQUFNLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNqQixPQUFPO3dCQUNQLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUNoQjtnQ0FFSSxNQUFNO3dCQUNkLENBQUM7b0JBQ0wsQ0FBQzt5QkFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDakIsZ0JBQWdCO3dCQUNoQixJQUFJLElBQUksQ0FBQyxJQUFJLGlGQUF5RTs0QkFDbEYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOzZCQUN0QixJQUFJLElBQUksQ0FBQyxJQUFJLGdGQUF3RTs0QkFDdEYsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOzZCQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLGdGQUF3RTs0QkFDdEYsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUE7NkJBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksNEVBQW9FOzRCQUNsRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTs2QkFDeEIsSUFBSSxJQUFJLENBQUMsSUFBSSx3RUFBZ0U7NEJBQzlFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO29CQUNqQyxDQUFDO3lCQUFNLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNqQixZQUFZO3dCQUNaLElBQUksSUFBSSxDQUFDLElBQUksaUZBQXlFOzRCQUNsRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7NkJBQ2pCLElBQUksSUFBSSxDQUFDLElBQUksZ0ZBQXdFOzRCQUN0RixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7NkJBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksZ0ZBQXdFOzRCQUN0RixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTs2QkFDNUIsSUFBSSxJQUFJLENBQUMsSUFBSSw0RUFBb0U7NEJBQ2xGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTs2QkFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSx3RUFBZ0U7NEJBQzlFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtvQkFDN0IsQ0FBQzt5QkFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDakIsYUFBYTt3QkFDYixJQUFJLElBQUksQ0FBQyxJQUFJLGlGQUF5RTs0QkFDbEYsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7NkJBQ3ZCLElBQUksSUFBSSxDQUFDLElBQUksZ0ZBQXdFOzRCQUN0RixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs2QkFDM0IsSUFBSSxJQUFJLENBQUMsSUFBSSxnRkFBd0U7NEJBQ3RGLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFBOzZCQUM1QixJQUFJLElBQUksQ0FBQyxJQUFJLDRFQUFvRTs0QkFDbEYsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUE7NkJBQzFCLElBQUksSUFBSSxDQUFDLElBQUksd0VBQWdFOzRCQUM5RSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQTtvQkFDM0MsQ0FBQztnQkFFTCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssNEJBQTRCO29CQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtvQkFFNUYsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLDZCQUE2QixFQUFFO3lCQUN2RSxHQUFHLEVBQUU7eUJBRUwsSUFBSSxDQUNELEdBQUcsRUFBRTt3QkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSx5QkFBeUI7d0JBQzlELGVBQWUsQ0FBQyx3REFBd0Q7eUJBRTNFLENBQUM7d0JBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDckIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzlCLENBQUMsRUFFQyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRzt3QkFDeEIsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBVyxDQUFDLENBQUM7d0JBQ3BHLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFLENBQUM7NEJBQ3BDLHFDQUFxQzs0QkFDckMsdUNBQXVDOzRCQUN2QyxJQUFJLElBQUksQ0FBQSx1QkFBdUIsRUFBRSxDQUFDO2dDQUM5QixhQUFhO3FDQUNSLElBQUksQ0FBQyxVQUFVLFdBQWtEO29DQUM5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLHdFQUErRCxFQUFFLENBQUM7d0NBQ3BGLFFBQVEsQ0FBQzt3Q0FDVCxnRUFBZ0U7d0NBQ2hFLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7b0NBQy9DLENBQUM7eUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSwwRUFBaUUsSUFBSSxXQUFXLENBQUMsV0FBVyxvRUFBMEQsRUFBRSxDQUFDO3dDQUNoTCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLDJCQUEyQjt3Q0FDM0IsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sK0NBQXNDLEVBQUUsQ0FBQzs2Q0FDcEcsT0FBTyxFQUFFOzZDQUNULElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzRDQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dDQUN2QyxDQUFDLENBQUMsQ0FBQTt3Q0FDTiwyQkFBMkI7b0NBQy9CLENBQUM7eUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSx1RUFBOEQsRUFBRSxDQUFDO3dDQUN4RixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29DQUM3QixDQUFDO3lDQUNJLENBQUM7d0NBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQ0FDOUIsQ0FBQztnQ0FDTCxDQUFDLENBQ0EsQ0FBQTtnQ0FDTCxPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDOUIsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUNKLENBQ0E7Z0JBQ1QsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLGNBQWM7b0JBQ2xCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsaUVBQWlFO29CQUV2RyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsc0JBQXNCLEVBQUU7eUJBQ2hFLEdBQUcsRUFBRTt5QkFFTCxJQUFJLENBQ0QsR0FBRyxFQUFFO3dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLHlCQUF5Qjt3QkFDOUQsZUFBZSxDQUFDLDBEQUEwRDt5QkFFN0UsQ0FBQzt3QkFDRixpQkFBaUI7d0JBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3JCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUM5QixDQUFDLEVBRUMsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUc7d0JBQ3hCLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQVcsQ0FBQyxDQUFDO3dCQUNwRyxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRSxDQUFDOzRCQUNwQyxxQ0FBcUM7NEJBQ3JDLHVDQUF1Qzs0QkFDdkMsSUFBSSxJQUFJLENBQUEsdUJBQXVCLEVBQUUsQ0FBQztnQ0FDOUIsYUFBYTtxQ0FDUixJQUFJLENBQUMsVUFBVSxXQUFrRDtvQ0FDOUQsSUFBSSxXQUFXLENBQUMsTUFBTSx3RUFBK0QsRUFBRSxDQUFDO3dDQUNwRixRQUFRLENBQUM7d0NBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7b0NBQ2pDLENBQUM7eUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSwwRUFBaUUsSUFBSSxXQUFXLENBQUMsV0FBVyxvRUFBMEQsRUFBRSxDQUFDO3dDQUNoTCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLDJCQUEyQjt3Q0FDM0IsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sK0NBQXNDLEVBQUUsQ0FBQzs2Q0FDcEcsT0FBTyxFQUFFOzZDQUNULElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzRDQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dDQUN2QyxDQUFDLENBQUMsQ0FBQTt3Q0FDTiwyQkFBMkI7b0NBQy9CLENBQUM7eUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSx1RUFBOEQsRUFBRSxDQUFDO3dDQUN4RixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29DQUM3QixDQUFDO3lDQUNJLENBQUM7d0NBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQ0FDOUIsQ0FBQztnQ0FDTCxDQUFDLENBQ0EsQ0FBQTtnQ0FDTCxPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDOUIsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUNKLENBQ0E7Z0JBQ1QsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLGtCQUFrQixDQUFDLEtBQWtFLEVBQUUsUUFBYztvQkFDekcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRSxDQUFDO3dCQUNsQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO3dCQUM5RSxLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNmLENBQUM7b0JBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQW1FLEVBQUUsQ0FBQzt5QkFDdkksR0FBRyxFQUFFO3lCQUVMLElBQUksQ0FDRCxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNQLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxNQUFNLEdBQUcsQ0FBQzs0QkFDVixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQSxDQUFDLG1EQUFtRDs7NEJBRWhILElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFBLENBQUMscURBQXFEO3dCQUV0SCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUNyQixPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDMUIsMEJBQTBCO29CQUM5QixDQUFDLEVBRUMsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUc7d0JBQ3hCLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQVcsQ0FBQyxDQUFDO3dCQUNyRyxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRSxDQUFDOzRCQUNwQyxxQ0FBcUM7NEJBQ3JDLHVDQUF1Qzs0QkFDdkMsSUFBSSxJQUFJLENBQUEsdUJBQXVCLEVBQUUsQ0FBQztnQ0FDOUIsYUFBYTtxQ0FDUixJQUFJLENBQUMsVUFBVSxXQUFrRDtvQ0FDOUQsSUFBSSxXQUFXLENBQUMsTUFBTSx3RUFBK0QsRUFBRSxDQUFDO3dDQUNwRixRQUFRLENBQUM7d0NBQ1QsS0FBTSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMscUJBQXFCO3dDQUMvRCxnRUFBZ0U7d0NBQ2hFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztvQ0FDcEQsQ0FBQzt5Q0FDSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLHVFQUE4RCxFQUFFLENBQUM7d0NBQ3hGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBQzdCLENBQUM7eUNBQ0ksQ0FBQzt3Q0FDRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUM5QixDQUFDO2dDQUNMLENBQUMsQ0FDQSxDQUFBO2dDQUNMLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUM5QixDQUFDO3dCQUNMLENBQUM7d0JBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQ0osQ0FDQTtnQkFDVCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssb0JBQW9CO29CQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLDZFQUE2RTtvQkFFbkgsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLDZCQUE2QixFQUFFO3lCQUN2RSxHQUFHLEVBQUU7eUJBRUwsSUFBSSxDQUNELEdBQUcsRUFBRTt3QkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSx5QkFBeUI7d0JBQzlELGVBQWUsQ0FBQywwREFBMEQ7eUJBRTdFLENBQUM7d0JBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDckIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzlCLENBQUMsRUFFQyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRzt3QkFDeEIsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBVyxDQUFDLENBQUM7d0JBQ3BHLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFLENBQUM7NEJBQ3BDLHFDQUFxQzs0QkFDckMsdUNBQXVDOzRCQUN2QyxJQUFJLElBQUksQ0FBQSx1QkFBdUIsRUFBRSxDQUFDO2dDQUM5QixhQUFhO3FDQUNSLElBQUksQ0FBQyxVQUFVLFdBQWtEO29DQUM5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLHdFQUErRCxFQUFFLENBQUM7d0NBQ3BGLFFBQVEsQ0FBQzt3Q0FDVCxnRUFBZ0U7d0NBQ2hFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7b0NBQ3ZDLENBQUM7eUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSwwRUFBaUUsSUFBSSxXQUFXLENBQUMsV0FBVyxvRUFBMEQsRUFBRSxDQUFDO3dDQUNoTCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLDJCQUEyQjt3Q0FDM0IsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sK0NBQXNDLEVBQUUsQ0FBQzs2Q0FDcEcsT0FBTyxFQUFFOzZDQUNULElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzRDQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dDQUN2QyxDQUFDLENBQUMsQ0FBQTt3Q0FDTixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDN0IsQ0FBQzt5Q0FDSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLHVFQUE4RCxFQUFFLENBQUM7d0NBQ3hGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBQzdCLENBQUM7eUNBQ0ksQ0FBQzt3Q0FDRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUM5QixDQUFDO2dDQUNMLENBQUMsQ0FDQSxDQUFBO2dDQUNMLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUM5QixDQUFDO3dCQUNMLENBQUM7d0JBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQ0osQ0FDQTtnQkFDVCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssY0FBYztvQkFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxxRUFBcUU7b0JBRTNHLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxzQkFBc0IsRUFBRTt5QkFDaEUsR0FBRyxFQUFFO3lCQUVMLElBQUksQ0FDRCxHQUFHLEVBQUU7d0JBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUseUJBQXlCO3dCQUM5RCxlQUFlLENBQUMsd0RBQXdEO3lCQUUzRSxDQUFDO3dCQUNGLGlCQUFpQjt3QkFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDckIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzlCLENBQUMsRUFFQyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRzt3QkFDeEIsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBVyxDQUFDLENBQUM7d0JBQ3BHLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFLENBQUM7NEJBQ3BDLHFDQUFxQzs0QkFDckMsdUNBQXVDOzRCQUN2QyxJQUFJLElBQUksQ0FBQSx1QkFBdUIsRUFBRSxDQUFDO2dDQUM5QixhQUFhO3FDQUNSLElBQUksQ0FBQyxVQUFVLFdBQWtEO29DQUM5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLHdFQUErRCxFQUFFLENBQUM7d0NBQ3BGLFFBQVEsQ0FBQzt3Q0FDVCxnRUFBZ0U7d0NBQ2hFLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29DQUNqQyxDQUFDO3lDQUNJLElBQUksV0FBVyxDQUFDLE1BQU0sMEVBQWlFLElBQUksV0FBVyxDQUFDLFdBQVcsb0VBQTBELEVBQUUsQ0FBQzt3Q0FDaEwsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQiwyQkFBMkI7d0NBQzNCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLCtDQUFzQyxFQUFFLENBQUM7NkNBQ3BHLE9BQU8sRUFBRTs2Q0FDVCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0Q0FDWCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzt3Q0FDdkMsQ0FBQyxDQUFDLENBQUE7d0NBQ04sMkJBQTJCO29DQUMvQixDQUFDO3lDQUNJLElBQUksV0FBVyxDQUFDLE1BQU0sdUVBQThELEVBQUUsQ0FBQzt3Q0FDeEYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDN0IsQ0FBQzt5Q0FDSSxDQUFDO3dDQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0NBQzlCLENBQUM7Z0NBQ0wsQ0FBQyxDQUNBLENBQUE7Z0NBQ0wsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzlCLENBQUM7d0JBQ0wsQ0FBQzt3QkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hCLENBQUMsQ0FDSixDQUNBO2dCQUNULENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDSyxrQkFBa0IsQ0FBQyxLQUFrRSxFQUFFLFFBQWM7b0JBQ3pHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLEVBQUUsQ0FBQzt3QkFDbEMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLHdDQUF3Qzt3QkFDOUUsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDZixDQUFDO29CQUVELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFtRSxFQUFFLENBQUM7eUJBQ3ZJLEdBQUcsRUFBRTt5QkFFTCxJQUFJLENBQ0QsQ0FBQyxNQUFNLEVBQUUsRUFBRTt3QkFDUCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksTUFBTSxHQUFHLENBQUM7NEJBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUEsQ0FBQyx5REFBeUQ7OzRCQUV0SCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQSxDQUFDLHlEQUF5RDt3QkFFMUgsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDckIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzFCLDBCQUEwQjtvQkFDOUIsQ0FBQyxFQUVDLFVBQVUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHO3dCQUN4QixJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFXLENBQUMsQ0FBQzt3QkFDckcsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEMscUNBQXFDOzRCQUNyQyx1Q0FBdUM7NEJBQ3ZDLElBQUksSUFBSSxDQUFBLHVCQUF1QixFQUFFLENBQUM7Z0NBQzlCLGFBQWE7cUNBQ1IsSUFBSSxDQUFDLFVBQVUsV0FBa0Q7b0NBQzlELElBQUksV0FBVyxDQUFDLE1BQU0sd0VBQStELEVBQUUsQ0FBQzt3Q0FDcEYsUUFBUSxDQUFDO3dDQUNULEtBQU0sQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLHFCQUFxQjt3Q0FDL0QsZ0VBQWdFO3dDQUNoRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7b0NBQ3BELENBQUM7eUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSx1RUFBOEQsRUFBRSxDQUFDO3dDQUN4RixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29DQUM3QixDQUFDO3lDQUNJLENBQUM7d0NBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQ0FDOUIsQ0FBQztnQ0FDTCxDQUFDLENBQ0EsQ0FBQTtnQ0FDTCxPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDOUIsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUNKLENBQ0E7Z0JBQ1QsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLGtCQUFrQixDQUFDLEtBQWtFLEVBQUUsUUFBYztvQkFDekcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRSxDQUFDO3dCQUNsQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO3dCQUM5RSxLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNmLENBQUM7b0JBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQW1FLEVBQUUsQ0FBQzt5QkFDdkksR0FBRyxFQUFFO3lCQUVMLElBQUksQ0FDRCxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNQLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxNQUFNLEdBQUcsQ0FBQzs0QkFDVixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQSxDQUFDLDhEQUE4RDs7NEJBRTNILElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFBLENBQUMsNERBQTREO3dCQUM3SCxvRUFBb0U7d0JBQ3BFLHVFQUF1RTt3QkFDdkUsR0FBRzt3QkFDSCxJQUFJO3dCQUNKLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3JCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUMxQiwwQkFBMEI7b0JBQzlCLENBQUMsRUFFQyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRzt3QkFDeEIsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBVyxDQUFDLENBQUM7d0JBQ3JHLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFLENBQUM7NEJBQ3BDLHFDQUFxQzs0QkFDckMsdUNBQXVDOzRCQUN2QyxJQUFJLElBQUksQ0FBQSx1QkFBdUIsRUFBRSxDQUFDO2dDQUM5QixhQUFhO3FDQUNSLElBQUksQ0FBQyxVQUFVLFdBQWtEO29DQUM5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLHdFQUErRCxFQUFFLENBQUM7d0NBQ3BGLFFBQVEsQ0FBQzt3Q0FDVCxLQUFNLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxxQkFBcUI7d0NBQy9ELGdFQUFnRTt3Q0FDaEUsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29DQUNwRCxDQUFDO3lDQUNJLElBQUksV0FBVyxDQUFDLE1BQU0sdUVBQThELEVBQUUsQ0FBQzt3Q0FDeEYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDN0IsQ0FBQzt5Q0FDSSxDQUFDO3dDQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0NBQzlCLENBQUM7Z0NBQ0wsQ0FBQyxDQUNBLENBQUE7Z0NBQ0wsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzlCLENBQUM7d0JBQ0wsQ0FBQzt3QkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hCLENBQUMsQ0FDSixDQUNBO2dCQUNULENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDSyxVQUFVLENBQUMsS0FBa0UsRUFBRSxRQUFjO29CQUNqRyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxFQUFFLENBQUM7d0JBQ2xDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyx3Q0FBd0M7d0JBQzlFLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ2YsQ0FBQztvQkFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQW1FLEVBQUUsQ0FBQzt5QkFDbkksR0FBRyxFQUFFO3lCQUVMLElBQUksQ0FDRCxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNQLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxNQUFNLEdBQUcsQ0FBQzs0QkFDVixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQSxDQUFDLDREQUE0RDs7NEJBRXpILElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFBLENBQUMsOERBQThEO3dCQUMvSCxvRUFBb0U7d0JBQ3BFLHVFQUF1RTt3QkFDdkUsR0FBRzt3QkFDSCxJQUFJO3dCQUNKLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3JCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUMxQiwwQkFBMEI7b0JBQzlCLENBQUMsRUFFQyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRzt3QkFDeEIsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBVyxDQUFDLENBQUM7d0JBQ3JHLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFLENBQUM7NEJBQ3BDLHFDQUFxQzs0QkFDckMsdUNBQXVDOzRCQUN2QyxJQUFJLElBQUksQ0FBQSx1QkFBdUIsRUFBRSxDQUFDO2dDQUM5QixhQUFhO3FDQUNSLElBQUksQ0FBQyxVQUFVLFdBQWtEO29DQUM5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLHdFQUErRCxFQUFFLENBQUM7d0NBQ3BGLFFBQVEsQ0FBQzt3Q0FDVCxLQUFNLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxxQkFBcUI7d0NBQy9ELGdFQUFnRTt3Q0FDaEUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztvQ0FDNUMsQ0FBQzt5Q0FDSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLHVFQUE4RCxFQUFFLENBQUM7d0NBQ3hGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBQzdCLENBQUM7eUNBQ0ksQ0FBQzt3Q0FDRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUM5QixDQUFDO2dDQUNMLENBQUMsQ0FDQSxDQUFBO2dDQUNMLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUM5QixDQUFDO3dCQUNMLENBQUM7d0JBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQ0osQ0FDQTtnQkFDVCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssZ0JBQWdCO29CQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLHVFQUF1RTtvQkFFN0csT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLHNCQUFzQixFQUFFO3lCQUNoRSxHQUFHLEVBQUU7eUJBRUwsSUFBSSxDQUNELEdBQUcsRUFBRTt3QkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSx5QkFBeUI7d0JBQzlELGVBQWUsQ0FBQyxtREFBbUQ7eUJBRXRFLENBQUM7d0JBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLHFCQUFxQjt3QkFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUNyQixPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDMUIsMEJBQTBCO29CQUM5QixDQUFDLEVBRUMsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUc7d0JBQ3hCLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQVcsQ0FBQyxDQUFDO3dCQUNwRyxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRSxDQUFDOzRCQUNwQyxxQ0FBcUM7NEJBQ3JDLHVDQUF1Qzs0QkFDdkMsSUFBSSxJQUFJLENBQUEsdUJBQXVCLEVBQUUsQ0FBQztnQ0FDOUIsYUFBYTtxQ0FDUixJQUFJLENBQUMsVUFBVSxXQUFrRDtvQ0FDOUQsSUFBSSxXQUFXLENBQUMsTUFBTSx3RUFBK0QsRUFBRSxDQUFDO3dDQUNwRixRQUFRLENBQUM7d0NBQ1QsZ0VBQWdFO3dDQUNoRSxPQUFPLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQ0FDbEMsQ0FBQzt5Q0FDSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLDBFQUFpRSxJQUFJLFdBQVcsQ0FBQyxXQUFXLG9FQUEwRCxFQUFFLENBQUM7d0NBQ2hMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsMkJBQTJCO3dDQUMzQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSwrQ0FBc0MsRUFBRSxDQUFDOzZDQUNwRyxPQUFPLEVBQUU7NkNBQ1QsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7NENBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7d0NBQ3ZDLENBQUMsQ0FBQyxDQUFBO3dDQUNOLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29DQUM3QixDQUFDO3lDQUNJLElBQUksV0FBVyxDQUFDLE1BQU0sdUVBQThELEVBQUUsQ0FBQzt3Q0FDeEYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDN0IsQ0FBQzt5Q0FDSSxDQUFDO3dDQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0NBQzlCLENBQUM7Z0NBQ0wsQ0FBQyxDQUNBLENBQUE7Z0NBQ0wsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzlCLENBQUM7d0JBQ0wsQ0FBQzt3QkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hCLENBQUMsQ0FDSixDQUNBO2dCQUNULENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDSyxzQkFBc0I7b0JBQzFCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsdUVBQXVFO29CQUU3RyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsNkJBQTZCLEVBQUU7eUJBQ3ZFLEdBQUcsRUFBRTt5QkFFTCxJQUFJLENBQ0QsR0FBRyxFQUFFO3dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLHlCQUF5Qjt3QkFDOUQsZUFBZSxDQUFDLDZFQUE2RTt5QkFFaEcsQ0FBQzt3QkFDRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUNyQixPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDOUIsQ0FBQyxFQUVDLFVBQVUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHO3dCQUN4QixJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFXLENBQUMsQ0FBQzt3QkFDcEcsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEMscUNBQXFDOzRCQUNyQyx1Q0FBdUM7NEJBQ3ZDLElBQUksSUFBSSxDQUFBLHVCQUF1QixFQUFFLENBQUM7Z0NBQzlCLGFBQWE7cUNBQ1IsSUFBSSxDQUFDLFVBQVUsV0FBa0Q7b0NBQzlELElBQUksV0FBVyxDQUFDLE1BQU0sd0VBQStELEVBQUUsQ0FBQzt3Q0FDcEYsUUFBUSxDQUFDO3dDQUNULGdFQUFnRTt3Q0FDaEUsT0FBTyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztvQ0FDekMsQ0FBQzt5Q0FDSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLDBFQUFpRSxJQUFJLFdBQVcsQ0FBQyxXQUFXLG9FQUEwRCxFQUFFLENBQUM7d0NBQ2hMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsMkJBQTJCO3dDQUMzQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSwrQ0FBc0MsRUFBRSxDQUFDOzZDQUNwRyxPQUFPLEVBQUU7NkNBQ1QsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7NENBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7d0NBQ3ZDLENBQUMsQ0FBQyxDQUFBO3dDQUNOLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29DQUM3QixDQUFDO3lDQUNJLElBQUksV0FBVyxDQUFDLE1BQU0sdUVBQThELEVBQUUsQ0FBQzt3Q0FDeEYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDN0IsQ0FBQzt5Q0FDSSxDQUFDO3dDQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0NBQzlCLENBQUM7Z0NBQ0wsQ0FBQyxDQUNBLENBQUE7Z0NBQ0wsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzlCLENBQUM7d0JBQ0wsQ0FBQzt3QkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hCLENBQUMsQ0FDSixDQUNBO2dCQUNULENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDSyxvQkFBb0I7b0JBQ3hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsNkVBQTZFO29CQUVuSCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsNkJBQTZCLEVBQUU7eUJBQ3ZFLEdBQUcsRUFBRTt5QkFFTCxJQUFJLENBQ0QsR0FBRyxFQUFFO3dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLHlCQUF5Qjt3QkFDOUQsZUFBZSxDQUFDLGdFQUFnRTt5QkFFbkYsQ0FBQzt3QkFDRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YscUJBQXFCO3dCQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3JCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUMxQiwwQkFBMEI7b0JBQzlCLENBQUMsRUFFQyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRzt3QkFDeEIsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBVyxDQUFDLENBQUM7d0JBQ3BHLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFLENBQUM7NEJBQ3BDLHFDQUFxQzs0QkFDckMsdUNBQXVDOzRCQUN2QyxJQUFJLElBQUksQ0FBQSx1QkFBdUIsRUFBRSxDQUFDO2dDQUM5QixhQUFhO3FDQUNSLElBQUksQ0FBQyxVQUFVLFdBQWtEO29DQUM5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLHdFQUErRCxFQUFFLENBQUM7d0NBQ3BGLFFBQVEsQ0FBQzt3Q0FDVCxnRUFBZ0U7d0NBQ2hFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7b0NBQ3ZDLENBQUM7eUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSwwRUFBaUUsSUFBSSxXQUFXLENBQUMsV0FBVyxvRUFBMEQsRUFBRSxDQUFDO3dDQUNoTCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLDJCQUEyQjt3Q0FDM0IsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sK0NBQXNDLEVBQUUsQ0FBQzs2Q0FDcEcsT0FBTyxFQUFFOzZDQUNULElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzRDQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dDQUN2QyxDQUFDLENBQUMsQ0FBQTt3Q0FDTixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDN0IsQ0FBQzt5Q0FDSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLHVFQUE4RCxFQUFFLENBQUM7d0NBQ3hGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBQzdCLENBQUM7eUNBQ0ksQ0FBQzt3Q0FDRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUM5QixDQUFDO2dDQUNMLENBQUMsQ0FDQSxDQUFBO2dDQUNMLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUM5QixDQUFDO3dCQUNMLENBQUM7d0JBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQ0osQ0FDQTtnQkFDVCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssY0FBYztvQkFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxxRUFBcUU7b0JBRTNHLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxzQkFBc0IsRUFBRTt5QkFDaEUsR0FBRyxFQUFFO3lCQUVMLElBQUksQ0FDRCxHQUFHLEVBQUU7d0JBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUseUJBQXlCO3dCQUM5RCxlQUFlLENBQUMsOERBQThEO3lCQUVqRixDQUFDO3dCQUNGLGlCQUFpQjt3QkFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDckIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzlCLENBQUMsRUFFQyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRzt3QkFDeEIsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBVyxDQUFDLENBQUM7d0JBQ3BHLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFLENBQUM7NEJBQ3BDLHFDQUFxQzs0QkFDckMsdUNBQXVDOzRCQUN2QyxJQUFJLElBQUksQ0FBQSx1QkFBdUIsRUFBRSxDQUFDO2dDQUM5QixhQUFhO3FDQUNSLElBQUksQ0FBQyxVQUFVLFdBQWtEO29DQUM5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLHdFQUErRCxFQUFFLENBQUM7d0NBQ3BGLFFBQVEsQ0FBQzt3Q0FDVCxnRUFBZ0U7d0NBQ2hFLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29DQUNqQyxDQUFDO3lDQUNJLElBQUksV0FBVyxDQUFDLE1BQU0sMEVBQWlFLElBQUksV0FBVyxDQUFDLFdBQVcsb0VBQTBELEVBQUUsQ0FBQzt3Q0FDaEwsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQiwyQkFBMkI7d0NBQzNCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLCtDQUFzQyxFQUFFLENBQUM7NkNBQ3BHLE9BQU8sRUFBRTs2Q0FDVCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0Q0FDWCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzt3Q0FDdkMsQ0FBQyxDQUFDLENBQUE7d0NBQ04sMkJBQTJCO29DQUMvQixDQUFDO3lDQUNJLElBQUksV0FBVyxDQUFDLE1BQU0sdUVBQThELEVBQUUsQ0FBQzt3Q0FDeEYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDN0IsQ0FBQzt5Q0FDSSxDQUFDO3dDQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0NBQzlCLENBQUM7Z0NBQ0wsQ0FBQyxDQUNBLENBQUE7Z0NBQ0wsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzlCLENBQUM7d0JBQ0wsQ0FBQzt3QkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hCLENBQUMsQ0FDSixDQUNBO2dCQUNULENBQUM7Z0JBQ0Q7OztvQkFHSTtnQkFDSSxzQkFBc0I7b0JBQzFCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMscUVBQXFFO29CQUUzRyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsc0JBQXNCLEVBQUU7eUJBQ2hFLEdBQUcsRUFBRTt5QkFFTCxJQUFJLENBQ0QsR0FBRyxFQUFFO3dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLHlCQUF5Qjt3QkFDOUQsZUFBZSxDQUFDLDhEQUE4RDt5QkFFakYsQ0FBQzt3QkFDRixpQkFBaUI7d0JBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3JCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUM5QixDQUFDLEVBRUMsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUc7d0JBQ3hCLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQVcsQ0FBQyxDQUFDO3dCQUNwRyxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRSxDQUFDOzRCQUNwQyxxQ0FBcUM7NEJBQ3JDLHVDQUF1Qzs0QkFDdkMsSUFBSSxJQUFJLENBQUEsdUJBQXVCLEVBQUUsQ0FBQztnQ0FDOUIsYUFBYTtxQ0FDUixJQUFJLENBQUMsVUFBVSxXQUFrRDtvQ0FDOUQsSUFBSSxXQUFXLENBQUMsTUFBTSx3RUFBK0QsRUFBRSxDQUFDO3dDQUNwRixRQUFRLENBQUM7d0NBQ1QsZ0VBQWdFO3dDQUNoRSxPQUFPLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO29DQUN6QyxDQUFDO3lDQUNJLElBQUksV0FBVyxDQUFDLE1BQU0sMEVBQWlFLElBQUksV0FBVyxDQUFDLFdBQVcsb0VBQTBELEVBQUUsQ0FBQzt3Q0FDaEwsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQiwyQkFBMkI7d0NBQzNCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLCtDQUFzQyxFQUFFLENBQUM7NkNBQ3BHLE9BQU8sRUFBRTs2Q0FDVCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0Q0FDWCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzt3Q0FDdkMsQ0FBQyxDQUFDLENBQUE7d0NBQ04sMkJBQTJCO29DQUMvQixDQUFDO3lDQUNJLElBQUksV0FBVyxDQUFDLE1BQU0sdUVBQThELEVBQUUsQ0FBQzt3Q0FDeEYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDN0IsQ0FBQzt5Q0FDSSxDQUFDO3dDQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0NBQzlCLENBQUM7Z0NBQ0wsQ0FBQyxDQUNBLENBQUE7Z0NBQ0wsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzlCLENBQUM7d0JBQ0wsQ0FBQzt3QkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hCLENBQUMsQ0FDSixDQUNBO2dCQUNULENBQUM7Z0JBR0Q7OzttQkFHRztnQkFDSyxVQUFVO29CQUNkLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsK0RBQStEO29CQUVyRyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMseUJBQXlCLEVBQUU7eUJBQ25FLEdBQUcsRUFBRTt5QkFFTCxJQUFJLENBQ0QsR0FBRyxFQUFFO3dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLHlCQUF5Qjt3QkFDOUQsZUFBZSxDQUFDLHdEQUF3RDt5QkFFM0UsQ0FBQzt3QkFDRixpQkFBaUI7d0JBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3JCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUMxQiwwQkFBMEI7b0JBQzlCLENBQUMsRUFFQyxVQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRzt3QkFDeEIsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBVyxDQUFDLENBQUM7d0JBQ3BHLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFLENBQUM7NEJBQ3BDLHFDQUFxQzs0QkFDckMsdUNBQXVDOzRCQUN2QyxJQUFJLElBQUksQ0FBQSx1QkFBdUIsRUFBRSxDQUFDO2dDQUM5QixhQUFhO3FDQUNSLElBQUksQ0FBQyxVQUFVLFdBQWtEO29DQUM5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLHdFQUErRCxFQUFFLENBQUM7d0NBQ3BGLFFBQVEsQ0FBQzt3Q0FDVCxnRUFBZ0U7d0NBQ2hFLE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO29DQUNsQyxDQUFDO3lDQUNJLElBQUksV0FBVyxDQUFDLE1BQU0sMEVBQWlFLElBQUksV0FBVyxDQUFDLFdBQVcsb0VBQTBELEVBQUUsQ0FBQzt3Q0FDaEwsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQiwyQkFBMkI7d0NBQzNCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLCtDQUFzQyxFQUFFLENBQUM7NkNBQ3BHLE9BQU8sRUFBRTs2Q0FDVCxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0Q0FDWCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzt3Q0FDdkMsQ0FBQyxDQUFDLENBQUE7b0NBQ1YsQ0FBQzt5Q0FDSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLHVFQUE4RCxFQUFFLENBQUM7d0NBQ3hGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3Q0FDcEIsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7b0NBQzdCLENBQUM7eUNBQ0ksQ0FBQzt3Q0FDRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29DQUM5QixDQUFDO2dDQUNMLENBQUMsQ0FDQSxDQUFBO2dDQUNMLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUM5QixDQUFDO3dCQUNMLENBQUM7d0JBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQ0osQ0FDQTtnQkFDVCxDQUFDO2dCQUNEOzs7bUJBR0c7Z0JBQ0ssZUFBZSxDQUFDLEtBQWtFLEVBQUcsUUFBYztvQkFDdkcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRSxDQUFDO3dCQUNsQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO3dCQUM5RSxLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNmLENBQUM7b0JBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFtRSxFQUFFLENBQUM7eUJBQ3BJLEdBQUcsRUFBRTt5QkFFTCxJQUFJLENBQ0QsQ0FBQyxNQUFNLEVBQUUsRUFBRTt3QkFDUCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ3BCLElBQUksTUFBTSxHQUFHLENBQUM7NEJBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUEsQ0FBQywrQ0FBK0M7OzRCQUU1RyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQSxDQUFDLGlEQUFpRDt3QkFDbEgsb0VBQW9FO3dCQUNwRSx1RUFBdUU7d0JBQ3ZFLEdBQUc7d0JBQ0gsSUFBSTt3QkFDSixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUNyQixPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDMUIsMEJBQTBCO29CQUM5QixDQUFDLEVBRUMsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUc7d0JBQ3hCLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQVcsQ0FBQyxDQUFDO3dCQUNyRyxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRSxDQUFDOzRCQUNwQyxxQ0FBcUM7NEJBQ3JDLHVDQUF1Qzs0QkFDdkMsSUFBSSxJQUFJLENBQUEsdUJBQXVCLEVBQUUsQ0FBQztnQ0FDOUIsYUFBYTtxQ0FDUixJQUFJLENBQUMsVUFBVSxXQUFrRDtvQ0FDOUQsSUFBSSxXQUFXLENBQUMsTUFBTSx3RUFBK0QsRUFBRSxDQUFDO3dDQUNwRixRQUFRLENBQUM7d0NBQ1QsS0FBTSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMscUJBQXFCO3dDQUMvRCxnRUFBZ0U7d0NBQ2hFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7b0NBQ2pELENBQUM7eUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSx1RUFBOEQsRUFBRSxDQUFDO3dDQUN4RixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0NBQ3BCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3Q0FDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0NBRXJCLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO29DQUM3QixDQUFDO3lDQUNJLENBQUM7d0NBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQ0FDOUIsQ0FBQztnQ0FDTCxDQUFDLENBQ0EsQ0FBQTtnQ0FDTCxPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDOUIsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUNKLENBQ0E7Z0JBQ1QsQ0FBQztnQkFDRDs7OzttQkFJRztnQkFDSyxhQUFhLENBQUMsSUFBZ0QsRUFBRSxLQUFVO29CQUM5RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQywwQkFBMEI7eUJBQ3JJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFRO3dCQUM1QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7YUFFSixDQUFBO1lBenpDWSxXQUFXO2dCQUR2QixRQUFRO2VBQ0ksV0FBVyxDQXl6Q3ZCO1lBenpDWSxxQkFBVyxjQXl6Q3ZCLENBQUE7UUFHTCxDQUFDLEVBaDBDb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBZzBDN0I7SUFBRCxDQUFDLEVBaDBDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBZzBDbkI7QUFBRCxDQUFDLEVBaDBDUyxNQUFNLEtBQU4sTUFBTSxRQWcwQ2YiLCJzb3VyY2VzQ29udGVudCI6WyJcclxubmFtZXNwYWNlIEdvcmRpYy5JbnUuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1V0QWtjZVV6YXYgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBHSW51QmFzZUNsYXNzIHtcclxuXHJcbiAgICAgICAgLy90YXNrSWQgPSBcImFjdFNlem5hbU9iZG9iaUtIRFBIXCI7XHJcbiAgICAgICAgLy91aWQgPSBcIkdTZXpuYW1PYmRvYmlLSERQSCNcIjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBamF4IHByb3BlcnR5XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG1vZGVsOiBHb3JkaWMuSW51LkludGVyZmFjZS5HU2V6bmFtT2Jkb2JpS0hEUEhEdG9bXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgYXRyaWJ1dCB0ZXN0b3ZhbmkgemF6bmFtdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSB0ZXN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHbG9iYWxuaSBuYXN0YXZlbmlcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHJlYWRvbmx5IEdsb2JhbFBhcmFtczogR29yZGljLkludS5XZWJDbGllbnQuR0ludUdsb2JhbER0bztcclxuICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuSW51Lkdsb2JhbHMuR0ludUdsb2JhbHM7XHJcbiAgICAgICAgcmVhZG9ubHkgYWtjZTogR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3k7XHJcbiAgICAgICAgLy8gbmFkcGlzIHRhYnVcclxuICAgICAgICByZWFkb25seSB0aXRsZVRhYjogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZGVmaW5pY2VBa2NpOiBHb3JkaWMuSW51LldlYkNsaWVudC5HRGVmaW5pY2VBa2NlRHRvW107XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYmVjbmUgcHJvcGVydHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIFByZXBGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICBwcm90ZWN0ZWQgZm9ybTogSlF1ZXJ5O1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgZWxlbTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWaWV3IHNlem5hbXUgb2Jkb2JpXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHZpZXc6IEdvcmRpYy5EYXRhLlZpZXc7XHJcblxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdC5kZWZpbmljZUFrY2kubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhhdC5kZWZpbmljZUFrY2lbaV07XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBmY2UgPSBmdW5jdGlvbiAoaTogbnVtYmVyKSB7IHJldHVybiAoKSA9PiB0aGF0LnN0YXJ0QWtjZSh0aGF0LmRlZmluaWNlQWtjaVtpXS5JRCEpOyB9O1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjdDogR0FjdGlvblBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBpdGVtLlRpdGxlIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBpdGVtLlRvb2xUaXAgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGl0ZW0uRW5hYmxlZCBhcyBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IGl0ZW0uVmlzaWJsZSBhcyBib29sZWFuLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBpdGVtLkljb24hLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0XCIgKyBpdGVtLklELFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGFydEFrY2UoaXRlbS5JRCBhcyBudW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLklEID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3Rpc2tcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGlzayA9IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1hOiBpdGVtLlRlbWEhLCBuYW1lOiBcImFjdFBydFwiICsgaXRlbS5JRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHBsYXRub3N0OiB0aGF0Lkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSz8udG9TdHJpbmcoKS50cmltKCkgKyBcIjEyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkludS5XZWJDbGllbnQuR1VjdFByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBmYXZvcml0ZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVtYTogcmVwLnRlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSURTZXN0YXZ5OiBpdGVtLkZpbHRyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZCh0aXNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKGFjdCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBsaXN0QWtjZSA9IHRoaXMuYWN0aW9ucy5nZXRBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHZhciBkZWZBa01lbnU6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RBa2NlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZBa01lbnUucHVzaCh7IGFjdGlvbjogbGlzdEFrY2VbaV0sIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYWtjw61cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vYWN0T2JjZXJzdHZpdDoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJhY3RPYmNlcnN0dml0XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMzlcIiwgLy9SQyAzMDI1MDAzOSA6IE9ixI1lcnN0dml0XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLm9iY2Vyc3R2aXQsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhhdC50cnlDbG9zZSgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgIC8vIGRlZmluY2ljZSBwcm92aWRlcnVcclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPGFueSwgYW55LCBhbnk+KChhLCBiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbmkgcHJvY2Vkb3J1IG5hIHZpZXdcclxuICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhhdC5tb2RlbCwgeyBwcm9jZXNzb3JzOiB7IHByb3ZpZGVyOiBwcm92aWRlciB9IH0pO1xyXG4gICAgICAgICAgICB2YXIgdGFiT2Jkb2JpID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGF0LnRhc2tJZCArIFwibXlUYWJPYmRvYmlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhhdC50aXRsZVRhYixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogZGVmQWtNZW51XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZW51QmFyOiB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFByb2hsaXplbmkqXCIsICBcImFjdFRpc2sqXCIsIFwiYWN0T2JjZXJzdHZpdCpcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICwgXCJhY3RTdGFydEFrY2UqXCJcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAsIFwiYWN0VGVzdEFrY2UqXCJcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAsIFwiYWN0RG9rb25jaXRBa2NpKlwiXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vXSlcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICBsZXQgZ2YgPSB0aGF0LmNyZWF0ZUNvbHMoKTtcclxuICAgICAgICAgICAgdGhhdC4kZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWJPYmRvYmkpXHJcblxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHsgZmlsdGVyVmlzaWJsZTogdHJ1ZSwgY29sdW1uTGlzdDogZ2YuY29sdW1ucy5tYXAoKGMpID0+IGMubmFtZSkuam9pbihcIixcIikgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgb2JqZWt0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSBvYmpla3QuZ2V0U2VsZWN0aW9uKGZhbHNlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlQ29scygpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gVGxhY2l0a28gemF2cml0XHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0WmF2cml0XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREcnVoRG9rbGFkdShncmlkRm9ybWF0LCB7IG5hbWU6IFwiZHJkXCIgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUm9rKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJyb2tcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRNZXNpYyhncmlkRm9ybWF0LCB7IG5hbWU6IFwibWVzaWNcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREZW4oZ3JpZEZvcm1hdCwgeyBuYW1lOiBcImRlblwiIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENpc2xvRG9rbGFkdShncmlkRm9ybWF0LCB7IG5hbWU6IFwiYWNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLm5rcywvL3RoaXMuR2xvYmFsUGFyYW1zLlprcmF0a3k/Lk5rcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoaXMsIHsgaXNFZGl0YWJsZTogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgICAgLy9NRFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3N0cnVjdHVyZUxlYWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMzdcIiwgLy9SQyAzMDI1MDIzNyA6IE1EXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyAgICAgICAgICAgICAgIC8vIERBTFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyODRcIiwgLy9SQyAzMDI1MDI4NCA6IERhbFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUGlkKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxODlcIiwgLy9SQyAzMDI1MDE4OSA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE2MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxOTBcIiwgLy9SQyAzMDI1MDE5MCA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfelwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTkxXCIsIC8vUkMgMzAyNTAxOTEgOiDFmMOhZGVrXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDBcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabm92dW5hY3RlbmkgZGF0XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHJlZnJlc2goKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC52aWV3LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgIHRoYXQudmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLlxyXG4gICAgICAgICAgICAgICAgZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIE5hc3RhdmVuaUFrY2koKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhRm91bmQgPSB0aGlzLnZpZXcuZ2V0Q291bnQoKSA+IDA7XHJcbiAgICAgICAgICAgIHZhciB0b29sdGlwID0gZGF0YUZvdW5kID8gXCJcIiA6IFwianJlczozMDI1MDIwOVwiOyAvL1JDIDMwMjUwMjA5IDogWsOhem5hbXkgbmVuYWxlemVueVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RFZGl0b3ZhdD8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kLCB0b29sdGlwOiB0b29sdGlwIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFjdGhsYXNlbmk/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEtIIERQSCBwb3V6ZSBwcm8gcm9rIDIwMTYgYSB2eXNlXHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0S29udHJvbGFLSD8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kICYmIHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LISA+PSAyMDE2LCB2aXNpYmxlOiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyEgPj0gMjAxNiB9KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE9iZG9iaUtIPy51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQgJiYgdGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0shID49IDIwMTYsIHZpc2libGU6IHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LISA+PSAyMDE2IH0pO1xyXG4gICAgICAgICAgICAvLyB0aXNrXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuR2xvYmFsbmlfUGFyYW1ldHJ5LlBvdm9sZW5pVGlza3UvKnRoaXMuR2xvYmFsUGFyYW1zLlBhcmFtcz8uUG92b2xlbmlUaXNrdSovKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFRpc2s/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0VGlzaz8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDEwNVwiIH0pOyAvL1JDIDMwMjUwMTA1IDogTmVuw60gcG92b2xlbm8gcGFyYW1ldHJlbVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tcImFjdDZcIl0hLnVwZGF0ZSh7IGVuYWJsZWQ6IHRoaXMudGVzdGVkICYmIGRhdGFGb3VuZCwgdG9vbHRpcDogdG9vbHRpcCB9KTsvLyB6YXVjdFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBabm92dW5hY3RlbmkgZGF0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWxvYWQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAvL2lmICh0aGF0LmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuWmF2ZXJlY25lVWNldG5pWmFwaXN5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnNlem5hbVphcGlzdSh7IGFrY2U6IHRoYXQuYWtjZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkgeyB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgU3RhcnQgYWtjZVxyXG4gICAgICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhcnRBa2NlKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy50ZXN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGlkID09IDMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkID09IDIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRpc2tcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5ha2NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5aYXZlcmVjbmVVY2V0bmlaYXBpc3k6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZCA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0dm9yYmEgemFwaXN1XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ha2NlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5LlphdmVyZWNuZVVjZXRuaVphcGlzeSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnphdmVyZWNuZVphcGlzeSgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ha2NlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5LlV6YXZyZW5pVWNldG5pY2hLbmloKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemFwaXN5S25paCgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ha2NlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5Lk90ZXZyZW5pVWNldG5pY2hLbmloKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemFwaXN5S25paE90ZXZyZW5pKClcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5VemF2cmVuaVJvenBvY3R1KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemFwaXN5VXphdnJlbmlSb3p1KClcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5PdGV2cmVuaUVOTlYpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56YXBpc3lPdGV2cmVuaUVOTlYoKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkID09IDUpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRlc3RvdmFuaVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5aYXZlcmVjbmVVY2V0bmlaYXBpc3kpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0WmFwaXN1KCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuVXphdnJlbmlVY2V0bmljaEtuaWgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0WmFwaXN1S25paCgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ha2NlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5Lk90ZXZyZW5pVWNldG5pY2hLbmloKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFphcGlzdU90ZXZyZW5pS25paCgpXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuVXphdnJlbmlSb3pwb2N0dSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlc3RaYXBpc3VSb3p1KClcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5PdGV2cmVuaUVOTlYpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0WmFwaXN1RU5OVigpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNikge1xyXG4gICAgICAgICAgICAgICAgLy8gemF1Y3RvdmFuaVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5aYXZlcmVjbmVVY2V0bmlaYXBpc3kpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56YXVjdG92YW5pWmFwaXN1KCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuVXphdnJlbmlVY2V0bmljaEtuaWgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56YXVjdG92YW5pWmFwaXN1S25paCgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ha2NlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5Lk90ZXZyZW5pVWNldG5pY2hLbmloKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemF1Y3RvdmFuaU90ZXZyZW5pS25paCgpXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuVXphdnJlbmlSb3pwb2N0dSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnphdWN0b3ZhbmlaYXBpc3VSb3p1KClcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5PdGV2cmVuaUVOTlYpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56YXVjdG92YW5pWmFwaXN1T3RldnJlbmlFTk5WKClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmF1Y3RvdmFuaSB6YXBpc3UgUk9adVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemF1Y3RvdmFuaVphcGlzdU90ZXZyZW5pRU5OVigpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMjY3XCIpOyAvL1JDIDMwMjUwMjY3IDogUHJvYsOtaMOhIG90ZXbFmWVuw60gRU5OViwgxI1la2VqdGUgcHJvc8OtbS5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnByb3VjdG92YW5pWmFwaXN5T3RldnJlbmlFTk5WKClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDI2OFwiIC8vUkMgMzAyNTAyNjggOiAgQnlseSBwcm/DusSNdG92w6FueSB6w6FwaXN5IG90ZXbFmWVuw60gRU5OViAhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuemF1Y3RvdmFuaVphcGlzdU90ZXZyZW5pRU5OVigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuTm9TZXJ2ZWQgJiYgcmV0dXJuVmFsdWUuVHlwZU1lc3NhZ2UgPT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VUeXBlVHJhbnNmZXJNZXNzYWdlLlVzZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbmkgb2tuYSBzIGNoeWJhbWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS5saXN0RXJyb3JzKHsgYWdlbmRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRUludUFnZW5kYS5ST1ogfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56b2JyYXplbmlDaHliKGRhdGEsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3RvdmFuaSB6YXBpc3UgdXphdnJlbmkgUk9adVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdGVzdFphcGlzdUVOTlYoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDI2NVwiKTsgLy9SQyAzMDI1MDI2NSA6IFByb2LDrWjDoSB0ZXN0IHrDoXBpc8WvIG90ZXbFmWVuw60gRU5OViwgxI1la2VqdGUgcHJvc8OtbVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkudGVzdFphcGlzeU90ZXZyZW5pRU5OVigpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyNjZcIiAvL1JDIDMwMjUwMjY2IDogVGVzdCB6w6FwaXPFryBvdGV2xZllbsOtIEVOTlYgcHJvYsSbaGwgYmV6IGNoeWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC50ZXN0WmFwaXN1S25paCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuTm9TZXJ2ZWQgJiYgcmV0dXJuVmFsdWUuVHlwZU1lc3NhZ2UgPT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VUeXBlVHJhbnNmZXJNZXNzYWdlLlVzZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbmkgb2tuYSBzIGNoeWJhbWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS5saXN0RXJyb3JzKHsgYWdlbmRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRUludUFnZW5kYS5ST1ogfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56b2JyYXplbmlDaHliKGRhdGEsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphcGlzeSBvdGV2cmVuaSBFTk5WXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6YXBpc3lPdGV2cmVuaUVOTlYodnN0dXA/OiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51VXphdmVya3laYXZlcmVjbmVaYXBpc3lSZXF1ZXN0RHRvLCBkZWZlcnJlcj86IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmZXJyZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAyMjlcIik7IC8vUkMgMzAyNTAyMjkgOiBQcm9iw61ow6Egdnl0dsOhxZllbsOtIHrDoXBpc8WvXHJcbiAgICAgICAgICAgICAgICB2c3R1cCA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS56YXBpc3lPdGV2cmVuaUVOTlYoeyBycTogdnN0dXAgYXMgR29yZGljLkludS5JbnRlcmZhY2UuR0ludVV6YXZlcmt5WmF2ZXJlY25lWmFwaXN5UmVxdWVzdER0byB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDI2M1wiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSkgLy9SQyAzMDI1MDI2MyA6IFrDoXBpc3kgb3RldsWZZW7DrSBFTk5WIGJ5bHkgcHJvdmVkZW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDI2NFwiLCBzdGF0ZTogXCJ3YXJuaW5nXCIgfSkgLy9SQyAzMDI1MDI2NCA6IFrDoXBpc3kgb3RldsWZZW7DrSBFTk5WIG5lYnlseSBwcm92ZWRlbnlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgdnN0dXAsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7IC8vdHJhbnNNc2cuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXBpc3lPdGV2cmVuaUVOTlYodnN0dXAsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphdWN0b3ZhbmkgemFwaXN1IFJPWnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHphdWN0b3ZhbmlaYXBpc3VSb3p1KCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAyNjFcIik7IC8vUkMgMzAyNTAyNjEgOiBQcm9iw61ow6EgcHJvw7rEjXRvdsOhbsOtIHrDoXBpc8WvIHV6YXbFmWVuw60gcm96cG/EjXR1LCDEjWVrZWp0ZSBwcm9zw61tLlxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkucHJvdWN0b3ZhbmlaYXBpc3lVemF2cmVuaVJPWnUoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjYyXCIgLy9SQyAzMDI1MDI2MiA6IEJ5bHkgcHJvw7rEjXRvdsOhbnkgesOhcGlzeSB1emF2xZllbsOtIHJvenBvxI10dSFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIG51bGwsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXVjdG92YW5pWmFwaXN1Um96dSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuTm9TZXJ2ZWQgJiYgcmV0dXJuVmFsdWUuVHlwZU1lc3NhZ2UgPT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VUeXBlVHJhbnNmZXJNZXNzYWdlLlVzZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbmkgb2tuYSBzIGNoeWJhbWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS5saXN0RXJyb3JzKHsgYWdlbmRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRUludUFnZW5kYS5ST1ogfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56b2JyYXplbmlDaHliKGRhdGEsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0b3ZhbmkgemFwaXN1IHV6YXZyZW5pIFJPWnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHRlc3RaYXBpc3VSb3p1KCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAyNTlcIik7IC8vUkMgMzAyNTAyNTkgOiBQcm9iw61ow6EgdGVzdCB6w6FwaXPFryB1emF2xZllbsOtIHJvenBvxI10dSwgxI1la2VqdGUgcHJvc8OtbVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkudGVzdFphcGlzeVV6YXZyZW5pUk9adSgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyNjBcIiAvL1JDIDMwMjUwMjYwIDogVGVzdCB6w6F2xJtyZcSNbsO9Y2ggesOhcGlzxa8gcHJvYsSbaGwgYmV6IGNoeWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQudGVzdFphcGlzdUtuaWgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuUk9aIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXBpc3kgdXphdnJlbmkgUk9adVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemFwaXN5VXphdnJlbmlSb3p1KHZzdHVwPzogR29yZGljLkludS5JbnRlcmZhY2UuR0ludVV6YXZlcmt5WmF2ZXJlY25lWmFwaXN5UmVxdWVzdER0bywgZGVmZXJyZXI/OiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmVycmVyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMjI5XCIpOyAvL1JDIDMwMjUwMjI5IDogUHJvYsOtaMOhIHZ5dHbDocWZZW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgdnN0dXAgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkuemFwaXN5VXphdnJlbmlST1p1KHsgcnE6IHZzdHVwIGFzIEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVVemF2ZXJreVphdmVyZWNuZVphcGlzeVJlcXVlc3REdG8gfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAyNThcIiwgc3RhdGU6IFwic3VjY2Vzc1wiIH0pIC8vUkMgMzAyNTAyNTggOiBaw6FwaXN5IHV6YXbFmWVuw60gcm96cG/EjXR1IG5lYnlseSB2eXR2b8WZZW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDI1N1wiLCBzdGF0ZTogXCJ3YXJuaW5nXCIgfSkgLy9SQyAzMDI1MDI1NyA6IFrDoXBpc3kgdXphdsWZZW7DrSByb3pwb8SNdHUgbmVieWx5IHZ5dHZvxZllbnlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgdnN0dXAsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7IC8vdHJhbnNNc2cuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXBpc3lVemF2cmVuaVJvenUodnN0dXAsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphcGlzeSBrbmloIHV6YXZyZW5pIC0gb3RldnJlbmlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHphcGlzeUtuaWhPdGV2cmVuaSh2c3R1cD86IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVVemF2ZXJreVphdmVyZWNuZVphcGlzeVJlcXVlc3REdG8sIGRlZmVycmVyPzogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZlcnJlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDIyOVwiKTsgLy9SQyAzMDI1MDIyOSA6IFByb2LDrWjDoSB2eXR2w6HFmWVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgICAgIHZzdHVwID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnphcGlzeU90ZXZyZW5pS25paCh7IHJxOiB2c3R1cCBhcyBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51VXphdmVya3laYXZlcmVjbmVaYXBpc3lSZXF1ZXN0RHRvIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwMjM0XCIsIHN0YXRlOiBcInN1Y2Nlc3NcIiB9KSAvL1JDIDMwMjUwMjM0IDogWsOhcGlzeSBvdGV2xZllbsOtIMO6xI1ldG7DrWNoIGtuaWggbmVieWx5IHByb3ZlZGVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAyMzVcIiwgc3RhdGU6IFwid2FybmluZ1wiIH0pIC8vUkMgMzAyNTAyMzUgOiBaw6FwaXN5IG90ZXbFmWVuw60gw7rEjWV0bsOtY2gga25paCBieWx5IHByb3ZlZGVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIFwianJlczozMDI1MDE3NFwiIC8vUkMgMzAyNTAxNzQgOiBPYmRvYsOtIGJ5bG8gcMWZaXByYXZlbm8gayB1esOhdsSbcmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgdnN0dXAsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7IC8vdHJhbnNNc2cuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXBpc3lLbmloT3RldnJlbmkodnN0dXAsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphcGlzeSBrbmloIHV6YXZyZW5pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6YXBpc3lLbmloKHZzdHVwPzogR29yZGljLkludS5JbnRlcmZhY2UuR0ludVV6YXZlcmt5WmF2ZXJlY25lWmFwaXN5UmVxdWVzdER0bywgZGVmZXJyZXI/OiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmVycmVyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMjI5XCIpOyAvL1JDIDMwMjUwMjI5IDogUHJvYsOtaMOhIHZ5dHbDocWZZW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgdnN0dXAgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkuemFwaXN5VXphdktuaWgoeyBycTogdnN0dXAgYXMgR29yZGljLkludS5JbnRlcmZhY2UuR0ludVV6YXZlcmt5WmF2ZXJlY25lWmFwaXN5UmVxdWVzdER0byB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDIxN1wiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSkgLy9SQyAzMDI1MDIxNyA6IFrDoXBpc3kgdXphdsWZZW7DrSDDusSNZXRuw61jaCBrbmloIGJ5bHkgcHJvdmVkZW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDIxNlwiLCBzdGF0ZTogXCJ3YXJuaW5nXCIgfSkgLy9SQyAzMDI1MDIxNiA6IFrDoXBpc3kgdXphdsWZZW7DrSDDusSNZXRuw61jaCBrbmloIG5lYnlseSBwcm92ZWRlbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBcImpyZXM6MzAyNTAxNzRcIiAvL1JDIDMwMjUwMTc0IDogT2Jkb2LDrSBieWxvIHDFmWlwcmF2ZW5vIGsgdXrDoXbEm3JjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIHZzdHVwLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pOyAvL3RyYW5zTXNnLk5hc3RhdmVuaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuemFwaXN5S25paCh2c3R1cCwgZGVmZXJyZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmF1Y3RvdmFuaSB6YXBpc3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHphdWN0b3ZhbmlaYXBpc3UoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDIxMFwiKTsgLy9SQyAzMDI1MDIxMCA6IFByb2LDrWjDoSBwcm/DusSNdG92w6Fuw60gesOhdsSbcmXEjW7DvWNoIHrDoXBpc8WvLCDEjWVrZWp0ZSBwcm9zw61tLlxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkucHJvdWN0b3ZhbmlaYXZlclphcGlzdSgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyMTFcIiAvL1JDIDMwMjUwMjExIDogQnlseSBwcm/DusSNdG92w6FueSB6w6F2xJtyZcSNbsOpIHrDoXBpc3kgIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMudGVzdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIG51bGwsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXZlcmVjbmVaYXBpc3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuVUNUIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmF1Y3RvdmFuaSB6YXBpc3Ugb3RldnJlbmkga25paHlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHphdWN0b3ZhbmlPdGV2cmVuaUtuaWgoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDIxMFwiKTsgLy9SQyAzMDI1MDIxMCA6IFByb2LDrWjDoSBwcm/DusSNdG92w6Fuw60gesOhdsSbcmXEjW7DvWNoIHrDoXBpc8WvLCDEjWVrZWp0ZSBwcm9zw61tLlxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkucHJvdWN0b3ZhbmlaYXBpc3lPdGV2cmVuaUtuaWgoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjM5XCIgLy9SQyAzMDI1MDIzOSA6IFByb2LDrWjDoSBwcm/DusSNdG92w6Fuw60gesOhcGlzxa8gb3RldsWZZW7DrSDDusSNLiBrbmloLCDEjWVrZWp0ZSBwcm9zw61tLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlOy8vdHJhbnNNc2cuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnphdWN0b3ZhbmlPdGV2cmVuaUtuaWgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuVUNUIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmF1Y3RvdmFuaSB6YXBpc3UgdXphdnJlbmkga25paFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemF1Y3RvdmFuaVphcGlzdUtuaWgoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDIyMFwiKTsgLy9SQyAzMDI1MDIyMCA6IFByb2LDrWjDoSBwcm/DusSNdG92w6Fuw60gesOhcGlzxa8gdXrDoXbEm3JreSDDusSNLiBrbmloLCDEjWVrZWp0ZSBwcm9zw61tLlxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkucHJvdWN0b3ZhbmlaYXBpc3lVemF2cmVuaUtuaWgoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjIxXCIgLy9SQyAzMDI1MDIyMSA6IEJ5bHkgcHJvw7rEjXRvdsOhbnkgesOhcGlzeSB1esOhdsSbcmt5IMO6xI1ldG7DrWNoIGtuaWggIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMudGVzdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIG51bGwsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXVjdG92YW5pWmFwaXN1S25paCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuTm9TZXJ2ZWQgJiYgcmV0dXJuVmFsdWUuVHlwZU1lc3NhZ2UgPT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VUeXBlVHJhbnNmZXJNZXNzYWdlLlVzZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbmkgb2tuYSBzIGNoeWJhbWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS5saXN0RXJyb3JzKHsgYWdlbmRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRUludUFnZW5kYS5VQ1QgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56b2JyYXplbmlDaHliKGRhdGEsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0b3ZhbmkgemFwaXN1IHV6YXZyZW5pIGtuaWhcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHRlc3RaYXBpc3VLbmloKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAyMThcIik7IC8vUkMgMzAyNTAyMTggOiBQcm9iw61ow6EgdGVzdCB6w6FwaXPFryB1esOhdsSbcmt5IMO6xI0uIGtuaWgsIMSNZWtlanRlIHByb3PDrW1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnRlc3RaYXBpc3lVemF2cmVuaUtuaWgoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjE5XCIgLy9SQyAzMDI1MDIxOSA6IFRlc3QgesOhcGlzxa8gdXrDoXbEm3JreSDDusSNLiBrbmloIHByb2LEm2hsIGJleiBjaHliXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlOy8vdHJhbnNNc2cuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnRlc3RaYXBpc3VLbmloKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZCAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuaSBva25hIHMgY2h5YmFtaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RFcnJvcnMoeyBhZ2VuZGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlVDVCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhemVuaUNoeWIoZGF0YSwgZGVmZXJyZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAqIFRlc3RvdmFuaSB6YXBpc3Ugb3RldnJlbmkga25paFxyXG4gICAgICAgICAgKiBcclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB0ZXN0WmFwaXN1T3RldnJlbmlLbmloKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAyNDBcIik7IC8vUkMgMzAyNTAyNDAgOiBQcm9iw61ow6EgdGVzdCB6w6FwaXPFryBvdGV2xZllbsOtIMO6xI0uIGtuaWgsIMSNZWtlanRlIHByb3PDrW1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnRlc3RaYXBpc3lPdGV2cmVuaUtuaWgoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjQxXCIgLy9SQyAzMDI1MDI0MSA6IFRlc3QgesOhcGlzxa8gb3RldsWZZW7DrSDDusSNLiBrbmloIHByb2LEm2hsIGJleiBjaHliXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlOy8vdHJhbnNNc2cuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnRlc3RaYXBpc3VPdGV2cmVuaUtuaWgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuVUNUIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3RvdmFuaSB6YXBpc3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHRlc3RaYXBpc3UoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDIwOFwiKTsgLy9SQyAzMDI1MDIwOCA6IFByb2LDrWjDoSB0ZXN0IHrDoXbEm3JlxI1uw71jaCB6w6FwaXPFrywgxI1la2VqdGUgcHJvc8OtbVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkudGVzdFByaXByYXZlbnljaFphcGlzdVVDVCgpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyMDdcIiAvL1JDIDMwMjUwMjA3IDogVGVzdCB6w6F2xJtyZcSNbsO9Y2ggesOhcGlzxa8gcHJvYsSbaGwgYmV6IGNoeWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuemF2ZXJlY25lWmFwaXN5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZCAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuaSBva25hIHMgY2h5YmFtaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RFcnJvcnMoeyBhZ2VuZGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlVDVCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhemVuaUNoeWIoZGF0YSwgZGVmZXJyZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmF2ZXJlY25lIHphcGlzXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6YXZlcmVjbmVaYXBpc3kodnN0dXA/OiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51VXphdmVya3laYXZlcmVjbmVaYXBpc3lSZXF1ZXN0RHRvLCAgZGVmZXJyZXI/OiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmVycmVyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMjI5XCIpOyAvL1JDIDMwMjUwMjI5IDogUHJvYsOtaMOhIHZ5dHbDocWZZW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgdnN0dXAgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkuemF2ZXJlY25lWmFwaXN5KHsgcnE6IHZzdHVwIGFzIEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVVemF2ZXJreVphdmVyZWNuZVphcGlzeVJlcXVlc3REdG8gfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAyMDVcIiwgc3RhdGU6IFwic3VjY2Vzc1wiIH0pIC8vUkMgMzAyNTAyMDUgOiBaw6F2xJtyZcSNbsOpIHrDoXBpc3kgYnlseSB2eXR2b8WZZW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDIwNlwiLCBzdGF0ZTogXCJ3YXJuaW5nXCIgfSkgLy9SQyAzMDI1MDIwNiA6IFrDoXbEm3JlxI1uw6kgesOhcGlzeSBuZWJ5bHkgdnl0dm/FmWVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIFwianJlczozMDI1MDE3NFwiIC8vUkMgMzAyNTAxNzQgOiBPYmRvYsOtIGJ5bG8gcMWZaXByYXZlbm8gayB1esOhdsSbcmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgdnN0dXAsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzdHVwIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7IC8vdHJhbnNNc2cuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXZlcmVjbmVaYXBpc3kodnN0dXAsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgb2tuYSBzIGNoeWJhbWlcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqIEBwYXJhbSBkZWZlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgem9icmF6ZW5pQ2h5YihkYXRhOkdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVDaHlieVV6YXZlcmt5RHRvW10sIGRlZmVyOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdTZXpuYW1DaHliLCB7IGRhdGE6IGRhdGEgfSwgXCJqcmVzOjMwMjUwMjIzXCIsIDgwMCwgNjAwLCB0cnVlKSAvL1JDIDMwMjUwMjIzIDogVsO9cGlzIGNoeWJcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==