"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Fuc;
    (function (Fuc) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            function MainAppFuc(content) {
                // TODO: přesunout sem vybraný obsah z onContentReady níže jako jsou asynchronní úlohy
            }
            WebClient.MainAppFuc = MainAppFuc;
            /**
             * Hlavní content FUC
             *
             * @author Martin Boček
             * @since 484.1.0.15
             */
            let GMainApp = class GMainApp extends Gordic.GContentBase {
                onContentReady() {
                    const content = this;
                    // resolver pro PID případu do obecného hledacího políčka
                    $("body").gsearchable("add", new Gordic.Fuc.WebClient.GIxpUprSearchResolver());
                    // resolver pro hledání VS do obecného hledacího políčka
                    $('body').gsearchable('add', new Gordic.Search.Fuc.GFucVsSearchResolver());
                    // WFL resolver pro hledání pidu do obecného hledacího políčka včetně dalších WFL hledání
                    // TODO: pokud by nemělo být dostupné ostatní WFL hledání, tak by se musela použít metoda registerPidSearchResolver místo registerSearchResolvers
                    Gordic.Wfl.Utils.registerSearchResolvers({
                        pidSearchResolverParams: {
                            openDetail: (ixsInfo) => {
                                // zobrazení detailů podle toho, o jaký typ jde
                                // TODO: dodělat historii účtování a podívat se, jestli jsou řešeny i další entity jako pohyby a podobně - nebo to je v jiné metodě?
                                if (ixsInfo.CoJsemZac === 401 /* Wfl.Interface.GIdentifikatorCoJsemZac.SoupiskaPohybu */) {
                                    // soupiska pohybů
                                    return content.isl.FinPohybSoupiska.read({ ixp: ixsInfo.Ixx1, fragments: ["Base" /* Fuc.Interface.GSoupiskaDtoFragments.ixp_den */] })
                                        .getData()
                                        .then(function (data) {
                                        if (data?.ixp_den) {
                                            let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, data.ixp_den);
                                            content.navigate(["Gordic.Fuc.WebClient.GDetailSoupisky", { gpc: newGpc }], {
                                                ID: 'DetailSoupisky#',
                                                Ixp: ixsInfo.Ixx1,
                                                IxpDen: data.ixp_den
                                            });
                                            return $.Deferred().resolve(true);
                                        }
                                        else
                                            return $.Deferred().resolve(false);
                                    });
                                }
                                else if (ixsInfo.CoJsemZac === 402 /* Wfl.Interface.GIdentifikatorCoJsemZac.ZapoctovyList */) {
                                    // zápočtový list
                                    return content.isl.ZapoctovyList.read({ ixp: ixsInfo.Ixx1, fragments: ["Base" /* Fuc.Interface.GZapoctovyListDtoFragments.ixp_den */] })
                                        .getData()
                                        .then(function (data) {
                                        if (data?.ixp_den) {
                                            let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, data.ixp_den);
                                            content.navigate(["Gordic.Fuc.WebClient.GDetailZapoctovehoListu", { gpc: newGpc }], {
                                                ID: 'DetailZapoctovehoListu#',
                                                Ixp: ixsInfo.Ixx1,
                                                IxpDen: data.ixp_den
                                            });
                                            return $.Deferred().resolve(true);
                                        }
                                        else
                                            return $.Deferred().resolve(false);
                                    });
                                    //return $.Deferred<boolean>().resolve(true).promise();
                                }
                                else if (ixsInfo.CoJsemZac === 400 /* Wfl.Interface.GIdentifikatorCoJsemZac.FinancniPripad */) {
                                    // případ
                                    content.navigate('Gordic.Fuc.WebClient.GDetailPripadu', {
                                        ID: 'DetailPripadu#',
                                        IxpUpr: ixsInfo.Ixx1
                                    });
                                    return $.Deferred().resolve(true).promise();
                                }
                                else {
                                    // neznámý typ
                                    return $.Deferred().resolve(false).promise();
                                }
                            }
                        }
                    });
                    // dashboard
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.BlogProvider()); //zapojení blogů
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.ArticleProvider()); //zapojení článků (uživatelsky editovatelný text)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.IslProvider()); //zapojení jakékoli dostupné ISL metody vracející seznam dat (je možné nastavit i volání detailu při kliknutí na položku)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RssProvider()); //zapojení RSS zpráv (včetně stránkování, vyhledávání a filtrování podle kategorií)           
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RestProvider()); //zapojení externích REST služeb
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.FileProvider()); //zapojení načítání dat ze souboru typu JSON, který je vložen do složky Data v adresáři aplikace
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.XrgServiceProvider()); //zapojení načítání dat ze XRG služby uvedené ve web.config spolu s nastavenými přístupovými údaji
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.DataReportProvider()); //zapojení sestav
                    // vlastní providery
                    // počty pohybů k účtování
                    if (WebClient.FucDashboard.jePovolenoUctovani(content))
                        Gordic.Dashboard.CustomProviders.register(WebClient.FucDashboard.createProviderPoctyPohybuKUctovani(content));
                    // počty zápočtových listů
                    if (WebClient.FucDashboard.jePovolenZapoctovyList(content))
                        Gordic.Dashboard.CustomProviders.register(WebClient.FucDashboard.createProviderPoctyZapoctovychListuKeSchvaleni(content));
                    // počty mylných plateb
                    if (WebClient.FucDashboard.jePovolenaMylnaPlatby(content))
                        Gordic.Dashboard.CustomProviders.register(WebClient.FucDashboard.createProviderPoctyMylnychPlatebKLikvidaci(content));
                    // počty soupisek
                    if (WebClient.FucDashboard.jePovolenaSoupiska(content))
                        Gordic.Dashboard.CustomProviders.register(WebClient.FucDashboard.createProviderPoctySoupisekKeSchvaleni(content));
                    // poslední záznamy
                    // poslední účtování
                    if (WebClient.FucDashboard.jePovolenoUctovani(content))
                        Gordic.Dashboard.CustomProviders.register(WebClient.FucDashboard.createProviderPosledniUctovani(content));
                    // poslední změněné zápočtové listy
                    if (WebClient.FucDashboard.jePovolenZapoctovyList(content))
                        Gordic.Dashboard.CustomProviders.register(WebClient.FucDashboard.createProviderPosledniZapoctoveListy(content));
                    // poslední změněné soupisky
                    if (WebClient.FucDashboard.jePovolenaSoupiska(content))
                        Gordic.Dashboard.CustomProviders.register(WebClient.FucDashboard.createProviderPosledniSoupisky(content));
                    // Obsluha asynchronního účtování
                    // TODO: zápisy do konzole jsou (zatím) zakomentovány
                    //let that = this;
                    Gordic.Async.GTaskManager
                        .off(".FucUct")
                        // TODO: obsluha init zrušena a přesunuta do change - bude ale potřeba to odladit s permanetními úlohami
                        //.on("init.FucUct", "Gordic.Fuc.Server.GUctovaniAsync", function (o, result) {
                        //    //console.log("GUctovaniAsync init  ", this.id, result);
                        //    //let notifikace_Uct = new GObservableObject({
                        //    //    title: "Informace",
                        //    //    icon: "gi-generate",//"gi-generate|gi-list gi-stack-pos--rb",
                        //    //    content: "Probíhá účtování pohybů",
                        //    //    //state: "info"
                        //    //});
                        //    //that.notification("add", notifikace_Uct, true);
                        //    //this.setNotification(notifikace_Uct);
                        //})
                        // change není potřeba obsluhovat, protože se informace o progresu aktualizuje automaticky
                        .on("change.FucUct", "Gordic.Fuc.Server.GUctovaniAsync", function (o) {
                        //console.log("GUctovaniAsync change  ", this.id, o);
                        let notifikace_Uct = this.getNotification();
                        if (!notifikace_Uct) {
                            notifikace_Uct = new GObservableObject({
                                title: "Informace",
                                icon: "gi-generate", //"gi-generate|gi-list gi-stack-pos--rb",
                                content: "Probíhá účtování pohybů",
                                //state: "info"
                            });
                            content.notification("add", notifikace_Uct, true);
                            this.setNotification(notifikace_Uct);
                        }
                        //if (o.progress) {
                        //    let notifikace_Uct = this.getNotification()
                        //    notifikace_Uct.update({
                        //        progress: {
                        //            current: o.progress.current,
                        //            total: o.progress.total!,
                        //            text: o.progress.text,
                        //        },
                        //        //title: "OK",
                        //        //icon: "gi-generate|gi-list gi-stack-pos--rb",
                        //        //content: this.customDto.o_hlaska + " - Úspěšně provedeno!!!"
                        //    });
                        //}
                    })
                        .on("done.FucUct", "Gordic.Fuc.Server.GUctovaniAsync", function (o, result) {
                        //console.log("GUctovaniAsync done  ", this.id, result);
                        //that.notification("add", { title: "OK", icon: "fa-globe", content: result.o_hlaska + " - Úspěšně provedeno!!!" }, true);
                        let ixsHuf = "";
                        const task = this;
                        result.forEach(r => ixsHuf = r.ixsHuf ?? ixsHuf);
                        let notifikace_Uct = this.getNotification();
                        notifikace_Uct.update({
                            //id: id,
                            title: "Účtování pohybů dokončeno",
                            content: "",
                            icon: "fa-check-circle",
                            state: "success",
                            //commandBar: [{
                            //    action: new GAction($.extend({ name: "actVysledek" },
                            //        Gordic.Eko.Action.actionZauctovat({
                            //            caption: "Výsledek",
                            //            run: function (p1, p2, p3) {
                            //                let xxx = p1;
                            //                let yyy = p2;
                            //                let zzz = p3;
                            //            }
                            //        }))),
                            //    primary: true,
                            //}],
                            defaultAction: new GAction({
                                name: "actVysledek",
                                run: () => {
                                    // odstranění notifikace
                                    content.notification("remove", notifikace_Uct);
                                    // vymazání informace o úloze
                                    task.clean();
                                    // zobrazení výsledku účtování
                                    content.openUctovani(ixsHuf);
                                }
                            })
                        });
                    })
                        .on("inactive.FucUct", "Gordic.Uka.Server.GServerAsyncTask", function (o) {
                        const notifikace_Uct = this.getNotification();
                        notifikace_Uct.update({
                            // TODO: dodělat lepší hlášku (účtování je nutné spustit znovu a případně tohle bude nutné servisně "posunout")
                            content: "Tato úloha je neaktivní a nelze ji opětovně nastartovat",
                            state: "warning"
                        });
                        o.handled = true;
                    })
                        .on("fail.FucUct", "Gordic.Fuc.Server.GUctovaniAsync", function (o, exc) {
                        //console.log("GUctovaniAsync fail  ", this.id, exc);
                        //that.notification("add", { title: "Chyba", icon: "fa-globe", content: exc.o_hlaska + " - Neúspěšně provedeno!!!" }, true);
                        const ixsHuf = exc?.exception?.data?.ixs_huf ?? "";
                        const task = this;
                        //ixsHuf = exc?.data?.precerpani ?? "";
                        //result.forEach(r => ixsHuf = r.ixsHuf ?? ixsHuf);
                        let notifikace_Uct = this.getNotification();
                        notifikace_Uct.update({
                            title: "Účtování pohybů přerušeno",
                            content: "Chyba: " + exc.exception.baseMessage,
                            icon: "fa-times-circle",
                            state: "error",
                            defaultAction: ixsHuf
                                ? new GAction({
                                    name: "actVysledek",
                                    run: () => {
                                        // odstranění notifikace
                                        content.notification("remove", notifikace_Uct);
                                        // vymazání informace o úloze
                                        task.clean();
                                        // zobrazení výsledku účtování
                                        content.openUctovani(ixsHuf);
                                    }
                                })
                                : undefined
                        });
                        // TODO: zobrazovat chybu takhle vždy?
                        //GDlg.showException(exc.exception);
                        // vymazání informace o úloze
                        this.clean();
                    })
                        .on("always.FucUct", "Gordic.Fuc.Server.GUctovaniAsync", function () {
                        //console.log("GUctovaniAsync always", this.id);
                        //this.clean();
                    });
                    // Obsluha asynchronní aktualizace názvů kontací a knih
                    Gordic.Async.GTaskManager
                        .off(".FucAktNaz")
                        // change není potřeba obsluhovat, protože se informace o progresu aktualizuje automaticky
                        .on("change.FucAktNaz", "Gordic.Fuc.Server.GPomocneAsync", function (o) {
                        let notifikace_AktNaz = this.getNotification();
                        if (!notifikace_AktNaz) {
                            notifikace_AktNaz = new GObservableObject({
                                title: "Informace",
                                icon: "gi-generate", //"gi-generate|gi-list gi-stack-pos--rb",
                                content: "Probíhá aktualizace názvů kontací a knih",
                                //state: "info"
                            });
                            content.notification("add", notifikace_AktNaz, true);
                            this.setNotification(notifikace_AktNaz);
                        }
                    })
                        .on("done.FucAktNaz", "Gordic.Fuc.Server.GPomocneAsync", function (o, result) {
                        const task = this;
                        let notifikace_AktNaz = this.getNotification();
                        notifikace_AktNaz.update({
                            //id: id,
                            title: "Aktualizace názvů kontací a knih dokončena",
                            content: "",
                            icon: "fa-check-circle",
                            state: "success",
                            defaultAction: new GAction({
                                name: "actVysledek",
                                run: () => {
                                    // odstranění notifikace
                                    content.notification("remove", notifikace_AktNaz);
                                    // vymazání informace o úloze
                                    task.clean();
                                }
                            })
                        });
                    })
                        .on("fail.FucAktNaz", "Gordic.Fuc.Server.GPomocneAsync", function (o, exc) {
                        let notifikace_AktNaz = this.getNotification();
                        notifikace_AktNaz.update({
                            title: "Aktualizace názvů kontací a knih přerušena",
                            content: "Chyba: " + exc.exception.baseMessage,
                            icon: "fa-times-circle",
                            state: "error",
                            //defaultAction: new GAction({
                            //    name: "actVysledek",
                            //    run: () => {
                            //        // odstranění notifikace
                            //        content.notification("remove", notifikace_AktNaz);
                            //        // vymazání informace o úloze
                            //        task.clean();
                            //    }
                            //})
                        });
                        // vymazání informace o úloze
                        this.clean();
                    })
                        .on("always.FucAktNaz", "Gordic.Fuc.Server.GPomocneAsync", function () {
                    });
                }
                /**
                 * Otevření historie účtování (pro klik výsledek asynchronního účtování)
                 *
                 * @param {string} ixsHuf ID historie účtování
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                openUctovani(ixsHuf) {
                    // okno historie účtování
                    if (ixsHuf) {
                        let $detailWindow = this.navigate("Gordic.Fuc.WebClient.GDetailHistorieUctovaniPohybu", {
                            ID: 'UctovaniPohybu#',
                            IxsHuf: ixsHuf
                        });
                        return $detailWindow.createDialogPromise();
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Aktualizace názvů kontací a knih
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                aktualizaceNazvu() {
                    let that = this;
                    return that.dialogs.confirmDangerous("jres:24100314", //RC 24100314 : Aktualizace názvů kontací a knih
                    // TODO: přidat odřádkování i do dalších confirmDangerous?
                    "jres:24100316") //RC 24100316 : Přejete si aktualizovat názvy kontací a knih uložených ve FUC podle primárních agend?;;Operace může trvat několik minut v závislosti na počtu záznamů v příslušných agendách.;;Informace o dokončené aktualizaci bude zobrazena v centru notifikací.;;
                        .createDialogPromise(GDlg.mbbYes.id)
                        .then(function () {
                        // volání aktualizace
                        Gordic.Async.GTaskManager.start("Gordic.Fuc.Server.GPomocneAsync", {});
                        return;
                    });
                }
                /**
                 * Otevření uzávěrky agend
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                uzaverkaAgenda() {
                    let that = this;
                    const options = {
                        agenda: "FUC",
                        getData: () => { return this.isl.AgendaFuc.list().getData(); },
                        permissions: (TypAg) => this.isl.AgendaFuc.getPermissions({ typAg: TypAg[0].typ_ag ?? 330 }).get(),
                        close: (agendy) => this.isl.AgendaFuc.hromadneUzavri({
                            uzavrit: true,
                            rows: agendy != null ? (Array.isArray(agendy) ? agendy : [agendy]) : []
                        })
                            .get()
                            .then(function (res) {
                            let vyslText = "";
                            let chyba = false;
                            res.result.forEach(r => {
                                if (r.kind === 400 /* Gordic.Isl.GOperationResultKind.Error */)
                                    chyba = true;
                                r.errors.forEach(e => {
                                    if (vyslText)
                                        vyslText += "\n";
                                    vyslText += e.message;
                                });
                            });
                            if (vyslText) {
                                // zobrazení výsledku
                                if (chyba) {
                                    return that.dialogs.error("Uzávěrka agendy", vyslText)
                                        .createDialogPromise(() => false);
                                }
                                else {
                                    return that.dialogs.alert("Uzávěrka agendy", vyslText)
                                        .createDialogPromise();
                                }
                            }
                            else
                                return;
                        }),
                        // TODO: tato metoda se nikde nevolá - pokud by se volala, tak by bylo vhodné zavolat metodu zkontrolujPredUzavrenim
                        checkClose: (agendy) => $.Deferred().resolve(agendy).promise()
                    };
                    return this.navigateTask(Gordic.Eko.WebClient.GEkoAgenda, options);
                }
                /**
                 * Otevření uzávěrky knih
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                uzaverkaKnihy() {
                    // pomocná metoda pro převod výstupu ze serverových metod do tvaru pro průvodce
                    function resultToDtos(res) {
                        return res.result.map(r => {
                            let row = $.extend({}, r.data);
                            row["wiz_check"] = r.kind !== 400 /* Gordic.Isl.GOperationResultKind.Error */;
                            // info se přemapovává na success, protože průvodce neobsluhuje info
                            row["wiz_kind"] = r.kind == 203 /* Gordic.Isl.GOperationResultKind.Info */ ? 200 /* Gordic.Isl.GOperationResultKind.Success */ : r.kind;
                            let vyslText = "";
                            r.errors?.forEach(e => {
                                if (vyslText)
                                    vyslText += "\n";
                                vyslText += e.message;
                            });
                            // poznámka: || na rozdíl od ?? pořeší i ""
                            row["wiz_txt_err"] = vyslText || (r.kind !== 400 /* Gordic.Isl.GOperationResultKind.Error */
                                ? "Ok"
                                : "Chyba");
                            return row;
                        });
                    }
                    const options = {
                        getData: this.isl.KnihaFuc.list(),
                        permissions: () => this.isl.KnihaFuc.getServicePermissions().get(),
                        close: (knihy) => {
                            return this.isl.KnihaFuc.hromadneUzavri({
                                uzavrit: true,
                                rows: knihy
                            })
                                .get()
                                .then(function (res) {
                                return resultToDtos(res);
                            });
                        },
                        checkClose: (knihy) => {
                            return this.isl.KnihaFuc.zkontrolujPredUzavrenim({
                                uzavrit: true,
                                rows: knihy
                            })
                                .get()
                                .then(function (res) {
                                return resultToDtos(res);
                            });
                        },
                        cancelClose: (knihy) => {
                            return this.isl.KnihaFuc.hromadneUzavri({
                                uzavrit: false,
                                rows: knihy
                            })
                                .get()
                                .then(function (res) {
                                return resultToDtos(res);
                            });
                        },
                        checkCancelClose: (knihy) => {
                            return this.isl.KnihaFuc.zkontrolujPredUzavrenim({
                                uzavrit: false,
                                rows: knihy
                            })
                                .get()
                                .then(function (res) {
                                return resultToDtos(res);
                            });
                        }
                    };
                    return this.navigateTask(Gordic.Eko.WebClient.GEkoSeznamKnih, options);
                }
                /**
                 * Otevření kartotéky externích subjektů
                 */
                kartotekaEsu() {
                    let that = this;
                    let options = {
                        // Ucel: 2,
                        Logovani: {
                            Ixp: '0000X000004J',
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.kartotekaVMenuAplikace,
                            AktZnacka: "",
                            DuvodHledaniTxt: "",
                            InitialValueDuvodHledaniTxt: "jres:24100315" //RC 24100315 : Nahlížení z modulu FUC
                        }
                    };
                    return Gordic.Esu.Dialogs.KartotekaEsuDlgFromMain(that, options, Gordic.Global.Enums.ModOtevreni.navigate);
                }
                /**
                 * Evidence dokladu z redistribuce
                 *
                 * @param {{ pids: string[], typAg: number}} obj parametry
                 */
                evidenceDelegate(obj) {
                    // kontrola vstupních parametrů
                    if (obj.pids?.length > 1)
                        return this.dialogs.error("jres:24100348", //RC 24100348 : Dokumenty k evidenci
                        "jres:24100349" //RC 24100349 : Evidovat je možné pouze jeden dokument
                        ).createDialogPromise(() => false);
                    if (obj.pids?.length < 1)
                        return $.Deferred().reject().promise();
                    // TODO: bude potřeba nějaká další kontrola?
                    // výběr cílové knihy, podání a evidence
                    return Gordic.Eko.Components.DocsForReg.showEbooksChoice(this.element, obj.typAg /*330*/, {
                        [Fuc.Globals.Enums.TypAg.FUC]: [Fuc.Globals.Enums.KtgDen.Soupisky],
                        [Fuc.Globals.Enums.TypAg.BUC]: [Fuc.Globals.Enums.KtgDen.ZapoctoveListy]
                    })
                        .then((kniha) => {
                        let that = this;
                        if (kniha?.ktg_den === Gordic.Fuc.Globals.Enums.KtgDen.ZapoctoveListy) {
                            // evidence zápočtového listu
                            const noveGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, kniha.ixp_den);
                            // servisní content
                            let serviceContent = this.createServiceContent(["Gordic.Fuc.WebClient.GDetailZapoctovehoListu", { gpc: noveGpc }]);
                            // kontrola prvního dokladu v knize
                            return serviceContent.isl.ZapoctovyList.zkontrolujNaPrvniDokladVKnize({ ixpDen: kniha.ixp_den })
                                .get()
                                .then(function (textDotazu) {
                                // pokud kontrola vrátí dotaz, tak se zeptat, jestli má první doklad správné číslo, jinak je to ok
                                if (textDotazu)
                                    return that.dialogs.confirm("jres:24100320", textDotazu).createDialogPromise(GDlg.mbbYes.id); //RC 24100320 : Nový zápočtový list
                                else
                                    return;
                            })
                                .then(function () {
                                // podání
                                return serviceContent.isl.ZapoctovyList.create({
                                    ixp: obj.pids[0],
                                    ixp_den: kniha.ixp_den
                                }).get();
                            })
                                .then(function () {
                                // otevření detailu
                                return that.navigate(["Gordic.Fuc.WebClient.GDetailZapoctovehoListu", { gpc: noveGpc }], {
                                    ID: 'DetailZapoctovehoListu#',
                                    Ixp: obj.pids[0],
                                    IxpDen: kniha.ixp_den
                                });
                            })
                                .always(() => {
                                serviceContent.close();
                            });
                        }
                        else if (kniha?.ktg_den === Gordic.Fuc.Globals.Enums.KtgDen.Soupisky) {
                            // evidence soupisky
                            const noveGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, kniha.ixp_den);
                            // servisní content
                            let serviceContent = this.createServiceContent(["Gordic.Fuc.WebClient.GDetailSoupisky", { gpc: noveGpc }]);
                            // kontrola prvního dokladu v knize
                            return serviceContent.isl.FinPohybSoupiska.zkontrolujNaPrvniDokladVKnize({ ixpDen: kniha.ixp_den /*, subrada: that.SubradaDen*/ })
                                .get()
                                .then(function (textDotazu) {
                                // pokud kontrola vrátí dotaz, tak se zeptat, jestli má první doklad správné číslo, jinak je to ok
                                if (textDotazu)
                                    return that.dialogs.confirm("jres:24100321", textDotazu).createDialogPromise(GDlg.mbbYes.id); //RC 24100321 : Nová soupiska
                                else
                                    return;
                            })
                                .then(function () {
                                // podání
                                return serviceContent.isl.FinPohybSoupiska.create({
                                    ixp: obj.pids[0],
                                    ixp_den: kniha.ixp_den
                                }).get();
                            })
                                .then(function (data) {
                                // otevření detailu
                                return that.navigate(["Gordic.Fuc.WebClient.GDetailSoupisky", { gpc: noveGpc }], {
                                    ID: 'DetailSoupisky#',
                                    Ixp: obj.pids[0],
                                    IxpDen: kniha.ixp_den
                                });
                            })
                                .always(() => {
                                serviceContent.close();
                            });
                        }
                        else {
                            // jiné kategorie knihy
                            return $.Deferred().reject();
                        }
                    });
                }
            };
            GMainApp = __decorate([
                gcontent
            ], GMainApp);
            WebClient.GMainApp = GMainApp;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR01haW5BcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTWFpbkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBK2tCZjtBQS9rQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBK2tCbkI7SUEva0JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0Era0I3QjtRQS9rQm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DLFNBQWdCLFVBQVUsQ0FBQyxPQUFpQjtnQkFFeEMsc0ZBQXNGO1lBQzFGLENBQUM7WUFIZSxvQkFBVSxhQUd6QixDQUFBO1lBRUQ7Ozs7O2VBS0c7WUFFSCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFTLFNBQVEsT0FBQSxZQUFZO2dCQUMvQixjQUFjO29CQUNqQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRXJCLHlEQUF5RDtvQkFDekQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7b0JBQy9FLHdEQUF3RDtvQkFDeEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7b0JBQzNFLHlGQUF5RjtvQkFDekYsaUpBQWlKO29CQUNqSixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQzt3QkFDckMsdUJBQXVCLEVBQUU7NEJBQ3JCLFVBQVUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dDQUNwQiwrQ0FBK0M7Z0NBQy9DLG9JQUFvSTtnQ0FDcEksSUFBSSxPQUFPLENBQUMsU0FBUyxtRUFBeUQsRUFBRSxDQUFDO29D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QyxLQUFLLEVBQUUsQ0FBQzs0QkFDM0IsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsQ0FBQzs2QkFDSSxDQUFDOzRCQUNGLHVCQUF1Qjs0QkFDdkIsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2pDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQzthQUNKLENBQUE7WUEvakJZLFFBQVE7Z0JBRHBCLFFBQVE7ZUFDSSxRQUFRLENBK2pCcEI7WUEvakJZLGtCQUFRLFdBK2pCcEIsQ0FBQTtRQUNMLENBQUMsRUEva0JvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEra0I3QjtJQUFELENBQUMsRUEva0JnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEra0JuQjtBQUFELENBQUMsRUEva0JTLE1BQU0sS0FBTixNQUFNLFFBK2tCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuRnVjLldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBNYWluQXBwRnVjKGNvbnRlbnQ6IEdDb250ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IHDFmWVzdW5vdXQgc2VtIHZ5YnJhbsO9IG9ic2FoIHogb25Db250ZW50UmVhZHkgbsOtxb5lIGpha28ganNvdSBhc3luY2hyb25uw60gw7psb2h5XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIbGF2bsOtIGNvbnRlbnQgRlVDXHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gQm/EjWVrXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC4xNVxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTWFpbkFwcCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIHJlc29sdmVyIHBybyBQSUQgcMWZw61wYWR1IGRvIG9iZWNuw6lobyBobGVkYWPDrWhvIHBvbMOtxI1rYVxyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5nc2VhcmNoYWJsZShcImFkZFwiLCBuZXcgR29yZGljLkZ1Yy5XZWJDbGllbnQuR0l4cFVwclNlYXJjaFJlc29sdmVyKCkpO1xyXG4gICAgICAgICAgICAvLyByZXNvbHZlciBwcm8gaGxlZMOhbsOtIFZTIGRvIG9iZWNuw6lobyBobGVkYWPDrWhvIHBvbMOtxI1rYVxyXG4gICAgICAgICAgICAkKCdib2R5JykuZ3NlYXJjaGFibGUoJ2FkZCcsIG5ldyBHb3JkaWMuU2VhcmNoLkZ1Yy5HRnVjVnNTZWFyY2hSZXNvbHZlcigpKTtcclxuICAgICAgICAgICAgLy8gV0ZMIHJlc29sdmVyIHBybyBobGVkw6Fuw60gcGlkdSBkbyBvYmVjbsOpaG8gaGxlZGFjw61obyBwb2zDrcSNa2EgdsSNZXRuxJsgZGFsxaHDrWNoIFdGTCBobGVkw6Fuw61cclxuICAgICAgICAgICAgLy8gVE9ETzogcG9rdWQgYnkgbmVtxJtsbyBiw710IGRvc3R1cG7DqSBvc3RhdG7DrSBXRkwgaGxlZMOhbsOtLCB0YWsgYnkgc2UgbXVzZWxhIHBvdcW+w610IG1ldG9kYSByZWdpc3RlclBpZFNlYXJjaFJlc29sdmVyIG3DrXN0byByZWdpc3RlclNlYXJjaFJlc29sdmVyc1xyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLlV0aWxzLnJlZ2lzdGVyU2VhcmNoUmVzb2x2ZXJzKHtcclxuICAgICAgICAgICAgICAgIHBpZFNlYXJjaFJlc29sdmVyUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkRldGFpbDogKGl4c0luZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSBkZXRhaWzFryBwb2RsZSB0b2hvLCBvIGpha8O9IHR5cCBqZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9kxJtsYXQgaGlzdG9yaWkgw7rEjXRvdsOhbsOtIGEgcG9kw612YXQgc2UsIGplc3RsaSBqc291IMWZZcWhZW55IGkgZGFsxaHDrSBlbnRpdHkgamFrbyBwb2h5YnkgYSBwb2RvYm7EmyAtIG5lYm8gdG8gamUgdiBqaW7DqSBtZXRvZMSbP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhzSW5mby5Db0pzZW1aYWMgPT09IFdmbC5JbnRlcmZhY2UuR0lkZW50aWZpa2F0b3JDb0pzZW1aYWMuU291cGlza2FQb2h5YnUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdXBpc2thIHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50LmlzbC5GaW5Qb2h5YlNvdXBpc2thLnJlYWQoeyBpeHA6IGl4c0luZm8uSXh4MSwgZnJhZ21lbnRzOiBbRnVjLkludGVyZmFjZS5HU291cGlza2FEdG9GcmFnbWVudHMuaXhwX2Rlbl0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGE/Lml4cF9kZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdHcGMgPSBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoY29udGVudC5ncGMsIGRhdGEuaXhwX2Rlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxTb3VwaXNreVwiLCB7IGdwYzogbmV3R3BjIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxTb3VwaXNreSMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IGl4c0luZm8uSXh4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwRGVuOiBkYXRhLml4cF9kZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKS5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKS5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpeHNJbmZvLkNvSnNlbVphYyA9PT0gV2ZsLkludGVyZmFjZS5HSWRlbnRpZmlrYXRvckNvSnNlbVphYy5aYXBvY3RvdnlMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6w6Fwb8SNdG92w70gbGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlphcG9jdG92eUxpc3QucmVhZCh7IGl4cDogaXhzSW5mby5JeHgxLCBmcmFnbWVudHM6IFtGdWMuSW50ZXJmYWNlLkdaYXBvY3RvdnlMaXN0RHRvRnJhZ21lbnRzLml4cF9kZW5dIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhPy5peHBfZGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3R3BjID0gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKGNvbnRlbnQuZ3BjLCBkYXRhLml4cF9kZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsWmFwb2N0b3ZlaG9MaXN0dVwiLCB7IGdwYzogbmV3R3BjIH1dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxaYXBvY3RvdmVob0xpc3R1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBpeHNJbmZvLkl4eDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwRGVuOiBkYXRhLml4cF9kZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUodHJ1ZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl4c0luZm8uQ29Kc2VtWmFjID09PSBXZmwuSW50ZXJmYWNlLkdJZGVudGlmaWthdG9yQ29Kc2VtWmFjLkZpbmFuY25pUHJpcGFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZnDrXBhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5uYXZpZ2F0ZSgnR29yZGljLkZ1Yy5XZWJDbGllbnQuR0RldGFpbFByaXBhZHUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxQcmlwYWR1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cFVwcjogaXhzSW5mby5JeHgxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZSh0cnVlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXpuw6Ftw70gdHlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBkYXNoYm9hcmRcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuQmxvZ1Byb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBibG9nxa9cclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuQXJ0aWNsZVByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSDEjWzDoW5rxa8gKHXFvml2YXRlbHNreSBlZGl0b3ZhdGVsbsO9IHRleHQpXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLklzbFByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBqYWvDqWtvbGkgZG9zdHVwbsOpIElTTCBtZXRvZHkgdnJhY2Vqw61jw60gc2V6bmFtIGRhdCAoamUgbW/Fvm7DqSBuYXN0YXZpdCBpIHZvbMOhbsOtIGRldGFpbHUgcMWZaSBrbGlrbnV0w60gbmEgcG9sb8W+a3UpXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLlJzc1Byb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBSU1MgenByw6F2ICh2xI1ldG7EmyBzdHLDoW5rb3bDoW7DrSwgdnlobGVkw6F2w6Fuw60gYSBmaWx0cm92w6Fuw60gcG9kbGUga2F0ZWdvcmnDrSkgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5SZXN0UHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIGV4dGVybsOtY2ggUkVTVCBzbHXFvmViXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkZpbGVQcm92aWRlcigpKTsgLy96YXBvamVuw60gbmHEjcOtdMOhbsOtIGRhdCB6ZSBzb3Vib3J1IHR5cHUgSlNPTiwga3RlcsO9IGplIHZsb8W+ZW4gZG8gc2xvxb5reSBEYXRhIHYgYWRyZXPDocWZaSBhcGxpa2FjZVxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5YcmdTZXJ2aWNlUHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIG5hxI3DrXTDoW7DrSBkYXQgemUgWFJHIHNsdcW+YnkgdXZlZGVuw6kgdmUgd2ViLmNvbmZpZyBzcG9sdSBzIG5hc3RhdmVuw71taSBwxZnDrXN0dXBvdsO9bWkgw7pkYWppXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkRhdGFSZXBvcnRQcm92aWRlcigpKTsgLy96YXBvamVuw60gc2VzdGF2XHJcbiAgICAgICAgICAgIC8vIHZsYXN0bsOtIHByb3ZpZGVyeVxyXG4gICAgICAgICAgICAvLyBwb8SNdHkgcG9oeWLFryBrIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICBpZiAoRnVjRGFzaGJvYXJkLmplUG92b2xlbm9VY3RvdmFuaShjb250ZW50KSkgR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcnMucmVnaXN0ZXIoRnVjRGFzaGJvYXJkLmNyZWF0ZVByb3ZpZGVyUG9jdHlQb2h5YnVLVWN0b3ZhbmkoY29udGVudCkpO1xyXG4gICAgICAgICAgICAvLyBwb8SNdHkgesOhcG/EjXRvdsO9Y2ggbGlzdMWvXHJcbiAgICAgICAgICAgIGlmIChGdWNEYXNoYm9hcmQuamVQb3ZvbGVuWmFwb2N0b3Z5TGlzdChjb250ZW50KSkgR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcnMucmVnaXN0ZXIoRnVjRGFzaGJvYXJkLmNyZWF0ZVByb3ZpZGVyUG9jdHlaYXBvY3RvdnljaExpc3R1S2VTY2h2YWxlbmkoY29udGVudCkpO1xyXG4gICAgICAgICAgICAvLyBwb8SNdHkgbXlsbsO9Y2ggcGxhdGViXHJcbiAgICAgICAgICAgIGlmIChGdWNEYXNoYm9hcmQuamVQb3ZvbGVuYU15bG5hUGxhdGJ5KGNvbnRlbnQpKSBHb3JkaWMuRGFzaGJvYXJkLkN1c3RvbVByb3ZpZGVycy5yZWdpc3RlcihGdWNEYXNoYm9hcmQuY3JlYXRlUHJvdmlkZXJQb2N0eU15bG55Y2hQbGF0ZWJLTGlrdmlkYWNpKGNvbnRlbnQpKTtcclxuICAgICAgICAgICAgLy8gcG/EjXR5IHNvdXBpc2VrXHJcbiAgICAgICAgICAgIGlmIChGdWNEYXNoYm9hcmQuamVQb3ZvbGVuYVNvdXBpc2thKGNvbnRlbnQpKSBHb3JkaWMuRGFzaGJvYXJkLkN1c3RvbVByb3ZpZGVycy5yZWdpc3RlcihGdWNEYXNoYm9hcmQuY3JlYXRlUHJvdmlkZXJQb2N0eVNvdXBpc2VrS2VTY2h2YWxlbmkoY29udGVudCkpO1xyXG4gICAgICAgICAgICAvLyBwb3NsZWRuw60gesOhem5hbXlcclxuICAgICAgICAgICAgLy8gcG9zbGVkbsOtIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICBpZiAoRnVjRGFzaGJvYXJkLmplUG92b2xlbm9VY3RvdmFuaShjb250ZW50KSkgR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcnMucmVnaXN0ZXIoRnVjRGFzaGJvYXJkLmNyZWF0ZVByb3ZpZGVyUG9zbGVkbmlVY3RvdmFuaShjb250ZW50KSk7XHJcbiAgICAgICAgICAgIC8vIHBvc2xlZG7DrSB6bcSbbsSbbsOpIHrDoXBvxI10b3bDqSBsaXN0eVxyXG4gICAgICAgICAgICBpZiAoRnVjRGFzaGJvYXJkLmplUG92b2xlblphcG9jdG92eUxpc3QoY29udGVudCkpIEdvcmRpYy5EYXNoYm9hcmQuQ3VzdG9tUHJvdmlkZXJzLnJlZ2lzdGVyKEZ1Y0Rhc2hib2FyZC5jcmVhdGVQcm92aWRlclBvc2xlZG5pWmFwb2N0b3ZlTGlzdHkoY29udGVudCkpO1xyXG4gICAgICAgICAgICAvLyBwb3NsZWRuw60gem3Em27Em27DqSBzb3VwaXNreVxyXG4gICAgICAgICAgICBpZiAoRnVjRGFzaGJvYXJkLmplUG92b2xlbmFTb3VwaXNrYShjb250ZW50KSkgR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcnMucmVnaXN0ZXIoRnVjRGFzaGJvYXJkLmNyZWF0ZVByb3ZpZGVyUG9zbGVkbmlTb3VwaXNreShjb250ZW50KSk7XHJcblxyXG4gICAgICAgICAgICAvLyBPYnNsdWhhIGFzeW5jaHJvbm7DrWhvIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAvLyBUT0RPOiB6w6FwaXN5IGRvIGtvbnpvbGUganNvdSAoemF0w61tKSB6YWtvbWVudG92w6FueVxyXG4gICAgICAgICAgICAvL2xldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgR29yZGljLkFzeW5jLkdUYXNrTWFuYWdlclxyXG4gICAgICAgICAgICAgICAgLm9mZihcIi5GdWNVY3RcIilcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IG9ic2x1aGEgaW5pdCB6cnXFoWVuYSBhIHDFmWVzdW51dGEgZG8gY2hhbmdlIC0gYnVkZSBhbGUgcG90xZllYmEgdG8gb2RsYWRpdCBzIHBlcm1hbmV0bsOtbWkgw7psb2hhbWlcclxuICAgICAgICAgICAgICAgIC8vLm9uKFwiaW5pdC5GdWNVY3RcIiwgXCJHb3JkaWMuRnVjLlNlcnZlci5HVWN0b3ZhbmlBc3luY1wiLCBmdW5jdGlvbiAobywgcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL2NvbnNvbGUubG9nKFwiR1VjdG92YW5pQXN5bmMgaW5pdCAgXCIsIHRoaXMuaWQsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL2xldCBub3RpZmlrYWNlX1VjdCA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICB0aXRsZTogXCJJbmZvcm1hY2VcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIGljb246IFwiZ2ktZ2VuZXJhdGVcIiwvL1wiZ2ktZ2VuZXJhdGV8Z2ktbGlzdCBnaS1zdGFjay1wb3MtLXJiXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBjb250ZW50OiBcIlByb2LDrWjDoSDDusSNdG92w6Fuw60gcG9oeWLFr1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgLy9zdGF0ZTogXCJpbmZvXCJcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvL3RoYXQubm90aWZpY2F0aW9uKFwiYWRkXCIsIG5vdGlmaWthY2VfVWN0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vdGhpcy5zZXROb3RpZmljYXRpb24obm90aWZpa2FjZV9VY3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBuZW7DrSBwb3TFmWViYSBvYnNsdWhvdmF0LCBwcm90b8W+ZSBzZSBpbmZvcm1hY2UgbyBwcm9ncmVzdSBha3R1YWxpenVqZSBhdXRvbWF0aWNreVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2hhbmdlLkZ1Y1VjdFwiLCBcIkdvcmRpYy5GdWMuU2VydmVyLkdVY3RvdmFuaUFzeW5jXCIsIGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkdVY3RvdmFuaUFzeW5jIGNoYW5nZSAgXCIsIHRoaXMuaWQsIG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub3RpZmlrYWNlX1VjdCA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub3RpZmlrYWNlX1VjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZmlrYWNlX1VjdCA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZ2VuZXJhdGVcIiwvL1wiZ2ktZ2VuZXJhdGV8Z2ktbGlzdCBnaS1zdGFjay1wb3MtLXJiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSDDusSNdG92w6Fuw60gcG9oeWLFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zdGF0ZTogXCJpbmZvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsIG5vdGlmaWthY2VfVWN0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXROb3RpZmljYXRpb24obm90aWZpa2FjZV9VY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2lmIChvLnByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbGV0IG5vdGlmaWthY2VfVWN0ID0gdGhpcy5nZXROb3RpZmljYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG5vdGlmaWthY2VfVWN0LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHByb2dyZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjdXJyZW50OiBvLnByb2dyZXNzLmN1cnJlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0b3RhbDogby5wcm9ncmVzcy50b3RhbCEsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB0ZXh0OiBvLnByb2dyZXNzLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vdGl0bGU6IFwiT0tcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9pY29uOiBcImdpLWdlbmVyYXRlfGdpLWxpc3QgZ2ktc3RhY2stcG9zLS1yYlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL2NvbnRlbnQ6IHRoaXMuY3VzdG9tRHRvLm9faGxhc2thICsgXCIgLSDDmnNwxJvFoW7EmyBwcm92ZWRlbm8hISFcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImRvbmUuRnVjVWN0XCIsIFwiR29yZGljLkZ1Yy5TZXJ2ZXIuR1VjdG92YW5pQXN5bmNcIiwgZnVuY3Rpb24gKG8sIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJHVWN0b3ZhbmlBc3luYyBkb25lICBcIiwgdGhpcy5pZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQubm90aWZpY2F0aW9uKFwiYWRkXCIsIHsgdGl0bGU6IFwiT0tcIiwgaWNvbjogXCJmYS1nbG9iZVwiLCBjb250ZW50OiByZXN1bHQub19obGFza2EgKyBcIiAtIMOac3DEm8WhbsSbIHByb3ZlZGVubyEhIVwiIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpeHNIdWYgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKHIgPT4gaXhzSHVmID0gci5peHNIdWYgPz8gaXhzSHVmKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm90aWZpa2FjZV9VY3QgPSB0aGlzLmdldE5vdGlmaWNhdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpa2FjZV9VY3QudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIsOaxI10b3bDoW7DrSBwb2h5YsWvIGRva29uxI1lbm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbW1hbmRCYXI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oJC5leHRlbmQoeyBuYW1lOiBcImFjdFZ5c2xlZGVrXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdWN0b3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJWw71zbGVkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBydW46IGZ1bmN0aW9uIChwMSwgcDIsIHAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGxldCB4eHggPSBwMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbGV0IHl5eSA9IHAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgenp6ID0gcDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSkpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeXNsZWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2RzdHJhbsSbbsOtIG5vdGlmaWthY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50Lm5vdGlmaWNhdGlvbihcInJlbW92ZVwiLCBub3RpZmlrYWNlX1VjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnltYXrDoW7DrSBpbmZvcm1hY2UgbyDDumxvemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrLmNsZWFuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSB2w71zbGVka3Ugw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5vcGVuVWN0b3ZhbmkoaXhzSHVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJpbmFjdGl2ZS5GdWNVY3RcIiwgXCJHb3JkaWMuVWthLlNlcnZlci5HU2VydmVyQXN5bmNUYXNrXCIsIGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm90aWZpa2FjZV9VY3QgPSB0aGlzLmdldE5vdGlmaWNhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWthY2VfVWN0LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvZMSbbGF0IGxlcMWhw60gaGzDocWha3UgKMO6xI10b3bDoW7DrSBqZSBudXRuw6kgc3B1c3RpdCB6bm92dSBhIHDFmcOtcGFkbsSbIHRvaGxlIGJ1ZGUgbnV0bsOpIHNlcnZpc27EmyBcInBvc3Vub3V0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiVGF0byDDumxvaGEgamUgbmVha3Rpdm7DrSBhIG5lbHplIGppIG9wxJt0b3ZuxJsgbmFzdGFydG92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwid2FybmluZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgby5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJmYWlsLkZ1Y1VjdFwiLCBcIkdvcmRpYy5GdWMuU2VydmVyLkdVY3RvdmFuaUFzeW5jXCIsIGZ1bmN0aW9uIChvLCBleGMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiR1VjdG92YW5pQXN5bmMgZmFpbCAgXCIsIHRoaXMuaWQsIGV4Yyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm5vdGlmaWNhdGlvbihcImFkZFwiLCB7IHRpdGxlOiBcIkNoeWJhXCIsIGljb246IFwiZmEtZ2xvYmVcIiwgY29udGVudDogZXhjLm9faGxhc2thICsgXCIgLSBOZcO6c3DEm8WhbsSbIHByb3ZlZGVubyEhIVwiIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl4c0h1Zjogc3RyaW5nID0gZXhjPy5leGNlcHRpb24/LmRhdGE/Lml4c19odWYgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAvL2l4c0h1ZiA9IGV4Yz8uZGF0YT8ucHJlY2VycGFuaSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVzdWx0LmZvckVhY2gociA9PiBpeHNIdWYgPSByLml4c0h1ZiA/PyBpeHNIdWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub3RpZmlrYWNlX1VjdCA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICBub3RpZmlrYWNlX1VjdC51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLDmsSNdG92w6Fuw60gcG9oeWLFryBwxZllcnXFoWVub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIkNoeWJhOiBcIiArIGV4Yy5leGNlcHRpb24uYmFzZU1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdGltZXMtY2lyY2xlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IGl4c0h1ZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeXNsZWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZHN0cmFuxJtuw60gbm90aWZpa2FjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50Lm5vdGlmaWNhdGlvbihcInJlbW92ZVwiLCBub3RpZmlrYWNlX1VjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5bWF6w6Fuw60gaW5mb3JtYWNlIG8gw7psb3plXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2suY2xlYW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSB2w71zbGVka3Ugw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQub3BlblVjdG92YW5pKGl4c0h1Zik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogem9icmF6b3ZhdCBjaHlidSB0YWtobGUgdsW+ZHk/XHJcbiAgICAgICAgICAgICAgICAgICAgLy9HRGxnLnNob3dFeGNlcHRpb24oZXhjLmV4Y2VwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdnltYXrDoW7DrSBpbmZvcm1hY2UgbyDDumxvemVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFuKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiYWx3YXlzLkZ1Y1VjdFwiLCBcIkdvcmRpYy5GdWMuU2VydmVyLkdVY3RvdmFuaUFzeW5jXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiR1VjdG92YW5pQXN5bmMgYWx3YXlzXCIsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jbGVhbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBPYnNsdWhhIGFzeW5jaHJvbm7DrSBha3R1YWxpemFjZSBuw6F6dsWvIGtvbnRhY8OtIGEga25paFxyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAub2ZmKFwiLkZ1Y0FrdE5helwiKVxyXG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIG5lbsOtIHBvdMWZZWJhIG9ic2x1aG92YXQsIHByb3Rvxb5lIHNlIGluZm9ybWFjZSBvIHByb2dyZXN1IGFrdHVhbGl6dWplIGF1dG9tYXRpY2t5XHJcbiAgICAgICAgICAgICAgICAub24oXCJjaGFuZ2UuRnVjQWt0TmF6XCIsIFwiR29yZGljLkZ1Yy5TZXJ2ZXIuR1BvbW9jbmVBc3luY1wiLCBmdW5jdGlvbiAobykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub3RpZmlrYWNlX0FrdE5heiA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub3RpZmlrYWNlX0FrdE5heikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZmlrYWNlX0FrdE5heiA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZ2VuZXJhdGVcIiwvL1wiZ2ktZ2VuZXJhdGV8Z2ktbGlzdCBnaS1zdGFjay1wb3MtLXJiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIlByb2LDrWjDoSBha3R1YWxpemFjZSBuw6F6dsWvIGtvbnRhY8OtIGEga25paFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zdGF0ZTogXCJpbmZvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubm90aWZpY2F0aW9uKFwiYWRkXCIsIG5vdGlmaWthY2VfQWt0TmF6LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXROb3RpZmljYXRpb24obm90aWZpa2FjZV9Ba3ROYXopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJkb25lLkZ1Y0FrdE5helwiLCBcIkdvcmRpYy5GdWMuU2VydmVyLkdQb21vY25lQXN5bmNcIiwgZnVuY3Rpb24gKG8sIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub3RpZmlrYWNlX0FrdE5heiA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKClcclxuICAgICAgICAgICAgICAgICAgICBub3RpZmlrYWNlX0FrdE5hei51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQWt0dWFsaXphY2UgbsOhenbFryBrb250YWPDrSBhIGtuaWggZG9rb27EjWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNoZWNrLWNpcmNsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VnlzbGVkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9kc3RyYW7Em27DrSBub3RpZmlrYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgbm90aWZpa2FjZV9Ba3ROYXopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5bWF6w6Fuw60gaW5mb3JtYWNlIG8gw7psb3plXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzay5jbGVhbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImZhaWwuRnVjQWt0TmF6XCIsIFwiR29yZGljLkZ1Yy5TZXJ2ZXIuR1BvbW9jbmVBc3luY1wiLCBmdW5jdGlvbiAobywgZXhjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vdGlmaWthY2VfQWt0TmF6ID0gdGhpcy5nZXROb3RpZmljYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIG5vdGlmaWthY2VfQWt0TmF6LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFrdHVhbGl6YWNlIG7DoXp2xa8ga29udGFjw60gYSBrbmloIHDFmWVydcWhZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiQ2h5YmE6IFwiICsgZXhjLmV4Y2VwdGlvbi5iYXNlTWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS10aW1lcy1jaXJjbGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiYWN0VnlzbGVkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBvZHN0cmFuxJtuw60gbm90aWZpa2FjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY29udGVudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgbm90aWZpa2FjZV9Ba3ROYXopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gdnltYXrDoW7DrSBpbmZvcm1hY2UgbyDDumxvemVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRhc2suY2xlYW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdnltYXrDoW7DrSBpbmZvcm1hY2UgbyDDumxvemVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFuKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiYWx3YXlzLkZ1Y0FrdE5helwiLCBcIkdvcmRpYy5GdWMuU2VydmVyLkdQb21vY25lQXN5bmNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGV2xZllbsOtIGhpc3RvcmllIMO6xI10b3bDoW7DrSAocHJvIGtsaWsgdsO9c2xlZGVrIGFzeW5jaHJvbm7DrWhvIMO6xI10b3bDoW7DrSlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXhzSHVmIElEIGhpc3RvcmllIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wZW5VY3RvdmFuaShpeHNIdWY6IHN0cmluZyk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gb2tubyBoaXN0b3JpZSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgaWYgKGl4c0h1Zikge1xyXG4gICAgICAgICAgICAgICAgbGV0ICRkZXRhaWxXaW5kb3cgPSB0aGlzLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkZ1Yy5XZWJDbGllbnQuR0RldGFpbEhpc3RvcmllVWN0b3ZhbmlQb2h5YnVcIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiAnVWN0b3ZhbmlQb2h5YnUjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXhzSHVmOiBpeHNIdWZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRkZXRhaWxXaW5kb3cuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2UgbsOhenbFryBrb250YWPDrSBhIGtuaWhcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgYWt0dWFsaXphY2VOYXp2dSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybURhbmdlcm91cyhcImpyZXM6MjQxMDAzMTRcIiwgLy9SQyAyNDEwMDMxNCA6IEFrdHVhbGl6YWNlIG7DoXp2xa8ga29udGFjw60gYSBrbmloXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBwxZlpZGF0IG9kxZnDoWRrb3bDoW7DrSBpIGRvIGRhbMWhw61jaCBjb25maXJtRGFuZ2Vyb3VzP1xyXG4gICAgICAgICAgICAgICAgXCJqcmVzOjI0MTAwMzE2XCIpIC8vUkMgMjQxMDAzMTYgOiBQxZllamV0ZSBzaSBha3R1YWxpem92YXQgbsOhenZ5IGtvbnRhY8OtIGEga25paCB1bG/FvmVuw71jaCB2ZSBGVUMgcG9kbGUgcHJpbcOhcm7DrWNoIGFnZW5kPzs7T3BlcmFjZSBtxa/FvmUgdHJ2YXQgbsSba29saWsgbWludXQgdiB6w6F2aXNsb3N0aSBuYSBwb8SNdHUgesOhem5hbcWvIHYgcMWZw61zbHXFoW7DvWNoIGFnZW5kw6FjaC47O0luZm9ybWFjZSBvIGRva29uxI1lbsOpIGFrdHVhbGl6YWNpIGJ1ZGUgem9icmF6ZW5hIHYgY2VudHJ1IG5vdGlmaWthY8OtLjs7XHJcbiAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2b2zDoW7DrSBha3R1YWxpemFjZVxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXIuc3RhcnQoXCJHb3JkaWMuRnVjLlNlcnZlci5HUG9tb2NuZUFzeW5jXCIsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90ZXbFmWVuw60gdXrDoXbEm3JreSBhZ2VuZFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgdXphdmVya2FBZ2VuZGEoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBHb3JkaWMuRWtvLldlYkNsaWVudC5JR0Vrb0FnZW5kYU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBhZ2VuZGE6IFwiRlVDXCIsXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhOiAoKSA9PiB7IHJldHVybiB0aGlzLmlzbC5BZ2VuZGFGdWMubGlzdCgpLmdldERhdGEoKTsgfSxcclxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiAoVHlwQWcpID0+IHRoaXMuaXNsLkFnZW5kYUZ1Yy5nZXRQZXJtaXNzaW9ucyh7IHR5cEFnOiBUeXBBZ1swXS50eXBfYWcgPz8gMzMwIH0pLmdldCgpLFxyXG4gICAgICAgICAgICAgICAgY2xvc2U6IChhZ2VuZHkpID0+IHRoaXMuaXNsLkFnZW5kYUZ1Yy5ocm9tYWRuZVV6YXZyaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXphdnJpdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiBhZ2VuZHkgIT0gbnVsbCA/IChBcnJheS5pc0FycmF5KGFnZW5keSkgPyBhZ2VuZHkgOiBbYWdlbmR5XSkgOiBbXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2eXNsVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaHliYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMucmVzdWx0LmZvckVhY2gociA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoci5raW5kID09PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yKSBjaHliYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmVycm9ycy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eXNsVGV4dCkgdnlzbFRleHQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eXNsVGV4dCArPSBlLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eXNsVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSB2w71zbGVka3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaHliYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJVesOhdsSbcmthIGFnZW5keVwiLCB2eXNsVGV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKCkgPT4gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5hbGVydChcIlV6w6F2xJtya2EgYWdlbmR5XCIsIHZ5c2xUZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogdGF0byBtZXRvZGEgc2UgbmlrZGUgbmV2b2zDoSAtIHBva3VkIGJ5IHNlIHZvbGFsYSwgdGFrIGJ5IGJ5bG8gdmhvZG7DqSB6YXZvbGF0IG1ldG9kdSB6a29udHJvbHVqUHJlZFV6YXZyZW5pbVxyXG4gICAgICAgICAgICAgICAgY2hlY2tDbG9zZTogKGFnZW5keSkgPT4gJC5EZWZlcnJlZCgpLnJlc29sdmUoYWdlbmR5KS5wcm9taXNlKClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcyBhcyBhbnkpLm5hdmlnYXRlVGFzayhHb3JkaWMuRWtvLldlYkNsaWVudC5HRWtvQWdlbmRhLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90ZXbFmWVuw60gdXrDoXbEm3JreSBrbmloXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyB1emF2ZXJrYUtuaWh5KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gcG9tb2Nuw6EgbWV0b2RhIHBybyBwxZlldm9kIHbDvXN0dXB1IHplIHNlcnZlcm92w71jaCBtZXRvZCBkbyB0dmFydSBwcm8gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc3VsdFRvRHRvcyhyZXM6IElzbC5HU2VydmljZUdyb3VwUmVzcG9uc2U8RWtvLkludGVyZmFjZS5HRWtvVnlicmFuZUtuaWh5RHRvPik6IEVrby5JbnRlcmZhY2UuR0Vrb1Z5YnJhbmVLbmloeUR0b1tdIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMucmVzdWx0Lm1hcChyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gJC5leHRlbmQoe30sIHIuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93W1wid2l6X2NoZWNrXCJdID0gci5raW5kICE9PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluZm8gc2UgcMWZZW1hcG92w6F2w6EgbmEgc3VjY2VzcywgcHJvdG/FvmUgcHLFr3ZvZGNlIG5lb2JzbHVodWplIGluZm9cclxuICAgICAgICAgICAgICAgICAgICByb3dbXCJ3aXpfa2luZFwiXSA9IHIua2luZCA9PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkluZm8gPyBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MgOiByLmtpbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZ5c2xUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICByLmVycm9ycz8uZm9yRWFjaChlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZ5c2xUZXh0KSB2eXNsVGV4dCArPSBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eXNsVGV4dCArPSBlLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG96bsOhbWthOiB8fCBuYSByb3pkw61sIG9kID8/IHBvxZllxaHDrSBpIFwiXCJcclxuICAgICAgICAgICAgICAgICAgICByb3dbXCJ3aXpfdHh0X2VyclwiXSA9IHZ5c2xUZXh0IHx8IChyLmtpbmQgIT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIk9rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkNoeWJhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogR29yZGljLkVrby5XZWJDbGllbnQuSUdFa29LbmloYU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBnZXREYXRhOiB0aGlzLmlzbC5LbmloYUZ1Yy5saXN0KCksXHJcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uczogKCkgPT4gdGhpcy5pc2wuS25paGFGdWMuZ2V0U2VydmljZVBlcm1pc3Npb25zKCkuZ2V0KCksXHJcbiAgICAgICAgICAgICAgICBjbG9zZTogKGtuaWh5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLktuaWhhRnVjLmhyb21hZG5lVXphdnJpKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXphdnJpdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czoga25paHlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFRvRHRvcyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja0Nsb3NlOiAoa25paHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuS25paGFGdWMuemtvbnRyb2x1alByZWRVemF2cmVuaW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1emF2cml0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBrbmloeVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0VG9EdG9zKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbENsb3NlOiAoa25paHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuS25paGFGdWMuaHJvbWFkbmVVemF2cmkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1emF2cml0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czoga25paHlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFRvRHRvcyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja0NhbmNlbENsb3NlOiAoa25paHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuS25paGFGdWMuemtvbnRyb2x1alByZWRVemF2cmVuaW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1emF2cml0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czoga25paHlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFRvRHRvcyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcyBhcyBhbnkpLm5hdmlnYXRlVGFzayhHb3JkaWMuRWtvLldlYkNsaWVudC5HRWtvU2V6bmFtS25paCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGV2xZllbsOtIGthcnRvdMOpa3kgZXh0ZXJuw61jaCBzdWJqZWt0xa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMga2FydG90ZWthRXN1KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVY2VsOiAyLFxyXG4gICAgICAgICAgICAgICAgTG9nb3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICBJeHA6ICcwMDAwWDAwMDAwNEonLFxyXG4gICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS5rYXJ0b3Rla2FWTWVudUFwbGlrYWNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgSW5pdGlhbFZhbHVlRHV2b2RIbGVkYW5pVHh0OiBcImpyZXM6MjQxMDAzMTVcIiAvL1JDIDI0MTAwMzE1IDogTmFobMOtxb5lbsOtIHogbW9kdWx1IEZVQ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLkVzdS5EaWFsb2dzLkthcnRvdGVrYUVzdURsZ0Zyb21NYWluKHRoYXQsIG9wdGlvbnMsIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkubmF2aWdhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXZpZGVuY2UgZG9rbGFkdSB6IHJlZGlzdHJpYnVjZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7eyBwaWRzOiBzdHJpbmdbXSwgdHlwQWc6IG51bWJlcn19IG9iaiBwYXJhbWV0cnkgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGV2aWRlbmNlRGVsZWdhdGUob2JqOiB7IHBpZHM6IHN0cmluZ1tdLCB0eXBBZzogbnVtYmVyIH0pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2xhIHZzdHVwbsOtY2ggcGFyYW1ldHLFr1xyXG4gICAgICAgICAgICBpZiAob2JqLnBpZHM/Lmxlbmd0aCA+IDEpIHJldHVybiB0aGlzLmRpYWxvZ3MuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MjQxMDAzNDhcIiwgLy9SQyAyNDEwMDM0OCA6IERva3VtZW50eSBrIGV2aWRlbmNpXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MjQxMDAzNDlcIiAvL1JDIDI0MTAwMzQ5IDogRXZpZG92YXQgamUgbW/Fvm7DqSBwb3V6ZSBqZWRlbiBkb2t1bWVudFxyXG4gICAgICAgICAgICApLmNyZWF0ZURpYWxvZ1Byb21pc2UoKCkgPT4gZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAob2JqLnBpZHM/Lmxlbmd0aCA8IDEpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBidWRlIHBvdMWZZWJhIG7Em2pha8OhIGRhbMWhw60ga29udHJvbGE/XHJcblxyXG4gICAgICAgICAgICAvLyB2w71ixJtyIGPDrWxvdsOpIGtuaWh5LCBwb2TDoW7DrSBhIGV2aWRlbmNlXHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuRG9jc0ZvclJlZy5zaG93RWJvb2tzQ2hvaWNlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgb2JqLnR5cEFnLyozMzAqLyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBbRnVjLkdsb2JhbHMuRW51bXMuVHlwQWcuRlVDXTogW0Z1Yy5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5Tb3VwaXNreV0sXHJcbiAgICAgICAgICAgICAgICAgICAgW0Z1Yy5HbG9iYWxzLkVudW1zLlR5cEFnLkJVQ106IFtGdWMuR2xvYmFscy5FbnVtcy5LdGdEZW4uWmFwb2N0b3ZlTGlzdHldXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGtuaWhhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrbmloYT8ua3RnX2RlbiA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5aYXBvY3RvdmVMaXN0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBldmlkZW5jZSB6w6Fwb8SNdG92w6lobyBsaXN0dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBub3ZlR3BjID0gRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhpcy5ncGMsIGtuaWhhLml4cF9kZW4hKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VydmlzbsOtIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlcnZpY2VDb250ZW50ID0gdGhpcy5jcmVhdGVTZXJ2aWNlQ29udGVudChbXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsWmFwb2N0b3ZlaG9MaXN0dVwiLCB7IGdwYzogbm92ZUdwYyB9XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtvbnRyb2xhIHBydm7DrWhvIGRva2xhZHUgdiBrbml6ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnQuaXNsLlphcG9jdG92eUxpc3QuemtvbnRyb2x1ak5hUHJ2bmlEb2tsYWRWS25pemUoeyBpeHBEZW46IGtuaWhhLml4cF9kZW4hIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh0ZXh0RG90YXp1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQga29udHJvbGEgdnLDoXTDrSBkb3RheiwgdGFrIHNlIHplcHRhdCwgamVzdGxpIG3DoSBwcnZuw60gZG9rbGFkIHNwcsOhdm7DqSDEjcOtc2xvLCBqaW5hayBqZSB0byBva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0RG90YXp1KSByZXR1cm4gdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjI0MTAwMzIwXCIsIHRleHREb3RhenUpLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpOyAvL1JDIDI0MTAwMzIwIDogTm92w70gesOhcG/EjXRvdsO9IGxpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9kw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnQuaXNsLlphcG9jdG92eUxpc3QuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiBvYmoucGlkc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbjoga25paGEuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvdGV2xZllbsOtIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkZ1Yy5XZWJDbGllbnQuR0RldGFpbFphcG9jdG92ZWhvTGlzdHVcIiwgeyBncGM6IG5vdmVHcGMgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiAnRGV0YWlsWmFwb2N0b3ZlaG9MaXN0dSMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBvYmoucGlkc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cERlbjoga25paGEuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlQ29udGVudC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGtuaWhhPy5rdGdfZGVuID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuS3RnRGVuLlNvdXBpc2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV2aWRlbmNlIHNvdXBpc2t5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdmVHcGMgPSBFa28uVXRpbHMuY3JlYXRlQm9va0dwYyh0aGlzLmdwYywga25paGEuaXhwX2RlbiEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXJ2aXNuw60gY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VydmljZUNvbnRlbnQgPSB0aGlzLmNyZWF0ZVNlcnZpY2VDb250ZW50KFtcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxTb3VwaXNreVwiLCB7IGdwYzogbm92ZUdwYyB9XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtvbnRyb2xhIHBydm7DrWhvIGRva2xhZHUgdiBrbml6ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnQuaXNsLkZpblBvaHliU291cGlza2EuemtvbnRyb2x1ak5hUHJ2bmlEb2tsYWRWS25pemUoeyBpeHBEZW46IGtuaWhhLml4cF9kZW4hLyosIHN1YnJhZGE6IHRoYXQuU3VicmFkYURlbiovIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh0ZXh0RG90YXp1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQga29udHJvbGEgdnLDoXTDrSBkb3RheiwgdGFrIHNlIHplcHRhdCwgamVzdGxpIG3DoSBwcnZuw60gZG9rbGFkIHNwcsOhdm7DqSDEjcOtc2xvLCBqaW5hayBqZSB0byBva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0RG90YXp1KSByZXR1cm4gdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjI0MTAwMzIxXCIsIHRleHREb3RhenUpLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpOyAvL1JDIDI0MTAwMzIxIDogTm92w6Egc291cGlza2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9kw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnQuaXNsLkZpblBvaHliU291cGlza2EuY3JlYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiBvYmoucGlkc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbjoga25paGEuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxTb3VwaXNreVwiLCB7IGdwYzogbm92ZUdwYyB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6ICdEZXRhaWxTb3VwaXNreSMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBvYmoucGlkc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cERlbjoga25paGEuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlQ29udGVudC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBqaW7DqSBrYXRlZ29yaWUga25paHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=