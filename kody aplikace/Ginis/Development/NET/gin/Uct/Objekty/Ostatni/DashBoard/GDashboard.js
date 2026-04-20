"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Úvodní stránka (dashboard)
             *
             * @author Tomas Kares
             * @since 484.1.0.32
             */
            let GDashboard = class GDashboard extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actDashboard";
                }
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    debugger;
                    this.kpiKnihy = [];
                    // definice prvků podle typu zobrazení
                    // zpracovani seznamu knih
                    that.seznanKnih.forEach((radek) => {
                        var kniha = new GObservableObject({
                            title: radek.nazev,
                            detailsDirection: "vertical",
                            name: radek.ixp_den,
                            details: [
                                {
                                    value: "?",
                                    description: "jres:30250552", //RC 30250552 : ke schválení
                                    meaning: "info",
                                    action: new GAction({ name: radek.ixp_den + "_" + 1 /* Interface.GEUctFiltrSeznamPevne.KeSchvaleni */, run: function () { that.vyberSeznamu(radek.ixp_den, 1 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.KeSchvaleni */); } }),
                                },
                                {
                                    value: "?",
                                    description: "jres:30250553", //RC 30250553 : k zaúčtování
                                    meaning: "info",
                                    action: new GAction({ name: radek.ixp_den + "_" + 0 /* Interface.GEUctFiltrSeznamPevne.KZauctovani */, run: function () { that.vyberSeznamu(radek.ixp_den, 0 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.KZauctovani */); } }),
                                },
                                {
                                    value: "?",
                                    description: "jres:30250554", //RC 30250554 : stornované
                                    meaning: "info",
                                    action: new GAction({ name: radek.ixp_den + "_" + 2 /* Interface.GEUctFiltrSeznamPevne.Stornovane */, run: function () { that.vyberSeznamu(radek.ixp_den, 2 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Stornovane */); } }),
                                },
                                {
                                    value: "?",
                                    description: "jres:30250555", //RC 30250555 : uzavřené
                                    meaning: "info",
                                    action: new GAction({ name: radek.ixp_den + "_" + 3 /* Interface.GEUctFiltrSeznamPevne.Uzavrene */, run: function () { that.vyberSeznamu(radek.ixp_den, 3 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Uzavrene */); } }),
                                },
                                {
                                    value: "?",
                                    description: "jres:30250556", //RC 30250556 : neevidované
                                    meaning: "info",
                                    action: new GAction({ name: radek.ixp_den + "_" + 5 /* Interface.GEUctFiltrSeznamPevne.Neevidovane */, run: function () { that.vyberSeznamu(radek.ixp_den, 5 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Neevidovane */); } }),
                                },
                                {
                                    value: "?",
                                    description: "jres:30250557", //RC 30250557 : doklady celkem
                                    meaning: "info",
                                    action: new GAction({ name: radek.ixp_den + "_" + 20 /* Interface.GEUctFiltrSeznamPevne.Vsechny */, run: function () { that.vyberSeznamu(radek.ixp_den, 20 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Vsechny */); } }),
                                }
                            ]
                        });
                        this.kpiKnihy.push(kniha);
                    });
                    // panel s prvky
                    let panelData = new Gordic.Data.View([
                        {
                            id: "panelKnihy",
                            title: "jres:30250535", //RC 30250535 : Knihy
                            visible: true,
                            zone: 0,
                            mode: "vertical",
                            itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                            menuParams: [
                                {
                                    icon: "fa-retweet",
                                    action: new GAction({
                                        name: "actRefresh",
                                        captionVisible: GAction.captionVisibility.never,
                                        //caption: "Aktualizovat",
                                        run: function () {
                                            that.update();
                                        }
                                    })
                                }
                            ],
                            defaultSelected: false,
                            data: new Gordic.Data.View(this.kpiKnihy),
                        },
                    ] /*, { key: ["id"] }*/);
                    // přidání do formuláře
                    $.newDiv().appendTo(this.element).gdashboardpanel({
                        data: panelData,
                        layout: "vertical",
                        title: "",
                        zones: 3,
                        sortable: true
                    });
                    // naplnění prvků
                    this.update();
                }
                /**
                 * Vyber filtru seznamu
                 * @param idKniha
                 * @param typFiltru
                 */
                vyberSeznamu(idKniha, typFiltru) {
                    //            var newGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, idKniha);
                    this.navigate(['Gordic.Uct.WebClient.GUctSeznamServiceContent', { gpc: Gordic.Eko.Utils.createBookGpc(this.gpc, idKniha) }], {
                        taskId: 'actSeznamdokladuID',
                        ID: 'UCTSeznamdokladu#',
                        //idKnihy: idKniha,
                        filtr: typFiltru,
                    });
                }
                /**
                 * Aktualizace počtů
                 */
                update() {
                    var that = this;
                    this.kpiKnihy.forEach((item) => {
                        // @ts-ignore: docasne pro moznost prekladu 84
                        that.isl.UctDoklad.listCount(rq => {
                            return {
                                idKnihy: item.name,
                                filtry: [1 /* Interface.GEUctFiltrSeznamPevne.KeSchvaleni */, 0 /* Interface.GEUctFiltrSeznamPevne.KZauctovani */, 5 /* Interface.GEUctFiltrSeznamPevne.Neevidovane */, 2 /* Interface.GEUctFiltrSeznamPevne.Stornovane */, 3 /* Interface.GEUctFiltrSeznamPevne.Uzavrene */, 20 /* Interface.GEUctFiltrSeznamPevne.Vsechny */],
                            };
                        })
                            .get()
                            .done(function (response) {
                            // aktualizace počtu
                            debugger;
                            //for (var i = 0; i < item!.details!.length; i++) {
                            that.setValue(item, 0, response.KeSchvaleni);
                            that.setValue(item, 1, response.KZauctovani);
                            that.setValue(item, 2, response.Stornovane);
                            that.setValue(item, 3, response.Uzavrene);
                            that.setValue(item, 4, response.Neevidovane);
                            that.setValue(item, 5, response.Vsechny);
                            //}
                        });
                    });
                }
                /**
                 * Nastavení hodnoty prvku
                 *
                 * @param {GObservableObject<any | GKpiItemOptions>} kpi prvek
                 * @param {number | null} numDetail pořadové číslo (pro typ zobrazení seznam) nebo null (pro typ zobrazení velká KPI)
                 * @param {number | null} value hodnota
                 */
                setValue(kpi, numDetail, value) {
                    // v zobrazení malý seznam není možné nastavit prvek bez indexu
                    if (this.TypZobrazeni === false && numDetail === null)
                        return;
                    if (value === null) {
                        // prázdná (počáteční) hodnota
                        if (this.TypZobrazeni === true) {
                            kpi.value = null;
                        }
                        else {
                            kpi.details[numDetail].value = "?";
                            kpi.details[numDetail].meaning = "info";
                        }
                    }
                    else {
                        // číselná hodnota
                        if (value > 0) {
                            kpi.details[numDetail].value = value;
                            kpi.details[numDetail].meaning = "info";
                        }
                        else {
                            kpi.details[numDetail].value = 0;
                            kpi.details[numDetail].meaning = "positive";
                        }
                    }
                    kpi.update();
                }
            };
            GDashboard = __decorate([
                gcontent
            ], GDashboard);
            WebClient.GDashboard = GDashboard;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Rhc2hib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEYXNoYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWtPZjtBQWxPRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrT25CO0lBbE9nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FrTzdCO1FBbE9vQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQzs7Ozs7ZUFLRztZQUVILElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7Z0JBQTVDOztvQkFxQkksV0FBTSxHQUFHLGNBQWMsQ0FBQztnQkFrTTVCLENBQUM7Z0JBL0xHOzttQkFFRztnQkFDSSxjQUFjO29CQUVqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLFFBQVEsQ0FBQztvQkFFVCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFHbkIsc0NBQXNDO29CQUVsQywwQkFBMEI7b0JBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQzlCLElBQUksS0FBSyxHQUFHLElBQUksaUJBQWlCLENBQUM7NEJBQzlCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzs0QkFDbEIsZ0JBQWdCLEVBQUUsVUFBVTs0QkFDNUIsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPOzRCQUNuQixPQUFPLEVBQUU7Z0NBQ0w7b0NBQ0ksS0FBSyxFQUFFLEdBQUc7b0NBQ1YsV0FBVyxFQUFFLGVBQWUsRUFBRSw0QkFBNEI7b0NBQzFELE9BQU8sRUFBRSxNQUFNO29DQUNmLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsc0RBQXFELEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxD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QixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFrT25CO0FBQUQsQ0FBQyxFQWxPUyxNQUFNLEtBQU4sTUFBTSxRQWtPZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWN0LldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogw5p2b2Ruw60gc3Ryw6Fua2EgKGRhc2hib2FyZClcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIFRvbWFzIEthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC4zMlxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGFzaGJvYXJkIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcHJ2a3kgcHJvIHBvxI10eSBwb2h5YsWvIGsgw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge0dPYnNlcnZhYmxlT2JqZWN0PGFueSB8IEdLcGlJdGVtT3B0aW9ucz5bXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGtwaUtuaWh5OiBHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+W107XHJcblxyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpuYW0ga25paFxyXG4gICAgICAgICAqIEB0eXBlIHtHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvW119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXpuYW5LbmloOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvW107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHlwIHpvYnJhemVuw60gKHRydWUgPSB2ZWxrw6EgS1BJLCBmYWxzZSA9IG1hbMO9IHNlem5hbSlcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVHlwWm9icmF6ZW5pOiBib29sZWFuO1xyXG5cclxuICAgICAgICB0YXNrSWQgPSBcImFjdERhc2hib2FyZFwiO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmtwaUtuaWh5ID0gW107XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgcHJ2a8WvIHBvZGxlIHR5cHUgem9icmF6ZW7DrVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHpwcmFjb3Zhbmkgc2V6bmFtdSBrbmloXHJcbiAgICAgICAgICAgICAgICB0aGF0LnNlem5hbktuaWguZm9yRWFjaCgocmFkZWspID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIga25paGEgPSBuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcmFkZWsubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcmFkZWsuaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNTUyXCIsIC8vUkMgMzAyNTA1NTIgOiBrZSBzY2h2w6FsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7IG5hbWU6IHJhZGVrLml4cF9kZW4gKyBcIl9cIiArIEludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuS2VTY2h2YWxlbmkgYXMgYW55LCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC52eWJlclNlem5hbXUocmFkZWsuaXhwX2RlbiBhcyBhbnksIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5LZVNjaHZhbGVuaSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNTUzXCIsIC8vUkMgMzAyNTA1NTMgOiBrIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7IG5hbWU6IHJhZGVrLml4cF9kZW4gKyBcIl9cIiArIEludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuS1phdWN0b3ZhbmkgYXMgYW55LCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC52eWJlclNlem5hbXUocmFkZWsuaXhwX2RlbiBhcyBhbnksIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5LWmF1Y3RvdmFuaSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNTU0XCIsIC8vUkMgMzAyNTA1NTQgOiBzdG9ybm92YW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiByYWRlay5peHBfZGVuICsgXCJfXCIgKyBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlN0b3Jub3ZhbmUgYXMgYW55LCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC52eWJlclNlem5hbXUocmFkZWsuaXhwX2RlbiBhcyBhbnksIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5TdG9ybm92YW5lKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA1NTVcIiwgLy9SQyAzMDI1MDU1NSA6IHV6YXbFmWVuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZTogcmFkZWsuaXhwX2RlbiArIFwiX1wiICsgSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5VemF2cmVuZSBhcyBhbnksIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnZ5YmVyU2V6bmFtdShyYWRlay5peHBfZGVuIGFzIGFueSwgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlV6YXZyZW5lKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA1NTZcIiwgLy9SQyAzMDI1MDU1NiA6IG5lZXZpZG92YW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiByYWRlay5peHBfZGVuICsgXCJfXCIgKyBJbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLk5lZXZpZG92YW5lIGFzIGFueSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudnliZXJTZXpuYW11KHJhZGVrLml4cF9kZW4gYXMgYW55LCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuTmVldmlkb3ZhbmUpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDU1N1wiLCAvL1JDIDMwMjUwNTU3IDogZG9rbGFkeSBjZWxrZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZTogcmFkZWsuaXhwX2RlbiArIFwiX1wiICsgSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5Wc2VjaG55IGFzIGFueSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudnliZXJTZXpuYW11KHJhZGVrLml4cF9kZW4gYXMgYW55LCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuVnNlY2hueSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmtwaUtuaWh5LnB1c2goa25paGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHBhbmVsIHMgcHJ2a3lcclxuICAgICAgICAgICAgbGV0IHBhbmVsRGF0YSA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJwYW5lbEtuaWh5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDUzNVwiLCAvL1JDIDMwMjUwNTM1IDogS25paHlcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHpvbmU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaVZhbHVlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51UGFyYW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmV0d2VldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RSZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IEdBY3Rpb24uY2FwdGlvblZpc2liaWxpdHkubmV2ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYXB0aW9uOiBcIkFrdHVhbGl6b3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhpcy5rcGlLbmloeSksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLyosIHsga2V5OiBbXCJpZFwiXSB9Ki8pO1xyXG5cclxuICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBkbyBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Rhc2hib2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHBhbmVsRGF0YSxcclxuICAgICAgICAgICAgICAgIGxheW91dDogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB6b25lczogMyxcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gcHJ2a8WvXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5YmVyIGZpbHRydSBzZXpuYW11XHJcbiAgICAgICAgICogQHBhcmFtIGlkS25paGFcclxuICAgICAgICAgKiBAcGFyYW0gdHlwRmlsdHJ1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB2eWJlclNlem5hbXUoaWRLbmloYTogc3RyaW5nLCB0eXBGaWx0cnU6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZSkge1xyXG4vLyAgICAgICAgICAgIHZhciBuZXdHcGMgPSBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhpcy5ncGMsIGlkS25paGEpO1xyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFsnR29yZGljLlVjdC5XZWJDbGllbnQuR1VjdFNlem5hbVNlcnZpY2VDb250ZW50JywgeyBncGM6IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyh0aGlzLmdwYywgaWRLbmloYSkgfV0sIHtcclxuICAgICAgICAgICAgICAgIHRhc2tJZDogJ2FjdFNlem5hbWRva2xhZHVJRCcsXHJcbiAgICAgICAgICAgICAgICBJRDogJ1VDVFNlem5hbWRva2xhZHUjJyxcclxuICAgICAgICAgICAgICAgIC8vaWRLbmloeTogaWRLbmloYSxcclxuICAgICAgICAgICAgICAgIGZpbHRyOiB0eXBGaWx0cnUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1YWxpemFjZSBwb8SNdMWvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmtwaUtuaWh5LmZvckVhY2goXHJcbiAgICAgICAgICAgICAgICAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmU6IGRvY2FzbmUgcHJvIG1vem5vc3QgcHJla2xhZHUgODRcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5VY3REb2tsYWQubGlzdENvdW50KHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkS25paHk6IGl0ZW0ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRyeTogW0ludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuS2VTY2h2YWxlbmksIEludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuS1phdWN0b3ZhbmksIEludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuTmVldmlkb3ZhbmUsIEludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuU3Rvcm5vdmFuZSwgSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5VemF2cmVuZSwgSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5Wc2VjaG55XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgcG/EjXR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ZvciAodmFyIGkgPSAwOyBpIDwgaXRlbSEuZGV0YWlscyEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRWYWx1ZShpdGVtLCAwLCByZXNwb25zZSEuS2VTY2h2YWxlbmkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZhbHVlKGl0ZW0sIDEsIHJlc3BvbnNlIS5LWmF1Y3RvdmFuaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0VmFsdWUoaXRlbSwgMiwgcmVzcG9uc2UhLlN0b3Jub3ZhbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZhbHVlKGl0ZW0sIDMsIHJlc3BvbnNlIS5VemF2cmVuZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0VmFsdWUoaXRlbSwgNCwgcmVzcG9uc2UhLk5lZXZpZG92YW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRWYWx1ZShpdGVtLCA1LCByZXNwb25zZSEuVnNlY2hueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApOyAgICAgICAgICAgXHJcblxyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gaG9kbm90eSBwcnZrdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R09ic2VydmFibGVPYmplY3Q8YW55IHwgR0twaUl0ZW1PcHRpb25zPn0ga3BpIHBydmVrXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXIgfCBudWxsfSBudW1EZXRhaWwgcG/FmWFkb3bDqSDEjcOtc2xvIChwcm8gdHlwIHpvYnJhemVuw60gc2V6bmFtKSBuZWJvIG51bGwgKHBybyB0eXAgem9icmF6ZW7DrSB2ZWxrw6EgS1BJKVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gdmFsdWUgaG9kbm90YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0VmFsdWUoa3BpOiBHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+LCBudW1EZXRhaWw6IG51bWJlciB8IG51bGwsIHZhbHVlOiBudW1iZXIgfCBudWxsKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyB2IHpvYnJhemVuw60gbWFsw70gc2V6bmFtIG5lbsOtIG1vxb5uw6kgbmFzdGF2aXQgcHJ2ZWsgYmV6IGluZGV4dVxyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBab2JyYXplbmkgPT09IGZhbHNlICYmIG51bURldGFpbCA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwcsOhemRuw6EgKHBvxI3DoXRlxI1uw60pIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlR5cFpvYnJhemVuaSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtwaS52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBrcGkuZGV0YWlsc1tudW1EZXRhaWwhXS52YWx1ZSA9IFwiP1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGtwaS5kZXRhaWxzW251bURldGFpbCFdLm1lYW5pbmcgPSBcImluZm9cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIMSNw61zZWxuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0ubWVhbmluZyA9IFwiaW5mb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0udmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrcGkuZGV0YWlsc1tudW1EZXRhaWwhXS5tZWFuaW5nID0gXCJwb3NpdGl2ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBrcGkudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=