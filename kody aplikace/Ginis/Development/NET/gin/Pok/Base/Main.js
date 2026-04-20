"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Pok.WebClient.Main.ts                                </Name>
//    <Description>                                                             </Description>
//    <Author>      Brezina                                                     </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2020                            </Copyright>
//    <Created>     2020-06-02                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            const { gcontent } = Decorators;
            /**
             * Hlavní content Pok.
             *
             * @author  VBrezina
             * @date    2.6.2020
             */
            let Main = class Main extends Gordic.GContentBase {
                //---------------------------------------------------------------------
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
                            InitialValueDuvodHledaniTxt: "Nahlížení z modulu POK"
                        }
                    };
                    return Gordic.Esu.Dialogs.KartotekaEsuDlgFromMain(that, options, Gordic.Global.Enums.ModOtevreni.navigate);
                }
                oknoSmluv() {
                    let that = this;
                    return that.navigate([
                        Gordic.Eko.GVyberSmlouvy, {
                            options: {
                                isSmlSelect: false,
                                inputDto: { rokSml: that.gpc.rok, rokPol: Number(that.gpc.rok) },
                                esuLogovani: {
                                    Ixp: "0000X000004J",
                                    AktZnacka: "0000X000004J",
                                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                                    DuvodHledaniTxt: "Zobrazení smlouvy z aplikace POK"
                                },
                                init: function (inputDto, filter) {
                                    var values = {};
                                    var pripady = Gordic.Eko.GVyberSmlouvy.PripadyEnum;
                                    filter.smluvni_pripady = [pripady.SeSchvalenouPolozkou, pripady.SVyhovujiciPolozkou];
                                },
                                related: that
                            }
                        }
                    ], {}, { width: 1000, height: 800 }).promise();
                }
                onContentReady() {
                    const content = this;
                    // Zaregistruji WFL resolver hledání pidu  do obecného hledacího políčka.
                    // Pokud chcete použít všechna hledání z Wfl pak místo registerPidSearchResolver použijte funkci registerSearchResolvers.
                    // Gordic.Wfl.Utils.registerPidSearchResolver();
                    Gordic.Wfl.Utils.registerPidSearchResolver({
                        pidSearchResolverParams: {
                            openDetail: (ixsInfo) => {
                                if (false) {
                                    return $.Deferred().resolve(false).promise();
                                }
                                content.isl.PokDoklad.read({
                                    ixp: ixsInfo.Ixx1,
                                    fragments: ["POKSPID"]
                                })
                                    .getData()
                                    .then(function (doklad) {
                                    if (doklad.ixp_den) {
                                        let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, doklad.ixp_den);
                                        content.navigate(["Gordic.Pok.WebClient.GPokDetailDokladuTab", { uid: "GPokDetailDokladu#", gpc: newGpc }], {
                                            ixp: ixsInfo.Ixx1,
                                            newPodani: false
                                        });
                                    }
                                });
                                return $.Deferred().resolve(true).promise();
                            },
                            // Nepovinné - Možnost povolit / zakázat dohledávání žádostí o podpis.
                            // hledejZadostiOPodpis: this.UsingEpkInUsu
                        }
                    });
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.BlogProvider());
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.ArticleProvider());
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.DataReportProvider());
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.IslProvider());
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.RssProvider());
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.FileProvider());
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.XrgServiceProvider());
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.DataReportProvider());
                    Gordic.Dashboard.Providers.register(new Gordic.Dashboard.SqlProvider());
                    var customProvider3 = new Gordic.Dashboard.CustomProvider("Dostupné knihy", "dostupne_knihy_2", () => {
                        var Akce_ISL_View_Kniha_Dostupne = new Gordic.Isl.View(content.isl.PokKniha.list(rq => {
                            return {
                                filters: {
                                    aktivita: [100, 300, 400, 500]
                                }
                            };
                        }), {
                            onResponse: function (response) {
                                response.data = response.data.map(function (row, ii) {
                                    return new GObservableObject({
                                        title: row.zkratka,
                                        subtitle: row.nazev,
                                        icon: "fa-book",
                                        value: Gordic.Templates.Formatters.number(parseDecimal(row.c_zustatek_m), "C2"),
                                        formatter: "dotNetDecimal",
                                        unit: row.mena_zkr,
                                        detailsDirection: "vertical",
                                        details: [
                                            {
                                                description: "Počáteční zůstatek: ",
                                                unit: Gordic.Templates.Formatters.number(parseDecimal(row.c_pocatek_m), "C2") + " " + row.mena_zkr,
                                                meaning: "neutral",
                                                //formatter: "C"
                                            },
                                            row.mena == 0 ? {} : //valutová pokladna
                                                {
                                                    description: "Počáteční zůstatek: ",
                                                    unit: Gordic.Templates.Formatters.number(parseDecimal(row.c_pocatek), "C2") + " CZK",
                                                    meaning: "neutral",
                                                    //formatter: "C"
                                                },
                                            {
                                                description: "Hlavní uzávěrka: ",
                                                value: (row.dat_uz_hl ? parseDate(row.dat_uz_hl) : ""),
                                                meaning: "negative",
                                            },
                                            {
                                                description: "Dílčí uzávěrka: ",
                                                value: (row.dat_uz_den ? parseDate(row.dat_uz_den) : ""),
                                                meaning: "negative",
                                                formatter: "dd.MM.yyyy hh:mm:ss"
                                            },
                                            {
                                                description: "Stav knihy: ",
                                                value: row.aktivita_txt
                                            }
                                        ],
                                        ixpDen: row.ixp_den
                                    });
                                });
                                return response;
                            }
                        });
                        this.beginOperation();
                        //return $("<div>").gbasepanel(Gordic.Prefabs.Panels.kpiMultiRowsTemplate(), {
                        //var panel_3 = $("<div>").gbasepanel(Gordic.Prefabs.Panels.kpiMultiRowsTemplate(), {
                        //    id: "lastModifiedBooks",
                        //    mode: "table",
                        //    itemTemplate: Gordic.Prefabs.Panels.kpiMultiRowsTemplate().itemTemplate,
                        //    defaultSelected: false,
                        //    data: Akce_ISL_View_Kniha_Dostupne,
                        //    selection: function (ev, ctx) {
                        //    },
                        //});
                        var panel_3 = $("<div>").gkpipanel({
                            // that.cardPanel = $("<div>").appendTo(that.element).gcardpanel({
                            itemTemplate: Gordic.Prefabs.Panels.universalTemplate().itemTemplate,
                            // itemTemplate: myItemTemplate,
                            ////opened: false,
                            data: Akce_ISL_View_Kniha_Dostupne,
                            fixedWidth: true,
                            width: 400,
                            // editable: false,
                            //createTab: true,
                            defaultSelected: false,
                            defaultAction: new GAction({
                                name: "actPokDetailKnihyDashBoard",
                                icon: "gi-detail",
                                run: function (ev, ctx) {
                                    let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, ctx.item.data.ixpDen);
                                    content.navigate(["Gordic.Pok.WebClient.GPokSeznamDokladuTab", { uid: "GPokSeznamDokladu#", taskId: 'actPokSeznamDokladu', gpc: newGpc }], {});
                                }
                            })
                        });
                        Akce_ISL_View_Kniha_Dostupne.requestData().always(() => {
                            this.endOperation();
                            if (panel_3.hasClass("gcover")) {
                                panel_3.gcover("destroy");
                            }
                        });
                        return panel_3;
                    });
                    Gordic.Dashboard.CustomProviders.register(customProvider3);
                }
            };
            Main = __decorate([
                gcontent
            ], Main);
            WebClient.Main = Main;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjs7Ozs7OztBQUlqQixJQUFVLE1BQU0sQ0EyT2Y7QUEzT0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMk9uQjtJQTNPZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMk83QjtRQTNPb0IsV0FBQSxTQUFTO1lBQzFCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUE7WUFFL0I7Ozs7O2VBS0c7WUFFSCxJQUFhLElBQUksR0FBakIsTUFBYSxJQUFLLFNBQVEsT0FBQSxZQUFZO2dCQUVsQyx1RUFBdUU7Z0JBQ3ZFOzttQkFFRztnQkFDSSxZQUFZO29CQUdmLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxPQUFPLEdBQUc7d0JBQ1YsV0FBVzt3QkFDWCxRQUFRLEVBQUU7NEJBQ04sR0FBRyxFQUFFLGNBQWM7NEJBQ25CLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLHNCQUFzQjs0QkFDN0UsU0FBUyxFQUFFLEVBQUU7NEJBQ2IsZUFBZSxFQUFFLEVBQUU7NEJBQ25CLDJCQUEyQixFQUFFLHdCQUF3Qjt5QkFDeEQ7cUJBQ0osQ0FBQztvQkFDRixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMvRyxDQUFDO2dCQUlNLFNBQVM7b0JBRVosSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixPQUFP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LENBQUM7b0JBRUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUkvRCxDQUFDO2FBQ0osQ0FBQTtZQTlOWSxJQUFJO2dCQURoQixRQUFRO2VBQ0ksSUFBSSxDQThOaEI7WUE5TlksY0FBSSxPQThOaEIsQ0FBQTtRQUdMLENBQUMsRUEzT29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTJPN0I7SUFBRCxDQUFDLEVBM09nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyT25CO0FBQUQsQ0FBQyxFQTNPUyxNQUFNLEtBQU4sTUFBTSxRQTJPZiIsInNvdXJjZXNDb250ZW50IjpbIi8vICA8RmlsZUhlYWRlciB4bWxucz1cImh0dHA6Ly93d3cuZ29yZGljLmN6L3NoYXJlZC9maWxlLWhlYWRlci92XzEuMC4wLjBcIj5cclxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5NYWluLnRzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L05hbWU+XHJcbi8vICAgIDxEZXNjcmlwdGlvbj4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EZXNjcmlwdGlvbj5cclxuLy8gICAgPEF1dGhvcj4gICAgICBCcmV6aW5hICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0F1dGhvcj5cclxuLy8gICAgPENvcHlyaWdodD4gICDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db3B5cmlnaHQ+XHJcbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMC0wNi0wMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxyXG4vLyAgPC9GaWxlSGVhZGVyPlxyXG5cclxuXHJcblxyXG5uYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG4gICAgY29uc3QgeyBnY29udGVudCB9ID0gRGVjb3JhdG9yc1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGxhdm7DrSBjb250ZW50IFBvay5cclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yICBWQnJlemluYVxyXG4gICAgICogQGRhdGUgICAgMi42LjIwMjBcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgTWFpbiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3RldsWZZW7DrSBrYXJ0b3TDqWt5IGV4dGVybsOtY2ggc3ViamVrdMWvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGthcnRvdGVrYUVzdSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IFxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgLy8gVWNlbDogMixcclxuICAgICAgICAgICAgICAgIExvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgSXhwOiAnMDAwMFgwMDAwMDRKJyxcclxuICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3Uua2FydG90ZWthVk1lbnVBcGxpa2FjZSxcclxuICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIEluaXRpYWxWYWx1ZUR1dm9kSGxlZGFuaVR4dDogXCJOYWhsw63FvmVuw60geiBtb2R1bHUgUE9LXCIgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRXN1LkRpYWxvZ3MuS2FydG90ZWthRXN1RGxnRnJvbU1haW4odGhhdCwgb3B0aW9ucywgR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5uYXZpZ2F0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBva25vU21sdXYoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5uYXZpZ2F0ZShbXHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLkVrby5HVnliZXJTbWxvdXZ5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NtbFNlbGVjdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RHRvOiB7IHJva1NtbDogdGhhdC5ncGMucm9rLCByb2tQb2w6IE51bWJlcih0aGF0LmdwYy5yb2spfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXN1TG9nb3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogXCIwMDAwWDAwMDAwNEpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCIwMDAwWDAwMDAwNEpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJab2JyYXplbsOtIHNtbG91dnkgeiBhcGxpa2FjZSBQT0tcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoaW5wdXREdG8sIGZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlczogYW55ID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByaXBhZHkgPSBHb3JkaWMuRWtvLkdWeWJlclNtbG91dnkuUHJpcGFkeUVudW07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNtbHV2bmlfcHJpcGFkeSA9IFtwcmlwYWR5LlNlU2NodmFsZW5vdVBvbG96a291LCBwcmlwYWR5LlNWeWhvdnVqaWNpUG9sb3prb3VdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbGF0ZWQ6IHRoYXRcclxuICAgICAgICAgICAgICAgICAgICB9IGFzIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5HRWtvVnliZXJQb2xvemt5U21sb3V2eU9wdGlvbnNcclxuICAgICAgICAgICAgICAgIH1dLCB7fSwgeyB3aWR0aDogMTAwMCwgaGVpZ2h0OiA4MDAgfVxyXG4gICAgICAgICAgICApLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gWmFyZWdpc3RydWppIFdGTCByZXNvbHZlciBobGVkw6Fuw60gcGlkdSAgZG8gb2JlY27DqWhvIGhsZWRhY8OtaG8gcG9sw63EjWthLlxyXG4gICAgICAgICAgICAvLyBQb2t1ZCBjaGNldGUgcG91xb7DrXQgdsWhZWNobmEgaGxlZMOhbsOtIHogV2ZsIHBhayBtw61zdG8gcmVnaXN0ZXJQaWRTZWFyY2hSZXNvbHZlciBwb3XFvmlqdGUgZnVua2NpIHJlZ2lzdGVyU2VhcmNoUmVzb2x2ZXJzLlxyXG4gICAgICAgICAgIC8vIEdvcmRpYy5XZmwuVXRpbHMucmVnaXN0ZXJQaWRTZWFyY2hSZXNvbHZlcigpO1xyXG5cclxuICAgICAgICAgICAgR29yZGljLldmbC5VdGlscy5yZWdpc3RlclBpZFNlYXJjaFJlc29sdmVyKHtcclxuICAgICAgICAgICAgICAgIHBpZFNlYXJjaFJlc29sdmVyUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkRldGFpbDogKGl4c0luZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5pc2wuUG9rRG9rbGFkLnJlYWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiBpeHNJbmZvLkl4eDEhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCJQT0tTUElEXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZG9rbGFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRva2xhZC5peHBfZGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdHcGMgPSBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoY29udGVudC5ncGMsIGRva2xhZC5peHBfZGVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5uYXZpZ2F0ZShbXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRGV0YWlsRG9rbGFkdVRhYlwiLCB7IHVpZDogXCJHUG9rRGV0YWlsRG9rbGFkdSNcIiAsIGdwYzogbmV3R3BjIH1dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IGl4c0luZm8uSXh4MSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb2Rhbmk6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUodHJ1ZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5lcG92aW5uw6kgLSBNb8W+bm9zdCBwb3ZvbGl0IC8gemFrw6F6YXQgZG9obGVkw6F2w6Fuw60gxb7DoWRvc3TDrSBvIHBvZHBpcy5cclxuICAgICAgICAgICAgICAgICAgIC8vIGhsZWRlalphZG9zdGlPUG9kcGlzOiB0aGlzLlVzaW5nRXBrSW5Vc3VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5CbG9nUHJvdmlkZXIoKSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkFydGljbGVQcm92aWRlcigpKTtcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuRGF0YVJlcG9ydFByb3ZpZGVyKCkpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5Jc2xQcm92aWRlcigpKTtcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuUnNzUHJvdmlkZXIoKSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLkZpbGVQcm92aWRlcigpKTtcclxuICAgICAgICAgICAgR29yZGljLkRhc2hib2FyZC5Qcm92aWRlcnMucmVnaXN0ZXIobmV3IEdvcmRpYy5EYXNoYm9hcmQuWHJnU2VydmljZVByb3ZpZGVyKCkpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRGFzaGJvYXJkLlByb3ZpZGVycy5yZWdpc3RlcihuZXcgR29yZGljLkRhc2hib2FyZC5EYXRhUmVwb3J0UHJvdmlkZXIoKSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuUHJvdmlkZXJzLnJlZ2lzdGVyKG5ldyBHb3JkaWMuRGFzaGJvYXJkLlNxbFByb3ZpZGVyKCkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBjdXN0b21Qcm92aWRlcjMgPSBuZXcgR29yZGljLkRhc2hib2FyZC5DdXN0b21Qcm92aWRlcihcIkRvc3R1cG7DqSBrbmloeVwiLCBcImRvc3R1cG5lX2tuaWh5XzJcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBBa2NlX0lTTF9WaWV3X0tuaWhhX0Rvc3R1cG5lID0gbmV3IEdvcmRpYy5Jc2wuVmlldyhcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmlzbC5Qb2tLbmloYS5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogWzEwMCwgMzAwLCA0MDAsIDUwMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHJlc3BvbnNlLmRhdGEubWFwKGZ1bmN0aW9uIChyb3csIGlpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiByb3cuemtyYXRrYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VidGl0bGU6IHJvdy5uYXpldixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1ib29rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHBhcnNlRGVjaW1hbChyb3cuY196dXN0YXRla19tISksIFwiQzJcIikgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiZG90TmV0RGVjaW1hbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0OiByb3cubWVuYV96a3IsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvxI3DoXRlxI1uw60gesWvc3RhdGVrOiBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bml0OiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKHBhcnNlRGVjaW1hbChyb3cuY19wb2NhdGVrX20hKSwgXCJDMlwiKSArIFwiIFwiICsgcm93Lm1lbmFfemtyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwibmV1dHJhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybWF0dGVyOiBcIkNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5tZW5hID09IDAgPyB7fSA6IC8vdmFsdXRvdsOhIHBva2xhZG5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb8SNw6F0ZcSNbsOtIHrFr3N0YXRlazogXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pdDogR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihwYXJzZURlY2ltYWwocm93LmNfcG9jYXRlayEpLCBcIkMyXCIpICsgXCIgQ1pLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwibmV1dHJhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1hdHRlcjogXCJDXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkhsYXZuw60gdXrDoXbEm3JrYTogXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IChyb3cuZGF0X3V6X2hsID8gcGFyc2VEYXRlKHJvdy5kYXRfdXpfaGwhKSA6IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwibmVnYXRpdmVcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkTDrWzEjcOtIHV6w6F2xJtya2E6IFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAocm93LmRhdF91el9kZW4gPyBwYXJzZURhdGUocm93LmRhdF91el9kZW4hKSA6IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwibmVnYXRpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiZGQuTU0ueXl5eSBoaDptbTpzc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlN0YXYga25paHk6IFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3cuYWt0aXZpdGFfdHh0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBEZW46IHJvdy5peHBfZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIGFzIGFueTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vcmV0dXJuICQoXCI8ZGl2PlwiKS5nYmFzZXBhbmVsKEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlNdWx0aVJvd3NUZW1wbGF0ZSgpLCB7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBwYW5lbF8zID0gJChcIjxkaXY+XCIpLmdiYXNlcGFuZWwoR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaU11bHRpUm93c1RlbXBsYXRlKCksIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGlkOiBcImxhc3RNb2RpZmllZEJvb2tzXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBtb2RlOiBcInRhYmxlXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlNdWx0aVJvd3NUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkYXRhOiBBa2NlX0lTTF9WaWV3X0tuaWhhX0Rvc3R1cG5lLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwYW5lbF8zID0gJChcIjxkaXY+XCIpLmdrcGlwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5jYXJkUGFuZWwgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nY2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy51bml2ZXJzYWxUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBpdGVtVGVtcGxhdGU6IG15SXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy9vcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEFrY2VfSVNMX1ZpZXdfS25paGFfRG9zdHVwbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVkaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2NyZWF0ZVRhYjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UG9rRGV0YWlsS25paHlEYXNoQm9hcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdHcGMgPSBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoY29udGVudC5ncGMsIGN0eC5pdGVtLmRhdGEuaXhwRGVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubmF2aWdhdGUoW1wiR29yZGljLlBvay5XZWJDbGllbnQuR1Bva1Nlem5hbURva2xhZHVUYWJcIiwgeyB1aWQ6IFwiR1Bva1Nlem5hbURva2xhZHUjXCIsIHRhc2tJZDogJ2FjdFBva1Nlem5hbURva2xhZHUnICwgZ3BjOiBuZXdHcGMgfV0sIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBBa2NlX0lTTF9WaWV3X0tuaWhhX0Rvc3R1cG5lLnJlcXVlc3REYXRhKCkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYW5lbF8zLmhhc0NsYXNzKFwiZ2NvdmVyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhbmVsXzMuZ2NvdmVyKFwiZGVzdHJveVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwYW5lbF8zO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5EYXNoYm9hcmQuQ3VzdG9tUHJvdmlkZXJzLnJlZ2lzdGVyKGN1c3RvbVByb3ZpZGVyMyk7XHJcblxyXG4gICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0gXHJcblxyXG5cclxufSJdfQ==