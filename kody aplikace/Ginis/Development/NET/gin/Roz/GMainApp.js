"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Hlavní content ROZ
             *
             * @author Tomas Kares
             * @since 484.1.0.15
             */
            let GMainApp = class GMainApp extends Gordic.GContentBase {
                /**
                 * onContentReady - metoda ktera se spusti pri zobrazeni contentu
                 * */
                onContentReady() {
                    const content = this;
                    // WFL resolver pro hledání pidu do obecného hledacího políčka včetně dalších WFL hledání
                    // Pokud nema byt dostupné ostatní WFL hledání (jako zde v ROZ), tak se pouzije metoda registerPidSearchResolver místo registerSearchResolvers
                    // Parametrem metody je rozhrani registerPidSearchResolverInput (zaslane jako objekt), ktere obsahuje pouze objekt pidSearchResolverParams
                    // pidSearchResolverParams je opet rozhrani, ktere obsahuje 3 metody. Ja plnim pouze openDetail
                    Gordic.Wfl.Utils.registerPidSearchResolver({
                        pidSearchResolverParams: {
                            // Funkce pro otevreni detailu v konkretnim modulu
                            // Na vstupu dostane informace o aktualni entite
                            // Pokud funkce otevre dialog, je nutne vratit promise s hodnotou true 
                            openDetail: (ixsInfo) => {
                                // Otevre novy content jako podrizenou aktivitu (bude zobrazena na plose hlavni aplikace, prekryvajici content z nejz byla aktivita otevrena, s provazanim zavislosti).
                                // Vstupem je ContentInitializer: string a objekt inputParams. Jako dalsi parametr lze zaslat GDialogOptions
                                content.navigate('Gordic.Roz.WebClient.GDetailDokladuTab', { id: 'rozDetailDokladu', Ixp: ixsInfo.Ixx1 });
                                // Vytvorim si odlozeny objekt, ktery by mel vravit logickou hodnotu. Nasledne jej ihned kladne vyresim a volajici metode predam do zpracovavajici metody then parametr true. Ta je ihned zavolana
                                return $.Deferred().resolve(true).promise();
                            }
                        }
                    });
                }
                // ***************************************
                //   Delegát pro evidenci z redistribuce
                // ***************************************
                evidenceDelegate(obj) {
                    return Gordic.Eko.Components.DocsForReg.showEbooksChoice(this.element, obj.typAg).then((kniha) => {
                        var that = this;
                        const noveGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, kniha.ixp_den); // nové GPC dle knihy
                        let l_oCnt = this.createServiceContent(["Gordic.Roz.WebClient.GRozServiceContent", { gpc: noveGpc }]); // vytvoření servisního contentu
                        //l_oCnt.gpcToken = noveGpc;
                        return l_oCnt.isl.RozDoklad.create({
                            parameters: {
                                kniha: kniha, noveGpc: noveGpc,
                            }, ixp: obj.pids[0],
                            action: 3 /* Gordic.Uct.Interface.GEAkceFormulare.Podani */,
                            data: {
                                ixp: obj.pids[0], parameters: {
                                    kniha: kniha, noveGpc: noveGpc,
                                }
                            }
                            //, PidDokladu: obj.pids[0]
                            //, ixpDen: kniha.ixp_den
                        })
                            .get()
                            .then(function (data) {
                            //return ZobrazDetailDleIXP(that, obj.pids[0], false,true);
                            return that.navigate(["Gordic.Uct.WebClient.GRozDetail", { gpc: noveGpc }], {
                                //uid: "Detail_dokladu#",
                                ixp: obj.pids[0],
                                EditaceHlavicky: true,
                                id: "roztDetailDokladu",
                            });
                        }).always(() => { l_oCnt.close(); }); // zavření servisního kontentu
                    });
                }
                /**
                 * Otevreni uzaverky agendy
                 *
                 * */
                openUzaverkaAgenda(agenda) {
                    let that = this;
                    const options = {
                        close: (typAg) => that.isl.RozAgenda.uzavritAgendu().getData(),
                        agenda: agenda,
                        permissions: (agendy) => that.isl.RozAgenda.povoleniAkciAgendy().get().then((r) => r),
                        getData: () => {
                            return that.isl.RozAgenda.read().getData().then((r) => [r]);
                        },
                        checkClose: (agendy) => $.Deferred().resolve(agendy).promise()
                    };
                    this.navigateTask(Gordic.Eko.WebClient.GEkoAgenda, options);
                }
                /**
                 * Otevreni uzaveky knih
                 * */
                openUzaverkaKnihy() {
                    let that = this;
                    const options = {
                        getData: this.isl.RozKniha.knihyKUzaverkam(),
                        cancelClose: (knihy) => that.isl.RozKniha.otevritKnihy({ knihy: knihy }).getData(),
                        permissions: () => that.isl.RozKniha.getPermissions().get().then((result) => result),
                        close: (knihy) => that.isl.RozKniha.uzavritKnihy({ knihy: knihy }).getData(),
                        checkCancelClose: (knihy) => that.isl.RozKniha.kontrolaKnihOtevrit({ knihy: knihy }).getData(),
                        checkClose: (knihy) => that.isl.RozKniha.kontrolaKnihUzavrit({ knihy: knihy }).getData()
                    };
                    this.navigateTask(Gordic.Eko.WebClient.GEkoSeznamKnih, options);
                }
            };
            GMainApp = __decorate([
                gcontent
            ], GMainApp);
            WebClient.GMainApp = GMainApp;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR01haW5BcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHTWFpbkFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBK0dmO0FBL0dELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQStHbkI7SUEvR2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQStHN0I7UUEvR29CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DOzs7OztlQUtHO1lBRUgsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUyxTQUFRLE9BQUEsWUFBWTtnQkFDdEM7O3FCQUVLO2dCQUNFLGNBQWM7b0JBQ2pCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztvQkFFckIseUZBQXlGO29CQUN6Riw4SUFBOEk7b0JBQzlJLDBJQUEwSTtvQkFDMUksK0ZBQStGO29CQUMvRixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQzt3QkFDdkMsdUJBQXVCLEVBQUU7NEJBQ3JCLGtEQUFrRDs0QkFDbEQsZ0RBQWdEOzRCQUNoRCx1RUFBdUU7NEJBQ3ZFLFVBQVUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dDQUNwQix1S0FBdUs7Z0NBQ3ZLLDRHQUE0RztnQ0FDNUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyx3Q0FBd0MsRUFBRSxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0NBQzFHLGtNQUFrTTtnQ0FDbE0sT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUN6RCxDQUFDO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztnQkFHUCxDQUFDO2dCQUVELDBDQUEwQztnQkFDMUMsd0NBQXdDO2dCQUN4QywwQ0FBMEM7Z0JBQzFD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LE9BQU8sRUFBRTtxQkFFN0YsQ0FBQztvQkFFRCxJQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDN0UsQ0FBQzthQUNKLENBQUE7WUFwR1ksUUFBUTtnQkFEcEIsUUFBUTtlQUNJLFFBQVEsQ0FvR3BCO1lBcEdZLGtCQUFRLFdBb0dwQixDQUFBO1FBQ0wsQ0FBQyxFQS9Hb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBK0c3QjtJQUFELENBQUMsRUEvR2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQStHbkI7QUFBRCxDQUFDLEVBL0dTLE1BQU0sS0FBTixNQUFNLFFBK0dmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Sb3ouV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIbGF2bsOtIGNvbnRlbnQgUk9aXHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciBUb21hcyBLYXJlc1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuMTVcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR01haW5BcHAgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9uQ29udGVudFJlYWR5IC0gbWV0b2RhIGt0ZXJhIHNlIHNwdXN0aSBwcmkgem9icmF6ZW5pIGNvbnRlbnR1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gV0ZMIHJlc29sdmVyIHBybyBobGVkw6Fuw60gcGlkdSBkbyBvYmVjbsOpaG8gaGxlZGFjw61obyBwb2zDrcSNa2EgdsSNZXRuxJsgZGFsxaHDrWNoIFdGTCBobGVkw6Fuw61cclxuICAgICAgICAgICAgLy8gUG9rdWQgbmVtYSBieXQgZG9zdHVwbsOpIG9zdGF0bsOtIFdGTCBobGVkw6Fuw60gKGpha28gemRlIHYgUk9aKSwgdGFrIHNlIHBvdXppamUgbWV0b2RhIHJlZ2lzdGVyUGlkU2VhcmNoUmVzb2x2ZXIgbcOtc3RvIHJlZ2lzdGVyU2VhcmNoUmVzb2x2ZXJzXHJcbiAgICAgICAgICAgIC8vIFBhcmFtZXRyZW0gbWV0b2R5IGplIHJvemhyYW5pIHJlZ2lzdGVyUGlkU2VhcmNoUmVzb2x2ZXJJbnB1dCAoemFzbGFuZSBqYWtvIG9iamVrdCksIGt0ZXJlIG9ic2FodWplIHBvdXplIG9iamVrdCBwaWRTZWFyY2hSZXNvbHZlclBhcmFtc1xyXG4gICAgICAgICAgICAvLyBwaWRTZWFyY2hSZXNvbHZlclBhcmFtcyBqZSBvcGV0IHJvemhyYW5pLCBrdGVyZSBvYnNhaHVqZSAzIG1ldG9keS4gSmEgcGxuaW0gcG91emUgb3BlbkRldGFpbFxyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLlV0aWxzLnJlZ2lzdGVyUGlkU2VhcmNoUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICAgICAgcGlkU2VhcmNoUmVzb2x2ZXJQYXJhbXM6IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRnVua2NlIHBybyBvdGV2cmVuaSBkZXRhaWx1IHYga29ua3JldG5pbSBtb2R1bHVcclxuICAgICAgICAgICAgICAgICAgICAvLyBOYSB2c3R1cHUgZG9zdGFuZSBpbmZvcm1hY2UgbyBha3R1YWxuaSBlbnRpdGVcclxuICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBmdW5rY2Ugb3RldnJlIGRpYWxvZywgamUgbnV0bmUgdnJhdGl0IHByb21pc2UgcyBob2Rub3RvdSB0cnVlIFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5EZXRhaWw6IChpeHNJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90ZXZyZSBub3Z5IGNvbnRlbnQgamFrbyBwb2RyaXplbm91IGFrdGl2aXR1IChidWRlIHpvYnJhemVuYSBuYSBwbG9zZSBobGF2bmkgYXBsaWthY2UsIHByZWtyeXZhamljaSBjb250ZW50IHogbmVqeiBieWxhIGFrdGl2aXRhIG90ZXZyZW5hLCBzIHByb3ZhemFuaW0gemF2aXNsb3N0aSkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZzdHVwZW0gamUgQ29udGVudEluaXRpYWxpemVyOiBzdHJpbmcgYSBvYmpla3QgaW5wdXRQYXJhbXMuIEpha28gZGFsc2kgcGFyYW1ldHIgbHplIHphc2xhdCBHRGlhbG9nT3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50Lm5hdmlnYXRlKCdHb3JkaWMuUm96LldlYkNsaWVudC5HRGV0YWlsRG9rbGFkdVRhYicsIHsgaWQ6ICdyb3pEZXRhaWxEb2tsYWR1JywgSXhwOiBpeHNJbmZvLkl4eDEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmltIHNpIG9kbG96ZW55IG9iamVrdCwga3RlcnkgYnkgbWVsIHZyYXZpdCBsb2dpY2tvdSBob2Rub3R1LiBOYXNsZWRuZSBqZWogaWhuZWQga2xhZG5lIHZ5cmVzaW0gYSB2b2xhamljaSBtZXRvZGUgcHJlZGFtIGRvIHpwcmFjb3ZhdmFqaWNpIG1ldG9keSB0aGVuIHBhcmFtZXRyIHRydWUuIFRhIGplIGlobmVkIHphdm9sYW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZSh0cnVlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gICBEZWxlZ8OhdCBwcm8gZXZpZGVuY2kgeiByZWRpc3RyaWJ1Y2VcclxuICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICBldmlkZW5jZURlbGVnYXRlKG9iajogeyBwaWRzOiBzdHJpbmdbXSwgdHlwQWc6IG51bWJlciB9KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuRG9jc0ZvclJlZy5zaG93RWJvb2tzQ2hvaWNlKHRoaXMuZWxlbWVudCwgb2JqLnR5cEFnKS50aGVuKChrbmloYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm92ZUdwYyA9IEVrby5VdGlscy5jcmVhdGVCb29rR3BjKHRoaXMuZ3BjLCBrbmloYS5peHBfZGVuISk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm92w6kgR1BDIGRsZSBrbmloeVxyXG4gICAgICAgICAgICAgICAgbGV0IGxfb0NudCA9IHRoaXMuY3JlYXRlU2VydmljZUNvbnRlbnQoW1wiR29yZGljLlJvei5XZWJDbGllbnQuR1JvelNlcnZpY2VDb250ZW50XCIsIHsgZ3BjOiBub3ZlR3BjIH1dKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBzZXJ2aXNuw61obyBjb250ZW50dVxyXG4gICAgICAgICAgICAgICAgLy9sX29DbnQuZ3BjVG9rZW4gPSBub3ZlR3BjO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxfb0NudC5pc2wuUm96RG9rbGFkLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmloYToga25paGEsIG5vdmVHcGM6IG5vdmVHcGMsXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgaXhwOiBvYmoucGlkc1swXVxyXG4gICAgICAgICAgICAgICAgICAgICwgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9kYW5pXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogb2JqLnBpZHNbMF0sIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtuaWhhOiBrbmloYSwgbm92ZUdwYzogbm92ZUdwYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIFBpZERva2xhZHU6IG9iai5waWRzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgLy8sIGl4cERlbjoga25paGEuaXhwX2RlblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBab2JyYXpEZXRhaWxEbGVJWFAodGhhdCwgb2JqLnBpZHNbMF0sIGZhbHNlLHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5uYXZpZ2F0ZShbXCJHb3JkaWMuVWN0LldlYkNsaWVudC5HUm96RGV0YWlsXCIsIHsgZ3BjOiBub3ZlR3BjIH1dLCB7ICAgICAgICAgICAgICAgICAgICAgIC8vIG90ZXbFmcOtdCBkZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdWlkOiBcIkRldGFpbF9kb2tsYWR1I1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiBvYmoucGlkc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRhY2VIbGF2aWNreTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInJvenREZXRhaWxEb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApLmFsd2F5cygoKSA9PiB7IGxfb0NudC5jbG9zZSgpOyB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphdsWZZW7DrSBzZXJ2aXNuw61obyBrb250ZW50dVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGV2cmVuaSB1emF2ZXJreSBhZ2VuZHlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBvcGVuVXphdmVya2FBZ2VuZGEoYWdlbmRhKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogR29yZGljLkVrby5XZWJDbGllbnQuSUdFa29BZ2VuZGFPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgY2xvc2U6ICh0eXBBZykgPT4gdGhhdC5pc2wuUm96QWdlbmRhLnV6YXZyaXRBZ2VuZHUoKS5nZXREYXRhKCksXHJcbiAgICAgICAgICAgICAgICBhZ2VuZGE6IGFnZW5kYSxcclxuICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zOiAoYWdlbmR5KSA9PiB0aGF0LmlzbC5Sb3pBZ2VuZGEucG92b2xlbmlBa2NpQWdlbmR5KCkuZ2V0KCkudGhlbigocikgPT4gciksXHJcbiAgICAgICAgICAgICAgICBnZXREYXRhOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlJvekFnZW5kYS5yZWFkKCkuZ2V0RGF0YSgpLnRoZW4oKHIpID0+IFtyXSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2hlY2tDbG9zZTogKGFnZW5keSkgPT4gJC5EZWZlcnJlZCgpLnJlc29sdmUoYWdlbmR5KS5wcm9taXNlKCkgXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAodGhpcyBhcyBhbnkpLm5hdmlnYXRlVGFzayhHb3JkaWMuRWtvLldlYkNsaWVudC5HRWtvQWdlbmRhLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3RldnJlbmkgdXphdmVreSBrbmloXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgb3BlblV6YXZlcmthS25paHkoKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogR29yZGljLkVrby5XZWJDbGllbnQuSUdFa29LbmloYU9wdGlvbnMgPSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YTogdGhpcy5pc2wuUm96S25paGEua25paHlLVXphdmVya2FtKCksXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxDbG9zZTogKGtuaWh5KSA9PiB0aGF0LmlzbC5Sb3pLbmloYS5vdGV2cml0S25paHkoeyBrbmloeToga25paHkgfSkuZ2V0RGF0YSgpLFxyXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnM6ICgpID0+IHRoYXQuaXNsLlJvektuaWhhLmdldFBlcm1pc3Npb25zKCkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiByZXN1bHQpXHJcbiAgICAgICAgICAgICAgICAsIGNsb3NlOiAoa25paHkpID0+IHRoYXQuaXNsLlJvektuaWhhLnV6YXZyaXRLbmloeSh7IGtuaWh5OiBrbmloeSB9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICwgY2hlY2tDYW5jZWxDbG9zZTogKGtuaWh5KSA9PiB0aGF0LmlzbC5Sb3pLbmloYS5rb250cm9sYUtuaWhPdGV2cml0KHsga25paHk6IGtuaWh5IH0pLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLCBjaGVja0Nsb3NlOiAoa25paHkpID0+IHRoYXQuaXNsLlJvektuaWhhLmtvbnRyb2xhS25paFV6YXZyaXQoeyBrbmloeToga25paHkgfSkuZ2V0RGF0YSgpXHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgKHRoaXMgYXMgYW55KS5uYXZpZ2F0ZVRhc2soR29yZGljLkVrby5XZWJDbGllbnQuR0Vrb1Nlem5hbUtuaWgsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==