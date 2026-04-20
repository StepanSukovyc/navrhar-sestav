"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSalda.ts                              </Name>
//    <Description> Okno sald určitého případu                                  </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-11-13                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GSalda = 
            //zavolat z jiného místa pomocí: that.navigate("Gordic.Ddp.WebClient.GSalda", { ID: "DDPGSalda#", Ixp: this.Ixp }); přičemž this.Ixp bude odpovídat aktualní ixp
            class GSalda extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    this.dtoPripad = {}; //dto
                    this.ixpFilter = {};
                    this.datumDo = new Date(Date.now()); //!"dd.MM.yyyy"
                    this.datumOd = new Date(this.datumDo.getFullYear(), 0, 1);
                    //salda display
                    this.subDataViews = {
                        napojene: new Gordic.Data.View(),
                        historicke: new Gordic.Data.View(),
                        opravne: new Gordic.Data.View()
                    };
                }
                //Program začíná zde, definice políček
                onDetailBuilderInit(builder) {
                    this.beginOperation({ id: "loadInitial", text: "Inicializace..." });
                    this.createActions();
                    this.menuBar([
                        { action: this.actions.actTisk, favorite: true },
                        { action: this.actions.actOtevriPrubehDluhu, favorite: true }
                    ]);
                    builder.withComponent("pripad", {
                        tabGroups: [
                            { id: "poplatnikGroup", caption: "Vybraný poplatník" },
                            { id: "historickeGroup", caption: "Historické předpisy a platby" },
                            { id: "navazaneGroup", caption: "Saldo navázaných poplatníků" },
                            { id: "opravneGroup", caption: "Opravné položky" },
                        ],
                        tabs: [
                            {
                                init: (el) => { this.createPredpisy(el); },
                                tabParams: {
                                    id: "tabPredpisy", title: "Předpisy",
                                    opened: true,
                                    group: {
                                        id: "poplatnikGroup"
                                    }
                                }
                            },
                            {
                                init: (el) => { this.createPlatby(el); },
                                tabParams: {
                                    id: "tabPlatby", title: "Platby",
                                    opened: true,
                                    group: {
                                        id: "poplatnikGroup"
                                    }
                                }
                            },
                            {
                                init: (el) => { this.createHistorickePolicka(el); },
                                tabParams: {
                                    id: "tabHistorickeSalda", title: "Salda",
                                    opened: true,
                                    group: {
                                        id: "historickeGroup"
                                    }
                                }
                            },
                            {
                                init: (el) => { this.createHistorickePredpisy(el); },
                                tabParams: {
                                    id: "tabHistorickePredpisy", title: "Předpisy",
                                    opened: true,
                                    group: {
                                        id: "historickeGroup"
                                    }
                                }
                            },
                            {
                                init: (el) => { this.createHistorickePlatby(el); },
                                tabParams: {
                                    id: "tabHistorickePlatby", title: "Platby",
                                    opened: true,
                                    group: {
                                        id: "historickeGroup"
                                    }
                                }
                            },
                            {
                                init: (el) => { this.createNavazane(el); },
                                tabParams: {
                                    id: "tabNapojene", title: "Saldo navázaných poplatníků",
                                    opened: true,
                                    group: {
                                        id: "navazaneGroup"
                                    },
                                    menuBar: [
                                        {
                                            action: this.actions["actOtevriPripad"],
                                            favorite: true
                                        },
                                        {
                                            action: this.actions["actOtevriSaldo"],
                                            favorite: true
                                        }
                                    ]
                                }
                            },
                            {
                                init: (el) => { this.createOpravne(el); },
                                tabParams: {
                                    id: "tabOpravne", title: "Opravné položky",
                                    opened: true,
                                    group: {
                                        id: "opravneGroup"
                                    }
                                }
                            }
                        ],
                        kpis: {
                            kpiStavUhrazeni: {
                                name: "kpiStavUhrazeni",
                                tooltip: "Stav k počátku",
                                primaryText: `Stav k počátku`,
                                secondaryText: "0.00",
                                itemTemplate: Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate().itemTemplate,
                            },
                            kpiPredpisy: {
                                name: "kpiPredpisy",
                                tooltip: "Předpisy",
                                primaryText: `Předpisy`,
                                secondaryText: "0.00",
                                itemTemplate: Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate().itemTemplate,
                            },
                            kpiPlatby: {
                                name: "kpiPlatby",
                                tooltip: "Platby",
                                primaryText: `Platby`,
                                secondaryText: "0.00",
                                itemTemplate: Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate().itemTemplate,
                            },
                            kpiSaldoCelkem: {
                                name: "kpiSaldoCelkem",
                                tooltip: "Saldo",
                                primaryText: `Saldo`,
                                secondaryText: "0.00",
                                itemTemplate: Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate().itemTemplate,
                            },
                        }
                    });
                }
                //Načte se jako drůhé a onContentReady následovně, seskládání formuláře z vytvořených políček v createHeaderForm
                onDetailBuilderBuild(builder) {
                    let formSetup = {};
                    let form = this.createHeaderForm();
                    formSetup[Gordic.Eko.HeaderForm.Sections.Info] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Id)[0]?.item, // IXP
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.AgendoveCislo)[0]?.item, // agendove číslo
                            form.form.sections[0].rows[2], // vs
                            form.form.sections[1].rows[2], // řádek
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            form.form.sections[1].rows[0], // typ phl
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.TypDokladu)[0]?.item, // typ dokladu            
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.DatumEvidence)[0]?.item, // datum evidence
                            form.form.sections[1].rows[3], // čtvrť
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Kniha)[0]?.item, // Kniha        
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Zpracovatel)[0]?.item, // Zpracovatel
                            form.form.sections[2].rows[2], // Odp. osoba
                            //Podmínky pro zobrazení správce podle příznaku priz_spr                 
                            form.form.sections[1].rows[1], // správce
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data3] = {
                        rows: [
                            form.form.sections[1].rows[4], // Adresa
                            form.form.sections[2].rows[3], // Výpočet salda - Radiobuttony
                            form.form.sections[2].rows[4], // Datum od/do 
                        ],
                        column: []
                    };
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                }
                onContentReady() {
                    var that = this;
                    this.taskId = "actGSalda";
                    this.title = `Účetní saldo případu ` + this.Ixp;
                    this.createActions();
                    that.isl.Pripad.read(rq => {
                        return {
                            data: { ixp: this.Ixp },
                            fragments: ["*", "ExterniSubjekt.Default", "Uroceni.*"]
                        };
                    })
                        .get().done((data) => {
                        this.dtoPripad = data.data;
                        this.endOperation({ id: "loadInitial" });
                        this.loadedData(); //kontrola zda se načetlo již vše
                        this.ziskejData(this.dtoPripad);
                    });
                    that.setBreadcrumbs([{
                            caption: "Saldo případu " + this.Ixp,
                            action: this.actions.actZavritPotomky,
                        }]);
                    this.loadedData();
                }
                //nastavení navigačního panelu
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actZavritPotomky: {
                            name: "zavritpotomky",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                        actOtevriPripad: {
                            name: "actOtevriPripad",
                            caption: "Případ",
                            //icon: "gi-print",
                            run: () => {
                                var selection = that.gridNavazane.ggrid("getSelection"); //Seznam zaškrtnutých řádků lze přečíst metodou getSelection()
                                if (selection.length != 0)
                                    //? je tady nutný mít typ_phl na vstupu pro otevření detailu případu ?
                                    WebClient.Common.Pripady.openPripadDetail(that, selection[0].ixp_pop);
                                //this.navigate('Gordic.Ddp.WebClient.GPripadDetail', { ID: "DDPGPripadDetail#", Ixp: selection[0].ixp_pop })
                            }
                        },
                        actOtevriSaldo: {
                            name: "actOtevriSaldo",
                            caption: "Saldo",
                            //icon: "gi-print",
                            run: () => {
                                var selection = that.gridNavazane.ggrid("getSelection"); //Seznam zaškrtnutých řádků lze přečíst metodou getSelection()
                                if (selection.length != 0)
                                    this.navigate('Gordic.Ddp.WebClient.GSalda', { ID: "DDPGSalda#", Ixp: selection[0].ixp_pop });
                            }
                        },
                        actTisk: {
                            name: "tisk",
                            caption: "Tisk",
                            tooltip: "Tisk statistik tisku",
                            icon: "gi-print",
                            run: () => {
                                this.tiskDokladu();
                            }
                        },
                        actOtevriPrubehDluhu: {
                            name: "actOtevriPrubehDluhu",
                            caption: "Průběh dluhu",
                            tooltip: "Otevření průběhu dluhu",
                            //icon: "gi-print",
                            run: () => {
                                that.navigate("Gordic.Ddp.WebClient.GPohybyPripadu", { ID: "DDPGPohybyPripadu#", ixp: this.Ixp, zobrazeni: this.vypocet, dat_od: this.dat_od, dat_do: this.dat_do });
                            }
                        }
                    });
                }
                //#region Vytvoření gridů
                //grid pro Předpisy, v sekci Vybraný poplatník
                createPredpisy(el) {
                    this.gridPredpisy = $("<div>")
                        .appendTo(el)
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: true,
                        },
                        name: "gridPlatby",
                        columns: WebClient.Common.GridFormats.SaldaPredpisy()
                    });
                }
                //grid pro Platby, v sekci Vybraný poplatník
                createPlatby(el) {
                    this.gridPlatby = $("<div>")
                        .appendTo(el)
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: true,
                        },
                        name: "gridPlatby",
                        columns: WebClient.Common.GridFormats.SaldaPlatby()
                    });
                }
                //grid pro Předpisy, v sekci Historické předpisy a platby
                createHistorickePredpisy(el) {
                    this.gridHistorickePredpisy = $("<div>")
                        .appendTo(el)
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: true,
                        },
                        columnMode: "full",
                        name: "gridHistorickePredpisy",
                        columns: WebClient.Common.GridFormats.SaldaHistorickePredpisy(),
                    });
                }
                //grid pro Platby, v sekci Historické předpisy a platby
                createHistorickePlatby(el) {
                    this.gridHistorickePlatby = $("<div>")
                        .appendTo(el)
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: true,
                        },
                        columnMode: "full",
                        name: "gridHistorickePlatby",
                        columns: WebClient.Common.GridFormats.SaldaHistorickePlatby(),
                    });
                }
                createHistorickePolicka(el) {
                    this.subDataViews.historicke = new Gordic.Data.View();
                    const dataView = new Gordic.Data.View([
                        {
                            title: "",
                            mode: "horizontal", //horizontal
                            zone: 0,
                            defaultSelected: false,
                            data: this.subDataViews.historicke
                        }
                    ]);
                    $("<div>").appendTo(el).gdashboardpanel({
                        data: dataView,
                        layout: "horizontal",
                        title: "Dashboard",
                        zones: 1,
                        sortable: true,
                    });
                    //odtranění headeru u dataView (je to škaredá černá čára)
                    var header = $(el).find('.gdashboardpanel__header');
                    header.remove();
                }
                //grid pro Napojené a VIEW pro salda, v sekci Saldo napojených poplatníků
                createNavazane(el) {
                    this.subDataViews.napojene = new Gordic.Data.View();
                    const dataView = new Gordic.Data.View([
                        {
                            title: "",
                            mode: "horizontal", //horizontal
                            zone: 0,
                            defaultSelected: false,
                            data: this.subDataViews.napojene
                        }
                    ]);
                    $("<div>").appendTo(el).gdashboardpanel({
                        data: dataView,
                        layout: "horizontal",
                        title: "Dashboard",
                        zones: 1,
                        sortable: true,
                    });
                    //odtranění headeru u dataView (je to škaredá černá čára)
                    var header = $(el).find('.gdashboardpanel__header');
                    header.remove();
                    this.gridNavazane = $("<div>")
                        .appendTo(el)
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: true,
                        },
                        name: "gridNavazane",
                        defaultAction: this.actions.actOtevriPripad,
                        columns: WebClient.Common.GridFormats.SaldaNapojene()
                    });
                }
                //grid pro Opravné položky
                createOpravne(el) {
                    this.subDataViews.opravne = new Gordic.Data.View();
                    const dataView = new Gordic.Data.View([
                        {
                            title: "",
                            mode: "horizontal", //horizontal
                            zone: 0,
                            defaultSelected: false,
                            data: this.subDataViews.opravne
                        }
                    ]);
                    $("<div>").appendTo(el).gdashboardpanel({
                        data: dataView,
                        layout: "horizontal",
                        title: "Dashboard",
                        zones: 1,
                        sortable: true,
                    });
                    //odtranění headeru u dataView (je to škaredá černá čára)
                    var header = $(el).find('.gdashboardpanel__header');
                    header.remove();
                    this.gridOpravne = $("<div>")
                        .appendTo(el)
                        .ggrid({
                        defaultProfile: {
                            condFormats: [
                                { description: "Snížení", formula: 'EQUALS(@ktg_upo, "1215")', text: Gordic.Components.Grid.CondFormats.CondFormatText.blue },
                                { description: "Snížení", formula: 'EQUALS(@ktg_upo, "1216")', text: Gordic.Components.Grid.CondFormats.CondFormatText.blue },
                            ]
                        },
                        name: "gridOpravne",
                        columns: WebClient.Common.GridFormats.SaldaOpravne(),
                    });
                }
                //#endregion
                //formulář hlavičky 
                createHeaderForm() {
                    var that = this;
                    //Definice Header Formu (údaje o případu)
                    let formSetup = {};
                    let hForm = new Gordic.Forms.Form()
                        //SEKCE 0
                        .addSection()
                        //ROW 0
                        .addRow("Agendové číslo")
                        .addField("gstringbox", "w-12", {
                        name: "ac" //agendové číslo
                    })
                        //ROW 1
                        .addRow("Datum evidence")
                        .addField("gdatebox", "w-12", {
                        name: "dat_evid" //datum evidence
                    })
                        //ROW 2
                        .addRow("Variablilní symbol")
                        .addField("gstringbox", "w-12", {
                        name: "vs", //vs
                        disabled: true,
                    })
                        //ROW 3
                        .addRow("Typ dokladu")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.sslstyp(), {
                        name: "ixs_typ", //typ dokladu
                        model: "model.ixs_typ=value.ixs_typ"
                    });
                    hForm
                        //sekce 1
                        .addSection()
                        //ROW 0
                        .addRow("Typ pohledávky")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ddpstpp(), {
                        name: "typ_phl",
                        model: "model.typ_phl=value.typ_phl",
                        disabled: true
                    })
                        //ROW 1
                        .addRow("Správce")
                        .addField("gstringbox", "w-12", {
                        name: "cis_spr",
                        disabled: true,
                    });
                    hForm
                        //ROW 2
                        .addRow(that.params.ddp_rdk_naz ?? "Řádek")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ciselnikRadku(), {
                        name: "ddp_radek",
                        model: "model.ixp_den=value.ixp_den,model.typ_phl=value.typ_phl,model.ddp_radek=value.ddp_radek",
                        disabled: true,
                        serverFilters: {
                            ixp_den: this.IxpDen,
                            typ_phl: this.TypPhl
                        }
                    })
                        //ROW 3
                        .addRow(that.params.ddp_ctv_naz ?? "Čtvrť")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ciselnikCtvrti(), {
                        name: "ddp_ctvrt",
                        model: "model.ixp_den=value.ixp_den,model.typ_phl=value.typ_phl,model.ddp_ctvrt=value.ddp_ctvrt",
                        disabled: true,
                        serverFilters: {
                            ixp_den: this.IxpDen,
                            typ_phl: this.TypPhl
                        }
                    })
                        //ROW 4               
                        .addRow("Adresa")
                        .addField("gselectbox", "w-12", {
                        name: "ixs_esu",
                        disabled: true,
                        model: "ixs_esu=ixs_esu;esu_dic=dic;model.lic=value.lic;model.por_zast=value.por_zast"
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu                       
                        Logovani: {
                            Ixp: this.Ixp ?? "", // zadání logovacích údaju je nutnost hlavně IXP
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
                            AktZnacka: (this.AC_AG == null ? this.Ixp : this.AC_AG),
                            DuvodHledaniTxt: "Detail Případu"
                        },
                    }))
                        //SEKCE 2
                        .addSection()
                        // ROW 0
                        .addRow("Kniha")
                        .addField("gselectbox", Gordic.Prefabs.Select.kniha(), {
                        name: "ixp_den",
                        model: "model.ixp_den=value.ixp_den"
                    })
                        // ROW 1
                        .addRow("Zpracovatel")
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        name: "ixs_fun_akt",
                        model: "model.ixs_fun_akt=value.ixs_fun",
                        dropdown: true
                    })
                        // ROW 2
                        .addRow("Odpovědná osoba")
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsref(), {
                        name: "ixs_ref_odp",
                        model: "model.ixs_ref_odp=value.ixs_ref",
                        disabled: true,
                        dropdown: true
                    })
                        // ROW 3
                        .addRow("Výpočet salda")
                        .addField("gradio", "w-3", {
                        name: "vypocet",
                        initialValue: 0,
                        radios: [
                            { value: 0, label: 'Splátkové' },
                            { value: 10, label: 'Účetní' },
                            { value: 20, label: 'Vymáhací' },
                        ],
                        change: function () {
                            that.ziskejData(that.dtoPripad);
                        }
                    })
                        .addField("gcheck", "w-3", {
                        name: "napojeno",
                        label: "Saldo včetně navázaných popl.",
                        change: function () {
                            that.ziskejData(that.dtoPripad);
                        }
                    })
                        // ROW 4
                        .addRow({ label: "Stav/Saldo k datu" })
                        .addField("gdatebox", "w-3", {
                        name: "stav_dat",
                        initialValue: that.input_dat_od ?? that.datumOd,
                        change: function () {
                            that.ziskejData(that.dtoPripad);
                        }
                    })
                        .addField("gdatebox", "w-3", {
                        name: "saldo_dat",
                        initialValue: that.input_dat_do ?? that.datumDo,
                        change: function () {
                            that.ziskejData(that.dtoPripad);
                        }
                    });
                    return hForm;
                }
                //kontrola zda jsou načteny data a následné naplnění formuláře
                loadedData() {
                    if (Object.keys(this.dtoPripad).length === 0) //pokud se nenačetl případ -> vrátím 0
                        return 0;
                    //načtení dat z DTO do formuláře
                    this.element.findForms("formHeader").findFields().gfield("model", "apply", this.dtoPripad);
                }
                //nastavení KPI okének 
                setKpis() {
                    let colorPocatku = "";
                    let colorCelkem = "";
                    if (this.saldoVymahani == null) {
                        //Barva sald, když není typ Vymahani
                        colorPocatku = this.saldoCelkem.SaldoStav > new Decimal(0) ? "ff0000" : "000000"; // red : black              
                        colorCelkem = this.saldoCelkem.Saldo > new Decimal(0) ? "ff0000" : "000000"; // red : black
                    }
                    else {
                        //Barva sald, když je typ Vymahani
                        colorPocatku = this.saldoVymahani?.SaldoStav > new Decimal(0) ? "ff0000" : "000000"; // red : black
                        colorCelkem = this.saldoVymahani?.Saldo > new Decimal(0) ? "ff0000" : "000000"; // red : black
                    }
                    var saldoVymahaniSaldoStav_str;
                    var saldoVymahaniPredpisy_str;
                    var saldoVymahaniPlatby_str;
                    var saldoVymahaniSaldo_str;
                    var saldoCelkemSaldoStav_str;
                    var saldoCelkemPredpisy_str;
                    var saldoCelkemPlatby_str;
                    var saldoCelkemSaldo_str;
                    if (this.saldoVymahani != null) {
                        saldoVymahaniSaldoStav_str = this.formatNumberWithSpacesAndDecimals(this.saldoVymahani.SaldoStav);
                        saldoVymahaniPredpisy_str = this.formatNumberWithSpacesAndDecimals(this.saldoVymahani.Predpisy);
                        saldoVymahaniPlatby_str = this.formatNumberWithSpacesAndDecimals(this.saldoVymahani.Platby);
                        saldoVymahaniSaldo_str = this.formatNumberWithSpacesAndDecimals(this.saldoVymahani.Saldo);
                    }
                    else {
                        saldoCelkemSaldoStav_str = this.formatNumberWithSpacesAndDecimals(this.saldoCelkem.SaldoStav);
                        saldoCelkemPredpisy_str = this.formatNumberWithSpacesAndDecimals(this.saldoCelkem.Predpisy);
                        saldoCelkemPlatby_str = this.formatNumberWithSpacesAndDecimals(this.saldoCelkem.Platby);
                        saldoCelkemSaldo_str = this.formatNumberWithSpacesAndDecimals(this.saldoCelkem.Saldo);
                    }
                    //Saldo počátku
                    this.kpis.kpiStavUhrazeni.primaryText = `Stav k počátku`;
                    this.kpis.kpiStavUhrazeni.secondaryText = `<span style="color: #${colorPocatku}">${saldoVymahaniSaldoStav_str || saldoCelkemSaldoStav_str}</span>`;
                    //Předpisy
                    this.kpis.kpiPredpisy.primaryText = `Předpisy za období`;
                    this.kpis.kpiPredpisy.secondaryText = `${saldoVymahaniPredpisy_str || saldoCelkemPredpisy_str}`;
                    //Platby
                    this.kpis.kpiPlatby.primaryText = `Platby za období`;
                    this.kpis.kpiPlatby.secondaryText = `${saldoVymahaniPlatby_str || saldoCelkemPlatby_str}`;
                    //Celkové saldo
                    this.kpis.kpiSaldoCelkem.primaryText = `Stav úhrady: <span style="color: #${colorCelkem}">${this.saldoVymahani?.Stav || this.saldoCelkem.Stav}</span>`;
                    this.kpis.kpiSaldoCelkem.secondaryText = `Celkové saldo: <span style="color: #${colorCelkem}">${saldoVymahaniSaldo_str || saldoCelkemSaldo_str}</span>`;
                    this.kpis.kpiSaldoCelkem.tooltip = this.saldoVymahani?.StavHint || this.saldoCelkem.StavHint;
                    //vynulování, aby data nezůstaly při změně typu
                    this.ziskejDataOpravne(this.ixpFilter, this.saldoCelkem?.Saldo || this.saldoVymahani?.Saldo);
                    this.saldoVymahani = null;
                    this.saldoCelkem = null;
                    this.predpisyCelkem = null;
                    this.platbyCelkem = null;
                    this.kpis?.update();
                }
                //získání sald ze serveru (gspg_ddp_saldo)
                getSalda() {
                    var that = this;
                    if (this.vypocet != 20) { //pokud Učetní/Splátkový režim
                        //Získání datumu o jedno menší než je dat od
                        var oneDayEarlier = new Date(this.dat_od);
                        oneDayEarlier.setDate(oneDayEarlier.getDate() - 1);
                        //získání celkového salda
                        that.isl.Salda.stavy({ ixp: this.Ixp, typ_salda: this.vypocet, napojene: this.napojeno, dat_salda_pocatku_vymahani: oneDayEarlier, dat_salda: this.dat_do, pocatekNap: this.pocatecniCelkemNapojene, predpisyNap: this.predpisyCelkemNapojene, platbyNap: this.platbyCelkemNapojene, celkemNap: this.celkemNapojene }).get()
                            .done((data) => {
                            this.saldoCelkem = data;
                            this.setKpis();
                        });
                    }
                    else { //pokud Vymáhací režim
                        //získání sald
                        that.isl.Salda.stavy({ ixp: this.Ixp, typ_salda: this.vypocet, napojene: this.napojeno, dat_salda_pocatku_vymahani: this.dat_od, dat_salda: this.dat_do, pocatekNap: this.pocatecniCelkemNapojene, predpisyNap: this.predpisyCelkemNapojene, platbyNap: this.platbyCelkemNapojene, celkemNap: this.celkemNapojene }).get()
                            .done((data) => {
                            this.saldoVymahani = data;
                            this.setKpis();
                        });
                    }
                }
                //vypočítání celkových napojených sald a kosmetické úpravy
                vypocitatNapojene(data) {
                    this.predpisyCelkemNapojene = 0;
                    this.platbyCelkemNapojene = 0;
                    this.celkemNapojene = 0;
                    this.pocatecniCelkemNapojene = 0;
                    for (let i = 0; i < data.length; i++) {
                        this.pocatecniCelkemNapojene += parseFloat(data[i].saldo_pocatecni);
                        this.predpisyCelkemNapojene += parseFloat(data[i].saldo_predpisy);
                        this.platbyCelkemNapojene += parseFloat(data[i].saldo_platby);
                        this.celkemNapojene += parseFloat(data[i].saldo_celkove);
                    }
                    var colorPocatku;
                    var colorCelkem;
                    //Barva sald, zda jsou zaplacena či ne
                    colorPocatku = this.pocatecniCelkemNapojene > new Decimal(0) ? "ff0000" : "000000"; // red : black
                    colorCelkem = this.celkemNapojene > new Decimal(0) ? "ff0000" : "000000"; // red : black
                    //text stavu celkového salda            
                    var stavSalda;
                    if (this.celkemNapojene > 0)
                        stavSalda = "Nedoplatek";
                    else if (this.celkemNapojene < 0)
                        stavSalda = "Přeplatek";
                    else if (this.celkemNapojene == 0 && this.predpisyCelkemNapojene != 0 && this.platbyCelkemNapojene != 0)
                        stavSalda = "Zaplaceno";
                    else
                        stavSalda = "";
                    var pocatecniCelkemNapojene_str = this.formatNumberWithSpacesAndDecimals(this.pocatecniCelkemNapojene);
                    var predpisyCelkemNapojene_str = this.formatNumberWithSpacesAndDecimals(this.predpisyCelkemNapojene);
                    var platbyCelkemNapojene_str = this.formatNumberWithSpacesAndDecimals(this.platbyCelkemNapojene);
                    var celkemNapojene_str = this.formatNumberWithSpacesAndDecimals(this.celkemNapojene);
                    //vložení výpočtů do okének
                    this.subDataViews.napojene.updateData([
                        {
                            title: "Stav k datu celkem",
                            id: "pocatecni_celkem",
                            value: `<span style="color: #${colorPocatku}">${pocatecniCelkemNapojene_str}</span>`
                        },
                        {
                            title: "Předpisy celkem",
                            id: "predpisy_celkem",
                            value: predpisyCelkemNapojene_str
                        },
                        {
                            title: "Platby celkem",
                            id: "platby_celkem",
                            value: platbyCelkemNapojene_str
                        },
                        {
                            title: `Stav úhrady: <span style="color: #${colorCelkem}">${stavSalda}</span>`,
                            id: "saldo_celkem",
                            value: `Celkové saldo napojených: <span style="color: #${colorCelkem}">${celkemNapojene_str}</span>`
                        },
                    ]);
                    //spodní část okénka normální tloušťka fontu
                    $(".g-kpi-multirow-body-value span").css("font-weight", "normal");
                }
                //zobrazení celkových historických sald a kosmetické úpravy
                zobrazitHistoricke(predpisy, platby, celkem) {
                    if (celkem == null) {
                        predpisy = 0;
                        platby = 0;
                        celkem = 0;
                    }
                    var colorCelkem;
                    //Barva sald, zda jsou zaplacena či ne
                    colorCelkem = celkem > new Decimal(0) ? "ff0000" : "000000"; // red : black
                    //text stavu celkového salda
                    var stavSalda;
                    if (celkem > 0)
                        stavSalda = "Nedoplatek";
                    else if (celkem < 0)
                        stavSalda = "Přeplatek";
                    else if (celkem == 0 && predpisy != 0 && platby != 0)
                        stavSalda = "Zaplaceno";
                    else
                        stavSalda = "";
                    var predpisy_str = this.formatNumberWithSpacesAndDecimals(predpisy);
                    var platby_str = this.formatNumberWithSpacesAndDecimals(platby);
                    var celkem_str = this.formatNumberWithSpacesAndDecimals(celkem);
                    //vložení výpočtů do okének
                    this.subDataViews.historicke.updateData([
                        {
                            title: "Předpisy celkem",
                            id: "historicke_predpisy",
                            value: predpisy_str
                        },
                        {
                            title: "Platby celkem",
                            id: "historicke_platby",
                            value: platby_str
                        },
                        {
                            title: `Stav úhrady: <span style="color: #${colorCelkem}">${stavSalda}</span>`,
                            id: "historicke_celkem",
                            value: `Saldo historie: <span style="color: #${colorCelkem}">${celkem_str}</span>`
                        },
                    ]);
                    //spodní část okénka normální tloušťka fontu
                    $(".g-kpi-multirow-body-value span").css("font-weight", "normal");
                }
                //zobrazení celkových historických sald a kosmetické úpravy
                zobrazitOpravne(opravne, saldo_celkem) {
                    if (opravne == null) {
                        opravne = 0;
                        saldo_celkem = 0;
                    }
                    var celkem = Number(saldo_celkem) - opravne;
                    var opravne_str = this.formatNumberWithSpacesAndDecimals(opravne);
                    var celkem_str = this.formatNumberWithSpacesAndDecimals(celkem);
                    //vložení výpočtů do okének
                    this.subDataViews.opravne.updateData([
                        {
                            title: "Opravné položky celkem",
                            id: "opravne_celkem",
                            value: opravne_str
                        },
                        {
                            title: "Saldo bez opravných položek",
                            id: "bez_opravne_celkem",
                            value: celkem_str
                        }
                    ]);
                    //spodní část okénka normální tloušťka fontu
                    $(".g-kpi-multirow-body-value span").css("font-weight", "normal");
                    this.endOperation({ id: "loadData" });
                }
                //získání dat ze serveru a naplnění gridu a celkove castky 
                ziskejData(filter) {
                    var that = this;
                    that.beginOperation({ id: "loadData", text: "Získávání dat..." });
                    this.dat_od = this.element.findForms("formHeader").findFields("stav_dat").gfield("getValue");
                    this.dat_do = this.element.findForms("formHeader").findFields("saldo_dat").gfield("getValue");
                    this.vypocet = this.element.findForms("formHeader").findFields("vypocet").gfield("getValue");
                    this.napojeno = this.element.findForms("formHeader").findFields("napojeno").gfield("getValue");
                    if (this.dat_od != undefined && this.dat_do != undefined) {
                        that.view = 1;
                        if (this.dat_od > this.dat_do) {
                            var pomocna = this.dat_od;
                            this.dat_od = this.dat_do;
                            this.dat_do = pomocna;
                        }
                        //filtr pro server
                        this.ixpFilter.ixp = filter.ixp;
                        this.ixpFilter.dat_od = this.dat_od;
                        this.ixpFilter.dat_do = this.dat_do;
                        this.ixpFilter.vypocet = this.vypocet;
                        //získání dat a naplnění griddu Vybraný poplatník - Předpisy
                        that.isl.Salda.saldoPredpisy(() => {
                            return {
                                filters: that.ixpFilter
                            };
                        }).get().done(function (dto) {
                            that.view = new Gordic.Data.View(dto.data);
                            that.gridPredpisy.ggrid("setData", that.view);
                        });
                        //získání dat a naplnění gridu Vybraný poplatník - Platby
                        that.isl.Salda.saldoPlatby(() => {
                            return {
                                filters: that.ixpFilter
                            };
                        }).get().done(function (dto) {
                            that.view = new Gordic.Data.View(dto.data);
                            that.gridPlatby.ggrid("setData", that.view);
                            that.ziskejDataNavazovane(that.ixpFilter);
                        });
                        //získání dat a naplnění gridu Historické platby a předpisy - Předpisy
                        that.isl.Salda.saldoHistorickePredpisy(() => {
                            return {
                                filters: that.ixpFilter
                            };
                        }).get().done(function (dto) {
                            that.view = new Gordic.Data.View(dto.data);
                            that.gridHistorickePredpisy.ggrid("setData", that.view);
                        });
                        //získání dat a naplnění gridu Historické platby a předpisy - Platby
                        that.isl.Salda.saldoHistorickePlatby(() => {
                            return {
                                filters: that.ixpFilter
                            };
                        }).get().done(function (dto) {
                            that.view = new Gordic.Data.View(dto.data);
                            if (dto.data.length != 0) { //pokud nejsou žádné data nebudu pracovat s daty
                                that.predpisyCelkemHistoricke = dto.data[0].saldo_hist_predpisy;
                                that.platbyCelkemHistoricke = dto.data[0].saldo_hist_platby;
                                that.celkemHistoricke = dto.data[0].saldo_hist_celkem;
                            }
                            //that.endOperation({ id: "loadData" });
                            that.zobrazitHistoricke(that.predpisyCelkemHistoricke, that.platbyCelkemHistoricke, that.celkemHistoricke);
                            that.gridHistorickePlatby.ggrid("setData", that.view);
                        });
                    }
                    else { //pokud je prázdný datum, vynulovat políčka
                        that.view = 0;
                        that.gridPredpisy.ggrid("setData", []);
                        that.gridPlatby.ggrid("setData", []);
                        that.gridNavazane.ggrid("setData", []);
                        that.gridHistorickePlatby.ggrid("setData", []);
                        that.gridHistorickePredpisy.ggrid("setData", []);
                        that.gridOpravne.ggrid("setData", []);
                        that.subDataViews.historicke.updateData([
                            {
                                title: "Předpisy celkem",
                                id: "historicke_predpisy",
                                value: 0
                            },
                            {
                                title: "Platby celkem",
                                id: "historicke_platby",
                                value: 0
                            },
                            {
                                title: `Stav úhrady: <span style="color: red">neplatné datum</span>`,
                                id: "historicke_celkem",
                                value: 0
                            },
                        ]);
                        that.subDataViews.napojene.updateData([
                            {
                                title: "Stav k datu celkem",
                                id: "pocatecni_celkem",
                                value: 0
                            },
                            {
                                title: "Předpisy celkem",
                                id: "predpisy_celkem",
                                value: 0
                            },
                            {
                                title: "Platby celkem",
                                id: "platby_celkem",
                                value: 0
                            },
                            {
                                title: `Stav úhrady: <span style="color: red">neplatné datum</span>`,
                                id: "saldo_celkem",
                                value: 0
                            },
                        ]);
                        that.subDataViews.opravne.updateData([
                            {
                                title: "Opravné položky celkem",
                                id: "opravne_celkem",
                                value: 0
                            },
                            {
                                title: "Saldo bez opravných položek",
                                id: "bez_opravne_celkem",
                                value: 0
                            }
                        ]);
                        this.kpis.kpiStavUhrazeni.secondaryText = "0";
                        this.kpis.kpiPredpisy.secondaryText = "0";
                        this.kpis.kpiPlatby.secondaryText = "0";
                        this.kpis.kpiSaldoCelkem.primaryText = `Stav úhrady: <span style="color: red">neplatné datum</span>`;
                        this.kpis.kpiSaldoCelkem.secondaryText = "0";
                        this.kpis.kpiSaldoCelkem.tooltip = "Není zadáno datum";
                        this.kpis?.update();
                        this.endOperation({ id: "loadData" });
                    }
                }
                //získání dat ze serveru a naplnění gridu a celkove castky 
                ziskejDataNavazovane(ixpFilter) {
                    var that = this;
                    //získání navazovaných dat pro hlavní saldo a naplnění gridu Saldo navazovaných poplatníků
                    that.isl.Salda.saldoNavazovane(() => {
                        return {
                            filters: ixpFilter
                        };
                    }).get().done(function (dto) {
                        that.view = new Gordic.Data.View(dto.data);
                        that.gridNavazane.ggrid("setData", that.view);
                        that.vypocitatNapojene(dto.data); //vypočítání napojených sald   
                        that.getSalda();
                    });
                }
                //získání dat ze serveru a naplnění gridu a celkove castky 
                ziskejDataOpravne(ixpFilter, saldo_celkem) {
                    var that = this;
                    //získání opravných dat pro naplnění gridu Opravné položky
                    that.isl.Salda.saldoOpravne(() => {
                        return {
                            filters: ixpFilter
                        };
                    }).get().done(function (dto) {
                        that.view = new Gordic.Data.View(dto.data);
                        that.gridOpravne.ggrid("setData", that.view);
                        if (dto.data.length != 0)
                            that.zobrazitOpravne(dto.data[0].saldo_opravne, saldo_celkem); //zobrazení opravných sald
                        else
                            that.zobrazitOpravne(null, saldo_celkem);
                    });
                }
                //formátování sald
                formatNumberWithSpacesAndDecimals(number) {
                    const formattedNumber = new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(number);
                    return formattedNumber.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ',');
                }
                tiskDokladu() {
                    var that = this;
                    if (this.view != 0) {
                        var nap = that.napojeno ? 1 : 0; //převod false na 0 a true na 1
                        var vyp = 1;
                        if (that.vypocet == 10)
                            vyp = 0;
                        else if (that.vypocet == 20)
                            vyp = 2;
                        const actTiskSald = GAction.createPrintAction({
                            name: "actTiskSald",
                            tema: "ddp_ptm_saldo",
                            // ↓ Metoda, která je zavolána těsně před generováním sestavy a kde lze na straně serveru ovlivnit parametry sestavy ↓
                            serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:Salda", //zde se plní téma
                            reportStarting: function (rep) {
                                rep.customDto = {
                                    ixp: that.ixpFilter.ixp,
                                    datumOd: that.dat_od,
                                    datumDo: that.dat_do,
                                    napojeno: nap,
                                    vypocet: vyp,
                                    ixp_den: that.IxpDen,
                                    rok_den: that.RokDen
                                };
                            }
                        });
                        actTiskSald.run();
                    }
                    else {
                        this.showFlash("Nejsou načtena žádná data", "error");
                    }
                }
            };
            GSalda = __decorate([
                Decorators.gcontent
                //zavolat z jiného místa pomocí: that.navigate("Gordic.Ddp.WebClient.GSalda", { ID: "DDPGSalda#", Ixp: this.Ixp }); přičemž this.Ixp bude odpovídat aktualní ixp
            ], GSalda);
            WebClient.GSalda = GSalda;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NhbGRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1NhbGRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7QUFDakIsSUFBVSxNQUFNLENBaW1DZjtBQWptQ0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaW1DbkI7SUFqbUNnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpbUM3QjtRQWptQ29CLFdBQUEsU0FBUztZQUsxQixJQUFhLE1BQU07WUFEbkIsZ0tBQWdLO1lBQ2hLLE1BQWEsTUFBTyxTQUFRLE9BQUEscUJBQXFCO2dCQUFqRDs7b0JBRVksY0FBUyxHQUEyQyxFQUFFLENBQUMsQ0FBRyxLQUFLO29CQVEvRCxjQUFTLEdBQVEsRUFBRSxDQUFDO29CQWdCckIsWUFBTyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUEsZUFBZTtvQkFDOUMsWUFBTyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQXVCNUQsZUFBZTtvQkFDUixpQkFBWSxHQUFHO3dCQUNsQixRQUFRLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTt3QkFDaEMsVUFBVSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7d0JBQ2xDLE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO3FCQUNsQyxDQUFDO2dCQW9pQ04sQ0FBQztnQkEvaENHLHNDQUFzQztnQkFDdEMsbUJBQW1CLENBQUMsT0FBZ0Q7b0JBQ2hFLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFF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QXFCLEVBQUUsd0NBQXdDLEVBQUcsa0JBQWtCOzRCQUNwRixjQUFjLEVBQUUsVUFBVSxHQUFHO2dDQUN6QixHQUFHLENBQUMsU0FBUyxHQUFHO29DQUNaLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUc7b0NBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTTtvQ0FDcEIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNO29DQUNwQixRQUFRLEVBQUUsR0FBRztvQ0FDYixPQUFPLEVBQUUsR0FBRztvQ0FDWixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU07b0NBQ3BCLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTTtpQ0FDdkIsQ0FBQTs0QkFDTCxDQUFDO3lCQUNKLENBQUMsQ0FBQzt3QkFDSCxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3RCLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsU0FBUyxDQUFDLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN6RCxDQUFDO2dCQUNMLENBQUM7YUFDSixDQUFBO1lBM2xDWSxNQUFNO2dCQUhsQixVQUFVLENBQUMsUUFBUTtnQkFFcEIsZ0tBQWdLO2VBQ25KLE1BQU0sQ0EybENsQjtZQTNsQ1ksZ0JBQU0sU0EybENsQixDQUFBO1FBQ0wsQ0FBQyxFQWptQ29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWltQzdCO0lBQUQsQ0FBQyxFQWptQ2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWltQ25CO0FBQUQsQ0FBQyxFQWptQ1MsTUFBTSxLQUFOLE1BQU0sUUFpbUNmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTYWxkYS50cyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHNhbGQgdXLEjWl0w6lobyBwxZnDrXBhZHUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICB2Y2VjaCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjMgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0xMS0xMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICAgICAgXHJcbiAgICAvL3phdm9sYXQgeiBqaW7DqWhvIG3DrXN0YSBwb21vY8OtOiB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1NhbGRhXCIsIHsgSUQ6IFwiRERQR1NhbGRhI1wiLCBJeHA6IHRoaXMuSXhwIH0pOyBwxZlpxI1lbcW+IHRoaXMuSXhwIGJ1ZGUgb2Rwb3bDrWRhdCBha3R1YWxuw60gaXhwXHJcbiAgICBleHBvcnQgY2xhc3MgR1NhbGRhIGV4dGVuZHMgR0RldGFpbEJ1aWxkZXJDb250ZW50IHsgICAgXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OyAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgZHRvUHJpcGFkOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0byA9IHt9OyAgIC8vZHRvXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkUHJlZHBpc3k6IEpRdWVyeTxIVE1MRWxlbWVudD47ICAvL2dyaWQgc2FsZCBwxZllZHBpc3lcclxuICAgICAgICBwcml2YXRlIGdyaWRQbGF0Ynk6IEpRdWVyeTxIVE1MRWxlbWVudD47ICAvL2dyaWQgc2FsZCBwbGF0ZWJcclxuICAgICAgICBwcml2YXRlIGdyaWRIaXN0b3JpY2tlUHJlZHBpc3k6IEpRdWVyeTxIVE1MRWxlbWVudD47ICAvL2dyaWQgc2FsZCBoaXN0b3JpY2vDqSBwxZllZHBpc3lcclxuICAgICAgICBwcml2YXRlIGdyaWRIaXN0b3JpY2tlUGxhdGJ5OiBKUXVlcnk8SFRNTEVsZW1lbnQ+OyAgLy9ncmlkIHNhbGQgaGlzdG9yaWNrw6kgcGxhdGViXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkTmF2YXphbmU6IEpRdWVyeTxIVE1MRWxlbWVudD47ICAvL2dyaWQgc2FsZCBuYXbDoXphbsO9Y2hcclxuICAgICAgICBwcml2YXRlIGdyaWRPcHJhdm5lOiBKUXVlcnk8SFRNTEVsZW1lbnQ+OyAgLy9ncmlkIG9wcmF2bsO9Y2ggcG9sb8W+ZWtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpeHBGaWx0ZXI6IGFueSA9IHt9O1xyXG5cclxuICAgICAgICBJeHA6IHN0cmluZztcclxuICAgICAgICBJeHBEZW46IHN0cmluZztcclxuICAgICAgICBSb2tEZW46IG51bWJlcjtcclxuICAgICAgICBUeXBQaGw6IHN0cmluZztcclxuICAgICAgICBBQ19BRzogc3RyaW5nXHJcblxyXG4gICAgICAgIHB1YmxpYyBkYXRfb2Q7XHJcbiAgICAgICAgcHVibGljIGRhdF9kbztcclxuICAgICAgICBwdWJsaWMgdnlwb2NldDtcclxuICAgICAgICBwdWJsaWMgbmFwb2plbm87XHJcblxyXG4gICAgICAgIGlucHV0X2RhdF9vZDtcclxuICAgICAgICBpbnB1dF9kYXRfZG87XHJcblxyXG4gICAgICAgIHB1YmxpYyBkYXR1bURvID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7Ly8hXCJkZC5NTS55eXl5XCJcclxuICAgICAgICBwdWJsaWMgZGF0dW1PZCA9IG5ldyBEYXRlKHRoaXMuZGF0dW1Eby5nZXRGdWxsWWVhcigpLCAwLCAxKTsgICAgIFxyXG5cclxuICAgICAgICAvL3NhbGRhICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBwcmVkcGlzeUNlbGtlbTtcclxuICAgICAgICBwdWJsaWMgcGxhdGJ5Q2Vsa2VtO1xyXG4gICAgICAgIHB1YmxpYyBzYWxkb0NlbGtlbTtcclxuICAgICAgICBwdWJsaWMgc2FsZG9WeW1haGFuaTtcclxuXHJcbiAgICAgICAgLy9zYWxkYSBuYXBvamVuw6kgICAgICAgXHJcbiAgICAgICAgcHVibGljIHByZWRwaXN5Q2Vsa2VtTmFwb2plbmU7XHJcbiAgICAgICAgcHVibGljIHBsYXRieUNlbGtlbU5hcG9qZW5lO1xyXG4gICAgICAgIHB1YmxpYyBjZWxrZW1OYXBvamVuZTtcclxuICAgICAgICBwdWJsaWMgcG9jYXRlY25pQ2Vsa2VtTmFwb2plbmU7XHJcblxyXG4gICAgICAgIC8vc2FsZGEgbmFwb2plbsOpICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBwcmVkcGlzeUNlbGtlbUhpc3Rvcmlja2U7XHJcbiAgICAgICAgcHVibGljIHBsYXRieUNlbGtlbUhpc3Rvcmlja2U7XHJcbiAgICAgICAgcHVibGljIGNlbGtlbUhpc3Rvcmlja2U7XHJcblxyXG4gICAgICAgIC8vc2FsZGEgb3ByYXZuw6kgICAgICAgXHJcbiAgICAgICAgcHVibGljIGNlbGtlbU9wcmF2bmU7XHJcbiAgICAgICAgcHVibGljIGNlbGtvdmVTYWxkb1Byb09wcmF2bmU7XHJcblxyXG4gICAgICAgIC8vc2FsZGEgZGlzcGxheVxyXG4gICAgICAgIHB1YmxpYyBzdWJEYXRhVmlld3MgPSB7XHJcbiAgICAgICAgICAgIG5hcG9qZW5lOiBuZXcgR29yZGljLkRhdGEuVmlldygpLFxyXG4gICAgICAgICAgICBoaXN0b3JpY2tlOiBuZXcgR29yZGljLkRhdGEuVmlldygpLFxyXG4gICAgICAgICAgICBvcHJhdm5lOiBuZXcgR29yZGljLkRhdGEuVmlldygpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqIHBhcmFtZXRyeSBwcm8gdHlwIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgcGFyYW1zOiBhbnk7XHJcblxyXG4gICAgICAgIC8vUHJvZ3JhbSB6YcSNw61uw6EgemRlLCBkZWZpbmljZSBwb2zDrcSNZWtcclxuICAgICAgICBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibG9hZEluaXRpYWxcIiwgdGV4dDogXCJJbmljaWFsaXphY2UuLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RUaXNrLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RPdGV2cmlQcnViZWhEbHVodSwgZmF2b3JpdGU6IHRydWUgfSBcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQoXCJwcmlwYWRcIiwge1xyXG4gICAgICAgICAgICAgICAgdGFiR3JvdXBzOiBbIFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwicG9wbGF0bmlrR3JvdXBcIiwgY2FwdGlvbjogXCJWeWJyYW7DvSBwb3BsYXRuw61rXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImhpc3Rvcmlja2VHcm91cFwiLCBjYXB0aW9uOiBcIkhpc3Rvcmlja8OpIHDFmWVkcGlzeSBhIHBsYXRieVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJuYXZhemFuZUdyb3VwXCIsIGNhcHRpb246IFwiU2FsZG8gbmF2w6F6YW7DvWNoIHBvcGxhdG7DrWvFr1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJvcHJhdm5lR3JvdXBcIiwgY2FwdGlvbjogXCJPcHJhdm7DqSBwb2xvxb5reVwiIH0sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdGFiczogWyBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IChlbCkgPT4geyB0aGlzLmNyZWF0ZVByZWRwaXN5KGVsKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRhYlByZWRwaXN5XCIsIHRpdGxlOiBcIlDFmWVkcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwb3BsYXRuaWtHcm91cFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogKGVsKSA9PiB7IHRoaXMuY3JlYXRlUGxhdGJ5KGVsKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YWJQbGF0YnlcIiwgdGl0bGU6IFwiUGxhdGJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInBvcGxhdG5pa0dyb3VwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiAoZWwpID0+IHsgdGhpcy5jcmVhdGVIaXN0b3JpY2tlUG9saWNrYShlbCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGFiSGlzdG9yaWNrZVNhbGRhXCIsIHRpdGxlOiBcIlNhbGRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImhpc3Rvcmlja2VHcm91cFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogKGVsKSA9PiB7IHRoaXMuY3JlYXRlSGlzdG9yaWNrZVByZWRwaXN5KGVsKTsgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGFiSGlzdG9yaWNrZVByZWRwaXN5XCIsIHRpdGxlOiBcIlDFmWVkcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJoaXN0b3JpY2tlR3JvdXBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IChlbCkgPT4geyB0aGlzLmNyZWF0ZUhpc3Rvcmlja2VQbGF0YnkoZWwpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRhYkhpc3Rvcmlja2VQbGF0YnlcIiwgdGl0bGU6IFwiUGxhdGJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImhpc3Rvcmlja2VHcm91cFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogKGVsKSA9PiB7IHRoaXMuY3JlYXRlTmF2YXphbmUoZWwpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRhYk5hcG9qZW5lXCIsIHRpdGxlOiBcIlNhbGRvIG5hdsOhemFuw71jaCBwb3BsYXRuw61rxa9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmF2YXphbmVHcm91cFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zW1wiYWN0T3RldnJpUHJpcGFkXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uc1tcImFjdE90ZXZyaVNhbGRvXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiAoZWwpID0+IHsgdGhpcy5jcmVhdGVPcHJhdm5lKGVsKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YWJPcHJhdm5lXCIsIHRpdGxlOiBcIk9wcmF2bsOpIHBvbG/Fvmt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm9wcmF2bmVHcm91cFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAga3Bpczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGtwaVN0YXZVaHJhemVuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtwaVN0YXZVaHJhemVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlN0YXYgayBwb8SNw6F0a3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeVRleHQ6IGBTdGF2IGsgcG/EjcOhdGt1YCwgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0OiBcIjAuMDBcIiwgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaUljb25Ud29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLCAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGtwaVByZWRwaXN5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3BpUHJlZHBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQxZllZHBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeVRleHQ6IGBQxZllZHBpc3lgLCAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0OiBcIjAuMDBcIiwgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpSWNvblR3b1Jvd3NUZXh0VGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBrcGlQbGF0Ynk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrcGlQbGF0YnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQbGF0YnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeVRleHQ6IGBQbGF0YnlgLCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dDogXCIwLjAwXCIsICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlJY29uVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGtwaVNhbGRvQ2Vsa2VtOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3BpU2FsZG9DZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJTYWxkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dDogYFNhbGRvYCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dDogXCIwLjAwXCIsICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpSWNvblR3b1Jvd3NUZXh0VGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vTmHEjXRlIHNlIGpha28gZHLFr2jDqSBhIG9uQ29udGVudFJlYWR5IG7DoXNsZWRvdm7Emywgc2Vza2zDoWTDoW7DrSBmb3JtdWzDocWZZSB6IHZ5dHZvxZllbsO9Y2ggcG9sw63EjWVrIHYgY3JlYXRlSGVhZGVyRm9ybVxyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcikge1xyXG4gICAgICAgICAgICBsZXQgZm9ybVNldHVwID0ge307XHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gdGhpcy5jcmVhdGVIZWFkZXJGb3JtKCk7XHJcblxyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlNlY3Rpb25zLkluZm9dID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5JZClbMF0/Lml0ZW0sIC8vIElYUFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5BZ2VuZG92ZUNpc2xvKVswXT8uaXRlbSwgLy8gYWdlbmRvdmUgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVswXS5yb3dzIVsyXSwgLy8gdnNcclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbMl0sIC8vIMWZw6FkZWtcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMV0gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzFdLnJvd3MhWzBdLCAvLyB0eXAgcGhsXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLlR5cERva2xhZHUpWzBdPy5pdGVtLCAvLyB0eXAgZG9rbGFkdSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5EYXR1bUV2aWRlbmNlKVswXT8uaXRlbSwgLy8gZGF0dW0gZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbM10sIC8vIMSNdHZyxaVcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMl0gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLktuaWhhKVswXT8uaXRlbSwgLy8gS25paGEgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5acHJhY292YXRlbClbMF0/Lml0ZW0sIC8vIFpwcmFjb3ZhdGVsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzJdLnJvd3MhWzJdLCAvLyBPZHAuIG9zb2JhXHJcbiAgICAgICAgICAgICAgICAgICAgLy9Qb2Rtw61ua3kgcHJvIHpvYnJhemVuw60gc3Byw6F2Y2UgcG9kbGUgcMWZw616bmFrdSBwcml6X3NwciAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzFdLnJvd3MhWzFdLCAvLyBzcHLDoXZjZVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1TZWN0aW9uO1xyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlNlY3Rpb25zLkRhdGEzXSA9IHtcclxuICAgICAgICAgICAgICAgIHJvd3M6IFtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbNF0sIC8vIEFkcmVzYVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVsyXS5yb3dzIVszXSwgLy8gVsO9cG/EjWV0IHNhbGRhIC0gUmFkaW9idXR0b255XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzJdLnJvd3MhWzRdLCAvLyBEYXR1bSBvZC9kbyBcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBjb2x1bW46IFtdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247ICBcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5zZXR1cChidWlsZGVyLCBmb3JtU2V0dXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy50YXNrSWQgPSBcImFjdEdTYWxkYVwiO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gYMOaxI1ldG7DrSBzYWxkbyBwxZnDrXBhZHUgYCArIHRoaXMuSXhwO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZC5yZWFkKHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBpeHA6IHRoaXMuSXhwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCIqXCIsIFwiRXh0ZXJuaVN1Ympla3QuRGVmYXVsdFwiLCBcIlVyb2NlbmkuKlwiXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmR0b1ByaXBhZCA9IGRhdGEuZGF0YTsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZEluaXRpYWxcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZERhdGEoKTsgLy9rb250cm9sYSB6ZGEgc2UgbmHEjWV0bG8gamnFviB2xaFlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56aXNrZWpEYXRhKHRoaXMuZHRvUHJpcGFkKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGF0LnNldEJyZWFkY3J1bWJzKFt7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNhbGRvIHDFmcOtcGFkdSBcIiArIHRoaXMuSXhwLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0WmF2cml0UG90b21reSxcclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkZWREYXRhKCk7IFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uYXN0YXZlbsOtIG5hdmlnYcSNbsOtaG8gcGFuZWx1XHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7ICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0UG90b21reToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemF2cml0cG90b21reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE90ZXZyaVByaXBhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T3RldnJpUHJpcGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZnDrXBhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkTmF2YXphbmUuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTYWxkYUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7IC8vU2V6bmFtIHphxaFrcnRudXTDvWNoIMWZw6Fka8WvIGx6ZSBwxZllxI3DrXN0IG1ldG9kb3UgZ2V0U2VsZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPyBqZSB0YWR5IG51dG7DvSBtw610IHR5cF9waGwgbmEgdnN0dXB1IHBybyBvdGV2xZllbsOtIGRldGFpbHUgcMWZw61wYWR1ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5QcmlwYWR5Lm9wZW5QcmlwYWREZXRhaWwodGhhdCwgc2VsZWN0aW9uWzBdLml4cF9wb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLm5hdmlnYXRlKCdHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkRGV0YWlsJywgeyBJRDogXCJERFBHUHJpcGFkRGV0YWlsI1wiLCBJeHA6IHNlbGVjdGlvblswXS5peHBfcG9wIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPdGV2cmlTYWxkbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T3RldnJpU2FsZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNhbGRvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWROYXZhemFuZS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1NhbGRhRHRvPihcImdldFNlbGVjdGlvblwiKTsgLy9TZXpuYW0gemHFoWtydG51dMO9Y2ggxZnDoWRrxa8gbHplIHDFmWXEjcOtc3QgbWV0b2RvdSBnZXRTZWxlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPSAwKSB0aGlzLm5hdmlnYXRlKCdHb3JkaWMuRGRwLldlYkNsaWVudC5HU2FsZGEnLCB7IElEOiBcIkREUEdTYWxkYSNcIiwgSXhwOiBzZWxlY3Rpb25bMF0uaXhwX3BvcCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJUaXNrIHN0YXRpc3RpayB0aXNrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aXNrRG9rbGFkdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPdGV2cmlQcnViZWhEbHVodToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T3RldnJpUHJ1YmVoRGx1aHVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlByxa9ixJtoIGRsdWh1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPdGV2xZllbsOtIHByxa9ixJtodSBkbHVodVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1BvaHlieVByaXBhZHVcIiwgeyBJRDogXCJERFBHUG9oeWJ5UHJpcGFkdSNcIiwgaXhwOiB0aGlzLkl4cCwgem9icmF6ZW5pOiB0aGlzLnZ5cG9jZXQsIGRhdF9vZDogdGhpcy5kYXRfb2QsIGRhdF9kbzogdGhpcy5kYXRfZG8gfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFZ5dHZvxZllbsOtIGdyaWTFr1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9ncmlkIHBybyBQxZllZHBpc3ksIHYgc2VrY2kgVnlicmFuw70gcG9wbGF0bsOta1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlUHJlZHBpc3koZWw6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkUHJlZHBpc3kgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhlbCkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRQbGF0YnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuU2FsZGFQcmVkcGlzeSgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZ3JpZCBwcm8gUGxhdGJ5LCB2IHNla2NpIFZ5YnJhbsO9IHBvcGxhdG7DrWtcclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVBsYXRieShlbDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRQbGF0YnkgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhlbCkgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUGxhdGJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLlNhbGRhUGxhdGJ5KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9ncmlkIHBybyBQxZllZHBpc3ksIHYgc2VrY2kgSGlzdG9yaWNrw6kgcMWZZWRwaXN5IGEgcGxhdGJ5XHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVIaXN0b3JpY2tlUHJlZHBpc3koZWw6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgdGhpcy5ncmlkSGlzdG9yaWNrZVByZWRwaXN5ID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oZWwpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRIaXN0b3JpY2tlUHJlZHBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuU2FsZGFIaXN0b3JpY2tlUHJlZHBpc3koKSwgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZ3JpZCBwcm8gUGxhdGJ5LCB2IHNla2NpIEhpc3Rvcmlja8OpIHDFmWVkcGlzeSBhIHBsYXRieVxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlSGlzdG9yaWNrZVBsYXRieShlbDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRIaXN0b3JpY2tlUGxhdGJ5ID0gJChcIjxkaXY+XCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8oZWwpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkSGlzdG9yaWNrZVBsYXRieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5TYWxkYUhpc3Rvcmlja2VQbGF0YnkoKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVIaXN0b3JpY2tlUG9saWNrYShlbDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB0aGlzLnN1YkRhdGFWaWV3cy5oaXN0b3JpY2tlID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJob3Jpem9udGFsXCIsIC8vaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICAgICAgICAgIHpvbmU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnN1YkRhdGFWaWV3cy5oaXN0b3JpY2tlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8oZWwpLmdkYXNoYm9hcmRwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhVmlldyxcclxuICAgICAgICAgICAgICAgIGxheW91dDogXCJob3Jpem9udGFsXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJEYXNoYm9hcmRcIixcclxuICAgICAgICAgICAgICAgIHpvbmVzOiAxLFxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvL29kdHJhbsSbbsOtIGhlYWRlcnUgdSBkYXRhVmlldyAoamUgdG8gxaFrYXJlZMOhIMSNZXJuw6EgxI3DoXJhKVxyXG4gICAgICAgICAgICB2YXIgaGVhZGVyID0gJChlbCkuZmluZCgnLmdkYXNoYm9hcmRwYW5lbF9faGVhZGVyJyk7XHJcbiAgICAgICAgICAgIGhlYWRlci5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZ3JpZCBwcm8gTmFwb2plbsOpIGEgVklFVyBwcm8gc2FsZGEsIHYgc2VrY2kgU2FsZG8gbmFwb2plbsO9Y2ggcG9wbGF0bsOta8WvXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVOYXZhemFuZShlbDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB0aGlzLnN1YkRhdGFWaWV3cy5uYXBvamVuZSA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KClcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGFWaWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6IFwiaG9yaXpvbnRhbFwiLCAvL2hvcml6b250YWxcclxuICAgICAgICAgICAgICAgICAgICB6b25lOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5zdWJEYXRhVmlld3MubmFwb2plbmVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSlcclxuXHJcbiAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhlbCkuZ2Rhc2hib2FyZHBhbmVsKHsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVZpZXcsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRGFzaGJvYXJkXCIsXHJcbiAgICAgICAgICAgICAgICB6b25lczogMSxcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy9vZHRyYW7Em27DrSBoZWFkZXJ1IHUgZGF0YVZpZXcgKGplIHRvIMWha2FyZWTDoSDEjWVybsOhIMSNw6FyYSlcclxuICAgICAgICAgICAgdmFyIGhlYWRlciA9ICQoZWwpLmZpbmQoJy5nZGFzaGJvYXJkcGFuZWxfX2hlYWRlcicpO1xyXG4gICAgICAgICAgICBoZWFkZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWROYXZhemFuZSA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKGVsKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkTmF2YXphbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0T3RldnJpUHJpcGFkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5TYWxkYU5hcG9qZW5lKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9ncmlkIHBybyBPcHJhdm7DqSBwb2xvxb5reVxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlT3ByYXZuZShlbDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB0aGlzLnN1YkRhdGFWaWV3cy5vcHJhdm5lID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJob3Jpem9udGFsXCIsIC8vaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICAgICAgICAgIHpvbmU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnN1YkRhdGFWaWV3cy5vcHJhdm5lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pXHJcblxyXG4gICAgICAgICAgICAkKFwiPGRpdj5cIikuYXBwZW5kVG8oZWwpLmdkYXNoYm9hcmRwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhVmlldyxcclxuICAgICAgICAgICAgICAgIGxheW91dDogXCJob3Jpem9udGFsXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJEYXNoYm9hcmRcIixcclxuICAgICAgICAgICAgICAgIHpvbmVzOiAxLFxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvL29kdHJhbsSbbsOtIGhlYWRlcnUgdSBkYXRhVmlldyAoamUgdG8gxaFrYXJlZMOhIMSNZXJuw6EgxI3DoXJhKVxyXG4gICAgICAgICAgICB2YXIgaGVhZGVyID0gJChlbCkuZmluZCgnLmdkYXNoYm9hcmRwYW5lbF9faGVhZGVyJyk7XHJcbiAgICAgICAgICAgIGhlYWRlci5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZE9wcmF2bmUgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhlbClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwiU27DrcW+ZW7DrVwiLCBmb3JtdWxhOiAnRVFVQUxTKEBrdGdfdXBvLCBcIjEyMTVcIiknLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsdWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwiU27DrcW+ZW7DrVwiLCBmb3JtdWxhOiAnRVFVQUxTKEBrdGdfdXBvLCBcIjEyMTZcIiknLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsdWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZE9wcmF2bmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuU2FsZGFPcHJhdm5lKCksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvL2Zvcm11bMOhxZkgaGxhdmnEjWt5IFxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlSGVhZGVyRm9ybSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL0RlZmluaWNlIEhlYWRlciBGb3JtdSAow7pkYWplIG8gcMWZw61wYWR1KVxyXG4gICAgICAgICAgICBsZXQgZm9ybVNldHVwID0ge307XHJcblxyXG4gICAgICAgICAgICBsZXQgaEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oKVxyXG4gICAgICAgICAgICAgICAgLy9TRUtDRSAwXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAwXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQWdlbmRvdsOpIMSNw61zbG9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIgLy9hZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vUk9XIDFcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBldmlkZW5jZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9ldmlkXCIgLy9kYXR1bSBldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vUk9XIDJcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJWYXJpYWJsaWxuw60gc3ltYm9sXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLCAvL3ZzXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgM1xyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBkb2tsYWR1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlNlbGVjdC5zc2xzdHlwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c190eXBcIiwgLy90eXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c190eXA9dmFsdWUuaXhzX3R5cFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBoRm9ybVxyXG4gICAgICAgICAgICAgICAgLy9zZWtjZSAxXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAwXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3QuZGRwc3RwcCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAxXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3Byw6F2Y2VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19zcHJcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGhGb3JtXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAyXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHRoYXQucGFyYW1zLmRkcF9yZGtfbmF6ID8/IFwixZjDoWRla1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3QuY2lzZWxuaWtSYWRrdSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZHBfcmFkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHBfZGVuPXZhbHVlLml4cF9kZW4sbW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsLG1vZGVsLmRkcF9yYWRlaz12YWx1ZS5kZHBfcmFkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoaXMuSXhwRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0aGlzLlR5cFBobFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAzXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHRoYXQucGFyYW1zLmRkcF9jdHZfbmF6ID8/IFwixIx0dnLFpVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3QuY2lzZWxuaWtDdHZydGkoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGRwX2N0dnJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhwX2Rlbj12YWx1ZS5peHBfZGVuLG1vZGVsLnR5cF9waGw9dmFsdWUudHlwX3BobCxtb2RlbC5kZHBfY3R2cnQ9dmFsdWUuZGRwX2N0dnJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiB0aGlzLkl4cERlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhpcy5UeXBQaGxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgNCAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFkcmVzYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19lc3U9aXhzX2VzdTtlc3VfZGljPWRpYzttb2RlbC5saWM9dmFsdWUubGljO21vZGVsLnBvcl96YXN0PXZhbHVlLnBvcl96YXN0XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cDogR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLlR5cFpvYnJhemVuaUthcm90ZWthLlNlbGVjdEVzdSwgLy8gcMWZaWTDoW7DrSBwcmVmYWJ1ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3Zhbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHRoaXMuSXhwID8/IFwiXCIsIC8vIHphZMOhbsOtIGxvZ292YWPDrWNoIMO6ZGFqdSBqZSBudXRub3N0IGhsYXZuxJsgSVhQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksIC8vIHZ5YnJhdCB6IGVudW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6ICh0aGlzLkFDX0FHISA9PSBudWxsID8gdGhpcy5JeHAhIDogdGhpcy5BQ19BRyEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIkRldGFpbCBQxZnDrXBhZHVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pIGFzIEdTZWxlY3RCb3hPcHRpb25zPGFueT4pXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TRUtDRSAyXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvLyBST1cgMFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIktuaWhhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmtuaWhhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHBfZGVuPXZhbHVlLml4cF9kZW5cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFJPVyAxXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiWnByYWNvdmF0ZWxcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZ2luc2Z1bigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX2FrdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW5fYWt0PXZhbHVlLml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFJPVyAyXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiT2Rwb3bEm2Ruw6Egb3NvYmFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZ2luc3JlZigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfcmVmX29kcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19yZWZfb2RwPXZhbHVlLml4c19yZWZcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIFJPVyAzXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVsO9cG/EjWV0IHNhbGRhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwgXCJ3LTNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnlwb2NldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6ICdTcGzDoXRrb3bDqScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMTAsIGxhYmVsOiAnw5rEjWV0bsOtJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAyMCwgbGFiZWw6ICdWeW3DoWhhY8OtJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0LmR0b1ByaXBhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXBvamVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlNhbGRvIHbEjWV0bsSbIG5hdsOhemFuw71jaCBwb3BsLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEodGhhdC5kdG9QcmlwYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBST1cgNFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlN0YXYvU2FsZG8gayBkYXR1XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0LmlucHV0X2RhdF9vZCA/PyB0aGF0LmRhdHVtT2QsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0LmR0b1ByaXBhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNhbGRvX2RhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5pbnB1dF9kYXRfZG8gPz8gdGhhdC5kYXR1bURvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEodGhhdC5kdG9QcmlwYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGhGb3JtO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgLy9rb250cm9sYSB6ZGEganNvdSBuYcSNdGVueSBkYXRhIGEgbsOhc2xlZG7DqSBuYXBsbsSbbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkZWREYXRhKCkge1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5kdG9QcmlwYWQpLmxlbmd0aCA9PT0gMCkgLy9wb2t1ZCBzZSBuZW5hxI1ldGwgcMWZw61wYWQgLT4gdnLDoXTDrW0gMFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcblxyXG4gICAgICAgICAgICAvL25hxI10ZW7DrSBkYXQgeiBEVE8gZG8gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5kdG9QcmlwYWQpOyAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL25hc3RhdmVuw60gS1BJIG9rw6luZWsgXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRLcGlzKCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbG9yUG9jYXRrdSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBjb2xvckNlbGtlbSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNhbGRvVnltYWhhbmkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9CYXJ2YSBzYWxkLCBrZHnFviBuZW7DrSB0eXAgVnltYWhhbmlcclxuICAgICAgICAgICAgICAgIGNvbG9yUG9jYXRrdSA9IHRoaXMuc2FsZG9DZWxrZW0uU2FsZG9TdGF2ISA+IG5ldyBEZWNpbWFsKDApID8gXCJmZjAwMDBcIiA6IFwiMDAwMDAwXCI7IC8vIHJlZCA6IGJsYWNrICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbG9yQ2Vsa2VtID0gdGhpcy5zYWxkb0NlbGtlbS5TYWxkbyEgPiBuZXcgRGVjaW1hbCgwKSA/IFwiZmYwMDAwXCIgOiBcIjAwMDAwMFwiOyAvLyByZWQgOiBibGFja1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9CYXJ2YSBzYWxkLCBrZHnFviBqZSB0eXAgVnltYWhhbmlcclxuICAgICAgICAgICAgICAgIGNvbG9yUG9jYXRrdSA9IHRoaXMuc2FsZG9WeW1haGFuaT8uU2FsZG9TdGF2ISA+IG5ldyBEZWNpbWFsKDApID8gXCJmZjAwMDBcIiA6IFwiMDAwMDAwXCI7IC8vIHJlZCA6IGJsYWNrXHJcbiAgICAgICAgICAgICAgICBjb2xvckNlbGtlbSA9IHRoaXMuc2FsZG9WeW1haGFuaT8uU2FsZG8hID4gbmV3IERlY2ltYWwoMCkgPyBcImZmMDAwMFwiIDogXCIwMDAwMDBcIjsgLy8gcmVkIDogYmxhY2tcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNhbGRvVnltYWhhbmlTYWxkb1N0YXZfc3RyOiBhbnk7XHJcbiAgICAgICAgICAgIHZhciBzYWxkb1Z5bWFoYW5pUHJlZHBpc3lfc3RyOiBhbnk7XHJcbiAgICAgICAgICAgIHZhciBzYWxkb1Z5bWFoYW5pUGxhdGJ5X3N0cjogYW55O1xyXG4gICAgICAgICAgICB2YXIgc2FsZG9WeW1haGFuaVNhbGRvX3N0cjogYW55O1xyXG4gICAgICAgICAgICB2YXIgc2FsZG9DZWxrZW1TYWxkb1N0YXZfc3RyOiBhbnk7XHJcbiAgICAgICAgICAgIHZhciBzYWxkb0NlbGtlbVByZWRwaXN5X3N0cjogYW55O1xyXG4gICAgICAgICAgICB2YXIgc2FsZG9DZWxrZW1QbGF0Ynlfc3RyOiBhbnk7XHJcbiAgICAgICAgICAgIHZhciBzYWxkb0NlbGtlbVNhbGRvX3N0cjogYW55O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2FsZG9WeW1haGFuaSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzYWxkb1Z5bWFoYW5pU2FsZG9TdGF2X3N0ciA9IHRoaXMuZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKHRoaXMuc2FsZG9WeW1haGFuaS5TYWxkb1N0YXYpO1xyXG4gICAgICAgICAgICAgICAgc2FsZG9WeW1haGFuaVByZWRwaXN5X3N0ciA9IHRoaXMuZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKHRoaXMuc2FsZG9WeW1haGFuaS5QcmVkcGlzeSk7XHJcbiAgICAgICAgICAgICAgICBzYWxkb1Z5bWFoYW5pUGxhdGJ5X3N0ciA9IHRoaXMuZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKHRoaXMuc2FsZG9WeW1haGFuaS5QbGF0YnkpO1xyXG4gICAgICAgICAgICAgICAgc2FsZG9WeW1haGFuaVNhbGRvX3N0ciA9IHRoaXMuZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKHRoaXMuc2FsZG9WeW1haGFuaS5TYWxkbyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2FsZG9DZWxrZW1TYWxkb1N0YXZfc3RyID0gdGhpcy5mb3JtYXROdW1iZXJXaXRoU3BhY2VzQW5kRGVjaW1hbHModGhpcy5zYWxkb0NlbGtlbS5TYWxkb1N0YXYpO1xyXG4gICAgICAgICAgICAgICAgc2FsZG9DZWxrZW1QcmVkcGlzeV9zdHIgPSB0aGlzLmZvcm1hdE51bWJlcldpdGhTcGFjZXNBbmREZWNpbWFscyh0aGlzLnNhbGRvQ2Vsa2VtLlByZWRwaXN5KTtcclxuICAgICAgICAgICAgICAgIHNhbGRvQ2Vsa2VtUGxhdGJ5X3N0ciA9IHRoaXMuZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKHRoaXMuc2FsZG9DZWxrZW0uUGxhdGJ5KTtcclxuICAgICAgICAgICAgICAgIHNhbGRvQ2Vsa2VtU2FsZG9fc3RyID0gdGhpcy5mb3JtYXROdW1iZXJXaXRoU3BhY2VzQW5kRGVjaW1hbHModGhpcy5zYWxkb0NlbGtlbS5TYWxkbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vU2FsZG8gcG/EjcOhdGt1XHJcbiAgICAgICAgICAgIHRoaXMua3BpcyEua3BpU3RhdlVocmF6ZW5pLnByaW1hcnlUZXh0ID0gYFN0YXYgayBwb8SNw6F0a3VgO1xyXG4gICAgICAgICAgICB0aGlzLmtwaXMhLmtwaVN0YXZVaHJhemVuaS5zZWNvbmRhcnlUZXh0ID0gYDxzcGFuIHN0eWxlPVwiY29sb3I6ICMke2NvbG9yUG9jYXRrdX1cIj4ke3NhbGRvVnltYWhhbmlTYWxkb1N0YXZfc3RyIHx8IHNhbGRvQ2Vsa2VtU2FsZG9TdGF2X3N0cn08L3NwYW4+YDtcclxuICAgICAgICAgICAgLy9QxZllZHBpc3lcclxuICAgICAgICAgICAgdGhpcy5rcGlzIS5rcGlQcmVkcGlzeS5wcmltYXJ5VGV4dCA9IGBQxZllZHBpc3kgemEgb2Jkb2LDrWA7XHJcbiAgICAgICAgICAgIHRoaXMua3BpcyEua3BpUHJlZHBpc3kuc2Vjb25kYXJ5VGV4dCA9IGAke3NhbGRvVnltYWhhbmlQcmVkcGlzeV9zdHIgfHwgc2FsZG9DZWxrZW1QcmVkcGlzeV9zdHJ9YDtcclxuICAgICAgICAgICAgLy9QbGF0YnlcclxuICAgICAgICAgICAgdGhpcy5rcGlzIS5rcGlQbGF0YnkucHJpbWFyeVRleHQgPSBgUGxhdGJ5IHphIG9iZG9iw61gO1xyXG4gICAgICAgICAgICB0aGlzLmtwaXMhLmtwaVBsYXRieS5zZWNvbmRhcnlUZXh0ID0gYCR7c2FsZG9WeW1haGFuaVBsYXRieV9zdHIgfHwgc2FsZG9DZWxrZW1QbGF0Ynlfc3RyfWA7XHJcbiAgICAgICAgICAgIC8vQ2Vsa292w6kgc2FsZG9cclxuICAgICAgICAgICAgdGhpcy5rcGlzIS5rcGlTYWxkb0NlbGtlbS5wcmltYXJ5VGV4dCA9IGBTdGF2IMO6aHJhZHk6IDxzcGFuIHN0eWxlPVwiY29sb3I6ICMke2NvbG9yQ2Vsa2VtfVwiPiR7dGhpcy5zYWxkb1Z5bWFoYW5pPy5TdGF2IHx8IHRoaXMuc2FsZG9DZWxrZW0uU3Rhdn08L3NwYW4+YDtcclxuICAgICAgICAgICAgdGhpcy5rcGlzIS5rcGlTYWxkb0NlbGtlbS5zZWNvbmRhcnlUZXh0ID0gYENlbGtvdsOpIHNhbGRvOiA8c3BhbiBzdHlsZT1cImNvbG9yOiAjJHtjb2xvckNlbGtlbX1cIj4ke3NhbGRvVnltYWhhbmlTYWxkb19zdHIgfHwgc2FsZG9DZWxrZW1TYWxkb19zdHJ9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgIHRoaXMua3BpcyEua3BpU2FsZG9DZWxrZW0udG9vbHRpcCA9IHRoaXMuc2FsZG9WeW1haGFuaT8uU3RhdkhpbnQgfHwgdGhpcy5zYWxkb0NlbGtlbS5TdGF2SGludDtcclxuXHJcbiAgICAgICAgICAgIC8vdnludWxvdsOhbsOtLCBhYnkgZGF0YSBuZXrFr3N0YWx5IHDFmWkgem3Em27EmyB0eXB1XHJcbiAgICAgICAgICAgIHRoaXMuemlza2VqRGF0YU9wcmF2bmUodGhpcy5peHBGaWx0ZXIsIHRoaXMuc2FsZG9DZWxrZW0/LlNhbGRvIHx8IHRoaXMuc2FsZG9WeW1haGFuaT8uU2FsZG8pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYWxkb1Z5bWFoYW5pID0gbnVsbDsgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zYWxkb0NlbGtlbSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucHJlZHBpc3lDZWxrZW0gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXRieUNlbGtlbSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmtwaXM/LnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy96w61za8OhbsOtIHNhbGQgemUgc2VydmVydSAoZ3NwZ19kZHBfc2FsZG8pXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRTYWxkYSgpIHsgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMudnlwb2NldCAhPSAyMCkgey8vcG9rdWQgVcSNZXRuw60vU3Bsw6F0a292w70gcmXFvmltXHJcblxyXG4gICAgICAgICAgICAgICAgLy9aw61za8OhbsOtIGRhdHVtdSBvIGplZG5vIG1lbsWhw60gbmXFviBqZSBkYXQgb2RcclxuICAgICAgICAgICAgICAgIHZhciBvbmVEYXlFYXJsaWVyID0gbmV3IERhdGUodGhpcy5kYXRfb2QpO1xyXG4gICAgICAgICAgICAgICAgb25lRGF5RWFybGllci5zZXREYXRlKG9uZURheUVhcmxpZXIuZ2V0RGF0ZSgpIC0gMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy96w61za8OhbsOtIGNlbGtvdsOpaG8gc2FsZGFcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlNhbGRhLnN0YXZ5KHsgaXhwOiB0aGlzLkl4cCwgdHlwX3NhbGRhOiB0aGlzLnZ5cG9jZXQsIG5hcG9qZW5lOiB0aGlzLm5hcG9qZW5vLCBkYXRfc2FsZGFfcG9jYXRrdV92eW1haGFuaTogb25lRGF5RWFybGllciwgZGF0X3NhbGRhOiB0aGlzLmRhdF9kbywgcG9jYXRla05hcDogdGhpcy5wb2NhdGVjbmlDZWxrZW1OYXBvamVuZSwgcHJlZHBpc3lOYXA6IHRoaXMucHJlZHBpc3lDZWxrZW1OYXBvamVuZSwgcGxhdGJ5TmFwOiB0aGlzLnBsYXRieUNlbGtlbU5hcG9qZW5lLCBjZWxrZW1OYXA6IHRoaXMuY2Vsa2VtTmFwb2plbmUgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgoZGF0YSkgPT4geyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYWxkb0NlbGtlbSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0S3BpcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHsvL3Bva3VkIFZ5bcOhaGFjw60gcmXFvmltXHJcbiAgICAgICAgICAgICAgICAvL3rDrXNrw6Fuw60gc2FsZFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuU2FsZGEuc3RhdnkoeyBpeHA6IHRoaXMuSXhwLCB0eXBfc2FsZGE6IHRoaXMudnlwb2NldCwgbmFwb2plbmU6IHRoaXMubmFwb2plbm8sIGRhdF9zYWxkYV9wb2NhdGt1X3Z5bWFoYW5pOiB0aGlzLmRhdF9vZCwgZGF0X3NhbGRhOiB0aGlzLmRhdF9kbywgcG9jYXRla05hcDogdGhpcy5wb2NhdGVjbmlDZWxrZW1OYXBvamVuZSwgcHJlZHBpc3lOYXA6IHRoaXMucHJlZHBpc3lDZWxrZW1OYXBvamVuZSwgcGxhdGJ5TmFwOiB0aGlzLnBsYXRieUNlbGtlbU5hcG9qZW5lLCBjZWxrZW1OYXA6IHRoaXMuY2Vsa2VtTmFwb2plbmUgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhbGRvVnltYWhhbmkgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEtwaXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy92eXBvxI3DrXTDoW7DrSBjZWxrb3bDvWNoIG5hcG9qZW7DvWNoIHNhbGQgYSBrb3NtZXRpY2vDqSDDunByYXZ5XHJcbiAgICAgICAgcHJpdmF0ZSB2eXBvY2l0YXROYXBvamVuZShkYXRhKSB7ICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnByZWRwaXN5Q2Vsa2VtTmFwb2plbmUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXRieUNlbGtlbU5hcG9qZW5lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jZWxrZW1OYXBvamVuZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucG9jYXRlY25pQ2Vsa2VtTmFwb2plbmUgPSAwO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvY2F0ZWNuaUNlbGtlbU5hcG9qZW5lICs9IHBhcnNlRmxvYXQoZGF0YVtpXS5zYWxkb19wb2NhdGVjbmkpOyBcclxuICAgICAgICAgICAgICAgIHRoaXMucHJlZHBpc3lDZWxrZW1OYXBvamVuZSArPSBwYXJzZUZsb2F0KGRhdGFbaV0uc2FsZG9fcHJlZHBpc3kpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF0YnlDZWxrZW1OYXBvamVuZSArPSBwYXJzZUZsb2F0KGRhdGFbaV0uc2FsZG9fcGxhdGJ5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2Vsa2VtTmFwb2plbmUgKz0gcGFyc2VGbG9hdChkYXRhW2ldLnNhbGRvX2NlbGtvdmUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sb3JQb2NhdGt1O1xyXG4gICAgICAgICAgICB2YXIgY29sb3JDZWxrZW07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL0JhcnZhIHNhbGQsIHpkYSBqc291IHphcGxhY2VuYSDEjWkgbmVcclxuICAgICAgICAgICAgY29sb3JQb2NhdGt1ID0gdGhpcy5wb2NhdGVjbmlDZWxrZW1OYXBvamVuZSA+IG5ldyBEZWNpbWFsKDApID8gXCJmZjAwMDBcIiA6IFwiMDAwMDAwXCI7IC8vIHJlZCA6IGJsYWNrXHJcbiAgICAgICAgICAgIGNvbG9yQ2Vsa2VtID0gdGhpcy5jZWxrZW1OYXBvamVuZSA+IG5ldyBEZWNpbWFsKDApID8gXCJmZjAwMDBcIiA6IFwiMDAwMDAwXCI7IC8vIHJlZCA6IGJsYWNrXHJcblxyXG4gICAgICAgICAgICAvL3RleHQgc3RhdnUgY2Vsa292w6lobyBzYWxkYSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgc3RhdlNhbGRhOyAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5jZWxrZW1OYXBvamVuZSA+IDApIHN0YXZTYWxkYSA9IFwiTmVkb3BsYXRla1wiXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2Vsa2VtTmFwb2plbmUgPCAwKSBzdGF2U2FsZGEgPSBcIlDFmWVwbGF0ZWtcIlxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNlbGtlbU5hcG9qZW5lID09IDAgJiYgdGhpcy5wcmVkcGlzeUNlbGtlbU5hcG9qZW5lICE9IDAgJiYgdGhpcy5wbGF0YnlDZWxrZW1OYXBvamVuZSAhPSAwKSBzdGF2U2FsZGEgPSBcIlphcGxhY2Vub1wiXHJcbiAgICAgICAgICAgIGVsc2Ugc3RhdlNhbGRhID0gXCJcIlxyXG5cclxuICAgICAgICAgICAgdmFyIHBvY2F0ZWNuaUNlbGtlbU5hcG9qZW5lX3N0ciA9IHRoaXMuZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKHRoaXMucG9jYXRlY25pQ2Vsa2VtTmFwb2plbmUpO1xyXG4gICAgICAgICAgICB2YXIgcHJlZHBpc3lDZWxrZW1OYXBvamVuZV9zdHIgPSB0aGlzLmZvcm1hdE51bWJlcldpdGhTcGFjZXNBbmREZWNpbWFscyh0aGlzLnByZWRwaXN5Q2Vsa2VtTmFwb2plbmUpO1xyXG4gICAgICAgICAgICB2YXIgcGxhdGJ5Q2Vsa2VtTmFwb2plbmVfc3RyID0gdGhpcy5mb3JtYXROdW1iZXJXaXRoU3BhY2VzQW5kRGVjaW1hbHModGhpcy5wbGF0YnlDZWxrZW1OYXBvamVuZSk7XHJcbiAgICAgICAgICAgIHZhciBjZWxrZW1OYXBvamVuZV9zdHIgPSB0aGlzLmZvcm1hdE51bWJlcldpdGhTcGFjZXNBbmREZWNpbWFscyh0aGlzLmNlbGtlbU5hcG9qZW5lKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3Zsb8W+ZW7DrSB2w71wb8SNdMWvIGRvIG9rw6luZWtcclxuICAgICAgICAgICAgdGhpcy5zdWJEYXRhVmlld3MubmFwb2plbmUudXBkYXRlRGF0YShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdiBrIGRhdHUgY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwicG9jYXRlY25pX2NlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgPHNwYW4gc3R5bGU9XCJjb2xvcjogIyR7Y29sb3JQb2NhdGt1fVwiPiR7cG9jYXRlY25pQ2Vsa2VtTmFwb2plbmVfc3RyfTwvc3Bhbj5gXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlDFmWVkcGlzeSBjZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJwcmVkcGlzeV9jZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcHJlZHBpc3lDZWxrZW1OYXBvamVuZV9zdHJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUGxhdGJ5IGNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInBsYXRieV9jZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGxhdGJ5Q2Vsa2VtTmFwb2plbmVfc3RyXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgU3RhdiDDumhyYWR5OiA8c3BhbiBzdHlsZT1cImNvbG9yOiAjJHtjb2xvckNlbGtlbX1cIj4ke3N0YXZTYWxkYX08L3NwYW4+YCxcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJzYWxkb19jZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYENlbGtvdsOpIHNhbGRvIG5hcG9qZW7DvWNoOiA8c3BhbiBzdHlsZT1cImNvbG9yOiAjJHtjb2xvckNlbGtlbX1cIj4ke2NlbGtlbU5hcG9qZW5lX3N0cn08L3NwYW4+YFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvL3Nwb2Ruw60gxI3DoXN0IG9rw6lua2Egbm9ybcOhbG7DrSB0bG91xaHFpWthIGZvbnR1XHJcbiAgICAgICAgICAgICQoXCIuZy1rcGktbXVsdGlyb3ctYm9keS12YWx1ZSBzcGFuXCIpLmNzcyhcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy96b2JyYXplbsOtIGNlbGtvdsO9Y2ggaGlzdG9yaWNrw71jaCBzYWxkIGEga29zbWV0aWNrw6kgw7pwcmF2eVxyXG4gICAgICAgIHByaXZhdGUgem9icmF6aXRIaXN0b3JpY2tlKHByZWRwaXN5LCBwbGF0YnksIGNlbGtlbSkgeyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjZWxrZW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcHJlZHBpc3kgPSAwO1xyXG4gICAgICAgICAgICAgICAgcGxhdGJ5ID0gMDtcclxuICAgICAgICAgICAgICAgIGNlbGtlbSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNvbG9yQ2Vsa2VtO1xyXG5cclxuICAgICAgICAgICAgLy9CYXJ2YSBzYWxkLCB6ZGEganNvdSB6YXBsYWNlbmEgxI1pIG5lXHJcbiAgICAgICAgICAgIGNvbG9yQ2Vsa2VtID0gY2Vsa2VtID4gbmV3IERlY2ltYWwoMCkgPyBcImZmMDAwMFwiIDogXCIwMDAwMDBcIjsgLy8gcmVkIDogYmxhY2tcclxuXHJcbiAgICAgICAgICAgIC8vdGV4dCBzdGF2dSBjZWxrb3bDqWhvIHNhbGRhXHJcbiAgICAgICAgICAgIHZhciBzdGF2U2FsZGE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoY2Vsa2VtID4gMCkgc3RhdlNhbGRhID0gXCJOZWRvcGxhdGVrXCJcclxuICAgICAgICAgICAgZWxzZSBpZiAoY2Vsa2VtIDwgMCkgc3RhdlNhbGRhID0gXCJQxZllcGxhdGVrXCJcclxuICAgICAgICAgICAgZWxzZSBpZiAoY2Vsa2VtID09IDAgJiYgcHJlZHBpc3kgIT0gMCAmJiBwbGF0YnkgIT0gMCkgc3RhdlNhbGRhID0gXCJaYXBsYWNlbm9cIlxyXG4gICAgICAgICAgICBlbHNlIHN0YXZTYWxkYSA9IFwiXCJcclxuXHJcbiAgICAgICAgICAgIHZhciBwcmVkcGlzeV9zdHIgPSB0aGlzLmZvcm1hdE51bWJlcldpdGhTcGFjZXNBbmREZWNpbWFscyhwcmVkcGlzeSk7XHJcbiAgICAgICAgICAgIHZhciBwbGF0Ynlfc3RyID0gdGhpcy5mb3JtYXROdW1iZXJXaXRoU3BhY2VzQW5kRGVjaW1hbHMocGxhdGJ5KTtcclxuICAgICAgICAgICAgdmFyIGNlbGtlbV9zdHIgPSB0aGlzLmZvcm1hdE51bWJlcldpdGhTcGFjZXNBbmREZWNpbWFscyhjZWxrZW0pO1xyXG5cclxuICAgICAgICAgICAgLy92bG/FvmVuw60gdsO9cG/EjXTFryBkbyBva8OpbmVrXHJcbiAgICAgICAgICAgIHRoaXMuc3ViRGF0YVZpZXdzLmhpc3Rvcmlja2UudXBkYXRlRGF0YShbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUMWZZWRwaXN5IGNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImhpc3Rvcmlja2VfcHJlZHBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcHJlZHBpc3lfc3RyXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBsYXRieSBjZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJoaXN0b3JpY2tlX3BsYXRieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwbGF0Ynlfc3RyXHJcbiAgICAgICAgICAgICAgICB9LCAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgU3RhdiDDumhyYWR5OiA8c3BhbiBzdHlsZT1cImNvbG9yOiAjJHtjb2xvckNlbGtlbX1cIj4ke3N0YXZTYWxkYX08L3NwYW4+YCxcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJoaXN0b3JpY2tlX2NlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBgU2FsZG8gaGlzdG9yaWU6IDxzcGFuIHN0eWxlPVwiY29sb3I6ICMke2NvbG9yQ2Vsa2VtfVwiPiR7Y2Vsa2VtX3N0cn08L3NwYW4+YFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICAvL3Nwb2Ruw60gxI3DoXN0IG9rw6lua2Egbm9ybcOhbG7DrSB0bG91xaHFpWthIGZvbnR1XHJcbiAgICAgICAgICAgICQoXCIuZy1rcGktbXVsdGlyb3ctYm9keS12YWx1ZSBzcGFuXCIpLmNzcyhcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpOyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIC8vem9icmF6ZW7DrSBjZWxrb3bDvWNoIGhpc3Rvcmlja8O9Y2ggc2FsZCBhIGtvc21ldGlja8OpIMO6cHJhdnlcclxuICAgICAgICBwcml2YXRlIHpvYnJheml0T3ByYXZuZShvcHJhdm5lLCBzYWxkb19jZWxrZW0pIHtcclxuICAgICAgICAgICAgaWYgKG9wcmF2bmUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgb3ByYXZuZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBzYWxkb19jZWxrZW0gPSAwXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBjZWxrZW0gPSBOdW1iZXIoc2FsZG9fY2Vsa2VtKSAtIG9wcmF2bmU7XHJcbiAgICAgICAgICAgIHZhciBvcHJhdm5lX3N0ciA9IHRoaXMuZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKG9wcmF2bmUpO1xyXG4gICAgICAgICAgICB2YXIgY2Vsa2VtX3N0ciA9IHRoaXMuZm9ybWF0TnVtYmVyV2l0aFNwYWNlc0FuZERlY2ltYWxzKGNlbGtlbSk7XHJcblxyXG4gICAgICAgICAgICAvL3Zsb8W+ZW7DrSB2w71wb8SNdMWvIGRvIG9rw6luZWtcclxuICAgICAgICAgICAgdGhpcy5zdWJEYXRhVmlld3Mub3ByYXZuZS51cGRhdGVEYXRhKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJPcHJhdm7DqSBwb2xvxb5reSBjZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJvcHJhdm5lX2NlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvcHJhdm5lX3N0clxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTYWxkbyBiZXogb3ByYXZuw71jaCBwb2xvxb5la1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImJlel9vcHJhdm5lX2NlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjZWxrZW1fc3RyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3Nwb2Ruw60gxI3DoXN0IG9rw6lua2Egbm9ybcOhbG7DrSB0bG91xaHFpWthIGZvbnR1XHJcbiAgICAgICAgICAgICQoXCIuZy1rcGktbXVsdGlyb3ctYm9keS12YWx1ZSBzcGFuXCIpLmNzcyhcImZvbnQtd2VpZ2h0XCIsIFwibm9ybWFsXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWREYXRhXCIgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3rDrXNrw6Fuw60gZGF0IHplIHNlcnZlcnUgYSBuYXBsbsSbbsOtIGdyaWR1IGEgY2Vsa292ZSBjYXN0a3kgXHJcbiAgICAgICAgcHJpdmF0ZSB6aXNrZWpEYXRhKGZpbHRlcjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWREYXRhXCIsIHRleHQ6IFwiWsOtc2vDoXbDoW7DrSBkYXQuLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5kYXRfb2QgPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiZm9ybUhlYWRlclwiKS5maW5kRmllbGRzKFwic3Rhdl9kYXRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0X2RvID0gdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIikuZmluZEZpZWxkcyhcInNhbGRvX2RhdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdGhpcy52eXBvY2V0ID0gdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIikuZmluZEZpZWxkcyhcInZ5cG9jZXRcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHRoaXMubmFwb2plbm8gPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiZm9ybUhlYWRlclwiKS5maW5kRmllbGRzKFwibmFwb2plbm9cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRfb2QgIT0gdW5kZWZpbmVkICYmIHRoaXMuZGF0X2RvICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3ID0gMTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdF9vZCA+IHRoaXMuZGF0X2RvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvbW9jbmEgPSB0aGlzLmRhdF9vZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0X29kID0gdGhpcy5kYXRfZG9cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdF9kbyA9IHBvbW9jbmFcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2ZpbHRyIHBybyBzZXJ2ZXJcclxuICAgICAgICAgICAgICAgIHRoaXMuaXhwRmlsdGVyLml4cCA9IGZpbHRlci5peHA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml4cEZpbHRlci5kYXRfb2QgPSB0aGlzLmRhdF9vZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXhwRmlsdGVyLmRhdF9kbyA9IHRoaXMuZGF0X2RvO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5peHBGaWx0ZXIudnlwb2NldCA9IHRoaXMudnlwb2NldDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy96w61za8OhbsOtIGRhdCBhIG5hcGxuxJtuw60gZ3JpZGR1IFZ5YnJhbsO9IHBvcGxhdG7DrWsgLSBQxZllZHBpc3lcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlNhbGRhLnNhbGRvUHJlZHBpc3lcclxuICAgICAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhhdC5peHBGaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkUHJlZHBpc3kuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy96w61za8OhbsOtIGRhdCBhIG5hcGxuxJtuw60gZ3JpZHUgVnlicmFuw70gcG9wbGF0bsOtayAtIFBsYXRieVxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuU2FsZGEuc2FsZG9QbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhhdC5peHBGaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkUGxhdGJ5LmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGFOYXZhem92YW5lKHRoYXQuaXhwRmlsdGVyKTsgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vesOtc2vDoW7DrSBkYXQgYSBuYXBsbsSbbsOtIGdyaWR1IEhpc3Rvcmlja8OpIHBsYXRieSBhIHDFmWVkcGlzeSAtIFDFmWVkcGlzeVxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuU2FsZGEuc2FsZG9IaXN0b3JpY2tlUHJlZHBpc3lcclxuICAgICAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhhdC5peHBGaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkSGlzdG9yaWNrZVByZWRwaXN5LmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnZpZXcpOyAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3rDrXNrw6Fuw60gZGF0IGEgbmFwbG7Em27DrSBncmlkdSBIaXN0b3JpY2vDqSBwbGF0YnkgYSBwxZllZHBpc3kgLSBQbGF0YnlcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlNhbGRhLnNhbGRvSGlzdG9yaWNrZVBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB0aGF0Lml4cEZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHRvLmRhdGEubGVuZ3RoICE9IDApIHsgLy9wb2t1ZCBuZWpzb3Ugxb7DoWRuw6kgZGF0YSBuZWJ1ZHUgcHJhY292YXQgcyBkYXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZWRwaXN5Q2Vsa2VtSGlzdG9yaWNrZSA9IGR0by5kYXRhWzBdLnNhbGRvX2hpc3RfcHJlZHBpc3k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBsYXRieUNlbGtlbUhpc3Rvcmlja2UgPSBkdG8uZGF0YVswXS5zYWxkb19oaXN0X3BsYXRieTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2Vsa2VtSGlzdG9yaWNrZSA9IGR0by5kYXRhWzBdLnNhbGRvX2hpc3RfY2Vsa2VtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkRGF0YVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpvYnJheml0SGlzdG9yaWNrZSh0aGF0LnByZWRwaXN5Q2Vsa2VtSGlzdG9yaWNrZSwgdGhhdC5wbGF0YnlDZWxrZW1IaXN0b3JpY2tlLCB0aGF0LmNlbGtlbUhpc3Rvcmlja2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEhpc3Rvcmlja2VQbGF0YnkuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHsgLy9wb2t1ZCBqZSBwcsOhemRuw70gZGF0dW0sIHZ5bnVsb3ZhdCBwb2zDrcSNa2FcclxuICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IDA7ICBcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkUHJlZHBpc3kuZ2dyaWQoXCJzZXREYXRhXCIsIFtdKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFBsYXRieS5nZ3JpZChcInNldERhdGFcIiwgW10pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkTmF2YXphbmUuZ2dyaWQoXCJzZXREYXRhXCIsIFtdKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEhpc3Rvcmlja2VQbGF0YnkuZ2dyaWQoXCJzZXREYXRhXCIsIFtdKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEhpc3Rvcmlja2VQcmVkcGlzeS5nZ3JpZChcInNldERhdGFcIiwgW10pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkT3ByYXZuZS5nZ3JpZChcInNldERhdGFcIiwgW10pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuc3ViRGF0YVZpZXdzLmhpc3Rvcmlja2UudXBkYXRlRGF0YShbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJQxZllZHBpc3kgY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImhpc3Rvcmlja2VfcHJlZHBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUGxhdGJ5IGNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJoaXN0b3JpY2tlX3BsYXRieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYFN0YXYgw7pocmFkeTogPHNwYW4gc3R5bGU9XCJjb2xvcjogcmVkXCI+bmVwbGF0bsOpIGRhdHVtPC9zcGFuPmAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImhpc3Rvcmlja2VfY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuc3ViRGF0YVZpZXdzLm5hcG9qZW5lLnVwZGF0ZURhdGEoW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdiBrIGRhdHUgY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInBvY2F0ZWNuaV9jZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUMWZZWRwaXN5IGNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwcmVkcGlzeV9jZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUGxhdGJ5IGNlbGtlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwbGF0YnlfY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBgU3RhdiDDumhyYWR5OiA8c3BhbiBzdHlsZT1cImNvbG9yOiByZWRcIj5uZXBsYXRuw6kgZGF0dW08L3NwYW4+YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2FsZG9fY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuc3ViRGF0YVZpZXdzLm9wcmF2bmUudXBkYXRlRGF0YShbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJPcHJhdm7DqSBwb2xvxb5reSBjZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwib3ByYXZuZV9jZWxrZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU2FsZG8gYmV6IG9wcmF2bsO9Y2ggcG9sb8W+ZWtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYmV6X29wcmF2bmVfY2Vsa2VtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMua3BpcyEua3BpU3RhdlVocmF6ZW5pLnNlY29uZGFyeVRleHQgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMua3BpcyEua3BpUHJlZHBpc3kuc2Vjb25kYXJ5VGV4dCA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rcGlzIS5rcGlQbGF0Ynkuc2Vjb25kYXJ5VGV4dCA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rcGlzIS5rcGlTYWxkb0NlbGtlbS5wcmltYXJ5VGV4dCA9IGBTdGF2IMO6aHJhZHk6IDxzcGFuIHN0eWxlPVwiY29sb3I6IHJlZFwiPm5lcGxhdG7DqSBkYXR1bTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rcGlzIS5rcGlTYWxkb0NlbGtlbS5zZWNvbmRhcnlUZXh0ID0gXCIwXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtwaXMhLmtwaVNhbGRvQ2Vsa2VtLnRvb2x0aXAgPSBcIk5lbsOtIHphZMOhbm8gZGF0dW1cIjtcclxuICAgICAgICAgICAgICAgIHRoaXMua3Bpcz8udXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkRGF0YVwiIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy96w61za8OhbsOtIGRhdCB6ZSBzZXJ2ZXJ1IGEgbmFwbG7Em27DrSBncmlkdSBhIGNlbGtvdmUgY2FzdGt5IFxyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YU5hdmF6b3ZhbmUoaXhwRmlsdGVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL3rDrXNrw6Fuw60gbmF2YXpvdmFuw71jaCBkYXQgcHJvIGhsYXZuw60gc2FsZG8gYSBuYXBsbsSbbsOtIGdyaWR1IFNhbGRvIG5hdmF6b3ZhbsO9Y2ggcG9wbGF0bsOta8WvXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlNhbGRhLnNhbGRvTmF2YXpvdmFuZVxyXG4gICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGl4cEZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkTmF2YXphbmUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52eXBvY2l0YXROYXBvamVuZShkdG8uZGF0YSkgLy92eXBvxI3DrXTDoW7DrSBuYXBvamVuw71jaCBzYWxkICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5nZXRTYWxkYSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3rDrXNrw6Fuw60gZGF0IHplIHNlcnZlcnUgYSBuYXBsbsSbbsOtIGdyaWR1IGEgY2Vsa292ZSBjYXN0a3kgXHJcbiAgICAgICAgcHJpdmF0ZSB6aXNrZWpEYXRhT3ByYXZuZShpeHBGaWx0ZXI6IGFueSwgc2FsZG9fY2Vsa2VtKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpczsgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vesOtc2vDoW7DrSBvcHJhdm7DvWNoIGRhdCBwcm8gbmFwbG7Em27DrSBncmlkdSBPcHJhdm7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICB0aGF0LmlzbC5TYWxkYS5zYWxkb09wcmF2bmVcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBpeHBGaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZE9wcmF2bmUuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQudmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGR0by5kYXRhLmxlbmd0aCAhPSAwKSB0aGF0LnpvYnJheml0T3ByYXZuZShkdG8uZGF0YVswXS5zYWxkb19vcHJhdm5lLCBzYWxkb19jZWxrZW0pIC8vem9icmF6ZW7DrSBvcHJhdm7DvWNoIHNhbGRcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoYXQuem9icmF6aXRPcHJhdm5lKG51bGwsIHNhbGRvX2NlbGtlbSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9mb3Jtw6F0b3bDoW7DrSBzYWxkXHJcbiAgICAgICAgcHJpdmF0ZSBmb3JtYXROdW1iZXJXaXRoU3BhY2VzQW5kRGVjaW1hbHMobnVtYmVyOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWROdW1iZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywge1xyXG4gICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxyXG4gICAgICAgICAgICB9KS5mb3JtYXQobnVtYmVyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZWROdW1iZXIucmVwbGFjZSgvLC9nLCAnJykucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJyAnKS5yZXBsYWNlKCcuJywgJywnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGlza0Rva2xhZHUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoaXMudmlldyAhPSAwICkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5hcCA9IHRoYXQubmFwb2plbm8gPyAxIDogMDsgLy9wxZlldm9kIGZhbHNlIG5hIDAgYSB0cnVlIG5hIDFcclxuICAgICAgICAgICAgICAgIHZhciB2eXAgPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQudnlwb2NldCA9PSAxMCkgdnlwID0gMDtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoYXQudnlwb2NldCA9PSAyMCkgdnlwID0gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RUaXNrU2FsZCA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1NhbGRcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImRkcF9wdG1fc2FsZG9cIixcclxuICAgICAgICAgICAgICAgICAgICAvLyDihpMgTWV0b2RhLCBrdGVyw6EgamUgemF2b2zDoW5hIHTEm3NuxJsgcMWZZWQgZ2VuZXJvdsOhbsOtbSBzZXN0YXZ5IGEga2RlIGx6ZSBuYSBzdHJhbsSbIHNlcnZlcnUgb3ZsaXZuaXQgcGFyYW1ldHJ5IHNlc3Rhdnkg4oaTXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZHBXZWJUaXNrOlNhbGRhXCIsICAvL3pkZSBzZSBwbG7DrSB0w6ltYVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7ICAgLy9wb3PDrWzDoW7DrSBkYXQgbmEgc2VydmVyUGFyYW1ldGVyTWV0aG9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuaXhwRmlsdGVyLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtT2Q6IHRoYXQuZGF0X29kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0dW1EbzogdGhhdC5kYXRfZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXBvamVubzogbmFwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnlwb2NldDogdnlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdGhhdC5JeHBEZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2tfZGVuOiB0aGF0LlJva0RlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrU2FsZC5ydW4oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZsYXNoKFwiTmVqc291IG5hxI10ZW5hIMW+w6FkbsOhIGRhdGFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=