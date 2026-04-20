"use strict";
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var AppSettings;
        (function (AppSettings) {
            /**
             * Uživatelské nastavení
             *
             * @author Martin Boček
             * @since 490.1.0.17
             */
            /**
             * Definice formulářů pro uživatelské nastavení
             *
             * @param {string} gin_gen_ixp aktuální hodnota parametru automatického generování identifikátoru (gin_gen_ixp)
             * @param {number} rok aktuální rok
             * @returns {Forms.Form[]} formuláře
             */
            function ListsSettingsForm(gin_gen_ixp, rok) {
                return [
                    // standardní uživatelské nastavení WFL a EKO
                    Gordic.Report.WebClient.GReportsUserSettings(),
                    Gordic.Wfl.AppSettings.AttachmentOpenSettingsForm(),
                    Gordic.Wfl.AppSettings.ColorPickerSettingsForm(),
                    Gordic.Eko.Utils.EkoUserSettingsPid(gin_gen_ixp),
                    Gordic.Eko.Utils.EkoUserSettingsEkoBook(),
                    Gordic.Eko.Utils.EkoUserSettingsList(),
                    // další uživatelské nastavení specifické pro modul
                    // TODO: odstraněno, bude to nahrazeno přednastavením
                    //UserSettingsDoklad(ico),
                    UserSettingsFavoriteBooks(rok)
                ];
            }
            AppSettings.ListsSettingsForm = ListsSettingsForm;
            ///**
            // * Definice formuláře do uživatelského nastavení pro doklad
            // *
            // * @param {string} ico aktuálně přihlášené IČO
            // * @returns {Forms.Form} formulář
            // */
            //export function UserSettingsDoklad(ico: string): Forms.Form {
            //    let form = new Gordic.Forms.Form({ name: "DokladSettingsForm", tabOptions: { title: "Doklad", opened: false } } as any)
            //        // TODO: do vyřešení, jak tam předat ičo, zakomentováno a místo toho použit prefab ginsfun
            //        .addRow("Kompetent").addField("gselectbox", Gordic.Prefabs.Select.ekoskomMini(), {
            //            name: "DokladIxsFunVyriz",
            //            tooltip: "Předvyplněný kompetent při podání dokladu",
            //            //model: "ico=>ico;Global.Sml.AppSettings.DokladSettingsForm.DokladIxsFunVyriz=ixs_fun",
            //            model: function (operator, dto, modelOptions) {
            //                if (operator === "apply") {
            //                    // nastavení hodnoty
            //                    if (dto?.Global?.Sml?.AppSettings?.DokladSettingsForm?.DokladIxsFunVyriz) {
            //                        $(this).gform().findFields("DokladIxsFunVyriz").gfield("setInitial", {
            //                            ixs_fun: dto.Global.Sml.AppSettings.DokladSettingsForm.DokladIxsFunVyriz,
            //                            ico: ico
            //                        });
            //                    }
            //                }
            //                else if (operator === "collect") {
            //                    // přečtení hodnoty
            //                    const value = $(this).gform().findFields("DokladIxsFunVyriz").gfield("getValue");
            //                    if (value !== null) {
            //                        dto["Global"] = $.extend(true,
            //                            dto.Global ?? {},
            //                            { Sml: { AppSettings: { DokladSettingsForm: { DokladIxsFunVyriz: value.ixs_fun } } } }
            //                        );
            //                    }
            //                }
            //            },
            //            serverFilters: { ico: ico },
            //            customClass: "userSettings-saveWithoutNotice"
            //        })
            //        .addRow("Vyřizující referent").addField("gselectbox", Gordic.Prefabs.Select.ginsfunMini(), {
            //            name: "DokladIxsFunRef",
            //            tooltip: "Předvyplněný vyřizující referent při podání dokladu",
            //            model: "Global.Sml.AppSettings.DokladSettingsForm.DokladIxsFunRef=ixs_fun",
            //            customClass: "userSettings-saveWithoutNotice"
            //        })
            //        .addRow("Organizační jednotka").addField("gselectbox", Gordic.Prefabs.Select.ginsorj(), {
            //            name: "DokladIxsOrj",
            //            tooltip: "Předvyplněná organizační jednotka při podání dokladu",
            //            model: "Global.Sml.AppSettings.DokladSettingsForm.DokladIxsOrj=ixs_orj",
            //            customClass: "userSettings-saveWithoutNotice"
            //        })
            //        .addRow("Zastoupený").addField("gselectbox", Gordic.Prefabs.Select.ginsref(), {
            //            name: "DokladIxsRefZast",
            //            tooltip: "Předvyplněný zastoupený interního subjektu při podání dokladu",
            //            model: "Global.Sml.AppSettings.DokladSettingsForm.DokladIxsRefZast=ixs_ref",
            //            serverFilters: { aktivita: 100, },
            //            customClass: "userSettings-saveWithoutNotice"
            //        })
            //        .addRow("Typ platnosti").addField("gselectbox", Gordic.Prefabs.Select.smlctpl(), {
            //            name: "DokladTypPlatnost",
            //            tooltip: "Předvyplněný typ platnosti při podání dokladu",
            //            model: "Global.Sml.AppSettings.DokladSettingsForm.DokladTypPlatnost=typ_platnost",
            //            customClass: "userSettings-saveWithoutNotice"
            //        })
            //        ;
            //    return form;
            //}
            /**
             * Definice formuláře do uživatelského nastavení pro oblíbené knihy
             *
             * @param {number} rok aktuální rok
             * @returns {Forms.Form} formulář
             */
            function UserSettingsFavoriteBooks(rok) {
                const createFavoriteBookField = function (rok, num) {
                    return /*Gordic.Prefabs.Select.ekosden(Gordic.Sml.Globals.Enums.TypAg.SML), */ {
                        name: "FavoriteBook" + num.toString(),
                        model: "Global.Sml.AppSettings.DashboardSettingsForm.FavoriteBook" + num.toString() + "=ixp_den",
                        customClass: "userSettings-saveWithoutNotice",
                        dropdown: false,
                        serverFilters: {
                            ktg_den: [
                                Sml.Globals.Enums.KtgDen.SmlouvyDodavatelske,
                                Sml.Globals.Enums.KtgDen.SmlouvyOdberatelske,
                                Sml.Globals.Enums.KtgDen.SmlouvyBezRozliseni,
                                Sml.Globals.Enums.KtgDen.SmlouvyBezFP,
                                Sml.Globals.Enums.KtgDen.ObjednavkyDodavatelske,
                                Sml.Globals.Enums.KtgDen.ObjednavkyOdberatelske,
                                Sml.Globals.Enums.KtgDen.ObjednavkyBezRozliseni,
                                Sml.Globals.Enums.KtgDen.ObjednavkyBezFP,
                                Sml.Globals.Enums.KtgDen.PrislibyIndividualni,
                                Sml.Globals.Enums.KtgDen.PrislibyLimitovane,
                                Sml.Globals.Enums.KtgDen.PrijmyJineOcekavane,
                                Sml.Globals.Enums.KtgDen.PrijmyJineIndividualni
                            ],
                            typ_ag: Gordic.Sml.Globals.Enums.TypAg.SML,
                            rok: rok
                        },
                    };
                };
                let form = new Gordic.Forms.Form({ name: "DashboardSettingsForm", tabOptions: { title: "Úvodní obrazovka", opened: false } })
                    .addRow("Oblíbená kniha 1").addField("gselectbox", Gordic.Prefabs.Select.ekosden(Gordic.Sml.Globals.Enums.TypAg.SML), createFavoriteBookField(rok, 1)
                //{
                //    name: "FavoriteBook1",
                //    model: "Global.Sml.AppSettings.DashboardSettingsForm.FavoriteBook1=ixp_den",
                //    customClass: "userSettings-saveWithoutNotice",
                //    dropdown: false,
                //    serverFilters: {
                //        ktg_den: [
                //            Sml.Globals.Enums.KtgDen.SmlouvyDodavatelske,
                //            Sml.Globals.Enums.KtgDen.SmlouvyOdberatelske,
                //            Sml.Globals.Enums.KtgDen.SmlouvyBezRozliseni,
                //            Sml.Globals.Enums.KtgDen.SmlouvyBezFP,
                //            Sml.Globals.Enums.KtgDen.ObjednavkyDodavatelske,
                //            Sml.Globals.Enums.KtgDen.ObjednavkyOdberatelske,
                //            Sml.Globals.Enums.KtgDen.ObjednavkyBezRozliseni,
                //            Sml.Globals.Enums.KtgDen.ObjednavkyBezFP,
                //            Sml.Globals.Enums.KtgDen.PrislibyIndividualni,
                //            Sml.Globals.Enums.KtgDen.PrislibyLimitovane,
                //            Sml.Globals.Enums.KtgDen.PrijmyJineOcekavane,
                //            Sml.Globals.Enums.KtgDen.PrijmyJineIndividualni
                //        ],
                //        typ_ag: Gordic.Sml.Globals.Enums.TypAg.SML,
                //        rok: rok
                //    },
                //}
                )
                    .addRow("Oblíbená kniha 2").addField("gselectbox", Gordic.Prefabs.Select.ekosden(Gordic.Sml.Globals.Enums.TypAg.SML), createFavoriteBookField(rok, 2))
                    .addRow("Oblíbená kniha 3").addField("gselectbox", Gordic.Prefabs.Select.ekosden(Gordic.Sml.Globals.Enums.TypAg.SML), createFavoriteBookField(rok, 3))
                    .addRow("Oblíbená kniha 4").addField("gselectbox", Gordic.Prefabs.Select.ekosden(Gordic.Sml.Globals.Enums.TypAg.SML), createFavoriteBookField(rok, 4));
                return form;
            }
            AppSettings.UserSettingsFavoriteBooks = UserSettingsFavoriteBooks;
        })(AppSettings = Sml.AppSettings || (Sml.AppSettings = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NtbFVzZXJTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTbWxVc2VyU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTRLZjtBQTVLRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0S25CO0lBNUtnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFdBQVcsQ0E0Sy9CO1FBNUtvQixXQUFBLFdBQVc7WUFFNUI7Ozs7O2VBS0c7WUFFSDs7Ozs7O2VBTUc7WUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxXQUFtQixFQUFFLEdBQVc7Z0JBRTlELE9BQU87b0JBQ0gsNkNBQTZDO29CQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRTtvQkFDOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsMEJBQTBCLEVBQUU7b0JBQ25ELE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFO29CQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7b0JBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFO29CQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRTtvQkFDdEMsbURBQW1EO29CQUNuRCxxREFBcUQ7b0JBQ3JELDBCQUEwQjtvQkFDMUIseUJBQXlCLENBQUMsR0FBRyxDQUFDO2lCQUNqQyxDQUFDO1lBQ04sQ0FBQztZQWZlLDZCQUFpQixvQkFlaEMsQ0FBQTtZQUVELEtBQUs7WUFDTCw2REFBNkQ7WUFDN0QsSUFBSTtZQUNKLGdEQUFnRDtZQUNoRCxtQ0FBbUM7WUFDbkMsS0FBSztZQUNMLCtEQUErRDtZQUUvRCw2SEFBNkg7WUFDN0gsb0dBQW9HO1lBQ3BHLDRGQUE0RjtZQUM1Rix3Q0FBd0M7WUFDeEMsbUVBQW1FO1lBQ25FLHNH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QUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ3JKLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsdUJBQXVCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ3JKO2dCQUVMLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFoRWUscUNBQXlCLDRCQWdFeEMsQ0FBQTtRQUNMLENBQUMsRUE1S29CLFdBQVcsR0FBWCxlQUFXLEtBQVgsZUFBVyxRQTRLL0I7SUFBRCxDQUFDLEVBNUtnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE0S25CO0FBQUQsQ0FBQyxFQTVLUyxNQUFNLEtBQU4sTUFBTSxRQTRLZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU21sLkFwcFNldHRpbmdzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFXFvml2YXRlbHNrw6kgbmFzdGF2ZW7DrVxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgTWFydGluIEJvxI1la1xyXG4gICAgICogQHNpbmNlIDQ5MC4xLjAuMTdcclxuICAgICAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5pY2UgZm9ybXVsw6HFmcWvIHBybyB1xb5pdmF0ZWxza8OpIG5hc3RhdmVuw61cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdpbl9nZW5faXhwIGFrdHXDoWxuw60gaG9kbm90YSBwYXJhbWV0cnUgYXV0b21hdGlja8OpaG8gZ2VuZXJvdsOhbsOtIGlkZW50aWZpa8OhdG9ydSAoZ2luX2dlbl9peHApXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm9rIGFrdHXDoWxuw60gcm9rXHJcbiAgICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybVtdfSBmb3JtdWzDocWZZVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gTGlzdHNTZXR0aW5nc0Zvcm0oZ2luX2dlbl9peHA6IHN0cmluZywgcm9rOiBudW1iZXIpOiBGb3Jtcy5Gb3JtW10ge1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAvLyBzdGFuZGFyZG7DrSB1xb5pdmF0ZWxza8OpIG5hc3RhdmVuw60gV0ZMIGEgRUtPXHJcbiAgICAgICAgICAgIEdvcmRpYy5SZXBvcnQuV2ViQ2xpZW50LkdSZXBvcnRzVXNlclNldHRpbmdzKCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuQXBwU2V0dGluZ3MuQXR0YWNobWVudE9wZW5TZXR0aW5nc0Zvcm0oKSxcclxuICAgICAgICAgICAgR29yZGljLldmbC5BcHBTZXR0aW5ncy5Db2xvclBpY2tlclNldHRpbmdzRm9ybSgpLFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLkVrb1VzZXJTZXR0aW5nc1BpZChnaW5fZ2VuX2l4cCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uVXRpbHMuRWtvVXNlclNldHRpbmdzRWtvQm9vaygpLFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLkVrb1VzZXJTZXR0aW5nc0xpc3QoKSxcclxuICAgICAgICAgICAgLy8gZGFsxaHDrSB1xb5pdmF0ZWxza8OpIG5hc3RhdmVuw60gc3BlY2lmaWNrw6kgcHJvIG1vZHVsXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG9kc3RyYW7Em25vLCBidWRlIHRvIG5haHJhemVubyBwxZllZG5hc3RhdmVuw61tXHJcbiAgICAgICAgICAgIC8vVXNlclNldHRpbmdzRG9rbGFkKGljbyksXHJcbiAgICAgICAgICAgIFVzZXJTZXR0aW5nc0Zhdm9yaXRlQm9va3Mocm9rKVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vKipcclxuICAgIC8vICogRGVmaW5pY2UgZm9ybXVsw6HFmWUgZG8gdcW+aXZhdGVsc2vDqWhvIG5hc3RhdmVuw60gcHJvIGRva2xhZFxyXG4gICAgLy8gKlxyXG4gICAgLy8gKiBAcGFyYW0ge3N0cmluZ30gaWNvIGFrdHXDoWxuxJsgcMWZaWhsw6HFoWVuw6kgScSMT1xyXG4gICAgLy8gKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX0gZm9ybXVsw6HFmVxyXG4gICAgLy8gKi9cclxuICAgIC8vZXhwb3J0IGZ1bmN0aW9uIFVzZXJTZXR0aW5nc0Rva2xhZChpY286IHN0cmluZyk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgIC8vICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJEb2tsYWRTZXR0aW5nc0Zvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJEb2tsYWRcIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KVxyXG4gICAgLy8gICAgICAgIC8vIFRPRE86IGRvIHZ5xZllxaFlbsOtLCBqYWsgdGFtIHDFmWVkYXQgacSNbywgemFrb21lbnRvdsOhbm8gYSBtw61zdG8gdG9obyBwb3XFvml0IHByZWZhYiBnaW5zZnVuXHJcbiAgICAvLyAgICAgICAgLmFkZFJvdyhcIktvbXBldGVudFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nrb21NaW5pKCksIHtcclxuICAgIC8vICAgICAgICAgICAgbmFtZTogXCJEb2tsYWRJeHNGdW5WeXJpelwiLFxyXG4gICAgLy8gICAgICAgICAgICB0b29sdGlwOiBcIlDFmWVkdnlwbG7Em27DvSBrb21wZXRlbnQgcMWZaSBwb2TDoW7DrSBkb2tsYWR1XCIsXHJcbiAgICAvLyAgICAgICAgICAgIC8vbW9kZWw6IFwiaWNvPT5pY287R2xvYmFsLlNtbC5BcHBTZXR0aW5ncy5Eb2tsYWRTZXR0aW5nc0Zvcm0uRG9rbGFkSXhzRnVuVnlyaXo9aXhzX2Z1blwiLFxyXG4gICAgLy8gICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wZXJhdG9yLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSBcImFwcGx5XCIpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGhvZG5vdHlcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBpZiAoZHRvPy5HbG9iYWw/LlNtbD8uQXBwU2V0dGluZ3M/LkRva2xhZFNldHRpbmdzRm9ybT8uRG9rbGFkSXhzRnVuVnlyaXopIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZm9ybSgpLmZpbmRGaWVsZHMoXCJEb2tsYWRJeHNGdW5WeXJpelwiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19mdW46IGR0by5HbG9iYWwuU21sLkFwcFNldHRpbmdzLkRva2xhZFNldHRpbmdzRm9ybS5Eb2tsYWRJeHNGdW5WeXJpeixcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogaWNvXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wZXJhdG9yID09PSBcImNvbGxlY3RcIikge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIC8vIHDFmWXEjXRlbsOtIGhvZG5vdHlcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICQodGhpcykuZ2Zvcm0oKS5maW5kRmllbGRzKFwiRG9rbGFkSXhzRnVuVnlyaXpcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGR0b1tcIkdsb2JhbFwiXSA9ICQuZXh0ZW5kKHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uR2xvYmFsID8/IHt9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBTbWw6IHsgQXBwU2V0dGluZ3M6IHsgRG9rbGFkU2V0dGluZ3NGb3JtOiB7IERva2xhZEl4c0Z1blZ5cml6OiB2YWx1ZS5peHNfZnVuIH0gfSB9IH1cclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgIH0sXHJcbiAgICAvLyAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgaWNvOiBpY28gfSxcclxuICAgIC8vICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgIC8vICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgIC5hZGRSb3coXCJWecWZaXp1asOtY8OtIHJlZmVyZW50XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2Z1bk1pbmkoKSwge1xyXG4gICAgLy8gICAgICAgICAgICBuYW1lOiBcIkRva2xhZEl4c0Z1blJlZlwiLFxyXG4gICAgLy8gICAgICAgICAgICB0b29sdGlwOiBcIlDFmWVkdnlwbG7Em27DvSB2ecWZaXp1asOtY8OtIHJlZmVyZW50IHDFmWkgcG9kw6Fuw60gZG9rbGFkdVwiLFxyXG4gICAgLy8gICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuU21sLkFwcFNldHRpbmdzLkRva2xhZFNldHRpbmdzRm9ybS5Eb2tsYWRJeHNGdW5SZWY9aXhzX2Z1blwiLFxyXG4gICAgLy8gICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgLy8gICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgLmFkZFJvdyhcIk9yZ2FuaXphxI1uw60gamVkbm90a2FcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zb3JqKCksIHtcclxuICAgIC8vICAgICAgICAgICAgbmFtZTogXCJEb2tsYWRJeHNPcmpcIixcclxuICAgIC8vICAgICAgICAgICAgdG9vbHRpcDogXCJQxZllZHZ5cGxuxJtuw6Egb3JnYW5pemHEjW7DrSBqZWRub3RrYSBwxZlpIHBvZMOhbsOtIGRva2xhZHVcIixcclxuICAgIC8vICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLlNtbC5BcHBTZXR0aW5ncy5Eb2tsYWRTZXR0aW5nc0Zvcm0uRG9rbGFkSXhzT3JqPWl4c19vcmpcIixcclxuICAgIC8vICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgIC8vICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgIC5hZGRSb3coXCJaYXN0b3VwZW7DvVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNyZWYoKSwge1xyXG4gICAgLy8gICAgICAgICAgICBuYW1lOiBcIkRva2xhZEl4c1JlZlphc3RcIixcclxuICAgIC8vICAgICAgICAgICAgdG9vbHRpcDogXCJQxZllZHZ5cGxuxJtuw70gemFzdG91cGVuw70gaW50ZXJuw61obyBzdWJqZWt0dSBwxZlpIHBvZMOhbsOtIGRva2xhZHVcIixcclxuICAgIC8vICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLlNtbC5BcHBTZXR0aW5ncy5Eb2tsYWRTZXR0aW5nc0Zvcm0uRG9rbGFkSXhzUmVmWmFzdD1peHNfcmVmXCIsXHJcbiAgICAvLyAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHsgYWt0aXZpdGE6IDEwMCwgfSxcclxuICAgIC8vICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgIC8vICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgIC5hZGRSb3coXCJUeXAgcGxhdG5vc3RpXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Quc21sY3RwbCgpLCB7XHJcbiAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiRG9rbGFkVHlwUGxhdG5vc3RcIixcclxuICAgIC8vICAgICAgICAgICAgdG9vbHRpcDogXCJQxZllZHZ5cGxuxJtuw70gdHlwIHBsYXRub3N0aSBwxZlpIHBvZMOhbsOtIGRva2xhZHVcIixcclxuICAgIC8vICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLlNtbC5BcHBTZXR0aW5ncy5Eb2tsYWRTZXR0aW5nc0Zvcm0uRG9rbGFkVHlwUGxhdG5vc3Q9dHlwX3BsYXRub3N0XCIsXHJcbiAgICAvLyAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAvLyAgICAgICAgfSlcclxuICAgIC8vICAgICAgICA7XHJcblxyXG4gICAgLy8gICAgcmV0dXJuIGZvcm07XHJcbiAgICAvL31cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluaWNlIGZvcm11bMOhxZllIGRvIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtIHBybyBvYmzDrWJlbsOpIGtuaWh5XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvayBha3R1w6FsbsOtIHJva1xyXG4gICAgICogQHJldHVybnMge0Zvcm1zLkZvcm19IGZvcm11bMOhxZlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFVzZXJTZXR0aW5nc0Zhdm9yaXRlQm9va3Mocm9rOiBudW1iZXIpOiBGb3Jtcy5Gb3JtIHtcclxuXHJcbiAgICAgICAgY29uc3QgY3JlYXRlRmF2b3JpdGVCb29rRmllbGQgPSBmdW5jdGlvbiAocm9rOiBudW1iZXIsIG51bTogbnVtYmVyKTogR1NlbGVjdEJveE9wdGlvbnM8RWtvLkludGVyZmFjZS5HRWtvc2RlbkR0bz4ge1xyXG4gICAgICAgICAgICByZXR1cm4gLypHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2RlbihHb3JkaWMuU21sLkdsb2JhbHMuRW51bXMuVHlwQWcuU01MKSwgKi97XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkZhdm9yaXRlQm9va1wiICsgbnVtLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuU21sLkFwcFNldHRpbmdzLkRhc2hib2FyZFNldHRpbmdzRm9ybS5GYXZvcml0ZUJvb2tcIiArIG51bS50b1N0cmluZygpICsgXCI9aXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCIsXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAga3RnX2RlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uU21sb3V2eURvZGF2YXRlbHNrZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLlNtbG91dnlPZGJlcmF0ZWxza2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNtbC5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5TbWxvdXZ5QmV6Um96bGlzZW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uU21sb3V2eUJlekZQLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uT2JqZWRuYXZreURvZGF2YXRlbHNrZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLk9iamVkbmF2a3lPZGJlcmF0ZWxza2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNtbC5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5PYmplZG5hdmt5QmV6Um96bGlzZW5pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uT2JqZWRuYXZreUJlekZQLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uUHJpc2xpYnlJbmRpdmlkdWFsbmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNtbC5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5QcmlzbGlieUxpbWl0b3ZhbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNtbC5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5QcmlqbXlKaW5lT2Nla2F2YW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uUHJpam15SmluZUluZGl2aWR1YWxuaVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwX2FnOiBHb3JkaWMuU21sLkdsb2JhbHMuRW51bXMuVHlwQWcuU01MLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvazogcm9rXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiRGFzaGJvYXJkU2V0dGluZ3NGb3JtXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwiw5p2b2Ruw60gb2JyYXpvdmthXCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIGFueSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcIk9ibMOtYmVuw6Ega25paGEgMVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zZGVuKEdvcmRpYy5TbWwuR2xvYmFscy5FbnVtcy5UeXBBZy5TTUwpLFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlRmF2b3JpdGVCb29rRmllbGQocm9rLCAxKVxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIkZhdm9yaXRlQm9vazFcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcIkdsb2JhbC5TbWwuQXBwU2V0dGluZ3MuRGFzaGJvYXJkU2V0dGluZ3NGb3JtLkZhdm9yaXRlQm9vazE9aXhwX2RlblwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAga3RnX2RlbjogW1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uU21sb3V2eURvZGF2YXRlbHNrZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLlNtbG91dnlPZGJlcmF0ZWxza2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIFNtbC5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5TbWxvdXZ5QmV6Um96bGlzZW5pLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uU21sb3V2eUJlekZQLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uT2JqZWRuYXZreURvZGF2YXRlbHNrZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgU21sLkdsb2JhbHMuRW51bXMuS3RnRGVuLk9iamVkbmF2a3lPZGJlcmF0ZWxza2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIFNtbC5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5PYmplZG5hdmt5QmV6Um96bGlzZW5pLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uT2JqZWRuYXZreUJlekZQLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uUHJpc2xpYnlJbmRpdmlkdWFsbmksXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIFNtbC5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5QcmlzbGlieUxpbWl0b3ZhbmUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIFNtbC5HbG9iYWxzLkVudW1zLkt0Z0Rlbi5QcmlqbXlKaW5lT2Nla2F2YW5lLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBTbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uUHJpam15SmluZUluZGl2aWR1YWxuaVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdHlwX2FnOiBHb3JkaWMuU21sLkdsb2JhbHMuRW51bXMuVHlwQWcuU01MLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHJvazogcm9rXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmFkZFJvdyhcIk9ibMOtYmVuw6Ega25paGEgMlwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NkZW4oR29yZGljLlNtbC5HbG9iYWxzLkVudW1zLlR5cEFnLlNNTCksIGNyZWF0ZUZhdm9yaXRlQm9va0ZpZWxkKHJvaywgMikpXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJPYmzDrWJlbsOhIGtuaWhhIDNcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zZGVuKEdvcmRpYy5TbWwuR2xvYmFscy5FbnVtcy5UeXBBZy5TTUwpLCBjcmVhdGVGYXZvcml0ZUJvb2tGaWVsZChyb2ssIDMpKVxyXG4gICAgICAgICAgICAuYWRkUm93KFwiT2Jsw61iZW7DoSBrbmloYSA0XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2RlbihHb3JkaWMuU21sLkdsb2JhbHMuRW51bXMuVHlwQWcuU01MKSwgY3JlYXRlRmF2b3JpdGVCb29rRmllbGQocm9rLCA0KSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICByZXR1cm4gZm9ybTtcclxuICAgIH1cclxufVxyXG4iXX0=