"use strict";
/*!//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ada.WebClient.GSeznamPripravaZpracovani.js                                                        </Name>
//    <Description> GAkceUct                                                                                  </Description>
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
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GSeznamPripravaZpracovani = class GSeznamPripravaZpracovani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.model_filtr = { role: 0, stav_az: 0 };
                    this.title = "Příprava plánu - Předání ke zpracování";
                    this.taskId = "actSeznamPripravaZpracovani"; // označení položky v taskListu
                }
                onContentReady() {
                    var that = this;
                    var $tab = $(this.contentDiv);
                    $tab.empty();
                    var cnt = this;
                    if (that.RezimVlastni == true) {
                        this.title = "Příprava plánu - Úpravy položek plánu ve vlastnictví: " + this.RezimVlastniFunNazev;
                    }
                    var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");
                    this.actions.addRange({
                        actPredat: {
                            caption: "Upravit",
                            tooltip: "Upravit",
                            icon: "gi-pencil",
                            enabled: that.globals.Param_Akce_Predat == 1 /* Interface.TypPredatPrevzitAkceEnum.Ano */,
                            run: function (ev, ctx) {
                                var vybraneRadky = that.find(".js-SeznamDokladuPripravaGenerovani").ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                                if (vybraneRadky.length > 0) { // existuje vybraný řádek
                                    that.upravitAkci(vybraneRadky); // hromadná operace - STORNO
                                }
                            }
                        }
                    });
                    this.actions.addRange({
                        actSchvalit: {
                            caption: "Schválit",
                            icon: "gi-pencil",
                            primary: true,
                            run: () => {
                                var vybraneRadky = that.find(".js-SeznamDokladuPripravaGenerovani").ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                                if (vybraneRadky.length > 0) { // existuje vybraný řádek
                                    that.schvalitAkci(vybraneRadky); // hromadná operace - STORNO
                                }
                            }
                        }
                    });
                    this.actions.addRange({
                        actZaplanovat: {
                            caption: "Zaplánovat",
                            icon: "gi-pencil",
                            primary: true,
                            run: () => {
                                var vybraneRadky = that.find(".js-SeznamDokladuPripravaGenerovani").ggrid("getSelection"); // načtení přes vyhledání gridu (přes class)
                                if (vybraneRadky.length > 0) { // existuje vybraný řádek
                                    that.zaplanovatAkci(vybraneRadky); // hromadná operace - STORNO
                                }
                            }
                        }
                    });
                    this.actions.addRange({
                        actGridDoubleClick: {
                            run: function (ev, ctx) {
                                return null;
                            }
                        }
                    });
                    this.actions.addRange({
                        actOdstranitOznacene: {
                            caption: "Odstranit vybrané",
                            icon: "fa-trash",
                            primary: true,
                            run: () => {
                                return cnt.odstranit_oznacene();
                            }
                        }
                    });
                    this.actions.addRange({
                        actOdstranitVse: {
                            caption: "Odstranit vše",
                            icon: "fa-trash",
                            primary: true,
                            run: () => {
                                return cnt.odstranit_vse();
                            }
                        }
                    });
                    //nastavení menuBaru
                    this.menuBar(this.actions.createBar(["actPredat*", "actSchvalit*", "actZaplanovat*", "actOdstranitVse*", "actOdstranitOznacene*"]));
                    //var filterFormDef = new Gordic.Forms.Form({ tabLabel: "Kompletní filtr", layoutDescriptor: "w-L-9 w-M-9 w-S-12" })
                    //    .addSection();
                    //filterFormDef
                    //    .addField("gselectbox", {
                    //        name: "role",
                    //        model: "model.role=value.id",
                    //        multi: false,
                    //        list: true,
                    //        initialValue: { id: 0 },
                    //        itemWidth: "",
                    //        itemTemplate: "{nazev}",
                    //        change: function (ev, obj) {
                    //            if (obj.flags.noChange) return;
                    //            var akt_role_i = 0
                    //            var init_value_i = 0;
                    //            akt_role_i = obj.value?.id ?? 0;
                    //            var pole_serverFiltr_i = new Array();
                    //            if (akt_role_i == 0) {
                    //                pole_serverFiltr_i = [0, 2, 3, 1];
                    //                init_value_i = 0;
                    //            }
                    //            if (akt_role_i == 1) {
                    //                pole_serverFiltr_i = [2, 3, 1];
                    //                init_value_i = 2;
                    //            }
                    //            if (akt_role_i == 2) {
                    //                pole_serverFiltr_i = [0,2];
                    //                init_value_i = 2;
                    //            }
                    //            $(this).gform().findFields("stav_az_f").gfield("option", "serverFilters", { stav_az: pole_serverFiltr_i });
                    //            $(this).gform().findFields("stav_az_f").gfield("setValue", { stav_az: init_value_i }, {valid : false});
                    //            //// automatické načtení po změně hodnoty
                    //            //let dto = {};
                    //            //that.filterForm!.findFields().gfield("model", "collect", dto);
                    //            //that.filterForm!.gfilterpanel("applyFilter", dto);
                    //        },
                    //        data:
                    //            new Gordic.Data.View([
                    //                { nazev: "Zpracovatel", id: 0 },
                    //                { nazev: "Kompetent", id: 1 },
                    //                { nazev: "Finanční kompetent AZ", id: 2 }
                    //            ], { key: "id" })
                    //    });
                    //filterFormDef
                    //    .addField("gselectbox", Gordic.Prefabs.Select.srvcsaz(), {
                    //        name: "stav_az_f", model: "model.stav_az=value.stav_az", multi: false, list: true, itemWidth: "", disabled: false, initialValue: { stav_az: 0 }, 
                    //        change: function (ev, obj) {
                    //            // automatické načtení po změně hodnoty
                    //            if (obj.flags.isKontrolniDiv || obj.flags.noChange) return;
                    //            let dto = {};
                    //            that.filterForm!.findFields().gfield("model", "collect", dto);
                    //            that.filterForm!.gfilterpanel("applyFilter", dto);
                    //        },
                    //    });
                    //that.filterForm = $("<div>").appendTo(mainForm)
                    //    .gfilterpanel({
                    //        // default pro EKO
                    //        filterViewModeUserSettings: [FilterViewMode.Simple],
                    //        filterViewMode: FilterViewMode.Simple,
                    //        //poOtevreniOtevritPanelPodminek: false,     // default pro uživatelské nastavení
                    //        poVyhledaniZobrazit: "VyhledanePodminkyVBadge",
                    //        autoLoadAfterChoseFilter: false,        // Automatické vyhledání po změně uloženého
                    //        clearFilterButtonVisible: "NeverVisible",
                    //        detailActionAsCheckbox: false,
                    //        //idSimpleMode:"idSimpleMode",
                    //        forms: [filterFormDef],
                    //        // TODO: bude nějaké lepší ukládací okno nebo budu muset udělat svoje a nastavit ho do saveOptionsForm?
                    //        favorites: ["role", "stav_az"],
                    //        favoriteLayoutDescriptor: "L4M3S1",
                    //        // TODO: zůstane tohle téma nebo bude pro LK jiné než pro TK?
                    //        tema: "ada_ptm_adabas2",
                    //        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                    //        saveOptionsForm: "eko",
                    //        // strictStopAutoLoad: true,               // Striktně zakáže automatické načtení hned po otevření seznamu, oblíbený filtr se pouze předplní.
                    //        // textItemTemplate: "{description}",
                    //        apply: function (event, obj) {
                    //            // načtení dat podle filtrů
                    //            that.model_filtr = obj.filter;
                    //        }
                    //    });
                    cnt.gridFormatSeznam = new Gordic.Data.GridFormat();
                    Gordic.Eko.Grid.Column.addVlastnictvi(cnt.gridFormatSeznam);
                    cnt.gridFormatSeznam.addIconColumn({
                        name: "aktivita",
                        field: "aktivita",
                        caption: "Stav",
                        //hidden: this.globals.Param_Akce_AutSchv == Interface.TypAutomatSchvaleniNovaAkceEnum.NeSprocesem,
                        // width: 25,
                        formatPreset: Gordic.Global.Enums.GridColumnFormatIcon.icon,
                        iconTemplate: function (data) {
                            switch (data.aktivita) {
                                case 300 /* Interface.AktivitaAkceEnum.Navrh */: return { icon: "fa-check-circle-o g-state-success g-state-text", text: "Schváleno", caption: "Schváleno", tooltip: "Schváleno" };
                                case 100 /* Interface.AktivitaAkceEnum.Aktivni */: return { icon: "fa-check-circle g-state-warning g-state-text", text: "Návrh", caption: "Návrh", tooltip: "Návrh" };
                                case 500 /* Interface.AktivitaAkceEnum.Neaktivni */: return { icon: "fa-trash g-state-error g-state-text", text: "Neaktivní", caption: "Neaktivní", tooltip: "Neaktivní" };
                                case 500 /* Interface.AktivitaAkceEnum.Zrusena */: return { icon: "fa-trash g-state-error g-state-text", text: "Stornovaná", caption: "Stornovaná", tooltip: "Stornovaná" };
                                default: return null;
                            }
                        }
                    });
                    cnt.gridFormatSeznam
                        .addTextColumn({
                        name: "cislo",
                        caption: cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Číslo pol. plánu" : "Číslo akce",
                        customClass: "dt-left",
                        width: 140
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Název pol. plánu" : "Název akce",
                        customClass: "dt-left",
                        width: 300,
                    });
                    cnt.gridFormatSeznam.addTextColumn({
                        name: "ixs_pla_txt",
                        caption: "Kniha",
                        customClass: "dt-left",
                        width: 200,
                    });
                    cnt.gridFormatSeznam.addTextColumn({
                        name: "ixs_fun_akt_nazev",
                        caption: "Zpracovatel",
                        customClass: "dt-left",
                        width: 200,
                    });
                    cnt.gridFormatSeznam
                        .addTextColumn({
                        name: "nks",
                        caption: cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "ČPP" : this.globals.Titulek_Nks,
                        customClass: "dt-left",
                        width: 80 //,
                    })
                        .addTextColumn({
                        name: "t_nks",
                        caption: cnt.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "Název ČPP" : "Název " + this.globals.Titulek_Nks,
                        customClass: "dt-left",
                        width: 100 //,
                    });
                    cnt.gridFormatSeznam
                        .addDateTimeColumn({
                        name: "dat_zmena",
                        searchFields: ["*datum_zmeny_filtrace"],
                        caption: "Datum poslední změny",
                        customClass: "dt-left",
                        width: 140,
                    })
                        .addTextColumn({
                        name: "zmenu_prov_txt",
                        caption: "Poslední změnu provedl",
                        customClass: "dt-left",
                        width: 200 //,
                    })
                        .addDateColumn({
                        name: "datum_zmeny_filtrace",
                        caption: "Datum změny filtrace",
                        customClass: "dt-left",
                        hidden: true,
                        width: 140
                    })
                        .addNumberColumn({
                        name: "fin_od",
                        field: "fin_od",
                        caption: "Fin. od",
                        width: 50
                    })
                        .addNumberColumn({
                        name: "fin_do",
                        field: "fin_do",
                        caption: "Fin. do",
                        width: 50
                    })
                        .addNumberColumn({
                        name: "real_od",
                        field: "real_od",
                        caption: "Real. od",
                        width: 50
                    })
                        .addNumberColumn({
                        name: "real_do",
                        field: "real_do",
                        caption: "Real. do",
                        width: 50
                    });
                    cnt.mainTable = $("<div class='js-SeznamDokladuPripravaGenerovani'>")
                        //.css("height", "100%")
                        .appendTo(mainForm)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        multi: true,
                        cellActivate(ev, ctx) {
                            that.row = cnt.mainTable.ggrid("activeRow");
                            if (that.row !== null) {
                                that.element.trigger("adasubgridrowselected", { agenda: 40, data: that.row });
                            }
                        },
                        defaultAction: cnt.actions.actGridDoubleClick,
                        //defaultAction: new GAction({
                        //    name: "gridRowSelectedAct",
                        //    run(ev, ctx) {
                        //        that.row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                        //     }
                        //}),
                        searchColumns: Gordic.Ada.WebClient.AdaFunction.zjisti_sloupce_search(cnt.gridFormatSeznam),
                        columns: cnt.gridFormatSeznam,
                        defaultProfile: {
                            columnList: cnt.zjisti_sloupce(cnt.gridFormatSeznam)
                        },
                        profiles: [
                            { name: "Úplný", columnList: this.zjisti_sloupce(cnt.gridFormatSeznam), _locked: true } //gridFormatSeznam.columns.filter((c) => c.name != "kniha").join() },
                        ],
                    });
                    that.beginOperation("generuji z BAR");
                    if (that.RezimVlastni == true) {
                        that.view_ISL = new Gordic.Isl.View(this.isl.AkcePriprava.list({ filters: { rok: this.gpc.rok, ico: this.gpc.ico, ixs_fun_akt: that.RezimVlastniFun }, fragments: ["Permissions", "*"] }));
                    }
                    else {
                        that.view_ISL = new Gordic.Isl.View(this.isl.AkcePriprava.list({ filters: { rok: this.gpc.rok, ico: this.gpc.ico }, fragments: ["Permissions", "*"] }));
                    }
                    that.mainTable.ggrid("setData", that.view_ISL);
                    that.endOperation();
                }
                zjisti_sloupce(gf) {
                    return gf.columns.filter(e => e.hidden != true).map(e => e.name).join(',');
                }
                uloz_akce() {
                    var that = this;
                    var radky = that.view_ISL.getDataRows(false); // řádky v gridu v průvodci, všechny
                    let defClose = $.Deferred();
                    var actualAction;
                    actualAction = this.actions.actUlozit;
                    actualAction.setPending(0);
                    that.beginOperation("Probíhá uložení dat");
                    var serviceContent = this.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                    serviceContent
                        .call("UlozitPripravaAkce", {
                        doklady: radky
                    }).then((result) => {
                        if (result.result.length >= 1) {
                            if (result.result[0].kind != 400) {
                                that.view_ISL.requestData({}, { updateMode: "reset" });
                                defClose.resolve();
                            }
                            else {
                                // operace nedopadla
                                defClose.reject(result.result[0].errors[0].message);
                            }
                        }
                        else {
                            // operace nedopadla
                            defClose.reject();
                        }
                    }).fail(function () {
                        // operace nedopadla
                        defClose.reject();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    actualAction.setPending(defClose);
                    return defClose.promise();
                }
                odstranit_oznacene() {
                    var that = this;
                    var radky = that.find(".js-SeznamDokladuPripravaGenerovani").ggrid("getSelection");
                    if (radky.length >= 1) { // pokud existuje vybraný záznam
                    }
                    let defClose = $.Deferred();
                    var actualAction;
                    actualAction = this.actions.actOdstranitOznacene;
                    // actualAction.setPending(0);
                    that.beginOperation("Probíhá odstranění dat");
                    var serviceContent = this.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                    serviceContent
                        .call("PripravaAkceOdstranit", {
                        doklady: radky
                    }).then((result) => {
                        if (result.result.length >= 1) {
                            if (result.result[0].kind != 400) {
                                that.view_ISL.updateData(radky, "delete");
                                defClose.resolve();
                            }
                            else {
                                // operace nedopadla
                                defClose.reject(result.result[0].errors[0].message);
                            }
                        }
                        else {
                            // operace nedopadla
                            defClose.reject();
                        }
                    }).fail(function () {
                        // operace nedopadla
                        defClose.reject();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    actualAction.setPending(defClose);
                    return defClose.promise();
                }
                odstranit_vse() {
                    var that = this;
                    let defClose = $.Deferred();
                    var radky = that.find(".js-SeznamDokladuPripravaGenerovani").ggrid("getSelection");
                    var actualAction;
                    actualAction = this.actions.actOdstranitVse;
                    //actualAction.setPending(0);
                    that.beginOperation("Probíhá odstranění dat");
                    var serviceContent = this.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                    //           var aa = that.isl.AkcePriprava.delete_All().get().then(function (result) { result.result.kin})
                    serviceContent
                        .call("PripravaAkceOdstranitVse", {
                        doklady: radky,
                        rezim: that.RezimVlastni
                    }).then((result) => {
                        // if (result.result.length >= 1) {
                        if (result.result.kind != 400) {
                            that.view_ISL.updateData([], "reset");
                            defClose.resolve();
                        }
                        else {
                            // operace nedopadla
                            defClose.reject(result.result.errors.message);
                        }
                        //}
                        //else {
                        //    // operace nedopadla
                        //    defClose.reject();
                        //}
                    }).fail(function () {
                        // operace nedopadla
                        defClose.reject();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    actualAction.setPending(defClose);
                    return defClose.promise();
                }
                upravitAkci(vybraneRadky) {
                    var that = this;
                    var modelDataFirst = {
                        ixs_pla: "",
                        ixs_fun_akt: "",
                        nks: "",
                        t_nks: "",
                        cis_real: "",
                        ixs_fun_zad: "",
                        adresa1: "",
                        adresa2: "",
                        psc: "",
                        adresa3: "",
                        fin_od: 0,
                        fin_do: 0,
                        real_od: 0,
                        real_do: 0
                    }; // použitá proměnná pro přenos mezi kroky
                    var l_oForm = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1, L-2-8-2, M-2-8-2, S-12-12-0" })
                        .addSection("Cíl evidence")
                        .addRow("Kniha").addField("gselectbox", Gordic.Prefabs.Select.srvspla(), {
                        disabled: false, // vždy přístupné
                        name: "ixs_pla", // název položky
                        strict: true,
                        //flag: "required",                                                                                               // příznak reguired
                        serverFilters: {
                            ico: this.gpc.ico,
                            rok: this.gpc.rok,
                            //no_ixs_pla: that.ixp_den
                            // ixs_pla: "!=" + that.ixp_den
                            //norok: this.serverContext.rok,
                            //pouzeAktObd: new Gordic.Forms.Dependency("pouzeAktObd", "", true),
                        },
                        model: "model.ixs_pla=value.ixs_pla, model.rok=value.rok", // návratová hodnota pouze ixp_den
                        //validators: [new Gordic.Validators.Required()],                               // validátor - pole musí být vyplněné
                        change: function (ev, ctx) {
                            var pole = $(ev.currentTarget).gform().findFields("ixs_fun_akt");
                            if ((ctx.value != null) && (ctx.value.ixs_pla != "")) {
                                pole.gfield("option", "disabled", false);
                                let FiltryZpracovatel = {
                                    //typ_ag: 250,                                                                                    // filtr na agendu
                                    //ico: that.serverContext.ico,                                                                                 // filtr na IČ
                                    //ucs: that.serverContext.ucs,                                                                                 // filtr na UCS
                                    //aktivita: 100,                                                                                                      // filtr na aktivitu
                                    //ixp_den: "!= " + that.ixp_den,                                                                           // bez knihy, kde jsem přihlášený
                                    //DlePovolenychFazi: "GWAADA01",                                                                                      // subjekty pro danou fázi
                                    VrfuIxpDen: ctx.value.ixs_pla, // filtr dle přístupu ke knize
                                    VrfuAktivita: 100 // aktivní subjekty
                                };
                                //debugger;
                                pole.gfield("option", "serverFilters", FiltryZpracovatel);
                            }
                            else {
                                pole.gfield("clear", {});
                                pole.gfield("option", "disabled", true);
                            }
                        }
                    })
                        .addRow({ label: "Zpracovatel", hint: "Zpracovatel" }).addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        disabled: true, // vždy přístupné
                        dropdown: false, // políčko jako tři tečky
                        name: "ixs_fun_akt", // název položky
                        model: "model.ixs_fun_akt=value.ixs_fun", // návratová hodnota pouze ixs_fun
                        tooltip: "Zpracovatel", // RC 23352028 : Nový zpracovatel
                        //validators: [new Gordic.Validators.Required()],                                                                 // validátor - pole musí být vyplněné
                        serverFilters: {}, // počáteční filtry subjektu
                        change: function (ev, ctx) {
                        }
                    })
                        .addRow({ label: "" });
                    l_oForm.addSection("Hodnoty");
                    if (Gordic.Ada.Globals.GAdaGlobals.TypZpOrgan == 0) {
                        l_oForm
                            .addRow(that.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */ ? "ČPP" : that.globals.Titulek_Nks).addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), { name: "nks", model: "ico=>ico; nks=nks;t_nks=nazev", modelDefaults: { ico: this.gpc.ico }, serverFilters: { ico: this.gpc.ico } });
                    }
                    else {
                        l_oForm
                            .addRow("Organizace").addField("gselectbox", Gordic.Prefabs.Select.ekosrarADA(), { name: "nks", model: "nks=ico; nks=nks;t_nks=nazev" });
                    }
                    l_oForm
                        .addRow("Realizátor").addField("gselectbox", Gordic.Prefabs.Select.ekosrea(), {
                        name: "cis_real",
                        model: "model.ico=>value.ico, model.cis_real=value.cis_real;cis_real_txt=nazev",
                        serverFilters: { ico: this.gpc.ico },
                        modelDefaults: { ico: this.gpc.ico },
                        dropdown: false,
                        change: function (ev, changeObj) {
                            if (that.globals.BAR_Typ_Inst == 10 /* Interface.SrvTypIntalaceEnum.MO */) {
                                var form = $(this).closest(".gform");
                                form.findFields("ixs_fun_zad").gfield("clear", {});
                                if (changeObj.value) {
                                    var my_serverFilter = {
                                        aktivita: [100],
                                        priz_zad: 1,
                                        ico: that.gpc.ico,
                                        cis_real: changeObj.value.cis_real
                                    };
                                    form.findFields("ixs_fun_zad").gfield("option", "serverFilters", my_serverFilter);
                                    if ((changeObj.value != null) && (changeObj.value.cis_real != "")) {
                                        form.findFields("ixs_fun_zad").gfield("option", "disabled", false);
                                    }
                                    else {
                                        form.findFields("ixs_fun_zad").gfield("option", "disabled", true);
                                    }
                                }
                                else {
                                    form.findFields("ixs_fun_zad").gfield("option", "disabled", true);
                                }
                            }
                        }
                    });
                    l_oForm
                        .addRow("Zadavatel").addField("gselectbox", Gordic.Prefabs.Select.zadavetel(), {
                        name: "ixs_fun_zad", model: "model.ico=>value.ico,model.ixs_fun_zad=value.ixs_fun", dropdown: false, disabled: true,
                        serverFilters: {
                            aktivita: [100],
                            priz_zad: 1,
                            ico: that.gpc.ico,
                            cis_real: ""
                        },
                    });
                    l_oForm
                        .addRow("");
                    l_oForm
                        .addRow("Adresa").addField("gstringbox", { name: "adresa1" })
                        .addRow("").addField("gstringbox", { name: "adresa2" })
                        .addRow("").addField("gselectbox", "w-4", Gordic.Prefabs.Select.ginspsc(), {
                        name: "psc",
                        strict: false,
                        itemTemplate: "{psc}",
                        helperItemTemplate: "{psc} - {posta}",
                        invalidTransform: function (strValue) {
                            if ((typeof strValue === "string")) {
                                return { psc: strValue, stat: 42 }; // vratime data ve formatu v jakem je policko zvykle
                            }
                            return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                        },
                        model: "psc=psc",
                        modelOptions: { initialValues: true }, // nevyvolá se change při model apply
                        serverFilters: { stat: 42 },
                        change: function (ev, changeObj) {
                            if (changeObj.value && changeObj.value.psc) {
                                $(ev.currentTarget).gform().findFields("adresa3").gfield("setValue", changeObj.value.posta);
                            }
                        },
                    }) //ginspsc 
                        .addField("gstringbox", "w-4", { name: "adresa3" });
                    l_oForm
                        .addSection("Období")
                        .addPrefab(Gordic.Gin.Prefabs.interval({ label: "Financování od-do", name: "interval_fin", type: "rok" }))
                        .addPrefab(Gordic.Gin.Prefabs.interval({ label: "Realizace od-do", name: "interval_real", type: "rok" }));
                    var confirmQuestion = ""; // promenna na prenos mezi kroky
                    that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "wiz_preevidence_akce",
                        keys: that.view_ISL.keys, // klic
                        gridFormat: new Gordic.Data.GridFormat().add(that.find(".js-SeznamDokladuPripravaGenerovani").ggrid("option", "columns") || []), //gridformat
                        title: "Hromadná evidence akcí", // titulek
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                            return serviceContent
                                .call("LzePripravaEvidenceAkce", {
                                doklady: data, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                data: {}
                            }).then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            form: l_oForm, // prefab formu
                            gridTabTitle: "Záznamy ke zpracování", // popisek tabu
                            showIndicator: true, //priznak, zda zobrazit kpi panel
                            title: "Evidence",
                            fieldChangeDelegate: function (ev, obj) {
                                //Gordic.Eko.Components.runCheckAction(ev.target, this, obj.wizardModel);
                            },
                            //description: "Kopie akcí", // popisek
                            modelData: modelDataFirst,
                            nextActionName: "Evidovat",
                            checkAction: (model, input) => {
                                model = modelDataFirst;
                                var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                                return serviceContent
                                    .call("LzePripravaEvidenceAkce", {
                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                    data: model
                                }).then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            nextAction: (model, input) => {
                                modelDataFirst = model;
                                modelDataFirst.fin_od = model.interval_fin.start;
                                modelDataFirst.fin_do = model.interval_fin.end;
                                modelDataFirst.real_od = model.interval_real.start;
                                modelDataFirst.real_do = model.interval_real.end;
                                var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                                return serviceContent
                                    .call("PripravaEvidenceAkce", {
                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                    data: model
                                }).then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                        },
                        lastStep: // posledni krok
                        {
                            // fáze 2 - zobrazení výsledku storna
                            title: "Výsledek",
                            gridTabTitle: "Zpracované záznamy",
                            form: l_oForm,
                            modelData: () => {
                                return {
                                    ixs_pla: modelDataFirst.ixs_pla,
                                    ixs_fun_akt: modelDataFirst.ixs_fun_akt,
                                    nks: modelDataFirst.nks,
                                    t_nks: modelDataFirst.t_nks,
                                    cis_real: modelDataFirst.cis_real,
                                    ixs_fun_zad: modelDataFirst.ixs_fun_zad,
                                    adresa1: modelDataFirst.adresa1,
                                    adresa2: modelDataFirst.adresa2,
                                    psc: modelDataFirst.psc,
                                    adresa3: modelDataFirst.adresa3,
                                    interval_fin: { start: modelDataFirst.fin_od, end: modelDataFirst.fin_do },
                                    interval_real: { start: modelDataFirst.real_od, end: modelDataFirst.real_od },
                                    real_od: modelDataFirst.real_od,
                                    real_do: modelDataFirst.real_do
                                };
                            },
                        },
                        data: vybraneRadky, // data
                        completeDelegate: (view) => {
                            //debugger;
                            //that.view_ISL.requestData({}, { updateMode: "update" });
                            that.view_ISL.requestData({});
                        },
                    }, { title: "Přeevidence akcí" });
                }
                schvalitAkci(vybraneRadky) {
                    var that = this;
                    var confirmQuestion = ""; // promenna na prenos mezi kroky
                    that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "wiz_schvaleni_akce",
                        keys: that.view_ISL.keys, // klic
                        gridFormat: new Gordic.Data.GridFormat().add(that.find(".js-SeznamDokladuPripravaGenerovani").ggrid("option", "columns") || []), //gridformat
                        title: "Hromadné schválení akcí", // titulek
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                            return serviceContent
                                .call("LzePripravaSchvaleniAkce", {
                                doklady: data, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                data: {}
                            }).then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            form: undefined, // prefab formu
                            gridTabTitle: "Záznamy ke zpracování", // popisek tabu
                            showIndicator: true, //priznak, zda zobrazit kpi panel
                            title: "Schválení",
                            fieldChangeDelegate: function (ev, obj) {
                                //Gordic.Eko.Components.runCheckAction(ev.target, this, obj.wizardModel);
                            },
                            //description: "Kopie akcí", // popisek
                            modelData: {},
                            nextActionName: "Schválit",
                            checkAction: (model, input) => {
                                model = {};
                                var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                                return serviceContent
                                    .call("LzePripravaSchvaleniAkce", {
                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                    data: model
                                }).then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            nextAction: (model, input) => {
                                var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                                return serviceContent
                                    .call("PripravaSchvaleniAkce", {
                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                    data: model
                                }).then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                        },
                        lastStep: // posledni krok
                        {
                            // fáze 2 - zobrazení výsledku storna
                            title: "Výsledek",
                            gridTabTitle: "Zpracované záznamy",
                            form: undefined,
                            modelData: () => {
                                return {};
                            },
                        },
                        data: vybraneRadky, // data
                        completeDelegate: (view) => {
                            //debugger;
                            //that.view_ISL.requestData({}, { updateMode: "update" });
                            that.view_ISL.requestData({});
                        },
                    }, { title: "Schválení akcí" });
                }
                zaplanovatAkci(vybraneRadky) {
                    var that = this;
                    var confirmQuestion = ""; // promenna na prenos mezi kroky
                    that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "wiz_zaplanovani_akce",
                        keys: that.view_ISL.keys, // klic
                        gridFormat: new Gordic.Data.GridFormat().add(that.find(".js-SeznamDokladuPripravaGenerovani").ggrid("option", "columns") || []), //gridformat
                        title: "Hromadné zaplánování akcí", // titulek
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                            return serviceContent
                                .call("LzePripravaZaplanovaniAkce", {
                                doklady: data, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                data: {}
                            }).then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            form: undefined, // prefab formu
                            gridTabTitle: "Záznamy ke zpracování", // popisek tabu
                            showIndicator: true, //priznak, zda zobrazit kpi panel
                            title: "Zaplánování",
                            fieldChangeDelegate: function (ev, obj) {
                                //Gordic.Eko.Components.runCheckAction(ev.target, this, obj.wizardModel);
                            },
                            //description: "Kopie akcí", // popisek
                            modelData: {},
                            nextActionName: "Zaplánovat",
                            checkAction: (model, input) => {
                                model = {};
                                var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                                return serviceContent
                                    .call("LzePripravaZaplanovaniAkce", {
                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                    data: model
                                }).then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            nextAction: (model, input) => {
                                var serviceContent = that.createServiceContent("Gordic.Ada.WebClient.GAkceHromadneOperaceTab"); // serverový objekt
                                return serviceContent
                                    .call("PripravaZaplanovaniAkce", {
                                    doklady: input, //input.map(function (d) { return { rok: d.rok, ico: d.ico, cislo: d.cislo } }),
                                    data: model
                                }).then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                        },
                        lastStep: // posledni krok
                        {
                            // fáze 2 - zobrazení výsledku storna
                            title: "Výsledek",
                            gridTabTitle: "Zpracované záznamy",
                            form: undefined,
                            modelData: () => {
                                return {};
                            },
                        },
                        data: vybraneRadky, // data
                        completeDelegate: (view) => {
                            //debugger;
                            //that.view_ISL.requestData({}, { updateMode: "update" });
                            that.view_ISL.requestData({});
                        },
                    }, { title: "Zaplánovaní akcí" });
                }
            };
            GSeznamPripravaZpracovani = __decorate([
                gcontent
            ], GSeznamPripravaZpracovani);
            WebClient.GSeznamPripravaZpracovani = GSeznamPripravaZpracovani;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVByaXByYXZhWnByYWNvdmFuaS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HU2V6bmFtUHJpcHJhdmFacHJhY292YW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztFQU9FOzs7Ozs7O0FBRUYsSUFBVSxNQUFNLENBMC9CZjtBQTEvQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMC9CbkI7SUExL0JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EwL0I3QjtRQTEvQm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQTBCLFNBQVEsT0FBQSxZQUFZO2dCQUEzRDs7b0JBaUJZLGdCQUFXLEdBQUcsRUFBRSxJQUFJLEVBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRyxDQUFDLEVBQUUsQ0FBQztvQkFFaEQsVUFBSyxHQUFHLHdDQUF3QyxDQUFDO29CQUNqRCxXQUFNLEdBQUcsNkJBQTZCLENBQUMsQ0FBQywrQkFBK0I7Z0JBaStCM0UsQ0FBQztnQkEvOUJHLGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUU5QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRWIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUVmLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyx3REFBd0QsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7b0JBQ3RHLENBQUM7b0JBQ0QsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENB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QUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDbEMsQ0FBQztxQkFJSixFQUNHLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQTtnQkFDdEMsQ0FBQzthQUVKLENBQUE7WUFyL0JZLHlCQUF5QjtnQkFEckMsUUFBUTtlQUNJLHlCQUF5QixDQXEvQnJDO1lBci9CWSxtQ0FBeUIsNEJBcS9CckMsQ0FBQTtRQUNMLENBQUMsRUExL0JvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEwL0I3QjtJQUFELENBQUMsRUExL0JnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwL0JuQjtBQUFELENBQUMsRUExL0JTLE1BQU0sS0FBTixNQUFNLFFBMC9CZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIS8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuQWRhLldlYkNsaWVudC5HU2V6bmFtUHJpcHJhdmFacHJhY292YW5pLmpzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gR0FrY2VVY3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBKacWZw60gSWxlxI1layAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDE2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMTYtMDMtMDMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuKi9cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1QcmlwcmF2YVpwcmFjb3ZhbmkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIHJvdzogR29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bz47XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXI6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdTZXpuYW1BZGFGaWx0ZXJEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkRm9ybWF0U2V6bmFtOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBnbG9iYWxzOiBHb3JkaWMuQWRhLldlYkNsaWVudC5EVE8uR0FkYUdsb2JhbHNEdG87XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyRm9ybTogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgbWFpblRhYmxlOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgUmV6aW1WbGFzdG5pOiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgUmV6aW1WbGFzdG5pRnVuOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXppbVZsYXN0bmlGdW5OYXpldjogc3RyaW5nO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1vZGVsX2ZpbHRyID0geyByb2xlIDogMCwgc3Rhdl9heiA6IDAgfTtcclxuXHJcbiAgICAgICAgdGl0bGUgPSBcIlDFmcOtcHJhdmEgcGzDoW51IC0gUMWZZWTDoW7DrSBrZSB6cHJhY292w6Fuw61cIjtcclxuICAgICAgICB0YXNrSWQgPSBcImFjdFNlem5hbVByaXByYXZhWnByYWNvdmFuaVwiOyAvLyBvem5hxI1lbsOtIHBvbG/Fvmt5IHYgdGFza0xpc3R1XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJHRhYiA9ICQodGhpcy5jb250ZW50RGl2KTtcclxuXHJcbiAgICAgICAgICAgICR0YWIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuUmV6aW1WbGFzdG5pID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIlDFmcOtcHJhdmEgcGzDoW51IC0gw5pwcmF2eSBwb2xvxb5layBwbMOhbnUgdmUgdmxhc3RuaWN0dsOtOiBcIiArIHRoaXMuUmV6aW1WbGFzdG5pRnVuTmF6ZXY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJzZXR1cFwiLCB7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KS5nZm9ybXNlY3Rpb24oXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0UHJlZGF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJVcHJhdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJVcHJhdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wZW5jaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0Lmdsb2JhbHMuUGFyYW1fQWtjZV9QcmVkYXQgPT0gSW50ZXJmYWNlLlR5cFByZWRhdFByZXZ6aXRBa2NlRW51bS5Bbm8hLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcHXFoXTEm27DrSBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2eWJyYW5lUmFka3k6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvW10gPSB0aGF0LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdVByaXByYXZhR2VuZXJvdmFuaVwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTsgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID4gMCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0dWplIHZ5YnJhbsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXByYXZpdEFrY2kodnlicmFuZVJhZGt5KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhyb21hZG7DoSBvcGVyYWNlIC0gU1RPUk5PXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFNjaHZhbGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTY2h2w6FsaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2eWJyYW5lUmFka3k6IEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvW10gPSB0aGF0LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdVByaXByYXZhR2VuZXJvdmFuaVwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTsgIC8vIG5hxI10ZW7DrSBwxZllcyB2eWhsZWTDoW7DrSBncmlkdSAocMWZZXMgY2xhc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eWJyYW5lUmFka3kubGVuZ3RoID4gMCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0dWplIHZ5YnJhbsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2NodmFsaXRBa2NpKHZ5YnJhbmVSYWRreSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBocm9tYWRuw6Egb3BlcmFjZSAtIFNUT1JOT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBhY3RaYXBsYW5vdmF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJaYXBsw6Fub3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGVuY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZ5YnJhbmVSYWRreTogR29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG9bXSA9IHRoYXQuZmluZChcIi5qcy1TZXpuYW1Eb2tsYWR1UHJpcHJhdmFHZW5lcm92YW5pXCIpLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpOyAgLy8gbmHEjXRlbsOtIHDFmWVzIHZ5aGxlZMOhbsOtIGdyaWR1IChwxZllcyBjbGFzcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZ5YnJhbmVSYWRreS5sZW5ndGggPiAwKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3R1amUgdnlicmFuw70gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56YXBsYW5vdmF0QWtjaSh2eWJyYW5lUmFka3kpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHJvbWFkbsOhIG9wZXJhY2UgLSBTVE9STk9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0R3JpZERvdWJsZUNsaWNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9kc3RyYW5pdE96bmFjZW5lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZHN0cmFuaXQgdnlicmFuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNudC5vZHN0cmFuaXRfb3puYWNlbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE9kc3RyYW5pdFZzZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RzdHJhbml0IHbFoWVcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXRyYXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNudC5vZHN0cmFuaXRfdnNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG1lbnVCYXJ1XHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFByZWRhdCpcIiwgXCJhY3RTY2h2YWxpdCpcIiwgXCJhY3RaYXBsYW5vdmF0KlwiLCBcImFjdE9kc3RyYW5pdFZzZSpcIiwgXCJhY3RPZHN0cmFuaXRPem5hY2VuZSpcIl0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJLb21wbGV0bsOtIGZpbHRyXCIsIGxheW91dERlc2NyaXB0b3I6IFwidy1MLTkgdy1NLTkgdy1TLTEyXCIgfSlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFNlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgIC8vZmlsdGVyRm9ybURlZlxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwicm9sZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgbW9kZWw6IFwibW9kZWwucm9sZT12YWx1ZS5pZFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGluaXRpYWxWYWx1ZTogeyBpZDogMCB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAob2JqLmZsYWdzLm5vQ2hhbmdlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciBha3Rfcm9sZV9pID0gMFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciBpbml0X3ZhbHVlX2kgPSAwO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGFrdF9yb2xlX2kgPSBvYmoudmFsdWU/LmlkID8/IDA7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdmFyIHBvbGVfc2VydmVyRmlsdHJfaSA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoYWt0X3JvbGVfaSA9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHBvbGVfc2VydmVyRmlsdHJfaSA9IFswLCAyLCAzLCAxXTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaW5pdF92YWx1ZV9pID0gMDtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmIChha3Rfcm9sZV9pID09IDEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcG9sZV9zZXJ2ZXJGaWx0cl9pID0gWzIsIDMsIDFdO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpbml0X3ZhbHVlX2kgPSAyO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKGFrdF9yb2xlX2kgPT0gMikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBwb2xlX3NlcnZlckZpbHRyX2kgPSBbMCwyXTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaW5pdF92YWx1ZV9pID0gMjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwic3Rhdl9hel9mXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBzdGF2X2F6OiBwb2xlX3NlcnZlckZpbHRyX2kgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJzdGF2X2F6X2ZcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzdGF2X2F6OiBpbml0X3ZhbHVlX2kgfSwge3ZhbGlkIDogZmFsc2V9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vLy8gYXV0b21hdGlja8OpIG5hxI10ZW7DrSBwbyB6bcSbbsSbIGhvZG5vdHlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL2xldCBkdG8gPSB7fTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3RoYXQuZmlsdGVyRm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBkdG8pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vdGhhdC5maWx0ZXJGb3JtIS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCBkdG8pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGRhdGE6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB7IG5hemV2OiBcIlpwcmFjb3ZhdGVsXCIsIGlkOiAwIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiS29tcGV0ZW50XCIsIGlkOiAxIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiRmluYW7EjW7DrSBrb21wZXRlbnQgQVpcIiwgaWQ6IDIgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIF0sIHsga2V5OiBcImlkXCIgfSlcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2ZpbHRlckZvcm1EZWZcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc3J2Y3NheigpLCB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcInN0YXZfYXpfZlwiLCBtb2RlbDogXCJtb2RlbC5zdGF2X2F6PXZhbHVlLnN0YXZfYXpcIiwgbXVsdGk6IGZhbHNlLCBsaXN0OiB0cnVlLCBpdGVtV2lkdGg6IFwiXCIsIGRpc2FibGVkOiBmYWxzZSwgaW5pdGlhbFZhbHVlOiB7IHN0YXZfYXo6IDAgfSwgXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gYXV0b21hdGlja8OpIG5hxI10ZW7DrSBwbyB6bcSbbsSbIGhvZG5vdHlcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAob2JqLmZsYWdzLmlzS29udHJvbG5pRGl2IHx8IG9iai5mbGFncy5ub0NoYW5nZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGxldCBkdG8gPSB7fTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0hLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmZpbHRlckZvcm0hLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIGR0byk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3RoYXQuZmlsdGVyRm9ybSA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhtYWluRm9ybSlcclxuICAgICAgICAgICAgLy8gICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBkZWZhdWx0IHBybyBFS09cclxuICAgICAgICAgICAgLy8gICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBbRmlsdGVyVmlld01vZGUuU2ltcGxlXSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL3BvT3RldnJlbmlPdGV2cml0UGFuZWxQb2RtaW5lazogZmFsc2UsICAgICAvLyBkZWZhdWx0IHBybyB1xb5pdmF0ZWxza8OpIG5hc3RhdmVuw61cclxuICAgICAgICAgICAgLy8gICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXQ6IFwiVnlobGVkYW5lUG9kbWlua3lWQmFkZ2VcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGF1dG9Mb2FkQWZ0ZXJDaG9zZUZpbHRlcjogZmFsc2UsICAgICAgICAvLyBBdXRvbWF0aWNrw6kgdnlobGVkw6Fuw60gcG8gem3Em27EmyB1bG/FvmVuw6lob1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY2xlYXJGaWx0ZXJCdXR0b25WaXNpYmxlOiBcIk5ldmVyVmlzaWJsZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGV0YWlsQWN0aW9uQXNDaGVja2JveDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL2lkU2ltcGxlTW9kZTpcImlkU2ltcGxlTW9kZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZm9ybXM6IFtmaWx0ZXJGb3JtRGVmXSxcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIFRPRE86IGJ1ZGUgbsSbamFrw6kgbGVwxaHDrSB1a2zDoWRhY8OtIG9rbm8gbmVibyBidWR1IG11c2V0IHVkxJtsYXQgc3ZvamUgYSBuYXN0YXZpdCBobyBkbyBzYXZlT3B0aW9uc0Zvcm0/XHJcbiAgICAgICAgICAgIC8vICAgICAgICBmYXZvcml0ZXM6IFtcInJvbGVcIiwgXCJzdGF2X2F6XCJdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gVE9ETzogesWvc3RhbmUgdG9obGUgdMOpbWEgbmVibyBidWRlIHBybyBMSyBqaW7DqSBuZcW+IHBybyBUSz9cclxuICAgICAgICAgICAgLy8gICAgICAgIHRlbWE6IFwiYWRhX3B0bV9hZGFiYXMyXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSxcclxuICAgICAgICAgICAgLy8gICAgICAgIHNhdmVPcHRpb25zRm9ybTogXCJla29cIixcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIHN0cmljdFN0b3BBdXRvTG9hZDogdHJ1ZSwgICAgICAgICAgICAgICAvLyBTdHJpa3RuxJsgemFrw6HFvmUgYXV0b21hdGlja8OpIG5hxI10ZW7DrSBobmVkIHBvIG90ZXbFmWVuw60gc2V6bmFtdSwgb2Jsw61iZW7DvSBmaWx0ciBzZSBwb3V6ZSBwxZllZHBsbsOtLlxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gdGV4dEl0ZW1UZW1wbGF0ZTogXCJ7ZGVzY3JpcHRpb259XCIsXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdCBwb2RsZSBmaWx0csWvXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5tb2RlbF9maWx0ciA9IG9iai5maWx0ZXI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0gPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkVmxhc3RuaWN0dmkoY250LmdyaWRGb3JtYXRTZXpuYW0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogXCJha3Rpdml0YVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAvL2hpZGRlbjogdGhpcy5nbG9iYWxzLlBhcmFtX0FrY2VfQXV0U2NodiA9PSBJbnRlcmZhY2UuVHlwQXV0b21hdFNjaHZhbGVuaU5vdmFBa2NlRW51bS5OZVNwcm9jZXNlbSxcclxuICAgICAgICAgICAgICAgIC8vIHdpZHRoOiAyNSxcclxuICAgICAgICAgICAgICAgIGZvcm1hdFByZXNldDogR29yZGljLkdsb2JhbC5FbnVtcy5HcmlkQ29sdW1uRm9ybWF0SWNvbi5pY29uLFxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YS5ha3Rpdml0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLk5hdnJoOiByZXR1cm4geyBpY29uOiBcImZhLWNoZWNrLWNpcmNsZS1vIGctc3RhdGUtc3VjY2VzcyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJTY2h2w6FsZW5vXCIsIGNhcHRpb246IFwiU2NodsOhbGVub1wiLCB0b29sdGlwOiBcIlNjaHbDoWxlbm9cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLkFrdGl2bmk6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtd2FybmluZyBnLXN0YXRlLXRleHRcIiwgdGV4dDogXCJOw6F2cmhcIiwgY2FwdGlvbjogXCJOw6F2cmhcIiwgdG9vbHRpcDogXCJOw6F2cmhcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5Ba3Rpdml0YUFrY2VFbnVtLk5lYWt0aXZuaTogcmV0dXJuIHsgaWNvbjogXCJmYS10cmFzaCBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIk5lYWt0aXZuw61cIiwgY2FwdGlvbjogXCJOZWFrdGl2bsOtXCIsIHRvb2x0aXA6IFwiTmVha3Rpdm7DrVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlLkFrdGl2aXRhQWtjZUVudW0uWnJ1c2VuYTogcmV0dXJuIHsgaWNvbjogXCJmYS10cmFzaCBnLXN0YXRlLWVycm9yIGctc3RhdGUtdGV4dFwiLCB0ZXh0OiBcIlN0b3Jub3ZhbsOhXCIsIGNhcHRpb246IFwiU3Rvcm5vdmFuw6FcIiwgdG9vbHRpcDogXCJTdG9ybm92YW7DoVwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNudC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCLEjMOtc2xvIHBvbC4gcGzDoW51XCIgOiBcIsSMw61zbG8gYWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNudC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCJOw6F6ZXYgcG9sLiBwbMOhbnVcIiA6IFwiTsOhemV2IGFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3BsYV90eHRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiS25paGFcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW0uYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9ha3RfbmF6ZXZcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnByYWNvdmF0ZWxcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY250LmdyaWRGb3JtYXRTZXpuYW1cclxuICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNudC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCLEjFBQXCIgOiB0aGlzLmdsb2JhbHMuVGl0dWxla19Oa3MhLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAgLy8sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0X25rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNudC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PID8gXCJOw6F6ZXYgxIxQUFwiIDogXCJOw6F6ZXYgXCIgKyB0aGlzLmdsb2JhbHMuVGl0dWxla19Oa3MhLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwIC8vLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQuZ3JpZEZvcm1hdFNlem5hbVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkczogW1wiKmRhdHVtX3ptZW55X2ZpbHRyYWNlXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gcG9zbGVkbsOtIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW51X3Byb3ZfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb3NsZWRuw60gem3Em251IHByb3ZlZGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkdC1sZWZ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCAvLyxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1fem1lbnlfZmlsdHJhY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueSBmaWx0cmFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImR0LWxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbl9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBcImZpbl9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRmluLiBvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmluX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwiZmluX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJGaW4uIGRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZWFsX29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IFwicmVhbF9vZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUmVhbC4gb2RcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJlYWxfZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZDogXCJyZWFsX2RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSZWFsLiBkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjbnQubWFpblRhYmxlID0gJChcIjxkaXYgY2xhc3M9J2pzLVNlem5hbURva2xhZHVQcmlwcmF2YUdlbmVyb3ZhbmknPlwiKVxyXG4gICAgICAgICAgICAgICAgLy8uY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKG1haW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yb3cgPSBjbnQubWFpblRhYmxlLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yb3cgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC50cmlnZ2VyKFwiYWRhc3ViZ3JpZHJvd3NlbGVjdGVkXCIsIHsgYWdlbmRhOiA0MCwgZGF0YTogdGhhdC5yb3cgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBjbnQuYWN0aW9ucy5hY3RHcmlkRG91YmxlQ2xpY2ssXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcnVuKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5yb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgICAgLy9kYXRhLCB6ZSBrdGVyeWNoIGJ5bCB2eXR2b3JlbiByYWRla1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfSksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IEdvcmRpYy5BZGEuV2ViQ2xpZW50LkFkYUZ1bmN0aW9uLnpqaXN0aV9zbG91cGNlX3NlYXJjaChjbnQuZ3JpZEZvcm1hdFNlem5hbSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogY250LmdyaWRGb3JtYXRTZXpuYW0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IGNudC56amlzdGlfc2xvdXBjZShjbnQuZ3JpZEZvcm1hdFNlem5hbSlcclxuICAgICAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiw5pwbG7DvVwiLCBjb2x1bW5MaXN0OiB0aGlzLnpqaXN0aV9zbG91cGNlKGNudC5ncmlkRm9ybWF0U2V6bmFtKSwgX2xvY2tlZDogdHJ1ZSB9IC8vZ3JpZEZvcm1hdFNlem5hbS5jb2x1bW5zLmZpbHRlcigoYykgPT4gYy5uYW1lICE9IFwia25paGFcIikuam9pbigpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJnZW5lcnVqaSB6IEJBUlwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlJlemltVmxhc3RuaSA9PSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGlzLmlzbC5Ba2NlUHJpcHJhdmEubGlzdCh7IGZpbHRlcnM6IHsgcm9rOiB0aGlzLmdwYy5yb2ssIGljbzogdGhpcy5ncGMuaWNvLCBpeHNfZnVuX2FrdDogdGhhdC5SZXppbVZsYXN0bmlGdW4gfSwgZnJhZ21lbnRzOiBbXCJQZXJtaXNzaW9uc1wiLCBcIipcIl0gfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuQWtjZVByaXByYXZhLmxpc3QoeyBmaWx0ZXJzOiB7IHJvazogdGhpcy5ncGMucm9rLCBpY286IHRoaXMuZ3BjLmljbyB9LCBmcmFnbWVudHM6IFtcIlBlcm1pc3Npb25zXCIsIFwiKlwiXSB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQubWFpblRhYmxlLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXdfSVNMKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6amlzdGlfc2xvdXBjZShnZikge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2YuY29sdW1ucy5maWx0ZXIoZSA9PiBlLmhpZGRlbiAhPSB0cnVlKS5tYXAoZSA9PiBlLm5hbWUpLmpvaW4oJywnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVsb3pfYWtjZSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJhZGt5ID0gdGhhdC52aWV3X0lTTC5nZXREYXRhUm93cyhmYWxzZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDFmcOhZGt5IHYgZ3JpZHUgdiBwcsWvdm9kY2ksIHbFoWVjaG55XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVmQ2xvc2UgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0dWFsQWN0aW9uOiBHQWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgYWN0dWFsQWN0aW9uID0gdGhpcy5hY3Rpb25zLmFjdFVsb3ppdCE7XHJcblxyXG4gICAgICAgICAgICBhY3R1YWxBY3Rpb24uc2V0UGVuZGluZygwKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWjDoSB1bG/FvmVuw60gZGF0XCIpOyBcclxuXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlQ29udGVudCA9IHRoaXMuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZUhyb21hZG5lT3BlcmFjZVRhYlwiKTsgICAgICAgICAgLy8gc2VydmVyb3bDvSBvYmpla3RcclxuXHJcbiAgICAgICAgICAgIHNlcnZpY2VDb250ZW50XHJcbiAgICAgICAgICAgICAgICAuY2FsbChcIlVsb3ppdFByaXByYXZhQWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogcmFka3kgXHJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzdWx0OiB7IHJlc3VsdDogeyBkYXRhOiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBlcnJvcnM6IHsgbWVzc2FnZTogc3RyaW5nIH1bXSwga2luZDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZCB9W10gfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdC5sZW5ndGggPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHRbMF0ua2luZCAhPSA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHt9LCB7IHVwZGF0ZU1vZGU6IFwicmVzZXRcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZDbG9zZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvcGVyYWNlIG5lZG9wYWRsYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkNsb3NlLnJlamVjdChyZXN1bHQucmVzdWx0WzBdLmVycm9yc1swXS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZDbG9zZS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvcGVyYWNlIG5lZG9wYWRsYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZDbG9zZS5yZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICBhY3R1YWxBY3Rpb24uc2V0UGVuZGluZyhkZWZDbG9zZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmQ2xvc2UucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb2RzdHJhbml0X296bmFjZW5lKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmFka3kgPSB0aGF0LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdVByaXByYXZhR2VuZXJvdmFuaVwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHJhZGt5Lmxlbmd0aCA+PSAxKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgZXhpc3R1amUgdnlicmFuw70gesOhem5hbVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVmQ2xvc2UgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0dWFsQWN0aW9uOiBHQWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgYWN0dWFsQWN0aW9uID0gdGhpcy5hY3Rpb25zLmFjdE9kc3RyYW5pdE96bmFjZW5lITtcclxuXHJcbiAgICAgICAgICAgIC8vIGFjdHVhbEFjdGlvbi5zZXRQZW5kaW5nKDApO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIG9kc3RyYW7Em27DrSBkYXRcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VydmljZUNvbnRlbnQgPSB0aGlzLmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VIcm9tYWRuZU9wZXJhY2VUYWJcIik7ICAgICAgICAgIC8vIHNlcnZlcm92w70gb2JqZWt0XHJcblxyXG4gICAgICAgICAgICBzZXJ2aWNlQ29udGVudFxyXG4gICAgICAgICAgICAgICAgLmNhbGwoXCJQcmlwcmF2YUFrY2VPZHN0cmFuaXRcIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRva2xhZHk6IHJhZGt5XHJcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzdWx0OiB7IHJlc3VsdDogeyBkYXRhOiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBlcnJvcnM6IHsgbWVzc2FnZTogc3RyaW5nIH1bXSwga2luZDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZCB9W10gfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdC5sZW5ndGggPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHRbMF0ua2luZCAhPSA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdfSVNMLnVwZGF0ZURhdGEocmFka3ksIFwiZGVsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkNsb3NlLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQ2xvc2UucmVqZWN0KHJlc3VsdC5yZXN1bHRbMF0uZXJyb3JzWzBdLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3BlcmFjZSBuZWRvcGFkbGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkNsb3NlLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvcGVyYWNlIG5lZG9wYWRsYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZDbG9zZS5yZWplY3QoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIGFjdHVhbEFjdGlvbi5zZXRQZW5kaW5nKGRlZkNsb3NlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZDbG9zZS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvZHN0cmFuaXRfdnNlKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVmQ2xvc2UgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmFka3kgPSB0aGF0LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdVByaXByYXZhR2VuZXJvdmFuaVwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3R1YWxBY3Rpb246IEdBY3Rpb247XHJcblxyXG4gICAgICAgICAgICBhY3R1YWxBY3Rpb24gPSB0aGlzLmFjdGlvbnMuYWN0T2RzdHJhbml0VnNlITtcclxuXHJcbiAgICAgICAgICAgIC8vYWN0dWFsQWN0aW9uLnNldFBlbmRpbmcoMCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJQcm9iw61ow6Egb2RzdHJhbsSbbsOtIGRhdFwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZXJ2aWNlQ29udGVudCA9IHRoaXMuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZUhyb21hZG5lT3BlcmFjZVRhYlwiKTsgICAgICAgICAgLy8gc2VydmVyb3bDvSBvYmpla3RcclxuIC8vICAgICAgICAgICB2YXIgYWEgPSB0aGF0LmlzbC5Ba2NlUHJpcHJhdmEuZGVsZXRlX0FsbCgpLmdldCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkgeyByZXN1bHQucmVzdWx0Lmtpbn0pXHJcbiAgICAgICAgICAgIHNlcnZpY2VDb250ZW50XHJcbiAgICAgICAgICAgICAgICAuY2FsbChcIlByaXByYXZhQWtjZU9kc3RyYW5pdFZzZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogcmFka3ksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXppbTogdGhhdC5SZXppbVZsYXN0bmlcclxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHJlc3VsdC5yZXN1bHQubGVuZ3RoID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmVzdWx0LmtpbmQgIT0gNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC51cGRhdGVEYXRhKFtdLCBcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkNsb3NlLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9wZXJhY2UgbmVkb3BhZGxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQ2xvc2UucmVqZWN0KHJlc3VsdC5yZXN1bHQuZXJyb3JzLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gb3BlcmFjZSBuZWRvcGFkbGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgZGVmQ2xvc2UucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3BlcmFjZSBuZWRvcGFkbGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmQ2xvc2UucmVqZWN0KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICBhY3R1YWxBY3Rpb24uc2V0UGVuZGluZyhkZWZDbG9zZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmQ2xvc2UucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXByYXZpdEFrY2kodnlicmFuZVJhZGt5OiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvW10pIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1vZGVsRGF0YUZpcnN0ID0ge1xyXG4gICAgICAgICAgICAgICAgaXhzX3BsYTogXCJcIixcclxuICAgICAgICAgICAgICAgIGl4c19mdW5fYWt0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgbmtzOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgdF9ua3M6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBjaXNfcmVhbDogXCJcIixcclxuICAgICAgICAgICAgICAgIGl4c19mdW5femFkOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgYWRyZXNhMTogXCJcIixcclxuICAgICAgICAgICAgICAgIGFkcmVzYTI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBwc2M6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBhZHJlc2EzOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgZmluX29kOiAwLFxyXG4gICAgICAgICAgICAgICAgZmluX2RvOiAwLCBcclxuICAgICAgICAgICAgICAgIHJlYWxfb2Q6IDAsXHJcbiAgICAgICAgICAgICAgICByZWFsX2RvOiAwIFxyXG4gICAgICAgICAgICB9OyAvLyBwb3XFvml0w6EgcHJvbcSbbm7DoSBwcm8gcMWZZW5vcyBtZXppIGtyb2t5XHJcblxyXG4gICAgICAgICAgICB2YXIgbF9vRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTItOC0yLCBNLTItOC0yLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJDw61sIGV2aWRlbmNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS25paGFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zcnZzcGxhKCksIHsgICAgICAgICAgLy8gS25paGFcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHDFmcOtc3R1cG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3BsYVwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICBzdHJpY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mbGFnOiBcInJlcXVpcmVkXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZnDrXpuYWsgcmVndWlyZWRcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5ncGMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoaXMuZ3BjLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ub19peHNfcGxhOiB0aGF0Lml4cF9kZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXhzX3BsYTogXCIhPVwiICsgdGhhdC5peHBfZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbm9yb2s6IHRoaXMuc2VydmVyQ29udGV4dC5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcG91emVBa3RPYmQ6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcInBvdXplQWt0T2JkXCIsIFwiXCIsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3BsYT12YWx1ZS5peHNfcGxhLCBtb2RlbC5yb2s9dmFsdWUucm9rXCIsICAgICAgICAgICAgICAgICAgICAgIC8vIG7DoXZyYXRvdsOhIGhvZG5vdGEgcG91emUgaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFsaWTDoXRvciAtIHBvbGUgbXVzw60gYsO9dCB2eXBsbsSbbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGN0eCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpIHptxJtuxJsga25paHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvbGUgPSAkKGV2LmN1cnJlbnRUYXJnZXQpLmdmb3JtKCkuZmluZEZpZWxkcyhcIml4c19mdW5fYWt0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGN0eC52YWx1ZSAhPSBudWxsKSAmJiAoY3R4LnZhbHVlLml4c19wbGEgIT0gXCJcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGUuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBGaWx0cnlacHJhY292YXRlbCA9IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvxI3DoXRlxI1uw60gZmlsdHJ5IHBybyB6cHJhY292YXRlbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3R5cF9hZzogMjUwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpbHRyIG5hIGFnZW5kdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWNvOiB0aGF0LnNlcnZlckNvbnRleHQuaWNvLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpbHRyIG5hIEnEjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdWNzOiB0aGF0LnNlcnZlckNvbnRleHQudWNzLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpbHRyIG5hIFVDU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWt0aXZpdGE6IDEwMCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaWx0ciBuYSBha3Rpdml0dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaXhwX2RlbjogXCIhPSBcIiArIHRoYXQuaXhwX2RlbiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBiZXoga25paHksIGtkZSBqc2VtIHDFmWlobMOhxaFlbsO9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EbGVQb3ZvbGVueWNoRmF6aTogXCJHV0FBREEwMVwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3ViamVrdHkgcHJvIGRhbm91IGbDoXppXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVnJmdUl4cERlbjogY3R4LnZhbHVlIS5peHNfcGxhLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaWx0ciBkbGUgcMWZw61zdHVwdSBrZSBrbml6ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVBa3Rpdml0YTogMTAwICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0aXZuw60gc3ViamVrdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sZS5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIEZpbHRyeVpwcmFjb3ZhdGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGUuZ2ZpZWxkKFwiY2xlYXJcIiwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sZS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlpwcmFjb3ZhdGVsXCIsIGhpbnQ6IFwiWnByYWNvdmF0ZWxcIiB9KS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHbFvmR5IHDFmcOtc3R1cG7DqVxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2zDrcSNa28gamFrbyB0xZlpIHRlxI1reVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9ha3RcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG7DoXpldiBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW5fYWt0PXZhbHVlLml4c19mdW5cIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG7DoXZyYXRvdsOhIGhvZG5vdGEgcG91emUgaXhzX2Z1blxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWnByYWNvdmF0ZWxcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJDIDIzMzUyMDI4IDogTm92w70genByYWNvdmF0ZWxcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2YWxpZMOhdG9yIC0gcG9sZSBtdXPDrSBiw710IHZ5cGxuxJtuw6lcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7fSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG/EjcOhdGXEjW7DrSBmaWx0cnkgc3ViamVrdHVcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY3R4KSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaSB6bcSbbsSbIHpwcmFjb3ZhdGVsZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBsX29Gb3JtLmFkZFNlY3Rpb24oXCJIb2Rub3R5XCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscy5UeXBacE9yZ2FuID09IDApIHtcclxuICAgICAgICAgICAgICAgIGxfb0Zvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KHRoYXQuZ2xvYmFscy5CQVJfVHlwX0luc3QgPT0gSW50ZXJmYWNlLlNydlR5cEludGFsYWNlRW51bS5NTyA/IFwixIxQUFwiIDogdGhhdC5nbG9iYWxzLlRpdHVsZWtfTmtzISkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zbmtzKCksIHsgbmFtZTogXCJua3NcIiwgbW9kZWw6IFwiaWNvPT5pY287IG5rcz1ua3M7dF9ua3M9bmF6ZXZcIiwgbW9kZWxEZWZhdWx0czogeyBpY286IHRoaXMuZ3BjLmljbyB9LCBzZXJ2ZXJGaWx0ZXJzOiB7IGljbzogdGhpcy5ncGMuaWNvIH0gfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxfb0Zvcm1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiT3JnYW5pemFjZVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NyYXJBREEoKSwgeyBuYW1lOiBcIm5rc1wiLCBtb2RlbDogXCJua3M9aWNvOyBua3M9bmtzO3RfbmtzPW5hemV2XCIgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbF9vRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlJlYWxpesOhdG9yXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3JlYSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNfcmVhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmljbz0+dmFsdWUuaWNvLCBtb2RlbC5jaXNfcmVhbD12YWx1ZS5jaXNfcmVhbDtjaXNfcmVhbF90eHQ9bmF6ZXZcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBpY286IHRoaXMuZ3BjLmljbyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsRGVmYXVsdHM6IHsgaWNvOiB0aGlzLmdwYy5pY28gfSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5nbG9iYWxzLkJBUl9UeXBfSW5zdCA9PSBJbnRlcmZhY2UuU3J2VHlwSW50YWxhY2VFbnVtLk1PKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoXCIuZ2Zvcm1cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhzX2Z1bl96YWRcIikuZ2ZpZWxkKFwiY2xlYXJcIiwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZU9iai52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBteV9zZXJ2ZXJGaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiBbMTAwXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpel96YWQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5ncGMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNfcmVhbDogY2hhbmdlT2JqLnZhbHVlLmNpc19yZWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfZnVuX3phZFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIG15X3NlcnZlckZpbHRlcik7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNoYW5nZU9iai52YWx1ZSAhPSBudWxsKSAmJiAoY2hhbmdlT2JqLnZhbHVlLmNpc19yZWFsICE9IFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c19mdW5femFkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhzX2Z1bl96YWRcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhzX2Z1bl96YWRcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxfb0Zvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaYWRhdmF0ZWxcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC56YWRhdmV0ZWwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl96YWRcIiwgbW9kZWw6IFwibW9kZWwuaWNvPT52YWx1ZS5pY28sbW9kZWwuaXhzX2Z1bl96YWQ9dmFsdWUuaXhzX2Z1blwiLCBkcm9wZG93bjogZmFsc2UsIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IFsxMDBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcml6X3phZDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0LmdwYy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpc19yZWFsOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbF9vRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIGxfb0Zvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJBZHJlc2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJhZHJlc2ExXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJhZHJlc2EyXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy00XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zcHNjKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBzY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmljdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntwc2N9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVscGVySXRlbVRlbXBsYXRlOiBcIntwc2N9IC0ge3Bvc3RhfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGludmFsaWRUcmFuc2Zvcm06IGZ1bmN0aW9uIChzdHJWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHR5cGVvZiBzdHJWYWx1ZSA9PT0gXCJzdHJpbmdcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHBzYzogc3RyVmFsdWUsIHN0YXQ6IDQyIH07IC8vIHZyYXRpbWUgZGF0YSB2ZSBmb3JtYXR1IHYgamFrZW0gamUgcG9saWNrbyB6dnlrbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyVmFsdWU7IC8vIHZyYXRpbWUgcHV2b2RuaSBob2Rub3R1IHBybyBwcmlwYWQsIHplIHNpIHMgbmkgdmVyaWZpa2FjZSBuZWphayBwb3JhZGlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInBzYz1wc2NcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbE9wdGlvbnM6IHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9LCAvLyBuZXZ5dm9sw6Egc2UgY2hhbmdlIHDFmWkgbW9kZWwgYXBwbHlcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IHN0YXQ6IDQyIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlT2JqLnZhbHVlICYmIGNoYW5nZU9iai52YWx1ZS5wc2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZ2Zvcm0oKS5maW5kRmllbGRzKFwiYWRyZXNhM1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjaGFuZ2VPYmoudmFsdWUucG9zdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICApIC8vZ2luc3BzYyBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcImFkcmVzYTNcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGxfb0Zvcm1cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiT2Jkb2LDrVwiKVxyXG4gICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHsgbGFiZWw6IFwiRmluYW5jb3bDoW7DrSBvZC1kb1wiLCBuYW1lOiBcImludGVydmFsX2ZpblwiLCB0eXBlOiBcInJva1wiIH0pKVxyXG4gICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHsgbGFiZWw6IFwiUmVhbGl6YWNlIG9kLWRvXCIsIG5hbWU6IFwiaW50ZXJ2YWxfcmVhbFwiLCB0eXBlOiBcInJva1wiIH0pKVxyXG5cclxuICAgICAgICAgICAgdmFyIGNvbmZpcm1RdWVzdGlvbiA9IFwiXCI7IC8vIHByb21lbm5hIG5hIHByZW5vcyBtZXppIGtyb2t5XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBJRDogXCJ3aXpfcHJlZXZpZGVuY2VfYWtjZVwiLFxyXG4gICAgICAgICAgICAgICAga2V5czogdGhhdC52aWV3X0lTTC5rZXlzLCAvLyBrbGljXHJcblxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKS5hZGQodGhhdC5maW5kKFwiLmpzLVNlem5hbURva2xhZHVQcmlwcmF2YUdlbmVyb3ZhbmlcIikuZ2dyaWQ8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8sIFwiY29sdW1uc1wiPihcIm9wdGlvblwiLCBcImNvbHVtbnNcIikgfHwgW10pLCAvL2dyaWRmb3JtYXRcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkhyb21hZG7DoSBldmlkZW5jZSBha2PDrVwiLCAvLyB0aXR1bGVrXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG5cclxuICAgICAgICAgICAgICAgIHByZUNoZWNrQWN0aW9uOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlQ29udGVudCA9IHRoYXQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZUhyb21hZG5lT3BlcmFjZVRhYlwiKTsgICAgICAgICAgLy8gc2VydmVyb3bDvSBvYmpla3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKFwiTHplUHJpcHJhdmFFdmlkZW5jZUFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tsYWR5OiBkYXRhLCAvL2lucHV0Lm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4geyByb2s6IGQucm9rLCBpY286IGQuaWNvLCBjaXNsbzogZC5jaXNsbyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXN1bHQ6IHsgcmVzdWx0OiB7IGRhdGE6IEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8sIGVycm9yczogeyBtZXNzYWdlOiBzdHJpbmcgfVtdLCBraW5kOiBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kIH1bXSB9KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8QWRhLkludGVyZmFjZS5HQWtjZUR0bz4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDogeyAvL3Bydm5pIGtyb2tcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiBsX29Gb3JtLCAvLyBwcmVmYWIgZm9ybXVcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiWsOhem5hbXkga2UgenByYWNvdsOhbsOtXCIsIC8vIHBvcGlzZWsgdGFidVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsIC8vcHJpem5haywgemRhIHpvYnJheml0IGtwaSBwYW5lbFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkV2aWRlbmNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRDaGFuZ2VEZWxlZ2F0ZTogZnVuY3Rpb24gKHRoaXM6IEdvcmRpYy5Fa28uQ29tcG9uZW50cy5GaXJzdFN0ZXA8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+LCBldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLkVrby5Db21wb25lbnRzLnJ1bkNoZWNrQWN0aW9uKGV2LnRhcmdldCwgdGhpcywgb2JqLndpemFyZE1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiBcIktvcGllIGFrY8OtXCIsIC8vIHBvcGlzZWtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6IG1vZGVsRGF0YUZpcnN0LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb25OYW1lOiBcIkV2aWRvdmF0XCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGlucHV0KSA9PiB7IC8vIGFrY2UgcHJvIGtvbnRyb2x1IGRhdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBtb2RlbERhdGFGaXJzdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlQ29udGVudCA9IHRoYXQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZUhyb21hZG5lT3BlcmFjZVRhYlwiKTsgICAgICAgICAgLy8gc2VydmVyb3bDvSBvYmpla3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlQ29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoXCJMemVQcmlwcmF2YUV2aWRlbmNlQWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogaW5wdXQsIC8vaW5wdXQubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiB7IHJvazogZC5yb2ssIGljbzogZC5pY28sIGNpc2xvOiBkLmNpc2xvIH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzdWx0OiB7IHJlc3VsdDogeyBkYXRhOiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBlcnJvcnM6IHsgbWVzc2FnZTogc3RyaW5nIH1bXSwga2luZDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZCB9W10gfSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxBZGEuSW50ZXJmYWNlLkdBa2NlRHRvPihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgaW5wdXQpID0+IHsgLy8gYWtjZSBwcm8gcHJlY2hvZCBtZXppIGtyb2t5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YUZpcnN0ID0gbW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YUZpcnN0LmZpbl9vZCA9IG1vZGVsLmludGVydmFsX2Zpbi5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhRmlyc3QuZmluX2RvID0gbW9kZWwuaW50ZXJ2YWxfZmluLmVuZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhRmlyc3QucmVhbF9vZCA9IG1vZGVsLmludGVydmFsX3JlYWwuc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YUZpcnN0LnJlYWxfZG8gPSBtb2RlbC5pbnRlcnZhbF9yZWFsLmVuZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlQ29udGVudCA9IHRoYXQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZUhyb21hZG5lT3BlcmFjZVRhYlwiKTsgICAgICAgICAgLy8gc2VydmVyb3bDvSBvYmpla3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlQ29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoXCJQcmlwcmF2YUV2aWRlbmNlQWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogaW5wdXQsIC8vaW5wdXQubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiB7IHJvazogZC5yb2ssIGljbzogZC5pY28sIGNpc2xvOiBkLmNpc2xvIH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzdWx0OiB7IHJlc3VsdDogeyBkYXRhOiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBlcnJvcnM6IHsgbWVzc2FnZTogc3RyaW5nIH1bXSwga2luZDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZCB9W10gfSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxBZGEuSW50ZXJmYWNlLkdBa2NlRHRvPihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6IC8vIHBvc2xlZG5pIGtyb2tcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmw6F6ZSAyIC0gem9icmF6ZW7DrSB2w71zbGVka3Ugc3Rvcm5hXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVsO9c2xlZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlpwcmFjb3ZhbsOpIHrDoXpuYW15XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogbF9vRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19wbGE6IG1vZGVsRGF0YUZpcnN0Lml4c19wbGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuX2FrdDogbW9kZWxEYXRhRmlyc3QuaXhzX2Z1bl9ha3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBua3M6IG1vZGVsRGF0YUZpcnN0Lm5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRfbmtzOiBtb2RlbERhdGFGaXJzdC50X25rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc19yZWFsOiBtb2RlbERhdGFGaXJzdC5jaXNfcmVhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19mdW5femFkOiBtb2RlbERhdGFGaXJzdC5peHNfZnVuX3phZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkcmVzYTE6IG1vZGVsRGF0YUZpcnN0LmFkcmVzYTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHJlc2EyOiBtb2RlbERhdGFGaXJzdC5hZHJlc2EyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHNjOiBtb2RlbERhdGFGaXJzdC5wc2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZHJlc2EzOiBtb2RlbERhdGFGaXJzdC5hZHJlc2EzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJ2YWxfZmluOiB7IHN0YXJ0OiBtb2RlbERhdGFGaXJzdC5maW5fb2QsIGVuZDogbW9kZWxEYXRhRmlyc3QuZmluX2RvIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlcnZhbF9yZWFsOiB7IHN0YXJ0OiBtb2RlbERhdGFGaXJzdC5yZWFsX29kLCBlbmQ6IG1vZGVsRGF0YUZpcnN0LnJlYWxfb2QgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWxfb2Q6IG1vZGVsRGF0YUZpcnN0LnJlYWxfb2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFsX2RvOiBtb2RlbERhdGFGaXJzdC5yZWFsX2RvIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB2eWJyYW5lUmFka3ksIC8vIGRhdGFcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7IC8vIGRlbGVnYXQsIGt0ZXJ5IHNlIHZvbGEgcG8gdWtvbmNlbmkgcHJ1dm9kY2VcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7fSwgeyB1cGRhdGVNb2RlOiBcInVwZGF0ZVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wucmVxdWVzdERhdGEoe30pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiUMWZZWV2aWRlbmNlIGFrY8OtXCIgfSkgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc2NodmFsaXRBa2NpKHZ5YnJhbmVSYWRreTogQWRhLkludGVyZmFjZS5HQWtjZUR0b1tdKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBjb25maXJtUXVlc3Rpb24gPSBcIlwiOyAvLyBwcm9tZW5uYSBuYSBwcmVub3MgbWV6aSBrcm9reVxyXG5cclxuICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwid2l6X3NjaHZhbGVuaV9ha2NlXCIsXHJcbiAgICAgICAgICAgICAgICBrZXlzOiB0aGF0LnZpZXdfSVNMLmtleXMsIC8vIGtsaWNcclxuXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpLmFkZCh0aGF0LmZpbmQoXCIuanMtU2V6bmFtRG9rbGFkdVByaXByYXZhR2VuZXJvdmFuaVwiKS5nZ3JpZDxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bywgXCJjb2x1bW5zXCI+KFwib3B0aW9uXCIsIFwiY29sdW1uc1wiKSB8fCBbXSksIC8vZ3JpZGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSHJvbWFkbsOpIHNjaHbDoWxlbsOtIGFrY8OtXCIsIC8vIHRpdHVsZWtcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VDb250ZW50ID0gdGhhdC5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlSHJvbWFkbmVPcGVyYWNlVGFiXCIpOyAgICAgICAgICAvLyBzZXJ2ZXJvdsO9IG9iamVrdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoXCJMemVQcmlwcmF2YVNjaHZhbGVuaUFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tsYWR5OiBkYXRhLCAvL2lucHV0Lm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4geyByb2s6IGQucm9rLCBpY286IGQuaWNvLCBjaXNsbzogZC5jaXNsbyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXN1bHQ6IHsgcmVzdWx0OiB7IGRhdGE6IEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8sIGVycm9yczogeyBtZXNzYWdlOiBzdHJpbmcgfVtdLCBraW5kOiBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kIH1bXSB9KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8QWRhLkludGVyZmFjZS5HQWtjZUR0bz4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDogeyAvL3Bydm5pIGtyb2tcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiB1bmRlZmluZWQsIC8vIHByZWZhYiBmb3JtdVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJaw6F6bmFteSBrZSB6cHJhY292w6Fuw61cIiwgLy8gcG9waXNlayB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSwgLy9wcml6bmFrLCB6ZGEgem9icmF6aXQga3BpIHBhbmVsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU2NodsOhbGVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZENoYW5nZURlbGVnYXRlOiBmdW5jdGlvbiAodGhpczogR29yZGljLkVrby5Db21wb25lbnRzLkZpcnN0U3RlcDxHb3JkaWMuQWRhLkludGVyZmFjZS5HQWtjZUR0bz4sIGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkNvbXBvbmVudHMucnVuQ2hlY2tBY3Rpb24oZXYudGFyZ2V0LCB0aGlzLCBvYmoud2l6YXJkTW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246IFwiS29waWUgYWtjw61cIiwgLy8gcG9waXNla1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YToge30sXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiU2NodsOhbGl0XCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGlucHV0KSA9PiB7IC8vIGFrY2UgcHJvIGtvbnRyb2x1IGRhdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlQ29udGVudCA9IHRoYXQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZUhyb21hZG5lT3BlcmFjZVRhYlwiKTsgICAgICAgICAgLy8gc2VydmVyb3bDvSBvYmpla3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlQ29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoXCJMemVQcmlwcmF2YVNjaHZhbGVuaUFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva2xhZHk6IGlucHV0LCAvL2lucHV0Lm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4geyByb2s6IGQucm9rLCBpY286IGQuaWNvLCBjaXNsbzogZC5jaXNsbyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3VsdDogeyByZXN1bHQ6IHsgZGF0YTogQWRhLkludGVyZmFjZS5HQWtjZUR0bywgZXJyb3JzOiB7IG1lc3NhZ2U6IHN0cmluZyB9W10sIGtpbmQ6IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQgfVtdIH0pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8QWRhLkludGVyZmFjZS5HQWtjZUR0bz4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGlucHV0KSA9PiB7IC8vIGFrY2UgcHJvIHByZWNob2QgbWV6aSBrcm9reVxyXG4gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VydmljZUNvbnRlbnQgPSB0aGF0LmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VIcm9tYWRuZU9wZXJhY2VUYWJcIik7ICAgICAgICAgIC8vIHNlcnZlcm92w70gb2JqZWt0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYWxsKFwiUHJpcHJhdmFTY2h2YWxlbmlBa2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tsYWR5OiBpbnB1dCwgLy9pbnB1dC5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHsgcm9rOiBkLnJvaywgaWNvOiBkLmljbywgY2lzbG86IGQuY2lzbG8gfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXN1bHQ6IHsgcmVzdWx0OiB7IGRhdGE6IEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8sIGVycm9yczogeyBtZXNzYWdlOiBzdHJpbmcgfVtdLCBraW5kOiBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kIH1bXSB9KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDogLy8gcG9zbGVkbmkga3Jva1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDIgLSB6b2JyYXplbsOtIHbDvXNsZWRrdSBzdG9ybmFcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71zbGVkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiWnByYWNvdmFuw6kgesOhem5hbXlcIixcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB2eWJyYW5lUmFka3ksIC8vIGRhdGFcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7IC8vIGRlbGVnYXQsIGt0ZXJ5IHNlIHZvbGEgcG8gdWtvbmNlbmkgcHJ1dm9kY2VcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7fSwgeyB1cGRhdGVNb2RlOiBcInVwZGF0ZVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudmlld19JU0wucmVxdWVzdERhdGEoe30pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwiU2NodsOhbGVuw60gYWtjw61cIiB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgemFwbGFub3ZhdEFrY2kodnlicmFuZVJhZGt5OiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvW10pIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBjb25maXJtUXVlc3Rpb24gPSBcIlwiOyAvLyBwcm9tZW5uYSBuYSBwcmVub3MgbWV6aSBrcm9reVxyXG5cclxuICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwid2l6X3phcGxhbm92YW5pX2FrY2VcIixcclxuICAgICAgICAgICAgICAgIGtleXM6IHRoYXQudmlld19JU0wua2V5cywgLy8ga2xpY1xyXG5cclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCkuYWRkKHRoYXQuZmluZChcIi5qcy1TZXpuYW1Eb2tsYWR1UHJpcHJhdmFHZW5lcm92YW5pXCIpLmdncmlkPEdvcmRpYy5BZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBcImNvbHVtbnNcIj4oXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpIHx8IFtdKSwgLy9ncmlkZm9ybWF0XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJIcm9tYWRuw6kgemFwbMOhbm92w6Fuw60gYWtjw61cIiwgLy8gdGl0dWxla1xyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuXHJcbiAgICAgICAgICAgICAgICBwcmVDaGVja0FjdGlvbjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VydmljZUNvbnRlbnQgPSB0aGF0LmNyZWF0ZVNlcnZpY2VDb250ZW50KFwiR29yZGljLkFkYS5XZWJDbGllbnQuR0FrY2VIcm9tYWRuZU9wZXJhY2VUYWJcIik7ICAgICAgICAgIC8vIHNlcnZlcm92w70gb2JqZWt0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlQ29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChcIkx6ZVByaXByYXZhWmFwbGFub3ZhbmlBa2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogZGF0YSwgLy9pbnB1dC5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHsgcm9rOiBkLnJvaywgaWNvOiBkLmljbywgY2lzbG86IGQuY2lzbG8gfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzdWx0OiB7IHJlc3VsdDogeyBkYXRhOiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBlcnJvcnM6IHsgbWVzc2FnZTogc3RyaW5nIH1bXSwga2luZDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZCB9W10gfSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHsgLy9wcnZuaSBrcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogdW5kZWZpbmVkLCAvLyBwcmVmYWIgZm9ybXVcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiWsOhem5hbXkga2UgenByYWNvdsOhbsOtXCIsIC8vIHBvcGlzZWsgdGFidVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsIC8vcHJpem5haywgemRhIHpvYnJheml0IGtwaSBwYW5lbFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlphcGzDoW5vdsOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRDaGFuZ2VEZWxlZ2F0ZTogZnVuY3Rpb24gKHRoaXM6IEdvcmRpYy5Fa28uQ29tcG9uZW50cy5GaXJzdFN0ZXA8R29yZGljLkFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+LCBldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vR29yZGljLkVrby5Db21wb25lbnRzLnJ1bkNoZWNrQWN0aW9uKGV2LnRhcmdldCwgdGhpcywgb2JqLndpemFyZE1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiBcIktvcGllIGFrY8OtXCIsIC8vIHBvcGlzZWtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb25OYW1lOiBcIlphcGzDoW5vdmF0XCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGlucHV0KSA9PiB7IC8vIGFrY2UgcHJvIGtvbnRyb2x1IGRhdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXJ2aWNlQ29udGVudCA9IHRoYXQuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQWRhLldlYkNsaWVudC5HQWtjZUhyb21hZG5lT3BlcmFjZVRhYlwiKTsgICAgICAgICAgLy8gc2VydmVyb3bDvSBvYmpla3RcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlQ29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwoXCJMemVQcmlwcmF2YVphcGxhbm92YW5pQWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogaW5wdXQsIC8vaW5wdXQubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiB7IHJvazogZC5yb2ssIGljbzogZC5pY28sIGNpc2xvOiBkLmNpc2xvIH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzdWx0OiB7IHJlc3VsdDogeyBkYXRhOiBBZGEuSW50ZXJmYWNlLkdBa2NlRHRvLCBlcnJvcnM6IHsgbWVzc2FnZTogc3RyaW5nIH1bXSwga2luZDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZCB9W10gfSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxBZGEuSW50ZXJmYWNlLkdBa2NlRHRvPihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgaW5wdXQpID0+IHsgLy8gYWtjZSBwcm8gcHJlY2hvZCBtZXppIGtyb2t5XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcnZpY2VDb250ZW50ID0gdGhhdC5jcmVhdGVTZXJ2aWNlQ29udGVudChcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBa2NlSHJvbWFkbmVPcGVyYWNlVGFiXCIpOyAgICAgICAgICAvLyBzZXJ2ZXJvdsO9IG9iamVrdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VDb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2FsbChcIlByaXByYXZhWmFwbGFub3ZhbmlBa2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tsYWR5OiBpbnB1dCwgLy9pbnB1dC5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHsgcm9rOiBkLnJvaywgaWNvOiBkLmljbywgY2lzbG86IGQuY2lzbG8gfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXN1bHQ6IHsgcmVzdWx0OiB7IGRhdGE6IEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8sIGVycm9yczogeyBtZXNzYWdlOiBzdHJpbmcgfVtdLCBraW5kOiBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kIH1bXSB9KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPEFkYS5JbnRlcmZhY2UuR0FrY2VEdG8+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDogLy8gcG9zbGVkbmkga3Jva1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDIgLSB6b2JyYXplbsOtIHbDvXNsZWRrdSBzdG9ybmFcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71zbGVkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiWnByYWNvdmFuw6kgesOhem5hbXlcIixcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHZ5YnJhbmVSYWRreSwgLy8gZGF0YVxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKHZpZXcpID0+IHsgLy8gZGVsZWdhdCwga3Rlcnkgc2Ugdm9sYSBwbyB1a29uY2VuaSBwcnV2b2RjZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXdfSVNMLnJlcXVlc3REYXRhKHt9LCB7IHVwZGF0ZU1vZGU6IFwidXBkYXRlXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3X0lTTC5yZXF1ZXN0RGF0YSh7fSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgeyB0aXRsZTogXCJaYXBsw6Fub3ZhbsOtIGFrY8OtXCIgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==