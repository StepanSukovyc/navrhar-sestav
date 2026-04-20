"use strict";
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var WebClient;
        (function (WebClient) {
            /**
             * Resolver hledající identifikátory (cislo akce).
             *
             * @author Jiří Ileček
             * @since 484.1.0.1
            */
            class GAdaSearchResolver extends Gordic.Components.Search.GSearchResolver {
                constructor() {
                    super(...arguments);
                    this.terms = [
                        'cislo',
                        'nazev'
                    ];
                    this.gcontent = null;
                    this.globals = Gordic.Ada.Globals.GAdaGlobals;
                }
                /**
                 * Zde vracíme identifikátor resolveru.
                 */
                getDefaultId() {
                    return 'AdaCisloSearchResolver';
                }
                /**
                 * Zde vracíme informace o doméně resolveru.
                 */
                getDefaultDomain() {
                    return {
                        id: "AdaSearchResolverCisloId",
                        name: "Hledat akci",
                        description: "Hledá akci podle čísla",
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
                    let typPol = "cislo";
                    // Otrimuji text a převedu na upperCase aby uživatel nemusel zadávat pid pouze velkýmy písmeny.
                    const inputText = input.text?.trim()?.toUpperCase() ?? undefined;
                    this.gcontent = this.gcontent || new GContent("Gordic.Ada.WebClient.GAdaSearchResolver");
                    // 21.07.2020 - TFeik
                    // Odstranění zpomalovače a úprava vytváření inputTextu výše.
                    if (task.wasCancelled() || !inputText) {
                        return result;
                    }
                    return cnt.gcontent.call("RychleHledani", { typPolozky: typPol, hledanyText: inputText })
                        .then((data) => {
                        if (!data || data.length <= 0) {
                            return result;
                        }
                        for (let i = 0, count = data.length; i < count; i++) {
                            const akce = data[i];
                            const cislo = akce?.cislo;
                            // 21.07.2020 - TFeik
                            // Odstranění zpomalovače.
                            if (!cislo?.trim()) {
                                continue;
                            }
                            let popis = "Název: " + data[i].nazev;
                            if (data[i].kniha != null)
                                popis += ", Kniha: " + data[i].kniha_nazev;
                            // Vytvořím akci pro otevření detailu balíku.
                            result.push({
                                domainId: this.domain.id,
                                defaultAction: new GAction({
                                    name: "pidExec",
                                    icon: (data[i].kniha != null) ? "fa-link" : "fa-external-link", //"gi-minus",
                                    caption: (data[i].kniha != null) ? "Otevřít detail" : "Doklad cizí agendy",
                                    enabled: true,
                                    run: (ev, ctx) => {
                                        if (data[i].kniha != null) {
                                            //jedna se o doklad Ada, zobrazim detail
                                            var detailwindow = $.content().navigateTask(["Gordic.Ada.WebClient.GDetailAkce", { gridRemoteControl: null, gpc: Gordic.Eko.Utils.createBookGpc($.content().gpc, data[i].kniha) }], {
                                                id: 'DetailDokladu#',
                                                cislo: data[i].cislo,
                                                ixs_cia: data[i].ixs_cia,
                                                RezimProvozu: this.globals.RezimProvozu,
                                                Editable: this.globals.Param_Akce_Editace_TP,
                                                NovaAkce: false
                                            });
                                        }
                                    }
                                }),
                                confidence: 1,
                                name: "Nalezeno číslo: " + data[i].cislo,
                                icon: "gi-index",
                                description: popis
                            });
                        }
                        return result;
                    });
                }
            }
            WebClient.GAdaSearchResolver = GAdaSearchResolver;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkYVNlYXJjaFJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJTY3JpcHRzL0dBZGFTZWFyY2hSZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBa0hmO0FBbEhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtIbkI7SUFsSGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtIN0I7UUFsSG9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7Y0FLRTtZQUNGLE1BQWEsa0JBQW1CLFNBQVEsT0FBQSxVQUFVLENBQUMsTUFBTSxDQUFDLGVBQWU7Z0JBQXpFOztvQkFDYSxVQUFLLEdBQWE7d0JBQ3ZCLE9BQU87d0JBQ1AsT0FBTztxQkFDVixDQUFDO29CQUVNLGFBQVEsR0FBb0IsSUFBSSxDQUFDO29CQUNqQyxZQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQW1HckQsQ0FBQztnQkFqR0c7O21CQUVHO2dCQUNPLFlBQVk7b0JBQ2xCLE9BQU8sd0JBQXdCLENBQUM7Z0JBQ3BDLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNPLGdCQUFnQjtvQkFDdEIsT0FBTzt3QkFDSCxFQUFFLEVBQUUsMEJBQTBCO3dCQUM5QixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsV0FBVyxFQUFFLHdCQUF3Qjt3QkFDckMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO3FCQUMvQixDQUFDO2dCQUNOLENBQUM7Z0JBRUQ7Ozs7O21CQUtHO2dCQUNPLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSTtvQkFDM0IsTUFBTSxNQUFNLEdBQTZDLEVBQUUsQ0FBQztvQkFDNUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO29CQUNmLElBQUksTUFBTSxHQUFXLE9BQU8sQ0FBQztvQkFFN0IsK0ZBQStGO29CQUMvRixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxF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QUFDLE9BQU87Z0RBQ3hCLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVk7Z0RBQ3ZDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQjtnREFDNUMsUUFBUSxFQUFFLEtBQUs7NkNBQ2xCLENBQUMsQ0FBQzt3Q0FDWCxDQUFDO29DQUNMLENBQUM7aUNBQ0osQ0FBQztnQ0FFTixVQUFVLEVBQUUsQ0FBQztnQ0FDYixJQUFJLEVBQUUsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7Z0NBQ3hDLElBQUksRUFBRSxVQUFVO2dDQUNoQixXQUFXLEVBQUUsS0FBSzs2QkFDckIsQ0FBQyxDQUFDO3dCQUNQLENBQUM7d0JBRUQsT0FBTyxNQUFNLENBQUM7b0JBQ2xCLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFDSjtZQTFHWSw0QkFBa0IscUJBMEc5QixDQUFBO1FBQ0wsQ0FBQyxFQWxIb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBa0g3QjtJQUFELENBQUMsRUFsSGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWtIbkI7QUFBRCxDQUFDLEVBbEhTLE1BQU0sS0FBTixNQUFNLFFBa0hmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5BZGEuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZXIgaGxlZGFqw61jw60gaWRlbnRpZmlrw6F0b3J5IChjaXNsbyBha2NlKS5cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBKacWZw60gSWxlxI1la1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuMVxyXG4gICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBHQWRhU2VhcmNoUmVzb2x2ZXIgZXh0ZW5kcyBDb21wb25lbnRzLlNlYXJjaC5HU2VhcmNoUmVzb2x2ZXIge1xyXG4gICAgICAgIHJlYWRvbmx5IHRlcm1zOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAgICAgJ2Npc2xvJywgXHJcbiAgICAgICAgICAgICduYXpldidcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGdjb250ZW50OiBHQ29udGVudCB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFscyA9IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscztcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmRlIHZyYWPDrW1lIGlkZW50aWZpa8OhdG9yIHJlc29sdmVydS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdElkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0FkYUNpc2xvU2VhcmNoUmVzb2x2ZXInO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmRlIHZyYWPDrW1lIGluZm9ybWFjZSBvIGRvbcOpbsSbIHJlc29sdmVydS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdERvbWFpbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIkFkYVNlYXJjaFJlc29sdmVyQ2lzbG9JZFwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJIbGVkYXQgYWtjaVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSGxlZMOhIGFrY2kgcG9kbGUgxI3DrXNsYVwiLFxyXG4gICAgICAgICAgICAgICAgdGVybXM6IHRoaXMudGVybXMudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmRlIG5hIHrDoWtsYWTEmyB2c3R1cG7DrWhvIHRleHR1IG5hYsOtesOtbWUgdsO9c2xlZGt5IGhsZWTDoW7DrS5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gaW5wdXRcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gdGFza1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRSZXN1bHQoaW5wdXQsIHRhc2spIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0OiBDb21wb25lbnRzLlNlYXJjaC5JR1NlYXJjaFJlc29sdmVySXRlbVtdID0gW107XHJcbiAgICAgICAgICAgIHZhciBjbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgdHlwUG9sOiBzdHJpbmcgPSBcImNpc2xvXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBPdHJpbXVqaSB0ZXh0IGEgcMWZZXZlZHUgbmEgdXBwZXJDYXNlIGFieSB1xb5pdmF0ZWwgbmVtdXNlbCB6YWTDoXZhdCBwaWQgcG91emUgdmVsa8O9bXkgcMOtc21lbnkuXHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0VGV4dCA9IGlucHV0LnRleHQ/LnRyaW0oKT8udG9VcHBlckNhc2UoKSA/PyB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZ2NvbnRlbnQgPSB0aGlzLmdjb250ZW50IHx8IG5ldyBHQ29udGVudChcIkdvcmRpYy5BZGEuV2ViQ2xpZW50LkdBZGFTZWFyY2hSZXNvbHZlclwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIDIxLjA3LjIwMjAgLSBURmVpa1xyXG4gICAgICAgICAgICAvLyBPZHN0cmFuxJtuw60genBvbWFsb3ZhxI1lIGEgw7pwcmF2YSB2eXR2w6HFmWVuw60gaW5wdXRUZXh0dSB2w73FoWUuXHJcbiAgICAgICAgICAgIGlmICh0YXNrLndhc0NhbmNlbGxlZCgpIHx8ICFpbnB1dFRleHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjbnQuZ2NvbnRlbnQhLmNhbGwoXCJSeWNobGVIbGVkYW5pXCIsIHsgdHlwUG9sb3preTogdHlwUG9sLCBobGVkYW55VGV4dDogaW5wdXRUZXh0IH0pXHJcbiAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgY291bnQgPSBkYXRhLmxlbmd0aDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBha2NlID0gZGF0YVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lzbG8gPSBha2NlPy5jaXNsbztcclxuICAgICAgICAgICAgICAgICAgICAvLyAyMS4wNy4yMDIwIC0gVEZlaWtcclxuICAgICAgICAgICAgICAgICAgICAvLyBPZHN0cmFuxJtuw60genBvbWFsb3ZhxI1lLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2lzbG8/LnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3Bpczogc3RyaW5nID0gXCJOw6F6ZXY6IFwiICsgZGF0YVtpXS5uYXpldjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXS5rbmloYSAhPSBudWxsKSBwb3BpcyArPSBcIiwgS25paGE6IFwiICsgZGF0YVtpXS5rbmloYV9uYXpldjtcclxuIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvxZnDrW0gYWtjaSBwcm8gb3RldsWZZW7DrSBkZXRhaWx1IGJhbMOta3UuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tYWluSWQ6IHRoaXMuZG9tYWluIS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBpZEV4ZWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAoZGF0YVtpXS5rbmloYSAhPSBudWxsKSA/IFwiZmEtbGlua1wiIDogXCJmYS1leHRlcm5hbC1saW5rXCIsIC8vXCJnaS1taW51c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IChkYXRhW2ldLmtuaWhhICE9IG51bGwpID8gXCJPdGV2xZnDrXQgZGV0YWlsXCIgOiBcIkRva2xhZCBjaXrDrSBhZ2VuZHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV0ua25paGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9qZWRuYSBzZSBvIGRva2xhZCBBZGEsIHpvYnJhemltIGRldGFpbFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXRhaWx3aW5kb3cgPSAoJC5jb250ZW50KCkgYXMgYW55KS5uYXZpZ2F0ZVRhc2soXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkFkYS5XZWJDbGllbnQuR0RldGFpbEFrY2VcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogbnVsbCwgZ3BjOiBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGMoJC5jb250ZW50KCkuZ3BjLCBkYXRhW2ldLmtuaWhhKSB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ0RldGFpbERva2xhZHUjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzbG86IGRhdGFbaV0uY2lzbG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19jaWE6IGRhdGFbaV0uaXhzX2NpYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmV6aW1Qcm92b3p1OiB0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZGl0YWJsZTogdGhpcy5nbG9iYWxzLlBhcmFtX0FrY2VfRWRpdGFjZV9UUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTm92YUFrY2U6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZGVuY2U6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiTmFsZXplbm8gxI3DrXNsbzogXCIgKyBkYXRhW2ldLmNpc2xvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWluZGV4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=