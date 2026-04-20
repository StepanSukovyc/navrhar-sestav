"use strict";
var Gordic;
(function (Gordic) {
    var Fuc;
    (function (Fuc) {
        var AppSettings;
        (function (AppSettings) {
            /**
             * Uživatelské nastavení
             *
             * @author Martin Boček
             * @since 484.1.0.34
             */
            /**
             * Definice formulářů pro uživatelské nastavení
             *
             * @param {string} gin_gen_ixp aktuální hodnota parametru automatického generování identifikátoru (gin_gen_ixp)
             * @returns {Forms.Form[]} formuláře
             */
            function ListsSettingsForm(gin_gen_ixp) {
                return [
                    // standardní uživatelské nastavení WFL a EKO
                    Gordic.Report.WebClient.GReportsUserSettings(),
                    Gordic.Wfl.AppSettings.AttachmentOpenSettingsForm(),
                    Gordic.Wfl.AppSettings.ColorPickerSettingsForm(),
                    Gordic.Eko.Utils.EkoUserSettingsPid(gin_gen_ixp),
                    Gordic.Eko.Utils.EkoUserSettingsEkoBook(),
                    Gordic.Eko.Utils.EkoUserSettingsList(),
                    // další uživatelské nastavení specifické pro modul
                    UserSettingDashboard(),
                    UserSettingUctUpo(),
                    UserSettingUpo()
                ];
            }
            AppSettings.ListsSettingsForm = ListsSettingsForm;
            /**
             * Definice formuláře do uživatelského nastavení pro úvodní obrazovku
             *
             * @returns {Forms.Form} formulář
             */
            function UserSettingDashboard() {
                // upozornění: defaulty musí být stejné jako v místě použití
                let form = new Gordic.Forms.Form({ name: "DashboardSettingsForm", tabOptions: { title: "jres:24100371", opened: false } }) //RC 24100371 : Úvodní obrazovka
                    .addRow()
                    .addField("gcheck", {
                    name: "UseFavoriteFilter",
                    label: "jres:24100372", //RC 24100372 : Na úvodní obrazovce zobrazovat počty záznamů podle oblíbených filtrů
                    model: "Global.Fuc.AppSettings.DashboardSettingsForm.UseFavoriteFilter=value",
                    tooltip: "jres:24100375", //RC 24100375 : pouze pro počty záznamů ve skupině Účtování
                    initialValue: true,
                    emptyValue: true,
                    defaultValue: true,
                    customClass: "userSettings-saveWithoutNotice"
                });
                return form;
            }
            AppSettings.UserSettingDashboard = UserSettingDashboard;
            /**
             * Definice formuláře do uživatelského nastavení pro maximální počet pohybů účtovaných přes průvodce
             *
             * @returns {Forms.Form} formulář
             */
            function UserSettingUctUpo() {
                // upozornění: defaulty musí být stejné jako v místě použití
                let form = new Gordic.Forms.Form({ name: "UctUpoSettingsForm", tabOptions: { title: "jres:24100210", opened: false } }) //RC 24100210 : Účtování
                    //.addRow("").addField("gcheck", {
                    //    name: "UctWizardWarning",
                    //    label: "Varovat před účtováním více pohybů přes průvodce",
                    //    model: "Global.Fuc.AppSettings.UctUpoSettingsForm.UctWizardWarning=value",
                    //    //tooltip: "Varovat před účtováním více pohybů přes průvodce",
                    //    initialValue: true,
                    //    emptyValue: true,
                    //    defaultValue: true,
                    //    //,change: function (ev, changeObj) {
                    //    //    let newValue: boolean;
                    //    //    newValue = (changeObj.value === true);
                    //    //    $(ev.currentTarget).findFields("UctWizardMaxCount").gfield("option", "disabled", !newValue);
                    //    //}
                    //    customClass: "userSettings-saveWithoutNotice"
                    //})
                    // TODO: možnost automatického přeskočení druhého kroku v průvodci účtování - v průvodci ještě nefunguje, tak zatím zakomentováno
                    .addRow()
                    .addField("gcheck", {
                    name: "UctWizardStep02",
                    label: "jres:24100373", //RC 24100373 : Přeskakovat fázi přípravy účetních zápisů
                    model: "Global.Fuc.AppSettings.UctUpoSettingsForm.UctWizardStep02=value",
                    tooltip: "jres:24100374", //RC 24100374 : po stisku tlačítka Další v kroku Zadání přejít hned na krok Zaúčtování
                    initialValue: true,
                    emptyValue: true,
                    defaultValue: true,
                    customClass: "userSettings-saveWithoutNotice"
                })
                    .addRow({
                    label: "jres:24100308", //RC 24100308 : Maximální počet pohybů pro průvodce
                    hint: "jres:24100309" //RC 24100309 : Doporučený maximální počet pohybů účtovaných přes průvodce
                })
                    .addField("gnumberbox", {
                    name: "UctWizardMaxCount",
                    thousandsSeparator: ' ',
                    fixed: false,
                    returnType: "number",
                    step: 10,
                    minValue: 0,
                    initialValue: 100,
                    defaultValue: 100,
                    emptyValue: 100,
                    //tooltip: "Maximální počet záznamů",
                    model: "Global.Fuc.AppSettings.UctUpoSettingsForm.UctWizardMaxCount=value",
                    //disabled: true
                    //customClass: "userSettings-saveWithoutNotice"
                });
                return form;
            }
            AppSettings.UserSettingUctUpo = UserSettingUctUpo;
            /**
             * Definice formuláře do uživatelského nastavení pohybů
             *
             * @returns {Forms.Form} formulář
             */
            function UserSettingUpo() {
                // upozornění: defaulty musí být stejné jako v místě použití
                let form = new Gordic.Forms.Form({ name: "UpoSettingsForm", tabOptions: { title: "Pohyby případů", opened: false } })
                    .addRow()
                    .addField("gcheck", {
                    name: "DetailFlashPrizDdWarning",
                    label: "jres:24100364", //RC 24100364 : Zobrazit varování, pokud je na pohybu chybně nastaven příznak daňového pohybu
                    model: "Global.Fuc.AppSettings.UpoSettingsForm.DetailFlashPrizDdWarning=value",
                    initialValue: true,
                    emptyValue: true,
                    defaultValue: true,
                    customClass: "userSettings-saveWithoutNotice"
                });
                return GetFucSharedUserSettingsForm(form);
            }
            AppSettings.UserSettingUpo = UserSettingUpo;
            /**
             * Vrátí formulář se sdíleným uživatelským nastavením agendy FUC
             *
             * @param {Forms.Form} [form] formulář (pokud není zadán, bude vytvořen)
             * @returns {Forms.Form} formulář se sdíleným uživatelským nastavením agendy FUC
             */
            function GetFucSharedUserSettingsForm(form) {
                return (form ?? new Gordic.Forms.Form({ name: "FucSharedSettingsForm", tabOptions: { title: "Agenda FUC", opened: false } }))
                    .addRow()
                    .addField("gcheck", {
                    name: "PrefabKtgUpoWithNumber",
                    label: "jres:24100365", //RC 24100365 : U kategorie pohybu zobrazovat kromě názvu i číslo
                    model: "Global.Eko.AppSettings.FucSettingsForm.PrefabKtgUpoWithNumber=value",
                    initialValue: false,
                    emptyValue: false,
                    defaultValue: false,
                    customClass: "userSettings-saveWithoutNotice"
                });
            }
            AppSettings.GetFucSharedUserSettingsForm = GetFucSharedUserSettingsForm;
        })(AppSettings = Fuc.AppSettings || (Fuc.AppSettings = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Z1Y1VzZXJTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdGdWNVc2VyU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTRLZjtBQTVLRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0S25CO0lBNUtnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFdBQVcsQ0E0Sy9CO1FBNUtvQixXQUFBLFdBQVc7WUFFNUI7Ozs7O2VBS0c7WUFFSDs7Ozs7ZUFLRztZQUNILFNBQWdCLGlCQUFpQixDQUFDLFdBQW1CO2dCQUVqRCxPQUFPO29CQUNILDZDQUE2QztvQkFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUU7b0JBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLDBCQUEwQixFQUFFO29CQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRTtvQkFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDO29CQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRTtvQkFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUU7b0JBQ3RDLG1EQUFtRDtvQkFDbkQsb0JBQW9CLEVBQUU7b0JBQ3RCLGlCQUFpQixFQUFFO29CQUNuQixjQUFjLEVBQUU7aUJBQ25CLENBQUM7WUFDTixDQUFDO1lBZmUsNkJBQWlCLG9CQWVoQyxDQUFBO1lBRUQ7Ozs7ZUFJRztZQUNILFNBQWdCLG9CQUFvQjtnQkFFaEMsNERBQTREO2dCQUM1RCxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsTUFB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NkY7b0JBQ3JILEtBQUssRUFBRSx1RUFBdUU7b0JBQzlFLFlBQVksRUFBRSxJQUFJO29CQUNsQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsWUFBWSxFQUFFLElBQUk7b0JBQ2xCLFdBQVcsRUFBRSxnQ0FBZ0M7aUJBQ2hELENBQUMsQ0FBQztnQkFFUCxPQUFPLDRCQUE0QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLENBQUM7WUFoQmUsMEJBQWMsaUJBZ0I3QixDQUFBO1lBRUQ7Ozs7O2VBS0c7WUFDSCxTQUFnQiw0QkFBNEIsQ0FBQyxJQUFpQjtnQkFFMUQsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFTLENBQUMsQ0FBQztxQkFDL0gsTUFBTSxFQUFFO3FCQUNSLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0JBQ2hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLEtBQUssRUFBRSxlQUFlLEVBQUUsaUVBQWlFO29CQUN6RixLQUFLLEVBQUUscUVBQXFFO29CQUM1RSxZQUFZLEVBQUUsS0FBSztvQkFDbkIsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLFlBQVksRUFBRSxLQUFLO29CQUNuQixXQUFXLEVBQUUsZ0NBQWdDO2lCQUNoRCxDQUFDLENBQUM7WUFDWCxDQUFDO1lBYmUsd0NBQTRCLCtCQWEzQyxDQUFBO1FBRUwsQ0FBQyxFQTVLb0IsV0FBVyxHQUFYLGVBQVcsS0FBWCxlQUFXLFFBNEsvQjtJQUFELENBQUMsRUE1S2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTRLbkI7QUFBRCxDQUFDLEVBNUtTLE1BQU0sS0FBTixNQUFNLFFBNEtmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5GdWMuQXBwU2V0dGluZ3Mge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtXHJcbiAgICAgKlxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gQm/EjWVrXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC4zNFxyXG4gICAgICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmljZSBmb3JtdWzDocWZxa8gcHJvIHXFvml2YXRlbHNrw6kgbmFzdGF2ZW7DrVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ2luX2dlbl9peHAgYWt0dcOhbG7DrSBob2Rub3RhIHBhcmFtZXRydSBhdXRvbWF0aWNrw6lobyBnZW5lcm92w6Fuw60gaWRlbnRpZmlrw6F0b3J1IChnaW5fZ2VuX2l4cClcclxuICAgICAqIEByZXR1cm5zIHtGb3Jtcy5Gb3JtW119IGZvcm11bMOhxZllXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBMaXN0c1NldHRpbmdzRm9ybShnaW5fZ2VuX2l4cDogc3RyaW5nKTogRm9ybXMuRm9ybVtdIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgLy8gc3RhbmRhcmRuw60gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtIFdGTCBhIEVLT1xyXG4gICAgICAgICAgICBHb3JkaWMuUmVwb3J0LldlYkNsaWVudC5HUmVwb3J0c1VzZXJTZXR0aW5ncygpLFxyXG4gICAgICAgICAgICBHb3JkaWMuV2ZsLkFwcFNldHRpbmdzLkF0dGFjaG1lbnRPcGVuU2V0dGluZ3NGb3JtKCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuQXBwU2V0dGluZ3MuQ29sb3JQaWNrZXJTZXR0aW5nc0Zvcm0oKSxcclxuICAgICAgICAgICAgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NQaWQoZ2luX2dlbl9peHApLFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLkVrb1VzZXJTZXR0aW5nc0Vrb0Jvb2soKSxcclxuICAgICAgICAgICAgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NMaXN0KCksXHJcbiAgICAgICAgICAgIC8vIGRhbMWhw60gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtIHNwZWNpZmlja8OpIHBybyBtb2R1bFxyXG4gICAgICAgICAgICBVc2VyU2V0dGluZ0Rhc2hib2FyZCgpLFxyXG4gICAgICAgICAgICBVc2VyU2V0dGluZ1VjdFVwbygpLFxyXG4gICAgICAgICAgICBVc2VyU2V0dGluZ1VwbygpXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluaWNlIGZvcm11bMOhxZllIGRvIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtIHBybyDDunZvZG7DrSBvYnJhem92a3VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX0gZm9ybXVsw6HFmVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVXNlclNldHRpbmdEYXNoYm9hcmQoKTogRm9ybXMuRm9ybSB7XHJcblxyXG4gICAgICAgIC8vIHVwb3pvcm7Em27DrTogZGVmYXVsdHkgbXVzw60gYsO9dCBzdGVqbsOpIGpha28gdiBtw61zdMSbIHBvdcW+aXTDrVxyXG4gICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJEYXNoYm9hcmRTZXR0aW5nc0Zvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJqcmVzOjI0MTAwMzcxXCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIGFueSkgLy9SQyAyNDEwMDM3MSA6IMOadm9kbsOtIG9icmF6b3ZrYVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiVXNlRmF2b3JpdGVGaWx0ZXJcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MjQxMDAzNzJcIiwgLy9SQyAyNDEwMDM3MiA6IE5hIMO6dm9kbsOtIG9icmF6b3ZjZSB6b2JyYXpvdmF0IHBvxI10eSB6w6F6bmFtxa8gcG9kbGUgb2Jsw61iZW7DvWNoIGZpbHRyxa9cclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5GdWMuQXBwU2V0dGluZ3MuRGFzaGJvYXJkU2V0dGluZ3NGb3JtLlVzZUZhdm9yaXRlRmlsdGVyPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjQxMDAzNzVcIiwgLy9SQyAyNDEwMDM3NSA6IHBvdXplIHBybyBwb8SNdHkgesOhem5hbcWvIHZlIHNrdXBpbsSbIMOaxI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmljZSBmb3JtdWzDocWZZSBkbyB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrSBwcm8gbWF4aW3DoWxuw60gcG/EjWV0IHBvaHlixa8gw7rEjXRvdmFuw71jaCBwxZllcyBwcsWvdm9kY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX0gZm9ybXVsw6HFmVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gVXNlclNldHRpbmdVY3RVcG8oKTogRm9ybXMuRm9ybSB7XHJcblxyXG4gICAgICAgIC8vIHVwb3pvcm7Em27DrTogZGVmYXVsdHkgbXVzw60gYsO9dCBzdGVqbsOpIGpha28gdiBtw61zdMSbIHBvdcW+aXTDrVxyXG4gICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJVY3RVcG9TZXR0aW5nc0Zvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJqcmVzOjI0MTAwMjEwXCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIGFueSkgLy9SQyAyNDEwMDIxMCA6IMOaxI10b3bDoW7DrVxyXG4gICAgICAgICAgICAvLy5hZGRSb3coXCJcIikuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcIlVjdFdpemFyZFdhcm5pbmdcIixcclxuICAgICAgICAgICAgLy8gICAgbGFiZWw6IFwiVmFyb3ZhdCBwxZllZCDDusSNdG92w6Fuw61tIHbDrWNlIHBvaHlixa8gcMWZZXMgcHLFr3ZvZGNlXCIsXHJcbiAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcIkdsb2JhbC5GdWMuQXBwU2V0dGluZ3MuVWN0VXBvU2V0dGluZ3NGb3JtLlVjdFdpemFyZFdhcm5pbmc9dmFsdWVcIixcclxuICAgICAgICAgICAgLy8gICAgLy90b29sdGlwOiBcIlZhcm92YXQgcMWZZWQgw7rEjXRvdsOhbsOtbSB2w61jZSBwb2h5YsWvIHDFmWVzIHByxa92b2RjZVwiLFxyXG4gICAgICAgICAgICAvLyAgICBpbml0aWFsVmFsdWU6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgIGVtcHR5VmFsdWU6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgLy8sY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAvLyAgICAvLyAgICBsZXQgbmV3VmFsdWU6IGJvb2xlYW47XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIG5ld1ZhbHVlID0gKGNoYW5nZU9iai52YWx1ZSA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgICQoZXYuY3VycmVudFRhcmdldCkuZmluZEZpZWxkcyhcIlVjdFdpemFyZE1heENvdW50XCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICFuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8vICAgIC8vfVxyXG4gICAgICAgICAgICAvLyAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG1vxb5ub3N0IGF1dG9tYXRpY2vDqWhvIHDFmWVza2/EjWVuw60gZHJ1aMOpaG8ga3Jva3UgdiBwcsWvdm9kY2kgw7rEjXRvdsOhbsOtIC0gdiBwcsWvdm9kY2kgamXFoXTEmyBuZWZ1bmd1amUsIHRhayB6YXTDrW0gemFrb21lbnRvdsOhbm9cclxuICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlVjdFdpemFyZFN0ZXAwMlwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczoyNDEwMDM3M1wiLCAvL1JDIDI0MTAwMzczIDogUMWZZXNrYWtvdmF0IGbDoXppIHDFmcOtcHJhdnkgw7rEjWV0bsOtY2ggesOhcGlzxa9cclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5GdWMuQXBwU2V0dGluZ3MuVWN0VXBvU2V0dGluZ3NGb3JtLlVjdFdpemFyZFN0ZXAwMj12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjI0MTAwMzc0XCIsIC8vUkMgMjQxMDAzNzQgOiBwbyBzdGlza3UgdGxhxI3DrXRrYSBEYWzFocOtIHYga3Jva3UgWmFkw6Fuw60gcMWZZWrDrXQgaG5lZCBuYSBrcm9rIFphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyh7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwMzA4XCIsIC8vUkMgMjQxMDAzMDggOiBNYXhpbcOhbG7DrSBwb8SNZXQgcG9oeWLFryBwcm8gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICBoaW50OiBcImpyZXM6MjQxMDAzMDlcIiAvL1JDIDI0MTAwMzA5IDogRG9wb3J1xI1lbsO9IG1heGltw6FsbsOtIHBvxI1ldCBwb2h5YsWvIMO6xI10b3ZhbsO9Y2ggcMWZZXMgcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJVY3RXaXphcmRNYXhDb3VudFwiLFxyXG4gICAgICAgICAgICAgICAgdGhvdXNhbmRzU2VwYXJhdG9yOiAnICcsXHJcbiAgICAgICAgICAgICAgICBmaXhlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICByZXR1cm5UeXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgc3RlcDogMTAsXHJcbiAgICAgICAgICAgICAgICBtaW5WYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMTAwLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwiTWF4aW3DoWxuw60gcG/EjWV0IHrDoXpuYW3Fr1wiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLkZ1Yy5BcHBTZXR0aW5ncy5VY3RVcG9TZXR0aW5nc0Zvcm0uVWN0V2l6YXJkTWF4Q291bnQ9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgIC8vZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidXNlclNldHRpbmdzLXNhdmVXaXRob3V0Tm90aWNlXCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gVE9ETzogdmxhc3Ruw60gbmFzdGF2ZW7DrSBwcm8gc2V6bmFteSDDusSNdG92w6Fuw60gc2UgbmVwb3XFvsOtdsOhLCBwcm90b8W+ZSBwYWsgc2UgbmV2b2xhasOtIG1ldG9keSBuYSB6bcSbbnUgcnEgYSBqc291IMWhcGF0bsSbIGZpbHRyeVxyXG4gICAgICAgICAgICAvLy5hZGRSb3coKVxyXG4gICAgICAgICAgICAvLy5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiVWN0Tm9Mb25nTGlzdFdhcm5pbmdcIixcclxuICAgICAgICAgICAgLy8gICAgbGFiZWw6IFwiTmV2YXJvdmF0IHDFmWVkIG5hxI10ZW7DrW0gZGxvdWjDqWhvIHNlem5hbXUgdSBwb2h5YsWvIG5lYm8gc291cGlzZWsgdiDDumxvaMOhY2ggw5rEjXRvdsOhbsOtXCIsXHJcbiAgICAgICAgICAgIC8vICAgIG1vZGVsOiBcIkdsb2JhbC5GdWMuQXBwU2V0dGluZ3MuVWN0VXBvU2V0dGluZ3NGb3JtLlVjdE5vTG9uZ0xpc3RXYXJuaW5nPXZhbHVlXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGluaXRpYWxWYWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgZW1wdHlWYWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICBjdXN0b21DbGFzczogXCJ1c2VyU2V0dGluZ3Mtc2F2ZVdpdGhvdXROb3RpY2VcIlxyXG4gICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmljZSBmb3JtdWzDocWZZSBkbyB1xb5pdmF0ZWxza8OpaG8gbmFzdGF2ZW7DrSBwb2h5YsWvXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Zvcm1zLkZvcm19IGZvcm11bMOhxZlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFVzZXJTZXR0aW5nVXBvKCk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgICAgICAvLyB1cG96b3JuxJtuw606IGRlZmF1bHR5IG11c8OtIGLDvXQgc3Rlam7DqSBqYWtvIHYgbcOtc3TEmyBwb3XFvml0w61cclxuICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiVXBvU2V0dGluZ3NGb3JtXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwiUG9oeWJ5IHDFmcOtcGFkxa9cIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KVxyXG4gICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiRGV0YWlsRmxhc2hQcml6RGRXYXJuaW5nXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwMzY0XCIsIC8vUkMgMjQxMDAzNjQgOiBab2JyYXppdCB2YXJvdsOhbsOtLCBwb2t1ZCBqZSBuYSBwb2h5YnUgY2h5Ym7EmyBuYXN0YXZlbiBwxZnDrXpuYWsgZGHFiG92w6lobyBwb2h5YnVcclxuICAgICAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5GdWMuQXBwU2V0dGluZ3MuVXBvU2V0dGluZ3NGb3JtLkRldGFpbEZsYXNoUHJpekRkV2FybmluZz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gR2V0RnVjU2hhcmVkVXNlclNldHRpbmdzRm9ybShmb3JtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZyw6F0w60gZm9ybXVsw6HFmSBzZSBzZMOtbGVuw71tIHXFvml2YXRlbHNrw71tIG5hc3RhdmVuw61tIGFnZW5keSBGVUNcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtGb3Jtcy5Gb3JtfSBbZm9ybV0gZm9ybXVsw6HFmSAocG9rdWQgbmVuw60gemFkw6FuLCBidWRlIHZ5dHZvxZllbilcclxuICAgICAqIEByZXR1cm5zIHtGb3Jtcy5Gb3JtfSBmb3JtdWzDocWZIHNlIHNkw61sZW7DvW0gdcW+aXZhdGVsc2vDvW0gbmFzdGF2ZW7DrW0gYWdlbmR5IEZVQ1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0RnVjU2hhcmVkVXNlclNldHRpbmdzRm9ybShmb3JtPzogRm9ybXMuRm9ybSk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgICAgICByZXR1cm4gKGZvcm0gPz8gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJGdWNTaGFyZWRTZXR0aW5nc0Zvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJBZ2VuZGEgRlVDXCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIGFueSkpXHJcbiAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJQcmVmYWJLdGdVcG9XaXRoTnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjI0MTAwMzY1XCIsIC8vUkMgMjQxMDAzNjUgOiBVIGthdGVnb3JpZSBwb2h5YnUgem9icmF6b3ZhdCBrcm9txJsgbsOhenZ1IGkgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLkVrby5BcHBTZXR0aW5ncy5GdWNTZXR0aW5nc0Zvcm0uUHJlZmFiS3RnVXBvV2l0aE51bWJlcj12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVzZXJTZXR0aW5ncy1zYXZlV2l0aG91dE5vdGljZVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=