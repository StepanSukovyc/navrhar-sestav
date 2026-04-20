"use strict";
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
        var AppSettings;
        (function (AppSettings) {
            /**
             * Uzivatelske nastaveni
             *
             * @author K.Kratochvil
             * */
            AppSettings.appPath = "Global.Eko.AppSettings";
            /**
             * Definice formularu na contentu uzivatelskeho rozhrani
             *
             * @param {string} povolitGenerovaniPiduDokladu aktuální hodnota parametru automatického generování identifikátoru (gin_gen_ixp)
             * @returns {Forms.Form[]} pole formularu
             * */
            function ListFormsSettings(povolitGenerovaniPiduDokladu) {
                return [
                    Gordic.Eko.Utils.EkoUserSettingsPid(povolitGenerovaniPiduDokladu),
                    Gordic.Eko.Utils.EkoUserSettingsEkoBook(), // EkoBookSettingsForm.StateInfo
                    Gordic.Wfl.AppSettings.ColorPickerSettingsForm(),
                    Gordic.Eko.Utils.EkoUserSettingsList(),
                    Gordic.Roz.AppSettings.RozUserSettingsVolby(),
                ];
            }
            AppSettings.ListFormsSettings = ListFormsSettings;
            /**
             * Formular voleb
             * @returns {Forms.Form} vytvoreny formular
             */
            function RozUserSettingsVolby() {
                return new Gordic.Forms.Form({ name: "RozSettingsForm", tabOptions: { title: "jres:30150136", opened: false } }) //RC 30150136 : Volby detailu
                    .addRow("jres:30250064").addField("gselectbox", {
                    name: "ROZZobrazeniStavu",
                    list: true,
                    itemTemplate: "{text}",
                    initialValue: { stavzobrazit: "3" },
                    data: new Gordic.Data.View([
                        { text: "jres:30250054", stavzobrazit: "0" }, //RC 30250054 : Pouze stav účtu
                        { text: "jres:30250055", stavzobrazit: "1" }, //RC 30250055 : Stav účtu a všechny nazaúčtované položky
                        { text: "jres:30250056", stavzobrazit: "2" }, //RC 30250056 : Stav účtu a nazaúčtované položky dokladu
                        { text: "jres:30150051", stavzobrazit: "3" }, //RC 30150051 : Stav dokladu
                    ], { key: "stavzobrazit" }),
                    model: AppSettings.appPath + ".RozSettingsForm.ZobrazeniStavu=value.stavzobrazit"
                })
                    .addRow("jres:30250063").addField("gselectbox", {
                    name: "ROZDatumDokladu",
                    list: true,
                    tooltip: "jres:30250063", //RC 30250063 : Předvyplnění datumu účtování na dokladu
                    itemTemplate: "{text}",
                    emptyValue: null,
                    initialValue: { stavzobrazit: 0 },
                    data: new Gordic.Data.View([
                        { text: "jres:30250058", datumDokladu: 0 }, //RC 30250058 : Nepředvyplňovat
                        { text: "jres:30250059", datumDokladu: 1 }, //RC 30250059 : Předplnit aktuálním datumem
                        { text: "jres:30250060", datumDokladu: 2 }, //RC 30250060 : Předplnit nejnižší otevřený měsíc
                        { text: "jres:30250061", datumDokladu: 3 }, //RC 30250061 : Předplnit nejvyšší otevřený měsíc
                    ], { key: "datumDokladu" }),
                    model: AppSettings.appPath + ".RozSettingsForm.DatumDokladu=value.datumDokladu"
                })
                    // Kde zobrazit porizovac - nazev v settings PolozkyView
                    .addRow("jres:30150137") //RC 30150137 : Zobrazení položek
                    .addField("gselectbox", {
                    name: "RozPolozkyZobrazeni",
                    list: true,
                    tooltip: "jres:30150144", //RC 30150144 : Umístění položek dokladu
                    itemTemplate: "{text}",
                    emptyValue: null,
                    initialValue: { polozkyView: EGPolozkyView.Zalozka },
                    data: new Gordic.Data.View([
                        { text: "jres:30150138", polozkyView: EGPolozkyView.Zalozka }, //RC 30150138 : V samostatné záložce
                        { text: "jres:30150139", polozkyView: EGPolozkyView.Tab }, //RC 30150139 : Pod záložkou Základní údaje
                    ], { key: "polozkyView" }),
                    model: AppSettings.appPath + ".RozSettingsForm.PolozkyView=value.polozkyView"
                });
            }
            AppSettings.RozUserSettingsVolby = RozUserSettingsVolby;
            let EGPolozkyView;
            (function (EGPolozkyView) {
                /** Zobrazi porizovac na samostatne zalozce */
                EGPolozkyView[EGPolozkyView["Zalozka"] = 0] = "Zalozka";
                /** Zobrazi porizovac na tabu Zakladni udaje */
                EGPolozkyView[EGPolozkyView["Tab"] = 1] = "Tab";
            })(EGPolozkyView = AppSettings.EGPolozkyView || (AppSettings.EGPolozkyView = {}));
            ;
        })(AppSettings = Roz.AppSettings || (Roz.AppSettings = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvelVzZXJTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdSb3pVc2VyU2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQXdGZjtBQXhGRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3Rm5CO0lBeEZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFdBQVcsQ0F3Ri9CO1FBeEZvQixXQUFBLFdBQVc7WUFFNUI7Ozs7aUJBSUs7WUFFUSxtQkFBTyxHQUFHLHdCQUF3QixDQUFDO1lBRWhEOzs7OztpQkFLSztZQUNMLFNBQWdCLGlCQUFpQixDQUFDLDRCQUFvQztnQkFDbEUsT0FBTztvQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQztvQkFDakUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxnQ0FBZ0M7b0JBQzNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFO29CQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRTtvQkFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUU7aUJBQ2hELENBQUM7WUFDTixDQUFDO1lBUmUsNkJBQWlCLG9CQVFoQyxDQUFBO1lBRUQ7OztlQUdHO1lBQ0gsU0FBZ0Isb0JBQW9CO2dCQUVoQyxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQWtCLENBQUMsQ0FBQyw2QkFBNkI7cUJBRXpKLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO29CQUM1QyxJQUFJLEVBQUUsbUJB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VyxhQUFhLEdBQWIseUJBQWEsS0FBYix5QkFBYSxRQUt4QjtZQUFBLENBQUM7UUFDTixDQUFDLEVBeEZvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUF3Ri9CO0lBQUQsQ0FBQyxFQXhGZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBd0ZuQjtBQUFELENBQUMsRUF4RlMsTUFBTSxLQUFOLE1BQU0sUUF3RmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlJvei5BcHBTZXR0aW5ncyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVeml2YXRlbHNrZSBuYXN0YXZlbmlcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBLLktyYXRvY2h2aWxcclxuICAgICAqICovXHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IGFwcFBhdGggPSBcIkdsb2JhbC5Fa28uQXBwU2V0dGluZ3NcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluaWNlIGZvcm11bGFydSBuYSBjb250ZW50dSB1eml2YXRlbHNrZWhvIHJvemhyYW5pXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwb3ZvbGl0R2VuZXJvdmFuaVBpZHVEb2tsYWR1IGFrdHXDoWxuw60gaG9kbm90YSBwYXJhbWV0cnUgYXV0b21hdGlja8OpaG8gZ2VuZXJvdsOhbsOtIGlkZW50aWZpa8OhdG9ydSAoZ2luX2dlbl9peHApXHJcbiAgICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybVtdfSBwb2xlIGZvcm11bGFydSBcclxuICAgICAqICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gTGlzdEZvcm1zU2V0dGluZ3MocG92b2xpdEdlbmVyb3ZhbmlQaWR1RG9rbGFkdTogc3RyaW5nKTogRm9ybXMuRm9ybVtdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLkVrb1VzZXJTZXR0aW5nc1BpZChwb3ZvbGl0R2VuZXJvdmFuaVBpZHVEb2tsYWR1KSxcclxuICAgICAgICAgICAgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NFa29Cb29rKCksIC8vIEVrb0Jvb2tTZXR0aW5nc0Zvcm0uU3RhdGVJbmZvXHJcbiAgICAgICAgICAgIEdvcmRpYy5XZmwuQXBwU2V0dGluZ3MuQ29sb3JQaWNrZXJTZXR0aW5nc0Zvcm0oKSxcclxuICAgICAgICAgICAgR29yZGljLkVrby5VdGlscy5Fa29Vc2VyU2V0dGluZ3NMaXN0KCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5Sb3ouQXBwU2V0dGluZ3MuUm96VXNlclNldHRpbmdzVm9sYnkoKSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9ybXVsYXIgdm9sZWJcclxuICAgICAqIEByZXR1cm5zIHtGb3Jtcy5Gb3JtfSB2eXR2b3JlbnkgZm9ybXVsYXJcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJvelVzZXJTZXR0aW5nc1ZvbGJ5KCk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJSb3pTZXR0aW5nc0Zvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJqcmVzOjMwMTUwMTM2XCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIEdGb3JtT3B0aW9ucykgLy9SQyAzMDE1MDEzNiA6IFZvbGJ5IGRldGFpbHVcclxuXHJcbiAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDY0XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IC8vUkMgMzAyNTAwNjQgOiBab2JyYXplbsOtIHN0YXbFr1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJST1pab2JyYXplbmlTdGF2dVwiLFxyXG4gICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dGV4dH1cIixcclxuICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBzdGF2em9icmF6aXQ6IFwiM1wiIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcImpyZXM6MzAyNTAwNTRcIiwgc3RhdnpvYnJheml0OiBcIjBcIiB9LCAvL1JDIDMwMjUwMDU0IDogUG91emUgc3RhdiDDusSNdHVcclxuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDI1MDA1NVwiLCBzdGF2em9icmF6aXQ6IFwiMVwiIH0sIC8vUkMgMzAyNTAwNTUgOiBTdGF2IMO6xI10dSBhIHbFoWVjaG55IG5hemHDusSNdG92YW7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJqcmVzOjMwMjUwMDU2XCIsIHN0YXZ6b2JyYXppdDogXCIyXCIgfSwgLy9SQyAzMDI1MDA1NiA6IFN0YXYgw7rEjXR1IGEgbmF6YcO6xI10b3ZhbsOpIHBvbG/Fvmt5IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDE1MDA1MVwiLCBzdGF2em9icmF6aXQ6IFwiM1wiIH0sIC8vUkMgMzAxNTAwNTEgOiBTdGF2IGRva2xhZHVcclxuICAgICAgICAgICAgICAgIF0sIHsga2V5OiBcInN0YXZ6b2JyYXppdFwiIH0pLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6IGFwcFBhdGggKyBcIi5Sb3pTZXR0aW5nc0Zvcm0uWm9icmF6ZW5pU3RhdnU9dmFsdWUuc3RhdnpvYnJheml0XCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwNjNcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHsgLy9SQyAzMDI1MDA2MyA6IFDFmWVkdnlwbG7Em27DrSBkYXR1bXUgw7rEjXRvdsOhbsOtIG5hIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiUk9aRGF0dW1Eb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwMDYzXCIsIC8vUkMgMzAyNTAwNjMgOiBQxZllZHZ5cGxuxJtuw60gZGF0dW11IMO6xI10b3bDoW7DrSBuYSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCIsXHJcbiAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IHN0YXZ6b2JyYXppdDogMCB9LCBcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDI1MDA1OFwiLCBkYXR1bURva2xhZHU6IDAgfSwgLy9SQyAzMDI1MDA1OCA6IE5lcMWZZWR2eXBsxYhvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcImpyZXM6MzAyNTAwNTlcIiwgZGF0dW1Eb2tsYWR1OiAxIH0sIC8vUkMgMzAyNTAwNTkgOiBQxZllZHBsbml0IGFrdHXDoWxuw61tIGRhdHVtZW1cclxuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6IFwianJlczozMDI1MDA2MFwiLCBkYXR1bURva2xhZHU6IDIgfSwgLy9SQyAzMDI1MDA2MCA6IFDFmWVkcGxuaXQgbmVqbmnFvsWhw60gb3RldsWZZW7DvSBtxJtzw61jXHJcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiBcImpyZXM6MzAyNTAwNjFcIiwgZGF0dW1Eb2tsYWR1OiAzIH0sIC8vUkMgMzAyNTAwNjEgOiBQxZllZHBsbml0IG5lanZ5xaHFocOtIG90ZXbFmWVuw70gbcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgXSwgeyBrZXk6IFwiZGF0dW1Eb2tsYWR1XCIgfSksXHJcbiAgICAgICAgICAgICAgICBtb2RlbDogYXBwUGF0aCArIFwiLlJvelNldHRpbmdzRm9ybS5EYXR1bURva2xhZHU9dmFsdWUuZGF0dW1Eb2tsYWR1XCJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gS2RlIHpvYnJheml0IHBvcml6b3ZhYyAtIG5hemV2IHYgc2V0dGluZ3MgUG9sb3preVZpZXdcclxuICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAxNTAxMzdcIikgLy9SQyAzMDE1MDEzNyA6IFpvYnJhemVuw60gcG9sb8W+ZWtcclxuICAgICAgICAgICAgLmFkZEZpZWxkKFxyXG4gICAgICAgICAgICAgICAgXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiUm96UG9sb3preVpvYnJhemVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMTUwMTQ0XCIsIC8vUkMgMzAxNTAxNDQgOiBVbcOtc3TEm27DrSBwb2xvxb5layBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt0ZXh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IHBvbG96a3lWaWV3OiBFR1BvbG96a3lWaWV3LlphbG96a2EgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJqcmVzOjMwMTUwMTM4XCIsIHBvbG96a3lWaWV3OiBFR1BvbG96a3lWaWV3LlphbG96a2EgfSwgLy9SQyAzMDE1MDEzOCA6IFYgc2Ftb3N0YXRuw6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogXCJqcmVzOjMwMTUwMTM5XCIsIHBvbG96a3lWaWV3OiBFR1BvbG96a3lWaWV3LlRhYiB9LCAvL1JDIDMwMTUwMTM5IDogUG9kIHrDoWxvxb5rb3UgWsOha2xhZG7DrSDDumRhamVcclxuICAgICAgICAgICAgICAgICAgICBdLCB7IGtleTogXCJwb2xvemt5Vmlld1wiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBhcHBQYXRoICsgXCIuUm96U2V0dGluZ3NGb3JtLlBvbG96a3lWaWV3PXZhbHVlLnBvbG96a3lWaWV3XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZW51bSBFR1BvbG96a3lWaWV3IHtcclxuICAgICAgICAvKiogWm9icmF6aSBwb3Jpem92YWMgbmEgc2Ftb3N0YXRuZSB6YWxvemNlICovXHJcbiAgICAgICAgWmFsb3prYSA9IDAsXHJcbiAgICAgICAgLyoqIFpvYnJhemkgcG9yaXpvdmFjIG5hIHRhYnUgWmFrbGFkbmkgdWRhamUgKi9cclxuICAgICAgICBUYWIgPSAxLCBcclxuICAgIH07XHJcbn0iXX0=