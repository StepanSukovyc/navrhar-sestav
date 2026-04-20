"use strict";
var Gordic;
(function (Gordic) {
    var Bar;
    (function (Bar) {
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
                    Gordic.Eko.Utils.UserSettingsList("Global.Bar.AppSettings")
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
        })(AppSettings = Bar.AppSettings || (Bar.AppSettings = {}));
    })(Bar = Gordic.Bar || (Gordic.Bar = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0JhclVzZXJTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiVXRpbHMvR0JhclVzZXJTZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBZ0hmO0FBaEhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWdIbkI7SUFoSGdCLFdBQUEsR0FBRztRQUFDLElBQUEsV0FBVyxDQWdIL0I7UUFoSG9CLFdBQUEsV0FBVztZQUU1Qjs7Ozs7ZUFLRztZQUVIOzs7O2VBSUc7WUFDSCxTQUFnQixpQkFBaUI7Z0JBRTdCLE9BQU87b0JBQ0gsOEJBQThCO29CQUM5QiwyQkFBMkI7b0JBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDO29CQUMzRCwwQkFBMEI7aUJBQzdCLENBQUM7WUFDTixDQUFDO1lBUmUsNkJBQWlCLG9CQVFoQyxDQUFBO1lBRUQ7Ozs7ZUFJRztZQUNILDBEQUEwRDtZQUUxRCxrSUFBa0k7WUFFbEksb0hBQW9IO1lBQ3BILHNDQUFzQztZQUN0Qyx5QkFBeUI7WUFDekIsb0VBQW9FO1lBQ3BFLHFDQUFxQztZQUNyQywrQkFBK0I7WUFDL0IsaURBQWlEO1lBQ2pELDBDQUEwQztZQUMxQyxzREFBc0Q7WUFDdEQscURBQXFEO1lBQ3JELGdCQUFnQjtZQUNoQiwwQ0FBMEM7WUFDMUMsZ0JBQWdCO1lBQ2hCLGtGQUFrRjtZQUNsRixZQUFZO1lBQ1osV0FBVztZQUVYLGtCQUFrQjtZQUNsQixHQUFHO1lBRUg7Ozs7ZUFJRztZQUNILHVEQUF1RDtZQUV2RCwySEFBMkg7WUFFM0gsMEVBQTBFO1lBQzFFLGdDQUFnQztZQUNoQyx1QkFBdUI7WUFDdkIsK0RBQStEO1lBQy9ELGtEQUFrRDtZQUNsRCxpREFBaUQ7WUFDakQsd0RBQXdEO1lBQ3hELGdCQUFnQjtZQUNoQiw0QkFBNEI7WUFDNUIsOERBQThEO1lBQzlELCtCQUErQjtZQUMvQiwrQkFBK0I7WUFDL0Isc0NBQXNDO1lBQ3RDLG9HQUFvRztZQUNwRyxvR0FBb0c7WUFDcEcsaUJBQWlCO1lBQ2pCLFlBQVk7WUFDWixXQUFXO1lBRVgsa0JBQWtCO1lBQ2xCLEdBQUc7WUFFSCxLQUFLO1lBQ0wsaUNBQWlDO1lBQ2pDLEtBQUs7WUFDTCxtQ0FBbUM7WUFDbkMsS0FBSztZQUNMLHdEQUF3RDtZQUV4RCwrSEFBK0g7WUFFL0gsbUVBQW1FO1lBQ25FLDZDQUE2QztZQUM3QywyQkFBMkI7WUFDM0IsdUNBQXVDO1lBQ3ZDLG1DQUFtQztZQUNuQyx3RUFBd0U7WUFDeEUsNENBQTRDO1lBQzVDLDJEQUEyRDtZQUMzRCx1REFBdUQ7WUFDdkQsa0JBQWtCO1lBQ2xCLHNDQUFzQztZQUN0QyxrQkFBa0I7WUFDbEIsK0VBQStFO1lBQy9FLGNBQWM7WUFDZCxXQUFXO1lBRVgsa0JBQWtCO1lBQ2xCLEdBQUc7UUFFUCxDQUFDLEVBaEhvQixXQUFXLEdBQVgsZUFBVyxLQUFYLGVBQVcsUUFnSC9CO0lBQUQsQ0FBQyxFQWhIZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBZ0huQjtBQUFELENBQUMsRUFoSFMsTUFBTSxLQUFOLE1BQU0sUUFnSGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkJhci5BcHBTZXR0aW5ncyB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVxb5pdmF0ZWxza8OpIG5hc3RhdmVuw61cclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIEppxZnDrSBJbGXEjWVrXHJcbiAgICAgKiBAc2luY2UgNDg2LjEuMC4xXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluaWNlIGZvcm11bMOhxZnFryBwcm8gdcW+aXZhdGVsc2vDqSBuYXN0YXZlbsOtXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtGb3Jtcy5Gb3JtW119IGZvcm11bMOhxZllXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBMaXN0c1NldHRpbmdzRm9ybSgpOiBGb3Jtcy5Gb3JtW10ge1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAvLyBGdWNVc2VyU2V0dGluZ3NEYXNoYm9hcmQoKSxcclxuICAgICAgICAgICAgLy8gRnVjVXNlclNldHRpbmdzRGV0YWlsKCksXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uVXRpbHMuVXNlclNldHRpbmdzTGlzdChcIkdsb2JhbC5CYXIuQXBwU2V0dGluZ3NcIilcclxuICAgICAgICAgICAgLy9GdWNVc2VyU2V0dGluZ3NPcHRpb25zKClcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5pY2UgZm9ybXVsw6HFmWUgcHJvIMO6dm9kbsOtIHN0csOhbmt1XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0Zvcm1zLkZvcm19IGZvcm11bMOhxZlcclxuICAgICAqL1xyXG4gICAgLy9leHBvcnQgZnVuY3Rpb24gRnVjVXNlclNldHRpbmdzRGFzaGJvYXJkKCk6IEZvcm1zLkZvcm0ge1xyXG5cclxuICAgIC8vICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJGdWNTZXR0aW5nc0Zvcm1cIiwgdGFiT3B0aW9uczogeyB0aXRsZTogXCLDmnZvZG7DrSBzdHLDoW5rYVwiLCBvcGVuZWQ6IGZhbHNlIH0gfSBhcyBhbnkpXHJcblxyXG4gICAgLy8gICAgICAgIC5hZGRSb3coXCJUeXAgaW5kaWvDoXRvcsWvXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IC8vUkMgMzAyNTAzMDkgOiBQxZllZHZ5cGxuxJtuw60gZGF0dW11IMO6xI10b3bDoW7DrSBuYSBkb2tsYWR1XHJcbiAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiRnVjRGFzaGJvYXJkS1BJXCIsXHJcbiAgICAvLyAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgIHRvb2x0aXA6IFwiVHlwIGluZGlrw6F0b3LFryBwcm8gem9icmF6ZW7DrSBwb8SNdHUgesOhem5hbcWvXCIsXHJcbiAgICAvLyAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dGV4dH1cIixcclxuICAgIC8vICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgIC8vICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB7IGRhc2hib2FyZF9rcGk6IDAgfSxcclxuICAgIC8vICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgLy8gICAgICAgICAgICAgICAgeyB0ZXh0OiBcInZlbGvDqVwiLCBkYXNoYm9hcmRfa3BpOiAwIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICB7IHRleHQ6IFwibWFsw6lcIiwgZGFzaGJvYXJkX2twaTogMSB9LFxyXG4gICAgLy8gICAgICAgICAgICBdLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgeyBrZXk6IFwiZGFzaGJvYXJkX2twaVwiIH1cclxuICAgIC8vICAgICAgICAgICAgKSxcclxuICAgIC8vICAgICAgICAgICAgbW9kZWw6IFwiR2xvYmFsLkZ1Yy5BcHBTZXR0aW5ncy5EYXNoYm9hcmQuVHlwS1BJPXZhbHVlLmRhc2hib2FyZF9rcGlcIlxyXG4gICAgLy8gICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgO1xyXG5cclxuICAgIC8vICAgIHJldHVybiBmb3JtO1xyXG4gICAgLy99XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmljZSBmb3JtdWzDocWZZSBwcm8gw7p2b2Ruw60gc3Ryw6Fua3VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX0gZm9ybXVsw6HFmVxyXG4gICAgICovXHJcbiAgICAvL2V4cG9ydCBmdW5jdGlvbiBGdWNVc2VyU2V0dGluZ3NEZXRhaWwoKTogRm9ybXMuRm9ybSB7XHJcblxyXG4gICAgLy8gICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkZ1Y1NldHRpbmdzRm9ybVwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcIkRldGFpbHlcIiwgb3BlbmVkOiBmYWxzZSB9IH0gYXMgYW55KVxyXG5cclxuICAgIC8vICAgICAgICAuYWRkUm93KFwiWm9icmF6ZW7DrSBzYW1vc3RhdG7DvWNoIGtvbXBvbmVudFwiKS5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAvLyAgICAgICAgICAgIG5hbWU6IFwidGVzdF9rb21wXCIsXHJcbiAgICAvLyAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgLy8gICAgICAgICAgICAgICAgeyB2YWx1ZTogMCwgbGFiZWw6IFwidsWhdWRlLCBrZGUgdG8gamVuIGpkZVwiIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICB7IHZhbHVlOiAxLCBsYWJlbDogXCJ0YWJncm91cFwiIH0sXHJcbiAgICAvLyAgICAgICAgICAgICAgICB7IHZhbHVlOiAyLCBsYWJlbDogXCJzaWRlYmFyXCIgfSxcclxuICAgIC8vICAgICAgICAgICAgICAgIHsgdmFsdWU6IDMsIGxhYmVsOiBcInNhbW9zdGF0bsOpIG9rbm9cIiB9XHJcbiAgICAvLyAgICAgICAgICAgIF0sXHJcbiAgICAvLyAgICAgICAgICAgIGVtcHR5VmFsdWU6IDAsXHJcbiAgICAvLyAgICAgICAgICAgIG1vZGVsOiBcIkdsb2JhbC5GdWMuQXBwU2V0dGluZ3MuVGVzdC5Lb21wPXZhbHVlXCIsXHJcbiAgICAvLyAgICAgICAgICAgIGl0ZW1DbGFzczogXCJ3LTEyXCJcclxuICAgIC8vICAgICAgICAgICAgLy9kaXNhYmxlZDogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgICAgLy9tb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAvLyAgICAgICAgICAgIC8vICAgIGFwcGx5OiBmdW5jdGlvbiAobW9kZWxWYWx1ZSkgeyByZXR1cm4gKG1vZGVsVmFsdWUgPT09IG51bGwgPyAyIDogbW9kZWxWYWx1ZSk7IH0sXHJcbiAgICAvLyAgICAgICAgICAgIC8vICAgIGNvbGxlY3Q6IGZ1bmN0aW9uIChmaWVsZFZhbHVlKSB7IHJldHVybiAoZmllbGRWYWx1ZSA9PSAyID8gbnVsbCA6IGZpZWxkVmFsdWUpOyB9XHJcbiAgICAvLyAgICAgICAgICAgIC8vfVxyXG4gICAgLy8gICAgICAgIH0pXHJcbiAgICAvLyAgICAgICAgO1xyXG5cclxuICAgIC8vICAgIHJldHVybiBmb3JtO1xyXG4gICAgLy99XHJcblxyXG4gICAgLy8vKipcclxuICAgIC8vICogRGVmaW5pY2UgZm9ybXVsw6HFmWUgcHJvIHZvbGJ5XHJcbiAgICAvLyAqIFxyXG4gICAgLy8gKiBAcmV0dXJucyB7Rm9ybXMuRm9ybX0gZm9ybXVsw6HFmVxyXG4gICAgLy8gKi9cclxuICAgIC8vZXhwb3J0IGZ1bmN0aW9uIEZ1Y1VzZXJTZXR0aW5nc09wdGlvbnMoKTogRm9ybXMuRm9ybSB7XHJcblxyXG4gICAgLy8gICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkZ1Y1NldHRpbmdzRm9ybVwiLCB0YWJPcHRpb25zOiB7IHRpdGxlOiBcIlZvbGJ5IHByw6FjZVwiLCBvcGVuZWQ6IGZhbHNlIH0gfSBhcyBhbnkpXHJcblxyXG4gICAgLy8gICAgICAgIC8vLmFkZFJvdyhcIlJlxb5pbSB6YWTDoXbDoW7DrSBwaWR1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAvLyAgICAgICAgLy8gICAgbmFtZTogXCJGdWNSZXppbVphZGF2YW5pUGlkdVwiLFxyXG4gICAgLy8gICAgICAgIC8vICAgIGxpc3Q6IHRydWUsXHJcbiAgICAvLyAgICAgICAgLy8gICAgaXRlbVRlbXBsYXRlOiBcInt0ZXh0fVwiLFxyXG4gICAgLy8gICAgICAgIC8vICAgIC8vZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgIC8vICAgICAgICAvLyAgICBpbml0aWFsVmFsdWU6IDEvKnsgdGV4dDogXCJHZW5lcm92w6Fuw61cIiwgc2VqbXV0aTogXCIxXCIgfSovLFxyXG4gICAgLy8gICAgICAgIC8vICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgIC8vICAgICAgICAvLyAgICAgICAgeyB0ZXh0OiBcIlNlam11dMOtIMWhdMOtdGt1XCIsIHNlam11dGk6IDAgfSxcclxuICAgIC8vICAgICAgICAvLyAgICAgICAgeyB0ZXh0OiBcIkdlbmVyb3bDoW7DrVwiLCBzZWptdXRpOiAxIH0sXHJcbiAgICAvLyAgICAgICAgLy8gICAgXSxcclxuICAgIC8vICAgICAgICAvLyAgICAgICAgeyBrZXk6IFwic2VqbXV0aVwiIH1cclxuICAgIC8vICAgICAgICAvLyAgICApLFxyXG4gICAgLy8gICAgICAgIC8vICAgIG1vZGVsOiBcIkdsb2JhbC5GdWMuQXBwU2V0dGluZ3MuT3B0aW9ucy5SZXppbVphZGF2YW5pUGlkdT12YWx1ZVwiXHJcbiAgICAvLyAgICAgICAgLy99KVxyXG4gICAgLy8gICAgICAgIDtcclxuXHJcbiAgICAvLyAgICByZXR1cm4gZm9ybTtcclxuICAgIC8vfVxyXG5cclxufVxyXG4iXX0=