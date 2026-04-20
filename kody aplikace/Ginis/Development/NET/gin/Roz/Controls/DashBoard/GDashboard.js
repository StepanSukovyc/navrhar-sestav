"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
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
                 * onContentReady - metoda ktera se spusti pri zobrazeni contentu
                 * */
                onContentReady() {
                    var that = this;
                    // Pole KPI obsahujici jednotlive knihy
                    that.kpiKnihy = [];
                    // Naplneni jednotlivych KPI v pameti. Vezmu jednotlive knihy, ktere jsem si nacetl pri inicializaci a v cyklu je prochazim
                    that.seznamKnih.forEach((kniha) => {
                        // Pro kazdou knihy vypln jedno KPI
                        that.kpiKnihy.push(new GObservableObject({
                            title: kniha.nazev, // zobraz nazev knihy
                            detailsDirection: "vertical", // jednotliva KPI se zobrazi pod sebe 
                            name: kniha.ixp_den, // pid knihy, nikde zobrazeny neni
                            details: [
                                {
                                    value: "?", // cislo, kolik dokladu splnuje vybrany filtr. Vyplni se az pozdeji v ramci metody update
                                    description: "jres:30250195", //RC 30250195 : ke schválení 
                                    meaning: "info", // zrejme jen barva textu
                                    action: new GAction({ name: kniha.ixp_den + "_" + 1 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.KeSchvaleni */, run: function () { that.vyberSeznamu(kniha.ixp_den, 1 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.KeSchvaleni */); } }),
                                },
                                {
                                    value: "?",
                                    description: "jres:30250194", //RC 30250194 : k realizaci
                                    meaning: "info",
                                    action: new GAction({ name: kniha.ixp_den + "_" + 0 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.KZauctovani */, run: function () { that.vyberSeznamu(kniha.ixp_den, 0 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.KZauctovani */); } }),
                                },
                                {
                                    value: "?",
                                    description: "jres:30250196", //RC 30250196 : stornované
                                    meaning: "info",
                                    action: new GAction({ name: kniha.ixp_den + "_" + 2 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Stornovane */, run: function () { that.vyberSeznamu(kniha.ixp_den, 2 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Stornovane */); } }),
                                },
                                {
                                    value: "?",
                                    description: "jres:30250197", //RC 30250197 : uzavřené
                                    meaning: "info",
                                    action: new GAction({ name: kniha.ixp_den + "_" + 3 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Uzavrene */, run: function () { that.vyberSeznamu(kniha.ixp_den, 3 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Uzavrene */); } }),
                                },
                                {
                                    value: "?",
                                    description: "jres:30250198", //RC 30250198 : neevidované
                                    meaning: "info",
                                    action: new GAction({ name: kniha.ixp_den + "_" + 5 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Neevidovane */, run: function () { that.vyberSeznamu(kniha.ixp_den, 5 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Neevidovane */); } }),
                                },
                                {
                                    value: "?",
                                    description: "jres:30250199", //RC 30250199 : doklady celkem
                                    meaning: "info",
                                    action: new GAction({ name: kniha.ixp_den + "_" + 20 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Vsechny */, run: function () { that.vyberSeznamu(kniha.ixp_den, 20 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Vsechny */); } }),
                                }
                            ]
                        }));
                    });
                    // Vytvorena KPI je nutno vlozit do zobrazovaciho panelu s prvky
                    // Uvnitr panelu je View slozene z jednorozmerneho pole a jako Data je mu zaslana kolekce KPI
                    let panelData = new Gordic.Data.View([
                        {
                            id: "panelKnihy",
                            title: "jres:30250193", //RC 30250193 : Knihy
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
                                        run: () => { that.update(); }
                                    })
                                }
                            ],
                            defaultSelected: false,
                            data: new Gordic.Data.View(this.kpiKnihy),
                        }
                    ]);
                    // Vlozeni widgetu gdashboardpanel do formuláře
                    $("<div>").appendTo(this.element).gdashboardpanel({
                        data: panelData,
                        layout: "vertical",
                        title: "",
                        zones: 3,
                        sortable: true
                    });
                    // Naplneni hodnot v KPI
                    this.update();
                }
                /**
                 * Zobrazeni seznamu dle pidu vybrane knihy a vybraneho filtru
                 * @param idKniha
                 * @param typFiltru
                 */
                vyberSeznamu(idKniha, typFiltru) {
                    // Vytvorim si GPC, ktere obsahuje informaci o vybrane kmize
                    let newGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, idKniha);
                    // A  zobrazim seznam - zasilam mu knihu a filtr
                    this.navigate(['Gordic.Roz.WebClient.GSeznamDokladuTab', { uid: 'ROZSeznamdokladu#', gpc: newGpc }], {
                        taskId: 'actSeznamdokladuID',
                        idKnihy: idKniha,
                        filtr: typFiltru
                    });
                }
                /**
                 * Aktualizace počtů
                 */
                update() {
                    var that = this;
                    // Projdi vsechny KPI a zjisti si pocty dokladu dle zaslanych filtru
                    this.kpiKnihy.forEach((item) => {
                        // Zavola se server a nacte prislusne pocty dokladu
                        // @ts-ignore: docasne pro moznost prekladu 84
                        that.isl.RozDoklad.listCount(rq => {
                            return {
                                idKnihy: item.name,
                                filtry: [1 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.KeSchvaleni */, 0 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.KZauctovani */, 5 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Neevidovane */, 2 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Stornovane */, 3 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Uzavrene */, 20 /* Gordic.Uct.Interface.GEUctFiltrSeznamPevne.Vsechny */],
                            };
                        })
                            .get()
                            // Pocty byly spravne nacteny, zapis je do jednotlivych policek
                            .done(function (response) {
                            // Item je objekt KPI, dalsim parametrem je cislo radku a posledni hodnotou je konkretni cislo, ktere se na toto misto vyplni
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
                        {
                            if (value > 0) {
                                kpi.details[numDetail].value = value;
                                kpi.details[numDetail].meaning = "info";
                            }
                            else {
                                kpi.details[numDetail].value = 0;
                                kpi.details[numDetail].meaning = "positive";
                            }
                        }
                    }
                    kpi.update();
                }
            };
            GDashboard = __decorate([
                gcontent
            ], GDashboard);
            WebClient.GDashboard = GDashboard;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Rhc2hib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEYXNoYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXNPZjtBQXRPRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FzT25CO0lBdE9nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FzTzdCO1FBdE9vQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQzs7Ozs7ZUFLRztZQUVILElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7Z0JBQTVDOztvQkFvQkksV0FBTSxHQUFHLGNBQWMsQ0FBQztnQkF1TTVCLENBQUM7Z0JBcE1HOztxQkFFSztnQkFDRSxjQUFjO29CQUNqQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLHVDQUF1QztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7b0JBRW5CLDJIQUEySDtvQkFDM0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFFOUIsbUNBQW1DO3dCQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDOzRCQUNyQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxxQkFBcUI7NEJBQ3pDLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxzQ0FBc0M7NEJBQ3BFLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLGtDQUFrQzs0QkFDdkQsT0FBTyxFQUFFO2dDQUNMO29DQUNJLEtBQUssRUFBRSxHQUFHLEVBQUUseUZBQXlGO29DQUNyRyxXQUFXLEVBQUUsZUFBZSxFQUFFLDZCQUE2QjtvQ0FDM0QsT0FBTyxFQUFFLE1BQU0sRUFBRSx5QkFBeUI7b0NBQzFDLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FB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TlksVUFBVTtnQkFEdEIsUUFBUTtlQUNJLFVBQVUsQ0EyTnRCO1lBM05ZLG9CQUFVLGFBMk50QixDQUFBO1FBQ0wsQ0FBQyxFQXRPb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBc083QjtJQUFELENBQUMsRUF0T2dCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXNPbkI7QUFBRCxDQUFDLEVBdE9TLE1BQU0sS0FBTixNQUFNLFFBc09mIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Sb3ouV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDDmnZvZG7DrSBzdHLDoW5rYSAoZGFzaGJvYXJkKVxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgVG9tYXMgS2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODQuMS4wLjMyXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEYXNoYm9hcmQgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQb2xlIEtQSSBqZWRub3RsaXZ5Y2gga25paFxyXG4gICAgICAgICAqIEB0eXBlIHtHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+W119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBrcGlLbmloeTogR09ic2VydmFibGVPYmplY3Q8YW55IHwgR0twaUl0ZW1PcHRpb25zPltdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpuYW0ga25paCAocG9sZSkgbmFjdGVueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkVrby5JbnRlcmZhY2UuR0Vrb1Z5YnJhbmVLbmloeUR0b1tdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V6bmFtS25paDogR29yZGljLkVrby5JbnRlcmZhY2UuR0Vrb1Z5YnJhbmVLbmloeUR0b1tdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUeXAgem9icmF6ZW7DrSAodHJ1ZSA9IHZlbGvDoSBLUEksIGZhbHNlID0gbWFsw70gc2V6bmFtKVxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBUeXBab2JyYXplbmk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIHRhc2tJZCA9IFwiYWN0RGFzaGJvYXJkXCI7XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbkNvbnRlbnRSZWFkeSAtIG1ldG9kYSBrdGVyYSBzZSBzcHVzdGkgcHJpIHpvYnJhemVuaSBjb250ZW50dVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBQb2xlIEtQSSBvYnNhaHVqaWNpIGplZG5vdGxpdmUga25paHlcclxuICAgICAgICAgICAgdGhhdC5rcGlLbmloeSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gTmFwbG5lbmkgamVkbm90bGl2eWNoIEtQSSB2IHBhbWV0aS4gVmV6bXUgamVkbm90bGl2ZSBrbmloeSwga3RlcmUganNlbSBzaSBuYWNldGwgcHJpIGluaWNpYWxpemFjaSBhIHYgY3lrbHUgamUgcHJvY2hhemltXHJcbiAgICAgICAgICAgIHRoYXQuc2V6bmFtS25paC5mb3JFYWNoKChrbmloYSkgPT4geyBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcm8ga2F6ZG91IGtuaWh5IHZ5cGxuIGplZG5vIEtQSVxyXG4gICAgICAgICAgICAgICAgdGhhdC5rcGlLbmloeS5wdXNoKG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGtuaWhhLm5hemV2LCAvLyB6b2JyYXogbmF6ZXYga25paHlcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzRGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsIC8vIGplZG5vdGxpdmEgS1BJIHNlIHpvYnJhemkgcG9kIHNlYmUgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZToga25paGEuaXhwX2RlbiwgLy8gcGlkIGtuaWh5LCBuaWtkZSB6b2JyYXplbnkgbmVuaVxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IFsgLy8gemRlIGplIHBvbGUgcG9sb3playwga3RlcmUgc2Ugem9icmF6aW0gdiBqZWRub20gS1BJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIiwgLy8gY2lzbG8sIGtvbGlrIGRva2xhZHUgc3BsbnVqZSB2eWJyYW55IGZpbHRyLiBWeXBsbmkgc2UgYXogcG96ZGVqaSB2IHJhbWNpIG1ldG9keSB1cGRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxOTVcIiwgLy9SQyAzMDI1MDE5NSA6IGtlIHNjaHbDoWxlbsOtIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsIC8vIHpyZWptZSBqZW4gYmFydmEgdGV4dHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBrbmloYS5peHBfZGVuICsgXCJfXCIgKyBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuS2VTY2h2YWxlbmkgYXMgYW55LCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC52eWJlclNlem5hbXUoa25paGEuaXhwX2RlbiBhcyBzdHJpbmcsIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5LZVNjaHZhbGVuaSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxOTRcIiwgLy9SQyAzMDI1MDE5NCA6IGsgcmVhbGl6YWNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBrbmloYS5peHBfZGVuICsgXCJfXCIgKyBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuS1phdWN0b3ZhbmkgYXMgYW55LCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC52eWJlclNlem5hbXUoa25paGEuaXhwX2RlbiBhcyBhbnksIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5LWmF1Y3RvdmFuaSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxOTZcIiwgLy9SQyAzMDI1MDE5NiA6IHN0b3Jub3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBrbmloYS5peHBfZGVuICsgXCJfXCIgKyBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuU3Rvcm5vdmFuZSBhcyBhbnksIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnZ5YmVyU2V6bmFtdShrbmloYS5peHBfZGVuIGFzIGFueSwgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlN0b3Jub3ZhbmUpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTk3XCIsIC8vUkMgMzAyNTAxOTcgOiB1emF2xZllbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBrbmloYS5peHBfZGVuICsgXCJfXCIgKyBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuVXphdnJlbmUgYXMgYW55LCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC52eWJlclNlem5hbXUoa25paGEuaXhwX2RlbiBhcyBhbnksIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5VemF2cmVuZSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxOThcIiwgLy9SQyAzMDI1MDE5OCA6IG5lZXZpZG92YW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZToga25paGEuaXhwX2RlbiArIFwiX1wiICsgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLk5lZXZpZG92YW5lIGFzIGFueSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQudnliZXJTZXpuYW11KGtuaWhhLml4cF9kZW4gYXMgYW55LCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuTmVldmlkb3ZhbmUpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTk5XCIsIC8vUkMgMzAyNTAxOTkgOiBkb2tsYWR5IGNlbGtlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZToga25paGEuaXhwX2RlbiArIFwiX1wiICsgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlZzZWNobnkgYXMgYW55LCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC52eWJlclNlem5hbXUoa25paGEuaXhwX2RlbiBhcyBhbnksIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5Wc2VjaG55KTsgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBWeXR2b3JlbmEgS1BJIGplIG51dG5vIHZsb3ppdCBkbyB6b2JyYXpvdmFjaWhvIHBhbmVsdSBzIHBydmt5XHJcbiAgICAgICAgICAgIC8vIFV2bml0ciBwYW5lbHUgamUgVmlldyBzbG96ZW5lIHogamVkbm9yb3ptZXJuZWhvIHBvbGUgYSBqYWtvIERhdGEgamUgbXUgemFzbGFuYSBrb2xla2NlIEtQSVxyXG4gICAgICAgICAgICBsZXQgcGFuZWxEYXRhID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInBhbmVsS25paHlcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMTkzXCIsIC8vUkMgMzAyNTAxOTMgOiBLbmloeVxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgem9uZTogMCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBcInZlcnRpY2FsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpVmFsdWVUd29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVQYXJhbXM6IFsgLy8gUG9saWNrbywga3RlcmUgdW1vem5pIHJlZnJlc2gtIGplIHVtaXN0ZW5vIHZwcmF2byB2ZWRsZSBuYWRwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmV0d2VldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RSZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IEdBY3Rpb24uY2FwdGlvblZpc2liaWxpdHkubmV2ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYXB0aW9uOiBcIkFrdHVhbGl6b3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGF0LnVwZGF0ZSgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoaXMua3BpS25paHkpLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZsb3plbmkgd2lkZ2V0dSBnZGFzaGJvYXJkcGFuZWwgZG8gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Rhc2hib2FyZHBhbmVsKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHBhbmVsRGF0YSxcclxuICAgICAgICAgICAgICAgIGxheW91dDogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB6b25lczogMyxcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gTmFwbG5lbmkgaG9kbm90IHYgS1BJXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgc2V6bmFtdSBkbGUgcGlkdSB2eWJyYW5lIGtuaWh5IGEgdnlicmFuZWhvIGZpbHRydVxyXG4gICAgICAgICAqIEBwYXJhbSBpZEtuaWhhXHJcbiAgICAgICAgICogQHBhcmFtIHR5cEZpbHRydVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdnliZXJTZXpuYW11KGlkS25paGE6IHN0cmluZywgdHlwRmlsdHJ1OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFZ5dHZvcmltIHNpIEdQQywga3RlcmUgb2JzYWh1amUgaW5mb3JtYWNpIG8gdnlicmFuZSBrbWl6ZVxyXG4gICAgICAgICAgICBsZXQgbmV3R3BjID0gR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKHRoaXMuZ3BjLCBpZEtuaWhhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEEgIHpvYnJhemltIHNlem5hbSAtIHphc2lsYW0gbXUga25paHUgYSBmaWx0clxyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFsnR29yZGljLlJvei5XZWJDbGllbnQuR1Nlem5hbURva2xhZHVUYWInLCB7IHVpZDogJ1JPWlNlem5hbWRva2xhZHUjJywgZ3BjOiBuZXdHcGMgfV0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFza0lkOiAnYWN0U2V6bmFtZG9rbGFkdUlEJyxcclxuICAgICAgICAgICAgICAgICAgICBpZEtuaWh5OiBpZEtuaWhhLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRyOiB0eXBGaWx0cnVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHVhbGl6YWNlIHBvxI10xa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gUHJvamRpIHZzZWNobnkgS1BJIGEgemppc3RpIHNpIHBvY3R5IGRva2xhZHUgZGxlIHphc2xhbnljaCBmaWx0cnVcclxuICAgICAgICAgICAgdGhpcy5rcGlLbmloeS5mb3JFYWNoKFxyXG4gICAgICAgICAgICAgICAgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBaYXZvbGEgc2Ugc2VydmVyIGEgbmFjdGUgcHJpc2x1c25lIHBvY3R5IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlOiBkb2Nhc25lIHBybyBtb3pub3N0IHByZWtsYWR1IDg0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUm96RG9rbGFkLmxpc3RDb3VudChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZEtuaWh5OiBpdGVtLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0cnk6IFtHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuS2VTY2h2YWxlbmksIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5LWmF1Y3RvdmFuaSwgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLk5lZXZpZG92YW5lLCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuU3Rvcm5vdmFuZSwgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlV6YXZyZW5lLCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmUuVnNlY2hueV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBvY3R5IGJ5bHkgc3ByYXZuZSBuYWN0ZW55LCB6YXBpcyBqZSBkbyBqZWRub3RsaXZ5Y2ggcG9saWNla1xyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJdGVtIGplIG9iamVrdCBLUEksIGRhbHNpbSBwYXJhbWV0cmVtIGplIGNpc2xvIHJhZGt1IGEgcG9zbGVkbmkgaG9kbm90b3UgamUga29ua3JldG5pIGNpc2xvLCBrdGVyZSBzZSBuYSB0b3RvIG1pc3RvIHZ5cGxuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZhbHVlKGl0ZW0sIDAsIHJlc3BvbnNlIS5LZVNjaHZhbGVuaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0VmFsdWUoaXRlbSwgMSwgcmVzcG9uc2UhLktaYXVjdG92YW5pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRWYWx1ZShpdGVtLCAyLCByZXNwb25zZSEuU3Rvcm5vdmFuZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0VmFsdWUoaXRlbSwgMywgcmVzcG9uc2UhLlV6YXZyZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRWYWx1ZShpdGVtLCA0LCByZXNwb25zZSEuTmVldmlkb3ZhbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFZhbHVlKGl0ZW0sIDUsIHJlc3BvbnNlIS5Wc2VjaG55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gaG9kbm90eSBwcnZrdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R09ic2VydmFibGVPYmplY3Q8YW55IHwgR0twaUl0ZW1PcHRpb25zPn0ga3BpIHBydmVrXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXIgfCBudWxsfSBudW1EZXRhaWwgcG/FmWFkb3bDqSDEjcOtc2xvIChwcm8gdHlwIHpvYnJhemVuw60gc2V6bmFtKSBuZWJvIG51bGwgKHBybyB0eXAgem9icmF6ZW7DrSB2ZWxrw6EgS1BJKVxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gdmFsdWUgaG9kbm90YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0VmFsdWUoa3BpOiBHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+LCBudW1EZXRhaWw6IG51bWJlciB8IG51bGwsIHZhbHVlOiBudW1iZXIgfCBudWxsKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyB2IHpvYnJhemVuw60gbWFsw70gc2V6bmFtIG5lbsOtIG1vxb5uw6kgbmFzdGF2aXQgcHJ2ZWsgYmV6IGluZGV4dVxyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBab2JyYXplbmkgPT09IGZhbHNlICYmIG51bURldGFpbCA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwcsOhemRuw6EgKHBvxI3DoXRlxI1uw60pIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlR5cFpvYnJhemVuaSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtwaS52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBrcGkuZGV0YWlsc1tudW1EZXRhaWwhXS52YWx1ZSA9IFwiP1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGtwaS5kZXRhaWxzW251bURldGFpbCFdLm1lYW5pbmcgPSBcImluZm9cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIMSNw61zZWxuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0ubWVhbmluZyA9IFwiaW5mb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0udmFsdWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrcGkuZGV0YWlsc1tudW1EZXRhaWwhXS5tZWFuaW5nID0gXCJwb3NpdGl2ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBrcGkudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==