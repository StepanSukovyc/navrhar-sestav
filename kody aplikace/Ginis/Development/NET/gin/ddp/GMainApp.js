"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.MainApp.ts                             </Name>
//    <Description> Startovni content modulu DDP                                </Description>
//    <Author>      Pavel Polák                                                 </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2017                            </Copyright>
//    <Created>     2017-04-18                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            let GMainApp = class GMainApp extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    //    Async.GTaskManager.init({ delay: 1000 });
                    WebClient.Common.GridFormats.ClearCache();
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.BlogProvider()); //zapojení blogů
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.ArticleProvider()); //zapojení článků (uživatelsky editovatelný text)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.IslProvider()); //zapojení jakékoli dostupné ISL metody vracející seznam dat (je možné nastavit i volání detailu při kliknutí na položku)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RssProvider()); //zapojení RSS zpráv (včetně stránkování, vyhledávání a filtrování podle kategorií)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RestProvider()); //zapojení externích REST služeb
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.FileProvider()); //zapojení načítání dat ze souboru typu JSON, který je vložen do složky Data v adresáři aplikace
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.XrgServiceProvider()); //zapojení načítání dat ze XRG služby uvedené ve web.config spolu s nastavenými přístupovými údaji
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.DataReportProvider()); //zapojení sestav
                    Gordic.Wfl.WebClient.GHFKAsyncUtils(this, new Gordic.Data.GridFormat()); //správně by měl být předám GridFormát jako prvotně předávaný do průvodce
                    //Gordic.Dashboard.CustomProviders.register(Dashboard.createProviderPoctyPohybuKUctovani(content))
                    //Gordic.Dashboard.CustomProviders.register(new Gordic.Dashboard.CustomProvider("Cesty a návštěvy", "cesty", () => {
                    //    return this.isl.RcnSouhrn.poctyPozadavku({ cesty: true, prikazy: false })
                    //        .getData()
                    //        .then(function (data) {
                    //            return $("<div>").gbasepanel(Gordic.Prefabs.Panels.kpiMultiRowsTemplate(), {
                    //                id: "poctyCesty",
                    //                mode: "vertical",
                    //                itemTemplate: Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate().itemTemplate,
                    //                selection: function (ev, ctx) {
                    //                },
                    //                //defaultAction: new GAction({
                    //                //    name: "actBezFinClickEnter",
                    //                //    run: function (ev, ctx) {
                    //                //        that.nactiSeznamBezFin(ctx.item.data.id, l_parametry.paramSulPri!);
                    //                //    }
                    //                //}),
                    //                defaultSelected: false,
                    //                data: new Gordic.Data.View([
                    //                    {
                    //                        id: "realizovaneCesty",
                    //                        title: "",
                    //                        detailsDirection: "vertical",
                    //                        details: [
                    //                            {
                    //                                value: data.cestyPredRealizaci,
                    //                                description: "Před realizací",
                    //                                meaning: "positive", //negative, info
                    //                                formatter: "G"
                    //                            },
                    //                            {
                    //                                value: data.cestyRealizovano,
                    //                                description: "Realizováno",
                    //                                meaning: "positive",
                    //                                formatter: "G"
                    //                            },
                    //                            {
                    //                                value: data.cestyVeVyuctovani,
                    //                                description: "Ve vyúčtování",
                    //                                meaning: "positive",
                    //                                formatter: "G"
                    //                            },
                    //                            {
                    //                                value: data.cestyVyuctovano,
                    //                                description: "Vyúčtováno",
                    //                                meaning: "positive",
                    //                                formatter: "G"
                    //                            },
                    //                            {
                    //                                value: data.cestyUhrazeno,
                    //                                description: "Uhrazeno",
                    //                                meaning: "positive",
                    //                                formatter: "G"
                    //                            },
                    //                            {
                    //                                value: data.cestyZlikvodovano,
                    //                                description: "Zlikvidováno",
                    //                                meaning: "positive",
                    //                                formatter: "G"
                    //                            },
                    //                            {
                    //                                value: data.cestyZrusene,
                    //                                description: "Zrušeno",
                    //                                meaning: "positive",
                    //                                formatter: "G"
                    //                            }
                    //                        ]
                    //                    }
                    //                ] as any)
                    //            })
                    //        })
                    //}));
                    //#region Definice async funkcí
                    //#region Hromadné vymáhání
                    var asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpHromadneVymahaniAsyncTask";
                    // registrace událostí
                    Gordic.Async.GTaskManager
                        .on("change", asyncClassName, that.TaskChange)
                        .on("done", asyncClassName, function () { that.TaskDone(this, that, "actVysledekVymahani"); })
                        .on("fail", asyncClassName, function () { that.TaskFail(this); })
                        .on("always", asyncClassName, function () { that.TaskAlways(this); });
                    //#endregion
                    //#region Definice akcí
                    this.actions.addRange({
                        actGPripadySeznamGridVychoziAkce: {
                            name: "actGPripadySeznamGridVychoziAkce",
                            run: (ev, ctx) => {
                                const row = ctx.cellInfo.data;
                                //? je tady nutný mít typ_phl na vstupu pro otevření detailu případu ?
                                WebClient.Common.Pripady.openPripadDetail(this, row.ixp);
                                //this.navigate(
                                //    "Gordic.Ddp.WebClient.GPripadDetail",
                                //    {
                                //        ID: "DDPGPripadDetail#",
                                //        Ixp: row.ixp,
                                //        TypPhl: row.typ_phl,
                                //    }
                                //);
                            }
                        },
                        actGDetailVymahani: {
                            name: "actGDetailVymahani",
                            run: (ev, ctx) => {
                                const row = ctx.cellInfo.data;
                                if (row.ixp_nvy != null) {
                                    this.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                        ixpNvy: row.ixp_nvy
                                    });
                                }
                            }
                        },
                        actVysledekVymahani: {
                            name: "actVysledekVymahat",
                            caption: "Výsledek vymáhání",
                            tooltip: "Zobrazí výsledek hromadného vymáhání",
                            run: (data) => {
                                var gridForm = new Gordic.Forms.Form({ name: "tabulkaVysledku", layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0" })
                                    .addRow()
                                    .addField("ggrid", {
                                    rowHeight: 30,
                                    columns: Gordic.Ddp.WebClient.Common.GridFormats.VysledekVymahani(),
                                    data: that.vysledekAsync,
                                    showTopPanel: true,
                                    showBottomPanel: true,
                                    defaultAction: that.actions["actGDetailVymahani"]
                                });
                                // otevření tabulky výsledku vymáhání
                                that.dialogs.simpleForm("Výsledek vymáhání na případech", gridForm);
                            }
                        },
                        actVysledekPripadu: {
                            name: "actVysledekPripadu",
                            caption: "Výsledek případu",
                            tooltip: "Zobrazí výsledek hromadného akce na případu",
                            run: (data) => {
                                var gridForm = new Gordic.Forms.Form({ name: "tabulkaVysledku", layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0" })
                                    //.appendTo(this.element).gform("createFrom", new Forms.Form({ name: "ddpNastaveniUkonu", layoutDescriptor: "L1M1S1" })
                                    .addRow()
                                    .addField("ggrid", {
                                    rowHeight: 30,
                                    columns: Gordic.Ddp.WebClient.Common.GridFormats.HrmAkceSimple(),
                                    data: that.vysledekAsync,
                                    showTopPanel: true,
                                    showBottomPanel: true,
                                    defaultAction: that.actions["actGPripadySeznamGridVychoziAkce"]
                                });
                                // otevření tabulky výsledku vymáhání
                                that.dialogs.simpleForm("Výsledek hromadné akce", gridForm);
                            }
                        },
                        actVysledekNastaveniPrizTisk: {
                            name: "actVysledekNastaveniPrizTisk",
                            caption: "Výsledek nastavení příznaku tisku",
                            tooltip: "Zobrazí výsledek nastavení příznaku tisku",
                            run: (data) => {
                                var gridForm = new Gordic.Forms.Form({ name: "tabulkaVysledku", layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0" })
                                    //.appendTo(this.element).gform("createFrom", new Forms.Form({ name: "ddpNastaveniUkonu", layoutDescriptor: "L1M1S1" })
                                    .addRow()
                                    .addField("ggrid", {
                                    rowHeight: 30,
                                    columns: Gordic.Ddp.WebClient.Common.GridFormats.VysledekNastaveniPrizTisk(),
                                    data: that.vysledekAsync,
                                    showTopPanel: true,
                                    showBottomPanel: true,
                                    defaultAction: that.actions["actGDetailVymahani"]
                                });
                                // otevření tabulky výsledku
                                that.dialogs.simpleForm("Výsledek nastavení na případech", gridForm);
                            }
                        },
                        actVysledekNastaveniPrizOdesl: {
                            name: "actVysledekNastaveniPrizOdesl",
                            caption: "Výsledek nastavení příznaku odeslání",
                            tooltip: "Zobrazí výsledek nastavení příznaku odeslání",
                            run: (data) => {
                                var gridForm = new Gordic.Forms.Form({ name: "tabulkaVysledku", layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0" })
                                    //.appendTo(this.element).gform("createFrom", new Forms.Form({ name: "ddpNastaveniUkonu", layoutDescriptor: "L1M1S1" })
                                    .addRow()
                                    .addField("ggrid", {
                                    rowHeight: 30,
                                    columns: Gordic.Ddp.WebClient.Common.GridFormats.VysledekNastaveniPrizOdesl(),
                                    data: that.vysledekAsync,
                                    showTopPanel: true,
                                    showBottomPanel: true,
                                    defaultAction: that.actions["actGDetailVymahani"]
                                });
                                // otevření tabulky výsledku vymáhání
                                that.dialogs.simpleForm("Výsledek nastavení případů vymáhání", gridForm);
                            }
                        },
                        actVysledekObnoveniVym: {
                            name: "actVysledekObnoveniVym",
                            caption: "Výsledek obnovení vymáhání",
                            tooltip: "Zobrazí výsledek obnovení případů vymáhání",
                            run: (data) => {
                                var gridForm = new Gordic.Forms.Form({ name: "tabulkaVysledku", layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0" });
                                //if ()
                                gridForm.addRow()
                                    .addField("ggrid", {
                                    rowHeight: 30,
                                    columns: Gordic.Ddp.WebClient.Common.GridFormats.VysledekObnoveniVym(),
                                    data: that.vysledekAsync,
                                    showTopPanel: true,
                                    showBottomPanel: true,
                                    defaultAction: that.actions["actGDetailVymahani"]
                                });
                                // otevření tabulky výsledku obnovení
                                that.dialogs.simpleForm("Výsledek obnovení na případech", gridForm);
                            }
                        },
                        actVysledekRedist: {
                            name: "actVysledekRedist",
                            caption: "Výsledek redistribuce",
                            tooltip: "Zobrazí výsledek hromadné redistribuce",
                            run: (data) => {
                                var gridForm = new Gordic.Forms.Form({ name: "tabulkaVysledku", layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0" })
                                    //.appendTo(this.element).gform("createFrom", new Forms.Form({ name: "ddpNastaveniUkonu", layoutDescriptor: "L1M1S1" })
                                    .addRow()
                                    .addField("ggrid", {
                                    rowHeight: 30,
                                    columns: Gordic.Ddp.WebClient.Common.GridFormats.Prevzeti(),
                                    data: that.vysledekAsync,
                                    showTopPanel: true,
                                    showBottomPanel: true
                                });
                                that.dialogs.simpleForm("Výsledek redistribuce", gridForm);
                            }
                        },
                        actVysledekHromAkceVym: {
                            name: "actVysledekHromAkceVym",
                            caption: "Výsledek hromadné akce na seznamu vymáhání",
                            tooltip: "Zobrazí výsledek hromadné akce na seznamu vymáhání",
                            run: (data) => {
                                var gridForm = new Gordic.Forms.Form({ name: "tabulkaVysledku", layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0" })
                                    //.appendTo(this.element).gform("createFrom", new Forms.Form({ name: "ddpNastaveniUkonu", layoutDescriptor: "L1M1S1" })
                                    .addRow()
                                    .addField("ggrid", {
                                    rowHeight: 30,
                                    columns: Gordic.Ddp.WebClient.Common.GridFormats.HromAkceVym(),
                                    data: that.vysledekAsync,
                                    showTopPanel: true,
                                    showBottomPanel: true,
                                    defaultAction: that.actions["actGDetailVymahani"]
                                });
                                that.dialogs.simpleForm("Výsledek hromadné akce", gridForm);
                            }
                        },
                        actVysledekHromAkceROB: {
                            name: "actVysledekHromAkceROB",
                            caption: "Výsledek hromadné akce (ROB)",
                            tooltip: "Zobrazí výsledek hromadné akce (ROB)",
                            run: (data) => {
                                var gridFormat;
                                var defaultAction;
                                // 0 - Podání, 1 - Basic 
                                if (that.priznakROB == 0) {
                                    defaultAction = that.actions["actGPripadySeznamGridVychoziAkce"];
                                    gridFormat = Gordic.Ddp.WebClient.Common.GridFormats.HromAkceROBPodani();
                                }
                                else {
                                    defaultAction = null;
                                    gridFormat = Gordic.Ddp.WebClient.Common.GridFormats.HromAkceROB();
                                }
                                var gridForm = new Gordic.Forms.Form({ name: "tabulkaVysledku", layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0" })
                                    .addRow()
                                    .addField("ggrid", {
                                    rowHeight: 30,
                                    columns: gridFormat,
                                    data: that.vysledekAsync,
                                    showTopPanel: true,
                                    showBottomPanel: true,
                                    defaultAction: defaultAction
                                });
                                that.dialogs.simpleForm("Výsledek hromadné akce", gridForm);
                            }
                        },
                        actVysledekHromSpr: {
                            name: "actVysledekHromSpr",
                            caption: "Výsledek hromadného správcování",
                            tooltip: "Zobrazí výsledek hromadného správcování na vybraných případech",
                            run: (data) => {
                                var gridForm = new Gordic.Forms.Form({ name: "tabulkaVysledku", layoutDescriptor: "L1M1S1 L-0-12-0 M-0-12-0 S-0-12-0" })
                                    //.appendTo(this.element).gform("createFrom", new Forms.Form({ name: "ddpNastaveniUkonu", layoutDescriptor: "L1M1S1" })
                                    .addRow()
                                    .addField("ggrid", {
                                    rowHeight: 30,
                                    columns: Gordic.Ddp.WebClient.Common.GridFormats.HrmAkceSimpleAsync(),
                                    data: that.vysledekAsync,
                                    showTopPanel: true,
                                    showBottomPanel: true,
                                    defaultAction: that.actions["actGPripadySeznamGridVychoziAkce"]
                                });
                                // otevření tabulky výsledku vymáhání
                                that.dialogs.simpleForm("Výsledek hromadného správcování", gridForm);
                            }
                        },
                    });
                    //#endregion
                    //#region Hromadné akce na případech DDP
                    // Registrace asynchronní funkce pro hromadné akce na seznamu případů
                    asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpHromadneAkcePripaduAsyncTask";
                    // Registrace událostí
                    Gordic.Async.GTaskManager
                        .on("change", asyncClassName, function () { that.TaskChange(this); })
                        .on("done", asyncClassName, function () { that.TaskDone(this, that, "actVysledekPripadu"); })
                        .on("fail", asyncClassName, that.TaskFail)
                        .on("always", asyncClassName, function () { that.TaskAlways(this); });
                    //#endregion
                    //#region Nastavení příznaku tisku a odeslání
                    // Registrace asynchronní funkce pro nastavení příznaku tisku na vymáhání
                    asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpNastaveniPriznakuTiskuAsyncTask";
                    // Registrace událostí
                    Gordic.Async.GTaskManager
                        .on("change", asyncClassName, that.TaskChangePrizTisk)
                        .on("done", asyncClassName, function () { that.TaskDonePrizTisk(this, that); })
                        .on("fail", asyncClassName, that.TaskFailPrizTisk)
                        .on("always", asyncClassName, function () { that.TaskAlways(this); });
                    // Registrace asynchronní funkce pro nastavení příznaku odeslání na vymáhání
                    asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpNastaveniPriznakuOdeslaniAsyncTask";
                    // Registrace událostí
                    Gordic.Async.GTaskManager
                        .on("change", asyncClassName, that.TaskChangePrizOdesl)
                        .on("done", asyncClassName, function () { that.TaskDonePrizOdesl(this, that); })
                        .on("fail", asyncClassName, that.TaskFailPrizOdesl)
                        .on("always", asyncClassName, function () { that.TaskAlways(this); });
                    //#endregion
                    //#region Obnovení případů vymáhání
                    // Registrace asynchronní funkce pro obnovení případu vymáhání
                    asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpObnoveniVymAsyncTask";
                    // Registrace událostí
                    Gordic.Async.GTaskManager
                        .on("change", asyncClassName, function () { that.TaskChange(this); })
                        .on("done", asyncClassName, function () { that.TaskDone(this, that, "actVysledekObnoveniVym"); })
                        .on("fail", asyncClassName, that.TaskFail)
                        .on("always", asyncClassName, function () { that.TaskAlways(this); });
                    //#endregion
                    //#region Hromadně odeslat do výpravny
                    const mainContent = this;
                    Gordic.Async.GTaskManager
                        .on("init", "Gordic.Eko.Server.GOdeslatMultipleReportsAsyncTask", function (ctx) {
                        const not = new GObservableObject({
                            title: "Hromadně odeslat do výpravny",
                            icon: "fa-print",
                            content: "Generování el. obrazů pro následné odeslání do výpravny bylo zahájeno",
                        });
                        mainContent.notification("add", not);
                        this.setNotification(not);
                    })
                        .on("change", "Gordic.Eko.Server.GOdeslatMultipleReportsAsyncTask", function (ctx) {
                        //mozno nejak reagovat na progress
                    })
                        .on("inactive", "Gordic.Eko.Server.GOdeslatMultipleReportsAsyncTask", function (ctx) {
                        //mozno nejak reagovat na stav, kdy je uloha neaktivni (nikde jiz nebezi)
                    })
                        .on("done", "Gordic.Eko.Server.GOdeslatMultipleReportsAsyncTask", function (ctx) {
                        const not = this.getNotification();
                        if (not) {
                            const showResultAct = new GAction({
                                name: "showResultAct",
                                caption: "Odeslat", //RC 33600610 : Odeslat
                                icon: "gi-send",
                                //run: () => {
                                //    return Wfl.Dialogs.GOdeslaniDlg(mainContent, {
                                //        Hromadne: true
                                //    }).then(() => {
                                //        this.clean(); //Odstranime serverove prostredky async. ulohy
                                //        mainContent.notification("remove", not); //Odstranime notifikaci
                                //        that.navigate('Gordic.Ddp.WebClient.GVymahani', { ID: 'DDPGPrehledVymahani#', KontrolaDdpInitu: true })
                                //        //that.navigate("Gordic.Ddp.WebClient.GVymahani")
                                //    })
                                //}
                                run: async () => {
                                    await Gordic.Wfl.Dialogs.GOdeslaniDlg(mainContent, {
                                        Hromadne: true
                                    });
                                    this.clean(); //Odstranime serverove prostredky async. ulohy
                                    mainContent.notification("remove", not); //Odstranime notifikaci
                                    that.navigate('Gordic.Ddp.WebClient.GVymahani', { ID: 'DDPGPrehledVymahani#', KontrolaDdpInitu: true });
                                }
                            });
                            not.update({
                                content: "El. obrazy byly úspěšně vygenerovány a je možné je odeslat do výpravny",
                                state: "success",
                                defaultAction: showResultAct,
                                commandBar: [{ action: showResultAct }]
                            });
                        }
                    });
                    //#endregion
                    //#region Redistribuce
                    // Registrace asynchronní funkce pro redistribuci případů
                    asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpRedistribuceAsyncTask";
                    // Registrace událostí
                    Gordic.Async.GTaskManager
                        .on("change", asyncClassName, function () { that.TaskChange(this); })
                        .on("done", asyncClassName, function () { that.TaskDone(this, that, "actVysledekRedist"); })
                        .on("fail", asyncClassName, that.TaskFail)
                        .on("always", asyncClassName, function () { that.TaskAlways(this); });
                    //#endregion
                    //#region Hromadné akce na seznamu vymáhání
                    // Registrace asynchronní funkce pro hromadné akce na seznamu vymáhání
                    asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpHromadneAkceVymAsyncTask";
                    // Registrace událostí
                    Gordic.Async.GTaskManager
                        .on("change", asyncClassName, function () { that.TaskChange(this); })
                        .on("done", asyncClassName, function () { that.TaskDone(this, that, "actVysledekHromAkceVym"); })
                        .on("fail", asyncClassName, function () { that.TaskFail(this); })
                        .on("always", asyncClassName, function () { that.TaskAlways(this); });
                    //#endregion
                    //#region Hromadné akce na ROB
                    // Registrace asynchronní funkce pro hromadné akce na ROB
                    asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpHromAkceROBAsyncTask";
                    // Registrace událostí
                    Gordic.Async.GTaskManager
                        .on("change", asyncClassName, function () { that.TaskChange(this); })
                        .on("done", asyncClassName, function () { that.TaskDone(this, that, "actVysledekHromAkceROB"); })
                        .on("fail", asyncClassName, function () { that.TaskFail(this); })
                        .on("always", asyncClassName, function () { that.TaskAlways(this); });
                    //#endregion
                    //#region Hromadné správcování
                    // Registrace asynchronní funkce pro hromadné správcování pohledávek
                    asyncClassName = "Gordic.Ddp.Server.LK.Async.GDdpHromSprAsyncTask";
                    // Registrace událostí
                    Gordic.Async.GTaskManager
                        .on("change", asyncClassName, function () { that.TaskChange(this); })
                        .on("done", asyncClassName, function () { that.TaskDone(this, that, "actVysledekHromSpr"); })
                        .on("fail", asyncClassName, function () { that.TaskFail(this); })
                        .on("always", asyncClassName, function () { that.TaskAlways(this); });
                    //#endregion
                    //#endregion
                }
                //#region Async Tasky - Change/Done/Fail/Always
                TaskChange(task) {
                    var cnt = $.content();
                    // Defaultní hodnoty pro notifikaci
                    var id = "asyncTask";
                    var title = "Asynchronní úloha";
                    var text = "Probíhá asynchronní úloha";
                    var nazevAkce = task.customDto.nazevAkce;
                    var texty = WebClient.Common.Base.textyAkci(nazevAkce);
                    if (texty != undefined) {
                        id = texty.id;
                        title = texty.title;
                        text = texty.content;
                    }
                    var progress = task.progress;
                    var notif = cnt.notification("findById", id);
                    if (notif == null) {
                        cnt.notification("add", // pošlu notifikaci
                        {
                            id: id,
                            title: title ?? "Asynchronní akce",
                            content: text ?? "Probíhá asynchronní akce",
                            icon: "fa-arrow-right  g-state-text g-state-info",
                            dateTime: new Date(),
                        } /*, true*/);
                        notif = cnt.notification("findById", id);
                    }
                    notif?.update({ progress: progress });
                }
                TaskDone(task, mainContent, akce) {
                    let cnt = $.content();
                    // Defaultní hodnoty pro notifikaci
                    var id = "vysledekAsyncTask";
                    var title = "Asynchronní úloha";
                    var text = "Dokončena asynchronní úloha";
                    var nazevAkce = task.customDto.nazevAkce;
                    var texty = WebClient.Common.Base.textyAkci("Vysledek" + nazevAkce);
                    if (texty != undefined) {
                        id = texty.id;
                        title = texty.title;
                        text = texty.content;
                    }
                    switch (true) {
                        case task.result.pripady !== undefined:
                            mainContent.vysledekAsync = task.result.pripady;
                            break;
                        case task.result.pripadyVym !== undefined:
                            mainContent.vysledekAsync = task.result.pripadyVym;
                            break;
                        case task.result.pripadyVymDetail !== undefined:
                            mainContent.vysledekAsync = task.result.pripadyVymDetail;
                            break;
                        case task.result.pripadyPredani !== undefined:
                            mainContent.vysledekAsync = task.result.pripadyPredani;
                            break;
                        case task.result.pripadyPrevzeti !== undefined:
                            mainContent.vysledekAsync = task.result.pripadyPrevzeti;
                            break;
                        case task.result.pripadyROB !== undefined:
                            mainContent.vysledekAsync = task.result.pripadyROB;
                            if (nazevAkce == "HromPodSab" || nazevAkce == "HromPrir")
                                this.priznakROB = 0;
                            else
                                this.priznakROB = 1;
                            // Reset příznaku kontrolniChodProbehl v GROBSeznam
                            mainContent.resetGROBSeznamKontrolniChod();
                            break;
                    }
                    // odstraním notifikaci, která byla vytvořena při spuštění asynchronní akce
                    cnt.notification("remove", this.removeVysledekId(id));
                    var notif = cnt.notification("findById", id);
                    // z nějakého důvodu projde TaskDone a TaskAlways vícekrát (po druhém spuštění běží tato akce 2) pokud se pustí async akce vícekrát (po dokončení se spustí opět)
                    if (notif == null) {
                        cnt.notification("add", {
                            id: id,
                            state: "success",
                            title: title,
                            content: text,
                            icon: "fa-check-circle g-state-text g-state-success",
                            dateTime: new Date(),
                            defaultAction: mainContent.actions[akce]
                        }, true);
                    }
                }
                TaskFail(task) {
                    let cnt = $.content();
                    var id = "asyncTask";
                    var nazevAkce = task.customDto.nazevAkce;
                    var texty = WebClient.Common.Base.textyAkci(nazevAkce);
                    if (texty != undefined) {
                        id = texty.id;
                    }
                    // odstraním notifikaci, která byla vytvořena při spuštění asynchronní akce
                    cnt.notification("remove", id);
                    GDlg.showException(task.ExceptionInfo);
                    let title = "Asynchronní akce neuspěla";
                    let text = "Chyba:" + task.ExceptionInfo.baseMessage;
                    cnt.notification("add", { state: "error", title: title, content: text, icon: "fa-times-circle  g-state-text g-state-error", dateTime: new Date() }, true);
                    if (task.className == "Gordic.Ddp.Server.LK.Async.GDdpHromAkceROBAsyncTask") {
                        this.resetGROBSeznamKontrolniChod();
                    }
                }
                TaskAlways(task) {
                    task.clean();
                }
                // Vymáhání
                TaskChangeVym(task) {
                    var cnt = $.content();
                    var progress = task.progress;
                    var notif = cnt.notification("findById", "vymahaniTask");
                    if (notif == null) {
                        cnt.notification("add", // pošlu notifikaci
                        {
                            id: "vymahaniTask",
                            title: "Vymáhání případů ",
                            content: "Probíhá vymáhání případů",
                            icon: "fa-arrow-right  g-state-text g-state-info",
                            dateTime: new Date(),
                        } /*, true*/);
                        notif = cnt.notification("findById", "vymahaniTask");
                    }
                    notif?.update({ progress: progress });
                }
                TaskDoneVym(task, mainContent) {
                    let cnt = $.content(); // content je potřeba získat takto //$.content($(".gcontent").last());
                    let text = "Skončilo vymáhání";
                    let title = "Dokončeno vymáhání";
                    mainContent.vysledekAsync = task.result.pripady;
                    cnt.notification("remove", "vymahaniTask");
                    var notif = cnt.notification("findById", "vysledekVymahaniTask");
                    // z nějakého důvodu projde TaskDoneVym a TaskAlwaysVym vícekrát pokud se pustí async akce vícekrát (po dokončení se spustí opět)
                    if (notif == null) {
                        cnt.notification("add", {
                            id: "vysledekVymahaniTask",
                            title: title,
                            content: text,
                            icon: "fa-check-circle g-state-text g-state-success",
                            dateTime: new Date(),
                            defaultAction: mainContent.actions["actVysledekVymahani"]
                        }, true);
                    }
                }
                TaskFailVym(_o, exc) {
                    let Content = $.content();
                    GDlg.showException(exc.exception);
                    let title = "Vymáhání neuspělo";
                    let text = "Chyba:" + exc.exception.baseMessage;
                    Content.notification("add", { title: title, content: text, icon: "fa-times-circle  g-state-text g-state-error", dateTime: new Date() }, true);
                }
                // Nastavení příznaku tisku
                TaskChangePrizTisk(task) {
                    var cnt = $.content();
                    var progress = task.progress;
                    var notif = cnt.notification("findById", "nastaveniPrizTiskTask");
                    if (notif == null) {
                        cnt.notification("add", // pošlu notifikaci
                        {
                            id: "nastaveniPrizTiskTask",
                            title: "Nastavení příznaku",
                            content: "Probíhá nastavení příznaku tisku",
                            icon: "fa-arrow-right  g-state-text g-state-info",
                            dateTime: new Date(),
                        } /*, true*/);
                        notif = cnt.notification("findById", "nastaveniPrizTiskTask");
                    }
                    notif?.update({ progress: progress });
                }
                TaskDonePrizTisk(task, mainContent) {
                    let cnt = $.content(); // content je potřeba získat takto //$.content($(".gcontent").last());
                    let text = "Skončilo nastavení příznaku tisku";
                    let title = "Dokončeno nastavení";
                    mainContent.vysledekAsync = task.result.pripadyVym;
                    cnt.notification("remove", "nastaveniPrizTiskTask");
                    var notif = cnt.notification("findById", "vysledekNastaveniPrizTiskTask");
                    // z nějakého důvodu projde vícekrát pokud se pustí async akce vícekrát (tj. po dokončení se spustí opět)
                    if (notif == null) {
                        cnt.notification("add", {
                            id: "vysledekNastaveniPrizTiskTask",
                            title: title,
                            content: text,
                            icon: "fa-check-circle g-state-text g-state-success",
                            dateTime: new Date(),
                            defaultAction: mainContent.actions["actVysledekNastaveniPrizTisk"]
                        }, true);
                    }
                }
                TaskFailPrizTisk(_o, exc) {
                    let Content = $.content();
                    GDlg.showException(exc.exception);
                    let title = "Nastavení příznaku tisku neuspělo";
                    let text = "Chyba:" + exc.exception.baseMessage;
                    Content.notification("add", { title: title, content: text, icon: "fa-times-circle  g-state-text g-state-error", dateTime: new Date() }, true);
                }
                // Nastavení příznaku odeslání
                TaskChangePrizOdesl(task) {
                    var cnt = $.content();
                    var progress = task.progress;
                    var notif = cnt.notification("findById", "nastaveniPrizOdeslTask");
                    if (notif == null) {
                        cnt.notification("add", // pošlu notifikaci
                        {
                            id: "nastaveniPrizOdeslTask",
                            title: "Nastavení příznaku",
                            content: "Probíhá nastavení příznaku odeslání",
                            icon: "fa-arrow-right  g-state-text g-state-info",
                            dateTime: new Date(),
                        } /*, true*/);
                        notif = cnt.notification("findById", "nastaveniPrizOdeslTask");
                    }
                    notif?.update({ progress: progress });
                }
                TaskDonePrizOdesl(task, mainContent) {
                    let cnt = $.content(); // content je potřeba získat takto //$.content($(".gcontent").last());
                    let text = "Skončilo nastavení příznaku odeslání";
                    let title = "Dokončeno nastavení";
                    mainContent.vysledekAsync = task.result.pripadyVym;
                    cnt.notification("remove", "nastaveniPrizOdeslTask");
                    var notif = cnt.notification("findById", "vysledekNastaveniPrizOdeslTask");
                    // z nějakého důvodu projde vícekrát pokud se pustí async akce vícekrát (tj. po dokončení se spustí opět)
                    if (notif == null) {
                        cnt.notification("add", {
                            id: "vysledekNastaveniPrizOdeslTask",
                            title: title,
                            content: text,
                            icon: "fa-check-circle g-state-text g-state-success",
                            dateTime: new Date(),
                            defaultAction: mainContent.actions["actVysledekNastaveniPrizOdesl"]
                        }, true);
                    }
                }
                TaskFailPrizOdesl(_o, exc) {
                    let Content = $.content();
                    GDlg.showException(exc.exception);
                    let title = "Nastavení příznaku odeslání neuspělo";
                    let text = "Chyba:" + exc.exception.baseMessage;
                    Content.notification("add", { title: title, content: text, icon: "fa-times-circle  g-state-text g-state-error", dateTime: new Date() }, true);
                }
                //#endregion
                /**
                * Změní 'vysledekID' na 'ID'
                * @param id
                * @returns
                */
                removeVysledekId(id) {
                    //vysledekVysledekNastaveniStavuTiskuAOdeslaniTask
                    //nastaveniStavuTiskuAOdeslaniTask
                    if (!id)
                        return "";
                    if (id.startsWith("vysledek")) {
                        const rest = id.slice("vysledek".length);
                        if (rest.length === 0)
                            return "";
                        const first = rest.charAt(0).toLowerCase();
                        return first + rest.slice(1);
                    }
                    return id;
                }
                /**
                * Resets the kontrolniChodProbehl flag in all GROBSeznam instances
                */
                resetGROBSeznamKontrolniChod() {
                    // Získání ROBSeznamu přez window/global registry 
                    try {
                        if (window.GROBSeznamInstances) {
                            const instances = window.GROBSeznamInstances;
                            instances.forEach(instance => {
                                if (instance && typeof instance.setKontrolniChodProbehl === 'function') {
                                    instance.setKontrolniChodProbehl(false);
                                }
                            });
                        }
                    }
                    catch (e) {
                        console.warn("Could not reset GROBSeznam instances via global registry:", e);
                    }
                }
            };
            GMainApp = __decorate([
                Decorators.gcontent
            ], GMainApp);
            WebClient.GMainApp = GMainApp;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR01haW5BcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTWFpbkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQTB6QmY7QUExekJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTB6Qm5CO0lBMXpCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMHpCN0I7UUExekJvQixXQUFBLFNBQVM7WUFFMUIsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFhdEMsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLCtDQUErQztvQkFDL0MsVUFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVoQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7b0JBQzFGLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLGlEQUFpRDtvQkFDOUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMseUhBQXlIO29CQUNsTSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxtRkFBbUY7b0JBQzVKLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdDQUFnQztvQkFDMUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0dBQWdHO29CQUMxSyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLGtHQUFrRztvQkFDbEwsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7b0JBRWpHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxPQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMseUVBQXlFO29CQUUzSSxrR0FBa0c7b0JBQ2xHLG9IQUFvSDtvQkFDcEgsK0VBQStFO29CQUMvRSxvQkFBb0I7b0JBQ3BCLGlDQUFpQztvQkFDakMsMEZBQTBGO29CQUMxRixtQ0FBbUM7b0JBQ25DLG1DQUFtQztvQkFDbkMsZ0dBQWdHO29CQUNoRyxpREFBaUQ7b0JBRWpELG9CQUFvQjtvQkFDcEIsZ0RBQWdEO29CQUNoRCxvREFBb0Q7b0JBQ3BELGlEQUFpRDtvQkFDakQsK0ZBQStGO29CQUMvRix5QkFBeUI7b0JBQ3pCLHVCQUF1QjtvQkFDdkIseUNBQXlDO29CQUN6Qyw4Q0FBOEM7b0JBQzlDLHVCQUF1QjtvQkFDdkIsaURBQWlEO29CQUNqRCxvQ0FBb0M7b0JBQ3BDLHVEQUF1RDtvQkFDdkQsb0NBQW9DO29CQUNwQywrQkFBK0I7b0JBQy9CLGlFQUFpRTtvQkFDakUsZ0VBQWdFO29CQUNoRSx1RUFBdUU7b0JBQ3ZFLGdEQUFnRDtvQkFDaEQsZ0NBQWdDO29CQUNoQywrQkFBK0I7b0JBQy9CLCtEQUErRDtvQkFDL0QsNkRBQTZEO29CQUM3RCxzREFBc0Q7b0JBQ3RELGdEQUFnRDtvQkFDaEQsZ0NBQWdDO29CQUNoQywrQkFBK0I7b0JBQy9CLGdFQUFnRTtvQkFDaEUsK0RBQStEO29CQUMvRCxzREFBc0Q7b0JBQ3RELGdEQUFnRDtvQkFDaEQsZ0NBQWdDO29CQUNoQywrQkFBK0I7b0JBQy9CLDhEQUE4RDtvQkFDOUQsNERBQTREO29CQUM1RCxzREFBc0Q7b0JBQ3RELGdEQUFnRDtvQkFDaEQsZ0NBQWdDO29CQUNoQywrQkFBK0I7b0JBQy9CLDREQUE0RDtvQkFDNUQsMERBQTBEO29CQUMxRCxzREFBc0Q7b0JBQ3RELGdEQUFnRDtvQkFDaEQsZ0NBQWdDO29CQUNoQywrQkFBK0I7b0JBQy9CLGdFQUFnRTtvQkFDaEUsOERBQThEO29CQUM5RCxzREFBc0Q7b0JBQ3RELGdEQUFnRDtvQkFDaEQsZ0NBQWdDO29CQUNoQywrQkFBK0I7b0JBQy9CLDJEQUEyRDtvQkFDM0QseURBQXlEO29CQUN6RCxzREFBc0Q7b0JBQ3RELGdEQUFnRDtvQkFDaEQsK0JBQStCO29CQUMvQiwyQkFBMkI7b0JBQzNCLHVCQUF1QjtvQkFDdkIsMkJBQTJCO29CQUMzQixnQkFBZ0I7b0JBRWhCLFlBQVk7b0JBQ1osTUFBTTtvQkFFTiwrQkFBK0I7b0JBRS9CLDJCQUEyQjtvQkFDM0IsSUFBSSxjQUFjLEdBQUcsMERBQTBELENBQUM7b0JBRWhGLHNCQUFzQjtvQkFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZO3lCQUNwQixFQUFFLENBQXdFLFFBQVEsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQzt5QkFDcEgsRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDNUYsRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO3lCQUMvRCxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFekUsWUFBWTtvQkFFWix1QkFBdUI7b0JBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNsQixnQ0FBZ0MsRUFBRTs0QkFDOUIsSUFBSSxFQUFFLGtDQUFrQzs0QkFDeEMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLE1BQU0sR0FBRyxHQUNMLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dDQUN0QixzRUFBc0U7Z0NBQ3RFLFVBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUMvQyxnQkFBZ0I7Z0NBQ2hCLDJDQUEyQztnQ0FDM0MsT0FBTztnQ0FDUCxrQ0FBa0M7Z0NBQ2xDLHVCQUF1QjtnQ0FDdkIsOEJBQThCO2dDQUM5QixPQUFPO2dDQUNQLElBQUk7NEJBQ1IsQ0FBQzt5QkFDSjt3QkFDRCxrQkFBa0IsRUFBRTs0QkFDaEIsSUFBSSxFQUFFLG9CQUFvQjs0QkFDMUIsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLE1BQU0sR0FBRyxHQUNMLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dDQUV0QixJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7b0NBQ3RCLElBQUksQ0FBQyxRQUFRLENBQ1Qsc0NBQXNDLEVBQ3RDO3dDQUNJLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTztxQ0FDdEIsQ0FDSixDQUFDO2dDQUNOLENBQUM7NEJBQ0wsQ0FBQzt5QkFDSjt3QkFDRCxtQkFBbUIsRUFBRTs0QkFDakIsSUFBSSxFQUFFLG9CQUFvQjs0QkFDMUIsT0FBTyxFQUFFLG1CQUFtQjs0QkFDNUIsT0FBTyxFQUFFLHNDQUFzQzs0QkFDL0MsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0NBQ1YsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxtQ0FBbUMsRUFBRSxDQUFDO3FDQUNuSCxNQUFNLEVBQUU7cUNBQ1IsUUFBUSxDQUFDLE9BQU8sRUFBRTtvQ0FDZixTQUFTLEVBQUUsRUFBRTtvQ0FDYixPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRTtvQ0FDbkUsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhO29DQUN4QixZQUFZLEVBQUUsSUFBSTtvQ0FDbEIsZUFBZSxFQUFFLElBQUk7b0NBQ3JCLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDO2lDQUNwRCxDQUFDLENBQUE7Z0NBRU4scUNBQXFDO2dDQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQ0FBZ0MsRUFBRSxRQUFRLENBQUMsQ0FBQzs0QkFDeEUsQ0FBQzt5QkFDSjt3QkFDRCxrQkFBa0IsRUFBRTs0QkFDaEIsSUFBSSxFQUFFLG9CQUFvQjs0QkFDMUIsT0FBTyxFQUFFLGtCQUFrQjs0QkFDM0IsT0FBTyxFQUFFLDZDQUE2Qzs0QkFDdEQsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0NBQ1YsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxtQ0FBbUMsRUFBRSxDQUFDO29DQUNwSCx1SEFBdUg7cUNBQ3RILE1BQU0sRUFBRTtxQ0FDUixRQUFRLENBQUMsT0FBTyxFQUFFO29DQUNmLFNBQVMsRUFBRSxFQUFFO29DQUNiLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRTtvQ0FDaEUsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhO29DQUN4QixZQUFZLEVBQUUsSUFBSTtvQ0FDbEIsZUFBZSxFQUFFLElBQUk7b0NBQ3JCLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDO2lDQUNsRSxDQUFDLENBQUE7Z0NBRU4scUNBQXFDO2dDQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQzs0QkFDaEUsQ0FBQzt5QkFDSjt3QkFDRCw0QkFBNEIsRUFBRTs0QkFDMUIsSUFBSSxFQUFFLDhCQUE4Qjs0QkFDcEMsT0FBTyxFQUFFLG1DQUFtQzs0QkFDNUMsT0FBTyxFQUFFLDJDQUEyQzs0QkFDcEQsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0NBQ1YsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxtQ0FBbUMsRUFBRSxDQUFDO29DQUNwSCx1SEFBdUg7cUNBQ3RILE1BQU0sRUFBRTtxQ0FDUixRQUFRLENBQUMsT0FBTyxFQUFFO29DQUNmLFNBQVMsRUFBRSxFQUFFO29DQUNiLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLHlCQUF5QixFQUFFO29DQUM1RSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWE7b0NBQ3hCLFlBQVksRUFBRSxJQUFJO29DQUNsQixlQUFlLEVBQUUsSUFBSTtvQ0FDckIsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7aUNBQ3BELENBQUMsQ0FBQTtnQ0FFTiw0QkFBNEI7Z0NBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGlDQUFpQyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUN6RSxDQUFDO3lCQUNKO3dCQUNELDZCQUE2QixFQUFFOzRCQUMzQixJQUFJLEVBQUUsK0JBQStCOzRCQUNyQyxPQUFPLEVBQUUsc0NBQXNDOzRCQUMvQyxPQUFPLEVBQUUsOENBQThDOzRCQUN2RCxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQ0FDVixJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLG1DQUFtQyxFQUFFLENBQUM7b0NBQ3BILHVIQUF1SDtxQ0FDdEgsTUFBTSxFQUFFO3FDQUNSLFFBQVEsQ0FBQyxPQUFPLEVBQUU7b0NBQ2YsU0FBUyxFQUFFLEVBQUU7b0NBQ2IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsMEJBQTBCLEVBQUU7b0NBQzdFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYTtvQ0FDeEIsWUFBWSxFQUFFLElBQUk7b0NBQ2xCLGVBQWUsRUFBRSxJQUFJO29DQUNyQixhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztpQ0FDcEQsQ0FBQyxDQUFBO2dDQUVOLHFDQUFxQztnQ0FDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMscUNBQXFDLEVBQUUsUUFBUSxDQUFDLENBQUM7NEJBQzdFLENBQUM7eUJBQ0o7d0JBQ0Qsc0JBQXNCLEVBQUU7NEJBQ3BCLElBQUksRUFBRSx3QkFBd0I7NEJBQzlCLE9BQU8sRUFBRSw0QkFBNEI7NEJBQ3JDLE9BQU8sRUFBRSw0Q0FBNEM7NEJBQ3JELEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dDQUNWLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsbUNBQW1DLEVBQUUsQ0FBQyxDQUFDO2dDQUV6SCxPQUFPO2dDQUVQLFFBQVEsQ0FBQyxNQUFNLEVBQUU7cUNBQ1osUUFBUSxDQUFDLE9BQU8sRUFBRTtvQ0FDZixTQUFTLEVBQUUsRUFBRTtvQ0FDYixPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRTtvQ0FDdEUsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhO29DQUN4QixZQUFZLEVBQUUsSUFBSTtvQ0FDbEIsZUFBZSxFQUFFLElBQUk7b0NBQ3JCLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDO2lDQUNwRCxDQUFDLENBQUE7Z0NBRU4scUNBQXFDO2dDQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQ0FBZ0MsRUFBRSxRQUFRLENBQUMsQ0FBQzs0QkFDeEUsQ0FBQzt5QkFDSjt3QkFDRCxpQkFBaUIsRUFBRTs0QkFDZixJQUFJLEVBQUUsbUJBQW1COzRCQUN6QixPQUFPLEVBQUUsdUJBQXVCOzRCQUNoQyxPQUFPLEVBQUUsd0NBQXdDOzRCQUNqRCxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQ0FDVixJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLG1DQUFtQyxFQUFFLENBQUM7b0NBQ3BILHVIQUF1SDtxQ0FDdEgsTUFBTSxFQUFFO3FDQUNSLFFBQVEsQ0FBQyxPQUFPLEVBQUU7b0NBQ2YsU0FBUyxFQUFFLEVBQUU7b0NBQ2IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO29DQUMzRCxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWE7b0NBQ3hCLFlBQVksRUFBRSxJQUFJO29DQUNsQixlQUFlLEVBQUUsSUFBSTtpQ0FDeEIsQ0FBQyxDQUFBO2dDQUVOLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLHVCQUF1QixFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUMvRCxDQUFDO3lCQUNKO3dCQUNELHNCQUFzQixFQUFFOzRCQUNwQixJQUFJLEVBQUUsd0JBQXdCOzRCQUM5QixPQUFPLEVBQUUsNENBQTRDOzRCQUNyRCxPQUFPLEVBQUUsb0RBQW9EOzRCQUM3RCxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQ0FDVixJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLG1DQUFtQyxFQUFFLENBQUM7b0NBQ3BILHVIQUF1SDtxQ0FDdEgsTUFBTSxFQUFFO3FDQUNSLFFBQVEsQ0FBQyxPQUFPLEVBQUU7b0NBQ2YsU0FBUyxFQUFFLEVBQUU7b0NBQ2IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFO29DQUM5RCxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWE7b0NBQ3hCLFlBQVksRUFBRSxJQUFJO29DQUNsQixlQUFlLEVBQUUsSUFBSTtvQ0FDckIsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7aUNBQ3BELENBQUMsQ0FBQTtnQ0FFTixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQzs0QkFDaEUsQ0FBQzt5QkFDSjt3QkFDRCxzQkFBc0IsRUFBRTs0QkFDcEIsSUFBSSxFQUFFLHdCQUF3Qjs0QkFDOUIsT0FBTyxFQUFFLDhCQUE4Qjs0QkFDdkMsT0FBTyxFQUFFLHNDQUFzQzs0QkFDL0MsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0NBQ1YsSUFBSSxVQUFlLENBQUM7Z0NBQ3BCLElBQUksYUFBa0IsQ0FBQztnQ0FDdkIseUJBQXlCO2dDQUN6QixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUM7b0NBQ3ZCLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7b0NBQ2pFLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0NBQzdFLENBQUM7cUNBQ0ksQ0FBQztvQ0FDRixhQUFhLEdBQUcsSUFBSSxDQUFDO29DQUNyQixVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQ0FDdkUsQ0FBQztnQ0FFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLG1DQUFtQyxFQUFFLENBQUM7cUNBQ25ILE1BQU0sRUFBRTtxQ0FDUixRQUFRLENBQUMsT0FBTyxFQUFFO29DQUNmLFNBQVMsRUFBRSxFQUFFO29DQUNiLE9BQU8sRUFBRSxVQUFVO29DQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWE7b0NBQ3hCLFlBQVksRUFBRSxJQUFJO29DQUNsQixlQUFlLEVBQUUsSUFBSTtvQ0FDckIsYUFBYSxFQUFFLGFBQWE7aUNBQy9CLENBQUMsQ0FBQTtnQ0FFTixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUMsQ0FBQzs0QkFDaEUsQ0FBQzt5QkFDSjt3QkFDRCxrQkFBa0IsRUFBRTs0QkFDaEIsSUFBSSxFQUFFLG9CQUFvQjs0QkFDMUIsT0FBTyxFQUFFLGlDQUFpQzs0QkFDMUMsT0FBTyxFQUFFLGdFQUFnRTs0QkFDekUsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0NBQ1YsSUFBSSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxtQ0FBbUMsRUFBRSxDQUFDO29DQUNwSCx1SEFBdUg7cUNBQ3RILE1BQU0sRUFBRTtxQ0FDUixRQUFRLENBQUMsT0FBTyxFQUFFO29DQUNmLFNBQVMsRUFBRSxFQUFFO29DQUNiLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFO29DQUNyRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWE7b0NBQ3hCLFlBQVksRUFBRSxJQUFJO29DQUNsQixlQUFlLEVBQUUsSUFBSTtvQ0FDckIsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUM7aUNBQ2xFLENBQUMsQ0FBQTtnQ0FFTixxQ0FBcUM7Z0NBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGlDQUFpQyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUN6RSxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxZQUFZO29CQUVaLHdDQUF3QztvQkFDeEMscUVBQXFFO29CQUNyRSxjQUFjLEdBQUcsNkRBQTZELENBQUM7b0JBRS9FLHNCQUFzQjtvQkFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZO3lCQUNwQixFQUFFLENBQXdFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO3lCQUMxSSxFQUFFLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO3lCQUMzRixFQUFFLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO3lCQUN6QyxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFekUsWUFBWTtvQkFFWiw2Q0FBNkM7b0JBQzdDLHlFQUF5RTtvQkFDekUsY0FBYyxHQUFHLGdFQUFnRSxDQUFDO29CQUVsRixzQkFBc0I7b0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWTt5QkFDcEIsRUFBRSxDQUF3RSxRQUFRLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDNUgsRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO3lCQUM3RSxFQUFFLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7eUJBQ2pELEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV6RSw0RUFBNEU7b0JBQzVFLGNBQWMsR0FBRyxtRUFBbUUsQ0FBQztvQkFFckYsc0JBQXNCO29CQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVk7eUJBQ3BCLEVBQUUsQ0FBd0UsUUFBUSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUM7eUJBQzdILEVBQUUsQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLGNBQWMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDOUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDO3lCQUNsRCxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFekUsWUFBWTtvQkFFWixtQ0FBbUM7b0JBQ25DLDhEQUE4RDtvQkFDOUQsY0FBYyxHQUFHLHFEQUFxRCxDQUFDO29CQUV2RSxzQkFBc0I7b0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWTt5QkFDcEIsRUFBRSxDQUF3RSxRQUFRLEVBQUUsY0FBYyxFQUFFLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDMUksRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDL0YsRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQzt5QkFDekMsRUFBRSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pFLFlBQVk7b0JBRVosc0NBQXNDO29CQUN0QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWTt5QkFDcEIsRUFBRSxDQUFDLE1BQU0sRUFBRSxvREFBb0QsRUFBRSxVQUFVLEdBQUc7d0JBQzNFLE1BQU0sR0FBRyxHQUFHLElBQUksaUJBQWlCLENBQXdCOzRCQUNyRCxLQUFLLEVBQUUsOEJBQThCOzRCQUNyQyxJQUFJLEVBQUUsVUFBVTs0QkFDaEIsT0FBTyxFQUFFLHVFQUF1RTt5QkFDbkYsQ0FBQyxDQUFDO3dCQUNILFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixDQUFDLENBQUM7eUJBQ0QsRUFBRSxDQUFDLFFBQVEsRUFBRSxvREFBb0QsRUFBRSxVQUFVLEdBQUc7d0JBQzdFLGtDQUFrQztvQkFDdEMsQ0FBQyxDQUFDO3lCQUNELEVBQUUsQ0FBQyxVQUFVLEVBQUUsb0RBQW9ELEVBQUUsVUFBVSxHQUFHO3dCQUMvRSx5RUFBeUU7b0JBQzdFLENBQUMsQ0FBQzt5QkFDRCxFQUFFLENBQWtGLE1BQU0sRUFBRSxvREFBb0QsRUFBRSxVQUFVLEdBQUc7d0JBQzVKLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzt3QkFDbkMsSUFBSSxHQUFHLEVBQUUsQ0FBQzs0QkFDTixNQUFNLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBQztnQ0FDOUIsSUFBSSxFQUFFLGVBQWU7Z0NBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCO2dDQUMzQyxJQUFJLEVBQUUsU0FBUztnQ0FDZixjQUFjO2dDQUNkLG9EQUFvRDtnQ0FDcEQsd0JBQXdCO2dDQUN4QixxQkFBcUI7Z0NBQ3JCLHNFQUFzRTtnQ0FDdEUsMEVBQTBFO2dDQUMxRSxpSEFBaUg7Z0NBQ2pILDJEQUEyRDtnQ0FDM0QsUUFBUTtnQ0FDUixHQUFHO2dDQUNILEdBQUcsRUFBRSxLQUFLLElBQUksRUFBRTtvQ0FDWixNQUFNLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFO3dDQUN4QyxRQUFRLEVBQUUsSUFBSTtxQ0FDakIsQ0FBQyxDQUFDO29DQUNILElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLDhDQUE4QztvQ0FDNUQsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyx1QkFBdUI7b0NBQ2hFLElBQUksQ0FBQyxRQUFRLENBQUMsZ0NBQWdDLEVBQUUsRUFBRSxFQUFFLEVBQUUsc0JBQXNCLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQ0FDNUcsQ0FBQzs2QkFDSixDQUFDLENBQUM7NEJBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQ0FDUCxPQUFPLEVBQUUsd0VBQXdFO2dDQUNqRixLQUFLLEVBQUUsU0FBUztnQ0FDaEIsYUFBYSxFQUFFLGFBQWE7Z0NBQzVCLFVBQVUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDOzZCQUMxQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDUCxZQUFZO29CQUVaLHNCQUFzQjtvQkFDdEIseURBQXlEO29CQUN6RCxjQUFjLEdBQUcsc0RBQXNELENBQUM7b0JBRXhFLHNCQUFzQjtvQkFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZO3lCQUNwQixFQUFFLENBQXdFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO3lCQUMxSSxFQUFFLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO3lCQUMxRixFQUFFLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO3lCQUN6QyxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFFeEUsWUFBWTtvQkFFWiwyQ0FBMkM7b0JBQzNDLHNFQUFzRTtvQkFDdEUsY0FBYyxHQUFHLHlEQUF5RCxDQUFDO29CQUUzRSxzQkFBc0I7b0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWTt5QkFDcEIsRUFBRSxDQUF3RSxRQUFRLEVBQUUsY0FBYyxFQUFFLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDMUksRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDL0YsRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO3lCQUMvRCxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekUsWUFBWTtvQkFFWiw4QkFBOEI7b0JBQzlCLHlEQUF5RDtvQkFDekQsY0FBYyxHQUFHLHFEQUFxRCxDQUFDO29CQUV2RSxzQkFBc0I7b0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWTt5QkFDcEIsRUFBRSxDQUF3RSxRQUFRLEVBQUUsY0FBYyxFQUFFLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDMUksRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDL0YsRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO3lCQUMvRCxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekUsWUFBWTtvQkFFWiw4QkFBOEI7b0JBQzlCLG9FQUFvRTtvQkFDcEUsY0FBYyxHQUFHLGlEQUFpRCxDQUFDO29CQUVuRSxzQkFBc0I7b0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWTt5QkFDcEIsRUFBRSxDQUF3RSxRQUFRLEVBQUUsY0FBYyxFQUFFLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDMUksRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQzt5QkFDM0YsRUFBRSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsY0FBYyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO3lCQUMvRCxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekUsWUFBWTtvQkFDWixZQUFZO2dCQUNoQixDQUFDO2dCQUVELCtDQUErQztnQkFDL0MsVUFBVSxDQUFDLElBQVM7b0JBQ2hCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFdEIsbUNBQW1DO29CQUNuQyxJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUM7b0JBQ3JCLElBQUksS0FBSyxHQUFHLG1CQUFtQixDQUFDO29CQUNoQyxJQUFJLElBQUksR0FBRywyQkFBMkIsQ0FBQztvQkFFdkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7b0JBQ3pDLElBQUksS0FBSyxHQUFHLFVBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzdDLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRSxDQUFDO3dCQUNyQixFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQzt3QkFDZCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQzt3QkFDcEIsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQ3pCLENBQUM7b0JBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtvQkFDNUIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7b0JBQzVDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNoQixHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRyxtQkFBbUI7d0JBQ3hDOzRCQUNJLEVBQUUsRUFBRSxFQUFFOzRCQUNOLEtBQUssRUFBRSxLQUFLLElBQUksa0JBQWtCOzRCQUNsQyxPQUFPLEVBQUUsSUFBSSxJQUFJLDBCQUEwQjs0QkFDM0MsSUFBSSxFQUFFLDJDQUEyQzs0QkFDakQsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFO3lCQUN2QixDQUFBLFVBQVUsQ0FBQyxDQUFDO3dCQUVqQixLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7b0JBQzVDLENBQUM7b0JBRUQsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFpRCxFQUFFLENBQUMsQ0FBQztnQkFDbkYsQ0FBQztnQkFFRCxRQUFRLENBQUMsSUFBUyxFQUFFLFdBQWdCLEVBQUUsSUFBWTtvQkFDOUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUV0QixtQ0FBbUM7b0JBQ25DLElBQUksRUFBRSxHQUFHLG1CQUFtQixDQUFDO29CQUM3QixJQUFJLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztvQkFDaEMsSUFBSSxJQUFJLEdBQUcsNkJBQTZCLENBQUM7b0JBRXpDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO29CQUN6QyxJQUFJLEtBQUssR0FBRyxVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQztvQkFDMUQsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFLENBQUM7d0JBQ3JCLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO3dCQUNkLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUNwQixJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDekIsQ0FBQztvQkFFRCxRQUFRLElBQUksRUFBRSxDQUFDO3dCQUNYLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssU0FBUzs0QkFDbEMsV0FBVyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs0QkFDaEQsTUFBTTt3QkFDVixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVM7NEJBQ3JDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7NEJBQ25ELE1BQU07d0JBQ1YsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixLQUFLLFNBQVM7NEJBQzNDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs0QkFDekQsTUFBTTt3QkFDVixLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxLQUFLLFNBQVM7NEJBQ3pDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7NEJBQ3ZELE1BQU07d0JBQ1YsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxTQUFTOzRCQUMxQyxXQUFXLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDOzRCQUN4RCxNQUFNO3dCQUNWLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssU0FBUzs0QkFDckMsV0FBVyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs0QkFDbkQsSUFBSSxTQUFTLElBQUksWUFBWSxJQUFJLFNBQVMsSUFBSSxVQUFVO2dDQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDOztnQ0FDekUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7NEJBRXpCLG1EQUFtRDs0QkFDbkQsV0FBVyxDQUFDLDRCQUE0QixFQUFFLENBQUM7NEJBQzNDLE1BQU07b0JBQ2QsQ0FBQztvQkFFRCwyRUFBMkU7b0JBQzNFLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUV0RCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDN0MsaUtBQWlLO29CQUNqSyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDaEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7NEJBQ3BCLEVBQUUsRUFBRSxFQUFFOzRCQUNOLEtBQUssRUFBRSxTQUFTOzRCQUNoQixLQUFLLEVBQUUsS0FBSzs0QkFDWixPQUFPLEVBQUUsSUFBSTs0QkFDYixJQUFJLEVBQUUsOENBQThDOzRCQUNwRCxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUU7NEJBQ3BCLGFBQWEsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzt5QkFDM0MsRUFBRSxJQUFJLENBQUMsQ0FBQTtvQkFDWixDQUFDO2dCQUNMLENBQUM7Z0JBRUQsUUFBUSxDQUFDLElBQVM7b0JBQ2QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUV0QixJQUFJLEVBQUUsR0FBRyxXQUFXLENBQUM7b0JBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO29CQUN6QyxJQUFJLEtBQUssR0FBRyxVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLEtBQUssSUFBSSxTQUFTLEVBQUUsQ0FBQzt3QkFDckIsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLENBQUM7b0JBRUQsMkVBQTJFO29CQUMzRSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFFL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3ZDLElBQUksS0FBSyxHQUFXLDJCQUEyQixDQUFDO29CQUNoRCxJQUFJLElBQUksR0FBVyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7b0JBQzdELEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLDZDQUE2QyxFQUFFLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzFKLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxxREFBcUQsRUFBRSxDQUFDO3dCQUMxRSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztvQkFDeEMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELFVBQVUsQ0FBQyxJQUF5QjtvQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNqQixDQUFDO2dCQUVELFdBQVc7Z0JBQ1gsYUFBYSxDQUFDLElBQVM7b0JBQ25CLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtvQkFDNUIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUE7b0JBQ3hELElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNoQixHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRyxtQkFBbUI7d0JBQ3hDOzRCQUNJLEVBQUUsRUFBRSxjQUFjOzRCQUNsQixLQUFLLEVBQUUsbUJBQW1COzRCQUMxQixPQUFPLEVBQUUsMEJBQTBCOzRCQUNuQyxJQUFJLEVBQUUsMkNBQTJDOzRCQUNqRCxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUU7eUJBQ3ZCLENBQUEsVUFBVSxDQUFDLENBQUM7d0JBRWpCLEtBQUssR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQTtvQkFDeEQsQ0FBQztvQkFFRCxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQWlELEVBQUUsQ0FBQyxDQUFDO2dCQUNuRixDQUFDO2dCQUVELFdBQVcsQ0FBQyxJQUFTLEVBQUUsV0FBZ0I7b0JBQ25DLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLHNFQUFzRTtvQkFFN0YsSUFBSSxJQUFJLEdBQVcsbUJBQW1CLENBQUM7b0JBQ3ZDLElBQUksS0FBSyxHQUFXLG9CQUFvQixDQUFDO29CQUN6QyxXQUFXLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO29CQUNoRCxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFFM0MsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztvQkFFakUsaUlBQWlJO29CQUNqSSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDaEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7NEJBQ3BCLEVBQUUsRUFBRSxzQkFBc0I7NEJBQzFCLEtBQUssRUFBRSxLQUFLOzRCQUNaLE9BQU8sRUFBRSxJQUFJOzRCQUNiLElBQUksRUFBRSw4Q0FBOEM7NEJBQ3BELFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRTs0QkFDcEIsYUFBYSxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUM7eUJBQzVELEVBQUUsSUFBSSxDQUFDLENBQUE7b0JBQ1osQ0FBQztnQkFDTCxDQUFDO2dCQUVELFdBQVcsQ0FBQyxFQUFPLEVBQUUsR0FBUTtvQkFDekIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUUxQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxLQUFLLEdBQVcsbUJBQW1CLENBQUM7b0JBQ3hDLElBQUksSUFBSSxHQUFXLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztvQkFDeEQsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLDZDQUE2QyxFQUFFLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xKLENBQUM7Z0JBRUQsMkJBQTJCO2dCQUMzQixrQkFBa0IsQ0FBQyxJQUFTO29CQUN4QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3RCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7b0JBQzVCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLHVCQUF1QixDQUFDLENBQUE7b0JBQ2pFLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNoQixHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRyxtQkFBbUI7d0JBQ3hDOzRCQUNJLEVBQUUsRUFBRSx1QkFBdUI7NEJBQzNCLEtBQUssRUFBRSxvQkFBb0I7NEJBQzNCLE9BQU8sRUFBRSxrQ0FBa0M7NEJBQzNDLElBQUksRUFBRSwyQ0FBMkM7NEJBQ2pELFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRTt5QkFDdkIsQ0FBQSxVQUFVLENBQUMsQ0FBQzt3QkFFakIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLHVCQUF1QixDQUFDLENBQUE7b0JBQ2pFLENBQUM7b0JBRUQsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFpRCxFQUFFLENBQUMsQ0FBQztnQkFDbkYsQ0FBQztnQkFFRCxnQkFBZ0IsQ0FBQyxJQUFTLEVBQUUsV0FBZ0I7b0JBQ3hDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLHNFQUFzRTtvQkFFN0YsSUFBSSxJQUFJLEdBQVcsbUNBQW1DLENBQUM7b0JBQ3ZELElBQUksS0FBSyxHQUFXLHFCQUFxQixDQUFDO29CQUMxQyxXQUFXLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO29CQUNuRCxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO29CQUVwRCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO29CQUUxRSx5R0FBeUc7b0JBQ3pHLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUNoQixHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTs0QkFDcEIsRUFBRSxFQUFFLCtCQUErQjs0QkFDbkMsS0FBSyxFQUFFLEtBQUs7NEJBQ1osT0FBTyxFQUFFLElBQUk7NEJBQ2IsSUFBSSxFQUFFLDhDQUE4Qzs0QkFDcEQsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFOzRCQUNwQixhQUFhLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQzt5QkFDckUsRUFBRSxJQUFJLENBQUMsQ0FBQTtvQkFDWixDQUFDO2dCQUNMLENBQUM7Z0JBRUQsZ0JBQWdCLENBQUMsRUFBTyxFQUFFLEdBQVE7b0JBQzlCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2xDLElBQUksS0FBSyxHQUFXLG1DQUFtQyxDQUFDO29CQUN4RCxJQUFJLElBQUksR0FBVyxRQUFRLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7b0JBQ3hELE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSw2Q0FBNkMsRUFBRSxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNsSixDQUFDO2dCQUVELDhCQUE4QjtnQkFDOUIsbUJBQW1CLENBQUMsSUFBUztvQkFDekIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN0QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO29CQUM1QixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSx3QkFBd0IsQ0FBQyxDQUFBO29CQUNsRSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDaEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUcsbUJBQW1CO3dCQUN4Qzs0QkFDSSxFQUFFLEVBQUUsd0JBQXdCOzRCQUM1QixLQUFLLEVBQUUsb0JBQW9COzRCQUMzQixPQUFPLEVBQUUscUNBQXFDOzRCQUM5QyxJQUFJLEVBQUUsMkNBQTJDOzRCQUNqRCxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUU7eUJBQ3ZCLENBQUEsVUFBVSxDQUFDLENBQUM7d0JBRWpCLEtBQUssR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSx3QkFBd0IsQ0FBQyxDQUFBO29CQUNsRSxDQUFDO29CQUVELEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBaUQsRUFBRSxDQUFDLENBQUM7Z0JBQ25GLENBQUM7Z0JBRUQsaUJBQWlCLENBQUMsSUFBUyxFQUFFLFdBQWdCO29CQUN6QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxzRUFBc0U7b0JBQzdGLElBQUksSUFBSSxHQUFXLHNDQUFzQyxDQUFDO29CQUMxRCxJQUFJLEtBQUssR0FBVyxxQkFBcUIsQ0FBQztvQkFDMUMsV0FBVyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztvQkFDbkQsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztvQkFFckQsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztvQkFFM0UseUdBQXlHO29CQUN6RyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDaEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7NEJBQ3BCLEVBQUUsRUFBRSxnQ0FBZ0M7NEJBQ3BDLEtBQUssRUFBRSxLQUFLOzRCQUNaLE9BQU8sRUFBRSxJQUFJOzRCQUNiLElBQUksRUFBRSw4Q0FBOEM7NEJBQ3BELFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRTs0QkFDcEIsYUFBYSxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsK0JBQStCLENBQUM7eUJBQ3RFLEVBQUUsSUFBSSxDQUFDLENBQUE7b0JBQ1osQ0FBQztnQkFDTCxDQUFDO2dCQUVELGlCQUFpQixDQUFDLEVBQU8sRUFBRSxHQUFRO29CQUMvQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBRTFCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLEtBQUssR0FBVyxzQ0FBc0MsQ0FBQztvQkFDM0QsSUFBSSxJQUFJLEdBQVcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO29CQUN4RCxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsNkNBQTZDLEVBQUUsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEosQ0FBQztnQkFDRCxZQUFZO2dCQUVaOzs7O2tCQUlFO2dCQUNGLGdCQUFnQixDQUFDLEVBQVU7b0JBQ3ZCLGtEQUFrRDtvQkFDbEQsa0NBQWtDO29CQUNsQyxJQUFJLENBQUMsRUFBRTt3QkFBRSxPQUFPLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7d0JBQzVCLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQzs0QkFBRSxPQUFPLEVBQUUsQ0FBQzt3QkFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDM0MsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsQ0FBQztvQkFDRCxPQUFPLEVBQUUsQ0FBQztnQkFDZCxDQUFDO2dCQUVEOztrQkFFRTtnQkFDRiw0QkFBNEI7b0JBQ3hCLGtEQUFrRDtvQkFDbEQsSUFBSSxDQUFDO3dCQUNELElBQUssTUFBYyxDQUFDLG1CQUFtQixFQUFFLENBQUM7NEJBQ3RDLE1BQU0sU0FBUyxHQUFJLE1BQWMsQ0FBQyxtQkFBd0QsQ0FBQzs0QkFDM0YsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQ0FDekIsSUFBSSxRQUFRLElBQUksT0FBTyxRQUFRLENBQUMsdUJBQXVCLEtBQUssVUFBVSxFQUFFLENBQUM7b0NBQ3JFLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDNUMsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO29CQUNMLENBQUM7b0JBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzt3QkFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLDJEQUEyRCxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNqRixDQUFDO2dCQUNMLENBQUM7YUFDSixDQUFBO1lBdnpCWSxRQUFRO2dCQURwQixVQUFVLENBQUMsUUFBUTtlQUNQLFFBQVEsQ0F1ekJwQjtZQXZ6Qlksa0JBQVEsV0F1ekJwQixDQUFBO1FBQ0wsQ0FBQyxFQTF6Qm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTB6QjdCO0lBQUQsQ0FBQyxFQTF6QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTB6Qm5CO0FBQUQsQ0FBQyxFQTF6QlMsTUFBTSxLQUFOLE1BQU0sUUEwekJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50Lk1haW5BcHAudHMgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBTdGFydG92bmkgY29udGVudCBtb2R1bHUgRERQICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIFBhdmVsIFBvbMOhayAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMTcgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAxNy0wNC0xOCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5uYW1lc3BhY2UgR29yZGljLkRkcC5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTWFpbkFwcCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8vdGl0bGU6IHN0cmluZztcclxuICAgICAgICAvL3R5cF9waGw6IHN0cmluZztcclxuICAgICAgICAvLy8vcHJpdmF0ZSB0YWJNYW5hZ2VyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8vcHJpdmF0ZSBmb3JtU3RhdGlzdGlrYVBobDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvL3ByaXZhdGUgZHRvOiBJbnRlcmZhY2UuTEsuSXNsLkdUeXBQb2hsZWRhdmt5RHRvO1xyXG5cclxuICAgICAgICAvKiogVsO9c2xlZGVrIGFzeW5jIGZ1bmtjZSAqL1xyXG4gICAgICAgIHZ5c2xlZGVrQXN5bmM6IGFueTtcclxuICAgICAgICAvKiogUMWZw616bmFrIGpha8O9IGdyaWRmb3JtYXQgcG91xb7DrXQgcHJvIGFzeW5jIGFrY2UgUk9CICovXHJcbiAgICAgICAgcHJpem5ha1JPQjogbnVtYmVyO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgQXN5bmMuR1Rhc2tNYW5hZ2VyLmluaXQoeyBkZWxheTogMTAwMCB9KTtcclxuICAgICAgICAgICAgQ29tbW9uLkdyaWRGb3JtYXRzLkNsZWFyQ2FjaGUoKTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkJsb2dQcm92aWRlcigpKTsgLy96YXBvamVuw60gYmxvZ8WvXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkFydGljbGVQcm92aWRlcigpKTsgLy96YXBvamVuw60gxI1sw6Fua8WvICh1xb5pdmF0ZWxza3kgZWRpdG92YXRlbG7DvSB0ZXh0KVxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5Jc2xQcm92aWRlcigpKTsgLy96YXBvamVuw60gamFrw6lrb2xpIGRvc3R1cG7DqSBJU0wgbWV0b2R5IHZyYWNlasOtY8OtIHNlem5hbSBkYXQgKGplIG1vxb5uw6kgbmFzdGF2aXQgaSB2b2zDoW7DrSBkZXRhaWx1IHDFmWkga2xpa251dMOtIG5hIHBvbG/Fvmt1KVxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5Sc3NQcm92aWRlcigpKTsgLy96YXBvamVuw60gUlNTIHpwcsOhdiAodsSNZXRuxJsgc3Ryw6Fua292w6Fuw60sIHZ5aGxlZMOhdsOhbsOtIGEgZmlsdHJvdsOhbsOtIHBvZGxlIGthdGVnb3Jpw60pXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLlJlc3RQcm92aWRlcigpKTsgLy96YXBvamVuw60gZXh0ZXJuw61jaCBSRVNUIHNsdcW+ZWJcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuRmlsZVByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBuYcSNw610w6Fuw60gZGF0IHplIHNvdWJvcnUgdHlwdSBKU09OLCBrdGVyw70gamUgdmxvxb5lbiBkbyBzbG/Fvmt5IERhdGEgdiBhZHJlc8OhxZlpIGFwbGlrYWNlXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLlhyZ1NlcnZpY2VQcm92aWRlcigpKTsgLy96YXBvamVuw60gbmHEjcOtdMOhbsOtIGRhdCB6ZSBYUkcgc2x1xb5ieSB1dmVkZW7DqSB2ZSB3ZWIuY29uZmlnIHNwb2x1IHMgbmFzdGF2ZW7DvW1pIHDFmcOtc3R1cG92w71taSDDumRhamlcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuRGF0YVJlcG9ydFByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBzZXN0YXZcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuV2ViQ2xpZW50LkdIRktBc3luY1V0aWxzKHRoaXMsIG5ldyBEYXRhLkdyaWRGb3JtYXQoKSk7IC8vc3Byw6F2bsSbIGJ5IG3Em2wgYsO9dCBwxZllZMOhbSBHcmlkRm9ybcOhdCBqYWtvIHBydm90bsSbIHDFmWVkw6F2YW7DvSBkbyBwcsWvdm9kY2VcclxuXHJcbiAgICAgICAgICAgIC8vR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcnMucmVnaXN0ZXIoRGFzaGJvYXJkLmNyZWF0ZVByb3ZpZGVyUG9jdHlQb2h5YnVLVWN0b3ZhbmkoY29udGVudCkpXHJcbiAgICAgICAgICAgIC8vR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuQ3VzdG9tUHJvdmlkZXIoXCJDZXN0eSBhIG7DoXbFoXTEm3Z5XCIsIFwiY2VzdHlcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5pc2wuUmNuU291aHJuLnBvY3R5UG96YWRhdmt1KHsgY2VzdHk6IHRydWUsIHByaWthenk6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiAkKFwiPGRpdj5cIikuZ2Jhc2VwYW5lbChHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpTXVsdGlSb3dzVGVtcGxhdGUoKSwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBpZDogXCJwb2N0eUNlc3R5XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpSWNvblR3b1Jvd3NUZXh0VGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImFjdEJlekZpbkNsaWNrRW50ZXJcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhhdC5uYWN0aVNlem5hbUJlekZpbihjdHguaXRlbS5kYXRhLmlkLCBsX3BhcmFtZXRyeS5wYXJhbVN1bFByaSEpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vfSksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJyZWFsaXpvdmFuZUNlc3R5XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IFtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuY2VzdHlQcmVkUmVhbGl6YWNpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUMWZZWQgcmVhbGl6YWPDrVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJwb3NpdGl2ZVwiLCAvL25lZ2F0aXZlLCBpbmZvXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmNlc3R5UmVhbGl6b3Zhbm8sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZWFsaXpvdsOhbm9cIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJHXCJcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuY2VzdHlWZVZ5dWN0b3ZhbmksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWZSB2ecO6xI10b3bDoW7DrVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJwb3NpdGl2ZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcIkdcIlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5jZXN0eVZ5dWN0b3Zhbm8sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWecO6xI10b3bDoW5vXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcInBvc2l0aXZlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhLmNlc3R5VWhyYXplbm8sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVaHJhemVub1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJwb3NpdGl2ZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcIkdcIlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YS5jZXN0eVpsaWt2b2RvdmFubyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlpsaWt2aWRvdsOhbm9cIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJHXCJcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEuY2VzdHlacnVzZW5lLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiWnJ1xaFlbm9cIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwicG9zaXRpdmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJHXCJcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgXSBhcyBhbnkpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgICAgICAvL30pKTtcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBEZWZpbmljZSBhc3luYyBmdW5rY8OtXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gSHJvbWFkbsOpIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICAgIHZhciBhc3luY0NsYXNzTmFtZSA9IFwiR29yZGljLkRkcC5TZXJ2ZXIuTEsuQXN5bmMuR0RkcEhyb21hZG5lVnltYWhhbmlBc3luY1Rhc2tcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdHJhY2UgdWTDoWxvc3TDrVxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAub248QXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5Db21tb24uR1Z5c2xlZGVrRHRvPihcImNoYW5nZVwiLCBhc3luY0NsYXNzTmFtZSwgdGhhdC5UYXNrQ2hhbmdlKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZG9uZVwiLCBhc3luY0NsYXNzTmFtZSwgZnVuY3Rpb24gKCkgeyB0aGF0LlRhc2tEb25lKHRoaXMsIHRoYXQsIFwiYWN0VnlzbGVkZWtWeW1haGFuaVwiKSB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZmFpbFwiLCBhc3luY0NsYXNzTmFtZSwgZnVuY3Rpb24gKCkgeyB0aGF0LlRhc2tGYWlsKHRoaXMpIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJhbHdheXNcIiwgYXN5bmNDbGFzc05hbWUsIGZ1bmN0aW9uICgpIHsgdGhhdC5UYXNrQWx3YXlzKHRoaXMpIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gRGVmaW5pY2UgYWtjw61cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdEdQcmlwYWR5U2V6bmFtR3JpZFZ5Y2hvemlBa2NlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RHUHJpcGFkeVNlem5hbUdyaWRWeWNob3ppQWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93OiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByaXBhZER0byA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8/IGplIHRhZHkgbnV0bsO9IG3DrXQgdHlwX3BobCBuYSB2c3R1cHUgcHJvIG90ZXbFmWVuw60gZGV0YWlsdSBwxZnDrXBhZHUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uUHJpcGFkeS5vcGVuUHJpcGFkRGV0YWlsKHRoaXMsIHJvdy5peHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBJRDogXCJERFBHUHJpcGFkRGV0YWlsI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgSXhwOiByb3cuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgVHlwUGhsOiByb3cudHlwX3BobCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEdEZXRhaWxWeW1haGFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0R0RldGFpbFZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByb3c6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEdG8gPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmNlbGxJbmZvLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93Lml4cF9udnkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdEZXRhaWxWeW1haGFuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwTnZ5OiByb3cuaXhwX252eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VnlzbGVkZWtWeW1haGFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VnlzbGVkZWtWeW1haGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw71zbGVkZWsgdnltw6Fow6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhesOtIHbDvXNsZWRlayBocm9tYWRuw6lobyB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyaWRGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ0YWJ1bGthVnlzbGVka3VcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTC0wLTEyLTAgTS0wLTEyLTAgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZ3JpZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93SGVpZ2h0OiAzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuVnlzbGVkZWtWeW1haGFuaSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudnlzbGVkZWtBc3luYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VG9wUGFuZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0JvdHRvbVBhbmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdEZXRhaWxWeW1haGFuaVwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gdGFidWxreSB2w71zbGVka3Ugdnltw6Fow6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJWw71zbGVkZWsgdnltw6Fow6Fuw60gbmEgcMWZw61wYWRlY2hcIiwgZ3JpZEZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RWeXNsZWRla1ByaXBhZHU6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5c2xlZGVrUHJpcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVsO9c2xlZGVrIHDFmcOtcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWm9icmF6w60gdsO9c2xlZGVrIGhyb21hZG7DqWhvIGFrY2UgbmEgcMWZw61wYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInRhYnVsa2FWeXNsZWRrdVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMLTAtMTItMCBNLTAtMTItMCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgRm9ybXMuRm9ybSh7IG5hbWU6IFwiZGRwTmFzdGF2ZW5pVWtvbnVcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZ3JpZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93SGVpZ2h0OiAzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuSHJtQWtjZVNpbXBsZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudnlzbGVkZWtBc3luYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VG9wUGFuZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0JvdHRvbVBhbmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmlwYWR5U2V6bmFtR3JpZFZ5Y2hvemlBa2NlXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSB0YWJ1bGt5IHbDvXNsZWRrdSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybShcIlbDvXNsZWRlayBocm9tYWRuw6kgYWtjZVwiLCBncmlkRm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFZ5c2xlZGVrTmFzdGF2ZW5pUHJpelRpc2s6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5c2xlZGVrTmFzdGF2ZW5pUHJpelRpc2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlbDvXNsZWRlayBuYXN0YXZlbsOtIHDFmcOtem5ha3UgdGlza3VcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhesOtIHbDvXNsZWRlayBuYXN0YXZlbsOtIHDFmcOtem5ha3UgdGlza3VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmlkRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwidGFidWxrYVZ5c2xlZGt1XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIEwtMC0xMi0wIE0tMC0xMi0wIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBGb3Jtcy5Gb3JtKHsgbmFtZTogXCJkZHBOYXN0YXZlbmlVa29udVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdncmlkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dIZWlnaHQ6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy5WeXNsZWRla05hc3RhdmVuaVByaXpUaXNrKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52eXNsZWRla0FzeW5jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0RldGFpbFZ5bWFoYW5pXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSB0YWJ1bGt5IHbDvXNsZWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybShcIlbDvXNsZWRlayBuYXN0YXZlbsOtIG5hIHDFmcOtcGFkZWNoXCIsIGdyaWRGb3JtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VnlzbGVkZWtOYXN0YXZlbmlQcml6T2Rlc2w6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5c2xlZGVrTmFzdGF2ZW5pUHJpek9kZXNsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw71zbGVkZWsgbmFzdGF2ZW7DrSBwxZnDrXpuYWt1IG9kZXNsw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhesOtIHbDvXNsZWRlayBuYXN0YXZlbsOtIHDFmcOtem5ha3Ugb2Rlc2zDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyaWRGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ0YWJ1bGthVnlzbGVka3VcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTC0wLTEyLTAgTS0wLTEyLTAgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEZvcm1zLkZvcm0oeyBuYW1lOiBcImRkcE5hc3RhdmVuaVVrb251XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2dyaWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0hlaWdodDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlZ5c2xlZGVrTmFzdGF2ZW5pUHJpek9kZXNsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52eXNsZWRla0FzeW5jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0RldGFpbFZ5bWFoYW5pXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSB0YWJ1bGt5IHbDvXNsZWRrdSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybShcIlbDvXNsZWRlayBuYXN0YXZlbsOtIHDFmcOtcGFkxa8gdnltw6Fow6Fuw61cIiwgZ3JpZEZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RWeXNsZWRla09ibm92ZW5pVnltOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeXNsZWRla09ibm92ZW5pVnltXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw71zbGVkZWsgb2Jub3ZlbsOtIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJab2JyYXrDrSB2w71zbGVkZWsgb2Jub3ZlbsOtIHDFmcOtcGFkxa8gdnltw6Fow6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmlkRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwidGFidWxrYVZ5c2xlZGt1XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIEwtMC0xMi0wIE0tMC0xMi0wIFMtMC0xMi0wXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkRm9ybS5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2dyaWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0hlaWdodDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlZ5c2xlZGVrT2Jub3ZlbmlWeW0oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZ5c2xlZGVrQXN5bmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1RvcFBhbmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RHRGV0YWlsVnltYWhhbmlcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvdGV2xZllbsOtIHRhYnVsa3kgdsO9c2xlZGt1IG9ibm92ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybShcIlbDvXNsZWRlayBvYm5vdmVuw60gbmEgcMWZw61wYWRlY2hcIiwgZ3JpZEZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RWeXNsZWRla1JlZGlzdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VnlzbGVkZWtSZWRpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlbDvXNsZWRlayByZWRpc3RyaWJ1Y2VcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhesOtIHbDvXNsZWRlayBocm9tYWRuw6kgcmVkaXN0cmlidWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInRhYnVsa2FWeXNsZWRrdVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSBMLTAtMTItMCBNLTAtMTItMCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgRm9ybXMuRm9ybSh7IG5hbWU6IFwiZGRwTmFzdGF2ZW5pVWtvbnVcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZ3JpZFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93SGVpZ2h0OiAzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBHb3JkaWMuRGRwLldlYkNsaWVudC5Db21tb24uR3JpZEZvcm1hdHMuUHJldnpldGkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZ5c2xlZGVrQXN5bmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1RvcFBhbmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaW1wbGVGb3JtKFwiVsO9c2xlZGVrIHJlZGlzdHJpYnVjZVwiLCBncmlkRm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFZ5c2xlZGVrSHJvbUFrY2VWeW06IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5c2xlZGVrSHJvbUFrY2VWeW1cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlbDvXNsZWRlayBocm9tYWRuw6kgYWtjZSBuYSBzZXpuYW11IHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJab2JyYXrDrSB2w71zbGVkZWsgaHJvbWFkbsOpIGFrY2UgbmEgc2V6bmFtdSB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyaWRGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ0YWJ1bGthVnlzbGVka3VcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTC0wLTEyLTAgTS0wLTEyLTAgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEZvcm1zLkZvcm0oeyBuYW1lOiBcImRkcE5hc3RhdmVuaVVrb251XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2dyaWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0hlaWdodDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLkhyb21Ba2NlVnltKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhhdC52eXNsZWRla0FzeW5jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Qm90dG9tUGFuZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0R0RldGFpbFZ5bWFoYW5pXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJWw71zbGVkZWsgaHJvbWFkbsOpIGFrY2VcIiwgZ3JpZEZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RWeXNsZWRla0hyb21Ba2NlUk9COiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeXNsZWRla0hyb21Ba2NlUk9CXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw71zbGVkZWsgaHJvbWFkbsOpIGFrY2UgKFJPQilcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhesOtIHbDvXNsZWRlayBocm9tYWRuw6kgYWtjZSAoUk9CKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQ6IGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRBY3Rpb246IGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCAtIFBvZMOhbsOtLCAxIC0gQmFzaWMgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnByaXpuYWtST0IgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbiA9IHRoYXQuYWN0aW9uc1tcImFjdEdQcmlwYWR5U2V6bmFtR3JpZFZ5Y2hvemlBa2NlXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IEdvcmRpYy5EZHAuV2ViQ2xpZW50LkNvbW1vbi5HcmlkRm9ybWF0cy5Icm9tQWtjZVJPQlBvZGFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLkhyb21Ba2NlUk9CKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncmlkRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwidGFidWxrYVZ5c2xlZGt1XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIEwtMC0xMi0wIE0tMC0xMi0wIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2dyaWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0hlaWdodDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogZ3JpZEZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZ5c2xlZGVrQXN5bmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1RvcFBhbmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCb3R0b21QYW5lbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBkZWZhdWx0QWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJWw71zbGVkZWsgaHJvbWFkbsOpIGFrY2VcIiwgZ3JpZEZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RWeXNsZWRla0hyb21TcHI6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFZ5c2xlZGVrSHJvbVNwclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVsO9c2xlZGVrIGhyb21hZG7DqWhvIHNwcsOhdmNvdsOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJab2JyYXrDrSB2w71zbGVkZWsgaHJvbWFkbsOpaG8gc3Byw6F2Y292w6Fuw60gbmEgdnlicmFuw71jaCBwxZnDrXBhZGVjaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyaWRGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ0YWJ1bGthVnlzbGVka3VcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEgTC0wLTEyLTAgTS0wLTEyLTAgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEZvcm1zLkZvcm0oeyBuYW1lOiBcImRkcE5hc3RhdmVuaVVrb251XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2dyaWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0hlaWdodDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogR29yZGljLkRkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLkhybUFrY2VTaW1wbGVBc3luYygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQudnlzbGVkZWtBc3luYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VG9wUGFuZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0JvdHRvbVBhbmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdEdQcmlwYWR5U2V6bmFtR3JpZFZ5Y2hvemlBa2NlXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSB0YWJ1bGt5IHbDvXNsZWRrdSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybShcIlbDvXNsZWRlayBocm9tYWRuw6lobyBzcHLDoXZjb3bDoW7DrVwiLCBncmlkRm9ybSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEhyb21hZG7DqSBha2NlIG5hIHDFmcOtcGFkZWNoIEREUFxyXG4gICAgICAgICAgICAvLyBSZWdpc3RyYWNlIGFzeW5jaHJvbm7DrSBmdW5rY2UgcHJvIGhyb21hZG7DqSBha2NlIG5hIHNlem5hbXUgcMWZw61wYWTFr1xyXG4gICAgICAgICAgICBhc3luY0NsYXNzTmFtZSA9IFwiR29yZGljLkRkcC5TZXJ2ZXIuTEsuQXN5bmMuR0RkcEhyb21hZG5lQWtjZVByaXBhZHVBc3luY1Rhc2tcIjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdHJhY2UgdWTDoWxvc3TDrVxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAub248QXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5Db21tb24uR1Z5c2xlZGVrRHRvPihcImNoYW5nZVwiLCBhc3luY0NsYXNzTmFtZSwgZnVuY3Rpb24gKCkgeyB0aGF0LlRhc2tDaGFuZ2UodGhpcykgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImRvbmVcIiwgYXN5bmNDbGFzc05hbWUsIGZ1bmN0aW9uICgpIHsgdGhhdC5UYXNrRG9uZSh0aGlzLCB0aGF0LCBcImFjdFZ5c2xlZGVrUHJpcGFkdVwiKSB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZmFpbFwiLCBhc3luY0NsYXNzTmFtZSwgdGhhdC5UYXNrRmFpbClcclxuICAgICAgICAgICAgICAgIC5vbihcImFsd2F5c1wiLCBhc3luY0NsYXNzTmFtZSwgZnVuY3Rpb24gKCkgeyB0aGF0LlRhc2tBbHdheXModGhpcykgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBOYXN0YXZlbsOtIHDFmcOtem5ha3UgdGlza3UgYSBvZGVzbMOhbsOtXHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdHJhY2UgYXN5bmNocm9ubsOtIGZ1bmtjZSBwcm8gbmFzdGF2ZW7DrSBwxZnDrXpuYWt1IHRpc2t1IG5hIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICAgIGFzeW5jQ2xhc3NOYW1lID0gXCJHb3JkaWMuRGRwLlNlcnZlci5MSy5Bc3luYy5HRGRwTmFzdGF2ZW5pUHJpem5ha3VUaXNrdUFzeW5jVGFza1wiO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVnaXN0cmFjZSB1ZMOhbG9zdMOtXHJcbiAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXJcclxuICAgICAgICAgICAgICAgIC5vbjxBc3luYy5JR1Rhc2tQcm9ncmVzcywgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNvbW1vbi5HVnlzbGVkZWtEdG8+KFwiY2hhbmdlXCIsIGFzeW5jQ2xhc3NOYW1lLCB0aGF0LlRhc2tDaGFuZ2VQcml6VGlzaylcclxuICAgICAgICAgICAgICAgIC5vbihcImRvbmVcIiwgYXN5bmNDbGFzc05hbWUsIGZ1bmN0aW9uICgpIHsgdGhhdC5UYXNrRG9uZVByaXpUaXNrKHRoaXMsIHRoYXQpIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJmYWlsXCIsIGFzeW5jQ2xhc3NOYW1lLCB0aGF0LlRhc2tGYWlsUHJpelRpc2spXHJcbiAgICAgICAgICAgICAgICAub24oXCJhbHdheXNcIiwgYXN5bmNDbGFzc05hbWUsIGZ1bmN0aW9uICgpIHsgdGhhdC5UYXNrQWx3YXlzKHRoaXMpIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVnaXN0cmFjZSBhc3luY2hyb25uw60gZnVua2NlIHBybyBuYXN0YXZlbsOtIHDFmcOtem5ha3Ugb2Rlc2zDoW7DrSBuYSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICBhc3luY0NsYXNzTmFtZSA9IFwiR29yZGljLkRkcC5TZXJ2ZXIuTEsuQXN5bmMuR0RkcE5hc3RhdmVuaVByaXpuYWt1T2Rlc2xhbmlBc3luY1Rhc2tcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdHJhY2UgdWTDoWxvc3TDrVxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAub248QXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5Db21tb24uR1Z5c2xlZGVrRHRvPihcImNoYW5nZVwiLCBhc3luY0NsYXNzTmFtZSwgdGhhdC5UYXNrQ2hhbmdlUHJpek9kZXNsKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZG9uZVwiLCBhc3luY0NsYXNzTmFtZSwgZnVuY3Rpb24gKCkgeyB0aGF0LlRhc2tEb25lUHJpek9kZXNsKHRoaXMsIHRoYXQpIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJmYWlsXCIsIGFzeW5jQ2xhc3NOYW1lLCB0aGF0LlRhc2tGYWlsUHJpek9kZXNsKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiYWx3YXlzXCIsIGFzeW5jQ2xhc3NOYW1lLCBmdW5jdGlvbiAoKSB7IHRoYXQuVGFza0Fsd2F5cyh0aGlzKSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIE9ibm92ZW7DrSBwxZnDrXBhZMWvIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdHJhY2UgYXN5bmNocm9ubsOtIGZ1bmtjZSBwcm8gb2Jub3ZlbsOtIHDFmcOtcGFkdSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICBhc3luY0NsYXNzTmFtZSA9IFwiR29yZGljLkRkcC5TZXJ2ZXIuTEsuQXN5bmMuR0RkcE9ibm92ZW5pVnltQXN5bmNUYXNrXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWdpc3RyYWNlIHVkw6Fsb3N0w61cclxuICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlclxyXG4gICAgICAgICAgICAgICAgLm9uPEFzeW5jLklHVGFza1Byb2dyZXNzLCBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5EdG8uQ29tbW9uLkdWeXNsZWRla0R0bz4oXCJjaGFuZ2VcIiwgYXN5bmNDbGFzc05hbWUsIGZ1bmN0aW9uICgpIHsgdGhhdC5UYXNrQ2hhbmdlKHRoaXMpIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJkb25lXCIsIGFzeW5jQ2xhc3NOYW1lLCBmdW5jdGlvbiAoKSB7IHRoYXQuVGFza0RvbmUodGhpcywgdGhhdCwgXCJhY3RWeXNsZWRla09ibm92ZW5pVnltXCIpIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJmYWlsXCIsIGFzeW5jQ2xhc3NOYW1lLCB0aGF0LlRhc2tGYWlsKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiYWx3YXlzXCIsIGFzeW5jQ2xhc3NOYW1lLCBmdW5jdGlvbiAoKSB7IHRoYXQuVGFza0Fsd2F5cyh0aGlzKSB9KTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gSHJvbWFkbsSbIG9kZXNsYXQgZG8gdsO9cHJhdm55XHJcbiAgICAgICAgICAgIGNvbnN0IG1haW5Db250ZW50ID0gdGhpcztcclxuICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlclxyXG4gICAgICAgICAgICAgICAgLm9uKFwiaW5pdFwiLCBcIkdvcmRpYy5Fa28uU2VydmVyLkdPZGVzbGF0TXVsdGlwbGVSZXBvcnRzQXN5bmNUYXNrXCIsIGZ1bmN0aW9uIChjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3QgPSBuZXcgR09ic2VydmFibGVPYmplY3Q8SUdOb3RpZmljYXRpb25PcHRpb25zPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkhyb21hZG7EmyBvZGVzbGF0IGRvIHbDvXByYXZueVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIkdlbmVyb3bDoW7DrSBlbC4gb2JyYXrFryBwcm8gbsOhc2xlZG7DqSBvZGVzbMOhbsOtIGRvIHbDvXByYXZueSBieWxvIHphaMOhamVub1wiLCBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBtYWluQ29udGVudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgbm90KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5vdGlmaWNhdGlvbihub3QpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNoYW5nZVwiLCBcIkdvcmRpYy5Fa28uU2VydmVyLkdPZGVzbGF0TXVsdGlwbGVSZXBvcnRzQXN5bmNUYXNrXCIsIGZ1bmN0aW9uIChjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL21vem5vIG5lamFrIHJlYWdvdmF0IG5hIHByb2dyZXNzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiaW5hY3RpdmVcIiwgXCJHb3JkaWMuRWtvLlNlcnZlci5HT2Rlc2xhdE11bHRpcGxlUmVwb3J0c0FzeW5jVGFza1wiLCBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb3pubyBuZWphayByZWFnb3ZhdCBuYSBzdGF2LCBrZHkgamUgdWxvaGEgbmVha3Rpdm5pIChuaWtkZSBqaXogbmViZXppKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbjxHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIEdvcmRpYy5Fa28uVXRpbHMuR09kZXNsYXRQZXJzaXN0ZW50QXN5bmNUYXNrUmVzdWx0PihcImRvbmVcIiwgXCJHb3JkaWMuRWtvLlNlcnZlci5HT2Rlc2xhdE11bHRpcGxlUmVwb3J0c0FzeW5jVGFza1wiLCBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm90ID0gdGhpcy5nZXROb3RpZmljYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNob3dSZXN1bHRBY3QgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dSZXN1bHRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2Rlc2xhdFwiLCAvL1JDIDMzNjAwNjEwIDogT2Rlc2xhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zZW5kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3J1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIFdmbC5EaWFsb2dzLkdPZGVzbGFuaURsZyhtYWluQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIEhyb21hZG5lOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmNsZWFuKCk7IC8vT2RzdHJhbmltZSBzZXJ2ZXJvdmUgcHJvc3RyZWRreSBhc3luYy4gdWxvaHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtYWluQ29udGVudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgbm90KTsgLy9PZHN0cmFuaW1lIG5vdGlmaWthY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGF0Lm5hdmlnYXRlKCdHb3JkaWMuRGRwLldlYkNsaWVudC5HVnltYWhhbmknLCB7IElEOiAnRERQR1ByZWhsZWRWeW1haGFuaSMnLCBLb250cm9sYURkcEluaXR1OiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGF0Lm5hdmlnYXRlKFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5bWFoYW5pXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBXZmwuRGlhbG9ncy5HT2Rlc2xhbmlEbGcobWFpbkNvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSHJvbWFkbmU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFuKCk7IC8vT2RzdHJhbmltZSBzZXJ2ZXJvdmUgcHJvc3RyZWRreSBhc3luYy4gdWxvaHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluQ29udGVudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgbm90KTsgLy9PZHN0cmFuaW1lIG5vdGlmaWthY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKCdHb3JkaWMuRGRwLldlYkNsaWVudC5HVnltYWhhbmknLCB7IElEOiAnRERQR1ByZWhsZWRWeW1haGFuaSMnLCBLb250cm9sYURkcEluaXR1OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm90LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIkVsLiBvYnJhenkgYnlseSDDunNwxJvFoW7EmyB2eWdlbmVyb3bDoW55IGEgamUgbW/Fvm7DqSBqZSBvZGVzbGF0IGRvIHbDvXByYXZueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogc2hvd1Jlc3VsdEFjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IFt7IGFjdGlvbjogc2hvd1Jlc3VsdEFjdCB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gUmVkaXN0cmlidWNlXHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdHJhY2UgYXN5bmNocm9ubsOtIGZ1bmtjZSBwcm8gcmVkaXN0cmlidWNpIHDFmcOtcGFkxa9cclxuICAgICAgICAgICAgYXN5bmNDbGFzc05hbWUgPSBcIkdvcmRpYy5EZHAuU2VydmVyLkxLLkFzeW5jLkdEZHBSZWRpc3RyaWJ1Y2VBc3luY1Rhc2tcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdHJhY2UgdWTDoWxvc3TDrVxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAub248QXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLkR0by5Db21tb24uR1Z5c2xlZGVrRHRvPihcImNoYW5nZVwiLCBhc3luY0NsYXNzTmFtZSwgZnVuY3Rpb24gKCkgeyB0aGF0LlRhc2tDaGFuZ2UodGhpcykgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImRvbmVcIiwgYXN5bmNDbGFzc05hbWUsIGZ1bmN0aW9uICgpIHsgdGhhdC5UYXNrRG9uZSh0aGlzLCB0aGF0LCBcImFjdFZ5c2xlZGVrUmVkaXN0XCIpIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJmYWlsXCIsIGFzeW5jQ2xhc3NOYW1lLCB0aGF0LlRhc2tGYWlsKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiYWx3YXlzXCIsIGFzeW5jQ2xhc3NOYW1lLCBmdW5jdGlvbiAoKSB7IHRoYXQuVGFza0Fsd2F5cyh0aGlzKSB9KVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBIcm9tYWRuw6kgYWtjZSBuYSBzZXpuYW11IHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdHJhY2UgYXN5bmNocm9ubsOtIGZ1bmtjZSBwcm8gaHJvbWFkbsOpIGFrY2UgbmEgc2V6bmFtdSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICBhc3luY0NsYXNzTmFtZSA9IFwiR29yZGljLkRkcC5TZXJ2ZXIuTEsuQXN5bmMuR0RkcEhyb21hZG5lQWtjZVZ5bUFzeW5jVGFza1wiO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVnaXN0cmFjZSB1ZMOhbG9zdMOtXHJcbiAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXJcclxuICAgICAgICAgICAgICAgIC5vbjxBc3luYy5JR1Rhc2tQcm9ncmVzcywgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNvbW1vbi5HVnlzbGVkZWtEdG8+KFwiY2hhbmdlXCIsIGFzeW5jQ2xhc3NOYW1lLCBmdW5jdGlvbiAoKSB7IHRoYXQuVGFza0NoYW5nZSh0aGlzKSB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZG9uZVwiLCBhc3luY0NsYXNzTmFtZSwgZnVuY3Rpb24gKCkgeyB0aGF0LlRhc2tEb25lKHRoaXMsIHRoYXQsIFwiYWN0VnlzbGVkZWtIcm9tQWtjZVZ5bVwiKSB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZmFpbFwiLCBhc3luY0NsYXNzTmFtZSwgZnVuY3Rpb24gKCkgeyB0aGF0LlRhc2tGYWlsKHRoaXMpIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJhbHdheXNcIiwgYXN5bmNDbGFzc05hbWUsIGZ1bmN0aW9uICgpIHsgdGhhdC5UYXNrQWx3YXlzKHRoaXMpIH0pO1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBIcm9tYWRuw6kgYWtjZSBuYSBST0JcclxuICAgICAgICAgICAgLy8gUmVnaXN0cmFjZSBhc3luY2hyb25uw60gZnVua2NlIHBybyBocm9tYWRuw6kgYWtjZSBuYSBST0JcclxuICAgICAgICAgICAgYXN5bmNDbGFzc05hbWUgPSBcIkdvcmRpYy5EZHAuU2VydmVyLkxLLkFzeW5jLkdEZHBIcm9tQWtjZVJPQkFzeW5jVGFza1wiO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVnaXN0cmFjZSB1ZMOhbG9zdMOtXHJcbiAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXJcclxuICAgICAgICAgICAgICAgIC5vbjxBc3luYy5JR1Rhc2tQcm9ncmVzcywgR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuRHRvLkNvbW1vbi5HVnlzbGVkZWtEdG8+KFwiY2hhbmdlXCIsIGFzeW5jQ2xhc3NOYW1lLCBmdW5jdGlvbiAoKSB7IHRoYXQuVGFza0NoYW5nZSh0aGlzKSB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZG9uZVwiLCBhc3luY0NsYXNzTmFtZSwgZnVuY3Rpb24gKCkgeyB0aGF0LlRhc2tEb25lKHRoaXMsIHRoYXQsIFwiYWN0VnlzbGVkZWtIcm9tQWtjZVJPQlwiKSB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZmFpbFwiLCBhc3luY0NsYXNzTmFtZSwgZnVuY3Rpb24gKCkgeyB0aGF0LlRhc2tGYWlsKHRoaXMpIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJhbHdheXNcIiwgYXN5bmNDbGFzc05hbWUsIGZ1bmN0aW9uICgpIHsgdGhhdC5UYXNrQWx3YXlzKHRoaXMpIH0pO1xyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBIcm9tYWRuw6kgc3Byw6F2Y292w6Fuw61cclxuICAgICAgICAgICAgLy8gUmVnaXN0cmFjZSBhc3luY2hyb25uw60gZnVua2NlIHBybyBocm9tYWRuw6kgc3Byw6F2Y292w6Fuw60gcG9obGVkw6F2ZWtcclxuICAgICAgICAgICAgYXN5bmNDbGFzc05hbWUgPSBcIkdvcmRpYy5EZHAuU2VydmVyLkxLLkFzeW5jLkdEZHBIcm9tU3ByQXN5bmNUYXNrXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWdpc3RyYWNlIHVkw6Fsb3N0w61cclxuICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlclxyXG4gICAgICAgICAgICAgICAgLm9uPEFzeW5jLklHVGFza1Byb2dyZXNzLCBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5EdG8uQ29tbW9uLkdWeXNsZWRla0R0bz4oXCJjaGFuZ2VcIiwgYXN5bmNDbGFzc05hbWUsIGZ1bmN0aW9uICgpIHsgdGhhdC5UYXNrQ2hhbmdlKHRoaXMpIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJkb25lXCIsIGFzeW5jQ2xhc3NOYW1lLCBmdW5jdGlvbiAoKSB7IHRoYXQuVGFza0RvbmUodGhpcywgdGhhdCwgXCJhY3RWeXNsZWRla0hyb21TcHJcIikgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImZhaWxcIiwgYXN5bmNDbGFzc05hbWUsIGZ1bmN0aW9uICgpIHsgdGhhdC5UYXNrRmFpbCh0aGlzKSB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiYWx3YXlzXCIsIGFzeW5jQ2xhc3NOYW1lLCBmdW5jdGlvbiAoKSB7IHRoYXQuVGFza0Fsd2F5cyh0aGlzKSB9KTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEFzeW5jIFRhc2t5IC0gQ2hhbmdlL0RvbmUvRmFpbC9BbHdheXNcclxuICAgICAgICBUYXNrQ2hhbmdlKHRhc2s6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBEZWZhdWx0bsOtIGhvZG5vdHkgcHJvIG5vdGlmaWthY2lcclxuICAgICAgICAgICAgdmFyIGlkID0gXCJhc3luY1Rhc2tcIjtcclxuICAgICAgICAgICAgdmFyIHRpdGxlID0gXCJBc3luY2hyb25uw60gw7psb2hhXCI7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gXCJQcm9iw61ow6EgYXN5bmNocm9ubsOtIMO6bG9oYVwiO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5hemV2QWtjZSA9IHRhc2suY3VzdG9tRHRvLm5hemV2QWtjZTtcclxuICAgICAgICAgICAgdmFyIHRleHR5ID0gQ29tbW9uLkJhc2UudGV4dHlBa2NpKG5hemV2QWtjZSk7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0eSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gdGV4dHkuaWQ7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSA9IHRleHR5LnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHR5LmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHByb2dyZXNzID0gdGFzay5wcm9ncmVzc1xyXG4gICAgICAgICAgICB2YXIgbm90aWYgPSBjbnQubm90aWZpY2F0aW9uKFwiZmluZEJ5SWRcIiwgaWQpXHJcbiAgICAgICAgICAgIGlmIChub3RpZiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsICAvLyBwb8WhbHUgbm90aWZpa2FjaVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUgPz8gXCJBc3luY2hyb25uw60gYWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0ZXh0ID8/IFwiUHJvYsOtaMOhIGFzeW5jaHJvbm7DrSBha2NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYXJyb3ctcmlnaHQgIGctc3RhdGUtdGV4dCBnLXN0YXRlLWluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgfS8qLCB0cnVlKi8pO1xyXG5cclxuICAgICAgICAgICAgICAgIG5vdGlmID0gY250Lm5vdGlmaWNhdGlvbihcImZpbmRCeUlkXCIsIGlkKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub3RpZj8udXBkYXRlKHsgcHJvZ3Jlc3M6IHByb2dyZXNzIGFzIFJlcXVpcmVkPEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcz4gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYXNrRG9uZSh0YXNrOiBhbnksIG1haW5Db250ZW50OiBhbnksIGFrY2U6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgY250ID0gJC5jb250ZW50KCk7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gRGVmYXVsdG7DrSBob2Rub3R5IHBybyBub3RpZmlrYWNpXHJcbiAgICAgICAgICAgIHZhciBpZCA9IFwidnlzbGVkZWtBc3luY1Rhc2tcIjtcclxuICAgICAgICAgICAgdmFyIHRpdGxlID0gXCJBc3luY2hyb25uw60gw7psb2hhXCI7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gXCJEb2tvbsSNZW5hIGFzeW5jaHJvbm7DrSDDumxvaGFcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBuYXpldkFrY2UgPSB0YXNrLmN1c3RvbUR0by5uYXpldkFrY2U7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0eSA9IENvbW1vbi5CYXNlLnRleHR5QWtjaShcIlZ5c2xlZGVrXCIgKyBuYXpldkFrY2UpO1xyXG4gICAgICAgICAgICBpZiAodGV4dHkgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZCA9IHRleHR5LmlkO1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgPSB0ZXh0eS50aXRsZTtcclxuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0eS5jb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgdGFzay5yZXN1bHQucHJpcGFkeSAhPT0gdW5kZWZpbmVkOlxyXG4gICAgICAgICAgICAgICAgICAgIG1haW5Db250ZW50LnZ5c2xlZGVrQXN5bmMgPSB0YXNrLnJlc3VsdC5wcmlwYWR5O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0YXNrLnJlc3VsdC5wcmlwYWR5VnltICE9PSB1bmRlZmluZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkNvbnRlbnQudnlzbGVkZWtBc3luYyA9IHRhc2sucmVzdWx0LnByaXBhZHlWeW07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IFxyXG4gICAgICAgICAgICAgICAgY2FzZSB0YXNrLnJlc3VsdC5wcmlwYWR5VnltRGV0YWlsICE9PSB1bmRlZmluZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkNvbnRlbnQudnlzbGVkZWtBc3luYyA9IHRhc2sucmVzdWx0LnByaXBhZHlWeW1EZXRhaWw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHRhc2sucmVzdWx0LnByaXBhZHlQcmVkYW5pICE9PSB1bmRlZmluZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkNvbnRlbnQudnlzbGVkZWtBc3luYyA9IHRhc2sucmVzdWx0LnByaXBhZHlQcmVkYW5pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0YXNrLnJlc3VsdC5wcmlwYWR5UHJldnpldGkgIT09IHVuZGVmaW5lZDpcclxuICAgICAgICAgICAgICAgICAgICBtYWluQ29udGVudC52eXNsZWRla0FzeW5jID0gdGFzay5yZXN1bHQucHJpcGFkeVByZXZ6ZXRpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB0YXNrLnJlc3VsdC5wcmlwYWR5Uk9CICE9PSB1bmRlZmluZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkNvbnRlbnQudnlzbGVkZWtBc3luYyA9IHRhc2sucmVzdWx0LnByaXBhZHlST0I7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hemV2QWtjZSA9PSBcIkhyb21Qb2RTYWJcIiB8fCBuYXpldkFrY2UgPT0gXCJIcm9tUHJpclwiKSB0aGlzLnByaXpuYWtST0IgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5wcml6bmFrUk9CID0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgcMWZw616bmFrdSBrb250cm9sbmlDaG9kUHJvYmVobCB2IEdST0JTZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICBtYWluQ29udGVudC5yZXNldEdST0JTZXpuYW1Lb250cm9sbmlDaG9kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG9kc3RyYW7DrW0gbm90aWZpa2FjaSwga3RlcsOhIGJ5bGEgdnl0dm/FmWVuYSBwxZlpIHNwdcWhdMSbbsOtIGFzeW5jaHJvbm7DrSBha2NlXHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgdGhpcy5yZW1vdmVWeXNsZWRla0lkKGlkKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbm90aWYgPSBjbnQubm90aWZpY2F0aW9uKFwiZmluZEJ5SWRcIiwgaWQpO1xyXG4gICAgICAgICAgICAvLyB6IG7Em2pha8OpaG8gZMWvdm9kdSBwcm9qZGUgVGFza0RvbmUgYSBUYXNrQWx3YXlzIHbDrWNla3LDoXQgKHBvIGRydWjDqW0gc3B1xaF0xJtuw60gYsSbxb7DrSB0YXRvIGFrY2UgMikgcG9rdWQgc2UgcHVzdMOtIGFzeW5jIGFrY2UgdsOtY2VrcsOhdCAocG8gZG9rb27EjWVuw60gc2Ugc3B1c3TDrSBvcMSbdClcclxuICAgICAgICAgICAgaWYgKG5vdGlmID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJhZGRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG1haW5Db250ZW50LmFjdGlvbnNbYWtjZV1cclxuICAgICAgICAgICAgICAgIH0sIHRydWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRhc2tGYWlsKHRhc2s6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgY250ID0gJC5jb250ZW50KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaWQgPSBcImFzeW5jVGFza1wiO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5hemV2QWtjZSA9IHRhc2suY3VzdG9tRHRvLm5hemV2QWtjZTtcclxuICAgICAgICAgICAgdmFyIHRleHR5ID0gQ29tbW9uLkJhc2UudGV4dHlBa2NpKG5hemV2QWtjZSk7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0eSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gdGV4dHkuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG9kc3RyYW7DrW0gbm90aWZpa2FjaSwga3RlcsOhIGJ5bGEgdnl0dm/FmWVuYSBwxZlpIHNwdcWhdMSbbsOtIGFzeW5jaHJvbm7DrSBha2NlXHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgaWQpO1xyXG5cclxuICAgICAgICAgICAgR0RsZy5zaG93RXhjZXB0aW9uKHRhc2suRXhjZXB0aW9uSW5mbyk7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZTogc3RyaW5nID0gXCJBc3luY2hyb25uw60gYWtjZSBuZXVzcMSbbGFcIjtcclxuICAgICAgICAgICAgbGV0IHRleHQ6IHN0cmluZyA9IFwiQ2h5YmE6XCIgKyB0YXNrLkV4Y2VwdGlvbkluZm8uYmFzZU1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgeyBzdGF0ZTogXCJlcnJvclwiLCB0aXRsZTogdGl0bGUsIGNvbnRlbnQ6IHRleHQsIGljb246IFwiZmEtdGltZXMtY2lyY2xlICBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCBkYXRlVGltZTogbmV3IERhdGUoKSB9LCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHRhc2suY2xhc3NOYW1lID09IFwiR29yZGljLkRkcC5TZXJ2ZXIuTEsuQXN5bmMuR0RkcEhyb21Ba2NlUk9CQXN5bmNUYXNrXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRHUk9CU2V6bmFtS29udHJvbG5pQ2hvZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYXNrQWx3YXlzKHRhc2s6IEdvcmRpYy5Bc3luYy5JR1Rhc2spIHtcclxuICAgICAgICAgICAgdGFzay5jbGVhbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVnltw6Fow6Fuw61cclxuICAgICAgICBUYXNrQ2hhbmdlVnltKHRhc2s6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgY250ID0gJC5jb250ZW50KCk7XHJcbiAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9IHRhc2sucHJvZ3Jlc3NcclxuICAgICAgICAgICAgdmFyIG5vdGlmID0gY250Lm5vdGlmaWNhdGlvbihcImZpbmRCeUlkXCIsIFwidnltYWhhbmlUYXNrXCIpXHJcbiAgICAgICAgICAgIGlmIChub3RpZiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsICAvLyBwb8WhbHUgbm90aWZpa2FjaVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidnltYWhhbmlUYXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlZ5bcOhaMOhbsOtIHDFmcOtcGFkxa8gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiUHJvYsOtaMOhIHZ5bcOhaMOhbsOtIHDFmcOtcGFkxa9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1hcnJvdy1yaWdodCAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlVGltZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgICB9LyosIHRydWUqLyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbm90aWYgPSBjbnQubm90aWZpY2F0aW9uKFwiZmluZEJ5SWRcIiwgXCJ2eW1haGFuaVRhc2tcIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm90aWY/LnVwZGF0ZSh7IHByb2dyZXNzOiBwcm9ncmVzcyBhcyBSZXF1aXJlZDxHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3M+IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFza0RvbmVWeW0odGFzazogYW55LCBtYWluQ29udGVudDogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBjbnQgPSAkLmNvbnRlbnQoKTsgLy8gY29udGVudCBqZSBwb3TFmWViYSB6w61za2F0IHRha3RvIC8vJC5jb250ZW50KCQoXCIuZ2NvbnRlbnRcIikubGFzdCgpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSBcIlNrb27EjWlsbyB2eW3DoWjDoW7DrVwiO1xyXG4gICAgICAgICAgICBsZXQgdGl0bGU6IHN0cmluZyA9IFwiRG9rb27EjWVubyB2eW3DoWjDoW7DrVwiO1xyXG4gICAgICAgICAgICBtYWluQ29udGVudC52eXNsZWRla0FzeW5jID0gdGFzay5yZXN1bHQucHJpcGFkeTtcclxuICAgICAgICAgICAgY250Lm5vdGlmaWNhdGlvbihcInJlbW92ZVwiLCBcInZ5bWFoYW5pVGFza1wiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBub3RpZiA9IGNudC5ub3RpZmljYXRpb24oXCJmaW5kQnlJZFwiLCBcInZ5c2xlZGVrVnltYWhhbmlUYXNrXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8geiBuxJtqYWvDqWhvIGTFr3ZvZHUgcHJvamRlIFRhc2tEb25lVnltIGEgVGFza0Fsd2F5c1Z5bSB2w61jZWtyw6F0IHBva3VkIHNlIHB1c3TDrSBhc3luYyBha2NlIHbDrWNla3LDoXQgKHBvIGRva29uxI1lbsOtIHNlIHNwdXN0w60gb3DEm3QpXHJcbiAgICAgICAgICAgIGlmIChub3RpZiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJ2eXNsZWRla1Z5bWFoYW5pVGFza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRlVGltZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBtYWluQ29udGVudC5hY3Rpb25zW1wiYWN0VnlzbGVkZWtWeW1haGFuaVwiXVxyXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFza0ZhaWxWeW0oX286IGFueSwgZXhjOiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IENvbnRlbnQgPSAkLmNvbnRlbnQoKTtcclxuXHJcbiAgICAgICAgICAgIEdEbGcuc2hvd0V4Y2VwdGlvbihleGMuZXhjZXB0aW9uKTtcclxuICAgICAgICAgICAgbGV0IHRpdGxlOiBzdHJpbmcgPSBcIlZ5bcOhaMOhbsOtIG5ldXNwxJtsb1wiO1xyXG4gICAgICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gXCJDaHliYTpcIiArIGV4Yy5leGNlcHRpb24uYmFzZU1lc3NhZ2U7XHJcbiAgICAgICAgICAgIENvbnRlbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsIHsgdGl0bGU6IHRpdGxlLCBjb250ZW50OiB0ZXh0LCBpY29uOiBcImZhLXRpbWVzLWNpcmNsZSAgZy1zdGF0ZS10ZXh0IGctc3RhdGUtZXJyb3JcIiwgZGF0ZVRpbWU6IG5ldyBEYXRlKCkgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBOYXN0YXZlbsOtIHDFmcOtem5ha3UgdGlza3VcclxuICAgICAgICBUYXNrQ2hhbmdlUHJpelRpc2sodGFzazogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSAkLmNvbnRlbnQoKTtcclxuICAgICAgICAgICAgdmFyIHByb2dyZXNzID0gdGFzay5wcm9ncmVzc1xyXG4gICAgICAgICAgICB2YXIgbm90aWYgPSBjbnQubm90aWZpY2F0aW9uKFwiZmluZEJ5SWRcIiwgXCJuYXN0YXZlbmlQcml6VGlza1Rhc2tcIilcclxuICAgICAgICAgICAgaWYgKG5vdGlmID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgIC8vIHBvxaFsdSBub3RpZmlrYWNpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJuYXN0YXZlbmlQcml6VGlza1Rhc2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTmFzdGF2ZW7DrSBwxZnDrXpuYWt1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiUHJvYsOtaMOhIG5hc3RhdmVuw60gcMWZw616bmFrdSB0aXNrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWFycm93LXJpZ2h0ICBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0vKiwgdHJ1ZSovKTtcclxuXHJcbiAgICAgICAgICAgICAgICBub3RpZiA9IGNudC5ub3RpZmljYXRpb24oXCJmaW5kQnlJZFwiLCBcIm5hc3RhdmVuaVByaXpUaXNrVGFza1wiKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub3RpZj8udXBkYXRlKHsgcHJvZ3Jlc3M6IHByb2dyZXNzIGFzIFJlcXVpcmVkPEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcz4gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYXNrRG9uZVByaXpUaXNrKHRhc2s6IGFueSwgbWFpbkNvbnRlbnQ6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgY250ID0gJC5jb250ZW50KCk7IC8vIGNvbnRlbnQgamUgcG90xZllYmEgesOtc2thdCB0YWt0byAvLyQuY29udGVudCgkKFwiLmdjb250ZW50XCIpLmxhc3QoKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gXCJTa29uxI1pbG8gbmFzdGF2ZW7DrSBwxZnDrXpuYWt1IHRpc2t1XCI7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZTogc3RyaW5nID0gXCJEb2tvbsSNZW5vIG5hc3RhdmVuw61cIjtcclxuICAgICAgICAgICAgbWFpbkNvbnRlbnQudnlzbGVkZWtBc3luYyA9IHRhc2sucmVzdWx0LnByaXBhZHlWeW07IFxyXG4gICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwicmVtb3ZlXCIsIFwibmFzdGF2ZW5pUHJpelRpc2tUYXNrXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG5vdGlmID0gY250Lm5vdGlmaWNhdGlvbihcImZpbmRCeUlkXCIsIFwidnlzbGVkZWtOYXN0YXZlbmlQcml6VGlza1Rhc2tcIik7XHJcblxyXG4gICAgICAgICAgICAvLyB6IG7Em2pha8OpaG8gZMWvdm9kdSBwcm9qZGUgdsOtY2VrcsOhdCBwb2t1ZCBzZSBwdXN0w60gYXN5bmMgYWtjZSB2w61jZWtyw6F0ICh0ai4gcG8gZG9rb27EjWVuw60gc2Ugc3B1c3TDrSBvcMSbdClcclxuICAgICAgICAgICAgaWYgKG5vdGlmID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJhZGRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInZ5c2xlZGVrTmFzdGF2ZW5pUHJpelRpc2tUYXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG1haW5Db250ZW50LmFjdGlvbnNbXCJhY3RWeXNsZWRla05hc3RhdmVuaVByaXpUaXNrXCJdXHJcbiAgICAgICAgICAgICAgICB9LCB0cnVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYXNrRmFpbFByaXpUaXNrKF9vOiBhbnksIGV4YzogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBDb250ZW50ID0gJC5jb250ZW50KCk7XHJcblxyXG4gICAgICAgICAgICBHRGxnLnNob3dFeGNlcHRpb24oZXhjLmV4Y2VwdGlvbik7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZTogc3RyaW5nID0gXCJOYXN0YXZlbsOtIHDFmcOtem5ha3UgdGlza3UgbmV1c3DEm2xvXCI7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSBcIkNoeWJhOlwiICsgZXhjLmV4Y2VwdGlvbi5iYXNlTWVzc2FnZTtcclxuICAgICAgICAgICAgQ29udGVudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgeyB0aXRsZTogdGl0bGUsIGNvbnRlbnQ6IHRleHQsIGljb246IFwiZmEtdGltZXMtY2lyY2xlICBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCBkYXRlVGltZTogbmV3IERhdGUoKSB9LCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5hc3RhdmVuw60gcMWZw616bmFrdSBvZGVzbMOhbsOtXHJcbiAgICAgICAgVGFza0NoYW5nZVByaXpPZGVzbCh0YXNrOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIGNudCA9ICQuY29udGVudCgpO1xyXG4gICAgICAgICAgICB2YXIgcHJvZ3Jlc3MgPSB0YXNrLnByb2dyZXNzXHJcbiAgICAgICAgICAgIHZhciBub3RpZiA9IGNudC5ub3RpZmljYXRpb24oXCJmaW5kQnlJZFwiLCBcIm5hc3RhdmVuaVByaXpPZGVzbFRhc2tcIilcclxuICAgICAgICAgICAgaWYgKG5vdGlmID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgIC8vIHBvxaFsdSBub3RpZmlrYWNpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJuYXN0YXZlbmlQcml6T2Rlc2xUYXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5hc3RhdmVuw60gcMWZw616bmFrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSBuYXN0YXZlbsOtIHDFmcOtem5ha3Ugb2Rlc2zDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWFycm93LXJpZ2h0ICBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0vKiwgdHJ1ZSovKTtcclxuXHJcbiAgICAgICAgICAgICAgICBub3RpZiA9IGNudC5ub3RpZmljYXRpb24oXCJmaW5kQnlJZFwiLCBcIm5hc3RhdmVuaVByaXpPZGVzbFRhc2tcIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm90aWY/LnVwZGF0ZSh7IHByb2dyZXNzOiBwcm9ncmVzcyBhcyBSZXF1aXJlZDxHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3M+IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFza0RvbmVQcml6T2Rlc2wodGFzazogYW55LCBtYWluQ29udGVudDogYW55KSB7XHJcbiAgICAgICAgICAgIGxldCBjbnQgPSAkLmNvbnRlbnQoKTsgLy8gY29udGVudCBqZSBwb3TFmWViYSB6w61za2F0IHRha3RvIC8vJC5jb250ZW50KCQoXCIuZ2NvbnRlbnRcIikubGFzdCgpKTtcclxuICAgICAgICAgICAgbGV0IHRleHQ6IHN0cmluZyA9IFwiU2tvbsSNaWxvIG5hc3RhdmVuw60gcMWZw616bmFrdSBvZGVzbMOhbsOtXCI7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZTogc3RyaW5nID0gXCJEb2tvbsSNZW5vIG5hc3RhdmVuw61cIjtcclxuICAgICAgICAgICAgbWFpbkNvbnRlbnQudnlzbGVkZWtBc3luYyA9IHRhc2sucmVzdWx0LnByaXBhZHlWeW07XHJcbiAgICAgICAgICAgIGNudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgXCJuYXN0YXZlbmlQcml6T2Rlc2xUYXNrXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5vdGlmID0gY250Lm5vdGlmaWNhdGlvbihcImZpbmRCeUlkXCIsIFwidnlzbGVkZWtOYXN0YXZlbmlQcml6T2Rlc2xUYXNrXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8geiBuxJtqYWvDqWhvIGTFr3ZvZHUgcHJvamRlIHbDrWNla3LDoXQgcG9rdWQgc2UgcHVzdMOtIGFzeW5jIGFrY2UgdsOtY2VrcsOhdCAodGouIHBvIGRva29uxI1lbsOtIHNlIHNwdXN0w60gb3DEm3QpXHJcbiAgICAgICAgICAgIGlmIChub3RpZiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJ2eXNsZWRla05hc3RhdmVuaVByaXpPZGVzbFRhc2tcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVRpbWU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbWFpbkNvbnRlbnQuYWN0aW9uc1tcImFjdFZ5c2xlZGVrTmFzdGF2ZW5pUHJpek9kZXNsXCJdXHJcbiAgICAgICAgICAgICAgICB9LCB0cnVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYXNrRmFpbFByaXpPZGVzbChfbzogYW55LCBleGM6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgQ29udGVudCA9ICQuY29udGVudCgpO1xyXG5cclxuICAgICAgICAgICAgR0RsZy5zaG93RXhjZXB0aW9uKGV4Yy5leGNlcHRpb24pO1xyXG4gICAgICAgICAgICBsZXQgdGl0bGU6IHN0cmluZyA9IFwiTmFzdGF2ZW7DrSBwxZnDrXpuYWt1IG9kZXNsw6Fuw60gbmV1c3DEm2xvXCI7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSBcIkNoeWJhOlwiICsgZXhjLmV4Y2VwdGlvbi5iYXNlTWVzc2FnZTtcclxuICAgICAgICAgICAgQ29udGVudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgeyB0aXRsZTogdGl0bGUsIGNvbnRlbnQ6IHRleHQsIGljb246IFwiZmEtdGltZXMtY2lyY2xlICBnLXN0YXRlLXRleHQgZy1zdGF0ZS1lcnJvclwiLCBkYXRlVGltZTogbmV3IERhdGUoKSB9LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogWm3Em27DrSAndnlzbGVkZWtJRCcgbmEgJ0lEJ1xyXG4gICAgICAgICogQHBhcmFtIGlkXHJcbiAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcmVtb3ZlVnlzbGVkZWtJZChpZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgLy92eXNsZWRla1Z5c2xlZGVrTmFzdGF2ZW5pU3RhdnVUaXNrdUFPZGVzbGFuaVRhc2tcclxuICAgICAgICAgICAgLy9uYXN0YXZlbmlTdGF2dVRpc2t1QU9kZXNsYW5pVGFza1xyXG4gICAgICAgICAgICBpZiAoIWlkKSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgaWYgKGlkLnN0YXJ0c1dpdGgoXCJ2eXNsZWRla1wiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdCA9IGlkLnNsaWNlKFwidnlzbGVkZWtcIi5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3QubGVuZ3RoID09PSAwKSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gcmVzdC5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdCArIHJlc3Quc2xpY2UoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBSZXNldHMgdGhlIGtvbnRyb2xuaUNob2RQcm9iZWhsIGZsYWcgaW4gYWxsIEdST0JTZXpuYW0gaW5zdGFuY2VzXHJcbiAgICAgICAgKi9cclxuICAgICAgICByZXNldEdST0JTZXpuYW1Lb250cm9sbmlDaG9kKCkge1xyXG4gICAgICAgICAgICAvLyBaw61za8OhbsOtIFJPQlNlem5hbXUgcMWZZXogd2luZG93L2dsb2JhbCByZWdpc3RyeSBcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICgod2luZG93IGFzIGFueSkuR1JPQlNlem5hbUluc3RhbmNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlcyA9ICh3aW5kb3cgYXMgYW55KS5HUk9CU2V6bmFtSW5zdGFuY2VzIGFzIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdST0JTZXpuYW1bXTtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZXMuZm9yRWFjaChpbnN0YW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZSAmJiB0eXBlb2YgaW5zdGFuY2Uuc2V0S29udHJvbG5pQ2hvZFByb2JlaGwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldEtvbnRyb2xuaUNob2RQcm9iZWhsKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDb3VsZCBub3QgcmVzZXQgR1JPQlNlem5hbSBpbnN0YW5jZXMgdmlhIGdsb2JhbCByZWdpc3RyeTpcIiwgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=