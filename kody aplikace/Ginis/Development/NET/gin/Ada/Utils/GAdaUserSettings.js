"use strict";
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
        var AppSettings;
        (function (AppSettings) {
            /**
             * Uživatelské nastavení
             *
             * @author Jiří Ileček
             * @since 486.1.0.1
             */
            /**
             * Definice formulářů pro uživatelské nastavení
             *
             * @returns {Forms.Form[]} formuláře
             */
            function ListsSettingsForm() {
                return [
                    // FucUserSettingsDashboard(),
                    // FucUserSettingsDetail(),
                    Gordic.Eko.Utils.UserSettingsList("Global.Ada.AppSettings")
                    //FucUserSettingsOptions()
                ];
            }
            AppSettings.ListsSettingsForm = ListsSettingsForm;
            /**
             * Definice formuláře pro úvodní stránku
             *
             * @returns {Forms.Form} formulář
             */
            //export function FucUserSettingsDashboard(): Forms.Form {
            //    let form = new Gordic.Forms.Form({ name: "FucSettingsForm", tabOptions: { title: "Úvodní stránka", opened: false } } as any)
            //        .addRow("Typ indikátorů").addField("gselectbox", { //RC 30250309 : Předvyplnění datumu účtování na dokladu
            //            name: "FucDashboardKPI",
            //            list: true,
            //            tooltip: "Typ indikátorů pro zobrazení počtu záznamů",
            //            itemTemplate: "{text}",
            //            emptyValue: null,
            //            initialValue: { dashboard_kpi: 0 },
            //            data: new Gordic.Data.View([
            //                { text: "velké", dashboard_kpi: 0 },
            //                { text: "malé", dashboard_kpi: 1 },
            //            ],
            //                { key: "dashboard_kpi" }
            //            ),
            //            model: "Global.Fuc.AppSettings.Dashboard.TypKPI=value.dashboard_kpi"
            //        })
            //        ;
            //    return form;
            //}
            /**
             * Definice formuláře pro úvodní stránku
             *
             * @returns {Forms.Form} formulář
             */
            //export function FucUserSettingsDetail(): Forms.Form {
            //    let form = new Gordic.Forms.Form({ name: "FucSettingsForm", tabOptions: { title: "Detaily", opened: false } } as any)
            //        .addRow("Zobrazení samostatných komponent").addField("gradio", {
            //            name: "test_komp",
            //            radios: [
            //                { value: 0, label: "všude, kde to jen jde" },
            //                { value: 1, label: "tabgroup" },
            //                { value: 2, label: "sidebar" },
            //                { value: 3, label: "samostatné okno" }
            //            ],
            //            emptyValue: 0,
            //            model: "Global.Fuc.AppSettings.Test.Komp=value",
            //            itemClass: "w-12"
            //            //disabled: true,
            //            //modelValueTransform: {
            //            //    apply: function (modelValue) { return (modelValue === null ? 2 : modelValue); },
            //            //    collect: function (fieldValue) { return (fieldValue == 2 ? null : fieldValue); }
            //            //}
            //        })
            //        ;
            //    return form;
            //}
            ///**
            // * Definice formuláře pro volby
            // * 
            // * @returns {Forms.Form} formulář
            // */
            //export function FucUserSettingsOptions(): Forms.Form {
            //    let form = new Gordic.Forms.Form({ name: "FucSettingsForm", tabOptions: { title: "Volby práce", opened: false } } as any)
            //        //.addRow("Režim zadávání pidu").addField("gselectbox", {
            //        //    name: "FucRezimZadavaniPidu",
            //        //    list: true,
            //        //    itemTemplate: "{text}",
            //        //    //emptyValue: null,
            //        //    initialValue: 1/*{ text: "Generování", sejmuti: "1" }*/,
            //        //    data: new Gordic.Data.View([
            //        //        { text: "Sejmutí štítku", sejmuti: 0 },
            //        //        { text: "Generování", sejmuti: 1 },
            //        //    ],
            //        //        { key: "sejmuti" }
            //        //    ),
            //        //    model: "Global.Fuc.AppSettings.Options.RezimZadavaniPidu=value"
            //        //})
            //        ;
            //    return form;
            //}
        })(AppSettings = Ada.AppSettings || (Ada.AppSettings = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FkYVVzZXJTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiVXRpbHMvR0FkYVVzZXJTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBZ0hmO0FBaEhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWdIbkI7SUFoSGdCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQWdIL0I7UUFoSG9CLFdBQUEsV0FBVztZQUU1Qjs7Ozs7ZUFLRztZQUVIOzs7O2VBSUc7WUFDSCxTQUFnQixpQkFBaUI7Z0JBRTdCLE9BQU87b0JBQ0gsOEJBQThCO29CQUM5QiwyQkFBMkI7b0JBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDO29CQUMzRCwwQkFBMEI7aUJBQzdCLENBQUM7WUFDTixDQUFDO1lBUmUsNkJBQWlCLG9CQVFoQyxDQUFBO1lBRUQ7Ozs7ZUFJRztZQUNILDBEQUEwRDtZQUUxRCxrSUFBa0k7WUFFbEksb0hBQW9IO1lBQ3BILHNDQUFzQztZQUN0Qyx5QkFBeUI7WUFDekIsb0VBQW9FO1lBQ3BFLHFDQUFxQztZQUNyQywrQkFBK0I7WUFDL0IsaURBQWlEO1lBQ2pELDBDQUEwQztZQUMxQyxzREFBc0Q7WUFDdEQscURBQXFEO1lBQ3JELGdCQUFnQjtZQUNoQiwwQ0FBMEM7WUFDMUMsZ0JBQWdCO1lBQ2hCLGtGQUFrRjtZQUNsRixZQUFZO1lBQ1osV0FBVztZQUVYLGtCQUFrQjtZQUNsQixHQUFHO1lBRUg7Ozs7ZUFJRztZQUNILHVEQUF1RDtZQUV2RCwySEFBMkg7WUFFM0gsMEVBQTBFO1lBQzFFLGdDQUFnQztZQUNoQyx1QkFBdUI7WUFDdkIsK0RBQStEO1lBQy9ELGtEQUFrRDtZQUNsRCxpREFBaUQ7WUFDakQsd0RBQXdEO1lBQ3hELGdCQUFnQjtZQUNoQiw0QkFBNEI7WUFDNUIsOERBQThEO1lBQzlELCtCQUErQjtZQUMvQiwrQkFBK0I7WUFDL0Isc0NBQXNDO1lBQ3RDLG9HQUFvRztZQUNwRyxvR0FBb0c7WUFDcEcsaUJBQWlCO1lBQ2pCLFlBQVk7WUFDWixXQUFXO1lBRVgsa0JBQWtCO1lBQ2xCLEdBQUc7WUFFSCxLQUFLO1lBQ0wsaUNBQWlDO1lBQ2pDLEtBQUs7WUFDTCxtQ0FBbUM7WUFDbkMsS0FBSztZQUNMLHdEQUF3RDtZQUV4RCwrSEFBK0g7WUFFL0gsbUVBQW1FO1lBQ25FLDZDQUE2QztZQUM3QywyQkFBMkI7WUFDM0IsdUNBQXVDO1lBQ3ZDLG1DQUFtQztZQUNuQyx3RUFBd0U7WUFDeEUsNENBQTRDO1lBQzVDLDJEQUEyRDtZQUMzRCx1REFBdUQ7WUFDdkQsa0JBQWtCO1lBQ2xCLHNDQUFzQztZQUN0QyxrQkFBa0I7WUFDbEIsK0VBQStFO1lBQy9FLGNBQWM7WUFDZCxXQUFXO1lBRVgsa0JBQWtCO1lBQ2xCLEdBQUc7UUFFUCxDQUFDLEVBaEhvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUFnSC9CO0lBQUQsQ0FBQyxFQWhIZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBZ0huQjtBQUFELENBQUMsRUFoSFMsTUFBTSxLQUFOLE1BQU0sUUFnSGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkFkYS5BcHBTZXR0aW5ncyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVxb5pdmF0ZWxza8OpIG5hc3RhdmVuw61cclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIEppxZnDrSBJbGXEjWVrICBcclxuICAgICAqIEBzaW5jZSA0ODYuMS4wLjFcclxuICAgICAqLyBcclxuICAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5pY2UgZm9ybXVsw6HFmcWvIHBybyB1xb5pdmF0ZWxza8OpIG5hc3RhdmVuw61cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge0Zvcm1zLkZvcm1bXX0gZm9ybXVsw6HFmWUgXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBMaXN0c1NldHRpbmdzRm9ybSgpOiBGb3Jtcy5Gb3JtW10geyBcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgLy8gRnVjVXNlclNldHRpbmdzRGFzaGJvYXJkKCksXHJcbiAgICAgICAgICAgIC8vIEZ1Y1VzZXJTZXR0aW5nc0RldGFpbCgpLFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLlVzZXJTZXR0aW5nc0xpc3QoXCJHbG9iYWwuQWRhLkFwcFNldHRpbmdzXCIpXHJcbiAgICAgICAgICAgIC8vRnVjVXNlclNldHRpbmdzT3B0aW9ucygpXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluaWNlIGZvcm11bMOhxZllIHBybyDDunZvZG7DrSBzdHLDoW5rdVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtGb3Jtcy5Gb3JtfSBmb3JtdWzDocWZXHJcbiAgICAgKi9cclxuICAgIC8vZXhwb3J0IGZ1bmN0aW9uIEZ1Y1VzZXJTZXR0aW5nc0Rhc2hib2FyZCgpOiBGb3Jtcy5Gb3JtIHtcclxuXHJcbiAgICAvLyAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiRnVjU2V0dGluZ3NGb3JtXCIsIHRhYk9wdGlvbnM6IHsgdGl0bGU6IFwiw5p2b2Ruw60gc3Ryw6Fua2FcIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KVxyXG5cclxuICAgIC8vICAgICAgICAuYWRkUm93KFwiVHlwIGluZGlrw6F0b3LFr1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgeyAvL1JDIDMwMjUwMzA5IDogUMWZZWR2eXBsbsSbbsOtIGRhdHVtdSDDusSNdG92w6Fuw60gbmEgZG9rbGFkdVxyXG4gICAgLy8gICAgICAgICAgICBuYW1lOiBcIkZ1Y0Rhc2hib2FyZEtQSVwiLFxyXG4gICAgLy8gICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgLy8gICAgICAgICAgICB0b29sdGlwOiBcIlR5cCBpbmRpa8OhdG9yxa8gcHJvIHpvYnJhemVuw60gcG/EjXR1IHrDoXpuYW3Fr1wiLFxyXG4gICAgLy8gICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCIsXHJcbiAgICAvLyAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAvLyAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBkYXNoYm9hcmRfa3BpOiAwIH0sXHJcbiAgICAvLyAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgIC8vICAgICAgICAgICAgICAgIHsgdGV4dDogXCJ2ZWxrw6lcIiwgZGFzaGJvYXJkX2twaTogMCB9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgeyB0ZXh0OiBcIm1hbMOpXCIsIGRhc2hib2FyZF9rcGk6IDEgfSxcclxuICAgIC8vICAgICAgICAgICAgXSxcclxuICAgIC8vICAgICAgICAgICAgICAgIHsga2V5OiBcImRhc2hib2FyZF9rcGlcIiB9XHJcbiAgICAvLyAgICAgICAgICAgICksXHJcbiAgICAvLyAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5GdWMuQXBwU2V0dGluZ3MuRGFzaGJvYXJkLlR5cEtQST12YWx1ZS5kYXNoYm9hcmRfa3BpXCJcclxuICAgIC8vICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgIDtcclxuXHJcbiAgICAvLyAgICByZXR1cm4gZm9ybTtcclxuICAgIC8vfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5pY2UgZm9ybXVsw6HFmWUgcHJvIMO6dm9kbsOtIHN0csOhbmt1XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Zvcm1zLkZvcm19IGZvcm11bMOhxZlcclxuICAgICAqL1xyXG4gICAgLy9leHBvcnQgZnVuY3Rpb24gRnVjVXNlclNldHRpbmdzRGV0YWlsKCk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgIC8vICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJGdWNTZXR0aW5nc0Zvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJEZXRhaWx5XCIsIG9wZW5lZDogZmFsc2UgfSB9IGFzIGFueSlcclxuXHJcbiAgICAvLyAgICAgICAgLmFkZFJvdyhcIlpvYnJhemVuw60gc2Ftb3N0YXRuw71jaCBrb21wb25lbnRcIikuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgLy8gICAgICAgICAgICBuYW1lOiBcInRlc3Rfa29tcFwiLFxyXG4gICAgLy8gICAgICAgICAgICByYWRpb3M6IFtcclxuICAgIC8vICAgICAgICAgICAgICAgIHsgdmFsdWU6IDAsIGxhYmVsOiBcInbFoXVkZSwga2RlIHRvIGplbiBqZGVcIiB9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6IFwidGFiZ3JvdXBcIiB9LFxyXG4gICAgLy8gICAgICAgICAgICAgICAgeyB2YWx1ZTogMiwgbGFiZWw6IFwic2lkZWJhclwiIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICB7IHZhbHVlOiAzLCBsYWJlbDogXCJzYW1vc3RhdG7DqSBva25vXCIgfVxyXG4gICAgLy8gICAgICAgICAgICBdLFxyXG4gICAgLy8gICAgICAgICAgICBlbXB0eVZhbHVlOiAwLFxyXG4gICAgLy8gICAgICAgICAgICBtb2RlbDogXCJHbG9iYWwuRnVjLkFwcFNldHRpbmdzLlRlc3QuS29tcD12YWx1ZVwiLFxyXG4gICAgLy8gICAgICAgICAgICBpdGVtQ2xhc3M6IFwidy0xMlwiXHJcbiAgICAvLyAgICAgICAgICAgIC8vZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgIC8vbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgLy8gICAgICAgICAgICAvLyAgICBhcHBseTogZnVuY3Rpb24gKG1vZGVsVmFsdWUpIHsgcmV0dXJuIChtb2RlbFZhbHVlID09PSBudWxsID8gMiA6IG1vZGVsVmFsdWUpOyB9LFxyXG4gICAgLy8gICAgICAgICAgICAvLyAgICBjb2xsZWN0OiBmdW5jdGlvbiAoZmllbGRWYWx1ZSkgeyByZXR1cm4gKGZpZWxkVmFsdWUgPT0gMiA/IG51bGwgOiBmaWVsZFZhbHVlKTsgfVxyXG4gICAgLy8gICAgICAgICAgICAvL31cclxuICAgIC8vICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgIDtcclxuXHJcbiAgICAvLyAgICByZXR1cm4gZm9ybTtcclxuICAgIC8vfVxyXG5cclxuICAgIC8vLyoqXHJcbiAgICAvLyAqIERlZmluaWNlIGZvcm11bMOhxZllIHBybyB2b2xieVxyXG4gICAgLy8gKiBcclxuICAgIC8vICogQHJldHVybnMge0Zvcm1zLkZvcm19IGZvcm11bMOhxZlcclxuICAgIC8vICovXHJcbiAgICAvL2V4cG9ydCBmdW5jdGlvbiBGdWNVc2VyU2V0dGluZ3NPcHRpb25zKCk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgIC8vICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJGdWNTZXR0aW5nc0Zvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCJWb2xieSBwcsOhY2VcIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KVxyXG5cclxuICAgIC8vICAgICAgICAvLy5hZGRSb3coXCJSZcW+aW0gemFkw6F2w6Fuw60gcGlkdVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgLy8gICAgICAgIC8vICAgIG5hbWU6IFwiRnVjUmV6aW1aYWRhdmFuaVBpZHVcIixcclxuICAgIC8vICAgICAgICAvLyAgICBsaXN0OiB0cnVlLFxyXG4gICAgLy8gICAgICAgIC8vICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dGV4dH1cIixcclxuICAgIC8vICAgICAgICAvLyAgICAvL2VtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAvLyAgICAgICAgLy8gICAgaW5pdGlhbFZhbHVlOiAxLyp7IHRleHQ6IFwiR2VuZXJvdsOhbsOtXCIsIHNlam11dGk6IFwiMVwiIH0qLyxcclxuICAgIC8vICAgICAgICAvLyAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAvLyAgICAgICAgLy8gICAgICAgIHsgdGV4dDogXCJTZWptdXTDrSDFoXTDrXRrdVwiLCBzZWptdXRpOiAwIH0sXHJcbiAgICAvLyAgICAgICAgLy8gICAgICAgIHsgdGV4dDogXCJHZW5lcm92w6Fuw61cIiwgc2VqbXV0aTogMSB9LFxyXG4gICAgLy8gICAgICAgIC8vICAgIF0sXHJcbiAgICAvLyAgICAgICAgLy8gICAgICAgIHsga2V5OiBcInNlam11dGlcIiB9XHJcbiAgICAvLyAgICAgICAgLy8gICAgKSxcclxuICAgIC8vICAgICAgICAvLyAgICBtb2RlbDogXCJHbG9iYWwuRnVjLkFwcFNldHRpbmdzLk9wdGlvbnMuUmV6aW1aYWRhdmFuaVBpZHU9dmFsdWVcIlxyXG4gICAgLy8gICAgICAgIC8vfSlcclxuICAgIC8vICAgICAgICA7XHJcblxyXG4gICAgLy8gICAgcmV0dXJuIGZvcm07XHJcbiAgICAvL31cclxuXHJcbn1cclxuIl19