"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Kdf;
    (function (Kdf) {
        var WebClient;
        (function (WebClient) {
            let MainApp = 
            /**
             * Hlavní content KDF
             *
             * @author Michal Prošek
             * @since 484.1.0.0
             */
            class MainApp extends Gordic.GContentBase {
                onContentReady() {
                    const content = this;
                    let that = this;
                    let GlobalniPromenne = that.prop("BplGlobalniPromenne");
                    // *************
                    //   RESOLVERY
                    // *************
                    //return content.isl.BplFakturaDosla.readKniha({ ixp: ixsInfo.Ixx1, fragments: [Bpl.Interface.GBplFakturaDoslaDtoFragments.ixp_den] })
                    //    .getData()
                    //    .then(function (data) {
                    //        if (data?.ixp_den) {
                    //            let newGpc = Gordic.Eko.Utils.createBookGpc(content.gpc, data.ixp_den);
                    //            content.navigate(
                    //                ["Gordic.Bpl.WebClient.GDetailDokladu", { gpc: newGpc }],
                    //                {
                    //                    uid: 'Detail_dokladu#',
                    //                    Ixp: ixsInfo.Ixx1,
                    //                    IxpDen: data.ixp_den
                    //                }
                    //            );
                    //            return $.Deferred<boolean>().resolve(true);
                    //        }
                    //        else return $.Deferred<boolean>().resolve(false);
                    //    });
                    // WFL hledání podle zásilky, spisu, spisové značky
                    Gordic.Wfl.Utils.registerSearchResolvers({
                        commonOptions: {
                            modifyResult: Gordic.Search.Eko.changeConfidenceOfSearchResultsBy(-0.01),
                        },
                        pidSearchResolverParams: {
                            modifyResult: null,
                            openDetail: (ixsInfo) => {
                                // zobrazení detailů podle toho, o jaký typ jde
                                if (ixsInfo.CoJsemZac === 300 /* Wfl.Interface.GIdentifikatorCoJsemZac.FakturaDorucena */) { // faktura
                                    // TODO: doplnit dotažení knihy (a dalších údajů?)
                                    content.navigate("Gordic.Bpl.WebClient.GKdfDetailDokladuTab", {
                                        ID: "DetailDokladu#",
                                        Ixp: ixsInfo.Ixx1 // identifikátor
                                    });
                                    return $.Deferred().resolve(true).promise();
                                }
                                else { // neznámý typ
                                    return $.Deferred().resolve(false).promise();
                                }
                            }
                        }
                    });
                    // EKO hledání podle VS, EČ a AČ
                    $('body').gsearchable('add', new Gordic.Search.Bpl.GBplVsSearchResolver());
                    $('body').gsearchable('add', new Gordic.Search.Bpl.GBplAcSearchResolver());
                    $('body').gsearchable('add', new Gordic.Search.Bpl.GBplAcAgSearchResolver());
                    //Gordic.Wfl.WebClient.GHFKAsyncUtils(this, new Data.GridFormat());                                                       // správně by měl být předám GridFormát jako prvotně předávaný do průvodce
                    // *************
                    //   NASTAVENÍ
                    // *************
                    let l_oForm = new Gordic.Forms.Form({
                        name: "GLocalSettingsForm", tabOptions: { title: "jres:29750084", opened: true }
                    }) // RC 29750084 : Detaily dokladů
                        // Předplnění identifikátoru
                        .addRow("jres:29750071").addField("gstringbox", "w-4", {
                        disabled: false,
                        name: "ixxInit",
                        model: "Global.Wfl.AppSettings.OthersSettings.PredplneniPID=value"
                    })
                        // Maximální výše zaokrouhlení
                        .addRow("jres:29750159").addField("gnumberbox", "w-4", Gordic.Prefabs.Number.currency(), {
                        disabled: false,
                        name: "limitZaokrouhleni",
                        model: "Global.Kdf.AppSettings.OthersSettings.LimitZaokrouhleni=value"
                    });
                    let NksFilters = {
                        aktivita: 100,
                        ico: GlobalniPromenne.ekoParamsIco,
                        vazbaUcsNaEkovnks: GlobalniPromenne.ekoParamsUcs,
                        rok_od: "<= " + GlobalniPromenne.ekoParamsRok,
                        rok_do: ">= " + GlobalniPromenne.ekoParamsRok
                    };
                    if (GlobalniPromenne.gin_rad_fcens)
                        NksFilters = $.extend({}, NksFilters, { vazbaNksNaFunkci: GlobalniPromenne.ixs_fun });
                    const l_oFormUctovani = new Gordic.Forms.Form({
                        name: "GLocalSettingsFormUctovani", tabOptions: { title: "Nastavení účtování", opened: true }
                    })
                        // Účetní Kniha
                        .addRow("Účetní kniha").addField("gselectbox", "w-4", Gordic.Prefabs.Select.uctsden(), {
                        name: "kniha",
                        model: "Global.Kdf.AppSettings.OthersSettings.Kniha=value"
                    })
                        //Účetní funkce
                        .addRow("Účetní funkce").addField("gselectbox", "w-4", Gordic.Prefabs.Select.ginsfun(), {
                        name: "funkce",
                        model: "Global.Kdf.AppSettings.OthersSettings.Funkce=value"
                    })
                        //Účetní subřada
                        .addRow("Účetní subřada").addField("gselectbox", "w-4", Gordic.Prefabs.Select.uctddde(), {
                        name: "subrada",
                        model: "Global.Kdf.AppSettings.OthersSettings.Subrada=value"
                    })
                        // Nákladové středisko
                        .addRow("Nákladové středisko").addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekosnks(), {
                        name: "nks",
                        model: "Global.Kdf.AppSettings.OthersSettings.Nks=value",
                        serverFilters: NksFilters
                    })
                        .addRow("Zobrazení zástupek při pořizování krytí/ předpisu").addField("gselectbox", {
                        itemTemplate: "{text}",
                        name: "showCompensation",
                        list: true,
                        model: "Global.Kdf.AppSettings.OthersSettings.ShowCompensation=value.showCompensation",
                        data: new Gordic.Data.View([{ showCompensation: 0, text: "jres:29750193" }, { showCompensation: 1, text: "jres:29750194" }], { key: "showCompensation" }), // RC 29750193 : v rozbalených řádcích nezobrazovat zástupky    // RC 29750194 : v rozbalených řádcích zobrazit zástupky
                    });
                    // Samostatná záložka likvidace - zatím zakomentováno - T37928
                    //.addRow("Samostatná záložka likvidace").addField("gcheck", "w-4", {
                    //    name: "likvidaceTabGroup",
                    //    initialValue: true,
                    //    model: "Global.Kdf.AppSettings.OthersSettings.likvidaceTabGroup=value"
                    //})
                    // standardní uživatelské nastavení WFL a EKO
                    Gordic.WebApp.globalSettingForms.register([Gordic.Report.WebClient.GReportsUserSettings(),
                        Gordic.Wfl.AppSettings.AttachmentOpenSettingsForm(),
                        Gordic.Wfl.AppSettings.ColorPickerSettingsForm(),
                        Gordic.Eko.Utils.EkoUserSettingsPid(GlobalniPromenne.gin_gen_ixp ?? "ne"),
                        Gordic.Eko.Utils.EkoUserSettingsEkoBook(),
                        Gordic.Eko.Utils.EkoUserSettingsList(), l_oForm, l_oFormUctovani]);
                }
                // ***************************************
                //   Delegát pro evidenci z redistribuce
                // ***************************************
                evidenceDelegate(obj) {
                    return Gordic.Eko.Components.DocsForReg.showEbooksChoice(this.element, obj.typAg).then((kniha) => {
                        var that = this;
                        let l_oCnt = this.createServiceContent("Gordic.Bpl.WebClient.GKdfDetailDokladuTab"); // vytvoření servisního contentu
                        return l_oCnt.call("AkcePodani", {
                            ixp: obj.pids[0], // identifiátor dokladu
                            zeSSL: true, // je to podání dokladu ze SSL
                            ixp_den: kniha.ixp_den // kniha dokladu
                        }).then(function (data) {
                            const noveGpc = Gordic.Eko.Utils.createBookGpc(l_oCnt.gpc, kniha.ixp_den); // nové GPC dle knihy
                            return that.navigate(["Gordic.Bpl.WebClient.GKdfDetailDokladuTab", { gpc: noveGpc }], {
                                uid: "Detail_dokladu#", ixp: obj.pids[0], duplikovaniVyber: null, jeEditovatelne: true
                            }); // parametry otevření detailu
                        }).always(() => { l_oCnt.close(); }); // zavření servisního kontentu
                    });
                }
                /**
                 * Otevření kartotéky externích subjektů
                 */
                kartotekaEsu() {
                    let that = this;
                    var options = {
                        Logovani: {
                            Ixp: '0000X000004J',
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.kartotekaVMenuAplikace,
                            AktZnacka: "",
                            DuvodHledaniTxt: "",
                            InitialValueDuvodHledaniTxt: "jres:29750187" // RC 29750187 : Nahlížení z modulu KDF
                        }
                    };
                    return Gordic.Esu.Dialogs.KartotekaEsuDlgFromMain(that, options, Gordic.Global.Enums.ModOtevreni.navigate);
                }
                /**
                 * Otevření uzávěrky agendy
                 */
                uzaverkaAgendy(agenda) {
                    const options = {
                        close: (typAg) => this.isl.AgendaBpl.uzavritAgendu().getData(),
                        agenda: agenda,
                        permissions: (agendy) => this.isl.AgendaBpl.povoleniAkciAgendy().get().then((r) => r),
                        getData: () => {
                            return this.isl.AgendaBpl.read().getData().then((r) => [r]);
                        },
                        checkClose: (agendy) => $.Deferred().resolve(agendy).promise()
                    };
                    this.navigateTask(Gordic.Eko.WebClient.GEkoAgenda, options);
                }
                /**
                 * Otevření uzávěrky knih
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                uzaverkaKnihy() {
                    const options = {
                        getData: this.isl.KnihaBpl.list(),
                        permissions: () => { return this.isl.KnihaBpl.getServicePermissions().get(); },
                        // Kontrola uzavření knih
                        checkClose: (knihy) => {
                            return this.isl.KnihaBpl.kontrolaKnihUzaverky({
                                knihy: knihy,
                                operace: 0 /* Gordic.Bpl.Interface.GEBPLTypyUzaverekKnih.UZAVRENI_KNIHY */
                            })
                                .get()
                                .then((result) => {
                                return result.data;
                            });
                        },
                        checkPrepareClose: (knihy) => {
                            return this.isl.KnihaBpl.kontrolaKnihUzaverky({
                                knihy: knihy,
                                operace: 1 /* Gordic.Bpl.Interface.GEBPLTypyUzaverekKnih.PRIPRAVA_KNIHY_K_UZAVRENI */
                            })
                                .get()
                                .then((result) => {
                                return result.data;
                            });
                        },
                        checkCancelPrepareClose: (knihy) => {
                            return this.isl.KnihaBpl.kontrolaKnihUzaverky({
                                knihy: knihy,
                                operace: 2 /* Gordic.Bpl.Interface.GEBPLTypyUzaverekKnih.ZRUSENI_PRIPRAVY_KNIHY_K_UZAVRENI */
                            })
                                .get()
                                .then((result) => {
                                return result.data;
                            });
                        },
                        close: (knihy) => this.isl.KnihaBpl.uzavritKnihy({ knihy: knihy }).getData(), // uzavření knih
                        prepareClose: (knihy) => this.isl.KnihaBpl.pripravaKnihKUzavreni({ knihy: knihy, priprava: true }).getData(), // příprava k uzavření
                        cancelPrepareClose: (knihy) => this.isl.KnihaBpl.pripravaKnihKUzavreni({ knihy: knihy, priprava: false }).getData() // zrušení přípravy k uzavření
                    };
                    return this.navigateTask(Gordic.Eko.WebClient.GEkoSeznamKnih, options);
                }
            };
            MainApp = __decorate([
                Decorators.gcontent
                /**
                 * Hlavní content KDF
                 *
                 * @author Michal Prošek
                 * @since 484.1.0.0
                 */
            ], MainApp);
            WebClient.MainApp = MainApp;
        })(WebClient = Kdf.WebClient || (Kdf.WebClient = {}));
    })(Kdf = Gordic.Kdf || (Gordic.Kdf = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1haW5BcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXdRZjtBQXhRRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3UW5CO0lBeFFnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3UTdCO1FBeFFvQixXQUFBLFNBQVM7WUFVMUIsSUFBYSxPQUFPO1lBUHBCOzs7OztlQUtHO1lBRUgsTUFBYSxPQUFRLFNBQVEsT0FBQSxZQUFZO2dCQUM5QixjQUFjO29CQUNqQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRXJCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxnQkFBZ0IsR0FBb0MsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUd6RixnQkFBZ0I7b0JBQ2hCLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUVoQixzSUFBc0k7b0JBQ3RJLGdCQUFnQjtvQkFDaEIsNkJBQTZCO29CQUM3Qiw4QkFBOEI7b0JBQzlCLHFGQUFxRjtvQkFDckYsK0JBQStCO29CQUMvQiwyRUFBMkU7b0JBQzNFLG1CQUFtQjtvQkFDbkIsNkNBQTZDO29CQUM3Qyx3Q0FBd0M7b0JBQ3hDLDBDQUEwQztvQkFDMUMsbUJBQW1CO29CQUNuQixnQkFBZ0I7b0JBQ2hCLHlEQUF5RDtvQkFDekQsV0FBVztvQkFDWCwyREFBMkQ7b0JBQzNELFNBQVM7b0JBR1QsbURBQW1EO29CQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQzt3QkFDckMsYUFBYSxFQUFFOzRCQUNYLFlBQVksRUFBRSxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxJQUFJLENBQUM7eUJBQ3BFO3dCQUNELHVCQUF1QixFQUFFOzRCQUNyQixZQUFZLEVBQUUsSUFBSTs0QkFDbEIsVUFBVSxFQUFF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QUFDO2FBR0osQ0FBQTtZQTdQWSxPQUFPO2dCQVRuQixVQUFVLENBQUMsUUFBUTtnQkFFcEI7Ozs7O21CQUtHO2VBRVUsT0FBTyxDQTZQbkI7WUE3UFksaUJBQU8sVUE2UG5CLENBQUE7UUFDTCxDQUFDLEVBeFFvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF3UTdCO0lBQUQsQ0FBQyxFQXhRZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBd1FuQjtBQUFELENBQUMsRUF4UVMsTUFBTSxLQUFOLE1BQU0sUUF3UWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLktkZi5XZWJDbGllbnQge1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhsYXZuw60gY29udGVudCBLREZcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIE1pY2hhbCBQcm/FoWVrXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC4wXHJcbiAgICAgKi9cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWFpbkFwcCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IEdsb2JhbG5pUHJvbWVubmU6IEdvcmRpYy5CcGwuSW50ZXJmYWNlLkdsb2JhbHNEdG8gPSB0aGF0LnByb3AoXCJCcGxHbG9iYWxuaVByb21lbm5lXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vICoqKioqKioqKioqKipcclxuICAgICAgICAgICAgLy8gICBSRVNPTFZFUllcclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKlxyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm4gY29udGVudC5pc2wuQnBsRmFrdHVyYURvc2xhLnJlYWRLbmloYSh7IGl4cDogaXhzSW5mby5JeHgxLCBmcmFnbWVudHM6IFtCcGwuSW50ZXJmYWNlLkdCcGxGYWt0dXJhRG9zbGFEdG9GcmFnbWVudHMuaXhwX2Rlbl0gfSlcclxuICAgICAgICAgICAgLy8gICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAvLyAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgaWYgKGRhdGE/Lml4cF9kZW4pIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBsZXQgbmV3R3BjID0gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKGNvbnRlbnQuZ3BjLCBkYXRhLml4cF9kZW4pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnRlbnQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5CcGwuV2ViQ2xpZW50LkdEZXRhaWxEb2tsYWR1XCIsIHsgZ3BjOiBuZXdHcGMgfV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHVpZDogJ0RldGFpbF9kb2tsYWR1IycsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBJeHA6IGl4c0luZm8uSXh4MSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIEl4cERlbjogZGF0YS5peHBfZGVuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKS5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gV0ZMIGhsZWTDoW7DrSBwb2RsZSB6w6FzaWxreSwgc3Bpc3UsIHNwaXNvdsOpIHpuYcSNa3lcclxuICAgICAgICAgICAgR29yZGljLldmbC5VdGlscy5yZWdpc3RlclNlYXJjaFJlc29sdmVycyh7XHJcbiAgICAgICAgICAgICAgICBjb21tb25PcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZ5UmVzdWx0OiBTZWFyY2guRWtvLmNoYW5nZUNvbmZpZGVuY2VPZlNlYXJjaFJlc3VsdHNCeSgtMC4wMSksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcGlkU2VhcmNoUmVzb2x2ZXJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RpZnlSZXN1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkRldGFpbDogKGl4c0luZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSBkZXRhaWzFryBwb2RsZSB0b2hvLCBvIGpha8O9IHR5cCBqZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl4c0luZm8uQ29Kc2VtWmFjID09PSBXZmwuSW50ZXJmYWNlLkdJZGVudGlmaWthdG9yQ29Kc2VtWmFjLkZha3R1cmFEb3J1Y2VuYSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFrdHVyYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBkb3Rhxb5lbsOtIGtuaWh5IChhIGRhbMWhw61jaCDDumRhasWvPylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubmF2aWdhdGUoXCJHb3JkaWMuQnBsLldlYkNsaWVudC5HS2RmRGV0YWlsRG9rbGFkdVRhYlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRGV0YWlsRG9rbGFkdSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IGl4c0luZm8uSXh4MSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKS5yZXNvbHZlKHRydWUpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXpuw6Ftw70gdHlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gfSk7XHJcbiAgICAgICAgICAgIC8vIEVLTyBobGVkw6Fuw60gcG9kbGUgVlMsIEXEjCBhIEHEjFxyXG4gICAgICAgICAgICAkKCdib2R5JykuZ3NlYXJjaGFibGUoJ2FkZCcsIG5ldyBHb3JkaWMuU2VhcmNoLkJwbC5HQnBsVnNTZWFyY2hSZXNvbHZlcigpKTtcclxuICAgICAgICAgICAgJCgnYm9keScpLmdzZWFyY2hhYmxlKCdhZGQnLCBuZXcgR29yZGljLlNlYXJjaC5CcGwuR0JwbEFjU2VhcmNoUmVzb2x2ZXIoKSk7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5nc2VhcmNoYWJsZSgnYWRkJywgbmV3IEdvcmRpYy5TZWFyY2guQnBsLkdCcGxBY0FnU2VhcmNoUmVzb2x2ZXIoKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9Hb3JkaWMuV2ZsLldlYkNsaWVudC5HSEZLQXN5bmNVdGlscyh0aGlzLCBuZXcgRGF0YS5HcmlkRm9ybWF0KCkpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcHLDoXZuxJsgYnkgbcSbbCBiw710IHDFmWVkw6FtIEdyaWRGb3Jtw6F0IGpha28gcHJ2b3RuxJsgcMWZZWTDoXZhbsO9IGRvIHByxa92b2RjZVxyXG5cclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyAgIE5BU1RBVkVOw41cclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKlxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBsX29Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgICBuYW1lOiBcIkdMb2NhbFNldHRpbmdzRm9ybVwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcImpyZXM6Mjk3NTAwODRcIiwgb3BlbmVkOiB0cnVlIH0gfSBhcyBhbnkpICAgICAgICAgICAgICAgICAvLyBSQyAyOTc1MDA4NCA6IERldGFpbHkgZG9rbGFkxa9cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQxZllZHBsbsSbbsOtIGlkZW50aWZpa8OhdG9ydVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6Mjk3NTAwNzFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy00XCIsIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUkMgMjk3NTAwNzEgOiBQxZllZHBsbsSbbsOtIGlkZW50aWZpa8OhdG9ydVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4eEluaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuV2ZsLkFwcFNldHRpbmdzLk90aGVyc1NldHRpbmdzLlByZWRwbG5lbmlQSUQ9dmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNYXhpbcOhbG7DrSB2w73FoWUgemFva3JvdWhsZW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6Mjk3NTAxNTlcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7ICAgICAgICAgICAgICAgICAgLy8gUkMgMjk3NTAxNTkgOiBNYXhpbcOhbG7DrSB2w73FoWUgemFva3JvdWhsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxpbWl0WmFva3JvdWhsZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLktkZi5BcHBTZXR0aW5ncy5PdGhlcnNTZXR0aW5ncy5MaW1pdFphb2tyb3VobGVuaT12YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBOa3NGaWx0ZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgIGljbzogR2xvYmFsbmlQcm9tZW5uZS5la29QYXJhbXNJY28sXHJcbiAgICAgICAgICAgICAgICB2YXpiYVVjc05hRWtvdm5rczogR2xvYmFsbmlQcm9tZW5uZS5la29QYXJhbXNVY3MsXHJcbiAgICAgICAgICAgICAgICByb2tfb2Q6IFwiPD0gXCIgKyBHbG9iYWxuaVByb21lbm5lLmVrb1BhcmFtc1JvayxcclxuICAgICAgICAgICAgICAgIHJva19kbzogXCI+PSBcIiArIEdsb2JhbG5pUHJvbWVubmUuZWtvUGFyYW1zUm9rXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoR2xvYmFsbmlQcm9tZW5uZS5naW5fcmFkX2ZjZW5zKVxyXG4gICAgICAgICAgICAgICAgTmtzRmlsdGVycyA9ICQuZXh0ZW5kKHt9LCBOa3NGaWx0ZXJzLCB7IHZhemJhTmtzTmFGdW5rY2k6IEdsb2JhbG5pUHJvbWVubmUuaXhzX2Z1biB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBsX29Gb3JtVWN0b3ZhbmkgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJHTG9jYWxTZXR0aW5nc0Zvcm1VY3RvdmFuaVwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcIk5hc3RhdmVuw60gw7rEjXRvdsOhbsOtXCIsIG9wZW5lZDogdHJ1ZSB9IH0gYXMgYW55KSAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gw5rEjWV0bsOtIEtuaWhhXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiw5rEjWV0bsOtIGtuaWhhXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QudWN0c2RlbigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrbmloYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5LZGYuQXBwU2V0dGluZ3MuT3RoZXJzU2V0dGluZ3MuS25paGE9dmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAvL8OaxI1ldG7DrSBmdW5rY2VcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLDmsSNZXRuw60gZnVua2NlXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2Z1bigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmdW5rY2VcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuS2RmLkFwcFNldHRpbmdzLk90aGVyc1NldHRpbmdzLkZ1bmtjZT12YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vw5rEjWV0bsOtIHN1YsWZYWRhXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiw5rEjWV0bsOtIHN1YsWZYWRhXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QudWN0ZGRkZSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdWJyYWRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLktkZi5BcHBTZXR0aW5ncy5PdGhlcnNTZXR0aW5ncy5TdWJyYWRhPXZhbHVlXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyBOw6FrbGFkb3bDqSBzdMWZZWRpc2tvXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOha2xhZG92w6kgc3TFmWVkaXNrb1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTRcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nua3MoKSwgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLktkZi5BcHBTZXR0aW5ncy5PdGhlcnNTZXR0aW5ncy5Oa3M9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiBOa3NGaWx0ZXJzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpvYnJhemVuw60gesOhc3R1cGVrIHDFmWkgcG/FmWl6b3bDoW7DrSBrcnl0w60vIHDFmWVkcGlzdVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dGV4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dDb21wZW5zYXRpb25cIixcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5LZGYuQXBwU2V0dGluZ3MuT3RoZXJzU2V0dGluZ3MuU2hvd0NvbXBlbnNhdGlvbj12YWx1ZS5zaG93Q29tcGVuc2F0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW3sgc2hvd0NvbXBlbnNhdGlvbjogMCwgdGV4dDogXCJqcmVzOjI5NzUwMTkzXCIgfSwgeyBzaG93Q29tcGVuc2F0aW9uOiAxLCB0ZXh0OiBcImpyZXM6Mjk3NTAxOTRcIiB9XSwgeyBrZXk6IFwic2hvd0NvbXBlbnNhdGlvblwiIH0pLCAvLyBSQyAyOTc1MDE5MyA6IHYgcm96YmFsZW7DvWNoIMWZw6FkY8OtY2ggbmV6b2JyYXpvdmF0IHrDoXN0dXBreSAgICAvLyBSQyAyOTc1MDE5NCA6IHYgcm96YmFsZW7DvWNoIMWZw6FkY8OtY2ggem9icmF6aXQgesOhc3R1cGt5XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNhbW9zdGF0bsOhIHrDoWxvxb5rYSBsaWt2aWRhY2UgLSB6YXTDrW0gemFrb21lbnRvdsOhbm8gLSBUMzc5MjhcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyhcIlNhbW9zdGF0bsOhIHrDoWxvxb5rYSBsaWt2aWRhY2VcIikuYWRkRmllbGQoXCJnY2hlY2tcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJsaWt2aWRhY2VUYWJHcm91cFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgbW9kZWw6IFwiR2xvYmFsLktkZi5BcHBTZXR0aW5ncy5PdGhlcnNTZXR0aW5ncy5saWt2aWRhY2VUYWJHcm91cD12YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gc3RhbmRhcmRuw60gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtIFdGTCBhIEVLT1xyXG4gICAgICAgICAgICBHb3JkaWMuV2ViQXBwLmdsb2JhbFNldHRpbmdGb3Jtcy5yZWdpc3RlcihbR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydHNVc2VyU2V0dGluZ3MoKSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuQXBwU2V0dGluZ3MuQXR0YWNobWVudE9wZW5TZXR0aW5nc0Zvcm0oKSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuQXBwU2V0dGluZ3MuQ29sb3JQaWNrZXJTZXR0aW5nc0Zvcm0oKSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzUGlkKEdsb2JhbG5pUHJvbWVubmUuZ2luX2dlbl9peHAgPz8gXCJuZVwiKSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzRWtvQm9vaygpLFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NMaXN0KCksIGxfb0Zvcm0sIGxfb0Zvcm1VY3RvdmFuaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gICBEZWxlZ8OhdCBwcm8gZXZpZGVuY2kgeiByZWRpc3RyaWJ1Y2VcclxuICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICBldmlkZW5jZURlbGVnYXRlKG9iajogeyBwaWRzOiBzdHJpbmdbXSwgdHlwQWc6IG51bWJlciB9KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuRG9jc0ZvclJlZy5zaG93RWJvb2tzQ2hvaWNlKHRoaXMuZWxlbWVudCwgb2JqLnR5cEFnKS50aGVuKChrbmloYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxfb0NudCA9IHRoaXMuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQnBsLldlYkNsaWVudC5HS2RmRGV0YWlsRG9rbGFkdVRhYlwiKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBzZXJ2aXNuw61obyBjb250ZW50dVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxfb0NudC5jYWxsKFwiQWtjZVBvZGFuaVwiLCB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2b2zDoW7DrSBwb2TDoXZhY8OtIGZ1bmtjZSBcclxuICAgICAgICAgICAgICAgICAgICBpeHA6IG9iai5waWRzWzBdLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlkZW50aWZpw6F0b3IgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIHplU1NMOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gamUgdG8gcG9kw6Fuw60gZG9rbGFkdSB6ZSBTU0xcclxuICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBrbmloYS5peHBfZGVuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtuaWhhIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3ZlR3BjID0gRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMobF9vQ250LmdwYywga25paGEuaXhwX2RlbiEpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdsOpIEdQQyBkbGUga25paHlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5uYXZpZ2F0ZShbXCJHb3JkaWMuQnBsLldlYkNsaWVudC5HS2RmRGV0YWlsRG9rbGFkdVRhYlwiLCB7Z3BjOiBub3ZlR3BjfV0sIHsgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZw610IGRldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IFwiRGV0YWlsX2Rva2xhZHUjXCIsIGl4cDogb2JqLnBpZHNbMF0sIGR1cGxpa292YW5pVnliZXI6IG51bGwsIGplRWRpdG92YXRlbG5lOiB0cnVlIH0pOyAgICAgICAgICAvLyBwYXJhbWV0cnkgb3RldsWZZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyBsX29DbnQuY2xvc2UoKTsgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YXbFmWVuw60gc2VydmlzbsOtaG8ga29udGVudHVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGV2xZllbsOtIGthcnRvdMOpa3kgZXh0ZXJuw61jaCBzdWJqZWt0xa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMga2FydG90ZWthRXN1KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgIEl4cDogJzAwMDBYMDAwMDA0SicsXHJcbiAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LmthcnRvdGVrYVZNZW51QXBsaWthY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaVR4dDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBJbml0aWFsVmFsdWVEdXZvZEhsZWRhbmlUeHQ6IFwianJlczoyOTc1MDE4N1wiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUkMgMjk3NTAxODcgOiBOYWhsw63FvmVuw60geiBtb2R1bHUgS0RGXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRXN1LkRpYWxvZ3MuS2FydG90ZWthRXN1RGxnRnJvbU1haW4odGhhdCwgb3B0aW9ucywgR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5uYXZpZ2F0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGV2xZllbsOtIHV6w6F2xJtya3kgYWdlbmR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHV6YXZlcmthQWdlbmR5KGFnZW5kYSkge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBHb3JkaWMuRWtvLldlYkNsaWVudC5JR0Vrb0FnZW5kYU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZTogKHR5cEFnKSA9PiB0aGlzLmlzbC5BZ2VuZGFCcGwudXphdnJpdEFnZW5kdSgpLmdldERhdGEoKSxcclxuICAgICAgICAgICAgICAgIGFnZW5kYTogYWdlbmRhLFxyXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnM6IChhZ2VuZHkpID0+IHRoaXMuaXNsLkFnZW5kYUJwbC5wb3ZvbGVuaUFrY2lBZ2VuZHkoKS5nZXQoKS50aGVuKChyKSA9PiByKSxcclxuICAgICAgICAgICAgICAgIGdldERhdGE6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuQWdlbmRhQnBsLnJlYWQoKS5nZXREYXRhKCkudGhlbigocikgPT4gW3JdKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja0Nsb3NlOiAoYWdlbmR5KSA9PiAkLkRlZmVycmVkKCkucmVzb2x2ZShhZ2VuZHkpLnByb21pc2UoKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgKHRoaXMgYXMgYW55KS5uYXZpZ2F0ZVRhc2soR29yZGljLkVrby5XZWJDbGllbnQuR0Vrb0FnZW5kYSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGV2xZllbsOtIHV6w6F2xJtya3kga25paFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgdXphdmVya2FLbmloeSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnM6IEdvcmRpYy5Fa28uV2ViQ2xpZW50LklHRWtvS25paGFPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YTogdGhpcy5pc2wuS25paGFCcGwubGlzdCgpLFxyXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnM6ICgpID0+IHsgcmV0dXJuIHRoaXMuaXNsLktuaWhhQnBsLmdldFNlcnZpY2VQZXJtaXNzaW9ucygpLmdldCgpOyB9LFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBLb250cm9sYSB1emF2xZllbsOtIGtuaWhcclxuICAgICAgICAgICAgICAgIGNoZWNrQ2xvc2U6IChrbmloeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5LbmloYUJwbC5rb250cm9sYUtuaWhVemF2ZXJreSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWh5OiBrbmloeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmFjZTogR29yZGljLkJwbC5JbnRlcmZhY2UuR0VCUExUeXB5VXphdmVyZWtLbmloLlVaQVZSRU5JX0tOSUhZXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2hlY2tQcmVwYXJlQ2xvc2U6IChrbmloeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5LbmloYUJwbC5rb250cm9sYUtuaWhVemF2ZXJreSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWh5OiBrbmloeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmFjZTogR29yZGljLkJwbC5JbnRlcmZhY2UuR0VCUExUeXB5VXphdmVyZWtLbmloLlBSSVBSQVZBX0tOSUhZX0tfVVpBVlJFTklcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja0NhbmNlbFByZXBhcmVDbG9zZTogKGtuaWh5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLktuaWhhQnBsLmtvbnRyb2xhS25paFV6YXZlcmt5KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga25paHk6IGtuaWh5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYWNlOiBHb3JkaWMuQnBsLkludGVyZmFjZS5HRUJQTFR5cHlVemF2ZXJla0tuaWguWlJVU0VOSV9QUklQUkFWWV9LTklIWV9LX1VaQVZSRU5JXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2xvc2U6IChrbmloeSkgPT4gdGhpcy5pc2wuS25paGFCcGwudXphdnJpdEtuaWh5KHsga25paHk6IGtuaWh5IH0pLmdldERhdGEoKSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1emF2xZllbsOtIGtuaWhcclxuICAgICAgICAgICAgICAgIHByZXBhcmVDbG9zZTogKGtuaWh5KSA9PiB0aGlzLmlzbC5LbmloYUJwbC5wcmlwcmF2YUtuaWhLVXphdnJlbmkoeyBrbmloeToga25paHksIHByaXByYXZhOiB0cnVlIH0pLmdldERhdGEoKSwgICAgICAgLy8gcMWZw61wcmF2YSBrIHV6YXbFmWVuw61cclxuICAgICAgICAgICAgICAgIGNhbmNlbFByZXBhcmVDbG9zZTogKGtuaWh5KSA9PiB0aGlzLmlzbC5LbmloYUJwbC5wcmlwcmF2YUtuaWhLVXphdnJlbmkoeyBrbmloeToga25paHksIHByaXByYXZhOiBmYWxzZSB9KS5nZXREYXRhKCkgLy8genJ1xaFlbsOtIHDFmcOtcHJhdnkgayB1emF2xZllbsOtXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMgYXMgYW55KS5uYXZpZ2F0ZVRhc2soR29yZGljLkVrby5XZWJDbGllbnQuR0Vrb1Nlem5hbUtuaWgsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59Il19