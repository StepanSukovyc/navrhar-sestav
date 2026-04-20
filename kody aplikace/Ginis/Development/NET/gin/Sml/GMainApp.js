"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            function MainAppSml(content) {
                // TODO: přesunout sem vybraný obsah z onContentReady níže jako jsou asynchronní úlohy
            }
            WebClient.MainAppSml = MainAppSml;
            /**
             * Hlavní content SML
             *
             * @author Martin Boček
             * @since 488.1.0.0
             */
            let GMainApp = class GMainApp extends Gordic.GContentBase {
                //private globals: Gordic.Sml.Interface.GSmlGlobalsDto;
                onContentReady() {
                    const content = this;
                    // WFL resolver pro hledání pidu do obecného hledacího políčka včetně dalších WFL hledání
                    // TODO: pokud by nemělo být dostupné ostatní WFL hledání, tak by se musela použít metoda registerPidSearchResolver místo registerSearchResolvers
                    Gordic.Wfl.Utils.registerSearchResolvers({
                        pidSearchResolverParams: {
                            openDetail: (ixsInfo) => {
                                // zobrazení detailů podle toho, o jaký typ jde
                                if (ixsInfo.CoJsemZac === 200 /* Wfl.Interface.GIdentifikatorCoJsemZac.Smlouva */) {
                                    // doklad
                                    return content.isl.DokladSml.read({
                                        ixp: ixsInfo.Ixx1,
                                        fragments: WebClient.SmlUtils.arrayRemoveDuplicates([
                                            "Base" /* Sml.Interface.GDokladSmlDtoFragments.ixp_den */,
                                            "Base" /* Sml.Interface.GDokladSmlDtoFragments.ktg_typ */,
                                            "Base" /* Sml.Interface.GDokladSmlDtoFragments.ktg_typ_nad_pr */,
                                            "Base" /* Sml.Interface.GDokladSmlDtoFragments.ktg_typ_nad */
                                        ])
                                    })
                                        .getData()
                                        .then(function (data) {
                                        if (data?.ixp_den) {
                                            let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, data.ixp_den);
                                            let detailID = WebClient.SmlGrid.getDetailId(data, { ktg_typ: data.ktg_typ_nad_pr ?? data.ktg_typ_nad });
                                            content.navigate(["Gordic.Sml.WebClient.G" + detailID, { gpc: newGpc }], {
                                                ID: detailID + '#',
                                                Ixp: ixsInfo.Ixx1,
                                                // TODO: je potřeba IxpDen, když je to v gpc?
                                                IxpDen: data.ixp_den
                                            });
                                            return $.Deferred().resolve(true);
                                        }
                                        else
                                            return $.Deferred().resolve(false);
                                    });
                                }
                                else {
                                    // neznámý typ
                                    return $.Deferred().resolve(false).promise();
                                }
                            }
                        }
                    });
                    // Dashboard
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.BlogProvider()); //zapojení blogů
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.ArticleProvider()); //zapojení článků (uživatelsky editovatelný text)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.IslProvider()); //zapojení jakékoli dostupné ISL metody vracející seznam dat (je možné nastavit i volání detailu při kliknutí na položku)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RssProvider()); //zapojení RSS zpráv (včetně stránkování, vyhledávání a filtrování podle kategorií)           
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RestProvider()); //zapojení externích REST služeb
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.FileProvider()); //zapojení načítání dat ze souboru typu JSON, který je vložen do složky Data v adresáři aplikace
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.XrgServiceProvider()); //zapojení načítání dat ze XRG služby uvedené ve web.config spolu s nastavenými přístupovými údaji
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.DataReportProvider()); //zapojení sestav
                    // vlastní providery
                    // oblíbené knihy
                    Gordic.Dashboard.CustomProviders.register(WebClient.SmlDashboard.createProviderOblibeneKnihy(content));
                    // počty záznamů
                    Gordic.Dashboard.CustomProviders.register(WebClient.SmlDashboard.createProviderPoctyKeZpracovani(content));
                    // poslední záznamy
                    // poslední změněné doklady
                    Gordic.Dashboard.CustomProviders.register(WebClient.SmlDashboard.createProviderPosledniDoklady(content));
                    // Hromadná FK
                    Gordic.Wfl.WebClient.GHFKAsyncUtils(this, new Gordic.Data.GridFormat()); //správně by měl být předám GridFormát jako prvotně předávaný do průvodce
                    // Registrace a použití asynchronních úloh u hromadného odeslání do výpravny - generování el. obrazů
                    const mainContent = this;
                    Gordic.Async.GTaskManager
                        .on("init", "Gordic.Eko.Server.GOdeslatMultipleReportsAsyncTask", function (ctx) {
                        const not = new GObservableObject({
                            title: "jres:33600608", //RC 33600608 : Hromadně odeslat do výpravny
                            icon: "fa-print",
                            content: "jres:33600609", //RC 33600609 : Generování el. obrazů pro následné odeslání do výpravny bylo zahájeno
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
                                caption: "jres:33600610", //RC 33600610 : Odeslat
                                icon: "gi-send",
                                run: () => {
                                    return Gordic.Wfl.Dialogs.GOdeslaniDlg(mainContent, {
                                        Hromadne: true
                                    }).then(() => {
                                        this.clean(); //Odstranime serverove prostredky async. ulohy
                                        mainContent.notification("remove", not); //Odstranime notifikaci
                                    });
                                }
                            });
                            not.update({
                                content: "jres:33600611", //RC 33600611 : El. obrazy byly úspěšně vygenerovány a je možné je odeslat do výpravny
                                state: "success",
                                defaultAction: showResultAct,
                                commandBar: [{ action: showResultAct }]
                            });
                        }
                    });
                }
                /**
                 * Tisky společné pro doklady
                 */
                tiskyDokladu() {
                    const printAction = GAction.createPrintAction({
                        name: "actTiskyDokladu",
                        tema: "sml_ptm_pos,sml_ptm_zas",
                        serverRestrictionAlvMethod: "Gordic.Sml.WebClient.GTiskyDokladu:GetRestrictionAlv",
                        serverParameterMethod: "Gordic.Sml.WebClient.GTiskyDokladu:PrintParameters",
                    });
                    printAction.run();
                }
                /**
                 * Otevření uzávěrky agend
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                uzaverkaAgenda() {
                    let that = this;
                    const options = {
                        agenda: "SML",
                        getData: () => { return this.isl.AgendaSml.list().getData(); },
                        permissions: (TypAg) => this.isl.AgendaSml.getPermissions({ typAg: TypAg[0].typ_ag ?? 110 }).get(),
                        close: (agendy) => this.isl.AgendaSml.hromadneUzavri({
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
                        getData: this.isl.KnihaSml.list(),
                        permissions: () => this.isl.KnihaSml.getServicePermissions().get(),
                        close: (knihy) => {
                            return this.isl.KnihaSml.hromadneUzavri({
                                uzavrit: true,
                                rows: knihy
                            })
                                .get()
                                .then(function (res) {
                                return resultToDtos(res);
                            });
                        },
                        checkClose: (knihy) => {
                            return this.isl.KnihaSml.zkontrolujPredUzavrenim({
                                uzavrit: true,
                                rows: knihy
                            })
                                .get()
                                .then(function (res) {
                                return resultToDtos(res);
                            });
                        },
                        cancelClose: (knihy) => {
                            return this.isl.KnihaSml.hromadneUzavri({
                                uzavrit: false,
                                rows: knihy
                            })
                                .get()
                                .then(function (res) {
                                return resultToDtos(res);
                            });
                        },
                        checkCancelClose: (knihy) => {
                            return this.isl.KnihaSml.zkontrolujPredUzavrenim({
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
                    const options = {
                        // Ucel: 2,
                        Logovani: {
                            Ixp: '0000X000004J',
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.kartotekaVMenuAplikace,
                            AktZnacka: "",
                            DuvodHledaniTxt: "",
                            InitialValueDuvodHledaniTxt: "jres:24100032" //RC 24100032 : Nahlížení z modulu SML
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
                        return this.dialogs.error("jres:24100030", //RC 24100030 : Dokumenty k evidenci
                        "jres:24100031" //RC 24100031 : Evidovat je možné pouze jeden dokument
                        ).createDialogPromise(() => false);
                    if (obj.pids?.length < 1)
                        return $.Deferred().reject().promise();
                    // TODO: bude potřeba nějaká další kontrola?
                    // výběr cílové knihy, podání a evidence
                    return Gordic.Eko.Components.DocsForReg.showEbooksChoice(this.element, obj.typAg /*110*/)
                        .then((kniha) => {
                        // evidence dokladu
                        let that = this;
                        // zjištění budoucího detailu
                        const detailID = WebClient.SmlGrid.getDetailIdKtgDen(kniha.ktg_den ?? 0);
                        const noveGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, kniha.ixp_den);
                        // servisní content
                        const serviceContent = this.createServiceContent(["Gordic.Sml.WebClient.G" + detailID, { gpc: noveGpc }]);
                        // kontrola prvního dokladu v knize
                        return serviceContent.isl.DokladSml.zkontrolujNaPrvniDokladVKnize({ ixpDen: kniha.ixp_den })
                            .get()
                            .then(function (textDotazu) {
                            // pokud kontrola vrátí dotaz, tak se zeptat, jestli má první doklad správné číslo, jinak je to ok
                            if (textDotazu)
                                return that.dialogs.confirm("Nový doklad SML", textDotazu).createDialogPromise(GDlg.mbbYes.id);
                            else
                                return;
                        })
                            .then(function () {
                            // podání
                            return serviceContent.isl.DokladSml.create({
                                ixp: obj.pids[0],
                                ixp_den: kniha.ixp_den
                            }).get();
                        })
                            .then(function () {
                            // otevření detailu
                            // TODO: nebude potřeba řešit konkrétní typ detailu? muselo by to ale být podle ktg_den, protože nic jiného nemám
                            return that.navigate(["Gordic.Sml.WebClient.G" + detailID, { gpc: noveGpc }], {
                                ID: detailID + '#',
                                Ixp: obj.pids[0],
                                IxpDen: kniha.ixp_den
                            });
                        })
                            .always(() => {
                            serviceContent.close();
                        });
                    });
                }
            };
            GMainApp = __decorate([
                gcontent
            ], GMainApp);
            WebClient.GMainApp = GMainApp;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR01haW5BcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTWFpbkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNFdmO0FBNVdELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRXbkI7SUE1V2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRXN0I7UUE1V29CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DLFNBQWdCLFVBQVUsQ0FBQyxPQUFpQjtnQkFFeEMsc0ZBQXNGO1lBQzFGLENBQUM7WUFIZSxvQkFBVSxhQUd6QixDQUFBO1lBRUQ7Ozs7O2VBS0c7WUFFSCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFTLFNBQVEsT0FBQSxZQUFZO2dCQUV0Qyx1REFBdUQ7Z0JBRWhELGNBQWM7b0JBQ2pCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztvQkFFckIseUZBQXlGO29CQUN6RixpSkFBaUo7b0JBQ2pKLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDO3dCQUNyQyx1QkFBdUIsRUFBRTs0QkFDckIsVUFBVSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0NBQ3BCLCtDQUErQztnQ0FDL0MsSUFBSSxPQUFPLENBQUMsU0FBUyw0REFBa0QsRUFBRSxDQUFDO29DQUN0RSxTQUFTO29DQUNULE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO3dDQUM5QixHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUk7d0NBQ2pCLFNBQVMsRUFBRSxVQUFBLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQzs7Ozs7eUNBS3pDLENBQUM7cUNBQ0wsQ0FBQzt5Q0FDRyxPQUFPLEVBQUU7eUNBQ1QsSUFBSSxDQUFDLFVBQVUsSUFBSTt3Q0FDaEIsSUFBSSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7NENBQ2hCLElB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LElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ2hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTzs2QkFDekIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNiLENBQUMsQ0FBQzs2QkFDRCxJQUFJLENBQUM7NEJBQ0YsbUJBQW1COzRCQUNuQixpSEFBaUg7NEJBQ2pILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FDaEIsQ0FBQyx3QkFBd0IsR0FBRyxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFDdkQ7Z0NBQ0ksRUFBRSxFQUFFLFFBQVEsR0FBRyxHQUFHO2dDQUNsQixHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ2hCLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTzs2QkFDeEIsQ0FBQyxDQUFDO3dCQUNYLENBQUMsQ0FBQzs2QkFDRCxNQUFNLENBQUMsR0FBRyxFQUFFOzRCQUNULGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQzthQUNKLENBQUE7WUE1VlksUUFBUTtnQkFEcEIsUUFBUTtlQUNJLFFBQVEsQ0E0VnBCO1lBNVZZLGtCQUFRLFdBNFZwQixDQUFBO1FBQ0wsQ0FBQyxFQTVXb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNFc3QjtJQUFELENBQUMsRUE1V2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRXbkI7QUFBRCxDQUFDLEVBNVdTLE1BQU0sS0FBTixNQUFNLFFBNFdmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIE1haW5BcHBTbWwoY29udGVudDogR0NvbnRlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogcMWZZXN1bm91dCBzZW0gdnlicmFuw70gb2JzYWggeiBvbkNvbnRlbnRSZWFkeSBuw63FvmUgamFrbyBqc291IGFzeW5jaHJvbm7DrSDDumxvaHlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhsYXZuw60gY29udGVudCBTTUxcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA0ODguMS4wLjBcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR01haW5BcHAgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgZ2xvYmFsczogR29yZGljLlNtbC5JbnRlcmZhY2UuR1NtbEdsb2JhbHNEdG87XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBXRkwgcmVzb2x2ZXIgcHJvIGhsZWTDoW7DrSBwaWR1IGRvIG9iZWNuw6lobyBobGVkYWPDrWhvIHBvbMOtxI1rYSB2xI1ldG7EmyBkYWzFocOtY2ggV0ZMIGhsZWTDoW7DrVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBwb2t1ZCBieSBuZW3Em2xvIGLDvXQgZG9zdHVwbsOpIG9zdGF0bsOtIFdGTCBobGVkw6Fuw60sIHRhayBieSBzZSBtdXNlbGEgcG91xb7DrXQgbWV0b2RhIHJlZ2lzdGVyUGlkU2VhcmNoUmVzb2x2ZXIgbcOtc3RvIHJlZ2lzdGVyU2VhcmNoUmVzb2x2ZXJzXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuVXRpbHMucmVnaXN0ZXJTZWFyY2hSZXNvbHZlcnMoe1xyXG4gICAgICAgICAgICAgICAgcGlkU2VhcmNoUmVzb2x2ZXJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuRGV0YWlsOiAoaXhzSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbsOtIGRldGFpbMWvIHBvZGxlIHRvaG8sIG8gamFrw70gdHlwIGpkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhzSW5mby5Db0pzZW1aYWMgPT09IFdmbC5JbnRlcmZhY2UuR0lkZW50aWZpa2F0b3JDb0pzZW1aYWMuU21sb3V2YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5pc2wuRG9rbGFkU21sLnJlYWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogaXhzSW5mby5JeHgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogU21sVXRpbHMuYXJyYXlSZW1vdmVEdXBsaWNhdGVzKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvRnJhZ21lbnRzLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b0ZyYWdtZW50cy5rdGdfdHlwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9GcmFnbWVudHMua3RnX3R5cF9uYWRfcHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b0ZyYWdtZW50cy5rdGdfdHlwX25hZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YT8uaXhwX2Rlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjb250ZW50LmdwYywgZGF0YS5peHBfZGVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXRhaWxJRCA9IFNtbEdyaWQuZ2V0RGV0YWlsSWQoZGF0YSwgeyBrdGdfdHlwOiBkYXRhLmt0Z190eXBfbmFkX3ByID8/IGRhdGEua3RnX3R5cF9uYWQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5TbWwuV2ViQ2xpZW50LkdcIiArIGRldGFpbElELCB7IGdwYzogbmV3R3BjIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGRldGFpbElEICsgJyMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IGl4c0luZm8uSXh4MSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogamUgcG90xZllYmEgSXhwRGVuLCBrZHnFviBqZSB0byB2IGdwYz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwRGVuOiBkYXRhLml4cF9kZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKS5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKS5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5lem7DoW3DvSB0eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZShmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIERhc2hib2FyZFxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5CbG9nUHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIGJsb2fFr1xyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5BcnRpY2xlUHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIMSNbMOhbmvFryAodcW+aXZhdGVsc2t5IGVkaXRvdmF0ZWxuw70gdGV4dClcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuSXNsUHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIGpha8Opa29saSBkb3N0dXBuw6kgSVNMIG1ldG9keSB2cmFjZWrDrWPDrSBzZXpuYW0gZGF0IChqZSBtb8W+bsOpIG5hc3Rhdml0IGkgdm9sw6Fuw60gZGV0YWlsdSBwxZlpIGtsaWtudXTDrSBuYSBwb2xvxb5rdSlcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuUnNzUHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIFJTUyB6cHLDoXYgKHbEjWV0bsSbIHN0csOhbmtvdsOhbsOtLCB2eWhsZWTDoXbDoW7DrSBhIGZpbHRyb3bDoW7DrSBwb2RsZSBrYXRlZ29yacOtKSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLlJlc3RQcm92aWRlcigpKTsgLy96YXBvamVuw60gZXh0ZXJuw61jaCBSRVNUIHNsdcW+ZWJcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuRmlsZVByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBuYcSNw610w6Fuw60gZGF0IHplIHNvdWJvcnUgdHlwdSBKU09OLCBrdGVyw70gamUgdmxvxb5lbiBkbyBzbG/Fvmt5IERhdGEgdiBhZHJlc8OhxZlpIGFwbGlrYWNlXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLlhyZ1NlcnZpY2VQcm92aWRlcigpKTsgLy96YXBvamVuw60gbmHEjcOtdMOhbsOtIGRhdCB6ZSBYUkcgc2x1xb5ieSB1dmVkZW7DqSB2ZSB3ZWIuY29uZmlnIHNwb2x1IHMgbmFzdGF2ZW7DvW1pIHDFmcOtc3R1cG92w71taSDDumRhamlcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuRGF0YVJlcG9ydFByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBzZXN0YXZcclxuICAgICAgICAgICAgLy8gdmxhc3Ruw60gcHJvdmlkZXJ5XHJcbiAgICAgICAgICAgIC8vIG9ibMOtYmVuw6kga25paHlcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcnMucmVnaXN0ZXIoU21sRGFzaGJvYXJkLmNyZWF0ZVByb3ZpZGVyT2JsaWJlbmVLbmloeShjb250ZW50KSk7XHJcbiAgICAgICAgICAgIC8vIHBvxI10eSB6w6F6bmFtxa9cclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcnMucmVnaXN0ZXIoU21sRGFzaGJvYXJkLmNyZWF0ZVByb3ZpZGVyUG9jdHlLZVpwcmFjb3ZhbmkoY29udGVudCkpO1xyXG4gICAgICAgICAgICAvLyBwb3NsZWRuw60gesOhem5hbXlcclxuICAgICAgICAgICAgLy8gcG9zbGVkbsOtIHptxJtuxJtuw6kgZG9rbGFkeVxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLkN1c3RvbVByb3ZpZGVycy5yZWdpc3RlcihTbWxEYXNoYm9hcmQuY3JlYXRlUHJvdmlkZXJQb3NsZWRuaURva2xhZHkoY29udGVudCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gSHJvbWFkbsOhIEZLXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuV2ViQ2xpZW50LkdIRktBc3luY1V0aWxzKHRoaXMsIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCkpOyAvL3NwcsOhdm7EmyBieSBtxJtsIGLDvXQgcMWZZWTDoW0gR3JpZEZvcm3DoXQgamFrbyBwcnZvdG7EmyBwxZllZMOhdmFuw70gZG8gcHLFr3ZvZGNlXHJcblxyXG4gICAgICAgICAgICAvLyBSZWdpc3RyYWNlIGEgcG91xb5pdMOtIGFzeW5jaHJvbm7DrWNoIMO6bG9oIHUgaHJvbWFkbsOpaG8gb2Rlc2zDoW7DrSBkbyB2w71wcmF2bnkgLSBnZW5lcm92w6Fuw60gZWwuIG9icmF6xa9cclxuICAgICAgICAgICAgY29uc3QgbWFpbkNvbnRlbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAub24oXCJpbml0XCIsIFwiR29yZGljLkVrby5TZXJ2ZXIuR09kZXNsYXRNdWx0aXBsZVJlcG9ydHNBc3luY1Rhc2tcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdCA9IG5ldyBHT2JzZXJ2YWJsZU9iamVjdDxJR05vdGlmaWNhdGlvbk9wdGlvbnM+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDYwOFwiLCAvL1JDIDMzNjAwNjA4IDogSHJvbWFkbsSbIG9kZXNsYXQgZG8gdsO9cHJhdm55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJqcmVzOjMzNjAwNjA5XCIsIC8vUkMgMzM2MDA2MDkgOiBHZW5lcm92w6Fuw60gZWwuIG9icmF6xa8gcHJvIG7DoXNsZWRuw6kgb2Rlc2zDoW7DrSBkbyB2w71wcmF2bnkgYnlsbyB6YWjDoWplbm9cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBtYWluQ29udGVudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgbm90KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5vdGlmaWNhdGlvbihub3QpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNoYW5nZVwiLCBcIkdvcmRpYy5Fa28uU2VydmVyLkdPZGVzbGF0TXVsdGlwbGVSZXBvcnRzQXN5bmNUYXNrXCIsIGZ1bmN0aW9uIChjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL21vem5vIG5lamFrIHJlYWdvdmF0IG5hIHByb2dyZXNzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiaW5hY3RpdmVcIiwgXCJHb3JkaWMuRWtvLlNlcnZlci5HT2Rlc2xhdE11bHRpcGxlUmVwb3J0c0FzeW5jVGFza1wiLCBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb3pubyBuZWphayByZWFnb3ZhdCBuYSBzdGF2LCBrZHkgamUgdWxvaGEgbmVha3Rpdm5pIChuaWtkZSBqaXogbmViZXppKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbjxHb3JkaWMuQXN5bmMuSUdUYXNrUHJvZ3Jlc3MsIEdvcmRpYy5Fa28uVXRpbHMuR09kZXNsYXRQZXJzaXN0ZW50QXN5bmNUYXNrUmVzdWx0PihcImRvbmVcIiwgXCJHb3JkaWMuRWtvLlNlcnZlci5HT2Rlc2xhdE11bHRpcGxlUmVwb3J0c0FzeW5jVGFza1wiLCBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm90ID0gdGhpcy5nZXROb3RpZmljYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNob3dSZXN1bHRBY3QgPSBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dSZXN1bHRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDYxMFwiLCAvL1JDIDMzNjAwNjEwIDogT2Rlc2xhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zZW5kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gV2ZsLkRpYWxvZ3MuR09kZXNsYW5pRGxnKG1haW5Db250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhyb21hZG5lOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW4oKTsgLy9PZHN0cmFuaW1lIHNlcnZlcm92ZSBwcm9zdHJlZGt5IGFzeW5jLiB1bG9oeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluQ29udGVudC5ub3RpZmljYXRpb24oXCJyZW1vdmVcIiwgbm90KTsgLy9PZHN0cmFuaW1lIG5vdGlmaWthY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm90LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcImpyZXM6MzM2MDA2MTFcIiwgLy9SQyAzMzYwMDYxMSA6IEVsLiBvYnJhenkgYnlseSDDunNwxJvFoW7EmyB2eWdlbmVyb3bDoW55IGEgamUgbW/Fvm7DqSBqZSBvZGVzbGF0IGRvIHbDvXByYXZueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogc2hvd1Jlc3VsdEFjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IFt7IGFjdGlvbjogc2hvd1Jlc3VsdEFjdCB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaXNreSBzcG9sZcSNbsOpIHBybyBkb2tsYWR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHRpc2t5RG9rbGFkdSgpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJpbnRBY3Rpb24gPSBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza3lEb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJzbWxfcHRtX3BvcyxzbWxfcHRtX3phc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclJlc3RyaWN0aW9uQWx2TWV0aG9kOiBcIkdvcmRpYy5TbWwuV2ViQ2xpZW50LkdUaXNreURva2xhZHU6R2V0UmVzdHJpY3Rpb25BbHZcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlNtbC5XZWJDbGllbnQuR1Rpc2t5RG9rbGFkdTpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcmludEFjdGlvbi5ydW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90ZXbFmWVuw60gdXrDoXbEm3JreSBhZ2VuZFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgdXphdmVya2FBZ2VuZGEoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBHb3JkaWMuRWtvLldlYkNsaWVudC5JR0Vrb0FnZW5kYU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBhZ2VuZGE6IFwiU01MXCIsXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhOiAoKSA9PiB7IHJldHVybiB0aGlzLmlzbC5BZ2VuZGFTbWwubGlzdCgpLmdldERhdGEoKTsgfSxcclxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiAoVHlwQWcpID0+IHRoaXMuaXNsLkFnZW5kYVNtbC5nZXRQZXJtaXNzaW9ucyh7IHR5cEFnOiBUeXBBZ1swXS50eXBfYWcgPz8gMTEwIH0pLmdldCgpLFxyXG4gICAgICAgICAgICAgICAgY2xvc2U6IChhZ2VuZHkpID0+IHRoaXMuaXNsLkFnZW5kYVNtbC5ocm9tYWRuZVV6YXZyaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXphdnJpdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiBhZ2VuZHkgIT0gbnVsbCA/IChBcnJheS5pc0FycmF5KGFnZW5keSkgPyBhZ2VuZHkgOiBbYWdlbmR5XSkgOiBbXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2eXNsVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaHliYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMucmVzdWx0LmZvckVhY2gociA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoci5raW5kID09PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yKSBjaHliYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmVycm9ycy5mb3JFYWNoKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eXNsVGV4dCkgdnlzbFRleHQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eXNsVGV4dCArPSBlLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eXNsVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSB2w71zbGVka3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaHliYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJVesOhdsSbcmthIGFnZW5keVwiLCB2eXNsVGV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKCkgPT4gZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5hbGVydChcIlV6w6F2xJtya2EgYWdlbmR5XCIsIHZ5c2xUZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogdGF0byBtZXRvZGEgc2UgbmlrZGUgbmV2b2zDoSAtIHBva3VkIGJ5IHNlIHZvbGFsYSwgdGFrIGJ5IGJ5bG8gdmhvZG7DqSB6YXZvbGF0IG1ldG9kdSB6a29udHJvbHVqUHJlZFV6YXZyZW5pbVxyXG4gICAgICAgICAgICAgICAgY2hlY2tDbG9zZTogKGFnZW5keSkgPT4gJC5EZWZlcnJlZCgpLnJlc29sdmUoYWdlbmR5KS5wcm9taXNlKClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcyBhcyBhbnkpLm5hdmlnYXRlVGFzayhHb3JkaWMuRWtvLldlYkNsaWVudC5HRWtvQWdlbmRhLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90ZXbFmWVuw60gdXrDoXbEm3JreSBrbmloXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyB1emF2ZXJrYUtuaWh5KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gcG9tb2Nuw6EgbWV0b2RhIHBybyBwxZlldm9kIHbDvXN0dXB1IHplIHNlcnZlcm92w71jaCBtZXRvZCBkbyB0dmFydSBwcm8gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc3VsdFRvRHRvcyhyZXM6IElzbC5HU2VydmljZUdyb3VwUmVzcG9uc2U8RWtvLkludGVyZmFjZS5HRWtvVnlicmFuZUtuaWh5RHRvPik6IEVrby5JbnRlcmZhY2UuR0Vrb1Z5YnJhbmVLbmloeUR0b1tdIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMucmVzdWx0Lm1hcChyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gJC5leHRlbmQoe30sIHIuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93W1wid2l6X2NoZWNrXCJdID0gci5raW5kICE9PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluZm8gc2UgcMWZZW1hcG92w6F2w6EgbmEgc3VjY2VzcywgcHJvdG/FvmUgcHLFr3ZvZGNlIG5lb2JzbHVodWplIGluZm9cclxuICAgICAgICAgICAgICAgICAgICByb3dbXCJ3aXpfa2luZFwiXSA9IHIua2luZCA9PSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkluZm8gPyBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MgOiByLmtpbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZ5c2xUZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICByLmVycm9ycz8uZm9yRWFjaChlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZ5c2xUZXh0KSB2eXNsVGV4dCArPSBcIlxcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2eXNsVGV4dCArPSBlLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG96bsOhbWthOiB8fCBuYSByb3pkw61sIG9kID8/IHBvxZllxaHDrSBpIFwiXCJcclxuICAgICAgICAgICAgICAgICAgICByb3dbXCJ3aXpfdHh0X2VyclwiXSA9IHZ5c2xUZXh0IHx8IChyLmtpbmQgIT09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIk9rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkNoeWJhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogR29yZGljLkVrby5XZWJDbGllbnQuSUdFa29LbmloYU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBnZXREYXRhOiB0aGlzLmlzbC5LbmloYVNtbC5saXN0KCksXHJcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9uczogKCkgPT4gdGhpcy5pc2wuS25paGFTbWwuZ2V0U2VydmljZVBlcm1pc3Npb25zKCkuZ2V0KCksXHJcbiAgICAgICAgICAgICAgICBjbG9zZTogKGtuaWh5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLktuaWhhU21sLmhyb21hZG5lVXphdnJpKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXphdnJpdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czoga25paHlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFRvRHRvcyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja0Nsb3NlOiAoa25paHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuS25paGFTbWwuemtvbnRyb2x1alByZWRVemF2cmVuaW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1emF2cml0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBrbmloeVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0VG9EdG9zKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbENsb3NlOiAoa25paHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuS25paGFTbWwuaHJvbWFkbmVVemF2cmkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1emF2cml0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czoga25paHlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFRvRHRvcyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja0NhbmNlbENsb3NlOiAoa25paHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuS25paGFTbWwuemtvbnRyb2x1alByZWRVemF2cmVuaW0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1emF2cml0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czoga25paHlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFRvRHRvcyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcyBhcyBhbnkpLm5hdmlnYXRlVGFzayhHb3JkaWMuRWtvLldlYkNsaWVudC5HRWtvU2V6bmFtS25paCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGV2xZllbsOtIGthcnRvdMOpa3kgZXh0ZXJuw61jaCBzdWJqZWt0xa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMga2FydG90ZWthRXN1KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIC8vIFVjZWw6IDIsXHJcbiAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgIEl4cDogJzAwMDBYMDAwMDA0SicsXHJcbiAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LmthcnRvdGVrYVZNZW51QXBsaWthY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBJbml0aWFsVmFsdWVEdXZvZEhsZWRhbmlUeHQ6IFwianJlczoyNDEwMDAzMlwiIC8vUkMgMjQxMDAwMzIgOiBOYWhsw63FvmVuw60geiBtb2R1bHUgU01MXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRXN1LkRpYWxvZ3MuS2FydG90ZWthRXN1RGxnRnJvbU1haW4odGhhdCwgb3B0aW9ucywgR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5uYXZpZ2F0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFdmlkZW5jZSBkb2tsYWR1IHogcmVkaXN0cmlidWNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHt7IHBpZHM6IHN0cmluZ1tdLCB0eXBBZzogbnVtYmVyfX0gb2JqIHBhcmFtZXRyeSBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZXZpZGVuY2VEZWxlZ2F0ZShvYmo6IHsgcGlkczogc3RyaW5nW10sIHR5cEFnOiBudW1iZXIgfSkge1xyXG5cclxuICAgICAgICAgICAgLy8ga29udHJvbGEgdnN0dXBuw61jaCBwYXJhbWV0csWvXHJcbiAgICAgICAgICAgIGlmIChvYmoucGlkcz8ubGVuZ3RoID4gMSkgcmV0dXJuIHRoaXMuZGlhbG9ncy5lcnJvcihcclxuICAgICAgICAgICAgICAgIFwianJlczoyNDEwMDAzMFwiLCAvL1JDIDI0MTAwMDMwIDogRG9rdW1lbnR5IGsgZXZpZGVuY2lcclxuICAgICAgICAgICAgICAgIFwianJlczoyNDEwMDAzMVwiIC8vUkMgMjQxMDAwMzEgOiBFdmlkb3ZhdCBqZSBtb8W+bsOpIHBvdXplIGplZGVuIGRva3VtZW50XHJcbiAgICAgICAgICAgICkuY3JlYXRlRGlhbG9nUHJvbWlzZSgoKSA9PiBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChvYmoucGlkcz8ubGVuZ3RoIDwgMSkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGJ1ZGUgcG90xZllYmEgbsSbamFrw6EgZGFsxaHDrSBrb250cm9sYT9cclxuXHJcbiAgICAgICAgICAgIC8vIHbDvWLEm3IgY8OtbG92w6kga25paHksIHBvZMOhbsOtIGEgZXZpZGVuY2VcclxuICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Eb2NzRm9yUmVnLnNob3dFYm9va3NDaG9pY2UoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICBvYmoudHlwQWcvKjExMCovLFxyXG4gICAgICAgICAgICAgICAgLyp7XHJcbiAgICAgICAgICAgICAgICAgICAgW1NtbC5HbG9iYWxzLkVudW1zLlR5cEFnLlNNTF06IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLlNtbG91dnlEb2RhdmF0ZWxza2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNtbC5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5TbWxvdXZ5T2RiZXJhdGVsc2tlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uU21sb3V2eUJlelJvemxpc2VuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLlNtbG91dnlCZXpGUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLk9iamVkbmF2a3lEb2RhdmF0ZWxza2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNtbC5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5PYmplZG5hdmt5T2RiZXJhdGVsc2tlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uT2JqZWRuYXZreUJlelJvemxpc2VuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLk9iamVkbmF2a3lCZXpGUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLlByaXNsaWJ5SW5kaXZpZHVhbG5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uUHJpc2xpYnlMaW1pdG92YW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uUHJpam15SmluZU9jZWthdmFuZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLlByaWpteUppbmVJbmRpdmlkdWFsbmlcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgfSovKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGtuaWhhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZpZGVuY2UgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAvLyB6amnFoXTEm27DrSBidWRvdWPDrWhvIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXRhaWxJRCA9IFNtbEdyaWQuZ2V0RGV0YWlsSWRLdGdEZW4oa25paGEua3RnX2RlbiA/PyAwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3ZlR3BjID0gRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhpcy5ncGMsIGtuaWhhLml4cF9kZW4hKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXJ2aXNuw60gY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VDb250ZW50ID0gdGhpcy5jcmVhdGVTZXJ2aWNlQ29udGVudChbXCJHb3JkaWMuU21sLldlYkNsaWVudC5HXCIgKyBkZXRhaWxJRCwgeyBncGM6IG5vdmVHcGMgfV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGtvbnRyb2xhIHBydm7DrWhvIGRva2xhZHUgdiBrbml6ZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlQ29udGVudC5pc2wuRG9rbGFkU21sLnprb250cm9sdWpOYVBydm5pRG9rbGFkVktuaXplKHsgaXhwRGVuOiBrbmloYS5peHBfZGVuISB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHRleHREb3RhenUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGtvbnRyb2xhIHZyw6F0w60gZG90YXosIHRhayBzZSB6ZXB0YXQsIGplc3RsaSBtw6EgcHJ2bsOtIGRva2xhZCBzcHLDoXZuw6kgxI3DrXNsbywgamluYWsgamUgdG8gb2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0RG90YXp1KSByZXR1cm4gdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJOb3bDvSBkb2tsYWQgU01MXCIsIHRleHREb3RhenUpLmNyZWF0ZURpYWxvZ1Byb21pc2UoR0RsZy5tYmJZZXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUNvbnRlbnQuaXNsLkRva2xhZFNtbC5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogb2JqLnBpZHNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2Rlbjoga25paGEuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbmVidWRlIHBvdMWZZWJhIMWZZcWhaXQga29ua3LDqXRuw60gdHlwIGRldGFpbHU/IG11c2VsbyBieSB0byBhbGUgYsO9dCBwb2RsZSBrdGdfZGVuLCBwcm90b8W+ZSBuaWMgamluw6lobyBuZW3DoW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5TbWwuV2ViQ2xpZW50LkdcIiArIGRldGFpbElELCB7IGdwYzogbm92ZUdwYyB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBkZXRhaWxJRCArICcjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBvYmoucGlkc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwRGVuOiBrbmloYS5peHBfZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZUNvbnRlbnQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG59Il19