"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GNajitPripad.ts                        </Name>
//    <Description> Najít případ                                                </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2019-01-08                                                  </Created>
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
            let GNajitPripad = class GNajitPripad extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.srv = new GContent("Gordic.Ddp.WebClient.GWebDdpContent");
                    this.filters = {};
                    //private createChildrenRedist() {
                    //    const that = this;
                    //    var menuParams: MenuParams[] = [];
                    //    menuParams.push(
                    //        action: new GAction({
                    //            name: "actGPripadPredpisyPohyby", //! Akce pro rychlejší testování
                    //            caption: "Pohyby",
                    //            tooltip: "Zobrazení pohybů předpisu",
                    //            enabled: true, //that.permsDto.pb_predpis_pohyby!,
                    //            run: () => {
                    //                let predpis: Ddp.Interface.LK.Isl.GPredpisDto = { ixp: 'UP76X00284GB', radek_uhr: 1, stav_uz_pr: 100 }
                    //                Common.Predpisy.Actions.PohybyPredpisu(that, "UP76X00284GB", '0931', true, predpis); // typ_upr: '903121100'
                    //            }
                    //        },
                    //        action: new GAction({
                    //            name: "actGPripadOprPolozkaRozpisVypoctu", //! Akce pro rychlejší testování
                    //            caption: "Rozpis výpočtu",
                    //            tooltip: "Rozpis výpočtu opravných položek",
                    //            enabled: true,
                    //            run: () => {
                    //                var windowOption = { title: `Rozpis výpočtu opravných položek případu UP76P0005B8N`, width: 1000, height: 550 }; //todo:nastavení okna
                    //                var ParamJSON = { ID: "DDPGPripadOprPolozkaRozpisVypoctu#", Ixp: "UP76P0005B8N" }; //přenášené parametry
                    //                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPripadOprPolozkaRozpisVypoctu", ParamJSON, windowOption)
                    //            }
                    //        },
                    //        action: new GAction({
                    //            name: "actSaldoVymDr", //! Akce pro rychlejší testování
                    //            caption: "Převod k Exekuci", // "Saldo VYM DŘ",
                    //            description: "Převod k Exekuci", // "Saldo VYM DŘ",
                    //            enabled: true,
                    //            run: () => {
                    //                let now = new Date(Date.now());//!"dd.MM.yyyy"
                    //                let datumOd = new Date(2012, 1, 25);
                    //                let datumDo = new Date(now.getFullYear(), 11, 31);
                    //                let testPid = "MEHLX000A7G4"; // "MEHLX000QEBO";
                    //                let zpusob = Ddp.Interface.GDdpGlobalsBase.TypPrevoduPohledavky.prevod_do_exekuce;
                    //                let novyPid = "MEHLX0025P3A";
                    //                let ParamJSON = { ID: "DDPGSaldaVymDr#", Ixp: testPid, DatOd: datumOd, DatDo: datumDo, NewIxp: novyPid, ZpusobPrevodu: zpusob };
                    //                //that.navigate("Gordic.Ddp.WebClient.GSaldaVymDr", ParamJSON);
                    //                //
                    //                //let ParamJSON3 = { ID: "DDPGSaldaVymDr#", Ixp: testPid, DatOd: datumOd, DatDo: datumDo };
                    //                //that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GSaldaVymDr", ParamJSON3, { width: 1200, height: 600 })
                    //                //    .on("close", () => {
                    //                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GSaldaVymDr", ParamJSON, { width: 1000, height: 850 })
                    //                //    });
                    //            }
                    //        },
                    //        action: new GAction({
                    //            name: "actGPripadPredpisyProvestRozpisNe",
                    //            caption: "Rozpis NEDAŇ",
                    //            tooltip: "Rozpis předpisů",
                    //            enabled: true,
                    //            run: () => {
                    //                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GRozpisPredpisu", {
                    //                    ID: "#DDPGRozpisPredpisu#",
                    //                    Ixp: "MEHLX000OQ9C", TestDph: true,
                    //                }, `Rozpis předpisů - případ MEHLX000OQ9C`, 700, 700)
                    //                    .on("close", () => {
                    //                        //that.loadPredpisy(true);
                    //                    });
                    //            }
                    //        },
                    //        action: new GAction({
                    //            name: "actGPripadPredpisyProvestRozpisAno",
                    //            caption: "Rozpis DAŇ",
                    //            tooltip: "Rozpis předpisů",
                    //            enabled: true,
                    //            run: () => {
                    //                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GRozpisPredpisu", {
                    //                    ID: "#DDPGRozpisPredpisu#",
                    //                    Ixp: "MEHLX000AAHE",
                    //                }, `Rozpis předpisů - případ MEHLX000AAHE`, 700, 700)
                    //                    .on("close", () => {
                    //                        //that.loadPredpisy(true);
                    //                    });
                    //            }
                    //        }
                    //    );
                    //    return menuParams;
                    //}
                }
                onContentReady() {
                    const that = this;
                    that.title = "Hledání případu";
                    that.taskId = "actGNajitPripad";
                    that.createActions();
                    that.defaultForm = that.createForm();
                    that.gridSeznamPripadu = that.createGrid();
                    if (that.userSettings != null) {
                        let savedFilter = that.userSettings.get("GNajitPripadFilter");
                        if (savedFilter != null) {
                            that.defaultForm
                                .findFields()
                                .gfield("model", "apply", savedFilter);
                        }
                    }
                    //? TODO: posleední řádek je obsolete, boční preview řešen následujícím kodem a poslední řádke zakomentování, zbavil jsem se duplikovaného tlačítka zobrazení a snad to bude stačit a fungovat jak má
                    //this.previewController.registerPanel({ id: "previewPanel", minWidth: 650 });
                    that.previewController = new Gordic.Previews.GPreviewController(that.element, {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                viewId: "ddp:PripadPreview"
                            })
                        ]
                    });
                    that.testZmenyPhl();
                    Ddp.WebClient.Common.Base.setDateBoxShortcuts(that);
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                    that.defaultForm.findFields("ixp").gfield("focus");
                    that.autoLoadDataAfterOpen(); //! automatické načtení gridu po otevření - PŘED COMMITEM ZAKOMENTOVAT !
                }
                testZmenyPhl() {
                    if (this.TypPhlPrev) {
                        if (this.TypPhl != this.TypPhlPrev) {
                            this.view = undefined;
                            this.TypPhlPrev = this.TypPhl;
                        }
                    }
                }
                autoLoadDataAfterOpen() {
                    const that = this;
                    if (!that.x_Debug)
                        return;
                    // Pokus vložit hodnotu do filtru, ale lepší ho tam vecpat natvrdo ať neprovádím zbytečné úpravy na dalších místech
                    //x that.defaultForm!.findFields("ixp").gfield("setValue", "UP76X001N07E");
                    that.filters = this.getFilters();
                    that.filters.ixp = that.x_DBName[0] == "M" ? "MEHLX000AAHE" : "UP76X001N07E"; // MEHLX000OQ9C
                    if (that.view == undefined) {
                        that.view = new Gordic.Isl.View(that.isl.Pripad.list(rq => {
                            return {
                                filters: this.filters
                            };
                        }));
                        that.gridSeznamPripadu.ggrid("setData", that.view);
                        //? Přidaná část která rovnou načte první nalezený případ, pokud se nějaký našel
                        that.view.getLoadingPromise().done(function () {
                            let polozky = that.view.getDataRows(); // Po načtení gridu pokud se načetl zaznám tak se otevře detail případu
                            if (polozky.length > 0) {
                                WebClient.Common.Pripady.openPripadDetail(that, polozky[0].ixp);
                            }
                        });
                        this.view.refresh();
                    }
                }
                createForm() {
                    const that = this;
                    var form = new Gordic.Forms.Form({ name: "GNajitPripadFilterForm", layoutDescriptor: "L1M1S1" })
                        .addSection("Parametry hledání")
                        .addRow("Identifikátor / VS")
                        .addField("gstringbox", "w-6", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                        placeholder: "Přesný identifikátor"
                    })
                        .addField("gstringbox", "w-6", {
                        name: "vs",
                        placeholder: "Celý VS",
                        allowedChars: "0123456789*",
                        maxLength: 12 /* Interface.LK.Isl.GPripadDtoTypeLengths.vs */,
                        //validators: [new Gordic.Validators.Length({ max: 12 })] //? Nebo 10 ?
                    })
                        .addRow("RČ / Dat.nar. / IČO")
                        .addField("gstringbox", "w-4", {
                        name: "rc",
                        placeholder: "Celé rodné číslo bez lomítka",
                        validators: [new Gordic.Validators.RodneCislo({})]
                    })
                        .addField("gdatebox", "w-4", {
                        name: "dat_nar"
                    })
                        //.addRow({ label: "Datum narození", name: "dateIntervalRow" }) //RC 26256714 : Od-do
                        //.addField("gdatecombobox", {
                        //    name: "dat_nar",
                        //    //defaultInitialValue: this.model.DateInterval,
                        //    model: "model.dat_nar_value=value", //; model.dat_nar_fac=factor",
                        //    factors: [
                        //        { caption: "Od-Do", factor: "OdDo" },
                        //        //{ caption: "Od", factor: "Do" },
                        //        //{ caption: "DDo", factor: "Do" }
                        //    ],
                        //    //daysRangeMax: that.DaysRangeMax,
                        //    userSettings: that.userSettings,
                        //    contextMenu: {
                        //        //  daysRange: that.predplneniPocetDni
                        //    },
                        //    change: function (ev, obj) {  }
                        //})
                        .addField("gstringbox", "w-4", {
                        name: "ico_esu",
                        placeholder: "Celé IČO",
                        validators: [new Gordic.Validators.Length({ min: 5, max: 10 })],
                    })
                        .addRow("Název subjektu")
                        .addField("gstringbox", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "="], userOperators: [] }), {
                        name: "nazev_esu",
                        placeholder: "Název subjektu",
                        validators: [new Gordic.Validators.Length({ min: 2 })],
                    })
                        .addRow("Příjmení / Jméno")
                        .addField("gstringbox", "w-6", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "="], userOperators: [] }), {
                        name: "prijmeni_esu",
                        placeholder: "Příjmení",
                        validators: [new Gordic.Validators.Length({ min: 2 })],
                    })
                        .addField("gstringbox", "w-6", Gordic.Prefabs.String.withOperators({ defaultOperator: "LIKE", operators: ["LIKE", "="], userOperators: [] }), {
                        name: "jmeno_esu",
                        placeholder: "Jméno",
                        validators: [new Gordic.Validators.Length({ min: 2 })],
                    })
                        .addRow()
                        .addField("gcheck", "w-4", {
                        name: "aktualni_phl",
                        //initialValue: false,
                        label: "Aktuální typ pohledávky"
                    })
                        .addField("gcheck", "w-4", {
                        name: "pouse_s_pripady",
                        //initialValue: true,
                        label: "Pouze s evidovanými případy"
                    })
                        .addField("gcheck", "w-4", {
                        name: "pouze_aktivni_esu",
                        //initialValue: false,
                        label: "Pouze aktivní ESU"
                    })
                        .addRow()
                        .addField("gcheck", "w-4", {
                        name: "ulozit_filtr",
                        //initialValue: true,
                        label: "Pamatovat si filtr"
                    })
                        .addField("gcheck", "w-4", {
                        name: "case_sensitive",
                        //initialValue: true,
                        label: "Rozlišovat velikost písmen"
                    })
                        .addField("gcheck", "w-4", {
                        name: "bez_diakritiky",
                        //initialValue: false,
                        label: "Bez diakritiky"
                    })
                        .addRow({ customClass: "right" })
                        .addField("gbutton", { params: { customClass: "right", id: "actGNajitPripadVyhledat_button", action: that.actions["actGNajitPripadVyhledat"] } });
                    var div = $.newDiv()
                        .appendTo(that.element)
                        .gtab({
                        title: "Vyhledání případu",
                        opened: true,
                        menuBar: [{
                                action: that.actions["actPodaniZeSablony"],
                                favorite: true, align: "opposite"
                            }]
                    })
                        .gform("createFrom", form);
                    $("[data-param-id='actGNajitPripadVyhledat_button']").before($("<button>").css("margin-right", "5px").gbutton({ params: { action: that.actions["actGNajitPripadReset"] } }));
                    that.findForms("GNajitPripadFilterForm").gshortcut({
                        key: "ctrl+enter", //klávesová zkratka
                        action: that.actions["actGNajitPripadVyhledat"], //akce, která je spuštěna po zmáčknutí kombinace. Pokud akce není enabled, není enabled ani zkratka.
                        description: "Vyhledání případů", //Popis klávesové zkratky pro zobrazení v nápovědě. Pokud není zadán, je použit caption z akce.
                        group: Gordic.Shortcuts.Groups.Dialog,
                    });
                    return div;
                }
                createGrid() {
                    const that = this;
                    return $.newDiv("grid")
                        .appendTo(that.element)
                        //.gautofit()
                        .gautofit({ resizersOnTab: false })
                        .gtab({
                        title: "",
                        opened: true,
                        menuBar: [
                            {
                                action: that.actions["actGPohledavkyPopl"],
                                favorite: true
                            },
                            /////////////////////////////////////////////////////////////////////
                            //#region TEST AKCE
                            //{
                            //    action: that.actions["actGPripadPredpisyProvestRozpisNe"],
                            //    favorite: true
                            //},
                            //{
                            //    action: that.actions["actGPripadPredpisyProvestRozpisAno"],
                            //    favorite: true
                            //},
                            //#endregion TEST AKCE
                            /////////////////////////////////////////////////////////////////////
                        ]
                    })
                        .ggrid({
                        columnMode: "fit",
                        navigationMode: "row",
                        multi: true,
                        defaultAction: that.actions["actGNajitPripadGridVychoziAkce"],
                        scrollHelperTemplate: "{ExterniSubjekt.esu_txt}",
                        searchColumns: ["ixp", "vs", "ExterniSubjekt.esu_txt"],
                        columns: WebClient.Common.GridFormats.Pripady(),
                        defaultProfile: {
                            columnList: "ixp, vs, ExterniSubjekt.dat_nar, ExterniSubjekt.esu_txt, typ_phl"
                        },
                        cellActivate: (ev, ctx) => {
                            if (!that.closed) {
                                if (ctx != null && ctx.cellInfo != null && ctx.cellInfo.data != null) {
                                    that.previewController.enable(true);
                                    that.previewController.show(ctx.cellInfo.data);
                                }
                                else {
                                    that.previewController.enable(false);
                                }
                            }
                        }
                    });
                }
                getFilters() {
                    let filter = {};
                    this.defaultForm.findFields("ixp", "vs", "rc", "dat_nar", "ico_esu", "nazev_esu", "prijmeni_esu", "jmeno_esu", "aktualni_phl", "pouse_s_pripady", "pouze_aktivni_esu", "case_sensitive", "bez_diakritiky").gfield("model", "collect", filter);
                    return filter;
                }
                createActions() {
                    const that = this;
                    this.actions.addRange([
                        //#region DEFAULT ACTIONS
                        {
                            name: "actGNajitPripadZavritPotomky",
                            run: () => {
                                this.tryCloseAllSignificants();
                            }
                        }, {
                            name: "actGNajitPripadVyhledat",
                            caption: "Vyhledat",
                            run: () => {
                                if (this.defaultForm.gform("isValid")) {
                                    this.filters = this.getFilters();
                                    //if (this.view == undefined) {
                                    this.view = new Gordic.Isl.View(that.isl.Pripad.list(rq => {
                                        return {
                                            //fragments: ["ExterniSubjekt", "Default"],
                                            filters: this.filters
                                        };
                                    }));
                                    this.gridSeznamPripadu.ggrid("setData", this.view);
                                    this.view.refresh();
                                    //}
                                    //else {
                                    //    this.view!.requestData();
                                    //    this.view!.getLoadingPromise().done(() => {
                                    //        this.previewController.enable(this.view!.getCount() > 0);
                                    //    });
                                    //}
                                    let ulozit = this.defaultForm.findFields("ulozit_filtr").gfield("getValue");
                                    if (ulozit === true && this.userSettings != null) {
                                        this.userSettings.set("GNajitPripadFilter", this.filters);
                                    }
                                }
                            },
                            customClass: "g-button--primary"
                        }, {
                            name: "actGNajitPripadReset",
                            caption: "Reset",
                            run: () => {
                                this.previewController.enable(false);
                                this.defaultForm.findFields().gfield("reset");
                                this.view = undefined;
                                this.gridSeznamPripadu.ggrid("setData", [], true);
                                //this.refreshKPIs([]);
                            }
                        }, {
                            name: "actGNajitPripadGridVychoziAkce",
                            run: (ev, ctx) => {
                                let row = ctx.cellInfo.data;
                                if (row) {
                                    //? je tady nutný mít typ_phl na vstupu pro otevření detailu případu ?
                                    WebClient.Common.Pripady.openPripadDetail(this, row.ixp);
                                    //this.navigate("Gordic.Ddp.WebClient.GPripadDetail", { ID: "DDPGPripadDetail#", Ixp: row.ixp, TypPhl: row.typ_phl });
                                }
                            }
                        }, {
                            name: "actGPohledavkyPopl",
                            caption: "Případy Poplatníka", tooltip: "Zobrazení pohledávek poplatníka",
                            icon: WebClient.Common.Prefabs.Icons.PohledavkyPoplatnika(),
                            run: (ev, ctx) => {
                                const row = that.gridSeznamPripadu?.ggrid("activeRow");
                                if (row != undefined) {
                                    that.navigate("Gordic.Ddp.WebClient.GPohledavkyPopl", {
                                        ID: "DDPGPohledavkyPopl#",
                                        Ixp: row.ixp,
                                        TypPhl: row.typ_phl
                                    });
                                }
                            }
                        }, {
                            name: "actPodaniZeSablony", caption: "Podání ze šablony", icon: WebClient.Common.Prefabs.Icons.PodaniDokumentuZeSablony(),
                            enabled: true, //that.noImplement, // poté zřejmě vždycky true (?)
                            tooltip: "Podání nového případu podle šablony",
                            run: () => {
                                WebClient.Common.Pripady.podaniPripaduZeSablony(that, that.IxpDen, that.GinGenIxp);
                            }
                        },
                        //#endregion DEFAULT ACTIONS
                        //TODO: Následující akce slouží pro rychlejší testování - časem promazat/smazat !
                        //#region TEST ACTIONS
                        {
                            name: "actGPripadPredpisyPohyby", //! Akce pro rychlejší testování
                            caption: "Pohyby",
                            tooltip: "Zobrazení pohybů předpisu",
                            enabled: true, //that.permsDto.pb_predpis_pohyby!,
                            run: () => {
                                let predpis = { ixp: 'UP76X00284GB', radek_uhr: 1, stav_uz_pr: 100 };
                                WebClient.Common.Predpisy.Actions.PohybyPredpisu(that, "UP76X00284GB", '0931', true, predpis); // typ_upr: '903121100'
                            }
                        }, {
                            name: "actGPripadOprPolozkaRozpisVypoctu", //! Akce pro rychlejší testování
                            caption: "Rozpis výpočtu",
                            tooltip: "Rozpis výpočtu opravných položek",
                            enabled: true,
                            run: () => {
                                var windowOption = { title: `Rozpis výpočtu opravných položek případu UP76P0005B8N`, width: 1000, height: 550 }; //todo:nastavení okna
                                var ParamJSON = { ID: "DDPGPripadOprPolozkaRozpisVypoctu#", Ixp: "UP76P0005B8N" }; //přenášené parametry
                                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GPripadOprPolozkaRozpisVypoctu", ParamJSON, windowOption);
                            }
                        }, {
                            name: "actSaldoVymDr", //! Akce pro rychlejší testování
                            caption: "Převod k Exekuci", // "Saldo VYM DŘ",
                            description: "Převod k Exekuci", // "Saldo VYM DŘ",
                            enabled: true,
                            run: () => {
                                let now = new Date(Date.now()); //!"dd.MM.yyyy"
                                let datumOd = new Date(2012, 1, 25);
                                let datumDo = new Date(now.getFullYear(), 11, 31);
                                let testPid = "MEHLX000A7G4"; // "MEHLX000QEBO";
                                let zpusob = 1 /* Ddp.Interface.GDdpGlobalsBase.TypPrevoduPohledavky.prevod_do_exekuce */;
                                let novyPid = "MEHLX0025P3A";
                                let ParamJSON = { ID: "DDPGSaldaVymDr#", Ixp: testPid, DatOd: datumOd, DatDo: datumDo, NewIxp: novyPid, ZpusobPrevodu: zpusob };
                                //that.navigate("Gordic.Ddp.WebClient.GSaldaVymDr", ParamJSON);
                                //
                                //let ParamJSON3 = { ID: "DDPGSaldaVymDr#", Ixp: testPid, DatOd: datumOd, DatDo: datumDo };
                                //that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GSaldaVymDr", ParamJSON3, { width: 1200, height: 600 })
                                //    .on("close", () => {
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GSaldaVymDr", ParamJSON, { width: 1000, height: 850 });
                                //    });
                            }
                        }, {
                            name: "actGPripadPredpisyProvestRozpisNe",
                            caption: "Rozpis NEDAŇ",
                            tooltip: "Rozpis předpisů",
                            enabled: true,
                            run: () => {
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GRozpisPredpisu", {
                                    ID: "#DDPGRozpisPredpisu#",
                                    Ixp: "MEHLX000OQ9C", TestDph: true,
                                }, `Rozpis předpisů - případ MEHLX000OQ9C`, 700, 700)
                                    .on("close", () => {
                                    //that.loadPredpisy(true);
                                });
                            }
                        }, {
                            name: "actGPripadPredpisyProvestRozpisAno",
                            caption: "Rozpis DAŇ",
                            tooltip: "Rozpis předpisů",
                            enabled: true,
                            run: () => {
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GRozpisPredpisu", {
                                    ID: "#DDPGRozpisPredpisu#",
                                    Ixp: "MEHLX000AAHE",
                                }, `Rozpis předpisů - případ MEHLX000AAHE`, 700, 700)
                                    .on("close", () => {
                                    //that.loadPredpisy(true);
                                });
                            }
                        }
                        //#endregion TEST ACTIONS
                    ]);
                }
            };
            GNajitPripad = __decorate([
                Decorators.gcontent
            ], GNajitPripad);
            WebClient.GNajitPripad = GNajitPripad;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR05haml0UHJpcGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR05haml0UHJpcGFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBa2hCZjtBQWxoQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBa2hCbkI7SUFsaEJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FraEI3QjtRQWxoQm9CLFdBQUEsU0FBUztZQUUxQixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsT0FBQSxZQUFZO2dCQUE5Qzs7b0JBRVksUUFBRyxHQUFHLElBQUksUUFBUSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7b0JBTTFELFlBQU8sR0FBUSxFQUFFLENBQUM7b0JBbWIxQixrQ0FBa0M7b0JBQ2xDLHdCQUF3QjtvQkFDeEIsd0NBQXdDO29CQUV4QyxzQkFBc0I7b0JBQ3RCLCtCQUErQjtvQkFDL0IsZ0ZBQWdGO29CQUNoRixnQ0FBZ0M7b0JBQ2hDLG1EQUFtRDtvQkFDbkQsZ0VBQWdFO29CQUNoRSwwQkFBMEI7b0JBQzFCLHdIQUF3SDtvQkFDeEgsOEhBQThIO29CQUM5SCxlQUFlO29CQUNmLFlBQVk7b0JBQ1osK0JBQStCO29CQUMvQix5RkFBeUY7b0JBQ3pGLHdDQUF3QztvQkFDeEMsMERBQTBEO29CQUMxRCw0QkFBNEI7b0JBQzVCLDBCQUEwQjtvQkFDMUIsd0pBQXdKO29CQUN4SiwwSEFBMEg7b0JBQzFILDhIQUE4SDtvQkFDOUgsZUFBZTtvQkFDZixZQUFZO29CQUNaLCtCQUErQjtvQkFDL0IscUVBQXFFO29CQUNyRSw2REFBNkQ7b0JBQzdELGlFQUFpRTtvQkFDakUsNEJBQTRCO29CQUM1QiwwQkFBMEI7b0JBQzFCLGdFQUFnRTtvQkFDaEUs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VCxhQUFTLEtBQVQsYUFBUyxRQWtoQjdCO0lBQUQsQ0FBQyxFQWxoQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtoQm5CO0FBQUQsQ0FBQyxFQWxoQlMsTUFBTSxLQUFOLE1BQU0sUUFraEJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdOYWppdFByaXBhZC50cyAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBOYWrDrXQgcMWZw61wYWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDE5LTAxLTA4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcblxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTmFqaXRQcmlwYWQgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwcml2YXRlIHNydiA9IG5ldyBHQ29udGVudChcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdXZWJEZHBDb250ZW50XCIpO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBrcGlQYW5lbDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFNlem5hbVByaXBhZHU6IEpRdWVyeTtcclxuICAgICAgICBwcml2YXRlIHByZXZpZXdDb250cm9sbGVyOiBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREdG8+IHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyczogYW55ID0ge307XHJcbiAgICAgICAgLyoqIFByb20uIHBybyB1csSNZW7DrSB6cMWvc29idSBnZW5lcm92w6Fuw60gUElEdSAqL1xyXG4gICAgICAgIEdpbkdlbkl4cDogc3RyaW5nXHJcbiAgICAgICAgLyoqIEl4cCBkZW4geiBla29wYXJhbXMgICovXHJcbiAgICAgICAgSXhwRGVuOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIElkLsSNw61zbG8gdHlwdSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIFR5cFBobDogc3RyaW5nO1xyXG4gICAgICAgIFR5cFBobFByZXY6IHN0cmluZztcclxuICAgICAgICAvKiogVGV4dCB2csOhY2Vuw70gcG8gaW5pdHUgS25paHkgYSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIEluaXRFcnJvclRleHQ6IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgeF9EQk5hbWU6IHN0cmluZztcclxuICAgICAgICB4X0RlYnVnOiBib29sZWFuO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBcIkhsZWTDoW7DrSBwxZnDrXBhZHVcIjtcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdOYWppdFByaXBhZFwiO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtID0gdGhhdC5jcmVhdGVGb3JtKCk7XHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZFNlem5hbVByaXBhZHUgPSB0aGF0LmNyZWF0ZUdyaWQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnVzZXJTZXR0aW5ncyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2F2ZWRGaWx0ZXIgPSB0aGF0LnVzZXJTZXR0aW5ncy5nZXQoXCJHTmFqaXRQcmlwYWRGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2F2ZWRGaWx0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgc2F2ZWRGaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLz8gVE9ETzogcG9zbGVlZG7DrSDFmcOhZGVrIGplIG9ic29sZXRlLCBib8SNbsOtIHByZXZpZXcgxZllxaFlbiBuw6FzbGVkdWrDrWPDrW0ga29kZW0gYSBwb3NsZWRuw60gxZnDoWRrZSB6YWtvbWVudG92w6Fuw60sIHpiYXZpbCBqc2VtIHNlIGR1cGxpa292YW7DqWhvIHRsYcSNw610a2Egem9icmF6ZW7DrSBhIHNuYWQgdG8gYnVkZSBzdGHEjWl0IGEgZnVuZ292YXQgamFrIG3DoVxyXG4gICAgICAgICAgICAvL3RoaXMucHJldmlld0NvbnRyb2xsZXIucmVnaXN0ZXJQYW5lbCh7IGlkOiBcInByZXZpZXdQYW5lbFwiLCBtaW5XaWR0aDogNjUwIH0pO1xyXG4gICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyID0gbmV3IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXIodGhhdC5lbGVtZW50LCB7IC8vIHRoYXQuZ3JpZFNlem5hbVByaXBhZHUsIHsgIC0gVEVTVFxyXG4gICAgICAgICAgICAgICAgdGFiczogW1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmV2aWV3cy5nZXREZWZhdWx0UHJldmlld1RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdJZDogXCJkZHA6UHJpcGFkUHJldmlld1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSk7ICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhhdC50ZXN0Wm1lbnlQaGwoKTtcclxuICAgICAgICAgICAgRGRwLldlYkNsaWVudC5Db21tb24uQmFzZS5zZXREYXRlQm94U2hvcnRjdXRzKHRoYXQpO1xyXG4gICAgICAgICAgICBEZHAuV2ViQ2xpZW50LkNvbW1vbi5CYXNlLkRkcEVrb0luaXQodGhhdCwgdGhhdC5Jbml0RXJyb3JUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJpeHBcIikuZ2ZpZWxkKFwiZm9jdXNcIilcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYXV0b0xvYWREYXRhQWZ0ZXJPcGVuKCk7IC8vISBhdXRvbWF0aWNrw6kgbmHEjXRlbsOtIGdyaWR1IHBvIG90ZXbFmWVuw60gLSBQxZhFRCBDT01NSVRFTSBaQUtPTUVOVE9WQVQgIVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0ZXN0Wm1lbnlQaGwoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFBobFByZXYpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlR5cFBobCAhPSB0aGlzLlR5cFBobFByZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UeXBQaGxQcmV2ID0gdGhpcy5UeXBQaGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYXV0b0xvYWREYXRhQWZ0ZXJPcGVuKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGF0LnhfRGVidWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8vIFBva3VzIHZsb8W+aXQgaG9kbm90dSBkbyBmaWx0cnUsIGFsZSBsZXDFocOtIGhvIHRhbSB2ZWNwYXQgbmF0dnJkbyBhxaUgbmVwcm92w6Fkw61tIHpieXRlxI1uw6kgw7pwcmF2eSBuYSBkYWzFocOtY2ggbcOtc3RlY2hcclxuICAgICAgICAgICAgLy94IHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJpeHBcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCJVUDc2WDAwMU4wN0VcIik7XHJcbiAgICAgICAgICAgIHRoYXQuZmlsdGVycyA9IHRoaXMuZ2V0RmlsdGVycygpO1xyXG4gICAgICAgICAgICB0aGF0LmZpbHRlcnMuaXhwID0gdGhhdC54X0RCTmFtZVswXSA9PSBcIk1cIiA/IFwiTUVITFgwMDBBQUhFXCIgOiBcIlVQNzZYMDAxTjA3RVwiOyAgICAvLyBNRUhMWDAwME9ROUNcclxuICAgICAgICAgICAgaWYgKHRoYXQudmlldyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhhdC5pc2wuUHJpcGFkLmxpc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhpcy5maWx0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkU2V6bmFtUHJpcGFkdS5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3KTtcclxuICAgICAgICAgICAgICAgIC8vPyBQxZlpZGFuw6EgxI3DoXN0IGt0ZXLDoSByb3Zub3UgbmHEjXRlIHBydm7DrSBuYWxlemVuw70gcMWZw61wYWQsIHBva3VkIHNlIG7Em2pha8O9IG5hxaFlbFxyXG4gICAgICAgICAgICAgICAgdGhhdC52aWV3LmdldExvYWRpbmdQcm9taXNlKCkuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvbG96a3kgPSB0aGF0LnZpZXchLmdldERhdGFSb3dzKCk7IC8vIFBvIG5hxI10ZW7DrSBncmlkdSBwb2t1ZCBzZSBuYcSNZXRsIHphem7DoW0gdGFrIHNlIG90ZXbFmWUgZGV0YWlsIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2xvemt5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLlByaXBhZHkub3BlblByaXBhZERldGFpbCh0aGF0LCBwb2xvemt5WzBdLml4cCk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pOyAgXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3IS5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKTogSlF1ZXJ5IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJHTmFqaXRQcmlwYWRGaWx0ZXJGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUGFyYW1ldHJ5IGhsZWTDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yIC8gVlNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJQxZllc27DvSBpZGVudGlmaWvDoXRvclwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkNlbMO9IFZTXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODkqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoOiBJbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREdG9UeXBlTGVuZ3Rocy52cyxcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAxMiB9KV0gLy8/IE5lYm8gMTAgP1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJSxIwgLyBEYXQubmFyLiAvIEnEjE9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmNcIixcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJDZWzDqSByb2Ruw6kgxI3DrXNsbyBiZXogbG9tw610a2FcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJvZG5lQ2lzbG8oe30pXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9uYXJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyh7IGxhYmVsOiBcIkRhdHVtIG5hcm96ZW7DrVwiLCBuYW1lOiBcImRhdGVJbnRlcnZhbFJvd1wiIH0pIC8vUkMgMjYyNTY3MTQgOiBPZC1kb1xyXG4gICAgICAgICAgICAgICAgLy8uYWRkRmllbGQoXCJnZGF0ZWNvbWJvYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZGF0X25hclwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy9kZWZhdWx0SW5pdGlhbFZhbHVlOiB0aGlzLm1vZGVsLkRhdGVJbnRlcnZhbCxcclxuICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcIm1vZGVsLmRhdF9uYXJfdmFsdWU9dmFsdWVcIiwgLy87IG1vZGVsLmRhdF9uYXJfZmFjPWZhY3RvclwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZmFjdG9yczogW1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHsgY2FwdGlvbjogXCJPZC1Eb1wiLCBmYWN0b3I6IFwiT2REb1wiIH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy97IGNhcHRpb246IFwiT2RcIiwgZmFjdG9yOiBcIkRvXCIgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3sgY2FwdGlvbjogXCJERG9cIiwgZmFjdG9yOiBcIkRvXCIgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgXSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vZGF5c1JhbmdlTWF4OiB0aGF0LkRheXNSYW5nZU1heCxcclxuICAgICAgICAgICAgICAgIC8vICAgIHVzZXJTZXR0aW5nczogdGhhdC51c2VyU2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjb250ZXh0TWVudToge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vICBkYXlzUmFuZ2U6IHRoYXQucHJlZHBsbmVuaVBvY2V0RG5pXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikgeyAgfVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29fZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiQ2Vsw6kgScSMT1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWluOiA1LCBtYXg6IDEwIH0pXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOhemV2IHN1Ympla3R1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoeyBkZWZhdWx0T3BlcmF0b3I6IFwiTElLRVwiLCBvcGVyYXRvcnM6IFtcIkxJS0VcIiwgXCI9XCJdLCB1c2VyT3BlcmF0b3JzOiBbXSB9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiTsOhemV2IHN1Ympla3R1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtaW46IDIgfSldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQxZnDrWptZW7DrSAvIEptw6lub1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCBQcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKHsgZGVmYXVsdE9wZXJhdG9yOiBcIkxJS0VcIiwgb3BlcmF0b3JzOiBbXCJMSUtFXCIsIFwiPVwiXSwgdXNlck9wZXJhdG9yczogW10gfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaWptZW5pX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlDFmcOtam1lbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtaW46IDIgfSldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5TdHJpbmcud2l0aE9wZXJhdG9ycyh7IGRlZmF1bHRPcGVyYXRvcjogXCJMSUtFXCIsIG9wZXJhdG9yczogW1wiTElLRVwiLCBcIj1cIl0sIHVzZXJPcGVyYXRvcnM6IFtdIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJqbWVub19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJKbcOpbm9cIixcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1pbjogMiB9KV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0dWFsbmlfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkFrdHXDoWxuw60gdHlwIHBvaGxlZMOhdmt5XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG91c2Vfc19wcmlwYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG91emUgcyBldmlkb3ZhbsO9bWkgcMWZw61wYWR5XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG91emVfYWt0aXZuaV9lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG91emUgYWt0aXZuw60gRVNVXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1bG96aXRfZmlsdHJcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQYW1hdG92YXQgc2kgZmlsdHJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYXNlX3NlbnNpdGl2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlJvemxpxaFvdmF0IHZlbGlrb3N0IHDDrXNtZW5cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJiZXpfZGlha3JpdGlreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJCZXogZGlha3JpdGlreVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGN1c3RvbUNsYXNzOiBcInJpZ2h0XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgeyBwYXJhbXM6IHsgY3VzdG9tQ2xhc3M6IFwicmlnaHRcIiwgaWQ6IFwiYWN0R05haml0UHJpcGFkVnlobGVkYXRfYnV0dG9uXCIsIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R05haml0UHJpcGFkVnlobGVkYXRcIl0gfSB9KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIGRpdiA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVnlobGVkw6Fuw60gcMWZw61wYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6W3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RQb2RhbmlaZVNhYmxvbnlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG5cclxuICAgICAgICAgICAgJChcIltkYXRhLXBhcmFtLWlkPSdhY3RHTmFqaXRQcmlwYWRWeWhsZWRhdF9idXR0b24nXVwiKS5iZWZvcmUoJChcIjxidXR0b24+XCIpLmNzcyhcIm1hcmdpbi1yaWdodFwiLCBcIjVweFwiKS5nYnV0dG9uKHsgcGFyYW1zOiB7IGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R05haml0UHJpcGFkUmVzZXRcIl0gfSB9KSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcIkdOYWppdFByaXBhZEZpbHRlckZvcm1cIikhLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiY3RybCtlbnRlclwiLCAvL2tsw6F2ZXNvdsOhIHprcmF0a2FcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R05haml0UHJpcGFkVnlobGVkYXRcIl0sIC8vYWtjZSwga3RlcsOhIGplIHNwdcWhdMSbbmEgcG8gem3DocSNa251dMOtIGtvbWJpbmFjZS4gUG9rdWQgYWtjZSBuZW7DrSBlbmFibGVkLCBuZW7DrSBlbmFibGVkIGFuaSB6a3JhdGthLlxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVnlobGVkw6Fuw60gcMWZw61wYWTFr1wiLCAvL1BvcGlzIGtsw6F2ZXNvdsOpIHprcmF0a3kgcHJvIHpvYnJhemVuw60gdiBuw6Fwb3bEm2TEmy4gUG9rdWQgbmVuw60gemFkw6FuLCBqZSBwb3XFvml0IGNhcHRpb24geiBha2NlLlxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkRpYWxvZyxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGl2O1xyXG4gICAgICAgIH0gICAgICAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpOiBKUXVlcnkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuICQubmV3RGl2KFwiZ3JpZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC8vLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQb2hsZWRhdmt5UG9wbFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIFRFU1QgQUtDRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmlwYWRQcmVkcGlzeVByb3Zlc3RSb3pwaXNOZVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R1ByaXBhZFByZWRwaXN5UHJvdmVzdFJvenBpc0Fub1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyNlbmRyZWdpb24gVEVTVCBBS0NFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R05haml0UHJpcGFkR3JpZFZ5Y2hvemlBa2NlXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEhlbHBlclRlbXBsYXRlOiBcIntFeHRlcm5pU3ViamVrdC5lc3VfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIml4cFwiLCBcInZzXCIsIFwiRXh0ZXJuaVN1Ympla3QuZXN1X3R4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuUHJpcGFkeSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwiaXhwLCB2cywgRXh0ZXJuaVN1Ympla3QuZGF0X25hciwgRXh0ZXJuaVN1Ympla3QuZXN1X3R4dCwgdHlwX3BobFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHggIT0gbnVsbCAmJiBjdHguY2VsbEluZm8gIT0gbnVsbCAmJiBjdHguY2VsbEluZm8uZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KGN0eC5jZWxsSW5mby5kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfSAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RmlsdGVycygpIHtcclxuICAgICAgICAgICAgbGV0IGZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJpeHBcIiwgXCJ2c1wiLCBcInJjXCIsIFwiZGF0X25hclwiLCBcImljb19lc3VcIiwgXCJuYXpldl9lc3VcIiwgXCJwcmlqbWVuaV9lc3VcIiwgXCJqbWVub19lc3VcIiwgXCJha3R1YWxuaV9waGxcIiwgXCJwb3VzZV9zX3ByaXBhZHlcIiwgXCJwb3V6ZV9ha3Rpdm5pX2VzdVwiLCBcImNhc2Vfc2Vuc2l0aXZlXCIsIFwiYmV6X2RpYWtyaXRpa3lcIikuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGZpbHRlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gREVGQVVMVCBBQ1RJT05TXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHTmFqaXRQcmlwYWRaYXZyaXRQb3RvbWt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5Q2xvc2VBbGxTaWduaWZpY2FudHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHTmFqaXRQcmlwYWRWeWhsZWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlobGVkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdEZvcm0hLmdmb3JtKFwiaXNWYWxpZFwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVycyA9IHRoaXMuZ2V0RmlsdGVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhpcy52aWV3ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGF0LmlzbC5QcmlwYWQubGlzdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ZyYWdtZW50czogW1wiRXh0ZXJuaVN1Ympla3RcIiwgXCJEZWZhdWx0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhpcy5maWx0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkU2V6bmFtUHJpcGFkdS5nZ3JpZChcInNldERhdGFcIiwgdGhpcy52aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlldyEucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy52aWV3IS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy52aWV3IS5nZXRMb2FkaW5nUHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRoaXMudmlldyEuZ2V0Q291bnQoKSA+IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdWxveml0ID0gdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcInVsb3ppdF9maWx0clwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bG96aXQgPT09IHRydWUgJiYgdGhpcy51c2VyU2V0dGluZ3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzIS5zZXQoXCJHTmFqaXRQcmlwYWRGaWx0ZXJcIiwgdGhpcy5maWx0ZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R05haml0UHJpcGFkUmVzZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJlc2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXcgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZFNlem5hbVByaXBhZHUuZ2dyaWQoXCJzZXREYXRhXCIsIFtdLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnJlZnJlc2hLUElzKFtdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHTmFqaXRQcmlwYWRHcmlkVnljaG96aUFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3c6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRHRvID0gY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPyBqZSB0YWR5IG51dG7DvSBtw610IHR5cF9waGwgbmEgdnN0dXB1IHBybyBvdGV2xZllbsOtIGRldGFpbHUgcMWZw61wYWR1ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5QcmlwYWR5Lm9wZW5QcmlwYWREZXRhaWwodGhpcywgcm93Lml4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkRGV0YWlsXCIsIHsgSUQ6IFwiRERQR1ByaXBhZERldGFpbCNcIiwgSXhwOiByb3cuaXhwLCBUeXBQaGw6IHJvdy50eXBfcGhsIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1BvaGxlZGF2a3lQb3BsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZnDrXBhZHkgUG9wbGF0bsOta2FcIiwgdG9vbHRpcDogXCJab2JyYXplbsOtIHBvaGxlZMOhdmVrIHBvcGxhdG7DrWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogQ29tbW9uLlByZWZhYnMuSWNvbnMuUG9obGVkYXZreVBvcGxhdG5pa2EoKSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoYXQuZ3JpZFNlem5hbVByaXBhZHU/LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQb2hsZWRhdmt5UG9wbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR1BvaGxlZGF2a3lQb3BsI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHJvdy5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cFBobDogcm93LnR5cF9waGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UG9kYW5pWmVTYWJsb255XCIsIGNhcHRpb246IFwiUG9kw6Fuw60gemUgxaFhYmxvbnlcIiwgaWNvbjogQ29tbW9uLlByZWZhYnMuSWNvbnMuUG9kYW5pRG9rdW1lbnR1WmVTYWJsb255KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgLy90aGF0Lm5vSW1wbGVtZW50LCAvLyBwb3TDqSB6xZllam3EmyB2xb5keWNreSB0cnVlICg/KVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiUG9kw6Fuw60gbm92w6lobyBwxZnDrXBhZHUgcG9kbGUgxaFhYmxvbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLlByaXBhZHkucG9kYW5pUHJpcGFkdVplU2FibG9ueSh0aGF0LCB0aGF0Lkl4cERlbiwgdGhhdC5HaW5HZW5JeHApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyNlbmRyZWdpb24gREVGQVVMVCBBQ1RJT05TXHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IE7DoXNsZWR1asOtY8OtIGFrY2Ugc2xvdcW+w60gcHJvIHJ5Y2hsZWrFocOtIHRlc3RvdsOhbsOtIC0gxI1hc2VtIHByb21hemF0L3NtYXphdCAhXHJcbiAgICAgICAgICAgICAgICAvLyNyZWdpb24gVEVTVCBBQ1RJT05TXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkUHJlZHBpc3lQb2h5YnlcIiwgLy8hIEFrY2UgcHJvIHJ5Y2hsZWrFocOtIHRlc3RvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb2h5YnlcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhemVuw60gcG9oeWLFryBwxZllZHBpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLCAvL3RoYXQucGVybXNEdG8ucGJfcHJlZHBpc19wb2h5YnkhLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJlZHBpczogRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG8gPSB7IGl4cDogJ1VQNzZYMDAyODRHQicsIHJhZGVrX3VocjogMSwgc3Rhdl91el9wcjogMTAwIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLlByZWRwaXN5LkFjdGlvbnMuUG9oeWJ5UHJlZHBpc3UodGhhdCwgXCJVUDc2WDAwMjg0R0JcIiwgJzA5MzEnLCB0cnVlLCBwcmVkcGlzKTsgLy8gdHlwX3VwcjogJzkwMzEyMTEwMCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkT3ByUG9sb3prYVJvenBpc1Z5cG9jdHVcIiwgLy8hIEFrY2UgcHJvIHJ5Y2hsZWrFocOtIHRlc3RvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb3pwaXMgdsO9cG/EjXR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJSb3pwaXMgdsO9cG/EjXR1IG9wcmF2bsO9Y2ggcG9sb8W+ZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luZG93T3B0aW9uID0geyB0aXRsZTogYFJvenBpcyB2w71wb8SNdHUgb3ByYXZuw71jaCBwb2xvxb5layBwxZnDrXBhZHUgVVA3NlAwMDA1QjhOYCwgd2lkdGg6IDEwMDAsIGhlaWdodDogNTUwIH07IC8vdG9kbzpuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIFBhcmFtSlNPTiA9IHsgSUQ6IFwiRERQR1ByaXBhZE9wclBvbG96a2FSb3pwaXNWeXBvY3R1I1wiLCBJeHA6IFwiVVA3NlAwMDA1QjhOXCIgfTsgLy9wxZllbsOhxaFlbsOpIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZE9wclBvbG96a2FSb3pwaXNWeXBvY3R1XCIsIFBhcmFtSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhbGRvVnltRHJcIiwgLy8hIEFrY2UgcHJvIHJ5Y2hsZWrFocOtIHRlc3RvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZlldm9kIGsgRXhla3VjaVwiLCAvLyBcIlNhbGRvIFZZTSBExZhcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQxZlldm9kIGsgRXhla3VjaVwiLCAvLyBcIlNhbGRvIFZZTSBExZhcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7Ly8hXCJkZC5NTS55eXl5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdHVtT2QgPSBuZXcgRGF0ZSgyMDEyLCAxLCAyNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXR1bURvID0gbmV3IERhdGUobm93LmdldEZ1bGxZZWFyKCksIDExLCAzMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0UGlkID0gXCJNRUhMWDAwMEE3RzRcIjsgLy8gXCJNRUhMWDAwMFFFQk9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHpwdXNvYiA9IERkcC5JbnRlcmZhY2UuR0RkcEdsb2JhbHNCYXNlLlR5cFByZXZvZHVQb2hsZWRhdmt5LnByZXZvZF9kb19leGVrdWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm92eVBpZCA9IFwiTUVITFgwMDI1UDNBXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBQYXJhbUpTT04gPSB7IElEOiBcIkREUEdTYWxkYVZ5bURyI1wiLCBJeHA6IHRlc3RQaWQsIERhdE9kOiBkYXR1bU9kLCBEYXREbzogZGF0dW1EbywgTmV3SXhwOiBub3Z5UGlkLCBacHVzb2JQcmV2b2R1OiB6cHVzb2IgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1NhbGRhVnltRHJcIiwgUGFyYW1KU09OKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgUGFyYW1KU09OMyA9IHsgSUQ6IFwiRERQR1NhbGRhVnltRHIjXCIsIEl4cDogdGVzdFBpZCwgRGF0T2Q6IGRhdHVtT2QsIERhdERvOiBkYXR1bURvIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTYWxkYVZ5bURyXCIsIFBhcmFtSlNPTjMsIHsgd2lkdGg6IDEyMDAsIGhlaWdodDogNjAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC5vbihcImNsb3NlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTYWxkYVZ5bURyXCIsIFBhcmFtSlNPTiwgeyB3aWR0aDogMTAwMCwgaGVpZ2h0OiA4NTAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R1ByaXBhZFByZWRwaXN5UHJvdmVzdFJvenBpc05lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb3pwaXMgTkVEQcWHXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJSb3pwaXMgcMWZZWRwaXPFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUm96cGlzUHJlZHBpc3VcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiI0REUEdSb3pwaXNQcmVkcGlzdSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogXCJNRUhMWDAwME9ROUNcIiwgVGVzdERwaDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgYFJvenBpcyBwxZllZHBpc8WvIC0gcMWZw61wYWQgTUVITFgwMDBPUTlDYCwgNzAwLCA3MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRQcmVkcGlzeSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRQcmVkcGlzeVByb3Zlc3RSb3pwaXNBbm9cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJvenBpcyBEQcWHXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJSb3pwaXMgcMWZZWRwaXPFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUm96cGlzUHJlZHBpc3VcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiI0REUEdSb3pwaXNQcmVkcGlzdSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogXCJNRUhMWDAwMEFBSEVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgYFJvenBpcyBwxZllZHBpc8WvIC0gcMWZw61wYWQgTUVITFgwMDBBQUhFYCwgNzAwLCA3MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRQcmVkcGlzeSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uIFRFU1QgQUNUSU9OU1xyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBjcmVhdGVDaGlsZHJlblJlZGlzdCgpIHtcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICB2YXIgbWVudVBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgIC8vICAgIG1lbnVQYXJhbXMucHVzaChcclxuICAgICAgICAvLyAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRQcmVkcGlzeVBvaHlieVwiLCAvLyEgQWtjZSBwcm8gcnljaGxlasWhw60gdGVzdG92w6Fuw61cclxuICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwiUG9oeWJ5XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhemVuw60gcG9oeWLFryBwxZllZHBpc3VcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vdGhhdC5wZXJtc0R0by5wYl9wcmVkcGlzX3BvaHlieSEsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgcHJlZHBpczogRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG8gPSB7IGl4cDogJ1VQNzZYMDAyODRHQicsIHJhZGVrX3VocjogMSwgc3Rhdl91el9wcjogMTAwIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBDb21tb24uUHJlZHBpc3kuQWN0aW9ucy5Qb2h5YnlQcmVkcGlzdSh0aGF0LCBcIlVQNzZYMDAyODRHQlwiLCAnMDkzMScsIHRydWUsIHByZWRwaXMpOyAvLyB0eXBfdXByOiAnOTAzMTIxMTAwJ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiYWN0R1ByaXBhZE9wclBvbG96a2FSb3pwaXNWeXBvY3R1XCIsIC8vISBBa2NlIHBybyByeWNobGVqxaHDrSB0ZXN0b3bDoW7DrVxyXG4gICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJSb3pwaXMgdsO9cG/EjXR1XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0b29sdGlwOiBcIlJvenBpcyB2w71wb8SNdHUgb3ByYXZuw71jaCBwb2xvxb5la1wiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciB3aW5kb3dPcHRpb24gPSB7IHRpdGxlOiBgUm96cGlzIHbDvXBvxI10dSBvcHJhdm7DvWNoIHBvbG/FvmVrIHDFmcOtcGFkdSBVUDc2UDAwMDVCOE5gLCB3aWR0aDogMTAwMCwgaGVpZ2h0OiA1NTAgfTsgLy90b2RvOm5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciBQYXJhbUpTT04gPSB7IElEOiBcIkREUEdQcmlwYWRPcHJQb2xvemthUm96cGlzVnlwb2N0dSNcIiwgSXhwOiBcIlVQNzZQMDAwNUI4TlwiIH07IC8vcMWZZW7DocWhZW7DqSBwYXJhbWV0cnlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZE9wclBvbG96a2FSb3pwaXNWeXBvY3R1XCIsIFBhcmFtSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiYWN0U2FsZG9WeW1EclwiLCAvLyEgQWtjZSBwcm8gcnljaGxlasWhw60gdGVzdG92w6Fuw61cclxuICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwiUMWZZXZvZCBrIEV4ZWt1Y2lcIiwgLy8gXCJTYWxkbyBWWU0gRMWYXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQxZlldm9kIGsgRXhla3VjaVwiLCAvLyBcIlNhbGRvIFZZTSBExZhcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7Ly8hXCJkZC5NTS55eXl5XCJcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgZGF0dW1PZCA9IG5ldyBEYXRlKDIwMTIsIDEsIDI1KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgZGF0dW1EbyA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCAxMSwgMzEpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGxldCB0ZXN0UGlkID0gXCJNRUhMWDAwMEE3RzRcIjsgLy8gXCJNRUhMWDAwMFFFQk9cIjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgenB1c29iID0gRGRwLkludGVyZmFjZS5HRGRwR2xvYmFsc0Jhc2UuVHlwUHJldm9kdVBvaGxlZGF2a3kucHJldm9kX2RvX2V4ZWt1Y2U7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgbGV0IG5vdnlQaWQgPSBcIk1FSExYMDAyNVAzQVwiO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGxldCBQYXJhbUpTT04gPSB7IElEOiBcIkREUEdTYWxkYVZ5bURyI1wiLCBJeHA6IHRlc3RQaWQsIERhdE9kOiBkYXR1bU9kLCBEYXREbzogZGF0dW1EbywgTmV3SXhwOiBub3Z5UGlkLCBacHVzb2JQcmV2b2R1OiB6cHVzb2IgfTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3RoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HU2FsZGFWeW1EclwiLCBQYXJhbUpTT04pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9sZXQgUGFyYW1KU09OMyA9IHsgSUQ6IFwiRERQR1NhbGRhVnltRHIjXCIsIEl4cDogdGVzdFBpZCwgRGF0T2Q6IGRhdHVtT2QsIERhdERvOiBkYXR1bURvIH07XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy90aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1NhbGRhVnltRHJcIiwgUGFyYW1KU09OMywgeyB3aWR0aDogMTIwMCwgaGVpZ2h0OiA2MDAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICAub24oXCJjbG9zZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTYWxkYVZ5bURyXCIsIFBhcmFtSlNPTiwgeyB3aWR0aDogMTAwMCwgaGVpZ2h0OiA4NTAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImFjdEdQcmlwYWRQcmVkcGlzeVByb3Zlc3RSb3pwaXNOZVwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJSb3pwaXMgTkVEQcWHXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0b29sdGlwOiBcIlJvenBpcyBwxZllZHBpc8WvXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdSb3pwaXNQcmVkcGlzdVwiLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIElEOiBcIiNERFBHUm96cGlzUHJlZHBpc3UjXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIEl4cDogXCJNRUhMWDAwME9ROUNcIiwgVGVzdERwaDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9LCBgUm96cGlzIHDFmWVkcGlzxa8gLSBwxZnDrXBhZCBNRUhMWDAwME9ROUNgLCA3MDAsIDcwMClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRQcmVkcGlzeSh0cnVlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkUHJlZHBpc3lQcm92ZXN0Um96cGlzQW5vXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcIlJvenBpcyBEQcWHXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0b29sdGlwOiBcIlJvenBpcyBwxZllZHBpc8WvXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdSb3pwaXNQcmVkcGlzdVwiLCB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIElEOiBcIiNERFBHUm96cGlzUHJlZHBpc3UjXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIEl4cDogXCJNRUhMWDAwMEFBSEVcIixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9LCBgUm96cGlzIHDFmWVkcGlzxa8gLSBwxZnDrXBhZCBNRUhMWDAwMEFBSEVgLCA3MDAsIDcwMClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRQcmVkcGlzeSh0cnVlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICApO1xyXG5cclxuXHJcbiAgICAgICAgLy8gICAgcmV0dXJuIG1lbnVQYXJhbXM7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgfVxyXG59Il19