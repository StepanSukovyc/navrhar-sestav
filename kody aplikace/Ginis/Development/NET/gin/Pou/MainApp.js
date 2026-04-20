"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pou;
    (function (Pou) {
        var WebClient;
        (function (WebClient) {
            let MainApp = 
            /**
             * Hlavní content POU
             *
             * @author Michal Prošek
             * @since 490.1.0.0
             */
            class MainApp extends Gordic.GContentBase {
                onContentReady() {
                    const content = this;
                    let that = this;
                    let GlobalniPromenne = that.prop("BplGlobalniPromenne");
                    // *************
                    //   RESOLVERY
                    // *************
                    // WFL resolver pro hledání pidu do obecného hledacího políčka
                    //Gordic.Wfl.Utils.registerPidSearchResolver({
                    //    pidSearchResolverParams: 
                    //});
                    // WFL hledání podle zásilky, spisu, spisové značky
                    Gordic.Wfl.Utils.registerSearchResolvers({
                        pidSearchResolverParams: {
                            openDetail: (ixsInfo) => {
                                // zobrazení detailů podle toho, o jaký typ jde
                                if (ixsInfo.CoJsemZac === 360 /* Wfl.Interface.GIdentifikatorCoJsemZac.Poukaz */) { // poukaz
                                    // TODO: doplnit dotažení knihy (a dalších údajů?)
                                    content.navigate("Gordic.Bpl.WebClient.GPouDetailDokladuTab", {
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
                        model: "Global.Pou.AppSettings.OthersSettings.LimitZaokrouhleni=value"
                    });
                    // standardní uživatelské nastavení WFL a EKO
                    Gordic.WebApp.globalSettingForms.register([Gordic.Report.WebClient.GReportsUserSettings(),
                        Gordic.Wfl.AppSettings.AttachmentOpenSettingsForm(),
                        Gordic.Wfl.AppSettings.ColorPickerSettingsForm(),
                        Gordic.Eko.Utils.EkoUserSettingsPid(GlobalniPromenne.gin_gen_ixp ?? "ne"),
                        Gordic.Eko.Utils.EkoUserSettingsEkoBook(),
                        Gordic.Eko.Utils.EkoUserSettingsList(), l_oForm]);
                }
                // ***************************************
                //   Delegát pro evidenci z redistribuce
                // ***************************************
                evidenceDelegate(obj) {
                    return Gordic.Eko.Components.DocsForReg.showEbooksChoice(this.element, obj.typAg).then((kniha) => {
                        var that = this;
                        let l_oCnt = this.createServiceContent("Gordic.Bpl.WebClient.GPouDetailDokladuTab"); // vytvoření servisního contentu
                        return l_oCnt.call("AkcePodani", {
                            ixp: obj.pids[0], // identifiátor dokladu
                            zeSSL: true, // je to podání dokladu ze SSL
                            ixp_den: kniha.ixp_den // kniha dokladu
                        }).then(function (data) {
                            const noveGpc = Gordic.Eko.Utils.createBookGpc(l_oCnt.gpc, kniha.ixp_den); // nové GPC dle knihy
                            return that.navigate(["Gordic.Bpl.WebClient.GPouDetailDokladuTab", { gpc: noveGpc }], {
                                uid: "Detail_dokladu#", ixp: obj.pids[0], duplikovaniVyber: false, jeEditovatelne: true
                            }); // parametry otev5en9 detailu
                        }).always(() => { l_oCnt.close(); }); // zavření servisního kontentu
                    });
                }
            };
            MainApp = __decorate([
                Decorators.gcontent
                /**
                 * Hlavní content POU
                 *
                 * @author Michal Prošek
                 * @since 490.1.0.0
                 */
            ], MainApp);
            WebClient.MainApp = MainApp;
        })(WebClient = Pou.WebClient || (Pou.WebClient = {}));
    })(Pou = Gordic.Pou || (Gordic.Pou = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1haW5BcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXNHZjtBQXRHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzR25CO0lBdEdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FzRzdCO1FBdEdvQixXQUFBLFNBQVM7WUFVMUIsSUFBYSxPQUFPO1lBUHBCOzs7OztlQUtHO1lBRUgsTUFBYSxPQUFRLFNBQVEsT0FBQSxZQUFZO2dCQUM5QixjQUFjO29CQUNqQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRXJCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxnQkFBZ0IsR0FBb0MsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUV6RixnQkFBZ0I7b0JBQ2hCLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUVoQiw4REFBOEQ7b0JBQzlELDhDQUE4QztvQkFDOUMsK0JBQStCO29CQUcvQixLQUFLO29CQUNMLG1EQUFtRDtvQkFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUM7d0JBQ3JDLHVCQUF1QixFQUFFOzRCQUNyQixVQUFVLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQ0FDcEIsK0NBQStDO2dDQUMvQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLDJEQUFpRCxFQUFFLENBQUMsQ0FBb0MsU0FBUztvQ0FDbEgsa0RBQWtEO29DQUNsRCxPQUFPLENBQUMsUUFBUSxDQUFDLDJDQUEyQyxFQUFFO3dDQUMxRCxFQUFFLEVBQUUsZ0JBQWdCO3dDQUNwQixHQUFHLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBbUYsZ0JBQWdCO3FDQUN2SCxDQUFDLENBQUM7b0NBQ0gsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUN6RCxDQUFDO3FDQUNJLENBQUMsQ0FBc0csY0FBYztvQ0FDdEgsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUMxRCxDQUFDOzRCQUNMLENBQUM7eUJBQ0o7cUJBQUUsQ0FBQyxDQUFDO29CQUNULGdDQUFnQztvQkFDaEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7b0JBQzNFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO29CQUMzRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztvQkFHN0UsZ0JBQWdCO29CQUNoQixjQUFjO29CQUNkLGdCQUFnQjtvQkFHaEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDL0IsSUFBSSxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtxQkFBUyxDQUFDLENBQWlCLGdDQUFnQzt3QkFFNUksNEJBQTRCO3lCQUMzQixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0JBQ25ELFFBQVEsRUFBRSxLQUFLO3dCQUNmLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSwyREFBMkQ7cUJBQ3JFLENBQUM7d0JBRUYsOEJBQThCO3lCQUM3QixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ3JGLFFBQVEsRUFBRSxLQUFLO3dCQUNmLElBQUksRUFBRSxtQkFBbUI7d0JBQ3pCLEtBQUssRUFBRSwrREFBK0Q7cUJBQ3pFLENBQUMsQ0FBQztvQkFFUCw2Q0FBNkM7b0JBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUU7d0JBQ3pGLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLDBCQUEwQixFQUFFO3dCQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRTt3QkFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQzt3QkFDekUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUU7d0JBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFdEQsQ0FBQztnQkFFRCwwQ0FBMEM7Z0JBQzFDLHdDQUF3QztnQkFDeEMsMENBQTBDO2dCQUMxQyxnQkFBZ0IsQ0FBQyxHQUFzQztvQkFDbkQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzdGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDaEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLDJDQUEyQyxDQUFDLENBQUMsQ0FBMkIsZ0NBQWdDO3dCQUMvSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFOzRCQUM3QixHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBd0YsdUJBQXVCOzRCQUMvSCxLQUFLLEVBQUUsSUFBSSxFQUE2Riw4QkFBOEI7NEJBQ3RJLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFrRixnQkFBZ0I7eUJBQzNILENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJOzRCQUNsQixNQUFNLE9BQU8sR0FBRyxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQVEsQ0FBQyxDQUFDLENBQW9DLHFCQUFxQjs0QkFDN0gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsMkNBQTJDLEVBQUUsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLENBQUMsRUFBRTtnQ0FDaEYsR0FBRyxFQUFFLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSTs2QkFBRSxDQUFDLENBQUMsQ0FBUyw2QkFBNkI7d0JBQ3pJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUF1RSw4QkFBOEI7b0JBQzlJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFDSixDQUFBO1lBM0ZZLE9BQU87Z0JBVG5CLFVBQVUsQ0FBQyxRQUFRO2dCQUVwQjs7Ozs7bUJBS0c7ZUFFVSxPQUFPLENBMkZuQjtZQTNGWSxpQkFBTyxVQTJGbkIsQ0FBQTtRQUNMLENBQUMsRUF0R29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXNHN0I7SUFBRCxDQUFDLEVBdEdnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFzR25CO0FBQUQsQ0FBQyxFQXRHUyxNQUFNLEtBQU4sTUFBTSxRQXNHZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUG91LldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGxhdm7DrSBjb250ZW50IFBPVVxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgTWljaGFsIFByb8WhZWtcclxuICAgICAqIEBzaW5jZSA0OTAuMS4wLjBcclxuICAgICAqL1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYWluQXBwIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgR2xvYmFsbmlQcm9tZW5uZTogR29yZGljLkJwbC5JbnRlcmZhY2UuR2xvYmFsc0R0byA9IHRoYXQucHJvcChcIkJwbEdsb2JhbG5pUHJvbWVubmVcIik7XHJcblxyXG4gICAgICAgICAgICAvLyAqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgIC8vICAgUkVTT0xWRVJZXHJcbiAgICAgICAgICAgIC8vICoqKioqKioqKioqKipcclxuXHJcbiAgICAgICAgICAgIC8vIFdGTCByZXNvbHZlciBwcm8gaGxlZMOhbsOtIHBpZHUgZG8gb2JlY27DqWhvIGhsZWRhY8OtaG8gcG9sw63EjWthXHJcbiAgICAgICAgICAgIC8vR29yZGljLldmbC5VdGlscy5yZWdpc3RlclBpZFNlYXJjaFJlc29sdmVyKHtcclxuICAgICAgICAgICAgLy8gICAgcGlkU2VhcmNoUmVzb2x2ZXJQYXJhbXM6IFxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIC8vIFdGTCBobGVkw6Fuw60gcG9kbGUgesOhc2lsa3ksIHNwaXN1LCBzcGlzb3bDqSB6bmHEjWt5XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuVXRpbHMucmVnaXN0ZXJTZWFyY2hSZXNvbHZlcnMoe1xyXG4gICAgICAgICAgICAgICAgcGlkU2VhcmNoUmVzb2x2ZXJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuRGV0YWlsOiAoaXhzSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbsOtIGRldGFpbMWvIHBvZGxlIHRvaG8sIG8gamFrw70gdHlwIGpkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhzSW5mby5Db0pzZW1aYWMgPT09IFdmbC5JbnRlcmZhY2UuR0lkZW50aWZpa2F0b3JDb0pzZW1aYWMuUG91a2F6KSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG91a2F6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IGRvdGHFvmVuw60ga25paHkgKGEgZGFsxaHDrWNoIMO6ZGFqxa8/KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5uYXZpZ2F0ZShcIkdvcmRpYy5CcGwuV2ViQ2xpZW50LkdQb3VEZXRhaWxEb2tsYWR1VGFiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogXCJEZXRhaWxEb2tsYWR1I1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogaXhzSW5mby5JeHgxICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUodHJ1ZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5lem7DoW3DvSB0eXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkPGJvb2xlYW4+KCkucmVzb2x2ZShmYWxzZSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSB9KTtcclxuICAgICAgICAgICAgLy8gRUtPIGhsZWTDoW7DrSBwb2RsZSBWUywgRcSMIGEgQcSMXHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5nc2VhcmNoYWJsZSgnYWRkJywgbmV3IEdvcmRpYy5TZWFyY2guQnBsLkdCcGxWc1NlYXJjaFJlc29sdmVyKCkpO1xyXG4gICAgICAgICAgICAkKCdib2R5JykuZ3NlYXJjaGFibGUoJ2FkZCcsIG5ldyBHb3JkaWMuU2VhcmNoLkJwbC5HQnBsQWNTZWFyY2hSZXNvbHZlcigpKTtcclxuICAgICAgICAgICAgJCgnYm9keScpLmdzZWFyY2hhYmxlKCdhZGQnLCBuZXcgR29yZGljLlNlYXJjaC5CcGwuR0JwbEFjQWdTZWFyY2hSZXNvbHZlcigpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyAqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgIC8vICAgTkFTVEFWRU7DjVxyXG4gICAgICAgICAgICAvLyAqKioqKioqKioqKioqXHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGxfb0Zvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgIG5hbWU6IFwiR0xvY2FsU2V0dGluZ3NGb3JtXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwianJlczoyOTc1MDA4NFwiLCBvcGVuZWQ6IHRydWUgfSB9IGFzIGFueSkgICAgICAgICAgICAgICAgIC8vIFJDIDI5NzUwMDg0IDogRGV0YWlseSBkb2tsYWTFr1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFDFmWVkcGxuxJtuw60gaWRlbnRpZmlrw6F0b3J1XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyOTc1MDA3MVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSQyAyOTc1MDA3MSA6IFDFmWVkcGxuxJtuw60gaWRlbnRpZmlrw6F0b3J1XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXh4SW5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5XZmwuQXBwU2V0dGluZ3MuT3RoZXJzU2V0dGluZ3MuUHJlZHBsbmVuaVBJRD12YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1heGltw6FsbsOtIHbDvcWhZSB6YW9rcm91aGxlbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyOTc1MDE1OVwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgICAgICAgICAgICAgICAgICAvLyBSQyAyOTc1MDE1OSA6IE1heGltw6FsbsOtIHbDvcWhZSB6YW9rcm91aGxlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGltaXRaYW9rcm91aGxlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuUG91LkFwcFNldHRpbmdzLk90aGVyc1NldHRpbmdzLkxpbWl0WmFva3JvdWhsZW5pPXZhbHVlXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gc3RhbmRhcmRuw60gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtIFdGTCBhIEVLT1xyXG4gICAgICAgICAgICBHb3JkaWMuV2ViQXBwLmdsb2JhbFNldHRpbmdGb3Jtcy5yZWdpc3RlcihbR29yZGljLlJlcG9ydC5XZWJDbGllbnQuR1JlcG9ydHNVc2VyU2V0dGluZ3MoKSxcclxuICAgICAgICAgICAgR29yZGljLldmbC5BcHBTZXR0aW5ncy5BdHRhY2htZW50T3BlblNldHRpbmdzRm9ybSgpLFxyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLkFwcFNldHRpbmdzLkNvbG9yUGlja2VyU2V0dGluZ3NGb3JtKCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzUGlkKEdsb2JhbG5pUHJvbWVubmUuZ2luX2dlbl9peHAgPz8gXCJuZVwiKSxcclxuICAgICAgICAgICAgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NFa29Cb29rKCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzTGlzdCgpLCBsX29Gb3JtXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gICBEZWxlZ8OhdCBwcm8gZXZpZGVuY2kgeiByZWRpc3RyaWJ1Y2VcclxuICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICBldmlkZW5jZURlbGVnYXRlKG9iajogeyBwaWRzOiBzdHJpbmdbXSwgdHlwQWc6IG51bWJlciB9KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuRG9jc0ZvclJlZy5zaG93RWJvb2tzQ2hvaWNlKHRoaXMuZWxlbWVudCwgb2JqLnR5cEFnKS50aGVuKChrbmloYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxfb0NudCA9IHRoaXMuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQnBsLldlYkNsaWVudC5HUG91RGV0YWlsRG9rbGFkdVRhYlwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBzZXJ2aXNuw61obyBjb250ZW50dVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxfb0NudC5jYWxsKFwiQWtjZVBvZGFuaVwiLCB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2b2zDoW7DrSBwb2TDoXZhY8OtIGZ1bmtjZSBcclxuICAgICAgICAgICAgICAgICAgICBpeHA6IG9iai5waWRzWzBdLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlkZW50aWZpw6F0b3IgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIHplU1NMOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gamUgdG8gcG9kw6Fuw60gZG9rbGFkdSB6ZSBTU0xcclxuICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBrbmloYS5peHBfZGVuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtuaWhhIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3ZlR3BjID0gRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMobF9vQ250LmdwYywga25paGEuaXhwX2RlbiEpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdsOpIEdQQyBkbGUga25paHlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5uYXZpZ2F0ZShbXCJHb3JkaWMuQnBsLldlYkNsaWVudC5HUG91RGV0YWlsRG9rbGFkdVRhYlwiLCB7Z3BjOiBub3ZlR3BjfV0sIHsgICAgICAgICAgICAgICAgICAgICAgLy8gb3RldsWZw610IGRldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IFwiRGV0YWlsX2Rva2xhZHUjXCIsIGl4cDogb2JqLnBpZHNbMF0sIGR1cGxpa292YW5pVnliZXI6IGZhbHNlLCBqZUVkaXRvdmF0ZWxuZTogdHJ1ZSB9KTsgICAgICAgICAvLyBwYXJhbWV0cnkgb3RldjVlbjkgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHsgbF9vQ250LmNsb3NlKCk7IH0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemF2xZllbsOtIHNlcnZpc27DrWhvIGtvbnRlbnR1XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==