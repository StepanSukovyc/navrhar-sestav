"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            function MainAppBuc(content) {
                // TODO: přesunout sem vybraný obsah z onContentReady níže jako jsou asynchronní úlohy
            }
            WebClient.MainAppBuc = MainAppBuc;
            /**
             * Hlavní content BUC
             *
             * @author Martin Boček
             * @since 484.1.0.3
             */
            let GMainApp = class GMainApp extends Gordic.GContentBase {
                onContentReady() {
                    const content = this;
                    // WFL resolver pro hledání pidu do obecného hledacího políčka včetně dalších WFL hledání
                    Gordic.Wfl.Utils.registerSearchResolvers({
                        pidSearchResolverParams: {
                            openDetail: (ixsInfo) => {
                                // zobrazení detailů podle toho, o jaký typ jde
                                if (ixsInfo.CoJsemZac === 900 /* Wfl.Interface.GIdentifikatorCoJsemZac.BankovniVypis */) {
                                    // bankovní výpis
                                    return content.isl.BucBankovniVypis.read({ ixp: ixsInfo.Ixx1 })
                                        .getData()
                                        .then(function (data) {
                                        if (data?.ixp_den) {
                                            let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, data.ixp_den);
                                            content.navigate(["Gordic.Buc.WebClient.GBankovniVypisDetail", { uid: "GBankovniVypisDetail", gpc: newGpc }], {
                                                Ixp: ixsInfo.Ixx1,
                                                IxpDen: data.ixp_den
                                            });
                                            return $.Deferred().resolve(true);
                                        }
                                        else
                                            return $.Deferred().resolve(false);
                                    });
                                }
                                else if (ixsInfo.CoJsemZac === 950 /* Wfl.Interface.GIdentifikatorCoJsemZac.DavkaPrikazu */) {
                                    // dávka s příkazy do Banky
                                    return content.isl.DavkaPDB.read({ ixp_dav: ixsInfo.Ixx1 })
                                        .getData()
                                        .then(function (data) {
                                        if (data?.ixp_dav) {
                                            let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, data.ixp_dav);
                                            content.navigate(["Gordic.Buc.WebClient.GDetailDavka", { uid: "GDetailDavka", gpc: newGpc }], {
                                                ID: 'DetailDavka#',
                                                ixp_dav: data.ixp_dav
                                            });
                                            return $.Deferred().resolve(true);
                                        }
                                        else
                                            return $.Deferred().resolve(false);
                                    });
                                }
                                else if (ixsInfo.CoJsemZac /*=== 980*/) {
                                    // dávka s příkazy do Banky
                                    return content.isl.Prikaz.read({ ixp: ixsInfo.Ixx1 })
                                        .getData()
                                        .then(function (data) {
                                        if (data?.ixp) {
                                            let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, data.ixp);
                                            content.navigate(["Gordic.Buc.WebClient.GDetailPrikaz", { uid: "GDetailPrikaz", gpc: newGpc }], {
                                                ID: 'DetailPrikaz#',
                                                ixp_dav: data.ixp
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
                    //Zapojení datových zdrojů pro GDashboardContent
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.BlogProvider()); //zapojení blogů
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.ArticleProvider()); //zapojení článků (uživatelsky editovatelný text)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.IslProvider()); //zapojení jakékoli dostupné ISL metody vracející seznam dat (je možné nastavit i volání detailu při kliknutí na položku)
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RssProvider()); //zapojení RSS zpráv (včetně stránkování, vyhledávání a filtrování podle kategorií)           
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RestProvider()); //zapojení externích REST služeb
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.FileProvider()); //zapojení načítání dat ze souboru typu JSON, který je vložen do složky Data v adresáři aplikace
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.XrgServiceProvider()); //zapojení načítání dat ze XRG služby uvedené ve web.config spolu s nastavenými přístupovými údaji
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.DataReportProvider()); //zapojení sestav
                    // vlastní providery pro nový content
                    // počty pohybů k účtování
                    ////if (FucDashboard.jePovolenoUctovani(content)) Gordic.Dashboard.CustomProviders.register(FucDashboard.createProviderPoctyPohybuKUctovani(content));
                    // Registrace a použití asynchronních úloh u načtení el. bankovních výpisů
                    const mainContent = this;
                    Gordic.Async.GTaskManager
                        .on("init", "Gordic.Buc.Server.GNacteniElVypisuAsyncTask", function (ctx) {
                        const not = new GObservableObject({
                            title: "Asynchronní načtení el. bankovních výpisů",
                            //icon: "fa-print",
                            content: "Načítání el. bankovních výpisů bylo zahájeno",
                        });
                        mainContent.notification("add", not);
                        this.setNotification(not);
                    })
                        .on("change", "Gordic.Buc.Server.GNacteniElVypisuAsyncTask", function (ctx) {
                        //mozno nejak reagovat na progress
                    })
                        .on("inactive", "Gordic.Buc.Server.GNacteniElVypisuAsyncTask", function (ctx) {
                        //mozno nejak reagovat na stav, kdy je uloha neaktivni (nikde jiz nebezi)
                    })
                        .on("done", "Gordic.Buc.Server.GNacteniElVypisuAsyncTask", function (ctx) {
                        const not = this.getNotification();
                        if (not) {
                            const showResultAct = new GAction({
                                name: "showResultAct",
                                caption: "Výsledek",
                                //icon: "gi-detail",
                                run: () => {
                                    return mainContent.dialogs.showModalWindow(Gordic.Buc.WebClient.GNacteniElVypisuResult, { data: ctx.result.resDto }, { height: 500, width: 1000 }).createDialogPromise()
                                        .then(() => {
                                        this.clean(); //Odstranime serverove prostredky async. ulohy
                                        mainContent.notification("remove", not); //Odstranime notifikaci
                                    });
                                }
                            });
                            not.update({
                                content: "Načítání bankovních výpisů dokončeno",
                                state: "success",
                                defaultAction: showResultAct,
                                commandBar: [{ action: showResultAct }]
                            });
                        }
                    });
                }
            };
            GMainApp = __decorate([
                gcontent
            ], GMainApp);
            WebClient.GMainApp = GMainApp;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR01haW5BcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTWFpbkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBaUpmO0FBakpELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWlKbkI7SUFqSmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWlKN0I7UUFqSm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DLFNBQWdCLFVBQVUsQ0FBQyxPQUFpQjtnQkFFeEMsc0ZBQXNGO1lBQzFGLENBQUM7WUFIZSxvQkFBVSxhQUd6QixDQUFBO1lBRUQ7Ozs7O2VBS0c7WUFFSCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFTLFNBQVEsT0FBQSxZQUFZO2dCQUMvQixjQUFjO29CQUNqQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRXJCLHlGQUF5RjtvQkFDekYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUM7d0JBQ3JDLHVCQUF1QixFQUFFOzRCQUNyQixVQUFVLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQ0FDcEIsK0NBQStDO2dDQUMvQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLGtFQUF3RCxFQUFFLENBQUM7b0NBQzVFLGlCQUFpQjtvQ0FDakIsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7eUNBQzFELE9BQU8sRUFBRTt5Q0FDVCxJQUFJLENBQUMsVUFBVSxJQUFJO3dDQUNoQixJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzs0Q0FDaEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9B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QUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsbUJBQW1CLEVBQUU7eUNBQ25LLElBQUksQ0FBQyxHQUFHLEVBQUU7d0NBQ1AsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsOENBQThDO3dDQUM1RCxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtvQ0FDcEUsQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsQ0FBQzs2QkFDSixDQUFDLENBQUM7NEJBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQ0FDUCxPQUFPLEVBQUUsc0NBQXNDO2dDQUMvQyxLQUFLLEVBQUUsU0FBUztnQ0FDaEIsYUFBYSxFQUFFLGFBQWE7Z0NBQzVCLFVBQVUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDOzZCQUMxQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2FBQ0osQ0FBQTtZQWpJWSxRQUFRO2dCQURwQixRQUFRO2VBQ0ksUUFBUSxDQWlJcEI7WUFqSVksa0JBQVEsV0FpSXBCLENBQUE7UUFDTCxDQUFDLEVBakpvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFpSjdCO0lBQUQsQ0FBQyxFQWpKZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBaUpuQjtBQUFELENBQUMsRUFqSlMsTUFBTSxLQUFOLE1BQU0sUUFpSmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gTWFpbkFwcEJ1Yyhjb250ZW50OiBHQ29udGVudCkge1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBwxZllc3Vub3V0IHNlbSB2eWJyYW7DvSBvYnNhaCB6IG9uQ29udGVudFJlYWR5IG7DrcW+ZSBqYWtvIGpzb3UgYXN5bmNocm9ubsOtIMO6bG9oeVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGxhdm7DrSBjb250ZW50IEJVQ1xyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgTWFydGluIEJvxI1la1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuM1xyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHTWFpbkFwcCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIFdGTCByZXNvbHZlciBwcm8gaGxlZMOhbsOtIHBpZHUgZG8gb2JlY27DqWhvIGhsZWRhY8OtaG8gcG9sw63EjWthIHbEjWV0bsSbIGRhbMWhw61jaCBXRkwgaGxlZMOhbsOtXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuVXRpbHMucmVnaXN0ZXJTZWFyY2hSZXNvbHZlcnMoe1xyXG4gICAgICAgICAgICAgICAgcGlkU2VhcmNoUmVzb2x2ZXJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuRGV0YWlsOiAoaXhzSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbsOtIGRldGFpbMWvIHBvZGxlIHRvaG8sIG8gamFrw70gdHlwIGpkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhzSW5mby5Db0pzZW1aYWMgPT09IFdmbC5JbnRlcmZhY2UuR0lkZW50aWZpa2F0b3JDb0pzZW1aYWMuQmFua292bmlWeXBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmFua292bsOtIHbDvXBpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLkJ1Y0Jhbmtvdm5pVnlwaXMucmVhZCh7IGl4cDogaXhzSW5mby5JeHgxIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhPy5peHBfZGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3R3BjID0gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKGNvbnRlbnQuZ3BjLCBkYXRhLml4cF9kZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HQmFua292bmlWeXBpc0RldGFpbFwiLCB7IHVpZDogXCJHQmFua292bmlWeXBpc0RldGFpbFwiLCBncGM6IG5ld0dwYyB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogaXhzSW5mby5JeHgxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBEZW46IGRhdGEuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGl4c0luZm8uQ29Kc2VtWmFjID09PSBXZmwuSW50ZXJmYWNlLkdJZGVudGlmaWthdG9yQ29Kc2VtWmFjLkRhdmthUHJpa2F6dSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZMOhdmthIHMgcMWZw61rYXp5IGRvIEJhbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5pc2wuRGF2a2FQREIucmVhZCh7IGl4cF9kYXY6IGl4c0luZm8uSXh4MSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YT8uaXhwX2Rhdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjb250ZW50LmdwYywgZGF0YS5peHBfZGF2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkJ1Yy5XZWJDbGllbnQuR0RldGFpbERhdmthXCIsIHsgdWlkOiBcIkdEZXRhaWxEYXZrYVwiLCBncGM6IG5ld0dwYyB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiAnRGV0YWlsRGF2a2EjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RhdjogZGF0YS5peHBfZGF2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoaXhzSW5mby5Db0pzZW1aYWMgLyo9PT0gOTgwKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGTDoXZrYSBzIHDFmcOta2F6eSBkbyBCYW5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQuaXNsLlByaWthei5yZWFkKHsgaXhwOiBpeHNJbmZvLkl4eDEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGE/Lml4cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyhjb250ZW50LmdwYywgZGF0YS5peHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXCJHb3JkaWMuQnVjLldlYkNsaWVudC5HRGV0YWlsUHJpa2F6XCIsIHsgdWlkOiBcIkdEZXRhaWxQcmlrYXpcIiwgZ3BjOiBuZXdHcGMgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogJ0RldGFpbFByaWtheiMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGF2OiBkYXRhLml4cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV6bsOhbcO9IHR5cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKS5yZXNvbHZlKGZhbHNlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9aYXBvamVuw60gZGF0b3bDvWNoIHpkcm9qxa8gcHJvIEdEYXNoYm9hcmRDb250ZW50XHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkJsb2dQcm92aWRlcigpKTsgLy96YXBvamVuw60gYmxvZ8WvXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkFydGljbGVQcm92aWRlcigpKTsgLy96YXBvamVuw60gxI1sw6Fua8WvICh1xb5pdmF0ZWxza3kgZWRpdG92YXRlbG7DvSB0ZXh0KVxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5Jc2xQcm92aWRlcigpKTsgLy96YXBvamVuw60gamFrw6lrb2xpIGRvc3R1cG7DqSBJU0wgbWV0b2R5IHZyYWNlasOtY8OtIHNlem5hbSBkYXQgKGplIG1vxb5uw6kgbmFzdGF2aXQgaSB2b2zDoW7DrSBkZXRhaWx1IHDFmWkga2xpa251dMOtIG5hIHBvbG/Fvmt1KVxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5Sc3NQcm92aWRlcigpKTsgLy96YXBvamVuw60gUlNTIHpwcsOhdiAodsSNZXRuxJsgc3Ryw6Fua292w6Fuw60sIHZ5aGxlZMOhdsOhbsOtIGEgZmlsdHJvdsOhbsOtIHBvZGxlIGthdGVnb3Jpw60pICAgICAgICAgICBcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuUmVzdFByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBleHRlcm7DrWNoIFJFU1Qgc2x1xb5lYlxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5GaWxlUHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIG5hxI3DrXTDoW7DrSBkYXQgemUgc291Ym9ydSB0eXB1IEpTT04sIGt0ZXLDvSBqZSB2bG/FvmVuIGRvIHNsb8W+a3kgRGF0YSB2IGFkcmVzw6HFmWkgYXBsaWthY2VcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuWHJnU2VydmljZVByb3ZpZGVyKCkpOyAvL3phcG9qZW7DrSBuYcSNw610w6Fuw60gZGF0IHplIFhSRyBzbHXFvmJ5IHV2ZWRlbsOpIHZlIHdlYi5jb25maWcgc3BvbHUgcyBuYXN0YXZlbsO9bWkgcMWZw61zdHVwb3bDvW1pIMO6ZGFqaVxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5EYXRhUmVwb3J0UHJvdmlkZXIoKSk7IC8vemFwb2plbsOtIHNlc3RhdlxyXG4gICAgICAgICAgICAvLyB2bGFzdG7DrSBwcm92aWRlcnkgcHJvIG5vdsO9IGNvbnRlbnRcclxuICAgICAgICAgICAgLy8gcG/EjXR5IHBvaHlixa8gayDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgLy8vL2lmIChGdWNEYXNoYm9hcmQuamVQb3ZvbGVub1VjdG92YW5pKGNvbnRlbnQpKSBHb3JkaWMuRGFzaGJvYXJkLkN1c3RvbVByb3ZpZGVycy5yZWdpc3RlcihGdWNEYXNoYm9hcmQuY3JlYXRlUHJvdmlkZXJQb2N0eVBvaHlidUtVY3RvdmFuaShjb250ZW50KSk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWdpc3RyYWNlIGEgcG91xb5pdMOtIGFzeW5jaHJvbm7DrWNoIMO6bG9oIHUgbmHEjXRlbsOtIGVsLiBiYW5rb3Zuw61jaCB2w71waXPFr1xyXG4gICAgICAgICAgICBjb25zdCBtYWluQ29udGVudCA9IHRoaXM7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Bc3luYy5HVGFza01hbmFnZXJcclxuICAgICAgICAgICAgICAgIC5vbihcImluaXRcIiwgXCJHb3JkaWMuQnVjLlNlcnZlci5HTmFjdGVuaUVsVnlwaXN1QXN5bmNUYXNrXCIsIGZ1bmN0aW9uIChjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3QgPSBuZXcgR09ic2VydmFibGVPYmplY3Q8SUdOb3RpZmljYXRpb25PcHRpb25zPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFzeW5jaHJvbm7DrSBuYcSNdGVuw60gZWwuIGJhbmtvdm7DrWNoIHbDvXBpc8WvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJmYS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIk5hxI3DrXTDoW7DrSBlbC4gYmFua292bsOtY2ggdsO9cGlzxa8gYnlsbyB6YWjDoWplbm9cIixcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBtYWluQ29udGVudC5ub3RpZmljYXRpb24oXCJhZGRcIiwgbm90KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5vdGlmaWNhdGlvbihub3QpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNoYW5nZVwiLCBcIkdvcmRpYy5CdWMuU2VydmVyLkdOYWN0ZW5pRWxWeXBpc3VBc3luY1Rhc2tcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbW96bm8gbmVqYWsgcmVhZ292YXQgbmEgcHJvZ3Jlc3NcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJpbmFjdGl2ZVwiLCBcIkdvcmRpYy5CdWMuU2VydmVyLkdOYWN0ZW5pRWxWeXBpc3VBc3luY1Rhc2tcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbW96bm8gbmVqYWsgcmVhZ292YXQgbmEgc3Rhdiwga2R5IGplIHVsb2hhIG5lYWt0aXZuaSAobmlrZGUgaml6IG5lYmV6aSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub248R29yZGljLkFzeW5jLklHVGFza1Byb2dyZXNzLCBHTmFjdGVuaUVsVnlwaXN1QXN5bmNPdXRQdXREdG8+KFwiZG9uZVwiLCBcIkdvcmRpYy5CdWMuU2VydmVyLkdOYWN0ZW5pRWxWeXBpc3VBc3luY1Rhc2tcIiwgZnVuY3Rpb24gKGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdCA9IHRoaXMuZ2V0Tm90aWZpY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93UmVzdWx0QWN0ID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzaG93UmVzdWx0QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlbDvXNsZWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1haW5Db250ZW50LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5CdWMuV2ViQ2xpZW50LkdOYWN0ZW5pRWxWeXBpc3VSZXN1bHQsIHsgZGF0YTogY3R4LnJlc3VsdC5yZXNEdG8gfSwgeyBoZWlnaHQ6IDUwMCwgd2lkdGg6IDEwMDAgfSkuY3JlYXRlRGlhbG9nUHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW4oKTsgLy9PZHN0cmFuaW1lIHNlcnZlcm92ZSBwcm9zdHJlZGt5IGFzeW5jLiB1bG9oeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNvbnRlbnQubm90aWZpY2F0aW9uKFwicmVtb3ZlXCIsIG5vdCk7IC8vT2RzdHJhbmltZSBub3RpZmlrYWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm90LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIk5hxI3DrXTDoW7DrSBiYW5rb3Zuw61jaCB2w71waXPFryBkb2tvbsSNZW5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBzaG93UmVzdWx0QWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZEJhcjogW3sgYWN0aW9uOiBzaG93UmVzdWx0QWN0IH1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==