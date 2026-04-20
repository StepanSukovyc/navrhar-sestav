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
            let GROB = class GROB extends Gordic.GContentBase {
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
                    menu.push({ action: that.actions.actTest, favorite: true }, { action: that.actions.actPripadDDP, favorite: true }, { action: that.actions.actKontrola, favorite: true }, { action: that.actions.actStorno, favorite: true }, { action: that.actions.actTisk, favorite: true }, { action: that.actions.actSpis, favorite: true }, { action: that.actions.actDetail, favorite: true }, { action: that.actions.actOdeslatNoveZas, favorite: false }, { action: that.actions.actOdeslatPripZas, favorite: false }, { action: that.actions.actGenerovatElDok, favorite: false });
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
                            enabled: that.params.ddp_rez_zjedno === 3 ? false : true,
                            run: () => {
                                var selection = that.gridVymahani.ggrid("getSelection");
                                if (selection.length != 0) {
                                    var sel = selection[0];
                                    //? je tady nutný mít typ_phl na vstupu pro otevření detailu případu ?
                                    WebClient.Common.Pripady.openPripadDetail(this, sel.ixp_ddp);
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
                                        ixpNvy: row.ixp_nvy,
                                        typPhl: row.typ_phl
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
                                const row = that.gridVymahani?.ggrid("activeRow");
                                if (row != undefined) {
                                    that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                        ID: "DDPGDetailVymahani#",
                                        ixpNvy: row.ixp_nvy,
                                        typPhl: row.typ_phl
                                    });
                                }
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
                                    ixpNvy: row.ixp,
                                    typPhl: row.typ_phl
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
                                // Nebyl vybrán žádný další případ k vymáhání, chce tedy vymáhat všechy(Ano) nebo pouze vymáhaný případ(Ne) ?
                                var cnt = $.content(ev.target);
                                cnt.navigate("Gordic.Ddp.WebClient.GVyberPripadu", { ID: 'DDPGVyberPripadu#', ixp: ixpDdp, ixsEsu: ixsEsu })
                                    .on("close", (_ev, retVal) => {
                                    that.pripadyVymahani = [that.DtoPripadu];
                                    if (retVal != null) {
                                        retVal.data.forEach((item) => {
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
                                    that.dialogs.simpleForm("Výsldek dotažení data doručení vymáhání", form);
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
                                //const modelDto: Gordic.Ddp.Interface.LK.Isl.GModelVymahaniDto = {
                                //    reason: model.reason,
                                //    rusit_vyp: model.rusit_vyp
                                //};
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
                                    that.dialogs.confirm("Kontrolní dotaz nastavení příznaku tisku", "Pokud víte, že tisk vymáhání dopadl v pořádku, už ho nechcete tisknout znovu a chcete změnit stav tisku vymáhání, tak odpovězte ANO." +
                                        "\n\n Pokud chcete tisk opakovat, protože se zmačkal papír v tiskárně, chcete si udělat kopii, některá sestava je chybná atd., pak odpovězte NE.", 465)
                                        .on("close", (_ev, retVal) => {
                                        if (retVal === "yes") {
                                            that.isl.VymahaniDDP.nastavPriznakTiskuVymahani().get();
                                        }
                                    });
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
                    $.newDiv().appendTo(this.element) // nefunguje vytvořit vlastní filtr
                        .gfilterpanel(
                    //! Vytvoření standardních parametrů filterpanelu pro EKO moduly
                    Gordic.Eko.Filters.getFilterParams(formulare, [], // oblíbené filtry
                    "ddp_ptm_vymah", // téma tisku
                    null, //"ixs_fun_akt", //sloupec z DTO pro filtr "*vlastní" nebo null, pokud nemá být
                    function (event, obj) {
                        that.filterData = obj.filter;
                        that.ziskejData(obj.filter);
                    }, ({ ds: 2, el_obraz: 2, predpisy: 1, platby: 1 }), // pevný filtr
                    true, // navigátor v detailu filtru
                    that));
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
                            that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GIdentifikator", {
                                ID: "DDPGIdentifikator#",
                            }, "Zadání identifikátoru", 380, 150)
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
                                ixpNvy: result,
                                typPhl: data.typ_phl
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
                    if (that.vymahatDale) {
                        that.isl.VymahaniDDP.existujeNastaveniExekuce({ typPhl: that.typPhl })
                            .get()
                            .done((existuje) => {
                            if (!existuje) {
                                $.content().findFields("exekuce").gfield("disable");
                            }
                            $.content().findFields("ixs_skv").gfield("setValue", { ixs_skv: modelData.ixs_skv, nazev: modelData.ixs_skv_nazev, barva: modelData.barva });
                            $.content().findFields("algoritmus").gfield("setValue", { alg_vym: modelData.alg_vym, alg_vym_txt: modelData.alg_vym_txt });
                            $.content().findFields("stav_vym").gfield("setValue", { stav_vym: modelData.stav_vym, stav_vym_txt: modelData.stav_vym_txt });
                            $.content().findFields("stav_vym_old").gfield("setValue", { stav_vym: modelData.stav_vym_old, stav_vym_txt: modelData.stav_vym_old_txt });
                            $.content().findFields("datum").gfield("setInitial", { start: modelData.dat_od, end: modelData.dat_do });
                            that.vymahatDale = false;
                        });
                    }
                    else {
                        if (that.striktniRezim) {
                            that.isl.VymahaniDDP.vratDatumyPoslednihoKrokuVymahani({ id: that.DtoPripadu.ixp })
                                .get()
                                .done((datumy) => {
                                if (datumy != null) {
                                    dat_od = datumy[0].dat_od;
                                    dat_do = datumy[0].dat_do;
                                    $.content().findFields("datum").gfield("setInitial", { start: dat_od, end: dat_do });
                                }
                            });
                        }
                        // Pokud není exekuce nastavena, není povoleno ani vymáhat s náklady exekuce
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
                                    $.content().findFields("ixs_skv").gfield("setValue", skupina);
                                    $.content().findFields("algoritmus").gfield("setValue", algoritmus);
                                }
                                if (Object.keys(modelData).length != 0) {
                                    $.content().findFields("stav_vym").gfield("setValue", { stav_vym: modelData.stav_vym, stav_vym_txt: modelData.stav_vym_txt });
                                    $.content().findFields("stav_vym_old").gfield("setValue", { stav_vym: modelData.stav_vym_old, stav_vym_txt: modelData.stav_vym_old_txt });
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
                            }
                            else { // striktní režim
                                if (Object.keys(modelData).length != 0) {
                                    $.content().findFields("ixs_skv").gfield("setValue", { ixs_skv: modelData.ixs_skv, nazev: modelData.nazev_skupina, barva: modelData.barva });
                                    $.content().findFields("algoritmus").gfield("setValue", { alg_vym: modelData.alg_vym, alg_vym_txt: modelData.alg_vym_txt });
                                    $.content().findFields("stav_vym").gfield("setValue", { stav_vym: modelData.stav_vym, stav_vym_txt: modelData.stav_vym_txt });
                                    $.content().findFields("stav_vym_old").gfield("setValue", { stav_vym: modelData.stav_vym_old, stav_vym_txt: modelData.stav_vym_old_txt });
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
                            }
                        });
                    }
                }
                /**
                 * Formulář pro hromadnou akci "vymáhání"
                 * @returns
                 */
                formularVymahani(modelData) {
                    var that = this;
                    // Pokud je modelData naplněn, znamená to že se opakuje akce, tudíž není nutné přednastavit
                    that.inicialniHodnotyProFormularVymahani(modelData);
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
                            }
                            else {
                                datSplField.gfield("setValue", null);
                                datVznikuField.gfield("setValue", null);
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
                                $(ev.currentTarget).findFields("ixs_dva").gfield("enable");
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
                            defaultAction: that.actions.actGridVychoziAkce,
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
                        ixpNvy: ixp_nvy,
                        typPhl: typ_phl
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
                            //if (obj.value && that.prizSpr) {
                            //    var ixsFun = obj.value.ixs_fun;
                            //    // pokud je správcovský typ pohledávky,
                            //    // tak zjistíme zda má zpracovatel přístup ke správcům
                            //    // a pokud ne, tak hodíme hlášku? a pokud jich je víc,
                            //    // tak zaktivníme vyběr správce
                            //    that.beginOperation({ id: "pristupKeSpravci", text: "Probíhá kontrola přístupu ke správcům..." });
                            //    that.isl.Redistribuce.pristupKeSpravci({ ixsFun: obj.value.ixs_fun ?? "" })
                            //        .get().done((result: any) => {
                            //            that.endOperation({ id: "pristupKeSpravci" });
                            //            if (result == 0) {
                            //                // nemá žádné přístupné správce
                            //                that.findForms("pripadForm").findFields("cis_spr").gfield("reset");
                            //                that.findForms("pripadForm").findFields("cis_spr").gfield("disable");
                            //                that.dialogs.alert(
                            //                    "Upozornění", "Vybraná funkce nemá přístup k žádnému správci.");
                            //            }
                            //            else if (result > 1) {
                            //                // má více přístupných správců, tak zobrazíme výběr správce
                            //                var filter: any = {
                            //                    typ_phl: that.typPhl,
                            //                    ixs_fun: ixsFun ?? ""
                            //                }
                            //                var view = new Isl.View(that.isl.Redistribuce.listSpravci(
                            //                    rq => {
                            //                        return {
                            //                            filters: filter
                            //                        }
                            //                    }
                            //                ))
                            //                var grid = $('div[data-form="pripadForm"] .gform-field.ggrid');
                            //                grid.ggrid("setData", view);
                            //            } 
                            //        })
                            //}
                            if (that.actions.actTiskPredani) {
                                if (obj.value)
                                    that.actions.actTiskPredani.enabled(true);
                                else
                                    that.actions.actTiskPredani.enabled(false);
                            }
                        }
                    });
                    // Typ pohledávky je správcovský, tak zobrazíme formulář pro správce - pouze na případech DDP
                    //if (that.prizSpr == 1) {
                    //    form
                    //        .addSection({ name: "gridSection" })
                    //        .addRow()
                    //        .addField("ggrid", {
                    //            data: [],
                    //            rowHeight: 30,
                    //            columns: Gordic.Ddp.WebClient.Common.GridFormats.SpravciProPredani(),
                    //            showTopPanel: false,
                    //            showBottomPanel: true
                    //        })
                    //}
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
                                            typ_phl: that.typPhl, // TODO - to se nemá posílat, jak zjistit na async ekoparams
                                            ixp_den: that.ixpDen, // TODO - to se nemá posílat, jak zjistit na async ekoparams
                                            subrada: that.subrada, // TODO - to se nemá posílat, jak zjistit na async ekoparams
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
                    var asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpRedistribuceAsyncTask";
                    // příznak: 0 - předání, 10 - přidělení, 20 - převzetí
                    let parametry = {
                        predaniDtos: data, // předávané/přidělované případy
                        prevzetiDtos: data, // převzaté případy
                        priznak: priznak, // příznak redistribuce
                        modelRedist: model, // model pro předání/přidělení
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
                        model: "model.typ_vpp=value.typ_vpp",
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
            GROB = __decorate([
                Decorators.gcontent
            ], GROB);
            WebClient.GROB = GROB;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JPQmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUk9CaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBRWpCLHdFQUF3RTtBQUN4RSxJQUFVLE1BQU0sQ0FvK0hmO0FBcCtIRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FvK0huQjtJQXArSGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW8rSDdCO1FBcCtIb0IsV0FBQSxTQUFTO1lBQzFCOzs7OztlQUtHO1lBRUgsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSyxTQUFRLE9BQUEsWUFBWTtnQkFBdEM7O29CQStCSSx3Q0FBd0M7b0JBQ3hDLFdBQU0sR0FBa0IsSUFBSSxDQUFDO29CQVM3Qiw4REFBOEQ7b0JBQzlELG9CQUFlLEdBQVEsRUFBRSxDQUFDO29CQUMxQiwwRUFBMEU7b0JBQzFFLDRCQUF1QixHQUFRLEVBQUUsQ0FBQztvQkFHbEMsNENBQTRDO29CQUM1QyxpQkFBWSxHQUFRLEVBQUUsQ0FBQztvQkFDdkIsc0RBQXNEO29CQUN0RCxjQUFTLEdBQVksS0FBSyxDQUFDO29CQUMzQixpRUFBaUU7b0JBQ2pFLHFCQUFnQixHQUFZLEtBQUssQ0FBQztvQkE2QmxDLDBDQUEwQztvQkFDMUMsY0FBUyxHQUFZLEtBQUssQ0FBQztvQkFHM0Isd0RBQXdEO29CQUN4RCxrQkFBYSxHQUFZLElBQUksQ0FBQztvQkFvNEg5QixZQUFZO2dCQUNoQixDQUFDO2dCQTMzSEcsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO29CQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztvQkFFN0IsSUFBSSxDQUFDLGFBQWEsRUFB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dEQsT0FBTyxhQUFhLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSCxzQkFBc0I7b0JBQ2xCLE1BQU0sV0FBVyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ3JDLE1BQU0sS0FBSyxHQUFXLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDN0MsTUFBTSxPQUFPLEdBQVcsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVqRCwwREFBMEQ7b0JBQzFELE1BQU0sY0FBYyxHQUFXLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDM0UsTUFBTSxnQkFBZ0IsR0FBVyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRW5GLDJCQUEyQjtvQkFDM0IsTUFBTSxhQUFhLEdBQVcsR0FBRyxjQUFjLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztvQkFFdEUsT0FBTyxhQUFhLENBQUM7Z0JBQ3pCLENBQUM7YUFFSixDQUFBO1lBMzlIWSxJQUFJO2dCQURoQixVQUFVLENBQUMsUUFBUTtlQUNQLElBQUksQ0EyOUhoQjtZQTM5SFksY0FBSSxPQTI5SGhCLENBQUE7UUFDTCxDQUFDLEVBcCtIb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBbytIN0I7SUFBRCxDQUFDLEVBcCtIZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbytIbkI7QUFBRCxDQUFDLEVBcCtIUyxNQUFNLEtBQU4sTUFBTSxRQW8rSGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5bWFoYW5pLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IFNlem5hbSB2eW3DoWjDoW7DrSBERFAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMTEtMDUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbi8vVE9ETyAtPiBkZXRhaWwgLT4gaHJvbWFkbsOpIHptxJtueSAoYWt0LmRvdC5zdWJqIGEgdiB6w6Fsb8W+Y2UgXCJuw6FzdHJvamVcIilcclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogU2V6bmFtIHZ5bcOhaMOhbsOtXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgVm9qdMSbY2ggxIxlY2hcclxuICAgICAqIEBkYXRlIDA1LjExLjIwMjRcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUk9CIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvKiogxIzDrXNsbyB0eXB1IHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgdHlwUGhsOiBzdHJpbmdcclxuICAgICAgICAvKiogScSMTyAqL1xyXG4gICAgICAgIGljbzogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBMaWNlbmNlIGRhdGFiw6F6ZSAqL1xyXG4gICAgICAgIGxpYzogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBSb2sgKi9cclxuICAgICAgICByb2s6IHN0cmluZztcclxuICAgICAgICAvKiogTcSbc8OtYyAqL1xyXG4gICAgICAgIG1lc2ljOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIEtuaWhhICovXHJcbiAgICAgICAgaXhwRGVuOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFJvayBrbmloeSAqL1xyXG4gICAgICAgIHJva0Rlbjogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBBa3R1w6FsbsOtIHXFvml2YXRlbCAqL1xyXG4gICAgICAgIGl4c0Z1bjogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBBa3R1w6FsbsOtIHXFvml2YXRlbCAtIGRsZSBza3VwaW55IHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgaXhzRnVuUG9kOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFR5cCBhZ2VkeSAqL1xyXG4gICAgICAgIHR5cEFnOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFpkYSBqZGUgbyBkaWxjaVZ5cG9jZXQgKi9cclxuICAgICAgICBkaWxjaVZ5cG9jZXQ6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIFRhYnVsa2Egdnltw6Fow6Fuw60gKi9cclxuICAgICAgICBncmlkVnltYWhhbmk6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIFBhcmFtZXRyIHpkYSBzZSBqZWRuw6EgbyB6b2JyYXplbsOtIHNlem5hbXUgdnltw6Fow6Fuw60gamVkbm9obyBwxZnDrXBhZHUgbmVibyB2xaFlY2ggKDEgLSBuYSBwxZnDrXBhZHUsIDAgLSB2xaFlY2gpKi9cclxuICAgICAgICBWeW1QcmlwYWR1OiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBEVE8gb2JzYWh1asOtY8OtIGRhdGEgcMWZw61wYWR1LCBwb2t1ZCBzZSBqZWRuw6EgbyB6b2JyYXplbsOtIHZ5bcOhaMOhbsOtIG5hIHDFmcOtcGFkdSAqL1xyXG4gICAgICAgIER0b1ByaXBhZHU6IGFueTtcclxuICAgICAgICAvKiogUGFyYW1ldHIgemRhIGplIHR5cCBwb2hsZWTDoXZreSBwb3V6ZSBwcm8gxId0ZW7DrSAqL1xyXG4gICAgICAgIHJlemltQ3Rlbmk6IGFueTtcclxuICAgICAgICAvKiogVHlwIGFsZ29yaXRtdSBuYSBza3VwaW7EmyB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIHR5cEFsZzogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqIEplZG7DoSBzZSBvIHN0cmlrdG7DrSByZcW+aW0gKi9cclxuICAgICAgICBzdHJpa3RuaVJlemltOiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBOdWzDoWsgZnVua2NlICovXHJcbiAgICAgICAgTnVsbEZ1bjogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBOdWzDoWsgc2t1cGlueSAqL1xyXG4gICAgICAgIE51bGxTa3Y6IHN0cmluZztcclxuICAgICAgICAvKiogQWtjZSAndnltw6Fow6Fuw60nIC0gTcOhIGRhbMWhw60gcMWZw61wYWR5LCBjbyBsemUgdnltw6Fow6F0ICovXHJcbiAgICAgICAgbWFQcmlwYWR5OiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBQxZnDrXBhZHkgdnltw6Fow6Fuw60gY28gc2UgYm91ZG91IHZ5bcOhaGF0IHYgYWtjaSAndnltw6Fow6Fuw60nICovXHJcbiAgICAgICAgcHJpcGFkeVZ5bWFoYW5pOiBhbnkgPSBbXTtcclxuICAgICAgICAvKiogUMWZw61wYWR5LCBrdGVyw6kganNvdSB2eWJyYW7DqSB6IG9rbmEgVnliZXJQcmlwYWR1LCBwxZlpIGFrY2kgJ3Z5bcOhaMOhbsOtJyovXHJcbiAgICAgICAgcHJpcGFkeVZ5bWFoYW5pTmFwb2plbmU6IGFueSA9IFtdO1xyXG4gICAgICAgIC8qKiBTdG9wa2EgemRhIGplIG5hxI10ZW7DqSB6amnFoXTEm27DrSB6ZGEgbcOhIHDFmcOtcGFkIGRhbMWhw60gcMWZw61wYWR1ICovXHJcbiAgICAgICAgZGVmTWFQcmlwYWR5OiBhbnk7XHJcbiAgICAgICAgLyoqIE1vZGVsIGRva29uxI1lbsOpaG8gZ2VuZXJvdsOhbsOtIHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgbW9kZWxEYXRhVnltOiBhbnkgPSBbXTtcclxuICAgICAgICAvKiogUGFyYW1ldHIgemRhIHNlIGplZG7DoSBvIHJlZnJlc2ggYWtjZSAndnltw6Fow6Fuw60nICovXHJcbiAgICAgICAgaXNSZWZyZXNoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqIFBhcmFtZXRyIHpkYSBzZSBqZWRuw6EgbyBwcnZuw60gbG9vcCByZWZyZXNoIGFrY2UgJ3Z5bcOhaMOhbsOtJyAqL1xyXG4gICAgICAgIHJlZnJlc2hGaXJzdExvb3A6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvKiogdmlldyB2eW3DoWjDoW7DrSovXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiB8IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPiB8IHVuZGVmaW5lZDtcclxuICAgICAgICAvKiogUMWZw61zdHVwb3bDqSBwYXJhbWV0cnkgKi9cclxuICAgICAgICBwcml2YXRlIHBhcmFtczogR29yZGljLkRkcC5JbnRlcmZhY2UuR0RkcFBhcmFtZXRyeUR0bztcclxuICAgICAgICAvKiogRmlsdHIgKi9cclxuICAgICAgICBwcml2YXRlIGZpbHRlckRhdGE6IGFueTtcclxuICAgICAgICAvKiogSmUgZ2VuZXJhY2UgxI3DrXNsYSBqZWRuYWPDrWhvIGFrdGl2bsOtICovXHJcbiAgICAgICAgaXNHZW5DakRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBKZSBnZW5lcmFjZSDEjcOtc2xhIGplZG5hY8OtaG8gemHFoWtydGzDvSAqL1xyXG4gICAgICAgIGlzR2VuQ2pDaGVja2VkOiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBUZXh0IHZyw6FjZW7DvSBwbyBpbml0dSBLbmloeSBhIHBvaGxlZMOhdmt5ICovXHJcbiAgICAgICAgSW5pdEVycm9yVGV4dDogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAvKiogSmVkbsOhIHNlIG8gYWtjaSAndnltw6FoYXQgZMOhbGUnICovXHJcbiAgICAgICAgdnltYWhhdERhbGU6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIEhvZG5vdHkga29udHJvbHkgKi9cclxuICAgICAgICBuZW1hX3BvbG96a3k6IGJvb2xlYW47XHJcbiAgICAgICAgbmVzb3VobGFzaV9zdW1hOiBib29sZWFuO1xyXG4gICAgICAgIG5lbWFfcHJlZHBpczogYm9vbGVhbjtcclxuICAgICAgICBkc3VfemVtcmVsOiBib29sZWFuO1xyXG4gICAgICAgIG5lbWFfZHN1OiBib29sZWFuOyAgIFxyXG4gICAgICAgIC8qKiBTdWLFmWFkYSAqL1xyXG4gICAgICAgIHN1YnJhZGE6IG51bWJlcjtcclxuICAgICAgICAvKiogaXN6ciwgcG92b2xlbsOtIHDFmcOtc3R1cHUgKi9cclxuICAgICAgICBpc3pyOiBib29sZWFuO1xyXG4gICAgICAgIC8qKiBFa29Oa3MgICovXHJcbiAgICAgICAgY3ZFa29Oa3M6IHN0cmluZztcclxuICAgICAgICAvKiogUMWZw616bmFrIHNwcsOhdmNlICovXHJcbiAgICAgICAgcHJpelNwcjogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBQxZnDrXpuYWsgdGlza3UgcMWZZWTDoXZhY8OtaG8gcHJvdG9rb2x1ICovXHJcbiAgICAgICAgcHJpelByaW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqIHBhcmFtdGV0ciBYMDAwOSBwcm8gdGlzayAqL1xyXG4gICAgICAgIFgwMDA5OiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFDFmcOtem5haywgemRhIHNlIGplZG7DoSBvIHBydm7DrSBzcHXFoXTEm27DrSBrYWxrdWxhxI1reSAqL1xyXG4gICAgICAgIGthbGtGaXJzdFRpbWU6IGJvb2xlYW4gPSB0cnVlOyBcclxuICAgICAgICAvKiogR3JpZCB6w6FzdHVwY8WvIERTVSBcclxuICAgICAgICAqIEB0eXBlIHtKUXVlcnk8Pn1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFphc3R1cGNpOiBKUXVlcnk7XHJcblxyXG5cclxuICAgICAgICAvKiogdXRpbGl0YSBwcm8gbsOhaGxlZCBuYSBib8SNbsOtIHN0cmFuxJsgb2tuYSAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJldmlld0NvbnRyb2xsZXI6IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXI7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwiVnltw6Fow6Fuw61cIjtcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdWeW1haGFuaVwiO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlTWVudSgpO1xyXG4gICAgICAgICAgICB0aGF0LnZ5bWFoYW5pUHJpcGFkdSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlcigpO1xyXG4gICAgICAgICAgICB0aGF0LmdyaWRWeW1haGFuaSA9IHRoYXQuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGF0LnJlemltQ3RlbmlQb3ZvbGVuaSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZVByZXZpZXcoKTsgLy8gdnl0dm/FmWVuw60gbsOhaGxlZHUgbmEgYm/EjW7DrSBzdHJhbsSbIG9rbmFcclxuXHJcbiAgICAgICAgICAgIERkcC5XZWJDbGllbnQuQ29tbW9uLkJhc2UuRGRwRWtvSW5pdCh0aGF0LCB0aGF0LkluaXRFcnJvclRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVQcmV2aWV3KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKFxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdJZDogXCJkZHA6VnltYWhhbmlQcmV2aWV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlemltQ3RlbmlQb3ZvbGVuaSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5yZXppbUN0ZW5pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5WeW1QcmlwYWR1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFBvZGFuaT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBwb2xvxb5layB2IG1lbnViYXJ1Ki9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1lbnU6IE1lbnVQYXJhbXNbXSA9IFtdOyAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBtZW51LnB1c2goXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFRlc3QsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFByaXBhZEREUCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0S29udHJvbGEsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFN0b3JubywgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VGlzaywgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0U3BpcywgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPZGVzbGF0Tm92ZVphcywgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE9kZXNsYXRQcmlwWmFzLCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0R2VuZXJvdmF0RWxEb2ssIGZhdm9yaXRlOiBmYWxzZSB9XHJcbiAgICAgICAgICAgICkgXHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5WeW1QcmlwYWR1KSB7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQb2RhbmksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RWeW1haGFuaSwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RWeW1haGF0RGFsZSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0QWt0dWFsaXphY2VEU1UsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSHJvbWFkbsOpIHptxJtueVwiLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IHRoYXQuY3JlYXRlQ2hpbGRyZW5Icm9tYWRuZU9wZXJhY2UoKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubWVudUJhcihtZW51KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBha2PDrSBwcm8gcG9sb8W+a3kgdiBtZW51YmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdHlwQWdTcGlzID0gdGhhdC50eXBBZ1xyXG4gICAgICAgICAgICBpZiAodGhhdC5wYXJhbXMuZGRwX3NzbF9nZW5zc2wgPT0gMSkgdHlwQWdTcGlzID0gMjBcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZChXZmwuUHJlQWN0aW9ucy5PdGV2cmlEZXRhaWxEb2t1bWVudHVTcGlzdSh7XHJcbiAgICAgICAgICAgICAgICBpbnB1dERhdGE6IChfYWN0aW9uOiBHQWN0aW9uLCBfZXZlbnQ/LCBjdHg/OiBhbnksIF9wYXJhbT86IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGV0YWlsRHRvOiB7IGl4cDogY3R4Lml4cC8qaXhwKi8gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQ6IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFp2ZXJlam5lbmlJbnB1dER0bzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogY3R4Lml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDdXJyZW50RGF0YVJvd1pzOiBjdHgucm93RHRvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cEFnOiB0eXBBZ1NwaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9OYWRSb3c6IHZvaWQgMCwgLy9wb3V6ZSB1IDEwLVDFmWlkYXQgcMWZw61sb2h1OyAyMC1PZGVicmF0IHDFmcOtbG9odTsgMzAtU3Rvcm5vIHp2ZcWZZWpuxJtuw607IDQwLVN0YWhub3V0IHp2ZcWZZWpuxJtuw607IDUwLUFrdHVhbGl6b3ZhdCBhIHZ5dcW+aXTDqSBwb3V6ZSBQcmVkVWxvemVuaW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcGVyYWNlOiBjdHgub3BlcmFjZSwgLy8wLURldGFpbCxQb2TDoW7DrTsgMTAtUMWZaWRhdCBwxZnDrWxvaHU7IDIwLU9kZWJyYXQgcMWZw61sb2h1OyAzMC1TdG9ybm8genZlxZllam7Em27DrTsgNDAtU3RhaG5vdXQgenZlxZllam7Em27DrTsgNTAtQWt0dWFsaXpvdmF0IC0tLSBhc2kgbmVidWRlIHBvdMWZZWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJpc3R1cEtlU2NodmFsaXQ6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJpc3R1cEtlWnZlcmVqbml0OiAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRvbmU6IChyZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXRWYWw/LmNyZWF0ZURpYWxvZ1Byb21pc2UoKS50aGVuKChjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVsb2FkIHBva3VkIGRvxaFsbyBrZSB6bcSbbsSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHg/Lm5hRGV0YWlsdURvc2xvS2VabWVuZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHRoYXQuZmlsdGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSlcclxuXHJcbiAgICAgICAgICAgIHZhciBqZUFrdGl2bmlWeW1haGFuaVByZXNTU0wgPSAoTnVtYmVyKHRoYXQucGFyYW1zLmRkcF9nZW5fc3Nsc3BpID8/IDApID4gMCB8fCBOdW1iZXIodGhhdC5wYXJhbXMuZGRwX3NzbF9qZWRzcGkgPz8gMCkgPiAwKSAmJiBOdW1iZXIodGhhdC5wYXJhbXMuZGRwX2dlbl9zc2x6YWsgPz8gMCkgPiAwO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VGVzdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRlc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJURVNUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB0ZXN0ID0gR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5nZXRBbGxUYXNrcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RQcmlwYWRERFA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmlwYWRERFBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZnDrXBhZCBERFBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJab2JyYXplbsOtIGRldGFpbHUgcMWZw61wYWR1IEREUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LnBhcmFtcy5kZHBfcmV6X3pqZWRubyA9PT0gMyA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbCA9IHNlbGVjdGlvblswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLz8gamUgdGFkeSBudXRuw70gbcOtdCB0eXBfcGhsIG5hIHZzdHVwdSBwcm8gb3RldsWZZW7DrSBkZXRhaWx1IHDFmcOtcGFkdSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLlByaXBhZHkub3BlblByaXBhZERldGFpbCh0aGlzLCBzZWwuaXhwX2RkcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdEtvbnRyb2xhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0S29udHJvbGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb250cm9sYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk5hc3RhdmVuw60ga29udHJvbG7DrWhvIGNob2R1IHZ5bcOhaGFuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0tvbnRyb2xuaUNob2RWeW1cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdLb250cm9sbmlDaG9kVnltI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lbWFfcG9sb3preTogdGhhdC5uZW1hX3BvbG96a3ksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVzb3VobGFzaV9zdW1hOiB0aGF0Lm5lc291aGxhc2lfc3VtYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZW1hX3ByZWRwaXM6IHRoYXQubmVtYV9wcmVkcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRzdV96ZW1yZWw6IHRoYXQuZHN1X3plbXJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZW1hX2RzdTogdGhhdC5uZW1hX2RzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgXCJOYXN0YXZlbsOtIGtvbnRyb2xuw61obyBjaG9kdSB2eW3DoWjDoW7DrVwiLCA3MzUsIDM1NSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoX2V2LCByZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5lbWFfcG9sb3preSA9IHJldFZhbC5uZW1hX3BvbG96a3k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5lc291aGxhc2lfc3VtYSA9IHJldFZhbC5uZXNvdWhsYXNpX3N1bWE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5lbWFfcHJlZHBpcyA9IHJldFZhbC5uZW1hX3ByZWRwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRzdV96ZW1yZWwgPSByZXRWYWwuZHN1X3plbXJlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmVtYV9kc3UgPSByZXRWYWwubmVtYV9kc3U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubmVtYV9wb2xvemt5IHx8IHRoYXQubmVzb3VobGFzaV9zdW1hIHx8IHRoYXQubmVtYV9wcmVkcGlzIHx8IHRoYXQuZHN1X3plbXJlbCB8fCB0aGF0Lm5lbWFfZHN1KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyRGF0YS5uZW1hX3BvbG96a3kgPSB0aGF0Lm5lbWFfcG9sb3preTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckRhdGEubmVzb3VobGFzaV9zdW1hID0gdGhhdC5uZXNvdWhsYXNpX3N1bWE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJEYXRhLm5lbWFfcHJlZHBpcyA9IHRoYXQubmVtYV9wcmVkcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyRGF0YS5kc3VfemVtcmVsID0gdGhhdC5kc3VfemVtcmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyRGF0YS5uZW1hX2RzdSA9IHRoYXQubmVtYV9kc3U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0LmZpbHRlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFN0b3Jubzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpydcWhZW7DrSB2xaFlY2ggYWt0aXZuw61jaCBhIHZ5YnJhbsO9Y2ggcMWZw61wYWTFryB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuenJ1c2VuaVZ5bWFoYW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdEdyaWRWeWNob3ppQWtjZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRWeWNob3ppQWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IChfZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93OiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguY2VsbEluZm8uZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdEZXRhaWxWeW1haGFuaSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cE52eTogcm93Lml4cF9udnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBQaGw6IHJvdy50eXBfcGhsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RUaXNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJUaXNrIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50aXNrVnltYWhhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U3Bpczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiRGV0YWlsIHNwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGplQWt0aXZuaVZ5bWFoYW5pUHJlc1NTTCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3cgPSB0aGF0LmdyaWRWeW1haGFuaT8uZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LnByaXpfc3BpcyA9IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnNbR29yZGljLldmbC5QcmVBY3Rpb25zLk5hbWVzLk90ZXZyaURldGFpbERva3VtZW50dVNwaXN1XT8ucnVuKHsgaXhwOiByb3cuaXhwX3NwaXMsIG9wZXJhY2U6IDAsIHJvd0R0bzogcm93IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiU3Bpc1wiLCBgUMWZw61wYWQgJHtyb3cuaXhwX252eX0gbmVuw60gdmxvxb5lbiBkbyBzcGlzdSFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiT3RldsWZZW7DrSBkZXRhaWx1IHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gdGhhdC5ncmlkVnltYWhhbmk/LmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxWeW1haGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogXCJERFBHRGV0YWlsVnltYWhhbmkjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBOdnk6IHJvdy5peHBfbnZ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwUGhsOiByb3cudHlwX3BobFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0RGV0YWlsSXhwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0RGV0YWlsSXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiT3RldsWZZW7DrSBkZXRhaWx1IHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93OiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0byA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogXCJERFBHRGV0YWlsVnltYWhhbmkjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cE52eTogcm93Lml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwUGhsOiByb3cudHlwX3BobFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UG9kYW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UG9kYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG9kw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5vdmVWeW1haGFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RBa3R1YWxpemFjZURTVToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEFrdHVhbGl6YWNlRFNVXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQWt0dWFsaXphY2UgRFNVXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiSHJvbWFkbsOhIGFrdHVhbGl6YWNlIGRvdMSNZW7DvWNoIHN1Ympla3TFryBuYSB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWt0dWFsaXphY2VEU1UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VnltYWhhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeW1haGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5bcOhaGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVnltw6Fow6Fuw60gbmEgcMWZw61wYWR1IEREUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lml4c0Z1biAhPSB0aGF0LkR0b1ByaXBhZHUuaXhzX2Z1bl9ha3QgJiYgdGhhdC5wYXJhbXMuZGRwX3JhZF9udnljaWQgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVtw6F0ZSBvcHLDoXZuxJtuw60gayB2eW3DoWjDoW7DrSBuYSB0b210byBwxZnDrXBhZHUuXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnltYWhhbmkoe30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RWeW1haGF0RGFsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5bWFoYXREYWxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnltw6FoYXQgZMOhbGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQb2tyYcSNb3bDoW7DrSB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRoYXQuZ3JpZFZ5bWFoYW5pPy5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuaXhzRnVuICE9IHJvdy5peHNfZnVuX2FrdCAmJiB0aGF0LnBhcmFtcy5kZHBfcmFkX252eWNpZCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVtw6F0ZSBvcHLDoXZuxJtuw60gayB2eW3DoWjDoW7DrSBuYSB0b210byBwxZnDrXBhZHUuXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIkNoY2V0ZSBvcHJhdmR1IHBva3JhxI1vdmF0IHZlIHZ5bcOhaMOhbsOtIHZ5YnJhbsOpaG8gcMWZw61wYWR1IGRhbMWhw61tIGtyb2tlbSB2eW3DoWjDoW7DrT8gXFxuIFxcbiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBva3VkIG9kcG92w610ZSBBTk8sIGJ1ZGUgcMWZZWRuYXN0YXZlbm8gbmFzdGF2ZW7DrSBwYXJhbWV0csWvIHZ5bcOhaMOhbsOtIGRsZSBha3R1w6FsbsSbIHZ5YnJhbsOpaG8gcMWZw61wYWR1IHZ5bcOhaMOhbsOtLlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJWeW3DoWjDoW7DrSBwxZnDrXBhZHUgZGFsxaHDrW0ga3Jva2VtIHZ5bcOhaMOhbsOtXCIsIG1lc3NhZ2UsIDQyMCwgMjEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9ldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwidnltYWhhdERhbGVcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gZGF0IHDFmWVkY2hvesOtaG8gdnltw6Fow6Fuw60uLi5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpOyAvLyBzdG9wa2EgemRhIGJ5bHkgesOtc2vDoW55IGRhdGEgcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIG5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gcMWZw61wYWQgKGFrY2UgamUgc3B1xaF0xJtuYSB6ZSBzZXpuYW11IHZ5bcOhaMOhbsOtKSwgdGFrIHrDrXNrw6FtZSBkbGUgxZnDoWRrdSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5EdG9QcmlwYWR1ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnpha2xhZG5pRGF0YVByaXBhZHUoeyBpeHBEZHA6IHJvdy5peHBfZGRwIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LkR0b1ByaXBhZHUgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmRhdGFFeGlzdHVqaWNpaG9WeW1haGFuaSh7IGl4cE52eTogcm93Lml4cF9udnkgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnltYWhhdERhbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInZ5bWFoYXREYWxlXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZ5bWFoYW5pKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdEhpc3RvcmllVnltOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0SGlzdG9yaWVWeW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJIaXN0b3JpZSB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkhpc3RvcmllIHZ5bcOhaMOhbsOtIG5hIHDFmcOtcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gJChjdHguZ3JpZCkuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJlaGxlZFZ5bWFoYW5pXCIsIHsgSUQ6ICdERFBHUHJlaGxlZFZ5bWFoYW5pIycsIGl4cDogcm93Lml4cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VnliZXJQcmlwYWR1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VnliZXJQcmlwYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVsO9YsSbciBwxZnDrXBhZMWvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVsO9YsSbciBwxZnDrXBhZMWvIHBybyB2eW3DoWjDoW7DrSBpIG9zdGF0bsOtY2ggcMWZw61wYWTFryBwb3BsYXRuw61rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cERkcCA9IHRoYXQuRHRvUHJpcGFkdS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXhzRXN1ID0gdGhhdC5EdG9QcmlwYWR1Lml4c19lc3U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmVieWwgdnlicsOhbiDFvsOhZG7DvSBkYWzFocOtIHDFmcOtcGFkIGsgdnltw6Fow6Fuw60sIGNoY2UgdGVkeSB2eW3DoWhhdCB2xaFlY2h5KEFubykgbmVibyBwb3V6ZSB2eW3DoWhhbsO9IHDFmcOtcGFkKE5lKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HVnliZXJQcmlwYWR1XCIsIHsgSUQ6ICdERFBHVnliZXJQcmlwYWR1IycsIGl4cDogaXhwRGRwLCBpeHNFc3U6IGl4c0VzdSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByaXBhZHlWeW1haGFuaSA9IFt0aGF0LkR0b1ByaXBhZHVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldFZhbC5kYXRhLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uRXh0ZXJuaVN1Ympla3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVzdV90eHQ6IGl0ZW0uZXN1X3R4dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0uZXN1X3R4dDsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJpcGFkeVZ5bWFoYW5pTmFwb2plbmUucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByaXBhZHlWeW1haGFuaS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0LnByaXBhZHlWeW1haGFuaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aXpHcmlkID0gJC5jb250ZW50KCkuZmluZChcIltkYXRhLWhlbHAtY29udGV4dD0nbGlzdDp3aXpHcmlkJ11cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpekdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFJlc2V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UmVzZXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeW3DoWhhdCB6bm92dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk9ibm92w60gZm9ybXVsw6HFmSB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNSZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWluQ29udGVudCA9ICQuY29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpekNvbnRlbnQgPSBtYWluQ29udGVudC5maW5kKFwiLmd3aXphcmRfX2NvbnRlbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQod2l6Q29udGVudCkuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnltYWhhbmkodGhhdC5tb2RlbERhdGFWeW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RPZGVzbGF0Tm92ZVphczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9kZXNsYXROb3ZlWmFzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2Rlc2xhdCBub3bDqSB6w6FzaWxreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk9kZXNsYXQgZWxla3Ryb25pY2t5IG5vdsOpIHrDoXNpbGt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vZGVzbGF0RWxla3Ryb25pY2t5KDApOyAvLyBuYXN0YXbDrW1lLCDFvmUgc2UgamVkbsOhIG8gb2Rlc2zDoW7DrSBub3bDvWNoIHrDoXNpbGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9kZXNsYXRQcmlwWmFzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2Rlc2xhdFByaXBaYXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPZGVzbGF0IHDFmWlwcmF2ZW7DqSB6w6FzaWxreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk9kZXNsYXQgZWxla3Ryb25pY2t5IHDFmWlwcmF2ZW7DqSB6w6FzaWxreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2Rlc2xhdEVsZWt0cm9uaWNreSgxKSAvLyBuYXN0YXbDrW1lLCDFvmUgc2UgamVkbsOhIG8gb2Rlc2zDoW7DrSBwxZlpcHJhdmVuw71jaCB6w6FzaWxla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RHZW5lcm92YXRFbERvayA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHZW5lcm92YXRFbERva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkdlbmVyb3ZhdCBlbGVrdHJvbmlja8OpIGRva3VtZW50eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2Rlc2xhdEVsZWt0cm9uaWNreSgyKTsgLy8gbmFzdGF2w61tZSwgxb5lIHNlIGplZG7DoSBvIGdlbmVyb3bDoW7DrSBlbGVrdHJvbmlja8O9Y2ggZG9rdW1lbnTFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RUaXNrUHJlZGFuaTogeyAvL3dmbF9wdG1faHJvbXByZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tQcmVkYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlRpc2sgcMWZZWTDoXZhY8OtaG8gcHJvdG9rb2x1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRpc2tQcmVkYW5pKGNudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFJvenBpc0xodXR5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Um96cGlzTGh1dHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb3pwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQb2Ryb2Juw70gcm96cGlzIGxoxa90eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KGV2LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZWw6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmZpbmRGb3JtcyhcIndpelBhcmFtc1wiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIG1vZGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5kYXRfZG9yID0gbW9kZWwuZGF0X2RvcnVjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsLmRhdF9kb3J1YztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kZWwuZGF0X2RvciA9PSBudWxsIHx8IG1vZGVsLmRhdF92eWsgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIlBvZHJvYm7DvSByb3pwaXMgbGjFr3R5XCIsIFwiSmUgdMWZZWJhIHphZGF0IHNwcsOhdm7DqSBkYXR1bSBkb3J1xI1lbsOtIGkgdnlrb25hdGVsbm9zdGkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKG1vZGVsLmRueV9wbSA+PSAwICYmIG1vZGVsLmRueV92eWsgPj0gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJQb2Ryb2Juw70gcm96cGlzIGxoxa90eVwiLCBcIkRueSBueWJ5dMOtIHByw6F2bsOtIG1vY2kgYW5pIHZ5a29uYXRlbG5vc3RpIG5lc23DrSBuYWLDvXZhdCB6w6Fwb3Juw71jaCBob2Rub3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgZGF0YSwgcHV0IGluIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbnQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJsb2FkUm96cGlzTGh1dHlcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gcG9sb8W+ZWsuLi5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAubGlzdFJvenBpc0xodXR5KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWRSb3pwaXNMaHV0eVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYuZG9uZSgodmlldykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdncmlkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dIZWlnaHQ6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlBvZHJvYm55Um96cGlzTGh1dHkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwiZGF0dW0sZGVuLHBvcGlzLGRlbl9saHV0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwidmlrZW5kXCIsIGZvcm11bGE6ICdFUVVBTFMoQHR5cF9kbmUsIDIwKSBvciBFUVVBTFMoQHR5cF9kbmUsIDMwKSBvciBFUVVBTFMoQHR5cF9kbmUsIDQwKScsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucmVkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY250LmRpYWxvZ3Muc2ltcGxlRm9ybShcIlBvZHJvYm7DvSByb3pwaXMgbGjFr3R5XCIsIGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gSFJPTUFETsOJIE9QRVJBQ0UgLSBNRU5VIFxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ2hpbGRyZW5Icm9tYWRuZU9wZXJhY2UoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbWVudVBhcmFtczogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICB2YXIga29udHJvbGFEb3J1Y2Vua3lQb3ZvbGVuYSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LnJlemltQ3RlbmkgfHwgdGhhdC5wYXJhbXMuZGRwX3Jlel96amVkbm8gPT0gMSB8fCB0aGF0LnBhcmFtcy5kZHBfcmV6X3pqZWRubyA9PSAyKSBrb250cm9sYURvcnVjZW5reVBvdm9sZW5hID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBtZW51UGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Rpc2tfb2Rlc2xcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5hc3RhdmVuw60gc3RhdnUgdGlza3UgYSBvZGVzbMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtVGl0bGUgPSBcIk96bmHEjWl0IGpha28gb2Rlc2xhbsOpIHZ5bcOhaMOhbsOtXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtTWVzc2FnZSA9IFwiT3ByYXZkdSBjaGNldGUgb3puYcSNaXQgesOhem5hbXkgbyB2eW3DoWjDoW7DrSBqYWtvIG9kZXNsYW7DqT9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oY29uZmlybVRpdGxlLCBjb25maXJtTWVzc2FnZSwgNDAwLCAyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWRWeW1haGFuaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UYXNrU3RhcnRIcm9tQWtjZShzZWxlY3Rpb24sIHt9LCBcIk5hc3RhdmVuaVN0YXZ1VGlza3VBT2Rlc2xhbmlcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgbWVudVBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl90aXNrX29kZXNsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXN0YXZlbsOtIHBvbGUgVsSbYyBwcm9maWx1IGRva3VtZW50dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlybVRpdGxlID0gXCJOYXN0YXZlbsOtIHBvbGUgVsSbY1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlybU1lc3NhZ2UgPSBcIk9wcmF2ZHUgY2hjZXRlIG5hc3Rhdml0IHBvbGUgJ1bEm2MnIHYgcHJvZmlsdSB2eW3DoWhhY8OtY2ggZG9rdW1lbnR1IChkbGUgbmFzdGF2ZW7DrSBwYXJhbWV0cnUpP1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShjb25maXJtVGl0bGUsIGNvbmZpcm1NZXNzYWdlLCA0MDAsIDIwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRhc2tTdGFydEhyb21Ba2NlKHNlbGVjdGlvbiwge30sIFwiTmFzdGF2ZW5pUG9sZVZlY1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIG1lbnVQYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRvcGxfZGF0X2RvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiSHJvbWFkbsOpIGRvcGxuxJtuw60gZGF0YSBkb3J1xI1lbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQua2Fsa0ZpcnN0VGltZSA9IHRydWU7IC8vIG5hc3RhdsOtbWUsIMW+ZSBzZSBqZWRuw6EgbyBwcnZuw60gxI1hcyBzcHXFoXTEm27DrSBrYWxrdWxhxI1reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZm9ybVRlcm1pbm92YUthbGt1bGFja2EoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5mb3JtVGVybWlub3ZhS2Fsa3VsYWNrYVZhbHVlcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGF0LmdyaWRWeW1haGFuaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmZpcm1NZXNzYWdlID0gXCJPcHJhdmR1IGNoY2V0ZSBuYXN0YXZpdCBkYXR1bSBkb3J1xI1lbsOtIChpIGRhdHVtIG5hYnl0w60gcHLDoXZuw60gbW9jaSBhIHZ5a29uYXRlbG5vc3RpKSA/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFEb3BsRGF0RG9ydWMuYmluZCh0aGF0LmlzbC5WeW1haGFuaUREUCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVudUdyaWQgPSBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0Um96cGlzTGh1dHkgfV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaHJvbWFkbmFPcGVyYWNlQXN5bmMoZGF0YSwgXCJOYXN0YXZlbsOtIGRhdGEgZG9ydcSNZW7DrVwiLCBDb21tb24uR3JpZEZvcm1hdHMuVnltRGF0RG9ydWMoKSwgXCJpeHBfbnZ5XCIsIGZvcm0sIFwiVsO9c2xlZGVrIHptxJtueVwiLCBjaGVja0Z1bmN0aW9uLCBcIkRvcGxEYXREb3J1Y1wiLCBjb25maXJtTWVzc2FnZSwgZGVzY3JpcHRpb24sIG1lbnVHcmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgbWVudVBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1NlcGFyYXRvcjBcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlcGFyYXRvclwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbWVudVBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpZF9kb3RfZG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZlpZMOhbsOtIGRvdMSNZW7DqWhvIGRva3VtZW50dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZm9ybURvdGNlbnlEb2soKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtTWVzc2FnZSA9IFwiT3ByYXZkdSBjaGNldGUgcMWZaWRhdCBkb2t1bWVudCBrIHrDoXpuYW3Fr20gbyB2eW3DoWjDoW7DrT9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrRnVuY3Rpb24gPSB0aGF0LmlzbC5WeW1haGFuaUREUC5rb250cm9sYVByaWRhbmlEb3RjRG9rLmJpbmQodGhhdC5pc2wuVnltYWhhbmlERFApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ocm9tYWRuYU9wZXJhY2VBc3luYyhkYXRhLCBcIlDFmWlkw6Fuw60gZG90xI1lbsOpaG8gZG9rdW1lbnR1XCIsIENvbW1vbi5HcmlkRm9ybWF0cy5WeW1haGFuaVNpbXBsZSgpLCBcIml4cF9udnlcIiwgZm9ybSwgXCJWw71zbGVkZWsgem3Em255XCIsIGNoZWNrRnVuY3Rpb24sIFwiUHJpZGFuaURvdGNEb2tcIiwgY29uZmlybU1lc3NhZ2UsIGRlc2NyaXB0aW9uLCBbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIG1lbnVQYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaWRfZG90X3N1YlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWTDoW7DrSBkb3TEjWVuw6lobyBzdWJqZWt0dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZm9ybURvdGNlbnlTdWIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtTWVzc2FnZSA9IFwiT3ByYXZkdSBjaGNldGUgcHJvdsOpc3QgaHJvbWFkbsOpIHDFmWlkw6Fuw60gZG90xI1lbsOpaG8gc3ViamVrdHU/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFQcmlkYW5pRG90Y1N1YmouYmluZCh0aGF0LmlzbC5WeW1haGFuaUREUCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmhyb21hZG5hT3BlcmFjZUFzeW5jKGRhdGEsIFwiUMWZaWTDoW7DrSBkb3TEjWVuw6lobyBzdWJqZWt0dVwiLCBDb21tb24uR3JpZEZvcm1hdHMuVnltYWhhbmlTaW1wbGUoKSwgXCJpeHBfbnZ5XCIsIGZvcm0sIFwiVsO9c2xlZGVrIHptxJtueVwiLCBjaGVja0Z1bmN0aW9uLCBcIlByaWRhbmlEb3RjU3VialwiLCBjb25maXJtTWVzc2FnZSwgZGVzY3JpcHRpb24sIFtdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgbWVudVBhcmFtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpZF9kb3Rfc3ViX3plX3NrdXBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkw6Fuw60gZG90xI1lbsOpaG8gc3ViamVrdHUgemUgc2t1cGlueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHRoYXQuZm9ybURvdGNlbnlTdWJaZVNrdXAoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtTWVzc2FnZSA9IFwiT3ByYXZkdSBjaGNldGUgcHJvdsOpc3QgaHJvbWFkbsOpIHDFmWlkw6Fuw60gZG90xI1lbsOpaG8gc3ViamVrdHU/XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFQcmlkYW5pRG90Y1N1YmouYmluZCh0aGF0LmlzbC5WeW1haGFuaUREUCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmhyb21hZG5hT3BlcmFjZUFzeW5jKGRhdGEsIFwiUMWZaWTDoW7DrSBkb3TEjWVuw6lobyBzdWJqZWt0dSB6ZSBza3VwaW55XCIsIENvbW1vbi5HcmlkRm9ybWF0cy5WeW1haGFuaVNpbXBsZSgpLCBcIml4cF9udnlcIiwgZm9ybSwgXCJWw71zbGVkZWsgem3Em255XCIsIGNoZWNrRnVuY3Rpb24sIFwiUHJpZGFuaURvdGNTdWJqWmVTa3VwXCIsIGNvbmZpcm1NZXNzYWdlLCBkZXNjcmlwdGlvbiwgW10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBtZW51UGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwic3RhdHVzU2VwYXJhdG9yMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2VwYXJhdG9yXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtZW51UGFyYW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrb250cm9sYV9kb3J1Y2VuZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRvdGHFvmVuw60gZGF0YSBkb3J1xI1lbsOtIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDoga29udHJvbGFEb3J1Y2Vua3lQb3ZvbGVuYSxcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJrb250cm9sYV9kb3J1Y2VuZWtcIiwgdGV4dDogXCJQcm9iw61ow6EgYWt0dWFsaXphY2UgZG9ydcSNZW5layBuYSB6w6F6bmFtZWNoIHZ5bcOhaMOhbsOtLi4uXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFEb3J1Y2VuZWsoeyB0eXB5UGhsOiBbXSB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGR0bzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb250cm9sYV9kb3J1Y2VuZWtcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLmRvbmUoKHZpZXcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2dyaWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dIZWlnaHQ6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuS29udHJvbGFEb3J1Y2VuZWsoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1RvcFBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0JvdHRvbVBhbmVsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybShcIlbDvXNsZGVrIGRvdGHFvmVuw60gZGF0YSBkb3J1xI1lbsOtIHZ5bcOhaMOhbsOtXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudVBhcmFtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBobGF2acSNa3kgKGZvcm11bMOhxZkpIGEgYWtjw60gZG8gbWVudSwgcG9rdWQgc2UgamVkbsOhIG8gdnltw6Fow6Fuw60gcMWZw61wYWR1ICovXHJcbiAgICAgICAgcHJpdmF0ZSB2eW1haGFuaVByaXBhZHUoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LlZ5bVByaXBhZHUpIHsgLy8gamVkbsOhIHNlIG8gdnltw6Fow6Fuw60gcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICB2YXIgZm9ybVByaXBhZHUgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInByaXBhZEZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEgTC0yLTgtMiwgTS0yLTgtMiwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCBwb2hsZWTDoXZreVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QudHlwUG9obGVkYXZreSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BobFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ0eXBfcGhsPXR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJZGVudGlmaWvDoXRvciBwxZnDrXBhZHVcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFByZWZhYnMuU3RyaW5nLml4cyh0cnVlKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIknEjE9cIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29fZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlZTXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJBxIxcIilcclxuICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlLEjFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJvZG5lQ2lzbG8oe30pXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMLTEtMTAtMSBNLTEtMTAtMSBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3BsYXRuw61rXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2VzdT1peHNfZXN1O2VzdV9kaWM9ZGljO21vZGVsLmxpYz12YWx1ZS5saWM7bW9kZWwucG9yX3phc3Q9dmFsdWUucG9yX3phc3RcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsIC8vIHDFmWlkw6Fuw60gcHJlZmFidSAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dvdmFuaTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IHRoYXQuRHRvUHJpcGFkdS5peHAgPz8gXCJcIiwgLy8gemFkw6Fuw60gbG9nb3ZhY8OtY2ggw7pkYWp1IGplIG51dG5vc3QgaGxhdm7EmyBJWFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksIC8vIHZ5YnJhdCB6IGVudW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiB0aGF0LkR0b1ByaXBhZHUuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJTZXpuYW0gdnltw6Fow6Fuw60gbmEgcMWZw61wYWR1XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIGFzIEdTZWxlY3RCb3hPcHRpb25zPGFueT4pXHJcblxyXG4gICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtUHJpcGFkdSkuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTsgICBcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcInByaXBhZEZvcm1cIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5EdG9QcmlwYWR1LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJyY1wiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHRoYXQuRHRvUHJpcGFkdS5FeHRlcm5pU3ViamVrdC5yYyk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgeyBpeHNfZXN1OiB0aGF0LkR0b1ByaXBhZHUuRXh0ZXJuaVN1Ympla3QuaXhzX2VzdSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFpydcWhZW7DrSB2xaFlY2ggYWt0aXZuw61jaCBhIHZ5YnJhbsO9Y2ggcMWZw61wYWTFryB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIHByaXZhdGUgenJ1c2VuaVZ5bWFoYW5pKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTE1TLTMtNy0yXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJExa92b2RcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJyZWFzb25cIiwgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAyNTQgfSksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicnVzaXRfdnlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUnXFoWl0IGppxb4gdnlwcmF2ZW7DqSBwxZnDrXBhZHlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1hc3NVcGRhdGUgPSB0aGF0LmlzbC5WeW1haGFuaUREUC5ydXNlbmlWeW1haGFuaS5iaW5kKHRoYXQuaXNsLlZ5bWFoYW5pRERQKTtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tGdW5jdGlvbiA9IHRoYXQuaXNsLlZ5bWFoYW5pRERQLmtvbnRyb2xhUnVzZW5pVnltYWhhbmkuYmluZCh0aGF0LmlzbC5WeW1haGFuaUREUCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICB0aGF0Lmhyb21hZG5hT3BlcmFjZShkYXRhLCBcIlpydcWhZW7DrSB2eW3DoWjDoW7DrVwiLCBDb21tb24uR3JpZEZvcm1hdHMuVnltYWhhbmlTaW1wbGUoKSwgXCJpeHBfbnZ5XCIsIGZvcm0sIFwiVsO9c2xlZGVrIHptxJtueVwiLCBtYXNzVXBkYXRlLCBjaGVja0Z1bmN0aW9uLCBcIk9wcmF2ZHUgY2hjZXRlIHpydcWhaXQgdnlicmFuw6kgesOhem5hbXkgbyB2eW3DoWjDoW7DrT9cIiwgXCJcIiwgW10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEFrdHVhbGl6YWNlIGRvdMSNZW7DvWNoIHN1Ympla3TFryBuYSB6w6F6bmFtZWNoIG8gdnltw6Fow6Fuw60geiBwxZnDrXBhZHUgRERQICovXHJcbiAgICAgICAgcHJpdmF0ZSBha3R1YWxpemFjZURTVSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBcIkhyb21hZG7DoSBha3R1YWxpemFjZSBwcm92ZWRlIGFrdHVhbGl6YWNpIGRvdMSNZW7DvWNoIHN1Ympla3TFryB6IHDFmcOtcGFkdSBERFAgbmEgdnltw6FoYWPDrWNoIGRva3VtZW50ZWNoIGRsZSBuYXN0YXZlbsOtIHR5cMWvIGRvdMSNZW7DvWNoIHN1Ympla3R1IHBybyBza3VwaW51IGEga3JvayB2eW3DoWjDoW7DrS5cIjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1hc3NVcGRhdGUgPSB0aGF0LmlzbC5WeW1haGFuaUREUC5ha3R1YWxpemFjZURTVS5iaW5kKHRoYXQuaXNsLlZ5bWFoYW5pRERQKTtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tGdW5jdGlvbiA9IHRoYXQuaXNsLlZ5bWFoYW5pRERQLmtvbnRyb2xhQWt0dWFsaXphY2VEU1UuYmluZCh0aGF0LmlzbC5WeW1haGFuaUREUCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICB0aGF0Lmhyb21hZG5hT3BlcmFjZShkYXRhLCBcIkFrdHVhbGl6YWNlIERTVVwiLCBDb21tb24uR3JpZEZvcm1hdHMuVnltYWhhbmlTaW1wbGUoKSwgXCJpeHBfbnZ5XCIsIG51bGwsIFwiVsO9c2xlZGVrIHptxJtueVwiLCBtYXNzVXBkYXRlLCBjaGVja0Z1bmN0aW9uLCBcIk9wcmF2ZHUgY2hjZXRlIGFrdHVhbGl6b3ZhdCBkb3TEjWVuw6kgc3ViamVrdHkgbmEgesOhem5hbWVjaCBvIHZ5bcOhaMOhbsOtIHogcMWZw61wYWTFryBERFA/IFxcbiBcXG4gTcSbanRlIHByb3PDrW0gbmEgcGFtxJt0aSwgxb5lIHNlIGtvcMOtcnVqZSBuYXN0YXZlbsOtIGRvdMSNZW7DvWNoIHN1Ympla3TFryBkbGUgbmFzdGF2ZW7DrSBza3VwaW55IHZ5bcOhaMOhbsOtIVwiLCBkZXNjcmlwdGlvbiwgW10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEZ1bmtjZSBrIG90ZXbFmWVuw60gb2tuYSBocm9tYWRuw71jaCB6bcSbbiAoRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50KSAqL1xyXG4gICAgICAgIGhyb21hZG5hT3BlcmFjZShkYXRhOiBhbnksIHRpdGxlOiBzdHJpbmcsIGdyaWRGb3JtYXQ6IGFueSwga2V5czogYW55LCBmb3JtOiBhbnksIGxhc3RTdGVwVGl0bGU6IHN0cmluZywgbWFzc1VwZGF0ZTogYW55LCBjaGVja0Z1bmN0aW9uOiBhbnksIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIG1lbnVHcmlkOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8YW55Pj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogZ3JpZEZvcm1hdCxcclxuICAgICAgICAgICAgICAgIGtleXM6IGtleXMsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlZ5YnJhbsOpIHDFmcOtcGFkeVwiLCAvLyB0aXR1bGVrIHYgdGFidSAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RHcmlkVnljaG96aUFrY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiUHJvdmXEj1wiLCAvLyBuw6F6ZXYgcHJvIHRsYcSNw610a28gZGFsxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBtZW51R3JpZCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBuYSB0YWJ1IHMgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4geyAvLyBha2NlIHBybyBrb250cm9sdSBkYXQsIG1vZGVsIC0gZGF0YSB6IG1vZGVsRGF0YSwgaW5wdXQgLSBncmlkIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWxEdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HTW9kZWxWeW1haGFuaUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYXNvbjogbW9kZWwucmVhc29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVzaXRfdnlwOiBtb2RlbC5ydXNpdF92eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGVja0Z1bmN0aW9uKHsgZHRvczogZGF0YSwgbW9kZWw6IG1vZGVsRHRvIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR01vZGVsVnltYWhhbmlEdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFzb246IG1vZGVsLnJlYXNvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1c2l0X3Z5cDogbW9kZWwucnVzaXRfdnlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlybVRpdGxlID0gXCJQb3R2cnplbsOtIGhyb21hZG7DqSBha2NlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25maXJtTWVzc2FnZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShjb25maXJtVGl0bGUsIGNvbmZpcm1NZXNzYWdlLCA0MDAsIDIwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzc1VwZGF0ZSh7IGR0b3M6IGRhdGEsIG1vZGVsOiBtb2RlbER0byB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNzVXBkYXRlKHsgZHRvczogZGF0YSwgbW9kZWw6IG1vZGVsRHRvIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmw6F6ZSAyIC0gem9icmF6ZW7DrcKtIHbDvXNsZWRrdSBzdG9ybmFcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogbGFzdFN0ZXBUaXRsZSwgLy9uYXpldiBrcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJBa3R1YWxpem92YW7DqSBwxZnDrcKtcGFkeVwiLCAvL3BvcGlzZWsgbmFkIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEdyaWRWeWNob3ppQWtjZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6ICgpID0+IHsgLy9wcmVkYW5pIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEodGhhdC5maWx0ZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxEZWxlZ2F0ZTogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIEZ1bmtjZSBrIG90ZXbFmWVuw60gb2tuYSBocm9tYWRuw71jaCB6bcSbbiAoRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50KSAqL1xyXG4gICAgICAgIGhyb21hZG5hT3BlcmFjZUFzeW5jKGRhdGE6IGFueSwgdGl0bGU6IHN0cmluZywgZ3JpZEZvcm1hdDogYW55LCBrZXlzOiBhbnksIGZvcm06IGFueSwgbGFzdFN0ZXBUaXRsZTogc3RyaW5nLCBjaGVja0Z1bmN0aW9uOiBhbnksIG5hemV2QWtjZTogYW55LCBjb25maXJtTWVzc2FnZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBtZW51R3JpZDogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxhbnk+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBncmlkRm9ybWF0LFxyXG4gICAgICAgICAgICAgICAga2V5czoga2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiVnlicmFuw6kgcMWZw61wYWR5XCIsIC8vIHRpdHVsZWsgdiB0YWJ1ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEdyaWRWeWNob3ppQWtjZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJQcm92ZcSPXCIsIC8vIG7DoXpldiBwcm8gdGxhxI3DrXRrbyBkYWzFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUdyaWRCYXI6IG1lbnVHcmlkLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha2NlIG5hIHRhYnUgcyBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7IC8vIGFrY2UgcHJvIGtvbnRyb2x1IGRhdCwgbW9kZWwgLSBkYXRhIHogbW9kZWxEYXRhLCBpbnB1dCAtIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zdCBtb2RlbER0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdNb2RlbFZ5bWFoYW5pRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZWFzb246IG1vZGVsLnJlYXNvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcnVzaXRfdnlwOiBtb2RlbC5ydXNpdF92eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrRnVuY3Rpb24oeyBkdG9zOiBkYXRhLCBtb2RlbDogbW9kZWwgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLnBvcl96YXN0X2NoZWNrID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnBvcl96YXN0ID0gdGhhdC5ncmlkWmFzdHVwY2kuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdaYXN0dXBjZUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF0ucG9yX3phc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5saWNfemFzdCA9IHRoYXQuZ3JpZFphc3R1cGNpLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkRHRvPihcImdldFNlbGVjdGlvblwiKVswXS5saWM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtVGl0bGUgPSBcIlBvdHZyemVuw60gaHJvbWFkbsOpIGFrY2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm1NZXNzYWdlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKGNvbmZpcm1UaXRsZSwgY29uZmlybU1lc3NhZ2UsIDQwMCwgMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVGFza1N0YXJ0SHJvbUFrY2UoZGF0YSwgbW9kZWwsIG5hemV2QWtjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5lbsOtIHBvdMWZZWJhIHBvdHZyemVuw60sIHRhayBqZWRlbSBkw6FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVGFza1N0YXJ0SHJvbUFrY2UoZGF0YSwgbW9kZWwsIG5hemV2QWtjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmw6F6ZSAyIC0gem9icmF6ZW7DrcKtIHbDvXNsZWRrdSBzdG9ybmFcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogbGFzdFN0ZXBUaXRsZSwgLy9uYXpldiBrcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJBa3R1YWxpem92YW7DqSBwxZnDrcKtcGFkeVwiLCAvL3BvcGlzZWsgbmFkIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEdyaWRWeWNob3ppQWtjZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6ICgpID0+IHsgLy9wcmVkYW5pIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuemlza2VqRGF0YSh0aGF0LmZpbHRlckRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbERlbGVnYXRlOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmtjZSBrIHrDrXNrw6Fuw60gZGF0YSBkbGUgZmlsdHJ1IGEga29udHJvbHlcclxuICAgICAgICAgKiBAcGFyYW0gZmlsdGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6aXNrZWpEYXRhKGZpbHRlcjogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHBva3VkIHNlIGplZG7DoSBvIHZ5bcOhaMOhbsOtIHDFmcOtcGFkdSwgdGFrIHDFmWlkw6FtZSBkbyBpZmx0cnUgw7pkYWplIG8gcMWZw61wYWR1XHJcbiAgICAgICAgICAgIGlmICh0aGF0LlZ5bVByaXBhZHUpIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5peHAgPSB0aGF0LkR0b1ByaXBhZHUuaXhwO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyLnR5cF9waGwgPSB0aGF0LkR0b1ByaXBhZHUudHlwX3BobDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQubmVtYV9wb2xvemt5IHx8IHRoYXQubmVzb3VobGFzaV9zdW1hIHx8IHRoYXQubmVtYV9wcmVkcGlzIHx8IHRoYXQuZHN1X3plbXJlbCB8fCB0aGF0Lm5lbWFfZHN1KSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIubmVtYV9wb2xvemt5ID0gdGhhdC5uZW1hX3BvbG96a3k7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIubmVzb3VobGFzaV9zdW1hID0gdGhhdC5uZXNvdWhsYXNpX3N1bWE7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIubmVtYV9wcmVkcGlzID0gdGhhdC5uZW1hX3ByZWRwaXM7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZHN1X3plbXJlbCA9IHRoYXQuZHN1X3plbXJlbDtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5uZW1hX2RzdSA9IHRoYXQubmVtYV9kc3U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJuYWNpdGFuaVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBwb2xvxb5lay4uLlwiIH0pXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmxpc3QoKCkgPT4geyAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBmaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodmlldyEuZ2V0Q291bnQoKSA+IDApO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJuYWNpdGFuaVwiIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZnDrSBncmlkL3Nlem5hbSBwxZnDrXBhZMWvICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkKCk6IEpRdWVyeSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vT3bEm8WZaXQgcG9wbGF0bsOta3kgbmEgSVNaUlxyXG4gICAgICAgICAgICAvL2tvbnRyb2xhTWV0YWRhdFxyXG4gICAgICAgICAgICB2YXIgamVQcml6bmFrVnl0aXN0ZW5pUG92b2xlbiA9ICF0aGF0LnJlemltQ3RlbmkgJiYgdGhhdC5wYXJhbXMuZGRwX3Z5bV9vem52eXQgPT09IDE7XHJcbiAgICAgICAgICAgIHZhciBqZVByaXpuYWtPZGVzbGFuaVBvdm9sZW4gPSAhdGhhdC5yZXppbUN0ZW5pICYmIHRoYXQucGFyYW1zLmRkcF92eW1fb3pub2RlID09PSAxO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGFjdGlvbkxpc3QgPSBuZXcgR0FjdGlvbkxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgYWN0S29udHJvbGFNZXRhZGF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb250cm9sYSBtZXRhZGF0XCIsIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5rb250cm9sYU1ldGFkYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T3Zlcml0UG9wbGF0bmlreUlTWlI6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LmlzenIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPdsSbxZlpdCBwb3BsYXRuw61reSBJU1pSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmhyb21hZG5lT3ZlcmVuaUlTWlIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T3Zlcml0RG90Y2VuZVN1YmpJU1pSOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5pc3pyLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT3bEm8WZaXQgZG90xI1lbsOpIHN1Ympla3R5IG5hIElTWlJcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaHJvbWFkbmVPdmVyZW5pRG90U3ViaklTWlIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0TmFzdGF2aXRQcml6bmFrVnl0aXN0ZW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogamVQcml6bmFrVnl0aXN0ZW5pUG92b2xlbixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5hc3Rhdml0IHDFmcOtem5hayB2eXRpxaF0xJtuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlQcml6bmFrdVRpc2t1KDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RacnVzaXRQcml6bmFrVnl0aXN0ZW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogamVQcml6bmFrVnl0aXN0ZW5pUG92b2xlbixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXQgcMWZw616bmFrIHZ5dGnFoXTEm27DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaVByaXpuYWt1VGlza3UoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE5hc3Rhdml0UHJpem5ha09kZXNsYW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogamVQcml6bmFrT2Rlc2xhbmlQb3ZvbGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmFzdGF2aXQgcMWZw616bmFrIG9kZXNsw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlQcml6bmFrdU9kZXNsYW5pKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RacnVzaXRQcml6bmFrT2Rlc2xhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBqZVByaXpuYWtPZGVzbGFuaVBvdm9sZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0IHDFmcOtem5hayBvZGVzbMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pUHJpem5ha3VPZGVzbGFuaSgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0T2Jub3ZpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGplUHJpem5ha09kZXNsYW5pUG92b2xlbixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ibm92ZW7DrSB2eWJyYW7DvWNoIHDFmcOtcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9ibm92ZW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByZWRhdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRoYXQucGFyYW1zLmRkcF9yYWRfdnltcHJlID09IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZllZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wcmVkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tGdW5jdGlvbiA9IHRoYXQuaXNsLlJlZGlzdHJpYnVjZS5rb250cm9sYVByZWRhbmkuYmluZCh0aGF0LmlzbC5SZWRpc3RyaWJ1Y2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LndpenphcmRSZWRpc3QoY2hlY2tGdW5jdGlvbiwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByaWRlbGl0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdGhhdC5wYXJhbXMuZGRwX3JhZF92eW1wcmQgPT0gMSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkxJtsaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaWRlbGl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrRnVuY3Rpb24gPSB0aGF0LmlzbC5SZWRpc3RyaWJ1Y2Uua29udHJvbGFQcmVkYW5pLmJpbmQodGhhdC5pc2wuUmVkaXN0cmlidWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC53aXp6YXJkUmVkaXN0KGNoZWNrRnVuY3Rpb24sIDEwKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByZXZ6aXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0aGF0LnBhcmFtcy5kZHBfcmFkX3Z5bXByaSA9PSAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZZXZ6w610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wcmV2eml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldnppdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiR1Z5bWFoYW5pR3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlldyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuVnltYWhhbmkoKSxcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudTogZnVuY3Rpb24gKGNlbGxDb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25MaXN0LmNyZWF0ZUJhcihbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE92ZXJpdFBvcGxhdG5pa3lJU1pSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE92ZXJpdERvdGNlbmVTdWJqSVNaUlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RLb250cm9sYU1ldGFkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3ROYXN0YXZpdFByaXpuYWtWeXRpc3RlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0WnJ1c2l0UHJpem5ha1Z5dGlzdGVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCItXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE5hc3Rhdml0UHJpem5ha09kZXNsYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNpdFByaXpuYWtPZGVzbGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCItXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RPYm5vdml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIi1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0UHJlZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFByaWRlbGl0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFByZXZ6aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlbDvWNob3rDrSBwb2hsZWRcIiwgX2xvY2tlZDogdHJ1ZSwgX2RlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwiVnlwcmF2ZW5vXCIsIGZvcm11bGE6IFwiSUYoSVNCTEFOSyhAZGF0X3Z5cCksIGZhbHNlLCB0cnVlLCB0cnVlKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmJsdWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAZWtvX2FrdCkpIGFuZCBAZWtvX2FrdCA9PSA1MDAsIHRydWUsIGZhbHNlLCBmYWxzZSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmF5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJacnXFoWVuXCIsIGZvcm11bGE6IFwiSUYoTk9UKElTQkxBTksoQGVrb19ha3QpKSBhbmQgQGVrb19ha3QgPT0gOTAwLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucHVycGxlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJBa3Rpdm7DrSBkw61sxI3DrSB2w71wb8SNZXRcIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAZGlsY2lfdnlwb2NldF90eHQpKSBhbmQgRVFVQUxTKEBkaWxjaV92eXBvY2V0X3R4dCwnQW5vJykgYW5kIEBla29fYWt0ID09IDEwMCwgdHJ1ZSwgZmFsc2UsIGZhbHNlKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyZWVuIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHggIT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5jZWxsSW5mbyAhPSBudWxsICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmNlbGxJbmZvLmRhdGEgIT0gbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KGN0eC5jZWxsSW5mby5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZHJvd3NjYWxjKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gVElTS1xyXG5cclxuICAgICAgICAvKiogVGlzayB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIHByaXZhdGUgdGlza1Z5bWFoYW5pKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHJvd3M6IGFueTtcclxuICAgICAgICAgICAgcm93cyA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAocm93cy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IHRleHQ6IFwiUHJvYsOtaMOhIGluaWNpYWxpemFjZSB0aXNrdS4uLlwiLCBpZDogXCJ0aXNrXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5pbnNlcnRERFBUUFJEKHsgcnE6IHsgUmVxdWVzdERhdGE6IHJvd3MgfSB9KS5nZXQoKS5kb25lKChyZXN1bHQ6IHN0cmluZ1tdKSA9PiB7ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC51cGRhdGVERFBTTlZZKHsgcnE6IHsgUmVxdWVzdERhdGE6IHJvd3MgfSB9KS5nZXQoKS5kb25lKChzdWNjZXNzOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInRpc2tcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcIlRpc2sgdsOtY2UgcMWZw61wYWTFryB2eW3DoWjDoW7DrVwiLCBcIlNlc3RhdmEgc2UgdGlza25lIHphIHbDrWNlIHrDoXpuYW3FryB2eW3DoWjDoW7DrSwgcG9rdWQgc2UgamVkbsOhIG8gc2VzdGF2dSwga3RlcsOhIHNlIG3DoSB1a2zDoWRhdCBqYWtvIGVsLiBvYnJheiB2eW3DoWjDoW7DrSwgc2VzdGF2YSBzZSBORVVMT8W9w40hIFxcbiBcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBva3VkIGNoY2V0ZSB2eXR2b8WZaXQgZWwub2JyYXogYSB1bG/Fvml0IGplaiBrIHZ5bcOhaMOhbsOtLCBwcm92ZcSPdGUgdGlzayB6IGRldGFpbHUgdnltw6Fow6Fuw60uXCIsIDM2MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwib2tcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrY2VUaXNrdShudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvL3BvdXplIHRpc2sgbmEgMSBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cF9udnkgPSByZXN1bHRbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF2X3Z5bSA9IHJvd3MuZmluZCgoaXRlbTogeyBpeHBfbnZ5OiBzdHJpbmc7IH0pID0+IGl0ZW0uaXhwX252eSA9PT0gaXhwX252eSk/LnN0YXZfdnltO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFrY2VUaXNrdShyZXN1bHRbMF0sIHN0YXZfdnltKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwidGlza1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYSB0aXNrdVwiLCBcIsW9w6FkbsO9IHogdnlicmFuw71jaCBwxZnDrXBhZMWvIG5lb2Rwb3bDrWTDoSBwb2Rtw61ua8OhbSB0aXNrdS5cIilcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNhbW90bsOhIGZ1bmtjZSBrIHZvbMOhbsOtIHRpc2tvdsOpIGFrY2VcclxuICAgICAgICAgKiBAcGFyYW0gcHJpcGFkeVxyXG4gICAgICAgICAqIEBwYXJhbSBzdGF2X3Z5bVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYWtjZVRpc2t1KGl4cDogYW55LCBzdGF2X3Z5bTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gdXBkYXRlIHByb8WhZWwgYmV6IHByb2Jsw6ltxa8gdGFrIHBva3JhxI11amVtZVxyXG4gICAgICAgICAgICBjb25zdCBhY3RUaXNrVnltYWhhbmkgPSBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1Z5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcImRkcF9wdG1fbnZ5XCIsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21EdG86IHtcclxuICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiB0aGF0Lml4cERlbixcclxuICAgICAgICAgICAgICAgICAgICByb2tfZGVuOiB0aGF0LnJva0RlbixcclxuICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0aGF0LnR5cFBobCxcclxuICAgICAgICAgICAgICAgICAgICBpeHA6IGl4cCxcclxuICAgICAgICAgICAgICAgICAgICBzdGF2X3Z5bTogc3Rhdl92eW1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJSZXN0cmljdGlvbkFsZk1ldGhvZDogXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwV2ViVGlzazpHZXRSZXN0cmljdGlvbkFsZlwiLCAgLy8gZmlsdHIgcHJvIG1vxb5uw6kgdGlza3lcclxuICAgICAgICAgICAgICAgIC8vIOKGkyBNZXRvZGEsIGt0ZXLDoSBqZSB6YXZvbMOhbmEgdMSbc27EmyBwxZllZCBnZW5lcm92w6Fuw61tIHNlc3RhdnkgYSBrZGUgbHplIG5hIHN0cmFuxJsgc2VydmVydSBvdmxpdm5pdCBwYXJhbWV0cnkgc2VzdGF2eSDihpNcclxuICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwV2ViVGlzazpUaXNrVnltYWhhbmlcIiwgIC8vemRlIHNlIHBsbsOtIHTDqW1hXHJcbiAgICAgICAgICAgICAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmtvbnRyb2xhUG9UaXNrdSgpLmdldCgpLmRvbmUoKHBvY2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2NldCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwiS29udHJvbG7DrSBkb3RheiBuYXN0YXZlbsOtIHDFmcOtem5ha3UgdGlza3VcIiwgXCJQb2t1ZCB2w610ZSwgxb5lIHRpc2sgdnltw6Fow6Fuw60gZG9wYWRsIHYgcG/FmcOhZGt1LCB1xb4gaG8gbmVjaGNldGUgdGlza25vdXQgem5vdnUgYSBjaGNldGUgem3Em25pdCBzdGF2IHRpc2t1IHZ5bcOhaMOhbsOtLCB0YWsgb2Rwb3bEm3p0ZSBBTk8uXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuXFxuIFBva3VkIGNoY2V0ZSB0aXNrIG9wYWtvdmF0LCBwcm90b8W+ZSBzZSB6bWHEjWthbCBwYXDDrXIgdiB0aXNrw6FybsSbLCBjaGNldGUgc2kgdWTEm2xhdCBrb3BpaSwgbsSba3RlcsOhIHNlc3RhdmEgamUgY2h5Ym7DoSBhdGQuLCBwYWsgb2Rwb3bEm3p0ZSBORS5cIiwgNDY1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5uYXN0YXZQcml6bmFrVGlza3VWeW1haGFuaSgpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgICAgICBkaWFsb2dDbG9zZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhY3RUaXNrVnltYWhhbmkucnVuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEZpbHRyXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGZpbHRydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyKCkgeyBcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBmb3JtdWxhcmU6IGFueSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuVnltUHJpcGFkdSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybXVsYXJlLnB1c2godGhhdC5jcmVhdGVGaWx0ZXJGb3JtUHJpcGFkKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9ybXVsYXJlLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlckZvcm1WeW1haGFuaSgpLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtU2xvemVuaVZ5bWFoYW5pKCksXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlckZvcm1QcmVkcGlzeVZ5bVByaXAoKSxcclxuICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRmlsdGVyRm9ybVBsYXRieVZ5bVByaXAoKSxcclxuICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRmlsdGVyRm9ybVpwcmFjb3ZhdGVsKCksXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlckZvcm1FbE9icmF6KCksXHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlckZvcm1EUygpLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtUHJpem5ha3lWeW0oKSxcclxuICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRmlsdGVyRm9ybUludGVydmFseSgpLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVGaWx0ZXJGb3JtS2xpY292YVNsb3ZhKClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KSAvLyBuZWZ1bmd1amUgdnl0dm/FmWl0IHZsYXN0bsOtIGZpbHRyXHJcbiAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoXHJcbiAgICAgICAgICAgICAgICAvLyEgVnl0dm/FmWVuw60gc3RhbmRhcmRuw61jaCBwYXJhbWV0csWvIGZpbHRlcnBhbmVsdSBwcm8gRUtPIG1vZHVseVxyXG4gICAgICAgICAgICAgICAgR29yZGljLkVrby5GaWx0ZXJzLmdldEZpbHRlclBhcmFtczxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRmlsdGVyPihcclxuICAgICAgICAgICAgICAgICAgICBmb3JtdWxhcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgW10sIC8vIG9ibMOtYmVuw6kgZmlsdHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZHBfcHRtX3Z5bWFoXCIsIC8vIHTDqW1hIHRpc2t1XHJcbiAgICAgICAgICAgICAgICAgICAgbnVsbCwgLy9cIml4c19mdW5fYWt0XCIsIC8vc2xvdXBlYyB6IERUTyBwcm8gZmlsdHIgXCIqdmxhc3Ruw61cIiBuZWJvIG51bGwsIHBva3VkIG5lbcOhIGLDvXRcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckRhdGEgPSBvYmouZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lnppc2tlakRhdGEob2JqLmZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAoeyBkczogMiwgZWxfb2JyYXo6IDIsIHByZWRwaXN5OiAxLCBwbGF0Ynk6IDEgfSkgYXMgYW55LCAvLyBwZXZuw70gZmlsdHJcclxuICAgICAgICAgICAgICAgICAgICB0cnVlLCAvLyBuYXZpZ8OhdG9yIHYgZGV0YWlsdSBmaWx0cnVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LCAvL3BhcmVudENvbnRlbnRcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSBkbyBmaWx0cnUgLSBQxZnDrXBhZFxyXG4gICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybVByaXBhZCgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInByaXBhZENoZWNrRm9ybVwiLCB0YWJMYWJlbDogXCJQxZnDrXBhZFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVsWhZWNobmEgdnltw6Fow6Fuw60gcG9wbGF0bsOta2FcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0T3Bwb3NpdGVDaGVja0ZhbHNlKFwiZHN1XCIsIG9iai52YWx1ZSwgZXYsIFwicHJpcGFkQ2hlY2tGb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZHN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiSGxlZGF0IHDFmWVzIGRvdMSNZW7DqSBzdWJqZWt0eSBwxZnDrXBhZHUgRERQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE9wcG9zaXRlQ2hlY2tGYWxzZShcImFsbFwiLCBvYmoudmFsdWUsIGV2LCBcInByaXBhZENoZWNrRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgZG8gZmlsdHJ1IC0gVnltw6Fow6Fuw61cclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybVZ5bWFoYW5pKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlZ5bcOhaMOhbsOtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5WeW1QcmlwYWR1ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIFBva3VkIHNlIGplZG7DoSBvIHZ5bcOhaMOhbsOtIHDFmcOtcGFkdSwgdGFrIHNlIG5lem9icmF6w60gZmlsdHIgdHlwIHBvaGxlZMOhdmt5XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5kZHBzdHBwKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfcGhsPXZhbHVlLnR5cF9waGxcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdHlwX3BobDogdGhhdC50eXBQaGwgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHsgdHlwX3BobDogdGhhdC50eXBQaGwgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9ybS5hZGRSb3coXCJQb8WZLiDEjcOtc2xvXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwb3JfY2lzbG9cIixcclxuICAgICAgICAgICAgICAgIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgdnltw6Fow6Fuw61cIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5zdGF2VnltYWhhbmkoKSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Z5bVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3Rhdl92eW0gPSB2YWx1ZS5zdGF2X3Z5bVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Z5bV9ub25cIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5lbcOhIHN0YXYgdnltw6Fow6Fuw60gKG5lZ2FjZSB2w71ixJtydSlcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgdnltw6Fow6Fuw60gLSBvZGthelwiKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnN0YXZWeW1haGFuaSgpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdnltX29sZFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3Rhdl92eW1fb2xkID0gdmFsdWUuc3Rhdl92eW1cIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBkb3J1xI1lbsOtXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZGRwY3NkbygpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfZG9ydWNcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfZG9ydWMgPSB2YWx1ZS5zdGF2X2RvcnVjXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgdGlza3VcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5la29jdGlzKCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic190aXNcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNfdGlzID0gdmFsdWUuc190aXNcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiQWt0aXZpdGFcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5la29jYWt0KCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWt0aXZpdGFcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmFrdGl2aXRhID0gdmFsdWUuZWtvX2FrdFwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IHZ5cHJhdmVuw61cIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5naW5jcGFuKCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidnlwcmF2ZW5vXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC52eXByYXZlbm8gPSB2YWx1ZS5wcml6X2FuXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yIHZ5bcOhaMOhbsOtXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfbnZ5XCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlZTXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODlcIixcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAxMiB9KV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIkFDXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY1wiLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODlcIixcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAyMCB9KV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlpuYcSNa2FcIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNqX3Z5bVwiLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODlcIixcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAzMCB9KV1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIlNrdXBpbmEgdnltw6Fow6Fuw61cIilcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5kZHBzc2t2KCksIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3NrdlwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3NrdiA9IHZhbHVlLml4c19za3ZcIlxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBpbnNvbHZlbmNlXCIpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QuZ2luY2lzcigpLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRydWhfc3Rhdl9yaXplbmlcIixcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmRydWhfc3Rhdl9yaXplbmkgPSB2YWx1ZS5kcnVoX3N0YXZfcml6ZW5pXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2RydWhfc3Rhdl9yaXplbml9IC0ge2RydWhfc3Rhdl9yX3R4dH1cIixcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgUHJpZGVqVnNlY2hueVN0YXZ5SW5zb2x2ZW5jZTogdHJ1ZSwgUHJpZGVqTmVuaVZJbnNvbHZlbmNpOiB0cnVlIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgZG8gZmlsdHJ1IC0gU2xvxb5lbsOtIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm1TbG96ZW5pVnltYWhhbmkoKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiU2xvxb5lbsOtIHZ5bcOhaMOhbsOtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQxZnDrXBhZFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBQcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBlcF9waWRcIiwgLy9peHBfZGRwP1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLYXRlZ29yaWUgcG9oeWJ1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGVwX2t0Z191cG9cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wZXBfa3RnX3VwbyA9IHZhbHVlLmt0Z191cG9cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBzcGxhdG5vc3RpXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwZXBfZGF0X3NwbF8wXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwZXBfZGF0X3NwbF8xXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUHJpb3JpdGEgw7pocmFkeVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwZXBfcHJpX3Vocl8wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGVwX3ByaV91aHJfMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSBkbyBmaWx0cnUgLSBQxZllZHBpc3kgdnltw6FoYW7DqWhvIHDFmcOtcGFkdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtUHJlZHBpc3lWeW1QcmlwKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlDFmWVkcGlzeSB2eW3DoWhhbsOpaG8gcMWZw61wYWR1XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSB2em5pa3VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92em5pa3VfMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z6bmlrdV8xXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gc3BsYXRub3N0aVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbF8wXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfc3BsXzFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByZWRwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogJ23DoSBwxZllZHBpc3knIH0sIC8vYW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiAnbmVtw6EgcMWZZWRwaXN5JyB9LCAvL25lXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiAxXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgZG8gZmlsdHJ1IC0gUGxhdGJ5IHZ5bcOhaGFuw6lobyBwxZnDrXBhZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybVBsYXRieVZ5bVByaXAoKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiUGxhdGJ5IHZ5bcOhaGFuw6lobyBwxZnDrXBhZHVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIGJhbmt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdWhyXzBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF91aHJfMVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHphcGxhY2Vuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96YXBfMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3phcF8xXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwbGF0YnlcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy02XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiAnbcOhIHBsYXRieScgfSwgLy9hbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6ICduZW3DoSBwbGF0YnknIH0sIC8vbmVcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IDFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZZW7DrSBmb3JtdWzDocWZZSBkbyBmaWx0cnUgLSBacHJhY292YXRlbFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtWnByYWNvdmF0ZWwoKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiWnByYWNvdmF0ZWxcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctOVwiLCBQcmVmYWJzLlNlbGVjdC5kZHBacHJhY292YXRlbCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZnVuX2NpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW5fY2lsID0gdmFsdWUuaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy0zXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fY2lsX2hpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJIaXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgZG8gZmlsdHJ1IC0gRWxla3Ryb25pY2vDvSBvYnJhelxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtRWxPYnJheigpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJFbGVrdHJvbmlja8O9IG9icmF6XCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbF9vYnJhelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTRcIixcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMiwgbGFiZWw6ICduZWJyYXQgdiDDunZhaHUnIH0sIC8vYW5vIGkgbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6ICdtw6EgZWwuIG9icmF6JyB9LCAvL2Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAwLCBsYWJlbDogJ25lbcOhIGVsLiBvYnJheicgfSwgLy9uZVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogMlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgZG8gZmlsdHJ1IC0gRGF0b3bDoSBzY2hyw6Fua2FcclxuICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm1EUygpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJEYXRvdsOhIHNjaHLDoW5rYVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZHNcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy00XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDIsIGxhYmVsOiAnbmVicmF0IHYgw7p2YWh1JyB9LCAvL2FubyBpIG5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiAnbcOhIElEIERTJyB9LCAvL2Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAwLCBsYWJlbDogJ25lbcOhIElEIERTJyB9LCAvL25lXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiAyXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAqIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllIGRvIGZpbHRydSAtIFDFmcOtem5ha3kgdnltw6Fow6Fuw61cclxuICAgICAgICogQHJldHVybnNcclxuICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtUHJpem5ha3lWeW0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInByaXpuYWt5VnltRm9ybVwiLCB0YWJMYWJlbDogXCJQxZnDrXpuYWt5IHZ5bcOhaMOhbsOtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJqZV92ZV9zcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5bcOhaMOhbsOtIGplIHZlIHNwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE9wcG9zaXRlQ2hlY2tGYWxzZShcIm5lbmlfdmVfc3Bpc3VcIiwgb2JqLnZhbHVlLCBldiwgXCJwcml6bmFreVZ5bUZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuZW5pX3ZlX3NwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVnltw6Fow6Fuw60gbmVuw60gdmUgc3Bpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0T3Bwb3NpdGVDaGVja0ZhbHNlKFwiamVfdmVfc3Bpc3VcIiwgb2JqLnZhbHVlLCBldiwgXCJwcml6bmFreVZ5bUZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5lbWFfZHNcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJWeW3DoWjDoW7DrSBuZW3DoSBkb3TEjWVuw70gc3ViamVrdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRPcHBvc2l0ZUNoZWNrRmFsc2UoXCJtYV92aWNlX2RzXCIsIG9iai52YWx1ZSwgZXYsIFwicHJpem5ha3lWeW1Gb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWFfdmljZV9kc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5bcOhaMOhbsOtIG3DoSB2w61jZSBkb3TEjWVuw71jaCBzdWJqZWt0xa9cIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0T3Bwb3NpdGVDaGVja0ZhbHNlKFwibmVtYV9kc1wiLCBvYmoudmFsdWUsIGV2LCBcInByaXpuYWt5VnltRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRpbGNpX3Z5cG9jZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb3V6ZSBkw61sxI3DrSB2w71wb8SNdHlcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0T3Bwb3NpdGVDaGVja0ZhbHNlKFwiZGlsY2lfdnlwb2NldF9ub25cIiwgb2JqLnZhbHVlLCBldiwgXCJwcml6bmFreVZ5bUZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkaWxjaV92eXBvY2V0X25vblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkJleiBkw61sxI3DrWNoIHbDvXBvxI10xa9cIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0T3Bwb3NpdGVDaGVja0ZhbHNlKFwiZGlsY2lfdnlwb2NldFwiLCBvYmoudmFsdWUsIGV2LCBcInByaXpuYWt5VnltRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV9wcml6X3VtcnRpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG9wbGF0bsOtayB6ZW3FmWVsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE9wcG9zaXRlQ2hlY2tGYWxzZShcImVzdV9wcml6X25ldW1ydGlcIiwgb2JqLnZhbHVlLCBldiwgXCJwcml6bmFreVZ5bUZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfcHJpel9uZXVtcnRpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG9wbGF0bsOtayDFvmlqZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRPcHBvc2l0ZUNoZWNrRmFsc2UoXCJlc3VfcHJpel91bXJ0aVwiLCBvYmoudmFsdWUsIGV2LCBcInByaXpuYWt5VnltRm9ybVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV9wcml6X3NsZWRvdmFuaV9pc3pyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG9wbGF0bsOtayBKRSBwxZlpaGzDocWhZW4gayBvZGLEm3J1IHptxJtuIElTWlJcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0T3Bwb3NpdGVDaGVja0ZhbHNlKFwiZXN1X3ByaXpfc2xlZG92YW5pX2lzenJfbmVcIiwgb2JqLnZhbHVlLCBldiwgXCJwcml6bmFreVZ5bUZvcm1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfcHJpel9zbGVkb3ZhbmlfaXN6cl9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlBvcGxhdG7DrWsgTkVOw40gcMWZaWhsw6HFoWVuIGsgb2RixJtydSB6bcSbbiBJU1pSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldE9wcG9zaXRlQ2hlY2tGYWxzZShcImVzdV9wcml6X3NsZWRvdmFuaV9pc3pyXCIsIG9iai52YWx1ZSwgZXYsIFwicHJpem5ha3lWeW1Gb3JtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3ByaXpfb3ZlcmVuX2lzenJfbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJQb3BsYXRuw61rIE5FTsONIG92xJvFmWVuIElTWlJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2bGFzdG5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiWm9icmF6aXQgcG91emUgdmxhc3Ruw61cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgZG8gZmlsdHJ1IC0gSW50ZXJ2YWx5XHJcbiAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtSW50ZXJ2YWx5KCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIkludGVydmFseVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gb2RcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9vZF8wXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfb2RfMVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIGRvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZG9fMFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2RvXzFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBnZW5lcm92w6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eXN0XzBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eXN0XzFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBuYXJvemVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV9kYXRfbmFyXzBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV9kYXRfbmFyXzFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSDDum1ydMOtIC8gdWtvbsSNZW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X2RhdF91bXJ0aV8wXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfZGF0X3VtcnRpXzFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllIGRvIGZpbHRydSAtIEtsw63EjW92w6Egc2xvdmFcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybUtsaWNvdmFTbG92YSgpOiBHb3JkaWMuRm9ybXMuRm9ybSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImtsaWNvdmFTbG92YUZvcm1cIiwgdGFiTGFiZWw6IFwiS2zDrcSNb3bDoSBzbG92YVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2zDrcSNb3bDoSBzbG92YVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctOVwiLCBQcmVmYWJzLlNlbGVjdC53ZmxLbGljU2xvdmEoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2xfc2xvdm9cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5rbF9zbG92byA9IHZhbHVlLmtsX3Nsb3ZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyB0eXBfYWc6IDM1MCwgYWt0aXZpdGE6IDEwMH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTNcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2xpY292YV9zbG92YV9uZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk5lbcOhIGtsw63EjW92w6Egc2xvdmFcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrbGljb3ZhU2xvdmFGb3JtID0gJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRm9ybXMoXCJrbGljb3ZhU2xvdmFGb3JtXCIpWzFdOyAvL2plIHRvIFsxXSBqZWxpa2/FviBzZSB0ZW4gZmlsdGVycGFuZWwgbsSbamFrIGJsYsSbIHZ5dHbDocWZw60gYSBqc291IHRhbSB0eWhsZSBmb3JtdWzDocWZZSBkdmFrcsOhdCAoamVkbm91IGpha28gdmUgZmlsdGVycGFuZWx1IGEgamVkbm91IHYgZGV0YWlsdSBmaWx0ZXJwYW5lbHUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoa2xpY292YVNsb3ZhRm9ybSkuZmluZEZpZWxkcyhcImtsaWNvdmFfc2xvdmFcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGtsaWNvdmFTbG92YUZvcm0pLmZpbmRGaWVsZHMoXCJrbGljb3ZhX3Nsb3ZhXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGtsaWNvdmFTbG92YUZvcm0pLmZpbmRGaWVsZHMoXCJrbGljb3ZhX3Nsb3ZhXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPZMWha3J0bmUgbmVrb21wYXRpYmlsbsOtICgyIGNoZWNrYm94eSBzZSBuYXZ6w6FqZW0gcnXFocOtKSBjaGVja2JveHlcclxuICAgICAgICAgKiBAcGFyYW0gb3Bwb3NpdGVGaWVsZE5hbWVcclxuICAgICAgICAgKiBAcGFyYW0gY3VycmVudEZpZWxkVmFsdWVcclxuICAgICAgICAgKiBAcGFyYW0gZXZcclxuICAgICAgICAgKi9cclxuICAgICAgICBzZXRPcHBvc2l0ZUNoZWNrRmFsc2Uob3Bwb3NpdGVGaWVsZE5hbWU6IHN0cmluZywgY3VycmVudEZpZWxkVmFsdWU6IGJvb2xlYW4gfCBudWxsLCBldjogYW55LCBmb3JtOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRGaWVsZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZm9ybXVsYXIgPSAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGb3Jtcyhmb3JtKVsxXTsgLy9qZSB0byBbMV0gamVsaWtvxb4gc2UgdGVuIGZpbHRlcnBhbmVsIG7Em2phayBibGLEmyB2eXR2w6HFmcOtIGEganNvdSB0YW0gdHlobGUgZm9ybXVsw6HFmWUgZHZha3LDoXQgKGplZG5vdSBqYWtvIHZlIGZpbHRlcnBhbmVsdSBhIGplZG5vdSB2IGRldGFpbHUgZmlsdGVycGFuZWx1KVxyXG4gICAgICAgICAgICAgICAgJChmb3JtdWxhcikuZmluZEZpZWxkcyhvcHBvc2l0ZUZpZWxkTmFtZSkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEFrY2UgdiBtZW51QmFydVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmcOtIG5vdsOpIHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSBub3ZlVnltYWhhbmkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBkdG9WeW06IGFueSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgZHRvVnltLml4cF9kZHAgPSB0aGF0LkR0b1ByaXBhZHUuaXhwO1xyXG4gICAgICAgICAgICBkdG9WeW0udHlwX3BobCA9IHRoYXQuRHRvUHJpcGFkdS50eXBfcGhsO1xyXG4gICAgICAgICAgICBkdG9WeW0uaXhzX2Z1bl9ha3QgPSB0aGF0LkR0b1ByaXBhZHUuaXhzX2Z1bl9ha3Q7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5wYXJhbXMuZGRwX3Z5bV9wb3Zza3YgIT0gXCJcIiAmJiB0aGF0LnBhcmFtcy5kZHBfdnltX3BvZXNrdiA9PSBcIlwiKSB7IFxyXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZW7DrSBwb3ZvbGVuYSDFvsOhZG7DoSBza3VwaW5hIHZ5bcOhaMOhbsOtIHBybyBwb8WZw616ZW7DrSB2eW3DoWjDoW7DrSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfZ2VuX2l4cHZ5bSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgamUgcGFyYW1ldHIgbmFzdGF2ZW4gbmEgaG9kbm90dSAwLCB0YWsgbWFudcOhbG7EmyB6YWTDoXbDoW1lIGlkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gKHBva3VkIGplIDEsIHRhayBzZSBnZW5lcnVqZSwgYWxlIHRvIGplIGHFviBuYSBzZXJ2ZXJ1KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HSWRlbnRpZmlrYXRvclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdJZGVudGlmaWthdG9yI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIFwiWmFkw6Fuw60gaWRlbnRpZmlrw6F0b3J1XCIsIDM4MCwgMTUwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX29iaiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvVnltLml4cF9udnkgPSByZXRWYWwuaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucG9kYW5pVnltYWhhbmkoZHRvVnltKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wb2RhbmlWeW1haGFuaShkdG9WeW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYXZvbMOhbsOtIGZ1bmtjZSBwb2TDoW7DrSB2eW3DoWjDoW7DrSBuYSBzZXJ2ZXJ1XHJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHBvZGFuaVZ5bWFoYW5pKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJwb2RhbmlWeW1haGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBwb2TDoW7DrSB2eW3DoWjDoW7DrS4uLlwiIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5wb2RhbmlWeW1haGFuaVNlem5hbVZ5bSh7IGRhdGE6IGRhdGEgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxWeW1haGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdEZXRhaWxWeW1haGFuaSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBOdnk6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBQaGw6IGRhdGEudHlwX3BobFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVwb3ZlZGxvIHNlIHBvZGF0IHZ5bcOhaMOhbsOtIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInBvZGFuaVZ5bWFoYW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEFrY2UgJ3Z5bcOhaMOhbsOtJyAtIEF1dG9tYXRpY2vDqSBnZW5lcm92w6Fuw60gdnltw6Fow6Fuw60gcHJvIHZ5YnJhbsO9IHDFmcOtcGFkIEREUC4uLlxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluaWNpYWxpemFjZSBob2Rub3QgcHJvIGZvcm11bMOhxZkgaHJvbWFkbsOpIGFrY2UgXCJ2eW3DoWjDoW7DrVwiXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbmljaWFsbmlIb2Rub3R5UHJvRm9ybXVsYXJWeW1haGFuaShtb2RlbERhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0X29kOiBhbnk7XHJcbiAgICAgICAgICAgIHZhciBkYXRfZG86IGFueTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnZ5bWFoYXREYWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5leGlzdHVqZU5hc3RhdmVuaUV4ZWt1Y2UoeyB0eXBQaGw6IHRoYXQudHlwUGhsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGV4aXN0dWplKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXhpc3R1amUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLmZpbmRGaWVsZHMoXCJleGVrdWNlXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLmZpbmRGaWVsZHMoXCJpeHNfc2t2XCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgaXhzX3NrdjogbW9kZWxEYXRhLml4c19za3YsIG5hemV2OiBtb2RlbERhdGEuaXhzX3Nrdl9uYXpldiwgYmFydmE6IG1vZGVsRGF0YS5iYXJ2YSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KCkuZmluZEZpZWxkcyhcImFsZ29yaXRtdXNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBhbGdfdnltOiBtb2RlbERhdGEuYWxnX3Z5bSwgYWxnX3Z5bV90eHQ6IG1vZGVsRGF0YS5hbGdfdnltX3R4dCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KCkuZmluZEZpZWxkcyhcInN0YXZfdnltXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgc3Rhdl92eW06IG1vZGVsRGF0YS5zdGF2X3Z5bSwgc3Rhdl92eW1fdHh0OiBtb2RlbERhdGEuc3Rhdl92eW1fdHh0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5maW5kRmllbGRzKFwic3Rhdl92eW1fb2xkXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgc3Rhdl92eW06IG1vZGVsRGF0YS5zdGF2X3Z5bV9vbGQsIHN0YXZfdnltX3R4dDogbW9kZWxEYXRhLnN0YXZfdnltX29sZF90eHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCgpLmZpbmRGaWVsZHMoXCJkYXR1bVwiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHsgc3RhcnQ6IG1vZGVsRGF0YS5kYXRfb2QsIGVuZDogbW9kZWxEYXRhLmRhdF9kbyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnltYWhhdERhbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuc3RyaWt0bmlSZXppbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnZyYXREYXR1bXlQb3NsZWRuaWhvS3Jva3VWeW1haGFuaSh7IGlkOiB0aGF0LkR0b1ByaXBhZHUuaXhwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoZGF0dW15KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0dW15ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfb2QgPSBkYXR1bXlbMF0uZGF0X29kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF9kbyA9IGRhdHVteVswXS5kYXRfZG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KCkuZmluZEZpZWxkcyhcImRhdHVtXCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgeyBzdGFydDogZGF0X29kLCBlbmQ6IGRhdF9kbyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQb2t1ZCBuZW7DrSBleGVrdWNlIG5hc3RhdmVuYSwgbmVuw60gcG92b2xlbm8gYW5pIHZ5bcOhaGF0IHMgbsOha2xhZHkgZXhla3VjZVxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAuZXhpc3R1amVOYXN0YXZlbmlFeGVrdWNlKHsgdHlwUGhsOiB0aGF0LnR5cFBobCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKChleGlzdHVqZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWV4aXN0dWplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5maW5kRmllbGRzKFwiZXhla3VjZVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhvZGlsIHNlbSBzZW1rYSB2bG/FvmVuw60gaW5pY2nDoWxuw61jaCBob2Rub3QgcHJvIHNrdXBpbnUgYSBhbGdvcml0bXVzIHZ5bcOhaMOhbsOtLCBqZWxpa2/FviB0byBuYXN0YW5lIGHFviBwbyBvdGV2xZllbsOtIHdpemFyZHVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhhdC5zdHJpa3RuaVJlemltKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2t1cGluYSA9IHRoYXQuZ2xvYmFsU2V0dGluZ3MhLmdldChgR2xvYmFsLkRkcC5HZW5lcmFjZVZ5bWFoYW5pU2V0dGluZ3MuU2t1cGluYSR7dGhhdC5peHBEZW59JHt0aGF0LnR5cFBobH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbGdvcml0bXVzOiBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2t1cGluYSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxnb3JpdG11cyA9IHRoYXQuZ2xvYmFsU2V0dGluZ3MhLmdldChgR2xvYmFsLkRkcC5HZW5lcmFjZVZ5bWFoYW5pU2V0dGluZ3MuQWxnb3JpdG11cyR7dGhhdC5peHBEZW59JHt0aGF0LnR5cFBobH0ke3NrdXBpbmEuaXhzX3Nrdn1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5maW5kRmllbGRzKFwiaXhzX3NrdlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBza3VwaW5hKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5maW5kRmllbGRzKFwiYWxnb3JpdG11c1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBhbGdvcml0bXVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobW9kZWxEYXRhKS5sZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5maW5kRmllbGRzKFwic3Rhdl92eW1cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzdGF2X3Z5bTogbW9kZWxEYXRhLnN0YXZfdnltLCBzdGF2X3Z5bV90eHQ6IG1vZGVsRGF0YS5zdGF2X3Z5bV90eHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KCkuZmluZEZpZWxkcyhcInN0YXZfdnltX29sZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHN0YXZfdnltOiBtb2RlbERhdGEuc3Rhdl92eW1fb2xkLCBzdGF2X3Z5bV90eHQ6IG1vZGVsRGF0YS5zdGF2X3Z5bV9vbGRfdHh0IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSAnb2Jub3Z1amUnIHZ5bcOhaMOhbsOtLCB0YWsgamUgcG90xZllYmEgb2RzdHJhbml0IGZ1a2NlIGt0ZXLDqSBzZSBuYSBzb2LEmyB6w6F2aXNsw6ksIGplbGlrb8W+IHBva3VkIHNlIGhvZMOtIGRvIG1vZGVsdSB0YWsgdG8gaMOhesOtIGVycm9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuaXhzX3NrdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLm5hemV2X3NrdXBpbmE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsRGF0YS5iYXJ2YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLmFsZ192eW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsRGF0YS5hbGdfdnltX3R4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLnN0YXZfdnltO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuc3Rhdl92eW1fdHh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuc3Rhdl92eW1fb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuc3Rhdl92eW1fb2xkX3R4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBtb2RlbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyAvLyBzdHJpa3Ruw60gcmXFvmltXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobW9kZWxEYXRhKS5sZW5ndGggIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5maW5kRmllbGRzKFwiaXhzX3NrdlwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGl4c19za3Y6IG1vZGVsRGF0YS5peHNfc2t2LCBuYXpldjogbW9kZWxEYXRhLm5hemV2X3NrdXBpbmEsIGJhcnZhOiBtb2RlbERhdGEuYmFydmEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KCkuZmluZEZpZWxkcyhcImFsZ29yaXRtdXNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBhbGdfdnltOiBtb2RlbERhdGEuYWxnX3Z5bSwgYWxnX3Z5bV90eHQ6IG1vZGVsRGF0YS5hbGdfdnltX3R4dCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5maW5kRmllbGRzKFwic3Rhdl92eW1cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzdGF2X3Z5bTogbW9kZWxEYXRhLnN0YXZfdnltLCBzdGF2X3Z5bV90eHQ6IG1vZGVsRGF0YS5zdGF2X3Z5bV90eHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KCkuZmluZEZpZWxkcyhcInN0YXZfdnltX29sZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IHN0YXZfdnltOiBtb2RlbERhdGEuc3Rhdl92eW1fb2xkLCBzdGF2X3Z5bV90eHQ6IG1vZGVsRGF0YS5zdGF2X3Z5bV9vbGRfdHh0IH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSAnb2Jub3Z1amUnIHZ5bcOhaMOhbsOtLCB0YWsgamUgcG90xZllYmEgb2RzdHJhbml0IGZ1a2NlIGt0ZXLDqSBzZSBuYSBzb2LEmyB6w6F2aXNsw6ksIGplbGlrb8W+IHBva3VkIHNlIGhvZMOtIGRvIG1vZGVsdSB0YWsgdG8gaMOhesOtIGVycm9yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuaXhzX3NrdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLm5hemV2X3NrdXBpbmE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsRGF0YS5iYXJ2YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLmFsZ192eW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsRGF0YS5hbGdfdnltX3R4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWxEYXRhLnN0YXZfdnltO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuc3Rhdl92eW1fdHh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuc3Rhdl92eW1fb2xkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBtb2RlbERhdGEuc3Rhdl92eW1fb2xkX3R4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmNvbnRlbnQoKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBtb2RlbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRm9ybXVsw6HFmSBwcm8gaHJvbWFkbm91IGFrY2kgXCJ2eW3DoWjDoW7DrVwiXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb3JtdWxhclZ5bWFoYW5pKG1vZGVsRGF0YTogYW55KTogYW55IHsgLy8gdnltYWhhbmlfamVkZW4sIGRsZ192eW1haGFuaV9wYXJcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBQb2t1ZCBqZSBtb2RlbERhdGEgbmFwbG7Em24sIHpuYW1lbsOhIHRvIMW+ZSBzZSBvcGFrdWplIGFrY2UsIHR1ZMOtxb4gbmVuw60gbnV0bsOpIHDFmWVkbmFzdGF2aXRcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuaW5pY2lhbG5pSG9kbm90eVByb0Zvcm11bGFyVnltYWhhbmkobW9kZWxEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzEgTE1TLTMtNy0yXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiTmFzdGF2ZW7DrSB2w71wb8SNdHVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTa3VwaW5hXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnNrdXBpbmFWeW1haGFuaU5vdmVWeW0oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3NrdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19za3YgPSB2YWx1ZS5peHNfc2t2LCBtb2RlbC5uYXpldl9za3VwaW5hID0gdmFsdWUubmF6ZXYsIG1vZGVsLmJhcnZhID0gdmFsdWUuYmFydmFcIixcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IEdvcmRpYy5Db21wb25lbnRzLkdGaWVsZEFzc2lzdC5pZ25vcmVDbGFzcyxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhhdC5EdG9QcmlwYWR1LnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGF0LkR0b1ByaXBhZHUuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IDFcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gZGF0YT8uYmFydmEgIT0gbnVsbCA/IGBiYWNrZ3JvdW5kLWNvbG9yOiAke0NvbW1vbi5CYXNlLkdldEhleENvbG9yKGRhdGE/LmJhcnZhKX07YCA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCI+PGRpdiBzdHlsZT1cIiR7Ymd9IGhlaWdodDogMThweDsgd2lkdGg6IDE4cHg7IGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7IG1hcmdpbi1yaWdodDogNXB4O1wiPjwvZGl2PiR7ZGF0YT8ubmF6ZXZ9PC9kaXY+YDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgc2Ugem3Em27DrSBza3VwaW5hIHZ5bcOhaMOhbsOtLCB0YWsgamkgdWxvxb7DrW1lIGRvIHVzZXJzZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlICE9IG51bGwgJiYgIXRoYXQuc3RyaWt0bmlSZXppbSkgdGhhdC5nbG9iYWxTZXR0aW5ncyEuc2V0KGBHbG9iYWwuRGRwLkdlbmVyYWNlVnltYWhhbmlTZXR0aW5ncy5Ta3VwaW5hJHt0aGF0Lml4cERlbn0ke3RoYXQudHlwUGhsfWAsIG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJBbGdvcml0bXVzXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcGNhZ3YoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWxnb3JpdG11c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmFsZ192eW0gPSB2YWx1ZS5hbGdfdnltLCBtb2RlbC5hbGdfdnltX3R4dCA9IHZhbHVlLmFsZ192eW1fdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZ192eW06IFwiIT0gMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfc2t2OiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHNfc2t2XCIsIFwiaXhzX3NrdlwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBzZSB6bcSbbsOtIGFsZ29yaXRtdXMsIHRhayBqaSB1bG/FvsOtbWUgZG8gdXNlcnNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNrdXBpbmEgPSAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGb3JtcyhcIndpelBhcmFtc1wiKS5maW5kRmllbGRzKFwiaXhzX3NrdlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza3VwaW5hICE9IG51bGwgJiYgIXRoYXQuc3RyaWt0bmlSZXppbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsU2V0dGluZ3MhLnNldChgR2xvYmFsLkRkcC5HZW5lcmFjZVZ5bWFoYW5pU2V0dGluZ3MuQWxnb3JpdG11cyR7dGhhdC5peHBEZW59JHt0aGF0LnR5cFBobH0ke3NrdXBpbmEuaXhzX3Nrdn1gLCBvYmoudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0dW1GaWVsZCA9ICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcyhcImRhdHVtXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuZW3Em2xvIGJ5IHbFr2JlYyBuYXN0YXQsIGFsZSBqZSB0byB2IEdVUFTEmiA6UFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlPy5hbGdfdnltID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtRmllbGQuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdHVtRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXR1bUZpZWxkLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSW50ZXJ2YWwgdsO9cG/EjXR1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnaW50ZXJ2YWxib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0dW1cIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hcG9qZW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiRGx1aCBwb8SNw610YXQgcyBuYXBvamVuw71taSBwxZnDrXBhZHlcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRpbGNpX3Z5cG9jZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJaw6F6bmFtIG8gdnltw6Fow6Fuw60gbmVidWRlIG9kZXPDrWzDoW4sIGTDrWzEjcOtIHZ5cG/EjWV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBzZSBqZWRuw6EgbyBkw61sxI3DrSB2w71wb8SNZXQsIG5lYnVkZSBzZSBnZW5lcm92YXQgdnltw6Fow6Fuw60sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5lYnVkZSBzZSB2a2zDoWRhdCBkbyBzcGlzdSBhcG9kLiBKZWRuw6Egc2UgcG91emUgbyB2w71wb8SNZXQgxI3DoXN0a3kgemEgcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlsY2lWeXBvY2V0ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKFwiZm9ybWF0X2NqXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGaWVsZHMoXCJmb3JtYXRfY2pcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCLEjEogc2UgbmVidWRlIGdlbmVyb3ZhdC4uLiBKZSBuYXN0YXZlbiBkw61sxI3DrSB2w71wb8SNZXQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWxjaVZ5cG9jZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRm9ybXMoXCJ3aXpQYXJhbXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdlZ5bUZpZWxkID0gZm9ybS5maW5kRmllbGRzKFwic3Rhdl92eW1cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdlZ5bUZpZWxkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdkZvcm1hdENKKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKFwiZm9ybWF0X2NqXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coe25hbWU6IFwibG9rYWxpemFjZVwifSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c2VfcGhsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVnltw6FoYXQgZGFsxaHDrSBwxZnDrXBhZHkgcG9wbGF0bsOta2EgKHNsb3XEjS4gdnltw6Fow6Fuw60pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmRlZk1hUHJpcGFkeS5zdGF0ZSgpID09IFwicmVzb2x2ZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUgJiYgdGhhdC5tYVByaXBhZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFZ5YmVyUHJpcGFkdT8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VnliZXJQcmlwYWR1Py51cGRhdGUoeyB0b29sdGlwOiBcIlDFmcOtcGFkIG5lbcOhIMW+w6FkbsOpIGRhbMWhw60gcMWZw61wYWR5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RWeWJlclByaXBhZHU/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KGV2LnRhcmdldCkuc2hvd0ZsYXNoKFwiTmHEjcOtdMOhbsOtIHDFmcOtcGFkxa8gamXFoXTEmyBuZW7DrSBob3RvdsOpLCB6a3VzdGUgdG8gbyBjaHbDrWxpIHBvemTEm2ppLlwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBaYW5lY2hhdCBwb3V6ZSB0eSBwb2xvxb5reSwga3RlcsOpIG5lanNvdSB2ICdwcmlwYWR5VnltYWhhbmlOYXBvamVuZScuIChqZWxpa2/FviBzZSB6cnXFoWlsYSB2b2xiYSAndnNlX3BobCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByaXBhZHlWeW1haGFuaSA9IHRoYXQucHJpcGFkeVZ5bWFoYW5pLmZpbHRlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodnltYWhhbmk6IGFueSkgPT4gIXRoYXQucHJpcGFkeVZ5bWFoYW5pTmFwb2plbmUuc29tZSgobmFwb2plbnk6IGFueSkgPT4gbmFwb2plbnkuaXhwID09PSB2eW1haGFuaS5peHApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJpcGFkeVZ5bWFoYW5pTmFwb2plbmUgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQucHJpcGFkeVZ5bWFoYW5pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RWeWJlclByaXBhZHU/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpekdyaWQgPSAkLmNvbnRlbnQoKS5maW5kKFwiW2RhdGEtaGVscC1jb250ZXh0PSdsaXN0OndpekdyaWQnXVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpekdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiTG9rYWxpemFjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJEZWZpbmljZSBrcm9rdSB2eW3DoWjDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIktyb2sgdnltw6Fow6Fuw60gcHJvY2VzdVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5rcm9reVZ5bU5vdmVWeW0oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl92eW1cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zdGF2X3Z5bSA9IHZhbHVlLnN0YXZfdnltLCBtb2RlbC5zdGF2X3Z5bV90eHQgPSB2YWx1ZS5zdGF2X3Z5bV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfc2t2OiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHNfc2t2XCIsIFwiaXhzX3NrdlwiLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoYXQuRHRvUHJpcGFkdS5peHBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGb3JtcyhcIndpelBhcmFtc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai52YWx1ZT8uc3Rhdl92eW0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXZWeW0gPSBvYmoudmFsdWU/LnN0YXZfdnltO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmlkID0gdGhhdC5EdG9QcmlwYWR1Lml4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5ha3Rpdml0YSA9IDEwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci50eXAgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT0gbnVsbCkgZmlsdGVyLml4c19za3YgPSBtb2RlbERhdGEuaXhzX3NrdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgZmlsdGVyLml4c19za3YgPSBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfc2t2XCIpLmdmaWVsZChcImdldFZhbHVlXCIpLml4c19za3Y7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuc3Rhdl92eW0gPSBzdGF2VnltO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gZ2VuZXJvdsOhbsOtIMSMSiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnZW5lY2ogPSB0aGF0LnBhcmFtcy5kZHBfdnltX2dlbmVjajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZW5lY2ogPT0gMikgZm9ybS5maW5kRmllbGRzKFwiZ2VuX2NqXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChnZW5lY2ogIT0gMCkgZm9ybS5maW5kRmllbGRzKFwiZ2VuX2NqXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBzZSBqZWRuw6EgbyBwcnZuw60ga29sbyBixJtodSBwxZlpIHJlbG9hZHUgb2tuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhayBob2TDrW1lIGRvIHBvbMOtxI1rYSBob2Rub3R1IHogbW9kZWx1IGEgbmXEjXRlbWUgamkgemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucmVmcmVzaEZpcnN0TG9vcCA9PSBmYWxzZSAmJiAhdGhhdC52eW1haGF0RGFsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudChldi50YXJnZXQpLmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwicHJlZEtyb2t5XCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIG9ka2F6xa8gbmEga3Jva3kuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5wcmVkS3Jva3lOb3ZlVnltKHsgZmlsdGVyczogZmlsdGVyIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bV9vbGRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBzdGF2X3Z5bTogcmVzdWx0WzBdLnN0YXZfdnltLCBzdGF2X3Z5bV90eHQ6IHJlc3VsdFswXS5zdGF2X3Z5bV90eHQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KGV2LnRhcmdldCkuZW5kT3BlcmF0aW9uKHsgaWQ6IFwicHJlZEtyb2t5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdkRsZUtyb2t1VnltYWhhbmkoc3RhdlZ5bSwgZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZGlsY2lWeXBvY2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZm9ybWF0X2NqXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZm9ybWF0X2NqXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIFwixIxKIHNlIG5lYnVkZSBnZW5lcm92YXQuLi4gSmUgbmFzdGF2ZW4gZMOtbMSNw60gdsO9cG/EjWV0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJnZW5fY2pcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1hdENqRmllbGQgPSBmb3JtLmZpbmRGaWVsZHMoXCJmb3JtYXRfY2pcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRDakZpZWxkLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRDakZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIFwixIxKIHNlIG5lYnVkZSBnZW5lcm92YXQuLi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9ka2F6IG5hIGtyb2tcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3QucHJlZEtyb2t5VnltTm92ZVZ5bSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Z5bV9vbGRcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zdGF2X3Z5bV9vbGQgPSB2YWx1ZS5zdGF2X3Z5bSwgbW9kZWwuc3Rhdl92eW1fb2xkX3R4dCA9IHZhbHVlLnN0YXZfdnltX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhhdC5EdG9QcmlwYWR1Lml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfc2t2OiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHNfc2t2XCIsIFwiaXhzX3NrdlwiLCB0cnVlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Rhdl92eW06IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcInN0YXZfdnltXCIsIFwic3Rhdl92eW1cIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaEZpcnN0TG9vcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBqZSByZcW+aW0gc3RyaWt0bsOtLCBuZWJ1ZGUgbW/Fvm5vIHptxJtuaXQgb2RrYXogbmEga3JvayB2eW3DoWjDoW7DrSAtIG11c8OtIGLDvXQgdsW+ZHkgbmEgcG9zbGVkbsOtIHByb3ZlZGVuw70gbmEgcMWZw61wYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnN0cmlrdG5pUmV6aW0pICQoZXYudGFyZ2V0KS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlICQoZXYudGFyZ2V0KS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOw6FrbGFkeSDFmcOtemVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19uYWtfcml6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUHJvY2VudGEgcGVuw6FsZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9jX3BlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk1pbmltw6FsbsOtIHZ5bcOhaGFuw6EgxI3DoXN0a2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19taW5fY2FzdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQYXJhbWV0cnkgbsOha2xhZMWvIGV4ZWt1Y8OtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJleGVrdWNlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5bcOhaGF0IHMgbsOha2xhZHkgZXhla3Vjw61cIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJC5jb250ZW50KCkuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0VnpuaWt1RmllbGQgPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfdnpuaWt1XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0U3BsRmllbGQgPSBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfc3BsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga3RnVXBvRmllbGQgPSBmb3JtLmZpbmRGaWVsZHMoXCJrdGdfdXBvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRWem5pa3VGaWVsZC5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRTcGxGaWVsZC5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdVcG9GaWVsZC5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRTcGxGaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdFZ6bmlrdUZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0U3BsRmllbGQuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdFZ6bmlrdUZpZWxkLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdGdVcG9GaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdidXR0b25cIiwgXCJ3LTZcIiwgeyBcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ0bkluZm9FeGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmFzdC4gZXhlay5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiTmFzdGF2ZW7DrSBleGVrdWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJyaWdodFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KCkubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HU2V6bmFtVnlzZUV4ZWt1Y2lcIiwgeyBJRDogXCJERFBHU2V6bmFtVnlzZUV4ZWt1Y2kjXCIsIHR5cFBobDogdGhhdC50eXBQaGwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLYXRlZ29yaWUgcG9oeWJ1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmZ1Y2N1cG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z191cG89dmFsdWUua3RnX3Vwb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrdGdfdXBvOiBcIjwgMjAwXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHZ6bmlrdVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z6bmlrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gc3BsYXRub3N0aVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJVcsSNZW7DrSB2eW3DoWhhbsOpaG8gZXh0ZXJuw61obyBzdWJqZWt0dVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG90X3BsYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlZ5bcOhaGF0IGRsZSBwbMOhdGNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGaWVsZHMoXCJkb3Rfc3VialwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGaWVsZHMoXCJpeHNfZHZhXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRvdF9zdWJqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiVnltw6FoYXQgZGxlIGRvdMSNZW7DqWhvIHN1Ympla3R1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGaWVsZHMoXCJkb3RfcGxhXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcyhcIml4c19kdmFcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKFwiaXhzX2R2YVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi5jdXJyZW50VGFyZ2V0KS5maW5kRmllbGRzKFwiaXhzX2R2YVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRMWvdm9kIHZhemJ5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxzZHZhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19kdmFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZHZhID0gdmFsdWUuaXhzX2R2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwixIzDrXNsbyBqZWRuYWPDrS96bmHEjWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJnZW5fY2pcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJHZW5lcm92YXQgdnltw6Fow6Fuw60gcyDEjEpcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5pc0dlbkNqRGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0aGF0LmlzR2VuQ2pDaGVja2VkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkLmNvbnRlbnQoKS5maW5kRm9ybXMoXCJ3aXpQYXJhbXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHNTa3ZGaWVsZCA9IGZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF2VnltRmllbGQgPSBmb3JtLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4c1NrdiA9IGl4c1NrdkZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdlZ5bSA9IHN0YXZWeW1GaWVsZC5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl4c1NrdiAhPSBudWxsICYmIHN0YXZWeW0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZGb3JtYXRDSih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYudGFyZ2V0KS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhzU2t2ID09IG51bGwpIGl4c1NrdkZpZWxkLmdmaWVsZChcInZhbGlkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXZWeW0gPT0gbnVsbCkgc3RhdlZ5bUZpZWxkLmdmaWVsZChcInZhbGlkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJGb3Jtw6F0IMSMSlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmb3JtYXRfY2pcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMzAgfSldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUMWZZWRwbG7Em27DrSBob2Rub3QgeiBuYXN0YXZlbsOtIHNrdXBpbnkgdnltw6Fow6Fuw60gKi9cclxuICAgICAgICBuYXN0YXZEbGVLcm9rdVZ5bWFoYW5pKHN0YXZWeW06IG51bWJlciwgZXY6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICQuY29udGVudChldi50YXJnZXQpLmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibmFzdGF2RGxlS3Jva3VWeW1haGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBuYXN0YXZlbsOtIGRsZSBrcm9rdSB2eW3DoWjDoW7DrS4uLlwiIH0pO1xyXG4gICAgICAgICAgICB2YXIgaXhzRnVuUG9kOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgbmF6ZXZSZjogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIG9zdGF0bmlQaGw6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIHZhciBsb2thbGl6YWNlOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJC5jb250ZW50KCkuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpO1xyXG4gICAgICAgICAgICB2YXIgaXhzU2t2ID0gZm9ybS5maW5kRmllbGRzKFwiaXhzX3NrdlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgLy92YXIgaXhzU2t2ID0gJCh0aGF0KS5maW5kRm9ybXMoXCJ3aXpQYXJhbXNcIikuZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBkYXRhUHJvbWlzZSA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgaWYgKGl4c1NrdiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpeHNGdW5Qb2QgPSB0aGF0Lk51bGxGdW47XHJcbiAgICAgICAgICAgICAgICBuYXpldlJmID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIG9zdGF0bmlQaGwgPSAwO1xyXG4gICAgICAgICAgICAgICAgZGF0YVByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAuZGF0YURsZVNrdXBpbnkoeyBpeHNTa3Y6IGl4c1Nrdi5peHNfc2t2LCBzdGF2VnltOiBzdGF2VnltIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNGdW5Qb2QgPSByZXN1bHRbMF0uaXhzX2Z1bl9wb2QgPz8gdGhhdC5OdWxsRnVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXZSZiA9IHJlc3VsdFswXS5uYXpldl9yZiA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3N0YXRuaVBobCA9IHJlc3VsdFswXS5vc3RhdG5pX3BobCA/PyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhUHJvbWlzZS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHrDrXNrYWxhIHNlIGRhdGEgZGxlIHNrdXBpbnkgYSBrcm9rdSwgdGFrIG3Fr8W+ZW1lIGpldCBkw6FsXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdkZvcm1hdENKKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpeHNGdW5Qb2QubGVuZ3RoID09IDEyICYmIGl4c0Z1blBvZCAhPSB0aGF0Lk51bGxGdW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2thbGl6YWNlID0gYDogJHtuYXpldlJmfWA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2thbGl6YWNlID0gXCIgZGxlIGFrdHXDoWxuxJsgcMWZaWhsLiB1xb5pdi5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbG9rYWxpemFjZVJvdyA9IGZvcm0uZmluZEZvcm1Sb3dzKFwibG9rYWxpemFjZVwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBsb2thbGl6YWNlVGV4dCA9IGxva2FsaXphY2VSb3cuZmluZChcIi5nZm9ybS10ZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgbG9rYWxpemFjZVRleHQudGV4dChcIkxva2FsaXphY2VcIiArIGxva2FsaXphY2UpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZzZVBobEZpZWxkID0gZm9ybS5maW5kRmllbGRzKFwidnNlX3BobFwiKVxyXG4gICAgICAgICAgICAgICAgaWYgKG9zdGF0bmlQaGwgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvc3RhdG5pUGhsRGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZ5bcOhaMOhbsOtIHByb2LEm2huZSBuYWQgdnlicmFuw71taSB0eXB5IHBvaGxlZMOhdmVrLCBkbGUgbmFzdGF2ZW7DrSBza3VwaW55IVxyXG4gICAgICAgICAgICAgICAgICAgIHZzZVBobEZpZWxkLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tYVByaXBhZHkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1hRGFsc2lQcmlwYWR5KG9zdGF0bmlQaGxEZWYsICQuY29udGVudChldi50YXJnZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3N0YXRuaVBobERlZi5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZzZVBobEZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzZVBobEZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl4c1Nrdi5peHNfc2t2ID09IHRoYXQuTnVsbFNrdikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfdnltX3Z5bW5hdiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZzZVBobEZpZWxkLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnNlUGhsRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5tYVByaXBhZHkgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubWFEYWxzaVByaXBhZHkobnVsbCwgJC5jb250ZW50KGV2LnRhcmdldCkpKSB0aGF0LmFjdGlvbnMuYWN0VnliZXJQcmlwYWR1Py5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdnNlUGhsRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2c2VQaGxGaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZzZVBobEZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB2c2VQaGxGaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuaXhzRnVuUG9kID0gaXhzRnVuUG9kOyBcclxuICAgICAgICAgICAgICAgICQuY29udGVudChldi50YXJnZXQpLmVuZE9wZXJhdGlvbih7IGlkOiBcIm5hc3RhdkRsZUtyb2t1VnltYWhhbmlcIiB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBOYXN0YXYgZm9ybcOhdCDEjEogKi9cclxuICAgICAgICBuYXN0YXZGb3JtYXRDSih6bWVuYUNiOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGZvcm1hdENqOiBzdHJpbmcgPSBcIlwiOyAvLyBGb3Jtw6F0IGt0ZXLDvSBzZSB6b2JyYXrDrSB2IHBvbGlcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkLmNvbnRlbnQoKS5maW5kRm9ybXMoXCJ3aXpQYXJhbXNcIik7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmRpbGNpVnlwb2NldCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwiZm9ybWF0X2NqXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJmb3JtYXRfY2pcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgXCLEjEogc2UgbmVidWRlIGdlbmVyb3ZhdC4uLiBKZSBuYXN0YXZlbiBkw61sxI3DrSB2w71wb8SNZXQuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpeHNTa3Y6IGFueTtcclxuICAgICAgICAgICAgaWYgKGZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT0gbnVsbCkgaXhzU2t2ID0gdGhhdC5tb2RlbERhdGFWeW0uaXhzX3NrdjtcclxuICAgICAgICAgICAgZWxzZSBpeHNTa3YgPSBmb3JtLmZpbmRGaWVsZHMoXCJpeHNfc2t2XCIpLmdmaWVsZChcImdldFZhbHVlXCIpLml4c19za3Y7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhdlZ5bSA9IGZvcm0uZmluZEZpZWxkcyhcInN0YXZfdnltXCIpLmdmaWVsZChcImdldFZhbHVlXCIpLnN0YXZfdnltO1xyXG4gICAgICAgICAgICB2YXIgZ2VuQ2ogPSBmb3JtLmZpbmRGaWVsZHMoXCJnZW5fY2pcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBmb3JtYXRDakZpZWxkID0gZm9ybS5maW5kRmllbGRzKFwiZm9ybWF0X2NqXCIpO1xyXG4gICAgICAgICAgICB2YXIgZ2VuZWNqID0gdGhhdC5wYXJhbXMuZGRwX3Z5bV9nZW5lY2o7XHJcbiAgICAgICAgICAgIGlmIChnZW5DaiA9PSB0cnVlICYmIGdlbmVjaiAhPSAwICYmIGdlbmVjaiAhPSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZWNqID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC56aXNrZWpGb3JtYXRDaih7IGl4c1NrdjogaXhzU2t2LCBzdGF2VnltOiBzdGF2VnltIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoZm9ybWF0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IHRoYXQubm9ybWFsaXplV2hpdGVzcGFjZShmb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1hdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuQ2ogPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdENqID0gZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdENqRmllbGQuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtY2ogPSB0aGF0Lm5vcm1hbGl6ZVdoaXRlc3BhY2UodGhhdC5wYXJhbXMuZGRwX3Z5bV9mb3JtY2ogPz8gXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1jai5sZW5ndGggPiAwICYmIGZvcm1jaiAhPSBcIkdHR0dHR0dHR0dcIikgeyAvLyBHR0dHR0dHR0dHIC0gaW1wbGljaXRuw60gaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5DaiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdENqID0gZm9ybWNqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRDakZpZWxkLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgc2Ugem3Em27DrSBidXR0b24gZ2VuZXJhY2UgxIxKLCBhIGplIGRkcF92eW1fZ2VuZWNqID0gMSAsIHRhayBidWRlIGZvcm1hdCBDSiBha3Rpdm7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRDaiA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghem1lbmFDYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9sw63EjWtvIHNlIHptxJtuw60gamVuIHRlaGR5LCBwb2t1ZCBzZSBuZWplZG7DoSBvIHptxJtudSBwb2zDrcSNa2Egc2Ftb3Ruw6lobyAtIGFieSBuZWRvxaFsbyBrIHphY3lrbGVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbkNqID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0Q2pGaWVsZC5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnZW5Daikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImdlbl9jalwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBnZW5Daik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0Q2ogPSBcIsSMSiBzZSBuZWJ1ZGUgZ2VuZXJvdmF0Li4uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0Q2pGaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGZvcm1hdENqRmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZm9ybWF0Q2opO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGdlbmVjaiA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0Q2ogPSBcIsSMSiBnZW5lcnVqZSBTU0wuLi5cIjtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRDakZpZWxkLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZWNqID09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRDaiA9IFwixIxKIGdlbmVydWplIGV4dGVybsOtIFNTTC4uLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdENqRmllbGQuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdENqID0gXCLEjEogc2UgbmVidWRlIGdlbmVyb3ZhdC4uLlwiO1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0Q2pGaWVsZC5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtYXRDakZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIGZvcm1hdENqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeW3DoWjDoW7DrSBuYSBwxZnDrXBhZHUgRERQICovXHJcbiAgICAgICAgcHJpdmF0ZSB2eW1haGFuaShtb2RlbERhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5pc1JlZnJlc2gpIHRoYXQucmVmcmVzaEZpcnN0TG9vcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoYXQuaXNSZWZyZXNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gdGhhdC5mb3JtdWxhclZ5bWFoYW5pKG1vZGVsRGF0YSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXNzVXBkYXRlID0gdGhhdC5pc2wuVnltYWhhbmlERFAudnltYWhhbmkuYmluZCh0aGF0LmlzbC5WeW1haGFuaUREUCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrRnVuY3Rpb24gPSB0aGF0LmlzbC5WeW1haGFuaUREUC5rb250cm9sYVZ5bWFoYW5pLmJpbmQodGhhdC5pc2wuVnltYWhhbmlERFApO1xyXG4gICAgICAgICAgICB0aGF0LnByaXBhZHlWeW1haGFuaSA9IFt0aGF0LkR0b1ByaXBhZHVdO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ocm9tYWRuYU9wZXJhY2VWeW1haGFuaSh0aGF0LnByaXBhZHlWeW1haGFuaSwgXCJHZW5lcmFjZSB2eW3DoWjDoW7DrVwiLCBDb21tb24uR3JpZEZvcm1hdHMuSHJtQWtjZVNpbXBsZSgpLCBcIml4cFwiLCBmb3JtLCBtYXNzVXBkYXRlLCBjaGVja0Z1bmN0aW9uLCBcIk9wcmF2ZHUgY2hjZXRlIHByb3bDqXN0IHZ5bcOhaMOhbsOtIHDFmcOtcGFkdT9cIiwgXCJcIiwgW3sgZmF2b3JpdGU6IHRydWUsIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEhpc3RvcmllVnltIH0sIHsgZmF2b3JpdGU6IHRydWUsIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFZ5YmVyUHJpcGFkdSB9XSwgbW9kZWxEYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBGdW5rY2UgayBvdGV2xZllbsOtIG9rbmEgaHJvbWFkbsO9Y2ggem3Em24gKEVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCkgKi9cclxuICAgICAgICBocm9tYWRuYU9wZXJhY2VWeW1haGFuaShkYXRhOiBhbnksIHRpdGxlOiBzdHJpbmcsIGdyaWRGb3JtYXQ6IGFueSwga2V5czogYW55LCBmb3JtOiBhbnksIG1hc3NVcGRhdGU6IGFueSwgY2hlY2tGdW5jdGlvbjogYW55LCBjb25maXJtTWVzc2FnZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBtZW51R3JpZDogYW55LCBtb2RlbERhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHREYXRhOiBhbnk7XHJcbiAgICAgICAgICAgIHRoYXQubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxhbnk+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBncmlkRm9ybWF0LFxyXG4gICAgICAgICAgICAgICAga2V5czoga2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiVnlicmFuw6kgcMWZw61wYWR5XCIsIC8vIHRpdHVsZWsgdiB0YWJ1ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEdyaWRWeWNob3ppQWtjZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZWxEYXRhOiBtb2RlbERhdGEsIC8vIGRhdGEgcHJvIG1vZGVsIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJQcm92ZcSPXCIsIC8vIG7DoXpldiBwcm8gdGxhxI3DrXRrbyBkYWzFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUdyaWRCYXI6IG1lbnVHcmlkLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha2NlIG5hIHRhYnUgcyBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7IC8vIGFrY2UgcHJvIGtvbnRyb2x1IGRhdCwgbW9kZWwgLSBkYXRhIHogbW9kZWxEYXRhLCBpbnB1dCAtIGdyaWQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmRhdF9vZCA9IG1vZGVsLmRhdHVtLnN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5kYXRfZG8gPSBtb2RlbC5kYXR1bS5lbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnR5cCA9IHRoYXQuVnltUHJpcGFkdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaXhzX2Z1biA9IHRoYXQuaXhzRnVuUG9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmlkID0gdGhhdC5EdG9QcmlwYWR1Lml4cFxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWxEdG86IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HTW9kZWxWeW1haGFuaUR0byA9IG1vZGVsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoYXQucHJpcGFkeVZ5bWFoYW5pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoZWNrRnVuY3Rpb24oeyBkdG9zUHJpcGFkOiBkYXRhLCBtb2RlbDogbW9kZWxEdG8gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhZHkgc2UgxI1hcnVqZSwgamVsaWtvxb4gcMWZaWTDoXbDoW0gZGF0YSB6IEdWeWJlclByaXBhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6amnFoXTEm27DrSBrdGVyw70ganNvdSBzdWNjZXNzIGEga3RlcsO9IG5lLCBhIHJ1xI1uw60gem3Em25hIGRhdCB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpekdyaWQgPSAkLmNvbnRlbnQoKS5maW5kKFwiW2RhdGEtaGVscC1jb250ZXh0PSdsaXN0OndpekdyaWQnXVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXpHcmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGEgPSBtb2RlbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfb2QgPSBtb2RlbC5kYXR1bS5zdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdF9kbyA9IG1vZGVsLmRhdHVtLmVuZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0X29kID0gZGF0X29kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5kYXRfZG8gPSBkYXRfZG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLml4c19mdW4gPSB0aGF0Lml4c0Z1blBvZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kZWwuaXhzX2Z1biA9PSB0aGF0Lk51bGxGdW4gfHwgbW9kZWwuaXhzX2Z1bi5sZW5ndGggIT0gMTIpIG1vZGVsLml4c19mdW4gPSB0aGF0Lml4c0Z1bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwudHlwID0gdGhhdC5WeW1QcmlwYWR1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5pZCA9IHRoYXQuRHRvUHJpcGFkdS5peHBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR01vZGVsVnltYWhhbmlEdG8gPSBtb2RlbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtVGl0bGUgPSBcIlBvdHZyemVuw60gaHJvbWFkbsOpIGFrY2VcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm1NZXNzYWdlICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKGNvbmZpcm1UaXRsZSwgY29uZmlybU1lc3NhZ2UsIDQwMCwgMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeWJyw6Fuw60gc3Bpc3UsIHBva3VkIGpzb3UgcGFyYW1ldHJ5IG5hc3RhdmVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZHBfZ2VuX3NzbHphayBqZSBBTk8gIGRkcF9nZW5fc3Nsc3BpIGplIE5FIGRkcF9zc2xfamVkc3BpID09ICdQxZllZCB2bG/FvmVuw61tIHZ5YnJhdCBzcGlzJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucGFyYW1zLmRkcF9nZW5fc3NsemFrICE9IDAgJiYgdGhhdC5wYXJhbXMuZGRwX2dlbl9zc2xzcGkgPT0gMCAmJiB0aGF0LnBhcmFtcy5kZHBfc3NsX2plZHNwaSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5EaWFsb2dzLkdIbGVkYXRJZGVudERva1NwaXNEbGcodGhhdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PSBudWxsKSBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXhwU3BpcyA9IHJldFZhbC5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEdG8uaXhwX3NwaXMgPSBpeHBTcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc3NVcGRhdGUoeyBkdG9zUHJpcGFkOiBkYXRhLCBtb2RlbDogbW9kZWxEdG8gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHREYXRhID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNzVXBkYXRlKHsgZHRvc1ByaXBhZDogZGF0YSwgbW9kZWw6IG1vZGVsRHRvIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0RGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc3NVcGRhdGUoeyBkdG9zUHJpcGFkOiBkYXRhLCBtb2RlbDogbW9kZWxEdG8gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDIgLSB6b2JyYXplbsOtwq0gdsO9c2xlZGVrIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVsO9c2xlZGVrIHZ5bcOhaMOhbsOtXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJWeW3DoWhhbsOpIHDFmcOtwq1wYWR5XCIsIC8vIHBvcGlzZWsgbmFkIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEdyaWRWeWNob3ppQWtjZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6ICgpID0+IHsgLy8gcHJlZGFuaSBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzRXJyb3IgPSByZXN1bHREYXRhLnJlc3VsdFswXS5lcnJvcnMgIT0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IGNudCA9ICQuY29udGVudCgkKFwiLmdjb250ZW50XCIpLmxhc3QoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWluQ29udGVudCA9ICQuY29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2l6Q29udGVudCA9IG1haW5Db250ZW50LmZpbmQoXCIuZ3dpemFyZF9fY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbW1hbmRCYXIgPSAkLmNvbnRlbnQod2l6Q29udGVudCkuY29tbWFuZEJhcigpID8/IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFcnJvcikgdGhhdC5hY3Rpb25zLmFjdFJlc2V0Py5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHRoYXQuYWN0aW9ucy5hY3RSZXNldD8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZEJhciA9IHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0UmVzZXRcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzZXQgPSBjcmVhdGVkQmFyWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJlZGNob3ppID0gY29tbWFuZEJhclswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRlID0gY29tbWFuZEJhclsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbmNlbCA9IGNvbW1hbmRCYXJbMl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQmFyID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRCYXIucHVzaChwcmVkY2hvemkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQmFyLnB1c2gocmVzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQmFyLnB1c2goY29tcGxldGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVkQmFyLnB1c2goY2FuY2VsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudCh3aXpDb250ZW50KS5jb21tYW5kQmFyKGNyZWF0ZWRCYXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbERhdGFWeW0gPSBtb2RlbERhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBzZSBqZWRuw6EgbyByZWZyZXNoLCB0YWsgbmVwcm92w6FkxJt0IHJlZnJlc2ggZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuaXNSZWZyZXNoKSB0aGF0Lnppc2tlakRhdGEodGhhdC5maWx0ZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxEZWxlZ2F0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqIFpqaXN0w60gemRhIG3DoSBwxZnDrXBhZCBERFAsIGRhbMWhw60gcMWZw61wYWR5IG1vxb5uw6kgayB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIG1hRGFsc2lQcmlwYWR5KGRlZjogYW55LCBjb250ZW50OiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmRlZk1hUHJpcGFkeSA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgaWYgKGRlZiAhPSBudWxsKSBjb250ZW50LmJlZ2luT3BlcmF0aW9uKHsgdGV4dDogXCJQcm9iw61ow6EgemppxaF0xJtuw60gemRhIGV4aXN0dWrDrSBkYWzFocOtIHDFmcOtcGFkeS4uLlwiLCBpZDogXCJkYWxzaVByaXBhZHlcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLm1hUHJpcGFkeVZKaW5lUEhMKHsgaXhwRGRwOiB0aGF0LkR0b1ByaXBhZHUuaXhwLCB0eXBQaGw6IHRoYXQuRHRvUHJpcGFkdS50eXBfcGhsIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubWFQcmlwYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmFjdGlvbnMuYWN0VnliZXJQcmlwYWR1Py51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZNYVByaXBhZHkucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiZGFsc2lQcmlwYWR5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5tYVByaXBhZHlTRG90Y2VueW1TdWJqZWt0ZW0oeyBpeHBEZHA6IHRoYXQuRHRvUHJpcGFkdS5peHAsIHR5cFBobDogdGhhdC5EdG9QcmlwYWR1LnR5cF9waGwgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdDI6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0MikgdGhhdC5tYVByaXBhZHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgdGhhdC5tYVByaXBhZHkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWZNYVByaXBhZHkucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmVuZE9wZXJhdGlvbih7IGlkOiBcImRhbHNpUHJpcGFkeVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQubWFQcmlwYWR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBPZGVzbMOhbsOtXHJcblxyXG4gICAgICAgIC8qKiBPIGpha8O9IHR5cCBvZGVzbMOhbsOtIHNlIGplZG7DoVxyXG4gICAgICAgICogMCAtIG9kZXNsYXQgbm92w6kgesOhc2lsa3lcclxuICAgICAgICAqIDEgLSBvZGVzbGF0IHDFmWlwcmF2ZW7DqSB6w6FzaWxreVxyXG4gICAgICAgICogMiAtIGdlbmVyb3ZhdCBlbGVrdHJvbmlja8OpIGRva3VtZW50eSBcclxuICAgICAgICAqL1xyXG4gICAgICAgIG9kZXNsYXRFbGVrdHJvbmlja3kob2Rlc2xhdEV4aXN0dWppY2k6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwiZGVsZXRlU1NMVE9ERVwiLCB0ZXh0OiBcIlByb2LDrWjDoSDDumtsaWQgZG/EjWFzdG7DqSB0YWJ1bGt5Li4uXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmRlbGV0ZVNTTFRPREUoKS5nZXQoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiZGVsZXRlU1NMVE9ERVwiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIG5hc3RhdmVuaU1vZGVsOiBhbnkgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHZhciBnbG9iYWxXZmxjdGRvID0gdGhhdC5nbG9iYWxTZXR0aW5ncz8uZ2V0KFwiR2xvYmFsLkRkcC5aYXNpbGt5U2V0dGluZ3MuZGVmYXVsdF93ZmxjdGRvXCIpXHJcbiAgICAgICAgICAgIGlmIChnbG9iYWxXZmxjdGRvICE9IHVuZGVmaW5lZCkgbmFzdGF2ZW5pTW9kZWwud2ZsY3RkbyA9IGdsb2JhbFdmbGN0ZG8udHlwX3Z5aF9kb3I7XHJcbiAgICAgICAgICAgIGVsc2UgbmFzdGF2ZW5pTW9kZWwud2ZsY3RkbyA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2xvYmFsV2ZsY3R0aSA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5EZHAuWmFzaWxreVNldHRpbmdzLmRlZmF1bHRfd2ZsY3R0aVwiKTtcclxuICAgICAgICAgICAgaWYgKGdsb2JhbFdmbGN0dGkgIT0gdW5kZWZpbmVkKSBuYXN0YXZlbmlNb2RlbC53ZmxjdHRpID0gZ2xvYmFsV2ZsY3R0aS50eXBfdGlza3U7XHJcbiAgICAgICAgICAgIGVsc2UgbmFzdGF2ZW5pTW9kZWwud2ZsY3R0aSA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2xvYmFsV2ZsY3RhciA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5EZHAuWmFzaWxreVNldHRpbmdzLmRlZmF1bHRfd2ZsY3RhclwiKTtcclxuICAgICAgICAgICAgaWYgKGdsb2JhbFdmbGN0YXIgIT0gdW5kZWZpbmVkKSBuYXN0YXZlbmlNb2RlbC53ZmxjdGFyID0gZ2xvYmFsV2ZsY3Rhci50eXBfYXJjaGl2YWNlO1xyXG4gICAgICAgICAgICBlbHNlIG5hc3RhdmVuaU1vZGVsLndmbGN0YXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdsb2JhbFdmbGN0a28gPSB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuRGRwLlphc2lsa3lTZXR0aW5ncy5kZWZhdWx0X3dmbGN0a29cIik7XHJcbiAgICAgICAgICAgIGlmIChnbG9iYWxXZmxjdGtvICE9IHVuZGVmaW5lZCkgbmFzdGF2ZW5pTW9kZWwud2ZsY3RrbyA9IGdsb2JhbFdmbGN0a28udHlwX2tvbnZlcnplO1xyXG4gICAgICAgICAgICBlbHNlIG5hc3RhdmVuaU1vZGVsLndmbGN0a28gPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9kZXNsYXRFeGlzdHVqaWNpID09IDAgfHwgb2Rlc2xhdEV4aXN0dWppY2kgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgLy8gVsO9YsSbciBjbyBvZGVzw61sYXRcclxuICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRWxla3RyaWNrZU9kZXNsYW5pXCIsIHsgdGVtYTogXCJkZHBfcHRtX252eVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9ldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGxlIHR5cHkgdsO9YsSbcnUgdnlicmF0IGJ1xI8gdnlicmFuw6kgbmVibyB2xaFlY2hueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9kZXNsYW5pTW9kZWwgPSByZXRWYWwuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwib2Rlc2xhbmlcIiwgdGV4dDogXCJPZGVzw61sw6Fuw60gesOhc2lsZWsuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLm9kZXNsYXRFbGVrdHJvbmlja3koeyBwcmlwYWQ6IHNlbGVjdGlvbiwgb2Rlc2xhbmlEdG86IG9kZXNsYW5pTW9kZWwsIG5hc3RhdmVuaUR0bzogbmFzdGF2ZW5pTW9kZWwgfSkuZ2V0KCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm9kZXNsYW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9kZXNsYXRFeGlzdHVqaWNpID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJkb2hsZWRhbmlcIiwgdGV4dDogXCJQcm9iw61ow6EgZG9obGVkw6Fuw60gbmVkb2tvbsSNZW7DvWNoIHrDoXNpbGVrLi4uXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5uZWRva29uY2VuZVphc2lsa3koeyBuYXN0YXZlbmlEdG86IG5hc3RhdmVuaU1vZGVsIH0pLmdldCgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJkb2hsZWRhbmlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQcm9ixJtobG8gdmxvxb5lbsOtIHrDoXNpbGVrIGRvIGRvxI1hc27DqSB0YWJ1bGt5LCB0YWsgemtvbnRyb2x1amVtIHpkYSB0YW0gbsSbY28gamUgYSBtxa/FvmVtZSBwb2tyYcSNb3ZhdCBzIG9kZXNsw6Fuw61tXHJcbiAgICAgICAgICAgIGRlZi5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmRhdGFTU0xUT0RFKCkuZ2V0KCkuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvZGVzbGF0RXhpc3R1amljaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJOZWV4aXN0dWrDrSDFvsOhZG7DqSByb3pwcmFjb3ZhbsOpIHrDoXNpbGt5IVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIk5lcG92ZWRsbyBzZSBwxZlpcHJhdml0IMW+w6Fkbm91IHrDoXNpbGt1IGsgb2Rlc2zDoW7DrSwgdWppc3TEm3RlIHNlLCB6ZGEgdnlicmFuw6kgesOhem5hbXkgbyB2eW3DoWjDoW7DrSBqc291IHNwcsOhdm7EmyBuYXN0YXZlbsOpISBcXG4gXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiTmFwxZkuIGNoeWLDrSBkb3TEjWVuw6kgc3ViamVrdHkgdSB2eW3DoWjDoW7DrSwgb2Rlc8OtbMOhdGUgY2l6w60gdnltw6Fow6Fuw60sIGFsZSB2eWJyYWxpIGpzdGUgdmxhc3Ruw60gesOhc2lsa3kgcHJvIG9kZXNsw6Fuw60gYXRkLlwiLCAzNjAsIDE3NSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9kZXNsYXRIcm9tYWRuZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPZGVzbGF0IC0gdWTEm2zDoW5vIGRsZSBTTUwwNVxyXG4gICAgICAgIHByaXZhdGUgb2Rlc2xhdEhyb21hZG5lKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCB0ZW1hID0gXCJkZHBfcHRtX252eVwiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcG9ydEluZm86IEdvcmRpYy5SZXBvcnQuSW50ZXJmYWNlLkdSZXBvcnRJbmZvRHRvIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgcmVwb3J0RHRvOiBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZU5vZGVEdG8gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU2VzdGF2YVwiLCB0cnVlKSBcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnJlcG9ydHMoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydHNPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRlbWE6IHRlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vSXhzU3RyOiB0aGlzLmRicGFyYW1zLnNtbF9wdG1fcHJ0c21sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NlcnZlclJlc3RyaWN0aW9uQWxmTWV0aG9kOiAodGhpcy5rdGdfZGVuID09IDE2OTEgLypuZ19rdGdkZW5JbmRQcmlzbGliKi8pID8gXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU2V6bmFtRG9rbGFkdVNtbDpHZXRSZXN0cmljdGlvbkFsZlwiIDogdm9pZCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NlcnZlclJlc3RyaWN0aW9uQWx2TWV0aG9kOiAodGhpcy5rdGdfZGVuID09IDE2OTEgLypuZ19rdGdkZW5JbmRQcmlzbGliKi8pID8gXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU2V6bmFtRG9rbGFkdVNtbDpHZXRSZXN0cmljdGlvbkFsdlwiIDogdm9pZCAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJlcG9ydElkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnJlcG9ydElkPXZhbHVlLnJlcG9ydElkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVXaXRoTWVzc2FnZTogKHZhbHVlLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVwb3J0SW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShyZXBvcnRJbmZvLnR5cFZ5c3QgPT0gXCJUWFRcIiB8fCByZXBvcnRJbmZvLnR5cFZ5c3QgPT0gXCJSVEZcIiB8fCByZXBvcnRJbmZvLnR5cFZ5c3QgPT0gXCJYTUVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlZ5YnJhbm91IHNlc3RhdnUgbmVsemUgdWxvxb5pdCBkbyB2w71zdHVwbsOtaG8gZm9ybcOhdHUgUERGXCI7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChyZXBvcnRJbmZvLmNvbW1vbkluZm9zPy5aUFVTX1VMT1ogPz8gXCIwXCIpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlp2b2xlbsOhIHRpc2tvdsOhIHNlc3RhdmEgbmVtw6EgbmFzdGF2ZW4genDFr3NvYiB1bG/FvmVuw60gZG8gZWxla3Ryb25pY2vDqWhvIHVsb8W+acWhdMSbLiBLb250YWt0dWp0ZSBhZG1pbmlzdHLDoXRvcmEgc3lzdMOpbXUuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNudCA9ICQuY29udGVudChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0SW5mbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydER0byA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHg/LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0RHRvID0gY3R4LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNudC5iZWdpbk9wZXJhdGlvbihcIk5hxI3DrXTDoW7DrSBwb2Ryb2Jub3N0w60gbyBzZXN0YXbEm1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0VHJlZUNvbnRyb2xUUy5nZXRSZXBvcnRJbmZvKGN0eC52YWx1ZS5yZXBvcnRJZCA/PyBcIlwiLCBjdHgudmFsdWUucm9rTWVzRG8pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7IHJlcG9ydEluZm8gPSByZXM7ICQoZXYudGFyZ2V0KS5nZmllbGQoXCJ2YWxpZGF0ZVwiKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IGNudC5lbmRPcGVyYXRpb24oKTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0Lm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8YW55Pj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSHJvbWFkbsOpIHZ5Z2VuZXJvdsOhbsOtIGVsLiBvYnJhesWvIGEgb2Rlc2zDoW7DrSBkbyB2w71wcmF2bnlcIixcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IENvbW1vbi5HcmlkRm9ybWF0cy5aYXNpbGthKCksXHJcbiAgICAgICAgICAgICAgICBrZXlzOiBcIml4cCwgaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJWeWJyYW7DqSBwxZnDrXBhZHlcIiwgLy8gdGl0dWxlayB2IHRhYnUgICBcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0R3JpZFZ5Y2hvemlBa2NlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWtjZSB2eWdlbmVydWplIGFzeW5jaHJvbm7EmyAobmEgcG96YWTDrSkgZWwuIG9icmF6eSB2eWJyYW7DvW0gKHphxaFrcnRudXTDvW0pIGRva2xhZMWvbSBhIHYgbm90aWZpa2HEjW7DrW0gY2VudHJ1IHBvdMOpIG5hYsOtZG5lIG9kZXNsw6Fuw60gZG8gdsO9cHJhdm55LlwiLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbERhdGE6IG1vZGVsRGF0YSwgLy8gZGF0YSBwcm8gbW9kZWwgXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiVnlnZW5lcm92YXQgYSBvZGVzbGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0Z1bmN0aW9uID0gdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFTU0xUT0RFLmJpbmQodGhhdC5pc2wuVnltYWhhbmlERFApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hlY2tGdW5jdGlvbih7IHphc2lsa2FEdG9zOiBkYXRhIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkSXhwczogc3RyaW5nW10gPSBBcnJheS5mcm9tKG5ldyBTZXQoZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ud2l6X2tpbmQgPT0gMjAwKS5tYXAoaXRlbSA9PiBpdGVtLml4cCkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBBcnJheTxHUmVwb3J0UGFyYW1zPigpOyAvL0tvbGlrIGluc3RhbmNpIHBhcmFtZXRydSwgdG9saWtyYXQgc2UgYnVkZSBnZW5lcm92YXQgc2VzdGF2YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXNGb3JBc3luYyA9IG5ldyBBcnJheTxHUmVwb3J0UGFyYW1zPigpOyAvL0tvbGlrIGluc3RhbmNpIHBhcmFtZXRydSwgdG9saWtyYXQgc2UgYnVkZSBnZW5lcm92YXQgc2VzdGF2YVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgamUgcHJ2bsOtIHDFmcOtcGFkIGTDoXQgbmEgeDAwMDggMiBqaW5hayAwIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHZhbGlkSXhwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IHsgWDAwMDA6IHRoaXMudHlwUGhsLCBYMDAwMTogdGhpcy5pY28sIFgwMDA0OiB0aGlzLmxpYywgWDAwMDY6IGl0ZW0sIFgwMDA3OiBcIjBcIiwgWDAwMDg6IFwiMlwiLCBYMDAwOTogdGhhdC5YMDAwOSwgSVhQOiBpdGVtIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbEFzeW5jID0geyBYMDAwMDogdGhpcy50eXBQaGwsIFgwMDAxOiB0aGlzLmljbywgWDAwMDQ6IHRoaXMubGljLCBYMDAwNjogaXRlbSwgWDAwMDc6IFwiMFwiLCBYMDAwODogXCIwXCIsIElYUDogaXRlbSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zRm9yQXN5bmMucHVzaCh2YWxBc3luYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYXZyaERpYWxvZyA9ICQubmV3RGl2KCkuZ2NvbnRlbnQoW0dvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRQcmV2aWV3LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0bzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRJZDogcmVwb3J0RHRvPy5yZXBvcnRJZCA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF0bm9zdDogdGhpcy5yb2sudG9TdHJpbmcoKSArICh0aGlzLm1lc2ljPy50b1N0cmluZygpID8/IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IChwYXJhbXM/Lmxlbmd0aCA+IDApID8gcGFyYW1zWzBdIDogdm9pZCAwIC8vcG9rdWQgamUgdsOtY2UgcGFyYW1ldHLFrywgdGFrIG7DoXZyaCBwdXN0w61tIHBvdXplIHMgcHJ2bsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hdXRvR2VuZXJhdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgR29yZGljLlJlcG9ydC5XZWJDbGllbnQuSUdSZXBvcnRQcmV2aWV3SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hdnJoQ250ID0gJC5jb250ZW50KG5hdnJoRGlhbG9nKSBhcyBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0UHJldmlldztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuYXZyaENudC5pbml0QXdhaXQudGhlbigoKSA9PiB7IHJldHVybiBuYXZyaENudC5nZXRQYXJhbXMoKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHBhcnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2hlZHVsZWRQYXJhbXMgPSBwYXJzIGFzIEdvcmRpYy5SZXBvcnQuSW50ZXJmYWNlLkdTY2hlZHVsZWRSZXBvcnRQYXJhbWV0ZXJbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWRQYXJhbXMucHVzaCh7IGtleTogXCJJQ09cIiwgdmFsdWU6IHRoYXQuaWNvIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkUGFyYW1zLnB1c2goeyBrZXk6IFwiSVhQX0RFTlwiLCB2YWx1ZTogdGhhdC5peHBEZW4gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWRQYXJhbXMucHVzaCh7IGtleTogXCJMSUNcIiwgdmFsdWU6IHRoYXQubGljIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkUGFyYW1zLnB1c2goeyBrZXk6IFwiUk9LXCIsIHZhbHVlOiB0aGF0LnJvayB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0KFwiR29yZGljLkVrby5TZXJ2ZXIuR09kZXNsYXRNdWx0aXBsZVJlcG9ydHNBc3luY1Rhc2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQbGF0bm9zdDogdGhpcy5yb2sudG9TdHJpbmcoKSArICh0aGlzLm1lc2ljPy50b1N0cmluZygpID8/IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnRJZDogcmVwb3J0RHRvPy5yZXBvcnRJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFyYW1ldGVyczogcGFyYW1zRm9yQXN5bmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNjaGVkdWxlZFBhcmFtczogc2NoZWR1bGVkUGFyYW1zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWtjOiBcIjBcIiAvL1RPRE8gLSB2Y2VjaCAtIGNoYW5nZSBsYXRlciBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmw6F6ZSAyIC0gem9icmF6ZW7DrcKtIHbDvXNsZWRlayB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlZ5YnJhbsOpIGRva2xhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiVnlicmFuw6kgesOhem5hbXlcIiwgLy8gcG9waXNlayBuYWQgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6ICgpID0+IHsgLy8gcHJlZGFuaSBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAoKSA9PiB7IH0sXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxEZWxlZ2F0ZTogKCkgPT4geyB9XHJcbiAgICAgICAgICAgIH0pLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8qKiBPdGV2xZllIGRldGFpbCB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIG90ZXZyZW5pRGV0YWlsdShpeHBfbnZ5OiBhbnksIHR5cF9waGw6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7ICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR0RldGFpbFZ5bWFoYW5pI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4cE52eTogaXhwX252eSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBQaGw6IHR5cF9waGxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBBa2NlIG5hIGdyaWR1XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogS29udHJvbGEgbWV0YWRhdCB2eWJyYW7DvWNoIHNvdXBpc2VrXHJcbiAgICAgICAgKiBcclxuICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUga29udHJvbGFNZXRhZGF0KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB6YXpuYW15ID0gdGhhdC5ncmlkVnltYWhhbmlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPihcImdldFNlbGVjdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgLm1hcCgocm93KSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cF9kZHA6IHJvdy5peHBfZGRwISxcclxuICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiByb3cudHlwX3BobCFcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh6YXpuYW15ICE9PSBudWxsICYmIHphem5hbXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCB0aGUgY29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5VdGlscy5Lb250cm9sYU1ldGFkYXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl4cDogemF6bmFteS5tYXAoKHopID0+IHouaXhwX2RkcCksIC8vIEV4dHJhY3Qgb25seSBpeHAgZm9yIHRoaXMgcGFyYW1ldGVyXHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsQWtjZTogKF9jbnQsIGl4cF9kZHApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHphem5hbXkuZmluZCgoeikgPT4gei5peHBfZGRwID09PSBpeHBfZGRwKTsgLy8gRmluZCB0aGUgbWF0Y2hpbmcgaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbSA/IHRoYXQub3RldnJlbmlEZXRhaWx1KGl4cF9kZHAsIGl0ZW0udHlwX3BobCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBIcm9tYWRuw6kgb3bEm8WZZW7DrSBwb3BsYXRuw61rxa8gbmEgSVNaUiAqL1xyXG4gICAgICAgIHByaXZhdGUgaHJvbWFkbmVPdmVyZW5pSVNaUigpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJpbmljaWFsaXphY2VIcm9tT3ZlcmVuaUlTWlJcIiwgdGV4dDogXCJQcm9iw61ow6EgcMWZw61wcmF2YSBwxZnDrXBhZMWvIHBybyBvdsSbxZllbsOtIElTWlIuLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuSHJvbWFkbmVPdmVyZW5pLmluaWNpYWxpemFjZUhyb21PdmVyZW5pSVNaUigpLmdldCgpLmRvbmUoKHBvcmFkaUhybzogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImluaWNpYWxpemFjZUhyb21PdmVyZW5pSVNaUlwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkdG8gPSBzZWxlY3Rpb24ubWFwKChpdGVtOiBhbnkpID0+ICh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhzX2VzdTogaXRlbS5peHNfZXN1XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBaYWxvxb5lbsOtIHBvxb5hZGF2a3UgcHJvIGhyb21hZG7DqSBvdsSbxZllbsOtIElTWlJcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLkhyb21hZG5lT3ZlcmVuaS56YWxvelBvemFkYXZla0hyb21PdmVyZW5pSVNaUih7IHJxOiB7IFJlcXVlc3REYXRhOiBkdG8gfSwgcG9yYWRpSHJvOiBwb3JhZGlIcm8gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvIHphbG/FvmVuw60gcG/FvmFkYXZrdSBwxZllc23Em3JvdsOhbsOtIG5hIHN0csOhbmt1IHMgaHJvbWFkbsO9bSBvdsSbxZllbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0hyb21hZG5lT3ZlcmVuaVwiLCB7IHBvcmFkaUhybzogcG9yYWRpSHJvIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogSHJvbWFkbsOpIG92xJvFmWVuw60gZG90xI1lbsO9Y2ggc3ViamVrdMWvIG5hIElTWlIgKi9cclxuICAgICAgICBwcml2YXRlIGhyb21hZG5lT3ZlcmVuaURvdFN1YmpJU1pSKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWRWeW1haGFuaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByaXBhZHk6IGFueSA9IHNlbGVjdGlvbi5tYXAoKGl0ZW06IGFueSkgPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICBpeHA6IGl0ZW0uaXhwX252eVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIHByaXBhZHk6IGFueSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgaSA9IDA7XHJcbiAgICAgICAgICAgICAgICAvL3NlbGVjdGlvbi5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHByaXBhZHlbaV0uaXhwID0gaXRlbS5peHBfbnZ5O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgLy99KVxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJpbmljaWFsaXphY2VIcm9tT3ZlcmVuaUlTWlJcIiwgdGV4dDogXCJQcm9iw61ow6EgcMWZw61wcmF2YSBwxZnDrXBhZMWvIHBybyBvdsSbxZllbsOtIElTWlIuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLkhyb21hZG5lT3ZlcmVuaS5pbmljaWFsaXphY2VIcm9tT3ZlcmVuaUlTWlIoKS5nZXQoKS5kb25lKChwb3JhZGlIcm86IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiaW5pY2lhbGl6YWNlSHJvbU92ZXJlbmlJU1pSXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGR0bzogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuSHJvbWFkbmVPdmVyZW5pLmxpc3REb3RjZW5lU3ViamVrdHkoeyBwcmlwYWR5OiBwcmlwYWR5IH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvdMSNZW7DqSBzdWJqZWt0eSBuYSBwxZnDrXBhZGVjaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvID0gcmVzdWx0LmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWmFsb8W+ZW7DrSBwb8W+YWRhdmt1IHBybyBocm9tYWRuw6kgb3bEm8WZZW7DrSBJU1pSXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Icm9tYWRuZU92ZXJlbmkuemFsb3pQb3phZGF2ZWtIcm9tT3ZlcmVuaUlTWlIoeyBycTogeyBSZXF1ZXN0RGF0YTogZHRvIH0sIHBvcmFkaUhybzogcG9yYWRpSHJvIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyB6YWxvxb5lbsOtIHBvxb5hZGF2a3UgcMWZZXNtxJtyb3bDoW7DrSBuYSBzdHLDoW5rdSBzIGhyb21hZG7DvW0gb3bEm8WZZW7DrW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdIcm9tYWRuZU92ZXJlbmlcIiwgeyBwb3JhZGlIcm86IHBvcmFkaUhybyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwxZnDrXpuYWt1IHRpc2t1LCBwb2t1ZCBqZSBob2Rub3RhICdwcml6bmFrJyAxLCB0YWsgc2UgbmFzdGF2w60gYSBwb2t1ZCBqZSAwLCB0YWsgc2UgcnXFocOtXHJcbiAgICAgICAgICogQHBhcmFtIHByaXpuYWtcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG5hc3RhdmVuaVByaXpuYWt1VGlza3UocHJpem5hazogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZFZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0R1dm9kXCIsIHsgSUQ6IFwiRERQR0R1dm9kI1wiLCB9LCBcIkTFr3ZvZCB6bcSbbnkgcMWZw616bmFrdSB2eXRpxaF0xJtuw61cIiwgNDUwLCAzMjApXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX29iaiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hemV2OiBzdHJpbmc7XHJcbiBcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJpem5hayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2ID0gXCJuYXN0YXZpdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXYgPSBcInpydcWhaXRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR1dm9kID0gcmV0VmFsLmR1dm9kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVXBvem9ybsSbbsOtXCIsIC8vIFRpdHVsZWsgb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYE9wcmF2ZHUgY2hjZXRlICR7bmF6ZXZ9IHDFmcOtem5hayB2eXRpxaF0xJtuw60gdnltw6Fow6Fjw61obyBkb2t1bWVudHUgdSB2eWJyYW7DvWNoIHZ5bcOhaMOhbsOtPyBcXG5gICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBExa92b2Q6ICR7ZHV2b2R9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5UYXNrU3RhcnROYXN0YXZlbmlQcml6VGlzayhzZWxlY3Rpb24sIGR1dm9kLCBwcml6bmFrKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChgTmVuw60gbW/Fvm7DqSAke25hemV2fSBwxZnDrXpuYWsgdnl0acWhdMSbbsOtLCBuZWJ5bCB6YWTDoW4gZMWvdm9kIWAsIFwid2FybmluZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gT2JzbHVoYSBhc3luYyB0YXNrdSAnTmFzdGF2ZW7DrSBwxZnDrXpuYWt1IHRpc2t1J1xyXG4gICAgICAgIFRhc2tTdGFydE5hc3RhdmVuaVByaXpUaXNrKGRhdGE6IGFueSwgZHV2b2Q6IHN0cmluZywgcHJpem5hazogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSAkLmNvbnRlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhc3luY0NsYXNzTmFtZSA9IFwiR29yZGljLkRkcC5TZXJ2ZXIuTEsuQXN5bmMuR0RkcE5hc3RhdmVuaVByaXpuYWt1VGlza3VBc3luY1Rhc2tcIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYXJhbWV0cnkgPSB7XHJcbiAgICAgICAgICAgICAgICBwcmlwYWR5VnltOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgZHV2b2Q6IGR1dm9kLFxyXG4gICAgICAgICAgICAgICAgcHJpem5hazogcHJpem5ha1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IG9wdDogQXN5bmMuSUdUYXNrT3B0aW9ucyA9IHsgYXV0b0NsZWFuOiB0cnVlLCBjbGVhck9uRmluaXNoOiB0cnVlIH07XHJcblxyXG4gICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwicmVtb3ZlXCIsIFwidnlzbGVkZWtOYXN0YXZlbmlQcml6VGlza1Rhc2tcIik7XHJcblxyXG4gICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsICAvLyBwb8WhbHUgbm90aWZpa2FjaVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIm5hc3RhdmVuaVByaXpUaXNrVGFza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5hc3RhdmVuw60gcMWZw616bmFrdSB0aXNrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiUHJvYsOtaMOhIGFzeW5jaHJvbm7DrSBha2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1hcnJvdy1yaWdodCAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0KGFzeW5jQ2xhc3NOYW1lLCBwYXJhbWV0cnksIG9wdCk7IC8vIGEgc3B1c3TDrW1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcMWZw616bmFrdSB0aXNrdSwgcG9rdWQgamUgaG9kbm90YSAncHJpem5haycgMSwgdGFrIHNlIG5hc3RhdsOtIGEgcG9rdWQgamUgMCwgdGFrIHNlIHJ1xaHDrVxyXG4gICAgICAgICAqIEBwYXJhbSBwcml6bmFrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYXN0YXZlbmlQcml6bmFrdU9kZXNsYW5pKHByaXpuYWs6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWRWeW1haGFuaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEdXZvZFwiLCB7IElEOiBcIkREUEdEdXZvZCNcIiwgfSwgXCJExa92b2Qgem3Em255IHDFmcOtem5ha3Ugb2Rlc2zDoW7DrVwiLCA0NTAsIDMyMClcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfb2JqLCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmF6ZXY6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByaXpuYWsgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXpldiA9IFwibmFzdGF2aXRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2ID0gXCJ6cnXFoWl0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdXZvZCA9IHJldFZhbC5kdXZvZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVwb3pvcm7Em27DrVwiLCAvLyBUaXR1bGVrIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBPcHJhdmR1IGNoY2V0ZSAke25hemV2fSBwxZnDrXpuYWsgb2Rlc2zDoW7DrSB2eW3DoWjDoWPDrWhvIGRva3VtZW50dSB1IHZ5YnJhbsO9Y2ggdnltw6Fow6Fuw60/IFxcbmAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYETFr3ZvZDogJHtkdXZvZH1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRhc2tTdGFydE5hc3RhdmVuaVByaXpPZGVzbChzZWxlY3Rpb24sIGR1dm9kLCBwcml6bmFrKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChgTmVuw60gbW/Fvm7DqSAke25hemV2fSBwxZnDrXpuYWsgb2Rlc2zDoW7DrSwgbmVieWwgemFkw6FuIGTFr3ZvZCFgLCBcIndhcm5pbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9ic2x1aGEgYXN5bmMgdGFza3UgJ05hc3RhdmVuw60gcMWZw616bmFrdSB0aXNrdSdcclxuICAgICAgICBUYXNrU3RhcnROYXN0YXZlbmlQcml6T2Rlc2woZGF0YTogYW55LCBkdXZvZDogc3RyaW5nLCBwcml6bmFrOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFzeW5jQ2xhc3NOYW1lID0gXCJHb3JkaWMuRGRwLlNlcnZlci5MSy5Bc3luYy5HRGRwTmFzdGF2ZW5pUHJpem5ha3VPZGVzbGFuaUFzeW5jVGFza1wiO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhcmFtZXRyeSA9IHtcclxuICAgICAgICAgICAgICAgIHByaXBhZHlWeW06IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBkdXZvZDogZHV2b2QsXHJcbiAgICAgICAgICAgICAgICBwcml6bmFrOiBwcml6bmFrXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgb3B0OiBBc3luYy5JR1Rhc2tPcHRpb25zID0geyBhdXRvQ2xlYW46IHRydWUsIGNsZWFyT25GaW5pc2g6IHRydWUgfTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgXCJ2eXNsZWRla05hc3RhdmVuaVByaXpPZGVzbFRhc2tcIik7XHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgXCJuYXN0YXZlbmlQcml6T2Rlc2xUYXNrXCIpO1xyXG5cclxuICAgICAgICAgICAgY250Lm5vdGlmaWNhdGlvbihcImFkZFwiLCAgLy8gcG/FoWx1IG5vdGlmaWthY2lcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJuYXN0YXZlbmlQcml6T2Rlc2xUYXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTmFzdGF2ZW7DrSBwxZnDrXpuYWt1IG9kZXNsw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSBhc3luY2hyb25uw60gYWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYXJyb3ctcmlnaHQgIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRlVGltZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydChhc3luY0NsYXNzTmFtZSwgcGFyYW1ldHJ5LCBvcHQpOyAvLyBhIHNwdXN0w61tXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIE9ibm92ZW7DrSB2eWJyYW7DvWNoIHDFmcOtcGFkxa8gdnltw6Fow6Fuw61cclxuICAgICAgICAqIEBwYXJhbSBwcml6bmFrXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9ibm92ZW5pKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWRWeW1haGFuaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdmFyIHByZWtyeXRpRGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwia29udHJvbGFQcmVrcnl2YW5pT2Jub3ZlbmlcIiwgdGV4dDogXCJQcm9iw61ow6Ega29udHJvbGEgcMWZZWtyw712w6Fuw60gcMWZw61wYWTFry4uLlwiIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5rb250cm9sYVByZWtyeXZhbmlPYm5vdmVuaSh7IGR0b3M6IHNlbGVjdGlvbiB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwiTsSba3RlcsO9IHogdnlicmFuw71jaCBwxZnDrXBhZMWvIHZ5bcOhaMOhbsOtIHNlIHDFmWVrcsO9dsOhIHMgamluw71tLiBcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNoY2V0ZSBvcHJhdmR1IHBva3JhxI1vdmF0P1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIlDFmWVrcnl0w60gdnltw6Fow6Fuw61cIiwgbWVzc2FnZSwgNDIwLCAyMTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSBwcmVrcnl0aURlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBwcmVrcnl0aURlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHByZWtyeXRpRGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb250cm9sYVByZWtyeXZhbmlPYm5vdmVuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHByZWtyeXRpRGVmLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEdXZvZFwiLCB7IElEOiBcIkREUEdEdXZvZCNcIiwgfSwgXCJExa92b2Qgb2Jub3ZlbsOtIHDFmcOtcGFkxa9cIiwgNDUwLCAzMjApXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9vYmosIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdXZvZCA9IHJldFZhbC5kdXZvZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVGFza1N0YXJ0T2Jub3Zlbmkoc2VsZWN0aW9uLCBkdXZvZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChgTmVuw60gbW/Fvm7DqSBvYm5vdml0IHDFmcOtcGFkeSwgbmVieWwgemFkw6FuIGTFr3ZvZCFgLCBcIndhcm5pbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9ic2x1aGEgYXN5bmMgdGFza3UgJ09ibm92ZW7DrSdcclxuICAgICAgICBUYXNrU3RhcnRPYm5vdmVuaShkYXRhOiBhbnksIGR1dm9kOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFzeW5jQ2xhc3NOYW1lID0gXCJHb3JkaWMuRGRwLlNlcnZlci5MSy5Bc3luYy5HRGRwT2Jub3ZlbmlWeW1Bc3luY1Rhc2tcIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBwYXJhbWV0cnkgPSB7XHJcbiAgICAgICAgICAgICAgICBwcmlwYWR5VnltOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgZHV2b2Q6IGR1dm9kLFxyXG4gICAgICAgICAgICAgICAgbmF6ZXZBa2NlOiBcIk9ibm92ZW5pVnltXCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBvcHQ6IEFzeW5jLklHVGFza09wdGlvbnMgPSB7IGF1dG9DbGVhbjogdHJ1ZSwgY2xlYXJPbkZpbmlzaDogdHJ1ZSB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHRleHR5ID0gQ29tbW9uLkJhc2UudGV4dHlBa2NpKFwiT2Jub3ZlbmlWeW1cIik7XHJcblxyXG4gICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwicmVtb3ZlXCIsIENvbW1vbi5CYXNlLnZ5c2xlZGVrSWQodGV4dHkuaWQpKTtcclxuICAgICAgICAgICAgY250Lm5vdGlmaWNhdGlvbihcImFkZFwiLCAgLy8gcG/FoWx1IG5vdGlmaWthY2lcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGV4dHkuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRleHR5LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRleHR5LmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1hcnJvdy1yaWdodCAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0KGFzeW5jQ2xhc3NOYW1lLCBwYXJhbWV0cnksIG9wdCk7IC8vIGEgc3B1c3TDrW1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWV2emV0w60gdnlicmFuw71jaCBwxZnDrXBhZMWvIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZXZ6aXQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCF0aGF0LmdyaWRWeW1haGFuaSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhhdC5ncmlkVnltYWhhbmkuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdWeW1haGFuaUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIC8vIEVuc3VyZSBlYWNoIHNlbGVjdGVkIGl0ZW0gaGFzIGl4cCBzZXQgdG8gaXhwX252eVxyXG4gICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLml4cCA9IGl0ZW0uaXhwX252eTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBqZVNwaXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJleGlzdHVqZVZ5bWFoYW5pVmVTcGlzdVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBrb250cm9sYSBwxZnDrXBhZMWvIHZlIHNwaXN1Li4uXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlJlZGlzdHJpYnVjZS5leGlzdHVqZVByaXBhZFZlU3Bpc3UoeyBzcGlzRHRvczogc2VsZWN0aW9uIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiZXhpc3R1amVWeW1haGFuaVZlU3Bpc3VcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBkZWYuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5qZV92ZV9zcGlzdSkgamVTcGlzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGplU3Bpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlDFmWV2esOtdCBzcGlzP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlZlIHZ5YnJhbsO9Y2ggdnltw6Fow6Fuw61jaCBqc291IG7Em2t0ZXLDqSB2eW3DoWjDoW7DrSB2bG/FvmVueSBkbyBzcGlzdS4gXFxuIFxcbiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVSB0xJtjaHRvIHZ5bcOhaMOhbsOtIGJ1ZGUgcMWZZXZ6YXQgY2Vsw70gc3BpcywgY2hjZXRlIHBva3JhxI1vdmF0P1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDAsIDIwMFxyXG4gICAgICAgICAgICAgICAgICAgICkub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHsgLy8gbcOhbWUgaSBwxZnDrXBhZHkgdmUgc3Bpc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPT0gXCJ5ZXNcIikgcmV0dXJuOyAvLyBwb2t1ZCB1xb5pdmF0ZWwgbmVjaGNlIHDFmWVkYXQgY2Vsw70gc3BpcywgdGFrIGtvbsSNw61tZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRhc2tTdGFydFJlZGlzdHJpYnVjZShzZWxlY3Rpb24sIDIwLCB7IHByaXpfc2VrY2U6IDEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuVGFza1N0YXJ0UmVkaXN0cmlidWNlKHNlbGVjdGlvbiwgMjAsIHsgcHJpel9zZWtjZTogMSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gUmVkaXN0cmlidWNlIC0gUMWZZWTDoW7DrSAvIFDFmWlkxJtsZW7DrSAvIFDFmWV2emV0w61cclxuXHJcbiAgICAgICAgLyoqIEZvcm11bMOhxZkgcHJvIHDFmWVkw6Fuw60vcMWZaWTEm2xlbsOtICovXHJcbiAgICAgICAgZm9ybVJlZGlzdCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwicHJpcGFkRm9ybVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMLTItOC0yLCBNLTItOC0yLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIlpwcmFjb3ZhdGVsXCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5kZHBHaW5zZnVuKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZnVuPWl4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHRoYXQudHlwUGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKG9iai52YWx1ZSAmJiB0aGF0LnByaXpTcHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFyIGl4c0Z1biA9IG9iai52YWx1ZS5peHNfZnVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBwb2t1ZCBqZSBzcHLDoXZjb3Zza8O9IHR5cCBwb2hsZWTDoXZreSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gdGFrIHpqaXN0w61tZSB6ZGEgbcOhIHpwcmFjb3ZhdGVsIHDFmcOtc3R1cCBrZSBzcHLDoXZjxa9tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIGEgcG9rdWQgbmUsIHRhayBob2TDrW1lIGhsw6HFoWt1PyBhIHBva3VkIGppY2ggamUgdsOtYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gdGFrIHpha3Rpdm7DrW1lIHZ5YsSbciBzcHLDoXZjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwicHJpc3R1cEtlU3ByYXZjaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBrb250cm9sYSBwxZnDrXN0dXB1IGtlIHNwcsOhdmPFr20uLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5pc2wuUmVkaXN0cmlidWNlLnByaXN0dXBLZVNwcmF2Y2koeyBpeHNGdW46IG9iai52YWx1ZS5peHNfZnVuID8/IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5nZXQoKS5kb25lKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwicHJpc3R1cEtlU3ByYXZjaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBuZW3DoSDFvsOhZG7DqSBwxZnDrXN0dXBuw6kgc3Byw6F2Y2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJwcmlwYWRGb3JtXCIpLmZpbmRGaWVsZHMoXCJjaXNfc3ByXCIpLmdmaWVsZChcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcInByaXBhZEZvcm1cIikuZmluZEZpZWxkcyhcImNpc19zcHJcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgXCJVcG96b3JuxJtuw61cIiwgXCJWeWJyYW7DoSBmdW5rY2UgbmVtw6EgcMWZw61zdHVwIGsgxb7DoWRuw6ltdSBzcHLDoXZjaS5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBlbHNlIGlmIChyZXN1bHQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIG3DoSB2w61jZSBwxZnDrXN0dXBuw71jaCBzcHLDoXZjxa8sIHRhayB6b2JyYXrDrW1lIHbDvWLEm3Igc3Byw6F2Y2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciBmaWx0ZXI6IGFueSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHRoYXQudHlwUGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaXhzX2Z1bjogaXhzRnVuID8/IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgSXNsLlZpZXcodGhhdC5pc2wuUmVkaXN0cmlidWNlLmxpc3RTcHJhdmNpKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICkpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB2YXIgZ3JpZCA9ICQoJ2RpdltkYXRhLWZvcm09XCJwcmlwYWRGb3JtXCJdIC5nZm9ybS1maWVsZC5nZ3JpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5hY3Rpb25zLmFjdFRpc2tQcmVkYW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnZhbHVlKSB0aGF0LmFjdGlvbnMuYWN0VGlza1ByZWRhbmkuZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgdGhhdC5hY3Rpb25zLmFjdFRpc2tQcmVkYW5pLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIFR5cCBwb2hsZWTDoXZreSBqZSBzcHLDoXZjb3Zza8O9LCB0YWsgem9icmF6w61tZSBmb3JtdWzDocWZIHBybyBzcHLDoXZjZSAtIHBvdXplIG5hIHDFmcOtcGFkZWNoIEREUFxyXG4gICAgICAgICAgICAvL2lmICh0aGF0LnByaXpTcHIgPT0gMSkge1xyXG4gICAgICAgICAgICAvLyAgICBmb3JtXHJcbiAgICAgICAgICAgIC8vICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwiZ3JpZFNlY3Rpb25cIiB9KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAuYWRkRmllbGQoXCJnZ3JpZFwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgcm93SGVpZ2h0OiAzMCxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb2x1bW5zOiBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuU3ByYXZjaVByb1ByZWRhbmkoKSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBzaG93VG9wUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogdHJ1ZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBXaXphcmQgcHJvIHDFmWVkw6Fuw60vcMWZaWTEm2xlbsOtICovXHJcbiAgICAgICAgd2l6emFyZFJlZGlzdChjaGVja0Z1bmN0aW9uOiBhbnksIHR5cFJlZGlzdDogbnVtYmVyKSB7IC8vIDAgLSBwxZllZMOhbsOtLCAxMCAtIHDFmWlkxJtsZW7DrVxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWRWeW1haGFuaS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9kc3RyYW5pdCB6ZSBzZWxlY3Rpb24gbmVha3Rpdm7DrSBwxZnDrXBhZHlcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gc2VsZWN0aW9uLmZpbHRlcigoaXRlbTogYW55KSA9PiBpdGVtLmFrdGl2aXRhID09PSAxMDApO1xyXG5cclxuICAgICAgICAgICAgLy8gb2RzdHJhbml0IHplIHNlbGVjdGlvbiBwxZnDrXBhZHksIGtkZSBpeHNfZnVuX2FrdCBuZW7DrSBzaG9kbsOpIHMgaXhzRnVuXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHNlbGVjdGlvbi5maWx0ZXIoKGl0ZW06IGFueSkgPT4gaXRlbS5peHNfZnVuX2FrdCA9PT0gdGhhdC5peHNGdW4pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIGFycmF5SXhwOiBhbnkgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGFycmF5SXhwU3BpczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGE6IGFueSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgdmVTcGlzdTogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgdmFyIGplU3BpcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gcMWZaWTDoW1lIGl4cF9udnkgamFrbyBpeHAsIGFieSBzZSB0byBkYWxvIHBvdcW+w610IHYgZGFsxaHDrW0genByYWNvdsOhbsOtXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaXhwID0gaXRlbS5peHBfbnZ5OyBcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJleGlzdHVqZVZ5bWFoYW5pVmVTcGlzdVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBrb250cm9sYSBwxZnDrXBhZMWvIHZlIHNwaXN1Li4uXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlJlZGlzdHJpYnVjZS5leGlzdHVqZVByaXBhZFZlU3Bpc3UoeyBzcGlzRHRvczogc2VsZWN0aW9uIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJeHAucHVzaCh7IGl4cDogaXRlbS5peHAgfSk7IC8vIHDFmWlkw6FtZSBpeHAgZG8gcG9sZSBwcm8gZGFsxaHDrSB6cHJhY292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uamVfdmVfc3Bpc3UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGplU3BpcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUl4cFNwaXMucHVzaChpdGVtLml4cF9zcGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlU3Bpc3UucHVzaCh7IGl4cDogaXRlbS5peHBfc3BpcywgamVfc3BpczogaXRlbS5qZV92ZV9zcGlzdSwgaXhwX252eTogaXRlbS5peHAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheUl4cFNwaXMucHVzaChpdGVtLml4cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZVNwaXN1LnB1c2goeyBpeHA6IGl0ZW0uaXhwX3NwaXMsIGplX3NwaXM6IGl0ZW0uamVfdmVfc3Bpc3UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJleGlzdHVqZVZ5bWFoYW5pVmVTcGlzdVwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoamVTcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQxZllZGF0IHNwaXM/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlZlIHZ5YnJhbsO9Y2ggdnltw6Fow6Fuw61jaCBqc291IG7Em2t0ZXLDqSB2eW3DoWjDoW7DrSB2bG/FvmVueSBkbyBzcGlzdS4gXFxuIFxcbiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlUgdMSbY2h0byB2eW3DoWjDoW7DrSBidWRlIHDFmWVkw6FuIGNlbMO9IHNwaXMsIGNoY2V0ZSBwb2tyYcSNb3ZhdD9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQwMCwgMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHsgLy8gbcOhbWUgaSBwxZnDrXBhZHkgdmUgc3Bpc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgIT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7IC8vIHBva3VkIHXFvml2YXRlbCBuZWNoY2UgcMWZZWRhdCBjZWzDvSBzcGlzLCB0YWsga29uxI3DrW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJ3ZmxzcGlkUHJvUHJlZGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSB6w61za8OhbsOtIGRhdCBwxZnDrXBhZMWvIHBybyBwxZllZMOhbsOtLi4uXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6w61za2F0IGRhdGEgeiB3ZmxzcGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5SZWRpc3RyaWJ1Y2Uud2Zsc3BpZFByb1ByZWRhbmkoeyBwcmlwYWR5OiBhcnJheUl4cFNwaXMgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVTcGlzdS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGVudHJ5IGluIHJlc3VsdCB3aGVyZSBpeHAgbWF0Y2hlcyBpdGVtLml4cCBhbmQgc2V0IGplX3NwaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gcmVzdWx0LmZpbmQoKGVudHJ5OiBhbnkpID0+IGVudHJ5Lml4cCA9PT0gaXRlbS5peHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQuamVfc3BpcyA9IGl0ZW0uamVfc3BpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ3ZmxzcGlkUHJvUHJlZGFuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbcOhbWUgamVuIHDFmcOtcGFkeSBjbyBuZWpzb3UgdmUgc3Bpc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcIndmbHNwaWRQcm9QcmVkYW5pXCIsIHRleHQ6IFwiUHJvYsOtaMOhIHrDrXNrw6Fuw60gZGF0IHDFmcOtcGFkxa8gcHJvIHDFmWVkw6Fuw60uLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOtc2thdCBkYXRhIHogd2Zsc3BpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5SZWRpc3RyaWJ1Y2Uud2Zsc3BpZFByb1ByZWRhbmkoeyBwcmlwYWR5OiBhcnJheUl4cFNwaXMgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5qZV9zcGlzID0gZmFsc2U7IC8vIG5lbsOtIHZlIHNwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIndmbHNwaWRQcm9QcmVkYW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImV4aXN0dWplVnltYWhhbmlWZVNwaXN1XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ3ZmxzcGlkUHJvUHJlZGFuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBcIlDFmWVkw6Fuw61cIiAvLyBQxZlldnpldMOtXHJcbiAgICAgICAgICAgIC8vIGdldCBkYXRhIGZyb20gd2Zsc3BpZFxyXG4gICAgICAgICAgICBkZWYucHJvbWlzZSgpLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm0gPSB0aGF0LmZvcm1SZWRpc3QoKTtcclxuICAgICAgICAgICAgICAgIHZhciBtZW51R3JpZDogYW55O1xyXG4gICAgICAgICAgICAgICAgbWVudUdyaWQgPSBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VGlza1ByZWRhbmkgfV1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8YW55Pj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuUHJlZGFuaSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFwiaXhwX252eSwgaXhwX3NwaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJWeWJyYW7DqSBwxZnDrXBhZHlcIiwgLy8gdGl0dWxlayB2IHRhYnUgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiUHJvdmXEj1wiLCAvLyBuw6F6ZXYgcHJvIHRsYcSNw610a28gZGFsxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogbWVudUdyaWQsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrY2UgbmEgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7IC8vIGFrY2UgcHJvIGtvbnRyb2x1IGRhdCwgbW9kZWwgLSBkYXRhIHogbW9kZWxEYXRhLCBpbnB1dCAtIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaXNfc3ByOiBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZFNwcmF2Y2kgPSAkKCdkaXZbZGF0YS1mb3JtPVwicHJpcGFkRm9ybVwiXSAuZ2Zvcm0tZmllbGQuZ2dyaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkU3ByYXZjaSAhPSBudWxsIHx8IGdyaWRTcHJhdmNpICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSBncmlkU3ByYXZjaS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc19zcHIgPSBzZWxlY3Rpb25bMF0uY2lzX3NwcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvblswXS5mbGFnID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKGBWeWJyYW7DvSBzcHLDoXZjZSBqacW+IG5lYm8gamXFoXTEmyBuZW7DrSBwbGF0bsO9LCB2eWJlcnRlIHByb3PDrW0gamluw6lobyFgLCBcIndhcm5pbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR01vZGVsUmVkaXN0cmlidWNlRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19mdW46IG1vZGVsLml4c19mdW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzX3NwcjogY2lzX3NwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcmVkaXN0cmlidWNlOiB0eXBSZWRpc3QsIC8vIDAgLSBwxZllZMOhbsOtLCAxMCAtIHDFmWlkxJtsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfc2VrY2U6IDEgLy8gamVkbsOhIHNlIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGVja0Z1bmN0aW9uKHsgcHJlZGFuaUR0b3M6IGRhdGEsIG1vZGVsOiBtb2RlbER0byB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2lzX3NwcjogYW55O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWZDb25maXJtID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LnByaXpQcmludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtVGl0bGUgPSBcIlDFmWVkw6F2YWPDrSBwcm90b2tvbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maXJtTWVzc2FnZSA9IFwiUHJvemF0w61tIG5lYnlsIHZ5dGnFoXTEm24gcMWZZWTDoXZhY8OtIHByb3Rva29sLiBQxZllamV0ZSBzaSBwb2tyYcSNb3ZhdD9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShjb25maXJtVGl0bGUsIGNvbmZpcm1NZXNzYWdlLCA0MDAsIDIwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9ldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQ29uZmlybS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZkNvbmZpcm0ucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgZGVmQ29uZmlybS5yZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmQ29uZmlybS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZFNwcmF2Y2kgPSAkKCdkaXZbZGF0YS1mb3JtPVwicHJpcGFkRm9ybVwiXSAuZ2Zvcm0tZmllbGQuZ2dyaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZFNwcmF2Y2kgIT0gbnVsbCB8fCBncmlkU3ByYXZjaSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGdyaWRTcHJhdmNpLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNfc3ByID0gc2VsZWN0aW9uWzBdLmNpc19zcHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uWzBdLmZsYWcgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKGBWeWJyYW7DvSBzcHLDoXZjZSBqacW+IG5lYm8gamXFoXTEmyBuZW7DrSBwbGF0bsO9LCB2eWJlcnRlIHByb3PDrW0gamluw6lobyFgLCBcIndhcm5pbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsRHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR01vZGVsUmVkaXN0cmlidWNlRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuOiBtb2RlbC5peHNfZnVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaXNfc3ByOiBjaXNfc3ByLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcmVkaXN0cmlidWNlOiB0eXBSZWRpc3QsIC8vIDAgLSBwxZllZMOhbsOtLCAxMCAtIHDFmWlkxJtsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfcGhsOiB0aGF0LnR5cFBobCwgLy8gVE9ETyAtIHRvIHNlIG5lbcOhIHBvc8OtbGF0LCBqYWsgemppc3RpdCBuYSBhc3luYyBla29wYXJhbXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdGhhdC5peHBEZW4sIC8vIFRPRE8gLSB0byBzZSBuZW3DoSBwb3PDrWxhdCwgamFrIHpqaXN0aXQgbmEgYXN5bmMgZWtvcGFyYW1zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnJhZGE6IHRoYXQuc3VicmFkYSwgLy8gVE9ETyAtIHRvIHNlIG5lbcOhIHBvc8OtbGF0LCBqYWsgemppc3RpdCBuYSBhc3luYyBla29wYXJhbXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpel9zZWtjZTogMSAvLyBqZWRuw6Egc2Ugdnltw6Fow6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlRhc2tTdGFydFJlZGlzdHJpYnVjZShhcnJheUl4cCwgdHlwUmVkaXN0LCBtb2RlbER0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoW2RhdGFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGbDoXplIDIgLSB6b2JyYXplbsOtwq0gdsO9c2xlZGt1IHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71zbGVkZWtcIiwgLy9uYXpldiBrcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiQWt0dWFsaXpvdmFuw6kgcMWZw63CrXBhZHlcIiwgLy9wb3Bpc2VrIG5hZCBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiAoKSA9PiB7IC8vcHJlZGFuaSBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC56aXNrZWpEYXRhKHRoYXQuZmlsdGVyRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxEZWxlZ2F0ZTogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH0pICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGlzayBwxZllZMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSB0aXNrUHJlZGFuaShjbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q250ID0gY250LmN1cnJlbnRDb250ZW50O1xyXG4gICAgICAgICAgICB2YXIgaXhzRnVuRmllbGQgPSAkKGN1cnJlbnRDbnQpLmZpbmRGaWVsZHMoXCJpeHNfZnVuXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgaXhzRnVuOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIHZhciBpeHNGdW5OYXpldjogc3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAoaXhzRnVuRmllbGQgIT0gbnVsbCAmJiBpeHNGdW5GaWVsZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGl4c0Z1biA9IGl4c0Z1bkZpZWxkLml4c19mdW47XHJcbiAgICAgICAgICAgICAgICBpeHNGdW5OYXpldiA9IGl4c0Z1bkZpZWxkLm5hemV2X3JmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZW7DrSBtb8W+bsOpIHRpc2tub3V0LCBuZW7DrSB2eWJyw6FuIHpwcmFjb3ZhdGVsIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RUaXNrUHJlZGFuaSA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrUHJlZGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmRcIixcclxuICAgICAgICAgICAgICAgIGN1c3RvbUR0bzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuaXhwRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIHJva19kZW46IHRoYXQucm9rRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgIGl4c19mdW46IGl4c0Z1bixcclxuICAgICAgICAgICAgICAgICAgICBuYXpldjogaXhzRnVuTmF6ZXZcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyDihpMgTWV0b2RhLCBrdGVyw6EgamUgemF2b2zDoW5hIHTEm3NuxJsgcMWZZWQgZ2VuZXJvdsOhbsOtbSBzZXN0YXZ5IGEga2RlIGx6ZSBuYSBzdHJhbsSbIHNlcnZlcnUgb3ZsaXZuaXQgcGFyYW1ldHJ5IHNlc3Rhdnkg4oaTXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RkcFdlYlRpc2s6VGlza1ByZWRhbmlcIiwgIC8vemRlIHNlIHBsbsOtIHTDqW1hXHJcbiAgICAgICAgICAgICAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucHJpelByaW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkaWFsb2dDbG9zZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhY3RUaXNrUHJlZGFuaS5ydW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9ic2x1aGEgYXN5bmMgdGFza3UgJ1JlZGlzdHJpYnVjZSdcclxuICAgICAgICBUYXNrU3RhcnRSZWRpc3RyaWJ1Y2UoZGF0YTogYW55LCBwcml6bmFrOiBudW1iZXIsIG1vZGVsOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFzeW5jQ2xhc3NOYW1lID0gXCJHb3JkaWMuRGRwLlNlcnZlci5MSy5Bc3luYy5HRGRwUmVkaXN0cmlidWNlQXN5bmNUYXNrXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBwxZnDrXpuYWs6IDAgLSBwxZllZMOhbsOtLCAxMCAtIHDFmWlkxJtsZW7DrSwgMjAgLSBwxZlldnpldMOtXHJcbiAgICAgICAgICAgIGxldCBwYXJhbWV0cnkgPSB7XHJcbiAgICAgICAgICAgICAgICBwcmVkYW5pRHRvczogZGF0YSwgLy8gcMWZZWTDoXZhbsOpL3DFmWlkxJtsb3ZhbsOpIHDFmcOtcGFkeVxyXG4gICAgICAgICAgICAgICAgcHJldnpldGlEdG9zOiBkYXRhLCAvLyBwxZlldnphdMOpIHDFmcOtcGFkeVxyXG4gICAgICAgICAgICAgICAgcHJpem5hazogcHJpem5haywgLy8gcMWZw616bmFrIHJlZGlzdHJpYnVjZVxyXG4gICAgICAgICAgICAgICAgbW9kZWxSZWRpc3Q6IG1vZGVsLCAvLyBtb2RlbCBwcm8gcMWZZWTDoW7DrS9wxZlpZMSbbGVuw61cclxuICAgICAgICAgICAgICAgIG5hemV2QWtjZTogXCJSZWRpc3RyaWJ1Y2VcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IG9wdDogQXN5bmMuSUdUYXNrT3B0aW9ucyA9IHsgYXV0b0NsZWFuOiB0cnVlLCBjbGVhck9uRmluaXNoOiB0cnVlIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dHkgPSBDb21tb24uQmFzZS50ZXh0eUFrY2koXCJSZWRpc3RyaWJ1Y2VcIik7XHJcblxyXG4gICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwicmVtb3ZlXCIsIENvbW1vbi5CYXNlLnZ5c2xlZGVrSWQodGV4dHkuaWQpKTtcclxuICAgICAgICAgICAgY250Lm5vdGlmaWNhdGlvbihcImFkZFwiLCAgLy8gcG/FoWx1IG5vdGlmaWthY2lcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGV4dHkuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRleHR5LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRleHR5LmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1hcnJvdy1yaWdodCAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0KGFzeW5jQ2xhc3NOYW1lLCBwYXJhbWV0cnksIG9wdCk7IC8vIGEgc3B1c3TDrW1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gSHJvbWFkbsOpIGFrY2UgbmEgc2V6bmFtdSB2eW3DoWjDoW7DrVxyXG4gICAgICAgIC8vIE9ic2x1aGEgYXN5bmMgdGFza3UgJ3Z5bcOhaGF0J1xyXG4gICAgICAgIFRhc2tTdGFydEhyb21Ba2NlKGRhdGE6IGFueSwgbW9kZWw6IGFueSwgbmF6ZXZBa2NlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFzeW5jQ2xhc3NOYW1lID0gXCJHb3JkaWMuRGRwLlNlcnZlci5MSy5Bc3luYy5HRGRwSHJvbWFkbmVBa2NlVnltQXN5bmNUYXNrXCI7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFyYW1ldHJ5ID0ge1xyXG4gICAgICAgICAgICAgICAgcHJpcGFkeVZ5bTogZGF0YSxcclxuICAgICAgICAgICAgICAgIG1vZGVsVnltOiBtb2RlbCxcclxuICAgICAgICAgICAgICAgIG5hemV2QWtjZTogbmF6ZXZBa2NlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgb3B0OiBBc3luYy5JR1Rhc2tPcHRpb25zID0geyBhdXRvQ2xlYW46IHRydWUsIGNsZWFyT25GaW5pc2g6IHRydWUgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXh0eSA9IENvbW1vbi5CYXNlLnRleHR5QWtjaShuYXpldkFrY2UpO1xyXG4gICAgICAgICAgICB2YXIgdnlzbGVkZWtJRCA9IENvbW1vbi5CYXNlLnZ5c2xlZGVrSWQodGV4dHkuaWQpO1xyXG5cclxuICAgICAgICAgICAgY250Lm5vdGlmaWNhdGlvbihcInJlbW92ZVwiLCB2eXNsZWRla0lEKTtcclxuXHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgIC8vIHBvxaFsdSBub3RpZmlrYWNpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRleHR5LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0ZXh0eS50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0ZXh0eS5jb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYXJyb3ctcmlnaHQgIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRlVGltZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlci5zdGFydChhc3luY0NsYXNzTmFtZSwgcGFyYW1ldHJ5LCBvcHQpOyAvLyBhIHNwdXN0w61tXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gRm9ybXVsw6HFmWVcclxuICAgICAgICBmb3JtVGVybWlub3ZhS2Fsa3VsYWNrYSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0zLTctMlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBkb3J1xI1lbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfZG9ydWNcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rYWxrRmlyc3RUaW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiTmFieXTDrSBwcsOhdm7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkxoxa90YSBwcm8gb2R2b2zDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkbnlfcG1cIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rYWxrRmlyc3RUaW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIG5hYnl0w60gcHLDoXZuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rYWxrRmlyc3RUaW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG1fcG9zdW5cIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJPZCBuw6FzbGVkdWrDrWPDrWhvIGRuZSBwbyBkb3J1xI1lbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rYWxrRmlyc3RUaW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG1fZG55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcInctNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiAnS2FsZW5kw6HFmW7DrSBkbnknIH0sIC8vcG1fa2FsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IDEsIGxhYmVsOiAnUHJhY292bsOtIGRueScgfSwgIC8vcG1fcHJhY1xyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmthbGtGaXJzdFRpbWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50ZXJtaW5vdmFLYWxrdWxhY2thQ2FsYygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9zdW4gcG9zbGVkbsOtaG8gZG5lIGxoxa90eVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3N1bl92eXBfcG1cIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wb3N1bl92eXBfcG09dmFsdWUuaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7cG9waXN9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGlkOiAwLCBwb3BpczogXCJQb3N1biBwb3NsZWRuw61obyBkbmUgbGjFr3R5IG5hIHBvc2xlZG7DrSBuZXByYWNvdm7DrSBkZW5cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogMCwgcG9waXM6IFwiUG9zdW4gcG9zbGVkbsOtaG8gZG5lIGxoxa90eSBuYSBwb3NsZWRuw60gbmVwcmFjb3Zuw60gZGVuXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogMSwgcG9waXM6IFwiTmVwb3NvdXZhdFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IDIsIHBvcGlzOiBcIlBvc3VuIHBvc2xlZG7DrWhvIGRuZSBsaMWvdHkgbmEgcHJhY292bsOtIGRlblwiIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5rYWxrRmlyc3RUaW1lKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiVnlrb25hdGVsbm9zdFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkxoxa90YSBwcm8gemFwbGFjZW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkbnlfdnlrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBuYWJ5dMOtIHByw6F2bsOtIG1vY2lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eWtcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5a19wb3N1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIk9kIG7DoXNsZWR1asOtY8OtaG8gZG5lIHBybyBuYWJ5dMOtIG1vY2lcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5a19kbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy02XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6ICdLYWxlbmTDocWZbsOtIGRueScgfSwgLy8gdnlrX2thbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogJ1ByYWNvdm7DrSBkbnknIH0sIC8vIHZ5a19wcmFjXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3N1biBwb3NsZWRuw61obyBkbmUgbGjFr3R5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvc3VuX3Z5cF92eWtcIixcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wb3N1bl92eXBfdnlrPXZhbHVlLmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3BvcGlzfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBpZDogMCwgcG9waXM6IFwiUG9zdW4gcG9zbGVkbsOtaG8gZG5lIGxoxa90eSBuYSBwb3NsZWRuw60gbmVwcmFjb3Zuw60gZGVuXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IDAsIHBvcGlzOiBcIlBvc3VuIHBvc2xlZG7DrWhvIGRuZSBsaMWvdHkgbmEgcG9zbGVkbsOtIG5lcHJhY292bsOtIGRlblwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IDEsIHBvcGlzOiBcIk5lcG9zb3V2YXRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAyLCBwb3BpczogXCJQb3N1biBwb3NsZWRuw61obyBkbmUgbGjFr3R5IG5hIHByYWNvdm7DrSBkZW5cIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybVRlcm1pbm92YUthbGt1bGFja2FWYWx1ZXMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIEluaWNpYWxpemFjZSBwcm9txJtubsO9Y2hcclxuICAgICAgICAgICAgdmFyIGRfZGF0dW1fZG9ydWNlbmkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgZG55UG06IG51bWJlcjtcclxuICAgICAgICAgICAgdmFyIGRueVZrOiBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibGh1dHlcIiwgdGV4dDogXCJaw61za8OhbsOtIGRhdCB0ZXJtw61ub3bDqSBrYWxrdWxhxI1reVwiIH0pXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnZyYXRMaHV0eSh7IGl4c1NrdjogdGhhdC5OdWxsU2t2LCBzdGF2VnltOiAwLCBzdGF2VnltT2xkOiAwIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkbnlQbSA9IHJlc3VsdC5kbnlfcG07XHJcbiAgICAgICAgICAgICAgICAgICAgZG55VmsgPSByZXN1bHQuZG55X3ZrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibGh1dHlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBkZWYuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kZWxEYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIG1vZGVsRGF0YS5kYXRfZG9ydWMgPSBkX2RhdHVtX2RvcnVjZW5pO1xyXG4gICAgICAgICAgICAgICAgbW9kZWxEYXRhLmRueV9wbSA9IGRueVBtO1xyXG4gICAgICAgICAgICAgICAgbW9kZWxEYXRhLmRueV92eWsgPSBkbnlWaztcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtID0gJC5jb250ZW50KCkuZmluZEZvcm1zKFwid2l6UGFyYW1zXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBtb2RlbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQua2Fsa0ZpcnN0VGltZSkgdGhhdC5rYWxrRmlyc3RUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRlcm1pbm92YUthbGt1bGFja2FDYWxjKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JtRG90Y2VueURvaygpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMy03LTJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkl4cygpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHZhemJ5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LndmbGN2cHAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3ZhemJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwudHlwX3ZwcD12YWx1ZS50eXBfdnBwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlpkcm9qb3bDvSBkb2tsYWRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybURvdGNlbnlTdWIoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gdGhhdC5nZXRDdXJyZW50RGF0ZUFzU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHZhciB0aW1lID0gdGhhdC5nZXRDdXJyZW50VGltZUFzU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0zLTctMlwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3ViamVrdFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2VzdT1peHNfZXN1O2VzdV9kaWM9ZGljO2xpYz12YWx1ZS5saWM7cG9yX3phc3Q9dmFsdWUucG9yX3phc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUubnVtX3phc3QgPiAwKSB7IC8vcG9rdWQgbcOhIHDFmcOtcGFkIHrDoXN0dXBjZSwgdW1vxb5uaXQgdsO9YsSbciB6w6FzdHVwY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcygncG9yX3phc3RfY2hlY2snKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyID0geyBpeHNfZXN1OiBvYmoudmFsdWUuaXhzX2VzdSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuSHJvbWFkbmVBa2NlUHJpcGFkLnppc2tlalphc3R1cGNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBmaWx0ZXJzOiBmaWx0ZXIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZFphc3R1cGNpID0gJChldi5jdXJyZW50VGFyZ2V0KS5maW5kKFwiW2RhdGEtaGVscC1jb250ZXh0PSdsaXN0OmdyaWRaYXN0dXBjaSddXCIpLmdncmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZXYuY3VycmVudFRhcmdldCkuZmluZChcIltkYXRhLWhlbHAtY29udGV4dD0nbGlzdDpncmlkWmFzdHVwY2knXVwiKS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LmN1cnJlbnRUYXJnZXQpLmZpbmRGaWVsZHMoJ3Bvcl96YXN0X2NoZWNrJykuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwOiBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuVHlwWm9icmF6ZW5pS2Fyb3Rla2EuU2VsZWN0RXN1LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBwcmVmYWJ1ICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ292YW5pOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IFwiMDAwMFgwMDAwMDAzXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphZMOhbsOtIGxvZ292YWPDrWNoIMO6ZGFqdSBqZSBudXRub3N0IGhsYXZuxJsgSVhQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmksICAgICAgICAgLy8gdnlicmF0IHogZW51bXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJIcm9tYWRuw6kgcMWZaWTDoW7DrSBkb3TEjWVuw6lobyBzdWJqZWt0dVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkgYXMgR1NlbGVjdEJveE9wdGlvbnM8YW55PilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgdmF6YnlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Qud2ZsY3R5digpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfdmF6YnlcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC50eXBfdmF6Ynk9dmFsdWUudHlwX3ZhemJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRHJ1aCB2YXpieVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC53ZmxzZHZhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19kdmFcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZHZhPXZhbHVlLml4c19kdmFcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IDI1NCB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogYFZhemJhIHZ5dHZvxZllbmEgJHtkYXRlfSB2ICR7dGltZX1gXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkTFr3ZvZFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInJlYXNvblwiLCBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IDI1NCB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpbml0X2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkplIGluaWNpw6F0b3JlbVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5cml6X2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIkplIGPDrWxlbVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcl96YXN0X2NoZWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiUG91xb7DrXQgesOhc3R1cGNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZ3JpZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkWmFzdHVwY2lcIixcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImFsbC1hdC1vbmNlXCIsICAgICAvLyBhdXRvLCBhbGwtYXQtb25jZSwgcGFnZWQtc3luYywgcGFnZWQtYXN5bmNcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0hlYWRlclJvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLkhybUFrY2VaYXN0dXBjZVByaXBhZHUoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcm1Eb3RjZW55U3ViWmVTa3VwKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IHRoYXQuZ2V0Q3VycmVudERhdGVBc1N0cmluZygpO1xyXG4gICAgICAgICAgICB2YXIgdGltZSA9IHRoYXQuZ2V0Q3VycmVudFRpbWVBc1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMTVMtMy03LTJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNrdXBpbmEgRFNVXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkhsZWRhdEVzdVZlU2t1cGluZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7VGV4dE5hbWVPZkdyb3VwfSAoe1RleHR9KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAyNTQgfSksIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5ncm91cF9uYW1lPXZhbHVlLlRleHROYW1lT2ZHcm91cDttb2RlbC50ZXh0PXZhbHVlLlRleHQ7bW9kZWwuaXhzX3J6ZD12YWx1ZS5peHNfcnpkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gJCh0aGlzIGFzIChHU2VsZWN0Qm94T3B0aW9uc1NpbmdsZTxhbnk+ICYgSFRNTEVsZW1lbnQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWluRGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlNzbC5EaWFsb2dzLkdWeWJlckVzdVNrdXBpbnlEbGcoJC5jb250ZW50KGZpZWxkKSwgbnVsbCwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvdylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoR29yZGljLlV0aWxzLldpZGdldEV4aXN0cyhcImdmaWVsZFwiLCBmaWVsZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAmJiByZXRWYWwuc2VsZWN0ZWRSb3cgJiYgcmV0VmFsLnNlbGVjdGVkUm93LlRleHROYW1lT2ZHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsLnNlbGVjdGVkUm93LCB7IHZhbGlkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLmdmaWVsZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluRGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYWluRGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlR5cCB2YXpieVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC53ZmxjdHl2KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF92YXpieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnR5cF92YXpieT12YWx1ZS50eXBfdmF6YnlcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEcnVoIHZhemJ5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LndmbHNkdmEoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2R2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19kdmE9dmFsdWUuaXhzX2R2YVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvem7DoW1rYVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMjU0IH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBcIlZhemJhIHZ5dHZvxZllbmEgXCIgKyBkYXRlICsgXCIgdiBcIiArIHRpbWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRMWvdm9kXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicmVhc29uXCIsIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMjU0IH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSlcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vIFphdm9sw6Fuw60ga2Fsa3VsYWNlIGRhdHVtxa8gcHJvIHRlcm3DrW5vdm91IGthbGt1bGHEjWt1XHJcbiAgICAgICAgdGVybWlub3ZhS2Fsa3VsYWNrYUNhbGMoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1vZGVsRGF0YTogYW55ID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQuY29udGVudCgpLmZpbmRGb3JtcyhcIndpelBhcmFtc1wiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBpc0Zvcm1WYWxpZCA9IGZvcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpO1xyXG4gICAgICAgICAgICBpZiAoIWlzRm9ybVZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgbW9kZWxEYXRhKTtcclxuICAgICAgICAgICAgLy9cclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9ICQoZm9ybSk7XHJcbiAgICAgICAgICAgICQuY29udGVudChjdXJyZW50RWxlbWVudCkuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJzcG9jdGlEYXR1bXlcIiwgdGV4dDogXCJQcm9iw61ow6EgdsO9cG/EjWV0IHRlcm3DrW7Fry4uLlwiIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRueVBtID0gbW9kZWxEYXRhLmRueV9wbTtcclxuICAgICAgICAgICAgdmFyIGRueVZ5ayA9IG1vZGVsRGF0YS5kbnlfdnlrO1xyXG4gICAgICAgICAgICB2YXIgZGF0RG9ydWMgPSBtb2RlbERhdGEuZGF0X2RvcnVjO1xyXG5cclxuICAgICAgICAgICAgbW9kZWxEYXRhLnBvc3VuX3Z5cF9wbSA9IG1vZGVsRGF0YS5wb3N1bl92eXBfcG07XHJcbiAgICAgICAgICAgIG1vZGVsRGF0YS5wb3N1bl92eXBfdnlrID0gbW9kZWxEYXRhLnBvc3VuX3Z5cF92eWs7XHJcblxyXG4gICAgICAgICAgICAvLyBEYXR1bSB2eWtvbmF0ZWxub3N0aSBhIG5hYnl0w60gcHLDoXZuw60gbW9jaSBzZSBidWRlIHBvxI3DrXRhdCB2IERCXHJcbiAgICAgICAgICAgIGlmIChkbnlQbSAhPSBudWxsICYmIGRueVZ5ayAhPSBudWxsICYmIGRhdERvcnVjICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnZ5cG9jZXREYXRUZXJtaW5LYWxrKHsgZGF0YTogbW9kZWxEYXRhIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcImRhdF9wbVwiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHJlc3VsdC5kYXRfcG0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmZpbmRGaWVsZHMoXCJkYXRfdnlrXCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgcmVzdWx0LmRhdF92eWtvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5jb250ZW50KGN1cnJlbnRFbGVtZW50KS5lbmRPcGVyYXRpb24oeyBpZDogXCJzcG9jdGlEYXR1bXlcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBwb21vY27DqSBmdW5rY2VcclxuICAgICAgICBub3JtYWxpemVXaGl0ZXNwYWNlKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldERhdGVBc1N0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgY29uc3QgZGF5OiBudW1iZXIgPSBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgY29uc3QgbW9udGg6IG51bWJlciA9IGRhdGUuZ2V0TW9udGgoKSArIDE7IC8vIE1vbnRocyBhcmUgemVyby1iYXNlZCwgc28gd2UgYWRkIDFcclxuICAgICAgICAgICAgY29uc3QgeWVhcjogbnVtYmVyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgICAgICAgICAgLy8gRW5zdXJlIGxlYWRpbmcgemVyb3MgZm9yIGRheSBhbmQgbW9udGggaWYgbmVjZXNzYXJ5XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZERheTogc3RyaW5nID0gZGF5IDwgMTAgPyAnMCcgKyBkYXkgOiBkYXkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkTW9udGg6IHN0cmluZyA9IG1vbnRoIDwgMTAgPyAnMCcgKyBtb250aCA6IG1vbnRoLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBGb3JtYXQgdGhlIGRhdGUgYXMgZGQubW0ueXl5eVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRlOiBzdHJpbmcgPSBgJHtmb3JtYXR0ZWREYXl9LiR7Zm9ybWF0dGVkTW9udGh9LiR7eWVhcn1gO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHRlZERhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaw61za8OhbsOtIGRuZcWha2EgamFrbyBzdHJpbmdcclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldEN1cnJlbnREYXRlQXNTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkRGF0ZSA9IHRoaXMuZ2V0RGF0ZUFzU3RyaW5nKGN1cnJlbnREYXRlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHRlZERhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaw61za8OhbsOtIGFrdHXDoWxuw61obyDEjWFzdSBqYWtvIHN0cmluZ1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0Q3VycmVudFRpbWVBc1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvdXJzOiBudW1iZXIgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBjb25zdCBtaW51dGVzOiBudW1iZXIgPSBjdXJyZW50RGF0ZS5nZXRNaW51dGVzKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBFbnN1cmUgbGVhZGluZyB6ZXJvcyBmb3IgaG91cnMgYW5kIG1pbnV0ZXMgaWYgbmVjZXNzYXJ5XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZEhvdXJzOiBzdHJpbmcgPSBob3VycyA8IDEwID8gJzAnICsgaG91cnMgOiBob3Vycy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRNaW51dGVzOiBzdHJpbmcgPSBtaW51dGVzIDwgMTAgPyAnMCcgKyBtaW51dGVzIDogbWludXRlcy50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgLy8gRm9ybWF0IHRoZSB0aW1lIGFzIGhoLm1tXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFRpbWU6IHN0cmluZyA9IGAke2Zvcm1hdHRlZEhvdXJzfToke2Zvcm1hdHRlZE1pbnV0ZXN9YDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZWRUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgIH1cclxufSJdfQ==