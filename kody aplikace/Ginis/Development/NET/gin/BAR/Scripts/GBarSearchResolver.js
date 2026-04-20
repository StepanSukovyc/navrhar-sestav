"use strict";
var Gordic;
(function (Gordic) {
    var Bar;
    (function (Bar) {
        var WebClient;
        (function (WebClient) {
            /**
             * Resolver hledající identifikátory (cislo akce).
             *
             * @author Jiří Ileček
             * @since 484.1.0.1
            */
            class GBarSearchResolver extends Gordic.Components.Search.GSearchResolver {
                constructor() {
                    super(...arguments);
                    this.terms = [
                        'cislo',
                        'nazev'
                    ];
                    this.gcontent = null;
                }
                //        private globals = Gordic.Bar.Globals.GBarGlobals;
                /**
                 * Zde vracíme identifikátor resolveru.
                 */
                getDefaultId() {
                    return 'BarCisloSearchResolver';
                }
                /**
                 * Zde vracíme informace o doméně resolveru.
                 */
                getDefaultDomain() {
                    return {
                        id: "BarSearchResolverCisloId",
                        name: "Hledat požadavek",
                        description: "Hledá požadavek podle identifikátoru",
                        terms: this.terms.toString()
                    };
                }
                /**
                 * Zde na základě vstupního textu nabízíme výsledky hledání.
                 *
                 * @param {any} input
                 * @param {any} task
                 */
                getResult(input, task) {
                    const result = [];
                    var cnt = this;
                    let typPol = "ixp";
                    // Otrimuji text a převedu na upperCase aby uživatel nemusel zadávat pid pouze velkýmy písmeny.
                    const inputText = input.text?.trim()?.toUpperCase() ?? undefined;
                    this.gcontent = this.gcontent || new GContent("Gordic.Bar.WebClient.GBarSearchResolver");
                    //// 21.07.2020 - TFeik
                    //// Odstranění zpomalovače a úprava vytváření inputTextu výše.
                    //if (task.wasCancelled() || !inputText) {
                    //    return result;
                    //}
                    //return cnt.gcontent!.call("RychleHledani", { typPolozky: typPol, hledanyText: inputText })
                    //  .then((data) => {
                    //    if (!data || data.length <= 0) {
                    //        return result;
                    //    }
                    //    for (let i = 0, count = data.length; i < count; i++) {
                    //        const akce = data[i];
                    //        const cislo = akce?.cislo;
                    //        // 21.07.2020 - TFeik
                    //        // Odstranění zpomalovače.
                    //        if (!cislo?.trim()) {
                    //            continue;
                    //        }
                    //        let popis: string = "Název: " + data[i].nazev;
                    //        if (data[i].kniha != null) popis += ", Kniha: " + data[i].kniha;
                    //        // Vytvořím akci pro otevření detailu balíku.
                    //        result.push(
                    //            {
                    //            domainId: this.domain!.id,
                    //            defaultAction:
                    //                new GAction({
                    //                    name: "pidExec",
                    //                    icon: (data[i].kniha != null) ? "fa-link" : "fa-external-link", //"gi-minus",
                    //                    caption: (data[i].kniha != null) ? "Otevřít detail" : "Doklad cizí agendy",
                    //                    enabled: true,
                    //                    run: (ev, ctx) => {
                    //                        if (data[i].kniha != null) {
                    //                            //jedna se o doklad Ada, zobrazim detail
                    //                            var detailwindow = ($.content() as any).navigateTask(
                    //                                ["Gordic.Ada.WebClient.GDetailAkce", { gridRemoteControl: null, gpc: Gordic.Eko.Utils.createBookGpc($.content().gpc, data[i].kniha) }],
                    //                                    {
                    //                                    id: 'DetailDokladu#',
                    //                                    cislo: data[i].cislo,
                    //                                    ixs_cia: data[i].ixs_cia,
                    //                                    RezimProvozu: this.globals.RezimProvozu,
                    //                                    Editable: false,
                    //                                    NovaAkce: false
                    //                                });
                    //                        }
                    //                    }
                    //                }),                                    
                    //            confidence: 1,
                    //            name: "Nalezeno číslo: " + data[i].cislo,
                    //            icon: "gi-index",
                    //            description: popis
                    //        });
                    //    }
                    return result;
                    //  });
                }
            }
            WebClient.GBarSearchResolver = GBarSearchResolver;
        })(WebClient = Bar.WebClient || (Bar.WebClient = {}));
    })(Bar = Gordic.Bar || (Gordic.Bar = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0JhclNlYXJjaFJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dCYXJTZWFyY2hSZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBa0hmO0FBbEhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtIbkI7SUFsSGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtIN0I7UUFsSG9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7Y0FLRTtZQUNGLE1BQWEsa0JBQW1CLFNBQVEsT0FBQSxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWU7Z0JBQXpFOztvQkFDYSxVQUFLLEdBQWE7d0JBQ3ZCLE9BQU87d0JBQ1AsT0FBTztxQkFDVixDQUFDO29CQUVNLGFBQVEsR0FBb0IsSUFBSSxDQUFDO2dCQW9HN0MsQ0FBQztnQkFuR0wsMkRBQTJEO2dCQUVuRDs7bUJBRUc7Z0JBQ08sWUFBWTtvQkFDbEIsT0FBTyx3QkFBd0IsQ0FBQztnQkFDcEMsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ08sZ0JBQWdCO29CQUN0QixPQUFPO3dCQUNILEVBQUUsRUFBRSwwQkFBMEI7d0JBQzlCLElBQUksRUFBRSxrQkFBa0I7d0JBQ3hCLFdBQVcsRUFBRSxzQ0FBc0M7d0JBQ25ELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtxQkFDL0IsQ0FBQztnQkFDTixDQUFDO2dCQUVEOzs7OzttQkFLRztnQkFDTyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUk7b0JBQzNCLE1BQU0sTUFBTSxHQUE2QyxFQUFFLENBQUM7b0JBQzVELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztvQkFDZixJQUFJLE1BQU0sR0FBVyxLQUFLLENBQUM7b0JBRTNCLCtGQUErRjtvQkFDL0YsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxTQUFTLENBQUM7b0JBQ2pFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLFFBQVEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO29CQUV6Rix1QkFBdUI7b0JBQ3ZCLCtEQUErRDtvQkFDL0QsMENBQTBDO29CQUMxQyxvQkFBb0I7b0JBQ3BCLEdBQUc7b0JBRUgsNEZBQTRGO29CQUM1RixxQkFBcUI7b0JBQ3JCLHNDQUFzQztvQkFDdEMsd0JBQXdCO29CQUN4QixPQUFPO29CQUVQLDREQUE0RDtvQkFDNUQsK0JBQStCO29CQUUvQixvQ0FBb0M7b0JBQ3BDLCtCQUErQjtvQkFDL0Isb0NBQW9DO29CQUNwQywrQkFBK0I7b0JBQy9CLHVCQUF1QjtvQkFDdkIsV0FBVztvQkFFWCx3REFBd0Q7b0JBQ3hELDBFQUEwRTtvQkFFMUUsdURBQXVEO29CQUN2RCxzQkFBc0I7b0JBQ3RCLGVBQWU7b0JBQ2Ysd0NBQXdDO29CQUN4Qyw0QkFBNEI7b0JBQzVCLCtCQUErQjtvQkFDL0Isc0NBQXNDO29CQUN0QyxtR0FBbUc7b0JBQ25HLGlHQUFpRztvQkFDakcsb0NBQW9DO29CQUNwQyx5Q0FBeUM7b0JBQ3pDLHNEQUFzRDtvQkFDdEQsc0VBQXNFO29CQUV0RSxtRkFBbUY7b0JBQ25GLHlLQUF5SztvQkFDekssdUNBQXVDO29CQUN2QywyREFBMkQ7b0JBQzNELDJEQUEyRDtvQkFDM0QsK0RBQStEO29CQUMvRCw4RUFBOEU7b0JBQzlFLHNEQUFzRDtvQkFDdEQscURBQXFEO29CQUNyRCxxQ0FBcUM7b0JBQ3JDLDJCQUEyQjtvQkFDM0IsdUJBQXVCO29CQUN2Qix5REFBeUQ7b0JBRXpELDRCQUE0QjtvQkFDNUIsdURBQXVEO29CQUN2RCwrQkFBK0I7b0JBQy9CLGdDQUFnQztvQkFDaEMsYUFBYTtvQkFDYixPQUFPO29CQUVILE9BQU8sTUFBTSxDQUFDO29CQUNwQixPQUFPO2dCQUNULENBQUM7YUFDSjtZQTFHWSw0QkFBa0IscUJBMEc5QixDQUFBO1FBQ0wsQ0FBQyxFQWxIb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBa0g3QjtJQUFELENBQUMsRUFsSGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtIbkI7QUFBRCxDQUFDLEVBbEhTLE1BQU0sS0FBTixNQUFNLFFBa0hmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5CYXIuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZXIgaGxlZGFqw61jw60gaWRlbnRpZmlrw6F0b3J5IChjaXNsbyBha2NlKS5cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBKacWZw60gSWxlxI1la1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuMVxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHQmFyU2VhcmNoUmVzb2x2ZXIgZXh0ZW5kcyBDb21wb25lbnRzLlNlYXJjaC5HU2VhcmNoUmVzb2x2ZXIge1xyXG4gICAgICAgIHJlYWRvbmx5IHRlcm1zOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAgICAgJ2Npc2xvJywgXHJcbiAgICAgICAgICAgICduYXpldidcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGdjb250ZW50OiBHQ29udGVudCB8IG51bGwgPSBudWxsO1xyXG4vLyAgICAgICAgcHJpdmF0ZSBnbG9iYWxzID0gR29yZGljLkJhci5HbG9iYWxzLkdCYXJHbG9iYWxzO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaZGUgdnJhY8OtbWUgaWRlbnRpZmlrw6F0b3IgcmVzb2x2ZXJ1LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXREZWZhdWx0SWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnQmFyQ2lzbG9TZWFyY2hSZXNvbHZlcic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaZGUgdnJhY8OtbWUgaW5mb3JtYWNlIG8gZG9tw6luxJsgcmVzb2x2ZXJ1LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXREZWZhdWx0RG9tYWluKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiQmFyU2VhcmNoUmVzb2x2ZXJDaXNsb0lkXCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkhsZWRhdCBwb8W+YWRhdmVrXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJIbGVkw6EgcG/FvmFkYXZlayBwb2RsZSBpZGVudGlmaWvDoXRvcnVcIixcclxuICAgICAgICAgICAgICAgIHRlcm1zOiB0aGlzLnRlcm1zLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpkZSBuYSB6w6FrbGFkxJsgdnN0dXBuw61obyB0ZXh0dSBuYWLDrXrDrW1lIHbDvXNsZWRreSBobGVkw6Fuw60uXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IGlucHV0XHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHRhc2tcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0UmVzdWx0KGlucHV0LCB0YXNrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogQ29tcG9uZW50cy5TZWFyY2guSUdTZWFyY2hSZXNvbHZlckl0ZW1bXSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgY250ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHR5cFBvbDogc3RyaW5nID0gXCJpeHBcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIE90cmltdWppIHRleHQgYSBwxZlldmVkdSBuYSB1cHBlckNhc2UgYWJ5IHXFvml2YXRlbCBuZW11c2VsIHphZMOhdmF0IHBpZCBwb3V6ZSB2ZWxrw71teSBww61zbWVueS5cclxuICAgICAgICAgICAgY29uc3QgaW5wdXRUZXh0ID0gaW5wdXQudGV4dD8udHJpbSgpPy50b1VwcGVyQ2FzZSgpID8/IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5nY29udGVudCA9IHRoaXMuZ2NvbnRlbnQgfHwgbmV3IEdDb250ZW50KFwiR29yZGljLkJhci5XZWJDbGllbnQuR0JhclNlYXJjaFJlc29sdmVyXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8vLyAyMS4wNy4yMDIwIC0gVEZlaWtcclxuICAgICAgICAgICAgLy8vLyBPZHN0cmFuxJtuw60genBvbWFsb3ZhxI1lIGEgw7pwcmF2YSB2eXR2w6HFmWVuw60gaW5wdXRUZXh0dSB2w73FoWUuXHJcbiAgICAgICAgICAgIC8vaWYgKHRhc2sud2FzQ2FuY2VsbGVkKCkgfHwgIWlucHV0VGV4dCkge1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIGNudC5nY29udGVudCEuY2FsbChcIlJ5Y2hsZUhsZWRhbmlcIiwgeyB0eXBQb2xvemt5OiB0eXBQb2wsIGhsZWRhbnlUZXh0OiBpbnB1dFRleHQgfSlcclxuICAgICAgICAgICAgLy8gIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgICBmb3IgKGxldCBpID0gMCwgY291bnQgPSBkYXRhLmxlbmd0aDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNvbnN0IGFrY2UgPSBkYXRhW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIGNvbnN0IGNpc2xvID0gYWtjZT8uY2lzbG87XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyAyMS4wNy4yMDIwIC0gVEZlaWtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIE9kc3RyYW7Em27DrSB6cG9tYWxvdmHEjWUuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoIWNpc2xvPy50cmltKCkpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBsZXQgcG9waXM6IHN0cmluZyA9IFwiTsOhemV2OiBcIiArIGRhdGFbaV0ubmF6ZXY7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoZGF0YVtpXS5rbmloYSAhPSBudWxsKSBwb3BpcyArPSBcIiwgS25paGE6IFwiICsgZGF0YVtpXS5rbmloYTtcclxuIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gVnl0dm/FmcOtbSBha2NpIHBybyBvdGV2xZllbsOtIGRldGFpbHUgYmFsw61rdS5cclxuICAgICAgICAgICAgLy8gICAgICAgIHJlc3VsdC5wdXNoKFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBkb21haW5JZDogdGhpcy5kb21haW4hLmlkLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGlkRXhlY1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWNvbjogKGRhdGFbaV0ua25paGEgIT0gbnVsbCkgPyBcImZhLWxpbmtcIiA6IFwiZmEtZXh0ZXJuYWwtbGlua1wiLCAvL1wiZ2ktbWludXNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IChkYXRhW2ldLmtuaWhhICE9IG51bGwpID8gXCJPdGV2xZnDrXQgZGV0YWlsXCIgOiBcIkRva2xhZCBjaXrDrSBhZ2VuZHlcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV0ua25paGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2plZG5hIHNlIG8gZG9rbGFkIEFkYSwgem9icmF6aW0gZGV0YWlsXHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGV0YWlsd2luZG93ID0gKCQuY29udGVudCgpIGFzIGFueSkubmF2aWdhdGVUYXNrKFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkFkYS5XZWJDbGllbnQuR0RldGFpbEFrY2VcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogbnVsbCwgZ3BjOiBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoJC5jb250ZW50KCkuZ3BjLCBkYXRhW2ldLmtuaWhhKSB9XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdEZXRhaWxEb2tsYWR1IycsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzbG86IGRhdGFbaV0uY2lzbG8sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2NpYTogZGF0YVtpXS5peHNfY2lhLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlemltUHJvdm96dTogdGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTm92YUFrY2U6IGZhbHNlXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25maWRlbmNlOiAxLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiTmFsZXplbm8gxI3DrXNsbzogXCIgKyBkYXRhW2ldLmNpc2xvLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGljb246IFwiZ2ktaW5kZXhcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBkZXNjcmlwdGlvbjogcG9waXNcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgIC8vICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19