"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Kof;
    (function (Kof) {
        var WebClient;
        (function (WebClient) {
            let MainApp = 
            /**
             * Hlavní content KOF
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
                                if (ixsInfo.CoJsemZac === 330 /* Wfl.Interface.GIdentifikatorCoJsemZac.FakturaOdeslana */) { // faktura odeslaná
                                    // TODO: doplnit dotažení knihy (a dalších údajů?)
                                    content.navigate("Gordic.Bpl.WebClient.GKofDetailDokladuTab", {
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
                        model: "Global.Kof.AppSettings.OthersSettings.LimitZaokrouhleni=value"
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
                        let l_oCnt = this.createServiceContent("Gordic.Bpl.WebClient.GKofDetailDokladuTab"); // vytvoření servisního contentu
                        return l_oCnt.call("AkcePodani", {
                            ixp: obj.pids[0], // identifiátor dokladu
                            zeSSL: true, // je to podání dokladu ze SSL
                            ixp_den: kniha.ixp_den // kniha dokladu
                        }).then(function (data) {
                            const noveGpc = Gordic.Eko.Utils.createBookGpc(l_oCnt.gpc, kniha.ixp_den); // nové GPC dle knihy
                            return that.navigate(["Gordic.Bpl.WebClient.GKofDetailDokladuTab", { gpc: noveGpc }], {
                                uid: "Detail_dokladu#", ixp: obj.pids[0], duplikovaniVyber: false, jeEditovatelne: true
                            }); // parametry otevření detailu
                        }).always(() => { l_oCnt.close(); }); // zavření servisního kontentu
                    });
                }
            };
            MainApp = __decorate([
                Decorators.gcontent
                /**
                 * Hlavní content KOF
                 *
                 * @author Michal Prošek
                 * @since 490.1.0.0
                 */
            ], MainApp);
            WebClient.MainApp = MainApp;
        })(WebClient = Kof.WebClient || (Kof.WebClient = {}));
    })(Kof = Gordic.Kof || (Gordic.Kof = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1haW5BcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXFHZjtBQXJHRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxR25CO0lBckdnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxRzdCO1FBckdvQixXQUFBLFNBQVM7WUFVMUIsSUFBYSxPQUFPO1lBUHBCOzs7OztlQUtHO1lBRUgsTUFBYSxPQUFRLFNBQVEsT0FBQSxZQUFZO2dCQUM5QixjQUFjO29CQUNqQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRXJCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxnQkFBZ0IsR0FBb0MsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUV6RixnQkFBZ0I7b0JBQ2hCLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUVoQiw4REFBOEQ7b0JBQzlELDhDQUE4QztvQkFDOUMsK0JBQStCO29CQUcvQixLQUFLO29CQUNMLG1EQUFtRDtvQkFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUM7d0JBQ3JDLHVCQUF1QixFQUFFOzRCQUNyQixVQUFVLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQ0FDcEIsK0NBQStDO2dDQUMvQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLG9FQUEwRCxFQUFFLENBQUMsQ0FBMEIsbUJBQW1CO29DQUMzSCxrREFBa0Q7b0NBQ2xELE9BQU8sQ0FBQyxRQUFRLENBQUMsMkNBQTJDLEVBQUU7d0NBQzFELEVBQUUsRUFBRSxnQkFBZ0I7d0NBQ3BCLEdBQUcsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFtRixnQkFBZ0I7cUNBQ3ZILENBQUMsQ0FBQztvQ0FDSCxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMs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R25CO0FBQUQsQ0FBQyxFQXJHUyxNQUFNLEtBQU4sTUFBTSxRQXFHZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuS29mLldlYkNsaWVudCB7XHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGxhdm7DrSBjb250ZW50IEtPRlxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgTWljaGFsIFByb8WhZWtcclxuICAgICAqIEBzaW5jZSA0OTAuMS4wLjBcclxuICAgICAqL1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYWluQXBwIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgR2xvYmFsbmlQcm9tZW5uZTogR29yZGljLkJwbC5JbnRlcmZhY2UuR2xvYmFsc0R0byA9IHRoYXQucHJvcChcIkJwbEdsb2JhbG5pUHJvbWVubmVcIik7XHJcblxyXG4gICAgICAgICAgICAvLyAqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgIC8vICAgUkVTT0xWRVJZXHJcbiAgICAgICAgICAgIC8vICoqKioqKioqKioqKipcclxuXHJcbiAgICAgICAgICAgIC8vIFdGTCByZXNvbHZlciBwcm8gaGxlZMOhbsOtIHBpZHUgZG8gb2JlY27DqWhvIGhsZWRhY8OtaG8gcG9sw63EjWthXHJcbiAgICAgICAgICAgIC8vR29yZGljLldmbC5VdGlscy5yZWdpc3RlclBpZFNlYXJjaFJlc29sdmVyKHtcclxuICAgICAgICAgICAgLy8gICAgcGlkU2VhcmNoUmVzb2x2ZXJQYXJhbXM6IFxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIC8vIFdGTCBobGVkw6Fuw60gcG9kbGUgesOhc2lsa3ksIHNwaXN1LCBzcGlzb3bDqSB6bmHEjWt5XHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuVXRpbHMucmVnaXN0ZXJTZWFyY2hSZXNvbHZlcnMoe1xyXG4gICAgICAgICAgICAgICAgcGlkU2VhcmNoUmVzb2x2ZXJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuRGV0YWlsOiAoaXhzSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbsOtIGRldGFpbMWvIHBvZGxlIHRvaG8sIG8gamFrw70gdHlwIGpkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhzSW5mby5Db0pzZW1aYWMgPT09IFdmbC5JbnRlcmZhY2UuR0lkZW50aWZpa2F0b3JDb0pzZW1aYWMuRmFrdHVyYU9kZXNsYW5hKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWt0dXJhIG9kZXNsYW7DoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBkb3Rhxb5lbsOtIGtuaWh5IChhIGRhbMWhw61jaCDDumRhasWvPylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQubmF2aWdhdGUoXCJHb3JkaWMuQnBsLldlYkNsaWVudC5HS29mRGV0YWlsRG9rbGFkdVRhYlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRGV0YWlsRG9rbGFkdSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IGl4c0luZm8uSXh4MSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQ8Ym9vbGVhbj4oKS5yZXNvbHZlKHRydWUpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXpuw6Ftw70gdHlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZDxib29sZWFuPigpLnJlc29sdmUoZmFsc2UpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gfSk7XHJcbiAgICAgICAgICAgIC8vIEVLTyBobGVkw6Fuw60gcG9kbGUgVlMsIEXEjCBhIEHEjFxyXG4gICAgICAgICAgICAkKCdib2R5JykuZ3NlYXJjaGFibGUoJ2FkZCcsIG5ldyBHb3JkaWMuU2VhcmNoLkJwbC5HQnBsVnNTZWFyY2hSZXNvbHZlcigpKTtcclxuICAgICAgICAgICAgJCgnYm9keScpLmdzZWFyY2hhYmxlKCdhZGQnLCBuZXcgR29yZGljLlNlYXJjaC5CcGwuR0JwbEFjU2VhcmNoUmVzb2x2ZXIoKSk7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5nc2VhcmNoYWJsZSgnYWRkJywgbmV3IEdvcmRpYy5TZWFyY2guQnBsLkdCcGxBY0FnU2VhcmNoUmVzb2x2ZXIoKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKlxyXG4gICAgICAgICAgICAvLyAgIE5BU1RBVkVOw41cclxuICAgICAgICAgICAgLy8gKioqKioqKioqKioqKlxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBsX29Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgICBuYW1lOiBcIkdMb2NhbFNldHRpbmdzRm9ybVwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcImpyZXM6Mjk3NTAwODRcIiwgb3BlbmVkOiB0cnVlIH0gfSBhcyBhbnkpICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJDIDI5NzUwMDg0IDogRGV0YWlseSBkb2tsYWTFr1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFDFmWVkcGxuxJtuw60gaWRlbnRpZmlrw6F0b3J1XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyOTc1MDA3MVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTRcIiwgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJDIDI5NzUwMDcxIDogUMWZZWRwbG7Em27DrSBpZGVudGlmaWvDoXRvcnVcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHhJbml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLldmbC5BcHBTZXR0aW5ncy5PdGhlcnNTZXR0aW5ncy5QcmVkcGxuZW5pUElEPXZhbHVlXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWF4aW3DoWxuw60gdsO9xaFlIHphb2tyb3VobGVuw61cclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI5NzUwMTU5XCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUkMgMjk3NTAxNTkgOiBNYXhpbcOhbG7DrSB2w73FoWUgemFva3JvdWhsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxpbWl0WmFva3JvdWhsZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLktvZi5BcHBTZXR0aW5ncy5PdGhlcnNTZXR0aW5ncy5MaW1pdFphb2tyb3VobGVuaT12YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0YW5kYXJkbsOtIHXFvml2YXRlbHNrw6kgbmFzdGF2ZW7DrSBXRkwgYSBFS09cclxuICAgICAgICAgICAgR29yZGljLldlYkFwcC5nbG9iYWxTZXR0aW5nRm9ybXMucmVnaXN0ZXIoW0dvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRzVXNlclNldHRpbmdzKCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuQXBwU2V0dGluZ3MuQXR0YWNobWVudE9wZW5TZXR0aW5nc0Zvcm0oKSxcclxuICAgICAgICAgICAgR29yZGljLldmbC5BcHBTZXR0aW5ncy5Db2xvclBpY2tlclNldHRpbmdzRm9ybSgpLFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLkVrb1VzZXJTZXR0aW5nc1BpZChHbG9iYWxuaVByb21lbm5lLmdpbl9nZW5faXhwID8/IFwibmVcIiksXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzRWtvQm9vaygpLFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLkVrb1VzZXJTZXR0aW5nc0xpc3QoKSwgbF9vRm9ybV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gICBEZWxlZ8OhdCBwcm8gZXZpZGVuY2kgeiByZWRpc3RyaWJ1Y2VcclxuICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICBldmlkZW5jZURlbGVnYXRlKG9iajogeyBwaWRzOiBzdHJpbmdbXSwgdHlwQWc6IG51bWJlciB9KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkNvbXBvbmVudHMuRG9jc0ZvclJlZy5zaG93RWJvb2tzQ2hvaWNlKHRoaXMuZWxlbWVudCwgb2JqLnR5cEFnKS50aGVuKChrbmloYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxfb0NudCA9IHRoaXMuY3JlYXRlU2VydmljZUNvbnRlbnQoXCJHb3JkaWMuQnBsLldlYkNsaWVudC5HS29mRGV0YWlsRG9rbGFkdVRhYlwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5dHZvxZllbsOtIHNlcnZpc27DrWhvIGNvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbF9vQ250LmNhbGwoXCJBa2NlUG9kYW5pXCIsIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdm9sw6Fuw60gcG9kw6F2YWPDrSBmdW5rY2UgXHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiBvYmoucGlkc1swXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlkZW50aWZpw6F0b3IgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIHplU1NMOiB0cnVlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBqZSB0byBwb2TDoW7DrSBkb2tsYWR1IHplIFNTTFxyXG4gICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IGtuaWhhLml4cF9kZW4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBrbmloYSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3ZlR3BjID0gRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMobF9vQ250LmdwYywga25paGEuaXhwX2RlbiEpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm92w6kgR1BDIGRsZSBrbmloeVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Lm5hdmlnYXRlKFtcIkdvcmRpYy5CcGwuV2ViQ2xpZW50LkdLb2ZEZXRhaWxEb2tsYWR1VGFiXCIsIHtncGM6IG5vdmVHcGN9XSwgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG90ZXbFmcOtdCBkZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlkOiBcIkRldGFpbF9kb2tsYWR1I1wiLCBpeHA6IG9iai5waWRzWzBdLCBkdXBsaWtvdmFuaVZ5YmVyOiBmYWxzZSwgamVFZGl0b3ZhdGVsbmU6IHRydWUgfSk7ICAgICAgICAgICAgICAgICAvLyBwYXJhbWV0cnkgb3RldsWZZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyBsX29DbnQuY2xvc2UoKTsgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphdsWZZW7DrSBzZXJ2aXNuw61obyBrb250ZW50dVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=