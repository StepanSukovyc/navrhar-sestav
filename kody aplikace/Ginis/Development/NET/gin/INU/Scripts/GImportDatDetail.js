"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GImportDatDetail.js                                                        </Name>
//    <Description> GPrepoctyStavu                                                                                  </Description>
//    <Author>      Jiří Ileček                                                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2016                                                                </Copyright>
//    <Created>     2016-03-03                                                                                      </Created>
//  </FileHeader>
*/
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
            let GImportDatDetail = class GImportDatDetail extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Detail dávky";
                    this.init = true;
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                onContentReady() {
                    var that = this;
                    that.title = that.davka.typ == "UCT" ? "Detail dávky UCT" : "Detail dávky ROZ";
                    //nastavení breadcrumbs
                    this.setBreadcrumbs([
                        {
                            caption: that.title,
                            defaultAction: true
                        }
                    ]);
                    ////nastavení akcí
                    //this.actions.addRange({
                    //    actNova: {
                    //        caption: "Nová", icon: "gi-plus",
                    //        run: () => {
                    //            return that.nova_davka();
                    //        }
                    //    }
                    //});
                    this.actions.addRange({
                        actUlozit: {
                            caption: "Uložit", // OK
                            icon: "gi-save", // ikona 
                            visible: true, // vždy viditelné
                            enabled: true,
                            run: function () {
                                that.ulozit();
                            }
                        }
                    });
                    this.actions.addRange({
                        actStorno: {
                            caption: "Storno", //icon: "gi-plus",
                            run: () => {
                                return that.storno_davky();
                            }
                        }
                    });
                    this.actions.addRange({
                        actTest: {
                            caption: "Test", //icon: "gi-plus",
                            run: () => {
                                return that.test_davky();
                            }
                        }
                    });
                    this.actions.addRange({
                        actProuctovat: {
                            caption: "Proúčtovat", //icon: "gi-plus",
                            visible: (that.davka.typ == "UCT") ?
                                ((this.GlobalParams.Params?.ZpusobImportuDavek_Uct == 0 /* Inu.Interface.GInuDavkaCilProuctovani.Denik */) || (this.GlobalParams.Params?.ZpusobImportuDavek_Uct == 2 /* Inu.Interface.GInuDavkaCilProuctovani.DenikAgenda */)) :
                                ((this.GlobalParams.Params?.ZpusobImportuDavek_Roz == 0 /* Inu.Interface.GInuDavkaCilProuctovani.Denik */) || (this.GlobalParams.Params?.ZpusobImportuDavek_Roz == 2 /* Inu.Interface.GInuDavkaCilProuctovani.DenikAgenda */)),
                            enabled: (this.GlobalParams.Params?.PovoleniImportuDavek),
                            run: () => {
                                return that.prouctovani_davky();
                            }
                        }
                    });
                    this.actions.addRange({
                        actProuctovatDoklad: {
                            caption: "Proúčtovat do agendy " + that.davka.typ, //icon: "gi-plus",
                            visible: (that.davka.typ == "UCT") ?
                                ((this.GlobalParams.Params?.ZpusobImportuDavek_Uct == 1 /* Inu.Interface.GInuDavkaCilProuctovani.Agenda */) || (this.GlobalParams.Params?.ZpusobImportuDavek_Uct == 2 /* Inu.Interface.GInuDavkaCilProuctovani.DenikAgenda */)) :
                                ((this.GlobalParams.Params?.ZpusobImportuDavek_Roz == 1 /* Inu.Interface.GInuDavkaCilProuctovani.Agenda */) || (this.GlobalParams.Params?.ZpusobImportuDavek_Roz == 2 /* Inu.Interface.GInuDavkaCilProuctovani.DenikAgenda */)),
                            enabled: (this.GlobalParams.Params?.PovoleniImportuDavek),
                            run: () => {
                                return that.prouctovani_davky_agenda();
                            }
                        }
                    });
                    this.actions.add(GAction.createPrintAction({
                        name: "actTisk",
                        tema: "inu_ptm_inuimpo",
                        caption: "Tisk",
                        tooltip: "Tisk",
                        parentContent: that,
                        serverParameterMethod: "Gordic.Inu.WebClient.GImportDatDetail:ConvertReportParams",
                        reportStarting: (rep) => {
                            return this.generateReport(rep);
                        }
                    }));
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actUlozit*", "actStorno*", "actTest*", "actProuctovat*", "actProuctovatDoklad*", "actTisk*"]));
                    this.mainForm = $("<div class='js-davka'>").appendTo(this.element)
                        .css("overflow", "auto")
                        .gtab({
                        title: "Detail dávky", opened: true, locked: true,
                        //menuBar: this.actions.createBar(["actRozdelit*", "actNulovat*", "actUlozit*"])
                    });
                    // .gautofit({ minimalHeight: 420 });
                    var detailDavkaForm = new Gordic.Forms.Form({ name: "detailDavka", layoutDescriptor: "L4M4S2 L-1-10-1 M-1-10-1 S-12-12-0" })
                        .addSection("Dávka")
                        .addRow("Identifikátor/Typ/Stav")
                        .addField("gstringbox", "w-4", { name: "ixs_imp", disabled: true })
                        .addField("gstringbox", "w-4", { name: "typ", disabled: true })
                        .addField("gstringbox", "w-4", { name: "stav_imp_txt", disabled: true })
                        .addRow("Zkratka").addField("gstringbox", "w-12", { name: "zkratka" })
                        .addRow("Popis").addField("gstringbox", "w-12", { name: "popis" });
                    if (this.GlobalParams.Params?.RezimEvidenceDavekDokumentovy == true) {
                        detailDavkaForm
                            .addRow("Typ/Dokument").addField("gselectbox", "w-6", Gordic.Prefabs.Select.sslstyp(), {
                            name: "ixs_typ", model: "model.ixs_typ_dok=value.ixs_typ", dropdown: false,
                            serverFilters: { ktg_typ: 6600 },
                            validators: [new Gordic.Validators.Required()],
                            flag: "required",
                            change: function (ev, changeObj) {
                                debugger;
                                var aa = changeObj;
                            }
                        })
                            .addField("gstringbox", "w-6", {
                            name: "ixp_dok",
                            disabled: true,
                            buttons: [
                                {
                                    requireEdit: false,
                                    action: new GAction({
                                        name: "actDetail",
                                        icon: "gi-detail",
                                        tooltip: "Detail dokumentu",
                                        visible: true,
                                        enabled: true,
                                        run: function (ev, ctx) {
                                            var options = {
                                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                                TypId: Gordic.Wfl.Globals.Enums.TypId.IXP
                                            };
                                            var modOtevreni = Gordic.Global.Enums.ModOtevreni.showModalWindow;
                                            var form = $(this).closest(".gform");
                                            var v_pid_obj = $(ctx.field).gfield("getValue");
                                            if (v_pid_obj) {
                                                var v_pid = v_pid_obj;
                                                if (v_pid && v_pid != null && v_pid != "") {
                                                    var params = {
                                                        DetailDto: { ixp: v_pid }
                                                    };
                                                    // Gordic.Ssl.Dialogs.Detail(cnt, params, modOtevreni);
                                                    var def = $.Deferred();
                                                    const $dialog = Gordic.Ssl.Dialogs.Detail(that, params, modOtevreni)?.done(function (cntDetail) {
                                                        if (cntDetail) {
                                                            cntDetail.on("closed", function (ev, retVal) {
                                                                if (retVal != null) {
                                                                    console.log(retVal);
                                                                    def.resolve(retVal);
                                                                }
                                                                else {
                                                                    def.reject();
                                                                }
                                                            });
                                                        }
                                                    });
                                                    return def.promise();
                                                }
                                            }
                                        }
                                    })
                                }
                            ]
                        });
                    }
                    detailDavkaForm
                        .addRow("Soubor pro načtení/CRC", { name: "label1" });
                    detailDavkaForm
                        .addField("gstringbox", "w-10", {
                        name: "soubor",
                        disabled: true,
                        buttons: [{
                                requireEdit: false,
                                enabled: ((that.davka.priloha) && (that.davka.priloha !== "")) ? true : false,
                                action: new GAction({
                                    name: "prilohaStahnoutAct",
                                    icon: "gi-download",
                                    run: function (ev, ctx) {
                                        if ((that.davka.priloha) && (that.davka.priloha !== "")) { // pokud existuje vybraný záznam
                                            var gc = new GContent("Gordic.Inu.WebClient.GImportDatDetail"); //dotažení řádku ze serveru
                                            gc.beginOperation("Probíhá stažení souboru");
                                            gc.call("GetFileZUloziste", { Ixb: that.davka.priloha })
                                                .done(function (r) {
                                                if (r) {
                                                    GBrowserExtras.documentSaveOpenLocal(r.Name, r.Bytes)
                                                        .done(function (retVal) { })
                                                        .fail(function (err) { Gordic.Gui.WebApp.Utils.showReasonFlash(gc, err); })
                                                        .always(function () {
                                                        gc.endOperation();
                                                    });
                                                }
                                            });
                                        }
                                    }
                                })
                            }]
                    })
                        .addField("gstringbox", "w-2", { name: "kon_suma", disabled: true });
                    if ((that.davka.ixs_imp) && (that.davka.ixs_imp !== "")) {
                        // tady nic
                    }
                    else {
                        detailDavkaForm
                            .addField("gfilefield", "w-10", {
                            validators: [new Gordic.Validators.Required()],
                            name: "uploadFile",
                            flag: "required",
                            maxFileCount: 1,
                            change: function (ev, changeObj) {
                                var cnt = $.content($(ev.target));
                                if (changeObj.value.length != 0) {
                                    that.findFields("soubor").show();
                                    that.findFields("kon_suma").show();
                                    that.file = that.findFields("uploadFile").gfilefield("getValue")[0];
                                    that.findFields("uploadFile").hide();
                                    that.findFields("kon_suma2").hide();
                                    that.load_davky();
                                }
                            },
                        })
                            .addField("gstringbox", "w-2", { name: "kon_suma2", disabled: true });
                    }
                    detailDavkaForm
                        .addRow("Načteno")
                        .addField("gdatebox", "w-4", { valueType: "datetime", name: "dat_zmena_nact", disabled: true })
                        .addField("gstringbox", "w-8", { name: "zmenu_prov_nact_txt", disabled: true })
                        .addRow("Zpracováno")
                        .addField("gdatebox", "w-4", { valueType: "datetime", name: "dat_zmena_zprac", disabled: true })
                        .addField("gstringbox", "w-8", { name: "zmenu_prov_zprac_txt", disabled: true });
                    $("<div class='js-detailDAVKA'>").appendTo(that.element).gform("createFrom", detailDavkaForm).findFields().gfield("model", "apply", that.davka);
                    if ((that.davka.ixs_imp) && (that.davka.ixs_imp !== "")) {
                        // tady nic
                    }
                    else {
                        that.findFields("soubor").hide();
                        that.findFields("kon_suma").hide();
                    }
                    if ((that.davka.ixs_imp) && (that.davka.ixs_imp !== "")) {
                        that.actions.actTest.enabled(false);
                        that.actions.actProuctovat.enabled(false);
                        that.actions.actProuctovatDoklad.enabled(false);
                        that.actions.actStorno.enabled(false);
                        that.actions.actTisk.enabled(false);
                        //	CASE Gin.Konst.Stav_Nacteno, Gin.Konst.Stav_Nacteno_Chyba
                        if ((that.davka.stav_imp == 0) || (that.davka.stav_imp == 1)) {
                            that.actions.actTest.enabled(true);
                            that.actions.actProuctovat.enabled(this.GlobalParams.Params?.PovoleniImportuDavek);
                            that.actions.actProuctovatDoklad.enabled(this.GlobalParams.Params?.PovoleniImportuDavek);
                            that.actions.actStorno.enabled(true);
                            that.actions.actTisk.enabled(true);
                        }
                        // CASE Gin.Konst.Stav_Stornovano
                        if (that.davka.stav_imp == 20) {
                            that.actions.actTest.enabled(false);
                            that.actions.actProuctovat.enabled(false);
                            that.actions.actProuctovatDoklad.enabled(false);
                            that.actions.actStorno.enabled(false);
                            that.actions.actTisk.enabled(false);
                        }
                        //CASE Gin.Konst.Stav_Odmitnuto
                        if (that.davka.stav_imp == 2) {
                            that.actions.actTest.enabled(false);
                            that.actions.actProuctovat.enabled(false);
                            that.actions.actProuctovatDoklad.enabled(false);
                            that.actions.actStorno.enabled(false);
                            that.actions.actTisk.enabled(false);
                        }
                        // CASE Gin.Konst.Stav_Prouctovano
                        if (that.davka.stav_imp == 10) {
                            that.actions.actTest.enabled(false);
                            that.actions.actProuctovat.enabled(false);
                            that.actions.actProuctovatDoklad.enabled(false);
                            that.actions.actStorno.enabled(false);
                            that.actions.actTisk.enabled(true);
                        }
                    }
                    else {
                        that.actions.actTest.enabled(false);
                        that.actions.actProuctovat.enabled(false);
                        that.actions.actProuctovatDoklad.enabled(false);
                        that.actions.actStorno.enabled(false);
                        that.actions.actTisk.enabled(false);
                    }
                    //// defincice provideru
                    //let provider = new Gordic.Data.Provider<any, any, any>((a, b) => {
                    //    return that.reload();
                    //});
                    //var defAkMenu: MenuParams[] = [];
                    ////for (var i = 0; i < listAkce.length; i++) {
                    ////    defAkMenu.push({ action: listAkce[i], favorite: true });
                    ////}
                    // definicie gridu
                    let gf = that.createCols();
                    that.$grid = $("<div>")
                        .appendTo(this.element)
                        .gautofit({ resizersOnTab: false })
                        .ggrid({
                        columnMode: "full",
                        defaultProfile: { filterVisible: false, columnList: gf.columns.map((c) => c.name).join(",") },
                        selection: function (ev, objekt) {
                            var radek = objekt.getSelection(false, true);
                        },
                        defaultAction: this.actions.actDetail,
                        columns: that.createCols()
                    });
                    if ((that.davka.ixs_imp) && (that.davka.ixs_imp != "")) {
                        if (that.davka.stav_imp != 10) { // prouctovano
                            that.view_ISL_zapisy = new Gordic.Isl.View(this.isl.InuDavka.list_Zapisy({ filters: { typ: that.davka.typ, ixs_imp: that.davka.ixs_imp } }));
                        }
                        else {
                            that.view_ISL_zapisy = new Gordic.Isl.View(this.isl.InuDavka.list_Zapisy_Prouctovane({ filters: { typ: that.davka.typ, ixs_imp: that.davka.ixs_imp } }));
                        }
                        that.$grid.ggrid("setData", that.view_ISL_zapisy);
                    }
                    //var fields = mainForm.findFields(); // všechny políčka
                    //fields.gfield("model", "apply", that.davka, { initialValues: true }); 
                    //// Tlacitko zavrit
                    //that.commandBar([
                    //    {
                    //        action: this.actions.actZavrit
                    //    },
                    //]);
                }
                ///**
                // *  Znovunacteni dat
                // * 
                // */
                //private reload() {
                //    var that = this;
                //    var def = $.Deferred();
                //    if (that.closed) return def.resolve().promise();
                //    //if (that.akce == Gordic.Inu.Interface.GETypySeznamuRocniUzaverky.ZaverecneUcetniZapisy)
                //    {
                //        Gordic.Isl.InuDavka.read({})
                //            .get()
                //            .done(function (result) {
                //                return def.resolve(result);
                //            })
                //            .always(function () { })
                //    }
                //    return def.promise();
                //}
                /**
                 *  Definice sloupcu
                 *
                 * */
                createCols() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({
                        name: "ucs",
                        caption: Gordic.Consts.DbShortcuts.ucs, //this.GlobalParams.Zkratky?.Nks,
                        width: 80
                    });
                    gridFormat.addTextColumn({
                        name: "nks",
                        caption: Gordic.Consts.DbShortcuts.nks, //this.GlobalParams.Zkratky?.Nks,
                        width: 80
                    });
                    gridFormat.addTextColumn({
                        name: "uus",
                        caption: Gordic.Consts.DbShortcuts.uus, //this.GlobalParams.Zkratky?.Nks,
                        width: 80
                    });
                    Gordic.Eko.Grid.Column.addRok(gridFormat, { name: "rok" });
                    Gordic.Eko.Grid.Column.addMesic(gridFormat, { name: "mesic" });
                    Gordic.Eko.Grid.Column.addDen(gridFormat, { name: "den" });
                    Gordic.Eko.Grid.Column.addDruhDokladu(gridFormat, { name: "drd" });
                    Gordic.Eko.Grid.Column.addCisloDokladu(gridFormat, { name: "ac", field: "ac", width: 120 });
                    gridFormat.addNumberColumn({
                        name: "radek_z",
                        caption: "jres:30250191", //RC 30250191 : Řádek
                        width: 40
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
                    gridFormat.addTextColumn({
                        name: "popis",
                        caption: "Popis",
                        width: 300
                    });
                    //           Gordic.Eko.Grid.Column.addPid(gridFormat, { name: "ixp" });
                    //gridFormat.addDateColumn({
                    //    name: "dat_zmena",
                    //    caption: "jres:30250189", //RC 30250189 : Datum změny
                    //    width: 160
                    //});
                    //gridFormat.addTextColumn({
                    //    name: "zmenu_prov",
                    //    caption: "jres:30250190", //RC 30250190 : Změnu provedl
                    //    width: 90
                    //});
                    return gridFormat;
                }
                ulozit() {
                    var that = this;
                    var $cDiv = $(this.contentDiv);
                    if ($cDiv.findForms().gform("isValid", true)) {
                        var davka_akt = {};
                        $cDiv.findFields().gfield("model", "collect", davka_akt);
                        $cDiv.findFields().gfield("confirm");
                        that.davka.popis = davka_akt.popis;
                        that.davka.zkratka = davka_akt.zkratka;
                        that.davka.ixs_typ_dok = davka_akt.ixs_typ_dok;
                        that.isl.InuDavka.update({ data: that.davka })
                            .getData()
                            .then(function (response) {
                            that.davka = response;
                            $cDiv.findFields().gfield("model", "apply", that.davka, { initialValues: true });
                            that.trigger("inu_importdetailsave", [{ data: response }]);
                            that.showFlash({ label: "jres:30450050", state: "success" }); //RC 30450050 : Informace o dávce byly uloženy
                        })
                            .fail(function () {
                        });
                    }
                }
                test_davky() {
                    var that = this;
                    console.log("ixs_imp", that.davka.ixs_imp);
                    that.beginOperation("Probíhá test");
                    that.isl.InuDavka.test({ typ: that.davka.typ, ixs_imp: that.davka.ixs_imp, popis: that.davka.popis, zkratka: that.davka.zkratka, ixs_typ_dok: that.davka.ixs_typ_dok, priloha: that.davka.priloha })
                        .getData()
                        .done(function (data) {
                        if ((data) && (data.v_err_code == 100)) {
                            that.isl.InuDavka.list_Zapisy_Chyba({ filters: { typ: that.davka.typ, ixs_imp: that.davka.ixs_imp } })
                                .getData()
                                .done(function (data) {
                                console.log("out data_chyby", data);
                                var detailwindow = that.navigate("Gordic.Inu.WebClient.GImportDatChyby", {
                                    Data: data,
                                    Typ: that.davka.typ
                                });
                            }).always(function () {
                                that.endOperation();
                            });
                        }
                        else {
                            that.trigger("inu_importdetailsave", [{ data: that.davka }]);
                            // that.load_davky();
                            that.dialogs.alert("Test dávky proběhl bez chyb.");
                        }
                        console.log("out data", data);
                    }).fail(function (data1) {
                        that.endOperation();
                    }).always(function () {
                        that.endOperation();
                    });
                }
                prouctovani_davky() {
                    var that = this;
                    console.log("ixs_imp", that.davka.ixs_imp);
                    that.beginOperation("Probíhá proúčtování");
                    that.isl.InuDavka.prouctovat({ typ: that.davka.typ, ixs_imp: that.davka.ixs_imp })
                        .getData()
                        .done(function (data) {
                        if ((data) && (data.v_err_code == 100)) {
                            that.isl.InuDavka.list_Zapisy_Chyba({ filters: { typ: that.davka.typ, ixs_imp: that.davka.ixs_imp } })
                                .getData()
                                .done(function (data) {
                                console.log("out data_chyby", data);
                                var detailwindow = that.navigate("Gordic.Inu.WebClient.GImportDatChyby", {
                                    Data: data,
                                    Typ: that.davka.typ
                                });
                            }).always(function () {
                                that.endOperation();
                            });
                        }
                        else {
                            that.isl.InuDavka.zmenaStavu({ ixsImp: that.davka.ixs_imp, stavImp: 10 })
                                .getData()
                                .then(function (data) {
                                that.davka = data;
                                var $cDiv = $(that.contentDiv);
                                $cDiv.findFields().gfield("model", "apply", that.davka, { initialValues: true });
                                that.trigger("inu_importdetailsave", [{ data: data }]);
                                that.nastaveni_dle_stavu();
                            }).always(function () {
                                that.endOperation();
                                that.dialogs.alert("Proúčtování dávky proběhlo bez chyb.");
                            });
                        }
                        console.log("out data", data);
                    }).always(function () {
                        that.endOperation();
                    });
                }
                prouctovani_davky_agenda() {
                    var that = this;
                    console.log("ixs_imp", that.davka.ixs_imp);
                    var parametryForm = new Gordic.Forms.Form({
                        name: "ParametryFormular",
                        layoutDescriptor: "L1M1S1 M-3-9-0 L-3-9-0 breaks-400-300",
                        dialogOptions: {
                            id: "ParametryFormular#"
                        }
                        //    ,
                        //    complete: function (a) {
                        //        debugger;
                        //        console.log("xxx");
                        //    }
                    });
                    if (that.davka.typ == "UCT") {
                        parametryForm
                            .addRow("Kniha")
                            .addField("gselectbox", Gordic.Prefabs.Select.uctsden(), {
                            disabled: false,
                            dropdown: false,
                            validators: [new Gordic.Validators.Required()],
                            name: "in_ixp_den",
                            model: "model.in_ixp_den=value.ixp_den",
                            serverFilters: {
                                ico: that.GlobalParams.EkoParams?.ICO,
                                rok: that.GlobalParams.EkoParams?.ROK,
                                AktivniVrfu: true
                            },
                            tooltip: "Kniha",
                        })
                            .addRow("Typ dokladu")
                            .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                            disabled: false,
                            dropdown: false,
                            validators: [new Gordic.Validators.Required()],
                            name: "in_ixs_typ",
                            model: "model.in_ixs_typ=value.ixs_typ, model.in_ktg_typ=value.ktg_typ",
                            serverFilters: { typ_ag: 40 },
                            tooltip: "Typ dokladu",
                        })
                            .addRow("Subřada")
                            .addField("gselectbox", Gordic.Prefabs.Select.uctddde(), {
                            disabled: false,
                            dropdown: false,
                            validators: [new Gordic.Validators.Required()],
                            name: "in_subrada",
                            model: "model.in_subrada=value.subrada",
                            serverFilters: {
                                aktivita: 100,
                                ico: that.GlobalParams.EkoParams?.ICO,
                                rok: that.GlobalParams.EkoParams?.ROK,
                            },
                            tooltip: "Subřada",
                        });
                    }
                    else {
                        parametryForm
                            .addRow("Kniha")
                            .addField("gselectbox", Gordic.Prefabs.Select.rozsden(), {
                            disabled: false,
                            dropdown: false,
                            validators: [new Gordic.Validators.Required()],
                            name: "in_ixp_den",
                            model: "model.in_ixp_den=value.ixp_den",
                            serverFilters: {
                                ico: that.GlobalParams.EkoParams?.ICO,
                                rok: that.GlobalParams.EkoParams?.ROK,
                                AktivniVrfu: true
                            },
                            tooltip: "Kniha",
                        })
                            .addRow("Typ dokladu")
                            .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                            disabled: false,
                            dropdown: false,
                            validators: [new Gordic.Validators.Required()],
                            name: "in_ixs_typ",
                            model: "model.in_ixs_typ=value.ixs_typ, model.in_ktg_typ=value.ktg_typ",
                            serverFilters: { typ_ag: 50 },
                            tooltip: "Typ dokladu",
                        })
                            .addRow("Subřada")
                            .addField("gselectbox", Gordic.Prefabs.Select.rozddde(), {
                            disabled: false,
                            dropdown: false,
                            validators: [new Gordic.Validators.Required()],
                            name: "in_subrada",
                            model: "model.in_subrada=value.subrada",
                            serverFilters: {
                                aktivita: 100,
                                ico: that.GlobalParams.EkoParams?.ICO,
                                rok: that.GlobalParams.EkoParams?.ROK,
                            },
                            tooltip: "Subřada",
                        });
                    }
                    const commandBar = ["ok!", "cancel"];
                    let prom_vysledek = that.dialogs.simpleForm("Parametry dokladu", parametryForm, {}, { width: 400, height: 400, commandBar: commandBar });
                    let prom_vysledek_pro = prom_vysledek.createDialogPromise( /*"close"*/ /*"yes"*/ /*"ok"*/ /*, { duvod: string }*/)
                        .then(function (data) {
                        if (data) {
                            that.beginOperation("Probíhá proúčtování");
                            that.isl.InuDavka.prouctovat_Doklad({
                                typ: that.davka.typ, ixs_imp: that.davka.ixs_imp, in_ixp_den: data.in_ixp_den, in_ixs_fun: data.in_ixs_fun, in_ixs_su: data.in_ixs_su,
                                in_ixs_typ: data.in_ixs_typ, in_ktg_typ: data.in_ktg_typ, in_subrada: data.in_subrada
                            })
                                .getData()
                                .done(function (data) {
                                if ((data) && (data.v_err_code == 100)) {
                                    that.isl.InuDavka.list_Zapisy_Chyba({ filters: { typ: that.davka.typ, ixs_imp: that.davka.ixs_imp } })
                                        .getData()
                                        .done(function (data) {
                                        console.log("out data_chyby", data);
                                        var detailwindow = that.navigate("Gordic.Inu.WebClient.GImportDatChyby", {
                                            Data: data,
                                            Typ: that.davka.typ
                                        });
                                    }).always(function () {
                                        that.endOperation();
                                    });
                                }
                                else {
                                    that.isl.InuDavka.zmenaStavu({ ixsImp: that.davka.ixs_imp, stavImp: 10 })
                                        .getData()
                                        .then(function (data) {
                                        that.davka = data;
                                        var $cDiv = $(that.contentDiv);
                                        $cDiv.findFields().gfield("model", "apply", that.davka, { initialValues: true });
                                        that.trigger("inu_importdetailsave", [{ data: data }]);
                                        that.nastaveni_dle_stavu();
                                    }).always(function () {
                                        that.endOperation();
                                        that.dialogs.alert("Proúčtování dávky proběhlo bez chyb.");
                                    });
                                }
                                console.log("out data", data);
                            }).always(function () {
                                that.endOperation();
                            });
                        }
                    });
                }
                storno_davky() {
                    var that = this;
                    that.dialogs.messageBox("Dotaz", "Opravdu stornovat vybranou dávku?", GDlg.mbbYesNo, GDlg.mbiQuestion)
                        .on("yes", function () {
                        console.log("ixs_imp", that.davka.ixs_imp);
                        that.beginOperation("Probíhá storno dávky");
                        that.isl.InuDavka.zmenaStavu({ ixsImp: that.davka.ixs_imp, stavImp: 20 })
                            .getData()
                            .then(function (data) {
                            that.davka = data;
                            var $cDiv = $(that.contentDiv);
                            $cDiv.findFields().gfield("model", "apply", that.davka, { initialValues: true });
                            that.trigger("inu_importdetailsave", [{ data: data }]);
                            that.nastaveni_dle_stavu();
                        }).always(function () {
                            that.endOperation();
                        });
                    });
                }
                load_davky() {
                    var that = this;
                    if (that.file != undefined) {
                        that.beginOperation("Probíhá načtení dat");
                        that.isl.InuDavka.nacti_Davku({ rq: { data: that.davka }, fileInfo: that.file })
                            .getData()
                            .done(function (retVal) {
                            that.davka.ixs_imp = retVal.varovani;
                            if (retVal.vysledek == true) {
                                that.isl.InuDavka.read({ data: that.davka })
                                    .getData()
                                    .then(function (response) {
                                    that.davka = response;
                                    var $cDiv = $(that.contentDiv);
                                    $cDiv.findFields().gfield("model", "apply", that.davka, { initialValues: true });
                                    that.view_ISL_zapisy = new Gordic.Isl.View(that.isl.InuDavka.list_Zapisy({ filters: { typ: that.davka.typ, ixs_imp: that.davka.ixs_imp } }));
                                    that.$grid.ggrid("setData", that.view_ISL_zapisy);
                                    // nastavim akce
                                    that.actions.actTest.enabled(true);
                                    that.actions.actProuctovat.enabled(that.GlobalParams.Params?.PovoleniImportuDavek);
                                    that.actions.actProuctovatDoklad.enabled(that.GlobalParams.Params?.PovoleniImportuDavek);
                                    that.actions.actStorno.enabled(true);
                                    that.actions.actTisk.enabled(true);
                                    that.trigger("inu_importdetailsave", [{ data: response }]);
                                    var l_soubor = that.file;
                                    var data_priloha = {};
                                    data_priloha.ixs = that.davka.ixs_imp;
                                    data_priloha.description = l_soubor.filename;
                                    data_priloha.fileGuid = l_soubor.guid;
                                    data_priloha.filename = l_soubor.filename;
                                    data_priloha.ixp = "";
                                    //TypElpEpxEnum.Obraz
                                    that.isl.DavkaPriloha.upsert({ data: data_priloha }).getData()
                                        .then(function (data) {
                                    }).always(function () {
                                        that.endOperation();
                                    });
                                })
                                    .fail(function () {
                                })
                                    .always(function (response) {
                                    if (retVal.vysledek == true) {
                                        if ((retVal.varovani_txt) && (retVal.varovani_txt !== "")) {
                                            that.dialogs.alert(retVal.varovani_txt);
                                        }
                                        else {
                                            that.dialogs.alert("Import dat byl úspěšně proveden.");
                                        }
                                    }
                                    else {
                                        that.dialogs.alert("Při importu dat došlo k chybě." + " - " + retVal.vysledek_txt);
                                    }
                                });
                            }
                            else {
                                that.findFields("uploadFile").gfilefield("clear")[0];
                                that.dialogs.alert("Při importu dat došlo k chybě." + " - " + retVal.vysledek_txt);
                            }
                        })
                            .always(function (retVal) {
                            that.endOperation();
                        });
                    }
                }
                generateReport(rep) {
                    var cnt = this;
                    var vstup = {};
                    vstup = cnt.davka;
                    rep.customDto = vstup;
                }
                nastaveni_dle_stavu() {
                    var that = this;
                    that.actions.actTest.enabled(false);
                    that.actions.actProuctovat.enabled(false);
                    that.actions.actProuctovatDoklad.enabled(false);
                    that.actions.actStorno.enabled(false);
                    that.actions.actTisk.enabled(false);
                    //	CASE Gin.Konst.Stav_Nacteno, Gin.Konst.Stav_Nacteno_Chyba
                    if ((that.davka.stav_imp == 0) || (that.davka.stav_imp == 1)) {
                        that.actions.actTest.enabled(true);
                        that.actions.actProuctovat.enabled(this.GlobalParams.Params?.PovoleniImportuDavek);
                        that.actions.actProuctovatDoklad.enabled(this.GlobalParams.Params?.PovoleniImportuDavek);
                        that.actions.actStorno.enabled(true);
                        that.actions.actTisk.enabled(true);
                    }
                    // CASE Gin.Konst.Stav_Stornovano
                    if (that.davka.stav_imp == 20) {
                        that.actions.actTest.enabled(false);
                        that.actions.actProuctovat.enabled(false);
                        that.actions.actProuctovatDoklad.enabled(false);
                        that.actions.actStorno.enabled(false);
                        that.actions.actTisk.enabled(false);
                    }
                    //CASE Gin.Konst.Stav_Odmitnuto
                    if (that.davka.stav_imp == 2) {
                        that.actions.actTest.enabled(false);
                        that.actions.actProuctovat.enabled(false);
                        that.actions.actProuctovatDoklad.enabled(false);
                        that.actions.actStorno.enabled(false);
                        that.actions.actTisk.enabled(false);
                    }
                    // CASE Gin.Konst.Stav_Prouctovano
                    if (that.davka.stav_imp == 10) {
                        that.actions.actTest.enabled(false);
                        that.actions.actProuctovat.enabled(false);
                        that.actions.actProuctovatDoklad.enabled(false);
                        that.actions.actStorno.enabled(false);
                        that.actions.actTisk.enabled(true);
                    }
                    else {
                        that.actions.actTest.enabled(false);
                        that.actions.actProuctovat.enabled(false);
                        that.actions.actProuctovatDoklad.enabled(false);
                        that.actions.actStorno.enabled(false);
                        that.actions.actTisk.enabled(false);
                    }
                }
            };
            GImportDatDetail = __decorate([
                gcontent
            ], GImportDatDetail);
            WebClient.GImportDatDetail = GImportDatDetail;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0ltcG9ydERhdERldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdJbXBvcnREYXREZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7OztFQVFFOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBaTZCZjtBQWo2QkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaTZCbkI7SUFqNkJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpNkI3QjtRQWo2Qm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWlCLFNBQVEsT0FBQSxZQUFZO2dCQUFsRDs7b0JBRUksVUFBSyxHQUFHLGNBQWMsQ0FBQztvQkFTYixTQUFJLEdBQUcsSUFBSSxDQUFDO29CQVVkLFlBQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBdTRCckQsQ0FBQztnQkFwNEJHLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO29CQUUvRSx1QkFBdUI7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUM7d0JBQ2hCOzRCQUNJLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSzs0QkFDbkIsYUFBYSxFQUFFLElBQUk7eUJBQ3RCO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxrQkFBa0I7b0JBQ2xCLHlCQUF5QjtvQkFDekIsZ0JBQWdCO29CQUNoQiwyQ0FBMkM7b0JBQzNDLHNCQUFzQjtvQkFDdEIsdUNBQXVDO29CQUN2QyxXQUFXO29CQUNYLE9BQU87b0JBQ1AsS0FBSztvQkFFTCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRSxRQUFRLEVBQXVGLEtBQUs7NEJBQzdHLElBQUksRUFBRSxTQUFTLEVBQTRGLFNBQVM7NEJBQ3BILE9BQU8sRUFBRSxJQUFJLEVBQXVGLGlCQUFpQjs0QkFDckgsT0FBTyxFQUFFLElBQUk7NEJBQ2IsR0FBRyxFQUFFO2dDQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTs0QkFDakIsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLFNBQVMsRUFBRTs0QkFDUCxPQUFPLEVBQUUsUUFBUSxFQUFFLGtCQUFrQjs0QkFDckMsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFDL0IsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLE9BQU8sRUFBRTs0QkFDTCxPQUFPLEVBQUUsTUFBTSxFQUFFLGtCQUFrQjs0QkFDbkMsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDN0IsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLGFBQWEsRUFBRTs0QkFDWCxPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQjs0QkFDekMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQ0FDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLHNCQUFzQix1REFBK0MsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLDZEQUFxRCxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNoTixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLHVEQUErQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxzQkFBc0IsNkRBQXFELENBQUMsQ0FBQzs0QkFDbE4sT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsb0JBQXFCLENBQUM7NEJBQzFELEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0NBRU4sT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs0QkFDcEMsQ0FBQzt5QkFDSjtxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLG1CQUFtQixFQUFFOzRCQUNqQixPQUFPLEVBQUUsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsa0JBQWtCOzRCQUNyRSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dDQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLHdEQUFnRCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxzQkFBc0IsNkRBQXFELENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2pOLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxzQkFBc0Isd0RBQWdELENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLHNCQUFzQiw2REFBcUQsQ0FBQyxDQUFDOzRCQUNuTixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxvQkFBcUIsQ0FBQzs0QkFDMUQsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixPQUFPLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDOzRCQUMzQyxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7d0JBQ3ZDLElBQUksRUFBRSxTQUFTO3dCQUNmLElBQUksRUFBRSxpQkFBaUI7d0JBQ3ZCLE9BQU8sRUFBRSxNQUFNO3dCQUNmLE9BQU8sRUFBRSxNQUFNO3dCQUNmLGFBQWEsRUFBRSxJQUFJO3dCQUNuQixxQkFBcUIsRUFBRSwyREFBMkQ7d0JBQ2xGLGNBQWMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUNwQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3BDLENBQUM7cUJBQ0osQ0FBQyxDQUFDLENBQUM7b0JBSUosb0JBQW9CO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVySSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUM3RCxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQzt5QkFDdkIsSUFBSSxDQUFDO3dCQUNGLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTt3QkFDakQsZ0ZBQWdGO3FCQUNuRixDQUFDLENBQUE7b0JBQ04scUNBQXFDO29CQUVyQyxJQUFJLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxvQ0FBb0MsRUFBRSxDQUFDO3lCQUN2SCxVQUFVLENBQUMsT0FBTyxDQUFDO3lCQUNuQixNQUFNLENBQUMsd0JBQXdCLENBQUM7eUJBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7eUJBQ2xFLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7eUJBQzlELFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7eUJBRXZFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzt5QkFDckUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBRXZFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsNkJBQTZCLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQ2xFLGVBQWU7NkJBQ1YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFOzRCQUN2RixJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQ0FBaUMsRUFBRSxRQUFRLEVBQUUsS0FBSzs0QkFDdEUsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTs0QkFDaEMsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUM5QyxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVM7Z0NBQzNCLFFBQVEsQ0FBQztnQ0FDVCxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUM7NEJBQ3ZCLENBQUM7eUJBRVIsQ0FBQzs2QkFDRyxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRTs0QkFDM0IsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsUUFBUSxFQUFFLElBQUk7NEJBQ2QsT0FBTyxFQUFFO2dDQUNMO29DQUNJLFdBQVcsRUFBRSxLQUFLO29DQUNsQixNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUM7d0NBQ2hCLElBQUksRUFBRSxXQUFXO3dDQUNqQixJQUFJLEVBQUUsV0FBVzt3Q0FDakIsT0FBTyxFQUFFLGtCQUFrQjt3Q0FDM0IsT0FBTyxFQUFFLElBQUk7d0NBQ2IsT0FBTyxFQUFFLElBQUk7d0NBQ2IsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NENBQ2xCLElBQUksT0FBTyxHQUFHO2dEQUNWLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU87Z0RBQy9DLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUc7NkNBQzVDLENBQUM7NENBQ0YsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQzs0Q0FFbEUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs0Q0FDckMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7NENBQy9DLElBQUksU0FBUyxFQUFFLENBQUM7Z0RBQ1osSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDO2dEQUV0QixJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFLEVBQUUsQ0FBQztvREFDeEMsSUFBSSxNQUFNLEdBQUc7d0RBQ1QsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRTtxREFDNUIsQ0FBQztvREFDRix1REFBdUQ7b0RBQ3ZELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvREFDdkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsU0FBUzt3REFDMUYsSUFBSSxTQUFTLEVBQUUsQ0FBQzs0REFDWixTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFDakIsVUFBVSxFQUFFLEVBQUUsTUFBTTtnRUFDaEIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFLENBQUM7b0VBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0VBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0VBQ3hCLENBQUM7cUVBQU0sQ0FBQztvRUFDSixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Z0VBQ2pCLENBQUM7NERBQ0wsQ0FBQyxDQUFDLENBQUM7d0RBQ1gsQ0FBQztvREFDTCxDQUFDLENBQUMsQ0FBQztvREFFSCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnREFFekIsQ0FBQzs0Q0FDTCxDQUFDO3dDQUNMLENBQUM7cUNBRUosQ0FBQztpQ0FDTDs2QkFDSjt5QkFFSixDQUFDLENBQ0Q7b0JBQ1QsQ0FBQztvQkFFRCxlQUFlO3lCQUNWLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO29CQUVyRCxlQUFlO3lCQUNWLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFO3dCQUM1QixJQUFJLEVBQUUsUUFBUTt3QkFDZCxRQUFRLEVBQUUsSUFBSTt3QkFDZCxPQUFPLEVBQUUsQ0FBQztnQ0FDTixXQUFXLEVBQUUsS0FBSztnQ0FDbEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO2dDQUM3RSxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUM7b0NBQ2hCLElBQUksRUFBRSxvQkFBb0I7b0NBQzFCLElBQUksRUFBRSxhQUFhO29DQUNuQixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzt3Q0FDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQTRELGdDQUFnQzs0Q0FHbEosSUFBSSxFQUFFLEdBQUcsSUFBSSxRQUFRLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxDQUFDLDJCQUEyQjs0Q0FDM0YsRUFBRSxDQUFDLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOzRDQUM3QyxFQUFFLENBQUMsSUFBSSxDQUF3QyxrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2lEQUMxRixJQUFJLENBQUMsVUFBVSxDQUFDO2dEQUNiLElBQUksQ0FBQyxFQUFFLENBQUM7b0RBQ0osY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQU0sQ0FBQzt5REFDbEQsSUFBSSxDQUFDLFVBQVUsTUFBTSxJQUFJLENBQUMsQ0FBQzt5REFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lEQUMxRSxNQUFNLENBQUM7d0RBQ0osRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO29EQUN0QixDQUFDLENBQUMsQ0FBQztnREFDWCxDQUFDOzRDQUNMLENBQUMsQ0FBQyxDQUFBO3dDQUNWLENBQUM7b0NBRUwsQ0FBQztpQ0FDSixDQUFDOzZCQUNMLENBQUM7cUJBQ0wsQ0FBQzt5QkFDRCxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQ25FO29CQUVULElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDdEQsV0FBVztvQkFDZixDQUFDO3lCQUNJLENBQUM7d0JBRUYsZUFBZTs2QkFDVixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRTs0QkFDNUIsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUM5QyxJQUFJLEVBQUUsWUFBWTs0QkFDbEIsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLFlBQVksRUFBRSxDQUFDOzRCQUNmLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTO2dDQUMzQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQ0FDbEMsSUFBSSxTQUFTLENBQUMsS0FBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztvQ0FDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQ0FDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQ0FDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQ0FDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQ0FDcEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dDQUN0QixDQUFDOzRCQUNMLENBQUM7eUJBQ0osQ0FBQzs2QkFDRCxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQ3BFO29CQUNULENBQUM7b0JBRUQsZUFBZTt5QkFDVixNQUFNLENBQUMsU0FBUyxDQUFDO3lCQUNiLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO3lCQUM5RixRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7eUJBRWxGLE1BQU0sQ0FBQyxZQUFZLENBQUM7eUJBQ2hCLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO3lCQUMvRixRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDbkY7b0JBRUwsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFakosSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUN0RCxXQUFXO29CQUNmLENBQUM7eUJBQ0ksQ0FBQzt3QkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN2QyxDQUFDO29CQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFFdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW9CLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFFckMsNERBQTREO3dCQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDOzRCQUMzRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxvQkFBcUIsQ0FBQyxDQUFDOzRCQUNyRixJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxvQkFBcUIsQ0FBQyxDQUFDOzRCQUMzRixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDeEMsQ0FBQzt3QkFDRCxpQ0FBaUM7d0JBQ2pDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFFLENBQUM7NEJBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFvQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3pDLENBQUM7d0JBRUQsK0JBQStCO3dCQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBb0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN6QyxDQUFDO3dCQUVELGtDQUFrQzt3QkFDbEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUUsQ0FBQzs0QkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW9CLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDeEMsQ0FBQztvQkFDTCxDQUFDO3lCQUVELENBQUM7d0JBQ0csSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW9CLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekMsQ0FBQztvQkFFRCx3QkFBd0I7b0JBQ3hCLG9FQUFvRTtvQkFDcEUsMkJBQTJCO29CQUMzQixLQUFLO29CQUVMLG1DQUFtQztvQkFDbkMsK0NBQStDO29CQUMvQyxnRUFBZ0U7b0JBQ2hFLEtBQUs7b0JBRUwsa0JBQWtCO29CQUNsQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt5QkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQzt5QkFDbEMsS0FBSyxDQUFDO3dCQUNILFVBQVUsRUFBRSxNQUFNO3dCQUNsQixjQUFjLEVBQUUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDN0YsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU07NEJBQzNCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUVqRCxDQUFDO3dCQUNELGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7d0JBQ3JDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO3FCQUM3QixDQUFDLENBQUM7b0JBRVAsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO3dCQUNyRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEVBQUUsRUFBRyxDQUFDLENBQUMsY0FBYzs0QkFDNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDakosQ0FBQzs2QkFDSSxDQUFDOzRCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDN0osQ0FBQzt3QkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUN0RCxDQUFDO29CQUVELHdEQUF3RDtvQkFDeEQsd0VBQXdFO29CQUV4RSxvQkFBb0I7b0JBQ3BCLG1CQUFtQjtvQkFDbkIsT0FBTztvQkFDUCx3Q0FBd0M7b0JBRXhDLFFBQVE7b0JBQ1IsS0FBSztnQkFFVCxDQUFDO2dCQUdELEtBQUs7Z0JBQ0wsc0JBQXNCO2dCQUN0QixLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsb0JBQW9CO2dCQUNwQixzQkFBc0I7Z0JBQ3RCLDZCQUE2QjtnQkFDN0Isc0RBQXNEO2dCQUN0RCwrRkFBK0Y7Z0JBQy9GLE9BQU87Z0JBRVAsc0NBQXNDO2dCQUN0QyxvQkFBb0I7Z0JBQ3BCLHVDQUF1QztnQkFDdkMsNkNBQTZDO2dCQUU3QyxnQkFBZ0I7Z0JBQ2hCLHNDQUFzQztnQkFDdEMsT0FBTztnQkFDUCwyQkFBMkI7Z0JBQzNCLEdBQUc7Z0JBRUg7OztxQkFHSztnQkFDRyxVQUFVO29CQUNkLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFOUMsVUFBVSxDQUFDLGFBQWEsQ0FBQzt3QkFDckIsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBQyxpQ0FBaUM7d0JBQ3hFLEtBQUssRUFBRSxFQUFFO3FCQUNaLENBQUMsQ0FBQztvQkFFSCxVQUFVLENBQUMsYUFBYSxDQUFDO3dCQUNyQixJQUFJLEVBQUUsS0FBSzt3QkFDWCxPQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFDLGlDQUFpQzt3QkFDeEUsS0FBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQyxDQUFDO29CQUVILFVBQVUsQ0FBQyxhQUFhLENBQUM7d0JBQ3JCLElBQUksRUFBRSxLQUFLO3dCQUNYLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUMsaUNBQWlDO3dCQUN4RSxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDLENBQUM7b0JBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDL0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDbkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBRTVGLFVBQVUsQ0FBQyxlQUFlLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUMvQyxLQUFLLEVBQUUsRUFBRTtxQkFDWixDQUFDLENBQUM7b0JBRUgsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQzt5QkFDckQsaUJBQWlCLENBQUM7d0JBQ2YsSUFBSSxFQUFFLElBQUk7d0JBQ1YscUJBQXFCO3dCQUNyQixPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQjt3QkFDNUMsS0FBSyxFQUFFLEdBQUc7cUJBQ2IsQ0FBQzt5QkFDRCxpQkFBaUIsQ0FBQzt3QkFDZixJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQjt3QkFDN0MsS0FBSyxFQUFFLEdBQUc7cUJBRWIsQ0FBQyxDQUFDO29CQUVSLFVBQVUsQ0FBQyxhQUFhLENBQUM7d0JBQ3BCLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxPQUFPO3dCQUNoQixLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLENBQUM7b0JBRWQsd0VBQXdFO29CQUU3RCw0QkFBNEI7b0JBQzVCLHdCQUF3QjtvQkFDeEIsMkRBQTJEO29CQUMzRCxnQkFBZ0I7b0JBQ2hCLEtBQUs7b0JBQ0wsNEJBQTRCO29CQUM1Qix5QkFBeUI7b0JBQ3pCLDZEQUE2RDtvQkFDN0QsZUFBZTtvQkFDZixLQUFLO29CQUVMLE9BQU8sVUFBVSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELE1BQU07b0JBQ0YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMvQixJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBRTNDLElBQUksU0FBUyxHQUFxQyxFQUFFLENBQUM7d0JBRXJELEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDekQsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFFckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQzt3QkFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQzt3QkFFL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs2QkFDekMsT0FBTyxFQUFFOzZCQUNULElBQUksQ0FBQyxVQUFVLFFBQVE7NEJBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDOzRCQUV0QixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOzRCQUVqRixJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQSxDQUFDLDhDQUE4Qzt3QkFDL0csQ0FBQyxDQUFDOzZCQUNELElBQUksQ0FBQzt3QkFDTixDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsVUFBVTtvQkFDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTNDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBRXBDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7eUJBQy9MLE9BQU8sRUFBRTt5QkFDVCxJQUFJLENBQUMsVUFBVSxJQUFJO3dCQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUM7NEJBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7aUNBQ2pHLE9BQU8sRUFBRTtpQ0FDVCxJQUFJLENBQUMsVUFBVSxJQUFJO2dDQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUNwQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHNDQUFzQyxFQUFFO29DQUNyRSxJQUFJLEVBQUUsSUFBSTtvQ0FDVixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO2lDQUN0QixDQUFDLENBQUM7NEJBRVAsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dDQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFDeEIsQ0FBQyxDQUFDLENBQUM7d0JBRVgsQ0FBQzs2QkFDSSxDQUFDOzRCQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUM3RCxxQkFBcUI7NEJBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7d0JBQ3ZELENBQUM7d0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2xDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFXLEtBQUs7d0JBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCxpQkFBaUI7b0JBQ2IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUUzQyxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUM7b0JBRTNDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzt5QkFDN0UsT0FBTyxFQUFFO3lCQUNULElBQUksQ0FBQyxVQUFVLElBQUk7d0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQzs0QkFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztpQ0FDakcsT0FBTyxFQUFFO2lDQUNULElBQUksQ0FBQyxVQUFVLElBQUk7Z0NBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0NBQ3BDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsc0NBQXNDLEVBQUU7b0NBQ3JFLElBQUksRUFBRSxJQUFJO29DQUNWLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7aUNBQ3RCLENBQUMsQ0FBQzs0QkFFUCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0NBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUN4QixDQUFDLENBQUMsQ0FBQzt3QkFFWCxDQUFDOzZCQUVELENBQUM7NEJBQ0csSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztpQ0FDckUsT0FBTyxFQUFFO2lDQUNULElBQUksQ0FBQyxVQUFVLElBQUk7Z0NBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dDQUNsQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dDQUMvQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dDQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUV2RCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzs0QkFFL0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dDQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQzs0QkFDL0QsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsQ0FBQzt3QkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDbEMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRCx3QkFBd0I7b0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFM0MsSUFBSSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDckM7d0JBQ0ksSUFBSSxFQUFFLG1CQUFtQjt3QkFDekIsZ0JBQWdCLEVBQUUsdUNBQXVDO3dCQUN6RCxhQUFhLEVBQUU7NEJBQ1gsRUFBRSxFQUFFLG9CQUFvQjt5QkFDcEI7d0JBQ1IsT0FBTzt3QkFDUCw4QkFBOEI7d0JBQzlCLG1CQUFtQjt3QkFDbkIsNkJBQTZCO3dCQUM3QixPQUFPO3FCQUNWLENBQUMsQ0FBQztvQkFFUCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO3dCQUMxQixhQUFhOzZCQUNSLE1BQU0sQ0FBQyxPQUFPLENBQUM7NkJBQ2YsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTs0QkFDckQsUUFBUSxFQUFFLEtBQUs7NEJBQ2YsUUFBUSxFQUFFLEtBQUs7NEJBQ2YsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUM5QyxJQUFJLEVBQUUsWUFBWTs0QkFDbEIsS0FBSyxFQUFFLGdDQUFnQzs0QkFDdkMsYUFBYSxFQUFFO2dDQUNYLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxHQUFHO2dDQUNyQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsR0FBRztnQ0FDckMsV0FBVyxFQUFFLElBQUk7NkJBQ3BCOzRCQUNELE9BQU8sRUFBRSxPQUFPO3lCQUNuQixDQUFDOzZCQUNELE1BQU0sQ0FBQyxhQUFhLENBQUM7NkJBQ3JCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7NEJBQ3JELFFBQVEsRUFBRSxLQUFLOzRCQUNmLFFBQVEsRUFBRSxLQUFLOzRCQUNmLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDOUMsSUFBSSxFQUFFLFlBQVk7NEJBQ2xCLEtBQUssRUFBRSxnRUFBZ0U7NEJBQ3ZFLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7NEJBQzdCLE9BQU8sRUFBRSxhQUFhO3lCQUN6QixDQUFDOzZCQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7NkJBQ2pCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7NEJBQ3JELFFBQVEsRUFBRSxLQUFLOzRCQUNmLFFBQVEsRUFBRSxLQUFLOzRCQUNmLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDOUMsSUFBSSxFQUFFLFlBQVk7NEJBQ2xCLEtBQUssRUFBRSxnQ0FBZ0M7NEJBQ3ZDLGFBQWEsRUFBRTtnQ0FDWCxRQUFRLEVBQUUsR0FBRztnQ0FDYixHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsR0FBRztnQ0FDckMsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEdBQUc7NkJBQ3hDOzRCQUNELE9BQU8sRUFBRSxTQUFTO3lCQUNyQixDQUFDLENBQUM7b0JBQ1gsQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLGFBQWE7NkJBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQzs2QkFDZixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFOzRCQUNyRCxRQUFRLEVBQUUsS0FBSzs0QkFDZixRQUFRLEVBQUUsS0FBSzs0QkFDZixVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQzlDLElBQUksRUFBRSxZQUFZOzRCQUNsQixLQUFLLEVBQUUsZ0NBQWdDOzRCQUN2QyxhQUFhLEVBQUU7Z0NBQ1gsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEdBQUc7Z0NBQ3JDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxHQUFHO2dDQUNyQyxXQUFXLEVBQUUsSUFBSTs2QkFDcEI7NEJBQ0QsT0FBTyxFQUFFLE9BQU87eUJBQ25CLENBQUM7NkJBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQzs2QkFDckIsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTs0QkFDckQsUUFBUSxFQUFFLEtBQUs7NEJBQ2YsUUFBUSxFQUFFLEtBQUs7NEJBQ2YsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUM5QyxJQUFJLEVBQUUsWUFBWTs0QkFDbEIsS0FBSyxFQUFFLGdFQUFnRTs0QkFDdkUsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTs0QkFDN0IsT0FBTyxFQUFFLGFBQWE7eUJBQ3pCLENBQUM7NkJBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQzs2QkFDakIsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTs0QkFDckQsUUFBUSxFQUFFLEtBQUs7NEJBQ2YsUUFBUSxFQUFFLEtBQUs7NEJBQ2YsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUM5QyxJQUFJLEVBQUUsWUFBWTs0QkFDbEIsS0FBSyxFQUFFLGdDQUFnQzs0QkFDdkMsYUFBYSxFQUFFO2dDQUNYLFFBQVEsRUFBRSxHQUFHO2dDQUNiLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxHQUFHO2dDQUNyQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsR0FBRzs2QkFDeEM7NEJBQ0QsT0FBTyxFQUFFLFNBQVM7eUJBQ3JCLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUdELE1BQU0sVUFBVSxHQUEwQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDNUUsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLEVBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDMUksSUFBSSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFBLFNBQVMsQ0FBQSxRQUFRLENBQUEsdUJBQXVCLENBQUM7eUJBQzFHLElBQUksQ0FBQyxVQUFVLElBQUk7d0JBQ2hCLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQ1AsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOzRCQUUzQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDaEMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0NBQ3JJLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTs2QkFDeEYsQ0FBQztpQ0FDRyxPQUFPLEVBQUU7aUNBQ1QsSUFBSSxDQUFDLFVBQVUsSUFBSTtnQ0FDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDO29DQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO3lDQUNqRyxPQUFPLEVBQUU7eUNBQ1QsSUFBSSxDQUFDLFVBQVUsSUFBSTt3Q0FDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQzt3Q0FDcEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQ0FBc0MsRUFBRTs0Q0FDckUsSUFBSSxFQUFFLElBQUk7NENBQ1YsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzt5Q0FDdEIsQ0FBQyxDQUFDO29DQUVQLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3Q0FDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0NBQ3hCLENBQUMsQ0FBQyxDQUFDO2dDQUVYLENBQUM7cUNBQ0ksQ0FBQztvQ0FDRixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO3lDQUNyRSxPQUFPLEVBQUU7eUNBQ1QsSUFBSSxDQUFDLFVBQVUsSUFBSTt3Q0FDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7d0NBQ2xCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7d0NBQy9CLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7d0NBQ2pGLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0NBRXZELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO29DQUUvQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7d0NBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dDQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO29DQUMvRCxDQUFDLENBQUMsQ0FBQztnQ0FDWCxDQUFDO2dDQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUNsQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0NBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUN4QixDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUM7Z0JBR0QsWUFBWTtvQkFDUixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7eUJBQ2pHLEVBQUUsQ0FBQyxLQUFLLEVBQUU7d0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFFM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO3dCQUU1QyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOzZCQUNyRSxPQUFPLEVBQUU7NkJBQ1QsSUFBSSxDQUFDLFVBQVUsSUFBSTs0QkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7NEJBQ2xCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQy9CLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7NEJBQ2pGLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBRXZELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO3dCQUUvQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7NEJBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDLENBQUMsQ0FBQTtnQkFDVixDQUFDO2dCQUVELFVBQVU7b0JBQ04sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxFQUFFLENBQUM7d0JBRTFCLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQTt3QkFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzZCQUMzRSxPQUFPLEVBQUU7NkJBQ1QsSUFBSSxDQUFDLFVBQVUsTUFBTTs0QkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQzs0QkFFckMsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksRUFDM0IsQ0FBQztnQ0FDRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO3FDQUN2QyxPQUFPLEVBQUU7cUNBQ1QsSUFBSSxDQUFDLFVBQVUsUUFBUTtvQ0FDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7b0NBRXRCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0NBQy9CLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0NBRWpGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0NBQzdJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7b0NBRWxELGdCQUFnQjtvQ0FDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsb0JBQXFCLENBQUMsQ0FBQztvQ0FDckYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsb0JBQXFCLENBQUMsQ0FBQztvQ0FDM0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0NBRXBDLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0NBRTNELElBQUksUUFBUSxHQUFxRCxJQUFJLENBQUMsSUFBSSxDQUFDO29DQUUzRSxJQUFJLFlBQVksR0FBOEMsRUFBRSxDQUFDO29DQUNqRSxZQUFZLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO29DQUN0QyxZQUFZLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7b0NBQzdDLFlBQVksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztvQ0FDdEMsWUFBWSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO29DQUMxQyxZQUFZLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztvQ0FDdEIscUJBQXFCO29DQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUU7eUNBQ3pELElBQUksQ0FBQyxVQUFVLElBQUk7b0NBQ3BCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3Q0FDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0NBQ3hCLENBQUMsQ0FBQyxDQUFDO2dDQUNYLENBQUMsQ0FBQztxQ0FDRCxJQUFJLENBQUM7Z0NBQ04sQ0FBQyxDQUFDO3FDQUNELE1BQU0sQ0FBQyxVQUFVLFFBQVE7b0NBQ3RCLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3Q0FFMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQzs0Q0FDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQWEsQ0FBQyxDQUFDO3dDQUM3QyxDQUFDOzZDQUNJLENBQUM7NENBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQzt3Q0FDM0QsQ0FBQztvQ0FDTCxDQUFDO3lDQUNJLENBQUM7d0NBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQ0FDdkYsQ0FBQztnQ0FDTCxDQUFDLENBQUMsQ0FBQzs0QkFBd0IsQ0FBQztpQ0FFcEMsQ0FBQztnQ0FDRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDdkYsQ0FBQzt3QkFDTCxDQUFDLENBQUM7NkJBQ0QsTUFBTSxDQUFDLFVBQVUsTUFBTTs0QkFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQTtvQkFDVixDQUFDO2dCQUNMLENBQUM7Z0JBRUQsY0FBYyxDQUFDLEdBQUc7b0JBQ2QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUNmLElBQUksS0FBSyxHQUFxQyxFQUFFLENBQUM7b0JBRWpELEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUNsQixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDM0IsQ0FBQztnQkFFQSxtQkFBbUI7b0JBQ2YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBb0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVyQyw0REFBNEQ7b0JBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLG9CQUFxQixDQUFDLENBQUM7d0JBQ3JGLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLG9CQUFxQixDQUFDLENBQUM7d0JBQzNGLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QyxDQUFDO29CQUNELGlDQUFpQztvQkFDakMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUUsQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW9CLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekMsQ0FBQztvQkFFRCwrQkFBK0I7b0JBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFjLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFvQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pDLENBQUM7b0JBRUQsa0NBQWtDO29CQUNsQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEVBQUUsRUFBRSxDQUFDO3dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBb0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QyxDQUFDO3lCQUVELENBQUM7d0JBQ0csSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW9CLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekMsQ0FBQztnQkFDTCxDQUFDO2FBQ0osQ0FBQTtZQTU1QlksZ0JBQWdCO2dCQUQ1QixRQUFRO2VBQ0ksZ0JBQWdCLENBNDVCNUI7WUE1NUJZLDBCQUFnQixtQkE0NUI1QixDQUFBO1FBQ0wsQ0FBQyxFQWo2Qm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWk2QjdCO0lBQUQsQ0FBQyxFQWo2QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWk2Qm5CO0FBQUQsQ0FBQyxFQWo2QlMsTUFBTSxLQUFOLE1BQU0sUUFpNkJmIiwic291cmNlc0NvbnRlbnQiOlsiLyohLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vKiEvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkludS5XZWJDbGllbnQuR0ltcG9ydERhdERldGFpbC5qcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IEdQcmVwb2N0eVN0YXZ1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSmnFmcOtIElsZcSNZWsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAxNiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE2LTAzLTAzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbiovXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkludS5XZWJDbGllbnQge1xyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHSW1wb3J0RGF0RGV0YWlsIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIkRldGFpbCBkw6F2a3lcIjsgXHJcblxyXG4gICAgICAgIHByaXZhdGUgJGZpbHRlclBhbmVsOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3X0lTTDogR29yZGljLklzbC5WaWV3PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVzaW1wRHRvPjtcclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMX3phcGlzeTogR29yZGljLklzbC5WaWV3PEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVzaW1wRHRvPjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGRhdmthOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51c2ltcER0bztcclxuICAgICAgICBwcml2YXRlIGZpbGU6IGFueTsgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBpbml0ID0gdHJ1ZTtcclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWxfdHlwOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIGFnZW5kYTogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBmb3JtOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbWFpbkZvcm06IEpRdWVyeTtcclxuICAgICAgICBcclxuICAgICAgICAvL3ByaXZhdGUgZWxlbTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkludS5HbG9iYWxzLkdJbnVHbG9iYWxzO1xyXG4gICAgICAgIHJlYWRvbmx5IEdsb2JhbFBhcmFtczogR29yZGljLkludS5XZWJDbGllbnQuR0ludUdsb2JhbER0bztcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSB0aGF0LmRhdmthLnR5cCA9PSBcIlVDVFwiID8gXCJEZXRhaWwgZMOhdmt5IFVDVFwiIDogXCJEZXRhaWwgZMOhdmt5IFJPWlwiO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIGJyZWFkY3J1bWJzXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoYXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vLy9uYXN0YXZlbsOtIGFrY8OtXHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgLy8gICAgYWN0Tm92YToge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJOb3bDoVwiLCBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB0aGF0Lm5vdmFfZGF2a2EoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT0tcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXNhdmVcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWtvbmEgXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHZpZGl0ZWxuw6lcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVsb3ppdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RTdG9ybm86IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0b3Jub1wiLCAvL2ljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zdG9ybm9fZGF2a3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFRlc3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlRlc3RcIiwgLy9pY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQudGVzdF9kYXZreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0UHJvdWN0b3ZhdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUHJvw7rEjXRvdmF0XCIsIC8vaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogKHRoYXQuZGF2a2EudHlwID09IFwiVUNUXCIpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlpwdXNvYkltcG9ydHVEYXZla19VY3QgPT0gSW51LkludGVyZmFjZS5HSW51RGF2a2FDaWxQcm91Y3RvdmFuaS5EZW5paykgfHwgKHRoaXMuR2xvYmFsUGFyYW1zLlBhcmFtcz8uWnB1c29iSW1wb3J0dURhdmVrX1VjdCA9PSBJbnUuSW50ZXJmYWNlLkdJbnVEYXZrYUNpbFByb3VjdG92YW5pLkRlbmlrQWdlbmRhKSkgOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlpwdXNvYkltcG9ydHVEYXZla19Sb3ogPT0gSW51LkludGVyZmFjZS5HSW51RGF2a2FDaWxQcm91Y3RvdmFuaS5EZW5paykgfHwgKHRoaXMuR2xvYmFsUGFyYW1zLlBhcmFtcz8uWnB1c29iSW1wb3J0dURhdmVrX1JveiA9PSBJbnUuSW50ZXJmYWNlLkdJbnVEYXZrYUNpbFByb3VjdG92YW5pLkRlbmlrQWdlbmRhKSksXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKHRoaXMuR2xvYmFsUGFyYW1zLlBhcmFtcz8uUG92b2xlbmlJbXBvcnR1RGF2ZWshKSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnByb3VjdG92YW5pX2Rhdmt5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RQcm91Y3RvdmF0RG9rbGFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQcm/DusSNdG92YXQgZG8gYWdlbmR5IFwiICsgdGhhdC5kYXZrYS50eXAsIC8vaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogKHRoYXQuZGF2a2EudHlwID09IFwiVUNUXCIpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlpwdXNvYkltcG9ydHVEYXZla19VY3QgPT0gSW51LkludGVyZmFjZS5HSW51RGF2a2FDaWxQcm91Y3RvdmFuaS5BZ2VuZGEpIHx8ICh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlpwdXNvYkltcG9ydHVEYXZla19VY3QgPT0gSW51LkludGVyZmFjZS5HSW51RGF2a2FDaWxQcm91Y3RvdmFuaS5EZW5pa0FnZW5kYSkpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlpwdXNvYkltcG9ydHVEYXZla19Sb3ogPT0gSW51LkludGVyZmFjZS5HSW51RGF2a2FDaWxQcm91Y3RvdmFuaS5BZ2VuZGEpIHx8ICh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlpwdXNvYkltcG9ydHVEYXZla19Sb3ogPT0gSW51LkludGVyZmFjZS5HSW51RGF2a2FDaWxQcm91Y3RvdmFuaS5EZW5pa0FnZW5kYSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlBvdm9sZW5pSW1wb3J0dURhdmVrISksXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnByb3VjdG92YW5pX2Rhdmt5X2FnZW5kYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcImludV9wdG1faW51aW1wb1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlRpc2tcIixcclxuICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkludS5XZWJDbGllbnQuR0ltcG9ydERhdERldGFpbDpDb252ZXJ0UmVwb3J0UGFyYW1zXCIsXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogKHJlcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlUmVwb3J0KHJlcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBtZW51QmFydVxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RVbG96aXQqXCIsIFwiYWN0U3Rvcm5vKlwiLCBcImFjdFRlc3QqXCIsIFwiYWN0UHJvdWN0b3ZhdCpcIiwgXCJhY3RQcm91Y3RvdmF0RG9rbGFkKlwiLCBcImFjdFRpc2sqXCJdKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1haW5Gb3JtID0gJChcIjxkaXYgY2xhc3M9J2pzLWRhdmthJz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcIm92ZXJmbG93XCIsIFwiYXV0b1wiKVxyXG4gICAgICAgICAgICAgICAgLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRldGFpbCBkw6F2a3lcIiwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tZW51QmFyOiB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFJvemRlbGl0KlwiLCBcImFjdE51bG92YXQqXCIsIFwiYWN0VWxveml0KlwiXSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIC5nYXV0b2ZpdCh7IG1pbmltYWxIZWlnaHQ6IDQyMCB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXRhaWxEYXZrYUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImRldGFpbERhdmthXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDRNNFMyIEwtMS0xMC0xIE0tMS0xMC0xIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkTDoXZrYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yL1R5cC9TdGF2XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy00XCIsIHsgbmFtZTogXCJpeHNfaW1wXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy00XCIsIHsgbmFtZTogXCJ0eXBcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInN0YXZfaW1wX3R4dFwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaa3JhdGthXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwgeyBuYW1lOiBcInprcmF0a2FcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGlzXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwgeyBuYW1lOiBcInBvcGlzXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5HbG9iYWxQYXJhbXMuUGFyYW1zPy5SZXppbUV2aWRlbmNlRGF2ZWtEb2t1bWVudG92eSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxEYXZrYUZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwL0Rva3VtZW50XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNlwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3Nsc3R5cCgpLCB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c190eXBcIiwgbW9kZWw6IFwibW9kZWwuaXhzX3R5cF9kb2s9dmFsdWUuaXhzX3R5cFwiLCBkcm9wZG93bjogZmFsc2UsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGt0Z190eXA6IDY2MDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWEgPSBjaGFuZ2VPYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlRWRpdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiRGV0YWlsIGRva3VtZW50dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBEb2s6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5UeXBEb2suVmxhc3RuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBJZDogR29yZGljLldmbC5HbG9iYWxzLkVudW1zLlR5cElkLklYUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RPdGV2cmVuaSA9IEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KFwiLmdmb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZfcGlkX29iaiA9ICQoY3R4LmZpZWxkKS5nZmllbGQoXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZfcGlkX29iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2X3BpZCA9IHZfcGlkX29iajtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZfcGlkICYmIHZfcGlkICE9IG51bGwgJiYgdl9waWQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGV0YWlsRHRvOiB7IGl4cDogdl9waWQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHb3JkaWMuU3NsLkRpYWxvZ3MuRGV0YWlsKGNudCwgcGFyYW1zLCBtb2RPdGV2cmVuaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0ICRkaWFsb2cgPSBHb3JkaWMuU3NsLkRpYWxvZ3MuRGV0YWlsKHRoYXQsIHBhcmFtcywgbW9kT3RldnJlbmkpPy5kb25lKGZ1bmN0aW9uIChjbnREZXRhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbnREZXRhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnREZXRhaWwub24oXCJjbG9zZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2LCByZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJldFZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmV0VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRldGFpbERhdmthRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNvdWJvciBwcm8gbmHEjXRlbsOtL0NSQ1wiLCB7IG5hbWU6IFwibGFiZWwxXCIgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBkZXRhaWxEYXZrYUZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic291Ym9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUVkaXQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKCh0aGF0LmRhdmthLnByaWxvaGEpICYmICh0aGF0LmRhdmthLnByaWxvaGEgIT09IFwiXCIpKSA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbG9oYVN0YWhub3V0QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kb3dubG9hZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGF0LmRhdmthLnByaWxvaGEpICYmICh0aGF0LmRhdmthLnByaWxvaGEgIT09IFwiXCIpKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2MgPSBuZXcgR0NvbnRlbnQoXCJHb3JkaWMuSW51LldlYkNsaWVudC5HSW1wb3J0RGF0RGV0YWlsXCIpOyAvL2RvdGHFvmVuw60gxZnDoWRrdSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYy5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSBzdGHFvmVuw60gc291Ym9ydVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdjLmNhbGw8R29yZGljLkdpbi5JbnRlcmZhY2UuR0ZpbGVJblN0cmluZ0R0bz4oXCJHZXRGaWxlWlVsb3ppc3RlXCIsIHsgSXhiOiB0aGF0LmRhdmthLnByaWxvaGEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR0Jyb3dzZXJFeHRyYXMuZG9jdW1lbnRTYXZlT3BlbkxvY2FsKHIuTmFtZSEsIHIuQnl0ZXMhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoZXJyKSB7IEdvcmRpYy5HdWkuV2ViQXBwLlV0aWxzLnNob3dSZWFzb25GbGFzaChnYywgZXJyKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2MuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0yXCIsIHsgbmFtZTogXCJrb25fc3VtYVwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIGlmICgodGhhdC5kYXZrYS5peHNfaW1wKSAmJiAodGhhdC5kYXZrYS5peHNfaW1wICE9PSBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGFkeSBuaWNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkZXRhaWxEYXZrYUZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZmlsZWZpZWxkXCIsIFwidy0xMFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXBsb2FkRmlsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEZpbGVDb3VudDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgkKGV2LnRhcmdldCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai52YWx1ZSEubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJzb3Vib3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImtvbl9zdW1hXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbGUgPSB0aGF0LmZpbmRGaWVsZHMoXCJ1cGxvYWRGaWxlXCIpLmdmaWxlZmllbGQoXCJnZXRWYWx1ZVwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJ1cGxvYWRGaWxlXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJrb25fc3VtYTJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZF9kYXZreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMlwiLCB7IG5hbWU6IFwia29uX3N1bWEyXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZXRhaWxEYXZrYUZvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOYcSNdGVub1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy00XCIsIHsgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIsIG5hbWU6IFwiZGF0X3ptZW5hX25hY3RcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy04XCIsIHsgbmFtZTogXCJ6bWVudV9wcm92X25hY3RfdHh0XCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpwcmFjb3bDoW5vXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTRcIiwgeyB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiwgbmFtZTogXCJkYXRfem1lbmFfenByYWNcIiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy04XCIsIHsgbmFtZTogXCJ6bWVudV9wcm92X3pwcmFjX3R4dFwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgJChcIjxkaXYgY2xhc3M9J2pzLWRldGFpbERBVktBJz5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZGV0YWlsRGF2a2FGb3JtLCkuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5kYXZrYSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoYXQuZGF2a2EuaXhzX2ltcCkgJiYgKHRoYXQuZGF2a2EuaXhzX2ltcCAhPT0gXCJcIikpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRhZHkgbmljXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJzb3Vib3JcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwia29uX3N1bWFcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoYXQuZGF2a2EuaXhzX2ltcCkgJiYgKHRoYXQuZGF2a2EuaXhzX2ltcCAhPT0gXCJcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGVzdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdERva2xhZCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrIS5lbmFibGVkKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1x0Q0FTRSBHaW4uS29uc3QuU3Rhdl9OYWN0ZW5vLCBHaW4uS29uc3QuU3Rhdl9OYWN0ZW5vX0NoeWJhXHJcbiAgICAgICAgICAgICAgICBpZiAoKHRoYXQuZGF2a2Euc3Rhdl9pbXAgPT0gMCkgfHwgKHRoYXQuZGF2a2Euc3Rhdl9pbXAgPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGVzdCEuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEuZW5hYmxlZCh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlBvdm9sZW5pSW1wb3J0dURhdmVrISk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByb3VjdG92YXREb2tsYWQhLmVuYWJsZWQodGhpcy5HbG9iYWxQYXJhbXMuUGFyYW1zPy5Qb3ZvbGVuaUltcG9ydHVEYXZlayEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTdG9ybm8hLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRpc2shLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBDQVNFIEdpbi5Lb25zdC5TdGF2X1N0b3Jub3Zhbm9cclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmRhdmthLnN0YXZfaW1wID09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRlc3QhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0IS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdERva2xhZCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0b3JubyEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRpc2shLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vQ0FTRSBHaW4uS29uc3QuU3Rhdl9PZG1pdG51dG9cclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmRhdmthLnN0YXZfaW1wID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGVzdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByb3VjdG92YXQhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0RG9rbGFkIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGlzayEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ0FTRSBHaW4uS29uc3QuU3Rhdl9Qcm91Y3RvdmFub1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuZGF2a2Euc3Rhdl9pbXAgPT0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGVzdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByb3VjdG92YXQhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0RG9rbGFkIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGlzayEuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUZXN0IS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0IS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0RG9rbGFkIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTdG9ybm8hLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRpc2shLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLy8vIGRlZmluY2ljZSBwcm92aWRlcnVcclxuICAgICAgICAgICAgLy9sZXQgcHJvdmlkZXIgPSBuZXcgR29yZGljLkRhdGEuUHJvdmlkZXI8YW55LCBhbnksIGFueT4oKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBkZWZBa01lbnU6IE1lbnVQYXJhbXNbXSA9IFtdO1xyXG4gICAgICAgICAgICAvLy8vZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0QWtjZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLy8vICAgIGRlZkFrTWVudS5wdXNoKHsgYWN0aW9uOiBsaXN0QWtjZVtpXSwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIC8vLy99XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmljaWUgZ3JpZHVcclxuICAgICAgICAgICAgbGV0IGdmID0gdGhhdC5jcmVhdGVDb2xzKCk7XHJcbiAgICAgICAgICAgIHRoYXQuJGdyaWQgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogeyBmaWx0ZXJWaXNpYmxlOiBmYWxzZSwgY29sdW1uTGlzdDogZ2YuY29sdW1ucy5tYXAoKGMpID0+IGMubmFtZSkuam9pbihcIixcIikgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgb2JqZWt0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYWRlayA9IG9iamVrdC5nZXRTZWxlY3Rpb24oZmFsc2UsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVDb2xzKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGF0LmRhdmthLml4c19pbXApICYmICh0aGF0LmRhdmthLml4c19pbXAgIT0gXCJcIikpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmRhdmthLnN0YXZfaW1wICE9IDEwICkgeyAvLyBwcm91Y3RvdmFub1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0xfemFwaXN5ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5JbnVEYXZrYS5saXN0X1phcGlzeSh7IGZpbHRlcnM6IHsgdHlwOiB0aGF0LmRhdmthLnR5cCwgaXhzX2ltcDogdGhhdC5kYXZrYS5peHNfaW1wIH0gfSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTF96YXBpc3kgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLkludURhdmthLmxpc3RfWmFwaXN5X1Byb3VjdG92YW5lKHsgZmlsdGVyczogeyB0eXA6IHRoYXQuZGF2a2EudHlwLCBpeHNfaW1wOiB0aGF0LmRhdmthLml4c19pbXAgfSB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMX3phcGlzeSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGZpZWxkcyA9IG1haW5Gb3JtLmZpbmRGaWVsZHMoKTsgLy8gdsWhZWNobnkgcG9sw63EjWthXHJcbiAgICAgICAgICAgIC8vZmllbGRzLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5kYXZrYSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pOyBcclxuXHJcbiAgICAgICAgICAgIC8vLy8gVGxhY2l0a28gemF2cml0XHJcbiAgICAgICAgICAgIC8vdGhhdC5jb21tYW5kQmFyKFtcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0WmF2cml0XHJcblxyXG4gICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAvL10pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogIFpub3Z1bmFjdGVuaSBkYXRcclxuICAgICAgICAvLyAqIFxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIHJlbG9hZCgpIHtcclxuICAgICAgICAvLyAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8gICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAvLyAgICBpZiAodGhhdC5jbG9zZWQpIHJldHVybiBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICAvL2lmICh0aGF0LmFrY2UgPT0gR29yZGljLkludS5JbnRlcmZhY2UuR0VUeXB5U2V6bmFtdVJvY25pVXphdmVya3kuWmF2ZXJlY25lVWNldG5pWmFwaXN5KVxyXG4gICAgICAgIC8vICAgIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIEdvcmRpYy5Jc2wuSW51RGF2a2EucmVhZCh7fSlcclxuICAgICAgICAvLyAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHsgfSlcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy51Y3MsLy90aGlzLkdsb2JhbFBhcmFtcy5aa3JhdGt5Py5Oa3MsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMubmtzLC8vdGhpcy5HbG9iYWxQYXJhbXMuWmtyYXRreT8uTmtzLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnV1cywvL3RoaXMuR2xvYmFsUGFyYW1zLlprcmF0a3k/Lk5rcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUm9rKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJyb2tcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRNZXNpYyhncmlkRm9ybWF0LCB7IG5hbWU6IFwibWVzaWNcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREZW4oZ3JpZEZvcm1hdCwgeyBuYW1lOiBcImRlblwiIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZERydWhEb2tsYWR1KGdyaWRGb3JtYXQsIHsgbmFtZTogXCJkcmRcIiB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRDaXNsb0Rva2xhZHUoZ3JpZEZvcm1hdCwgeyBuYW1lOiBcImFjXCIsIGZpZWxkOiBcImFjXCIsIHdpZHRoOiAxMjAgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX3pcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE5MVwiLCAvL1JDIDMwMjUwMTkxIDogxZjDoWRla1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRTb3J0ZWRFa29DZnVTZXQodGhpcywgeyBpc0VkaXRhYmxlOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHsgICAgICAgICAgICAgICAvL01EXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc3RydWN0dXJlTGVhZDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDIzN1wiLCAvL1JDIDMwMjUwMjM3IDogTURcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7ICAgICAgICAgICAgICAgLy8gREFMXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI4NFwiLCAvL1JDIDMwMjUwMjg0IDogRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9waXNcIiwgXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAwXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuIC8vICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFBpZChncmlkRm9ybWF0LCB7IG5hbWU6IFwiaXhwXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2dyaWRGb3JtYXQuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMDI1MDE4OVwiLCAvL1JDIDMwMjUwMTg5IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgIC8vICAgIHdpZHRoOiAxNjBcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgLy9ncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcInptZW51X3Byb3ZcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTkwXCIsIC8vUkMgMzAyNTAxOTAgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAvLyAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdWxveml0KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyICRjRGl2ID0gJCh0aGlzLmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICBpZiAoJGNEaXYuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIsIHRydWUpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdmthX2FrdDogR29yZGljLkludS5JbnRlcmZhY2UuR0ludXNpbXBEdG8gPSB7fTtcclxuICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkYXZrYV9ha3QpO1xyXG4gICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcImNvbmZpcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5kYXZrYS5wb3BpcyA9IGRhdmthX2FrdC5wb3BpcztcclxuICAgICAgICAgICAgICAgIHRoYXQuZGF2a2EuemtyYXRrYSA9IGRhdmthX2FrdC56a3JhdGthO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kYXZrYS5peHNfdHlwX2RvayA9IGRhdmthX2FrdC5peHNfdHlwX2RvaztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVEYXZrYS51cGRhdGUoeyBkYXRhOiB0aGF0LmRhdmthIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdmthID0gcmVzcG9uc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0LmRhdmthLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7IFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiaW51X2ltcG9ydGRldGFpbHNhdmVcIiwgW3sgZGF0YTogcmVzcG9uc2UgfV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGxhYmVsOiBcImpyZXM6MzA0NTAwNTBcIiwgc3RhdGU6IFwic3VjY2Vzc1wiIH0pIC8vUkMgMzA0NTAwNTAgOiBJbmZvcm1hY2UgbyBkw6F2Y2UgYnlseSB1bG/FvmVueVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXN0X2Rhdmt5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXhzX2ltcFwiLCB0aGF0LmRhdmthLml4c19pbXApO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSB0ZXN0XCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuSW51RGF2a2EudGVzdCh7IHR5cDogdGhhdC5kYXZrYS50eXAsIGl4c19pbXA6IHRoYXQuZGF2a2EuaXhzX2ltcCwgcG9waXM6IHRoYXQuZGF2a2EucG9waXMsIHprcmF0a2E6IHRoYXQuZGF2a2EuemtyYXRrYSwgaXhzX3R5cF9kb2s6IHRoYXQuZGF2a2EuaXhzX3R5cF9kb2ssIHByaWxvaGE6IHRoYXQuZGF2a2EucHJpbG9oYSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRhdGEpICYmIChkYXRhLnZfZXJyX2NvZGUgPT0gMTAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVEYXZrYS5saXN0X1phcGlzeV9DaHliYSh7IGZpbHRlcnM6IHsgdHlwOiB0aGF0LmRhdmthLnR5cCwgaXhzX2ltcDogdGhhdC5kYXZrYS5peHNfaW1wIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvdXQgZGF0YV9jaHlieVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbXBvcnREYXRDaHlieVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cDogdGhhdC5kYXZrYS50eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoXCJpbnVfaW1wb3J0ZGV0YWlsc2F2ZVwiLCBbeyBkYXRhOiB0aGF0LmRhdmthIH1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5sb2FkX2Rhdmt5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcIlRlc3QgZMOhdmt5IHByb2LEm2hsIGJleiBjaHliLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvdXQgZGF0YVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCBkYXRhMSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm91Y3RvdmFuaV9kYXZreSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIml4c19pbXBcIiwgdGhhdC5kYXZrYS5peHNfaW1wKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgcHJvw7rEjXRvdsOhbsOtXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuSW51RGF2a2EucHJvdWN0b3ZhdCh7IHR5cDogdGhhdC5kYXZrYS50eXAsIGl4c19pbXA6IHRoYXQuZGF2a2EuaXhzX2ltcCB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRhdGEpICYmIChkYXRhLnZfZXJyX2NvZGUgPT0gMTAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVEYXZrYS5saXN0X1phcGlzeV9DaHliYSh7IGZpbHRlcnM6IHsgdHlwOiB0aGF0LmRhdmthLnR5cCwgaXhzX2ltcDogdGhhdC5kYXZrYS5peHNfaW1wIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvdXQgZGF0YV9jaHlieVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbXBvcnREYXRDaHlieVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cDogdGhhdC5kYXZrYS50eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkludURhdmthLnptZW5hU3RhdnUoeyBpeHNJbXA6IHRoYXQuZGF2a2EuaXhzX2ltcCEsIHN0YXZJbXA6IDEwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGF2a2EgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkY0RpdiA9ICQodGhhdC5jb250ZW50RGl2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY0Rpdi5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0LmRhdmthLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiaW51X2ltcG9ydGRldGFpbHNhdmVcIiwgW3sgZGF0YTogZGF0YSB9XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pX2RsZV9zdGF2dSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJQcm/DusSNdG92w6Fuw60gZMOhdmt5IHByb2LEm2hsbyBiZXogY2h5Yi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvdXQgZGF0YVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdWN0b3ZhbmlfZGF2a3lfYWdlbmRhKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXhzX2ltcFwiLCB0aGF0LmRhdmthLml4c19pbXApO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRyeUZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJQYXJhbWV0cnlGb3JtdWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIE0tMy05LTAgTC0zLTktMCBicmVha3MtNDAwLTMwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ09wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUGFyYW1ldHJ5Rm9ybXVsYXIjXCJcclxuICAgICAgICAgICAgICAgICAgICB9IGFzIGFueVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBjb21wbGV0ZTogZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKFwieHh4XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuZGF2a2EudHlwID09IFwiVUNUXCIpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtZXRyeUZvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiS25paGFcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC51Y3RzZGVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5faXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pbl9peHBfZGVuPXZhbHVlLml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0Lkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LklDTyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3Rpdm5pVnJmdTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIktuaWhhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIGRva2xhZHVcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zc2xzdHlwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5faXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pbl9peHNfdHlwPXZhbHVlLml4c190eXAsIG1vZGVsLmluX2t0Z190eXA9dmFsdWUua3RnX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IHR5cF9hZzogNDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJUeXAgZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN1YsWZYWRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QudWN0ZGRkZSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImluX3N1YnJhZGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaW5fc3VicmFkYT12YWx1ZS5zdWJyYWRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uSUNPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGF0Lkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJTdWLFmWFkYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1ldHJ5Rm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLbmloYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnJvenNkZW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpbl9peHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmluX2l4cF9kZW49dmFsdWUuaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uSUNPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGF0Lkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdGl2bmlWcmZ1OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiS25paGFcIixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgZG9rbGFkdVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHN0eXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpbl9peHNfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmluX2l4c190eXA9dmFsdWUuaXhzX3R5cCwgbW9kZWwuaW5fa3RnX3R5cD12YWx1ZS5rdGdfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgdHlwX2FnOiA1MCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlR5cCBkb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3VixZlhZGFcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5yb3pkZGRlKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5fc3VicmFkYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pbl9zdWJyYWRhPXZhbHVlLnN1YnJhZGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5JQ08sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uUk9LLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlN1YsWZYWRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kQmFyOiAoTWVudVBhcmFtcyB8IEdTaW1wbGVEaWFsb2dDb21tYW5kKVtdID0gW1wib2shXCIsIFwiY2FuY2VsXCJdO1xyXG4gICAgICAgICAgICBsZXQgcHJvbV92eXNsZWRlayA9IHRoYXQuZGlhbG9ncy5zaW1wbGVGb3JtKFwiUGFyYW1ldHJ5IGRva2xhZHVcIiwgcGFyYW1ldHJ5Rm9ybSwgeyB9LCB7IHdpZHRoOiA0MDAsIGhlaWdodDogNDAwLCBjb21tYW5kQmFyOiBjb21tYW5kQmFyIH0pO1xyXG4gICAgICAgICAgICBsZXQgcHJvbV92eXNsZWRla19wcm8gPSBwcm9tX3Z5c2xlZGVrLmNyZWF0ZURpYWxvZ1Byb21pc2UoIC8qXCJjbG9zZVwiKi8vKlwieWVzXCIqLy8qXCJva1wiKi8vKiwgeyBkdXZvZDogc3RyaW5nIH0qLylcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSBwcm/DusSNdG92w6Fuw61cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVEYXZrYS5wcm91Y3RvdmF0X0Rva2xhZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXA6IHRoYXQuZGF2a2EudHlwLCBpeHNfaW1wOiB0aGF0LmRhdmthLml4c19pbXAsIGluX2l4cF9kZW46IGRhdGEuaW5faXhwX2RlbiwgaW5faXhzX2Z1bjogZGF0YS5pbl9peHNfZnVuLCBpbl9peHNfc3U6IGRhdGEuaW5faXhzX3N1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5faXhzX3R5cDogZGF0YS5pbl9peHNfdHlwLCBpbl9rdGdfdHlwOiBkYXRhLmluX2t0Z190eXAsIGluX3N1YnJhZGE6IGRhdGEuaW5fc3VicmFkYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGRhdGEpICYmIChkYXRhLnZfZXJyX2NvZGUgPT0gMTAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVEYXZrYS5saXN0X1phcGlzeV9DaHliYSh7IGZpbHRlcnM6IHsgdHlwOiB0aGF0LmRhdmthLnR5cCwgaXhzX2ltcDogdGhhdC5kYXZrYS5peHNfaW1wIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvdXQgZGF0YV9jaHlieVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbXBvcnREYXRDaHlieVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cDogdGhhdC5kYXZrYS50eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVEYXZrYS56bWVuYVN0YXZ1KHsgaXhzSW1wOiB0aGF0LmRhdmthLml4c19pbXAhLCBzdGF2SW1wOiAxMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdmthID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGNEaXYgPSAkKHRoYXQuY29udGVudERpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5kYXZrYSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihcImludV9pbXBvcnRkZXRhaWxzYXZlXCIsIFt7IGRhdGE6IGRhdGEgfV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaV9kbGVfc3RhdnUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwiUHJvw7rEjXRvdsOhbsOtIGTDoXZreSBwcm9ixJtobG8gYmV6IGNoeWIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3V0IGRhdGFcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBzdG9ybm9fZGF2a3koKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiRG90YXpcIiwgXCJPcHJhdmR1IHN0b3Jub3ZhdCB2eWJyYW5vdSBkw6F2a3U/XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pXHJcbiAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXhzX2ltcFwiLCB0aGF0LmRhdmthLml4c19pbXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIHN0b3JubyBkw6F2a3lcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkludURhdmthLnptZW5hU3RhdnUoeyBpeHNJbXA6IHRoYXQuZGF2a2EuaXhzX2ltcCEsIHN0YXZJbXA6IDIwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGF2a2EgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRjRGl2ID0gJCh0aGF0LmNvbnRlbnREaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNEaXYuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5kYXZrYSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiaW51X2ltcG9ydGRldGFpbHNhdmVcIiwgW3sgZGF0YTogZGF0YSB9XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlfZGxlX3N0YXZ1KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9hZF9kYXZreSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuZmlsZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6EgbmHEjXRlbsOtIGRhdFwiKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuSW51RGF2a2EubmFjdGlfRGF2a3UoeyBycTogeyBkYXRhOiB0aGF0LmRhdmthIH0sIGZpbGVJbmZvOiB0aGF0LmZpbGUgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdmthLml4c19pbXAgPSByZXRWYWwudmFyb3Zhbmk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsLnZ5c2xlZGVrID09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkludURhdmthLnJlYWQoeyBkYXRhOiB0aGF0LmRhdmthIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdmthID0gcmVzcG9uc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGNEaXYgPSAkKHRoYXQuY29udGVudERpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjRGl2LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQuZGF2a2EsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0xfemFwaXN5ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGF0LmlzbC5JbnVEYXZrYS5saXN0X1phcGlzeSh7IGZpbHRlcnM6IHsgdHlwOiB0aGF0LmRhdmthLnR5cCwgaXhzX2ltcDogdGhhdC5kYXZrYS5peHNfaW1wIH0gfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMX3phcGlzeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZpbSBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUZXN0IS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEuZW5hYmxlZCh0aGF0Lkdsb2JhbFBhcmFtcy5QYXJhbXM/LlBvdm9sZW5pSW1wb3J0dURhdmVrISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0RG9rbGFkIS5lbmFibGVkKHRoYXQuR2xvYmFsUGFyYW1zLlBhcmFtcz8uUG92b2xlbmlJbXBvcnR1RGF2ZWshKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0b3JubyEuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRpc2shLmVuYWJsZWQodHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoXCJpbnVfaW1wb3J0ZGV0YWlsc2F2ZVwiLCBbeyBkYXRhOiByZXNwb25zZSB9XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9zb3Vib3I6IEdvcmRpYy5HZW5lcmFsLkFwcGxpY2F0aW9uSW50ZXJmYWNlLkdGaWxlSW5mb0R0byA9IHRoYXQuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhX3ByaWxvaGE6IEdvcmRpYy5XZmwuSW50ZXJmYWNlLkdBdHRhY2htZW50VXBsb2FkRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFfcHJpbG9oYS5peHMgPSB0aGF0LmRhdmthLml4c19pbXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFfcHJpbG9oYS5kZXNjcmlwdGlvbiA9IGxfc291Ym9yLmZpbGVuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhX3ByaWxvaGEuZmlsZUd1aWQgPSBsX3NvdWJvci5ndWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhX3ByaWxvaGEuZmlsZW5hbWUgPSBsX3NvdWJvci5maWxlbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YV9wcmlsb2hhLml4cCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVHlwRWxwRXB4RW51bS5PYnJhelxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuRGF2a2FQcmlsb2hhLnVwc2VydCh7IGRhdGE6IGRhdGFfcHJpbG9oYSB9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwudnlzbGVkZWsgPT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgocmV0VmFsLnZhcm92YW5pX3R4dCkgJiYgKHJldFZhbC52YXJvdmFuaV90eHQgIT09IFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KHJldFZhbC52YXJvdmFuaV90eHQhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcIkltcG9ydCBkYXQgYnlsIMO6c3DEm8WhbsSbIHByb3ZlZGVuLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcIlDFmWkgaW1wb3J0dSBkYXQgZG/FoWxvIGsgY2h5YsSbLlwiICsgXCIgLSBcIiArIHJldFZhbC52eXNsZWRla190eHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInVwbG9hZEZpbGVcIikuZ2ZpbGVmaWVsZChcImNsZWFyXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwiUMWZaSBpbXBvcnR1IGRhdCBkb8WhbG8gayBjaHlixJsuXCIgKyBcIiAtIFwiICsgcmV0VmFsLnZ5c2xlZGVrX3R4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdlbmVyYXRlUmVwb3J0KHJlcCkge1xyXG4gICAgICAgICAgICB2YXIgY250ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHZzdHVwOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51c2ltcER0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdnN0dXAgPSBjbnQuZGF2a2E7XHJcbiAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB2c3R1cDtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFzdGF2ZW5pX2RsZV9zdGF2dSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRlc3QhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0RG9rbGFkIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0b3JubyEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrIS5lbmFibGVkKGZhbHNlKTtcclxuIFxyXG4gICAgICAgICAgICAvL1x0Q0FTRSBHaW4uS29uc3QuU3Rhdl9OYWN0ZW5vLCBHaW4uS29uc3QuU3Rhdl9OYWN0ZW5vX0NoeWJhXHJcbiAgICAgICAgICAgIGlmICgodGhhdC5kYXZrYS5zdGF2X2ltcCA9PSAwKSB8fCAodGhhdC5kYXZrYS5zdGF2X2ltcCA9PSAxKSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRlc3QhLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEuZW5hYmxlZCh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlBvdm9sZW5pSW1wb3J0dURhdmVrISk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdERva2xhZCEuZW5hYmxlZCh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlBvdm9sZW5pSW1wb3J0dURhdmVrISk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRpc2shLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQ0FTRSBHaW4uS29uc3QuU3Rhdl9TdG9ybm92YW5vXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmRhdmthLnN0YXZfaW1wID09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGVzdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdERva2xhZCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9DQVNFIEdpbi5Lb25zdC5TdGF2X09kbWl0bnV0b1xyXG4gICAgICAgICAgICBpZiAodGhhdC5kYXZrYS5zdGF2X2ltcCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGVzdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdERva2xhZCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ0FTRSBHaW4uS29uc3QuU3Rhdl9Qcm91Y3RvdmFub1xyXG4gICAgICAgICAgICBpZiAodGhhdC5kYXZrYS5zdGF2X2ltcCA9PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRlc3QhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByb3VjdG92YXQhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByb3VjdG92YXREb2tsYWQhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0b3JubyEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGlzayEuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRlc3QhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByb3VjdG92YXQhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByb3VjdG92YXREb2tsYWQhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0b3JubyEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGlzayEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=