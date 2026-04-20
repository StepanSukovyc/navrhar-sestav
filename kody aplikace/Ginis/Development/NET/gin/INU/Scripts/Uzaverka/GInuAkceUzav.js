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
            let GInuAkceUzav = class GInuAkceUzav extends Gordic.GContentBase {
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
                        data: [], //that.view,
                        defaultProfile: { filterVisible: true, columnList: gf.columns.map((c) => c.name).join(",") },
                        selection: function (ev, objekt) {
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
                    // this.refresh();
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
                    that.$grid.ggrid("setData", that.view);
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
                    this.actions.actKontrolaKH?.update({ enabled: dataFound && this.GlobalParams.EkoParams?.ROK >= 2016, visible: this.GlobalParams.EkoParams?.ROK >= 2016 });
                    this.actions.actObdobiKH?.update({ enabled: dataFound && this.GlobalParams.EkoParams?.ROK >= 2016, visible: this.GlobalParams.EkoParams?.ROK >= 2016 });
                    // tisk
                    if (this.globals.Globalni_Parametry.PovoleniTisku /*this.GlobalParams.Params?.PovoleniTisku*/) {
                        this.actions.actTisk?.update({ enabled: dataFound, tooltip: tooltip });
                    }
                    else
                        this.actions.actTisk?.update({ enabled: false, tooltip: "jres:30250105" }); //RC 30250105 : Není povoleno parametrem
                    // this.actions["act6"]!.update({ enabled: this.tested && dataFound, tooltip: tooltip });// zauct
                    this.actions["act6"].update({ enabled: this.tested, tooltip: tooltip }); // zauct
                }
                /**
                 *  Znovunacteni dat
                 *
                 */
                reload() {
                    var that = this;
                    var def = $.Deferred();
                    if (that.closed)
                        return def.resolve().promise();
                    //if (that.akce == Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.ZaverecneUcetniZapisy)
                    {
                        Gordic.Isl.InuiUzaverkaUcetnihoObdobi.seznamZapisu({ akce: that.akce })
                            .get()
                            .done(function (result) {
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
                    this.tested = true;
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
                                        return that.testZapisuENNV();
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
                                        //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                                        return that.testZapisuRozu();
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
                            that.showFlash({ label: "jres:30250235", state: "success" }); //RC 30250235 : Zápisy otevření účetních knih byly provedeny
                        else
                            that.showFlash({ label: "jres:30250234", state: "warning" }); //RC 30250234 : Zápisy otevření účetních knih nebyly provedeny
                        //that.refresh();
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
                        //that.refresh();
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
                    var vstup = { agenda: 40 /* Interface.GEInuAgenda.UCT */, krok: 1 /* Interface.GEOperaceRocniUzaverky.ZaverecneZapisy */, operace: 0 /* Interface.GEOperaceNaZapisech.Prouctovani */ };
                    var task = Gordic.Async.GTaskManager.start("Gordic.Inu.Server.GInuUzaverkaAsync", vstup);
                    that.beginOperation({
                        progress: 0, total: 100, text: "jres:30250210", //RC 30250210 : Probíhá proúčtování závěrečných zápisů, čekejte prosím.
                        cancelAction: new GAction({ caption: "jres:30250332", run: () => { task.cancel(); }, name: "cancelAct" }) //RC 30250332 : Storno
                    }); //RC 30250332 : Storno
                    task.getPromise()
                        .then((result) => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250211" //RC 30250211 : Byly proúčtovány závěrečné zápisy !
                        );
                        //that.refresh();
                        //this.tested = true;
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var exp_data = jqXHR.exception.data;
                        var exp_data_validationResult;
                        var returnValue = {};
                        //debugger;
                        if (exp_data) {
                            exp_data_validationResult = exp_data.validationResult;
                            if (exp_data_validationResult.Length = 1) {
                                returnValue = exp_data_validationResult[0];
                            }
                        }
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, { T_F_M: exp_data_validationResult }, "validation", null, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .then(function (returnValue) {
                                if (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        return that.zauctovaniZapisu();
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
                                }
                            });
                            return deferrer.promise();
                        }
                        that.endOperation();
                    })
                        .progress((a) => {
                        if (a.progress)
                            that.progressOperation({ progress: a.progress.current, total: a.progress.total, text: a.progress.text });
                    }).always(() => { that.endOperation(); })
                        .fail(() => { deferrer.reject(); });
                    //    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZaverZapisu()
                    //        .get()
                    //        .then(
                    //            () => {
                    //                that.endOperation();
                    //                that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                    //                    "jres:30250211" //RC 30250211 : Byly proúčtovány závěrečné zápisy !
                    //                ,
                    //                );
                    //                that.refresh();
                    //                //this.tested = true;
                    //                that.NastaveniAkci();
                    //                return deferrer.resolve();
                    //                //return deffer.promise();
                    //            }
                    //            , function (jqXHR, type, obj) {
                    //                var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null as any);
                    //                if (typeof returnMessage === "object") {
                    //                    // ziskani zprav poslanych ze serveru
                    //                    // test, zda jsou poslany nejake zpravy
                    //                    if (true/*transMsgTst != null*/) {
                    //                        returnMessage
                    //                            .done(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                                if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat) {
                    //                                    //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                    //                                    return that.zaverecneZapisy();
                    //                                }
                    //                                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed && returnValue.TypeMessage == Gordic.Eko.Interface.GETypeTransferMessage.UserMessage) {
                    //                                    that.endOperation();
                    //                                    // zobrazeni okna s chybami
                    //                                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: Gordic.Inu.Interface.GEInuAgenda.UCT })
                    //                                        .getData()
                    //                                        .then((data) => {
                    //                                            that.zobrazeniChyb(data, deferrer);
                    //                                        })
                    //                                    return deferrer.reject();
                    //                                }
                    //                                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error) {
                    //                                    that.endOperation();
                    //                                    return deferrer.reject();
                    //                                }
                    //                                else {
                    //                                    that.endOperation();
                    //                                    return deferrer.resolve();
                    //                                }
                    //                            }
                    //                            )
                    //                        return deferrer.promise();
                    //                    }
                    //                }
                    //                that.endOperation();
                    //            }
                    //        )
                    //        ;
                }
                /**
                 * Zauctovani zapisu otevreni knihy
                 *
                 */
                zauctovaniOtevreniKnih() {
                    let that = this;
                    let deferrer = $.Deferred();
                    var vstup = { agenda: 40 /* Interface.GEInuAgenda.UCT */, krok: 10 /* Interface.GEOperaceRocniUzaverky.ZapisyOtevreniKnih */, operace: 0 /* Interface.GEOperaceNaZapisech.Prouctovani */ };
                    var task = Gordic.Async.GTaskManager.start("Gordic.Inu.Server.GInuUzaverkaAsync", vstup);
                    that.beginOperation({
                        progress: 0, total: 100, text: "jres:30250239", //RC 30250239 : Probíhá proúčtování zápisů otevření úč. knih, čekejte prosím.
                        cancelAction: new GAction({ caption: "jres:30250332", run: () => { task.cancel(); }, name: "cancelAct" }) //RC 30250332 : Storno
                    }); //RC 30250332 : Storno
                    task.getPromise()
                        .then((result) => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30450041" //RC 30450041 : Byly proúčtovány zápisy otevření účetních knih !
                        );
                        //that.refresh();
                        //this.tested = true;
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var exp_data = jqXHR.exception.data;
                        var exp_data_validationResult;
                        var returnValue = {};
                        //debugger;
                        if (exp_data) {
                            exp_data_validationResult = exp_data.validationResult;
                            if (exp_data_validationResult.Length = 1) {
                                returnValue = exp_data_validationResult[0];
                            }
                        }
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, { T_F_M: exp_data_validationResult }, "validation", null, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .then(function (returnValue) {
                                if (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
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
                                    }
                                    else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                }
                            });
                            return deferrer.promise();
                        }
                        that.endOperation();
                    })
                        .progress((a) => {
                        if (a.progress)
                            that.progressOperation({ progress: a.progress.current, total: a.progress.total, text: a.progress.text });
                    }).always(() => { that.endOperation(); })
                        .fail(() => { deferrer.reject(); });
                    //return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZapisyOtevreniKnih()
                    //    .get()
                    //    .then(
                    //        () => {
                    //            that.endOperation();
                    //            that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                    //                "jres:30450041" //RC 30450041 : Byly proúčtovány zápisy otevření účetních knih !
                    //            ,
                    //            );
                    //            that.refresh();
                    //            that.NastaveniAkci();
                    //            return deferrer.resolve();
                    //        }
                    //        , function (jqXHR, type, obj) {
                    //            var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null as any);
                    //            if (typeof returnMessage === "object") {
                    //                // ziskani zprav poslanych ze serveru
                    //                // test, zda jsou poslany nejake zpravy
                    //                if (true/*transMsgTst != null*/) {
                    //                    returnMessage
                    //                        .done(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                            if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat) {
                    //                                //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                    //                                return that.zauctovaniOtevreniKnih();
                    //                            }
                    //                            else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed && returnValue.TypeMessage == Gordic.Eko.Interface.GETypeTransferMessage.UserMessage) {
                    //                                that.endOperation();
                    //                                // zobrazeni okna s chybami
                    //                                return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: Gordic.Inu.Interface.GEInuAgenda.UCT })
                    //                                    .getData()
                    //                                    .then((data) => {
                    //                                        that.zobrazeniChyb(data, deferrer);
                    //                                    })
                    //                                return deferrer.reject();
                    //                            }
                    //                            else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error) {
                    //                                that.endOperation();
                    //                                return deferrer.reject();
                    //                            }
                    //                            else {
                    //                                that.endOperation();
                    //                                return deferrer.resolve();
                    //                            }
                    //                        }
                    //                        )
                    //                    return deferrer.promise();
                    //                }
                    //            }
                    //            that.endOperation();
                    //        }
                    //    )
                    //    ;
                }
                /**
                 * Zauctovani zapisu uzavreni knih
                 *
                 */
                zauctovaniZapisuKnih() {
                    let that = this;
                    let deferrer = $.Deferred();
                    var vstup = { agenda: 40 /* Interface.GEInuAgenda.UCT */, krok: 6 /* Interface.GEOperaceRocniUzaverky.ZapisyUzavreniKnih */, operace: 0 /* Interface.GEOperaceNaZapisech.Prouctovani */ };
                    var task = Gordic.Async.GTaskManager.start("Gordic.Inu.Server.GInuUzaverkaAsync", vstup);
                    that.beginOperation({
                        progress: 0, total: 100, text: "jres:30250220", //RC 30250220 : Probíhá proúčtování zápisů uzávěrky úč. knih, čekejte prosím.
                        cancelAction: new GAction({ caption: "jres:30250332", run: () => { task.cancel(); }, name: "cancelAct" }) //RC 30250332 : Storno
                    }); //RC 30250332 : Storno
                    task.getPromise()
                        .then((result) => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250221" //RC 30250221 : Byly proúčtovány zápisy uzávěrky účetních knih !
                        );
                        //that.refresh();
                        //this.tested = true;
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var exp_data = jqXHR.exception.data;
                        var exp_data_validationResult;
                        var returnValue = {};
                        //debugger;
                        if (exp_data) {
                            exp_data_validationResult = exp_data.validationResult;
                            if (exp_data_validationResult.Length = 1) {
                                returnValue = exp_data_validationResult[0];
                            }
                        }
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, { T_F_M: exp_data_validationResult }, "validation", null, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .then(function (returnValue) {
                                if (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        return that.zauctovaniZapisu();
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
                                }
                            });
                            return deferrer.promise();
                        }
                        that.endOperation();
                    })
                        .progress((a) => {
                        if (a.progress)
                            that.progressOperation({ progress: a.progress.current, total: a.progress.total, text: a.progress.text });
                    }).always(() => { that.endOperation(); })
                        .fail(() => { deferrer.reject(); });
                    //    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.prouctovaniZapisyUzavreniKnih()
                    //        .get()
                    //        .then(
                    //            () => {
                    //                that.endOperation();
                    //                that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                    //                    "jres:30250221" //RC 30250221 : Byly proúčtovány zápisy uzávěrky účetních knih !
                    //                ,
                    //                );
                    //                that.refresh();
                    //                //this.tested = true;
                    //                that.NastaveniAkci();
                    //                return deferrer.resolve();
                    //                //return deffer.promise();
                    //            }
                    //            , function (jqXHR, type, obj) {
                    //                var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null as any);
                    //                if (typeof returnMessage === "object") {
                    //                    // ziskani zprav poslanych ze serveru
                    //                    // test, zda jsou poslany nejake zpravy
                    //                    if (true/*transMsgTst != null*/) {
                    //                        returnMessage
                    //                            .done(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                                if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat) {
                    //                                    //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                    //                                    return that.zauctovaniZapisuKnih();
                    //                                }
                    //                                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed && returnValue.TypeMessage == Gordic.Eko.Interface.GETypeTransferMessage.UserMessage) {
                    //                                    that.endOperation();
                    //                                    // zobrazeni okna s chybami
                    //                                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: Gordic.Inu.Interface.GEInuAgenda.UCT })
                    //                                        .getData()
                    //                                        .then((data) => {
                    //                                            that.zobrazeniChyb(data, deferrer);
                    //                                        })
                    //                                    return deferrer.reject();
                    //                                }
                    //                                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error) {
                    //                                    that.endOperation();
                    //                                    return deferrer.reject();
                    //                                }
                    //                                else {
                    //                                    that.endOperation();
                    //                                    return deferrer.resolve();
                    //                                }
                    //                            }
                    //                            )
                    //                        return deferrer.promise();
                    //                    }
                    //                }
                    //                that.endOperation();
                    //            }
                    //        )
                    //        ;
                }
                /**
                 * Testovani zapisu uzavreni knih
                 *
                 */
                testZapisuKnih() {
                    let that = this;
                    let deferrer = $.Deferred();
                    var vstup = { agenda: 40 /* Interface.GEInuAgenda.UCT */, krok: 6 /* Interface.GEOperaceRocniUzaverky.ZapisyUzavreniKnih */, operace: 1 /* Interface.GEOperaceNaZapisech.Testovani */ };
                    var task = Gordic.Async.GTaskManager.start("Gordic.Inu.Server.GInuUzaverkaAsync", vstup);
                    that.beginOperation({
                        progress: 0, total: 100, text: "jres:30250218", //RC 30250218 : Probíhá test zápisů uzávěrky úč. knih, čekejte prosím
                        cancelAction: new GAction({ caption: "jres:30250332", run: () => { task.cancel(); }, name: "cancelAct" }) //RC 30250332 : Storno
                    }); //RC 30250332 : Storno
                    task.getPromise()
                        .then((result) => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250219" //RC 30250219 : Test zápisů uzávěrky úč. knih proběhl bez chyb
                        );
                        //that.refresh();
                        this.tested = true;
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var exp_data = jqXHR.exception.data;
                        var exp_data_validationResult;
                        var returnValue = {};
                        //debugger;
                        if (exp_data) {
                            exp_data_validationResult = exp_data.validationResult;
                            if (exp_data_validationResult.Length = 1) {
                                returnValue = exp_data_validationResult[0];
                            }
                        }
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, { T_F_M: exp_data_validationResult }, "validation", null, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .then(function (returnValue) {
                                if (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
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
                                    }
                                    else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                }
                            });
                            return deferrer.promise();
                        }
                        that.endOperation();
                    })
                        .progress((a) => {
                        if (a.progress)
                            that.progressOperation({ progress: a.progress.current, total: a.progress.total, text: a.progress.text });
                    }).always(() => { that.endOperation(); })
                        .fail(() => { deferrer.reject(); });
                    //    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.testZapisyUzavreniKnih()
                    //        .get()
                    //        .then(
                    //            () => {
                    //                that.endOperation();
                    //                that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                    //                    "jres:30250219" //RC 30250219 : Test zápisů uzávěrky úč. knih proběhl bez chyb
                    //                ,
                    //                );
                    //                //that.refresh();
                    //                this.tested = true;
                    //                that.NastaveniAkci();
                    //                return deferrer.resolve();
                    //            }
                    //            , function (jqXHR, type, obj) {
                    //                var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null as any);
                    //                if (typeof returnMessage === "object") {
                    //                    // ziskani zprav poslanych ze serveru
                    //                    // test, zda jsou poslany nejake zpravy
                    //                    if (true/*transMsgTst != null*/) {
                    //                        returnMessage
                    //                            .done(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                                if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat) {
                    //                                    //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                    //                                    return that.testZapisuKnih();
                    //                                }
                    //                                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed && returnValue.TypeMessage == Gordic.Eko.Interface.GETypeTransferMessage.UserMessage) {
                    //                                    that.endOperation();
                    //                                    // zobrazeni okna s chybami
                    //                                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: Gordic.Inu.Interface.GEInuAgenda.UCT })
                    //                                        .getData()
                    //                                        .then((data) => {
                    //                                            that.zobrazeniChyb(data, deferrer);
                    //                                        })
                    //                                    //return deferrer.reject();
                    //                                }
                    //                                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error) {
                    //                                    that.endOperation();
                    //                                    return deferrer.reject();
                    //                                }
                    //                                else {
                    //                                    that.endOperation();
                    //                                    return deferrer.resolve();
                    //                                }
                    //                            }
                    //                            )
                    //                        return deferrer.promise();
                    //                    }
                    //                }
                    //                that.endOperation();
                    //            }
                    //        )
                    //        ;
                }
                /**
                  * Testovani zapisu otevreni knih
                  *
                  */
                testZapisuOtevreniKnih() {
                    let that = this;
                    let deferrer = $.Deferred();
                    var vstup = { agenda: 40 /* Interface.GEInuAgenda.UCT */, krok: 10 /* Interface.GEOperaceRocniUzaverky.ZapisyOtevreniKnih */, operace: 1 /* Interface.GEOperaceNaZapisech.Testovani */ };
                    var task = Gordic.Async.GTaskManager.start("Gordic.Inu.Server.GInuUzaverkaAsync", vstup);
                    that.beginOperation({
                        progress: 0, total: 100, text: "jres:30250240", //RC 30250240 : Probíhá test zápisů otevření úč. knih, čekejte prosím
                        cancelAction: new GAction({ caption: "jres:30250332", run: () => { task.cancel(); }, name: "cancelAct" }) //RC 30250332 : Storno
                    }); //RC 30250332 : Storno
                    task.getPromise()
                        .then((result) => {
                        that.endOperation();
                        that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                        "jres:30250241" //RC 30250241 : Test zápisů otevření úč. knih proběhl bez chyb
                        );
                        //that.refresh();
                        this.tested = true;
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, function (jqXHR, type, obj) {
                        var exp_data = jqXHR.exception.data;
                        var exp_data_validationResult;
                        var returnValue = {};
                        //debugger;
                        if (exp_data) {
                            exp_data_validationResult = exp_data.validationResult;
                            if (exp_data_validationResult.Length = 1) {
                                returnValue = exp_data_validationResult[0];
                            }
                        }
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, { T_F_M: exp_data_validationResult }, "validation", null, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .then(function (returnValue) {
                                if (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
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
                                    }
                                    else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                        that.endOperation();
                                        return deferrer.reject();
                                    }
                                    else {
                                        that.endOperation();
                                        return deferrer.resolve();
                                    }
                                }
                            });
                            return deferrer.promise();
                        }
                        that.endOperation();
                    })
                        .progress((a) => {
                        if (a.progress)
                            that.progressOperation({ progress: a.progress.current, total: a.progress.total, text: a.progress.text });
                    }).always(() => { that.endOperation(); })
                        .fail(() => { deferrer.reject(); });
                    //    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.testZapisyOtevreniKnih()
                    //        .get()
                    //        .then(
                    //            () => {
                    //                that.endOperation();
                    //                that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                    //                    "jres:30250241" //RC 30250241 : Test zápisů otevření úč. knih proběhl bez chyb
                    //                ,
                    //                );
                    //                //that.refresh();
                    //                this.tested = true;
                    //                that.NastaveniAkci();
                    //                return deferrer.resolve();
                    //            }
                    //            , function (jqXHR, type, obj) {
                    //                var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null as any);
                    //                if (typeof returnMessage === "object") {
                    //                    // ziskani zprav poslanych ze serveru
                    //                    // test, zda jsou poslany nejake zpravy
                    //                    if (true/*transMsgTst != null*/) {
                    //                        returnMessage
                    //                            .done(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                                if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat) {
                    //                                    //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                    //                                    return that.testZapisuOtevreniKnih();
                    //                                }
                    //                                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed && returnValue.TypeMessage == Gordic.Eko.Interface.GETypeTransferMessage.UserMessage) {
                    //                                    that.endOperation();
                    //                                    // zobrazeni okna s chybami
                    //                                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: Gordic.Inu.Interface.GEInuAgenda.UCT })
                    //                                        .getData()
                    //                                        .then((data) => {
                    //                                            that.zobrazeniChyb(data, deferrer);
                    //                                        })
                    //                                    //return deferrer.reject();
                    //                                }
                    //                                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error) {
                    //                                    that.endOperation();
                    //                                    return deferrer.reject();
                    //                                }
                    //                                else {
                    //                                    that.endOperation();
                    //                                    return deferrer.resolve();
                    //                                }
                    //                            }
                    //                            )
                    //                        return deferrer.promise();
                    //                    }
                    //                }
                    //                that.endOperation();
                    //            }
                    //        )
                    //        ;
                }
                /**
                 * Testovani zapisu
                 *
                 */
                testZapisu() {
                    let that = this;
                    let deferrer = $.Deferred();
                    var vstup = { agenda: 40 /* Interface.GEInuAgenda.UCT */, krok: 1 /* Interface.GEOperaceRocniUzaverky.ZaverecneZapisy */, operace: 1 /* Interface.GEOperaceNaZapisech.Testovani */ };
                    var task = Gordic.Async.GTaskManager.start("Gordic.Inu.Server.GInuUzaverkaAsync", vstup);
                    that.beginOperation({
                        progress: 0, total: 100, text: "jres:30250208", //RC 30250208 : Probíhá test závěrečných zápisů, čekejte prosím
                        cancelAction: new GAction({ caption: "jres:30250332", run: () => { task.cancel(); }, name: "cancelAct" }) //RC 30250332 : Storno
                    }); //RC 30250332 : Storno
                    task.getPromise()
                        .then((result) => {
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
                        var exp_data = jqXHR.exception.data;
                        var exp_data_validationResult;
                        var returnValue = {};
                        //debugger;
                        if (exp_data) {
                            exp_data_validationResult = exp_data.validationResult;
                            if (exp_data_validationResult.Length = 1) {
                                returnValue = exp_data_validationResult[0];
                            }
                        }
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, { T_F_M: exp_data_validationResult }, "validation", null, null);
                        if (typeof returnMessage === "object") {
                            returnMessage
                                .then(function (returnValue) {
                                if (returnValue) {
                                    if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                        return that.testZapisu();
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
                                }
                            });
                            return deferrer.promise();
                        }
                        that.endOperation();
                    })
                        .progress((a) => {
                        if (a.progress)
                            that.progressOperation({ progress: a.progress.current, total: a.progress.total, text: a.progress.text });
                    }).always(() => { that.endOperation(); })
                        .fail(() => { deferrer.reject(); });
                    //    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.testPripravenychZapisuUCT()
                    //        .get()
                    //        .then(
                    //            () => {
                    //                that.endOperation();
                    //                that.dialogs.messageBox("jres:30250175", //RC 30250175 : Informace
                    //                    "jres:30250207" //RC 30250207 : Test závěrečných zápisů proběhl bez chyb
                    //                );
                    //                //that.refresh();
                    //                this.tested = true;
                    //                that.NastaveniAkci();
                    //                return deferrer.resolve();
                    //                //return deffer.promise();
                    //            }
                    //            , function (jqXHR, type, obj) {
                    //                debugger;
                    //                var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, null, null as any);
                    //                if (typeof returnMessage === "object") {
                    //                    // ziskani zprav poslanych ze serveru
                    //                    // test, zda jsou poslany nejake zpravy
                    //                    if (true/*transMsgTst != null*/) {
                    //                        returnMessage
                    //                            .done(function (returnValue: Gordic.Eko.Interface.GTransferMessage) {
                    //                                if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat) {
                    //                                    //vstup!.IdMessage = returnValue.IdMessage;//transMsg.IdMessage;
                    //                                    return that.zaverecneZapisy();
                    //                                }
                    //                                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.NoServed && returnValue.TypeMessage == Gordic.Eko.Interface.GETypeTransferMessage.UserMessage) {
                    //                                    that.endOperation();
                    //                                    // zobrazeni okna s chybami
                    //                                    return Gordic.Isl.InuiUzaverkaUcetnihoObdobi.listErrors({ agenda: Gordic.Inu.Interface.GEInuAgenda.UCT })
                    //                                        .getData()
                    //                                        .then((data) => {
                    //                                            that.zobrazeniChyb(data, deferrer);
                    //                                        })
                    //                                }
                    //                                else if (returnValue.Result === Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error) {
                    //                                    that.endOperation();
                    //                                    return deferrer.reject();
                    //                                }
                    //                                else {
                    //                                    that.endOperation();
                    //                                    return deferrer.resolve();
                    //                                }
                    //                            }
                    //                            )
                    //                        return deferrer.promise();
                    //                    }
                    //                }
                    //                that.endOperation();
                    //            }
                    //        );
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
                        //that.refresh();
                        that.NastaveniAkci();
                        return deferrer.resolve();
                        //return deffer.promise();
                    }, (objError) => Gordic.Eko.WebClient.Common.ExceptionProcessing({
                        content: that, erroObject: objError,
                        repeat: (returnValue) => {
                            vstup.Nastaveni = returnValue.Nastaveni;
                            return that.zaverecneZapisy(vstup, deferrer);
                        },
                        //    error: (returnValue: Gordic.Eko.Interface.GTransferMessage) => {
                        //        that.endOperation();
                        //        that.refresh();
                        //        that.NastaveniAkci();
                        //        //return deferrer.reject();
                        //        throw new GError(objError);
                    }))
                        .always(() => {
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
                        defer.resolve();
                    });
                    return defer.promise();
                }
            };
            GInuAkceUzav = __decorate([
                gcontent
            ], GInuAkceUzav);
            WebClient.GInuAkceUzav = GInuAkceUzav;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0ludUFrY2VVemF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0ludUFrY2VVemF2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFVLE1BQU0sQ0F1d0RmO0FBdndERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1d0RuQjtJQXZ3RGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXV3RDdCO1FBdndEb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLE9BQUEsWUFBWTtnQkFBOUM7b0JBRUksa0NBQWtDO29CQUNsQyw4QkFBOEI7b0JBQzlCOzs7dUJBR0c7O29CQUdIOzt5QkFFSztvQkFDRyxXQUFNLEdBQVksS0FBSyxDQUFDO29CQUt4QixZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQTh1RHJELENBQUM7Z0JBdHRERyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFHaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ2hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLDRGQUE0Rjt3QkFDNUYsSUFBSSxHQUFHLEdBQWtCOzRCQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQWU7NEJBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBaUI7NEJBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBa0I7NEJBQ2hDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBa0I7NEJBRWhDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSzs0QkFDaEIsSUFBSSxFQUFFLEtB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QUMsQ0FpQ0Q7Z0JBQ1QsQ0FBQztnQkFDRDs7OzttQkFJRztnQkFDSyxhQUFhLENBQUMsSUFBaUQsRUFBRSxLQUFVO29CQUMvRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQywwQkFBMEI7eUJBQ3JJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFRO3dCQUM1QixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ25CLENBQUMsQ0FBQyxDQUFDO29CQUVQLE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMzQixDQUFDO2FBRUosQ0FBQTtZQWh3RFksWUFBWTtnQkFEeEIsUUFBUTtlQUNJLFlBQVksQ0Fnd0R4QjtZQWh3RFksc0JBQVksZUFnd0R4QixDQUFBO1FBR0wsQ0FBQyxFQXZ3RG9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXV3RDdCO0lBQUQsQ0FBQyxFQXZ3RGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXV3RG5CO0FBQUQsQ0FBQyxFQXZ3RFMsTUFBTSxLQUFOLE1BQU0sUUF1d0RmIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuSW51LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdJbnVBa2NlVXphdiBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIEdJbnVCYXNlQ2xhc3Mge1xyXG5cclxuICAgICAgICAvL3Rhc2tJZCA9IFwiYWN0U2V6bmFtT2Jkb2JpS0hEUEhcIjtcclxuICAgICAgICAvL3VpZCA9IFwiR1Nlem5hbU9iZG9iaUtIRFBII1wiO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFqYXggcHJvcGVydHlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWw6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdTZXpuYW1PYmRvYmlLSERQSER0b1tdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBhdHJpYnV0IHRlc3RvdmFuaSB6YXpuYW11XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHRlc3RlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdsb2JhbG5pIG5hc3RhdmVuaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcmVhZG9ubHkgR2xvYmFsUGFyYW1zOiBHb3JkaWMuSW51LldlYkNsaWVudC5HSW51R2xvYmFsRHRvO1xyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5JbnUuR2xvYmFscy5HSW51R2xvYmFscztcclxuICAgICAgICByZWFkb25seSBha2NlOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreTtcclxuICAgICAgICAvLyBuYWRwaXMgdGFidVxyXG4gICAgICAgIHJlYWRvbmx5IHRpdGxlVGFiOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBkZWZpbmljZUFrY2k6IEdvcmRpYy5JbnUuV2ViQ2xpZW50LkdEZWZpbmljZUFrY2VEdG9bXTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuSW51Lkdsb2JhbHMuR0ludUdsb2JhbHM7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9iZWNuZSBwcm9wZXJ0eVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgUHJlcEZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG4gICAgICAgIHByb3RlY3RlZCBmb3JtOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBlbGVtOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZpZXcgc2V6bmFtdSBvYmRvYmlcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogR29yZGljLkRhdGEuVmlldztcclxuXHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0LmRlZmluaWNlQWtjaS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGF0LmRlZmluaWNlQWtjaVtpXTtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGZjZSA9IGZ1bmN0aW9uIChpOiBudW1iZXIpIHsgcmV0dXJuICgpID0+IHRoYXQuc3RhcnRBa2NlKHRoYXQuZGVmaW5pY2VBa2NpW2ldLklEISk7IH07XHJcbiAgICAgICAgICAgICAgICBsZXQgYWN0OiBHQWN0aW9uUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGl0ZW0uVGl0bGUgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IGl0ZW0uVG9vbFRpcCBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogaXRlbS5FbmFibGVkIGFzIGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogaXRlbS5WaXNpYmxlIGFzIGJvb2xlYW4sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IGl0ZW0uSWNvbiEsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RcIiArIGl0ZW0uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3RhcnRBa2NlKGl0ZW0uSUQgYXMgbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5JRCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aXNrXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpc2sgPSBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtYTogaXRlbS5UZW1hISwgbmFtZTogXCJhY3RQcnRcIiArIGl0ZW0uSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBwbGF0bm9zdDogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0s/LnRvU3RyaW5nKCkudHJpbSgpICsgXCIxMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdVY3RQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgZmF2b3JpdGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRlbWE6IHJlcC50ZW1hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEU2VzdGF2eTogaXRlbS5GaWx0cixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGQodGlzayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZChhY3QpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbGlzdEFrY2UgPSB0aGlzLmFjdGlvbnMuZ2V0QWN0aW9ucygpO1xyXG4gICAgICAgICAgICB2YXIgZGVmQWtNZW51OiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0QWtjZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZGVmQWtNZW51LnB1c2goeyBhY3Rpb246IGxpc3RBa2NlW2ldLCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIGFrY8OtXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL2FjdE9iY2Vyc3R2aXQ6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiYWN0T2JjZXJzdHZpdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDM5XCIsIC8vUkMgMzAyNTAwMzkgOiBPYsSNZXJzdHZpdFxyXG4gICAgICAgICAgICAgICAgLy8gICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5vYmNlcnN0dml0LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIGFjdFphdnJpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoYXQudHJ5Q2xvc2UoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAvLyBkZWZpbmNpY2UgcHJvdmlkZXJ1XHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBwcm9jZWRvcnUgbmEgdmlld1xyXG4gICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0Lm1vZGVsLCB7IHByb2Nlc3NvcnM6IHsgcHJvdmlkZXI6IHByb3ZpZGVyIH0gfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFiT2Jkb2JpID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGF0LnRhc2tJZCArIFwibXlUYWJPYmRvYmlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhhdC50aXRsZVRhYixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogZGVmQWtNZW51XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZW51QmFyOiB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFByb2hsaXplbmkqXCIsICBcImFjdFRpc2sqXCIsIFwiYWN0T2JjZXJzdHZpdCpcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICwgXCJhY3RTdGFydEFrY2UqXCJcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAsIFwiYWN0VGVzdEFrY2UqXCJcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAsIFwiYWN0RG9rb25jaXRBa2NpKlwiXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vXSlcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNpZSBncmlkdVxyXG4gICAgICAgICAgICBsZXQgZ2YgPSB0aGF0LmNyZWF0ZUNvbHMoKTtcclxuICAgICAgICAgICAgdGhhdC4kZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWJPYmRvYmkpXHJcblxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXSwgLy90aGF0LnZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHsgZmlsdGVyVmlzaWJsZTogdHJ1ZSwgY29sdW1uTGlzdDogZ2YuY29sdW1ucy5tYXAoKGMpID0+IGMubmFtZSkuam9pbihcIixcIikgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgb2JqZWt0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IG9iamVrdC5nZXRTZWxlY3Rpb24oZmFsc2UsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVDb2xzKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVGxhY2l0a28gemF2cml0XHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0WmF2cml0XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREcnVoRG9rbGFkdShncmlkRm9ybWF0LCB7IG5hbWU6IFwiZHJkXCIgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUm9rKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJyb2tcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRNZXNpYyhncmlkRm9ybWF0LCB7IG5hbWU6IFwibWVzaWNcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREZW4oZ3JpZEZvcm1hdCwgeyBuYW1lOiBcImRlblwiIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENpc2xvRG9rbGFkdShncmlkRm9ybWF0LCB7IG5hbWU6IFwiYWNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLm5rcywvL3RoaXMuR2xvYmFsUGFyYW1zLlprcmF0a3k/Lk5rcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoaXMsIHsgaXNFZGl0YWJsZTogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgICAgLy9NRFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3N0cnVjdHVyZUxlYWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyMzdcIiwgLy9SQyAzMDI1MDIzNyA6IE1EXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oeyAgICAgICAgICAgICAgIC8vIERBTFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyODRcIiwgLy9SQyAzMDI1MDI4NCA6IERhbFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUGlkKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxODlcIiwgLy9SQyAzMDI1MDE4OSA6IERhdHVtIHptxJtueVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE2MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6bWVudV9wcm92XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxOTBcIiwgLy9SQyAzMDI1MDE5MCA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfelwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTkxXCIsIC8vUkMgMzAyNTAxOTEgOiDFmMOhZGVrXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDBcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabm92dW5hY3RlbmkgZGF0XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHJlZnJlc2goKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuJGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlldyk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgdGhhdC52aWV3LmdldExvYWRpbmdQcm9taXNlKCkuXHJcbiAgICAgICAgICAgICAgICBkb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgTmFzdGF2ZW5pQWtjaSgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGFGb3VuZCA9IHRoaXMudmlldy5nZXRDb3VudCgpID4gMDtcclxuICAgICAgICAgICAgdmFyIHRvb2x0aXAgPSBkYXRhRm91bmQgPyBcIlwiIDogXCJqcmVzOjMwMjUwMjA5XCI7IC8vUkMgMzAyNTAyMDkgOiBaw6F6bmFteSBuZW5hbGV6ZW55XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEVkaXRvdmF0Py51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0aGxhc2VuaT8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kLCB0b29sdGlwOiB0b29sdGlwIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gS0ggRFBIIHBvdXplIHBybyByb2sgMjAxNiBhIHZ5c2VcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdEtvbnRyb2xhS0g/LnVwZGF0ZSh7IGVuYWJsZWQ6IGRhdGFGb3VuZCAmJiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyEgPj0gMjAxNiwgdmlzaWJsZTogdGhpcy5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0shID49IDIwMTYgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RPYmRvYmlLSD8udXBkYXRlKHsgZW5hYmxlZDogZGF0YUZvdW5kICYmIHRoaXMuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LISA+PSAyMDE2LCB2aXNpYmxlOiB0aGlzLkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyEgPj0gMjAxNiB9KTtcclxuICAgICAgICAgICAgLy8gdGlza1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLkdsb2JhbG5pX1BhcmFtZXRyeS5Qb3ZvbGVuaVRpc2t1Lyp0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlBvdm9sZW5pVGlza3UqLykge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrPy51cGRhdGUoeyBlbmFibGVkOiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdFRpc2s/LnVwZGF0ZSh7IGVuYWJsZWQ6IGZhbHNlLCB0b29sdGlwOiBcImpyZXM6MzAyNTAxMDVcIiB9KTsgLy9SQyAzMDI1MDEwNSA6IE5lbsOtIHBvdm9sZW5vIHBhcmFtZXRyZW1cclxuXHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLmFjdGlvbnNbXCJhY3Q2XCJdIS51cGRhdGUoeyBlbmFibGVkOiB0aGlzLnRlc3RlZCAmJiBkYXRhRm91bmQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7Ly8gemF1Y3RcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW1wiYWN0NlwiXSEudXBkYXRlKHsgZW5hYmxlZDogdGhpcy50ZXN0ZWQsIHRvb2x0aXA6IHRvb2x0aXAgfSk7Ly8gemF1Y3RcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgWm5vdnVuYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuIGRlZi5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAvL2lmICh0aGF0LmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuWmF2ZXJlY25lVWNldG5pWmFwaXN5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnNlem5hbVphcGlzdSh7IGFrY2U6IHRoYXQuYWtjZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7IH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBTdGFydCBha2NlXHJcbiAgICAgICAgICogQHBhcmFtIGlkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGFydEFrY2UoaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnRlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChpZCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aXNrXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuYWtjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuWmF2ZXJlY25lVWNldG5pWmFwaXN5OlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdHZvcmJhIHphcGlzdVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5aYXZlcmVjbmVVY2V0bmlaYXBpc3kpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56YXZlcmVjbmVaYXBpc3koKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5VemF2cmVuaVVjZXRuaWNoS25paClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnphcGlzeUtuaWgoKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5PdGV2cmVuaVVjZXRuaWNoS25paClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnphcGlzeUtuaWhPdGV2cmVuaSgpXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuVXphdnJlbmlSb3pwb2N0dSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnphcGlzeVV6YXZyZW5pUm96dSgpXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuT3RldnJlbmlFTk5WKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemFwaXN5T3RldnJlbmlFTk5WKClcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZCA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0ZXN0b3ZhbmlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuWmF2ZXJlY25lVWNldG5pWmFwaXN5KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFphcGlzdSgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ha2NlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5LlV6YXZyZW5pVWNldG5pY2hLbmloKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFphcGlzdUtuaWgoKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5PdGV2cmVuaVVjZXRuaWNoS25paClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlc3RaYXBpc3VPdGV2cmVuaUtuaWgoKVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ha2NlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5LlV6YXZyZW5pUm96cG9jdHUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0WmFwaXN1Um96dSgpXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuT3RldnJlbmlFTk5WKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFphcGlzdUVOTlYoKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkID09IDYpIHtcclxuICAgICAgICAgICAgICAgIC8vIHphdWN0b3ZhbmlcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuWmF2ZXJlY25lVWNldG5pWmFwaXN5KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemF1Y3RvdmFuaVphcGlzdSgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ha2NlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5LlV6YXZyZW5pVWNldG5pY2hLbmloKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemF1Y3RvdmFuaVphcGlzdUtuaWgoKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuYWtjZSA9PSBHb3JkaWMuSW51LkludGVyZmFjZS5HRVR5cHlTZXpuYW11Um9jbmlVemF2ZXJreS5PdGV2cmVuaVVjZXRuaWNoS25paClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnphdWN0b3ZhbmlPdGV2cmVuaUtuaWgoKVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ha2NlID09IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFVHlweVNlem5hbXVSb2NuaVV6YXZlcmt5LlV6YXZyZW5pUm96cG9jdHUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56YXVjdG92YW5pWmFwaXN1Um96dSgpXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuT3RldnJlbmlFTk5WKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemF1Y3RvdmFuaVphcGlzdU90ZXZyZW5pRU5OVigpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphdWN0b3ZhbmkgemFwaXN1IFJPWnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHphdWN0b3ZhbmlaYXBpc3VPdGV2cmVuaUVOTlYoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDI2N1wiKTsgLy9SQyAzMDI1MDI2NyA6IFByb2LDrWjDoSBvdGV2xZllbsOtIEVOTlYsIMSNZWtlanRlIHByb3PDrW0uXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS5wcm91Y3RvdmFuaVphcGlzeU90ZXZyZW5pRU5OVigpXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyNjhcIiAvL1JDIDMwMjUwMjY4IDogIEJ5bHkgcHJvw7rEjXRvdsOhbnkgesOhcGlzeSBvdGV2xZllbsOtIEVOTlYgIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlOy8vdHJhbnNNc2cuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnphdWN0b3ZhbmlaYXBpc3VPdGV2cmVuaUVOTlYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuUk9aIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0b3ZhbmkgemFwaXN1IHV6YXZyZW5pIFJPWnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHRlc3RaYXBpc3VFTk5WKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAyNjVcIik7IC8vUkMgMzAyNTAyNjUgOiBQcm9iw61ow6EgdGVzdCB6w6FwaXPFryBvdGV2xZllbsOtIEVOTlYsIMSNZWtlanRlIHByb3PDrW1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnRlc3RaYXBpc3lPdGV2cmVuaUVOTlYoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjY2XCIgLy9SQyAzMDI1MDI2NiA6IFRlc3QgesOhcGlzxa8gb3RldsWZZW7DrSBFTk5WIHByb2LEm2hsIGJleiBjaHliXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQudGVzdFphcGlzdUVOTlYoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuUk9aIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXBpc3kgb3RldnJlbmkgRU5OVlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemFwaXN5T3RldnJlbmlFTk5WKHZzdHVwPzogR29yZGljLkludS5JbnRlcmZhY2UuR0ludVV6YXZlcmt5WmF2ZXJlY25lWmFwaXN5UmVxdWVzdER0bywgZGVmZXJyZXI/OiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmVycmVyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMjI5XCIpOyAvL1JDIDMwMjUwMjI5IDogUHJvYsOtaMOhIHZ5dHbDocWZZW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgdnN0dXAgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkuemFwaXN5T3RldnJlbmlFTk5WKHsgcnE6IHZzdHVwIGFzIEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVVemF2ZXJreVphdmVyZWNuZVphcGlzeVJlcXVlc3REdG8gfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAyNjNcIiwgc3RhdGU6IFwic3VjY2Vzc1wiIH0pIC8vUkMgMzAyNTAyNjMgOiBaw6FwaXN5IG90ZXbFmWVuw60gRU5OViBieWx5IHByb3ZlZGVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAyNjRcIiwgc3RhdGU6IFwid2FybmluZ1wiIH0pIC8vUkMgMzAyNTAyNjQgOiBaw6FwaXN5IG90ZXbFmWVuw60gRU5OViBuZWJ5bHkgcHJvdmVkZW55XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIHZzdHVwLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pOyAvL3RyYW5zTXNnLk5hc3RhdmVuaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuemFwaXN5T3RldnJlbmlFTk5WKHZzdHVwLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXVjdG92YW5pIHphcGlzdSBST1p1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6YXVjdG92YW5pWmFwaXN1Um96dSgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMjYxXCIpOyAvL1JDIDMwMjUwMjYxIDogUHJvYsOtaMOhIHByb8O6xI10b3bDoW7DrSB6w6FwaXPFryB1emF2xZllbsOtIHJvenBvxI10dSwgxI1la2VqdGUgcHJvc8OtbS5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnByb3VjdG92YW5pWmFwaXN5VXphdnJlbmlST1p1KClcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDI2MlwiIC8vUkMgMzAyNTAyNjIgOiBCeWx5IHByb8O6xI10b3bDoW55IHrDoXBpc3kgdXphdsWZZW7DrSByb3pwb8SNdHUhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuemF1Y3RvdmFuaVphcGlzdVJvenUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuUk9aIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdG92YW5pIHphcGlzdSB1emF2cmVuaSBST1p1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB0ZXN0WmFwaXN1Um96dSgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMjU5XCIpOyAvL1JDIDMwMjUwMjU5IDogUHJvYsOtaMOhIHRlc3QgesOhcGlzxa8gdXphdsWZZW7DrSByb3pwb8SNdHUsIMSNZWtlanRlIHByb3PDrW1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnRlc3RaYXBpc3lVemF2cmVuaVJPWnUoKVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjYwXCIgLy9SQyAzMDI1MDI2MCA6IFRlc3QgesOhdsSbcmXEjW7DvWNoIHrDoXBpc8WvIHByb2LEm2hsIGJleiBjaHliXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlOy8vdHJhbnNNc2cuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnRlc3RaYXBpc3VSb3p1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZCAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuaSBva25hIHMgY2h5YmFtaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RFcnJvcnMoeyBhZ2VuZGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlJPWiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhemVuaUNoeWIoZGF0YSwgZGVmZXJyZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFwaXN5IHV6YXZyZW5pIFJPWnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHphcGlzeVV6YXZyZW5pUm96dSh2c3R1cD86IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVVemF2ZXJreVphdmVyZWNuZVphcGlzeVJlcXVlc3REdG8sIGRlZmVycmVyPzogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZlcnJlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDIyOVwiKTsgLy9SQyAzMDI1MDIyOSA6IFByb2LDrWjDoSB2eXR2w6HFmWVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgICAgIHZzdHVwID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnphcGlzeVV6YXZyZW5pUk9adSh7IHJxOiB2c3R1cCBhcyBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51VXphdmVya3laYXZlcmVjbmVaYXBpc3lSZXF1ZXN0RHRvIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwMjU4XCIsIHN0YXRlOiBcInN1Y2Nlc3NcIiB9KSAvL1JDIDMwMjUwMjU4IDogWsOhcGlzeSB1emF2xZllbsOtIHJvenBvxI10dSBuZWJ5bHkgdnl0dm/FmWVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAyNTdcIiwgc3RhdGU6IFwid2FybmluZ1wiIH0pIC8vUkMgMzAyNTAyNTcgOiBaw6FwaXN5IHV6YXbFmWVuw60gcm96cG/EjXR1IG5lYnlseSB2eXR2b8WZZW55XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIHZzdHVwLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pOyAvL3RyYW5zTXNnLk5hc3RhdmVuaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuemFwaXN5VXphdnJlbmlSb3p1KHZzdHVwLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXBpc3kga25paCB1emF2cmVuaSAtIG90ZXZyZW5pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6YXBpc3lLbmloT3RldnJlbmkodnN0dXA/OiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51VXphdmVya3laYXZlcmVjbmVaYXBpc3lSZXF1ZXN0RHRvLCBkZWZlcnJlcj86IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmZXJyZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAyMjlcIik7IC8vUkMgMzAyNTAyMjkgOiBQcm9iw61ow6Egdnl0dsOhxZllbsOtIHrDoXBpc8WvXHJcbiAgICAgICAgICAgICAgICB2c3R1cCA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS56YXBpc3lPdGV2cmVuaUtuaWgoeyBycTogdnN0dXAgYXMgR29yZGljLkludS5JbnRlcmZhY2UuR0ludVV6YXZlcmt5WmF2ZXJlY25lWmFwaXN5UmVxdWVzdER0byB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID4gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDIzNVwiLCBzdGF0ZTogXCJzdWNjZXNzXCIgfSkgLy9SQyAzMDI1MDIzNSA6IFrDoXBpc3kgb3RldsWZZW7DrSDDusSNZXRuw61jaCBrbmloIGJ5bHkgcHJvdmVkZW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwMjM0XCIsIHN0YXRlOiBcIndhcm5pbmdcIiB9KSAvL1JDIDMwMjUwMjM0IDogWsOhcGlzeSBvdGV2xZllbsOtIMO6xI1ldG7DrWNoIGtuaWggbmVieWx5IHByb3ZlZGVueVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIHZzdHVwLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pOyAvL3RyYW5zTXNnLk5hc3RhdmVuaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuemFwaXN5S25paE90ZXZyZW5pKHZzdHVwLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXBpc3kga25paCB1emF2cmVuaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemFwaXN5S25paCh2c3R1cD86IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVVemF2ZXJreVphdmVyZWNuZVphcGlzeVJlcXVlc3REdG8sIGRlZmVycmVyPzogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZlcnJlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDIyOVwiKTsgLy9SQyAzMDI1MDIyOSA6IFByb2LDrWjDoSB2eXR2w6HFmWVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgICAgIHZzdHVwID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnphcGlzeVV6YXZLbmloKHsgcnE6IHZzdHVwIGFzIEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVVemF2ZXJreVphdmVyZWNuZVphcGlzeVJlcXVlc3REdG8gfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAyMTdcIiwgc3RhdGU6IFwic3VjY2Vzc1wiIH0pIC8vUkMgMzAyNTAyMTcgOiBaw6FwaXN5IHV6YXbFmWVuw60gw7rEjWV0bsOtY2gga25paCBieWx5IHByb3ZlZGVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAyMTZcIiwgc3RhdGU6IFwid2FybmluZ1wiIH0pIC8vUkMgMzAyNTAyMTYgOiBaw6FwaXN5IHV6YXbFmWVuw60gw7rEjWV0bsOtY2gga25paCBuZWJ5bHkgcHJvdmVkZW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgXCJqcmVzOjMwMjUwMTc0XCIgLy9SQyAzMDI1MDE3NCA6IE9iZG9iw60gYnlsbyBwxZlpcHJhdmVubyBrIHV6w6F2xJtyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCB2c3R1cCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLk5hc3RhdmVuaSA9IHJldHVyblZhbHVlLk5hc3RhdmVuaTsgLy90cmFuc01zZy5OYXN0YXZlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlOy8vdHJhbnNNc2cuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnphcGlzeUtuaWgodnN0dXAsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphdWN0b3ZhbmkgemFwaXN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6YXVjdG92YW5pWmFwaXN1KCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHZzdHVwOiBJbnRlcmZhY2UuR0ludVV6YXZlcmt5Um9rdUR0byA9IHsgYWdlbmRhOiBJbnRlcmZhY2UuR0VJbnVBZ2VuZGEuVUNULCBrcm9rOiBJbnRlcmZhY2UuR0VPcGVyYWNlUm9jbmlVemF2ZXJreS5aYXZlcmVjbmVaYXBpc3ksIG9wZXJhY2U6IEludGVyZmFjZS5HRU9wZXJhY2VOYVphcGlzZWNoLlByb3VjdG92YW5pIH07XHJcbiAgICAgICAgICAgIHZhciB0YXNrID0gR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydDxHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIGFueT4oXCJHb3JkaWMuSW51LlNlcnZlci5HSW51VXphdmVya2FBc3luY1wiLCB2c3R1cCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsIHRvdGFsOiAxMDAsIHRleHQ6IFwianJlczozMDI1MDIxMFwiLCAvL1JDIDMwMjUwMjEwIDogUHJvYsOtaMOhIHByb8O6xI10b3bDoW7DrSB6w6F2xJtyZcSNbsO9Y2ggesOhcGlzxa8sIMSNZWtlanRlIHByb3PDrW0uXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxBY3Rpb246IG5ldyBHQWN0aW9uKHsgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzMyXCIsIHJ1bjogKCkgPT4geyB0YXNrLmNhbmNlbCgpIH0sIG5hbWU6IFwiY2FuY2VsQWN0XCIgfSkgLy9SQyAzMDI1MDMzMiA6IFN0b3Jub1xyXG4gICAgICAgICAgICB9KTsgLy9SQyAzMDI1MDMzMiA6IFN0b3Jub1xyXG4gICAgICAgICAgICB0YXNrLmdldFByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjExXCIgLy9SQyAzMDI1MDIxMSA6IEJ5bHkgcHJvw7rEjXRvdsOhbnkgesOhdsSbcmXEjW7DqSB6w6FwaXN5ICFcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnRlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHBfZGF0YSA9IGpxWEhSLmV4Y2VwdGlvbi5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhwX2RhdGFfdmFsaWRhdGlvblJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4cF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0ID0gZXhwX2RhdGEudmFsaWRhdGlvblJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0Lkxlbmd0aCA9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGV4cF9kYXRhX3ZhbGlkYXRpb25SZXN1bHRbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCB7IFRfRl9NOiBleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0IH0sIFwidmFsaWRhdGlvblwiLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnphdWN0b3ZhbmlaYXBpc3UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuVUNUIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAucHJvZ3Jlc3MoKGE6IHsgcHJvZ3Jlc3M/OiBHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhLnByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb2dyZXNzT3BlcmF0aW9uKHsgcHJvZ3Jlc3M6IGEucHJvZ3Jlc3MuY3VycmVudCwgdG90YWw6IGEucHJvZ3Jlc3MudG90YWwsIHRleHQ6IGEucHJvZ3Jlc3MudGV4dCB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCkgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHsgZGVmZXJyZXIucmVqZWN0KCkgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnByb3VjdG92YW5pWmF2ZXJaYXBpc3UoKVxyXG4gICAgICAgIC8vICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjExXCIgLy9SQyAzMDI1MDIxMSA6IEJ5bHkgcHJvw7rEjXRvdsOhbnkgesOhdsSbcmXEjW7DqSB6w6FwaXN5ICFcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3RoaXMudGVzdGVkID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIG51bGwsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXZlcmVjbmVaYXBpc3koKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZCAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbmkgb2tuYSBzIGNoeWJhbWlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RFcnJvcnMoeyBhZ2VuZGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlVDVCB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhemVuaUNoeWIoZGF0YSwgZGVmZXJyZXIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIClcclxuICAgICAgICAvLyAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXVjdG92YW5pIHphcGlzdSBvdGV2cmVuaSBrbmloeVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemF1Y3RvdmFuaU90ZXZyZW5pS25paCgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdnN0dXA6IEludGVyZmFjZS5HSW51VXphdmVya3lSb2t1RHRvID0geyBhZ2VuZGE6IEludGVyZmFjZS5HRUludUFnZW5kYS5VQ1QsIGtyb2s6IEludGVyZmFjZS5HRU9wZXJhY2VSb2NuaVV6YXZlcmt5LlphcGlzeU90ZXZyZW5pS25paCwgb3BlcmFjZTogSW50ZXJmYWNlLkdFT3BlcmFjZU5hWmFwaXNlY2guUHJvdWN0b3ZhbmkgfTtcclxuICAgICAgICAgICAgdmFyIHRhc2sgPSBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0PEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcywgYW55PihcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVVemF2ZXJrYUFzeW5jXCIsIHZzdHVwKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMCwgdG90YWw6IDEwMCwgdGV4dDogXCJqcmVzOjMwMjUwMjM5XCIsIC8vUkMgMzAyNTAyMzkgOiBQcm9iw61ow6EgcHJvw7rEjXRvdsOhbsOtIHrDoXBpc8WvIG90ZXbFmWVuw60gw7rEjS4ga25paCwgxI1la2VqdGUgcHJvc8OtbS5cclxuICAgICAgICAgICAgICAgIGNhbmNlbEFjdGlvbjogbmV3IEdBY3Rpb24oeyBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMzJcIiwgcnVuOiAoKSA9PiB7IHRhc2suY2FuY2VsKCkgfSwgbmFtZTogXCJjYW5jZWxBY3RcIiB9KSAvL1JDIDMwMjUwMzMyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgIH0pOyAvL1JDIDMwMjUwMzMyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgIHRhc2suZ2V0UHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDQ1MDA0MVwiIC8vUkMgMzA0NTAwNDEgOiBCeWx5IHByb8O6xI10b3bDoW55IHrDoXBpc3kgb3RldsWZZW7DrSDDusSNZXRuw61jaCBrbmloICFcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnRlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHBfZGF0YSA9IGpxWEhSLmV4Y2VwdGlvbi5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhwX2RhdGFfdmFsaWRhdGlvblJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4cF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0ID0gZXhwX2RhdGEudmFsaWRhdGlvblJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0Lkxlbmd0aCA9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGV4cF9kYXRhX3ZhbGlkYXRpb25SZXN1bHRbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCB7IFRfRl9NOiBleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0IH0sIFwidmFsaWRhdGlvblwiLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnphdWN0b3ZhbmlPdGV2cmVuaUtuaWgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuVUNUIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAucHJvZ3Jlc3MoKGE6IHsgcHJvZ3Jlc3M/OiBHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhLnByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb2dyZXNzT3BlcmF0aW9uKHsgcHJvZ3Jlc3M6IGEucHJvZ3Jlc3MuY3VycmVudCwgdG90YWw6IGEucHJvZ3Jlc3MudG90YWwsIHRleHQ6IGEucHJvZ3Jlc3MudGV4dCB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCkgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHsgZGVmZXJyZXIucmVqZWN0KCkgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS5wcm91Y3RvdmFuaVphcGlzeU90ZXZyZW5pS25paCgpXHJcbiAgICAgICAgICAgIC8vICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgLy8gICAgLnRoZW4oXHJcbiAgICAgICAgICAgIC8vICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBcImpyZXM6MzA0NTAwNDFcIiAvL1JDIDMwNDUwMDQxIDogQnlseSBwcm/DusSNdG92w6FueSB6w6FwaXN5IG90ZXbFmWVuw60gw7rEjWV0bsOtY2gga25paCAhXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnphdWN0b3ZhbmlPdGV2cmVuaUtuaWgoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZCAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbmkgb2tuYSBzIGNoeWJhbWlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RFcnJvcnMoeyBhZ2VuZGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlVDVCB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhemVuaUNoeWIoZGF0YSwgZGVmZXJyZXIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIClcclxuICAgICAgICAgICAgLy8gICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXVjdG92YW5pIHphcGlzdSB1emF2cmVuaSBrbmloXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6YXVjdG92YW5pWmFwaXN1S25paCgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdnN0dXA6IEludGVyZmFjZS5HSW51VXphdmVya3lSb2t1RHRvID0geyBhZ2VuZGE6IEludGVyZmFjZS5HRUludUFnZW5kYS5VQ1QsIGtyb2s6IEludGVyZmFjZS5HRU9wZXJhY2VSb2NuaVV6YXZlcmt5LlphcGlzeVV6YXZyZW5pS25paCwgb3BlcmFjZTogSW50ZXJmYWNlLkdFT3BlcmFjZU5hWmFwaXNlY2guUHJvdWN0b3ZhbmkgfTtcclxuICAgICAgICAgICAgdmFyIHRhc2sgPSBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0PEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcywgYW55PihcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVVemF2ZXJrYUFzeW5jXCIsIHZzdHVwKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMCwgdG90YWw6IDEwMCwgdGV4dDogXCJqcmVzOjMwMjUwMjIwXCIsIC8vUkMgMzAyNTAyMjAgOiBQcm9iw61ow6EgcHJvw7rEjXRvdsOhbsOtIHrDoXBpc8WvIHV6w6F2xJtya3kgw7rEjS4ga25paCwgxI1la2VqdGUgcHJvc8OtbS5cclxuICAgICAgICAgICAgICAgIGNhbmNlbEFjdGlvbjogbmV3IEdBY3Rpb24oeyBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMzJcIiwgcnVuOiAoKSA9PiB7IHRhc2suY2FuY2VsKCkgfSwgbmFtZTogXCJjYW5jZWxBY3RcIiB9KSAvL1JDIDMwMjUwMzMyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgIH0pOyAvL1JDIDMwMjUwMzMyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgIHRhc2suZ2V0UHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyMjFcIiAvL1JDIDMwMjUwMjIxIDogQnlseSBwcm/DusSNdG92w6FueSB6w6FwaXN5IHV6w6F2xJtya3kgw7rEjWV0bsOtY2gga25paCAhXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy50ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhwX2RhdGEgPSBqcVhIUi5leGNlcHRpb24uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4cF9kYXRhX3ZhbGlkYXRpb25SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHBfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwX2RhdGFfdmFsaWRhdGlvblJlc3VsdCA9IGV4cF9kYXRhLnZhbGlkYXRpb25SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwX2RhdGFfdmFsaWRhdGlvblJlc3VsdC5MZW5ndGggPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgeyBUX0ZfTTogZXhwX2RhdGFfdmFsaWRhdGlvblJlc3VsdCB9LCBcInZhbGlkYXRpb25cIiwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXVjdG92YW5pWmFwaXN1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZCAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuaSBva25hIHMgY2h5YmFtaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RFcnJvcnMoeyBhZ2VuZGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlVDVCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhemVuaUNoeWIoZGF0YSwgZGVmZXJyZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLnByb2dyZXNzKChhOiB7IHByb2dyZXNzPzogR29yZGljLkFzeW5jLklHVGFza1Byb2dyZXNzIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYS5wcm9ncmVzcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcm9ncmVzc09wZXJhdGlvbih7IHByb2dyZXNzOiBhLnByb2dyZXNzLmN1cnJlbnQsIHRvdGFsOiBhLnByb2dyZXNzLnRvdGFsLCB0ZXh0OiBhLnByb2dyZXNzLnRleHQgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7IGRlZmVycmVyLnJlamVjdCgpIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkucHJvdWN0b3ZhbmlaYXBpc3lVemF2cmVuaUtuaWgoKVxyXG4gICAgICAgIC8vICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjIxXCIgLy9SQyAzMDI1MDIyMSA6IEJ5bHkgcHJvw7rEjXRvdsOhbnkgesOhcGlzeSB1esOhdsSbcmt5IMO6xI1ldG7DrWNoIGtuaWggIVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vdGhpcy50ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnphdWN0b3ZhbmlaYXBpc3VLbmloKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuTm9TZXJ2ZWQgJiYgcmV0dXJuVmFsdWUuVHlwZU1lc3NhZ2UgPT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VUeXBlVHJhbnNmZXJNZXNzYWdlLlVzZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS5saXN0RXJyb3JzKHsgYWdlbmRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRUludUFnZW5kYS5VQ1QgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56b2JyYXplbmlDaHliKGRhdGEsIGRlZmVycmVyKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICApXHJcbiAgICAgICAgLy8gICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdG92YW5pIHphcGlzdSB1emF2cmVuaSBrbmloXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB0ZXN0WmFwaXN1S25paCgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdnN0dXA6IEludGVyZmFjZS5HSW51VXphdmVya3lSb2t1RHRvID0geyBhZ2VuZGE6IEludGVyZmFjZS5HRUludUFnZW5kYS5VQ1QsIGtyb2s6IEludGVyZmFjZS5HRU9wZXJhY2VSb2NuaVV6YXZlcmt5LlphcGlzeVV6YXZyZW5pS25paCwgb3BlcmFjZTogSW50ZXJmYWNlLkdFT3BlcmFjZU5hWmFwaXNlY2guVGVzdG92YW5pIH07XHJcbiAgICAgICAgICAgIHZhciB0YXNrID0gR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydDxHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIGFueT4oXCJHb3JkaWMuSW51LlNlcnZlci5HSW51VXphdmVya2FBc3luY1wiLCB2c3R1cCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsIHRvdGFsOiAxMDAsIHRleHQ6IFwianJlczozMDI1MDIxOFwiLCAvL1JDIDMwMjUwMjE4IDogUHJvYsOtaMOhIHRlc3QgesOhcGlzxa8gdXrDoXbEm3JreSDDusSNLiBrbmloLCDEjWVrZWp0ZSBwcm9zw61tXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxBY3Rpb246IG5ldyBHQWN0aW9uKHsgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzMyXCIsIHJ1bjogKCkgPT4geyB0YXNrLmNhbmNlbCgpIH0sIG5hbWU6IFwiY2FuY2VsQWN0XCIgfSkgLy9SQyAzMDI1MDMzMiA6IFN0b3Jub1xyXG4gICAgICAgICAgICB9KTsgLy9SQyAzMDI1MDMzMiA6IFN0b3Jub1xyXG4gICAgICAgICAgICB0YXNrLmdldFByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjE5XCIgLy9SQyAzMDI1MDIxOSA6IFRlc3QgesOhcGlzxa8gdXrDoXbEm3JreSDDusSNLiBrbmloIHByb2LEm2hsIGJleiBjaHliXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4cF9kYXRhID0ganFYSFIuZXhjZXB0aW9uLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cF9kYXRhX3ZhbGlkYXRpb25SZXN1bHQgPSBleHBfZGF0YS52YWxpZGF0aW9uUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4cF9kYXRhX3ZhbGlkYXRpb25SZXN1bHQuTGVuZ3RoID0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gZXhwX2RhdGFfdmFsaWRhdGlvblJlc3VsdFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIHsgVF9GX006IGV4cF9kYXRhX3ZhbGlkYXRpb25SZXN1bHQgfSwgXCJ2YWxpZGF0aW9uXCIsIG51bGwsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlOy8vdHJhbnNNc2cuSWRNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnRlc3RaYXBpc3VLbmloKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZCAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuaSBva25hIHMgY2h5YmFtaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RFcnJvcnMoeyBhZ2VuZGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlVDVCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhemVuaUNoeWIoZGF0YSwgZGVmZXJyZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAucHJvZ3Jlc3MoKGE6IHsgcHJvZ3Jlc3M/OiBHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhLnByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb2dyZXNzT3BlcmF0aW9uKHsgcHJvZ3Jlc3M6IGEucHJvZ3Jlc3MuY3VycmVudCwgdG90YWw6IGEucHJvZ3Jlc3MudG90YWwsIHRleHQ6IGEucHJvZ3Jlc3MudGV4dCB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCkgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHsgZGVmZXJyZXIucmVqZWN0KCkgfSk7XHJcblxyXG4gICAgICAgIC8vICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnRlc3RaYXBpc3lVemF2cmVuaUtuaWgoKVxyXG4gICAgICAgIC8vICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjE5XCIgLy9SQyAzMDI1MDIxOSA6IFRlc3QgesOhcGlzxa8gdXrDoXbEm3JreSDDusSNLiBrbmloIHByb2LEm2hsIGJleiBjaHliXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGlzLnRlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vIHRlc3QsIHpkYSBqc291IHBvc2xhbnkgbmVqYWtlIHpwcmF2eVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAodHJ1ZS8qdHJhbnNNc2dUc3QgIT0gbnVsbCovKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnRlc3RaYXBpc3VLbmloKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuTm9TZXJ2ZWQgJiYgcmV0dXJuVmFsdWUuVHlwZU1lc3NhZ2UgPT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VUeXBlVHJhbnNmZXJNZXNzYWdlLlVzZXJNZXNzYWdlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLklzbC5JbnVpVXphdmVya2FVY2V0bmlob09iZG9iaS5saXN0RXJyb3JzKHsgYWdlbmRhOiBHb3JkaWMuSW51LkludGVyZmFjZS5HRUludUFnZW5kYS5VQ1QgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56b2JyYXplbmlDaHliKGRhdGEsIGRlZmVycmVyKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIClcclxuICAgICAgICAvLyAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgICogVGVzdG92YW5pIHphcGlzdSBvdGV2cmVuaSBrbmloXHJcbiAgICAgICAgICAqIFxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHRlc3RaYXBpc3VPdGV2cmVuaUtuaWgoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRlZmVycmVyID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZzdHVwOiBJbnRlcmZhY2UuR0ludVV6YXZlcmt5Um9rdUR0byA9IHsgYWdlbmRhOiBJbnRlcmZhY2UuR0VJbnVBZ2VuZGEuVUNULCBrcm9rOiBJbnRlcmZhY2UuR0VPcGVyYWNlUm9jbmlVemF2ZXJreS5aYXBpc3lPdGV2cmVuaUtuaWgsIG9wZXJhY2U6IEludGVyZmFjZS5HRU9wZXJhY2VOYVphcGlzZWNoLlRlc3RvdmFuaSB9O1xyXG4gICAgICAgICAgICB2YXIgdGFzayA9IEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuc3RhcnQ8R29yZGljLkFzeW5jLklHVGFza1Byb2dyZXNzLCBhbnk+KFwiR29yZGljLkludS5TZXJ2ZXIuR0ludVV6YXZlcmthQXN5bmNcIiwgdnN0dXApO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLCB0b3RhbDogMTAwLCB0ZXh0OiBcImpyZXM6MzAyNTAyNDBcIiwgLy9SQyAzMDI1MDI0MCA6IFByb2LDrWjDoSB0ZXN0IHrDoXBpc8WvIG90ZXbFmWVuw60gw7rEjS4ga25paCwgxI1la2VqdGUgcHJvc8OtbVxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQWN0aW9uOiBuZXcgR0FjdGlvbih7IGNhcHRpb246IFwianJlczozMDI1MDMzMlwiLCBydW46ICgpID0+IHsgdGFzay5jYW5jZWwoKSB9LCBuYW1lOiBcImNhbmNlbEFjdFwiIH0pIC8vUkMgMzAyNTAzMzIgOiBTdG9ybm9cclxuICAgICAgICAgICAgfSk7IC8vUkMgMzAyNTAzMzIgOiBTdG9ybm9cclxuICAgICAgICAgICAgdGFzay5nZXRQcm9taXNlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDE3NVwiLCAvL1JDIDMwMjUwMTc1IDogSW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDI0MVwiIC8vUkMgMzAyNTAyNDEgOiBUZXN0IHrDoXBpc8WvIG90ZXbFmWVuw60gw7rEjS4ga25paCBwcm9ixJtobCBiZXogY2h5YlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlc3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZmZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHBfZGF0YSA9IGpxWEhSLmV4Y2VwdGlvbi5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhwX2RhdGFfdmFsaWRhdGlvblJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4cF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0ID0gZXhwX2RhdGEudmFsaWRhdGlvblJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0Lkxlbmd0aCA9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGV4cF9kYXRhX3ZhbGlkYXRpb25SZXN1bHRbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCB7IFRfRl9NOiBleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0IH0sIFwidmFsaWRhdGlvblwiLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnRlc3RaYXBpc3VPdGV2cmVuaUtuaWgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuVUNUIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAucHJvZ3Jlc3MoKGE6IHsgcHJvZ3Jlc3M/OiBHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhLnByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb2dyZXNzT3BlcmF0aW9uKHsgcHJvZ3Jlc3M6IGEucHJvZ3Jlc3MuY3VycmVudCwgdG90YWw6IGEucHJvZ3Jlc3MudG90YWwsIHRleHQ6IGEucHJvZ3Jlc3MudGV4dCB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCkgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHsgZGVmZXJyZXIucmVqZWN0KCkgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkudGVzdFphcGlzeU90ZXZyZW5pS25paCgpXHJcbiAgICAgICAgLy8gICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgLy8gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyNDFcIiAvL1JDIDMwMjUwMjQxIDogVGVzdCB6w6FwaXPFryBvdGV2xZllbsOtIMO6xI0uIGtuaWggcHJvYsSbaGwgYmV6IGNoeWJcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3RoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoaXMudGVzdGVkID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCBudWxsLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCwgemRhIGpzb3UgcG9zbGFueSBuZWpha2UgenByYXZ5XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmICh0cnVlLyp0cmFuc01zZ1RzdCAhPSBudWxsKi8pIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92c3R1cCEuSWRNZXNzYWdlID0gcmV0dXJuVmFsdWUuSWRNZXNzYWdlOy8vdHJhbnNNc2cuSWRNZXNzYWdlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQudGVzdFphcGlzdU90ZXZyZW5pS25paCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLk5vU2VydmVkICYmIHJldHVyblZhbHVlLlR5cGVNZXNzYWdlID09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFVHlwZVRyYW5zZmVyTWVzc2FnZS5Vc2VyTWVzc2FnZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuaSBva25hIHMgY2h5YmFtaVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Jc2wuSW51aVV6YXZlcmthVWNldG5paG9PYmRvYmkubGlzdEVycm9ycyh7IGFnZW5kYTogR29yZGljLkludS5JbnRlcmZhY2UuR0VJbnVBZ2VuZGEuVUNUIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6ZW5pQ2h5YihkYXRhLCBkZWZlcnJlcik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICApXHJcbiAgICAgICAgLy8gICAgICAgIDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0b3ZhbmkgemFwaXN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB0ZXN0WmFwaXN1KCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlciA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2c3R1cDogSW50ZXJmYWNlLkdJbnVVemF2ZXJreVJva3VEdG8gPSB7IGFnZW5kYTogSW50ZXJmYWNlLkdFSW51QWdlbmRhLlVDVCwga3JvazogSW50ZXJmYWNlLkdFT3BlcmFjZVJvY25pVXphdmVya3kuWmF2ZXJlY25lWmFwaXN5LCBvcGVyYWNlOiBJbnRlcmZhY2UuR0VPcGVyYWNlTmFaYXBpc2VjaC5UZXN0b3ZhbmkgfTtcclxuICAgICAgICAgICAgdmFyIHRhc2sgPSBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0PEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcywgYW55PihcIkdvcmRpYy5JbnUuU2VydmVyLkdJbnVVemF2ZXJrYUFzeW5jXCIsIHZzdHVwKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMCwgdG90YWw6IDEwMCwgdGV4dDogXCJqcmVzOjMwMjUwMjA4XCIsIC8vUkMgMzAyNTAyMDggOiBQcm9iw61ow6EgdGVzdCB6w6F2xJtyZcSNbsO9Y2ggesOhcGlzxa8sIMSNZWtlanRlIHByb3PDrW1cclxuICAgICAgICAgICAgICAgIGNhbmNlbEFjdGlvbjogbmV3IEdBY3Rpb24oeyBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMzJcIiwgcnVuOiAoKSA9PiB7IHRhc2suY2FuY2VsKCkgfSwgbmFtZTogXCJjYW5jZWxBY3RcIiB9KSAvL1JDIDMwMjUwMzMyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgIH0pOyAvL1JDIDMwMjUwMzMyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgIHRhc2suZ2V0UHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAyMDdcIiAvL1JDIDMwMjUwMjA3IDogVGVzdCB6w6F2xJtyZcSNbsO9Y2ggesOhcGlzxa8gcHJvYsSbaGwgYmV6IGNoeWJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmZmVyLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhwX2RhdGEgPSBqcVhIUi5leGNlcHRpb24uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4cF9kYXRhX3ZhbGlkYXRpb25SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHBfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwX2RhdGFfdmFsaWRhdGlvblJlc3VsdCA9IGV4cF9kYXRhLnZhbGlkYXRpb25SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwX2RhdGFfdmFsaWRhdGlvblJlc3VsdC5MZW5ndGggPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBleHBfZGF0YV92YWxpZGF0aW9uUmVzdWx0WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgeyBUX0ZfTTogZXhwX2RhdGFfdmFsaWRhdGlvblJlc3VsdCB9LCBcInZhbGlkYXRpb25cIiwgbnVsbCwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC50ZXN0WmFwaXN1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZCAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuaSBva25hIHMgY2h5YmFtaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RFcnJvcnMoeyBhZ2VuZGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlVDVCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhemVuaUNoeWIoZGF0YSwgZGVmZXJyZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5wcm9ncmVzcygoYTogeyBwcm9ncmVzcz86IEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcyB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEucHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJvZ3Jlc3NPcGVyYXRpb24oeyBwcm9ncmVzczogYS5wcm9ncmVzcy5jdXJyZW50LCB0b3RhbDogYS5wcm9ncmVzcy50b3RhbCwgdGV4dDogYS5wcm9ncmVzcy50ZXh0IH0pO1xyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKSB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4geyBkZWZlcnJlci5yZWplY3QoKSB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnRlc3RQcmlwcmF2ZW55Y2haYXBpc3VVQ1QoKVxyXG4gICAgICAgIC8vICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgLy8gICAgICAgIC50aGVuKFxyXG4gICAgICAgIC8vICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMTc1XCIsIC8vUkMgMzAyNTAxNzUgOiBJbmZvcm1hY2VcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMjA3XCIgLy9SQyAzMDI1MDIwNyA6IFRlc3QgesOhdsSbcmXEjW7DvWNoIHrDoXBpc8WvIHByb2LEm2hsIGJleiBjaHliXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3RoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoaXMudGVzdGVkID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LCBvYmosIHR5cGUsIG51bGwsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZzdHVwIS5JZE1lc3NhZ2UgPSByZXR1cm5WYWx1ZS5JZE1lc3NhZ2U7Ly90cmFuc01zZy5JZE1lc3NhZ2U7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXZlcmVjbmVaYXBpc3koKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5Ob1NlcnZlZCAmJiByZXR1cm5WYWx1ZS5UeXBlTWVzc2FnZSA9PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVR5cGVUcmFuc2Zlck1lc3NhZ2UuVXNlck1lc3NhZ2UpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbmkgb2tuYSBzIGNoeWJhbWlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLmxpc3RFcnJvcnMoeyBhZ2VuZGE6IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdFSW51QWdlbmRhLlVDVCB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJhemVuaUNoeWIoZGF0YSwgZGVmZXJyZXIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphdmVyZWNuZSB6YXBpc1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemF2ZXJlY25lWmFwaXN5KHZzdHVwPzogR29yZGljLkludS5JbnRlcmZhY2UuR0ludVV6YXZlcmt5WmF2ZXJlY25lWmFwaXN5UmVxdWVzdER0bywgIGRlZmVycmVyPzogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZlcnJlciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZXIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDIyOVwiKTsgLy9SQyAzMDI1MDIyOSA6IFByb2LDrWjDoSB2eXR2w6HFmWVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgICAgIHZzdHVwID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLkludWlVemF2ZXJrYVVjZXRuaWhvT2Jkb2JpLnphdmVyZWNuZVphcGlzeSh7IHJxOiB2c3R1cCBhcyBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51VXphdmVya3laYXZlcmVjbmVaYXBpc3lSZXF1ZXN0RHRvIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwMjA1XCIsIHN0YXRlOiBcInN1Y2Nlc3NcIiB9KSAvL1JDIDMwMjUwMjA1IDogWsOhdsSbcmXEjW7DqSB6w6FwaXN5IGJ5bHkgdnl0dm/FmWVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzAyNTAyMDZcIiwgc3RhdGU6IFwid2FybmluZ1wiIH0pIC8vUkMgMzAyNTAyMDYgOiBaw6F2xJtyZcSNbsOpIHrDoXBpc3kgbmVieWx5IHZ5dHZvxZllbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAxNzVcIiwgLy9SQyAzMDI1MDE3NSA6IEluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBcImpyZXM6MzAyNTAxNzRcIiAvL1JDIDMwMjUwMTc0IDogT2Jkb2LDrSBieWxvIHDFmWlwcmF2ZW5vIGsgdXrDoXbEm3JjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAob2JqRXJyb3I6IEVycm9yKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uRXhjZXB0aW9uUHJvY2Vzc2luZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0aGF0LCBlcnJvT2JqZWN0OiBvYmpFcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogKHJldHVyblZhbHVlOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HVHJhbnNmZXJNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnN0dXAhLk5hc3RhdmVuaSA9IHJldHVyblZhbHVlLk5hc3RhdmVuaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC56YXZlcmVjbmVaYXBpc3kodnN0dXAsIGRlZmVycmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZXJyb3I6IChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5OYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3JldHVybiBkZWZlcnJlci5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRocm93IG5ldyBHRXJyb3Iob2JqRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgdnN0dXAsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyB0ZXN0LCB6ZGEganNvdSBwb3NsYW55IG5lamFrZSB6cHJhdnlcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKHRydWUvKnRyYW5zTXNnVHN0ICE9IG51bGwqLykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB2c3R1cCEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pOyAvL3RyYW5zTXNnLk5hc3RhdmVuaTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdnN0dXAhLklkTWVzc2FnZSA9IHJldHVyblZhbHVlLklkTWVzc2FnZTsvL3RyYW5zTXNnLklkTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnphdmVyZWNuZVphcGlzeSh2c3R1cCwgZGVmZXJyZXIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdmVuaUFrY2koKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZXIucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvLylcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIG9rbmEgcyBjaHliYW1pXHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKiBAcGFyYW0gZGVmZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHpvYnJhemVuaUNoeWIoZGF0YTogR29yZGljLkludS5JbnRlcmZhY2UuR0ludUNoeWJ5VXphdmVya3lEdG9bXSwgZGVmZXI6IGFueSk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coR29yZGljLkludS5XZWJDbGllbnQuR1Nlem5hbUNoeWIsIHsgZGF0YTogZGF0YSB9LCBcImpyZXM6MzAyNTAyMjNcIiwgODAwLCA2MDAsIHRydWUpIC8vUkMgMzAyNTAyMjMgOiBWw71waXMgY2h5YlxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59Il19