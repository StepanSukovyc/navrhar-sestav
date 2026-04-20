"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GVymahani.ts                           </Name>
//    <Description> Seznam vymáhání DDP                                         </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-11-05                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//TODO -> detail -> hromadné změny (akt.dot.subj a v záložce "nástroje")
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Seznam vymáhání
             *
             * @author Vojtěch Čech
             * @date 05.11.2024
             */
            let GVymahani = class GVymahani extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Typ algoritmu na skupině vymáhání */
                    this.typAlg = null;
                    /** Případy vymáhání co se boudou vymáhat v akci 'vymáhání' */
                    this.pripadyVymahani = [];
                    /** Případy, které jsou vybrané z okna VyberPripadu, při akci 'vymáhání'*/
                    this.pripadyVymahaniNapojene = [];
                    /** Model dokončeného generování vymáhání */
                    this.modelDataVym = [];
                    /** Parametr zda se jedná o refresh akce 'vymáhání' */
                    this.isRefresh = false;
                    /** Parametr zda se jedná o první loop refresh akce 'vymáhání' */
                    this.refreshFirstLoop = false;
                    /** Příznak tisku předávacího protokolu */
                    this.prizPrint = false;
                    /** Příznak, zda se jedná o první spuštění kalkulačky */
                    this.kalkFirstTime = true;
                    //#endregion
                }
                onContentReady() {
                    const that = this;
                    that.title = "Vymáhání";
                    that.taskId = "actGVymahani";
                    that.createActions();
                    that.createMenu();
                    that.vymahaniPripadu();
                    that.createFilter();
                    that.gridVymahani = that.createGrid();
                    that.rezimCteniPovoleni();
                    that.createPreview(); // vytvoření náhledu na boční straně okna
                    Ddp.WebClient.Common.Base.DdpEkoInit(that, that.InitErrorText);
                }
                createPreview() {
                    const that = this;
                    that.previewController = new Gordic.Previews.GPreviewController(that.element, {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                viewId: "ddp:VymahaniPreview",
                            })
                        ],
                    });
                }
                rezimCteniPovoleni() {
                    var that = this;
                    if (that.rezimCteni) {
                        if (that.VymPripadu) {
                            that.actions.actPodani?.enabled(false);
                        }
                    }
                }
                /** Vytvoření položek v menubaru*/
                createMenu() {
                    const that = this;
                    let menu = [];
                    menu.push(
                    //{ action: that.actions.actTest, favorite: true },
                    { action: that.actions.actPripadDDP, favorite: true }, { action: that.actions.actKontrola, favorite: true }, { action: that.actions.actStorno, favorite: true }, { action: that.actions.actTisk, favorite: true }, { action: that.actions.actSpis, favorite: true }, { action: that.actions.actDetail, favorite: true }, { action: that.actions.actOdeslatNoveZas, favorite: false }, { action: that.actions.actOdeslatPripZas, favorite: false }, { action: that.actions.actGenerovatElDok, favorite: false });
                    if (that.VymPripadu) {
                        menu.push({ action: that.actions.actPodani, favorite: true }, { action: that.actions.actVymahani, favorite: true });
                    }
                    menu.push({ action: that.actions.actVymahatDale, favorite: true }, { action: that.actions.actAktualizaceDSU, favorite: true });
                    menu.push({
                        favorite: true,
                        type: "static",
                        caption: "Hromadné změny",
                        children: that.createChildrenHromadneOperace()
                    });
                    that.menuBar(menu);
                }
                /** Vytvoření akcí pro položky v menubaru */
                createActions() {
                    var that = this;
                    var typAgSpis = that.typAg;
                    if (that.params.ddp_ssl_genssl == 1)
                        typAgSpis = 20;
                    that.actions.add(Gordic.Wfl.PreActions.OtevriDetailDokumentuSpisu({
                        inputData: (_action, _event, ctx, _param) => {
                            return {
                                parentContent: that,
                                opt: {
                                    DetailDto: { ixp: ctx.ixp /*ixp*/ },
                                    grid: void 0,
                                    ZverejneniInputDto: {
                                        Ixp: ctx.ixp,
                                        CurrentDataRowZs: ctx.rowDto,
                                        TypAg: typAgSpis,
                                        //NadRow: void 0, //pouze u 10-Přidat přílohu; 20-Odebrat přílohu; 30-Storno zveřejnění; 40-Stahnout zveřejnění; 50-Aktualizovat a využité pouze PredUlozenim
                                        Operace: ctx.operace, //0-Detail,Podání; 10-Přidat přílohu; 20-Odebrat přílohu; 30-Storno zveřejnění; 40-Stahnout zveřejnění; 50-Aktualizovat --- asi nebude potřeba
                                        PristupKeSchvalit: 1,
                                        PristupKeZverejnit: 1
                                    }
                                }
                            };
                        },
                        done: (retVal) => {
                            retVal?.createDialogPromise().then((ctx) => {
                                // Reload pokud došlo ke změně
                                if (ctx?.naDetailuDosloKeZmene) {
                                    that.ziskejData(that.filterData);
                                }
                            });
                        }
                    }));
                    var jeAktivniVymahaniPresSSL = (Number(that.params.ddp_gen_sslspi ?? 0) > 0 || Number(that.params.ddp_ssl_jedspi ?? 0) > 0) && Number(that.params.ddp_gen_sslzak ?? 0) > 0;
                    that.actions.addRange({
                        actTest: {
                            name: "actTest",
                            caption: "TEST",
                            run: () => {
                                debugger;
                                //var test = Gordic.Async.GTaskManager.getAllTasks();
                            }
                        },
                        actPripadDDP: {
                            name: "actPripadDDP",
                            caption: "Případ DDP",
                            tooltip: "Zobrazení detailu případu DDP",
                            enabled: that.params.ddp_rez_zjedno === 3 ? false : true, // TODO - funguje tohle když je to defaultAction? (a je to potřeba? jelikož se tam dostanu pouze přez případ :D)
                            run: (_ev, ctx) => {
                                const row = ctx.cellInfo.data;
                                if (row != undefined) {
                                    WebClient.Common.Pripady.openPripadDetail(this, row.ixp);
                                }
                            }
                        },
                        actKontrola: {
                            name: "actKontrola",
                            caption: "Kontrola",
                            tooltip: "Nastavení kontrolního chodu vymáhaní",
                            run: () => {
                                that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GKontrolniChodVym", {
                                    ID: "DDPGKontrolniChodVym#",
                                    nema_polozky: that.nema_polozky,
                                    nesouhlasi_suma: that.nesouhlasi_suma,
                                    nema_predpis: that.nema_predpis,
                                    dsu_zemrel: that.dsu_zemrel,
                                    nema_dsu: that.nema_dsu
                                }, "Nastavení kontrolního chodu vymáhání", 735, 355)
                                    .on("close", function (_ev, retVal) {
                                    if (retVal != null) {
                                        that.nema_polozky = retVal.nema_polozky;
                                        that.nesouhlasi_suma = retVal.nesouhlasi_suma;
                                        that.nema_predpis = retVal.nema_predpis;
                                        that.dsu_zemrel = retVal.dsu_zemrel;
                                        that.nema_dsu = retVal.nema_dsu;
                                        if (that.nema_polozky || that.nesouhlasi_suma || that.nema_predpis || that.dsu_zemrel || that.nema_dsu) {
                                            that.filterData.nema_polozky = that.nema_polozky;
                                            that.filterData.nesouhlasi_suma = that.nesouhlasi_suma;
                                            that.filterData.nema_predpis = that.nema_predpis;
                                            that.filterData.dsu_zemrel = that.dsu_zemrel;
                                            that.filterData.nema_dsu = that.nema_dsu;
                                            that.ziskejData(that.filterData);
                                        }
                                    }
                                });
                            }
                        },
                        actStorno: {
                            name: "actStorno",
                            caption: "Storno",
                            tooltip: "Zrušení všech aktivních a vybraných případů vymáhání",
                            run: () => {
                                that.zruseniVymahani();
                            }
                        },
                        actGridVychoziAkce: {
                            name: "gridVychoziAkce",
                            run: (_ev, ctx) => {
                                const row = ctx.cellInfo.data;
                                if (row != undefined) {
                                    that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                        ID: "DDPGDetailVymahani#",
                                        ixpNvy: row.ixp_nvy
                                    });
                                }
                            }
                        },
                        actTisk: {
                            name: "actTisk",
                            caption: "Tisk",
                            tooltip: "Tisk vymáhání",
                            run: () => {
                                that.tiskVymahani();
                            }
                        },
                        actSpis: {
                            name: "actSpis",
                            caption: "Spis",
                            tooltip: "Detail spisu",
                            enabled: jeAktivniVymahaniPresSSL,
                            run: () => {
                                const row = that.gridVymahani?.ggrid("activeRow");
                                if (row.priz_spis = 2) {
                                    that.actions[Gordic.Wfl.PreActions.Names.OtevriDetailDokumentuSpisu]?.run({ ixp: row.ixp_spis, operace: 0, rowDto: row });
                                }
                                else {
                                    that.dialogs.error("Spis", `Případ ${row.ixp_nvy} není vložen do spisu!`);
                                }
                            }
                        },
                        actDetail: {
                            name: "actDetail",
                            caption: "Detail",
                            tooltip: "Otevření detailu vymáhání",
                            run: () => {
                                that.openDetailVym();
                            }
                        },
                        actDetailIxp: {
                            name: "actDetailIxp",
                            caption: "Detail",
                            tooltip: "Otevření detailu vymáhání",
                            run: (ev, ctx) => {
                                const row = ctx.cellInfo.data;
                                that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                    ID: "DDPGDetailVymahani#",
                                    ixpNvy: row.ixp
                                });
                            }
                        },
                        actPodani: {
                            name: "actPodani",
                            caption: "Podání",
                            tooltip: "",
                            run: () => {
                                that.noveVymahani();
                            }
                        },
                        actAktualizaceDSU: {
                            name: "actAktualizaceDSU",
                            caption: "Aktualizace DSU",
                            tooltip: "Hromadná aktualizace dotčených subjektů na vymáhání",
                            run: () => {
                                that.aktualizaceDSU();
                            }
                        },
                        actVymahani: {
                            name: "actVymahani",
                            caption: "Vymáhat",
                            tooltip: "Vymáhání na případu DDP",
                            run: () => {
                                if (that.ixsFun != that.DtoPripadu.ixs_fun_akt && that.params.ddp_rad_nvycid != 1) {
                                    that.showFlash("Nemáte oprávnění k vymáhání na tomto případu.", "error");
                                }
                                else {
                                    that.vymahani({});
                                }
                            }
                        },
                        actVymahatDale: {
                            name: "actVymahatDale",
                            caption: "Vymáhat dále",
                            tooltip: "Pokračování vymáhání",
                            run: () => {
                                const row = that.gridVymahani?.ggrid("activeRow");
                                if (row != undefined) {
                                    if (that.ixsFun != row.ixs_fun_akt && that.params.ddp_rad_nvycid != 1) {
                                        that.showFlash("Nemáte oprávnění k vymáhání na tomto případu.", "error");
                                    }
                                    else {
                                        var message = "Chcete opravdu pokračovat ve vymáhání vybraného případu dalším krokem vymáhání? \n \n " +
                                            "Pokud odpovíte ANO, bude přednastaveno nastavení parametrů vymáhání dle aktuálně vybraného případu vymáhání.";
                                        that.dialogs.confirm("Vymáhání případu dalším krokem vymáhání", message, 420, 210)
                                            .on("close", (_ev, retVal) => {
                                            if (retVal === "yes") {
                                                that.beginOperation({ id: "vymahatDale", text: "Načítání dat předchozího vymáhání..." });
                                                var def = $.Deferred(); // stopka zda byly získány data případu
                                                // Pokud není vybrán žádný případ (akce je spuštěna ze seznamu vymáhání), tak získáme dle řádku vymáhání
                                                if (that.DtoPripadu == null) {
                                                    that.isl.VymahaniDDP.zakladniDataPripadu({ ixpDdp: row.ixp_ddp }).get()
                                                        .done((result) => {
                                                        that.DtoPripadu = result;
                                                        def.resolve();
                                                    });
                                                }
                                                else {
                                                    def.resolve();
                                                }
                                                def.done(() => {
                                                    that.isl.VymahaniDDP.dataExistujicihoVymahani({ ixpNvy: row.ixp_nvy }).get()
                                                        .done((result) => {
                                                        that.vymahatDale = true;
                                                        that.endOperation({ id: "vymahatDale" });
                                                        that.vymahani(result);
                                                    });
                                                });
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        actHistorieVym: {
                            name: "actHistorieVym",
                            caption: "Historie vymáhání",
                            tooltip: "Historie vymáhání na případu",
                            run: (ev, ctx) => {
                                var cnt = $.content(ev.target);
                                var row = $(ctx.grid).ggrid("activeRow");
                                cnt.navigate("Gordic.Ddp.WebClient.GPrehledVymahani", { ID: 'DDPGPrehledVymahani#', ixp: row.ixp });
                            }
                        },
                        actVyberPripadu: {
                            name: "actVyberPripadu",
                            caption: "Výběr případů",
                            tooltip: "Výběr případů pro vymáhání i ostatních případů poplatníka",
                            enabled: false,
                            run: (ev, ctx) => {
                                var ixpDdp = that.DtoPripadu.ixp;
                                var ixsEsu = that.DtoPripadu.ixs_esu;
                                var cnt = $.content(ev.target);
                                cnt.navigate("Gordic.Ddp.WebClient.GVyberPripadu", { ID: 'DDPGVyberPripadu#', ixp: ixpDdp, ixsEsu: ixsEsu, pripadyVymahaniNapojene: that.pripadyVymahaniNapojene, formModel: that.modelFormVyber })
                                    .on("close", (_ev, retVal) => {
                                    that.pripadyVymahaniNapojene = [];
                                    that.pripadyVymahani = [that.DtoPripadu];
                                    if (retVal != null) {
                                        var data = retVal.data;
                                        that.modelFormVyber = retVal.formModel;
                                        data.forEach((item) => {
                                            item.ExterniSubjekt = {
                                                esu_txt: item.esu_txt
                                            };
                                            delete item.esu_txt;
                                            that.pripadyVymahaniNapojene.push(item);
                                            that.pripadyVymahani.push(item);
                                        });
                                    }
                                    var view = new Gordic.Data.View(that.pripadyVymahani);
                                    var wizGrid = $.content().find("[data-help-context='list:wizGrid']");
                                    wizGrid.ggrid("setData", view);
                                });
                            }
                        },
                        actReset: {
                            name: "actReset",
                            caption: "Vymáhat znovu",
                            tooltip: "Obnoví formulář vymáhání",
                            run: () => {
                                that.isRefresh = true;
                                var mainContent = $.content();
                                var wizContent = mainContent.find(".gwizard__content");
                                $.content(wizContent).close();
                                that.vymahani(that.modelDataVym);
                            }
                        },
                        actOdeslatNoveZas: {
                            name: "actOdeslatNoveZas",
                            caption: "Odeslat nové zásilky",
                            tooltip: "Odeslat elektronicky nové zásilky",
                            run: () => {
                                that.odeslatElektronicky(0); // nastavíme, že se jedná o odeslání nových zásilek
                            }
                        },
                        actOdeslatPripZas: {
                            name: "actOdeslatPripZas",
                            caption: "Odeslat připravené zásilky",
                            tooltip: "Odeslat elektronicky připravené zásilky",
                            run: () => {
                                that.odeslatElektronicky(1); // nastavíme, že se jedná o odeslání připravených zásilek
                            }
                        },
                        actGenerovatElDok: {
                            name: "actGenerovatElDok",
                            caption: "Generovat elektronické dokumenty",
                            run: () => {
                                that.odeslatElektronicky(2); // nastavíme, že se jedná o generování elektronických dokumentů
                            }
                        },
                        actTiskPredani: {
                            name: "actTiskPredani",
                            caption: "Tisk",
                            tooltip: "Tisk předávacího protokolu",
                            enabled: false,
                            run: (ev, ctx) => {
                                var cnt = $.content(ev.target);
                                that.tiskPredani(cnt);
                            }
                        },
                        actRozpisLhuty: {
                            name: "actRozpisLhuty",
                            caption: "Rozpis",
                            tooltip: "Podrobný rozpis lhůty",
                            run: (ev, ctx) => {
                                var cnt = $.content(ev.target);
                                var model = {};
                                cnt.findForms("wizParams").findFields().gfield("model", "collect", model);
                                model.dat_dor = model.dat_doruc;
                                delete model.dat_doruc;
                                if (model.dat_dor == null || model.dat_vyk == null) {
                                    that.dialogs.error("Podrobný rozpis lhůty", "Je třeba zadat správné datum doručení i vykonatelnosti.");
                                    return;
                                }
                                if (!(model.dny_pm >= 0 && model.dny_vyk >= 0)) {
                                    that.dialogs.error("Podrobný rozpis lhůty", "Dny nybytí právní moci ani vykonatelnosti nesmí nabývat záporných hodnot.");
                                    return;
                                }
                                // get data, put in form
                                var def = $.Deferred();
                                cnt.beginOperation({ id: "loadRozpisLhuty", text: "Načítání položek..." });
                                that.isl.VymahaniDDP.listRozpisLhuty(() => {
                                    return {
                                        filters: model
                                    };
                                })
                                    .get()
                                    .done(function (dto) {
                                    var view = new Gordic.Data.View(dto.data);
                                    def.resolve(view);
                                }).always(() => {
                                    cnt.endOperation({ id: "loadRozpisLhuty" });
                                });
                                def.done((view) => {
                                    var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1 LMS-0-12-0" })
                                        .addField("ggrid", {
                                        data: view,
                                        rowHeight: 30,
                                        columns: Gordic.Ddp.WebClient.Common.GridFormats.PodrobnyRozpisLhuty(),
                                        showTopPanel: false,
                                        showBottomPanel: true,
                                        defaultProfile: {
                                            columnList: "datum,den,popis,den_lhuty",
                                            condFormats: [
                                                { description: "vikend", formula: 'EQUALS(@typ_dne, 20) or EQUALS(@typ_dne, 30) or EQUALS(@typ_dne, 40)', text: Gordic.Components.Grid.CondFormats.CondFormatText.red },
                                            ]
                                        },
                                    });
                                    cnt.dialogs.simpleForm("Podrobný rozpis lhůty", form);
                                });
                            }
                        },
                    });
                }
                //#region HROMADNÉ OPERACE - MENU 
                createChildrenHromadneOperace() {
                    const that = this;
                    var menuParams = [];
                    var kontrolaDorucenkyPovolena = true;
                    if (that.rezimCteni || that.params.ddp_rez_zjedno == 1 || that.params.ddp_rez_zjedno == 2)
                        kontrolaDorucenkyPovolena = false;
                    menuParams.push({
                        action: new GAction({
                            name: "stav_tisk_odesl",
                            caption: "Nastavení stavu tisku a odeslání",
                            run: () => {
                                var confirmTitle = "Označit jako odeslané vymáhání";
                                var confirmMessage = "Opravdu chcete označit záznamy o vymáhání jako odeslané?";
                                that.dialogs.confirm(confirmTitle, confirmMessage, 400, 200)
                                    .on("close", (_ev, retVal) => {
                                    if (retVal === "yes") {
                                        var selection = that.gridVymahani.ggrid("getSelection");
                                        if (selection.length != 0) {
                                            that.TaskStartHromAkce(selection, {}, "NastaveniStavuTiskuAOdeslani");
                                        }
                                    }
                                });
                            }
                        })
                    });
                    menuParams.push({
                        action: new GAction({
                            name: "stav_tisk_odesl",
                            caption: "Nastavení pole Věc profilu dokumentu",
                            run: () => {
                                var confirmTitle = "Nastavení pole Věc";
                                var confirmMessage = "Opravdu chcete nastavit pole 'Věc' v profilu vymáhacích dokumentu (dle nastavení parametru)?";
                                that.dialogs.confirm(confirmTitle, confirmMessage, 400, 200)
                                    .on("close", (_ev, retVal) => {
                                    if (retVal === "yes") {
                                        var selection = that.gridVymahani.ggrid("getSelection");
                                        if (selection.length != 0) {
                                            that.TaskStartHromAkce(selection, {}, "NastaveniPoleVec");
                                        }
                                    }
                                });
                            }
                        })
                    });
                    menuParams.push({
                        action: new GAction({
                            name: "dopl_dat_dor",
                            caption: "Hromadné doplnění data doručení",
                            run: () => {
                                that.kalkFirstTime = true; // nastavíme, že se jedná o první čas spuštění kalkulačky
                                var form = that.formTerminovaKalkulacka();
                                that.formTerminovaKalkulackaValues();
                                var data = that.gridVymahani.ggrid("getSelection");
                                var confirmMessage = "Opravdu chcete nastavit datum doručení (i datum nabytí právní moci a vykonatelnosti) ?";
                                var description = "";
                                const checkFunction = that.isl.VymahaniDDP.kontrolaDoplDatDoruc.bind(that.isl.VymahaniDDP);
                                var menuGrid = [{ favorite: true, action: that.actions.actRozpisLhuty }];
                                that.hromadnaOperaceAsync(data, "Nastavení data doručení", WebClient.Common.GridFormats.VymDatDoruc(), "ixp_nvy", form, "Výsledek změny", checkFunction, "DoplDatDoruc", confirmMessage, description, menuGrid);
                            }
                        })
                    });
                    menuParams.push({
                        action: new GAction({
                            name: "stav_doruceni",
                            caption: "Nastavení stavu doručení",
                            run: () => {
                                var form = that.formStavDoruc();
                                var data = that.gridVymahani.ggrid("getSelection");
                                var confirmMessage = "Opravdu chcete nastavit hromadně stav doručení {0}({1})? (stav doručení se změni na všech vybraných záznamech!)";
                                var description = "";
                                const checkFunction = that.isl.VymahaniDDP.kontrolaNastStavDoruc.bind(that.isl.VymahaniDDP);
                                that.hromadnaOperaceAsync(data, "Nastavení stavu doručení", WebClient.Common.GridFormats.VymStavDoruc(), "ixp_nvy", form, "Výsledek změny", checkFunction, "NastStavDoruc", confirmMessage, description);
                            }
                        })
                    });
                    menuParams.push({
                        id: "statusSeparator0",
                        "type": "separator"
                    });
                    menuParams.push({
                        action: new GAction({
                            name: "prid_dot_dok",
                            caption: "Přidání dotčeného dokumentu",
                            run: () => {
                                var form = that.formDotcenyDok();
                                var data = that.gridVymahani.ggrid("getSelection");
                                var confirmMessage = "Opravdu chcete přidat dokument k záznamům o vymáhání?";
                                var description = "";
                                const checkFunction = that.isl.VymahaniDDP.kontrolaPridaniDotcDok.bind(that.isl.VymahaniDDP);
                                that.hromadnaOperaceAsync(data, "Přidání dotčeného dokumentu", WebClient.Common.GridFormats.VymahaniSimple(), "ixp_nvy", form, "Výsledek změny", checkFunction, "PridaniDotcDok", confirmMessage, description, []);
                            }
                        })
                    });
                    menuParams.push({
                        action: new GAction({
                            name: "prid_dot_sub",
                            caption: "Přidání dotčeného subjektu",
                            run: () => {
                                var form = that.formDotcenySub();
                                var data = that.gridVymahani.ggrid("getSelection");
                                var confirmMessage = "Opravdu chcete provést hromadné přidání dotčeného subjektu?";
                                var description = "";
                                const checkFunction = that.isl.VymahaniDDP.kontrolaPridaniDotcSubj.bind(that.isl.VymahaniDDP);
                                that.hromadnaOperaceAsync(data, "Přidání dotčeného subjektu", WebClient.Common.GridFormats.VymahaniSimple(), "ixp_nvy", form, "Výsledek změny", checkFunction, "PridaniDotcSubj", confirmMessage, description, []);
                            }
                        })
                    });
                    menuParams.push({
                        action: new GAction({
                            name: "prid_dot_sub_ze_skup",
                            caption: "Přidání dotčeného subjektu ze skupiny",
                            run: () => {
                                var form = that.formDotcenySubZeSkup();
                                var data = that.gridVymahani.ggrid("getSelection");
                                var confirmMessage = "Opravdu chcete provést hromadné přidání dotčeného subjektu?";
                                var description = "";
                                const checkFunction = that.isl.VymahaniDDP.kontrolaPridaniDotcSubj.bind(that.isl.VymahaniDDP);
                                that.hromadnaOperaceAsync(data, "Přidání dotčeného subjektu ze skupiny", WebClient.Common.GridFormats.VymahaniSimple(), "ixp_nvy", form, "Výsledek změny", checkFunction, "PridaniDotcSubjZeSkup", confirmMessage, description, []);
                            }
                        })
                    });
                    menuParams.push({
                        id: "statusSeparator1",
                        "type": "separator"
                    });
                    menuParams.push({
                        action: new GAction({
                            name: "kontrola_dorucenek",
                            caption: "Dotažení data doručení vymáhání",
                            enabled: kontrolaDorucenkyPovolena,
                            run: () => {
                                var def = $.Deferred();
                                that.beginOperation({ id: "kontrola_dorucenek", text: "Probíhá aktualizace doručenek na záznamech vymáhání..." });
                                that.isl.VymahaniDDP.kontrolaDorucenek({ typyPhl: [] }).get()
                                    .done((dto) => {
                                    var view = new Gordic.Data.View(dto);
                                    def.resolve(view);
                                })
                                    .fail(() => {
                                    def.reject();
                                })
                                    .always(() => {
                                    that.endOperation({ id: "kontrola_dorucenek" });
                                });
                                def.done((view) => {
                                    var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1 LMS-0-12-0" })
                                        .addField("ggrid", {
                                        data: view,
                                        rowHeight: 30,
                                        columns: Gordic.Ddp.WebClient.Common.GridFormats.KontrolaDorucenek(),
                                        showTopPanel: false,
                                        showBottomPanel: true
                                    });
                                    that.dialogs.simpleForm("Výsledek dotažení data doručení vymáhání", form);
                                });
                            }
                        })
                    });
                    return menuParams;
                }
                /** Vytvoření hlavičky (formulář) a akcí do menu, pokud se jedná o vymáhání případu */
                vymahaniPripadu() {
                    var that = this;
                    if (that.VymPripadu) { // jedná se o vymáhání případu
                        var formPripadu = new Gordic.Forms.Form({ name: "pripadForm", layoutDescriptor: "L2M2S1 L-2-8-2, M-2-8-2, S-12-12-0" })
                            .addSection()
                            .addRow("Typ pohledávky")
                            .addField("gselectbox", Gordic.Prefabs.Select.typPohledavky(), {
                            name: "typ_phl",
                            model: "typ_phl=typ_phl",
                            disabled: true
                        })
                            .addRow("Identifikátor případu")
                            .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                            name: "ixp",
                            disabled: true
                        })
                            .addRow("IČO")
                            .addField("gstringbox", {
                            name: "ico_esu",
                            disabled: true
                        })
                            .addSection()
                            .addRow("VS")
                            .addField("gstringbox", {
                            name: "vs",
                            disabled: true
                        })
                            .addRow("AČ")
                            .addField("gstringbox", {
                            name: "ac",
                            disabled: true
                        })
                            .addRow("RČ")
                            .addField("gstringbox", {
                            name: "rc",
                            disabled: true,
                            validators: [new Gordic.Validators.RodneCislo({})]
                        })
                            .addSection({ layoutDescriptor: "L1M1S1 L-1-10-1 M-1-10-1 S-12-12-0" })
                            .addRow("Poplatník")
                            .addField("gselectbox", {
                            name: "ixs_esu",
                            disabled: true,
                            model: "ixs_esu=ixs_esu;esu_dic=dic;model.lic=value.lic;model.por_zast=value.por_zast"
                        }, Gordic.Esu.Prefabs.vyberEsu({
                            typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu                       
                            Logovani: {
                                Ixp: that.DtoPripadu.ixp ?? "", // zadání logovacích údaju je nutnost hlavně IXP
                                DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
                                AktZnacka: that.DtoPripadu.ixp,
                                DuvodHledaniTxt: "Seznam vymáhání na případu"
                            },
                        }));
                        $.newDiv().appendTo(that.element).gform("createFrom", formPripadu).gtab({
                            title: "Detail",
                            opened: true
                        });
                        that.findForms("pripadForm").findFields().gfield("model", "apply", that.DtoPripadu, { initialValues: true });
                        that.findFields("rc").gfield("setInitial", that.DtoPripadu.ExterniSubjekt.rc);
                        that.findFields("ixs_esu").gfield("setInitial", { ixs_esu: that.DtoPripadu.ExterniSubjekt.ixs_esu });
                    }
                }
                /** Zrušení všech aktivních a vybraných případů vymáhání */
                zruseniVymahani() {
                    var that = this;
                    var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1 LMS-3-7-2" })
                        .addRow("Důvod").addField("gstringbox", { name: "reason", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()] })
                        .addRow()
                        .addField("gcheck", {
                        name: "rusit_vyp",
                        label: "Rušit již vypravené případy"
                    });
                    const massUpdate = that.isl.VymahaniDDP.ruseniVymahani.bind(that.isl.VymahaniDDP);
                    const checkFunction = that.isl.VymahaniDDP.kontrolaRuseniVymahani.bind(that.isl.VymahaniDDP);
                    var data = that.gridVymahani.ggrid("getSelection");
                    that.hromadnaOperace(data, "Zrušení vymáhání", WebClient.Common.GridFormats.VymahaniSimple(), "ixp_nvy", form, "Výsledek změny", massUpdate, checkFunction, "Opravdu chcete zrušit vybrané záznamy o vymáhání?", "", []);
                }
                /** Aktualizace dotčených subjektů na záznamech o vymáhání z případu DDP */
                aktualizaceDSU() {
                    var that = this;
                    var description = "Hromadná aktualizace provede aktualizaci dotčených subjektů z případu DDP na vymáhacích dokumentech dle nastavení typů dotčených subjektu pro skupinu a krok vymáhání.";
                    const massUpdate = that.isl.VymahaniDDP.aktualizaceDSU.bind(that.isl.VymahaniDDP);
                    const checkFunction = that.isl.VymahaniDDP.kontrolaAktualizaceDSU.bind(that.isl.VymahaniDDP);
                    var data = that.gridVymahani.ggrid("getSelection");
                    that.hromadnaOperace(data, "Aktualizace DSU", WebClient.Common.GridFormats.VymahaniSimple(), "ixp_nvy", null, "Výsledek změny", massUpdate, checkFunction, "Opravdu chcete aktualizovat dotčené subjekty na záznamech o vymáhání z případů DDP? \n \n Mějte prosím na paměti, že se kopíruje nastavení dotčených subjektů dle nastavení skupiny vymáhání!", description, []);
                }
                /** Funkce k otevření okna hromadných změn (Eko.Components.TwoStepsContent) */
                hromadnaOperace(data, title, gridFormat, keys, form, lastStepTitle, massUpdate, checkFunction, confirmMessage, description, menuGrid) {
                    var that = this;
                    this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        title: title,
                        gridFormat: gridFormat,
                        keys: keys,
                        data: data,
                        indicatorType: "KPI",
                        firstStep: {
                            form: form,
                            gridTabTitle: "Vybrané případy", // titulek v tabu   
                            defaultAction: that.actions.actGridVychoziAkce,
                            showIndicator: true,
                            description: description,
                            nextActionName: "Proveď", // název pro tlačítko další
                            menuGridBar: menuGrid, // akce na tabu s gridem
                            checkAction: (model, data) => {
                                const modelDto = {
                                    reason: model.reason,
                                    rusit_vyp: model.rusit_vyp
                                };
                                return checkFunction({ dtos: data, model: modelDto }).get()
                                    .then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            nextAction: (model, data) => {
                                let def = $.Deferred();
                                const modelDto = {
                                    reason: model.reason,
                                    rusit_vyp: model.rusit_vyp
                                };
                                var confirmTitle = "Potvrzení hromadné akce";
                                if (confirmMessage != "") {
                                    this.dialogs.confirm(confirmTitle, confirmMessage, 400, 200)
                                        .on("close", (_ev, retVal) => {
                                        if (retVal === "yes") {
                                            massUpdate({ dtos: data, model: modelDto }).get()
                                                .then((result) => {
                                                def.resolve(Gordic.Eko.Components.Wizard.Utils.getData(result));
                                            });
                                        }
                                        else {
                                            def.resolve(data);
                                        }
                                    });
                                }
                                else {
                                    massUpdate({ dtos: data, model: modelDto }).get()
                                        .then((result) => {
                                        def.resolve(Gordic.Eko.Components.Wizard.Utils.getData(result));
                                    });
                                }
                                return def.promise();
                            }
                        },
                        lastStep: {
                            // fáze 2 - zobrazení­ výsledku storna
                            title: lastStepTitle, //nazev kroku
                            gridTabTitle: "Aktualizované pří­pady", //popisek nad gridem
                            form: form,
                            defaultAction: that.actions.actGridVychoziAkce,
                            modelData: () => {
                                return {};
                            }
                        },
                        completeDelegate: () => {
                            that.ziskejData(that.filterData);
                        },
                        cancelDelegate: () => {
                        }
                    }).createDialogPromise();
                }
                /** Funkce k otevření okna hromadných změn (Eko.Components.TwoStepsContent) */
                hromadnaOperaceAsync(data, title, gridFormat, keys, form, lastStepTitle, checkFunction, nazevAkce, confirmMessage, description, menuGrid) {
                    var that = this;
                    this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        title: title,
                        gridFormat: gridFormat,
                        keys: keys,
                        data: data,
                        indicatorType: "KPI",
                        firstStep: {
                            form: form,
                            gridTabTitle: "Vybrané případy", // titulek v tabu   
                            defaultAction: that.actions.actGridVychoziAkce,
                            showIndicator: true,
                            description: description,
                            nextActionName: "Proveď", // název pro tlačítko další
                            menuGridBar: menuGrid, // akce na tabu s gridem
                            checkAction: (model, data) => {
                                return checkFunction({ dtos: data, model: model }).get()
                                    .then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            nextAction: (model, data) => {
                                let def = $.Deferred();
                                if (model.por_zast_check == true) {
                                    model.por_zast = that.gridZastupci.ggrid("getSelection")[0].por_zast;
                                    model.lic_zast = that.gridZastupci.ggrid("getSelection")[0].lic;
                                }
                                var confirmTitle = "Potvrzení hromadné akce";
                                if (confirmMessage != "") {
                                    // nahrazení parametrů ve zprávě při nastavení stavu doručení
                                    if (confirmMessage.includes("{0}") && confirmMessage.includes("{1}")) {
                                        confirmMessage = confirmMessage.replace("{0}", model.stav_doruc_txt);
                                        confirmMessage = confirmMessage.replace("{1}", model.stav_doruc);
                                    }
                                    that.dialogs.confirm(confirmTitle, confirmMessage, 400, 200)
                                        .on("close", (_ev, retVal) => {
                                        if (retVal === "yes") {
                                            def.resolve(data);
                                            that.TaskStartHromAkce(data, model, nazevAkce);
                                        }
                                        else {
                                            def.reject();
                                            return def;
                                        }
                                    });
                                }
                                else { // není potřeba potvrzení, tak jedem dál
                                    def.resolve(data);
                                    that.TaskStartHromAkce(data, model, nazevAkce);
                                }
                                return def.promise();
                            }
                        },
                        lastStep: {
                            // fáze 2 - zobrazení­ výsledku storna
                            title: lastStepTitle, //nazev kroku
                            gridTabTitle: "Aktualizované pří­pady", //popisek nad gridem
                            form: form,
                            defaultAction: that.actions.actGridVychoziAkce,
                            modelData: () => {
                                return {};
                            }
                        },
                        completeDelegate: () => {
                            that.ziskejData(that.filterData);
                        },
                        cancelDelegate: () => {
                        }
                    }).createDialogPromise();
                }
                /**
                 * Funkce k získání data dle filtru a kontroly
                 * @param filter
                 */
                ziskejData(filter) {
                    var that = this;
                    // pokud se jedná o vymáhání případu, tak přidáme do ifltru údaje o případu
                    if (that.VymPripadu) {
                        filter.ixp = that.DtoPripadu.ixp;
                        filter.typ_phl = that.DtoPripadu.typ_phl;
                    }
                    if (that.nema_polozky || that.nesouhlasi_suma || that.nema_predpis || that.dsu_zemrel || that.nema_dsu) {
                        filter.nema_polozky = that.nema_polozky;
                        filter.nesouhlasi_suma = that.nesouhlasi_suma;
                        filter.nema_predpis = that.nema_predpis;
                        filter.dsu_zemrel = that.dsu_zemrel;
                        filter.nema_dsu = that.nema_dsu;
                    }
                    that.beginOperation({ id: "nacitani", text: "Načítání položek..." });
                    that.isl.VymahaniDDP.list(() => {
                        return {
                            filters: filter
                        };
                    })
                        .get()
                        .done(function (dto) {
                        var view = new Gordic.Data.View(dto.data);
                        that.gridVymahani.ggrid("setData", view);
                        that.previewController.enable(view.getCount() > 0);
                    }).always(() => {
                        that.endOperation({ id: "nacitani" });
                    });
                }
                /** Vytvoří grid/seznam případů */
                createGrid() {
                    var that = this;
                    //Ověřit poplatníky na ISZR
                    //kontrolaMetadat
                    var jePriznakVytisteniPovolen = !that.rezimCteni && that.params.ddp_vym_oznvyt === 1;
                    var jePriznakOdeslaniPovolen = !that.rezimCteni && that.params.ddp_vym_oznode === 1;
                    var actionList = new GActionList({
                        actKontrolaMetadat: {
                            caption: "Kontrola metadat", run: function (ev, ctx) {
                                that.kontrolaMetadat();
                            }
                        },
                        actOveritPoplatnikyISZR: {
                            enabled: that.iszr,
                            caption: "Ověřit poplatníky ISZR",
                            run: function (ev, ctx) {
                                that.hromadneOvereniISZR();
                            }
                        },
                        actOveritDotceneSubjISZR: {
                            enabled: that.iszr,
                            caption: "Ověřit dotčené subjekty na ISZR",
                            run: function (ev, ctx) {
                                that.hromadneOvereniDotSubjISZR();
                            }
                        },
                        actNastavitPriznakVytisteni: {
                            enabled: jePriznakVytisteniPovolen,
                            caption: "Nastavit příznak vytištění",
                            run: () => {
                                that.nastaveniPriznakuTisku(1);
                            }
                        },
                        actZrusitPriznakVytisteni: {
                            enabled: jePriznakVytisteniPovolen,
                            caption: "Zrušit příznak vytištění",
                            run: () => {
                                that.nastaveniPriznakuTisku(0);
                            }
                        },
                        actNastavitPriznakOdeslani: {
                            enabled: jePriznakOdeslaniPovolen,
                            caption: "Nastavit příznak odeslání",
                            run: () => {
                                that.nastaveniPriznakuOdeslani(1);
                            }
                        },
                        actZrusitPriznakOdeslani: {
                            enabled: jePriznakOdeslaniPovolen,
                            caption: "Zrušit příznak odeslání",
                            run: () => {
                                that.nastaveniPriznakuOdeslani(0);
                            }
                        },
                        actObnovit: {
                            enabled: jePriznakOdeslaniPovolen,
                            caption: "Obnovení vybraných případu",
                            run: () => {
                                that.obnoveni();
                            }
                        },
                        actPredat: {
                            enabled: that.params.ddp_rad_vympre == 1,
                            caption: "Předat",
                            icon: "gi-predat",
                            run: () => {
                                const checkFunction = that.isl.Redistribuce.kontrolaPredani.bind(that.isl.Redistribuce);
                                that.wizzardRedist(checkFunction, 0);
                            }
                        },
                        actPridelit: {
                            enabled: that.params.ddp_rad_vymprd == 1,
                            caption: "Přidělit",
                            icon: "gi-pridelit",
                            run: () => {
                                const checkFunction = that.isl.Redistribuce.kontrolaPredani.bind(that.isl.Redistribuce);
                                that.wizzardRedist(checkFunction, 10);
                            }
                        },
                        actPrevzit: {
                            enabled: that.params.ddp_rad_vympri == 1,
                            caption: "Převzít",
                            icon: "gi-prevzit",
                            run: () => {
                                that.prevzit();
                            }
                        }
                    });
                    return $.newDiv()
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        name: "GVymahaniGrid",
                        data: this.view,
                        defaultAction: this.actions.actDetail,
                        columnMode: "full",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        multi: true,
                        navigationMode: "row",
                        columns: WebClient.Common.GridFormats.Vymahani(),
                        rowNumbers: false,
                        contextMenu: function (cellContext) {
                            return actionList.createBar([
                                "actOveritPoplatnikyISZR",
                                "actOveritDotceneSubjISZR",
                                "actKontrolaMetadat",
                                "-",
                                "actNastavitPriznakVytisteni",
                                "actZrusitPriznakVytisteni",
                                "-",
                                "actNastavitPriznakOdeslani",
                                "actZrusitPriznakOdeslani",
                                "-",
                                that.actions.actStorno,
                                "actObnovit",
                                "-",
                                "actPredat",
                                "actPridelit",
                                "actPrevzit",
                            ]);
                        },
                        defaultProfile: {
                            name: "Výchozí pohled", _locked: true, _default: true,
                            condFormats: [
                                { description: "Vypraveno", formula: "IF(ISBLANK(@dat_vyp), false, true, true)", text: Gordic.Components.Grid.CondFormats.CondFormatText.blue },
                                { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@eko_akt)) and @eko_akt == 500, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.gray },
                                { description: "Zrušen", formula: "IF(NOT(ISBLANK(@eko_akt)) and @eko_akt == 900, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.purple },
                                { description: "Aktivní dílčí výpočet", formula: "IF(NOT(ISBLANK(@dilci_vypocet_txt)) and EQUALS(@dilci_vypocet_txt,'Ano') and @eko_akt == 100, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.green },
                            ]
                        },
                        cellActivate: (ev, ctx) => {
                            if (!that.closed) {
                                if (ctx != null &&
                                    ctx.cellInfo != null &&
                                    ctx.cellInfo.data != null) {
                                    that.previewController.enable(true);
                                    that.previewController.show(ctx.cellInfo.data);
                                }
                                else {
                                    that.previewController.enable(false);
                                }
                            }
                        }
                    })
                        .ggridrowscalc();
                }
                //#region TISK
                /** Tisk vymáhání */
                tiskVymahani() {
                    const that = this;
                    var rows;
                    rows = that.gridVymahani.ggrid("getSelection");
                    if (rows.length != 0) {
                        that.beginOperation({ text: "Probíhá inicializace tisku...", id: "tisk" });
                        that.isl.VymahaniDDP.insertDDPTPRD({ rq: { RequestData: rows } }).get().done((result) => {
                            if (result.length > 0) {
                                that.isl.VymahaniDDP.updateDDPSNVY({ rq: { RequestData: rows } }).get().done((success) => {
                                    that.endOperation({ id: "tisk" });
                                    if (success) {
                                        if (result.length > 1) {
                                            that.dialogs.alert("Tisk více případů vymáhání", "Sestava se tiskne za více záznamů vymáhání, pokud se jedná o sestavu, která se má ukládat jako el. obraz vymáhání, sestava se NEULOŽÍ! \n \n" +
                                                "Pokud chcete vytvořit el.obraz a uložit jej k vymáhání, proveďte tisk z detailu vymáhání.", 360)
                                                .on("close", (_ev, retVal) => {
                                                if (retVal === "ok") {
                                                    that.akceTisku(null, null);
                                                }
                                            });
                                        }
                                        else { //pouze tisk na 1 případu
                                            var ixp_nvy = result[0];
                                            var stav_vym = rows.find((item) => item.ixp_nvy === ixp_nvy)?.stav_vym;
                                            that.akceTisku(result[0], stav_vym);
                                        }
                                    }
                                });
                            }
                            else {
                                that.endOperation({ id: "tisk" });
                                that.dialogs.error("Chyba tisku", "Žádný z vybraných případů neodpovídá podmínkám tisku.");
                            }
                        });
                    }
                }
                /**
                 * Samotná funkce k volání tiskové akce
                 * @param pripady
                 * @param stav_vym
                 */
                akceTisku(ixp, stav_vym) {
                    var that = this;
                    // update prošel bez problémů tak pokračujeme
                    const actTiskVymahani = GAction.createPrintAction({
                        name: "actTiskVymahani",
                        tema: "ddp_ptm_nvy",
                        customDto: {
                            ixp_den: that.ixpDen,
                            rok_den: that.rokDen,
                            typ_phl: that.typPhl,
                            ixp: ixp,
                            stav_vym: stav_vym
                        },
                        serverRestrictionAlfMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:GetRestrictionAlf", // filtr pro možné tisky
                        // ↓ Metoda, která je zavolána těsně před generováním sestavy a kde lze na straně serveru ovlivnit parametry sestavy ↓
                        serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:TiskVymahani", //zde se plní téma
                        reportFinished: function () {
                            that.isl.VymahaniDDP.kontrolaPoTisku().get().done((pocet) => {
                                if (pocet > 0) {
                                    var tiskVymDotaz = that.globalSettings.get("Global.Ddp.ObecneSettings.TiskVymDotaz");
                                    if (tiskVymDotaz) {
                                        that.dialogs.confirm("Kontrolní dotaz nastavení příznaku tisku", "Pokud víte, že tisk vymáhání dopadl v pořádku, už ho nechcete tisknout znovu a chcete změnit stav tisku vymáhání, tak odpovězte ANO." +
                                            "\n\n Pokud chcete tisk opakovat, protože se zmačkal papír v tiskárně, chcete si udělat kopii, některá sestava je chybná atd., pak odpovězte NE.", 465)
                                            .on("close", (_ev, retVal) => {
                                            if (retVal === "yes") {
                                                that.isl.VymahaniDDP.nastavPriznakTiskuVymahani().get();
                                            }
                                        });
                                    }
                                    else
                                        that.isl.VymahaniDDP.nastavPriznakTiskuVymahani().get();
                                }
                            });
                        },
                        dialogClosed: function () {
                        }
                    });
                    actTiskVymahani.run();
                }
                //#endregion
                //#region Filtr
                /** Vytvoření filtru */
                createFilter() {
                    const that = this;
                    var formulare = [];
                    if (that.VymPripadu) {
                        formulare.push(that.createFilterFormPripad());
                    }
                    formulare.push(that.createFilterFormVymahani(), that.createFilterFormSlozeniVymahani(), that.createFilterFormPredpisyVymPrip(), that.createFilterFormPlatbyVymPrip(), that.createFilterFormZpracovatel(), that.createFilterFormElObraz(), that.createFilterFormDS(), that.createFilterFormPriznakyVym(), that.createFilterFormIntervaly(), that.createFilterFormKlicovaSlova());
                    $.newDiv().appendTo(this.element).gfilterpanel(
                    //! Vytvoření standardních parametrů filterpanelu pro EKO moduly
                    Gordic.Eko.Filters.getFilterParams(formulare, [], // oblíbené filtry
                    "ddp_ptm_vymah", // téma tisku
                    null, //sloupec z DTO pro filtr "*vlastní" nebo null, pokud nemá být - netuším co to má dělat
                    function (event, obj) {
                        that.filterData = obj.filter;
                        that.ziskejData(obj.filter);
                    }, null, // pevný filtr
                    //({ ds: 2, el_obraz: 2, predpisy: 1, platby: 1 }) as any, // pevný filtr
                    true, // navigátor v detailu filtru
                    that //parentContent
                    ));
                }
                /**
                * Vytvoření formuláře do filtru - Případ
                * @returns
                */
                createFilterFormPripad() {
                    var that = this;
                    return new Gordic.Forms.Form({ name: "pripadCheckForm", tabLabel: "Případ" })
                        .addSection()
                        .addField("gcheck", {
                        name: "all",
                        label: "Všechna vymáhání poplatníka",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("dsu", obj.value, ev, "pripadCheckForm");
                        }
                    })
                        .addField("gcheck", {
                        name: "dsu",
                        label: "Hledat přes dotčené subjekty případu DDP",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("all", obj.value, ev, "pripadCheckForm");
                        }
                    });
                }
                /**
                 * Vytvoření formuláře do filtru - Vymáhání
                 * @returns
                 */
                createFilterFormVymahani() {
                    var that = this;
                    var form = new Gordic.Forms.Form({ tabLabel: "Vymáhání" })
                        .addSection();
                    if (that.VymPripadu == null) {
                        // Pokud se jedná o vymáhání případu, tak se nezobrazí filtr typ pohledávky
                        form.addField("gselectbox", Gordic.Prefabs.Select.ddpstpp(), {
                            name: "typ_phl",
                            model: "model.typ_phl=value.typ_phl",
                            multi: true,
                            dropdown: false,
                            list: false,
                            flag: Gordic.Prefabs.Field.Flags.required,
                            validators: [new Gordic.Validators.Required()],
                            initialValue: { typ_phl: that.typPhl },
                            defaultValue: { typ_phl: that.typPhl }
                        });
                    }
                    form.addRow("Poř. číslo")
                        .addField("gstringbox", {
                        name: "por_cislo",
                        allowedChars: "0123456789"
                    })
                        .addRow("Stav vymáhání")
                        .addField("gselectbox", Gordic.Prefabs.Select.stavVymahani(), {
                        name: "stav_vym",
                        model: "model.stav_vym = value.stav_vym"
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "stav_vym_non",
                        label: "Nemá stav vymáhání (negace výběru)",
                    })
                        .addRow("Stav vymáhání - odkaz")
                        .addField("gselectbox", Gordic.Prefabs.Select.stavVymahani(), {
                        name: "stav_vym_old",
                        model: "model.stav_vym_old = value.stav_vym"
                    })
                        .addRow("Stav doručení")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpcsdo(), {
                        name: "stav_doruc",
                        model: "model.stav_doruc = value.stav_doruc"
                    })
                        .addRow("Stav tisku")
                        .addField("gselectbox", Gordic.Prefabs.Select.ekoctis(), {
                        name: "s_tis",
                        model: "model.s_tis = value.s_tis"
                    })
                        .addRow("Aktivita")
                        .addField("gselectbox", Gordic.Prefabs.Select.ekocakt(), {
                        name: "aktivita",
                        model: "model.aktivita = value.eko_akt"
                    })
                        .addRow("Stav vypravení")
                        .addField("gselectbox", Gordic.Prefabs.Select.gincpan(), {
                        name: "vypraveno",
                        model: "model.vypraveno = value.priz_an"
                    })
                        .addRow("Identifikátor vymáhání")
                        .addField("gstringbox", {
                        name: "ixp_nvy"
                    })
                        .addRow("VS")
                        .addField("gstringbox", {
                        name: "vs",
                        allowedChars: "0123456789",
                        validators: [new Gordic.Validators.Length({ max: 12 })]
                    })
                        .addRow("AC")
                        .addField("gstringbox", {
                        name: "ac",
                        allowedChars: "0123456789",
                        validators: [new Gordic.Validators.Length({ max: 20 })]
                    })
                        .addRow("Značka")
                        .addField("gstringbox", {
                        name: "cj_vym",
                        allowedChars: "0123456789",
                        validators: [new Gordic.Validators.Length({ max: 30 })]
                    })
                        .addRow("Skupina vymáhání")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpsskv(), {
                        name: "ixs_skv",
                        model: "model.ixs_skv = value.ixs_skv"
                    })
                        .addRow("Stav insolvence")
                        .addField("gselectbox", Gordic.Prefabs.Select.gincisr(), {
                        name: "druh_stav_rizeni",
                        model: "model.druh_stav_rizeni = value.druh_stav_rizeni",
                        itemTemplate: "{druh_stav_rizeni} - {druh_stav_r_txt}",
                        serverFilters: { PridejVsechnyStavyInsolvence: true, PridejNeniVInsolvenci: true }
                    });
                    return form;
                }
                /**
                 * Vytvoření formuláře do filtru - Složení vymáhání
                 * @returns
                 */
                createFilterFormSlozeniVymahani() {
                    return new Gordic.Forms.Form({ tabLabel: "Složení vymáhání" })
                        .addSection()
                        .addRow("Případ")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "pep_pid", //ixp_ddp?
                    })
                        .addRow("Kategorie pohybu")
                        .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                        name: "pep_ktg_upo",
                        model: "model.pep_ktg_upo = value.ktg_upo"
                    })
                        .addRow("Datum splatnosti")
                        .addField("gdatebox", "w-6", {
                        name: "pep_dat_spl_0"
                    })
                        .addField("gdatebox", "w-6", {
                        name: "pep_dat_spl_1"
                    })
                        .addRow("Priorita úhrady")
                        .addField("gstringbox", "w-6", {
                        name: "pep_pri_uhr_0",
                        allowedChars: "0123456789"
                    })
                        .addField("gstringbox", "w-6", {
                        name: "pep_pri_uhr_1",
                        allowedChars: "0123456789"
                    });
                }
                /**
                 * Vytvoření formuláře do filtru - Předpisy vymáhaného případu
                 * @returns
                 */
                createFilterFormPredpisyVymPrip() {
                    return new Gordic.Forms.Form({ tabLabel: "Předpisy vymáhaného případu" })
                        .addSection()
                        .addRow("Datum vzniku")
                        .addField("gdatebox", "w-6", {
                        name: "dat_vzniku_0"
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_vzniku_1"
                    })
                        .addRow("Datum splatnosti")
                        .addField("gdatebox", "w-6", {
                        name: "dat_spl_0"
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_spl_1"
                    })
                        .addRow()
                        .addField("gradio", {
                        name: "predpisy",
                        itemClass: "w-6",
                        radios: [
                            { value: 1, label: 'má předpisy' }, //ano
                            { value: 0, label: 'nemá předpisy' }, //ne
                        ],
                        emptyValue: 1
                    });
                }
                /**
                 * Vytvoření formuláře do filtru - Platby vymáhaného případu
                 * @returns
                 */
                createFilterFormPlatbyVymPrip() {
                    return new Gordic.Forms.Form({ tabLabel: "Platby vymáhaného případu" })
                        .addSection()
                        .addRow("Datum banky")
                        .addField("gdatebox", "w-6", {
                        name: "dat_uhr_0"
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_uhr_1"
                    })
                        .addRow("Datum zaplacení")
                        .addField("gdatebox", "w-6", {
                        name: "dat_zap_0"
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_zap_1"
                    })
                        .addRow()
                        .addField("gradio", {
                        name: "platby",
                        itemClass: "w-6",
                        radios: [
                            { value: 1, label: 'má platby' }, //ano
                            { value: 0, label: 'nemá platby' }, //ne
                        ],
                        emptyValue: 1
                    });
                }
                /**
                 * Vytvoření formuláře do filtru - Zpracovatel
                 * @returns
                 */
                createFilterFormZpracovatel() {
                    return new Gordic.Forms.Form({ tabLabel: "Zpracovatel" })
                        .addSection()
                        .addField("gselectbox", "w-9", Gordic.Prefabs.Select.ddpZpracovatel(), {
                        name: "ixs_fun_cil",
                        model: "model.ixs_fun_cil = value.ixs_fun",
                        serverFilters: {
                            typ_phl: ""
                        },
                    })
                        .addField("gcheck", "w-3", {
                        name: "ixs_fun_cil_hist",
                        label: "Hist."
                    });
                }
                /**
                 * Vytvoření formuláře do filtru - Elektronický obraz
                 * @returns
                 */
                createFilterFormElObraz() {
                    return new Gordic.Forms.Form({ tabLabel: "Elektronický obraz" })
                        .addSection()
                        .addField("gradio", {
                        name: "el_obraz",
                        itemClass: "w-4",
                        radios: [
                            { value: 2, label: 'nebrat v úvahu' }, //ano i ne
                            { value: 1, label: 'má el. obraz' }, //ano
                            { value: 0, label: 'nemá el. obraz' }, //ne
                        ],
                        emptyValue: 2
                    });
                }
                /**
                * Vytvoření formuláře do filtru - Datová schránka
                * @returns
                */
                createFilterFormDS() {
                    return new Gordic.Forms.Form({ tabLabel: "Datová schránka" })
                        .addSection()
                        .addField("gradio", {
                        name: "ds",
                        itemClass: "w-4",
                        radios: [
                            { value: 2, label: 'nebrat v úvahu' }, //ano i ne
                            { value: 1, label: 'má ID DS' }, //ano
                            { value: 0, label: 'nemá ID DS' }, //ne
                        ],
                        emptyValue: 2
                    });
                }
                /**
               * Vytvoření formuláře do filtru - Příznaky vymáhání
               * @returns
               */
                createFilterFormPriznakyVym() {
                    var that = this;
                    return new Gordic.Forms.Form({ name: "priznakyVymForm", tabLabel: "Příznaky vymáhání" })
                        .addSection()
                        .addField("gcheck", "w-6", {
                        name: "je_ve_spisu",
                        label: "Vymáhání je ve spisu",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("neni_ve_spisu", obj.value, ev, "priznakyVymForm");
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "neni_ve_spisu",
                        label: "Vymáhání není ve spisu",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("je_ve_spisu", obj.value, ev, "priznakyVymForm");
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "nema_ds",
                        label: "Vymáhání nemá dotčený subjekt",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("ma_vice_ds", obj.value, ev, "priznakyVymForm");
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "ma_vice_ds",
                        label: "Vymáhání má více dotčených subjektů",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("nema_ds", obj.value, ev, "priznakyVymForm");
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "dilci_vypocet",
                        label: "Pouze dílčí výpočty",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("dilci_vypocet_non", obj.value, ev, "priznakyVymForm");
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "dilci_vypocet_non",
                        label: "Bez dílčích výpočtů",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("dilci_vypocet", obj.value, ev, "priznakyVymForm");
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "esu_priz_umrti",
                        label: "Poplatník zemřel",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("esu_priz_neumrti", obj.value, ev, "priznakyVymForm");
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "esu_priz_neumrti",
                        label: "Poplatník žije",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("esu_priz_umrti", obj.value, ev, "priznakyVymForm");
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "esu_priz_sledovani_iszr",
                        label: "Poplatník JE přihlášen k odběru změn ISZR",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("esu_priz_sledovani_iszr_ne", obj.value, ev, "priznakyVymForm");
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "esu_priz_sledovani_iszr_ne",
                        label: "Poplatník NENÍ přihlášen k odběru změn ISZR",
                        change: (ev, obj) => {
                            that.setOppositeCheckFalse("esu_priz_sledovani_iszr", obj.value, ev, "priznakyVymForm");
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "esu_priz_overen_iszr_ne",
                        label: "Poplatník NENÍ ověřen ISZR"
                    })
                        .addField("gcheck", "w-6", {
                        name: "vlastni",
                        label: "Zobrazit pouze vlastní"
                    });
                }
                /**
                * Vytvoření formuláře do filtru - Intervaly
                * @returns
                */
                createFilterFormIntervaly() {
                    return new Gordic.Forms.Form({ tabLabel: "Intervaly" })
                        .addSection()
                        .addRow("Datum od")
                        .addField("gdatebox", "w-6", {
                        name: "dat_od_0"
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_od_1"
                    })
                        .addRow("Datum do")
                        .addField("gdatebox", "w-6", {
                        name: "dat_do_0"
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_do_1"
                    })
                        .addRow("Datum generování")
                        .addField("gdatebox", "w-6", {
                        name: "dat_vyst_0"
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_vyst_1"
                    })
                        .addRow("Datum narození")
                        .addField("gdatebox", "w-6", {
                        name: "esu_dat_nar_0"
                    })
                        .addField("gdatebox", "w-6", {
                        name: "esu_dat_nar_1"
                    })
                        .addRow("Datum úmrtí / ukončení")
                        .addField("gdatebox", "w-6", {
                        name: "esu_dat_umrti_0"
                    })
                        .addField("gdatebox", "w-6", {
                        name: "esu_dat_umrti_1"
                    });
                }
                /**
                 * Vytvoření formuláře do filtru - Klíčová slova
                 * @returns
                 */
                createFilterFormKlicovaSlova() {
                    return new Gordic.Forms.Form({ name: "klicovaSlovaForm", tabLabel: "Klíčová slova" })
                        .addSection()
                        .addRow("Klíčová slova")
                        .addField("gselectbox", "w-9", Gordic.Prefabs.Select.wflKlicSlova(), {
                        name: "kl_slovo",
                        model: "model.kl_slovo = value.kl_slovo",
                        serverFilters: { typ_ag: 350, aktivita: 100 }
                    })
                        .addField("gcheck", "w-3", {
                        name: "klicova_slova_ne",
                        label: "Nemá klíčová slova",
                        change: (ev, obj) => {
                            var klicovaSlovaForm = $(ev.currentTarget).findForms("klicovaSlovaForm")[1]; //je to [1] jelikož se ten filterpanel nějak blbě vytváří a jsou tam tyhle formuláře dvakrát (jednou jako ve filterpanelu a jednou v detailu filterpanelu)
                            if (obj.value) {
                                $(klicovaSlovaForm).findFields("klicova_slova").gfield("setValue", null);
                                $(klicovaSlovaForm).findFields("klicova_slova").gfield("disable");
                            }
                            else {
                                $(klicovaSlovaForm).findFields("klicova_slova").gfield("enable");
                            }
                        }
                    });
                }
                /**
                 * Odškrtne nekompatibilní (2 checkboxy se navzájem ruší) checkboxy
                 * @param oppositeFieldName
                 * @param currentFieldValue
                 * @param ev
                 */
                setOppositeCheckFalse(oppositeFieldName, currentFieldValue, ev, form) {
                    if (currentFieldValue) {
                        var formular = $(ev.currentTarget).findForms(form)[1]; //je to [1] jelikož se ten filterpanel nějak blbě vytváří a jsou tam tyhle formuláře dvakrát (jednou jako ve filterpanelu a jednou v detailu filterpanelu)
                        $(formular).findFields(oppositeFieldName).gfield("setValue", false);
                    }
                }
                //#endregion
                //#region Akce v menuBaru
                /** Vytvoří nové vymáhání */
                noveVymahani() {
                    var that = this;
                    var dtoVym = {};
                    dtoVym.ixp_ddp = that.DtoPripadu.ixp;
                    dtoVym.typ_phl = that.DtoPripadu.typ_phl;
                    dtoVym.ixs_fun_akt = that.DtoPripadu.ixs_fun_akt;
                    if (that.params.ddp_vym_povskv != "" && that.params.ddp_vym_poeskv == "") {
                        that.showFlash("Není povolena žádná skupina vymáhání pro pořízení vymáhání!", "error");
                    }
                    else {
                        if (that.params.ddp_gen_ixpvym == 0) {
                            // Pokud je parametr nastaven na hodnotu 0, tak manuálně zadáváme identifikátor
                            // (pokud je 1, tak se generuje, ale to je až na serveru)
                            var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1 LMS-0-12-0" })
                                .addRow("Identifikátor")
                                .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                                name: "ixp",
                                flag: Gordic.Prefabs.Field.Flags.required,
                                validators: [new Gordic.Validators.Required()],
                                initialValue: that.globalSettings?.get(`Global.Wfl.AppSettings.OthersSettings.PredplneniPID`) ?? ""
                            });
                            that.dialogs.simpleForm("Zadání identifikátoru", form)
                                .on("close", (_obj, retVal) => {
                                if (retVal) {
                                    dtoVym.ixp_nvy = retVal.ixp;
                                    that.podaniVymahani(dtoVym);
                                }
                            });
                        }
                        else {
                            that.podaniVymahani(dtoVym);
                        }
                    }
                }
                /**
                 * Zavolání funkce podání vymáhání na serveru
                 * @param data
                 */
                podaniVymahani(data) {
                    var that = this;
                    that.beginOperation({ id: "podaniVymahani", text: "Probíhá podání vymáhání..." });
                    that.isl.VymahaniDDP.podaniVymahaniSeznamVym({ data: data })
                        .get()
                        .done((result) => {
                        if (result.length == 12) {
                            that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                ID: "DDPGDetailVymahani#",
                                ixpNvy: result
                            }).on("close", () => {
                                that.load();
                            });
                        }
                        else {
                            that.showFlash("Nepovedlo se podat vymáhání!", "error");
                        }
                    })
                        .always(() => {
                        that.endOperation({ id: "podaniVymahani" });
                    });
                }
                //#endregion
                //#region Akce 'vymáhání' - Automatické generování vymáhání pro vybraný případ DDP...
                /**
                 * Inicializace hodnot pro formulář hromadné akce "vymáhání"
                 * @returns
                 */
                inicialniHodnotyProFormularVymahani(modelData) {
                    var that = this;
                    var dat_od;
                    var dat_do;
                    var form = $.content().findForms("wizParams");
                    var currentElement = $(form);
                    $.content(currentElement).beginOperation({ id: "inicialniHodnotyProFormularVymahani", text: "Načítání nastavení..." });
                    if (that.vymahatDale) {
                        that.isl.VymahaniDDP.existujeNastaveniExekuce({ typPhl: that.typPhl })
                            .get()
                            .done((existuje) => {
                            if (!existuje) {
                                $.content().findFields("exekuce").gfield("disable");
                            }
                            form.findFields("ixs_skv").gfield("setValue", { ixs_skv: modelData.ixs_skv, nazev: modelData.ixs_skv_nazev, barva: modelData.barva });
                            form.findFields("algoritmus").gfield("setValue", { alg_vym: modelData.alg_vym, alg_vym_txt: modelData.alg_vym_txt });
                            form.findFields("stav_vym").gfield("setValue", { stav_vym: modelData.stav_vym, stav_vym_txt: modelData.stav_vym_txt });
                            form.findFields("stav_vym_old").gfield("setValue", { stav_vym: modelData.stav_vym_old, stav_vym_txt: modelData.stav_vym_old_txt });
                            form.findFields("datum").gfield("setInitial", { start: modelData.dat_od, end: modelData.dat_do });
                            that.vymahatDale = false;
                        })
                            .always(() => {
                            $.content(currentElement).endOperation({ id: "inicialniHodnotyProFormularVymahani" });
                        });
                    }
                    else { // akce 'vymáhát' a 'Vymáhat znovu'
                        // Pokud se jedná o vymáhat znovu, modelData bude naplněn
                        if (that.striktniRezim) {
                            that.isl.VymahaniDDP.vratDatumyPoslednihoKrokuVymahani({ id: that.DtoPripadu.ixp })
                                .get()
                                .done((datumy) => {
                                if (datumy != null) {
                                    dat_od = datumy[0].dat_od;
                                    dat_do = datumy[0].dat_do;
                                    form.findFields("datum").gfield("setInitial", { start: dat_od, end: dat_do });
                                }
                            })
                                .always(() => {
                                $.content(currentElement).endOperation({ id: "inicialniHodnotyProFormularVymahani" });
                            });
                        }
                        that.isl.VymahaniDDP.existujeNastaveniExekuce({ typPhl: that.typPhl })
                            .get()
                            .done((existuje) => {
                            if (!existuje) {
                                $.content().findFields("exekuce").gfield("disable");
                            }
                            // hodil sem semka vložení iniciálních hodnot pro skupinu a algoritmus vymáhání, jelikož to nastane až po otevření wizardu
                            if (!that.striktniRezim) {
                                var skupina = that.globalSettings.get(`Global.Ddp.GeneraceVymahaniSettings.Skupina${that.ixpDen}${that.typPhl}`);
                                var algoritmus;
                                if (skupina != null) {
                                    algoritmus = that.globalSettings.get(`Global.Ddp.GeneraceVymahaniSettings.Algoritmus${that.ixpDen}${that.typPhl}${skupina.ixs_skv}`);
                                    form.findFields("ixs_skv").gfield("setValue", skupina);
                                    form.findFields("algoritmus").gfield("setValue", algoritmus);
                                }
                                if (Object.keys(modelData).length != 0) {
                                    form.findFields("stav_vym").gfield("setValue", { stav_vym: modelData.stav_vym, stav_vym_txt: modelData.stav_vym_txt });
                                    form.findFields("stav_vym_old").gfield("setValue", { stav_vym: modelData.stav_vym_old, stav_vym_txt: modelData.stav_vym_old_txt });
                                    // pokud se 'obnovuje' vymáhání, tak je potřeba odstranit fukce které se na sobě závislé, jelikož pokud se hodí do modelu tak to hází errory
                                    delete modelData.ixs_skv;
                                    delete modelData.nazev_skupina;
                                    delete modelData.barva;
                                    delete modelData.alg_vym;
                                    delete modelData.alg_vym_txt;
                                    delete modelData.stav_vym;
                                    delete modelData.stav_vym_txt;
                                    delete modelData.stav_vym_old;
                                    delete modelData.stav_vym_old_txt;
                                    $.content().findFields().gfield("model", "apply", modelData);
                                }
                                else if (skupina != null) { // Pokud se neobnovuje, tak se nastaví výchozí hodnoty
                                    var krokVymField = form.findFields("stav_vym");
                                    krokVymField.gfield("getServerFilters").then((sf) => {
                                        return new Gordic.Data.Readers.KrokyVymNoveVym().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                                    }).then((stavVym) => {
                                        krokVymField.gfield("setValue", stavVym[0]);
                                    });
                                }
                                else { // nastavíme vše
                                    // Pokud se neobnovuje, tak se nastaví výchozí hodnoty
                                    var skupinaField = form.findFields("ixs_skv");
                                    skupinaField.gfield("getServerFilters").then((sf) => {
                                        return new Gordic.Data.Readers.SkupinaVymahaniNoveVym().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                                    }).then((skupina) => {
                                        skupinaField.gfield("setValue", skupina[0]);
                                    });
                                    that.setInitValues();
                                }
                            }
                            else { // striktní režim
                                // Pokud je striktní režim, tak se nepoužívá userSettings
                                if (Object.keys(modelData).length != 0) {
                                    form.findFields("ixs_skv").gfield("setValue", { ixs_skv: modelData.ixs_skv, nazev: modelData.nazev_skupina, barva: modelData.barva });
                                    form.findFields("algoritmus").gfield("setValue", { alg_vym: modelData.alg_vym, alg_vym_txt: modelData.alg_vym_txt });
                                    form.findFields("stav_vym").gfield("setValue", { stav_vym: modelData.stav_vym, stav_vym_txt: modelData.stav_vym_txt });
                                    form.findFields("stav_vym_old").gfield("setValue", { stav_vym: modelData.stav_vym_old, stav_vym_txt: modelData.stav_vym_old_txt });
                                    // pokud se 'obnovuje' vymáhání, tak je potřeba odstranit fukce které se na sobě závislé, jelikož pokud se hodí do modelu tak to hází errory
                                    delete modelData.ixs_skv;
                                    delete modelData.nazev_skupina;
                                    delete modelData.barva;
                                    delete modelData.alg_vym;
                                    delete modelData.alg_vym_txt;
                                    delete modelData.stav_vym;
                                    delete modelData.stav_vym_txt;
                                    delete modelData.stav_vym_old;
                                    delete modelData.stav_vym_old_txt;
                                    form.findFields().gfield("model", "apply", modelData);
                                }
                                else {
                                    // Pokud se neobnovuje, tak se nastaví výchozí hodnoty
                                    var skupinaField = form.findFields("ixs_skv");
                                    skupinaField.gfield("getServerFilters").then((sf) => {
                                        return new Gordic.Data.Readers.SkupinaVymahaniNoveVym().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                                    }).then((skupina) => {
                                        skupinaField.gfield("setValue", skupina[0]);
                                    });
                                    that.setInitValues();
                                }
                            }
                        })
                            .always(() => {
                            $.content(currentElement).endOperation({ id: "inicialniHodnotyProFormularVymahani" });
                        });
                    }
                }
                /**
                * Nastavení výchozích hodnot pro formulář hromadné akce "vymáhání", pokud se změní skupina
                */
                setInitValues() {
                    var form = $.content().findForms("wizParams");
                    var algField = form.findFields("algoritmus");
                    algField.gfield("getServerFilters").then((sf) => {
                        return new Gordic.Data.Readers.Ddpcagv().getData(sf);
                    }).then((alg) => {
                        algField.gfield("setValue", alg[0]);
                    });
                    var krokVymField = form.findFields("stav_vym");
                    krokVymField.gfield("getServerFilters").then((sf) => {
                        return new Gordic.Data.Readers.KrokyVymNoveVym().getData(sf);
                    }).then((stavVym) => {
                        krokVymField.gfield("setValue", stavVym[0]);
                    });
                }
                /**
                 * Formulář pro hromadnou akci "vymáhání"
                 * @returns
                 */
                formularVymahani(modelData) {
                    var that = this;
                    // Pokud je modelData naplněn, znamená to že se opakuje akce, tudíž není nutné přednastavit
                    //that.inicialniHodnotyProFormularVymahani(modelData);
                    var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L2M2S1 LMS-3-7-2" })
                        .addSection("Nastavení výpočtu")
                        .addRow("Skupina")
                        .addField("gselectbox", Gordic.Prefabs.Select.skupinaVymahaniNoveVym(), {
                        name: "ixs_skv",
                        model: "model.ixs_skv = value.ixs_skv, model.nazev_skupina = value.nazev, model.barva = value.barva",
                        graphicInput: "hidden",
                        customClass: Gordic.Components.GFieldAssist.ignoreClass,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            typ_phl: that.DtoPripadu.typ_phl,
                            aktivita: 100,
                            id: that.DtoPripadu.ixp,
                            typ: 1
                        },
                        itemTemplate: (data) => {
                            let bg = data?.barva != null ? `background-color: ${WebClient.Common.Base.GetHexColor(data?.barva)};` : "";
                            return `<div style="display: flex; align-items: center;"><div style="${bg} height: 18px; width: 18px; border: 1px solid gray; margin-right: 5px;"></div>${data?.nazev}</div>`;
                        },
                        change: (ev, obj) => {
                            // Pokud se změní skupina vymáhání, tak ji uložíme do usersettings
                            if (obj.value != null && !that.striktniRezim)
                                that.globalSettings.set(`Global.Ddp.GeneraceVymahaniSettings.Skupina${that.ixpDen}${that.typPhl}`, obj.value);
                            that.setInitValues();
                        }
                    })
                        .addRow("Algoritmus")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpcagv(), {
                        name: "algoritmus",
                        model: "model.alg_vym = value.alg_vym, model.alg_vym_txt = value.alg_vym_txt",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            alg_vym: "!= 0",
                            ixs_skv: new Gordic.Forms.Dependency("ixs_skv", "ixs_skv", true)
                        },
                        change: (ev, obj) => {
                            // Pokud se změní algoritmus, tak ji uložíme do usersettings
                            if (obj.value != null) {
                                var skupina = $(ev.currentTarget).findForms("wizParams").findFields("ixs_skv").gfield("getValue");
                                if (skupina != null && !that.striktniRezim) {
                                    that.globalSettings.set(`Global.Ddp.GeneraceVymahaniSettings.Algoritmus${that.ixpDen}${that.typPhl}${skupina.ixs_skv}`, obj.value);
                                }
                            }
                            var datumField = $(ev.currentTarget).findFields("datum");
                            // nemělo by vůbec nastat, ale je to v GUPTĚ :P
                            if (obj.value?.alg_vym == 0) {
                                datumField.gfield("disable");
                                datumField.gfield("setValue", null);
                            }
                            else {
                                datumField.gfield("enable");
                            }
                        }
                    })
                        .addRow("Interval výpočtu")
                        .addField("gintervalbox", {
                        name: "datum",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "napojene",
                        label: "Dluh počítat s napojenými případy"
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "dilci_vypocet",
                        label: "Záznam o vymáhání nebude odesílán, dílčí vypočet",
                        change: (ev, obj) => {
                            // Pokud se jedná o dílčí výpočet, nebude se generovat vymáhání,
                            // nebude se vkládat do spisu apod. Jedná se pouze o výpočet částky za rok
                            if (obj.value) {
                                that.dilciVypocet = true;
                                $(ev.currentTarget).findFields("format_cj").gfield("disable");
                                $(ev.currentTarget).findFields("format_cj").gfield("setValue", "ČJ se nebude generovat... Je nastaven dílčí výpočet.");
                            }
                            else {
                                that.dilciVypocet = false;
                                var form = $(ev.currentTarget).findForms("wizParams");
                                var stavVymField = form.findFields("stav_vym").gfield("getValue");
                                if (stavVymField != null) {
                                    that.nastavFormatCJ(false);
                                }
                                else {
                                    $(ev.currentTarget).findFields("format_cj").gfield("setValue", "");
                                }
                            }
                        }
                    })
                        .addRow({ name: "lokalizace" })
                        .addField("gcheck", {
                        name: "vse_phl",
                        disabled: true,
                        label: "Vymáhat další případy poplatníka (slouč. vymáhání)",
                        change: (ev, obj) => {
                            if (obj.value == true) {
                                if (that.defMaPripady.state() == "resolved") {
                                    if (obj.value && that.maPripady) {
                                        that.actions.actVyberPripadu?.enabled(true);
                                    }
                                    else {
                                        that.actions.actVyberPripadu?.update({ tooltip: "Případ nemá žádné další případy" });
                                        that.actions.actVyberPripadu?.enabled(false);
                                    }
                                }
                                else {
                                    $.content(ev.target).showFlash("Načítání případů ještě není hotové, zkuste to o chvíli později.", "error");
                                    $(ev.target).gfield("setValue", false);
                                }
                            }
                            else {
                                // Zanechat pouze ty položky, které nejsou v 'pripadyVymahaniNapojene'. (jelikož se zrušila volba 'vse_phl')
                                that.pripadyVymahani = that.pripadyVymahani.filter((vymahani) => !that.pripadyVymahaniNapojene.some((napojeny) => napojeny.ixp === vymahani.ixp));
                                that.pripadyVymahaniNapojene = [];
                                var view = new Gordic.Data.View(that.pripadyVymahani);
                                that.actions.actVyberPripadu?.enabled(false);
                                var wizGrid = $.content().find("[data-help-context='list:wizGrid']");
                                wizGrid.ggrid("setData", view);
                            }
                        }
                    })
                        .addText("Lokalizace")
                        .addSection("Definice kroku vymáhání")
                        .addRow("Krok vymáhání procesu")
                        .addField("gselectbox", Gordic.Prefabs.Select.krokyVymNoveVym(), {
                        name: "stav_vym",
                        model: "model.stav_vym = value.stav_vym, model.stav_vym_txt = value.stav_vym_txt",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            aktivita: 100,
                            typ: 1,
                            ixs_skv: new Gordic.Forms.Dependency("ixs_skv", "ixs_skv", true),
                            id: that.DtoPripadu.ixp
                        },
                        change: (ev, obj) => {
                            var form = $(ev.currentTarget).findForms("wizParams");
                            if (obj.value?.stav_vym != null) {
                                var stavVym = obj.value?.stav_vym;
                                var filter = {};
                                filter.id = that.DtoPripadu.ixp;
                                filter.aktivita = 100;
                                filter.typ = 1;
                                if (form.findFields("ixs_skv").gfield("getValue") == null)
                                    filter.ixs_skv = modelData.ixs_skv;
                                else
                                    filter.ixs_skv = form.findFields("ixs_skv").gfield("getValue").ixs_skv;
                                filter.stav_vym = stavVym;
                                // Nastavení generování ČJ 
                                var genecj = that.params.ddp_vym_genecj;
                                if (genecj == 2)
                                    form.findFields("gen_cj").gfield("disable");
                                else if (genecj != 0)
                                    form.findFields("gen_cj").gfield("setValue", true);
                                // Pokud se jedná o první kolo běhu při reloadu okna,
                                // tak hodíme do políčka hodnotu z modelu a nečteme ji ze serveru
                                if (that.refreshFirstLoop == false && !that.vymahatDale) {
                                    $.content(ev.target).beginOperation({ id: "predKroky", text: "Načítání odkazů na kroky..." });
                                    that.isl.VymahaniDDP.predKrokyNoveVym({ filters: filter })
                                        .get()
                                        .done((result) => {
                                        if (result != null) {
                                            form.findFields("stav_vym_old").gfield("setValue", { stav_vym: result[0].stav_vym, stav_vym_txt: result[0].stav_vym_txt });
                                            $.content(ev.target).endOperation({ id: "predKroky" });
                                        }
                                    });
                                }
                                that.nastavDleKrokuVymahani(stavVym, ev);
                            }
                            else {
                                if (that.dilciVypocet) {
                                    form.findFields("format_cj").gfield("disable");
                                    form.findFields("format_cj").gfield("setValue", "ČJ se nebude generovat... Je nastaven dílčí výpočet.");
                                }
                                form.findFields("gen_cj").gfield("setValue", false);
                                var formatCjField = form.findFields("format_cj");
                                formatCjField.gfield("disable");
                                formatCjField.gfield("setValue", "ČJ se nebude generovat...");
                            }
                        }
                    })
                        .addRow("Odkaz na krok")
                        .addField("gselectbox", Gordic.Prefabs.Select.predKrokyVymNoveVym(), {
                        name: "stav_vym_old",
                        model: "model.stav_vym_old = value.stav_vym, model.stav_vym_old_txt = value.stav_vym_txt",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            id: that.DtoPripadu.ixp,
                            aktivita: 100,
                            typ: 1,
                            ixs_skv: new Gordic.Forms.Dependency("ixs_skv", "ixs_skv", true),
                            stav_vym: new Gordic.Forms.Dependency("stav_vym", "stav_vym", true)
                        },
                        change: (ev) => {
                            that.refreshFirstLoop = false;
                            // Pokud je režim striktní, nebude možno změnit odkaz na krok vymáhání - musí být vždy na poslední provedený na případu
                            if (that.striktniRezim)
                                $(ev.target).gfield("disable");
                            else
                                $(ev.target).gfield("enable");
                        }
                    })
                        .addRow("Náklady řízení")
                        .addField("gnumberbox", {
                        name: "c_nak_riz",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Procenta penále")
                        .addField("gnumberbox", {
                        name: "proc_pen",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Minimální vymáhaná částka")
                        .addField("gnumberbox", {
                        name: "c_min_castka",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addSection("Parametry nákladů exekucí")
                        .addRow()
                        .addField("gcheck", "w-6", {
                        name: "exekuce",
                        label: "Vymáhat s náklady exekucí",
                        change: (ev, obj) => {
                            var form = $.content().findForms("wizParams");
                            var datVznikuField = form.findFields("dat_vzniku");
                            var datSplField = form.findFields("dat_spl");
                            var ktgUpoField = form.findFields("ktg_upo");
                            if (obj.value) {
                                datVznikuField.gfield("enable");
                                datSplField.gfield("enable");
                                ktgUpoField.gfield("enable");
                                // Nastavení první hodnoty
                                ktgUpoField.gfield("getServerFilters").then((sf) => {
                                    return new Gordic.Data.Readers.Fuccupo().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                                }).then((ktgUpo) => {
                                    ktgUpoField.gfield("setValue", ktgUpo[0]);
                                });
                            }
                            else {
                                datSplField.gfield("setValue", null);
                                datVznikuField.gfield("setValue", null);
                                ktgUpoField.gfield("setValue", null);
                                datSplField.gfield("disable");
                                datVznikuField.gfield("disable");
                                ktgUpoField.gfield("disable");
                            }
                        }
                    })
                        .addField("gbutton", "w-6", {
                        params: {
                            action: new GAction({
                                name: "btnInfoExe",
                                caption: "Nast. exek.",
                                tooltip: "Nastavení exekuce",
                                customClass: "right",
                                run: () => {
                                    $.content().navigate("Gordic.Ddp.WebClient.GSeznamVyseExekuci", { ID: "DDPGSeznamVyseExekuci#", typPhl: that.typPhl });
                                }
                            })
                        }
                    })
                        .addRow("Kategorie pohybu")
                        .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo",
                        disabled: true,
                        model: "model.ktg_upo=value.ktg_upo",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: {
                            ktg_upo: "< 200"
                        }
                    })
                        .addRow("Datum vzniku")
                        .addField("gdatebox", {
                        name: "dat_vzniku",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true
                    })
                        .addRow("Datum splatnosti")
                        .addField("gdatebox", {
                        name: "dat_spl",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true
                    })
                        .addSection("Určení vymáhaného externího subjektu")
                        .addRow()
                        .addField("gcheck", "w-6", {
                        name: "dot_pla",
                        label: "Vymáhat dle plátce",
                        change: (ev, obj) => {
                            if (obj.value) {
                                $(ev.currentTarget).findFields("dot_subj").gfield("setValue", false);
                                $(ev.currentTarget).findFields("ixs_dva").gfield("disable");
                            }
                        }
                    })
                        .addField("gcheck", "w-6", {
                        name: "dot_subj",
                        label: "Vymáhat dle dotčeného subjektu",
                        change: (ev, obj) => {
                            if (obj.value) {
                                $(ev.currentTarget).findFields("dot_pla").gfield("setValue", false);
                                var ixsDvaField = $(ev.currentTarget).findFields("ixs_dva");
                                ixsDvaField.gfield("enable");
                                // Nastavení první hodnoty
                                ixsDvaField.gfield("getServerFilters").then((sf) => {
                                    return new Gordic.Data.Readers.Wflsdva().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                                }).then((ixsDva) => {
                                    ixsDvaField.gfield("setValue", ixsDva[0]);
                                });
                            }
                            else {
                                $(ev.currentTarget).findFields("ixs_dva").gfield("disable");
                                $(ev.currentTarget).findFields("ixs_dva").gfield("setValue", null);
                            }
                        }
                    })
                        .addRow("Důvod vazby")
                        .addField("gselectbox", Gordic.Prefabs.Select.wflsdva(), {
                        name: "ixs_dva",
                        model: "model.ixs_dva = value.ixs_dva",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true,
                        serverFilters: {
                            aktivita: 100
                        }
                    })
                        .addSection("Číslo jednací/značka")
                        .addRow()
                        .addField("gcheck", {
                        name: "gen_cj",
                        label: "Generovat vymáhání s ČJ",
                        disabled: that.isGenCjDisabled,
                        defaultValue: that.isGenCjChecked,
                        change: (ev, obj) => {
                            var form = $.content().findForms("wizParams");
                            var ixsSkvField = form.findFields("ixs_skv");
                            var stavVymField = form.findFields("stav_vym");
                            var ixsSkv = ixsSkvField.gfield("getValue");
                            var stavVym = stavVymField.gfield("getValue");
                            if (ixsSkv != null && stavVym != null) {
                                that.nastavFormatCJ(true);
                            }
                            else if (obj.value) {
                                $(ev.target).gfield("setValue", false);
                                if (ixsSkv == null)
                                    ixsSkvField.gfield("validate");
                                if (stavVym == null)
                                    stavVymField.gfield("validate");
                            }
                        }
                    })
                        .addRow("Formát ČJ")
                        .addField("gstringbox", {
                        name: "format_cj",
                        disabled: true,
                        validators: [new Gordic.Validators.Length({ max: 30 })]
                    })
                        .addSection();
                    return form;
                }
                /** Předplnění hodnot z nastavení skupiny vymáhání */
                nastavDleKrokuVymahani(stavVym, ev) {
                    var that = this;
                    $.content(ev.target).beginOperation({ id: "nastavDleKrokuVymahani", text: "Probíhá nastavení dle kroku vymáhání..." });
                    var ixsFunPod = "";
                    var nazevRf = "";
                    var ostatniPhl = 0;
                    var lokalizace;
                    var form = $.content().findForms("wizParams");
                    var ixsSkv = form.findFields("ixs_skv").gfield("getValue");
                    //var ixsSkv = $(that).findForms("wizParams").findFields("ixs_skv").gfield("getValue");
                    var dataPromise = $.Deferred();
                    if (ixsSkv == null) {
                        ixsFunPod = that.NullFun;
                        nazevRf = "";
                        ostatniPhl = 0;
                        dataPromise.resolve();
                    }
                    else {
                        that.isl.VymahaniDDP.dataDleSkupiny({ ixsSkv: ixsSkv.ixs_skv, stavVym: stavVym })
                            .get()
                            .done((result) => {
                            if (result.length != 0) {
                                ixsFunPod = result[0].ixs_fun_pod ?? that.NullFun;
                                nazevRf = result[0].nazev_rf ?? "";
                                ostatniPhl = result[0].ostatni_phl ?? 0;
                            }
                            dataPromise.resolve();
                        });
                    }
                    dataPromise.done(() => {
                        // získala se data dle skupiny a kroku, tak můžeme jet dál
                        that.nastavFormatCJ(false);
                        if (ixsFunPod.length == 12 && ixsFunPod != that.NullFun) {
                            lokalizace = `: ${nazevRf}`;
                        }
                        else {
                            lokalizace = " dle aktuálně přihl. uživ.";
                        }
                        var lokalizaceRow = form.findFormRows("lokalizace");
                        var lokalizaceText = lokalizaceRow.find(".gform-text");
                        lokalizaceText.text("Lokalizace" + lokalizace);
                        var vsePhlField = form.findFields("vse_phl");
                        if (ostatniPhl == 1) {
                            var ostatniPhlDef = $.Deferred();
                            // Vymáhání proběhne nad vybranými typy pohledávek, dle nastavení skupiny!
                            vsePhlField.gfield("enable");
                            if (that.maPripady == null) {
                                that.maDalsiPripady(ostatniPhlDef, $.content(ev.target));
                                ostatniPhlDef.done(() => {
                                    vsePhlField.gfield("setValue", true);
                                });
                            }
                            else {
                                vsePhlField.gfield("setValue", true);
                            }
                        }
                        else if (ixsSkv.ixs_skv == that.NullSkv) {
                            if (that.params.ddp_vym_vymnav == 1) {
                                vsePhlField.gfield("enable");
                                vsePhlField.gfield("setValue", false);
                                if (that.maPripady == null) {
                                    if (that.maDalsiPripady(null, $.content(ev.target)))
                                        that.actions.actVyberPripadu?.enabled(true);
                                }
                            }
                            else {
                                vsePhlField.gfield("setValue", false);
                                vsePhlField.gfield("disable");
                            }
                        }
                        else {
                            vsePhlField.gfield("setValue", false);
                            vsePhlField.gfield("disable");
                        }
                        that.ixsFunPod = ixsFunPod;
                        $.content(ev.target).endOperation({ id: "nastavDleKrokuVymahani" });
                    });
                }
                /** Nastav formát ČJ */
                nastavFormatCJ(zmenaCb) {
                    var that = this;
                    var formatCj = ""; // Formát který se zobrazí v poli
                    var form = $.content().findForms("wizParams");
                    if (that.dilciVypocet) {
                        form.findFields("format_cj").gfield("disable");
                        form.findFields("format_cj").gfield("setValue", "ČJ se nebude generovat... Je nastaven dílčí výpočet.");
                        return;
                    }
                    var ixsSkv;
                    if (form.findFields("ixs_skv").gfield("getValue") == null)
                        ixsSkv = that.modelDataVym.ixs_skv;
                    else
                        ixsSkv = form.findFields("ixs_skv").gfield("getValue").ixs_skv;
                    var stavVym = form.findFields("stav_vym").gfield("getValue").stav_vym;
                    var genCj = form.findFields("gen_cj").gfield("getValue");
                    var formatCjField = form.findFields("format_cj");
                    var genecj = that.params.ddp_vym_genecj;
                    if (genCj == true && genecj != 0 && genecj != 2) {
                        if (genecj == 1) {
                            that.isl.VymahaniDDP.ziskejFormatCj({ ixsSkv: ixsSkv, stavVym: stavVym })
                                .get()
                                .done((format) => {
                                format = format ?? "";
                                format = that.normalizeWhitespace(format);
                                if (format.length > 0) {
                                    genCj = true;
                                    formatCj = format;
                                    formatCjField.gfield("disable");
                                }
                                else {
                                    var formcj = that.normalizeWhitespace(that.params.ddp_vym_formcj ?? "");
                                    if (formcj.length > 0 && formcj != "GGGGGGGGGG") { // GGGGGGGGGG - implicitní hodnota
                                        genCj = true;
                                        formatCj = formcj;
                                        formatCjField.gfield("disable");
                                    }
                                    else {
                                        // pokud se změní button generace ČJ, a je ddp_vym_genecj = 1 , tak bude format CJ aktivní
                                        formatCj = "";
                                        if (!zmenaCb) {
                                            // políčko se změní jen tehdy, pokud se nejedná o změnu políčka samotného - aby nedošlo k zacyklení
                                            genCj = false;
                                        }
                                        formatCjField.gfield("enable");
                                    }
                                }
                                if (!genCj) {
                                    form.findFields("gen_cj").gfield("setValue", genCj);
                                    formatCj = "ČJ se nebude generovat...";
                                    formatCjField.gfield("disable");
                                }
                                else
                                    formatCjField.gfield("setValue", formatCj);
                            });
                        }
                        if (genecj == 3) {
                            formatCj = "ČJ generuje SSL...";
                            formatCjField.gfield("disable");
                        }
                        if (genecj == 4) {
                            formatCj = "ČJ generuje externí SSL...";
                            formatCjField.gfield("disable");
                        }
                    }
                    else {
                        formatCj = "ČJ se nebude generovat...";
                        formatCjField.gfield("disable");
                    }
                    formatCjField.gfield("setValue", formatCj);
                }
                /** Vymáhání na případu DDP */
                vymahani(modelData) {
                    var that = this;
                    if (that.isRefresh)
                        that.refreshFirstLoop = true;
                    that.isRefresh = false;
                    var form = that.formularVymahani(modelData);
                    // Watch for the wizParams form being appended to the DOM
                    const observer = new MutationObserver((mutations) => {
                        mutations.forEach((mutation) => {
                            mutation.addedNodes.forEach((node) => {
                                // Check if the appended node is the wizParams form
                                if ($(node).is('[data-form="wizParams"]') || $(node).find('[data-form="wizParams"]').length > 0) {
                                    // Call the initialization function when the form is ready
                                    that.inicialniHodnotyProFormularVymahani(modelData);
                                    // Disconnect observer since we only need this once
                                    observer.disconnect();
                                }
                            });
                        });
                    });
                    // Start observing the document body for changes
                    observer.observe(document.body, { childList: true, subtree: true });
                    const massUpdate = that.isl.VymahaniDDP.vymahani.bind(that.isl.VymahaniDDP);
                    const checkFunction = that.isl.VymahaniDDP.kontrolaVymahani.bind(that.isl.VymahaniDDP);
                    that.pripadyVymahani = [that.DtoPripadu];
                    that.hromadnaOperaceVymahani(that.pripadyVymahani, "Generace vymáhání", WebClient.Common.GridFormats.HrmAkceSimple(), "ixp", form, massUpdate, checkFunction, "Opravdu chcete provést vymáhání případu?", "", [{ favorite: true, action: that.actions.actHistorieVym }, { favorite: true, action: that.actions.actVyberPripadu }], modelData);
                }
                /** Funkce k otevření okna hromadných změn (Eko.Components.TwoStepsContent) */
                hromadnaOperaceVymahani(data, title, gridFormat, keys, form, massUpdate, checkFunction, confirmMessage, description, menuGrid, modelData) {
                    var that = this;
                    var resultData;
                    that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        title: title,
                        gridFormat: gridFormat,
                        keys: keys,
                        data: data,
                        indicatorType: "KPI",
                        firstStep: {
                            form: form,
                            gridTabTitle: "Vybrané případy", // titulek v tabu   
                            defaultAction: that.actions.actPripadDDP,
                            showIndicator: true,
                            //modelData: modelData, // data pro model 
                            description: description,
                            nextActionName: "Proveď", // název pro tlačítko další
                            menuGridBar: menuGrid, // akce na tabu s gridem
                            checkAction: (model, data) => {
                                model.dat_od = model.datum.start;
                                model.dat_do = model.datum.end;
                                model.typ = that.VymPripadu;
                                model.ixs_fun = that.ixsFunPod;
                                model.id = that.DtoPripadu.ixp;
                                const modelDto = model;
                                data = that.pripadyVymahani;
                                return checkFunction({ dtosPripad: data, model: modelDto }).get()
                                    .then((result) => {
                                    // tady se čaruje, jelikož přidávám data z GVyberPripadu
                                    // zjištění který jsou success a který ne, a ruční změna dat v gridu
                                    var data = Gordic.Eko.Components.Wizard.Utils.getData(result);
                                    var view = new Gordic.Data.View(data);
                                    var wizGrid = $.content().find("[data-help-context='list:wizGrid']");
                                    wizGrid.ggrid("setData", view);
                                    return data;
                                });
                            },
                            nextAction: (model, data) => {
                                let def = $.Deferred();
                                modelData = model;
                                var dat_od = model.datum.start;
                                var dat_do = model.datum.end;
                                model.dat_od = dat_od;
                                model.dat_do = dat_do;
                                model.ixs_fun = that.ixsFunPod;
                                if (model.ixs_fun == that.NullFun || model.ixs_fun.length != 12)
                                    model.ixs_fun = that.ixsFun;
                                model.typ = that.VymPripadu;
                                model.id = that.DtoPripadu.ixp;
                                const modelDto = model;
                                let defNapojene = $.Deferred();
                                var form = $.content().findForms("wizParams");
                                var vsePhl = form.findFields("vse_phl").gfield("getValue");
                                // Pokud je možnost vymáhat i napojené případy a žádné jsme nevybrali, tak oznámíme uživateli
                                if (that.pripadyVymahaniNapojene.length == 0 && that.maPripady && vsePhl) {
                                    var title = "Sloučené vymáhání";
                                    var message = "Nevybrali jste žádný případ pro sloučené vymáhnání, chcete pokračovat?";
                                    that.dialogs.confirm(title, message, 400, 200)
                                        .on("close", (_ev, retVal) => {
                                        if (retVal === "yes") {
                                            defNapojene.resolve();
                                        }
                                        else {
                                            defNapojene.reject();
                                            def.reject();
                                        }
                                    });
                                }
                                else
                                    defNapojene.resolve();
                                defNapojene.done(() => {
                                    var confirmTitle = "Potvrzení hromadné akce";
                                    if (confirmMessage != "") {
                                        that.dialogs.confirm(confirmTitle, confirmMessage, 400, 200)
                                            .on("close", (_ev, retVal) => {
                                            if (retVal === "yes") {
                                                // Vybrání spisu, pokud jsou parametry nastaveny
                                                //ddp_gen_sslzak je ANO  ddp_gen_sslspi je NE ddp_ssl_jedspi == 'Před vložením vybrat spis'
                                                if (that.params.ddp_gen_sslzak != 0 && that.params.ddp_gen_sslspi == 0 && that.params.ddp_ssl_jedspi == 2) {
                                                    Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(that)
                                                        .done(function (retVal) {
                                                        if (retVal == null)
                                                            def.reject();
                                                        else {
                                                            var ixpSpis = retVal.ixp;
                                                            modelDto.ixp_spis = ixpSpis;
                                                            massUpdate({ dtosPripad: data, model: modelDto }).get()
                                                                .then((result) => {
                                                                resultData = result;
                                                                def.resolve(Gordic.Eko.Components.Wizard.Utils.getData(result));
                                                            });
                                                        }
                                                    });
                                                }
                                                else {
                                                    massUpdate({ dtosPripad: data, model: modelDto }).get()
                                                        .then((result) => {
                                                        resultData = result;
                                                        def.resolve(Gordic.Eko.Components.Wizard.Utils.getData(result));
                                                    });
                                                }
                                            }
                                            else {
                                                def.reject();
                                            }
                                        });
                                    }
                                    else {
                                        massUpdate({ dtosPripad: data, model: modelDto }).get()
                                            .then((result) => {
                                            def.resolve(Gordic.Eko.Components.Wizard.Utils.getData(result));
                                        });
                                    }
                                });
                                return def.promise();
                            }
                        },
                        lastStep: {
                            // fáze 2 - zobrazení­ výsledek vymáhání
                            title: "Výsledek vymáhání",
                            gridTabTitle: "Vymáhané pří­pady", // popisek nad gridem
                            form: form,
                            defaultAction: that.actions.actGridVychoziAkce,
                            modelData: () => {
                                debugger;
                                var isError = resultData.result[0].errors != null;
                                //let cnt = $.content($(".gcontent").last());
                                var mainContent = $.content();
                                var wizContent = mainContent.find(".gwizard__content");
                                var commandBar = $.content(wizContent).commandBar() ?? [];
                                if (isError)
                                    that.actions.actReset?.enabled(true);
                                else
                                    that.actions.actReset?.enabled(false);
                                var createdBar = that.actions.createBar(["actReset"]);
                                var reset = createdBar[0];
                                var predchozi = commandBar[0];
                                var complete = commandBar[1];
                                var cancel = commandBar[2];
                                createdBar = [];
                                createdBar.push(predchozi);
                                createdBar.push(reset);
                                createdBar.push(complete);
                                createdBar.push(cancel);
                                $.content(wizContent).commandBar(createdBar);
                                that.modelDataVym = modelData;
                                return {};
                            }
                        },
                        completeDelegate: () => {
                            // Pokud se jedná o refresh, tak neprovádět refresh gridu
                            if (!that.isRefresh)
                                that.ziskejData(that.filterData);
                        },
                        cancelDelegate: () => {
                        }
                    }).createDialogPromise();
                }
                /** Zjistí zda má případ DDP, další případy možné k vymáhání */
                maDalsiPripady(def, content) {
                    var that = this;
                    that.defMaPripady = $.Deferred();
                    if (def != null)
                        content.beginOperation({ text: "Probíhá zjištění zda existují další případy...", id: "dalsiPripady" });
                    that.isl.VymahaniDDP.maPripadyVJinePHL({ ixpDdp: that.DtoPripadu.ixp, typPhl: that.DtoPripadu.typ_phl })
                        .get()
                        .done((result) => {
                        if (result) {
                            that.maPripady = true;
                            //that.actions.actVyberPripadu?.update();
                            that.defMaPripady.resolve();
                            if (def != null) {
                                content.endOperation({ id: "dalsiPripady" });
                                def.resolve();
                            }
                        }
                        else {
                            that.isl.VymahaniDDP.maPripadySDotcenymSubjektem({ ixpDdp: that.DtoPripadu.ixp, typPhl: that.DtoPripadu.typ_phl })
                                .get()
                                .done((result2) => {
                                if (result2)
                                    that.maPripady = true;
                                else
                                    that.maPripady = false;
                                that.defMaPripady.resolve();
                                if (def != null) {
                                    content.endOperation({ id: "dalsiPripady" });
                                    def.resolve();
                                }
                            });
                        }
                    });
                    return that.maPripady;
                }
                //#endregion
                //#region Odeslání
                /** O jaký typ odeslání se jedná
                * 0 - odeslat nové zásilky
                * 1 - odeslat připravené zásilky
                * 2 - generovat elektronické dokumenty
                */
                odeslatElektronicky(odeslatExistujici) {
                    var that = this;
                    var def = $.Deferred();
                    that.beginOperation({ id: "deleteSSLTODE", text: "Probíhá úklid dočastné tabulky..." });
                    that.isl.VymahaniDDP.deleteSSLTODE().get().done(() => {
                        that.endOperation({ id: "deleteSSLTODE" });
                    });
                    var nastaveniModel = {};
                    var globalWflctdo = that.globalSettings?.get("Global.Ddp.ZasilkySettings.default_wflctdo");
                    if (globalWflctdo != undefined)
                        nastaveniModel.wflctdo = globalWflctdo.typ_vyh_dor;
                    else
                        nastaveniModel.wflctdo = 0;
                    var globalWflctti = that.globalSettings?.get("Global.Ddp.ZasilkySettings.default_wflctti");
                    if (globalWflctti != undefined)
                        nastaveniModel.wflctti = globalWflctti.typ_tisku;
                    else
                        nastaveniModel.wflctti = 0;
                    var globalWflctar = that.globalSettings?.get("Global.Ddp.ZasilkySettings.default_wflctar");
                    if (globalWflctar != undefined)
                        nastaveniModel.wflctar = globalWflctar.typ_archivace;
                    else
                        nastaveniModel.wflctar = 0;
                    var globalWflctko = that.globalSettings?.get("Global.Ddp.ZasilkySettings.default_wflctko");
                    if (globalWflctko != undefined)
                        nastaveniModel.wflctko = globalWflctko.typ_konverze;
                    else
                        nastaveniModel.wflctko = 0;
                    if (odeslatExistujici == 0 || odeslatExistujici == 2) {
                        // Výběr co odesílat
                        that.navigate("Gordic.Ddp.WebClient.GElektrickeOdeslani", { tema: "ddp_ptm_nvy" })
                            .on("close", (_ev, retVal) => {
                            if (retVal != null) {
                                // dle typy výběru vybrat buď vybrané nebo všechny
                                var selection = that.gridVymahani.ggrid("getSelection");
                                var odeslaniModel = retVal.data;
                                that.beginOperation({ id: "odeslani", text: "Odesílání zásilek..." });
                                that.isl.VymahaniDDP.odeslatElektronicky({ pripad: selection, odeslaniDto: odeslaniModel, nastaveniDto: nastaveniModel }).get().done(() => {
                                    def.resolve();
                                    that.endOperation({ id: "odeslani" });
                                });
                            }
                        });
                    }
                    else if (odeslatExistujici == 1) {
                        that.beginOperation({ id: "dohledani", text: "Probíhá dohledání nedokončených zásilek..." });
                        that.isl.VymahaniDDP.nedokonceneZasilky({ nastaveniDto: nastaveniModel }).get().done(() => {
                            def.resolve();
                        }).always(() => {
                            that.endOperation({ id: "dohledani" });
                        });
                    }
                    // Proběhlo vložení zásilek do dočasné tabulky, tak zkontrolujem zda tam něco je a můžeme pokračovat s odesláním
                    def.done(() => {
                        that.isl.VymahaniDDP.dataSSLTODE().get().done((result) => {
                            if (result.length == 0) {
                                if (odeslatExistujici == 1) {
                                    that.dialogs.error("Neexistují žádné rozpracované zásilky!");
                                }
                                else {
                                    that.dialogs.error("Nepovedlo se připravit žádnou zásilku k odeslání, ujistěte se, zda vybrané záznamy o vymáhání jsou správně nastavené! \n \n" +
                                        "Např. chybí dotčené subjekty u vymáhání, odesíláte cizí vymáhání, ale vybrali jste vlastní zásilky pro odeslání atd.", 360, 175);
                                }
                            }
                            else {
                                that.odeslatHromadne(result);
                            }
                        });
                    });
                }
                // Odeslat - uděláno dle SML05
                odeslatHromadne(data) {
                    var that = this;
                    let tema = "ddp_ptm_nvy";
                    let reportInfo;
                    let reportDto;
                    let form = new Gordic.Forms.Form()
                        .addRow("Sestava", true)
                        .addField("gselectbox", Gordic.Prefabs.Select.reports({
                        reportsOptions: {
                            Tema: tema,
                            //IxsStr: this.dbparams.sml_ptm_prtsml,
                            //ServerRestrictionAlfMethod: (this.ktg_den == 1691 /*ng_ktgdenIndPrislib*/) ? "Gordic.Sml.WebClient.GSeznamDokladuSml:GetRestrictionAlf" : void 0,
                            //ServerRestrictionAlvMethod: (this.ktg_den == 1691 /*ng_ktgdenIndPrislib*/) ? "Gordic.Sml.WebClient.GSeznamDokladuSml:GetRestrictionAlv" : void 0
                        }
                    }), {
                        name: "reportId",
                        model: "model.reportId=value.reportId",
                        validators: [new Gordic.Validators.Required(),
                            new Gordic.Validators.Base({
                                validateWithMessage: (value, src) => {
                                    if (reportInfo) {
                                        if (!(reportInfo.typVyst == "TXT" || reportInfo.typVyst == "RTF" || reportInfo.typVyst == "XME")) {
                                            return "Vybranou sestavu nelze uložit do výstupního formátu PDF";
                                        }
                                        if (parseInt(reportInfo.commonInfos?.ZPUS_ULOZ ?? "0") == 0) {
                                            return "Zvolená tisková sestava nemá nastaven způsob uložení do elektronického uložiště. Kontaktujte administrátora systému.";
                                        }
                                    }
                                    return null;
                                }
                            })
                        ],
                        change: (ev, ctx) => {
                            const cnt = $.content(ev.target);
                            reportInfo = void 0;
                            reportDto = void 0;
                            if (ctx?.value) {
                                reportDto = ctx.value;
                                cnt.beginOperation("Načítání podrobností o sestavě");
                                Gordic.Report.WebClient.GReportTreeControlTS.getReportInfo(ctx.value.reportId ?? "", ctx.value.rokMesDo).then((res) => {
                                    if (res) {
                                        reportInfo = res;
                                        $(ev.target).gfield("validate");
                                    }
                                }).always(() => { cnt.endOperation(); });
                            }
                        }
                    });
                    that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        title: "Hromadné vygenerování el. obrazů a odeslání do výpravny",
                        gridFormat: WebClient.Common.GridFormats.Zasilka(),
                        keys: "ixp, ixs_esu",
                        data: data,
                        indicatorType: "KPI",
                        firstStep: {
                            form: form,
                            gridTabTitle: "Vybrané případy", // titulek v tabu   
                            defaultAction: that.actions.actGridVychoziAkce,
                            showIndicator: true,
                            description: "Akce vygeneruje asynchronně (na pozadí) el. obrazy vybraným (zaškrtnutým) dokladům a v notifikačním centru poté nabídne odeslání do výpravny.",
                            //modelData: modelData, // data pro model 
                            nextActionName: "Vygenerovat a odeslat",
                            checkAction: (model, data) => {
                                const checkFunction = that.isl.VymahaniDDP.kontrolaSSLTODE.bind(that.isl.VymahaniDDP);
                                return checkFunction({ zasilkaDtos: data }).get()
                                    .then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            nextAction: (model, data) => {
                                let validIxps = Array.from(new Set(data.filter((item) => item.wiz_kind == 200).map(item => item.ixp)));
                                const params = new Array(); //Kolik instanci parametru, tolikrat se bude generovat sestava
                                const paramsForAsync = new Array(); //Kolik instanci parametru, tolikrat se bude generovat sestava
                                // pokud je první případ dát na x0008 2 jinak 0 
                                for (let item of validIxps) {
                                    var val = { X0000: this.typPhl, X0001: this.ico, X0004: this.lic, X0006: item, X0007: "0", X0008: "2", X0009: that.X0009, IXP: item };
                                    params.push(val);
                                    var valAsync = { X0000: this.typPhl, X0001: this.ico, X0004: this.lic, X0006: item, X0007: "0", X0008: "0", IXP: item };
                                    paramsForAsync.push(valAsync);
                                }
                                let navrhDialog = $.newDiv().gcontent([Gordic.Report.WebClient.GReportPreview, {
                                        input: {
                                            dto: {
                                                reportId: reportDto?.reportId ?? "",
                                                platnost: this.rok.toString() + (this.mesic?.toString() ?? ""),
                                                params: (params?.length > 0) ? params[0] : void 0 //pokud je více parametrů, tak návrh pustím pouze s prvním
                                            },
                                            //autoGenerate: true
                                        }
                                    }]);
                                const navrhCnt = $.content(navrhDialog);
                                return navrhCnt.initAwait.then(() => { return navrhCnt.getParams(); })
                                    .then((pars) => {
                                    const scheduledParams = pars;
                                    scheduledParams.push({ key: "ICO", value: that.ico });
                                    scheduledParams.push({ key: "IXP_DEN", value: that.ixpDen });
                                    scheduledParams.push({ key: "LIC", value: that.lic });
                                    scheduledParams.push({ key: "ROK", value: that.rok });
                                    Gordic.Async.GTaskManager.start("Gordic.Eko.Server.GOdeslatMultipleReportsAsyncTask", {
                                        Platnost: this.rok.toString() + (this.mesic?.toString() ?? ""),
                                        ReportId: reportDto?.reportId,
                                        Parameters: paramsForAsync,
                                        ScheduledParams: scheduledParams
                                        //Ikc: "0" //TODO - vcech - change later 
                                    });
                                    return data;
                                });
                                //def.resolve(data);
                                //return def.promise();
                            }
                        },
                        lastStep: {
                            // fáze 2 - zobrazení­ výsledek vymáhání
                            title: "Vybrané doklady",
                            gridTabTitle: "Vybrané záznamy", // popisek nad gridem
                            form: form,
                            modelData: () => {
                                return {};
                            }
                        },
                        completeDelegate: () => { },
                        cancelDelegate: () => { }
                    }).createDialogPromise();
                }
                //#endregion
                /** Otevře detail vymáhání */
                otevreniDetailu(ixp_nvy, typ_phl) {
                    var that = this;
                    that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                        ID: "DDPGDetailVymahani#",
                        ixpNvy: ixp_nvy
                    });
                }
                //#region Akce na gridu
                /**
                * Kontrola metadat vybraných soupisek
                *
                * @returns {JQuery.Promise<any>} promise s operací
                */
                kontrolaMetadat() {
                    let that = this;
                    const zaznamy = that.gridVymahani
                        .ggrid("getSelection")
                        .map((row) => ({
                        ixp_ddp: row.ixp_ddp,
                        typ_phl: row.typ_phl
                    }));
                    if (zaznamy !== null && zaznamy.length > 0) {
                        // Call the component
                        return Gordic.Eko.Utils.KontrolaMetadat({
                            content: that,
                            listIxp: zaznamy.map((z) => z.ixp_ddp), // Extract only ixp for this parameter
                            detailAkce: (_cnt, ixp_ddp) => {
                                const item = zaznamy.find((z) => z.ixp_ddp === ixp_ddp); // Find the matching item
                                return item ? that.otevreniDetailu(ixp_ddp, item.typ_phl) : undefined;
                            }
                        });
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /** Hromadné ověření poplatníků na ISZR */
                hromadneOvereniISZR() {
                    var that = this;
                    var selection = that.gridVymahani.ggrid("getSelection");
                    that.beginOperation({ id: "inicializaceHromOvereniISZR", text: "Probíhá příprava případů pro ověření ISZR..." });
                    that.isl.HromadneOvereni.inicializaceHromOvereniISZR().get().done((poradiHro) => {
                        that.endOperation({ id: "inicializaceHromOvereniISZR" });
                        var dto = selection.map((item) => ({
                            ixs_esu: item.ixs_esu
                        }));
                        // Založení požadavku pro hromadné ověření ISZR
                        that.isl.HromadneOvereni.zalozPozadavekHromOvereniISZR({ rq: { RequestData: dto }, poradiHro: poradiHro }).get()
                            .done(() => {
                            // Po založení požadavku přesměrování na stránku s hromadným ověřením
                            that.navigate("Gordic.Ddp.WebClient.GHromadneOvereni", { poradiHro: poradiHro });
                        });
                    });
                }
                /** Hromadné ověření dotčených subjektů na ISZR */
                hromadneOvereniDotSubjISZR() {
                    var that = this;
                    var selection = that.gridVymahani.ggrid("getSelection");
                    if (selection.length != 0) {
                        var pripady = selection.map((item) => ({
                            ixp: item.ixp_nvy
                        }));
                        //var pripady: any = [];
                        //var i = 0;
                        //selection.forEach((item: any) => {
                        //    pripady[i].ixp = item.ixp_nvy;
                        //    i++;
                        //})
                        that.beginOperation({ id: "inicializaceHromOvereniISZR", text: "Probíhá příprava případů pro ověření ISZR..." });
                        that.isl.HromadneOvereni.inicializaceHromOvereniISZR().get().done((poradiHro) => {
                            that.endOperation({ id: "inicializaceHromOvereniISZR" });
                            var dto = {};
                            that.isl.HromadneOvereni.listDotceneSubjekty({ pripady: pripady }).get()
                                .done((result) => {
                                // dotčené subjekty na případech
                                dto = result.data;
                                // Založení požadavku pro hromadné ověření ISZR
                                that.isl.HromadneOvereni.zalozPozadavekHromOvereniISZR({ rq: { RequestData: dto }, poradiHro: poradiHro }).get()
                                    .done(() => {
                                    // Po založení požadavku přesměrování na stránku s hromadným ověřením
                                    that.navigate("Gordic.Ddp.WebClient.GHromadneOvereni", { poradiHro: poradiHro });
                                });
                            });
                        });
                    }
                }
                /**
                 * Nastavení příznaku tisku, pokud je hodnota 'priznak' 1, tak se nastaví a pokud je 0, tak se ruší
                 * @param priznak
                 */
                nastaveniPriznakuTisku(priznak) {
                    var that = this;
                    var selection = that.gridVymahani.ggrid("getSelection");
                    if (selection.length == 0)
                        return;
                    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDuvod", { ID: "DDPGDuvod#", }, "Důvod změny příznaku vytištění", 450, 320)
                        .on("close", (_obj, retVal) => {
                        var nazev;
                        if (priznak == 1) {
                            nazev = "nastavit";
                        }
                        else {
                            nazev = "zrušit";
                        }
                        if (retVal != null) {
                            var duvod = retVal.duvod;
                            that.dialogs.confirm("Upozornění", // Titulek okna
                            `Opravdu chcete ${nazev} příznak vytištění vymáhácího dokumentu u vybraných vymáhání? \n` +
                                `Důvod: ${duvod}`)
                                .on("close", (ev, retVal) => {
                                if (retVal === "yes") {
                                    that.TaskStartNastaveniPrizTisk(selection, duvod, priznak);
                                }
                            });
                        }
                        else {
                            that.showFlash(`Není možné ${nazev} příznak vytištění, nebyl zadán důvod!`, "warning");
                        }
                    });
                }
                // Obsluha async tasku 'Nastavení příznaku tisku'
                TaskStartNastaveniPrizTisk(data, duvod, priznak) {
                    var cnt = $.content();
                    var asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpNastaveniPriznakuTiskuAsyncTask";
                    let parametry = {
                        pripadyVym: data,
                        duvod: duvod,
                        priznak: priznak
                    };
                    let opt = { autoClean: true, clearOnFinish: true };
                    cnt.notification("remove", "vysledekNastaveniPrizTiskTask");
                    cnt.notification("add", // pošlu notifikaci
                    {
                        id: "nastaveniPrizTiskTask",
                        title: "Nastavení příznaku tisku",
                        content: "Probíhá asynchronní akce",
                        icon: "fa-arrow-right  g-state-text g-state-info",
                        dateTime: new Date(),
                    });
                    Gordic.Async.GTaskManager.start(asyncClassName, parametry, opt); // a spustím
                }
                /**
                 * Nastavení příznaku tisku, pokud je hodnota 'priznak' 1, tak se nastaví a pokud je 0, tak se ruší
                 * @param priznak
                 */
                nastaveniPriznakuOdeslani(priznak) {
                    var that = this;
                    var selection = that.gridVymahani.ggrid("getSelection");
                    if (selection.length == 0)
                        return;
                    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDuvod", { ID: "DDPGDuvod#", }, "Důvod změny příznaku odeslání", 450, 320)
                        .on("close", (_obj, retVal) => {
                        var nazev;
                        if (priznak == 1) {
                            nazev = "nastavit";
                        }
                        else {
                            nazev = "zrušit";
                        }
                        if (retVal != null) {
                            var duvod = retVal.duvod;
                            that.dialogs.confirm("Upozornění", // Titulek okna
                            `Opravdu chcete ${nazev} příznak odeslání vymáhácího dokumentu u vybraných vymáhání? \n` +
                                `Důvod: ${duvod}`)
                                .on("close", (ev, retVal) => {
                                if (retVal === "yes") {
                                    that.TaskStartNastaveniPrizOdesl(selection, duvod, priznak);
                                }
                            });
                        }
                        else {
                            that.showFlash(`Není možné ${nazev} příznak odeslání, nebyl zadán důvod!`, "warning");
                        }
                    });
                }
                // Obsluha async tasku 'Nastavení příznaku tisku'
                TaskStartNastaveniPrizOdesl(data, duvod, priznak) {
                    var cnt = $.content();
                    var asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpNastaveniPriznakuOdeslaniAsyncTask";
                    let parametry = {
                        pripadyVym: data,
                        duvod: duvod,
                        priznak: priznak
                    };
                    let opt = { autoClean: true, clearOnFinish: true };
                    cnt.notification("remove", "vysledekNastaveniPrizOdeslTask");
                    cnt.notification("remove", "nastaveniPrizOdeslTask");
                    cnt.notification("add", // pošlu notifikaci
                    {
                        id: "nastaveniPrizOdeslTask",
                        title: "Nastavení příznaku odeslání",
                        content: "Probíhá asynchronní akce",
                        icon: "fa-arrow-right  g-state-text g-state-info",
                        dateTime: new Date(),
                    });
                    Gordic.Async.GTaskManager.start(asyncClassName, parametry, opt); // a spustím
                }
                /**
                * Obnovení vybraných případů vymáhání
                * @param priznak
                */
                obnoveni() {
                    var that = this;
                    var selection = that.gridVymahani.ggrid("getSelection");
                    if (selection.length == 0)
                        return;
                    var prekrytiDef = $.Deferred();
                    that.beginOperation({ id: "kontrolaPrekryvaniObnoveni", text: "Probíhá kontrola překrývání případů..." });
                    that.isl.VymahaniDDP.kontrolaPrekryvaniObnoveni({ dtos: selection }).get()
                        .done((result) => {
                        if (result == true) {
                            var message = "Některý z vybraných případů vymáhání se překrývá s jiným. \n" +
                                "Chcete opravdu pokračovat?";
                            that.dialogs.confirm("Překrytí vymáhání", message, 420, 210)
                                .on("close", (_ev, retVal) => {
                                if (retVal === "yes")
                                    prekrytiDef.resolve();
                                else
                                    prekrytiDef.reject();
                            });
                        }
                        else
                            prekrytiDef.resolve();
                    }).always(() => {
                        that.endOperation({ id: "kontrolaPrekryvaniObnoveni" });
                    });
                    prekrytiDef.done(() => {
                        that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDuvod", { ID: "DDPGDuvod#", }, "Důvod obnovení případů", 450, 320)
                            .on("close", (_obj, retVal) => {
                            if (retVal != null) {
                                var duvod = retVal.duvod;
                                that.TaskStartObnoveni(selection, duvod);
                            }
                            else {
                                that.showFlash(`Není možné obnovit případy, nebyl zadán důvod!`, "warning");
                            }
                        });
                    });
                }
                // Obsluha async tasku 'Obnovení'
                TaskStartObnoveni(data, duvod) {
                    var cnt = $.content();
                    var asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpObnoveniVymAsyncTask";
                    let parametry = {
                        pripadyVym: data,
                        duvod: duvod,
                        nazevAkce: "ObnoveniVym"
                    };
                    let opt = { autoClean: true, clearOnFinish: true };
                    var texty = WebClient.Common.Base.textyAkci("ObnoveniVym");
                    cnt.notification("remove", WebClient.Common.Base.vysledekId(texty.id));
                    cnt.notification("add", // pošlu notifikaci
                    {
                        id: texty.id,
                        title: texty.title,
                        content: texty.content,
                        icon: "fa-arrow-right  g-state-text g-state-info",
                        dateTime: new Date(),
                    });
                    Gordic.Async.GTaskManager.start(asyncClassName, parametry, opt); // a spustím
                }
                /**
                 * Převzetí vybraných případů vymáhání
                 * @returns
                 */
                prevzit() {
                    var that = this;
                    if (!that.gridVymahani)
                        return;
                    const selection = that.gridVymahani.ggrid("getSelection");
                    // Ensure each selected item has ixp set to ixp_nvy
                    selection.forEach((item) => {
                        item.ixp = item.ixp_nvy;
                    });
                    var jeSpis = false;
                    var def = $.Deferred();
                    that.beginOperation({ id: "existujeVymahaniVeSpisu", text: "Probíhá kontrola případů ve spisu..." });
                    that.isl.Redistribuce.existujePripadVeSpisu({ spisDtos: selection })
                        .get()
                        .done((result) => {
                        def.resolve(result);
                    }).always(() => {
                        that.endOperation({ id: "existujeVymahaniVeSpisu" });
                    });
                    def.done((result) => {
                        result.forEach((item) => {
                            if (item.je_ve_spisu)
                                jeSpis = true;
                        });
                        if (jeSpis) {
                            that.dialogs.confirm("Převzít spis?", "Ve vybraných vymáháních jsou některé vymáhání vloženy do spisu. \n \n " +
                                "U těchto vymáhání bude převzat celý spis, chcete pokračovat?", 400, 200).on("close", (_ev, retVal) => {
                                if (retVal !== "yes")
                                    return; // pokud uživatel nechce předat celý spis, tak končíme
                                that.TaskStartRedistribuce(selection, 20, { priz_sekce: 1 });
                            });
                        }
                        else {
                            that.TaskStartRedistribuce(selection, 20, { priz_sekce: 1 });
                        }
                    });
                }
                ;
                //#endregion
                //#region Redistribuce - Předání / Přidělení / Převzetí
                /** Formulář pro předání/přidělení */
                formRedist() {
                    var that = this;
                    var form = new Gordic.Forms.Form({ name: "pripadForm", layoutDescriptor: "L1M1S1 L-2-8-2, M-2-8-2, S-12-12-0" })
                        .addSection()
                        .addRow({ label: "Zpracovatel", required: true })
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpGinsfun(), {
                        name: "ixs_fun",
                        model: "ixs_fun=ixs_fun",
                        serverFilters: {
                            typ_phl: that.typPhl,
                            aktivita: 100
                        },
                        change: (ev, obj) => {
                            if (that.actions.actTiskPredani) {
                                if (obj.value)
                                    that.actions.actTiskPredani.enabled(true);
                                else
                                    that.actions.actTiskPredani.enabled(false);
                            }
                        }
                    });
                    return form;
                }
                /** Wizard pro předání/přidělení */
                wizzardRedist(checkFunction, typRedist) {
                    var that = this;
                    var selection = that.gridVymahani.ggrid("getSelection");
                    // odstranit ze selection neaktivní případy
                    selection = selection.filter((item) => item.aktivita === 100);
                    // odstranit ze selection případy, kde ixs_fun_akt není shodné s ixsFun
                    selection = selection.filter((item) => item.ixs_fun_akt === that.ixsFun);
                    var def = $.Deferred();
                    var arrayIxp = [];
                    var arrayIxpSpis = [];
                    var data = [];
                    var veSpisu = [];
                    var jeSpis = false;
                    // přidáme ixp_nvy jako ixp, aby se to dalo použít v dalším zpracování
                    selection.forEach((item) => {
                        item.ixp = item.ixp_nvy;
                    });
                    that.beginOperation({ id: "existujeVymahaniVeSpisu", text: "Probíhá kontrola případů ve spisu..." });
                    that.isl.Redistribuce.existujePripadVeSpisu({ spisDtos: selection })
                        .get()
                        .done((result) => {
                        result.forEach((item) => {
                            arrayIxp.push({ ixp: item.ixp }); // přidáme ixp do pole pro další zpracování
                            if (item.je_ve_spisu) {
                                jeSpis = true;
                                arrayIxpSpis.push(item.ixp_spis);
                                veSpisu.push({ ixp: item.ixp_spis, je_spis: item.je_ve_spisu, ixp_nvy: item.ixp });
                            }
                            else {
                                arrayIxpSpis.push(item.ixp);
                                veSpisu.push({ ixp: item.ixp_spis, je_spis: item.je_ve_spisu });
                            }
                        });
                        that.endOperation({ id: "existujeVymahaniVeSpisu" });
                        if (jeSpis) {
                            that.dialogs.confirm("Předat spis?", "Ve vybraných vymáháních jsou některé vymáhání vloženy do spisu. \n \n " +
                                "U těchto vymáhání bude předán celý spis, chcete pokračovat?", 400, 200).on("close", (_ev, retVal) => {
                                if (retVal !== "yes") {
                                    def.reject(); // pokud uživatel nechce předat celý spis, tak končíme
                                    return;
                                }
                                that.beginOperation({ id: "wflspidProPredani", text: "Probíhá získání dat případů pro předání..." });
                                // získat data z wflspid
                                that.isl.Redistribuce.wflspidProPredani({ pripady: arrayIxpSpis }).get()
                                    .done((result) => {
                                    veSpisu.forEach((item) => {
                                        // Find the entry in result where ixp matches item.ixp and set je_spis
                                        const found = result.find((entry) => entry.ixp === item.ixp);
                                        if (found) {
                                            found.je_spis = item.je_spis;
                                        }
                                    });
                                    data = result;
                                    that.endOperation({ id: "wflspidProPredani" });
                                    def.resolve();
                                });
                            });
                        }
                        else { // máme jen případy co nejsou ve spisu
                            that.beginOperation({ id: "wflspidProPredani", text: "Probíhá získání dat případů pro předání..." });
                            // získat data z wflspid
                            that.isl.Redistribuce.wflspidProPredani({ pripady: arrayIxpSpis }).get()
                                .done((result) => {
                                data = result;
                                data.forEach((item) => {
                                    item.je_spis = false; // není ve spisu
                                });
                                that.endOperation({ id: "wflspidProPredani" });
                                def.resolve();
                            });
                        }
                    })
                        .fail(() => {
                        that.endOperation({ id: "existujeVymahaniVeSpisu" });
                        that.endOperation({ id: "wflspidProPredani" });
                        def.reject();
                    });
                    var title = "Předání"; // Převzetí
                    // get data from wflspid
                    def.promise().done(() => {
                        var form = that.formRedist();
                        var menuGrid;
                        menuGrid = [{ favorite: true, action: that.actions.actTiskPredani }];
                        that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                            title: title,
                            gridFormat: Gordic.Ddp.WebClient.Common.GridFormats.Predani(),
                            keys: "ixp_nvy, ixp_spis",
                            data: data,
                            indicatorType: "KPI",
                            firstStep: {
                                form: form,
                                gridTabTitle: "Vybrané případy", // titulek v tabu   
                                showIndicator: true,
                                nextActionName: "Proveď", // název pro tlačítko další
                                menuGridBar: menuGrid, // akce na tabu s gridem
                                checkAction: (model, data) => {
                                    var cis_spr;
                                    var gridSpravci = $('div[data-form="pripadForm"] .gform-field.ggrid');
                                    if (gridSpravci != null || gridSpravci != undefined) {
                                        var selection = gridSpravci.ggrid("getSelection");
                                        if (selection.length != 0) {
                                            cis_spr = selection[0].cis_spr;
                                            if (selection[0].flag == 1) {
                                                that.showFlash(`Vybraný správce již nebo ještě není platný, vyberte prosím jiného!`, "warning");
                                                def.reject();
                                                return def;
                                            }
                                        }
                                    }
                                    const modelDto = {
                                        ixs_fun: model.ixs_fun,
                                        cis_spr: cis_spr,
                                        typ_redistribuce: typRedist, // 0 - předání, 10 - přidělení
                                        priz_sekce: 1 // jedná se vymáhání
                                    };
                                    return checkFunction({ predaniDtos: data, model: modelDto }).get()
                                        .then((result) => {
                                        return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                    });
                                },
                                nextAction: (model, data) => {
                                    let def = $.Deferred();
                                    var cis_spr;
                                    var defConfirm = $.Deferred();
                                    if (!that.prizPrint) {
                                        var confirmTitle = "Předávací protokol";
                                        var confirmMessage = "Prozatím nebyl vytištěn předávací protokol. Přejete si pokračovat?";
                                        that.dialogs.confirm(confirmTitle, confirmMessage, 400, 200)
                                            .on("close", (_ev, retVal) => {
                                            if (retVal === "yes") {
                                                defConfirm.resolve();
                                            }
                                            else {
                                                defConfirm.reject();
                                                def.reject();
                                                return def;
                                            }
                                        });
                                    }
                                    else
                                        defConfirm.resolve();
                                    defConfirm.done(() => {
                                        var gridSpravci = $('div[data-form="pripadForm"] .gform-field.ggrid');
                                        if (gridSpravci != null || gridSpravci != undefined) {
                                            var selection = gridSpravci.ggrid("getSelection");
                                            if (selection.length != 0) {
                                                cis_spr = selection[0].cis_spr;
                                                if (selection[0].flag == 1) {
                                                    that.showFlash(`Vybraný správce již nebo ještě není platný, vyberte prosím jiného!`, "warning");
                                                    def.reject();
                                                    return def;
                                                }
                                            }
                                        }
                                        const modelDto = {
                                            ixs_fun: model.ixs_fun,
                                            cis_spr: cis_spr,
                                            typ_redistribuce: typRedist, // 0 - předání, 10 - přidělení
                                            typ_phl: that.typPhl,
                                            ixp_den: that.ixpDen,
                                            subrada: that.subrada,
                                            priz_sekce: 1 // jedná se vymáhání
                                        };
                                        that.TaskStartRedistribuce(arrayIxp, typRedist, modelDto);
                                        def.resolve([data]);
                                    });
                                    return def.promise();
                                }
                            },
                            lastStep: {
                                // fáze 2 - zobrazení­ výsledku storna
                                title: "Výsledek", //nazev kroku
                                gridTabTitle: "Aktualizované pří­pady", //popisek nad gridem
                                form: form,
                                modelData: () => {
                                    return {};
                                }
                            },
                            completeDelegate: () => {
                                that.ziskejData(that.filterData);
                            },
                            cancelDelegate: () => {
                            }
                        }).createDialogPromise();
                    });
                }
                /** Tisk předání */
                tiskPredani(cnt) {
                    const that = this;
                    var currentCnt = cnt.currentContent;
                    var ixsFunField = $(currentCnt).findFields("ixs_fun").gfield("getValue");
                    var ixsFun;
                    var ixsFunNazev;
                    if (ixsFunField != null && ixsFunField != undefined) {
                        ixsFun = ixsFunField.ixs_fun;
                        ixsFunNazev = ixsFunField.nazev_rf;
                    }
                    else {
                        that.showFlash("Není možné tisknout, není vybrán zpracovatel!", "error");
                        return;
                    }
                    const actTiskPredani = GAction.createPrintAction({
                        name: "actTiskPredani",
                        tema: "wfl_ptm_hromprd",
                        customDto: {
                            ixp_den: that.ixpDen,
                            rok_den: that.rokDen,
                            ixs_fun: ixsFun,
                            nazev: ixsFunNazev
                        },
                        // ↓ Metoda, která je zavolána těsně před generováním sestavy a kde lze na straně serveru ovlivnit parametry sestavy ↓
                        serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:TiskPredani", //zde se plní téma
                        reportFinished: function () {
                            that.prizPrint = true;
                        },
                        dialogClosed: function () {
                        }
                    });
                    actTiskPredani.run();
                }
                // Obsluha async tasku 'Redistribuce'
                TaskStartRedistribuce(data, priznak, model) {
                    var cnt = $.content();
                    var that = this;
                    var asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpRedistribuceAsyncTask";
                    var sessionUdaje = {
                        typ_phl: that.typPhl,
                        ixp_den: that.ixpDen
                    };
                    // příznak: 0 - předání, 10 - přidělení, 20 - převzetí
                    let parametry = {
                        predaniDtos: data, // předávané/přidělované případy
                        prevzetiDtos: data, // převzaté případy
                        priznak: priznak, // příznak redistribuce
                        modelRedist: model, // model pro předání/přidělení
                        sessionUdaje: sessionUdaje,
                        nazevAkce: "Redistribuce"
                    };
                    let opt = { autoClean: true, clearOnFinish: true };
                    var texty = WebClient.Common.Base.textyAkci("Redistribuce");
                    cnt.notification("remove", WebClient.Common.Base.vysledekId(texty.id));
                    cnt.notification("add", // pošlu notifikaci
                    {
                        id: texty.id,
                        title: texty.title,
                        content: texty.content,
                        icon: "fa-arrow-right  g-state-text g-state-info",
                        dateTime: new Date(),
                    });
                    Gordic.Async.GTaskManager.start(asyncClassName, parametry, opt); // a spustím
                }
                //#endregion
                //#region Hromadné akce na seznamu vymáhání
                // Obsluha async tasku 'vymáhat'
                TaskStartHromAkce(data, model, nazevAkce) {
                    var cnt = $.content();
                    var asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpHromadneAkceVymAsyncTask";
                    let parametry = {
                        pripadyVym: data,
                        modelVym: model,
                        nazevAkce: nazevAkce
                    };
                    let opt = { autoClean: true, clearOnFinish: true };
                    var texty = WebClient.Common.Base.textyAkci(nazevAkce);
                    var vysledekID = WebClient.Common.Base.vysledekId(texty.id);
                    cnt.notification("remove", vysledekID);
                    cnt.notification("add", // pošlu notifikaci
                    {
                        id: texty.id,
                        title: texty.title,
                        content: texty.content,
                        icon: "fa-arrow-right  g-state-text g-state-info",
                        dateTime: new Date(),
                    });
                    Gordic.Async.GTaskManager.start(asyncClassName, parametry, opt); // a spustím
                }
                //#region Formuláře
                formTerminovaKalkulacka() {
                    var that = this;
                    var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1 LMS-3-7-2" })
                        .addSection()
                        .addRow()
                        .addRow("Datum doručení")
                        .addField("gdatebox", {
                        name: "dat_doruc",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    })
                        .addSection("Nabytí právní")
                        .addRow("Lhůta pro odvolání")
                        .addField("gnumberbox", {
                        name: "dny_pm",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    })
                        .addRow("Datum nabytí právní")
                        .addField("gdatebox", {
                        name: "dat_pm",
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    })
                        .addRow()
                        .addField("gcheck", "w-6", {
                        name: "pm_posun",
                        label: "Od následujícího dne po doručení",
                        initialValue: true,
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    })
                        .addRow()
                        .addField("gradio", {
                        name: "pm_dny",
                        itemClass: "w-6",
                        emptyValue: 0,
                        radios: [
                            { value: 0, label: 'Kalendářní dny' }, //pm_kal
                            { value: 1, label: 'Pracovní dny' }, //pm_prac
                        ],
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    })
                        .addRow("Posun posledního dne lhůty")
                        .addField("gselectbox", {
                        name: "posun_vyp_pm",
                        dropdown: true,
                        model: "model.posun_vyp_pm=value.id",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        itemTemplate: "{popis}",
                        initialValue: { id: 0, popis: "Posun posledního dne lhůty na poslední nepracovní den" },
                        data: [
                            { id: 0, popis: "Posun posledního dne lhůty na poslední nepracovní den" },
                            { id: 1, popis: "Neposouvat" },
                            { id: 2, popis: "Posun posledního dne lhůty na pracovní den" }
                        ],
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    })
                        .addSection("Vykonatelnost")
                        .addRow("Lhůta pro zaplacení")
                        .addField("gnumberbox", {
                        name: "dny_vyk",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    })
                        .addRow("Datum nabytí právní moci")
                        .addField("gdatebox", {
                        name: "dat_vyk",
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    })
                        .addRow()
                        .addField("gcheck", "w-6", {
                        name: "vyk_posun",
                        label: "Od následujícího dne pro nabytí moci",
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    })
                        .addRow()
                        .addField("gradio", {
                        name: "vyk_dny",
                        itemClass: "w-6",
                        emptyValue: 0,
                        radios: [
                            { value: 0, label: 'Kalendářní dny' }, // vyk_kal
                            { value: 1, label: 'Pracovní dny' }, // vyk_prac
                        ],
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    })
                        .addRow("Posun posledního dne lhůty")
                        .addField("gselectbox", {
                        name: "posun_vyp_vyk",
                        dropdown: true,
                        model: "model.posun_vyp_vyk=value.id",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        itemTemplate: "{popis}",
                        initialValue: { id: 0, popis: "Posun posledního dne lhůty na poslední nepracovní den" },
                        data: [
                            { id: 0, popis: "Posun posledního dne lhůty na poslední nepracovní den" },
                            { id: 1, popis: "Neposouvat" },
                            { id: 2, popis: "Posun posledního dne lhůty na pracovní den" }
                        ],
                        change: () => {
                            if (that.kalkFirstTime)
                                return;
                            that.terminovaKalkulackaCalc();
                        }
                    });
                    return form;
                }
                formTerminovaKalkulackaValues() {
                    var that = this;
                    // Inicializace proměnných
                    var d_datum_doruceni = new Date();
                    var dnyPm;
                    var dnyVk;
                    var def = $.Deferred();
                    that.beginOperation({ id: "lhuty", text: "Získání dat termínové kalkulačky" });
                    that.isl.VymahaniDDP.vratLhuty({ ixsSkv: that.NullSkv, stavVym: 0, stavVymOld: 0 })
                        .get().done((result) => {
                        dnyPm = result.dny_pm;
                        dnyVk = result.dny_vk;
                        def.resolve();
                    }).always(() => {
                        that.endOperation({ id: "lhuty" });
                    });
                    def.done(() => {
                        var modelData = {};
                        modelData.dat_doruc = d_datum_doruceni;
                        modelData.dny_pm = dnyPm;
                        modelData.dny_vyk = dnyVk;
                        var form = $.content().findForms("wizParams");
                        form.findFields().gfield("model", "apply", modelData);
                        if (that.kalkFirstTime)
                            that.kalkFirstTime = false;
                        that.terminovaKalkulackaCalc();
                    });
                }
                formStavDoruc() {
                    var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1 LMS-3-7-2" })
                        .addRow("Stav doručení")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpcsdo(), {
                        name: "stav_doruc",
                        model: "model.stav_doruc=value.stav_doruc, model.stav_doruc_txt=value.stav_doruc_txt",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                    });
                    return form;
                }
                formDotcenyDok() {
                    var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1 LMS-3-7-2" })
                        .addRow("Identifikátor")
                        .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required(), new Gordic.Validators.Ixs()],
                    })
                        .addRow("Typ vazby")
                        .addField("gselectbox", Gordic.Prefabs.Select.wflcvpp(), {
                        name: "typ_vazby",
                        model: "model.typ_vazby=value.typ_vpp",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Poznámka")
                        .addField("gstringbox", {
                        name: "poznamka"
                    })
                        .addField("gcheck", "w-6", {
                        name: "prim",
                        label: "Zdrojový doklad"
                    });
                    return form;
                }
                formDotcenySub() {
                    var that = this;
                    var date = that.getCurrentDateAsString();
                    var time = that.getCurrentTimeAsString();
                    var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1 LMS-3-7-2" })
                        .addRow("Subjekt")
                        .addField("gselectbox", "w-12", {
                        name: "ixs_esu",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        model: "ixs_esu=ixs_esu;esu_dic=dic;lic=value.lic;por_zast=value.por_zast",
                        change: (ev, obj) => {
                            if (obj.value.num_zast > 0) { //pokud má případ zástupce, umožnit výběr zástupce
                                $(ev.currentTarget).findFields('por_zast_check').gfield("enable");
                                var filter = { ixs_esu: obj.value.ixs_esu };
                                that.isl.HromadneAkcePripad.ziskejZastupce(() => {
                                    return { filters: filter };
                                }).get().done(function (dto) {
                                    var view = new Gordic.Data.View(dto.data);
                                    that.gridZastupci = $(ev.currentTarget).find("[data-help-context='list:gridZastupci']").ggrid();
                                    $(ev.currentTarget).find("[data-help-context='list:gridZastupci']").ggrid("setData", view);
                                });
                            }
                            else {
                                $(ev.currentTarget).findFields('por_zast_check').gfield("disable");
                            }
                        }
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu   
                        Logovani: {
                            Ixp: "0000X0000003", // zadání logovacích údaju je nutnost hlavně IXP
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
                            AktZnacka: "",
                            DuvodHledaniTxt: "Hromadné přidání dotčeného subjektu"
                        },
                    }))
                        .addRow("Typ vazby")
                        .addField("gselectbox", Gordic.Prefabs.Select.wflctyv(), {
                        name: "typ_vazby",
                        model: "model.typ_vazby=value.typ_vazby",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Druh vazby")
                        .addField("gselectbox", Gordic.Prefabs.Select.wflsdva(), {
                        name: "ixs_dva",
                        model: "model.ixs_dva=value.ixs_dva",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Poznámka").addField("gstringbox", {
                        name: "poznamka",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()],
                        initialValue: `Vazba vytvořena ${date} v ${time}`
                    })
                        .addRow("Důvod").addField("gstringbox", { name: "reason", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()] })
                        .addRow()
                        .addField("gcheck", {
                        name: "init_esu",
                        label: "Je iniciátorem"
                    })
                        .addField("gcheck", {
                        name: "vyriz_esu",
                        label: "Je cílem"
                    })
                        .addField("gcheck", {
                        name: "por_zast_check",
                        label: "Použít zástupce",
                        disabled: true
                    })
                        .addField("ggrid", {
                        name: "gridZastupci",
                        renderMode: "all-at-once", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "full", // fit, full
                        navigationMode: "row", // row, cell
                        showTopPanel: false,
                        showHeaderRow: true,
                        showBottomPanel: true,
                        columns: WebClient.Common.GridFormats.HrmAkceZastupcePripadu()
                    });
                    return form;
                }
                formDotcenySubZeSkup() {
                    var that = this;
                    var date = that.getCurrentDateAsString();
                    var time = that.getCurrentTimeAsString();
                    var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1 LMS-3-7-2" })
                        .addRow("Skupina DSU")
                        .addField("gselectbox", {
                        name: "HledatEsuVeSkupine",
                        itemTemplate: "{TextNameOfGroup} ({Text})",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()],
                        model: "model.group_name=value.TextNameOfGroup;model.text=value.Text;model.ixs_rzd=value.ixs_rzd",
                        selector: function () {
                            var field = $(this);
                            var mainDef = $.Deferred();
                            Gordic.Ssl.Dialogs.GVyberEsuSkupinyDlg($.content(field), null, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (retVal) {
                                if (Gordic.Utils.WidgetExists("gfield", field)) {
                                    if (retVal && retVal.selectedRow && retVal.selectedRow.TextNameOfGroup) {
                                        field.gfield("setValue", retVal.selectedRow, { valid: true });
                                    }
                                    field.gfield("focus");
                                }
                                mainDef.reject();
                            });
                            return mainDef.promise();
                        }
                    })
                        .addRow("Typ vazby")
                        .addField("gselectbox", Gordic.Prefabs.Select.wflctyv(), {
                        name: "typ_vazby",
                        model: "model.typ_vazby=value.typ_vazby",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Druh vazby")
                        .addField("gselectbox", Gordic.Prefabs.Select.wflsdva(), {
                        name: "ixs_dva",
                        model: "model.ixs_dva=value.ixs_dva",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                    })
                        .addRow("Poznámka").addField("gstringbox", {
                        name: "poznamka",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()],
                        initialValue: "Vazba vytvořena " + date + " v " + time
                    })
                        .addRow("Důvod").addField("gstringbox", { name: "reason", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()] });
                    return form;
                }
                //#endregion
                // Zavolání kalkulace datumů pro termínovou kalkulačku
                terminovaKalkulackaCalc() {
                    var that = this;
                    var modelData = {};
                    var form = $.content().findForms("wizParams");
                    var isFormValid = form.gform("isValid");
                    if (!isFormValid)
                        return;
                    form.findFields().gfield("model", "collect", modelData);
                    //
                    var currentElement = $(form);
                    $.content(currentElement).beginOperation({ id: "spoctiDatumy", text: "Probíhá výpočet termínů..." });
                    var dnyPm = modelData.dny_pm;
                    var dnyVyk = modelData.dny_vyk;
                    var datDoruc = modelData.dat_doruc;
                    modelData.posun_vyp_pm = modelData.posun_vyp_pm;
                    modelData.posun_vyp_vyk = modelData.posun_vyp_vyk;
                    // Datum vykonatelnosti a nabytí právní moci se bude počítat v DB
                    if (dnyPm != null && dnyVyk != null && datDoruc != null) {
                        that.isl.VymahaniDDP.vypocetDatTerminKalk({ data: modelData })
                            .get()
                            .done((result) => {
                            form.findFields("dat_pm").gfield("setInitial", result.dat_pm);
                            form.findFields("dat_vyk").gfield("setInitial", result.dat_vykon);
                        }).always(() => {
                            $.content(currentElement).endOperation({ id: "spoctiDatumy" });
                        });
                    }
                }
                //#endregion
                //#region Akce pro zobrazení detailu vymáhání
                openDetailVym() {
                    var that = this;
                    const row = that.gridVymahani?.ggrid("activeRow");
                    if (row != undefined) {
                        // GPC s knihou z aktuálního záznamu
                        const newGpc = (row ? Gordic.Eko.Utils.createBookGpc(that.gpc, row.ixp_den) : that.gpc);
                        // otevření detailu
                        that.navigate(["Gordic.Ddp.WebClient.GDetailVymahani", { gpc: newGpc, gridRemoteControl: new Gordic.Components.GridRC(that.gridVymahani) }], {
                            ID: "DDPGDetailVymahani#",
                            ixpNvy: row.ixp_nvy
                        });
                    }
                }
                //#endregion
                //#region pomocné funkce
                normalizeWhitespace(input) {
                    return input.trim().replace(/\s+/g, ' ');
                }
                getDateAsString(date) {
                    const day = date.getDate();
                    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
                    const year = date.getFullYear();
                    // Ensure leading zeros for day and month if necessary
                    const formattedDay = day < 10 ? '0' + day : day.toString();
                    const formattedMonth = month < 10 ? '0' + month : month.toString();
                    // Format the date as dd.mm.yyyy
                    const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;
                    return formattedDate;
                }
                /**
                 * Získání dneška jako string
                 * @returns {string}
                 */
                getCurrentDateAsString() {
                    const currentDate = new Date();
                    var formattedDate = this.getDateAsString(currentDate);
                    return formattedDate;
                }
                /**
                 * Získání aktuálního času jako string
                 * @returns {string}
                 */
                getCurrentTimeAsString() {
                    const currentDate = new Date();
                    const hours = currentDate.getHours();
                    const minutes = currentDate.getMinutes();
                    // Ensure leading zeros for hours and minutes if necessary
                    const formattedHours = hours < 10 ? '0' + hours : hours.toString();
                    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
                    // Format the time as hh.mm
                    const formattedTime = `${formattedHours}:${formattedMinutes}`;
                    return formattedTime;
                }
            };
            GVymahani = __decorate([
                Decorators.gcontent
            ], GVymahani);
            WebClient.GVymahani = GVymahani;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5bWFoYW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Z5bWFoYW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsd0VBQXdFO0FBQ3hFLElBQVUsTUFBTSxDQXVtSWY7QUF2bUlELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQXVtSW5CO0lBdm1JZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBdW1JN0I7UUF2bUlvQixXQUFBLFNBQVM7WUFDMUI7Ozs7O2VBS0c7WUFFSCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsT0FBQSxZQUFZO2dCQUEzQzs7b0JBK0JJLHdDQUF3QztvQkFDeEMsV0FBTSxHQUFrQixJQUFJLENBQUM7b0JBUzdCLDhEQUE4RDtvQkFDOUQsb0JBQWUsR0FBUSxFQUFFLENBQUM7b0JBQzFCLDBFQUEwRTtvQkFDMUUsNEJBQXVCLEdBQVEsRUFBRSxDQUFDO29CQUdsQyw0Q0FBNEM7b0JBQzVDLGlCQUFZLEdBQVEsRUFBRSxDQUFDO29CQUd2QixzREFBc0Q7b0JBQ3RELGNBQVMsR0FBWSxLQUFLLENBQUM7b0JBQzNCLGlFQUFpRTtvQkFDakUscUJBQWdCLEdBQVksS0FBSyxDQUFDO29CQTZCbEMsMENBQTBDO29CQUMxQyxjQUFTLEdBQVksS0FBSyxDQUFDO29CQUczQix3REFBd0Q7b0JBQ3hELGtCQUFhLEdBQVksSUFBSSxDQUFDO29CQXFnSTlCLFlBQVk7Z0JBQ2hCLENBQUM7Z0JBNS9IRyxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO29CQUU3QixJQUFJLENBQUMs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QWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN0RCxPQUFPLGFBQWEsQ0FBQztnQkFDekIsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNILHNCQUFzQjtvQkFDbEIsTUFBTSxXQUFXLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDckMsTUFBTSxLQUFLLEdBQVcsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM3QyxNQUFNLE9BQU8sR0FBVyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWpELDBEQUEwRDtvQkFDMUQsTUFBTSxjQUFjLEdBQVcsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUMzRSxNQUFNLGdCQUFnQixHQUFXLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFFbkYsMkJBQTJCO29CQUMzQixNQUFNLGFBQWEsR0FBVyxHQUFHLGNBQWMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO29CQUV0RSxPQUFPLGFBQWEsQ0FBQztnQkFDekIsQ0FBQzthQUVKLENBQUE7WUE5bElZLFNBQVM7Z0JBRHJCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsU0FBUyxDQThsSXJCO1lBOWxJWSxtQkFBUyxZQThsSXJCLENBQUE7UUFDTCxDQUFDLEVBdm1Jb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBdW1JN0I7SUFBRCxDQUFDLEVBdm1JZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdW1JbkI7QUFBRCxDQUFDLEVBdm1JUyxNQUFNLEtBQU4sTUFBTSxRQXVtSWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5bWFoYW5pLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFNlem5hbSB2eW3DoWjDoW7DrSBERFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMTEtMDUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbi8vVE9ETyAtPiBkZXRhaWwgLT4gaHJvbWFkbsOpIHptxJtueSAoYWt0LmRvdC5zdWJqIGEgdiB6w6Fsb8W+Y2UgXCJuw6FzdHJvamVcIilcclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogU2V6bmFtIHZ5bcOhaMOhbsOtXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgVm9qdMSbY2ggxIxlY2hcclxuICAgICAqIEBkYXRlIDA1LjExLjIwMjRcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnltYWhhbmkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKiDEjMOtc2xvIHR5cHUgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICB0eXBQaGw6IHN0cmluZ1xyXG4gICAgICAgIC8qKiBJxIxPICovXHJcbiAgICAgICAgaWNvOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIExpY2VuY2UgZGF0YWLDoXplICovXHJcbiAgICAgICAgbGljOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFJvayAqL1xyXG4gICAgICAgIHJvazogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBNxJtzw61jICovXHJcbiAgICAgICAgbWVzaWM6IHN0cmluZztcclxuICAgICAgICAvKiogS25paGEgKi9cclxuICAgICAgICBpeHBEZW46IHN0cmluZztcclxuICAgICAgICAvKiogUm9rIGtuaWh5ICovXHJcbiAgICAgICAgcm9rRGVuOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEFrdHXDoWxuw60gdcW+aXZhdGVsICovXHJcbiAgICAgICAgaXhzRnVuOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEFrdHXDoWxuw60gdcW+aXZhdGVsIC0gZGxlIHNrdXBpbnkgdnltw6Fow6Fuw60gKi9cclxuICAgICAgICBpeHNGdW5Qb2Q6IHN0cmluZztcclxuICAgICAgICAvKiogVHlwIGFnZWR5ICovXHJcbiAgICAgICAgdHlwQWc6IG51bWJlcjtcclxuICAgICAgICAvKiogWmRhIGpkZSBvIGRpbGNpVnlwb2NldCAqL1xyXG4gICAgICAgIGRpbGNpVnlwb2NldDogYm9vbGVhbjtcclxuICAgICAgICAvKiogVGFidWxrYSB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIGdyaWRWeW1haGFuaTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKiogUGFyYW1ldHIgemRhIHNlIGplZG7DoSBvIHpvYnJhemVuw60gc2V6bmFtdSB2eW3DoWjDoW7DrSBqZWRub2hvIHDFmcOtcGFkdSBuZWJvIHbFoWVjaCAoMSAtIG5hIHDFmcOtcGFkdSwgMCAtIHbFoWVjaCkqL1xyXG4gICAgICAgIFZ5bVByaXBhZHU6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIERUTyBvYnNhaHVqw61jw60gZGF0YSBwxZnDrXBhZHUsIHBva3VkIHNlIGplZG7DoSBvIHpvYnJhemVuw60gdnltw6Fow6Fuw60gbmEgcMWZw61wYWR1ICovXHJcbiAgICAgICAgRHRvUHJpcGFkdTogYW55O1xyXG4gICAgICAgIC8qKiBQYXJhbWV0ciB6ZGEgamUgdHlwIHBvaGxlZMOhdmt5IHBvdXplIHBybyDEh3RlbsOtICovXHJcbiAgICAgICAgcmV6aW1DdGVuaTogYW55O1xyXG4gICAgICAgIC8qKiBUeXAgYWxnb3JpdG11IG5hIHNrdXBpbsSbIHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgdHlwQWxnOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvKiogSmVkbsOhIHNlIG8gc3RyaWt0bsOtIHJlxb5pbSAqL1xyXG4gICAgICAgIHN0cmlrdG5pUmV6aW06IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIE51bMOhayBmdW5rY2UgKi9cclxuICAgICAgICBOdWxsRnVuOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIE51bMOhayBza3VwaW55ICovXHJcbiAgICAgICAgTnVsbFNrdjogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBBa2NlICd2eW3DoWjDoW7DrScgLSBNw6EgZGFsxaHDrSBwxZnDrXBhZHksIGNvIGx6ZSB2eW3DoWjDoXQgKi9cclxuICAgICAgICBtYVByaXBhZHk6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIFDFmcOtcGFkeSB2eW3DoWjDoW7DrSBjbyBzZSBib3Vkb3Ugdnltw6FoYXQgdiBha2NpICd2eW3DoWjDoW7DrScgKi9cclxuICAgICAgICBwcmlwYWR5VnltYWhhbmk6IGFueSA9IFtdO1xyXG4gICAgICAgIC8qKiBQxZnDrXBhZHksIGt0ZXLDqSBqc291IHZ5YnJhbsOpIHogb2tuYSBWeWJlclByaXBhZHUsIHDFmWkgYWtjaSAndnltw6Fow6Fuw60nKi9cclxuICAgICAgICBwcmlwYWR5VnltYWhhbmlOYXBvamVuZTogYW55ID0gW107XHJcbiAgICAgICAgLyoqIFN0b3BrYSB6ZGEgamUgbmHEjXRlbsOpIHpqacWhdMSbbsOtIHpkYSBtw6EgcMWZw61wYWQgZGFsxaHDrSBwxZnDrXBhZHUgKi9cclxuICAgICAgICBkZWZNYVByaXBhZHk6IGFueTtcclxuICAgICAgICAvKiogTW9kZWwgZG9rb27EjWVuw6lobyBnZW5lcm92w6Fuw60gdnltw6Fow6Fuw60gKi9cclxuICAgICAgICBtb2RlbERhdGFWeW06IGFueSA9IFtdO1xyXG4gICAgICAgIC8qKiBNb2RlbCBmb3JtdWzDocWZZSAnR1Z5YmVyUHJpcGFkdScgKi9cclxuICAgICAgICBtb2RlbEZvcm1WeWJlcjogYW55O1xyXG4gICAgICAgIC8qKiBQYXJhbWV0ciB6ZGEgc2UgamVkbsOhIG8gcmVmcmVzaCBha2NlICd2eW3DoWjDoW7DrScgKi9cclxuICAgICAgICBpc1JlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvKiogUGFyYW1ldHIgemRhIHNlIGplZG7DoSBvIHBydm7DrSBsb29wIHJlZnJlc2ggYWtjZSAndnltw6Fow6Fuw60nICovXHJcbiAgICAgICAgcmVmcmVzaEZpcnN0TG9vcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8qKiB2aWV3IHZ5bcOhaMOhbsOtKi9cclxuICAgICAgICBwcml2YXRlIHZpZXc6IHwgR29yZGljLklzbC5WaWV3PEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+IHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIC8qKiBQxZnDrXN0dXBvdsOpIHBhcmFtZXRyeSAqL1xyXG4gICAgICAgIHByaXZhdGUgcGFyYW1zOiBHb3JkaWMuRGRwLkludGVyZmFjZS5HRGRwUGFyYW1ldHJ5RHRvO1xyXG4gICAgICAgIC8qKiBGaWx0ciAqL1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyRGF0YTogYW55O1xyXG4gICAgICAgIC8qKiBKZSBnZW5lcmFjZSDEjcOtc2xhIGplZG5hY8OtaG8gYWt0aXZuw60gKi9cclxuICAgICAgICBpc0dlbkNqRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIEplIGdlbmVyYWNlIMSNw61zbGEgamVkbmFjw61obyB6YcWha3J0bMO9ICovXHJcbiAgICAgICAgaXNHZW5DakNoZWNrZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIFRleHQgdnLDoWNlbsO9IHBvIGluaXR1IEtuaWh5IGEgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICBJbml0RXJyb3JUZXh0OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKiBKZWRuw6Egc2UgbyBha2NpICd2eW3DoWhhdCBkw6FsZScgKi9cclxuICAgICAgICB2eW1haGF0RGFsZTogYm9vbGVhbjtcclxuICAgICAgICAvKiogSG9kbm90eSBrb250cm9seSAqL1xyXG4gICAgICAgIG5lbWFfcG9sb3preTogYm9vbGVhbjtcclxuICAgICAgICBuZXNvdWhsYXNpX3N1bWE6IGJvb2xlYW47XHJcbiAgICAgICAgbmVtYV9wcmVkcGlzOiBib29sZWFuO1xyXG4gICAgICAgIGRzdV96ZW1yZWw6IGJvb2xlYW47XHJcbiAgICAgICAgbmVtYV9kc3U6IGJvb2xlYW47ICAgXHJcbiAgICAgICAgLyoqIFN1YsWZYWRhICovXHJcbiAgICAgICAgc3VicmFkYTogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBpc3pyLCBwb3ZvbGVuw60gcMWZw61zdHVwdSAqL1xyXG4gICAgICAgIGlzenI6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIEVrb05rcyAgKi9cclxuICAgICAgICBjdkVrb05rczogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsgc3Byw6F2Y2UgKi9cclxuICAgICAgICBwcml6U3ByOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFDFmcOtem5hayB0aXNrdSBwxZllZMOhdmFjw61obyBwcm90b2tvbHUgKi9cclxuICAgICAgICBwcml6UHJpbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvKiogcGFyYW10ZXRyIFgwMDA5IHBybyB0aXNrICovXHJcbiAgICAgICAgWDAwMDk6IHN0cmluZztcclxuICAgICAgICAvKiogUMWZw616bmFrLCB6ZGEgc2UgamVkbsOhIG8gcHJ2bsOtIHNwdcWhdMSbbsOtIGthbGt1bGHEjWt5ICovXHJcbiAgICAgICAga2Fsa0ZpcnN0VGltZTogYm9vbGVhbiA9IHRydWU7IFxyXG4gICAgICAgIC8qKiBHcmlkIHrDoXN0dXBjxa8gRFNVIFxyXG4gICAgICAgICogQHR5cGUge0pRdWVyeTw+fVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkWmFzdHVwY2k6IEpRdWVyeTtcclxuXHJcblxyXG4gICAgICAgIC8qKiB1dGlsaXRhIHBybyBuw6FobGVkIG5hIGJvxI1uw60gc3RyYW7EmyBva25hICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gXCJWeW3DoWjDoW7DrVwiO1xyXG4gICAgICAgICAgICB0aGF0LnRhc2tJZCA9IFwiYWN0R1Z5bWFoYW5pXCI7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVNZW51KCk7XHJcbiAgICAgICAgICAgIHRoYXQudnltYWhhbmlQcmlwYWR1KCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRmlsdGVyKCk7XHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZFZ5bWFoYW5pID0gdGhhdC5jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgICAgIHRoYXQucmV6aW1DdGVuaVBvdm9sZW5pKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlUHJldmlldygpOyAvLyB2eXR2b8WZZW7DrSBuw6FobGVkdSBuYSBib8SNbsOtIHN0cmFuxJsgb2tuYVxyXG5cclxuICAgICAgICAgICAgRGRwLldlYkNsaWVudC5Db21tb24uQmFzZS5EZHBFa29Jbml0KHRoYXQsIHRoYXQuSW5pdEVycm9yVGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVByZXZpZXcoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyID0gbmV3IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJldmlld3MuZ2V0RGVmYXVsdFByZXZpZXdUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld0lkOiBcImRkcDpWeW1haGFuaVByZXZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmV6aW1DdGVuaVBvdm9sZW5pKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LnJlemltQ3RlbmkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LlZ5bVByaXBhZHUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UG9kYW5pPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIHBvbG/FvmVrIHYgbWVudWJhcnUqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWVudTogTWVudVBhcmFtc1tdID0gW107ICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIG1lbnUucHVzaChcclxuICAgICAgICAgICAgICAgIC8veyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RUZXN0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQcmlwYWRERFAsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEtvbnRyb2xhLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RTdG9ybm8sIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFRpc2ssIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFNwaXMsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T2Rlc2xhdE5vdmVaYXMsIGZhdm9yaXRlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPZGVzbGF0UHJpcFphcywgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEdlbmVyb3ZhdEVsRG9rLCBmYXZvcml0ZTogZmFsc2UgfVxyXG4gICAgICAgICAgICApIFxyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuVnltUHJpcGFkdSkge1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UG9kYW5pLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VnltYWhhbmksIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lbnUucHVzaChcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VnltYWhhdERhbGUsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEFrdHVhbGl6YWNlRFNVLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkhyb21hZG7DqSB6bcSbbnlcIixcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiB0aGF0LmNyZWF0ZUNoaWxkcmVuSHJvbWFkbmVPcGVyYWNlKClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIobWVudSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHBvbG/Fvmt5IHYgbWVudWJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHR5cEFnU3BpcyA9IHRoYXQudHlwQWdcclxuICAgICAgICAgICAgaWYgKHRoYXQucGFyYW1zLmRkcF9zc2xfZ2Vuc3NsID09IDEpIHR5cEFnU3BpcyA9IDIwXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGQoV2ZsLlByZUFjdGlvbnMuT3RldnJpRGV0YWlsRG9rdW1lbnR1U3Bpc3Uoe1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhOiAoX2FjdGlvbjogR0FjdGlvbiwgX2V2ZW50PywgY3R4PzogYW55LCBfcGFyYW0/OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIERldGFpbER0bzogeyBpeHA6IGN0eC5peHAvKml4cCovIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBadmVyZWpuZW5pSW5wdXREdG86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IGN0eC5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3VycmVudERhdGFSb3daczogY3R4LnJvd0R0byxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBBZzogdHlwQWdTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTmFkUm93OiB2b2lkIDAsIC8vcG91emUgdSAxMC1QxZlpZGF0IHDFmcOtbG9odTsgMjAtT2RlYnJhdCBwxZnDrWxvaHU7IDMwLVN0b3JubyB6dmXFmWVqbsSbbsOtOyA0MC1TdGFobm91dCB6dmXFmWVqbsSbbsOtOyA1MC1Ba3R1YWxpem92YXQgYSB2eXXFvml0w6kgcG91emUgUHJlZFVsb3plbmltXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3BlcmFjZTogY3R4Lm9wZXJhY2UsIC8vMC1EZXRhaWwsUG9kw6Fuw607IDEwLVDFmWlkYXQgcMWZw61sb2h1OyAyMC1PZGVicmF0IHDFmcOtbG9odTsgMzAtU3Rvcm5vIHp2ZcWZZWpuxJtuw607IDQwLVN0YWhub3V0IHp2ZcWZZWpuxJtuw607IDUwLUFrdHVhbGl6b3ZhdCAtLS0gYXNpIG5lYnVkZSBwb3TFmWViYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByaXN0dXBLZVNjaHZhbGl0OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByaXN0dXBLZVp2ZXJlam5pdDogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkb25lOiAocmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsPy5jcmVhdGVEaWFsb2dQcm9taXNlKCkudGhlbigoY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbG9hZCBwb2t1ZCBkb8WhbG8ga2Ugem3Em27Em1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4Py5uYURldGFpbHVEb3Nsb0tlWm1lbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0LmZpbHRlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpXHJcblxyXG4gICAgICAgICAgICB2YXIgamVBa3Rpdm5pVnltYWhhbmlQcmVzU1NMID0gKE51bWJlcih0aGF0LnBhcmFtcy5kZHBfZ2VuX3NzbHNwaSA/PyAwKSA+IDAgfHwgTnVtYmVyKHRoYXQucGFyYW1zLmRkcF9zc2xfamVkc3BpID8/IDApID4gMCkgJiYgTnVtYmVyKHRoYXQucGFyYW1zLmRkcF9nZW5fc3NsemFrID8/IDApID4gMDtcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdFRlc3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUZXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVEVTVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgdGVzdCA9IEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuZ2V0QWxsVGFza3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UHJpcGFkRERQOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UHJpcGFkRERQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZw61wYWQgRERQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWm9icmF6ZW7DrSBkZXRhaWx1IHDFmcOtcGFkdSBERFBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5wYXJhbXMuZGRwX3Jlel96amVkbm8gPT09IDMgPyBmYWxzZSA6IHRydWUsIC8vIFRPRE8gLSBmdW5ndWplIHRvaGxlIGtkecW+IGplIHRvIGRlZmF1bHRBY3Rpb24/IChhIGplIHRvIHBvdMWZZWJhPyBqZWxpa2/FviBzZSB0YW0gZG9zdGFudSBwb3V6ZSBwxZlleiBwxZnDrXBhZCA6RClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoX2V2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWREdG8gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5jZWxsSW5mby5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLlByaXBhZHkub3BlblByaXBhZERldGFpbCh0aGlzLCByb3cuaXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0S29udHJvbGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RLb250cm9sYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvbnRyb2xhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiTmFzdGF2ZW7DrSBrb250cm9sbsOtaG8gY2hvZHUgdnltw6FoYW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HS29udHJvbG5pQ2hvZFZ5bVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR0tvbnRyb2xuaUNob2RWeW0jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVtYV9wb2xvemt5OiB0aGF0Lm5lbWFfcG9sb3preSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXNvdWhsYXNpX3N1bWE6IHRoYXQubmVzb3VobGFzaV9zdW1hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lbWFfcHJlZHBpczogdGhhdC5uZW1hX3ByZWRwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHN1X3plbXJlbDogdGhhdC5kc3VfemVtcmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lbWFfZHN1OiB0aGF0Lm5lbWFfZHN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBcIk5hc3RhdmVuw60ga29udHJvbG7DrWhvIGNob2R1IHZ5bcOhaMOhbsOtXCIsIDczNSwgMzU1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChfZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmVtYV9wb2xvemt5ID0gcmV0VmFsLm5lbWFfcG9sb3preTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmVzb3VobGFzaV9zdW1hID0gcmV0VmFsLm5lc291aGxhc2lfc3VtYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmVtYV9wcmVkcGlzID0gcmV0VmFsLm5lbWFfcHJlZHBpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZHN1X3plbXJlbCA9IHJldFZhbC5kc3VfemVtcmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uZW1hX2RzdSA9IHJldFZhbC5uZW1hX2RzdTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5uZW1hX3BvbG96a3kgfHwgdGhhdC5uZXNvdWhsYXNpX3N1bWEgfHwgdGhhdC5uZW1hX3ByZWRwaXMgfHwgdGhhdC5kc3VfemVtcmVsIHx8IHRoYXQubmVtYV9kc3UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJEYXRhLm5lbWFfcG9sb3preSA9IHRoYXQubmVtYV9wb2xvemt5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyRGF0YS5uZXNvdWhsYXNpX3N1bWEgPSB0aGF0Lm5lc291aGxhc2lfc3VtYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckRhdGEubmVtYV9wcmVkcGlzID0gdGhhdC5uZW1hX3ByZWRwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJEYXRhLmRzdV96ZW1yZWwgPSB0aGF0LmRzdV96ZW1yZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJEYXRhLm5lbWFfZHN1ID0gdGhhdC5uZW1hX2RzdTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHRoYXQuZmlsdGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U3Rvcm5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWnJ1xaFlbsOtIHbFoWVjaCBha3Rpdm7DrWNoIGEgdnlicmFuw71jaCBwxZnDrXBhZMWvIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56cnVzZW5pVnltYWhhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0R3JpZFZ5Y2hvemlBa2NlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFZ5Y2hvemlBa2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKF9ldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3c6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5jZWxsSW5mby5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGV0YWlsVnltYWhhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR0RldGFpbFZ5bWFoYW5pI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwTnZ5OiByb3cuaXhwX252eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VGlzazoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVGlzayB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlza1Z5bWFoYW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFNwaXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkRldGFpbCBzcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBqZUFrdGl2bmlWeW1haGFuaVByZXNTU0wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gdGhhdC5ncmlkVnltYWhhbmk/LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5wcml6X3NwaXMgPSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zW0dvcmRpYy5XZmwuUHJlQWN0aW9ucy5OYW1lcy5PdGV2cmlEZXRhaWxEb2t1bWVudHVTcGlzdV0/LnJ1bih7IGl4cDogcm93Lml4cF9zcGlzLCBvcGVyYWNlOiAwLCByb3dEdG86IHJvdyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIlNwaXNcIiwgYFDFmcOtcGFkICR7cm93Lml4cF9udnl9IG5lbsOtIHZsb8W+ZW4gZG8gc3Bpc3UhYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk90ZXbFmWVuw60gZGV0YWlsdSB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3BlbkRldGFpbFZ5bSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3REZXRhaWxJeHA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxJeHBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPdGV2xZllbsOtIGRldGFpbHUgdnltw6Fow6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3c6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRHRvID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGV0YWlsVnltYWhhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdEZXRhaWxWeW1haGFuaSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwTnZ5OiByb3cuaXhwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RQb2Rhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQb2RhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb2TDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubm92ZVZ5bWFoYW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdEFrdHVhbGl6YWNlRFNVOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0QWt0dWFsaXphY2VEU1VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBa3R1YWxpemFjZSBEU1VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJIcm9tYWRuw6EgYWt0dWFsaXphY2UgZG90xI1lbsO9Y2ggc3ViamVrdMWvIG5hIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha3R1YWxpemFjZURTVSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RWeW1haGFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnltw6FoYXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJWeW3DoWjDoW7DrSBuYSBwxZnDrXBhZHUgRERQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuaXhzRnVuICE9IHRoYXQuRHRvUHJpcGFkdS5peHNfZnVuX2FrdCAmJiB0aGF0LnBhcmFtcy5kZHBfcmFkX252eWNpZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZW3DoXRlIG9wcsOhdm7Em27DrSBrIHZ5bcOhaMOhbsOtIG5hIHRvbXRvIHDFmcOtcGFkdS5cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52eW1haGFuaSh7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFZ5bWFoYXREYWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VnltYWhhdERhbGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeW3DoWhhdCBkw6FsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlBva3JhxI1vdsOhbsOtIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gdGhhdC5ncmlkVnltYWhhbmk/LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5peHNGdW4gIT0gcm93Lml4c19mdW5fYWt0ICYmIHRoYXQucGFyYW1zLmRkcF9yYWRfbnZ5Y2lkICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZW3DoXRlIG9wcsOhdm7Em27DrSBrIHZ5bcOhaMOhbsOtIG5hIHRvbXRvIHDFmcOtcGFkdS5cIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwiQ2hjZXRlIG9wcmF2ZHUgcG9rcmHEjW92YXQgdmUgdnltw6Fow6Fuw60gdnlicmFuw6lobyBwxZnDrXBhZHUgZGFsxaHDrW0ga3Jva2VtIHZ5bcOhaMOhbsOtPyBcXG4gXFxuIFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUG9rdWQgb2Rwb3bDrXRlIEFOTywgYnVkZSBwxZllZG5hc3RhdmVubyBuYXN0YXZlbsOtIHBhcmFtZXRyxa8gdnltw6Fow6Fuw60gZGxlIGFrdHXDoWxuxJsgdnlicmFuw6lobyBwxZnDrXBhZHUgdnltw6Fow6Fuw60uXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIlZ5bcOhaMOhbsOtIHDFmcOtcGFkdSBkYWzFocOtbSBrcm9rZW0gdnltw6Fow6Fuw61cIiwgbWVzc2FnZSwgNDIwLCAyMTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJ2eW1haGF0RGFsZVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBkYXQgcMWZZWRjaG96w61obyB2eW3DoWjDoW7DrS4uLlwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7IC8vIHN0b3BrYSB6ZGEgYnlseSB6w61za8OhbnkgZGF0YSBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgbmVuw60gdnlicsOhbiDFvsOhZG7DvSBwxZnDrXBhZCAoYWtjZSBqZSBzcHXFoXTEm25hIHplIHNlem5hbXUgdnltw6Fow6Fuw60pLCB0YWsgesOtc2vDoW1lIGRsZSDFmcOhZGt1IHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LkR0b1ByaXBhZHUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAuemFrbGFkbmlEYXRhUHJpcGFkdSh7IGl4cERkcDogcm93Lml4cF9kZHAgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuRHRvUHJpcGFkdSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAuZGF0YUV4aXN0dWppY2lob1Z5bWFoYW5pKHsgaXhwTnZ5OiByb3cuaXhwX252eSB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52eW1haGF0RGFsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidnltYWhhdERhbGVcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnltYWhhbmkocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0SGlzdG9yaWVWeW06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RIaXN0b3JpZVZ5bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkhpc3RvcmllIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiSGlzdG9yaWUgdnltw6Fow6Fuw60gbmEgcMWZw61wYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbnQgPSAkLmNvbnRlbnQoZXYudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSAkKGN0eC5ncmlkKS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmVobGVkVnltYWhhbmlcIiwgeyBJRDogJ0REUEdQcmVobGVkVnltYWhhbmkjJywgaXhwOiByb3cuaXhwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RWeWJlclByaXBhZHU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeWJlclByaXBhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw71ixJtyIHDFmcOtcGFkxa9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJWw71ixJtyIHDFmcOtcGFkxa8gcHJvIHZ5bcOhaMOhbsOtIGkgb3N0YXRuw61jaCBwxZnDrXBhZMWvIHBvcGxhdG7DrWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXhwRGRwID0gdGhhdC5EdG9QcmlwYWR1Lml4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHNFc3UgPSB0aGF0LkR0b1ByaXBhZHUuaXhzX2VzdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY250Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5YmVyUHJpcGFkdVwiLCB7IElEOiAnRERQR1Z5YmVyUHJpcGFkdSMnLCBpeHA6IGl4cERkcCwgaXhzRXN1OiBpeHNFc3UsIHByaXBhZHlWeW1haGFuaU5hcG9qZW5lOiB0aGF0LnByaXBhZHlWeW1haGFuaU5hcG9qZW5lLCBmb3JtTW9kZWw6IHRoYXQubW9kZWxGb3JtVnliZXIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmlwYWR5VnltYWhhbmlOYXBvamVuZSA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJpcGFkeVZ5bWFoYW5pID0gW3RoYXQuRHRvUHJpcGFkdV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXRWYWwuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxGb3JtVnliZXIgPSByZXRWYWwuZm9ybU1vZGVsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5FeHRlcm5pU3ViamVrdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXN1X3R4dDogaXRlbS5lc3VfdHh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS5lc3VfdHh0OyBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmlwYWR5VnltYWhhbmlOYXBvamVuZS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJpcGFkeVZ5bWFoYW5pLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQucHJpcGFkeVZ5bWFoYW5pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpekdyaWQgPSAkLmNvbnRlbnQoKS5maW5kKFwiW2RhdGEtaGVscC1jb250ZXh0PSdsaXN0OndpekdyaWQnXVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l6R3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UmVzZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RSZXNldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5bcOhaGF0IHpub3Z1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiT2Jub3bDrSBmb3JtdWzDocWZIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc1JlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1haW5Db250ZW50ID0gJC5jb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2l6Q29udGVudCA9IG1haW5Db250ZW50LmZpbmQoXCIuZ3dpemFyZF9fY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCh3aXpDb250ZW50KS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52eW1haGFuaSh0aGF0Lm1vZGVsRGF0YVZ5bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9kZXNsYXROb3ZlWmFzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2Rlc2xhdE5vdmVaYXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZGVzbGF0IG5vdsOpIHrDoXNpbGt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiT2Rlc2xhdCBlbGVrdHJvbmlja3kgbm92w6kgesOhc2lsa3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9kZXNsYXRFbGVrdHJvbmlja3koMCk7IC8vIG5hc3RhdsOtbWUsIMW+ZSBzZSBqZWRuw6EgbyBvZGVzbMOhbsOtIG5vdsO9Y2ggesOhc2lsZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0T2Rlc2xhdFByaXBaYXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPZGVzbGF0UHJpcFphc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9kZXNsYXQgcMWZaXByYXZlbsOpIHrDoXNpbGt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiT2Rlc2xhdCBlbGVrdHJvbmlja3kgcMWZaXByYXZlbsOpIHrDoXNpbGt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vZGVzbGF0RWxla3Ryb25pY2t5KDEpIC8vIG5hc3RhdsOtbWUsIMW+ZSBzZSBqZWRuw6EgbyBvZGVzbMOhbsOtIHDFmWlwcmF2ZW7DvWNoIHrDoXNpbGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdEdlbmVyb3ZhdEVsRG9rIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEdlbmVyb3ZhdEVsRG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiR2VuZXJvdmF0IGVsZWt0cm9uaWNrw6kgZG9rdW1lbnR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vZGVzbGF0RWxla3Ryb25pY2t5KDIpOyAvLyBuYXN0YXbDrW1lLCDFvmUgc2UgamVkbsOhIG8gZ2VuZXJvdsOhbsOtIGVsZWt0cm9uaWNrw71jaCBkb2t1bWVudMWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFRpc2tQcmVkYW5pOiB7IC8vd2ZsX3B0bV9ocm9tcHJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1ByZWRhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVGlzayBwxZllZMOhdmFjw61obyBwcm90b2tvbHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbnQgPSAkLmNvbnRlbnQoZXYudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlza1ByZWRhbmkoY250KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0Um96cGlzTGh1dHk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RSb3pwaXNMaHV0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlJvenBpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlBvZHJvYm7DvSByb3pwaXMgbGjFr3R5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbnQgPSAkLmNvbnRlbnQoZXYudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbDogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgbW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmRhdF9kb3IgPSBtb2RlbC5kYXRfZG9ydWM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWwuZGF0X2RvcnVjO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbC5kYXRfZG9yID09IG51bGwgfHwgbW9kZWwuZGF0X3Z5ayA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiUG9kcm9ibsO9IHJvenBpcyBsaMWvdHlcIiwgXCJKZSB0xZllYmEgemFkYXQgc3Byw6F2bsOpIGRhdHVtIGRvcnXEjWVuw60gaSB2eWtvbmF0ZWxub3N0aS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEobW9kZWwuZG55X3BtID49IDAgJiYgbW9kZWwuZG55X3Z5ayA+PSAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIlBvZHJvYm7DvSByb3pwaXMgbGjFr3R5XCIsIFwiRG55IG55Ynl0w60gcHLDoXZuw60gbW9jaSBhbmkgdnlrb25hdGVsbm9zdGkgbmVzbcOtIG5hYsO9dmF0IHrDoXBvcm7DvWNoIGhvZG5vdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBkYXRhLCBwdXQgaW4gZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWRSb3pwaXNMaHV0eVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBwb2xvxb5lay4uLlwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5saXN0Um96cGlzTGh1dHkoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IG1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZFJvenBpc0xodXR5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5kb25lKCh2aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2dyaWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlldyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0hlaWdodDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuUG9kcm9ibnlSb3pwaXNMaHV0eSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1RvcFBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJkYXR1bSxkZW4scG9waXMsZGVuX2xodXR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJ2aWtlbmRcIiwgZm9ybXVsYTogJ0VRVUFMUyhAdHlwX2RuZSwgMjApIG9yIEVRVUFMUyhAdHlwX2RuZSwgMzApIG9yIEVRVUFMUyhAdHlwX2RuZSwgNDApJywgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuZGlhbG9ncy5zaW1wbGVGb3JtKFwiUG9kcm9ibsO9IHJvenBpcyBsaMWvdHlcIiwgZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBIUk9NQUROw4kgT1BFUkFDRSAtIE1FTlUgXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVDaGlsZHJlbkhyb21hZG5lT3BlcmFjZSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBtZW51UGFyYW1zOiBNZW51UGFyYW1zW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBrb250cm9sYURvcnVjZW5reVBvdm9sZW5hID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoYXQucmV6aW1DdGVuaSB8fCB0aGF0LnBhcmFtcy5kZHBfcmV6X3pqZWRubyA9PSAxIHx8IHRoYXQucGFyYW1zLmRkcF9yZXpfemplZG5vID09IDIpIGtvbnRyb2xhRG9ydWNlbmt5UG92b2xlbmEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVQYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdGlza19vZGVzbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmFzdGF2ZW7DrSBzdGF2dSB0aXNrdSBhIG9kZXNsw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmZpcm1UaXRsZSA9IFwiT3puYcSNaXQgamFrbyBvZGVzbGFuw6kgdnltw6Fow6Fuw61cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmZpcm1NZXNzYWdlID0gXCJPcHJhdmR1IGNoY2V0ZSBvem5hxI1pdCB6w6F6bmFteSBvIHZ5bcOhaMOhbsOtIGpha28gb2Rlc2xhbsOpP1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShjb25maXJtVGl0bGUsIGNvbmZpcm1NZXNzYWdlLCA0MDAsIDIwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRhc2tTdGFydEhyb21Ba2NlKHNlbGVjdGlvbiwge30sIFwiTmFzdGF2ZW5pU3RhdnVUaXNrdUFPZGVzbGFuaVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBtZW51UGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Rpc2tfb2Rlc2xcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5hc3RhdmVuw60gcG9sZSBWxJtjIHByb2ZpbHUgZG9rdW1lbnR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtVGl0bGUgPSBcIk5hc3RhdmVuw60gcG9sZSBWxJtjXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtTWVzc2FnZSA9IFwiT3ByYXZkdSBjaGNldGUgbmFzdGF2aXQgcG9sZSAnVsSbYycgdiBwcm9maWx1IHZ5bcOhaGFjw61jaCBkb2t1bWVudHUgKGRsZSBuYXN0YXZlbsOtIHBhcmFtZXRydSk/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKGNvbmZpcm1UaXRsZSwgY29uZmlybU1lc3NhZ2UsIDQwMCwgMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9ldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVGFza1N0YXJ0SHJvbUFrY2Uoc2VsZWN0aW9uLCB7fSwgXCJOYXN0YXZlbmlQb2xlVmVjXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgbWVudVBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9wbF9kYXRfZG9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJIcm9tYWRuw6kgZG9wbG7Em27DrSBkYXRhIGRvcnXEjWVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5rYWxrRmlyc3RUaW1lID0gdHJ1ZTsgLy8gbmFzdGF2w61tZSwgxb5lIHNlIGplZG7DoSBvIHBydm7DrSDEjWFzIHNwdcWhdMSbbsOtIGthbGt1bGHEjWt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gdGhhdC5mb3JtVGVybWlub3ZhS2Fsa3VsYWNrYSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZvcm1UZXJtaW5vdmFLYWxrdWxhY2thVmFsdWVzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlybU1lc3NhZ2UgPSBcIk9wcmF2ZHUgY2hjZXRlIG5hc3Rhdml0IGRhdHVtIGRvcnXEjWVuw60gKGkgZGF0dW0gbmFieXTDrSBwcsOhdm7DrSBtb2NpIGEgdnlrb25hdGVsbm9zdGkpID9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrRnVuY3Rpb24gPSB0aGF0LmlzbC5WeW1haGFuaUREUC5rb250cm9sYURvcGxEYXREb3J1Yy5iaW5kKHRoYXQuaXNsLlZ5bWFoYW5pRERQKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZW51R3JpZCA9IFt7IGZhdm9yaXRlOiB0cnVlLCBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RSb3pwaXNMaHV0eSB9XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ocm9tYWRuYU9wZXJhY2VBc3luYyhkYXRhLCBcIk5hc3RhdmVuw60gZGF0YSBkb3J1xI1lbsOtXCIsIENvbW1vbi5HcmlkRm9ybWF0cy5WeW1EYXREb3J1YygpLCBcIml4cF9udnlcIiwgZm9ybSwgXCJWw71zbGVkZWsgem3Em255XCIsIGNoZWNrRnVuY3Rpb24sIFwiRG9wbERhdERvcnVjXCIsIGNvbmZpcm1NZXNzYWdlLCBkZXNjcmlwdGlvbiwgbWVudUdyaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBtZW51UGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X2RvcnVjZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0YXZlbsOtIHN0YXZ1IGRvcnXEjWVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGF0LmZvcm1TdGF2RG9ydWMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtTWVzc2FnZSA9IFwiT3ByYXZkdSBjaGNldGUgbmFzdGF2aXQgaHJvbWFkbsSbIHN0YXYgZG9ydcSNZW7DrSB7MH0oezF9KT8gKHN0YXYgZG9ydcSNZW7DrSBzZSB6bcSbbmkgbmEgdsWhZWNoIHZ5YnJhbsO9Y2ggesOhem5hbWVjaCEpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFOYXN0U3RhdkRvcnVjLmJpbmQodGhhdC5pc2wuVnltYWhhbmlERFApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ocm9tYWRuYU9wZXJhY2VBc3luYyhkYXRhLCBcIk5hc3RhdmVuw60gc3RhdnUgZG9ydcSNZW7DrVwiLCBDb21tb24uR3JpZEZvcm1hdHMuVnltU3RhdkRvcnVjKCksIFwiaXhwX252eVwiLCBmb3JtLCBcIlbDvXNsZWRlayB6bcSbbnlcIiwgY2hlY2tGdW5jdGlvbiwgXCJOYXN0U3RhdkRvcnVjXCIsIGNvbmZpcm1NZXNzYWdlLCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIG1lbnVQYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNTZXBhcmF0b3IwXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZXBhcmF0b3JcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVQYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaWRfZG90X2Rva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWTDoW7DrSBkb3TEjWVuw6lobyBkb2t1bWVudHVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGF0LmZvcm1Eb3RjZW55RG9rKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlybU1lc3NhZ2UgPSBcIk9wcmF2ZHUgY2hjZXRlIHDFmWlkYXQgZG9rdW1lbnQgayB6w6F6bmFtxa9tIG8gdnltw6Fow6Fuw60/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFQcmlkYW5pRG90Y0Rvay5iaW5kKHRoYXQuaXNsLlZ5bWFoYW5pRERQKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaHJvbWFkbmFPcGVyYWNlQXN5bmMoZGF0YSwgXCJQxZlpZMOhbsOtIGRvdMSNZW7DqWhvIGRva3VtZW50dVwiLCBDb21tb24uR3JpZEZvcm1hdHMuVnltYWhhbmlTaW1wbGUoKSwgXCJpeHBfbnZ5XCIsIGZvcm0sIFwiVsO9c2xlZGVrIHptxJtueVwiLCBjaGVja0Z1bmN0aW9uLCBcIlByaWRhbmlEb3RjRG9rXCIsIGNvbmZpcm1NZXNzYWdlLCBkZXNjcmlwdGlvbiwgW10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBtZW51UGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmlkX2RvdF9zdWJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkw6Fuw60gZG90xI1lbsOpaG8gc3ViamVrdHVcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGF0LmZvcm1Eb3RjZW55U3ViKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlybU1lc3NhZ2UgPSBcIk9wcmF2ZHUgY2hjZXRlIHByb3bDqXN0IGhyb21hZG7DqSBwxZlpZMOhbsOtIGRvdMSNZW7DqWhvIHN1Ympla3R1P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tGdW5jdGlvbiA9IHRoYXQuaXNsLlZ5bWFoYW5pRERQLmtvbnRyb2xhUHJpZGFuaURvdGNTdWJqLmJpbmQodGhhdC5pc2wuVnltYWhhbmlERFApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ocm9tYWRuYU9wZXJhY2VBc3luYyhkYXRhLCBcIlDFmWlkw6Fuw60gZG90xI1lbsOpaG8gc3ViamVrdHVcIiwgQ29tbW9uLkdyaWRGb3JtYXRzLlZ5bWFoYW5pU2ltcGxlKCksIFwiaXhwX252eVwiLCBmb3JtLCBcIlbDvXNsZWRlayB6bcSbbnlcIiwgY2hlY2tGdW5jdGlvbiwgXCJQcmlkYW5pRG90Y1N1YmpcIiwgY29uZmlybU1lc3NhZ2UsIGRlc2NyaXB0aW9uLCBbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIG1lbnVQYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaWRfZG90X3N1Yl96ZV9za3VwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZlpZMOhbsOtIGRvdMSNZW7DqWhvIHN1Ympla3R1IHplIHNrdXBpbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGF0LmZvcm1Eb3RjZW55U3ViWmVTa3VwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlybU1lc3NhZ2UgPSBcIk9wcmF2ZHUgY2hjZXRlIHByb3bDqXN0IGhyb21hZG7DqSBwxZlpZMOhbsOtIGRvdMSNZW7DqWhvIHN1Ympla3R1P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tGdW5jdGlvbiA9IHRoYXQuaXNsLlZ5bWFoYW5pRERQLmtvbnRyb2xhUHJpZGFuaURvdGNTdWJqLmJpbmQodGhhdC5pc2wuVnltYWhhbmlERFApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ocm9tYWRuYU9wZXJhY2VBc3luYyhkYXRhLCBcIlDFmWlkw6Fuw60gZG90xI1lbsOpaG8gc3ViamVrdHUgemUgc2t1cGlueVwiLCBDb21tb24uR3JpZEZvcm1hdHMuVnltYWhhbmlTaW1wbGUoKSwgXCJpeHBfbnZ5XCIsIGZvcm0sIFwiVsO9c2xlZGVrIHptxJtueVwiLCBjaGVja0Z1bmN0aW9uLCBcIlByaWRhbmlEb3RjU3VialplU2t1cFwiLCBjb25maXJtTWVzc2FnZSwgZGVzY3JpcHRpb24sIFtdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgbWVudVBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1NlcGFyYXRvcjFcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlcGFyYXRvclwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbWVudVBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29udHJvbGFfZG9ydWNlbmVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEb3Rhxb5lbsOtIGRhdGEgZG9ydcSNZW7DrSB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGtvbnRyb2xhRG9ydWNlbmt5UG92b2xlbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwia29udHJvbGFfZG9ydWNlbmVrXCIsIHRleHQ6IFwiUHJvYsOtaMOhIGFrdHVhbGl6YWNlIGRvcnXEjWVuZWsgbmEgesOhem5hbWVjaCB2eW3DoWjDoW7DrS4uLlwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmtvbnRyb2xhRG9ydWNlbmVrKHsgdHlweVBobDogW10gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChkdG86IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwia29udHJvbGFfZG9ydWNlbmVrXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5kb25lKCh2aWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdncmlkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlldyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93SGVpZ2h0OiAzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLktvbnRyb2xhRG9ydWNlbmVrKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJWw71zbGVkZWsgZG90YcW+ZW7DrSBkYXRhIGRvcnXEjWVuw60gdnltw6Fow6Fuw61cIiwgZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51UGFyYW1zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGhsYXZpxI1reSAoZm9ybXVsw6HFmSkgYSBha2PDrSBkbyBtZW51LCBwb2t1ZCBzZSBqZWRuw6EgbyB2eW3DoWjDoW7DrSBwxZnDrXBhZHUgKi9cclxuICAgICAgICBwcml2YXRlIHZ5bWFoYW5pUHJpcGFkdSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuVnltUHJpcGFkdSkgeyAvLyBqZWRuw6Egc2UgbyB2eW3DoWjDoW7DrSBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtUHJpcGFkdSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwicHJpcGFkRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSBMLTItOC0yLCBNLTItOC0yLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHBvaGxlZMOhdmt5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC50eXBQb2hsZWRhdmt5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInR5cF9waGw9dHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yIHDFmcOtcGFkdVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiScSMT1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiVlNcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkHEjFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiUsSMXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUm9kbmVDaXNsbyh7fSldXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIEwtMS0xMC0xIE0tMS0xMC0xIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGxhdG7DrWtcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZXN1PWl4c19lc3U7ZXN1X2RpYz1kaWM7bW9kZWwubGljPXZhbHVlLmxpYzttb2RlbC5wb3JfemFzdD12YWx1ZS5wb3JfemFzdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cDogR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLlR5cFpvYnJhemVuaUthcm90ZWthLlNlbGVjdEVzdSwgLy8gcMWZaWTDoW7DrSBwcmVmYWJ1ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhhdC5EdG9QcmlwYWR1Lml4cCA/PyBcIlwiLCAvLyB6YWTDoW7DrSBsb2dvdmFjw61jaCDDumRhanUgamUgbnV0bm9zdCBobGF2bsSbIElYUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSwgLy8gdnlicmF0IHogZW51bXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IHRoYXQuRHRvUHJpcGFkdS5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIlNlem5hbSB2eW3DoWjDoW7DrSBuYSBwxZnDrXBhZHVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkgYXMgR1NlbGVjdEJveE9wdGlvbnM8YW55PilcclxuXHJcbiAgICAgICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm1QcmlwYWR1KS5ndGFiKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pOyAgIFxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwicHJpcGFkRm9ybVwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0LkR0b1ByaXBhZHUsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcInJjXCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgdGhhdC5EdG9QcmlwYWR1LkV4dGVybmlTdWJqZWt0LnJjKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcIml4c19lc3VcIikuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCB7IGl4c19lc3U6IHRoYXQuRHRvUHJpcGFkdS5FeHRlcm5pU3ViamVrdC5peHNfZXN1IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogWnJ1xaFlbsOtIHbFoWVjaCBha3Rpdm7DrWNoIGEgdnlicmFuw71jaCBwxZnDrXBhZMWvIHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSB6cnVzZW5pVnltYWhhbmkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMy03LTJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkTFr3ZvZFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInJlYXNvblwiLCBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IDI1NCB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJydXNpdF92eXBcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJSdcWhaXQgamnFviB2eXByYXZlbsOpIHDFmcOtcGFkeVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbWFzc1VwZGF0ZSA9IHRoYXQuaXNsLlZ5bWFoYW5pRERQLnJ1c2VuaVZ5bWFoYW5pLmJpbmQodGhhdC5pc2wuVnltYWhhbmlERFApO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFSdXNlbmlWeW1haGFuaS5iaW5kKHRoYXQuaXNsLlZ5bWFoYW5pRERQKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIHRoYXQuaHJvbWFkbmFPcGVyYWNlKGRhdGEsIFwiWnJ1xaFlbsOtIHZ5bcOhaMOhbsOtXCIsIENvbW1vbi5HcmlkRm9ybWF0cy5WeW1haGFuaVNpbXBsZSgpLCBcIml4cF9udnlcIiwgZm9ybSwgXCJWw71zbGVkZWsgem3Em255XCIsIG1hc3NVcGRhdGUsIGNoZWNrRnVuY3Rpb24sIFwiT3ByYXZkdSBjaGNldGUgenJ1xaFpdCB2eWJyYW7DqSB6w6F6bmFteSBvIHZ5bcOhaMOhbsOtP1wiLCBcIlwiLCBbXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogQWt0dWFsaXphY2UgZG90xI1lbsO9Y2ggc3ViamVrdMWvIG5hIHrDoXpuYW1lY2ggbyB2eW3DoWjDoW7DrSB6IHDFmcOtcGFkdSBERFAgKi9cclxuICAgICAgICBwcml2YXRlIGFrdHVhbGl6YWNlRFNVKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IFwiSHJvbWFkbsOhIGFrdHVhbGl6YWNlIHByb3ZlZGUgYWt0dWFsaXphY2kgZG90xI1lbsO9Y2ggc3ViamVrdMWvIHogcMWZw61wYWR1IEREUCBuYSB2eW3DoWhhY8OtY2ggZG9rdW1lbnRlY2ggZGxlIG5hc3RhdmVuw60gdHlwxa8gZG90xI1lbsO9Y2ggc3ViamVrdHUgcHJvIHNrdXBpbnUgYSBrcm9rIHZ5bcOhaMOhbsOtLlwiO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbWFzc1VwZGF0ZSA9IHRoYXQuaXNsLlZ5bWFoYW5pRERQLmFrdHVhbGl6YWNlRFNVLmJpbmQodGhhdC5pc2wuVnltYWhhbmlERFApO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFBa3R1YWxpemFjZURTVS5iaW5kKHRoYXQuaXNsLlZ5bWFoYW5pRERQKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIHRoYXQuaHJvbWFkbmFPcGVyYWNlKGRhdGEsIFwiQWt0dWFsaXphY2UgRFNVXCIsIENvbW1vbi5HcmlkRm9ybWF0cy5WeW1haGFuaVNpbXBsZSgpLCBcIml4cF9udnlcIiwgbnVsbCwgXCJWw71zbGVkZWsgem3Em255XCIsIG1hc3NVcGRhdGUsIGNoZWNrRnVuY3Rpb24sIFwiT3ByYXZkdSBjaGNldGUgYWt0dWFsaXpvdmF0IGRvdMSNZW7DqSBzdWJqZWt0eSBuYSB6w6F6bmFtZWNoIG8gdnltw6Fow6Fuw60geiBwxZnDrXBhZMWvIEREUD8gXFxuIFxcbiBNxJtqdGUgcHJvc8OtbSBuYSBwYW3Em3RpLCDFvmUgc2Uga29ww61ydWplIG5hc3RhdmVuw60gZG90xI1lbsO9Y2ggc3ViamVrdMWvIGRsZSBuYXN0YXZlbsOtIHNrdXBpbnkgdnltw6Fow6Fuw60hXCIsIGRlc2NyaXB0aW9uLCBbXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRnVua2NlIGsgb3RldsWZZW7DrSBva25hIGhyb21hZG7DvWNoIHptxJtuIChFa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQpICovXHJcbiAgICAgICAgaHJvbWFkbmFPcGVyYWNlKGRhdGE6IGFueSwgdGl0bGU6IHN0cmluZywgZ3JpZEZvcm1hdDogYW55LCBrZXlzOiBhbnksIGZvcm06IGFueSwgbGFzdFN0ZXBUaXRsZTogc3RyaW5nLCBtYXNzVXBkYXRlOiBhbnksIGNoZWNrRnVuY3Rpb246IGFueSwgY29uZmlybU1lc3NhZ2U6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbWVudUdyaWQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxhbnk+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBncmlkRm9ybWF0LFxyXG4gICAgICAgICAgICAgICAga2V5czoga2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiVnlicmFuw6kgcMWZw61wYWR5XCIsIC8vIHRpdHVsZWsgdiB0YWJ1ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEdyaWRWeWNob3ppQWtjZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJQcm92ZcSPXCIsIC8vIG7DoXpldiBwcm8gdGxhxI3DrXRrbyBkYWzFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUdyaWRCYXI6IG1lbnVHcmlkLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha2NlIG5hIHRhYnUgcyBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7IC8vIGFrY2UgcHJvIGtvbnRyb2x1IGRhdCwgbW9kZWwgLSBkYXRhIHogbW9kZWxEYXRhLCBpbnB1dCAtIGdyaWQgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbER0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdNb2RlbFZ5bWFoYW5pRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhc29uOiBtb2RlbC5yZWFzb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydXNpdF92eXA6IG1vZGVsLnJ1c2l0X3Z5cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrRnVuY3Rpb24oeyBkdG9zOiBkYXRhLCBtb2RlbDogbW9kZWxEdG8gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWxEdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HTW9kZWxWeW1haGFuaUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYXNvbjogbW9kZWwucmVhc29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVzaXRfdnlwOiBtb2RlbC5ydXNpdF92eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtVGl0bGUgPSBcIlBvdHZyemVuw60gaHJvbWFkbsOpIGFrY2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm1NZXNzYWdlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5jb25maXJtKGNvbmZpcm1UaXRsZSwgY29uZmlybU1lc3NhZ2UsIDQwMCwgMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNzVXBkYXRlKHsgZHRvczogZGF0YSwgbW9kZWw6IG1vZGVsRHRvIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc3NVcGRhdGUoeyBkdG9zOiBkYXRhLCBtb2RlbDogbW9kZWxEdG8gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDIgLSB6b2JyYXplbsOtwq0gdsO9c2xlZGt1IHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBsYXN0U3RlcFRpdGxlLCAvL25hemV2IGtyb2t1XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIkFrdHVhbGl6b3ZhbsOpIHDFmcOtwq1wYWR5XCIsIC8vcG9waXNlayBuYWQgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0R3JpZFZ5Y2hvemlBa2NlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogKCkgPT4geyAvL3ByZWRhbmkgZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0LmZpbHRlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbERlbGVnYXRlOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRnVua2NlIGsgb3RldsWZZW7DrSBva25hIGhyb21hZG7DvWNoIHptxJtuIChFa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQpICovXHJcbiAgICAgICAgaHJvbWFkbmFPcGVyYWNlQXN5bmMoZGF0YTogYW55LCB0aXRsZTogc3RyaW5nLCBncmlkRm9ybWF0OiBhbnksIGtleXM6IGFueSwgZm9ybTogYW55LCBsYXN0U3RlcFRpdGxlOiBzdHJpbmcsIGNoZWNrRnVuY3Rpb246IGFueSwgbmF6ZXZBa2NlOiBhbnksIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIG1lbnVHcmlkPzogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxhbnk+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBncmlkRm9ybWF0LFxyXG4gICAgICAgICAgICAgICAga2V5czoga2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiVnlicmFuw6kgcMWZw61wYWR5XCIsIC8vIHRpdHVsZWsgdiB0YWJ1ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEdyaWRWeWNob3ppQWtjZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJQcm92ZcSPXCIsIC8vIG7DoXpldiBwcm8gdGxhxI3DrXRrbyBkYWzFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUdyaWRCYXI6IG1lbnVHcmlkLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha2NlIG5hIHRhYnUgcyBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7IC8vIGFrY2UgcHJvIGtvbnRyb2x1IGRhdCwgbW9kZWwgLSBkYXRhIHogbW9kZWxEYXRhLCBpbnB1dCAtIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrRnVuY3Rpb24oeyBkdG9zOiBkYXRhLCBtb2RlbDogbW9kZWwgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLnBvcl96YXN0X2NoZWNrID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnBvcl96YXN0ID0gdGhhdC5ncmlkWmFzdHVwY2kuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdaYXN0dXBjZUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF0ucG9yX3phc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5saWNfemFzdCA9IHRoYXQuZ3JpZFphc3R1cGNpLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRHRvPihcImdldFNlbGVjdGlvblwiKVswXS5saWM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtVGl0bGUgPSBcIlBvdHZyemVuw60gaHJvbWFkbsOpIGFrY2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm1NZXNzYWdlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5haHJhemVuw60gcGFyYW1ldHLFryB2ZSB6cHLDoXbEmyBwxZlpIG5hc3RhdmVuw60gc3RhdnUgZG9ydcSNZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm1NZXNzYWdlLmluY2x1ZGVzKFwiezB9XCIpICYmIGNvbmZpcm1NZXNzYWdlLmluY2x1ZGVzKFwiezF9XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybU1lc3NhZ2UgPSBjb25maXJtTWVzc2FnZS5yZXBsYWNlKFwiezB9XCIsIG1vZGVsLnN0YXZfZG9ydWNfdHh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtTWVzc2FnZSA9IGNvbmZpcm1NZXNzYWdlLnJlcGxhY2UoXCJ7MX1cIiwgbW9kZWwuc3Rhdl9kb3J1Yyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oY29uZmlybVRpdGxlLCBjb25maXJtTWVzc2FnZSwgNDAwLCAyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9ldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UYXNrU3RhcnRIcm9tQWtjZShkYXRhLCBtb2RlbCwgbmF6ZXZBa2NlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbmVuw60gcG90xZllYmEgcG90dnJ6ZW7DrSwgdGFrIGplZGVtIGTDoWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UYXNrU3RhcnRIcm9tQWtjZShkYXRhLCBtb2RlbCwgbmF6ZXZBa2NlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDIgLSB6b2JyYXplbsOtwq0gdsO9c2xlZGt1IHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBsYXN0U3RlcFRpdGxlLCAvL25hemV2IGtyb2t1XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIkFrdHVhbGl6b3ZhbsOpIHDFmcOtwq1wYWR5XCIsIC8vcG9waXNlayBuYWQgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0R3JpZFZ5Y2hvemlBa2NlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogKCkgPT4geyAvL3ByZWRhbmkgZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHRoYXQuZmlsdGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRnVua2NlIGsgesOtc2vDoW7DrSBkYXRhIGRsZSBmaWx0cnUgYSBrb250cm9seVxyXG4gICAgICAgICAqIEBwYXJhbSBmaWx0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHppc2tlakRhdGEoZmlsdGVyOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gcG9rdWQgc2UgamVkbsOhIG8gdnltw6Fow6Fuw60gcMWZw61wYWR1LCB0YWsgcMWZaWTDoW1lIGRvIGlmbHRydSDDumRhamUgbyBwxZnDrXBhZHVcclxuICAgICAgICAgICAgaWYgKHRoYXQuVnltUHJpcGFkdSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLml4cCA9IHRoYXQuRHRvUHJpcGFkdS5peHA7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIudHlwX3BobCA9IHRoYXQuRHRvUHJpcGFkdS50eXBfcGhsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5uZW1hX3BvbG96a3kgfHwgdGhhdC5uZXNvdWhsYXNpX3N1bWEgfHwgdGhhdC5uZW1hX3ByZWRwaXMgfHwgdGhhdC5kc3VfemVtcmVsIHx8IHRoYXQubmVtYV9kc3UpIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5uZW1hX3BvbG96a3kgPSB0aGF0Lm5lbWFfcG9sb3preTtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5uZXNvdWhsYXNpX3N1bWEgPSB0aGF0Lm5lc291aGxhc2lfc3VtYTtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5uZW1hX3ByZWRwaXMgPSB0aGF0Lm5lbWFfcHJlZHBpcztcclxuICAgICAgICAgICAgICAgIGZpbHRlci5kc3VfemVtcmVsID0gdGhhdC5kc3VfemVtcmVsO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLm5lbWFfZHN1ID0gdGhhdC5uZW1hX2RzdTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcIm5hY2l0YW5pXCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIHBvbG/FvmVrLi4uXCIgfSlcclxuICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAubGlzdCgoKSA9PiB7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWRWeW1haGFuaS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh2aWV3IS5nZXRDb3VudCgpID4gMCk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm5hY2l0YW5pXCIgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmcOtIGdyaWQvc2V6bmFtIHDFmcOtcGFkxa8gKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKTogSlF1ZXJ5IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy9PdsSbxZlpdCBwb3BsYXRuw61reSBuYSBJU1pSXHJcbiAgICAgICAgICAgIC8va29udHJvbGFNZXRhZGF0XHJcbiAgICAgICAgICAgIHZhciBqZVByaXpuYWtWeXRpc3RlbmlQb3ZvbGVuID0gIXRoYXQucmV6aW1DdGVuaSAmJiB0aGF0LnBhcmFtcy5kZHBfdnltX296bnZ5dCA9PT0gMTtcclxuICAgICAgICAgICAgdmFyIGplUHJpem5ha09kZXNsYW5pUG92b2xlbiA9ICF0aGF0LnJlemltQ3RlbmkgJiYgdGhhdC5wYXJhbXMuZGRwX3Z5bV9vem5vZGUgPT09IDE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgYWN0aW9uTGlzdCA9IG5ldyBHQWN0aW9uTGlzdCh7XHJcbiAgICAgICAgICAgICAgICBhY3RLb250cm9sYU1ldGFkYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktvbnRyb2xhIG1ldGFkYXRcIiwgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmtvbnRyb2xhTWV0YWRhdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPdmVyaXRQb3BsYXRuaWt5SVNaUjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQuaXN6cixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk92xJvFmWl0IHBvcGxhdG7DrWt5IElTWlJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaHJvbWFkbmVPdmVyZW5pSVNaUigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPdmVyaXREb3RjZW5lU3ViaklTWlI6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LmlzenIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPdsSbxZlpdCBkb3TEjWVuw6kgc3ViamVrdHkgbmEgSVNaUlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ocm9tYWRuZU92ZXJlbmlEb3RTdWJqSVNaUigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3ROYXN0YXZpdFByaXpuYWtWeXRpc3Rlbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBqZVByaXpuYWtWeXRpc3RlbmlQb3ZvbGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmFzdGF2aXQgcMWZw616bmFrIHZ5dGnFoXTEm27DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaVByaXpuYWt1VGlza3UoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdFByaXpuYWtWeXRpc3Rlbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBqZVByaXpuYWtWeXRpc3RlbmlQb3ZvbGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdCBwxZnDrXpuYWsgdnl0acWhdMSbbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pUHJpem5ha3VUaXNrdSgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0TmFzdGF2aXRQcml6bmFrT2Rlc2xhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBqZVByaXpuYWtPZGVzbGFuaVBvdm9sZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0YXZpdCBwxZnDrXpuYWsgb2Rlc2zDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaVByaXpuYWt1T2Rlc2xhbmkoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpydXNpdFByaXpuYWtPZGVzbGFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGplUHJpem5ha09kZXNsYW5pUG92b2xlbixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXQgcMWZw616bmFrIG9kZXNsw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlQcml6bmFrdU9kZXNsYW5pKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RPYm5vdml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogamVQcml6bmFrT2Rlc2xhbmlQb3ZvbGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2Jub3ZlbsOtIHZ5YnJhbsO9Y2ggcMWZw61wYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2Jub3ZlbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJlZGF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5wYXJhbXMuZGRwX3JhZF92eW1wcmUgPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWVkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByZWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuUmVkaXN0cmlidWNlLmtvbnRyb2xhUHJlZGFuaS5iaW5kKHRoYXQuaXNsLlJlZGlzdHJpYnVjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQud2l6emFyZFJlZGlzdChjaGVja0Z1bmN0aW9uLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJpZGVsaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LnBhcmFtcy5kZHBfcmFkX3Z5bXByZCA9PSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWTEm2xpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpZGVsaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tGdW5jdGlvbiA9IHRoYXQuaXNsLlJlZGlzdHJpYnVjZS5rb250cm9sYVByZWRhbmkuYmluZCh0aGF0LmlzbC5SZWRpc3RyaWJ1Y2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LndpenphcmRSZWRpc3QoY2hlY2tGdW5jdGlvbiwgMTApOyBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJldnppdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQucGFyYW1zLmRkcF9yYWRfdnltcHJpID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZlldnrDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByZXZ6aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2eml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJHVnltYWhhbmlHcmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJhdXRvXCIsIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5WeW1haGFuaSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiBmdW5jdGlvbiAoY2VsbENvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbkxpc3QuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0T3Zlcml0UG9wbGF0bmlreUlTWlJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0T3Zlcml0RG90Y2VuZVN1YmpJU1pSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdEtvbnRyb2xhTWV0YWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCItXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE5hc3Rhdml0UHJpem5ha1Z5dGlzdGVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RacnVzaXRQcml6bmFrVnl0aXN0ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIi1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0TmFzdGF2aXRQcml6bmFrT2Rlc2xhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0WnJ1c2l0UHJpem5ha09kZXNsYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIi1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTdG9ybm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE9ibm92aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RQcmVkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0UHJpZGVsaXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0UHJldnppdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVsO9Y2hvesOtIHBvaGxlZFwiLCBfbG9ja2VkOiB0cnVlLCBfZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJWeXByYXZlbm9cIiwgZm9ybXVsYTogXCJJRihJU0JMQU5LKEBkYXRfdnlwKSwgZmFsc2UsIHRydWUsIHRydWUpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwiTmVha3Rpdm7DrVwiLCBmb3JtdWxhOiBcIklGKE5PVChJU0JMQU5LKEBla29fYWt0KSkgYW5kIEBla29fYWt0ID09IDUwMCwgdHJ1ZSwgZmFsc2UsIGZhbHNlKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyYXkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIlpydcWhZW5cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAZWtvX2FrdCkpIGFuZCBAZWtvX2FrdCA9PSA5MDAsIHRydWUsIGZhbHNlLCBmYWxzZSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5wdXJwbGUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIkFrdGl2bsOtIGTDrWzEjcOtIHbDvXBvxI1ldFwiLCBmb3JtdWxhOiBcIklGKE5PVChJU0JMQU5LKEBkaWxjaV92eXBvY2V0X3R4dCkpIGFuZCBFUVVBTFMoQGRpbGNpX3Z5cG9jZXRfdHh0LCdBbm8nKSBhbmQgQGVrb19ha3QgPT0gMTAwLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuZ3JlZW4gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LmNsb3NlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eCAhPSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmNlbGxJbmZvICE9IG51bGwgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguY2VsbEluZm8uZGF0YSAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLnNob3coY3R4LmNlbGxJbmZvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkcm93c2NhbGMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBUSVNLXHJcblxyXG4gICAgICAgIC8qKiBUaXNrIHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSB0aXNrVnltYWhhbmkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcm93czogYW55O1xyXG4gICAgICAgICAgICByb3dzID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgdGV4dDogXCJQcm9iw61ow6EgaW5pY2lhbGl6YWNlIHRpc2t1Li4uXCIsIGlkOiBcInRpc2tcIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmluc2VydEREUFRQUkQoeyBycTogeyBSZXF1ZXN0RGF0YTogcm93cyB9IH0pLmdldCgpLmRvbmUoKHJlc3VsdDogc3RyaW5nW10pID0+IHsgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnVwZGF0ZUREUFNOVlkoeyBycTogeyBSZXF1ZXN0RGF0YTogcm93cyB9IH0pLmdldCgpLmRvbmUoKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidGlza1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwiVGlzayB2w61jZSBwxZnDrXBhZMWvIHZ5bcOhaMOhbsOtXCIsIFwiU2VzdGF2YSBzZSB0aXNrbmUgemEgdsOtY2UgesOhem5hbcWvIHZ5bcOhaMOhbsOtLCBwb2t1ZCBzZSBqZWRuw6EgbyBzZXN0YXZ1LCBrdGVyw6Egc2UgbcOhIHVrbMOhZGF0IGpha28gZWwuIG9icmF6IHZ5bcOhaMOhbsOtLCBzZXN0YXZhIHNlIE5FVUxPxb3DjSEgXFxuIFxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUG9rdWQgY2hjZXRlIHZ5dHZvxZlpdCBlbC5vYnJheiBhIHVsb8W+aXQgamVqIGsgdnltw6Fow6Fuw60sIHByb3ZlxI90ZSB0aXNrIHogZGV0YWlsdSB2eW3DoWjDoW7DrS5cIiwgMzYwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9ldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJva1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWtjZVRpc2t1KG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vcG91emUgdGlzayBuYSAxIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXhwX252eSA9IHJlc3VsdFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXZfdnltID0gcm93cy5maW5kKChpdGVtOiB7IGl4cF9udnk6IHN0cmluZzsgfSkgPT4gaXRlbS5peHBfbnZ5ID09PSBpeHBfbnZ5KT8uc3Rhdl92eW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWtjZVRpc2t1KHJlc3VsdFswXSwgc3Rhdl92eW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ0aXNrXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhIHRpc2t1XCIsIFwixb3DoWRuw70geiB2eWJyYW7DvWNoIHDFmcOtcGFkxa8gbmVvZHBvdsOtZMOhIHBvZG3DrW5rw6FtIHRpc2t1LlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2Ftb3Ruw6EgZnVua2NlIGsgdm9sw6Fuw60gdGlza292w6kgYWtjZVxyXG4gICAgICAgICAqIEBwYXJhbSBwcmlwYWR5XHJcbiAgICAgICAgICogQHBhcmFtIHN0YXZfdnltXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBha2NlVGlza3UoaXhwOiBhbnksIHN0YXZfdnltOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyB1cGRhdGUgcHJvxaFlbCBiZXogcHJvYmzDqW3FryB0YWsgcG9rcmHEjXVqZW1lXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdFRpc2tWeW1haGFuaSA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrVnltYWhhbmlcIixcclxuICAgICAgICAgICAgICAgIHRlbWE6IFwiZGRwX3B0bV9udnlcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUR0bzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuaXhwRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIHJva19kZW46IHRoYXQucm9rRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHRoYXQudHlwUGhsLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4cDogaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXZfdnltOiBzdGF2X3Z5bVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNlcnZlclJlc3RyaWN0aW9uQWxmTWV0aG9kOiBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZHBXZWJUaXNrOkdldFJlc3RyaWN0aW9uQWxmXCIsICAvLyBmaWx0ciBwcm8gbW/Fvm7DqSB0aXNreVxyXG4gICAgICAgICAgICAgICAgLy8g4oaTIE1ldG9kYSwga3RlcsOhIGplIHphdm9sw6FuYSB0xJtzbsSbIHDFmWVkIGdlbmVyb3bDoW7DrW0gc2VzdGF2eSBhIGtkZSBsemUgbmEgc3RyYW7EmyBzZXJ2ZXJ1IG92bGl2bml0IHBhcmFtZXRyeSBzZXN0YXZ5IOKGk1xyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZHBXZWJUaXNrOlRpc2tWeW1haGFuaVwiLCAgLy96ZGUgc2UgcGxuw60gdMOpbWFcclxuICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFQb1Rpc2t1KCkuZ2V0KCkuZG9uZSgocG9jZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvY2V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpc2tWeW1Eb3RheiA9IHRoYXQuZ2xvYmFsU2V0dGluZ3MhLmdldChcIkdsb2JhbC5EZHAuT2JlY25lU2V0dGluZ3MuVGlza1Z5bURvdGF6XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpc2tWeW1Eb3Rheikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiS29udHJvbG7DrSBkb3RheiBuYXN0YXZlbsOtIHDFmcOtem5ha3UgdGlza3VcIiwgXCJQb2t1ZCB2w610ZSwgxb5lIHRpc2sgdnltw6Fow6Fuw60gZG9wYWRsIHYgcG/FmcOhZGt1LCB1xb4gaG8gbmVjaGNldGUgdGlza25vdXQgem5vdnUgYSBjaGNldGUgem3Em25pdCBzdGF2IHRpc2t1IHZ5bcOhaMOhbsOtLCB0YWsgb2Rwb3bEm3p0ZSBBTk8uXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcblxcbiBQb2t1ZCBjaGNldGUgdGlzayBvcGFrb3ZhdCwgcHJvdG/FvmUgc2Ugem1hxI1rYWwgcGFww61yIHYgdGlza8Ohcm7EmywgY2hjZXRlIHNpIHVkxJtsYXQga29waWksIG7Em2t0ZXLDoSBzZXN0YXZhIGplIGNoeWJuw6EgYXRkLiwgcGFrIG9kcG92xJt6dGUgTkUuXCIsIDQ2NSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9ldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAubmFzdGF2UHJpem5ha1Rpc2t1VnltYWhhbmkoKS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgdGhhdC5pc2wuVnltYWhhbmlERFAubmFzdGF2UHJpem5ha1Rpc2t1VnltYWhhbmkoKS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgICAgICAgZGlhbG9nQ2xvc2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWN0VGlza1Z5bWFoYW5pLnJ1bigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBGaWx0clxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBmaWx0cnUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlcigpIHsgXHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybXVsYXJlOiBhbnkgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlZ5bVByaXBhZHUpIHtcclxuICAgICAgICAgICAgICAgIGZvcm11bGFyZS5wdXNoKHRoYXQuY3JlYXRlRmlsdGVyRm9ybVByaXBhZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcm11bGFyZS5wdXNoKFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtVnltYWhhbmkoKSxcclxuICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRmlsdGVyRm9ybVNsb3plbmlWeW1haGFuaSgpLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtUHJlZHBpc3lWeW1QcmlwKCksXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlckZvcm1QbGF0YnlWeW1QcmlwKCksXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlckZvcm1acHJhY292YXRlbCgpLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtRWxPYnJheigpLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtRFMoKSxcclxuICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRmlsdGVyRm9ybVByaXpuYWt5VnltKCksXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlckZvcm1JbnRlcnZhbHkoKSxcclxuICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRmlsdGVyRm9ybUtsaWNvdmFTbG92YSgpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkgLmdmaWx0ZXJwYW5lbChcclxuICAgICAgICAgICAgICAgIC8vISBWeXR2b8WZZW7DrSBzdGFuZGFyZG7DrWNoIHBhcmFtZXRyxa8gZmlsdGVycGFuZWx1IHBybyBFS08gbW9kdWx5XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkZpbHRlcnMuZ2V0RmlsdGVyUGFyYW1zPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlGaWx0ZXI+KFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm11bGFyZSxcclxuICAgICAgICAgICAgICAgICAgICBbXSwgLy8gb2Jsw61iZW7DqSBmaWx0cnlcclxuICAgICAgICAgICAgICAgICAgICBcImRkcF9wdG1fdnltYWhcIiwgLy8gdMOpbWEgdGlza3VcclxuICAgICAgICAgICAgICAgICAgICBudWxsLCAvL3Nsb3VwZWMgeiBEVE8gcHJvIGZpbHRyIFwiKnZsYXN0bsOtXCIgbmVibyBudWxsLCBwb2t1ZCBuZW3DoSBiw710IC0gbmV0dcWhw61tIGNvIHRvIG3DoSBkxJtsYXRcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckRhdGEgPSBvYmouZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEob2JqLmZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBudWxsLCAvLyBwZXZuw70gZmlsdHJcclxuICAgICAgICAgICAgICAgICAgICAvLyh7IGRzOiAyLCBlbF9vYnJhejogMiwgcHJlZHBpc3k6IDEsIHBsYXRieTogMSB9KSBhcyBhbnksIC8vIHBldm7DvSBmaWx0clxyXG4gICAgICAgICAgICAgICAgICAgIHRydWUsIC8vIG5hdmlnw6F0b3IgdiBkZXRhaWx1IGZpbHRydVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQgLy9wYXJlbnRDb250ZW50XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgZG8gZmlsdHJ1IC0gUMWZw61wYWRcclxuICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm1QcmlwYWQoKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJwcmlwYWRDaGVja0Zvcm1cIiwgdGFiTGFiZWw6IFwiUMWZw61wYWRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlbFoWVjaG5hIHZ5bcOhaMOhbsOtIHBvcGxhdG7DrWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE9wcG9zaXRlQ2hlY2tGYWxzZShcImRzdVwiLCBvYmoudmFsdWUsIGV2LCBcInByaXBhZENoZWNrRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkhsZWRhdCBwxZllcyBkb3TEjWVuw6kgc3ViamVrdHkgcMWZw61wYWR1IEREUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRPcHBvc2l0ZUNoZWNrRmFsc2UoXCJhbGxcIiwgb2JqLnZhbHVlLCBldiwgXCJwcmlwYWRDaGVja0Zvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllIGRvIGZpbHRydSAtIFZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm1WeW1haGFuaSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJWeW3DoWjDoW7DrVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuVnltUHJpcGFkdSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQb2t1ZCBzZSBqZWRuw6EgbyB2eW3DoWjDoW7DrSBwxZnDrXBhZHUsIHRhayBzZSBuZXpvYnJhesOtIGZpbHRyIHR5cCBwb2hsZWTDoXZreVxyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZGRwc3RwcCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3BobD12YWx1ZS50eXBfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IHR5cF9waGw6IHRoYXQudHlwUGhsIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB7IHR5cF9waGw6IHRoYXQudHlwUGhsIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcm0uYWRkUm93KFwiUG/FmS4gxI3DrXNsb1wiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG9yX2Npc2xvXCIsXHJcbiAgICAgICAgICAgICAgICBhbGxvd2VkQ2hhcnM6IFwiMDEyMzQ1Njc4OVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IHZ5bcOhaMOhbsOtXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Quc3RhdlZ5bWFoYW5pKCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl92eW1cIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfdnltID0gdmFsdWUuc3Rhdl92eW1cIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl92eW1fbm9uXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJOZW3DoSBzdGF2IHZ5bcOhaMOhbsOtIChuZWdhY2UgdsO9YsSbcnUpXCIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IHZ5bcOhaMOhbsOtIC0gb2RrYXpcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5zdGF2VnltYWhhbmkoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Z5bV9vbGRcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfdnltX29sZCA9IHZhbHVlLnN0YXZfdnltXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgZG9ydcSNZW7DrVwiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcGNzZG8oKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X2RvcnVjXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zdGF2X2RvcnVjID0gdmFsdWUuc3Rhdl9kb3J1Y1wiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IHRpc2t1XCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZWtvY3RpcygpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNfdGlzXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zX3RpcyA9IHZhbHVlLnNfdGlzXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIkFrdGl2aXRhXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZWtvY2FrdCgpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5ha3Rpdml0YSA9IHZhbHVlLmVrb19ha3RcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiU3RhdiB2eXByYXZlbsOtXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZ2luY3BhbigpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInZ5cHJhdmVub1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudnlwcmF2ZW5vID0gdmFsdWUucHJpel9hblwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvciB2eW3DoWjDoW7DrVwiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX252eVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJWU1wiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidnNcIixcclxuICAgICAgICAgICAgICAgIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCIsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMTIgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJBQ1wiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNcIixcclxuICAgICAgICAgICAgICAgIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCIsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMjAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJabmHEjWthXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjal92eW1cIixcclxuICAgICAgICAgICAgICAgIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCIsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMzAgfSldXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJTa3VwaW5hIHZ5bcOhaMOhbsOtXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZGRwc3NrdigpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19za3ZcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19za3YgPSB2YWx1ZS5peHNfc2t2XCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgaW5zb2x2ZW5jZVwiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmdpbmNpc3IoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkcnVoX3N0YXZfcml6ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5kcnVoX3N0YXZfcml6ZW5pID0gdmFsdWUuZHJ1aF9zdGF2X3JpemVuaVwiLFxyXG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntkcnVoX3N0YXZfcml6ZW5pfSAtIHtkcnVoX3N0YXZfcl90eHR9XCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IFByaWRlalZzZWNobnlTdGF2eUluc29sdmVuY2U6IHRydWUsIFByaWRlak5lbmlWSW5zb2x2ZW5jaTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllIGRvIGZpbHRydSAtIFNsb8W+ZW7DrSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtU2xvemVuaVZ5bWFoYW5pKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlNsb8W+ZW7DrSB2eW3DoWjDoW7DrVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUMWZw61wYWRcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwZXBfcGlkXCIsIC8vaXhwX2RkcD9cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIHBvaHlidVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBlcF9rdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucGVwX2t0Z191cG8gPSB2YWx1ZS5rdGdfdXBvXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gc3BsYXRub3N0aVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGVwX2RhdF9zcGxfMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGVwX2RhdF9zcGxfMVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlByaW9yaXRhIMO6aHJhZHlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGVwX3ByaV91aHJfMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBlcF9wcmlfdWhyXzFcIixcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd2VkQ2hhcnM6IFwiMDEyMzQ1Njc4OVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgZG8gZmlsdHJ1IC0gUMWZZWRwaXN5IHZ5bcOhaGFuw6lobyBwxZnDrXBhZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybVByZWRwaXN5VnltUHJpcCgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJQxZllZHBpc3kgdnltw6FoYW7DqWhvIHDFmcOtcGFkdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gdnpuaWt1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdnpuaWt1XzBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92em5pa3VfMVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHNwbGF0bm9zdGlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9zcGxfMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbF8xXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmVkcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTZcIixcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6ICdtw6EgcMWZZWRwaXN5JyB9LCAvL2Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAwLCBsYWJlbDogJ25lbcOhIHDFmWVkcGlzeScgfSwgLy9uZVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogMVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllIGRvIGZpbHRydSAtIFBsYXRieSB2eW3DoWhhbsOpaG8gcMWZw61wYWR1XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm1QbGF0YnlWeW1QcmlwKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlBsYXRieSB2eW3DoWhhbsOpaG8gcMWZw61wYWR1XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBiYW5reVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Vocl8wXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdWhyXzFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSB6YXBsYWNlbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfemFwXzBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96YXBfMVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGxhdGJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogJ23DoSBwbGF0YnknIH0sIC8vYW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiAnbmVtw6EgcGxhdGJ5JyB9LCAvL25lXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiAxXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgZG8gZmlsdHJ1IC0gWnByYWNvdmF0ZWxcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybVpwcmFjb3ZhdGVsKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlpwcmFjb3ZhdGVsXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTlcIiwgUHJlZmFicy5TZWxlY3QuZGRwWnByYWNvdmF0ZWwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9jaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZnVuX2NpbCA9IHZhbHVlLml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX2NpbF9oaXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSGlzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllIGRvIGZpbHRydSAtIEVsZWt0cm9uaWNrw70gb2JyYXpcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybUVsT2JyYXooKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiRWxla3Ryb25pY2vDvSBvYnJhelwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZWxfb2JyYXpcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy00XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDIsIGxhYmVsOiAnbmVicmF0IHYgw7p2YWh1JyB9LCAvL2FubyBpIG5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiAnbcOhIGVsLiBvYnJheicgfSwgLy9hbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6ICduZW3DoSBlbC4gb2JyYXonIH0sIC8vbmVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IDJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllIGRvIGZpbHRydSAtIERhdG92w6Egc2NocsOhbmthXHJcbiAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtRFMoKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiRGF0b3bDoSBzY2hyw6Fua2FcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcInctNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAyLCBsYWJlbDogJ25lYnJhdCB2IMO6dmFodScgfSwgLy9hbm8gaSBuZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogJ23DoSBJRCBEUycgfSwgLy9hbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6ICduZW3DoSBJRCBEUycgfSwgLy9uZVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogMlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgKiBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSBkbyBmaWx0cnUgLSBQxZnDrXpuYWt5IHZ5bcOhaMOhbsOtXHJcbiAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybVByaXpuYWt5VnltKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJwcml6bmFreVZ5bUZvcm1cIiwgdGFiTGFiZWw6IFwiUMWZw616bmFreSB2eW3DoWjDoW7DrVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiamVfdmVfc3Bpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJWeW3DoWjDoW7DrSBqZSB2ZSBzcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRPcHBvc2l0ZUNoZWNrRmFsc2UoXCJuZW5pX3ZlX3NwaXN1XCIsIG9iai52YWx1ZSwgZXYsIFwicHJpem5ha3lWeW1Gb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmVuaV92ZV9zcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5bcOhaMOhbsOtIG5lbsOtIHZlIHNwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE9wcG9zaXRlQ2hlY2tGYWxzZShcImplX3ZlX3NwaXN1XCIsIG9iai52YWx1ZSwgZXYsIFwicHJpem5ha3lWeW1Gb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZW1hX2RzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVnltw6Fow6Fuw60gbmVtw6EgZG90xI1lbsO9IHN1Ympla3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0T3Bwb3NpdGVDaGVja0ZhbHNlKFwibWFfdmljZV9kc1wiLCBvYmoudmFsdWUsIGV2LCBcInByaXpuYWt5VnltRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1hX3ZpY2VfZHNcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJWeW3DoWjDoW7DrSBtw6EgdsOtY2UgZG90xI1lbsO9Y2ggc3ViamVrdMWvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE9wcG9zaXRlQ2hlY2tGYWxzZShcIm5lbWFfZHNcIiwgb2JqLnZhbHVlLCBldiwgXCJwcml6bmFreVZ5bUZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkaWxjaV92eXBvY2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG91emUgZMOtbMSNw60gdsO9cG/EjXR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE9wcG9zaXRlQ2hlY2tGYWxzZShcImRpbGNpX3Z5cG9jZXRfbm9uXCIsIG9iai52YWx1ZSwgZXYsIFwicHJpem5ha3lWeW1Gb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGlsY2lfdnlwb2NldF9ub25cIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJCZXogZMOtbMSNw61jaCB2w71wb8SNdMWvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE9wcG9zaXRlQ2hlY2tGYWxzZShcImRpbGNpX3Z5cG9jZXRcIiwgb2JqLnZhbHVlLCBldiwgXCJwcml6bmFreVZ5bUZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfcHJpel91bXJ0aVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBvcGxhdG7DrWsgemVtxZllbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRPcHBvc2l0ZUNoZWNrRmFsc2UoXCJlc3VfcHJpel9uZXVtcnRpXCIsIG9iai52YWx1ZSwgZXYsIFwicHJpem5ha3lWeW1Gb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3ByaXpfbmV1bXJ0aVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBvcGxhdG7DrWsgxb5pamVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0T3Bwb3NpdGVDaGVja0ZhbHNlKFwiZXN1X3ByaXpfdW1ydGlcIiwgb2JqLnZhbHVlLCBldiwgXCJwcml6bmFreVZ5bUZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfcHJpel9zbGVkb3ZhbmlfaXN6clwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBvcGxhdG7DrWsgSkUgcMWZaWhsw6HFoWVuIGsgb2RixJtydSB6bcSbbiBJU1pSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE9wcG9zaXRlQ2hlY2tGYWxzZShcImVzdV9wcml6X3NsZWRvdmFuaV9pc3pyX25lXCIsIG9iai52YWx1ZSwgZXYsIFwicHJpem5ha3lWeW1Gb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3ByaXpfc2xlZG92YW5pX2lzenJfbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb3BsYXRuw61rIE5FTsONIHDFmWlobMOhxaFlbiBrIG9kYsSbcnUgem3Em24gSVNaUlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRPcHBvc2l0ZUNoZWNrRmFsc2UoXCJlc3VfcHJpel9zbGVkb3ZhbmlfaXN6clwiLCBvYmoudmFsdWUsIGV2LCBcInByaXpuYWt5VnltRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV9wcml6X292ZXJlbl9pc3pyX25lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG9wbGF0bsOtayBORU7DjSBvdsSbxZllbiBJU1pSXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmxhc3RuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlpvYnJheml0IHBvdXplIHZsYXN0bsOtXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllIGRvIGZpbHRydSAtIEludGVydmFseVxyXG4gICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybUludGVydmFseSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJJbnRlcnZhbHlcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIG9kXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfb2RfMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X29kXzFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBkb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2RvXzBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb18xXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gZ2VuZXJvdsOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdnlzdF8wXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdnlzdF8xXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gbmFyb3plbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfZGF0X25hcl8wXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfZGF0X25hcl8xXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gw7ptcnTDrSAvIHVrb27EjWVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV9kYXRfdW1ydGlfMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X2RhdF91bXJ0aV8xXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSBkbyBmaWx0cnUgLSBLbMOtxI1vdsOhIHNsb3ZhXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm1LbGljb3ZhU2xvdmEoKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJrbGljb3ZhU2xvdmFGb3JtXCIsIHRhYkxhYmVsOiBcIktsw63EjW92w6Egc2xvdmFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIktsw63EjW92w6Egc2xvdmFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTlcIiwgUHJlZmFicy5TZWxlY3Qud2ZsS2xpY1Nsb3ZhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtsX3Nsb3ZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua2xfc2xvdm8gPSB2YWx1ZS5rbF9zbG92b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgdHlwX2FnOiAzNTAsIGFrdGl2aXRhOiAxMDB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtsaWNvdmFfc2xvdmFfbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJOZW3DoSBrbMOtxI1vdsOhIHNsb3ZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2xpY292YVNsb3ZhRm9ybSA9ICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZvcm1zKFwia2xpY292YVNsb3ZhRm9ybVwiKVsxXTsgLy9qZSB0byBbMV0gamVsaWtvxb4gc2UgdGVuIGZpbHRlcnBhbmVsIG7Em2phayBibGLEmyB2eXR2w6HFmcOtIGEganNvdSB0YW0gdHlobGUgZm9ybXVsw6HFmWUgZHZha3LDoXQgKGplZG5vdSBqYWtvIHZlIGZpbHRlcnBhbmVsdSBhIGplZG5vdSB2IGRldGFpbHUgZmlsdGVycGFuZWx1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGtsaWNvdmFTbG92YUZvcm0pLmZpbmRGaWVsZHMoXCJrbGljb3ZhX3Nsb3ZhXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChrbGljb3ZhU2xvdmFGb3JtKS5maW5kRmllbGRzKFwia2xpY292YV9zbG92YVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChrbGljb3ZhU2xvdmFGb3JtKS5maW5kRmllbGRzKFwia2xpY292YV9zbG92YVwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2TFoWtydG5lIG5la29tcGF0aWJpbG7DrSAoMiBjaGVja2JveHkgc2UgbmF2esOhamVtIHJ1xaHDrSkgY2hlY2tib3h5XHJcbiAgICAgICAgICogQHBhcmFtIG9wcG9zaXRlRmllbGROYW1lXHJcbiAgICAgICAgICogQHBhcmFtIGN1cnJlbnRGaWVsZFZhbHVlXHJcbiAgICAgICAgICogQHBhcmFtIGV2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0T3Bwb3NpdGVDaGVja0ZhbHNlKG9wcG9zaXRlRmllbGROYW1lOiBzdHJpbmcsIGN1cnJlbnRGaWVsZFZhbHVlOiBib29sZWFuIHwgbnVsbCwgZXY6IGFueSwgZm9ybTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50RmllbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm11bGFyID0gJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRm9ybXMoZm9ybSlbMV07IC8vamUgdG8gWzFdIGplbGlrb8W+IHNlIHRlbiBmaWx0ZXJwYW5lbCBuxJtqYWsgYmxixJsgdnl0dsOhxZnDrSBhIGpzb3UgdGFtIHR5aGxlIGZvcm11bMOhxZllIGR2YWtyw6F0IChqZWRub3UgamFrbyB2ZSBmaWx0ZXJwYW5lbHUgYSBqZWRub3UgdiBkZXRhaWx1IGZpbHRlcnBhbmVsdSlcclxuICAgICAgICAgICAgICAgICQoZm9ybXVsYXIpLmZpbmRGaWVsZHMob3Bwb3NpdGVGaWVsZE5hbWUpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBBa2NlIHYgbWVudUJhcnVcclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZnDrSBub3bDqSB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIHByaXZhdGUgbm92ZVZ5bWFoYW5pKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgZHRvVnltOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGR0b1Z5bS5peHBfZGRwID0gdGhhdC5EdG9QcmlwYWR1Lml4cDtcclxuICAgICAgICAgICAgZHRvVnltLnR5cF9waGwgPSB0aGF0LkR0b1ByaXBhZHUudHlwX3BobDtcclxuICAgICAgICAgICAgZHRvVnltLml4c19mdW5fYWt0ID0gdGhhdC5EdG9QcmlwYWR1Lml4c19mdW5fYWt0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQucGFyYW1zLmRkcF92eW1fcG92c2t2ICE9IFwiXCIgJiYgdGhhdC5wYXJhbXMuZGRwX3Z5bV9wb2Vza3YgPT0gXCJcIikgeyBcclxuICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVuw60gcG92b2xlbmEgxb7DoWRuw6Egc2t1cGluYSB2eW3DoWjDoW7DrSBwcm8gcG/FmcOtemVuw60gdnltw6Fow6Fuw60hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5wYXJhbXMuZGRwX2dlbl9peHB2eW0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIGplIHBhcmFtZXRyIG5hc3RhdmVuIG5hIGhvZG5vdHUgMCwgdGFrIG1hbnXDoWxuxJsgemFkw6F2w6FtZSBpZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgICAgIC8vIChwb2t1ZCBqZSAxLCB0YWsgc2UgZ2VuZXJ1amUsIGFsZSB0byBqZSBhxb4gbmEgc2VydmVydSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgR29yZGljLlByZWZhYnMuU3RyaW5nLml4cyh0cnVlKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KGBHbG9iYWwuV2ZsLkFwcFNldHRpbmdzLk90aGVyc1NldHRpbmdzLlByZWRwbG5lbmlQSURgKSA/PyBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaW1wbGVGb3JtKFwiWmFkw6Fuw60gaWRlbnRpZmlrw6F0b3J1XCIsIGZvcm0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfb2JqLCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvVnltLml4cF9udnkgPSByZXRWYWwuaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb2RhbmlWeW1haGFuaShkdG9WeW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucG9kYW5pVnltYWhhbmkoZHRvVnltKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmF2b2zDoW7DrSBmdW5rY2UgcG9kw6Fuw60gdnltw6Fow6Fuw60gbmEgc2VydmVydVxyXG4gICAgICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb2RhbmlWeW1haGFuaShkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwicG9kYW5pVnltYWhhbmlcIiwgdGV4dDogXCJQcm9iw61ow6EgcG9kw6Fuw60gdnltw6Fow6Fuw60uLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAucG9kYW5pVnltYWhhbmlTZXpuYW1WeW0oeyBkYXRhOiBkYXRhIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAxMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGV0YWlsVnltYWhhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogXCJERFBHRGV0YWlsVnltYWhhbmkjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwTnZ5OiByZXN1bHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKS5vbihcImNsb3NlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIk5lcG92ZWRsbyBzZSBwb2RhdCB2eW3DoWjDoW7DrSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJwb2RhbmlWeW1haGFuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBBa2NlICd2eW3DoWjDoW7DrScgLSBBdXRvbWF0aWNrw6kgZ2VuZXJvdsOhbsOtIHZ5bcOhaMOhbsOtIHBybyB2eWJyYW7DvSBwxZnDrXBhZCBERFAuLi5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmljaWFsaXphY2UgaG9kbm90IHBybyBmb3JtdWzDocWZIGhyb21hZG7DqSBha2NlIFwidnltw6Fow6Fuw61cIlxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pY2lhbG5pSG9kbm90eVByb0Zvcm11bGFyVnltYWhhbmkobW9kZWxEYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdF9vZDogYW55O1xyXG4gICAgICAgICAgICB2YXIgZGF0X2RvOiBhbnk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3JtcyhcIndpelBhcmFtc1wiKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gJChmb3JtKTtcclxuICAgICAgICAgICAgJC5jb250ZW50KGN1cnJlbnRFbGVtZW50KS5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImluaWNpYWxuaUhvZG5vdHlQcm9Gb3JtdWxhclZ5bWFoYW5pXCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIG5hc3RhdmVuw60uLi5cIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnZ5bWFoYXREYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5leGlzdHVqZU5hc3RhdmVuaUV4ZWt1Y2UoeyB0eXBQaGw6IHRoYXQudHlwUGhsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGV4aXN0dWplKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXhpc3R1amUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLmZpbmRGaWVsZHMoXCJleGVrdWNlXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBpeHNfc2t2OiBtb2RlbERhdGEuaXhzX3NrdiwgbmF6ZXY6IG1vZGVsRGF0YS5peHNfc2t2X25hemV2LCBiYXJ2YTogbW9kZWxEYXRhLmJhcnZhIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJhbGdvcml0bXVzXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYWxnX3Z5bTogbW9kZWxEYXRhLmFsZ192eW0sIGFsZ192eW1fdHh0OiBtb2RlbERhdGEuYWxnX3Z5bV90eHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdnltXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgc3Rhdl92eW06IG1vZGVsRGF0YS5zdGF2X3Z5bSwgc3Rhdl92eW1fdHh0OiBtb2RlbERhdGEuc3Rhdl92eW1fdHh0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bV9vbGRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzdGF2X3Z5bTogbW9kZWxEYXRhLnN0YXZfdnltX29sZCwgc3Rhdl92eW1fdHh0OiBtb2RlbERhdGEuc3Rhdl92eW1fb2xkX3R4dCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZGF0dW1cIikuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCB7IHN0YXJ0OiBtb2RlbERhdGEuZGF0X29kLCBlbmQ6IG1vZGVsRGF0YS5kYXRfZG8gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZ5bWFoYXREYWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KGN1cnJlbnRFbGVtZW50KS5lbmRPcGVyYXRpb24oeyBpZDogXCJpbmljaWFsbmlIb2Rub3R5UHJvRm9ybXVsYXJWeW1haGFuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBha2NlICd2eW3DoWjDoXQnIGEgJ1Z5bcOhaGF0IHpub3Z1J1xyXG4gICAgICAgICAgICAgICAgLy8gUG9rdWQgc2UgamVkbsOhIG8gdnltw6FoYXQgem5vdnUsIG1vZGVsRGF0YSBidWRlIG5hcGxuxJtuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5zdHJpa3RuaVJlemltKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAudnJhdERhdHVteVBvc2xlZG5paG9Lcm9rdVZ5bWFoYW5pKHsgaWQ6IHRoYXQuRHRvUHJpcGFkdS5peHAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChkYXR1bXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXR1bXkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF9vZCA9IGRhdHVteVswXS5kYXRfb2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X2RvID0gZGF0dW15WzBdLmRhdF9kbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJkYXR1bVwiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHsgc3RhcnQ6IGRhdF9vZCwgZW5kOiBkYXRfZG8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KGN1cnJlbnRFbGVtZW50KS5lbmRPcGVyYXRpb24oeyBpZDogXCJpbmljaWFsbmlIb2Rub3R5UHJvRm9ybXVsYXJWeW1haGFuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5leGlzdHVqZU5hc3RhdmVuaUV4ZWt1Y2UoeyB0eXBQaGw6IHRoYXQudHlwUGhsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGV4aXN0dWplKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXhpc3R1amUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLmZpbmRGaWVsZHMoXCJleGVrdWNlXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhvZGlsIHNlbSBzZW1rYSB2bG/FvmVuw60gaW5pY2nDoWxuw61jaCBob2Rub3QgcHJvIHNrdXBpbnUgYSBhbGdvcml0bXVzIHZ5bcOhaMOhbsOtLCBqZWxpa2/FviB0byBuYXN0YW5lIGHFviBwbyBvdGV2xZllbsOtIHdpemFyZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnN0cmlrdG5pUmV6aW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBza3VwaW5hID0gdGhhdC5nbG9iYWxTZXR0aW5ncyEuZ2V0KGBHbG9iYWwuRGRwLkdlbmVyYWNlVnltYWhhbmlTZXR0aW5ncy5Ta3VwaW5hJHt0aGF0Lml4cERlbn0ke3RoYXQudHlwUGhsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFsZ29yaXRtdXM6IGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza3VwaW5hICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGdvcml0bXVzID0gdGhhdC5nbG9iYWxTZXR0aW5ncyEuZ2V0KGBHbG9iYWwuRGRwLkdlbmVyYWNlVnltYWhhbmlTZXR0aW5ncy5BbGdvcml0bXVzJHt0aGF0Lml4cERlbn0ke3RoYXQudHlwUGhsfSR7c2t1cGluYS5peHNfc2t2fWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgc2t1cGluYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWxnb3JpdG11c1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBhbGdvcml0bXVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobW9kZWxEYXRhKS5sZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHN0YXZfdnltOiBtb2RlbERhdGEuc3Rhdl92eW0sIHN0YXZfdnltX3R4dDogbW9kZWxEYXRhLnN0YXZfdnltX3R4dCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bV9vbGRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzdGF2X3Z5bTogbW9kZWxEYXRhLnN0YXZfdnltX29sZCwgc3Rhdl92eW1fdHh0OiBtb2RlbERhdGEuc3Rhdl92eW1fb2xkX3R4dCB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgJ29ibm92dWplJyB2eW3DoWjDoW7DrSwgdGFrIGplIHBvdMWZZWJhIG9kc3RyYW5pdCBmdWtjZSBrdGVyw6kgc2UgbmEgc29ixJsgesOhdmlzbMOpLCBqZWxpa2/FviBwb2t1ZCBzZSBob2TDrSBkbyBtb2RlbHUgdGFrIHRvIGjDoXrDrSBlcnJvcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLml4c19za3Y7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsRGF0YS5uYXpldl9za3VwaW5hO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuYmFydmE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsRGF0YS5hbGdfdnltO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuYWxnX3Z5bV90eHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsRGF0YS5zdGF2X3Z5bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLnN0YXZfdnltX3R4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLnN0YXZfdnltX29sZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLnN0YXZfdnltX29sZF90eHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KCkuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbW9kZWxEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2t1cGluYSAhPSBudWxsKSB7IC8vIFBva3VkIHNlIG5lb2Jub3Z1amUsIHRhayBzZSBuYXN0YXbDrSB2w71jaG96w60gaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrcm9rVnltRmllbGQgPSBmb3JtLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrcm9rVnltRmllbGQuZ2ZpZWxkKFwiZ2V0U2VydmVyRmlsdGVyc1wiKS50aGVuKChzZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuS3Jva3lWeW1Ob3ZlVnltKCkuZ2V0RGF0YShzZikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnLDoWNlbsOtIGhvZG5vdCBwb2zDrcSNa2EgcyBha3R1w6FsbsOtbWkgc2VydmVyb3bDvW1pIGZpbHRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHN0YXZWeW0pID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwbyB2csOhY2Vuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga3Jva1Z5bUZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIHN0YXZWeW1bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbmFzdGF2w61tZSB2xaFlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgc2UgbmVvYm5vdnVqZSwgdGFrIHNlIG5hc3RhdsOtIHbDvWNob3rDrSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNrdXBpbmFGaWVsZCA9IGZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2t1cGluYUZpZWxkLmdmaWVsZChcImdldFNlcnZlckZpbHRlcnNcIikudGhlbigoc2YpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLlNrdXBpbmFWeW1haGFuaU5vdmVWeW0oKS5nZXREYXRhKHNmKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2csOhY2Vuw60gaG9kbm90IHBvbMOtxI1rYSBzIGFrdHXDoWxuw61taSBzZXJ2ZXJvdsO9bWkgZmlsdHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoc2t1cGluYSkgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvIHZyw6FjZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza3VwaW5hRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgc2t1cGluYVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0SW5pdFZhbHVlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyAvLyBzdHJpa3Ruw60gcmXFvmltXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBqZSBzdHJpa3Ruw60gcmXFvmltLCB0YWsgc2UgbmVwb3XFvsOtdsOhIHVzZXJTZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1vZGVsRGF0YSkubGVuZ3RoICE9IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiaXhzX3NrdlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGl4c19za3Y6IG1vZGVsRGF0YS5peHNfc2t2LCBuYXpldjogbW9kZWxEYXRhLm5hemV2X3NrdXBpbmEsIGJhcnZhOiBtb2RlbERhdGEuYmFydmEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiYWxnb3JpdG11c1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGFsZ192eW06IG1vZGVsRGF0YS5hbGdfdnltLCBhbGdfdnltX3R4dDogbW9kZWxEYXRhLmFsZ192eW1fdHh0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdnltXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgc3Rhdl92eW06IG1vZGVsRGF0YS5zdGF2X3Z5bSwgc3Rhdl92eW1fdHh0OiBtb2RlbERhdGEuc3Rhdl92eW1fdHh0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdnltX29sZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHN0YXZfdnltOiBtb2RlbERhdGEuc3Rhdl92eW1fb2xkLCBzdGF2X3Z5bV90eHQ6IG1vZGVsRGF0YS5zdGF2X3Z5bV9vbGRfdHh0IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSAnb2Jub3Z1amUnIHZ5bcOhaMOhbsOtLCB0YWsgamUgcG90xZllYmEgb2RzdHJhbml0IGZ1a2NlIGt0ZXLDqSBzZSBuYSBzb2LEmyB6w6F2aXNsw6ksIGplbGlrb8W+IHBva3VkIHNlIGhvZMOtIGRvIG1vZGVsdSB0YWsgdG8gaMOhesOtIGVycm9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuaXhzX3NrdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLm5hemV2X3NrdXBpbmE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsRGF0YS5iYXJ2YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLmFsZ192eW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsRGF0YS5hbGdfdnltX3R4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLnN0YXZfdnltO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuc3Rhdl92eW1fdHh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuc3Rhdl92eW1fb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuc3Rhdl92eW1fb2xkX3R4dDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBtb2RlbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBzZSBuZW9ibm92dWplLCB0YWsgc2UgbmFzdGF2w60gdsO9Y2hvesOtIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2t1cGluYUZpZWxkID0gZm9ybS5maW5kRmllbGRzKFwiaXhzX3NrdlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza3VwaW5hRmllbGQuZ2ZpZWxkKFwiZ2V0U2VydmVyRmlsdGVyc1wiKS50aGVuKChzZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuU2t1cGluYVZ5bWFoYW5pTm92ZVZ5bSgpLmdldERhdGEoc2YpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZyw6FjZW7DrSBob2Rub3QgcG9sw63EjWthIHMgYWt0dcOhbG7DrW1pIHNlcnZlcm92w71taSBmaWx0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChza3VwaW5hKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG8gdnLDoWNlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNrdXBpbmFGaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBza3VwaW5hWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRJbml0VmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoY3VycmVudEVsZW1lbnQpLmVuZE9wZXJhdGlvbih7IGlkOiBcImluaWNpYWxuaUhvZG5vdHlQcm9Gb3JtdWxhclZ5bWFoYW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogTmFzdGF2ZW7DrSB2w71jaG96w61jaCBob2Rub3QgcHJvIGZvcm11bMOhxZkgaHJvbWFkbsOpIGFrY2UgXCJ2eW3DoWjDoW7DrVwiLCBwb2t1ZCBzZSB6bcSbbsOtIHNrdXBpbmFcclxuICAgICAgICAqL1xyXG4gICAgICAgIHNldEluaXRWYWx1ZXMoKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJC5jb250ZW50KCkuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFsZ0ZpZWxkID0gZm9ybS5maW5kRmllbGRzKFwiYWxnb3JpdG11c1wiKTtcclxuICAgICAgICAgICAgYWxnRmllbGQuZ2ZpZWxkKFwiZ2V0U2VydmVyRmlsdGVyc1wiKS50aGVuKChzZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLkRkcGNhZ3YoKS5nZXREYXRhKHNmKVxyXG4gICAgICAgICAgICB9KS50aGVuKChhbGcpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsZ0ZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIGFsZ1swXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGtyb2tWeW1GaWVsZCA9IGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdnltXCIpO1xyXG4gICAgICAgICAgICBrcm9rVnltRmllbGQuZ2ZpZWxkKFwiZ2V0U2VydmVyRmlsdGVyc1wiKS50aGVuKChzZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLktyb2t5VnltTm92ZVZ5bSgpLmdldERhdGEoc2YpXHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHN0YXZWeW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGtyb2tWeW1GaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBzdGF2VnltWzBdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGb3JtdWzDocWZIHBybyBocm9tYWRub3UgYWtjaSBcInZ5bcOhaMOhbsOtXCJcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvcm11bGFyVnltYWhhbmkobW9kZWxEYXRhOiBhbnkpOiBhbnkgeyAvLyB2eW1haGFuaV9qZWRlbiwgZGxnX3Z5bWFoYW5pX3BhclxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIFBva3VkIGplIG1vZGVsRGF0YSBuYXBsbsSbbiwgem5hbWVuw6EgdG8gxb5lIHNlIG9wYWt1amUgYWtjZSwgdHVkw63FviBuZW7DrSBudXRuw6kgcMWZZWRuYXN0YXZpdFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy90aGF0LmluaWNpYWxuaUhvZG5vdHlQcm9Gb3JtdWxhclZ5bWFoYW5pKG1vZGVsRGF0YSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxIExNUy0zLTctMlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIk5hc3RhdmVuw60gdsO9cG/EjXR1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU2t1cGluYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5za3VwaW5hVnltYWhhbmlOb3ZlVnltKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19za3ZcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfc2t2ID0gdmFsdWUuaXhzX3NrdiwgbW9kZWwubmF6ZXZfc2t1cGluYSA9IHZhbHVlLm5hemV2LCBtb2RlbC5iYXJ2YSA9IHZhbHVlLmJhcnZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY0lucHV0OiBcImhpZGRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBHb3JkaWMuQ29tcG9uZW50cy5HRmllbGRBc3Npc3QuaWdub3JlQ2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHRoYXQuRHRvUHJpcGFkdS50eXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhhdC5EdG9QcmlwYWR1Lml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZyA9IGRhdGE/LmJhcnZhICE9IG51bGwgPyBgYmFja2dyb3VuZC1jb2xvcjogJHtDb21tb24uQmFzZS5HZXRIZXhDb2xvcihkYXRhPy5iYXJ2YSl9O2AgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyO1wiPjxkaXYgc3R5bGU9XCIke2JnfSBoZWlnaHQ6IDE4cHg7IHdpZHRoOiAxOHB4OyBib3JkZXI6IDFweCBzb2xpZCBncmF5OyBtYXJnaW4tcmlnaHQ6IDVweDtcIj48L2Rpdj4ke2RhdGE/Lm5hemV2fTwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIHNlIHptxJtuw60gc2t1cGluYSB2eW3DoWjDoW7DrSwgdGFrIGppIHVsb8W+w61tZSBkbyB1c2Vyc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZSAhPSBudWxsICYmICF0aGF0LnN0cmlrdG5pUmV6aW0pIHRoYXQuZ2xvYmFsU2V0dGluZ3MhLnNldChgR2xvYmFsLkRkcC5HZW5lcmFjZVZ5bWFoYW5pU2V0dGluZ3MuU2t1cGluYSR7dGhhdC5peHBEZW59JHt0aGF0LnR5cFBobH1gLCBvYmoudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEluaXRWYWx1ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFsZ29yaXRtdXNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZGRwY2FndigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhbGdvcml0bXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuYWxnX3Z5bSA9IHZhbHVlLmFsZ192eW0sIG1vZGVsLmFsZ192eW1fdHh0ID0gdmFsdWUuYWxnX3Z5bV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxnX3Z5bTogXCIhPSAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19za3Y6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcIml4c19za3ZcIiwgXCJpeHNfc2t2XCIsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIHNlIHptxJtuw60gYWxnb3JpdG11cywgdGFrIGppIHVsb8W+w61tZSBkbyB1c2Vyc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2t1cGluYSA9ICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpLmZpbmRGaWVsZHMoXCJpeHNfc2t2XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNrdXBpbmEgIT0gbnVsbCAmJiAhdGhhdC5zdHJpa3RuaVJlemltKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nbG9iYWxTZXR0aW5ncyEuc2V0KGBHbG9iYWwuRGRwLkdlbmVyYWNlVnltYWhhbmlTZXR0aW5ncy5BbGdvcml0bXVzJHt0aGF0Lml4cERlbn0ke3RoYXQudHlwUGhsfSR7c2t1cGluYS5peHNfc2t2fWAsIG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXR1bUZpZWxkID0gJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKFwiZGF0dW1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5lbcSbbG8gYnkgdsWvYmVjIG5hc3RhdCwgYWxlIGplIHRvIHYgR1VQVMSaIDpQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWU/LmFsZ192eW0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0dW1GaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0dW1GaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtRmllbGQuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJbnRlcnZhbCB2w71wb8SNdHVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdpbnRlcnZhbGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXR1bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFwb2plbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJEbHVoIHBvxI3DrXRhdCBzIG5hcG9qZW7DvW1pIHDFmcOtcGFkeVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGlsY2lfdnlwb2NldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlrDoXpuYW0gbyB2eW3DoWjDoW7DrSBuZWJ1ZGUgb2Rlc8OtbMOhbiwgZMOtbMSNw60gdnlwb8SNZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIHNlIGplZG7DoSBvIGTDrWzEjcOtIHbDvXBvxI1ldCwgbmVidWRlIHNlIGdlbmVyb3ZhdCB2eW3DoWjDoW7DrSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVidWRlIHNlIHZrbMOhZGF0IGRvIHNwaXN1IGFwb2QuIEplZG7DoSBzZSBwb3V6ZSBvIHbDvXBvxI1ldCDEjcOhc3RreSB6YSByb2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWxjaVZ5cG9jZXQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGaWVsZHMoXCJmb3JtYXRfY2pcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcyhcImZvcm1hdF9jalwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBcIsSMSiBzZSBuZWJ1ZGUgZ2VuZXJvdmF0Li4uIEplIG5hc3RhdmVuIGTDrWzEjcOtIHbDvXBvxI1ldC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpbGNpVnlwb2NldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGb3JtcyhcIndpelBhcmFtc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF2VnltRmllbGQgPSBmb3JtLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF2VnltRmllbGQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2Rm9ybWF0Q0ooZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGaWVsZHMoXCJmb3JtYXRfY2pcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7bmFtZTogXCJsb2thbGl6YWNlXCJ9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzZV9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJWeW3DoWhhdCBkYWzFocOtIHDFmcOtcGFkeSBwb3BsYXRuw61rYSAoc2xvdcSNLiB2eW3DoWjDoW7DrSlcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZGVmTWFQcmlwYWR5LnN0YXRlKCkgPT0gXCJyZXNvbHZlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZSAmJiB0aGF0Lm1hUHJpcGFkeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VnliZXJQcmlwYWR1Py5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RWeWJlclByaXBhZHU/LnVwZGF0ZSh7IHRvb2x0aXA6IFwiUMWZw61wYWQgbmVtw6Egxb7DoWRuw6kgZGFsxaHDrSBwxZnDrXBhZHlcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFZ5YmVyUHJpcGFkdT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoZXYudGFyZ2V0KS5zaG93Rmxhc2goXCJOYcSNw610w6Fuw60gcMWZw61wYWTFryBqZcWhdMSbIG5lbsOtIGhvdG92w6ksIHprdXN0ZSB0byBvIGNodsOtbGkgcG96ZMSbamkuXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi50YXJnZXQpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFphbmVjaGF0IHBvdXplIHR5IHBvbG/Fvmt5LCBrdGVyw6kgbmVqc291IHYgJ3ByaXBhZHlWeW1haGFuaU5hcG9qZW5lJy4gKGplbGlrb8W+IHNlIHpydcWhaWxhIHZvbGJhICd2c2VfcGhsJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJpcGFkeVZ5bWFoYW5pID0gdGhhdC5wcmlwYWR5VnltYWhhbmkuZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2eW1haGFuaTogYW55KSA9PiAhdGhhdC5wcmlwYWR5VnltYWhhbmlOYXBvamVuZS5zb21lKChuYXBvamVueTogYW55KSA9PiBuYXBvamVueS5peHAgPT09IHZ5bWFoYW5pLml4cClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmlwYWR5VnltYWhhbmlOYXBvamVuZSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhhdC5wcmlwYWR5VnltYWhhbmkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFZ5YmVyUHJpcGFkdT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2l6R3JpZCA9ICQuY29udGVudCgpLmZpbmQoXCJbZGF0YS1oZWxwLWNvbnRleHQ9J2xpc3Q6d2l6R3JpZCddXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l6R3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJMb2thbGl6YWNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkRlZmluaWNlIGtyb2t1IHZ5bcOhaMOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS3JvayB2eW3DoWjDoW7DrSBwcm9jZXN1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0Lmtyb2t5VnltTm92ZVZ5bSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Z5bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfdnltID0gdmFsdWUuc3Rhdl92eW0sIG1vZGVsLnN0YXZfdnltX3R4dCA9IHZhbHVlLnN0YXZfdnltX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19za3Y6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcIml4c19za3ZcIiwgXCJpeHNfc2t2XCIsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhhdC5EdG9QcmlwYWR1Lml4cFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlPy5zdGF2X3Z5bSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdlZ5bSA9IG9iai52YWx1ZT8uc3Rhdl92eW07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaWQgPSB0aGF0LkR0b1ByaXBhZHUuaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmFrdGl2aXRhID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnR5cCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybS5maW5kRmllbGRzKFwiaXhzX3NrdlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9PSBudWxsKSBmaWx0ZXIuaXhzX3NrdiA9IG1vZGVsRGF0YS5peHNfc2t2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBmaWx0ZXIuaXhzX3NrdiA9IGZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikuaXhzX3NrdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5zdGF2X3Z5bSA9IHN0YXZWeW07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGF2ZW7DrSBnZW5lcm92w6Fuw60gxIxKIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdlbmVjaiA9IHRoYXQucGFyYW1zLmRkcF92eW1fZ2VuZWNqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdlbmVjaiA9PSAyKSBmb3JtLmZpbmRGaWVsZHMoXCJnZW5fY2pcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGdlbmVjaiAhPSAwKSBmb3JtLmZpbmRGaWVsZHMoXCJnZW5fY2pcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIHNlIGplZG7DoSBvIHBydm7DrSBrb2xvIGLEm2h1IHDFmWkgcmVsb2FkdSBva25hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFrIGhvZMOtbWUgZG8gcG9sw63EjWthIGhvZG5vdHUgeiBtb2RlbHUgYSBuZcSNdGVtZSBqaSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5yZWZyZXNoRmlyc3RMb29wID09IGZhbHNlICYmICF0aGF0LnZ5bWFoYXREYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KGV2LnRhcmdldCkuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJwcmVkS3Jva3lcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gb2RrYXrFryBuYSBrcm9reS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnByZWRLcm9reU5vdmVWeW0oeyBmaWx0ZXJzOiBmaWx0ZXIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdnltX29sZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHN0YXZfdnltOiByZXN1bHRbMF0uc3Rhdl92eW0sIHN0YXZfdnltX3R4dDogcmVzdWx0WzBdLnN0YXZfdnltX3R4dCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoZXYudGFyZ2V0KS5lbmRPcGVyYXRpb24oeyBpZDogXCJwcmVkS3Jva3lcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2RGxlS3Jva3VWeW1haGFuaShzdGF2VnltLCBldik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5kaWxjaVZ5cG9jZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJmb3JtYXRfY2pcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJmb3JtYXRfY2pcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCLEjEogc2UgbmVidWRlIGdlbmVyb3ZhdC4uLiBKZSBuYXN0YXZlbiBkw61sxI3DrSB2w71wb8SNZXQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImdlbl9jalwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybWF0Q2pGaWVsZCA9IGZvcm0uZmluZEZpZWxkcyhcImZvcm1hdF9jalwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdENqRmllbGQuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdENqRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCLEjEogc2UgbmVidWRlIGdlbmVyb3ZhdC4uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiT2RrYXogbmEga3Jva1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5wcmVkS3Jva3lWeW1Ob3ZlVnltKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdnltX29sZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfdnltX29sZCA9IHZhbHVlLnN0YXZfdnltLCBtb2RlbC5zdGF2X3Z5bV9vbGRfdHh0ID0gdmFsdWUuc3Rhdl92eW1fdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGF0LkR0b1ByaXBhZHUuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19za3Y6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcIml4c19za3ZcIiwgXCJpeHNfc2t2XCIsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF2X3Z5bTogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwic3Rhdl92eW1cIiwgXCJzdGF2X3Z5bVwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoRmlyc3RMb29wID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIGplIHJlxb5pbSBzdHJpa3Ruw60sIG5lYnVkZSBtb8W+bm8gem3Em25pdCBvZGtheiBuYSBrcm9rIHZ5bcOhaMOhbsOtIC0gbXVzw60gYsO9dCB2xb5keSBuYSBwb3NsZWRuw60gcHJvdmVkZW7DvSBuYSBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuc3RyaWt0bmlSZXppbSkgJChldi50YXJnZXQpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgJChldi50YXJnZXQpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk7DoWtsYWR5IMWZw616ZW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX25ha19yaXpcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQcm9jZW50YSBwZW7DoWxlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByb2NfcGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTWluaW3DoWxuw60gdnltw6FoYW7DoSDEjcOhc3RrYVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX21pbl9jYXN0a2FcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlBhcmFtZXRyeSBuw6FrbGFkxa8gZXhla3Vjw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImV4ZWt1Y2VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVnltw6FoYXQgcyBuw6FrbGFkeSBleGVrdWPDrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkLmNvbnRlbnQoKS5maW5kRm9ybXMoXCJ3aXpQYXJhbXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRWem5pa3VGaWVsZCA9IGZvcm0uZmluZEZpZWxkcyhcImRhdF92em5pa3VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRTcGxGaWVsZCA9IGZvcm0uZmluZEZpZWxkcyhcImRhdF9zcGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrdGdVcG9GaWVsZCA9IGZvcm0uZmluZEZpZWxkcyhcImt0Z191cG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdFZ6bmlrdUZpZWxkLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdFNwbEZpZWxkLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z1Vwb0ZpZWxkLmdmaWVsZChcImVuYWJsZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOYXN0YXZlbsOtIHBydm7DrSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdVcG9GaWVsZC5nZmllbGQoXCJnZXRTZXJ2ZXJGaWx0ZXJzXCIpLnRoZW4oKHNmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLkZ1Y2N1cG8oKS5nZXREYXRhKHNmKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2csOhY2Vuw60gaG9kbm90IHBvbMOtxI1rYSBzIGFrdHXDoWxuw61taSBzZXJ2ZXJvdsO9bWkgZmlsdHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChrdGdVcG8pID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwbyB2csOhY2Vuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdVcG9GaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBrdGdVcG9bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRTcGxGaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdFZ6bmlrdUZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnVXBvRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRTcGxGaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0VnpuaWt1RmllbGQuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z1Vwb0ZpZWxkLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2J1dHRvblwiLCBcInctNlwiLCB7IFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYnRuSW5mb0V4ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0LiBleGVrLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJOYXN0YXZlbsOtIGV4ZWt1Y2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTZXpuYW1WeXNlRXhla3VjaVwiLCB7IElEOiBcIkREUEdTZXpuYW1WeXNlRXhla3VjaSNcIiwgdHlwUGhsOiB0aGF0LnR5cFBobCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkthdGVnb3JpZSBwb2h5YnVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZnVjY3VwbygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IFwiPCAyMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gdnpuaWt1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdnpuaWt1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBzcGxhdG5vc3RpXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfc3BsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlVyxI1lbsOtIHZ5bcOhaGFuw6lobyBleHRlcm7DrWhvIHN1Ympla3R1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkb3RfcGxhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVnltw6FoYXQgZGxlIHBsw6F0Y2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcyhcImRvdF9zdWJqXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcyhcIml4c19kdmFcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG90X3N1YmpcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJWeW3DoWhhdCBkbGUgZG90xI1lbsOpaG8gc3ViamVrdHVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcyhcImRvdF9wbGFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHNEdmFGaWVsZCA9ICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcyhcIml4c19kdmFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNEdmFGaWVsZC5nZmllbGQoXCJlbmFibGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGF2ZW7DrSBwcnZuw60gaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzRHZhRmllbGQuZ2ZpZWxkKFwiZ2V0U2VydmVyRmlsdGVyc1wiKS50aGVuKChzZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuUmVhZGVycy5XZmxzZHZhKCkuZ2V0RGF0YShzZikgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnLDoWNlbsOtIGhvZG5vdCBwb2zDrcSNa2EgcyBha3R1w6FsbsOtbWkgc2VydmVyb3bDvW1pIGZpbHRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoaXhzRHZhKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG8gdnLDoWNlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzRHZhRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgaXhzRHZhWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKFwiaXhzX2R2YVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKFwiaXhzX2R2YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRMWvdm9kIHZhemJ5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxzZHZhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19kdmFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZHZhID0gdmFsdWUuaXhzX2R2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwixIzDrXNsbyBqZWRuYWPDrS96bmHEjWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJnZW5fY2pcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJHZW5lcm92YXQgdnltw6Fow6Fuw60gcyDEjEpcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5pc0dlbkNqRGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0aGF0LmlzR2VuQ2pDaGVja2VkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkLmNvbnRlbnQoKS5maW5kRm9ybXMoXCJ3aXpQYXJhbXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHNTa3ZGaWVsZCA9IGZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF2VnltRmllbGQgPSBmb3JtLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4c1NrdiA9IGl4c1NrdkZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdlZ5bSA9IHN0YXZWeW1GaWVsZC5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl4c1NrdiAhPSBudWxsICYmIHN0YXZWeW0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZGb3JtYXRDSih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhzU2t2ID09IG51bGwpIGl4c1NrdkZpZWxkLmdmaWVsZChcInZhbGlkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXZWeW0gPT0gbnVsbCkgc3RhdlZ5bUZpZWxkLmdmaWVsZChcInZhbGlkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJGb3Jtw6F0IMSMSlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmb3JtYXRfY2pcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMzAgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUMWZZWRwbG7Em27DrSBob2Rub3QgeiBuYXN0YXZlbsOtIHNrdXBpbnkgdnltw6Fow6Fuw60gKi9cclxuICAgICAgICBuYXN0YXZEbGVLcm9rdVZ5bWFoYW5pKHN0YXZWeW06IG51bWJlciwgZXY6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICQuY29udGVudChldi50YXJnZXQpLmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibmFzdGF2RGxlS3Jva3VWeW1haGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBuYXN0YXZlbsOtIGRsZSBrcm9rdSB2eW3DoWjDoW7DrS4uLlwiIH0pO1xyXG4gICAgICAgICAgICB2YXIgaXhzRnVuUG9kOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgbmF6ZXZSZjogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIG9zdGF0bmlQaGw6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIHZhciBsb2thbGl6YWNlOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJC5jb250ZW50KCkuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpO1xyXG4gICAgICAgICAgICB2YXIgaXhzU2t2ID0gZm9ybS5maW5kRmllbGRzKFwiaXhzX3NrdlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgLy92YXIgaXhzU2t2ID0gJCh0aGF0KS5maW5kRm9ybXMoXCJ3aXpQYXJhbXNcIikuZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhUHJvbWlzZSA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgaWYgKGl4c1NrdiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpeHNGdW5Qb2QgPSB0aGF0Lk51bGxGdW47XHJcbiAgICAgICAgICAgICAgICBuYXpldlJmID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIG9zdGF0bmlQaGwgPSAwO1xyXG4gICAgICAgICAgICAgICAgZGF0YVByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAuZGF0YURsZVNrdXBpbnkoeyBpeHNTa3Y6IGl4c1Nrdi5peHNfc2t2LCBzdGF2VnltOiBzdGF2VnltIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNGdW5Qb2QgPSByZXN1bHRbMF0uaXhzX2Z1bl9wb2QgPz8gdGhhdC5OdWxsRnVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXZSZiA9IHJlc3VsdFswXS5uYXpldl9yZiA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3N0YXRuaVBobCA9IHJlc3VsdFswXS5vc3RhdG5pX3BobCA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhUHJvbWlzZS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHrDrXNrYWxhIHNlIGRhdGEgZGxlIHNrdXBpbnkgYSBrcm9rdSwgdGFrIG3Fr8W+ZW1lIGpldCBkw6FsXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdkZvcm1hdENKKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpeHNGdW5Qb2QubGVuZ3RoID09IDEyICYmIGl4c0Z1blBvZCAhPSB0aGF0Lk51bGxGdW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2thbGl6YWNlID0gYDogJHtuYXpldlJmfWA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2thbGl6YWNlID0gXCIgZGxlIGFrdHXDoWxuxJsgcMWZaWhsLiB1xb5pdi5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbG9rYWxpemFjZVJvdyA9IGZvcm0uZmluZEZvcm1Sb3dzKFwibG9rYWxpemFjZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBsb2thbGl6YWNlVGV4dCA9IGxva2FsaXphY2VSb3cuZmluZChcIi5nZm9ybS10ZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgbG9rYWxpemFjZVRleHQudGV4dChcIkxva2FsaXphY2VcIiArIGxva2FsaXphY2UpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZzZVBobEZpZWxkID0gZm9ybS5maW5kRmllbGRzKFwidnNlX3BobFwiKVxyXG4gICAgICAgICAgICAgICAgaWYgKG9zdGF0bmlQaGwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvc3RhdG5pUGhsRGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZ5bcOhaMOhbsOtIHByb2LEm2huZSBuYWQgdnlicmFuw71taSB0eXB5IHBvaGxlZMOhdmVrLCBkbGUgbmFzdGF2ZW7DrSBza3VwaW55IVxyXG4gICAgICAgICAgICAgICAgICAgIHZzZVBobEZpZWxkLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tYVByaXBhZHkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1hRGFsc2lQcmlwYWR5KG9zdGF0bmlQaGxEZWYsICQuY29udGVudChldi50YXJnZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3N0YXRuaVBobERlZi5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzZVBobEZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzZVBobEZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl4c1Nrdi5peHNfc2t2ID09IHRoYXQuTnVsbFNrdikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfdnltX3Z5bW5hdiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzZVBobEZpZWxkLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnNlUGhsRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tYVByaXBhZHkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubWFEYWxzaVByaXBhZHkobnVsbCwgJC5jb250ZW50KGV2LnRhcmdldCkpKSB0aGF0LmFjdGlvbnMuYWN0VnliZXJQcmlwYWR1Py5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnNlUGhsRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2c2VQaGxGaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZzZVBobEZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB2c2VQaGxGaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuaXhzRnVuUG9kID0gaXhzRnVuUG9kOyBcclxuICAgICAgICAgICAgICAgICQuY29udGVudChldi50YXJnZXQpLmVuZE9wZXJhdGlvbih7IGlkOiBcIm5hc3RhdkRsZUtyb2t1VnltYWhhbmlcIiB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBOYXN0YXYgZm9ybcOhdCDEjEogKi9cclxuICAgICAgICBuYXN0YXZGb3JtYXRDSih6bWVuYUNiOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZvcm1hdENqOiBzdHJpbmcgPSBcIlwiOyAvLyBGb3Jtw6F0IGt0ZXLDvSBzZSB6b2JyYXrDrSB2IHBvbGlcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkLmNvbnRlbnQoKS5maW5kRm9ybXMoXCJ3aXpQYXJhbXNcIik7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmRpbGNpVnlwb2NldCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZm9ybWF0X2NqXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJmb3JtYXRfY2pcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCLEjEogc2UgbmVidWRlIGdlbmVyb3ZhdC4uLiBKZSBuYXN0YXZlbiBkw61sxI3DrSB2w71wb8SNZXQuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpeHNTa3Y6IGFueTtcclxuICAgICAgICAgICAgaWYgKGZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT0gbnVsbCkgaXhzU2t2ID0gdGhhdC5tb2RlbERhdGFWeW0uaXhzX3NrdjtcclxuICAgICAgICAgICAgZWxzZSBpeHNTa3YgPSBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfc2t2XCIpLmdmaWVsZChcImdldFZhbHVlXCIpLml4c19za3Y7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhdlZ5bSA9IGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdnltXCIpLmdmaWVsZChcImdldFZhbHVlXCIpLnN0YXZfdnltO1xyXG4gICAgICAgICAgICB2YXIgZ2VuQ2ogPSBmb3JtLmZpbmRGaWVsZHMoXCJnZW5fY2pcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBmb3JtYXRDakZpZWxkID0gZm9ybS5maW5kRmllbGRzKFwiZm9ybWF0X2NqXCIpO1xyXG4gICAgICAgICAgICB2YXIgZ2VuZWNqID0gdGhhdC5wYXJhbXMuZGRwX3Z5bV9nZW5lY2o7XHJcbiAgICAgICAgICAgIGlmIChnZW5DaiA9PSB0cnVlICYmIGdlbmVjaiAhPSAwICYmIGdlbmVjaiAhPSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZWNqID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC56aXNrZWpGb3JtYXRDaih7IGl4c1NrdjogaXhzU2t2LCBzdGF2VnltOiBzdGF2VnltIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoZm9ybWF0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IHRoYXQubm9ybWFsaXplV2hpdGVzcGFjZShmb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1hdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuQ2ogPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdENqID0gZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdENqRmllbGQuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtY2ogPSB0aGF0Lm5vcm1hbGl6ZVdoaXRlc3BhY2UodGhhdC5wYXJhbXMuZGRwX3Z5bV9mb3JtY2ogPz8gXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1jai5sZW5ndGggPiAwICYmIGZvcm1jaiAhPSBcIkdHR0dHR0dHR0dcIikgeyAvLyBHR0dHR0dHR0dHIC0gaW1wbGljaXRuw60gaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5DaiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdENqID0gZm9ybWNqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRDakZpZWxkLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgc2Ugem3Em27DrSBidXR0b24gZ2VuZXJhY2UgxIxKLCBhIGplIGRkcF92eW1fZ2VuZWNqID0gMSAsIHRhayBidWRlIGZvcm1hdCBDSiBha3Rpdm7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRDaiA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghem1lbmFDYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9sw63EjWtvIHNlIHptxJtuw60gamVuIHRlaGR5LCBwb2t1ZCBzZSBuZWplZG7DoSBvIHptxJtudSBwb2zDrcSNa2Egc2Ftb3Ruw6lobyAtIGFieSBuZWRvxaFsbyBrIHphY3lrbGVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbkNqID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0Q2pGaWVsZC5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnZW5Daikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImdlbl9jalwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBnZW5Daik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0Q2ogPSBcIsSMSiBzZSBuZWJ1ZGUgZ2VuZXJvdmF0Li4uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0Q2pGaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGZvcm1hdENqRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZm9ybWF0Q2opO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGdlbmVjaiA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0Q2ogPSBcIsSMSiBnZW5lcnVqZSBTU0wuLi5cIjtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRDakZpZWxkLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZWNqID09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRDaiA9IFwixIxKIGdlbmVydWplIGV4dGVybsOtIFNTTC4uLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdENqRmllbGQuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdENqID0gXCLEjEogc2UgbmVidWRlIGdlbmVyb3ZhdC4uLlwiO1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0Q2pGaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtYXRDakZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIGZvcm1hdENqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeW3DoWjDoW7DrSBuYSBwxZnDrXBhZHUgRERQICovXHJcbiAgICAgICAgcHJpdmF0ZSB2eW1haGFuaShtb2RlbERhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5pc1JlZnJlc2gpIHRoYXQucmVmcmVzaEZpcnN0TG9vcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoYXQuaXNSZWZyZXNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gdGhhdC5mb3JtdWxhclZ5bWFoYW5pKG1vZGVsRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvLyBXYXRjaCBmb3IgdGhlIHdpelBhcmFtcyBmb3JtIGJlaW5nIGFwcGVuZGVkIHRvIHRoZSBET01cclxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCgobXV0YXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGFwcGVuZGVkIG5vZGUgaXMgdGhlIHdpelBhcmFtcyBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKG5vZGUpLmlzKCdbZGF0YS1mb3JtPVwid2l6UGFyYW1zXCJdJykgfHwgJChub2RlKS5maW5kKCdbZGF0YS1mb3JtPVwid2l6UGFyYW1zXCJdJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbCB0aGUgaW5pdGlhbGl6YXRpb24gZnVuY3Rpb24gd2hlbiB0aGUgZm9ybSBpcyByZWFkeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbmljaWFsbmlIb2Rub3R5UHJvRm9ybXVsYXJWeW1haGFuaShtb2RlbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGlzY29ubmVjdCBvYnNlcnZlciBzaW5jZSB3ZSBvbmx5IG5lZWQgdGhpcyBvbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN0YXJ0IG9ic2VydmluZyB0aGUgZG9jdW1lbnQgYm9keSBmb3IgY2hhbmdlc1xyXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbWFzc1VwZGF0ZSA9IHRoYXQuaXNsLlZ5bWFoYW5pRERQLnZ5bWFoYW5pLmJpbmQodGhhdC5pc2wuVnltYWhhbmlERFApO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFWeW1haGFuaS5iaW5kKHRoYXQuaXNsLlZ5bWFoYW5pRERQKTtcclxuICAgICAgICAgICAgdGhhdC5wcmlwYWR5VnltYWhhbmkgPSBbdGhhdC5EdG9QcmlwYWR1XTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaHJvbWFkbmFPcGVyYWNlVnltYWhhbmkodGhhdC5wcmlwYWR5VnltYWhhbmksIFwiR2VuZXJhY2Ugdnltw6Fow6Fuw61cIiwgQ29tbW9uLkdyaWRGb3JtYXRzLkhybUFrY2VTaW1wbGUoKSwgXCJpeHBcIiwgZm9ybSwgbWFzc1VwZGF0ZSwgY2hlY2tGdW5jdGlvbiwgXCJPcHJhdmR1IGNoY2V0ZSBwcm92w6lzdCB2eW3DoWjDoW7DrSBwxZnDrXBhZHU/XCIsIFwiXCIsIFt7IGZhdm9yaXRlOiB0cnVlLCBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RIaXN0b3JpZVZ5bSB9LCB7IGZhdm9yaXRlOiB0cnVlLCBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RWeWJlclByaXBhZHUgfV0sIG1vZGVsRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogRnVua2NlIGsgb3RldsWZZW7DrSBva25hIGhyb21hZG7DvWNoIHptxJtuIChFa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQpICovXHJcbiAgICAgICAgaHJvbWFkbmFPcGVyYWNlVnltYWhhbmkoZGF0YTogYW55LCB0aXRsZTogc3RyaW5nLCBncmlkRm9ybWF0OiBhbnksIGtleXM6IGFueSwgZm9ybTogYW55LCBtYXNzVXBkYXRlOiBhbnksIGNoZWNrRnVuY3Rpb246IGFueSwgY29uZmlybU1lc3NhZ2U6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbWVudUdyaWQ6IGFueSwgbW9kZWxEYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0RGF0YTogYW55O1xyXG4gICAgICAgICAgICB0aGF0Lm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8YW55Pj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogZ3JpZEZvcm1hdCxcclxuICAgICAgICAgICAgICAgIGtleXM6IGtleXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlZ5YnJhbsOpIHDFmcOtcGFkeVwiLCAvLyB0aXR1bGVrIHYgdGFidSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQcmlwYWRERFAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsRGF0YTogbW9kZWxEYXRhLCAvLyBkYXRhIHBybyBtb2RlbCBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiUHJvdmXEj1wiLCAvLyBuw6F6ZXYgcHJvIHRsYcSNw610a28gZGFsxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBtZW51R3JpZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBuYSB0YWJ1IHMgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4geyAvLyBha2NlIHBybyBrb250cm9sdSBkYXQsIG1vZGVsIC0gZGF0YSB6IG1vZGVsRGF0YSwgaW5wdXQgLSBncmlkIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5kYXRfb2QgPSBtb2RlbC5kYXR1bS5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0X2RvID0gbW9kZWwuZGF0dW0uZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC50eXAgPSB0aGF0LlZ5bVByaXBhZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLml4c19mdW4gPSB0aGF0Lml4c0Z1blBvZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5pZCA9IHRoYXQuRHRvUHJpcGFkdS5peHBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR01vZGVsVnltYWhhbmlEdG8gPSBtb2RlbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB0aGF0LnByaXBhZHlWeW1haGFuaTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGVja0Z1bmN0aW9uKHsgZHRvc1ByaXBhZDogZGF0YSwgbW9kZWw6IG1vZGVsRHRvIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWR5IHNlIMSNYXJ1amUsIGplbGlrb8W+IHDFmWlkw6F2w6FtIGRhdGEgeiBHVnliZXJQcmlwYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemppxaF0xJtuw60ga3RlcsO9IGpzb3Ugc3VjY2VzcyBhIGt0ZXLDvSBuZSwgYSBydcSNbsOtIHptxJtuYSBkYXQgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aXpHcmlkID0gJC5jb250ZW50KCkuZmluZChcIltkYXRhLWhlbHAtY29udGV4dD0nbGlzdDp3aXpHcmlkJ11cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l6R3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhID0gbW9kZWw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X29kID0gbW9kZWwuZGF0dW0uc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfZG8gPSBtb2RlbC5kYXR1bS5lbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmRhdF9vZCA9IGRhdF9vZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0X2RvID0gZGF0X2RvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5peHNfZnVuID0gdGhhdC5peHNGdW5Qb2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLml4c19mdW4gPT0gdGhhdC5OdWxsRnVuIHx8IG1vZGVsLml4c19mdW4ubGVuZ3RoICE9IDEyKSBtb2RlbC5peHNfZnVuID0gdGhhdC5peHNGdW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnR5cCA9IHRoYXQuVnltUHJpcGFkdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaWQgPSB0aGF0LkR0b1ByaXBhZHUuaXhwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb2RlbER0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdNb2RlbFZ5bWFoYW5pRHRvID0gbW9kZWw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmTmFwb2plbmUgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3JtcyhcIndpelBhcmFtc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZzZVBobCA9IGZvcm0uZmluZEZpZWxkcyhcInZzZV9waGxcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBqZSBtb8W+bm9zdCB2eW3DoWhhdCBpIG5hcG9qZW7DqSBwxZnDrXBhZHkgYSDFvsOhZG7DqSBqc21lIG5ldnlicmFsaSwgdGFrIG96bsOhbcOtbWUgdcW+aXZhdGVsaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wcmlwYWR5VnltYWhhbmlOYXBvamVuZS5sZW5ndGggPT0gMCAmJiB0aGF0Lm1hUHJpcGFkeSAmJiB2c2VQaGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IFwiU2xvdcSNZW7DqSB2eW3DoWjDoW7DrVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIk5ldnlicmFsaSBqc3RlIMW+w6FkbsO9IHDFmcOtcGFkIHBybyBzbG91xI1lbsOpIHZ5bcOhaG7DoW7DrSwgY2hjZXRlIHBva3JhxI1vdmF0P1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybSh0aXRsZSwgbWVzc2FnZSwgNDAwLCAyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9ldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZk5hcG9qZW5lLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZk5hcG9qZW5lLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBkZWZOYXBvamVuZS5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZOYXBvamVuZS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtVGl0bGUgPSBcIlBvdHZyemVuw60gaHJvbWFkbsOpIGFrY2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25maXJtTWVzc2FnZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oY29uZmlybVRpdGxlLCBjb25maXJtTWVzc2FnZSwgNDAwLCAyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5YnLDoW7DrSBzcGlzdSwgcG9rdWQganNvdSBwYXJhbWV0cnkgbmFzdGF2ZW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZHBfZ2VuX3NzbHphayBqZSBBTk8gIGRkcF9nZW5fc3Nsc3BpIGplIE5FIGRkcF9zc2xfamVkc3BpID09ICdQxZllZCB2bG/FvmVuw61tIHZ5YnJhdCBzcGlzJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfZ2VuX3NzbHphayAhPSAwICYmIHRoYXQucGFyYW1zLmRkcF9nZW5fc3Nsc3BpID09IDAgJiYgdGhhdC5wYXJhbXMuZGRwX3NzbF9qZWRzcGkgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkRpYWxvZ3MuR0hsZWRhdElkZW50RG9rU3Bpc0RsZyh0aGF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT0gbnVsbCkgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXhwU3BpcyA9IHJldFZhbC5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRHRvLml4cF9zcGlzID0gaXhwU3BpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzc1VwZGF0ZSh7IGR0b3NQcmlwYWQ6IGRhdGEsIG1vZGVsOiBtb2RlbER0byB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0RGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzc1VwZGF0ZSh7IGR0b3NQcmlwYWQ6IGRhdGEsIG1vZGVsOiBtb2RlbER0byB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0RGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc3NVcGRhdGUoeyBkdG9zUHJpcGFkOiBkYXRhLCBtb2RlbDogbW9kZWxEdG8gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmw6F6ZSAyIC0gem9icmF6ZW7DrcKtIHbDvXNsZWRlayB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlbDvXNsZWRlayB2eW3DoWjDoW7DrVwiLCBcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiVnltw6FoYW7DqSBwxZnDrcKtcGFkeVwiLCAvLyBwb3Bpc2VrIG5hZCBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RHcmlkVnljaG96aUFrY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiAoKSA9PiB7IC8vIHByZWRhbmkgZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNFcnJvciA9IHJlc3VsdERhdGEucmVzdWx0WzBdLmVycm9ycyAhPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgY250ID0gJC5jb250ZW50KCQoXCIuZ2NvbnRlbnRcIikubGFzdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1haW5Db250ZW50ID0gJC5jb250ZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aXpDb250ZW50ID0gbWFpbkNvbnRlbnQuZmluZChcIi5nd2l6YXJkX19jb250ZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWFuZEJhciA9ICQuY29udGVudCh3aXpDb250ZW50KS5jb21tYW5kQmFyKCkgPz8gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Vycm9yKSB0aGF0LmFjdGlvbnMuYWN0UmVzZXQ/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgdGhhdC5hY3Rpb25zLmFjdFJlc2V0Py5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkQmFyID0gdGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RSZXNldFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNldCA9IGNyZWF0ZWRCYXJbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmVkY2hvemkgPSBjb21tYW5kQmFyWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGxldGUgPSBjb21tYW5kQmFyWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FuY2VsID0gY29tbWFuZEJhclsyXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCYXIgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZEJhci5wdXNoKHByZWRjaG96aSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCYXIucHVzaChyZXNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCYXIucHVzaChjb21wbGV0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCYXIucHVzaChjYW5jZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KHdpekNvbnRlbnQpLmNvbW1hbmRCYXIoY3JlYXRlZEJhcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsRGF0YVZ5bSA9IG1vZGVsRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIHNlIGplZG7DoSBvIHJlZnJlc2gsIHRhayBuZXByb3bDoWTEm3QgcmVmcmVzaCBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5pc1JlZnJlc2gpIHRoYXQuemlza2VqRGF0YSh0aGF0LmZpbHRlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbERlbGVnYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKiogWmppc3TDrSB6ZGEgbcOhIHDFmcOtcGFkIEREUCwgZGFsxaHDrSBwxZnDrXBhZHkgbW/Fvm7DqSBrIHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgbWFEYWxzaVByaXBhZHkoZGVmOiBhbnksIGNvbnRlbnQ6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZGVmTWFQcmlwYWR5ID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBpZiAoZGVmICE9IG51bGwpIGNvbnRlbnQuYmVnaW5PcGVyYXRpb24oeyB0ZXh0OiBcIlByb2LDrWjDoSB6amnFoXTEm27DrSB6ZGEgZXhpc3R1asOtIGRhbMWhw60gcMWZw61wYWR5Li4uXCIsIGlkOiBcImRhbHNpUHJpcGFkeVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAubWFQcmlwYWR5VkppbmVQSEwoeyBpeHBEZHA6IHRoYXQuRHRvUHJpcGFkdS5peHAsIHR5cFBobDogdGhhdC5EdG9QcmlwYWR1LnR5cF9waGwgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tYVByaXBhZHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuYWN0aW9ucy5hY3RWeWJlclByaXBhZHU/LnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZk1hUHJpcGFkeS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5lbmRPcGVyYXRpb24oeyBpZDogXCJkYWxzaVByaXBhZHlcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLm1hUHJpcGFkeVNEb3RjZW55bVN1Ympla3RlbSh7IGl4cERkcDogdGhhdC5EdG9QcmlwYWR1Lml4cCwgdHlwUGhsOiB0aGF0LkR0b1ByaXBhZHUudHlwX3BobCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0MjogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQyKSB0aGF0Lm1hUHJpcGFkeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGF0Lm1hUHJpcGFkeSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlZk1hUHJpcGFkeS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlZiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiZGFsc2lQcmlwYWR5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5tYVByaXBhZHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIE9kZXNsw6Fuw61cclxuXHJcbiAgICAgICAgLyoqIE8gamFrw70gdHlwIG9kZXNsw6Fuw60gc2UgamVkbsOhXHJcbiAgICAgICAgKiAwIC0gb2Rlc2xhdCBub3bDqSB6w6FzaWxreVxyXG4gICAgICAgICogMSAtIG9kZXNsYXQgcMWZaXByYXZlbsOpIHrDoXNpbGt5XHJcbiAgICAgICAgKiAyIC0gZ2VuZXJvdmF0IGVsZWt0cm9uaWNrw6kgZG9rdW1lbnR5IFxyXG4gICAgICAgICovXHJcbiAgICAgICAgb2Rlc2xhdEVsZWt0cm9uaWNreShvZGVzbGF0RXhpc3R1amljaTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJkZWxldGVTU0xUT0RFXCIsIHRleHQ6IFwiUHJvYsOtaMOhIMO6a2xpZCBkb8SNYXN0bsOpIHRhYnVsa3kuLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAuZGVsZXRlU1NMVE9ERSgpLmdldCgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJkZWxldGVTU0xUT0RFXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgbmFzdGF2ZW5pTW9kZWw6IGFueSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGdsb2JhbFdmbGN0ZG8gPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLlphc2lsa3lTZXR0aW5ncy5kZWZhdWx0X3dmbGN0ZG9cIilcclxuICAgICAgICAgICAgaWYgKGdsb2JhbFdmbGN0ZG8gIT0gdW5kZWZpbmVkKSBuYXN0YXZlbmlNb2RlbC53ZmxjdGRvID0gZ2xvYmFsV2ZsY3Rkby50eXBfdnloX2RvcjtcclxuICAgICAgICAgICAgZWxzZSBuYXN0YXZlbmlNb2RlbC53ZmxjdGRvID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBnbG9iYWxXZmxjdHRpID0gdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLkRkcC5aYXNpbGt5U2V0dGluZ3MuZGVmYXVsdF93ZmxjdHRpXCIpO1xyXG4gICAgICAgICAgICBpZiAoZ2xvYmFsV2ZsY3R0aSAhPSB1bmRlZmluZWQpIG5hc3RhdmVuaU1vZGVsLndmbGN0dGkgPSBnbG9iYWxXZmxjdHRpLnR5cF90aXNrdTtcclxuICAgICAgICAgICAgZWxzZSBuYXN0YXZlbmlNb2RlbC53ZmxjdHRpID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBnbG9iYWxXZmxjdGFyID0gdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLkRkcC5aYXNpbGt5U2V0dGluZ3MuZGVmYXVsdF93ZmxjdGFyXCIpO1xyXG4gICAgICAgICAgICBpZiAoZ2xvYmFsV2ZsY3RhciAhPSB1bmRlZmluZWQpIG5hc3RhdmVuaU1vZGVsLndmbGN0YXIgPSBnbG9iYWxXZmxjdGFyLnR5cF9hcmNoaXZhY2U7XHJcbiAgICAgICAgICAgIGVsc2UgbmFzdGF2ZW5pTW9kZWwud2ZsY3RhciA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2xvYmFsV2ZsY3RrbyA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5EZHAuWmFzaWxreVNldHRpbmdzLmRlZmF1bHRfd2ZsY3Rrb1wiKTtcclxuICAgICAgICAgICAgaWYgKGdsb2JhbFdmbGN0a28gIT0gdW5kZWZpbmVkKSBuYXN0YXZlbmlNb2RlbC53ZmxjdGtvID0gZ2xvYmFsV2ZsY3Rrby50eXBfa29udmVyemU7XHJcbiAgICAgICAgICAgIGVsc2UgbmFzdGF2ZW5pTW9kZWwud2ZsY3RrbyA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAob2Rlc2xhdEV4aXN0dWppY2kgPT0gMCB8fCBvZGVzbGF0RXhpc3R1amljaSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBWw71ixJtyIGNvIG9kZXPDrWxhdFxyXG4gICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdFbGVrdHJpY2tlT2Rlc2xhbmlcIiwgeyB0ZW1hOiBcImRkcF9wdG1fbnZ5XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkbGUgdHlweSB2w71ixJtydSB2eWJyYXQgYnXEjyB2eWJyYW7DqSBuZWJvIHbFoWVjaG55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Rlc2xhbmlNb2RlbCA9IHJldFZhbC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJvZGVzbGFuaVwiLCB0ZXh0OiBcIk9kZXPDrWzDoW7DrSB6w6FzaWxlay4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAub2Rlc2xhdEVsZWt0cm9uaWNreSh7IHByaXBhZDogc2VsZWN0aW9uLCBvZGVzbGFuaUR0bzogb2Rlc2xhbmlNb2RlbCwgbmFzdGF2ZW5pRHRvOiBuYXN0YXZlbmlNb2RlbCB9KS5nZXQoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwib2Rlc2xhbmlcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2Rlc2xhdEV4aXN0dWppY2kgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImRvaGxlZGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBkb2hsZWTDoW7DrSBuZWRva29uxI1lbsO9Y2ggesOhc2lsZWsuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLm5lZG9rb25jZW5lWmFzaWxreSh7IG5hc3RhdmVuaUR0bzogbmFzdGF2ZW5pTW9kZWwgfSkuZ2V0KCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJkb2hsZWRhbmlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQcm9ixJtobG8gdmxvxb5lbsOtIHrDoXNpbGVrIGRvIGRvxI1hc27DqSB0YWJ1bGt5LCB0YWsgemtvbnRyb2x1amVtIHpkYSB0YW0gbsSbY28gamUgYSBtxa/FvmVtZSBwb2tyYcSNb3ZhdCBzIG9kZXNsw6Fuw61tXHJcbiAgICAgICAgICAgIGRlZi5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmRhdGFTU0xUT0RFKCkuZ2V0KCkuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZGVzbGF0RXhpc3R1amljaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJOZWV4aXN0dWrDrSDFvsOhZG7DqSByb3pwcmFjb3ZhbsOpIHrDoXNpbGt5IVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIk5lcG92ZWRsbyBzZSBwxZlpcHJhdml0IMW+w6Fkbm91IHrDoXNpbGt1IGsgb2Rlc2zDoW7DrSwgdWppc3TEm3RlIHNlLCB6ZGEgdnlicmFuw6kgesOhem5hbXkgbyB2eW3DoWjDoW7DrSBqc291IHNwcsOhdm7EmyBuYXN0YXZlbsOpISBcXG4gXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTmFwxZkuIGNoeWLDrSBkb3TEjWVuw6kgc3ViamVrdHkgdSB2eW3DoWjDoW7DrSwgb2Rlc8OtbMOhdGUgY2l6w60gdnltw6Fow6Fuw60sIGFsZSB2eWJyYWxpIGpzdGUgdmxhc3Ruw60gesOhc2lsa3kgcHJvIG9kZXNsw6Fuw60gYXRkLlwiLCAzNjAsIDE3NSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9kZXNsYXRIcm9tYWRuZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPZGVzbGF0IC0gdWTEm2zDoW5vIGRsZSBTTUwwNVxyXG4gICAgICAgIHByaXZhdGUgb2Rlc2xhdEhyb21hZG5lKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCB0ZW1hID0gXCJkZHBfcHRtX252eVwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcG9ydEluZm86IEdvcmRpYy5SZXBvcnQuSW50ZXJmYWNlLkdSZXBvcnRJbmZvRHRvIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgcmVwb3J0RHRvOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZU5vZGVEdG8gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU2VzdGF2YVwiLCB0cnVlKSBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnJlcG9ydHMoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydHNPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRlbWE6IHRlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vSXhzU3RyOiB0aGlzLmRicGFyYW1zLnNtbF9wdG1fcHJ0c21sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NlcnZlclJlc3RyaWN0aW9uQWxmTWV0aG9kOiAodGhpcy5rdGdfZGVuID09IDE2OTEgLypuZ19rdGdkZW5JbmRQcmlzbGliKi8pID8gXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU2V6bmFtRG9rbGFkdVNtbDpHZXRSZXN0cmljdGlvbkFsZlwiIDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NlcnZlclJlc3RyaWN0aW9uQWx2TWV0aG9kOiAodGhpcy5rdGdfZGVuID09IDE2OTEgLypuZ19rdGdkZW5JbmRQcmlzbGliKi8pID8gXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU2V6bmFtRG9rbGFkdVNtbDpHZXRSZXN0cmljdGlvbkFsdlwiIDogdm9pZCAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJlcG9ydElkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnJlcG9ydElkPXZhbHVlLnJlcG9ydElkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVXaXRoTWVzc2FnZTogKHZhbHVlLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVwb3J0SW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShyZXBvcnRJbmZvLnR5cFZ5c3QgPT0gXCJUWFRcIiB8fCByZXBvcnRJbmZvLnR5cFZ5c3QgPT0gXCJSVEZcIiB8fCByZXBvcnRJbmZvLnR5cFZ5c3QgPT0gXCJYTUVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlZ5YnJhbm91IHNlc3RhdnUgbmVsemUgdWxvxb5pdCBkbyB2w71zdHVwbsOtaG8gZm9ybcOhdHUgUERGXCI7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChyZXBvcnRJbmZvLmNvbW1vbkluZm9zPy5aUFVTX1VMT1ogPz8gXCIwXCIpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlp2b2xlbsOhIHRpc2tvdsOhIHNlc3RhdmEgbmVtw6EgbmFzdGF2ZW4genDFr3NvYiB1bG/FvmVuw60gZG8gZWxla3Ryb25pY2vDqWhvIHVsb8W+acWhdMSbLiBLb250YWt0dWp0ZSBhZG1pbmlzdHLDoXRvcmEgc3lzdMOpbXUuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNudCA9ICQuY29udGVudChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0SW5mbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydER0byA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHg/LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0RHRvID0gY3R4LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5iZWdpbk9wZXJhdGlvbihcIk5hxI3DrXTDoW7DrSBwb2Ryb2Jub3N0w60gbyBzZXN0YXbEm1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZUNvbnRyb2xUUy5nZXRSZXBvcnRJbmZvKGN0eC52YWx1ZS5yZXBvcnRJZCA/PyBcIlwiLCBjdHgudmFsdWUucm9rTWVzRG8pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7IHJlcG9ydEluZm8gPSByZXM7ICQoZXYudGFyZ2V0KS5nZmllbGQoXCJ2YWxpZGF0ZVwiKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IGNudC5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0Lm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8YW55Pj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSHJvbWFkbsOpIHZ5Z2VuZXJvdsOhbsOtIGVsLiBvYnJhesWvIGEgb2Rlc2zDoW7DrSBkbyB2w71wcmF2bnlcIixcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IENvbW1vbi5HcmlkRm9ybWF0cy5aYXNpbGthKCksXHJcbiAgICAgICAgICAgICAgICBrZXlzOiBcIml4cCwgaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJWeWJyYW7DqSBwxZnDrXBhZHlcIiwgLy8gdGl0dWxlayB2IHRhYnUgICBcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0R3JpZFZ5Y2hvemlBa2NlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWtjZSB2eWdlbmVydWplIGFzeW5jaHJvbm7EmyAobmEgcG96YWTDrSkgZWwuIG9icmF6eSB2eWJyYW7DvW0gKHphxaFrcnRudXTDvW0pIGRva2xhZMWvbSBhIHYgbm90aWZpa2HEjW7DrW0gY2VudHJ1IHBvdMOpIG5hYsOtZG5lIG9kZXNsw6Fuw60gZG8gdsO9cHJhdm55LlwiLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbERhdGE6IG1vZGVsRGF0YSwgLy8gZGF0YSBwcm8gbW9kZWwgXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiVnlnZW5lcm92YXQgYSBvZGVzbGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFTU0xUT0RFLmJpbmQodGhhdC5pc2wuVnltYWhhbmlERFApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hlY2tGdW5jdGlvbih7IHphc2lsa2FEdG9zOiBkYXRhIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkSXhwczogc3RyaW5nW10gPSBBcnJheS5mcm9tKG5ldyBTZXQoZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ud2l6X2tpbmQgPT0gMjAwKS5tYXAoaXRlbSA9PiBpdGVtLml4cCkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBBcnJheTxHUmVwb3J0UGFyYW1zPigpOyAvL0tvbGlrIGluc3RhbmNpIHBhcmFtZXRydSwgdG9saWtyYXQgc2UgYnVkZSBnZW5lcm92YXQgc2VzdGF2YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXNGb3JBc3luYyA9IG5ldyBBcnJheTxHUmVwb3J0UGFyYW1zPigpOyAvL0tvbGlrIGluc3RhbmNpIHBhcmFtZXRydSwgdG9saWtyYXQgc2UgYnVkZSBnZW5lcm92YXQgc2VzdGF2YVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgamUgcHJ2bsOtIHDFmcOtcGFkIGTDoXQgbmEgeDAwMDggMiBqaW5hayAwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHZhbGlkSXhwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IHsgWDAwMDA6IHRoaXMudHlwUGhsLCBYMDAwMTogdGhpcy5pY28sIFgwMDA0OiB0aGlzLmxpYywgWDAwMDY6IGl0ZW0sIFgwMDA3OiBcIjBcIiwgWDAwMDg6IFwiMlwiLCBYMDAwOTogdGhhdC5YMDAwOSwgSVhQOiBpdGVtIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbEFzeW5jID0geyBYMDAwMDogdGhpcy50eXBQaGwsIFgwMDAxOiB0aGlzLmljbywgWDAwMDQ6IHRoaXMubGljLCBYMDAwNjogaXRlbSwgWDAwMDc6IFwiMFwiLCBYMDAwODogXCIwXCIsIElYUDogaXRlbSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zRm9yQXN5bmMucHVzaCh2YWxBc3luYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYXZyaERpYWxvZyA9ICQubmV3RGl2KCkuZ2NvbnRlbnQoW0dvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRQcmV2aWV3LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0bzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRJZDogcmVwb3J0RHRvPy5yZXBvcnRJZCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF0bm9zdDogdGhpcy5yb2sudG9TdHJpbmcoKSArICh0aGlzLm1lc2ljPy50b1N0cmluZygpID8/IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IChwYXJhbXM/Lmxlbmd0aCA+IDApID8gcGFyYW1zWzBdIDogdm9pZCAwIC8vcG9rdWQgamUgdsOtY2UgcGFyYW1ldHLFrywgdGFrIG7DoXZyaCBwdXN0w61tIHBvdXplIHMgcHJ2bsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hdXRvR2VuZXJhdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuSUdSZXBvcnRQcmV2aWV3SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hdnJoQ250ID0gJC5jb250ZW50KG5hdnJoRGlhbG9nKSBhcyBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0UHJldmlldztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuYXZyaENudC5pbml0QXdhaXQudGhlbigoKSA9PiB7IHJldHVybiBuYXZyaENudC5nZXRQYXJhbXMoKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHBhcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2hlZHVsZWRQYXJhbXMgPSBwYXJzIGFzIEdvcmRpYy5SZXBvcnQuSW50ZXJmYWNlLkdTY2hlZHVsZWRSZXBvcnRQYXJhbWV0ZXJbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWRQYXJhbXMucHVzaCh7IGtleTogXCJJQ09cIiwgdmFsdWU6IHRoYXQuaWNvIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkUGFyYW1zLnB1c2goeyBrZXk6IFwiSVhQX0RFTlwiLCB2YWx1ZTogdGhhdC5peHBEZW4gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWRQYXJhbXMucHVzaCh7IGtleTogXCJMSUNcIiwgdmFsdWU6IHRoYXQubGljIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkUGFyYW1zLnB1c2goeyBrZXk6IFwiUk9LXCIsIHZhbHVlOiB0aGF0LnJvayB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0KFwiR29yZGljLkVrby5TZXJ2ZXIuR09kZXNsYXRNdWx0aXBsZVJlcG9ydHNBc3luY1Rhc2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQbGF0bm9zdDogdGhpcy5yb2sudG9TdHJpbmcoKSArICh0aGlzLm1lc2ljPy50b1N0cmluZygpID8/IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnRJZDogcmVwb3J0RHRvPy5yZXBvcnRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFyYW1ldGVyczogcGFyYW1zRm9yQXN5bmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNjaGVkdWxlZFBhcmFtczogc2NoZWR1bGVkUGFyYW1zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWtjOiBcIjBcIiAvL1RPRE8gLSB2Y2VjaCAtIGNoYW5nZSBsYXRlciBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmw6F6ZSAyIC0gem9icmF6ZW7DrcKtIHbDvXNsZWRlayB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlZ5YnJhbsOpIGRva2xhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiVnlicmFuw6kgesOhem5hbXlcIiwgLy8gcG9waXNlayBuYWQgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6ICgpID0+IHsgLy8gcHJlZGFuaSBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAoKSA9PiB7IH0sXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxEZWxlZ2F0ZTogKCkgPT4geyB9XHJcbiAgICAgICAgICAgIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8qKiBPdGV2xZllIGRldGFpbCB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIG90ZXZyZW5pRGV0YWlsdShpeHBfbnZ5OiBhbnksIHR5cF9waGw6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7ICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR0RldGFpbFZ5bWFoYW5pI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4cE52eTogaXhwX252eVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEFrY2UgbmEgZ3JpZHVcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBLb250cm9sYSBtZXRhZGF0IHZ5YnJhbsO9Y2ggc291cGlzZWtcclxuICAgICAgICAqIFxyXG4gICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBrb250cm9sYU1ldGFkYXQoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHphem5hbXkgPSB0aGF0LmdyaWRWeW1haGFuaVxyXG4gICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpXHJcbiAgICAgICAgICAgICAgICAubWFwKChyb3cpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX2RkcDogcm93Lml4cF9kZHAhLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHJvdy50eXBfcGhsIVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHphem5hbXkgIT09IG51bGwgJiYgemF6bmFteS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDYWxsIHRoZSBjb21wb25lbnRcclxuICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLlV0aWxzLktvbnRyb2xhTWV0YWRhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGhhdCxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0SXhwOiB6YXpuYW15Lm1hcCgoeikgPT4gei5peHBfZGRwKSwgLy8gRXh0cmFjdCBvbmx5IGl4cCBmb3IgdGhpcyBwYXJhbWV0ZXJcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxBa2NlOiAoX2NudCwgaXhwX2RkcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gemF6bmFteS5maW5kKCh6KSA9PiB6Lml4cF9kZHAgPT09IGl4cF9kZHApOyAvLyBGaW5kIHRoZSBtYXRjaGluZyBpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtID8gdGhhdC5vdGV2cmVuaURldGFpbHUoaXhwX2RkcCwgaXRlbS50eXBfcGhsKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEhyb21hZG7DqSBvdsSbxZllbsOtIHBvcGxhdG7DrWvFryBuYSBJU1pSICovXHJcbiAgICAgICAgcHJpdmF0ZSBocm9tYWRuZU92ZXJlbmlJU1pSKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWRWeW1haGFuaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImluaWNpYWxpemFjZUhyb21PdmVyZW5pSVNaUlwiLCB0ZXh0OiBcIlByb2LDrWjDoSBwxZnDrXByYXZhIHDFmcOtcGFkxa8gcHJvIG92xJvFmWVuw60gSVNaUi4uLlwiIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5Icm9tYWRuZU92ZXJlbmkuaW5pY2lhbGl6YWNlSHJvbU92ZXJlbmlJU1pSKCkuZ2V0KCkuZG9uZSgocG9yYWRpSHJvOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiaW5pY2lhbGl6YWNlSHJvbU92ZXJlbmlJU1pSXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGR0byA9IHNlbGVjdGlvbi5tYXAoKGl0ZW06IGFueSkgPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICBpeHNfZXN1OiBpdGVtLml4c19lc3VcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIFphbG/FvmVuw60gcG/FvmFkYXZrdSBwcm8gaHJvbWFkbsOpIG92xJvFmWVuw60gSVNaUlxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuSHJvbWFkbmVPdmVyZW5pLnphbG96UG96YWRhdmVrSHJvbU92ZXJlbmlJU1pSKHsgcnE6IHsgUmVxdWVzdERhdGE6IGR0byB9LCBwb3JhZGlIcm86IHBvcmFkaUhybyB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG8gemFsb8W+ZW7DrSBwb8W+YWRhdmt1IHDFmWVzbcSbcm92w6Fuw60gbmEgc3Ryw6Fua3UgcyBocm9tYWRuw71tIG92xJvFmWVuw61tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HSHJvbWFkbmVPdmVyZW5pXCIsIHsgcG9yYWRpSHJvOiBwb3JhZGlIcm8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBIcm9tYWRuw6kgb3bEm8WZZW7DrSBkb3TEjWVuw71jaCBzdWJqZWt0xa8gbmEgSVNaUiAqL1xyXG4gICAgICAgIHByaXZhdGUgaHJvbWFkbmVPdmVyZW5pRG90U3ViaklTWlIoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJpcGFkeTogYW55ID0gc2VsZWN0aW9uLm1hcCgoaXRlbTogYW55KSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cDogaXRlbS5peHBfbnZ5XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgcHJpcGFkeTogYW55ID0gW107XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBpID0gMDtcclxuICAgICAgICAgICAgICAgIC8vc2VsZWN0aW9uLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcHJpcGFkeVtpXS5peHAgPSBpdGVtLml4cF9udnk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAvL30pXHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImluaWNpYWxpemFjZUhyb21PdmVyZW5pSVNaUlwiLCB0ZXh0OiBcIlByb2LDrWjDoSBwxZnDrXByYXZhIHDFmcOtcGFkxa8gcHJvIG92xJvFmWVuw60gSVNaUi4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuSHJvbWFkbmVPdmVyZW5pLmluaWNpYWxpemFjZUhyb21PdmVyZW5pSVNaUigpLmdldCgpLmRvbmUoKHBvcmFkaUhybzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJpbmljaWFsaXphY2VIcm9tT3ZlcmVuaUlTWlJcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZHRvOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Icm9tYWRuZU92ZXJlbmkubGlzdERvdGNlbmVTdWJqZWt0eSh7IHByaXBhZHk6IHByaXBhZHkgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG90xI1lbsOpIHN1Ympla3R5IG5hIHDFmcOtcGFkZWNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8gPSByZXN1bHQuZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBaYWxvxb5lbsOtIHBvxb5hZGF2a3UgcHJvIGhyb21hZG7DqSBvdsSbxZllbsOtIElTWlJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLkhyb21hZG5lT3ZlcmVuaS56YWxvelBvemFkYXZla0hyb21PdmVyZW5pSVNaUih7IHJxOiB7IFJlcXVlc3REYXRhOiBkdG8gfSwgcG9yYWRpSHJvOiBwb3JhZGlIcm8gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvIHphbG/FvmVuw60gcG/FvmFkYXZrdSBwxZllc23Em3JvdsOhbsOtIG5hIHN0csOhbmt1IHMgaHJvbWFkbsO9bSBvdsSbxZllbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0hyb21hZG5lT3ZlcmVuaVwiLCB7IHBvcmFkaUhybzogcG9yYWRpSHJvIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHDFmcOtem5ha3UgdGlza3UsIHBva3VkIGplIGhvZG5vdGEgJ3ByaXpuYWsnIDEsIHRhayBzZSBuYXN0YXbDrSBhIHBva3VkIGplIDAsIHRhayBzZSBydcWhw61cclxuICAgICAgICAgKiBAcGFyYW0gcHJpem5ha1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbmFzdGF2ZW5pUHJpem5ha3VUaXNrdShwcml6bmFrOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRHV2b2RcIiwgeyBJRDogXCJERFBHRHV2b2QjXCIsIH0sIFwiRMWvdm9kIHptxJtueSBwxZnDrXpuYWt1IHZ5dGnFoXTEm27DrVwiLCA0NTAsIDMyMClcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfb2JqLCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmF6ZXY6IHN0cmluZztcclxuIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcml6bmFrID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXYgPSBcIm5hc3Rhdml0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXpldiA9IFwienJ1xaFpdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHV2b2QgPSByZXRWYWwuZHV2b2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVcG96b3JuxJtuw61cIiwgLy8gVGl0dWxlayBva25hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgT3ByYXZkdSBjaGNldGUgJHtuYXpldn0gcMWZw616bmFrIHZ5dGnFoXTEm27DrSB2eW3DoWjDoWPDrWhvIGRva3VtZW50dSB1IHZ5YnJhbsO9Y2ggdnltw6Fow6Fuw60/IFxcbmAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYETFr3ZvZDogJHtkdXZvZH1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRhc2tTdGFydE5hc3RhdmVuaVByaXpUaXNrKHNlbGVjdGlvbiwgZHV2b2QsIHByaXpuYWspO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKGBOZW7DrSBtb8W+bsOpICR7bmF6ZXZ9IHDFmcOtem5hayB2eXRpxaF0xJtuw60sIG5lYnlsIHphZMOhbiBkxa92b2QhYCwgXCJ3YXJuaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPYnNsdWhhIGFzeW5jIHRhc2t1ICdOYXN0YXZlbsOtIHDFmcOtem5ha3UgdGlza3UnXHJcbiAgICAgICAgVGFza1N0YXJ0TmFzdGF2ZW5pUHJpelRpc2soZGF0YTogYW55LCBkdXZvZDogc3RyaW5nLCBwcml6bmFrOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFzeW5jQ2xhc3NOYW1lID0gXCJHb3JkaWMuRGRwLlNlcnZlci5MSy5Bc3luYy5HRGRwTmFzdGF2ZW5pUHJpem5ha3VUaXNrdUFzeW5jVGFza1wiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhcmFtZXRyeSA9IHtcclxuICAgICAgICAgICAgICAgIHByaXBhZHlWeW06IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBkdXZvZDogZHV2b2QsXHJcbiAgICAgICAgICAgICAgICBwcml6bmFrOiBwcml6bmFrXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgb3B0OiBBc3luYy5JR1Rhc2tPcHRpb25zID0geyBhdXRvQ2xlYW46IHRydWUsIGNsZWFyT25GaW5pc2g6IHRydWUgfTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgXCJ2eXNsZWRla05hc3RhdmVuaVByaXpUaXNrVGFza1wiKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgIC8vIHBvxaFsdSBub3RpZmlrYWNpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibmFzdGF2ZW5pUHJpelRpc2tUYXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTmFzdGF2ZW7DrSBwxZnDrXpuYWt1IHRpc2t1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJQcm9iw61ow6EgYXN5bmNocm9ubsOtIGFrY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWFycm93LXJpZ2h0ICBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuc3RhcnQoYXN5bmNDbGFzc05hbWUsIHBhcmFtZXRyeSwgb3B0KTsgLy8gYSBzcHVzdMOtbVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwxZnDrXpuYWt1IHRpc2t1LCBwb2t1ZCBqZSBob2Rub3RhICdwcml6bmFrJyAxLCB0YWsgc2UgbmFzdGF2w60gYSBwb2t1ZCBqZSAwLCB0YWsgc2UgcnXFocOtXHJcbiAgICAgICAgICogQHBhcmFtIHByaXpuYWtcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hc3RhdmVuaVByaXpuYWt1T2Rlc2xhbmkocHJpem5hazogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0R1dm9kXCIsIHsgSUQ6IFwiRERQR0R1dm9kI1wiLCB9LCBcIkTFr3ZvZCB6bcSbbnkgcMWZw616bmFrdSBvZGVzbMOhbsOtXCIsIDQ1MCwgMzIwKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9vYmosIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYXpldjogc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJpem5hayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2ID0gXCJuYXN0YXZpdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXYgPSBcInpydcWhaXRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR1dm9kID0gcmV0VmFsLmR1dm9kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXBvem9ybsSbbsOtXCIsIC8vIFRpdHVsZWsgb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYE9wcmF2ZHUgY2hjZXRlICR7bmF6ZXZ9IHDFmcOtem5hayBvZGVzbMOhbsOtIHZ5bcOhaMOhY8OtaG8gZG9rdW1lbnR1IHUgdnlicmFuw71jaCB2eW3DoWjDoW7DrT8gXFxuYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgRMWvdm9kOiAke2R1dm9kfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVGFza1N0YXJ0TmFzdGF2ZW5pUHJpek9kZXNsKHNlbGVjdGlvbiwgZHV2b2QsIHByaXpuYWspO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKGBOZW7DrSBtb8W+bsOpICR7bmF6ZXZ9IHDFmcOtem5hayBvZGVzbMOhbsOtLCBuZWJ5bCB6YWTDoW4gZMWvdm9kIWAsIFwid2FybmluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT2JzbHVoYSBhc3luYyB0YXNrdSAnTmFzdGF2ZW7DrSBwxZnDrXpuYWt1IHRpc2t1J1xyXG4gICAgICAgIFRhc2tTdGFydE5hc3RhdmVuaVByaXpPZGVzbChkYXRhOiBhbnksIGR1dm9kOiBzdHJpbmcsIHByaXpuYWs6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXN5bmNDbGFzc05hbWUgPSBcIkdvcmRpYy5EZHAuU2VydmVyLkxLLkFzeW5jLkdEZHBOYXN0YXZlbmlQcml6bmFrdU9kZXNsYW5pQXN5bmNUYXNrXCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFyYW1ldHJ5ID0ge1xyXG4gICAgICAgICAgICAgICAgcHJpcGFkeVZ5bTogZGF0YSxcclxuICAgICAgICAgICAgICAgIGR1dm9kOiBkdXZvZCxcclxuICAgICAgICAgICAgICAgIHByaXpuYWs6IHByaXpuYWtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBvcHQ6IEFzeW5jLklHVGFza09wdGlvbnMgPSB7IGF1dG9DbGVhbjogdHJ1ZSwgY2xlYXJPbkZpbmlzaDogdHJ1ZSB9O1xyXG5cclxuICAgICAgICAgICAgY250Lm5vdGlmaWNhdGlvbihcInJlbW92ZVwiLCBcInZ5c2xlZGVrTmFzdGF2ZW5pUHJpek9kZXNsVGFza1wiKTtcclxuICAgICAgICAgICAgY250Lm5vdGlmaWNhdGlvbihcInJlbW92ZVwiLCBcIm5hc3RhdmVuaVByaXpPZGVzbFRhc2tcIik7XHJcblxyXG4gICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsICAvLyBwb8WhbHUgbm90aWZpa2FjaVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5hc3RhdmVuaVByaXpPZGVzbFRhc2tcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJOYXN0YXZlbsOtIHDFmcOtem5ha3Ugb2Rlc2zDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiUHJvYsOtaMOhIGFzeW5jaHJvbm7DrSBha2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1hcnJvdy1yaWdodCAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0KGFzeW5jQ2xhc3NOYW1lLCBwYXJhbWV0cnksIG9wdCk7IC8vIGEgc3B1c3TDrW1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogT2Jub3ZlbsOtIHZ5YnJhbsO9Y2ggcMWZw61wYWTFryB2eW3DoWjDoW7DrVxyXG4gICAgICAgICogQHBhcmFtIHByaXpuYWtcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgb2Jub3ZlbmkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJla3J5dGlEZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJrb250cm9sYVByZWtyeXZhbmlPYm5vdmVuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBrb250cm9sYSBwxZlla3LDvXbDoW7DrSBwxZnDrXBhZMWvLi4uXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmtvbnRyb2xhUHJla3J5dmFuaU9ibm92ZW5pKHsgZHRvczogc2VsZWN0aW9uIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCJOxJtrdGVyw70geiB2eWJyYW7DvWNoIHDFmcOtcGFkxa8gdnltw6Fow6Fuw60gc2UgcMWZZWtyw712w6EgcyBqaW7DvW0uIFxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ2hjZXRlIG9wcmF2ZHUgcG9rcmHEjW92YXQ/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiUMWZZWtyeXTDrSB2eW3DoWjDoW7DrVwiLCBtZXNzYWdlLCA0MjAsIDIxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHByZWtyeXRpRGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHByZWtyeXRpRGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcHJla3J5dGlEZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImtvbnRyb2xhUHJla3J5dmFuaU9ibm92ZW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcHJla3J5dGlEZWYuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0R1dm9kXCIsIHsgSUQ6IFwiRERQR0R1dm9kI1wiLCB9LCBcIkTFr3ZvZCBvYm5vdmVuw60gcMWZw61wYWTFr1wiLCA0NTAsIDMyMClcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX29iaiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR1dm9kID0gcmV0VmFsLmR1dm9kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UYXNrU3RhcnRPYm5vdmVuaShzZWxlY3Rpb24sIGR1dm9kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKGBOZW7DrSBtb8W+bsOpIG9ibm92aXQgcMWZw61wYWR5LCBuZWJ5bCB6YWTDoW4gZMWvdm9kIWAsIFwid2FybmluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT2JzbHVoYSBhc3luYyB0YXNrdSAnT2Jub3ZlbsOtJ1xyXG4gICAgICAgIFRhc2tTdGFydE9ibm92ZW5pKGRhdGE6IGFueSwgZHV2b2Q6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXN5bmNDbGFzc05hbWUgPSBcIkdvcmRpYy5EZHAuU2VydmVyLkxLLkFzeW5jLkdEZHBPYm5vdmVuaVZ5bUFzeW5jVGFza1wiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhcmFtZXRyeSA9IHtcclxuICAgICAgICAgICAgICAgIHByaXBhZHlWeW06IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBkdXZvZDogZHV2b2QsXHJcbiAgICAgICAgICAgICAgICBuYXpldkFrY2U6IFwiT2Jub3ZlbmlWeW1cIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IG9wdDogQXN5bmMuSUdUYXNrT3B0aW9ucyA9IHsgYXV0b0NsZWFuOiB0cnVlLCBjbGVhck9uRmluaXNoOiB0cnVlIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dHkgPSBDb21tb24uQmFzZS50ZXh0eUFrY2koXCJPYm5vdmVuaVZ5bVwiKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgQ29tbW9uLkJhc2UudnlzbGVkZWtJZCh0ZXh0eS5pZCkpO1xyXG4gICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsICAvLyBwb8WhbHUgbm90aWZpa2FjaVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0ZXh0eS5pZCxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGV4dHkudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGV4dHkuY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWFycm93LXJpZ2h0ICBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuc3RhcnQoYXN5bmNDbGFzc05hbWUsIHBhcmFtZXRyeSwgb3B0KTsgLy8gYSBzcHVzdMOtbVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZZXZ6ZXTDrSB2eWJyYW7DvWNoIHDFmcOtcGFkxa8gdnltw6Fow6Fuw61cclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJldnppdCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXRoYXQuZ3JpZFZ5bWFoYW5pKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGF0LmdyaWRWeW1haGFuaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgLy8gRW5zdXJlIGVhY2ggc2VsZWN0ZWQgaXRlbSBoYXMgaXhwIHNldCB0byBpeHBfbnZ5XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaXhwID0gaXRlbS5peHBfbnZ5O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGplU3BpcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImV4aXN0dWplVnltYWhhbmlWZVNwaXN1XCIsIHRleHQ6IFwiUHJvYsOtaMOhIGtvbnRyb2xhIHDFmcOtcGFkxa8gdmUgc3Bpc3UuLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuUmVkaXN0cmlidWNlLmV4aXN0dWplUHJpcGFkVmVTcGlzdSh7IHNwaXNEdG9zOiBzZWxlY3Rpb24gfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJleGlzdHVqZVZ5bWFoYW5pVmVTcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGRlZi5kb25lKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmplX3ZlX3NwaXN1KSBqZVNwaXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoamVTcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUMWZZXZ6w610IHNwaXM/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVmUgdnlicmFuw71jaCB2eW3DoWjDoW7DrWNoIGpzb3UgbsSba3RlcsOpIHZ5bcOhaMOhbsOtIHZsb8W+ZW55IGRvIHNwaXN1LiBcXG4gXFxuIFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJVIHTEm2NodG8gdnltw6Fow6Fuw60gYnVkZSBwxZlldnphdCBjZWzDvSBzcGlzLCBjaGNldGUgcG9rcmHEjW92YXQ/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDQwMCwgMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgKS5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4geyAvLyBtw6FtZSBpIHDFmcOtcGFkeSB2ZSBzcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9PSBcInllc1wiKSByZXR1cm47IC8vIHBva3VkIHXFvml2YXRlbCBuZWNoY2UgcMWZZWRhdCBjZWzDvSBzcGlzLCB0YWsga29uxI3DrW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVGFza1N0YXJ0UmVkaXN0cmlidWNlKHNlbGVjdGlvbiwgMjAsIHsgcHJpel9zZWtjZTogMSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5UYXNrU3RhcnRSZWRpc3RyaWJ1Y2Uoc2VsZWN0aW9uLCAyMCwgeyBwcml6X3Nla2NlOiAxIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBSZWRpc3RyaWJ1Y2UgLSBQxZllZMOhbsOtIC8gUMWZaWTEm2xlbsOtIC8gUMWZZXZ6ZXTDrVxyXG5cclxuICAgICAgICAvKiogRm9ybXVsw6HFmSBwcm8gcMWZZWTDoW7DrS9wxZlpZMSbbGVuw60gKi9cclxuICAgICAgICBmb3JtUmVkaXN0KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJwcmlwYWRGb3JtXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIEwtMi04LTIsIE0tMi04LTIsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiWnByYWNvdmF0ZWxcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmRkcEdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19mdW49aXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhhdC50eXBQaGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuYWN0aW9ucy5hY3RUaXNrUHJlZGFuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZSkgdGhhdC5hY3Rpb25zLmFjdFRpc2tQcmVkYW5pLmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHRoYXQuYWN0aW9ucy5hY3RUaXNrUHJlZGFuaS5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBXaXphcmQgcHJvIHDFmWVkw6Fuw60vcMWZaWTEm2xlbsOtICovXHJcbiAgICAgICAgd2l6emFyZFJlZGlzdChjaGVja0Z1bmN0aW9uOiBhbnksIHR5cFJlZGlzdDogbnVtYmVyKSB7IC8vIDAgLSBwxZllZMOhbsOtLCAxMCAtIHDFmWlkxJtsZW7DrVxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWRWeW1haGFuaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9kc3RyYW5pdCB6ZSBzZWxlY3Rpb24gbmVha3Rpdm7DrSBwxZnDrXBhZHlcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gc2VsZWN0aW9uLmZpbHRlcigoaXRlbTogYW55KSA9PiBpdGVtLmFrdGl2aXRhID09PSAxMDApO1xyXG5cclxuICAgICAgICAgICAgLy8gb2RzdHJhbml0IHplIHNlbGVjdGlvbiBwxZnDrXBhZHksIGtkZSBpeHNfZnVuX2FrdCBuZW7DrSBzaG9kbsOpIHMgaXhzRnVuXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHNlbGVjdGlvbi5maWx0ZXIoKGl0ZW06IGFueSkgPT4gaXRlbS5peHNfZnVuX2FrdCA9PT0gdGhhdC5peHNGdW4pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIGFycmF5SXhwOiBhbnkgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGFycmF5SXhwU3BpczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGE6IGFueSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgdmVTcGlzdTogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgdmFyIGplU3BpcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gcMWZaWTDoW1lIGl4cF9udnkgamFrbyBpeHAsIGFieSBzZSB0byBkYWxvIHBvdcW+w610IHYgZGFsxaHDrW0genByYWNvdsOhbsOtXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaXhwID0gaXRlbS5peHBfbnZ5OyBcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJleGlzdHVqZVZ5bWFoYW5pVmVTcGlzdVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBrb250cm9sYSBwxZnDrXBhZMWvIHZlIHNwaXN1Li4uXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlJlZGlzdHJpYnVjZS5leGlzdHVqZVByaXBhZFZlU3Bpc3UoeyBzcGlzRHRvczogc2VsZWN0aW9uIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJeHAucHVzaCh7IGl4cDogaXRlbS5peHAgfSk7IC8vIHDFmWlkw6FtZSBpeHAgZG8gcG9sZSBwcm8gZGFsxaHDrSB6cHJhY292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uamVfdmVfc3Bpc3UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGplU3BpcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUl4cFNwaXMucHVzaChpdGVtLml4cF9zcGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlU3Bpc3UucHVzaCh7IGl4cDogaXRlbS5peHBfc3BpcywgamVfc3BpczogaXRlbS5qZV92ZV9zcGlzdSwgaXhwX252eTogaXRlbS5peHAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUl4cFNwaXMucHVzaChpdGVtLml4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZVNwaXN1LnB1c2goeyBpeHA6IGl0ZW0uaXhwX3NwaXMsIGplX3NwaXM6IGl0ZW0uamVfdmVfc3Bpc3UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJleGlzdHVqZVZ5bWFoYW5pVmVTcGlzdVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoamVTcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQxZllZGF0IHNwaXM/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZlIHZ5YnJhbsO9Y2ggdnltw6Fow6Fuw61jaCBqc291IG7Em2t0ZXLDqSB2eW3DoWjDoW7DrSB2bG/FvmVueSBkbyBzcGlzdS4gXFxuIFxcbiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlUgdMSbY2h0byB2eW3DoWjDoW7DrSBidWRlIHDFmWVkw6FuIGNlbMO9IHNwaXMsIGNoY2V0ZSBwb2tyYcSNb3ZhdD9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQwMCwgMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHsgLy8gbcOhbWUgaSBwxZnDrXBhZHkgdmUgc3Bpc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7IC8vIHBva3VkIHXFvml2YXRlbCBuZWNoY2UgcMWZZWRhdCBjZWzDvSBzcGlzLCB0YWsga29uxI3DrW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJ3ZmxzcGlkUHJvUHJlZGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSB6w61za8OhbsOtIGRhdCBwxZnDrXBhZMWvIHBybyBwxZllZMOhbsOtLi4uXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6w61za2F0IGRhdGEgeiB3ZmxzcGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5SZWRpc3RyaWJ1Y2Uud2Zsc3BpZFByb1ByZWRhbmkoeyBwcmlwYWR5OiBhcnJheUl4cFNwaXMgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVTcGlzdS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGVudHJ5IGluIHJlc3VsdCB3aGVyZSBpeHAgbWF0Y2hlcyBpdGVtLml4cCBhbmQgc2V0IGplX3NwaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gcmVzdWx0LmZpbmQoKGVudHJ5OiBhbnkpID0+IGVudHJ5Lml4cCA9PT0gaXRlbS5peHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQuamVfc3BpcyA9IGl0ZW0uamVfc3BpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ3ZmxzcGlkUHJvUHJlZGFuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbcOhbWUgamVuIHDFmcOtcGFkeSBjbyBuZWpzb3UgdmUgc3Bpc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcIndmbHNwaWRQcm9QcmVkYW5pXCIsIHRleHQ6IFwiUHJvYsOtaMOhIHrDrXNrw6Fuw60gZGF0IHDFmcOtcGFkxa8gcHJvIHDFmWVkw6Fuw60uLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOtc2thdCBkYXRhIHogd2Zsc3BpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5SZWRpc3RyaWJ1Y2Uud2Zsc3BpZFByb1ByZWRhbmkoeyBwcmlwYWR5OiBhcnJheUl4cFNwaXMgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5qZV9zcGlzID0gZmFsc2U7IC8vIG5lbsOtIHZlIHNwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIndmbHNwaWRQcm9QcmVkYW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImV4aXN0dWplVnltYWhhbmlWZVNwaXN1XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ3ZmxzcGlkUHJvUHJlZGFuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBcIlDFmWVkw6Fuw61cIiAvLyBQxZlldnpldMOtXHJcbiAgICAgICAgICAgIC8vIGdldCBkYXRhIGZyb20gd2Zsc3BpZFxyXG4gICAgICAgICAgICBkZWYucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGF0LmZvcm1SZWRpc3QoKTtcclxuICAgICAgICAgICAgICAgIHZhciBtZW51R3JpZDogYW55O1xyXG4gICAgICAgICAgICAgICAgbWVudUdyaWQgPSBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VGlza1ByZWRhbmkgfV1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8YW55Pj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuUHJlZGFuaSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFwiaXhwX252eSwgaXhwX3NwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJWeWJyYW7DqSBwxZnDrXBhZHlcIiwgLy8gdGl0dWxlayB2IHRhYnUgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiUHJvdmXEj1wiLCAvLyBuw6F6ZXYgcHJvIHRsYcSNw610a28gZGFsxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogbWVudUdyaWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrY2UgbmEgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7IC8vIGFrY2UgcHJvIGtvbnRyb2x1IGRhdCwgbW9kZWwgLSBkYXRhIHogbW9kZWxEYXRhLCBpbnB1dCAtIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaXNfc3ByOiBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZFNwcmF2Y2kgPSAkKCdkaXZbZGF0YS1mb3JtPVwicHJpcGFkRm9ybVwiXSAuZ2Zvcm0tZmllbGQuZ2dyaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkU3ByYXZjaSAhPSBudWxsIHx8IGdyaWRTcHJhdmNpICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBncmlkU3ByYXZjaS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc19zcHIgPSBzZWxlY3Rpb25bMF0uY2lzX3NwcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvblswXS5mbGFnID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKGBWeWJyYW7DvSBzcHLDoXZjZSBqacW+IG5lYm8gamXFoXTEmyBuZW7DrSBwbGF0bsO9LCB2eWJlcnRlIHByb3PDrW0gamluw6lobyFgLCBcIndhcm5pbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR01vZGVsUmVkaXN0cmlidWNlRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19mdW46IG1vZGVsLml4c19mdW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzX3NwcjogY2lzX3NwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcmVkaXN0cmlidWNlOiB0eXBSZWRpc3QsIC8vIDAgLSBwxZllZMOhbsOtLCAxMCAtIHDFmWlkxJtsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfc2VrY2U6IDEgLy8gamVkbsOhIHNlIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGVja0Z1bmN0aW9uKHsgcHJlZGFuaUR0b3M6IGRhdGEsIG1vZGVsOiBtb2RlbER0byB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2lzX3NwcjogYW55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWZDb25maXJtID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnByaXpQcmludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtVGl0bGUgPSBcIlDFmWVkw6F2YWPDrSBwcm90b2tvbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtTWVzc2FnZSA9IFwiUHJvemF0w61tIG5lYnlsIHZ5dGnFoXTEm24gcMWZZWTDoXZhY8OtIHByb3Rva29sLiBQxZllamV0ZSBzaSBwb2tyYcSNb3ZhdD9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShjb25maXJtVGl0bGUsIGNvbmZpcm1NZXNzYWdlLCA0MDAsIDIwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9ldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQ29uZmlybS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkNvbmZpcm0ucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgZGVmQ29uZmlybS5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQ29uZmlybS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZFNwcmF2Y2kgPSAkKCdkaXZbZGF0YS1mb3JtPVwicHJpcGFkRm9ybVwiXSAuZ2Zvcm0tZmllbGQuZ2dyaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZFNwcmF2Y2kgIT0gbnVsbCB8fCBncmlkU3ByYXZjaSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGdyaWRTcHJhdmNpLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNfc3ByID0gc2VsZWN0aW9uWzBdLmNpc19zcHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uWzBdLmZsYWcgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKGBWeWJyYW7DvSBzcHLDoXZjZSBqacW+IG5lYm8gamXFoXTEmyBuZW7DrSBwbGF0bsO9LCB2eWJlcnRlIHByb3PDrW0gamluw6lobyFgLCBcIndhcm5pbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR01vZGVsUmVkaXN0cmlidWNlRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuOiBtb2RlbC5peHNfZnVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNfc3ByOiBjaXNfc3ByLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcmVkaXN0cmlidWNlOiB0eXBSZWRpc3QsIC8vIDAgLSBwxZllZMOhbsOtLCAxMCAtIHDFmWlkxJtsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0aGF0LnR5cFBobCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuaXhwRGVuLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VicmFkYTogdGhhdC5zdWJyYWRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpel9zZWtjZTogMSAvLyBqZWRuw6Egc2Ugdnltw6Fow6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRhc2tTdGFydFJlZGlzdHJpYnVjZShhcnJheUl4cCwgdHlwUmVkaXN0LCBtb2RlbER0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoW2RhdGFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDIgLSB6b2JyYXplbsOtwq0gdsO9c2xlZGt1IHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71zbGVkZWtcIiwgLy9uYXpldiBrcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiQWt0dWFsaXpvdmFuw6kgcMWZw63CrXBhZHlcIiwgLy9wb3Bpc2VrIG5hZCBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiAoKSA9PiB7IC8vcHJlZGFuaSBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHRoYXQuZmlsdGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxEZWxlZ2F0ZTogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0pICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGlzayBwxZllZMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSB0aXNrUHJlZGFuaShjbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q250ID0gY250LmN1cnJlbnRDb250ZW50O1xyXG4gICAgICAgICAgICB2YXIgaXhzRnVuRmllbGQgPSAkKGN1cnJlbnRDbnQpLmZpbmRGaWVsZHMoXCJpeHNfZnVuXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgaXhzRnVuOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHZhciBpeHNGdW5OYXpldjogc3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAoaXhzRnVuRmllbGQgIT0gbnVsbCAmJiBpeHNGdW5GaWVsZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGl4c0Z1biA9IGl4c0Z1bkZpZWxkLml4c19mdW47XHJcbiAgICAgICAgICAgICAgICBpeHNGdW5OYXpldiA9IGl4c0Z1bkZpZWxkLm5hemV2X3JmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZW7DrSBtb8W+bsOpIHRpc2tub3V0LCBuZW7DrSB2eWJyw6FuIHpwcmFjb3ZhdGVsIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RUaXNrUHJlZGFuaSA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrUHJlZGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmRcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUR0bzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuaXhwRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIHJva19kZW46IHRoYXQucm9rRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4c19mdW46IGl4c0Z1bixcclxuICAgICAgICAgICAgICAgICAgICBuYXpldjogaXhzRnVuTmF6ZXZcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyDihpMgTWV0b2RhLCBrdGVyw6EgamUgemF2b2zDoW5hIHTEm3NuxJsgcMWZZWQgZ2VuZXJvdsOhbsOtbSBzZXN0YXZ5IGEga2RlIGx6ZSBuYSBzdHJhbsSbIHNlcnZlcnUgb3ZsaXZuaXQgcGFyYW1ldHJ5IHNlc3Rhdnkg4oaTXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RkcFdlYlRpc2s6VGlza1ByZWRhbmlcIiwgIC8vemRlIHNlIHBsbsOtIHTDqW1hXHJcbiAgICAgICAgICAgICAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucHJpelByaW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkaWFsb2dDbG9zZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhY3RUaXNrUHJlZGFuaS5ydW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9ic2x1aGEgYXN5bmMgdGFza3UgJ1JlZGlzdHJpYnVjZSdcclxuICAgICAgICBUYXNrU3RhcnRSZWRpc3RyaWJ1Y2UoZGF0YTogYW55LCBwcml6bmFrOiBudW1iZXIsIG1vZGVsOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgpO1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXN5bmNDbGFzc05hbWUgPSBcIkdvcmRpYy5EZHAuU2VydmVyLkxLLkFzeW5jLkdEZHBSZWRpc3RyaWJ1Y2VBc3luY1Rhc2tcIjtcclxuICAgICAgICAgICAgdmFyIHNlc3Npb25VZGFqZTogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwX3BobDogdGhhdC50eXBQaGwsXHJcbiAgICAgICAgICAgICAgICBpeHBfZGVuOiB0aGF0Lml4cERlblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gcMWZw616bmFrOiAwIC0gcMWZZWTDoW7DrSwgMTAgLSBwxZlpZMSbbGVuw60sIDIwIC0gcMWZZXZ6ZXTDrVxyXG4gICAgICAgICAgICBsZXQgcGFyYW1ldHJ5ID0ge1xyXG4gICAgICAgICAgICAgICAgcHJlZGFuaUR0b3M6IGRhdGEsIC8vIHDFmWVkw6F2YW7DqS9wxZlpZMSbbG92YW7DqSBwxZnDrXBhZHlcclxuICAgICAgICAgICAgICAgIHByZXZ6ZXRpRHRvczogZGF0YSwgLy8gcMWZZXZ6YXTDqSBwxZnDrXBhZHlcclxuICAgICAgICAgICAgICAgIHByaXpuYWs6IHByaXpuYWssIC8vIHDFmcOtem5hayByZWRpc3RyaWJ1Y2VcclxuICAgICAgICAgICAgICAgIG1vZGVsUmVkaXN0OiBtb2RlbCwgLy8gbW9kZWwgcHJvIHDFmWVkw6Fuw60vcMWZaWTEm2xlbsOtXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uVWRhamU6IHNlc3Npb25VZGFqZSxcclxuICAgICAgICAgICAgICAgIG5hemV2QWtjZTogXCJSZWRpc3RyaWJ1Y2VcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IG9wdDogQXN5bmMuSUdUYXNrT3B0aW9ucyA9IHsgYXV0b0NsZWFuOiB0cnVlLCBjbGVhck9uRmluaXNoOiB0cnVlIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dHkgPSBDb21tb24uQmFzZS50ZXh0eUFrY2koXCJSZWRpc3RyaWJ1Y2VcIik7XHJcblxyXG4gICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwicmVtb3ZlXCIsIENvbW1vbi5CYXNlLnZ5c2xlZGVrSWQodGV4dHkuaWQpKTtcclxuICAgICAgICAgICAgY250Lm5vdGlmaWNhdGlvbihcImFkZFwiLCAgLy8gcG/FoWx1IG5vdGlmaWthY2lcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGV4dHkuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRleHR5LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRleHR5LmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1hcnJvdy1yaWdodCAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0KGFzeW5jQ2xhc3NOYW1lLCBwYXJhbWV0cnksIG9wdCk7IC8vIGEgc3B1c3TDrW1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gSHJvbWFkbsOpIGFrY2UgbmEgc2V6bmFtdSB2eW3DoWjDoW7DrVxyXG4gICAgICAgIC8vIE9ic2x1aGEgYXN5bmMgdGFza3UgJ3Z5bcOhaGF0J1xyXG4gICAgICAgIFRhc2tTdGFydEhyb21Ba2NlKGRhdGE6IGFueSwgbW9kZWw6IGFueSwgbmF6ZXZBa2NlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFzeW5jQ2xhc3NOYW1lID0gXCJHb3JkaWMuRGRwLlNlcnZlci5MSy5Bc3luYy5HRGRwSHJvbWFkbmVBa2NlVnltQXN5bmNUYXNrXCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFyYW1ldHJ5ID0ge1xyXG4gICAgICAgICAgICAgICAgcHJpcGFkeVZ5bTogZGF0YSxcclxuICAgICAgICAgICAgICAgIG1vZGVsVnltOiBtb2RlbCxcclxuICAgICAgICAgICAgICAgIG5hemV2QWtjZTogbmF6ZXZBa2NlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgb3B0OiBBc3luYy5JR1Rhc2tPcHRpb25zID0geyBhdXRvQ2xlYW46IHRydWUsIGNsZWFyT25GaW5pc2g6IHRydWUgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXh0eSA9IENvbW1vbi5CYXNlLnRleHR5QWtjaShuYXpldkFrY2UpO1xyXG4gICAgICAgICAgICB2YXIgdnlzbGVkZWtJRCA9IENvbW1vbi5CYXNlLnZ5c2xlZGVrSWQodGV4dHkuaWQpO1xyXG5cclxuICAgICAgICAgICAgY250Lm5vdGlmaWNhdGlvbihcInJlbW92ZVwiLCB2eXNsZWRla0lEKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgIC8vIHBvxaFsdSBub3RpZmlrYWNpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRleHR5LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0ZXh0eS50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0ZXh0eS5jb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYXJyb3ctcmlnaHQgIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRlVGltZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydChhc3luY0NsYXNzTmFtZSwgcGFyYW1ldHJ5LCBvcHQpOyAvLyBhIHNwdXN0w61tXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gRm9ybXVsw6HFmWVcclxuICAgICAgICBmb3JtVGVybWlub3ZhS2Fsa3VsYWNrYSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0zLTctMlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBkb3J1xI1lbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZG9ydWNcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rYWxrRmlyc3RUaW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiTmFieXTDrSBwcsOhdm7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkxoxa90YSBwcm8gb2R2b2zDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkbnlfcG1cIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rYWxrRmlyc3RUaW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIG5hYnl0w60gcHLDoXZuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rYWxrRmlyc3RUaW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG1fcG9zdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJPZCBuw6FzbGVkdWrDrWPDrWhvIGRuZSBwbyBkb3J1xI1lbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rYWxrRmlyc3RUaW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG1fZG55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiAnS2FsZW5kw6HFmW7DrSBkbnknIH0sIC8vcG1fa2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiAnUHJhY292bsOtIGRueScgfSwgIC8vcG1fcHJhY1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmthbGtGaXJzdFRpbWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50ZXJtaW5vdmFLYWxrdWxhY2thQ2FsYygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9zdW4gcG9zbGVkbsOtaG8gZG5lIGxoxa90eVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3N1bl92eXBfcG1cIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wb3N1bl92eXBfcG09dmFsdWUuaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7cG9waXN9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGlkOiAwLCBwb3BpczogXCJQb3N1biBwb3NsZWRuw61obyBkbmUgbGjFr3R5IG5hIHBvc2xlZG7DrSBuZXByYWNvdm7DrSBkZW5cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogMCwgcG9waXM6IFwiUG9zdW4gcG9zbGVkbsOtaG8gZG5lIGxoxa90eSBuYSBwb3NsZWRuw60gbmVwcmFjb3Zuw60gZGVuXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogMSwgcG9waXM6IFwiTmVwb3NvdXZhdFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IDIsIHBvcGlzOiBcIlBvc3VuIHBvc2xlZG7DrWhvIGRuZSBsaMWvdHkgbmEgcHJhY292bsOtIGRlblwiIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rYWxrRmlyc3RUaW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiVnlrb25hdGVsbm9zdFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkxoxa90YSBwcm8gemFwbGFjZW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkbnlfdnlrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBuYWJ5dMOtIHByw6F2bsOtIG1vY2lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eWtcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5a19wb3N1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk9kIG7DoXNsZWR1asOtY8OtaG8gZG5lIHBybyBuYWJ5dMOtIG1vY2lcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5a19kbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy02XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6ICdLYWxlbmTDocWZbsOtIGRueScgfSwgLy8gdnlrX2thbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogJ1ByYWNvdm7DrSBkbnknIH0sIC8vIHZ5a19wcmFjXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3N1biBwb3NsZWRuw61obyBkbmUgbGjFr3R5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvc3VuX3Z5cF92eWtcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wb3N1bl92eXBfdnlrPXZhbHVlLmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3BvcGlzfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBpZDogMCwgcG9waXM6IFwiUG9zdW4gcG9zbGVkbsOtaG8gZG5lIGxoxa90eSBuYSBwb3NsZWRuw60gbmVwcmFjb3Zuw60gZGVuXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IDAsIHBvcGlzOiBcIlBvc3VuIHBvc2xlZG7DrWhvIGRuZSBsaMWvdHkgbmEgcG9zbGVkbsOtIG5lcHJhY292bsOtIGRlblwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IDEsIHBvcGlzOiBcIk5lcG9zb3V2YXRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAyLCBwb3BpczogXCJQb3N1biBwb3NsZWRuw61obyBkbmUgbGjFr3R5IG5hIHByYWNvdm7DrSBkZW5cIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybVRlcm1pbm92YUthbGt1bGFja2FWYWx1ZXMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIEluaWNpYWxpemFjZSBwcm9txJtubsO9Y2hcclxuICAgICAgICAgICAgdmFyIGRfZGF0dW1fZG9ydWNlbmkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgZG55UG06IG51bWJlcjtcclxuICAgICAgICAgICAgdmFyIGRueVZrOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibGh1dHlcIiwgdGV4dDogXCJaw61za8OhbsOtIGRhdCB0ZXJtw61ub3bDqSBrYWxrdWxhxI1reVwiIH0pXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnZyYXRMaHV0eSh7IGl4c1NrdjogdGhhdC5OdWxsU2t2LCBzdGF2VnltOiAwLCBzdGF2VnltT2xkOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkbnlQbSA9IHJlc3VsdC5kbnlfcG07XHJcbiAgICAgICAgICAgICAgICAgICAgZG55VmsgPSByZXN1bHQuZG55X3ZrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibGh1dHlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBkZWYuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kZWxEYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIG1vZGVsRGF0YS5kYXRfZG9ydWMgPSBkX2RhdHVtX2RvcnVjZW5pO1xyXG4gICAgICAgICAgICAgICAgbW9kZWxEYXRhLmRueV9wbSA9IGRueVBtO1xyXG4gICAgICAgICAgICAgICAgbW9kZWxEYXRhLmRueV92eWsgPSBkbnlWaztcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJC5jb250ZW50KCkuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBtb2RlbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgdGhhdC5rYWxrRmlyc3RUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JtU3RhdkRvcnVjKCkge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0zLTctMlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBkb3J1xI1lbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5kZHBjc2RvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfZG9ydWNcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zdGF2X2RvcnVjPXZhbHVlLnN0YXZfZG9ydWMsIG1vZGVsLnN0YXZfZG9ydWNfdHh0PXZhbHVlLnN0YXZfZG9ydWNfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JtRG90Y2VueURvaygpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMy03LTJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkl4cygpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHZhemJ5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LndmbGN2cHAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3ZhemJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3ZhemJ5PXZhbHVlLnR5cF92cHBcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmltXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiWmRyb2pvdsO9IGRva2xhZFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JtRG90Y2VueVN1YigpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGUgPSB0aGF0LmdldEN1cnJlbnREYXRlQXNTdHJpbmcoKTtcclxuICAgICAgICAgICAgdmFyIHRpbWUgPSB0aGF0LmdldEN1cnJlbnRUaW1lQXNTdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTMtNy0yXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdWJqZWt0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZXN1PWl4c19lc3U7ZXN1X2RpYz1kaWM7bGljPXZhbHVlLmxpYztwb3JfemFzdD12YWx1ZS5wb3JfemFzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZS5udW1femFzdCA+IDApIHsgLy9wb2t1ZCBtw6EgcMWZw61wYWQgesOhc3R1cGNlLCB1bW/Fvm5pdCB2w71ixJtyIHrDoXN0dXBjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKCdwb3JfemFzdF9jaGVjaycpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXIgPSB7IGl4c19lc3U6IG9iai52YWx1ZS5peHNfZXN1IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Icm9tYWRuZUFrY2VQcmlwYWQuemlza2VqWmFzdHVwY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGZpbHRlcnM6IGZpbHRlciB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkWmFzdHVwY2kgPSAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmQoXCJbZGF0YS1oZWxwLWNvbnRleHQ9J2xpc3Q6Z3JpZFphc3R1cGNpJ11cIikuZ2dyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi5jdXJyZW50VGFyZ2V0KS5maW5kKFwiW2RhdGEtaGVscC1jb250ZXh0PSdsaXN0OmdyaWRaYXN0dXBjaSddXCIpLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcygncG9yX3phc3RfY2hlY2snKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1LlByZWZhYnMudnliZXJFc3Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHByZWZhYnUgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3Zhbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogXCIwMDAwWDAwMDAwMDNcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemFkw6Fuw60gbG9nb3ZhY8OtY2ggw7pkYWp1IGplIG51dG5vc3QgaGxhdm7EmyBJWFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSwgICAgICAgICAvLyB2eWJyYXQgeiBlbnVtdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIkhyb21hZG7DqSBwxZlpZMOhbsOtIGRvdMSNZW7DqWhvIHN1Ympla3R1XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KSBhcyBHU2VsZWN0Qm94T3B0aW9uczxhbnk+KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCB2YXpieVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC53ZmxjdHl2KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF92YXpieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF92YXpieT12YWx1ZS50eXBfdmF6YnlcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEcnVoIHZhemJ5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LndmbHNkdmEoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2R2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19kdmE9dmFsdWUuaXhzX2R2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvem7DoW1rYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMjU0IH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBgVmF6YmEgdnl0dm/FmWVuYSAke2RhdGV9IHYgJHt0aW1lfWBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRMWvdm9kXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicmVhc29uXCIsIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMjU0IH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImluaXRfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSmUgaW5pY2nDoXRvcmVtXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnlyaXpfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSmUgY8OtbGVtXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9yX3phc3RfY2hlY2tcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb3XFvsOtdCB6w6FzdHVwY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdncmlkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRaYXN0dXBjaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYWxsLWF0LW9uY2VcIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLCAgLy8gcm93LCBjZWxsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvcFBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SGVhZGVyUm93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuSHJtQWtjZVphc3R1cGNlUHJpcGFkdSgpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybURvdGNlbnlTdWJaZVNrdXAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gdGhhdC5nZXRDdXJyZW50RGF0ZUFzU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gdGhhdC5nZXRDdXJyZW50VGltZUFzU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0zLTctMlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU2t1cGluYSBEU1VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiSGxlZGF0RXN1VmVTa3VwaW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntUZXh0TmFtZU9mR3JvdXB9ICh7VGV4dH0pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IDI1NCB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmdyb3VwX25hbWU9dmFsdWUuVGV4dE5hbWVPZkdyb3VwO21vZGVsLnRleHQ9dmFsdWUuVGV4dDttb2RlbC5peHNfcnpkPXZhbHVlLml4c19yemRcIixcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSAkKHRoaXMgYXMgKEdTZWxlY3RCb3hPcHRpb25zU2luZ2xlPGFueT4gJiBIVE1MRWxlbWVudCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1haW5EZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuU3NsLkRpYWxvZ3MuR1Z5YmVyRXN1U2t1cGlueURsZygkLmNvbnRlbnQoZmllbGQpLCBudWxsLCBHbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHb3JkaWMuVXRpbHMuV2lkZ2V0RXhpc3RzKFwiZ2ZpZWxkXCIsIGZpZWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICYmIHJldFZhbC5zZWxlY3RlZFJvdyAmJiByZXRWYWwuc2VsZWN0ZWRSb3cuVGV4dE5hbWVPZkdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCByZXRWYWwuc2VsZWN0ZWRSb3csIHsgdmFsaWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuZ2ZpZWxkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5EZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1haW5EZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHZhemJ5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LndmbGN0eXYoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3ZhemJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3ZhemJ5PXZhbHVlLnR5cF92YXpieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRydWggdmF6YnlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Qud2Zsc2R2YSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZHZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2R2YT12YWx1ZS5peHNfZHZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAyNTQgfSksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IFwiVmF6YmEgdnl0dm/FmWVuYSBcIiArIGRhdGUgKyBcIiB2IFwiICsgdGltZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJExa92b2RcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJyZWFzb25cIiwgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAyNTQgfSksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8gWmF2b2zDoW7DrSBrYWxrdWxhY2UgZGF0dW3FryBwcm8gdGVybcOtbm92b3Uga2Fsa3VsYcSNa3VcclxuICAgICAgICB0ZXJtaW5vdmFLYWxrdWxhY2thQ2FsYygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbW9kZWxEYXRhOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJC5jb250ZW50KCkuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlzRm9ybVZhbGlkID0gZm9ybS5nZm9ybShcImlzVmFsaWRcIik7XHJcbiAgICAgICAgICAgIGlmICghaXNGb3JtVmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBtb2RlbERhdGEpO1xyXG4gICAgICAgICAgICAvL1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gJChmb3JtKTtcclxuICAgICAgICAgICAgJC5jb250ZW50KGN1cnJlbnRFbGVtZW50KS5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInNwb2N0aURhdHVteVwiLCB0ZXh0OiBcIlByb2LDrWjDoSB2w71wb8SNZXQgdGVybcOtbsWvLi4uXCIgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZG55UG0gPSBtb2RlbERhdGEuZG55X3BtO1xyXG4gICAgICAgICAgICB2YXIgZG55VnlrID0gbW9kZWxEYXRhLmRueV92eWs7XHJcbiAgICAgICAgICAgIHZhciBkYXREb3J1YyA9IG1vZGVsRGF0YS5kYXRfZG9ydWM7XHJcblxyXG4gICAgICAgICAgICBtb2RlbERhdGEucG9zdW5fdnlwX3BtID0gbW9kZWxEYXRhLnBvc3VuX3Z5cF9wbTtcclxuICAgICAgICAgICAgbW9kZWxEYXRhLnBvc3VuX3Z5cF92eWsgPSBtb2RlbERhdGEucG9zdW5fdnlwX3Z5aztcclxuXHJcbiAgICAgICAgICAgIC8vIERhdHVtIHZ5a29uYXRlbG5vc3RpIGEgbmFieXTDrSBwcsOhdm7DrSBtb2NpIHNlIGJ1ZGUgcG/EjcOtdGF0IHYgREJcclxuICAgICAgICAgICAgaWYgKGRueVBtICE9IG51bGwgJiYgZG55VnlrICE9IG51bGwgJiYgZGF0RG9ydWMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAudnlwb2NldERhdFRlcm1pbkthbGsoeyBkYXRhOiBtb2RlbERhdGEgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZGF0X3BtXCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgcmVzdWx0LmRhdF9wbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImRhdF92eWtcIikuZ2ZpZWxkKFwic2V0SW5pdGlhbFwiLCByZXN1bHQuZGF0X3Z5a29uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoY3VycmVudEVsZW1lbnQpLmVuZE9wZXJhdGlvbih7IGlkOiBcInNwb2N0aURhdHVteVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBBa2NlIHBybyB6b2JyYXplbsOtIGRldGFpbHUgdnltw6Fow6Fuw61cclxuICAgICAgICBvcGVuRGV0YWlsVnltKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoYXQuZ3JpZFZ5bWFoYW5pPy5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgaWYgKHJvdyAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHUEMgcyBrbmlob3UgeiBha3R1w6FsbsOtaG8gesOhem5hbXVcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0dwYyA9IChyb3cgPyBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhhdC5ncGMsIHJvdy5peHBfZGVuISkgOiB0aGF0LmdwYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxWeW1haGFuaVwiLCB7IGdwYzogbmV3R3BjLCBncmlkUmVtb3RlQ29udHJvbDogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh0aGF0LmdyaWRWeW1haGFuaSl9XSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdEZXRhaWxWeW1haGFuaSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwTnZ5OiByb3cuaXhwX252eVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gcG9tb2Nuw6kgZnVua2NlXHJcbiAgICAgICAgbm9ybWFsaXplV2hpdGVzcGFjZShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXREYXRlQXNTdHJpbmcoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheTogbnVtYmVyID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vbnRoOiBudW1iZXIgPSBkYXRlLmdldE1vbnRoKCkgKyAxOyAvLyBNb250aHMgYXJlIHplcm8tYmFzZWQsIHNvIHdlIGFkZCAxXHJcbiAgICAgICAgICAgIGNvbnN0IHllYXI6IG51bWJlciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSBsZWFkaW5nIHplcm9zIGZvciBkYXkgYW5kIG1vbnRoIGlmIG5lY2Vzc2FyeVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXk6IHN0cmluZyA9IGRheSA8IDEwID8gJzAnICsgZGF5IDogZGF5LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZE1vbnRoOiBzdHJpbmcgPSBtb250aCA8IDEwID8gJzAnICsgbW9udGggOiBtb250aC50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgLy8gRm9ybWF0IHRoZSBkYXRlIGFzIGRkLm1tLnl5eXlcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZTogc3RyaW5nID0gYCR7Zm9ybWF0dGVkRGF5fS4ke2Zvcm1hdHRlZE1vbnRofS4ke3llYXJ9YDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZWREYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWsOtc2vDoW7DrSBkbmXFoWthIGpha28gc3RyaW5nXHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRDdXJyZW50RGF0ZUFzU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGUgPSB0aGlzLmdldERhdGVBc1N0cmluZyhjdXJyZW50RGF0ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZWREYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWsOtc2vDoW7DrSBha3R1w6FsbsOtaG8gxI1hc3UgamFrbyBzdHJpbmdcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldEN1cnJlbnRUaW1lQXNTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBob3VyczogbnVtYmVyID0gY3VycmVudERhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlczogbnVtYmVyID0gY3VycmVudERhdGUuZ2V0TWludXRlcygpO1xyXG5cclxuICAgICAgICAgICAgLy8gRW5zdXJlIGxlYWRpbmcgemVyb3MgZm9yIGhvdXJzIGFuZCBtaW51dGVzIGlmIG5lY2Vzc2FyeVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRIb3Vyczogc3RyaW5nID0gaG91cnMgPCAxMCA/ICcwJyArIGhvdXJzIDogaG91cnMudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkTWludXRlczogc3RyaW5nID0gbWludXRlcyA8IDEwID8gJzAnICsgbWludXRlcyA6IG1pbnV0ZXMudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZvcm1hdCB0aGUgdGltZSBhcyBoaC5tbVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lOiBzdHJpbmcgPSBgJHtmb3JtYXR0ZWRIb3Vyc306JHtmb3JtYXR0ZWRNaW51dGVzfWA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0dGVkVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICB9XHJcbn0iXX0=