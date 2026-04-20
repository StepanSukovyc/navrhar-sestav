"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Inu.WebClient.GImportDat.js                                                        </Name>
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
            let GImportDat = class GImportDat extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.title = "Import dat";
                    this.init = true;
                    this.globals = Gordic.Inu.Globals.GInuGlobals;
                }
                onContentReady() {
                    var that = this;
                    that.title = that.model_typ == "UCT" ? "Import dat UCT" : "Import dat ROZ";
                    //nastavení breadcrumbs
                    this.setBreadcrumbs([
                        {
                            caption: that.title,
                            defaultAction: true
                        }
                    ]);
                    //nastavení akcí
                    this.actions.addRange({
                        actNova: {
                            caption: "Nová", icon: "gi-plus",
                            run: () => {
                                return that.nova_davka();
                            }
                        }
                    });
                    this.actions.addRange({
                        actDetail: {
                            caption: "Detail", //icon: "gi-plus",
                            run: () => {
                                return that.detail_davky();
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
                            enabled: (this.GlobalParams.Params?.PovoleniImportuDavek),
                            run: () => {
                                return that.prouctovani_davky();
                            }
                        }
                    });
                    this.actions.addRange({
                        actProuctovatDoklad: {
                            caption: "Proúčtovat do agendy", //icon: "gi-plus",
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
                    this.menuBar(this.actions.createBar(["actNova*", "actDetail*", "actStorno*", "actTest*", "actProuctovat*", "actProuctovatDoklad*", "actTisk*"]));
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", {
                        layoutDescriptor: "L1M1S1 LMS-0-12-0",
                    }).gformsection("create");
                    var filterFormDef = new Gordic.Forms.Form({
                        tabLabel: "jres:30250438",
                    })
                        .addSection()
                        .addField("gcheck", {
                        name: "pouzevlastni",
                        label: "Pouze vlastní",
                        initialValue: true,
                        change: function (ev, changeObj) {
                            if (changeObj) {
                                if (changeObj.value == true) {
                                    //that.$filterPanel.gfilterpanel("applyFilter");
                                }
                                else {
                                    //that.$filterPanel.gfilterpanel("applyFilter");
                                }
                            }
                        }
                    })
                        .addRow("Stav")
                        .addField("gselectbox", {
                        name: "stav",
                        model: "model.stav=value.id",
                        multi: false,
                        list: true,
                        itemWidth: "",
                        itemTemplate: "{nazev}",
                        initialValue: { nazev: "Načtené", id: 0 },
                        data: new Gordic.Data.View([
                            { nazev: "Načtené", id: 0 },
                            { nazev: "Proúčtované", id: 10 },
                            { nazev: "Stornované", id: 20 },
                            //                       { nazev: "Všechny", id: 3 }
                        ], { key: "id" })
                    });
                    this.$filterPanel = $("<div class='js-filtr'>")
                        .appendTo(this.element)
                        .gfilterpanel({
                        helperCustomizer: function (data) {
                            var polSort = data.sort(function (a, b) { return a.name >= b.name; });
                            return polSort;
                        },
                        forms: [filterFormDef],
                        //filterViewMode: defFiltru,// FilterViewMode.Detail,                 
                        //favorites: ["ixp", "ixs_typ", "vlastni_doklady"],
                        autoLoadAfterChoseFilter: true,
                        //XXXJI                    detailActionAsCheckbox: false,
                        //saveOptionsForm: "eko",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        //filterViewModeUserSettings: "Deny",
                        // filterViewMode: FilterViewMode.Simple,
                        // 20.05.2022 - TFeik
                        // Oprava filter view módů.
                        filterViewModeUserSettings: [FilterViewMode.Simple, FilterViewMode.Normal, FilterViewMode.Detail],
                        filterViewMode: FilterViewMode.Simple,
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        autoLoadAfterCreatePanel: true,
                        //userDefaultFilter: true,
                        //simpleMode: true,
                        favoriteLayoutDescriptor: "L4M3S1",
                        //filterHelperItemTemplate: "<b>{nazev}</b>",
                        //textItemTemplate: "{nazev}",
                        apply: function (event, obj) {
                            console.log("filterForm.apply", obj);
                            that.log.trace("filterForm.apply", obj);
                            //that.DataView.requestData/*<Gordic.Ucr.WebClient.GUcrTreeDoplnUdajeDto>*/(obj);
                            //that.Reload(obj.filter);
                            var in_filtr = "";
                            var filtr = obj.filter;
                            if (filtr && filtr.pouzevlastni) {
                                in_filtr = " vlastnik == '" + $.content("main").IxsFunAkt + "'";
                            }
                            else {
                                in_filtr = " 1 == 1 ";
                            }
                            if (filtr && filtr.stav >= 0) {
                                in_filtr = in_filtr + " && stav_imp == " + filtr.stav + "";
                            }
                            else {
                                in_filtr = in_filtr + " && 1 == 1 ";
                            }
                            that.view_ISL.process({
                                filterExpression: new Gordic.Data.FilterProcessor(in_filtr)
                            });
                        }
                    });
                    var sloupce = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "ixs_imp",
                        caption: "Identifikátor",
                        width: 110
                    })
                        .addTextColumn({
                        name: "stav_imp_txt",
                        caption: "Stav",
                        width: 110
                    })
                        .addTextColumn({
                        name: "popis",
                        caption: "Popis",
                        width: 150
                    })
                        .addTextColumn({
                        name: "zkratka",
                        caption: "Zkratka",
                        width: 100
                    })
                        .addTextColumn({
                        name: "zmenu_prov_nact_txt",
                        caption: "Načetl",
                        width: 250
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena_nact",
                        caption: "Načteno",
                        customClass: "dt-left",
                        width: 150
                    })
                        .addTextColumn({
                        name: "zmenu_prov_zprac_txt",
                        caption: "Zpracoval",
                        width: 250
                    })
                        .addDateTimeColumn({
                        name: "dat_zmena_zprac",
                        caption: "Zpracováno",
                        customClass: "dt-left",
                        width: 150
                    })
                        .addTextColumn({
                        name: "soubor",
                        caption: "Soubor",
                        width: 250
                    })
                        .addNumberColumn({
                        name: "kon_suma",
                        caption: "CRC",
                        width: 50
                    })
                        .addTextColumn({
                        name: "priloha",
                        caption: "Příloha ID",
                        width: 110
                    });
                    if (that.GlobalParams.Params?.RezimEvidenceDavekDokumentovy) {
                        sloupce
                            .addTextColumn({
                            name: "ixs_typ_dok_txt",
                            caption: "Typ dokumentu",
                            width: 300
                        })
                            .addTextColumn({
                            name: "ixp_dok",
                            caption: "Dokument",
                            width: 110
                        });
                    }
                    var $mainTable = $("<div class='js-SeznamDavek'>").appendTo(this.element)
                        .gautofit() //místo nastavení výšky se používá gautofit
                        .ggrid({
                        columnMode: "full",
                        searchColumns: ["popis"],
                        defaultAction: that.actions.actDetail,
                        sort: "!dat_zmena_nact",
                        selection: function (ev, o) {
                            var cnt = this;
                            var l_ixs_dvk = "";
                            var vybraneRadky = o.getSelection(); //cnt.find(".js-SeznamDokladu").ggrid("getSelection");                        // načtení přes vyhledání gridu (přes class)
                            if (vybraneRadky.length === 1) { // pokud existuje vybraný záznam
                                console.log("nahled ixs_msk", vybraneRadky[0].ixs_msk);
                                that.akt_davka = vybraneRadky[0];
                                // docasne zakazano
                                if ((that.akt_davka.ixs_imp) && (that.akt_davka.ixs_imp !== "")) {
                                    that.actions.actDetail.enabled(true);
                                    that.actions.actTest.enabled(false);
                                    that.actions.actDetail.enabled(true);
                                    that.actions.actProuctovat.enabled(false);
                                    that.actions.actProuctovatDoklad.enabled(false);
                                    that.actions.actStorno.enabled(false);
                                    that.actions.actTisk.enabled(false);
                                    that.actions.actProuctovat.visible((that.akt_davka.typ == "UCT") ?
                                        ((that.GlobalParams.Params?.ZpusobImportuDavek_Uct == 0 /* Inu.Interface.GInuDavkaCilProuctovani.Denik */) || (that.GlobalParams.Params?.ZpusobImportuDavek_Uct == 2 /* Inu.Interface.GInuDavkaCilProuctovani.DenikAgenda */)) :
                                        ((that.GlobalParams.Params?.ZpusobImportuDavek_Roz == 0 /* Inu.Interface.GInuDavkaCilProuctovani.Denik */) || (that.GlobalParams.Params?.ZpusobImportuDavek_Roz == 2 /* Inu.Interface.GInuDavkaCilProuctovani.DenikAgenda */)));
                                    that.actions.actProuctovatDoklad.visible((that.akt_davka.typ == "UCT") ?
                                        ((that.GlobalParams.Params?.ZpusobImportuDavek_Uct == 1 /* Inu.Interface.GInuDavkaCilProuctovani.Agenda */) || (that.GlobalParams.Params?.ZpusobImportuDavek_Uct == 2 /* Inu.Interface.GInuDavkaCilProuctovani.DenikAgenda */)) :
                                        ((that.GlobalParams.Params?.ZpusobImportuDavek_Roz == 1 /* Inu.Interface.GInuDavkaCilProuctovani.Agenda */) || (that.GlobalParams.Params?.ZpusobImportuDavek_Roz == 2 /* Inu.Interface.GInuDavkaCilProuctovani.DenikAgenda */)));
                                    //	CASE Gin.Konst.Stav_Nacteno, Gin.Konst.Stav_Nacteno_Chyba
                                    if ((that.akt_davka.stav_imp == 0) || (that.akt_davka.stav_imp == 1)) {
                                        that.actions.actTest.enabled(true);
                                        that.actions.actProuctovat.enabled(that.GlobalParams.Params?.PovoleniImportuDavek);
                                        that.actions.actProuctovatDoklad.enabled(that.GlobalParams.Params?.PovoleniImportuDavek);
                                        that.actions.actStorno.enabled(true);
                                        that.actions.actTisk.enabled(true);
                                    }
                                    // CASE Gin.Konst.Stav_Stornovano
                                    if (that.akt_davka.stav_imp == 20) {
                                        that.actions.actTest.enabled(false);
                                        that.actions.actProuctovat.enabled(false);
                                        that.actions.actProuctovatDoklad.enabled(false);
                                        that.actions.actStorno.enabled(false);
                                        that.actions.actTisk.enabled(false);
                                    }
                                    //CASE Gin.Konst.Stav_Odmitnuto
                                    if (that.akt_davka.stav_imp == 2) {
                                        that.actions.actTest.enabled(false);
                                        that.actions.actProuctovat.enabled(false);
                                        that.actions.actProuctovatDoklad.enabled(false);
                                        that.actions.actStorno.enabled(false);
                                        that.actions.actTisk.enabled(false);
                                    }
                                    // CASE Gin.Konst.Stav_Prouctovano
                                    if (that.akt_davka.stav_imp == 10) {
                                        that.actions.actTest.enabled(false);
                                        that.actions.actProuctovat.enabled(false);
                                        that.actions.actProuctovatDoklad.enabled(false);
                                        that.actions.actStorno.enabled(false);
                                        that.actions.actTisk.enabled(true);
                                    }
                                }
                            }
                        },
                        columns: sloupce
                    });
                    that.view_ISL = new Gordic.Isl.View(this.isl.InuDavka.list({ filters: { typ: that.model_typ } }));
                    $mainTable.ggrid("setData", that.view_ISL);
                    that.actions.actDetail.enabled(false);
                    that.actions.actTest.enabled(false);
                    that.actions.actProuctovat.enabled(false);
                    that.actions.actProuctovatDoklad.enabled(false);
                    that.actions.actStorno.enabled(false);
                    that.actions.actTisk.enabled(false);
                }
                nova_davka() {
                    var that = this;
                    that.akt_new_davka = { typ: that.model_typ };
                    var detailwindow = this.navigate("Gordic.Inu.WebClient.GImportDatDetail", {
                        Davka: that.akt_new_davka,
                        Typ: "UCT"
                    });
                    var windowContent = $.content(detailwindow);
                    windowContent.on("inu_importdetailsave", function (ctx) {
                        //debugger;
                        //that.view_ISL.updateData(ctx.data, "update");
                        var filterDto = {};
                        filterDto.ixs_imp = ctx.data.ixs_imp;
                        that.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                    });
                }
                detail_davky() {
                    var that = this;
                    var detailwindow = this.navigate("Gordic.Inu.WebClient.GImportDatDetail", {
                        Davka: this.akt_davka,
                    });
                    var windowContent = $.content(detailwindow);
                    windowContent.on("inu_importdetailsave", function (ctx) {
                        //debugger;
                        that.view_ISL.updateData(ctx.data, "update");
                    });
                }
                test_davky() {
                    var that = this;
                    var vybraneRadky = that.find(".js-SeznamDavek").ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                    if (vybraneRadky.length === 1) { // pokud existuje vybraný záznam
                        console.log("ixs_imp", vybraneRadky[0].ixs_imp);
                        that.beginOperation("Probíhá test");
                        that.isl.InuDavka.test({ typ: vybraneRadky[0].typ, ixs_imp: vybraneRadky[0].ixs_imp, popis: vybraneRadky[0].popis, zkratka: vybraneRadky[0].zkratka, ixs_typ_dok: vybraneRadky[0].ixs_typ_dok })
                            .getData()
                            .done(function (data) {
                            if ((data) && (data.v_err_code == 100)) {
                                that.isl.InuDavka.list_Zapisy_Chyba({ filters: { typ: vybraneRadky[0].typ, ixs_imp: vybraneRadky[0].ixs_imp } })
                                    .getData()
                                    .done(function (data) {
                                    console.log("out data_chyby", data);
                                    var detailwindow = that.navigate("Gordic.Inu.WebClient.GImportDatChyby", {
                                        Data: data,
                                        Typ: vybraneRadky[0].typ
                                    });
                                }).always(function () {
                                    that.endOperation();
                                });
                            }
                            else {
                                that.dialogs.alert("Test dávky proběhl bez chyb.");
                            }
                            console.log("out data", data);
                        }).always(function () {
                            that.endOperation();
                        });
                    }
                }
                prouctovani_davky() {
                    var that = this;
                    var vybraneRadky = that.find(".js-SeznamDavek").ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                    if (vybraneRadky.length === 1) { // pokud existuje vybraný záznam
                        console.log("ixs_imp", vybraneRadky[0].ixs_imp);
                        that.beginOperation("Probíhá test");
                        that.isl.InuDavka.prouctovat({ typ: vybraneRadky[0].typ, ixs_imp: vybraneRadky[0].ixs_imp })
                            .getData()
                            .done(function (data) {
                            if ((data) && (data.v_err_code == 100)) {
                                that.isl.InuDavka.list_Zapisy_Chyba({ filters: { typ: vybraneRadky[0].typ, ixs_imp: vybraneRadky[0].ixs_imp } })
                                    .getData()
                                    .done(function (data) {
                                    console.log("out data_chyby", data);
                                    var detailwindow = that.navigate("Gordic.Inu.WebClient.GImportDatChyby", {
                                        Data: data,
                                        Typ: vybraneRadky[0].typ
                                    });
                                }).always(function () {
                                    that.endOperation();
                                });
                            }
                            else {
                                that.isl.InuDavka.zmenaStavu({ ixsImp: vybraneRadky[0].ixs_imp, stavImp: 10 })
                                    .getData()
                                    .then(function (data) {
                                    var filterDto = {};
                                    filterDto.ixs_imp = vybraneRadky[0].ixs_imp;
                                    that.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
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
                }
                prouctovani_davky_agenda() {
                    var that = this;
                    var vybraneRadky = that.find(".js-SeznamDavek").ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                    if (vybraneRadky.length === 1) { // pokud existuje vybraný záznam
                        var davka = vybraneRadky[0];
                        console.log("ixs_imp", davka.ixs_imp);
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
                        if (davka.typ == "UCT") {
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
                                    typ: davka.typ, ixs_imp: davka.ixs_imp, in_ixp_den: data.in_ixp_den, in_ixs_fun: data.in_ixs_fun, in_ixs_su: data.in_ixs_su,
                                    in_ixs_typ: data.in_ixs_typ, in_ktg_typ: data.in_ktg_typ, in_subrada: data.in_subrada
                                })
                                    .getData()
                                    .done(function (data) {
                                    if ((data) && (data.v_err_code == 100)) {
                                        that.isl.InuDavka.list_Zapisy_Chyba({ filters: { typ: davka.typ, ixs_imp: davka.ixs_imp } })
                                            .getData()
                                            .done(function (data) {
                                            console.log("out data_chyby", data);
                                            var detailwindow = that.navigate("Gordic.Inu.WebClient.GImportDatChyby", {
                                                Data: data,
                                                Typ: davka.typ
                                            });
                                        }).always(function () {
                                            that.endOperation();
                                        });
                                    }
                                    else {
                                        that.isl.InuDavka.zmenaStavu({ ixsImp: davka.ixs_imp, stavImp: 10 })
                                            .getData()
                                            .then(function (data) {
                                            davka = data;
                                            var filterDto = {};
                                            filterDto.ixs_imp = davka.ixs_imp;
                                            that.view_ISL.requestData({ filters: filterDto }, { updateMode: "update" });
                                            //nastaveni_dle_stavu();
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
                }
                storno_davky() {
                    var that = this;
                    var vybraneRadky = that.find(".js-SeznamDavek").ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                    if (vybraneRadky.length === 1) { // pokud existuje vybraný záznam
                        that.dialogs.messageBox("Dotaz", "Opravdu stornovat vybranou dávku?", GDlg.mbbYesNo, GDlg.mbiQuestion)
                            .on("yes", function () {
                            console.log("ixs_imp", vybraneRadky[0].ixs_imp);
                            that.beginOperation("Probíhá storno dávky");
                            that.isl.InuDavka.zmenaStavu({ ixsImp: vybraneRadky[0].ixs_imp, stavImp: 20 })
                                .getData()
                                .then(function (data) {
                                that.view_ISL.updateData(data, "update");
                            }).always(function () {
                                that.endOperation();
                            });
                        });
                    }
                }
                generateReport(rep) {
                    var cnt = this;
                    var vstup = {};
                    vstup = cnt.akt_davka;
                    rep.customDto = vstup;
                }
            };
            GImportDat = __decorate([
                gcontent
            ], GImportDat);
            WebClient.GImportDat = GImportDat;
        })(WebClient = Inu.WebClient || (Inu.WebClient = {}));
    })(Inu = Gordic.Inu || (Gordic.Inu = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0ltcG9ydERhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdJbXBvcnREYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0VBT0U7Ozs7Ozs7QUFFRixJQUFVLE1BQU0sQ0FtckJmO0FBbnJCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FtckJuQjtJQW5yQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW1yQjdCO1FBbnJCb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVyxTQUFRLE9BQUEsWUFBWTtnQkFBNUM7O29CQUVJLFVBQUssR0FBRyxZQUFZLENBQUM7b0JBTVgsU0FBSSxHQUFHLElBQUksQ0FBQztvQkFXZCxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQTJwQnJELENBQUM7Z0JBeHBCRyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO29CQUUzRSx1QkFBdUI7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUM7d0JBQ2hCOzRCQUNJLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSzs0QkFDbkIsYUFBYSxFQUFFLElBQUk7eUJBQ3RCO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxnQkFBZ0I7b0JBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixPQUFPLEVBQUU7NEJBQ0wsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUzs0QkFDaEMsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQ0FDTixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUs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QyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0NBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUN4QixDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDLENBQUMsQ0FBQTtvQkFDVixDQUFDO2dCQUNMLENBQUM7Z0JBRUQsY0FBYyxDQUFDLEdBQUc7b0JBQ2QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUNmLElBQUksS0FBSyxHQUFxQyxFQUFFLENBQUM7b0JBRWpELEtBQUssR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO29CQUN0QixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDMUIsQ0FBQzthQUVKLENBQUE7WUE5cUJZLFVBQVU7Z0JBRHRCLFFBQVE7ZUFDSSxVQUFVLENBOHFCdEI7WUE5cUJZLG9CQUFVLGFBOHFCdEIsQ0FBQTtRQUNMLENBQUMsRUFuckJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtckI3QjtJQUFELENBQUMsRUFuckJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFtckJuQjtBQUFELENBQUMsRUFuckJTLE1BQU0sS0FBTixNQUFNLFFBbXJCZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuSW51LldlYkNsaWVudC5HSW1wb3J0RGF0LmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR1ByZXBvY3R5U3RhdnUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuSW51LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdJbXBvcnREYXQgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICB0aXRsZSA9IFwiSW1wb3J0IGRhdFwiOyBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIHZpZXdfSVNMOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkludS5JbnRlcmZhY2UuR0ludXNpbXBEdG8+O1xyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0xfemFwaXN5OiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkludS5JbnRlcmZhY2UuR0ludXNpbXBEdG8+O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBpbml0ID0gdHJ1ZTtcclxuICAgICAgICBwcm90ZWN0ZWQgbW9kZWxfdHlwOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIGFnZW5kYTogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBmb3JtOiBKUXVlcnk7XHJcbiAgICAgICAgcHJvdGVjdGVkIEZvcm1fRGF2a2E6IEdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG4gICAgICAgIHByb3RlY3RlZCBha3RfZGF2a2EgOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51c2ltcER0bztcclxuICAgICAgICBwcm90ZWN0ZWQgYWt0X25ld19kYXZrYTogR29yZGljLkludS5JbnRlcmZhY2UuR0ludXNpbXBEdG87XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBlbGVtOiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5O1xyXG5cclxuICAgICAgICBwcml2YXRlIGdsb2JhbHMgPSBHb3JkaWMuSW51Lkdsb2JhbHMuR0ludUdsb2JhbHM7XHJcbiAgICAgICAgcmVhZG9ubHkgR2xvYmFsUGFyYW1zOiBHb3JkaWMuSW51LldlYkNsaWVudC5HSW51R2xvYmFsRHRvO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IHRoYXQubW9kZWxfdHlwID09IFwiVUNUXCIgPyBcIkltcG9ydCBkYXQgVUNUXCIgOiBcIkltcG9ydCBkYXQgUk9aXCI7XHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gYnJlYWRjcnVtYnNcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIGFrY8OtXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3ROb3ZhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDoVwiLCBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubm92YV9kYXZrYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIiwgLy9pY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbF9kYXZreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0U3Rvcm5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdG9ybm9cIiwgLy9pY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc3Rvcm5vX2Rhdmt5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RUZXN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUZXN0XCIsIC8vaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnRlc3RfZGF2a3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFByb3VjdG92YXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlByb8O6xI10b3ZhdFwiLCAvL2ljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICh0aGlzLkdsb2JhbFBhcmFtcy5QYXJhbXM/LlBvdm9sZW5pSW1wb3J0dURhdmVrISksXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnByb3VjdG92YW5pX2Rhdmt5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RQcm91Y3RvdmF0RG9rbGFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQcm/DusSNdG92YXQgZG8gYWdlbmR5XCIsIC8vaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogKHRoaXMuR2xvYmFsUGFyYW1zLlBhcmFtcz8uUG92b2xlbmlJbXBvcnR1RGF2ZWshKSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQucHJvdWN0b3ZhbmlfZGF2a3lfYWdlbmRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkKEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcImludV9wdG1faW51aW1wb1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlRpc2tcIixcclxuICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkludS5XZWJDbGllbnQuR0ltcG9ydERhdERldGFpbDpDb252ZXJ0UmVwb3J0UGFyYW1zXCIsXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogKHJlcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlUmVwb3J0KHJlcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbWVudUJhcnVcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0Tm92YSpcIiwgXCJhY3REZXRhaWwqXCIsIFwiYWN0U3Rvcm5vKlwiLCBcImFjdFRlc3QqXCIsIFwiYWN0UHJvdWN0b3ZhdCpcIiwgXCJhY3RQcm91Y3RvdmF0RG9rbGFkKlwiLCBcImFjdFRpc2sqXCJdKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcInNldHVwXCIsIHtcclxuICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIixcclxuICAgICAgICAgICAgfSkuZ2Zvcm1zZWN0aW9uKFwiY3JlYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyAvKm9wZW5lZDogdHJ1ZSwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xXCIsKi9cclxuICAgICAgICAgICAgICAgIHRhYkxhYmVsOiBcImpyZXM6MzAyNTA0MzhcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIixcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvdXpldmxhc3RuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBvdXplIHZsYXN0bsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2hhbmdlT2JqLnZhbHVlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXZcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3RhdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXY9dmFsdWUuaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgbmF6ZXY6IFwiTmHEjXRlbsOpXCIsIGlkOiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJOYcSNdGVuw6lcIiwgaWQ6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiUHJvw7rEjXRvdmFuw6lcIiwgaWQ6IDEwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcIlN0b3Jub3ZhbsOpXCIsIGlkOiAyMCB9LFxyXG4gICAgIC8vICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcIlbFoWVjaG55XCIsIGlkOiAzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXSwgeyBrZXk6IFwiaWRcIiB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsID0gJChcIjxkaXYgY2xhc3M9J2pzLWZpbHRyJz5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJDdXN0b21pemVyOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9sU29ydCA9IGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5uYW1lID49IGIubmFtZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb2xTb3J0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtmaWx0ZXJGb3JtRGVmXSxcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbHRlclZpZXdNb2RlOiBkZWZGaWx0cnUsLy8gRmlsdGVyVmlld01vZGUuRGV0YWlsLCAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mYXZvcml0ZXM6IFtcIml4cFwiLCBcIml4c190eXBcIiwgXCJ2bGFzdG5pX2Rva2xhZHlcIl0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDaG9zZUZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL1hYWEpJICAgICAgICAgICAgICAgICAgICBkZXRhaWxBY3Rpb25Bc0NoZWNrYm94OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NhdmVPcHRpb25zRm9ybTogXCJla29cIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBcIkRlbnlcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDIwLjA1LjIwMjIgLSBURmVpa1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9wcmF2YSBmaWx0ZXIgdmlldyBtw7Nkxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGVVc2VyU2V0dGluZ3M6IFtGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsIEZpbHRlclZpZXdNb2RlLk5vcm1hbCwgRmlsdGVyVmlld01vZGUuRGV0YWlsXSxcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAwMS4wMy4yMDIxIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAvLyBOYWhyYXplbsOtIG9ic29sZXRlIHBhcmFtZXRyxa8uXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlckRlZmF1bHRGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzFcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbHRlckhlbHBlckl0ZW1UZW1wbGF0ZTogXCI8Yj57bmF6ZXZ9PC9iPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dEl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcImZpbHRlckZvcm0uYXBwbHlcIiwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LkRhdGFWaWV3LnJlcXVlc3REYXRhLyo8R29yZGljLlVjci5XZWJDbGllbnQuR1VjclRyZWVEb3BsblVkYWplRHRvPiovKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5SZWxvYWQob2JqLmZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbl9maWx0ciA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdHIgPSBvYmouZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ciAmJiBmaWx0ci5wb3V6ZXZsYXN0bmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluX2ZpbHRyID0gXCIgdmxhc3RuaWsgPT0gJ1wiICsgKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3QgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluX2ZpbHRyID0gXCIgMSA9PSAxIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdHIgJiYgZmlsdHIuc3RhdiA+PSAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5fZmlsdHIgPSBpbl9maWx0ciArIFwiICYmIHN0YXZfaW1wID09IFwiICsgZmlsdHIuc3RhdiArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbl9maWx0ciA9IGluX2ZpbHRyICsgXCIgJiYgMSA9PSAxIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wucHJvY2Vzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJFeHByZXNzaW9uOiBuZXcgR29yZGljLkRhdGEuRmlsdGVyUHJvY2Vzc29yKGluX2ZpbHRyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzbG91cGNlID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2ltcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSWRlbnRpZmlrw6F0b3JcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9pbXBfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6a3JhdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaa3JhdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZfbmFjdF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5hxI1ldGxcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYV9uYWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYcSNdGVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiem1lbnVfcHJvdl96cHJhY190eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpwcmFjb3ZhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hX3pwcmFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacHJhY292w6Fub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic291Ym9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTb3Vib3JcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrb25fc3VtYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQ1JDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbG9oYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZw61sb2hhIElEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0Lkdsb2JhbFBhcmFtcy5QYXJhbXM/LlJlemltRXZpZGVuY2VEYXZla0Rva3VtZW50b3Z5KSB7XHJcbiAgICAgICAgICAgICAgICBzbG91cGNlXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c190eXBfZG9rX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlR5cCBkb2t1bWVudHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEb2t1bWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciAkbWFpblRhYmxlID0gJChcIjxkaXYgY2xhc3M9J2pzLVNlem5hbURhdmVrJz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KCkgLy9tw61zdG8gbmFzdGF2ZW7DrSB2w73FoWt5IHNlIHBvdcW+w612w6EgZ2F1dG9maXRcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wicG9waXNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0OiBcIiFkYXRfem1lbmFfbmFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbF9peHNfZHZrID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2eWJyYW5lUmFka3kgPSBvLmdldFNlbGVjdGlvbigpOyAvL2NudC5maW5kKFwiLmpzLVNlem5hbURva2xhZHVcIikuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHDFmWVzIHZ5aGxlZMOhbsOtIGdyaWR1IChwxZllcyBjbGFzcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZ5YnJhbmVSYWRreS5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSB2eWJyYW7DvSB6w6F6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5haGxlZCBpeHNfbXNrXCIsIHZ5YnJhbmVSYWRreVswXS5peHNfbXNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWt0X2RhdmthID0gdnlicmFuZVJhZGt5WzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvY2FzbmUgemFrYXphbm9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHRoYXQuYWt0X2RhdmthLml4c19pbXApICYmICh0aGF0LmFrdF9kYXZrYS5peHNfaW1wICE9PSBcIlwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUZXN0IS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0IS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdERva2xhZCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0b3JubyEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRpc2shLmVuYWJsZWQoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEudmlzaWJsZSgodGhhdC5ha3RfZGF2a2EudHlwID09IFwiVUNUXCIpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCh0aGF0Lkdsb2JhbFBhcmFtcy5QYXJhbXM/LlpwdXNvYkltcG9ydHVEYXZla19VY3QgPT0gSW51LkludGVyZmFjZS5HSW51RGF2a2FDaWxQcm91Y3RvdmFuaS5EZW5paykgfHwgKHRoYXQuR2xvYmFsUGFyYW1zLlBhcmFtcz8uWnB1c29iSW1wb3J0dURhdmVrX1VjdCA9PSBJbnUuSW50ZXJmYWNlLkdJbnVEYXZrYUNpbFByb3VjdG92YW5pLkRlbmlrQWdlbmRhKSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKHRoYXQuR2xvYmFsUGFyYW1zLlBhcmFtcz8uWnB1c29iSW1wb3J0dURhdmVrX1JveiA9PSBJbnUuSW50ZXJmYWNlLkdJbnVEYXZrYUNpbFByb3VjdG92YW5pLkRlbmlrKSB8fCAodGhhdC5HbG9iYWxQYXJhbXMuUGFyYW1zPy5acHVzb2JJbXBvcnR1RGF2ZWtfUm96ID09IEludS5JbnRlcmZhY2UuR0ludURhdmthQ2lsUHJvdWN0b3ZhbmkuRGVuaWtBZ2VuZGEpKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0RG9rbGFkIS52aXNpYmxlKCh0aGF0LmFrdF9kYXZrYS50eXAgPT0gXCJVQ1RcIikgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKHRoYXQuR2xvYmFsUGFyYW1zLlBhcmFtcz8uWnB1c29iSW1wb3J0dURhdmVrX1VjdCA9PSBJbnUuSW50ZXJmYWNlLkdJbnVEYXZrYUNpbFByb3VjdG92YW5pLkFnZW5kYSkgfHwgKHRoYXQuR2xvYmFsUGFyYW1zLlBhcmFtcz8uWnB1c29iSW1wb3J0dURhdmVrX1VjdCA9PSBJbnUuSW50ZXJmYWNlLkdJbnVEYXZrYUNpbFByb3VjdG92YW5pLkRlbmlrQWdlbmRhKSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKHRoYXQuR2xvYmFsUGFyYW1zLlBhcmFtcz8uWnB1c29iSW1wb3J0dURhdmVrX1JveiA9PSBJbnUuSW50ZXJmYWNlLkdJbnVEYXZrYUNpbFByb3VjdG92YW5pLkFnZW5kYSkgfHwgKHRoYXQuR2xvYmFsUGFyYW1zLlBhcmFtcz8uWnB1c29iSW1wb3J0dURhdmVrX1JveiA9PSBJbnUuSW50ZXJmYWNlLkdJbnVEYXZrYUNpbFByb3VjdG92YW5pLkRlbmlrQWdlbmRhKSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1x0Q0FTRSBHaW4uS29uc3QuU3Rhdl9OYWN0ZW5vLCBHaW4uS29uc3QuU3Rhdl9OYWN0ZW5vX0NoeWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh0aGF0LmFrdF9kYXZrYS5zdGF2X2ltcCA9PSAwKSB8fCAodGhhdC5ha3RfZGF2a2Euc3Rhdl9pbXAgPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRlc3QhLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0IS5lbmFibGVkKHRoYXQuR2xvYmFsUGFyYW1zLlBhcmFtcz8uUG92b2xlbmlJbXBvcnR1RGF2ZWshKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByb3VjdG92YXREb2tsYWQhLmVuYWJsZWQodGhhdC5HbG9iYWxQYXJhbXMuUGFyYW1zPy5Qb3ZvbGVuaUltcG9ydHVEYXZlayEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGlzayEuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ0FTRSBHaW4uS29uc3QuU3Rhdl9TdG9ybm92YW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuYWt0X2RhdmthLnN0YXZfaW1wID09IDIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUZXN0IS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByb3VjdG92YXQhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdERva2xhZCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTdG9ybm8hLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGlzayEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NBU0UgR2luLktvbnN0LlN0YXZfT2RtaXRudXRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuYWt0X2RhdmthLnN0YXZfaW1wID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRlc3QhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0RG9rbGFkIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0b3JubyEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENBU0UgR2luLktvbnN0LlN0YXZfUHJvdWN0b3Zhbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ha3RfZGF2a2Euc3Rhdl9pbXAgPT0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRlc3QhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcm91Y3RvdmF0RG9rbGFkIS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFN0b3JubyEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrIS5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogc2xvdXBjZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuSW51RGF2a2EubGlzdCh7IGZpbHRlcnM6IHsgdHlwOiB0aGF0Lm1vZGVsX3R5cCB9IH0pKTtcclxuXHJcbiAgICAgICAgICAgICRtYWluVGFibGUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlld19JU0wpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUZXN0IS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByb3VjdG92YXQhLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJvdWN0b3ZhdERva2xhZCEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTdG9ybm8hLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VGlzayEuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub3ZhX2RhdmthKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWt0X25ld19kYXZrYSA9IHsgdHlwIDogdGhhdC5tb2RlbF90eXAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXRhaWx3aW5kb3cgPSB0aGlzLm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0ltcG9ydERhdERldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICBEYXZrYTogdGhhdC5ha3RfbmV3X2RhdmthLFxyXG4gICAgICAgICAgICAgICAgVHlwOiBcIlVDVFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoZGV0YWlsd2luZG93KTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQub24oXCJpbnVfaW1wb3J0ZGV0YWlsc2F2ZVwiLCBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEoY3R4LmRhdGEsIFwidXBkYXRlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJEdG86IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVzaW1wRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2ltcCA9IGN0eC5kYXRhLml4c19pbXA7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXRhaWxfZGF2a3koKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBkZXRhaWx3aW5kb3cgPSB0aGlzLm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0ltcG9ydERhdERldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICBEYXZrYTogdGhpcy5ha3RfZGF2a2EsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoZGV0YWlsd2luZG93KTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQub24oXCJpbnVfaW1wb3J0ZGV0YWlsc2F2ZVwiLCBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKGN0eC5kYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGVzdF9kYXZreSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdnlicmFuZVJhZGt5ID0gdGhhdC5maW5kKFwiLmpzLVNlem5hbURhdmVrXCIpLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID09PSAxKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpeHNfaW1wXCIsIHZ5YnJhbmVSYWRreVswXS5peHNfaW1wKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIHRlc3RcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuSW51RGF2a2EudGVzdCh7IHR5cDogdnlicmFuZVJhZGt5WzBdLnR5cCwgaXhzX2ltcDogdnlicmFuZVJhZGt5WzBdLml4c19pbXAsIHBvcGlzOiB2eWJyYW5lUmFka3lbMF0ucG9waXMsIHprcmF0a2E6IHZ5YnJhbmVSYWRreVswXS56a3JhdGthLCBpeHNfdHlwX2RvazogdnlicmFuZVJhZGt5WzBdLml4c190eXBfZG9rIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZGF0YSkgJiYgKGRhdGEudl9lcnJfY29kZSA9PSAxMDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVEYXZrYS5saXN0X1phcGlzeV9DaHliYSh7IGZpbHRlcnM6IHsgdHlwOiB2eWJyYW5lUmFka3lbMF0udHlwLCBpeHNfaW1wOiB2eWJyYW5lUmFka3lbMF0uaXhzX2ltcCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3V0IGRhdGFfY2h5YnlcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXRhaWx3aW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0ltcG9ydERhdENoeWJ5XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXA6IHZ5YnJhbmVSYWRreVswXS50eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwiVGVzdCBkw6F2a3kgcHJvYsSbaGwgYmV6IGNoeWIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3V0IGRhdGFcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdWN0b3ZhbmlfZGF2a3koKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHZ5YnJhbmVSYWRreSA9IHRoYXQuZmluZChcIi5qcy1TZXpuYW1EYXZla1wiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcMWZZXMgdnlobGVkw6Fuw60gZ3JpZHUgKHDFmWVzIGNsYXNzKVxyXG4gICAgICAgICAgICBpZiAodnlicmFuZVJhZGt5Lmxlbmd0aCA9PT0gMSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGV4aXN0dWplIHZ5YnJhbsO9IHrDoXpuYW1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXhzX2ltcFwiLCB2eWJyYW5lUmFka3lbMF0uaXhzX2ltcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSB0ZXN0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLkludURhdmthLnByb3VjdG92YXQoeyB0eXA6IHZ5YnJhbmVSYWRreVswXS50eXAsIGl4c19pbXA6IHZ5YnJhbmVSYWRreVswXS5peHNfaW1wIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZGF0YSkgJiYgKGRhdGEudl9lcnJfY29kZSA9PSAxMDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVEYXZrYS5saXN0X1phcGlzeV9DaHliYSh7IGZpbHRlcnM6IHsgdHlwOiB2eWJyYW5lUmFka3lbMF0udHlwLCBpeHNfaW1wOiB2eWJyYW5lUmFka3lbMF0uaXhzX2ltcCB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3V0IGRhdGFfY2h5YnlcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXRhaWx3aW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkludS5XZWJDbGllbnQuR0ltcG9ydERhdENoeWJ5XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXA6IHZ5YnJhbmVSYWRreVswXS50eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuSW51RGF2a2Euem1lbmFTdGF2dSh7IGl4c0ltcDogdnlicmFuZVJhZGt5WzBdLml4c19pbXAsIHN0YXZJbXA6IDEwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyRHRvOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51c2ltcER0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEdG8uaXhzX2ltcCA9IHZ5YnJhbmVSYWRreVswXS5peHNfaW1wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHsgZmlsdGVyczogZmlsdGVyRHRvIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwiUHJvw7rEjXRvdsOhbsOtIGTDoXZreSBwcm9ixJtobG8gYmV6IGNoeWIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm91dCBkYXRhXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3VjdG92YW5pX2Rhdmt5X2FnZW5kYSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdnlicmFuZVJhZGt5ID0gdGhhdC5maW5kKFwiLmpzLVNlem5hbURhdmVrXCIpLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID09PSAxKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdmthID0gdnlicmFuZVJhZGt5WzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpeHNfaW1wXCIsIGRhdmthLml4c19pbXApO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwYXJhbWV0cnlGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJQYXJhbWV0cnlGb3JtdWxhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBNLTMtOS0wIEwtMy05LTAgYnJlYWtzLTQwMC0zMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiUGFyYW1ldHJ5Rm9ybXVsYXIjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBhbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBjb21wbGV0ZTogZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coXCJ4eHhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF2a2EudHlwID09IFwiVUNUXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0cnlGb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLbmloYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC51Y3RzZGVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImluX2l4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmluX2l4cF9kZW49dmFsdWUuaXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5JQ08sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGF0Lkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3Rpdm5pVnJmdTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiS25paGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBkb2tsYWR1XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHN0eXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5faXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaW5faXhzX3R5cD12YWx1ZS5peHNfdHlwLCBtb2RlbC5pbl9rdGdfdHlwPXZhbHVlLmt0Z190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgdHlwX2FnOiA0MCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJUeXAgZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3VixZlhZGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QudWN0ZGRkZSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpbl9zdWJyYWRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pbl9zdWJyYWRhPXZhbHVlLnN1YnJhZGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5JQ08sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGF0Lkdsb2JhbFBhcmFtcy5Fa29QYXJhbXM/LlJPSyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlN1YsWZYWRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldHJ5Rm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiS25paGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qucm96c2RlbigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpbl9peHBfZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pbl9peHBfZGVuPXZhbHVlLml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uSUNPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWt0aXZuaVZyZnU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIktuaWhhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgZG9rbGFkdVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zc2xzdHlwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImluX2l4c190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmluX2l4c190eXA9dmFsdWUuaXhzX3R5cCwgbW9kZWwuaW5fa3RnX3R5cD12YWx1ZS5rdGdfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IHR5cF9hZzogNTAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVHlwIGRva2xhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN1YsWZYWRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnJvemRkZGUoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5fc3VicmFkYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaW5fc3VicmFkYT12YWx1ZS5zdWJyYWRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuR2xvYmFsUGFyYW1zLkVrb1BhcmFtcz8uSUNPLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5HbG9iYWxQYXJhbXMuRWtvUGFyYW1zPy5ST0ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJTdWLFmWFkYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZEJhcjogKE1lbnVQYXJhbXMgfCBHU2ltcGxlRGlhbG9nQ29tbWFuZClbXSA9IFtcIm9rIVwiLCBcImNhbmNlbFwiXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9tX3Z5c2xlZGVrID0gdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJQYXJhbWV0cnkgZG9rbGFkdVwiLCBwYXJhbWV0cnlGb3JtLCB7fSwgeyB3aWR0aDogNDAwLCBoZWlnaHQ6IDQwMCwgY29tbWFuZEJhcjogY29tbWFuZEJhciB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9tX3Z5c2xlZGVrX3BybyA9IHByb21fdnlzbGVkZWsuY3JlYXRlRGlhbG9nUHJvbWlzZSggLypcImNsb3NlXCIqLy8qXCJ5ZXNcIiovLypcIm9rXCIqLy8qLCB7IGR1dm9kOiBzdHJpbmcgfSovKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIHByb8O6xI10b3bDoW7DrVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVEYXZrYS5wcm91Y3RvdmF0X0Rva2xhZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwOiBkYXZrYS50eXAsIGl4c19pbXA6IGRhdmthLml4c19pbXAsIGluX2l4cF9kZW46IGRhdGEuaW5faXhwX2RlbiwgaW5faXhzX2Z1bjogZGF0YS5pbl9peHNfZnVuLCBpbl9peHNfc3U6IGRhdGEuaW5faXhzX3N1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluX2l4c190eXA6IGRhdGEuaW5faXhzX3R5cCwgaW5fa3RnX3R5cDogZGF0YS5pbl9rdGdfdHlwLCBpbl9zdWJyYWRhOiBkYXRhLmluX3N1YnJhZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZGF0YSkgJiYgKGRhdGEudl9lcnJfY29kZSA9PSAxMDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5JbnVEYXZrYS5saXN0X1phcGlzeV9DaHliYSh7IGZpbHRlcnM6IHsgdHlwOiBkYXZrYS50eXAsIGl4c19pbXA6IGRhdmthLml4c19pbXAgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm91dCBkYXRhX2NoeWJ5XCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGV0YWlsd2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5JbnUuV2ViQ2xpZW50LkdJbXBvcnREYXRDaHlieVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwOiBkYXZrYS50eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuSW51RGF2a2Euem1lbmFTdGF2dSh7IGl4c0ltcDogZGF2a2EuaXhzX2ltcCEsIHN0YXZJbXA6IDEwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdmthID0gZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJEdG86IEdvcmRpYy5JbnUuSW50ZXJmYWNlLkdJbnVzaW1wRHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckR0by5peHNfaW1wID0gZGF2a2EuaXhzX2ltcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7IGZpbHRlcnM6IGZpbHRlckR0byB9LCB7IHVwZGF0ZU1vZGU6IFwidXBkYXRlXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hc3RhdmVuaV9kbGVfc3RhdnUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwiUHJvw7rEjXRvdsOhbsOtIGTDoXZreSBwcm9ixJtobG8gYmV6IGNoeWIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3V0IGRhdGFcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHN0b3Jub19kYXZreSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdnlicmFuZVJhZGt5ID0gdGhhdC5maW5kKFwiLmpzLVNlem5hbURhdmVrXCIpLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID09PSAxKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJEb3RhelwiLCBcIk9wcmF2ZHUgc3Rvcm5vdmF0IHZ5YnJhbm91IGTDoXZrdT9cIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml4c19pbXBcIiwgdnlicmFuZVJhZGt5WzBdLml4c19pbXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSBzdG9ybm8gZMOhdmt5XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuSW51RGF2a2Euem1lbmFTdGF2dSh7IGl4c0ltcDogdnlicmFuZVJhZGt5WzBdLml4c19pbXAsIHN0YXZJbXA6IDIwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wudXBkYXRlRGF0YShkYXRhLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdlbmVyYXRlUmVwb3J0KHJlcCkge1xyXG4gICAgICAgICAgICB2YXIgY250ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHZzdHVwOiBHb3JkaWMuSW51LkludGVyZmFjZS5HSW51c2ltcER0byA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdnN0dXAgPSBjbnQuYWt0X2RhdmthO1xyXG4gICAgICAgICAgICByZXAuY3VzdG9tRHRvID0gdnN0dXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdfQ==